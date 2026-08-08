// server.mjs — serves dist/ locally with the SAME extensionless URLs as the live site
// (/about, not /about.html), so screenshots and compare.mjs line up path-for-path.
// Vercel does this with `cleanUrls` in vercel.json; this is the local equivalent.
//
//   node server.mjs [port]

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = "dist";
const PORT = Number(process.argv[2] || process.env.PORT || 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function resolve(pathname) {
  // Reject traversal before touching the filesystem.
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates =
    clean === "/" || clean === "\\"
      ? ["index.html"]
      : [clean.replace(/^[/\\]/, ""), clean.replace(/^[/\\]/, "") + ".html", join(clean.replace(/^[/\\]/, ""), "index.html")];
  for (const c of candidates) {
    const p = join(ROOT, c);
    try {
      const s = await stat(p);
      if (s.isFile()) return p;
    } catch { /* try the next candidate */ }
  }
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = await resolve(url.pathname);
  if (!file) {
    // The live site answers 200 + the home page for every unknown path (a soft-404).
    // The clone answers a real 404 on purpose — see docs/clone-plan.md, 意図的差異.
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end("<!doctype html><meta charset=utf-8><title>404</title><p>404 Not Found");
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] || "application/octet-stream",
    "x-robots-tag": "noindex, nofollow",
    "cache-control": "no-store",
  });
  res.end(body);
}).listen(PORT, () => console.log(`clone: http://localhost:${PORT}`));
