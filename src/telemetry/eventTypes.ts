import type { GamePhase, PartyId } from '../types'
import type { LocaleCode } from '../i18n'

export const TELEMETRY_EVENT_NAMES = [
  'session_start',
  'session_end',
  'phase_enter',
  'phase_exit',
  'tutorial_started',
  'tutorial_step_completed',
  'tutorial_skipped',
  'tutorial_finished',
  'tutorial_restarted_from_settings',
  'first_meaningful_action',
  'action_select',
  'action_blocked',
  'question_result',
  'evidence_investigate',
  'evidence_present_result',
  'feedback_shown',
  'feedback_action',
  'feedback_dismiss',
  'hidden_dispute_emerged',
  'truth_stage_changed',
  'lie_collapse',
  'combination_attempt',
  'combination_success',
  'combination_fail',
  'verdict_enter',
  'verdict_submit',
  'verdict_retry',
  'impact_beat_played',
  't3_climax_reached',
  'verdict_entry_cutscene_played',
  'error_caught',
] as const

export type TelemetryEventName = typeof TELEMETRY_EVENT_NAMES[number]

export type TelemetryClientPlatform =
  | 'electron-steam'
  | 'electron-dev'
  | 'web-vercel'
  | 'web-dev'

export type TelemetryJsonValue =
  | string
  | number
  | boolean
  | null
  | TelemetryJsonValue[]
  | { [key: string]: TelemetryJsonValue }

export type TelemetryPayload = Record<string, TelemetryJsonValue>

export type ActionType = 'question' | 'evidence' | 'witness' | 'special'
export type BlockedReason = 'resource' | 'condition' | 'invalid_target'
export type EvidencePresentResult = 'effective' | 'ineffective' | 'mismatched'
export type FeedbackIntensity = 'focus' | 'impact' | 'breakthrough'
export type FeedbackCue =
  | 'silent'
  | 'evidence'
  | 'contradiction'
  | 'dispute'
  | 'witness'
  | 'notebook'
  | 'truth'
  | 'emotion'
  | 'choice'
export type EndedBy = 'verdict' | 'quit' | 'crash'

export interface TelemetryEventPayloadMap {
  session_start: { entry_point: 'home' | 'case-direct' | 'intro' }
  session_end: { duration_sec: number; last_phase?: string; ended_by: EndedBy }
  phase_enter: { phase: GamePhase | string; turn: number; from_phase?: GamePhase | string | null }
  phase_exit: { phase: GamePhase | string; duration_sec: number; actions_count: number }
  tutorial_started: Record<string, never>
  tutorial_step_completed: { step_id: string }
  tutorial_skipped: { at_step_id?: string | null }
  tutorial_finished: { total_duration_sec: number }
  tutorial_restarted_from_settings: Record<string, never>
  first_meaningful_action: { action_type: ActionType; time_from_session_start_sec: number }
  action_select: {
    action_type: ActionType
    target?: PartyId
    dispute_id?: string
    evidence_id?: string
    question_angle?: string
  }
  action_blocked: { action_type: ActionType; reason: BlockedReason }
  question_result: {
    dispute_id: string
    target: PartyId
    angle: string
    lie_state_before: string
    lie_state_after: string
    effective: boolean
  }
  evidence_investigate: { evidence_id: string }
  evidence_present_result: {
    evidence_id: string
    target: PartyId
    dispute_id?: string
    result: EvidencePresentResult
  }
  feedback_shown: { kind: string; intensity?: FeedbackIntensity; cue?: FeedbackCue }
  feedback_action: { kind: string; chosen_option: string }
  feedback_dismiss: { kind: string }
  hidden_dispute_emerged: { dispute_id: string; via_combination?: string }
  truth_stage_changed: { target: PartyId; dispute_id: string; from_state: string; to_state: string }
  lie_collapse: { target: PartyId; dispute_id: string }
  combination_attempt: { recipe_attempted: string[] }
  combination_success: { recipe_id: string; output_id: string }
  combination_fail: { recipe_attempted: string[]; reason?: string }
  verdict_enter: { phase: 'verdict' }
  verdict_submit: { verdict_value: string; confidence?: number; time_in_verdict_sec: number }
  verdict_retry: { previous_verdict: string; new_verdict: string }
  impact_beat_played: { beat_id: string; intensity: FeedbackIntensity; case_id?: string }
  t3_climax_reached: { case_id?: string; beat_id: string }
  verdict_entry_cutscene_played: Record<string, never>
  error_caught: { error_type: string; phase?: string; recoverable: boolean }
}

export type TelemetryEvent<N extends TelemetryEventName = TelemetryEventName> = {
  event_id: string
  anon_id: string
  session_id: string
  event_name: N
  event_payload: TelemetryEventPayloadMap[N]
  case_id?: string | null
  client_ts: string
  client_build: string
  client_platform: TelemetryClientPlatform
  client_locale: LocaleCode
}

export function isTelemetryEventName(value: string): value is TelemetryEventName {
  return (TELEMETRY_EVENT_NAMES as readonly string[]).includes(value)
}
