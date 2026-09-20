# 意思決定ログ

実装着手前に固めた、プロダクトの方向性に関わる決定を時系列で記録する。詳細は各ドキュメントを参照。

## 2026-09-20

| 決定事項 | 結論 | 詳細 |
|---|---|---|
| ターゲット | 映像制作会社・プロ向けツール | [review-2026-09-20.md](./review-2026-09-20.md) |
| 最初の着手範囲 | Technique/Recipe/Reference/Intentのデータ構造（スキーマ）設計 | [schema-v0.1.md](./schema-v0.1.md) |
| status格上げの基準・レビュアー | 社内・取引先の映像制作者数名にレビューしてもらう体制 | [review-workflow.md](./review-workflow.md) |
| 15カテゴリの重複・境界整理 | 今整理する（軸の明文化＋Technique/Recipe誤分類ルール） | [taxonomy-v0.2.md](./taxonomy-v0.2.md) |
| マネタイズ方針 | 将来的に同業他社へのSaaS販売も見据えて設計する | [monetization-and-licensing.md](./monetization-and-licensing.md) |
| データ検証 | CIでYAMLをJSON Schemaに対して自動検証する | `.github/workflows/validate-data.yml` |

## まだ決まっていないこと

- レビュアーの最低人数・合議条件（review-workflow.md参照）
- 課金モデルの具体（monetization-and-licensing.md参照）
- Technique 5個での最小検証ループの実施タイミング（review-2026-09-20.md §3で指摘した論点。データ構造の設計が終わったので、次にここへ戻る想定）
