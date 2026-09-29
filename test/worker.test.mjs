// 管理面板与配置接口测试（node:test，无第三方依赖）：直接加载构建产物 CFNext.js，
// 用内存 Map 模拟 KV、桩替换 cloudflare:sockets 与外网 fetch。运行：npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

// cloudflare:sockets 仅存在于 Workers 运行时：测试中替换为不可用的桩
const hooks = `
export async function resolve(spec, ctx, next) {
  if (spec === 'cloudflare:sockets') {
    return { url: 'data:text/javascript,export function connect(){ throw new Error("sockets unavailable in tests"); }', shortCircuit: true };
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
    alpn: '', ech: false, echHost: 'cloudflare-ech.com', echDns: '', tlsOnly: false,
    nodeLimit: true, nodeLimitCount: 500, polling: false, probeAlive: false,
    cfAccountId: '', quotaAuto: false, proxyIP: '', outboundProxy: '', outboundMode: '', preferredIPs: [],
    optimizer: { fillCount: 0, subMode: '', subRandomCount: 16, subIncludeDefault: false },
    filter: { region: ['all'], ipType: ['IPv4', 'IPv6'], isp: ['移动', '联通', '电信'] },
    src: { native: false, prefDomain: true, prefIp: true },
  };
  for (const [k, v] of Object.entries(legacy)) assert.deepEqual(d[k], v, k);
  assert.match(d.preferredDomains, /bestcf\.pages\.dev\/random-region\/HK\/100\.txt/);
  assert.equal(d.uuid, UUID);
  assert.equal(d.path, '', '面板路径跟随 UUID 时返回空');
  assert.equal(d.panelPath, UUID);
  assert.equal(d.adminSet, true);
  assert.equal('admin' in d, false, '不下发管理密码');
  assert.deepEqual(d.envLocked, { admin: 'ADMIN' });
  assert.deepEqual(d.caps, { light: 500, heavy: 500 });
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
    [{ nodeLimitCount: 5000 }, 'nodeLimitCount'],
    [{ optimizer: { subMode: 'bogus' } }, 'optimizer.subMode'],
    [{ path: 'a/b' }, 'path'],
    [{ path: 'login' }, 'path'],
    [{ subUrl: 'version' }, 'subUrl'],
    [{ host: 'bad host' }, 'host'],
    [{ cfAccountId: 'me@example.com' }, 'cfAccountId'],
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
      nodeLimitCount: '300', subUrl: '/AAZ/sub', host: 'https://Node.Example.com/path', filter: { region: ['all', 'HK'] },
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
  assert.equal(s.nodeLimitCount, 300);
  assert.equal(s.subUrl, 'AAZ');
  assert.equal(s.host, 'Node.Example.com');
  assert.deepEqual(s.filter.region, ['all']);
  assert.deepEqual(s.preferredIPs, [{ ip: '2606:4700::1', port: 8443, name: '香港' }]);
  assert.ok(r.ignored.includes('admin') && r.ignored.includes('_quotaCap') && r.ignored.includes('src.customPref'));
  assert.equal(r.data.nodeLimitCount, 300, '响应直接反映刚保存的配置');
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
  const env = baseEnv({ D: 'panel', CF_ACCOUNT_ID: '0123456789abcdef0123456789abcdef' });
  const cookie = await login(env);
  const r = await (await call(env, '/panel/api/config', { cookie })).json();
  assert.deepEqual(r.data.envLocked, { path: 'D', admin: 'ADMIN', cfAccountId: 'CF_ACCOUNT_ID' });
  const res = await call(env, '/panel/api/config', { method: 'POST', cookie, body: { path: 'other', cfAccountId: 'ffffffffffffffffffffffffffffffff' } });
  const s = await res.json();
  assert.equal(res.status, 200);
  assert.equal(s.data.panelPath, 'panel');
  assert.equal('path' in stored(env), false);
  assert.equal('cfAccountId' in stored(env), false);
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

test('预览与订阅同一流程：返回节点数且不写入轮询窗口（问题 7）', async () => {
  const env = baseEnv({ K: kv({ config: { polling: true, nodeLimit: true, nodeLimitCount: 10, optimizer: { subMode: 'random' }, filter: { ipType: ['IPv4'] } } }) });
  const cookie = await login(env);
  const r = await (await call(env, `/${UUID}/api/sub?fmt=v2ray`, { cookie })).json();
  assert.equal(r.ok, true);
  assert.equal(r.count, 10);
  assert.equal(r.body.trim().split('\n').length, 10);
  assert.equal(env.K.m.has('issued'), false, '预览不消耗轮询窗口');
  await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' });
  assert.equal(env.K.m.has('issued'), true, '真实订阅写入轮询窗口');
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
  assert.deepEqual(check(schema.find(d => d.key === 'nodeLimitCount'), '42'), { value: 42 });
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
const STABLE = new Set(['104.16.128.11', '172.67.72.4', '104.17.201.77', '104.16.66.7', '104.16.88.7',
  '104.16.98.7', '104.17.2.7', '104.17.44.9', '104.18.34.34', '104.18.7.34', '104.19.191.31', '104.19.1.1',
  '104.20.15.15', '104.20.1.1', '104.21.23.1', '104.21.2.1', '104.24.12.10', '104.25.0.1', '104.26.1.1', '162.159.128.1']);
const subLinks = async (env) => (await (await call(env, `/${UUID}/sub`, { ua: 'v2rayN/7.0' })).text()).split('\n').filter(l => /^(vless|trojan):\/\//.test(l));
const hostOf = (l) => l.match(/@(\[[^\]]+\]|[^:?]+)/)[1];
const nameOf = (l) => decodeURIComponent(l.slice(l.indexOf('#') + 1));

test('默认模式轮询换新：每次更新按「最久未下发优先」换一批 IP，保底 IP 固定在前', async () => {
  const env = baseEnv({ K: kv({ config: { polling: true, nodeLimitCount: 60, filter: { ipType: ['IPv4'] } } }) });
  const batches = [];
  for (let i = 0; i < 3; i++) {
    const links = await subLinks(env);
    assert.equal(links.length, 60);
    const ips = links.map(hostOf).filter(h => /^\d+\.\d+\.\d+\.\d+$/.test(h));
    assert.ok([...STABLE].every(ip => ips.includes(ip)), '保底 IP 每次都下发');
    batches.push(new Set(ips.filter(ip => !STABLE.has(ip))));
  }
  assert.ok(batches[0].size > 0);
  for (const [a, b] of [[0, 1], [1, 2], [0, 2]]) {
    assert.equal([...batches[a]].filter(ip => batches[b].has(ip)).length, 0, `第 ${a + 1} 与第 ${b + 1} 批不重复`);
  }
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

test('随机优选数量不被节点数量控制抬高', async () => {
  const env = baseEnv({ K: kv({ config: { optimizer: { subMode: 'random', subRandomCount: 16 }, nodeLimit: true, nodeLimitCount: 500, filter: { ipType: ['IPv4'] } } }) });
  const links = await subLinks(env);
  assert.equal(links.filter(l => /^优选IP-\d+$/.test(nameOf(l))).length, 16);
  assert.equal(links.length, 16 + 20, '随机 16 + 内置保底 20');
});

test('选择具体地区时仍保留不带地区的通用节点（含内置保底「优选IP-S」）', async () => {
  const env = baseEnv({ K: kv({ config: { filter: { region: ['HK'], ipType: ['IPv4'] } } }) });
  const names = (await subLinks(env)).map(nameOf);
  assert.ok(names.includes('优选IP-S01'));
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
