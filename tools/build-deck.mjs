import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import os from 'node:os';
const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'deckpdf-'));
const css = await readFile('docs/proposal/assets/doc.css', 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();
const jobs = [
  { html: 'docs/proposal/proposal.html', pdf: 'docs/proposal/dist/proposal.pdf', inline: true, a4: true },
  { html: 'docs/proposal/quotation.html', pdf: 'docs/proposal/dist/quotation.pdf', inline: true, a4: true },
  { html: 'docs/proposal/deck/deck.html', pdf: 'docs/proposal/deck/deck.pdf', inline: false, a4: false },
];
for (const j of jobs) {
  if (j.inline) {
    const raw = await readFile(j.html, 'utf8');
    const inlined = raw.replace(/<link rel="stylesheet" href="assets\/doc\.css">/, `<style>\n${css}\n</style>`);
    await writeFile(path.join('docs/proposal/dist', path.basename(j.html)), inlined, 'utf8');
    await page.setContent(inlined, { waitUntil: 'load' });
  } else {
    await page.goto(pathToFileURL(path.resolve(j.html)).href, { waitUntil: 'load' });
  }
  await page.emulateMedia({ media: 'print' });
  const tmp = path.join(tmpdir, path.basename(j.pdf));
  await page.pdf({ path: tmp, printBackground: true, preferCSSPageSize: true, ...(j.a4 ? { format: 'A4' } : {}) });
  try { fs.copyFileSync(tmp, path.resolve(j.pdf)); console.log('OK   ' + j.pdf); }
  catch { const alt = j.pdf.replace(/\.pdf$/, '_new.pdf'); fs.copyFileSync(tmp, path.resolve(alt)); console.log('LOCK ' + j.pdf + ' -> ' + alt); }
}
await browser.close();
