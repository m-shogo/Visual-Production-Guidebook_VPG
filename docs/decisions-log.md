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

## 2026-09-21

| 決定事項 | 結論 | 詳細 |
|---|---|---|
| Demoの調達方法 | 自社制作（撮影/AI生成）をほぼ撤廃し、外部Referenceの公式埋め込みを主な視覚コンテンツにする | [content-sourcing-v0.2.md](./content-sourcing-v0.2.md) |
| 埋め込みの範囲 | YouTube限定ではなく、配信元プラットフォームの公式埋め込み機構であれば何でも可。自前でのダウンロード・再ホスト・GIF化は常にNG | [content-sourcing-v0.2.md](./content-sourcing-v0.2.md) |
| Referenceのソース種別 | `official_rights_holder`と`third_party_education`（映像教育系メディア）を区別する`channel_type`をスキーマに追加 | `schema/reference.schema.json` |
| 初心者向け発見体験 | 段階的トリアージ動線（少数の視覚的に異なる例→絞り込み→詳細）を設計 | [discovery-ux-v0.1.md](./discovery-ux-v0.1.md) |
| チャット併用の可否 | フルLLMチャットボットは作らない。Intent語彙への軽量キーワード検索で最初は十分 | [discovery-ux-v0.1.md](./discovery-ux-v0.1.md) |
| ロードマップ | Phase Aを「15カテゴリ×3〜5件」から「2〜3カテゴリ×10〜15件のパイロット」に縮小。デモ/実装手順の検証一貫性、フェーズ間の終了条件を追加 | [roadmap-v0.2.md](./roadmap-v0.2.md) |
| レビュー運用の暫定基準 | レビュアー1名のapproveでvalidatedへ格上げ可。合議制は導入しない | [review-workflow.md](./review-workflow.md) |
| findability spike test | 実施済み。third_party_education（映像教育チャンネル）が有望な主力候補と判明。一般検索だけでは見つからず、個別のキュレーション労力は残ることを確認 | [content-sourcing-v0.2.md](./content-sourcing-v0.2.md) |
| 最小ブラウジングUI | `scripts/build-gallery.mjs`で実装・動作確認済み。実際に見つけたRack Focus動画のサムネイルが表示されることを確認 | `scripts/build-gallery.mjs`, `pnpm run gallery` |

## まだ決まっていないこと

- レビュアー候補者リスト（取引先の具体名。review-workflow.md参照）
- 課金モデルの具体（monetization-and-licensing.md参照）
- 静止画で十分なカテゴリと動画が必須なカテゴリの切り分け（content-sourcing-v0.2.md末尾）
- Phase A2以降のUI強化（フィルタリング、トリアージ動線の実装）
