# 公開手順（GitHub Pages）

このサイトは静的 HTML・CSS・JavaScript で構成されています。現在のコードは `/assets/...` のようにドメイン直下からのパスを使用するため、最初の確認先には GitHub の **ユーザーサイト**（`https://kanayama-t.github.io/`）を使います。通常のプロジェクトサイト（`https://kanayama-t.github.io/<リポジトリ名>/`）ではリンクや画像が正しく表示されません。

## 1. 公開前の確認

- フォームの送信機能は未設定。問い合わせは電話と LINE、応募は電話で受け付ける構成です。フォームの項目は見本として表示しています。
- 会社情報・求人条件・許可証 PDF の有効期限を確認してください。
- `ワードプレス/` は `.gitignore` で公開対象から外しています。GitHub にアップロードする前に `git status` と `git ls-files` を確認してください。

## 2. GitHub にリポジトリを作成

GitHub の [新規リポジトリ作成画面](https://github.com/new)で `Kanayama-T.github.io` という**公開**リポジトリを作成します（GitHub Free の場合）。README、ライセンス、`.gitignore` の自動追加は選ばず、空のリポジトリにします。パスワードやアクセストークンをソースコードに書かないでください。

ローカルの WSL ターミナルで以下を実行します。Git の初回コミットは済んでいます。

```bash
cd /mnt/c/Users/Kanayama/source/spe_app_marutomi_hp
git push -u origin main
```

GitHub のリポジトリ画面で **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)** を選びます。`https://kanayama-t.github.io/` でページを確認します。以後はローカルで `node scripts/prerender.mjs`、`git add`、`git commit`、`git push` の順で更新できます。

## 3. `marutomi-t.co.jp` に切り替える

現在のサイトを切り替える作業です。GitHub 上のプレビューを確認し、現行 WordPress のバックアップと DNS の現設定を控えた後で実施します。

2026年10月30日に確認した公開 DNS は、`@ A 59.106.19.94`、`@ MX 10 marutomi-t.co.jp.`、`www CNAME marutomi-t.co.jp.`、`mail CNAME marutomi-t.co.jp.`、`ftp CNAME marutomi-t.co.jp.` です。さくらの管理画面で確認したサーバー初期ドメインは **`marutomi-t.sakura.ne.jp`** で、これも `59.106.19.94` に解決します。**現在のMXとmail/ftpの別名は本番ドメイン自身を指すため、Aレコードだけを変更するとメールやFTPの接続先まで変わります。**

1. **`marutomi-t.co.jp` のDNSゾーン**で、MX を先に `10 marutomi-t.sakura.ne.jp.` に変更します。`mail` と `ftp` の CNAME も `marutomi-t.sakura.ne.jp.` に変更します。保存・DNS反映後、メールの送受信と従来の接続先を確認します。変更前のTTLは3600秒なので、Aレコードの切り替えまで少なくとも1時間ほど空けます。`marutomi-t.sakura.ne.jp` 自体のDNS画面は変更しません。末尾の `.` は、さくらの入力形式に合わせてください。
2. GitHub のアカウント Settings → Pages で `marutomi-t.co.jp` を検証します。表示された TXT レコードを DNS に追加し、検証後も残します。
3. リポジトリの Settings → Pages → Custom domain に `marutomi-t.co.jp` を入力して保存します。
4. DNS のルート（`@`）の Web 用 A レコードを次の 4 個に変更します。現状は AAAA レコードがありません。後から追加する場合は GitHub Pages の値に合わせます。

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

5. `www` の CNAME を現在の `marutomi-t.co.jp.` から `kanayama-t.github.io.` に変更します。SPF、DKIM、DMARC、Google 検証などの TXT レコードは保持します。
6. GitHub Pages の DNS チェックと証明書発行を待ち、**Enforce HTTPS** を有効にします。トップ・各事業ページ・問い合わせ・PDF、`www` からの転送、およびメールの送受信を確認します。

切り替え後に問題があれば、Web 用 A レコードを元の `59.106.19.94` に、`www` の CNAME を `marutomi-t.co.jp.` に戻します。MX はさくらの初期ドメインを指したままで構いません。DNS の反映には時間差があります。WordPress の契約やデータは、切り替え確認が終わるまで維持します。

公式資料: [GitHub 公開元の設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[GitHub 独自ドメインの設定](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)、[GitHub ドメイン検証](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)、[さくらの外部Web・メール併用手順](https://help.sakura.ad.jp/domain/2151/)、[さくらのDNSゾーン編集](https://help.sakura.ad.jp/domain/2302/)
