/**
 * NPC Reaction V2 — 순응/저항/역공 확률 레이어
 * ─────────────────────────────────
 * blueprintEngine.generateBlueprint() 다음,
 * beatSelectorV2.selectTurnPresentation() 이전에 삽입.
 *
 * 행동 품질 기반 가중 확률로 stance를 한 단계 조정하여
 * "같은 입력 = 항상 같은 결과" 결정론을 깨뜨린다.
 * 역공 상한 15%.
 */

import type { PartyId, QuestionType, AttackVector, Stance, DefenseMode, ResponseBlueprint } from '../types'
import type { LieState, LieMotive } from '../types'
import type { AngleTag, BeliefMode, FatigueLevel } from '../types'
import type { DisputeKind } from '../types'
import { getResentmentPenalty, type InterjectionTrackerState } from './interjectionV2'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ActionQuality = 'good' | 'normal' | 'bad'
export type NpcReactionOutcome = 'comply' | 'resist' | 'counter'

export interface ReactionWeights {
  comply: number
  resist: number
  counter: number
}

export interface NpcReactionContext {
  turn: number
  party: PartyId
  disputeId: string
  lieState: LieState
  lieMotive: LieMotive
  archetype: string
  disputeKind: DisputeKind
  questionType: QuestionType
  angleTag: AngleTag
  fatigueLevel: FatigueLevel
  trustWindowValue: number
  blockedVectors: AttackVector[]
  quality: ActionQuality
  beliefMode?: BeliefMode
  retaliationWindow?: { active: boolean; angleTag?: AngleTag }
  interjectionTracker?: InterjectionTrackerState
}

export interface NpcReactionResolution {
  quality: ActionQuality
  outcome: NpcReactionOutcome
  effectMultiplier: number
  authorityDelta: number
  appliedStance: Stance
  appliedDefenseMode: DefenseMode
  overrideAngleTag?: AngleTag
  debugNotes: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BASE_WEIGHTS: Record<ActionQuality, ReactionWeights> = {
  good: { comply: 75, resist: 20, counter: 5 },
  normal: { comply: 55, resist: 30, counter: 15 },
  bad: { comply: 35, resist: 40, counter: 25 },
}

const COUNTER_CAP = 15
const RESIST_EFFECT = 0.55
const COUNTER_EFFECT = 0.2
const COUNTER_AUTHORITY = -1

const ARCHETYPE_MODIFIERS: Record<string, Partial<ReactionWeights>> = {
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** affinityGrade + 환경 보정 → 행동 품질 */
export function deriveActionQuality(input: {
  affinityGrade: 'best' | 'good' | 'neutral' | 'weak' | 'worst'
  evidenceTimingMultiplier?: number
  fatigueLevel: FatigueLevel
  questionType: QuestionType
  trustWindowValue: number
  disputeKind: DisputeKind
  beliefMode?: BeliefMode
  angleTag: AngleTag
}): ActionQuality {
  let q: ActionQuality =
    input.affinityGrade === 'best' || input.affinityGrade === 'good' ? 'good'
    : input.affinityGrade === 'neutral' ? 'normal'
    : 'bad'

  if ((input.evidenceTimingMultiplier ?? 1) >= 1.4) q = stepQuality(q, +1)
  if (input.fatigueLevel === 'high' || input.fatigueLevel === 'exhausted') q = stepQuality(q, -1)
  if (input.questionType === 'empathy_approach' && input.trustWindowValue >= 60) q = stepQuality(q, +1)

  if (
    (input.disputeKind === 'red_herring' || input.disputeKind === 'shared_misconception') &&
    input.beliefMode === 'misbelief' && input.angleTag === 'context'
  ) q = stepQuality(q, -1)

  return q
}

/** 순응/저항/역공 판정 */
export function resolveNpcReaction(
  ctx: NpcReactionContext,
  blueprint: ResponseBlueprint,
): NpcReactionResolution {
  const notes: string[] = [`quality:${ctx.quality}`]

  let w = clone(BASE_WEIGHTS[ctx.quality])

  // archetype
  w = apply(w, ARCHETYPE_MODIFIERS[ctx.archetype] ?? {})
  notes.push(`arch:${ctx.archetype}`)

  // lieMotive
  w = apply(w, getMotiveModifier(ctx))
  notes.push(`motive:${ctx.lieMotive}`)

  // disputeKind + beliefMode
  w = apply(w, getDisputeModifier(ctx))

  // retaliation
  if (ctx.retaliationWindow?.active) {
    w = apply(w, { comply: -5, counter: 10 })
    notes.push('retaliation')
  }

  // resentment
  if (ctx.interjectionTracker) {
    const penalty = getResentmentPenalty(ctx.interjectionTracker, ctx.party, ctx.turn)
    if (penalty > 0) {
      w = apply(w, { comply: -penalty, resist: penalty })
      notes.push(`resentment:-${penalty}`)
    }
  }

  // truth floor: S4+, blocked 3+, trust 60+ → counter 봉쇄
  if (cannotCounter(ctx)) {
    w = { comply: w.comply, resist: w.resist + w.counter, counter: 0 }
    notes.push('counter_blocked')
  }

  const normalized = normalize(w, COUNTER_CAP)
  const outcome = roll(normalized)
  const applied = applyOutcome(blueprint, outcome, ctx)

  return { quality: ctx.quality, outcome, ...applied, debugNotes: notes }
}

/** blueprint에 reaction 결과 반영 */
export function applyReactionToBlueprint(
  blueprint: ResponseBlueprint,
  reaction: NpcReactionResolution,
): ResponseBlueprint {
  return {
    ...blueprint,
    stance: reaction.appliedStance,
    defenseMode: reaction.appliedDefenseMode,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — motive/dispute 보정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getMotiveModifier(ctx: NpcReactionContext): Partial<ReactionWeights> {
  switch (ctx.lieMotive) {
    case 'self_protection':
      return (ctx.angleTag === 'responsibility' || ctx.angleTag === 'timeline')
        ? { comply: -5, resist: 10, counter: -5 } : { resist: 5, counter: -5 }
    case 'face_saving':
      return (ctx.questionType === 'empathy_approach' || ctx.angleTag === 'emotion')
        ? { comply: 10, resist: -5, counter: -5 } : { comply: -5, resist: 10, counter: -5 }
    case 'third_party_protection':
      return (ctx.angleTag === 'identity' || ctx.angleTag === 'context')
        ? { comply: -8, resist: 12, counter: -4 } : { comply: 5, counter: -5 }
    case 'revenge':
      return ctx.retaliationWindow?.active
        ? { comply: -10, counter: 10 } : { comply: -5, resist: 5, counter: 5 }
    case 'shame_avoidance':
      return (ctx.questionType === 'empathy_approach' || ctx.angleTag === 'emotion')
        ? { comply: 8, resist: -3, counter: -5 } : { comply: -6, resist: 10, counter: -4 }
    case 'career_preservation':
      return (ctx.angleTag === 'legality' || ctx.angleTag === 'identity')
        ? { comply: -10, resist: 12, counter: -2 } : { comply: -2, resist: 5, counter: -3 }
    case 'relationship_maintenance':
      return (ctx.questionType === 'empathy_approach' || ctx.angleTag === 'context')
        ? { comply: 10, resist: -5, counter: -5 } : { resist: 5, counter: -5 }
  }
}

function getDisputeModifier(ctx: NpcReactionContext): Partial<ReactionWeights> {
  if (ctx.disputeKind === 'sub_truth') return { comply: 5, counter: -5 }
  if (ctx.disputeKind === 'red_herring' || ctx.disputeKind === 'shared_misconception') {
    if (ctx.beliefMode === 'weaponizes') return { comply: -10, resist: 5, counter: 10 }
    if (ctx.beliefMode === 'misbelief') return { comply: -8, resist: 12, counter: -4 }
    if (ctx.beliefMode === 'suspects') return { comply: -4, resist: 8, counter: -4 }
    if (ctx.beliefMode === 'knows') return { comply: 8, resist: -3, counter: -5 }
  }
  return {}
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — stance 적용
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STANCE_RANK: Record<Stance, number> = {
  deny: 0, hedge: 1, partial: 2, blame: 3, emotional: 4, confess: 5,
}

function applyOutcome(
  bp: ResponseBlueprint,
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
    return { effectMultiplier: 1, authorityDelta: 0, appliedStance: bp.stance, appliedDefenseMode: bp.defenseMode }
  }

  if (outcome === 'resist') {
    const h = hardenWithFloor(bp.stance, ctx.lieState)
    return { effectMultiplier: RESIST_EFFECT, authorityDelta: 0, appliedStance: h, appliedDefenseMode: pickResistDefense(h, bp.defenseMode) }
  }

  // counter
  if (cannotCounter(ctx)) {
    const h = hardenWithFloor(bp.stance, ctx.lieState)
    return { effectMultiplier: RESIST_EFFECT, authorityDelta: 0, appliedStance: h, appliedDefenseMode: pickResistDefense(h, bp.defenseMode) }
  }

  return {
    effectMultiplier: COUNTER_EFFECT,
    authorityDelta: COUNTER_AUTHORITY,
    appliedStance: 'blame',
    appliedDefenseMode: 'counterattack',
    overrideAngleTag: ctx.retaliationWindow?.angleTag ?? 'responsibility',
  }
}

function cannotCounter(ctx: NpcReactionContext): boolean {
  return ctx.lieState === 'S4' || ctx.lieState === 'S5' || ctx.blockedVectors.length >= 3 || ctx.trustWindowValue >= 60
}

function hardenWithFloor(current: Stance, lieState: LieState): Stance {
  const hardened = harden(current)
  const floor = truthFloor(lieState)
  return STANCE_RANK[hardened] < STANCE_RANK[floor] ? floor : hardened
}

function harden(s: Stance): Stance {
  if (s === 'confess') return 'emotional'
  if (s === 'emotional') return 'partial'
  if (s === 'partial') return 'hedge'
  if (s === 'hedge') return 'deny'
  return s // deny, blame → 유지
}

function truthFloor(lieState: LieState): Stance {
  const map: Record<LieState, Stance> = { S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' }
  return map[lieState]
}

function pickResistDefense(stance: Stance, current: DefenseMode): DefenseMode {
  if (stance === 'blame') return 'counterattack'
  if (stance === 'hedge') return 'silence'
  if (stance === 'deny') return 'flat_denial'
  if (stance === 'partial') return current === 'counterattack' ? 'context_attack' : 'concession'
  return current
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function normalize(w: ReactionWeights, cap: number): ReactionWeights {
  const n = { comply: Math.max(0, w.comply), resist: Math.max(0, w.resist), counter: Math.max(0, w.counter) }
  if (n.counter > cap) { n.resist += n.counter - cap; n.counter = cap }
  const sum = n.comply + n.resist + n.counter || 1
  return { comply: (n.comply / sum) * 100, resist: (n.resist / sum) * 100, counter: (n.counter / sum) * 100 }
}

function roll(w: ReactionWeights): NpcReactionOutcome {
  const r = Math.random() * 100
  if (r < w.comply) return 'comply'
  if (r < w.comply + w.resist) return 'resist'
  return 'counter'
}

function apply(w: ReactionWeights, d: Partial<ReactionWeights>): ReactionWeights {
  return { comply: w.comply + (d.comply ?? 0), resist: w.resist + (d.resist ?? 0), counter: w.counter + (d.counter ?? 0) }
}

function clone(w: ReactionWeights): ReactionWeights {
  return { comply: w.comply, resist: w.resist, counter: w.counter }
}

function stepQuality(q: ActionQuality, d: -1 | 1): ActionQuality {
  const order: ActionQuality[] = ['bad', 'normal', 'good']
  return order[Math.min(2, Math.max(0, order.indexOf(q) + d))]
}
