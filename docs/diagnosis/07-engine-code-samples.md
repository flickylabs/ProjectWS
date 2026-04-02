# 7. 핵심 엔진 코드 & 데이터 구조 (V3)

> **V3 업데이트 (2026-04-02)**: Blueprint 파이프라인, V2 atom, V3 미터/이벤트/사건카드 반영

## 엔진 파일 맵

```
src/engine/
├── blueprintEngine.ts          — ResponseBlueprint 생성 (stance/defenseMode 매트릭스)
├── blueprintPromptBuilderV2.ts — V2 atom 기반 프롬프트 조립
├── atomSelectionEngine.ts      — atom 점수 산출 + slot 결정 + V3 unlock 병합
├── questionEffectEngine.ts     — 질문 3종 미터 (모순/누설/신뢰)
├── gameEventTriggerEngine.ts   — 4종 이벤트 조건 평가 + 쿨다운
├── v3GameLoopLoader.ts         — DossierCard/UnlockAtom/EventText/TransitionBeat/BeatScript
├── readinessEngine.ts          — 성과 기반 판결 조건
├── evidenceChallengeEngine.ts  — attackVector 봉쇄 + 붕괴 감지
├── bridgeEngine.ts             — Phase 1→3 상태 연결
├── tellValidator.ts            — 말버릇 사후 검증 + cadence 추적
├── judgeQuestionEngine.ts      — 재판관 질문 템플릿 생성
├── lieStateMachine.ts          — 쟁점별 S0~S5 전이
├── emotionEngine.ts            — 4-Tier 감정 상태
├── trustEngine.ts              — 3축 신뢰
├── stateTransitionHelper.ts    — 전이 이벤트 발행 (React 독립)
├── llmDialogueResolver.ts      — LLM 대화 해석 (Blueprint 경로 + BeatScript fallback)
└── llmClient.ts                — OpenAI API 클라이언트
```

## 핵심 흐름: 질문 → 응답 → 효과

```
플레이어가 "사실추궁 + d-1 + 한지석" 선택
  ↓
useActionDispatch.handleQuestion()
  ├── 1. trackInterrogation (심문 이력 기록)
  ├── 2. affinityScore 계산 (lieType × questionType 상성)
  ├── 3. lieState 전이 시도 (상성 게이팅: worst 30%, weak 60%)
  ├── 4. 응답 생성 (tryBlueprintPath)
  │   ├── getClaimPolicy → V2 atom 있으면 Blueprint 경로
  │   ├── generateBlueprint → stance/defenseMode 결정
  │   ├── buildAtomPlan → atom 선택 + V3 unlock atom 병합
  │   ├── 응답 (현재: LLM / 전환 예정: BeatScript ×5)
  │   └── TransitionBeat 강제 삽입 (전이 감지 시)
  ├── 5. V3 미터 적용 (applyQuestionEffect)
  ├── 6. V3 이벤트 평가 (evaluateTurnEvents)
  ├── 7. 상태 전이 피드백 (emitStateTransitionEvent)
  └── 8. incrementTurn → readiness 갱신
```

## 사건당 데이터 구성 (V3 완성 상태)

```
1사건 =
  V2 ClaimAtom: ~150개 (쟁점×state×atom)
  ExecutableVerbalTell: 6개 (파티당 3)
  BeatScript: 36개 (stance×쟁점×state) → ×5 확장 예정 = ~180개
  DossierCard: 3장 (18 challenge 질문)
  StateUnlockAtom: ~42개 (S2~S5 해금)
  이벤트 텍스트: ~18개 (모순+끼어들기+감정폭발)
  TransitionBeat: ~24개 (전이 순간 강제 대사)
  Bridge: 10개 (Phase 1→3 연결)
  EvidenceChallenge: 6개 (증거별 벡터 봉쇄)
```

## V3 완성 사건 vs 레거시 사건

| | V3 완성 (2사건) | 레거시 (82사건) |
|---|---|---|
| 응답 | Blueprint + V2 atom | 구 truthPolicy + 프롬프트 |
| 증거 | DossierCard 맞춤 질문 | 유형별 고정 질문 |
| 이벤트 | V3 사전 작성 텍스트 | 조건만 평가 (텍스트 없음) |
| 전이 | TransitionBeat 강제 삽입 | LLM에 의존 |
| 미터 | 정상 작동 | 정상 작동 (데이터 무관) |
