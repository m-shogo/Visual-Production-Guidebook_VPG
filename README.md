# 映像演出図鑑（Visual Production Guidebook / VPG）

映像表現を「見る → 名前を知る → 効果を理解する → 組み合わせる → AIや編集ソフトへ指示する」までつなぐ、映像制作会社・プロ向けのVisual Dictionary。

## ドキュメント

- [design-v0.1.md](docs/design-v0.1.md) — 初期構想メモ（2026-09-20）
- [review-2026-09-20.md](docs/review-2026-09-20.md) — design-v0.1 に対する批判的レビューと次の一手（2026-09-20訂正あり）
- [schema-v0.1.md](docs/schema-v0.1.md) — Technique / Recipe / Reference / Intent のデータ構造設計
- [taxonomy-v0.2.md](docs/taxonomy-v0.2.md) — 15カテゴリの軸の整理とTechnique/Recipe誤分類の防止ルール
- [review-workflow.md](docs/review-workflow.md) — draft→validatedのレビュー運用
- [monetization-and-licensing.md](docs/monetization-and-licensing.md) — マネタイズ方針とライセンス・法務確認フロー
- [decisions-log.md](docs/decisions-log.md) — 意思決定の一覧

## リポジトリ構成

```
schema/   JSON Schema（4エンティティの型定義）
data/     YAML実データ（techniques / recipes / references / intents）
docs/     設計メモ・レビュー・意思決定ログ
scripts/  データ検証スクリプト
```

## データ検証

```bash
pnpm install
pnpm run validate
```

`data/` 配下のYAMLが `schema/` のJSON Schemaに準拠しているかを検証する。GitHub ActionsでもPR時に自動実行される（`.github/workflows/validate-data.yml`）。

## ステータス

構想・議論フェーズ。ターゲットは映像制作会社・プロ向けツールに決定済み。データ構造（スキーマ）とレビュー運用・分類軸・マネタイズ方針の設計まで完了、実装未着手。
