// ---------------------------------------------------------------------------
// 内置地区反代域名池：proxyip.<地区>.cmliussss.net 社区反代服务（解析为非 Cloudflare IP）
// 出站兜底：直连与自定义反代均失败后使用，透明代理模式发送去掉 VLESS 头部的原始
// TLS 数据，由对端按 SNI 路由到目标
// ---------------------------------------------------------------------------
const RELAY_DOMAINS = {
  HK: 'proxyip.hk.cmliussss.net',
  US: 'proxyip.us.cmliussss.net',
  SG: 'proxyip.sg.cmliussss.net',
  JP: 'proxyip.jp.cmliussss.net',
  KR: 'proxyip.kr.cmliussss.net',
  DE: 'proxyip.de.cmliussss.net',
  SE: 'proxyip.se.cmliussss.net',
  NL: 'proxyip.nl.cmliussss.net',
  FI: 'proxyip.fi.cmliussss.net',
  GB: 'proxyip.gb.cmliussss.net',
  Oracle: 'proxyip.oracle.cmliussss.net',
  DigitalOcean: 'proxyip.digitalocean.cmliussss.net',
  Vultr: 'proxyip.vultr.cmliussss.net',
  Multacom: 'proxyip.multacom.cmliussss.net'
};

// 根据 Worker 所在机房 colo（IATA 代码）选择最近的中继地区
function selectRelayRegion(colo) {
  const c = (colo || '').toUpperCase();
  // 亚洲
  if (c.startsWith('HKG') || c.startsWith('HK')) return 'HK';
  if (c.startsWith('SIN') || c.startsWith('SG')) return 'SG';
  if (c.startsWith('NRT') || c.startsWith('KIX') || c.startsWith('TYO') || c.startsWith('OSA') || c.startsWith('JP')) return 'JP';
  if (c.startsWith('ICN') || c.startsWith('SEL') || c.startsWith('KR')) return 'KR';
  if (/^(HKG|SIN|NRT|KIX|ICN|TYO|OSA|SEL|HK|SG|JP|KR|SJC)/.test(c)) return 'HK';
  // 欧洲
  if (c.startsWith('FRA') || c.startsWith('BER') || c.startsWith('MUC') || c.startsWith('DUS') || c.startsWith('HAM') || c.startsWith('STR') || c.startsWith('DE')) return 'DE';
  if (c.startsWith('ARN') || c.startsWith('SE')) return 'SE';
  if (c.startsWith('AMS') || c.startsWith('NL')) return 'NL';
  if (c.startsWith('HEL') || c.startsWith('FI')) return 'FI';
  if (c.startsWith('LHR') || c.startsWith('MAN') || c.startsWith('GB') || c.startsWith('UK')) return 'GB';
  if (/^(FRA|ARN|AMS|HEL|LHR|MAN|CDG|MAD|VIE|ZRH|MXP|PRG|WAW|BER|MUC|DUS|HAM|STR|DE|SE|NL|FI|GB|UK|FR|ES|AT|CH|IT|CZ|PL)/.test(c)) return 'DE';
  // 北美及其他默认 US
  return 'US';
}

// PROXYIP 反代 IP 解析缓存（TTL 5 分钟：域名 → DoH TXT/A 解析结果）
const PROXYIP_CACHE = new Map();
// 限制缓存表大小：超出时淘汰最先插入的项（Map 按插入顺序遍历），避免长期运行的实例内存无限增长
function capMap(map, max) { while (map.size > max) map.delete(map.keys().next().value); }

// 解析反代域名为 IP 候选列表：
//   - IP 字面量直接返回
//   - 域名先查 TXT：TXT 含逗号/换行分隔的 IP 列表则解析为多候选；
//     TXT 为 @edtunnel 标记（反代服务约定）或无有效 TXT 时查 A 记录
//   - 结果缓存 5 分钟，避免每次连接都触发 DoH
const PROXYIP_TTL = 5 * 60 * 1000, PROXYIP_NEG_TTL = 30 * 1000;   // 成功缓存 5 分钟；失败 / 无记录缓存 30 秒（避免每个连接都重新查 DoH）
const PROXYIP_INFLIGHT = new Map();                              // 同一域名的并发解析合并为一次（冷启动时大量连接同时到达）
const PROXYIP_DOHS = ['https://cloudflare-dns.com/dns-query', 'https://dns.alidns.com/resolve', 'https://doh.pub/dns-query'];
async function resolveProxyIPs(host, port) {
  port = port || 443;
  if (isValidIp(host)) return [{ hostname: host, port }];
  const cacheKey = host + ':' + port;
  const hit = PROXYIP_CACHE.get(cacheKey);
  if (hit && Date.now() - hit.t < (hit.ips.length ? PROXYIP_TTL : PROXYIP_NEG_TTL)) return hit.ips;
  let job = PROXYIP_INFLIGHT.get(cacheKey);
  if (!job) {
    job = resolveProxyIPsUncached(host, port)
      .then((ips) => { PROXYIP_CACHE.set(cacheKey, { t: Date.now(), ips }); capMap(PROXYIP_CACHE, 200); return ips; })
      .finally(() => PROXYIP_INFLIGHT.delete(cacheKey));
    PROXYIP_INFLIGHT.set(cacheKey, job);
  }
  return job;
}
async function resolveProxyIPsUncached(host, port) {
  // 每种记录类型按端点顺序查询：前一个端点失败才换下一个（正常 1 个子请求，不再 3 个端点同时发）；
  // SERVFAIL 等视为失败换端点，NOERROR / NXDOMAIN 视为确定结果
  const dohQuery = async (type, filterType) => {
    const r = await dohFirst(PROXYIP_DOHS, (url) => url + '?name=' + encodeURIComponent(host) + '&type=' + type, (j) => {
      if (!j || (j.Status !== 0 && j.Status !== 3)) return null;
      return (j.Answer || []).filter(a => a.type === filterType).map(a => a.data);
    });
    return r || [];
  };

  // 并发查询 TXT 与 A 记录（TXT 优先，无有效 TXT 用 A）
  const [txtRecords, aRecords] = await Promise.all([dohQuery('TXT', 16), dohQuery('A', 1)]);

  let targets = [];
  // 1) TXT 记录：反代服务约定——TXT 存逗号/换行分隔的 IP 列表（支持 ip:port），或 @edtunnel 标记
  for (const raw of txtRecords) {
    // DNS TXT 转义：\010 是八进制换行符，需还原为分隔符；去掉首尾引号
    const val = String(raw).replace(/^"|"$/g, '').replace(/\\010/g, ',').replace(/\n/g, ',').trim();
    if (!val) continue;
    if (val === '@edtunnel') {
      // @edtunnel 是反代服务标记：实际反代 IP 在 A 记录中
      targets = aRecords.filter(ip => /^\d+\.\d+\.\d+\.\d+$/.test(ip)).map(ip => ({ hostname: ip, port }));
      break;
    }
    // TXT 值为逗号/分号/空格分隔的条目，每条可为 IP 或 IP:port
    const entries = val.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
    const parsed = [];
    for (const entry of entries) {
      const { host: h, port: p } = parseHostPort(entry, port);
      if (isValidIp(h)) parsed.push({ hostname: h, port: p });
    }
    if (parsed.length) { targets = parsed; break; }
  }

  // 2) 无有效 TXT 时用 A 记录
  if (!targets.length) {
    targets = aRecords.filter(ip => /^\d+\.\d+\.\d+\.\d+$/.test(ip)).map(ip => ({ hostname: ip, port }));
  }

  // 3) 无 A 记录时回退 AAAA（IPv6 反代）
  if (!targets.length) {
    const aaaaRecs = await dohQuery('AAAA', 28);
    targets = aaaaRecs.filter(ip => isValidIp(ip)).map(ip => ({ hostname: ip, port }));
  }

  // 去重（按 hostname:port）
  const seen = new Set();
  return targets.filter(t => { const k = t.hostname + ':' + t.port; if (seen.has(k)) return false; seen.add(k); return true; });
}

// 出站并发竞速：同时发起多路连接，取最先握手成功的一路，后到的成功连接立即关闭（释放 CF 同时连接配额）。
// 替代原先「串行尝试 + 逐级超时」：目标站在 Cloudflare 上时直连被回环保护拦截，过去要白等约 6s 才轮到反代
async function raceConnect(jobs) {
  if (!jobs || !jobs.length) return null;
  let settled = false;
  return await new Promise((resolve) => {
    let left = jobs.length;
    const finish = (sock) => {
      left--;
      if (sock) {
        if (settled) { try { sock.close(); } catch (e) { /* 忽略 */ } }
        else { settled = true; resolve(sock); }
      } else if (left <= 0 && !settled) {
        resolve(null);
      }
    };
    for (const job of jobs) {
      Promise.resolve().then(job).then((s) => finish(s && s.readable ? s : null), () => finish(null));
    }
  });
}

// 直连优先竞速：直连与反代并发发起，但优先采用直连——
//   · 直连在 graceMs 内成功 → 用直连（反代是第三方 SNI 中转，多一跳且可能误路由）
//   · 直连失败 / 窗口到期   → 用已就绪的反代（反代并发建立，不额外等待）
//   · 反代也不可用          → 继续等直连
// 若不设窗口，就近反代的握手普遍比跨境直连快，几乎所有 TLS 流量都会被反代抢走。
// graceMs = 0：不等直连（目标确定在 CF 段，直连必被回环保护拦截）
async function racePreferDirect(directJob, relayJobs, graceMs) {
  let used = null;
  const recycle = (s) => { if (s && s !== used) { try { s.close(); } catch (e) { /* 忽略 */ } } };
  const directP = directJob
    ? Promise.resolve().then(directJob).then((s) => (s && s.readable ? s : null), () => null)
    : Promise.resolve(null);
  const relayP = (relayJobs && relayJobs.length)
    ? raceConnect(relayJobs).then((s) => (s && s.readable ? s : null), () => null)
    : Promise.resolve(null);
  let graceTimer = null;
  const first = await Promise.race([
    directP,
    new Promise((r) => { graceTimer = setTimeout(() => r(GRACE_EXPIRED), graceMs); }),
  ]);
  clearTimeout(graceTimer);
  if (first && first !== GRACE_EXPIRED) { used = first; relayP.then(recycle); return used; }   // 直连胜出
  const relay = await relayP;
  if (relay) { used = relay; directP.then(recycle); return used; }                              // 反代接管
  used = await directP;                                                                          // 反代不可用：等直连
  return used;
}
const GRACE_EXPIRED = Symbol('grace');

const DIRECT_TIMEOUT = 4000;   // 直连超时（反代并发进行，无需久等）
const RELAY_TIMEOUT = 4000;    // 单个反代 IP 连接超时
const MAX_RACERS = 4;          // 单次竞速最多并发路数（CF 单请求同时出站连接上限 6，留余量给 DoH 等）
const SNIFF_WAIT_MS = 80;      // 头部已完整但尚无数据时，等首包判定协议的上限（不能拖慢建连）
const DIRECT_GRACE_MS = 300;   // 直连优先窗口

// 首包协议判定：自定义反代与内置地区反代都是 SNI 型透明代理，只能搬运 TLS 流量（按 ClientHello 的 SNI 路由）。
// 非 TLS 流量（Telegram MTProto / 明文 HTTP / 裸 TCP）经反代能握手但转发不出任何数据 → 客户端无限重连，
// 因此非 TLS 只走直连与用户配置的出站代理（SOCKS5 / HTTP / SS 是真代理，可承载任意协议）。
// TLS 记录头固定为 0x16 0x03；数据不足 3 字节为 unknown（按可走反代处理，保持原行为）
function sniffPayloadKind(bytes) {
  if (!bytes || bytes.byteLength < 3) return 'unknown';
  return (bytes[0] === 0x16 && bytes[1] === 0x03) ? 'tls' : 'nontls';
}

// 打开到目标的出站连接（自定义反代 / 出站代理 / 直连 / 内置地区反代）
// 反代均为透明代理：发送去掉 VLESS/Trojan 头部的原始 TLS 数据，对端按 SNI 路由到目标。
// 出站模式语义：only = 仅走出站代理（失败用内置地区反代兜底）；'' 默认 = 出站代理优先，失败后直连 ∥ 反代；
// no = 直连 ∥ 反代优先，都不通时最后用出站代理
async function openOutbound(parsed, cfg, colo, payloadKind) {
  const proxy = parseProxyAddress(cfg.outboundProxy);
  const mode = cfg.outboundMode || '';
  const allowSniRelay = payloadKind !== 'nontls';

  const viaProxy = proxy ? (proxy.type === 'http' || proxy.type === 'https'
    ? (t) => connectViaHttpProxy(proxy, t)
    : proxy.type === 'ss'
      ? (t) => connectViaShadowsocks(proxy, t)
      : (t) => connectViaSocks5(proxy, t)) : null;

  let lastErr;
  const attempt = async (fn) => { try { const r = await fn(); if (r) return r; } catch (e) { lastErr = e; } return null; };
  const fail = () => { throw lastErr || new Error('所有出站方式均失败'); };

  // 1) 用户填写的「反代 / 落地 IP」：作为固定出口优先使用（多个解析结果并发竞速），失败再走下面的流程
  const relay = cfg.proxyIP ? parseHostPort(cfg.proxyIP, 443) : null;
  if (relay && relay.host && allowSniRelay) {
    let customTargets = await resolveProxyIPs(relay.host, relay.port);
    if (!customTargets.length) customTargets = [{ hostname: relay.host, port: relay.port }];
    const r = await raceConnect(customTargets.slice(0, MAX_RACERS).map(t => () => attempt(() => connectDirect(t, RELAY_TIMEOUT))));
    if (r) return r;
  }

  const target = { hostname: parsed.addr, port: parsed.port };
  // 2) 内置地区反代：本地区（2 个 IP）+ 次地区（1 个 IP）并发，DoH 解析（5 分钟缓存）一并放入竞速
  const relayJobs = () => {
    if (!allowSniRelay) return [];
    const primary = selectRelayRegion(colo);
    const regions = [primary, ...Object.keys(RELAY_DOMAINS).filter(r => r !== primary)].slice(0, 2);
    return regions.map((region, idx) => async () => {
      let ts = [];
      try { ts = await resolveProxyIPs(RELAY_DOMAINS[region], 443); } catch (e) { return null; }
      if (!ts.length) return null;
      return await raceConnect(ts.slice(0, idx === 0 ? 2 : 1).map(t => () => attempt(() => connectDirect(t, RELAY_TIMEOUT))));
    });
  };
  const directJob = () => attempt(() => connectDirect(target, DIRECT_TIMEOUT));
  const proxyJob = viaProxy ? () => attempt(() => viaProxy(target)) : null;
  // 目标为 CF 段 IP → 直连必被回环保护拦截，不设直连窗口
  const grace = isCloudflareIP(parsed.addr) ? 0 : DIRECT_GRACE_MS;
  const pickBest = () => racePreferDirect(directJob, relayJobs().slice(0, MAX_RACERS - 1), grace);

  if (mode === 'only') {
    if (proxyJob) {
      const r = await proxyJob(); if (r) return r;
      const r2 = await racePreferDirect(null, relayJobs(), 0); if (r2) return r2;
      return fail();
    }
    const r = await pickBest(); if (r) return r;   // 未配置出站代理：按直连处理
    return fail();
  }
  if (mode === '' && proxyJob) {
    const r = await proxyJob(); if (r) return r;
    const r2 = await pickBest(); if (r2) return r2;
    return fail();
  }
  const r = await pickBest(); if (r) return r;
  if (proxyJob) { const r2 = await proxyJob(); if (r2) return r2; }
  return fail();
}

// 双向管道：socket 可读 → send 回调；结束调用 onDone
async function pumpToReader(reader, send, onDone) {
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      send(value);
    }
  } catch (e) { /* 忽略 */ }
  try { if (onDone) onDone(); } catch (e) { /* 忽略 */ }
}

