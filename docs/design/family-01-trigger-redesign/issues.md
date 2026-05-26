# family-01 trigger 회귀·문제·의문 매트릭스 (재설계 진입 전)

> 작성일: 2026-05-27
> 매트릭스 본체: [inventory.md](./inventory.md)
> 참조 spouse-01 패턴: [docs/design/spouse-01-trigger-redesign/issues.md](../spouse-01-trigger-redesign/issues.md) (Issue 8건 결정 권위)

본 문서는 inventory에서 식별된 **회귀·부적절 발동·누락·의문**을 정리한다. 재설계 협의 시 사용자 결정 사안.

---

## Issue 1: broad 패턴 — `dc1-via-a-interject` / `w1-via-b-interject` / `w2-via-b-interject` (contextAction 자체 없음)

### 증상

다음 4 candidate 가 **contextAction 자체 없이** dispute lieState + (partyDistrust 또는 partyPhase) 만으로 발동된다. spouse-01 의 `e5-via-a-interjection` (contextAction 없음, 폐기 결정) 동일 패턴.

| candidate | precondition | broad 위험 |
|---|---|---|
| `dc1-via-a-interject` (「말년의 종이」) | **OR 배열**: `[{ d-1 S1+ }]` OR `[{ distrust.a≥50 }]` (contextAction **없음**) | ⚠️ d-1 S1+ 도달 후 player 의 모든 행동에서 발동 가능. 외도 line 시작 후 빈도 폭증 위험. |
| `w1-via-b-interject` (「최복순」) | `d-1 S2+` (contextAction + partyPhase 모두 **없음**) | ⚠️ d-1 S2+ 도달 후 어떤 행동이든 발동 가능. partyPhase 없으니 B 의 모든 phase 에서 가능. |
| `w2-via-b-interject` (「김영수」) | `d-2 S2+` (contextAction + partyPhase 모두 **없음**) | ⚠️ d-2 S2+ 도달 후 모든 행동 발동. |
| `d2-via-a-interject` (「공증 절차의 개입」) | **OR 배열**: `[{ d-1 S2+ }]` OR `[{ distrust.a≥50 + d-1 S1+ }]` (contextAction **없음**) | ⚠️ d-1 S2+ 도달 후 모든 행동 발동. d-2 cascade 자연 흐름 (dc-1 → d-2 cascade priorCard) 과 경쟁. |

### root cause 분석

spouse-01 Issue 1+2 동일 패턴 — broad precondition 으로 narrative 의도와 무관한 행동 시 발동. spouse-01 에서는 **5 broad candidate 일괄 폐기** 결정.

### 영향

- player 인지: "이 행동에서 갑자기 NPC 가 끼어드는 이유가 부자연" (intended cascade chain 무력화)
- cascade chain 자연 흐름 (dc-1 → w-1 / dc-1 → d-2 / dc-2 → w-2) 보다 빈도 우선 → narrative 의도 흐릿
- spouse-01 회귀 (영수증 stage 1 → e-4 부적절 발동) 와 유사 위험

### 결정 옵션

- **안 A**: 4 candidate 모두 폐기 (spouse-01 Issue 1+2 = 모두 폐기 선택)
- **안 B**: 정밀화 — 각 candidate 에 contextAction 추가 또는 partyPhase 정밀 추가
- **안 C**: 일부만 폐기 + 일부 유지 (정밀화 + 유지 혼합)

---

## Issue 2: 유사 broad 패턴 — `d3-via-a-interject` / `d5-via-a-interject` (precondition partyPhase 또는 distrust 추가 — 약간 정밀)

### 증상

다음 2 candidate 는 contextAction 없지만 partyPhase 또는 partyDistrust 가 추가되어 Issue 1 보다 약간 정밀. 단 여전히 contextAction 없음.

| candidate | precondition | broad 위험 |
|---|---|---|
| `d3-via-a-interject` (「오래된 지원의 출처」) | **OR 배열**: `[{ d-2 S3+ + partyPhase.a: defensive/shaken }]` OR `[{ d-2 S3+ + distrust.a≥40 }]` | ⚠️ d-2 S3+ 도달 + A 의 특정 phase 또는 distrust ≥40 — 비교적 좁은 영역. 단 contextAction 없음. |
| `d5-via-a-interject` (「어머니의 숨겨진 마음」) | **OR 배열**: `[{ d-4 S3+ + partyPhase.a: defensive/shaken }]` OR `[{ d-4 S3+ + distrust.a≥30 }]` | ⚠️ d-4 S3+ 도달 + A 의 특정 phase 또는 distrust ≥30 — Issue 1 보다 정밀. d-5 cascade 자연 흐름 (dc-4 → d-5 / e-7 → d-5) 과 경쟁. |

### 결정 옵션

- **안 A**: 두 candidate 모두 폐기
- **안 B**: 유지 — partyPhase + distrust 가 추가되어 broad 위험 낮음
- **안 C**: contextAction 추가하여 정밀화 (예: `question.fact_pursuit.a.d-2` 등)

> 참고: spouse-01 의 `dc3-via-a-interject` 는 `evidence_present.b` 가 있어도 broad 위험 (어떤 evidence 든) 으로 폐기 결정. 본 candidate 들은 contextAction 자체 없지만 partyPhase 또는 distrust 추가로 약간 정밀.

---

## Issue 3: dc-3 narrativeTriggers 미부착 (d-3 통합 event 정합)

### 증상

`dc-3 (20년의 돈)` 은 `narrativeTriggers = []` (미부착). 다른 모든 dossier (dc-1/dc-2/dc-4/dc-5) 는 narrative wrapper 부착.

### root cause

사용자 사전 결정 (2026-05-24 Cycle 6) — "d-3 + dc-3 두 layer 내용 동일 → narrative event 통합". d-3 trigger fire 시:
1. d-3 narrative entry text 에 dc-3 등록 announcement 포함 (scriptedRefs ID = `emerge-d3-dc3-via-*`)
2. `src/engine/narrativeIntegration.ts` 의 `FORCE_UNLOCK_DOSSIER_ON_DISPUTE_FIRE['d-3']: 'dc-3'` generic 매핑이 d-3 fire 시 dc-3 force-unlock 동기

즉 dc-3 의 자체 narrative wrapper 가 없어도 d-3 wrapper 가 dc-3 surface 까지 동시 담당.

### 정합 검토 (사용자 결정)

- **옵션 A**: 현재 유지 — d-3 통합 event 패턴 권위 (cycle 6 사전 결정)
- **옵션 B**: dc-3 별도 wrapper 부착 — narrativeIntegration 의 force-unlock 정책 폐기. 별도 narrative event 두 번 (d-3 + dc-3 각자) 발화

> 참고: spouse-01 Issue 5/6 (chain frame 충돌 / path 이중성) 사용자 결정 = "현재 유지". 본 영역도 사용자 결정 권위 유지 가능성 높음. 단 정합 명시 필요.

---

## Issue 4: e-1/e-2/e-4/e-6 + d-1 wrapper 미부착 (spouse-01 동일 패턴)

### 증상

`evidence` 첫 등장 시점에 narrative wrapper 가 없음:

| entity | 첫 등장 메커니즘 | narrative wrapper |
|---|---|---|
| 「60:40 유서 사본」(e-1) | d-1.S0 requiredEvidence (초기 보유) | **없음** |
| 「요양원 방문기록」(e-2) | d-1.S1 requiredEvidence | **없음** |
| 「공증인 메모 기록」(e-4) | d-2 requiredEvidence | **없음** |
| 「오래된 계좌 흐름」(e-6) | d-3 requiredEvidence | **없음** |
| 「어머니 자필 유언장 연습본」(e-5) | dc-4 cascade / combo / interject | 4 candidate |
| 「어머니 일기장」(e-7) | d-4 cascade / interject | 4 candidate |
| 「유서 작성과 판단 능력」(d-1) | v3Visibility='initial' (시작점) | **없음** |

### 의문

initial / requiredEvidence 영역 evidence 는 player 가 직접 탐색하는 영역이라 narrative wrapper 불필요한가? spouse-01 Issue 4 (e-1/e-2/e-3 미부착) 동일 패턴.

### 결정 옵션 (spouse-01 동일)

- **안 A**: 초기 보유 / requiredEvidence 영역 — wrapper 불필요 유지 (player 직접 탐색) — spouse-01 결정
- **안 B**: 초기 보유이지만 wrapper 부착 (탐색 trigger surface 강화)
- **안 C**: 진입 시 narrative event 신설

> 참고: spouse-01 결정 = 안 A (현재 유지).

---

## Issue 5: judge_auto fallback turnsAfterEligible 차등 정책

### 증상

모든 wrapper entity 의 `*-via-judge-auto` turnsAfterEligible 분포:

| entity 그룹 | turnsAfterEligible | dispute 명시 | 비고 |
|---|---|---|---|
| 「말년의 종이」(dc-1) | 8 | 없음 | dossier |
| 「최복순」(w-1) | 5 | 없음 | witness |
| 「공증 절차의 개입」(d-2) | 7 | 없음 | dispute |
| 「수정된 유언장」(dc-2) | 6 | 없음 | dossier |
| 「김영수」(w-2) | 5 | 없음 | witness |
| 「오래된 지원의 출처」(d-3) | 8 | 없음 | dispute (통합 event) |
| 「박순애」(w-3) | 5 | 없음 | witness |
| 「가족 기록과 침묵의 이유」(d-4) | 8 | 없음 | dispute |
| 「오래된 노트 사본」(e-7) | 6 | 없음 | evidence |
| 「감춘 이유」(dc-4) | 6 | 없음 | dossier |
| 「어머니의 숨겨진 마음」(d-5) | 8 | 없음 | dispute |
| 「자필 메모 사본」(e-5) | 6 | 없음 | evidence |
| 「어머니의 뜻」(dc-5) | 6 | 없음 | dossier |

### 패턴 정리

- witness 일관 = 5턴 (가장 빠름)
- evidence 일관 = 6턴
- dossier = 6 (cycle 5+7) 또는 8 (cycle 5 dc-1)
- dispute = 7 (cycle 5 d-2) 또는 8 (cycle 6/7 d-3/d-4/d-5)

### 의문

- dc-1 = 8 / dc-2 = 6 / dc-4 = 6 / dc-5 = 6 — dc-1 만 8 차등. 이유?
- d-2 = 7 / d-3 = 8 / d-4 = 8 / d-5 = 8 — d-2 만 7 차등. 이유?
- 모든 candidate 에 dispute 명시 없음 (priorCard 만) — spouse-01 (일부 dispute 명시) 와 다른 정책

### 결정 옵션

- **안 A**: 현재 차등 유지 (cycle 별 사용자 결정 권위)
- **안 B**: 정책 일관성 정리 (dispute=7, dossier=6, witness=5, evidence=6 통일)
- **안 C**: dispute=8 통일 / dossier=6 통일 / witness=5 통일 / evidence=6 통일 (dc-1=8 + d-2=7 만 차등 → 통일)

---

## Issue 6: e-7 b-interject + b-outburst 두 candidate type 분기 정합

### 증상

「어머니 일기장」(e-7) candidate 중 B source 발화가 두 가지:

| candidate | type | precondition partyPhase |
|---|---|---|
| `e7-via-b-interject` | npc_interjection | `[defensive, resigned]` |
| `e7-via-b-outburst` | emotional_outburst | `[shaken]` |

### 분기 기준 의문

- `npc_interjection` = NPC 가 추궁 도중 끼어드는 선제 발화 — emotional 압박 X
- `emotional_outburst` = 감정 폭발 — shaken / angry / resigned 필수

`partyPhase: [defensive, resigned]` 영역에서 npc_interjection (defensive 는 OK 이지만 resigned 는 보통 outburst 영역). 분기 명확화 필요.

### spouse-01 동일 패턴

spouse-01 Issue 3 = `e9-via-b-submit` (`npc_interjection`, partyPhase: [defensive, shaken]) 정합 의문 → 폐기 + 신설 (`e9-via-b-outburst`, partyPhase: [shaken, angry, resigned]) 결정.

### 결정 옵션

- **안 A**: 현재 유지 — 두 candidate 모두 의도 정합 (defensive = interject / shaken = outburst)
- **안 B**: e7-via-b-interject 의 partyPhase 정리 — `resigned` 제거 (defensive 만 남김)
- **안 C**: e7-via-b-outburst 의 partyPhase 확장 — `[defensive, shaken, resigned]` 통합 + interject 폐기

---

## Issue 7: dc-4 multi-recipe 두 candidate 정합 (combo-4 + combo-7)

### 증상

「감춘 이유」(dc-4) 의 combo candidate 가 두 개:

| candidate | recipeId | combine 입력 |
|---|---|---|
| `dc4-via-combo-4` | combine-4 | e-6 + e-7 |
| `dc4-via-combo-7` | combine-7 | e-5 + e-7 |

두 candidate 모두 동일 scriptedRefs 공유 (`emerge-dc4-via-combo-judge-decree-v1` / `emerge-dc4-via-combo-b-respond-v1`).

### 의도

사용자 결정 (Cycle 7 사전) — dc-4 가 두 recipe (오래된 계좌 흐름 + 어머니 일기장 / 자필 연습본 + 어머니 일기장) 양쪽에서 도달 가능. 같은 dossier 등장이라 같은 ScriptedText 발화.

### 의문

- 두 candidate 가 같은 scriptedRefs 인 점 = ScriptedText 영역 입장에서 ref 가 두 recipe response 양쪽 처리. 의도 명확.
- 단 inventory / 검증 시점에서는 "같은 ref 두 번 등록" 으로 보일 수 있음.

### 결정 옵션

- **안 A**: 현재 유지 (사용자 사전 결정 권위)
- **안 B**: 두 candidate 통합 — 한 candidate 가 두 recipeId 처리 (schema 가 array recipeId 지원 시)
- **안 C**: 분리 유지 + scriptedRefs 분리 (각자 별도 발화 frame)

> 참고: schema `combination_result` type 의 `recipeId` 가 단일 string 인지 array 인지 확인 필요. array 미지원 시 안 A 또는 안 C 만 가능.

---

## Issue 8: d-5 cascade 두 candidate 정합 (dc-4 메인 + e-7 차선)

### 증상

「어머니의 숨겨진 마음」(d-5) 의 cascade candidate 가 두 개:

| candidate | priorCard | 의도 |
|---|---|---|
| `d5-via-cascade-dc4` | dc-4 | 메인 — 「감춘 이유」 등장 후 d-5 cascade (사건 흐름 자연) |
| `d5-via-cascade-e7` | e-7 | 차선 — 「어머니 일기장」 등장 후 d-5 cascade (e-7 의 d-5 proves 영역) |

각자 별도 scriptedRefs (`emerge-d5-via-cascade-*-v1` / `emerge-d5-via-cascade-e7-*-v1`).

### 의도

사용자 결정 (Cycle 7 사전) — 두 priorCard 경로 모두 d-5 cascade 가능. e-7 의 `proves: ['d-4', 'd-5']` 영역에서 d-5 cascade 자연. dc-4 영역에서 d-5 cascade 자연 (dc-4 → d-5 핵심 chain).

### 정합 검토

본 영역은 의도 명확. 단 d-5 가 두 cascade candidate 동시 fire 가능성? (e-7 등장 + dc-4 등장 둘 다 발생 시 두 발화 발생 가능)

### 결정 옵션

- **안 A**: 현재 유지 (사용자 사전 결정 권위)
- **안 B**: 한 candidate 만 유지 (메인 dc-4 또는 차선 e-7 중 하나)
- **안 C**: 두 candidate 의 우선순위 명시 (메인 dc-4 fire 시 e-7 candidate skip — priority 영역 schema 또는 hook 추가)

---

## Issue 9: w-3 cross-cycle unlockedByDossier 정합 (dc-3 + dc-5)

### 증상

「박순애」(w-3) `unlockedByDossier: ['dc-3', 'dc-5']` — Cycle 6 단서 (dc-3) + Cycle 7 최종 종합 단서 (dc-5) 두 경로 unlock.

### 의도

사용자 결정 (Cycle 6 / 7 사전) — 박순애 (어머니의 오랜 지인) 는 dc-3 (20년의 돈) 등장 시 1차 unlock (b 측 돈 흐름 증언) + dc-5 (어머니의 뜻) 등장 시 추가 unlock 경로 (양측 책임축 종합 증언). 같은 증인이지만 두 cycle 모두 등장 자연.

### 정합 검토

w-3 narrative wrapper candidate 는 `requirePriorCardFired: dc-3` (Cycle 6 분기) 만 — dc-5 분기 별도 candidate 없음. unlockedByDossier 가 dc-5 추가로 있지만 narrative trigger 는 dc-3 만 정의.

### 결정 옵션

- **안 A**: 현재 유지 — unlockedByDossier 는 mechanical unlock 양쪽 / narrative trigger 는 dc-3 분기만 (Cycle 6 발화 frame)
- **안 B**: w-3 narrative candidate 신설 — dc-5 분기용 cascade candidate 추가 (Cycle 7 발화 frame, "마지막 종합 단서 등장 후 박순애 추가 증언")
- **안 C**: unlockedByDossier 에서 dc-5 제거 — w-3 는 dc-3 unlock 만 유지

> 참고: spouse-01 Issue 8 (dc-2 cross-line cascade 추가) = candidate 추가 결정. family-01 도 cross-cycle 영역 candidate 추가 가능.

---

## Issue 10: dc-5 a-outburst 단독 정합 (장남 당연시 reframe)

### 증상

「어머니의 뜻」(dc-5) candidate 중 emotional_outburst 가 **A source 만** (B 측 outburst candidate 없음):

| candidate | type | source | partyPhase |
|---|---|---|---|
| `dc5-via-a-outburst` | emotional_outburst | a | `[shaken, resigned]` |

### 의도

사용자 결정 (Cycle 7 사전) — dc-5 = 양측 책임축 종합. A 측 "장남 당연시 frame 책임 인식 첫 진입" outburst 단독 — 「장남이라 당연하다고 여긴 마음」 인정. B 측 outburst 는 d-4 / d-5 에서 이미 충분히 다룸.

### 정합 검토

- spouse-01 / Cycle 1~6 패턴 (b 측 outburst 위주) 과 다른 결정. dc-5 = 양측 책임축 종합 단서라 A 측 책임 인식 명시 의도 자연.
- 단 inventory 통일성 관점에서는 b-outburst candidate 추가 검토 가능 (양측 모두 책임축 outburst).

### 결정 옵션

- **안 A**: 현재 유지 (사용자 사전 결정 권위 — A 측 책임 인식 단독)
- **안 B**: b-outburst candidate 추가 — 양측 책임축 outburst (B 측 "어머니 뜻 위에 내 판단을 얹은" 재인정)
- **안 C**: a-outburst 폐기 — 다른 type (a-interject 또는 a-cascade) 으로 재구성

---

## 종합 — 재설계 결정 사안

본 thread 재설계 시 사용자 결정 필요:

1. **Issue 1 — broad 패턴 (4 candidate 폐기 / 정밀화 / 일부만)** — spouse-01 결정 권위 = 폐기 가능성 높음
2. **Issue 2 — 유사 broad (d-3/d-5 a-interject 폐기 / 유지 / 정밀화)** — partyPhase 또는 distrust 추가로 약간 정밀
3. **Issue 3 — dc-3 narrativeTriggers 미부착 정합 (유지 / 별도 wrapper 부착)** — 사용자 사전 결정 권위 = 유지 가능성 높음
4. **Issue 4 — e-1/e-2/e-4/e-6 + d-1 wrapper 미부착 (유지 / wrapper 부착)** — spouse-01 결정 권위 = 유지 가능성
5. **Issue 5 — judge_auto turnsAfterEligible 차등 (현재 유지 / 정책 일관성 정리)**
6. **Issue 6 — e-7 b-interject + b-outburst 분기 정합 (유지 / partyPhase 정리 / 통합)**
7. **Issue 7 — dc-4 multi-recipe 두 candidate 정합 (유지 / 통합 / scriptedRefs 분리)**
8. **Issue 8 — d-5 cascade 두 candidate 정합 (유지 / 단일 / 우선순위 명시)**
9. **Issue 9 — w-3 cross-cycle unlockedByDossier 정합 (현재 유지 / dc-5 분기 candidate 추가 / unlockedByDossier 정리)**
10. **Issue 10 — dc-5 a-outburst 단독 정합 (유지 / b-outburst 추가 / 다른 type 으로 재구성)**

추가:
- **사건 흐름 정합** — Cycle 5 (절차/판단) → Cycle 6 (20년 돈) → Cycle 7 (비밀+최종) chain 자연성. dc-2 → d-3 cascade (Cycle 5 → 6 진입) + dc-3 → d-4 cascade (Cycle 6 → 7 진입) frame 검토.
- **재설계: schema 적용 vs 추가 Hybrid hook** — 현재 family-01 영역 useActionDispatch.ts hook 없음. spouse-01 패턴 (C-2 / C-3c hook) 같은 stage gate hook 부착 필요 영역 있는지 검토.
