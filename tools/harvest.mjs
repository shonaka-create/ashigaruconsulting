// harvest.mjs — Phase 3 (STUDIO variant): the stock assets.mjs only sees what is rendered at
// first paint. STUDIO lazy-mounts images on scroll, so we walk the page first, then collect
// every <img currentSrc> AND every computed background-image, at desktop and mobile widths
// (STUDIO swaps to different files per breakpoint).
//
//   node tools/harvest.mjs <out-dir> <csv> <url> [url...]

import { chromium } from "playwright";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const [OUT, CSV, ...URLS] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });

// Original-resolution rules, verified against the live CDN:
//   STUDIO  <name>_small|_middle|_regular.webp  →  <name>.webp  (no suffix = the raw upload;
//           _large and _original both 404, so do not guess further)
//   Unsplash  ...&w=1080  →  &w=2400            (q/fm left alone: changing fm changes the bytes)
// Both candidates are tried in order at download time, so a wrong guess just falls back.
function original(u) {
  if (/storage\.googleapis\.com\/studio-/.test(u)) {
    return u.replace(/_(small|middle|regular)\.(webp|png|jpe?g)$/i, ".$2");
  }
  if (/images\.unsplash\.com/.test(u)) return u.replace(/([?&])w=\d+/, "$1w=2400");
  return u;
}

const b = await chromium.launch();
const rows = [];
const byHash = new Map();

async function collect(url, vw, vh, label) {
  const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1200);
  const docH = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < docH; y += Math.floor(vh * 0.7)) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(260);
  }
  await p.waitForTimeout(800);

  const found = await p.evaluate(() => {
    const out = [];
    const seen = new Set();
    const push = (o) => { const k = o.src + "|" + o.selector; if (!seen.has(k)) { seen.add(k); out.push(o); } };
    const sel = (el) => {
      const parts = [];
      let n = el;
      for (let i = 0; n && i < 3; i++, n = n.parentElement) {
        parts.unshift(n.tagName.toLowerCase() + (n.className && typeof n.className === "string" ? "." + n.className.trim().split(/\s+/).slice(0, 3).join(".") : ""));
      }
      return parts.join(">");
    };
    for (const img of document.querySelectorAll("img")) {
      const r = img.getBoundingClientRect();
      if (!img.currentSrc) continue;
      const cs = getComputedStyle(img);
      push({
        kind: "img", src: img.currentSrc, selector: sel(img),
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        displayed: `${Math.round(r.width)}x${Math.round(r.height)}`,
        objectFit: cs.objectFit, objectPosition: cs.objectPosition,
        alt: img.alt || "", rendered: r.width > 0 && r.height > 0 && cs.visibility !== "hidden" ? "yes" : "no",
      });
    }
    // STUDIO paints every photo as div.image with an injected <style> setting
    // :before { background-image: url(...) }. So the element's own backgroundImage is
    // always "none" — the pixels live on the pseudo-element.
    for (const el of document.querySelectorAll("*")) {
      for (const pe of [null, "::before", "::after"]) {
        const cs = getComputedStyle(el, pe);
        const bg = cs.backgroundImage;
        if (!bg || bg === "none") continue;
        for (const m of bg.matchAll(/url\(["']?(https?:[^"')]+)["']?\)/g)) {
          const r = el.getBoundingClientRect();
          push({
            kind: pe ? `background${pe}` : "background", src: m[1], selector: sel(el) + (pe || ""),
            natural: "", displayed: `${Math.round(r.width)}x${Math.round(r.height)}`,
            objectFit: cs.backgroundSize, objectPosition: cs.backgroundPosition,
            alt: "", rendered: r.width > 0 && r.height > 0 ? "yes" : "no",
          });
        }
      }
    }
    return out;
  });

  for (const f of found) rows.push({ page: url, vw: label, ...f });
  await ctx.close();
}

for (const u of URLS) {
  await collect(u, 1440, 900, "1440");
  await collect(u, 390, 844, "390");
  console.log(`collected ${u}`);
}

// download + dedupe by content hash
const ext = (u, ct) => {
  const m = u.split("?")[0].match(/\.(webp|png|jpe?g|svg|gif|avif)$/i);
  if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  if (/webp/.test(ct)) return "webp";
  if (/png/.test(ct)) return "png";
  if (/svg/.test(ct)) return "svg";
  if (/gif/.test(ct)) return "gif";
  return "jpg";
};

const uniq = [...new Set(rows.filter((r) => r.rendered === "yes").map((r) => r.src))];
console.log(`\n${uniq.length} unique source URLs (rendered only)`);

const localOf = new Map();
for (const src of uniq) {
  const tries = [original(src), src];
  let saved = null;
  for (const t of tries) {
    try {
      const res = await fetch(t, { headers: { "user-agent": "Mozilla/5.0 Chrome/125.0" } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;
      const h = createHash("sha256").update(buf).digest("hex").slice(0, 12);
      const e = ext(t, res.headers.get("content-type") || "");
      if (byHash.has(h)) { saved = byHash.get(h); break; }
      const name = `${h}.${e}`;
      const path = `${OUT}/${name}`;
      if (!existsSync(path)) writeFileSync(path, buf);
      byHash.set(h, { path, bytes: buf.length, from: t });
      saved = byHash.get(h);
      console.log(`  ✓ ${name}  ${(buf.length / 1024) | 0}KB  ${t.slice(0, 90)}`);
      break;
    } catch { /* next candidate */ }
  }
  if (!saved) console.log(`  ✗ FAILED ${src.slice(0, 110)}`);
  localOf.set(src, saved ? saved.path : "");
}

const q = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
const head = "page,viewport,kind,local_path,original_url,selector,natural,displayed,fit,position,alt,rendered,wordpress_filename";
const body = rows.map((r) => [
  q(r.page), r.vw, r.kind, q(localOf.get(r.src) || ""), q(r.src), q(r.selector),
  r.natural, r.displayed, q(r.objectFit), q(r.objectPosition), q(r.alt), r.rendered,
  q((localOf.get(r.src) || "").split("/").pop() || ""),
].join(","));
writeFileSync(CSV, head + "\n" + body.join("\n") + "\n");
console.log(`\n${rows.length} rows → ${CSV}   (${byHash.size} unique files in ${OUT}/)`);
await b.close();
