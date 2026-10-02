// 管理面板与配置接口测试（node:test，无第三方依赖）：直接加载构建产物 CFNext.js，
// 用内存 Map 模拟 KV、桩替换 cloudflare:sockets 与外网 fetch。运行：npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

// cloudflare:sockets 仅存在于 Workers 运行时：测试中替换为不可用的桩
const hooks = `
export async function resolve(spec, ctx, next) {
  if (spec === 'cloudflare:sockets') {
    // 默认不可用；出站测试通过 globalThis.__connect 注入可控的假连接
    return { url: 'data:text/javascript,export function connect(a){ if (globalThis.__connect) return globalThis.__connect(a); throw new Error("sockets unavailable in tests"); }', shortCircuit: true };
  }
  return next(spec, ctx);
}`;
register('data:text/javascript,' + encodeURIComponent(hooks));
// 订阅生成会拉取外部优选源：测试环境一律离线，走各处的失败兜底
globalThis.fetch = async () => { throw new Error('offline in tests'); };

const worker = (await import('../CFNext.js')).default;

const UUID = '11111111-2222-4333-8444-555555555555';
const UUID2 = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const BROWSER = 'Mozilla/5.0 (X11; Linux x86_64)';

function kv(init = {}) {
  const m = new Map(Object.entries(init).map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)]));
  return {
    m,
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, v); },
    async delete(k) { m.delete(k); },
  };
}
const stored = (env) => JSON.parse(env.K.m.get('config'));

async function call(env, path, { method = 'GET', body, cookie, ua = BROWSER, headers = {} } = {}) {
  const h = { 'User-Agent': ua, ...headers };
  if (cookie) h.Cookie = cookie;
  if (body !== undefined && typeof body !== 'string') { h['Content-Type'] = 'application/json'; body = JSON.stringify(body); }
  return worker.fetch(new Request('https://node.example.com' + path, { method, headers: h, body, redirect: 'manual' }), env, {});
}
async function login(env, password = 'pw', panelPath = UUID) {
  const res = await call(env, '/login', {
    method: 'POST', body: 'password=' + encodeURIComponent(password) + '&next=' + encodeURIComponent('/' + panelPath),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': '203.0.113.' + Math.floor(Math.random() * 250) },
  });
  assert.equal(res.status, 200, 'login should succeed');
  return res.headers.get('Set-Cookie').split(';')[0];
}
const baseEnv = (extra = {}) => ({ U: UUID, ADMIN: 'pw', K: kv(), ...extra });
// 固定节点列表：把若干 `IP:端口#名称` 行托管为「自定义优选 API 1」的响应（默认模式下唯一的节点来源），测试里用它精确控制节点
const NODE_LISTS = new Map();
const fixedNodes = (lines, extra = {}) => {
  const url = 'https://nodes.test/' + createHash('md5').update(lines).digest('hex') + '.txt';
  NODE_LISTS.set(url, lines);
  return { cfgRev: 2, src: { prefDomain: false }, ipsrc: { hostmonit: false, uouin: false, api1: true, api1Url: url }, filter: { ipType: ['IPv4'] }, ...extra };
};
const nodesFetch = (u) => NODE_LISTS.has(u) ? new Response(NODE_LISTS.get(u)) : new Response('Not Found', { status: 404 });

test('GET /api/config 返回字段表默认值（与旧 DEFAULT_CONFIG 一致）及派生信息', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const r = await (await call(env, `/${UUID}/api/config`, { cookie })).json();
  assert.equal(r.ok, true);
  const d = r.data;
  // 旧 DEFAULT_CONFIG 的取值（filter.region 由 'all' 改为等价的 ['all']，src 为面板保存的地址来源默认值）
  const legacy = {
    host: '', enableVless: true, enableTrojan: false, trojanPassword: '', enableXhttp: false,
    alpn: '', ech: false, echHost: 'cloudflare-ech.com', echDns: '', tlsOnly: true,
    proxyIP: '', outboundProxy: '', outboundMode: '',
    filter: { region: ['all'], ipType: ['IPv4', 'IPv6'], isp: ['移动', '联通', '电信'] },
    src: { native: false, prefDomain: true, prefIp: true },
  };
  for (const [k, v] of Object.entries(legacy)) assert.deepEqual(d[k], v, k);
  for (const k of ['optimizer', 'preferredDomains', 'preferredIPs']) assert.equal(k in d, false, `已移除的自定义订阅 / 随机优选配置 ${k}`);
  assert.equal(d.uuid, UUID);
  assert.equal(d.path, '', '面板路径跟随 UUID 时返回空');
  assert.equal(d.panelPath, UUID);
  assert.equal(d.adminSet, true);
  assert.equal('admin' in d, false, '不下发管理密码');
  assert.deepEqual(d.envLocked, { admin: 'ADMIN' });
  for (const k of ['nodeLimit', 'nodeLimitCount', 'polling', 'cfAccountId', 'cfApiToken', 'cfApiTokenSet', 'quotaAuto', 'caps']) assert.equal(k in d, false, `已移除的配额安全字段 ${k}`);
  assert.equal(d.ipsrc.uouin, true, 'uouin 默认开启');
});

test('保存空 / 非法 UUID 被拒绝并返回字段级错误（问题 1）', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  for (const bad of ['', 'not-a-uuid']) {
    const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { uuid: bad } });
    assert.equal(res.status, 400);
    const r = await res.json();
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].field, 'uuid');
  }
  assert.equal(env.K.m.has('config'), false, '校验失败不写 KV');
});

test('KV 中残留非法 UUID 时回退环境变量 U，面板仍可进入（问题 1）', async () => {
  const env = baseEnv({ K: kv({ config: { uuid: '', path: '' } }) });
  const cookie = await login(env);
  const res = await call(env, `/${UUID}/api/config`, { cookie });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).data.uuid, UUID);
});

test('字段校验：范围、枚举、格式、全部协议关闭', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const cases = [
    [{ path: 'a/b' }, 'path'],
    [{ path: 'login' }, 'path'],
    [{ subUrl: 'version' }, 'subUrl'],
    [{ host: 'bad host' }, 'host'],
    [{ outboundProxy: 'ss://rc4:pw@1.2.3.4:8388' }, 'outboundProxy'],
    [{ prefDomains: 'a.example.com:443' }, 'prefDomains'],
    [{ filter: { region: ['XX'] } }, 'filter.region'],
    [{ enableVless: false, enableTrojan: false, enableXhttp: false }, 'enableVless'],
  ];
  for (const [body, field] of cases) {
    const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body });
    assert.equal(res.status, 400, JSON.stringify(body));
    const r = await res.json();
    assert.ok(r.errors.some(e => e.field === field), `${JSON.stringify(body)} → ${JSON.stringify(r.errors)}`);
  }
});

test('保存只写入字段表登记的配置项，规范化取值，忽略未知与内部字段（问题 8）', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const res = await call(env, `/${UUID}/api/config`, {
    method: 'POST', cookie,
    body: {
      admin: 'new-secret', _quotaCap: 1, version: '9.9.9', fragment: 'x', src: { customPref: true, native: true },
      optimizer: { subRandomCount: '30', subMode: 'random' }, nodeLimitCount: 300, subUrl: '/AAZ/sub', host: 'https://Node.Example.com/path', filter: { region: ['all', 'HK'] },
      preferredIPs: [{ ip: '[2606:4700::1]', port: '8443', name: ' 香港 ' }], preferredDomains: 'x.example.com',
    },
  });
  const r = await res.json();
  assert.equal(res.status, 200, JSON.stringify(r));
  const s = stored(env);
  assert.equal('admin' in s, false, 'ADMIN 由环境变量提供时不写入 KV');
  for (const k of ['_quotaCap', 'version', 'fragment']) assert.equal(k in s, false, k);
  assert.equal('customPref' in s.src, false);
  assert.equal(s.src.native, true);
  for (const k of ['optimizer', 'preferredIPs', 'preferredDomains']) assert.equal(k in s, false, `${k}（已移除的自定义订阅 / 随机优选配置）不写入`);
  assert.equal('nodeLimitCount' in s, false, '已移除的字段不写入');
  assert.equal(s.subUrl, 'AAZ');
  assert.equal(s.host, 'Node.Example.com');
  assert.deepEqual(s.filter.region, ['all']);
  assert.ok(r.ignored.includes('admin') && r.ignored.includes('_quotaCap') && r.ignored.includes('src.customPref') && r.ignored.includes('nodeLimitCount'));
  assert.ok(r.ignored.includes('optimizer') && r.ignored.includes('preferredIPs') && r.ignored.includes('preferredDomains'));
  assert.equal(r.data.src.native, true, '响应直接反映刚保存的配置');
});

test('未绑定 KV 时保存返回明确错误（问题 10）', async () => {
  const env = baseEnv({ K: undefined });
  const cookie = await login(env);
  const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'h2' } });
  assert.equal(res.status, 400);
  assert.match((await res.json()).msg, /KV/);
});

test('修改 UUID：重新签发登录态并返回新面板路径（问题 2）', async () => {
  const env = baseEnv({ ADMIN: undefined, K: kv({ config: { admin: 'pw' } }) });
  const cookie = await login(env);
  const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { uuid: UUID2.toUpperCase() } });
  const r = await res.json();
  assert.equal(res.status, 200, JSON.stringify(r));
  assert.equal(r.data.uuid, UUID2);
  assert.equal(r.data.panelPath, UUID2, '路径跟随 UUID');
  const newCookie = res.headers.get('Set-Cookie');
  assert.ok(newCookie && newCookie.startsWith('cfnext_auth='));
  const again = await call(env, `/${UUID2}/api/config`, { cookie: newCookie.split(';')[0] });
  assert.equal(again.status, 200, '新令牌可直接访问新路径');
  const old = await call(env, `/${UUID2}/api/config`, { cookie });
  assert.equal(old.status, 403, '旧令牌随 UUID 变更失效');
});

test('环境变量锁定的字段在面板只读、保存时忽略（问题 3）', async () => {
  const env = baseEnv({ D: 'panel' });
  const cookie = await login(env, 'pw', 'panel');
  const r = await (await call(env, '/panel/api/config', { cookie })).json();
  assert.deepEqual(r.data.envLocked, { path: 'D', admin: 'ADMIN' });
  const res = await call(env, '/panel/api/config', { method: 'POST', cookie, body: { path: 'other' } });
  const s = await res.json();
  assert.equal(res.status, 200);
  assert.equal(s.data.panelPath, 'panel');
  assert.equal('path' in stored(env), false);
});

test('订阅别名只输出订阅，不开放面板 / 管理接口（问题 6）', async () => {
  const env = baseEnv({ K: kv({ config: { subUrl: 'AAZ', filter: { ipType: ['IPv4'] } } }) });
  const cookie = await login(env);
  const sub = await call(env, '/AAZ/sub', { ua: 'v2rayN/7.0' });
  assert.equal(sub.status, 200);
  assert.match(await sub.text(), /^vless:\/\//m);
  assert.equal((await call(env, '/AAZ', { cookie })).status, 404, '别名下不提供面板');
  assert.equal((await call(env, '/AAZ/api/config', { cookie })).status, 404, '别名下不提供管理接口');
  assert.equal((await call(env, `/${UUID}`, { cookie })).status, 200, '面板路径不受影响');
});

test('预览与订阅同一流程：返回节点数，订阅不写 KV（问题 7）', async () => {
  const lines = Array.from({ length: 10 }, (_, i) => `104.16.1.${i + 1}:443#n${i + 1}`).join('\n');
  const env = baseEnv({ K: kv({ config: fixedNodes(lines) }) });
  const cookie = await login(env);
  await withFetch(nodesFetch, async () => {
    const r = await (await call(env, `/${UUID}/api/sub?fmt=v2ray`, { cookie })).json();
    assert.equal(r.ok, true);
    assert.equal(r.count, 10);
    assert.equal(r.body.trim().split('\n').length, 10);
    const sub = await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' });
    assert.equal((await sub.text()).trim().split('\n').length, 10);
  });
  assert.deepEqual([...env.K.m.keys()], ['config'], '订阅不再写入轮询窗口（issued）');
});

test('面板页面注入字段表与共用校验函数', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const res = await call(env, `/${UUID}`, { cookie });
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.equal(html.includes('@CFNEXT_'), false, '占位符均已替换');
  const schemaJson = html.match(/var SCHEMA = (\[.*?\]) \|\| \[\];/s);
  assert.ok(schemaJson, '字段表已注入');
  const schema = JSON.parse(schemaJson[1]);
  assert.ok(schema.some(d => d.key === 'uuid' && d.el === 'a-uuid'));
  assert.ok(schema.every(d => !('check' in d)), '仅服务端属性不下发');
  // 注入的校验函数可在页面独立执行（不依赖外部变量）
  const src = html.match(/var sharedCheck = (\(function checkFieldValue[\s\S]*?\n\}\));/);
  assert.ok(src, '校验函数已注入');
  const check = new Function('return ' + src[1])();
  assert.deepEqual(check({ type: 'int', min: 1, max: 99 }, '42'), { value: 42 });
  assert.ok(check({ type: 'int', min: 1, max: 99 }, '500').error);
  assert.ok(check(schema.find(d => d.key === 'uuid'), 'x').error);
  // 页面中的每个字段控件都存在
  for (const d of schema) {
    for (const id of [d.el, ...Object.values(d.els || {})].filter(Boolean)) assert.ok(html.includes(`id="${id}"`), `缺少控件 #${id}（${d.key}）`);
  }
});

test('检测更新：以仓库 CFNext.js 为基准，有更新时直接返回其内容，60 秒内走缓存', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const offline = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url) => {
    seen.push(String(url));
    if (String(url) === 'https://raw.githubusercontent.com/iv7777/CFNext/main/CFNext.js') {
      return new Response("// banner\nconst VERSION = '9.9.9';\n// …\n");
    }
    return new Response('Not Found', { status: 404 });
  };
  try {
    const r = await (await call(env, `/${UUID}/api/update`, { cookie })).json();
    assert.equal(r.ok, true);
    assert.equal(r.data.latest, '9.9.9');
    assert.equal(r.data.hasUpdate, true);
    assert.match(r.data.code, /const VERSION = '9\.9\.9'/);
    assert.deepEqual(seen, ['https://raw.githubusercontent.com/iv7777/CFNext/main/CFNext.js'], '只请求一次 CFNext.js');
    const again = await (await call(env, `/${UUID}/api/update`, { cookie })).json();
    assert.equal(again.data.latest, '9.9.9');
    assert.equal(seen.length, 1, '60 秒内复用缓存');
  } finally {
    globalThis.fetch = offline;
  }
});

// ---------------- 优选 IP 来源与下发 ----------------
const subLinks = async (env) => (await (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' })).text()).split('\n').filter(l => /^(vless|trojan):\/\//.test(l));
const hostOf = (l) => l.match(/@(\[[^\]]+\]|[^:?]+)/)[1];
const nameOf = (l) => decodeURIComponent(l.slice(l.indexOf('#') + 1));

test('单次订阅最多下发 500 个节点，每次下发相同（不再轮询换新）', async () => {
  // 两个自定义 API 各提供 200 个 CF IP，VLESS + Trojan 共 800 个节点：截断到 500
  const pool = (n) => Array.from({ length: 200 }, (_, i) => '104.16.' + n + '.' + (i + 1)).join('\n');
  const offline = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const m = String(url).match(/^https:\/\/pool\.example\.com\/cap(\d)\.txt$/);
    return m ? new Response(pool(10 + Number(m[1]))) : new Response('Not Found', { status: 404 });
  };
  const env = baseEnv({ K: kv({ config: { enableTrojan: true, filter: { ipType: ['IPv4'] }, src: { prefDomain: false },
    ipsrc: { hostmonit: false, uouin: false, api1: true, api1Url: 'https://pool.example.com/cap1.txt', api2: true, api2Url: 'https://pool.example.com/cap2.txt' } } }) });
  try {
    const a = await subLinks(env);
    const b = await subLinks(env);
    assert.equal(a.length, 500);
    assert.deepEqual(b, a, '两次更新下发相同节点');
  } finally { globalThis.fetch = offline; }
  assert.equal(env.K.m.has('issued'), false);
});

test('选择具体地区时仍保留不带地区的通用节点（优选域名节点）', async () => {
  const env = baseEnv({ K: kv({ config: { filter: { region: ['HK'], ipType: ['IPv4'] } } }) });
  const names = (await subLinks(env)).map(nameOf);
  assert.ok(names.some(n => /^优选IP-\d+$/.test(n)), '优选域名节点（通用）保留');
});

test('默认模式（IPv4+IPv6）子请求数不超过免费版 50 个上限，DoH 不重复查询', async () => {
  const env = baseEnv({ K: kv({ config: {} }) });
  const offline = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url) => {
    seen.push(String(url));
    if (String(url).startsWith('https://cloudflare-dns.com/')) return new Response(JSON.stringify({ Status: 0, Answer: [] }), { headers: { 'content-type': 'application/dns-json' } });
    return new Response('Not Found', { status: 404 });
  };
  try {
    const links = await subLinks(env);
    assert.ok(links.length > 0);
  } finally {
    globalThis.fetch = offline;
  }
  assert.ok(seen.length <= 50, `子请求 ${seen.length} 个：\n${seen.join('\n')}`);
  assert.equal(seen.filter(u => u.includes('alidns')).length, 0, 'Cloudflare DoH 正常应答（即使无记录）时不再查询阿里 DNS');
  assert.equal(seen.filter(u => u.startsWith('https://bestcf.pages.dev/')).length, 0, '默认模式不再拉取 bestcf 中转池');
});

test('HostMonit 优选改为调用数据接口：按运营商命名、只保留 CF 段并去重；运营商筛选保留通用节点', async () => {
  const env = baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'], isp: ['移动'] } } }) });
  const offline = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, opts = {}) => {
    calls.push([String(url), opts.method || 'GET', opts.body]);
    if (String(url) === 'https://api.hostmonit.com/get_optimization_ip') {
      return new Response(JSON.stringify({ code: 200, info: [
        { ip: '198.41.208.52', line: 'CM' }, { ip: '198.41.209.212', line: 'CM' },
        { ip: '162.159.128.65', line: 'CU' }, { ip: '198.41.208.52', line: 'CT' },   // 重复 IP：一个节点，名称含两条线路
        { ip: '104.19.0.9', line: 'CT' }, { ip: '8.8.8.8', line: 'CM' },             // 非 CF 段：丢弃
      ] }), { headers: { 'content-type': 'application/json' } });
    }
    return new Response('Not Found', { status: 404 });
  };
  let links;
  try { links = await subLinks(env); } finally { globalThis.fetch = offline; }
  const hm = calls.find(c => c[0].includes('hostmonit'));
  assert.deepEqual([hm[1], JSON.parse(hm[2])], ['POST', { key: 'iDetkOys' }]);
  const byName = Object.fromEntries(links.map(l => [nameOf(l), hostOf(l)]));
  assert.equal(byName['移动/电信-01'], '198.41.208.52');
  assert.equal(byName['移动-01'], '198.41.209.212');
  assert.equal(links.filter(l => hostOf(l) === '198.41.208.52').length, 1, '同一 IP 只下发一次');
  assert.ok(!links.some(l => hostOf(l) === '8.8.8.8'), '非 CF 段 IP 被丢弃');
  // 只勾选「移动」：剔除联通 / 电信节点，保留移动节点与不带运营商标记的通用节点
  assert.ok(!('联通-01' in byName) && !('电信-01' in byName), '未勾选运营商的节点被剔除');
  assert.ok(Object.keys(byName).some(n => /^优选IP-\d+$/.test(n)), '通用节点（优选域名）保留');
});

// ---------------- 优选 IP 来源开关：HostMonit / uouin / 自定义 API ----------------
import { createHash } from 'node:crypto';
const md5 = (s) => createHash('md5').update(s).digest('hex');
async function withFetch(handler, fn) {
  const offline = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, opts = {}) => { calls.push(String(url)); return handler(String(url), opts); };
  try { return await fn(calls); } finally { globalThis.fetch = offline; }
}
const notFound = () => new Response('Not Found', { status: 404 });

test('uouin 来源：签名与文档一致，按线路命名、只保留 CF 段，默认开启', async () => {
  const uouinData = { data: {
    ctcc: { info: [{ ip: '172.64.147.19' }, { ip: '8.8.8.8' }] },
    cucc: { info: [{ ip: '104.20.20.241' }] },
    cmcc: { info: [{ ip: '104.17.212.240' }] },
    bgp: { info: [{ ip: '172.64.151.168' }] },
    ipv6: { info: [{ ip: '[2a06:98c1:310a:fb::5f0]' }] },
  } };
  const handler = (url) => url.startsWith('https://api.uouin.com/') ? new Response(JSON.stringify(uouinData)) : notFound();
  // 默认开启
  await withFetch(handler, async (calls) => {
    const links = await subLinks(baseEnv());
    const u = new URL(calls.find(x => x.includes('uouin')));
    assert.equal(u.searchParams.get('key'), md5(md5('DdlTxtN0sUOu') + '70cloudflareapikey' + u.searchParams.get('time')));
    assert.match(u.searchParams.get('time'), /^\d{13}$/);
    const byName = Object.fromEntries(links.map(l => [nameOf(l), hostOf(l)]));
    assert.equal(byName['电信-U01'], '172.64.147.19');
    assert.equal(byName['联通-U01'], '104.20.20.241');
    assert.equal(byName['移动-U01'], '104.17.212.240');
    assert.equal(byName['多线-U01'], '172.64.151.168');
    assert.equal(byName['IPv6-U01'], '[2a06:98c1:310a:fb::5f0]');
    assert.ok(!links.some(l => hostOf(l) === '8.8.8.8'));
  });
  // 关闭：不请求 uouin，也不下发其（已缓存的）节点
  await withFetch(handler, async (calls) => {
    const links = await subLinks(baseEnv({ K: kv({ config: { ipsrc: { uouin: false } } }) }));
    assert.equal(calls.filter(u => u.includes('uouin')).length, 0);
    assert.ok(!links.some(l => /-U\d+$/.test(nameOf(l))));
  });
});

test('自定义优选 API 1/2：开关控制、只保留 CF 段；开启但未填地址时保存报错', async () => {
  const handler = (url) => url === 'https://mine.example.com/ips.txt'
    ? new Response('104.16.5.5:443#自有-A\n104.16.5.6\n8.8.8.8:443#外部')
    : notFound();
  await withFetch(handler, async (calls) => {
    const off = await subLinks(baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'] }, ipsrc: { api1Url: 'https://mine.example.com/ips.txt' } } }) }));
    assert.ok(!off.some(l => hostOf(l) === '104.16.5.5'), '开关关闭时不使用');
    assert.equal(calls.filter(u => u.includes('mine.example.com')).length, 0);
    const on = await subLinks(baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'] }, ipsrc: { api2: true, api2Url: 'https://mine.example.com/ips.txt' } } }) }));
    const byHost = Object.fromEntries(on.map(l => [hostOf(l), nameOf(l)]));
    assert.equal(byHost['104.16.5.5'], '自有-A');
    assert.ok('104.16.5.6' in byHost);
    assert.ok(!('8.8.8.8' in byHost), '非 CF 段被丢弃');
  });
  const env = baseEnv();
  const cookie = await login(env);
  const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { ipsrc: { api1: true, api1Url: '' } } });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.some(e => e.field === 'ipsrc.api1Url'));
});

test('HostMonit 开关关闭时不下发其节点；选定地区时保留运营商线路节点', async () => {
  // 上一个 HostMonit 测试已写入 10 分钟缓存（含 198.41.208.52「移动-01」）
  const on = await subLinks(baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'], region: ['HK'] } } }) }));
  assert.ok(on.some(l => nameOf(l) === '移动-01'), '选定地区时运营商线路节点（无地区标记）保留');
  const off = await subLinks(baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'] }, ipsrc: { hostmonit: false } } }) }));
  assert.ok(!off.some(l => /^(移动|联通|电信)(\/(移动|联通|电信))*-\d+$/.test(nameOf(l))), '关闭后不含 HostMonit 节点');
});

test('优选来源测试接口：强制重新拉取，返回解析结果、丢弃项与原始响应；需登录', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const post = (body) => call(env, `/${UUID}/api/ipsrc-test`, { method: 'POST', cookie, body });
  const handler = (url) => {
    if (url === 'https://api.hostmonit.com/get_optimization_ip') {
      return new Response(JSON.stringify({ code: 200, info: [{ ip: '198.41.208.99', line: 'CU' }, { ip: '9.9.9.9', line: 'CM' }] }));
    }
    if (url.startsWith('https://api.uouin.com/')) return new Response(JSON.stringify({ code: -1, msg: '密钥错误，如需对接请使用开放API！' }));
    if (url === 'https://mine.example.com/list.txt') return new Response('104.16.7.7:443#自有-B\n1.1.1.1\n');
    if (url === 'https://mine.example.com/404') return new Response('nope', { status: 404 });
    return notFound();
  };
  await withFetch(handler, async (calls) => {
    // HostMonit：即使缓存里已有结果也会重新请求
    let d = (await (await post({ source: 'hostmonit' })).json()).data;
    assert.equal(calls.filter(u => u.includes('hostmonit')).length, 1, '测试不读缓存');
    assert.deepEqual(d.items, [{ ip: '198.41.208.99', port: 443, name: '联通-01' }]);
    assert.deepEqual(d.dropped, ['9.9.9.9']);
    assert.equal(d.status, 200);
    assert.match(d.raw, /198\.41\.208\.99/);
    // uouin：接口报错时带回对方的错误信息
    d = (await (await post({ source: 'uouin' })).json()).data;
    assert.equal(d.count, 0);
    assert.match(d.error, /密钥错误/);
    // 自定义 API：用请求中的地址（无需先保存）
    d = (await (await post({ source: 'api1', url: 'https://mine.example.com/list.txt' })).json()).data;
    assert.deepEqual(d.items.map(x => [x.ip, x.name]), [['104.16.7.7', '自有-B']]);
    assert.deepEqual(d.dropped, ['1.1.1.1']);
    assert.match(d.raw, /自有-B/);
    d = (await (await post({ source: 'api2', url: 'https://mine.example.com/404' })).json()).data;
    assert.equal(d.status, 404);
    assert.equal(d.error, 'HTTP 404');
  });
  assert.equal((await post({ source: 'api1', url: 'ftp://x' })).status, 400, '非法地址');
  assert.equal((await post({ source: 'api1' })).status, 400, '缺少地址');
  assert.equal((await post({ source: 'nope' })).status, 400, '未知来源');
  assert.equal((await call(env, `/${UUID}/api/ipsrc-test`, { method: 'POST', body: { source: 'hostmonit' } })).status, 403, '未登录');
});

test('分线路来源：某条线路的 IP 全部与其它线路重复时，该线路仍保留在节点名中（HostMonit 联通 / uouin cucc）', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const post = (body) => call(env, `/${UUID}/api/ipsrc-test`, { method: 'POST', cookie, body });
  const handler = (url) => {
    if (url.includes('hostmonit')) return new Response(JSON.stringify({ code: 200, info: [
      { ip: '104.16.1.1', line: 'CM' }, { ip: '104.16.1.2', line: 'CT' },
      { ip: '104.16.1.1', line: 'CU' }, { ip: '104.16.1.2', line: 'CU' },   // 联通的 IP 全部与移动 / 电信重复
    ] }));
    if (url.includes('uouin')) return new Response(JSON.stringify({ data: {
      ctcc: { info: [{ ip: '104.16.2.1' }] }, cucc: { info: [{ ip: '104.16.2.1' }] }, cmcc: { info: [] }, bgp: { info: [{ ip: '104.16.2.1' }] }, ipv6: { info: [] },
    } }));
    return notFound();
  };
  await withFetch(handler, async () => {
    const hm = (await (await post({ source: 'hostmonit' })).json()).data.items.map(x => x.name);
    assert.deepEqual(hm, ['移动/联通-01', '电信/联通-01']);
    const uo = (await (await post({ source: 'uouin' })).json()).data.items.map(x => x.name);
    assert.deepEqual(uo, ['电信/联通/多线-U01']);
  });
  // 运营商筛选只勾选「联通」时，合并名称中含联通的节点保留、只标记其它运营商的节点剔除
  //（用未缓存的自定义 API 来源验证；HostMonit / uouin 在前面的测试中已写入 10 分钟缓存）
  const list = (url) => url === 'https://mine.example.com/lines.txt'
    ? new Response('104.16.3.3:443#电信/联通-01\n104.16.3.4:443#移动-01\n') : notFound();
  const env2 = baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'], isp: ['联通'] }, ipsrc: { hostmonit: false, api1: true, api1Url: 'https://mine.example.com/lines.txt' } } }) });
  const names = await withFetch(list, async () => (await subLinks(env2)).map(nameOf));
  assert.ok(names.includes('电信/联通-01'), '含联通的合并节点保留');
  assert.ok(!names.includes('移动-01'), '只标记移动的节点被剔除');
});

test('不再内置静态 IP 池；所有来源都没有产出时用官方域名兜底，订阅不为空', async () => {
  // 默认模式：在线来源关闭 / 离线（前面的测试已写入 HostMonit / uouin 缓存，这里显式关闭）、优选域名关闭 → 官方域名兜底
  const a = await subLinks(baseEnv({ K: kv({ config: { src: { prefDomain: false }, ipsrc: { hostmonit: false, uouin: false } } }) }));
  assert.deepEqual(a.map(hostOf), ['cloudflare.com', 'www.cloudflare.com', 'speed.cloudflare.com']);
  // 默认模式（优选域名开启、在线来源离线）：只有优选域名节点，没有任何 IP 节点
  const b = await subLinks(baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'] }, ipsrc: { hostmonit: false, uouin: false } } }) }));
  assert.ok(b.length > 0 && b.every(l => !/^\d+\.\d+\.\d+\.\d+$/.test(hostOf(l))), '无内置静态 IP');
});

test('仅 TLS 端口：默认开启；关闭后 443 节点追加 80 明文节点，自定义域名同样生效；ECH 强制仅 TLS；旧版 KV 迁移为开启', async () => {
  const url = 'https://ports.example.com/list.txt';
  const handler = (u) => u === url ? new Response('104.16.1.1\n104.16.1.2:8080#p8080\n104.16.1.3:8443#p8443') : notFound();
  const cfg = (extra) => ({ filter: { ipType: ['IPv4'] }, src: { prefDomain: false },
    ipsrc: { hostmonit: false, uouin: false, api1: true, api1Url: url }, ...extra });
  const portsOf = async (config) => withFetch(   // node.example.com：自定义域名
  handler, async () => {
    const env = baseEnv({ K: kv({ config }) });
    const t = await (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' })).text();
    return t.split('\n').filter(l => /^vless:\/\//.test(l)).map(l => l.match(/:(\d+)\?/)[1] + ' ' + nameOf(l)).sort();
  });
  // 默认（开启）：只有 TLS 端口
  assert.deepEqual(await portsOf(cfg({ cfgRev: 2 })), ['443 优选IP-01', '8443 p8443']);
  // 关闭：自定义域名也下发明文端口（443 → 追加 ·80，来源自带的 8080 原样保留），明文节点 security=none
  const off = await portsOf(cfg({ cfgRev: 2, tlsOnly: false }));
  assert.deepEqual(off, ['443 优选IP-01', '80 优选IP-01·80', '8080 p8080', '8443 p8443']);
  // ECH 开启时强制仅 TLS
  assert.deepEqual(await portsOf(cfg({ cfgRev: 2, tlsOnly: false, ech: true })), ['443 优选IP-01', '8443 p8443']);
  // 旧版 KV（无 cfgRev）保存的 tlsOnly:false 视为未选择，按新默认开启；保存后写入 cfgRev
  assert.deepEqual(await portsOf(cfg({ tlsOnly: false })), ['443 优选IP-01', '8443 p8443']);
  const env = baseEnv({ K: kv({ config: { tlsOnly: false } }) });
  const cookie = await login(env);
  assert.equal((await (await call(env, `/${UUID}/api/config`, { cookie })).json()).data.tlsOnly, true);
  await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { tlsOnly: false } });
  assert.equal(stored(env).cfgRev, 2);
  assert.equal((await (await call(env, `/${UUID}/api/config`, { cookie })).json()).data.tlsOnly, false, '新版保存的关闭状态保留');
});

// ---------------- 代理：出站竞速 / WS 0-RTT 早数据 / VLESS 响应头 ----------------
// Workers 运行时对象的最小替身：WebSocketPair、101 响应、可控时延的 TCP 连接
class FakeWS {
  constructor() { this.sent = []; this.closed = null; this.l = {}; this.binaryType = ''; }
  accept() {}
  send(d) { this.sent.push(new Uint8Array(d)); }
  close(code, reason) { this.closed = { code, reason }; }
  addEventListener(t, f) { (this.l[t] = this.l[t] || []).push(f); }
  emit(t, ev) { return Promise.all((this.l[t] || []).map(f => f(ev))); }
}
let lastServer = null;
globalThis.WebSocketPair = function () { const client = new FakeWS(), server = new FakeWS(); lastServer = server; return { 0: client, 1: server }; };
const NodeResponse = globalThis.Response;
globalThis.Response = class extends NodeResponse {
  constructor(body, init) {
    if (init && init.status === 101) { super(null, { status: 200 }); Object.defineProperty(this, 'status', { value: 101 }); this.webSocket = init.webSocket; }
    else super(body, init);
  }
};
// 假网络：net[hostname] = { delay: 毫秒 | 'hang' | 'fail' }；记录每次连接与写入内容
function fakeNet(net) {
  const log = [];
  globalThis.__connect = ({ hostname, port }) => {
    const b = net[hostname] || { delay: 'fail' };
    const sock = { hostname, port, written: [], closedByUs: false };
    log.push(sock);
    sock.opened = b.delay === 'hang' ? new Promise(() => {})
      : b.delay === 'fail' ? Promise.reject(new Error('refused'))
      : new Promise(r => setTimeout(r, b.delay));
    sock.opened.catch(() => {});
    sock.writable = new WritableStream({ write(c) { sock.written.push(new Uint8Array(c)); } });
    sock.readable = new ReadableStream({ start(c) { sock.push = (d) => c.enqueue(d); } });
    sock.close = () => { sock.closedByUs = true; };
    return sock;
  };
  return log;
}
const until = async (cond, ms = 3000) => { const t0 = Date.now(); while (!cond()) { if (Date.now() - t0 > ms) throw new Error('timeout'); await new Promise(r => setTimeout(r, 5)); } };
const uuidBytes = UUID.replace(/-/g, '').match(/../g).map(h => parseInt(h, 16));
// VLESS TCP 请求头（目标为域名）+ 首包
const vlessReq = (host, port, payload = []) => new Uint8Array([0, ...uuidBytes, 0, 1, port >> 8, port & 255, 2, host.length, ...Buffer.from(host), ...payload]);
const TLS_HELLO = [0x16, 0x03, 0x01, 0x00, 0x05, 1, 2, 3, 4, 5];
// 内置地区反代的 DoH 解析：US → 203.0.113.10，HK → 203.0.113.20（无 colo 时本地区为 US、次地区为 HK）
const relayDoh = (url) => {
  const name = new URL(url).searchParams.get('name') || '';
  const type = new URL(url).searchParams.get('type');
  const ip = name.includes('.us.') ? '203.0.113.10' : name.includes('.hk.') ? '203.0.113.20' : null;
  return new Response(JSON.stringify({ Status: 0, Answer: type === 'A' && ip ? [{ type: 1, data: ip }] : [] }));
};
async function openWs(env, headers = {}) {
  const res = await worker.fetch(new Request(`https://node.example.com/${UUID}`, { headers: { Upgrade: 'websocket', ...headers } }), env, {});
  assert.equal(res.status, 101);
  return lastServer;
}

test('出站竞速：目标走 Cloudflare（直连挂起）时内置反代并发接管，约 0.3s 可用，不再白等 6s', async () => {
  const log = fakeNet({ 'cf-site.example': { delay: 'hang' }, '203.0.113.10': { delay: 20 }, '203.0.113.20': { delay: 40 } });
  await withFetch(relayDoh, async () => {
    const ws = await openWs(baseEnv());
    const t0 = Date.now();
    await ws.emit('message', { data: vlessReq('cf-site.example', 443, TLS_HELLO).buffer });
    await until(() => log.some(s => s.written.length));
    const ms = Date.now() - t0;
    const used = log.find(s => s.written.length);
    assert.equal(used.hostname, '203.0.113.10', '本地区反代胜出');
    assert.deepEqual([...used.written[0]], TLS_HELLO, '反代收到去掉 VLESS 头的原始 TLS 数据');
    assert.ok(ms < 1500, `建连耗时 ${ms}ms`);
    assert.ok(log.find(s => s.hostname === '203.0.113.20').closedByUs, '败者连接被释放');
  });
});

test('出站竞速：直连在优先窗口内成功时使用直连，已建立的反代连接被关闭', async () => {
  const log = fakeNet({ 'direct.example': { delay: 120 }, '203.0.113.10': { delay: 10 }, '203.0.113.20': { delay: 10 } });
  await withFetch(relayDoh, async () => {
    const ws = await openWs(baseEnv());
    await ws.emit('message', { data: vlessReq('direct.example', 443, TLS_HELLO).buffer });
    await until(() => log.some(s => s.written.length));
    assert.equal(log.find(s => s.written.length).hostname, 'direct.example');
    await until(() => log.filter(s => s.hostname.startsWith('203.')).every(s => s.closedByUs));
  });
});

test('非 TLS 首包（如 Telegram MTProto）只走直连，不送进 SNI 型反代', async () => {
  const log = fakeNet({ 'tg.example': { delay: 30 }, '203.0.113.10': { delay: 5 }, '203.0.113.20': { delay: 5 } });
  await withFetch(relayDoh, async () => {
    const ws = await openWs(baseEnv());
    await ws.emit('message', { data: vlessReq('tg.example', 443, [0xef, 0xef, 0xef, 0xef]).buffer });
    await until(() => log.some(s => s.written.length));
    assert.deepEqual(log.map(s => s.hostname), ['tg.example']);
  });
});

test('VLESS 响应头在头部解析后立即下发；头部与首包分帧到达时等待首包判定（不超过 80ms）', async () => {
  const log = fakeNet({ 'split.example': { delay: 10 } });
  await withFetch(relayDoh, async () => {
    const ws = await openWs(baseEnv());
    await ws.emit('message', { data: vlessReq('split.example', 443).buffer });   // 只有头部
    assert.deepEqual(ws.sent.map(x => [...x]), [[0, 0]], '收到头部即回响应头，早于建连');
    assert.equal(log.length, 0, '首包未到：暂不建连');
    await ws.emit('message', { data: new Uint8Array(TLS_HELLO).buffer });
    await until(() => log.some(s => s.written.length));
    assert.deepEqual([...log.find(s => s.written.length).written[0]], TLS_HELLO);
    assert.equal(ws.sent.length, 1, '响应头只发一次');
  });
});

test('WS 0-RTT：Sec-WebSocket-Protocol 中的早数据在握手阶段即建连；非法 / UUID 不符的早数据被忽略', async () => {
  const log = fakeNet({ 'early.example': { delay: 10 } });
  const b64url = (u8) => Buffer.from(u8).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await withFetch(relayDoh, async () => {
    const ws = await openWs(baseEnv(), { 'Sec-WebSocket-Protocol': b64url(vlessReq('early.example', 443, TLS_HELLO)) });
    await until(() => log.some(s => s.written.length));
    assert.deepEqual([...log[0].written[0]], TLS_HELLO, '未收到任何 WS 数据帧即已转发首包');
    assert.deepEqual(ws.sent.map(x => [...x]), [[0, 0]]);
    await ws.emit('message', { data: new Uint8Array([9, 9]).buffer });   // 后续数据帧直接写出站
    await until(() => log[0].written.length === 2);
    // 普通子协议名 / 其它 UUID 的早数据：不建连，等待数据帧
    const other = vlessReq('early.example', 443, TLS_HELLO); other[1] ^= 0xff;
    for (const proto of ['binary', b64url(other)]) {
      const n = log.length;
      const w2 = await openWs(baseEnv(), { 'Sec-WebSocket-Protocol': proto });
      await new Promise(r => setTimeout(r, 30));
      assert.equal(log.length, n, proto);
      assert.equal(w2.closed, null);
    }
  });
});

test('明文端口 WebSocket（http://）不再被重定向到 https；普通 http 请求仍重定向', async () => {
  fakeNet({});
  const ws = await worker.fetch(new Request(`http://node.example.com/${UUID}`, { headers: { Upgrade: 'websocket' } }), baseEnv(), {});
  assert.equal(ws.status, 101);
  const page = await worker.fetch(new Request(`http://node.example.com/${UUID}`), baseEnv(), {});
  assert.equal(page.status, 301);
});

test('订阅：TLS ws 节点带 ed=2048、ALPN 随面板下发；多协议时 Trojan / XHTTP 名称加 .T / .X，节点名全局唯一', async () => {
  // 优选 API 返回的两条地址dup（名称按来源原样使用）
  const env = baseEnv({ K: kv({ config: fixedNodes('104.16.9.1:443#dup\n104.16.9.2:443#dup', { enableTrojan: true, enableXhttp: true, alpn: 'h2, http/1.1' }) }) });
  const get = (fmt) => withFetch(nodesFetch, async () => (await call(env, `/${UUID}/sub/${fmt}`, { ua: 'x' })).text());
  const links = (await get('plain')).split('\n').filter(Boolean);
  assert.deepEqual(links.map(nameOf), ['dup', 'dup.T', 'dup.X', 'dup·2', 'dup.T·2', 'dup.X·2']);
  const [v, t, x] = links;
  assert.match(v, /path=%2F[0-9a-f-]+%3Fed%3D2048&/, 'VLESS ws 带 ed=2048');
  assert.match(t, /path=%2F[0-9a-f-]+%3Fed%3D2048/, 'Trojan ws 带 ed=2048');
  assert.ok(!/ed%3D2048/.test(x), 'XHTTP 不带 ed');
  for (const l of [v, t, x]) assert.match(l, /&alpn=h2,http\/1\.1(&|#)/, 'ALPN 原样逗号分隔');
  // Clash：ws-opts.path 带 ed=2048，alpn 取面板设置，GEOSITE 数据源与规则
  const clash = await get('clash');
  assert.match(clash, /path: "\/[0-9a-f-]+\?ed=2048"/);
  assert.match(clash, /alpn: \[h2, http\/1\.1\]/);
  assert.match(clash, /geox-url:\n  geoip: "https:\/\/testingcf\.jsdelivr\.net\//);
  assert.match(clash, /- GEOSITE,CN,直接连接/);
  // sing-box：tag 唯一、无 xhttp（官方内核不支持）、early data 用字段声明而非 path、二进制规则集
  const sb = JSON.parse(await get('singbox'));
  const nodes = sb.outbounds.filter(o => o.server);
  assert.deepEqual(nodes.map(o => o.tag), ['dup', 'dup.T', 'dup·2', 'dup.T·2']);
  const tags = sb.outbounds.map(o => o.tag);
  assert.equal(new Set(tags).size, tags.length, 'outbound tag 不重复');
  assert.ok(nodes.every(o => o.transport.type === 'ws' && o.transport.max_early_data === 2048 && !o.transport.path.includes('?')));
  assert.deepEqual(nodes[0].tls.alpn, ['h2', 'http/1.1']);
  assert.ok(sb.route.rule_set.every(r => r.format === 'binary' && r.url.endsWith('.srs')));
  assert.ok(!sb.outbounds.some(o => o.type === 'dns' || o.type === 'block'), '不含已移除的 dns / block 出站');
  assert.ok(!JSON.stringify(sb.route.rules).includes('"geoip"'), '不含已移除的 geoip 规则');
});

// ---------------- 批次 1 修复：多格式订阅 / 出站代理解析 / 协议头处理 ----------------
const subOf = (env, fmt, ua = 'x') => withFetch(nodesFetch, async () => call(env, `/${UUID}/sub/${fmt}`, { ua }));
const customCfg = (extra) => fixedNodes('104.16.9.1:443#a', extra);   // 一个固定节点「a」

test('明文端口 Trojan 节点在 Clash / sing-box / QuanX / Surge 中不启用 TLS（security=none）', async () => {
  const env = baseEnv({ K: kv({ config: customCfg({ enableVless: false, enableTrojan: true, tlsOnly: false }) }) });
  const clash = await (await subOf(env, 'clash')).text();
  const block = clash.split('\n  - name:').find(b => b.includes('a·80'));
  assert.ok(block && /port: 80\n/.test(block));
  assert.ok(!/tls: true/.test(block), 'Clash 明文节点无 tls: true');
  assert.match(block, /ws-opts:\n {6}path: "?\/[0-9a-f-]+"?\n/, '明文节点 path 不带 ed');
  const sb = JSON.parse(await (await subOf(env, 'singbox')).text());
  assert.equal(sb.outbounds.find(o => o.server_port === 80).tls.enabled, false);
  assert.equal(sb.outbounds.find(o => o.server_port === 443).tls.enabled, true);
  const qx = await (await subOf(env, 'quanx')).text();
  assert.match(qx, /trojan=104\.16\.9\.1:80, password=[^,]+, over-tls=false, obfs=ws,/);
  assert.match(qx, /trojan=104\.16\.9\.1:443, password=[^,]+, over-tls=true,/);
  const surge = await (await subOf(env, 'surge')).text();
  assert.match(surge, /a·80 = trojan, 104\.16\.9\.1, 80, .*tls=false/);
});

test('Surfboard：只输出 Trojan TLS 节点并使用服务端的 Trojan 密码；未启用 Trojan 时明确报错', async () => {
  const on = baseEnv({ K: kv({ config: customCfg({ enableVless: true, enableTrojan: true, trojanPassword: 'tp-secret' }) }) });
  const body = await (await subOf(on, 'surfboard')).text();
  const proxies = body.split('[Proxy]\n')[1].split('\n\n')[0].split('\n');
  assert.equal(proxies.length, 1, '不再把 VLESS 节点改写成 Trojan 重复下发');
  assert.match(proxies[0], /^a\.T = trojan, 104\.16\.9\.1, 443, password=tp-secret,/);
  const off = baseEnv({ K: kv({ config: customCfg({ enableTrojan: false }) }) });
  const res = await subOf(off, 'surfboard');
  assert.equal(res.status, 500);
  assert.match(await res.text(), /Surfboard 只支持 Trojan/);
});

test('sing-box：仅启用 XHTTP（无可用节点）时报错，而不是输出空 selector 的无效配置', async () => {
  const env = baseEnv({ K: kv({ config: customCfg({ enableVless: false, enableTrojan: false, enableXhttp: true }) }) });
  const res = await subOf(env, 'singbox');
  assert.equal(res.status, 500);
  assert.match(await res.text(), /不支持 XHTTP/);
  // 同时启用 VLESS 时仍正常输出
  const ok = baseEnv({ K: kv({ config: customCfg({ enableXhttp: true }) }) });
  const sb = JSON.parse(await (await subOf(ok, 'singbox')).text());
  assert.ok(sb.outbounds[0].outbounds.length > 0);
});

test('原生地址节点同样遵循多协议命名（Trojan .T / XHTTP .X）', async () => {
  const env = baseEnv({ K: kv({ config: { cfgRev: 2, enableTrojan: true, enableXhttp: true, src: { native: true, prefDomain: false, prefIp: false }, filter: { ipType: ['IPv4'] } } }) });
  const links = (await (await subOf(env, 'plain')).text()).split('\n').filter(Boolean);
  assert.deepEqual(links.filter(l => nameOf(l).startsWith('原生地址')).map(nameOf), ['原生地址', '原生地址.T', '原生地址.X']);
});

const ipv6Bytes = [0x20, 0x01, 0x0d, 0xb8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];   // 2001:db8::1
const vlessReqV6 = (port) => new Uint8Array([0, ...uuidBytes, 0, 1, port >> 8, port & 255, 3, ...ipv6Bytes, ...TLS_HELLO]);

test('出站代理：密码含未编码 @ 时主机名解析正确；SOCKS5 对 IPv6 目标使用 ATYP=4；HTTP CONNECT 给 IPv6 加方括号', async () => {
  const feed = async (sock, bytes) => { await until(() => sock.push); sock.push(new Uint8Array(bytes)); };
  // SOCKS5：socks5://us:p@ss@10.0.0.1:1080
  let log = fakeNet({ '10.0.0.1': { delay: 5 } });
  let env = baseEnv({ K: kv({ config: { outboundProxy: 'socks5://us:p@ss@10.0.0.1:1080', outboundMode: 'only' } }) });
  let ws = await openWs(env);
  ws.emit('message', { data: vlessReqV6(443).buffer });   // 握手需要下面喂数据才会完成：不能 await
  await until(() => log.length && log[0].written.length);
  assert.equal(log[0].hostname, '10.0.0.1', '以最后一个 @ 分隔凭据与主机');
  assert.equal(log[0].port, 1080);
  await feed(log[0], [5, 2]);                                   // 服务器选择用户名密码认证
  await until(() => log[0].written.length >= 2);
  assert.equal(Buffer.from(log[0].written[1]).toString('latin1', 5), 'p@ss', '密码完整');
  await feed(log[0], [1, 0]);                                   // 认证成功
  await until(() => log[0].written.length >= 3);
  const req = [...log[0].written[2]];
  assert.deepEqual(req.slice(0, 4), [5, 1, 0, 4], 'IPv6 目标用 ATYP=4');
  assert.deepEqual(req.slice(4, 20), ipv6Bytes);
  assert.deepEqual(req.slice(20), [1, 187]);
  // HTTP CONNECT
  log = fakeNet({ '10.0.0.2': { delay: 5 } });
  env = baseEnv({ K: kv({ config: { outboundProxy: 'http://10.0.0.2:8080', outboundMode: 'only' } }) });
  ws = await openWs(env);
  ws.emit('message', { data: vlessReqV6(443).buffer });
  await until(() => log.length && log[0].written.length);
  assert.match(Buffer.from(log[0].written[0]).toString(), /^CONNECT \[2001:db8::1\]:443 HTTP\/1\.1\r\nHost: \[2001:db8::1\]:443\r\n/);
});

test('协议头：地址被截断时等待后续分片（不按错误地址建连、不断开）；Trojan UDP / VLESS MUX 命令被拒绝', async () => {
  const log = fakeNet({ 'split.example': { delay: 5 } });
  await withFetch(relayDoh, async () => {
    // 域名只到一半：旧实现会把截断的域名当目标
    const full = vlessReq('split.example', 443, TLS_HELLO);
    const cut = full.length - TLS_HELLO.length - 5;
    const ws = await openWs(baseEnv());
    await ws.emit('message', { data: full.slice(0, cut).buffer });
    await new Promise(r => setTimeout(r, 30));
    assert.equal(log.length, 0);
    assert.equal(ws.closed, null);
    await ws.emit('message', { data: full.slice(cut).buffer });
    await until(() => log.some(s => s.written.length));
    assert.equal(log[0].hostname, 'split.example');
    // VLESS MUX（cmd=3）
    const mux = vlessReq('x.example', 443, TLS_HELLO); mux[1 + 16 + 1] = 3;
    const w2 = await openWs(baseEnv());
    await w2.emit('message', { data: mux.buffer });
    assert.equal(w2.closed.code, 1011);
    assert.match(w2.closed.reason, /不支持的命令/);
    // Trojan UDP ASSOCIATE（cmd=3）
    const hex = createHash('sha224').update(UUID).digest('hex');
    const trojan = (cmd) => new Uint8Array([...Buffer.from(hex + '\r\n'), cmd, 3, 9, ...Buffer.from('x.example'), 1, 187, 13, 10, ...TLS_HELLO]);
    const envT = baseEnv({ K: kv({ config: { enableTrojan: true } }) });
    const w3 = await openWs(envT);
    await w3.emit('message', { data: trojan(3).buffer });
    assert.equal(w3.closed.code, 1011);
    const n = log.length;
    const w4 = await openWs(envT);   // TCP（cmd=1）仍正常
    await w4.emit('message', { data: trojan(1).buffer });
    await until(() => log.length > n);
    assert.equal(log[n].hostname, 'x.example');
  });
});

test('面板关闭 VLESS 后服务端不再接受 VLESS WebSocket 连接（Trojan 不受影响）', async () => {
  const log = fakeNet({ 'x.example': { delay: 5 } });
  const env = baseEnv({ K: kv({ config: { enableVless: false, enableTrojan: true } }) });
  const ws = await openWs(env);
  await ws.emit('message', { data: vlessReq('x.example', 443, TLS_HELLO).buffer });
  assert.equal(ws.closed.code, 1011);
  assert.equal(log.length, 0);
});

test('WebSocket 关闭原因按字节截断（含中文的长错误信息不会让 close() 抛异常）', async () => {
  globalThis.__connect = () => { throw new Error('出站连接失败：' + '很长的错误信息'.repeat(30)); };
  const ws = await openWs(baseEnv({ K: kv({ config: { outboundMode: '' } }) }));
  // 直连与反代均失败 → fail(lastErr)
  await withFetch(() => new Response('{}'), async () => {
    await ws.emit('message', { data: vlessReq('x.example', 443, TLS_HELLO).buffer });
  });
  assert.ok(ws.closed, '连接已被关闭');
  assert.ok(Buffer.byteLength(ws.closed.reason) <= 123, `reason ${Buffer.byteLength(ws.closed.reason)} 字节`);
  assert.ok(!ws.closed.reason.includes('�'));
});

test('XHTTP：首个请求体块短于 VLESS 头部时累积后再解析', async () => {
  const log = fakeNet({ 'xh.example': { delay: 5 } });
  const env = baseEnv({ K: kv({ config: { enableXhttp: true } }) });
  const full = vlessReq('xh.example', 443, TLS_HELLO);
  const body = new ReadableStream({ async start(c) {
    c.enqueue(full.slice(0, 7)); await new Promise(r => setTimeout(r, 10));
    c.enqueue(full.slice(7, 30)); await new Promise(r => setTimeout(r, 10));
    c.enqueue(full.slice(30)); c.close();
  } });
  const res = await worker.fetch(new Request(`https://node.example.com/${UUID}`, { method: 'POST', body, duplex: 'half', headers: { 'User-Agent': 'x' } }), env, {});
  assert.equal(res.status, 200);
  await until(() => log.some(s => s.written.length));
  assert.equal(log[0].hostname, 'xh.example');
  assert.deepEqual([...log[0].written[0]], TLS_HELLO);
});

// ---------------- 批次 2 修复：Clash 本地凭据 / 登录加固 / 管理密码存储 / 环境变量不固化 / 页面安全头 ----------------
const nextQs = (path) => '?next=' + encodeURIComponent('/' + path);

test('Clash 模板不再包含公开的默认凭据：SS 密码 / 认证 / API 密钥按 UUID 派生且稳定，CORS 不再是 *，DNS 只监听本机', async () => {
  const get = async (env) => (await subOf(env, 'clash')).text();
  const a = await get(baseEnv({ K: kv({ config: customCfg() }) }));
  assert.ok(!/yyds666|Xf3#Lp9WqZ|__CFNEXT_/.test(a), '无默认密码 / 未替换的占位符');
  const d = (purpose, uuid = UUID) => createHash('sha224').update(`cfnext-clash|${purpose}|${uuid}`).digest('hex').slice(0, 20);
  assert.ok(a.includes(`password: "${d('ss')}"`) && a.includes(`- "mihomo:${d('auth')}"`) && a.includes(`secret: "${d('api')}"`), '与 UUID 派生一致（同时校验 SHA-224 实现）');
  assert.equal(await get(baseEnv({ K: kv({ config: customCfg() }) })), a, '同一部署每次订阅结果稳定');
  const other = await (await withFetch(nodesFetch, () => call(baseEnv({ U: UUID2, K: kv({ config: customCfg() }) }), `/${UUID2}/sub/clash`, { ua: 'x' }))).text();
  assert.ok(!other.includes(d('api')) && other.includes(`secret: "${d('api', UUID2)}"`), '不同部署密钥不同');
  assert.ok(!/allow-origins:\n\s+- "\*"/.test(a), 'CORS 不是 *');
  assert.match(a, /listen: 127\.0\.0\.1:1053/);
});

test('管理密码：面板设置的密码以加盐摘要存入 KV；旧版明文密码在下次保存时升级；以摘要前缀开头的密码被拒绝', async () => {
  const env = baseEnv({ ADMIN: undefined, K: kv({ config: { admin: 'legacy-pw' } }) });
  const cookie = await login(env, 'legacy-pw');                       // 旧版明文仍可登录
  assert.equal(stored(env).admin, 'legacy-pw');
  const r = await (await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'h2' } })).json();
  assert.equal(r.ok, true);
  const h = stored(env).admin;
  assert.match(h, /^cfnext-pbkdf2\$10000\$[0-9a-f]{32}\$[0-9a-f]{64}$/, '保存任意配置后明文升级为摘要');
  assert.ok(!JSON.stringify(stored(env)).includes('legacy-pw'));
  await login(env, 'legacy-pw');                                      // 密码不变，仍可登录
  // 修改密码：新密码生效，旧密码失效；每次的盐不同
  const cookie2 = await login(env, 'legacy-pw');
  const set = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie: cookie2, body: { admin: 'brand-new' } });
  assert.ok(set.headers.get('Set-Cookie'), '密码变更后重新签发登录态');
  assert.notEqual(stored(env).admin, h);
  assert.ok(!JSON.stringify(stored(env)).includes('brand-new'));
  await login(env, 'brand-new');
  const bad = await call(env, '/login', { method: 'POST', body: 'password=legacy-pw&next=' + encodeURIComponent('/' + UUID), headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': '198.51.100.77' } });
  assert.equal(bad.status, 403);
  const rej = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie: await login(env, 'brand-new'), body: { admin: 'cfnext-pbkdf2$x' } });
  assert.equal(rej.status, 400);
});

test('登录加固：/login 与 /version 对不知道面板路径的人返回 404；IPv6 按 /64 计数；限速表满时不会被清零', async () => {
  const env = baseEnv();
  assert.equal((await call(env, '/login')).status, 404);
  assert.equal((await call(env, '/login?next=/wrong')).status, 404);
  assert.equal((await call(env, '/login' + nextQs(UUID))).status, 200);
  const post = (pw, ip, path = UUID) => call(env, '/login', { method: 'POST', body: `password=${pw}&next=${encodeURIComponent('/' + path)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': ip } });
  assert.equal((await post('pw', '203.0.113.1', 'wrong')).status, 404, 'next 不指向面板路径：不处理、不计数');
  assert.equal((await call(env, '/version')).status, 404);
  assert.equal((await call(env, '/version', { cookie: await login(env) })).status, 200);
  // 同一 /64 内换地址也算同一来源
  const p = '2001:db8:' + Math.floor(Math.random() * 60000).toString(16) + ':1';
  for (let i = 0; i < 5; i++) assert.equal((await post('bad', `${p}::${i + 1}`)).status, 403);
  assert.equal((await post('pw', `${p}:ffff:ffff:ffff:ffff`)).status, 429, '同 /64 的其它地址同样被限制');
  assert.equal((await post('pw', `${p}::1`)).status, 429, '限速期间正确密码也不接受');
  // 灌入大量来源后，已被限制的来源仍然受限（旧实现表满即整体清空）
  const victim = '192.0.2.' + (1 + Math.floor(Math.random() * 250));
  const flood = async (from, to) => { for (let i = from; i < to; i++) await post('bad', `10.${i >> 8 & 255}.${i & 255}.9`); };
  await flood(0, 4900);
  for (let i = 0; i < 5; i++) await post('bad', victim);
  await flood(4900, 5600);   // 表超过 5000 上限：旧实现整表清空，新实现只淘汰最旧的来源
  assert.equal((await post('pw', victim)).status, 429, '灌表不能清零已有计数');
});

test('环境变量提供的值不会因为一次保存被固化进 KV；面板改成不同的值才保存为覆盖', async () => {
  const env = baseEnv({ ADMIN: undefined, PROXYIP: 'relay.example.com:443', TROJAN: 'true', TROJAN_PASSWORD: 'env-tp', ALPN: 'h2',
    K: kv({ config: { admin: 'pw' } }) });
  const first = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie: await login(env), body: { tlsOnly: false } });
  const r = await first.json();
  assert.equal(r.ok, true);
  const cookie = first.headers.get('Set-Cookie').split(';')[0];   // 旧版明文密码升级为摘要后登录态重新签发
  const s = stored(env);
  for (const k of ['proxyIP', 'enableTrojan', 'trojanPassword', 'alpn', 'uuid']) assert.equal(k in s, false, `${k} 不应固化进 KV`);
  assert.equal(s.tlsOnly, false, '面板里改动的其它项正常保存');
  // 环境变量之后变更，立即生效（KV 中没有旧快照）
  const later = { ...env, PROXYIP: 'new-relay.example.com:443' };
  const cfgRes = await call(later, `/${UUID}/api/config`, { cookie });
  const cfg = await cfgRes.json();
  assert.equal(cfg.data.proxyIP, 'new-relay.example.com:443');
  // 面板中改成不同的值：保存为覆盖
  await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { proxyIP: 'mine.example.com:443', alpn: 'http/1.1' } });
  assert.equal(stored(env).proxyIP, 'mine.example.com:443');
  assert.equal(stored(env).alpn, 'http/1.1');
  assert.equal('trojanPassword' in stored(env), false);
});

test('页面安全头：面板 / 登录页带 CSP、frame-ancestors、nosniff；订阅不受影响；二维码脚本带 SRI；支持退出登录', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const panel = await call(env, `/${UUID}`, { cookie });
  const html = await panel.text();
  for (const res of [panel, await call(env, '/login' + nextQs(UUID))]) {
    assert.match(res.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
    assert.match(res.headers.get('Content-Security-Policy'), /default-src 'none'/);
    assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
    assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(res.headers.get('Referrer-Policy'), 'no-referrer');
  }
  assert.match(html, /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/qrcode-generator@1\.4\.4\/qrcode\.js" integrity="sha384-[A-Za-z0-9+/=]+" crossorigin="anonymous"/);
  const api = await call(env, `/${UUID}/api/status`, { cookie });
  assert.equal(api.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(api.headers.get('Content-Security-Policy'), null, 'JSON 接口不带页面 CSP');
  const sub = await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7' });
  assert.equal(sub.headers.get('Content-Security-Policy'), null);
  // 退出登录：清除 Cookie
  const out = await call(env, `/${UUID}/api/logout`, { method: 'POST', cookie });
  assert.equal(out.status, 200);
  assert.match(out.headers.get('Set-Cookie'), /cfnext_auth=; .*Max-Age=0/);
  assert.equal((await call(env, `/${UUID}/api/logout`)).status, 403, '未登录不可调用');
});

// ---------------- 批次 3：配置存储异常 / DoH 子请求 / 机房共享缓存 ----------------
const failingKv = (init = {}) => {
  const k = kv(init); let down = true;
  return Object.assign(k, { puts: 0, setDown(v) { down = v; },
    async get(key, opts) { if (down) throw new Error('KV unavailable'); return k.m.has(key) ? k.m.get(key) : null; },
    async put(key, v) { this.puts++; k.m.set(key, v); } });
};

test('KV 读取失败：有环境变量 UUID 时节点与订阅照常工作，保存与重置被拒绝且不会覆盖已有配置；无环境变量 UUID 时返回 503', async () => {
  const k = failingKv({ config: { alpn: 'h2', cfgRev: 2 } });
  const env = baseEnv({ K: k });
  const cookie = await login(env);                                   // ADMIN 来自环境变量，不依赖 KV
  assert.equal((await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7' })).status, 200, '订阅仍可用');
  const cfg = await (await call(env, `/${UUID}/api/config`, { cookie })).json();
  assert.match(cfg.data.kvError, /KV 暂时无法读取/);
  const save = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'http/1.1' } });
  assert.equal(save.status, 503);
  assert.equal(k.puts, 0, '没有向 KV 写入任何内容');
  assert.equal((await call(env, `/${UUID}/api/reset`, { method: 'POST', cookie })).status, 503);
  assert.equal(k.m.has('config'), true, '配置未被删除');
  // 恢复后一切正常，原有配置还在
  k.setDown(false);
  const after = await (await call(env, `/${UUID}/api/config`, { cookie })).json();
  assert.equal(after.data.alpn, 'h2');
  assert.equal(after.data.kvError, '');
  // 未设置环境变量 U：此时 UUID 只能是随机值，直接 503，不再让登录与节点悄悄失效
  const noU = { ADMIN: 'pw', K: failingKv() };
  const res = await call(noU, `/${UUID}/sub`, { ua: 'v2rayN/7' });
  assert.equal(res.status, 503);
  assert.equal(res.headers.get('Retry-After'), '30');
});

test('KV 中的配置损坏（不是合法 JSON）：显示提示并禁止保存，但允许重置修复', async () => {
  const k = kv({ config: '{"alpn": "h2"' });
  const env = baseEnv({ K: k });
  const cookie = await login(env);
  const cfg = await (await call(env, `/${UUID}/api/config`, { cookie })).json();
  assert.match(cfg.data.kvError, /已损坏/);
  assert.equal((await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'h2' } })).status, 503);
  assert.equal(k.m.get('config'), '{"alpn": "h2"', '损坏内容保持原样，未被默认值覆盖');
  assert.equal((await call(env, `/${UUID}/api/reset`, { method: 'POST', cookie })).status, 200);
  assert.equal(k.m.has('config'), false);
});

// 反代域名解析：DoH 记录与统计
const dohStub = (table, log = []) => async (url) => {
  const u = new URL(url); const name = u.searchParams.get('name'); const type = { 1: 'A', 28: 'AAAA', 16: 'TXT' }[u.searchParams.get('type')] || u.searchParams.get('type');
  log.push({ host: u.host, name, type });
  const rule = table[u.host] || table['*'];
  if (!rule) return new Response('x', { status: 500 });
  if (rule.status) return new Response('x', { status: rule.status });
  if (rule.delay) await new Promise(r => setTimeout(r, rule.delay));
  const ans = (rule.answers && rule.answers[name + '|' + type]) || [];
  return new Response(JSON.stringify({ Status: 0, Answer: ans.map(data => ({ type: type === 'A' ? 1 : type === 'TXT' ? 16 : 28, data })) }));
};
const connectVia = async (env, host) => {
  const ws = await openWs(env);
  await ws.emit('message', { data: vlessReq(host, 443, TLS_HELLO).buffer });
  return ws;
};

test('反代 / 落地域名解析：并发连接合并为一次查询，正常情况下每种记录只发 1 个 DoH 请求（Cloudflare 优先）', async () => {
  const log = fakeNet({ '198.51.100.5': { delay: 5 } });
  const dns = [];
  const env = baseEnv({ K: kv({ config: { proxyIP: 'dedupe.example.com' } }) });
  await withFetch(dohStub({ 'cloudflare-dns.com': { delay: 40, answers: { 'dedupe.example.com|A': ['198.51.100.5'] } } }, dns), async () => {
    const sockets = [];
    for (let i = 0; i < 4; i++) sockets.push(await openWs(env));
    await Promise.all(sockets.map(ws => ws.emit('message', { data: vlessReq('t.example', 443, TLS_HELLO).buffer })));
  });
  const mine = dns.filter(d => d.name === 'dedupe.example.com');
  assert.deepEqual(mine.map(d => d.type).sort(), ['A', 'TXT'], '4 个并发连接只查询一次（TXT + A）');
  assert.ok(mine.every(d => d.host === 'cloudflare-dns.com'), '只用第一个端点，没有同时发给 3 个');
  assert.equal(log.filter(s => s.hostname === '198.51.100.5').length, 4);
});

test('反代域名解析：首选 DoH 失败时才换下一个端点；全部失败后 30 秒内不再重复查询', async () => {
  fakeNet({ '198.51.100.6': { delay: 5 }, 'neg.example.com': { delay: 5 } });
  // 首选端点 500 → 第二个端点接手，第三个不被访问
  let dns = [];
  let env = baseEnv({ K: kv({ config: { proxyIP: 'fallback.example.com' } }) });
  await withFetch(dohStub({ 'dns.alidns.com': { answers: { 'fallback.example.com|A': ['198.51.100.6'] } } }, dns), () => connectVia(env, 't.example'));
  let hosts = dns.filter(d => d.name === 'fallback.example.com').map(d => d.host);
  assert.deepEqual([...new Set(hosts)].sort(), ['cloudflare-dns.com', 'dns.alidns.com']);
  assert.ok(!hosts.includes('doh.pub'));
  // 全部失败：第一次尝试所有端点，第二次连接直接用缓存的「无结果」
  dns = [];
  env = baseEnv({ K: kv({ config: { proxyIP: 'neg.example.com' } }) });
  await withFetch(dohStub({}, dns), () => connectVia(env, 't.example'));
  const first = dns.filter(d => d.name === 'neg.example.com').length;
  assert.ok(first >= 6, `第一次查询了所有端点（${first}）`);
  dns.length = 0;
  await withFetch(dohStub({}, dns), () => connectVia(env, 't.example'));
  assert.equal(dns.filter(d => d.name === 'neg.example.com').length, 0, '30 秒内不再重复查询');
});

test('UDP DNS（VLESS UDP 53）转 DoH：Cloudflare 优先，失败才换端点', async () => {
  const query = new Uint8Array([0x12, 0x34, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, ...Buffer.from('example'), 3, ...Buffer.from('com'), 0, 0, 1, 0, 1]);
  const req = () => new Uint8Array([0, ...uuidBytes, 0, 2, 0, 53, 1, 8, 8, 8, 8, ...query]);   // VLESS UDP（cmd=2）→ 8.8.8.8:53
  const run = async (table) => {
    const dns = [];
    await withFetch(dohStub(table, dns), async () => {
      const ws = await openWs(baseEnv());
      await ws.emit('message', { data: req().buffer });
      assert.equal(ws.sent.length, 1, 'DNS 应答');
      const resp = ws.sent[0];
      assert.deepEqual([...resp.slice(0, 2)], [0x12, 0x34]);
      assert.deepEqual([...resp.slice(-4)], [93, 184, 216, 34]);
    });
    return dns.map(d => d.host);
  };
  const ans = { 'example.com|A': ['93.184.216.34'] };
  assert.deepEqual(await run({ 'cloudflare-dns.com': { answers: ans } }), ['cloudflare-dns.com']);
  assert.deepEqual(await run({ 'dns.google': { answers: ans } }), ['cloudflare-dns.com', 'dns.google']);
});

test('机房共享缓存：优选 API 结果写入 / 读取 Cache API；命中时不再请求对方；Cache API 不可用时照常工作', async () => {
  const store = new Map(), puts = [];
  globalThis.caches = { default: {
    async match(req) { return store.has(req.url) ? new Response(store.get(req.url)) : undefined; },
    async put(req, res) { puts.push({ url: req.url, cc: res.headers.get('Cache-Control') }); store.set(req.url, await res.text()); },
  } };
  try {
    const cfgFor = (url) => ({ filter: { ipType: ['IPv4'] }, src: { prefDomain: false }, ipsrc: { hostmonit: false, uouin: false, api1: true, api1Url: url } });
    const linksFor = async (url, handler) => {
      const env = baseEnv({ K: kv({ config: cfgFor(url) }) });
      return withFetch(handler, async (calls) => {
        const t = await (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' })).text();
        return { calls, hosts: t.split('\n').filter(l => /^vless:\/\//.test(l)).map(l => l.match(/@([^:]+):/)[1]) };
      });
    };
    // 1) 共享缓存未命中：请求对方并写入共享缓存（max-age=600）
    const urlA = 'https://shared-a.example.com/ips.txt';
    const a = await linksFor(urlA, (u) => u === urlA ? new Response('104.16.8.8') : notFound());
    assert.ok(a.hosts.includes('104.16.8.8'));
    const key = 'https://cfnext-cache.invalid/url-' + md5('url:' + urlA);
    assert.deepEqual(puts.filter(p => p.url === key).map(p => p.cc), ['max-age=600']);
    // 2) 共享缓存命中（模拟另一个实例写入的结果）：完全不请求对方
    const urlB = 'https://shared-b.example.com/ips.txt';
    store.set('https://cfnext-cache.invalid/url-' + md5('url:' + urlB), JSON.stringify([{ ip: '104.16.7.7', port: 443, name: '共享-01' }]));
    const b = await linksFor(urlB, (u) => { if (u === urlB) throw new Error('不应请求对方'); return notFound(); });
    assert.ok(b.hosts.includes('104.16.7.7'));
    assert.ok(!b.calls.includes(urlB));
  } finally { delete globalThis.caches; }
  // 3) 没有 Cache API：退回内存缓存，订阅照常
  const urlC = 'https://shared-c.example.com/ips.txt';
  const env = baseEnv({ K: kv({ config: { filter: { ipType: ['IPv4'] }, src: { prefDomain: false }, ipsrc: { hostmonit: false, uouin: false, api1: true, api1Url: urlC } } }) });
  const t = await withFetch((u) => u === urlC ? new Response('104.16.6.6') : notFound(), async () => (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' })).text());
  assert.match(t, /@104\.16\.6\.6:443/);
});

// ---------------- 批次 4：纯函数已知答案 / 协议头模糊测试 / 面板注入 ----------------
import { readFileSync } from 'node:fs';
import { createHmac, hkdfSync, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
// 构建产物里的内部函数不对外导出：去掉 import / export default 后在函数作用域内求值，取出要测的纯函数
const internals = (() => {
  const src = readFileSync(new URL('../CFNext.js', import.meta.url), 'utf8')
    .replace(/^import .*$/m, '').replace('export default {', 'const __default = {');
  return new Function('connect', src + '\n;return { md5hex, sha224hex, sha1Bytes, hmacSha1, hkdfSha1, poly1305, chacha20Poly1305Seal, chacha20Poly1305Open, parseVlessHeader, parseTrojanHeader, HTTP_PORTS, ipInCidrV6, isValidIp, parseProxyAddress, loginRateKey, relayPlan, RELAY_DOMAINS, SERVER_CHECKS, effectivePrefDomains, DEFAULT_PREFERRED_DOMAINS };')(() => { throw new Error('no sockets'); });
})();
const hex = (u8) => Buffer.from(u8).toString('hex');
const fromHexStr = (h) => new Uint8Array(Buffer.from(h.replace(/\s+/g, ''), 'hex'));
const lens = [0, 1, 3, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 1000];   // 覆盖填充边界
const msgOf = (n) => 'x'.repeat(n);

test('MD5 / SHA-224 / SHA-1 / HMAC-SHA1 / HKDF-SHA1 与 node:crypto 结果一致（含 RFC 已知答案与填充边界）', () => {
  assert.equal(internals.md5hex(''), 'd41d8cd98f00b204e9800998ecf8427e');
  assert.equal(internals.md5hex('abc'), '900150983cd24fb0d6963f7d28e17f72');
  assert.equal(internals.sha224hex('abc'), '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7');
  assert.equal(hex(internals.sha1Bytes(new TextEncoder().encode('abc'))), 'a9993e364706816aba3e25717850c26c9cd0d89d');
  for (const n of lens) {
    const m = msgOf(n), bytes = new TextEncoder().encode(m);
    assert.equal(internals.md5hex(m), createHash('md5').update(m).digest('hex'), `md5 len ${n}`);
    assert.equal(internals.sha224hex(m), createHash('sha224').update(m).digest('hex'), `sha224 len ${n}`);
    assert.equal(hex(internals.sha1Bytes(bytes)), createHash('sha1').update(m).digest('hex'), `sha1 len ${n}`);
  }
  const key = randomBytes(100), data = randomBytes(77);   // 密钥超过一个分组：先哈希
  assert.equal(hex(internals.hmacSha1(key, data)), createHmac('sha1', key).update(data).digest('hex'));
  const ikm = randomBytes(32), salt = randomBytes(16);
  for (const keyLen of [16, 32]) {
    assert.equal(hex(internals.hkdfSha1(ikm, salt, keyLen)), Buffer.from(hkdfSync('sha1', ikm, salt, 'ss-subkey', keyLen)).toString('hex'), `hkdf ${keyLen}`);
  }
});

test('Poly1305 / ChaCha20-Poly1305 通过 RFC 8439 已知答案，并与 node:crypto 互通、拒绝被篡改的数据', () => {
  // RFC 8439 §2.5.2 Poly1305
  const tag = internals.poly1305(fromHexStr('85d6be7857556d337f4452fe42d506a80103808afb0db2fd4abff6af4149f51b'), new TextEncoder().encode('Cryptographic Forum Research Group'));
  assert.equal(hex(tag), 'a8061dc1305136c6c22b8baf0c0127a9');
  // RFC 8439 §2.8.2 AEAD
  const key = fromHexStr('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f');
  const nonce = fromHexStr('070000004041424344454647');
  const aad = fromHexStr('50515253c0c1c2c3c4c5c6c7');
  const pt = new TextEncoder().encode("Ladies and Gentlemen of the class of '99: If I could offer you only one tip for the future, sunscreen would be it.");
  const sealed = internals.chacha20Poly1305Seal(key, nonce, pt, aad);
  assert.equal(hex(sealed.slice(-16)), '1ae10b594f09e26a7e902ecbd0600691');
  assert.equal(hex(sealed.slice(0, 16)), 'd31a8d34648e60db7b86afbc53ef7ec2');
  assert.equal(Buffer.from(internals.chacha20Poly1305Open(key, nonce, sealed, aad)).toString(), Buffer.from(pt).toString());
  // 与 node 互通（随机数据、多种长度）
  for (const n of [0, 1, 15, 16, 17, 64, 65, 200, 1000]) {
    const k = randomBytes(32), nc = randomBytes(12), p = randomBytes(n);
    const c = createCipheriv('chacha20-poly1305', k, nc, { authTagLength: 16 });
    const expected = Buffer.concat([c.update(p), c.final(), c.getAuthTag()]);
    assert.equal(hex(internals.chacha20Poly1305Seal(k, nc, p)), expected.toString('hex'), `seal len ${n}`);
  }
  const bad = Uint8Array.from(sealed); bad[3] ^= 1;
  assert.equal(internals.chacha20Poly1305Open(key, nonce, bad, aad), null, '篡改后认证失败');
});

test('协议头解析：任意截断只会报「头部过短」；乱码只会抛普通 Error（不出现 RangeError / TypeError）', () => {
  const cfg = { uuid: UUID };
  const trojanHex = createHash('sha224').update(UUID).digest('hex');
  const vless = [vlessReq('example.com', 443), vlessReqV6(443), new Uint8Array([0, ...uuidBytes, 3, 7, 7, 7, 1, 0, 80, 1, 1, 2, 3, 4])];
  for (const full of vless) {
    const header = internals.parseVlessHeader(full, cfg).headerLength;
    for (let k = 0; k < header; k++) {
      assert.throws(() => internals.parseVlessHeader(full.slice(0, k), cfg), (e) => e.constructor === Error && /头部过短/.test(e.message), `VLESS 截断 ${k}/${header}`);
    }
    assert.equal(internals.parseVlessHeader(full.slice(0, header), cfg).headerLength, header);
  }
  const trojanFull = new Uint8Array([...Buffer.from(trojanHex + '\r\n'), 1, 3, 11, ...Buffer.from('example.com'), 1, 187, 13, 10]);
  for (let k = 0; k < trojanFull.length; k++) {
    assert.throws(() => internals.parseTrojanHeader(trojanFull.slice(0, k)), (e) => e.constructor === Error && /头部过短/.test(e.message), `Trojan 截断 ${k}`);
  }
  assert.equal(internals.parseTrojanHeader(trojanFull).addr, 'example.com');
  for (let i = 0; i < 500; i++) {   // 随机字节：要么解析成功，要么抛出我们自己的 Error
    const junk = randomBytes(1 + Math.floor(Math.random() * 90)); if (i % 2) { junk[0] = 0; junk.set(uuidBytes.slice(0, Math.min(16, junk.length - 1)), 1); }
    for (const parse of [(b) => internals.parseVlessHeader(b, cfg), (b) => internals.parseTrojanHeader(b)]) {
      try { parse(junk); } catch (e) { assert.equal(e.constructor, Error, `${e.name}: ${e.message}`); }
    }
  }
});

test('面板注入服务端的明文端口表（不再各存一份）', async () => {
  const env = baseEnv();
  const html = await (await call(env, `/${UUID}`, { cookie: await login(env) })).text();
  assert.ok(html.includes('var HTTP_PORTS = ' + JSON.stringify([...internals.HTTP_PORTS])), '注入值与服务端 HTTP_PORTS 一致');
  assert.ok(!html.includes('/*@CFNEXT_HTTP_PORTS@*/'), '占位符已替换');
});

// ---------------- Shadowsocks AEAD 出站：对照 node:crypto 实现的参考服务端 ----------------
// 参考实现完全按 SS AEAD 规范独立编写（EVP_BytesToKey、salt=密钥长度、HKDF-SHA1 子密钥、小端 nonce 计数、≤0x3FFF 分块、
// 数据流以目标地址头开头），用来验证 worker 的 ss:// 出站客户端能与真实服务端互通
const ssMethods = { 'aes-128-gcm': { cipher: 'aes-128-gcm', keyLen: 16 }, 'aes-256-gcm': { cipher: 'aes-256-gcm', keyLen: 32 }, 'chacha20-ietf-poly1305': { cipher: 'chacha20-poly1305', keyLen: 32 } };
function ssRefKey(password, keyLen) {
  let key = Buffer.alloc(0), prev = Buffer.alloc(0);
  while (key.length < keyLen) { prev = createHash('md5').update(Buffer.concat([prev, Buffer.from(password)])).digest(); key = Buffer.concat([key, prev]); }
  return key.subarray(0, keyLen);
}
function ssRefStream(method, password, salt) {
  const m = ssMethods[method];
  const sub = Buffer.from(hkdfSync('sha1', ssRefKey(password, m.keyLen), salt, 'ss-subkey', m.keyLen));
  let counter = 0n;
  const nonce = () => { const n = Buffer.alloc(12); n.writeBigUInt64LE(counter++); return n; };   // 小端计数器
  return {
    seal(pt) { const c = createCipheriv(m.cipher, sub, nonce(), { authTagLength: 16 }); return Buffer.concat([c.update(pt), c.final(), c.getAuthTag()]); },
    open(ct) { const d = createDecipheriv(m.cipher, sub, nonce(), { authTagLength: 16 }); d.setAuthTag(ct.subarray(-16)); return Buffer.concat([d.update(ct.subarray(0, -16)), d.final()]); },
  };
}
// 从客户端写入的字节流解出全部明文（遇到不完整的块停止）
function ssRefDecodeClient(method, password, bytes) {
  const keyLen = ssMethods[method].keyLen;
  const buf = Buffer.concat(bytes.map(b => Buffer.from(b)));
  if (buf.length < keyLen) return { plain: Buffer.alloc(0), maxChunk: 0 };
  const dec = ssRefStream(method, password, buf.subarray(0, keyLen));
  let off = keyLen, maxChunk = 0; const out = [];
  while (off + 18 <= buf.length) {
    const len = dec.open(buf.subarray(off, off + 18)).readUInt16BE(0);
    if (len > 0x3fff || off + 18 + len + 16 > buf.length) break;
    out.push(dec.open(buf.subarray(off + 18, off + 18 + len + 16)));
    off += 18 + len + 16; maxChunk = Math.max(maxChunk, len);
  }
  return { plain: Buffer.concat(out), maxChunk };
}
for (const method of Object.keys(ssMethods)) {
  test(`Shadowsocks 出站（${method}）：与按规范实现的参考服务端互通——目标地址头、分块、小端 nonce、双向数据`, async () => {
    const password = 'p@ss word!';
    const targets = [
      ['example.com', Buffer.from([3, 11, ...Buffer.from('example.com'), 1, 187])],
    ];
    for (const [host, expectHeader] of targets) {
      const log = fakeNet({ '10.0.0.9': { delay: 5 } });
      const env = baseEnv({ K: kv({ config: { outboundProxy: `ss://${method}:${encodeURIComponent(password)}@10.0.0.9:8388`, outboundMode: 'only' } }) });
      const ws = await openWs(env);
      const big = new Uint8Array(40000).map((_, i) => i & 255); big.set(TLS_HELLO);   // 超过单块上限：必须拆块
      await ws.emit('message', { data: vlessReq(host, 443, [...big]).buffer });
      await until(() => log.length && ssRefDecodeClient(method, password, log[0].written).plain.length >= expectHeader.length + big.length);
      const { plain, maxChunk } = ssRefDecodeClient(method, password, log[0].written);
      assert.deepEqual([...plain.subarray(0, expectHeader.length)], [...expectHeader], '数据流以目标地址头开始');
      assert.deepEqual([...plain.subarray(expectHeader.length)], [...big], '转发的数据完整');
      assert.ok(maxChunk <= 0x3fff, `单块 ${maxChunk} 字节不超过 0x3FFF`);
      assert.equal(log[0].written[0].length >= ssMethods[method].keyLen, true);
      // 服务端回包：salt + 多个块（nonce 逐块递增），客户端解密后转给 WebSocket
      const serverSalt = randomBytes(ssMethods[method].keyLen);
      const enc = ssRefStream(method, password, serverSalt);
      const chunk = (pt) => Buffer.concat([enc.seal(Buffer.from([pt.length >> 8, pt.length & 255])), enc.seal(Buffer.from(pt))]);
      log[0].push(Buffer.concat([serverSalt, chunk([9, 9, 9]), chunk([7, 7])]));
      await until(() => ws.sent.length >= 3);
      assert.deepEqual(ws.sent.slice(1).map(x => [...x]), [[9, 9, 9], [7, 7]]);
    }
  });
}

test('Shadowsocks 出站：IPv4 / IPv6 目标使用对应的地址类型；密码派生与 EVP_BytesToKey 一致', async () => {
  const method = 'aes-256-gcm', password = 'secret';
  const run = async (req, header) => {
    const log = fakeNet({ '10.0.0.9': { delay: 5 } });
    const env = baseEnv({ K: kv({ config: { outboundProxy: `ss://${method}:${password}@10.0.0.9:8388`, outboundMode: 'only' } }) });
    const ws = await openWs(env);
    await ws.emit('message', { data: req.buffer });
    await until(() => log.length && ssRefDecodeClient(method, password, log[0].written).plain.length >= header.length);
    assert.deepEqual([...ssRefDecodeClient(method, password, log[0].written).plain.subarray(0, header.length)], [...header]);
  };
  await run(new Uint8Array([0, ...uuidBytes, 0, 1, 1, 187, 1, 1, 2, 3, 4, ...TLS_HELLO]), [1, 1, 2, 3, 4, 1, 187]);
  await run(vlessReqV6(443), [4, ...ipv6Bytes, 1, 187]);
});

// ---------------- 可配置：优选域名 / 内置地区反代 ----------------
const cfDoh = (map, log = []) => async (url) => {   // 简易 DoH：map[域名] = [A 记录]，其余无记录
  const u = new URL(url); const name = u.searchParams.get('name'), type = { 1: 'A', 28: 'AAAA' }[u.searchParams.get('type')] || u.searchParams.get('type');
  log.push({ name, type });
  const ips = type === 'A' ? (map[name] || []) : [];
  return new Response(JSON.stringify({ Status: 0, Answer: ips.map(data => ({ type: 1, data })) }));
};
const domainsOfSub = async (config, fetchHandler = notFound) => {
  const env = baseEnv({ K: kv({ config: { cfgRev: 2, ...config } }) });
  const t = await withFetch(fetchHandler, async () => (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7' })).text());
  return t.split('\n').filter(l => /^vless:\/\//.test(l)).map(l => l.match(/@([^:?]+):/)[1]);
};

test('优选域名校验：只接受纯主机名；规范化（小写、去重、多种分隔符）；上限 30 个', () => {
  const chk = internals.SERVER_CHECKS.domainList;
  assert.deepEqual(chk('A.Example.com, b.example.org\nA.example.com;  c.example.net'), { value: 'a.example.com\nb.example.org\nc.example.net' });
  assert.deepEqual(chk(''), { value: '' });
  for (const bad of ['https://a.example.com', 'a.example.com:443', 'a.example.com/path', '*.example.com', '1.2.3.4', 'localhost', '-a.example.com', 'a..example.com', 'a_b.example.com', 'exa mple.com x']) {
    assert.equal(typeof chk(bad), 'string', `应拒绝：${bad}`);
  }
  const many = Array.from({ length: 31 }, (_, i) => `d${i}.example.com`).join('\n');
  assert.match(chk(many), /最多 30 个/);
  assert.equal(typeof chk(many.split('\n').slice(0, 30).join('\n')), 'object');
});

test('优选域名：填写后整体替换内置列表（默认模式域名节点、IPv6 解析），留空用内置列表', async () => {
  const base = { filter: { ipType: ['IPv4'] }, ipsrc: { hostmonit: false, uouin: false } };
  // 默认模式：域名节点的 server 就是配置的域名
  const own = await domainsOfSub({ ...base, prefDomains: 'one.example.com\ntwo.example.org' });
  assert.deepEqual(own.filter(h => /example\.(com|org)$/.test(h)), ['one.example.com', 'two.example.org']);
  assert.ok(!own.includes('cloudflare.182682.xyz') && !own.includes('bestcf.top'), '内置列表被整体替换');
  const builtin = await domainsOfSub(base);
  assert.deepEqual(builtin.slice(0, 3), internals.DEFAULT_PREFERRED_DOMAINS.split('\n').slice(0, 3), '留空沿用内置列表');
  assert.equal(builtin.length, 14);
  for (const dead of ['speed.marisalnc.com', 'freeyx.cloudflare88.eu.org', 'bestcf.top', 'cfip.cfcdn.vip', 'cf.zhetengsha.eu.org', 'cloudflare.9jy.cc', 'cf.zerone-cdn.pp.ua', '115155.xyz', 'cname.xirancdn.us', 'f3058171cad.002404.xyz', '8.889288.xyz']) {
    assert.ok(!builtin.includes(dead), `${dead} 实测失效，不应在内置列表中`);
  }
  // 仅 IPv6：只查询配置的域名（+官方域名）的 AAAA
  const log6 = [];
  await domainsOfSub({ ...base, filter: { ipType: ['IPv6'] }, prefDomains: 'one.example.com' }, cfDoh({}, log6));
  const names6 = new Set(log6.filter(x => x.type === 'AAAA').map(x => x.name));
  assert.ok(names6.has('one.example.com') && names6.has('cloudflare.com'));
  assert.ok(![...names6].some(n => internals.DEFAULT_PREFERRED_DOMAINS.split('\n').includes(n)));
});

test('保存校验：非法优选域名 / 自定义反代给出字段级错误；「仅使用自定义反代」但列表为空被拒绝；配置可往返', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const save = (body) => call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body });
  let r = await save({ prefDomains: 'https://bad.example.com' });
  assert.equal(r.status, 400);
  assert.equal((await r.json()).errors[0].field, 'prefDomains');
  r = await save({ relay: { custom: 'a.example.com\nb.example.com\nc.example.com\nd.example.com' } });
  assert.match((await r.json()).msg, /最多 3 个/);
  r = await save({ relay: { custom: 'bad host' } });
  assert.equal(r.status, 400);
  r = await save({ relay: { mode: 'custom', custom: '' } });
  assert.equal((await r.json()).errors[0].field, 'relay.custom');
  r = await save({ relay: { mode: 'sideways' } });
  assert.equal(r.status, 400);
  r = await save({ prefDomains: 'Z.Example.com\na.example.com', relay: { mode: 'custom', custom: 'Relay.Example.com:8443, [2001:db8::1]:443', region: 'JP', region2: 'none' } });
  assert.equal(r.status, 200);
  const d = (await r.json()).data;
  assert.equal(d.prefDomains, 'z.example.com\na.example.com');
  assert.deepEqual(d.relay, { mode: 'custom', region: 'JP', region2: 'none', custom: 'relay.example.com:8443\n[2001:db8::1]' });
  assert.equal(d.builtinPrefDomains.length, 14, '面板「载入内置列表」所需');
  assert.equal(stored(env).relay.mode, 'custom');
});

test('地区反代计划：默认按机房自动选地区；可固定首选 / 次选；none 只用首选；custom 取前 3 个；off 为空', () => {
  const plan = (relay, colo) => internals.relayPlan({ relay }, colo).map(p => `${p.host}:${p.port}x${p.take}`);
  const R = internals.RELAY_DOMAINS;
  assert.deepEqual(plan(undefined, 'NRT'), [`${R.JP}:443x2`, `${R.HK}:443x1`], '默认：机房对应地区 + 默认的另一地区');
  assert.deepEqual(plan({ mode: 'builtin' }, 'HKG'), [`${R.HK}:443x2`, `${R.US}:443x1`], '首选为 HK 时次选用 US');
  assert.deepEqual(plan({ mode: 'builtin', region: 'DE', region2: 'NL' }, 'NRT'), [`${R.DE}:443x2`, `${R.NL}:443x1`]);
  assert.deepEqual(plan({ mode: 'builtin', region: 'DE', region2: 'none' }, 'NRT'), [`${R.DE}:443x2`]);
  assert.deepEqual(plan({ mode: 'builtin', region: 'DE', region2: 'DE' }, 'NRT'), [`${R.DE}:443x2`, `${R.HK}:443x1`], '次选与首选相同：回到默认的另一地区');
  assert.deepEqual(plan({ mode: 'builtin', region: 'bogus' }, 'NRT'), [`${R.JP}:443x2`, `${R.HK}:443x1`], '无效地区回退自动');
  assert.deepEqual(plan({ mode: 'custom', custom: 'a.example.com\nb.example.com:8443\n203.0.113.9\nd.example.com' }, 'NRT'),
    ['a.example.com:443x2', 'b.example.com:8443x1', '203.0.113.9:443x1']);
  assert.deepEqual(plan({ mode: 'off' }, 'NRT'), []);
});

test('地区反代模式：off 时不解析也不连接任何地区反代；custom 只连自己的反代；固定地区只解析该地区', async () => {
  // off：目标直连失败后不尝试任何反代，连接被关闭
  let log = fakeNet({});
  let dns = [];
  let env = baseEnv({ K: kv({ config: { relay: { mode: 'off' } } }) });
  await withFetch(cfDoh({}, dns), async () => {
    const ws = await openWs(env);
    await ws.emit('message', { data: vlessReq('off-test.example', 443, TLS_HELLO).buffer });
    assert.equal(ws.closed.code, 1011);
  });
  assert.deepEqual(log.map(s => s.hostname), ['off-test.example'], '只尝试了直连');
  assert.equal(dns.filter(d => d.name.startsWith('proxyip.')).length, 0, '没有解析任何内置反代域名');
  // custom：直连挂起（目标在 Cloudflare 上）→ 自定义反代接管，内置反代不被碰
  log = fakeNet({ 'cf-custom.example': { delay: 'hang' }, '203.0.113.31': { delay: 10 }, '203.0.113.30': { delay: 40 } });
  dns = [];
  env = baseEnv({ K: kv({ config: { relay: { mode: 'custom', custom: 'my-relay.example.com\n203.0.113.30:8443' } } }) });
  await withFetch(cfDoh({ 'my-relay.example.com': ['203.0.113.31'] }, dns), async () => {
    const ws = await openWs(env);
    await ws.emit('message', { data: vlessReq('cf-custom.example', 443, TLS_HELLO).buffer });
    await until(() => log.some(s => s.written.length));
  });
  const used = log.find(s => s.written.length);
  assert.equal(used.hostname, '203.0.113.31');
  assert.deepEqual([...used.written[0]], TLS_HELLO);
  assert.equal(log.find(s => s.hostname === '203.0.113.30').port, 8443, 'IP:端口 原样连接');
  assert.equal(dns.filter(d => d.name.startsWith('proxyip.')).length, 0, '自定义模式不解析内置反代');
  // 固定地区：首选 SE、次选不使用 → 只解析 SE
  log = fakeNet({ 'cf-se.example': { delay: 'hang' }, '203.0.113.50': { delay: 10 } });
  dns = [];
  env = baseEnv({ K: kv({ config: { relay: { mode: 'builtin', region: 'SE', region2: 'none' } } }) });
  await withFetch(cfDoh({ 'proxyip.se.cmliussss.net': ['203.0.113.50'] }, dns), async () => {
    const ws = await openWs(env);
    await ws.emit('message', { data: vlessReq('cf-se.example', 443, TLS_HELLO).buffer });
    await until(() => log.some(s => s.written.length));
  });
  assert.equal(log.find(s => s.written.length).hostname, '203.0.113.50');
  assert.deepEqual([...new Set(dns.filter(d => d.name.startsWith('proxyip.')).map(d => d.name))], ['proxyip.se.cmliussss.net']);
});

test('优选域名测试接口：解析输入框中尚未保存的域名，标出是否在 Cloudflare 段；非法输入 400；需登录', async () => {
  const env = baseEnv();
  const cookie = await login(env);
  const test = (body, ck = cookie) => call(env, `/${UUID}/api/ipsrc-test`, { method: 'POST', cookie: ck, body });
  const doh = cfDoh({ 'good.example.com': ['104.16.1.1', '104.16.1.2'], 'moved.example.com': ['203.0.113.7'] });
  await withFetch(doh, async () => {
    const r = await (await test({ source: 'domains', text: 'good.example.com\nmoved.example.com\nnone.example.com' })).json();
    assert.equal(r.ok, true);
    assert.equal(r.data.count, 1);
    const byName = Object.fromEntries(r.data.domains.map(x => [x.domain, x]));
    assert.equal(byName['good.example.com'].ok, true);
    assert.equal(byName['moved.example.com'].ok, false);
    assert.deepEqual(byName['moved.example.com'].ips, ['203.0.113.7']);
    assert.equal(byName['none.example.com'].ok, false);
    assert.equal((await test({ source: 'domains', text: 'http://bad.example.com' })).status, 400);
    assert.equal((await test({ source: 'domains', text: '' })).status, 200, '留空测试内置列表');
  });
  assert.equal((await test({ source: 'domains', text: 'good.example.com' }, '')).status, 403);
});

test('自定义订阅 / 随机优选已移除：旧 KV 中的相关字段与 YX 环境变量被忽略，订阅按默认来源生成，面板不再有对应控件', async () => {
  const legacy = { cfgRev: 2, filter: { ipType: ['IPv4'] }, ipsrc: { hostmonit: false, uouin: false },
    optimizer: { subMode: 'custom', subIncludeDefault: true, subRandomCount: 5 }, preferredDomains: 'my.custom.example\n104.16.0.9:443#MINE',
    preferredIPs: [{ ip: '104.16.0.10', port: 443, name: 'MINE2' }] };
  const env = baseEnv({ YX: '104.16.0.11:443#ENV', K: kv({ config: legacy }) });
  const links = (await (await subOf(env, 'plain')).text()).split('\n').filter(Boolean);
  assert.equal(links.length, 14, '按默认来源（内置 14 个优选域名）生成');
  assert.ok(!links.some(l => ['my.custom.example', '104.16.0.9', '104.16.0.10', '104.16.0.11'].includes(l.match(/@([^:?]+):/)[1])));
  assert.ok(!links.some(l => /MINE|ENV/.test(nameOf(l))));
  const cookie = await login(env);
  const html = await (await call(env, `/${UUID}`, { cookie })).text();
  for (const id of ['o-submode', 'o-subinc', 'o-rand', 'f-preferred', 'sm-custom', 'sm-random', 'fl-custom-pref', 'fl-random-pref']) assert.ok(!html.includes(`id="${id}"`), `${id} 已移除`);
  // 下次保存时旧字段被清掉
  const res = await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'h2' } });
  assert.equal(res.status, 200);
  for (const k of ['optimizer', 'preferredDomains', 'preferredIPs']) assert.equal(k in stored(env), false, `${k} 已从 KV 清除`);
});

test('节点测活已移除：旧 KV 的 probeAlive 与 PROBE_ALIVE 环境变量被忽略，订阅不再对优选域名做任何预检解析，面板无对应开关', async () => {
  const env = baseEnv({ PROBE_ALIVE: '1', K: kv({ config: { cfgRev: 2, probeAlive: true, filter: { ipType: ['IPv4'] }, ipsrc: { hostmonit: false, uouin: false } } }) });
  const calls = [];
  const links = await withFetch((u) => { calls.push(u); return nodesFetch(u); }, async () =>
    (await (await call(env, `/${UUID}/sub/plain`, { ua: 'x' })).text()).split('\n').filter(Boolean));
  assert.equal(links.length, 14, '14 个内置优选域名原样下发');
  assert.equal(calls.filter(u => /cloudflare-dns\.com|alidns/.test(u)).length, 0, '没有为预检发出任何 DoH 请求');
  const cookie = await login(env);
  const cfg = await (await call(env, `/${UUID}/api/config`, { cookie })).json();
  assert.equal('probeAlive' in cfg.data, false);
  const html = await (await call(env, `/${UUID}`, { cookie })).text();
  assert.ok(!html.includes('id="q-probe-on"') && !html.includes('节点测活'));
  await call(env, `/${UUID}/api/config`, { method: 'POST', cookie, body: { alpn: 'h2' } });
  assert.equal('probeAlive' in stored(env), false, '下次保存时从 KV 清除');
});

test('Stash 手动选择格式时输出 Clash 配置（与按 UA 识别一致），不再是明文链接', async () => {
  const env = baseEnv({ K: kv({ config: customCfg() }) });
  const forced = await (await subOf(env, 'stash')).text();
  assert.match(forced, /^# CFNext 订阅\ntest-url:/);
  assert.match(forced, /\nproxies:\n/);
  const byUa = await (await withFetch(nodesFetch, () => call(env, `/${UUID}/sub`, { ua: 'Stash/2.7 Clash/1.9' }))).text();
  assert.equal(forced, byUa, '手动选 Stash 与 Stash 客户端自动识别得到同一份配置');
});

test('Surge / Loon / Quantumult X 不输出 XHTTP 节点（它们没有 XHTTP 传输）；只启用 XHTTP 时明确报错', async () => {
  const both = baseEnv({ K: kv({ config: customCfg({ enableXhttp: true }) }) });
  for (const [fmt, nodeRe] of [['surge', /^a(\.X)? = vless,/m], ['loon', /^a(\.X)? = vless,/m], ['quanx', /tag=a(\.X)?$/m]]) {
    const body = await (await subOf(both, fmt)).text();
    assert.ok(!/\.X\b/.test(body), `${fmt} 不含 XHTTP 节点（.X）`);
    assert.match(body, nodeRe, `${fmt} 仍包含 VLESS 节点`);
  }
  const only = baseEnv({ K: kv({ config: customCfg({ enableVless: false, enableTrojan: false, enableXhttp: true }) }) });
  for (const [fmt, name] of [['surge', 'Surge'], ['loon', 'Loon'], ['quanx', 'Quantumult X']]) {
    const res = await subOf(only, fmt);
    assert.equal(res.status, 500, fmt);
    assert.match(await res.text(), new RegExp(name + ' 不支持 XHTTP'));
  }
  // 链接类订阅与 Clash 仍然包含 XHTTP 节点
  assert.match(await (await subOf(both, 'plain')).text(), /type=xhttp/);
  assert.match(await (await subOf(both, 'clash')).text(), /network: xhttp/);
});
