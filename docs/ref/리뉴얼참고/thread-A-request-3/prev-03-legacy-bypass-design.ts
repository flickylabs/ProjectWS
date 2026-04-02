/**
 * spouse-01 legacy diminish bypass design
 * --------------------------------------
 * 목적:
 * - questionEffectEngine 의 legacy consecutiveSameType 감쇠와
 *   QuestionFatigueEngineV2 의 angleTag 기반 감쇠가 중첩되지 않게 한다.
 * - 기존 QuestionMeterState.lastQuestionType / consecutiveSameType 필드는 유지한다.
 * - feature flag 로 legacy / V2 를 쉽게 왕복할 수 있게 한다.
 */

import type { QuestionType, EmotionTier, Stance } from '../types'
import type { LieState } from '../types'
import type {
  QuestionEffectResult,
  QuestionMeterState,
} from './questionEffectEngine'
import {
  resolveQuestionEffect as resolveQuestionEffectLegacy,
} from './questionEffectEngine'
import {
  evaluateQuestionFatigue,
  commitQuestionFatigue,
  type QuestionFatigueAssessment,
  type QuestionFatigueState,
} from './questionFatigueEngine'
import {
  deriveAngleTag,
  selectTurnPresentation,
} from './beatSelectorV2'

/* -------------------------------------------------------------------------- */
/* 1. questionEffectEngine patch — externalMultiplier 도입                      */
/* -------------------------------------------------------------------------- */

export interface ResolveQuestionEffectOptions {
  /**
   * QuestionFatigueEngineV2 가 계산한 최종 배율.
   * - undefined: legacy consecutiveSameType 감쇠 사용
   * - number: legacy 감쇠를 우회하고 이 값을 그대로 사용
   */
  externalMultiplier?: number

  /**
   * 명시적으로 legacy 감쇠를 끈다.
   * 안전하게는 externalMultiplier 가 있으면 자동 true 로 취급해도 된다.
   */
  bypassLegacyDiminish?: boolean
}

/**
 * questionEffectEngine.ts patch 포인트
 *
 * BEFORE
 *   const diminish = consecutive >= 3 ? DIMINISHING_FACTOR : 1
 *
 * AFTER
 *   const legacyDiminish = consecutive >= 3 ? DIMINISHING_FACTOR : 1
 *   const useExternal = typeof options.externalMultiplier === 'number'
 *   const diminish = useExternal || options.bypassLegacyDiminish
 *     ? (options.externalMultiplier ?? 1)
 *     : legacyDiminish
 */
export function resolveQuestionEffectPatched(
  questionType: QuestionType,
  party: string,
  disputeId: string,
  lieState: LieState,
  stance: Stance,
  emotionTier: EmotionTier,
  meterState: QuestionMeterState,
  options: ResolveQuestionEffectOptions = {},
): { result: QuestionEffectResult; updatedMeter: QuestionMeterState } {
  /**
   * 구현 권장:
   * 1) 원본 resolveQuestionEffect 를 직접 수정한다.
   * 2) 혹은 내부 helper(resolveFactPursuit / resolveMotiveSearch / resolveEmpathyApproach)를
   *    export 해서 래퍼에서 재조합한다.
   *
   * 여기서는 patch 의 의도를 가장 명확하게 보여주기 위해
   * "원본 함수를 수정한 버전"의 핵심 코드만 스니펫으로 남긴다.
   */

  // NOTE:
  // 실제 코드에서는 questionEffectEngine.ts 내부에 직접 병합하는 편이 안전하다.
  return resolveQuestionEffectLegacy(
    questionType,
    party,
    disputeId,
    lieState,
    stance,
    emotionTier,
    meterState,
    // @ts-expect-error - 기존 시그니처 확장 예정
    options,
  )
}

/* -------------------------------------------------------------------------- */
/* 2. questionEffectEngine.ts 실제 수정 스니펫                                */
/* -------------------------------------------------------------------------- */

/**
 * 아래 블록을 questionEffectEngine.ts 에 반영:
 *
 * export function resolveQuestionEffect(
 *   questionType: QuestionType,
 *   party: string,
 *   disputeId: string,
 *   lieState: LieState,
 *   stance: Stance,
 *   emotionTier: EmotionTier,
 *   meterState: QuestionMeterState,
 *   options: ResolveQuestionEffectOptions = {},
 * ): { result: QuestionEffectResult; updatedMeter: QuestionMeterState } {
 *   const isSameType = meterState.lastQuestionType === questionType
 *   const consecutive = isSameType ? meterState.consecutiveSameType + 1 : 1
 *
 *   const legacyDiminish = consecutive >= 3 ? DIMINISHING_FACTOR : 1
 *   const useExternal = typeof options.externalMultiplier === 'number'
 *   const diminish = useExternal || options.bypassLegacyDiminish
 *     ? (options.externalMultiplier ?? 1)
 *     : legacyDiminish
 *
 *   if (questionType === 'evidence_present') {
 *     return {
 *       result: { meter: 'none', delta: 0, effects: [], feedback: '' },
 *       updatedMeter: {
 *         ...meterState,
 *         lastQuestionType: questionType,
 *         consecutiveSameType: consecutive,
 *       },
 *     }
 *   }
 *
 *   let result: QuestionEffectResult
 *
 *   switch (questionType) {
 *     case 'fact_pursuit':
 *       result = resolveFactPursuit(party, disputeId, lieState, stance, meterState, diminish)
 *       break
 *     case 'motive_search':
 *       result = resolveMotiveSearch(party, disputeId, lieState, emotionTier, meterState, diminish)
 *       break
 *     case 'empathy_approach':
 *       result = resolveEmpathyApproach(party, disputeId, lieState, emotionTier, meterState, diminish)
 *       break
 *   }
 *
 *   const updatedMeter = applyMeterUpdate(meterState, questionType, result.delta, consecutive)
 *   return { result, updatedMeter }
 * }
 */

/* -------------------------------------------------------------------------- */
/* 3. feature flag — 필드는 유지하되 V2 모드에서 감쇠만 우회                   */
/* -------------------------------------------------------------------------- */

export interface Phase3FeatureFlags {
  useBeatSelectorV2: boolean
  useQuestionFatigueV2: boolean
}

export const DEFAULT_PHASE3_FEATURE_FLAGS: Phase3FeatureFlags = {
  useBeatSelectorV2: true,
  useQuestionFatigueV2: true,
}

/**
 * 핵심 원칙
 * - QuestionMeterState.lastQuestionType / consecutiveSameType 는 계속 기록한다.
 * - 이유:
 *   1) legacy 롤백이 쉬움
 *   2) analytics / debug 에 그대로 쓸 수 있음
 *   3) 기존 store shape 를 건드리지 않아 migration 비용이 작음
 *
 * 즉 "필드 삭제"가 아니라 "계산 경로 우회"가 정답이다.
 */

/* -------------------------------------------------------------------------- */
/* 4. useActionDispatch 통합 파이프라인                                         */
/* -------------------------------------------------------------------------- */

export interface HandleQuestionIntegrationInput {
  turn: number
  target: 'a' | 'b'
  disputeId: string
  questionType: QuestionType
  lieState: LieState
  stance: Stance
  emotionTier: EmotionTier
  trustWindowValue: number
  meterState: QuestionMeterState
  fatigueState: QuestionFatigueState
  flags: Phase3FeatureFlags
}

export async function handleQuestionV2Pipeline(input: HandleQuestionIntegrationInput) {
  /**
   * 실제 useActionDispatch 에서는
   * - blueprintEngine.generateBlueprint(...)
   * - v3 loader / evidence / event snapshot
   * 등을 함께 묶게 된다.
   *
   * 아래는 "삽입 순서"가 핵심이다.
   */

  // 1. angleTag 는 selector helper 를 재사용해 파생
  const angleTag = deriveAngleTag({
    questionType: input.questionType,
    layer: input.disputeId === 'd-1' ? 'surface' : 'surface',
    issueRole: 'core_truth',
    blockedVectors: [],
  } as any)

  // 2. 새 피로도 엔진 선평가
  const fatigueAssessment = evaluateQuestionFatigue(
    {
      turn: input.turn,
      party: input.target,
      disputeId: input.disputeId,
      questionType: input.questionType,
      angleTag,
      resetReason: 'none',
    },
    input.fatigueState,
  )

  // 3. questionEffectEngine 에 externalMultiplier 전달
  const { result, updatedMeter } = resolveQuestionEffectPatched(
    input.questionType,
    input.target,
    input.disputeId,
    input.lieState,
    input.stance,
    input.emotionTier,
    input.meterState,
    input.flags.useQuestionFatigueV2
      ? {
          externalMultiplier: fatigueAssessment.finalMultiplier,
          bypassLegacyDiminish: true,
        }
      : {},
  )

  // 4. beat selector 는 fatigueLevel / angleTag 를 그대로 소비
  const presentation = selectTurnPresentation(
    {
      turn: input.turn,
      caseId: 'spouse-01',
      party: input.target,
      disputeId: input.disputeId,
      lieState: input.lieState,
      layer: input.disputeId === 'd-1' ? 'surface' : 'surface',
      issueRole: 'core_truth',
      questionType: input.questionType,
      blueprint: {
        stance: input.stance,
        allowedClaimAtoms: [],
        forbiddenClaimAtoms: [],
      },
      angleTag,
      emotionTier: input.emotionTier,
      trustWindowValue: input.trustWindowValue,
      fatigueLevel: fatigueAssessment.fatigueLevel,
      interjectionState: 'none',
      trapState: 'none',
      blockedVectors: [],
      flags: new Set<string>(),
      usedBeatIds: [],
      usedAntiRepeatGroups: [],
      beatUseCounts: {},
      cooldownUntilTurn: {},
      pendingTransition: null,
      pendingEvent: null,
      caseId: 'spouse-01',
      evidenceMeta: null,
    } as any,
    {
      beats: [],
      transitionBeats: [],
    },
  )

  // 5. selection 확정 뒤에 fatigue state commit
  const nextFatigueState = commitQuestionFatigue(
    {
      turn: input.turn,
      party: input.target,
      disputeId: input.disputeId,
      questionType: input.questionType,
      angleTag,
      resetReason: 'none',
    },
    input.fatigueState,
  )

  return {
    fatigueAssessment,
    result,
    updatedMeter,
    presentation,
    nextFatigueState,
  }
}

/* -------------------------------------------------------------------------- */
/* 5. V2 모드에서 consecutiveSameType 를 "무시"하는 방식                        */
/* -------------------------------------------------------------------------- */

/**
 * 선택지 A — options 분기 (권장)
 *
 * 장점:
 * - 최소 수정
 * - 기존 QuestionMeterState 구조 유지
 * - call site 에서 의도를 명확히 볼 수 있음
 *
 * 사용:
 *   resolveQuestionEffect(..., {
 *     externalMultiplier: assessment.finalMultiplier,
 *     bypassLegacyDiminish: true,
 *   })
 */

/**
 * 선택지 B — store feature flag
 *
 *   const useQuestionFatigueV2 = state.featureFlags.useQuestionFatigueV2
 *   const effectOptions = useQuestionFatigueV2
 *     ? { externalMultiplier: assessment.finalMultiplier, bypassLegacyDiminish: true }
 *     : {}
 *
 * 장점:
 * - rollout / rollback 쉬움
 * 단점:
 * - 테스트에서 flag wiring 이 한 단계 더 필요
 */

/**
 * 선택지 C — 별도 helper
 *
 *   const effectOptions = buildQuestionEffectOptions(flags, assessment)
 *
 * 장점:
 * - call site 간결
 * 단점:
 * - 결국 내부적으로는 A/B 와 같은 분기
 *
 * 결론:
 * - 저장 필드는 유지
 * - 감쇠 계산만 options 로 우회
 * - rollout 은 feature flag 로 관리
 */

/* -------------------------------------------------------------------------- */
/* 6. 테스트 시나리오 3개                                                        */
/* -------------------------------------------------------------------------- */

/**
 * 아래는 vitest 기준 예시.
 * "35% / 100% / 45%"는 assessment.finalMultiplier 검증에 초점을 둔다.
 * questionEffectEngine 쪽은 그 multiplier 를 그대로 받았는지만 보면 된다.
 */

export const questionFatigueBypassTests = `
import { describe, expect, it } from 'vitest'
import {
  createInitialQuestionFatigueState,
  evaluateQuestionFatigue,
  commitQuestionFatigue,
} from './questionFatigueEngine'
import { createInitialMeterState, resolveQuestionEffect } from './questionEffectEngine'

describe('question fatigue legacy bypass', () => {
  it('같은 angleTag 3회 연속 → 효과 35%', () => {
    let fatigue = createInitialQuestionFatigueState()

    fatigue = commitQuestionFatigue(
      { turn: 1, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' },
      fatigue,
    )
    fatigue = commitQuestionFatigue(
      { turn: 2, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' },
      fatigue,
    )

    const assessment = evaluateQuestionFatigue(
      { turn: 3, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' },
      fatigue,
    )

    expect(assessment.localStreak).toBe(3)
    expect(assessment.finalMultiplier).toBe(0.35)

    const meter = createInitialMeterState()
    const { result } = resolveQuestionEffect(
      'motive_search',
      'a',
      'd-1',
      'S2',
      'partial',
      'agitated',
      meter,
      { externalMultiplier: assessment.finalMultiplier, bypassLegacyDiminish: true },
    )

    expect(result.delta).toBe(9) // (15 + 10) * 0.35 = 8.75 → 9
  })

  it('angleTag 전환 → 피로 리셋 → 효과 100%', () => {
    let fatigue = createInitialQuestionFatigueState()

    fatigue = commitQuestionFatigue(
      { turn: 1, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' },
      fatigue,
    )
    fatigue = commitQuestionFatigue(
      { turn: 2, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' },
      fatigue,
    )

    const assessment = evaluateQuestionFatigue(
      { turn: 3, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'responsibility', resetReason: 'none' },
      fatigue,
    )

    expect(assessment.localStreak).toBe(1)
    expect(assessment.finalMultiplier).toBe(1)
  })

  it('같은 대상 5회 연속(spotlight) → 45%로 감소', () => {
    let fatigue = createInitialQuestionFatigueState()

    fatigue = commitQuestionFatigue(
      { turn: 1, party: 'b', disputeId: 'd-2', questionType: 'empathy_approach', angleTag: 'emotion', resetReason: 'none' },
      fatigue,
    )
    fatigue = commitQuestionFatigue(
      { turn: 2, party: 'b', disputeId: 'd-2', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' },
      fatigue,
    )
    fatigue = commitQuestionFatigue(
      { turn: 3, party: 'b', disputeId: 'd-3', questionType: 'fact_pursuit', angleTag: 'context', resetReason: 'none' },
      fatigue,
    )
    fatigue = commitQuestionFatigue(
      { turn: 4, party: 'b', disputeId: 'd-5', questionType: 'motive_search', angleTag: 'emotion', resetReason: 'none' },
      fatigue,
    )

    const assessment = evaluateQuestionFatigue(
      { turn: 5, party: 'b', disputeId: 'd-2', questionType: 'empathy_approach', angleTag: 'emotion', resetReason: 'none' },
      fatigue,
    )

    expect(assessment.spotlightStreak).toBe(5)
    expect(assessment.localStreak).toBe(1)
    expect(assessment.finalMultiplier).toBe(0.45)
  })
})
`

/* -------------------------------------------------------------------------- */
/* 7. 실무 메모                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * 1) 이 패치의 핵심은 "legacy 감쇠 제거"가 아니다.
 *    - state shape, telemetry, rollback 지점을 그대로 보존한다.
 *    - 단지 V2 모드에서 diminish 계산만 externalMultiplier 로 대체한다.
 *
 * 2) spouse-01 파일럿에서는
 *    - useQuestionFatigueV2 = true
 *    - useBeatSelectorV2 = true
 *    를 함께 켜는 것을 권장한다.
 *
 * 3) contradiction token 의 base delta 는 1 이라 낮은 multiplier 에서 0이 나올 수 있다.
 *    - 현재 규칙상 의도된 결과로 볼 수 있다(같은 angleTag 반복 억제).
 *    - 체감상 너무 약하면 future patch 에서 fact_pursuit 만 min 1 보정 or float storage 검토.
 */
