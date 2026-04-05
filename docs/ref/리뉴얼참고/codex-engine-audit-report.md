# Codex Engine Audit Report

> 작성: 2026-04-06
> 작성자: Codex
> 대상 문서: `docs/ref/리뉴얼참고/ct-to-codex-task-engine-audit.md`
> 범위: 기존 이벤트/상호작용 엔진 22개 파일 읽기 전수 분석
> 원칙: 코드 수정 없음, 읽기 전용 감사

---

## 요약

### 핵심 결론

- **새로 만들 필요가 없는 축**이 분명하다.
  - 심문 효과 차별화: `questionEffectEngine.ts` + `npcReactionV2.ts` + `beatSelectorV2.ts` + `StateTransitionFeedback.tsx`
  - 반복 교착/피로: `questionFatigueEngine.ts`
  - 감정 폭발: `emotionEngine.ts` + `gameEventTriggerEngine.ts` + `GameEventModal.tsx`
  - 숨겨진 쟁점 발현: `useDiscoveryIntegration.ts` + `discoverySlice.ts` + `DisputeEmergenceModal.tsx`

- **구현돼 있으나 미가동/부분 미가동인 레이어**가 많다.
  - `contradictionEngine.ts`
  - `readinessEngine.checkForcedVerdict()`
  - `trustEngine`의 threshold helper 3종
  - `useDiscoveryIntegration.updateCascadeTargets()`
  - `useDiscoveryIntegration.shouldBlockLieTransition()`
  - `questionFatigueEngine.applyFatigueMultiplier()`
  - `npcReactionV2.applyReactionToBlueprint()`
  - `beatSelectorV2`의 `eventLane`
  - `meterStagingV2.getReadinessHint()` 실사용 경로

- **이중 구조가 가장 심한 영역은 끼어들기와 쟁점 발현**이다.
  - 끼어들기:
    - legacy `pendingInterjection` + `CourtLayout.tsx`
    - V2 `pendingInterjectionV2` + `GameEventModal.tsx`
    - V3 `pendingGameEvent(type='interjection')` + `GameEventModal.tsx`
  - 쟁점 발현:
    - discovery 경로 `pendingEmergence` + 전용 모달
    - event trigger 경로 `pendingGameEvent(type='dispute_emergence')` + inline 모달

- **현재 가장 좋은 canonical 후보**
  - 모순 지적: `gameEventTriggerEngine.ts` + `GameEventModal.tsx`
    - 필요 시 후속으로 `contradictionEngine.ts`를 정밀 판정 레이어로 연결
  - 끼어들기: `interjectionV2.ts` + `GameEventModal.tsx`
  - 감정 폭발: `emotionEngine.ts` + `gameEventTriggerEngine.ts` + `GameEventModal.tsx`
  - 숨겨진 쟁점 발현: `useDiscoveryIntegration.ts` + `discoverySlice.ts` + `DisputeEmergenceModal.tsx`

### Phase 2 판단에 바로 쓸 수 있는 포인트

1. **아이디어 2(심문 효과 분리)**는 새 시스템보다 기존 `questionEffectEngine.ts`와 `QuestionMeterHUD`를 강화하는 편이 맞다.
2. **아이디어 3(돌파 연출)**은 `emitStateTransitionEvent()` + `StateTransitionToast` + `GameEventModal`을 강화하는 편이 맞다.
3. **아이디어 5(교착 피드백)**는 `questionFatigueEngine.ts`가 이미 핵심 토대를 갖고 있다.
4. **아이디어 4(턴 간 이벤트)**는 “새 시스템 추가”보다 기존 event/discovery/interjection 레이어 통합이 먼저다.

---

## 1. `src/engine/contradictionEngine.ts`

### 핵심 함수

- `detectContradictions()` — claim graph에서 같은 쟁점의 A/B 발언 충돌 후보를 찾음 [🟡]
- `detectStatementChange()` — 같은 화자의 이전 발언과 현재 발언의 실질 변화 여부를 1차 필터링 [🟡]
- `verifyContradictionWithLLM()` — 두 진술이 실제 모순인지 LLM으로 판정 [🟡]

### 호출 경로

- `useActionDispatch.ts:14`에서 `detectStatementChange`를 import하지만, 실제 호출 경로는 없음
- `rg` 기준 `detectContradictions()` / `verifyContradictionWithLLM()`의 실사용 호출부 없음

### UI 연결

- 없음
- 현재 유저가 보는 모순 이벤트 UI는 이 엔진이 아니라 `gameEventTriggerEngine.ts` + `GameEventModal.tsx` 경로에서 처리됨

### 이중 구조

- 기존 정밀 모순 엔진: `contradictionEngine.ts`
- 실제 가동 중인 모순 시스템: `gameEventTriggerEngine.ts`의 meter 기반 `checkContradiction()` + `GameEventModal.tsx`
- 현재는 후자가 canonical, 전자는 dormant precision layer 상태

### Phase 2 연결

- 아이디어 4(턴 간 이벤트)의 “모순 지적”을 새로 만들 필요는 없음
- 현재 이벤트 UI 뼈대는 유지하고, 필요하면 나중에 `verifyContradictionWithLLM()`를 정확도 향상용 후속 레이어로 붙이는 편이 맞음

---

## 2. `src/engine/interjectionV2.ts`

### 핵심 함수

- `createInitialInterjectionTracker()` — focus streak / cooldown / resentment 상태 초기화 [🟢]
- `getSessionInterjectionTracker()` / `setSessionInterjectionTracker()` / `resetSessionInterjectionTracker()` — 세션 상태 관리 [🟢]
- `commitInterjectionFocus()` — 연속 타깃 심문 streak를 누적 [🟢]
- `evaluateInterjectionOpportunity()` — 끼어들기 발생 기회를 평가하고 allow/block 선택지를 생성 [🟢]
- `commitInterjectionChoice()` — 플레이어의 allow/block 선택 결과를 효과로 변환 [🟢]
- `getResentmentPenalty()` — 제지 누적에 따른 resentment 패널티 반환 [🟢]

### 호출 경로

- `useActionDispatch.ts:23`에서 import
- `useActionDispatch.ts:902-932`에서 `evaluateInterjectionOpportunity()` 호출 후 `pendingInterjectionV2` 저장
- `useActionDispatch.ts:66-127`의 `resolveInterjectionV2()`에서 `commitInterjectionChoice()` 호출
- `npcReactionV2.ts:5, 128`에서 `getResentmentPenalty()` 사용
- `useGameStore.ts:107, 528`에서 세션 reset 호출

### UI 연결

- `GameEventModal.tsx:21-46`에서 `pendingInterjectionV2` 우선 처리
- allow/block 선택 결과가 대화, fatigue reset, atom/link reveal, authority delta 등으로 실제 state에 반영됨

### 이중 구조

- legacy: `pendingInterjection` + `CourtLayout.tsx` + `allowInterjection()` / `denyInterjection()`
- V2: `pendingInterjectionV2` + `GameEventModal.tsx` + `resolveInterjectionV2()`
- V3 이벤트형: `pendingGameEvent(type='interjection')` + `GameEventModal.tsx`

### Phase 2 연결

- 아이디어 4(턴 간 이벤트)에서 **가장 재사용 가치가 높은 엔진**
- 끼어들기 시스템은 새로 만들기보다 V2를 canonical로 고정하고 legacy/V3 구형 경로를 정리하는 편이 맞음

---

## 3. `src/engine/emotionEngine.ts`

### 핵심 함수

- `getEmotionalPhase()` — internalValue를 감정 phase로 변환 [🟢]
- `getBehaviorHint()` — archetype × phase 기반 행동 힌트 반환 [🟢]
- `updateEmotion()` — 감정 수치와 phase, behaviorHint를 갱신 [🟢]
- `createInitialEmotionalState()` — 초기 감정 상태 생성 [🟢]

### 호출 경로

- `agentSlice.ts:6, 55, 61, 139`에서 초기화 및 갱신에 사용
- `gameEventTriggerEngine.ts`는 `emotionalState.internalValue`를 감정 폭발 조건으로 사용
- `useDiscoveryIntegration.ts`는 `agent.emotionalState.internalValue`를 감정 실수/셧다운 판단에 사용

### UI 연결

- `ActionPanel.tsx` 상단 대상 선택 버튼에서 감정 이모지로 간접 표시
- 대화 로그의 `behaviorHint`를 통해 말투/행동 힌트에 반영
- 감정 폭발 이벤트는 `gameEventTriggerEngine.ts` + `GameEventModal.tsx`에서 별도 시각화됨

### 이중 구조

- 감정 상태 저장은 단일
- 다만 “격앙 반응”의 연출 경로는 `emotionEngine.ts`, `gameEventTriggerEngine.ts`, `discoveryEngine.ts`의 감정 실수 경로로 분산됨

### Phase 2 연결

- 아이디어 3(돌파 연출)과 아이디어 4(감정 폭발) 강화의 기반
- 새 감정 시스템보다 현재 수치/phase를 더 잘 번역하는 UI가 우선

---

## 4. `src/engine/gameEventTriggerEngine.ts`

### 핵심 함수

- `resetEventTriggerState()` — 이벤트 쿨다운 상태 리셋 [🟢]
- `evaluateEventTriggers()` — 모순/끼어들기/감정 폭발/새 쟁점 출현을 평가 [🟢]
- `getEventEffects()` — 트리거 효과 목록 반환 [🟡]

### 호출 경로

- `useGameStore.ts:103, 403-432`에서 import 및 `evaluateTurnEvents()` 내부 호출
- `useActionDispatch.ts:344`에서 증거 제시 후 `evaluateTurnEvents('evidence_present', ...)`
- `useActionDispatch.ts:1097`에서 질문 후 `evaluateTurnEvents(action.questionType, ...)`

### UI 연결

- `useGameStore.ts:405`에서 `pendingGameEvent` 저장
- `CourtHeader.tsx:417`, `TopBar.tsx:201`에서 `GameEventModal` 마운트
- 모달이 뜨기 전에 `useGameStore.ts:419-432`에서 이벤트 효과가 **자동 적용**됨

### 이중 구조

- 끼어들기: `interjectionV2.ts`와 기능 겹침
- 쟁점 발현: `useDiscoveryIntegration.ts` + `discoverySlice.ts`와 기능 겹침
- `getEventEffects()`는 구현돼 있지만, 실제로는 `useGameStore.evaluateTurnEvents()`가 직접 effects를 적용해 별도 사용처가 없음

### Phase 2 연결

- 모순 지적/감정 폭발/이벤트 모달 뼈대는 재사용 가치가 높음
- 다만 interjection/emergence는 discovery/V2와 충돌하므로, 이 엔진을 바로 확장하기보다 담당 범위를 줄여 정리하는 편이 좋음

### 메모

- `useGameStore.ts:385`에서 snapshot의 `activeParty`가 `s.separationTarget ?? 'a'`로 채워져, 현재 질문 대상과 분리될 수 있음
- 이벤트 choice가 전략 선택지처럼 보이지만, 실제 core effect는 modal 전 이미 적용되는 구조임

---

## 5. `src/store/slices/discoverySlice.ts`

### 핵심 함수

- `createDiscoverySlice()` — discovery 상태/메서드 집합을 store에 주입 [🟢]
- `initDiscovery()` — case 기반 discovery 초기화 [🟢]
- `setPendingConfrontation()` / `setPendingConflict()` / `setPendingEmergence()` / `setPendingSlip()` — 모달 대기 상태 저장 [🟢]
- `submitJudgment()` / `reviseJudgment()` — 진실 공방 판단 저장/수정 [🟢]
- `submitAppraisal()` — 증거 감별 결과 저장 [🟢]
- `emergeDispute()` / `acknowledgeEmergence()` / `deactivateDispute()` — 숨겨진 쟁점 발현/확인/비활성화 [🟢]
- `addEmotionalSlip()` / `addDiscoveredTruth()` — 감정 실수/발견 진실 누적 [🟢]

### 호출 경로

- `useGameStore.ts:231`에서 slice 등록, `initializeCase()`에서 `initDiscovery()` 호출
- `useDiscoveryIntegration.ts:50, 65, 99, 118`에서 pending slip / confrontation / emergence / conflict 설정
- `TruthConfrontationModal.tsx:29`에서 `submitJudgment()`
- `JudgmentConflictModal.tsx:42`에서 `reviseJudgment()`
- `EmotionalSlipModal.tsx:18`에서 `addEmotionalSlip()`

### UI 연결

- `CourtLayout.tsx:163-166`의 `DiscoveryOverlay()`가 `pendingSlip`, `pendingEmergence`, `pendingConfrontation`, `pendingConflict`를 모달로 렌더

### 이중 구조

- hidden dispute emergence는 `gameEventTriggerEngine.ts`의 `pendingGameEvent(type='dispute_emergence')`와 중복
- slice 내부에 `computeCascadeTargets`, `checkEmergence` import가 있으나 실제 사용되지 않음

### Phase 2 연결

- 새 discovery modal을 다시 만들 필요 없음
- hidden dispute / slip / truth confrontation의 canonical store로 유지할 가치가 높음

### 메모

- `submitJudgment()`는 `cascadeTargets: []`로만 초기화하고, 실제 채우는 `updateCascadeTargets()`는 현재 미호출이라 cascade 추론이 사실상 dormant

---

## 6. `src/hooks/useDiscoveryIntegration.ts`

### 핵심 함수

- `runDiscoveryChecks()` — 질문/증거/증인 액션 후 discovery 이벤트를 통합 평가 [🟢]
- `updateCascadeTargets()` — 판단 후 연쇄 추론 대상 채움 [🟡]
- `shouldBlockLieTransition()` — 감정 티어 기반 전이 차단 판정 [🟡]

### 호출 경로

- `useActionDispatch.ts:328`에서 증거 제시 후 호출
- `useActionDispatch.ts:505`에서 일부 호의/신뢰 액션 후 호출
- `useActionDispatch.ts:1034`에서 질문 후 호출
- `useActionDispatch.ts:2136`에서 contradiction pursue 흐름 후 호출
- `updateCascadeTargets()` / `shouldBlockLieTransition()`은 실사용 호출부 없음

### UI 연결

- `runDiscoveryChecks()`는 직접 UI를 그리지 않고 `pendingSlip`, `pendingConfrontation`, `pendingEmergence`, `pendingConflict`를 세팅
- 실제 모달 표시는 `CourtLayout.tsx:163-166`에서 수행

### 이중 구조

- hidden dispute emergence는 `gameEventTriggerEngine.ts`와 중복
- 감정 셧다운은 메시지는 출력하지만 입력 잠금 state를 직접 세팅하지 않음

### Phase 2 연결

- hidden dispute / emotional slip 계열은 이 hook을 canonical로 유지하는 편이 맞음
- 아이디어 4에서 “숨겨진 쟁점 발현”을 새 시스템으로 만들기보다 여기서 강화하는 편이 효율적

### 메모

- `runDiscoveryChecks()`의 셧다운 체크는 `addDialogue()` 경고만 남기고 실제 2턴 잠금 로직까지 연결되지는 않음

---

## 7. `src/engine/questionFatigueEngine.ts`

### 핵심 함수

- `createInitialFatigueState()` — 피로도 초기 상태 생성 [🟢]
- `getSessionFatigueState()` / `setSessionFatigueState()` / `resetSessionFatigueState()` — 세션 상태 관리 [🟢]
- `evaluateQuestionFatigue()` — local/spotlight 피로도와 multiplier 계산 [🟢]
- `commitQuestionFatigue()` — 피로도 상태 커밋 [🟢]
- `applyFatigueMultiplier()` — raw delta에 피로도 배율 적용 [🟡]

### 호출 경로

- `useActionDispatch.ts:19, 687-694, 733-740`에서 선평가/커밋 사용
- `useActionDispatch.ts:91-98`에서 interjection allow 시 reset 커밋
- `useGameStore.ts:106, 528`에서 초기화/reset
- `applyFatigueMultiplier()`의 실사용 호출부는 없음

### UI 연결

- 직접 UI는 없음
- `fatigueLevel`이 `npcReactionV2.ts`, `beatSelectorV2.ts`, `questionEffectEngine.ts` 배율에 간접 반영됨

### 이중 구조

- `questionEffectEngine.ts`의 legacy `consecutiveSameType` 감쇠와 공존
- 현재는 `externalMultiplier`/`bypassLegacyDiminish`로 중복을 우회하는 하이브리드 구조

### Phase 2 연결

- 아이디어 5(반복 심문 교착 피드백)의 핵심 기반
- freshness budget/reset rule을 여기에 얹는 방향이 가장 자연스러움

### 메모

- `shouldTriggerFatigueBeat`를 계산하지만 현재 소비처가 없어, “피로 beat 전용 분기”는 아직 미가동

---

## 8. `src/engine/questionEffectEngine.ts`

### 핵심 함수

- `createInitialMeterState()` — 질문 미터 초기 상태 생성 [🟢]
- `resolveQuestionEffect()` — 질문 3종의 미터/효과/피드백 계산 [🟢]
- `getMeterEffects()` — 현재 미터 임계 효과 조회 [🟢]

### 호출 경로

- `useGameStore.ts:102, 310, 319-345, 362`에서 meter state 생성/적용/조회
- `useActionDispatch.ts:747` 전후에서 `state.applyQuestionEffect(...)` 호출
- `gameEventTriggerEngine.ts:19, 179, 290`에서 `getMeterEffects()` 사용

### UI 연결

- `QuestionMeterHUD`가 `questionMeters`를 직접 시각화 (`StateTransitionFeedback.tsx:143-175`)
- `resolveQuestionEffect().feedback`는 `useGameStore.ts:345-352`에서 `gameEventLog(type='question_effect')`로 쌓이지만, 이를 직접 렌더하는 컴포넌트는 현재 없음

### 이중 구조

- 질문 효과의 핵심 수치 시스템은 active
- 다만 effect type 중 일부는 생성만 되고 실제 소비처가 없음
  - `suppression_leak`
  - `defense_weaken`
  - `confession_window`
- `lie_transition_bonus`도 `useGameStore.ts:337`에서 placeholder comment만 있고 실질 state 반영은 없음

### Phase 2 연결

- 아이디어 2(심문 3종 게임 효과 분리)에 가장 중요한 코어
- 새 시스템보다 이 엔진의 **미터 피드백 + 후속 선택지 변화**를 실제로 소비하게 만드는 쪽이 우선

---

## 9. `src/engine/readinessEngine.ts`

### 핵심 함수

- `calculateReadinessScore()` — readiness 점수 집계 [🟢]
- `checkVerdictEligible()` — 판결 가능 여부 판정 [🟢]
- `checkForcedVerdict()` — 강제 판결 전환 판단 [🟡]
- `aggregateReadiness()` — lieState/evidence 결과를 ReadinessState로 집계 [🟢]

### 호출 경로

- `useGameStore.ts:99, 453-456`에서 `aggregateReadiness()` 사용
- `phaseSlice.ts:5, 93`에서 `checkVerdictEligible()` 사용
- `meterStagingV2.ts:11, 160-171`에서 `calculateReadinessScore()` / `checkVerdictEligible()` 사용
- `checkForcedVerdict()`의 실사용 호출부는 없음

### UI 연결

- `TopBar.tsx:110-114` 및 `DisputeBoard.tsx:63-67`에서 readiness chip 표시
- `ForcedVerdictBanner.tsx`에서 verdict banner / hint에 사용

### 이중 구조

- `checkForcedVerdict()`는 별도 helper지만, 실제 강제 판결 전환은 `phaseSlice.ts:67-75`에서 `MAX_TURNS` 기준으로 직접 처리
- `MAX_INTERROGATION_TURNS`와 `MAX_TURNS`가 별도 소스에 존재해 드리프트 위험이 있음

### Phase 2 연결

- 즉시 구현 대상은 아니지만, 아이디어 3/5 이후 밸런스 조정 시 반드시 함께 봐야 할 엔진

---

## 10. `src/engine/lieStateMachine.ts`

### 핵심 함수

- `attemptLieTransition()` — trigger/config/trust 조건에 따라 lieState 전이 시도 [🟢]
- `initializeLieStates()` — lie config 배열을 상태 맵으로 변환 [🟢]

### 호출 경로

- `agentSlice.ts:5, 51-63`에서 초기화 시 `initializeLieStates()`
- `agentSlice.ts:82-106`에서 `transitionLie()`가 `attemptLieTransition()` 호출

### UI 연결

- 전이 결과 자체는 store state로 반영
- 이후 `useActionDispatch.ts:341, 1102`와 `llmDialogueResolver.ts:1622`가 `emitStateTransitionEvent()`를 호출해 `StateTransitionToast`에 시각 피드백 생성

### 이중 구조

- 전이 엔진 자체는 단일
- 다만 trigger를 만드는 경로가 LLM/질문효과/증거/이벤트 등 여러 레이어로 분산됨

### Phase 2 연결

- 아이디어 3(돌파 순간 연출)의 가장 근본적인 source of truth
- 새 state machine을 만들 필요는 없음

---

## 11. `src/engine/trustEngine.ts`

### 핵심 함수

- `createInitialTrustState()` — trust/fear/retaliation 초기값 생성 [🟢]
- `updateTrust()` — trust state 갱신 [🟢]
- `canVoluntaryConfess()` — 자발 고백 threshold helper [🟡]
- `canAcceptConfidential()` — confidential acceptance threshold helper [🟡]
- `canConsentToDisclosure()` — disclosure consent threshold helper [🟡]

### 호출 경로

- `agentSlice.ts:7, 57, 63, 151`에서 초기화/갱신
- threshold helper 3종의 실사용 호출부는 없음
- 실제 threshold 판정은 `lieStateMachine.ts:33, 103` 등에서 상수를 직접 비교

### UI 연결

- `TrustActionPanel.tsx:44-46`에서 trust/fear/retaliation meter가 직접 표시됨
- 나머지 효과는 자발적 고백/신뢰 변화/LLM 태도에 간접 반영

### 이중 구조

- helper 함수는 존재하지만, 실제 판정은 다른 엔진들이 직접 상수 비교로 수행
- 즉 “상태 저장은 active, helper API는 dormant” 구조

### Phase 2 연결

- 아이디어 2의 공감 접근 payoff를 키울 때 활용 가치가 있음
- 다만 helper를 쓰기보다 현재는 `trustTowardJudge`를 직접 읽는 경로가 더 많아 통합 필요

---

## 12. `src/engine/meterStagingV2.ts`

### 핵심 함수

- `getLeakStageSpec()` / `getTrustStageSpec()` — staged meter 구간 매핑 [🟢]
- `getLeakPresentation()` / `getTrustPresentation()` — meter UI 모델 생성 [🟢]
- `getMeterHudModel()` — HUD용 contradiction/leak/trust 모델 반환 [🟢]
- `evaluateDossierUnlock()` — 조건 기반 DossierCard 해금 판정 [🟢]
- `getReadinessHint()` — readiness 텍스트 힌트 생성 [🟡]
- `METER_UI_SPEC` — 단계별 스타일 상수 [🟡]

### 호출 경로

- `ActionPanel.tsx:17, 167-181`에서 `evaluateDossierUnlock()` 사용
- `StateTransitionFeedback.tsx:18, 147`에서 `getMeterHudModel()` 사용
- `ForcedVerdictBanner.tsx:8, 36`에서 `getReadinessHint()` 참조
- `METER_UI_SPEC`는 실사용 호출부 없음

### UI 연결

- `QuestionMeterHUD`의 staged label/아이콘/설명에 반영
- `ActionPanel.tsx`의 Dossier unlock toast/auto-showcase 트리거에 연결
- `getReadinessHint()`는 컴포넌트 코드상 연결돼 있지만 실제 마운트 조건 때문에 일반 플레이에서는 도달하지 않음

### 이중 구조

- readiness hint는 구현돼 있으나, `ForcedVerdictBanner`가 상위에서 `verdictMode === 'forced_incomplete'`일 때만 마운트되어 정상 힌트 branch가 사실상 죽어 있음
- Dossier unlock은 조건 기반으로 개선됐지만, `ActionPanel.tsx` auto-showcase/auto-execute와 함께 동작해 에이전시를 약화시키는 현재 UX와 결합됨

### Phase 2 연결

- 아이디어 1(UI 레벨 핵심 증거/정보 우선 표시)와 아이디어 3(돌파 번역 UI) 강화에 재사용 가치 높음
- Dossier unlock 로직 자체는 새로 만들 필요 없음

---

## 13. `src/engine/npcReactionV2.ts`

### 핵심 함수

- `deriveActionQuality()` — affinity/fatigue/trust/dispute 조건을 품질 등급으로 환산 [🟢]
- `resolveNpcReaction()` — 순응/저항/역공 확률 판정 및 stance/defense 수정 [🟢]
- `applyReactionToBlueprint()` — reaction 결과를 blueprint에 반영 [🟡]

### 호출 경로

- `useActionDispatch.ts:21, 697-716`에서 `deriveActionQuality()` / `resolveNpcReaction()` 호출
- `applyReactionToBlueprint()`의 실사용 호출부 없음

### UI 연결

- 직접 UI는 없음
- 실제로는 beat 선택/효과 배율/authority delta/대사 톤 변화로 간접 체감

### 이중 구조

- blueprint의 stance를 이 엔진에서 흔든 뒤, beatSelector가 다시 presentation을 결정하는 2단 구조
- `applyReactionToBlueprint()` helper는 존재하지만 현재 caller가 직접 반환값을 써서 dormant

### Phase 2 연결

- 아이디어 2(심문 선택이 결과를 바꾸는 감각)에 매우 적합
- 데이터 변경 없이도 “같은 질문이라도 결과가 다르게 느껴지는” 층을 강화할 수 있음

---

## 14. `src/engine/beatSelectorV2.ts`

### 핵심 함수

- `selectTurnPresentation()` — transition/evidence_hit/general beat 선택 [🟢]
- `deriveResponseIntent()` — 상황별 responseIntent 파생 [🟢]
- `deriveAngleTag()` — 질문 타입/레이어 기반 angleTag 파생 [🟢]

### 호출 경로

- `useActionDispatch.ts:20, 796-813`에서 `selectTurnPresentation()` 호출
- caller가 `pendingEvent: null`을 고정 전달

### UI 연결

- 선택된 beat line이 실제 NPC 대사로 `addDialogue()`됨
- telemetry는 콘솔 로그로만 남고 유저 UI에는 직접 노출되지 않음

### 이중 구조

- beat selector 경로와 LLM fallback 경로가 공존
- `PendingEventPresentation` / `eventLane` 구조는 구현돼 있으나, 현재 caller가 `pendingEvent: null`을 넘기고 반환 `eventLane`도 소비하지 않아 dormant

### Phase 2 연결

- 아이디어 2, 3, 5 모두에 활용 가치가 큼
- 특히 fatigue/transition/evidence hit를 같은 presentation layer에서 풀 수 있으므로, 새 스크립트 선택기보다 이 엔진을 살리는 편이 맞음

---

## 15. `src/components/discovery/GameEventModal.tsx`

### 핵심 함수

- `GameEventModal()` — `pendingInterjectionV2` 또는 `pendingGameEvent`를 선택 모달로 렌더 [🟢]
- 내부 `ContradictionModal` / `InterjectionModal` / `EmotionalBurstModal` / inline `DisputeEmergenceModal` — 이벤트별 선택 UI [🟢]

### 호출 경로

- `CourtHeader.tsx:417`에서 interrogation 중 마운트
- `TopBar.tsx:201`에서도 동일 마운트
- 데이터는 `useGameStore.ts:405`의 `pendingGameEvent` 또는 `useActionDispatch.ts:932`의 `pendingInterjectionV2`에서 들어옴

### UI 연결

- full-screen modal overlay
- interjectionV2는 여기서 allow/block을 받고 `resolveInterjectionV2()`로 state를 실제 변경
- 반면 `pendingGameEvent` 계열은 `useGameStore.ts:419-432`에서 effect가 이미 적용된 후 모달이 뜸

### 이중 구조

- V2 interjection modal과 V3 generic event modal이 한 파일에 공존
- inline `DisputeEmergenceModal`이 별도 파일 `components/discovery/DisputeEmergenceModal.tsx`와 역할 중복

### Phase 2 연결

- 아이디어 3(돌파 순간 연출), 아이디어 4(턴 간 이벤트)의 시각 shell로 재사용 가치 높음
- 다만 “선택에 따라 실제 효과가 갈리는 이벤트”와 “이미 결과가 난 후 설명용 이벤트”를 분리할 필요가 있음

---

## 16. `src/components/discovery/StateTransitionFeedback.tsx`

### 핵심 함수

- `StateTransitionToast()` — lieState 전이를 토스트로 표시 [🟢]
- `QuestionMeterHUD()` — contradiction/leak/trust meter HUD 표시 [🟢]
- `getTransitionLabel` / `emitStateTransitionEvent` re-export — helper 재노출 [🟡]

### 호출 경로

- `CourtHeader.tsx:416`, `TopBar.tsx:194`에서 `StateTransitionToast()` 마운트
- `ActionPanel.tsx:13, 529` 및 `DisputeBoard.tsx:17, 79`에서 `QuestionMeterHUD()` 사용
- 실제 이벤트 발생은 `useActionDispatch.ts:341, 1102` 및 `llmDialogueResolver.ts:1622`의 `emitStateTransitionEvent()`

### UI 연결

- 상단 토스트
- 독/보드 내 meter HUD

### 이중 구조

- `StateTransitionToast()`는 `gameEventLog`를 읽지만, 실제로 소비하는 건 `state_transition`만
- `question_effect` / `event_trigger` 로그는 이 컴포넌트에서 렌더하지 않음
- `CourtHeader.tsx`와 `TopBar.tsx` 모두에서 마운트되어 layout 이중 구조가 있음

### Phase 2 연결

- 아이디어 2(심문 효과 분리)와 아이디어 3(돌파 연출)의 최우선 UI 표면
- 새 HUD보다 여기서 “다음 추천 행동”과 “돌파 의미 번역”을 붙이는 편이 맞음

---

## 17. `src/components/discovery/EmotionalSlipModal.tsx`

### 핵심 함수

- `EmotionalSlipModal()` — pending emotional slip을 선택 모달로 표시 [🟢]

### 호출 경로

- `useDiscoveryIntegration.ts:42-50`에서 `checkEmotionalSlip()` 후 `setPendingSlip(...)`
- `CourtLayout.tsx:163`의 `DiscoveryOverlay()`에서 렌더

### UI 연결

- full-screen modal
- “넘어가기” 또는 “진실 공방에 활용” 선택 가능

### 이중 구조

- 감정 기반 이벤트가 `gameEventTriggerEngine.ts`의 `emotional_burst`와 별도 존재
- burst는 event modal, slip은 discovery modal로 나뉘어 있음

### Phase 2 연결

- 감정 폭발과는 다른 “실수로 진실이 새는 순간” 연출에 재사용 가치가 있음

---

## 18. `src/components/discovery/TruthConfrontationModal.tsx`

### 핵심 함수

- `TruthConfrontationModal()` — 양측 상반 주장에 대한 플레이어 판단 모달 [🟢]

### 호출 경로

- `useDiscoveryIntegration.ts:59-65`에서 `checkTruthConfrontation()` 후 `setPendingConfrontation(...)`
- `CourtLayout.tsx:165`의 `DiscoveryOverlay()`에서 렌더

### UI 연결

- 양측 주장 대비 + 판단 선택지 + 확정 버튼

### 이중 구조

- contradiction modal과 유사하게 “충돌을 보여준다”는 점은 같지만, 이쪽은 claim graph 기반 판단 시스템
- 게임 이벤트 모달의 contradiction와 별개 축

### Phase 2 연결

- 직접적인 1~3번보다는 판결 직전 요약/무게감 강화 쪽에 적합

### 메모

- 판단 저장 후 `updateCascadeTargets()`가 호출되지 않아 연쇄 추론 확장 기능은 현재 dormant

---

## 19. `src/components/discovery/DisputeEmergenceModal.tsx`

### 핵심 함수

- `DisputeEmergenceModal()` — discovery 경로의 숨겨진 쟁점 발현 모달 [🟢]

### 호출 경로

- `useDiscoveryIntegration.ts:88-99`에서 `checkEmergence()` 성공 시 `emergeDispute()`
- `CourtLayout.tsx:164`의 `DiscoveryOverlay()`에서 렌더

### UI 연결

- full-screen modal
- route label + 쟁점 설명 + 확인 버튼

### 이중 구조

- `GameEventModal.tsx` 내부에도 별도 `DisputeEmergenceModal`이 있음
- 즉, emergence UI가 discovery 경로와 event 경로로 두 벌 존재

### Phase 2 연결

- 숨겨진 쟁점 발현을 유지한다면, discovery 경로 전용 canonical modal로 남기는 편이 자연스러움

---

## 20. `src/components/discovery/ForcedVerdictBanner.tsx`

### 핵심 함수

- `ForcedVerdictBanner()` — 강제 판결 경고 또는 readiness 힌트 배너 렌더 [🟡]

### 호출 경로

- `CourtHeader.tsx:424`와 `TopBar.tsx:217`에서 `verdictMode === 'forced_incomplete'` 조건으로만 마운트

### UI 연결

- 불충분 심리 경고 배너는 실제로 표시됨
- 일반 readiness hint branch는 컴포넌트 내부에 있으나, 상위 마운트 조건 때문에 현재 도달하지 않음

### 이중 구조

- forced verdict logic 자체는 `phaseSlice.ts`에서 직접 처리
- readiness hint는 `TopBar.tsx` / `DisputeBoard.tsx`의 chip UI와도 역할이 겹침

### Phase 2 연결

- 즉시 대상은 아니지만, 판결 전 무게감 강화 시 정리할 필요가 있음

---

## 21. `src/hooks/useActionDispatch.ts`

### 핵심 함수

- `resolveInterjectionV2()` — V2 끼어들기 allow/block 결과 반영 [🟢]
- `useActionDispatch()` — 메인 액션 디스패치 훅 [🟢]
- `allowInterjection()` / `denyInterjection()` — legacy 끼어들기 처리 [🟢]
- `applyLieCollapseSuccess()` / `applyLieCollapseFail()` / `applyContradictionSuccess()` / `applyContradictionFail()` — 미니게임 후속 처리 [🟢]
- `handleContradictionPursue()` — 모순 추궁 후속 흐름 [🟢]

### 호출 경로

- `ActionPanel.tsx`, `EvidencePresenter.tsx`, `CourtLayout.tsx` 등 주요 플레이 UI가 모두 이 훅을 통과
- 질문 흐름에서:
  - `useActionDispatch.ts:687-740` — fatigue / npcReaction / questionEffect 적용
  - `useActionDispatch.ts:796-813` — beatSelectorV2 호출
  - `useActionDispatch.ts:902-932` — interjectionV2 기회 평가
  - `useActionDispatch.ts:1034` — discovery checks
  - `useActionDispatch.ts:1097` — V3 event trigger 평가
- legacy interjection은 `allowInterjection()` / `denyInterjection()`를 `CourtLayout.tsx`가 직접 사용

### UI 연결

- 사실상 모든 이벤트 UI의 main integration point
- 대화 로그, pending modal state, minigame state, event trigger, readiness update와 연결

### 이중 구조

- 질문 처리 안에서 V2 beat 경로와 LLM fallback 경로가 공존
- interjection이 legacy / V2 / generic event 세 축으로 공존
- contradiction/burst/emergence도 discovery/event/minigame 쪽이 섞여 있음

### Phase 2 연결

- Phase 2 구현의 실제 접점
- 새 이벤트 엔진을 만들기보다, 여기서 어느 엔진을 canonical로 부를지 정리하는 편이 우선

---

## 22. `src/components/layout/CourtLayout.tsx`

### 핵심 함수

- `CourtLayout()` — 메인 법정 레이아웃 + overlay 호스트 [🟢]
- `DiscoveryOverlay()` — discovery pending state를 모달로 연결 [🟢]
- `InterjectionOverlay()` — legacy `pendingInterjection` 선택지 UI [🟢]
- `MinigameOverlay()` — 조사/모순/붕괴 미니게임 UI [🟢]

### 호출 경로

- 앱 메인 법정 레이아웃으로 사용
- `DiscoveryOverlay()`는 `discovery.pendingSlip` / `pendingEmergence` / `pendingConfrontation` / `pendingConflict`를 읽음
- `InterjectionOverlay()`는 `pendingInterjection`을 읽고 `allowInterjection()` / `denyInterjection()` 호출

### UI 연결

- discovery 모달
- legacy interjection modal
- minigame overlays

### 이중 구조

- discovery overlay는 current canonical에 가깝지만
- interjection overlay는 `GameEventModal.tsx`의 V2/V3 interjection과 중복되는 legacy 경로

### Phase 2 연결

- discovery/minigame overlay 호스트로는 유지 가치가 있음
- interjection만큼은 canonical에서 제외하고 정리 대상

---

## 정리: Phase 2에서 “새로 만들 것 vs 기존을 활성화할 것”

### 새로 만들지 말고 기존을 살릴 것

- 심문 3종 효과 차별화
  - `questionEffectEngine.ts`
  - `npcReactionV2.ts`
  - `beatSelectorV2.ts`
  - `StateTransitionFeedback.tsx`

- 반복 교착/피로
  - `questionFatigueEngine.ts`

- 감정 폭발
  - `emotionEngine.ts`
  - `gameEventTriggerEngine.ts`
  - `GameEventModal.tsx`

- 숨겨진 쟁점 발현
  - `useDiscoveryIntegration.ts`
  - `discoverySlice.ts`
  - `DisputeEmergenceModal.tsx`

### 먼저 canonical을 정하고 정리할 것

- 끼어들기
  - 권장 canonical: `interjectionV2.ts` + `GameEventModal.tsx`
  - 정리 대상: `pendingInterjection` legacy, `gameEventTriggerEngine`의 구형 interjection path

- 쟁점 발현
  - 권장 canonical: discovery 경로
  - 정리 대상: `pendingGameEvent(type='dispute_emergence')` inline modal path

- 판결/준비도
  - `readinessEngine.ts`와 `phaseSlice.ts`의 forced verdict logic 통합 필요

### 현재 가장 중요한 dormant asset

1. `contradictionEngine.ts` — 정확도 향상용 precision layer
2. `beatSelectorV2.ts`의 `eventLane` — turn event를 dialogue lane에 녹일 수 있는 미사용 구조
3. `questionFatigueEngine.ts`의 `shouldTriggerFatigueBeat` — 교착 피드백 전용 분기 토대
4. `updateCascadeTargets()` — 진실 공방의 후속 추론 강화 포인트

---

## 결론

현재 코드베이스는 “이벤트 엔진이 부족한 상태”라기보다,  
**좋은 엔진이 여러 벌 있고 canonical이 정리되지 않은 상태**에 가깝다.

따라서 Phase 2에서 가장 중요한 일은:

1. interjection / emergence / readiness의 **중복 경로 정리**
2. `questionEffectEngine.ts` / `questionFatigueEngine.ts` / `StateTransitionFeedback.tsx`의 **체감 소비처 강화**
3. dormant helper를 새 시스템으로 다시 쓰는 대신 **기존 시스템에 편입할지 판단**

이다.
