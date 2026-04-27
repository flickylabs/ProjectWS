import type { AgentState } from './agent'
import type { CaseData } from './case'
import type { GamePhase, PartyId } from './game'
import type { QuestionType } from './renewal'

export type FreeInterrogationMode = 'off' | 'preview' | 'on'

export type FreeInterrogationIntentId =
  | 'fact_pursuit'
  | 'motive_search'
  | 'empathy_approach'
  | 'evidence_query'
  | 'relation_query'
  | 'pre_verdict_summary'
  | 'unmapped'

export type FreeInterrogationQuestionType = Extract<
  QuestionType,
  'fact_pursuit' | 'motive_search' | 'empathy_approach'
>

export interface FreeInterrogationMapping {
  target: PartyId | null
  disputeId: string | null
  interrogationType: FreeInterrogationQuestionType | null
  evidenceRef: string | null
}

export interface FreeInterrogationIntent {
  intent: FreeInterrogationIntentId
  confidence: number
  mapped: FreeInterrogationMapping
  raw: string
}

export interface FreeInterrogationRuntimeContext {
  caseId: string
  caseData: CaseData
  currentPhase: GamePhase
  target: PartyId | null
  activeDisputeId?: string | null
  agentA: AgentState
  agentB: AgentState
  evidenceStates: Record<string, { unlocked?: boolean; investigatedActions?: string[]; presented?: boolean }>
}

export interface FreeInterrogationActionMeta {
  rawText: string
  intent: FreeInterrogationIntentId
  confidence: number
  evidenceRef?: string | null
}

export interface FreeInterrogationFallbackContext {
  caseId: string
  target: PartyId | null
  disputeId: string | null
  intent: FreeInterrogationIntentId
  lieState?: string
  evidenceRef?: string | null
  rawText: string
}

export interface FreeInterrogationFallbackResult {
  action: 'pass' | 'fallback'
  text: string
}

export interface FreeInterrogationResolution {
  status: 'dispatch' | 'fallback'
  intent: FreeInterrogationIntent
  action?: {
    type: 'question'
    questionType: FreeInterrogationQuestionType
    target: PartyId
    disputeId: string
    freeInterrogation: FreeInterrogationActionMeta
  }
  fallbackText?: string
  reason?: string
}
