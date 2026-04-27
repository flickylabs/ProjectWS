import type { LieState } from './agent'
import type { Archetype } from './character'
import type { DisclosureCaseId } from './disclosure'
import type { PartyId } from './game'

export type FreeInterrogationGuardMode = 'off' | 'log' | 'fallback'

export type FreeInterrogationIntent =
  | 'fact_pursuit'
  | 'motive_search'
  | 'empathy_approach'
  | 'evidence_query'
  | 'relation_query'
  | 'pre_verdict_summary'
  | 'unmapped'

export type FreeInterrogationLieStateBucket =
  | 'S0_S1'
  | 'S2'
  | 'S3_PLUS'
  | 'S4_S5'

export type FreeInterrogationNpcKey =
  | 'spouse-01:a'
  | 'spouse-01:b'
  | 'family-01:a'
  | 'family-01:b'
  | 'friend-01:a'
  | 'friend-01:b'

export type FreeInterrogationGuardIssueDimension =
  | 'hidden_truth_lexeme'
  | 'paraphrase'
  | 'api_failure'
  | 'api_timeout'
  | 'empty_response'
  | 'character_mismatch'
  | 'intent_mismatch'
  | 'unmapped_intent'

export interface FreeInterrogationGuardContext {
  caseId: DisclosureCaseId
  party: PartyId
  lieState?: LieState
  disputeId?: string | null
  intent?: FreeInterrogationIntent
  question?: string
  evidenceId?: string | null
  evidenceName?: string | null
  archetype?: Archetype
  variant?: string
}

export interface FreeInterrogationNpcProfile {
  key: FreeInterrogationNpcKey
  caseId: DisclosureCaseId
  party: PartyId
  name: string
  archetype: Archetype
}

export interface FreeInterrogationGuardIssue {
  dimension: FreeInterrogationGuardIssueDimension
  reason: string
  matched?: string[]
}

export interface FreeInterrogationFallbackMeta {
  npcKey: FreeInterrogationNpcKey
  bucket: FreeInterrogationLieStateBucket
  variantIndex: number
  reason: string
}

export type FreeInterrogationFallbackResult =
  | { action: 'pass'; text: string }
  | {
      action: 'fallback'
      text: string
      originalText: string
      reason: string
      issues: FreeInterrogationGuardIssue[]
      meta: FreeInterrogationFallbackMeta
      behaviorHint: string
    }

export type FreeInterrogationGuardResult =
  | { action: 'pass'; text: string }
  | {
      action: 'log'
      text: string
      reason: string
      issues: FreeInterrogationGuardIssue[]
    }
  | {
      action: 'fallback'
      text: string
      originalText: string
      reason: string
      issues: FreeInterrogationGuardIssue[]
      meta: FreeInterrogationFallbackMeta
      behaviorHint: string
    }

export interface FreeInterrogationApiSafetyOptions {
  timeoutMs?: number
  retries?: number
  operation?: string
  evaluateResponse?: boolean
}
