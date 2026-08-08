// content.mjs — the implementation spec: every visible text run with the computed style that
// paints it, plus the section boxes it sits in. This is what gets transcribed into CSS; nothing
// here is eyeballed.
//
//   node tools/content.mjs <out.json> <vw> <url> [url...]

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const [OUT, VW, ...URLS] = process.argv.slice(2);
const vw = Number(VW);
const vh = vw >= 1000 ? 900 : 844;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
const pages = [];

for (const url of URLS) {
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const docH = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < docH; y += Math.floor(vh * 0.7)) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(200);
  }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(700);

  const data = await p.evaluate(() => {
    const px = (n) => Math.round(n * 10) / 10;
    const styleOf = (el) => {
      const c = getComputedStyle(el);
      return {
        font: c.fontFamily, size: c.fontSize, weight: c.fontWeight, lh: c.lineHeight,
        ls: c.letterSpacing, color: c.color, align: c.textAlign, ws: c.whiteSpace,
      };
    };
    // A "text run" = the deepest element whose own text is not split across children.
    const runs = [];
    const walk = (el, depth) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      if (c.display === "none" || c.visibility === "hidden") return;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(" ");
      if (own) {
        runs.push({
          text: own, tag: el.tagName.toLowerCase(), cls: String(el.className || "").slice(0, 60),
          box: { x: px(r.x), y: px(r.y + scrollY), w: px(r.width), h: px(r.height) },
          ...styleOf(el),
        });
      }
      for (const ch of el.children) walk(ch, depth + 1);
    };
    walk(document.body, 0);

    // Top-level layout blocks inside main/footer, with their painted background.
    const blocks = [];
    for (const root of [document.querySelector("main"), document.querySelector("footer")]) {
      if (!root) continue;
      const scan = (el, d) => {
        const r = el.getBoundingClientRect();
        const c = getComputedStyle(el);
        if (r.height < 8) return;
        blocks.push({
          d, tag: el.tagName.toLowerCase(), cls: String(el.className || "").slice(0, 60),
          box: { x: px(r.x), y: px(r.y + scrollY), w: px(r.width), h: px(r.height) },
          bg: c.backgroundColor, bgImg: c.backgroundImage.slice(0, 60),
          display: c.display, flexDir: c.flexDirection, justify: c.justifyContent, align: c.alignItems,
          gap: c.gap, pad: c.padding, radius: c.borderRadius, maxW: c.maxWidth, gridCols: c.gridTemplateColumns,
        });
        if (d < 4) for (const ch of el.children) scan(ch, d + 1);
      };
      scan(root, 0);
    }

    const fields = [...document.querySelectorAll("input,select,textarea")].map((f) => ({
      tag: f.tagName.toLowerCase(), type: f.type || "", name: f.name || "", ph: f.placeholder || "",
      required: f.required, options: f.tagName === "SELECT" ? [...f.options].map((o) => o.text) : undefined,
    }));

    return {
      url: location.href, title: document.title, docH: document.documentElement.scrollHeight,
      runs, blocks, fields,
      iframes: [...document.querySelectorAll("iframe")].map((f) => ({ src: f.src, w: f.width, h: f.height })),
      forms: [...document.querySelectorAll("form")].map((f) => ({ action: f.action, method: f.method })),
    };
  });

  pages.push(data);
  console.log(`${data.url}  runs=${data.runs.length} blocks=${data.blocks.length} fields=${data.fields.length}`);
  await p.close();
}

writeFileSync(OUT, JSON.stringify(pages, null, 1));
await b.close();
