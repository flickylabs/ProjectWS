/**
 * 질문 3종 게임 효과 엔진 (Question Effect Engine)
 * ─────────────────────────────────
 * 질문 유형별로 게임 상태에 미치는 효과를 계산한다.
 *
 * - 모순토큰 (Contradiction Token): 사실추궁 성공 시 생성. lieState 전이 가속.
 * - 누설미터 (Leak Meter): 동기탐색 성공 시 축적. suppression 해제 + 감정 폭발 유도.
 * - 신뢰창구 (Trust Window): 공감접근 성공 시 개방. 자발적 시인 가능성 증가.
 *
 * 설계: V3 게임 루프 — "매 턴 결과가 보이고 다음 선택이 달라지는" 심문 구조
 */

import type { QuestionType, EmotionTier, Stance } from '../types'
import type { LieState } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface QuestionEffectResult {
  /** 어떤 미터에 효과가 적용되었는지 */
  meter: 'contradiction' | 'leak' | 'trust' | 'none'
  /** 미터 변화량 (0이면 효과 없음) */
  delta: number
  /** 게임 효과 */
  effects: QuestionGameEffect[]
  /** UI 피드백 메시지 */
  feedback: string
}

export type QuestionGameEffect =
  | { type: 'lie_transition_bonus'; party: string; disputeId: string; bonus: number }
  | { type: 'suppression_leak'; party: string; leaked: string }
  | { type: 'trust_boost'; party: string; amount: number }
  | { type: 'emotion_shift'; party: string; delta: number }
  | { type: 'defense_weaken'; party: string; blockedMode: string }
  | { type: 'confession_window'; party: string; turns: number }

/** 질문 효과 누적 상태 (파티별) */
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 모순토큰: 사실추궁 1회 성공 시 획득량 */
const CONTRADICTION_BASE = 1
/** 모순토큰: 연속 사실추궁 보너스 (2회째부터) */
const CONTRADICTION_CONSECUTIVE_BONUS = 1
/** 모순토큰: 최대 보유량 */
const CONTRADICTION_MAX = 5
/** 모순토큰 → lieState 전이 보너스 변환율 */
const CONTRADICTION_TO_TRANSITION_BONUS = 10 // 토큰 1개당 전이 확률 +10%

/** 누설미터: 동기탐색 1회 성공 시 기본 축적 */
const LEAK_BASE = 15
/** 누설미터: emotionTier에 따른 추가 축적 */
const LEAK_EMOTION_BONUS: Record<EmotionTier, number> = {
  calm: 0,
  agitated: 10,
  explosive: 20,
  shutdown: -5,
}
/** 누설미터 임계치: suppression 누설 */
const LEAK_THRESHOLD_SUPPRESSION = 50
/** 누설미터 임계치: 감정 폭발 유도 */
const LEAK_THRESHOLD_EXPLOSION = 80

/** 신뢰창구: 공감접근 1회 성공 시 기본 획득 */
const TRUST_BASE = 12
/** 신뢰창구: lieState별 보너스 */
const TRUST_STATE_BONUS: Record<LieState, number> = {
  S0: 0, S1: 3, S2: 5, S3: 8, S4: 12, S5: 0,
}
/** 신뢰창구 임계치: 자백 창구 개방 */
const TRUST_WINDOW_THRESHOLD = 60
/** 연속 같은 유형 질문 시 효과 감소율 */
const DIMINISHING_FACTOR = 0.6

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 초기 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function createInitialMeterState(): QuestionMeterState {
  return {
    contradictionTokens: 0,
    leakMeter: 0,
    trustWindow: 0,
    lastQuestionType: null,
    consecutiveSameType: 0,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** V2 피로도 엔진 연동 옵션 */
export interface ResolveQuestionEffectOptions {
  /**
   * QuestionFatigueEngineV2가 계산한 최종 배율.
   * 제공 시 legacy consecutiveSameType 감쇠를 우회한다.
   */
  externalMultiplier?: number
  /** 명시적으로 legacy 감쇠를 끈다. externalMultiplier 있으면 자동 true. */
  bypassLegacyDiminish?: boolean
}

/**
 * 질문 후 NPC 응답을 분석하여 게임 효과를 계산한다.
 *
 * @param questionType  이번 턴 질문 유형
 * @param party         대상 파티 ID
 * @param disputeId     현재 쟁점
 * @param lieState      NPC의 현재 lieState
 * @param stance        NPC의 이번 턴 stance (blueprintEngine 결과)
 * @param emotionTier   NPC의 감정 단계
 * @param meterState    현재 미터 상태 (업데이트 전)
 * @param options       V2 피로도 엔진 연동 옵션
 * @returns 효과 결과 + 업데이트된 미터 상태
 */
export function resolveQuestionEffect(
  questionType: QuestionType,
  party: string,
  disputeId: string,
  lieState: LieState,
  stance: Stance,
  emotionTier: EmotionTier,
  meterState: QuestionMeterState,
  options: ResolveQuestionEffectOptions = {},
): { result: QuestionEffectResult; updatedMeter: QuestionMeterState } {
  // 연속 같은 유형 추적 (필드는 항상 기록 — analytics/rollback용)
  const isSameType = meterState.lastQuestionType === questionType
  const consecutive = isSameType ? meterState.consecutiveSameType + 1 : 1

  // V2 모드: externalMultiplier 사용, legacy 감쇠 우회
  const useExternal = typeof options.externalMultiplier === 'number'
  const legacyDiminish = consecutive >= 3 ? DIMINISHING_FACTOR : 1
  const diminish = (useExternal || options.bypassLegacyDiminish)
    ? (options.externalMultiplier ?? 1)
    : legacyDiminish

  // evidence_present는 별도 처리 (증거 효과 엔진 담당)
  if (questionType === 'evidence_present') {
    return {
      result: { meter: 'none', delta: 0, effects: [], feedback: '' },
      updatedMeter: { ...meterState, lastQuestionType: questionType, consecutiveSameType: consecutive },
    }
  }

  let result: QuestionEffectResult

  switch (questionType) {
    case 'fact_pursuit':
      result = resolveFactPursuit(party, disputeId, lieState, stance, meterState, diminish)
      break
    case 'motive_search':
      result = resolveMotiveSearch(party, disputeId, lieState, emotionTier, meterState, diminish)
      break
    case 'empathy_approach':
      result = resolveEmpathyApproach(party, disputeId, lieState, emotionTier, meterState, diminish)
      break
  }

  // 미터 업데이트
  const updatedMeter = applyMeterUpdate(meterState, questionType, result.delta, consecutive)

  return { result, updatedMeter }
}

/**
 * 미터 상태에서 현재 활성 효과를 조회한다.
 * UI에서 표시할 때 사용.
 */
export function getMeterEffects(meter: QuestionMeterState): {
  contradictionActive: boolean
  leakWarning: boolean
  leakCritical: boolean
  trustWindowOpen: boolean
} {
  return {
    contradictionActive: meter.contradictionTokens >= 2,
    leakWarning: meter.leakMeter >= LEAK_THRESHOLD_SUPPRESSION,
    leakCritical: meter.leakMeter >= LEAK_THRESHOLD_EXPLOSION,
    trustWindowOpen: meter.trustWindow >= TRUST_WINDOW_THRESHOLD,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 사실추궁 (모순토큰)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveFactPursuit(
  party: string,
  disputeId: string,
  lieState: LieState,
  stance: Stance,
  meter: QuestionMeterState,
  diminish: number,
): QuestionEffectResult {
  const effects: QuestionGameEffect[] = []

  // 사실추궁 성공 판정: deny/hedge 상태에서 질문하면 모순 생성
  const isEffective = stance === 'deny' || stance === 'hedge' || stance === 'blame'
  if (!isEffective) {
    return { meter: 'contradiction', delta: 0, effects: [], feedback: '상대가 이미 방어를 낮추고 있습니다.' }
  }

  // 토큰 획득량 계산
  const isConsecutive = meter.lastQuestionType === 'fact_pursuit'
  let tokenGain = CONTRADICTION_BASE
  if (isConsecutive && meter.consecutiveSameType >= 1) {
    tokenGain += CONTRADICTION_CONSECUTIVE_BONUS
  }
  tokenGain = Math.round(tokenGain * diminish)

  const newTokens = Math.min(meter.contradictionTokens + tokenGain, CONTRADICTION_MAX)

  // 토큰이 2개 이상이면 전이 보너스 효과
  if (newTokens >= 2) {
    effects.push({
      type: 'lie_transition_bonus',
      party,
      disputeId,
      bonus: newTokens * CONTRADICTION_TO_TRANSITION_BONUS,
    })
  }

  // 토큰이 4개 이상이면 방어 약화
  if (newTokens >= 4) {
    effects.push({
      type: 'defense_weaken',
      party,
      blockedMode: 'flat_denial',
    })
  }

  const feedback = newTokens >= 4
    ? `모순 ${newTokens}개 축적 — 완전 부정이 더 이상 통하지 않습니다`
    : newTokens >= 2
      ? `모순 ${newTokens}개 축적 — 진술 균열 감지`
      : `모순 토큰 +${tokenGain}`

  return { meter: 'contradiction', delta: tokenGain, effects, feedback }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 동기탐색 (누설미터)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveMotiveSearch(
  party: string,
  disputeId: string,
  lieState: LieState,
  emotionTier: EmotionTier,
  meter: QuestionMeterState,
  diminish: number,
): QuestionEffectResult {
  const effects: QuestionGameEffect[] = []

  // 기본 축적량
  let leak = Math.round((LEAK_BASE + LEAK_EMOTION_BONUS[emotionTier]) * diminish)

  // lieState가 높을수록 누설 압박 증가
  const stateRank = STATE_RANK[lieState]
  if (stateRank >= 3) leak += 10
  if (stateRank >= 4) leak += 10

  const newMeter = Math.min(meter.leakMeter + leak, 100)

  // suppression 누설 임계
  if (newMeter >= LEAK_THRESHOLD_SUPPRESSION && meter.leakMeter < LEAK_THRESHOLD_SUPPRESSION) {
    effects.push({
      type: 'suppression_leak',
      party,
      leaked: '(숨기던 동기 일부가 드러남)',
    })
    effects.push({
      type: 'emotion_shift',
      party,
      delta: 8,
    })
  }

  // 감정 폭발 임계
  if (newMeter >= LEAK_THRESHOLD_EXPLOSION && meter.leakMeter < LEAK_THRESHOLD_EXPLOSION) {
    effects.push({
      type: 'emotion_shift',
      party,
      delta: 15,
    })
  }

  const feedback = newMeter >= LEAK_THRESHOLD_EXPLOSION
    ? `누설미터 ${newMeter}% — 감정적 방어선 붕괴 직전`
    : newMeter >= LEAK_THRESHOLD_SUPPRESSION
      ? `누설미터 ${newMeter}% — 숨기던 동기가 흘러나오기 시작합니다`
      : `누설미터 +${leak}% (${newMeter}%)`

  return { meter: 'leak', delta: leak, effects, feedback }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 공감접근 (신뢰창구)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveEmpathyApproach(
  party: string,
  disputeId: string,
  lieState: LieState,
  emotionTier: EmotionTier,
  meter: QuestionMeterState,
  diminish: number,
): QuestionEffectResult {
  const effects: QuestionGameEffect[] = []

  // 기본 신뢰 획득
  let trust = Math.round((TRUST_BASE + TRUST_STATE_BONUS[lieState]) * diminish)

  // 감정이 격한 상태에서 공감하면 더 효과적
  if (emotionTier === 'agitated' || emotionTier === 'explosive') {
    trust += 5
  }
  // shutdown 상태에서는 효과 감소
  if (emotionTier === 'shutdown') {
    trust = Math.round(trust * 0.5)
  }

  const newTrust = Math.min(meter.trustWindow + trust, 100)

  // 신뢰 효과 항상 적용
  effects.push({
    type: 'trust_boost',
    party,
    amount: Math.round(trust * 0.5), // 실제 trustTowardJudge에 반영할 양
  })

  // 자백 창구 개방 임계
  if (newTrust >= TRUST_WINDOW_THRESHOLD && meter.trustWindow < TRUST_WINDOW_THRESHOLD) {
    effects.push({
      type: 'confession_window',
      party,
      turns: 3, // 3턴간 자백 가능성 증가
    })
  }

  const feedback = newTrust >= TRUST_WINDOW_THRESHOLD
    ? `신뢰창구 개방 — 자발적 시인 가능성이 높아졌습니다`
    : `신뢰 +${trust} (${newTrust}%)`

  return { meter: 'trust', delta: trust, effects, feedback }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 미터 업데이트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function applyMeterUpdate(
  prev: QuestionMeterState,
  questionType: QuestionType,
  delta: number,
  consecutive: number,
): QuestionMeterState {
  const updated = { ...prev }
  updated.lastQuestionType = questionType
  updated.consecutiveSameType = consecutive

  switch (questionType) {
    case 'fact_pursuit':
      updated.contradictionTokens = Math.min(prev.contradictionTokens + delta, CONTRADICTION_MAX)
      // 다른 유형 사용 안 하면 누설/신뢰 자연 감소
      updated.leakMeter = Math.max(prev.leakMeter - 3, 0)
      updated.trustWindow = Math.max(prev.trustWindow - 2, 0)
      break
    case 'motive_search':
      updated.leakMeter = Math.min(prev.leakMeter + delta, 100)
      // 모순토큰은 유지, 신뢰 약간 감소
      updated.trustWindow = Math.max(prev.trustWindow - 3, 0)
      break
    case 'empathy_approach':
      updated.trustWindow = Math.min(prev.trustWindow + delta, 100)
      // 모순토큰 자연 감소 (공감하면 긴장 풀림)
      updated.contradictionTokens = Math.max(prev.contradictionTokens - 1, 0)
      break
  }

  return updated
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 질문 유형별 유효도 판정 (UI 칩 표시용)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type EffectivenessLevel = 'strong' | 'normal' | 'weak'

export interface EffectivenessResult {
  level: EffectivenessLevel
  hint: string
}

/** 질문 유형의 현재 상황에서의 유효도 판정 */
export function computeEffectiveness(
  questionType: 'fact_pursuit' | 'motive_search' | 'empathy_approach',
  lieState: string,
  emotionTier: 'calm' | 'agitated' | 'explosive' | 'shutdown',
  archetype?: string,
  contradictionTokens?: number,
  trustWindow?: number,
): EffectivenessResult {
  // Codex 합의 반영: fact_pursuit는 S0-S1만 strong, S2는 normal
  if (questionType === 'fact_pursuit') {
    if (['S0', 'S1'].includes(lieState)) return { level: 'strong', hint: '부정 상태에 효과적' }
    if (emotionTier === 'explosive' || emotionTier === 'shutdown') return { level: 'weak', hint: '감정적 상태 — 비효율적' }
    return { level: 'normal', hint: '' }
  }

  if (questionType === 'motive_search') {
    if (['S2', 'S3'].includes(lieState)) return { level: 'strong', hint: '부분 인정 상태에 효과적' }
    if ((trustWindow ?? 50) < 20) return { level: 'weak', hint: '신뢰 부족 — 역공 위험' }
    return { level: 'normal', hint: '' }
  }

  if (questionType === 'empathy_approach') {
    // Codex 합의: S4만 strong, S3은 conditional
    if (lieState === 'S4') return { level: 'strong', hint: '방어가 무너진 상태에 효과적' }
    if (lieState === 'S3') return { level: 'normal', hint: '전가 중 — 조건부 효과' }
    // Codex 합의: cold_logic weak는 S0-S2 && contradictionTokens < 2로 좁힘
    if (archetype === 'cold_logic' && ['S0', 'S1', 'S2'].includes(lieState) && (contradictionTokens ?? 0) < 2) {
      return { level: 'weak', hint: '냉정한 상대 — 증거 필요' }
    }
    return { level: 'normal', hint: '' }
  }

  return { level: 'normal', hint: '' }
}
