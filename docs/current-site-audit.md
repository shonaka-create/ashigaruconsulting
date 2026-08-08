# current-site-audit — ashigaru-consulting.co.jp 実測

- 取得日: 2026-08-08
- 方法: Playwright + Chromium（Windows）、deviceScaleFactor=1。
  数値はすべて **レンダリング後の DOM** の `getComputedStyle` / `getBoundingClientRect`。
- **この文書の数値が実装の仕様書**。取れなかったものは `[確認不可]`、推測は `[仮説]` と明記する。

## プラットフォーム

| | |
|---|---|
| 製造ツール | **STUDIO**（`<meta generator="Studio.Design">`、Nuxt SPA、`server: Google Frontend`） |
| 静的HTMLの中身 | **空**（home の body 文字数 0）。`curl` の結果は使えない |
| 取得手段 | **Playwright 必須**。全数値はレンダリング後DOMから |
| 画像CDN | `storage.googleapis.com/studio-design-asset-files` / `studio-cms-assets`、および **Unsplash 直リンク3枚** |
| robots.txt | `Allow: /` + `Sitemap: /sitemap.xml` |
| sitemap | `sitemap.xml`（index）→ `sitemap-static.xml`（**6URL**） |

### 画像の描画方法（この案件固有の要）
STUDIO は写真を `<img>` でも要素の `background-image` でもなく、
**`div.image` に注入した `<style>` で `::before { background-image: url(...) }`** として描く。
`background-size: cover` / `background-position: 50% 50%` / `filter: brightness(x)` も擬似要素側。
→ 素材採取は `getComputedStyle(el, "::before")` を見ないと **1枚も取れない**。

## URL 全件（実在は 6 件のみ）

STUDIO は**存在しないパスにも 200 とトップページ本文を返す**（soft-404）。
`--probe` で叩いた `/menu` `/shop` `/en` `/blog` 等 15 件はすべて 200 だが、
Playwright でレンダリングすると **本文・高さともトップページと完全一致**（1137字 / 5504px）。
実在判定は `sitemap-static.xml` と描画内容の照合による。

| URL | 実在 | title |
|---|---|---|
| `/` | ○ | 保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社 |
| `/about` | ○ | 会社概要｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 |
| `/service` | ○ | 事業内容｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社 |
| `/privacypolicy` | ○ | （トップと同一・テンプレート既定のまま） |
| `/contact` | ○ | （トップと同一） |
| `/thanks` | ○ | （トップと同一） |
| 上記以外 | × | 200 を返すが中身はトップページ（soft-404） |

canonical は **全ページ未出力**。`<meta robots>` は `all`。`lang="ja"`。

## ブレークポイント（実測）

全スタイルシートの `@media` を集計した結果、**実際に使われている境界は 480px と 768px の2つだけ**
（それぞれ18回）。3段構成で再現する。

| | >768px | 481–768px | ≤480px |
|---|---|---|---|
| ヘッダー高 | 116px | 100px | 76px |
| ヘッダー内バー | 1280×68 / pad 12px 20px | 720×52 / pad 6px 0 | 366×52 / pad 6px 0 |
| ナビ | インライン表示 | **ハンバーガー** | ハンバーガー |
| セクション左右余白 | 48px | 48px | 24px |
| セクション上下余白 | 120px | 120px | 64px |
| フッター | 519px / pad 96px 0 | 736px / pad 96px 0 | 571px / pad 64px 0 |

## デザイントークン

### 色（使用頻度順・実測）
| 用途 | 値 |
|---|---|
| ネイビー（セクション背景・ボタン・バッジ・フッター） | `rgb(0, 53, 113)` = `#003571` |
| オフホワイト（交互セクション背景・入力欄背景） | `rgb(248, 247, 246)` = `#F8F7F6` |
| 見出し・ナビ | `rgb(17, 17, 17)` = `#111111` |
| 本文 | `rgb(51, 51, 51)` = `#333333` |
| ヒーローの赤ボタン | `rgb(154, 54, 50)` = `#9A3632` |
| 必須／任意バッジ | `rgb(242, 58, 60)` = `#F23A3C` |
| バッジ内文字 | `rgb(244, 255, 245)` = `#F4FFF5` |
| リンク（電話・メール） | `rgb(0, 124, 255)` = `#007CFF` |
| 個人情報保護方針の本文内リンク | `rgb(17, 92, 241)` = `#115CF1` |

> トークン一覧には `rgb(0,17,35)` `rgb(0,12,27)` 等の暗いネイビーも出るが、
> これらは `.appear` アニメーションの **transition 途中フレーム**。最終値は `#003571`。

### フォント（`font-family` の宣言そのまま）
| 用途 | 宣言 |
|---|---|
| 本文・ヒーロー見出し・ボタン | `Lato`（**日本語はブラウザ既定にフォールバック**） |
| セクション見出し・ナビ・フッター | `Montserrat, "Noto Sans JP"` |
| お知らせバッジ | `"Noto Sans JP"` |
| コピーライト | `Montserrat` |
| アイコン | `"Material Icons"` / ヘッダー電話のみ `"Material Symbols Outlined"` |

> **重要**: 本文側に `Noto Sans JP` を足すと日本語の字送りが変わり、段落の行数が全ページでずれる。
> クローンも宣言を `Lato, sans-serif` に留めている。

### 主要タイポグラフィ（1440px）
| 箇所 | size / line-height / letter-spacing / weight |
|---|---|
| ヒーロー1行目 | 54 / 75.6 / 2.7 / 500（h1 の高さは **全ブレークポイントで 122px 固定**） |
| ヒーロー2行目 | 48 / **57.6** / 2.4 / 500 |
| セクション英字見出し | 48 / 48 / normal / 600（Montserrat） |
| セクション和文サブ | 20 / 28 / normal / 700（**トップのAboutのみ Lato 18 / 25.2**） |
| 下層ページ ヒーロー英字 | 72 / 86.4 / normal / 500 |
| サービスカード見出し | 32 / 44.8 / normal / 600 |
| /service 見出し | 36 / 50.4 / normal / 700 |
| お知らせ日付 | 24 / 33.6 / normal / 700 |
| 会社概要ラベル | 20 / 28（**「会社名」行のみ 18 / 25.2**） |
| フッターCTA見出し | 36 / 36 / 1.8 / 700（Montserrat） |
| コピーライト | 10 / 14 / 0.5 / 700 |

## レイアウト実測（1440px）

- コンテナ幅は **セクションごとに違う**
  - ヒーロー／フッター: `max-width 1280` + `padding 0 48px` → 内容 1184px
  - トップの各セクション: `max-width 1080` + `padding 120px 48px` → 内容 984px
  - 下層ページの各セクション: `max-width 1280` + `padding 120px 48px` → 内容 1184px
  - `/about` の Vision セクションと アクセス情報セクションのみ `padding 60px 48px`
- ボタン: 高さ 62px / `padding 20px 48px` / `border-radius 8px`（赤のみ 65px・`20px 45px 20px 48px`）
- カード類の角丸はすべて 8px。フッターCTAのみ影 `rgba(0,0,0,0.1) 0 2px 20px 0`
- ヒーロー: 高さ 840px、`padding-top 48px` を挟んだうえで内容 360px を中央寄せ
- ヒーローと下部CTA帯は **同一の `position: fixed` 画像1枚**（1440×900）が透けて見える構造
  - ヒーロー上のグラデーション `linear-gradient(0deg, rgba(0,0,0,.2) 0%, rgba(102,102,102,0) 53%)`
  - CTA帯のグラデーション `linear-gradient(rgba(51,51,51,.5) 0%, rgb(51,51,51) 100%)`
- サービスカードの写真は `filter: brightness(0.7)`（1枚目）/ `brightness(0.6)`（2・3枚目）
- 下層ページのヒーロー帯写真は `brightness(0.6)`

### ページ×ビューポート ドキュメント高（実測）

| URL | 1440 | 768 | 390 |
|---|---|---|---|
| `/` | 5504 | 6146 | 5889 |
| `/about` | 6332 | 8945 | 8011 |
| `/service` | 2840 | 3884 | 3528 |
| `/privacypolicy` | 3315 | 3574 | 3904 |
| `/contact` | 2920 | 3201 | 3292 |
| `/thanks` | 1262 | 1443 | 1408 |

横スクロールは実サイト・クローンとも **1440/1280/1024/768/430/390/375 の全幅で 0**。

## リッチテキストの空段落

`/thanks` と `/contact` の本文には **中身のない `<p></p>`** が入っており、1つあたり 16px の高さを持つ。
これを落とすとページが縮むため、クローンでも空段落として再現している。

## フォーム（`/contact`）

- 送信先: `GET https://ashigaru-consulting.co.jp/contact`（STUDIO Form）
- 項目: お名前 / 電話番号 / メールアドレス / 役職区分(select) / 貴社名／屋号 /
  ご関心のある内容(select) / ご相談内容(textarea) / 同意チェック
- 入力欄: 高さ 50px・`padding 12px`・`border-radius 4px`・背景 `#F8F7F6`・`font-size 15px`
- 必須／任意バッジ: 高さ **22px 固定**・`padding 0 8px`・`border-radius 128px`
- **クローンでは送信を発火させない**（`action` なし・全項目 `disabled`・`submit` を JS で抑止）

## 挙動

- hover 効果は **存在しない**。リンク・ボタン・カードの hover 前後で computed style（背景色・
  透明度・transform）に変化なしを実測で確認済み
- スクロール表示は `.appear` クラスの付け外し。開始状態は
  `opacity: 0` + `translate: 0 12/24/48px`、一部は `scale: 1e-10 1`（見出し横の短い罫線）。
  `transition-duration` は 300–800ms、イージングは `cubic-bezier(0.4, 0.4, 0, 1)`
- 背景画像1枚が `position: fixed` による視差
- `/about` に Google マップ iframe 1つ（1440で 544×360）

## `[確認不可]` / `[仮説]`

- `[確認不可]` お知らせ1件目のリンク先PDF（`storage.googleapis.com/.../s-1x1_...pdf`）の内容。
  URLは1文字違わず転記済み
- `[確認不可]` `/about` のアクセス情報セクションの 768px 時の段組み。実サイトでは `<main>` の外に
  あり計測系から漏れたため、`[仮説]` としてテキスト上・地図下（`column-reverse`）で実装した
- `[仮説]` フッター背景色。実測値は `rgb(0,50,107)` 〜 `rgb(0,52,111)` と揺れるが、これは
  `.appear` の transition 途中を拾ったもので、最終値は `#003571` と判断した
