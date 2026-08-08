# デプロイ手順（GitHub → Vercel テストサイト）

用途は **客先に「いまのサイトはこう再現できます」を見せて合意を取ること**。
本番公開は WordPress で行うので、このデプロイは本番にはならない。

---

## 1. GitHub へプッシュ — **完了（2026-08-08）**

`shonaka-create/ashigaruconsulting` の `main` に2コミット（119ファイル）をプッシュ済み。

```
b7f5a0f デプロイ手順を追加
65c01e8 現行サイト(STUDIO)の見た目忠実クローンを追加
```

### 経緯（同じことで詰まったとき用）

`shonaka-create`（リポジトリ所有者）と `shonakacreates2000`（このマシンの `gh` の
ログインアカウント）は**別々の個人アカウント**。当初 `shonakacreates2000` の権限は
`pull` のみで、`git push` は 403 になっていた。

```
remote: Permission to shonaka-create/ashigaruconsulting.git denied to shonakacreates2000.
```

所有者側が `shonakacreates2000` を **Write 権限の Collaborator に招待**し、
それを受諾して解消した。

```bash
gh api user/repository_invitations                       # 招待IDを確認
gh api --method PATCH user/repository_invitations/<ID>   # 受諾
git push -u origin main
```

受諾後の権限は `{"pull":true,"push":true,"triage":true,"maintain":false,"admin":false}`。
**`admin` は無い**ので、リポジトリの公開設定・Webhook・Settings の変更は所有者しかできない。

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

`vercel.json` は作成済みなので、**ダッシュボードで Import するだけ**でよい。

> **Vercel CLI はこのマシンでは使えない。** コンピューター名が `中胡`（非ASCII）で、
> CLI がホスト名を HTTP ヘッダーに載せるため `vercel whoami` すら次で落ちる:
> `TypeError: Cannot convert argument to a ByteString because the character at index 0
> has a value of 20013`（`20013` = `中`）。CLI を使いたいならPC名を英数字に変える必要がある。
> **Git 連携なら CLI は不要**で、`git push` するたびに自動デプロイされるのでそちらが本筋。

1. <https://vercel.com/new> → **Import Git Repository** → `ashigaruconsulting` を選択
   - GitHub App の権限を `shonaka-create` の所有リポジトリに向けること
     （`shonakacreates2000` でログインしている場合、所有者側でのアプリ許可が要る）
2. 設定は**触らない**（`vercel.json` が全部持っている）
   - Build Command: `node build.mjs`
   - Output Directory: `dist`
   - Framework Preset: Other
   - Install Command: `echo ...`（**空実行**。理由は下記）
3. **Deploy**

### Install Command を空にしてある理由

`build.mjs` は**依存ゼロ**で動く。一方 `package.json` の devDependencies には
`playwright` が入っており、Vercel の既定 `npm install` はこれを入れようとして
**ブラウザ本体（数百MB）をダウンロードする**。ビルドには一切不要で、時間の無駄でしかない。
そのため `vercel.json` に `installCommand` を明示して空実行にしてある。

**検証済み（2026-08-08）**: GitHub から clean clone し、`npm install` を一切実行せずに
`node build.mjs` を実行 → `dist/` に HTML 6 / 画像 15 / `css` / `js` / `robots.txt` /
`sitemap.xml` が生成されることを確認した。

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
```

| 方式 | 客先が見られるか | 条件 |
|---|---|---|
| **Vercel Authentication** | **見られない**。Vercel アカウントでのログイン＋プロジェクトへのアクセス権が要る | 無料 |
| **Password Protection** | 見られる（パスワードを渡すだけ） | **Pro プラン以上（有料）** |
| 保護なし | 見られる。**ただしURLを知る第三者も全員見られる** | — |

ここが判断の分かれ目になる。**無料のまま客先に URL を渡す方法は無い。**
アシガル社に見せる形式は次のどれかを選ぶ:

1. **Password Protection を使う**（Vercel を Pro にする）— 客先が自分の時間に見られる。推奨
2. **画面共有で見せる**（保護は Vercel Authentication のまま）— 追加費用ゼロ。URL は渡さない
3. **保護なしで期間を区切って渡す** — 合意が取れたら即座に削除する運用。
   noindex は入れてあるが、**URL が漏れれば誰でも見られる**ことを承知のうえで選ぶこと

なお、Deployment Protection の変更には **Vercel プロジェクトの権限**が要る（GitHub の権限とは別物）。

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
