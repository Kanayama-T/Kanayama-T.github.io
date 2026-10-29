# 公開手順（GitHub Pages）

このサイトは静的 HTML・CSS・JavaScript で構成されています。現在のコードは `/assets/...` のようにドメイン直下からのパスを使用するため、最初の確認先には GitHub の **ユーザーサイト**（`https://<ユーザー名>.github.io/`）を推奨します。通常のプロジェクトサイト（`https://<ユーザー名>.github.io/<リポジトリ名>/`）ではリンクや画像が正しく表示されません。

## 1. 公開前の確認

- フォームの送信機能は未設定。問い合わせは電話と LINE、応募は電話で受け付ける構成です。フォームの項目は見本として表示しています。
- 会社情報・求人条件・許可証 PDF の有効期限を確認してください。
- `ワードプレス/` は `.gitignore` で公開対象から外しています。GitHub にアップロードする前に `git status` と `git ls-files` を確認してください。

## 2. GitHub にリポジトリを作成

GitHub で `<ユーザー名>.github.io` という**公開**リポジトリを作成します（GitHub Free の場合）。既に同名リポジトリがある場合は、別の公開先を決める必要があります。パスワードやアクセストークンをソースコードに書かないでください。

ローカルの PowerShell またはターミナルで以下を実行します。`<ユーザー名>` は実際の GitHub ユーザー名に置き換えます。

```bash
cd /mnt/c/Users/Kanayama/source/spe_app_marutomi_hp
git remote add origin https://github.com/<ユーザー名>/<ユーザー名>.github.io.git
git push -u origin main
```

GitHub のリポジトリ画面で **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)** を選びます。`https://<ユーザー名>.github.io/` でページを確認します。以後はローカルで `node scripts/prerender.mjs`、`git add`、`git commit`、`git push` の順で更新できます。

## 3. `marutomi-t.co.jp` に切り替える

現在のサイトを止める作業です。GitHub 上のプレビューを確認し、現行 WordPress のバックアップと DNS の現設定を控えた後で実施します。

1. GitHub のアカウントまたは組織の Settings → Pages で `marutomi-t.co.jp` を検証します。表示された TXT レコードを DNS に追加し、検証が終わるまで残します。
2. リポジトリの Settings → Pages → Custom domain に `marutomi-t.co.jp` を入力して保存します。
3. DNS のルート（`@`）の Web 用 A レコードを次の 4 個に変更します。IPv6 の AAAA レコードが既にある場合は GitHub Pages の値に合わせて変更します。

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. `www` を使う場合は CNAME を `<ユーザー名>.github.io` に設定します。メール用の MX、SPF、DKIM、DMARC 等の TXT レコードは変更しません。
5. GitHub Pages の DNS チェックと証明書発行を待ち、**Enforce HTTPS** を有効にします。トップ・各事業ページ・問い合わせ・PDF と、`www` からの転送を確認します。

切り替え後に問題があれば、控えておいた元の Web 用 A/AAAA レコードに戻します。DNS の反映には時間差があります。WordPress の契約やデータは、切り替え確認が終わるまで維持します。

公式資料: [公開元の設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[独自ドメインの設定](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)、[ドメイン検証](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
