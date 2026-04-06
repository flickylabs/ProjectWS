/**
 * 게임 이벤트 트리거 엔진 (Game Event Trigger Engine)
 * ─────────────────────────────────
 * 매 턴 종료 시 게임 상태를 평가하여 이벤트 발생 여부를 결정한다.
 *
 * 4종 이벤트:
 * 1. 모순 감지 (Contradiction) — 양측 진술 충돌 또는 증거와 불일치 탐지
 * 2. 끼어들기 (Interjection) — 상대방이 자발적으로 반박/보충
 * 3. 감정 폭발 (Emotional Burst) — 감정 임계 초과 시 통제 불능 발화
 * 4. 새 쟁점 출현 (Dispute Emergence) — 숨겨진 쟁점이 조건 충족으로 드러남
 *
 * 설계 원칙: GPT V3 데이터(텍스트)가 없어도 트리거 조건만으로 작동.
 * 텍스트는 나중에 GPT 데이터로 채움.
 */

import type { LieState, EmotionalPhase, PartyId } from '../types'
import type { EmotionTier, QuestionType, ReadinessState } from '../types'
import type { QuestionMeterState } from './questionEffectEngine'
import { getMeterEffects } from './questionEffectEngine'
import {
  getEventTexts,
  getAvailableInterjections,
  getAvailableOutbursts,
  getTransitionBeat,
} from './v3GameLoopLoader'
import type { TransitionBeat } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type GameEventType = 'contradiction' | 'interjection' | 'emotional_burst' | 'dispute_emergence'

export interface GameEventTrigger {
  type: GameEventType
  /** 관련 파티 */
  party: PartyId
  /** 관련 쟁점 */
  disputeId: string
  /** 이벤트 심각도 (UI 연출 강도 결정) */
  severity: 'minor' | 'major' | 'critical'
  /** 이벤트 설명 (GPT 텍스트가 없을 때의 기본 설명) */
  description: string
  /** 이벤트에 따른 게임 효과 (트리거 시 즉시 적용) */
  effects: TriggerEffect[]
  /** 플레이어 선택에 따라 지연 적용되는 효과 (모달 선택 시 적용) */
  deferredEffects?: TriggerEffect[]
  /** GPT V3 데이터 슬롯 (나중에 채워짐) */
  scriptSlot?: { textId: string; fallbackText: string }
}

export type TriggerEffect =
  | { type: 'lie_advance'; party: PartyId; disputeId: string; steps: 1 | 2 }
  | { type: 'emotion_spike'; party: PartyId; delta: number }
  | { type: 'trust_change'; party: PartyId; delta: number }
  | { type: 'reveal_dispute'; disputeId: string; via: string }
  | { type: 'block_defense'; party: PartyId; mode: string }
  | { type: 'grant_interjection'; party: PartyId; text: string }

/** 트리거 평가에 필요한 턴 스냅샷 */
export interface TurnSnapshot {
  caseId: string
  turn: number
  /** 현재 심문 대상 */
  activeParty: PartyId
  /** 이번 턴 질문 유형 */
  questionType: QuestionType
  /** 양측 lieState */
  lieStates: {
    a: Record<string, { currentState: LieState }>
    b: Record<string, { currentState: LieState }>
  }
  /** 양측 감정 */
  emotions: {
    a: { phase: EmotionalPhase; internalValue: number }
    b: { phase: EmotionalPhase; internalValue: number }
  }
  /** 양측 신뢰 */
  trust: {
    a: { trustTowardJudge: number }
    b: { trustTowardJudge: number }
  }
  /** 질문 미터 */
  meters: {
    a: QuestionMeterState
    b: QuestionMeterState
  }
  /** 쟁점 가시성 */
  disputeVisibility: Record<string, 'visible' | 'hidden' | 'emerged' | 'inactive'>
  /** 이번 턴에 전이된 lieState 목록 */
  transitionsThisTurn: { party: PartyId; disputeId: string; from: LieState; to: LieState }[]
  /** Readiness 상태 */
  readiness: ReadinessState | null
  /** 현재 포커스 쟁점 */
  focusDisputeId: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 감정 폭발 임계값 (emotionalState.internalValue) */
const EMOTIONAL_BURST_THRESHOLD = 75
/** 끼어들기 발생 최소 턴 간격 */
const INTERJECTION_MIN_INTERVAL = 3
/** 모순 감지 최소 모순토큰 */
const CONTRADICTION_MIN_TOKENS = 3
/** 새 쟁점 출현 최소 진행 쟁점 */
const EMERGENCE_MIN_PROGRESS = 2

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 상태 (이벤트 쿨다운 추적)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lastInterjectionTurn = -99
let lastEmotionalBurstTurn = -99
let lastContradictionTurn = -99

export function resetEventTriggerState(): void {
  lastInterjectionTurn = -99
  lastEmotionalBurstTurn = -99
  lastContradictionTurn = -99
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 매 턴 종료 시 호출: 모든 이벤트 트리거를 평가한다.
 * 복수의 이벤트가 동시에 발생할 수 있지만, 우선순위에 따라 최대 1개만 반환.
 *
 * 우선순위: 모순 감지 > 감정 폭발 > 새 쟁점 > 끼어들기
 */
export function evaluateEventTriggers(snapshot: TurnSnapshot): GameEventTrigger | null {
  // 1순위: 모순 감지
  const contradiction = checkContradiction(snapshot)
  if (contradiction) {
    lastContradictionTurn = snapshot.turn
    return contradiction
  }

  // 2순위: 감정 폭발
  const burst = checkEmotionalBurst(snapshot)
  if (burst) {
    lastEmotionalBurstTurn = snapshot.turn
    return burst
  }

  // 3순위: 새 쟁점 출현
  const emergence = checkDisputeEmergence(snapshot)
  if (emergence) return emergence

  // 4순위: 끼어들기
  const interjection = checkInterjection(snapshot)
  if (interjection) {
    lastInterjectionTurn = snapshot.turn
    return interjection
  }

  return null
}

/**
 * 이벤트 트리거의 효과를 게임 상태에 적용하기 위한 명령 목록 반환.
 * Store에서 이 목록을 순회하며 실제 상태 변경.
 */
export function getEventEffects(trigger: GameEventTrigger): TriggerEffect[] {
  return trigger.effects
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 모순 감지
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkContradiction(snapshot: TurnSnapshot): GameEventTrigger | null {
  // 쿨다운 체크
  if (snapshot.turn - lastContradictionTurn < 2) return null

  const party = snapshot.activeParty
  const meterEffects = getMeterEffects(snapshot.meters[party])

  // 조건 1: 모순토큰 3개 이상 축적
  if (snapshot.meters[party].contradictionTokens < CONTRADICTION_MIN_TOKENS) return null

  // 조건 2: 현재 쟁점에서 deny/hedge 상태
  const lieEntry = snapshot.lieStates[party][snapshot.focusDisputeId]
  if (!lieEntry) return null
  const rank = STATE_RANK[lieEntry.currentState]
  if (rank > 2) return null // partial 이상이면 이미 모순 관련 없음

  const severity = snapshot.meters[party].contradictionTokens >= 5 ? 'critical'
    : snapshot.meters[party].contradictionTokens >= 4 ? 'major' : 'minor'

  // 모순 효과는 플레이어 선택(지적/넘어간다)에 따라 지연 적용
  const deferredEffects: TriggerEffect[] = [
    { type: 'lie_advance', party, disputeId: snapshot.focusDisputeId, steps: severity === 'critical' ? 2 : 1 },
    { type: 'emotion_spike', party, delta: severity === 'critical' ? 15 : 8 },
  ]

  if (severity === 'critical') {
    deferredEffects.push({ type: 'block_defense', party, mode: 'flat_denial' })
  }

  // 즉시 적용 효과는 없음 — 트리거는 "기회 감지"만
  const effects: TriggerEffect[] = []

  // V3 텍스트 조회
  const events = getEventTexts(snapshot.caseId)
  const contradictions = events?.contradictions ?? []
  // 토큰 수에 따라 적절한 모순 이벤트 선택
  const eventIdx = Math.min(snapshot.meters[party].contradictionTokens - CONTRADICTION_MIN_TOKENS, contradictions.length - 1)
  const v3Event = contradictions[Math.max(0, eventIdx)]

  return {
    type: 'contradiction',
    party,
    disputeId: snapshot.focusDisputeId,
    severity,
    description: v3Event
      ? `${v3Event.statementA} ${v3Event.statementB}`
      : severity === 'critical'
        ? '결정적 모순이 발각되었습니다. 더 이상 부인할 수 없습니다.'
        : '진술의 모순점이 지적되었습니다.',
    effects,
    deferredEffects,
    scriptSlot: v3Event
      ? { textId: v3Event.id, fallbackText: v3Event.npcReaction }
      : { textId: `contradiction_${severity}`, fallbackText: '' },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 끼어들기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkInterjection(snapshot: TurnSnapshot): GameEventTrigger | null {
  // 쿨다운 체크
  if (snapshot.turn - lastInterjectionTurn < INTERJECTION_MIN_INTERVAL) return null

  const otherParty: PartyId = snapshot.activeParty === 'a' ? 'b' : 'a'

  // 조건: 상대방의 감정이 agitated 이상 + 현재 쟁점에서 S1+ 상태
  const otherEmotion = snapshot.emotions[otherParty]
  if (otherEmotion.internalValue < 40) return null

  const otherLie = snapshot.lieStates[otherParty][snapshot.focusDisputeId]
  if (!otherLie) return null
  const rank = STATE_RANK[otherLie.currentState]
  if (rank < 1) return null // S0이면 끼어들기 동기 없음

  // 추가 조건: 현재 질문이 사실추궁/증거제시일 때 더 잘 발생
  const isProvocative = snapshot.questionType === 'fact_pursuit' || snapshot.questionType === 'evidence_present'
  if (!isProvocative && otherEmotion.internalValue < 60) return null

  const severity = otherEmotion.internalValue >= 70 ? 'major' : 'minor'

  // V3 텍스트 조회
  const v3Interjections = getAvailableInterjections(snapshot.caseId, otherParty)
  const v3Event = v3Interjections[0] // 첫 번째 미사용 이벤트

  return {
    type: 'interjection',
    party: otherParty,
    disputeId: snapshot.focusDisputeId,
    severity,
    description: v3Event
      ? v3Event.interjectionLine
      : severity === 'major'
        ? '상대방이 참지 못하고 강하게 끼어듭니다.'
        : '상대방이 짧게 반박합니다.',
    effects: [
      { type: 'emotion_spike', party: otherParty, delta: -5 },
      { type: 'trust_change', party: otherParty, delta: -5 },
    ],
    scriptSlot: v3Event
      ? { textId: v3Event.id, fallbackText: v3Event.interjectionLine }
      : { textId: `interjection_${severity}`, fallbackText: '' },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 감정 폭발
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkEmotionalBurst(snapshot: TurnSnapshot): GameEventTrigger | null {
  // 쿨다운 체크 (최소 4턴 간격)
  if (snapshot.turn - lastEmotionalBurstTurn < 4) return null

  const party = snapshot.activeParty
  const emotion = snapshot.emotions[party]

  // 조건 1: 감정 임계 초과
  if (emotion.internalValue < EMOTIONAL_BURST_THRESHOLD) return null

  // 조건 2: 누설미터 80% 이상이면 감정 폭발 확정
  const meterEffects = getMeterEffects(snapshot.meters[party])
  const isLeakCritical = meterEffects.leakCritical

  // 조건 3: 최근 전이가 있었으면 더 잘 발생
  const recentTransition = snapshot.transitionsThisTurn.some(t => t.party === party)

  if (!isLeakCritical && !recentTransition && emotion.internalValue < 85) return null

  // 감정 폭발이 뭘 드러내는가
  const severity = (isLeakCritical && emotion.internalValue >= 85) ? 'critical' : 'major'

  const effects: TriggerEffect[] = [
    { type: 'emotion_spike', party, delta: -20 }, // 폭발 후 급감
  ]

  // critical이면 lieState 1단계 진행
  if (severity === 'critical') {
    effects.push({ type: 'lie_advance', party, disputeId: snapshot.focusDisputeId, steps: 1 })
  }

  // V3 텍스트 조회
  const v3Outbursts = getAvailableOutbursts(snapshot.caseId, party)
  const v3Event = v3Outbursts[0]

  return {
    type: 'emotional_burst',
    party,
    disputeId: snapshot.focusDisputeId,
    severity,
    description: v3Event
      ? v3Event.outburstLine
      : severity === 'critical'
        ? '감정이 폭발하며 숨기던 사실의 일부가 드러납니다.'
        : '감정을 주체하지 못하고 격한 반응을 보입니다.',
    effects,
    scriptSlot: v3Event
      ? { textId: v3Event.id, fallbackText: v3Event.outburstLine }
      : { textId: `emotional_burst_${severity}`, fallbackText: '' },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 새 쟁점 출현
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkDisputeEmergence(snapshot: TurnSnapshot): GameEventTrigger | null {
  // 숨겨진 쟁점이 있는지 확인
  const hiddenDisputes = Object.entries(snapshot.disputeVisibility)
    .filter(([_, v]) => v === 'hidden')
    .map(([id]) => id)

  if (hiddenDisputes.length === 0) return null

  // 조건: 진행된 쟁점이 EMERGENCE_MIN_PROGRESS개 이상
  if (!snapshot.readiness) return null
  const progressedCount = snapshot.readiness.crackedDisputeCount + snapshot.readiness.resolvedDisputeCount
  if (progressedCount < EMERGENCE_MIN_PROGRESS) return null

  // 조건: 이번 턴에 S3 이상 전이가 있었으면 관련 숨겨진 쟁점 출현
  const significantTransition = snapshot.transitionsThisTurn.find(t =>
    STATE_RANK[t.to] >= 3 && STATE_RANK[t.from] < 3,
  )

  if (!significantTransition) return null

  // 첫 번째 숨겨진 쟁점 출현
  const emergingId = hiddenDisputes[0]

  return {
    type: 'dispute_emergence',
    party: significantTransition.party,
    disputeId: emergingId,
    severity: 'major',
    description: '심문 과정에서 새로운 쟁점이 드러났습니다.',
    effects: [
      { type: 'reveal_dispute', disputeId: emergingId, via: `lie_advance_${significantTransition.disputeId}` },
    ],
    scriptSlot: { textId: `emergence_${emergingId}`, fallbackText: '' },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}
