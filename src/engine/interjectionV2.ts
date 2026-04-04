/**
 * Interjection V2 — 패턴 보장 + 지식 차등 끼어들기 엔진
 * ─────────────────────────────────
 * 기존 gameEventTriggerEngine.checkInterjection() + useActionDispatch 자동 허용 흐름을
 * pending choice → allow/block resolution으로 분리.
 *
 * 1) 같은 대상 2턴 연속 + 감정 40+ → 35~45%
 * 2) 같은 대상 3턴 연속 → 100% 보장
 * 3) quadrant/beliefMode에 따라 정보 수준 차등
 * 4) 허용: link/atom/readiness + 피로 리셋 / 제지: authority -2 + resentment
 */

import type { PartyId, QuestionType } from '../types'
import type { KnowledgeQuadrant } from '../types'
import type { LieState } from '../types'
import type { EmotionalPhase } from '../types'
import type { BeatScriptV2, BeliefMode, MisconceptionState } from '../types'
import type { DisputeV2 } from '../types'
import type { Archetype } from '../types/character'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type InterjectionTriggerReason =
  | 'forced_secret_reveal'
  | 'forced_blame_shift'
  | 'focus_streak_two'
  | 'focus_streak_three'
  | 'soft_emotion_spike'
  | 'retaliation_link'

export type InterjectionInfoLevel =
  | 'emotional_only'
  | 'detail_rebuttal'
  | 'misbelief_escalation'
  | 'trap_signal'

export type InterjectionChoice = 'allow' | 'block'

export interface InterjectionFocusTracker {
  currentTarget: PartyId | null
  streak: number
  lastTurn: number
}

export interface InterjectionResentmentState {
  stacks: number
  untilTurn: number
}

export interface InterjectionTrackerState {
  focus: InterjectionFocusTracker
  cooldownUntilTurnByParty: Partial<Record<PartyId, number>>
  usedCountByParty: Partial<Record<PartyId, number>>
  resentmentByParty: Partial<Record<PartyId, InterjectionResentmentState>>
}

export type InterjectionResolutionEffect =
  | { type: 'reveal_atom'; atomId: string }
  | { type: 'reveal_link'; linkId: string }
  | { type: 'trap_signal'; signal: string }
  | { type: 'readiness_nudge'; amount: number }
  | { type: 'reset_fatigue'; scope: 'target_dispute' | 'target_party' }
  | { type: 'authority_delta'; amount: number }
  | { type: 'set_flag'; flag: string }
  | { type: 'set_resentment'; party: PartyId; stacks: number; untilTurn: number }

export interface InterjectionOpportunityV2 {
  type: 'interjection'
  textId: string
  line: string
  choiceLabels: [string, string]
  interruptor: PartyId
  target: PartyId
  disputeId: string
  quadrant: KnowledgeQuadrant
  beliefMode?: BeliefMode
  misconceptionState?: MisconceptionState
  triggerReason: InterjectionTriggerReason
  infoLevel: InterjectionInfoLevel
  focusStreak: number
  chanceApplied: number
  severity: 'minor' | 'major'
  allowEffects: InterjectionResolutionEffect[]
  blockEffects: InterjectionResolutionEffect[]
}

export interface InterjectionEvaluationInput {
  caseId: string
  turn: number
  target: PartyId
  dispute: DisputeV2
  questionType: QuestionType
  currentLayer: 'surface' | 'motive' | 'core'
  interruptor: PartyId
  interruptorEmotionValue: number
  interruptorEmotionPhase: EmotionalPhase
  targetTransition?: { from: LieState; to: LieState } | null
  isSeparated: boolean
  flags: Set<string>
  tracker: InterjectionTrackerState
  interruptorArchetype?: Archetype
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  cooldownTurns: 3,
  maxPerPartyPerCase: 2,
  focusTwoMinChance: 0.35,
  focusTwoMaxChance: 0.45,
  softEmotionChance: 0.15,
  emotionThreshold: 40,
  guaranteeFocusStreak: 3,
  resentmentStacks: 1,
  resentmentDuration: 3,
  allowReadinessNudge: 0.5,
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 초기 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function createInitialInterjectionTracker(): InterjectionTrackerState {
  return {
    focus: { currentTarget: null, streak: 0, lastTurn: 0 },
    cooldownUntilTurnByParty: {},
    usedCountByParty: {},
    resentmentByParty: {},
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 세션 상태 (모듈 레벨)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let _sessionTracker: InterjectionTrackerState = createInitialInterjectionTracker()

export function getSessionInterjectionTracker(): InterjectionTrackerState {
  return _sessionTracker
}

export function setSessionInterjectionTracker(t: InterjectionTrackerState): void {
  _sessionTracker = t
}

export function resetSessionInterjectionTracker(): void {
  _sessionTracker = createInitialInterjectionTracker()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** focus streak 갱신 — 질문/증거 처리 직후 호출 */
export function commitInterjectionFocus(
  tracker: InterjectionTrackerState,
  turn: number,
  target: PartyId,
): InterjectionTrackerState {
  const next = cloneTracker(tracker)

  if (next.focus.currentTarget === target && turn - next.focus.lastTurn <= 1) {
    next.focus = { currentTarget: target, streak: next.focus.streak + 1, lastTurn: turn }
  } else {
    next.focus = { currentTarget: target, streak: 1, lastTurn: turn }
  }

  // 만료된 resentment 정리
  for (const [party, entry] of Object.entries(next.resentmentByParty)) {
    if (turn > entry.untilTurn) delete next.resentmentByParty[party as PartyId]
  }

  return next
}

/** 끼어들기 기회 평가 — gameEventTriggerEngine.checkInterjection 대체 */
export function evaluateInterjectionOpportunity(
  input: InterjectionEvaluationInput,
): InterjectionOpportunityV2 | null {
  if (input.isSeparated) return null

  const { interruptor, target, tracker } = input

  // 상한/쿨다운 체크
  if ((tracker.usedCountByParty[interruptor] ?? 0) >= CONFIG.maxPerPartyPerCase) return null
  if ((tracker.cooldownUntilTurnByParty[interruptor] ?? 0) > input.turn) return null

  const focusStreak = tracker.focus.currentTarget === target ? tracker.focus.streak : 1
  const triggerReason = deriveTriggerReason(input, focusStreak)
  if (!triggerReason) return null

  const chance = deriveChance(input, focusStreak, triggerReason)
  if (chance <= 0) return null

  const shouldTrigger = chance >= 1 ? true : Math.random() < chance
  if (!shouldTrigger) return null

  const knowledge = resolveKnowledgeProfile(input.dispute, interruptor)
  const severity: 'minor' | 'major' =
    triggerReason === 'forced_secret_reveal' || triggerReason === 'forced_blame_shift' || triggerReason === 'focus_streak_three'
      ? 'major' : 'minor'

  return {
    type: 'interjection',
    textId: `interjection.v2.${interruptor}.${input.dispute.id}.${triggerReason}`,
    line: buildFallbackLine(knowledge.infoLevel, input.interruptorArchetype, input.interruptorEmotionValue),
    choiceLabels: ['허용한다', '제지한다'],
    interruptor,
    target,
    disputeId: input.dispute.id,
    quadrant: input.dispute.quadrant,
    beliefMode: knowledge.beliefMode,
    misconceptionState: knowledge.misconceptionState,
    triggerReason,
    infoLevel: knowledge.infoLevel,
    focusStreak,
    chanceApplied: chance,
    severity,
    allowEffects: buildAllowEffects(input, knowledge.infoLevel),
    blockEffects: buildBlockEffects(input, interruptor),
  }
}

/** 플레이어 선택(allow/block) 적용 */
export function commitInterjectionChoice(
  tracker: InterjectionTrackerState,
  opportunity: InterjectionOpportunityV2,
  choice: InterjectionChoice,
  turn: number,
): {
  tracker: InterjectionTrackerState
  effects: InterjectionResolutionEffect[]
  nextInterjectionState: 'allow_last_turn' | 'block_last_turn'
} {
  const next = cloneTracker(tracker)

  next.cooldownUntilTurnByParty[opportunity.interruptor] = turn + CONFIG.cooldownTurns
  next.usedCountByParty[opportunity.interruptor] = (next.usedCountByParty[opportunity.interruptor] ?? 0) + 1

  const effects = choice === 'allow' ? opportunity.allowEffects : opportunity.blockEffects

  if (choice === 'block') {
    next.resentmentByParty[opportunity.interruptor] = {
      stacks: CONFIG.resentmentStacks,
      untilTurn: turn + CONFIG.resentmentDuration,
    }
  }

  if (choice === 'allow') {
    next.focus = { currentTarget: opportunity.target, streak: 1, lastTurn: turn }
  }

  return {
    tracker: next,
    effects,
    nextInterjectionState: choice === 'allow' ? 'allow_last_turn' : 'block_last_turn',
  }
}

/** resentment penalty 조회 — npcReactionV2에서 사용 */
export function getResentmentPenalty(
  tracker: InterjectionTrackerState,
  party: PartyId,
  turn: number,
): number {
  const entry = tracker.resentmentByParty[party]
  if (!entry || turn > entry.untilTurn) return 0
  return Math.min(10, entry.stacks * 10)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 트리거 판정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function deriveTriggerReason(
  input: InterjectionEvaluationInput,
  focusStreak: number,
): InterjectionTriggerReason | null {
  const t = input.targetTransition
  if (t && ['S4', 'S5'].includes(t.to)) return 'forced_secret_reveal'
  if (t && t.to === 'S3') return 'forced_blame_shift'
  if (focusStreak >= CONFIG.guaranteeFocusStreak) return 'focus_streak_three'
  if (focusStreak === 2 && input.interruptorEmotionValue >= CONFIG.emotionThreshold) return 'focus_streak_two'

  const retaliationOpen = input.dispute.linkEdges?.some(edge =>
    edge.type === 'retaliation' && edge.when.requireFlags?.some(f => input.flags.has(f)),
  )
  if (retaliationOpen && input.interruptorEmotionValue >= 55) return 'retaliation_link'

  if (
    (input.questionType === 'fact_pursuit' || input.questionType === 'evidence_present') &&
    input.interruptorEmotionValue >= 70
  ) return 'soft_emotion_spike'

  return null
}

function deriveChance(
  input: InterjectionEvaluationInput,
  focusStreak: number,
  reason: InterjectionTriggerReason,
): number {
  if (reason === 'forced_secret_reveal' || reason === 'forced_blame_shift' || reason === 'focus_streak_three') return 1
  if (reason === 'retaliation_link') return 0.4
  if (reason === 'soft_emotion_spike') return CONFIG.softEmotionChance

  if (focusStreak === 2) {
    let c = CONFIG.focusTwoMinChance
    if (input.questionType === 'fact_pursuit' || input.questionType === 'evidence_present') c += 0.05
    if (input.interruptorEmotionValue >= 70) c += 0.05
    return Math.min(Math.max(c, CONFIG.focusTwoMinChance), CONFIG.focusTwoMaxChance)
  }

  return 0
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 지식 프로파일
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveKnowledgeProfile(
  dispute: DisputeV2,
  interruptor: PartyId,
): { infoLevel: InterjectionInfoLevel; beliefMode?: BeliefMode; misconceptionState?: MisconceptionState } {
  if (dispute.quadrant === 'both_know') return { infoLevel: 'detail_rebuttal' }

  if (dispute.quadrant === 'shared_misconception' || dispute.disputeKind === 'red_herring') {
    const bm = dispute.misconception?.beliefModeByParty?.[interruptor]
    if (bm === 'knows') return { infoLevel: 'trap_signal', beliefMode: bm, misconceptionState: 'M2' }
    if (bm === 'weaponizes') return { infoLevel: 'misbelief_escalation', beliefMode: bm, misconceptionState: 'M2' }
    return { infoLevel: 'misbelief_escalation', beliefMode: bm ?? 'misbelief', misconceptionState: 'M1' }
  }

  return { infoLevel: 'emotional_only' }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 효과 빌더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function buildAllowEffects(
  input: InterjectionEvaluationInput,
  infoLevel: InterjectionInfoLevel,
): InterjectionResolutionEffect[] {
  const effects: InterjectionResolutionEffect[] = [
    { type: 'reset_fatigue', scope: 'target_dispute' },
    { type: 'readiness_nudge', amount: CONFIG.allowReadinessNudge },
  ]

  if (infoLevel === 'detail_rebuttal') {
    const atomId = input.dispute.depthLayers?.find(l => l.id === input.currentLayer)?.revealAtomIds?.[0]
    if (atomId) effects.push({ type: 'reveal_atom', atomId })
    const linkId = input.dispute.linkEdges?.[0]?.id
    if (linkId) effects.push({ type: 'reveal_link', linkId })
  }

  if (infoLevel === 'trap_signal' || infoLevel === 'misbelief_escalation') {
    const signal = input.dispute.misconception?.trapSignals?.[0]
    if (signal) effects.push({ type: 'trap_signal', signal })
    effects.push({ type: 'set_flag', flag: `${input.dispute.id}.trap_signal_seen` })
  }

  if (infoLevel === 'emotional_only') {
    effects.push({ type: 'set_flag', flag: `${input.dispute.id}.emotional_interjection_seen` })
    const retLink = input.dispute.linkEdges?.find(e => e.type === 'retaliation')?.id
    if (retLink) effects.push({ type: 'reveal_link', linkId: retLink })
  }

  return effects
}

function buildBlockEffects(
  input: InterjectionEvaluationInput,
  interruptor: PartyId,
): InterjectionResolutionEffect[] {
  return [
    { type: 'authority_delta', amount: -2 },
    { type: 'set_resentment', party: interruptor, stacks: CONFIG.resentmentStacks, untilTurn: input.turn + CONFIG.resentmentDuration },
    { type: 'set_flag', flag: `${input.dispute.id}.interjection_blocked.${interruptor}` },
  ]
}

// ── archetype별 끼어들기 대사 맵 ──

type ArchetypeLineMap = Record<InterjectionInfoLevel, string>

const ARCHETYPE_LINES: Record<Archetype, ArchetypeLineMap> = {
  avoidant: {
    emotional_only: '잠깐만요, 죄송합니다만 그 부분은 제가 아는 것과 좀 다른 것 같습니다.',
    detail_rebuttal: '재판관님, 지금 상대방이 말한 부분에는 빠진 사정이 있습니다.',
    trap_signal: '재판관님, 그 자료를 그렇게만 보시면 오해가 생길 수 있습니다.',
    misbelief_escalation: '죄송합니다만 그건 정말 아닙니다... 제 이야기도 좀 들어주십시오.',
  },
  confrontational: {
    emotional_only: '아니, 그건 틀렸습니다.',
    detail_rebuttal: '재판관님, 상대방이 핵심을 빼놓고 있습니다.',
    trap_signal: '그 자료를 그런 식으로 읽으면 곤란합니다. 제가 직접 짚어드리겠습니다.',
    misbelief_escalation: '그 말은 사실이 아닙니다. 제가 직접 말씀드리겠습니다.',
  },
  victim_cosplay: {
    emotional_only: '재판관님, 저도 할 말이 있습니다...',
    detail_rebuttal: '왜 제 사정은 안 들어보시는 겁니까. 저쪽만 들으시면 안 됩니다.',
    trap_signal: '제가 봐도 그건 아닙니다. 왜 자꾸 저만 나쁜 사람으로 모는 겁니까.',
    misbelief_escalation: '제가 얼마나 힘들었는지 아십니까. 상대방 말만 듣고 판단하시면 안 됩니다.',
  },
  cold_logic: {
    emotional_only: '한 가지 정정하겠습니다.',
    detail_rebuttal: '재판관님, 사실관계에 오류가 있습니다. 확인이 필요합니다.',
    trap_signal: '지금 그 자료를 잘못 읽고 계십니다. 논리가 맞지 않습니다.',
    misbelief_escalation: '사실관계가 틀렸습니다. 정정하겠습니다.',
  },
  affect_flattening: {
    emotional_only: '그 부분은 다릅니다.',
    detail_rebuttal: '정정이 필요한 부분이 있습니다.',
    trap_signal: '그 자료의 맥락이 빠져 있습니다.',
    misbelief_escalation: '사실과 다릅니다. 말씀드리겠습니다.',
  },
  premature_summary: {
    emotional_only: '잠깐, 그건 지금 이 문제에서 핵심이 아닙니다.',
    detail_rebuttal: '재판관님, 지금 그 이야기보다 더 중요한 맥락이 있습니다.',
    trap_signal: '그 자료는 핵심이 아닙니다. 엉뚱한 데 시간 쓰지 마시고 본론을 보셔야 합니다.',
    misbelief_escalation: '상대방이 핵심을 비켜가고 있습니다. 진짜 문제는 따로 있습니다.',
  },
}

/** emotion이 높을 때(70+) 격한 톤으로 치환되는 변형 */
const ARCHETYPE_HIGH_EMOTION_LINES: Partial<Record<Archetype, Partial<ArchetypeLineMap>>> = {
  avoidant: {
    emotional_only: '아니, 잠깐만요! 그건 정말 아닙니다!',
    detail_rebuttal: '재판관님, 제발 제 말도 들어주십시오! 저쪽 말은 사실이 아닙니다!',
  },
  confrontational: {
    emotional_only: '그만하세요! 거짓말하지 마세요!',
    detail_rebuttal: '재판관님! 저 사람이 지금 거짓말을 하고 있습니다!',
    misbelief_escalation: '뻔히 거짓말인데 왜 그냥 넘어갑니까! 제가 증명하겠습니다!',
  },
  victim_cosplay: {
    emotional_only: '왜 저만 이러는 겁니까... 저도 사람입니다!',
    detail_rebuttal: '제 말은 왜 아무도 안 들어주는 겁니까!',
    misbelief_escalation: '더 이상 못 참겠습니다! 제가 뭘 잘못했다는 겁니까!',
  },
  cold_logic: {
    misbelief_escalation: '더 이상 듣고만 있을 수 없습니다. 명백한 허위입니다.',
  },
  premature_summary: {
    emotional_only: '지금 그게 중요한 게 아니잖습니까!',
    misbelief_escalation: '재판관님, 저 사람은 계속 핵심을 피하고 있습니다!',
  },
}

const HIGH_EMOTION_THRESHOLD = 70

function buildFallbackLine(
  infoLevel: InterjectionInfoLevel,
  archetype?: Archetype,
  emotionValue?: number,
): string {
  // archetype이 없으면 기존 고정 대사 (fallback)
  if (!archetype) {
    if (infoLevel === 'detail_rebuttal') return '잠깐만요. 그건 제가 아는 맥락과 다릅니다. 그 부분은 바로잡고 넘어가셔야 합니다.'
    if (infoLevel === 'trap_signal') return '그 자료만 그렇게 떼어 보면 전부 엉뚱한 쪽으로 갑니다. 맥락을 같이 보셔야 합니다.'
    if (infoLevel === 'misbelief_escalation') return '아니요, 지금 그 말씀은 사실과 다릅니다. 그냥 넘어갈 수 없습니다.'
    return '잠깐만요. 그 문제를 그렇게 한쪽만 몰아가시면 저는 가만히 있을 수 없습니다.'
  }

  // emotion 70+ 이면 격한 변형 우선 시도
  if (emotionValue != null && emotionValue >= HIGH_EMOTION_THRESHOLD) {
    const highLine = ARCHETYPE_HIGH_EMOTION_LINES[archetype]?.[infoLevel]
    if (highLine) return highLine
  }

  return ARCHETYPE_LINES[archetype][infoLevel]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function cloneTracker(t: InterjectionTrackerState): InterjectionTrackerState {
  return {
    focus: { ...t.focus },
    cooldownUntilTurnByParty: { ...t.cooldownUntilTurnByParty },
    usedCountByParty: { ...t.usedCountByParty },
    resentmentByParty: { ...t.resentmentByParty },
  }
}
