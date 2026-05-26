# friend-01 trigger 회귀·문제·의문 매트릭스 (재설계 진입 전)

> 작성일: 2026-05-27
> 매트릭스 본체: [inventory.md](./inventory.md)

본 문서는 inventory 에서 식별된 **회귀·broad 패턴·누락·의문**을 정리한다. 재설계 협의 시 사용자 결정 사안.

본 thread 영역 = `friend-01.case.ts` / `friend-01.narrative.ts` schema 변경만. ScriptedText 변경 + 다국어 sync 는 별도 thread. schema 자체 (`narrativeTrigger.ts`) 변경 필요 영역 발견 시 = **공통 CT thread 안내**.

---

## Issue 1: 「예비신랑 연락 기록」(e-1) / 「공통 대화방 캡처」(e-2) / 「예전 관계가 끊기기 전 대화」(e-3) narrative wrapper 부재

### 증상
3 evidence 모두 `baseEvidenceIds` 영역 (사건 시작 시 player 자동 보유). `narrativeTriggers` 부착 0개. 즉 surface 시점에 narrative event 없음.

| evidence | 첫 등장 메커니즘 | requiredLieState | narrative wrapper |
|---|---|---|---|
| e-1 (예비신랑 연락 기록) | initial (baseEvidenceIds) | — | **없음** |
| e-2 (공통 대화방 캡처) | initial (baseEvidenceIds) | — | **없음** |
| e-3 (예전 관계가 끊기기 전 대화) | initial (baseEvidenceIds) | S1 (d-4 S1?) | **없음** |
| e-4 (예비신랑 메시지와 답장) | combine-2 (e-1+e-4) / cascade dc-1 | — (requires e-1) | 4 candidate |
| e-5 (떠벌림 흔적과 9일간 메시지) | cascade d-2 / requires e-1 | S2 | 4 candidate |
| e-6 (과거 송금 기록과 문자) | cascade d-3 / requires e-3 | S2 | 4 candidate |
| e-7 (두 시점 대조표) | cascade d-4/w-3 / requires [e-4, e-5, e-6] | S3 | 4 candidate |

### 사용자 결정 영역

- 옵션 A: **초기 보유 + narrative wrapper 불필요** (player 가 직접 탐색하면서 첫 진술에 활용) — spouse-01 Issue 4 결정 패턴
- 옵션 B: e-3 만 narrative wrapper 부착 (`requiredLieState: S1` 도달 시 surface event 발동)
- 옵션 C: 3 evidence 모두 narrative wrapper 부착 (사건 시작 chapter 시 narrative event 발행)

---

## Issue 2: combination recipe 4개 (combine-5/6/9/10) narrative trigger 미사용

### 증상
`combinationRecipes` 10개 중 4개가 narrative trigger 에서 사용되지 않음 → recipe 가 fire 되도 narrative event 없이 dossier 만 surface.

| recipe | inputs | outputId | gate | 누락 narrative event 영역 |
|---|---|---|---|---|
| combine-5 | e-4 + e-7 | dc-1 | d-2 S3+ + e-4 original + e-7 context | dc-1 reframe 보강 (예비신랑 선 넘기 인정 후 단톡방 글 다시 보기) |
| combine-6 | e-3 + e-7 | dc-5 | d-4 S3+ + e-3 context + e-7 context | dc-5 진입 (과거 손절 패턴 + 대조표) |
| combine-9 | stmt-b-silence + e-4 | dc-2 | e-4 original | dc-2 진입 (B 자책 발언 + 예비신랑 메시지) |
| combine-10 | stmt-b-silence + e-5 | dc-3 | e-5 original + d-3 S1+ | dc-3 진입 (B 자책 + 떠벌림 흔적) |

### 분석
- combine-5 / combine-9 = same outputId 이지만 다른 input. 이미 dc-1 / dc-2 가 fire 된 상태에서 두 번째 recipe fire 시 narrative event 없음.
- combine-6 / combine-10 = dossier 의 추가 진입 경로. narrative trigger 가 한 recipe 만 cover (combine-3 / combine-7).

### 사용자 결정 영역

- 옵션 A: **모두 narrative trigger 추가** (4 candidate 신설 — 같은 entity 의 multiple combo 경로)
- 옵션 B: dossier first-fire 후 다시 narrative event 발행 의도 없음 → **현재 구조 유지** (다른 entity 영역 narrative event 가 같은 효과 cover)
- 옵션 C: 선택적 추가 — combine-9/10 만 추가 (stmt + evidence 융합 영역 narrative 가치 있음)

---

## Issue 3: 「오미경」(w-3) `w3-via-npc-b-context` contextAction 없음 — broad 위험

### 증상

```typescript
{
  id: 'w3-via-npc-b-context',
  type: 'npc_interjection',
  source: 'b',
  preconditions: {
    disputeLieState: { 'd-4': 'S1+' },  // ⚠️ contextAction 없음
  },
  scriptedRefs: [...],
}
```

### 분석
- 「과거 손절과 아버지의 사기」(d-4) = hidden dispute. S1+ 도달 자체가 진입 어려움 (d-2 S5 → d-3 unlock → d-3 S3 → d-4 unlock 후 S1).
- 단 d-4 S1+ 도달 후에는 어떤 action 이든 (evidence_present / question / dossier 등) b 끼어들기 candidate 발동 가능.
- spouse-01 의 폐기된 `e9-via-a-interject` (contextAction 없는 broad) 와 같은 패턴이지만 hidden dispute 게이트 추가됨.

### 위험도
- d-4 S1 = hidden dispute 막 발현 시점. 이 시점은 보통 dc-4 (손절의 이유) cascade 직후. 즉 dc-4 surface 후 turn 이동 시 어떤 action 이든 「오미경」 (w-3) 끼어들기 가능 → 자연.
- 단 dc-4 surface 후 5턴 fallback `w3-via-judge-auto` 도 있어 중복 위험.

### 사용자 결정 영역

- 옵션 A: **contextAction 추가하여 정밀화** (예: `question.fact_pursuit.b` — B 가 추궁받을 때 본인이 「오미경」 언급)
- 옵션 B: **현재 broad 유지** (hidden dispute S1+ 자체가 충분한 게이트)
- 옵션 C: **폐기** (cascade + combo + judge-auto 3 candidate 만으로 충분 — spouse-01 Issue 2 안 A 패턴)

---

## Issue 4: 「예비신랑 메시지와 답장」(e-4) `e4-via-outburst-b` broad 위험

### 증상

```typescript
{
  id: 'e4-via-outburst-b',
  type: 'emotional_outburst',
  source: 'b',
  preconditions: {
    partyPhase: { b: ['shaken', 'angry'] },
    disputeLieState: { 'd-2': 'S0+' },  // ⚠️ d-2 surface dispute 의 가장 낮은 단계
  },
}
```

### 분석
- d-2 = surface dispute (hidden 아님). S0 부터 진입 가능 (사건 초기부터 d-2 surface).
- 즉 사건 시작 직후부터 partyPhase.b 가 shaken / angry 도달하면 「예비신랑 메시지와 답장」 surface event 발동 가능.
- e-4 의 narrative 의도 = 「예비신랑 연락 기록」(e-1) 인지 + 예비신랑 선 넘기 reframe 시점. 그러나 d-2 S0 만 만족하면 evidence chain 무관하게 발동.

### 사용자 결정 영역

- 옵션 A: **dispute 게이트 강화** — `d-2 S2+` (단정 단계 진입 후만)
- 옵션 B: **priorCard 추가** — `requirePriorCardFired: 'e-1'` (연락 기록 인지 후만)
- 옵션 C: **현재 구조 유지** (B 가 일찍 격앙되면 「예비신랑 메시지」 surface 자연)

---

## Issue 5: 「떠벌림 흔적과 9일간 메시지」(e-5) `e5-via-cascade` priorCard 가 dispute (d-2)

### 증상

```typescript
{
  id: 'e5-via-cascade',
  type: 'cascade_from_card',
  preconditions: {
    requirePriorCardFired: 'd-2',  // ⚠️ dispute priorCard
    disputeLieState: { 'd-2': 'S3+' },
  },
}
```

### 분석
- 다른 cascade 17개 = priorCard 가 모두 evidence / dossier / witness.
- e-5-via-cascade 만 priorCard 가 dispute (d-2).
- schema (`narrativeTrigger.ts`) 가 dispute priorCard 를 지원하는지 검증 필요. 즉 실제 evaluator 가 이 cascade 를 fire 가능한지.

### 검증 영역 (본 thread 외)
- `src/types/narrativeTrigger.ts` schema 확인 (지원되면 사용 OK / 미지원이면 schema 변경 영역 → 공통 CT thread 보고)
- runtime evaluator (`src/engine/` 또는 `src/store/slices/`) 의 cascade 평가 logic 확인

### 사용자 결정 영역 (schema 지원 가정)

- 옵션 A: **현재 dispute priorCard 유지** (d-2 fire 시 cascade — d-2 가 surface dispute 이므로 사건 초기부터 cascade 발동)
- 옵션 B: **evidence/dossier priorCard 로 변경** — 예: `requirePriorCardFired: 'dc-2'` (예비신랑 선 넘기 reframe 후) + d-2 S3+ 추가
- 옵션 C: **priorCard 영역 자체 폐기** + cascade type 자체 변경 (다른 type 으로 전환)

---

## Issue 6: emotional_outburst partyPhase 일관성

### 증상
10개 outburst candidate 의 partyPhase 분기 기준 불명확.

| candidate | partyPhase | dispute 게이트 | 비고 |
|---|---|---|---|
| dc1-via-outburst-a | [shaken, angry] | d-1 S1+ | |
| e4-via-outburst-b | [shaken, angry] | d-2 S0+ | |
| e5-via-outburst-a | [shaken, angry] | d-2 S2+ | |
| dc3-via-outburst-a | **[shaken] only** | d-3 S0+ | A 가 진실 발견 시점 = 충격, 분노 단계 X |
| d3-via-outburst-a | [shaken, angry] | d-2 S3+ | |
| e6-via-outburst-a | [shaken, angry] | d-3 S2+ | |
| dc4-via-outburst-a | [shaken, angry] | d-4 S0+ | |
| d4-via-outburst-a | [shaken, angry] | d-3 S3+ | |
| e7-via-outburst-b | **[shaken] only** | d-4 S3+ | B 가 패턴 인지 시점 = 충격만 |
| dc5-via-outburst-a | **[shaken] only** | d-5 S2+ | A 가 매도 책임 인지 시점 = 충격만 |
| d5-via-npc-a (npc_interjection) | [shaken, defensive] | d-3 S3+ + d-4 S3+ | npc 타입에 defensive 분기 |

### 분석
- `[shaken] only` = 진실/패턴 인지 시점 (감정 폭발 X, 충격만). 의도 = 「같은 부탁」 (dc-3) / 「두 시점 대조표」 (e-7) / 「낙인의 순서」 (dc-5) = 사건 후반 충격 frame.
- `[shaken, angry]` = 분노까지 포함된 격앙 frame.
- 분기 기준 명확화 + 일관성 검토 필요.

### 사용자 결정 영역

- 옵션 A: **현재 분기 유지** (충격 only vs 충격+분노 의도적 차별)
- 옵션 B: **일관 정책** — 모든 outburst 를 `[shaken, angry]` 통일
- 옵션 C: **시점 별 분기 정밀화** — dispute hidden 진입 직후 = `[shaken]` only / surface dispute progression = `[shaken, angry]`

---

## Issue 7: 「김세라」(w-1) `w1-via-npc-b-context` frame 정합

### 증상

```typescript
{
  id: 'w1-via-npc-b-context',
  type: 'npc_interjection',
  source: 'b',  // ⚠️ B 가 발화
  preconditions: {
    disputeLieState: { 'd-1': 'S1+' },
    contextAction: 'question.fact_pursuit.b',  // ⚠️ B 가 추궁받는 중
  },
}
```

### 분석
- 「김세라」(w-1) = `bias: 'pro_a'` + `distortionRisk: 'strategic'` (단톡방 동조자 — A 쪽 증인).
- 본 candidate 는 B 가 추궁받을 때 B 가 직접 「김세라」를 언급하는 끼어들기 frame.
- B 의도 = "단톡방 분위기를 자기에게 불리하게 만든 증인 (김세라) 을 끌어내고 싶다" 또는 "단톡방 동조자 신뢰성 의문 제기" — 자연 frame.
- 단 다른 witness candidate (w-2 / w-3) = `question.fact_pursuit.a` (A 가 추궁받을 때 B 가 끼어듦) — 반대 frame. 일관성 검토.

### 사용자 결정 영역

- 옵션 A: **현재 frame 유지** (B 가 자기 추궁받을 때 「김세라」를 끌어내어 단톡방 동조자 신뢰성 의문 제기)
- 옵션 B: **frame 변경** — A 추궁 시 B 끼어들기 (`contextAction: question.fact_pursuit.a`) — w-2/w-3 와 일관
- 옵션 C: **재판관 의문 frame** — npc 가 아니라 judge_auto 차단

---

## Issue 8: 「먼저 넘은 선」(dc-2) cross-line linkedDisputes=['d-1','d-2'] narrative trigger 정합

### 증상
- dc-2 linkedDisputes=['d-1', 'd-2'] (cross-line 의도)
- narrative trigger 4 candidate 중 cascade (dc-1) = d-1 S0+ gate. 다른 3 candidate (combo / npc-b-interject / judge-auto) = d-2 영역 또는 dispute 없음.

| candidate | dispute 영역 |
|---|---|
| dc2-via-combo | d-2 S0+ |
| dc2-via-cascade | **d-1 S0+** |
| dc2-via-npc-b-interject | d-2 S0+ |
| dc2-via-judge-auto | (dispute 없음) |

### 분석
- d-2 line 진입 시점 (예: 예비신랑 선 넘기 인정) dc-2 narrative event 발동 = `dc2-via-combo` (combine-2 fire).
- d-1 line 진입 시점 (외부 frame 인정) dc-2 narrative event 발동 = `dc2-via-cascade` (dc-1 fire 후).
- 단 dc-2 first-fire 후 다른 line 진입 시 dc-2 가 narrative event 다시 발행하지 않음.
- 의도 = cross-line dossier 가 한 번만 surface 되는 게 자연 / 또는 line 별 다시 surface 강화 필요?

### 사용자 결정 영역

- 옵션 A: **현재 구조 유지** (cross-line dossier first-fire 후 다른 line 영역은 dispute progression 으로 자연 진행)
- 옵션 B: **d-2 진입 강화 candidate 추가** (cross-line cascade — d-1 fire 후 d-2 진입 시 dc-2 narrative event 다시 발동)
- 옵션 C: **cross-line linkedDisputes 자체 검토** (dc-2 가 정말 d-1 line 영역인지 사건 흐름상 의문)

---

## Issue 9: 「두 시점 대조표」(e-7) / 「낙인의 순서」(dc-5) cross-line d-1 진입 누락

### 증상
- e-7 `proves: ['d-5', 'd-1']` (cross-line 의도)
- dc-5 `linkedDisputes: ['d-1', 'd-5']` (cross-line 의도)
- 단 narrative trigger 모두 d-4 line 또는 d-5 line 영역만 cover. d-1 cross-line 진입 시점 narrative event 없음.

| candidate | dispute 영역 |
|---|---|
| e7-via-cascade-d4 | d-4 S3+ |
| e7-via-cascade-w3 | d-4 S3+ |
| e7-via-outburst-b | d-4 S3+ |
| e7-via-fallback | (dispute 없음) |
| d5-via-cascade-e7 | d-4 S3+ |
| d5-via-cascade-dc4 | d-3 S3+ + d-4 S3+ |
| d5-via-npc-a | d-3 S3+ + d-4 S3+ |
| d5-via-fallback | (dispute 없음) |
| dc5-via-cascade-d5 | (dispute 없음) |
| dc5-via-combo | d-5 S0+ |
| dc5-via-outburst-a | d-5 S2+ |
| dc5-via-fallback | (dispute 없음) |

### 분석
- d-1 line 진입 시점 (특히 d-1 S3 → S4 = 9일간 연락 의도 = 경고로 reframe) 「두 시점 대조표」(e-7) / 「낙인의 순서」(dc-5) 가 d-1 강화 narrative event 발동하지 않음.
- 사건 진실 frame 종합 (d-1 S5 = 두 사람 모두 진실 인정) 시점에 narrative event 가 어디서 발동되는지 검토 영역.

### 사용자 결정 영역

- 옵션 A: **현재 구조 유지** — d-1 cross-line 강화는 dispute progression 으로 자연 진행 / e-7 + dc-5 narrative event 는 d-5 line 영역에서만 발동
- 옵션 B: **d-1 reframe 강화 candidate 추가** (예: e-7-via-cascade-d1-reframe — d-1 S4+ 도달 + e-7 fired 시점 narrative event)
- 옵션 C: **e-7 proves cross-line 자체 재검토** (d-5 single proves 로 변경하면 narrative 정합)

---

## Issue 10: 「박준혁」(w-2) / 「오미경」(w-3) cascade dispute 게이트 없음

### 증상

| candidate | precondition |
|---|---|
| w2-via-cascade | `requirePriorCardFired: dc-2` (dispute 없음) |
| w2-via-cascade-dc3 | `requirePriorCardFired: dc-3` (dispute 없음) |
| w3-via-cascade | `requirePriorCardFired: dc-4` (dispute 없음) |
| w1-via-cascade | `requirePriorCardFired: dc-1` (dispute 없음) |
| (비교: dc3-via-cascade) | `requirePriorCardFired: e-5` + d-3 S0+ |
| (비교: d4-via-cascade) | `requirePriorCardFired: dc-4` + d-3 S3+ |

### 분석
- witness cascade 4개 모두 dossier priorCard 만, dispute 게이트 없음.
- 의도 = dossier surface = 증인 호출 가능 시점 (judgeHint 영역에서 위트니스 활성). dossier fire 자체가 dispute 가 충분히 진행된 상태이므로 dispute 게이트 추가 X 의도 가능.
- 다른 cascade 는 모두 dispute 게이트 추가 (영역 강화).

### 사용자 결정 영역

- 옵션 A: **현재 구조 유지** (witness 는 dossier 만으로 충분한 게이트)
- 옵션 B: **dispute 게이트 추가** (cross-case 일관 — w-1 = d-1 S2+ / w-2 = d-2 S2+ + d-3 S0+ / w-3 = d-4 S0+)

---

## Issue 11: 「예비신랑 연락 기록」(e-1) initial surface 의 d-1 진입 narrative event 부재

### 증상
- e-1 = baseEvidenceIds (사건 시작 시 player 보유)
- d-1 = surface dispute (사건 시작 시 surface)
- 사건 시작 직후 첫 turn (player 가 e-1 을 b 에게 제시) 시점 narrative event 없음

### 분석
- spouse-01 의 「영수증 묶음 5장」(e-1) stage 3 → 「출산 준비 도서」(e-10) cascade 는 Hybrid hook 영역 (C-3c).
- friend-01 의 e-1 은 Hybrid hook 영역 없음 + narrative wrapper 0. 즉 e-1 첫 사용 시점 narrative event 자체 미발동.
- 의도 = 사건 시작 시 player 가 「예비신랑 연락 기록」 을 첫 진술에 사용 → 그 시점 narrative event 가 d-1 frame 강화 / 또는 dc-1 cascade 진입 필요?

### 사용자 결정 영역 (Issue 1 과 통합 가능)

- 옵션 A: **현재 구조 유지** (e-1 은 단순 evidence — 첫 사용 시 narrative event 불필요)
- 옵션 B: **e-1 stage 또는 첫 evidence_present.b 시점 narrative event 추가** (예: dc-1 cascade 영역 진입 강화)
- 옵션 C: **Hybrid hook 영역 신설** (spouse-01 C-3c 패턴) → 단 공통 CT thread 영역 (useActionDispatch.ts 변경 필요)

---

## Issue 12: judge_auto fallback turnsAfterEligible 일관성

### 증상
- 15개 모든 judge_auto candidate 가 `turnsAfterEligible: 5` 일관.
- spouse-01 (turnsAfterEligible 2~5 차등) 과 다른 정책.

### 분석
- 일관 정책 = 모든 entity 5턴 fallback. 단순.
- 차등 정책 (spouse-01) = entity 별 우선순위 표현.

### 사용자 결정 영역

- 옵션 A: **현재 일관 유지** (friend-01 사건 흐름 단순 / 5턴 일관이 자연)
- 옵션 B: **차등 도입** — chain 종점 entity (dc-5 / d-5) 는 5턴 / chain 중간 entity 는 짧게 (3-4턴) / 핵심 reframe entity (dc-2 / dc-3 / dc-4) 는 5턴

---

## 종합 — 재설계 결정 사안

본 thread 재설계 시 사용자 결정 필요:

1. **e-1/e-2/e-3 narrative wrapper 부착 여부** (Issue 1)
2. **combine-5/6/9/10 narrative trigger 추가 여부** (Issue 2)
3. **「오미경」(w-3) `w3-via-npc-b-context` contextAction 정밀화 vs 폐기** (Issue 3)
4. **「예비신랑 메시지와 답장」(e-4) `e4-via-outburst-b` broad 정밀화** (Issue 4)
5. **「떠벌림 흔적과 9일간 메시지」(e-5) `e5-via-cascade` dispute priorCard 처리** (Issue 5)
6. **emotional_outburst partyPhase 일관성** (Issue 6)
7. **「김세라」(w-1) `w1-via-npc-b-context` frame 정합** (Issue 7)
8. **「먼저 넘은 선」(dc-2) cross-line narrative event 강화** (Issue 8)
9. **「두 시점 대조표」(e-7) / 「낙인의 순서」(dc-5) d-1 cross-line 강화** (Issue 9)
10. **witness cascade dispute 게이트 일관** (Issue 10)
11. **「예비신랑 연락 기록」(e-1) 첫 사용 narrative event** (Issue 11)
12. **judge_auto fallback turnsAfterEligible 차등 도입 여부** (Issue 12)

추가:
- **사건 흐름 정합** — Chain A (단톡방 frame) → Chain B (예비신랑 선 넘기 reframe) → Chain C (아버지 돈 접근 패턴) → Chain D (매도 책임 종합). 진실 노출 정책 [[design-friend01-truth-disclosure-policy]] 와의 정합.
- **재판관 어법 정책** — schema 자체 영향 X, 단 신규 candidate 도입 시 ScriptedText 작성 영역에서 [[feedback-judge-dispassionate-action-focused]] 정책 준수 (다음 thread 영역).
- **schema 변경 필요 영역** — Issue 5 (dispute priorCard cascade) 가 schema 지원되는지 검증 후, 미지원 시 schema 변경 영역 → 공통 CT thread 보고. 본 thread 는 schema 변경 X.
