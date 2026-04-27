# Script Polish Audit Overall Summary

Date: 2026-04-27

## Scope / Guardrails
- Scope: read/report only. No edits to `src/data/scriptedText/*`, `src/data/caseData/*`, policy docs, or `src/app/pc.css`.
- `git pull` skipped because it can mutate the worktree; tracked diff was checked separately.
- Primary audit target: `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`.
- Context docs read: `docs/spot-check-format.md`, `docs/disclosure-policy.md`, `docs/information-surface-policy.md`, `CLAUDE.md`.
- Requested `memory/...` files were not present in this worktree (`rg --files` returned no matches).
- Phase 1/2 dialogue files were not audited because the restored request scoped the audit target to ScriptedText and these three ScriptedText files have no phase1/phase2 channels.

## Current Repo State Observed
- HEAD observed before audit: `6ed551a docs(handoff): UI Drawer Consistency Fix (P1 UI polish follow-up)`.
- `git status --short --branch` showed tracked clean plus pre-existing untracked files (`17212`, `39568`, `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`, `tmp/qa-release-results/`).
- No source patches were applied.

## Coverage
| caseId | total variants scanned | manual route sample | raw truth candidates | selected findings |
|---|---:|---:|---:|---:|
| spouse-01 | 4677 | 86 | 168 | 9 |
| family-01 | 5172 | 78 | 49 | 9 |
| friend-01 | 5082 | 74 | 25 | 7 |

## Severity Totals
- {"P0":14,"P1":7,"P2":4}

## Category Totals
- {"D1":3,"누설":19,"D2":8,"정책 위반":9,"C1":4,"C2":4,"fallback":1,"P1":1}

## Priority Read
- P0 concentration is highest in surface-only judge channels and early/gated evidence responses.
- spouse-01 has the broadest raw candidate surface because `형/조카/가족` appears in judge_question, judge_contradiction, judge_evidence_combo, dossier, and early evidence_present.
- family-01 risk clusters around `출생`, `공장 자금`, `배다른`, and `유서 손댄/바꾼` variants.
- friend-01 risk clusters around `거절한 사실`, `선을 넘는 메시지/말`, and `예비신랑에게 돈 이야기를 꺼낸` variants.

## Findings
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
| SPA-FA-001 | P1 | D1 / 누설 | 3/5 / fact_pursuit | b-d-2-S0-fact-pursuit-v1 | 유서를 손댄 적 없습니다. |
| SPA-FA-002 | P0 | D1 / 누설 | 3/5 / empathy_approach | b-d-5-S2-empathy-approach-v2 | 배다른 동생 주제에 생색낸다는 말은 듣기 싫었지만, 형이 쓰러지는 건 더 싫었습니다. |
| SPA-FA-003 | P1 | D2 / 누설 | 4 / evidence_present | a-e-4-early-stage3-v4 | 저는 자기 몫을 줄이는 방향으로 손댄 정황에서 제 동생 책임이 드러난다고 봅니다. |
| SPA-FA-004 | P0 | 정책 위반 / 누설 | 3/5 / fact_pursuit | judgeq-d-4-fact-pursuit-3-v4 | 두 분, 출생에 관한 사실과 상속 비율을 분리해 말씀해 주십시오. |
| SPA-FA-005 | P0 | 정책 위반 / 누설 | 3/5 / contradiction_pursuit | judgec-d-4-hard-v1 | 윤정후 씨, 윤태성 씨의 출생에 관한 사실을 알고도 법정까지 숨겼습니다. 보호라는 말로 끝낼 수 없습니다. |
| SPA-FA-006 | P0 | 정책 위반 / 누설 | 4 / evidence_combine | judgeec-dc-3-b-q1-mid-v1 | 원본 유서와 송금 내역을 붙이면 윤정후 씨가 오랫동안 생활비와 공장 자금을 떠받친 흐름이 이어집니다. 왜 처음부터 말하지 않았습니까. |
| SPA-FA-007 | P0 | 정책 위반 / 누설 | 4 / witness_summon | judgew-w-3-hard-v1 | 박순애 씨, 들어오십시오. 어머니가 말한 송금과 공장 자금의 출처를 바로 확인하겠습니다. |
| SPA-FA-008 | P2 | C1 | 3/5 / empathy_approach | b-d-5-S4-empathy-approach-v4 | 이제 와서 보면 저는 지키려는 마음과 오만을 구분하지 못했습니다. |
| SPA-FA-009 | P1 | D2 / 누설 | 4 / evidence_present | a-e-7-early-restore_context-v6 | 유서를 바꾼 진짜 이유라는 말을 듣는 순간부터 제 지난 삶이 흔들립니다. |
| SPA-FR-001 | P0 | D2 / 누설 | 4 / evidence_investigate | discover-b-e-4-capture-v1 | 지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 봤다고 하셨는데, 그 시점에 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까. |
| SPA-FR-002 | P0 | 정책 위반 / C1 | 4 / evidence_combine | judgecombo-dc-2.b.q1-soft-v3 | 전화와 문자 기록 뒤에 예비신랑의 먼저 보낸 말이 놓여 있습니다. 최수민 씨, 거절한 사실을 왜 숨겼습니까. |
| SPA-FR-003 | P0 | 정책 위반 / 누설 | 3/5 / motive_search | judgeq-d-2-motive_search-4-v4 | 최수민 씨, 거절한 사실보다 숨긴 사실이 커진 이유를 말씀해 주십시오. |
| SPA-FR-004 | P1 | D2 / 누설 | 4 / evidence_present | b-e-5-early-stage1-v3 | 가족 쪽에서 예비신랑에게 돈 이야기를 꺼낸 흐름입니다. 제가 관련된 기록인 건 맞습니다. 그래도 한 번에 단정하긴 어렵습니다. |
| SPA-FR-005 | P1 | D2 / 누설 | 4 / evidence_present | b-e-4-mid-stage1-v9 | 원본을 보면 선을 넘은 말이 어디서 나왔는지 보입니다. 부분적으로는 제가 만든 오해입니다. 하지만 이유가 있었습니다. |
| SPA-FR-006 | P2 | fallback / C2 | 4 / evidence_present | a-e-7-early-both-v1 | 문구가... 같습니다. |
| SPA-FR-007 | P1 | P1 / C2 / 누설 | 4 / evidence_combine | judgecombo-dc-2.b.q1-mid-v2 | 연락 기록과 예비신랑 메시지를 함께 보면, 대화의 선후가 먼저 사적인 말을 보낸 기록이 있습니다. 최수민 씨, 거절한 사람인데도 숨긴 이유를 답하십시오. |

## Verification
- `npm run check:all` PASS on 2026-04-27.
- Reported result: 0 hard issues, 157 warnings in policy cross-check; existing warning profile was not modified by this report-only audit.
## Non-findings From Scan
- No exact empty text, standalone `...`, or 1-2 char variants were found.
- No `system_message` variant exceeded the information-surface 60-char two-line ceiling in a raw char count scan.
- No internal terms from the policy list (`intent`, `classifier`, `LLM`, `guard`, `policy`, `누설`) were selected as ScriptedText findings in this pass.