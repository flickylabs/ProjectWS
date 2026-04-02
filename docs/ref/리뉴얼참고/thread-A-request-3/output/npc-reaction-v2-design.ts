/**
 * NPC Reaction V2 design
 * ----------------------
 * 목적:
 * - blueprintEngine 의 결정론적 stance 결과 위에
 *   "순응 / 저항 / 역공" 확률 레이어를 1겹 얹는다.
 * - archetype 패턴은 읽히되, 사건별 정답 루트는 고정되지 않게 만든다.
 * - 1차 BeatSelectorV2 / QuestionFatigueV2 / InterjectionV2 와 자연스럽게 연결한다.
 *
 * 파이프라인 위치:
 *   generateBlueprint()
 *   → resolveNpcReactionV2()
 *   → applyNpcReactionToBlueprint()
 *   → selectTurnPresentation()
 *   → resolveQuestionEffectPatched(... externalMultiplier)
 */

import type { PartyId } from './game'
import type { LieMotive, LieState } from './agent'
import type {
  AttackVector,
  DefenseMode,
  QuestionType,
  ResponseBlueprint,
  Stance,
} from './renewal'
import type { AngleTag, BeliefMode, FatigueLevel } from './schema-01-beat-script-v2'
import type { DisputeKind } from './schema-02-dispute-v2'
import { getInterjectionResentmentPenalty, type InterjectionTrackerState } from './interjection-v2-design'

/* -------------------------------------------------------------------------- */
/* 1. types                                                                    */
/* -------------------------------------------------------------------------- */

export type ArchetypeV2 =
  | 'avoidant'
  | 'confrontational'
  | 'victim_cosplay'
  | 'cold_logic'
  | 'hyper_responsible'
  | 'martyr'
  | 'people_pleaser'
  | 'passive_aggressive'
  | 'anxious_controller'
  | 'defensive_rationalizer'
  | 'guilt_avoider'
  | 'emotional_suppressor'
  | 'strategic_victim'
  | 'conflict_avoider'
  | 'boundary_crosser'
  | 'enabler'

export type ActionQuality = 'good' | 'normal' | 'bad'
export type NpcReactionOutcome = 'comply' | 'resist' | 'counter'

export interface ReactionWeights {
  comply: number
  resist: number
  counter: number
}

export interface ActionQualityInput {
  /** useActionDispatch 의 affinityGrade 를 그대로 받아 매핑해도 된다. */
  affinityGrade: 'best' | 'good' | 'neutral' | 'weak' | 'worst'
  questionType: QuestionType
  angleTag: AngleTag
  disputeKind: DisputeKind
  evidenceTimingMultiplier?: number
  blockedVectors: AttackVector[]
  fatigueLevel: FatigueLevel
  trustWindowValue: number
  beliefMode?: BeliefMode
}

export interface NpcReactionContext {
  turn: number
  party: PartyId
  disputeId: string
  lieState: LieState
  lieMotive: LieMotive
  archetype: ArchetypeV2
  disputeKind: DisputeKind
  questionType: QuestionType
  angleTag: AngleTag
  fatigueLevel: FatigueLevel
  trustWindowValue: number
  blockedVectors: AttackVector[]
  quality: ActionQuality
  beliefMode?: BeliefMode

  /** retaliation link가 열린 경우 counter 방향을 사건 쪽으로 틀어준다. */
  retaliationWindow?: {
    active: boolean
    angleTag?: AngleTag
  }

  interjectionTracker?: InterjectionTrackerState
  rng?: () => number
}

export interface NpcReactionResolution {
  quality: ActionQuality
  rawWeights: ReactionWeights
  adjustedWeights: ReactionWeights
  outcome: NpcReactionOutcome
  effectMultiplier: number
  authorityDelta: number
  appliedStance: Stance
  appliedDefenseMode: DefenseMode
  overrideAngleTag?: AngleTag
  debugNotes: string[]
}

export interface NpcReactionAppliedBlueprint {
  blueprint: ResponseBlueprint
  reaction: NpcReactionResolution
}

/* -------------------------------------------------------------------------- */
/* 2. config                                                                   */
/* -------------------------------------------------------------------------- */

export const BASE_REACTION_WEIGHTS_BY_QUALITY: Record<ActionQuality, ReactionWeights> = {
  good: { comply: 75, resist: 20, counter: 5 },
  normal: { comply: 55, resist: 30, counter: 15 },
  /** 요청서의 35/40/25는 counter cap 정책 전 raw weight로만 보존한다. */
  bad: { comply: 35, resist: 40, counter: 25 },
}

export const NPC_REACTION_V2_CONFIG = {
  counterCap: 15,
  resistEffectMultiplier: 0.55,
  counterEffectMultiplier: 0.2,
  counterAuthorityDelta: -1,
} as const

const ARCHETYPE_WEIGHT_MODIFIERS: Record<ArchetypeV2, Partial<ReactionWeights>> = {
  avoidant: { comply: 10, resist: -5, counter: -10 },
  confrontational: { comply: -15, resist: 5, counter: 10 },
  victim_cosplay: { comply: -5, resist: 10, counter: -5 },
  cold_logic: { comply: -10, resist: 15, counter: -5 },
  hyper_responsible: { comply: 8, resist: -3, counter: -5 },
  martyr: { comply: 5, resist: 5, counter: -10 },
  people_pleaser: { comply: 12, resist: -7, counter: -10 },
  passive_aggressive: { comply: -5, resist: 5, counter: 5 },
  anxious_controller: { comply: -8, resist: 12, counter: -4 },
  defensive_rationalizer: { comply: -8, resist: 10, counter: -2 },
  guilt_avoider: { comply: -4, resist: 12, counter: -8 },
  emotional_suppressor: { comply: -6, resist: 8, counter: -2 },
  strategic_victim: { comply: -10, resist: 8, counter: 2 },
  conflict_avoider: { comply: 10, resist: 0, counter: -10 },
  boundary_crosser: { comply: -12, resist: 4, counter: 8 },
  enabler: { comply: 8, resist: 2, counter: -10 },
}

/* -------------------------------------------------------------------------- */
/* 3. action quality                                                            */
/* -------------------------------------------------------------------------- */

/**
 * 기존 affinityGrade 위에 evidence timing / trust / fatigue를 얇게 덧씌운다.
 * - best/good → good
 * - neutral   → normal
 * - weak/worst → bad
 * - evidence timing이 1.4 이상이면 1단계 상향
 * - fatigue high/exhausted면 1단계 하향
 */
export function deriveActionQuality(input: ActionQualityInput): ActionQuality {
  let quality: ActionQuality =
    input.affinityGrade === 'best' || input.affinityGrade === 'good'
      ? 'good'
      : input.affinityGrade === 'neutral'
        ? 'normal'
        : 'bad'

  if ((input.evidenceTimingMultiplier ?? 1) >= 1.4) {
    quality = stepQuality(quality, +1)
  }

  if (input.fatigueLevel === 'high' || input.fatigueLevel === 'exhausted') {
    quality = stepQuality(quality, -1)
  }

  if (input.questionType === 'empathy_approach' && input.trustWindowValue >= 60) {
    quality = stepQuality(quality, +1)
  }

  if (
    (input.disputeKind === 'red_herring' || input.disputeKind === 'shared_misconception') &&
    input.beliefMode === 'misbelief' &&
    input.angleTag === 'context'
  ) {
    quality = stepQuality(quality, -1)
  }

  return quality
}

/* -------------------------------------------------------------------------- */
/* 4. resolver                                                                  */
/* -------------------------------------------------------------------------- */

export function resolveNpcReactionV2(
  ctx: NpcReactionContext,
  blueprint: ResponseBlueprint,
): NpcReactionResolution {
  const debugNotes: string[] = [`quality:${ctx.quality}`]

  let weights = cloneWeights(BASE_REACTION_WEIGHTS_BY_QUALITY[ctx.quality])
  const rawWeights = cloneWeights(weights)

  // archetype: "읽히는 성격"
  weights = applyWeightDelta(weights, ARCHETYPE_WEIGHT_MODIFIERS[ctx.archetype])
  debugNotes.push(`archetype:${ctx.archetype}`)

  // lie motive: "왜 숨기나"
  weights = applyWeightDelta(weights, getLieMotiveModifier(ctx))
  debugNotes.push(`motive:${ctx.lieMotive}`)

  // dispute role / belief mode: "이번 사건에서 어떤 성격의 쟁점인가"
  weights = applyWeightDelta(weights, getDisputeRoleModifier(ctx))
  debugNotes.push(`dispute:${ctx.disputeKind}`)

  // retaliation link: 사건 고유 반격 창구
  if (ctx.retaliationWindow?.active) {
    weights = applyWeightDelta(weights, { comply: -5, resist: 0, counter: 10 })
    debugNotes.push('retaliation_window')
  }

  // blocked interjection resentment: 제지당한 NPC는 한동안 순응률 -10
  if (ctx.interjectionTracker) {
    const resentmentPenalty = getInterjectionResentmentPenalty(ctx.interjectionTracker, ctx.party, ctx.turn)
    if (resentmentPenalty > 0) {
      weights = applyWeightDelta(weights, { comply: -resentmentPenalty, resist: resentmentPenalty })
      debugNotes.push(`resentment:-${resentmentPenalty}`)
    }
  }

  // truth floor: S4/S5 또는 blockedVectors 3개 이상이면 counter를 resist로 흘린다.
  if (cannotCounter(ctx)) {
    weights = { comply: weights.comply, resist: weights.resist + weights.counter, counter: 0 }
    debugNotes.push('counter_demoted_by_truth_floor')
  }

  const adjustedWeights = normalizeReactionWeights(weights, NPC_REACTION_V2_CONFIG.counterCap)
  const outcome = rollReactionOutcome(adjustedWeights, ctx.rng)

  const applied = applyReactionOutcomeToBlueprint(blueprint, outcome, ctx)

  return {
    quality: ctx.quality,
    rawWeights,
    adjustedWeights,
    outcome,
    effectMultiplier: applied.effectMultiplier,
    authorityDelta: applied.authorityDelta,
    appliedStance: applied.appliedStance,
    appliedDefenseMode: applied.appliedDefenseMode,
    overrideAngleTag: applied.overrideAngleTag,
    debugNotes,
  }
}

export function applyNpcReactionToBlueprint(
  blueprint: ResponseBlueprint,
  reaction: NpcReactionResolution,
): NpcReactionAppliedBlueprint {
  return {
    blueprint: {
      ...blueprint,
      stance: reaction.appliedStance,
      defenseMode: reaction.appliedDefenseMode,
    },
    reaction,
  }
}

/* -------------------------------------------------------------------------- */
/* 5. weight modifiers                                                          */
/* -------------------------------------------------------------------------- */

function getLieMotiveModifier(ctx: NpcReactionContext): Partial<ReactionWeights> {
  switch (ctx.lieMotive) {
    case 'self_protection':
      return ctx.angleTag === 'responsibility' || ctx.angleTag === 'timeline'
        ? { comply: -5, resist: 10, counter: -5 }
        : { comply: 0, resist: 5, counter: -5 }

    case 'face_saving':
      return ctx.questionType === 'empathy_approach' || ctx.angleTag === 'emotion'
        ? { comply: 10, resist: -5, counter: -5 }
        : { comply: -5, resist: 10, counter: -5 }

    case 'third_party_protection':
      return ctx.angleTag === 'identity' || ctx.angleTag === 'context'
        ? { comply: -8, resist: 12, counter: -4 }
        : { comply: 5, resist: 0, counter: -5 }

    case 'revenge':
      return ctx.retaliationWindow?.active
        ? { comply: -10, resist: 0, counter: 10 }
        : { comply: -5, resist: 5, counter: 5 }

    case 'shame_avoidance':
      return ctx.questionType === 'empathy_approach' || ctx.angleTag === 'emotion'
        ? { comply: 8, resist: -3, counter: -5 }
        : { comply: -6, resist: 10, counter: -4 }

    case 'career_preservation':
      return ctx.angleTag === 'legality' || ctx.angleTag === 'identity'
        ? { comply: -10, resist: 12, counter: -2 }
        : { comply: -2, resist: 5, counter: -3 }

    case 'relationship_maintenance':
      return ctx.questionType === 'empathy_approach' || ctx.angleTag === 'context'
        ? { comply: 10, resist: -5, counter: -5 }
        : { comply: 0, resist: 5, counter: -5 }
  }
}

function getDisputeRoleModifier(ctx: NpcReactionContext): Partial<ReactionWeights> {
  if (ctx.disputeKind === 'sub_truth') {
    return { comply: 5, resist: 0, counter: -5 }
  }

  if (ctx.disputeKind === 'red_herring' || ctx.disputeKind === 'shared_misconception') {
    if (ctx.beliefMode === 'weaponizes') return { comply: -10, resist: 5, counter: 10 }
    if (ctx.beliefMode === 'misbelief') return { comply: -8, resist: 12, counter: -4 }
    if (ctx.beliefMode === 'suspects') return { comply: -4, resist: 8, counter: -4 }
    if (ctx.beliefMode === 'knows') return { comply: 8, resist: -3, counter: -5 }
    return { comply: -4, resist: 8, counter: -4 }
  }

  return { comply: 0, resist: 0, counter: 0 }
}

/* -------------------------------------------------------------------------- */
/* 6. stance / defense application                                             */
/* -------------------------------------------------------------------------- */

function applyReactionOutcomeToBlueprint(
  blueprint: ResponseBlueprint,
  outcome: NpcReactionOutcome,
  ctx: NpcReactionContext,
): {
  effectMultiplier: number
  authorityDelta: number
  appliedStance: Stance
  appliedDefenseMode: DefenseMode
  overrideAngleTag?: AngleTag
} {
  if (outcome === 'comply') {
    return {
      effectMultiplier: 1,
      authorityDelta: 0,
      appliedStance: blueprint.stance,
      appliedDefenseMode: blueprint.defenseMode,
    }
  }

  if (outcome === 'resist') {
    const hardened = hardenStanceWithinTruthFloor(blueprint.stance, ctx.lieState)
    return {
      effectMultiplier: NPC_REACTION_V2_CONFIG.resistEffectMultiplier,
      authorityDelta: 0,
      appliedStance: hardened,
      appliedDefenseMode: pickResistDefenseMode(hardened, blueprint.defenseMode),
    }
  }

  // counter
  if (cannotCounter(ctx)) {
    const hardened = hardenStanceWithinTruthFloor(blueprint.stance, ctx.lieState)
    return {
      effectMultiplier: NPC_REACTION_V2_CONFIG.resistEffectMultiplier,
      authorityDelta: 0,
      appliedStance: hardened,
      appliedDefenseMode: pickResistDefenseMode(hardened, blueprint.defenseMode),
    }
  }

  return {
    effectMultiplier: NPC_REACTION_V2_CONFIG.counterEffectMultiplier,
    authorityDelta: NPC_REACTION_V2_CONFIG.counterAuthorityDelta,
    appliedStance: 'blame',
    appliedDefenseMode: 'counterattack',
    overrideAngleTag: ctx.retaliationWindow?.angleTag ?? 'responsibility',
  }
}

function hardenStanceWithinTruthFloor(current: Stance, lieState: LieState): Stance {
  const hardened = hardenStance(current)
  const floor = getTruthFloorByLieState(lieState)
  return STANCE_RANK[hardened] < STANCE_RANK[floor] ? floor : hardened
}

function pickResistDefenseMode(nextStance: Stance, current: DefenseMode): DefenseMode {
  if (nextStance === 'blame') return 'counterattack'
  if (nextStance === 'hedge') return 'silence'
  if (nextStance === 'deny') return 'flat_denial'
  if (nextStance === 'partial') return current === 'counterattack' ? 'context_attack' : 'concession'
  return current
}

function getTruthFloorByLieState(lieState: LieState): Stance {
  switch (lieState) {
    case 'S5':
      return 'confess'
    case 'S4':
      return 'emotional'
    case 'S3':
      return 'blame'
    case 'S2':
      return 'partial'
    case 'S1':
      return 'hedge'
    default:
      return 'deny'
  }
}

function cannotCounter(ctx: NpcReactionContext): boolean {
  return ctx.lieState === 'S4'
    || ctx.lieState === 'S5'
    || ctx.blockedVectors.length >= 3
    || ctx.trustWindowValue >= 60
}

/* -------------------------------------------------------------------------- */
/* 7. integration helpers                                                       */
/* -------------------------------------------------------------------------- */

export function applyNpcReactionToMeterDelta(
  rawDelta: number,
  reaction: Pick<NpcReactionResolution, 'effectMultiplier'>,
): number {
  return Math.max(0, Math.round(rawDelta * reaction.effectMultiplier))
}

/**
 * useActionDispatch 통합 권장
 *
 * 1) const blueprint = generateBlueprint(...)
 * 2) const quality = deriveActionQuality({ affinityGrade, evidenceTimingMultiplier, ... })
 * 3) const reaction = resolveNpcReactionV2({ ... quality ... }, blueprint)
 * 4) const applied = applyNpcReactionToBlueprint(blueprint, reaction)
 * 5) beatSelectorV2 에는 applied.blueprint + reaction.overrideAngleTag 를 전달
 * 6) questionEffectEngine 에는 fatigueMultiplier * reaction.effectMultiplier 를 곱한다.
 * 7) reaction.authorityDelta !== 0 이면 authority를 즉시 반영한다.
 */

/* -------------------------------------------------------------------------- */
/* 8. utilities                                                                 */
/* -------------------------------------------------------------------------- */

function normalizeReactionWeights(weights: ReactionWeights, counterCap: number): ReactionWeights {
  const normalized: ReactionWeights = {
    comply: Math.max(0, weights.comply),
    resist: Math.max(0, weights.resist),
    counter: Math.max(0, weights.counter),
  }

  if (normalized.counter > counterCap) {
    const overflow = normalized.counter - counterCap
    normalized.counter = counterCap
    normalized.resist += overflow
  }

  const sum = normalized.comply + normalized.resist + normalized.counter || 1
  return {
    comply: Number(((normalized.comply / sum) * 100).toFixed(2)),
    resist: Number(((normalized.resist / sum) * 100).toFixed(2)),
    counter: Number(((normalized.counter / sum) * 100).toFixed(2)),
  }
}

function rollReactionOutcome(
  weights: ReactionWeights,
  rng: (() => number) | undefined,
): NpcReactionOutcome {
  const roll = (rng ?? Math.random)() * 100
  if (roll < weights.comply) return 'comply'
  if (roll < weights.comply + weights.resist) return 'resist'
  return 'counter'
}

function applyWeightDelta(
  weights: ReactionWeights,
  delta: Partial<ReactionWeights>,
): ReactionWeights {
  return {
    comply: weights.comply + (delta.comply ?? 0),
    resist: weights.resist + (delta.resist ?? 0),
    counter: weights.counter + (delta.counter ?? 0),
  }
}

function cloneWeights(weights: ReactionWeights): ReactionWeights {
  return { comply: weights.comply, resist: weights.resist, counter: weights.counter }
}

function stepQuality(current: ActionQuality, delta: -1 | 1): ActionQuality {
  const order: ActionQuality[] = ['bad', 'normal', 'good']
  const index = order.indexOf(current)
  return order[Math.min(order.length - 1, Math.max(0, index + delta))]
}

function hardenStance(current: Stance): Stance {
  switch (current) {
    case 'confess':
      return 'emotional'
    case 'emotional':
      return 'partial'
    case 'partial':
      return 'hedge'
    case 'hedge':
      return 'deny'
    case 'blame':
      return 'blame'
    default:
      return 'deny'
  }
}

const STANCE_RANK: Record<Stance, number> = {
  deny: 0,
  hedge: 1,
  partial: 2,
  blame: 3,
  emotional: 4,
  confess: 5,
}

/* -------------------------------------------------------------------------- */
/* 9. expected behavior examples                                               */
/* -------------------------------------------------------------------------- */

/**
 * spouse-01 예시
 *
 * A) a = avoidant / face_saving / d-1 core_truth / evidence timing 좋음
 *    - good(75/20/5) + avoidant(+10/-5/-10) + face_saving(공감이면 +10)
 *    - 결과적으로 순응 비중이 크게 높아진다.
 *
 * B) b = confrontational / face_saving / d-5 / block resentment active
 *    - normal(55/30/15) + confrontational(-15/+5/+10) + resentment(-10 comply)
 *    - raw counter는 25까지 오르지만 final counter cap 15 적용
 *    - overflow는 resist로 이동하여 "운 게임"이 아니라 "버티는 게임"이 된다.
 *
 * C) red_herring + beliefMode=misbelief
 *    - context 추궁이 완전히 무효가 되지는 않지만 resist가 두꺼워진다.
 *    - trap을 더 풀어야 좋은 quality로 올라간다.
 */
