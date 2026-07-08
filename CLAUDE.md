# キッズスクールCUBE HP試作 — 運用ガイド

千葉の知能教育教室「キッズスクールCUBE」(現行: cube55.net) のリニューアル試作サイト。
制作会社(アートフレア)への参考資料として共有中。

## 構成

- `index.html` — メイントップ(白×マゼンタ #9C1850。制作会社のデザインカンプ再現+動的演出)。CSS/JS完全インライン
- `classic.html` — 別案トップ(生成り×テラコッタのクラフト版)。同じくインライン
- `about / class-2sai / class-youji / class-syougaku / timetable / special / recruit / contact`.html — 下層8ページ(クラフト版トーン、`assets/site.css`+`assets/site.js`共有)
- `assets/img/` — `top-*.jpg`はカンプからの切り出し素材、`classroom.jpg`はユーザー提供の実授業写真、`logo.jpg`は公式ロゴ
- `_headers` — Cloudflare Pages用(noindex)

## 編集ルール

- ギルフォード知能構造論は **150因子(5領域×5働き×6所産)** で統一(90は使わない)
- 全ページ `<meta name="robots" content="noindex">` を維持(試作のため検索非掲載)
- コミットは `jo <umenosonoai-stack@users.noreply.github.com>`(本名・機体名を出さない。`git config user.name jo` / `user.email umenosonoai-stack@users.noreply.github.com` を必ず設定)
- 動的演出(ヒーローのドラッグキューブ / 150因子3Dモデル / 臨界期2→10才スクロール+スキップ / 右下の階段型展開図プログレス)は仕様。壊さない

## デプロイ(2箇所、必ず両方)

ユーザーが「〇〇したい」と変更を頼んだら、**編集→検証→git push→Cloudflare反映**まで一気にやってよい(確認不要)。

1. **GitHub Pages**(自動): `git push origin main` するだけ
2. **Cloudflare Pages**(手動、共有用の中立URL): 公開リポジトリにCloudflare側のプロジェクト名を書かない方針のため、ここには記さない。手順:
   - 初回のみ: `npx wrangler login`(jo0937rii@gmail.comのCloudflareアカウント)
   - プロジェクト名の確認: `npx wrangler pages project list`(cube55で始まるやつ)
   - デプロイ: `TMP=$(mktemp -d) && git archive HEAD | tar -x -C "$TMP" && npx wrangler pages deploy "$TMP" --project-name=<上で確認した名前> --branch=main --commit-dirty=true`
   - (この手順をまとめたスクリプトをリポジトリ外の `~/Downloads/AI_SD/deploy-cube55-cf.sh` に置く運用)

## 残タスク

- お問い合わせフォームのGoogleフォーム配線: `assets/site.js` の `GFORM`(action+entry×7)を差し替えるだけ。GoogleフォームのURLをもらったら事前入力URLからentry IDを読んで配線する
- 写真はカンプからの仮使用 — 本公開前にライセンス確認/正規素材への差し替え
