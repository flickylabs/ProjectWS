/**
 * Interjection V2 design
 * ----------------------
 * 목적:
 * - B-3 끼어들기를 "감정 확률"에서 "패턴 보장 + 지식 차등"으로 바꾼다.
 * - current checkInterjection()/auto-allow 흐름을
 *   pending choice → allow/block resolution 으로 분리한다.
 * - 1차 BeatScriptV2 / DisputeV2 / BeatSelectorV2 네이밍을 그대로 잇는다.
 *
 * repo 배치 권장:
 *   - src/engine/interjectionV2.ts
 *   - src/store/phase3/interjectionState.ts (or existing store slice)
 *   - GameEventModal / useActionDispatch 에 pendingInterjection wiring
 */

import type { PartyId } from './game'
import type { KnowledgeQuadrant } from './case'
import type { LieState, EmotionalPhase } from './agent'
import type { QuestionType } from './renewal'
import type { BeatScriptV2, BeliefMode, MisconceptionState } from './schema-01-beat-script-v2'
import type { DisputeV2 } from './schema-02-dispute-v2'
import type { PendingEventPresentation } from './schema-04-beat-selector-v2'

/* -------------------------------------------------------------------------- */
/* 1. types                                                                    */
/* -------------------------------------------------------------------------- */

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
  /** 순응 확률 -10 보정. 3턴 지속 후 자동 만료 권장. */
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

export interface InterjectionResolutionBeatQuery {
  interruptor: PartyId
  disputeId: string
  choice: InterjectionChoice
  layer: 'surface' | 'motive' | 'core'
  issueRole: BeatScriptV2['issueRole']
  angleTag: BeatScriptV2['angleTag']
  beliefMode?: BeliefMode
}

export interface InterjectionOpportunityV2 extends PendingEventPresentation {
  type: 'interjection'
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
  resolutionBeatQuery: InterjectionResolutionBeatQuery
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

  /** S3 blame 전이 / S4+ 비밀 노출 전이 등 현재 턴 전이 정보 */
  targetTransition?: { from: LieState; to: LieState } | null

  /** 분리 심문이면 끼어들기 금지 */
  isSeparated: boolean

  /** retaliation window 같은 구조 플래그 */
  flags: Set<string>

  tracker: InterjectionTrackerState
  promptPool?: InterjectionPromptTemplateV2[]
}

export interface InterjectionPromptTemplateV2 {
  id: string
  caseId: string
  disputeId: string
  interruptor: PartyId
  quadrantHints?: KnowledgeQuadrant[]
  beliefModes?: BeliefMode[]
  triggerReasons?: InterjectionTriggerReason[]
  infoLevels?: InterjectionInfoLevel[]
  line: string
  choiceLabels?: [string, string]
}

/* -------------------------------------------------------------------------- */
/* 2. config                                                                   */
/* -------------------------------------------------------------------------- */

export const INTERJECTION_V2_CONFIG = {
  cooldownTurns: 3,
  maxPerPartyPerCase: 2,
  focusTwoMinChance: 0.35,
  focusTwoMaxChance: 0.45,
  softEmotionChance: 0.15,
  emotionThreshold: 40,
  guaranteeFocusStreak: 3,
  resentmentPenaltyStacks: 1,
  resentmentPenaltyUntilTurns: 3,
  allowReadinessNudge: 0.5,
} as const

/* -------------------------------------------------------------------------- */
/* 3. public API                                                               */
/* -------------------------------------------------------------------------- */

export function createInitialInterjectionTrackerState(): InterjectionTrackerState {
  return {
    focus: {
      currentTarget: null,
      streak: 0,
      lastTurn: 0,
    },
    cooldownUntilTurnByParty: {},
    usedCountByParty: {},
    resentmentByParty: {},
  }
}

/**
 * 질문 / 증거 사용 직후 focus streak 갱신.
 * - 같은 대상 연속이면 streak +1
 * - 대상이 바뀌면 streak = 1
 */
export function commitInterjectionFocus(
  tracker: InterjectionTrackerState,
  turn: number,
  target: PartyId,
): InterjectionTrackerState {
  const next: InterjectionTrackerState = {
    focus: { ...tracker.focus },
    cooldownUntilTurnByParty: { ...tracker.cooldownUntilTurnByParty },
    usedCountByParty: { ...tracker.usedCountByParty },
    resentmentByParty: { ...tracker.resentmentByParty },
  }

  if (next.focus.currentTarget === target && turn - next.focus.lastTurn <= 1) {
    next.focus = {
      currentTarget: target,
      streak: next.focus.streak + 1,
      lastTurn: turn,
    }
  } else {
    next.focus = {
      currentTarget: target,
      streak: 1,
      lastTurn: turn,
    }
  }

  // expired resentment cleanup
  for (const [party, resentment] of Object.entries(next.resentmentByParty)) {
    if (turn > resentment.untilTurn) delete next.resentmentByParty[party as PartyId]
  }

  return next
}

/**
 * current gameEventTriggerEngine.checkInterjection() 대체 후보.
 *
 * 핵심 차이:
 * 1) lieStateMap 유무로 끼어들기 stake를 자르지 않는다.
 *    d-1(a_only)에서 b가 끼어드는 spouse-01 같은 케이스를 살리기 위함.
 * 2) trigger 판단과 allow/block resolution을 분리한다.
 * 3) quadrant / beliefMode에 따라 정보 레벨을 달리 준다.
 */
export function evaluateInterjectionOpportunityV2(
  input: InterjectionEvaluationInput,
): InterjectionOpportunityV2 | null {
  if (input.isSeparated) return null

  const interruptor = input.interruptor
  const target = input.target
  const tracker = input.tracker

  if ((tracker.usedCountByParty[interruptor] ?? 0) >= INTERJECTION_V2_CONFIG.maxPerPartyPerCase) {
    return null
  }

  if ((tracker.cooldownUntilTurnByParty[interruptor] ?? 0) > input.turn) {
    return null
  }

  const focusStreak = tracker.focus.currentTarget === target ? tracker.focus.streak : 1
  const triggerReason = deriveTriggerReason(input, focusStreak)
  if (!triggerReason) return null

  const chanceApplied = deriveInterjectionChance(input, focusStreak, triggerReason)
  if (chanceApplied <= 0) return null

  const shouldTrigger = chanceApplied >= 1 ? true : Math.random() < chanceApplied
  if (!shouldTrigger) return null

  const knowledge = resolveInterjectionKnowledgeProfile(
    input.dispute,
    interruptor,
  )

  const severity: 'minor' | 'major' =
    triggerReason === 'forced_secret_reveal' ||
    triggerReason === 'forced_blame_shift' ||
    triggerReason === 'focus_streak_three'
      ? 'major'
      : 'minor'

  const prompt = selectInterjectionPrompt(input, triggerReason, knowledge.infoLevel)
  const allowEffects = buildAllowEffects(input, knowledge.infoLevel)
  const blockEffects = buildBlockEffects(input, interruptor)

  return {
    type: 'interjection',
    textId: prompt?.id ?? makeInterjectionTextId(input.dispute.id, interruptor, triggerReason),
    line: prompt?.line ?? buildFallbackInterjectionLine(input, knowledge.infoLevel),
    choiceLabels: [...(prompt?.choiceLabels ?? ['허용한다', '제지한다'])],
    interruptor,
    target,
    disputeId: input.dispute.id,
    quadrant: input.dispute.quadrant,
    beliefMode: knowledge.beliefMode,
    misconceptionState: knowledge.misconceptionState,
    triggerReason,
    infoLevel: knowledge.infoLevel,
    focusStreak,
    chanceApplied,
    severity,
    allowEffects,
    blockEffects,
    resolutionBeatQuery: {
      interruptor,
      disputeId: input.dispute.id,
      choice: 'allow',
      layer: input.currentLayer,
      issueRole: mapDisputeKindToIssueRole(input.dispute.disputeKind),
      angleTag: deriveInterjectionAngleTag(input.dispute, knowledge.infoLevel),
      beliefMode: knowledge.beliefMode,
    },
  }
}

/**
 * 플레이어가 allow / block 를 눌렀을 때 적용할 상태 변경.
 * - allow: 흐름 리셋 + link/trap/atom 노출 + 소폭 readiness nudge
 * - block: authority -2 + resentment flag, 대신 현재 추궁 흐름 유지
 */
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
  const next: InterjectionTrackerState = {
    focus: { ...tracker.focus },
    cooldownUntilTurnByParty: { ...tracker.cooldownUntilTurnByParty },
    usedCountByParty: { ...tracker.usedCountByParty },
    resentmentByParty: { ...tracker.resentmentByParty },
  }

  next.cooldownUntilTurnByParty[opportunity.interruptor] = turn + INTERJECTION_V2_CONFIG.cooldownTurns
  next.usedCountByParty[opportunity.interruptor] = (next.usedCountByParty[opportunity.interruptor] ?? 0) + 1

  const effects = choice === 'allow'
    ? opportunity.allowEffects
    : opportunity.blockEffects

  if (choice === 'block') {
    next.resentmentByParty[opportunity.interruptor] = {
      stacks: INTERJECTION_V2_CONFIG.resentmentPenaltyStacks,
      untilTurn: turn + INTERJECTION_V2_CONFIG.resentmentPenaltyUntilTurns,
    }
  }

  if (choice === 'allow') {
    // 흐름 리셋: 같은 대상만 연속 추궁해서 생긴 focus streak를 꺼준다.
    next.focus = {
      currentTarget: opportunity.target,
      streak: 1,
      lastTurn: turn,
    }
  }

  return {
    tracker: next,
    effects,
    nextInterjectionState: choice === 'allow' ? 'allow_last_turn' : 'block_last_turn',
  }
}

/** npc-reaction-v2-design.ts 에서 재사용하는 resent flag penalty accessor */
export function getInterjectionResentmentPenalty(
  tracker: InterjectionTrackerState,
  party: PartyId,
  turn: number,
): number {
  const entry = tracker.resentmentByParty[party]
  if (!entry) return 0
  if (turn > entry.untilTurn) return 0
  return Math.min(10, entry.stacks * 10)
}

/**
 * allow/block 직후 사용할 follow-up beat 선택기.
 * 1차 beats-v2-full 의 interjection allow/block 4개를 그대로 활용한다.
 */
export function selectInterjectionResolutionBeat(
  beats: BeatScriptV2[],
  query: InterjectionResolutionBeatQuery,
  nextInterjectionState: 'allow_last_turn' | 'block_last_turn',
): BeatScriptV2 | null {
  const optionTag = nextInterjectionState === 'allow_last_turn' ? 'allow' : 'block'

  const exact = beats.filter(beat =>
    beat.party === query.interruptor &&
    beat.disputeId === query.disputeId &&
    beat.layer === query.layer &&
    beat.issueRole === query.issueRole &&
    beat.tags?.includes('interjection') &&
    beat.tags?.includes(optionTag) &&
    beat.conditions?.interjectionStates?.includes(nextInterjectionState),
  )

  if (exact.length > 0) return exact[0]

  const fallback = beats.find(beat =>
    beat.party === query.interruptor &&
    beat.tags?.includes('interjection') &&
    beat.tags?.includes(optionTag) &&
    beat.conditions?.interjectionStates?.includes(nextInterjectionState),
  )

  return fallback ?? null
}

/* -------------------------------------------------------------------------- */
/* 4. trigger / knowledge helpers                                              */
/* -------------------------------------------------------------------------- */

function deriveTriggerReason(
  input: InterjectionEvaluationInput,
  focusStreak: number,
): InterjectionTriggerReason | null {
  const transition = input.targetTransition
  if (transition && ['S4', 'S5'].includes(transition.to)) return 'forced_secret_reveal'
  if (transition && transition.to === 'S3') return 'forced_blame_shift'
  if (focusStreak >= INTERJECTION_V2_CONFIG.guaranteeFocusStreak) return 'focus_streak_three'
  if (focusStreak === 2 && input.interruptorEmotionValue >= INTERJECTION_V2_CONFIG.emotionThreshold) {
    return 'focus_streak_two'
  }

  const retaliationOpen = input.dispute.linkEdges?.some(edge =>
    edge.type === 'retaliation' &&
    edge.when.requireFlags?.some(flag => input.flags.has(flag)),
  )
  if (retaliationOpen && input.interruptorEmotionValue >= 55) return 'retaliation_link'

  if (
    (input.questionType === 'fact_pursuit' || input.questionType === 'evidence_present') &&
    input.interruptorEmotionValue >= 70
  ) {
    return 'soft_emotion_spike'
  }

  return null
}

function deriveInterjectionChance(
  input: InterjectionEvaluationInput,
  focusStreak: number,
  reason: InterjectionTriggerReason,
): number {
  if (reason === 'forced_secret_reveal' || reason === 'forced_blame_shift' || reason === 'focus_streak_three') {
    return 1
  }

  if (reason === 'retaliation_link') return 0.4
  if (reason === 'soft_emotion_spike') return INTERJECTION_V2_CONFIG.softEmotionChance

  if (focusStreak === 2) {
    let chance = INTERJECTION_V2_CONFIG.focusTwoMinChance
    if (input.questionType === 'fact_pursuit' || input.questionType === 'evidence_present') chance += 0.05
    if (input.interruptorEmotionValue >= 70) chance += 0.05
    return clamp(chance, INTERJECTION_V2_CONFIG.focusTwoMinChance, INTERJECTION_V2_CONFIG.focusTwoMaxChance)
  }

  return 0
}

function resolveInterjectionKnowledgeProfile(
  dispute: DisputeV2,
  interruptor: PartyId,
): {
  infoLevel: InterjectionInfoLevel
  beliefMode?: BeliefMode
  misconceptionState?: MisconceptionState
} {
  if (dispute.quadrant === 'both_know') {
    return { infoLevel: 'detail_rebuttal' }
  }

  if (dispute.quadrant === 'shared_misconception' || dispute.disputeKind === 'red_herring') {
    const beliefMode = dispute.misconception?.beliefModeByParty?.[interruptor]

    if (beliefMode === 'knows') {
      return { infoLevel: 'trap_signal', beliefMode, misconceptionState: 'M2' }
    }
    if (beliefMode === 'weaponizes') {
      return { infoLevel: 'misbelief_escalation', beliefMode, misconceptionState: 'M2' }
    }
    return { infoLevel: 'misbelief_escalation', beliefMode: beliefMode ?? 'misbelief', misconceptionState: 'M1' }
  }

  // a_only / b_only: 상대는 감정적으로만 끼어든다.
  return { infoLevel: 'emotional_only' }
}

function buildAllowEffects(
  input: InterjectionEvaluationInput,
  infoLevel: InterjectionInfoLevel,
): InterjectionResolutionEffect[] {
  const effects: InterjectionResolutionEffect[] = [
    { type: 'reset_fatigue', scope: 'target_dispute' },
    { type: 'readiness_nudge', amount: INTERJECTION_V2_CONFIG.allowReadinessNudge },
  ]

  if (infoLevel === 'detail_rebuttal') {
    const atomId = pickInterjectionRevealAtom(input.dispute, input.currentLayer)
    if (atomId) effects.push({ type: 'reveal_atom', atomId })

    const linkId = pickLinkReveal(input.dispute)
    if (linkId) effects.push({ type: 'reveal_link', linkId })
  }

  if (infoLevel === 'trap_signal' || infoLevel === 'misbelief_escalation') {
    const signal = input.dispute.misconception?.trapSignals?.[0]
    if (signal) effects.push({ type: 'trap_signal', signal })
    effects.push({ type: 'set_flag', flag: `${input.dispute.id}.trap_signal_seen` })
  }

  if (infoLevel === 'emotional_only') {
    effects.push({ type: 'set_flag', flag: `${input.dispute.id}.emotional_interjection_seen` })
    const linkId = pickRetaliationLink(input.dispute)
    if (linkId) effects.push({ type: 'reveal_link', linkId })
  }

  return effects
}

function buildBlockEffects(
  input: InterjectionEvaluationInput,
  interruptor: PartyId,
): InterjectionResolutionEffect[] {
  return [
    { type: 'authority_delta', amount: -2 },
    {
      type: 'set_resentment',
      party: interruptor,
      stacks: INTERJECTION_V2_CONFIG.resentmentPenaltyStacks,
      untilTurn: input.turn + INTERJECTION_V2_CONFIG.resentmentPenaltyUntilTurns,
    },
    { type: 'set_flag', flag: `${input.dispute.id}.interjection_blocked.${interruptor}` },
  ]
}

function selectInterjectionPrompt(
  input: InterjectionEvaluationInput,
  reason: InterjectionTriggerReason,
  infoLevel: InterjectionInfoLevel,
): InterjectionPromptTemplateV2 | null {
  return (
    input.promptPool?.find(prompt =>
      prompt.caseId === input.caseId &&
      prompt.disputeId === input.dispute.id &&
      prompt.interruptor === input.interruptor &&
      (!prompt.quadrantHints?.length || prompt.quadrantHints.includes(input.dispute.quadrant)) &&
      (!prompt.triggerReasons?.length || prompt.triggerReasons.includes(reason)) &&
      (!prompt.infoLevels?.length || prompt.infoLevels.includes(infoLevel)),
    ) ?? null
  )
}

function buildFallbackInterjectionLine(
  input: InterjectionEvaluationInput,
  infoLevel: InterjectionInfoLevel,
): string {
  if (infoLevel === 'detail_rebuttal') {
    return '잠깐만요. 그건 제가 아는 맥락과 다릅니다. 그 부분은 바로잡고 넘어가셔야 합니다.'
  }
  if (infoLevel === 'trap_signal') {
    return '그 자료만 그렇게 떼어 보면 전부 엉뚱한 쪽으로 갑니다. 맥락을 같이 보셔야 합니다.'
  }
  if (infoLevel === 'misbelief_escalation') {
    return '아니요, 그 조합이면 누가 봐도 그렇게 읽힙니다. 지금 그 의심을 그냥 넘길 수는 없습니다.'
  }
  return '잠깐만요. 그 문제를 그렇게 한쪽만 몰아가시면 저는 가만히 있을 수 없습니다.'
}

function makeInterjectionTextId(
  disputeId: string,
  interruptor: PartyId,
  reason: InterjectionTriggerReason,
): string {
  return `interjection.v2.${interruptor}.${disputeId}.${reason}`
}

function mapDisputeKindToIssueRole(
  disputeKind: DisputeV2['disputeKind'],
): BeatScriptV2['issueRole'] {
  switch (disputeKind) {
    case 'sub_truth':
      return 'sub_truth'
    case 'red_herring':
      return 'red_herring'
    case 'shared_misconception':
      return 'shared_misconception'
    default:
      return 'core_truth'
  }
}

function deriveInterjectionAngleTag(
  dispute: DisputeV2,
  infoLevel: InterjectionInfoLevel,
): BeatScriptV2['angleTag'] {
  if (infoLevel === 'detail_rebuttal') return 'responsibility'
  if (infoLevel === 'trap_signal' || infoLevel === 'misbelief_escalation') return 'context'

  const retaliation = pickRetaliationLink(dispute)
  if (retaliation) return 'responsibility'
  return 'emotion'
}

function pickInterjectionRevealAtom(
  dispute: DisputeV2,
  currentLayer: 'surface' | 'motive' | 'core',
): string | undefined {
  const layer = dispute.depthLayers?.find(item => item.id === currentLayer)
  return layer?.revealAtomIds?.[0]
}

function pickLinkReveal(dispute: DisputeV2): string | undefined {
  return dispute.linkEdges?.[0]?.id
}

function pickRetaliationLink(dispute: DisputeV2): string | undefined {
  return dispute.linkEdges?.find(edge => edge.type === 'retaliation')?.id
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/* -------------------------------------------------------------------------- */
/* 5. integration snippets                                                     */
/* -------------------------------------------------------------------------- */

/**
 * gameEventTriggerEngine.ts 권장 교체 지점
 *
 * BEFORE
 *   const interjection = checkInterjection(snapshot)
 *   if (interjection) return interjection
 *
 * AFTER
 *   const opportunity = evaluateInterjectionOpportunityV2({ ... })
 *   if (opportunity) {
 *     return {
 *       type: 'interjection',
 *       party: opportunity.interruptor,
 *       disputeId: opportunity.disputeId,
 *       severity: opportunity.severity,
 *       description: opportunity.line,
 *       effects: [], // 즉시 상태 변경 없음. allow/block 후 적용.
 *       scriptSlot: { textId: opportunity.textId, fallbackText: opportunity.line },
 *       // store 확장 권장: pendingInterjection = opportunity
 *     }
 *   }
 */

/**
 * useActionDispatch 권장 통합 순서
 *
 * 1. 질문 / 증거 처리 후 commitInterjectionFocus(...)
 * 2. evaluateInterjectionOpportunityV2(...)
 * 3. opportunity가 있으면 자동 resolveAndApply(opponentAction) 금지
 * 4. pendingInterjection을 store에 넣고 GameEventModal 오픈
 * 5. onAllow / onBlock 에서 commitInterjectionChoice(...)
 * 6. selectInterjectionResolutionBeat(...) 로 후속 대사 출력
 * 7. allow면 questionFatigue.resetReason='interjection_allow' 로 넘겨 로컬 피로 리셋
 */

/**
 * GameEventModal props 예시
 *
 * <GameEventModal
 *   open={!!pendingInterjection}
 *   title="끼어들기"
 *   line={pendingInterjection?.line}
 *   options={[
 *     { id: 'allow', label: pendingInterjection?.choiceLabels?.[0] ?? '허용한다' },
 *     { id: 'block', label: pendingInterjection?.choiceLabels?.[1] ?? '제지한다' },
 *   ]}
 *   onSelect={(choice) => handleInterjectionChoice(choice as InterjectionChoice)}
 * />
 */

/**
 * spouse-01 기대 동작 예시
 *
 * 1) d-1 / a 집중 2턴 연속 / b 감정 52
 *    → chance 0.40 전후
 *    → quadrant a_only 이므로 infoLevel = emotional_only
 *    → allow: trust 훼손 link / readiness nudge / 피로 리셋
 *    → block: authority -2 / b resentment stack
 *
 * 2) d-5 / a 집중 3턴 연속 / b 감정 61
 *    → 100% 보장
 *    → quadrant both_know 이므로 detail_rebuttal
 *    → allow: d-5 관련 atom or link reveal
 *
 * 3) d-3 / b misbelief 유지 / a(interruptor)는 knows
 *    → infoLevel = trap_signal
 *    → allow: trap signal + retaliation link reveal
 */
