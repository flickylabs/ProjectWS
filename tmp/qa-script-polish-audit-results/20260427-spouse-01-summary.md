# spouse-01 Script Polish Audit Summary

Date: 2026-04-27

## Scope / Guardrails
- Scope: read/report only. No edits to `src/data/scriptedText/*`, `src/data/caseData/*`, policy docs, or `src/app/pc.css`.
- `git pull` skipped because it can mutate the worktree; tracked diff was checked separately.
- Primary audit target: `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`.
- Context docs read: `docs/spot-check-format.md`, `docs/disclosure-policy.md`, `docs/information-surface-policy.md`, `CLAUDE.md`.
- Requested `memory/...` files were not present in this worktree (`rg --files` returned no matches).
- Phase 1/2 dialogue files were not audited because the restored request scoped the audit target to ScriptedText and these three ScriptedText files have no phase1/phase2 channels.

## Audit Coverage
- Static candidate pass: all 4,677 variants in `src/data/scriptedText/spouse-01.json` were flattened for empty/short response, system-message length, mechanical Korean, and policy lexeme candidates.
- Manual route sample: 86 high-frequency route keys across interrogation, evidence_present, dossier, witness, contradiction, judge_* channels, mediation, and aftermath.
- Raw truth-lexeme candidates before manual filtering: 168.
- Empty/null response scan: 0 exact empty / standalone `...` variants found.
- System message length scan: 0 entries over 60 chars found.

## Finding Summary
- Selected actionable findings: 9
- Severity counts: {"P0":6,"P1":1,"P2":2}

| id | severity | category | phase/action | variantId | quote |
|---|---:|---|---|---|---|
| SPA-SP-001 | P0 | D1 / 누설 | 3/5 / fact_pursuit | b-d-2-S2-fact-pursuit-v7 | 재판관님, 가족을 돕는 일이 급했습니다. 그 사실 하나만으로 결론을 내리면 곤란합니다. |
| SPA-SP-002 | P0 | D2 / 누설 | 4 / evidence_present | b-e-4-early-self-v1 | 형한테 온 문자 맞습니다. |
| SPA-SP-003 | P1 | D2 / 누설 | 4 / evidence_present | b-e-5-early-self-v1 | 비자금에서 뺀 건 맞습니다. |
| SPA-SP-004 | P0 | D2 / 누설 | 4 / evidence_present | a-e-1-early-stage2-v1 | 머리끈과 손거울, 학용품이 함께 있었습니다. 그 맥락이 제 의심을 더 세게 만들었습니다. |
| SPA-SP-005 | P0 | 정책 위반 / 누설 | 3/5 / motive_search | judgeq-d-1-motive_search-2-v1 | 이준호 씨, 장소를 숨긴 것보다 형 이야기를 꺼내는 일이 더 두려웠던 이유를 들려주시겠습니까. |
| SPA-SP-006 | P0 | 정책 위반 / 누설 | 4 / evidence_combine | judgecombo-dc-2-b-q1-hard-v1 | 이준호 씨, 통화기록과 발신자 미상 문자가 가족 사정을 직접 가리키고 있습니다. 가족 안의 갈등을 이유로 무엇을 숨겼는지 지금 답하십시오. |
| SPA-SP-007 | P2 | C1 / C2 | 4 / evidence_present | b-e-4-mid-stage2-v1 | 번호를 저장하지 않은 이유은 가족 쪽 사정이 커질까 봐 때문입니다. 다만 더 자세한 건 조심스럽습니다. |
| SPA-SP-008 | P2 | C2 | 4 / evidence_present | b-e-5-late-stage2-v4 | 반복된 이유가 이제 분명합니다. 형의 개인회생 사정 때문입니다, 제가 그걸 숨겼습니다. |
| SPA-SP-009 | P0 | 정책 위반 / C1 | 3/5 / contradiction_pursuit | judgec-d-1-hard-v1 | 이준호 씨, 오피스텔에 있던 사람이 그 가족라는 사실을 더 늦출 수 없습니다. 그 자리에 누가 있었는지 지금 답하십시오. |

## Detailed Findings
### SPA-SP-001
- caseId: spouse-01
- phase: 3/5
- action: fact_pursuit
- target: 이준호
- disputeOrEvidence: {"disputeId":"d-2","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 재판관님, 가족을 돕는 일이 급했습니다. 그 사실 하나만으로 결론을 내리면 곤란합니다.
- why: S2 NPC 본 발화가 `가족을 돕는` 동기를 직접 말합니다. disclosure-policy의 spouse S0~S2 금지 우회 lexeme과 정확히 겹칩니다.
- expected: S2에서는 가족 지원 동기를 특정하지 말고 “급한 사정”, “말하기 어려운 일” 수준으로 유지해야 합니다.
- severity: P0
- category: D1 / 누설
- patternHint: /가족을 돕는 일이 급/ in NPC S0-S2
- variantId: b-d-2-S2-fact-pursuit-v7
- relatedVariantIds: b-d-2-S2-motive-search-v7

### SPA-SP-002
- caseId: spouse-01
- phase: 4
- action: evidence_present
- target: 이준호
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-4","investigationStage":"early","meterState":"N/A"}
- quote: 형한테 온 문자 맞습니다.
- why: e-4의 surfaceName은 `발신자 미상 문자`인데 early 증거 반응에서 `형`을 직접 확정합니다. evidence unlock/truth throttle보다 빠릅니다.
- expected: early 반응은 발신자 관계를 확정하지 않고 “제가 받은 문자”, “설명하기 어려운 문자” 정도로 남겨야 합니다.
- severity: P0
- category: D2 / 누설
- patternHint: /형한테 온 문자|제 형에게 온 문자/ with e-4 before late confession
- variantId: b-e-4-early-self-v1

### SPA-SP-003
- caseId: spouse-01
- phase: 4
- action: evidence_present
- target: 이준호
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-5","investigationStage":"early","meterState":"N/A"}
- quote: 비자금에서 뺀 건 맞습니다.
- why: `비자금`은 spouse policy의 paraphrase 우회 lexeme입니다. e-5 surface는 개인 계좌 출금 내역인데 early에서 숨긴 자금 성격을 확정합니다.
- expected: early에서는 “개인 계좌에서 나온 돈” 정도로만 말하고 숨긴 목적/성격은 mid-late로 넘겨야 합니다.
- severity: P1
- category: D2 / 누설
- patternHint: /비자금/ in early evidence_present
- variantId: b-e-5-early-self-v1

### SPA-SP-004
- caseId: spouse-01
- phase: 4
- action: evidence_present
- target: 박지연
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-1","investigationStage":"early/stage2","meterState":"N/A"}
- quote: 머리끈과 손거울, 학용품이 함께 있었습니다. 그 맥락이 제 의심을 더 세게 만들었습니다.
- why: `학용품`은 e-1의 description 진실어로 정책상 surface-only/early 채널에서 금지된 lexeme입니다.
- expected: 품목은 “생활용품 말고 다른 물건”처럼 surface로 추상화해야 합니다.
- severity: P0
- category: D2 / 누설
- patternHint: /학용품/ with e-1 before player-discovered deep context
- variantId: a-e-1-early-stage2-v1

### SPA-SP-005
- caseId: spouse-01
- phase: 3/5
- action: motive_search
- target: 이준호
- disputeOrEvidence: {"disputeId":"d-1","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 이준호 씨, 장소를 숨긴 것보다 형 이야기를 꺼내는 일이 더 두려웠던 이유를 들려주시겠습니까.
- why: 재판관 질문 채널은 항상 surface-only인데 `형`을 직접 질문합니다. 플레이어보다 재판관이 진실어를 먼저 말합니다.
- expected: 재판관 질문은 “장소를 숨긴 이유”, “집안 쪽 사정”처럼 추상화해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /형 이야기를|형을 도운|형에게/ in judge_question
- variantId: judgeq-d-1-motive_search-2-v1

### SPA-SP-006
- caseId: spouse-01
- phase: 4
- action: evidence_combine
- target: 이준호
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-3+e-4","investigationStage":"N/A","meterState":"N/A"}
- quote: 이준호 씨, 통화기록과 발신자 미상 문자가 가족 사정을 직접 가리키고 있습니다. 가족 안의 갈등을 이유로 무엇을 숨겼는지 지금 답하십시오.
- why: judge_evidence_combo는 surface-only 채널인데 `가족 사정`, `가족 안의 갈등`으로 숨긴 진실을 재판관이 확정합니다.
- expected: 증거 조합 안내는 “같은 시점의 반복 연락과 장소가 연결된다” 정도의 표면 연결만 말해야 합니다.
- severity: P0
- category: 정책 위반 / 누설
- patternHint: /가족 사정|가족 안의 갈등/ in judge_evidence_combo
- variantId: judgecombo-dc-2-b-q1-hard-v1

### SPA-SP-007
- caseId: spouse-01
- phase: 4
- action: evidence_present
- target: 이준호
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-4","investigationStage":"mid/stage2","meterState":"N/A"}
- quote: 번호를 저장하지 않은 이유은 가족 쪽 사정이 커질까 봐 때문입니다. 다만 더 자세한 건 조심스럽습니다.
- why: `이유은` 조사 오류가 있고 “이유은 ... 때문입니다” 구조도 중복입니다.
- expected: 조사와 문장 구조를 자연스럽게 정리해야 합니다.
- severity: P2
- category: C1 / C2
- patternHint: /이유은/
- variantId: b-e-4-mid-stage2-v1

### SPA-SP-008
- caseId: spouse-01
- phase: 4
- action: evidence_present
- target: 이준호
- disputeOrEvidence: {"disputeId":"N/A","evidenceId":"e-5","investigationStage":"late/stage2","meterState":"N/A"}
- quote: 반복된 이유가 이제 분명합니다. 형의 개인회생 사정 때문입니다, 제가 그걸 숨겼습니다.
- why: 쉼표로 두 문장을 억지 연결해 번역체처럼 읽힙니다. 같은 구조가 e-4 late에도 반복됩니다.
- expected: 원인과 책임 인정 문장을 분리해 자연체로 정리해야 합니다.
- severity: P2
- category: C2
- patternHint: /때문입니다, 제가/
- variantId: b-e-5-late-stage2-v4
- relatedVariantIds: b-e-4-late-stage2-v4

### SPA-SP-009
- caseId: spouse-01
- phase: 3/5
- action: contradiction_pursuit
- target: 이준호
- disputeOrEvidence: {"disputeId":"d-1","evidenceId":"N/A","investigationStage":"N/A","meterState":"N/A"}
- quote: 이준호 씨, 오피스텔에 있던 사람이 그 가족라는 사실을 더 늦출 수 없습니다. 그 자리에 누가 있었는지 지금 답하십시오.
- why: 재판관 모순 추궁에서 `그 가족`을 사실로 확정하고, 동시에 `가족라는` 조사 오류가 있습니다.
- expected: surface-only 질문으로 유지하고 조사 오류를 제거해야 합니다.
- severity: P0
- category: 정책 위반 / C1
- patternHint: /그 가족라는|오피스텔에 있던 사람이 그 가족/
- variantId: judgec-d-1-hard-v1

## Notes
- This is a report-only artifact. No source data was modified.
- Some late/confession truth lexeme hits were intentionally not promoted when the channel/lieBand appeared gated; the selected findings focus on early, surface-only, or clearly malformed variants.