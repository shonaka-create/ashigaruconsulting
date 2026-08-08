# ashigaru-consulting.co.jp — 見た目忠実クローン（確認用デモ）

現行サイト <https://ashigaru-consulting.co.jp/>（STUDIO製）を、実測値の転記だけで再現した
**静的サイト**。用途は2つ。

1. クライアントに「いまのサイトはこう再現できます」を見せる **確認用デモ**（Vercel）
2. WordPress + Cocoon への移行における **source of truth**

本番公開は WordPress で行う。このリポジトリのサイトは本番にはならない。

## 動かす

```bash
npm install          # playwright（実測ツール用。ビルド自体は依存ゼロ）
npm run build        # → dist/
npm run serve        # → http://localhost:3000  （ポート変更: node server.mjs 4173）
```

`server.mjs` は本番と同じ拡張子なしURL（`/about`）で配信する。Vercel では
`vercel.json` の `cleanUrls` が同じ役割を果たす。

## デモ / 本番モード

`SITE_MODE` 1本で4つが同時に切り替わる。**既定はデモ**。

| | デモ（既定） | `SITE_MODE=production` |
|---|---|---|
| `<meta robots>` | `noindex, nofollow, nocache` | `index, follow` |
| `robots.txt` | `Disallow: /` | `Allow: /` + Sitemap行 |
| `/sitemap.xml` | 空 | 全6ページ |
| canonical | **出力しない** | 各ページ自URL |
| 画面内のデモ表示 | あり（`position: fixed`・閉じるボタン付き） | なし |

`vercel.json` はさらに `X-Robots-Tag: noindex, nofollow, noarchive` を全レスポンスに付ける。
**noindex はクローラ向けの意思表示でしかない**ので、社外に共有するなら Vercel の
Deployment Protection（パスワード / SSO）を併用すること。

## 構成

```
build.mjs            6ページを dist/ に書き出す（依存ゼロ）
server.mjs           拡張子なしURLのローカル配信
src/data/site.js     社名・電話・住所・ナビ・フッター
src/data/pages.js    各ページ本文（文言はすべてここ。テンプレートに直書きしない）
assets/css/style.css 実測値の転記。フレームワーク不使用
assets/js/main.js    モバイルメニュー / スクロール表示 / デモ表示のみ。ライブラリ不使用
public/images/       ローカル保存した素材15点（元URLは docs/asset-inventory.csv）
tools/               実測・採取・比較スクリプト（下記）
docs/                実測結果・台帳・計画・差異レポート
```

## tools/

| | |
|---|---|
| `harvest.mjs` | 素材採取。STUDIO は写真を `::before` に描くため、擬似要素まで見て採る |
| `content.mjs` | 文字列と computed style の実測 |
| `slices.mjs` | ビューポート単位のスクショ（`fullPage` は視差が動くため使わない） |
| `sections.mjs` | 実サイト vs クローン のセクション高さ比較 |
| `textdiff.mjs` | 実サイト vs クローン を**文字列で突き合わせて**位置ずれの発生箇所を特定 |
| `swatch.mjs` / `peek.mjs` | 部品の色・構造の調査 |

## デプロイ

GitHub → Vercel の手順、公開範囲、Deployment Protection の設定は
[docs/DEPLOY.md](docs/DEPLOY.md) にまとめてある。

## 読むべき順番

1. [docs/clone-plan.md](docs/clone-plan.md) — 何を作り、何を作らないか、**要判断事項**
2. [docs/current-site-audit.md](docs/current-site-audit.md) — 実測値のすべて（実装の仕様書）
3. [docs/visual-difference-report.md](docs/visual-difference-report.md) — 実サイトとの数値差異
4. [docs/interaction-inventory.md](docs/interaction-inventory.md) — 挙動の再現方針
5. [docs/asset-inventory.csv](docs/asset-inventory.csv) / [docs/url-mapping.csv](docs/url-mapping.csv) — 移行用の台帳

## 守っていること

- **フォームは送信できない。** `action` を持たず、全項目 `disabled`、`submit` は JS で抑止。
  実サイトの問い合わせ台帳に誤送信する経路を構造的に作らない
- 原本に無い hover 効果・セクション・解析タグを**足していない**
- 原本の癖（文字化け `成⾧`、soft-404、下層ページの title 重複など）は**直さず記録**した。
  一覧は `docs/clone-plan.md` の「原本の問題点」
