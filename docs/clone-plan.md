# clone-plan — ashigaru-consulting.co.jp ローカル忠実クローン

- 対象: https://ashigaru-consulting.co.jp/ （STUDIO / Studio.Design、Nuxt SPA）
- 調査日: 2026-08-08
- 位置づけ: 5フェーズパイプライン ①.5。成果物は ② `static-to-wp-cocoon` の入力になる。
- 前提: **noindex + robots 全拒否のデモ**。公開検索面に出さない。

## 技術構成

| | 採用 | 理由 |
|---|---|---|
| 出力 | **素の静的HTML + CSS + 最小JS** | 全6ページ・DBもCMSも不要。②に `dist/*.html` をそのまま渡せる |
| ビルド | `node build.mjs`（依存ゼロ） | 文言を `src/data/` に一元化しつつ、出力は素のHTML |
| CSS | 手書き1枚 `assets/css/style.css` | 実測値の転記。フレームワーク不使用 |
| JS | `assets/js/main.js`（約100行） | モバイルメニュー + スクロール表示のみ。ライブラリ不使用 |
| 配信(ローカル) | `node server.mjs` | 拡張子なしURL（`/about`）を本番と一致させるため |
| 配信(共有) | **Vercel** + `vercel.json`(`cleanUrls`) | 客先合意用のテストサイト。noindex + `X-Robots-Tag` + Deployment Protection 前提 |

DB・API・環境変数・認証・CMS・解析タグは**一切使わない**。

### コンポーネント粒度
Cocoon移植時の1セクション＝1関数に固定（`build.mjs` 内）。
`header` / `footer`（CTA2枚組を含む） / `sectionHeading` / `button` / `newsList` /
`serviceCard` / `infoTable` / `pageHero`。

### 文言・データの置き場所
- `src/data/site.js` … 社名・電話・住所・ナビ・フッター・ロゴ
- `src/data/pages.js` … 各ページ本文（見出し・段落・お知らせ・フォーム項目）
- `docs/asset-inventory.csv` … 画像のローカルパスと `wordpress_filename`

## ページ（実在は6件のみ）

| # | URL | 実測ドキュメント高(1440) | 備考 |
|---|---|---|---|
| 1 | `/` | 5504px | ヒーロー / About / Services / CTA(視差) / News / 画像2枚組 |
| 2 | `/about` | 6332px | ヒーロー帯 / About / MVV×3 / 会社概要表 / アクセス(Googleマップ) |
| 3 | `/service` | 2840px | ヒーロー帯 / サービス3件 |
| 4 | `/privacypolicy` | 3315px | 本文のみ（7章） |
| 5 | `/contact` | 2920px | 問い合わせフォーム（**送信不可で実装**） |
| 6 | `/thanks` | 1262px | 送信完了ページ |

実装順: 共通レイアウト(header/footer/CTA) → `/` → `/about` → `/service` →
`/contact` → `/privacypolicy` → `/thanks`。

## 実装しないもの（既存サイトに無い or デモとして持たせない）

- **フォーム送信**。原本は `GET https://ashigaru-consulting.co.jp/contact`(STUDIO Form)。
  クローンは見た目のみ再現し、`action` を持たせず `submit` を無効化する。
  → 実サイトの問い合わせ台帳に誤送信する事故を構造的に不可能にする
- **hover演出**。原本を実測したが、リンク・ボタン・カードいずれも hover で
  色・透明度・transform が変化しない。**無いものは足さない**
- Cookieバナー・解析タグ・パンくず・検索・ページネーション（原本に無い）
- 記事詳細ページ（お知らせ3件はリンク先を持たない。PDF1件のみ外部リンク）

## 意図的に原本と変える点

見た目を変えないものだけ。全6件の一覧と理由は
[docs/visual-difference-report.md](visual-difference-report.md) の「意図的な差異」にある。

| 箇所 | 原本 | クローン | 理由 |
|---|---|---|---|
| 存在しないURL | 全パスに **200 + トップページ本文**（soft-404） | 素直に **404** を返す | デモで無限に複製ページが生えるのを防ぐ。原本のこの挙動は②以降で是正提案する |
| フォーム送信 | `GET /contact` で実送信 | **送信不可** | 実サイトの問い合わせ台帳への誤送信を構造的に不可能にする |
| `/contact` の見出し | 見えている大見出しは `<p>` | `<h1>` に | 見た目を変えずに要素だけ是正 |

これ以外は、原本の癖・誤りも含めてそのまま再現する（下記「原本の問題点」参照）。

## 原本の問題点（直さず記録する。改善提案は別途）

1. **soft-404**: `/menu` `/shop` `/en` など存在しないパスがすべて 200 でトップページ本文を返す。
   検索エンジンから見ると同一内容の無限ページ。`sitemap-static.xml` の6件だけが実在。
2. **文字化け**: `成⾧`（**U+2FA7** 康熙部首「長」）が `/service`(5か所) と `/about`(1か所) の
   計6か所に混入。正しくは `成長`。**クローンでは原本どおり U+2FA7 で再現**し、②で置換提案。
3. **ナビ「ニュース」が `/#news`**: 下層ページから押すとトップへ戻る。ページ内アンカーのみ。
4. **`/thanks` `/contact` `/privacypolicy` の `<title>` がトップと同一**（テンプレート既定のまま）。
5. **canonical が全ページ未出力**。
6. **Unsplash 画像を直リンクで3枚使用**（`/`のフッター上帯、`/about`のVision）。
   CDN都合で将来消える可能性がある。ローカル保存済み。
7. `/about` の Google マップ埋め込みの座標が **「渋谷区神南1-23-10」** を指しており、
   本文の所在地「道玄坂1-10-8」と一致しない。
8. 会社概要の「所在地」「電話番号」「メール」「関連リンク」の**ラベル自体がリンク**になっており、
   `open_in_new` アイコンが `tel:` `mailto:` にも付いている。
9. モバイルメニューに描画されない `PRESS KIT` テキスト要素が残っている（STUDIOテンプレの残骸）。

## 要判断（オーナーに返す）

| # | 論点 | 影響 |
|---|---|---|
| A | **soft-404 の是正**（存在しないURLを404 or 301にする） | ②③のサーバ設定。SEO上は是正推奨 |
| B | `成⾧` → `成長` の文字修正可否 | 原稿修正。6か所 |
| C | Googleマップの座標を所在地（道玄坂1-10-8）に合わせるか | /about の地図差し替え |
| D | Unsplash 3枚の継続利用可否（ライセンス・差し替え） | 第三者素材。台帳 `third_party=unsplash` |
| E | `/privacypolicy` のスラッグ（`/privacy-policy` にしない） | 変更するなら301必要。既定は**変えない** |
| F | 下層ページの `<title>` を個別化するか | ④ seo-analytics-setup で対応可 |
| G | ロゴ・社名の商標素材はそのまま流用でよいか | 自社素材の想定だが要確認 |
| H | Vercel デモを社外（クライアント）に見せる際、URL を Deployment Protection で保護するか | 保護しない場合、noindex でも URL を知る第三者は閲覧できる |

## 検証ゲート

`node tools/compare.mjs`（skill同梱 `compare.mjs`）で
1440 / 768 / 390 の3幅について ドキュメント高・header/main/footer 矩形・
computed style を数値比較する。±4px 以内を実用一致とし、超過は本ドキュメントに
「意図的差異」として記録するか修正する。横スクロールは 1440/1280/1024/768/430/390/375 の
7幅で 0 を確認する。
