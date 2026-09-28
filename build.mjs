// build.mjs — renders the six pages to dist/ as plain HTML. No dependencies, no framework.
//
//   node build.mjs
//
// One function per section, matching the granularity phase ② (static-to-wp-cocoon) needs:
// each of these maps to one Cocoon template part. Copy lives in src/data/, never inline.

import { mkdirSync, writeFileSync, cpSync } from "node:fs";
import { site, navLinks, navActions, drawerLinks, footerLinks, footerCta } from "./src/data/site.js";
import { home, about, service, contact, thanks, privacy } from "./src/data/pages.js";
import { line, entrances, reasons, consultants, serviceHub, servicePages, column } from "./src/data/renewal.js";
import { pro, trust, feeFlow, contactWays } from "./src/data/service-pro.js";

const OUT = "dist";

// Renewal navigation: the live nav (site.js, verbatim) plus the new お役立ち記事 entry,
// inserted at build time so the transcription files stay untouched.
const NAV = [...navLinks.slice(0, 3), { label: "お役立ち記事", href: "/column" }, ...navLinks.slice(3)];
const DRAWER = [...drawerLinks.slice(0, 3), { label: "COLUMN / お役立ち記事", href: "/column" }, ...drawerLinks.slice(3)];
const FOOTER_LINKS = [...footerLinks.slice(0, 3), { label: "お役立ち記事", href: "/column" }, ...footerLinks.slice(3)];
// Demo by default. `SITE_MODE=production node build.mjs` flips robots/sitemap/canonical
// together — see docs/clone-plan.md. Nothing else in the build reads this.
const MODE = process.env.SITE_MODE === "production" ? "production" : "demo";
const ORIGIN = process.env.SITE_ORIGIN || "https://ashigaru-consulting.co.jp";

const icon = (name, cls = "") => `<i class="mi ${cls}" aria-hidden="true">${name}</i>`;

/* ---------------------------------------------------------------- shell */

function head(title, path) {
  const robots =
    MODE === "production"
      ? '<meta name="robots" content="index, follow">'
      : '<meta name="robots" content="noindex, nofollow, nocache">';
  // Deliberately no canonical in demo mode: pointing at the live domain would tie the
  // clone to it, and pointing at the preview URL declares the demo canonical.
  const canonical = MODE === "production" ? `\n  <link rel="canonical" href="${ORIGIN}${path}">` : "";
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${site.description}">
  ${robots}${canonical}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;900&family=Montserrat:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700;900&family=Material+Icons&family=Material+Symbols+Outlined&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">`;
}

function header() {
  const links = NAV
    .map((l) => `<a class="hdr-link" href="${l.href}"><p>${l.label}</p></a>`)
    .join("\n        ");
  const actions = navActions
    .map(
      (a) =>
        `<a class="hdr-action" href="${a.href}"${a.newTab ? ' target="_blank" rel="noopener"' : ""}><p>${a.label}</p>${a.icon ? icon(a.icon, "mi-sym") : ""}</a>`
    )
    .join("\n        ");
  return `<header class="hdr">
    <div class="hdr-bar">
      <a class="hdr-logo" href="/"><img src="${site.logoHeader}" alt="" width="173" height="37"></a>
      <nav class="hdr-nav">
        ${links}
      </nav>
      <div class="hdr-actions">
        ${actions}
        <button class="hdr-burger" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="drawer">${icon("menu")}</button>
      </div>
    </div>
  </header>
  <div class="drawer" id="drawer" hidden>
    <button class="drawer-scrim" type="button" aria-label="メニューを閉じる"></button>
    <div class="drawer-panel">
      <button class="drawer-close" type="button" aria-label="メニューを閉じる">${icon("close")}</button>
      <nav class="drawer-nav">
        ${DRAWER.map((l) => `<a href="${l.href}"><p>${l.label}</p></a>`).join("\n        ")}
      </nav>
      <div class="drawer-foot"><a href="/privacypolicy">個人情報保護方針</a></div>
    </div>
  </div>`;
}

function footer() {
  const cta = footerCta
    .map(
      (c) => `<a class="fcta" href="${c.href}">
        <div class="fcta-txt"><p class="fcta-t">${c.title}</p><p class="fcta-s${c.subLight ? ' fcta-s-light' : ''}">${c.sub}</p></div>
        ${icon("keyboard_arrow_right", "mi-48")}
      </a>`
    )
    .join("\n      ");
  const links = FOOTER_LINKS
    .map((l) => `<a href="${l.href}"><p>${l.label}</p>${l.icon ? icon(l.icon, "mi-16") : ""}</a>`)
    .join("\n          ");
  return `<footer class="ftr">
    <div class="ftr-cta">
      ${cta}
    </div>
    <div class="ftr-mid">
      <img class="ftr-logo" src="${site.logoFooter}" alt="" width="192" height="41">
      <nav class="ftr-nav">
          ${links}
      </nav>
    </div>
    <div class="ftr-bot">
      <p class="ftr-copy">${site.copyright}</p>
      <a class="ftr-privacy" href="/privacypolicy">個人情報保護方針</a>
    </div>
  </footer>`;
}

// Fixed overlay so it cannot move the layout by a single pixel — a note in the flow would
// stretch the grid and break the numeric comparison in Phase 7.
const demoNotice =
  MODE === "production"
    ? ""
    : `<div class="demo-notice" data-demo-notice role="status">
    <span>確認用デモサイト（検索エンジン非公開）</span>
    <button type="button" aria-label="閉じる">×</button>
  </div>`;

function page({ title, path, body, bodyClass = "" }) {
  return `${head(title, path)}
<body class="${bodyClass}">
  ${header()}
  <main>
${body}
  </main>
  ${footer()}
  ${stickyLine()}
  ${demoNotice}
  <script src="/js/main.js"></script>
</body>`;
}

/* ------------------------------------------------------ renewal components */

// Mobile-only floating LINE button (proposal 4-3: 追従ボタン). Fixed, so it never moves layout.
function stickyLine() {
  return `<a class="sticky-line" href="${line.url}" target="_blank" rel="noopener" data-cta="line">${lineMark()}<span>${line.label}</span></a>`;
}

function lineMark() {
  // Simple speech-bubble mark; not the LINE trademark artwork (brand assets are not bundled).
  return `<svg class="line-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.6 1.6 4.9 4.1 6.4-.1.6-.6 2.4-.7 2.8 0 0-.1.4.2.5.3.1.5 0 .5 0 .8-.3 4-2.6 4.6-3.1.4 0 .9.1 1.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg>`;
}

function lineCta({ compact = false } = {}) {
  return `<section class="sec sec-navy sec-line${compact ? " sec-line-compact" : ""}">
      <div class="sec-inner sec-inner-1080 line-inner">
        <div class="line-txt">
          <p class="line-h">${line.sub}</p>
          <p class="line-p">${line.note}</p>
        </div>
        <a class="btn btn-line" href="${line.url}" target="_blank" rel="noopener" data-cta="line">${lineMark()}<p>${line.label}</p></a>
      </div>
    </section>`;
}

function entrancesSection() {
  const cards = entrances.items
    .map(
      (e) => `<a class="ent" href="${e.href}" data-ent="${e.key}">
            ${photo(e.image, { brightness: e.brightness, cls: "ent-img" })}
            <div class="ent-body">
              <p class="ent-kicker">${e.kicker}</p>
              <h3 class="ent-title">${e.title}</h3>
              <ul class="ent-points">${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
              <p class="ent-cta">${e.cta}${icon("keyboard_arrow_right")}</p>
            </div>
          </a>`
    )
    .join("\n          ");
  return `    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080">
        ${heading(entrances.en, entrances.ja)}
        <div class="ents">
          ${cards}
        </div>
      </div>
    </section>`;
}

function reasonsSection() {
  return `    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080">
        ${heading(reasons.en, reasons.ja)}
        <ol class="reasons">
          ${reasons.items
            .map((r, i) => `<li class="reason"><p class="reason-n">0${i + 1}</p><h3 class="reason-t">${r.title}</h3><p class="reason-b">${r.body}</p></li>`)
            .join("\n          ")}
        </ol>
      </div>
    </section>`;
}

function consultantsSection({ withLink = true } = {}) {
  const cards = consultants.items
    .map(
      (c) => `<li class="cons">
            <div class="cons-photo">${c.image ? photo(c.image) : `<div class="cons-ph">${icon("person", "mi-48")}</div>`}</div>
            <div class="cons-txt"><p class="cons-role">${c.role}</p><p class="cons-name">${c.name}</p><p class="cons-bio">${c.bio}</p></div>
          </li>`
    )
    .join("\n          ");
  return `    <section class="sec sec-cream">
      <div class="sec-inner sec-inner-1080">
        ${heading(consultants.en, consultants.ja)}
        <p class="sec-lead">${consultants.lead}</p>
        <ul class="conss">
          ${cards}
        </ul>
        ${withLink ? button("会社概要を見る", "/about", "navy btn-bold") : ""}
      </div>
    </section>`;
}

function postCard(p) {
  const cat = column.categories.find((c) => c.key === p.category);
  return `<a class="pcard" href="/column/${p.slug}">
            ${photo(p.image, { cls: "pcard-img" })}
            <div class="pcard-body">
              <div class="pcard-meta"><p class="pcard-date">${p.date}</p><p class="pcard-cat">${cat ? cat.label : ""}</p></div>
              <h3 class="pcard-t">${p.title}</h3>
              <p class="pcard-x">${p.excerpt}</p>
            </div>
          </a>`;
}

function latestColumnSection() {
  return `    <section class="sec sec-white" id="column">
      <div class="sec-inner sec-inner-1080">
        ${heading("COLUMN", "お役立ち記事")}
        <div class="pcards">
          ${column.posts.slice(0, 3).map(postCard).join("\n          ")}
        </div>
        ${button("記事一覧を見る", "/column", "navy btn-bold")}
      </div>
    </section>`;
}

function flowSection(flow) {
  return `    <section class="sec sec-white">
      <div class="sec-inner">
        ${heading(flow.en, flow.ja)}
        <ol class="flow">
          ${flow.steps
            .map((s, i) => `<li class="flow-step"><p class="flow-n">${String(i + 1).padStart(2, "0")}</p><p class="flow-t">${s.t}</p><p class="flow-d">${s.d}</p></li>`)
            .join("\n          ")}
        </ol>
      </div>
    </section>`;
}

function faqSection(items) {
  return `    <section class="sec sec-cream">
      <div class="sec-inner sec-inner-1080">
        ${heading("FAQ", "よくある質問")}
        <div class="faqs">
          ${items
            .map((f) => `<details class="faq"><summary><span class="faq-q">${f.q}</span>${icon("keyboard_arrow_down")}</summary><p class="faq-a">${f.a}</p></details>`)
            .join("\n          ")}
        </div>
      </div>
    </section>`;
}

function crumbs(items) {
  return `<nav class="crumbs" aria-label="パンくず"><ol>${items
    .map((c) => (c.href ? `<li><a href="${c.href}">${c.label}</a></li>` : `<li><span>${c.label}</span></li>`))
    .join("")}</ol></nav>`;
}

/* ------------------------------------------------------------- sections */

// The "About Us / ——— 私たちについて" pair used as every section's title.
function heading(en, ja, mod = "") {
  return `<div class="sec-head ${mod}">
          <h2 class="sec-en">${en}</h2>
          <div class="sec-ja"><span class="sec-rule" data-reveal="rule"></span><p>${ja}</p></div>
        </div>`;
}

function button(label, href, variant, opts = {}) {
  const attrs = opts.newTab ? ' target="_blank" rel="noopener"' : "";
  return `<a class="btn btn-${variant}" href="${href}"${attrs}><p>${label}</p>${icon(opts.icon || "keyboard_arrow_right")}</a>`;
}

// STUDIO paints photos on a ::before of an empty div so the image can be filtered and
// clipped independently of the box. Same trick here, driven by CSS custom properties.
function photo(src, { brightness = 1, cls = "" } = {}) {
  const filter = brightness === 1 ? "" : ` --img-filter:brightness(${brightness});`;
  return `<div class="photo ${cls}" style="--img:url('${src}');${filter}"></div>`;
}

function pageHero({ en, ja, image, brightness }) {
  return `    <div class="phero">
      ${photo(image, { brightness, cls: "phero-bg" })}
      <div class="phero-inner">
        <h1 class="phero-en">${en}</h1>
        <p class="phero-ja">${ja}</p>
      </div>
    </div>`;
}

function infoTable(rows) {
  const hrefFor = (r) =>
    ({ map: site.mapUrl, tel: `tel:${site.tel}`, mail: `mailto:${site.email}`, privacy: "/privacypolicy" })[r.link];
  return `<ul class="itable">
            ${rows
              .map((r) => {
                // The live site makes the LABEL the link and hangs an open_in_new icon off
                // the value — including for tel: and mailto:. Reproduced as-is.
                const label = r.link
                  ? `<a class="it-label" href="${hrefFor(r)}">${r.label}</a>`
                  : `<p class="it-label">${r.label}</p>`;
                const value = r.link
                  ? `<div class="it-value it-value-link"><a href="${hrefFor(r)}">${r.value}</a><a class="it-ext" href="${hrefFor(r)}" target="_blank" rel="noopener" aria-label="別ウィンドウで開く">${icon("open_in_new", "mi-24")}</a></div>`
                  : `<div class="it-value"><p>${r.value}</p></div>`;
                return `<li>${label}${value}</li>`;
              })
              .join("\n            ")}
          </ul>`;
}

/* ---------------------------------------------------------------- pages */

function renderHome() {
  const d = home;
  const services = d.services.items
    .map(
      (s) => `<a class="scard ${s.wide ? "scard-wide" : ""}" href="/service">
            <div class="scard-body"><h3>${s.title}</h3></div>
            ${photo(s.image, { brightness: s.brightness, cls: "scard-img" })}
          </a>`
    )
    .join("\n          ");

  const news = d.news.items
    .map((n) => {
      const title = n.href
        ? `<a class="news-title" href="${n.href}" target="_blank" rel="noopener">${n.title}</a>`
        : `<p class="news-title">${n.title}</p>`;
      return `<div class="news-row">
            <div class="news-meta"><p class="news-date">${n.date}</p><p class="news-tag">${n.tag}</p></div>
            <div class="news-body">${title}${n.body ? `<p class="news-text">${n.body}</p>` : ""}</div>
          </div>`;
    })
    .join("\n          ");

  // One fixed photo behind the whole page, not two. The live site paints a single
  // position:fixed image that shows through BOTH the hero and the parallax CTA band —
  // the sections in between simply have opaque backgrounds over it.
  const body = `    <div class="fixed-bg photo" style="--img:url('${d.hero.image}')"></div>

    <div class="hero">
      <div class="hero-inner">
        <h1 class="hero-h1">
          ${d.hero.lineDesktop.map((l) => `<span class="only-desktop">${l}</span>`).join("\n          ")}
          ${d.hero.lineMobile.map((l) => `<span class="only-mobile">${l}</span>`).join("\n          ")}
        </h1>
        <div class="hero-copy">
          <div class="rich hero-lead"><p>${d.hero.lead}</p></div>
          <div class="hero-btns">
            ${button("わたしたちのこと", "/about", "navy")}
            ${button("お急ぎの場合はお電話ください", `tel:${site.tel}`, "red", { icon: "settings_phone" })}
          </div>
        </div>
      </div>
      <div class="hero-scroll"><p>SCROLL</p><span class="hero-scroll-line"></span></div>
    </div>

${entrancesSection()}

    <section class="sec sec-navy">
      <div class="sec-inner sec-inner-1080 about-inner">
        <div class="about-col">
          ${heading(d.about.en, d.about.ja, "on-navy sec-head-lato")}
          <div class="about-text">
            <p class="about-h">${d.about.heading}</p>
            <div class="rich">${d.about.body.map((p) => `<p>${p}</p>`).join("")}</div>
          </div>
          ${button("もっと詳しく見る", "/about", "white")}
        </div>
        <div class="about-photo">${photo(d.about.image)}</div>
      </div>
    </section>

    <section class="sec sec-cream">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.services.en, d.services.ja)}
        <div class="scards">
          ${services}
        </div>
        ${button("サービス一覧へ", "/service", "navy btn-bold")}
      </div>
    </section>

${reasonsSection()}

${consultantsSection()}

    <section class="sec sec-parallax">
      <div class="sec-inner sec-inner-1080">
        <div class="pcta">
          <p class="pcta-lead">${d.cta.lead}</p>
          <p class="pcta-sub">${d.cta.sub}</p>
        </div>
        ${button("お問い合わせはこちら", "/contact", "white")}
      </div>
    </section>

    <section class="sec sec-cream" id="news">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.news.en, d.news.ja)}
        <div class="news">
          ${news}
        </div>
      </div>
    </section>

${latestColumnSection()}

${lineCta()}

    <div class="band">
      ${d.band.map((b) => photo(b.image, { brightness: b.brightness })).join("\n      ")}
    </div>`;
  return page({ title: d.title, path: "/", body, bodyClass: "p-home" });
}

function renderAbout() {
  const d = about;
  // Vision runs at 60px vertical padding, Value at the usual 120 — an inconsistency in
  // the source, so the padding is per-block rather than shared.
  const mvv = (blk, pad) => `    <section class="sec sec-cream">
      <div class="sec-inner ${pad === 60 ? "sec-inner-60" : ""}">
        <div class="mvv">
          <div class="mvv-img" style="--img-h:${blk.imgHeight}px">${photo(blk.image)}</div>
          <div class="mvv-txt">
            ${heading(blk.en, blk.ja)}
            <p class="mvv-body">${blk.body}</p>
          </div>
        </div>
      </div>
    </section>`;

  const body = `${pageHero(d.hero)}

    <section class="sec sec-navy">
      <div class="sec-inner">
        <div class="story">
          <div class="story-col">
            ${heading(d.story.en, d.story.ja, "on-navy")}
            <p class="story-h">${d.story.heading}</p>
            <div class="rich">${d.story.body.map((p) => `<p>${p}</p>`).join("")}</div>
          </div>
          ${photo(d.story.image, { cls: "story-img" })}
        </div>
      </div>
    </section>

    <section class="sec sec-cream">
      <div class="sec-inner">
        <div class="mission">
          <div class="mission-txt">
            ${heading(d.mission.en, d.mission.ja)}
            <p class="mission-body">${d.mission.body}</p>
          </div>
          <ul class="mission-grid">
            ${d.mission.images.map((i) => `<li>${photo(i)}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

${mvv(d.vision, 60)}

${mvv(d.value, 120)}

${consultantsSection({ withLink: false })}

    <section class="sec sec-white">
      <div class="sec-inner">
        <div class="profile">
          <div class="profile-col">
            ${heading(d.profile.en, d.profile.ja)}
            ${infoTable(d.profile.rows)}
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-cream">
      <div class="sec-inner sec-inner-60">
        <div class="access">
          <div class="access-map">
            <iframe src="${site.mapEmbed}" width="600" height="450" style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Googleマップ"></iframe>
          </div>
          <div class="access-txt">
            ${heading(d.access.en, d.access.ja)}
            ${infoTable(d.access.rows)}
          </div>
        </div>
      </div>
    </section>`;
  return page({ title: d.title, path: "/about", body, bodyClass: "p-about" });
}

function renderService() {
  const d = service;
  const items = d.items
    .map(
      (s) => `<li class="srow">
            <div class="srow-txt">
              <p class="srow-t">${s.title}</p>
              <div class="rich"><p>${s.body}</p></div>
            </div>
            ${photo(s.image, { cls: "srow-img" })}
          </li>`
    )
    .join("\n          ");
  const hub = serviceHub;
  const body = `${pageHero(d.hero)}

    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080">
        ${heading(hub.intro.en, hub.intro.ja)}
        <p class="sec-lead">${hub.intro.body}</p>
        <div class="ents ents-tight">
          ${entrances.items
            .map(
              (e) => `<a class="ent" href="${e.href}" data-ent="${e.key}">
            ${photo(e.image, { brightness: e.brightness, cls: "ent-img" })}
            <div class="ent-body">
              <p class="ent-kicker">${e.kicker}</p>
              <h3 class="ent-title">${e.title}</h3>
              <ul class="ent-points">${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
              <p class="ent-cta">${e.cta}${icon("keyboard_arrow_right")}</p>
            </div>
          </a>`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="sec sec-cream">
      <div class="sec-inner">
        ${heading(d.heading.en, d.heading.ja)}
        <ul class="srows">
          ${items}
        </ul>
      </div>
    </section>

${flowSection(hub.flow)}

${lineCta()}`;
  return page({ title: d.title, path: "/service", body, bodyClass: "p-service" });
}

function renderServicePage(p) {
  const other = p.slug === "seller" ? entrances.items[1] : p.slug === "buyer" ? entrances.items[0] : null;
  const body = `${pageHero(p.hero)}

    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080 sp-intro">
        ${crumbs([{ label: "ホーム", href: "/" }, { label: "サービス紹介", href: "/service" }, { label: p.hero.ja }])}
        <p class="sp-lead">${p.lead}</p>
        <div class="sp-aud">
          <h2 class="sp-h2">${p.audience.title}</h2>
          <ul class="sp-checks">${p.audience.items.map((i) => `<li>${icon("check_circle")}<span>${i}</span></li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="sec sec-cream">
      <div class="sec-inner sec-inner-1080">
        <h2 class="sp-h2 sp-h2-c">${p.options.title}</h2>
        <ul class="opts">
          ${p.options.items.map((o) => `<li class="opt"><p class="opt-t">${o.t}</p><p class="opt-d">${o.d}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>
${
  p.valuation
    ? `
    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080 sp-two">
        <div class="sp-two-col"><h2 class="sp-h2">${p.valuation.title}</h2><p class="sp-p">${p.valuation.body}</p></div>
        <div class="sp-two-col"><h2 class="sp-h2">${p.promise.title}</h2><p class="sp-p">${p.promise.body}</p></div>
      </div>
    </section>
`
    : ""
}
${faqSection(p.faq)}

${flowSection(serviceHub.flow)}

${lineCta()}
${
  other
    ? `
    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080 sp-other">
        <p class="sp-other-l">${other.kicker}</p>
        ${button(other.cta, other.href, "navy btn-bold")}
      </div>
    </section>`
    : ""
}`;
  return page({ title: p.title, path: p.path, body, bodyClass: "p-sp" });
}

// Long-form service page (seller / buyer). Section order follows how a prospect decides:
// worry → options → process → valuation → promise → fee → FAQ → contact.

// Small schematic for each option: who hands what to whom. Drawn, not described, so the
// difference between e.g. 譲渡 and 合流 is visible before any text is read.
function diagram(kind, a, b) {
  const N = "#003571";
  const T = "#e6edf6";
  const box = (x, y, w, h, label, fill = "#fff", color = N) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${N}" stroke-width="1.5"/><text x="${x + w / 2}" y="${y + h / 2 + 4.5}" text-anchor="middle" font-size="13" font-weight="700" fill="${color}">${label}</text>`;
  const arrow = (x1, y1, x2, y2) => {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const pt = (dx, dy) =>
      `${(x2 + dx * Math.cos(ang) - dy * Math.sin(ang)).toFixed(1)},${(y2 + dx * Math.sin(ang) + dy * Math.cos(ang)).toFixed(1)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${(x2 - 6 * Math.cos(ang)).toFixed(1)}" y2="${(y2 - 6 * Math.sin(ang)).toFixed(1)}" stroke="${N}" stroke-width="1.5"/><polygon points="${pt(0, 0)} ${pt(-8, -4.5)} ${pt(-8, 4.5)}" fill="${N}"/>`;
  };
  let g = "";
  let label = `${a}から${b}へ`;
  if (kind === "handover") g = box(8, 30, 118, 50, a) + arrow(134, 55, 166, 55) + box(174, 30, 118, 50, b, N, "#fff");
  if (kind === "inside")
    g =
      `<rect x="4" y="6" width="292" height="98" rx="8" fill="${T}" stroke="${N}" stroke-width="1" stroke-dasharray="4 4"/><text x="16" y="25" font-size="11" font-weight="700" fill="${N}">社内</text>` +
      box(20, 38, 104, 46, a) + arrow(132, 61, 168, 61) + box(176, 38, 104, 46, b, N, "#fff");
  if (kind === "merge") {
    g = box(8, 8, 118, 40, a) + box(8, 62, 118, 40, b, N, "#fff") + arrow(130, 28, 176, 46) + arrow(130, 82, 176, 64) + box(180, 30, 112, 50, "ひとつの体制に", T);
    label = `${a}と${b}がひとつの体制になる`;
  }
  if (kind === "loop") {
    g =
      box(60, 30, 118, 50, a) +
      `<path d="M 190 38 C 236 30, 236 80, 192 72" fill="none" stroke="${N}" stroke-width="1.5"/><polygon points="186,71 196,66.5 195,77" fill="${N}"/>` +
      `<text x="262" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="${N}">体制を</text><text x="262" y="69" text-anchor="middle" font-size="12" font-weight="700" fill="${N}">整える</text>`;
    label = `${a}のまま体制を整える`;
  }
  if (kind === "person")
    g =
      `<circle cx="67" cy="36" r="12" fill="#fff" stroke="${N}" stroke-width="1.5"/><path d="M 43 82 a 24 24 0 0 1 48 0 z" fill="#fff" stroke="${N}" stroke-width="1.5"/><text x="67" y="101" text-anchor="middle" font-size="12" font-weight="700" fill="${N}">${a}</text>` +
      arrow(108, 55, 166, 55) + box(174, 30, 118, 50, b, N, "#fff");
  return `<svg class="odiag" viewBox="0 0 300 110" role="img" aria-label="${label}">${g}</svg>`;
}

function renderProServicePage(p) {
  const d = pro[p.slug];
  const other = p.slug === "seller" ? entrances.items[1] : entrances.items[0];
  const lineBtn = `<a class="btn btn-line" href="${line.url}" target="_blank" rel="noopener" data-cta="line">${lineMark()}<p>${line.label}</p></a>`;
  const num = (i) => String(i + 1).padStart(2, "0");

  /* ---- OPTIONS: pick a side, then compare two cards ---- */
  const colIcons = p.slug === "seller" ? ["person", "groups"] : ["inventory_2", "person"];
  const meter = (n) => `<span class="ometer-bar" aria-hidden="true">${[1, 2, 3, 4].map((i) => `<i${i <= n ? ' class="on"' : ""}></i>`).join("")}</span>`;
  const optionCard = (r) => `<li class="ocard2">
                ${diagram(r.diag.kind, r.diag.a, r.diag.b)}
                <div class="ocard-top"><span class="worry-i">${icon(r.icon, "mi-24")}</span><div><h3 class="ocard-t">${r.t}</h3><p class="ocard-s">${r.s}</p></div></div>
                <p class="ocard-for"><span>${d.options.cols[0]}</span>${r.c[0]}</p>
                <dl class="ocard-dl">
                  <div>${icon(colIcons[0])}<dt>${d.options.cols[1]}</dt><dd>${r.c[1]}</dd></div>
                  <div>${icon(colIcons[1])}<dt>${d.options.cols[2]}</dt><dd>${r.c[2]}</dd></div>
                </dl>
                <div class="ometer"><span class="ometer-l">${d.options.cols[3]}</span>${meter(r.meter)}<span class="ometer-v">${r.c[3]}</span></div>
              </li>`;
  const options = `<p class="oaxis">${icon("alt_route")}<span>${d.options.axis}</span></p>
        <div class="osel" data-osel>
          <div class="osel-tabs" role="tablist" aria-label="${d.options.ja}">
            ${d.options.groups
              .map(
                (g, i) => `<button class="osel-tab${i === 0 ? " is-active" : ""}" type="button" role="tab" id="tab-${g.key}" aria-controls="opt-${g.key}" aria-selected="${i === 0}" data-osel-tab="${g.key}">
              ${icon(g.icon)}<span class="osel-txt"><span class="osel-l">${g.label}</span><span class="osel-s">${g.sub}</span></span><span class="osel-c">${d.options.rows.filter((r) => r.g === g.key).length}つの形</span>
            </button>`
              )
              .join("\n            ")}
          </div>
          ${d.options.groups
            .map(
              (g, i) => `<div class="osel-panel${i === 0 ? " is-active" : ""}" role="tabpanel" id="opt-${g.key}" aria-labelledby="tab-${g.key}" data-osel-panel="${g.key}">
            <p class="osel-ph">${icon(g.icon)}<span>${g.label}</span></p>
            <ul class="ocards2">
              ${d.options.rows.filter((r) => r.g === g.key).map(optionCard).join("\n              ")}${
                g.hint
                  ? `
              <li class="ocard2 ocard2-hint">${icon("lightbulb")}<p class="ohint-t">${g.hint.t}</p><p class="ohint-d">${g.hint.d}</p></li>`
                  : ""
              }
            </ul>
          </div>`
            )
            .join("\n          ")}
        </div>
        <p class="ometer-scale"><span>準備期間の目安：短い</span>${meter(1)}<span>〜</span>${meter(4)}<span>長い</span></p>`;

  /* ---- PROCESS: two lanes (client / us) either side of a numbered spine ---- */
  const lanes = d.process.steps
    .map(
      (s, i) => `<li class="sw-row${s.free ? " is-free" : ""}">
            <div class="sw-cell sw-you"><span class="sw-tag">お客様</span><p>${s.you}</p></div>
            <div class="sw-mid"><span class="sw-n">${num(i)}</span><h3 class="sw-t">${s.t}</h3><p class="sw-meta"><span class="tl-term">${s.term}</span>${s.free ? '<span class="tl-free">無料</span>' : ""}</p></div>
            <div class="sw-cell sw-we"><span class="sw-tag">当社</span><p>${s.we}</p></div>
          </li>`
    )
    .join("\n          ");

  /* ---- FEE: which step costs money, shown on the same six steps ---- */
  const track = d.process.steps
    .map(
      (s, i) => `<li class="ftrack-i${s.free ? " is-free" : ""}"><span class="ftrack-n">${num(i)}</span><span class="ftrack-t">${s.t}</span><span class="ftrack-b">${s.free ? "無料" : "お見積り後"}</span></li>`
    )
    .join("");

  const way = (key, href, body, attrs = "") => {
    const w = contactWays[key];
    return `<a class="way way-${key}" href="${href}"${attrs}>
            <span class="way-tag">${w.tag}</span>
            ${body}
            <p class="way-t">${w.t}</p>
            <p class="way-d">${w.d}</p>
            <span class="way-go">${w.go}${icon("keyboard_arrow_right")}</span>
          </a>`;
  };

  const body = `    <div class="sphero">
      ${photo(p.hero.image, { cls: "sphero-bg" })}
      <div class="sphero-inner">
        <p class="sphero-kicker">${d.hero.kicker}</p>
        <h1 class="sphero-h1">${d.hero.headline}</h1>
        <p class="sphero-sub">${d.hero.sub}</p>
        <div class="sphero-btns">
          ${lineBtn}
          ${button("フォームから相談する", "/contact", "white")}
        </div>
        <ul class="sphero-chips">${d.hero.chips.map((c) => `<li>${icon("check_circle")}<span>${c}</span></li>`).join("")}</ul>
      </div>
    </div>

    <nav class="anav" aria-label="このページの内容">
      <ul>${d.anchors.map((a) => `<li><a href="#${a.id}">${a.label}</a></li>`).join("")}</ul>
    </nav>

    <section class="sec sec-white" id="worries">
      <div class="sec-inner sec-inner-1080">
        ${crumbs([{ label: "ホーム", href: "/" }, { label: "サービス紹介", href: "/service" }, { label: p.hero.ja }])}
        ${heading(d.worries.en, d.worries.ja, "sec-head-gap")}
        <ul class="worries">
          ${d.worries.items.map((w) => `<li class="worry"><span class="worry-i">${icon(w.icon, "mi-24")}</span><h3 class="worry-t">${w.t}</h3><p class="worry-d">${w.d}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="sec sec-cream" id="options">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.options.en, d.options.ja)}
        <p class="sec-lead sec-lead-l">${d.options.lead}</p>
        ${options}
        <p class="ctable-foot">${d.options.foot}</p>
      </div>
    </section>

    <section class="sec sec-white" id="process">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.process.en, d.process.ja)}
        <p class="sec-lead sec-lead-l">${d.process.lead}</p>
        <p class="sw-total">${icon("schedule")}<span>${d.process.total}</span></p>
        <div class="sw">
          <div class="sw-head" aria-hidden="true"><p>${icon("person")}お客様がすること</p><p></p><p>${icon("support_agent")}当社がすること</p></div>
          <ol class="sw-list">
          ${lanes}
          </ol>
        </div>
      </div>
    </section>

    <section class="sec sec-cream" id="valuation">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.valuation.en, d.valuation.ja)}
        <p class="sec-lead sec-lead-l">${d.valuation.lead}</p>
        <ul class="vpoints">
          ${d.valuation.points.map((v) => `<li class="vpoint"><span class="worry-i">${icon(v.icon, "mi-24")}</span><h3 class="vpoint-t">${v.t}</h3><p class="vpoint-d">${v.d}</p></li>`).join("\n          ")}
        </ul>
        <p class="vnote">${icon("info")}<span>${d.valuation.note}</span></p>
      </div>
    </section>

    <section class="sec sec-navy" id="promise">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.promise.en, d.promise.ja, "on-navy")}
        <ol class="proms">
          ${d.promise.items.map((m, i) => `<li class="prom"><div class="prom-top"><span class="prom-n">0${i + 1}</span>${icon(m.icon, "mi-24")}</div><h3 class="prom-t">${m.t}</h3><p class="prom-d">${m.d}</p></li>`).join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="sec sec-white" id="fee">
      <div class="sec-inner sec-inner-1080">
        ${heading(d.fee.en, d.fee.ja)}
        <p class="sec-lead sec-lead-l">どの段階から費用がかかるのかを、進め方の6つの段階に重ねて示します。</p>
        <ol class="ftrack">${track}</ol>
        <div class="fees">
          <div class="fee fee-free">
            <p class="fee-k">${icon("volunteer_activism")}<span>FREE</span></p>
            <h3 class="fee-t">${d.fee.free.t}</h3>
            <ul class="fee-l">${d.fee.free.items.map((i) => `<li>${icon("check_circle")}<span>${i}</span></li>`).join("")}</ul>
          </div>
          <div class="fee">
            <p class="fee-k">${icon("receipt_long")}<span>QUOTE FIRST</span></p>
            <h3 class="fee-t">${d.fee.paid.t}</h3>
            <ul class="fee-l">${d.fee.paid.items.map((i) => `<li>${icon("arrow_right")}<span>${i}</span></li>`).join("")}</ul>
            <p class="fee-n">${d.fee.paid.note}</p>
          </div>
        </div>
        <div class="fflow">
          <p class="fflow-t">${feeFlow.t}</p>
          <ol class="fflow-l">
            ${feeFlow.steps.map((s) => `<li class="fflow-i"><span class="worry-i">${icon(s.icon, "mi-24")}</span><div><p class="fflow-h">${s.t}</p><p class="fflow-d">${s.d}</p></div></li>`).join("\n            ")}
          </ol>
        </div>
      </div>
    </section>

    <section class="sec sec-cream" id="faq">
      <div class="sec-inner sec-inner-1080">
        ${heading("FAQ", "よくある質問")}
        <div class="faqs">
          ${d.faq.map((f) => `<details class="faq"><summary><span class="faq-q">${f.q}</span>${icon("keyboard_arrow_down")}</summary><p class="faq-a">${f.a}</p></details>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="sec sec-cta2" id="contact">
      ${photo(p.hero.image, { cls: "cta2-bg" })}
      <div class="sec-inner sec-inner-1080">
        <p class="cta2-k">CONTACT</p>
        <h2 class="cta2-h">${d.cta.h}</h2>
        <p class="cta2-p">${d.cta.p}</p>
        <ul class="cta2-chips">${d.hero.chips.map((c) => `<li>${icon("check_circle")}<span>${c}</span></li>`).join("")}</ul>
        <div class="ways">
          ${way("line", line.url, `<span class="way-i way-i-line">${lineMark()}</span><img class="way-qr" src="/images/line-qr.png" alt="LINE公式アカウントの友だち追加用QRコード" width="112" height="112" loading="lazy">`, ' target="_blank" rel="noopener" data-cta="line"')}
          ${way("form", "/contact", `<span class="way-i">${icon("mail", "mi-24")}</span>`)}
          ${way("tel", `tel:${site.tel}`, `<span class="way-i">${icon("call", "mi-24")}</span><p class="way-num">${site.tel}</p>`)}
        </div>
        <div class="cta2-foot">
          <a class="cta-guide" href="${trust.guideline.href}" target="_blank" rel="noopener">${icon("verified_user")}<span>${trust.guideline.label}</span></a>
          <a class="cta2-other" href="${other.href}"><span>${other.kicker}</span>${other.cta}${icon("keyboard_arrow_right")}</a>
        </div>
      </div>
    </section>`;
  return page({ title: p.title, path: p.path, body, bodyClass: "p-sp p-sp-pro" });
}

function renderColumnIndex() {
  const d = column;
  const body = `${pageHero(d.hero)}

    <section class="sec sec-white">
      <div class="sec-inner sec-inner-1080">
        ${crumbs([{ label: "ホーム", href: "/" }, { label: "お役立ち記事" }])}
        <p class="sp-lead">${d.lead}</p>
        <ul class="cats">
          <li><a class="cat is-active" href="/column">すべて</a></li>
          ${d.categories.map((c) => `<li><a class="cat" href="/column#${c.key}">${c.label}</a></li>`).join("")}
        </ul>
        <div class="pcards pcards-grid">
          ${d.posts.map(postCard).join("\n          ")}
        </div>
      </div>
    </section>

${lineCta()}`;
  return page({ title: d.title, path: "/column", body, bodyClass: "p-column" });
}

function renderPost(p) {
  const cat = column.categories.find((c) => c.key === p.category);
  const a = column.authorDefault;
  const blocks = p.body.map((b) => (b.h ? `<h2 class="art-h2">${b.h}</h2>` : `<p class="art-p">${b.p}</p>`)).join("\n          ");
  const body = `    <section class="sec sec-white sec-art">
      <div class="sec-inner sec-inner-1080">
        <article class="art">
          ${crumbs([{ label: "ホーム", href: "/" }, { label: "お役立ち記事", href: "/column" }, { label: cat ? cat.label : "" }])}
          <div class="pcard-meta"><p class="pcard-date">${p.date}</p><p class="pcard-cat">${cat ? cat.label : ""}</p></div>
          <h1 class="art-h1">${p.title}</h1>
          ${photo(p.image, { cls: "art-img" })}
          ${blocks}
          ${p.sources ? `<div class="art-src"><p class="art-src-t">出典</p><ul>${p.sources.map((x) => `<li><a href="${x.href}" target="_blank" rel="noopener">${x.label}</a></li>`).join("")}</ul></div>` : ""}
          <aside class="author">
            <div class="cons-ph">${icon("person", "mi-48")}</div>
            <div><p class="author-l">この記事を書いた人</p><p class="author-n">${a.name}<span>${a.role}</span></p><p class="author-b">${a.bio}</p></div>
          </aside>
          <div class="art-back">${button("記事一覧へ戻る", "/column", "plain", { icon: "keyboard_arrow_left" })}</div>
        </article>
      </div>
    </section>

${lineCta({ compact: true })}`;
  return page({ title: `${p.title}｜アシガルコンサルティング株式会社`, path: `/column/${p.slug}`, body, bodyClass: "p-post" });
}

function render404() {
  const body = `    <section class="sec sec-cream sec-doc">
      <div class="sec-inner sec-inner-1080">
        <div class="doc">
          <h1 class="doc-h1">ページが見つかりません</h1>
          <div class="rich doc-rich"><p>お探しのページは移動または削除された可能性があります。</p></div>
          <div class="doc-back">${button("ホームへ戻る", "/", "plain")}</div>
        </div>
      </div>
    </section>`;
  return page({ title: `ページが見つかりません｜${site.name}`, path: "/404", body, bodyClass: "p-404" });
}

function renderContact() {
  const d = contact;
  const field = (f) => {
    const req = f.required
      ? '<span class="fr fr-req">必須</span>'
      : '<span class="fr fr-opt">任意</span>';
    let input;
    if (f.kind === "select") {
      input = `<div class="fsel">
                <select name="${f.name}" ${f.required ? "required" : ""} disabled>
                  ${f.options.map((o) => `<option>${o}</option>`).join("")}
                </select>
                ${icon("keyboard_arrow_down")}
              </div>`;
    } else if (f.kind === "textarea") {
      input = `<textarea name="${f.name}" rows="6" placeholder="${f.placeholder}" disabled></textarea>`;
    } else {
      input = `<input type="${f.kind}" name="${f.name}" placeholder="${f.placeholder}" ${f.required ? "required" : ""} disabled>`;
    }
    return `<div class="fgrp">
              <label class="flabel">${f.label}${req}</label>
              ${input}
              ${f.note ? `<p class="fnote">${f.note}</p>` : ""}
            </div>`;
  };

  const body = `    <section class="sec sec-cream sec-contact">
      <div class="sec-inner sec-inner-1080">
        <div class="cintro">
          <h1 class="cintro-h">${d.heading}</h1>
          <div class="rich cintro-lead">${d.intro.map((t) => `<p>${t}</p>`).join("")}</div>
          <div class="cintro-urgent">
            <p>${d.urgent}</p>
            <p>${d.hours} <a href="tel:${site.tel}" target="_blank" rel="noopener">${site.tel}</a></p>
          </div>
        </div>

        <!-- Demo clone: the form is display-only. No action, no method, submission blocked in
             main.js and every control disabled, so it can never reach the live enquiry inbox. -->
        <div class="fcard">
          <form class="cform" data-demo-form novalidate>
            ${d.fields.map(field).join("\n            ")}
            <label class="fconsent"><input type="checkbox" name="Confirm" disabled><span>${d.consent}</span></label>
            <button class="btn btn-navy fsubmit" type="submit" disabled><p>${d.submit}</p>${icon("keyboard_arrow_right")}</button>
          </form>
        </div>

        <div class="cnotes">
          ${d.notes.map((n) => `<p>${n}</p>`).join("\n          ")}
        </div>
      </div>
    </section>`;
  return page({ title: d.title, path: "/contact", body, bodyClass: "p-contact" });
}

function renderThanks() {
  const d = thanks;
  const body = `    <section class="sec sec-cream sec-doc">
      <div class="sec-inner sec-inner-1080">
        <div class="doc">
          <h1 class="doc-h1">${d.heading}</h1>
          <div class="rich doc-rich">${d.body.map((p) => `<p>${p}</p>`).join("")}</div>
          <div class="doc-back">${button(d.backLabel, "/", "plain")}</div>
        </div>
      </div>
    </section>`;
  return page({ title: d.title, path: "/thanks", body, bodyClass: "p-thanks" });
}

function renderPrivacy() {
  const d = privacy;
  const block = (b) => {
    if (b.type === "p") return `<p class="doc-p">${b.text}</p>`;
    const tag = b.type;
    return `<${tag} class="doc-list">${b.items.map((i) => `<li>${i}</li>`).join("")}</${tag}>`;
  };
  const body = `    <section class="sec sec-cream sec-doc">
      <div class="sec-inner sec-inner-1080">
        <div class="doc">
          <h1 class="doc-h1">${d.heading}</h1>
          <p class="doc-p">${d.lead}</p>
          ${d.sections
            .map((s) => `<h2 class="doc-h2">${s.h}</h2>\n          ${s.blocks.map(block).join("\n          ")}`)
            .join("\n          ")}
        </div>
      </div>
    </section>`;
  return page({ title: d.title, path: "/privacypolicy", body, bodyClass: "p-privacy" });
}

/* ---------------------------------------------------------------- write */

const PAGES = [
  ["index.html", renderHome()],
  ["about.html", renderAbout()],
  ["service.html", renderService()],
  ["contact.html", renderContact()],
  ["thanks.html", renderThanks()],
  ["privacypolicy.html", renderPrivacy()],
  ["404.html", render404()],
  ...servicePages.map((p) => [`service/${p.slug}.html`, pro[p.slug] ? renderProServicePage(p) : renderServicePage(p)]),
  ["column.html", renderColumnIndex()],
  ...column.posts.map((p) => [`column/${p.slug}.html`, renderPost(p)]),
];

// Overwrite in place rather than wiping the directory: this repo lives inside a Dropbox
// synced folder, which holds handles open and makes rm of the directory itself EPERM.
mkdirSync(OUT, { recursive: true });
mkdirSync(`${OUT}/service`, { recursive: true });
mkdirSync(`${OUT}/column`, { recursive: true });

const doctype = "<!doctype html>\n<html lang=\"ja\">\n<head>\n  ";
for (const [name, html] of PAGES) {
  writeFileSync(`${OUT}/${name}`, doctype + html.replace("<body", "</head>\n<body") + "\n</html>\n");
}

cpSync("assets", `${OUT}`, { recursive: true });
cpSync("public/images", `${OUT}/images`, { recursive: true });

// /thanks is deliberately left out of the sitemap (PROJECT.md: noindex).
const urls = [
  "/", "/about", "/service", "/contact", "/privacypolicy",
  ...servicePages.map((p) => p.path),
  "/column",
  ...column.posts.map((p) => `/column/${p.slug}`),
];
writeFileSync(
  `${OUT}/robots.txt`,
  MODE === "production"
    ? `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n"
);
writeFileSync(
  `${OUT}/sitemap.xml`,
  MODE === "production"
    ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `<url><loc>${ORIGIN}${u}</loc></url>`)
        .join("\n")}\n</urlset>\n`
    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n'
);

console.log(`built ${PAGES.length} pages → ${OUT}/  (mode=${MODE})`);
