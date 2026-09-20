# データ構造設計 v0.1（Technique / Recipe / Reference / Intent）

対象読者の前提：[review-2026-09-20.md](./review-2026-09-20.md) の議論を経て、ターゲットは **映像制作会社・プロ向けツール** に決定。カジュアルなAIプロンプト重視ではなく、DaVinci/AE等での実装メモと「なぜ効くか」の言語化を優先する設計にしている。

## 1. 全体方針

- design-v0.1 の「破綻防止ルール」（§19）をスキーマレベルで強制する。
  - ルール1（TechniqueとRecipeを混ぜない）→ 別ファイル・別JSON Schemaとして完全分離
  - ルール7（同義語・英語名・日本語名を保持）→ Technique.synonyms / name_ja / name_en を必須構造化
  - ルール8（一つのTechniqueへ複数タグを許可）→ categories は配列（1件以上）
  - ルール9（なぜ効くかを必須項目にする）→ why_it_works を必須フィールド化（TechniqueもRecipeも）
- 4エンティティは `/data/{techniques,recipes,references,intents}/*.yaml` に1ファイル1レコードで管理し、対応する JSON Schema は `/schema/*.schema.json` に置く。
- git管理下のYAMLなので、レビュー（PR）が効き、diffで変更履歴を追える。

## 2. エンティティと関係

```
Intent ──(weighted, many-to-many)──> Technique
Intent ──(weighted, many-to-many)──> Recipe
Recipe ──(ordered, one-to-many)────> Technique   ※Recipeが正（steps配列）
Reference ──(many-to-many)─────────> Technique / Recipe
Technique ──(loose association)────> Technique   ※combination_technique_ids（Recipe化するほどでもない相性の良い組み合わせ）
```

**単一の正（Single Source of Truth）をどちらに置くか**を明示している点がポイント：

- Intent → Technique/Recipe の関連は **Intent側が正**。Technique/Recipe側からの逆引き（「このTechniqueがどのIntentに効くか」）はアプリのビルド時に逆引きインデックスを生成する。両側に同じ関係を書くと更新漏れで不整合が起きるため、書き込み先を1箇所に固定した。
- Recipe → Technique の関連は **Recipe側が正**（steps配列に順序・パラメータ込みで持つ）。これは本質的に合成（composition）であり、Technique側が「自分がどのRecipeに含まれるか」を知る必要はない。
- Reference → Technique/Recipe も **Reference側が正**。

## 3. Technique（`schema/technique.schema.json`）

design-v0.1 §6 のTechniqueカードにある項目をほぼそのまま構造化。追加した点：

- `status`: `draft / validated / published` — レビューで指摘した「検証なしに作りすぎる」問題への歯止め。プロ利用者のフィードバックを得たものだけ `validated` に上げる運用を想定。
- `demo.source_type` を enum化し `unplanned` を許容 — 実制作コストが未着手のTechniqueも先に定義だけ進められるようにした（デモ制作がボトルネックになっても設計作業は止めない）。
- `ai_prompt_fragment` は残すが必須にしていない（プロ向けツールでは優先度が下がるため）。

## 4. Recipe（`schema/recipe.schema.json`）

- `steps` は `order` + `technique_id` + 任意の `params`（自由記述メモ）。design-v0.1 §4B の Memory Reveal 例をそのままデータ化できることを [data/recipes/memory-reveal.yaml](../data/recipes/memory-reveal.yaml) で確認済み。
- Recipeが参照するTechniqueは、まだ `draft` や未作成でも構わない（実際に `push-in` 等は `draft` のまま参照している）。Recipe設計がTechnique整備より先行してよい、という運用ルールにしている。

## 5. Reference（`schema/reference.schema.json`）

- design-v0.1 §10 の著作権方針をスキーマに反映：`rights_note` を必須にし、「公式ソースのみ・埋め込み転載禁止」を毎レコードで明記させる。
- サンプルの [data/references/_example-placeholder.yaml](../data/references/_example-placeholder.yaml) は **意図的にダミーURL**。実在作品の引用は未検証情報を混入させないよう、必ず実担当者が実URLとタイムスタンプを確認してから差し替える運用とする。

## 6. Intent（`schema/intent.schema.json`）

- design-v0.1 の「Intent→Techniqueを一対一にしない」を `related_techniques` の配列＋`weight`（0〜1）で表現。[data/intents/luxury.yaml](../data/intents/luxury.yaml) で「高級感 = Slow Motionだけではない」ことを複数Techniqueの重み付けとして具体化した。
- `anti_patterns` フィールドを追加（design-v0.1にはなかった拡張）：「このIntentを狙って失敗するパターン」を明示することで、Intent検索の回答が「効くもの」だけでなく「やってはいけないこと」も返せるようにした。プロ向けツールでは特に有用と判断。

## 7. あえて今回スキーマに入れなかったもの（未決事項）

レビューで挙げた論点のうち、データ構造だけでは解決しないものは意図的に据え置いている。

- **カテゴリ体系（15分類）自体の重複・境界の曖昧さ**（review §7） — `categories` は配列化したことで多少の重複は吸収できるが、根本的な分類の切り直しはまだ行っていない。
- **マネタイズ**（review §8） — データ構造に影響しないため未着手。
- **検証ループの運用**（review §3） — `status` フィールドで表現の土台は用意したが、「誰が・どうやって5個を検証するか」という運用プロセスはまだ決めていない。

## 8. 次に決めること（提案）

1. `status: draft` から `validated` に上げる基準・レビュアーを誰にするか
2. 15カテゴリの重複整理に着手するか、後回しにして先にTechnique収集を進めるか
3. スキーマの機械検証（ajv等でのCIチェック）を今のうちに入れるか、後回しにするか
