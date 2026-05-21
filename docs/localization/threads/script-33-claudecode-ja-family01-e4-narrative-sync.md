# Thread: SCRIPT_JA family-01 e-4 ナラティブ同期

Target: ClaudeCode
Role: `SCRIPT_JA`

## Status

family-01 の証拠 `e-4` (공증인 메모 기록 / 公証人メモ記録) について、`main` 上で KO 原本が新ナラティブへ書き換えられた (commit `75391d7a`, "e-4 deep sweep")。日本語サイドカーは旧ナラティブのままで陳腐化しているため、本スレッドで新ナラティブに同期する。

surface 層の KO 変更 (viewerData, investigationStages, partyContext, v3DepthPlan, description, socialGraph, evidencePresentationScripts) は先行コミット `5700aa93` で適用済み。これらの JA サイドカーが追従できていなければ、同一スレッドで合わせて整合させる。

## 背景 — e-4 のナラティブ転換

旧ナラティブ (廃止):
- `공증 당일` を「同日の単一イベント」と扱う表現
- `숫자 혼동` / `숫자를 오락가락` — 母親が比率の数字を取り違える描写
- `같은 자리에서 숫자가 달라진` — 同席内で比率が変わったかのような解釈
- ステージ 1 ラベル `일반 기록`
- `절차 압박` という抽象的なラベル表現

新ナラティブ (現行):
- **同じ日に二度の公証訪問**:
  - `1차 접수 (오전)` 10:10 受付 — 遺言公証手続開始 / 相続比率整理 (確認); 10:25 — 遺言者本人確認 + 立会人 2 名 (正常); 11:05 — 押印 + 保管番号付与 (完了)。
  - `수정 접수 (오후)` 17:05 — 文書修正のための再訪要請; 18:57 — 修正遺言の公証手続開始、最終比率 60:40 確認。
  - `상태 메모 (수정 절차 중)` — 午後の修正手続中に記録:
    - 18:32 — 母が疲労を訴え、回答前に休憩を要請
    - 18:39 — 質問の反復で回答が遅れ、水を一杯求める
    - 18:43 — 修正理由を問うと、息子の手助けを得て発話
    - 18:47 — ユン・ジョンフが「今日中に済ませる」と手続を急かす様子
- ステージ開放:
  - ステージ 1: 1차 접수のみ (3 行) — 比率まだなし、特記なし
  - ステージ 2: 1차 + 수정 접수 (5 行) — 60:40 はここで初出
  - ステージ 3: 全 9 行 — 疲労 / 回答遅延 / 息子の助け / 「今日中」発言が露出

フレーズマッピング (KO → JA ガイドライン):

| KO (旧) | KO (新) | JA トーン目標 |
|---|---|---|
| 공증 당일 | 수정 접수 자리 / 1차と수정の二度の手続 | "午後の修正受付の場で" / "朝の受付と午後の修正受付の双方で" |
| 숫자 혼동 / 숫자를 오락가락 / 어머니가 숫자를 혼동 | 어머니가 답변을 늦추심 / 피로를 호소 / 물 한 잔을 청함 / 답변을 잇지 못하심 | "母が回答を遅らせた" / "母が疲労を訴えた" / "母が水を一杯求めた" / "母が回答を続けられなかった" |
| 같은 자리에서 숫자가 달라진 흔적 | 오전엔 비율이 비어 있다가 오후 수정에서 60:40으로 마무리된 흔적 | "朝には比率欄が空のままで、午後の修正で 60:40 として締めくくられた経緯" |
| 절차 압박 / 절차를 밀어붙인 듯 | 오늘 마쳐야 한다며 진행을 재촉 | "「今日中に終える」と言って手続を急かす" / "手続を急かす" |
| 공증 당일 절차에 제가 관여했습니다 | 오후 수정 접수 절차까지 제가 곁에서 끌고 갔습니다 | "午後の修正受付の手続まで、私が傍について進めました" |
| 일반 기록 (ステージ 1 ラベル) | 1차 접수 | "一次受付" / "朝の受付" |
| 공증 당일 11월 5일 (a-d-1-S5 自白) | 공증이 마무리된 11월 5일 | "公証が締めくくられた 11 月 5 日" |

新聞文体や定型訳語 (「公証当日」「数字の混同」など) は使わない。

## ソース確定

KO は commit `75391d7a` (執筆時の HEAD) で更新済み:

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence の label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) 証人召喚文
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 アンカーテキスト、合計 ~144 variants) + behaviorHint
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / 裁判官質問 / 証人召喚

surface 層 (先行 commit `5700aa93`) の JA 反映状況も同時確認:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status の JA ローカル

各ファイルの正確な KO 差分は `git diff 5700aa93~1 HEAD -- <file>` で確認すること。

## 必読

- `docs/localization/threads/script-22-claudecode-ja-spouse-01-pilot.md`
- `docs/localization/threads/script-28-claudecode-ja-family-friend-expansion.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak ルール (`90:10` / `自分の取り分を減らした偽造` を非 S5 で出さない)
- Memory `feedback_natural_korean_vs_translationese` — 翻訳調を避け、自然な口語に寄せる

## スコープ — 書き込み許可対象

JA サイドカーのみ。KO 原本および EN / zh-CN サイドカーは触らない。

- `src/data/scriptedText/family-01.ja.json`
- `src/data/scriptedAngles/family-01_angle_catalog.ja.json`
- `src/data/scriptedAngles/family-01_judge_questions.ja.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.ja.json`
- `src/data/scriptedAngles/family-01_special_scripts.ja.json` (構造上サポートされる場合)
- `src/data/cases/generated/family-01.ja.json`
- `src/data/claimPolicies/family-01-structure-v2.ja.json` (サイドカーが存在する場合)
- `src/data/evidencePresentationScripts.ja.json` (Glob で実体を確認)
- `logFilter_first` / `logFilter_amend` / `logFilter_status` の JA ロケールキーを保持する UI ロケールファイル

## 作業手順

1. `git fetch && git checkout main && git pull` で `75391d7a` 以降に追従。
2. `git diff 5700aa93~1 HEAD -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json` で旧→新の差分を全列挙。
3. 各 KO 変更について JA サイドカーの該当 `id` を特定し、上記マッピングに従って JA を置換。`id` / `behaviorHint` / `tags` / 配列順は保持。
4. surface 層 (case data / viewer / log filter ラベル) にも同じ転換を適用。
5. KO 側で新たに増えた構造 (LogRow `filterGroup` フィールド、keywords 配列の `"1차 접수"` / `"수정 접수"`) はサイドカーが同形なら追従する。
6. validation gates を最後にすべて通す。

## QA / truth-leak ガード

- ステージ 0 / ステージ 1 表面 (partyContext, viewerData stage 1, description, socialGraph) でステージ 2 (`60:40`) / ステージ 3 (母の状態、回答遅延、急かし) キーワードを露出させない。KO 側は除去済み。
- `90:10` / 「自分の取り分を減らした」/「偽造」は非 S5 で禁止。S5 では KO の disclosure policy に揃った強度で開示する。
- `truth-leak-matrix.json` の `hidden.ja` 配列に既定された語との重複を避ける。

## バリデーションコマンド

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict
npm run localization:cases:validate -- --case=family-01 --locale=ja --strict
npm run check:policy -- --locale=ja
npm run qa:lqa
npm run qa:fast
```

可能なら `npm run build:pc` も実行。

## 成果物ディレクトリ

`docs/localization/threads/outputs/script-thread-33-ja-family01-e4-narrative-sync/`

必須:

- `SUMMARY.md` — 触れたファイル、variants 数、ナラティブ転換準拠ノート
- `VARIATION_AUDIT_SUMMARY.json` — 高ボリュームバケット (非 S5) のアンカー多様性が維持されていること
- `TRUTH_BOUNDARY_SUMMARY.json` — 非 S5 forbidden lexeme violations = 0
- `GIT_LOG.md` — 最終コミットハッシュ

## worktree 衛生

サブエージェントを spawn する場合は `git config --global --add safe.directory <worktree>` を先に実行 (memory `feedback_codex_worktree_safe_directory`)。KO 原本はどのサブエージェントからも編集しない。
