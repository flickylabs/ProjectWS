# friend-01 Script Polish Audit Summary

Date: 2026-04-27

## Scope / Guardrails
- Scope: read/report only. No edits to `src/data/scriptedText/*`, `src/data/caseData/*`, policy docs, or `src/app/pc.css`.
- `git pull` skipped because it can mutate the worktree; tracked diff was checked separately.
- Primary audit target: `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`.
- Context docs read: `docs/spot-check-format.md`, `docs/disclosure-policy.md`, `docs/information-surface-policy.md`, `CLAUDE.md`.
- Requested `memory/...` files were not present in this worktree (`rg --files` returned no matches).
- Phase 1/2 dialogue files were not audited because the restored request scoped the audit target to ScriptedText and these three ScriptedText files have no phase1/phase2 channels.

## Audit Coverage
- Static candidate pass: all 5,082 variants in `src/data/scriptedText/friend-01.json` were flattened for empty/short response, system-message length, mechanical Korean, and policy lexeme candidates.
- Manual route sample: 74 high-frequency route keys across interrogation, evidence_present, dossier, witness, contradiction, judge_* channels, mediation, and aftermath.
- Raw truth-lexeme candidates before manual filtering: 25.
- Empty/null response scan: 0 exact empty / standalone `...` variants found.
- System message length scan: 0 entries over 60 chars found.

## Finding Summary
- Selected actionable findings: 7
- Severity counts: {"P0":3,"P1":3,"P2":1}

| id | severity | category | phase/action | variantId | quote |
|---|---:|---|---|---|---|
| SPA-FR-001 | P0 | D2 / 누설 | 4 / evidence_investigate | discover-b-e-4-capture-v1 | 지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 봤다고 하셨는데, 그 시점에 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까. |
| SPA-FR-002 | P0 | 정책 위반 / C1 | 4 / evidence_combine | judgecombo-dc-2.b.q1-soft-v3 | 전화와 문자 기록 뒤에 예비신랑의 먼저 보낸 말이 놓여 있습니다. 최수민 씨, 거절한 사실을 왜 숨겼습니까. |
| SPA-FR-003 | P0 | 정책 위반 / 누설 | 3/5 / motive_search | judgeq-d-2-motive_search-4-v4 | 최수민 씨, 거절한 사실보다 숨긴 사실이 커진 이유를 말씀해 주십시오. |
| SPA-FR-004 | P1 | D2 / 누설 | 4 / evidence_present | b-e-5-early-stage1-v3 | 가족 쪽에서 예비신랑에게 돈 이야기를 꺼낸 흐름입니다. 제가 관련된 기록인 건 맞습니다. 그래도 한 번에 단정하긴 어렵습니다. |
| SPA-FR-005 | P1 | D2 / 누설 | 4 / evidence_present | b-e-4-mid-stage1-v9 | 원본을 보면 선을 넘은 말이 어디서 나왔는지 보입니다. 부분적으로는 제가 만든 오해입니다. 하지만 이유가 있었습니다. |
| SPA-FR-006 | P2 | fallback / C2 | 4 / evidence_present | a-e-7-early-both-v1 | 문구가... 같습니다. |
| SPA-FR-007 | P1 | P1 / C2 / 누설 | 4 / evidence_combine | judgecombo-dc-2.b.q1-mid-v2 | 연락 기록과 예비신랑 메시지를 함께 보면, 대화의 선후가 먼저 사적인 말을 보낸 기록이 있습니다. 최수민 씨, 거절한 사람인데도 숨긴 이유를 답하십시오. |

## Detailed Findings
### SPA-FR-001
- caseId: friend-01
- phase: 4
- action: evidence_investigate
- target: 최수민
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-4","investigationStage":"capture","meterState":"N/A"}
- quote: 지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 봤다고 하셨는데, 그 시점에 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까.
- why: evidence_discovery 채널이 `먼저 선을 넘는 메시지`를 established fact처럼 말합니다. policy에서 friend evidence_discovery 누설 우회로 지목한 구조입니다.
- expected: 조사 질문은 “먼저 문제 되는 메시지를 봤다는 취지”처럼 확정 강도를 낮춰야 합니다.
- severity: P0
- category: D2 / 누설
- patternHint: /먼저 선을 넘는 메시지/ in evidence_discovery
- variantId: discover-b-e-4-capture-v1

### SPA-FR-002
- caseId: friend-01
- phase: 4
- action: evidence_combine
- target: 최수민
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-1+e-4","investigationStage":"N/A","meterState":"N/A"}
- quote: 전화와 문자 기록 뒤에 예비신랑의 먼저 보낸 말이 놓여 있습니다. 최수민 씨, 거절한 사실을 왜 숨겼습니까.
- why: judge_evidence_combo에서 `거절한 사실`을 직접 말하고, `예비신랑의 먼저 보낸 말`은 어순도 어색합니다.
- expected: 재판관 조합 안내는 선후관계만 묻고 `거절` 확정은 NPC/증거 단계에 맡겨야 합니다. 어순도 자연화해야 합니다.
- severity: P0
- category: 정책 위반 / C1
- patternHint: /거절한 사실|의 먼저 보낸 말/ in judge_evidence_combo
- variantId: judgecombo-dc-2.b.q1-soft-v3

### SPA-FR-003
- caseId: friend-01
- phase: 3/5
- action: motive_search
- target: 최수민
- disputeOrEvidence: {"disputeId":"d-2","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 최수민 씨, 거절한 사실보다 숨긴 사실이 커진 이유를 말씀해 주십시오.
- why: judge_question 채널에서 `거절한 사실`을 확정합니다. friend policy는 이 표현을 judge channel 한정 우회 lexeme으로 봅니다.
- expected: “상대의 접근에 선을 그었다는 취지”처럼 표면화하거나, 선후를 질문하되 결론은 말하지 않아야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /거절한 사실/ in judge_question
- variantId: judgeq-d-2-motive_search-4-v4

### SPA-FR-004
- caseId: friend-01
- phase: 4
- action: evidence_present
- target: 최수민
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-5","investigationStage":"early/stage1","meterState":"N/A"}
- quote: 가족 쪽에서 예비신랑에게 돈 이야기를 꺼낸 흐름입니다. 제가 관련된 기록인 건 맞습니다. 그래도 한 번에 단정하긴 어렵습니다.
- why: early evidence response가 `예비신랑에게 돈 이야기를 꺼낸` 구조를 직접 드러냅니다. friend paraphrase 우회 lexeme과 겹칩니다.
- expected: early에서는 “가족 쪽 부탁이 있었다” 수준으로 두고 예비신랑/돈 접근 구체화는 뒤로 미뤄야 합니다.
- severity: P1
- category: D2 / 누설
- patternHint: /예비신랑에게 돈 이야기를 꺼낸/ in early evidence_present
- variantId: b-e-5-early-stage1-v3

### SPA-FR-005
- caseId: friend-01
- phase: 4
- action: evidence_present
- target: 최수민
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-4","investigationStage":"mid/stage1","meterState":"N/A"}
- quote: 원본을 보면 선을 넘은 말이 어디서 나왔는지 보입니다. 부분적으로는 제가 만든 오해입니다. 하지만 이유가 있었습니다.
- why: `선을 넘은 말`은 friend 금지 우회 lexeme입니다. mid/stage1에서 메시지 성격을 확정해 버립니다.
- expected: “문제 되는 말”, “사적인 말”처럼 표면화하고 확정은 late/deep로 넘겨야 합니다.
- severity: P1
- category: D2 / 누설
- patternHint: /선을 넘은 말|선을 넘는 메시지/ before late confession
- variantId: b-e-4-mid-stage1-v9

### SPA-FR-006
- caseId: friend-01
- phase: 4
- action: evidence_present
- target: 송다은
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-7","investigationStage":"early","meterState":"N/A"}
- quote: 문구가... 같습니다.
- why: 실제 반응이 지나치게 짧고 `...`에 의존합니다. 충격 반응으로는 가능하지만 evidence_present 응답으로는 정보량이 부족해 fallback처럼 보입니다.
- expected: 같아 보인다는 반응 뒤에 무엇을 아직 인정하지 못하는지 한 문장 정도 보강해야 합니다.
- severity: P2
- category: fallback / C2
- patternHint: /^문구가... 같습니다.$/
- variantId: a-e-7-early-both-v1

### SPA-FR-007
- caseId: friend-01
- phase: 4
- action: evidence_combine
- target: 최수민
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-1+e-4","investigationStage":"N/A","meterState":"N/A"}
- quote: 연락 기록과 예비신랑 메시지를 함께 보면, 대화의 선후가 먼저 사적인 말을 보낸 기록이 있습니다. 최수민 씨, 거절한 사람인데도 숨긴 이유를 답하십시오.
- why: `대화의 선후가 먼저 사적인 말을 보낸 기록`은 주어-서술 관계가 무너져 읽기 어렵고, 동시에 `거절한 사람`을 재판관이 확정합니다.
- expected: 선후관계를 자연스럽게 풀고, 거절 여부는 surface-only 질문 밖으로 빼야 합니다.
- severity: P1
- category: P1 / C2 / 누설
- patternHint: /대화의 선후가 먼저|거절한 사람/
- variantId: judgecombo-dc-2.b.q1-mid-v2

## Notes
- This is a report-only artifact. No source data was modified.
- Some late/confession truth lexeme hits were intentionally not promoted when the channel/lieBand appeared gated; the selected findings focus on early, surface-only, or clearly malformed variants.