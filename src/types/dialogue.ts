import type { PartyId } from './game'
import type { LieState } from './agent'

export type Speaker = PartyId | 'system' | 'judge' | 'witness'

export interface DialogueEntry {
  id: string
  speaker: Speaker
  text: string
  relatedDisputes: string[]
  turn: number
  behaviorHint?: string
  isConfidential?: boolean
  /** 증인 전용: 증인 이름 */
  witnessName?: string
  /** 증인 전용: 어느 쪽에 유리한 증인인지 */
  witnessFavor?: 'pro_a' | 'pro_b' | 'neutral' | 'mixed'
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
  isConfidential?: boolean
}

// 통합된 질문 유형 (6종 → 3종)
export type QuestionType = 'fact_pursuit' | 'motive_search' | 'empathy_approach'

// 보호 행동 (5종 → 2종)
export type TrustActionType = 'confidential_protection' | 'separation' | 'emotional_stabilization' | 'retaliation_check'

// 전략 스킬 (즉답 요구만 액티브, 회피 판독은 토글로 구현)
export type SkillType = 'immediate_answer' | 'evasion_reading'

// 레거시 호환: 이전 질문 유형을 새 유형으로 매핑
export type LegacyQuestionType = 'fact_fixing' | 'timeline' | 'motive' | 'context_expansion' | 'provenance' | 'empathy'

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
  | { type: 'call_witness'; witnessId: string }
  | { type: 'mediation'; choice: MediationChoice }
  | { type: 'advance_phase' }

export interface DialogueCondition {
  disputeId?: string
  questionType?: QuestionType | LegacyQuestionType
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
