# 모순 토큰 쟁점별 분리 — 설계 문서

> 발신: Plan 스레드 (설계 전용, 코드 변경 無)
> 수신: CT → 이후 Codex 구현 세션
> 일시: 2026-04-28
> 베이스 커밋: `8d18a39`
> 산출물: `tmp/plan-contradiction-tokens-split.md` (본 문서)

---

## 섹션 1. 현 구조 파악

### 1-1. `QuestionMeterState` 타입 위치

⚠️ 지침 문서의 "src/types/..." 기대와 달리 **타입은 엔진 모듈 안에 있음**.

[src/engine/questionEffectEngine.ts:44-56](src/engine/questionEffectEngine.ts#L44-L56)

```ts
export interface QuestionMeterState {
  /** 모순토큰: 사실추궁 연속 성공 횟수 (0~5) */
  contradictionTokens: number
  /** 누설미터: 동기탐색 누적 압박 (0~100) */
  leakMeter: number
  /** 신뢰창구: 공감접근 누적 신뢰 (0~100) */
  trustWindow: number
  /** 마지막 질문 유형 (연속 보너스 추적) */
  lastQuestionType: QuestionType | null
  /** 연속 같은 유형 질문 횟수 */
  consecutiveSameType: number
}
```

`createInitialMeterState()` [같은 파일 100-108]:
```ts
return { contradictionTokens: 0, leakMeter: 0, trustWindow: 0, lastQuestionType: null, consecutiveSameType: 0 }
```

**이 설계안이 건드릴 지점**: 타입에 `contradictionTokensByDispute` 필드 추가 + 초기화 로직.

### 1-2. 스토어 초기화 / reducer / 저장

[src/store/useGameStore.ts](src/store/useGameStore.ts)

- 192: 필드 선언 `questionMeters: { a: QuestionMeterState; b: QuestionMeterState }`
- 401, 709: 초기화 `createInitialMeterState()` 2군데 (스토어 생성 / initializeCase 리셋)
- 404-417: `applyQuestionEffect` — 엔진 호출 → 결과를 `set({ questionMeters: { ...state.questionMeters, [party]: updatedMeter } })`
- 586: `meters: s.questionMeters` — TurnSnapshot에 실어 이벤트 평가에 전달
- 79-120: `applyPerks` — 미터 직접 조작 (startLeakBoost만; contradictionTokens는 안 건드림)
- 835: persist 범위에 `questionMeters` 포함 → sessionStorage + localStorage 저장

**변경 지점**: 초기화 2곳 + persist 호환 처리 + (안에 따라) reducer 분기.

### 1-3. 엔진 — 모순 판정 / 토큰 증가

[src/engine/questionEffectEngine.ts](src/engine/questionEffectEngine.ts)

- 209-285: `resolveFactPursuit(party, disputeId, lieState, stance, meter, diminish)` — `disputeId`는 **이미 파라미터로 받음** (line 211, 238-243의 timeline_lock effect에 사용)
- 233: `const newTokens = Math.min(meter.contradictionTokens + tokenGain, CONTRADICTION_MAX)` — **현재는 party global에 가산**
- 247-272: 토큰 수에 따른 부가 효과 (`lie_transition_bonus`, `defense_weaken` blockedMode=timeline_padding/flat_denial)
- 274-282: feedback 문자열 (`모순 N개 축적`)
- 445-475: `applyMeterUpdate` — `case 'fact_pursuit': updated.contradictionTokens = Math.min(prev.contradictionTokens + delta, CONTRADICTION_MAX)`, `case 'empathy_approach': updated.contradictionTokens = Math.max(prev.contradictionTokens - 1, 0)` (공감 시 1 감소)
- 191-203: `getMeterEffects(meter)` — `contradictionActive: meter.contradictionTokens >= 2`
- 502-524: `computeEffectiveness(..., contradictionTokens, ...)` — cold_logic weak narrowing (`< 2`)

**변경 지점**:
- `QuestionMeterState` 타입 + 초기화
- `resolveFactPursuit` 내 읽기/쓰기 대상 전환 (`meter.contradictionTokens` → `meter.byDispute[disputeId]`)
- `applyMeterUpdate`에 `disputeId` 파라미터 추가 (empathy 감소도 현재 쟁점에만)
- `getMeterEffects` / `computeEffectiveness` 호출부는 `disputeId` 인자 혹은 "현 쟁점 기준" 읽기로 전환

### 1-4. useActionDispatch — 토큰 누적 + 전이 트리거

⚠️ **중요 발견**: [src/hooks/useActionDispatch.ts:74](src/hooks/useActionDispatch.ts#L74) 에 **이미 쟁점별 모듈 레벨 카운터가 존재함**:

```ts
const _contradictionTokens: Record<string, number> = {}  // key: `${party}:${disputeId}:contradiction`
```

[src/hooks/useActionDispatch.ts:709-752](src/hooks/useActionDispatch.ts#L709-L752) fact_pursuit 분기:
```ts
const contradictionKey = `${action.target}:${action.disputeId}:contradiction`
const prevTokens = _contradictionTokens[contradictionKey] ?? 0
const tokenGain = affinityGrade === 'strong' ? 2 : 'weak' ? 0.5 : 1
const newTokens = prevTokens + tokenGain
const threshold = currentLieState <= 'S1' ? 2 : 3   // 임계 도달 시 전이 시도
_contradictionTokens[contradictionKey] = newTokens
if (newTokens >= threshold) {
  _contradictionTokens[contradictionKey] = 0  // 리셋
  state.transitionLie(...)
}
```

**즉 게임 내부에 동일 개념의 두 카운터가 공존 중**:
1. `useActionDispatch._contradictionTokens[party:disputeId]` — 전이 트리거용, 리셋됨, 세이브 안 됨, **이미 쟁점별**
2. `store.questionMeters[party].contradictionTokens` — UI / 이벤트 트리거 / dossier 해금용, 영구 누적(최대 5), 세이브됨, **party global**

**변경 지점**: (2)를 쟁점별로 바꾸면 (1)과 자연스럽게 개념 정렬. 단, (1)은 "임계 도달 시 0 리셋"하는 단발 트리거용이므로 (2)의 누적 최대 5 카운터와는 성격 다름. → **통합 여부는 Codex 구현 시 별도 판단** (본 설계에선 (2)만 쟁점화, (1)은 그대로 유지).

### 1-5. lieStateMachine — S5 트리거

[src/engine/lieStateMachine.ts](src/engine/lieStateMachine.ts)

**contradictionTokens를 직접 참조하지 않음**. S5 승격 경로:
- 27-37: `collapseViaTrust` + trust ≥ voluntaryConfession + empathy/trust trigger → S5
- 103-111: LM-3 제3자 보호 → S3→S5
- 114-121: LM-7 관계 유지 + 신뢰 → S4→S5
- 44-55: config.transitions 매칭
- 58-63: hard_evidence → 1단계 진행
- 68-78: V4 폴백 — 모든 질문 trigger는 1단계 전이 허용

**즉, 지침이 말한 "contradictionTokens >= 5 → S5"는 lieStateMachine에 없음.**
대신 contradictionTokens는 `gameEventTriggerEngine`에서 "모순 이벤트" 발화용으로 사용되고, 이벤트 처리 시 `lie_advance` deferredEffect로 1-2단계 전이를 유도.

### 1-6. gameEventTriggerEngine — 모순 이벤트

[src/engine/gameEventTriggerEngine.ts:107](src/engine/gameEventTriggerEngine.ts#L107): `const CONTRADICTION_MIN_TOKENS = 3`

[189-247] `checkContradiction(snapshot)`:
```ts
if (snapshot.meters[party].contradictionTokens < CONTRADICTION_MIN_TOKENS) return null
// ...
const severity = snapshot.meters[party].contradictionTokens >= 5 ? 'critical'
  : snapshot.meters[party].contradictionTokens >= 4 ? 'major' : 'minor'
const deferredEffects = [
  { type: 'lie_advance', party, disputeId: snapshot.focusDisputeId, steps: severity === 'critical' ? 2 : 1 },
  { type: 'emotion_spike', party, delta: severity === 'critical' ? 15 : 8 },
]
if (severity === 'critical') deferredEffects.push({ type: 'block_defense', party, mode: 'flat_denial' })
const eventIdx = Math.min(snapshot.meters[party].contradictionTokens - CONTRADICTION_MIN_TOKENS, contradictions.length - 1)
```

focusDisputeId는 이미 있음 → 쟁점별 토큰 읽기 단순 치환 가능.

### 1-7. UI — 쟁점별 pip 컴포넌트

[src/components/pc/panels/PCRightPanel.tsx:657-674](src/components/pc/panels/PCRightPanel.tsx#L657-L674):
```tsx
const targetMeters = questionMeters[pcTargetParty]  // line 72
// ...
<div className="pc-target-contradiction">
  <div className="pc-target-contradiction__pips">
    {[0, 1, 2, 3, 4].map((i) => (
      <span className={`pc-target-contradiction__pip${i < targetMeters.contradictionTokens ? ' is-filled' : ''}`} />
    ))}
  </div>
  <span>{targetMeters.contradictionTokens} / 5</span>
</div>
```

**문제 재현**: 쟁점 nav로 다른 쟁점 돌아가도 `targetMeters.contradictionTokens` 단일 숫자만 읽음 → 모든 쟁점에 동일 pip. 근처 `activeDispute` 변수 존재 (line 77-82) → `targetMeters.byDispute[activeDispute.id]` 참조로 5줄 수정이면 충분.

[src/components/pc/hotbar/PCBottomDock.tsx:253](src/components/pc/hotbar/PCBottomDock.tsx#L253): `const contradiction = questionMeters[pcTargetParty].contradictionTokens` — 이건 **dock 표시용으로 현 쟁점이 아닌 "최대값" 의미에 가까움**. 설계 고려 필요 (섹션 3).

### 1-8. 기타 참조 지점 (side effects)

- [meterStagingV2.ts:113-119](src/engine/meterStagingV2.ts#L113): `getMeterHudModel` — `contradiction: { value: meters.contradictionTokens, max: 5, active: ≥2 }` (dossier 해금 HUD용)
- [ActionPanel.tsx:173](src/components/actions/ActionPanel.tsx#L173): `highestContradictionTokens: Math.max(metersA.contradictionTokens, metersB.contradictionTokens)` — dossier 해금 조건. 쟁점별로 바뀌면 **max(모든 party × 모든 dispute)** 로 정의 변경 필요.
- [ActionPanel.tsx:821](src/components/actions/ActionPanel.tsx#L821): 요약 라인 `모순 토큰: N개`
- [QuestionSelector.tsx:87](src/components/actions/QuestionSelector.tsx#L87): `computeEffectiveness(..., meters.contradictionTokens, ...)` — cold_logic weak 판정. 현재 타깃 쟁점 기준으로 읽어야 함.

---

## 섹션 2. 타입 변경안 — 2안 제시 + 권장

### 안 A — 추가 필드 (하위 호환)

```ts
export interface QuestionMeterState {
  contradictionTokens: number                            // 글로벌 (집계된 값, 하위 호환)
  contradictionTokensByDispute: Record<string, number>   // 쟁점별 신규 (SoT)
  leakMeter: number
  trustWindow: number
  lastQuestionType: QuestionType | null
  consecutiveSameType: number
}
```

- 장점: 외부 참조(dossier 해금, cold_logic 판정) 수정 최소. `contradictionTokens`를 `sum/max(byDispute)`로 유지.
- 단점: 두 필드 동기화 책임 (모든 쓰기에서 두 군데 갱신). localStorage 호환은 쉬움 (없으면 `{}`).

### 안 B — 전면 교체 (Record만)

```ts
export interface QuestionMeterState {
  contradictionTokens: Record<string, number>  // 쟁점별 SoT
  // 글로벌이 필요하면 합산/최댓값 헬퍼로 도출
  // getTotalContradiction(meter) / getMaxContradiction(meter)
  ...
}
```

- 장점: 단일 진실 원천, 중복 없음, 개념 명확.
- 단점: **모든 참조 수정 필요** (ActionPanel dossier, QuestionSelector, meterStagingV2, PCBottomDock, ActionPanel summary). localStorage 구 데이터(number) → Record 변환 마이그레이션 필수.

### 권장: **안 A**

**근거** (200자+):
현재 `contradictionTokens`를 읽는 지점이 8군데(UI 3, 엔진 3, 훅 2)인데, **참조 의도가 두 부류로 쪼개짐**: ① "현재 쟁점의 상태" (PCRightPanel pip, QuestionSelector cold_logic 판정) → 쟁점별로 바뀌어야 함; ② "당사자 전체의 압박 강도 집계" (dossier 해금의 `Math.max(A, B)`, ActionPanel 요약, PCBottomDock 헤드라인) → 계속 집계값이 필요함. 안 B로 전면 교체하면 모든 ② 참조에 매번 `getMaxContradiction(meter)` 헬퍼 호출을 삽입해야 하고, 각 호출처에서 "sum이냐 max냐" 의사결정이 분산됨. 안 A는 쓰기 지점 2곳(engine `resolveFactPursuit` + `applyMeterUpdate`)에서 **byDispute 먼저 갱신 → 이를 근거로 글로벌 필드 `Math.max(Object.values(byDispute))` 재계산**이라는 단일 규약으로 동기화가 결정론적이며, ① 소비처만 `byDispute[disputeId]`로 바꾸면 끝. 또한 섹션 4의 S5 조건 재설계와도 독립적 (섹션 4는 byDispute 위에 얹음). 섹션 5 마이그레이션도 기존 number 값을 글로벌 필드에 그대로 둔 채 byDispute만 빈 맵으로 시작하면 자연스럽게 수렴함.

---

## 섹션 3. 엔진 수정 지점 (파일별 상세)

| # | 파일 | 현재 | 변경 후 | 라인 | 위험도 |
|---|---|---|---|---|---|
| 1 | `src/engine/questionEffectEngine.ts` | 타입 + fact_pursuit 증가 + empathy 감소 + getMeterEffects | `contradictionTokensByDispute` 추가, `resolveFactPursuit`는 byDispute[disputeId] 증가 후 글로벌 = max(byDispute), `applyMeterUpdate(meter, qType, delta, consec, disputeId)` 시그니처 확장, `getMeterEffects(meter, disputeId?)` 오버로드 | ~40 | Medium |
| 2 | `src/store/useGameStore.ts` | 초기화 2곳 + persist | `createInitialMeterState()`가 byDispute도 `{}`로 초기화. persist 하이드레이션 시 byDispute 없으면 `{}` 보정 | ~10 | Low |
| 3 | `src/hooks/useActionDispatch.ts` | module-level `_contradictionTokens`는 이미 쟁점별 (단발 트리거용). empathy 감소 경로 확인 필요 | 변경 없음 (기존 모듈 레벨 카운터는 전이 트리거 용도로 유지). 단, `applyQuestionEffect` 호출은 engine이 알아서 byDispute 갱신하므로 추가 작업 無 | ~0 | Low |
| 4 | `src/engine/gameEventTriggerEngine.ts` | `snapshot.meters[party].contradictionTokens` 3회 참조 | `snapshot.meters[party].contradictionTokensByDispute[snapshot.focusDisputeId] ?? 0` 로 교체 | ~5 | Medium (severity 계산 의미 변경) |
| 5 | `src/engine/lieStateMachine.ts` | tokens 직접 참조 無 | **변경 없음** | 0 | — |
| 6 | `src/components/pc/panels/PCRightPanel.tsx` | line 667, 672 `targetMeters.contradictionTokens` | `targetMeters.contradictionTokensByDispute[activeDispute?.id ?? ''] ?? 0`; 변수화 후 2곳 치환 | ~5 | Low |
| 7 | `src/components/pc/hotbar/PCBottomDock.tsx` | line 253 `questionMeters[pcTargetParty].contradictionTokens` | **의미 결정 필요**: 현 쟁점 값이냐, 글로벌 최대값이냐. 권장: 글로벌(=`contradictionTokens` 집계 필드 그대로 유지) | ~1 | Low |
| 8 | `src/engine/meterStagingV2.ts` | line 115 HUD 모델 | dossier HUD는 "전체 압박" 의미 → 글로벌 필드 그대로 유지 | 0 | Low |
| 9 | `src/components/actions/ActionPanel.tsx` | line 173 max(A, B), 821 요약 | 글로벌 필드 그대로 사용 | 0 | Low |
| 10 | `src/components/actions/QuestionSelector.tsx` | line 87 `meters.contradictionTokens` → cold_logic 판정 | 타깃 쟁점 기준으로 교체: 현재 질문 대상 쟁점 ID를 받아서 byDispute[id] 참조. useActionDispatch dispatch 시 `action.disputeId` 이미 있음 → QuestionSelector는 타깃 쟁점 ID 이미 보유 (focusDispute) | ~3 | Medium |

**총 파일 9개, 추정 ~65줄 수정.**

---

## 섹션 4. S5 붕괴 조건 재설계

### 현 실태 재확인

**지침이 가정한 "`contradictionTokens >= 5` → S5 글로벌"은 실제로 존재하지 않음** (섹션 1-5 참고). 현재 S5 승격은 다음 경로들:

1. trust ≥ voluntaryConfession + collapseViaTrust + empathy/trust trigger
2. 동기별 스킵 (LM-3, LM-4, LM-7)
3. `config.transitions` 규칙에 따라 단계적 승격
4. 하드 증거 `lie_advance` effect
5. **contradiction 이벤트의 deferredEffect** — `gameEventTriggerEngine.checkContradiction` → `lie_advance` (1단계, critical이면 2단계)

→ 즉 "contradictionTokens ≥ 5"는 **5번 경로의 critical severity 판정 기준**이지 S5 직접 전환은 아니다. 본 설계에서 "S5 붕괴 조건"은 **"당사자 특정 쟁점에서 contradiction 이벤트가 발화되기 위한 임계값"**으로 재정의함.

### 안 A — 쟁점별 독립 (쟁점 단위로 severity 판정)

```ts
const tokens = meters[party].contradictionTokensByDispute[focusDisputeId] ?? 0
if (tokens < CONTRADICTION_MIN_TOKENS) return null  // 3
const severity = tokens >= 5 ? 'critical' : tokens >= 4 ? 'major' : 'minor'
```

- 장점: **가장 자연스러움**. UI pip과 게임 로직이 완전히 정합 (쟁점 A에서 5번 추궁해서 pip 5칸 채웠으면 그 쟁점에서 critical 발화).
- 단점: 임계 도달이 "쟁점 하나"에 국한 → 여러 쟁점을 흩뿌려 공략한 플레이어에게 불리 (각 쟁점 2씩 쌓아도 critical 안 뜸).
- 게임플레이: "집중 공략"을 보상. [design_v4_action_differentiation.md](.claude/memory/design_v4_action_differentiation.md)의 "모순 집중" 전략과 정합.

### 안 B — 글로벌 합산 (sum) 유지

```ts
const total = Object.values(byDispute).reduce((a,b)=>a+b, 0)
if (total < 3) return null
severity = total >= 5 ? 'critical' ...
```

- 장점: 현재 밸런스 보존 (실제 체감 동일).
- 단점: 쟁점별 UI와의 정합이 깨짐 — "어떤 쟁점에서 모순인가"가 모호. deferredEffect `lie_advance`의 `disputeId`는 focusDisputeId 기준이지만 임계 달성은 다른 쟁점의 축적으로 끌어올 수 있음 → 부자연.

### 안 C — 혼합 (쟁점별 임계 + 글로벌 완화)

```ts
const disputeTokens = byDispute[focusDisputeId] ?? 0
const globalMax = Math.max(0, ...Object.values(byDispute))
// 쟁점별 ≥3 또는 글로벌 max ≥4 + focus dispute deny/hedge
if (disputeTokens < 3 && globalMax < 4) return null
severity = disputeTokens >= 5 ? 'critical' : disputeTokens >= 4 ? 'major' : globalMax >= 5 ? 'major' : 'minor'
```

- 장점: 흩뿌린 플레이어도 글로벌 max 경로로 완화 적용.
- 단점: 임계값 튜닝 복잡, 설명 난해, QA 난도↑.

### 권장: **안 A**

**근거** (250자+):
문제의 출발점이 "UI는 쟁점별인데 데이터는 글로벌이라 어떤 쟁점이든 pip이 같이 찬다"는 **정합성 붕괴**였다. 안 B는 UI 참조만 byDispute로 바꾸고 이벤트 판정은 글로벌이므로 "pip이 4칸 차 있는데 critical이 안 뜨는" 새로운 정합 실패를 만든다. 안 C는 완화 경로가 있지만 두 임계값(쟁점 3/글로벌 4)을 플레이어가 역추적해야 의미를 이해할 수 있어 UX 부담이 큼. 안 A는 **게임 언어가 단순**하다: "한 쟁점에서 모순을 쌓아라, pip이 차면 critical이 뜬다". [design_v4_action_differentiation.md](.claude/memory/design_v4_action_differentiation.md)의 "모순 집중" 전략, [feedback_judge_question_quality.md](.claude/memory/feedback_judge_question_quality.md)의 "질문이 의미 있는 피드백을 주어야 함"과도 정합. 밸런스 우려(흩뿌린 플레이어 불리)는 그 자체가 "집중 공략을 학습시키는" 의도된 신호이며, 만약 현 QA에서 과하게 어려우면 `CONTRADICTION_MIN_TOKENS` 상수를 2로 낮추는 식으로 미세 조정 가능 (구조 변경 없음). useActionDispatch 내 모듈 레벨 `_contradictionTokens`가 이미 `party:disputeId` 키로 per-dispute 누적→임계→전이→리셋을 하는 방식과도 개념적으로 정렬된다.

**부가 결정**:
- `empathy_approach` 시 `applyMeterUpdate`의 `contradictionTokens -= 1`은 **현재 focus disputeId에만** 적용 (쟁점별).
- `lie_advance` deferredEffect의 `disputeId`는 지금도 `snapshot.focusDisputeId`이므로 변경 없음.

---

## 섹션 5. 마이그레이션 전략

### 영향 저장소
- **localStorage `solomon-history`** (최대 100건 caseTelemetry) — 과거 `contradictionTokens: number`가 저장되어 있을 가능성. 주로 **완료된 사건의 요약**이므로 실전 게임플레이 재진입에 쓰이지 않음.
- **sessionStorage (SAVE_KEY)** — 진행 중인 게임 세이브. 플레이 재개 시 하이드레이션 대상.
- **localStorage `solomon-judge-progression`** — 영향 없음.

### 안 X — 구 데이터 폐기, 기본값 초기화

하이드레이션 시 `contradictionTokensByDispute`가 없으면 `{}`로 보정. 기존 `contradictionTokens: number`는 그대로 두되 **byDispute는 빈 맵으로 시작** → 다음 fact_pursuit부터 쟁점별 누적 시작. 글로벌 필드는 쓰기 시 `Math.max(Object.values(byDispute))`로 재계산되어 자연스럽게 수렴.

### 안 Y — 구 글로벌 값을 쟁점별로 배분

옵션: 균등 분배 / 최우선 쟁점에 몰아넣기 / 방문한 쟁점 비례 (interrogationHistory 참조).

### 권장: **안 X**

**근거**: 세이브 하이드레이션은 거의 "동일 세션 새로고침" 용도이고, 진행 중에 모순 토큰이 3 이상 쌓인 상태로 갑자기 재개되는 확률이 낮음. 구 값이 있더라도 **글로벌 필드는 display 전용이 아니라 엔진이 byDispute로부터 재계산**하므로 다음 fact_pursuit 1회면 완전히 새 체계로 덮어쓰여짐 → 배분 로직(안 Y)을 구현·테스트할 가치가 실익 대비 낮음. caseTelemetry는 이미 종료된 사건의 기록이므로 과거 값이 그대로 남아도 기능적 의미 없음.

**구현 방향**:
```ts
// questionEffectEngine.ts — createInitialMeterState
return {
  contradictionTokens: 0,
  contradictionTokensByDispute: {},
  leakMeter: 0, trustWindow: 0, lastQuestionType: null, consecutiveSameType: 0,
}
// useGameStore.ts hydrate 시
if (!parsed.questionMeters.a.contradictionTokensByDispute) parsed.questionMeters.a.contradictionTokensByDispute = {}
if (!parsed.questionMeters.b.contradictionTokensByDispute) parsed.questionMeters.b.contradictionTokensByDispute = {}
```

---

## 섹션 6. 회귀 테스트 범위

| # | 항목 | 검증 방법 | 소요 |
|---|---|---|---|
| 1 | spouse-01 헤드리스 (쟁점 4개) | `node tests/run-84-headless.cjs --category spouse` 후 각 쟁점별 contradictionTokensByDispute 증가 확인 (로그에 덤프 추가 필요) | 10분 |
| 2 | friend-01 헤드리스 (쟁점 5개) | 위와 동일 (`--category friend`) | 10분 |
| 3 | family-01 헤드리스 | 동일 (쟁점 수 먼저 확인) | 10분 |
| 4 | UI 쟁점별 pip 차이 | 수동 `npm run dev` → spouse-01 → 쟁점 A 3회 추궁, 쟁점 B 1회 → 쟁점 nav 순회하며 pip 수 다른지 시각 확인 | 5분 |
| 5 | S5 승격 타이밍 | 안 A 기준: 한 쟁점 tokens ≥ 5 달성 시 gameEvent 'contradiction' severity='critical' 발화, lie_advance 2단계 적용됨을 dialogue log에서 확인 | 15분 |
| 6 | 세이브/로드 호환 | 모순 2개 쌓인 상태에서 새로고침 → 같은 쟁점 pip 2칸 유지, 다른 쟁점 0 유지 확인 | 5분 |
| 7 | 다수 쟁점 무간섭 | 쟁점 A 3개 쌓고 쟁점 B 공략 시 쟁점 A tokens 보존 확인 (empathy 감소는 현 쟁점만) | 5분 |
| 8 | 퍼크 "모순 감각" 상호작용 | `firstTargetContradictionBonus` 적용 후 첫 타깃/첫 쟁점에만 보너스 반영 (현 구현은 글로벌 무관) | 5분 |
| 9 | 퍼크 "논리의 눈" (Major, 모순 관련) | 있으면 동일 검증 | 5분 |
| 10 | 후일담/판결 점수 | verdictEngine이 contradictionTokens를 직접 참조하는지 grep 후 없으면 영향 無. 있으면 해당 계산 추적 | 10분 |
| 11 | dossier 해금 | ActionPanel.tsx line 173 `highestContradictionTokens = max(A.global, B.global)` 그대로 동작, 해금 타이밍 변하지 않음 | 5분 |
| 12 | cold_logic weak 판정 | QuestionSelector computeEffectiveness — 쟁점별 값으로 바꾼 후에도 weak→normal 승격 타이밍 자연스러움 | 5분 |
| 13 | 타입 체크 | `npx tsc -b --force` 에러 0 | 2분 |

**총 예상 QA 시간**: ~90분.

---

## 섹션 7. 구현 소요 예상

- **총 파일 수**: 6 (실제 코드 변경) + 1 (타입은 같은 파일 내)
- **총 변경 라인 수**: ~70줄
- **예상 시간**: 2.5~3.5시간 (엔지니어 1명)
- **권장 커밋 분할**:
  1. **타입 + 스토어 초기화 + persist 호환** — `questionEffectEngine.ts`의 `QuestionMeterState` / `createInitialMeterState`, `useGameStore.ts` 하이드레이션 보정
  2. **엔진 쓰기 전환** — `resolveFactPursuit` + `applyMeterUpdate(disputeId)` + empathy 감소 쟁점화, 글로벌 필드는 byDispute의 max로 재계산
  3. **이벤트/판정 읽기 전환** — `gameEventTriggerEngine.checkContradiction`, `QuestionSelector` cold_logic 판정
  4. **UI 참조 전환** — `PCRightPanel` pip (byDispute 읽기), 그 외 컴포넌트(PCBottomDock, ActionPanel, meterStagingV2)는 글로벌 필드 그대로 유지
  5. **회귀 수정** (발견 시)

---

## 섹션 8. 우선순위 / 블로커 / 병행 가능성

- **이 작업이 선행되어야 가능한 것**: 쟁점별 UX 폴리싱 (쟁점별 피드백 토스트, 쟁점별 dossier 조건 등)은 본 작업이 선행되어야 의미 있음.
- **이 작업을 블로킹하는 것**: 없음. 활성 3건(spouse-01/family-01/friend-01)과 무관하게 구조 변경.
- **병행 가능한 다른 작업**: ThreadQW v6 / Codex v6 / Family-Friend 재넘버링 / GPT Pro 증거 재작성 — 모두 데이터 레이어이므로 엔진/UI 변경과 충돌 없음.
- **베이스 커밋 8d18a39 기준 수정 파일 충돌 위험**:
  - `useGameStore.ts`는 작업자가 많음 → 커밋 분할 1번은 단독 작업 타이밍에 (다른 브랜치 없을 때).
  - `PCRightPanel.tsx`는 04-28 세션에서 수정된 영역 → 동일 세션 내에서만 충돌 가능.

---

## 섹션 9. 리스크 / 엣지 케이스

1. **disputeId 안정성**: `src/data/cases/generated/{cat}-{NN}.json`의 disputes[*].id는 정적. 런타임에 생성되는 케이스는 없음 → Record 키 안정.
2. **쟁점 숨김/해금**: `discovery.disputeVisibility` — hidden 쟁점은 byDispute 키로 존재할 수 없음 (초기 `{}`). 해금된 시점부터 쌓기 시작 → 문제 없음.
3. **empathy가 현 쟁점만 감소**: 현재는 party 글로벌 -1. 쟁점화하면 `focus disputeId`에만 -1. 공감 전에 현 쟁점이 없는 케이스(초기 phase)는 skip.
4. **퍼크 "모순 감각"/"firstTargetContradictionBonus"**: 현 구현은 engine 외부(`applyPerks`)에서 `perksState.firstTargetContradictionBonus`만 세팅 → 실제 적용 시점은 resolveFactPursuit 내부 별도 로직. grep으로 재확인 필요 (현 탐색에서 명시적 사용처 못 찾음 → Codex 구현 시 확인).
5. **재판관 질문 질 관리** ([feedback_judge_question_quality.md](.claude/memory/feedback_judge_question_quality.md)): 쟁점별 모순 피드백 문자열을 만들 때 "기계적 관찰문 금지" 규칙 준수. 현 feedback 문자열("모순 N개 축적")은 party 관점이므로 쟁점별로 바뀌어도 문제 없지만, 만약 쟁점 이름을 문자열에 끼우면 자연어 톤 유지 필요.
6. **글로벌 필드 의미 변경 고지**: `contradictionTokens`(글로벌)를 max(byDispute)로 재정의 → 과거는 party 내 누적이므로 **수치 의미는 유지**(모두 최대 5). 단, 쟁점 여러 개에 분산된 경우 글로벌 max가 덜 자랄 수 있음 → dossier 해금 타이밍이 살짝 늦춰질 수 있음. QA #11에서 확인.
7. **Codex 구현 경계**: 본 설계는 `_contradictionTokens` (useActionDispatch 모듈 레벨)는 건드리지 않음 명시. Codex가 "두 카운터를 합치자"는 유혹에 빠지지 않도록 CT에서 구두 강조 필요.

---

## 섹션 10. 결정 필요 항목 (CT/유저용)

- [ ] **섹션 4 S5 붕괴 조건**: Plan 권장은 **안 A (쟁점별 독립)**. 유저 OK?
  - 핵심 변화: "모순 이벤트 critical"이 "한 쟁점에 5회 모순 쌓기"로 엄격화. 흩뿌린 플레이어 체감 난이도↑.
- [ ] **섹션 5 마이그레이션 전략**: Plan 권장은 **안 X (구 데이터 폐기, 빈 맵 시작)**. 유저 OK?
- [ ] **PCBottomDock 표시 의미**: 현재 `questionMeters[pcTargetParty].contradictionTokens` 한 숫자. Plan 권장은 **글로벌 max 유지 (= 집계 필드 그대로)**. 유저가 "현 포커스 쟁점 기준으로 바꾸자"고 하면 1줄 수정.
- [ ] **`CONTRADICTION_MIN_TOKENS`(=3) 유지 여부**: 쟁점별로 바뀌면 "3회 집중 추궁해야 모순 이벤트"가 실효 요구치. 활성 3건 QA 후 2로 낮출지 재판단.
- [ ] **useActionDispatch `_contradictionTokens` 통합 여부**: Plan 권장은 **현 구조 유지(별도 카운터)**. 통합하려면 별도 설계 문서 필요.
- [ ] **`computeEffectiveness` 시그니처 변경 범위**: 쟁점별 값으로 바꾸려면 `contradictionTokens: number` 파라미터를 유지하되 호출측에서 `byDispute[focusDisputeId]`를 넘기는 방식이 가장 얇음. Codex가 시그니처를 `disputeId` 받는 형태로 바꾸려 하면 과설계.

---

## 요약

- 타입 변경: **안 A** (`contradictionTokensByDispute: Record<string, number>` 추가 + 글로벌 필드는 max로 동기화)
- S5/이벤트 조건: **안 A** (쟁점별 독립 severity)
- 마이그레이션: **안 X** (빈 맵으로 리셋, 글로벌 필드는 덮어쓰기 수렴)
- 수정 규모: 6~7개 파일, ~70줄
- 핵심 발견: useActionDispatch에 이미 쟁점별 카운터 존재 → 본 작업은 store 쪽 데이터만 쟁점화 (두 카운터 병존 유지)
- 지침의 "lieStateMachine 내 S5 조건"은 실재하지 않음 → gameEventTriggerEngine의 contradiction event severity로 재해석
