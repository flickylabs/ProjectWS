/**
 * Question Fatigue Engine V2
 * --------------------------
 * 목표:
 * - 쟁점 × 대상 × angleTag 로컬 피로도
 * - 같은 대상 연속 심문 spotlight 피로도
 * - 새로운 증거 / 새 layer / 대상 전환 시 피로 회복
 * - fatigue_response 비트 트리거
 *
 * 기존 questionEffectEngine 의 party-level consecutiveSameType 감소와
 * 중첩하지 않는 것이 핵심이다.
 */

import type { PartyId } from './game'
import type { QuestionType } from './renewal'
import type { AngleTag, FatigueLevel } from './01-beat-script-v2-schema'

export interface QuestionFatigueState {
  local: Record<string, {
    streak: number
    lastTurn: number
  }>
  spotlight: {
    activeParty: PartyId | null
    streak: number
    lastTurn: number
  }
}

export interface QuestionFatigueInput {
  turn: number
  party: PartyId
  disputeId: string
  questionType: QuestionType
  angleTag: AngleTag

  /**
   * evidence_present / layer unlock / interjection 허용 등
   * 반복을 끊는 회복 이벤트
   */
  resetReason?: 'none' | 'new_evidence' | 'layer_unlock' | 'target_switch' | 'interjection_allow'
}

export interface QuestionFatigueAssessment {
  localKey: string
  localStreak: number
  spotlightStreak: number
  localMultiplier: number
  spotlightMultiplier: number
  finalMultiplier: number
  fatigueLevel: FatigueLevel
  shouldTriggerFatigueBeat: boolean
  debug: string[]
}

const LOCAL_MULTIPLIER_BY_STREAK: Record<number, number> = {
  1: 1.0,
  2: 0.7,
  3: 0.35,
  4: 0.1,
}

const SPOTLIGHT_MULTIPLIER_BY_STREAK: Record<number, number> = {
  1: 1.0,
  2: 0.9,
  3: 0.75,
  4: 0.6,
  5: 0.45,
}

export function createInitialQuestionFatigueState(): QuestionFatigueState {
  return {
    local: {},
    spotlight: {
      activeParty: null,
      streak: 0,
      lastTurn: 0,
    },
  }
}

export function evaluateQuestionFatigue(
  input: QuestionFatigueInput,
  state: QuestionFatigueState,
): QuestionFatigueAssessment {
  const key = makeLocalKey(input.party, input.disputeId, input.angleTag)
  const prevLocal = state.local[key]

  const localStreak = deriveLocalStreak(input, prevLocal)
  const spotlightStreak = deriveSpotlightStreak(input, state.spotlight)

  const localMultiplier = LOCAL_MULTIPLIER_BY_STREAK[Math.min(localStreak, 4)] ?? 0.1
  const spotlightMultiplier = SPOTLIGHT_MULTIPLIER_BY_STREAK[Math.min(spotlightStreak, 5)] ?? 0.45
  const finalMultiplier = clamp(Number((localMultiplier * spotlightMultiplier).toFixed(2)), 0.05, 1)

  const fatigueLevel = toFatigueLevel(finalMultiplier, localStreak)
  const shouldTriggerFatigueBeat = localStreak >= 3 || fatigueLevel === 'high' || fatigueLevel === 'exhausted'

  return {
    localKey: key,
    localStreak,
    spotlightStreak,
    localMultiplier,
    spotlightMultiplier,
    finalMultiplier,
    fatigueLevel,
    shouldTriggerFatigueBeat,
    debug: [
      `local:${localStreak}`,
      `spotlight:${spotlightStreak}`,
      `multiplier:${finalMultiplier}`,
    ],
  }
}

export function commitQuestionFatigue(
  input: QuestionFatigueInput,
  state: QuestionFatigueState,
): QuestionFatigueState {
  const next: QuestionFatigueState = {
    local: { ...state.local },
    spotlight: { ...state.spotlight },
  }

  // passive decay: 2턴 이상 안 건드린 로컬 키는 -1
  for (const [key, entry] of Object.entries(next.local)) {
    if (input.turn - entry.lastTurn >= 2) {
      next.local[key] = {
        streak: Math.max(1, entry.streak - 1),
        lastTurn: entry.lastTurn,
      }
    }
  }

  const localKey = makeLocalKey(input.party, input.disputeId, input.angleTag)
  const prevLocal = next.local[localKey]
  const localStreak = deriveLocalStreak(input, prevLocal)

  next.local[localKey] = {
    streak: localStreak,
    lastTurn: input.turn,
  }

  if (input.resetReason === 'new_evidence' || input.resetReason === 'layer_unlock') {
    resetDisputeKeys(next, input.party, input.disputeId, input.turn)
  }

  if (next.spotlight.activeParty === input.party) {
    next.spotlight = {
      activeParty: input.party,
      streak: next.spotlight.streak + 1,
      lastTurn: input.turn,
    }
  } else {
    next.spotlight = {
      activeParty: input.party,
      streak: 1,
      lastTurn: input.turn,
    }
  }

  if (input.resetReason === 'target_switch' || input.resetReason === 'interjection_allow') {
    next.spotlight.streak = 1
  }

  return next
}

export function applyFatigueMultiplier(rawDelta: number, assessment: QuestionFatigueAssessment): number {
  return Math.max(0, Math.round(rawDelta * assessment.finalMultiplier))
}

function deriveLocalStreak(
  input: QuestionFatigueInput,
  prev: { streak: number; lastTurn: number } | undefined,
): number {
  if (!prev) return 1
  if (input.resetReason && input.resetReason !== 'none') return 1
  if (input.turn - prev.lastTurn > 1) return 1
  return prev.streak + 1
}

function deriveSpotlightStreak(
  input: QuestionFatigueInput,
  prev: QuestionFatigueState['spotlight'],
): number {
  if (input.resetReason === 'target_switch' || input.resetReason === 'interjection_allow') {
    return 1
  }
  if (prev.activeParty !== input.party) return 1
  if (input.turn - prev.lastTurn > 1) return 1
  return prev.streak + 1
}

function resetDisputeKeys(
  state: QuestionFatigueState,
  party: PartyId,
  disputeId: string,
  turn: number,
): void {
  for (const key of Object.keys(state.local)) {
    if (key.startsWith(`${party}:${disputeId}:`)) {
      state.local[key] = {
        streak: 1,
        lastTurn: turn,
      }
    }
  }
}

function makeLocalKey(party: PartyId, disputeId: string, angleTag: AngleTag): string {
  return `${party}:${disputeId}:${angleTag}`
}

function toFatigueLevel(multiplier: number, localStreak: number): FatigueLevel {
  if (multiplier >= 0.9) return 'fresh'
  if (multiplier >= 0.5) return 'wary'
  if (multiplier >= 0.2) return 'high'
  return 'exhausted'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * questionEffectEngine 통합 권장:
 *
 * 1. assessment = evaluateQuestionFatigue(...)
 * 2. result = resolveQuestionEffect(...)
 * 3. result.delta = applyFatigueMultiplier(result.delta, assessment)
 *
 * 가능하다면 questionEffectEngine 내부의
 * lastQuestionType / consecutiveSameType 기반 감쇠는 legacy flag로 끄는 편이 안전하다.
 */
