# 7. 핵심 엔진 코드 샘플

## 1. 거짓말 상태머신 (lieStateMachine.ts)

쟁점(dispute)마다 독립적인 상태머신이 돌아간다. 핵심은 `attemptLieTransition` 함수.

```typescript
// 전이 시도의 핵심 로직
export function attemptLieTransition(
  entry: LieStateEntry,
  config: LieConfig,
  trigger: string,
  agentState: AgentState,
): TransitionResult {
  // 이미 S5면 더 이상 전이 없음
  if (currentState === 'S5') return noTransition

  // 1순위: 신뢰 루트 — trust 임계치 + 공감/신뢰 트리거 → S5 직행
  if (entry.collapseViaTrust &&
      agentState.trustState.trustTowardJudge >= TRUST_THRESHOLDS.voluntaryConfession &&
      (trigger.includes('empathy') || trigger.includes('trust'))) {
    return { transitioned: true, from: currentState, to: 'S5', trigger: 'voluntary_confession' }
  }

  // 2순위: 동기별 특수 전이
  // - LM-4(복수): S2 → S4 스킵 (감정적 폭발)
  // - LM-3(제3자 보호): 보복 걱정 해소 시 S3 → S5 직행
  // - LM-7(관계 유지): 신뢰 높으면 S4 → S5

  // 3순위: config의 transitions 매칭
  // 4순위: Hard Evidence → 최소 1단계 보장
  // 5순위: 증인 증언 → S0~S2에서 1단계 진행
}
```

## 2. 감정 엔진 (emotionEngine.ts)

캐릭터 archetype × 감정 단계별 행동 힌트를 정의.

```typescript
const BEHAVIOR_HINTS: Record<Archetype, Record<EmotionalPhase, string>> = {
  avoidant: {
    defensive: '답변 전에 시선을 아래로 향하고, 단어를 고르듯 천천히 말한다.',
    confident: '어깨를 펴고 단정한 어조로 말한다.',
    shaken: '말이 길어지기 시작하고, "정확히"라는 표현이 반복된다.',
    angry: '목소리가 낮아지며 "제가 그런 사람으로 보이십니까"를 반복한다.',
    resigned: '한숨과 함께 시선이 탁자로 내려간다. 답변이 짧아진다.',
  },
  confrontational: {
    defensive: '팔짱을 끼고 빠르게 반박한다.',
    confident: '목소리가 커지고 단정적으로 말한다.',
    shaken: '말이 빨라지고 같은 표현을 반복한다.',
    angry: '자리에서 일어서려 하고, 목소리가 높아진다.',
    resigned: '고개를 숙이고 한 마디씩 끊어 말한다.',
  },
  // victim_cosplay, cold_logic도 동일 구조
}

// 감정 업데이트: delta 적용 → 0~100 클램핑 → 새 phase 판정
export function updateEmotion(current, delta, archetype): EmotionalState {
  const newValue = Math.max(0, Math.min(100, current.internalValue + delta))
  const newPhase = getEmotionalPhase(newValue)
  return { phase: newPhase, internalValue: newValue, behaviorHint: getBehaviorHint(archetype, newPhase) }
}
```

## 3. Discovery 엔진 (discoveryEngine.ts, 발췌)

4개 메커닉의 핵심 로직.

```typescript
// 감정 4-Tier 설정
export const EMOTION_TIER_CONFIG = [
  { tier: 'calm',      min: 0,  max: 30,  lieTransitionMultiplier: 0.5, slipChance: 0   },
  { tier: 'agitated',  min: 30, max: 60,  lieTransitionMultiplier: 1.0, slipChance: 0   },
  { tier: 'explosive', min: 60, max: 85,  lieTransitionMultiplier: 1.5, slipChance: 0.3 },
  { tier: 'shutdown',  min: 85, max: 100, lieTransitionMultiplier: 0,   slipChance: 0   },
]

// 셧다운이면 질문 불가
export function canInterrogate(emotionValue: number): boolean {
  return getEmotionTier(emotionValue).tier !== 'shutdown'
}

// 진실 공방 트리거 — 같은 쟁점에서 A와 B의 주장이 실질적으로 충돌하는지 확인
export function checkTruthConfrontation(claims, judgments, ...): TruthConfrontationEvent | null {
  // 양측 claim 비교 → 같은 disputeId에서 서로 다른 주장 → 이벤트 생성
}
```

## 4. 증거 엔진 (evidenceEngine.ts)

```typescript
// 증거 잠금 해제 체크 — 선행 증거가 제시되면 후행 증거 잠금 해제
export function checkUnlocks(states, evidence): { updated, newlyUnlocked } {
  for (const e of evidence) {
    if (state.unlocked) continue
    const allRequirementsMet = e.requires.every(reqId => states[reqId]?.presented || states[reqId]?.unlocked)
    if (allRequirementsMet) { updated[e.id] = { ...state, unlocked: true } }
  }
}

// 증거 감별 가능 조건: 2회 이상 조사
export function canAppraise(state: EvidenceRuntimeState): boolean {
  return state.unlocked && state.investigatedActions.length >= 2
}
```

## 5. 판결 채점 엔진 (verdictEngine.ts)

```typescript
export function calculateVerdict(ctx: VerdictContext): VerdictScore {
  const insight = calculateInsight(ctx)   // 진실 파악 정확도
  const authority = calculateAuthority(ctx) // 법정 통제력
  const wisdom = calculateWisdom(ctx)      // 판결 현명함
  const total = Math.round((insight + authority + wisdom) / 3)
  return { insight, authority, wisdom, total }
}

// 통찰: 쟁점별 사실판단 정확도 + 책임비율 정확도 + 과정 보너스
// 권위: 70점 시작 - 위법증거(-15) - 비공개위반(-20) - 턴초과 + 과정보너스
// 지혜: 50점 시작 + 해결방안(+20) - 극단판결(-20) + 모호보류(+10) + 과정보너스
```

## 6. 대화 해석 (dialogueResolver.ts)

```typescript
// 3단계 폴백 구조:
// 1차: 정확한 조건 매칭 (speaker + action + lieState + disputeId + evidence)
// 2차: 같은 쟁점의 가장 가까운 lieState 매칭
// 3차: 감정 상태 기반 범용 폴백
export function resolveDialogue(action, agentA, agentB, evidenceStates): ResolvedDialogue | null {
  // Phase 3~5에서는 이 함수 대신 LLM이 직접 대사를 생성하지만,
  // LLM 실패 시 이 함수가 폴백으로 작동
}
```

## 7. 증인 시스템 (witnessEngine.ts)

```typescript
// LLM으로 증인 증언 생성
export async function generateWitnessTestimony(witness, caseData, agentA, agentB, recentDialogues) {
  // Agent 블록 조합으로 프롬프트 구성
  // 증인의 bias, distortionRisk, witnessProfile.speechStyle 반영
  // 증언 결과: testimony, behaviorHint, relatedDisputes, favorDirection, distorted 여부
}
```
