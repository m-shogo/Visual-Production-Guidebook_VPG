# ロードマップ v0.2

2026-09-21の議論で、[decisions-log.md](./decisions-log.md)時点のPhase A〜Eを6つの穴を潰して再構成した。「15カテゴリ満遍なく」という要求と、「作りすぎて検証できない」という失敗パターンの回避を両立させる。

## 前提の変化

- Demoの自社制作をほぼ撤廃し、外部Referenceを主な視覚コンテンツにする（[content-sourcing-v0.2.md](./content-sourcing-v0.2.md)）
- 発見体験はトリアージ動線＋軽量キーワード検索（[discovery-ux-v0.1.md](./discovery-ux-v0.1.md)）
- レビューには構造化質問（`recognized_without_reading` / `would_use_in_practice`）を追加済み（`schema/technique.schema.json`, `schema/recipe.schema.json`）

## Phase A：小さいパイロットで"見て気づく"ループ自体を検証する

- 対象：2〜3カテゴリから10〜15件（45〜75件のような大きな数は最初からは狙わない）
- 各エントリの視覚コンテンツはReference（外部埋め込み、実写優先）を基本とする
- **終了条件**：パイロット全件が実際に「見られる」状態（Referenceが埋め込みされている、またはリンクで到達できる）になったら次へ

## Phase A2（Aと並行）：最小限のブラウジングUI

- YAMLデータをそのままHTMLギャラリーにレンダリングする、静的サイトジェネレータレベルの最小UI
- `scripts/build-gallery.mjs`として実装（本ロードマップ策定と同時に着手）
- フル機能である必要はなく、「サムネイル一覧を眺められる」ことが目的

## Phase B：構造化フィードバックで検証する

- パイロットをレビュアーに見てもらい、各エントリについて以下を記録する（スキーマに追加済み）
  - `recognized_without_reading`：説明を読む前に、見ただけで用途が伝わったか
  - `would_use_in_practice`：実務で本当に参照しそうか
  - 追加で1問：「参考動画が手元にあったら、カタログを探すのと、誰か/何かに見せて教えてもらうのと、どちらがいいか」（Phase Eの前倒し判断に使う）
- **終了条件**：`would_use_in_practice`がtrueの割合が半分を切ったら、スケールする前に立ち止まって原因を見る

## Phase C：反応が良かったものから深掘り

- Variants、Combination、複数ソフトウェアの実装手順を厚くする
- `software_instructions`を実際に実行して確認できたものだけ`instructions_verified: true`にする（スキーマに追加済み）
- ここで初めて、必要なら自社撮影の高品質Demoに投資する（Referenceで十分なものはそのままでよい）
- **終了条件**：`status: validated`が一定数（具体的な数は未定、パイロット結果を見て決める）貯まったら次へ

## Phase D：Recipeを厚くする

- Phase Cで深掘りされたTechnique同士を組み合わせたRecipeを増やす（Memory Reveal例で構造は実証済み）

## Phase E：Reference逆解析

- 「動画を見せたら使われている技法を教えてくれる」機能。技術検証が別途必要な最難関機能
- Phase Bで「カタログを探すより、見せて教えてもらう方がいい」という反応が強ければ、前倒しを検討する。そうでなければPhase D以降でよい

## 全フェーズ共通：残っている未決事項

- レビュアーの最低人数・合議条件（[review-workflow.md](./review-workflow.md)未決事項）
- 課金モデルの具体（[monetization-and-licensing.md](./monetization-and-licensing.md)未決事項）
- 15カテゴリのうち、静止画で十分なカテゴリと動画が必須なカテゴリの切り分け（[content-sourcing-v0.2.md](./content-sourcing-v0.2.md)末尾）
