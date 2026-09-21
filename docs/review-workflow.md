# レビュー運用（draft → validated → published）

2026-09-20 の議論で決定：`status` の格上げは**社内・取引先の映像制作者数名にレビューしてもらう体制**で行う。

## ステータス定義

| status | 意味 | 遷移条件 |
|---|---|---|
| `draft` | 作成直後。未検証。 | 新規作成時のデフォルト |
| `validated` | 実務者レビューでapprove済み | `reviews` 配列に `verdict: approve` が1件以上必要 |
| `published` | 公開・提供可 | `validated` と同じスキーマ制約（＋公開判断は別途） |

この制約は `schema/technique.schema.json` / `schema/recipe.schema.json` の `allOf`（`if status == validated/published then reviews に approve が1件以上`）で機械的に強制する。**レビューなしでvalidatedへ格上げすることはスキーマ上できない。**

## レビューフロー

1. Technique/Recipeを `draft` で作成し、PRを立てる。
2. 社内の映像制作者、または取引先の制作者にレビューを依頼する。
   - 依頼相手の人数の最低ラインは決めていない（2026-09-20時点は未決）。まずは1件のapproveで運用を開始し、実際にやってみて基準を調整する。
3. レビュアーは以下を確認する。
   - `why_it_works` の説明が実務的に妥当か
   - `fits_when` / `avoid_when` が現場感覚とズレていないか
   - `software_instructions` が実際に動作するか（確認できたら`instructions_verified: true`にする）
   - デモ/Referenceの映像を**説明を読む前に**見て、用途が伝わるか
4. レビュー結果を `reviews` 配列に追記する。構造化質問（`recognized_without_reading` / `would_use_in_practice`）は[roadmap-v0.2.md](./roadmap-v0.2.md) Phase Bの検証に使うため、できるだけ埋める。

```yaml
reviews:
  - reviewer_name: "（氏名）"
    reviewer_org: "（社内 or 取引先の会社名）"
    date: "2026-09-20"
    verdict: approve   # または request-changes
    recognized_without_reading: true   # 説明を読む前に、見ただけで用途が分かったか
    would_use_in_practice: true        # 実務で本当に参照しそうか
    comment: "（任意コメント）"
```

5. `verdict: approve` が1件以上ついた時点で `status: validated` に変更できる（スキーマがそれ以前の変更を拒否する）。
6. `published` への格上げ判断（社外への公開可否）は別途、後述の [monetization-and-licensing.md](./monetization-and-licensing.md) の法務確認プロセスと連動する。

## 暫定デフォルト（2026-09-21）

パイロット運用のために、一旦の基準を決めておく。実際にレビューを回してみて、違和感があれば見直す。

- **レビュアー最低人数**：1件のapproveでvalidatedに上げてよい。合議制は導入しない（意思決定を遅くするコストの方が今は大きい）
- **request-changesがついた場合**：修正して同じレビュアーに再提出する。同じエントリで2回連続request-changesがついたら、別のレビュアーにも見てもらう
- **見直しのタイミング**：レビューを20件回すか、3ヶ月経過したら、この基準自体を見直す

## 未決事項

- レビュアー候補者リスト（取引先の具体名）— これは実際の関係者名が必要なため、ユーザー自身が記入する
