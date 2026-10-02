// 测活总开关（面板「节点测活」/ 环境变量 PROBE_ALIVE）：关闭时所有测活函数直接返回 true，不剔除任何节点。
// 目前只用于默认模式下「优选域名」的预检（filterAliveDomains）。Cloudflare 运行时禁止 connect() 到 CF IP 段，
// 对 CF 段 IP 的 TCP 探测恒失败，因此 testProxyAlive 对 CF 段直接视为可用，实际检查的是「域名能否解析到 CF 段 IP」
let PROBE_ALIVE_ENABLED = false;
function setProbeAlive(v) { PROBE_ALIVE_ENABLED = (v === true || v === 'true' || v === '1' || v === 1); }

// 探测并发闸：Cloudflare Workers 每次调用同时等待响应头的连接数上限是 6，第 7 个连接会排队而不是报错；
// 探测函数的超时计时器从 connect() 调用时就开始，排队的探测会在轮到建连前超时并被误判为死节点。
// 用信号量把并发压到上限以下，并让超时计时器在拿到令牌后才启动
const PROBE_CONCURRENCY = 4;              // 留 2 个名额给 DoH fetch / KV / D1 等其它出网调用
let probeRunning = 0;
const probeWaiters = [];
function probeLimit() {
  if (probeRunning < PROBE_CONCURRENCY) { probeRunning++; return Promise.resolve(); }
  return new Promise(res => probeWaiters.push(res));
}
function probeRelease() {
  const next = probeWaiters.shift();
  if (next) next(); else probeRunning--;
}
// 对所有候选做并发受限的探测；fn 收 (item, index)，返回真值 = 可用
async function probeAll(items, fn) {
  const out = [];
  let idx = 0;
  const workers = Array.from({ length: Math.min(PROBE_CONCURRENCY, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++;
      await probeLimit();
      try { out[i] = await fn(items[i], i); }
      catch (e) { out[i] = false; }
      finally { probeRelease(); }
    }
  });
  await Promise.all(workers);
  return out;
}


// ProxyIP 可用性检测：TCP 连通测试（参考 TunnelBoard 测活思路，独立实现），2 秒超时
async function testProxyAlive(server, port, timeoutMs) {
  if (!PROBE_ALIVE_ENABLED) return true;   // 测活关闭：不剔除
  // Cloudflare 运行时禁止出站连接 CF IP 段：对 CF 段 IP 的 TCP 探测恒失败，跳过探测视为可用，
  // 避免精选池（实测 97% 可用）被整体判死清空、订阅被迫用随机 CF IP 补足（客户端可达率仅 28-45%）
  if (isCloudflareIP(server)) return true;
  const ms = timeoutMs || 2000;
  try {
    const conn = connect({ hostname: server, port: port });
    await Promise.race([conn.opened, new Promise((_, rej) => setTimeout(() => rej(new Error('proxy timeout')), ms))]);
    try { conn.close(); } catch (e) {}
    return true;
  } catch (e) { return false; }
}

// 域名可用性预检：DoH 解析首个 CF IP → TCP 测活，剔除死域名（NXDOMAIN / 解析到死 IP，客户端测速 -1 主因）。
// 活域名仍按域名形式下发（保留客户端动态 DNS 解析拿最优边缘的优势）；结果 10 分钟缓存，避免每次订阅重测
async function dohFirstCF(domain) {
  try {
    const res = await fetchTimeout('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=A', { headers: { accept: 'application/dns-json' } }, 4000);
    if (!res || !res.ok) return null;
    const j = await res.json();
    const ips = (j.Answer || []).filter(a => a.type === 1 && /^\d+\.\d+\.\d+\.\d+$/.test(a.data)).map(a => a.data);
    return ips.filter(isCloudflareIP)[0] || null;
  } catch (e) { return null; }
}
const DOMAIN_ALIVE_CACHE = { t: 0, key: null, list: null };
async function filterAliveDomains(domainText) {
  const domains = String(domainText || '').split(/[\n,;]+/).map(s => s.trim().replace(/^\*\./, '')).filter(Boolean);
  // 测活关闭：域名预检直接跳过，原样下发，不剔除任何域名
  if (!PROBE_ALIVE_ENABLED) return domains.join('\n');
  // 缓存按输入列表区分（面板改了优选域名后不能继续返回旧列表）
  const key = domains.join('\n');
  if (Date.now() - DOMAIN_ALIVE_CACHE.t < 10 * 60 * 1000 && DOMAIN_ALIVE_CACHE.key === key && DOMAIN_ALIVE_CACHE.list !== null) return DOMAIN_ALIVE_CACHE.list;
  // DoH 解析 + TCP 测活双重预检（10 分钟缓存）：解析不出 CF IP 或解析到非 CF 段的域名（源站已搬走）直接判死；
  // 并发受限（≤4）：DoH fetch + TCP 探测都算出网，避免撞 6 连接上限；排队不计入超时。
  // 只预检前 PREF_DOMAIN_DOH_LIMIT 个（子请求预算），其余原样保留
  const head = domains.slice(0, PREF_DOMAIN_DOH_LIMIT), tail = domains.slice(PREF_DOMAIN_DOH_LIMIT);
  const checked = await probeAll(head, async (d) => {
    const ip = await dohFirstCF(d);
    if (!ip || !isCloudflareIP(ip)) return { d, ok: false };
    return { d, ok: await testProxyAlive(ip, 443) };
  });
  const alive = checked.map((c, i) => (c && c.ok ? head[i] : null)).filter(Boolean).concat(tail);
  DOMAIN_ALIVE_CACHE.t = Date.now();
  DOMAIN_ALIVE_CACHE.key = key;
  DOMAIN_ALIVE_CACHE.list = alive.join('\n');
  return DOMAIN_ALIVE_CACHE.list;
}


// 单次订阅的节点上限（按 Workers / Pages 免费额度 10ms CPU 硬限设定）：结构化格式（Clash / Sing-box 等）
// 实测约 400 节点 ~8ms，行式格式拼接成本很低；统一取 500
const NODE_CAP = 500;

// 根据 UA 或指定格式生成订阅
async function generateSubscription(cfg, requestUrl, format, ua) {
  // 兜底：path 为空或为 "/" 时一律回退 UUID（兼容 KV 残留旧值；Worker WS/xhttp 代理仅在 panelPath=cfg.path 处理）
  if (!cfg.path || cfg.path === '/' || cfg.path === '') cfg.path = cfg.uuid;
  // 明文端口节点只由「仅 TLS 端口」控制（默认开启）；ECH 只对 TLS 生效，开启时同样只下发 TLS 端口节点。
  // 自定义域名的明文端口需在 Cloudflare 关闭「始终使用 HTTPS」，否则被 301 重定向、WebSocket 握手失败
  const rc = Object.assign({}, cfg, { host: cfg.host || new URL(requestUrl).hostname });
  const prefList = effectivePrefDomains(cfg);   // 面板填写的优选域名（整体替换内置列表）或内置列表
  if (rc.ech) rc.tlsOnly = true;
  // 筛选含 IPv6 时查询 AAAA 记录并生成 IPv6 节点（默认双选 IPv4+IPv6 同样生效）；
  // 仅勾选 IPv6（单选）时全部走 IPv6 来源（参考 CFNext v1.0.5 可达性原则）
  const ipT = (cfg.filter && cfg.filter.ipType) || [];
  const wantV6 = ipT.includes('IPv6');
  const onlyV6 = ipT.length === 1 && ipT[0] === 'IPv6';
  // 节点池由「地址来源」三项组装（rc.preferredDomains / rc.preferredIPs 只是本次订阅的内部中间结果，不是配置项）——
  // 1) 原生地址（src.native）：工作器域名直接作为节点 server 下发（默认关闭）；
  // 2) 优选域名（src.prefDomain）：第三方优选域名直接作为节点 server 下发（客户端连接时动态 DNS 解析，拿到当前最优 CF 边缘 IP）；
  // 3) 优选 IP（src.prefIp）：自定义优选 API / HostMonit / uouin 等在线来源（「优选配置 → 优选 IP 来源」）。
  // 这些来源都是 Cloudflare 任播 IP / 域名，大多不带地区标记（任播 IP 的落地机房取决于客户端所在网络），
  // 因此面板「节点地区」筛选通常不改变节点构成；来源一律只保留 Cloudflare 段，非 CF 段 IP 无法转发到 Worker
  const src = cfg.src || {};
  const useNative = src.native === true;            // 启用原生地址（工作器域名）
  const useDomain = src.prefDomain !== false;       // 启用优选域名（默认开）
  const useIp = src.prefIp !== false;               // 启用优选 IP（内置池 + 实时拉取，默认开）
  rc.preferredDomains = '';
  rc.preferredIPs = [];
  // 原生地址（工作器域名，IPv4 入口）：仅勾选 IPv6 时跳过，避免 v4 域名混入
  if (useNative && !onlyV6) rc.preferredDomains = rc.host + '#原生地址';
  // 仅勾选 IPv6 时跳过 v4 优选域名（域名节点为 IPv4 入口，混入会占满 cap 并被 filterNodes 剔除，导致数量控制下发不足）
  if (useDomain && !onlyV6) {
    // 域名可用性预检（仅节点测活开启时）：DoH 解析 + TCP 测活，死域名不下发；
    // 活域名仍按域名形式下发，保留客户端动态 DNS 解析拿当前最优 CF 边缘的优势
    const aliveDomains = await filterAliveDomains(prefList);
    if (aliveDomains) rc.preferredDomains = (rc.preferredDomains ? rc.preferredDomains + '\n' : '') + aliveDomains;
  }
  // 「优选 IP」的在线来源（面板「优选配置 → 优选 IP 来源」开关控制，并行拉取，每个来源 1 个子请求、缓存 10 分钟）：
  // 自定义优选 API 1 / 2（用户自选来源排最前）→ HostMonit → uouin。HostMonit 为纯 IPv4，仅勾选 IPv6 时跳过
  if (useIp) {
    const ps = cfg.ipsrc || {};
    const apiSrc = (n) => (ps['api' + n] && ps['api' + n + 'Url'])
      ? resolvePreferredDomains(ps['api' + n + 'Url'], 200, 300, true, false).catch(() => [])
      : Promise.resolve([]);
    const results = await Promise.all([
      apiSrc(1),
      apiSrc(2),
      (ps.hostmonit !== false && !onlyV6) ? fetchLatestPreferredIPs(150).catch(() => null) : null,
      ps.uouin === true ? fetchUouinIPs(!onlyV6, wantV6).catch(() => []) : null,
    ]);
    for (const list of results) if (list && list.length) rc.preferredIPs.push(...list);
  }
  // IPv6 节点来源：筛选含 IPv6 时只查询优选域名的 AAAA 记录（v4 已由域名节点覆盖，不重复查 A）。
  // 子请求预算：Workers 免费版每次请求最多 50 个子请求——IPv4+IPv6 混合时只解析前 V6_DOMAIN_LIMIT 个域名；
  // 仅勾选 IPv6 时 v4 来源全部跳过，预算充足，解析全部域名并并入官方域名 AAAA
  if (wantV6 && useDomain) {
    try {
      const v6src = onlyV6
        ? dohPrefDomains(prefList) + '\n' + BUILTIN_OFFICIAL_DOMAINS.join('\n')
        : prefList.split('\n').slice(0, V6_DOMAIN_LIMIT).join('\n');
      const v6dom = await resolvePreferredDomains(v6src, 40, onlyV6 ? 800 : 240, true, 'only');
      // 解析结果名为「域名-序号」，统一改为不带地区的通用名「优选IP-V6-NN」（地区筛选时作为通用节点保留）
      if (v6dom && v6dom.length) rc.preferredIPs.push(...v6dom.map((x, i) => Object.assign({}, x, { name: '优选IP-V6-' + String(i + 1).padStart(2, '0') })));
    } catch (e) { /* AAAA 解析失败不影响其它来源 */ }
  }
  // 地址来源全部关闭时用官方域名兜底，保证订阅不为空（客户端不会收到「无效订阅」）
  if (!useNative && !useDomain && !useIp) rc.preferredDomains = BUILTIN_OFFICIAL_DOMAINS.map((d, i) => d + '#域名-' + String(i + 1).padStart(2, '0')).join('\n');
  // 仅勾选 IPv6（单选）时清掉各来源混入的 IPv4（域名 AAAA 解析的 v4 与各在线来源中的 v4 一并剔除，
  // 避免 filterNodes 过滤空集后放宽回退全 v4；参考 CFNext v1.0.5 同款处理）
  if (onlyV6 && rc.preferredIPs) rc.preferredIPs = rc.preferredIPs.filter(x => String(x.ip).indexOf(':') >= 0);
  ua = (ua || '').toLowerCase();
  const forced = (format || '').toLowerCase();
  const cap = NODE_CAP;
  // 不对优选 IP 池做 TCP 测活剔除（对齐 1.0.6）：Worker 边缘连通性 ≠ 客户端连通性，且 Workers 无法连接 CF 段 IP，
  // 测活只会误杀或拖慢订阅；全量按顺序下发由客户端自行择优（节点测活开启时仅做优选域名 DoH 预检）
  let nodes = filterNodes(await buildNodes(rc, cap), cfg.filter);
  // 所有来源都没有产出节点时（如在线来源全部失败），用官方域名节点兜底，保证订阅不为空
  // （客户端不会收到「无效订阅」）；域名节点由客户端自行解析，IPv4 / IPv6 均可
  if (!nodes.length) {
    const fb = Object.assign({}, rc, { preferredDomains: BUILTIN_OFFICIAL_DOMAINS.map((d, i) => d + '#域名-' + String(i + 1).padStart(2, '0')).join('\n'), preferredIPs: [], tlsOnly: true });
    nodes = await buildNodes(fb, cap);
  }
  // 严格封顶：多协议膨胀可能越过上限，统一截断（节点数量只做上限，来源不足时按实际数量下发）
  if (nodes.length > cap) nodes.length = cap;
  nodes = uniqueNodeNames(nodes);
  let type, body;
  if (forced === 'clash') { type = 'text/yaml'; body = generateClash(rc, nodes); }
  else if (forced === 'singbox' || forced === 'sing-box') { type = 'application/json'; body = generateSingbox(rc, nodes); }
  else if (forced === 'surge') { type = 'text/plain'; body = generateSurge(rc, nodes); }
  else if (forced === 'surfboard') { type = 'text/plain'; body = generateSurfboard(rc, nodes); }
  else if (forced === 'loon') { type = 'text/plain'; body = generateLoon(rc, nodes); }
  else if (forced === 'quanx' || forced === 'quantumultx') { type = 'text/plain'; body = generateQuanX(rc, nodes); }
  else if (forced === 'plain' || forced === 'raw') { type = 'text/plain'; body = nodes.join('\n'); }
  else if (forced === 'v2ray' || forced === 'v2rayn' || forced === 'shadowrocket' || forced === 'nekoray' || forced === 'stash') {
    // 明文下发（与 1.0.6 一致）：base64 订阅在 AsteriskNG / v2rayNG 中按系统编码（GBK）解码，
    // 中文节点名（UTF-8）会被误读成乱码（如 美国 → 缇庡浗）；明文按响应 charset=utf-8 读取则正常
    type = 'text/plain'; body = nodes.join('\n');
  }
  // UA 自动识别
  else if (ua.includes('clash') || ua.includes('stash')) { type = 'text/yaml'; body = generateClash(rc, nodes); }
  else if (ua.includes('sing-box')) { type = 'application/json'; body = generateSingbox(rc, nodes); }
  else if (ua.includes('surge')) { type = 'text/plain'; body = generateSurge(rc, nodes); }
  else if (ua.includes('surfboard')) { type = 'text/plain'; body = generateSurfboard(rc, nodes); }
  else if (ua.includes('loon')) { type = 'text/plain'; body = generateLoon(rc, nodes); }
  else if (ua.includes('quantumult')) { type = 'text/plain'; body = generateQuanX(rc, nodes); }
  // 默认（v2rayN / Shadowrocket / 未知客户端）：返回 base64 编码订阅（V2rayN 标准格式）
  else { type = 'text/plain'; body = nodes.join('\n'); }   // 明文（同 1.0.6，避免客户端按 GBK 解码 base64 导致中文名称乱码）
  return { type, body, count: nodes.length };
}

