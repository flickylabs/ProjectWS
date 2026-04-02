/**
 * Beat Selector V2 design
 * -----------------------
 * 설계 목표:
 * 1) TransitionBeat 최우선
 * 2) Event 텍스트는 일반 응답 슬롯과 경쟁시키지 않고 UI lane 분리
 * 3) EvidenceHit / General BeatScript를 responseIntent + angleTag로 선택
 * 4) antiRepeat / cooldown / truthEnvelope / fatigue를 함께 반영
 *
 * 배치 권장:
 *   - src/engine/beatSelectorV2.ts
 *   - llmDialogueResolver 대체 진입점
 */

import type { LieState } from './agent'
import type { AttackVector, EmotionTier, QuestionType, ResponseBlueprint, Stance, TransitionBeat } from './renewal'
import type { PartyId } from './game'
import type {
  AngleTag,
  BeatScriptV2,
  BeatSelectorTelemetry,
  FatigueLevel,
  InterjectionState,
  ResponseIntent,
  TrapState,
  toTrustWindowBand,
} from './01-beat-script-v2-schema'
import type { EvidenceNodeV2 } from './03-evidence-v2-schema'

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

  /** dispute layer / role 은 선택 대상 dispute metadata에서 채움 */
  layer: 'surface' | 'motive' | 'core'
  issueRole: 'core_truth' | 'sub_truth' | 'red_herring' | 'shared_misconception'

  questionType: QuestionType
  blueprint: Pick<ResponseBlueprint, 'stance' | 'allowedClaimAtoms' | 'forbiddenClaimAtoms'>

  /** 명시적으로 전달되면 그대로 사용, 아니면 derive */
  responseIntent?: ResponseIntent
  angleTag?: AngleTag

  emotionTier: EmotionTier
  trustWindowValue: number
  fatigueLevel: FatigueLevel
  interjectionState: InterjectionState
  trapState: TrapState
  misconceptionState?: 'M0' | 'M1' | 'M2' | 'M3' | 'M4'

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
  emotion: ['motive', 'context'],
}

export function selectTurnPresentation(
  ctx: BeatSelectorContext,
  library: BeatLibraryV2,
): TurnPresentationSelection {
  // 1) main lane: TransitionBeat
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

  // 2) evidence hit
  const evidenceHit = selectEvidenceHitBeat(ctx, library.beats)
  if (evidenceHit) {
    return {
      main: { lane: 'evidence_hit', beat: evidenceHit.beat },
      eventLane: ctx.pendingEvent ?? null,
      telemetry: evidenceHit.telemetry,
    }
  }

  // 3) general lane
  const general = selectGeneralBeat(ctx, library.beats)
  return {
    main: general ? { lane: 'normal', beat: general.beat } : null,
    eventLane: ctx.pendingEvent ?? null,
    telemetry: general?.telemetry ?? null,
  }
}

export function deriveResponseIntent(ctx: BeatSelectorContext): ResponseIntent {
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

function selectEvidenceHitBeat(
  ctx: BeatSelectorContext,
  beats: BeatScriptV2[],
): { beat: BeatScriptV2; telemetry: BeatSelectorTelemetry } | null {
  if (!ctx.evidenceId) return null

  const responseIntent = 'evidence_response'
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

function scoreBeat(
  ctx: BeatSelectorContext,
  beat: BeatScriptV2,
  responseIntent: ResponseIntent,
  angleTag: AngleTag,
): number {
  const preferredBeatTypes = STANCE_TO_BEAT_PRIORITY[ctx.blueprint.stance]
  const trustBand = toTrustWindowBand(ctx.trustWindowValue)

  // hard filters
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
    const hasBlockedVector = beat.conditions.blockedVectors.every(vector => ctx.blockedVectors.includes(vector))
    if (!hasBlockedVector) return Number.NEGATIVE_INFINITY
  }

  if (beat.conditions?.requiresFlags?.some(flag => !ctx.flags.has(flag))) {
    return Number.NEGATIVE_INFINITY
  }

  if (beat.conditions?.forbidsFlags?.some(flag => ctx.flags.has(flag))) {
    return Number.NEGATIVE_INFINITY
  }

  if (beat.truthEnvelope?.allowAtomIds?.length) {
    const allowOk = beat.truthEnvelope.allowAtomIds.every(atomId =>
      ctx.blueprint.allowedClaimAtoms.includes(atomId),
    )
    if (!allowOk) return Number.NEGATIVE_INFINITY
  }

  if (beat.truthEnvelope?.forbidAtomIds?.length) {
    const forbidHit = beat.truthEnvelope.forbidAtomIds.some(atomId =>
      ctx.blueprint.forbiddenClaimAtoms.includes(atomId),
    )
    if (forbidHit) return Number.NEGATIVE_INFINITY
  }

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

  // fatigue_response는 high / exhausted에서 우대
  if (responseIntent === 'fatigue_response' && beat.responseIntent === 'fatigue_response') {
    score += 14
  }

  return score
}

function weightedPick<T extends { score: number }>(items: T[]): T {
  const top = items
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  const weights = top.map(item => Math.max(1, item.score))
  const sum = weights.reduce((acc, cur) => acc + cur, 0)
  const roll = Math.random() * sum

  let cursor = 0
  for (let i = 0; i < top.length; i += 1) {
    cursor += weights[i]
    if (roll <= cursor) return top[i]
  }

  return top[0]
}

/**
 * useActionDispatch 통합 순서 권장
 *
 * 1. blueprintEngine.generateBlueprint(...)
 * 2. questionFatigueEngine.evaluateQuestionFatigue(...)
 * 3. beatSelectorV2.selectTurnPresentation(...)
 * 4. main.beat.line 을 바로 출력
 * 5. eventLane 은 다음 UI choice layer 에 별도 렌더
 *
 * 주의:
 * - Event 텍스트는 main beat를 대체하지 않는다.
 * - free question(S3+, turn>=6)은 별도 분류기에서 intent만 뽑고,
 *   selector에는 actionFamily='free_question' 으로 들어오게 한다.
 */
