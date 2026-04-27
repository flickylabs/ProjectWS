import type { LieState } from './agent'
import type { PartyId } from './game'

export type DisclosureCaseId = 'spouse-01' | 'family-01' | 'friend-01'

export type DisclosureGuardMode = 'off' | 'log' | 'sanitize' | 'block'

export type DisclosureChannelType =
  | 'judge_question'
  | 'judge_contradiction'
  | 'judge_evidence_combo'
  | 'judge_witness_summon'
  | 'system_message'
  | 'dossier'
  | 'evidence_discovery'
  | 'evidence_present'
  | 'interrogation'
  | 'contradiction_pursuit'
  | 'aftermath'
  | 'emotional_overload'
  | 'mediation'
  | 'witness_vague'
  | 'witness_partial'
  | 'witness_full'

export type DisclosureEvidenceState = {
  evidenceId?: string
  unlocked?: boolean
  presented?: boolean
  investigationStage?: number
}

export type GuardContext = {
  channel: DisclosureChannelType
  caseId: DisclosureCaseId
  lieState?: LieState
  evidenceState?: DisclosureEvidenceState
  party?: PartyId
  disputeId?: string
  variant?: string
  dossierStage?: 'early' | 'mid' | 'late'
}

export type GuardResult =
  | { action: 'pass' }
  | { action: 'log'; reason: string; matched: string[] }
  | { action: 'sanitize'; reason: string; replacement: string }
  | { action: 'block'; reason: string; matched: string[] }
