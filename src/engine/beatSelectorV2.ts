/**
 * Beat Selector V2 — Phase 3 스크립트 선택 엔진
 * ─────────────────────────────────
 * 1) TransitionBeat 최우선
 * 2) Event 텍스트는 UI lane 분리 (main beat를 대체하지 않음)
 * 3) EvidenceHit / General BeatScript를 responseIntent + angleTag로 선택
 * 4) antiRepeat / cooldown / truthEnvelope / fatigue 반영
 *
 * llmDialogueResolver 대체 진입점.
 */

import type { LieState } from '../types'
import type { AttackVector, EmotionTier, QuestionType, ResponseBlueprint, Stance, TransitionBeat } from '../types'
import type { PartyId } from '../types'
import type {
  AngleTag,
  BeatScriptV2,
  BeatSelectorTelemetry,
  FatigueLevel,
  InterjectionState,
  IssueLayer,
  IssueRole,
  MisconceptionState,
  ResponseIntent,
  TrapState,
} from '../types'
import { toTrustWindowBand } from '../types'
import type { EvidenceNodeV2 } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface PendingEventPresentation {
  type: 'contradiction' | 'interjection' | 'emotional_burst' | 'dispute_emergence'
  textId: string
  line: string
  choiceLabels?: string[]
}

export interface BeatSelectorContext {
  turn: number
  caseId: string
  party: PartyId
  disputeId: string
  lieState: LieState

  layer: IssueLayer
  issueRole: IssueRole

  questionType: QuestionType
  blueprint: Pick<ResponseBlueprint, 'stance' | 'allowedClaimAtoms' | 'forbiddenClaimAtoms'>

  responseIntent?: ResponseIntent
  angleTag?: AngleTag

  emotionTier: EmotionTier
  trustWindowValue: number
  fatigueLevel: FatigueLevel
  interjectionState: InterjectionState
  trapState: TrapState
  misconceptionState?: MisconceptionState

  evidenceId?: string
  evidenceMeta?: EvidenceNodeV2 | null
  blockedVectors: AttackVector[]

  pendingTransition?: { from: LieState; to: LieState } | null
  pendingEvent?: PendingEventPresentation | null

  flags: Set<string>
  usedBeatIds: string[]
  usedAntiRepeatGroups: string[]
  beatUseCounts: Record<string, number>
  cooldownUntilTurn: Record<string, number>
}

export interface BeatLibraryV2 {
  beats: BeatScriptV2[]
  transitionBeats: TransitionBeat[]
}

export interface SelectedMainBeat {
  lane: 'transition' | 'evidence_hit' | 'normal'
  beat: TransitionBeat | BeatScriptV2
}

export interface TurnPresentationSelection {
  main: SelectedMainBeat | null
  eventLane: PendingEventPresentation | null
  telemetry: BeatSelectorTelemetry | null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STANCE_TO_BEAT_PRIORITY: Record<Stance, Array<BeatScriptV2['beatType']>> = {
  deny: ['deny', 'hedge'],
  hedge: ['hedge', 'deny'],
  partial: ['partial', 'hedge'],
  blame: ['blame', 'partial'],
  emotional: ['emotional', 'partial'],
  confess: ['confession', 'emotional'],
}

const ANGLE_FALLBACKS: Partial<Record<AngleTag, AngleTag[]>> = {
  timeline: ['context', 'responsibility'],
  motive: ['emotion', 'context'],
  responsibility: ['context', 'motive'],
  identity: ['context', 'legality'],
  context: ['timeline', 'identity'],
  legality: ['identity', 'context'],
  emotion: ['motive'],
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function selectTurnPresentation(
  ctx: BeatSelectorContext,
  library: BeatLibraryV2,
): TurnPresentationSelection {
  // 1) TransitionBeat
  const transition = selectTransitionBeat(ctx, library.transitionBeats)
  if (transition) {
    return {
      main: { lane: 'transition', beat: transition },
      eventLane: ctx.pendingEvent ?? null,
      telemetry: {
        selectedBeatId: transition.id,
        selectedScore: 9999,
        lane: 'transition',
        responseIntent: deriveResponseIntent(ctx),
        angleTag: deriveAngleTag(ctx),
        fatigueLevel: ctx.fatigueLevel,
        trustWindowBand: toTrustWindowBand(ctx.trustWindowValue),
        debugNotes: ['transition_beat'],
      },
    }
  }

  // 2) EvidenceHit
  const evidenceHit = selectEvidenceHitBeat(ctx, library.beats)
  if (evidenceHit) {
    return {
      main: { lane: 'evidence_hit', beat: evidenceHit.beat },
      eventLane: ctx.pendingEvent ?? null,
      telemetry: evidenceHit.telemetry,
    }
  }

  // 3) General
  const general = selectGeneralBeat(ctx, library.beats)
  return {
    main: general ? { lane: 'normal', beat: general.beat } : null,
    eventLane: ctx.pendingEvent ?? null,
    telemetry: general?.telemetry ?? null,
  }
}

export function deriveResponseIntent(ctx: BeatSelectorContext): ResponseIntent {
  if (ctx.responseIntent) return ctx.responseIntent
  if (ctx.questionType === 'evidence_present') return 'evidence_response'
  if (ctx.fatigueLevel === 'high' || ctx.fatigueLevel === 'exhausted') return 'fatigue_response'
  if (
    (ctx.issueRole === 'red_herring' || ctx.issueRole === 'shared_misconception') &&
    (ctx.trapState === 'active' || (ctx.misconceptionState && ['M0', 'M1', 'M2'].includes(ctx.misconceptionState)))
  ) {
    return 'trap_confusion_response'
  }
  if (ctx.questionType === 'fact_pursuit') return 'pressure_response'
  if (ctx.questionType === 'motive_search') return 'motive_response'
  return 'rapport_response'
}

export function deriveAngleTag(ctx: BeatSelectorContext): AngleTag {
  if (ctx.angleTag) return ctx.angleTag

  if (ctx.questionType === 'evidence_present') {
    const vector = ctx.blockedVectors[0]
    if (vector === 'legality') return 'legality'
    if (vector === 'identity' || vector === 'authenticity') return 'identity'
    return 'context'
  }

  switch (ctx.questionType) {
    case 'fact_pursuit':
      return ctx.layer === 'surface' ? 'timeline' : 'responsibility'
    case 'motive_search':
      return ctx.layer === 'core' ? 'emotion' : 'motive'
    case 'empathy_approach':
      return 'emotion'
    default:
      return 'context'
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — TransitionBeat 선택
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function selectTransitionBeat(
  ctx: BeatSelectorContext,
  transitionBeats: TransitionBeat[],
): TransitionBeat | null {
  if (!ctx.pendingTransition) return null

  return transitionBeats.find(tb =>
    tb.caseId === ctx.caseId &&
    tb.party === ctx.party &&
    tb.disputeId === ctx.disputeId &&
    tb.fromState === ctx.pendingTransition?.from &&
    tb.toState === ctx.pendingTransition?.to,
  ) ?? null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — Evidence Hit
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function selectEvidenceHitBeat(
  ctx: BeatSelectorContext,
  beats: BeatScriptV2[],
): { beat: BeatScriptV2; telemetry: BeatSelectorTelemetry } | null {
  if (!ctx.evidenceId) return null

  const responseIntent: ResponseIntent = 'evidence_response'
  const angleTag = deriveAngleTag(ctx)

  const candidates = beats
    .filter(beat =>
      beat.caseId === ctx.caseId &&
      beat.party === ctx.party &&
      beat.disputeId === ctx.disputeId &&
      beat.beatType === 'evidence_hit' &&
      beat.afterEvidence === ctx.evidenceId,
    )
    .map(beat => ({
      beat,
      score: scoreBeat(ctx, beat, responseIntent, angleTag),
    }))
    .filter(entry => entry.score > Number.NEGATIVE_INFINITY)
    .sort((a, b) => b.score - a.score)

  if (candidates.length === 0) return null

  const selected = weightedPick(candidates)
  return {
    beat: selected.beat,
    telemetry: {
      selectedBeatId: selected.beat.id,
      selectedCoverageKey: selected.beat.coverageKey,
      selectedScore: selected.score,
      lane: 'evidence_hit',
      responseIntent,
      angleTag,
      fatigueLevel: ctx.fatigueLevel,
      trustWindowBand: toTrustWindowBand(ctx.trustWindowValue),
    },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — General Beat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function selectGeneralBeat(
  ctx: BeatSelectorContext,
  beats: BeatScriptV2[],
): { beat: BeatScriptV2; telemetry: BeatSelectorTelemetry } | null {
  const responseIntent = deriveResponseIntent(ctx)
  const primaryAngle = deriveAngleTag(ctx)
  const anglesToTry = [primaryAngle, ...(ANGLE_FALLBACKS[primaryAngle] ?? [])]

  const exactPool = collectCandidates(ctx, beats, responseIntent, anglesToTry[0])
  const fallbackPool = exactPool.length > 0
    ? exactPool
    : anglesToTry.slice(1).flatMap(angle => collectCandidates(ctx, beats, responseIntent, angle))

  if (fallbackPool.length === 0) return null

  const selected = weightedPick(fallbackPool)
  return {
    beat: selected.beat,
    telemetry: {
      selectedBeatId: selected.beat.id,
      selectedCoverageKey: selected.beat.coverageKey,
      selectedScore: selected.score,
      lane: 'normal',
      responseIntent,
      angleTag: primaryAngle,
      fatigueLevel: ctx.fatigueLevel,
      trustWindowBand: toTrustWindowBand(ctx.trustWindowValue),
      debugNotes: selected.notes,
    },
  }
}

function collectCandidates(
  ctx: BeatSelectorContext,
  beats: BeatScriptV2[],
  responseIntent: ResponseIntent,
  angleTag: AngleTag,
): Array<{ beat: BeatScriptV2; score: number; notes: string[] }> {
  const preferredBeatTypes = STANCE_TO_BEAT_PRIORITY[ctx.blueprint.stance]

  return beats
    .filter(beat =>
      beat.caseId === ctx.caseId &&
      beat.party === ctx.party &&
      beat.disputeId === ctx.disputeId &&
      beat.layer === ctx.layer &&
      beat.issueRole === ctx.issueRole &&
      beat.applicableStates.includes(ctx.lieState),
    )
    .map(beat => {
      const score = scoreBeat(ctx, beat, responseIntent, angleTag)
      const notes: string[] = []
      if (beat.responseIntent === responseIntent) notes.push('exact_intent')
      if (beat.angleTag === angleTag) notes.push('exact_angle')
      if (preferredBeatTypes.includes(beat.beatType)) notes.push('stance_match')
      return { beat, score, notes }
    })
    .filter(entry => entry.score > Number.NEGATIVE_INFINITY)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 스코어링
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scoreBeat(
  ctx: BeatSelectorContext,
  beat: BeatScriptV2,
  responseIntent: ResponseIntent,
  angleTag: AngleTag,
): number {
  const preferredBeatTypes = STANCE_TO_BEAT_PRIORITY[ctx.blueprint.stance]
  const trustBand = toTrustWindowBand(ctx.trustWindowValue)

  // ── hard filters ──
  if (ctx.cooldownUntilTurn[beat.id] && ctx.cooldownUntilTurn[beat.id] > ctx.turn) {
    return Number.NEGATIVE_INFINITY
  }
  if ((ctx.beatUseCounts[beat.id] ?? 0) >= (beat.maxUsesPerCase ?? Number.MAX_SAFE_INTEGER)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.questionTypes?.length && !beat.questionTypes.includes(ctx.questionType)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.afterEvidenceIds?.length) {
    if (!ctx.evidenceId || !beat.conditions.afterEvidenceIds.includes(ctx.evidenceId)) {
      return Number.NEGATIVE_INFINITY
    }
  }
  if (beat.conditions?.emotionTiers?.length && !beat.conditions.emotionTiers.includes(ctx.emotionTier)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.trustWindowBands?.length && !beat.conditions.trustWindowBands.includes(trustBand)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.fatigueLevels?.length && !beat.conditions.fatigueLevels.includes(ctx.fatigueLevel)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.interjectionStates?.length && !beat.conditions.interjectionStates.includes(ctx.interjectionState)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.trapStates?.length && !beat.conditions.trapStates.includes(ctx.trapState)) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.misconceptionStates?.length) {
    if (!ctx.misconceptionState || !beat.conditions.misconceptionStates.includes(ctx.misconceptionState)) {
      return Number.NEGATIVE_INFINITY
    }
  }
  if (beat.conditions?.blockedVectors?.length) {
    const allBlocked = beat.conditions.blockedVectors.every(v => ctx.blockedVectors.includes(v))
    if (!allBlocked) return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.requiresFlags?.some(flag => !ctx.flags.has(flag))) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.conditions?.forbidsFlags?.some(flag => ctx.flags.has(flag))) {
    return Number.NEGATIVE_INFINITY
  }
  if (beat.truthEnvelope?.forbidAtomIds?.length) {
    const forbidHit = beat.truthEnvelope.forbidAtomIds.some(atomId =>
      ctx.blueprint.forbiddenClaimAtoms.includes(atomId),
    )
    if (forbidHit) return Number.NEGATIVE_INFINITY
  }

  // ── soft scoring ──
  let score = 0
  score += beat.priority ?? 0
  score += beat.weight ?? 0

  if (beat.responseIntent === responseIntent) score += 18
  if (beat.angleTag === angleTag) score += 12
  if (preferredBeatTypes.includes(beat.beatType)) score += 16
  if (beat.afterEvidence && beat.afterEvidence === ctx.evidenceId) score += 10
  if (beat.questionTypes?.includes(ctx.questionType)) score += 8

  if (ctx.usedBeatIds.includes(beat.id)) score -= 100
  if (beat.antiRepeatGroup && ctx.usedAntiRepeatGroups.includes(beat.antiRepeatGroup)) score -= 25

  if (responseIntent === 'fatigue_response' && beat.responseIntent === 'fatigue_response') {
    score += 14
  }

  return score
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 가중 랜덤 선택 (top-4)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function weightedPick<T extends { score: number }>(items: T[]): T {
  const top = items
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  const minScore = top[top.length - 1]?.score ?? 0
  const weights = top.map(item => Math.max(1, item.score - minScore + 1))
  const sum = weights.reduce((acc, cur) => acc + cur, 0)
  const roll = Math.random() * sum

  let cursor = 0
  for (let i = 0; i < top.length; i++) {
    cursor += weights[i]
    if (roll <= cursor) return top[i]
  }

  return top[0]
}
