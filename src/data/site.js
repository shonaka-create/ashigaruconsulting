// Site-wide facts, transcribed from the live site. Nothing here is invented; every string
// and URL is exactly what ashigaru-consulting.co.jp serves (see docs/current-site-audit.md).

export const site = {
  name: "アシガルコンサルティング株式会社",
  tel: "03-6261-0660",
  email: "info@ashigaru-consulting.co.jp",
  mapUrl: "https://maps.app.goo.gl/y6z8KSGxpGaiUuur7",
  // The live embed points at 神南1-23-10, which is NOT the address in the body copy
  // (道玄坂1-10-8). Reproduced as-is; flagged in docs/clone-plan.md as item C.
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3241.808657940609!2d139.6979988!3d35.6570856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b57fd16a495%3A0xcb06d1441e80b58d!2z44CSMTUwLTAwNDEg5p2x5Lqs6YO95riL6LC35Yy656We5Y2X77yR5LiB55uu77yS77yT4oiS77yR77yQ!5e0!3m2!1sja!2sjp!4v1759817019405!5m2!1sja!2sjp",
  copyright: "© 2025 Ashigaru Consulting Co., Ltd.<br>All Rights Reserved.",
  logoHeader: "/images/f3705fa1ed7c.webp",
  logoFooter: "/images/92450f5a85ac.webp",
  defaultTitle: "保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社",
  description:
    "アシガルコンサルティング株式会社は、 日本初の「保険代理店向け M&A マッチング支援」を中核に据えた独立系専門コンサルティング会社です。 現場の声に真摯に耳を傾け、代理店の皆様とともに課題を解決し、持続的な成長を実現する未来を描きます。",
};

// Header nav: the four plain links, then the two emphasised ones on the right.
// "ニュース" points at /#news on every page — following it from a sub-page returns you
// to the top page. Reproduced as-is (docs/clone-plan.md, 原本の問題点 3).
export const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "私たちについて", href: "/about" },
  { label: "サービス紹介", href: "/service" },
  { label: "ニュース", href: "/#news" },
];

export const navActions = [
  { label: "お問い合わせ", href: "/contact" },
  { label: "電話をかける", href: `tel:${site.tel}`, icon: "settings_phone", newTab: true },
];

// The mobile drawer uses a different label format ("HOME / ホーム") from the desktop bar.
export const drawerLinks = [
  { label: "HOME / ホーム", href: "/" },
  { label: "ABOUT US / 私たちについて", href: "/about" },
  { label: "SERVICE / サービス紹介", href: "/service" },
  { label: "NEWS / お知らせ", href: "/#news" },
  { label: "CONTACT / お問い合わせ", href: "/contact" },
  { label: "CALL NOW / 電話をかける", href: `tel:${site.tel}` },
];

export const footerLinks = [
  { label: "ホーム", href: "/" },
  { label: "私たちについて", href: "/about" },
  { label: "サービス紹介", href: "/service" },
  { label: "ニュース", href: "/#news" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "電話をかける", href: `tel:${site.tel}`, icon: "phone" },
];

export const footerCta = [
  { title: "メールで相談する", sub: "メールでお問い合わせはこちらから", href: "/contact" },
  // The phone card's sub-line is 400 where the mail card's is 500 — an inconsistency in
  // the source, kept rather than harmonised.
  { title: "電話で相談する", sub: "お電話はこちらから", subLight: true, href: `tel:${site.tel}` },
];
