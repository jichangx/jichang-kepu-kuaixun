# 机场科普与快讯:测速怎么读、协议与内核是什么、订阅安全、客户端版本动态(每日同步)

![更新](https://img.shields.io/badge/更新-2026--09--24-00e676) ![科普](https://img.shields.io/badge/科普文章-34%20篇-00b0ff) ![快讯](https://img.shields.io/badge/快讯-16%20条-fbbf24) [![来源](https://img.shields.io/badge/内容来源-机场帮%20·%20机场探-f87171)](https://jichangtan.com/articles/) [![Telegram](https://img.shields.io/badge/Telegram-%40jichangcha-26A5E4?logo=telegram&logoColor=white)](https://t.me/jichangcha)

把用机场时会遇到、但很少有人系统讲清楚的事写明白:测速图怎么读、节点名里的符号什么意思、Shadowsocks / VLESS / Hysteria 2 / AnyTLS 这些协议差在哪、Mihomo / sing-box / Xray 内核是什么关系、哪些客户端已经没人维护。科普来自 [机场帮「机场杂谈」](https://www.jichanghelp.com/category/airport-talk/) 与 [机场探科普栏目](https://jichangtan.com/articles/),快讯来自机场探动态栏目与机场帮最新文章,每天自动同步。

> 🔗 相关仓库:[2026 机场推荐清单](https://github.com/jichangx/2026-jichangcha-tuijian) · [翻墙科普攻略](https://github.com/jichangx/fanqiang-kepu) · [客户端下载与教程](https://github.com/jichangx/jichang-kehuduan) · [跑路机场预警](https://github.com/jichangx/airport-status) · [机场查精品聚合](https://github.com/jichangx)

## 📰 快讯:客户端版本更新与服务动态(机场探)

- [Quantumult X 1.8.0 发布：针对 iOS 27 优化，最低系统要求提高到 iOS 15](https://jichangtan.com/articles/quantumult-x-1-8-0/)
- [mihomo v1.19.31 发布：新增 EasyTier 出站，修复 Hysteria 与 Hysteria2 的 UDP 问题](https://jichangtan.com/articles/mihomo-v1-19-31/)
- [Surge 5.22.1（iOS）发布：GEOIP 与 IP-ASN 规则支持 UNKNOWN，修复 Hysteria UDP 转发异常](https://jichangtan.com/articles/surge-5-22-1/)
- [FlClash v0.8.97 发布：界面、安卓 VPN 服务与桌面端大范围重构，新增可选的本地代理认证](https://jichangtan.com/articles/flclash-v0-8-97/)
- [Shadowrocket 2.2.92 发布：新增 Sudoku 协议，扩充 DNS 与 Tailscale 功能，可导入更多类型的 Clash 订阅节点](https://jichangtan.com/articles/shadowrocket-2-2-92/)
- [Sparkle 1.26.8 发布：Linux 系统服务新增运行模式选项，出错可查看详情，外部链接只放行 http 与 https](https://jichangtan.com/articles/sparkle-1-26-8/)
- [sing-box 1.14.0 发布：苹果客户端改名重新上架，新增 Snell 与 OpenVPN 支持，DNS 规则大改](https://jichangtan.com/articles/sing-box-v1-14-0/)
- [v2rayN 7.24.9 发布：修复内置下载器安全漏洞，新增自定义出站与 WireGuard 远程 DNS](https://jichangtan.com/articles/v2rayn-7-24-9/)

## 📰 快讯:机场帮最新文章

- [软件不走代理怎么办，按四步顺序排查](https://www.jichanghelp.com/articles/app-not-using-proxy/) · 2026-08-13
- [你装的那个客户端，可能已经没人维护了](https://www.jichanghelp.com/articles/discontinued-clients/) · 2026-08-13
- [DNS 泄漏时运营商能看到什么，看不到什么](https://www.jichanghelp.com/articles/dns-leak-what-isp-sees/) · 2026-08-13
- [节点列表里的网址是什么，选中为什么连不上](https://www.jichanghelp.com/articles/fake-nodes-in-list/) · 2026-08-13
- [节点名字里那串符号各是什么意思](https://www.jichanghelp.com/articles/how-to-read-node-names/) · 2026-08-13
- [机场流量怎么算，倍率、重置日和到期日各管什么](https://www.jichanghelp.com/articles/how-traffic-is-counted/) · 2026-08-13
- [一家机场靠不靠谱，自己能查到哪一步](https://www.jichanghelp.com/articles/how-we-verify-brands/) · 2026-08-13
- [iPhone 上四个客户端怎么选，先过 Apple ID 这一关](https://www.jichanghelp.com/articles/ios-client-comparison/) · 2026-08-13

## 📚 机场杂谈:那些没人明说的机场常识(机场帮)

- [软件不走代理怎么办，按四步顺序排查](https://www.jichanghelp.com/articles/app-not-using-proxy/)
- [你装的那个客户端，可能已经没人维护了](https://www.jichanghelp.com/articles/discontinued-clients/)
- [DNS 泄漏时运营商能看到什么，看不到什么](https://www.jichanghelp.com/articles/dns-leak-what-isp-sees/)
- [节点列表里的网址是什么，选中为什么连不上](https://www.jichanghelp.com/articles/fake-nodes-in-list/)
- [节点名字里那串符号各是什么意思](https://www.jichanghelp.com/articles/how-to-read-node-names/)
- [机场流量怎么算，倍率、重置日和到期日各管什么](https://www.jichanghelp.com/articles/how-traffic-is-counted/)
- [一家机场靠不靠谱，自己能查到哪一步](https://www.jichanghelp.com/articles/how-we-verify-brands/)
- [iPhone 上四个客户端怎么选，先过 Apple ID 这一关](https://www.jichanghelp.com/articles/ios-client-comparison/)
- [单线程和多线程测速差在哪，为什么测速好看晚上却卡](https://www.jichanghelp.com/articles/single-vs-multi-thread-speedtest/)
- [订阅地址等于账号密码，泄露之后怎么补救](https://www.jichanghelp.com/articles/subscription-link-security/)
- [找不到添加订阅的地方，各客户端入口都在哪](https://www.jichanghelp.com/articles/where-to-add-subscription/)
- [装客户端时弹的那些警告，哪些能点确定](https://www.jichanghelp.com/articles/windows-security-prompts/)
- [HTTPS 普及之后，公共 Wi-Fi 还剩下哪些风险](https://www.jichanghelp.com/articles/https-and-public-wifi/)
- [机场推荐那么多，到底该怎么选](https://www.jichanghelp.com/articles/how-to-choose-airport/)

更多:[机场帮全部文章](https://www.jichanghelp.com/articles/) · [术语库](https://www.jichanghelp.com/glossary/) · [故障排查](https://www.jichanghelp.com/category/troubleshooting/)

## 📖 机场科普(机场探)

- [机场订阅链接为什么要保密，泄露了怎么办](https://jichangtan.com/articles/subscription-link-safety/)
- [机场是什么：订阅、节点、倍率与流量怎么理解](https://jichangtan.com/articles/airport-basics/)
- [机场说的专线、中转和直连是什么意思](https://jichangtan.com/articles/relay-and-dedicated-lines/)
- [如何留意机场的经营风险信号](https://jichangtan.com/articles/airport-risk-signals/)
- [怎么看机场测速数据：延迟、可用性与下载速度各说明什么](https://jichangtan.com/articles/read-speed-test-data/)

## 🔐 协议科普(机场探)

- [机场常见代理协议怎么区分：Shadowsocks、VMess、VLESS、Trojan、Hysteria 2、TUIC、AnyTLS 总览](https://jichangtan.com/articles/proxy-protocols-overview/)
- [AnyTLS 协议是什么：设计目标、会话复用与内核支持](https://jichangtan.com/articles/anytls-protocol/)
- [Hysteria 2 协议是什么：QUIC、带宽参数与端口跳跃](https://jichangtan.com/articles/hysteria2-protocol/)
- [REALITY 与 XTLS Vision 是什么：VLESS 节点里的两个关键设置](https://jichangtan.com/articles/vless-reality-vision/)
- [Shadowsocks 与 Shadowsocks 2022 是什么：加密方式、密钥格式与内核支持](https://jichangtan.com/articles/shadowsocks-2022/)
- [Trojan 协议是什么：工作方式、节点参数与内核支持](https://jichangtan.com/articles/trojan-protocol/)
- [TUIC v5 协议是什么：QUIC 代理、UDP 转发模式与支持情况](https://jichangtan.com/articles/tuic-v5-protocol/)
- [VMess 与 VLESS 有什么区别：加密方式、时间要求与内核支持](https://jichangtan.com/articles/vmess-vs-vless/)

## ⚙️ 内核科普(机场探)

- [代理内核是什么：内核、客户端与订阅格式的关系](https://jichangtan.com/articles/what-is-proxy-core/)
- [Mihomo（原 Clash Meta）内核是什么：来历、配置格式与常见客户端](https://jichangtan.com/articles/mihomo-core/)
- [sing-box 内核是什么：配置结构、协议支持与官方客户端](https://jichangtan.com/articles/sing-box-core/)
- [V2Ray（V2Fly）内核是什么：原仓库、V2Fly 与 v4、v5 两代配置](https://jichangtan.com/articles/v2ray-core/)
- [Xray-core 是什么：Project X 的来历、版本规则与常见客户端](https://jichangtan.com/articles/xray-core/)

## 📜 生态纪事(机场探)

- [Clash 生态纪事：从 Clash、Clash.Meta 到 Mihomo](https://jichangtan.com/articles/clash-ecosystem-chronicle/)
- [V2Ray、Xray 与 sing-box 分化纪事：从 Project V 到三个独立内核](https://jichangtan.com/articles/v2ray-xray-singbox-chronicle/)

更多:[机场探全部科普与快讯](https://jichangtan.com/articles/) · [测量方法与数据说明](https://jichangtan.com/methodology/)

## 📌 声明

- 文章版权归机场帮与机场探,本仓库只做目录镜像与导航,每天自动同步;内容仅供学习交流,请遵守当地法律法规
- 收录与核验口径见 [机场帮编辑政策](https://www.jichanghelp.com/editorial-policy/) 与 [机场探编辑、推荐与更正政策](https://jichangtan.com/editorial-policy/)
- 反馈:[Issues](../../issues) · Telegram [@jichangcha_chat](https://t.me/jichangcha_chat)

⭐ 觉得有用请点个 Star,新文章会自动出现在这里。
