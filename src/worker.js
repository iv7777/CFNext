// ============================================================================
//  CFNext —— Cloudflare 代理管理面板 · 全新独立编写
//  ----------------------------------------------------------------------------
//  环境变量：
//    U            VLESS UUID（必填，同时用作面板访问路径，除非设置了 D）
//    D / PATH     自定义面板路径（可选）
//    ADMIN        面板管理密码（必填：未设置时面板与管理 API 一律禁用）
//    HOST         自定义 SNI/Host（可选，默认使用 Worker 域名）
//    PROXYIP      自定义反代/落地 IP（可选，填写后作为固定出口优先使用；留空则直连失败时由内置地区反代兜底，格式 host 或 host:port）
//    S / OUTBOUND 出站代理（可选，socks5:// / http:// / ss:// 或 host:port）
//    ECH          设为 true/1 开启 ECH 加密（可选）
//    TROJAN       设为 true/1 开启 Trojan 协议（可选）
//    TROJAN_PASSWORD  Trojan 密码（可选，留空则使用 UUID）
//    ALPN         自定义 ALPN 协商（可选）
//    YX           自定义优选 IP 列表（可选，格式 IP:port#名称，逗号分隔）
//    K            已绑定 KV 命名空间时读取图形化配置
// ============================================================================
import { connect } from 'cloudflare:sockets';

// @include worker/update.js
// @include worker/clash-template.js
// @include worker/constants.js
// @include worker/config-schema.js
// @include worker/utils.js
// @include worker/config.js
// @include worker/protocol.js
// @include worker/outbound-proxies.js
// @include worker/relay.js
// @include worker/proxy.js
// @include worker/ip-sources.js
// @include worker/nodes.js
// @include worker/formats.js
// @include worker/subscription.js
// @include worker/pages.js
// @include worker/router.js
