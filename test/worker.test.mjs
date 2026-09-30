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
async function login(env, password = 'pw') {
  const res = await call(env, '/login', {
    method: 'POST', body: 'password=' + encodeURIComponent(password),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': '203.0.113.' + Math.floor(Math.random() * 250) },
  });
  assert.equal(res.status, 200, 'login should succeed');
  return res.headers.get('Set-Cookie').split(';')[0];
}
const baseEnv = (extra = {}) => ({ U: UUID, ADMIN: 'pw', K: kv(), ...extra });

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
    probeAlive: false, proxyIP: '', outboundProxy: '', outboundMode: '', preferredIPs: [],
    optimizer: { fillCount: 0, subMode: '', subRandomCount: 16, subIncludeDefault: false },
    filter: { region: ['all'], ipType: ['IPv4', 'IPv6'], isp: ['移动', '联通', '电信'] },
    src: { native: false, prefDomain: true, prefIp: true },
  };
  for (const [k, v] of Object.entries(legacy)) assert.deepEqual(d[k], v, k);
  assert.equal(d.preferredDomains, '', '默认不再预置 bestcf 第三方中转地址');
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
    [{ optimizer: { subRandomCount: 500 } }, 'optimizer.subRandomCount'],
    [{ optimizer: { subMode: 'bogus' } }, 'optimizer.subMode'],
    [{ path: 'a/b' }, 'path'],
    [{ path: 'login' }, 'path'],
    [{ subUrl: 'version' }, 'subUrl'],
    [{ host: 'bad host' }, 'host'],
    [{ outboundProxy: 'ss://rc4:pw@1.2.3.4:8388' }, 'outboundProxy'],
    [{ preferredIPs: [{ ip: '999.1.1.1', port: 443 }] }, 'preferredIPs'],
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
      optimizer: { subRandomCount: '30' }, nodeLimitCount: 300, subUrl: '/AAZ/sub', host: 'https://Node.Example.com/path', filter: { region: ['all', 'HK'] },
      preferredIPs: [{ ip: '[2606:4700::1]', port: '8443', name: ' 香港 ' }],
    },
  });
  const r = await res.json();
  assert.equal(res.status, 200, JSON.stringify(r));
  const s = stored(env);
  assert.equal('admin' in s, false, 'ADMIN 由环境变量提供时不写入 KV');
  for (const k of ['_quotaCap', 'version', 'fragment']) assert.equal(k in s, false, k);
  assert.equal('customPref' in s.src, false);
  assert.equal(s.src.native, true);
  assert.equal(s.optimizer.subRandomCount, 30);
  assert.equal('nodeLimitCount' in s, false, '已移除的字段不写入');
  assert.equal(s.subUrl, 'AAZ');
  assert.equal(s.host, 'Node.Example.com');
  assert.deepEqual(s.filter.region, ['all']);
  assert.deepEqual(s.preferredIPs, [{ ip: '2606:4700::1', port: 8443, name: '香港' }]);
  assert.ok(r.ignored.includes('admin') && r.ignored.includes('_quotaCap') && r.ignored.includes('src.customPref') && r.ignored.includes('nodeLimitCount'));
  assert.equal(r.data.optimizer.subRandomCount, 30, '响应直接反映刚保存的配置');
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
  assert.ok(newCookie && newCookie.startsWith('luma_auth='));
  const again = await call(env, `/${UUID2}/api/config`, { cookie: newCookie.split(';')[0] });
  assert.equal(again.status, 200, '新令牌可直接访问新路径');
  const old = await call(env, `/${UUID2}/api/config`, { cookie });
  assert.equal(old.status, 403, '旧令牌随 UUID 变更失效');
});

test('环境变量锁定的字段在面板只读、保存时忽略（问题 3）', async () => {
  const env = baseEnv({ D: 'panel' });
  const cookie = await login(env);
  const r = await (await call(env, '/panel/api/config', { cookie })).json();
  assert.deepEqual(r.data.envLocked, { path: 'D', admin: 'ADMIN' });
  const res = await call(env, '/panel/api/config', { method: 'POST', cookie, body: { path: 'other' } });
  const s = await res.json();
  assert.equal(res.status, 200);
  assert.equal(s.data.panelPath, 'panel');
  assert.equal('path' in stored(env), false);
});

test('订阅别名只输出订阅，不开放面板 / 管理接口（问题 6）', async () => {
  const env = baseEnv({ K: kv({ config: { subUrl: 'AAZ', optimizer: { subMode: 'random' }, filter: { ipType: ['IPv4'] } } }) });
  const cookie = await login(env);
  const sub = await call(env, '/AAZ/sub', { ua: 'v2rayN/7.0' });
  assert.equal(sub.status, 200);
  assert.match(await sub.text(), /^vless:\/\//m);
  assert.equal((await call(env, '/AAZ', { cookie })).status, 404, '别名下不提供面板');
  assert.equal((await call(env, '/AAZ/api/config', { cookie })).status, 404, '别名下不提供管理接口');
  assert.equal((await call(env, `/${UUID}`, { cookie })).status, 200, '面板路径不受影响');
});

test('预览与订阅同一流程：返回节点数，订阅不写 KV（问题 7）', async () => {
  const env = baseEnv({ K: kv({ config: { optimizer: { subMode: 'random', subRandomCount: 10 }, filter: { ipType: ['IPv4'] } } }) });
  const cookie = await login(env);
  const r = await (await call(env, `/${UUID}/api/sub?fmt=v2ray`, { cookie })).json();
  assert.equal(r.ok, true);
  assert.equal(r.count, 10);
  assert.equal(r.body.trim().split('\n').length, 10);
  const sub = await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' });
  assert.equal((await sub.text()).trim().split('\n').length, 10);
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
  assert.deepEqual(check(schema.find(d => d.key === 'optimizer.subRandomCount'), '42'), { value: 42 });
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

test('默认模式不下发「优选配置」中的自定义域名与 IP', async () => {
  const env = baseEnv({ K: kv({ config: {
    preferredDomains: 'my.custom.example\nhttps://api.example.com/ips.txt',
    preferredIPs: [{ ip: '104.16.0.9', port: 443, name: 'MINE' }],
    filter: { ipType: ['IPv4'] },
  } }) });
  const links = await subLinks(env);
  assert.ok(links.length > 0);
  assert.ok(!links.some(l => hostOf(l) === 'my.custom.example' || nameOf(l) === 'MINE'));
});

test('随机优选数量按面板设定下发', async () => {
  const env = baseEnv({ K: kv({ config: { optimizer: { subMode: 'random', subRandomCount: 16 }, filter: { ipType: ['IPv4'] } } }) });
  const links = await subLinks(env);
  assert.equal(links.filter(l => /^优选IP-\d+$/.test(nameOf(l))).length, 16);
  assert.equal(links.length, 16, '只下发随机 16 个（不再追加内置保底节点）');
});

test('选择具体地区时仍保留不带地区的通用节点（优选域名节点）', async () => {
  const env = baseEnv({ K: kv({ config: { filter: { region: ['HK'], ipType: ['IPv4'] } } }) });
  const names = (await subLinks(env)).map(nameOf);
  assert.ok(names.some(n => /^优选IP-\d+$/.test(n)), '优选域名节点（通用）保留');
});

test('默认模式（IPv4+IPv6、节点测活开启）子请求数不超过免费版 50 个上限，DoH 不重复查询', async () => {
  const env = baseEnv({ K: kv({ config: { probeAlive: true } }) });
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
  // 严格自定义模式且列表为空 → 同样兜底
  const c = await subLinks(baseEnv({ K: kv({ config: { optimizer: { subMode: 'custom' }, preferredDomains: '' } }) }));
  assert.ok(c.some(l => hostOf(l) === 'cloudflare.com'));
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
  // 自定义订阅中两条地址同名（名称按填写原样使用）
  const env = baseEnv({ K: kv({ config: { enableTrojan: true, enableXhttp: true, alpn: 'h2, http/1.1', cfgRev: 2,
    optimizer: { subMode: 'custom' }, preferredDomains: '104.16.9.1:443#同名\n104.16.9.2:443#同名', filter: { ipType: ['IPv4'] } } }) });
  const get = (fmt) => withFetch(notFound, async () => (await call(env, `/${UUID}/sub/${fmt}`, { ua: 'x' })).text());
  const links = (await get('plain')).split('\n').filter(Boolean);
  assert.deepEqual(links.map(nameOf), ['同名', '同名.T', '同名.X', '同名·2', '同名.T·2', '同名.X·2']);
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
  assert.deepEqual(nodes.map(o => o.tag), ['同名', '同名.T', '同名·2', '同名.T·2']);
  const tags = sb.outbounds.map(o => o.tag);
  assert.equal(new Set(tags).size, tags.length, 'outbound tag 不重复');
  assert.ok(nodes.every(o => o.transport.type === 'ws' && o.transport.max_early_data === 2048 && !o.transport.path.includes('?')));
  assert.deepEqual(nodes[0].tls.alpn, ['h2', 'http/1.1']);
  assert.ok(sb.route.rule_set.every(r => r.format === 'binary' && r.url.endsWith('.srs')));
  assert.ok(!sb.outbounds.some(o => o.type === 'dns' || o.type === 'block'), '不含已移除的 dns / block 出站');
  assert.ok(!JSON.stringify(sb.route.rules).includes('"geoip"'), '不含已移除的 geoip 规则');
});
