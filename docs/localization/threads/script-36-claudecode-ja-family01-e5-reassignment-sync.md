# Thread: SCRIPT_JA family-01 e-5 再配置 + d-2 ナラティブ分離 同期

Target: ClaudeCode
Role: `SCRIPT_JA`

## Status

script-thread-33 で e-4 ナラティブ同期 + KO 自然化 v3 + scriptedAngles 整合まで反映完了 (cherry-pick `b0a9039e`)。その後 KO main に 4 つの新規コミットが着地し、JA サイドカーはこれらをまだ反映していない。最大の構造変化は、証拠 `e-5`「어머니 자필 유언장 연습본 (母の自筆遺言下書き)」が dispute `d-2` から `d-5` へ移されたこと、そして d-2 ナラティブが公証手続そのものに再アンカーされたことだ。

同期対象 KO コミット (時系列):
- `7ac600a1` — Phase 1 e-5 再配置データ (case data + structure + disclosurePolicy + truth-leak matrix)
- `a856966d` — Phase 2-1 d-2 自白ナラティブ分離 (special_scripts 4 entries)
- `e48eeae1` — Phase 2-2 scriptedAngles + scriptedText d-2 ナラティブ分離 (~720 string)
- `08be3f25` — Phase 2-3 claimPolicies (dossier + events + atoms) ~59 string

現状の JA サイドカーは `e-5` を d-2 証拠として扱っており、d-2 アンカーに 自筆 / 90:10 / 偽造 / 「自分の取り分を減らした」言語が残っている。本スレッドで再同期する。

## 背景 — 設計の転換

**旧設計 (廃止)**:
- `e-5` (90:10 を示す自筆下書き) が dispute `d-2` (「60:40 遺言と別文書の差異」) の hard evidence。
- `e-5` が開示された瞬間に d-2 の正解が自動露出 (ジョンフが自分の 90 を公証 60 に削った)。
- d-2 verdict は `e-4` と `e-5` 両方を要求。
- d-5 (「母の隠された思い」) は `e-5` の重みなしに抽象的動機層として存在。

**新設計 (canonical from `7ac600a1`)**:
- d-2 = **「공증 절차의 개입」/「公証手続への介入」**。`e-4` (公証人メモ) 単独で verdict 到達可能。ナラティブは、午前1次受付で比率欄が空のままだったこと、午後の修正受付で 60:40 が確定したこと、母の不安定な状態、ジョンフが手続を急かしたこと。その介入の動機は **d-2 内では結論づけない**。
- d-5 = **「어머니의 숨겨진 마음」/「母の隠された思い」** — `e-5` + `e-6` + `e-7` を要求。ジョンフが母の意思を書き換えた hard evidence は、自筆 90:10 と公証 60:40 の対比そのもの。
- `e-5` 再配置: `proves` = `["d-5"]`, `requiredLieState` = `"S5"` (d-4 verdict 後に開示、以前は d-1 S2 だった)。
- 証拠 require チェーン緩和: `e-6.requires` = `["e-4"]` (旧 `["e-5"]`); `e-7.requires` = `["e-6"]` (旧 `["e-5", "e-6"]`)。

d-2 アンカーへの影響: 自筆 / 90:10 / 偽造 / 「自分の取り分を減らした」言語はすべて除去し、手続言語 (午前 1 次受付 / 午後修正 / ジョンフの催促 / 母の状態) に置き換える。d-5 アンカーへの影響: 自筆 90:10 → 公証 60:40 の痕跡を、抽象に留めず evidence として明示する。

## Tier 1 — データファイル (Phase 1, commit `7ac600a1`)

JA サイドカーは下記 KO データ変更をミラーすること。正確な差分は `git diff 7ac600a1~1 7ac600a1 -- <file>` で確認。

- `src/data/cases/generated/family-01.json`
  - d-2: `name`, `truthDescription`, `verdictOptions.{wrong,partial,truth,defer}`, `mediationLink`, `judgmentStatement`, `v3UnlockPlan.{runtimeRule,authoredRule,summary}`, `requiredEvidence`
  - d-5: `truthDescription`, `verdictOptions.truth`, `verdictOptions.defer`, `requiredEvidence`
  - e-5: `proves`, `requiredLieState`, `partyContext.a/b`
  - e-6 `requires`, e-7 `requires`, socialGraph e-5 `linkedDisputeIds`
- `src/data/claimPolicies/family-01-structure-v2.json` — d-2/d-5/e-5/e-6/e-7
- `src/data/disclosurePolicy/family-01.json` — disputes.d-2/d-5 surface/truth/truthLexemes + d-2 truthStages stage 0-4 + d-5 truthStages stage 2/3/4
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` — d-2.hidden / d-5.hidden は `7ac600a1` で 4 言語 (JA を含む) すでに更新済み。JA セクションが正しいかのみ verify

JA サイドカーがこれらの構造をミラーする場合 (`family-01.ja.json`, `family-01-structure-v2.ja.json` 等)、同じ shape を適用する。

## Tier 2 — ナラティブ分離 (Phase 2, commits `a856966d` + `e48eeae1` + `08be3f25`)

KO 変更 — 約 **800 string**:

- `src/data/scriptedAngles/family-01_special_scripts.json` — 17 string (d-2 confessions + s5RequestionResponses + judge_evidence_combo + dossier-note-d-2)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — ~486 string (d-2 anchors)
- `src/data/scriptedText/family-01.json` — ~225 anchor (d-2 anchors + d-2 ナラティブが入り込んでいた interrogation/evidence_present/dossier/witness/mediation/contradiction/primary_fault/shared_fault/protective_resolution/procedural_caution 領域 + b-d-5-S5 トーン整合 3 件)
- `src/data/claimPolicies/family-01-dossier-cards.json` — 6 string (dc-2)
- `src/data/claimPolicies/family-01-game-events.json` — 4 string
- `src/data/claimPolicies/family-01-game-events-v2.json` — 8 string (contradictions[8]/[11] + conflicts[5])
- `src/data/claimPolicies/family-01-v2-atoms.json` — ~41 string (24 amount block exact/rounded 一括 + 6 evidence block + factText + 偽造 lexeme 整列)

各 KO 変更について JA サイドカーの該当 `id` を特定し、JA を再執筆する。目標は自然な日本語の被告 / 裁判官発話 — 字義訳ではなく **再自然化** (script-thread-33 で使った 8 次元ガイドと同じ)。

### 高頻度 KO 置換 (Phase 2 dominant templates) と JA 目標

KO sweep の繰り返しテンプレートを単一の正規 JA 訳に固定する。`reveal` / `lieState` 区分は保持。むやみに散らさない。

| KO (旧) | KO (新) | JA 目標 |
|---|---|---|
| 자필 연습본이 나오면 제 단정도 흔들릴 수밖에 없습니다 | 공증 절차에 다른 정황이 드러나면 제 단정도 흔들릴 수밖에 없습니다 | 「公証手続に他の事情が出てくれば、私の決めつけも揺らがざるを得ません。」 |
| 자필 연습본과 공증본이 다르다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | 공증 절차에 다른 동기가 있었다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | 「公証手続に別の動機があったのなら、私が信じていた操作の向きも見直さねばなりません。」 |
| 90:10에서 60:40으로 바뀐 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | 정후가 진행을 재촉하며 절차에 깊이 개입한 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | 「ジョンフが手続を急かし、深く介入した流れを見れば、弟がただ多く取ろうとしたという話だけでは説明がつきません。私の決めつけにも責任を負うべきです。」 |
| 자필 연습본과 공증본의 방향을 함께 보면 제 첫 의심은 단순하지 않았습니다 | 공증 절차의 흐름을 함께 보면 제 첫 의심은 단순하지 않았습니다 | 「公証手続の流れを並べて見ると、私の最初の疑いは単純ではありませんでした。」 |
| 자필 연습본과 공증본을 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | 절차 안의 진행 압박과 어머니 상태를 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | 「手続の中の進行圧力と母の状態を併せて見れば、私が最初に語った貪欲という絵だけでは説明がつきません。もはや公証本だけで判断できないことは認めます。」 |
| 동생이 자기 몫을 줄인 변경이었다는 점까지 확인했습니다. 그래도 어머니 문서를 바꾼 책임은 별도로 남습니다 | 정후가 절차에서 진행을 재촉했다는 점까지 확인했습니다. 그래도 절차에 손댄 책임은 별도로 남습니다 | 「ジョンフが手続を急かしていたという点までは確認しました。それでも手続に手を入れた責任は別に残ります。」 |
| 자필 연습본의 방향을 보고 나니 제 의심도 틀어진 부분이 있습니다 | 절차의 흐름을 보고 나니 제 의심도 틀어진 부분이 있습니다 | 「手続の流れを見て、私の疑いがずれていた部分もあると気づきました。」 |
| 자필 연습본의 90:10을 공증본 60:40으로 바꾼 사실은 인정합니다. 제 몫을 줄인 변경이어도 위조 책임은 남습니다 | 공증 오후 수정에서 진행을 재촉한 사실은 인정합니다. 그 절차에 손댄 책임은 남습니다 | 「午後の修正公証で進行を急かしたことは認めます。その手続に手を入れた責任は残ります。」 |
| 공증본과 자필 연습본 사이에 제가 만든 차이가 있었습니다. 형을 지키려 했다는 말로 어머니 뜻을 고친 책임이 사라지지는 않습니다 | 공증 절차에 제가 깊이 개입한 부분이 있었습니다. 그 동기로 어머니 상태에 작용한 책임이 사라지지는 않습니다 | 「公証手続に私が深く介入した部分がありました。その動機で、母の状態に作用した責任は消えません。」 |
| 제가 유언장에 손을 댄 사실을 부인하지 않겠습니다 → 자필 연습본과 공증본의 차이는 제가 만든 것입니다 | 제가 공증 절차에 손을 댄 사실을 부인하지 않겠습니다 → 오후 수정 단계에서 진행을 빨리 끌고 간 것은 제 책임입니다 | 「私が公証手続に手を入れた事実は否定しません。午後の修正段階で進行を早く引き連れていったのは私の責任です。」 |
| 공증본은 60:40으로 남았고 자필 연습본은 달랐습니다. 그 차이를 만든 사람이 저라는 점을 인정합니다 | 공증본은 60:40으로 남았고 그 자리에 도달하는 절차를 제가 끌고 갔습니다. 그 절차 책임을 제가 인정합니다 | 「公証本は 60:40 として残っており、そこに至る手続を引っ張ったのは私です。その手続上の責任は認めます。」 |
| 자필 연습본과 공증본이 다르게 남은 경위는 기록으로 확인해야 합니다 | 공증 절차의 경위는 기록으로 확인해야 합니다 | 「公証手続の経緯は記録で確認しなければなりません。」 |
| 자필 연습본을 언제 봤는지와 공증본이 어떻게 남았는지는 분리해 답하겠습니다 | 오전 1차 접수의 흐름과 오후 수정 접수의 진행은 분리해 답하겠습니다 | 「午前 1 次受付の流れと午後の修正受付の進行は、分けてお答えします。」 |
| 어머니 문서가 다르게 남은 책임은 따져야 합니다. 다만 그 책임을 지금 제 위조로 단정할 수는 없습니다 | 공증 절차에 손댄 책임은 따져야 합니다. 다만 그 책임이 어떤 동기였는지는 별도로 봐야 합니다 | 「公証手続に手を入れた責任は問わねばなりません。ただ、その責任がどんな動機であったかは別に見るべきです。」 |
| 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 자필 연습본과 함께 설명하겠습니다 | 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 어머니 상태와 진행 압박을 함께 설명하겠습니다 | 「公証本が 60:40 として残るに至った過程に私の責任があります。なぜそうなったかは、母の状態と進行圧力を併せてご説明します。」 |
| 두 문서 사이에 제가 만든 차이가 있었다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 자필 연습본의 내용과 함께 봐야 합니다 | 공증 절차에 제가 깊이 개입했다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 어머니 상태와 진행 압박을 함께 봐야 합니다 | 「公証手続に私が深く介入した点は避けません。ただ、なぜそうしたかは、母の状態と進行圧力を併せて見るべきです。」 |
| 자필 연습본과 공증본이 다르게 남은 이유에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | 공증 절차의 진행 속도에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | 「公証手続の進行速度に私の判断が入っていました。その責任はご説明します。」 |
| 제가 유언장에 손을 댄 사실은 부인하지 않겠습니다. 자필 연습본과 공증본의 차이가 그 핵심입니다 | 제가 공증 절차에 손을 댄 사실은 부인하지 않겠습니다. 오후 수정 단계에서 진행을 재촉한 것이 그 핵심입니다 | 「私が公証手続に手を入れた事実は否定しません。午後の修正段階で進行を急かしたことが核心です。」 |
| 위조 책임이라는 말이 무겁다는 걸 압니다 | 절차 개입 책임이라는 말이 무겁다는 걸 압니다 | 「手続介入の責任という言葉が重いことは分かっています。」 |

### 自白テンプレート (special_scripts d-2 + s5RequestionResponses)

| KO (新) | JA 目標 |
|---|---|
| 정후가 오후 수정 공증에서 어머니 상태가 불안정한데도 진행을 재촉했다는 사실을 받아들입니다. 그래도 절차 개입 책임은 남습니다 | 「ジョンフが午後の修正公証で、母の状態が不安定であったにもかかわらず進行を急かしたという事実は受け入れます。それでも手続介入の責任は残ります。」 |
| 공증 오후 수정에서 어머니가 답변을 잇지 못하시는데도 제가 진행을 빨리 끌고 갔습니다. 그 절차에 손댄 책임은 제 몫입니다 | 「公証の午後修正で、母が回答を続けられない中、私が進行を早く引き連れていきました。その手続に手を入れた責任は私のものです。」 |
| 공증 절차의 흐름에 관해서도 그 범위 안에서만 설명하겠습니다 (s5RequestionResponses 後尾) | 「公証手続の流れについても、その範囲内でのみ申し上げます。」 |
| 절차 개입 책임에 관해서도 그 범위 안에서만 설명하겠습니다 | 「手続介入の責任についても、その範囲内でのみ申し上げます。」 |
| 공증 절차 안에서 진행 순서와 어머니 상태의 흔적이 맞지 않습니다. 그 진행 순서와 제출 단계를 확인해야 합니다 (judge_evidence_combo) | 「公証手続の中で、進行順序と母の状態の痕跡が合いません。その進行順序と提出段階を確認しなければなりません。」 |
| 절차에 손댄 동기가 통념적 탐욕과 다르더라도 절차 개입 책임은 사라지지 않는다 (dossier note) | 「手続に手を入れた動機が通念的な貪欲と異なっていても、手続介入の責任は消えない。」 |
| 공증 절차의 진행 압박과 어머니 상태의 작용은 본인이 인정한 단계에서만 기록한다 (dossier note) | 「公証手続の進行圧力と母の状態の作用は、本人が認めた段階でのみ記録する。」 |

### v2-atoms amount-block dominant template

24 amount block を一括で:

| KO field | KO 新 | JA 目標 |
|---|---|---|
| `exact` | 오전 1차 비율 공란을 오후 수정에서 60대 40으로 확정 | 「午前 1 次受付の比率空欄を午後の修正で 60 対 40 に確定」 |
| `rounded` | 오전 1차 공란→오후 수정 확정 | 「午前 1 次空欄→午後修正確定」 |
| `neutral` | (그 비율 keep) | 「その比率」(keep) |

evidence-block 6 件:

| KO 新 | JA 目標 |
|---|---|
| 공증인 메모 기록과 오전 1차 비율 공란 | 「公証人メモ記録と午前 1 次受付の比率空欄」 |
| 공증인 메모와 절차 흐름 | 「公証人メモと手続の流れ」 |

### action.exact フィールド — KEEP

`action.exact` = 「유서 비율 변경」(v2-atoms で 24 回) は d-2 surface fact の識別子であり、自筆 / 90:10 lexeme を含まない。安定した日本語ラベルとして訳し、例えば **「遺言の比率変更」** とし、24 回すべて統一する。

## d-5 JA 強化 (小)

JA d-5 アンカーは、KO 側で `e-5` evidence weight を担っているところでは同様に読めること。主な箇所 (KO ですでに変更済み):

- d-5 truthDescription (KO 新): "...어머니가 자필 연습본에 남긴 90:10을 정후가 공증 60:40으로 줄인 것이 그 대표 흔적이다..." — JA 目標: **「...母が自筆下書きに残した 90:10 を、ジョンフが公証 60:40 に縮小したことがその代表的な痕跡である...」**
- d-5 verdictOptions.truth (KO 新): "...자필 연습본 90:10이 공증본 60:40으로 바뀐 흐름이 그 대표 사례다..." — JA 目標: **「...自筆下書きの 90:10 が公証本の 60:40 に変わった流れがその代表例である...」**
- d-5 disputes.truth (disclosurePolicy, KO 新): 同 shape — JA 目標 mirror。
- b-d-5-S5-motive-search v6/v7/v10 (scriptedText): KO 「위조 책임」 → 「절차 개입 책임」。JA 目標: 「偽造の責任」 → 「手続介入の責任」。

KO 側で自筆 / 90:10 を持たない d-5 アンカーに新規追加してはならない。

## スコープ — 書き込み許可対象

JA サイドカーのみ。KO 原本および EN / zh-CN サイドカー、`behaviorHint` (KO 内部) は触らない。

- `src/data/scriptedText/family-01.ja.json` — メイン
- `src/data/scriptedAngles/family-01_interrogation_answers.ja.json` — メイン
- `src/data/scriptedAngles/family-01_special_scripts.ja.json` — 自白 + s5RequestionResponses + judge_evidence_combo + dossier-note
- `src/data/scriptedAngles/family-01_judge_questions.ja.json` — `7ac600a1`→`08be3f25` で KO 側に変更があった場合のみ (`git diff` で確認)
- `src/data/scriptedAngles/family-01_angle_catalog.ja.json` — verify
- `src/data/cases/generated/family-01.ja.json` — Phase 1 データ同期
- `src/data/claimPolicies/family-01-structure-v2.ja.json` (サイドカーが存在する場合)
- `src/data/claimPolicies/family-01-dossier-cards.ja.json` (サイドカーが存在する場合)
- `src/data/claimPolicies/family-01-v2-atoms.ja.json` (サイドカーが存在する場合)
- `src/data/claimPolicies/family-01-game-events.ja.json` / `family-01-game-events-v2.ja.json` (サイドカーが存在する場合)
- `src/data/disclosurePolicy/family-01.json` の JA 言語フィールド (4 言語が同一ファイルにある場合、`disputes.d-2` / `disputes.d-5` / d-2 truthStages / d-5 truthStages の JA セクションのみ KO 変更が JA 訳に到達していれば更新)
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` JA セクション — `7ac600a1` で更新済み; verify のみ

存在しないサイドカーや構造をミラーしないものは skip — `Glob` で先に確認。

## 作業手順

1. `git fetch && git checkout main && git pull` で HEAD = `08be3f25` 以降に追従。
2. コミット別に KO 差分を全列挙:
   - Phase 1 データ: `git diff 7ac600a1~1 7ac600a1 -- src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json src/data/disclosurePolicy/family-01.json docs/localization/non-dialogue-extract/truth-leak-matrix.json`
   - Phase 2-1 confessions: `git diff a856966d~1 a856966d -- src/data/scriptedAngles/family-01_special_scripts.json`
   - Phase 2-2 メイン sweep: `git diff e48eeae1~1 e48eeae1 -- src/data/scriptedAngles/family-01_interrogation_answers.json src/data/scriptedAngles/family-01_special_scripts.json src/data/scriptedText/family-01.json`
   - Phase 2-3 claimPolicies: `git diff 08be3f25~1 08be3f25 -- src/data/claimPolicies/family-01-dossier-cards.json src/data/claimPolicies/family-01-game-events.json src/data/claimPolicies/family-01-game-events-v2.json src/data/claimPolicies/family-01-v2-atoms.json`
3. 各 KO 変更について JA サイドカーの該当 `id` を特定し、上記テンプレート表を用いて JA を書き換える。KO 繰り返しテンプレートには単一の正規 JA 訳を用いる。`id`, `tags`, 順序, `behaviorHint` は保持。
4. データファイル (Phase 1) については、構造変更 (`requiredEvidence`, `proves`, `requires`, `requiredLieState` 等) を JA サイドカーがそれらを持つ場合のみミラーし、そうでなければ `text` / `name` / `truthDescription` / `verdictOptions` の訳に集中。
5. validation gates を commit 前に必ず通す。

## QA / truth-leak ガード

- d-2 アンカー (どの層でも) は「自筆」「90:10」「偽造」「自分の取り分を減らした」「下書き」の JA 同等表現を含んではならない。KO sweep を mirror する。
- d-5 アンカーは「自筆 90:10」「公証 60:40」相当を KO 側にある場合のみ含む — 一般に d-5 stage 2 motive 層以降と `e-5` evidence 提示。
- d-1 / d-3 / d-4 アンカーは「自筆」「90:10」「偽造」相当を新規取得してはならない; 以前下書きを参照していた cross-reference は手続文脈 (「周辺の手続文脈」等) に書き換える。
- `truth-leak-matrix.json` JA セクション: d-2.hidden は手続セット、d-5.hidden は自筆 → 公証縮小の行を含むこと。両者とも `7ac600a1` で更新済み — verify のみ。
- **多様性保持 (Tier 2 で重要)**: 各繰り返し KO テンプレートは単一の正規 JA 訳に対応。非 S5 高ボリュームバケットは全体として ≥3 opener アンカー / ≥3 closer アンカー (異なる KO アンカー由来) を維持。

## バリデーションコマンド

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict
npm run localization:cases:validate -- --case=family-01 --locale=ja --strict
npm run check:policy -- --locale=ja
npm run qa:lqa
npm run qa:fast
npm run qa:cutscene
```

可能なら `npm run build:pc` も実行。

## 成果物ディレクトリ

`docs/localization/threads/outputs/script-thread-36-ja-family01-e5-reassignment-sync/`

必須:

- `SUMMARY.md` — 触れたファイル、tier 別 variants 数 (Tier 1 データ / Tier 2 ナラティブ分離)、ナラティブ転換準拠ノート
- `NARRATIVE_SPLIT_AUDIT.md` — 10 アンカーをスポット監査し、d-2 アンカーから自筆 / 90:10 / 偽造 / 自分の取り分の言語が完全に除去され、d-5 アンカーが必要な箇所で 90:10 → 60:40 の縮小を持つことを示す。
- `VARIATION_AUDIT_SUMMARY.json` — アンカー多様性が維持されていること + テンプレート均一性チェック
- `TRUTH_BOUNDARY_SUMMARY.json` — d-2 forbidden lexeme violations = 0, d-5 ナラティブが必要箇所に存在
- `GIT_LOG.md` — 最終コミットハッシュ

## worktree 衛生

サブエージェントを spawn する場合は `git config --global --add safe.directory <worktree>` を先に実行 (memory `feedback_codex_worktree_safe_directory`)。KO 原本はどのサブエージェントからも編集しない。
