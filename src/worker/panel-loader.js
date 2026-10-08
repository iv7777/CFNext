// ---------------------------------------------------------------------------
// 面板页面加载：面板 HTML（约 90KB）不内嵌在 Worker 里，而是由 Worker 按版本标签从 GitHub 拉取，
// 校验 SHA-256 后缓存，再注入字段表等运行时数据发给浏览器。
//   - 浏览器始终只访问 Worker 自己的域名（无需访问第三方 CDN，CSP 也无需放行），路径伪装与登录鉴权不变
//   - 拉取发生在 Cloudflare 边缘，不受用户所在地区对 jsDelivr / GitHub 访问限制的影响
//   - 缓存键就是内容的 SHA-256：升级版本后哈希变了，自然落到新键重新拉取，旧条目无需清理，由 TTL 自行过期
//   - 来源固定为不可变的版本标签 v<VERSION>（构建时把 dist/panel.html 的哈希写进 Worker），永不拉取 main / latest
// 读取顺序：isolate 内存 → Cache API（同机房共享）→ KV（已绑定时，全球共享）→ 网络（三个镜像并发，先到先用）
// 面板拉不到时只有面板不可用（返回 503 说明页），代理与订阅完全不受影响
// ---------------------------------------------------------------------------
const PANEL_SHA256 = /* @panel-sha256 */ '';
const PANEL_ASSET_PATH = '/dist/panel.html';
const PANEL_MAX_BYTES = 1024 * 1024;
const PANEL_FETCH_TIMEOUT = 6000;
const PANEL_RETRY_AFTER = 15000;                  // 全部来源失败后 15 秒内不再重试，避免面板打不开时每个请求都去打镜像
const PANEL_CACHE_TTL = 30 * 86400;
const PANEL_CACHE_KEY = 'https://hopline.invalid/panel/' + PANEL_SHA256;
const PANEL_KV_KEY = 'panel:' + PANEL_SHA256;

let PANEL_TEXT = null;       // 已校验的面板模板（每个 isolate 只加载一次）
let PANEL_LOADING = null;    // 进行中的加载（并发请求共用）
let PANEL_FAILED_AT = 0;

function panelSources() {
  const tag = 'v' + VERSION;
  return [
    'https://cdn.jsdelivr.net/gh/' + UPDATE_REPO + '@' + tag + PANEL_ASSET_PATH,
    'https://fastly.jsdelivr.net/gh/' + UPDATE_REPO + '@' + tag + PANEL_ASSET_PATH,
    'https://raw.githubusercontent.com/' + UPDATE_REPO + '/' + tag + PANEL_ASSET_PATH,
  ];
}

async function sha256Hex(buf) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
  let s = '';
  for (const b of d) s += b.toString(16).padStart(2, '0');
  return s;
}
// 字节 → 文本：大小超限或哈希不符一律视为无效（缓存损坏 / 镜像被篡改 / 标签内容不对）
async function verifiedPanelText(buf) {
  if (!buf || buf.byteLength > PANEL_MAX_BYTES) return null;
  if ((await sha256Hex(buf)) !== PANEL_SHA256) return null;
  return new TextDecoder().decode(buf);
}

async function panelFromNetwork() {
  const ac = new AbortController();
  const one = async (url) => {
    const res = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Hopline)' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await verifiedPanelText(await res.arrayBuffer());
    if (!text) throw new Error('hash mismatch');
    return text;
  };
  const timer = setTimeout(() => ac.abort(), PANEL_FETCH_TIMEOUT);
  try { return await Promise.any(panelSources().map(one)); }
  catch (e) { return null; }
  finally { clearTimeout(timer); ac.abort(); }   // 先到的一路成功后，取消其余仍在进行的请求
}

function panelCache() {
  try { return (typeof caches !== 'undefined' && caches.default) || null; } catch (e) { return null; }
}
async function panelFromCache() {
  const c = panelCache();
  if (!c) return null;
  try {
    const res = await c.match(PANEL_CACHE_KEY);
    return res ? await verifiedPanelText(await res.arrayBuffer()) : null;
  } catch (e) { return null; }
}
async function panelToCache(text) {
  const c = panelCache();
  if (!c) return;
  try {
    await c.put(PANEL_CACHE_KEY, new Response(text, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=' + PANEL_CACHE_TTL } }));
  } catch (e) {}
}
async function panelFromKv(env) {
  const kv = kvStore(env);
  if (!kv || typeof kv.get !== 'function') return null;
  try {
    const v = await kv.get(PANEL_KV_KEY);
    return v ? await verifiedPanelText(new TextEncoder().encode(v)) : null;
  } catch (e) { return null; }
}
async function panelToKv(env, text) {
  const kv = kvStore(env);
  if (!kv || typeof kv.put !== 'function') return;
  try { await kv.put(PANEL_KV_KEY, text, { expirationTtl: PANEL_CACHE_TTL }); } catch (e) {}
}

async function fetchPanelTemplate(env) {
  let text = await panelFromCache();
  if (text) return text;
  text = await panelFromKv(env);
  if (text) { await panelToCache(text); return text; }
  text = await panelFromNetwork();
  if (text) { await Promise.all([panelToCache(text), panelToKv(env, text)]); }
  return text;
}

// 返回已校验的面板模板文本；拉取失败返回 null（调用方给出 503 说明页）
async function loadPanelTemplate(env) {
  if (PANEL_TEXT) return PANEL_TEXT;
  if (PANEL_LOADING) return PANEL_LOADING;
  if (Date.now() - PANEL_FAILED_AT < PANEL_RETRY_AFTER) return null;
  PANEL_LOADING = fetchPanelTemplate(env).then((text) => {
    if (text) PANEL_TEXT = text; else PANEL_FAILED_AT = Date.now();
    return text;
  }).finally(() => { PANEL_LOADING = null; });
  return PANEL_LOADING;
}

// 面板页面：在模板上注入字段表与共用校验函数（每个 isolate 只组装一次）；加载失败返回 null
let PANEL_PAGE = null;
async function panelPage(env) {
  if (PANEL_PAGE) return PANEL_PAGE;
  const tpl = await loadPanelTemplate(env);
  if (!tpl) return null;
  PANEL_PAGE = tpl
    .replace('/*@HOPLINE_SCHEMA@*/null', () => JSON.stringify(clientSchema()).replace(/</g, '\\u003c'))
    .replace('/*@HOPLINE_CHECK@*/null', () => '(' + checkFieldValue.toString() + ')')
    .replace('/*@HOPLINE_HTTP_PORTS@*/null', () => JSON.stringify([...HTTP_PORTS]));
  return PANEL_PAGE;
}

function panelUnavailable() {
  return new Response('面板页面暂时无法加载（已尝试 jsDelivr 与 GitHub 的 v' + VERSION + ' 版本）：请稍后刷新重试。代理与订阅不受影响。\n若一直如此，请确认仓库已存在版本标签 v' + VERSION + '，且 Worker 所在网络能访问 jsDelivr 或 raw.githubusercontent.com。',
    { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '15' } });
}
