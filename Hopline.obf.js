/*!Hopline v2.3.3 (obfuscated, level=light)*/
const a0aw=a0P;(function(I,P){const aa=a0P,f=I();while(!![]){try{const a=parseInt(aa(0x2e1))/0x1*(parseInt(aa(0x34e))/0x2)+parseInt(aa(0x382))/0x3+parseInt(aa(0x2c1))/0x4*(-parseInt(aa(0x1a0))/0x5)+-parseInt(aa(0x286))/0x6+parseInt(aa(0x394))/0x7*(parseInt(aa(0x2c3))/0x8)+-parseInt(aa(0x2a5))/0x9*(-parseInt(aa(0x3af))/0xa)+parseInt(aa(0x245))/0xb*(-parseInt(aa(0x1e9))/0xc);if(a===P)break;else f['push'](f['shift']());}catch(w){f['push'](f['shift']());}}}(a0I,0x61264));import{connect}from'cloudflare:sockets';const a0f='2.3.3',a0a='iv7777/Hopline',a0w=a0aw(0x343);let a0p=null;function a0J(I){const P=String(I||'')['match'](/(\d+)\.(\d+)\.(\d+)/);return P?[parseInt(P[0x1],0xa),parseInt(P[0x2],0xa),parseInt(P[0x3],0xa)]:null;}function a0q(I,P){const f=a0J(I),w=a0J(P);if(!f||!w)return 0x0;for(let p=0x0;p<0x3;p++){if(f[p]!==w[p])return f[p]<w[p]?-0x1:0x1;}return 0x0;}function a0o(I){const ap=a0P,P=I[ap(0x31b)](/Hopline v(\d+\.\d+\.\d+)/);if(P)return P[0x1];const f=I['match'](/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);return f?f[0x1]:null;}function a0H(I){const aJ=a0P;return'https://raw.githubusercontent.com/'+a0a+aJ(0x2f9)+encodeURIComponent(I);}async function a0K(I){const aq=a0P;try{const P=await fetch(a0H(I),{'headers':{'User-Agent':aq(0x1a1)}});if(!P['ok'])return{'error':I+'\x20HTTP\x20'+P[aq(0x202)]};const f=await P['text']();return{'txt':f,'version':a0o(f)};}catch(a){return{'error':a&&a[aq(0x39c)]||String(a)};}}async function a0n(){const ao=a0P,I=Date[ao(0x294)]();if(a0p&&I-a0p['t']<0xea60)return a0p['r'];const P=await a0K(a0w);if(!P[ao(0x35e)])return{'current':a0f,'latest':null,'hasUpdate':![],'code':'','error':P['error']||'未在仓库中找到版本信息'};return a0p={'t':I,'r':{'current':a0f,'latest':P[ao(0x35e)],'hasUpdate':a0q(P[ao(0x35e)],a0f)>0x0,'code':P['txt'],'checkedAt':I}},a0p['r'];}const a0r='\x0a#\x20====================\x20锚点配置\x20====================\x0a#\x20代理提供者模板\x20-\x20订阅源基础配置\x0a\x0a#\x20节点筛选正则表达式\x20-\x20仅保留常用地区\x0aFilterHK:\x20&FilterHK\x20\x27^(?=.*(?i)(港|🇭🇰|HK|Hong|HKG))(?!.*5x).*$\x27\x0aFilterSG:\x20&FilterSG\x20\x27^(?=.*(?i)(坡|🇸🇬|SG|Sing|SIN|XSP))(?!.*5x).*$\x27\x0aFilterJP:\x20&FilterJP\x20\x27^(?=.*(?i)(日|🇯🇵|JP|Japan|NRT|HND|KIX|CTS|FUK))(?!.*(尼日利亚|5x)).*$\x27\x0aFilterUS:\x20&FilterUS\x20\x27^(?=.*(?i)(美|🇺🇸|US|USA|JFK|SJC|LAX|ORD|ATL|DFW|SFO|MIA|SEA|IAD))(?!.*(Plus|Australia|5x)).*$\x27\x0a#\x20注意：🇼🇸\x20是萨摩亚旗帜，不是台湾，已移除，避免误匹配\x0aFilterTW:\x20&FilterTW\x20\x27^(?=.*(?i)(台|🇹🇼|TW|tai|TPE|TSA|KHH))(?!.*5x).*$\x27\x0a\x0a#\x20====================\x20监听器\x20====================\x0alisteners:\x0a\x20\x20#\x20Shadowsocks监听器\x20-\x20远程连接家庭网络。密码由\x20Hopline\x20按\x20UUID\x20为本部署派生（每个部署不同），不再使用公开的默认密码；\x0a\x20\x20#\x20如需对外开放请自行修改端口与密码\x0a\x20\x20-\x20{name:\x20SS-IN,\x20\x20type:\x20shadowsocks,\x20listen:\x20\x27::\x27,\x20port:\x2010000,\x20udp:\x20true,\x20password:\x20\x22__HOPLINE_SS_PASSWORD__\x22,\x20cipher:\x20aes-256-gcm}\x0a\x20\x20#\x20Mixed监听器\x20-\x20分地区专用端口\x20玩法：本地浏览器插件或手机APP配置代理，实现分地区访问\x0a\x20\x20-\x20{name:\x20MIXED-SG,\x20type:\x20mixed,\x20port:\x2050000,\x20proxy:\x20新加坡节点}\x0a\x20\x20-\x20{name:\x20MIXED-US,\x20type:\x20mixed,\x20port:\x2050001,\x20proxy:\x20美国节点}\x0a\x20\x20-\x20{name:\x20MIXED-TW,\x20type:\x20mixed,\x20port:\x2050002,\x20proxy:\x20台湾节点}\x0a\x20\x20-\x20{name:\x20MIXED-HK,\x20type:\x20mixed,\x20port:\x2050003,\x20proxy:\x20香港节点}\x0a\x20\x20-\x20{name:\x20MIXED-JP,\x20type:\x20mixed,\x20port:\x2050004,\x20proxy:\x20日本节点}\x0a\x20\x20-\x20{name:\x20MIXED-AL,\x20type:\x20mixed,\x20port:\x2050007,\x20proxy:\x20一键连接}\x0a\x0a#\x20====================\x20核心配置\x20====================\x0amode:\x20rule\x0aport:\x207890\x0asocks-port:\x207891\x0aredir-port:\x207892\x0amixed-port:\x207893\x0atproxy-port:\x207895\x0aipv6:\x20true\x0aallow-lan:\x20true\x0aunified-delay:\x20true\x0atcp-concurrent:\x20true\x0alog-level:\x20warning\x0abind-address:\x20\x27*\x27\x0afind-process-mode:\x20\x27always\x27\x0akeep-alive-interval:\x2015\x0akeep-alive-idle:\x20600\x0a\x0a#\x20认证配置：密码由\x20Hopline\x20按\x20UUID\x20为本部署派生（每个部署不同），不再使用公开的默认凭据\x0aauthentication:\x0a\x20\x20-\x20\x22mihomo:__HOPLINE_AUTH_PASSWORD__\x22\x0askip-auth-prefixes:\x0a\x20\x20-\x20192.168.1.0/24\x0a\x20\x20-\x20192.168.31.0/24\x0a\x20\x20-\x20192.168.100.0/24\x0a\x20\x20-\x20127.0.0.1/8\x0a\x0a#\x20实验性功能\x0aexperimental:\x0a\x20\x20quic-go-disable-gso:\x20true\x0a\x0a#\x20管理面板配置\x0aexternal-ui-url:\x20https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip\x0aexternal-ui-name:\x20zashboard\x0aexternal-ui:\x20ui\x0aexternal-controller:\x20127.0.0.1:9090\x0asecret:\x20\x22__HOPLINE_API_SECRET__\x22\x20\x20\x20\x20#\x20由\x20Hopline\x20按\x20UUID\x20为本部署派生，可自行修改\x0a#\x20允许跨域访问的面板来源（不再使用\x20\x22*\x22：任意网页都不能借浏览器访问本机控制接口）。使用其它在线面板时在此追加其域名\x0aexternal-controller-cors:\x0a\x20\x20allow-origins:\x0a\x20\x20\x20\x20-\x20\x22http://127.0.0.1:9090\x22\x0a\x20\x20\x20\x20-\x20\x22http://localhost:9090\x22\x0a\x20\x20\x20\x20-\x20\x22https://board.zash.run.place\x22\x0a\x20\x20\x20\x20-\x20\x22https://metacubex.github.io\x22\x0a\x20\x20allow-private-network:\x20true\x0a\x0a#\x20配置存储\x0aprofile:\x0a\x20\x20store-selected:\x20true\x0a\x20\x20store-fake-ip:\x20true\x0a\x0a#\x20geosite\x20/\x20geoip\x20数据源（GEOSITE\x20规则依赖）：MetaCubeX\x20规则库，经\x20jsDelivr\x20镜像下载（GitHub\x20release\x20国内常不可达）\x0ageox-url:\x0a\x20\x20geoip:\x20\x22https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat\x22\x0a\x20\x20geosite:\x20\x22https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat\x22\x0a\x20\x20mmdb:\x20\x22https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb\x22\x0a\x0a#\x20流量嗅探\x0asniffer:\x0a\x20\x20enable:\x20true\x0a\x20\x20force-dns-mapping:\x20true\x20\x20\x20#\x20强制\x20DNS\x20映射，提高分流准确度\x0a\x20\x20parse-pure-ip:\x20true\x20\x20\x20\x20\x20\x20\x20#\x20解析纯\x20IP\x20连接\x0a\x20\x20override-destination:\x20true\x0a\x20\x20sniff:\x0a\x20\x20\x20\x20HTTP:\x0a\x20\x20\x20\x20\x20\x20ports:\x20[80,\x208080-8880]\x0a\x20\x20\x20\x20TLS:\x0a\x20\x20\x20\x20\x20\x20ports:\x20[443,\x208443]\x0a\x20\x20\x20\x20QUIC:\x0a\x20\x20\x20\x20\x20\x20ports:\x20[443,\x208443]\x0a\x20\x20skip-domain:\x0a\x20\x20\x20\x20-\x20\x22+.push.apple.com\x22\x0a\x0a#\x20TUN模式配置\x0atun:\x0a\x20\x20enable:\x20false\x0a\x20\x20stack:\x20mixed\x0a\x20\x20mtu:\x201480\x0a\x20\x20dns-hijack:\x0a\x20\x20\x20\x20-\x20\x22any:53\x22\x0a\x20\x20\x20\x20-\x20\x22tcp://any:53\x22\x0a\x20\x20udp-timeout:\x20300\x0a\x20\x20auto-route:\x20true\x0a\x20\x20strict-route:\x20true\x0a\x20\x20auto-redirect:\x20true\x0a\x20\x20auto-detect-interface:\x20true\x0a\x20\x20#\x20提示：系统级防泄露的最强手段是开启\x20TUN（自动劫持全部\x20DNS\x20流量）；\x0a\x20\x20#\x20不开\x20TUN\x20时，请把系统\x20/\x20本机应用的\x20DNS\x20指向\x20127.0.0.1:1053；要给\x20LAN\x20设备提供\x20DNS，把下方\x20dns.listen\x20改为\x200.0.0.0:1053（注意不要暴露到公网）。\x0a\x0ahosts:\x0a\x20\x20miwifi.com:\x20192.168.31.2\x0a\x20\x20\x22epdg.epc.mnc010.mcc234.pub.3gppnetwork.org\x22:\x20[87.194.8.8,\x2087.194.88.8,\x2087.194.89.8,\x2087.194.9.8]\x0a\x20\x20services.googleapis.cn:\x20services.googleapis.com\x0a\x20\x20cn.bing.com:\x20www4.bing.com\x0a\x0a#\x20====================\x20DNS\x20配置\x20====================\x0a#\x20防泄露要点：\x0a#\x20\x20\x201)\x20respect-rules:\x20true：DNS\x20服务器连接遵循路由规则（国外\x20DoH\x20走代理隧道、国内\x20DoH\x20直连），\x0a#\x20\x20\x20\x20\x20\x20解析行为与规则分流一致，避免“规则走代理、解析却直连”的泄露。\x0a#\x20\x20\x202)\x20默认\x20nameserver\x20用国内\x20DoH；只有“将走代理”的规则集才用国外\x20DoH，\x0a#\x20\x20\x20\x20\x20\x20且其域名在\x20rules\x20中显式固定走代理。\x0a#\x20\x20\x203)\x20fake-ip-filter\x20补齐系统连通性检测\x20/\x20时间同步\x20/\x20运营商登录等域名，防止系统误判断网而回退运营商\x20DNS。\x0adns:\x0a\x20\x20enable:\x20true\x0a\x20\x20listen:\x20127.0.0.1:1053\x20\x20\x20\x20#\x20仅本机监听（53\x20端口需要管理员权限且常被系统占用，监听\x200.0.0.0\x20还可能成为公网开放解析器）\x0a\x20\x20ipv6:\x20true\x0a\x20\x20prefer-h3:\x20false\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20respect-rules\x20下官方不推荐\x20DoH3；且\x20QUIC\x20已被规则拦截\x0a\x20\x20cache-algorithm:\x20arc\x20\x20\x20\x20\x20\x20#\x20性能更优的\x20ARC\x20缓存算法\x0a\x20\x20cache-size:\x204096\x0a\x20\x20enhanced-mode:\x20fake-ip\x0a\x20\x20fake-ip-range:\x20198.18.0.1/16\x0a\x20\x20fake-ip-filter:\x0a\x20\x20\x20\x20-\x20\x22+.lan\x22\x0a\x20\x20\x20\x20-\x20\x22+.local\x22\x0a\x20\x20\x20\x20-\x20\x22+.localhost\x22\x0a\x20\x20\x20\x20-\x20\x22+.home.arpa\x22\x0a\x20\x20\x20\x20-\x20\x22+.internal\x22\x0a\x20\x20\x20\x20#\x20系统连通性检测（防止\x20fake-ip\x20导致“无网络”判断，回退\x20ISP\x20DNS\x20造成泄露）\x0a\x20\x20\x20\x20-\x20\x22+.msftconnecttest.com\x22\x0a\x20\x20\x20\x20-\x20\x22+.msftncsi.com\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20通配已覆盖\x20dns.msftncsi.com\x0a\x20\x20\x20\x20-\x20\x22captive.apple.com\x22\x0a\x20\x20\x20\x20-\x20\x22connectivitycheck.gstatic.com\x22\x0a\x20\x20\x20\x20-\x20\x22detectportal.firefox.com\x22\x0a\x20\x20\x20\x20#\x20时间同步\x0a\x20\x20\x20\x20-\x20\x22time.nist.gov\x22\x0a\x20\x20\x20\x20-\x20\x22+.pool.ntp.org\x22\x0a\x20\x20\x20\x20-\x20\x22time.*.com\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20通配已覆盖\x20time.windows.com\x0a\x20\x20\x20\x20-\x20\x22ntp.*.com\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20通配已覆盖\x20ntp.ubuntu.com\x0a\x20\x20\x20\x20#\x20运营商\x20Wi-Fi\x20登录页\x0a\x20\x20\x20\x20-\x20\x22+.cmpassport.com\x22\x0a\x20\x20\x20\x20-\x20\x22id6.me\x22\x0a\x20\x20\x20\x20-\x20\x22open.e.189.cn\x22\x0a\x20\x20\x20\x20-\x20\x22mdn.open.wo.cn\x22\x0a\x20\x20\x20\x20-\x20\x22opencloud.wostore.cn\x22\x0a\x20\x20\x20\x20-\x20\x22auth.wosms.cn\x22\x0a\x20\x20\x20\x20-\x20\x22+.10099.com.cn\x22\x0a\x20\x20\x20\x20#\x20原配置保留项\x0a\x20\x20\x20\x20-\x20\x22+.market.xiaomi.com\x22\x0a\x20\x20\x20\x20-\x20\x22+.pub.3gppnetwork.org\x22\x0a\x20\x20\x20\x20-\x20\x22+.push.apple.com\x22\x0a\x20\x20\x20\x20-\x20\x22+.bing.com\x22\x0a\x20\x20\x20\x20-\x20\x22+.miwifi.com\x22\x0a\x20\x20\x20\x20-\x20\x22+.docker.io\x22\x0a\x20\x20\x20\x20#\x20国内应用登录（+.qq.com\x20已覆盖\x20localhost.ptlogin2.qq.com）\x0a\x20\x20\x20\x20-\x20\x22+.qq.com\x22\x0a\x20\x20\x20\x20#\x20直连\x20/\x20国内类规则集：返回真实\x20IP\x0a\x20\x20\x20\x20-\x20rule-set:Direct\x0a\x20\x20\x20\x20-\x20rule-set:Private\x0a\x20\x20\x20\x20-\x20rule-set:China\x0a\x20\x20\x20\x20-\x20geosite:cn\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20国内域名返回真实\x20IP（geosite\x20库兜底，防\x20fake-ip\x20干扰国内应用）\x0a\x20\x20use-hosts:\x20true\x0a\x20\x20respect-rules:\x20true\x0a\x20\x20#\x20引导用\x20DNS（解析\x20DoH/DoT\x20服务器自身的域名），必须是\x20IP\x0a\x20\x20default-nameserver:\x0a\x20\x20\x20\x20-\x20223.5.5.5\x0a\x20\x20\x20\x20-\x20119.29.29.29\x0a\x20\x20#\x20默认解析：未命中\x20nameserver-policy\x20的域名（国内\x20DoH，直连）\x0a\x20\x20nameserver:\x0a\x20\x20\x20\x20-\x20\x22https://dns.alidns.com/dns-query\x22\x0a\x20\x20\x20\x20-\x20\x22https://doh.pub/dns-query\x22\x0a\x20\x20#\x20直连出口的解析\x0a\x20\x20direct-nameserver:\x0a\x20\x20\x20\x20-\x20\x22https://dns.alidns.com/dns-query\x22\x0a\x20\x20\x20\x20-\x20\x22https://doh.pub/dns-query\x22\x0a\x20\x20#\x20解析代理节点域名（防套娃\x20/\x20防循环，用国内直连可达的\x20DoH）\x0a\x20\x20proxy-server-nameserver:\x0a\x20\x20\x20\x20-\x20\x22https://dns.alidns.com/dns-query\x22\x0a\x20\x20\x20\x20-\x20\x22https://doh.pub/dns-query\x22\x0a\x20\x20nameserver-policy:\x0a\x20\x20\x20\x20#\x20广告域名直接返回空应答\x0a\x20\x20\x20\x20\x22rule-set:Advertising,AWAvenueAds\x22:\x20rcode://success\x0a\x20\x20\x20\x20#\x20直连类：国内\x20DoH（微软已并入直连，微软域名走国内解析后直连）\x0a\x20\x20\x20\x20\x22rule-set:Direct,Private,China,Microsoft\x22:\x0a\x20\x20\x20\x20\x20\x20-\x20\x22https://dns.alidns.com/dns-query\x22\x0a\x20\x20\x20\x20\x20\x20-\x20\x22https://doh.pub/dns-query\x22\x0a\x20\x20\x20\x20#\x20走代理类：国外\x20DoH（连接本身经代理隧道，不直连暴露查询）\x0a\x20\x20\x20\x20\x22rule-set:AI,Telegram,Twitter,SocialMedia,Netflix,YouTube,Spotify,TikTok,disney,Google,Proxy\x22:\x0a\x20\x20\x20\x20\x20\x20-\x20\x22https://dns.google/dns-query\x22\x0a\x20\x20\x20\x20\x20\x20-\x20\x22https://cloudflare-dns.com/dns-query\x22\x0a\x0a#\x20====================\x20代理策略组（9\x20个可见\x20+\x206\x20个隐藏自动子组）\x20====================\x0aproxy-groups:\x0a\x20\x20#\x20主入口：默认自动选择，可手动切换各地区\x20/\x20故障转移\x20/\x20全部节点\x20/\x20直接连接\x0a\x20\x20-\x20{name:\x20一键连接,\x20\x20\x20\x20\x20type:\x20select,\x20proxies:\x20[自动选择,\x20故障转移,\x20香港节点,\x20台湾节点,\x20日本节点,\x20美国节点,\x20新加坡节点,\x20全部节点,\x20直接连接],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Static.png}\x0a\x20\x20#\x20自动选择：隐藏（面板不可手动选择），纯自动优选延时最低节点；故障转移：按序自动切换\x0a\x20\x20-\x20{name:\x20自动选择,\x20\x20\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20hidden:\x20true,\x20empty-fallback:\x20REJECT,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20-\x20{name:\x20故障转移,\x20\x20\x20\x20\x20type:\x20fallback,\x20proxies:\x20[香港节点,\x20台湾节点,\x20日本节点,\x20美国节点,\x20新加坡节点,\x20全部节点],\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/ULB.png}\x0a\x20\x20#\x20常用地区节点组（select：默认选中“XX自动”=自动优选该地区最快节点，也可手动指定单个节点）\x0a\x20\x20-\x20{name:\x20香港节点,\x20\x20\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20filter:\x20*FilterHK,\x20proxies:\x20[香港自动],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Hong_Kong.png}\x0a\x20\x20-\x20{name:\x20台湾节点,\x20\x20\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20filter:\x20*FilterTW,\x20proxies:\x20[台湾自动],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Taiwan.png}\x0a\x20\x20-\x20{name:\x20日本节点,\x20\x20\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20filter:\x20*FilterJP,\x20proxies:\x20[日本自动],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Japan.png}\x0a\x20\x20-\x20{name:\x20美国节点,\x20\x20\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20filter:\x20*FilterUS,\x20proxies:\x20[美国自动],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/United_States.png}\x0a\x20\x20-\x20{name:\x20新加坡节点,\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20filter:\x20*FilterSG,\x20proxies:\x20[新加坡自动],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Singapore.png}\x0a\x20\x20#\x20全部节点（手动挑选任意节点；首个选项“自动选择”=全部节点中最快）\x0a\x20\x20-\x20{name:\x20全部节点,\x20\x20\x20\x20\x20type:\x20select,\x20include-all:\x20true,\x20proxies:\x20[自动选择],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Global.png}\x0a\x20\x20#\x20各地区自动优选子组（隐藏，作为各地区分组内的“自动选择”选项）\x0a\x20\x20-\x20{name:\x20香港自动,\x20\x20\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20filter:\x20*FilterHK,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20hidden:\x20true,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20-\x20{name:\x20台湾自动,\x20\x20\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20filter:\x20*FilterTW,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20hidden:\x20true,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20-\x20{name:\x20日本自动,\x20\x20\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20filter:\x20*FilterJP,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20hidden:\x20true,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20-\x20{name:\x20美国自动,\x20\x20\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20filter:\x20*FilterUS,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20hidden:\x20true,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20-\x20{name:\x20新加坡自动,\x20\x20\x20type:\x20url-test,\x20include-all:\x20true,\x20filter:\x20*FilterSG,\x20url:\x20\x27https://www.google.com/generate_204\x27,\x20interval:\x20200,\x20lazy:\x20true,\x20empty-fallback:\x20REJECT,\x20hidden:\x20true,\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Auto.png}\x0a\x20\x20#\x20直连分组（放在最下方）\x0a\x20\x20-\x20{name:\x20直接连接,\x20\x20\x20\x20\x20type:\x20select,\x20proxies:\x20[DIRECT],\x20icon:\x20https://github.com/Koolson/Qure/raw/master/IconSet/Color/Direct.png}\x0a\x0a#\x20====================\x20规则路由\x20====================\x0arules:\x0a\x20\x20#\x20广告拦截（常用：直接拒绝；如需临时放行可改为一键连接）\x0a\x20\x20-\x20RULE-SET,Tracking,REJECT\x0a\x20\x20-\x20RULE-SET,AWAvenueAds,REJECT\x0a\x20\x20-\x20RULE-SET,Advertising,REJECT\x0a\x20\x20-\x20GEOSITE,category-ads-all,REJECT\x20\x20\x20\x20\x20\x20\x20\x20#\x20geosite\x20广告分类兜底（覆盖规则集未收录的广告域名）\x0a\x0a\x20\x20#\x20DNS\x20服务器域名：解析通道固定，避免\x20DNS\x20流量走错路径（防泄露关键）\x0a\x20\x20-\x20DOMAIN-SUFFIX,alidns.com,直接连接\x0a\x20\x20-\x20DOMAIN-SUFFIX,doh.pub,直接连接\x0a\x20\x20-\x20DOMAIN,dns.google,一键连接\x0a\x20\x20-\x20DOMAIN,cloudflare-dns.com,一键连接\x0a\x0a\x20\x20#\x20大陆直连优先（置于国外服务规则之前：大陆应用一律直连，不被国外服务规则集抢先命中）\x0a\x20\x20-\x20RULE-SET,Private,直接连接\x0a\x20\x20-\x20RULE-SET,Direct,直接连接\x0a\x20\x20-\x20RULE-SET,Download,直接连接\x0a\x20\x20-\x20RULE-SET,AppleCN,直接连接\x0a\x20\x20-\x20RULE-SET,Microsoft,直接连接\x20\x20\x20\x20\x20\x20\x20\x20#\x20微软全家桶直连（Office\x20/\x20OneDrive\x20/\x20Windows\x20更新\x20/\x20Teams\x20/\x20Xbox\x20等）\x0a\x20\x20-\x20RULE-SET,China,直接连接\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20国内域名直连\x0a\x20\x20-\x20GEOSITE,CN,直接连接\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#\x20geosite\x20国内域名兜底（覆盖规则集未收录的国内域名，先于\x20GEOIP\x20命中）\x0a\x20\x20#\x20阻止走代理的\x20QUIC（强制回退\x20TCP，避免\x20QUIC\x20绕过代理\x20/\x20被干扰）。\x0a\x20\x20#\x20放在直连规则之后：直连\x20QUIC（大陆\x20/\x20微软\x20/\x20苹果）不受影响。如需\x20Telegram\x20语音等\x20UDP，可删除此行。\x0a\x20\x20-\x20AND,((DST-PORT,443),(NETWORK,UDP)),REJECT\x0a\x0a\x20\x20#\x20常用国外服务（统一走一键连接）\x0a\x20\x20-\x20RULE-SET,AI,一键连接\x0a\x20\x20-\x20RULE-SET,Telegram,一键连接\x0a\x20\x20-\x20RULE-SET,Twitter,一键连接\x0a\x20\x20-\x20RULE-SET,SocialMedia,一键连接\x0a\x20\x20-\x20RULE-SET,Netflix,一键连接\x0a\x20\x20-\x20RULE-SET,YouTube,一键连接\x0a\x20\x20-\x20RULE-SET,Spotify,一键连接\x0a\x20\x20-\x20RULE-SET,TikTok,一键连接\x0a\x20\x20-\x20RULE-SET,disney,一键连接\x0a\x20\x20-\x20RULE-SET,Google,一键连接\x0a\x20\x20-\x20RULE-SET,github,一键连接\x0a\x20\x20-\x20RULE-SET,Proxy,一键连接\x0a\x0a\x20\x20#\x20IP规则\x0a\x20\x20-\x20RULE-SET,PrivateIP,直接连接,no-resolve\x0a\x20\x20-\x20RULE-SET,TelegramIP,一键连接,no-resolve\x0a\x20\x20-\x20RULE-SET,ProxyIP,一键连接,no-resolve\x0a\x20\x20-\x20RULE-SET,ChinaIP,直接连接,no-resolve\x0a\x0a\x20\x20#\x20大陆\x20IP\x20兜底直连：覆盖规则集未收录的域名\x20/\x20纯\x20IP\x20连接的大陆应用（GEOIP\x20库覆盖面更全）\x0a\x20\x20-\x20GEOIP,CN,直接连接,no-resolve\x0a\x0a\x20\x20#\x20兜底规则：其余（国外）走一键连接\x0a\x20\x20-\x20MATCH,一键连接\x0a\x0a#\x20====================\x20规则集\x20====================\x0a#\x20规则集行为模板\x0aBehaviorDN:\x20&BehaviorDN\x20{type:\x20http,\x20behavior:\x20domain,\x20format:\x20mrs,\x20interval:\x2086400}\x0aBehaviorDY:\x20&BehaviorDY\x20{type:\x20http,\x20behavior:\x20domain,\x20format:\x20yaml,\x20interval:\x2086400}\x0aBehaviorIP:\x20&BehaviorIP\x20{type:\x20http,\x20behavior:\x20ipcidr,\x20format:\x20mrs,\x20interval:\x2086400}\x0aClassicalYaml:\x20&ClassicalYaml\x20{type:\x20http,\x20behavior:\x20classical,\x20interval:\x203600,\x20format:\x20yaml,\x20proxy:\x20DIRECT}\x0aBehaviorCL:\x20&BehaviorCL\x20{type:\x20http,\x20behavior:\x20classical,\x20interval:\x2086400,\x20format:\x20yaml,\x20proxy:\x20DIRECT}\x20\x20\x20#\x20经典规则集（blackmatrix7\x20等，DOMAIN/DOMAIN-SUFFIX/DOMAIN-KEYWORD/PROCESS-NAME）\x0a\x0a#\x20规则提供者（仅保留常用）\x0arule-providers:\x0a\x20\x20#\x20广告\x0a\x20\x20Tracking:\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Tracking.mrs}\x0a\x20\x20Advertising:\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Advertising.mrs}\x0a\x20\x20AWAvenueAds:\x20\x20\x20\x20{<<:\x20*BehaviorDY,\x20url:\x20https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml}\x0a\x20\x20#\x20直连\x20/\x20国内\x0a\x20\x20Direct:\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Direct.mrs}\x0a\x20\x20Private:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Private.mrs}\x0a\x20\x20Download:\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Download.mrs}\x0a\x20\x20AppleCN:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/AppleCN.mrs}\x0a\x20\x20China:\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorCL,\x20url:\x20https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMaxNoIP/ChinaMaxNoIP_No_Resolve.yaml}\x20\x20\x20#\x20大陆直连全量：ChinaMaxNoIP（11万+\x20域名，含大陆可达国际服务），每日更新\x0a\x20\x20#\x20常用国外服务\x0a\x20\x20AI:\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/AI.mrs}\x0a\x20\x20Telegram:\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Telegram.mrs}\x0a\x20\x20Twitter:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Twitter.mrs}\x0a\x20\x20SocialMedia:\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/SocialMedia.mrs}\x0a\x20\x20Netflix:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Netflix.mrs}\x0a\x20\x20YouTube:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/YouTube.mrs}\x0a\x20\x20Google:\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Google.mrs}\x0a\x20\x20Microsoft:\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorCL,\x20url:\x20https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml}\x20\x20\x20#\x20微软全家桶全量：blackmatrix7（Office/OneDrive/Xbox/Teams/Skype/Bing/Azure\x20等）\x0a\x20\x20Proxy:\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/domain/Proxy.mrs}\x0a\x20\x20#\x20媒体（DustinWin）\x0a\x20\x20Spotify:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/spotify.mrs}\x0a\x20\x20TikTok:\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/tiktok.mrs}\x0a\x20\x20disney:\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorDN,\x20url:\x20https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/disney.mrs}\x0a\x20\x20#\x20GitHub\x0a\x20\x20github:\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*ClassicalYaml,\x20url:\x20https://rule.kelee.one/Clash/GitHub.yaml}\x0a\x20\x20#\x20IP规则\x0a\x20\x20PrivateIP:\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorIP,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/ip/Private.mrs}\x0a\x20\x20TelegramIP:\x20\x20\x20\x20\x20{<<:\x20*BehaviorIP,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/ip/Telegram.mrs}\x0a\x20\x20ProxyIP:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorIP,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/ip/Proxy.mrs}\x0a\x20\x20ChinaIP:\x20\x20\x20\x20\x20\x20\x20\x20{<<:\x20*BehaviorIP,\x20url:\x20https://github.com/666OS/rules/raw/release/mihomo/ip/China.mrs}\x0a\x0a#\x20====================\x20EOF\x20====================\x0a\x0a',a0s=['173.245.48.0/20',a0aw(0x3e2),'103.22.200.0/22','103.31.4.0/22','141.101.64.0/18',a0aw(0x353),'190.93.240.0/20','188.114.96.0/20',a0aw(0x295),a0aw(0x281),'162.158.0.0/15','104.16.0.0/13','104.24.0.0/14','172.64.0.0/13','131.0.72.0/22'],a0d=['2400:cb00::/32','2606:4700::/32',a0aw(0x3a7),a0aw(0x328),'2405:8100::/32',a0aw(0x204),'2c0f:f248::/32'];function a0Q(I,P){const aK=a0P,[f,a]=P['split']('/'),w=parseInt(a,0xa),p=q=>{const aH=a0P,o=q[aH(0x257)]('::');let H;if(o>=0x0){const K=q[aH(0x21c)](0x0,o)[aH(0x1aa)](':')['filter'](Boolean),n=q['slice'](o+0x2)[aH(0x1aa)](':')[aH(0x2be)](Boolean),r=0x8-K[aH(0x1f5)]-n['length'];H=[...K,...Array(r)['fill']('0'),...n];}else H=q[aH(0x1aa)](':');return H['map'](s=>s['padStart'](0x4,'0'));},J=q=>q[aK(0x3ac)](o=>parseInt(o,0x10)['toString'](0x2)['padStart'](0x10,'0'))[aK(0x335)]('');return J(p(I))[aK(0x21c)](0x0,w)===J(p(f))[aK(0x21c)](0x0,w);}function a0l(I){const an=a0P;I=String(I||'');if(!a0I8(I))return![];if(I['indexOf'](':')>=0x0)return a0d['some'](a=>a0Q(I,a));const P=I[an(0x1aa)]('.')['map'](Number),f=(P[0x0]<<0x18|P[0x1]<<0x10|P[0x2]<<0x8|P[0x3])>>>0x0;return a0IP['some'](([a,w])=>f>=a&&f<=w);}const a0U={'HK':'香港','TW':'台湾','MO':'澳门','JP':'日本','SG':a0aw(0x1b8),'US':'美国','KR':'韩国','DE':'德国','FR':'法国','GB':'英国','CA':'加拿大','AU':a0aw(0x20c),'SE':'瑞典','NL':'荷兰','FI':'芬兰','NO':'挪威','DK':'丹麦','CH':'瑞士','IT':'意大利','ES':a0aw(0x3aa),'PT':a0aw(0x2d1),'IE':'爱尔兰','BE':a0aw(0x349),'AT':'奥地利','PL':'波兰','CZ':'捷克','RO':'罗马尼亚','HU':a0aw(0x38c),'GR':'希腊','RU':a0aw(0x1c3),'TR':'土耳其','UA':'乌克兰','IN':'印度','TH':'泰国','MY':a0aw(0x33f),'VN':'越南','PH':'菲律宾','ID':'印尼','BR':'巴西','MX':'墨西哥','AR':'阿根廷','CL':'智利','ZA':'南非','EG':'埃及','AE':a0aw(0x1c6),'IL':'以色列','NZ':a0aw(0x2da),'KZ':'哈萨克斯坦','SA':'沙特'},a0b=0xc,a0y={'HK':a0aw(0x373),'US':'proxyip.us.cmliussss.net','SG':a0aw(0x3b5),'JP':a0aw(0x34a),'KR':a0aw(0x256),'DE':'proxyip.de.cmliussss.net','SE':'proxyip.se.cmliussss.net','NL':'proxyip.nl.cmliussss.net','FI':'proxyip.fi.cmliussss.net','GB':'proxyip.gb.cmliussss.net','Oracle':'proxyip.oracle.cmliussss.net','DigitalOcean':a0aw(0x3a0),'Vultr':'proxyip.vultr.cmliussss.net','Multacom':a0aw(0x282)},a0e={'uuid':['UUID','U'],'path':['PATH','D'],'admin':[a0aw(0x2f0),'admin'],'adminUser':['ADMIN_USER'],'outbound':['OUTBOUND_PROXY','OUTBOUND','S'],'ech':[a0aw(0x374),a0aw(0x1b1)],'trojan':['ENABLE_TROJAN',a0aw(0x370)],'kv':['CONFIG_KV','K']};function a0V(I,P){for(const f of a0e[P])if(I&&I[f]!=null&&String(I[f])!=='')return I[f];return undefined;}function a0W(I){for(const P of a0e['kv'])if(I&&I[P]&&typeof I[P]==='object')return I[P];return null;}const a0g=a0aw(0x2c5),a0B=a0aw(0x243),a0X='^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\x5c.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*$',a0k=[a0aw(0x21b),a0aw(0x35e)],a0v=[{'key':a0aw(0x329),'type':a0aw(0x1c5),'def':'','el':a0aw(0x26f),'label':a0aw(0x34c),'required':!![],'lower':!![],'pattern':a0g,'hint':'UUID\x20格式不正确（应为\x20xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx，可点「生成」）'},{'key':a0aw(0x27a),'type':'string','def':'','el':a0aw(0x2c9),'label':a0aw(0x277),'maxLen':0x80,'strip':['^/+','/+$'],'pattern':a0B,'hint':'只能包含字母、数字及\x20.\x20_\x20~\x20-（不含\x20/）','reserved':a0k,'envLock':a0e[a0aw(0x1d6)]},{'key':a0aw(0x3c7),'type':'string','def':'','el':'a-suburl','label':a0aw(0x309),'maxLen':0x80,'strip':['^/+','/+$','/sub$','/+$'],'pattern':a0B,'hint':'只填一段别名，如\x20AAZ（字母、数字及\x20.\x20_\x20~\x20-）','reserved':a0k},{'key':a0aw(0x1fb),'type':'string','def':'admin','el':'a-adminuser','label':a0aw(0x205),'maxLen':0x40,'fillDefault':!![],'pattern':'^[^\x5cs\x5cx00-\x5cx1f\x5cx7f]+$','hint':a0aw(0x36f),'envLock':a0e['adminUser']},{'key':a0aw(0x391),'type':'secret','def':'','el':a0aw(0x270),'label':'管理密码','trim':![],'maxLen':0x100,'envLock':a0e[a0aw(0x384)],'check':a0aw(0x3a8)},{'key':'hst','type':a0aw(0x1c5),'def':'','el':'a-host','label':'绑定域名','maxLen':0xfd,'strip':[a0aw(0x1dc),'[/?#].*$'],'pattern':a0X,'hint':'请填写域名，如\x20node.example.com'},{'key':a0aw(0x37d),'type':'bool','def':!![],'el':'en-vless','label':a0aw(0x3de)},{'key':'etr','type':'bool','def':![],'el':a0aw(0x1b7),'label':a0aw(0x27f)},{'key':'trp','type':a0aw(0x1c5),'def':'','el':'tp-pass','label':'Trojan\x20密码','trim':![],'maxLen':0x100,'noExport':!![]},{'key':'exh','type':'bool','def':!![],'el':a0aw(0x3b9),'label':a0aw(0x39b)},{'key':a0aw(0x2d3),'type':'string','def':'','el':a0aw(0x31c),'label':'ALPN','maxLen':0x40,'pattern':a0aw(0x22b),'hint':'以逗号分隔，如\x20h2,http/1.1'},{'key':a0aw(0x3e3),'type':a0aw(0x385),'def':![],'el':'ech-on','label':a0aw(0x1b1)},{'key':'ehs','type':'string','def':a0aw(0x25a),'el':a0aw(0x3b0),'label':a0aw(0x305),'fillDefault':!![],'maxLen':0xfd,'strip':['^https?://','[/?#].*$'],'pattern':a0X,'hint':'请填写域名，如\x20cloudflare-ech.com'},{'key':a0aw(0x2c8),'type':'string','def':'','el':'ech-dns','label':'ECH\x20DNS','maxLen':0x200,'pattern':a0aw(0x345),'hint':'须为\x20https://\x20开头的\x20DoH\x20地址'},{'key':a0aw(0x1a5),'type':'bool','def':!![],'el':a0aw(0x1c0),'label':'仅\x20TLS\x20端口'},{'key':'pxy','type':a0aw(0x1c5),'def':'','el':'s-proxyIP','label':a0aw(0x1d2),'maxLen':0x100,'pattern':a0aw(0x37b),'hint':a0aw(0x3a1),'check':a0aw(0x39f)},{'key':'obp','type':'string','def':'','el':a0aw(0x217),'label':a0aw(0x3db),'maxLen':0x400,'pattern':a0aw(0x326),'hint':'出站代理不能包含空格','check':a0aw(0x2ee)},{'key':'obm','type':'enum','def':'','el':a0aw(0x21d),'label':a0aw(0x1e6),'options':['','no','only']},{'key':'pfd','type':a0aw(0x2bf),'def':'','el':a0aw(0x338),'label':'优选域名','maxLen':0x1000,'check':'domainList'},{'key':a0aw(0x2ef),'type':a0aw(0x26e),'def':a0aw(0x1f3),'el':'rl-mode','label':'地区反代模式','options':[a0aw(0x1f3),a0aw(0x2f8),a0aw(0x2ca)]},{'key':'rl.rg','type':a0aw(0x26e),'def':'','el':'rl-region','label':'首选反代地区','options':['',...Object['keys'](a0y)]},{'key':'rl.r2','type':'enum','def':'','el':a0aw(0x2ac),'label':'次选反代地区','options':['','none',...Object[a0aw(0x3d6)](a0y)]},{'key':'rl.cu','type':a0aw(0x2bf),'def':'','el':'rl-custom','label':'自定义反代列表','maxLen':0x400,'check':'relayList'},{'key':a0aw(0x30f),'type':a0aw(0x32a),'def':['all'],'label':'节点地区','options':[a0aw(0x24d),'HK','TW','US','SG','JP','KR','DE'],'exclusive':'all','emptyValue':[a0aw(0x24d)],'els':{'all':'fl-region-all','HK':'fl-region-HK','TW':'fl-region-TW','US':a0aw(0x1f1),'SG':a0aw(0x288),'JP':a0aw(0x330),'KR':a0aw(0x236),'DE':a0aw(0x268)}},{'key':'ft.ip','type':'list','def':[a0aw(0x315)],'label':'IP\x20类型','options':[a0aw(0x315),'IPv6'],'els':{'IPv4':'fl-ip4','IPv6':a0aw(0x2aa)}},{'key':a0aw(0x378),'type':a0aw(0x32a),'def':['移动','联通','电信'],'label':a0aw(0x26c),'options':['移动','联通','电信'],'els':{'移动':a0aw(0x333),'联通':'fl-isp-c','电信':'fl-isp-t'}},{'key':'sc.nv','type':a0aw(0x385),'def':![],'el':a0aw(0x247),'label':a0aw(0x1b4)},{'key':'sc.pd','type':'bool','def':!![],'el':a0aw(0x25e),'label':'优选域名'},{'key':'sc.pi','type':'bool','def':!![],'el':'fl-pref-ip','label':'优选\x20IP'},{'key':a0aw(0x20b),'type':a0aw(0x385),'def':!![],'el':'ps-hostmonit','label':'HostMonit\x20实时优选'},{'key':'ix.uo','type':'bool','def':!![],'el':a0aw(0x3c0),'label':'uouin\x20分线路优选'},{'key':'ix.wt','type':'bool','def':![],'el':a0aw(0x355),'label':'微测网优选'},{'key':'ix.a1','type':'bool','def':![],'el':'ps-api1-on','label':'自定义优选\x20API\x201'},{'key':a0aw(0x1e2),'type':'string','def':'','el':'ps-api1-url','label':'自定义优选\x20API\x201\x20地址','maxLen':0x400,'pattern':'^(https?|sub)://\x5cS+$','hint':a0aw(0x1d3)},{'key':'ix.a2','type':a0aw(0x385),'def':![],'el':a0aw(0x214),'label':'自定义优选\x20API\x202'},{'key':a0aw(0x39e),'type':a0aw(0x1c5),'def':'','el':a0aw(0x203),'label':'自定义优选\x20API\x202\x20地址','maxLen':0x400,'pattern':'^(https?|sub)://\x5cS+$','hint':'须为\x20http(s)://\x20或\x20sub://\x20开头的地址'}];function checkFieldValue(def,v){var t=def.type,i;if(t==='bool'){if(v===true||v==='true'||v==='1'||v===1)return{value:true};if(v===false||v==='false'||v==='0'||v===0)return{value:false};return{error:'必须为开或关'};}if(t==='int'){var n=typeof v==='number'?v:/^\s*-?\d+\s*$/.test(String(v==null?'':v))?parseInt(v,10):NaN;if(!isFinite(n)||Math.floor(n)!==n)return{error:'必须为整数'};if(def.min!=null&&n<def.min||def.max!=null&&n>def.max)return{error:'取值范围为 '+def.min+' - '+def.max};return{value:n};}if(t==='enum'){v=v==null?'':String(v);if(def.options.indexOf(v)<0)return{error:'不支持的选项\uFF1A'+v};return{value:v};}if(t==='list'){if(!Array.isArray(v))v=v==null||v===''?[]:[String(v)];var out=[];for(i=0;i<v.length;i++){var s=String(v[i]);if(def.options.indexOf(s)<0)return{error:'不支持的选项\uFF1A'+s};if(out.indexOf(s)<0)out.push(s);}if(def.exclusive&&out.indexOf(def.exclusive)>=0)out=[def.exclusive];if(!out.length&&def.emptyValue)out=def.emptyValue.slice();return{value:out};}if(t==='string'||t==='secret'||t==='text'){if(v==null)v='';if(typeof v!=='string'&&typeof v!=='number')return{error:'格式不正确'};v=String(v);if(def.trim!==false)v=v.trim();if(def.strip)for(i=0;i<def.strip.length;i++)v=v.replace(new RegExp(def.strip[i],'i'),'');if(def.lower)v=v.toLowerCase();if(!v){if(def.required)return{error:'不能为空'};return{value:def.fillDefault?def.def:''};}if(def.maxLen&&v.length>def.maxLen)return{error:'长度不能超过 '+def.maxLen};if(def.pattern&&!new RegExp(def.pattern).test(v))return{error:def.hint||'格式不正确'};if(def.reserved&&def.reserved.indexOf(v.toLowerCase())>=0)return{error:'\u300C'+v+'\u300D为保留路径\uFF0C请换一个'};return{value:v};}return{value:v};}const a0C=['aes-128-gcm','aes-256-gcm',a0aw(0x1ec)],a0M=/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/,a0L=0x1e,a0z=0x19,a0E=0x3,a0Y={'domainList'(I){const ar=a0P,P=new Set(),f=[];for(const a of String(I||'')[ar(0x1aa)](/[\n,;\s]+/)[ar(0x2be)](Boolean)){const w=a['toLowerCase']();if(!a0M['test'](w)||/^[0-9]+$/['test'](w[ar(0x21c)](w[ar(0x35c)]('.')+0x1)))return'「'+a[ar(0x21c)](0x0,0x3c)+ar(0x28f);!P[ar(0x208)](w)&&(P['add'](w),f[ar(0x38e)](w));}if(f['length']>a0L)return ar(0x2b6)+a0L+ar(0x3c6)+f['length']+'\x20个）';return{'value':f[ar(0x335)]('\x0a')};},'relayList'(I){const as=a0P,P=new Set(),f=[];for(const a of String(I||'')[as(0x1aa)](/[\n,;]+/)['map'](w=>w['trim']())[as(0x2be)](Boolean)){const {host:w,port:p}=a0I7(a,0x1bb),J=w['toLowerCase']();if(!J||!(a0I8(J)||new RegExp(a0X)[as(0x362)](J)))return'「'+a['slice'](0x0,0x3c)+'」不是有效的反代地址（格式\x20host\x20或\x20host:port，IPv6\x20需加方括号）';if(!(p>=0x1&&p<=0xffff))return'「'+a['slice'](0x0,0x3c)+'」的端口须为\x201\x20-\x2065535';const q=(J['indexOf'](':')>=0x0?'['+J+']':J)+(p===0x1bb?'':':'+p);!P['has'](q)&&(P['add'](q),f['push'](q));}if(f[as(0x1f5)]>a0E)return as(0x2b6)+a0E+as(0x22c)+f['length']+as(0x1d7);return{'value':f['join']('\x0a')};},'adminPass'(I){const ad=a0P;if(I&&String(I)['startsWith'](ad(0x2d0)))return ad(0x3e7);},'hostPort'(I){if(!I)return;const {host:P,port:f}=a0I7(I,0x1bb);if(!P)return'缺少主机名';if(!(f>=0x1&&f<=0xffff))return'端口须为\x201\x20-\x2065535';},'proxy'(I){const aQ=a0P;if(!I)return;const P=a0If(I);if(!P||!P[aQ(0x267)])return'无法解析出站代理地址（格式如\x20socks5://user:pass@1.2.3.4:1080）';if(!(P[aQ(0x1b5)]>=0x1&&P[aQ(0x1b5)]<=0xffff))return aQ(0x3ab);if(P[aQ(0x219)]==='ss'){if(!a0IY(P['method']))return'SS\x20加密方式仅支持\x20'+a0C['join'](aQ(0x386));if(!P['password'])return aQ(0x254);}}},a0F=new Map(a0v['map'](I=>[I[a0aw(0x354)],I]));function a0S(I,P){const al=a0P;let f=I;for(const a of P['split']('.')){if(f==null||typeof f!==al(0x2cd))return undefined;f=f[a];}return f;}function a0A(I,P,f){const aU=a0P,a=P['split']('.');let w=I;for(let p=0x0;p<a[aU(0x1f5)]-0x1;p++){if(w[a[p]]==null||typeof w[a[p]]!==aU(0x2cd))w[a[p]]={};w=w[a[p]];}w[a[a['length']-0x1]]=f;}const a0j=I=>I===undefined?undefined:JSON[a0aw(0x3dd)](JSON[a0aw(0x358)](I));function a0R(){const ab=a0P,I={};for(const P of a0v)a0A(I,P[ab(0x354)],a0j(P['def']));return I;}function a0h(I){const P={};for(const f of a0v){const a=a0S(I,f['key']);if(a!==undefined)a0A(P,f['key'],a0j(a));}return P;}function a0x(I){const ay=a0P,P={};for(const f of a0v){if(!f['envLock'])continue;const a=f['envLock']['find'](w=>I&&I[w]!=null&&String(I[w])!=='');if(a)P[f[ay(0x354)]]=a;}return P;}function a0N(I,P){const ae=a0P,f={},a=[],w=[];if(!I||typeof I!==ae(0x2cd)||Array['isArray'](I))return{'patch':f,'errors':[{'field':'','label':'配置','msg':'请求体必须为\x20JSON\x20对象'}],'ignored':w};const p=a0x(P),J=new Set();for(const o of a0v){const H=a0S(I,o[ae(0x354)]);if(H===undefined)continue;J['add'](o['key']);if(p[o['key']]){w[ae(0x38e)](o[ae(0x354)]);continue;}if(o['type']===ae(0x2d5)&&(H===''||H==null))continue;let K=checkFieldValue(o,H);if(!K['error']&&o[ae(0x1cc)]){const n=a0Y[o[ae(0x1cc)]](K[ae(0x350)]);if(typeof n==='string')K={'error':n};else{if(n&&'value'in n)K=n;}}if(K['error'])a['push']({'field':o['key'],'label':o[ae(0x2ff)]||o['key'],'msg':K['error']});else a0A(f,o['key'],K['value']);}const q=(s,Q)=>{const aV=a0P;for(const l of Object[aV(0x3d6)](s)){const U=Q?Q+'.'+l:l;if(J['has'](U)||a0F[aV(0x208)](U))continue;const b=a0v['some'](y=>y[aV(0x354)][aV(0x3b8)](U+'.'));if(b&&s[l]&&typeof s[l]==='object'&&!Array[aV(0x1c1)](s[l]))q(s[l],U);else w['push'](U);}};return q(I,''),{'patch':f,'errors':a,'ignored':w};}function a0D(I){const aW=a0P,P=[];!I[aW(0x37d)]&&!I[aW(0x2d2)]&&!I['exh']&&P['push']({'field':'evl','label':aW(0x2a6),'msg':aW(0x2c7)});I['rl']&&I['rl']['md']==='custom'&&!String(I['rl']['cu']||'')[aW(0x1c2)]()&&P['push']({'field':aW(0x30b),'label':'自定义反代列表','msg':'已选择「仅使用自定义反代」，请至少填写一个反代地址（或改回内置\x20/\x20关闭）'});for(const f of[0x1,0x2]){const a=I['ix']||{};a['a'+f]&&!a['a'+f+'u']&&P[aW(0x38e)]({'field':aW(0x1de)+f+'u','label':'自定义优选\x20API\x20'+f+aW(0x347),'msg':aW(0x2fd)});}return P;}function a0t(){const ag=a0P;return a0v[ag(0x3ac)](I=>{const P=Object['assign']({},I);return delete P['check'],P;});}const a0O=['cloudflare.com','www.cloudflare.com',a0aw(0x2d7)],a0T=[a0aw(0x209),'cdn.2020111.xyz',a0aw(0x220),'cf.090227.xyz',a0aw(0x33d),'cnamefuckxxs.yuchen.icu','cloudflare-ip.mofashi.ltd','cdn.tzpro.xyz','cf.877771.xyz',a0aw(0x28d),a0aw(0x3e5),'cdns.doon.eu.org','fn.130519.xyz',a0aw(0x396)][a0aw(0x335)]('\x0a');function a0m(I){const aB=a0P,P=I&&I['pfd']?String(I[aB(0x38d)])[aB(0x1c2)]():'';return P||a0T;}function a0Z(I){const aX=a0P;return String(I)['split']('\x0a')[aX(0x21c)](0x0,a0z)['join']('\x0a');}const a0c=new Set([0x50,0x1f90,0x22b0,0x804,0x822,0x826,0x82f]),a0u=new TextEncoder(),a0G=new TextDecoder();function a0i(I){const ak=a0P;let P='';const f=0x8000;for(let a=0x0;a<I[ak(0x1f5)];a+=f){P+=String[ak(0x3bf)](...I['subarray'](a,a+f));}return btoa(P);}const a0I0=[0x7,0xc,0x11,0x16,0x7,0xc,0x11,0x16,0x7,0xc,0x11,0x16,0x7,0xc,0x11,0x16,0x5,0x9,0xe,0x14,0x5,0x9,0xe,0x14,0x5,0x9,0xe,0x14,0x5,0x9,0xe,0x14,0x4,0xb,0x10,0x17,0x4,0xb,0x10,0x17,0x4,0xb,0x10,0x17,0x4,0xb,0x10,0x17,0x6,0xa,0xf,0x15,0x6,0xa,0xf,0x15,0x6,0xa,0xf,0x15,0x6,0xa,0xf,0x15],a0I1=[0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x2441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x4881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391];function a0I2(I,P){return(I<<P|I>>>0x20-P)>>>0x0;}function a0I3(I){const av=a0P,P=I['length']*0x8,w=(I['length']+0x8>>0x6)+0x1<<0x6,p=new Uint8Array(w);p[av(0x235)](I),p[I[av(0x1f5)]]=0x80;const J=new DataView(p['buffer']);J[av(0x310)](w-0x8,P>>>0x0,!![]),J['setUint32'](w-0x4,Math['floor'](P/0x100000000),!![]);let q=0x67452301,o=0xefcdab89,H=0x98badcfe,K=0x10325476;for(let s=0x0;s<w;s+=0x40){const Q=new Uint32Array(0x10);for(let V=0x0;V<0x10;V++)Q[V]=J[av(0x3bc)](s+V*0x4,!![]);let l=q,U=o,y=H,e=K;for(let W=0x0;W<0x40;W++){let B,X;if(W<0x10)B=U&y|~U&e,X=W;else{if(W<0x20)B=e&U|~e&y,X=(0x5*W+0x1)%0x10;else W<0x30?(B=U^y^e,X=(0x3*W+0x5)%0x10):(B=y^(U|~e),X=0x7*W%0x10);}const k=l+B+a0I1[W]+Q[X]>>>0x0,v=U+a0I2(k,a0I0[W])>>>0x0;l=e,e=y,y=U,U=v;}q=q+l>>>0x0,o=o+U>>>0x0,H=H+y>>>0x0,K=K+e>>>0x0;}const n=new Uint8Array(0x10),r=new DataView(n[av(0x283)]);return[q,o,H,K][av(0x36c)]((C,L)=>r[av(0x310)](L*0x4,C,!![])),n;}function a0I4(I){const aC=a0P;return Array[aC(0x323)](a0I3(a0u['encode'](String(I))))['map'](P=>P[aC(0x248)](0x10)['padStart'](0x2,'0'))['join']('');}function a0I5(){const aM=a0P;if(crypto[aM(0x265)])return crypto['randomUUID']();const I=crypto[aM(0x258)](new Uint8Array(0x10));return I[0x6]=I[0x6]&0xf|0x40,I[0x8]=I[0x8]&0x3f|0x80,[...I][aM(0x3ac)]((P,f)=>(f===0x4||f===0x6||f===0x8||f===0xa?'-':'')+P[aM(0x248)](0x10)[aM(0x249)](0x2,'0'))[aM(0x335)]('');}function a0I6(I){return/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/['test'](I||'');}function a0I(){const JK=['u1mGquvbrcdOP6pLR4BLPlhOTkxVViJLR4BNOieV5yQG5A+g5PA55BYp5lIo5PYn5yQH5zMO5lIn5yY56ywn77Yj','5PEG5Rov6k+g5yIR55Qe5zYW5z2a57g75z6l','Dg9Rzw4','z2v0v3jPDgvY','Bwf0y2G','ywXWBG','ufjpwfLjua','ChjLzMvYCMvKsvbZ','C3vIC3rY','DhjVAMfU','5O6L5y+J6l+u5zUE77YA','DMXLC3m9','zNjVBq','Ahr0Chm6lY9KB2GUChvIl2rUCY1XDwvYEq','i+woN+EuN+wCSowDGa','xLXtkYq','CxvLCNKTC2vYDMvYlw5HBwu','mJqWntPIntaWoJOVmZi','DwLK','BgLZDa','z2jR','CMvHza','BxnN','Ahr0Chm6lY9HCgKUDw91Aw4Uy29Tl2LUzgv4lNbOCc9PBMrLEc9dBg91zgzSyxjL','DxjSlq','zMWTCMvNAw9UluPq','zgf0yq','q0HjtKfuruXfq09n','zMWTAxnWlw0','Dw5RBM93BG','AM9PBG','veXt','Axb2nG','BY1WCMvMzg9TywLUCW','C2HPzNq','yxbWBgLJyxrPB24VANnVBG','qufbqq','AhjLzG','y2zPCc4XmZiZmtiZlNH5EG','DhvU','6AMS5P2L6kw/5lQA','icaGihvKCdOGDhj1zq','D2v0zxn0lq','zw5JCNLWDa','sg9WBgLUzs5QCW','8j+AGcdOIOlNGRNPGiNMI6K','xMH0DhbZoI8VxfmRja','6kEJ5P6q5yIW55Qe5zYW5z2a6yo95lIn5PIV6l6557Yy5Q61ieLq','iowCSowDGa','x3bHDgHfCNjVCG','5Q+u5yIP5PE2','ChjVEhLPCc5QCc5JBwXPDxnZC3mUBMv0','ChjLzMvYCMvKrg9TywLUCW','vvvjra','icaGihnUAtOG','mJm4u0HqBwDW','y291BNq','DMfSDwu','5PwW5O2U5lIT5B+d','zgvJCNLWDa','mta4lJe2mI4XotiUmc8Xoa','A2v5','ChmTD2v0zxn0','B3v0yM91BMq','D2vIC29JA2v0','C3rYAw5NAwz5','zgvMyxvSDc1ZCMmGj25VBMuNoYbZy3jPChqTC3jJicD1BNnHzMuTAw5SAw5LjYbODhrWCZOVl2nKBI5QC2rLBgL2CI5Uzxq7ihn0EwXLlxnYyYaNDw5ZywzLlwLUBgLUzsC7igLTzY1ZCMmGj3nLBgyNigrHDge6oYbJB25Uzwn0lxnYyYaNC2vSzIC7igjHC2uTDxjPicDUB25LjZSGzM9YBs1Hy3rPB24Gj3nLBgyNoYbMCMfTzs1HBMnLC3rVCNmGj25VBMuN','id0GDMXLC3mSia','zw5XDwv1zq','BgfZDeLUzgv4t2y','icaGicaGEc1WywrKAw5NlwHLywrLCJOG','DMvYC2LVBG','5lYy6ycjsvaTvJyT','lcbWyxnZD29Yzd0','EgH0Dha','DgvZDa','y29Kzq','C2v0q29VA2LL','qu1t','77Yi5lIn5zYO6l6557Yy5Q6177Yj','6z2I5P2/5BEY56Ab55sO77YA6k+35ywi5zYOifDVCMTLCIdNJQ/LOOpLJ5JPH4/KUk3ORR7NVA4Gqurnsu7VViJNRQhNKiBLR4BNOihVViNVViZNHlBLKi7PH43MLRdORR/PL67JGii','yM9VBgvHBG','u3rHDhvZ','Dg9mB3DLCKnHC2u','iYbiB3bSAw5LioIUOUMyHqP0zxn0lxvYBdOGj2H0Dha6lY93D3CUz3n0yxrPyY5JB20Vz2vUzxjHDgvFmJa0jWPWCM94AwvZoGO','zM9YrwfJAa','z2vVC2L0zs1ZCg90Awz5','55sO5OI35zcn5OIw5A+g56cb6zsz6k+V','5lIn6io95yYf5zcR56M65Qc85OIw5O6N5yI25A2x56YM','vfjpsKfo','Aw1WB3j0s2v5','lcb1C2vYBMfTzt0','ChjVEhLPCc5OAY5JBwXPDxnZC3mUBMv0','ru5bqKXfx0vdsa','uhjVEhKTqxv0Ag9YAxPHDgLVBJOGqMfZAwmG','z2v0vwLUDdG','Ec1WywrKAw5NlwTLEq','zNqUAxm','zw50CMLLCW','icaGihHODhrWlw9WDhm6','xLTExhmVxsSK','BgLUzxm','zxzS','x19it1bmsu5fx0fqsv9trunsrvrFxW','vZyT','zxjYB3i','oYbJAgfYC2v0pxv0zI04','oteYntyXzLHiyuzv','Awf0','ywrTAw4','yM9VBa','ic8G','i+wFN+wqJs0','y29UzMLN','ywnJzxb0','C2vSzwn0B3i','5lUf5PsV5OYbifbpu1q','5yYi54Mz5yIP','CgzK','ChvZAa','C3rHDhvZvgv4Da','CgfZCW','ywrW','z2vVC2L0zs1JBG','zwnOlw9WDhm','n1zNwvrjzq','zg9Uzq','C2fHCY5ZAw4UzMfU','zg5ZlwrPCMvJDa','546V5Akd5y+y6yEpifbbveGG55Qe5yc85lIn5Q2J56gU77YA','B2jW','q29UDgvUDc1uExbL','weHuvfaG5y2p6k6U','BwvZC2fNzq','6kEJ5P6q5AsX6lsL','AxGUytj1','Ag9ZDfbVCNq','ChjVEhLPCc5KAwDPDgfSB2nLyw4Uy21SAxvZC3nZlM5LDa','5Qc85BYp5lI6igHVC3qG5OIwigHVC3q6Cg9YDa','u1mG6l+E5O6L6kkR5ywZ6zET','vxbNCMfKzq','Ahr0Chm6lY9KBNmUywXPzg5ZlMnVBs9YzxnVBhzL','C3vI','C29JA3m1','mJGWmZPModaWoJOVmZi','ywrTAw5qyxnZ','sevm','6kw/54+T54Mz','5yE656Uz5lUJ55cg56UV5y+J6Ag75lI6ideGlsa2ntuZnq','BwfW','DxrMltG','5RkH5PYj5z+F5zcn6kEJ5P6q5yIW6l6557Yy5Q61ieLq','mJC0mtuZmePjwgDlDG','zwnOlwHVC3q','lcbTzxrOB2q9BM9UzsWGCgfZC3DVCMq9','BM9Uzq','Ahn0','zxHW','ChjVEhLPCc5ZzY5JBwXPDxnZC3mUBMv0','C29Tzq','DhjVAMfUoI8V','C3rHCNrZv2L0Aa','zw4TEgH0Dha','yxjYyxLcDwzMzxi','BM8TCMvMzxjYzxi','z2v0vwLUDdmY','Ahr0Chm6lY8YmJmUns41lJuVzg5Zlxf1zxj5','ywrK','zNjVBunOyxjdB2rL','ChmTDw91Aw4','Bwv0Ag9K','C3rYzwfTlw9Uzq','lcbVyMzZpxDZCYWGB2jMCY1OB3n0pq','jMv4DhjHpq','ywvZlteYogDJBq','ios4QUwFN+wqJE+8Iow9K+wjJsa','C2j1','t1nb','vu5jq09n','C2LNBG','icaGigvJAc1VChrZoG','Ec1WywrKAw5Nlw1LDgHVza','jNr5Cgu9qq','B25syxC','ywvZlteYoc1Ny20','yxjYyxLIDwzMzxi','lNnYCW','DgLTzw91De1Z','jNr5Cgu9D3m','pcfKB2n0ExbLigH0BwW+pgH0BwW+pgHLywq+pg1LDgeGy2HHCNnLDd0IDxrMltGIpJX0AxrSzt5izwXSBYbxB3jSzdWVDgL0Bgu+pc9OzwfKpJXIB2r5pJXOmt5izwXSBYbxB3jSzcaHpc9Omt48l2jVzhK+pc9ODg1SpG','CMvHzgfIBgu','A2v5CW','DxbKyxrL','AgvHzgvYtgvUz3rO','yNL0zu9MzNnLDa','Dg9Rzw5PC2G','5yE656Uz5lUJ55cg','Dw5KzwzPBMvK','CgfYC2u','vKXfu1mG5y2p6k6U','y2XVC2u','quXqtG','icaGignSAwvUDc1MAw5NzxjWCMLUDdOGy2HYB21L','mtaZlJiXlJi0nc4WlZiY','zwnU','jNr5Cgu9','yMvZDgnMlJaZmdeWms54ExO','yMDW','5A+g56cb5lIn6io95lULigHVCgXPBMuTCgjRzgyYjcdLVidLPlq','z3jHy2u','mJiWndy1mhvfCLPvqG','tw96AwXSys81lJaGkeHVCgXPBMuP','y3vJyW','zg5Z','yMLUyxj5vhLWzq','DgXV','5lYy6ycj5zYW5z2a','AxrLBxm','6ywn572U5A2y5ykO5PQc5lIn5y+V55sO77Ym6k+356In5zco6yEn6k+v','Bg9NB3v0','C3bSAxq','4Poc77Ipiow+RUI9R+ACJEwkOq','p2TLEt0','BM9ZBMLMzG','5PYQ5O6i5P2d77Yi6zYa6kAb566H55cg5A+g56cb77Yj','C2LUzY1IB3GG5A6y5PA55yAf5Qc45lIn5PsV5OYbifHivfrq77Ym5RkH5PYj5y+V55sO6iQc54k577YA6k+35zcm5PE25zcV55sOifzmrvntioAiLIbuCM9Qyw4G5y2p6k6U','yxv0Aa','runi','zxHO','zxzLCNK','5y6F55sF5zYW5z2a','Cg9YDa','ywrKCG','zw4TDhjVAMfU','5PAW5yQG5z2H','zgvMyxvSDa','6k6I6zIf55sF5OIq5AsX6lsLoIa','BMv4Da','vKXfu1mG5As06yoO6l+h55+T','yxbWBgLJyxrPB24Vzg5ZlwPZB24','zw5JB2rL','5zYW5z2a5PEG5Pwi','DgXZlw9UBhK','AxnbCNjHEq','DhjPBq','5l+e572x5PAV','C3vIDgXL','C3rYAw5N','6zI/6igu6ywl','Ag9WBgLUzs1HDxrOFa','icaGicaGCgf0AdOG','5PYQ55+L5P2L5RQq77YA','5RkH5PYj5y+V55sO5lQoifn1CMzIB2fYzcdNMOqGvhjVAMfUifrmuYdOIOlNGRNVViJMMi7MLOFNQ6/LJ6pOIOlNGRNLT7lOOQVOV4FMU6tVViK','Dgv4Dc95yw1S','y2HLy2S','8j+qNYdMVi/NVzhKUyVPSBW','yNL0zuXLBMD0Aa','BM9UDgXZ','44cn5lI65l+D55wz6lEV5B6e77Ym6k+35O2I5lIa5lIQ','rgrSvhH0tJbZvu91','5y+n5lUJic8G6jc95zYWieLq','6Ag75lI6igH0DhaOCYK6lY8G5OIwihn1yJOVlYdLVidLPltNMOtLNldLNya','zwHZ','DxnLCM5HBwu','Cgf0Aa','ios4QU+8Iq','zMXHDe1HCa','vvvjrcdKUi3LJlNPHy0','rfvt','icaTig5HBwu6ia','xMH0DhbZpZOVlW','C2v0vwLUDde2','AxGUyq','CMvWzwf0','EfbHzgrPBMDlzxK','ywvZlti1nI1Ny20','AxGUytf1','y29TBwfUza','6k+35Rgc5AsX6lsL5OIw6lAf5PE2','z2v0uMvHzgvY','5yE656Uz5PA55BYp','CMvQzwn0','C3vYzMjVyxjK','nZmYC0TSv0PZ','5PYQ57Ur5A6AieTwiowrVEwqJEEPUUMxTo+8IowpMoMhJ+wqJsbdt05gsuDFs1BVViNVViZML6dMS5xKV53LRzJPNAlMNB/PHy3NVA7VVjVOR7FLNkGGv29YA2vYioIUVUE9RUs4REE7KEwUMIblvIdLKi7PH43OR5u','C3mTC3vIA2v5','y2HHy2HHmJaTAwv0zI1WB2X5mtmWnq','wc1dB250zw50lvr5CguTt3b0Aw9UCW','lYPase9qteLorv9ivfrqx1bpuLrtqcOVBNvSBa','lcb3CY1OzwfKzxjZpuHVC3q6','mtCYlJe5lJaUms8Zma','zMWTCMvNAw9Ulvvt','icaGihnLCNzLCJOG','yNvPBhrPBG','tw96AwXSys81lJa','BgvUz3rO','5BcD6k+v5QYH5PwW6l+h5AsA77Ym6k+3ide1iowiHUMsN+wqJUwgJEIVLq','q29VA2LL','tvvd','C2vHBa','vfjpsKfox1bbu1nxt1je','ywr1','uejlreyY','u09ds1m1ioApOEAjI+wKSEI0Pq','Dg9vChbLCKnHC2u','lYPase9qteLorv9tq0HftufakI9UDwXS','AurLDgTpExm','BMv0D29YAW','C3rHDhvZ','ChmTyxbPmI11CMW','mMeWnJO5ogmWoJOVmJK','566H55cg55sO5OI35zcn','CMvWBgfJzq','5Qoa5Rwl5AsX6lsLoIa','AgfZ','y2XVDwrMBgfYzs4Xodi2odiUEhL6','u1mG5yE656Uz57Y65Bcr5A+g56cb','AxGUAg0','5R6Z5AsN5yIP5lQA','D3jPDgu','p25HBwu9','y3vYCMvUDa','y29SBW','Dw5HDMfPBgfIBgu','u0Hblti1nG','u2v0lunVB2TPzq','ChmTyxbPmI1VBG','oJOVnJq','vKXfu1mG5y2p6k6U5PYQ5zcV55sO','CY1VDxrIB3vUza','tM90iezVDw5K','DhLWzq','8j+mJsdLM73LPjBLQPlKVzm','Bg9NAw4','C2XPy2u','CY1VDxrTB2rL','id0G','5PYQ57Ur5A6AieTwiowrVEwqJEEPUUMxTo+8JoAxOoMCGoMhJEE9RG','y2yUmhnTlMnVBq','yxbP','vhjVAMfUiowKToMdQoI/H+EFRq','C2vJlxDLyNnVy2TLDc1WCM90B2nVBa','BM8TC3rVCMu','5lYy6ycj5z+F5zcnlq','jNbHDgG9','u09ds1m1ios4JEAuR+AmGEEAHoIUPoIVGEAwUEAZLsa','sg9ZDa','8j+oRYdLHAJNKipNM7tOV54','zMLSBa','xLTblvPHlxOWltKUlY1DkYHCCYOSxhmQw0eTwMeTEJaTos4Vlv0RksOK','ios4QUIhQUwUMUs5IEwpJEs7O++8Iow9K+wjJsa','Chv0','5zon5BQu5lIT5RkH5PYj6l6557Yy5Q61ieLq','EgH0DhaTB3b0CW','z2v0','u3vYz2u','CMvZB2X2zq','lcbVyMzZpq','u2vJlvDLyLnVy2TLDc1qCM90B2nVBa','C2v0','zMWTCMvNAw9UluTs','CMvSzwfZzuXVy2S','Ahr0Cc8XlJe','zg9TywLU','8j+KLIbpCgvUquK','jtiZ','BNvTyMvY','lcb3CZ10CNvLlcb3CY1WyxrOpq','zgvSzxrL','se1bqW','y2XHC2G','C3rHC2G','yMLUyxj5','xLTblvPHlxOWltKUx34TxsSK','icaGihrSCZOGDhj1zq','otm0nJDXCfDOvKS','u09ds1m1ioACJEwkOEwzQoIMGEAXGUIUPoIVGEs9HUACQUApKos+M+whREAnRG','zMWTBMf0AxzL','Dg9tDhjPBMC','CgfKu3rHCNq','5PU05PAW5PE26zE0','5Pon5l2C6lAf5PE2','D3jPDgfIBgu','ywXS','CgfZC3DVCMq','8j+nJIdOI7NMNPZMNi3LIQe','iYfnqu5br0velunptKzjrWPBr2vUzxjHBf0kBg9NBgv2zwWGpsbUB3rPzNKkzg5ZlxnLCNzLCIa9idiYmY41lJuUnsWGmte5lJi5lJi5lJi5cGPBuhjVEhLDcG','DgfN','lcbPBwCTDxjSpwH0DhbZoI8VzMfZDgX5lMPZzgvSAxzYlM5LDc9NAc9lB29SC29Ul1f1CMvaBwfZDgvYl0LJB25tzxqVq29SB3iVuhjVEhKUCg5NcNn0yxrPyZ3WN4YqiowfQoEqG+EBToI/NIWGzgLYzwn0lcbPBwCTDxjSpwH0DhbZoI8VzMfZDgX5lMPZzgvSAxzYlM5LDc9NAc9lB29SC29Ul1f1CMvaBwfZDgvYl0LJB25tzxqVq29SB3iVrgLYzwn0lNbUzWPZDgf0Awm98j+qNYdMVi/NVzhKUyVPSBWSipcFMOaG6iQc54k56ycj5OUPlcbKAxjLy3qSigLTzY11CMW9Ahr0Chm6lY9Myxn0BhKUANnKzwXPDNiUBMv0l2DOl0TVB2XZB24VuxvYzubTyxn0zxiVswnVBLnLDc9dB2XVCI9gAw5HBc5WBMCkw2zPBhrLCL9SB2nHBf0kz2vVAxaSignUlcdWN4YqiowfQoEqG+EBToI/NGPMAw5HBcWG8j+qNYdMVi/NVzhKUyVPSBWk','5y+Q6io95yYf5zcR5A2x5Q+n44cb5PwW5A2x5y+kic4GxYb+ic3VViJKUi3LKkSGl++8IE+8JoACGoMvVYaXmJGG5l2n','u1mG57Y65Bcr5A+g56cb','u3vYzMjVyxjKiowpQUAuR+AmGsbuCM9Qyw4G6iQc54k577YA6k+35ywi5zYO44cm6iQc54k56ywn572U44cn5lIT5zcV55sOifrYB2PHBIdLJy/ORQ4','ChjVEhLPCc5RCI5JBwXPDxnZC3mUBMv0','Aw5KzxHpzG','z2v0uMfUzg9TvMfSDwvZ','lcbVyMzZlxvYAt0','y2XVDwrMBgfYzs1Ly2GUy29T','57Q/6lEV5zcn56EW','svb2nG','yxbWBgLJyxrPB24VANnVBJSGy2HHCNnLDd11DgyToa','zMWTChjLzI1KB21HAw4','Aw5MBW','DgHLBG','oI8V','zNjLC2G','AxnWCW','D3mTB3b0CW','CMfUzg9Tvvvjra','z2v0vwLUDde2','Ag9ZDa','zMWTCMvNAw9Ulurf','qw5ZD2vY','BMfTzq','CMvKAxjLy3q','6l+q6jcL5zwg5ygp5Aw9','DMXLC3m','zw51Bq','ys11DwLK','ys1Hzg1PBG','Ahr0Chm6lY9JBg91zgzSyxjLlwrUCY5JB20Vzg5Zlxf1zxj5','u0Lo','x3bYzwfTyMXL','cGPBuhjVEhKGr3jVDxbDcVcFMOaG6iQc54k56ycj5OUPid0GC2vSzwn0lca','A2v5tgvU','EgH0DhaG5lUJ55cg6zsz6k+VoIa','6z2I5P2/6lEV5B6e','p2vKptiWndG','q0Hbq0HbmJaTue9mwteZmdu','ChrO','z2vVC2L0zs1VCgvUywK','lYPase9qteLorv9dsevds0aQl251BgW','zgLYzwn0','sefn','vhjVAMfUiownJ+IURG','zMXVB3i','mtK4lJqXlJeYoc4WlZe3','ChjVEhLPCc5TDwX0ywnVBs5JBwXPDxnZC3mUBMv0','yNvMzMvY','yxbPmq','Ahr0Chm','ntqWody0C2zVyxrU','BwLU','zMWTCMvNAw9Ulvnh','C2HHzg93CM9JA2v0','Bwf4','zwnO','DgXZ','Eg4Tlwi2z2fJlMv1lM9YzW','AgfZvxbKyxrL','44cn5lIn5PIV5PYj5Pwi55Qe5z+F5zcn77YA5y+Q5AgR5lI75PY65zcn77Yi5AAcignMlMv4yw1WBguUy29T77Yj77Ym5lIn5zcRigH0Dha6lY/JGihNQ6/LJ6pJGihOT6/LVOtMIjBPGjRPHy3NRkBVViXjucdLNldLNydKUi3OG73KVzZKUlRKVjJPGiNLN5/LKi0','nZbJBg91zgzSyxjLyxbPA2v5','kf58w15blvPDkq','5O+H5OMl5As06lAf6l+hidy0s0i','q09otKvdvca','BM93','mtK3lJiZnc4YndaUmc8YmG','D3nZ','zMXHDa','zMLUzeLUzgv4','sg9WBgLUzsdLSjRMNkRLROZMIjdPHy3NVA7VVjROR7FLNkGGv29YA2vYioEoR+wIG+wpMoMhJ+s4REIUVUE9RIbqqvri77Yi6z2I5P2/44cb6k6I6zIf5lIo6iQc54k55ywX55sO55Qe6k6/6zEU6lEV5B6e77Ym5AAcig15CgfUzwZVViNLKOWGqurnsu7VViJNRQhNKiBLR4BNOihVViNVViZNHlBLKi7PH43MLRdORR/PL67JGilKU47ML6FNIyJLJyFNUQFML7BVVjRML6FNIyJNMOtPU5JORQtOT6/LVOtLSlhMMk8Gvvvjro+8JoAkIIbqqvriioIUVUs4UUwoN+ADPEEAHcbvvuLe77Yi5OIw5lMl5yMn55sOieqG6k6+572U55Qe6lEV5B6e77Yj5y2Z5y+V5l+D5OYb6iQc54k55lIo6k6I6zIf5zYW5z2a5lIn5y+y44cc','zgvJB2rL','z2vVC2L0zs1JyxrLz29YEs1HzhmTywXS','ue9tva','BwL4zwqTAw4','BgLUzq','Ag9ZDg5HBwu','C2vX','lcbVDMvYlxrSCZ10CNvLlcb0BhmTAg9ZDd0','5lYy6ycjsvaT','DJr2nG','jNr5Cgu9EgH0DhaMBw9Kzt1ZDhjLyw0TB25L','ouXOr3bRCq','5y2p6k6U5BYa5ywZ','zg5ZlwzHA2vPCa','6l+E5O6L6lAf5PE277Yiu1LoioIIQ+MDMEM7Mos4OUw8G++8Iq','zhjVChbLza','zMWTAxa2','icaGig5LDhDVCMS6ia','CMWTCMvNAw9UmG','5BEY6yEn572U77YAs1yG5BEY5RIf56M677Ym6z2I5P2/6l+y5y6F5lI65yID5AEl6yoO572Y54Q25Ocb','C2LUz2jVEa','AgLQywnRlwrUCW','icaGicaGicbiB3n0oIa','EfbHzgrPBMDqBgfJzw1LBNq','icaGicaGzw5HyMXLoIa','Bgf0zxn0','DhjVAMfUpq','lcb0Bhm9Dhj1zsWGC2TPCc1Jzxj0lxzLCMLMEt1MywXZzsWGC25Ppq','5PYa5AsAia','DxnLCG','zgvYAxzLqML0CW','Bw96AwXSyq','y2f0y2G','C2LNBMfS','5lUf5PsV5OYbieDfvcaVifbpu1q','C29YDa','zMLSDgvY','Dgv4Da','C2vYDMvYBMfTzq','nhvjBvfNwG','CMvNAw9UCW','mZaWotu2ohvhyLjNrG','Ahr0Chm6lY9Jzg4UANnKzwXPDNiUBMv0l2DOl01LDgfdDwjLwc9TzxrHlxj1BgvZlwrHDebZAw5Nl2DLBY8','xLSWltLHlwzbluzDEZH9lvSWltLHlwzbluzDEZr9lvSWltLHlwzbluzDEZr9lvSWltLHlwzbluzDEZr9lvSWltLHlwzbluzDEZeYFsq','B3bLBG','6iEZ5Bcr5zcV55sO5lIa56En5y2p6k6U77Ym5zcM5yIz6k6I6zIf5lIT5RkH5PYj5lU75l2v6iQc54k5','zwrU','ys1WyxrO','B2zM','B25SEq','x3v1AwrvBNnHDMvK','B2jQzwn0','Dw91Aw4','y2vSBhm','Ag9WBgLUzs1WyMTKzJiK','6jgH6jce54Mz','zxrY','yxbU','lcb0Bhm9zMfSC2u','C2vJCMv0','Ahr0Ca','C3bLzwqUy2XVDwrMBgfYzs5JB20','CMf3','DxvPza','5PAW6kw/5ywW','C3vIyxjYyxK','Dgv4Dc9ODg1SoYbJAgfYC2v0pxv0zI04','6k+35ywi5AgR5yAziefqssdLNldLNya','EfbHzgrPBMDizwfKzxi','z2vVC2L0zs15B3v0DwjL','AgvHzgvYCW','nde0mvPTBhrkvq','svdLNldLNya','jtng','Ag9ZDg1VBML0','phrY','Ahr0Chm6lY93D3CUD2v0zxn0lNzPCc9WywDLl2nSB3vKzMXHCMuVywrKCMvZC192nc5ODg1S','AxbZ','icaGihr5Cgu6ia','yxnZAwDU','zw52tg9JA2vK','Ahr0Chm6lY8','suno','y2HHCKnVzgvbDa','ChjVEhK','CMWUBwq','qurnsu4','yM9KEq','icaGicaGEc1WywrKAw5NlwTLEtOG','CMfJzq','CMvZzxq','cVcFJjaG5ywO55cd55U06l+Eid0GC2vSzwn0lcbesvjfq1qk8j+qNYdMVi/NVzhKUyVPSBWGpsbZzwXLy3qSipcFMOaG6iQc54k56ycj5OUPcGPBuNvSzv0kr0vpsvaSq04SreLsrunucKzjtKfmlpcFKj8G5RYp572r5lMl6Bg8cG','x2T2rxjYB3i','lcb0ywC9','y3vZDg9T','l21HAw4V','w2DLBMvYywXDcM5LDhDVCMTFy2HLy2TFDxjSpwH0Dha6lY93D3CUz3n0yxrPyY5JB20Vz2vUzxjHDgvFmJa0cNnLCNzLCL9JAgvJA191CMW9Ahr0CdOVl3D3DY5NC3rHDgLJlMnVBs9Nzw5LCMf0zv8Ymdqkzg5Zx2v4y2X1C2LVBL9SAxn0psOUy21WyxnZCg9YDc5JB20SicOUCxeUy29TlcaQlNDLAwjVlMnVBsWGkI5Py2XVDwqUy29TcLTKBNnDcNnLCNzLCJ0YmJmUns41lJukC2vYDMvYpteXos4Yos4Yos4YoqPBC2vYDMvYx2XVy2fSxqO','jNnLy3vYAxr5pw5VBMu','zNvUy3rPB24','5BEY5BYa5zcV6k+L5P2L5RQq77Ym6k+35AgR5yAziefqssdLNldLNydVViJMIjBLHBpPL63LVidLHBpVViK','DMfSDwvZ','BgfIzwW','B2jT','C2vYDMvY','Aw5JBhvKzxm','jNr5Cgu9D3mMCgf0Ad0','5lIl6l296ycF5BQM','runiiowFN+wqJq','Ag9WBgLUzv9HDxrOpq','icaGihbHC3n3B3jKoIa','AgvKz2vnCW','6iEQ5A6A5lMj6k6I6zIf6lEV5B6e','weHuvfaG5lUf5PsV5OYbifrducdLKB3KU6q','CMWUy3u','C2vHCMnOugfYyw1Z','zMLUza','ANnVBG','zNqUCMC','C2v0vwLUDdmY','Dgv4Dc9WBgfPBG','Ahr0CdOVlW','zMfRzwLW','Dgv4Dc9WBgfPBJSGy2HHCNnLDd11DgyToa','svb2na','zg9TywLUCW'];a0I=function(){return JK;};return a0I();}function a0I7(I,P=0x1bb){const aL=a0P;I=String(I||'')['trim']();if(!I)return{'host':'','port':P};if(I['startsWith']('[')){const a=I['match'](/^\[([^\]]+)\](?::(\d+))?$/);return{'host':a?a[0x1]:I[aL(0x206)](/^\[|\]$/g,''),'port':a&&a[0x2]?parseInt(a[0x2]):P};}const f=I[aL(0x35c)](':');if(f>0x0&&/^\d+$/[aL(0x362)](I['slice'](f+0x1)))return{'host':I[aL(0x21c)](0x0,f),'port':parseInt(I[aL(0x21c)](f+0x1))};return{'host':I,'port':P};}function a0I8(I){const az=a0P;I=String(I||'')[az(0x1c2)]();if(!I)return![];const P=I['match'](/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(P)return P[az(0x21c)](0x1)[az(0x1b3)](w=>Number(w)<=0xff);if(!/^[0-9a-fA-F:]+$/[az(0x362)](I))return![];if((I[az(0x31b)](/::/g)||[])['length']>0x1)return![];const f=I['includes']('::'),a=I[az(0x206)](/::/g,':')[az(0x1aa)](':')[az(0x2be)](Boolean);if(!f&&a['length']!==0x8)return![];if(f&&(a['length']<0x1||a['length']>0x7))return![];return a[az(0x1b3)](w=>/^[0-9a-fA-F]{1,4}$/['test'](w));}function a0I9(I){const aE=a0P,P=[];for(let J=0x0;J<0x10;J+=0x2)P[aE(0x38e)]((I[J]<<0x8|I[J+0x1])['toString'](0x10));let f=-0x1,a=0x0,w=-0x1,p=0x0;for(let q=0x0;q<0x8;q++){if(P[q]==='0'){if(w<0x0)w=q,p=0x1;else p++;p>a&&(a=p,f=w);}else w=-0x1,p=0x0;}if(a>=0x2){const o=P[aE(0x21c)](0x0,f)[aE(0x335)](':'),H=P[aE(0x21c)](f+a)[aE(0x335)](':');return(o?o+'::':'::')+H;}return P[aE(0x335)](':');}function a0II(I){const aY=a0P,[P,f]=I[aY(0x1aa)]('/'),a=P['split']('.')[aY(0x3ac)](Number),w=(a[0x0]<<0x18|a[0x1]<<0x10|a[0x2]<<0x8|a[0x3])>>>0x0,p=f>=0x20?0x0:0xffffffff<<0x20-f>>>0x0,J=(w&p)>>>0x0,q=(w|~p>>>0x0)>>>0x0;return[J,q];}const a0IP=a0s['map'](a0II);function a0If(I){const aF=a0P;if(!I)return null;let P=aF(0x3a6),f=String(I)[aF(0x1c2)]();const a=f[aF(0x31b)](/^(socks5|http|https|ss):\/\/(.+)$/i);a&&(P=a[0x1][aF(0x36a)](),f=a[0x2]);if(P==='ss')return a0Ia(f);let w='',p='';if(f[aF(0x302)]('@')){const H=f['lastIndexOf']('@'),K=f['slice'](0x0,H),n=f['slice'](H+0x1),r=d=>{try{return decodeURIComponent(d);}catch(Q){return d;}},s=K['indexOf'](':');if(s>=0x0)w=r(K['slice'](0x0,s)),p=r(K['slice'](s+0x1));else w=r(K);f=n;}const J=P===aF(0x2d6)?0x50:P==='https'?0x1bb:0x438,{host:q,port:o}=a0I7(f,J);return{'type':P,'host':q,'port':o,'user':w,'pass':p};}function a0Ia(I){const aS=a0P;let P=I,f='';const a=I['indexOf']('#');if(a>=0x0)P=I[aS(0x21c)](0x0,a);const w=P[aS(0x35c)]('@');if(w>=0x0)f=P[aS(0x21c)](0x0,w),P=P['slice'](w+0x1);else{const H=a0Iw(P);if(H&&H[aS(0x302)]('@')){const K=H['lastIndexOf']('@');f=H['slice'](0x0,K),P=H[aS(0x21c)](K+0x1);}}let p='',J='';if(f){let n=a0Iw(f)||f;try{n=decodeURIComponent(n);}catch(s){}const r=n['indexOf'](':');if(r>0x0)p=n['slice'](0x0,r),J=n[aS(0x21c)](r+0x1);else p=n;}const {host:q,port:o}=a0I7(P,0x20c4);return{'type':'ss','host':q,'port':o,'method':p,'password':J};}function a0Iw(I){const aA=a0P;try{const P=atob(String(I)['replace'](/-/g,'+')[aA(0x206)](/_/g,'/')),f=new Uint8Array(P[aA(0x1f5)]);for(let a=0x0;a<P['length'];a++)f[a]=P[aA(0x2ed)](a);return new TextDecoder(aA(0x3ad))['decode'](f);}catch(w){return null;}}function a0Ip(I,P,f){const aj=a0P;return new Response(JSON['stringify'](I),{'status':P||0xc8,'headers':Object[aj(0x2e9)]({'Content-Type':aj(0x25d)},f||{})});}async function a0IJ(I){const aR=a0P;let P=null,f='';const a=a0W(I);if(a&&typeof a['get']==='function')try{const p=await a['get']('config',{'cacheTtl':0x1e});if(p)try{P=JSON['parse'](p);if(!P||typeof P!==aR(0x2cd))throw new SyntaxError('not\x20an\x20object');}catch(J){P=null,f='corrupt';}}catch(q){f=aR(0x211);}const w=a0In(I,P);if(f)w['_kvError']=f;if(!w['uid']&&!f)await a0IH(I,P,w);return w;}function a0Iq(I){const ah=a0P,P=String(a0V(I,ah(0x2d9))||'')['toLowerCase']();return a0I6(P)?P:'';}const a0Io=new WeakMap();async function a0IH(I,P,f){const ax=a0P,a=a0W(I);if(!a||typeof a[ax(0x22d)]!=='function'){f[ax(0x2cc)]=!![];return;}let w=a0Io['get'](a);if(!w){w=a0I5();try{await a[ax(0x22d)]('config',JSON[ax(0x358)](Object['assign']({},P||{},{'uid':w})));}catch(p){f['_kvError']=ax(0x211);return;}a0Io[ax(0x235)](a,w);}f['uid']=w;}function a0IK(I){const aN=a0P,P=String(I==null?'':I)['trim']()[aN(0x206)](/^\/+/,'')['replace'](/\/+$/,'');if(!P)return{'value':'','error':''};if(!new RegExp(a0B)[aN(0x362)](P)||P['length']>0x80)return{'value':'','error':aN(0x253)};if(a0k[aN(0x257)](P['toLowerCase']())>=0x0)return{'value':'','error':'「'+P+aN(0x1d0)};return{'value':P,'error':''};}function a0In(I,P){const aD=a0P,f=a0R(),a=J=>J===!![]||J==='true'||J==='1'||J===0x1;if(a0V(I,'uuid'))f[aD(0x329)]=String(a0V(I,aD(0x2d9)))['toLowerCase']();if(I['HOST'])f['hst']=String(I['HOST'])['replace'](/^https?:\/\//,'')['split']('/')[0x0];if(I[aD(0x31d)])f['pxy']=String(I['PROXYIP']);if(a0V(I,aD(0x356)))f[aD(0x399)]=String(a0V(I,aD(0x356)));if(a(a0V(I,aD(0x28b))))f['ecn']=!![];if(a(a0V(I,aD(0x320))))f['etr']=!![];if(I[aD(0x1fa)])f['trp']=String(I['TROJAN_PASSWORD']);if(I[aD(0x3e0)])f[aD(0x2d3)]=String(I['ALPN']);if(P&&typeof P==='object')for(const J of a0v){const q=a0S(P,J[aD(0x354)]);if(q!==undefined)a0A(f,J['key'],a0j(q));}const w=a0x(I);for(const o of Object[aD(0x3d6)](w)){const H=a0F['get'](o);let K=String(I[w[o]]);if(H['lower'])K=K['toLowerCase']();a0A(f,o,K);}f[aD(0x329)]=String(f[aD(0x329)]||'')[aD(0x36a)]();if(!a0I6(f['uid']))f['uid']=a0Iq(I);const p=a0IK(w['pth']?I[w['pth']]:'');f['pth']=p['value'];if(p[aD(0x380)])f['_pathError']=p['error'];return f;}async function a0Ir(I,P){const at=a0P,f=a0W(I);if(!f||typeof f[at(0x22d)]!==at(0x2fc))return null;const a=a0h(P),w=a0In(I,null),p=a0R();for(const J of a0v){const q=a0S(w,J['key']);if(JSON[at(0x358)](q)===JSON[at(0x358)](a0S(p,J[at(0x354)])))continue;if(JSON['stringify'](a0S(a,J['key']))!==JSON[at(0x358)](q))continue;const o=J[at(0x354)]['split']('.'),H=o[at(0x1f5)]>0x1?a0S(a,o['slice'](0x0,-0x1)['join']('.')):a;if(H)delete H[o[o[at(0x1f5)]-0x1]];}for(const K of Object[at(0x3d6)](a0x(I))){const n=K['split']('.'),r=n['length']>0x1?a0S(a,n[at(0x21c)](0x0,-0x1)[at(0x335)]('.')):a;if(r)delete r[n[n['length']-0x1]];}return await f['put'](at(0x388),JSON['stringify'](a)),a;}function a0Is(I,P,f,a){const aO=a0P,w=p=>{if(f+p>I['byteLength'])throw new Error('VLESS\x20头部过短');};if(a===0x1)return w(0x4),{'addr':P[aO(0x376)](f)+'.'+P['getUint8'](f+0x1)+'.'+P[aO(0x376)](f+0x2)+'.'+P['getUint8'](f+0x3),'len':0x4};if(a===0x2){w(0x1);const p=P['getUint8'](f);w(0x1+p);const J=I['subarray'](f+0x1,f+0x1+p);return{'addr':a0G['decode'](J),'len':0x1+p};}if(a===0x3){w(0x10);const q=I[aO(0x2db)](f,f+0x10);return{'addr':a0I9(q),'len':0x10};}throw new Error(aO(0x318));}let a0Id={'s':null,'b':null};function a0IQ(I){const aT=a0P,P=String(I||'');if(a0Id['s']===P)return a0Id['b'];const f=P['replace'](/-/g,'')[aT(0x36a)]();if(!/^[0-9a-f]{32}$/['test'](f))throw new Error('服务端\x20UUID\x20配置无效');const a=new Uint8Array(0x10);for(let w=0x0;w<0x10;w++)a[w]=parseInt(f[aT(0x31f)](w*0x2,0x2),0x10);return a0Id={'s':P,'b':a},a;}function a0P(I,P){I=I-0x19f;const f=a0I();let a=f[I];if(a0P['FbAKZi']===undefined){var w=function(q){const o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let H='',K='';for(let n=0x0,r,s,d=0x0;s=q['charAt'](d++);~s&&(r=n%0x4?r*0x40+s:s,n++%0x4)?H+=String['fromCharCode'](0xff&r>>(-0x2*n&0x6)):0x0){s=o['indexOf'](s);}for(let Q=0x0,l=H['length'];Q<l;Q++){K+='%'+('00'+H['charCodeAt'](Q)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(K);};a0P['FTZROM']=w,a0P['DczmNF']={},a0P['FbAKZi']=!![];}const p=f[0x0];a0P['nwDdmo']!==p&&(a0P['DczmNF']={},a0P['nwDdmo']=p);const J=a0P['DczmNF'][I];return J===undefined?(a=a0P['FTZROM'](a),a0P['DczmNF'][I]=a):a=J,a;}function a0Il(I,P){const am=a0P;if(!I||I[am(0x1ce)]<0x1)throw new Error(am(0x1bc));const f=new DataView(I[am(0x283)],I[am(0x3d9)],I['byteLength']);let a=0x0;if(f['getUint8'](0x0)!==0x0)throw new Error('不支持的\x20VLESS\x20版本');if(I[am(0x1ce)]<0x11)throw new Error(am(0x1bc));const w=a0IQ(P&&P[am(0x329)]);let p=0x0;for(let r=0x0;r<0x10;r++)p|=f[am(0x376)](0x1+r)^w[r];if(p!==0x0)throw new Error(am(0x1d9));a+=0x1+0x10;if(a>=I['byteLength'])throw new Error('VLESS\x20头部过短');const J=f['getUint8'](a);a+=0x1,a+=J;if(a+0x4>I[am(0x1ce)])throw new Error(am(0x1bc));const q=f['getUint8'](a);a+=0x1;const o=f['getUint16'](a);a+=0x2;const H=f[am(0x376)](a);a+=0x1;const {addr:K,len:n}=a0Is(I,f,a,H);return a+=n,{'command':q,'port':o,'addr':K,'headerLength':a,'earlyData':I['subarray'](a)};}function a0IU(I){const aZ=a0P;if(!I||I['byteLength']<0x3a+0x8)throw new Error(aZ(0x222));const P=new DataView(I[aZ(0x283)],I[aZ(0x3d9)],I[aZ(0x1ce)]);let f=0x3a;const a=P[aZ(0x376)](f);f+=0x1;const w=P[aZ(0x376)](f);f+=0x1;let p,J;const q=H=>{const ac=a0P;if(f+H>I['byteLength'])throw new Error(ac(0x222));};if(w===0x1)q(0x4),p=P['getUint8'](f)+'.'+P[aZ(0x376)](f+0x1)+'.'+P['getUint8'](f+0x2)+'.'+P['getUint8'](f+0x3),J=0x4;else{if(w===0x3){q(0x1);const H=P['getUint8'](f);q(0x1+H),p=a0G[aZ(0x29a)](I['subarray'](f+0x1,f+0x1+H)),J=0x1+H;}else{if(w===0x4)q(0x10),p=a0I9(I['subarray'](f,f+0x10)),J=0x10;else throw new Error(aZ(0x318));}}f+=J,q(0x4);const o=P['getUint16'](f);return f+=0x2,f+=0x2,{'command':a,'port':o,'addr':p,'password':a0G[aZ(0x29a)](I[aZ(0x2db)](0x0,0x38)),'headerLength':f};}const a0Ib=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0xfc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x6ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];function a0Iy(I){const au=a0P,P=a0u['encode'](String(I)),p=P[au(0x1f5)]*0x8,J=(P['length']+0x8>>0x6)+0x1<<0x6,q=new Uint8Array(J);q[au(0x235)](P),q[P['length']]=0x80;const o=new DataView(q['buffer']);o['setUint32'](J-0x8,Math['floor'](p/0x100000000),![]),o[au(0x310)](J-0x4,p>>>0x0,![]);let H=0xc1059ed8,K=0x367cd507,n=0x3070dd17,r=0xf70e5939,s=0xffc00b31,Q=0x68581511,l=0x64f98fa7,U=0xbefa4fa4;const y=(W,B)=>W>>>B|W<<0x20-B;for(let W=0x0;W<J;W+=0x40){const B=new Uint32Array(0x40);for(let F=0x0;F<0x10;F++)B[F]=o[au(0x3bc)](W+F*0x4,![]);for(let S=0x10;S<0x40;S++){const A=y(B[S-0xf],0x7)^y(B[S-0xf],0x12)^B[S-0xf]>>>0x3,R=y(B[S-0x2],0x11)^y(B[S-0x2],0x13)^B[S-0x2]>>>0xa;B[S]=B[S-0x10]+A+B[S-0x7]+R>>>0x0;}let X=H,k=K,C=n,M=r,L=s,z=Q,E=l,Y=U;for(let x=0x0;x<0x40;x++){const N=y(L,0x6)^y(L,0xb)^y(L,0x19),D=L&z^~L&E,t=Y+N+D+a0Ib[x]+B[x]>>>0x0,O=y(X,0x2)^y(X,0xd)^y(X,0x16),T=X&k^X&C^k&C,m=O+T>>>0x0;Y=E,E=z,z=L,L=M+t>>>0x0,M=C,C=k,k=X,X=t+m>>>0x0;}H=H+X>>>0x0,K=K+k>>>0x0,n=n+C>>>0x0,r=r+M>>>0x0,s=s+L>>>0x0,Q=Q+z>>>0x0,l=l+E>>>0x0,U=U+Y>>>0x0;}let V='';for(const Z of[H,K,n,r,s,Q,l]){V+=(Z>>>0x18&0xff)['toString'](0x10)['padStart'](0x2,'0'),V+=(Z>>>0x10&0xff)[au(0x248)](0x10)['padStart'](0x2,'0'),V+=(Z>>>0x8&0xff)[au(0x248)](0x10)[au(0x249)](0x2,'0'),V+=(Z&0xff)[au(0x248)](0x10)[au(0x249)](0x2,'0');}return V;}let a0Ie='',a0IV='';function a0IW(I){return I!==a0Ie&&(a0Ie=I,a0IV=a0Iy(I)),a0IV;}function a0Ig(I,P){const aG=a0P;if(!P[aG(0x2d2)]||!I||I[aG(0x1ce)]<0x3a)return![];const f=I[aG(0x2db)](0x0,0x38);return a0G['decode'](f)['toLowerCase']()===a0IW(P['trp']||P['uid']);}const a0IB=['https://cloudflare-dns.com/dns-query','https://dns.google/dns-query',a0aw(0x3a4),'https://doh.pub/dns-query'];function a0IX(I,P,f,a){const ai=a0P,w=a&&a[ai(0x308)]||0x2bc,p=a&&a[ai(0x3d2)]||0xfa0;return new Promise(J=>{let q=0x0,o=0x0,H=![],K=null;const n=s=>{if(H)return;H=!![],clearTimeout(K),J(s);},r=()=>{if(H)return;clearTimeout(K);if(q>=I['length']){if(!o)n(null);return;}const s=I[q++];o++;if(q<I['length'])K=setTimeout(r,w);((async()=>{const w0=a0P;let d=null;try{const Q=await a0f5(P(s),{'headers':{'accept':w0(0x1bd)}},p);if(Q&&Q['ok'])d=f(await Q[w0(0x30e)]());}catch(l){}o--;if(d!=null)n(d);else{if(!H&&o===0x0)r();}})());};r();});}function a0Ik(I){const w1=a0P,P=String(I)[w1(0x1aa)]('::'),f=P[0x0]?P[0x0][w1(0x1aa)](':')[w1(0x2be)](Boolean):[],a=P[0x1]?P[0x1][w1(0x1aa)](':')['filter'](Boolean):[],w=[...f,...Array(Math[w1(0x28a)](0x0,0x8-f['length']-a[w1(0x1f5)]))[w1(0x22a)]('0'),...a],p=new Uint8Array(0x10);return w['forEach']((J,q)=>{const o=parseInt(J,0x10)||0x0;p[q*0x2]=o>>0x8&0xff,p[q*0x2+0x1]=o&0xff;}),p;}async function a0Iv(I){const w2=a0P;if(!I||I['byteLength']<0x11)return null;const P=new DataView(I[w2(0x283)],I['byteOffset'],I[w2(0x1ce)]),f=P['getUint16'](0x0);if(P['getUint16'](0x2)&0x8000)return null;if(P[w2(0x266)](0x4)!==0x1)return null;let w=0xc,p=[];while(w<I[w2(0x1ce)]){const y=P['getUint8'](w);if(y===0x0){w++;break;}if((y&0xc0)===0xc0){w+=0x2;break;}if(w+0x1+y>I['byteLength'])return null;p[w2(0x38e)](a0G['decode'](I['subarray'](w+0x1,w+0x1+y))),w+=0x1+y;}if(w+0x4>I['byteLength']||p['length']===0x0)return null;const J=P[w2(0x266)](w),q=P[w2(0x266)](w+0x2),H=w+0x4;if(J!==0x1&&J!==0x1c)return null;const K=p[w2(0x335)]('.'),n=I['subarray'](0xc,H),r=await a0IX(a0IB,e=>e+'?name='+encodeURIComponent(K)+w2(0x3e4)+J,e=>{const w3=a0P;if(!e||e['Status']!==0x0)return null;const V=(e['Answer']||[])[w3(0x2be)](W=>W['type']===J&&(W[w3(0x219)]===0x1?a0I8(String(W[w3(0x331)])):/^[0-9a-fA-F:]+$/[w3(0x362)](String(W['data']))));return V['length']?V:null;},{'timeoutMs':0x1388});if(!r)return null;const s=new Uint8Array(0xc),d=new DataView(s['buffer']);d['setUint16'](0x0,f),d[w2(0x1dd)](0x2,0x8180),d['setUint16'](0x4,0x1),d[w2(0x1dd)](0x6,r['length']);const Q=[s,n];for(const e of r){const V=String(e[w2(0x331)]),W=e['type']===0x1?Uint8Array['from'](V[w2(0x1aa)]('.')['map'](Number)):a0Ik(V);if(W['length']!==(e[w2(0x219)]===0x1?0x4:0x10))continue;const g=new Uint8Array(0xa),B=new DataView(g[w2(0x283)]);B['setUint16'](0x0,0xc00c),B[w2(0x1dd)](0x2,e['type']),B['setUint16'](0x4,q===0x0?0x1:q),B[w2(0x310)](0x6,Number(e['TTL'])||0x12c),Q['push'](g,new Uint8Array([W[w2(0x1f5)]>>0x8&0xff,W['length']&0xff]),W);}let l=0x0;Q[w2(0x36c)](X=>l+=X['byteLength']);const U=new Uint8Array(l);let b=0x0;for(const X of Q){U['set'](X,b),b+=X['byteLength'];}return U;}function a0IC(I,P,f){const w4=a0P;return Promise['race']([I,new Promise((a,w)=>setTimeout(()=>w(new Error(f||w4(0x24b))),P||0x1770))]);}async function a0IM(I,P,f){const w5=a0P,a=connect({'hostname':I,'port':P});try{await a0IC(a['opened'],f||0x1770,w5(0x2a8));}catch(w){try{a['close']();}catch(p){}throw w;}return a;}async function a0IL(I,P){const w6=a0P;return a0IM(I[w6(0x29f)],I[w6(0x1b5)],P||0x1770);}async function a0Iz(I,P){const w7=a0P,f=await a0IM(I[w7(0x267)],I[w7(0x1b5)],0x1770),a=f['writable'][w7(0x31a)](),w=f[w7(0x3d5)]['getReader']();let J=new Uint8Array(0x0);const q=async s=>{const w8=a0P;while(J[w8(0x1f5)]<s){const {done:Q,value:U}=await w['read']();if(Q)throw new Error('连接被关闭');J=a0IG(J,U);}const d=J['slice'](0x0,s);return J=J[w8(0x2db)](s),d;},o=I[w7(0x2b7)]?[0x5,0x2,0x0,0x2]:[0x5,0x1,0x0];await a['write'](new Uint8Array(o));const H=await q(0x2);if(H[0x0]!==0x5||H[0x1]===0xff)throw new Error(w7(0x1fd));if(H[0x1]===0x2){if(!I['user'])throw new Error(w7(0x246));const s=a0u['encode'](I['user']),d=a0u[w7(0x1be)](I[w7(0x390)]),Q=new Uint8Array([0x1,s[w7(0x1f5)],...s,d[w7(0x1f5)],...d]);await a['write'](Q);const U=await q(0x2);if(U[0x1]!==0x0)throw new Error('SOCKS5\x20认证失败');}else{if(H[0x1]!==0x0)throw new Error(w7(0x227)+H[0x1]);}const K=a0u[w7(0x1be)](P[w7(0x29f)]);let n;if(/^\d+\.\d+\.\d+\.\d+$/['test'](P['hostname']))n=new Uint8Array([0x5,0x1,0x0,0x1,...P['hostname'][w7(0x1aa)]('.')['map'](Number),P['port']>>0x8&0xff,P['port']&0xff]);else P['hostname'][w7(0x257)](':')>=0x0&&a0I8(P['hostname'])?n=new Uint8Array([0x5,0x1,0x0,0x4,...a0Ik(P[w7(0x29f)]),P[w7(0x1b5)]>>0x8&0xff,P[w7(0x1b5)]&0xff]):n=new Uint8Array([0x5,0x1,0x0,0x3,K[w7(0x1f5)],...K,P[w7(0x1b5)]>>0x8&0xff,P[w7(0x1b5)]&0xff]);await a[w7(0x20d)](n);const r=await q(0x4);if(r[0x1]!==0x0)throw new Error('SOCKS5\x20连接失败\x20码'+r[0x1]);if(r[0x3]===0x1)await q(0x6);else{if(r[0x3]===0x3){const b=(await q(0x1))[0x0];await q(b+0x2);}else{if(r[0x3]===0x4)await q(0x12);}}if(J[w7(0x1ce)]>0x0)f[w7(0x273)]=J;return a[w7(0x237)](),w['releaseLock'](),f;}async function a0IE(I,P){const w9=a0P,f=await a0IM(I['host'],I['port'],0x1770),a=f[w9(0x24c)]['getWriter'](),w=f['readable'][w9(0x1e5)]();let p='';if(I['user'])p=w9(0x375)+a0i(a0u['encode'](I['user']+':'+I[w9(0x390)]))+'\x0d\x0a';const J=(P['hostname']['indexOf'](':')>=0x0?'['+P[w9(0x29f)]+']':P[w9(0x29f)])+':'+P['port'],q=w9(0x293)+J+'\x20HTTP/1.1\x0d\x0aHost:\x20'+J+'\x0d\x0a'+p+'\x0d\x0a';await a['write'](a0u[w9(0x1be)](q));const {head:o,leftover:H}=await a0Iu(w);if(!/^HTTP\/\d\.\d\s+2\d\d/i[w9(0x362)](o))throw new Error('HTTP\x20代理\x20CONNECT\x20失败:\x20'+o[w9(0x1aa)]('\x0d\x0a')[0x0]);if(H&&H[w9(0x1ce)]>0x0)f[w9(0x273)]=H;return a[w9(0x237)](),w[w9(0x237)](),f;}function a0IY(I){const wI=a0P,P=String(I||'')['toLowerCase']()['replace'](/_/g,'-');if(P===wI(0x3cf)||P===wI(0x3c5))return{'name':'AES-GCM','keyLen':0x10};if(P===wI(0x1e1)||P==='aes-256gcm')return{'name':'AES-GCM','keyLen':0x20};if(P==='chacha20-ietf-poly1305'||P==='chacha20-poly1305'||P==='chacha20poly1305')return{'name':wI(0x279),'keyLen':0x20};return null;}function a0IF(I){const wP=a0P,P=I instanceof Uint8Array?I:new Uint8Array(I),p=P['length'],J=p*0x8,q=new Uint8Array((p+0x8>>0x6)+0x1<<0x6);q[wP(0x235)](P),q[p]=0x80;const o=new DataView(q[wP(0x283)]);o['setUint32'](q['length']-0x8,Math['floor'](J/0x100000000),![]),o[wP(0x310)](q[wP(0x1f5)]-0x4,J>>>0x0,![]);let H=0x67452301,K=0xefcdab89,n=0x98badcfe,r=0x10325476,s=0xc3d2e1f0;const Q=new Uint32Array(0x50);for(let y=0x0;y<q['length'];y+=0x40){for(let v=0x0;v<0x10;v++)Q[v]=o[wP(0x3bc)](y+v*0x4,![]);for(let C=0x10;C<0x50;C++)Q[C]=a0I2(Q[C-0x3]^Q[C-0x8]^Q[C-0xe]^Q[C-0x10],0x1);let V=H,W=K,g=n,B=r,X=s;for(let M=0x0;M<0x50;M++){let L,z;if(M<0x14)L=W&g|~W&B,z=0x5a827999;else{if(M<0x28)L=W^g^B,z=0x6ed9eba1;else M<0x3c?(L=W&g|W&B|g&B,z=0x8f1bbcdc):(L=W^g^B,z=0xca62c1d6);}const E=a0I2(V,0x5)+L+X+z+Q[M]>>>0x0;X=B,B=g,g=a0I2(W,0x1e),W=V,V=E;}H=H+V>>>0x0,K=K+W>>>0x0,n=n+g>>>0x0,r=r+B>>>0x0,s=s+X>>>0x0;}const l=new Uint8Array(0x14),U=new DataView(l['buffer']);return U[wP(0x310)](0x0,H,![]),U['setUint32'](0x4,K,![]),U['setUint32'](0x8,n,![]),U[wP(0x310)](0xc,r,![]),U['setUint32'](0x10,s,![]),l;}function a0IS(I,P){const wf=a0P,f=0x40;let a=I;if(a[wf(0x1f5)]>f)a=a0IF(a);const w=new Uint8Array(f),p=new Uint8Array(f);for(let J=0x0;J<f;J++){w[J]=(J<a[wf(0x1f5)]?a[J]:0x0)^0x36,p[J]=(J<a['length']?a[J]:0x0)^0x5c;}return a0IF(a0IG(p,a0IF(a0IG(w,P))));}function a0IA(I,P,f){const wa=a0P,a=a0IS(P&&P[wa(0x1f5)]?P:new Uint8Array(0x14),I);let w=new Uint8Array(0x0),p=new Uint8Array(0x0);for(let J=0x1;p[wa(0x1f5)]<f;J++){const q=new Uint8Array([J]);w=a0IS(a,a0IG(a0IG(w,a0u['encode'](wa(0x1eb))),q)),p=a0IG(p,w);}return p['slice'](0x0,f);}function a0Ij(I,P,f){const ww=a0P,a=new Uint32Array(0x10);a[0x0]=0x61707865,a[0x1]=0x3320646e,a[0x2]=0x79622d32,a[0x3]=0x6b206574;const p=new DataView(I['buffer'],I['byteOffset'],0x20);for(let n=0x0;n<0x8;n++)a[0x4+n]=p[ww(0x3bc)](n*0x4,!![]);a[0xc]=P>>>0x0;const J=new DataView(f[ww(0x283)],f[ww(0x3d9)],0xc);a[0xd]=J['getUint32'](0x0,!![]),a[0xe]=J['getUint32'](0x4,!![]),a[0xf]=J['getUint32'](0x8,!![]);const q=a['slice'](),o=(r,s,Q,l)=>{q[r]=q[r]+q[s]>>>0x0,q[l]=a0I2(q[l]^q[r],0x10),q[Q]=q[Q]+q[l]>>>0x0,q[s]=a0I2(q[s]^q[Q],0xc),q[r]=q[r]+q[s]>>>0x0,q[l]=a0I2(q[l]^q[r],0x8),q[Q]=q[Q]+q[l]>>>0x0,q[s]=a0I2(q[s]^q[Q],0x7);};for(let r=0x0;r<0xa;r++){o(0x0,0x4,0x8,0xc),o(0x1,0x5,0x9,0xd),o(0x2,0x6,0xa,0xe),o(0x3,0x7,0xb,0xf),o(0x0,0x5,0xa,0xf),o(0x1,0x6,0xb,0xc),o(0x2,0x7,0x8,0xd),o(0x3,0x4,0x9,0xe);}const H=new Uint8Array(0x40),K=new DataView(H[ww(0x283)]);for(let s=0x0;s<0x10;s++){q[s]=q[s]+a[s]>>>0x0,K[ww(0x310)](s*0x4,q[s],!![]);}return H;}function a0IR(I,P,f,a){const wp=a0P,w=a['slice'](),p=Math['ceil'](a[wp(0x1f5)]/0x40);for(let J=0x0;J<p;J++){const q=a0Ij(I,f+J,P),o=J*0x40,H=Math[wp(0x287)](0x40,w['length']-o);for(let K=0x0;K<H;K++)w[o+K]^=q[K];}return w;}function a0Ih(I,P){let f=0x0n,a=0x0n;for(let o=0x0;o<0x10;o++){f|=BigInt(I[o])<<BigInt(0x8*o),a|=BigInt(I[0x10+o])<<BigInt(0x8*o);}f&=0xffffffc0ffffffc0ffffffc0fffffffn;let w=0x0n;const J=(0x1n<<0x82n)-0x5n;for(let H=0x0;H<P['length'];H+=0x10){const K=Math['min'](0x10,P['length']-H);let s=0x1n;for(let d=K-0x1;d>=0x0;d--)s=s<<0x8n|BigInt(P[H+d]);w=(w+s)*f%J;}w=w+a&(0x1n<<0x80n)-0x1n;const q=new Uint8Array(0x10);for(let Q=0x0;Q<0x10;Q++)q[Q]=Number(w>>BigInt(0x8*Q)&0xffn);return q;}function a0Ix(I,P,f,a){const wq=a0P,w=a||new Uint8Array(0x0),p=a0IR(I,P,0x0,new Uint8Array(0x20)),J=a0IR(I,P,0x1,f),q=n=>new Uint8Array((0x10-n%0x10)%0x10),o=r=>{const wJ=a0P,s=new Uint8Array(0x8),d=new DataView(s[wJ(0x283)]);return d[wJ(0x310)](0x0,r>>>0x0,!![]),d[wJ(0x310)](0x4,Math[wJ(0x280)](r/0x100000000),!![]),s;},H=a0IG(w,a0IG(q(w[wq(0x1f5)]),a0IG(J,a0IG(q(J['length']),a0IG(o(w['length']),o(J[wq(0x1f5)])))))),K=a0Ih(p,H);return a0IG(J,K);}function a0IN(I,P,f,a){const wo=a0P;if(f['length']<0x10)throw new Error('SS\x20AEAD\x20数据过短');const w=f[wo(0x2db)](0x0,f[wo(0x1f5)]-0x10),p=f['subarray'](f['length']-0x10),J=a||new Uint8Array(0x0),q=a0IR(I,P,0x0,new Uint8Array(0x20)),o=s=>new Uint8Array((0x10-s%0x10)%0x10),H=s=>{const wH=a0P,d=new Uint8Array(0x8),Q=new DataView(d[wH(0x283)]);return Q[wH(0x310)](0x0,s>>>0x0,!![]),Q['setUint32'](0x4,Math[wH(0x280)](s/0x100000000),!![]),d;},K=a0IG(J,a0IG(o(J[wo(0x1f5)]),a0IG(w,a0IG(o(w['length']),a0IG(H(J[wo(0x1f5)]),H(w[wo(0x1f5)])))))),n=a0Ih(q,K);let r=0x0;for(let s=0x0;s<0x10;s++)r|=n[s]^p[s];if(r!==0x0)return null;return a0IR(I,P,0x1,w);}function a0ID(){const I=new Uint8Array(0xc);return()=>{const P=I['slice']();for(let f=0x0;f<0xc;f++){I[f]++;if(I[f]!==0x0)break;}return P;};}async function a0It(I,P){const wK=a0P,f=a0ID();if(I==='CHACHA20-POLY1305')return{'seal'(w){return a0Ix(P,f(),w);},'open'(w){const p=a0IN(P,f(),w);if(!p)throw new Error('SS\x20AEAD\x20解密失败（密码/加密方式与服务器不匹配）');return p;}};const a=await crypto[wK(0x1c4)][wK(0x371)]('raw',P,{'name':I},![],[wK(0x342),wK(0x352)]);return{async 'seal'(w){const wn=a0P;return new Uint8Array(await crypto[wn(0x1c4)]['encrypt']({'name':I,'iv':f()},a,w));},async 'open'(w){const wr=a0P;try{return new Uint8Array(await crypto['subtle'][wr(0x352)]({'name':I,'iv':f()},a,w));}catch(p){throw new Error(wr(0x317));}}};}function a0IO(I,P){const ws=a0P,f=a0u['encode'](I);let a=new Uint8Array(0x0),w=new Uint8Array(0x0);while(a['length']<P){w=a0I3(a0IG(w,f)),a=a0IG(a,w);}return a[ws(0x21c)](0x0,P);}function a0IT(I,P){const wd=a0P;let f;if(/^\d+\.\d+\.\d+\.\d+$/[wd(0x362)](I))f=new Uint8Array([0x1,...I[wd(0x1aa)]('.')['map'](Number)]);else{if(I[wd(0x257)](':')>=0x0&&a0I8(I))f=new Uint8Array([0x4,...a0Ik(I)]);else{const a=a0u['encode'](I);if(a['length']>0xff)throw new Error('SS\x20目标域名过长');f=new Uint8Array([0x3,a[wd(0x1f5)],...a]);}}return a0IG(f,new Uint8Array([P>>0x8&0xff,P&0xff]));}const a0Im=0x3fff;async function a0IZ(I,P){const wQ=a0P,f=new Uint8Array([P[wQ(0x1f5)]>>0x8&0xff,P[wQ(0x1f5)]&0xff]);return a0IG(await I[wQ(0x1f9)](f),await I['seal'](P));}async function a0Ic(I,P){const wl=a0P,f=a0IY(I['method']);if(!f)throw new Error('不支持的\x20SS\x20加密方式:\x20'+(I[wl(0x3c1)]||'（未指定）'));if(!I['password'])throw new Error(wl(0x20a));const a=await a0IM(I[wl(0x267)],I[wl(0x1b5)],0x1770),w=a['writable'][wl(0x31a)](),p=a[wl(0x3d5)]['getReader']();let J=new Uint8Array(0x0);const q=async s=>{const wU=a0P;while(J['length']<s){const {done:Q,value:l}=await p['read']();if(Q)throw new Error(wU(0x3a2));J=a0IG(J,l);}const d=J['slice'](0x0,s);return J=J['subarray'](s),d;},o=a0IO(I['password'],f['keyLen']),H=crypto[wl(0x258)](new Uint8Array(f['keyLen'])),K=await a0It(f[wl(0x26a)],a0IA(o,H,f[wl(0x275)]));await w['write'](a0IG(H,await a0IZ(K,a0IT(P[wl(0x29f)],P[wl(0x1b5)]))));const n=new ReadableStream({async 'start'(s){const wb=a0P;try{const d=await q(f['keyLen']),Q=await a0It(f[wb(0x26a)],a0IA(o,d,f[wb(0x275)]));while(!![]){const l=await Q[wb(0x2c6)](await q(0x12)),U=l[0x0]<<0x8|l[0x1];if(U>a0Im)throw new Error('SS\x20分片长度非法\x20'+U);const b=await Q[wb(0x2c6)](await q(U+0x10));if(U>0x0)s[wb(0x35b)](b);}}catch(y){try{s[wb(0x380)](y);}catch(V){}}}}),r=new WritableStream({async 'write'(s){const wy=a0P,d=s instanceof Uint8Array?s:new Uint8Array(s);for(let Q=0x0;Q<d[wy(0x1f5)];Q+=a0Im){await w[wy(0x20d)](await a0IZ(K,d[wy(0x2db)](Q,Math[wy(0x287)](d[wy(0x1f5)],Q+a0Im))));}},'close'(){const we=a0P;try{w[we(0x3df)]();}catch(s){}},'abort'(){try{w['abort']();}catch(s){}}});return{'readable':n,'writable':r,'close'(){const wV=a0P;try{a[wV(0x3df)]();}catch(s){}}};}async function a0Iu(I){const wW=a0P;let P=new Uint8Array(0x0);while(P['length']<0x10000){const {done:f,value:a}=await I[wW(0x32c)]();if(f)break;P=a0IG(P,a);const w=a0Ii(P,[0xd,0xa,0xd,0xa]);if(w>=0x0)return{'head':a0G['decode'](P[wW(0x2db)](0x0,w)),'leftover':P[wW(0x2db)](w+0x4)};}return{'head':a0G[wW(0x29a)](P),'leftover':new Uint8Array(0x0)};}function a0IG(I,P){const wg=a0P,f=new Uint8Array(I[wg(0x1f5)]+P['length']);return f[wg(0x235)](I,0x0),f['set'](P,I[wg(0x1f5)]),f;}function a0Ii(P,f){const wB=a0P;I:for(let a=0x0;a<=P[wB(0x1f5)]-f['length'];a++){for(let w=0x0;w<f['length'];w++)if(P[a+w]!==f[w])continue I;return a;}return-0x1;}function a0P0(I){const wX=a0P,P=(I||'')['toUpperCase']();if(P['startsWith']('HKG')||P['startsWith']('HK'))return'HK';if(P[wX(0x3b8)](wX(0x272))||P['startsWith']('SG'))return'SG';if(P[wX(0x3b8)]('NRT')||P[wX(0x3b8)]('KIX')||P['startsWith']('TYO')||P['startsWith'](wX(0x3c8))||P[wX(0x3b8)]('JP'))return'JP';if(P['startsWith'](wX(0x2ec))||P['startsWith']('SEL')||P[wX(0x3b8)]('KR'))return'KR';if(/^(HKG|SIN|NRT|KIX|ICN|TYO|OSA|SEL|HK|SG|JP|KR|SJC)/['test'](P))return'HK';if(P[wX(0x3b8)]('FRA')||P['startsWith']('BER')||P[wX(0x3b8)](wX(0x1f8))||P[wX(0x3b8)](wX(0x1da))||P['startsWith'](wX(0x27e))||P[wX(0x3b8)]('STR')||P[wX(0x3b8)]('DE'))return'DE';if(P['startsWith']('ARN')||P['startsWith']('SE'))return'SE';if(P['startsWith'](wX(0x365))||P['startsWith']('NL'))return'NL';if(P[wX(0x3b8)](wX(0x3a9))||P[wX(0x3b8)]('FI'))return'FI';if(P['startsWith']('LHR')||P[wX(0x3b8)]('MAN')||P[wX(0x3b8)]('GB')||P[wX(0x3b8)]('UK'))return'GB';if(/^(FRA|ARN|AMS|HEL|LHR|MAN|CDG|MAD|VIE|ZRH|MXP|PRG|WAW|BER|MUC|DUS|HAM|STR|DE|SE|NL|FI|GB|UK|FR|ES|AT|CH|IT|CZ|PL)/['test'](P))return'DE';return'US';}const a0P1=new Map();function a0P2(I,P){const wk=a0P;while(I['size']>P)I['delete'](I['keys']()['next']()[wk(0x350)]);}const a0P3=0x5*0x3c*0x3e8,a0P4=0x1e*0x3e8,a0P5=[a0aw(0x271),'https://dns.alidns.com/resolve',a0aw(0x324)];async function a0P6(I,P,f){const wv=a0P;P=P||0x1bb;if(a0I8(I))return[{'hostname':I,'port':P}];const a=!(f&&f['txt']===![]),w=I+':'+P+(a?'':':a'),p=a0P1['get'](w);if(p&&Date[wv(0x294)]()-p['t']<(p['ips'][wv(0x1f5)]?a0P3:a0P4))return p['ips'];const J=await a0P7(I,P,a);return a0P1['set'](w,{'t':Date[wv(0x294)](),'ips':J}),a0P2(a0P1,0xc8),J;}async function a0P7(I,P,f){const wL=a0P,a=async(H,K)=>{const wC=a0P,n=await a0IX(a0P5,s=>s+wC(0x20e)+encodeURIComponent(I)+'&type='+H,s=>{const wM=a0P;if(!s||s['Status']!==0x0&&s['Status']!==0x3)return null;return(s[wM(0x269)]||[])['filter'](d=>d[wM(0x219)]===K)[wM(0x3ac)](d=>d[wM(0x331)]);});return n||[];},[w,J]=await Promise[wL(0x24d)]([f?a('TXT',0x10):[],a('A',0x1)]);let q=[];for(const H of w){const K=String(H)[wL(0x206)](/^"|"$/g,'')[wL(0x206)](/\\010/g,',')[wL(0x206)](/\n/g,',')[wL(0x1c2)]();if(!K)continue;if(K==='@edtunnel'){q=J['filter'](s=>/^\d+\.\d+\.\d+\.\d+$/['test'](s))['map'](s=>({'hostname':s,'port':P}));break;}const n=K[wL(0x1aa)](/[,;\s]+/)[wL(0x3ac)](d=>d[wL(0x1c2)]())[wL(0x2be)](Boolean),r=[];for(const s of n){const {host:d,port:Q}=a0I7(s,P);if(a0I8(d))r[wL(0x38e)]({'hostname':d,'port':Q});}if(r[wL(0x1f5)]){q=r;break;}}!q['length']&&(q=J[wL(0x2be)](l=>/^\d+\.\d+\.\d+\.\d+$/[wL(0x362)](l))[wL(0x3ac)](l=>({'hostname':l,'port':P})));if(!q[wL(0x1f5)]){const l=await a(wL(0x33b),0x1c);q=l[wL(0x2be)](U=>a0I8(U))[wL(0x3ac)](U=>({'hostname':U,'port':P}));}const o=new Set();return q[wL(0x2be)](U=>{const wz=a0P,b=U['hostname']+':'+U['port'];if(o[wz(0x208)](b))return![];return o[wz(0x3be)](b),!![];});}async function a0P8(I){if(!I||!I['length'])return null;let P=![];return await new Promise(f=>{const wE=a0P;let a=I[wE(0x1f5)];const w=p=>{a--;if(p){if(P)try{p['close']();}catch(J){}else P=!![],f(p);}else a<=0x0&&!P&&f(null);};for(const p of I){Promise[wE(0x232)]()['then'](p)['then'](J=>w(J&&J['readable']?J:null),()=>w(null));}});}const a0P9=new Map(),a0PI=0x1e*0x3c*0x3e8;function a0PP(I){const wY=a0P,P=a0P9['get'](I);if(P===undefined)return![];if(Date['now']()-P>a0PI)return a0P9[wY(0x23e)](I),![];return!![];}function a0Pf(I){const wF=a0P;a0P9[wF(0x23e)](I),a0P9['set'](I,Date[wF(0x294)]()),a0P2(a0P9,0x3e8);}async function a0Pa(I,P,f,a){const wS=a0P;let w=null;const p=d=>{if(d&&d!==w)try{d['close']();}catch(Q){}},J=I?Promise[wS(0x232)]()['then'](I)['then'](d=>d&&d['readable']?d:null,()=>null):Promise['resolve'](null);let q=![],o=![];const H=()=>{q&&o&&a&&(a(),a=null);};if(I)J[wS(0x260)](d=>{!d&&(q=!![],H());});const K=P&&P['length']?a0Pp(a0P8(P)['then'](d=>d&&d['readable']?d:null,()=>null),a0PK,p):Promise['resolve'](null);let n=null;const r=await Promise[wS(0x2f3)]([J,new Promise(d=>{n=setTimeout(()=>d(a0Pw),f);})]);clearTimeout(n);if(r&&r!==a0Pw)return w=r,K['then'](p),w;const s=await K;if(s)return w=s,o=!![],H(),J[wS(0x260)](p),w;return w=await J,w;}const a0Pw=Symbol(a0aw(0x19f));function a0Pp(I,P,f){const wA=a0P;let a=null,w=![];return Promise[wA(0x2f3)]([I['then'](p=>{clearTimeout(a);if(w&&f)f(p);return p;}),new Promise(p=>{a=setTimeout(()=>{w=!![],p(null);},P);})]);}const a0PJ=0xfa0,a0Pq=0xfa0,a0Po=0x4,a0PH=0x50,a0PK=0x2710,a0Pn=0x5dc;function a0Pr(I){const wj=a0P;if(!I||I[wj(0x1ce)]<0x3)return wj(0x334);return I[0x0]===0x16&&I[0x1]===0x3?wj(0x28c):wj(0x1cf);}function a0Ps(I,P){const wR=a0P,f=I['rl']||{},a=f['md']||wR(0x1f3);if(a==='off')return[];if(a===wR(0x2f8))return String(f['cu']||'')[wR(0x1aa)]('\x0a')['map'](J=>J[wR(0x1c2)]())[wR(0x2be)](Boolean)['slice'](0x0,a0E)[wR(0x3ac)]((J,q)=>{const {host:o,port:H}=a0I7(J,0x1bb);return{'host':o,'port':H,'take':q===0x0?0x2:0x1};});const w=a0y[f['rg']]?f['rg']:a0P0(P),p=[{'host':a0y[w],'port':0x1bb,'take':0x2,'txt':![]}];if(f['r2']!==wR(0x3b2)){const J=a0y[f['r2']]&&f['r2']!==w?f['r2']:Object['keys'](a0y)['find'](q=>q!==w);p[wR(0x38e)]({'host':a0y[J],'port':0x1bb,'take':0x1,'txt':![]});}return p;}async function a0Pd(I,P,f,a){const wh=a0P,w=a0If(P[wh(0x399)]),p=P[wh(0x300)]||'',J=a!==wh(0x1cf),q=w?w['type']==='http'||w[wh(0x219)]==='https'?W=>a0IE(w,W):w[wh(0x219)]==='ss'?W=>a0Ic(w,W):W=>a0Iz(w,W):null;let o;const H=async W=>{try{const g=await W();if(g)return g;}catch(B){o=B;}return null;},K=()=>{throw o||new Error('所有出站方式均失败');},n=P['pxy']?a0I7(P['pxy'],0x1bb):null;if(n&&n[wh(0x267)]&&J){let W=await a0P6(n['host'],n['port']);if(!W[wh(0x1f5)])W=[{'hostname':n[wh(0x267)],'port':n[wh(0x1b5)]}];const g=await a0P8(W[wh(0x21c)](0x0,a0Po)['map'](B=>()=>H(()=>a0IL(B,a0Pq))));if(g)return g;}const s={'hostname':I[wh(0x1b6)],'port':I['port']},d=()=>{if(!J)return[];return a0Ps(P,f)['map'](B=>async()=>{const wx=a0P;let X=[];try{X=await a0P6(B[wx(0x267)],B[wx(0x1b5)],{'txt':B['txt']!==![]});}catch(k){return null;}if(!X['length'])return null;return await a0P8(X[wx(0x21c)](0x0,B['take'])['map'](v=>()=>H(()=>a0IL(v,a0Pq))));});},Q=()=>H(()=>a0IL(s,a0PJ)),l=q?()=>H(()=>q(s)):null,U=String(I['addr']||'')['toLowerCase'](),b=a0l(U),y=!a0I8(U),e=async()=>{const B=d()['slice'](0x0,a0Po-0x1);if(B['length']&&(b||y&&a0PP(U))){const X=await a0Pa(null,B,0x0);if(X)return X;if(y)a0P9['delete'](U);return a0Pa(Q,[],0x0);}return a0Pa(Q,B,a0Pn,y&&B['length']?()=>a0Pf(U):null);};if(p==='only'){if(l){const X=await l();if(X)return X;const k=await a0Pa(null,d(),0x0);if(k)return k;return K();}const B=await e();if(B)return B;return K();}if(p===''&&l){const v=await l();if(v)return v;const C=await e();if(C)return C;return K();}const V=await e();if(V)return V;if(l){const M=await l();if(M)return M;}return K();}const a0PQ=0x40*0x400,a0Pl=0x1000;async function a0PU(I,P,f){const wD=a0P;let a=null;const w=()=>new Promise(q=>{a=setTimeout(()=>q(null),0x0);}),J=()=>{const wN=a0P,q=I[wN(0x32c)]();return q[wN(0x2ba)](()=>{}),q;};try{let q=J();while(!![]){const o=await q;if(o[wD(0x395)])break;q=J();let H=null,K=o['value'][wD(0x1ce)],n=![],s=K;while(s>=a0Pl&&K<a0PQ){const d=await Promise[wD(0x2f3)]([q,w()]);clearTimeout(a);if(!d)break;if(d[wD(0x395)]){n=!![];break;}(H||(H=[o[wD(0x350)]]))['push'](d[wD(0x350)]),K+=d[wD(0x350)][wD(0x1ce)],s=d['value'][wD(0x1ce)],q=J();}if(!H)P(o['value']);else{const Q=new Uint8Array(K);let l=0x0;for(const U of H){Q['set'](U,l),l+=U['byteLength'];}P(Q);}if(n)break;}}catch(b){}try{if(f)f();}catch(y){}}function a0Pb(I,P){const wt=a0P,f=String(I||'')[wt(0x1c2)]();if(!f||f['length']>0x2000||!/^[A-Za-z0-9\-_+/=]+$/['test'](f))return null;let a;try{const w=f[wt(0x206)](/-/g,'+')[wt(0x206)](/_/g,'/'),p=atob(w+'='[wt(0x1df)]((0x4-w['length']%0x4)%0x4));a=new Uint8Array(p[wt(0x1f5)]);for(let J=0x0;J<p[wt(0x1f5)];J++)a[J]=p['charCodeAt'](J);}catch(q){return null;}if(!a[wt(0x1ce)]||a[wt(0x1ce)]>0x1800)return null;if(a['byteLength']>=0x11&&a[0x0]===0x0){let o;try{o=a0IQ(P['uid']);}catch(H){return null;}for(let K=0x0;K<0x10;K++)if(a[K+0x1]!==o[K])return null;return a;}return a0Ig(a,P)?a:null;}function a0Py(I){const wO=a0P;let P='',f=0x0;for(const a of String(I)){const w=a0u['encode'](a)[wO(0x1f5)];if(f+w>0x78)break;P+=a,f+=w;}return P;}async function a0Pe(I,P){const wT=a0P,f=new WebSocketPair(),[a,w]=Object[wT(0x2fe)](f);try{w[wT(0x389)]({'allowHalfOpen':!![]});}catch(V){w[wT(0x389)]();}w[wT(0x1a4)]=wT(0x3d0);let p=null,J=null,q=![],o=null,H=null,K=![],n=![],r=![],s=![];const d=W=>{try{w['send'](W);}catch(g){}},Q=(W,g)=>{if(s)return;s=!![];try{w['close'](W,g);}catch(B){}},l=W=>{const wm=a0P;Q(0x3f3,a0Py(W&&W[wm(0x39c)]||W)),y();},U=async(W,g)=>{const wZ=a0P;if(W&&W['byteLength'])o=o?a0IG(o,W):W;if(!o||q)return;if(o['byteLength']>0x10000)throw new Error(wZ(0x292));let B,X;try{const M=a0Ig(o,P);if(!M&&o[0x0]!==0x0&&o[wZ(0x1ce)]<0x3a)return;X=!M;if(X&&P['evl']===![])throw new Error(wZ(0x216));B=M?a0IU(o):a0Il(o,P);}catch(L){if(/头部过短/[wZ(0x362)](L[wZ(0x39c)]||''))return;throw L;}if(X?B['command']!==0x1&&B['command']!==0x2:B[wZ(0x1e3)]!==0x1)throw new Error('不支持的命令\x20'+B[wZ(0x1e3)]);!K&&X&&B['command']!==0x2&&(K=!![],d(new Uint8Array([0x0,0x0])));const k=o['byteLength']>B[wZ(0x3d8)]?o['subarray'](B['headerLength']):null,v=a0Pr(k);if(v==='unknown'&&!g){if(!H)H=setTimeout(()=>{H=null,U(null,!![])['catch'](l);},a0PH);return;}H&&(clearTimeout(H),H=null);q=!![];if(B['command']===0x2){try{if(B['port']===0x35&&k&&k['byteLength']>=0xc){const z=await a0Iv(k);if(z)d(z);}}catch(E){}Q(0x3e8);return;}const C=await a0Pd(B,P,I['cf']&&I['cf']['colo'],v);if(n){try{C[wZ(0x3df)]();}catch(Y){}return;}p=C,J=C[wZ(0x24c)]['getWriter']();if(C[wZ(0x273)]&&C['_preamble'][wZ(0x1ce)]>0x0)d(C[wZ(0x273)]);if(o&&o[wZ(0x1ce)]>B['headerLength'])await J['write'](o[wZ(0x2db)](B['headerLength']));o=null,r=!![],a0PU(C['readable'][wZ(0x1e5)](),d,()=>Q(0x3e8));},b=a0Pb(I['headers']['get'](wT(0x223)),P);if(b)U(b)[wT(0x2ba)](l);w['addEventListener']('message',async W=>{const wc=a0P;try{const g=typeof W['data']===wc(0x1c5)?a0u[wc(0x1be)](W[wc(0x331)]):new Uint8Array(W[wc(0x331)]);if(!q)await U(g);else{if(J)await J[wc(0x20d)](g);else o=o?a0IG(o,g):g;}}catch(B){l(B);}});function y(){n=!![];H&&(clearTimeout(H),H=null);if(p){try{p['close']();}catch(W){}p=null;}if(!r)Q(0x3e8);}return w['addEventListener']('close',y),w['addEventListener']('error',y),new Response(null,{'status':0x65,'webSocket':a,'headers':{'Sec-WebSocket-Extensions':'identity'}});}async function a0PV(I,P){const wu=a0P,f=I['body']['getReader']();let a=new Uint8Array(0x0),w=null;while(!w){const H=await f[wu(0x32c)]();if(H[wu(0x395)])return new Response('empty',{'status':0x190});a=a['byteLength']?a0IG(a,H['value']):H[wu(0x350)];try{w=a0Il(a,P);}catch(K){if(!/头部过短/[wu(0x362)](K[wu(0x39c)]||''))throw K;if(a[wu(0x1ce)]>0x10000)throw new Error(wu(0x292));}}if(w['command']!==0x1)throw new Error(wu(0x30a));const p=a['subarray'](w[wu(0x3d8)]),J=await a0Pd(w,P,I['cf']&&I['cf'][wu(0x210)],a0Pr(p)),q=J[wu(0x24c)]['getWriter']();if(p['byteLength'])await q[wu(0x20d)](p);q[wu(0x237)](),f['releaseLock'](),I[wu(0x2f1)]['pipeTo'](J[wu(0x24c)])[wu(0x2ba)](()=>{});const o=typeof IdentityTransformStream===wu(0x2fc)?new IdentityTransformStream():new TransformStream();return((async()=>{const wG=a0P;try{const n=o[wG(0x24c)]['getWriter']();await n[wG(0x20d)](new Uint8Array([0x0,0x0]));if(J['_preamble']&&J['_preamble'][wG(0x1ce)]>0x0)await n[wG(0x20d)](J[wG(0x273)]);n['releaseLock'](),await J['readable']['pipeTo'](o[wG(0x24c)]);}catch(r){}try{J['close']();}catch(s){}})()),new Response(o[wu(0x3d5)],{'status':0xc8,'headers':{'content-type':'application/octet-stream','x-accel-buffering':'no','cache-control':'no-store'}});}function a0PW(I){const wi=a0P,P=I instanceof Uint8Array?I:new Uint8Array(I);try{return new TextDecoder(wi(0x3ad),{'fatal':!![]})[wi(0x29a)](P);}catch(f){}try{return new TextDecoder(wi(0x32b))[wi(0x29a)](P);}catch(a){}return new TextDecoder()[wi(0x29a)](P);}const a0Pg='https://hopline-cache.invalid/';async function a0PB(I){const p0=a0P;try{if(typeof caches===p0(0x3dc)||!caches['default'])return null;const P=await caches[p0(0x1b9)]['match'](new Request(a0Pg+I));return P?await P[p0(0x30e)]():null;}catch(f){return null;}}async function a0PX(I,P,f){try{if(typeof caches==='undefined'||!caches['default'])return;await caches['default']['put'](new Request(a0Pg+I),new Response(JSON['stringify'](P),{'headers':{'Content-Type':'application/json','Cache-Control':'max-age='+(f||0x258)}}));}catch(a){}}const a0Pk='https://api.hostmonit.com/get_optimization_ip',a0Pv=a0aw(0x200),a0PC={'CM':'移动','CU':'联通','CT':'电信'},a0PM={'t':0x0,'ips':null};function a0PL(I){const p1=a0P,P=new Map();for(const a of I){if(!a0I8(a['ip']))continue;const w=P['get'](a['ip']);if(!w)P['set'](a['ip'],{'ip':a['ip'],'lines':[a[p1(0x29e)]]});else{if(!w[p1(0x37c)][p1(0x302)](a['line']))w['lines'][p1(0x38e)](a['line']);}}const f={};return[...P['values']()][p1(0x3ac)](p=>{const J=p['lines']['join']('/');return f[J]=(f[J]||0x0)+0x1,{'ip':p['ip'],'label':J,'seq':String(f[J])['padStart'](0x2,'0')};});}async function a0Pz(I){const p2=a0P;try{return await I[p2(0x2bf)]();}catch(P){return'';}}function a0PE(I){const p3=a0P,P=[];for(const f of I['match'](/<tr[\s\S]*?<\/tr>/g)||[]){const a={};for(const o of f[p3(0x31b)](/<td[^>]*>[\s\S]*?<\/td>/g)||[]){const H=o['match'](/data-label="([^"]*)"[^>]*>([\s\S]*?)<\/td>/);if(H)a[H[0x1]]=H[0x2]['replace'](/<[^>]+>/g,'')[p3(0x1c2)]();}const w=(a[p3(0x1a6)]||'')[p3(0x1c2)]();let p,J,q;if(w[p3(0x257)](':')!==w['lastIndexOf'](':')){p=w['match'](/^\[([0-9a-fA-F:]+)\](?::(\d{1,5}))?$/)||w['match'](/^([0-9a-fA-F:]+)$/);if(!p||!a0I8(p[0x1]))continue;}else{p=w[p3(0x31b)](/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?/);if(!p)continue;}J=p[0x1],q=p[0x2]?parseInt(p[0x2],0xa):0x1bb,P['push']({'ip':J,'port':q,'cells':a});}return P;}async function a0PY(I){const p4=a0P,P={'status':0x0,'raw':'','items':[],'dropped':[],'error':''},f=await a0f5(a0Pk,{'method':p4(0x29c),'headers':{'Content-Type':'application/json','User-Agent':p4(0x1f4)},'body':JSON['stringify']({'key':a0Pv})},0x1770);if(!f)return P[p4(0x380)]=p4(0x1e4),P;P[p4(0x202)]=f['status'],P['raw']=await a0Pz(f);if(!f['ok'])return P[p4(0x380)]='HTTP\x20'+f[p4(0x202)],P;let a;try{a=JSON['parse'](P['raw']);}catch(p){return P['error']='响应不是\x20JSON',P;}const w=(a&&Array[p4(0x1c1)](a[p4(0x25f)])?a[p4(0x25f)]:[])[p4(0x3ac)](J=>({'ip':String(J&&J['ip']||'')['trim'](),'line':a0PC[String(J&&J[p4(0x29e)]||'')['toUpperCase']()]||'优选'}));for(const J of a0PL(w)){if(!a0l(J['ip'])){P['dropped'][p4(0x38e)](J['ip']);continue;}P['items'][p4(0x38e)]({'ip':J['ip'],'port':0x1bb,'name':J['label']+'-'+J[p4(0x2a0)]});if(P[p4(0x1a7)][p4(0x1f5)]>=I)break;}if(!P['items'][p4(0x1f5)])P[p4(0x380)]=p4(0x22e);return P;}async function a0PF(I){const p5=a0P;I=Math['max'](0x1,parseInt(I)||0x96);if(a0PM['ips']&&Date[p5(0x294)]()-a0PM['t']<0xa*0x3c*0x3e8)return a0PM[p5(0x2e7)];const P=await a0PB('hostmonit');if(P&&P['length'])return a0PM['t']=Date['now'](),a0PM['ips']=P,P;const f=await a0PY(I);if(f[p5(0x1a7)][p5(0x1f5)])return a0PM['t']=Date[p5(0x294)](),a0PM['ips']=f['items'],await a0PX('hostmonit',f['items']),f[p5(0x1a7)];return a0PM[p5(0x2e7)];}const a0PS=a0aw(0x32e),a0PA=[['ctcc','电信'],[a0aw(0x1a2),'联通'],['cmcc','移动'],[a0aw(0x3e6),'多线'],[a0aw(0x337),'IPv6']],a0Pj={'t':0x0,'ips':null};async function a0PR(){const p6=a0P,I={'status':0x0,'raw':'','items':[],'dropped':[],'error':''},P=String(Date['now']()),f=a0I4(a0I4(p6(0x1d1))+p6(0x290)+P),a=await a0f5(a0PS+p6(0x1ac)+f+'&time='+P,{'headers':{'User-Agent':p6(0x1f4)}},0x1770);if(!a)return I['error']='请求失败或超时',I;I[p6(0x202)]=a[p6(0x202)],I['raw']=await a0Pz(a);if(!a['ok'])return I[p6(0x380)]='HTTP\x20'+a['status'],I;let w;try{w=JSON['parse'](I['raw']);}catch(q){return I['error']='响应不是\x20JSON',I;}const p=w&&w['data']||{};if(!w||!w['data'])I['error']=w&&w[p6(0x32d)]?p6(0x321)+w['msg']:'响应中没有\x20data\x20字段';const J=[];for(const [o,H]of a0PA){for(const K of(p[o]||{})[p6(0x25f)]||[])J['push']({'ip':String(K&&K['ip']||'')['trim']()['replace'](/^\[|\]$/g,''),'line':H});}for(const n of a0PL(J)){if(!a0l(n['ip'])){I[p6(0x2a9)][p6(0x38e)](n['ip']);continue;}I['items'][p6(0x38e)]({'ip':n['ip'],'port':0x1bb,'name':n['label']+'-U'+n[p6(0x2a0)]});}if(!I[p6(0x1a7)][p6(0x1f5)]&&!I[p6(0x380)])I['error']='响应中没有边缘段\x20IP';return I;}async function a0Ph(I,P){const p7=a0P;let f=a0Pj['ips'];if(!f||Date['now']()-a0Pj['t']>=0xa*0x3c*0x3e8){const a=await a0PB(p7(0x2ce));if(a&&a[p7(0x1f5)])a0Pj['t']=Date[p7(0x294)](),a0Pj[p7(0x2e7)]=a,f=a;else{const w=await a0PR();w['items'][p7(0x1f5)]&&(a0Pj['t']=Date[p7(0x294)](),a0Pj[p7(0x2e7)]=w['items'],f=w['items'],await a0PX('uouin',w['items']));}}return(f||[])['filter'](p=>p['ip']['indexOf'](':')>=0x0?P:I);}async function a0Px(I){const p9=a0P,P={'status':0x0,'raw':'','items':[],'dropped':[],'error':''};let f=![];const a=await a0f6(I,0xc8,0x12c,![],![],{'fresh':!![],'onRaw':(w,p,J)=>{const p8=a0P;f=!![],P[p8(0x202)]=p,P[p8(0x2d8)]=J;}})['catch'](()=>[]);if(!f)P['error']=p9(0x1bf);else{if(!P[p9(0x202)])P['error']='请求失败或超时';else{if(P['status']<0xc8||P['status']>=0x12c)P[p9(0x380)]='HTTP\x20'+P[p9(0x202)];}}for(const w of a)(a0I8(w['ip'])&&a0l(w['ip'])?P[p9(0x1a7)]:P[p9(0x2a9)])['push'](a0I8(w['ip'])&&a0l(w['ip'])?w:w['ip']);if(!P[p9(0x1a7)]['length']&&!P[p9(0x380)])P['error']=P[p9(0x2a9)][p9(0x1f5)]?p9(0x346):'未能从响应中解析出\x20IP';return P;}const a0PN={'v4':{'url':a0aw(0x2e6),'tag':'W'},'v6':{'url':'https://www.wetest.vip/page/cloudflare/address_v6.html','tag':a0aw(0x37f)}},a0PD={'v4':{'t':0x0,'ips':null},'v6':{'t':0x0,'ips':null}};async function a0Pt(I){const pI=a0P,P={'status':0x0,'raw':'','items':[],'dropped':[],'error':''},f=await a0f5(a0PN[I]['url'],{'headers':{'User-Agent':'Mozilla/5.0'}},0x1770);if(!f)return P[pI(0x380)]=pI(0x1e4),P;P[pI(0x202)]=f['status'];const a=await a0Pz(f);if(!f['ok'])return P['error']='HTTP\x20'+f[pI(0x202)],P['raw']=a,P;const w=a0PE(a);if(!w['length'])return P['error']='页面中没有解析到\x20IP（版式可能已变化）',P[pI(0x2d8)]=a,P;P[pI(0x2d8)]=w[pI(0x3ac)](J=>[J[pI(0x2cf)]['线路名称'],J['ip'],J['cells']['数据中心'],J[pI(0x2cf)]['往返延迟'],J['cells'][pI(0x24a)]][pI(0x2be)](Boolean)['join']('\x20\x20'))['join']('\x0a');const p=w[pI(0x3ac)](J=>({'ip':J['ip'],'line':J['cells'][pI(0x25b)]||'优选'}));for(const J of a0PL(p)){if(!a0l(J['ip'])){P[pI(0x2a9)]['push'](J['ip']);continue;}P['items']['push']({'ip':J['ip'],'port':0x1bb,'name':J['label']+'-'+a0PN[I][pI(0x251)]+J[pI(0x2a0)]});}if(!P[pI(0x1a7)][pI(0x1f5)])P[pI(0x380)]='页面中没有边缘段\x20IP';return P;}async function a0PO(){const pP=a0P,[I,P]=await Promise[pP(0x24d)]([a0Pt('v4'),a0Pt('v6')]),f={'status':I[pP(0x202)]||P[pP(0x202)],'raw':'IPv4\x20页面\x0a'+I['raw']+'\x0a\x0aIPv6\x20页面\x0a'+P[pP(0x2d8)],'items':[...I[pP(0x1a7)],...P['items']],'dropped':[...I['dropped'],...P['dropped']],'error':''},w=[I['error']&&'IPv4：'+I[pP(0x380)],P[pP(0x380)]&&'IPv6：'+P['error']]['filter'](Boolean);if(w['length'])f[pP(0x380)]=w[pP(0x335)]('；');return f;}async function a0PT(I,P){const pf=a0P,f=[I&&'v4',P&&'v6']['filter'](Boolean),a=await Promise['all'](f[pf(0x3ac)](async w=>{const pa=a0P,p=a0PD[w];if(p[pa(0x2e7)]&&Date[pa(0x294)]()-p['t']<0xa*0x3c*0x3e8)return p[pa(0x2e7)];const J=await a0PB(pa(0x341)+w);if(J&&J['length'])return p['t']=Date['now'](),p[pa(0x2e7)]=J,J;const q=await a0Pt(w);return q['items'][pa(0x1f5)]&&(p['t']=Date['now'](),p[pa(0x2e7)]=q['items'],await a0PX(pa(0x341)+w,q[pa(0x1a7)])),p['ips']||[];}));return a[pf(0x297)]();}async function a0Pm(I){const pw=a0P,P={'status':0xc8,'raw':'','items':[],'dropped':[],'error':'','domains':[]},f=I[pw(0x21c)](0x0,a0z),a=await Promise[pw(0x24d)](f[pw(0x3ac)](async w=>{const pp=a0P,p=await a0IX([pp(0x271),pp(0x3a4)],q=>q+'?name='+encodeURIComponent(w)+pp(0x3cd),q=>!q||q[pp(0x369)]!==0x0&&q['Status']!==0x3?null:(q[pp(0x269)]||[])[pp(0x2be)](o=>o['type']===0x1&&/^\d+\.\d+\.\d+\.\d+$/[pp(0x362)](String(o[pp(0x331)])))['map'](o=>String(o['data'])),{'timeoutMs':0xfa0}),J=(p||[])['filter'](a0l);return{'domain':w,'failed':p===null,'ips':(p||[])['slice'](0x0,0x4),'cf':J[pp(0x1f5)],'ok':J[pp(0x1f5)]>0x0};}));P[pw(0x316)]=a;for(const w of a){if(w['ok'])P['items']['push']({'ip':w['ips'][pw(0x30d)](a0l),'port':0x1bb,'name':w['domain']});else P['dropped'][pw(0x38e)](w['domain']);}P['raw']=a[pw(0x3ac)](p=>p[pw(0x239)]+'\x20→\x20'+(p['failed']?pw(0x39d):p['ips'][pw(0x335)](',\x20')||'无\x20A\x20记录')+(p['ok']?'':pw(0x366)))[pw(0x335)]('\x0a');if(I['length']>f['length'])P['raw']+='\x0a…\x20另有\x20'+(I['length']-f['length'])+'\x20个域名未测试（单次最多测\x20'+a0z+'\x20个）';if(!P['items'][pw(0x1f5)])P['error']=pw(0x3ae);return P;}function a0PZ(I){const P=I['uid']||'';return{'xPaddingObfsMode':!![],'xPaddingMethod':'tokenish','xPaddingPlacement':'queryInHeader','xPaddingHeader':P['slice'](0x1,0x7),'xPaddingKey':'_'+P['slice'](0x19,0x1f)};}function a0Pc(I){const pJ=a0P;return String(I)[pJ(0x206)](/%/g,'%25')['replace'](/#/g,pJ(0x23b))[pJ(0x206)](/\?/g,pJ(0x2e3))['replace'](/ /g,'%20');}function a0Pu(I,P,f,a){const w=(P?0x1:0x0)+(f?0x1:0x0)+(a?0x1:0x0);return w<=0x1?{'v':I,'t':I,'x':I}:{'v':I,'t':I+'.T','x':I+'.X'};}function a0PG(I){const P=new Set();return I['map'](f=>{const pq=a0P,a=f[pq(0x257)]('#');if(a<0x0)return f;let w;try{w=decodeURIComponent(f[pq(0x21c)](a+0x1));}catch(q){w=f[pq(0x21c)](a+0x1);}let p=w,J=0x2;while(P['has'](p))p=w+'·'+J++;return P['add'](p),p===w?f:f[pq(0x21c)](0x0,a+0x1)+a0Pc(p);});}function a0Pi(I){const po=a0P,P=String(I||'')[po(0x1aa)](',')['map'](f=>f[po(0x1c2)]())['filter'](f=>/^[\w./-]+$/[po(0x362)](f));return P[po(0x1f5)]?P:null;}function a0f0(I){return(a0Pi(I)||[])['join'](',');}function a0f1(I,P,f,a,w={}){const pH=a0P,p=I['hst'],J=P[pH(0x302)](':')&&!P[pH(0x3b8)]('[')?'['+P+']':P,o=!a0c[pH(0x208)](Number(f)),H=encodeURIComponent;let K='encryption=none';if(o)K+='&security=tls&sni='+H(p)+'&fp=chrome';else K+=pH(0x2fb);K+='&host='+H(p);const n=w[pH(0x219)]===pH(0x361)&&o;if(n)K+=pH(0x2a4),K+=pH(0x3c4)+H(JSON[pH(0x358)](a0PZ(I)));else K+=pH(0x3d3);K+=pH(0x226)+H('/'+I[pH(0x27a)]+(!n&&o?'?ed=2048':''));if(o&&(I['apn']||n))K+='&alpn='+(I['apn']?a0f0(I[pH(0x2d3)]):'h2');return I['ecn']&&o&&(K+='&ech='+H((I[pH(0x1d4)]||pH(0x25a))+'+'+(I[pH(0x2c8)]||pH(0x3bd)))),'vless://'+I['uid']+'@'+J+':'+f+'?'+K+'#'+a0Pc(a);}function a0f2(I,P,f,a){const pK=a0P,w=I['hst'],p=P['includes'](':')&&!P['startsWith']('[')?'['+P+']':P,J=encodeURIComponent,o=!a0c['has'](Number(f)),H=J('/'+I[pK(0x27a)]+(o?'?ed=2048':''));let K=o?'security=tls&sni='+J(w)+'&fp=chrome&host='+J(w)+'&type=ws&path='+H:'security=none&host='+J(w)+pK(0x303)+H;if(I['apn']&&o)K+='&alpn='+a0f0(I['apn']);if(I[pK(0x3e3)]&&o)K+='&ech='+J((I['ehs']||'cloudflare-ech.com')+'+'+(I['edn']||'https://223.5.5.5/dns-query'));return pK(0x3b7)+(I['trp']||I['uid'])+'@'+p+':'+f+'?'+K+'#'+a0Pc(a);}const a0f3=new Map();async function a0f4(I,P){const pn=a0P;a0f3[pn(0x235)](I,{'t':Date['now'](),'ips':P}),a0P2(a0f3,0x12c),await a0PX('url-'+a0I4(I),P,0x258);}function a0f5(I,P,f){return new Promise(a=>{const pr=a0P,w=new AbortController(),p=setTimeout(()=>w['abort'](),f);fetch(I,Object['assign']({},P,{'signal':w[pr(0x2bb)]}))[pr(0x260)](J=>{clearTimeout(p),a(J);})['catch'](()=>{clearTimeout(p),a(null);});});}async function a0f6(I,P=0x64,f=0x12c,a=!![],w=![],p={}){const ps=a0P,J=String(I||'')[ps(0x1aa)](/[\n,;]+/)['map'](d=>d['trim']()['replace'](/^\*\./,''))[ps(0x2be)](Boolean),q=Date[ps(0x294)](),o=[ps(0x271),'https://dns.alidns.com/resolve'],H=async(Q,l,U)=>{const pd=a0P;for(const b of o){const y=await a0f5(b+'?name='+encodeURIComponent(Q)+pd(0x3e4)+l,{'headers':{'accept':'application/dns-json'}},0xfa0);if(!y||!y['ok'])continue;try{const V=await y['json']();return(V['Answer']||[])['filter'](W=>W['type']===U&&(l==='A'?/^\d+\.\d+\.\d+\.\d+$/[pd(0x362)](W['data']):/^[0-9a-fA-F:]+$/['test'](W[pd(0x331)])))[pd(0x3ac)](W=>W[pd(0x331)]);}catch(W){}}return[];},K=w==='only'?'v6':w?ps(0x2a3):'v4',n=await Promise[ps(0x24d)](J['map'](async Q=>{const pQ=a0P;if(Q['includes']('://')){if(Q[pQ(0x3b8)]('sub://')){let B=Q['slice'](0x6);if(/^[A-Za-z0-9+/=]+$/[pQ(0x362)](B)&&B[pQ(0x1f5)]%0x4===0x0)try{const X=atob(B);if(/^https?:\/\//i[pQ(0x362)](X))B=X;}catch(k){}if(!/^https?:\/\//i[pQ(0x362)](B))B='https://'+B;Q=B;}const W='url:'+Q+(a?'':'|raw'),g=a0f3['get'](W);if(!p[pQ(0x262)]&&g&&q-g['t']<0xa*0x3c*0x3e8)return g[pQ(0x2e7)]['slice'](0x0,P);if(!p['fresh']){const v=await a0PB(pQ(0x32f)+a0I4(W));if(Array[pQ(0x1c1)](v))return a0f3[pQ(0x235)](W,{'t':q,'ips':v}),a0P2(a0f3,0x12c),v[pQ(0x21c)](0x0,P);}try{const C=await a0f5(Q,{},0x1770);if(!C){if(p[pQ(0x3ce)])p[pQ(0x3ce)](Q,0x0,'');throw new Error('unreachable');}let M='';try{M=a0PW(await C[pQ(0x3ba)]());}catch(A){}if(p[pQ(0x3ce)])p[pQ(0x3ce)](Q,C['status'],M);if(!C['ok'])throw new Error('unreachable');let L=M;if(/^[A-Za-z0-9+/=\s]{40,}$/[pQ(0x362)](L['slice'](0x0,0x7d0))&&L[pQ(0x206)](/\s+/g,'')['length']%0x4===0x0)try{const j=atob(L[pQ(0x206)](/\s+/g,''));L=a0PW(Uint8Array['from'](j,R=>R[pQ(0x2ed)](0x0)));}catch(R){}const z=new Set(),E={},Y=[],F=h=>!a||a0l(h),S=L[pQ(0x1c2)]()['split'](/\r?\n/)[pQ(0x3ac)](h=>h[pQ(0x1c2)]())['filter'](Boolean);if(S['length']>0x1&&S[0x0][pQ(0x302)](',')){const h=S[0x0][pQ(0x1aa)](',')['map'](D=>D[pQ(0x1c2)]()),x=h['includes'](pQ(0x2e2))&&h[pQ(0x302)]('端口'),N=h[pQ(0x3b6)](D=>D[pQ(0x302)]('IP'))&&h['some'](D=>D['includes']('延迟'))&&h[pQ(0x3b6)](D=>D['includes'](pQ(0x304)));if(x||N){const D=h[pQ(0x298)](u=>u['includes']('IP')),t=h['indexOf']('端口'),O=h['findIndex'](u=>u['includes']('延迟')),T=h['findIndex'](u=>u[pQ(0x302)](pQ(0x304))),Z=h[pQ(0x257)]('国家')>-0x1?h['indexOf']('国家'):h[pQ(0x257)]('城市')>-0x1?h['indexOf']('城市'):h['indexOf'](pQ(0x351)),c=h['indexOf'](pQ(0x336));for(const u of S['slice'](0x1)){if(Y['length']>=P)break;const G=u[pQ(0x1aa)](',')['map'](I5=>I5['trim']());if(c!==-0x1&&G[c]&&G[c]['toLowerCase']()!=='true')continue;const i=G[D]||'',I0=i['match'](/(\[[0-9a-fA-F:]+\]|\d{1,3}(?:\.\d{1,3}){3})/);if(!I0)continue;const I1=I0[0x1][pQ(0x206)](/^\[|\]$/g,''),I2=t!==-0x1&&G[t]?parseInt(G[t]):0x1bb,I3=I1+':'+I2;if(z[pQ(0x208)](I3))continue;if(!F(I1))continue;z['add'](I3);let I4=Z!==-0x1&&G[Z]?G[Z]:'';if(!I4&&O!==-0x1&&T!==-0x1)I4='CF优选\x20'+(G[O]||'')+'ms\x20'+(G[T]||'')+'MB/s';if(I4)E[I4]=(E[I4]||0x0)+0x1,Y['push']({'ip':I1,'port':I2,'name':I4+'-'+String(E[I4])[pQ(0x249)](0x2,'0')});else Y['push']({'ip':I1,'port':I2,'name':''});}return await a0f4(W,Y),Y['slice']();}}if(L[pQ(0x302)](pQ(0x2e5))&&L[pQ(0x302)]('data-label')){for(const {ip:I5,port:I6,cells:I7}of a0PE(L)){if(Y['length']>=P)break;const I8=I5+':'+I6;if(z['has'](I8))continue;if(!F(I5))continue;z['add'](I8);const I9=(I7[pQ(0x25b)]||I7[pQ(0x351)]||'线路')[pQ(0x1c2)]();if(I9)E[I9]=(E[I9]||0x0)+0x1,Y[pQ(0x38e)]({'ip':I5,'port':I6,'name':I9+'-'+String(E[I9])['padStart'](0x2,'0')});else Y[pQ(0x38e)]({'ip':I5,'port':I6,'name':''});}return await a0f4(W,Y),Y['slice']();}for(const II of L[pQ(0x1aa)](/\r?\n/)){if(Y['length']>=P)break;const IP=II['match'](/(?:vless|trojan):\/\/[^@\s/]+@(\[[0-9a-fA-F:]+\]|[A-Za-z0-9.-]+)(?::(\d{1,5}))?/);if(!IP)continue;const If=IP[0x1][pQ(0x206)](/^\[|\]$/g,''),Ia=IP[0x2]?parseInt(IP[0x2]):0x1bb,Iw=If+':'+Ia;if(z[pQ(0x208)](Iw))continue;if(!F(If))continue;z['add'](Iw);let Ip='';const IJ=II['indexOf']('#');if(IJ>=0x0)try{Ip=decodeURIComponent(II['slice'](IJ+0x1)[pQ(0x1c2)]());}catch(Iq){Ip=II[pQ(0x21c)](IJ+0x1)[pQ(0x1c2)]();}if(Ip)E[Ip]=(E[Ip]||0x0)+0x1,Y['push']({'ip':If,'port':Ia,'name':Ip+'-'+String(E[Ip])[pQ(0x249)](0x2,'0')});else Y['push']({'ip':If,'port':Ia,'name':''});}for(const Io of L['split'](/\r?\n/)){if(Y['length']>=P)break;const IH=Io['match'](/(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?(?:#([^\r\n]*))?/);if(!IH)continue;const IK=IH[0x1],In=IH[0x2]?parseInt(IH[0x2]):0x1bb,Ir=IK+':'+In;if(z[pQ(0x208)](Ir))continue;if(!F(IK))continue;z[pQ(0x3be)](Ir);const Is=(IH[0x3]||'')['trim']();if(Is&&!/[\u4e00-\u9fa5]/['test'](Is)&&!Is['includes']('|')){Y['push']({'ip':IK,'port':In,'name':Is});continue;}let Id='';if(IH[0x3]){const IQ=IH[0x3][pQ(0x31b)](/^\s*[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}/);if(IQ){const Il=IQ[0x0]['match'](/[\u4e00-\u9fa5]{2,5}/);if(Il)Id=Il[0x0];}else{const IU=IH[0x3][pQ(0x1aa)]('|')[pQ(0x3ac)](Iy=>Iy['trim']()),Ib=IU['find'](Iy=>/^[\u4e00-\u9fa5]{2,5}\s+[A-Z]{2}$/[pQ(0x362)](Iy));if(Ib){const Iy=Ib[pQ(0x31b)](/[\u4e00-\u9fa5]{2,5}/);if(Iy)Id=Iy[0x0];}else{const Ie=IU[pQ(0x30d)](IV=>/^[\u4e00-\u9fa5]{2,5}$/['test'](IV)&&!/^(地区随机|随机优选|官方优选|优选|CF优选)$/['test'](IV));if(Ie)Id=Ie;else{const IV=IH[0x3][pQ(0x31b)](/\b([A-Z]{2})\b/);if(IV)Id=a0U[IV[0x1]]||IV[0x1];}}}}if(Id)E[Id]=(E[Id]||0x0)+0x1,Y[pQ(0x38e)]({'ip':IK,'port':In,'name':Id+'-'+String(E[Id])[pQ(0x249)](0x2,'0')});else Y['push']({'ip':IK,'port':In,'name':Is[pQ(0x21c)](0x0,0x28)});}return await a0f4(W,Y),Y[pQ(0x21c)]();}catch(IW){const Ig=a0f3['get'](W);if(!p[pQ(0x262)]&&Ig&&Ig['ips']&&Ig['ips'][pQ(0x1f5)])return Ig['ips']['slice'](0x0,P);return[];}}const l=Q+'|'+K,U=a0f3['get'](l);if(U&&q-U['t']<0xa*0x3c*0x3e8)return U[pQ(0x2e7)]['slice'](0x0,P)['map']((IB,IX)=>({'ip':IB,'port':0x1bb,'name':Q+'-'+(IX+0x1)}));const b=K==='v6'?[]:await H(Q,'A',0x1),y=K==='v4'?[]:await H(Q,pQ(0x33b),0x1c);let V=[...new Set(b['concat'](y))]['filter'](IB=>a?a0l(IB):!![]);V=V[pQ(0x21c)](0x0,P);if(!V[pQ(0x1f5)]){if(U&&U['ips']&&U[pQ(0x2e7)][pQ(0x1f5)])return U['ips']['slice'](0x0,P)['map']((IB,IX)=>({'ip':IB,'port':0x1bb,'name':Q+'-'+(IX+0x1)}));return[];}return a0f3[pQ(0x235)](l,{'t':q,'ips':V}),a0P2(a0f3,0x12c),V[pQ(0x3ac)]((IB,IX)=>({'ip':IB,'port':0x1bb,'name':Q+'-'+(IX+0x1)}));})),r=[];let s=0x0;while(s<f){let d=![];for(const Q of n){if(s>=f)break;Q[ps(0x1f5)]&&(r['push'](Q[ps(0x339)]()),s++,d=!![]);}if(!d)break;}return r;}async function a0f7(I,P=a0fV){const pl=a0P,f=[],a=new Set(),w=I['ft']&&I['ft']['ip']||[],p=w[pl(0x302)]('IPv6'),J=w[pl(0x1f5)]===0x1&&w[0x0]==='IPv6',q=(n,r,s)=>{const pU=a0P;if(f['length']>=P)return;if(a0I8(n)&&!a0l(n))return;const d=n+':'+r;if(a['has'](d))return;a[pU(0x3be)](d);const Q=!a0c['has'](Number(r));if(I[pU(0x1a5)]&&!Q)return;const l=Number(r),U=a0Pu(s,I['evl'],I['etr'],I['exh']&&Q);if(I[pU(0x37d)])f[pU(0x38e)](a0f1(I,n,l,U['v']));if(I['etr'])f['push'](a0f2(I,n,l,U['t']));if(I['exh']&&Q)f['push'](a0f1(I,n,l,U['x'],{'type':'xhttp'}));},o=(n,r,s)=>{r=Number(r)||0x1bb,q(n,r,s);if(!I['tlo']&&r===0x1bb)q(n,0x50,s+'·80');},H=String(I['preferredDomains']||'')[pl(0x1aa)](/[\n,;]+/)[pl(0x3ac)](n=>n['trim']())['filter'](n=>n&&!n['includes'](pl(0x261)));H['forEach']((n,r)=>{const pb=a0P,s=n['indexOf']('#'),Q=(s>=0x0?n[pb(0x21c)](0x0,s):n)[pb(0x1c2)](),l=(s>=0x0?n[pb(0x21c)](s+0x1):'')['trim'](),U=a0I7(Q,0x1bb);o(U['host'],U['port'],l||pb(0x225)+String(r+0x1)['padStart'](0x2,'0'));});let K=I[pl(0x31e)]||[];if(p&&!J&&K[pl(0x1f5)]>0x1){const n=[],r=[];for(const Q of K)(String(Q['ip'])[pl(0x257)](':')>=0x0?r:n)[pl(0x38e)](Q);const s=[],d=Math[pl(0x28a)](n['length'],r[pl(0x1f5)]);for(let l=0x0;l<d;l++){if(l<n['length'])s[pl(0x38e)](n[l]);if(l<r[pl(0x1f5)])s[pl(0x38e)](r[l]);}K=s;}return K[pl(0x36c)]((U,b)=>{const py=a0P;o(U['ip'],U['port']||0x1bb,U[py(0x26a)]||py(0x2a2)+String(b+0x1)['padStart'](0x2,'0'));}),f;}function a0f8(I){const pe=a0P,P=I['indexOf']('@'),f=I['indexOf']('?',P),a=f>P&&P>=0x0?I[pe(0x21c)](P+0x1,f):I['slice'](P+0x1);if(a['startsWith']('[')){const p=a[pe(0x257)](']'),J=p>0x0?a['slice'](0x1,p):a,o=a[pe(0x21c)](p+0x1),H=o[pe(0x3b8)](':')?parseInt(o['slice'](0x1)):0x1bb;return{'host':J,'port':isNaN(H)?0x1bb:H};}const w=a[pe(0x35c)](':');if(w>0x0){const K=parseInt(a[pe(0x21c)](w+0x1));return{'host':a['slice'](0x0,w),'port':isNaN(K)?0x1bb:K};}return{'host':a,'port':0x1bb};}function a0f9(I,P){const pV=a0P,f=I['indexOf']('?');if(f<0x0)return null;const a=I[pV(0x257)]('#',f),w=a>f?I[pV(0x21c)](f+0x1,a):I['slice'](f+0x1);for(const p of w['split']('&')){const J=p[pV(0x257)]('='),o=J>0x0?p['slice'](0x0,J):p;if(o===P)return J>0x0?decodeURIComponent(p['slice'](J+0x1)):'';}return null;}function a0fI(I,P){const pW=a0P,{host:f,port:a}=a0f8(I),w=f,p=I[pW(0x257)]('#');let J='节点'+(P+0x1);if(p>=0x0)try{J=decodeURIComponent(I['slice'](p+0x1))||J;}catch(r){}const q=I[pW(0x257)]('@');let o='';if(q>=0x0){const s=I['indexOf']('://'),d=s>=0x0?s+0x3:0x0;try{o=decodeURIComponent(I[pW(0x21c)](d,q));}catch(Q){o=I[pW(0x21c)](d,q);}}const H=I[pW(0x3b8)]('trojan://'),K=(a0f9(I,'security')||'tls')===pW(0x28c);return{'srv':w,'prt':a,'name':J,'user':o,'isTrojan':H,'tls':K};}const a0fP={'HK':['HK','香港'],'TW':['TW','台湾'],'US':['US','美国'],'SG':['SG',a0aw(0x1b8)],'JP':['JP','日本'],'KR':['KR','韩国'],'DE':['DE','德国']},a0ff={'移动':['移动','CM','CHINAMOBILE'],'联通':['联通','CU',a0aw(0x3c9)],'电信':['电信','CT',a0aw(0x332)]},a0fa=['移动','联通','电信'],a0fw=Object[a0aw(0x3d6)](a0ff)['map'](I=>[I,a0ff[I]['map'](P=>/^[A-Z]+$/[a0aw(0x362)](P)?(f=>a=>f['test'](a))(new RegExp(a0aw(0x291)+P+'([^A-Z]|$)')):f=>f['includes'](P))]),a0fp=Object['keys'](a0fP)['map'](I=>[I,new RegExp('(^|[^A-Z])'+I+'([^A-Z]|$)')]);function a0fJ(I,P){const pg=a0P,f=[];for(const [a,w]of Object[pg(0x379)](a0U))if(I[pg(0x302)](w))f['push'](a);for(const [p,J]of a0fp)if(!f[pg(0x302)](p)&&J['test'](P))f[pg(0x38e)](p);return f;}function a0fq(I){const pB=a0P;return a0fw['filter'](([,P])=>P['some'](a=>a(I)))[pB(0x3ac)](([P])=>P);}const a0fo=[a0aw(0x315),'IPv6'];function a0fH(I,P){const pC=a0P;if(!P||!P['rg']&&!P['ip']&&!P['is'])return I;const f=Array['isArray'](P['rg'])&&P['rg']['length']?P['rg']:['all'],a=P['ip']||a0fo,w=P['is']||a0fa,p=I['map'](o=>{const pX=a0P,{host:H}=a0f8(o);let K='';try{const s=o['indexOf']('#');if(s>=0x0)K=decodeURIComponent(o[pX(0x21c)](s+0x1)||'');}catch(d){K='';}const r=K[pX(0x1fe)]();return{'host':H,'name':K,'up':r,'isps':a0fq(r),'regions':a0fJ(K,r)};}),J=(o,H,K)=>{const pk=a0P,n=o[pk(0x302)]('all')?null:o[pk(0x1d8)](d=>a0fP[d]||[]),r=K[pk(0x1f5)]>0x0&&K['length']<a0fa['length'];return I['filter']((d,Q)=>{const pv=a0P,l=p[Q],U=l['host'][pv(0x257)](':')>=0x0;if(!l['name'])return![];if(n&&l[pv(0x2c2)]['length']&&!l['regions']['some'](b=>o[pv(0x302)](b)))return![];if(H['length']===0x1){if(H[0x0]===pv(0x315)&&U)return![];if(H[0x0]===pv(0x25c)&&!U)return![];}if(r&&l[pv(0x263)][pv(0x1f5)]&&!l['isps'][pv(0x3b6)](b=>K[pv(0x302)](b)))return![];return!![];});};let q=J(f,a,w);if(!q['length'])q=J(f,a,a0fa);if(!q[pC(0x1f5)])q=J(f,a0fo,a0fa);if(!q['length'])q=J(['all'],a0fo,a0fa);return q;}function a0fK(I){const pM=a0P;if(typeof I===pM(0x368)||typeof I===pM(0x23c))return String(I);const P=String(I);return/^[\w.\-/\u4e00-\u9fa5]+$/[pM(0x362)](P)?P:JSON[pM(0x358)](P);}function a0fn(I){const pL=a0P,P=[];P[pL(0x38e)](pL(0x1db)+a0fK(I[pL(0x26a)])),P['push'](pL(0x2e8)+I[pL(0x219)]),P[pL(0x38e)](pL(0x1f2)+a0fK(I[pL(0x301)])),P['push']('\x20\x20\x20\x20port:\x20'+I['port']);if(I['type']==='vless')P[pL(0x38e)]('\x20\x20\x20\x20uuid:\x20'+a0fK(I[pL(0x2d9)]));else P['push'](pL(0x307)+a0fK(I['password']));P['push'](pL(0x2ab)+I['network']),P[pL(0x38e)](pL(0x340));if(I[pL(0x28c)]){P['push'](pL(0x244)),P[pL(0x38e)]('\x20\x20\x20\x20skip-cert-verify:\x20false'),P['push']('\x20\x20\x20\x20alpn:\x20['+(I[pL(0x31c)]&&I[pL(0x31c)][pL(0x1f5)]?I['alpn']:I[pL(0x201)]===pL(0x361)?['h2']:['http/1.1'])[pL(0x335)](',\x20')+']'),P['push']('\x20\x20\x20\x20servername:\x20'+a0fK(I[pL(0x2c0)]));if(I['type']===pL(0x320))P['push'](pL(0x34d)+a0fK(I[pL(0x2c0)]));P[pL(0x38e)](pL(0x3e1)),I[pL(0x393)]&&(P[pL(0x38e)](pL(0x3cb)),P[pL(0x38e)](pL(0x2b2)+a0fK(I[pL(0x393)]['enable'])),P['push']('\x20\x20\x20\x20\x20\x20query-server-name:\x20'+a0fK(I[pL(0x393)][pL(0x327)])));}if(I['network']==='ws')P[pL(0x38e)]('\x20\x20\x20\x20ws-opts:'),P['push'](pL(0x1c8)+a0fK(I['ws-opts']['path'])),P[pL(0x38e)]('\x20\x20\x20\x20\x20\x20headers:'),P[pL(0x38e)](pL(0x2b0)+a0fK(I[pL(0x264)][pL(0x2e0)][pL(0x228)]));else{if(I['network']===pL(0x361)){const f=I[pL(0x22f)];P[pL(0x38e)](pL(0x37a)),P[pL(0x38e)](pL(0x1c8)+a0fK(f['path'])),P['push']('\x20\x20\x20\x20\x20\x20mode:\x20'+a0fK(f['mode'])),P['push']('\x20\x20\x20\x20\x20\x20host:\x20'+a0fK(f['host'])),P[pL(0x38e)]('\x20\x20\x20\x20\x20\x20x-padding-obfs-mode:\x20'+a0fK(f['x-padding-obfs-mode'])),P[pL(0x38e)]('\x20\x20\x20\x20\x20\x20x-padding-method:\x20'+a0fK(f[pL(0x3cc)])),P[pL(0x38e)]('\x20\x20\x20\x20\x20\x20x-padding-placement:\x20'+a0fK(f['x-padding-placement'])),P['push'](pL(0x35d)+a0fK(f['x-padding-header'])),P['push'](pL(0x2f2)+a0fK(f[pL(0x377)]));}}return P['join']('\x0a');}function a0fr(I,P){const pz=a0P,f=I['hst'],a='/'+I[pz(0x27a)],w=a+pz(0x278),p=a0Pi(I['apn']),J=new Set(),q=P['map'](r=>{const pE=a0P,{user:s,srv:d,prt:Q,name:l,isTrojan:U,tls:b}=a0fI(r,0x0);let y=l;const V=a0f9(r,'type')||'ws';if(J[pE(0x208)](y)){const g=U?'T':V===pE(0x361)?'X':'W';let B=y+'·'+g,X=0x2;while(J['has'](B)){B=y+'·'+g+X,X++;}y=B;}J[pE(0x3be)](y);const W={'name':y,'server':d,'port':Q,'udp':!![],...b?{'tls':!![],'skip-cert-verify':![],'servername':f,'client-fingerprint':'chrome','alpn':p||[pE(0x238)]}:{},...I[pE(0x3e3)]&&b?{'ech-opts':{'enable':!![],'query-server-name':I['ehs']||'cloudflare-ech.com'}}:{}};if(U)return{...W,'type':'trojan','password':s,'network':'ws','ws-opts':{'path':b?w:a,'headers':{'Host':f}}};if(V===pE(0x361)){let v={};try{v=JSON[pE(0x3dd)](a0f9(r,'extra')||'{}');}catch(C){}return{...W,'type':'vless','uuid':s,'network':pE(0x361),'alpn':p||['h2'],'xhttp-opts':{'path':a,'mode':pE(0x3c2),'host':f,'x-padding-obfs-mode':v['xPaddingObfsMode']!==undefined?v['xPaddingObfsMode']:!![],'x-padding-method':v['xPaddingMethod']||pE(0x3da),'x-padding-placement':v[pE(0x2b1)]||'queryInHeader','x-padding-header':v[pE(0x2de)]||'','x-padding-key':v[pE(0x1e0)]||''}};}return{...W,'type':pE(0x26d),'uuid':s,'network':'ws','ws-opts':{'path':b?w:a,'headers':{'Host':f}}};});q[pz(0x2bd)]((n,r)=>(n[pz(0x1b5)]===0x1bb?0x0:0x1)-(r[pz(0x1b5)]===0x1bb?0x0:0x1));const o=n=>a0Iy('hopline-clash|'+n+'|'+I['uid'])[pz(0x21c)](0x0,0x14),H=a0r['split']('__HOPLINE_SS_PASSWORD__')['join'](o('ss'))[pz(0x1aa)]('__HOPLINE_AUTH_PASSWORD__')[pz(0x335)](o(pz(0x1b0)))[pz(0x1aa)](pz(0x37e))['join'](o('api')),K=pz(0x36b)+q['map'](n=>a0fn(n))[pz(0x335)]('\x0a')+'\x0a'+H+'\x0a';return K;}function a0fs(I,P){const pY=a0P,f=I['hst'],a='/'+I['pth'];if(!I[pY(0x2d2)])throw new Error(pY(0x255));const w=P[pY(0x2be)](J=>J['startsWith']('trojan://')&&J['indexOf']('security=none')<0x0);if(!w[pY(0x1f5)])throw new Error(pY(0x1ca));const p=w[pY(0x3ac)]((J,q)=>{const pF=a0P,{user:o,srv:H,prt:K,name:r}=a0fI(J,q);return r+'\x20=\x20trojan,\x20'+H+',\x20'+K+',\x20password='+o+',\x20ws=true,\x20ws-path='+a+',\x20ws-headers=Host:'+f+pF(0x2b5)+f;});return pY(0x250)+p['join']('\x0a')+pY(0x274)+p['map'](J=>J[pY(0x1aa)]('\x20=\x20')[0x0])[pY(0x335)](',\x20')+pY(0x2f5);}const a0fd=[[a0aw(0x29b),null],['geosite-cn',a0aw(0x229)],['geosite-google','🌐\x20谷歌服务'],['geosite-apple',a0aw(0x24f)],['geosite-microsoft','Ⓜ️\x20微软服务'],[a0aw(0x27b),'🤖\x20OpenAI'],[a0aw(0x36d),a0aw(0x21a)],[a0aw(0x2df),a0aw(0x21a)],['geosite-netflix','🌍\x20国外媒体'],['geosite-disney','🌍\x20国外媒体'],['geosite-twitter',a0aw(0x21a)],['geosite-telegram','🌍\x20国外媒体'],['geosite-github',a0aw(0x21a)]],a0fQ=a0aw(0x2c4);function a0fl(I,P){const pS=a0P,f=I['hst'],a='/'+I['pth'],w=a0Pi(I[pS(0x2d3)]),p=new Set(),J=P['filter'](H=>a0f9(H,pS(0x219))!=='xhttp')['map']((H,K)=>{const pA=a0P,{user:r,srv:s,prt:d,name:Q,isTrojan:l,tls:U}=a0fI(H,K);let b=Q,y=0x2;while(p[pA(0x208)](b))b=Q+'·'+y++;p[pA(0x3be)](b);const e=U?{'enabled':!![],'server_name':f,'insecure':![],'alpn':w||['http/1.1'],'utls':{'enabled':!![],'fingerprint':'chrome'}}:{'enabled':![]},V=U?{'type':'ws','path':a,'headers':{'Host':f},'max_early_data':0x800,'early_data_header_name':pA(0x234)}:{'type':'ws','path':a,'headers':{'Host':f}};if(l)return{'type':'trojan','tag':b,'server':s,'server_port':d,'password':r,'tls':e,'transport':V};return{'type':'vless','tag':b,'server':s,'server_port':d,'uuid':r,'tls':e,'transport':V};}),q=J[pS(0x3ac)](H=>H['tag']);if(!q['length'])throw new Error(pS(0x1af));const o={'log':{'level':'info'},'dns':{'servers':[{'type':pS(0x285),'tag':'dns-remote','server':'1.1.1.1'},{'type':'udp','tag':'dns-direct','server':'223.5.5.5'},{'type':pS(0x313),'tag':pS(0x2a7),'inet4_range':'198.18.0.0/15'}],'rules':[{'rule_set':pS(0x392),'server':pS(0x397)},{'query_type':['A',pS(0x33b)],'server':pS(0x2a7)}],'final':'dns-remote','strategy':'ipv4_only'},'inbounds':[{'type':'mixed','tag':pS(0x29d),'listen':'127.0.0.1','listen_port':0x820},{'type':pS(0x33e),'tag':'tun-in','interface_name':'tun0','address':[pS(0x1f0)],'mtu':0x2328,'auto_route':!![],'strict_route':!![]}],'outbounds':[{'type':'selector','tag':'🚀\x20节点选择','outbounds':q},{'type':'selector','tag':pS(0x229),'outbounds':['direct']},{'type':'selector','tag':pS(0x1cd),'outbounds':['🚀\x20节点选择',pS(0x229)]},{'type':pS(0x38a),'tag':'🌍\x20国外媒体','outbounds':['🚀\x20节点选择']},{'type':'selector','tag':'🌐\x20谷歌服务','outbounds':[pS(0x344)]},{'type':'selector','tag':pS(0x23a),'outbounds':['🚀\x20节点选择']},{'type':pS(0x38a),'tag':pS(0x24f),'outbounds':[pS(0x229),pS(0x344)]},{'type':'selector','tag':pS(0x1ab),'outbounds':['🎯\x20全球直连',pS(0x344)]},...J,{'type':pS(0x27d),'tag':'direct'}],'route':{'rules':[{'action':'sniff'},{'protocol':pS(0x1a3),'action':pS(0x2af)},{'ip_is_private':!![],'outbound':'direct'},...a0fd['map'](([H,K])=>K?{'rule_set':H,'outbound':K}:{'rule_set':H,'action':pS(0x1e7)}),{'rule_set':'geoip-cn','outbound':pS(0x27d)}],'rule_set':[...a0fd[pS(0x3ac)](([H])=>({'type':'remote','tag':H,'format':pS(0x242),'url':a0fQ+H[pS(0x206)]('geosite-','geosite/')+pS(0x3d1),'download_detour':'direct'})),{'type':'remote','tag':'geoip-cn','format':pS(0x242),'url':a0fQ+'geoip/cn.srs','download_detour':pS(0x27d)}],'final':pS(0x1cd),'auto_detect_interface':!![],'default_domain_resolver':pS(0x397)},'experimental':{'clash_api':{'external_controller':'127.0.0.1:9090'},'cache_file':{'enabled':!![],'store_fakeip':!![]}}};return JSON[pS(0x358)](o,null,0x2);}function a0fU(I,P){const pj=a0P,f=I[pj(0x2be)](a=>a0f9(a,pj(0x219))!==pj(0x361));if(!f[pj(0x1f5)])throw new Error(P+'\x20不支持\x20XHTTP，没有可用节点：请同时启用\x20VLESS\x20或\x20Trojan\x20协议');return f;}function a0fb(I,P){const pR=a0P;P=a0fU(P,pR(0x231));const f=I['hst'],a='/'+I['pth'],w=P['map']((p,J)=>{const ph=a0P,{user:q,srv:o,prt:H,name:K,isTrojan:r,tls:s}=a0fI(p,J),d=s?',\x20tls=true,\x20skip-cert-verify=false,\x20sni='+f:ph(0x2d4);return r?K+'\x20=\x20trojan,\x20'+o+',\x20'+H+ph(0x360)+q+',\x20ws=true,\x20ws-path='+a+ph(0x1ef)+f+d:K+ph(0x35a)+o+',\x20'+H+ph(0x372)+q+ph(0x23d)+a+',\x20ws-headers=Host:'+f+d;});return'#!MANAGED-CONFIG\x0a[General]\x0aloglevel\x20=\x20notify\x0adns-server\x20=\x20223.5.5.5,\x20119.29.29.29\x0a\x0a[Proxy]\x0a'+w['join']('\x0a')+pR(0x274)+w[pR(0x3ac)](J=>J['split'](pR(0x21e))[0x0])[pR(0x335)](',\x20')+'\x0a🌐\x20全球直连\x20=\x20select,\x20DIRECT\x0a🐟\x20漏网之鱼\x20=\x20select,\x20🚀\x20节点选择\x0a\x0a[Rule]\x0aGEOIP,CN,DIRECT\x0aFINAL,🐟\x20漏网之鱼\x0a';}function a0fy(I,P){const px=a0P;P=a0fU(P,'Loon');const f=I[px(0x3b3)],a='/'+I[px(0x27a)],w=P['map']((J,q)=>{const pN=a0P,{user:o,srv:H,prt:K,name:r,isTrojan:s,tls:d}=a0fI(J,q),Q=d?',\x20tls=true,\x20skip-cert-verify=false,\x20sni='+f:pN(0x2d4);return s?r+'\x20=\x20trojan,\x20'+H+',\x20'+K+pN(0x360)+o+pN(0x23d)+a+',\x20ws-headers=Host:'+f+Q:r+pN(0x35a)+H+',\x20'+K+',\x20username='+o+pN(0x23d)+a+pN(0x1ef)+f+Q;}),p=w['map'](J=>J[px(0x1aa)](px(0x21e))[0x0])[px(0x335)](',\x20');return'[General]\x0adns-server\x20=\x20223.5.5.5,\x20119.29.29.29\x0a\x0a[Proxy]\x0a'+w[px(0x335)]('\x0a')+px(0x274)+p+'\x0a🌐\x20全球直连\x20=\x20select,\x20DIRECT\x0a🐟\x20漏网之鱼\x20=\x20select,\x20'+p+'\x0a\x0a[Rule]\x0aGEOIP,CN,DIRECT\x0aFINAL,🐟\x20漏网之鱼\x0a';}function a0fe(I,P){const pD=a0P;P=a0fU(P,'Quantumult\x20X');const f=I['hst'],a='/'+I[pD(0x27a)],w=q=>q[pD(0x257)](':')>=0x0?'['+q+']':q,p=P[pD(0x3ac)]((q,o)=>{const pt=a0P,{user:H,srv:K,prt:r,name:s,tls:d}=a0fI(q,o);if(q[pt(0x3b8)](pt(0x3b7)))return d?pt(0x2b4)+w(K)+':'+r+',\x20password='+H+pt(0x2a1)+f+pt(0x3c3)+f+',\x20obfs-uri='+a+',\x20tls-verification=true,\x20tag='+s:'trojan='+w(K)+':'+r+pt(0x360)+H+',\x20over-tls=false,\x20obfs=ws,\x20obfs-host='+f+',\x20obfs-uri='+a+pt(0x2f7)+s;return pt(0x322)+w(K)+':'+r+pt(0x3b1)+H+pt(0x233)+(d?pt(0x296):'ws')+',\x20obfs-host='+f+pt(0x259)+a+(d?',\x20tls-verification=true,\x20tls13=true':'')+',\x20tag='+s;}),J=P[pD(0x3ac)]((q,o)=>{const H=q['indexOf']('#');if(H<0x0)return'节点'+(o+0x1);try{return decodeURIComponent(q['slice'](H+0x1))||'节点'+(o+0x1);}catch(K){return'节点'+(o+0x1);}})[pD(0x335)](',\x20');return pD(0x2fa)+p['join']('\x0a')+'\x0a[policy]\x0astatic=🚀\x20节点选择,\x20'+J+pD(0x252);}const a0fV=0x1f4;async function a0fW(I,P,f,a){const pO=a0P,w=Object[pO(0x2e9)]({},I,{'host':I[pO(0x3b3)]||new URL(P)['hostname']}),p=a0m(I);if(w['ecn'])w[pO(0x1a5)]=!![];const J=I['ft']&&I['ft']['ip']||[],q=J['includes'](pO(0x25c)),o=J['length']===0x1&&J[0x0]==='IPv6',H=I['sc']||{},K=H['nv']===!![],n=H['pd']!==![],r=H['pi']!==![];w['preferredDomains']='',w['preferredIPs']=[];if(K&&!o)w['preferredDomains']=w['host']+pO(0x325);n&&!o&&(w[pO(0x34b)]=(w[pO(0x34b)]?w['preferredDomains']+'\x0a':'')+p);if(r){const b=I['ix']||{},y=W=>b['a'+W]&&b['a'+W+'u']?a0f6(b['a'+W+'u'],0xc8,0x12c,!![],![])[pO(0x2ba)](()=>[]):Promise[pO(0x232)]([]),V=await Promise[pO(0x24d)]([y(0x1),y(0x2),b['hm']!==![]&&!o?a0PF(0x96)['catch'](()=>null):null,b['uo']===!![]?a0Ph(!o,q)[pO(0x2ba)](()=>[]):null,b['wt']===!![]?a0PT(!o,q)['catch'](()=>[]):null]);for(const W of V)if(W&&W['length'])w['preferredIPs']['push'](...W);}if(q&&n)try{const g=o?a0Z(p)+'\x0a'+a0O[pO(0x335)]('\x0a'):p[pO(0x1aa)]('\x0a')['slice'](0x0,a0b)['join']('\x0a'),B=await a0f6(g,0x28,o?0x320:0xf0,!![],pO(0x2cb));if(B&&B['length'])w[pO(0x31e)][pO(0x38e)](...B[pO(0x3ac)]((X,k)=>Object['assign']({},X,{'name':pO(0x35f)+String(k+0x1)[pO(0x249)](0x2,'0')})));}catch(X){}if(!K&&!n&&!r)w[pO(0x34b)]=a0O['map']((k,v)=>k+pO(0x387)+String(v+0x1)[pO(0x249)](0x2,'0'))['join']('\x0a');if(o&&w[pO(0x31e)])w[pO(0x31e)]=w[pO(0x31e)][pO(0x2be)](k=>String(k['ip'])['indexOf'](':')>=0x0);a=(a||'')[pO(0x36a)]();const s=(f||'')[pO(0x36a)](),d=a0fV;let Q=a0fH(await a0f7(w,d),I['ft']);if(!Q['length']){const k=Object[pO(0x2e9)]({},w,{'preferredDomains':a0O[pO(0x3ac)]((v,C)=>v+'#域名-'+String(C+0x1)[pO(0x249)](0x2,'0'))[pO(0x335)]('\x0a'),'preferredIPs':[],'tlo':!![]});Q=await a0f7(k,d);}if(Q[pO(0x1f5)]>d)Q['length']=d;Q=a0PG(Q);let l,U;if(s==='clash'||s==='stash')l=pO(0x1cb),U=a0fr(w,Q);else{if(s===pO(0x2ae)||s==='sing-box')l=pO(0x33a),U=a0fl(w,Q);else{if(s==='surge')l='text/plain',U=a0fb(w,Q);else{if(s===pO(0x1e8))l='text/plain',U=a0fs(w,Q);else{if(s==='loon')l='text/plain',U=a0fy(w,Q);else{if(s==='quanx'||s==='quantumultx')l='text/plain',U=a0fe(w,Q);else{if(s==='plain'||s==='raw')l=pO(0x311),U=Q['join']('\x0a');else{if(s==='v2ray'||s==='v2rayn'||s===pO(0x289)||s==='nekoray')l=pO(0x311),U=Q['join']('\x0a');else{if(a[pO(0x302)](pO(0x240))||a[pO(0x302)](pO(0x241)))l='text/yaml',U=a0fr(w,Q);else{if(a[pO(0x302)]('sing-box'))l='application/json',U=a0fl(w,Q);else{if(a[pO(0x302)]('surge'))l='text/plain',U=a0fb(w,Q);else{if(a['includes'](pO(0x1e8)))l='text/plain',U=a0fs(w,Q);else{if(a['includes']('loon'))l='text/plain',U=a0fy(w,Q);else a['includes']('quantumult')?(l='text/plain',U=a0fe(w,Q)):(l='text/plain',U=Q['join']('\x0a'));}}}}}}}}}}}}return{'type':l,'body':U,'count':Q['length']};}const a0fg=String[a0aw(0x2d8)]`
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

`,a0fB=String['raw']`
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

`;function a0fX(I){const pT=a0P;return(I||'')[pT(0x36a)]()['includes'](pT(0x2b9));}function a0fk(I,P){const pm=a0P;I=String(I),P=String(P);let f=I['length']^P['length'];const w=Math[pm(0x28a)](I['length'],P['length']);for(let p=0x0;p<w;p++)f|=(I[pm(0x2ed)](p)||0x0)^(P[pm(0x2ed)](p)||0x0);return f===0x0;}async function a0fv(I,P){const pZ=a0P,f=await crypto[pZ(0x1c4)][pZ(0x371)](pZ(0x2d8),a0u['encode'](I),{'name':'HMAC','hash':pZ(0x212)},![],[pZ(0x3ca)]),a=await crypto[pZ(0x1c4)][pZ(0x3ca)](pZ(0x23f),f,a0u[pZ(0x1be)](P));return Array[pZ(0x323)](new Uint8Array(a))[pZ(0x3ac)](w=>w['toString'](0x10)['padStart'](0x2,'0'))[pZ(0x335)]('');}const a0fC='hopline-pbkdf2$',a0fM=0x2710,a0fL=I=>Array[a0aw(0x323)](I)['map'](P=>P[a0aw(0x248)](0x10)[a0aw(0x249)](0x2,'0'))[a0aw(0x335)](''),a0fz=I=>Uint8Array['from']((String(I)['match'](/../g)||[])['map'](P=>parseInt(P,0x10)));async function a0fE(I,P,f){const pc=a0P,a=await crypto['subtle'][pc(0x371)](pc(0x2d8),a0u['encode'](I),'PBKDF2',![],[pc(0x2b8)]);return a0fL(new Uint8Array(await crypto['subtle']['deriveBits']({'name':pc(0x1fc),'hash':pc(0x212),'salt':P,'iterations':f},a,0x100)));}function a0fY(I){const pu=a0P;return typeof I===pu(0x1c5)&&I[pu(0x3b8)](a0fC);}async function a0fF(I){const pG=a0P,P=crypto[pG(0x258)](new Uint8Array(0x10));return a0fC+a0fM+'$'+a0fL(P)+'$'+await a0fE(I,P,a0fM);}async function a0fS(I,P){const pi=a0P;I=String(I||''),P=String(P==null?'':P);if(!I)return![];if(!a0fY(I))return a0fk(P,I);const f=I[pi(0x21c)](a0fC[pi(0x1f5)])[pi(0x1aa)]('$'),a=parseInt(f[0x0],0xa);if(f['length']!==0x3||!(a>=0x3e8&&a<=0x186a0)||!f[0x1]||!f[0x2])return![];return a0fk(await a0fE(P,a0fz(f[0x1]),a),f[0x2]);}const a0fA=0x18*0x3c*0x3c*0x3e8,a0fj=0x7*0x18*0x3c*0x3c*0x3e8,a0fR=0xa*0x3c*0x3e8;function a0fh(I){const J0=a0P;return String(I[J0(0x1fb)]||'')||J0(0x384);}function a0fx(I){const J1=a0P;return J1(0x1c7)+String(I[J1(0x391)])+'|'+String(I['uid'])+'|'+a0fh(I);}async function a0fN(I,P){const J2=a0P,f=Date['now']();P=P||f;const a=Math[J2(0x287)](f+a0fA,P+a0fj);return{'token':a+'.'+P+'.'+await a0fv(a0fx(I),a+'.'+P),'exp':a};}async function a0fD(I,P,f){const J3=a0P;if(!P['adp'])return![];const a=I[J3(0x2e0)][J3(0x230)](J3(0x1f7))||'',w=a['match'](/(?:^|;\s*)hopline_auth=([^;]+)/);if(!w)return![];const p=w[0x1]['split']('.');if(p['length']!==0x3||!/^\d+$/['test'](p[0x0])||!/^\d+$/['test'](p[0x1])||!p[0x2])return![];const J=Number(p[0x0]),q=Number(p[0x1]),o=Date[J3(0x294)]();if(J<o||o-q>a0fj)return![];if(!a0fk(p[0x2],await a0fv(a0fx(P),p[0x0]+'.'+p[0x1])))return![];const H={'exp':J,'iat':q};if(f&&Math['min'](o+a0fA,q+a0fj)-J>=a0fR){const K=await a0fN(P,q);f[J3(0x364)]=a0a1(K[J3(0x319)],K['exp']);}return H;}const a0ft=new Map(),a0fO=0x5,a0fT=0xf*0x3c*0x3e8,a0fm=0x1388;function a0fZ(I){const J4=a0P;I=String(I||J4(0x334));if(I[J4(0x257)](':')<0x0)return I;const P=I[J4(0x257)]('::');let f;if(P>=0x0){const a=I[J4(0x21c)](0x0,P)['split'](':')['filter'](Boolean),w=I[J4(0x21c)](P+0x2)['split'](':')[J4(0x2be)](Boolean);f=[...a,...Array(Math[J4(0x28a)](0x0,0x8-a['length']-w['length']))[J4(0x22a)]('0'),...w];}else f=I[J4(0x1aa)](':');return f['slice'](0x0,0x4)[J4(0x3ac)](p=>(p||'0')[J4(0x36a)]()[J4(0x206)](/^0+(?=.)/,''))['join'](':')+J4(0x215);}function a0fc(I){const J5=a0P,P=a0fZ(I),f=a0ft['get'](P);if(!f)return![];if(Date[J5(0x294)]()-f['t']>a0fT)return a0ft['delete'](P),![];return f['n']>=a0fO;}function a0fu(I){const J6=a0P,P=a0fZ(I),f=Date['now'](),a=a0ft[J6(0x230)](P);if(!a||f-a['t']>a0fT)a0ft['delete'](P),a0ft[J6(0x235)](P,{'n':0x1,'t':f});else a['n']++;while(a0ft['size']>a0fm)a0ft['delete'](a0ft['keys']()[J6(0x1bb)]()['value']);}function a0fG(I){const J7=a0P;a0ft[J7(0x23e)](a0fZ(I));}function a0fi(I,P){const J8=a0P;I=String(I||'');if(!/^\/[^\/\\]/['test'](I))return![];let f=I[J8(0x21c)](0x1)['split'](/[\/?#]/)[0x0];try{f=decodeURIComponent(f);}catch(a){return![];}return f===P;}function a0a0(I,P){const J9=a0P;return I=String(I||''),/^\/[^\/\\]/[J9(0x362)](I)?I:'/'+P;}function a0a1(I,P){const JI=a0P,f=Math[JI(0x28a)](0x0,Math[JI(0x280)]((P-Date['now']())/0x3e8));return JI(0x306)+I+';\x20Path=/;\x20Max-Age='+f+';\x20HttpOnly;\x20Secure;\x20SameSite=Lax';}function a0a2(I,P){const JP=a0P,f=a0h(I);return f[JP(0x35e)]=a0f,f['adpSet']=!!I[JP(0x391)],delete f['adp'],f[JP(0x27a)]=I['pth'],f['panelPath']=I[JP(0x27a)],f[JP(0x2ea)]=a0x(P),f['kv']=!!(a0W(P)&&typeof a0W(P)['put']===JP(0x2fc)),f['builtinPrefDomains']=a0T[JP(0x1aa)]('\x0a'),f['kvError']=I[JP(0x2f6)]?a0a3(I['_kvError']):'',f;}function a0a3(I){return I==='corrupt'?'KV\x20中保存的配置已损坏（不是合法\x20JSON），当前使用的是环境变量与默认值':'KV\x20暂时无法读取，当前使用的是环境变量与默认值';}function a0a4(I){const Jf=a0P;return I[Jf(0x3ac)](P=>(P['label']?P[Jf(0x2ff)]+'：':'')+P[Jf(0x32d)])[Jf(0x335)]('；');}async function a0a5(I,P,f,a){const Ja=a0P,w=I['headers']['get']('User-Agent')||'';return a0fW(Object[Ja(0x2e9)]({},f),I['url'],a,w);}let a0a6=null;function a0a7(){const Jw=a0P;return!a0a6&&(a0a6=a0fg['replace'](Jw(0x1ff),()=>JSON[Jw(0x358)](a0t())['replace'](/</g,'\x5cu003c'))[Jw(0x206)](Jw(0x27c),()=>'('+checkFieldValue['toString']()+')')['replace'](Jw(0x1ee),()=>JSON['stringify']([...a0c]))),a0a6;}function a0a8(I,P){const Jp=a0P,f=[];!P[Jp(0x27a)]&&f[Jp(0x38e)](P[Jp(0x348)]?Jp(0x398)+P[Jp(0x348)]+'。':Jp(0x299));if(P[Jp(0x2cc)])f[Jp(0x38e)]('未绑定\x20KV\x20命名空间（绑定变量名\x20CONFIG_KV）时，必须设置环境变量\x20UUID（节点用户\x20ID）；绑定\x20KV\x20后可留空，系统会自动生成并保存。');return f[Jp(0x335)]('\x0a');}function a0a9(){const JJ=a0P;return new Response(JJ(0x3d4),{'status':0xc8,'headers':{'Content-Type':JJ(0x2dc)}});}async function a0aI(I,P,f){const Jq=a0P,a=new URL(I['url']),w=I[Jq(0x2e0)]['get']('User-Agent')||'',p=(I['headers']['get'](Jq(0x3a3))||'')['toLowerCase']();if(a['protocol']==='http:'&&p!==Jq(0x357))return Response['redirect'](a['href'][Jq(0x206)](Jq(0x312),Jq(0x2eb)),0x12d);const J=await a0IJ(P);if(J['_kvError']&&!a0Iq(P))return new Response(Jq(0x1a8),{'status':0x1f7,'headers':{'Content-Type':Jq(0x314),'Retry-After':'30'}});const q=a0a8(P,J);if(q)return new Response(q,{'status':0x1f7,'headers':{'Content-Type':Jq(0x314),'Cache-Control':Jq(0x224)}});const o=J[Jq(0x27a)],H=a['pathname']['replace'](/^\/+|\/+$/g,''),K=H[Jq(0x1aa)]('/');if(K[0x0]==='version'){if(!await a0fD(I,J,f))return new Response('Not\x20Found',{'status':0x194});return a0Ip({'version':a0f});}if(K[0x0]===Jq(0x21b)){if(!J['adp'])return new Response(Jq(0x218),{'status':0x194});if(I[Jq(0x3c1)]===Jq(0x29c)){const U=I[Jq(0x2e0)][Jq(0x230)]('CF-Connecting-IP')||'unknown',b=await I[Jq(0x2bf)](),y=new URLSearchParams(b);if(!a0fi(y['get']('next'),o))return new Response('Not\x20Found',{'status':0x194});if(a0fc(U))return a0Ip({'ok':![],'msg':Jq(0x1f6)},0x1ad);const V=a0fk(y[Jq(0x230)](Jq(0x1d5))||'',a0fh(J)),W=await a0fS(J[Jq(0x391)],y['get'](Jq(0x24e))||'');if(V&&W){a0fG(U);const g=await a0fN(J);return new Response(JSON[Jq(0x358)]({'ok':!![],'next':a0a0(y['get']('next'),o)}),{'status':0xc8,'headers':{'Content-Type':Jq(0x25d),'Set-Cookie':a0a1(g['token'],g[Jq(0x3b4)])}});}return a0fu(U),a0Ip({'ok':![],'msg':Jq(0x36e)},0x193);}if(!a0fi(a[Jq(0x30c)][Jq(0x230)]('next'),o))return new Response(Jq(0x218),{'status':0x194});return new Response(a0fB,{'status':0xc8,'headers':{'Content-Type':'text/html;\x20charset=utf-8'}});}const n=String(J['sbu']||'')['trim']()[Jq(0x206)](/^\/+/,'')[Jq(0x206)](/\/+$/,''),s=n||J[Jq(0x329)],Q=K[0x0]===o,l=Q||K[0x0]===s;if(K[0x0]==='')return a0a9();if(Q&&K['length']===0x1){if(p===Jq(0x357))return a0Pe(I,J);if(I['method']==='POST'){if(J[Jq(0x1b2)])try{return await a0PV(I,J);}catch(B){return a0Ip({'ok':![],'msg':Jq(0x276)+(B[Jq(0x39c)]||B)},0x1f4);}}}if(l&&(K[0x1]==='sub'||K[Jq(0x1f5)]===0x1&&!a0fX(w))){const X=K['length']>=0x3?K[0x2]:'';try{const k=await a0a5(I,P,J,X);return new Response(k[Jq(0x2f1)],{'status':0xc8,'headers':{'Content-Type':k[Jq(0x219)]+Jq(0x381),'Cache-Control':Jq(0x224),'Content-Disposition':'attachment;\x20filename=\x22Hopline\x22;\x20filename*=utf-8\x27\x27Hopline'}});}catch(C){return new Response(Jq(0x1ba)+(C&&C['message']||C),{'status':0x1f4,'headers':{'Content-Type':'text/plain;\x20charset=utf-8'}});}}if(Q&&K['length']===0x1&&a0fX(w)){if(!J[Jq(0x391)])return new Response(Jq(0x367),{'status':0x193,'headers':{'Content-Type':'text/plain;\x20charset=utf-8'}});if(!await a0fD(I,J,f))return Response[Jq(0x26b)](new URL('/login?next='+encodeURIComponent('/'+o),I['url'])[Jq(0x33c)],0x12e);return new Response(a0a7(),{'status':0xc8,'headers':{'Content-Type':Jq(0x2dc),'Cache-Control':Jq(0x224)}});}if(Q&&K[0x1]===Jq(0x221)){const M=K[0x2]||'',L=await a0fD(I,J,f);if(!L)return a0Ip({'ok':![],'status':0x193,'msg':Jq(0x1ae)},0x193);if(M==='config'){if(I['method']==='GET')return a0Ip({'ok':!![],'data':a0a2(J,P)});if(I['method']===Jq(0x29c)){if(J[Jq(0x2f6)])return a0Ip({'ok':![],'msg':a0a3(J['_kvError'])+'，为避免覆盖已有配置，已禁止保存'},0x1f7);const z=a0W(P);if(!z||typeof z['put']!==Jq(0x2fc))return a0Ip({'ok':![],'msg':Jq(0x1ea)},0x190);let E;try{E=await I['json']();}catch(Y){return a0Ip({'ok':![],'msg':'请求体不是合法的\x20JSON'},0x190);}try{const {patch:F,errors:S,ignored:A}=a0N(E,P);if(S['length'])return a0Ip({'ok':![],'msg':a0a4(S),'errors':S,'ignored':A},0x190);const j=a0h(J);for(const D of a0v){const O=a0S(F,D['key']);if(O!==undefined)a0A(j,D[Jq(0x354)],O);}const R=a0D(j);if(R['length'])return a0Ip({'ok':![],'msg':a0a4(R),'errors':R,'ignored':A},0x190);if(j[Jq(0x391)]&&!a0fY(j['adp'])&&!a0x(P)['adp'])j['adp']=await a0fF(j['adp']);const h=await a0Ir(P,j),x=a0In(P,h),N={};if(x['adp']&&a0fx(x)!==a0fx(J)){const T=await a0fN(x,L[Jq(0x383)]);N[Jq(0x213)]=a0a1(T[Jq(0x319)],T['exp']);}return a0Ip({'ok':!![],'data':a0a2(x,P),'ignored':A,'msg':'已保存：本地区立即生效，其他地区约\x201\x20分钟内同步'},0xc8,N);}catch(m){return a0Ip({'ok':![],'msg':'保存失败:\x20'+(m['message']||m)},0x1f4);}}return a0Ip({'ok':![],'msg':Jq(0x2bc)},0x195);}if(M===Jq(0x1a9)){if(I[Jq(0x3c1)]!==Jq(0x29c))return a0Ip({'ok':![],'msg':Jq(0x38b)},0x195);return a0Ip({'ok':!![],'msg':'已退出登录'},0xc8,{'Set-Cookie':'hopline_auth=;\x20Path=/;\x20Max-Age=0;\x20HttpOnly;\x20Secure;\x20SameSite=Lax'});}if(M===Jq(0x2f4)){if(I['method']!==Jq(0x29c))return a0Ip({'ok':![],'msg':'仅支持\x20POST'},0x195);try{if(J['_kvError']===Jq(0x211))return a0Ip({'ok':![],'msg':a0a3(J[Jq(0x2f6)])+'，暂时无法重置'},0x1f7);const Z=a0W(P);if(!Z||typeof Z['delete']!==Jq(0x2fc))return a0Ip({'ok':![],'msg':Jq(0x21f)},0x190);return await Z[Jq(0x23e)]('config'),a0Ip({'ok':!![],'msg':Jq(0x2ad)});}catch(c){return a0Ip({'ok':![],'msg':'重置失败:\x20'+(c['message']||c)},0x1f4);}}if(M===Jq(0x202))return a0Ip({'ok':!![],'data':{'version':a0f,'host':a[Jq(0x29f)],'path':o,'region':I['cf']&&I['cf']['colo']||'unknown','kv':!!(a0W(P)&&typeof a0W(P)[Jq(0x230)]===Jq(0x2fc)),'workersDev':/\.workers\.dev$/i['test'](a[Jq(0x29f)])}});if(M===Jq(0x3d7))try{const u=await a0n(),G={'current':u[Jq(0x20f)],'latest':u[Jq(0x2b3)],'hasUpdate':u[Jq(0x28e)],'error':u[Jq(0x380)]||''};if(u[Jq(0x28e)]&&u['code'])G[Jq(0x363)]=u[Jq(0x363)];return a0Ip({'ok':!![],'data':G});}catch(i){return a0Ip({'ok':![],'msg':Jq(0x207)+(i['message']||i)},0x1f4);}if(M==='ipsrc-test'){if(I['method']!=='POST')return a0Ip({'ok':![],'msg':'仅支持\x20POST'},0x195);let I0={};try{I0=await I[Jq(0x30e)]();}catch(I5){}const I1=String(I0&&I0['source']||''),I2=Date[Jq(0x294)]();let I3;if(I1===Jq(0x2e4))I3=await a0PY(0x96);else{if(I1==='uouin')I3=await a0PR();else{if(I1==='wetest')I3=await a0PO();else{if(I1==='domains'){const I6=a0Y['domainList'](String(I0&&I0[Jq(0x2bf)]||''));if(typeof I6===Jq(0x1c5))return a0Ip({'ok':![],'msg':I6},0x190);I3=await a0Pm(I6[Jq(0x350)]?I6[Jq(0x350)][Jq(0x1aa)]('\x0a'):a0T['split']('\x0a'));}else{if(I1===Jq(0x284)||I1==='api2'){const I7=checkFieldValue(a0F[Jq(0x230)](Jq(0x1de)+I1[Jq(0x21c)](0x3)+'u'),I0['url']);if(I7[Jq(0x380)]||!I7['value'])return a0Ip({'ok':![],'msg':I7[Jq(0x380)]||Jq(0x2dd)},0x190);I3=await a0Px(I7[Jq(0x350)]);}else return a0Ip({'ok':![],'msg':Jq(0x1c9)+I1},0x190);}}}}const I4=0xfa0;return a0Ip({'ok':!![],'data':{'source':I1,'ms':Date[Jq(0x294)]()-I2,'status':I3['status'],'error':I3[Jq(0x380)]||'','count':I3[Jq(0x1a7)][Jq(0x1f5)],'items':I3[Jq(0x1a7)]['slice'](0x0,0x12c),'droppedCount':I3[Jq(0x2a9)][Jq(0x1f5)],'dropped':I3['dropped'][Jq(0x21c)](0x0,0x32),'raw':I3[Jq(0x2d8)][Jq(0x21c)](0x0,I4),'rawLength':I3['raw']['length'],'domains':I3[Jq(0x316)]}});}if(M===Jq(0x3a5)){const I8=a[Jq(0x30c)][Jq(0x230)]('fmt')||'';try{const I9=await a0a5(I,P,J,I8);return a0Ip({'ok':!![],'type':I9[Jq(0x219)],'body':I9[Jq(0x2f1)],'count':I9[Jq(0x34f)]});}catch(II){return a0Ip({'ok':![],'msg':'订阅生成失败:\x20'+(II['message']||II)},0x1f4);}}return a0Ip({'ok':![],'msg':'未知\x20API:\x20'+M},0x194);}return a0a9();}const a0aP=a0aw(0x359);function a0af(I){const Jo=a0P;if(!I||I['status']===0x65||I['webSocket'])return I;const P=I['headers'][Jo(0x230)](Jo(0x39a))||'',f=/^text\/html/i[Jo(0x362)](P),a=/^application\/json/i['test'](P);if(!f&&!a)return I;const w=new Headers(I[Jo(0x2e0)]);return w['set'](Jo(0x1ed),Jo(0x1ad)),w['set']('Referrer-Policy',Jo(0x3bb)),f&&(w[Jo(0x235)]('Content-Security-Policy',a0aP),w['set']('X-Frame-Options','DENY')),new Response(I['body'],{'status':I['status'],'statusText':I[Jo(0x38f)],'headers':w});}export default{async 'fetch'(I,P){const JH=a0P,f={};let a=await a0aI(I,P,f);return f['setCookie']&&a['status']!==0x65&&!a[JH(0x2e0)]['has']('Set-Cookie')&&(a=new Response(a['body'],a),a['headers']['set']('Set-Cookie',f[JH(0x364)])),a0af(a);}};
