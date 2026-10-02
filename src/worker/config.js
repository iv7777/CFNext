// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// 配置加载：默认值 < 环境变量 < KV 图形化配置
// KV 读取走 Cloudflare KV 内置边缘缓存 cacheTtl=30：请求/面板读配置命中边缘缓存，
// 不再每次穿透 KV，KV 读量降一个数量级；不再使用模块级内存缓存（不同 isolate
// 不共享且会残留陈旧值）。KV 是最终一致的：同一机房写入后随即可见，其它机房最多约 1 分钟后同步（面板保存提示即此含义）。
// ---------------------------------------------------------------------------

// KV 读取失败 / 配置损坏时不再静默当作「没有配置」：否则未设置环境变量 U 时每次请求都会随机生成新 UUID（登录与全部节点同时失效），
// 在此状态下保存还会用默认值覆盖掉真实配置。cfg._kvError 记录原因（unavailable：KV 读取出错；corrupt：存储内容不是合法 JSON），
// 调用方据此拒绝写入；节点与订阅在环境变量提供了有效 UUID 时继续按环境变量 + 默认值工作
async function loadConfig(env) {
  let kvCfg = null, kvError = '';
  if (env.K && typeof env.K.get === 'function') {
    try {
      const kvJson = await env.K.get('config', { cacheTtl: 30 });
      if (kvJson) {
        try { kvCfg = JSON.parse(kvJson); if (!kvCfg || typeof kvCfg !== 'object') throw new SyntaxError('not an object'); }
        catch (e) { kvCfg = null; kvError = 'corrupt'; }
      }
    } catch (e) { kvError = 'unavailable'; }
  }
  const cfg = buildConfig(env, kvCfg);
  if (kvError) cfg._kvError = kvError;
  return cfg;
}

// 由「默认值 < 环境变量 < KV 配置 < 锁定的环境变量」组装完整配置（纯函数：保存接口用刚写入的数据直接组装，
// 不经 KV 边缘缓存，避免保存后回读到旧配置）
function buildConfig(env, kvCfg) {
  const cfg = schemaDefaults();
  // 环境变量
  if (env.U) cfg.uuid = String(env.U).toLowerCase();
  if (env.HOST) cfg.host = String(env.HOST).replace(/^https?:\/\//, '').split('/')[0];
  if (env.PROXYIP) cfg.proxyIP = String(env.PROXYIP);
  if (env.S || env.OUTBOUND) cfg.outboundProxy = String(env.S || env.OUTBOUND);
  if (env.ECH === 'true' || env.ECH === '1') cfg.ech = true;
  if (env.TROJAN === 'true' || env.TROJAN === '1') cfg.enableTrojan = true;
  if (env.TROJAN_PASSWORD) cfg.trojanPassword = String(env.TROJAN_PASSWORD);
  if (env.ALPN) cfg.alpn = String(env.ALPN);
  // KV 图形化配置（更高优先级）：按字段表逐项合并，未登记的旧字段（如已移除的 fragment / src.customPref）自动忽略
  if (kvCfg && typeof kvCfg === 'object') {
    for (const d of CONFIG_SCHEMA) {
      const v = getPath(kvCfg, d.key);
      if (v !== undefined) setPath(cfg, d.key, cloneJSON(v));
    }
    // 旧版（cfgRev < 2）保存时「仅 TLS 端口」默认关闭且无法区分是否为用户选择：沿用新默认值（开启），
    // 用户在面板中关闭并保存后才生效
    if (!(kvCfg.cfgRev >= CONFIG_REV)) cfg.tlsOnly = schemaDefaults().tlsOnly;
  }
  // 环境变量锁定字段（ADMIN / D）优先于 KV：面板中这些项只读
  const locked = envLockedFields(env);
  for (const key of Object.keys(locked)) {
    const d = SCHEMA_BY_KEY.get(key);
    let v = String(env[locked[key]]);
    if (d.lower) v = v.toLowerCase();
    setPath(cfg, key, v);
  }
  // 兜底：KV 中的 UUID 为空或非法时回退环境变量 U（修复：保存了空 / 非法 UUID 后每次请求随机生成新 UUID，
  // 面板登录态与所有节点同时失效且无法再进入面板的问题），仍无效才随机生成
  cfg.uuid = String(cfg.uuid || '').toLowerCase();
  if (!isUUID(cfg.uuid) && env.U && isUUID(String(env.U))) cfg.uuid = String(env.U).toLowerCase();
  if (!isUUID(cfg.uuid)) cfg.uuid = uuidv4();
  // path 为空或为 "/" 时一律回退 UUID（兼容 KV 残留旧值，保证订阅 ws 路径与 Worker 面板路径统一为 /UUID）
  if (!cfg.path || cfg.path === '/') { cfg.path = cfg.uuid; cfg._pathAuto = true; }
  return cfg;
}

// 写入 KV：只保存字段表登记的配置项；由环境变量锁定的字段（管理密码、面板路径）不写入
// （避免明文密码落盘，也避免与环境变量不一致）。返回实际写入的对象；未绑定 KV 返回 null
async function saveConfig(env, cfg) {
  if (!env.K || typeof env.K.put !== 'function') return null;
  const stored = pickSchema(cfg);
  stored.cfgRev = CONFIG_REV;
  // 环境变量提供、且面板里没有被改动的值不写入 KV：否则一次保存就会把 PROXYIP / TROJAN_PASSWORD / ALPN 等
  // 环境变量快照进 KV（KV 优先级更高），之后再改环境变量会被静默忽略，Trojan 密码等也会明文落盘。
  // 面板中改成与环境变量不同的值才视为覆盖并保存
  const envBase = buildConfig(env, null), defaults = schemaDefaults();
  for (const d of CONFIG_SCHEMA) {
    const ev = getPath(envBase, d.key);
    if (JSON.stringify(ev) === JSON.stringify(getPath(defaults, d.key))) continue;   // 环境变量未提供该项
    if (JSON.stringify(getPath(stored, d.key)) !== JSON.stringify(ev)) continue;     // 面板中已改动：保存为覆盖值
    const ks = d.key.split('.');
    const parent = ks.length > 1 ? getPath(stored, ks.slice(0, -1).join('.')) : stored;
    if (parent) delete parent[ks[ks.length - 1]];
  }
  for (const key of Object.keys(envLockedFields(env))) {
    const ks = key.split('.');
    const parent = ks.length > 1 ? getPath(stored, ks.slice(0, -1).join('.')) : stored;
    if (parent) delete parent[ks[ks.length - 1]];
  }
  await env.K.put('config', JSON.stringify(stored));
  return stored;
}


