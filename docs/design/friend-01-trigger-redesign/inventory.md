# friend-01 narrative trigger 전수 매트릭스 (재설계 진입 전 스냅샷)

> 작성일: 2026-05-27
> 권위 base HEAD: `70a114f2`
> 참조 source:
> - [src/data/coreCases/friend-01.narrative.ts](../../../src/data/coreCases/friend-01.narrative.ts) (1002 lines, 15 NarrativeTrigger var)
> - [src/data/coreCases/friend-01.case.ts](../../../src/data/coreCases/friend-01.case.ts) (3031 lines, narrative trigger 인라인 정의 없음 — 모두 var 참조)
> - [src/hooks/useActionDispatch.ts](../../../src/hooks/useActionDispatch.ts) (friend-01 분기 = witness testimony import + freeInterrogation fallback 만, **Hybrid hook 자체 없음**)

본 문서는 **현재 시점 trigger 전수 스냅샷**이다. 재설계 진입 전 현재 상태 정리 산출물. 회귀·문제는 [issues.md](./issues.md) 별도 분리.

friend-01 = 친구 사이 명예훼손 + 다층 가족·사기 사건. 송다은(a, premature_summary) vs 최수민(b, affect_flattening). 사건 영역 정책 = [[design-friend01-truth-disclosure-policy]] (5 keyword × dispute 5 chain disclosure tier) + [[feedback-judge-dispassionate-action-focused]] (재판관 어법 — Cycle 7 도입).

---

## Part 1: entity inventory

총 15 entity 가 `narrativeTriggers` 부착. d-1 / d-2 / e-1 / e-2 / e-3 = narrative trigger 미부착 (초기 surface / baseEvidenceIds).

| ID | 게임 내 명칭 (label / surfaceName) | hidden | proves / linkedDisputes | requires | requiredLieState | candidate 개수 |
|----|----|----|----|----|----|----|
| **disputes (5 chain)** ||||||| 
| d-1 | 「9일간의 연락 의도」 | false | — | — | — | **0** |
| d-2 | 「예비신랑의 선 넘는 접근」 | false | — | — | — | **0** |
| d-3 | 「아버지의 돈 접근 패턴」 | **true** | — | — | — | 4 |
| d-4 | 「과거 손절과 아버지의 사기」 (legitimacyIssue) | **true** | — | — | — | 4 |
| d-5 | 「단톡방 매도와 명예훼손」 | **true** | — | — | — | 4 |
| **evidence (7개)** ||||||| 
| e-1 | 「예비신랑 연락 기록」 (surface 명) | — | d-1 | [] | — | **0** (baseEvidenceIds) |
| e-2 | 「공통 대화방 캡처」 (surface 명) | — | d-5 | [] | — | **0** (baseEvidenceIds) |
| e-3 | 「예전 관계가 끊기기 전 대화」 (surface 명) | — | d-4 | [] | S1 | **0** |
| e-4 | 「예비신랑 메시지와 답장」 (surface 명) | — | d-2 | [e-1] | — | 4 |
| e-5 | 「떠벌림 흔적과 9일간 메시지」 (surface 명) | — | d-3 | [e-1] | S2 | 4 |
| e-6 | 「과거 송금 기록과 문자」 (surface 명) | — | d-4 | [e-3] | S2 | 4 |
| e-7 | 「두 시점 대조표」 (surface 명) | — | d-5 + d-1 (cross) | [e-4, e-5, e-6] | S3 | 4 |
| **witnesses (3명)** ||||||| 
| w-1 | 김세라 (pro_a, strategic) | — | d-5 / unlockedByDossier=[dc-1] | — | — | 4 |
| w-2 | 박준혁 (neutral, accurate) | — | d-2 + d-3 / unlockedByDossier=[dc-2, dc-3] | — | — | **6** (dc-2 영역 4 + dc-3 확장 2) |
| w-3 | 오미경 (pro_b, accurate) | — | d-4 / unlockedByDossier=[dc-4] | — | — | 4 |
| **dossier (5개)** ||||||| 
| dc-1 | 「단톡방 글의 근거」 | — | linkedDisputes=[d-5], linkedParty=a, linkedEvidence=[e-1, e-2] | — | — | 4 |
| dc-2 | 「먼저 넘은 선」 (cross-line) | — | linkedDisputes=[d-1, d-2], linkedParty=b, linkedEvidence=[e-1, e-4] | — | — | 4 |
| dc-3 | 「같은 부탁」 | — | linkedDisputes=[d-3], linkedParty=b, linkedEvidence=[e-5, e-6] / successEffects unlock_dispute d-4 | — | — | 4 |
| dc-4 | 「손절의 이유」 | — | linkedDisputes=[d-4], linkedParty=b, linkedEvidence=[e-3, e-6] / successEffects unlock_dispute d-5 | — | — | 4 |
| dc-5 | 「낙인의 순서」 (cross-line) | — | linkedDisputes=[d-1, d-5], linkedParty=a, linkedEvidence=[e-2, e-7] | — | — | 4 |

총 trigger candidate = 14 × 4 + 1 × 6 = **62 candidate**.

---

## Part 2: 사건 line 별 cascade chain 시각화

각 chain 은 `cascade_from_card` priorCard 연결 그래프. dispute 의 `truthStages.S*.successUnlocks` + dossier `successEffects.unlock_dispute` 도 함께 표시.

### Chain A: Line A — 단톡방 매도 frame (d-5 + d-1 cross)

```
e-1 (예비신랑 연락 기록, baseEvidenceIds, narrative trigger 0)
e-2 (공통 대화방 캡처, baseEvidenceIds, narrative trigger 0)
  ↓ combine-1 (e-1 + e-2 → dc-1)
dc-1 (단톡방 글의 근거)
  ↓ requirePriorCardFired: dc-1
  ├─→ w-1 (김세라)
  ├─→ dc-2 (먼저 넘은 선, cross-line)
  └─→ e-4 (예비신랑 메시지와 답장) — cascade priorCard dc-1
별도 진입: combine-8 (stmt-a-accusation + e-2 → dc-1) — w-1 narrative trigger 가 사용
```

### Chain B: Line B — 예비신랑 선 넘기 frame (d-2)

```
dc-1 (Chain A 진입 후)
  ↓ requirePriorCardFired: dc-1 + d-1 S0+
e-4 (예비신랑 메시지와 답장)
  ↓ combine-2 (e-1 + e-4 → dc-2)
dc-2 (먼저 넘은 선)
  ↓ requirePriorCardFired: dc-2
w-2 (박준혁) — dc-2 영역 4 candidate
  ↓
d-2 truthStages.S3 successUnlocks: [dc-2, d-2 — 즉 d-2 자체 진입] / S4 successUnlocks: [d-3]
```

### Chain C: Line C — 아버지 돈 접근 패턴 frame (d-3 + d-4 hidden)

```
d-2 S4 도달 → d-3 unlock (hidden dispute 등장)
  ↓ requirePriorCardFired: d-2 + d-2 S3+ (e-5 narrative trigger)
e-5 (떠벌림 흔적과 9일간 메시지) — proves d-3
  ↓ combine-3 (e-5 + e-6 → dc-3, requires d-2 S3) + requirePriorCardFired: e-5 + d-3 S0+ (dc-3 narrative trigger)
dc-3 (같은 부탁) — successEffects unlock_dispute d-4 + judgeHint w-3 활성
  ↓ requirePriorCardFired: dc-3 + d-2 S3+ (d-3 narrative trigger)
d-3 (아버지의 돈 접근 패턴, hidden dispute 본격 발현)
  ↓ requirePriorCardFired: d-3 + d-3 S3+ (e-6 narrative trigger)
e-6 (과거 송금 기록과 문자) — proves d-4 / requires e-3 / requiredLieState S2
  ↓ combine-4 (e-3 + e-6 → dc-4, requires d-3 S2) + requirePriorCardFired: e-6 + d-4 S0+ (dc-4 narrative trigger)
dc-4 (손절의 이유) — successEffects unlock_dispute d-5 + judgeHint w-3 활성
  ↓ requirePriorCardFired: dc-4 + d-3 S3+ (d-4 narrative trigger)
d-4 (과거 손절과 아버지의 사기, hidden dispute legitimacyIssue 발현)
  ↓ requirePriorCardFired: dc-4 (w-3 narrative trigger)
w-3 (오미경)

별도 진입: w-2 dc-3 영역 확장 2 candidate (priorCard dc-3 cascade + combine-3)
```

### Chain D: Line D — 매도/명예훼손 종합 (d-5 hidden)

```
dc-4 successEffects unlock_dispute d-5 (hidden dispute 등장)
  ↓ requirePriorCardFired: d-4 + d-4 S3+ (e-7 cascade-d4)
  ↓ requirePriorCardFired: w-3 + d-4 S3+ (e-7 cascade-w3)
e-7 (두 시점 대조표) — proves d-5 + d-1 / requires [e-4, e-5, e-6] / requiredLieState S3
  ↓ requirePriorCardFired: e-7 + d-4 S3+ (d-5 narrative trigger)
d-5 (단톡방 매도와 명예훼손 — d-5 본격 추궁 발현)
  ↓ requirePriorCardFired: d-5 (dc-5 narrative trigger)
  ↓ combine-7 (e-2 + e-7 → dc-5, requires d-5 S2)
dc-5 (낙인의 순서) — 최종 단서

별도 진입: d-5-via-cascade-dc4 (priorCard dc-4 + d-3 S3+ + d-4 S3+) — d-5 가 dc-4 cascade 로도 surface
별도 진입: combine-6 (e-3 + e-7 → dc-5, requires d-4 S3) — **narrative trigger 미사용** (Issue 후보)
```

### Chain E: dispute successUnlocks 직접 연결

dispute `truthStages.S*.successUnlocks` 영역에 자동 unlock 정의:

| dispute | stage | successUnlocks |
|---|---|---|
| d-1 | S1 | (없음) |
| d-1 | S2 | [e-4] |
| d-1 | S3 | [dc-1] |
| d-1 | S4 | [dc-2, d-2] |
| d-1 | S5 | (없음) |
| d-2 | S2 | (없음) |
| d-2 | S3 | (없음) |
| d-2 | S4 | [dc-2] |
| d-2 | S5 | [d-3] |
| d-3 | S2 | (없음) |
| d-3 | S3 | [dc-3] |
| d-3 | S4 | [d-4] |
| d-4 | S2 | (없음) |
| d-4 | S3 | [dc-4] |
| d-4 | S4 | [d-5] |
| d-5 | S2 | (없음) |
| d-5 | S3 | [dc-1] (재진입) |
| d-5 | S4 | [dc-5] |

dispute lieAdvance 시 직접 unlock 도 발생. 즉 narrative trigger 없이도 evidence/dossier/dispute 가 표면화 가능.

---

## Part 3: entity 별 trigger candidate 전수 매트릭스

### Line A — d-5 + d-1 cross (dc-1 / e-2 / w-1)

#### dc-1 「단톡방 글의 근거」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc1-via-combo | combination_result (combine-1: e-1+e-2) | `d-1 S0+` | 4 refs (judge-query / a-response / b-react / judge-decree) | standard |
| dc1-via-npc-b-interject | npc_interjection (source: b) | `d-1 S0+` + `contextAction: question.fact_pursuit.a` | 3 refs | standard |
| dc1-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-1 S1+` | 3 refs | emphasis |
| dc1-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### w-1 「김세라」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w1-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` (dispute 없음) | 3 refs | standard |
| w1-via-combo | combination_result (combine-8: stmt-a + e-2) | `d-5 S0+` | 3 refs | standard |
| w1-via-npc-b-context | npc_interjection (source: b) | `d-1 S1+` + `contextAction: question.fact_pursuit.b` | 3 refs | standard |
| w1-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 4 refs | standard |

---

### Line B — d-2 (dc-2 / e-4 / w-2 dc-2 영역)

#### dc-2 「먼저 넘은 선」 (cross-line: d-1+d-2) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc2-via-combo | combination_result (combine-2: e-1+e-4) | `d-2 S0+` | 4 refs | standard |
| dc2-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S0+` | 3 refs | standard |
| dc2-via-npc-b-interject | npc_interjection (source: b) | `d-2 S0+` + `contextAction: question.fact_pursuit.a` | 3 refs | standard |
| dc2-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### e-4 「예비신랑 메시지와 답장」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e4-via-combo | combination_result (combine-2: e-1+e-4) | `d-2 S0+` | 3 refs | standard |
| e4-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S0+` | 3 refs | standard |
| e4-via-outburst-b | emotional_outburst (source: b) | `partyPhase.b: [shaken, angry]` + `d-2 S0+` | 3 refs | emphasis |
| e4-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### w-2 「박준혁」 dc-2 영역 — 4 candidate (전체 6 중 4)

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w2-via-cascade | cascade_from_card | `requirePriorCardFired: dc-2` (dispute 없음) | 3 refs | standard |
| w2-via-combo | combination_result (combine-2: e-1+e-4) | `d-2 S0+` | 3 refs | standard |
| w2-via-npc-b-interject | npc_interjection (source: b) | `d-2 S0+` + `contextAction: question.fact_pursuit.a` | 4 refs | standard |
| w2-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

---

### Line C — d-3 + d-4 hidden (e-5 / dc-3 / d-3 / e-6 / dc-4 / d-4 / w-3 / w-2 dc-3 확장)

#### e-5 「떠벌림 흔적과 9일간 메시지」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e5-via-cascade | cascade_from_card | **`requirePriorCardFired: d-2` (dispute)** + `d-2 S3+` | 3 refs | standard |
| e5-via-npc-b-interject | npc_interjection (source: b) | `d-2 S2+` + `contextAction: question.fact_pursuit.a` | 3 refs | standard |
| e5-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-2 S2+` | 3 refs | emphasis |
| e5-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### dc-3 「같은 부탁」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc3-via-combo | combination_result (combine-3: e-5+e-6, requires d-2 S3) | `d-3 S0+` | 4 refs | standard |
| dc3-via-cascade | cascade_from_card | `requirePriorCardFired: e-5` + `d-3 S0+` | 3 refs | standard |
| dc3-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken]` only + `d-3 S0+` | 3 refs | emphasis |
| dc3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### d-3 「아버지의 돈 접근 패턴」 (hidden) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-3` + `d-2 S3+` | 3 refs | standard |
| d3-via-combo | combination_result (combine-3: e-5+e-6) | `d-2 S3+` | 3 refs | standard |
| d3-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-2 S3+` | 3 refs | emphasis |
| d3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### e-6 「과거 송금 기록과 문자」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e6-via-cascade | cascade_from_card | `requirePriorCardFired: d-3` + `d-3 S3+` | 3 refs | standard |
| e6-via-npc-b-interject | npc_interjection (source: b) | `d-3 S2+` + `contextAction: question.fact_pursuit.a` | 3 refs | standard |
| e6-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-3 S2+` | 3 refs | emphasis |
| e6-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### dc-4 「손절의 이유」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc4-via-combo | combination_result (combine-4: e-3+e-6, requires d-3 S2) | `d-4 S0+` | 4 refs | standard |
| dc4-via-cascade | cascade_from_card | `requirePriorCardFired: e-6` + `d-4 S0+` | 3 refs | standard |
| dc4-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-4 S0+` | 3 refs | emphasis |
| dc4-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### d-4 「과거 손절과 아버지의 사기」 (hidden, legitimacyIssue) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d4-via-cascade | cascade_from_card | `requirePriorCardFired: dc-4` + `d-3 S3+` | 3 refs | emphasis |
| d4-via-combo | combination_result (combine-4: e-3+e-6) | `d-3 S3+` | 3 refs | emphasis |
| d4-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken, angry]` + `d-3 S3+` | 3 refs | emphasis |
| d4-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### w-3 「오미경」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-4` (dispute 없음) | 3 refs | standard |
| w3-via-combo | combination_result (combine-4: e-3+e-6) | `d-4 S0+` | 3 refs | standard |
| w3-via-npc-b-context | npc_interjection (source: b) | `d-4 S1+` (**`contextAction` 없음**) | 3 refs | standard |
| w3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### w-2 「박준혁」 dc-3 영역 확장 — 2 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w2-via-cascade-dc3 | cascade_from_card | `requirePriorCardFired: dc-3` (dispute 없음) | 3 refs | standard |
| w2-via-combo-dc3 | combination_result (combine-3: e-5+e-6) | `d-3 S0+` | 3 refs | standard |

---

### Line D — d-5 hidden 종합 (e-7 / d-5 / dc-5)

#### e-7 「두 시점 대조표」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e7-via-cascade-d4 | cascade_from_card | `requirePriorCardFired: d-4` + `d-4 S3+` | 3 refs | emphasis |
| e7-via-cascade-w3 | cascade_from_card | `requirePriorCardFired: w-3` + `d-4 S3+` | 3 refs | emphasis |
| e7-via-outburst-b | emotional_outburst (source: b) | `partyPhase.b: [shaken]` only + `d-4 S3+` | 3 refs | emphasis |
| e7-via-fallback | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### d-5 「단톡방 매도와 명예훼손」 (hidden) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d5-via-cascade-e7 | cascade_from_card | `requirePriorCardFired: e-7` + `d-4 S3+` | 3 refs | emphasis |
| d5-via-cascade-dc4 | cascade_from_card | `requirePriorCardFired: dc-4` + `d-3 S3+` + `d-4 S3+` | 3 refs | emphasis |
| d5-via-npc-a | npc_interjection (source: a) | `partyPhase.a: [shaken, defensive]` + `d-3 S3+` + `d-4 S3+` | 3 refs | emphasis |
| d5-via-fallback | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

#### dc-5 「낙인의 순서」 (cross-line: d-1+d-5) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc5-via-cascade-d5 | cascade_from_card | `requirePriorCardFired: d-5` (dispute 없음) | 3 refs | emphasis |
| dc5-via-combo | combination_result (combine-7: e-2+e-7) | `d-5 S0+` | 3 refs | emphasis |
| dc5-via-outburst-a | emotional_outburst (source: a) | `partyPhase.a: [shaken]` only + `d-5 S2+` | 3 refs | emphasis |
| dc5-via-fallback | judge_auto_mention | `turnsAfterEligible: 5` | 3 refs | standard |

---

## Part 4: Hybrid hook 영역

friend-01 = **Hybrid hook 자체 없음**. `useActionDispatch.ts` 의 friend-01 분기는 다음 두 영역만:

- line 1435~1436 — witnessTestimonyData/friend-01 import
- line 1728~1768 — premature_summary / affect_flattening fallback 답변 (KO/EN/JA/ZH-CN)

즉 spouse-01 의 C-2 / C-3c 같은 evidence stage-gate cascade hook 자체가 friend-01 에는 없음. schema precondition + dispute successUnlocks 으로 충분.

cascade priorCard 가 dispute 인 영역 (e-5-via-cascade priorCard=d-2) = schema-level 표현. Hybrid hook 영역 외.

---

## Part 5: trigger type 분포

| type | 개수 | 비고 |
|---|---|---|
| cascade_from_card | 17 | priorCard chain 의존. 가장 큰 type. 단 1개 (`e5-via-cascade`) 가 priorCard = dispute(d-2) — 의문 영역. |
| combination_result | 12 | recipeId 의존. combine-1/2/3/4/7/8 사용. **combine-5/6/9/10 narrative trigger 미사용** (Issue 후보). |
| npc_interjection | 8 | 6개 = contextAction `question.fact_pursuit.{a or b}` 명시. 2개 (`w-3-npc-b-context` + `d-5-via-npc-a`) contextAction 자체 없음. |
| emotional_outburst | 10 | partyPhase 정밀. 단 `[shaken]` only 3개 vs `[shaken, angry]` 6개 vs `[shaken, defensive]` 1개 차등. |
| judge_auto_mention | 15 | 모든 entity 1개씩. **turnsAfterEligible: 5 일관**. dispute 게이트 추가 X (priorCard 전제만). |

총: 17 + 12 + 8 + 10 + 15 = **62 candidate** ✓

### combination recipe 사용/미사용 매트릭스

| recipe | inputs | outputId | requiredTruthStage | narrative trigger 사용 |
|---|---|---|---|---|
| combine-1 | e-1 + e-2 | dc-1 | — | dc1-via-combo (d-1 S0+) |
| combine-2 | e-1 + e-4 | dc-2 | — | dc2-via-combo / e4-via-combo / w2-via-combo (모두 d-2 S0+) |
| combine-3 | e-5 + e-6 | dc-3 | d-2 ≥ 3 | dc3-via-combo (d-3 S0+) / d3-via-combo (d-2 S3+) / w2-via-combo-dc3 (d-3 S0+) |
| combine-4 | e-3 + e-6 | dc-4 | d-3 ≥ 2 | dc4-via-combo (d-4 S0+) / d4-via-combo (d-3 S3+) / w3-via-combo (d-4 S0+) |
| combine-5 | e-4 + e-7 | dc-1 | d-2 ≥ 3 | **(미사용 — Issue 후보)** |
| combine-6 | e-3 + e-7 | dc-5 | d-4 ≥ 3 | **(미사용 — Issue 후보)** |
| combine-7 | e-2 + e-7 | dc-5 | d-5 ≥ 2 | dc5-via-combo (d-5 S0+) |
| combine-8 | stmt-a-accusation + e-2 | dc-1 | — | w1-via-combo (d-5 S0+) |
| combine-9 | stmt-b-silence + e-4 | dc-2 | — | **(미사용 — Issue 후보)** |
| combine-10 | stmt-b-silence + e-5 | dc-3 | d-3 ≥ 1 | **(미사용 — Issue 후보)** |

---

## Part 6: 사건 흐름 ↔ trigger 정합성 (재설계 검토 포인트)

friend-01 사건 흐름 (timeline 6 stage 권위):

```
stage 0 (약 5년 전): 송다은 아버지가 최수민에게 투자 명목으로 돈 빌리고 일부만 갚음 → B 피해. B 가 A 에게 말하지 못함.
stage 1 (약 4-5년 전): B "돈 문제는 내가 알아서 정리할게" 후 손절. A 는 변심 단정. 연락 끊김.
stage 2 (약 2년간): 연락 두절. A 가 김태윤과 약혼.
stage 3 (결혼 약 3주 전): A 아버지가 예비신랑 김태윤에게 결혼 자금 부탁 문자 시작. 같은 시기 B 가 흐름 알아챔.
stage 4 (결혼 약 3주 전 ~ 9일간): B → 예비신랑 전화 6회 + 문자 11건 경고 시도. A 에게 직접 말 X.
stage 5 (단톡방 사건): A 가 "수민이가 또 내 남자한테 연락한다" 단톡방 글. 김세라(w-1) 동조. B 침묵.
```

진실 노출 정책 (5 keyword 그룹별 disclosure tier — [[design-friend01-truth-disclosure-policy]]):

| 그룹 | keyword | unlock tier |
|---|---|---|
| 1 | 예비신랑이 먼저 / 선 넘는 메시지 / 거절 | d-2 S3 이상 (사전 S0~S2 봉인) |
| 2 | 아버지 사기 / 돈 갈취 / 미상환 | d-3 S3 이상 또는 d-4 S3 이상 |
| 3 | B 경고 의도 / 같은 패턴 반복 | d-1 S3 또는 d-3 S3 |
| 4 | 과거 손절 = A 아버지 원인 / B 차마 못 말함 | d-4 S3 이상 (동기 영역 — false positive 영역) |
| 5 | 확인 없이 매도 / 명예훼손 / 반복 침묵 | d-5 S5 이상 |

재설계 시 검토 포인트:

- **Chain A → Chain B → Chain C 연결** = 단톡방 frame (Chain A) 으로 시작 → 예비신랑 선 넘기 reframe (Chain B) → 아버지 돈 접근 패턴 (Chain C). 진실 노출 정책상 Chain C 진입 (e-5 + dc-3) 은 d-2 S3 이상 (예비신랑 선 넘기 인정) 도달 후만 자연. **현재 schema 정합** (e5-via-cascade `d-2 S3+` + combine-3 `d-2 S3` gate).
- **e-7 cross-line proves** = e-7 proves [d-5, d-1]. 단 e-7 narrative trigger 는 d-4 line 만 전제 (d-4 S3+). d-1 cross-line 진입 시점 narrative trigger 없음. 의도 = "e-7 이 등장하면 d-4 와 d-5 동시 surface 가능하니 충분"인가? 검토 영역.
- **dc-2 cross-line linkedDisputes=['d-1','d-2']** = d-1 frame 진입 (dc1-via-cascade `d-1 S0+`) 만 narrative trigger 부착. d-2 line 진입 시점 narrative trigger 없음. **현재 narrative trigger = dc-1 cascade 만** — d-2 진입 시 dc-2 가 다시 narrative event 발행하지 않음 (이미 fire). 단 cross-line 의도가 narrative 발화에 반영되는지 검토 영역.
- **dc-5 cross-line linkedDisputes=['d-1','d-5']** = d-5 cascade-d5 만 narrative trigger 부착. d-1 line 진입 시점 narrative trigger 없음. dc-2 와 같은 패턴.
- **dispute priorCard cascade** = e-5-via-cascade priorCard `d-2` (dispute). 다른 priorCard 는 모두 evidence/dossier/witness. schema-level 표현 정합성 검토.
- **Hybrid hook 부재** = friend-01 에는 spouse-01 의 stage-gate hook 영역 없음. schema 만으로 충분한지, 또는 hook 필요 영역 있는지 검토 영역 (현재 시점 명시 회귀 없음).

inventory 종료. 회귀·문제는 [issues.md](./issues.md) 참조.
