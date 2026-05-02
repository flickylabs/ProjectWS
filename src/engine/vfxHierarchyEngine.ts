import type { GamePhase, QuestionType } from '../types'

type MicroObservationCategory = 'contradiction' | 'slip' | 'event'

export type CutsceneType =
  | 'lie_collapse'
  | 'contradiction_hit'
  | 'emotional_burst'
  | 'emotion_peak'
  | 'trust_peak'
  | 'truth_breakthrough'
  | 'dispute_emergence'
  | 'phase_transition'
  | 'verdict_gavel'

export type LightningReason =
  | 'free_interrogation_mapping'
  | 'evidence_combo_unlock'
  | 'combination_result'
  | 'evidence_unlock'
  | 'dispute_emergence'
  | 'system_to_dispute'
  | 'pre_verdict_key_evidence'
  | 's5_collapse'
  | 'general_question'
  | 'system_message'
  | 'phase_notice'
  | 'discovery_result'
  | 'card_highlight'

export interface VfxTurnContext {
  caseId?: string | null
  phase?: GamePhase | string | null
  turn: number
}

export interface LightningGateRequest extends VfxTurnContext {
  toSelector: string
  targetKey?: string
  reason?: LightningReason
}

export interface InterrogationMicroVfx {
  label: string
  category: MicroObservationCategory
  iconId: string
  tone: 'crack' | 'aura' | 'reveal'
}

const CUT_IN_COOLDOWN_TURNS = 5
const EMOTIONAL_BURST_COOLDOWN_TURNS = 7
const LIGHTNING_TARGET_COOLDOWN_TURNS = 5
const COMBINATION_LIGHTNING_PER_TURN_LIMIT = 2
const STRONG_UNLOCK_LIGHTNING_PER_TURN_LIMIT = 3
const PHASE_CUTIN_WARN_THRESHOLD = 5
const PHASE_TRANSITION_STRONG_LIMIT = 2
const MAJOR_HARD_CAP_PER_CASE = 8

const MAJOR_CUTSCENES = new Set<CutsceneType>([
  'lie_collapse',
  'truth_breakthrough',
  'dispute_emergence',
  'emotion_peak',
  'trust_peak',
  'verdict_gavel',
])
const ALLOWED_LIGHTNING_REASONS = new Set<LightningReason>([
  'free_interrogation_mapping',
  'evidence_combo_unlock',
  'combination_result',
  'evidence_unlock',
  'dispute_emergence',
  'system_to_dispute',
  'pre_verdict_key_evidence',
  's5_collapse',
])

const lastCutInTurn = new Map<string, number>()
const majorCountByCase = new Map<string, number>()
const phaseCutInCount = new Map<string, number>()
const phaseWarned = new Set<string>()
const phaseTransitionCountByCase = new Map<string, number>()
const lightningTurnUsed = new Set<string>()
const combinationLightningTurnCount = new Map<string, number>()
const strongUnlockLightningTurnCount = new Map<string, number>()
const lastLightningTargetTurn = new Map<string, number>()
const lightningWarned = new Set<string>()
const majorWarned = new Set<string>()

function caseKey(caseId?: string | null): string {
  return caseId?.replace(/^case-/, '') || 'session'
}

function phaseKey(phase?: GamePhase | string | null): string {
  return phase || 'unknown-phase'
}

function turnKey(ctx: VfxTurnContext): string {
  return `${caseKey(ctx.caseId)}:${ctx.turn}`
}

function warnOnce(bucket: Set<string>, key: string, message: string): void {
  if (bucket.has(key)) return
  bucket.add(key)
  console.warn(message)
}

function recordPhaseCutIn(type: CutsceneType, ctx: VfxTurnContext): void {
  const key = `${caseKey(ctx.caseId)}:${phaseKey(ctx.phase)}`
  const next = (phaseCutInCount.get(key) ?? 0) + 1
  phaseCutInCount.set(key, next)
  if (next >= PHASE_CUTIN_WARN_THRESHOLD) {
    warnOnce(
      phaseWarned,
      key,
      `[VFX hierarchy] phase cut-in count ${next} (${phaseKey(ctx.phase)} / ${type}). Cooldown audit required.`,
    )
  }
}

function canPlayCutIn(type: CutsceneType, ctx: VfxTurnContext, cooldownTurns = CUT_IN_COOLDOWN_TURNS): boolean {
  const key = `${caseKey(ctx.caseId)}:${type}`
  const last = lastCutInTurn.get(key)
  if (last != null && ctx.turn - last < cooldownTurns) return false
  lastCutInTurn.set(key, ctx.turn)
  recordPhaseCutIn(type, ctx)
  return true
}

function canPlayMajor(type: CutsceneType, ctx: VfxTurnContext): boolean {
  const cKey = caseKey(ctx.caseId)
  const typeKey = `${cKey}:${type}`
  const last = lastCutInTurn.get(typeKey)
  if (last != null && ctx.turn - last < CUT_IN_COOLDOWN_TURNS) return false

  const count = majorCountByCase.get(cKey) ?? 0
  if (count >= MAJOR_HARD_CAP_PER_CASE) {
    warnOnce(
      majorWarned,
      cKey,
      `[VFX hierarchy] major cutscene hard cap reached (${MAJOR_HARD_CAP_PER_CASE}) for ${cKey}.`,
    )
    return false
  }

  majorCountByCase.set(cKey, count + 1)
  lastCutInTurn.set(typeKey, ctx.turn)
  return true
}

export function shouldPlayCutscene(type: CutsceneType, ctx: VfxTurnContext): boolean {
  if (MAJOR_CUTSCENES.has(type)) return canPlayMajor(type, ctx)

  if (type === 'phase_transition') {
    const cKey = caseKey(ctx.caseId)
    const phaseCount = phaseTransitionCountByCase.get(cKey) ?? 0
    if (phaseCount >= PHASE_TRANSITION_STRONG_LIMIT) return false
    if (!canPlayCutIn(type, ctx)) return false
    phaseTransitionCountByCase.set(cKey, phaseCount + 1)
    return true
  }

  if (type === 'emotional_burst' || type === 'emotion_peak' || type === 'trust_peak') {
    return canPlayCutIn(type, ctx, EMOTIONAL_BURST_COOLDOWN_TURNS)
  }

  return canPlayCutIn(type, ctx)
}

export function shouldPlayLightning(req: LightningGateRequest): boolean {
  const reason = req.reason ?? 'card_highlight'
  if (!ALLOWED_LIGHTNING_REASONS.has(reason)) return false

  const tKey = turnKey(req)
  const combinationCount = reason === 'combination_result'
    ? (combinationLightningTurnCount.get(tKey) ?? 0)
    : 0
  const strongUnlockCount = reason === 'evidence_unlock' || reason === 'dispute_emergence'
    ? (strongUnlockLightningTurnCount.get(tKey) ?? 0)
    : 0
  if (reason === 'combination_result') {
    if (combinationCount >= COMBINATION_LIGHTNING_PER_TURN_LIMIT) return false
  } else if (reason === 'evidence_unlock' || reason === 'dispute_emergence') {
    if (strongUnlockCount >= STRONG_UNLOCK_LIGHTNING_PER_TURN_LIMIT) return false
  } else if (lightningTurnUsed.has(tKey)) {
    return false
  }

  const target = `${caseKey(req.caseId)}:${req.targetKey ?? req.toSelector}`
  const last = lastLightningTargetTurn.get(target)
  if (last != null && req.turn - last < LIGHTNING_TARGET_COOLDOWN_TURNS) {
    warnOnce(
      lightningWarned,
      `${target}:${last}`,
      `[VFX hierarchy] lightning target cooldown skipped (${req.targetKey ?? req.toSelector}).`,
    )
    return false
  }

  if (reason === 'combination_result') {
    combinationLightningTurnCount.set(tKey, combinationCount + 1)
  } else if (reason === 'evidence_unlock' || reason === 'dispute_emergence') {
    strongUnlockLightningTurnCount.set(tKey, strongUnlockCount + 1)
  }
  lightningTurnUsed.add(tKey)
  lastLightningTargetTurn.set(target, req.turn)
  return true
}

export function getInterrogationMicroVfx(questionType: QuestionType): InterrogationMicroVfx | null {
  void questionType
  return null
}

export function getVfxHierarchyConstants() {
  return {
    cutInCooldownTurns: CUT_IN_COOLDOWN_TURNS,
    emotionalBurstCooldownTurns: EMOTIONAL_BURST_COOLDOWN_TURNS,
    lightningTargetCooldownTurns: LIGHTNING_TARGET_COOLDOWN_TURNS,
    phaseCutInWarnThreshold: PHASE_CUTIN_WARN_THRESHOLD,
    phaseTransitionStrongLimit: PHASE_TRANSITION_STRONG_LIMIT,
    majorHardCapPerCase: MAJOR_HARD_CAP_PER_CASE,
    combinationLightningPerTurnLimit: COMBINATION_LIGHTNING_PER_TURN_LIMIT,
    strongUnlockLightningPerTurnLimit: STRONG_UNLOCK_LIGHTNING_PER_TURN_LIMIT,
    allowedLightningReasons: Array.from(ALLOWED_LIGHTNING_REASONS),
  }
}

export function resetVfxHierarchyState(): void {
  lastCutInTurn.clear()
  majorCountByCase.clear()
  phaseCutInCount.clear()
  phaseWarned.clear()
  phaseTransitionCountByCase.clear()
  lightningTurnUsed.clear()
  combinationLightningTurnCount.clear()
  strongUnlockLightningTurnCount.clear()
  lastLightningTargetTurn.clear()
  lightningWarned.clear()
  majorWarned.clear()
}
