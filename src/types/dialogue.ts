import type { PartyId } from './game'
import type { LieState } from './agent'

export type Speaker = PartyId | 'system' | 'judge'

export interface DialogueEntry {
  id: string
  speaker: Speaker
  text: string
  relatedDisputes: string[]
  turn: number
  behaviorHint?: string
}

export type ClaimStatus = 'normal' | 'conflict' | 'changed' | 'official' | 'collapsed'

export interface ClaimNode {
  id: string
  claimant: PartyId
  disputeId: string
  summary: string
  confidence: 'high' | 'medium' | 'low'
  status: ClaimStatus
  turn: number
}

export type QuestionType = 'fact_fixing' | 'timeline' | 'motive' | 'context_expansion' | 'provenance' | 'empathy'

export type TrustActionType =
  | 'confidential_protection'
  | 'interruption_block'
  | 'retaliation_check'
  | 'emotional_stabilization'
  | 'pre_disclosure_consent'

export type SkillType =
  | 'immediate_answer'
  | 'cross_examination'
  | 'evasion_reading'
  | 'statement_comparison'
  | 'third_party_summon'
  | 'order_warning'
  | 'official_record'

export type EvidenceSubAction =
  | 'request_original'
  | 'check_metadata'
  | 'restore_context'
  | 'verify_source'
  | 'check_edits'
  | 'question_acquisition'

export type MediationChoice =
  | 'immediate_verdict'
  | 'conditional_mediation'
  | 'postpone_investigation'
  | 'fact_first_solution_later'

export type PlayerAction =
  | { type: 'question'; questionType: QuestionType; target: PartyId; disputeId: string }
  | { type: 'trust_action'; actionType: TrustActionType; target: PartyId }
  | { type: 'skill'; skillType: SkillType; target?: PartyId; disputeId?: string }
  | { type: 'evidence_present'; evidenceId: string; target: PartyId }
  | { type: 'evidence_investigate'; evidenceId: string; subAction: EvidenceSubAction }
  | { type: 'mediation'; choice: MediationChoice }
  | { type: 'advance_phase' }

export interface DialogueCondition {
  disputeId?: string
  questionType?: QuestionType
  lieState?: LieState
  evidencePresented?: string[]
  trustActionUsed?: TrustActionType
  emotionalPhase?: string
}

export interface DialogueNode {
  id: string
  conditions: DialogueCondition
  speaker: PartyId
  text: string
  behaviorHint?: string
  effects: {
    lieTransition?: { disputeId: string; to: LieState }
    emotionalDelta?: number
    trustDelta?: { field: 'trustTowardJudge' | 'fearOfExposure' | 'retaliationWorry'; delta: number }
    evidenceUnlock?: string
    claimUpdate?: { disputeId: string; summary: string; confidence: 'high' | 'medium' | 'low' }
  }
}
