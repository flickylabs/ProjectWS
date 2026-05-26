# spouse-01 narrative trigger 영역 전수 매트릭스 (재설계 진입 전 스냅샷)

> 작성일: 2026-05-26  
> 권위 base HEAD: `8abd611b`  
> 참조 source: [src/data/coreCases/spouse-01.narrative.ts](../../../src/data/coreCases/spouse-01.narrative.ts) (1098 lines, 16 NarrativeTriggers var) / [src/data/coreCases/spouse-01.case.ts](../../../src/data/coreCases/spouse-01.case.ts) (d-3 + e-5 + e-10 inline) / [src/hooks/useActionDispatch.ts](../../../src/hooks/useActionDispatch.ts) (C-2 hook line 1206~1252, C-3c hook line 1158~1204)

본 문서는 **현재 시점 trigger 영역 전수 스냅샷**이다. 재설계 진입 전 "현재 영역 정리" 산출물. 회귀/문제 영역은 [issues.md](./issues.md)로 별도 분리.

---

## Part 1: entity 영역 inventory

총 16 entity가 `narrativeTriggers` 영역 부착. d-1 / d-2 / e-1 / e-2 / e-3 영역은 narrative trigger 영역 미부착 (의도 영역 확인 필요).

| ID | 게임 내 명칭 (surface) | proves / link | requires | requiredLieState | trigger candidate 개수 | Hybrid hook |
|----|----|----|----|----|----|----|
| **외도 의심 line (d-1)** ||||||| 
| d-1 | (initial dispute, 외도 의심) | — | — | — | **0** | — |
| e-1 | 영수증 묶음 5장 | d-1 | — | — | **0** | C-3c (e-1 stage 3 → e-10) |
| e-2 | 블랙박스 GPS 기록 | d-1 | — | — | **0** | — |
| e-3 | 통화기록 | d-1 | — | — | **0** | C-2 (e-3 stage 2 → e-4) |
| e-4 | 발신자 미상 문자 | d-1 | e-3 | S1 | 4 | (C-2 hook 결과 영역) |
| dc-1 | 오피스텔의 사람들 | d-1 link | — | — | 4 | — |
| w-1 | 오피스텔 경비 | d-1 증언 | — | — | 4 | — |
| dc-2 | 시댁 얘기만 나오면 싸움 | d-1 + d-2 cross-line | — | — | 4 | — |
| **위임장 조작 line (d-2 + h-d3)** ||||||| 
| d-2 | (initial dispute, 비자금 사용처) | — | — | — | **0** | — |
| e-5 | 개인 계좌 출금 내역 | d-2 | — | — | 4 (inline in case.ts) | — |
| dc-3 | 이준호의 비밀 개인 계좌 | d-2 link | — | — | 4 | — |
| e-7 | 공동 적금 해지 서류 | h-d3 | — | — | 4 | — |
| dc-7 | 공동 적금 2,000만 원의 해지 | h-d3 link | — | — | 4 | — |
| w-2 | 은행 직원 | d-2 + h-d3 증언 | — | — | 3 (h-d3 분기만) | — |
| h-d3 | (hidden dispute, 위임장 조작) | — | — | — | 4 | — |
| **투자방 송금 line** ||||||| 
| e-6 | 투자방 텔레그램 | h-d3 | — | — | 4 | — |
| dc-4 | 돌이키고 싶은 2,000만 원 | h-d3 link | — | — | 4 | — |
| w-3 | 박미라 | h-d3 증언 | — | — | 4 | — |
| **비자금 진실 line (난임 치료비, h-d4)** ||||||| 
| e-8 | 주차 영수증 (발급처 오염) | d-2 + d-3 | — | — | 4 | — |
| e-9 | 산전우울증 자가진단 + 상담 예약 | d-2 + d-3 | — | — | 4 | — |
| e-10 | 출산 준비 도서 | d-2 + d-3 | — | — | 1 (inline in case.ts) | C-3c (e-1 stage 3 → e-10) |
| dc-8 | 이준호의 또 다른 침묵 | h-d4 link | — | — | 4 | — |
| h-d4 | (hidden dispute, 난임 치료비 진실) | — | — | — | 4 | — |
| **Misdirection** ||||||| 
| d-3 | 내연녀 임신 의심 (misdirection) | — | — | — | 1 (inline in case.ts) | — |

---

## Part 2: 사건 line 별 cascade chain 시각화

각 chain은 `cascade_from_card` priorCard 영역 연결 그래프. `→` = priorCard 의존성. `⇒` = dual emergence (e-10 → d-3 동시).

### Chain 1: 외도 의심 line (d-1)

```
e-3 (통화기록, narrative trigger 0)
  ↓ [C-2 hook] e-3 stage 2 + present to b → cascade emerge
e-4 (발신자 미상 문자) 
  ↓ requirePriorCardFired: e-4
dc-1 (오피스텔의 사람들)
  ↓ requirePriorCardFired: dc-1
  ├─→ w-1 (오피스텔 경비)
  └─→ dc-2 (시댁, cross-line: d-1 + d-2)

별도 chain: e-1 (영수증) / e-2 (GPS) — narrative trigger 0, cascade chain 영역 미참여
```

### Chain 2: 위임장 조작 line (d-2 → h-d3)

```
e-5 (개인 계좌 출금 내역) — inline trigger 4 candidate
  └─→ [evidence_analyze.b.e-5] cascade
        ↓
dc-3 (이준호의 비밀 개인 계좌)
  ↓ requirePriorCardFired: dc-3
e-7 (공동 적금 해지 서류)
  ↓ requirePriorCardFired: e-7
dc-7 (공동 적금 2,000만 원의 해지)
  ↓ requirePriorCardFired: dc-7
  ├─→ e-6 (투자방 텔레그램)
  └─→ w-2 (은행 직원, h-d3 분기)

h-d3 (hidden dispute) — narrative trigger 4 candidate (combine-5 / d-2 S2+ + b interject / a outburst / judge auto)
```

### Chain 3: 투자방 송금 line

```
e-6 (투자방 텔레그램)
  ↓ requirePriorCardFired: e-6
dc-4 (돌이키고 싶은 2,000만 원)
  ↓ requirePriorCardFired: dc-4
w-3 (박미라)
```

### Chain 4: 비자금 진실 line (h-d4)

```
dc-3 (이준호의 비밀 개인 계좌, Cycle 2 산출)
  ↓ requirePriorCardFired: dc-3 + disputeLieState: { 'd-2': 'S5+' }
e-8 (주차 영수증)
  ↓ requirePriorCardFired: e-8
e-9 (산전우울증 자가진단)
  ↓ requirePriorCardFired: e-9
dc-8 (이준호의 또 다른 침묵)
  ↓ requirePriorCardFired: dc-8
h-d4 (난임 치료비 진실)

전제: d-2 S5+ 도달 (비자금 사용처 자백 = 형). d-3 영역 영향 X (parallel chain).
```

### Chain 5: misdirection ↔ 진실 전환 (e-10 ↔ d-3)

```
e-1 (영수증 묶음 5장, stage 1/2/3 player 조사)
  ↓ [C-3c hook] e-1 stage 3 + present to b → cascade emerge
e-10 (출산 준비 도서)
  ↓ requirePriorCardFired: e-10 (자동 dual emergence)
d-3 (내연녀 임신 의심 misdirection) 등장
  ↓ d-3 S5 successUnlocks: ['h-d4']
h-d4 (난임 치료비 진실)

⚠ d-3 → h-d4 영역은 d-3.truthStages.S5.successUnlocks 영역 — narrative trigger 영역 영향 X
```

---

## Part 3: entity별 trigger candidate 전수 매트릭스

### 외도 의심 line (d-1) — 4 entity (e-4 / dc-1 / w-1 / dc-2)

#### e-4 (발신자 미상 문자) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e4-via-e3-stage2 | cascade_from_card | `requirePriorCardFired: e-3` + `contextAction: evidence_present.b.e-3` + `d-1 S1+` | 5 refs (q1/b-hedge/a-reveal/b-confess/q2) | standard |
| e4-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-1 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | 4 refs | standard |
| e4-via-b-interject | npc_interjection (source: b) | `d-1 S1+` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| e4-via-judge-auto | judge_auto_mention | `d-1 S1+` + `turnsAfterEligible: 5` | 2 refs | standard |

#### dc-1 (오피스텔의 사람들) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc1-via-combo | combination_result (combine-1) | `d-1 S1+` | 4 refs | emphasis |
| dc1-via-cascade | cascade_from_card | `requirePriorCardFired: e-4` + `d-1 S2+` | 3 refs | standard |
| dc1-via-b-interject | npc_interjection (source: b) | `d-1 S2+` + `partyPhase.b: [defensive, shaken]` | 4 refs | standard |
| dc1-via-judge-auto | judge_auto_mention | `d-1 S2+` + `turnsAfterEligible: 4` | 2 refs | standard |

#### w-1 (오피스텔 경비) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w1-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S2+` | 3 refs | standard |
| w1-via-a-interject | npc_interjection (source: a) | `requirePriorCardFired: dc-1` + `partyPhase.a: [shaken, angry]` | 4 refs | standard |
| w1-via-b-outburst | emotional_outburst (source: b) | `requirePriorCardFired: dc-1` + `partyPhase.b: [shaken, resigned]` | 4 refs | emphasis |
| w1-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-1` + `d-1 S3+` + `turnsAfterEligible: 4` | 2 refs | standard |

#### dc-2 (시댁 얘기만 나오면 싸움, cross-line: d-1 + d-2) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc2-via-combo | combination_result (combine-6) | `d-1 S2+` | 4 refs | emphasis |
| dc2-via-cascade | cascade_from_card | `requirePriorCardFired: dc-1` + `d-1 S2+` | 3 refs | standard |
| dc2-via-b-outburst | emotional_outburst (source: b) | `requirePriorCardFired: dc-1` + `partyPhase.b: [shaken, angry]` + `contextAction: question.motive_search.b` | 4 refs | emphasis |
| dc2-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-1` + `d-1 S3+` + `turnsAfterEligible: 4` | 2 refs | standard |

---

### 위임장 조작 line (d-2 → h-d3) — 5 entity (e-5 / dc-3 / e-7 / dc-7 / h-d3 / w-2)

#### e-5 (개인 계좌 출금 내역, inline in case.ts) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e5-via-a-interjection | npc_interjection (source: a) | **배열 OR**: `[{ d-1 S2+ }]` OR `[{ distrust.a≥50 }]` (contextAction 없음) | 6 refs | standard |
| e5-via-combo-cash-pattern | combination_result (clue-cash-pattern) | `d-2 S1+` | 4 refs | standard |
| e5-via-b-angry-outburst | emotional_outburst (source: b) | `d-2 S2+` + `partyPhase.b: [shaken, angry]` + `contextAction: question.fact_pursuit.b` | 5 refs | emphasis |
| e5-via-judge-auto-mention | judge_auto_mention | `turnsAfterEligible: 5` (dispute 영역 없음) | 2 refs | standard |

#### dc-3 (이준호의 비밀 개인 계좌) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc3-via-combo | combination_result (combine-4) | `d-2 S1+` | 4 refs | standard |
| dc3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-cash-clue` + `d-2 S1+` | 3 refs | standard |
| dc3-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ d-2 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | 4 refs | standard |
| dc3-via-judge-auto | judge_auto_mention | `turnsAfterEligible: 5` (dispute 영역 없음) | 2 refs | standard |

#### e-7 (공동 적금 해지 서류) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e7-via-cascade-mention | cascade_from_card | `requirePriorCardFired: dc-3` + `h-d3 S1+` | 3 refs | standard |
| e7-via-cascade-analysis | cascade_from_card | `requirePriorCardFired: dc-3` + `contextAction: evidence_analyze.b.e-5` + `h-d3 S1+` | 3 refs | standard |
| e7-via-b-interject | npc_interjection (source: b) | `h-d3 S1+` + `partyPhase.b: [defensive, confident, shaken, angry]` | 4 refs | standard |
| e7-via-judge-auto | judge_auto_mention | `h-d3 S2+` + `turnsAfterEligible: 3` | 2 refs | standard |

#### dc-7 (공동 적금 2,000만 원의 해지) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc7-via-combo | combination_result (combine-5) | `h-d3 S2+` | 3 refs | emphasis |
| dc7-via-cascade | cascade_from_card | `requirePriorCardFired: e-7` + `h-d3 S2+` | 3 refs | standard |
| dc7-via-b-interject | npc_interjection (source: b) | `requirePriorCardFired: e-7` + `h-d3 S1+` + `partyPhase.b: [defensive, confident, shaken, angry]` | 4 refs | standard |
| dc7-via-judge-auto | judge_auto_mention | `requirePriorCardFired: e-7` + `turnsAfterEligible: 4` | 2 refs | standard |

#### h-d3 (위임장 조작, hidden dispute) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| hd3-via-b-interject | npc_interjection (source: b) | `d-2 S2+` + `partyPhase.b: [defensive, confident, shaken, angry]` + `contextAction: question.fact_pursuit.a.d-2` | 4 refs | emphasis |
| hd3-via-combo | combination_result (combine-5) | `d-2 S2+` | 3 refs | emphasis |
| hd3-via-a-outburst | emotional_outburst (source: a) | `d-2 S3+` + `partyPhase.a: [shaken, angry]` + `contextAction: question.fact_pursuit.a` | 4 refs | emphasis |
| hd3-via-judge-auto | judge_auto_mention | `d-2 S4+` + `turnsAfterEligible: 4` | 2 refs | standard |

#### w-2 (은행 직원, h-d3 분기만) — 3 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w2-hd3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-7` + `h-d3 S2+` | 3 refs | standard |
| w2-hd3-via-b-interject | npc_interjection (source: b) | `requirePriorCardFired: dc-7` + `partyPhase.b: [defensive, confident, shaken, angry]` | 4 refs | standard |
| w2-hd3-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-7` + `turnsAfterEligible: 2` | 2 refs | standard |

---

### 투자방 송금 line — 3 entity (e-6 / dc-4 / w-3)

#### e-6 (투자방 텔레그램) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e6-via-cascade | cascade_from_card | `requirePriorCardFired: dc-7` + `h-d3 S2+` | 3 refs | standard |
| e6-via-b-interject | npc_interjection (source: b) | `requirePriorCardFired: dc-7` + `partyPhase.b: [defensive, confident, shaken, angry]` | 4 refs | standard |
| e6-via-a-outburst | emotional_outburst (source: a) | `requirePriorCardFired: dc-7` + `partyPhase.a: [shaken, angry, resigned]` | 4 refs | emphasis |
| e6-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-7` + `turnsAfterEligible: 3` | 2 refs | standard |

#### dc-4 (돌이키고 싶은 2,000만 원) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc4-via-combo | combination_result (combine-3) | `h-d3 S2+` | 3 refs | emphasis |
| dc4-via-cascade | cascade_from_card | `requirePriorCardFired: e-6` + `h-d3 S2+` | 3 refs | standard |
| dc4-via-a-outburst | emotional_outburst (source: a) | `requirePriorCardFired: e-6` + `partyPhase.a: [shaken, resigned]` | 4 refs | emphasis |
| dc4-via-judge-auto | judge_auto_mention | `requirePriorCardFired: e-6` + `turnsAfterEligible: 3` | 2 refs | standard |

#### w-3 (박미라) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| w3-via-cascade | cascade_from_card | `requirePriorCardFired: dc-4` + `h-d3 S3+` | 3 refs | standard |
| w3-via-b-interject | npc_interjection (source: b) | `requirePriorCardFired: dc-4` + `partyPhase.b: [defensive, confident, shaken, angry]` | 4 refs | standard |
| w3-via-a-outburst | emotional_outburst (source: a) | `requirePriorCardFired: dc-4` + `partyPhase.a: [shaken, angry, resigned]` | 4 refs | emphasis |
| w3-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-4` + `h-d3 S3+` + `turnsAfterEligible: 4` | 2 refs | standard |

---

### 비자금 진실 line (h-d4) — 4 entity (e-8 / e-9 / dc-8 / h-d4)

#### e-8 (주차 영수증) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e8-via-cascade | cascade_from_card | `requirePriorCardFired: dc-3` + `d-2 S5+` | 3 refs | standard |
| e8-via-a-interject | npc_interjection (source: a) | `d-2 S5+` + `distrust.a≥50` + `contextAction: question.fact_pursuit.b` | 4 refs | standard |
| e8-via-b-outburst | emotional_outburst (source: b) | `d-2 S5+` + `partyPhase.b: [shaken, angry]` | 4 refs | emphasis |
| e8-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-3` + `d-2 S5+` + `turnsAfterEligible: 5` | 2 refs | standard |

#### e-9 (산전우울증 자가진단) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e9-via-cascade | cascade_from_card | `requirePriorCardFired: e-8` + `d-2 S5+` | 3 refs | standard |
| e9-via-a-interject | npc_interjection (source: a) | **배열 OR**: `[{ e-8 fired + distrust.a≥50 + evidence_present.b }]` OR `[{ e-8 fired + distrust.a≥50 + question.fact_pursuit.b }]` | 4 refs | standard |
| e9-via-b-submit | npc_interjection (source: b) ⚠ type 불일치 | `requirePriorCardFired: e-8` + `partyPhase.b: [defensive, shaken]` | 3 refs | standard |
| e9-via-judge-auto | judge_auto_mention | `requirePriorCardFired: e-8` + `turnsAfterEligible: 3` | 2 refs | standard |

#### dc-8 (이준호의 또 다른 침묵) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| dc8-via-combo | combination_result (combine-7) | `d-2 S5+` | 4 refs | emphasis |
| dc8-via-cascade | cascade_from_card | `requirePriorCardFired: e-9` + `d-2 S5+` | 3 refs | standard |
| dc8-via-b-outburst | emotional_outburst (source: b) | `requirePriorCardFired: e-9` + `partyPhase.b: [shaken, angry]` | 4 refs | emphasis |
| dc8-via-judge-auto | judge_auto_mention | `requirePriorCardFired: e-9` + `turnsAfterEligible: 4` | 2 refs | standard |

#### h-d4 (난임 치료비 진실, hidden dispute) — 4 candidate

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| hd4-via-cascade | cascade_from_card | `requirePriorCardFired: dc-8` + `d-2 S5+` | 3 refs | standard |
| hd4-via-b-outburst | emotional_outburst (source: b) | `requirePriorCardFired: dc-8` + `partyPhase.b: [resigned, shaken]` | 4 refs | emphasis |
| hd4-via-a-confront | npc_interjection (source: a) | `requirePriorCardFired: dc-8` + `partyPhase.a: [shaken, angry]` | 4 refs | emphasis |
| hd4-via-judge-auto | judge_auto_mention | `requirePriorCardFired: dc-8` + `turnsAfterEligible: 5` | 2 refs | standard |

---

### Misdirection — d-3 / e-10 dual emergence

#### d-3 (내연녀 임신 의심 misdirection) — 1 candidate (inline in case.ts line 1878~1892)

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| d3-via-cascade-from-e10 | cascade_from_card | `requirePriorCardFired: e-10` | 2 refs (judge-decree, a-react) | standard |

#### e-10 (출산 준비 도서) — 1 candidate (inline in case.ts line 2536~2552)

| candidate ID | type | precondition | scriptedRefs | vfxProfile |
|---|---|---|---|---|
| e10-via-bookbaby-question-angle | cascade_from_card | `requirePriorCardFired: e-1` + `contextAction: evidence_present.b.e-1` | 4 refs (judge-mention/a-react/b-response/judge-decree) | standard |

---

## Part 4: useActionDispatch.ts Hybrid hook 영역

schema 영역의 stage gate 한계 보완을 위한 runtime hook 2개.

### Hook C-2 (line 1206~1252) — e-3 stage 2 → e-4 cascade

```
조건: spouse-01 + action.evidenceId === 'e-3' + action.target === 'b' + e-3 latestStage >= 2

결과:
  1. attemptNarrativeForEvidence(e-4) → 5단계 dialogue 자동 발행
  2. forceUnlockEvidence('e-4', triggerId)
  3. enqueueNewEvidenceCutscene('e-4')
  4. setPostCascadeV4FallbackMute('b', 'd-1', state.turnCount)
       → POST_CASCADE_V4_FALLBACK_MUTE_TURNS 턴 동안 b:d-1 V4 폴백 mute
       → fact_pursuit 등 QUESTION_TRIGGERS 단독으로 d-1 lieState 점프 차단
       → hard_evidence / contradiction_pursuit / witness 영역은 자연 진행
```

### Hook C-3c (line 1158~1204) — e-1 stage 3 → e-10 cascade

```
조건: spouse-01 + action.evidenceId === 'e-1' + action.target === 'b' + e-1 latestStage >= 3

결과:
  1. attemptNarrativeForEvidence(e-10) → 4단계 dialogue 자동 발행
  2. forceUnlockEvidence('e-10', triggerId)
  3. enqueueNewEvidenceCutscene('e-10')
  4. e-10 fire 시 d-3 narrativeTrigger 'd3-via-cascade-from-e10' 자동 fire (dual emergence)
     → d-3 (내연녀 임신 의심) 동시 surface — misdirection frame 표면화
```

---

## Part 5: trigger type 분포 영역

| type | 개수 | 비고 |
|---|---|---|
| cascade_from_card | ~22 | priorCard 영역 chain 의존. 가장 큰 type. |
| npc_interjection | ~14 | 배열 OR 형식 정밀도 다양 (broad / 정밀 mix). |
| combination_result | 7 | recipeId 영역 의존 (combine-1/3/4/5/6/7 + clue-cash-pattern). |
| emotional_outburst | 8 | partyPhase 영역 정밀 (대부분 shaken/angry/resigned 조합). |
| judge_auto_mention | 16 | turnsAfterEligible fallback. 모든 entity 1개씩 부착. |

---

## Part 6: 사건 흐름 ↔ trigger 정합성 영역 (재설계 검토 포인트)

`spouse-01` 사건 흐름 ([[project-spouse01-event-timeline]] 권위):

```
1. 이준호 측 가족 사정 (배경) — 형 사업 → 부모 재산 손실
2. 이준호의 비밀 행동 — 가족 도움 (오피스텔/계좌/문자) 박지연에게 숨김
3. 박지연의 외도 의심 — 위 행동 외도로 오인
4. 박지연의 위임장 조작 — 이혼 대비 이준호 명의 도용 공동 적금 해지 위임장 위조
5. 공동 적금 해지 실행 — 박지연 위임장으로 공동 적금 해지
6. 투자방 송금 — 텔레그램 투자방 송금 → 사기당함
7. 양측 침묵 — 이준호 (가족 사정 숨김) + 박지연 (위임장 조작·송금 사기 숨김)
```

**비자금 진실 line (h-d4)** = 본 thread 신설 영역. e-8/e-9/dc-8/h-d4 = "사실은 B 비자금이 박지연 난임 치료비 영역" 진실. 사건 흐름 영역에서 이준호 가족 사정 line과 별개로 추가된 진실 영역.

**misdirection 영역 (d-3)** = "박지연이 내연녀 출산 대비 영역으로 misdirect" — e-10 (출산 준비 도서) 등장 시 misdirection frame 표면화. d-3 무너짐 → h-d4 (난임 치료비) 진실 수렴.

재설계 시 검토 포인트:
- **Chain 1 ↔ Chain 5 영역 연결** = 외도 의심 line 조사 중 e-1 stage 3 + b 제시 → e-10 cascade → d-3 dual surface. **이 chain이 사용자 보기 부자연** (영수증에서 책이 나오는 영역)
- **Chain 4 (비자금 진실) 영역 진입 조건** = d-2 S5+ (비자금 사용처 자백). 즉 위임장 line 조사 + d-2 S5 도달 후만 진입. d-3 영역 영향 X. → d-3 무너짐과 비자금 진실 chain 영역이 독립 영역
- **이중 진입 영역** = e-10 cascade로 d-3 surface하면 d-3 S5 successUnlocks: ['h-d4'] 영역 + d-2 S5+ 영역 비자금 chain 영역 — 2 path로 h-d4 surface 가능. 사용자 보기 어느 영역 우선?

이상 inventory 영역 종료. [issues.md](./issues.md)에 회귀/문제 영역 별도 분리.
