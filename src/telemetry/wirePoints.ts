import type { PlayerAction } from '../types/dialogue'
import type { GamePhase, PartyId } from '../types'
import { Phase } from '../types'
import type { EventFeedbackCourtBeatCue, EventFeedbackCourtBeatIntensity, EventFeedbackKind } from '../store/slices/eventFeedbackSlice'
import { trackEvent } from './funnelClient'
import type { ActionType, BlockedReason, EvidencePresentResult, FeedbackCue, FeedbackIntensity } from './eventTypes'

let sessionStartedAt = Date.now()
let sessionStarted = false
let firstMeaningfulActionFired = false
let verdictEnteredAt: number | null = null
let lastVerdictValue: string | null = null

function secondsSince(ms: number): number {
  return Math.max(0, Math.round((Date.now() - ms) / 1000))
}

function normalizeCaseId(caseId?: string | null): string | null {
  if (!caseId) return null
  return String(caseId).replace(/^case-/, '')
}

function getActionType(action: PlayerAction): ActionType {
  if (action.type === 'question') return 'question'
  if (action.type === 'evidence_present' || action.type === 'evidence_investigate') return 'evidence'
  if (action.type === 'call_witness') return 'witness'
  return 'special'
}

function toFeedbackIntensity(value?: EventFeedbackCourtBeatIntensity): FeedbackIntensity | undefined {
  return value
}

function toFeedbackCue(value?: EventFeedbackCourtBeatCue | 'silent' | 'dispute' | 'witness' | 'emotion' | 'choice'): FeedbackCue | undefined {
  return value
}

export function emitSessionStart(entryPoint: 'home' | 'case-direct' | 'intro' = 'home'): void {
  if (sessionStarted) return
  sessionStarted = true
  sessionStartedAt = Date.now()
  trackEvent('session_start', { entry_point: entryPoint })
}

export function emitSessionEnd(lastPhase?: GamePhase | string, endedBy: 'verdict' | 'quit' | 'crash' = 'quit'): void {
  if (!sessionStarted) return
  sessionStarted = false
  trackEvent('session_end', {
    duration_sec: secondsSince(sessionStartedAt),
    last_phase: lastPhase,
    ended_by: endedBy,
  })
}

export function emitPhaseEnter(phase: GamePhase | string, turn: number, fromPhase?: GamePhase | string | null, caseId?: string | null): void {
  if (phase === Phase.Verdict) verdictEnteredAt = Date.now()
  trackEvent('phase_enter', { phase, turn, from_phase: fromPhase ?? null }, normalizeCaseId(caseId))
  if (phase === Phase.Verdict) {
    trackEvent('verdict_enter', { phase: 'verdict' }, normalizeCaseId(caseId))
  }
}

export function emitPhaseExit(phase: GamePhase | string, durationSec: number, actionsCount: number, caseId?: string | null): void {
  trackEvent('phase_exit', {
    phase,
    duration_sec: Math.max(0, Math.round(durationSec)),
    actions_count: Math.max(0, Math.round(actionsCount)),
  }, normalizeCaseId(caseId))
}

export function emitTutorialStarted(caseId?: string | null): void {
  trackEvent('tutorial_started', {}, normalizeCaseId(caseId))
}

export function emitTutorialStepCompleted(stepId: string, caseId?: string | null): void {
  trackEvent('tutorial_step_completed', { step_id: stepId }, normalizeCaseId(caseId))
}

export function emitTutorialSkipped(stepId?: string | null, caseId?: string | null): void {
  trackEvent('tutorial_skipped', { at_step_id: stepId ?? null }, normalizeCaseId(caseId))
}

export function emitTutorialFinished(totalDurationSec: number, caseId?: string | null): void {
  trackEvent('tutorial_finished', { total_duration_sec: Math.max(0, Math.round(totalDurationSec)) }, normalizeCaseId(caseId))
}

export function emitTutorialRestartedFromSettings(caseId?: string | null): void {
  trackEvent('tutorial_restarted_from_settings', {}, normalizeCaseId(caseId))
}

export function emitActionSelect(action: PlayerAction, caseId?: string | null): void {
  const actionType = getActionType(action)
  if (!firstMeaningfulActionFired && action.type !== 'advance_phase') {
    firstMeaningfulActionFired = true
    trackEvent('first_meaningful_action', {
      action_type: actionType,
      time_from_session_start_sec: secondsSince(sessionStartedAt),
    }, normalizeCaseId(caseId))
  }

  if (action.type === 'question') {
    trackEvent('action_select', {
      action_type: actionType,
      target: action.target,
      dispute_id: action.disputeId,
      question_angle: action.questionType,
    }, normalizeCaseId(caseId))
    return
  }

  if (action.type === 'evidence_present') {
    trackEvent('action_select', {
      action_type: actionType,
      target: action.target,
      evidence_id: action.evidenceId,
    }, normalizeCaseId(caseId))
    return
  }

  if (action.type === 'evidence_investigate') {
    trackEvent('action_select', {
      action_type: actionType,
      evidence_id: action.evidenceId,
    }, normalizeCaseId(caseId))
    return
  }

  trackEvent('action_select', { action_type: actionType }, normalizeCaseId(caseId))
}

export function emitActionBlocked(actionType: ActionType, reason: BlockedReason, caseId?: string | null): void {
  trackEvent('action_blocked', { action_type: actionType, reason }, normalizeCaseId(caseId))
}

export function emitQuestionResult(args: {
  caseId?: string | null
  disputeId: string
  target: PartyId
  angle: string
  before: string
  after: string
}): void {
  trackEvent('question_result', {
    dispute_id: args.disputeId,
    target: args.target,
    angle: args.angle,
    lie_state_before: args.before,
    lie_state_after: args.after,
    effective: args.before !== args.after,
  }, normalizeCaseId(args.caseId))
}

export function emitEvidenceInvestigate(evidenceId: string, caseId?: string | null): void {
  trackEvent('evidence_investigate', { evidence_id: evidenceId }, normalizeCaseId(caseId))
}

export function emitEvidencePresentResult(args: {
  caseId?: string | null
  evidenceId: string
  target: PartyId
  disputeId?: string
  result: EvidencePresentResult
}): void {
  trackEvent('evidence_present_result', {
    evidence_id: args.evidenceId,
    target: args.target,
    dispute_id: args.disputeId,
    result: args.result,
  }, normalizeCaseId(args.caseId))
}

export function emitFeedbackShown(kind: EventFeedbackKind | string, intensity?: EventFeedbackCourtBeatIntensity, cue?: EventFeedbackCourtBeatCue | FeedbackCue): void {
  trackEvent('feedback_shown', {
    kind,
    intensity: toFeedbackIntensity(intensity),
    cue: toFeedbackCue(cue),
  })
}

export function emitFeedbackAction(kind: EventFeedbackKind | string, chosenOption: string): void {
  trackEvent('feedback_action', { kind, chosen_option: chosenOption })
}

export function emitFeedbackDismiss(kind: EventFeedbackKind | string): void {
  trackEvent('feedback_dismiss', { kind })
}

export function emitHiddenDisputeEmerged(disputeId: string, via?: string, caseId?: string | null): void {
  trackEvent('hidden_dispute_emerged', {
    dispute_id: disputeId,
    via_combination: via,
  }, normalizeCaseId(caseId))
}

export function emitTruthStageChanged(target: PartyId, disputeId: string, fromState: string, toState: string, caseId?: string | null): void {
  trackEvent('truth_stage_changed', {
    target,
    dispute_id: disputeId,
    from_state: fromState,
    to_state: toState,
  }, normalizeCaseId(caseId))
  if (toState === 'S5') {
    trackEvent('lie_collapse', { target, dispute_id: disputeId }, normalizeCaseId(caseId))
  }
}

export function emitCombinationAttempt(recipeId: string, caseId?: string | null): void {
  trackEvent('combination_attempt', { recipe_attempted: [recipeId] }, normalizeCaseId(caseId))
}

export function emitCombinationSuccess(recipeId: string, outputId: string, caseId?: string | null): void {
  trackEvent('combination_success', { recipe_id: recipeId, output_id: outputId }, normalizeCaseId(caseId))
}

export function emitCombinationFail(recipeId: string, reason?: string, caseId?: string | null): void {
  trackEvent('combination_fail', { recipe_attempted: [recipeId], reason }, normalizeCaseId(caseId))
}

export function emitVerdictSubmit(verdictValue: string, confidence?: number, caseId?: string | null): void {
  const timeInVerdictSec = verdictEnteredAt ? secondsSince(verdictEnteredAt) : 0
  if (lastVerdictValue && lastVerdictValue !== verdictValue) {
    trackEvent('verdict_retry', { previous_verdict: lastVerdictValue, new_verdict: verdictValue }, normalizeCaseId(caseId))
  }
  lastVerdictValue = verdictValue
  trackEvent('verdict_submit', {
    verdict_value: verdictValue,
    confidence,
    time_in_verdict_sec: timeInVerdictSec,
  }, normalizeCaseId(caseId))
}

export function emitImpactBeatPlayed(beatId: string, intensity: EventFeedbackCourtBeatIntensity, caseId?: string | null): void {
  trackEvent('impact_beat_played', {
    beat_id: beatId,
    intensity,
    case_id: normalizeCaseId(caseId) ?? undefined,
  }, normalizeCaseId(caseId))
}

export function emitT3ClimaxReached(caseId: string | undefined | null, beatId: string): void {
  trackEvent('t3_climax_reached', {
    case_id: normalizeCaseId(caseId) ?? undefined,
    beat_id: beatId,
  }, normalizeCaseId(caseId))
}

export function emitVerdictEntryCutscenePlayed(caseId?: string | null): void {
  trackEvent('verdict_entry_cutscene_played', {}, normalizeCaseId(caseId))
}

export function emitErrorCaught(errorType: string, phase?: string, recoverable = true): void {
  trackEvent('error_caught', { error_type: errorType, phase, recoverable })
}
