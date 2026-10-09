// ---------------------------------------------------------------------------
// 固定版本资源加载：体积较大的静态内容不内嵌在 Worker 里，而是由 Worker 按版本标签从 GitHub 拉取，
// 校验 SHA-256 后缓存。目前有两个资源：
//   - 面板页面 dist/panel.html（约 90KB）：校验后再注入字段表等运行时数据发给浏览器
//   - Clash 配置模板 dist/clash-template.yaml（约 15KB）：生成 Clash / Stash 订阅时拼在节点后面
// 特点：
//   - 浏览器始终只访问 Worker 自己的域名（无需访问第三方 CDN，CSP 也无需放行），路径伪装与登录鉴权不变
//   - 拉取发生在边缘，不受用户所在地区对 jsDelivr / GitHub 访问限制的影响
//   - 缓存键就是内容的 SHA-256：升级版本后哈希变了，自然落到新键重新拉取，旧条目无需清理，由 TTL 自行过期
//   - 来源固定为不可变的版本标签 v<VERSION>（构建时把各文件的哈希写进 Worker），永不拉取 main / latest
// 读取顺序：isolate 内存 → Cache API（同机房共享）→ KV（已绑定时，全球共享）→ 网络（三个镜像并发，先到先用）
// 拉不到时只影响用到它的功能：面板返回 503 说明页，Clash / Stash 订阅返回 503；其它订阅格式与代理完全不受影响
// ---------------------------------------------------------------------------
const ASSET_MAX_BYTES = 1024 * 1024;
const ASSET_FETCH_TIMEOUT = 6000;
const ASSET_RETRY_AFTER = 15000;                  // 全部来源失败后 15 秒内不再重试，避免打不开时每个请求都去打镜像
const ASSET_CACHE_TTL = 30 * 86400;

function pinnedAsset(name, path, sha256) {
  return { name, path, sha256, text: null, loading: null, failedAt: 0 };   // text：已校验的内容（每个 isolate 只加载一次）；loading：进行中的加载（并发请求共用）
}
const PANEL_ASSET = pinnedAsset('panel', '/dist/panel.html', /* @panel-sha256 */ '');
const CLASH_ASSET = pinnedAsset('clash', '/dist/clash-template.yaml', /* @clash-sha256 */ '');

function assetSources(a) {
  const tag = 'v' + VERSION;
  return [
    'https://cdn.jsdelivr.net/gh/' + UPDATE_REPO + '@' + tag + a.path,
    'https://fastly.jsdelivr.net/gh/' + UPDATE_REPO + '@' + tag + a.path,
    'https://raw.githubusercontent.com/' + UPDATE_REPO + '/' + tag + a.path,
  ];
}
const assetCacheKey = (a) => 'https://hopline.invalid/' + a.name + '/' + a.sha256;
const assetKvKey = (a) => a.name + ':' + a.sha256;

async function sha256Hex(buf) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
  let s = '';
  for (const b of d) s += b.toString(16).padStart(2, '0');
  return s;
}
// 字节 → 文本：大小超限或哈希不符一律视为无效（缓存损坏 / 镜像被篡改 / 标签内容不对）
async function verifiedAssetText(a, buf) {
  if (!buf || buf.byteLength > ASSET_MAX_BYTES) return null;
  if ((await sha256Hex(buf)) !== a.sha256) return null;
  return new TextDecoder().decode(buf);
}

async function assetFromNetwork(a) {
  const ac = new AbortController();
  const one = async (url) => {
    const res = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Hopline)' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await verifiedAssetText(a, await res.arrayBuffer());
    if (!text) throw new Error('hash mismatch');
    return text;
  };
  const timer = setTimeout(() => ac.abort(), ASSET_FETCH_TIMEOUT);
  try { return await Promise.any(assetSources(a).map(one)); }
  catch (e) { return null; }
  finally { clearTimeout(timer); ac.abort(); }   // 先到的一路成功后，取消其余仍在进行的请求
}

function assetCache() {
  try { return (typeof caches !== 'undefined' && caches.default) || null; } catch (e) { return null; }
}
async function assetFromCache(a) {
  const c = assetCache();
  if (!c) return null;
  try {
    const res = await c.match(assetCacheKey(a));
    return res ? await verifiedAssetText(a, await res.arrayBuffer()) : null;
  } catch (e) { return null; }
}
async function assetToCache(a, text) {
  const c = assetCache();
  if (!c) return;
  try {
    await c.put(assetCacheKey(a), new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=' + ASSET_CACHE_TTL } }));
  } catch (e) {}
}
async function assetFromKv(env, a) {
  const kv = kvStore(env);
  if (!kv || typeof kv.get !== 'function') return null;
  try {
    const v = await kv.get(assetKvKey(a));
    return v ? await verifiedAssetText(a, new TextEncoder().encode(v)) : null;
  } catch (e) { return null; }
}
async function assetToKv(env, a, text) {
  const kv = kvStore(env);
  if (!kv || typeof kv.put !== 'function') return;
  try { await kv.put(assetKvKey(a), text, { expirationTtl: ASSET_CACHE_TTL }); } catch (e) {}
}

async function fetchAsset(env, a) {
  let text = await assetFromCache(a);
  if (text) return text;
  text = await assetFromKv(env, a);
  if (text) { await assetToCache(a, text); return text; }
  text = await assetFromNetwork(a);
  if (text) { await Promise.all([assetToCache(a, text), assetToKv(env, a, text)]); }
  return text;
}

// 返回已校验的资源文本；拉取失败返回 null（调用方给出 503）
async function loadAsset(env, a) {
  if (a.text) return a.text;
  if (a.loading) return a.loading;
  if (Date.now() - a.failedAt < ASSET_RETRY_AFTER) return null;
  a.loading = fetchAsset(env, a).then((text) => {
    if (text) a.text = text; else a.failedAt = Date.now();
    return text;
  }).finally(() => { a.loading = null; });
  return a.loading;
}

// Clash 配置模板：拉不到时 Clash / Stash 订阅返回 503（其它格式不受影响）
async function requireClashTemplate(env) {
  const tpl = await loadAsset(env, CLASH_ASSET);
  if (!tpl) {
    throw Object.assign(new Error('Clash 配置模板暂时无法加载（已尝试 jsDelivr 与 GitHub 的 v' + VERSION + ' 版本），请稍后重试；其它格式的订阅不受影响。若一直如此，请确认仓库已存在版本标签 v' + VERSION + '，且 Worker 所在网络能访问 jsDelivr 或 raw.githubusercontent.com。'), { status: 503 });
  }
  return tpl;
}

// 面板页面：在模板上注入字段表与共用校验函数（每个 isolate 只组装一次）；加载失败返回 null
let PANEL_PAGE = null;
async function panelPage(env) {
  if (PANEL_PAGE) return PANEL_PAGE;
  const tpl = await loadAsset(env, PANEL_ASSET);
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
