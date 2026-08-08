// textdiff.mjs — line up live vs clone by the TEXT of each run and report where the y
// position or the type styling drifts. compare.mjs tells you a page is 50px tall; this
// tells you which paragraph started the drift.
//
//   node tools/textdiff.mjs <live-origin> <clone-origin> <vw> <path> [path...]

import { chromium } from "playwright";

const [LIVE, CLONE, VW, ...PATHS] = process.argv.slice(2);
const vw = Number(VW);
const vh = vw >= 1000 ? 900 : 844;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });

async function runs(url) {
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const docH = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < docH; y += Math.floor(vh * 0.7)) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(160);
  }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(700);
  const out = await p.evaluate(() => {
    const res = [];
    const walk = (el) => {
      const c = getComputedStyle(el);
      if (c.display === "none" || c.visibility === "hidden") return;
      const own = [...el.childNodes]
        .filter((n) => n.nodeType === 3 && n.textContent.trim())
        .map((n) => n.textContent.trim())
        .join(" ")
        .replace(/\s+/g, " ");
      if (own) {
        const r = el.getBoundingClientRect();
        res.push({
          key: own.slice(0, 28),
          y: Math.round(r.y + scrollY),
          x: Math.round(r.x),
          w: Math.round(r.width),
          h: Math.round(r.height),
          fs: c.fontSize,
          lh: c.lineHeight,
          fw: c.fontWeight,
        });
      }
      for (const ch of el.children) walk(ch);
    };
    walk(document.body);
    return { docH: document.documentElement.scrollHeight, res };
  });
  await p.close();
  return out;
}

for (const path of PATHS) {
  const a = await runs(LIVE + path);
  const c = await runs(CLONE + path);
  console.log(`\n===== ${path} @${vw}   live=${a.docH}  clone=${c.docH}  (${c.docH - a.docH >= 0 ? "+" : ""}${c.docH - a.docH})`);
  const used = new Set();
  let drift = 0;
  for (const l of a.res) {
    const i = c.res.findIndex((x, idx) => !used.has(idx) && x.key === l.key);
    if (i < 0) {
      console.log(`  MISSING  y=${String(l.y).padStart(5)}  ${JSON.stringify(l.key)}`);
      continue;
    }
    used.add(i);
    const m = c.res[i];
    const dy = m.y - l.y;
    const flags = [];
    if (Math.abs(dy - drift) > 4) flags.push(`Δy=${dy > 0 ? "+" : ""}${dy}`);
    if (m.fs !== l.fs) flags.push(`fs ${l.fs}→${m.fs}`);
    if (m.lh !== l.lh) flags.push(`lh ${l.lh}→${m.lh}`);
    if (m.fw !== l.fw) flags.push(`fw ${l.fw}→${m.fw}`);
    if (Math.abs(m.w - l.w) > 4) flags.push(`w ${l.w}→${m.w}`);
    if (Math.abs(m.x - l.x) > 4) flags.push(`x ${l.x}→${m.x}`);
    if (Math.abs(m.h - l.h) > 4) flags.push(`h ${l.h}→${m.h}`);
    if (flags.length) {
      console.log(`  y=${String(l.y).padStart(5)}  ${flags.join("  ")}   ${JSON.stringify(l.key)}`);
      drift = dy;
    }
  }
  const extra = c.res.filter((_, i) => !used.has(i));
  for (const e of extra) console.log(`  EXTRA    y=${String(e.y).padStart(5)}  ${JSON.stringify(e.key)}`);
}

await b.close();
