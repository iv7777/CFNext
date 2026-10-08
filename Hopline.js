/*!Hopline v2.3.3*/
import{connect as t}from"cloudflare:sockets";const e="2.3.3";let n=null;function r(t){const e=String(t||"").match(/(\d+)\.(\d+)\.(\d+)/);return e?[parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10)]:null}function o(t,e){const n=r(t),o=r(e);if(!n||!o)return 0;for(let t=0;t<3;t++)if(n[t]!==o[t])return n[t]<o[t]?-1:1;return 0}function a(t){const e=t.match(/Hopline v(\d+\.\d+\.\d+)/);if(e)return e[1];const n=t.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);return n?n[1]:null}const i=["2400:cb00::/32","2606:4700::/32","2803:f800::/32","2405:b500::/32","2405:8100::/32","2a06:98c0::/29","2c0f:f248::/32"];function s(t){if(!j(t=String(t||"")))return!1;if(t.indexOf(":")>=0)return i.some(e=>function(t,e){const[n,r]=e.split("/"),o=parseInt(r,10),a=t=>{const e=t.indexOf("::");let n;if(e>=0){const r=t.slice(0,e).split(":").filter(Boolean),o=t.slice(e+2).split(":").filter(Boolean),a=8-r.length-o.length;n=[...r,...Array(a).fill("0"),...o]}else n=t.split(":");return n.map(t=>t.padStart(4,"0"))},i=t=>t.map(t=>parseInt(t,16).toString(2).padStart(16,"0")).join("");return i(a(t)).slice(0,o)===i(a(n)).slice(0,o)}(t,e));const e=t.split(".").map(Number),n=(e[0]<<24|e[1]<<16|e[2]<<8|e[3])>>>0;return z.some(([t,e])=>n>=t&&n<=e)}const l={HK:"香港",TW:"台湾",MO:"澳门",JP:"日本",SG:"新加坡",US:"美国",KR:"韩国",DE:"德国",FR:"法国",GB:"英国",CA:"加拿大",AU:"澳大利亚",SE:"瑞典",NL:"荷兰",FI:"芬兰",NO:"挪威",DK:"丹麦",CH:"瑞士",IT:"意大利",ES:"西班牙",PT:"葡萄牙",IE:"爱尔兰",BE:"比利时",AT:"奥地利",PL:"波兰",CZ:"捷克",RO:"罗马尼亚",HU:"匈牙利",GR:"希腊",RU:"俄罗斯",TR:"土耳其",UA:"乌克兰",IN:"印度",TH:"泰国",MY:"马来西亚",VN:"越南",PH:"菲律宾",ID:"印尼",BR:"巴西",MX:"墨西哥",AR:"阿根廷",CL:"智利",ZA:"南非",EG:"埃及",AE:"阿联酋",IL:"以色列",NZ:"新西兰",KZ:"哈萨克斯坦",SA:"沙特"},c={HK:"proxyip.hk.cmliussss.net",US:"proxyip.us.cmliussss.net",SG:"proxyip.sg.cmliussss.net",JP:"proxyip.jp.cmliussss.net",KR:"proxyip.kr.cmliussss.net",DE:"proxyip.de.cmliussss.net",SE:"proxyip.se.cmliussss.net",NL:"proxyip.nl.cmliussss.net",FI:"proxyip.fi.cmliussss.net",GB:"proxyip.gb.cmliussss.net",Oracle:"proxyip.oracle.cmliussss.net",DigitalOcean:"proxyip.digitalocean.cmliussss.net",Vultr:"proxyip.vultr.cmliussss.net",Multacom:"proxyip.multacom.cmliussss.net"},p={uuid:["UUID","U"],path:["PATH","D"],admin:["ADMIN","admin"],adminUser:["ADMIN_USER"],outbound:["OUTBOUND_PROXY","OUTBOUND","S"],ech:["ENABLE_ECH","ECH"],trojan:["ENABLE_TROJAN","TROJAN"],kv:["CONFIG_KV","K"]};function d(t,e){for(const n of p[e])if(t&&null!=t[n]&&""!==String(t[n]))return t[n]}function u(t){for(const e of p.kv)if(t&&t[e]&&"object"==typeof t[e])return t[e];return null}const f="^[A-Za-z0-9._~-]+$",h="^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*$",m=["login","version"],g=[{key:"uid",type:"string",def:"",el:"a-uuid",label:"UUID",required:!0,lower:!0,pattern:"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",hint:"UUID 格式不正确（应为 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx，可点「生成」）"},{key:"pth",type:"string",def:"",el:"a-path",label:"面板路径",maxLen:128,strip:["^/+","/+$"],pattern:f,hint:"只能包含字母、数字及 . _ ~ -（不含 /）",reserved:m,envLock:p.path},{key:"sbu",type:"string",def:"",el:"a-suburl",label:"自定义订阅路径",maxLen:128,strip:["^/+","/+$","/sub$","/+$"],pattern:f,hint:"只填一段别名，如 AAZ（字母、数字及 . _ ~ -）",reserved:m},{key:"adu",type:"string",def:"admin",el:"a-adminuser",label:"管理用户名",maxLen:64,fillDefault:!0,pattern:"^[^\\s\\x00-\\x1f\\x7f]+$",hint:"不能包含空格或控制字符",envLock:p.adminUser},{key:"adp",type:"secret",def:"",el:"a-admin",label:"管理密码",trim:!1,maxLen:256,envLock:p.admin,check:"adminPass"},{key:"hst",type:"string",def:"",el:"a-host",label:"绑定域名",maxLen:253,strip:["^https?://","[/?#].*$"],pattern:h,hint:"请填写域名，如 node.example.com"},{key:"evl",type:"bool",def:!0,el:"en-vless",label:"VLESS 协议"},{key:"etr",type:"bool",def:!1,el:"en-trojan",label:"Trojan 协议"},{key:"trp",type:"string",def:"",el:"tp-pass",label:"Trojan 密码",trim:!1,maxLen:256,noExport:!0},{key:"exh",type:"bool",def:!0,el:"en-xhttp",label:"XHTTP 协议"},{key:"apn",type:"string",def:"",el:"alpn",label:"ALPN",maxLen:64,pattern:"^[A-Za-z0-9./-]+(\\s*,\\s*[A-Za-z0-9./-]+)*$",hint:"以逗号分隔，如 h2,http/1.1"},{key:"ecn",type:"bool",def:!1,el:"ech-on",label:"ECH"},{key:"ehs",type:"string",def:"cloudflare-ech.com",el:"ech-host",label:"ECH 域名",fillDefault:!0,maxLen:253,strip:["^https?://","[/?#].*$"],pattern:h,hint:"请填写域名，如 cloudflare-ech.com"},{key:"edn",type:"string",def:"",el:"ech-dns",label:"ECH DNS",maxLen:512,pattern:"^https://\\S+$",hint:"须为 https:// 开头的 DoH 地址"},{key:"tlo",type:"bool",def:!0,el:"tls-only",label:"仅 TLS 端口"},{key:"pxy",type:"string",def:"",el:"s-proxyIP",label:"反代 / 落地 IP",maxLen:256,pattern:"^[^\\s/]+$",hint:"格式为 host 或 host:port",check:"hostPort"},{key:"obp",type:"string",def:"",el:"s-outbound",label:"出站代理",maxLen:1024,pattern:"^\\S+$",hint:"出站代理不能包含空格",check:"proxy"},{key:"obm",type:"enum",def:"",el:"s-outmode",label:"出站方式",options:["","no","only"]},{key:"pfd",type:"text",def:"",el:"o-prefdomains",label:"优选域名",maxLen:4096,check:"domainList"},{key:"rl.md",type:"enum",def:"builtin",el:"rl-mode",label:"地区反代模式",options:["builtin","custom","off"]},{key:"rl.rg",type:"enum",def:"",el:"rl-region",label:"首选反代地区",options:["",...Object.keys(c)]},{key:"rl.r2",type:"enum",def:"",el:"rl-region2",label:"次选反代地区",options:["","none",...Object.keys(c)]},{key:"rl.cu",type:"text",def:"",el:"rl-custom",label:"自定义反代列表",maxLen:1024,check:"relayList"},{key:"ft.rg",type:"list",def:["all"],label:"节点地区",options:["all","HK","TW","US","SG","JP","KR","DE"],exclusive:"all",emptyValue:["all"],els:{all:"fl-region-all",HK:"fl-region-HK",TW:"fl-region-TW",US:"fl-region-US",SG:"fl-region-SG",JP:"fl-region-JP",KR:"fl-region-KR",DE:"fl-region-DE"}},{key:"ft.ip",type:"list",def:["IPv4"],label:"IP 类型",options:["IPv4","IPv6"],els:{IPv4:"fl-ip4",IPv6:"fl-ip6"}},{key:"ft.is",type:"list",def:["移动","联通","电信"],label:"运营商偏好",options:["移动","联通","电信"],els:{"移动":"fl-isp-m","联通":"fl-isp-c","电信":"fl-isp-t"}},{key:"sc.nv",type:"bool",def:!1,el:"fl-native",label:"原生地址"},{key:"sc.pd",type:"bool",def:!0,el:"fl-pref-domain",label:"优选域名"},{key:"sc.pi",type:"bool",def:!0,el:"fl-pref-ip",label:"优选 IP"},{key:"ix.hm",type:"bool",def:!0,el:"ps-hostmonit",label:"HostMonit 实时优选"},{key:"ix.uo",type:"bool",def:!0,el:"ps-uouin",label:"uouin 分线路优选"},{key:"ix.wt",type:"bool",def:!1,el:"ps-wetest",label:"微测网优选"},{key:"ix.a1",type:"bool",def:!1,el:"ps-api1-on",label:"自定义优选 API 1"},{key:"ix.a1u",type:"string",def:"",el:"ps-api1-url",label:"自定义优选 API 1 地址",maxLen:1024,pattern:"^(https?|sub)://\\S+$",hint:"须为 http(s):// 或 sub:// 开头的地址"},{key:"ix.a2",type:"bool",def:!1,el:"ps-api2-on",label:"自定义优选 API 2"},{key:"ix.a2u",type:"string",def:"",el:"ps-api2-url",label:"自定义优选 API 2 地址",maxLen:1024,pattern:"^(https?|sub)://\\S+$",hint:"须为 http(s):// 或 sub:// 开头的地址"}];function b(t,e){var n,r=t.type;if("bool"===r)return!0===e||"true"===e||"1"===e||1===e?{value:!0}:!1===e||"false"===e||"0"===e||0===e?{value:!1}:{error:"必须为开或关"};if("int"===r){var o="number"==typeof e?e:/^\s*-?\d+\s*$/.test(String(null==e?"":e))?parseInt(e,10):NaN;return isFinite(o)&&Math.floor(o)===o?null!=t.min&&o<t.min||null!=t.max&&o>t.max?{error:"取值范围为 "+t.min+" - "+t.max}:{value:o}:{error:"必须为整数"}}if("enum"===r)return e=null==e?"":String(e),t.options.indexOf(e)<0?{error:"不支持的选项："+e}:{value:e};if("list"===r){Array.isArray(e)||(e=null==e||""===e?[]:[String(e)]);var a=[];for(n=0;n<e.length;n++){var i=String(e[n]);if(t.options.indexOf(i)<0)return{error:"不支持的选项："+i};a.indexOf(i)<0&&a.push(i)}return t.exclusive&&a.indexOf(t.exclusive)>=0&&(a=[t.exclusive]),!a.length&&t.emptyValue&&(a=t.emptyValue.slice()),{value:a}}if("string"===r||"secret"===r||"text"===r){if(null==e&&(e=""),"string"!=typeof e&&"number"!=typeof e)return{error:"格式不正确"};if(e=String(e),!1!==t.trim&&(e=e.trim()),t.strip)for(n=0;n<t.strip.length;n++)e=e.replace(new RegExp(t.strip[n],"i"),"");return t.lower&&(e=e.toLowerCase()),e?t.maxLen&&e.length>t.maxLen?{error:"长度不能超过 "+t.maxLen}:t.pattern&&!new RegExp(t.pattern).test(e)?{error:t.hint||"格式不正确"}:t.reserved&&t.reserved.indexOf(e.toLowerCase())>=0?{error:"「"+e+"」为保留路径，请换一个"}:{value:e}:t.required?{error:"不能为空"}:{value:t.fillDefault?t.def:""}}return{value:e}}const v=["aes-128-gcm","aes-256-gcm","chacha20-ietf-poly1305"],y=/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/,x={domainList(t){const e=new Set,n=[];for(const r of String(t||"").split(/[\n,;\s]+/).filter(Boolean)){const t=r.toLowerCase();if(!y.test(t)||/^[0-9]+$/.test(t.slice(t.lastIndexOf(".")+1)))return"「"+r.slice(0,60)+"」不是有效的域名：只填主机名（如 cf.example.com），不含 http://、端口、路径或通配符，IP 地址不能作为优选域名";e.has(t)||(e.add(t),n.push(t))}return n.length>30?"最多 30 个域名（当前 "+n.length+" 个）":{value:n.join("\n")}},relayList(t){const e=new Set,n=[];for(const r of String(t||"").split(/[\n,;]+/).map(t=>t.trim()).filter(Boolean)){const{host:t,port:o}=_(r,443),a=t.toLowerCase();if(!a||!j(a)&&!new RegExp(h).test(a))return"「"+r.slice(0,60)+"」不是有效的反代地址（格式 host 或 host:port，IPv6 需加方括号）";if(!(o>=1&&o<=65535))return"「"+r.slice(0,60)+"」的端口须为 1 - 65535";const i=(a.indexOf(":")>=0?"["+a+"]":a)+(443===o?"":":"+o);e.has(i)||(e.add(i),n.push(i))}return n.length>3?"最多 3 个自定义反代（当前 "+n.length+" 个）":{value:n.join("\n")}},adminPass(t){if(t&&String(t).startsWith("hopline-pbkdf2$"))return"密码不能以 hopline-pbkdf2$ 开头"},hostPort(t){if(!t)return;const{host:e,port:n}=_(t,443);return e?n>=1&&n<=65535?void 0:"端口须为 1 - 65535":"缺少主机名"},proxy(t){if(!t)return;const e=B(t);if(!e||!e.host)return"无法解析出站代理地址（格式如 socks5://user:pass@1.2.3.4:1080）";if(!(e.port>=1&&e.port<=65535))return"出站代理端口须为 1 - 65535";if("ss"===e.type){if(!lt(e.method))return"SS 加密方式仅支持 "+v.join(" / ");if(!e.password)return"SS 缺少密码"}}},w=new Map(g.map(t=>[t.key,t]));function k(t,e){let n=t;for(const t of e.split(".")){if(null==n||"object"!=typeof n)return;n=n[t]}return n}function S(t,e,n){const r=e.split(".");let o=t;for(let t=0;t<r.length-1;t++)null!=o[r[t]]&&"object"==typeof o[r[t]]||(o[r[t]]={}),o=o[r[t]];o[r[r.length-1]]=n}const C=t=>void 0===t?void 0:JSON.parse(JSON.stringify(t));function E(){const t={};for(const e of g)S(t,e.key,C(e.def));return t}function T(t){const e={};for(const n of g){const r=k(t,n.key);void 0!==r&&S(e,n.key,C(r))}return e}function P(t){const e={};for(const n of g){if(!n.envLock)continue;const r=n.envLock.find(e=>t&&null!=t[e]&&""!==String(t[e]));r&&(e[n.key]=r)}return e}const A=["cloudflare.com","www.cloudflare.com","speed.cloudflare.com"],I=["cloudflare.182682.xyz","cdn.2020111.xyz","cf.0sm.com","cf.090227.xyz","cfip.1323123.xyz","cnamefuckxxs.yuchen.icu","cloudflare-ip.mofashi.ltd","cdn.tzpro.xyz","cf.877771.xyz","xn--b6gac.eu.org","bestcf.030101.xyz","cdns.doon.eu.org","fn.130519.xyz","saas.sin.fan"].join("\n"),U=new Set([80,8080,8880,2052,2082,2086,2095]),L=new TextEncoder,O=new TextDecoder,$=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],D=[3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745];function N(t,e){return(t<<e|t>>>32-e)>>>0}function R(t){const e=8*t.length,n=1+(t.length+8>>6)<<6,r=new Uint8Array(n);r.set(t),r[t.length]=128;const o=new DataView(r.buffer);o.setUint32(n-8,e>>>0,!0),o.setUint32(n-4,Math.floor(e/4294967296),!0);let a=1732584193,i=4023233417,s=2562383102,l=271733878;for(let t=0;t<n;t+=64){const e=new Uint32Array(16);for(let n=0;n<16;n++)e[n]=o.getUint32(t+4*n,!0);let n=a,r=i,c=s,p=l;for(let t=0;t<64;t++){let o,a;t<16?(o=r&c|~r&p,a=t):t<32?(o=p&r|~p&c,a=(5*t+1)%16):t<48?(o=r^c^p,a=(3*t+5)%16):(o=c^(r|~p),a=7*t%16);const i=n+o+D[t]+e[a]>>>0;n=p,p=c,c=r,r=r+N(i,$[t])>>>0}a=a+n>>>0,i=i+r>>>0,s=s+c>>>0,l=l+p>>>0}const c=new Uint8Array(16),p=new DataView(c.buffer);return[a,i,s,l].forEach((t,e)=>p.setUint32(4*e,t,!0)),c}function H(t){return Array.from(R(L.encode(String(t)))).map(t=>t.toString(16).padStart(2,"0")).join("")}function M(t){return/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(t||"")}function _(t,e=443){if(!(t=String(t||"").trim()))return{host:"",port:e};if(t.startsWith("[")){const n=t.match(/^\[([^\]]+)\](?::(\d+))?$/);return{host:n?n[1]:t.replace(/^\[|\]$/g,""),port:n&&n[2]?parseInt(n[2]):e}}const n=t.lastIndexOf(":");return n>0&&/^\d+$/.test(t.slice(n+1))?{host:t.slice(0,n),port:parseInt(t.slice(n+1))}:{host:t,port:e}}function j(t){if(!(t=String(t||"").trim()))return!1;const e=t.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(e)return e.slice(1).every(t=>Number(t)<=255);if(!/^[0-9a-fA-F:]+$/.test(t))return!1;if((t.match(/::/g)||[]).length>1)return!1;const n=t.includes("::"),r=t.replace(/::/g,":").split(":").filter(Boolean);return!(!n&&8!==r.length)&&(!n||!(r.length<1||r.length>7))&&r.every(t=>/^[0-9a-fA-F]{1,4}$/.test(t))}function F(t){const e=[];for(let n=0;n<16;n+=2)e.push((t[n]<<8|t[n+1]).toString(16));let n=-1,r=0,o=-1,a=0;for(let t=0;t<8;t++)"0"===e[t]?(o<0?(o=t,a=1):a++,a>r&&(r=a,n=o)):(o=-1,a=0);if(r>=2){const t=e.slice(0,n).join(":");return(t?t+"::":"::")+e.slice(n+r).join(":")}return e.join(":")}const z=["173.245.48.0/20","103.21.244.0/22","103.22.200.0/22","103.31.4.0/22","141.101.64.0/18","108.162.192.0/18","190.93.240.0/20","188.114.96.0/20","197.234.240.0/22","198.41.128.0/17","162.158.0.0/15","104.16.0.0/13","104.24.0.0/14","172.64.0.0/13","131.0.72.0/22"].map(function(t){const[e,n]=t.split("/"),r=e.split(".").map(Number),o=(r[0]<<24|r[1]<<16|r[2]<<8|r[3])>>>0,a=n>=32?0:4294967295<<32-n>>>0;return[(o&a)>>>0,(o|~a>>>0)>>>0]});function B(t){if(!t)return null;let e="socks5",n=String(t).trim();const r=n.match(/^(socks5|http|https|ss):\/\/(.+)$/i);if(r&&(e=r[1].toLowerCase(),n=r[2]),"ss"===e)return function(t){let e=t,n="";const r=t.indexOf("#");r>=0&&(e=t.slice(0,r));const o=e.lastIndexOf("@");if(o>=0)n=e.slice(0,o),e=e.slice(o+1);else{const t=K(e);if(t&&t.includes("@")){const r=t.lastIndexOf("@");n=t.slice(0,r),e=t.slice(r+1)}}let a="",i="";if(n){let t=K(n)||n;try{t=decodeURIComponent(t)}catch(t){}const e=t.indexOf(":");e>0?(a=t.slice(0,e),i=t.slice(e+1)):a=t}const{host:s,port:l}=_(e,8388);return{type:"ss",host:s,port:l,method:a,password:i}}(n);let o="",a="";if(n.includes("@")){const t=n.lastIndexOf("@"),e=n.slice(0,t),r=n.slice(t+1),i=t=>{try{return decodeURIComponent(t)}catch(e){return t}},s=e.indexOf(":");s>=0?(o=i(e.slice(0,s)),a=i(e.slice(s+1))):o=i(e),n=r}const i="http"===e?80:"https"===e?443:1080,{host:s,port:l}=_(n,i);return{type:e,host:s,port:l,user:o,pass:a}}function K(t){try{const e=atob(String(t).replace(/-/g,"+").replace(/_/g,"/")),n=new Uint8Array(e.length);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return new TextDecoder("utf-8").decode(n)}catch(t){return null}}function W(t,e,n){return new Response(JSON.stringify(t),{status:e||200,headers:Object.assign({"Content-Type":"application/json; charset=utf-8"},n||{})})}function V(t){const e=String(d(t,"uuid")||"").toLowerCase();return M(e)?e:""}const G=new WeakMap;function q(t,e){const n=E(),r=t=>!0===t||"true"===t||"1"===t||1===t;if(d(t,"uuid")&&(n.uid=String(d(t,"uuid")).toLowerCase()),t.HOST&&(n.hst=String(t.HOST).replace(/^https?:\/\//,"").split("/")[0]),t.PROXYIP&&(n.pxy=String(t.PROXYIP)),d(t,"outbound")&&(n.obp=String(d(t,"outbound"))),r(d(t,"ech"))&&(n.ecn=!0),r(d(t,"trojan"))&&(n.etr=!0),t.TROJAN_PASSWORD&&(n.trp=String(t.TROJAN_PASSWORD)),t.ALPN&&(n.apn=String(t.ALPN)),e&&"object"==typeof e)for(const t of g){const r=k(e,t.key);void 0!==r&&S(n,t.key,C(r))}const o=P(t);for(const e of Object.keys(o)){const r=w.get(e);let a=String(t[o[e]]);r.lower&&(a=a.toLowerCase()),S(n,e,a)}n.uid=String(n.uid||"").toLowerCase(),M(n.uid)||(n.uid=V(t));const a=function(t){const e=String(null==t?"":t).trim().replace(/^\/+/,"").replace(/\/+$/,"");return e?!new RegExp(f).test(e)||e.length>128?{value:"",error:"只能包含字母、数字及 . _ ~ -（不含 /），最长 128 位"}:m.indexOf(e.toLowerCase())>=0?{value:"",error:"「"+e+"」为保留路径，请换一个"}:{value:e,error:""}:{value:"",error:""}}(o.pth?t[o.pth]:"");return n.pth=a.value,a.error&&(n._pathError=a.error),n}let J={s:null,b:null};function X(t){const e=String(t||"");if(J.s===e)return J.b;const n=e.replace(/-/g,"").toLowerCase();if(!/^[0-9a-f]{32}$/.test(n))throw new Error("服务端 UUID 配置无效");const r=new Uint8Array(16);for(let t=0;t<16;t++)r[t]=parseInt(n.substr(2*t,2),16);return J={s:e,b:r},r}function Q(t,e){if(!t||t.byteLength<1)throw new Error("VLESS 头部过短");const n=new DataView(t.buffer,t.byteOffset,t.byteLength);let r=0;if(0!==n.getUint8(0))throw new Error("不支持的 VLESS 版本");if(t.byteLength<17)throw new Error("VLESS 头部过短");const o=X(e&&e.uid);let a=0;for(let t=0;t<16;t++)a|=n.getUint8(1+t)^o[t];if(0!==a)throw new Error("UUID 不匹配");if(r+=17,r>=t.byteLength)throw new Error("VLESS 头部过短");const i=n.getUint8(r);if(r+=1,r+=i,r+4>t.byteLength)throw new Error("VLESS 头部过短");const s=n.getUint8(r);r+=1;const l=n.getUint16(r);r+=2;const c=n.getUint8(r);r+=1;const{addr:p,len:d}=function(t,e,n,r){const o=e=>{if(n+e>t.byteLength)throw new Error("VLESS 头部过短")};if(1===r)return o(4),{addr:`${e.getUint8(n)}.${e.getUint8(n+1)}.${e.getUint8(n+2)}.${e.getUint8(n+3)}`,len:4};if(2===r){o(1);const r=e.getUint8(n);o(1+r);const a=t.subarray(n+1,n+1+r);return{addr:O.decode(a),len:1+r}}if(3===r)return o(16),{addr:F(t.subarray(n,n+16)),len:16};throw new Error("无法识别的地址类型")}(t,n,r,c);return r+=d,{command:s,port:l,addr:p,headerLength:r,earlyData:t.subarray(r)}}const Y=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Z(t){const e=L.encode(String(t)),n=8*e.length,r=1+(e.length+8>>6)<<6,o=new Uint8Array(r);o.set(e),o[e.length]=128;const a=new DataView(o.buffer);a.setUint32(r-8,Math.floor(n/4294967296),!1),a.setUint32(r-4,n>>>0,!1);let i=3238371032,s=914150663,l=812702999,c=4144912697,p=4290775857,d=1750603025,u=1694076839,f=3204075428;const h=(t,e)=>t>>>e|t<<32-e;for(let t=0;t<r;t+=64){const e=new Uint32Array(64);for(let n=0;n<16;n++)e[n]=a.getUint32(t+4*n,!1);for(let t=16;t<64;t++){const n=h(e[t-15],7)^h(e[t-15],18)^e[t-15]>>>3,r=h(e[t-2],17)^h(e[t-2],19)^e[t-2]>>>10;e[t]=e[t-16]+n+e[t-7]+r>>>0}let n=i,r=s,o=l,m=c,g=p,b=d,v=u,y=f;for(let t=0;t<64;t++){const a=y+(h(g,6)^h(g,11)^h(g,25))+(g&b^~g&v)+Y[t]+e[t]>>>0,i=n&r^n&o^r&o;y=v,v=b,b=g,g=m+a>>>0,m=o,o=r,r=n,n=a+((h(n,2)^h(n,13)^h(n,22))+i>>>0)>>>0}i=i+n>>>0,s=s+r>>>0,l=l+o>>>0,c=c+m>>>0,p=p+g>>>0,d=d+b>>>0,u=u+v>>>0,f=f+y>>>0}let m="";for(const t of[i,s,l,c,p,d,u])m+=(t>>>24&255).toString(16).padStart(2,"0"),m+=(t>>>16&255).toString(16).padStart(2,"0"),m+=(t>>>8&255).toString(16).padStart(2,"0"),m+=(255&t).toString(16).padStart(2,"0");return m}let tt="",et="";function nt(t,e){if(!e.etr||!t||t.byteLength<58)return!1;const n=t.subarray(0,56);return O.decode(n).toLowerCase()===((r=e.trp||e.uid)!==tt&&(tt=r,et=Z(r)),et);var r}const rt=["https://cloudflare-dns.com/dns-query","https://dns.google/dns-query","https://dns.alidns.com/resolve","https://doh.pub/dns-query"];function ot(t,e,n,r){const o=r&&r.hedgeMs||700,a=r&&r.timeoutMs||4e3;return new Promise(r=>{let i=0,s=0,l=!1,c=null;const p=t=>{l||(l=!0,clearTimeout(c),r(t))},d=()=>{if(l)return;if(clearTimeout(c),i>=t.length)return void(s||p(null));const r=t[i++];s++,i<t.length&&(c=setTimeout(d,o)),(async()=>{let t=null;try{const o=await ne(e(r),{headers:{accept:"application/dns-json"}},a);o&&o.ok&&(t=n(await o.json()))}catch(t){}s--,null!=t?p(t):l||0!==s||d()})()};d()})}function at(t){const e=String(t).split("::"),n=e[0]?e[0].split(":").filter(Boolean):[],r=e[1]?e[1].split(":").filter(Boolean):[],o=[...n,...Array(Math.max(0,8-n.length-r.length)).fill("0"),...r],a=new Uint8Array(16);return o.forEach((t,e)=>{const n=parseInt(t,16)||0;a[2*e]=n>>8&255,a[2*e+1]=255&n}),a}async function it(e,n,r){const o=t({hostname:e,port:n});try{await function(t,e){return Promise.race([t,new Promise((t,n)=>setTimeout(()=>n(new Error("连接超时（SYN 被静默丢弃）")),e||6e3))])}(o.opened,r||6e3)}catch(t){try{o.close()}catch(t){}throw t}return o}async function st(t,e){return it(t.hostname,t.port,e||6e3)}function lt(t){const e=String(t||"").toLowerCase().replace(/_/g,"-");return"aes-128-gcm"===e||"aes-128gcm"===e?{name:"AES-GCM",keyLen:16}:"aes-256-gcm"===e||"aes-256gcm"===e?{name:"AES-GCM",keyLen:32}:"chacha20-ietf-poly1305"===e||"chacha20-poly1305"===e||"chacha20poly1305"===e?{name:"CHACHA20-POLY1305",keyLen:32}:null}function ct(t){const e=t instanceof Uint8Array?t:new Uint8Array(t),n=e.length,r=8*n,o=new Uint8Array(1+(n+8>>6)<<6);o.set(e),o[n]=128;const a=new DataView(o.buffer);a.setUint32(o.length-8,Math.floor(r/4294967296),!1),a.setUint32(o.length-4,r>>>0,!1);let i=1732584193,s=4023233417,l=2562383102,c=271733878,p=3285377520;const d=new Uint32Array(80);for(let t=0;t<o.length;t+=64){for(let e=0;e<16;e++)d[e]=a.getUint32(t+4*e,!1);for(let t=16;t<80;t++)d[t]=N(d[t-3]^d[t-8]^d[t-14]^d[t-16],1);let e=i,n=s,r=l,o=c,u=p;for(let t=0;t<80;t++){let a,i;t<20?(a=n&r|~n&o,i=1518500249):t<40?(a=n^r^o,i=1859775393):t<60?(a=n&r|n&o|r&o,i=2400959708):(a=n^r^o,i=3395469782);const s=N(e,5)+a+u+i+d[t]>>>0;u=o,o=r,r=N(n,30),n=e,e=s}i=i+e>>>0,s=s+n>>>0,l=l+r>>>0,c=c+o>>>0,p=p+u>>>0}const u=new Uint8Array(20),f=new DataView(u.buffer);return f.setUint32(0,i,!1),f.setUint32(4,s,!1),f.setUint32(8,l,!1),f.setUint32(12,c,!1),f.setUint32(16,p,!1),u}function pt(t,e){let n=t;n.length>64&&(n=ct(n));const r=new Uint8Array(64),o=new Uint8Array(64);for(let t=0;t<64;t++)r[t]=54^(t<n.length?n[t]:0),o[t]=92^(t<n.length?n[t]:0);return ct(vt(o,ct(vt(r,e))))}function dt(t,e,n){const r=pt(e&&e.length?e:new Uint8Array(20),t);let o=new Uint8Array(0),a=new Uint8Array(0);for(let t=1;a.length<n;t++){const e=new Uint8Array([t]);o=pt(r,vt(vt(o,L.encode("ss-subkey")),e)),a=vt(a,o)}return a.slice(0,n)}function ut(t,e,n){const r=new Uint32Array(16);r[0]=1634760805,r[1]=857760878,r[2]=2036477234,r[3]=1797285236;const o=new DataView(t.buffer,t.byteOffset,32);for(let t=0;t<8;t++)r[4+t]=o.getUint32(4*t,!0);r[12]=e>>>0;const a=new DataView(n.buffer,n.byteOffset,12);r[13]=a.getUint32(0,!0),r[14]=a.getUint32(4,!0),r[15]=a.getUint32(8,!0);const i=r.slice(),s=(t,e,n,r)=>{i[t]=i[t]+i[e]>>>0,i[r]=N(i[r]^i[t],16),i[n]=i[n]+i[r]>>>0,i[e]=N(i[e]^i[n],12),i[t]=i[t]+i[e]>>>0,i[r]=N(i[r]^i[t],8),i[n]=i[n]+i[r]>>>0,i[e]=N(i[e]^i[n],7)};for(let t=0;t<10;t++)s(0,4,8,12),s(1,5,9,13),s(2,6,10,14),s(3,7,11,15),s(0,5,10,15),s(1,6,11,12),s(2,7,8,13),s(3,4,9,14);const l=new Uint8Array(64),c=new DataView(l.buffer);for(let t=0;t<16;t++)i[t]=i[t]+r[t]>>>0,c.setUint32(4*t,i[t],!0);return l}function ft(t,e,n,r){const o=r.slice(),a=Math.ceil(r.length/64);for(let r=0;r<a;r++){const a=ut(t,n+r,e),i=64*r,s=Math.min(64,o.length-i);for(let t=0;t<s;t++)o[i+t]^=a[t]}return o}function ht(t,e){let n=0n,r=0n;for(let e=0;e<16;e++)n|=BigInt(t[e])<<BigInt(8*e),r|=BigInt(t[16+e])<<BigInt(8*e);n&=0x0ffffffc0ffffffc0ffffffc0fffffffn;let o=0n;const a=(1n<<130n)-5n;for(let t=0;t<e.length;t+=16){let r=1n;for(let n=Math.min(16,e.length-t)-1;n>=0;n--)r=r<<8n|BigInt(e[t+n]);o=(o+r)*n%a}o=o+r&(1n<<128n)-1n;const i=new Uint8Array(16);for(let t=0;t<16;t++)i[t]=Number(o>>BigInt(8*t)&0xffn);return i}async function mt(t,e){const n=function(){const t=new Uint8Array(12);return()=>{const e=t.slice();for(let e=0;e<12&&(t[e]++,0===t[e]);e++);return e}}();if("CHACHA20-POLY1305"===t)return{seal:t=>function(t,e,n){const r=new Uint8Array(0),o=ft(t,e,0,new Uint8Array(32)),a=ft(t,e,1,n),i=t=>new Uint8Array((16-t%16)%16),s=t=>{const e=new Uint8Array(8),n=new DataView(e.buffer);return n.setUint32(0,t>>>0,!0),n.setUint32(4,Math.floor(t/4294967296),!0),e},l=vt(r,vt(i(r.length),vt(a,vt(i(a.length),vt(s(r.length),s(a.length))))));return vt(a,ht(o,l))}(e,n(),t),open(t){const r=function(t,e,n){if(n.length<16)throw new Error("SS AEAD 数据过短");const r=n.subarray(0,n.length-16),o=n.subarray(n.length-16),a=new Uint8Array(0),i=t=>new Uint8Array((16-t%16)%16),s=t=>{const e=new Uint8Array(8),n=new DataView(e.buffer);return n.setUint32(0,t>>>0,!0),n.setUint32(4,Math.floor(t/4294967296),!0),e},l=ht(ft(t,e,0,new Uint8Array(32)),vt(a,vt(i(a.length),vt(r,vt(i(r.length),vt(s(a.length),s(r.length)))))));let c=0;for(let t=0;t<16;t++)c|=l[t]^o[t];return 0!==c?null:ft(t,e,1,r)}(e,n(),t);if(!r)throw new Error("SS AEAD 解密失败（密码/加密方式与服务器不匹配）");return r}};const r=await crypto.subtle.importKey("raw",e,{name:t},!1,["encrypt","decrypt"]);return{seal:async e=>new Uint8Array(await crypto.subtle.encrypt({name:t,iv:n()},r,e)),async open(e){try{return new Uint8Array(await crypto.subtle.decrypt({name:t,iv:n()},r,e))}catch(t){throw new Error("SS AEAD 解密失败（密码/加密方式与服务器不匹配）")}}}}const gt=16383;async function bt(t,e){const n=new Uint8Array([e.length>>8&255,255&e.length]);return vt(await t.seal(n),await t.seal(e))}function vt(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t,0),n.set(e,t.length),n}function yt(t,e){t:for(let n=0;n<=t.length-e.length;n++){for(let r=0;r<e.length;r++)if(t[n+r]!==e[r])continue t;return n}return-1}const xt=new Map;function wt(t,e){for(;t.size>e;)t.delete(t.keys().next().value)}const kt=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve","https://doh.pub/dns-query"];async function St(t,e,n){if(e=e||443,j(t))return[{hostname:t,port:e}];const r=!(n&&!1===n.txt),o=t+":"+e+(r?"":":a"),a=xt.get(o);if(a&&Date.now()-a.t<(a.ips.length?3e5:3e4))return a.ips;const i=await async function(t,e,n){const r=async(e,n)=>await ot(kt,n=>n+"?name="+encodeURIComponent(t)+"&type="+e,t=>!t||0!==t.Status&&3!==t.Status?null:(t.Answer||[]).filter(t=>t.type===n).map(t=>t.data))||[],[o,a]=await Promise.all([n?r("TXT",16):[],r("A",1)]);let i=[];for(const t of o){const n=String(t).replace(/^"|"$/g,"").replace(/\\010/g,",").replace(/\n/g,",").trim();if(!n)continue;if("@edtunnel"===n){i=a.filter(t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)).map(t=>({hostname:t,port:e}));break}const r=n.split(/[,;\s]+/).map(t=>t.trim()).filter(Boolean),o=[];for(const t of r){const{host:n,port:r}=_(t,e);j(n)&&o.push({hostname:n,port:r})}if(o.length){i=o;break}}i.length||(i=a.filter(t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)).map(t=>({hostname:t,port:e}))),i.length||(i=(await r("AAAA",28)).filter(t=>j(t)).map(t=>({hostname:t,port:e})));const s=new Set;return i.filter(t=>{const e=t.hostname+":"+t.port;return!s.has(e)&&(s.add(e),!0)})}(t,e,r);return xt.set(o,{t:Date.now(),ips:i}),wt(xt,200),i}async function Ct(t){if(!t||!t.length)return null;let e=!1;return await new Promise(n=>{let r=t.length;const o=t=>{if(r--,t)if(e)try{t.close()}catch(t){}else e=!0,n(t);else r<=0&&!e&&n(null)};for(const e of t)Promise.resolve().then(e).then(t=>o(t&&t.readable?t:null),()=>o(null))})}const Et=new Map;async function Tt(t,e,n,r){let o=null;const a=t=>{if(t&&t!==o)try{t.close()}catch(t){}},i=t?Promise.resolve().then(t).then(t=>t&&t.readable?t:null,()=>null):Promise.resolve(null);let s=!1,l=!1;const c=()=>{s&&l&&r&&(r(),r=null)};t&&i.then(t=>{t||(s=!0,c())});const p=e&&e.length?function(t,e,n){let r=null,o=!1;return Promise.race([t.then(t=>(clearTimeout(r),o&&n&&n(t),t)),new Promise(t=>{r=setTimeout(()=>{o=!0,t(null)},e)})])}(Ct(e).then(t=>t&&t.readable?t:null,()=>null),At,a):Promise.resolve(null);let d=null;const u=await Promise.race([i,new Promise(t=>{d=setTimeout(()=>t(Pt),n)})]);if(clearTimeout(d),u&&u!==Pt)return o=u,p.then(a),o;const f=await p;return f?(o=f,l=!0,c(),i.then(a),o):(o=await i,o)}const Pt=Symbol("grace"),At=1e4;function It(t){return!t||t.byteLength<3?"unknown":22===t[0]&&3===t[1]?"tls":"nontls"}async function Ut(t,e,n,r){const o=B(e.obp),a=e.obm||"",i="nontls"!==r,l=o?"http"===o.type||"https"===o.type?t=>async function(t,e){const n=await it(t.host,t.port,6e3),r=n.writable.getWriter(),o=n.readable.getReader();let a="";t.user&&(a="Proxy-Authorization: Basic "+function(t){let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)}(L.encode(`${t.user}:${t.pass}`))+"\r\n");const i=(e.hostname.indexOf(":")>=0?"["+e.hostname+"]":e.hostname)+":"+e.port,s=`CONNECT ${i} HTTP/1.1\r\nHost: ${i}\r\n${a}\r\n`;await r.write(L.encode(s));const{head:l,leftover:c}=await async function(t){let e=new Uint8Array(0);for(;e.length<65536;){const{done:n,value:r}=await t.read();if(n)break;e=vt(e,r);const o=yt(e,[13,10,13,10]);if(o>=0)return{head:O.decode(e.subarray(0,o)),leftover:e.subarray(o+4)}}return{head:O.decode(e),leftover:new Uint8Array(0)}}(o);if(!/^HTTP\/\d\.\d\s+2\d\d/i.test(l))throw new Error("HTTP 代理 CONNECT 失败: "+l.split("\r\n")[0]);return c&&c.byteLength>0&&(n._preamble=c),r.releaseLock(),o.releaseLock(),n}(o,t):"ss"===o.type?t=>async function(t,e){const n=lt(t.method);if(!n)throw new Error("不支持的 SS 加密方式: "+(t.method||"（未指定）"));if(!t.password)throw new Error("SS 出站缺少密码");const r=await it(t.host,t.port,6e3),o=r.writable.getWriter(),a=r.readable.getReader();let i=new Uint8Array(0);const s=async t=>{for(;i.length<t;){const{done:t,value:e}=await a.read();if(t)throw new Error("SS 连接被关闭");i=vt(i,e)}const e=i.slice(0,t);return i=i.subarray(t),e},l=function(t,e){const n=L.encode(t);let r=new Uint8Array(0),o=new Uint8Array(0);for(;r.length<e;)o=R(vt(o,n)),r=vt(r,o);return r.slice(0,e)}(t.password,n.keyLen),c=crypto.getRandomValues(new Uint8Array(n.keyLen)),p=await mt(n.name,dt(l,c,n.keyLen));return await o.write(vt(c,await bt(p,function(t,e){let n;if(/^\d+\.\d+\.\d+\.\d+$/.test(t))n=new Uint8Array([1,...t.split(".").map(Number)]);else if(t.indexOf(":")>=0&&j(t))n=new Uint8Array([4,...at(t)]);else{const e=L.encode(t);if(e.length>255)throw new Error("SS 目标域名过长");n=new Uint8Array([3,e.length,...e])}return vt(n,new Uint8Array([e>>8&255,255&e]))}(e.hostname,e.port)))),{readable:new ReadableStream({async start(t){try{const e=await s(n.keyLen),r=await mt(n.name,dt(l,e,n.keyLen));for(;;){const e=await r.open(await s(18)),n=e[0]<<8|e[1];if(n>gt)throw new Error("SS 分片长度非法 "+n);const o=await r.open(await s(n+16));n>0&&t.enqueue(o)}}catch(e){try{t.error(e)}catch(t){}}}}),writable:new WritableStream({async write(t){const e=t instanceof Uint8Array?t:new Uint8Array(t);for(let t=0;t<e.length;t+=gt)await o.write(await bt(p,e.subarray(t,Math.min(e.length,t+gt))))},close(){try{o.close()}catch(t){}},abort(){try{o.abort()}catch(t){}}}),close(){try{r.close()}catch(t){}}}}(o,t):t=>async function(t,e){const n=await it(t.host,t.port,6e3),r=n.writable.getWriter(),o=n.readable.getReader();let a=new Uint8Array(0);const i=async t=>{for(;a.length<t;){const{done:t,value:e}=await o.read();if(t)throw new Error("连接被关闭");a=vt(a,e)}const e=a.slice(0,t);return a=a.subarray(t),e},s=t.user?[5,2,0,2]:[5,1,0];await r.write(new Uint8Array(s));const l=await i(2);if(5!==l[0]||255===l[1])throw new Error("SOCKS5 握手失败");if(2===l[1]){if(!t.user)throw new Error("SOCKS5 服务器要求认证但未提供凭据");const e=L.encode(t.user),n=L.encode(t.pass),o=new Uint8Array([1,e.length,...e,n.length,...n]);if(await r.write(o),0!==(await i(2))[1])throw new Error("SOCKS5 认证失败")}else if(0!==l[1])throw new Error("SOCKS5 不支持的认证方法 "+l[1]);const c=L.encode(e.hostname);let p;p=/^\d+\.\d+\.\d+\.\d+$/.test(e.hostname)?new Uint8Array([5,1,0,1,...e.hostname.split(".").map(Number),e.port>>8&255,255&e.port]):e.hostname.indexOf(":")>=0&&j(e.hostname)?new Uint8Array([5,1,0,4,...at(e.hostname),e.port>>8&255,255&e.port]):new Uint8Array([5,1,0,3,c.length,...c,e.port>>8&255,255&e.port]),await r.write(p);const d=await i(4);if(0!==d[1])throw new Error("SOCKS5 连接失败 码"+d[1]);if(1===d[3])await i(6);else if(3===d[3]){const t=(await i(1))[0];await i(t+2)}else 4===d[3]&&await i(18);return a.byteLength>0&&(n._preamble=a),r.releaseLock(),o.releaseLock(),n}(o,t):null;let p;const d=async t=>{try{const e=await t();if(e)return e}catch(t){p=t}return null},u=()=>{throw p||new Error("所有出站方式均失败")},f=e.pxy?_(e.pxy,443):null;if(f&&f.host&&i){let t=await St(f.host,f.port);t.length||(t=[{hostname:f.host,port:f.port}]);const e=await Ct(t.slice(0,4).map(t=>()=>d(()=>st(t,4e3))));if(e)return e}const h={hostname:t.addr,port:t.port},m=()=>i?function(t,e){const n=t.rl||{},r=n.md||"builtin";if("off"===r)return[];if("custom"===r)return String(n.cu||"").split("\n").map(t=>t.trim()).filter(Boolean).slice(0,3).map((t,e)=>{const{host:n,port:r}=_(t,443);return{host:n,port:r,take:0===e?2:1}});const o=c[n.rg]?n.rg:function(t){const e=(t||"").toUpperCase();return e.startsWith("HKG")||e.startsWith("HK")?"HK":e.startsWith("SIN")||e.startsWith("SG")?"SG":e.startsWith("NRT")||e.startsWith("KIX")||e.startsWith("TYO")||e.startsWith("OSA")||e.startsWith("JP")?"JP":e.startsWith("ICN")||e.startsWith("SEL")||e.startsWith("KR")?"KR":/^(HKG|SIN|NRT|KIX|ICN|TYO|OSA|SEL|HK|SG|JP|KR|SJC)/.test(e)?"HK":e.startsWith("FRA")||e.startsWith("BER")||e.startsWith("MUC")||e.startsWith("DUS")||e.startsWith("HAM")||e.startsWith("STR")||e.startsWith("DE")?"DE":e.startsWith("ARN")||e.startsWith("SE")?"SE":e.startsWith("AMS")||e.startsWith("NL")?"NL":e.startsWith("HEL")||e.startsWith("FI")?"FI":e.startsWith("LHR")||e.startsWith("MAN")||e.startsWith("GB")||e.startsWith("UK")?"GB":/^(FRA|ARN|AMS|HEL|LHR|MAN|CDG|MAD|VIE|ZRH|MXP|PRG|WAW|BER|MUC|DUS|HAM|STR|DE|SE|NL|FI|GB|UK|FR|ES|AT|CH|IT|CZ|PL)/.test(e)?"DE":"US"}(e),a=[{host:c[o],port:443,take:2,txt:!1}];if("none"!==n.r2){const t=c[n.r2]&&n.r2!==o?n.r2:Object.keys(c).find(t=>t!==o);a.push({host:c[t],port:443,take:1,txt:!1})}return a}(e,n).map(t=>async()=>{let e=[];try{e=await St(t.host,t.port,{txt:!1!==t.txt})}catch(t){return null}return e.length?await Ct(e.slice(0,t.take).map(t=>()=>d(()=>st(t,4e3)))):null}):[],g=()=>d(()=>st(h,4e3)),b=l?()=>d(()=>l(h)):null,v=String(t.addr||"").toLowerCase(),y=s(v),x=!j(v),w=async()=>{const t=m().slice(0,3);if(t.length&&(y||x&&function(t){const e=Et.get(t);return!(void 0===e||Date.now()-e>18e5&&(Et.delete(t),1))}(v))){return await Tt(null,t,0)||(x&&Et.delete(v),Tt(g,[],0))}return Tt(g,t,1500,x&&t.length?()=>{return t=v,Et.delete(t),Et.set(t,Date.now()),void wt(Et,1e3);var t}:null)};if("only"===a){if(b){const t=await b();if(t)return t;return await Tt(null,m(),0)||u()}return await w()||u()}if(""===a&&b){const t=await b();if(t)return t;return await w()||u()}const k=await w();if(k)return k;if(b){const t=await b();if(t)return t}return u()}function Lt(t){const e=t instanceof Uint8Array?t:new Uint8Array(t);try{return new TextDecoder("utf-8",{fatal:!0}).decode(e)}catch(t){}try{return new TextDecoder("gbk").decode(e)}catch(t){}return(new TextDecoder).decode(e)}const Ot="https://hopline-cache.invalid/";async function $t(t){try{if("undefined"==typeof caches||!caches.default)return null;const e=await caches.default.match(new Request(Ot+t));return e?await e.json():null}catch(t){return null}}async function Dt(t,e,n){try{if("undefined"==typeof caches||!caches.default)return;await caches.default.put(new Request(Ot+t),new Response(JSON.stringify(e),{headers:{"Content-Type":"application/json","Cache-Control":"max-age="+(n||600)}}))}catch(t){}}const Nt={CM:"移动",CU:"联通",CT:"电信"},Rt={t:0,ips:null};function Ht(t){const e=new Map;for(const n of t){if(!j(n.ip))continue;const t=e.get(n.ip);t?t.lines.includes(n.line)||t.lines.push(n.line):e.set(n.ip,{ip:n.ip,lines:[n.line]})}const n={};return[...e.values()].map(t=>{const e=t.lines.join("/");return n[e]=(n[e]||0)+1,{ip:t.ip,label:e,seq:String(n[e]).padStart(2,"0")}})}async function Mt(t){try{return await t.text()}catch(t){return""}}function _t(t){const e=[];for(const n of t.match(/<tr[\s\S]*?<\/tr>/g)||[]){const t={};for(const e of n.match(/<td[^>]*>[\s\S]*?<\/td>/g)||[]){const n=e.match(/data-label="([^"]*)"[^>]*>([\s\S]*?)<\/td>/);n&&(t[n[1]]=n[2].replace(/<[^>]+>/g,"").trim())}const r=(t["优选地址"]||"").trim();let o,a,i;if(r.indexOf(":")!==r.lastIndexOf(":")){if(o=r.match(/^\[([0-9a-fA-F:]+)\](?::(\d{1,5}))?$/)||r.match(/^([0-9a-fA-F:]+)$/),!o||!j(o[1]))continue}else if(o=r.match(/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?/),!o)continue;a=o[1],i=o[2]?parseInt(o[2],10):443,e.push({ip:a,port:i,cells:t})}return e}async function jt(t){const e={status:0,raw:"",items:[],dropped:[],error:""},n=await ne("https://api.hostmonit.com/get_optimization_ip",{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0"},body:JSON.stringify({key:"iDetkOys"})},6e3);if(!n)return e.error="请求失败或超时",e;if(e.status=n.status,e.raw=await Mt(n),!n.ok)return e.error="HTTP "+n.status,e;let r;try{r=JSON.parse(e.raw)}catch(t){return e.error="响应不是 JSON",e}const o=(r&&Array.isArray(r.info)?r.info:[]).map(t=>({ip:String(t&&t.ip||"").trim(),line:Nt[String(t&&t.line||"").toUpperCase()]||"优选"}));for(const n of Ht(o))if(s(n.ip)){if(e.items.push({ip:n.ip,port:443,name:n.label+"-"+n.seq}),e.items.length>=t)break}else e.dropped.push(n.ip);return e.items.length||(e.error="响应中没有边缘段 IP"),e}async function Ft(t){if(t=Math.max(1,parseInt(t)||150),Rt.ips&&Date.now()-Rt.t<6e5)return Rt.ips;const e=await $t("hostmonit");if(e&&e.length)return Rt.t=Date.now(),Rt.ips=e,e;const n=await jt(t);return n.items.length?(Rt.t=Date.now(),Rt.ips=n.items,await Dt("hostmonit",n.items),n.items):Rt.ips}const zt=[["ctcc","电信"],["cucc","联通"],["cmcc","移动"],["bgp","多线"],["ipv6","IPv6"]],Bt={t:0,ips:null};async function Kt(){const t={status:0,raw:"",items:[],dropped:[],error:""},e=String(Date.now()),n=H(H("DdlTxtN0sUOu")+"70cloudflareapikey"+e),r=await ne("https://api.uouin.com/index.php/index/Cloudflare?key="+n+"&time="+e,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(!r)return t.error="请求失败或超时",t;if(t.status=r.status,t.raw=await Mt(r),!r.ok)return t.error="HTTP "+r.status,t;let o;try{o=JSON.parse(t.raw)}catch(e){return t.error="响应不是 JSON",t}const a=o&&o.data||{};o&&o.data||(t.error=o&&o.msg?"接口返回："+o.msg:"响应中没有 data 字段");const i=[];for(const[t,e]of zt)for(const n of(a[t]||{}).info||[])i.push({ip:String(n&&n.ip||"").trim().replace(/^\[|\]$/g,""),line:e});for(const e of Ht(i))s(e.ip)?t.items.push({ip:e.ip,port:443,name:e.label+"-U"+e.seq}):t.dropped.push(e.ip);return t.items.length||t.error||(t.error="响应中没有边缘段 IP"),t}async function Wt(t,e){let n=Bt.ips;if(!n||Date.now()-Bt.t>=6e5){const t=await $t("uouin");if(t&&t.length)Bt.t=Date.now(),Bt.ips=t,n=t;else{const t=await Kt();t.items.length&&(Bt.t=Date.now(),Bt.ips=t.items,n=t.items,await Dt("uouin",t.items))}}return(n||[]).filter(n=>n.ip.indexOf(":")>=0?e:t)}const Vt={v4:{url:"https://www.wetest.vip/page/cloudflare/address_v4.html",tag:"W"},v6:{url:"https://www.wetest.vip/page/cloudflare/address_v6.html",tag:"W6-"}},Gt={v4:{t:0,ips:null},v6:{t:0,ips:null}};async function qt(t){const e={status:0,raw:"",items:[],dropped:[],error:""},n=await ne(Vt[t].url,{headers:{"User-Agent":"Mozilla/5.0"}},6e3);if(!n)return e.error="请求失败或超时",e;e.status=n.status;const r=await Mt(n);if(!n.ok)return e.error="HTTP "+n.status,e.raw=r,e;const o=_t(r);if(!o.length)return e.error="页面中没有解析到 IP（版式可能已变化）",e.raw=r,e;e.raw=o.map(t=>[t.cells["线路名称"],t.ip,t.cells["数据中心"],t.cells["往返延迟"],t.cells["更新时间"]].filter(Boolean).join("  ")).join("\n");const a=o.map(t=>({ip:t.ip,line:t.cells["线路名称"]||"优选"}));for(const n of Ht(a))s(n.ip)?e.items.push({ip:n.ip,port:443,name:n.label+"-"+Vt[t].tag+n.seq}):e.dropped.push(n.ip);return e.items.length||(e.error="页面中没有边缘段 IP"),e}async function Jt(t,e){const n=[t&&"v4",e&&"v6"].filter(Boolean);return(await Promise.all(n.map(async t=>{const e=Gt[t];if(e.ips&&Date.now()-e.t<6e5)return e.ips;const n=await $t("wetest-"+t);if(n&&n.length)return e.t=Date.now(),e.ips=n,n;const r=await qt(t);return r.items.length&&(e.t=Date.now(),e.ips=r.items,await Dt("wetest-"+t,r.items)),e.ips||[]}))).flat()}function Xt(t){return String(t).replace(/%/g,"%25").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/ /g,"%20")}function Qt(t){const e=String(t||"").split(",").map(t=>t.trim()).filter(t=>/^[\w./-]+$/.test(t));return e.length?e:null}function Yt(t){return(Qt(t)||[]).join(",")}function Zt(t,e,n,r,o={}){const a=t.hst,i=e.includes(":")&&!e.startsWith("[")?`[${e}]`:e,s=!U.has(Number(n)),l=encodeURIComponent;let c="encryption=none";c+=s?"&security=tls&sni="+l(a)+"&fp=chrome":"&security=none",c+="&host="+l(a);const p="xhttp"===o.type&&s;return p?(c+="&type=xhttp&mode=stream-one",c+="&extra="+l(JSON.stringify(function(t){const e=t.uid||"";return{xPaddingObfsMode:!0,xPaddingMethod:"tokenish",xPaddingPlacement:"queryInHeader",xPaddingHeader:e.slice(1,7),xPaddingKey:"_"+e.slice(25,31)}}(t)))):c+="&type=ws",c+="&path="+l("/"+t.pth+(!p&&s?"?ed=2048":"")),s&&(t.apn||p)&&(c+="&alpn="+(t.apn?Yt(t.apn):"h2")),t.ecn&&s&&(c+="&ech="+l((t.ehs||"cloudflare-ech.com")+"+"+(t.edn||"https://223.5.5.5/dns-query"))),`vless://${t.uid}@${i}:${n}?${c}#${Xt(r)}`}const te=new Map;async function ee(t,e){te.set(t,{t:Date.now(),ips:e}),wt(te,300),await Dt("url-"+H(t),e,600)}function ne(t,e,n){return new Promise(r=>{const o=new AbortController,a=setTimeout(()=>o.abort(),n);fetch(t,Object.assign({},e,{signal:o.signal})).then(t=>{clearTimeout(a),r(t)}).catch(()=>{clearTimeout(a),r(null)})})}async function re(t,e=100,n=300,r=!0,o=!1,a={}){const i=String(t||"").split(/[\n,;]+/).map(t=>t.trim().replace(/^\*\./,"")).filter(Boolean),c=Date.now(),p=["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve"],d=async(t,e,n)=>{for(const r of p){const o=await ne(r+"?name="+encodeURIComponent(t)+"&type="+e,{headers:{accept:"application/dns-json"}},4e3);if(o&&o.ok)try{return((await o.json()).Answer||[]).filter(t=>t.type===n&&("A"===e?/^\d+\.\d+\.\d+\.\d+$/.test(t.data):/^[0-9a-fA-F:]+$/.test(t.data))).map(t=>t.data)}catch(t){}}return[]},u="only"===o?"v6":o?"v4v6":"v4",f=await Promise.all(i.map(async t=>{if(t.includes("://")){if(t.startsWith("sub://")){let e=t.slice(6);if(/^[A-Za-z0-9+/=]+$/.test(e)&&e.length%4==0)try{const t=atob(e);/^https?:\/\//i.test(t)&&(e=t)}catch(t){}/^https?:\/\//i.test(e)||(e="https://"+e),t=e}const n="url:"+t+(r?"":"|raw"),o=te.get(n);if(!a.fresh&&o&&c-o.t<6e5)return o.ips.slice(0,e);if(!a.fresh){const t=await $t("url-"+H(n));if(Array.isArray(t))return te.set(n,{t:c,ips:t}),wt(te,300),t.slice(0,e)}try{const o=await ne(t,{},6e3);if(!o)throw a.onRaw&&a.onRaw(t,0,""),new Error("unreachable");let i="";try{i=Lt(await o.arrayBuffer())}catch(t){}if(a.onRaw&&a.onRaw(t,o.status,i),!o.ok)throw new Error("unreachable");let c=i;if(/^[A-Za-z0-9+/=\s]{40,}$/.test(c.slice(0,2e3))&&c.replace(/\s+/g,"").length%4==0)try{const t=atob(c.replace(/\s+/g,""));c=Lt(Uint8Array.from(t,t=>t.charCodeAt(0)))}catch(t){}const p=new Set,d={},u=[],f=t=>!r||s(t),h=c.trim().split(/\r?\n/).map(t=>t.trim()).filter(Boolean);if(h.length>1&&h[0].includes(",")){const t=h[0].split(",").map(t=>t.trim()),r=t.includes("IP地址")&&t.includes("端口"),o=t.some(t=>t.includes("IP"))&&t.some(t=>t.includes("延迟"))&&t.some(t=>t.includes("下载速度"));if(r||o){const r=t.findIndex(t=>t.includes("IP")),o=t.indexOf("端口"),a=t.findIndex(t=>t.includes("延迟")),i=t.findIndex(t=>t.includes("下载速度")),s=t.indexOf("国家")>-1?t.indexOf("国家"):t.indexOf("城市")>-1?t.indexOf("城市"):t.indexOf("数据中心"),l=t.indexOf("TLS");for(const t of h.slice(1)){if(u.length>=e)break;const n=t.split(",").map(t=>t.trim());if(-1!==l&&n[l]&&"true"!==n[l].toLowerCase())continue;const c=(n[r]||"").match(/(\[[0-9a-fA-F:]+\]|\d{1,3}(?:\.\d{1,3}){3})/);if(!c)continue;const h=c[1].replace(/^\[|\]$/g,""),m=-1!==o&&n[o]?parseInt(n[o]):443,g=h+":"+m;if(p.has(g))continue;if(!f(h))continue;p.add(g);let b=-1!==s&&n[s]?n[s]:"";b||-1===a||-1===i||(b="CF优选 "+(n[a]||"")+"ms "+(n[i]||"")+"MB/s"),b?(d[b]=(d[b]||0)+1,u.push({ip:h,port:m,name:b+"-"+String(d[b]).padStart(2,"0")})):u.push({ip:h,port:m,name:""})}return await ee(n,u),u.slice()}}if(c.includes("<tr")&&c.includes("data-label")){for(const{ip:t,port:n,cells:r}of _t(c)){if(u.length>=e)break;const o=t+":"+n;if(p.has(o))continue;if(!f(t))continue;p.add(o);const a=(r["线路名称"]||r["数据中心"]||"线路").trim();a?(d[a]=(d[a]||0)+1,u.push({ip:t,port:n,name:a+"-"+String(d[a]).padStart(2,"0")})):u.push({ip:t,port:n,name:""})}return await ee(n,u),u.slice()}for(const t of c.split(/\r?\n/)){if(u.length>=e)break;const n=t.match(/(?:vless|trojan):\/\/[^@\s/]+@(\[[0-9a-fA-F:]+\]|[A-Za-z0-9.-]+)(?::(\d{1,5}))?/);if(!n)continue;const r=n[1].replace(/^\[|\]$/g,""),o=n[2]?parseInt(n[2]):443,a=r+":"+o;if(p.has(a))continue;if(!f(r))continue;p.add(a);let i="";const s=t.indexOf("#");if(s>=0)try{i=decodeURIComponent(t.slice(s+1).trim())}catch(e){i=t.slice(s+1).trim()}i?(d[i]=(d[i]||0)+1,u.push({ip:r,port:o,name:i+"-"+String(d[i]).padStart(2,"0")})):u.push({ip:r,port:o,name:""})}for(const t of c.split(/\r?\n/)){if(u.length>=e)break;const n=t.match(/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?(?:#([^\r\n]*))?/);if(!n)continue;const r=n[1],o=n[2]?parseInt(n[2]):443,a=r+":"+o;if(p.has(a))continue;if(!f(r))continue;p.add(a);const i=(n[3]||"").trim();if(i&&!/[\u4e00-\u9fa5]/.test(i)&&!i.includes("|")){u.push({ip:r,port:o,name:i});continue}let s="";if(n[3]){const t=n[3].match(/^\s*[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}/);if(t){const e=t[0].match(/[\u4e00-\u9fa5]{2,5}/);e&&(s=e[0])}else{const t=n[3].split("|").map(t=>t.trim()),e=t.find(t=>/^[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}$/.test(t));if(e){const t=e.match(/[\u4e00-\u9fa5]{2,5}/);t&&(s=t[0])}else{const e=t.find(t=>/^[\u4e00-\u9fa5]{2,5}$/.test(t)&&!/^(地区随机|随机优选|官方优选|优选|CF优选)$/.test(t));if(e)s=e;else{const t=n[3].match(/\b([A-Z]{2})\b/);t&&(s=l[t[1]]||t[1])}}}}s?(d[s]=(d[s]||0)+1,u.push({ip:r,port:o,name:s+"-"+String(d[s]).padStart(2,"0")})):u.push({ip:r,port:o,name:i.slice(0,40)})}return await ee(n,u),u.slice()}catch(t){const r=te.get(n);return!a.fresh&&r&&r.ips&&r.ips.length?r.ips.slice(0,e):[]}}const n=t+"|"+u,o=te.get(n);if(o&&c-o.t<6e5)return o.ips.slice(0,e).map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)}));const i="v6"===u?[]:await d(t,"A",1),p="v4"===u?[]:await d(t,"AAAA",28);let f=[...new Set(i.concat(p))].filter(t=>!r||s(t));return f=f.slice(0,e),f.length?(te.set(n,{t:c,ips:f}),wt(te,300),f.map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)}))):o&&o.ips&&o.ips.length?o.ips.slice(0,e).map((e,n)=>({ip:e,port:443,name:t+"-"+(n+1)})):[]})),h=[];let m=0;for(;m<n;){let t=!1;for(const e of f){if(m>=n)break;e.length&&(h.push(e.shift()),m++,t=!0)}if(!t)break}return h}async function oe(t,e=Te){const n=[],r=new Set,o=t.ft&&t.ft.ip||[],a=o.includes("IPv6"),i=1===o.length&&"IPv6"===o[0],l=(o,a,i)=>{if(n.length>=e)return;if(j(o)&&!s(o))return;const l=o+":"+a;if(r.has(l))return;r.add(l);const c=!U.has(Number(a));if(t.tlo&&!c)return;const p=Number(a),d=function(t,e,n,r){return(e?1:0)+(n?1:0)+(r?1:0)<=1?{v:t,t:t,x:t}:{v:t,t:t+".T",x:t+".X"}}(i,t.evl,t.etr,t.exh&&c);t.evl&&n.push(Zt(t,o,p,d.v)),t.etr&&n.push(function(t,e,n,r){const o=t.hst,a=e.includes(":")&&!e.startsWith("[")?`[${e}]`:e,i=encodeURIComponent,s=!U.has(Number(n)),l=i("/"+t.pth+(s?"?ed=2048":""));let c=s?"security=tls&sni="+i(o)+"&fp=chrome&host="+i(o)+"&type=ws&path="+l:"security=none&host="+i(o)+"&type=ws&path="+l;return t.apn&&s&&(c+="&alpn="+Yt(t.apn)),t.ecn&&s&&(c+="&ech="+i((t.ehs||"cloudflare-ech.com")+"+"+(t.edn||"https://223.5.5.5/dns-query"))),`trojan://${t.trp||t.uid}@${a}:${n}?${c}#${Xt(r)}`}(t,o,p,d.t)),t.exh&&c&&n.push(Zt(t,o,p,d.x,{type:"xhttp"}))},c=(e,n,r)=>{n=Number(n)||443,l(e,n,r),t.tlo||443!==n||l(e,80,r+"·80")};String(t.preferredDomains||"").split(/[\n,;]+/).map(t=>t.trim()).filter(t=>t&&!t.includes("://")).forEach((t,e)=>{const n=t.indexOf("#"),r=(n>=0?t.slice(0,n):t).trim(),o=(n>=0?t.slice(n+1):"").trim(),a=_(r,443);c(a.host,a.port,o||"优选域名-"+String(e+1).padStart(2,"0"))});let p=t.preferredIPs||[];if(a&&!i&&p.length>1){const t=[],e=[];for(const n of p)(String(n.ip).indexOf(":")>=0?e:t).push(n);const n=[],r=Math.max(t.length,e.length);for(let o=0;o<r;o++)o<t.length&&n.push(t[o]),o<e.length&&n.push(e[o]);p=n}return p.forEach((t,e)=>{c(t.ip,t.port||443,t.name||"优选IP-"+String(e+1).padStart(2,"0"))}),n}function ae(t){const e=t.indexOf("@"),n=t.indexOf("?",e),r=n>e&&e>=0?t.slice(e+1,n):t.slice(e+1);if(r.startsWith("[")){const t=r.indexOf("]"),e=t>0?r.slice(1,t):r,n=r.slice(t+1),o=n.startsWith(":")?parseInt(n.slice(1)):443;return{host:e,port:isNaN(o)?443:o}}const o=r.lastIndexOf(":");if(o>0){const t=parseInt(r.slice(o+1));return{host:r.slice(0,o),port:isNaN(t)?443:t}}return{host:r,port:443}}function ie(t,e){const n=t.indexOf("?");if(n<0)return null;const r=t.indexOf("#",n),o=r>n?t.slice(n+1,r):t.slice(n+1);for(const t of o.split("&")){const n=t.indexOf("=");if((n>0?t.slice(0,n):t)===e)return n>0?decodeURIComponent(t.slice(n+1)):""}return null}function se(t,e){const{host:n,port:r}=ae(t),o=n,a=t.indexOf("#");let i=`节点${e+1}`;if(a>=0)try{i=decodeURIComponent(t.slice(a+1))||i}catch(t){}const s=t.indexOf("@");let l="";if(s>=0){const e=t.indexOf("://"),n=e>=0?e+3:0;try{l=decodeURIComponent(t.slice(n,s))}catch(e){l=t.slice(n,s)}}return{srv:o,prt:r,name:i,user:l,isTrojan:t.startsWith("trojan://"),tls:"tls"===(ie(t,"security")||"tls")}}const le={HK:["HK","香港"],TW:["TW","台湾"],US:["US","美国"],SG:["SG","新加坡"],JP:["JP","日本"],KR:["KR","韩国"],DE:["DE","德国"]},ce={"移动":["移动","CM","CHINAMOBILE"],"联通":["联通","CU","UNICOM"],"电信":["电信","CT","CHINATELECOM"]},pe=["移动","联通","电信"],de=Object.keys(ce).map(t=>[t,ce[t].map(t=>{return/^[A-Z]+$/.test(t)?(e=new RegExp("(^|[^A-Z])"+t+"([^A-Z]|$)"),t=>e.test(t)):e=>e.includes(t);var e})]),ue=Object.keys(le).map(t=>[t,new RegExp("(^|[^A-Z])"+t+"([^A-Z]|$)")]);function fe(t,e){const n=[];for(const[e,r]of Object.entries(l))t.includes(r)&&n.push(e);for(const[t,r]of ue)!n.includes(t)&&r.test(e)&&n.push(t);return n}function he(t){return de.filter(([,e])=>e.some(e=>e(t))).map(([t])=>t)}const me=["IPv4","IPv6"];function ge(t){if("boolean"==typeof t||"number"==typeof t)return String(t);const e=String(t);return/^[\w.\-/\u4e00-\u9fa5]+$/.test(e)?e:JSON.stringify(e)}function be(t,e){const n=t.hst,r="/"+t.pth,o=r+"?ed=2048",a=Qt(t.apn),i=new Set,s=e.map(e=>{const{user:s,srv:l,prt:c,name:p,isTrojan:d,tls:u}=se(e,0);let f=p;const h=ie(e,"type")||"ws";if(i.has(f)){const t=d?"T":"xhttp"===h?"X":"W";let e=f+"·"+t,n=2;for(;i.has(e);)e=f+"·"+t+n,n++;f=e}i.add(f);const m={name:f,server:l,port:c,udp:!0,...u?{tls:!0,"skip-cert-verify":!1,servername:n,"client-fingerprint":"chrome",alpn:a||["http/1.1"]}:{},...t.ecn&&u?{"ech-opts":{enable:!0,"query-server-name":t.ehs||"cloudflare-ech.com"}}:{}};if(d)return{...m,type:"trojan",password:s,network:"ws","ws-opts":{path:u?o:r,headers:{Host:n}}};if("xhttp"===h){let t={};try{t=JSON.parse(ie(e,"extra")||"{}")}catch(t){}return{...m,type:"vless",uuid:s,network:"xhttp",alpn:a||["h2"],"xhttp-opts":{path:r,mode:"stream-one",host:n,"x-padding-obfs-mode":void 0===t.xPaddingObfsMode||t.xPaddingObfsMode,"x-padding-method":t.xPaddingMethod||"tokenish","x-padding-placement":t.xPaddingPlacement||"queryInHeader","x-padding-header":t.xPaddingHeader||"","x-padding-key":t.xPaddingKey||""}}}return{...m,type:"vless",uuid:s,network:"ws","ws-opts":{path:u?o:r,headers:{Host:n}}}});s.sort((t,e)=>(443===t.port?0:1)-(443===e.port?0:1));const l=e=>Z("hopline-clash|"+e+"|"+t.uid).slice(0,20),c='\n# ==================== 锚点配置 ====================\n# 代理提供者模板 - 订阅源基础配置\n\n# 节点筛选正则表达式 - 仅保留常用地区\nFilterHK: &FilterHK \'^(?=.*(?i)(港|🇭🇰|HK|Hong|HKG))(?!.*5x).*$\'\nFilterSG: &FilterSG \'^(?=.*(?i)(坡|🇸🇬|SG|Sing|SIN|XSP))(?!.*5x).*$\'\nFilterJP: &FilterJP \'^(?=.*(?i)(日|🇯🇵|JP|Japan|NRT|HND|KIX|CTS|FUK))(?!.*(尼日利亚|5x)).*$\'\nFilterUS: &FilterUS \'^(?=.*(?i)(美|🇺🇸|US|USA|JFK|SJC|LAX|ORD|ATL|DFW|SFO|MIA|SEA|IAD))(?!.*(Plus|Australia|5x)).*$\'\n# 注意：🇼🇸 是萨摩亚旗帜，不是台湾，已移除，避免误匹配\nFilterTW: &FilterTW \'^(?=.*(?i)(台|🇹🇼|TW|tai|TPE|TSA|KHH))(?!.*5x).*$\'\n\n# ==================== 监听器 ====================\nlisteners:\n  # Shadowsocks监听器 - 远程连接家庭网络。密码由 Hopline 按 UUID 为本部署派生（每个部署不同），不再使用公开的默认密码；\n  # 如需对外开放请自行修改端口与密码\n  - {name: SS-IN,  type: shadowsocks, listen: \'::\', port: 10000, udp: true, password: "__HOPLINE_SS_PASSWORD__", cipher: aes-256-gcm}\n  # Mixed监听器 - 分地区专用端口 玩法：本地浏览器插件或手机APP配置代理，实现分地区访问\n  - {name: MIXED-SG, type: mixed, port: 50000, proxy: 新加坡节点}\n  - {name: MIXED-US, type: mixed, port: 50001, proxy: 美国节点}\n  - {name: MIXED-TW, type: mixed, port: 50002, proxy: 台湾节点}\n  - {name: MIXED-HK, type: mixed, port: 50003, proxy: 香港节点}\n  - {name: MIXED-JP, type: mixed, port: 50004, proxy: 日本节点}\n  - {name: MIXED-AL, type: mixed, port: 50007, proxy: 一键连接}\n\n# ==================== 核心配置 ====================\nmode: rule\nport: 7890\nsocks-port: 7891\nredir-port: 7892\nmixed-port: 7893\ntproxy-port: 7895\nipv6: true\nallow-lan: true\nunified-delay: true\ntcp-concurrent: true\nlog-level: warning\nbind-address: \'*\'\nfind-process-mode: \'always\'\nkeep-alive-interval: 15\nkeep-alive-idle: 600\n\n# 认证配置：密码由 Hopline 按 UUID 为本部署派生（每个部署不同），不再使用公开的默认凭据\nauthentication:\n  - "mihomo:__HOPLINE_AUTH_PASSWORD__"\nskip-auth-prefixes:\n  - 192.168.1.0/24\n  - 192.168.31.0/24\n  - 192.168.100.0/24\n  - 127.0.0.1/8\n\n# 实验性功能\nexperimental:\n  quic-go-disable-gso: true\n\n# 管理面板配置\nexternal-ui-url: https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip\nexternal-ui-name: zashboard\nexternal-ui: ui\nexternal-controller: 127.0.0.1:9090\nsecret: "__HOPLINE_API_SECRET__"    # 由 Hopline 按 UUID 为本部署派生，可自行修改\n# 允许跨域访问的面板来源（不再使用 "*"：任意网页都不能借浏览器访问本机控制接口）。使用其它在线面板时在此追加其域名\nexternal-controller-cors:\n  allow-origins:\n    - "http://127.0.0.1:9090"\n    - "http://localhost:9090"\n    - "https://board.zash.run.place"\n    - "https://metacubex.github.io"\n  allow-private-network: true\n\n# 配置存储\nprofile:\n  store-selected: true\n  store-fake-ip: true\n\n# geosite / geoip 数据源（GEOSITE 规则依赖）：MetaCubeX 规则库，经 jsDelivr 镜像下载（GitHub release 国内常不可达）\ngeox-url:\n  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"\n  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"\n  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"\n\n# 流量嗅探\nsniffer:\n  enable: true\n  force-dns-mapping: true   # 强制 DNS 映射，提高分流准确度\n  parse-pure-ip: true       # 解析纯 IP 连接\n  override-destination: true\n  sniff:\n    HTTP:\n      ports: [80, 8080-8880]\n    TLS:\n      ports: [443, 8443]\n    QUIC:\n      ports: [443, 8443]\n  skip-domain:\n    - "+.push.apple.com"\n\n# TUN模式配置\ntun:\n  enable: false\n  stack: mixed\n  mtu: 1480\n  dns-hijack:\n    - "any:53"\n    - "tcp://any:53"\n  udp-timeout: 300\n  auto-route: true\n  strict-route: true\n  auto-redirect: true\n  auto-detect-interface: true\n  # 提示：系统级防泄露的最强手段是开启 TUN（自动劫持全部 DNS 流量）；\n  # 不开 TUN 时，请把系统 / 本机应用的 DNS 指向 127.0.0.1:1053；要给 LAN 设备提供 DNS，把下方 dns.listen 改为 0.0.0.0:1053（注意不要暴露到公网）。\n\nhosts:\n  miwifi.com: 192.168.31.2\n  "epdg.epc.mnc010.mcc234.pub.3gppnetwork.org": [87.194.8.8, 87.194.88.8, 87.194.89.8, 87.194.9.8]\n  services.googleapis.cn: services.googleapis.com\n  cn.bing.com: www4.bing.com\n\n# ==================== DNS 配置 ====================\n# 防泄露要点：\n#   1) respect-rules: true：DNS 服务器连接遵循路由规则（国外 DoH 走代理隧道、国内 DoH 直连），\n#      解析行为与规则分流一致，避免“规则走代理、解析却直连”的泄露。\n#   2) 默认 nameserver 用国内 DoH；只有“将走代理”的规则集才用国外 DoH，\n#      且其域名在 rules 中显式固定走代理。\n#   3) fake-ip-filter 补齐系统连通性检测 / 时间同步 / 运营商登录等域名，防止系统误判断网而回退运营商 DNS。\ndns:\n  enable: true\n  listen: 127.0.0.1:1053    # 仅本机监听（53 端口需要管理员权限且常被系统占用，监听 0.0.0.0 还可能成为公网开放解析器）\n  ipv6: true\n  prefer-h3: false          # respect-rules 下官方不推荐 DoH3；且 QUIC 已被规则拦截\n  cache-algorithm: arc      # 性能更优的 ARC 缓存算法\n  cache-size: 4096\n  enhanced-mode: fake-ip\n  fake-ip-range: 198.18.0.1/16\n  fake-ip-filter:\n    - "+.lan"\n    - "+.local"\n    - "+.localhost"\n    - "+.home.arpa"\n    - "+.internal"\n    # 系统连通性检测（防止 fake-ip 导致“无网络”判断，回退 ISP DNS 造成泄露）\n    - "+.msftconnecttest.com"\n    - "+.msftncsi.com"          # 通配已覆盖 dns.msftncsi.com\n    - "captive.apple.com"\n    - "connectivitycheck.gstatic.com"\n    - "detectportal.firefox.com"\n    # 时间同步\n    - "time.nist.gov"\n    - "+.pool.ntp.org"\n    - "time.*.com"              # 通配已覆盖 time.windows.com\n    - "ntp.*.com"               # 通配已覆盖 ntp.ubuntu.com\n    # 运营商 Wi-Fi 登录页\n    - "+.cmpassport.com"\n    - "id6.me"\n    - "open.e.189.cn"\n    - "mdn.open.wo.cn"\n    - "opencloud.wostore.cn"\n    - "auth.wosms.cn"\n    - "+.10099.com.cn"\n    # 原配置保留项\n    - "+.market.xiaomi.com"\n    - "+.pub.3gppnetwork.org"\n    - "+.push.apple.com"\n    - "+.bing.com"\n    - "+.miwifi.com"\n    - "+.docker.io"\n    # 国内应用登录（+.qq.com 已覆盖 localhost.ptlogin2.qq.com）\n    - "+.qq.com"\n    # 直连 / 国内类规则集：返回真实 IP\n    - rule-set:Direct\n    - rule-set:Private\n    - rule-set:China\n    - geosite:cn                # 国内域名返回真实 IP（geosite 库兜底，防 fake-ip 干扰国内应用）\n  use-hosts: true\n  respect-rules: true\n  # 引导用 DNS（解析 DoH/DoT 服务器自身的域名），必须是 IP\n  default-nameserver:\n    - 223.5.5.5\n    - 119.29.29.29\n  # 默认解析：未命中 nameserver-policy 的域名（国内 DoH，直连）\n  nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  # 直连出口的解析\n  direct-nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  # 解析代理节点域名（防套娃 / 防循环，用国内直连可达的 DoH）\n  proxy-server-nameserver:\n    - "https://dns.alidns.com/dns-query"\n    - "https://doh.pub/dns-query"\n  nameserver-policy:\n    # 广告域名直接返回空应答\n    "rule-set:Advertising,AWAvenueAds": rcode://success\n    # 直连类：国内 DoH（微软已并入直连，微软域名走国内解析后直连）\n    "rule-set:Direct,Private,China,Microsoft":\n      - "https://dns.alidns.com/dns-query"\n      - "https://doh.pub/dns-query"\n    # 走代理类：国外 DoH（连接本身经代理隧道，不直连暴露查询）\n    "rule-set:AI,Telegram,Twitter,SocialMedia,Netflix,YouTube,Spotify,TikTok,disney,Google,Proxy":\n      - "https://dns.google/dns-query"\n      - "https://cloudflare-dns.com/dns-query"\n\n# ==================== 代理策略组（9 个可见 + 6 个隐藏自动子组） ====================\nproxy-groups:\n  # 主入口：默认自动选择，可手动切换各地区 / 故障转移 / 全部节点 / 直接连接\n  - {name: 一键连接,     type: select, proxies: [自动选择, 故障转移, 香港节点, 台湾节点, 日本节点, 美国节点, 新加坡节点, 全部节点, 直接连接], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Static.png}\n  # 自动选择：隐藏（面板不可手动选择），纯自动优选延时最低节点；故障转移：按序自动切换\n  - {name: 自动选择,     type: url-test, include-all: true, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, hidden: true, empty-fallback: REJECT, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 故障转移,     type: fallback, proxies: [香港节点, 台湾节点, 日本节点, 美国节点, 新加坡节点, 全部节点], url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/ULB.png}\n  # 常用地区节点组（select：默认选中“XX自动”=自动优选该地区最快节点，也可手动指定单个节点）\n  - {name: 香港节点,     type: select, include-all: true, filter: *FilterHK, proxies: [香港自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Hong_Kong.png}\n  - {name: 台湾节点,     type: select, include-all: true, filter: *FilterTW, proxies: [台湾自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Taiwan.png}\n  - {name: 日本节点,     type: select, include-all: true, filter: *FilterJP, proxies: [日本自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Japan.png}\n  - {name: 美国节点,     type: select, include-all: true, filter: *FilterUS, proxies: [美国自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/United_States.png}\n  - {name: 新加坡节点,   type: select, include-all: true, filter: *FilterSG, proxies: [新加坡自动], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Singapore.png}\n  # 全部节点（手动挑选任意节点；首个选项“自动选择”=全部节点中最快）\n  - {name: 全部节点,     type: select, include-all: true, proxies: [自动选择], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Global.png}\n  # 各地区自动优选子组（隐藏，作为各地区分组内的“自动选择”选项）\n  - {name: 香港自动,     type: url-test, include-all: true, filter: *FilterHK, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 台湾自动,     type: url-test, include-all: true, filter: *FilterTW, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 日本自动,     type: url-test, include-all: true, filter: *FilterJP, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 美国自动,     type: url-test, include-all: true, filter: *FilterUS, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  - {name: 新加坡自动,   type: url-test, include-all: true, filter: *FilterSG, url: \'https://www.google.com/generate_204\', interval: 200, lazy: true, empty-fallback: REJECT, hidden: true, icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\n  # 直连分组（放在最下方）\n  - {name: 直接连接,     type: select, proxies: [DIRECT], icon: https://github.com/Koolson/Qure/raw/master/IconSet/Color/Direct.png}\n\n# ==================== 规则路由 ====================\nrules:\n  # 广告拦截（常用：直接拒绝；如需临时放行可改为一键连接）\n  - RULE-SET,Tracking,REJECT\n  - RULE-SET,AWAvenueAds,REJECT\n  - RULE-SET,Advertising,REJECT\n  - GEOSITE,category-ads-all,REJECT        # geosite 广告分类兜底（覆盖规则集未收录的广告域名）\n\n  # DNS 服务器域名：解析通道固定，避免 DNS 流量走错路径（防泄露关键）\n  - DOMAIN-SUFFIX,alidns.com,直接连接\n  - DOMAIN-SUFFIX,doh.pub,直接连接\n  - DOMAIN,dns.google,一键连接\n  - DOMAIN,cloudflare-dns.com,一键连接\n\n  # 大陆直连优先（置于国外服务规则之前：大陆应用一律直连，不被国外服务规则集抢先命中）\n  - RULE-SET,Private,直接连接\n  - RULE-SET,Direct,直接连接\n  - RULE-SET,Download,直接连接\n  - RULE-SET,AppleCN,直接连接\n  - RULE-SET,Microsoft,直接连接        # 微软全家桶直连（Office / OneDrive / Windows 更新 / Teams / Xbox 等）\n  - RULE-SET,China,直接连接             # 国内域名直连\n  - GEOSITE,CN,直接连接                  # geosite 国内域名兜底（覆盖规则集未收录的国内域名，先于 GEOIP 命中）\n  # 阻止走代理的 QUIC（强制回退 TCP，避免 QUIC 绕过代理 / 被干扰）。\n  # 放在直连规则之后：直连 QUIC（大陆 / 微软 / 苹果）不受影响。如需 Telegram 语音等 UDP，可删除此行。\n  - AND,((DST-PORT,443),(NETWORK,UDP)),REJECT\n\n  # 常用国外服务（统一走一键连接）\n  - RULE-SET,AI,一键连接\n  - RULE-SET,Telegram,一键连接\n  - RULE-SET,Twitter,一键连接\n  - RULE-SET,SocialMedia,一键连接\n  - RULE-SET,Netflix,一键连接\n  - RULE-SET,YouTube,一键连接\n  - RULE-SET,Spotify,一键连接\n  - RULE-SET,TikTok,一键连接\n  - RULE-SET,disney,一键连接\n  - RULE-SET,Google,一键连接\n  - RULE-SET,github,一键连接\n  - RULE-SET,Proxy,一键连接\n\n  # IP规则\n  - RULE-SET,PrivateIP,直接连接,no-resolve\n  - RULE-SET,TelegramIP,一键连接,no-resolve\n  - RULE-SET,ProxyIP,一键连接,no-resolve\n  - RULE-SET,ChinaIP,直接连接,no-resolve\n\n  # 大陆 IP 兜底直连：覆盖规则集未收录的域名 / 纯 IP 连接的大陆应用（GEOIP 库覆盖面更全）\n  - GEOIP,CN,直接连接,no-resolve\n\n  # 兜底规则：其余（国外）走一键连接\n  - MATCH,一键连接\n\n# ==================== 规则集 ====================\n# 规则集行为模板\nBehaviorDN: &BehaviorDN {type: http, behavior: domain, format: mrs, interval: 86400}\nBehaviorDY: &BehaviorDY {type: http, behavior: domain, format: yaml, interval: 86400}\nBehaviorIP: &BehaviorIP {type: http, behavior: ipcidr, format: mrs, interval: 86400}\nClassicalYaml: &ClassicalYaml {type: http, behavior: classical, interval: 3600, format: yaml, proxy: DIRECT}\nBehaviorCL: &BehaviorCL {type: http, behavior: classical, interval: 86400, format: yaml, proxy: DIRECT}   # 经典规则集（blackmatrix7 等，DOMAIN/DOMAIN-SUFFIX/DOMAIN-KEYWORD/PROCESS-NAME）\n\n# 规则提供者（仅保留常用）\nrule-providers:\n  # 广告\n  Tracking:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Tracking.mrs}\n  Advertising:    {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Advertising.mrs}\n  AWAvenueAds:    {<<: *BehaviorDY, url: https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml}\n  # 直连 / 国内\n  Direct:         {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Direct.mrs}\n  Private:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Private.mrs}\n  Download:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Download.mrs}\n  AppleCN:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/AppleCN.mrs}\n  China:          {<<: *BehaviorCL, url: https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMaxNoIP/ChinaMaxNoIP_No_Resolve.yaml}   # 大陆直连全量：ChinaMaxNoIP（11万+ 域名，含大陆可达国际服务），每日更新\n  # 常用国外服务\n  AI:             {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/AI.mrs}\n  Telegram:       {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Telegram.mrs}\n  Twitter:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Twitter.mrs}\n  SocialMedia:    {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/SocialMedia.mrs}\n  Netflix:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Netflix.mrs}\n  YouTube:        {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/YouTube.mrs}\n  Google:         {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Google.mrs}\n  Microsoft:      {<<: *BehaviorCL, url: https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml}   # 微软全家桶全量：blackmatrix7（Office/OneDrive/Xbox/Teams/Skype/Bing/Azure 等）\n  Proxy:          {<<: *BehaviorDN, url: https://github.com/666OS/rules/raw/release/mihomo/domain/Proxy.mrs}\n  # 媒体（DustinWin）\n  Spotify:        {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/spotify.mrs}\n  TikTok:         {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/tiktok.mrs}\n  disney:         {<<: *BehaviorDN, url: https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/disney.mrs}\n  # GitHub\n  github:          {<<: *ClassicalYaml, url: https://rule.kelee.one/Clash/GitHub.yaml}\n  # IP规则\n  PrivateIP:      {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Private.mrs}\n  TelegramIP:     {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Telegram.mrs}\n  ProxyIP:        {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/Proxy.mrs}\n  ChinaIP:        {<<: *BehaviorIP, url: https://github.com/666OS/rules/raw/release/mihomo/ip/China.mrs}\n\n# ==================== EOF ====================\n\n'.split("__HOPLINE_SS_PASSWORD__").join(l("ss")).split("__HOPLINE_AUTH_PASSWORD__").join(l("auth")).split("__HOPLINE_API_SECRET__").join(l("api"));return`# Hopline 订阅\ntest-url: 'http://www.gstatic.com/generate_204'\nproxies:\n${s.map(t=>function(t){const e=[];if(e.push("  - name: "+ge(t.name)),e.push("    type: "+t.type),e.push("    server: "+ge(t.server)),e.push("    port: "+t.port),"vless"===t.type?e.push("    uuid: "+ge(t.uuid)):e.push("    password: "+ge(t.password)),e.push("    network: "+t.network),e.push("    udp: true"),t.tls&&(e.push("    tls: true"),e.push("    skip-cert-verify: false"),e.push("    alpn: ["+(t.alpn&&t.alpn.length?t.alpn:"xhttp"===t.network?["h2"]:["http/1.1"]).join(", ")+"]"),e.push("    servername: "+ge(t.servername)),"trojan"===t.type&&e.push("    sni: "+ge(t.servername)),e.push("    client-fingerprint: chrome"),t["ech-opts"]&&(e.push("    ech-opts:"),e.push("      enable: "+ge(t["ech-opts"].enable)),e.push("      query-server-name: "+ge(t["ech-opts"]["query-server-name"])))),"ws"===t.network)e.push("    ws-opts:"),e.push("      path: "+ge(t["ws-opts"].path)),e.push("      headers:"),e.push("        Host: "+ge(t["ws-opts"].headers.Host));else if("xhttp"===t.network){const n=t["xhttp-opts"];e.push("    xhttp-opts:"),e.push("      path: "+ge(n.path)),e.push("      mode: "+ge(n.mode)),e.push("      host: "+ge(n.host)),e.push("      x-padding-obfs-mode: "+ge(n["x-padding-obfs-mode"])),e.push("      x-padding-method: "+ge(n["x-padding-method"])),e.push("      x-padding-placement: "+ge(n["x-padding-placement"])),e.push("      x-padding-header: "+ge(n["x-padding-header"])),e.push("      x-padding-key: "+ge(n["x-padding-key"]))}return e.join("\n")}(t)).join("\n")}\n${c}\n`}function ve(t,e){const n=t.hst,r="/"+t.pth;if(!t.etr)throw new Error("Surfboard 只支持 Trojan 节点：请先在「节点配置」中启用 Trojan 协议");const o=e.filter(t=>t.startsWith("trojan://")&&t.indexOf("security=none")<0);if(!o.length)throw new Error("没有可用于 Surfboard 的 Trojan TLS 节点（明文端口节点已被过滤）");const a=o.map((t,e)=>{const{user:o,srv:a,prt:i,name:s}=se(t,e);return`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}, tls=true, skip-cert-verify=false, sni=${n}`});return`#!MANAGED-CONFIG\n[General]\nloglevel = notify\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${a.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${a.map(t=>t.split(" = ")[0]).join(", ")}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, 🚀 节点选择\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}const ye=[["geosite-category-ads-all",null],["geosite-cn","🎯 全球直连"],["geosite-google","🌐 谷歌服务"],["geosite-apple","🍎 苹果服务"],["geosite-microsoft","Ⓜ️ 微软服务"],["geosite-openai","🤖 OpenAI"],["geosite-spotify","🌍 国外媒体"],["geosite-youtube","🌍 国外媒体"],["geosite-netflix","🌍 国外媒体"],["geosite-disney","🌍 国外媒体"],["geosite-twitter","🌍 国外媒体"],["geosite-telegram","🌍 国外媒体"],["geosite-github","🌍 国外媒体"]],xe="https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/";function we(t,e){const n=t.hst,r="/"+t.pth,o=Qt(t.apn),a=new Set,i=e.filter(t=>"xhttp"!==ie(t,"type")).map((t,e)=>{const{user:i,srv:s,prt:l,name:c,isTrojan:p,tls:d}=se(t,e);let u=c,f=2;for(;a.has(u);)u=c+"·"+f++;a.add(u);const h=d?{enabled:!0,server_name:n,insecure:!1,alpn:o||["http/1.1"],utls:{enabled:!0,fingerprint:"chrome"}}:{enabled:!1},m=d?{type:"ws",path:r,headers:{Host:n},max_early_data:2048,early_data_header_name:"Sec-WebSocket-Protocol"}:{type:"ws",path:r,headers:{Host:n}};return p?{type:"trojan",tag:u,server:s,server_port:l,password:i,tls:h,transport:m}:{type:"vless",tag:u,server:s,server_port:l,uuid:i,tls:h,transport:m}}),s=i.map(t=>t.tag);if(!s.length)throw new Error("sing-box 官方内核不支持 XHTTP，没有可用节点：请同时启用 VLESS 或 Trojan 协议");const l={log:{level:"info"},dns:{servers:[{type:"https",tag:"dns-remote",server:"1.1.1.1"},{type:"udp",tag:"dns-direct",server:"223.5.5.5"},{type:"fakeip",tag:"dns-fakeip",inet4_range:"198.18.0.0/15"}],rules:[{rule_set:"geosite-cn",server:"dns-direct"},{query_type:["A","AAAA"],server:"dns-fakeip"}],final:"dns-remote",strategy:"ipv4_only"},inbounds:[{type:"mixed",tag:"mixed-in",listen:"127.0.0.1",listen_port:2080},{type:"tun",tag:"tun-in",interface_name:"tun0",address:["172.19.0.1/30"],mtu:9e3,auto_route:!0,strict_route:!0}],outbounds:[{type:"selector",tag:"🚀 节点选择",outbounds:s},{type:"selector",tag:"🎯 全球直连",outbounds:["direct"]},{type:"selector",tag:"🐟 漏网之鱼",outbounds:["🚀 节点选择","🎯 全球直连"]},{type:"selector",tag:"🌍 国外媒体",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🌐 谷歌服务",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🤖 OpenAI",outbounds:["🚀 节点选择"]},{type:"selector",tag:"🍎 苹果服务",outbounds:["🎯 全球直连","🚀 节点选择"]},{type:"selector",tag:"Ⓜ️ 微软服务",outbounds:["🎯 全球直连","🚀 节点选择"]},...i,{type:"direct",tag:"direct"}],route:{rules:[{action:"sniff"},{protocol:"dns",action:"hijack-dns"},{ip_is_private:!0,outbound:"direct"},...ye.map(([t,e])=>e?{rule_set:t,outbound:e}:{rule_set:t,action:"reject"}),{rule_set:"geoip-cn",outbound:"direct"}],rule_set:[...ye.map(([t])=>({type:"remote",tag:t,format:"binary",url:xe+t.replace("geosite-","geosite/")+".srs",download_detour:"direct"})),{type:"remote",tag:"geoip-cn",format:"binary",url:xe+"geoip/cn.srs",download_detour:"direct"}],final:"🐟 漏网之鱼",auto_detect_interface:!0,default_domain_resolver:"dns-direct"},experimental:{clash_api:{external_controller:"127.0.0.1:9090"},cache_file:{enabled:!0,store_fakeip:!0}}};return JSON.stringify(l,null,2)}function ke(t,e){const n=t.filter(t=>"xhttp"!==ie(t,"type"));if(!n.length)throw new Error(e+" 不支持 XHTTP，没有可用节点：请同时启用 VLESS 或 Trojan 协议");return n}function Se(t,e){e=ke(e,"Surge");const n=t.hst,r="/"+t.pth,o=e.map((t,e)=>{const{user:o,srv:a,prt:i,name:s,isTrojan:l,tls:c}=se(t,e),p=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${p}`:`${s} = vless, ${a}, ${i}, username=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${p}`});return`#!MANAGED-CONFIG\n[General]\nloglevel = notify\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${o.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${o.map(t=>t.split(" = ")[0]).join(", ")}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, 🚀 节点选择\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function Ce(t,e){e=ke(e,"Loon");const n=t.hst,r="/"+t.pth,o=e.map((t,e)=>{const{user:o,srv:a,prt:i,name:s,isTrojan:l,tls:c}=se(t,e),p=c?", tls=true, skip-cert-verify=false, sni="+n:", tls=false";return l?`${s} = trojan, ${a}, ${i}, password=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${p}`:`${s} = vless, ${a}, ${i}, username=${o}, ws=true, ws-path=${r}, ws-headers=Host:${n}${p}`}),a=o.map(t=>t.split(" = ")[0]).join(", ");return`[General]\ndns-server = 223.5.5.5, 119.29.29.29\n\n[Proxy]\n${o.join("\n")}\n\n[Proxy Group]\n🚀 节点选择 = select, ${a}\n🌐 全球直连 = select, DIRECT\n🐟 漏网之鱼 = select, ${a}\n\n[Rule]\nGEOIP,CN,DIRECT\nFINAL,🐟 漏网之鱼\n`}function Ee(t,e){e=ke(e,"Quantumult X");const n=t.hst,r="/"+t.pth,o=t=>t.indexOf(":")>=0?"["+t+"]":t,a=e.map((t,e)=>{const{user:a,srv:i,prt:s,name:l,tls:c}=se(t,e);return t.startsWith("trojan://")?c?`trojan=${o(i)}:${s}, password=${a}, over-tls=true, tls-host=${n}, obfs=wss, obfs-host=${n}, obfs-uri=${r}, tls-verification=true, tag=${l}`:`trojan=${o(i)}:${s}, password=${a}, over-tls=false, obfs=ws, obfs-host=${n}, obfs-uri=${r}, tag=${l}`:`vless=${o(i)}:${s}, method=none, password=${a}, obfs=${c?"wss":"ws"}, obfs-host=${n}, obfs-uri=${r}${c?", tls-verification=true, tls13=true":""}, tag=${l}`}),i=e.map((t,e)=>{const n=t.indexOf("#");if(n<0)return`节点${e+1}`;try{return decodeURIComponent(t.slice(n+1))||`节点${e+1}`}catch(t){return`节点${e+1}`}}).join(", ");return`[general]\nnetwork_check_url=http://www.gstatic.com/generate_204\nserver_check_url=http://www.gstatic.com/generate_204\ndns_exclusion_list=*.cmpassport.com, *.qq.com, *.weibo.com, *.icloud.com\n[dns]\nserver=223.5.5.5\nserver=119.29.29.29\n[server_local]\n${a.join("\n")}\n[policy]\nstatic=🚀 节点选择, ${i}, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png\nstatic=🌐 全球直连, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png\nstatic=🐟 漏网之鱼, 🚀 节点选择, direct, img-url=https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png\n[filter_local]\ngeoip, cn, 🌐 全球直连\nfinal, 🐟 漏网之鱼\n`}const Te=500;const Pe=String.raw`
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hopline · 代理订阅面板</title>
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
    <div class="bt"><b>Hopline</b><span>代理订阅面板</span></div>
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
  <div class="wdwarn" id="wdwarn">当前运行在 *.workers.dev 域名上：订阅与节点下发功能正常；若遇连接不稳或访问受限，建议在平台控制台绑定自定义域名后使用。</div>

  <div class="content">
    
    <section class="view" data-view="dashboard" data-title="仪表盘" data-sub="快速开始、订阅管理与运行状态">
      <div class="card">
        <h3><span class="tick"></span>快速开始</h3>
        <ol class="steps">
          <li><b>部署即用</b>：绑定域名后客户端订阅即可获得一批优选节点（优选域名与在线优选 IP 来源）；Clash / Mihomo 与 Sing-box 订阅已内置大陆直连分流规则（大陆应用、微软、苹果直连，国外服务走代理）。</li>
          <li><b>调优节点</b>：用本地测速工具在自己的网络下测速，把最优 IP 列表托管成一个地址（纯 IP 行 / CSV），填入「优选配置 → 优选 IP 来源」的自定义优选 API；也可以在「优选配置 → 优选域名」换成自己的优选域名。</li>
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
        <p class="hint" style="margin-top:12px">筛选后若没有节点，会按 运营商 → IP 类型 → 地区 的顺序逐级放宽条件，保证订阅始终非空。「运营商偏好」按节点名称中的运营商标记过滤（移动=移动/CM/CHINAMOBILE、联通=联通/CU/UNICOM、电信=电信/CT/CHINATELECOM），只剔除标记为未勾选运营商的节点，不带运营商标记的通用节点保留；HostMonit / uouin 实时优选节点带运营商标记（如「移动-01」）。「节点地区」支持多选，仅剔除节点名称明确标记为其它地区的节点；默认节点来源均为不带地区的任播 IP / 域名（任播 IP 的落地机房取决于你所在的网络），地区筛选通常不改变节点构成；自定义优选 API 返回的节点名带地区时才会按地区筛选。「地址来源」控制下发节点的来源：原生地址（工作器域名）、优选域名（「优选配置 → 优选域名」，留空用内置列表）、优选 IP（HostMonit / uouin / 自定义优选 API）。</p>
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
          <p class="hint">默认开启：只下发 TLS 端口节点。关闭后，每个 443 节点另追加一个 80 明文端口节点（名称带「·80」），来源中自带的 8080 / 2052 等明文端口也原样下发。明文节点不加密 UUID 与 Host，更容易被识别封锁；自定义域名还需在域名平台关闭「始终使用 HTTPS」，否则明文节点无法连接。开启 ECH 时始终只下发 TLS 端口节点。</p>
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
        <p class="hint" style="margin-top:0">直连不通（例如目标站同在该平台上）时，Worker 会把 TLS 流量交给地区反代按 SNI 转发，并与直连并发竞速。反代是第三方服务器，能看到目标域名与连接元数据；不想经第三方时选「关闭」，或改用自己的反代。非 TLS 流量不会走地区反代。</p>
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
        <p class="hint">每个域名的运营方都能通过 SNI 看到你的 Worker 主机名，只使用你信任的域名。测试会解析前 25 个域名，看它们是否落在边缘段（占用同样数量的子请求，仅管理员手动触发）。IPv6 解析：同时勾选 IPv4 与 IPv6 时只解析前 12 个域名，仅勾选 IPv6 时解析前 25 个；其余仍作为域名节点下发。</p>
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
        <p class="hint">仅在「仪表盘 → 地址来源 → 优选 IP」开启时生效。所有来源只保留边缘段 IP，结果缓存 10 分钟（绑定自定义域名时，同一机房的实例共享缓存），缓存未命中时每个开启的来源占用 1 个子请求。排列顺序：自定义 API 1 / 2 → HostMonit → uouin → 微测网。「测试」会立即重新拉取该来源（不影响订阅缓存，开关关闭时也可测试；自定义 API 使用输入框当前地址，无需先保存）。</p>
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
        <p class="hint" style="margin-top:10px">「绑定域名」仅用于订阅节点主机名（XHTTP 协议要求绑定自定义域名），不负责域名解析。自定义域名访问面板需先在平台控制台 → Workers 与 Pages → 该 Worker → Domains &amp; Routes 添加自定义域名（DNS 由平台托管，证书自动签发），此字段留空即使用你访问面板 / 订阅时的域名。未绑定 KV（绑定变量名 CONFIG_KV）时无法保存面板配置，只有环境变量生效。</p>
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

    
    <section class="view" data-view="about" data-title="关于项目" data-sub="Hopline — 代理订阅面板（独立界面 + 独立实现）">
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
    ? '当前为 *.workers.dev 域名：平台可能限制该域名直连，若客户端更新订阅失败（提示无效订阅），请在客户端开启系统代理或「更新订阅使用代理」后重试；节点连接不受影响（直连优选 IP）。'
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
  if (CFG.evl !== false) a.push('VLESS');
  if (CFG.etr) a.push('Trojan');
  if (CFG.exh) a.push('XHTTP');
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
  
  
  
  var custom = (window.CFG && CFG.sbu) ? String(CFG.sbu).trim().replace(/^\/+/, '').replace(/\/sub$/, '').replace(/\/+$/, '') : '';
  var seg = custom || (window.CFG && CFG.uid) || '';
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
  head.appendChild(mkEl('span', d.count ? 'ipt-ok' : 'ipt-err', d.count ? '✓ 可用 ' + d.count + ' 个边缘 IP' : '✗ ' + (d.error || '没有可用 IP')));
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
    out.appendChild(mkEl('div', 'ipt-dim', '已丢弃 ' + d.droppedCount + ' 个非边缘段地址：' + d.dropped.join(', ') + (d.droppedCount > d.dropped.length ? ' …' : '')));
  }
  var det = mkEl('details');
  det.appendChild(mkEl('summary', '', '原始响应（' + (d.rawLength > d.raw.length ? '前 ' + d.raw.length + ' / 共 ' + d.rawLength : '共 ' + d.rawLength) + ' 字符）'));
  det.appendChild(mkEl('pre', 'code', d.raw || '(空)'));
  if (!d.count) det.open = true;   
  out.appendChild(det);
}


function renderDomainTest(out, head, d){
  var rows = d.domains || [], ok = rows.filter(function(x){ return x.ok; }).length;
  head.appendChild(mkEl('span', ok ? 'ipt-ok' : 'ipt-err', ok ? '✓ ' + ok + ' / ' + rows.length + ' 个域名解析到边缘段' : '✗ ' + (d.error || '没有可用域名')));
  head.appendChild(mkEl('span', 'ipt-dim', d.ms + ' ms'));
  out.appendChild(head);
  if (rows.length) {
    var lines = rows.map(function(x){
      return (x.ok ? '✓ ' : '✗ ') + x.domain + '    ' + (x.failed ? '解析失败' : (x.ips.join(', ') || '无 A 记录') + (x.ok ? '' : '（不在边缘段，不建议使用）'));
    });
    out.appendChild(mkEl('pre', 'code', lines.join('\n')));
  }
  if (d.rawLength > d.raw.length || /未测试/.test(d.raw || '')) out.appendChild(mkEl('div', 'ipt-dim', (d.raw.split('\n').pop() || '')));
}


var RELAY_ZH = { HK: '香港', US: '美国', SG: '新加坡', JP: '日本', KR: '韩国', DE: '德国', SE: '瑞典', NL: '荷兰', FI: '芬兰', GB: '英国' };

function populateRelaySelects(){
  [['rl-region', 'rl.rg', '自动（按 Worker 机房）'], ['rl-region2', 'rl.r2', '自动（默认的另一地区）']].forEach(function(c){
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

`,Ae=String.raw`
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
    <div class="bt"><b>Hopline</b><span>代理订阅面板</span></div>
  </div>
  <h1>登录</h1>
  <p>请输入管理用户名与密码以继续</p>
  <div class="msg" id="msg">用户名或密码错误，请重试</div>
  <form id="form">
    <input type="text" id="user" placeholder="用户名" autofocus autocomplete="username" autocapitalize="off" spellcheck="false">
    <input type="password" id="pwd" placeholder="管理密码" autocomplete="current-password">
    <button type="submit" id="btn">登录</button>
  </form>
  <div class="foot">配置保存在 KV 中，24 小时未使用面板自动退出，最长 7 天需重新登录</div>
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

`;function Ie(t){return(t||"").toLowerCase().includes("mozilla")}function Ue(t,e){t=String(t),e=String(e);let n=t.length^e.length;const r=Math.max(t.length,e.length);for(let o=0;o<r;o++)n|=(t.charCodeAt(o)||0)^(e.charCodeAt(o)||0);return 0===n}async function Le(t,e){const n=await crypto.subtle.importKey("raw",L.encode(t),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),r=await crypto.subtle.sign("HMAC",n,L.encode(e));return Array.from(new Uint8Array(r)).map(t=>t.toString(16).padStart(2,"0")).join("")}const Oe="hopline-pbkdf2$",$e=t=>Array.from(t).map(t=>t.toString(16).padStart(2,"0")).join("");async function De(t,e,n){const r=await crypto.subtle.importKey("raw",L.encode(t),"PBKDF2",!1,["deriveBits"]);return $e(new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:e,iterations:n},r,256)))}function Ne(t){return"string"==typeof t&&t.startsWith(Oe)}const Re=864e5,He=6048e5;function Me(t){return String(t.adu||"")||"admin"}function _e(t){return"hopline-auth|"+String(t.adp)+"|"+String(t.uid)+"|"+Me(t)}async function je(t,e){const n=Date.now();e=e||n;const r=Math.min(n+Re,e+He);return{token:r+"."+e+"."+await Le(_e(t),r+"."+e),exp:r}}async function Fe(t,e,n){if(!e.adp)return!1;const r=(t.headers.get("Cookie")||"").match(/(?:^|;\s*)hopline_auth=([^;]+)/);if(!r)return!1;const o=r[1].split(".");if(3!==o.length||!/^\d+$/.test(o[0])||!/^\d+$/.test(o[1])||!o[2])return!1;const a=Number(o[0]),i=Number(o[1]),s=Date.now();if(a<s||s-i>He)return!1;if(!Ue(o[2],await Le(_e(e),o[0]+"."+o[1])))return!1;const l={exp:a,iat:i};if(n&&Math.min(s+Re,i+He)-a>=6e5){const t=await je(e,i);n.setCookie=Ge(t.token,t.exp)}return l}const ze=new Map,Be=9e5;function Ke(t){if((t=String(t||"unknown")).indexOf(":")<0)return t;const e=t.indexOf("::");let n;if(e>=0){const r=t.slice(0,e).split(":").filter(Boolean),o=t.slice(e+2).split(":").filter(Boolean);n=[...r,...Array(Math.max(0,8-r.length-o.length)).fill("0"),...o]}else n=t.split(":");return n.slice(0,4).map(t=>(t||"0").toLowerCase().replace(/^0+(?=.)/,"")).join(":")+"::/64"}function We(t,e){if(t=String(t||""),!/^\/[^\/\\]/.test(t))return!1;let n=t.slice(1).split(/[\/?#]/)[0];try{n=decodeURIComponent(n)}catch(t){return!1}return n===e}function Ve(t,e){return t=String(t||""),/^\/[^\/\\]/.test(t)?t:"/"+e}function Ge(t,e){return`hopline_auth=${t}; Path=/; Max-Age=${Math.max(0,Math.floor((e-Date.now())/1e3))}; HttpOnly; Secure; SameSite=Lax`}function qe(t,n){const r=T(t);return r.version=e,r.adpSet=!!t.adp,delete r.adp,r.pth=t.pth,r.panelPath=t.pth,r.envLocked=P(n),r.kv=!(!u(n)||"function"!=typeof u(n).put),r.builtinPrefDomains=I.split("\n"),r.kvError=t._kvError?Je(t._kvError):"",r}function Je(t){return"corrupt"===t?"KV 中保存的配置已损坏（不是合法 JSON），当前使用的是环境变量与默认值":"KV 暂时无法读取，当前使用的是环境变量与默认值"}function Xe(t){return t.map(t=>(t.label?t.label+"：":"")+t.msg).join("；")}async function Qe(t,e,n,r){const o=t.headers.get("User-Agent")||"";return async function(t,e,n,r){const o=Object.assign({},t,{host:t.hst||new URL(e).hostname}),a=function(t){return(t&&t.pfd?String(t.pfd).trim():"")||I}(t);o.ecn&&(o.tlo=!0);const i=t.ft&&t.ft.ip||[],s=i.includes("IPv6"),l=1===i.length&&"IPv6"===i[0],c=t.sc||{},p=!0===c.nv,d=!1!==c.pd,u=!1!==c.pi;if(o.preferredDomains="",o.preferredIPs=[],p&&!l&&(o.preferredDomains=o.host+"#原生地址"),d&&!l&&(o.preferredDomains=(o.preferredDomains?o.preferredDomains+"\n":"")+a),u){const e=t.ix||{},n=t=>e["a"+t]&&e["a"+t+"u"]?re(e["a"+t+"u"],200,300,!0,!1).catch(()=>[]):Promise.resolve([]),r=await Promise.all([n(1),n(2),!1===e.hm||l?null:Ft(150).catch(()=>null),!0===e.uo?Wt(!l,s).catch(()=>[]):null,!0===e.wt?Jt(!l,s).catch(()=>[]):null]);for(const t of r)t&&t.length&&o.preferredIPs.push(...t)}if(s&&d)try{const t=l?String(a).split("\n").slice(0,25).join("\n")+"\n"+A.join("\n"):a.split("\n").slice(0,12).join("\n"),e=await re(t,40,l?800:240,!0,"only");e&&e.length&&o.preferredIPs.push(...e.map((t,e)=>Object.assign({},t,{name:"优选IP-V6-"+String(e+1).padStart(2,"0")})))}catch(t){}p||d||u||(o.preferredDomains=A.map((t,e)=>t+"#域名-"+String(e+1).padStart(2,"0")).join("\n")),l&&o.preferredIPs&&(o.preferredIPs=o.preferredIPs.filter(t=>String(t.ip).indexOf(":")>=0)),r=(r||"").toLowerCase();const f=(n||"").toLowerCase(),h=Te;let m,g,b=function(t,e){if(!e||!e.rg&&!e.ip&&!e.is)return t;const n=Array.isArray(e.rg)&&e.rg.length?e.rg:["all"],r=e.ip||me,o=e.is||pe,a=t.map(t=>{const{host:e}=ae(t);let n="";try{const e=t.indexOf("#");e>=0&&(n=decodeURIComponent(t.slice(e+1)||""))}catch(t){n=""}const r=n.toUpperCase();return{host:e,name:n,up:r,isps:he(r),regions:fe(n,r)}}),i=(e,n,r)=>{const o=e.includes("all")?null:e.flatMap(t=>le[t]||[]),i=r.length>0&&r.length<pe.length;return t.filter((t,s)=>{const l=a[s],c=l.host.indexOf(":")>=0;if(!l.name)return!1;if(o&&l.regions.length&&!l.regions.some(t=>e.includes(t)))return!1;if(1===n.length){if("IPv4"===n[0]&&c)return!1;if("IPv6"===n[0]&&!c)return!1}return!(i&&l.isps.length&&!l.isps.some(t=>r.includes(t)))})};let s=i(n,r,o);return s.length||(s=i(n,r,pe)),s.length||(s=i(n,me,pe)),s.length||(s=i(["all"],me,pe)),s}(await oe(o,h),t.ft);if(!b.length){const t=Object.assign({},o,{preferredDomains:A.map((t,e)=>t+"#域名-"+String(e+1).padStart(2,"0")).join("\n"),preferredIPs:[],tlo:!0});b=await oe(t,h)}return b.length>h&&(b.length=h),b=function(t){const e=new Set;return t.map(t=>{const n=t.indexOf("#");if(n<0)return t;let r;try{r=decodeURIComponent(t.slice(n+1))}catch(e){r=t.slice(n+1)}let o=r,a=2;for(;e.has(o);)o=r+"·"+a++;return e.add(o),o===r?t:t.slice(0,n+1)+Xt(o)})}(b),"clash"===f||"stash"===f?(m="text/yaml",g=be(o,b)):"singbox"===f||"sing-box"===f?(m="application/json",g=we(o,b)):"surge"===f?(m="text/plain",g=Se(o,b)):"surfboard"===f?(m="text/plain",g=ve(o,b)):"loon"===f?(m="text/plain",g=Ce(o,b)):"quanx"===f||"quantumultx"===f?(m="text/plain",g=Ee(o,b)):"plain"===f||"raw"===f||"v2ray"===f||"v2rayn"===f||"shadowrocket"===f||"nekoray"===f?(m="text/plain",g=b.join("\n")):r.includes("clash")||r.includes("stash")?(m="text/yaml",g=be(o,b)):r.includes("sing-box")?(m="application/json",g=we(o,b)):r.includes("surge")?(m="text/plain",g=Se(o,b)):r.includes("surfboard")?(m="text/plain",g=ve(o,b)):r.includes("loon")?(m="text/plain",g=Ce(o,b)):r.includes("quantumult")?(m="text/plain",g=Ee(o,b)):(m="text/plain",g=b.join("\n")),{type:m,body:g,count:b.length}}(Object.assign({},n),t.url,r,o)}let Ye=null;function Ze(){return new Response('<!doctype html><html><head><meta charset="utf-8"><title>Hello World</title></head><body><h1>Hello World !</h1></body></html>',{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}async function tn(t,r,i){const l=new URL(t.url),c=t.headers.get("User-Agent")||"",p=(t.headers.get("Upgrade")||"").toLowerCase();if("http:"===l.protocol&&"websocket"!==p)return Response.redirect(l.href.replace("http://","https://"),301);const d=await async function(t){let e=null,n="";const r=u(t);if(r&&"function"==typeof r.get)try{const t=await r.get("config",{cacheTtl:30});if(t)try{if(e=JSON.parse(t),!e||"object"!=typeof e)throw new SyntaxError("not an object")}catch(t){e=null,n="corrupt"}}catch(t){n="unavailable"}const o=q(t,e);return n&&(o._kvError=n),o.uid||n||await async function(t,e,n){const r=u(t);if(!r||"function"!=typeof r.put)return void(n._uuidUnsaved=!0);let o=G.get(r);if(!o){o=function(){if(crypto.randomUUID)return crypto.randomUUID();const t=crypto.getRandomValues(new Uint8Array(16));return t[6]=15&t[6]|64,t[8]=63&t[8]|128,[...t].map((t,e)=>(4===e||6===e||8===e||10===e?"-":"")+t.toString(16).padStart(2,"0")).join("")}();try{await r.put("config",JSON.stringify(Object.assign({},e||{},{uid:o})))}catch(t){return void(n._kvError="unavailable")}G.set(r,o)}n.uid=o}(t,e,o),o}(r);if(d._kvError&&!V(r))return new Response("配置存储暂不可用，请稍后重试",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Retry-After":"30"}});const f=function(t,e){const n=[];return e.pth||n.push(e._pathError?"环境变量 PATH 的值不正确："+e._pathError+"。":"Hopline 尚未完成配置：请在 Worker 环境变量中设置 PATH（面板、订阅与节点共用的访问路径，如 mypanel）和 ADMIN（管理密码），然后重新访问。从旧版升级时：旧版的默认路径就是 UUID，把 PATH 设为原来的 UUID（或之前用 D 设置的路径）即可保持节点与订阅地址不变。"),e._uuidUnsaved&&n.push("未绑定 KV 命名空间（绑定变量名 CONFIG_KV）时，必须设置环境变量 UUID（节点用户 ID）；绑定 KV 后可留空，系统会自动生成并保存。"),n.join("\n")}(0,d);if(f)return new Response(f,{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});const h=d.pth,m=l.pathname.replace(/^\/+|\/+$/g,"").split("/");if("version"===m[0])return await Fe(t,d,i)?W({version:e}):new Response("Not Found",{status:404});if("login"===m[0]){if(!d.adp)return new Response("Not Found",{status:404});if("POST"===t.method){const e=t.headers.get("CF-Connecting-IP")||"unknown",n=await t.text(),r=new URLSearchParams(n);if(!We(r.get("next"),h))return new Response("Not Found",{status:404});if(function(t){const e=Ke(t),n=ze.get(e);return!!n&&(Date.now()-n.t>Be?(ze.delete(e),!1):n.n>=5)}(e))return W({ok:!1,msg:"尝试次数过多，请 15 分钟后再试"},429);const o=Ue(r.get("username")||"",Me(d)),a=await async function(t,e){if(t=String(t||""),e=String(null==e?"":e),!t)return!1;if(!Ne(t))return Ue(e,t);const n=t.slice(15).split("$"),r=parseInt(n[0],10);return!!(3===n.length&&r>=1e3&&r<=1e5&&n[1]&&n[2])&&Ue(await De(e,(o=n[1],Uint8Array.from((String(o).match(/../g)||[]).map(t=>parseInt(t,16)))),r),n[2]);var o}(d.adp,r.get("password")||"");if(o&&a){v=e,ze.delete(Ke(v));const t=await je(d);return new Response(JSON.stringify({ok:!0,next:Ve(r.get("next"),h)}),{status:200,headers:{"Content-Type":"application/json; charset=utf-8","Set-Cookie":Ge(t.token,t.exp)}})}return function(t){const e=Ke(t),n=Date.now(),r=ze.get(e);for(!r||n-r.t>Be?(ze.delete(e),ze.set(e,{n:1,t:n})):r.n++;ze.size>5e3;)ze.delete(ze.keys().next().value)}(e),W({ok:!1,msg:"用户名或密码错误"},403)}return We(l.searchParams.get("next"),h)?new Response(Ae,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}}):new Response("Not Found",{status:404})}var v;const y=String(d.sbu||"").trim().replace(/^\/+/,"").replace(/\/+$/,"")||d.uid,C=m[0]===h,A=C||m[0]===y;if(""===m[0])return Ze();if(C&&1===m.length){if("websocket"===p)return async function(t,e){const n=new WebSocketPair,[r,o]=Object.values(n);try{o.accept({allowHalfOpen:!0})}catch(t){o.accept()}o.binaryType="arraybuffer";let a=null,i=null,s=!1,l=null,c=null,p=!1,d=!1,u=!1,f=!1;const h=t=>{try{o.send(t)}catch(t){}},m=(t,e)=>{if(!f){f=!0;try{o.close(t,e)}catch(t){}}},g=t=>{m(1011,function(t){let e="",n=0;for(const r of String(t)){const t=L.encode(r).length;if(n+t>120)break;e+=r,n+=t}return e}(t&&t.message||t)),y()},b=async(n,r)=>{if(n&&n.byteLength&&(l=l?vt(l,n):n),!l||s)return;if(l.byteLength>65536)throw new Error("握手头超过 64KB");let o,f;try{const t=nt(l,e);if(!t&&0!==l[0]&&l.byteLength<58)return;if(f=!t,f&&!1===e.evl)throw new Error("VLESS 协议未启用");o=t?function(t){if(!t||t.byteLength<66)throw new Error("Trojan 头部过短");const e=new DataView(t.buffer,t.byteOffset,t.byteLength);let n=58;const r=e.getUint8(n);n+=1;const o=e.getUint8(n);let a,i;n+=1;const s=e=>{if(n+e>t.byteLength)throw new Error("Trojan 头部过短")};if(1===o)s(4),a=`${e.getUint8(n)}.${e.getUint8(n+1)}.${e.getUint8(n+2)}.${e.getUint8(n+3)}`,i=4;else if(3===o){s(1);const r=e.getUint8(n);s(1+r),a=O.decode(t.subarray(n+1,n+1+r)),i=1+r}else{if(4!==o)throw new Error("无法识别的地址类型");s(16),a=F(t.subarray(n,n+16)),i=16}n+=i,s(4);const l=e.getUint16(n);return n+=2,n+=2,{command:r,port:l,addr:a,password:O.decode(t.subarray(0,56)),headerLength:n}}(l):Q(l,e)}catch(t){if(/头部过短/.test(t.message||""))return;throw t}if(f?1!==o.command&&2!==o.command:1!==o.command)throw new Error("不支持的命令 "+o.command);!p&&f&&2!==o.command&&(p=!0,h(new Uint8Array([0,0])));const v=l.byteLength>o.headerLength?l.subarray(o.headerLength):null,y=It(v);if("unknown"===y&&!r)return void(c||(c=setTimeout(()=>{c=null,b(null,!0).catch(g)},80)));if(c&&(clearTimeout(c),c=null),s=!0,2===o.command){try{if(53===o.port&&v&&v.byteLength>=12){const t=await async function(t){if(!t||t.byteLength<17)return null;const e=new DataView(t.buffer,t.byteOffset,t.byteLength),n=e.getUint16(0);if(32768&e.getUint16(2))return null;if(1!==e.getUint16(4))return null;let r=12,o=[];for(;r<t.byteLength;){const n=e.getUint8(r);if(0===n){r++;break}if(!(192&~n)){r+=2;break}if(r+1+n>t.byteLength)return null;o.push(O.decode(t.subarray(r+1,r+1+n))),r+=1+n}if(r+4>t.byteLength||0===o.length)return null;const a=e.getUint16(r),i=e.getUint16(r+2),s=r+4;if(1!==a&&28!==a)return null;const l=o.join("."),c=t.subarray(12,s),p=await ot(rt,t=>t+"?name="+encodeURIComponent(l)+"&type="+a,t=>{if(!t||0!==t.Status)return null;const e=(t.Answer||[]).filter(t=>t.type===a&&(1===t.type?j(String(t.data)):/^[0-9a-fA-F:]+$/.test(String(t.data))));return e.length?e:null},{timeoutMs:5e3});if(!p)return null;const d=new Uint8Array(12),u=new DataView(d.buffer);u.setUint16(0,n),u.setUint16(2,33152),u.setUint16(4,1),u.setUint16(6,p.length);const f=[d,c];for(const t of p){const e=String(t.data),n=1===t.type?Uint8Array.from(e.split(".").map(Number)):at(e);if(n.length!==(1===t.type?4:16))continue;const r=new Uint8Array(10),o=new DataView(r.buffer);o.setUint16(0,49164),o.setUint16(2,t.type),o.setUint16(4,0===i?1:i),o.setUint32(6,Number(t.TTL)||300),f.push(r,new Uint8Array([n.length>>8&255,255&n.length]),n)}let h=0;f.forEach(t=>h+=t.byteLength);const m=new Uint8Array(h);let g=0;for(const t of f)m.set(t,g),g+=t.byteLength;return m}(v);t&&h(t)}}catch(t){}return void m(1e3)}const x=await Ut(o,e,t.cf&&t.cf.colo,y);if(d)try{x.close()}catch(t){}else a=x,i=x.writable.getWriter(),x._preamble&&x._preamble.byteLength>0&&h(x._preamble),l&&l.byteLength>o.headerLength&&await i.write(l.subarray(o.headerLength)),l=null,u=!0,async function(t,e,n){let r=null;const o=()=>new Promise(t=>{r=setTimeout(()=>t(null),0)}),a=()=>{const e=t.read();return e.catch(()=>{}),e};try{let t=a();for(;;){const n=await t;if(n.done)break;t=a();let i=null,s=n.value.byteLength,l=!1,c=s;for(;c>=4096&&s<65536;){const e=await Promise.race([t,o()]);if(clearTimeout(r),!e)break;if(e.done){l=!0;break}(i||(i=[n.value])).push(e.value),s+=e.value.byteLength,c=e.value.byteLength,t=a()}if(i){const t=new Uint8Array(s);let n=0;for(const e of i)t.set(e,n),n+=e.byteLength;e(t)}else e(n.value);if(l)break}}catch(t){}try{n&&n()}catch(t){}}(x.readable.getReader(),h,()=>m(1e3))},v=function(t,e){const n=String(t||"").trim();if(!n||n.length>8192||!/^[A-Za-z0-9\-_+/=]+$/.test(n))return null;let r;try{const t=n.replace(/-/g,"+").replace(/_/g,"/"),e=atob(t+"=".repeat((4-t.length%4)%4));r=new Uint8Array(e.length);for(let t=0;t<e.length;t++)r[t]=e.charCodeAt(t)}catch(t){return null}if(!r.byteLength||r.byteLength>6144)return null;if(r.byteLength>=17&&0===r[0]){let t;try{t=X(e.uid)}catch(t){return null}for(let e=0;e<16;e++)if(r[e+1]!==t[e])return null;return r}return nt(r,e)?r:null}(t.headers.get("sec-websocket-protocol"),e);function y(){if(d=!0,c&&(clearTimeout(c),c=null),a){try{a.close()}catch(t){}a=null}u||m(1e3)}return v&&b(v).catch(g),o.addEventListener("message",async t=>{try{const e="string"==typeof t.data?L.encode(t.data):new Uint8Array(t.data);s?i?await i.write(e):l=l?vt(l,e):e:await b(e)}catch(t){g(t)}}),o.addEventListener("close",y),o.addEventListener("error",y),new Response(null,{status:101,webSocket:r,headers:{"Sec-WebSocket-Extensions":"identity"}})}(t,d);if("POST"===t.method&&d.exh)try{return await async function(t,e){const n=t.body.getReader();let r=new Uint8Array(0),o=null;for(;!o;){const t=await n.read();if(t.done)return new Response("empty",{status:400});r=r.byteLength?vt(r,t.value):t.value;try{o=Q(r,e)}catch(t){if(!/头部过短/.test(t.message||""))throw t;if(r.byteLength>65536)throw new Error("握手头超过 64KB")}}if(1!==o.command)throw new Error("XHTTP 仅支持 TCP 命令");const a=r.subarray(o.headerLength),i=await Ut(o,e,t.cf&&t.cf.colo,It(a)),s=i.writable.getWriter();a.byteLength&&await s.write(a),s.releaseLock(),n.releaseLock(),t.body.pipeTo(i.writable).catch(()=>{});const l="function"==typeof IdentityTransformStream?new IdentityTransformStream:new TransformStream;return(async()=>{try{const t=l.writable.getWriter();await t.write(new Uint8Array([0,0])),i._preamble&&i._preamble.byteLength>0&&await t.write(i._preamble),t.releaseLock(),await i.readable.pipeTo(l.writable)}catch(t){}try{i.close()}catch(t){}})(),new Response(l.readable,{status:200,headers:{"content-type":"application/octet-stream","x-accel-buffering":"no","cache-control":"no-store"}})}(t,d)}catch(t){return W({ok:!1,msg:"xhttp 代理错误: "+(t.message||t)},500)}}if(A&&("sub"===m[1]||1===m.length&&!Ie(c))){const e=m.length>=3?m[2]:"";try{const n=await Qe(t,0,d,e);return new Response(n.body,{status:200,headers:{"Content-Type":n.type+"; charset=utf-8","Cache-Control":"no-store","Content-Disposition":"attachment; filename=\"Hopline\"; filename*=utf-8''Hopline"}})}catch(t){return new Response("订阅生成失败: "+(t&&t.message||t),{status:500,headers:{"Content-Type":"text/plain; charset=utf-8"}})}}if(C&&1===m.length&&Ie(c))return d.adp?await Fe(t,d,i)?new Response((Ye||(Ye=Pe.replace("/*@HOPLINE_SCHEMA@*/null",()=>JSON.stringify(g.map(t=>{const e=Object.assign({},t);return delete e.check,e})).replace(/</g,"\\u003c")).replace("/*@HOPLINE_CHECK@*/null",()=>"("+b.toString()+")").replace("/*@HOPLINE_HTTP_PORTS@*/null",()=>JSON.stringify([...U]))),Ye),{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}}):Response.redirect(new URL("/login?next="+encodeURIComponent("/"+h),t.url).href,302):new Response("面板已禁用：请先在 Worker 环境变量中设置 ADMIN（管理密码），然后重新访问。",{status:403,headers:{"Content-Type":"text/plain; charset=utf-8"}});if(C&&"api"===m[1]){const c=m[2]||"",p=await Fe(t,d,i);if(!p)return W({ok:!1,status:403,msg:"未授权（需要管理密码）"},403);if("config"===c){if("GET"===t.method)return W({ok:!0,data:qe(d,r)});if("POST"===t.method){if(d._kvError)return W({ok:!1,msg:Je(d._kvError)+"，为避免覆盖已有配置，已禁止保存"},503);const e=u(r);if(!e||"function"!=typeof e.put)return W({ok:!1,msg:"未绑定 KV 命名空间（变量名 CONFIG_KV），无法保存面板配置；请在 Worker 设置中绑定 KV 后重试"},400);let n;try{n=await t.json()}catch(t){return W({ok:!1,msg:"请求体不是合法的 JSON"},400)}try{const{patch:t,errors:e,ignored:o}=function(t,e){const n={},r=[],o=[];if(!t||"object"!=typeof t||Array.isArray(t))return{patch:n,errors:[{field:"",label:"配置",msg:"请求体必须为 JSON 对象"}],ignored:o};const a=P(e),i=new Set;for(const e of g){const s=k(t,e.key);if(void 0===s)continue;if(i.add(e.key),a[e.key]){o.push(e.key);continue}if("secret"===e.type&&(""===s||null==s))continue;let l=b(e,s);if(!l.error&&e.check){const t=x[e.check](l.value);"string"==typeof t?l={error:t}:t&&"value"in t&&(l=t)}l.error?r.push({field:e.key,label:e.label||e.key,msg:l.error}):S(n,e.key,l.value)}const s=(t,e)=>{for(const n of Object.keys(t)){const r=e?e+"."+n:n;i.has(r)||w.has(r)||(g.some(t=>t.key.startsWith(r+"."))&&t[n]&&"object"==typeof t[n]&&!Array.isArray(t[n])?s(t[n],r):o.push(r))}};return s(t,""),{patch:n,errors:r,ignored:o}}(n,r);if(e.length)return W({ok:!1,msg:Xe(e),errors:e,ignored:o},400);const a=T(d);for(const e of g){const n=k(t,e.key);void 0!==n&&S(a,e.key,n)}const i=function(t){const e=[];t.evl||t.etr||t.exh||e.push({field:"evl",label:"协议开关",msg:"至少启用一种协议，否则订阅中没有任何节点"}),t.rl&&"custom"===t.rl.md&&!String(t.rl.cu||"").trim()&&e.push({field:"rl.cu",label:"自定义反代列表",msg:"已选择「仅使用自定义反代」，请至少填写一个反代地址（或改回内置 / 关闭）"});for(const n of[1,2]){const r=t.ix||{};r["a"+n]&&!r["a"+n+"u"]&&e.push({field:"ix.a"+n+"u",label:"自定义优选 API "+n+" 地址",msg:"已开启该来源，请填写 API 地址（或关闭开关）"})}return e}(a);if(i.length)return W({ok:!1,msg:Xe(i),errors:i,ignored:o},400);!a.adp||Ne(a.adp)||P(r).adp||(a.adp=await async function(t){const e=crypto.getRandomValues(new Uint8Array(16));return Oe+1e4+"$"+$e(e)+"$"+await De(t,e,1e4)}(a.adp));const s=await async function(t,e){const n=u(t);if(!n||"function"!=typeof n.put)return null;const r=T(e),o=q(t,null),a=E();for(const t of g){const e=k(o,t.key);if(JSON.stringify(e)===JSON.stringify(k(a,t.key)))continue;if(JSON.stringify(k(r,t.key))!==JSON.stringify(e))continue;const n=t.key.split("."),i=n.length>1?k(r,n.slice(0,-1).join(".")):r;i&&delete i[n[n.length-1]]}for(const e of Object.keys(P(t))){const t=e.split("."),n=t.length>1?k(r,t.slice(0,-1).join(".")):r;n&&delete n[t[t.length-1]]}return await n.put("config",JSON.stringify(r)),r}(r,a),l=q(r,s),c={};if(l.adp&&_e(l)!==_e(d)){const t=await je(l,p.iat);c["Set-Cookie"]=Ge(t.token,t.exp)}return W({ok:!0,data:qe(l,r),ignored:o,msg:"已保存：本地区立即生效，其他地区约 1 分钟内同步"},200,c)}catch(t){return W({ok:!1,msg:"保存失败: "+(t.message||t)},500)}}return W({ok:!1,msg:"仅支持 GET / POST"},405)}if("logout"===c)return"POST"!==t.method?W({ok:!1,msg:"仅支持 POST"},405):W({ok:!0,msg:"已退出登录"},200,{"Set-Cookie":"hopline_auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"});if("reset"===c){if("POST"!==t.method)return W({ok:!1,msg:"仅支持 POST"},405);try{if("unavailable"===d._kvError)return W({ok:!1,msg:Je(d._kvError)+"，暂时无法重置"},503);const t=u(r);return t&&"function"==typeof t.delete?(await t.delete("config"),W({ok:!0,msg:"已重置：KV 已清空，面板还原为初始部署状态"})):W({ok:!1,msg:"未绑定 KV 命名空间，无需重置"},400)}catch(t){return W({ok:!1,msg:"重置失败: "+(t.message||t)},500)}}if("status"===c)return W({ok:!0,data:{version:e,host:l.hostname,path:h,region:t.cf&&t.cf.colo||"unknown",kv:!(!u(r)||"function"!=typeof u(r).get),workersDev:/\.workers\.dev$/i.test(l.hostname)}});if("update"===c)try{const t=await async function(){const t=Date.now();if(n&&t-n.t<6e4)return n.r;const r=await async function(t){try{const e=await fetch(function(t){return"https://raw.githubusercontent.com/iv7777/Hopline/main/"+encodeURIComponent(t)}(t),{headers:{"User-Agent":"Mozilla/5.0 (Hopline)"}});if(!e.ok)return{error:t+" HTTP "+e.status};const n=await e.text();return{txt:n,version:a(n)}}catch(t){return{error:t&&t.message||String(t)}}}("Hopline.js");return r.version?(n={t:t,r:{current:e,latest:r.version,hasUpdate:o(r.version,e)>0,code:r.txt,checkedAt:t}},n.r):{current:e,latest:null,hasUpdate:!1,code:"",error:r.error||"未在仓库中找到版本信息"}}(),r={current:t.current,latest:t.latest,hasUpdate:t.hasUpdate,error:t.error||""};return t.hasUpdate&&t.code&&(r.code=t.code),W({ok:!0,data:r})}catch(t){return W({ok:!1,msg:"检测失败: "+(t.message||t)},500)}if("ipsrc-test"===c){if("POST"!==t.method)return W({ok:!1,msg:"仅支持 POST"},405);let e={};try{e=await t.json()}catch(t){}const n=String(e&&e.source||""),r=Date.now();let o;if("hostmonit"===n)o=await jt(150);else if("uouin"===n)o=await Kt();else if("wetest"===n)o=await async function(){const[t,e]=await Promise.all([qt("v4"),qt("v6")]),n={status:t.status||e.status,raw:"IPv4 页面\n"+t.raw+"\n\nIPv6 页面\n"+e.raw,items:[...t.items,...e.items],dropped:[...t.dropped,...e.dropped],error:""},r=[t.error&&"IPv4："+t.error,e.error&&"IPv6："+e.error].filter(Boolean);return r.length&&(n.error=r.join("；")),n}();else if("domains"===n){const t=x.domainList(String(e&&e.text||""));if("string"==typeof t)return W({ok:!1,msg:t},400);o=await async function(t){const e={status:200,raw:"",items:[],dropped:[],error:"",domains:[]},n=t.slice(0,25),r=await Promise.all(n.map(async t=>{const e=await ot(["https://cloudflare-dns.com/dns-query","https://dns.alidns.com/resolve"],e=>e+"?name="+encodeURIComponent(t)+"&type=A",t=>!t||0!==t.Status&&3!==t.Status?null:(t.Answer||[]).filter(t=>1===t.type&&/^\d+\.\d+\.\d+\.\d+$/.test(String(t.data))).map(t=>String(t.data)),{timeoutMs:4e3}),n=(e||[]).filter(s);return{domain:t,failed:null===e,ips:(e||[]).slice(0,4),cf:n.length,ok:n.length>0}}));e.domains=r;for(const t of r)t.ok?e.items.push({ip:t.ips.find(s),port:443,name:t.domain}):e.dropped.push(t.domain);return e.raw=r.map(t=>t.domain+" → "+(t.failed?"解析失败":t.ips.join(", ")||"无 A 记录")+(t.ok?"":"（不在边缘段）")).join("\n"),t.length>n.length&&(e.raw+="\n… 另有 "+(t.length-n.length)+" 个域名未测试（单次最多测 25 个）"),e.items.length||(e.error="没有域名解析到边缘段 IP"),e}(t.value?t.value.split("\n"):I.split("\n"))}else{if("api1"!==n&&"api2"!==n)return W({ok:!1,msg:"未知来源："+n},400);{const t=b(w.get("ix.a"+n.slice(3)+"u"),e.url);if(t.error||!t.value)return W({ok:!1,msg:t.error||"请先填写 API 地址"},400);o=await async function(t){const e={status:0,raw:"",items:[],dropped:[],error:""};let n=!1;const r=await re(t,200,300,!1,!1,{fresh:!0,onRaw:(t,r,o)=>{n=!0,e.status=r,e.raw=o}}).catch(()=>[]);n?e.status?(e.status<200||e.status>=300)&&(e.error="HTTP "+e.status):e.error="请求失败或超时":e.error="地址无效";for(const t of r)(j(t.ip)&&s(t.ip)?e.items:e.dropped).push(j(t.ip)&&s(t.ip)?t:t.ip);return e.items.length||e.error||(e.error=e.dropped.length?"解析到的地址都不是边缘段 IP":"未能从响应中解析出 IP"),e}(t.value)}}const a=4e3;return W({ok:!0,data:{source:n,ms:Date.now()-r,status:o.status,error:o.error||"",count:o.items.length,items:o.items.slice(0,300),droppedCount:o.dropped.length,dropped:o.dropped.slice(0,50),raw:o.raw.slice(0,a),rawLength:o.raw.length,domains:o.domains}})}if("sub"===c){const e=l.searchParams.get("fmt")||"";try{const n=await Qe(t,0,d,e);return W({ok:!0,type:n.type,body:n.body,count:n.count})}catch(t){return W({ok:!1,msg:"订阅生成失败: "+(t.message||t)},500)}}return W({ok:!1,msg:"未知 API: "+c},404)}return Ze()}export default{async fetch(t,e){const n={};let r=await tn(t,e,n);return n.setCookie&&101!==r.status&&!r.headers.has("Set-Cookie")&&(r=new Response(r.body,r),r.headers.set("Set-Cookie",n.setCookie)),function(t){if(!t||101===t.status||t.webSocket)return t;const e=t.headers.get("Content-Type")||"",n=/^text\/html/i.test(e),r=/^application\/json/i.test(e);if(!n&&!r)return t;const o=new Headers(t.headers);return o.set("X-Content-Type-Options","nosniff"),o.set("Referrer-Policy","no-referrer"),n&&(o.set("Content-Security-Policy","default-src 'none'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"),o.set("X-Frame-Options","DENY")),new Response(t.body,{status:t.status,statusText:t.statusText,headers:o})}(r)}};
