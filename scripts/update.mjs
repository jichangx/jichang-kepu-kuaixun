/**
 * 机场科普与快讯 README 生成器
 * - 科普:机场帮「机场杂谈」栏目 https://www.jichanghelp.com/category/airport-talk/
 *        机场探 科普栏目(机场科普 / 协议 / 内核 / 纪事)https://jichangtan.com/articles/
 * - 快讯:机场探 动态栏目 https://jichangtan.com/articles/category/news/ + 机场帮 RSS 最新文章
 * - GitHub Actions 每日运行(.github/workflows/daily-update.yml),有变化才提交
 * 用法:node scripts/update.mjs
 */
import { writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HELP = 'https://www.jichanghelp.com';
const TAN = 'https://jichangtan.com';
const TALK = `${HELP}/category/airport-talk/`;
const RSS = `${HELP}/rss.xml`;
const TAN_CATS = [
  { slug: 'knowledge', emoji: '📖', title: '机场科普' },
  { slug: 'protocol', emoji: '🔐', title: '协议科普' },
  { slug: 'core', emoji: '⚙️', title: '内核科普' },
  { slug: 'chronicle', emoji: '📜', title: '生态纪事' },
];
const today = new Date().toISOString().slice(0, 10);
const UA = { 'user-agent': 'jichangx-kepu-kuaixun' };

const decode = (s) =>
  String(s)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

async function getText(url) {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error(String(r.status));
    return await r.text();
  } catch (e) {
    console.log('抓取失败(忽略):', url, e.message);
    return null;
  }
}
const articleLinks = (html, prefix) => {
  if (!html) return [];
  const seen = new Set();
  return [...html.matchAll(/<a[^>]+href="(\/[^"#?]+\/)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map((m) => ({ path: m[1], title: decode(m[2]) }))
    .filter((l) => l.path.startsWith(prefix) && !l.path.includes('/category/') && l.path !== prefix && l.title.length > 8)
    .filter((l) => !seen.has(l.path) && seen.add(l.path));
};

/* 科普:机场帮 机场杂谈 */
const talk = articleLinks(await getText(TALK), '/articles/');

/* 科普:机场探 四个栏目 */
const tanSections = [];
for (const c of TAN_CATS) {
  const list = articleLinks(await getText(`${TAN}/articles/category/${c.slug}/`), '/articles/');
  if (list.length) tanSections.push({ ...c, list });
}

/* 快讯:机场探 动态 + 机场帮 RSS */
const tanNews = articleLinks(await getText(`${TAN}/articles/category/news/`), '/articles/').slice(0, 10);
const rssXml = await getText(RSS);
const helpLatest = rssXml
  ? [...rssXml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((m) => {
        const b = m[1];
        const title = (b.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
        const link = (b.match(/<link>([\s\S]*?)<\/link>/) || [])[1];
        const pub = (b.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1];
        const d = pub ? new Date(pub) : null;
        return { title: title ? decode(title) : '', link: link ? decode(link) : '', date: d && !isNaN(d) ? d.toISOString().slice(0, 10) : '' };
      })
      .filter((i) => i.title && i.link)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 8)
  : [];

if (talk.length < 5 && tanSections.length === 0 && existsSync(join(ROOT, 'README.md'))) {
  console.log('抓取结果不足,保留现有 README');
  process.exit(0);
}
const tanTotal = tanSections.reduce((n, s) => n + s.list.length, 0);

const readme = `# 机场科普与快讯:测速怎么读、协议与内核是什么、订阅安全、客户端版本动态(每日同步)

![更新](https://img.shields.io/badge/更新-${today.replace(/-/g, '--')}-00e676) ![科普](https://img.shields.io/badge/科普文章-${talk.length + tanTotal}%20篇-00b0ff) ![快讯](https://img.shields.io/badge/快讯-${tanNews.length + helpLatest.length}%20条-fbbf24) [![来源](https://img.shields.io/badge/内容来源-机场帮%20·%20机场探-f87171)](${TAN}/articles/) [![Telegram](https://img.shields.io/badge/Telegram-%40jichangcha-26A5E4?logo=telegram&logoColor=white)](https://t.me/jichangcha)

把用机场时会遇到、但很少有人系统讲清楚的事写明白:测速图怎么读、节点名里的符号什么意思、Shadowsocks / VLESS / Hysteria 2 / AnyTLS 这些协议差在哪、Mihomo / sing-box / Xray 内核是什么关系、哪些客户端已经没人维护。科普来自 [机场帮「机场杂谈」](${TALK}) 与 [机场探科普栏目](${TAN}/articles/),快讯来自机场探动态栏目与机场帮最新文章,每天自动同步。

> 🔗 相关仓库:[2026 机场推荐清单](https://github.com/jichangx/2026-jichangcha-tuijian) · [翻墙科普攻略](https://github.com/jichangx/fanqiang-kepu) · [客户端下载与教程](https://github.com/jichangx/jichang-kehuduan) · [跑路机场预警](https://github.com/jichangx/airport-status) · [机场查精品聚合](https://github.com/jichangx)

## 📰 快讯:客户端版本更新与服务动态(机场探)

${tanNews.length ? tanNews.map((n) => `- [${n.title}](${TAN}${n.path})`).join('\n') : `- 暂时拉取失败,直接看 [机场探动态](${TAN}/articles/category/news/)`}

## 📰 快讯:机场帮最新文章

${helpLatest.length ? helpLatest.map((a) => `- [${a.title}](${a.link})${a.date ? ` · ${a.date}` : ''}`).join('\n') : `- 暂时拉取失败,直接看 [机场帮](${HELP}/)`}

## 📚 机场杂谈:那些没人明说的机场常识(机场帮)

${talk.length ? talk.map((t) => `- [${t.title}](${HELP}${t.path})`).join('\n') : `- 暂时拉取失败,直接看 [机场杂谈栏目](${TALK})`}

更多:[机场帮全部文章](${HELP}/articles/) · [术语库](${HELP}/glossary/) · [故障排查](${HELP}/category/troubleshooting/)

${tanSections.map((s) => `## ${s.emoji} ${s.title}(机场探)\n\n${s.list.map((l) => `- [${l.title}](${TAN}${l.path})`).join('\n')}`).join('\n\n')}

更多:[机场探全部科普与快讯](${TAN}/articles/) · [测量方法与数据说明](${TAN}/methodology/)

## 📌 声明

- 文章版权归机场帮与机场探,本仓库只做目录镜像与导航,每天自动同步;内容仅供学习交流,请遵守当地法律法规
- 收录与核验口径见 [机场帮编辑政策](${HELP}/editorial-policy/) 与 [机场探编辑、推荐与更正政策](${TAN}/editorial-policy/)
- 反馈:[Issues](../../issues) · Telegram [@jichangcha_chat](https://t.me/jichangcha_chat)

⭐ 觉得有用请点个 Star,新文章会自动出现在这里。
`;

writeFileSync(join(ROOT, 'README.md'), readme);
console.log(`README 已生成:${today} · 杂谈 ${talk.length} · 机场探科普 ${tanTotal} · 快讯 ${tanNews.length}+${helpLatest.length}`);
