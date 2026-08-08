// slices.mjs — viewport-sized screenshots down the page, AFTER scroll-reveal animations
// have been triggered. Never fullPage: STUDIO pins a background image (div.image.fixed)
// that fullPage capture drags around.
//
//   node tools/slices.mjs <url> <outdir> <slug> [w] [h]

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [url, outdir, slug, W = "1440", H = "900"] = process.argv.slice(2);
const w = Number(W), h = Number(H);
mkdirSync(outdir, { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1500);

const docH = await p.evaluate(() => document.documentElement.scrollHeight);

// pass 1: walk the whole page so every reveal/lazy image fires
for (let y = 0; y < docH; y += Math.floor(h * 0.8)) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(220);
}
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(900);

// pass 2: capture
let i = 0;
for (let y = 0; y < docH; y += h) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${outdir}/${slug}-${w}-${String(i).padStart(2, "0")}.png`, fullPage: false });
  i++;
}
console.log(`${slug} ${w}px  docH=${docH}  slices=${i}`);
await b.close();
