# 公開手順（GitHub Pages）

このサイトは静的 HTML・CSS・JavaScript で構成されています。現在のコードは `/assets/...` のようにドメイン直下からのパスを使用するため、最初の確認先には GitHub の **ユーザーサイト**（`https://kanayama-t.github.io/`）を使います。通常のプロジェクトサイト（`https://kanayama-t.github.io/<リポジトリ名>/`）ではリンクや画像が正しく表示されません。

## 1. 公開前の確認

- お問い合わせ・応募フォームは表示し、送信ボタンを押したときはメンテナンス中と案内します。データは送信しません。連絡は電話または LINE で受け付けます。
- 2026年10月31日21:24の `info@marutomi-t.co.jp` からGmailへの試験メールは、DKIM（セレクタ `rs20261030`）・SPF・DMARC がすべて `pass`。`sp-jp.com` 宛ての返信到着も確認済みです。送信時は会社ドメインのアドレスを使用します。
- 会社情報・求人条件・許可証 PDF の有効期限を確認してください。
- `ワードプレス/` は `.gitignore` で公開対象から外しています。GitHub にアップロードする前に `git status` と `git ls-files` を確認してください。

## 2. GitHub にリポジトリを作成

GitHub の公開リポジトリ `Kanayama-T/Kanayama-T.github.io` は作成・アップロード済みです。パスワードやアクセストークンをソースコードに書かないでください。

更新時はローカルの WSL ターミナルで以下を実行します。

```bash
cd /mnt/c/Users/Kanayama/source/spe_app_marutomi_hp
git push origin main
```

GitHub Pages は `main / (root)` から公開済みです。`https://kanayama-t.github.io/` でページを確認します。以後はローカルで `node scripts/prerender.mjs`、`git add`、`git commit`、`git push` の順で更新できます。

## 3. `marutomi-t.co.jp` に切り替える

現在のサイトを切り替える作業です。GitHub 上のプレビューを確認し、現行 WordPress のバックアップと DNS の現設定を控えた後で実施します。

2026年10月31日に確認した公開 DNS は、`@ A 59.106.19.94`、`@ MX 10 marutomi-t.sakura.ne.jp.`、`www CNAME marutomi-t.co.jp.`、`mail CNAME marutomi-t.sakura.ne.jp.`、`ftp CNAME marutomi-t.sakura.ne.jp.` です。メールとFTPの接続先は、さくらの初期ドメインに分離済みです。

1. **完了**：MX と `mail`・`ftp` の CNAME を、さくらの初期ドメイン `marutomi-t.sakura.ne.jp.` に変更し、送受信を確認しました。`marutomi-t.sakura.ne.jp` 自体のDNS画面は変更しません。
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
