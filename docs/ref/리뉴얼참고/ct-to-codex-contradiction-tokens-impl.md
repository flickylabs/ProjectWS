# CT → Codex (신규 세션): 모순 토큰 쟁점별 분리 구현

> 발신: CT (Control Tower)
> 수신: **Codex** (신규 세션)
> 일시: 2026-04-28
> 베이스 커밋: `3410680`
> 선행 설계 문서: [tmp/plan-contradiction-tokens-split.md](../../../tmp/plan-contradiction-tokens-split.md) — **정독 필수**

---

## ⚠️ Codex 절대 주의사항

1. **시작 전 `git status` 확인**. Modified가 있으면 CT에 보고 후 대기 (Codex는 Modified 파일 투입 시 유실 사례 있음).
2. **커밋 금지**. 단계별로 CT에 보고 → CT가 일괄 커밋 (5단계 커밋 분할).
3. **대량 콘텐츠 생성 금지** (이번 작업은 텍스트 생성 無).
4. Hotfix 스크립트 실행 금지.

---

## 유저 확정 결정 사항 (이 지시서의 핵심)

Plan 스레드 설계 문서의 결정 3건을 유저가 모두 Plan 권장안으로 확정:

| 결정 | 선택 | 요지 |
|---|---|---|
| **결정 1 타입 구조** | **안 A (추가 필드)** | 기존 `contradictionTokens: number` **유지** (하위 호환) + 신규 `contradictionTokensByDispute: Record<string, number>` 추가 |
| **결정 2 S5 severity** | **안 A (쟁점별 독립)** | `gameEventTriggerEngine.checkContradiction` 이 focusDisputeId의 byDispute 값 기준으로 severity 판정 (≥3 minor / ≥4 major / ≥5 critical) |
| **결정 3 마이그레이션** | **안 X (빈 맵 리셋)** | 기존 세이브의 number 값은 폐기. 하이드레이션 시 `byDispute = {}` 초기화. 글로벌 number 필드는 다음 fact_pursuit 때 `Math.max(Object.values(byDispute))`로 자연 수렴 |

**파생값 규칙**: 글로벌 `contradictionTokens: number` = `Math.max(Object.values(contradictionTokensByDispute), 0)`. (Plan 리포트 섹션 5 권장. sum 아님 — max이어야 dossier 해금의 `Math.max(A, B)` 의미가 정합.)

---

## 배경 (30초)

UI의 "쟁점별 모순 pip 5칸"은 이미 완성인데, 데이터는 사람(party) 단위 글로벌 카운터 하나라서 모든 쟁점이 같은 pip 값을 표시하는 정합성 붕괴. 데이터도 쟁점별로 쪼개서 pip이 실제 쟁점별 진행도를 반영하게 만든다.

**중요 — Plan 스레드가 확인한 사실**:
- `QuestionMeterState` 타입은 `src/types/...`가 아니라 **`src/engine/questionEffectEngine.ts:44`** 내부 선언
- `lieStateMachine.ts`에는 `contradictionTokens >= 5 → S5 글로벌` 같은 조건 **없음**. 대신 `gameEventTriggerEngine.checkContradiction`이 severity 판정(≥3/≥4/≥5) 후 `lie_advance` deferredEffect로 1~2단계 전이
- `useActionDispatch.ts:74`의 모듈 레벨 `_contradictionTokens[party:disputeId]`는 이미 쟁점별이지만 **단발 전이 트리거용** (임계 도달 시 0 리셋). store의 "누적 최대 5"와 성격이 달라 **건드리지 않음**

---

## 참고 자료

- **[tmp/plan-contradiction-tokens-split.md](../../../tmp/plan-contradiction-tokens-split.md)** — 500줄 설계 문서. 각 섹션의 라인 인용 모두 정확함. **구현 시 이 문서가 우선 참조**
- [CLAUDE.md](../../../CLAUDE.md)
- 메모리 [backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) 2순위 섹션

---

## 변경 파일 매트릭스 (9 파일, ~65 라인)

Plan 문서 섹션 3 기준, 유저 결정 반영:

| # | 파일 | 변경 요지 | 예상 라인 | 위험도 | 커밋 단계 |
|---|---|---|---|---|---|
| 1 | `src/engine/questionEffectEngine.ts` | `QuestionMeterState`에 `contradictionTokensByDispute` 추가. `createInitialMeterState()` 초기화. `resolveFactPursuit` / `applyMeterUpdate` / `getMeterEffects` 쟁점별 로직 | ~40 | Medium | **1, 2** |
| 2 | `src/store/useGameStore.ts` | 초기화 2곳(401, 709) + persist 하이드레이션 보정 | ~10 | Low | **1** |
| 3 | `src/engine/gameEventTriggerEngine.ts` | `checkContradiction` 내 3회의 `meters[party].contradictionTokens` → `meters[party].contradictionTokensByDispute[snapshot.focusDisputeId] ?? 0` | ~5 | Medium | **3** |
| 4 | `src/engine/lieStateMachine.ts` | **변경 없음** (직접 참조 無) | 0 | — | — |
| 5 | `src/hooks/useActionDispatch.ts` | **변경 없음** (모듈 레벨 `_contradictionTokens`는 전이 트리거용으로 유지) | 0 | — | — |
| 6 | `src/components/pc/panels/PCRightPanel.tsx` | line 667, 672 `targetMeters.contradictionTokens` → `targetMeters.contradictionTokensByDispute[activeDispute?.id ?? ''] ?? 0` | ~5 | Low | **4** |
| 7 | `src/components/pc/hotbar/PCBottomDock.tsx` | line 253 — **글로벌 집계 의도 유지** → 파생 `contradictionTokens` 필드 그대로 참조 (변경 없음) | 0 | Low | — |
| 8 | `src/engine/meterStagingV2.ts` | line 115 — HUD dossier 글로벌 집계 의도 유지 → **변경 없음** | 0 | Low | — |
| 9 | `src/components/actions/ActionPanel.tsx` | line 173 `Math.max(A.contradictionTokens, B.contradictionTokens)` / line 821 요약 — **글로벌 필드 그대로 사용** (변경 없음) | 0 | Low | — |
| 10 | `src/components/actions/QuestionSelector.tsx` | line 87 `computeEffectiveness(..., meters.contradictionTokens, ...)` → 타깃 쟁점 기준으로 `contradictionTokensByDispute[focusDispute.id] ?? 0` | ~3 | Medium | **4** |

**총 실제 변경 파일 5개** (1, 2, 3, 6, 10) / 추정 ~65라인.

---

## 섹션 A. 타입 변경 (커밋 1)

**[src/engine/questionEffectEngine.ts](../../../src/engine/questionEffectEngine.ts)**

```ts
// Before (44-56)
export interface QuestionMeterState {
  contradictionTokens: number
  leakMeter: number
  trustWindow: number
  lastQuestionType: QuestionType | null
  consecutiveSameType: number
}

// After
export interface QuestionMeterState {
  /** 모순토큰 (글로벌 집계, 하위 호환) = max(Object.values(byDispute), 0) */
  contradictionTokens: number
  /** 모순토큰 쟁점별 SoT (Single Source of Truth) */
  contradictionTokensByDispute: Record<string, number>
  leakMeter: number
  trustWindow: number
  lastQuestionType: QuestionType | null
  consecutiveSameType: number
}
```

**`createInitialMeterState()` (100-108)**:
```ts
return {
  contradictionTokens: 0,
  contradictionTokensByDispute: {},
  leakMeter: 0,
  trustWindow: 0,
  lastQuestionType: null,
  consecutiveSameType: 0,
}
```

**헬퍼 추가** (같은 파일 내부):
```ts
/** byDispute → 글로벌 파생값 (max) */
export function deriveGlobalContradictionTokens(byDispute: Record<string, number>): number {
  const values = Object.values(byDispute)
  if (values.length === 0) return 0
  return Math.max(...values, 0)
}
```

---

## 섹션 B. 스토어 변경 (커밋 1)

**[src/store/useGameStore.ts](../../../src/store/useGameStore.ts)**

- line 401 / 709: `createInitialMeterState()` 호출은 그대로 (타입만 바뀌었으므로 자동 반영)
- line 835 persist: `questionMeters` 포함되어 있음 — **하이드레이션 시 byDispute 보정** 필요

`persist`의 `onRehydrateStorage` 또는 동등 콜백에서:
```ts
// 예시 — 정확한 API는 기존 persist 사용법 따름
onRehydrateStorage: () => (state) => {
  if (state?.questionMeters) {
    for (const party of ['a', 'b'] as const) {
      if (!state.questionMeters[party].contradictionTokensByDispute) {
        state.questionMeters[party].contradictionTokensByDispute = {}
      }
    }
  }
}
```

**구현 포인트**: persist 미들웨어가 `partialize` 또는 `merge`를 쓰고 있으면 그곳에서 보정. 기존 코드 구조 따를 것.

---

## 섹션 C. 엔진 쓰기 경로 변경 (커밋 2)

**[src/engine/questionEffectEngine.ts](../../../src/engine/questionEffectEngine.ts)**

### 1) `resolveFactPursuit(party, disputeId, ...)` — line 209~285

현재: `const newTokens = Math.min(meter.contradictionTokens + tokenGain, CONTRADICTION_MAX)`

변경:
```ts
const prevByDispute = meter.contradictionTokensByDispute[disputeId] ?? 0
const newByDispute = Math.min(prevByDispute + tokenGain, CONTRADICTION_MAX)
const nextByDispute = { ...meter.contradictionTokensByDispute, [disputeId]: newByDispute }
const newGlobal = deriveGlobalContradictionTokens(nextByDispute)

// 이후 로직에서 newTokens / meter.contradictionTokens 참조 → newByDispute 로 읽도록 전환
// (newTokens는 "이 쟁점에서의 토큰 수" 의미로 재해석)
```

부가 효과 판정(line 247-272: `lie_transition_bonus`, `defense_weaken`)은 **현 쟁점 기준**으로 동작하도록 `newByDispute` 사용. feedback 문자열(`모순 N개 축적`)도 `newByDispute` 기반.

### 2) `applyMeterUpdate(meter, qType, delta, consec, disputeId)` — line 445~475

시그니처에 `disputeId: string` 파라미터 추가 (호출부도 동시 수정).

```ts
case 'fact_pursuit': {
  const prevByDispute = prev.contradictionTokensByDispute[disputeId] ?? 0
  const newByDispute = Math.min(prevByDispute + delta, CONTRADICTION_MAX)
  updated.contradictionTokensByDispute = { ...prev.contradictionTokensByDispute, [disputeId]: newByDispute }
  updated.contradictionTokens = deriveGlobalContradictionTokens(updated.contradictionTokensByDispute)
  break
}
case 'empathy_approach': {
  // 공감은 현재 쟁점의 토큰만 1 감소
  const prevByDispute = prev.contradictionTokensByDispute[disputeId] ?? 0
  const newByDispute = Math.max(prevByDispute - 1, 0)
  updated.contradictionTokensByDispute = { ...prev.contradictionTokensByDispute, [disputeId]: newByDispute }
  updated.contradictionTokens = deriveGlobalContradictionTokens(updated.contradictionTokensByDispute)
  break
}
```

### 3) `getMeterEffects(meter, disputeId?)` — line 191~203

현재: `contradictionActive: meter.contradictionTokens >= 2`

변경: disputeId 선택 파라미터. 있으면 쟁점별, 없으면 글로벌.
```ts
export function getMeterEffects(meter: QuestionMeterState, disputeId?: string) {
  const tokens = disputeId
    ? (meter.contradictionTokensByDispute[disputeId] ?? 0)
    : meter.contradictionTokens
  return { contradictionActive: tokens >= 2, /* ... */ }
}
```

호출부: 판정 의도가 "현재 타깃 쟁점 상태"인 곳은 disputeId 전달. 글로벌 집계 의도인 곳은 무인자 호출.

### 4) `computeEffectiveness(..., contradictionTokens, ...)` — line 502~524

QuestionSelector가 cold_logic weak narrowing 판정(`< 2`)에 쓰는 값. **현재 질문 대상 쟁점의 토큰**이 의미적으로 맞음 → 호출부(QuestionSelector)에서 `byDispute[focusDispute.id] ?? 0`을 전달하도록 변경 (섹션 E).

---

## 섹션 D. `gameEventTriggerEngine` 변경 (커밋 3)

**[src/engine/gameEventTriggerEngine.ts](../../../src/engine/gameEventTriggerEngine.ts)**

Plan 리포트 섹션 1-6 인용:
```ts
// 189-247: checkContradiction(snapshot)
if (snapshot.meters[party].contradictionTokens < CONTRADICTION_MIN_TOKENS) return null
const severity = snapshot.meters[party].contradictionTokens >= 5 ? 'critical'
  : snapshot.meters[party].contradictionTokens >= 4 ? 'major' : 'minor'
const eventIdx = Math.min(snapshot.meters[party].contradictionTokens - CONTRADICTION_MIN_TOKENS, contradictions.length - 1)
```

**결정 2 안 A 적용** — 모든 3회 참조를 `contradictionTokensByDispute[snapshot.focusDisputeId] ?? 0`로 교체:

```ts
const focusTokens = snapshot.meters[party].contradictionTokensByDispute[snapshot.focusDisputeId] ?? 0
if (focusTokens < CONTRADICTION_MIN_TOKENS) return null
const severity = focusTokens >= 5 ? 'critical' : focusTokens >= 4 ? 'major' : 'minor'
// ...
const eventIdx = Math.min(focusTokens - CONTRADICTION_MIN_TOKENS, contradictions.length - 1)
```

deferredEffect `lie_advance`의 `disputeId`는 이미 `snapshot.focusDisputeId` — 변경 없음.

---

## 섹션 E. UI 읽기 경로 변경 (커밋 4)

### `src/components/pc/panels/PCRightPanel.tsx`

Plan 섹션 1-7 인용(657-674):
```tsx
{[0, 1, 2, 3, 4].map((i) => (
  <span className={`pc-target-contradiction__pip${i < targetMeters.contradictionTokens ? ' is-filled' : ''}`} />
))}
<span>{targetMeters.contradictionTokens} / 5</span>
```

변경:
```tsx
const disputeTokens = targetMeters.contradictionTokensByDispute[activeDispute?.id ?? ''] ?? 0
{[0, 1, 2, 3, 4].map((i) => (
  <span className={`pc-target-contradiction__pip${i < disputeTokens ? ' is-filled' : ''}`} />
))}
<span>{disputeTokens} / 5</span>
```

`activeDispute` 변수는 같은 파일 line 77-82에 이미 존재.

### `src/components/actions/QuestionSelector.tsx:87`

현재: `computeEffectiveness(..., meters.contradictionTokens, ...)`

변경: 타깃 쟁점 id를 받아 `meters.contradictionTokensByDispute[focusDispute.id] ?? 0`으로 전달.

focusDispute(또는 activeDispute) 변수는 이 컴포넌트 내에 있어야 함. 없으면 props로 전달되는 `action.disputeId` 기준 사용.

### 변경 **하지 않는** UI 지점

- `PCBottomDock.tsx:253` — 글로벌 집계 의도 유지 → `contradictionTokens` 필드 그대로
- `meterStagingV2.ts:113-119` — dossier HUD → 글로벌 필드 그대로
- `ActionPanel.tsx:173` `Math.max(A.contradictionTokens, B.contradictionTokens)` → 글로벌 필드 그대로
- `ActionPanel.tsx:821` 요약 라인 → 글로벌 필드 그대로

이 지점들은 **집계 의도**이며 글로벌 필드가 byDispute의 `max`로 파생되므로 기존 코드 수정 불필요.

---

## 섹션 F. 마이그레이션 (커밋 1에 포함)

**결정 3 안 X 적용** — 세이브 하이드레이션 시 byDispute 없으면 빈 맵으로 초기화.

```ts
// useGameStore.ts persist onRehydrateStorage (또는 merge) 내부
for (const party of ['a', 'b'] as const) {
  if (!state.questionMeters[party].contradictionTokensByDispute) {
    state.questionMeters[party].contradictionTokensByDispute = {}
  }
}
```

기존 `contradictionTokens: number` 값은 그대로 유지. 다음 fact_pursuit / empathy_approach 1회면 byDispute에 새 값이 기록되고, 글로벌은 `deriveGlobalContradictionTokens`로 재계산되어 자연 수렴.

**caseTelemetry (localStorage 'solomon-history')의 과거 contradictionTokens 값은 폐기 대상 아님** — 완료된 사건 기록이라 기능 영향 없음. 유지.

---

## 5단계 커밋 플랜 (Plan 리포트 기반)

각 커밋 후 CT 보고 → CT가 적절한 시점에 일괄 커밋.

### 커밋 1 — 타입 + 스토어 골격
- `questionEffectEngine.ts` 타입 수정 + `createInitialMeterState` + `deriveGlobalContradictionTokens` 헬퍼
- `useGameStore.ts` 하이드레이션 보정
- 이 단계에서는 쓰기/읽기 로직 변경 없이 **타입 통과만** (`npx tsc -b --force` PASS 확인)

### 커밋 2 — 엔진 쓰기 경로 쟁점별 전환
- `questionEffectEngine.ts`의 `resolveFactPursuit` / `applyMeterUpdate` / `getMeterEffects`
- `applyMeterUpdate` 호출부의 disputeId 전달 검토
- 타입 통과 확인, 기본 헤드리스 3사건 1회 회귀

### 커밋 3 — 이벤트 트리거 쟁점별 severity
- `gameEventTriggerEngine.ts`의 `checkContradiction` 3곳 교체
- 헤드리스 회귀 (모순 이벤트 발화 케이스 확인)

### 커밋 4 — UI 읽기 전환
- `PCRightPanel.tsx` 쟁점별 pip
- `QuestionSelector.tsx` cold_logic 판정
- 유저 실플레이 체감 확인 (pip이 쟁점 전환에 반응하는지)

### 커밋 5 — 회귀 보강 + 튜닝 (필요 시)
- 발견된 밸런스 이슈 처리 (예: CONTRADICTION_MIN_TOKENS 튜닝)
- 추가 regression test 스크립트
- 빌드/타입/헤드리스 최종 PASS

---

## 회귀 테스트 범위

Plan 리포트 섹션 6 기반:

| # | 항목 | 검증 방법 | 커밋 단계 |
|---|---|---|---|
| 1 | 타입 빌드 | `npx tsc -b --force` | 매 커밋 |
| 2 | vite build | `npm run build` | 커밋 5 |
| 3 | spouse-01 헤드리스 (쟁점 5개) | `node tests/run-84-headless.cjs --case spouse-01` | 커밋 2~5 |
| 4 | friend-01 헤드리스 (쟁점 5개) | 동일 | 커밋 2~5 |
| 5 | family-01 헤드리스 (쟁점 5개) | 동일 | 커밋 2~5 |
| 6 | UI 쟁점별 pip 수동 확인 | `npm run dev` + 실플레이, 쟁점 nav 이동 시 pip 값 쟁점별 다른지 | 커밋 4~5 |
| 7 | dossier 해금 (`Math.max(A, B) ≥ N`) 동작 | `ActionPanel.tsx` 참조 코드 회귀 — 한 party 한 쟁점 5 쌓으면 dossier 열려야 함 | 커밋 2~5 |
| 8 | 모순 이벤트 발화 | 특정 쟁점 집중 공략 → critical severity → `lie_advance` 2단계 전이 | 커밋 3 |
| 9 | 세이브 호환 | 기존 localStorage 있는 상태로 진입 → byDispute `{}` 자동 보정 확인 | 커밋 1 |
| 10 | 스트레스 | `node tests/stress-test-20rounds.cjs` | 커밋 5 |

---

## 수정 권한 / 주의

- 위 매트릭스의 5개 파일(1, 2, 3, 6, 10) **직접 수정 OK**
- 그 외 파일 변경 필요성 발견 시 **CT에 보고 후** 진행
- 텍스트/콘텐츠 변경은 **없음** (이번 작업은 전부 로직/타입)
- 커밋 금지. 단계별 작업 후 CT 보고. **커밋 메시지는 CT가 작성**

---

## 잠재 리스크 (구현 중 주의)

1. **`applyMeterUpdate` 시그니처 변경** — 호출부 누락하면 TS 에러. grep으로 전수 확인 필수.
2. **`getMeterEffects` 호출부 의도 판정** — "현 쟁점 상태"인지 "글로벌 집계"인지 각 호출 지점에서 명확히 판단. 헷갈리면 **CT에 질의**.
3. **persist 하이드레이션** — zustand persist의 정확한 API 사용법(store 구조 확인 필요). `onRehydrateStorage` / `migrate` / `merge` 중 적합한 곳 사용.
4. **UI 리렌더** — pip이 activeDispute 변경 시 재렌더되는지 확인 (React memo/selector 고려).
5. **밸런스 변화** — 결정 2 안 A는 "흩뿌린 플레이어에게 불리". 3사건 헤드리스가 이전과 다른 이벤트 발화 순서를 보일 수 있음 → stage1-deep-audit / stress-test에서 잡아내면 보고 후 CT 판단.

---

## 시작 체크리스트

- [ ] `git status` clean 확인 (Modified 없음)
- [ ] `git log --oneline -5` — 베이스가 `3410680` 이상인지 확인
- [ ] [tmp/plan-contradiction-tokens-split.md](../../../tmp/plan-contradiction-tokens-split.md) 전체 정독
- [ ] 이 지시서 + [CLAUDE.md](../../../CLAUDE.md) 정독
- [ ] `src/engine/questionEffectEngine.ts` 현 구조 파악 (QuestionMeterState, createInitialMeterState, resolveFactPursuit, applyMeterUpdate, getMeterEffects)
- [ ] `src/store/useGameStore.ts`의 persist 미들웨어 사용 형태 확인
- [ ] 커밋 1부터 순서대로 진행. 매 커밋 완료 후 CT 보고

---

## 보고 형식

커밋 단계마다:

```markdown
# Codex 구현 — 커밋 N 완료 보고

## 변경 파일
- {파일}: {라인 수} 변경

## 검증
- tsc -b --force: ✓/✗
- 헤드리스 3사건: ✓/✗
- 수동 확인: ✓/✗ (커밋 4 이상)

## 발견 이슈
- {있으면}

## 다음 단계
- 커밋 N+1 진행 or CT 검토 대기
```

최종(커밋 5) 완료 후 `tmp/codex-contradiction-tokens-impl-report.md` 종합 리포트 작성.

---

## PASS 기준

| 등급 | 조건 |
|---|---|
| **PASS** | 5커밋 완료 + 회귀 10항목 전 PASS + 빌드 경고 기존 대비 증가 0 |
| CONDITIONAL | minor WARN만 존재 (예: 밸런스 튜닝 권고) |
| FAIL | critical 1건 이상 (빌드 실패 / 타입 에러 / 핵심 회귀 실패) |

PASS 시 CT가 일괄 커밋(5건) → main 반영.
