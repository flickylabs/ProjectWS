# family-01 narrative trigger 전수 매트릭스 (재설계 진입 전 스냅샷)

> 작성일: 2026-05-27
> 권위 base HEAD: `70a114f2`
> 참조 source: [src/data/coreCases/family-01.narrative.ts](../../../src/data/coreCases/family-01.narrative.ts) (806 line, 13 NarrativeTriggers var) / [src/data/coreCases/family-01.case.ts](../../../src/data/coreCases/family-01.case.ts) (~3021 line) / [src/engine/narrativeIntegration.ts](../../../src/engine/narrativeIntegration.ts) (d-3 → dc-3 force-unlock generic 매핑)

본 문서는 **현재 시점 trigger 전수 스냅샷**이다. 재설계 진입 전 "현재 상태 정리" 산출물. 회귀·문제는 [issues.md](./issues.md) 별도 분리.

---

## Part 1: entity inventory

총 13 entity 가 `narrativeTriggers` 부착. d-1 (initial dispute) / e-1 (60:40 유서 사본) / e-2 (요양원 방문기록) / e-4 (공증인 메모 기록) / e-6 (오래된 계좌 흐름) / dc-3 (20년의 돈) 은 narrative trigger 미부착. e-3 (전 요양보호사 음성증언) 은 2026-05-26 폴리싱에서 **폐기** (w-1 와 동일 인물 중복 영역).

| ID | 게임 내 명칭 (surface) | proves / link | requires | requiredLieState | candidate 개수 | 비고 |
|----|----|----|----|----|----|----|
| **Cycle 5 — 절차/판단 line** ||||||| 
| d-1 | 유서 작성과 판단 능력 (initial dispute) | — | — | — | **0** | v3Visibility='initial' (시작점). progressionStages 로 dc-1/d-2 unlock |
| dc-1 | 말년의 종이 | d-1 link | — | — | 4 | combo-1 / a-interject / b-outburst / judge-auto |
| w-1 | 최복순 (전 요양보호사) | d-1 증언 | unlockedByDossier: ['dc-1'] | — | 3 | cascade / b-interject / judge-auto |
| d-2 | 공증 절차의 개입 (hidden) | — | — | — | 4 | cascade / a-interject / b-outburst / judge-auto |
| dc-2 | 수정된 유언장 | d-2 link | — | — | 4 | combo-5 / cascade / b-outburst / judge-auto |
| w-2 | 김영수 | d-2 증언 | unlockedByDossier: ['dc-2'] | — | 3 | cascade / b-interject / judge-auto |
| e-1 | 분배 비율이 적힌 서류 사본 (60:40 유서 사본) | d-1 + d-2 | — | — | **0** | d-1.S0 requiredEvidence (초기 보유) |
| e-2 | 시설 방문 기록 (요양원 방문기록) | d-1 | — | — | **0** | d-1.S1 requiredEvidence |
| ~~e-3~~ | ~~전 요양보호사 음성증언~~ | — | — | — | **폐기** | 2026-05-26. w-1 testimony.byDispute['d-1'] 로 단일화 |
| e-4 | 인증 절차 메모 (공증인 메모 기록) | d-2 | — | — | **0** | d-2.requiredEvidence |
| **Cycle 6 — 20년 돈 line** ||||||| 
| d-3 | 오래된 지원의 출처 (hidden) | — | — | — | 5 | cascade / combo-6 / a-interject / b-outburst / judge-auto. **scriptedRefs ID 가 `emerge-d3-dc3-via-*` — dc-3 통합 event** |
| dc-3 | 20년의 돈 | d-3 link | — | — | **0** | **d-3 통합 event**. narrativeIntegration 의 force-unlock generic 매핑 (`d-3 → dc-3`) 으로 d-3 fire 시 동시 surface |
| w-3 | 박순애 (어머니의 오랜 지인) | d-3 증언 | unlockedByDossier: **['dc-3', 'dc-5']** (cross-cycle) | — | 3 | cascade / b-interject / judge-auto |
| e-6 | 오래된 송금 내역 묶음 (오래된 계좌 흐름) | d-3 | — | — | **0** | d-3.requiredEvidence |
| **Cycle 7 — 비밀+최종 line** ||||||| 
| d-4 | 가족 기록과 침묵의 이유 (hidden) | — | — | — | 5 | cascade / combo-4 / b-interject / a-outburst / judge-auto |
| e-7 | 오래된 노트 사본 (lockedName: 어머니 일기장) | d-4 + d-5 | — | **S2** | 4 | cascade / b-interject / b-outburst / judge-auto. **민감 정보 봉인 (친부 실명 영구 봉인)** |
| dc-4 | 감춘 이유 | d-4 link | — | — | 5 | cascade / **combo-4 + combo-7 multi-recipe 두 candidate** (동일 scriptedRefs 공유) / b-outburst / judge-auto |
| d-5 | 어머니의 숨겨진 마음 (hidden) | — | — | — | 5 | **cascade 두 candidate (dc-4 메인 + e-7 차선)** / a-interject / b-outburst / judge-auto |
| e-5 | 자필 메모 사본 (lockedName: 어머니 자필 유언장 연습본) | d-5 | requires: ['e-7'] | **S5** | 4 | cascade / combo-2 / b-interject / judge-auto. **자필 90:10 정확 수치 영구 봉인 까지 단계** |
| dc-5 | 어머니의 뜻 (최종 종합 단서) | d-5 link | — | — | 4 | cascade / combo-2 / a-outburst / judge-auto. **A 측 책임축 reframe (장남 당연시) outburst 단독** |

---

## Part 2: 사건 line 별 cascade chain 시각화

각 chain 은 `cascade_from_card` priorCard 연결 그래프. `→` = priorCard 의존성. `⇒` = 통합 event (d-3 fire 시 dc-3 동기 force-unlock).

### Chain A: Cycle 5 절차/판단 line (d-1 진입)

```
d-1 (유서 작성과 판단 능력, initial)
  ├─ progressionStages.S2.successUnlocks: ['dc-1']
  └─ progressionStages.S3.successUnlocks: ['d-2']

dc-1 (말년의 종이)
  ↓ requirePriorCardFired: dc-1
  ├─→ w-1 (최복순, 전 요양보호사)
  └─→ d-2 (공증 절차의 개입)
        ↓ progressionStages.S2.successUnlocks: ['dc-2']
        ↓ requirePriorCardFired: d-2 (dc-2 cascade)
        dc-2 (수정된 유언장)
          ↓ requirePriorCardFired: dc-2
          └─→ w-2 (김영수)
        ↓ progressionStages.S3.successUnlocks: ['d-3']
```

### Chain B: Cycle 6 20년 돈 line (d-3 + dc-3 통합 event)

```
dc-2 (수정된 유언장, Cycle 5 마지막 단서)
  ↓ requirePriorCardFired: dc-2 + d-2 S3+
d-3 (오래된 지원의 출처)  ⇒  dc-3 (20년의 돈)
  ↑ narrativeIntegration.ts 의 FORCE_UNLOCK_DOSSIER_ON_DISPUTE_FIRE
    (d-3 trigger fire 시 dc-3 자동 force-unlock + narrative entry text 가 dc-3 등록 announcement 포함)
  ↓ progressionStages.S2.successUnlocks: ['dc-3'] (mechanical, 중복 안전)
  ↓ progressionStages.S3.successUnlocks: ['d-4']
  ↓ requirePriorCardFired: dc-3 (w-3 cascade)
w-3 (박순애, 어머니의 오랜 지인)
  ↑ unlockedByDossier: ['dc-3', 'dc-5'] (cross-cycle — Cycle 6 단서 + Cycle 7 최종 종합 단서 둘 다 unlock 경로)
```

### Chain C: Cycle 7 비밀+최종 line (d-4 → e-7 / d-4 → dc-4 → d-5 → e-5 → dc-5)

```
dc-3 (20년의 돈, Cycle 6 단서)
  ↓ requirePriorCardFired: dc-3 + d-3 S3+
d-4 (가족 기록과 침묵의 이유)
  ↓ progressionStages.S2.successUnlocks: ['dc-4']
  ↓ progressionStages.S3.successUnlocks: ['d-5']
  ↓ requirePriorCardFired: d-4 (e-7 cascade + dc-4 cascade 두 분기)
  ├─→ e-7 (어머니 일기장)
  └─→ dc-4 (감춘 이유)
        ↓ requirePriorCardFired: dc-4 (메인) 또는 e-7 (차선) — d-5 cascade 두 candidate
        d-5 (어머니의 숨겨진 마음)
          ↓ progressionStages.S2.successUnlocks: ['dc-5']
          ↓ requirePriorCardFired: dc-4 + d-5 S3+
          e-5 (자필 메모 사본, requires: ['e-7'], requiredLieState='S5')
          ↓ requirePriorCardFired: d-5 + d-5 S2+
          dc-5 (어머니의 뜻)
            ↑ w-3 unlockedByDossier: ['dc-3', 'dc-5'] — cross-cycle witness 재unlock 경로 (이미 dc-3 으로 unlock 된 경우 중복 안전)
```

---

## Part 3: entity 별 trigger candidate 전수 매트릭스

### Cycle 5 — 절차/판단 line (4 entity: dc-1 / w-1 / d-2 / dc-2 / w-2)

#### dc-1 「말년의 종이」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc1-via-combo-1 | combination_result (combine-1) | `d-1 S1+` | 2 refs (judge-decree / b-react) | standard |
| dc1-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-1 S1+ }]` OR `[{ distrust.a≥50 }]` (contextAction 없음) | 4 refs | standard |
| dc1-via-b-outburst | emotional_outburst (source: b) | `d-1 S1+` + `partyPhase.b: [defensive, shaken]` | 4 refs | standard |
| dc1-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 8` (dispute 명시 없음) | 2 refs | standard |

#### w-1 「최복순 (전 요양보호사)」 — 3 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w1-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S2+` | 2 refs (judge-summon / a-react) | standard |
| w1-via-b-interject | npc_interjection (source: b) | `d-1 S2+` (contextAction + partyPhase 모두 없음) | 3 refs | standard |
| w1-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 2 refs | standard |

#### d-2 「공증 절차의 개입」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d2-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S3+` | 2 refs (judge-decree / a-react) | standard |
| d2-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-1 S2+ }]` OR `[{ distrust.a≥50 + d-1 S1+ }]` (contextAction 없음) | 3 refs | standard |
| d2-via-b-outburst | emotional_outburst (source: b) | `d-1 S2+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| d2-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 7` | 2 refs | standard |

#### dc-2 「수정된 유언장」 — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc2-via-combo | combination_result (combine-5: stmt-b-silence + e-4) | `d-2 S1+` | 2 refs (judge-decree / b-respond) | standard |
| dc2-via-cascade | cascade_from_card | `requirePriorCardFired: d-2` + `d-2 S2+` | 2 refs | standard |
| dc2-via-b-outburst | emotional_outburst (source: b) | `d-2 S2+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| dc2-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 6` | 2 refs | standard |

#### w-2 「김영수」 — 3 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w2-via-cascade | cascade_from_card | `requirePriorCardFired: dc-2` + `d-2 S2+` | 2 refs (judge-summon / a-react) | standard |
| w2-via-b-interject | npc_interjection (source: b) | `d-2 S2+` (contextAction + partyPhase 모두 없음) | 3 refs | standard |
| w2-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 2 refs | standard |

---

### Cycle 6 — 20년 돈 line (2 entity: d-3 + w-3 / dc-3 통합 event)

#### d-3 「오래된 지원의 출처」 (dc-3 통합 event) — 5 candidate

scriptedRefs ID = `emerge-d3-dc3-via-*` 패턴. narrative entry text 가 dc-3 등록 announcement 포함 — narrativeIntegration 의 `FORCE_UNLOCK_DOSSIER_ON_DISPUTE_FIRE['d-3']: 'dc-3'` 매핑으로 d-3 fire 시 dc-3 force-unlock 동기.

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-2` + `d-2 S3+` | 2 refs (judge-decree / b-respond) | standard |
| d3-via-combo | combination_result (combine-6: stmt-b-mother + e-6) | `d-2 S3+` | 2 refs | standard |
| d3-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-2 S3+ + partyPhase.a: defensive/shaken }]` OR `[{ d-2 S3+ + distrust.a≥40 }]` | 3 refs | standard |
| d3-via-b-outburst | emotional_outburst (source: b) | `d-2 S3+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| d3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 8` | 2 refs | standard |

#### w-3 「박순애 (어머니의 오랜 지인)」 — 3 candidate

`unlockedByDossier: ['dc-3', 'dc-5']` cross-cycle — Cycle 6 단서 (dc-3) + Cycle 7 최종 종합 단서 (dc-5) 둘 다 unlock 경로.

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-3` + `d-3 S2+` | 2 refs (judge-summon / a-react) | standard |
| w3-via-b-interject | npc_interjection (source: b) | `d-3 S2+` + `partyPhase.b: [defensive, resigned]` | 3 refs | standard |
| w3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` | 2 refs | standard |

---

### Cycle 7 — 비밀+최종 line (6 entity: d-4 / e-7 / dc-4 / d-5 / e-5 / dc-5)

#### d-4 「가족 기록과 침묵의 이유」 — 5 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d4-via-cascade | cascade_from_card | `requirePriorCardFired: dc-3` + `d-3 S3+` | 2 refs (judge-decree / b-respond) | standard |
| d4-via-combo | combination_result (combine-4: e-6 + e-7) | `d-3 S3+` | 2 refs | standard |
| d4-via-b-interject | npc_interjection (source: b) | `d-3 S3+` + `partyPhase.b: [defensive, resigned]` | 3 refs | standard |
| d4-via-a-outburst | emotional_outburst (source: a) | `d-3 S3+` + `partyPhase.a: [shaken]` | 3 refs | standard |
| d4-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 8` | 2 refs | standard |

#### e-7 「오래된 노트 사본」 (lockedName: 어머니 일기장, requiredLieState='S2') — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e7-via-cascade | cascade_from_card | `requirePriorCardFired: d-4` + `d-4 S2+` | 2 refs | standard |
| e7-via-b-interject | npc_interjection (source: b) | `d-4 S2+` + `partyPhase.b: [defensive, resigned]` | 3 refs | standard |
| e7-via-b-outburst | emotional_outburst (source: b) | `d-4 S2+` + `partyPhase.b: [shaken]` | 3 refs | standard |
| e7-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 6` | 2 refs | standard |

#### dc-4 「감춘 이유」 — 5 candidate (**multi-recipe combo 두 candidate**)

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc4-via-cascade | cascade_from_card | `requirePriorCardFired: d-4` + `d-4 S2+` | 2 refs | standard |
| **dc4-via-combo-4** | combination_result (combine-4: e-6 + e-7) | `d-4 S2+` | 2 refs (**동일 ref ID** = combo) | standard |
| **dc4-via-combo-7** | combination_result (combine-7: e-5 + e-7) | `d-4 S2+` | 2 refs (**동일 ref ID** = combo) | standard |
| dc4-via-b-outburst | emotional_outburst (source: b) | `d-4 S2+` + `partyPhase.b: [shaken]` | 3 refs | standard |
| dc4-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 6` | 2 refs | standard |

> 비고: Cycle 5 dc1 패턴 (combo-1 단일 recipe) 와 달리 dc-4 는 **두 recipe (combine-4 / combine-7)** 가 같은 outputId='dc-4' 로 모인다. 두 candidate 가 같은 scriptedRefs (`emerge-dc4-via-combo-*-v1`) 공유. 사용자 결정 (Cycle 7 사전).

#### d-5 「어머니의 숨겨진 마음」 — 5 candidate (**cascade 두 candidate**)

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| **d5-via-cascade-dc4** (메인) | cascade_from_card | `requirePriorCardFired: dc-4` + `d-4 S3+` | 2 refs (`emerge-d5-via-cascade-*`) | standard |
| **d5-via-cascade-e7** (차선) | cascade_from_card | `requirePriorCardFired: e-7` + `d-4 S3+` | 2 refs (`emerge-d5-via-cascade-e7-*`) | standard |
| d5-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-4 S3+ + partyPhase.a: defensive/shaken }]` OR `[{ d-4 S3+ + distrust.a≥30 }]` | 3 refs | standard |
| d5-via-b-outburst | emotional_outburst (source: b) | `d-4 S3+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| d5-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 8` | 2 refs | standard |

> 비고: 사용자 결정 (Cycle 7 사전). dc-4 메인 + e-7 차선 — 두 priorCard 경로 모두 d-5 cascade.

#### e-5 「자필 메모 사본」 (lockedName: 어머니 자필 유언장 연습본, requires: ['e-7'], requiredLieState='S5') — 4 candidate

`sensitiveSealTargets`: 자필 비율 정확 수치 (90:10) + 자기 몫 축소 방향 → d-5 S5 도달 후만 노출.

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e5-via-cascade | cascade_from_card | `requirePriorCardFired: dc-4` + `d-5 S3+` | 2 refs | standard |
| e5-via-combo | combination_result (combine-2: e-4 + e-5) | `d-5 S3+` | 2 refs | standard |
| e5-via-b-interject | npc_interjection (source: b) | `d-5 S3+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| e5-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 6` | 2 refs | standard |

#### dc-5 「어머니의 뜻」 (최종 종합 단서) — 4 candidate

linkedParty='b' (B 측 비율 축소가 메인 책임축). 단 `challenges.a` 별도 보존 (장남 당연시 reframe).

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc5-via-cascade | cascade_from_card | `requirePriorCardFired: d-5` + `d-5 S2+` | 2 refs | standard |
| dc5-via-combo | combination_result (combine-2: e-4 + e-5) | `d-5 S2+` | 2 refs | standard |
| **dc5-via-a-outburst** | emotional_outburst (source: a) | `d-5 S2+` + `partyPhase.a: [shaken, resigned]` | 3 refs | standard |
| dc5-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 6` | 2 refs | standard |

> 비고: 양측 책임축 종합 — A 측 "장남 당연시 frame 책임 인식 첫 진입" outburst 단독. spouse-01 / Cycle 1~6 패턴 (b outburst 위주) 과 다른 결정.

---

## Part 4: Hybrid hook 영역

### useActionDispatch.ts — family-01 분기 **없음**

spouse-01 의 C-2 (e-3 stage 2 → e-4 cascade) / C-3c (e-1 stage 3 → e-10 cascade) 같은 강제 stage gate Hybrid hook 이 family-01 영역에는 부착되어 있지 않다. 모두 schema-based + cascade chain.

### narrativeIntegration.ts — generic d-3 → dc-3 force-unlock (공통 영역)

위치: `src/engine/narrativeIntegration.ts` line 45~47

```ts
const FORCE_UNLOCK_DOSSIER_ON_DISPUTE_FIRE: Record<string, string> = {
  'd-3': 'dc-3',
}
```

dispute trigger fire 후 `applyAttemptOutcome` 에서 매핑 lookup → `forceUnlockDossierNode('dc-3')` 호출. **공통 engine 영역 — 본 family-01 thread 변경 X**.

본 매핑은 사용자 결정 (2026-05-24 Cycle 6) — "d-3 + dc-3 두 layer 내용 동일 → narrative event 통합". d-3 trigger fire 시 narrative entry text 가 dc-3 등록 announcement 포함하므로 mechanical dc-3 unlock 도 동기.

---

## Part 5: trigger type 분포

| type | 개수 | 비고 |
|---|---|---|
| cascade_from_card | 14 | w-1 / d-2 / dc-2 / w-2 / d-3 / w-3 / d-4 / e-7 / dc-4 / d-5(2) / e-5 / dc-5. **d-5 만 두 candidate (dc-4 메인 + e-7 차선)**. priorCard chain 의존 가장 큰 type. |
| npc_interjection | 6 | dc-1(a) / w-1(b) / d-2(a) / w-2(b) / d-3(a) / w-3(b) / d-4(b) / e-7(b) / d-5(a) / e-5(b). 배열 OR 형식의 정밀도가 다양 (broad / 정밀 mix). |
| combination_result | 8 | dc-1(combo-1) / dc-2(combo-5) / d-3(combo-6) / d-4(combo-4) / **dc-4(combo-4 + combo-7 두 candidate)** / e-5(combo-2) / dc-5(combo-2). recipeId 의존. |
| emotional_outburst | 9 | dc-1(b) / d-2(b) / dc-2(b) / d-3(b) / d-4(a) / e-7(b) / dc-4(b) / d-5(b) / **dc-5(a 단독 — 장남 당연시 reframe)**. partyPhase 정밀 (shaken / defensive / resigned 조합). |
| judge_auto_mention | 13 | 모든 wrapper entity 1개씩. turnsAfterEligible 5/6/7/8 차등. |

총 candidate ≈ 56 (dc4 multi-recipe 2 + d5 multi-cascade 2 포함).

---

## Part 6: 사건 흐름 ↔ trigger 정합성 (재설계 검토 포인트)

`family-01` 사건 흐름 ([[design-family01-truth-disclosure-policy]] 권위):

```
1. 유서 60:40 등장 + 외부 자기 정후 압박 frame (A 측 시각)
2. 공증 절차 개입 발견 — 오전 공란 + 오후 60:40 수정 + 진행 압박 (d-2)
3. 어머니 돈으로 알았던 흐름 실체 = 윤정후 돈 (20년 통장 경유 + 공장 위기 3억) (d-3 + dc-3 통합 event)
4. 가족 기록과 침묵의 이유 — 어머니 일기장 = 윤태성 출생 비밀 + 윤정후 사전 인지 + 친자 양보 (d-4 + e-7, e-7 친부 실명 영구 봉인)
5. 어머니의 숨겨진 마음 — 자필 90:10 → 공증 60:40 축소 (d-5 + e-5, e-5 정확 수치는 d-5 S5 도달 후만)
6. 어머니의 뜻 종합 — 양측 책임축 (A 측 장남 당연시 + B 측 자기 판단 얹음) (dc-5)
```

**5 keyword 그룹 진실 노출 정책**:
1. 출생 비밀 / 친자가 아니다 — d-4 S3 이후. 친부 실명 영구 봉인
2. 정후 돈 / 어머니 통장 경유 / 3억원 — d-3 S2 이후. d-3 S5 양측 완전 인정
3. 자필 90:10 / 공증 60:40 축소 — d-5 S5 도달 후만 (e-5 sensitiveSealTargets)
4. 공장 양보 / 형 자존심 — d-3 S4 이후 ↔ d-4 S4 이후
5. 유산 당연시 / 보호 명분 / 두 번 왜곡 — d-5 S3 이후 (truth-leak-matrix hidden X)

### 재설계 검토 포인트

1. **broad 패턴 (spouse-01 유사 패턴)** — `dc1-via-a-interject` / `w1-via-b-interject` / `d2-via-a-interject` / `w2-via-b-interject` 모두 contextAction 자체 없음 (dispute lieState + partyDistrust/partyPhase 만). spouse-01 Issue 1+2 = 폐기 결정. family-01 도 동일 정밀화 검토 필요.

2. **dc-3 통합 event 정합** — 사용자 사전 결정 (Cycle 6) 유지 권위. 단 `dc-3.narrativeTriggers = []` 가 비표준 패턴. inventory / 검증 영역 명확 표시 필요.

3. **dc-4 multi-recipe 두 candidate (combo-4 + combo-7) 동일 scriptedRefs** — 같은 ScriptedText 출력 / 두 recipe 모두 발동 가능. ScriptedText 영역 입장에서는 한 entry 가 양 recipe response. 의도 명확 (Cycle 7 사전 결정).

4. **d-5 cascade 두 candidate (dc-4 메인 + e-7 차선)** — 두 priorCard 경로 모두 d-5 cascade. 사용자 사전 결정 (Cycle 7).

5. **w-3 cross-cycle unlockedByDossier (dc-3 + dc-5)** — Cycle 6 + Cycle 7 두 cycle 진입 모두 가능. 사전 결정.

6. **judge_auto turnsAfterEligible 차등** — dispute 7/8 / dossier 6/8 / witness 5 / evidence 6. 일관성 정책 정리 필요.

7. **e-7 의 b-interject + b-outburst 두 candidate** — `partyPhase.b: [defensive, resigned]` vs `[shaken]` 분기. spouse-01 Issue 3 (e-9-via-b-submit type 불일치) 유사 검토 영역.

8. **dc-5 a-outburst 단독 (장남 당연시 reframe)** — 양측 책임축 종합 단서. A 측 책임 인정 frame 위 outburst. spouse-01 / Cycle 1~6 패턴 (b 측 outburst 위주) 과 다른 결정. 의도 명확.

9. **e-1/e-2/e-4/e-6 wrapper 미부착** — initial 또는 dispute requiredEvidence 영역. spouse-01 Issue 4 (e-1/e-2/e-3 미부착) 동일 패턴. 사용자 결정 (유지 권위 가능성 높음).

10. **d-1 wrapper 미부착** — initial dispute (v3Visibility='initial'). spouse-01 d-1 동일 패턴 (initial dispute = wrapper 미부착).

inventory 종료. 회귀·문제는 [issues.md](./issues.md) 참조.
