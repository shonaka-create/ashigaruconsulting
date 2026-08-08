# デプロイ手順（GitHub → Vercel テストサイト）

用途は **客先に「いまのサイトはこう再現できます」を見せて合意を取ること**。
本番公開は WordPress で行うので、このデプロイは本番にはならない。

---

## 1. GitHub へプッシュ

ローカルのコミットは作成済み（ブランチ `main`、118ファイル）。
ただし **プッシュは未完了**。理由と対処は下記。

### 現状

| | |
|---|---|
| リポジトリ | `shonaka-create/ashigaruconsulting`（**Public**・空） |
| `gh` のログイン中アカウント | `shonakacreates2000` |
| そのアカウントの権限 | `pull` のみ（`push: false`） |

`shonaka-create` と `shonakacreates2000` は**別々の個人アカウント**で、
後者はリポジトリの共同作業者になっていないため 403 で弾かれる。

### 対処（どれか1つ）

**A. リポジトリ所有者（`shonaka-create`）で `shonakacreates2000` を Collaborator に招待する**

```
https://github.com/shonaka-create/ashigaruconsulting/settings/access
→ Add people → shonakacreates2000 → Write 権限
```

招待を承諾したあと、このディレクトリで:

```bash
git push -u origin main
```

**B. `shonaka-create` アカウントでログインし直す**

```bash
gh auth login          # ブラウザ認証。shonaka-create でログイン
git push -u origin main
```

**C. `shonakacreates2000` 側にリポジトリを作る**

```bash
gh repo create shonakacreates2000/ashigaruconsulting --public --source=. --remote=origin2
git push -u origin2 main
```

### プッシュされる範囲（重要）

このリポジトリは **Public** なので、`.gitignore` で
支援先の内部情報と認証情報をすべて除外してある。**除外を外すときは公開設定を先に確認すること。**

| 含む | 含まない |
|---|---|
| `build.mjs` `server.mjs` `vercel.json` `package.json` `README.md` | `line/`（**`.secrets/` 含む**） |
| `src/` `assets/` `public/images/` `tools/` | `clients/` `marketing/` |
| `docs/`（実測・台帳・計画・差異レポート） | `docs/company/` `docs/proposal/` |
| | `CLAUDE.md` `.mcp.json` `.claude/` `dist/` `node_modules/` |

コミット前に、ステージ済み全ファイルをトークン・鍵のパターンで走査して
**該当0件**であることを確認済み。

---

## 2. Vercel へ接続

`vercel.json` は作成済みなので、ダッシュボードで Import するだけでよい。

1. <https://vercel.com/new> → **Import Git Repository** → `ashigaruconsulting` を選択
2. 設定は**触らない**（`vercel.json` が持っている）
   - Build Command: `node build.mjs`
   - Output Directory: `dist`
   - Framework Preset: Other
   - Install Command: 既定のまま（`playwright` は devDependency で、ビルドには不要）
3. **Deploy**

初回デプロイ後、`https://<project>.vercel.app/` で確認する。
URL は `/about` `/service` のように**拡張子なし**（`vercel.json` の `cleanUrls`）で、
本番サイトと完全に一致する。

### デプロイ後に確認すること

```
/                 200
/about            200
/service          200
/contact          200   ← フォームは表示のみ。送信できないこと
/privacypolicy    200
/thanks           200
/存在しないパス    404   ← 現行サイトは200を返すが、クローンは意図的に404
/robots.txt       Disallow: /
```

各ページの `<head>` に `<meta name="robots" content="noindex, nofollow, nocache">`、
レスポンスヘッダに `X-Robots-Tag: noindex, nofollow, noarchive` が付いていること。

---

## 3. Deployment Protection を掛ける（客先共有前に必須）

**noindex はクローラ向けの意思表示でしかない。** URL を知る第三者は素通しで見られる。
客先に URL を渡す前に必ず設定する。

```
Vercel プロジェクト → Settings → Deployment Protection
→ Vercel Authentication（チーム内のみ）
   もしくは Password Protection（客先にパスワードを渡す運用。Pro プラン以上）
```

Hobby プランで Password Protection が使えない場合は、
**Vercel Authentication をオンにしたうえで、画面共有か短期の Preview URL で見せる**運用にする。

---

## 4. 本番モードに切り替える場合

このデモを本番として使うことは想定していない（本番は WordPress）が、
仮に一時的に公開するなら Vercel の Environment Variables で:

```
SITE_MODE   = production
SITE_ORIGIN = https://ashigaru-consulting.co.jp
```

これだけで `<meta robots>` / `robots.txt` / `sitemap.xml` / canonical / 画面内のデモ表示が
**同時に**切り替わる。加えて `vercel.json` の `X-Robots-Tag` ヘッダを削除する必要がある
（ヘッダは meta より強く効くため、消し忘れるとインデックスされない）。
