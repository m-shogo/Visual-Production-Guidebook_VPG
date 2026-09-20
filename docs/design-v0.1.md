# 映像演出図鑑 — 実装設計 v0.1

> 初期構想メモ。2026-09-20 時点の原文をそのまま保存。以降の変更は新しいバージョン（v0.2 以降）として追記・分岐させる。

## 1. このプロジェクトが解決する問題

生成AIやDaVinci Resolve、After Effectsなどにより、映像を「作る技術」のハードルは急速に下がっている。
しかし初心者には別の壁が残る。

- 「何を作らせればいいのか」
- 「この見せ方の名前が分からない」
- 「頭の中には映像があるが、言葉にできない」
- 「プロなら数秒で出てくる演出候補が出てこない」
- 「AIに“いい感じに”以上の指示ができない」

つまり不足しているのは操作方法ではなく、**映像を考えるための語彙と引き出し**である。

このプロジェクトは、

見る → 名前を知る → 効果を理解する → 組み合わせる → AIや編集ソフトへ指示する

までを一つにつなぐ。

## 2. 作ってはいけないもの

以下にはしない。

- 映画用語辞典だけ
- DaVinciの操作マニュアルだけ
- After Effectsチュートリアル集
- 「感動」「高級感」だけで分類した演出集
- AIプロンプト集だけ
- YouTube動画リンク集
- 結婚式専用テンプレート集

これらは既存情報と競合しやすい。中心にするのは、**映像表現そのものを探すためのVisual Dictionary** である。

## 3. 一番重要な設計思想

映像を一つの分類軸だけで整理しない。

たとえば「ゆっくりズームイン」は、Camera Movement / Intimate / Tension / Emotional / Reveal / Photo Animation / Documentary など複数の意味を持つ。

したがって、**階層型カテゴリではなく、多面的なタグ構造にする。**

## 4. 情報構造

図鑑には大きく4種類のデータを持たせる。

### A. Technique

映像表現の最小単位。例：Push In / Pull Out / Pan / Tilt / Orbit / Dolly Zoom / Rack Focus / Match Cut / Jump Cut / Whip Pan / Freeze Frame / Speed Ramp / Parallax / Mask Reveal / Kinetic Typography / Stagger Animation / Scale Punch / Overshoot / Motion Blur / Light Leak など。

### B. Recipe

複数Techniqueを組み合わせた「演出」。

例：Memory Reveal = 写真をゆっくりPush In ＋ 背景にParallax ＋ フィルムグレイン ＋ テキストを遅れてFade ＋ 音楽の小節頭でCut

Technique単体よりも、実際の映像制作ではRecipeの方が重要。

### C. Reference

実際の映像例。映画、CM、MV、アニメ、テレビ、YouTube、自作、AI生成など。

Referenceには、作品名 / URL / 該当時間 / Technique / なぜ効いているのか / 再現するとしたらどうするか を持たせる。

### D. Intent

「何がしたいか」からTechniqueへ逆引きする。

例：ワクワクさせる / 笑わせる / 泣かせる / 不安にする / 爽快にする / 高級に見せる / 安っぽく見せる / 子供っぽくする / 映画っぽくする / アニメOPっぽくする / テレビっぽくする / CMっぽくする / 思い出っぽくする / スピード感 / 重厚感 / 親近感 / 違和感 / 驚き / 緊張 / 開放感

重要なのは、**Intent → Techniqueを一対一にしないこと。** 「高級感 = Slow Motion」のような単純化はしない。

## 5. Techniqueの分類

最初は以下を正本カテゴリにする。

- **01 Camera** — カメラ自体の動き。Pan / Tilt / Dolly / Truck / Pedestal / Orbit / Crane / Handheld / Tracking / Push In / Pull Out など。
- **02 Shot** — 画角・距離・アングル。Extreme Close Up / Close Up / Medium / Wide / POV / OTS / Low Angle / High Angle / Dutch Angle など。
- **03 Lens & Focus** — レンズ・フォーカスによる表現。Rack Focus / Shallow DOF / Deep Focus / Zoom / Dolly Zoom / Lens Distortion など。
- **04 Composition** — 画面構成。Rule of Thirds / Center Composition / Symmetry / Negative Space / Leading Lines / Frame within Frame など。
- **05 Subject Motion** — 被写体そのものの動かし方。Enter / Exit / Cross Frame / Reveal / Follow / Approach / Turn / Look など。カメラを動かす以外に、人や物をどう動かすかという映像演出が存在する。
- **06 Edit** — 編集。Straight Cut / Match Cut / Jump Cut / Smash Cut / J Cut / L Cut / Cross Cut / Montage など。
- **07 Transition** — 画面転換。Fade / Dissolve / Wipe / Whip / Mask Transition / Object Transition / Match Transition など。
- **08 Time** — 時間の操作。Slow Motion / Fast Motion / Freeze / Speed Ramp / Reverse / Loop / Time Lapse など。
- **09 Photo Motion** — 写真の見せ方。Ken Burns / Parallax / Depth Projection / Camera Through Photo / Photo Stack / Polaroid / Collage / Contact Sheet / Photo Reveal など。結婚式制作とも直結する領域。
- **10 Typography** — 文字の見せ方。Fade / Typewriter / Tracking Animation / Character Stagger / Word Stagger / Mask Reveal / Scale Punch / Bounce / Overshoot / Kinetic Typography など。CSS Animationの知識とも接続できる。
- **11 Motion Graphics** — 図形・UI・グラフィック。Shape Morph / Line Draw / Trim Path / Mask / Matte / Particle / Trail / HUD / Split Screen / Grid など。
- **12 Image Treatment** — 映像そのものの加工。Blur / Glow / Grain / Bloom / Halation / Chromatic Aberration / Vignette / Distortion / Posterize など。
- **13 Light & Color** — 色と光。High Key / Low Key / Warm / Cool / Backlight / Silhouette / Rim Light / Color Contrast など。
- **14 Rhythm** — 音楽との関係。Beat Cut / Accent Cut / Hold / Burst / Syncopation / Anticipation / Hit / Drop / Build Up など。
- **15 Visual Storytelling** — 少し大きな構造。Reveal / Setup-Payoff / Visual Foreshadowing / Contrast / Repetition / Parallel / Callback など。

## 6. Techniqueカード

一つのTechniqueを開いたら以下を表示する（例：Push In）。

- 映像（説明より先に動画/GIF）
- 一言：被写体へカメラがゆっくり近づく
- 印象：集中 / 親密 / 緊張 / 気付き
- 向いている場面：人物の感情へ入りたいとき
- 向いていない場面：テンポを止めたくない高速モンタージュ
- Variants：Slow Push / Fast Push / Micro Push / Crash Push
- Combination：Push In + Rack Focus / Push In + Slow Motion / Push In + Text Reveal
- DaVinci：Transform / Dynamic Zoom / Fusion Camera
- After Effects：Scale / 3D Camera
- AI Prompt Fragment：`slow cinematic push-in toward the subject`

重要：プロンプトを主役にしない。映像そのものを主役にする。

## 7. 一番重要なUI

トップページで最初に専門用語を要求しない。入口は3つ。

1. **見た目から探す** — 短いLoop動画を大量に並べる（TikTok/Pinterest的）。気になる映像を押すと後から名前を教える。
2. **やりたいことから探す** — 例：「写真をかっこよく出したい」→ Photo Stack / Parallax / Mask Reveal / Flash Cut / Film Strip / 3D Photo を提示。
3. **名前から探す** — 知識があるユーザー向け。Push In / Match Cut / Rack Focus など。

## 8. AI時代に一番重要になる機能

将来的には、Reference → Technique ができるようにする。

ユーザーが「この動画みたいにしたい」と動画を投入 → AIが「この映像には Push In / Parallax / Mask Reveal / Character Stagger / Beat Cut / Motion Blur が使われています」と提示 → 図鑑の各Techniqueへリンク → 「これを自分の素材で再現」。

これが完成すると、素人が映像用語を知らなくてもプロの言葉へ変換できる。

## 9. AIへの出力

Techniqueを選択すると、単なるPromptではなく、Creative Direction / DaVinci Instructions / After Effects Instructions / AI Video Prompt / Image Animation Prompt へ変換する。

図鑑 → 演出選択 → 実装命令 までつなげる。

## 10. 著作権設計

ここは最初から厳しくする。映画やアニメの映像を勝手にGIF化して自社サービスで大量掲載する設計にはしない。

- **Reference**：公式YouTubeや公式Trailerへリンク（例：「01:13〜01:17」のように紹介）。
- **Demo**：Techniqueの説明用映像は、自作 / 自分で撮影 / ライセンス素材 / AI生成のどれかで作る。同じ技法を使った3秒の独自Demoを作ればよく、むしろその方がTechniqueだけを理解しやすい。

## 11. 最初から大量に作らない

いきなり「映像演出1000種類」にはしない。最初は Core Technique 60〜80個 程度を仮説として作る。その後、Techniqueではなく Recipe を増やす。60 Techniqueでも組み合わせで何百・何千もの演出になる。CSS Animationと似ている。

## 12. MVP

最初に作るもの：30 Technique（Camera / Edit / Photo / Typography / Motion から厳選）。各Techniqueにつき、3秒Demo / 日本語名 / 英語名 / 一言説明 / 効果 / 使用例 / 関連Technique / AI指示 を作る。

## 13. MVPで絶対に作る検索

検索欄に「写真3枚を音に合わせてテンポよく出したい」と入れると、AIが Beat Cut / Stagger / Scale Punch / Flash Transition / Photo Stack などを返す。専門用語を知らなくても使える。

## 14. Recipe機能

最終的にはTechniqueよりこちらが重要になる。

例：Anime Opening Burst = 3 Frame Hold / Speed Ramp / Whip Pan / Impact Frame / Character Stagger / Camera Push / Motion Blur

用語を覚えるのではなく、完成形から逆算して学べる。

## 15. 映像以外も統合する

映像だけで閉じない。CSS Animation / Web Motion / CM / 映画 / アニメ / TV / MV / ゲームUI / タイトルデザイン / 広告 / モーショングラフィックス。Ease / Overshoot / Anticipation / Follow Through / Stagger / Delay / Scale / Fade / Mask などを共通Vocabularyとして扱う。

## 16. このプロジェクトの本質

「映像を学ぶサービス」だけではない。より正確には、**頭の中にある映像イメージを、制作可能な言葉へ変換するシステム** である。

今までは、初心者「なんかかっこよく」／プロ「経験から演出を推測」だった。AI時代は、初心者 → Visual Dictionary → 映像用語・Technique・Recipe → AI / DaVinci / AE にできる。

## 17. 最大の差別化ポイント

本やYouTubeには「Dolly Zoomとは」は存在する。Pinterestには「かっこいい映像」が存在する。AIには「動画を作る能力」が存在する。しかし、Visual Reference → Technique → Why → Combination → AI Instruction → Editing Instruction まで一本につながっているものは少ない。ここを狙う。

## 18. 最初の開発フェーズ

- Phase 1：分類体系を確定
- Phase 2：Core Technique 60〜80候補を収集
- Phase 3：30 TechniqueだけDemo制作
- Phase 4：Web UI
- Phase 5：Intent検索
- Phase 6：Recipe
- Phase 7：動画解析AI
- Phase 8：DaVinci / After Effects / AI VideoへのInstruction生成

## 19. 破綻防止ルール

1. TechniqueとRecipeを混ぜない。
2. 感情だけで分類しない。
3. ソフトウェア名を分類軸にしない。
4. AI Promptを主役にしない。
5. 説明より映像を先に見せる。
6. 映画素材転載を正本にしない。
7. 同義語・英語名・日本語名を保持する。
8. 一つのTechniqueへ複数タグを許可する。
9. 「なぜ効くか」を必須項目にする。
10. AI時代に合わせてTechnique追加可能なデータ構造にする。

## 最終ゴール

ユーザーが映像を見て「これ好き」を押す。するとAIが「あなたが好きなのは、Slow Push In + Shallow Depth + Delayed Typography + Hold Cutです」と教える。さらに「自分の写真でやる」を押すと、DaVinci / AE / AI Video向けの指示へ変換される。

映像経験10年の人が頭の中で行っている“演出候補を引く作業”を、初心者にも一部開放する。これを、このプロジェクトの中心思想とする。
