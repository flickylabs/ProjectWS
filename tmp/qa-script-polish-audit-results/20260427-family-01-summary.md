# family-01 Script Polish Audit Summary

Date: 2026-04-27

## Scope / Guardrails
- Scope: read/report only. No edits to `src/data/scriptedText/*`, `src/data/caseData/*`, policy docs, or `src/app/pc.css`.
- `git pull` skipped because it can mutate the worktree; tracked diff was checked separately.
- Primary audit target: `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`.
- Context docs read: `docs/spot-check-format.md`, `docs/disclosure-policy.md`, `docs/information-surface-policy.md`, `CLAUDE.md`.
- Requested `memory/...` files were not present in this worktree (`rg --files` returned no matches).
- Phase 1/2 dialogue files were not audited because the restored request scoped the audit target to ScriptedText and these three ScriptedText files have no phase1/phase2 channels.

## Audit Coverage
- Static candidate pass: all 5,172 variants in `src/data/scriptedText/family-01.json` were flattened for empty/short response, system-message length, mechanical Korean, and policy lexeme candidates.
- Manual route sample: 78 high-frequency route keys across interrogation, evidence_present, dossier, witness, contradiction, judge_* channels, mediation, and aftermath.
- Raw truth-lexeme candidates before manual filtering: 49.
- Empty/null response scan: 0 exact empty / standalone `...` variants found.
- System message length scan: 0 entries over 60 chars found.

## Finding Summary
- Selected actionable findings: 9
- Severity counts: {"P1":3,"P0":5,"P2":1}

| id | severity | category | phase/action | variantId | quote |
|---|---:|---|---|---|---|
| SPA-FA-001 | P1 | D1 / 누설 | 3/5 / fact_pursuit | b-d-2-S0-fact-pursuit-v1 | 유서를 손댄 적 없습니다. |
| SPA-FA-002 | P0 | D1 / 누설 | 3/5 / empathy_approach | b-d-5-S2-empathy-approach-v2 | 배다른 동생 주제에 생색낸다는 말은 듣기 싫었지만, 형이 쓰러지는 건 더 싫었습니다. |
| SPA-FA-003 | P1 | D2 / 누설 | 4 / evidence_present | a-e-4-early-stage3-v4 | 저는 자기 몫을 줄이는 방향으로 손댄 정황에서 제 동생 책임이 드러난다고 봅니다. |
| SPA-FA-004 | P0 | 정책 위반 / 누설 | 3/5 / fact_pursuit | judgeq-d-4-fact-pursuit-3-v4 | 두 분, 출생에 관한 사실과 상속 비율을 분리해 말씀해 주십시오. |
| SPA-FA-005 | P0 | 정책 위반 / 누설 | 3/5 / contradiction_pursuit | judgec-d-4-hard-v1 | 윤정후 씨, 윤태성 씨의 출생에 관한 사실을 알고도 법정까지 숨겼습니다. 보호라는 말로 끝낼 수 없습니다. |
| SPA-FA-006 | P0 | 정책 위반 / 누설 | 4 / evidence_combine | judgeec-dc-3-b-q1-mid-v1 | 원본 유서와 송금 내역을 붙이면 윤정후 씨가 오랫동안 생활비와 공장 자금을 떠받친 흐름이 이어집니다. 왜 처음부터 말하지 않았습니까. |
| SPA-FA-007 | P0 | 정책 위반 / 누설 | 4 / witness_summon | judgew-w-3-hard-v1 | 박순애 씨, 들어오십시오. 어머니가 말한 송금과 공장 자금의 출처를 바로 확인하겠습니다. |
| SPA-FA-008 | P2 | C1 | 3/5 / empathy_approach | b-d-5-S4-empathy-approach-v4 | 이제 와서 보면 저는 지키려는 마음과 오만을 구분하지 못했습니다. |
| SPA-FA-009 | P1 | D2 / 누설 | 4 / evidence_present | a-e-7-early-restore_context-v6 | 유서를 바꾼 진짜 이유라는 말을 듣는 순간부터 제 지난 삶이 흔들립니다. |

## Detailed Findings
### SPA-FA-001
- caseId: family-01
- phase: 3/5
- action: fact_pursuit
- target: 윤정후
- disputeOrEvidence: {"disputeId":"d-2","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 유서를 손댄 적 없습니다.
- why: family policy가 S0 NPC 단정 우회로 `유서를 손댄`을 지목합니다. S0에서 행위 단정/부정을 직접 내면 lieState flow가 너무 앞섭니다.
- expected: S0에서는 문서 이상을 부정하더라도 “그렇게 단정할 일은 아닙니다”처럼 진실 행위를 직접 말하지 않아야 합니다.
- severity: P1
- category: D1 / 누설
- patternHint: /유서를 손댄/ in NPC S0
- variantId: b-d-2-S0-fact-pursuit-v1
- relatedVariantIds: b-d-2-S0-empathy-approach-v4

### SPA-FA-002
- caseId: family-01
- phase: 3/5
- action: empathy_approach
- target: 윤정후
- disputeOrEvidence: {"disputeId":"d-5","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 배다른 동생 주제에 생색낸다는 말은 듣기 싫었지만, 형이 쓰러지는 건 더 싫었습니다.
- why: S2에서 `배다른`을 직접 말해 출생 비밀을 공개합니다. family 금지 lexeme의 핵심입니다.
- expected: S2에서는 형제 관계의 민감한 사정은 “말 못 할 가족사” 수준으로만 둬야 합니다.
- severity: P0
- category: D1 / 누설
- patternHint: /배다른/ before S3+
- variantId: b-d-5-S2-empathy-approach-v2

### SPA-FA-003
- caseId: family-01
- phase: 4
- action: evidence_present
- target: 윤태성
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-4","investigationStage":"early/stage3","meterState":"N/A"}
- quote: 저는 자기 몫을 줄이는 방향으로 손댄 정황에서 제 동생 책임이 드러난다고 봅니다.
- why: `자기 몫을 줄`은 family paraphrase 우회 lexeme입니다. early evidence response가 조작 방향을 지나치게 구체화합니다.
- expected: early에서는 “문서가 바뀐 방향” 정도로 두고 구체 비율/자기 몫 축소 구조는 late 또는 플레이어 발견 후로 넘겨야 합니다.
- severity: P1
- category: D2 / 누설
- patternHint: /자기 몫을 줄/ in early evidence_present
- variantId: a-e-4-early-stage3-v4

### SPA-FA-004
- caseId: family-01
- phase: 3/5
- action: fact_pursuit
- target: 윤태성/윤정후
- disputeOrEvidence: {"disputeId":"d-4","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 두 분, 출생에 관한 사실과 상속 비율을 분리해 말씀해 주십시오.
- why: 재판관 질문 채널이 `출생에 관한 사실`을 직접 의제로 올립니다. judge_question은 surface-only라 출생 비밀 lexeme을 말하면 안 됩니다.
- expected: “민감한 가족 사정”처럼 추상화해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /출생에 관한 사실|출생 비밀/ in judge_question
- variantId: judgeq-d-4-fact-pursuit-3-v4

### SPA-FA-005
- caseId: family-01
- phase: 3/5
- action: contradiction_pursuit
- target: 윤정후
- disputeOrEvidence: {"disputeId":"d-4","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 윤정후 씨, 윤태성 씨의 출생에 관한 사실을 알고도 법정까지 숨겼습니다. 보호라는 말로 끝낼 수 없습니다.
- why: judge_contradiction이 출생 비밀을 사실로 확정합니다. 정책상 재판관 모순 추궁은 진실 직접 명시 금지입니다.
- expected: “민감한 가족 사정을 알고도 숨긴 점”처럼 surface-only로 압박해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /출생에 관한 사실/ in judge_contradiction
- variantId: judgec-d-4-hard-v1

### SPA-FA-006
- caseId: family-01
- phase: 4
- action: evidence_combine
- target: 윤정후
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-5+e-6","investigationStage":"N/A","meterState":"N/A"}
- quote: 원본 유서와 송금 내역을 붙이면 윤정후 씨가 오랫동안 생활비와 공장 자금을 떠받친 흐름이 이어집니다. 왜 처음부터 말하지 않았습니까.
- why: judge_evidence_combo가 `공장 자금`의 출처 구조를 직접 말합니다. family policy는 이 lexeme을 surface-only 채널 금지 후보로 둡니다.
- expected: 증거 조합 안내는 “오래된 지원 흐름”과 “자료의 출처” 수준으로 추상화해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /공장 자금/ in judge_evidence_combo
- variantId: judgeec-dc-3-b-q1-mid-v1

### SPA-FA-007
- caseId: family-01
- phase: 4
- action: witness_summon
- target: w-3
- disputeOrEvidence: {"disputeId":"d-3/d-5","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 박순애 씨, 들어오십시오. 어머니가 말한 송금과 공장 자금의 출처를 바로 확인하겠습니다.
- why: judge_witness_summon은 증인 surfaceKnowledge만 허용되는데 `공장 자금의 출처`를 직접 말합니다.
- expected: “오래된 지원 흐름” 또는 “어머니가 말한 돈의 흐름” 정도로 유지해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /공장 자금의 출처|공장 자금 이야기/ in judge_witness_summon
- variantId: judgew-w-3-hard-v1

### SPA-FA-008
- caseId: family-01
- phase: 3/5
- action: empathy_approach
- target: 윤정후
- disputeOrEvidence: {"disputeId":"d-5","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 이제 와서 보면 저는 지키려는 마음과 오만을 구분하지 못했습니다.
- why: CLAUDE.md 한국어 품질 규칙에서 `~만을`은 `~만`으로 줄이라고 되어 있습니다.
- expected: 문장 의미는 유지하되 `~만`으로 자연화해야 합니다.
- severity: P2
- category: C1
- patternHint: /만을/
- variantId: b-d-5-S4-empathy-approach-v4

### SPA-FA-009
- caseId: family-01
- phase: 4
- action: evidence_present
- target: 윤태성
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-7","investigationStage":"early","meterState":"N/A"}
- quote: 유서를 바꾼 진짜 이유라는 말을 듣는 순간부터 제 지난 삶이 흔들립니다.
- why: early evidence response가 `유서를 바꾼 진짜 이유`를 단정합니다. e-7의 핵심 진실은 stage-gated로 다뤄야 합니다.
- expected: early에서는 “문서가 바뀐 배경” 정도로 완충해야 합니다.
- severity: P1
- category: D2 / 누설
- patternHint: /유서를 바꾼 진짜 이유/ in early evidence_present
- variantId: a-e-7-early-restore_context-v6

## Notes
- This is a report-only artifact. No source data was modified.
- Some late/confession truth lexeme hits were intentionally not promoted when the channel/lieBand appeared gated; the selected findings focus on early, surface-only, or clearly malformed variants.