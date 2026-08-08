// peek.mjs — how does STUDIO actually paint its photos? (not <img>, not element background-image)
//   node tools/peek.mjs <url>
import { chromium } from "playwright";

const url = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();

const netImgs = new Set();
p.on("response", (r) => {
  const ct = r.headers()["content-type"] || "";
  if (/^image\//.test(ct)) netImgs.add(r.url());
});

await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
const docH = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < docH; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); }
await p.waitForTimeout(1500);

const info = await p.evaluate(() => {
  const out = { pseudo: [], divImage: [], picture: 0, sources: [] };
  for (const el of document.querySelectorAll("*")) {
    for (const pe of ["::before", "::after"]) {
      const bg = getComputedStyle(el, pe).backgroundImage;
      if (bg && bg !== "none" && /url\(/.test(bg)) out.pseudo.push({ pe, cls: el.className, bg: bg.slice(0, 200) });
    }
  }
  for (const el of document.querySelectorAll("div.image, [class*='image']")) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out.divImage.push({
      cls: String(el.className).slice(0, 80),
      bg: cs.backgroundImage.slice(0, 160),
      size: cs.backgroundSize, pos: cs.backgroundPosition,
      box: `${Math.round(r.width)}x${Math.round(r.height)}`,
      style: (el.getAttribute("style") || "").slice(0, 200),
      html: el.innerHTML.slice(0, 200),
    });
  }
  out.picture = document.querySelectorAll("picture").length;
  out.sources = [...document.querySelectorAll("source")].map((s) => s.srcset.slice(0, 140));
  return out;
});

console.log("network image responses:");
for (const u of netImgs) console.log("  " + u);
console.log("\npseudo-element backgrounds:", info.pseudo.length);
for (const x of info.pseudo.slice(0, 20)) console.log("  ", x.pe, x.cls, x.bg);
console.log("\n<picture>:", info.picture, " <source>:", info.sources.length);
for (const s of info.sources.slice(0, 20)) console.log("  ", s);
console.log("\ndiv[class*=image]:", info.divImage.length);
for (const d of info.divImage.slice(0, 30)) console.log("  ", JSON.stringify(d));
await b.close();
