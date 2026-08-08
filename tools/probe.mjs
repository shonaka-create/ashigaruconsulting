// Render-truth probe: STUDIO returns 200 for everything. Find which URLs actually have content.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const urls = readFileSync(process.argv[2], "utf8").trim().split("\n");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const out = [];
for (const u of urls) {
  const p = await ctx.newPage();
  let status = 0;
  p.on("response", (r) => { if (r.url().replace(/\/$/, "") === u.replace(/\/$/, "")) status = r.status(); });
  try {
    await p.goto(u, { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForTimeout(1200);
  } catch (e) { /* keep going */ }
  const d = await p.evaluate(() => {
    const t = (document.body.innerText || "").replace(/\s+/g, " ").trim();
    const links = [...document.querySelectorAll("a[href]")].map((a) => ({
      label: (a.innerText || a.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),
      href: a.href,
      target: a.target || "",
    }));
    return {
      title: document.title,
      chars: t.length,
      head: t.slice(0, 160),
      h1: [...document.querySelectorAll("h1")].map((x) => x.innerText.trim()),
      docH: document.documentElement.scrollHeight,
      links,
      imgs: [...document.querySelectorAll("img")].length,
    };
  });
  out.push({ url: u, status, ...d });
  console.log(`${status} ${String(d.chars).padStart(6)}ch h=${String(d.docH).padStart(5)} ${u}  | ${d.title.slice(0, 40)} | ${d.head.slice(0, 70)}`);
  await p.close();
}
writeFileSync(process.argv[3], JSON.stringify(out, null, 2));
await b.close();
