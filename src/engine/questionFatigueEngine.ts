/**
 * Question Fatigue Engine V2
 * ─────────────────────────────────
 * 쟁점 × 대상 × angleTag 로컬 피로도 +
 * 같은 대상 연속 심문 spotlight 피로도.
 *
 * 기존 questionEffectEngine의 party-level consecutiveSameType 감쇠와
 * 중첩하지 않는 것이 핵심.
 * → resolveQuestionEffect의 externalMultiplier 옵션으로 연동.
 */

import type { PartyId, QuestionType } from '../types'
import type { AngleTag, FatigueLevel } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface QuestionFatigueState {
  /** 쟁점×대상×angleTag 단위 피로도 */
  local: Record<string, {
    streak: number
    lastTurn: number
  }>
  /** 같은 대상 연속 심문 추적 */
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
  resetReason?: 'none' | 'new_evidence' | 'layer_unlock' | 'target_switch' | 'interjection_allow' | 'dossier_execute'
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LOCAL_MULTIPLIER: Record<number, number> = {
  1: 1.0,
  2: 0.7,
  3: 0.35,
  4: 0.1,
}

const SPOTLIGHT_MULTIPLIER: Record<number, number> = {
  1: 1.0,
  2: 0.9,
  3: 0.75,
  4: 0.6,
  5: 0.45,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 초기 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function createInitialFatigueState(): QuestionFatigueState {
  return {
    local: {},
    spotlight: { activeParty: null, streak: 0, lastTurn: 0 },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 세션 상태 (모듈 레벨 — 순환 참조 방지)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let _sessionFatigueState: QuestionFatigueState = createInitialFatigueState()

export function getSessionFatigueState(): QuestionFatigueState {
  return _sessionFatigueState
}

export function setSessionFatigueState(state: QuestionFatigueState): void {
  _sessionFatigueState = state
}

export function resetSessionFatigueState(): void {
  _sessionFatigueState = createInitialFatigueState()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 피로도 선평가 — beat selector 및 미터 배율 결정에 사용 */
export function evaluateQuestionFatigue(
  input: QuestionFatigueInput,
  state: QuestionFatigueState,
): QuestionFatigueAssessment {
  const key = makeLocalKey(input.party, input.disputeId, input.angleTag)
  const prevLocal = state.local[key]

  const localStreak = deriveLocalStreak(input, prevLocal)
  const spotlightStreak = deriveSpotlightStreak(input, state.spotlight)

  const localMultiplier = LOCAL_MULTIPLIER[Math.min(localStreak, 4)] ?? 0.1
  const spotlightMultiplier = SPOTLIGHT_MULTIPLIER[Math.min(spotlightStreak, 5)] ?? 0.45
  const finalMultiplier = clamp(Number((localMultiplier * spotlightMultiplier).toFixed(2)), 0.05, 1)

  const fatigueLevel = toFatigueLevel(finalMultiplier)
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

/** 피로도 확정 커밋 — beat 선택 후 호출 */
export function commitQuestionFatigue(
  input: QuestionFatigueInput,
  state: QuestionFatigueState,
): QuestionFatigueState {
  const next: QuestionFatigueState = {
    local: { ...state.local },
    spotlight: { ...state.spotlight },
  }

  // passive decay: 2턴 이상 안 건드린 로컬 키는 streak -1
  for (const [key, entry] of Object.entries(next.local)) {
    if (input.turn - entry.lastTurn >= 2) {
      next.local[key] = {
        streak: Math.max(1, entry.streak - 1),
        lastTurn: entry.lastTurn,
      }
    }
  }

  // 현재 입력 반영
  const localKey = makeLocalKey(input.party, input.disputeId, input.angleTag)
  const prevLocal = next.local[localKey]
  const localStreak = deriveLocalStreak(input, prevLocal)

  next.local[localKey] = {
    streak: localStreak,
    lastTurn: input.turn,
  }

  // 리셋 이벤트: 해당 쟁점 전체 로컬 피로 초기화
  if (input.resetReason === 'new_evidence' || input.resetReason === 'layer_unlock') {
    resetDisputeKeys(next, input.party, input.disputeId, input.turn)
  }

  // spotlight 추적
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

/** 원시 delta에 피로 배율 적용 */
export function applyFatigueMultiplier(rawDelta: number, assessment: QuestionFatigueAssessment): number {
  return Math.max(0, Math.round(rawDelta * assessment.finalMultiplier))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
      state.local[key] = { streak: 1, lastTurn: turn }
    }
  }
}

function makeLocalKey(party: PartyId, disputeId: string, angleTag: AngleTag): string {
  return `${party}:${disputeId}:${angleTag}`
}

function toFatigueLevel(multiplier: number): FatigueLevel {
  if (multiplier >= 0.9) return 'fresh'
  if (multiplier >= 0.5) return 'wary'
  if (multiplier >= 0.2) return 'high'
  return 'exhausted'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 교착 상태 조회 + Dossier 리셋
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 특정 party+disputeId에 대한 교착 상태 조회 */
export function getStalemateStatus(
  fatigueState: QuestionFatigueState,
  party: string,
  disputeId: string,
): { level: 'normal' | 'warning' | 'stalemate'; maxStreak: number } {
  const prefix = `${party}:${disputeId}:`
  let maxStreak = 0
  for (const [key, entry] of Object.entries(fatigueState.local)) {
    if (key.startsWith(prefix) && entry.streak > maxStreak) {
      maxStreak = entry.streak
    }
  }
  if (maxStreak >= 3) return { level: 'stalemate', maxStreak }
  if (maxStreak >= 2) return { level: 'warning', maxStreak }
  return { level: 'normal', maxStreak }
}

/** Dossier 실행 후 해당 쟁점의 피로도 리셋 */
export function resetFatigueForDossier(party: string, disputeId: string): void {
  const current = getSessionFatigueState()
  const prefix = `${party}:${disputeId}:`
  for (const key of Object.keys(current.local)) {
    if (key.startsWith(prefix)) {
      current.local[key].streak = 0
    }
  }
  setSessionFatigueState({ ...current })
}
