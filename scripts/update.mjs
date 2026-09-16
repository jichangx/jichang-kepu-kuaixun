/**
 * 机场科普与快讯 README 生成器
 * - 科普:机场帮「机场杂谈」栏目 https://www.jichanghelp.com/category/airport-talk/(抓取栏目页文章链接)
 * - 快讯:机场帮 RSS 最新文章;机场探(站点未上线)预留板块
 * - GitHub Actions 每日运行(.github/workflows/daily-update.yml),有变化才提交
 * 用法:node scripts/update.mjs
 */
import { writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HELP = 'https://www.jichanghelp.com';
const TALK = `${HELP}/category/airport-talk/`;
const RSS = `${HELP}/rss.xml`;
const today = new Date().toISOString().slice(0, 10);
const UA = { 'user-agent': 'jichangx-kepu-kuaixun' };

const decode = (s) =>
  String(s)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
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

/* 科普:机场杂谈栏目页 */
const talkHtml = await getText(TALK);
const seen = new Set();
const talk = [];
if (talkHtml) {
  for (const m of talkHtml.matchAll(/<a[^>]+href="(\/articles\/[^"#?]+\/)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const path = m[1];
    const title = decode(m[2].replace(/<[^>]+>/g, ''));
    if (title.length < 8 || seen.has(path)) continue;
    seen.add(path);
    talk.push({ path, title });
  }
}

/* 快讯:机场帮 RSS */
const rssXml = await getText(RSS);
const latest = rssXml
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

if (talk.length < 5 && existsSync(join(ROOT, 'README.md'))) {
  console.log('科普栏目抓取结果不足,保留现有 README');
  process.exit(0);
}

const readme = `# 机场科普与快讯:测速图怎么读、节点名什么意思、订阅安全、客户端停更(每日同步)

![更新](https://img.shields.io/badge/更新-${today.replace(/-/g, '--')}-00e676) ![科普](https://img.shields.io/badge/机场杂谈-${talk.length}%20篇-00b0ff) [![来源](https://img.shields.io/badge/内容来源-机场帮%20·%20机场探-fbbf24)](${TALK}) [![Telegram](https://img.shields.io/badge/Telegram-%40jichangcha-26A5E4?logo=telegram&logoColor=white)](https://t.me/jichangcha)

把用机场时会遇到、但很少有人系统讲清楚的事写明白:测速图怎么读、节点名里的符号什么意思、客户端把订阅叫成十几个名字、哪些客户端已经没人维护。科普部分来自 [机场帮「机场杂谈」栏目](${TALK}),快讯部分来自机场帮最新文章与机场探,每天自动同步。

> 🔗 相关仓库:[2026 机场推荐清单](https://github.com/jichangx/2026-jichangcha-tuijian) · [翻墙科普攻略](https://github.com/jichangx/fanqiang-kepu) · [客户端下载与教程](https://github.com/jichangx/jichang-kehuduan) · [跑路机场预警](https://github.com/jichangx/airport-status) · [三站精品聚合](https://github.com/jichangx)

## 📚 机场杂谈:那些没人明说的机场常识

${talk.length ? talk.map((t) => `- [${t.title}](${HELP}${t.path})`).join('\n') : `- 暂时拉取失败,直接看 [机场杂谈栏目](${TALK})`}

更多:[机场帮全部文章](${HELP}/articles/) · [术语库](${HELP}/glossary/) · [故障排查](${HELP}/category/troubleshooting/)

## 📰 快讯:机场帮最新文章

${latest.length ? latest.map((a) => `- [${a.title}](${a.link})${a.date ? ` · ${a.date}` : ''}`).join('\n') : `- 暂时拉取失败,直接看 [机场帮](${HELP}/)`}

## 🔭 机场探:敬请期待

机场探站点上线后,机场行业动态、新机场开业与异常快讯会同步到这里。上线前先关注 TG 频道 [@jichangcha](https://t.me/jichangcha),跑路预警与优惠变动第一时间推送。

## 📌 声明

- 文章版权归机场帮与机场探,本仓库只做目录镜像与导航,每天自动同步;内容仅供学习交流,请遵守当地法律法规
- 机场帮的收录与核验口径见 [编辑政策](${HELP}/editorial-policy/)
- 反馈:[Issues](../../issues) · Telegram [@jichangcha_chat](https://t.me/jichangcha_chat)

⭐ 觉得有用请点个 Star,新文章会自动出现在这里。
`;

writeFileSync(join(ROOT, 'README.md'), readme);
console.log(`README 已生成:${today} · 杂谈 ${talk.length} 篇 · 快讯 ${latest.length} 条`);
