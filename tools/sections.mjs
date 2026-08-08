// sections.mjs — live vs clone, top-level block heights only. The fastest way to find
// which band of the page is absorbing a height difference.
//
//   node tools/sections.mjs <vw> <path> [path...]

import { chromium } from "playwright";

const [VW, ...PATHS] = process.argv.slice(2);
const vw = Number(VW);
const LIVE = "https://ashigaru-consulting.co.jp";
const CLONE = "http://localhost:4173";

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1 });

async function blocks(url) {
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(140); }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(700);
  const d = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("main > *, footer")) {
      const r = el.getBoundingClientRect();
      if (r.height < 8) continue;
      out.push(Math.round(r.height));
    }
    return { docH: document.documentElement.scrollHeight, out };
  });
  await p.close();
  return d;
}

for (const path of PATHS) {
  const a = await blocks(LIVE + path);
  const c = await blocks(CLONE + path);
  console.log(`\n${path} @${vw}   live=${a.docH} clone=${c.docH} (${c.docH - a.docH >= 0 ? "+" : ""}${c.docH - a.docH})`);
  const n = Math.max(a.out.length, c.out.length);
  for (let i = 0; i < n; i++) {
    const l = a.out[i] ?? "—", m = c.out[i] ?? "—";
    const d = typeof l === "number" && typeof m === "number" ? m - l : "";
    console.log(`  block ${i}: live=${String(l).padStart(5)} clone=${String(m).padStart(5)}  ${d === 0 ? "" : d > 0 ? "+" + d : d}`);
  }
}
await b.close();
