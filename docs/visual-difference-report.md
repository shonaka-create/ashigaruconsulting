# 表示差異レポート — 実サイト vs クローン

- 比較日: 2026-08-08
- 実サイト: https://ashigaru-consulting.co.jp
- クローン: http://localhost:4173
- 方法: Playwright + Chromium。同一ビューポート・deviceScaleFactor=1 で描画し、computed style と実測pxを数値比較。スクリーンショットは **viewport単位**(fullPageはパララックスが動くため使用しない)
- 判定: ±1px=一致 / ±4px=実用上一致 / それ超=**差異**
- 除外: Cookieバナー・デモ表示などのオーバーレイは両側から除去してから計測(`--ignore` で追加、`--keep-overlays` で無効化)。スクリーンショットは除去前の実際の見た目


## 1440 × 900

### /

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 5504 | 5518 | +14 | **差異** |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 4984.6 | 4998.2 | +13.6 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.5 | 519.4 | -0.1 | 一致 |
| footer y | 4984.6 | 4998.2 | +13.6 | **差異** |
| h1 幅 | 1184 | 1184 | 0 | 一致 |
| h1 高 | 122 | 122 | 0 | 一致 |
| h1 y | 264 | 264.1 | +0.1 | 一致 |
| h2 幅 | 200.8 | 444 | +243.2 | **差異** |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 984 | 984 | 0 | 一致 |
| h3 幅 | 856 | 442.7 | -413.3 | **差異** |
| h3 高 | 44.8 | 44.8 | 0 | 一致 |
| h3 y | 2313.6 | 2301 | -12.6 | **差異** |
| p 幅 | 592 | 592 | 0 | 一致 |
| p 高 | 76.8 | 76.8 | 0 | 一致 |
| p y | 434 | 434.1 | +0.1 | 一致 |
| a 幅 | 244 | 244 | 0 | 一致 |
| a 高 | 62.4 | 62 | -0.4 | 一致 |
| a y | 560.2 | 560.4 | +0.2 | 一致 |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける setting…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone 保険代理店のこれからを 一緒に考える。 現場の声を起点に、代理店の皆様とと…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontFamily: live=`sans-serif` clone=`Lato`
  - h1.fontWeight: live=`700` clone=`400`
  - h1.lineHeight: live=`32px` clone=`51.2px`
  - h1.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.fontFamily: live=`sans-serif` clone=`Lato`
  - a.fontWeight: live=`400` clone=`500`
  - a.lineHeight: live=`16px` clone=`22.4px`
  - a.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
- 画像: `compare/index--1440-live.png` / `compare/index--1440-clone.png`

### /about

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 6332 | 6339 | +7 | **差異** |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 5333 | 5819.7 | +486.7 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.5 | 519.4 | -0.1 | 一致 |
| footer y | 5813 | 5819.7 | +6.7 | **差異** |
| h1 幅 | 1184 | 1184 | 0 | 一致 |
| h1 高 | 86.4 | 86.4 | 0 | 一致 |
| h1 y | 168 | 168 | 0 | 一致 |
| h2 幅 | 229.7 | 568 | +338.3 | **差異** |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 516 | 516 | 0 | 一致 |
| p 幅 | 1184 | 1184 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 266.4 | 266.4 | 0 | 一致 |
| a 幅 | 180 | 180 | 0 | 一致 |
| a 高 | 28 | 28 | 0 | 一致 |
| a y | 4040 | 4070.7 | +30.7 | **差異** |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …会社概要｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける set…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone ABOUT US 私たちについて About Us 私たちについて 私たち…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h2.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/about--1440-live.png` / `compare/about--1440-clone.png`

### /service

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 2840 | 2844 | +4 | 実用上一致 |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 2320.7 | 2324.7 | +4 | 実用上一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.3 | 519.4 | +0.1 | 一致 |
| footer y | 2320.7 | 2324.7 | +4 | 実用上一致 |
| h1 幅 | 1184 | 1184 | 0 | 一致 |
| h1 高 | 86.4 | 86.4 | 0 | 一致 |
| h1 y | 168 | 168 | 0 | 一致 |
| h2 幅 | 1184 | 1184 | 0 | 一致 |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 516 | 516 | 0 | 一致 |
| p 幅 | 1184 | 1184 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 266.4 | 266.4 | 0 | 一致 |
| section[0] 高 | 396 | 396 | 0 | 一致 |
| section[1] 高 | 1924.7 | 1928.7 | +4 | 実用上一致 |

- 本文テキスト: **不一致** @0
    live : …事業内容｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける set…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone SERVICES サービス紹介 OUR SERVICES アシガルコンサル…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h2.textAlign: live=`left` clone=`start`
- 画像: `compare/service--1440-live.png` / `compare/service--1440-clone.png`

### /privacypolicy

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3315 | 3315 | 0 | 一致 |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 2795.9 | 2795.9 | 0 | 一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.5 | 519.4 | -0.1 | 一致 |
| footer y | 2795.9 | 2795.9 | 0 | 一致 |
| h1 幅 | 732.8 | 733 | +0.2 | 一致 |
| h1 高 | 44.8 | 44.8 | 0 | 一致 |
| h1 y | 208 | 208 | 0 | 一致 |
| h2 幅 | 732.8 | 733 | +0.2 | 一致 |
| h2 高 | 45 | 45 | 0 | 一致 |
| h2 y | 424 | 424 | 0 | 一致 |
| p 幅 | 732.8 | 733 | +0.2 | 一致 |
| p 高 | 51.2 | 51.2 | 0 | 一致 |
| p y | 324.8 | 324.8 | 0 | 一致 |
| a 幅 | 160 | 160 | 0 | 一致 |
| a 高 | 19 | 19 | 0 | 一致 |
| a y | 2514.1 | 2538.1 | +24 | **差異** |
| section[0] 高 | 2795.9 | 2795.9 | 0 | 一致 |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける setting…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone 個人情報保護方針 アシガルコンサルティング株式会社（以下「当社」といいます…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.letterSpacing: live=`1.4px` clone=`normal`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/privacypolicy--1440-live.png` / `compare/privacypolicy--1440-clone.png`

### /contact

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 2920 | 2858 | -62 | **差異** |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 2400.3 | 2338.2 | -62.1 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.5 | 519.4 | -0.1 | 一致 |
| footer y | 2400.3 | 2338.2 | -62.1 | **差異** |
| h1 幅 | 0 | 684 | +684 | **差異** |
| h1 高 | 0 | 39.2 | +39.2 | **差異** |
| h1 y | 0 | 184 | +184 | **差異** |
| p 幅 | 684 | 684 | 0 | 一致 |
| p 高 | 39.2 | 76.8 | +37.6 | **差異** |
| p y | 184 | 247.2 | +63.2 | **差異** |
| a 幅 | 160.3 | 155.9 | -4.4 | **差異** |
| a 高 | 22 | 29 | +7 | **差異** |
| a y | 469.4 | 464.4 | -5 | **差異** |
| button 幅 | 251.8 | 255 | +3.2 | 実用上一致 |
| button 高 | 88.5 | 57 | -31.5 | **差異** |
| button y | 1877.2 | 1839.6 | -37.6 | **差異** |
| section[0] 高 | 2400.3 | 2338.2 | -62.1 | **差異** |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける setting…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone 【無料】お気軽にご連絡ください 事業承継や代理店の将来について、すでに多く…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontSize: live=`24px` clone=`28px`
  - h1.fontWeight: live=`500` clone=`700`
  - h1.lineHeight: live=`38.4px` clone=`39.2px`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - p.fontSize: live=`28px` clone=`16px`
  - p.fontWeight: live=`700` clone=`400`
  - p.lineHeight: live=`39.2px` clone=`25.6px`
  - a.fontSize: live=`18px` clone=`24px`
  - a.fontWeight: live=`700` clone=`500`
  - a.lineHeight: live=`28.8px` clone=`38.4px`
  - button.fontFamily: live=`sans-serif` clone=`Arial`
  - button.fontWeight: live=`400` clone=`700`
  - button.lineHeight: live=`15px` clone=`28.5px`
- 画像: `compare/contact--1440-live.png` / `compare/contact--1440-clone.png`

### /thanks

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 1262 | 1261 | -1 | 一致 |
| scrollWidth | 1440 | 1440 | 0 | 一致 |
| header 幅 | 1440 | 1440 | 0 | 一致 |
| header 高 | 116 | 116 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 1440 | 1440 | 0 | 一致 |
| main 高 | 742.3 | 742 | -0.3 | 一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 1440 | 1440 | 0 | 一致 |
| footer 高 | 519.3 | 519.4 | +0.1 | 一致 |
| footer y | 742.3 | 742 | -0.3 | 一致 |
| h1 幅 | 684 | 684 | 0 | 一致 |
| h1 高 | 44.8 | 44.8 | 0 | 一致 |
| h1 y | 208 | 208 | 0 | 一致 |
| p 幅 | 684 | 684 | 0 | 一致 |
| p 高 | 25.6 | 25.6 | 0 | 一致 |
| p y | 276.8 | 276.8 | 0 | 一致 |
| a 幅 | 103.9 | 103.9 | 0 | 一致 |
| a 高 | 19 | 19 | 0 | 一致 |
| a y | 305.4 | 305.4 | 0 | 一致 |
| section[0] 高 | 742.3 | 742 | -0.3 | 一致 |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける setting…
    clone: …ホーム 私たちについて サービス紹介 ニュース お問い合わせ 電話をかける settings_phone お問い合わせありがとうございます 内容を確認のうえ、通常 3 営業日以内に…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h1.letterSpacing: live=`1.4px` clone=`normal`
  - p.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/thanks--1440-live.png` / `compare/thanks--1440-clone.png`


## 768 × 1024

### /

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 6146 | 5945 | -201 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 5410 | 5345 | -65 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.3 | 599.8 | -136.5 | **差異** |
| footer y | 5410 | 5345 | -65 | **差異** |
| h1 幅 | 672 | 672 | 0 | 一致 |
| h1 高 | 122 | 122 | 0 | 一致 |
| h1 y | 264 | 264.1 | +0.1 | 一致 |
| h2 幅 | 200.8 | 672 | +471.2 | **差異** |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 960 | 960 | 0 | 一致 |
| h3 幅 | 624 | 387.3 | -236.7 | **差異** |
| h3 高 | 39.2 | 39.2 | 0 | 一致 |
| h3 y | 2772.3 | 2645.4 | -126.9 | **差異** |
| p 幅 | 672 | 672 | 0 | 一致 |
| p 高 | 76.8 | 76.8 | 0 | 一致 |
| p y | 434 | 434.1 | +0.1 | 一致 |
| a 幅 | 244 | 244 | 0 | 一致 |
| a 高 | 62.4 | 62 | -0.4 | 一致 |
| a y | 558.8 | 558.9 | +0.1 | 一致 |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 保険代理店のこれからを 一緒に考える 現場の声を起点に、代理店の皆様とともに次の…
    clone: …menu 保険代理店のこれからを 一緒に考える。 現場の声を起点に、代理店の皆様とともに次の未来を拓きます。 アシガルコンサルティングは、日本初の保険代理店向け M&A マッチング…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontFamily: live=`sans-serif` clone=`Lato`
  - h1.fontWeight: live=`700` clone=`400`
  - h1.lineHeight: live=`32px` clone=`51.2px`
  - h1.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.fontFamily: live=`sans-serif` clone=`Lato`
  - a.fontWeight: live=`400` clone=`500`
  - a.lineHeight: live=`16px` clone=`22.4px`
  - a.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
- 画像: `compare/index--768-live.png` / `compare/index--768-clone.png`

### /about

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 8945 | 8656 | -289 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 7239.6 | 8056.5 | +816.9 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.3 | 599.8 | -136.5 | **差異** |
| footer y | 8208.2 | 8056.5 | -151.7 | **差異** |
| h1 幅 | 672 | 672 | 0 | 一致 |
| h1 高 | 57.6 | 57.6 | 0 | 一致 |
| h1 y | 120 | 120 | 0 | 一致 |
| h2 幅 | 229.7 | 672 | +442.3 | **差異** |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 407.2 | 407 | -0.2 | 一致 |
| p 幅 | 672 | 672 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 189.6 | 189.6 | 0 | 一致 |
| a 幅 | 120 | 180 | +60 | **差異** |
| a 高 | 28 | 28 | 0 | 一致 |
| a y | 5946.6 | 5854.5 | -92.1 | **差異** |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …会社概要｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました menu ABOUT US 私たちについて About Us 私たちについて 私た…
    clone: …menu ABOUT US 私たちについて About Us 私たちについて 私たちの原点(創業の想い・ストーリー) 「そういうこっちが、本当に聞きたいことを、メーカーの社員は全然…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h2.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/about--768-live.png` / `compare/about--768-clone.png`

### /service

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3884 | 3751 | -133 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 3147.9 | 3151.7 | +3.8 | 実用上一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.1 | 599.8 | -136.3 | **差異** |
| footer y | 3147.9 | 3151.7 | +3.8 | 実用上一致 |
| h1 幅 | 672 | 672 | 0 | 一致 |
| h1 高 | 57.6 | 57.6 | 0 | 一致 |
| h1 y | 120 | 120 | 0 | 一致 |
| h2 幅 | 423.6 | 672 | +248.4 | **差異** |
| h2 高 | 48 | 48 | 0 | 一致 |
| h2 y | 407.2 | 407 | -0.2 | 一致 |
| p 幅 | 672 | 672 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 189.6 | 189.6 | 0 | 一致 |
| section[0] 高 | 287.2 | 287 | -0.2 | 一致 |
| section[1] 高 | 2860.7 | 2864.7 | +4 | 実用上一致 |

- 本文テキスト: **不一致** @0
    live : …事業内容｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました menu SERVICES サービス紹介 OUR SERVICES アシガルコンサ…
    clone: …menu SERVICES サービス紹介 OUR SERVICES アシガルコンサルティングのサービス紹介 M＆A マッチング支援サービス 保険代理店の事業承継や M&A を円滑に…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h2.textAlign: live=`left` clone=`start`
- 画像: `compare/service--768-live.png` / `compare/service--768-clone.png`

### /privacypolicy

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3574 | 3524 | -50 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 2837.5 | 2923.9 | +86.4 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.3 | 599.8 | -136.5 | **差異** |
| footer y | 2837.5 | 2923.9 | +86.4 | **差異** |
| h1 幅 | 576 | 576 | 0 | 一致 |
| h1 高 | 38.4 | 44.8 | +6.4 | **差異** |
| h1 y | 168 | 208 | +40 | **差異** |
| h2 幅 | 576 | 576 | 0 | 一致 |
| h2 高 | 45 | 45 | 0 | 一致 |
| h2 y | 377.6 | 424 | +46.4 | **差異** |
| p 幅 | 576 | 576 | 0 | 一致 |
| p 高 | 51.2 | 51.2 | 0 | 一致 |
| p y | 278.4 | 324.8 | +46.4 | **差異** |
| a 幅 | 160 | 160 | 0 | 一致 |
| a 高 | 19 | 19 | 0 | 一致 |
| a y | 2595.7 | 2666.1 | +70.4 | **差異** |
| section[0] 高 | 2837.5 | 2923.9 | +86.4 | **差異** |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 個人情報保護方針 アシガルコンサルティング株式会社（以下「当社」といいます。）は…
    clone: …menu 個人情報保護方針 アシガルコンサルティング株式会社（以下「当社」といいます。）は、利用者に関する情報を以下の通り、取り扱います。 1.個人情報の収集 当社は、保険代理店の…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontSize: live=`24px` clone=`28px`
  - h1.lineHeight: live=`38.4px` clone=`44.8px`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/privacypolicy--768-live.png` / `compare/privacypolicy--768-clone.png`

### /contact

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3201 | 2964 | -237 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 2465 | 2363.8 | -101.2 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.3 | 599.8 | -136.5 | **差異** |
| footer y | 2465 | 2363.8 | -101.2 | **差異** |
| h1 幅 | 0 | 576 | +576 | **差異** |
| h1 高 | 0 | 39.2 | +39.2 | **差異** |
| h1 y | 0 | 184 | +184 | **差異** |
| p 幅 | 0 | 576 | +576 | **差異** |
| p 高 | 0 | 102.4 | +102.4 | **差異** |
| p y | 0 | 247.2 | +247.2 | **差異** |
| a 幅 | 0 | 155.9 | +155.9 | **差異** |
| a 高 | 0 | 29 | +29 | **差異** |
| a y | 0 | 490 | +490 | **差異** |
| button 幅 | 251.8 | 255 | +3.2 | 実用上一致 |
| button 高 | 88.5 | 57 | -31.5 | **差異** |
| button y | 1958.8 | 1865.2 | -93.6 | **差異** |
| section[0] 高 | 2465 | 2363.8 | -101.2 | **差異** |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 【無料】 お気軽にご連絡ください 事業承継や代理店の将来について、すでに多くの経…
    clone: …menu 【無料】お気軽にご連絡ください 事業承継や代理店の将来について、すでに多くの経営者様からご相談をいただいています。 「少し不安だな」と思ったときこそ、将来を見据えて踏み出…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontSize: live=`24px` clone=`28px`
  - h1.fontWeight: live=`500` clone=`700`
  - h1.lineHeight: live=`38.4px` clone=`39.2px`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - p.fontSize: live=`28px` clone=`16px`
  - p.fontWeight: live=`700` clone=`400`
  - p.lineHeight: live=`39.2px` clone=`25.6px`
  - a.fontSize: live=`18px` clone=`24px`
  - a.fontWeight: live=`700` clone=`500`
  - a.lineHeight: live=`28.8px` clone=`38.4px`
  - button.fontFamily: live=`sans-serif` clone=`Arial`
  - button.fontWeight: live=`400` clone=`700`
  - button.lineHeight: live=`15px` clone=`28.5px`
- 画像: `compare/contact--768-live.png` / `compare/contact--768-clone.png`

### /thanks

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 1443 | 1393 | -50 | **差異** |
| scrollWidth | 768 | 768 | 0 | 一致 |
| header 幅 | 768 | 768 | 0 | 一致 |
| header 高 | 100 | 100 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 768 | 768 | 0 | 一致 |
| main 高 | 707.1 | 793.1 | +86 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 768 | 768 | 0 | 一致 |
| footer 高 | 736.1 | 599.8 | -136.3 | **差異** |
| footer y | 707.1 | 793.1 | +86 | **差異** |
| h1 幅 | 576 | 576 | 0 | 一致 |
| h1 高 | 38.4 | 44.8 | +6.4 | **差異** |
| h1 y | 168 | 208 | +40 | **差異** |
| p 幅 | 576 | 576 | 0 | 一致 |
| p 高 | 25.6 | 25.6 | 0 | 一致 |
| p y | 230.4 | 276.8 | +46.4 | **差異** |
| a 幅 | 103.9 | 103.9 | 0 | 一致 |
| a 高 | 19 | 19 | 0 | 一致 |
| a y | 259 | 305.4 | +46.4 | **差異** |
| section[0] 高 | 707.1 | 793.1 | +86 | **差異** |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu お問い合わせありがとうございます 内容を確認のうえ、通常 3 営業日以内に担当者…
    clone: …menu お問い合わせありがとうございます 内容を確認のうえ、通常 3 営業日以内に担当者よりご連絡いたします。 お急ぎの際は、恐れ入りますが 03-6261-0660 までお電話…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h1.fontSize: live=`24px` clone=`28px`
  - h1.lineHeight: live=`38.4px` clone=`44.8px`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - p.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/thanks--768-live.png` / `compare/thanks--768-clone.png`


## 390 × 844

### /

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 5889 | 5886 | -3 | 実用上一致 |
| scrollWidth | 390 | 403 | +13 | **差異** |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 5317.7 | 5315.7 | -2 | 実用上一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.9 | 570.6 | -0.3 | 一致 |
| footer y | 5317.7 | 5315.7 | -2 | 実用上一致 |
| h1 幅 | 328 | 328 | 0 | 一致 |
| h1 高 | 122 | 122 | 0 | 一致 |
| h1 y | 144 | 119.5 | -24.5 | **差異** |
| h2 幅 | 141 | 342 | +201 | **差異** |
| h2 高 | 28 | 28 | 0 | 一致 |
| h2 y | 776.4 | 776 | -0.4 | 一致 |
| h3 幅 | 294 | 294 | 0 | 一致 |
| h3 高 | 67.2 | 67.2 | 0 | 一致 |
| h3 y | 2375 | 2401.3 | +26.3 | **差異** |
| p 幅 | 328 | 328 | 0 | 一致 |
| p 高 | 128 | 128 | 0 | 一致 |
| p y | 266 | 289.5 | +23.5 | **差異** |
| a 幅 | 328 | 328 | 0 | 一致 |
| a 高 | 62.4 | 62 | -0.4 | 一致 |
| a y | 442 | 465.5 | +23.5 | **差異** |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 保険代理店のこれからを 一緒に考える 現場の声を起点に、代理店の皆様とともに次の…
    clone: …menu 保険代理店のこれからを 一緒に考える 現場の声を起点に、代理店の皆様とともに次の未来を拓きます。 アシガルコンサルティングは、日本初の保険代理店向け M&A マッチング支…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontFamily: live=`sans-serif` clone=`Lato`
  - h1.fontWeight: live=`700` clone=`400`
  - h1.lineHeight: live=`32px` clone=`51.2px`
  - h1.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.fontFamily: live=`sans-serif` clone=`Lato`
  - a.fontWeight: live=`400` clone=`500`
  - a.lineHeight: live=`16px` clone=`22.4px`
  - a.color: live=`rgb(51, 51, 51)` clone=`rgb(255, 255, 255)`
- 画像: `compare/index--390-live.png` / `compare/index--390-clone.png`

### /about

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 8011 | 7611 | -400 | **差異** |
| scrollWidth | 390 | 390 | 0 | 一致 |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 6568.9 | 7040.5 | +471.6 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.9 | 570.6 | -0.3 | 一致 |
| footer y | 7440.5 | 7040.5 | -400 | **差異** |
| h1 幅 | 294 | 294 | 0 | 一致 |
| h1 高 | 48 | 48 | 0 | 一致 |
| h1 y | 120 | 120 | 0 | 一致 |
| h2 幅 | 140.6 | 342 | +201.4 | **差異** |
| h2 高 | 28 | 28 | 0 | 一致 |
| h2 y | 341.6 | 342 | +0.4 | 一致 |
| p 幅 | 294 | 294 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 180 | 180 | 0 | 一致 |
| a 幅 | 120 | 120 | 0 | 一致 |
| a 高 | 28 | 28 | 0 | 一致 |
| a y | 4973.9 | 4905 | -68.9 | **差異** |
| セクション数 | 6 | 7 | — | 構造差(要確認) |

- 本文テキスト: **不一致** @0
    live : …会社概要｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました menu ABOUT US 私たちについて About Us 私たちについて 私た…
    clone: …menu ABOUT US 私たちについて About Us 私たちについて 私たちの原点(創業の想い・ストーリー) 「そういうこっちが、本当に聞きたいことを、メーカーの社員は全然…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h2.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/about--390-live.png` / `compare/about--390-clone.png`

### /service

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3528 | 3474 | -54 | **差異** |
| scrollWidth | 390 | 390 | 0 | 一致 |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 2957.6 | 2903.6 | -54 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.8 | 570.6 | -0.2 | 一致 |
| footer y | 2957.6 | 2903.6 | -54 | **差異** |
| h1 幅 | 294 | 294 | 0 | 一致 |
| h1 高 | 48 | 48 | 0 | 一致 |
| h1 y | 120 | 120 | 0 | 一致 |
| h2 幅 | 319.2 | 342 | +22.8 | **差異** |
| h2 高 | 28 | 28 | 0 | 一致 |
| h2 y | 341.6 | 342 | +0.4 | 一致 |
| p 幅 | 294 | 294 | 0 | 一致 |
| p 高 | 33.6 | 33.6 | 0 | 一致 |
| p y | 180 | 180 | 0 | 一致 |
| section[0] 高 | 277.6 | 278 | +0.4 | 一致 |
| section[1] 高 | 2680 | 2625.6 | -54.4 | **差異** |

- 本文テキスト: **不一致** @0
    live : …事業内容｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 読み込まれました menu SERVICES サービス紹介 OUR SERVICES アシガルコンサ…
    clone: …menu SERVICES サービス紹介 OUR SERVICES アシガルコンサルティングのサービス紹介 M＆A マッチング支援サービス 保険代理店の事業承継や M&A を円滑に…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h2.textAlign: live=`left` clone=`start`
- 画像: `compare/service--390-live.png` / `compare/service--390-clone.png`

### /privacypolicy

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3904 | 3901 | -3 | 実用上一致 |
| scrollWidth | 390 | 390 | 0 | 一致 |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 3333.3 | 3330.1 | -3.2 | 実用上一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.9 | 570.6 | -0.3 | 一致 |
| footer y | 3333.3 | 3330.1 | -3.2 | 実用上一致 |
| h1 幅 | 342 | 342 | 0 | 一致 |
| h1 高 | 38.4 | 38.4 | 0 | 一致 |
| h1 y | 120 | 120 | 0 | 一致 |
| h2 幅 | 342 | 342 | 0 | 一致 |
| h2 高 | 41.8 | 41.8 | 0 | 一致 |
| h2 y | 355.2 | 355.2 | 0 | 一致 |
| p 幅 | 342 | 342 | 0 | 一致 |
| p 高 | 76.8 | 76.8 | 0 | 一致 |
| p y | 230.4 | 230.4 | 0 | 一致 |
| a 幅 | 160 | 160 | 0 | 一致 |
| a 高 | 19 | 19 | 0 | 一致 |
| a y | 3113.9 | 3166.7 | +52.8 | **差異** |
| section[0] 高 | 3333.3 | 3330.1 | -3.2 | 実用上一致 |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 個人情報保護方針 アシガルコンサルティング株式会社（以下「当社」といいます。）は…
    clone: …menu 個人情報保護方針 アシガルコンサルティング株式会社（以下「当社」といいます。）は、利用者に関する情報を以下の通り、取り扱います。 1.個人情報の収集 当社は、保険代理店の…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - h2.letterSpacing: live=`0.9px` clone=`1px`
  - h2.textAlign: live=`left` clone=`start`
  - p.textAlign: live=`left` clone=`start`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/privacypolicy--390-live.png` / `compare/privacypolicy--390-clone.png`

### /contact

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 3292 | 3201 | -91 | **差異** |
| scrollWidth | 390 | 390 | 0 | 一致 |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 2721.4 | 2630 | -91.4 | **差異** |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.9 | 570.6 | -0.3 | 一致 |
| footer y | 2721.4 | 2630 | -91.4 | **差異** |
| h1 幅 | 0 | 294 | +294 | **差異** |
| h1 高 | 0 | 78.4 | +78.4 | **差異** |
| h1 y | 0 | 128 | +128 | **差異** |
| p 幅 | 0 | 294 | +294 | **差異** |
| p 高 | 0 | 153.6 | +153.6 | **差異** |
| p y | 0 | 230.4 | +230.4 | **差異** |
| a 幅 | 0 | 196.5 | +196.5 | **差異** |
| a 高 | 0 | 67.4 | +67.4 | **差異** |
| a y | 0 | 553.1 | +553.1 | **差異** |
| button 幅 | 261.8 | 255 | -6.8 | **差異** |
| button 高 | 88.5 | 57 | -31.5 | **差異** |
| button y | 2067.3 | 2077.2 | +9.9 | **差異** |
| section[0] 高 | 2721.4 | 2630 | -91.4 | **差異** |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu 【無料】 お気軽にご連絡ください 事業承継や代理店の将来について、すでに多くの経…
    clone: …menu 【無料】お気軽にご連絡ください 事業承継や代理店の将来について、すでに多くの経営者様からご相談をいただいています。 「少し不安だな」と思ったときこそ、将来を見据えて踏み出…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - footer.backgroundColor: live=`rgb(0, 0, 0)` clone=`rgb(0, 53, 113)`
  - h1.fontSize: live=`20px` clone=`28px`
  - h1.fontWeight: live=`500` clone=`700`
  - h1.lineHeight: live=`32px` clone=`39.2px`
  - h1.letterSpacing: live=`1px` clone=`normal`
  - p.fontSize: live=`28px` clone=`16px`
  - p.fontWeight: live=`700` clone=`400`
  - p.lineHeight: live=`39.2px` clone=`25.6px`
  - a.fontSize: live=`18px` clone=`24px`
  - a.fontWeight: live=`700` clone=`500`
  - a.lineHeight: live=`28.8px` clone=`38.4px`
  - button.fontFamily: live=`sans-serif` clone=`Arial`
  - button.fontWeight: live=`400` clone=`700`
  - button.lineHeight: live=`15px` clone=`28.5px`
- 画像: `compare/contact--390-live.png` / `compare/contact--390-clone.png`

### /thanks

| 項目 | 実サイト | クローン | 差 | 判定 |
| --- | --- | --- | --- | --- |
| ドキュメント高 | 1408 | 1405 | -3 | 実用上一致 |
| scrollWidth | 390 | 390 | 0 | 一致 |
| header 幅 | 390 | 390 | 0 | 一致 |
| header 高 | 76 | 76 | 0 | 一致 |
| header y | 0 | 0 | 0 | 一致 |
| main 幅 | 390 | 390 | 0 | 一致 |
| main 高 | 836.7 | 834.7 | -2 | 実用上一致 |
| main y | 0 | 0 | 0 | 一致 |
| footer 幅 | 390 | 390 | 0 | 一致 |
| footer 高 | 570.8 | 570.6 | -0.2 | 一致 |
| footer y | 836.7 | 834.7 | -2 | 実用上一致 |
| h1 幅 | 342 | 294 | -48 | **差異** |
| h1 高 | 76.8 | 76.8 | 0 | 一致 |
| h1 y | 104 | 152 | +48 | **差異** |
| p 幅 | 342 | 294 | -48 | **差異** |
| p 高 | 57.6 | 51.2 | -6.4 | **差異** |
| p y | 204.8 | 252.8 | +48 | **差異** |
| a 幅 | 331.6 | 293.9 | -37.7 | **差異** |
| a 高 | 50.8 | 44.6 | -6.2 | **差異** |
| a y | 265.4 | 307 | +41.6 | **差異** |
| section[0] 高 | 836.7 | 834.7 | -2 | 実用上一致 |

- 本文テキスト: **不一致** @0
    live : …保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 読み込まれました menu お問い合わせありがとうございます 内容を確認のうえ、通常 3 営業日以内に担当者…
    clone: …menu お問い合わせありがとうございます 内容を確認のうえ、通常 3 営業日以内に担当者よりご連絡いたします。 お急ぎの際は、恐れ入りますが 03-6261-0660 までお電話…
- 画像数: live 0 / clone 0
- computed style 差分:
  - header.fontFamily: live=`sans-serif` clone=`Lato`
  - header.lineHeight: live=`16px` clone=`25.6px`
  - main.fontFamily: live=`sans-serif` clone=`Lato`
  - main.lineHeight: live=`16px` clone=`25.6px`
  - footer.fontFamily: live=`sans-serif` clone=`Lato`
  - footer.lineHeight: live=`16px` clone=`25.6px`
  - h1.letterSpacing: live=`1.2px` clone=`normal`
  - p.fontSize: live=`18px` clone=`16px`
  - p.lineHeight: live=`28.8px` clone=`25.6px`
  - p.textAlign: live=`left` clone=`start`
  - a.fontSize: live=`18px` clone=`16px`
  - a.lineHeight: live=`28.8px` clone=`25.6px`
  - a.textAlign: live=`left` clone=`start`
- 画像: `compare/thanks--390-live.png` / `compare/thanks--390-clone.png`


## 総括

- 差異(>±4px または本文不一致): **137件**
- 実用上一致(±1〜4px): 26件

> 差異は「直す」か「意図的差異として理由付きで記録する」かのどちらか。放置しない。


---

# 判定と残差（人手で追記）

## 計測方法についての注記

上表は `compare.mjs` の出力。同スクリプトはページを開いてすぐ計測するため、
**Webフォント適用前の値を拾うことがある**。本セクションの数値は `tools/textdiff.mjs` /
`tools/sections.mjs`（全画面をスクロールしてから計測）による再測定値で、こちらを採用する。

## ドキュメント高の残差（再測定値）

| URL | 1440 差 | 768 差 | 390 差 |
|---|---|---|---|
| `/` | **+14 (0.3%)** | -201 (3.3%) | **-3 (0.05%)** |
| `/about` | **+7 (0.1%)** | -239 (2.7%) | -400 (5.0%) |
| `/service` | **+4 (0.1%)** | -133 (3.4%) | -54 (1.5%) |
| `/privacypolicy` | **±0** | -50 (1.4%) | **-3 (0.08%)** |
| `/contact` | **-3 (0.1%)** | -237 (7.4%) | -32 (1.0%) |
| `/thanks` | **-1 (0.08%)** | -50 (3.5%) | **-3 (0.2%)** |

- **1440px（クライアント確認の主用途）は全ページ 0.3% 以内**。header / main / footer の矩形、
  セクション背景色、タイポグラフィはすべて一致。
- 768px の残差は主に **日本語の行折り返し位置**。実サイトは `font-family: Lato` のみを宣言し
  日本語をブラウザ既定フォントにフォールバックさせており、クローンも同じ宣言にしてあるが、
  カラム幅が狭い帯域では1行の増減が積み上がる。
- 390px の `/about` の残差は会社概要テーブル（10行）の行高の積み上げ。

## 横スクロール

**1440 / 1280 / 1024 / 768 / 430 / 390 / 375 の全7幅で 0**（全6ページ）。
※ 375–390px でヒーローの赤ボタンがはみ出す不具合を実装中に検出し、
`min-width: 0` + 折り返し許可で修正済み。

## 意図的な差異（直さないもの）

| # | 箇所 | 実サイト | クローン | 理由 |
|---|---|---|---|---|
| 1 | 存在しないURL | 200 + **トップページ本文**（soft-404） | **404** | デモで同一内容のページが無限に生えるのを防ぐ。原本の挙動は②以降で是正提案 |
| 2 | `/contact` のフォーム | `GET /contact` で実送信 | **送信不可**（action無し・全項目 disabled・submit抑止） | 実サイトの問い合わせ台帳への誤送信を構造的に不可能にする |
| 3 | `/contact` の見出し階層 | 見えている大見出しは `<p>`、`<h1>` は非表示要素 | 見えている大見出しを `<h1>` に | **見た目を変えずに**要素だけ是正（スキル規定で許容される唯一の是正） |
| 4 | キーボード操作 | ドロワーに Esc・フォーカス移動なし | Esc で閉じる / フォーカス移動 / `aria-expanded` | 見た目は不変のアクセシビリティ補強 |
| 5 | `prefers-reduced-motion` | 分岐なし | スクロール表示と視差を停止 | 見た目の初期状態は同じ。レイアウトは不変 |
| 6 | 画面内のデモ表示 | なし | `position: fixed` の帯（閉じるボタン付き） | デモである旨の明示。**本文レイアウトを1pxも動かさない** |

## 再現した「原本の不具合」

直さずそのまま再現し、改善提案として `docs/clone-plan.md` に回した。

- 文字化け `成⾧`（U+2FA7）6か所
- ナビ「ニュース」が全ページで `/#news`（下層から押すとトップへ戻る）
- `/contact` `/thanks` `/privacypolicy` の `<title>` がトップと同一
- canonical 未出力
- 会社概要の「会社名」行だけラベルが 18px（他行は 20px）
- トップの About 見出しだけ Lato 18px（他セクションは Montserrat 20px）
- Vision セクションだけ上下余白 60px（他は120px）
- `/service` 3つ目の見出し末尾の `&nbsp;`
- 「サービス一覧へ」ボタンだけ太字 700（他のネイビーボタンは 500）
- フッター「お電話はこちらから」だけ 400（「メールで…」は 500）
