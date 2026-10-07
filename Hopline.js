/*!Hopline v2.3.0*/
import{connect as e}from"cloudflare:sockets";const t="2.3.0";let n=null;function r(e){const t=String(e||"").match(/(\d+)\.(\d+)\.(\d+)/);return t?[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10)]:null}function o(e,t){const n=r(e),o=r(t);if(!n||!o)return 0;for(let e=0;e<3;e++)if(n[e]!==o[e])return n[e]<o[e]?-1:1;return 0}function a(e){const t=e.match(/Hopline v(\d+\.\d+\.\d+)/);if(t)return t[1];const n=e.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);return n?n[1]:null}const i=["2400:cb00::/32","2606:4700::/32","2803:f800::/32","2405:b500::/32","2405:8100::/32","2a06:98c0::/29","2c0f:f248::/32"];function s(e){if(!j(e=String(e||"")))return!1;if(e.indexOf(":")>=0)return i.some(t=>function(e,t){const[n,r]=t.split("/"),o=parseInt(r,10),a=e=>{const t=e.indexOf("::");let n;if(t>=0){const r=e.slice(0,t).split(":").filter(Boolean),o=e.slice(t+2).split(":").filter(Boolean),a=8-r.length-o.length;n=[...r,...Array(a).fill("0"),...o]}else n=e.split(":");return n.map(e=>e.padStart(4,"0"))},i=e=>e.map(e=>parseInt(e,16).toString(2).padStart(16,"0")).join("");return i(a(e)).slice(0,o)===i(a(n)).slice(0,o)}(e,t));const t=e.split(".").map(Number),n=(t[0]<<24|t[1]<<16|t[2]<<8|t[3])>>>0;return z.some(([e,t])=>n>=e&&n<=t)}const l={HK:"香港",TW:"台湾",MO:"澳门",JP:"日本",SG:"新加坡",US:"美国",KR:"韩国",DE:"德国",FR:"法国",GB:"英国",CA:"加拿大",AU:"澳大利亚",SE:"瑞典",NL:"荷兰",FI:"芬兰",NO:"挪威",DK:"丹麦",CH:"瑞士",IT:"意大利",ES:"西班牙",PT:"葡萄牙",IE:"爱尔兰",BE:"比利时",AT:"奥地利",PL:"波兰",CZ:"捷克",RO:"罗马尼亚",HU:"匈牙利",GR:"希腊",RU:"俄罗斯",TR:"土耳其",UA:"乌克兰",IN:"印度",TH:"泰国",MY:"马来西亚",VN:"越南",PH:"菲律宾",ID:"印尼",BR:"巴西",MX:"墨西哥",AR:"阿根廷",CL:"智利",ZA:"南非",EG:"埃及",AE:"阿联酋",IL:"以色列",NZ:"新西兰",KZ:"哈萨克斯坦",SA:"沙特"},c={HK:"proxyip.hk.cmliussss.net",US:"proxyip.us.cmliussss.net",SG:"proxyip.sg.cmliussss.net",JP:"proxyip.jp.cmliussss.net",KR:"proxyip.kr.cmliussss.net",DE:"proxyip.de.cmliussss.net",SE:"proxyip.se.cmliussss.net",NL:"proxyip.nl.cmliussss.net",FI:"proxyip.fi.cmliussss.net",GB:"proxyip.gb.cmliussss.net",Oracle:"proxyip.oracle.cmliussss.net",DigitalOcean:"proxyip.digitalocean.cmliussss.net",Vultr:"proxyip.vultr.cmliussss.net",Multacom:"proxyip.multacom.cmliussss.net"},d={uuid:["UUID","U"],path:["PATH","D"],admin:["ADMIN","admin"],adminUser:["ADMIN_USER"],outbound:["OUTBOUND_PROXY","OUTBOUND","S"],ech:["ENABLE_ECH","ECH"],trojan:["ENABLE_TROJAN","TROJAN"],kv:["CONFIG_KV","K"]};function p(e,t){for(const n of d[t])if(e&&null!=e[n]&&""!==String(e[n]))return e[n]}function u(e){for(const t of d.kv)if(e&&e[t]&&"object"==typeof e[t])return e[t];return null}const f="^[A-Za-z0-9._~-]+$",h="^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*$",m=["login","version"],g=[{key:"uuid",type:"string",def:"",el:"a-uuid",label:"UUID",required:!0,lower:!0,pattern:"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",hint:"UUID 格式不正确（应为 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx，可点「生成」）"},{key:"path",type:"string",def:"",el:"a-path",label:"面板路径",maxLen:128,strip:["^/+","/+$"],pattern:f,hint:"只能包含字母、数字及 . _ ~ -（不含 /）",reserved:m,envLock:d.path},{key:"subUrl",type:"string",def:"",el:"a-suburl",label:"自定义订阅路径",maxLen:128,strip:["^/+","/+$","/sub$","/+$"],pattern:f,hint:"只填一段别名，如 AAZ（字母、数字及 . _ ~ -）",reserved:m},{key:"adminUser",type:"string",def:"admin",el:"a-adminuser",label:"管理用户名",maxLen:64,fillDefault:!0,pattern:"^[^\\s\\x00-\\x1f\\x7f]+$",hint:"不能包含空格或控制字符",envLock:d.adminUser},{key:"admin",type:"secret",def:"",el:"a-admin",label:"管理密码",trim:!1,maxLen:256,envLock:d.admin,check:"adminPass"},{key:"host",type:"string",def:"",el:"a-host",label:"绑定域名",maxLen:253,strip:["^https?://","[/?#].*$"],pattern:h,hint:"请填写域名，如 node.example.com"},{key:"enableVless",type:"bool",def:!0,el:"en-vless",label:"VLESS 协议"},{key:"enableTrojan",type:"bool",def:!1,el:"en-trojan",label:"Trojan 协议"},{key:"trojanPassword",type:"string",def:"",el:"tp-pass",label:"Trojan 密码",trim:!1,maxLen:256,noExport:!0},{key:"enableXhttp",type:"bool",def:!0,el:"en-xhttp",label:"XHTTP 协议"},{key:"alpn",type:"string",def:"",el:"alpn",label:"ALPN",maxLen:64,pattern:"^[A-Za-z0-9./-]+(\\s*,\\s*[A-Za-z0-9./-]+)*$",hint:"以逗号分隔，如 h2,http/1.1"},{key:"ech",type:"bool",def:!1,el:"ech-on",label:"ECH"},{key:"echHost",type:"string",def:"cloudflare-ech.com",el:"ech-host",label:"ECH 域名",fillDefault:!0,maxLen:253,strip:["^https?://","[/?#].*$"],pattern:h,hint:"请填写域名，如 cloudflare-ech.com"},{key:"echDns",type:"string",def:"",el:"ech-dns",label:"ECH DNS",maxLen:512,pattern:"^https://\\S+$",hint:"须为 https:// 开头的 DoH 地址"},{key:"tlsOnly",type:"bool",def:!0,el:"tls-only",label:"仅 TLS 端口"},{key:"proxyIP",type:"string",def:"",el:"s-proxyIP",label:"反代 / 落地 IP",maxLen:256,pattern:"^[^\\s/]+$",hint:"格式为 host 或 host:port",check:"hostPort"},{key:"outboundProxy",type:"string",def:"",el:"s-outbound",label:"出站代理",maxLen:1024,pattern:"^\\S+$",hint:"出站代理不能包含空格",check:"proxy"},{key:"outboundMode",type:"enum",def:"",el:"s-outmode",label:"出站方式",options:["","no","only"]},{key:"prefDomains",type:"text",def:"",el:"o-prefdomains",label:"优选域名",maxLen:4096,check:"domainList"},{key:"relay.mode",type:"enum",def:"builtin",el:"rl-mode",label:"地区反代模式",options:["builtin","custom","off"]},{key:"relay.region",type:"enum",def:"",el:"rl-region",label:"首选反代地区",options:["",...Object.keys(c)]},{key:"relay.region2",type:"enum",def:"",el:"rl-region2",label:"次选反代地区",options:["","none",...Object.keys(c)]},{key:"relay.custom",type:"text",def:"",el:"rl-custom",label:"自定义反代列表",maxLen:1024,check:"relayList"},{key:"filter.region",type:"list",def:["all"],label:"节点地区",options:["all","HK","TW","US","SG","JP","KR","DE"],exclusive:"all",emptyValue:["all"],els:{all:"fl-region-all",HK:"fl-region-HK",TW:"fl-region-TW",US:"fl-region-US",SG:"fl-region-SG",JP:"fl-region-JP",KR:"fl-region-KR",DE:"fl-region-DE"}},{key:"filter.ipType",type:"list",def:["IPv4"],label:"IP 类型",options:["IPv4","IPv6"],els:{IPv4:"fl-ip4",IPv6:"fl-ip6"}},{key:"filter.isp",type:"list",def:["移动","联通","电信"],label:"运营商偏好",options:["移动","联通","电信"],els:{"移动":"fl-isp-m","联通":"fl-isp-c","电信":"fl-isp-t"}},{key:"src.native",type:"bool",def:!1,el:"fl-native",label:"原生地址"},{key:"src.prefDomain",type:"bool",def:!0,el:"fl-pref-domain",label:"优选域名"},{key:"src.prefIp",type:"bool",def:!0,el:"fl-pref-ip",label:"优选 IP"},{key:"ipsrc.hostmonit",type:"bool",def:!0,el:"ps-hostmonit",label:"HostMonit 实时优选"},{key:"ipsrc.uouin",type:"bool",def:!0,el:"ps-uouin",label:"uouin 分线路优选"},{key:"ipsrc.wetest",type:"bool",def:!1,el:"ps-wetest",label:"微测网优选"},{key:"ipsrc.api1",type:"bool",def:!1,el:"ps-api1-on",label:"自定义优选 API 1"},{key:"ipsrc.api1Url",type:"string",def:"",el:"ps-api1-url",label:"自定义优选 API 1 地址",maxLen:1024,pattern:"^(https?|sub)://\\S+$",hint:"须为 http(s):// 或 sub:// 开头的地址"},{key:"ipsrc.api2",type:"bool",def:!1,el:"ps-api2-on",label:"自定义优选 API 2"},{key:"ipsrc.api2Url",type:"string",def:"",el:"ps-api2-url",label:"自定义优选 API 2 地址",maxLen:1024,pattern:"^(https?|sub)://\\S+$",hint:"须为 http(s):// 或 sub:// 开头的地址"}];function b(e,t){var n,r=e.type;if("bool"===r)return!0===t||"true"===t||"1"===t||1===t?{value:!0}:!1===t||"false"===t||"0"===t||0===t?{value:!1}:{error:"必须为开或关"};if("int"===r){var o="number"==typeof t?t:/^\s*-?\d+\s*$/.test(String(null==t?"":t))?parseInt(t,10):NaN;return isFinite(o)&&Math.floor(o)===o?null!=e.min&&o<e.min||null!=e.max&&o>e.max?{error:"取值范围为 "+e.min+" - "+e.max}:{value:o}:{error:"必须为整数"}}if("enum"===r)return t=null==t?"":String(t),e.options.indexOf(t)<0?{error:"不支持的选项："+t}:{value:t};if("list"===r){Array.isArray(t)||(t=null==t||""===t?[]:[String(t)]);var a=[];for(n=0;n<t.length;n++){var i=String(t[n]);if(e.options.indexOf(i)<0)return{error:"不支持的选项："+i};a.indexOf(i)<0&&a.push(i)}return e.exclusive&&a.indexOf(e.exclusive)>=0&&(a=[e.exclusive]),!a.length&&e.emptyValue&&(a=e.emptyValue.slice()),{value:a}}if("string"===r||"secret"===r||"text"===r){if(null==t&&(t=""),"string"!=typeof t&&"number"!=typeof t)return{error:"格式不正确"};if(t=String(t),!1!==e.trim&&(t=t.trim()),e.strip)for(n=0;n<e.strip.length;n++)t=t.replace(new RegExp(e.strip[n],"i"),"");return e.lower&&(t=t.toLowerCase()),t?e.maxLen&&t.length>e.maxLen?{error:"长度不能超过 "+e.maxLen}:e.pattern&&!new RegExp(e.pattern).test(t)?{error:e.hint||"格式不正确"}:e.reserved&&e.reserved.indexOf(t.toLowerCase())>=0?{error:"「"+t+"」为保留路径，请换一个"}:{value:t}:e.required?{error:"不能为空"}:{value:e.fillDefault?e.def:""}}return{value:t}}const v=["aes-128-gcm","aes-256-gcm","chacha20-ietf-poly1305"],y=/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/,x={domainList(e){const t=new Set,n=[];for(const r of String(e||"").split(/[\n,;\s]+/).filter(Boolean)){const e=r.toLowerCase();if(!y.test(e)||/^[0-9]+$/.test(e.slice(e.lastIndexOf(".")+1)))return"「"+r.slice(0,60)+"」不是有效的域名：只填主机名（如 cf.example.com），不含 http://、端口、路径或通配符，IP 地址不能作为优选域名";t.has(e)||(t.add(e),n.push(e))}return n.length>30?"最多 30 个域名（当前 "+n.length+" 个）":{value:n.join("\n")}},relayList(e){const t=new Set,n=[];for(const r of String(e||"").split(/[\n,;]+/).map(e=>e.trim()).filter(Boolean)){const{host:e,port:o}=M(r,443),a=e.toLowerCase();if(!a||!j(a)&&!new RegExp(h).test(a))return"「"+r.slice(0,60)+"」不是有效的反代地址（格式 host 或 host:port，IPv6 需加方括号）";if(!(o>=1&&o<=65535))return"「"+r.slice(0,60)+"」的端口须为 1 - 65535";const i=(a.indexOf(":")>=0?"["+a+"]":a)+(443===o?"":":"+o);t.has(i)||(t.add(i),n.push(i))}return n.length>3?"最多 3 个自定义反代（当前 "+n.length+" 个）":{value:n.join("\n")}},adminPass(e){if(e&&String(e).startsWith("hopline-pbkdf2$"))return"密码不能以 hopline-pbkdf2$ 开头"},hostPort(e){if(!e)return;const{host:t,port:n}=M(e,443);return t?n>=1&&n<=65535?void 0:"端口须为 1 - 65535":"缺少主机名"},proxy(e){if(!e)return;const t=B(e);if(!t||!t.host)return"无法解析出站代理地址（格式如 socks5://user:pass@1.2.3.4:1080）";if(!(t.port>=1&&t.port<=65535))return"出站代理端口须为 1 - 65535";if("ss"===t.type){if(!le(t.method))return"SS 加密方式仅支持 "+v.join(" / ");if(!t.password)return"SS 缺少密码"}}},w=new Map(g.map(e=>[e.key,e]));function k(e,t){let n=e;for(const e of t.split(".")){if(null==n||"object"!=typeof n)return;n=n[e]}return n}function S(e,t,n){const r=t.split(".");let o=e;for(let e=0;e<r.length-1;e++)null!=o[r[e]]&&"object"==typeof o[r[e]]||(o[r[e]]={}),o=o[r[e]];o[r[r.length-1]]=n}const C=e=>void 0===e?void 0:JSON.parse(JSON.stringify(e));function E(){const e={};for(const t of g)S(e,t.key,C(t.def));return e}function T(e){const t={};for(const n of g){const r=k(e,n.key);void 0!==r&&S(t,n.key,C(r))}return t}function P(e){const t={};for(const n of g){if(!n.envLock)continue;const r=n.envLock.find(t=>e&&null!=e[t]&&""!==String(e[t]));r&&(t[n.key]=r)}return t}const A=["cloudflare.com","www.cloudflare.com","speed.cloudflare.com"],I=["cloudflare.182682.xyz","cdn.2020111.xyz","cf.0sm.com","cf.090227.xyz","cfip.1323123.xyz","cnamefuckxxs.yuchen.icu","cloudflare-ip.mofashi.ltd","cdn.tzpro.xyz","cf.877771.xyz","xn--b6gac.eu.org","bestcf.030101.xyz","cdns.doon.eu.org","fn.130519.xyz","saas.sin.fan"].join("\n"),U=new Set([80,8080,8880,2052,2082,2086,2095]),L=new TextEncoder,O=new TextDecoder,$=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],D=[3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745];function R(e,t){return(e<<t|e>>>32-t)>>>0}function N(e){const t=8*e.length,n=1+(e.length+8>>6)<<6,r=new Uint8Array(n);r.set(e),r[e.length]=128;const o=new DataView(r.buffer);o.setUint32(n-8,t>>>0,!0),o.setUint32(n-4,Math.floor(t/4294967296),!0);let a=1732584193,i=4023233417,s=2562383102,l=271733878;for(let e=0;e<n;e+=64){const t=new Uint32Array(16);for(let n=0;n<16;n++)t[n]=o.getUint32(e+4*n,!0);let n=a,r=i,c=s,d=l;for(let e=0;e<64;e++){let o,a;e<16?(o=r&c|~r&d,a=e):e<32?(o=d&r|~d&c,a=(5*e+1)%16):e<48?(o=r^c^d,a=(3*e+5)%16):(o=c^(r|~d),a=7*e%16);const i=n+o+D[e]+t[a]>>>0;n=d,d=c,c=r,r=r+R(i,$[e])>>>0}a=a+n>>>0,i=i+r>>>0,s=s+c>>>0,l=l+d>>>0}const c=new Uint8Array(16),d=new DataView(c.buffer);return[a,i,s,l].forEach((e,t)=>d.setUint32(4*t,e,!0)),c}function H(e){return Array.from(N(L.encode(String(e)))).map(e=>e.toString(16).padStart(2,"0")).join("")}function _(e){return/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(e||"")}function M(e,t=443){if(!(e=String(e||"").trim()))return{host:"",port:t};if(e.startsWith("[")){const n=e.match(/^\[([^\]]+)\](?::(\d+))?$/);return{host:n?n[1]:e.replace(/^\[|\]$/g,""),port:n&&n[2]?parseInt(n[2]):t}}const n=e.lastIndexOf(":");return n>0&&/^\d+$/.test(e.slice(n+1))?{host:e.slice(0,n),port:parseInt(e.slice(n+1))}:{host:e,port:t}}function j(e){if(!(e=String(e||"").trim()))return!1;const t=e.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(t)return t.slice(1).every(e=>Number(e)<=255);if(!/^[0-9a-fA-F:]+$/.test(e))return!1;if((e.match(/::/g)||[]).length>1)return!1;const n=e.includes("::"),r=e.replace(/::/g,":").split(":").filter(Boolean);return!(!n&&8!==r.length)&&(!n||!(r.length<1||r.length>7))&&r.every(e=>/^[0-9a-fA-F]{1,4}$/.test(e))}function F(e){const t=[];for(let n=0;n<16;n+=2)t.push((e[n]<<8|e[n+1]).toString(16));let n=-1,r=0,o=-1,a=0;for(let e=0;e<8;e++)"0"===t[e]?(o<0?(o=e,a=1):a++,a>r&&(r=a,n=o)):(o=-1,a=0);if(r>=2){const e=t.slice(0,n).join(":");return(e?e+"::":"::")+t.slice(n+r).join(":")}return t.join(":")}const z=["173.245.48.0/20","103.21.244.0/22","103.22.200.0/22","103.31.4.0/22","141.101.64.0/18","108.162.192.0/18","190.93.240.0/20","188.114.96.0/20","197.234.240.0/22","198.41.128.0/17","162.158.0.0/15","104.16.0.0/13","104.24.0.0/14","172.64.0.0/13","131.0.72.0/22"].map(function(e){const[t,n]=e.split("/"),r=t.split(".").map(Number),o=(r[0]<<24|r[1]<<16|r[2]<<8|r[3])>>>0,a=n>=32?0:4294967295<<32-n>>>0;return[(o&a)>>>0,(o|~a>>>0)>>>0]});function B(e){if(!e)return null;let t="socks5",n=String(e).trim();const r=n.match(/^(socks5|http|https|ss):\/\/(.+)$/i);if(r&&(t=r[1].toLowerCase(),n=r[2]),"ss"===t)return function(e){let t=e,n="";const r=e.indexOf("#");r>=0&&(t=e.slice(0,r));const o=t.lastIndexOf("@");if(o>=0)n=t.slice(0,o),t=t.slice(o+1);else{const e=K(t);if(e&&e.includes("@")){const r=e.lastIndexOf("@");n=e.slice(0,r),t=e.slice(r+1)}}let a="",i="";if(n){let e=K(n)||n;try{e=decodeURIComponent(e)}catch(e){}const t=e.indexOf(":");t>0?(a=e.slice(0,t),i=e.slice(t+1)):a=e}const{host:s,port:l}=M(t,8388);return{type:"ss",host:s,port:l,method:a,password:i}}(n);let o="",a="";if(n.includes("@")){const e=n.lastIndexOf("@"),t=n.slice(0,e),r=n.slice(e+1),i=e=>{try{return decodeURIComponent(e)}catch(t){return e}},s=t.indexOf(":");s>=0?(o=i(t.slice(0,s)),a=i(t.slice(s+1))):o=i(t),n=r}const i="http"===t?80:"https"===t?443:1080,{host:s,port:l}=M(n,i);return{type:t,host:s,port:l,user:o,pass:a}}function K(e){try{const t=atob(String(e).replace(/-/g,"+").replace(/_/g,"/")),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return new TextDecoder("utf-8").decode(n)}catch(e){return null}}function W(e,t,n){return new Response(JSON.stringify(e),{status:t||200,headers:Object.assign({"Content-Type":"application/json; charset=utf-8"},n||{})})}function V(e){const t=String(p(e,"uuid")||"").toLowerCase();return _(t)?t:""}const G=new WeakMap;function q(e,t){const n=E(),r=e=>!0===e||"true"===e||"1"===e||1===e;if(p(e,"uuid")&&(n.uuid=String(p(e,"uuid")).toLowerCase()),e.HOST&&(n.host=String(e.HOST).replace(/^https?:\/\//,"").split("/")[0]),e.PROXYIP&&(n.proxyIP=String(e.PROXYIP)),p(e,"outbound")&&(n.outboundProxy=String(p(e,"outbound"))),r(p(e,"ech"))&&(n.ech=!0),r(p(e,"trojan"))&&(n.enableTrojan=!0),e.TROJAN_PASSWORD&&(n.trojanPassword=String(e.TROJAN_PASSWORD)),e.ALPN&&(n.alpn=String(e.ALPN)),t&&"object"==typeof t)for(const e of g){const r=k(t,e.key);void 0!==r&&S(n,e.key,C(r))}const o=P(e);for(const t of Object.keys(o)){const r=w.get(t);let a=String(e[o[t]]);r.lower&&(a=a.toLowerCase()),S(n,t,a)}n.uuid=String(n.uuid||"").toLowerCase(),_(n.uuid)||(n.uuid=V(e));const a=function(e){const t=String(null==e?"":e).trim().replace(/^\/+/,"").replace(/\/+$/,"");return t?!new RegExp(f).test(t)||t.length>128?{value:"",error:"只能包含字母、数字及 . _ ~ -（不含 /），最长 128 位"}:m.indexOf(t.toLowerCase())>=0?{value:"",error:"「"+t+"」为保留路径，请换一个"}:{value:t,error:""}:{value:"",error:""}}(o.path?e[o.path]:"");return n.path=a.value,a.error&&(n._pathError=a.error),n}let J={s:null,b:null};function X(e){const t=String(e||"");if(J.s===t)return J.b;const n=t.replace(/-/g,"").toLowerCase();if(!/^[0-9a-f]{32}$/.test(n))throw new Error("服务端 UUID 配置无效");const r=new Uint8Array(16);for(let e=0;e<16;e++)r[e]=parseInt(n.substr(2*e,2),16);return J={s:t,b:r},r}function Q(e,t){if(!e||e.byteLength<1)throw new Error("VLESS 头部过短");const n=new DataView(e.buffer,e.byteOffset,e.byteLength);let r=0;if(0!==n.getUint8(0))throw new Error("不支持的 VLESS 版本");if(e.byteLength<17)throw new Error("VLESS 头部过短");const o=X(t&&t.uuid);let a=0;for(let e=0;e<16;e++)a|=n.getUint8(1+e)^o[e];if(0!==a)throw new Error("UUID 不匹配");if(r+=17,r>=e.byteLength)throw new Error("VLESS 头部过短");const i=n.getUint8(r);if(r+=1,r+=i,r+4>e.byteLength)throw new Error("VLESS 头部过短");const s=n.getUint8(r);r+=1;const l=n.getUint16(r);r+=2;const c=n.getUint8(r);r+=1;const{addr:d,len:p}=function(e,t,n,r){const o=t=>{if(n+t>e.byteLength)throw new Error("VLESS 头部过短")};if(1===r)return o(4),{addr:`${t.getUint8(n)}.${t.getUint8(n+1)}.${t.getUint8(n+2)}.${t.getUint8(n+3)}`,len:4};if(2===r){o(1);const r=t.getUint8(n);o(1+r);const a=e.subarray(n+1,n+1+r);return{addr:O.decode(a),len:1+r}}if(3===r)return o(16),{addr:F(e.subarray(n,n+16)),len:16};throw new Error("无法识别的地址类型")}(e,n,r,c);return r+=p,{command:s,port:l,addr:d,headerLength:r,earlyData:e.subarray(r)}}const Y=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Z(e){const t=L.encode(String(e)),n=8*t.length,r=1+(t.length+8>>6)<<6,o=new Uint8Array(r);o.set(t),o[t.length]=128;const a=new DataView(o.buffer);a.setUint32(r-8,Math.floor(n/4294967296),!1),a.setUint32(r-4,n>>>0,!1);let i=3238371032,s=914150663,l=812702999,c=4144912697,d=4290775857,p=1750603025,u=1694076839,f=3204075428;const h=(e,t)=>e>>>t|e<<32-t;for(let e=0;e<r;e+=64){const t=new Uint32Array(64);for(let n=0;n<16;n++)t[n]=a.getUint32(e+4*n,!1);for(let e=16;e<64;e++){const n=h(t[e-15],7)^h(t[e-15],18)^t[e-15]>>>3,r=h(t[e-2],17)^h(t[e-2],19)^t[e-2]>>>10;t[e]=t[e-16]+n+t[e-7]+r>>>0}let n=i,r=s,o=l,m=c,g=d,b=p,v=u,y=f;for(let e=0;e<64;e++){const a=y+(h(g,6)^h(g,11)^h(g,25))+(g&b^~g&v)+Y[e]+t[e]>>>0,i=n&r^n&o^r&o;y=v,v=b,b=g,g=m+a>>>0,m=o,o=r,r=n,n=a+((h(n,2)^h(n,13)^h(n,22))+i>>>0)>>>0}i=i+n>>>0,s=s+r>>>0,l=l+o>>>0,c=c+m>>>0,d=d+g>>>0,p=p+b>>>0,u=u+v>>>0,f=f+y>>>0}let m="";for(const e of[i,s,l,c,d,p,u])m+=(e>>>24&255).toString(16).padStart(2,"0"),m+=(e>>>16&255).toString(16).padStart(2,"0"),m+=(e>>>8&255).toString(16).padStart(2,"0"),m+=(255&e).toString(16).padStart(2,"0");return m}let ee="",te="";function ne(e,t){if(!t.enableTrojan||!e||e.byteLength<58)return!1;const n=e.subarray(0,56);return O.decode(n).toLowerCase()===((r=t.trojanPassword||t.uuid)!==ee&&(ee=r,te=Z(r)),te);var r}const re=["https://cloudflare-dns.com/dns-query","https://dns.google/dns-query","https://dns.alidns.com/resolve","https://doh.pub/dns-query"];function oe(e,t,n,r){const o=r&&r.hedgeMs||700,a=r&&r.timeoutMs||4e3;return new Promise(r=>{let i=0,s=0,l=!1,c=null;const d=e=>{l||(l=!0,clearTimeout(c),r(e))},p=()=>{if(l)return;if(clearTimeout(c),i>=e.length)return void(s||d(null));const r=e[i++];s++,i<e.length&&(c=setTimeout(p,o)),(async()=>{let e=null;try{const o=await nt(t(r),{headers:{accept:"application/dns-json"}},a);o&&o.ok&&(e=n(await o.json()))}catch(e){}s--,null!=e?d(e):l||0!==s||p()})()};p()})}function ae(e){const t=String(e).split("::"),n=t[0]?t[0].split(":").filter(Boolean):[],r=t[1]?t[1].split(":").filter(Boolean):[],o=[...n,...Array(Math.max(0,8-n.length-r.length)).fill("0"),...r],a=new Uint8Array(16);return o.forEach((e,t)=>{const n=parseInt(e,16)||0;a[2*t]=n>>8&255,a[2*t+1]=255&n}),a}async function ie(t,n,r){const o=e({hostname:t,port:n});try{await function(e,t){return Promise.race([e,new Promise((e,n)=>setTimeout(()=>n(new Error("连接超时（SYN 被静默丢弃）")),t||6e3))])}(o.opened,r||6e3)}catch(e){try{o.close()}catch(e){}throw e}return o}async function se(e,t){return ie(e.hostname,e.port,t||6e3)}function le(e){const t=String(e||"").toLowerCase().replace(/_/g,"-");return"aes-128-gcm"===t||"aes-128gcm"===t?{name:"AES-GCM",keyLen:16}:"aes-256-gcm"===t||"aes-256gcm"===t?{name:"AES-GCM",keyLen:32}:"chacha20-ietf-poly1305"===t||"chacha20-poly1305"===t||"chacha20poly1305"===t?{name:"CHACHA20-POLY1305",keyLen:32}:null}function ce(e){const t=e instanceof Uint8Array?e:new Uint8Array(e),n=t.length,r=8*n,o=new Uint8Array(1+(n+8>>6)<<6);o.set(t),o[n]=128;const a=new DataView(o.buffer);a.setUint32(o.length-8,Math.floor(r/4294967296),!1),a.setUint32(o.length-4,r>>>0,!1);let i=1732584193,s=4023233417,l=2562383102,c=271733878,d=3285377520;const p=new Uint32Array(80);for(let e=0;e<o.length;e+=64){for(let t=0;t<16;t++)p[t]=a.getUint32(e+4*t,!1);for(let e=16;e<80;e++)p[e]=R(p[e-3]^p[e-8]^p[e-14]^p[e-16],1);let t=i,n=s,r=l,o=c,u=d;for(let e=0;e<80;e++){let a,i;e<20?(a=n&r|~n&o,i=1518500249):e<40?(a=n^r^o,i=1859775393):e<60?(a=n&r|n&o|r&o,i=2400959708):(a=n^r^o,i=3395469782);const s=R(t,5)+a+u+i+p[e]>>>0;u=o,o=r,r=R(n,30),n=t,t=s}i=i+t>>>0,s=s+n>>>0,l=l+r>>>0,c=c+o>>>0,d=d+u>>>0}const u=new Uint8Array(20),f=new DataView(u.buffer);return f.setUint32(0,i,!1),f.setUint32(4,s,!1),f.setUint32(8,l,!1),f.setUint32(12,c,!1),f.setUint32(16,d,!1),u}function de(e,t){let n=e;n.length>64&&(n=ce(n));const r=new Uint8Array(64),o=new Uint8Array(64);for(let e=0;e<64;e++)r[e]=54^(e<n.length?n[e]:0),o[e]=92^(e<n.length?n[e]:0);return ce(ve(o,ce(ve(r,t))))}function pe(e,t,n){const r=de(t&&t.length?t:new Uint8Array(20),e);let o=new Uint8Array(0),a=new Uint8Array(0);for(let e=1;a.length<n;e++){const t=new Uint8Array([e]);o=de(r,ve(ve(o,L.encode("ss-subkey")),t)),a=ve(a,o)}return a.slice(0,n)}function ue(e,t,n){const r=new Uint32Array(16);r[0]=1634760805,r[1]=857760878,r[2]=2036477234,r[3]=1797285236;const o=new DataView(e.buffer,e.byteOffset,32);for(let e=0;e<8;e++)r[4+e]=o.getUint32(4*e,!0);r[12]=t>>>0;const a=new DataView(n.buffer,n.byteOffset,12);r[13]=a.getUint32(0,!0),r[14]=a.getUint32(4,!0),r[15]=a.getUint32(8,!0);const i=r.slice(),s=(e,t,n,r)=>{i[e]=i[e]+i[t]>>>0,i[r]=R(i[r]^i[e],16),i[n]=i[n]+i[r]>>>0,i[t]=R(i[t]^i[n],12),i[e]=i[e]+i[t]>>>0,i[r]=R(i[r]^i[e],8),i[n]=i[n]+i[r]>>>0,i[t]=R(i[t]^i[n],7)};for(let e=0;e<10;e++)s(0,4,8,12),s(1,5,9,13),s(2,6,10,14),s(3,7,11,15),s(0,5,10,15),s(1,6,11,12),s(2,7,8,13),s(3,4,9,14);const l=new Uint8Array(64),c=new DataView(l.buffer);for(let e=0;e<16;e++)i[e]=i[e]+r[e]>>>0,c.setUint32(4*e,i[e],!0);return l}function fe(e,t,n,r){const o=r.slice(),a=Math.ceil(r.length/64);for(let r=0;r<a;r++){const a=ue(e,n+r,t),i=64*r,s=Math.min(64,o.length-i);for(let e=0;e<s;e++)o[i+e]^=a[e]}return o}function he(e,t){let n=0n,r=0n;for(let t=0;t<16;t++)n|=BigInt(e[t])<<BigInt(8*t),r|=BigInt(e[16+t])<<BigInt(8*t);n&=0x0ffffffc0ffffffc0ffffffc0fffffffn;let o=0n;const a=(1n<<130n)-5n;for(let e=0;e<t.length;e+=16){let r=1n;for(let n=Math.min(16,t.length-e)-1;n>=0;n--)r=r<<8n|BigInt(t[e+n]);o=(o+r)*n%a}o=o+r&(1n<<128n)-1n;const i=new Uint8Array(16);for(let e=0;e<16;e++)i[e]=Number(o>>BigInt(8*e)&0xffn);return i}async function me(e,t){const n=function(){const e=new Uint8Array(12);return()=>{const t=e.slice();for(let t=0;t<12&&(e[t]++,0===e[t]);t++);return t}}();if("CHACHA20-POLY1305"===e)return{seal:e=>function(e,t,n){const r=new Uint8Array(0),o=fe(e,t,0,new Uint8Array(32)),a=fe(e,t,1,n),i=e=>new Uint8Array((16-e%16)%16),s=e=>{const t=new Uint8Array(8),n=new DataView(t.buffer);return n.setUint32(0,e>>>0,!0),n.setUint32(4,Math.floor(e/4294967296),!0),t},l=ve(r,ve(i(r.length),ve(a,ve(i(a.length),ve(s(r.length),s(a.length))))));return ve(a,he(o,l))}(t,n(),e),open(e){const r=function(e,t,n){if(n.length<16)throw new Error("SS AEAD 数据过短");const r=n.subarray(0,n.length-16),o=n.subarray(n.length-16),a=new Uint8Array(0),i=e=>new Uint8Array((16-e%16)%16),s=e=>{const t=new Uint8Array(8),n=new DataView(t.buffer);return n.setUint32(0,e>>>0,!0),n.setUint32(4,Math.floor(e/4294967296),!0),t},l=he(fe(e,t,0,new Uint8Array(32)),ve(a,ve(i(a.length),ve(r,ve(i(r.length),ve(s(a.length),s(r.length)))))));let c=0;for(let e=0;e<16;e++)c|=l[e]^o[e];return 0!==c?null:fe(e,t,1,r)}(t,n(),e);if(!r)throw new Error("SS AEAD 解密失败（密码/加密方式与服务器不匹配）");return r}};const r=await crypto.subtle.importKey("raw",t,{name:e},!1,["encrypt","decrypt"]);return{seal:async t=>new Uint8Array(await crypto.subtle.encrypt({name:e,iv:n()},r,t)),async open(t){try{return new Uint8Array(await crypto.subtle.decrypt({name:e,iv:n()},r,t))}catch(e){throw new Error("SS AEAD 解密失败（密码/加密方式与服务器不匹配）")}}}}const ge=16383;async function be(e,t){const n=new Uint8Array([t.length>>8&255,255&t.length]);return ve(await e.seal(n),await e.seal(t))}function ve(e,t){const n=new Uint8Array(e.length+t.length);return n.set(e,0),n.set(t,e.length),n}function ye(e,t){e:for(let n=0;n<=e.length-t.length;n++){for(let r=0;r<t.length;r++)if(e[n+r]!==t[r])continue e;return n}return-1}const xe=new Map;function we(e,t){for(;e.size>t;)e.delete(e.keys().next().value)}const ke=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve","https://doh.pub/dns-query"];async function Se(e,t,n){if(t=t||443,j(e))return[{hostname:e,port:t}];const r=!(n&&!1===n.txt),o=e+":"+t+(r?"":":a"),a=xe.get(o);if(a&&Date.now()-a.t<(a.ips.length?3e5:3e4))return a.ips;const i=await async function(e,t,n){const r=async(t,n)=>await oe(ke,n=>n+"?name="+encodeURIComponent(e)+"&type="+t,e=>!e||0!==e.Status&&3!==e.Status?null:(e.Answer||[]).filter(e=>e.type===n).map(e=>e.data))||[],[o,a]=await Promise.all([n?r("TXT",16):[],r("A",1)]);let i=[];for(const e of o){const n=String(e).replace(/^"|"$/g,"").replace(/\\010/g,",").replace(/\n/g,",").trim();if(!n)continue;if("@edtunnel"===n){i=a.filter(e=>/^\d+\.\d+\.\d+\.\d+$/.test(e)).map(e=>({hostname:e,port:t}));break}const r=n.split(/[,;\s]+/).map(e=>e.trim()).filter(Boolean),o=[];for(const e of r){const{host:n,port:r}=M(e,t);j(n)&&o.push({hostname:n,port:r})}if(o.length){i=o;break}}i.length||(i=a.filter(e=>/^\d+\.\d+\.\d+\.\d+$/.test(e)).map(e=>({hostname:e,port:t}))),i.length||(i=(await r("AAAA",28)).filter(e=>j(e)).map(e=>({hostname:e,port:t})));const s=new Set;return i.filter(e=>{const t=e.hostname+":"+e.port;return!s.has(t)&&(s.add(t),!0)})}(e,t,r);return xe.set(o,{t:Date.now(),ips:i}),we(xe,200),i}async function Ce(e){if(!e||!e.length)return null;let t=!1;return await new Promise(n=>{let r=e.length;const o=e=>{if(r--,e)if(t)try{e.close()}catch(e){}else t=!0,n(e);else r<=0&&!t&&n(null)};for(const t of e)Promise.resolve().then(t).then(e=>o(e&&e.readable?e:null),()=>o(null))})}const Ee=new Map;async function Te(e,t,n,r){let o=null;const a=e=>{if(e&&e!==o)try{e.close()}catch(e){}},i=e?Promise.resolve().then(e).then(e=>e&&e.readable?e:null,()=>null):Promise.resolve(null);let s=!1,l=!1;const c=()=>{s&&l&&r&&(r(),r=null)};e&&i.then(e=>{e||(s=!0,c())});const d=t&&t.length?function(e,t,n){let r=null,o=!1;return Promise.race([e.then(e=>(clearTimeout(r),o&&n&&n(e),e)),new Promise(e=>{r=setTimeout(()=>{o=!0,e(null)},t)})])}(Ce(t).then(e=>e&&e.readable?e:null,()=>null),Ae,a):Promise.resolve(null);let p=null;const u=await Promise.race([i,new Promise(e=>{p=setTimeout(()=>e(Pe),n)})]);if(clearTimeout(p),u&&u!==Pe)return o=u,d.then(a),o;const f=await d;return f?(o=f,l=!0,c(),i.then(a),o):(o=await i,o)}const Pe=Symbol("grace"),Ae=1e4;function Ie(e){return!e||e.byteLength<3?"unknown":22===e[0]&&3===e[1]?"tls":"nontls"}async function Ue(e,t,n,r){const o=B(t.outboundProxy),a=t.outboundMode||"",i="nontls"!==r,l=o?"http"===o.type||"https"===o.type?e=>async function(e,t){const n=await ie(e.host,e.port,6e3),r=n.writable.getWriter(),o=n.readable.getReader();let a="";e.user&&(a="Proxy-Authorization: Basic "+function(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}(L.encode(`${e.user}:${e.pass}`))+"\r\n");const i=(t.hostname.indexOf(":")>=0?"["+t.hostname+"]":t.hostname)+":"+t.port,s=`CONNECT ${i} HTTP/1.1\r\nHost: ${i}\r\n${a}\r\n`;await r.write(L.encode(s));const{head:l,leftover:c}=await async function(e){let t=new Uint8Array(0);for(;t.length<65536;){const{done:n,value:r}=await e.read();if(n)break;t=ve(t,r);const o=ye(t,[13,10,13,10]);if(o>=0)return{head:O.decode(t.subarray(0,o)),leftover:t.subarray(o+4)}}return{head:O.decode(t),leftover:new Uint8Array(0)}}(o);if(!/^HTTP\/\d\.\d\s+2\d\d/i.test(l))throw new Error("HTTP 代理 CONNECT 失败: "+l.split("\r\n")[0]);return c&&c.byteLength>0&&(n._preamble=c),r.releaseLock(),o.releaseLock(),n}(o,e):"ss"===o.type?e=>async function(e,t){const n=le(e.method);if(!n)throw new Error("不支持的 SS 加密方式: "+(e.method||"（未指定）"));if(!e.password)throw new Error("SS 出站缺少密码");const r=await ie(e.host,e.port,6e3),o=r.writable.getWriter(),a=r.readable.getReader();let i=new Uint8Array(0);const s=async e=>{for(;i.length<e;){const{done:e,value:t}=await a.read();if(e)throw new Error("SS 连接被关闭");i=ve(i,t)}const t=i.slice(0,e);return i=i.subarray(e),t},l=function(e,t){const n=L.encode(e);let r=new Uint8Array(0),o=new Uint8Array(0);for(;r.length<t;)o=N(ve(o,n)),r=ve(r,o);return r.slice(0,t)}(e.password,n.keyLen),c=crypto.getRandomValues(new Uint8Array(n.keyLen)),d=await me(n.name,pe(l,c,n.keyLen));return await o.write(ve(c,await be(d,function(e,t){let n;if(/^\d+\.\d+\.\d+\.\d+$/.test(e))n=new Uint8Array([1,...e.split(".").map(Number)]);else if(e.indexOf(":")>=0&&j(e))n=new Uint8Array([4,...ae(e)]);else{const t=L.encode(e);if(t.length>255)throw new Error("SS 目标域名过长");n=new Uint8Array([3,t.length,...t])}return ve(n,new Uint8Array([t>>8&255,255&t]))}(t.hostname,t.port)))),{readable:new ReadableStream({async start(e){try{const t=await s(n.keyLen),r=await me(n.name,pe(l,t,n.keyLen));for(;;){const t=await r.open(await s(18)),n=t[0]<<8|t[1];if(n>ge)throw new Error("SS 分片长度非法 "+n);const o=await r.open(await s(n+16));n>0&&e.enqueue(o)}}catch(t){try{e.error(t)}catch(e){}}}}),writable:new WritableStream({async write(e){const t=e instanceof Uint8Array?e:new Uint8Array(e);for(let e=0;e<t.length;e+=ge)await o.write(await be(d,t.subarray(e,Math.min(t.length,e+ge))))},close(){try{o.close()}catch(e){}},abort(){try{o.abort()}catch(e){}}}),close(){try{r.close()}catch(e){}}}}(o,e):e=>async function(e,t){const n=await ie(e.host,e.port,6e3),r=n.writable.getWriter(),o=n.readable.getReader();let a=new Uint8Array(0);const i=async e=>{for(;a.length<e;){const{done:e,value:t}=await o.read();if(e)throw new Error("连接被关闭");a=ve(a,t)}const t=a.slice(0,e);return a=a.subarray(e),t},s=e.user?[5,2,0,2]:[5,1,0];await r.write(new Uint8Array(s));const l=await i(2);if(5!==l[0]||255===l[1])throw new Error("SOCKS5 握手失败");if(2===l[1]){if(!e.user)throw new Error("SOCKS5 服务器要求认证但未提供凭据");const t=L.encode(e.user),n=L.encode(e.pass),o=new Uint8Array([1,t.length,...t,n.length,...n]);if(await r.write(o),0!==(await i(2))[1])throw new Error("SOCKS5 认证失败")}else if(0!==l[1])throw new Error("SOCKS5 不支持的认证方法 "+l[1]);const c=L.encode(t.hostname);let d;d=/^\d+\.\d+\.\d+\.\d+$/.test(t.hostname)?new Uint8Array([5,1,0,1,...t.hostname.split(".").map(Number),t.port>>8&255,255&t.port]):t.hostname.indexOf(":")>=0&&j(t.hostname)?new Uint8Array([5,1,0,4,...ae(t.hostname),t.port>>8&255,255&t.port]):new Uint8Array([5,1,0,3,c.length,...c,t.port>>8&255,255&t.port]),await r.write(d);const p=await i(4);if(0!==p[1])throw new Error("SOCKS5 连接失败 码"+p[1]);if(1===p[3])await i(6);else if(3===p[3]){const e=(await i(1))[0];await i(e+2)}else 4===p[3]&&await i(18);return a.byteLength>0&&(n._preamble=a),r.releaseLock(),o.releaseLock(),n}(o,e):null;let d;const p=async e=>{try{const t=await e();if(t)return t}catch(e){d=e}return null},u=()=>{throw d||new Error("所有出站方式均失败")},f=t.proxyIP?M(t.proxyIP,443):null;if(f&&f.host&&i){let e=await Se(f.host,f.port);e.length||(e=[{hostname:f.host,port:f.port}]);const t=await Ce(e.slice(0,4).map(e=>()=>p(()=>se(e,4e3))));if(t)return t}const h={hostname:e.addr,port:e.port},m=()=>i?function(e,t){const n=e.relay||{},r=n.mode||"builtin";if("off"===r)return[];if("custom"===r)return String(n.custom||"").split("\n").map(e=>e.trim()).filter(Boolean).slice(0,3).map((e,t)=>{const{host:n,port:r}=M(e,443);return{host:n,port:r,take:0===t?2:1}});const o=c[n.region]?n.region:function(e){const t=(e||"").toUpperCase();return t.startsWith("HKG")||t.startsWith("HK")?"HK":t.startsWith("SIN")||t.startsWith("SG")?"SG":t.startsWith("NRT")||t.startsWith("KIX")||t.startsWith("TYO")||t.startsWith("OSA")||t.startsWith("JP")?"JP":t.startsWith("ICN")||t.startsWith("SEL")||t.startsWith("KR")?"KR":/^(HKG|SIN|NRT|KIX|ICN|TYO|OSA|SEL|HK|SG|JP|KR|SJC)/.test(t)?"HK":t.startsWith("FRA")||t.startsWith("BER")||t.startsWith("MUC")||t.startsWith("DUS")||t.startsWith("HAM")||t.startsWith("STR")||t.startsWith("DE")?"DE":t.startsWith("ARN")||t.startsWith("SE")?"SE":t.startsWith("AMS")||t.startsWith("NL")?"NL":t.startsWith("HEL")||t.startsWith("FI")?"FI":t.startsWith("LHR")||t.startsWith("MAN")||t.startsWith("GB")||t.startsWith("UK")?"GB":/^(FRA|ARN|AMS|HEL|LHR|MAN|CDG|MAD|VIE|ZRH|MXP|PRG|WAW|BER|MUC|DUS|HAM|STR|DE|SE|NL|FI|GB|UK|FR|ES|AT|CH|IT|CZ|PL)/.test(t)?"DE":"US"}(t),a=[{host:c[o],port:443,take:2,txt:!1}];if("none"!==n.region2){const e=c[n.region2]&&n.region2!==o?n.region2:Object.keys(c).find(e=>e!==o);a.push({host:c[e],port:443,take:1,txt:!1})}return a}(t,n).map(e=>async()=>{let t=[];try{t=await Se(e.host,e.port,{txt:!1!==e.txt})}catch(e){return null}return t.length?await Ce(t.slice(0,e.take).map(e=>()=>p(()=>se(e,4e3)))):null}):[],g=()=>p(()=>se(h,4e3)),b=l?()=>p(()=>l(h)):null,v=String(e.addr||"").toLowerCase(),y=s(v),x=!j(v),w=async()=>{const e=m().slice(0,3);if(e.length&&(y||x&&function(e){const t=Ee.get(e);return!(void 0===t||Date.now()-t>18e5&&(Ee.delete(e),1))}(v))){return await Te(null,e,0)||(x&&Ee.delete(v),Te(g,[],0))}return Te(g,e,1500,x&&e.length?()=>{return e=v,Ee.delete(e),Ee.set(e,Date.now()),void we(Ee,1e3);var e}:null)};if("only"===a){if(b){const e=await b();if(e)return e;return await Te(null,m(),0)||u()}return await w()||u()}if(""===a&&b){const e=await b();if(e)return e;return await w()||u()}const k=await w();if(k)return k;if(b){const e=await b();if(e)return e}return u()}function Le(e){const t=e instanceof Uint8Array?e:new Uint8Array(e);try{return new TextDecoder("utf-8",{fatal:!0}).decode(t)}catch(e){}try{return new TextDecoder("gbk").decode(t)}catch(e){}return(new TextDecoder).decode(t)}const Oe="https://hopline-cache.invalid/";async function $e(e){try{if("undefined"==typeof caches||!caches.default)return null;const t=await caches.default.match(new Request(Oe+e));return t?await t.json():null}catch(e){return null}}async function De(e,t,n){try{if("undefined"==typeof caches||!caches.default)return;await caches.default.put(new Request(Oe+e),new Response(JSON.stringify(t),{headers:{"Content-Type":"application/json","Cache-Control":"max-age="+(n||600)}}))}catch(e){}}const Re={CM:"移动",CU:"联通",CT:"电信"},Ne={t:0,ips:null};function He(e){const t=new Map;for(const n of e){if(!j(n.ip))continue;const e=t.get(n.ip);e?e.lines.includes(n.line)||e.lines.push(n.line):t.set(n.ip,{ip:n.ip,lines:[n.line]})}const n={};return[...t.values()].map(e=>{const t=e.lines.join("/");return n[t]=(n[t]||0)+1,{ip:e.ip,label:t,seq:String(n[t]).padStart(2,"0")}})}async function _e(e){try{return await e.text()}catch(e){return""}}function Me(e){const t=[];for(const n of e.match(/<tr[\s\S]*?<\/tr>/g)||[]){const e={};for(const t of n.match(/<td[^>]*>[\s\S]*?<\/td>/g)||[]){const n=t.match(/data-label="([^"]*)"[^>]*>([\s\S]*?)<\/td>/);n&&(e[n[1]]=n[2].replace(/<[^>]+>/g,"").trim())}const r=(e["优选地址"]||"").trim();let o,a,i;if(r.indexOf(":")!==r.lastIndexOf(":")){if(o=r.match(/^\[([0-9a-fA-F:]+)\](?::(\d{1,5}))?$/)||r.match(/^([0-9a-fA-F:]+)$/),!o||!j(o[1]))continue}else if(o=r.match(/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?/),!o)continue;a=o[1],i=o[2]?parseInt(o[2],10):443,t.push({ip:a,port:i,cells:e})}return t}async function je(e){const t={status:0,raw:"",items:[],dropped:[],error:""},n=await nt("https://api.hostmonit.com/get_optimization_ip",{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0"},body:JSON.stringify({key:"iDetkOys"})},6e3);if(!n)return t.error="请求失败或超时",t;if(t.status=n.status,t.raw=await _e(n),!n.ok)return t.error="HTTP "+n.status,t;let r;try{r=JSON.parse(t.raw)}catch(e){return t.error="响应不是 JSON",t}const o=(r&&Array.isArray(r.info)?r.info:[]).map(e=>({ip:String(e&&e.ip||"").trim(),line:Re[String(e&&e.line||"").toUpperCase()]||"优选"}));for(const n of He(o))if(s(n.ip)){if(t.items.push({ip:n.ip,port:443,name:n.label+"-"+n.seq}),t.items.length>=e)break}else t.dropped.push(n.ip);return t.items.length||(t.error="响应中没有 Cloudflare 段 IP"),t}async function Fe(e){if(e=Math.max(1,parseInt(e)||150),Ne.ips&&Date.now()-Ne.t<6e5)return Ne.ips;const t=await $e("hostmonit");if(t&&t.length)return Ne.t=Date.now(),Ne.ips=t,t;const n=await je(e);return n.items.length?(Ne.t=Date.now(),Ne.ips=n.items,await De("hostmonit",n.items),n.items):Ne.ips}const ze=[["ctcc","电信"],["cucc","联通"],["cmcc","移动"],["bgp","多线"],["ipv6","IPv6"]],Be={t:0,ips:null};async function Ke(){const e={status:0,raw:"",items:[],dropped:[],error:""},t=String(Date.now()),n=H(H("DdlTxtN0sUOu")+"70cloudflareapikey"+t),r=await nt("https://api.uouin.com/index.php/index/Cloudflare?key="+n+"&time="+t,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(!r)return e.error="请求失败或超时",e;if(e.status=r.status,e.raw=await _e(r),!r.ok)return e.error="HTTP "+r.status,e;let o;try{o=JSON.parse(e.raw)}catch(t){return e.error="响应不是 JSON",e}const a=o&&o.data||{};o&&o.data||(e.error=o&&o.msg?"接口返回："+o.msg:"响应中没有 data 字段");const i=[];for(const[e,t]of ze)for(const n of(a[e]||{}).info||[])i.push({ip:String(n&&n.ip||"").trim().replace(/^\[|\]$/g,""),line:t});for(const t of He(i))s(t.ip)?e.items.push({ip:t.ip,port:443,name:t.label+"-U"+t.seq}):e.dropped.push(t.ip);return e.items.length||e.error||(e.error="响应中没有 Cloudflare 段 IP"),e}async function We(e,t){let n=Be.ips;if(!n||Date.now()-Be.t>=6e5){const e=await $e("uouin");if(e&&e.length)Be.t=Date.now(),Be.ips=e,n=e;else{const e=await Ke();e.items.length&&(Be.t=Date.now(),Be.ips=e.items,n=e.items,await De("uouin",e.items))}}return(n||[]).filter(n=>n.ip.indexOf(":")>=0?t:e)}const Ve={v4:{url:"https://www.wetest.vip/page/cloudflare/address_v4.html",tag:"W"},v6:{url:"https://www.wetest.vip/page/cloudflare/address_v6.html",tag:"W6-"}},Ge={v4:{t:0,ips:null},v6:{t:0,ips:null}};async function qe(e){const t={status:0,raw:"",items:[],dropped:[],error:""},n=await nt(Ve[e].url,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(!n)return t.error="请求失败或超时",t;t.status=n.status;const r=await _e(n);if(!n.ok)return t.error="HTTP "+n.status,t.raw=r,t;const o=Me(r);if(!o.length)return t.error="页面中没有解析到 IP（版式可能已变化）",t.raw=r,t;t.raw=o.map(e=>[e.cells["线路名称"],e.ip,e.cells["数据中心"],e.cells["往返延迟"],e.cells["更新时间"]].filter(Boolean).join("  ")).join("\n");const a=o.map(e=>({ip:e.ip,line:e.cells["线路名称"]||"优选"}));for(const n of He(a))s(n.ip)?t.items.push({ip:n.ip,port:443,name:n.label+"-"+Ve[e].tag+n.seq}):t.dropped.push(n.ip);return t.items.length||(t.error="页面中没有 Cloudflare 段 IP"),t}async function Je(e,t){const n=[e&&"v4",t&&"v6"].filter(Boolean);return(await Promise.all(n.map(async e=>{const t=Ge[e];if(t.ips&&Date.now()-t.t<6e5)return t.ips;const n=await $e("wetest-"+e);if(n&&n.length)return t.t=Date.now(),t.ips=n,n;const r=await qe(e);return r.items.length&&(t.t=Date.now(),t.ips=r.items,await De("wetest-"+e,r.items)),t.ips||[]}))).flat()}function Xe(e){return String(e).replace(/%/g,"%25").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/ /g,"%20")}function Qe(e){const t=String(e||"").split(",").map(e=>e.trim()).filter(e=>/^[\w./-]+$/.test(e));return t.length?t:null}function Ye(e){return(Qe(e)||[]).join(",")}function Ze(e,t,n,r,o={}){const a=e.host,i=t.includes(":")&&!t.startsWith("[")?`[${t}]`:t,s=!U.has(Number(n)),l=encodeURIComponent;let c="encryption=none";c+=s?"&security=tls&sni="+l(a)+"&fp=chrome":"&security=none",c+="&host="+l(a);const d="xhttp"===o.type&&s;return d?(c+="&type=xhttp&mode=stream-one",c+="&extra="+l(JSON.stringify(function(e){const t=e.uuid||"";return{xPaddingObfsMode:!0,xPaddingMethod:"tokenish",xPaddingPlacement:"queryInHeader",xPaddingHeader:t.slice(1,7),xPaddingKey:"_"+t.slice(25,31)}}(e)))):c+="&type=ws",c+="&path="+l("/"+e.path+(!d&&s?"?ed=2048":"")),s&&(e.alpn||d)&&(c+="&alpn="+(e.alpn?Ye(e.alpn):"h2")),e.ech&&s&&(c+="&ech="+l((e.echHost||"cloudflare-ech.com")+"+"+(e.echDns||"https://223.5.5.5/dns-query"))),`vless://${e.uuid}@${i}:${n}?${c}#${Xe(r)}`}const et=new Map;async function tt(e,t){et.set(e,{t:Date.now(),ips:t}),we(et,300),await De("url-"+H(e),t,600)}function nt(e,t,n){return new Promise(r=>{const o=new AbortController,a=setTimeout(()=>o.abort(),n);fetch(e,Object.assign({},t,{signal:o.signal})).then(e=>{clearTimeout(a),r(e)}).catch(()=>{clearTimeout(a),r(null)})})}async function rt(e,t=100,n=300,r=!0,o=!1,a={}){const i=String(e||"").split(/[\n,;]+/).map(e=>e.trim().replace(/^\*\./,"")).filter(Boolean),c=Date.now(),d=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve"],p=async(e,t,n)=>{for(const r of d){const o=await nt(r+"?name="+encodeURIComponent(e)+"&type="+t,{headers:{accept:"application/dns-json"}},4e3);if(o&&o.ok)try{return((await o.json()).Answer||[]).filter(e=>e.type===n&&("A"===t?/^\d+\.\d+\.\d+\.\d+$/.test(e.data):/^[0-9a-fA-F:]+$/.test(e.data))).map(e=>e.data)}catch(e){}}return[]},u="only"===o?"v6":o?"v4v6":"v4",f=await Promise.all(i.map(async e=>{if(e.includes("://")){if(e.startsWith("sub://")){let t=e.slice(6);if(/^[A-Za-z0-9+/=]+$/.test(t)&&t.length%4==0)try{const e=atob(t);/^https?:\/\//i.test(e)&&(t=e)}catch(e){}/^https?:\/\//i.test(t)||(t="https://"+t),e=t}const n="url:"+e+(r?"":"|raw"),o=et.get(n);if(!a.fresh&&o&&c-o.t<6e5)return o.ips.slice(0,t);if(!a.fresh){const e=await $e("url-"+H(n));if(Array.isArray(e))return et.set(n,{t:c,ips:e}),we(et,300),e.slice(0,t)}try{const o=await nt(e,{},6e3);if(!o)throw a.onRaw&&a.onRaw(e,0,""),new Error("unreachable");let i="";try{i=Le(await o.arrayBuffer())}catch(e){}if(a.onRaw&&a.onRaw(e,o.status,i),!o.ok)throw new Error("unreachable");let c=i;if(/^[A-Za-z0-9+/=\s]{40,}$/.test(c.slice(0,2e3))&&c.replace(/\s+/g,"").length%4==0)try{const e=atob(c.replace(/\s+/g,""));c=Le(Uint8Array.from(e,e=>e.charCodeAt(0)))}catch(e){}const d=new Set,p={},u=[],f=e=>!r||s(e),h=c.trim().split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(h.length>1&&h[0].includes(",")){const e=h[0].split(",").map(e=>e.trim()),r=e.includes("IP地址")&&e.includes("端口"),o=e.some(e=>e.includes("IP"))&&e.some(e=>e.includes("延迟"))&&e.some(e=>e.includes("下载速度"));if(r||o){const r=e.findIndex(e=>e.includes("IP")),o=e.indexOf("端口"),a=e.findIndex(e=>e.includes("延迟")),i=e.findIndex(e=>e.includes("下载速度")),s=e.indexOf("国家")>-1?e.indexOf("国家"):e.indexOf("城市")>-1?e.indexOf("城市"):e.indexOf("数据中心"),l=e.indexOf("TLS");for(const e of h.slice(1)){if(u.length>=t)break;const n=e.split(",").map(e=>e.trim());if(-1!==l&&n[l]&&"true"!==n[l].toLowerCase())continue;const c=(n[r]||"").match(/(\[[0-9a-fA-F:]+\]|\d{1,3}(?:\.\d{1,3}){3})/);if(!c)continue;const h=c[1].replace(/^\[|\]$/g,""),m=-1!==o&&n[o]?parseInt(n[o]):443,g=h+":"+m;if(d.has(g))continue;if(!f(h))continue;d.add(g);let b=-1!==s&&n[s]?n[s]:"";b||-1===a||-1===i||(b="CF优选 "+(n[a]||"")+"ms "+(n[i]||"")+"MB/s"),b?(p[b]=(p[b]||0)+1,u.push({ip:h,port:m,name:b+"-"+String(p[b]).padStart(2,"0")})):u.push({ip:h,port:m,name:""})}return await tt(n,u),u.slice()}}if(c.includes("<tr")&&c.includes("data-label")){for(const{ip:e,port:n,cells:r}of Me(c)){if(u.length>=t)break;const o=e+":"+n;if(d.has(o))continue;if(!f(e))continue;d.add(o);const a=(r["线路名称"]||r["数据中心"]||"线路").trim();a?(p[a]=(p[a]||0)+1,u.push({ip:e,port:n,name:a+"-"+String(p[a]).padStart(2,"0")})):u.push({ip:e,port:n,name:""})}return await tt(n,u),u.slice()}for(const e of c.split(/\r?\n/)){if(u.length>=t)break;const n=e.match(/(?:vless|trojan):\/\/[^@\s/]+@(\[[0-9a-fA-F:]+\]|[A-Za-z0-9.-]+)(?::(\d{1,5}))?/);if(!n)continue;const r=n[1].replace(/^\[|\]$/g,""),o=n[2]?parseInt(n[2]):443,a=r+":"+o;if(d.has(a))continue;if(!f(r))continue;d.add(a);let i="";const s=e.indexOf("#");if(s>=0)try{i=decodeURIComponent(e.slice(s+1).trim())}catch(t){i=e.slice(s+1).trim()}i?(p[i]=(p[i]||0)+1,u.push({ip:r,port:o,name:i+"-"+String(p[i]).padStart(2,"0")})):u.push({ip:r,port:o,name:""})}for(const e of c.split(/\r?\n/)){if(u.length>=t)break;const n=e.match(/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?(?:#([^\r\n]*))?/);if(!n)continue;const r=n[1],o=n[2]?parseInt(n[2]):443,a=r+":"+o;if(d.has(a))continue;if(!f(r))continue;d.add(a);const i=(n[3]||"").trim();if(i&&!/[\u4e00-\u9fa5]/.test(i)&&!i.includes("|")){u.push({ip:r,port:o,name:i});continue}let s="";if(n[3]){const e=n[3].match(/^\s*[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}/);if(e){const t=e[0].match(/[\u4e00-\u9fa5]{2,5}/);t&&(s=t[0])}else{const e=n[3].split("|").map(e=>e.trim()),t=e.find(e=>/^[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}$/.test(e));if(t){const e=t.match(/[\u4e00-\u9fa5]{2,5}/);e&&(s=e[0])}else{const t=e.find(e=>/^[\u4e00-\u9fa5]{2,5}$/.test(e)&&!/^(地区随机|随机优选|官方优选|优选|CF优选)$/.test(e));if(t)s=t;else{const e=n[3].match(/\b([A-Z]{2})\b/);e&&(s=l[e[1]]||e[1])}}}}s?(p[s]=(p[s]||0)+1,u.push({ip:r,port:o,name:s+"-"+String(p[s]).padStart(2,"0")})):u.push({ip:r,port:o,name:i.slice(0,40)})}return await tt(n,u),u.slice()}catch(e){const r=et.get(n);return!a.fresh&&r&&r.ips&&r.ips.length?r.ips.slice(0,t):[]}}const n=e+"|"+u,o=et.get(n);if(o&&c-o.t<6e5)return o.ips.slice(0,t).map((t,n)=>({ip:t,port:443,name:e+"-"+(n+1)}));const i="v6"===u?[]:await p(e,"A",1),d="v4"===u?[]:await p(e,"AAAA",28);let f=[...new Set(i.concat(d))].filter(e=>!r||s(e));return f=f.slice(0,t),f.length?(et.set(n,{t:c,ips:f}),we(et,300),f.map((t,n)=>({ip:t,port:443,name:e+"-"+(n+1)}))):o&&o.ips&&o.ips.length?o.ips.slice(0,t).map((t,n)=>({ip:t,port:443,name:e+"-"+(n+1)})):[]})),h=[];let m=0;for(;m<n;){let e=!1;for(const t of f){if(m>=n)break;t.length&&(h.push(t.shift()),m++,e=!0)}if(!e)break}return h}async function ot(e,t=Tt){const n=[],r=new Set,o=e.filter&&e.filter.ipType||[],a=o.includes("IPv6"),i=1===o.length&&"IPv6"===o[0],l=(o,a,i)=>{if(n.length>=t)return;if(j(o)&&!s(o))return;const l=o+":"+a;if(r.has(l))return;r.add(l);const c=!U.has(Number(a));if(e.tlsOnly&&!c)return;const d=Number(a),p=function(e,t,n,r){return(t?1:0)+(n?1:0)+(r?1:0)<=1?{v:e,t:e,x:e}:{v:e,t:e+".T",x:e+".X"}}(i,e.enableVless,e.enableTrojan,e.enableXhttp&&c);e.enableVless&&n.push(Ze(e,o,d,p.v)),e.enableTrojan&&n.push(function(e,t,n,r){const o=e.host,a=t.includes(":")&&!t.startsWith("[")?`[${t}]`:t,i=encodeURIComponent,s=!U.has(Number(n)),l=i("/"+e.path+(s?"?ed=2048":""));let c=s?"security=tls&sni="+i(o)+"&fp=chrome&host="+i(o)+"&type=ws&path="+l:"security=none&host="+i(o)+"&type=ws&path="+l;return e.alpn&&s&&(c+="&alpn="+Ye(e.alpn)),e.ech&&s&&(c+="&ech="+i((e.echHost||"cloudflare-ech.com")+"+"+(e.echDns||"https://223.5.5.5/dns-query"))),`trojan://${e.trojanPassword||e.uuid}@${a}:${n}?${c}#${Xe(r)}`}(e,o,d,p.t)),e.enableXhttp&&c&&n.push(Ze(e,o,d,p.x,{type:"xhttp"}))},c=(t,n,r)=>{n=Number(n)||443,l(t,n,r),e.tlsOnly||443!==n||l(t,80,r+"·80")};String(e.preferredDomains||"").split(/[\n,;]+/).map(e=>e.trim()).filter(e=>e&&!e.includes("://")).forEach((e,t)=>{const n=e.indexOf("#"),r=(n>=0?e.slice(0,n):e).trim(),o=(n>=0?e.slice(n+1):"").trim(),a=M(r,443);c(a.host,a.port,o||"优选域名-"+String(t+1).padStart(2,"0"))});let d=e.preferredIPs||[];if(a&&!i&&d.length>1){const e=[],t=[];for(const n of d)(String(n.ip).indexOf(":")>=0?t:e).push(n);const n=[],r=Math.max(e.length,t.length);for(let o=0;o<r;o++)o<e.length&&n.push(e[o]),o<t.length&&n.push(t[o]);d=n}return d.forEach((e,t)=>{c(e.ip,e.port||443,e.name||"优选IP-"+String(t+1).padStart(2,"0"))}),n}function at(e){const t=e.indexOf("@"),n=e.indexOf("?",t),r=n>t&&t>=0?e.slice(t+1,n):e.slice(t+1);if(r.startsWith("[")){const e=r.indexOf("]"),t=e>0?r.slice(1,e):r,n=r.slice(e+1),o=n.startsWith(":")?parseInt(n.slice(1)):443;return{host:t,port:isNaN(o)?443:o}}const o=r.lastIndexOf(":");if(o>0){const e=parseInt(r.slice(o+1));return{host:r.slice(0,o),port:isNaN(e)?443:e}}return{host:r,port:443}}function it(e,t){const n=e.indexOf("?");if(n<0)return null;const r=e.indexOf("#",n),o=r>n?e.slice(n+1,r):e.slice(n+1);for(const e of o.split("&")){const n=e.indexOf("=");if((n>0?e.slice(0,n):e)===t)return n>0?decodeURIComponent(e.slice(n+1)):""}return null}function st(e,t){const{host:n,port:r}=at(e),o=n,a=e.indexOf("#");let i=`节点${t+1}`;if(a>=0)try{i=decodeURIComponent(e.slice(a+1))||i}catch(e){}const s=e.indexOf("@");let l="";if(s>=0){const t=e.indexOf("://"),n=t>=0?t+3:0;try{l=decodeURIComponent(e.slice(n,s))}catch(t){l=e.slice(n,s)}}return{srv:o,prt:r,name:i,user:l,isTrojan:e.startsWith("trojan://"),tls:"tls"===(it(e,"security")||"tls")}}const lt={HK:["HK","香港"],TW:["TW","台湾"],US:["US","美国"],SG:["SG","新加坡"],JP:["JP","日本"],KR:["KR","韩国"],DE:["DE","德国"]},ct={"移动":["移动","CM","CHINAMOBILE"],"联通":["联通","CU","UNICOM"],"电信":["电信","CT","CHINATELECOM"]},dt=["移动","联通","电信"],pt=Object.keys(ct).map(e=>[e,ct[e].map(e=>{return/^[A-Z]+$/.test(e)?(t=new RegExp("(^|[^A-Z])"+e+"([^A-Z]|$)"),e=>t.test(e)):t=>t.includes(e);var t})]),ut=Object.keys(lt).map(e=>[e,new RegExp("(^|[^A-Z])"+e+"([^A-Z]|$)")]);function ft(e,t){const n=[];for(const[t,r]of Object.entries(l))e.includes(r)&&n.push(t);for(const[e,r]of ut)!n.includes(e)&&r.test(t)&&n.push(e);return n}function ht(e){return pt.filter(([,t])=>t.some(t=>t(e))).map(([e])=>e)}const mt=["IPv4","IPv6"];function gt(e){if("boolean"==typeof e||"number"==typeof e)return String(e);const t=String(e);return/^[\w.\-/\u4e00-\u9fa5]+$/.test(t)?t:JSON.stringify(t)}function bt(e,t){const n=e.host,r="/"+e.path,o=r+"?ed=2048",a=Qe(e.alpn),i=new Set,s=t.map(t=>{const{user:s,srv:l,prt:c,name:d,isTrojan:p,tls:u}=st(t,0);let f=d;const h=it(t,"type")||"ws";if(i.has(f)){const e=p?"T":"xhttp"===h?"X":"W";let t=f+"·"+e,n=2;for(;i.has(t);)t=f+"·"+e+n,n++;f=t}i.add(f);const m={name:f,server:l,port:c,udp:!0,...u?{tls:!0,"skip-cert-verify":!1,servername:n,"client-fingerprint":"chrome",alpn:a||["http/1.1"]}:{},...e.ech&&u?{"ech-opts":{enable:!0,"query-server-name":e.echHost||"cloudflare-ech.com"}}:{}};if(p)return{...m,type:"trojan",password:s,network:"ws","ws-opts":{path:u?o:r,headers:{Host:n}}};if("xhttp"===h){let e={};try{e=JSON.parse(it(t,"extra")||"{}")}catch(e){}return{...m,type:"vless",uuid:s,network:"xhttp",alpn:a||["h2"],"xhttp-opts":{path:r,mode:"stream-one",host:n,"x-padding-obfs-mode":void 0===e.xPaddingObfsMode||e.xPaddingObfsMode,"x-padding-method":e.xPaddingMethod||"tokenish","x-padding-placement":e.xPaddingPlacement||"queryInHeader","x-padding-header":e.xPaddingHeader||"","x-padding-key":e.xPaddingKey||""}}}return{...m,type:"vless",uuid:s,network:"ws","ws-opts":{path:u?o:r,headers:{Host:n}}}});s.sort((e,t)=>(443===e.port?0:1)-(443===t.port?0:1));const l=t=>Z("hopline-clash|"+t+"|"+e.uuid).slice(0,20),c='\n# ==================== 锚点配置 ====================\n# 代理提供者模板 - 订阅源基础配置\n\n# 节点筛选正则表达式 - 仅保留常用地区\nFilterHK: &FilterHK \'^(?=.*(?i)(港|🇭🇰|HK|Hong|HKG))(?!.*5x).*$\'\nFilterSG: &FilterSG \'^(?=.*(?i)(坡|🇸🇬|SG|Sing|SIN|XSP))(?!.*5x).*$\'\nFilterJP: &FilterJP \'^(?=.*(?i)(日|🇯🇵|JP|Japan|NRT|HND|KIX|CTS|FUK))(?!.*(尼日利亚|5x)).*$\'\nFilterUS: &FilterUS \'^(?=.*(?i)(美|🇺🇸|US|USA|JFK|SJC|LAX|ORD|ATL|DFW|SFO|MIA|SEA|IAD))(?!.*(Plus|Australia|5x)).*$\'\n# 注意：🇼🇸 是萨摩亚旗帜，不是台湾，已移除，避免误匹配\nFilterTW: &FilterTW \'^(?=.*(?i)(台|🇹🇼|TW|tai|TPE|TSA|KHH))(?!.*5x).*$\'\n\n# ==================== 监听器 ====================\nlisteners:\n  # Shadowsocks监听器 - 远程连接家庭网络。密码由 Hopline 按 UUID 为本部署派生（每个部署不同），不再使用公开的默认密码；\n  # 如需对外开放请自行修改端口与密码\n  - {name: SS-IN,  type: shadowsocks, listen: \'::\', port: 10000, udp: true, password: "__HOPLINE_SS_PASSWORD__", cipher: aes-256-gcm}\n  # Mixed监听器 - 分地区专用端口 玩法：本地浏览器插件或手机APP配置代理，实现分地区访问\n  - {name: MIXED-SG, type: mixed, port: 50000, proxy: 新加坡节点}\n  - {name: MIXED-US, type: mixed, port: 50001, proxy: 美国节点}\n  - {name: MIXED-TW, type: mixed, port: 50002, proxy: 台湾节点}\n  - {name: MIXED-HK, type: mixed, port: 50003, proxy: 香港节点}\n  - {name: MIXED-JP, type: mixed, port: 50004, proxy: 日本节点}\n  - {name: MIXED-AL, type: mixed, port: 50007, proxy: 一键连接}\n\n# ==================== 核心配置 ====================\nmode: rule\nport: 7890\nsocks-port: 7891\nredir-port: 7892\nmixed-port: 7893\ntproxy-port: 7895\nipv6: true\nallow-lan: true\nunified-delay: true\ntcp-concurrent: true\nlog-level: warning\nbind-address: \'*\'\nfind-process-mode: \'always\'\nkeep-alive-interval: 15\nkeep-alive-idle: 600\n\n# 认证配置：密码由 Hopline 按 UUID 为本部署派生（每个部署不同），不再使用公开的默认凭据\nauthentication:\n  - "mihomo:__HOPLINE_AUTH_PASSWORD__"\nskip-auth-prefixes:\n  - 192.168.1.0/24\n  - 192.168.31.0/24\n  - 192.168.100.0/24\n  - 127.0.0.1/8\n\n# 实验性功能\nexperimental:\n  quic-go-disable-gso: true\n\n# 管理面板配置\nexternal-ui-url: https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip\nexternal-ui-name: zashboard\nexternal-ui: ui\nexternal-controller: 127.0.0.1:9090\nsecret: "__HOPLINE_API_SECRET__"    # 由 Hopline 按 UUID 为本部署派生，可自行修改\n# 允许跨域访问的面板来源（不再使用 "*"：任意网页都不能借浏览器访问本机控制接口）。使用其它在线面板时在此追加其域名\nexternal-controller-cors:\n  allow-origins:\n    - "http://127.0.0.1:9090"\n    - "http://localhost:9090"\n    - "https://board.zash.run.place"\n    - "https://metacubex.github.io"\n  allow-private-network: true\n\n# 配置存储\nprofile:\n  store-selected: true\n  store-fake-ip: true\n\n# geosite / geoip 数据源（GEOSITE 规则依赖）：MetaCubeX 规则库，经 jsDelivr 镜像下载（GitHub release 国内常不可达）\ngeox-url:\n  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"\n  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"\n  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"\n\n# 流量嗅探\nsniffer:\n  enable: true\n  force-dns-mapping: true   # 强制 DNS 映射，提高分流准确度\n  parse-pure-ip: true       # 解析纯 IP 连接\n  override-destination: true\n  sniff:\n    HTTP:\n      ports: [80, 8080-8880]\n    TLS:\n      ports: [443, 8443]\n    QUIC:\n      ports: [443, 8443]\n  skip-domain:\n    - "+.push.apple.com"\n\n# TUN模式配置\ntun:\n  enable: false\n  stack: mixed\n  mtu: 1480\n  dns-hijack:\n    - "any:53"\n    - "tcp://any:53"\n  udp-timeout: 300\n  auto-route: true\n  strict-route: true\n  auto-redirect: true\n  auto-detect-interface: true\n  # 提示：系统级防泄露的最强手段是开启 TUN（自动劫持全部 DNS 流量）；\n  # 不开 TUN 时，请把系统 / 本机应用的 DNS 指向 127.0.0.1:1053；要给 LAN 设备提供 DNS，把下方 dns.listen 改为 0.0.0.0:1053（注意不要暴露到公网）。\n\nhosts:\n  miwifi.com: 192.168.31.2\n  "epdg.epc.mnc010.mcc234.pub.3gppnetwork.org": [87.194.8.8, 87.194.88.8, 87.194.89.8, 87.194.9.8]\n  services.googleapis.cn: services.googleapis.com\n  cn.bing.com: www4.bing.com\n\n# ==================== DNS 配置 ====================\n# 防泄露要点：\n#   1) respect-rules: true：DNS 服务器连接遵循路由规则（国外 DoH 走代理隧道、国内 DoH 直连），\n#      解析行为与规则分流一致，避免“规则走代理、解析却直连”的泄露。\n#   2) 默认 nameserver 用国内 DoH；只有“将走代理”的规则集才用国外 DoH，\n#      且其域名在 rules 中显式固定走代理。\n#   3) fake-ip-filter 补齐系统连通性检测 / 时间同步 / 运营商登录等域名，防止系统误判断网而回退运营商 DNS。\ndns:\n  enable: true\n  listen: 127.0.0.1:1053    # 仅本机监听（53 端口需要管理员权限且常被系统占用，监听 0.0.0.0 还可能成为公网开放解析器）\n  ipv6: true\n  prefer-h3: false          # respect-rules 下官方不推荐 DoH3；且 QUIC 已被规则拦截\n  cache-algorithm: arc      # 性能更优的 ARC 缓存算法\n  cache-size: 4096\n  enhanced-mode: fake-ip\n  fake-ip-range: 198.18.0.1/16\n  fake-ip-filter:\n    - "+.lan"\n    - "+.local"\n    - "+.localhost"\n    - "+.home.arpa"\n    - "+.internal"\n    # 系统连通性检测（防止 fake-ip 导致“无网络”判断，回退 ISP DNS 造成泄露）\n    - "+.msftconnecttest.com"\n    - "+.msftncsi.com"          # 通配已覆盖 dns.msftncsi.com\n    - "captive.apple.com"\n    - "connectivitycheck.gstatic.com"\n    - "detectportal.firefox.com"\n    # 时间同步\n    - "time.nist.gov"\n    - "+.pool.ntp.org"\n    - "time.*.com"              # 通配已覆盖 time.windows.com\n    - "ntp.*.com"               # 通配已覆盖 ntp.ubuntu.com\n    # 运营商 Wi-Fi 登录页\n    - "+.cmpassport.com"\n    - "id6.me"\n    - "open.e.189.cn"\n    - "mdn.open.wo.cn"\n    - "opencloud.wostore.cn"\n    - "auth.wosms.cn"\n    - "+.10099.com.cn"\n    # 原配置保留项\n    - "+.market.xiaomi.com"\n    - "+.pub.3gppnetwork.org"\n    - "+.push.apple.com"\n    - "+.bing.com"\n    - "+.miwifi.com"\n    - "+.docker.io"\n    # 国内应用登录（+.qq.com 已覆盖 localhost.ptlogin2.qq.com）\n    - "+.qq.com"\n    # 直连 / 国内类规则集：返回真实 IP\n    - rule-set:Direct\n    - rule-set:Private\n    - rule-set:China\n    - geosite:cn                # 国内域名返回真实 IP（geosite 库兜底，防 fake-ip 干扰国内应用）\n  use-hosts: true\n  respect-rules: true\n  # 引导用 DNS（解析 DoH/DoT 服务器自身的域名），必须是 IP\n  default-nameserver:\n    - 223.5.5.5\n    - 119.29.29.29\n  # 默认解析：未命中 nameserver-policy 的域名（国内 DoH，直连）\n  nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  # 直连出口的解析\n  direct-nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  # 解析代理节点域名（防套娃 / 防循环，用国内直连可达的 DoH）\n  proxy-server-nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  nameserver-policy:\n    # 广告域名直接返回空应答\n    "rule-set:Advertising,AWAvenueAds": rcode://success\n    # 直连类：国内 DoH（微软已并入直连，微软域名走国内解析后直连）\n    "rule-set:Direct,Private,China,Microsoft":\n      - "https://dns.alidns.com/dns-query"\n      - "https://doh.pub/dns-query"\n    # 走代理类：国外 DoH（连接本身经代理隧道，不直连暴露查询）\n    "rule-set:AI,Telegram,Twitter,SocialMedia,Netflix,YouTube,Spotify,TikTok,disney,Google,Proxy":\n      - "https://dns.google/dns-query"\n      - "https://cloudflare-dns.com/dns-query"\n\n# ==================== 代理策略组（9 个可见 + 6 个隐藏自动子组） ====================\nproxy-groups:\n  # 主入口：默认自动选择，可手动切换各地区 / 故障转移 / 全部节点 / 直接连接\n  - {name: 一键连接,     type: select, proxies: [自动选择, 故障转移, 香港节点, 台湾节点, 日本节点, 美国节点, 新加坡节点, 全部节点, 直接连接], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Static.png}\n  # 自动选择：隐藏（面板不可手动选择），纯自动优选延时最低节点；故障转移：按序自动切换\n  - {name: 自动选择,     type: url-test, include-all: true, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, hidden: true, empty-fallback: REJECT, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 故障转移,     type: fallback, proxies: [香港节点, 台湾节点, 日本节点, 美国节点, 新加坡节点, 全部节点], url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/ULB.png}\n  # 常用地区节点组（select：默认选中“XX自动”=自动优选该地区最快节点，也可手动指定单个节点）\n  - {name: 香港节点,     type: select, include-all: true, filter: *FilterHK, proxies: [香港自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Hong_Kong.png}\n  - {name: 台湾节点,     type: select, include-all: true, filter: *FilterTW, proxies: [台湾自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Taiwan.png}\n  - {name: 日本节点,     type: select, include-all: true, filter: *FilterJP, proxies: [日本自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Japan.png}\n  - {name: 美国节点,     type: select, include-all: true, filter: *FilterUS, proxies: [美国自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/United_States.png}\n  - {name: 新加坡节点,   type: select, include-all: true, filter: *FilterSG, proxies: [新加坡自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Singapore.png}\n  # 全部节点（手动挑选任意节点；首个选项“自动选择”=全部节点中最快）\n  - {name: 全部节点,     type: select, include-all: true, proxies: [自动选择], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Global.png}\n  # 各地区自动优选子组（隐藏，作为各地区分组内的“自动选择”选项）\n  - {name: 香港自动,     type: url-test, include-all: true, filter: *FilterHK, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 台湾自动,     type: url-test, include-all: true, filter: *FilterTW, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 日本自动,     type: url-test, include-all: true, filter: *FilterJP, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 美国自动,     type: url-test, include-all: true, filter: *FilterUS, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 新加坡自动,   type: url-test, include-all: true, filter: *FilterSG, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  # 直连分组（放在最下方）\n  - {name: 直接连接,     type: select, proxies: [DIRECT], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Direct.png}\n\n# ==================== 规则路由 ====================\nrules:\n  # 广告拦截（常用：直接拒绝；如需临时放行可改为一键连接）\n  - RULE-SET,Tracking,REJECT\n  - RULE-SET,AWAvenueAds,REJECT\n  - RULE-SET,Advertising,REJECT\n  - GEOSITE,category-ads-all,REJECT        # geosite 广告分类兜底（覆盖规则集未收录的广告域名）\n\n  # DNS 服务器域名：解析通道固定，避免 DNS 流量走错路径（防泄露关键）\n  - DOMAIN-SUFFIX,alidns.com,直接连接\n  - DOMAIN-SUFFIX,doh.pub,直接连接\n  - DOMAIN,dns.google,一键连接\n  - DOMAIN,cloudflare-dns.com,一键连接\n\n  # 大陆直连优先（置于国外服务规则之前：大陆应用一律直连，不被国外服务规则集抢先命中）\n  - RULE-SET,Private,直接连接\n  - RULE-SET,Direct,直接连接\n  - RULE-SET,Download,直接连接\n  - RULE-SET,AppleCN,直接连接\n  - RULE-SET,Microsoft,直接连接        # 微软全家桶直连（Office / OneDrive / Windows 更新 / Teams / Xbox 等）\n  - RULE-SET,China,直接连接             # 国内域名直连\n  - GEOSITE,CN,直接连接                  # geosite 国内域名兜底（覆盖规则集未收录的国内域名，先于 GEOIP 命中）\n  # 阻止走代理的 QUIC（强制回退 TCP，避免 QUIC 绕过代理 / 被干扰）。\n  # 放在直连规则之后：直连 QUIC（大陆 / 微软 / 苹果）不受影响。如需 Telegram 语音等 UDP，可删除此行。\n  - AND,((DST-PORT,443),(NETWORK,UDP)),REJECT\n\n  # 常用国外服务（统一走一键连接）\n  - RULE-SET,AI,一键连接\n  - RULE-SET,Telegram,一键连接\n  - RULE-SET,Twitter,一键连接\n  - RULE-SET,SocialMedia,一键连接\n  - RULE-SET,Netflix,一键连接\n  - RULE-SET,YouTube,一键连接\n  - RULE-SET,Spotify,一键连接\n  - RULE-SET,TikTok,一键连接\n  - RULE-SET,disney,一键连接\n  - RULE-SET,Google,一键连接\n  - RULE-SET,github,一键连接\n  - RULE-SET,Proxy,一键连接\n\n  # IP规则\n  - RULE-SET,PrivateIP,直接连接,no-resolve\n  - RULE-SET,TelegramIP,一键连接,no-resolve\n  - RULE-SET,ProxyIP,一键连接,no-resolve\n  - RULE-SET,ChinaIP,直接连接,no-resolve\n\n  # 大陆 IP 兜底直连：覆盖规则集未收录的域名 / 纯 IP 连接的大陆应用（GEOIP 库覆盖面更全）\n  - GEOIP,CN,直接连接,no-resolve\n\n  # 兜底规则：其余（国外）走一键连接\n  - MATCH,一键连接\n\n# ==================== 规则集 ====================\n# 规则集行为模板\nBehaviorDN: &BehaviorDN {type: http, behavior: domain, format: mrs, interval: 86400}\nBehaviorDY: &BehaviorDY {type: http, behavior: domain, format: yaml, interval: 86400}\nBehaviorIP: &BehaviorIP {type: http, behavior: ipcidr, format: mrs, interval: 86400}\nClassicalYaml: &ClassicalYaml {type: http, behavior: classical, interval: 3600, format: yaml, proxy: DIRECT}\nBehaviorCL: &BehaviorCL {type: http, behavior: classical, interval: 86400, format: yaml, proxy: DIRECT}   # 经典规则集（blackmatrix7 等，DOMAIN/DOMAIN-SUFFIX/DOMAIN-KEYWORD/PROCESS-NAME）\n\n# 规则提供者（仅保留常用）\nrule-providers:\n  # 广告\n  Tracking:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Tracking.mrs}\n  Advertising:    {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Advertising.mrs}\n  AWAvenueAds:    {<<: *BehaviorDY, url: https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml}\n  # 直连 / 国内\n  Direct:         {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Direct.mrs}\n  Private:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Private.mrs}\n  Download:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Download.mrs}\n  AppleCN:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/AppleCN.mrs}\n  China:          {<<: *BehaviorCL, url: https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMaxNoIP/ChinaMaxNoIP_No_Resolve.yaml}   # 大陆直连全量：ChinaMaxNoIP（11万+ 域名，含大陆可达国际服务），每日更新\n  # 常用国外服务\n  AI:             {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/AI.mrs}\n  Telegram:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Telegram.mrs}\n  Twitter:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Twitter.mrs}\n  SocialMedia:    {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/SocialMedia.mrs}\n  Netflix:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Netflix.mrs}\n  YouTube:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/YouTube.mrs}\n  Google:         {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Google.mrs}\n  Microsoft:      {<<: *BehaviorCL, url: https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml}   # 微软全家桶全量：blackmatrix7（Office/OneDrive/Xbox/Teams/Skype/Bing/Azure 等）\n  Proxy:          {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Proxy.mrs}\n  # 媒体（DustinWin）\n  Spotify:        {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/spotify.mrs}\n  TikTok:         {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/tiktok.mrs}\n  disney:         {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/disney.mrs}\n  # GitHub\n  github:          {<<: *ClassicalYaml, url: https://rule.kelee.one/Clash/GitHub.yaml}\n  # IP规则\n  PrivateIP:      {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Private.mrs}\n  TelegramIP:     {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Telegram.mrs}\n  ProxyIP:        {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Proxy.mrs}\n  ChinaIP:        {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/China.mrs}\n\n# ==================== EOF ====================\n\n'.split("__HOPLINE_SS_PASSWORD__").join(l("ss")).split("__HOPLINE_AUTH_PASSWORD__").join(l("auth")).split("__HOPLINE_API_SECRET__").join(l("api"));return`# Hopline 订阅\ntest-url: 'http://www.gstatic.com/generate_204'\nproxies:\n${s.map(e=>function(e){const t=[];if(t.push("  - name: "+gt(e.name)),t.push("    type: "+e.type),t.push("    server: "+gt(e.server)),t.push("    port: "+e.port),"vless"===e.type?t.push("    uuid: "+gt(e.uuid)):t.push("    password: "+gt(e.password)),t.push("    network: "+e.network),t.push("    udp: true"),e.tls&&(t.push("    tls: true"),t.push("    skip-cert-verify: false"),t.push("    alpn: ["+(e.alpn&&e.alpn.length?e.alpn:"xhttp"===e.network?["h2"]:["http/1.1"]).join(", ")+"]"),t.push("    servername: "+gt(e.servername)),"trojan"===e.type&&t.push("    sni: "+gt(e.servername)),t.push("    client-fingerprint: chrome"),e["ech-opts"]&&(t.push("    ech-opts:"),t.push("      enable: "+gt(e["ech-opts"].enable)),t.push("      query-server-name: "+gt(e["ech-opts"]["query-server-name"])))),"ws"===e.network)t.push("    ws-opts:"),t.push("      path: "+gt(e["ws-opts"].path)),t.push("      headers:"),t.push("        Host: "+gt(e["ws-opts"].headers.Host));else if("xhttp"===e.network){const n=e["xhttp-opts"];t.push("    xhttp-opts:"),t.push("      path: "+gt(n.path)),t.push("      mode: "+gt(n.mode)),t.push("      host: "+gt(n.host)),t.push("      x-padding-obfs-mode: "+gt(n["x-padding-obfs-mode"])),t.push("      x-padding-method: "+gt(n["x-padding-method"])),t.push("      x-padding-placement: "+gt(n["x-padding-placement"])),t.push("      x-padding-header: "+gt(n["x-padding-header"])),t.push("      x-padding-key: "+gt(n["x-padding-key"]))}return t.join("\n")}(e)).join("\n")}\n${c}\n`}function vt(e,t){const n=e.host,r="/"+e.path;if(!e.enableTrojan)throw new Error("Surfboard 只支持 Trojan 节点：请先在「节点配置」中启用 Trojan 协议");const o=t.filter(e=>e.startsWith("trojan://")&&e.indexOf("security=none")<0);if(!o.length)throw new Error("没有可用于 Surfboard 的 Trojan TLS 节点（明文端口节点已被过滤）");const a=o.map((e,t)=>{const{user:o,srv:a,prt:i,name:s}=st(e,t);return`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}, tls=true, skip-cert-verify=false, sni=${n}`});return`#!MANAGED-CONFIG\n[General]\nloglevel = notify\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${a.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${a.map(e=>e.split(" = ")[0]).join(", ")}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, 🚀 节点选择\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}const yt=[["geosite-category-ads-all",null],["geosite-cn","🎯 全球直连"],["geosite-google","🌐 谷歌服务"],["geosite-apple","🍎 苹果服务"],["geosite-microsoft","Ⓜ️ 微软服务"],["geosite-openai","🤖 OpenAI"],["geosite-spotify","🌍 国外媒体"],["geosite-youtube","🌍 国外媒体"],["geosite-netflix","🌍 国外媒体"],["geosite-disney","🌍 国外媒体"],["geosite-twitter","🌍 国外媒体"],["geosite-telegram","🌍 国外媒体"],["geosite-github","🌍 国外媒体"]],xt="https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/";function wt(e,t){const n=e.host,r="/"+e.path,o=Qe(e.alpn),a=new Set,i=t.filter(e=>"xhttp"!==it(e,"type")).map((e,t)=>{const{user:i,srv:s,prt:l,name:c,isTrojan:d,tls:p}=st(e,t);let u=c,f=2;for(;a.has(u);)u=c+"·"+f++;a.add(u);const h=p?{enabled:!0,server_name:n,insecure:!1,alpn:o||["http/1.1"],utls:{enabled:!0,fingerprint:"chrome"}}:{enabled:!1},m=p?{type:"ws",path:r,headers:{Host:n},max_early_data:2048,early_data_header_name:"Sec-WebSocket-Protocol"}:{type:"ws",path:r,headers:{Host:n}};return d?{type:"trojan",tag:u,server:s,server_port:l,password:i,tls:h,transport:m}:{type:"vless",tag:u,server:s,server_port:l,uuid:i,tls:h,transport:m}}),s=i.map(e=>e.tag);if(!s.length)throw new Error("sing-box 官方内核不支持 XHTTP，没有可用节点：请同时启用 VLESS 或 Trojan 协议");const l={log:{level:"info"},dns:{servers:[{type:"https",tag:"dns-remote",server:"1.1.1.1"},{type:"udp",tag:"dns-direct",server:"223.5.5.5"},{type:"fakeip",tag:"dns-fakeip",inet4_range:"198.18.0.0/15"}],rules:[{rule_set:"geosite-cn",server:"dns-direct"},{query_type:["A","AAAA"],server:"dns-fakeip"}],final:"dns-remote",strategy:"ipv4_only"},inbounds:[{type:"mixed",tag:"mixed-in",listen:"127.0.0.1",listen_port:2080},{type:"tun",tag:"tun-in",interface_name:"tun0",address:["172.19.0.1/30"],mtu:9e3,auto_route:!0,strict_route:!0}],outbounds:[{type:"selector",tag:"🚀 节点选择",outbounds:s},{type:"selector",tag:"🎯 全球直连",outbounds:["direct"]},{type:"selector",tag:"🐟 漏网之鱼",outbounds:["🚀 节点选择","🎯 全球直连"]},{type:"selector",tag:"🌍 国外媒体",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🌐 谷歌服务",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🤖 OpenAI",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🍎 苹果服务",outbounds:["🎯 全球直连","🚀 节点选择"]},{type:"selector",tag:"Ⓜ️ 微软服务",outbounds:["🎯 全球直连","🚀 节点选择"]},...i,{type:"direct",tag:"direct"}],route:{rules:[{action:"sniff"},{protocol:"dns",action:"hijack-dns"},{ip_is_private:!0,outbound:"direct"},...yt.map(([e,t])=>t?{rule_set:e,outbound:t}:{rule_set:e,action:"reject"}),{rule_set:"geoip-cn",outbound:"direct"}],rule_set:[...yt.map(([e])=>({type:"remote",tag:e,format:"binary",url:xt+e.replace("geosite-","geosite/")+".srs",download_detour:"direct"})),{type:"remote",tag:"geoip-cn",format:"binary",url:xt+"geoip/cn.srs",download_detour:"direct"}],final:"🐟 漏网之鱼",auto_detect_interface:!0,default_domain_resolver:"dns-direct"},experimental:{clash_api:{external_controller:"127.0.0.1:9090"},cache_file:{enabled:!0,store_fakeip:!0}}};return JSON.stringify(l,null,2)}function kt(e,t){const n=e.filter(e=>"xhttp"!==it(e,"type"));if(!n.length)throw new Error(t+" 不支持 XHTTP，没有可用节点：请同时启用 VLESS 或 Trojan 协议");return n}function St(e,t){t=kt(t,"Surge");const n=e.host,r="/"+e.path,o=t.map((e,t)=>{const{user:o,srv:a,prt:i,name:s,isTrojan:l,tls:c}=st(e,t),d=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${d}`:`${s} = vless, ${a}, ${i}, username=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${d}`});return`#!MANAGED-CONFIG\n[General]\nloglevel = notify\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${o.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${o.map(e=>e.split(" = ")[0]).join(", ")}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, 🚀 节点选择\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function Ct(e,t){t=kt(t,"Loon");const n=e.host,r="/"+e.path,o=t.map((e,t)=>{const{user:o,srv:a,prt:i,name:s,isTrojan:l,tls:c}=st(e,t),d=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${d}`:`${s} = vless, ${a}, ${i}, username=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${d}`}),a=o.map(e=>e.split(" = ")[0]).join(", ");return`[General]\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${o.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${a}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, ${a}\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function Et(e,t){t=kt(t,"Quantumult X");const n=e.host,r="/"+e.path,o=e=>e.indexOf(":")>=0?"["+e+"]":e,a=t.map((e,t)=>{const{user:a,srv:i,prt:s,name:l,tls:c}=st(e,t);return e.startsWith("trojan://")?c?`trojan=${o(i)}:${s}, password=${a}, over-tls=true, tls-host=${n}, obfs=wss, obfs-host=${n}, obfs-uri=${r}, tls-verification=true, tag=${l}`:`trojan=${o(i)}:${s}, password=${a}, over-tls=false, obfs=ws, obfs-host=${n}, obfs-uri=${r}, tag=${l}`:`vless=${o(i)}:${s}, method=none, password=${a}, obfs=${c?"wss":"ws"}, obfs-host=${n}, obfs-uri=${r}${c?", tls-verification=true, tls13=true":""}, tag=${l}`}),i=t.map((e,t)=>{const n=e.indexOf("#");if(n<0)return`节点${t+1}`;try{return decodeURIComponent(e.slice(n+1))||`节点${t+1}`}catch(e){return`节点${t+1}`}}).join(", ");return`[general]\nnetwork_check_url=http://www.gstatic.com/generate_204\nserver_check_url=http://www.gstatic.com/generate_204\ndns_exclusion_list=*.cmpassport.com, *.qq.com, *.weibo.com, *.icloud.com\n[dns]\nserver=223.5.5.5\nserver=119.29.29.29\n[server_local]\n${a.join("\n")}\n[policy]\nstatic=🚀 节点选择, ${i}, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png\nstatic=🌐 全球直连, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png\nstatic=🐟 漏网之鱼, 🚀 节点选择, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png\n[filter_local]\ngeoip, cn, 🌐 全球直连\nfinal, 🐟 漏网之鱼\n`}const Tt=500;const Pt=String.raw`
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hopline · Cloudflare 代理订阅面板</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='3' y='3' width='18' height='18' rx='5' fill='%232563eb'/%3E%3Cpath d='M8 15V9l8 6V9' stroke='%23ffffff' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js" integrity="sha384-8FWZA6BGMXhsfO+BLtrJK0We6gg5o1JyO8xQm6peWDEUs17ACA5ziE/NIAkl9z2k" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  
  --bg:#f6f7fb;--bg2:#eef1f6;--card:#ffffff;--card2:#f8fafc;--border:#e4e7ee;
  --text:#0f172a;--dim:#64748b;--faint:#94a3b8;
  --accent:#2563eb;--accent2:#3b82f6;--accent-dim:rgba(37,99,235,.10);
  --accent-strong:#1d4ed8;--accent-text:#1d4ed8;--on-accent:#ffffff;
  --ok:#059669;--ok-dim:rgba(5,150,105,.10);--err:#dc2626;--err-dim:rgba(220,38,38,.08);--warn:#d97706;
  --sb-bg:#ffffff;--sb-text:#475569;--sb-dim:#94a3b8;--sb-border:#e9edf3;
  --sb-active-bg:rgba(37,99,235,.08);--sb-active-text:#1d4ed8;--sb-active-bar:#2563eb;
  --topbar-bg:rgba(246,247,251,.85);
  --shadow:0 1px 2px rgba(15,23,42,.04),0 8px 24px rgba(15,23,42,.06);
  --card-shadow:0 1px 2px rgba(15,23,42,.04),0 1px 3px rgba(15,23,42,.03);
}
[data-theme="dark"]{
  --bg:#0b1120;--bg2:#0f172a;--card:#111827;--card2:#1a2233;--border:#243044;
  --text:#e5e9f0;--dim:#94a3b8;--faint:#64748b;
  --accent:#3b82f6;--accent2:#60a5fa;--accent-dim:rgba(59,130,246,.16);
  --accent-strong:#2563eb;--accent-text:#93c5fd;--on-accent:#ffffff;
  --ok:#34d399;--ok-dim:rgba(52,211,153,.13);--err:#f87171;--err-dim:rgba(248,113,113,.13);--warn:#fbbf24;
  --sb-bg:#0d1424;--sb-text:#94a3b8;--sb-dim:#64748b;--sb-border:#1c2638;
  --sb-active-bg:rgba(59,130,246,.14);--sb-active-text:#93c5fd;--sb-active-bar:#3b82f6;
  --topbar-bg:rgba(11,17,32,.85);
  --shadow:0 10px 30px rgba(0,0,0,.35);
  --card-shadow:none;
}
html,body{height:100%}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;font-size:14px;line-height:1.55}
.app{display:flex;min-height:100vh}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}


.sidebar{width:236px;flex:0 0 236px;background:var(--sb-bg);border-right:1px solid var(--sb-border);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;z-index:50;transition:background .25s,border-color .25s}
.brand{display:flex;align-items:center;gap:10px;padding:18px 18px 14px}
.mark{width:34px;height:34px;border-radius:9px;background:var(--accent);display:flex;align-items:center;justify-content:center;flex:0 0 34px;box-shadow:0 4px 12px var(--accent-dim)}
.mark svg{width:18px;height:18px}
.mark path{stroke:var(--on-accent)}
.brand .bt{display:flex;flex-direction:column;line-height:1.2}
.brand .bt b{font-size:15px;letter-spacing:.3px;color:var(--text)}
.brand .bt span{font-size:11px;color:var(--sb-dim)}
.nav{flex:1;padding:6px 10px 12px;overflow-y:auto}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;margin:2px 0;border-radius:8px;color:var(--sb-text);cursor:pointer;border:none;background:transparent;width:100%;text-align:left;font-size:13.5px;position:relative;transition:background .15s,color .15s}
.nav-item svg{width:17px;height:17px;flex:0 0 17px;stroke:currentColor}
.nav-item:hover{background:var(--sb-active-bg);color:var(--sb-active-text)}
.nav-item.on{background:var(--sb-active-bg);color:var(--sb-active-text);font-weight:600}
.nav-item.on::before{content:"";position:absolute;left:-10px;top:8px;bottom:8px;width:3px;border-radius:0 3px 3px 0;background:var(--sb-active-bar)}
.side-foot{padding:12px 18px;border-top:1px solid var(--sb-border);display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--sb-dim)}
.ver-chip{font-family:ui-monospace,Consolas,monospace;background:var(--accent-dim);color:var(--sb-active-text);padding:2px 8px;border-radius:6px;font-size:11px;border:1px solid transparent;cursor:pointer;transition:border-color .15s,color .15s,background .15s}
.ver-chip:hover{color:var(--accent);border-color:var(--accent)}
.ver-chip.has-update{color:var(--accent);background:var(--accent-dim);border-color:var(--accent)}
.ver-chip.checking{opacity:.7;pointer-events:none}


.main{flex:1;min-width:0;display:flex;flex-direction:column}
.topbar{display:flex;align-items:center;gap:14px;padding:14px 26px;border-bottom:1px solid var(--border);background:var(--topbar-bg);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);position:sticky;top:0;z-index:40}
.topbar-title{flex:1;min-width:0}   
.topbar-title h1{font-size:17px;font-weight:700;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topbar-title p{color:var(--dim);font-size:12.5px;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:4px 10px;border-radius:20px;background:var(--ok-dim);color:var(--ok);white-space:nowrap}
.pill.off{background:var(--err-dim);color:var(--err)}
.pill .dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.icon-btn{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 34px}
.icon-btn:hover{border-color:var(--accent);color:var(--accent)}
.icon-btn svg{width:16px;height:16px;stroke:currentColor}
.hamb{display:none}
.wdwarn{display:none;background:var(--accent-dim);border-bottom:1px solid var(--border);color:var(--accent-text);padding:9px 26px;font-size:12.5px;line-height:1.6;text-align:center}

.content{padding:22px 26px 96px;max-width:1180px;width:100%;margin:0 auto}
.view{display:none}
.view.on{display:block;animation:fade .18s ease}
@keyframes fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}


.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}
.filter-region{display:flex;align-items:center;gap:14px;padding:2px 0 14px;border-bottom:1px solid var(--border);margin-bottom:14px;flex-wrap:wrap}
.filter-region-label{font-size:13px;font-weight:600;white-space:nowrap}
.filter-row{display:flex;flex-wrap:wrap}
.filter-group{flex:0 1 auto;min-width:180px;padding:0 14px;border-left:1px solid var(--border)}
.filter-group:first-child{border-left:none;padding-left:0}
.filter-group-title{font-size:12px;font-weight:600;color:var(--dim);margin-bottom:9px;letter-spacing:.3px}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pills.nowrap{flex-wrap:nowrap;white-space:nowrap}
.pills.nowrap .spill span{padding:5px 10px;font-size:12px}
.spill input{position:absolute;opacity:0;pointer-events:none}
.spill span{display:inline-block;padding:5px 14px;border:1px solid var(--border);border-radius:999px;font-size:12.5px;color:var(--dim);cursor:pointer;background:var(--card);transition:border-color .15s,color .15s,background .15s;user-select:none;line-height:1.5}
.spill:hover span{border-color:var(--accent);color:var(--accent)}
.spill input:checked + span{background:var(--accent);border-color:var(--accent);color:var(--on-accent);font-weight:600;border-radius:999px}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:16px;box-shadow:var(--card-shadow)}
.card h3{font-size:14px;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.card h3 .tick{width:3px;height:14px;border-radius:2px;background:var(--accent)}
.card .sub{font-size:12px;color:var(--dim);font-weight:400;margin-left:auto}
.kv{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed var(--border);font-size:13px}
.kv:last-child{border-bottom:none}
.kv .k{color:var(--dim);white-space:nowrap}
.kv .v{text-align:right;word-break:break-all;font-family:ui-monospace,Consolas,monospace;font-size:12.5px}
.kv .v.ok{color:var(--ok)}.kv .v.bad{color:var(--err)}


.field{margin-bottom:12px}
.field>label{display:block;font-size:12.5px;color:var(--dim);margin-bottom:6px;font-weight:500}
input[type=text],input[type=password],input[type=number],select,textarea{
  width:100%;background:var(--card2);border:1px solid var(--border);color:var(--text);
  border-radius:8px;padding:8px 11px;font-size:13.5px;outline:none;transition:border-color .15s,box-shadow .15s;
  font-family:inherit;
}
input:focus,select:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-dim)}
textarea{resize:vertical;line-height:1.5;font-family:ui-monospace,Consolas,monospace;font-size:12.5px}
select{cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:30px}
[data-theme="dark"] select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")}
input[type=checkbox]{accent-color:var(--accent);width:15px;height:15px;cursor:pointer}
.hint{font-size:12px;color:var(--dim);margin-top:6px;line-height:1.6}

input.invalid,select.invalid,textarea.invalid{border-color:var(--err)!important;box-shadow:0 0 0 3px var(--err-dim)}
.switch input.invalid+.sl,.spill input.invalid+span{outline:2px solid var(--err);outline-offset:2px}
.field-err{font-size:12px;color:var(--err);margin-top:6px;line-height:1.5}
.env-lock{color:var(--warn)}
.ipt-out{margin-top:12px;border:1px solid var(--border);border-radius:10px;padding:12px 14px;background:var(--card2)}
.ipt-out .ipt-head{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;font-size:13px;margin-bottom:8px}
.ipt-out .ipt-head b{font-size:13.5px}
.ipt-out .ipt-ok{color:var(--ok)}.ipt-out .ipt-err{color:var(--err)}
.ipt-out .ipt-dim{color:var(--dim);font-size:12px}
.ipt-out pre.code{margin-top:6px;max-height:240px}
.ipt-out details{margin-top:8px}
.ipt-out summary{cursor:pointer;font-size:12.5px;color:var(--dim)}
input:disabled,select:disabled,textarea:disabled{opacity:.6;cursor:not-allowed}
.inrow{display:flex;gap:8px;align-items:flex-start}
.inrow>div{flex:1}
.inrow .btn{margin-top:1px;white-space:nowrap}
.proto-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px dashed var(--border);font-size:13.5px}
.proto-row:last-child{border-bottom:none}


.switch{position:relative;display:inline-block;width:40px;height:22px;flex:0 0 40px}
.switch input{opacity:0;width:0;height:0}
.sl{position:absolute;inset:0;background:var(--border);border-radius:22px;cursor:pointer;transition:background .18s}
.sl::before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform .18s}
.switch input:checked+.sl{background:var(--accent)}
.switch input:checked+.sl::before{transform:translateX(18px)}


.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--border);background:var(--card2);color:var(--text);border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer;transition:border-color .15s,background .15s,transform .05s;font-family:inherit;white-space:nowrap}
.btn:hover{border-color:var(--accent);color:var(--accent)}
.btn:active{transform:translateY(1px)}
.btn:disabled{opacity:.55;cursor:not-allowed}
.btn.primary{background:var(--accent);border-color:transparent;color:var(--on-accent);font-weight:600}
.btn.primary:hover{background:var(--accent-strong);color:var(--on-accent)}
.btn.danger{background:var(--err-dim);border-color:transparent;color:var(--err)}
.btn.danger:hover{border-color:var(--err)}
.btn.sm{padding:4px 10px;font-size:12px;border-radius:6px}
.btn .dirty-dot{display:none;width:6px;height:6px;border-radius:50%;background:var(--warn)}
.btn.dirty .dirty-dot{display:inline-block}
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.row .grow{flex:1;min-width:140px}


.tbl-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th,td{text-align:left;padding:9px 10px;font-size:13px;border-bottom:1px solid var(--border);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
th{color:var(--dim);font-weight:500;font-size:12px;background:var(--card2)}
td .ip{font-family:ui-monospace,Consolas,monospace;font-size:12.5px}
.mono{font-family:ui-monospace,Consolas,monospace;font-size:12.5px}


pre.code{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:11.5px;line-height:1.55;font-family:ui-monospace,Consolas,monospace;overflow:auto;max-height:260px;white-space:pre-wrap;word-break:break-all;color:var(--dim)}


.fbar{position:fixed;right:22px;bottom:22px;display:flex;gap:10px;z-index:60;align-items:center}
.fbar .btn{box-shadow:var(--shadow)}
.saved-at{font-size:11.5px;color:var(--faint);background:var(--card);border:1px solid var(--border);border-radius:8px;padding:5px 10px;box-shadow:var(--shadow);white-space:nowrap}
.toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(80px);background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 20px;border-radius:10px;font-size:13px;opacity:0;transition:all .25s;z-index:100;box-shadow:var(--shadow);pointer-events:none;max-width:86vw}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
.toast.ok{border-color:var(--ok);color:var(--ok)}
.toast.err{border-color:var(--err);color:var(--err)}
.toast.warn{border-color:var(--warn);color:var(--warn)}


.danger-zone{border:1px solid var(--err);border-radius:12px;padding:16px;background:var(--err-dim)}
.qrbox{display:flex;justify-content:center;padding:12px 0 4px}
.qrbox img{width:168px;height:168px;image-rendering:pixelated;border-radius:8px}
.note-box{background:var(--card2);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:8px;padding:12px 14px;font-size:12.5px;color:var(--dim);line-height:1.7;margin-bottom:12px}
.steps{list-style:none;counter-reset:st}
.steps li{counter-increment:st;position:relative;padding:0 0 14px 34px;font-size:13px;color:var(--dim)}
.steps li::before{content:counter(st);position:absolute;left:0;top:0;width:22px;height:22px;border-radius:50%;background:var(--accent-dim);color:var(--accent-text);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:700}
.steps li b{color:var(--text)}


@media (max-width:960px){
  .sidebar{position:fixed;left:0;top:0;transform:translateX(-100%);transition:transform .22s ease;box-shadow:var(--shadow)}
  .sidebar.open{transform:translateX(0)}
  .hamb{display:flex}
  .content{padding:16px 16px 96px}
  .topbar{padding:10px 16px}
  .topbar-title h1{font-size:16px}
  .topbar-title p{font-size:12px}
  .grid2,.grid3{grid-template-columns:1fr}
}
@media (max-width:560px){
  th,td{padding:8px 8px}
}


.tabs{display:flex;gap:4px;border-bottom:1px solid var(--border);margin-bottom:12px}
.tab{background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;padding:8px 12px;font:inherit;font-size:13px;color:var(--dim);cursor:pointer}
.tab:hover{color:var(--text)}
.tab.on{color:var(--accent);border-bottom-color:var(--accent);font-weight:600}
.node-list{border:1px solid var(--border);border-radius:8px;max-height:420px;overflow:auto}
.node-row{display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border)}
.node-row:last-child{border-bottom:0}
.node-row .nm{flex:1;min-width:0}
.node-row .nm b{display:block;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.node-row .nm span{display:block;font-size:11.5px;color:var(--dim);font-family:ui-monospace,Consolas,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.node-row .btn{flex:0 0 auto}
.ptag{flex:0 0 auto;min-width:54px;text-align:center;font-size:11px;font-weight:600;padding:2px 7px;border-radius:5px;background:var(--accent-dim);color:var(--accent)}
.ptag.trojan{background:var(--ok-dim);color:var(--ok)}
.ptag.xhttp{background:rgba(217,119,6,.13);color:var(--warn)}
.node-empty{padding:18px;text-align:center;color:var(--dim);font-size:13px}
.modal{display:none;position:fixed;inset:0;z-index:90;background:rgba(15,23,42,.45);align-items:center;justify-content:center;padding:16px}
.modal.show{display:flex}
.modal-card{background:var(--card);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow);padding:16px;width:100%;max-width:360px}
.modal-head{display:flex;align-items:center;gap:10px}
.modal-head b{flex:1;min-width:0;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.modal .qrbox img{width:auto;height:auto;max-width:100%;background:#fff}
.modal pre.code{max-height:96px;margin-top:8px}
</style>
</head>
<body>
<div class="app">


<aside class="sidebar" id="sidebar">
  <div class="brand">
    <div class="mark"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4l3-7 4 14 3-7h2"/></svg></div>
    <div class="bt"><b>Hopline</b><span>Cloudflare 代理订阅面板</span></div>
  </div>
  <nav class="nav" id="nav"></nav>
  <div class="side-foot">
    <span>部署版本</span>
    <span class="ver-chip" id="sideVer" title="点击检测更新" onclick="checkUpdate()">v—</span>
  </div>
</aside>


<div class="main">
  <div class="topbar">
    <button class="icon-btn hamb" id="hamb" title="菜单"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <div class="topbar-title"><h1 id="pageTitle"></h1><p id="pageSub"></p></div>
    <span class="pill" id="connPill"><span class="dot"></span><span id="connText">连接中</span></span>
    <button class="icon-btn" id="themeBtn" title="切换日间 / 夜间"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path id="themeIcon" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
  </div>
  <div class="wdwarn" id="wdwarn">当前运行在 *.workers.dev 域名上：订阅与节点下发功能正常；若遇连接不稳或访问受限，建议在 Cloudflare 面板绑定自定义域名后使用。</div>

  <div class="content">
    
    <section class="view" data-view="dashboard" data-title="仪表盘" data-sub="快速开始、订阅管理与运行状态">
      <div class="card">
        <h3><span class="tick"></span>快速开始</h3>
        <ol class="steps">
          <li><b>部署即用</b>：绑定域名后客户端订阅即可获得一批 Cloudflare 优选节点（优选域名与在线优选 IP 来源）；Clash / Mihomo 与 Sing-box 订阅已内置大陆直连分流规则（大陆应用、微软、苹果直连，国外服务走代理）。</li>
          <li><b>调优节点</b>：用本地工具（如 CloudflareSpeedTest）在自己的网络下测速，把最优 IP 列表托管成一个地址（纯 IP 行 / CSV），填入「优选配置 → 优选 IP 来源」的自定义优选 API；也可以在「优选配置 → 优选域名」换成自己的优选域名。</li>
          <li><b>检查来源</b>：在「优选配置 → 优选 IP 来源」开关各在线来源，点「测试」可立即查看该来源实时拉取到的 IP；单次订阅最多下发 500 个节点，保证在免费计划 10ms CPU 限制内稳定生成。</li>
        </ol>
      </div>
      <div class="card">
        <h3><span class="tick"></span>订阅地址</h3>
        <div class="row" style="margin-bottom:12px">
          <div class="field grow" style="margin:0"><label>订阅格式</label>
            <select id="subFmt">
              <option value="auto">自动识别</option>
              <option value="clash">Clash / Mihomo</option>
              <option value="singbox">Sing-box</option>
              <option value="surge">Surge</option>
              <option value="surfboard">Surfboard</option>
              <option value="loon">Loon</option>
              <option value="quanx">Quantumult X</option>
              <option value="v2ray">v2rayN / Shadowrocket</option>
              <option value="stash">Stash</option>
              <option value="plain">明文节点链接</option>
            </select>
          </div>
        </div>
        <div class="field"><label>订阅链接</label>
          <div class="inrow">
            <input type="text" id="subUrl" readonly onclick="this.select()">
            <button class="btn sm" onclick="copySub()">复制</button>
            <button class="btn sm" onclick="toggleQR()">二维码</button>
            <button class="btn sm" onclick="downloadSub()">下载</button>
            <button class="btn sm primary" onclick="previewSub()">预览</button>
          </div>
        </div>
        <div id="qrWrap" style="display:none"></div>
        <p class="hint" style="margin-top:12px" id="subHint"></p>
        <div id="subPrev" style="display:none;margin-top:12px">
          <div class="tabs" role="tablist">
            <button class="tab" id="prevTabList" role="tab" onclick="prevTab('list')">节点列表</button>
            <button class="tab" id="prevTabRaw" role="tab" onclick="prevTab('raw')">原始内容</button>
          </div>
          <div id="prevList">
            <input type="text" id="nodeSearch" placeholder="搜索名称 / 地址 / 协议，如 香港、XHTTP" autocomplete="off" oninput="renderNodeList()">
            <p class="hint" style="margin:8px 0 10px">单个节点可用 v2rayN / v2rayNG / Shadowrocket / NekoBox 等从剪贴板或二维码导入。单个节点不会随订阅更新（优选 IP 变化后需重新导入）；链接中含 UUID，请勿外传。</p>
            <div class="node-list" id="nodeList"></div>
          </div>
          <div id="prevRaw">
            <div class="kv"><span class="k">订阅类型</span><span class="v" id="prevType">—</span></div>
            <div class="kv"><span class="k">节点数量</span><span class="v" id="prevCount">—</span></div>
            <pre class="code" id="prevBody" style="margin-top:10px"></pre>
          </div>
        </div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>地区与线路筛选</h3>
        <div class="filter-region">
          <span class="filter-region-label">节点地区</span>
          <div class="pills">
            <label class="spill"><input type="checkbox" id="fl-region-all" checked><span>全部地区</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-HK"><span>香港</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-TW"><span>台湾</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-US"><span>美国</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-SG"><span>新加坡</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-JP"><span>日本</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-KR"><span>韩国</span></label>
            <label class="spill"><input type="checkbox" id="fl-region-DE"><span>德国</span></label>
          </div>
        </div>
        <div class="filter-row">
          <div class="filter-group">
            <div class="filter-group-title">IP 类型</div>
            <div class="pills">
              <label class="spill"><input type="checkbox" id="fl-ip4" checked><span>IPv4</span></label>
              <label class="spill"><input type="checkbox" id="fl-ip6"><span>IPv6</span></label>
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-group-title">运营商偏好</div>
            <div class="pills">
              <label class="spill"><input type="checkbox" id="fl-isp-m" checked><span>移动</span></label>
              <label class="spill"><input type="checkbox" id="fl-isp-c" checked><span>联通</span></label>
              <label class="spill"><input type="checkbox" id="fl-isp-t" checked><span>电信</span></label>
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-group-title">地址来源</div>
            <div class="pills nowrap">
              <label class="spill"><input type="checkbox" id="fl-native"><span>原生地址</span></label>
              <label class="spill"><input type="checkbox" id="fl-pref-domain" checked><span>优选域名</span></label>
              <label class="spill"><input type="checkbox" id="fl-pref-ip" checked><span>优选 IP</span></label>
            </div>
          </div>
        </div>
        <p class="hint" style="margin-top:12px">筛选后若没有节点，会按 运营商 → IP 类型 → 地区 的顺序逐级放宽条件，保证订阅始终非空。「运营商偏好」按节点名称中的运营商标记过滤（移动=移动/CM/CHINAMOBILE、联通=联通/CU/UNICOM、电信=电信/CT/CHINATELECOM），只剔除标记为未勾选运营商的节点，不带运营商标记的通用节点保留；HostMonit / uouin 实时优选节点带运营商标记（如「移动-01」）。「节点地区」支持多选，仅剔除节点名称明确标记为其它地区的节点；默认节点来源均为不带地区的 Cloudflare 任播 IP / 域名（任播 IP 的落地机房取决于你所在的网络），地区筛选通常不改变节点构成；自定义优选 API 返回的节点名带地区时才会按地区筛选。「地址来源」控制下发节点的来源：原生地址（工作器域名）、优选域名（「优选配置 → 优选域名」，留空用内置列表）、优选 IP（HostMonit / uouin / 自定义优选 API）。</p>
      </div>
      <div class="card">
        <h3><span class="tick"></span>运行状态</h3>
        <div class="kv"><span class="k">协议</span><span class="v" id="stProto">—</span></div>
        <div class="kv"><span class="k">KV 持久化</span><span class="v" id="stKv">—</span></div>
        <div class="kv"><span class="k">面板入口</span><span class="v" id="stEntry">—</span></div>
      </div>
    </section>

    
    <section class="view" data-view="nodes" data-title="节点配置" data-sub="代理协议、TLS/ECH 与落地出站（保存后立即生效）">
      <div class="grid3">
        <div class="card">
          <h3><span class="tick"></span>协议开关</h3>
          <div class="proto-row"><label class="switch"><input type="checkbox" id="en-vless" checked><span class="sl"></span></label><span>VLESS 协议（默认开启）</span></div>
          <div class="proto-row"><label class="switch"><input type="checkbox" id="en-trojan"><span class="sl"></span></label><span>Trojan 协议</span></div>
          <div class="proto-row"><label class="switch"><input type="checkbox" id="en-xhttp" checked><span class="sl"></span></label><span>XHTTP 协议（需 Mihomo / Xray 内核，Sing-box、Surge 等不支持；须绑定自定义域名并开启gRPC）</span></div>
          <div class="field" style="margin-top:12px"><label>Trojan 密码（留空使用 UUID）</label><input type="text" id="tp-pass" placeholder="Trojan 密码" autocomplete="off"></div>
        </div>
        <div class="card">
          <h3><span class="tick"></span>TLS 与传输</h3>
          <div class="proto-row"><label class="switch"><input type="checkbox" id="tls-only"><span class="sl"></span></label><span>仅 TLS 端口（跳过 80/8080 等明文端口）</span></div>
          <div class="field" style="margin-top:12px"><label>ALPN 协商（h2 / http/1.1，逗号分隔）</label><input type="text" id="alpn" placeholder="留空自动，如 h2,http/1.1" autocomplete="off"></div>
          <p class="hint">默认开启：只下发 TLS 端口节点。关闭后，每个 443 节点另追加一个 80 明文端口节点（名称带「·80」），来源中自带的 8080 / 2052 等明文端口也原样下发。明文节点不加密 UUID 与 Host，更容易被识别封锁；自定义域名还需在 Cloudflare 关闭「始终使用 HTTPS」，否则明文节点无法连接。开启 ECH 时始终只下发 TLS 端口节点。</p>
        </div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>ECH 加密（可选）</h3>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ech-on"><span class="sl"></span></label><span>启用 ECH 加密（需绑定自定义域名）</span></div>
        <div class="grid2" style="margin-top:12px">
          <div class="field" style="margin-bottom:0"><label>ECH 域名（留空用默认 cloudflare-ech.com）</label><input type="text" id="ech-host" placeholder="cloudflare-ech.com" autocomplete="off"></div>
          <div class="field" style="margin-bottom:0"><label>自定义 ECH DNS（DoH 地址，留空使用 https://223.5.5.5/dns-query）</label><input type="text" id="ech-dns" placeholder="https://223.5.5.5/dns-query" autocomplete="off"></div>
        </div>
        <p class="hint">开启后，链接类订阅（v2rayN / Shadowrocket 等）的 TLS 节点附带 ech 参数，Clash 订阅附带 ech-opts；Sing-box、Surge、Loon、Quantumult X 订阅不含 ECH。客户端需支持 ECH 才能生效。</p>
      </div>
      <div class="card">
        <h3><span class="tick"></span>落地与出站</h3>
        <div class="field"><label>反代 / 落地 IP（填写后作为固定出口优先使用；留空则直连失败后由地区反代兜底（见下方「内置地区反代」），格式 host 或 host:port）</label><input type="text" id="s-proxyIP" placeholder="留空则直连失败后走地区反代" autocomplete="off"></div>
        <div class="field"><label>出站代理（可选）</label><input type="text" id="s-outbound" placeholder="socks5://user:pass@1.2.3.4:1080 或 ss://chacha20-ietf-poly1305:密码@1.2.3.4:8388" autocomplete="off"></div>
        <p class="hint">支持 socks5://（可带 user:pass@）、http(s)://、ss:// 或 host:port（默认按 socks5，端口 1080）。SS 加密支持 aes-128-gcm / aes-256-gcm / chacha20-ietf-poly1305。未填写出站代理时，三种出站方式都按直连处理。</p>
        <div class="field" style="margin-bottom:0"><label>出站方式</label>
          <select id="s-outmode">
            <option value="">默认（先走代理，失败后直连 / 地区反代）</option>
            <option value="no">直连 / 地区反代优先，都不通再走代理（no）</option>
            <option value="only">仅走代理，失败后只用地区反代、不直连（only）</option>
          </select>
        </div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>内置地区反代</h3>
        <p class="hint" style="margin-top:0">直连不通（例如目标站同在 Cloudflare 上）时，Worker 会把 TLS 流量交给地区反代按 SNI 转发，并与直连并发竞速。反代是第三方服务器，能看到目标域名与连接元数据；不想经第三方时选「关闭」，或改用自己的反代。非 TLS 流量不会走地区反代。</p>
        <div class="field"><label>地区反代模式</label>
          <select id="rl-mode" onchange="onRelayMode()">
            <option value="builtin">内置（proxyip.*.cmliussss.net，按 Worker 机房自动选地区）</option>
            <option value="custom">仅使用我的反代列表</option>
            <option value="off">关闭（只直连 / 出站代理）</option>
          </select>
        </div>
        <div id="rl-builtin-box">
          <div class="inrow">
            <div class="field" style="flex:1;margin-bottom:0"><label>首选地区（取 2 个 IP）</label><select id="rl-region"></select></div>
            <div class="field" style="flex:1;margin-bottom:0"><label>次选地区（取 1 个 IP）</label><select id="rl-region2"></select></div>
          </div>
          <div class="hint">首选留空 = 按 Worker 所在机房自动选择；次选留空 = 默认的另一地区（首选为 HK 时用 US，否则用 HK），选「不使用」则只用首选地区。</div>
        </div>
        <div class="field" id="rl-custom-box" style="margin-bottom:0">
          <label>自定义反代列表（每行一个 host 或 host:port，最多 3 个，IPv6 需加方括号）</label>
          <textarea id="rl-custom" rows="3" placeholder="proxyip.example.com&#10;203.0.113.10:443" autocomplete="off"></textarea>
          <div class="hint">域名按 TXT / A 记录解析（与「反代 / 落地 IP」相同，缓存 5 分钟）；多个条目并发竞速。「反代 / 落地 IP」仍然优先于这里。</div>
        </div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>保存与生效</h3>
        <div class="note-box" style="margin:0">所有配置修改后点击右下角「保存全部」才会写入 KV 并生效，保存成功后本机房立即生效，其它机房最多约 1 分钟后同步；「重置」将清空 KV 中保存的全部面板配置并还原为初始部署状态。</div>
      </div>
    </section>

    
    <section class="view" data-view="optimizer" data-title="优选配置" data-sub="优选域名与优选 IP 来源">
      <div class="card">
        <h3><span class="tick"></span>优选域名</h3>
        <div class="field"><label>优选域名列表（每行一个纯主机名；留空 = 使用内置列表）</label>
          <textarea id="o-prefdomains" rows="6" placeholder="cf.example.com&#10;cdn.example.org" autocomplete="off" spellcheck="false"></textarea>
          <div class="hint">填写后<b>整体替换</b>内置列表（不是追加）。用于「地址来源 → 优选域名」下发的域名节点和 IPv6 解析。只填主机名，不含 http://、端口、路径或通配符，最多 30 个；IP 地址请放到「优选 IP 来源」的自定义优选 API 里。</div>
        </div>
        <div class="proto-row">
          <span class="hint" id="pd-count" style="margin:0">—</span>
          <span style="flex:1"></span>
          <button type="button" class="btn sm" onclick="loadBuiltinDomains()">载入内置列表</button>
          <button type="button" class="btn sm" id="ps-test-domains" onclick="testIpSource('domains')">测试</button>
        </div>
        <p class="hint">每个域名的运营方都能通过 SNI 看到你的 Worker 主机名，只使用你信任的域名。测试会解析前 25 个域名，看它们是否落在 Cloudflare 段（占用同样数量的子请求，仅管理员手动触发）。IPv6 解析：同时勾选 IPv4 与 IPv6 时只解析前 12 个域名，仅勾选 IPv6 时解析前 25 个；其余仍作为域名节点下发。</p>
        <div id="pd-test-out" class="ipt-out" style="display:none"></div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>优选 IP 来源</h3>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ps-hostmonit"><span class="sl"></span></label><span>HostMonit 实时优选（按移动 / 联通 / 电信分线路实测，节点名如「移动-01」）</span><span style="flex:1"></span><button type="button" class="btn sm" id="ps-test-hostmonit" onclick="testIpSource('hostmonit')">测试</button></div>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ps-uouin"><span class="sl"></span></label><span>uouin 分线路优选（电信 / 联通 / 移动 / 多线 / IPv6，节点名如「电信-U01」）</span><span style="flex:1"></span><button type="button" class="btn sm" id="ps-test-uouin" onclick="testIpSource('uouin')">测试</button></div>
        <p class="hint" style="margin:4px 0 10px">uouin 使用的是对方网站的内部接口（非开放 API），对方可能随时更换签名或封禁，届时该来源静默失效、由其它来源兜底；默认开启，如不需要可关闭。</p>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ps-wetest"><span class="sl"></span></label><span>微测网优选（wetest.vip：移动 / 联通 / 电信各 5 个，IPv4 与 IPv6 各一页，节点名如「移动-W01」「移动-W6-01」）</span><span style="flex:1"></span><button type="button" class="btn sm" id="ps-test-wetest" onclick="testIpSource('wetest')">测试</button></div>
        <p class="hint" style="margin:4px 0 10px">微测网读取的是对方的公开页面（HTML 表格，非开放 API），约每 15 分钟更新；版式变化或不可达时该来源静默失效、由其它来源兜底。默认关闭；只拉取当前「IP 类型」筛选需要的页面（IPv4 / IPv6 各占 1 个子请求）。</p>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ps-api1-on"><span class="sl"></span></label><span>自定义优选 API 1</span><span style="flex:1"></span><button type="button" class="btn sm" id="ps-test-api1" onclick="testIpSource('api1')">测试</button></div>
        <div class="field"><input type="text" id="ps-api1-url" placeholder="https://example.com/ips.txt（纯 IP 行 / CSV / HTML 线路表 / base64 订阅 / sub://）" autocomplete="off"></div>
        <div class="proto-row"><label class="switch"><input type="checkbox" id="ps-api2-on"><span class="sl"></span></label><span>自定义优选 API 2</span><span style="flex:1"></span><button type="button" class="btn sm" id="ps-test-api2" onclick="testIpSource('api2')">测试</button></div>
        <div class="field"><input type="text" id="ps-api2-url" placeholder="https://example.com/ips.csv" autocomplete="off"></div>
        <p class="hint">仅在「仪表盘 → 地址来源 → 优选 IP」开启时生效。所有来源只保留 Cloudflare 段 IP，结果缓存 10 分钟（绑定自定义域名时，同一机房的实例共享缓存），缓存未命中时每个开启的来源占用 1 个子请求。排列顺序：自定义 API 1 / 2 → HostMonit → uouin → 微测网。「测试」会立即重新拉取该来源（不影响订阅缓存，开关关闭时也可测试；自定义 API 使用输入框当前地址，无需先保存）。</p>
        <div id="ps-test-out" class="ipt-out" style="display:none"></div>
      </div>
    </section>

    
    <section class="view" data-view="account" data-title="面板设置" data-sub="部署基础信息：UUID、面板路径（PATH）、管理用户名与密码、绑定域名">
      <div class="card">
        <h3><span class="tick"></span>基础配置</h3>
        <div class="field"><label>UUID（订阅节点身份；环境变量 UUID 留空时已自动生成）</label>
          <div class="inrow">
            <input type="text" id="a-uuid" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" autocomplete="off">
            <button class="btn sm" onclick="genUuid()">生成</button>
          </div>
        </div>
        <div class="field"><label>面板路径（环境变量 PATH 设置，面板中只读）</label><input type="text" id="a-path" autocomplete="off"><div class="hint">面板、订阅与节点（WebSocket / XHTTP）共用此路径；修改请到 Worker 环境变量 PATH，修改后节点路径随之改变，客户端需重新更新订阅。</div></div>
        <div class="field"><label>自定义订阅路径（只填一段，如 AAZ → /AAZ/sub；留空为 /UUID/sub）</label><input type="text" id="a-suburl" placeholder="AAZ" autocomplete="off"></div>
        <div class="field"><label>管理用户名（登录时需要；留空为 admin，区分大小写）</label><input type="text" id="a-adminuser" placeholder="admin" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
        <div class="field"><label>管理密码（留空保持不变；未设置时面板禁用）</label><input type="password" id="a-admin" placeholder="设置后访问面板需登录" autocomplete="new-password"></div>
        <div class="field" style="margin-bottom:0"><label>绑定域名（留空使用当前访问的域名）</label><input type="text" id="a-host" placeholder="node.example.com" autocomplete="off"></div>
        <p class="hint" style="margin-top:10px">「绑定域名」仅用于订阅节点主机名（XHTTP 协议要求绑定自定义域名），不负责域名解析。自定义域名访问面板需先在 Cloudflare 面板 → Workers 与 Pages → 该 Worker → Domains &amp; Routes 添加自定义域名（DNS 由 Cloudflare 托管，证书自动签发），此字段留空即使用你访问面板 / 订阅时的域名。未绑定 KV（绑定变量名 CONFIG_KV）时无法保存面板配置，只有环境变量生效。</p>
      </div>
      <div class="card">
        <h3><span class="tick"></span>备份与恢复</h3>
        <p class="hint" style="margin-top:0;margin-bottom:12px">以 JSON 格式导出全部面板设置（含协议、优选、筛选），可保存到本地或迁移到其他部署；导入后请点右下角「保存全部」生效。<b>备份文件包含 UUID（节点身份，知道它即可使用你的节点），请妥善保管、不要分享；管理密码与 Trojan 密码不会导出。</b></p>
        <div class="inrow">
          <button class="btn" onclick="exportConfig()">导出配置</button>
          <button class="btn" onclick="$('importFile').click()">导入配置</button>
          <input type="file" id="importFile" accept=".json,application/json" style="display:none" onchange="importConfig(this)">
        </div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>登录会话</h3>
        <p class="hint" style="margin-top:0;margin-bottom:12px">登录状态保存在浏览器 Cookie 中：使用面板时自动顺延，24 小时未使用即失效；自登录起最长 7 天，到期需重新登录。退出只清除当前浏览器的登录状态；要让所有已签发的登录状态立即失效，请修改管理密码、管理用户名或 UUID。</p>
        <button class="btn" onclick="logout()">退出登录</button>
      </div>
      <div class="card">
        <h3><span class="tick"></span>运行信息</h3>
        <div class="kv"><span class="k">面板版本</span><span class="v" id="aVer">—</span></div>
        <div class="kv"><span class="k">KV 持久化</span><span class="v" id="aKv">—</span></div>
      </div>
      <div class="danger-zone">
        <h3 style="margin-bottom:8px;color:var(--err)">危险操作</h3>
        <p style="font-size:13px;color:var(--dim);margin-bottom:12px">重置将清空 KV 中保存的全部面板配置，面板还原为初始部署状态（环境变量不受影响），不可恢复。</p>
        <button class="btn danger" onclick="resetAll()">重置全部数据</button>
      </div>
    </section>

    
    <section class="view" data-view="about" data-title="关于项目" data-sub="Hopline — Cloudflare 代理订阅面板（独立界面 + 独立实现）">
      <div class="card">
        <h3><span class="tick"></span>相关链接</h3>
        <p style="font-size:13px;color:var(--dim)">YouTube @数字派：<a href="https://www.youtube.com/@PAI_CN" target="_blank" rel="noopener">youtube.com/@PAI_CN</a></p>
        <p style="font-size:13px;color:var(--dim);margin-top:6px">Telegram 交流群：<a href="https://t.me/SZ_PAI" target="_blank" rel="noopener">t.me/SZ_PAI</a></p>
      </div>
      <div class="card">
        <h3><span class="tick"></span>特别鸣谢</h3>
        <p style="font-size:13px;color:var(--dim);margin-bottom:10px">本面板为全新独立设计/全新编写：后端代理、订阅与优选逻辑参考以下开源项目的功能清单</p>
        <div class="tbl-wrap"><table>
          <colgroup><col style="width:34%"><col style="width:66%"></colgroup>
          <thead><tr><th>参考仓库</th><th>地址</th></tr></thead>
          <tbody>
            <tr><td>cmliu/edgetunnel</td><td><a href="https://github.com/cmliu/edgetunnel" target="_blank" rel="noopener">github.com/cmliu/edgetunnel</a></td></tr>
            <tr><td>zizifn/edgetunnel</td><td><a href="https://github.com/zizifn/edgetunnel" target="_blank" rel="noopener">github.com/zizifn/edgetunnel</a></td></tr>
            <tr><td>6Kmfi6HP/EDtunnel</td><td><a href="https://github.com/6Kmfi6HP/EDtunnel" target="_blank" rel="noopener">github.com/6Kmfi6HP/EDtunnel</a></td></tr>
            <tr><td>IonRh/Cloudflare-BestIP</td><td><a href="https://github.com/IonRh/Cloudflare-BestIP" target="_blank" rel="noopener">github.com/IonRh/Cloudflare-BestIP</a></td></tr>
            <tr><td>MetaCubeX/meta-rules-dat</td><td><a href="https://github.com/MetaCubeX/meta-rules-dat" target="_blank" rel="noopener">github.com/MetaCubeX/meta-rules-dat</a></td></tr>
            <tr><td>666OS/rules</td><td><a href="https://github.com/666OS/rules" target="_blank" rel="noopener">github.com/666OS/rules</a></td></tr>
            <tr><td>DustinWin/ruleset_geodata</td><td><a href="https://github.com/DustinWin/ruleset_geodata" target="_blank" rel="noopener">github.com/DustinWin/ruleset_geodata</a></td></tr>
            <tr><td>blackmatrix7/ios_rule_script</td><td><a href="https://github.com/blackmatrix7/ios_rule_script" target="_blank" rel="noopener">github.com/blackmatrix7/ios_rule_script</a></td></tr>
            <tr><td>TG-Twilight/AWAvenue-Ads-Rule</td><td><a href="https://github.com/TG-Twilight/AWAvenue-Ads-Rule" target="_blank" rel="noopener">github.com/TG-Twilight/AWAvenue-Ads-Rule</a></td></tr>
            <tr><td>Koolson/Qure</td><td><a href="https://github.com/Koolson/Qure" target="_blank" rel="noopener">github.com/Koolson/Qure</a></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card">
        <h3><span class="tick"></span>调用接口</h3>
        <div class="tbl-wrap"><table>
          <colgroup><col style="width:40%"><col style="width:60%"></colgroup>
          <thead><tr><th>用途</th><th>接口</th></tr></thead>
          <tbody>
            <tr><td>HostMonit 优选（分运营商实测）</td><td class="mono">api.hostmonit.com/get_optimization_ip</td></tr>
            <tr><td>uouin 分线路优选（对方网站内部接口）</td><td class="mono">api.uouin.com/index.php/index/Cloudflare</td></tr>
            <tr><td>微测网优选（对方公开页面）</td><td class="mono">www.wetest.vip/page/cloudflare/address_v4.html · address_v6.html</td></tr>
            <tr><td>自定义优选 API 1 / 2、优选域名测试</td><td>你填写的地址 / 域名</td></tr>
            <tr><td>DoH 解析（优选域名、反代域名、UDP DNS）</td><td class="mono">cloudflare-dns.com / dns.google / dns.alidns.com / doh.pub</td></tr>
            <tr><td>内置地区反代（直连不通时使用）</td><td class="mono">proxyip.*.cmliussss.net</td></tr>
            <tr><td>版本更新检测</td><td class="mono">raw.githubusercontent.com/iv7777/Hopline/...</td></tr>
            <tr><td>面板二维码库（浏览器加载）</td><td class="mono">cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js（SRI 校验）</td></tr>
            <tr><td>订阅内的规则集与图标（由客户端下载）</td><td class="mono">cdn.jsdelivr.net（MetaCubeX、blackmatrix7）/ github.com（666OS、DustinWin）/ raw.githubusercontent.com（AWAvenue）/ rule.kelee.one</td></tr>
          </tbody>
        </table></div>
      </div>
    </section>
  </div>
</div>
</div>

<div class="fbar">
  <span class="saved-at" id="savedAt">尚未保存</span>
  <button class="btn danger" id="resetBtn" onclick="resetAll()">重置</button>
  <button class="btn primary" id="saveBtn" onclick="saveAll()"><span class="dirty-dot"></span>保存全部</button>
</div>
<div class="modal" id="nodeQr" onclick="if (event.target === this) closeNodeQr()">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="nodeQrName">
    <div class="modal-head"><b id="nodeQrName"></b><button class="icon-btn" title="关闭" onclick="closeNodeQr()"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="qrbox" id="nodeQrImg"></div>
    <pre class="code" id="nodeQrLink"></pre>
    <button class="btn primary" style="width:100%;margin-top:10px" onclick="copyText($('nodeQrLink').textContent)">复制链接</button>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>

var APIPATH = location.pathname.replace(/\/+$/, '');
var CFG = null;
var toastTimer = null;
function $(id){ return document.getElementById(id); }
function api(p, opts){
  return fetch(APIPATH + '/api/' + p, opts).then(function(r){ return r.json(); });
}
function toast(t, ty){
  var el = $('toast');
  el.textContent = t;
  el.className = 'toast show ' + (ty || '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.className = 'toast'; }, 2600);
}
function copyText(t){
  var done = false;
  function fin(ok2){
    if (done) return; done = true;
    toast(ok2 ? '已复制' : '复制失败，请手动复制', ok2 ? 'ok' : 'err');
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    var p = null;
    try { p = navigator.clipboard.writeText(t); } catch (e) { fin(fallbackCopy(t)); return; }
    if (p && typeof p.then === 'function') {
      p.then(function(){ fin(true); }, function(){ fin(fallbackCopy(t)); });
      setTimeout(function(){ fin(fallbackCopy(t)); }, 600); 
    } else { fin(true); }
  } else {
    fin(fallbackCopy(t));
  }
}
function fallbackCopy(t){
  var ta = document.createElement('textarea');
  ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  var ok2 = false;
  try { ok2 = document.execCommand('copy'); } catch (e) { ok2 = false; }
  document.body.removeChild(ta);
  return ok2;
}
function copySub(){ copyText($('subUrl').value || makeSub()); }
function markDirty(){
  $('saveBtn').classList.add('dirty');
  $('savedAt').textContent = '有未保存的修改';
}


var NAV = [
  { id:'dashboard', name:'仪表盘', icon:'<path d="M4 4h7v7H4zM13 4h7v4h-7zM4 13h7v7H4zM13 11h7v9h-7z"/>' },
  { id:'nodes', name:'节点配置', icon:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12L4 7.5"/>' },
  { id:'optimizer', name:'优选配置', icon:'<path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM12 8v4l2.5 2.5M3 3l3 3"/>' },
  { id:'account', name:'面板设置', icon:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-3.5 3.6-6 8-6s8 2.5 8 6"/>' },
  { id:'about', name:'关于项目', icon:'<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01"/>' }
];
var TITLES = { dashboard:'仪表盘', nodes:'节点配置', optimizer:'优选配置', account:'面板设置', about:'关于项目' };
function buildNav(){
  var html = '';
  NAV.forEach(function(n){
    html += '<button class="nav-item" data-v="' + n.id + '" onclick="switchView(\'' + n.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + n.icon + '</svg>' + n.name + '</button>';
  });
  $('nav').innerHTML = html;
}
function switchView(id){
  document.querySelectorAll('.nav-item').forEach(function(b){
    b.classList.toggle('on', b.getAttribute('data-v') === id);
  });
  document.querySelectorAll('.view').forEach(function(x){
    var on = x.getAttribute('data-view') === id;
    x.classList.toggle('on', on);
    if (on){
      $('pageTitle').textContent = x.getAttribute('data-title') || '';
      $('pageSub').textContent = $('pageSub').title = x.getAttribute('data-sub') || '';
    }
  });
  $('sidebar').classList.remove('open');
}
$('hamb').addEventListener('click', function(){ $('sidebar').classList.toggle('open'); });


function systemIsLight(){ return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches; }
function storedTheme(){ var t = 'light'; try { t = localStorage.getItem('tp_theme') || 'light'; } catch(e) {} return t; }
function resolveTheme(t){ if (t === 'auto') return systemIsLight() ? 'light' : 'dark'; return t; }
function setThemeIcon(t){
  var p = document.getElementById('themeIcon');
  if (!p) return;
  if (t === 'light') p.setAttribute('d', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4');
  else p.setAttribute('d', 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z');
}
function applyTheme(){
  var t = resolveTheme(storedTheme());
  document.documentElement.setAttribute('data-theme', t);
  setThemeIcon(t);
}
function setTheme(t){
  try { localStorage.setItem('tp_theme', t); } catch(e) {}
  applyTheme();
  toast(t === 'auto' ? '已切换为跟随系统' : (t === 'light' ? '已切换为日间模式' : '已切换为夜间模式'), 'ok');
}
$('themeBtn').addEventListener('click', function(){
  var cur = storedTheme();
  var next = (cur === 'light') ? 'dark' : 'light';
  setTheme(next);
});
applyTheme();


var topVerText = 'v—';
function legacyCopy(t){
  try {
    var ta = document.createElement('textarea');
    ta.value = t;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    var ok2 = false;
    try { ok2 = document.execCommand('copy'); } catch (e) { ok2 = false; }
    document.body.removeChild(ta);
    return ok2;
  } catch (e) { return false; }
}
function copyClipboard(t){
  return new Promise(function(ok){
    var done = false;
    function finish(v){ if (done) return; done = true; ok(v); }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        var p = null;
        try { p = navigator.clipboard.writeText(t); } catch (e) { finish(legacyCopy(t)); return; }
        if (p && typeof p.then === 'function') {
          p.then(function(){ finish(true); }, function(){ finish(legacyCopy(t)); });
          setTimeout(function(){ finish(legacyCopy(t)); }, 600); 
        } else { finish(true); }
      } else {
        finish(legacyCopy(t));
      }
    } catch (e) { finish(legacyCopy(t)); }
  });
}
function checkUpdate(){
  var sv = $('sideVer');
  if (sv.classList.contains('checking')) return;
  sv.classList.add('checking');
  sv.textContent = '检测中…';
  api('update').then(function(r){
    sv.classList.remove('checking');
    if (!r || !r.ok || !r.data) { sv.textContent = topVerText; toast('检测更新失败，请稍后重试', 'err'); return; }
    var d = r.data;
    topVerText = 'v' + d.current;
    sv.textContent = topVerText;
    if (d.hasUpdate && d.code) {
      sv.classList.add('has-update');
      copyClipboard(d.code).then(function(copied){
        toast(copied ? '检测到更新（v' + d.latest + '），已复制最新代码到剪贴板' : '检测到更新（v' + d.latest + '），复制失败，请前往仓库获取', copied ? 'ok' : 'err');
      });
    } else if (d.hasUpdate) {
      toast('检测到更新（v' + d.latest + '），但未能获取代码', 'err');
    } else if (d.latest) {
      sv.classList.remove('has-update');
      toast('已是最新版本（v' + d.current + '）', 'ok');
    } else {
      toast('检测更新失败：' + (d.error || '仓库暂不可达'), 'err');
    }
  }).catch(function(){
    sv.classList.remove('checking');
    sv.textContent = topVerText;
    toast('检测更新失败，请稍后重试', 'err');
  });
}


function loadAll(){
  if (/\.workers\.dev$/i.test(location.hostname)) $('wdwarn').style.display = 'block';
  api('status').then(function(r){
    if (r && r.ok) renderStatus(r.data);
  }).catch(function(){});
  api('config').then(function(r){
    if (r && r.ok){
      CFG = r.data;
      fillForm();
      renderAll();
      makeSub(false);
      setConn(true);
      if (CFG.kvError) toast(CFG.kvError + '；保存已被禁用', 'err');
      else toast('配置已加载', 'ok');
    } else if (r && r.status === 403) {
      location.href = '/login?next=' + encodeURIComponent(APIPATH);
    } else {
      setConn(false);
      toast('无法连接服务器', 'err');
    }
  }).catch(function(){
    setConn(false);
    toast('无法连接服务器', 'err');
  });
}
function setConn(ok){
  var p = $('connPill');
  p.className = 'pill ' + (ok ? '' : 'off');
  $('connText').textContent = ok ? '运行中' : '无法连接';
}
function renderStatus(d){
  $('stEntry').textContent = location.origin + '/' + (d.path || '');
  var wd = !!(d.workersDev) || /\.workers\.dev$/i.test(location.hostname);
  $('wdwarn').style.display = wd ? 'block' : 'none';
  $('subHint').textContent = wd
    ? '当前为 *.workers.dev 域名：Cloudflare 可能限制该域名直连，若客户端更新订阅失败（提示无效订阅），请在客户端开启系统代理或「更新订阅使用代理」后重试；节点连接不受影响（直连优选 IP）。'
    : '';
  var kv = d.kv;
  var kvTxt = kv ? '已绑定（配置持久化）' : '未绑定（无法保存配置，仅环境变量生效）';
  $('stKv').textContent = kvTxt;
  $('stKv').className = 'v ' + (kv ? 'ok' : 'bad');
  $('aKv').textContent = kvTxt;
  $('aKv').className = 'v ' + (kv ? 'ok' : 'bad');
  var v = d.version || '—';
  $('sideVer').textContent = 'v' + v;
  topVerText = 'v' + v;
  $('aVer').textContent = v;
}
function protoText(){
  if (!CFG) return '—';
  var a = [];
  if (CFG.enableVless !== false) a.push('VLESS');
  if (CFG.enableTrojan) a.push('Trojan');
  if (CFG.enableXhttp) a.push('XHTTP');
  return a.length ? a.join(' / ') : '未启用';
}
function renderAll(){
  $('stProto').textContent = protoText();
  rerenderIpTest();
}

var SCHEMA = /*@HOPLINE_SCHEMA@*/null || [];
var sharedCheck = /*@HOPLINE_CHECK@*/null;
var SCHEMA_BY_KEY = {};
SCHEMA.forEach(function(d){ SCHEMA_BY_KEY[d.key] = d; });
function checkValue(def, v){
  
  if (typeof sharedCheck !== 'function') return { value: v };
  try { return sharedCheck(def, v); } catch (e) { return { value: v }; }
}
function getPath(o, key){
  var ks = key.split('.');
  for (var i = 0; i < ks.length; i++){ if (o == null || typeof o !== 'object') return undefined; o = o[ks[i]]; }
  return o;
}
function setPath(o, key, v){
  var ks = key.split('.');
  for (var i = 0; i < ks.length - 1; i++){ if (o[ks[i]] == null || typeof o[ks[i]] !== 'object') o[ks[i]] = {}; o = o[ks[i]]; }
  o[ks[ks.length - 1]] = v;
}
function schemaEls(d){
  var ids = [];
  if (d.el) ids.push(d.el);
  if (d.els) for (var k in d.els) ids.push(d.els[k]);
  return ids;
}
function lockedEnv(key){ return (CFG && CFG.envLocked && CFG.envLocked[key]) || ''; }

function msgHost(el){ return el.closest('.field') || el.closest('.proto-row') || el.closest('.filter-group') || el.closest('.filter-region') || el; }
function attachMsg(el, cls, text){
  var host = msgHost(el);
  var div = document.createElement('div');
  div.className = cls;
  div.textContent = text;
  if (host.classList.contains('field')) host.appendChild(div);
  else host.parentNode.insertBefore(div, host.nextSibling);
  return div;
}

function fillField(d, v){
  if (d.custom) return;
  if (d.type === 'list'){
    var arr = Array.isArray(v) ? v : [];
    for (var k in d.els){ var e = $(d.els[k]); if (e) e.checked = arr.indexOf(k) >= 0; }
    return;
  }
  var el = $(d.el);
  if (!el) return;
  if (d.type === 'bool'){
    if (el.tagName === 'SELECT') el.value = v ? '1' : '0'; else el.checked = !!v;
    return;
  }
  if (d.type === 'secret'){
    
    if (el.getAttribute('data-ph') == null) el.setAttribute('data-ph', el.placeholder || '');
    el.value = '';
    el.placeholder = (CFG && CFG[d.key + 'Set']) ? '已设置（留空保持不变）' : el.getAttribute('data-ph');
    return;
  }
  el.value = v == null ? '' : v;
}
function readField(d){
  if (d.type === 'list'){
    var out = [];
    for (var k in d.els){ var e = $(d.els[k]); if (e && e.checked) out.push(k); }
    return out;
  }
  var el = $(d.el);
  if (!el) return undefined;
  if (d.type === 'bool') return el.tagName === 'SELECT' ? el.value === '1' : el.checked;
  return el.value;   
}

function applyEnvLock(d){
  var name = lockedEnv(d.key);
  schemaEls(d).forEach(function(id){
    var el = $(id);
    if (!el) return;
    el.disabled = !!name;
    if (el._lockTip){ el._lockTip.parentNode.removeChild(el._lockTip); el._lockTip = null; }
    if (name){
      el._lockTip = attachMsg(el, 'hint env-lock', '由环境变量 ' + name + ' 设置，面板中只读；如需修改请到 Worker 环境变量。');
      if (d.type === 'secret') el.placeholder = '已由环境变量 ' + name + ' 设置';
    }
  });
}
function fillForm(){
  if (!CFG) return;
  clearFieldErrors();
  SCHEMA.forEach(function(d){ fillField(d, getPath(CFG, d.key)); applyEnvLock(d); });
  onRelayMode();
  updatePdCount();
}
function collectForm(){
  if (!CFG) return null;
  var body = {};
  SCHEMA.forEach(function(d){
    if (d.custom || lockedEnv(d.key)) return;
    if (!d.el && !d.els) return;
    var v = readField(d);
    if (v !== undefined) setPath(body, d.key, v);
  });
  return body;
}

function validateForm(body){
  var errors = [];
  SCHEMA.forEach(function(d){
    var v = getPath(body, d.key);
    if (v === undefined || (d.type === 'secret' && v === '')) return;
    var r = checkValue(d, v);
    if (r.error) errors.push({ field: d.key, label: d.label, msg: r.error });
    else setPath(body, d.key, r.value);
  });
  return errors;
}


function fieldEl(key){
  var d = SCHEMA_BY_KEY[key];
  if (!d) return null;
  var id = d.el || (d.els ? d.els[Object.keys(d.els)[0]] : '');
  return id ? $(id) : null;
}
function clearFieldError(el){
  if (!el) return;
  el.classList.remove('invalid');
  if (el._errTip){ el._errTip.parentNode.removeChild(el._errTip); el._errTip = null; }
}
function clearFieldErrors(){
  document.querySelectorAll('.invalid').forEach(clearFieldError);
}
function showFieldErrors(errors){
  clearFieldErrors();
  var first = null, unplaced = [];
  errors.forEach(function(e){
    var el = fieldEl(e.field);
    if (!el){ unplaced.push((e.label ? e.label + '：' : '') + e.msg); return; }
    el.classList.add('invalid');
    if (el._errTip) el._errTip.textContent += '；' + e.msg;
    else el._errTip = attachMsg(el, 'field-err', e.msg);
    if (!first) first = el;
  });
  if (first){
    var view = first.closest('.view');
    if (view) switchView(view.getAttribute('data-view'));
    try { first.scrollIntoView({ block: 'center', behavior: 'smooth' }); first.focus({ preventScroll: true }); } catch (e) {}
  }
  return unplaced;
}


function currentPanelPath(){ return decodeURIComponent(APIPATH.replace(/^\/+/, '')); }
function saveAll(){
  if (!CFG){ toast('配置尚未加载', 'err'); return; }
  var body = collectForm();
  var errors = validateForm(body);
  if (errors.length){
    showFieldErrors(errors);
    toast('有 ' + errors.length + ' 项配置需要修正', 'err');
    return;
  }
  var btn = $('saveBtn');
  btn.disabled = true;
  api('config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(function(r){
      if (r && r.ok){
        var oldPath = currentPanelPath();
        CFG = r.data;
        btn.classList.remove('dirty');
        
        
        if (CFG.panelPath && CFG.panelPath !== oldPath){
          $('savedAt').textContent = '已保存，正在跳转到新的面板路径…';
          toast('已保存：面板路径已变更，正在跳转…', 'ok');
          setTimeout(function(){ location.replace('/' + encodeURIComponent(CFG.panelPath) + location.search); }, 900);
          return;
        }
        fillForm();
        renderAll();
        makeSub(false);
        $('savedAt').textContent = '已保存：' + new Date().toLocaleTimeString();
        toast(r.msg || '已保存', 'ok');
      } else {
        var unplaced = (r && r.errors) ? showFieldErrors(r.errors) : [];
        toast((unplaced.length ? unplaced.join('；') : (r && r.msg)) || '保存失败', 'err');
      }
    })
    .catch(function(){ toast('保存失败：无法连接服务器', 'err'); })
    .then(function(){ btn.disabled = false; });
}
function logout(){
  api('logout', { method: 'POST' })
    .then(function(){ location.href = '/login?next=' + encodeURIComponent(APIPATH); })
    .catch(function(){ toast('退出失败：无法连接服务器', 'err'); });
}
function resetAll(){
  if (!confirm('确定重置？将清空 KV 中保存的全部面板配置，面板还原为初始部署状态。此操作不可恢复！')) return;
  var btn = $('resetBtn');
  btn.disabled = true;
  api('reset', { method: 'POST' })
    .then(function(r){
      if (r && r.ok){ toast(r.msg || '已重置', 'ok'); setTimeout(function(){ location.reload(); }, 900); }
      else toast((r && r.msg) || '重置失败', 'err');
    })
    .catch(function(){ toast('重置失败：无法连接服务器', 'err'); })
    .then(function(){ btn.disabled = false; });
}
function genUuid(){
  var u = '';
  if (window.crypto && crypto.randomUUID){ u = crypto.randomUUID(); }
  else {
    var tpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    u = tpl.replace(/[xy]/g, function(c){
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 3 | 8);
      return v.toString(16);
    });
  }
  $('a-uuid').value = u;
  clearFieldError($('a-uuid'));
  markDirty();
  toast('已生成新 UUID', 'ok');
}

function exportConfig(){
  try {
    var data = collectForm();
    SCHEMA.forEach(function(d){ if ((d.type === 'secret' || d.noExport) && getPath(data, d.key) !== undefined) setPath(data, d.key, ''); });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    var ts = new Date();
    var pad = function(n){ return String(n).padStart(2, '0'); };
    a.download = 'hopline-backup-' + ts.getFullYear() + pad(ts.getMonth()+1) + pad(ts.getDate()) + '-' + pad(ts.getHours()) + pad(ts.getMinutes()) + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
    toast('配置已导出为 JSON', 'ok');
  } catch (e) { toast('导出失败：' + e.message, 'err'); }
}

function importConfig(input){
  var file = input.files && input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(){
    try {
      var data = JSON.parse(reader.result);
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('not an object');
      var next = JSON.parse(JSON.stringify(CFG)), n = 0;
      SCHEMA.forEach(function(d){
        var v = getPath(data, d.key);
        if (v === undefined || d.type === 'secret' || d.noExport || lockedEnv(d.key)) return;
        setPath(next, d.key, v);
        n++;
      });
      CFG = next;
      fillForm();
      renderAll();
      markDirty();
      toast('已导入 ' + n + ' 项配置，请点「保存全部」生效', 'ok');
    } catch (e) { toast('导入失败：JSON 格式不正确', 'err'); }
    input.value = '';
  };
  reader.readAsText(file, 'utf-8');
}


function bindFormEvents(){
  var bound = {};
  SCHEMA.forEach(function(d){
    schemaEls(d).forEach(function(id){
      var el = $(id);
      if (!el || bound[id]) return;
      bound[id] = 1;
      var h = function(){ markDirty(); clearFieldError(fieldEl(d.key)); clearFieldError(el); };
      el.addEventListener('change', h);
      el.addEventListener('input', h);
    });
    
    if (d.type === 'list' && d.exclusive && d.els){
      var ex = $(d.els[d.exclusive]);
      var others = Object.keys(d.els).filter(function(k){ return k !== d.exclusive; }).map(function(k){ return $(d.els[k]); });
      var anyOther = function(){ return others.some(function(o){ return o && o.checked; }); };
      ex.addEventListener('change', function(){
        if (ex.checked) others.forEach(function(o){ if (o) o.checked = false; });
        else if (!anyOther()) ex.checked = true;
      });
      others.forEach(function(o){
        if (!o) return;
        o.addEventListener('change', function(){
          if (o.checked) ex.checked = false;
          if (!anyOther()) ex.checked = true;
        });
      });
    }
  });
}
bindFormEvents();

function subUrlOf(fmt){
  
  
  
  var custom = (window.CFG && CFG.subUrl) ? String(CFG.subUrl).trim().replace(/^\/+/, '').replace(/\/sub$/, '').replace(/\/+$/, '') : '';
  var seg = custom || (window.CFG && CFG.uuid) || '';
  var base = seg ? (location.origin + '/' + seg) : (location.origin + APIPATH);
  var u = base + '/sub';
  return fmt ? (u + '/' + fmt) : u;
}
function makeSub(showQR){
  var fmt = $('subFmt').value;
  var url = subUrlOf(fmt === 'auto' ? '' : fmt);
  $('subUrl').value = url;
  if (showQR) showQRCode(url);
}

$('subFmt').addEventListener('change', function(){ makeSub($('qrWrap').style.display === 'block'); $('subPrev').style.display = 'none'; });
function toggleQR(){
  var w = $('qrWrap');
  if (w.style.display === 'block'){ w.style.display = 'none'; return; }
  showQRCode($('subUrl').value || subUrlOf(''));
}
function showQRCode(url){
  var w = $('qrWrap');
  w.style.display = 'block';
  if (typeof qrcode === 'undefined'){ w.innerHTML = '<div class="hint">二维码库加载失败，请直接复制链接</div>'; return; }
  try {
    var fmt = ($('subFmt') && $('subFmt').value) || 'auto';
    var q = qrcode(0, 'M');
    q.addData(qrPayloadOf(fmt, url));
    q.make();
    w.innerHTML = '<div class="qrbox">' + q.createImgTag(4, 10) + '</div>';
  } catch(e) { w.textContent = ''; w.appendChild(mkEl('div', 'hint', '二维码生成失败：' + e.message)); }
}





function qrPayloadOf(fmt, url){
  var enc = encodeURIComponent(url);
  if (fmt === 'clash' || fmt === 'stash') return 'clash://install-config?url=' + enc;
  if (fmt === 'singbox') return 'sing-box://import-remote-profile?url=' + enc + '#Hopline';
  if (fmt === 'surge') return 'surge:///install-config?url=' + enc;
  return url;
}
function downloadSub(){
  var fmt = $('subFmt').value;
  var a = document.createElement('a');
  a.href = subUrlOf(fmt === 'auto' ? '' : fmt);
  a.download = 'hopline-sub.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
}


var PREV = { fmt: '', raw: false, list: false, nodes: [] };
var LINK_FMTS = { auto: 1, v2ray: 1, plain: 1 };
function previewSub(){
  var fmt = $('subFmt').value;
  PREV = { fmt: fmt, raw: false, list: false, nodes: [] };
  $('subPrev').style.display = 'block';
  $('nodeSearch').value = '';
  prevTab(LINK_FMTS[fmt] ? 'list' : 'raw');
}
function prevTab(t){
  $('prevTabList').classList.toggle('on', t === 'list');
  $('prevTabRaw').classList.toggle('on', t === 'raw');
  $('prevList').style.display = t === 'list' ? 'block' : 'none';
  $('prevRaw').style.display = t === 'raw' ? 'block' : 'none';
  if (t === 'list' && !PREV.list) loadNodeList();
  if (t === 'raw' && !PREV.raw) loadRawPreview();
}
function loadRawPreview(){
  var fmt = PREV.fmt;
  PREV.raw = true;
  $('prevType').textContent = '请求中…';
  $('prevCount').textContent = '—';
  $('prevBody').textContent = '';
  api('sub?fmt=' + encodeURIComponent(fmt === 'auto' ? '' : fmt))
    .then(function(r){
      if (PREV.fmt !== fmt) return;
      if (!r || !r.ok){ PREV.raw = false; $('prevType').textContent = '预览失败'; $('prevBody').textContent = (r && r.msg) || '未知错误'; return; }
      var body = r.body || '';
      var type = r.type || '';
      $('prevType').textContent = type || '—';
      var n = 0;
      if (typeof r.count === 'number') n = r.count;   
      else if (/clash|yaml/i.test(type)) n = (body.match(/- name:/g) || []).length;
      else if (/json/i.test(type)) n = (body.match(/"tag"/g) || []).length;
      else {
        var t = body;
        if (!/^(vless|trojan|ss|xhttp):\/\//m.test(t)) {
          try { t = atob(t); } catch (e) {  }
        }
        n = t.split('\n').filter(function(l){ return /^(vless|trojan|ss|xhttp):\/\//.test(l.trim()); }).length;
      }
      $('prevCount').textContent = n + ' 个节点';
      $('prevBody').textContent = body.length > 2600 ? body.slice(0, 2600) + '\n…（已截断，完整内容请下载）' : body;
    })
    .catch(function(){ PREV.raw = false; $('prevType').textContent = '预览失败：无法连接服务器'; $('prevBody').textContent = ''; });
}

function parseNodeLink(link){
  var m = /^(vless|trojan):\/\/[^@]*@(\[[^\]]+\]|[^:?#\/]+):(\d+)/.exec(link);
  if (!m) return null;
  var hash = link.indexOf('#'), name = '';
  if (hash >= 0) { try { name = decodeURIComponent(link.slice(hash + 1)); } catch (e) { name = link.slice(hash + 1); } }
  var proto = m[1] === 'trojan' ? 'Trojan' : (/[?&]type=xhttp(&|#|$)/.test(link) ? 'XHTTP' : 'VLESS');
  return { link: link, name: name || (m[2] + ':' + m[3]), proto: proto, addr: m[2] + ':' + m[3] };
}
function loadNodeList(){
  var fmt = PREV.fmt;
  PREV.list = true;
  var box = $('nodeList');
  box.textContent = '';
  box.appendChild(mkEl('div', 'node-empty', '正在生成节点列表…'));
  api('sub?fmt=plain')
    .then(function(r){
      if (PREV.fmt !== fmt) return;
      if (!r || !r.ok){ PREV.list = false; box.textContent = ''; box.appendChild(mkEl('div', 'node-empty', '生成失败：' + ((r && r.msg) || '未知错误'))); return; }
      PREV.nodes = String(r.body || '').split('\n').map(function(l){ return parseNodeLink(l.trim()); }).filter(Boolean);
      $('nodeSearch').placeholder = '在 ' + PREV.nodes.length + ' 个节点中搜索名称 / 地址 / 协议，如 香港、XHTTP';
      renderNodeList();
    })
    .catch(function(){ PREV.list = false; box.textContent = ''; box.appendChild(mkEl('div', 'node-empty', '生成失败：无法连接服务器')); });
}
function renderNodeList(){
  var box = $('nodeList');
  if (!PREV.list || !PREV.nodes) return;
  var q = $('nodeSearch').value.trim().toLowerCase();
  var shown = PREV.nodes.filter(function(n){
    return !q || (n.name + ' ' + n.addr + ' ' + n.proto).toLowerCase().indexOf(q) >= 0;
  });
  box.textContent = '';
  if (!PREV.nodes.length) { box.appendChild(mkEl('div', 'node-empty', '没有节点')); return; }
  if (!shown.length) { box.appendChild(mkEl('div', 'node-empty', '没有匹配「' + q + '」的节点')); return; }
  var frag = document.createDocumentFragment();
  shown.forEach(function(n){
    var row = mkEl('div', 'node-row');
    row.appendChild(mkEl('span', 'ptag ' + n.proto.toLowerCase(), n.proto));
    var nm = mkEl('div', 'nm');
    nm.appendChild(mkEl('b', null, n.name));
    nm.appendChild(mkEl('span', null, n.addr));
    row.appendChild(nm);
    var cp = mkEl('button', 'btn sm', '复制');
    cp.onclick = function(){ copyText(n.link); };
    var qr = mkEl('button', 'btn sm', '二维码');
    qr.onclick = function(){ openNodeQr(n); };
    row.appendChild(cp); row.appendChild(qr);
    frag.appendChild(row);
  });
  box.appendChild(frag);
}
function openNodeQr(n){
  $('nodeQrName').textContent = n.name;
  $('nodeQrLink').textContent = n.link;
  var img = $('nodeQrImg');
  img.textContent = '';
  try {
    if (typeof qrcode !== 'function') throw new Error('二维码库未加载');
    
    if (qrcode.stringToBytesFuncs && qrcode.stringToBytesFuncs['UTF-8']) qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var q = qrcode(0, n.link.length > 500 ? 'L' : 'M');   
    q.addData(n.link);
    q.make();
    
    var cell = Math.max(2, Math.floor(300 / (q.getModuleCount() + 8)));
    img.innerHTML = q.createImgTag(cell, cell * 4);
  } catch (e) { img.appendChild(mkEl('div', 'hint', '二维码生成失败：' + e.message)); }
  $('nodeQr').classList.add('show');
}
function closeNodeQr(){ $('nodeQr').classList.remove('show'); }
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeNodeQr(); });


var IPSRC_LABELS = { hostmonit: 'HostMonit 实时优选', uouin: 'uouin 分线路优选', wetest: '微测网优选', api1: '自定义优选 API 1', api2: '自定义优选 API 2', domains: '优选域名' };
function testOutOf(src){ return $(src === 'domains' ? 'pd-test-out' : 'ps-test-out'); }

function mkEl(tag, cls, text){
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function testIpSource(src){
  var btn = $('ps-test-' + src), out = testOutOf(src);
  var body = { source: src };
  if (src === 'domains') body.text = $('o-prefdomains').value;
  if (src === 'api1' || src === 'api2') {
    body.url = $('ps-' + src + '-url').value.trim();
    if (!body.url) { toast('请先填写 ' + IPSRC_LABELS[src] + ' 的地址', 'err'); $('ps-' + src + '-url').focus(); return; }
  }
  btn.disabled = true;
  out.style.display = 'block';
  out.textContent = '';
  out.appendChild(mkEl('div', 'ipt-dim', '正在拉取 ' + IPSRC_LABELS[src] + ' …'));
  api('ipsrc-test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(function(r){ renderIpTest(src, r); })
    .catch(function(){ renderIpTest(src, { ok: false, msg: '无法连接服务器' }); })
    .then(function(){ btn.disabled = false; });
}


var HTTP_PORTS = /*@HOPLINE_HTTP_PORTS@*/null || [80, 8080, 8880, 2052, 2082, 2086, 2095];   
var LAST_IPTEST = null;
function tlsOnlyNow(){ return $('tls-only').checked || $('ech-on').checked; }
function rerenderIpTest(){ if (LAST_IPTEST) renderIpTest(LAST_IPTEST.src, LAST_IPTEST.r); }
function renderIpTest(src, r){
  LAST_IPTEST = { src: src, r: r };
  var out = testOutOf(src);
  out.textContent = '';
  var head = mkEl('div', 'ipt-head');
  head.appendChild(mkEl('b', '', IPSRC_LABELS[src] || src));
  if (!r || !r.ok) {
    head.appendChild(mkEl('span', 'ipt-err', '测试失败：' + ((r && r.msg) || '未知错误')));
    out.appendChild(head);
    return;
  }
  var d = r.data;
  if (src === 'domains') { renderDomainTest(out, head, d); return; }
  head.appendChild(mkEl('span', d.count ? 'ipt-ok' : 'ipt-err', d.count ? '✓ 可用 ' + d.count + ' 个 Cloudflare IP' : '✗ ' + (d.error || '没有可用 IP')));
  head.appendChild(mkEl('span', 'ipt-dim', 'HTTP ' + (d.status || '—') + ' · ' + d.ms + ' ms'));
  if (d.count && d.error) head.appendChild(mkEl('span', 'ipt-err', d.error));
  out.appendChild(head);
  if (d.items && d.items.length) {
    var tlsOnly = tlsOnlyNow(), lines = [], nodes = 0, skipped = 0;
    d.items.forEach(function(x){
      var host = String(x.ip).indexOf(':') >= 0 ? '[' + x.ip + ']' : x.ip;
      var name = x.name || '优选IP-NN', port = Number(x.port) || 443;
      if (tlsOnly && HTTP_PORTS.indexOf(port) >= 0) { lines.push(name + '    ' + host + ':' + port + '    （仅 TLS 端口：将跳过）'); skipped++; return; }
      lines.push(name + '    ' + host + ':' + port); nodes++;
      if (!tlsOnly && port === 443) { lines.push(name + '·80    ' + host + ':80    （明文）'); nodes++; }
    });
    if (d.count > d.items.length) lines.push('… 另有 ' + (d.count - d.items.length) + ' 个 IP');
    out.appendChild(mkEl('div', 'ipt-dim', '订阅中将使用的节点（名称 · 地址，每个启用的协议各一条）：' + nodes + ' 个'
      + (skipped ? '，跳过 ' + skipped + ' 个明文端口' : '')
      + '。按「仅 TLS 端口」当前' + (tlsOnly ? '开启' : '关闭') + '状态' + ($('ech-on').checked ? '（ECH 已开启，强制仅 TLS）' : '') + '展示，切换后即时更新'));
    out.appendChild(mkEl('pre', 'code', lines.join('\n')));
  }
  if (d.droppedCount) {
    out.appendChild(mkEl('div', 'ipt-dim', '已丢弃 ' + d.droppedCount + ' 个非 Cloudflare 段地址：' + d.dropped.join(', ') + (d.droppedCount > d.dropped.length ? ' …' : '')));
  }
  var det = mkEl('details');
  det.appendChild(mkEl('summary', '', '原始响应（' + (d.rawLength > d.raw.length ? '前 ' + d.raw.length + ' / 共 ' + d.rawLength : '共 ' + d.rawLength) + ' 字符）'));
  det.appendChild(mkEl('pre', 'code', d.raw || '(空)'));
  if (!d.count) det.open = true;   
  out.appendChild(det);
}


function renderDomainTest(out, head, d){
  var rows = d.domains || [], ok = rows.filter(function(x){ return x.ok; }).length;
  head.appendChild(mkEl('span', ok ? 'ipt-ok' : 'ipt-err', ok ? '✓ ' + ok + ' / ' + rows.length + ' 个域名解析到 Cloudflare 段' : '✗ ' + (d.error || '没有可用域名')));
  head.appendChild(mkEl('span', 'ipt-dim', d.ms + ' ms'));
  out.appendChild(head);
  if (rows.length) {
    var lines = rows.map(function(x){
      return (x.ok ? '✓ ' : '✗ ') + x.domain + '    ' + (x.failed ? '解析失败' : (x.ips.join(', ') || '无 A 记录') + (x.ok ? '' : '（不在 Cloudflare 段，不建议使用）'));
    });
    out.appendChild(mkEl('pre', 'code', lines.join('\n')));
  }
  if (d.rawLength > d.raw.length || /未测试/.test(d.raw || '')) out.appendChild(mkEl('div', 'ipt-dim', (d.raw.split('\n').pop() || '')));
}


var RELAY_ZH = { HK: '香港', US: '美国', SG: '新加坡', JP: '日本', KR: '韩国', DE: '德国', SE: '瑞典', NL: '荷兰', FI: '芬兰', GB: '英国' };

function populateRelaySelects(){
  [['rl-region', 'relay.region', '自动（按 Worker 机房）'], ['rl-region2', 'relay.region2', '自动（默认的另一地区）']].forEach(function(c){
    var el = $(c[0]), d = SCHEMA_BY_KEY[c[1]];
    if (!el || !d) return;
    el.innerHTML = '';
    d.options.forEach(function(o){
      var op = document.createElement('option');
      op.value = o;
      op.textContent = o === '' ? c[2] : (o === 'none' ? '不使用' : (RELAY_ZH[o] ? o + ' ' + RELAY_ZH[o] : o));
      el.appendChild(op);
    });
  });
}
function onRelayMode(){
  var m = $('rl-mode').value;
  $('rl-builtin-box').style.display = (m === 'builtin') ? '' : 'none';
  $('rl-custom-box').style.display = (m === 'custom') ? '' : 'none';
}
function updatePdCount(){
  var n = $('o-prefdomains').value.split(/[\n,;\s]+/).filter(function(x){ return x; }).length;
  var builtin = (CFG && CFG.builtinPrefDomains) ? CFG.builtinPrefDomains.length : 0;
  $('pd-count').textContent = n ? ('当前自定义 ' + n + ' 个域名（上限 30），已替换内置列表') : ('留空：使用内置列表' + (builtin ? '（' + builtin + ' 个）' : ''));
}
function loadBuiltinDomains(){
  if (!CFG || !CFG.builtinPrefDomains) return;
  $('o-prefdomains').value = CFG.builtinPrefDomains.join('\n');
  updatePdCount();
  markDirty();
}
$('o-prefdomains').addEventListener('input', updatePdCount);


$('tls-only').addEventListener('change', rerenderIpTest);
$('ech-on').addEventListener('change', rerenderIpTest);

buildNav();
populateRelaySelects();   
var initView = 'dashboard';
try {
  var qv = new URLSearchParams(location.search).get('v');
  if (qv && TITLES[qv]) initView = qv;
} catch(e) {}
switchView(initView);
loadAll();
</script>
</body>
</html>

`,At=String.raw`
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hopline · 登录</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='3' y='3' width='18' height='18' rx='5' fill='%232563eb'/%3E%3Cpath d='M8 15V9l8 6V9' stroke='%23ffffff' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f6f7fb;--input:#f8fafc;--card:#ffffff;--border:#e4e7ee;--text:#0f172a;--dim:#64748b;--accent:#2563eb;--accent-strong:#1d4ed8;--accent-dim:rgba(37,99,235,.12);--on-accent:#ffffff;--err:#dc2626;--err-dim:rgba(220,38,38,.08);--box-shadow:0 1px 2px rgba(15,23,42,.04),0 12px 32px rgba(15,23,42,.08)}
[data-theme="dark"]{--bg:#0b1120;--input:#0f172a;--card:#111827;--border:#243044;--text:#e5e9f0;--dim:#94a3b8;--accent:#3b82f6;--accent-strong:#2563eb;--accent-dim:rgba(59,130,246,.18);--on-accent:#ffffff;--err:#f87171;--err-dim:rgba(248,113,113,.13);--box-shadow:0 18px 50px rgba(0,0,0,.35)}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.box{width:340px;max-width:100%;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:30px 28px;box-shadow:var(--box-shadow)}
.brand{display:flex;align-items:center;gap:10px;margin-bottom:22px}
.mark{width:38px;height:38px;border-radius:10px;background:var(--accent);display:flex;align-items:center;justify-content:center}
.mark svg{width:20px;height:20px}
.mark path{stroke:var(--on-accent)}
.brand .bt{display:flex;flex-direction:column;line-height:1.25}
.brand .bt b{font-size:16px}
.brand .bt span{font-size:11.5px;color:var(--dim)}
h1{font-size:15px;margin-bottom:4px}
p{color:var(--dim);font-size:13px;margin-bottom:18px}
input{width:100%;background:var(--input);border:1px solid var(--border);color:var(--text);border-radius:9px;padding:10px 13px;font-size:14px;outline:none;margin-bottom:12px;font-family:inherit}
input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-dim)}
button{width:100%;background:var(--accent);border:none;color:var(--on-accent);border-radius:9px;padding:11px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit}
button:hover{background:var(--accent-strong)}
button:disabled{opacity:.6;cursor:not-allowed}
.msg{color:var(--err);font-size:13px;margin-bottom:12px;display:none;background:var(--err-dim);padding:8px 12px;border-radius:8px}
.foot{margin-top:16px;text-align:center;font-size:11.5px;color:var(--dim)}
</style>
</head>
<body>
<div class="box">
  <div class="brand">
    <div class="mark"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4l3-7 4 14 3-7h2"/></svg></div>
    <div class="bt"><b>Hopline</b><span>Cloudflare 代理订阅面板</span></div>
  </div>
  <h1>登录</h1>
  <p>请输入管理用户名与密码以继续</p>
  <div class="msg" id="msg">用户名或密码错误，请重试</div>
  <form id="form">
    <input type="text" id="user" placeholder="用户名" autofocus autocomplete="username" autocapitalize="off" spellcheck="false">
    <input type="password" id="pwd" placeholder="管理密码" autocomplete="current-password">
    <button type="submit" id="btn">登录</button>
  </form>
  <div class="foot">配置保存在 Cloudflare KV 中，24 小时未使用面板自动退出，最长 7 天需重新登录</div>
</div>
<script>
(function(){
  var t = 'light';
  try { t = localStorage.getItem('tp_theme') || 'light'; } catch(e) {}
  var resolved = t === 'auto'
    ? (window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : t;
  document.documentElement.setAttribute('data-theme', resolved);
  var next = new URLSearchParams(location.search).get('next') || '/';
  document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    var btn = document.getElementById('btn');
    var msg = document.getElementById('msg');
    btn.disabled = true; msg.style.display = 'none';
    fetch('/login', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'username=' + encodeURIComponent(document.getElementById('user').value) + '&password=' + encodeURIComponent(document.getElementById('pwd').value) + '&next=' + encodeURIComponent(next) })
      .then(function(r){ return r.json(); })
      .then(function(r){
        if (r && r.ok){ location.href = r.next || '/'; }
        else { msg.textContent = (r && r.msg) || '用户名或密码错误，请重试'; msg.style.display = 'block'; btn.disabled = false; }
      })
      .catch(function(){ msg.textContent = '网络错误，请重试'; msg.style.display = 'block'; btn.disabled = false; });
  });
})();
</script>
</body>
</html>

`;function It(e){return(e||"").toLowerCase().includes("mozilla")}function Ut(e,t){e=String(e),t=String(t);let n=e.length^t.length;const r=Math.max(e.length,t.length);for(let o=0;o<r;o++)n|=(e.charCodeAt(o)||0)^(t.charCodeAt(o)||0);return 0===n}async function Lt(e,t){const n=await crypto.subtle.importKey("raw",L.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),r=await crypto.subtle.sign("HMAC",n,L.encode(t));return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,"0")).join("")}const Ot="hopline-pbkdf2$",$t=e=>Array.from(e).map(e=>e.toString(16).padStart(2,"0")).join("");async function Dt(e,t,n){const r=await crypto.subtle.importKey("raw",L.encode(e),"PBKDF2",!1,["deriveBits"]);return $t(new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:t,iterations:n},r,256)))}function Rt(e){return"string"==typeof e&&e.startsWith(Ot)}const Nt=864e5,Ht=6048e5;function _t(e){return String(e.adminUser||"")||"admin"}function Mt(e){return"hopline-auth|"+String(e.admin)+"|"+String(e.uuid)+"|"+_t(e)}async function jt(e,t){const n=Date.now();t=t||n;const r=Math.min(n+Nt,t+Ht);return{token:r+"."+t+"."+await Lt(Mt(e),r+"."+t),exp:r}}async function Ft(e,t,n){if(!t.admin)return!1;const r=(e.headers.get("Cookie")||"").match(/(?:^|;\s*)hopline_auth=([^;]+)/);if(!r)return!1;const o=r[1].split(".");if(3!==o.length||!/^\d+$/.test(o[0])||!/^\d+$/.test(o[1])||!o[2])return!1;const a=Number(o[0]),i=Number(o[1]),s=Date.now();if(a<s||s-i>Ht)return!1;if(!Ut(o[2],await Lt(Mt(t),o[0]+"."+o[1])))return!1;const l={exp:a,iat:i};if(n&&Math.min(s+Nt,i+Ht)-a>=6e5){const e=await jt(t,i);n.setCookie=Gt(e.token,e.exp)}return l}const zt=new Map,Bt=9e5;function Kt(e){if((e=String(e||"unknown")).indexOf(":")<0)return e;const t=e.indexOf("::");let n;if(t>=0){const r=e.slice(0,t).split(":").filter(Boolean),o=e.slice(t+2).split(":").filter(Boolean);n=[...r,...Array(Math.max(0,8-r.length-o.length)).fill("0"),...o]}else n=e.split(":");return n.slice(0,4).map(e=>(e||"0").toLowerCase().replace(/^0+(?=.)/,"")).join(":")+"::/64"}function Wt(e,t){if(e=String(e||""),!/^\/[^\/\\]/.test(e))return!1;let n=e.slice(1).split(/[\/?#]/)[0];try{n=decodeURIComponent(n)}catch(e){return!1}return n===t}function Vt(e,t){return e=String(e||""),/^\/[^\/\\]/.test(e)?e:"/"+t}function Gt(e,t){return`hopline_auth=${e}; Path=/; Max-Age=${Math.max(0,Math.floor((t-Date.now())/1e3))}; HttpOnly; Secure; SameSite=Lax`}function qt(e,n){const r=T(e);return r.version=t,r.adminSet=!!e.admin,delete r.admin,r.path=e.path,r.panelPath=e.path,r.envLocked=P(n),r.kv=!(!u(n)||"function"!=typeof u(n).put),r.builtinPrefDomains=I.split("\n"),r.kvError=e._kvError?Jt(e._kvError):"",r}function Jt(e){return"corrupt"===e?"KV 中保存的配置已损坏（不是合法 JSON），当前使用的是环境变量与默认值":"KV 暂时无法读取，当前使用的是环境变量与默认值"}function Xt(e){return e.map(e=>(e.label?e.label+"：":"")+e.msg).join("；")}async function Qt(e,t,n,r){const o=e.headers.get("User-Agent")||"";return async function(e,t,n,r){const o=Object.assign({},e,{host:e.host||new URL(t).hostname}),a=function(e){return(e&&e.prefDomains?String(e.prefDomains).trim():"")||I}(e);o.ech&&(o.tlsOnly=!0);const i=e.filter&&e.filter.ipType||[],s=i.includes("IPv6"),l=1===i.length&&"IPv6"===i[0],c=e.src||{},d=!0===c.native,p=!1!==c.prefDomain,u=!1!==c.prefIp;if(o.preferredDomains="",o.preferredIPs=[],d&&!l&&(o.preferredDomains=o.host+"#原生地址"),p&&!l&&(o.preferredDomains=(o.preferredDomains?o.preferredDomains+"\n":"")+a),u){const t=e.ipsrc||{},n=e=>t["api"+e]&&t["api"+e+"Url"]?rt(t["api"+e+"Url"],200,300,!0,!1).catch(()=>[]):Promise.resolve([]),r=await Promise.all([n(1),n(2),!1===t.hostmonit||l?null:Fe(150).catch(()=>null),!0===t.uouin?We(!l,s).catch(()=>[]):null,!0===t.wetest?Je(!l,s).catch(()=>[]):null]);for(const e of r)e&&e.length&&o.preferredIPs.push(...e)}if(s&&p)try{const e=l?String(a).split("\n").slice(0,25).join("\n")+"\n"+A.join("\n"):a.split("\n").slice(0,12).join("\n"),t=await rt(e,40,l?800:240,!0,"only");t&&t.length&&o.preferredIPs.push(...t.map((e,t)=>Object.assign({},e,{name:"优选IP-V6-"+String(t+1).padStart(2,"0")})))}catch(e){}d||p||u||(o.preferredDomains=A.map((e,t)=>e+"#域名-"+String(t+1).padStart(2,"0")).join("\n")),l&&o.preferredIPs&&(o.preferredIPs=o.preferredIPs.filter(e=>String(e.ip).indexOf(":")>=0)),r=(r||"").toLowerCase();const f=(n||"").toLowerCase(),h=Tt;let m,g,b=function(e,t){if(!t||!t.region&&!t.ipType&&!t.isp)return e;const n=Array.isArray(t.region)&&t.region.length?t.region:["all"],r=t.ipType||mt,o=t.isp||dt,a=e.map(e=>{const{host:t}=at(e);let n="";try{const t=e.indexOf("#");t>=0&&(n=decodeURIComponent(e.slice(t+1)||""))}catch(e){n=""}const r=n.toUpperCase();return{host:t,name:n,up:r,isps:ht(r),regions:ft(n,r)}}),i=(t,n,r)=>{const o=t.includes("all")?null:t.flatMap(e=>lt[e]||[]),i=r.length>0&&r.length<dt.length;return e.filter((e,s)=>{const l=a[s],c=l.host.indexOf(":")>=0;if(!l.name)return!1;if(o&&l.regions.length&&!l.regions.some(e=>t.includes(e)))return!1;if(1===n.length){if("IPv4"===n[0]&&c)return!1;if("IPv6"===n[0]&&!c)return!1}return!(i&&l.isps.length&&!l.isps.some(e=>r.includes(e)))})};let s=i(n,r,o);return s.length||(s=i(n,r,dt)),s.length||(s=i(n,mt,dt)),s.length||(s=i(["all"],mt,dt)),s}(await ot(o,h),e.filter);if(!b.length){const e=Object.assign({},o,{preferredDomains:A.map((e,t)=>e+"#域名-"+String(t+1).padStart(2,"0")).join("\n"),preferredIPs:[],tlsOnly:!0});b=await ot(e,h)}return b.length>h&&(b.length=h),b=function(e){const t=new Set;return e.map(e=>{const n=e.indexOf("#");if(n<0)return e;let r;try{r=decodeURIComponent(e.slice(n+1))}catch(t){r=e.slice(n+1)}let o=r,a=2;for(;t.has(o);)o=r+"·"+a++;return t.add(o),o===r?e:e.slice(0,n+1)+Xe(o)})}(b),"clash"===f||"stash"===f?(m="text/yaml",g=bt(o,b)):"singbox"===f||"sing-box"===f?(m="application/json",g=wt(o,b)):"surge"===f?(m="text/plain",g=St(o,b)):"surfboard"===f?(m="text/plain",g=vt(o,b)):"loon"===f?(m="text/plain",g=Ct(o,b)):"quanx"===f||"quantumultx"===f?(m="text/plain",g=Et(o,b)):"plain"===f||"raw"===f||"v2ray"===f||"v2rayn"===f||"shadowrocket"===f||"nekoray"===f?(m="text/plain",g=b.join("\n")):r.includes("clash")||r.includes("stash")?(m="text/yaml",g=bt(o,b)):r.includes("sing-box")?(m="application/json",g=wt(o,b)):r.includes("surge")?(m="text/plain",g=St(o,b)):r.includes("surfboard")?(m="text/plain",g=vt(o,b)):r.includes("loon")?(m="text/plain",g=Ct(o,b)):r.includes("quantumult")?(m="text/plain",g=Et(o,b)):(m="text/plain",g=b.join("\n")),{type:m,body:g,count:b.length}}(Object.assign({},n),e.url,r,o)}let Yt=null;async function Zt(e,r,i){const l=new URL(e.url),c=e.headers.get("User-Agent")||"",d=(e.headers.get("Upgrade")||"").toLowerCase();if("http:"===l.protocol&&"websocket"!==d)return Response.redirect(l.href.replace("http://","https://"),301);const p=await async function(e){let t=null,n="";const r=u(e);if(r&&"function"==typeof r.get)try{const e=await r.get("config",{cacheTtl:30});if(e)try{if(t=JSON.parse(e),!t||"object"!=typeof t)throw new SyntaxError("not an object")}catch(e){t=null,n="corrupt"}}catch(e){n="unavailable"}const o=q(e,t);return n&&(o._kvError=n),o.uuid||n||await async function(e,t,n){const r=u(e);if(!r||"function"!=typeof r.put)return void(n._uuidUnsaved=!0);let o=G.get(r);if(!o){o=function(){if(crypto.randomUUID)return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));return e[6]=15&e[6]|64,e[8]=63&e[8]|128,[...e].map((e,t)=>(4===t||6===t||8===t||10===t?"-":"")+e.toString(16).padStart(2,"0")).join("")}();try{await r.put("config",JSON.stringify(Object.assign({},t||{},{uuid:o})))}catch(e){return void(n._kvError="unavailable")}G.set(r,o)}n.uuid=o}(e,t,o),o}(r);if(p._kvError&&!V(r))return new Response("配置存储暂不可用，请稍后重试",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Retry-After":"30"}});const f=function(e,t){const n=[];return t.path||n.push(t._pathError?"环境变量 PATH 的值不正确："+t._pathError+"。":"Hopline 尚未完成配置：请在 Worker 环境变量中设置 PATH（面板、订阅与节点共用的访问路径，如 mypanel）和 ADMIN（管理密码），然后重新访问。从旧版升级时：旧版的默认路径就是 UUID，把 PATH 设为原来的 UUID（或之前用 D 设置的路径）即可保持节点与订阅地址不变。"),t._uuidUnsaved&&n.push("未绑定 KV 命名空间（绑定变量名 CONFIG_KV）时，必须设置环境变量 UUID（节点用户 ID）；绑定 KV 后可留空，系统会自动生成并保存。"),n.join("\n")}(0,p);if(f)return new Response(f,{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});const h=p.path,m=l.pathname.replace(/^\/+|\/+$/g,"").split("/");if("version"===m[0])return await Ft(e,p,i)?W({version:t}):new Response("Not Found",{status:404});if("login"===m[0]){if(!p.admin)return new Response("Not Found",{status:404});if("POST"===e.method){const t=e.headers.get("CF-Connecting-IP")||"unknown",n=await e.text(),r=new URLSearchParams(n);if(!Wt(r.get("next"),h))return new Response("Not Found",{status:404});if(function(e){const t=Kt(e),n=zt.get(t);return!!n&&(Date.now()-n.t>Bt?(zt.delete(t),!1):n.n>=5)}(t))return W({ok:!1,msg:"尝试次数过多，请 15 分钟后再试"},429);const o=Ut(r.get("username")||"",_t(p)),a=await async function(e,t){if(e=String(e||""),t=String(null==t?"":t),!e)return!1;if(!Rt(e))return Ut(t,e);const n=e.slice(15).split("$"),r=parseInt(n[0],10);return!!(3===n.length&&r>=1e3&&r<=1e5&&n[1]&&n[2])&&Ut(await Dt(t,(o=n[1],Uint8Array.from((String(o).match(/../g)||[]).map(e=>parseInt(e,16)))),r),n[2]);var o}(p.admin,r.get("password")||"");if(o&&a){v=t,zt.delete(Kt(v));const e=await jt(p);return new Response(JSON.stringify({ok:!0,next:Vt(r.get("next"),h)}),{status:200,headers:{"Content-Type":"application/json; charset=utf-8","Set-Cookie":Gt(e.token,e.exp)}})}return function(e){const t=Kt(e),n=Date.now(),r=zt.get(t);for(!r||n-r.t>Bt?(zt.delete(t),zt.set(t,{n:1,t:n})):r.n++;zt.size>5e3;)zt.delete(zt.keys().next().value)}(t),W({ok:!1,msg:"用户名或密码错误"},403)}return Wt(l.searchParams.get("next"),h)?new Response(At,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}}):new Response("Not Found",{status:404})}var v;const y=String(p.subUrl||"").trim().replace(/^\/+/,"").replace(/\/+$/,"")||p.uuid,C=m[0]===h,A=C||m[0]===y;if(""===m[0])return new Response("Not Found",{status:404});if(C&&1===m.length){if("websocket"===d)return async function(e,t){const n=new WebSocketPair,[r,o]=Object.values(n);try{o.accept({allowHalfOpen:!0})}catch(e){o.accept()}o.binaryType="arraybuffer";let a=null,i=null,s=!1,l=null,c=null,d=!1,p=!1,u=!1,f=!1;const h=e=>{try{o.send(e)}catch(e){}},m=(e,t)=>{if(!f){f=!0;try{o.close(e,t)}catch(e){}}},g=e=>{m(1011,function(e){let t="",n=0;for(const r of String(e)){const e=L.encode(r).length;if(n+e>120)break;t+=r,n+=e}return t}(e&&e.message||e)),y()},b=async(n,r)=>{if(n&&n.byteLength&&(l=l?ve(l,n):n),!l||s)return;if(l.byteLength>65536)throw new Error("握手头超过 64KB");let o,f;try{const e=ne(l,t);if(!e&&0!==l[0]&&l.byteLength<58)return;if(f=!e,f&&!1===t.enableVless)throw new Error("VLESS 协议未启用");o=e?function(e){if(!e||e.byteLength<66)throw new Error("Trojan 头部过短");const t=new DataView(e.buffer,e.byteOffset,e.byteLength);let n=58;const r=t.getUint8(n);n+=1;const o=t.getUint8(n);let a,i;n+=1;const s=t=>{if(n+t>e.byteLength)throw new Error("Trojan 头部过短")};if(1===o)s(4),a=`${t.getUint8(n)}.${t.getUint8(n+1)}.${t.getUint8(n+2)}.${t.getUint8(n+3)}`,i=4;else if(3===o){s(1);const r=t.getUint8(n);s(1+r),a=O.decode(e.subarray(n+1,n+1+r)),i=1+r}else{if(4!==o)throw new Error("无法识别的地址类型");s(16),a=F(e.subarray(n,n+16)),i=16}n+=i,s(4);const l=t.getUint16(n);return n+=2,n+=2,{command:r,port:l,addr:a,password:O.decode(e.subarray(0,56)),headerLength:n}}(l):Q(l,t)}catch(e){if(/头部过短/.test(e.message||""))return;throw e}if(f?1!==o.command&&2!==o.command:1!==o.command)throw new Error("不支持的命令 "+o.command);!d&&f&&2!==o.command&&(d=!0,h(new Uint8Array([0,0])));const v=l.byteLength>o.headerLength?l.subarray(o.headerLength):null,y=Ie(v);if("unknown"===y&&!r)return void(c||(c=setTimeout(()=>{c=null,b(null,!0).catch(g)},80)));if(c&&(clearTimeout(c),c=null),s=!0,2===o.command){try{if(53===o.port&&v&&v.byteLength>=12){const e=await async function(e){if(!e||e.byteLength<17)return null;const t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=t.getUint16(0);if(32768&t.getUint16(2))return null;if(1!==t.getUint16(4))return null;let r=12,o=[];for(;r<e.byteLength;){const n=t.getUint8(r);if(0===n){r++;break}if(!(192&~n)){r+=2;break}if(r+1+n>e.byteLength)return null;o.push(O.decode(e.subarray(r+1,r+1+n))),r+=1+n}if(r+4>e.byteLength||0===o.length)return null;const a=t.getUint16(r),i=t.getUint16(r+2),s=r+4;if(1!==a&&28!==a)return null;const l=o.join("."),c=e.subarray(12,s),d=await oe(re,e=>e+"?name="+encodeURIComponent(l)+"&type="+a,e=>{if(!e||0!==e.Status)return null;const t=(e.Answer||[]).filter(e=>e.type===a&&(1===e.type?j(String(e.data)):/^[0-9a-fA-F:]+$/.test(String(e.data))));return t.length?t:null},{timeoutMs:5e3});if(!d)return null;const p=new Uint8Array(12),u=new DataView(p.buffer);u.setUint16(0,n),u.setUint16(2,33152),u.setUint16(4,1),u.setUint16(6,d.length);const f=[p,c];for(const e of d){const t=String(e.data),n=1===e.type?Uint8Array.from(t.split(".").map(Number)):ae(t);if(n.length!==(1===e.type?4:16))continue;const r=new Uint8Array(10),o=new DataView(r.buffer);o.setUint16(0,49164),o.setUint16(2,e.type),o.setUint16(4,0===i?1:i),o.setUint32(6,Number(e.TTL)||300),f.push(r,new Uint8Array([n.length>>8&255,255&n.length]),n)}let h=0;f.forEach(e=>h+=e.byteLength);const m=new Uint8Array(h);let g=0;for(const e of f)m.set(e,g),g+=e.byteLength;return m}(v);e&&h(e)}}catch(e){}return void m(1e3)}const x=await Ue(o,t,e.cf&&e.cf.colo,y);if(p)try{x.close()}catch(e){}else a=x,i=x.writable.getWriter(),x._preamble&&x._preamble.byteLength>0&&h(x._preamble),l&&l.byteLength>o.headerLength&&await i.write(l.subarray(o.headerLength)),l=null,u=!0,async function(e,t,n){let r=null;const o=()=>new Promise(e=>{r=setTimeout(()=>e(null),0)}),a=()=>{const t=e.read();return t.catch(()=>{}),t};try{let e=a();for(;;){const n=await e;if(n.done)break;e=a();let i=null,s=n.value.byteLength,l=!1,c=s;for(;c>=4096&&s<65536;){const t=await Promise.race([e,o()]);if(clearTimeout(r),!t)break;if(t.done){l=!0;break}(i||(i=[n.value])).push(t.value),s+=t.value.byteLength,c=t.value.byteLength,e=a()}if(i){const e=new Uint8Array(s);let n=0;for(const t of i)e.set(t,n),n+=t.byteLength;t(e)}else t(n.value);if(l)break}}catch(e){}try{n&&n()}catch(e){}}(x.readable.getReader(),h,()=>m(1e3))},v=function(e,t){const n=String(e||"").trim();if(!n||n.length>8192||!/^[A-Za-z0-9\-_+/=]+$/.test(n))return null;let r;try{const e=n.replace(/-/g,"+").replace(/_/g,"/"),t=atob(e+"=".repeat((4-e.length%4)%4));r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e)}catch(e){return null}if(!r.byteLength||r.byteLength>6144)return null;if(r.byteLength>=17&&0===r[0]){let e;try{e=X(t.uuid)}catch(e){return null}for(let t=0;t<16;t++)if(r[t+1]!==e[t])return null;return r}return ne(r,t)?r:null}(e.headers.get("sec-websocket-protocol"),t);function y(){if(p=!0,c&&(clearTimeout(c),c=null),a){try{a.close()}catch(e){}a=null}u||m(1e3)}return v&&b(v).catch(g),o.addEventListener("message",async e=>{try{const t="string"==typeof e.data?L.encode(e.data):new Uint8Array(e.data);s?i?await i.write(t):l=l?ve(l,t):t:await b(t)}catch(e){g(e)}}),o.addEventListener("close",y),o.addEventListener("error",y),new Response(null,{status:101,webSocket:r,headers:{"Sec-WebSocket-Extensions":"identity"}})}(e,p);if("POST"===e.method&&p.enableXhttp)try{return await async function(e,t){const n=e.body.getReader();let r=new Uint8Array(0),o=null;for(;!o;){const e=await n.read();if(e.done)return new Response("empty",{status:400});r=r.byteLength?ve(r,e.value):e.value;try{o=Q(r,t)}catch(e){if(!/头部过短/.test(e.message||""))throw e;if(r.byteLength>65536)throw new Error("握手头超过 64KB")}}if(1!==o.command)throw new Error("XHTTP 仅支持 TCP 命令");const a=r.subarray(o.headerLength),i=await Ue(o,t,e.cf&&e.cf.colo,Ie(a)),s=i.writable.getWriter();a.byteLength&&await s.write(a),s.releaseLock(),n.releaseLock(),e.body.pipeTo(i.writable).catch(()=>{});const l="function"==typeof IdentityTransformStream?new IdentityTransformStream:new TransformStream;return(async()=>{try{const e=l.writable.getWriter();await e.write(new Uint8Array([0,0])),i._preamble&&i._preamble.byteLength>0&&await e.write(i._preamble),e.releaseLock(),await i.readable.pipeTo(l.writable)}catch(e){}try{i.close()}catch(e){}})(),new Response(l.readable,{status:200,headers:{"content-type":"application/octet-stream","x-accel-buffering":"no","cache-control":"no-store"}})}(e,p)}catch(e){return W({ok:!1,msg:"xhttp 代理错误: "+(e.message||e)},500)}}if(A&&("sub"===m[1]||1===m.length&&!It(c))){const t=m.length>=3?m[2]:"";try{const n=await Qt(e,0,p,t);return new Response(n.body,{status:200,headers:{"Content-Type":n.type+"; charset=utf-8","Cache-Control":"no-store","Content-Disposition":"attachment; filename=\"Hopline\"; filename*=utf-8''Hopline"}})}catch(e){return new Response("订阅生成失败: "+(e&&e.message||e),{status:500,headers:{"Content-Type":"text/plain; charset=utf-8"}})}}if(C&&1===m.length&&It(c))return p.admin?await Ft(e,p,i)?new Response((Yt||(Yt=Pt.replace("/*@HOPLINE_SCHEMA@*/null",()=>JSON.stringify(g.map(e=>{const t=Object.assign({},e);return delete t.check,t})).replace(/</g,"\\u003c")).replace("/*@HOPLINE_CHECK@*/null",()=>"("+b.toString()+")").replace("/*@HOPLINE_HTTP_PORTS@*/null",()=>JSON.stringify([...U]))),Yt),{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}}):Response.redirect(new URL("/login?next="+encodeURIComponent("/"+h),e.url).href,302):new Response("面板已禁用：请先在 Worker 环境变量中设置 ADMIN（管理密码），然后重新访问。",{status:403,headers:{"Content-Type":"text/plain; charset=utf-8"}});if(C&&"api"===m[1]){const c=m[2]||"",d=await Ft(e,p,i);if(!d)return W({ok:!1,status:403,msg:"未授权（需要管理密码）"},403);if("config"===c){if("GET"===e.method)return W({ok:!0,data:qt(p,r)});if("POST"===e.method){if(p._kvError)return W({ok:!1,msg:Jt(p._kvError)+"，为避免覆盖已有配置，已禁止保存"},503);const t=u(r);if(!t||"function"!=typeof t.put)return W({ok:!1,msg:"未绑定 KV 命名空间（变量名 CONFIG_KV），无法保存面板配置；请在 Worker 设置中绑定 KV 后重试"},400);let n;try{n=await e.json()}catch(e){return W({ok:!1,msg:"请求体不是合法的 JSON"},400)}try{const{patch:e,errors:t,ignored:o}=function(e,t){const n={},r=[],o=[];if(!e||"object"!=typeof e||Array.isArray(e))return{patch:n,errors:[{field:"",label:"配置",msg:"请求体必须为 JSON 对象"}],ignored:o};const a=P(t),i=new Set;for(const t of g){const s=k(e,t.key);if(void 0===s)continue;if(i.add(t.key),a[t.key]){o.push(t.key);continue}if("secret"===t.type&&(""===s||null==s))continue;let l=b(t,s);if(!l.error&&t.check){const e=x[t.check](l.value);"string"==typeof e?l={error:e}:e&&"value"in e&&(l=e)}l.error?r.push({field:t.key,label:t.label||t.key,msg:l.error}):S(n,t.key,l.value)}const s=(e,t)=>{for(const n of Object.keys(e)){const r=t?t+"."+n:n;i.has(r)||w.has(r)||(g.some(e=>e.key.startsWith(r+"."))&&e[n]&&"object"==typeof e[n]&&!Array.isArray(e[n])?s(e[n],r):o.push(r))}};return s(e,""),{patch:n,errors:r,ignored:o}}(n,r);if(t.length)return W({ok:!1,msg:Xt(t),errors:t,ignored:o},400);const a=T(p);for(const t of g){const n=k(e,t.key);void 0!==n&&S(a,t.key,n)}const i=function(e){const t=[];e.enableVless||e.enableTrojan||e.enableXhttp||t.push({field:"enableVless",label:"协议开关",msg:"至少启用一种协议，否则订阅中没有任何节点"}),e.relay&&"custom"===e.relay.mode&&!String(e.relay.custom||"").trim()&&t.push({field:"relay.custom",label:"自定义反代列表",msg:"已选择「仅使用自定义反代」，请至少填写一个反代地址（或改回内置 / 关闭）"});for(const n of[1,2]){const r=e.ipsrc||{};r["api"+n]&&!r["api"+n+"Url"]&&t.push({field:"ipsrc.api"+n+"Url",label:"自定义优选 API "+n+" 地址",msg:"已开启该来源，请填写 API 地址（或关闭开关）"})}return t}(a);if(i.length)return W({ok:!1,msg:Xt(i),errors:i,ignored:o},400);!a.admin||Rt(a.admin)||P(r).admin||(a.admin=await async function(e){const t=crypto.getRandomValues(new Uint8Array(16));return Ot+1e4+"$"+$t(t)+"$"+await Dt(e,t,1e4)}(a.admin));const s=await async function(e,t){const n=u(e);if(!n||"function"!=typeof n.put)return null;const r=T(t),o=q(e,null),a=E();for(const e of g){const t=k(o,e.key);if(JSON.stringify(t)===JSON.stringify(k(a,e.key)))continue;if(JSON.stringify(k(r,e.key))!==JSON.stringify(t))continue;const n=e.key.split("."),i=n.length>1?k(r,n.slice(0,-1).join(".")):r;i&&delete i[n[n.length-1]]}for(const t of Object.keys(P(e))){const e=t.split("."),n=e.length>1?k(r,e.slice(0,-1).join(".")):r;n&&delete n[e[e.length-1]]}return await n.put("config",JSON.stringify(r)),r}(r,a),l=q(r,s),c={};if(l.admin&&Mt(l)!==Mt(p)){const e=await jt(l,d.iat);c["Set-Cookie"]=Gt(e.token,e.exp)}return W({ok:!0,data:qt(l,r),ignored:o,msg:"已保存：本地区立即生效，其他地区约 1 分钟内同步"},200,c)}catch(e){return W({ok:!1,msg:"保存失败: "+(e.message||e)},500)}}return W({ok:!1,msg:"仅支持 GET / POST"},405)}if("logout"===c)return"POST"!==e.method?W({ok:!1,msg:"仅支持 POST"},405):W({ok:!0,msg:"已退出登录"},200,{"Set-Cookie":"hopline_auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"});if("reset"===c){if("POST"!==e.method)return W({ok:!1,msg:"仅支持 POST"},405);try{if("unavailable"===p._kvError)return W({ok:!1,msg:Jt(p._kvError)+"，暂时无法重置"},503);const e=u(r);return e&&"function"==typeof e.delete?(await e.delete("config"),W({ok:!0,msg:"已重置：KV 已清空，面板还原为初始部署状态"})):W({ok:!1,msg:"未绑定 KV 命名空间，无需重置"},400)}catch(e){return W({ok:!1,msg:"重置失败: "+(e.message||e)},500)}}if("status"===c)return W({ok:!0,data:{version:t,host:l.hostname,path:h,region:e.cf&&e.cf.colo||"unknown",kv:!(!u(r)||"function"!=typeof u(r).get),workersDev:/\.workers\.dev$/i.test(l.hostname)}});if("update"===c)try{const e=await async function(){const e=Date.now();if(n&&e-n.t<6e4)return n.r;const r=await async function(e){try{const t=await fetch(function(e){return"https://raw.githubusercontent.com/iv7777/Hopline/main/"+encodeURIComponent(e)}(e),{headers:{"User-Agent":"Mozilla/5.0 (Hopline)"}});if(!t.ok)return{error:e+" HTTP "+t.status};const n=await t.text();return{txt:n,version:a(n)}}catch(e){return{error:e&&e.message||String(e)}}}("Hopline.js");return r.version?(n={t:e,r:{current:t,latest:r.version,hasUpdate:o(r.version,t)>0,code:r.txt,checkedAt:e}},n.r):{current:t,latest:null,hasUpdate:!1,code:"",error:r.error||"未在仓库中找到版本信息"}}(),r={current:e.current,latest:e.latest,hasUpdate:e.hasUpdate,error:e.error||""};return e.hasUpdate&&e.code&&(r.code=e.code),W({ok:!0,data:r})}catch(e){return W({ok:!1,msg:"检测失败: "+(e.message||e)},500)}if("ipsrc-test"===c){if("POST"!==e.method)return W({ok:!1,msg:"仅支持 POST"},405);let t={};try{t=await e.json()}catch(e){}const n=String(t&&t.source||""),r=Date.now();let o;if("hostmonit"===n)o=await je(150);else if("uouin"===n)o=await Ke();else if("wetest"===n)o=await async function(){const[e,t]=await Promise.all([qe("v4"),qe("v6")]),n={status:e.status||t.status,raw:"IPv4 页面\n"+e.raw+"\n\nIPv6 页面\n"+t.raw,items:[...e.items,...t.items],dropped:[...e.dropped,...t.dropped],error:""},r=[e.error&&"IPv4："+e.error,t.error&&"IPv6："+t.error].filter(Boolean);return r.length&&(n.error=r.join("；")),n}();else if("domains"===n){const e=x.domainList(String(t&&t.text||""));if("string"==typeof e)return W({ok:!1,msg:e},400);o=await async function(e){const t={status:200,raw:"",items:[],dropped:[],error:"",domains:[]},n=e.slice(0,25),r=await Promise.all(n.map(async e=>{const t=await oe(["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve"],t=>t+"?name="+encodeURIComponent(e)+"&type=A",e=>!e||0!==e.Status&&3!==e.Status?null:(e.Answer||[]).filter(e=>1===e.type&&/^\d+\.\d+\.\d+\.\d+$/.test(String(e.data))).map(e=>String(e.data)),{timeoutMs:4e3}),n=(t||[]).filter(s);return{domain:e,failed:null===t,ips:(t||[]).slice(0,4),cf:n.length,ok:n.length>0}}));t.domains=r;for(const e of r)e.ok?t.items.push({ip:e.ips.find(s),port:443,name:e.domain}):t.dropped.push(e.domain);return t.raw=r.map(e=>e.domain+" → "+(e.failed?"解析失败":e.ips.join(", ")||"无 A 记录")+(e.ok?"":"（不在 Cloudflare 段）")).join("\n"),e.length>n.length&&(t.raw+="\n… 另有 "+(e.length-n.length)+" 个域名未测试（单次最多测 25 个）"),t.items.length||(t.error="没有域名解析到 Cloudflare 段 IP"),t}(e.value?e.value.split("\n"):I.split("\n"))}else{if("api1"!==n&&"api2"!==n)return W({ok:!1,msg:"未知来源："+n},400);{const e=b(w.get("ipsrc."+n+"Url"),t.url);if(e.error||!e.value)return W({ok:!1,msg:e.error||"请先填写 API 地址"},400);o=await async function(e){const t={status:0,raw:"",items:[],dropped:[],error:""};let n=!1;const r=await rt(e,200,300,!1,!1,{fresh:!0,onRaw:(e,r,o)=>{n=!0,t.status=r,t.raw=o}}).catch(()=>[]);n?t.status?(t.status<200||t.status>=300)&&(t.error="HTTP "+t.status):t.error="请求失败或超时":t.error="地址无效";for(const e of r)(j(e.ip)&&s(e.ip)?t.items:t.dropped).push(j(e.ip)&&s(e.ip)?e:e.ip);return t.items.length||t.error||(t.error=t.dropped.length?"解析到的地址都不是 Cloudflare 段 IP":"未能从响应中解析出 IP"),t}(e.value)}}const a=4e3;return W({ok:!0,data:{source:n,ms:Date.now()-r,status:o.status,error:o.error||"",count:o.items.length,items:o.items.slice(0,300),droppedCount:o.dropped.length,dropped:o.dropped.slice(0,50),raw:o.raw.slice(0,a),rawLength:o.raw.length,domains:o.domains}})}if("sub"===c){const t=l.searchParams.get("fmt")||"";try{const n=await Qt(e,0,p,t);return W({ok:!0,type:n.type,body:n.body,count:n.count})}catch(e){return W({ok:!1,msg:"订阅生成失败: "+(e.message||e)},500)}}return W({ok:!1,msg:"未知 API: "+c},404)}return new Response("Not Found",{status:404})}export default{async fetch(e,t){const n={};let r=await Zt(e,t,n);return n.setCookie&&101!==r.status&&!r.headers.has("Set-Cookie")&&(r=new Response(r.body,r),r.headers.set("Set-Cookie",n.setCookie)),function(e){if(!e||101===e.status||e.webSocket)return e;const t=e.headers.get("Content-Type")||"",n=/^text\/html/i.test(t),r=/^application\/json/i.test(t);if(!n&&!r)return e;const o=new Headers(e.headers);return o.set("X-Content-Type-Options","nosniff"),o.set("Referrer-Policy","no-referrer"),n&&(o.set("Content-Security-Policy","default-src 'none'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"),o.set("X-Frame-Options","DENY")),new Response(e.body,{status:e.status,statusText:e.statusText,headers:o})}(r)}};
