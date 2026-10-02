// ---------------------------------------------------------------------------
// WebSocket 代理（VLESS / Trojan）
// ---------------------------------------------------------------------------
// WS 0-RTT 早数据（节点 path 的 ?ed=2048 / sing-box max_early_data）：客户端把首个数据包 base64url 编码后
// 放进握手请求的 Sec-WebSocket-Protocol 头，服务端在握手阶段即可解析并抢先建立出站，省去约 1 个 RTT。
// 只接受能通过协议校验的数据（VLESS：版本 0 + 本机 UUID；Trojan：密码哈希 + CRLF），其它取值
// （如客户端声明的普通子协议名）一律返回 null，走原有流程，无副作用
function decodeEarlyData(header, cfg) {
  const raw = String(header || '').trim();
  if (!raw || raw.length > 8192 || !/^[A-Za-z0-9\-_+/=]+$/.test(raw)) return null;
  let bytes;
  try {
    const norm = raw.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(norm + '='.repeat((4 - norm.length % 4) % 4));
    bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  } catch (e) { return null; }
  if (!bytes.byteLength || bytes.byteLength > 6144) return null;
  if (bytes.byteLength >= 17 && bytes[0] === 0) {
    let want;
    try { want = uuidToBytes(cfg.uuid); } catch (e) { return null; }
    for (let i = 0; i < 16; i++) if (bytes[i + 1] !== want[i]) return null;
    return bytes;
  }
  return detectTrojan(bytes, cfg) ? bytes : null;
}

// WebSocket 关闭原因上限 123 字节（UTF-8）：按字节截断且不拆开多字节字符，
// 否则含中文的长错误信息会让 close() 抛异常，连接因此不会被关闭
function closeReason(msg) {
  let out = '', bytes = 0;
  for (const ch of String(msg)) {
    const n = TE.encode(ch).length;
    if (bytes + n > 120) break;
    out += ch; bytes += n;
  }
  return out;
}

async function handleWebSocketProxy(request, cfg) {
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  try { server.accept({ allowHalfOpen: true }); } catch (e) { server.accept(); }
  // 关键：必须声明二进制类型，否则 CF 将二进制帧按 UTF-8 解码成 string，VLESS/Trojan 头（含 16 字节原始 UUID）会被损坏导致隧道失败
  server.binaryType = 'arraybuffer';
  let socket = null, writer = null, headerSent = false, pending = null, protoWait = null, respSent = false;

  const send = (data) => { try { server.send(data); } catch (e) { /* 忽略 */ } };
  const fail = (err) => { try { server.close(1011, closeReason(err && err.message || err)); } catch (e) { /* 忽略 */ } };

  // 首包处理：WS 数据帧与 0-RTT 早数据共用。headerSent 在任何 await 之前置位，
  // 解析期间到达的后续帧走下方「暂存 / 直写」分支，不会重复解析
  const handleFirstChunk = async (chunk, forced) => {
    // 累积缓冲：WS 消息可能分片到达，不足头部长度时等待后续数据
    if (chunk && chunk.byteLength) pending = pending ? concatBytes(pending, chunk) : chunk;
    if (!pending || headerSent) return;
    // 握手头正常仅数十字节；持续收到不完整分片（异常 / 恶意）时限制缓冲，防内存膨胀
    if (pending.byteLength > 65536) throw new Error('握手头超过 64KB');
    let parsed, isVless;
    try {
      // Trojan 判定：客户端发送 SHA224(密码) 的 56 字节 hex + CRLF；密码与节点生成同源（留空用 UUID）
      const isTrojan = detectTrojan(pending, cfg);
      // 分帧等待：部分客户端（mihomo 等）将 Trojan 头分帧发送（首帧可能仅 56 字节 SHA224 hex）。
      // 此时 pending[0] 为 hex 字符（非 0）且不足 58 字节，不能按 VLESS 解析（会报版本错误而关闭连接），应等待后续分片
      if (!isTrojan && pending[0] !== 0 && pending.byteLength < 58) return;
      isVless = !isTrojan;
      // 面板关闭 VLESS 后服务端也不再接受 VLESS 连接（XHTTP 走独立入口，由 enableXhttp 控制）
      if (isVless && cfg.enableVless === false) throw new Error('VLESS 协议未启用');
      parsed = isTrojan ? parseTrojanHeader(pending) : parseVlessHeader(pending, cfg);
    } catch (err) {
      if (/头部过短/.test(err.message || '')) return;   // 等下一个分片
      throw err;
    }
    // 仅支持 TCP（VLESS 0x01 / Trojan 0x01）与 VLESS UDP-DNS（0x02）；Trojan UDP ASSOCIATE、VLESS MUX 等
    // 此前会被当成 TCP 连接目标地址，现在明确拒绝，客户端据此回退
    if (isVless ? (parsed.command !== 1 && parsed.command !== 2) : parsed.command !== 1) {
      throw new Error('不支持的命令 ' + parsed.command);
    }
    // 头部解析成功立即回 VLESS 响应头（version=0 + addonsLen=0），早于首包判定与出站建连：
    // 部分客户端（mihomo 等）收到这 2 字节才发送首个数据包，晚发会与服务端互相等待
    if (!respSent && isVless && parsed.command !== 2) { respSent = true; send(new Uint8Array([0, 0])); }
    // 首包判定出站方式（非 TLS 不走 SNI 型反代，见 sniffPayloadKind）；头部完整但暂无数据时短暂等待首包，
    // 超时（SNIFF_WAIT_MS）仍无数据按 unknown 放行，不让连接悬挂
    const payload = pending.byteLength > parsed.headerLength ? pending.subarray(parsed.headerLength) : null;
    const payloadKind = sniffPayloadKind(payload);
    if (payloadKind === 'unknown' && !forced) {
      if (!protoWait) protoWait = setTimeout(() => { protoWait = null; handleFirstChunk(null, true).catch(fail); }, SNIFF_WAIT_MS);
      return;
    }
    if (protoWait) { clearTimeout(protoWait); protoWait = null; }
    headerSent = true;
    // UDP 请求（command=0x02）：CF Workers 无 UDP socket 无法原生转发数据报，
    // DNS(53) 查询 → DoH(HTTPS) 转换后回标准 DNS 响应（修复 V2rayNG 关闭「本地 DNS」时远端 DNS 不可用）；
    // 其余 UDP 快速失败关闭连接（客户端自动回退），TCP（VLESS/Trojan WS/XHTTP）路径零影响
    if (parsed.command === 2) {
      try {
        if (parsed.port === 53 && payload && payload.byteLength >= 12) {
          const resp = await dnsToDoH(payload);
          if (resp) send(resp);
        }
      } catch (e) { /* UDP 处理失败不响应，客户端按超时/回退处理 */ }
      try { server.close(1000); } catch (e) { /* 忽略 */ }
      return;
    }
    const conn = await openOutbound(parsed, cfg, request.cf && request.cf.colo, payloadKind);
    socket = conn;
    writer = conn.writable.getWriter();
    // 透明代理：去掉 VLESS/Trojan 头部，发送原始 TLS 数据，由对端按 SNI 路由
    // 补发 SOCKS5/HTTP 代理握手残留字节（目标端早期数据），避免 TLS 握手中途被截断
    if (conn._preamble && conn._preamble.byteLength > 0) send(conn._preamble);
    if (pending && pending.byteLength > parsed.headerLength) await writer.write(pending.subarray(parsed.headerLength));
    pending = null;   // 出站就绪后清空缓冲，后续消息直接写出站
    pumpToReader(conn.readable.getReader(), send, () => { try { server.close(1000); } catch (e) { /* 忽略 */ } });
  };

  // WS 0-RTT：先处理握手头中预发的首包，再处理数据帧；校验不通过时 earlyBytes 为 null，走原流程
  const earlyBytes = decodeEarlyData(request.headers.get('sec-websocket-protocol'), cfg);
  if (earlyBytes) handleFirstChunk(earlyBytes).catch(fail);

  server.addEventListener('message', async (ev) => {
    try {
      const chunk = typeof ev.data === 'string' ? TE.encode(ev.data) : new Uint8Array(ev.data);
      if (!headerSent) await handleFirstChunk(chunk);
      // 出站未就绪时暂存，避免头部之后的早期数据帧被丢弃（否则 TLS 握手不完整 → 连接通但流量为 0）
      else if (writer) await writer.write(chunk);
      else pending = pending ? concatBytes(pending, chunk) : chunk;
    } catch (err) { fail(err); }
  });
  const cleanup = () => {
    if (protoWait) { clearTimeout(protoWait); protoWait = null; }
    if (socket) { try { socket.close(); } catch (e) { /* 忽略 */ } socket = null; }
  };
  server.addEventListener('close', cleanup);
  server.addEventListener('error', cleanup);
  return new Response(null, { status: 101, webSocket: client });
}

// xhttp 代理（stream-one 模式：请求体即 VLESS 流）
async function handleXhttpProxy(request, cfg) {
  const bodyReader = request.body.getReader();
  // 首个数据块可能短于 VLESS 头部（分块到达）：累积到能完整解析为止（上限 64KB，与 WS 路径一致）
  let buf = new Uint8Array(0), parsed = null;
  while (!parsed) {
    const chunk = await bodyReader.read();
    if (chunk.done) return new Response('empty', { status: 400 });
    buf = buf.byteLength ? concatBytes(buf, chunk.value) : chunk.value;
    try { parsed = parseVlessHeader(buf, cfg); }
    catch (err) {
      if (!/头部过短/.test(err.message || '')) throw err;
      if (buf.byteLength > 65536) throw new Error('握手头超过 64KB');
    }
  }
  if (parsed.command !== 1) throw new Error('XHTTP 仅支持 TCP 命令');
  const firstPayload = buf.subarray(parsed.headerLength);
  const conn = await openOutbound(parsed, cfg, request.cf && request.cf.colo, sniffPayloadKind(firstPayload));
  const writer = conn.writable.getWriter();
  if (firstPayload.byteLength) await writer.write(firstPayload);

  (async () => {
    try {
      while (true) {
        const { done, value } = await bodyReader.read();
        if (done) break;
        await writer.write(value);
      }
    } catch (e) { /* 忽略 */ }
    try { await writer.close(); } catch (e) { /* 忽略 */ }
  })();

  // 下行用 pull 驱动：只有客户端读走数据后才继续从目标连接读取（背压）。
  // 此前在 start() 里无限循环 enqueue，客户端读得慢（或不读）时数据全部堆在内存里，下载大文件会撑爆 Worker 的 128MB 内存
  const connReader = conn.readable.getReader();
  const respStream = new ReadableStream({
    start(controller) {
      // 须先回 2 字节 VLESS 响应头（version=0 + addonsLen=0），否则 xhttp 客户端握手失败（真连接报 unexpected response version）
      controller.enqueue(new Uint8Array([0, 0]));
      // 补发 SOCKS5/HTTP 代理握手残留字节（目标端早期数据），避免 TLS 握手中途被截断
      if (conn._preamble && conn._preamble.byteLength > 0) controller.enqueue(conn._preamble);
    },
    async pull(controller) {
      try {
        const { done, value } = await connReader.read();
        if (!done) { controller.enqueue(value); return; }
      } catch (e) { /* 目标连接异常中断：按结束处理 */ }
      try { controller.close(); } catch (e) { /* 忽略 */ }
      try { conn.close(); } catch (e) { /* 忽略 */ }
    },
    cancel() {
      // 客户端断开：释放目标连接，并停止读取上行请求体
      try { connReader.cancel(); } catch (e) { /* 忽略 */ }
      try { conn.close(); } catch (e) { /* 忽略 */ }
      try { bodyReader.cancel(); } catch (e) { /* 忽略 */ }
    }
  }, { highWaterMark: 256 * 1024, size: (chunk) => chunk.byteLength });
  return new Response(respStream, { status: 200, headers: { 'content-type': 'application/octet-stream', 'x-accel-buffering': 'no', 'cache-control': 'no-store' } });
}

