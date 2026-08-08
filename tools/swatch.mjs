// swatch.mjs — pin down the painted colour/geometry of the specific components CSS has to
// reproduce (buttons, badges, cards, overlays). Matched by their visible label, so the query
// survives STUDIO's generated class names.
//
//   node tools/swatch.mjs <url> <label> [label...]

import { chromium } from "playwright";

const [url, ...labels] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
const docH = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < docH; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(220); }
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(1500);

const out = await p.evaluate((labels) => {
  const res = [];
  for (const label of labels) {
    const hit = [...document.querySelectorAll("*")].find(
      (e) => e.textContent.trim() === label && !e.querySelector("*")
    ) || [...document.querySelectorAll("*")].find((e) => e.textContent.trim().startsWith(label));
    if (!hit) { res.push({ label, miss: true }); continue; }
    const chain = [];
    let n = hit;
    for (let i = 0; i < 5 && n; i++, n = n.parentElement) {
      const c = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      chain.push({
        tag: n.tagName.toLowerCase(), cls: String(n.className || "").slice(0, 34),
        box: `${Math.round(r.width)}x${Math.round(r.height)}`,
        bg: c.backgroundColor, bgImg: c.backgroundImage.slice(0, 48),
        pad: c.padding, radius: c.borderRadius, border: c.border,
        shadow: c.boxShadow.slice(0, 60), color: c.color, opacity: c.opacity,
      });
    }
    res.push({ label, chain });
  }
  return res;
}, labels);

for (const r of out) {
  console.log("\n### " + r.label + (r.miss ? "  [NOT FOUND]" : ""));
  for (const c of r.chain || []) {
    console.log(`   ${c.tag}.${c.cls} ${c.box} bg=${c.bg} r=${c.radius} pad=${c.pad} sh=${c.shadow} bd=${c.border} col=${c.color} op=${c.opacity}`);
    if (c.bgImg !== "none") console.log(`       bgImg=${c.bgImg}`);
  }
}
await b.close();
