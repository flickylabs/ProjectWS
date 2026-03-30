import type { DuoSeed } from './character'
import type { LieType, LieIntensity, LieMotive, LieState } from './agent'

export type KnowledgeQuadrant = 'both_know' | 'a_only' | 'b_only' | 'neither_knows' | 'shared_misconception'

export interface TruthItem {
  id: string
  fact: string
  isTrue: boolean
  weight: number
  quadrant: KnowledgeQuadrant
}

export interface LieConfig {
  disputeId: string
  lieType: LieType
  lieIntensity: LieIntensity
  lieMotive: LieMotive
  initialState: LieState
  collapseViaTrust: boolean
  transitions: { from: LieState; to: LieState; trigger: string }[]
}

export type EvidenceType = 'bank' | 'chat' | 'cctv' | 'contract' | 'testimony' | 'log' | 'device' | 'sns'
export type Reliability = 'hard' | 'soft'
export type Completeness = 'original' | 'edited' | 'partial' | 'context_missing'
export type Provenance = 'self_possessed' | 'third_party' | 'anonymous' | 'institutional'
export type Legitimacy = 'lawful' | 'privacy_concern' | 'unlawful'

export interface EvidenceNode {
  id: string
  name: string
  description: string
  type: EvidenceType
  reliability: Reliability
  completeness: Completeness
  provenance: Provenance
  legitimacy: Legitimacy
  proves: string[]
  isTrap: boolean
  requires: string[]
  investigationResults: Record<string, string>
}

export interface EvidenceCombination {
  requires: string[]
  upgradesTo: Reliability
  proves: string[]
}

export interface Dispute {
  id: string
  name: string
  truth: boolean
  truthDescription: string
  quadrant: KnowledgeQuadrant
  requiredEvidence: string[]
  correctResponsibility: { a: number; b: number }
  ambiguity: 'none' | 'low' | 'high'
  weight: 'high' | 'medium' | 'low'
  mediationLink: string
  /** 이 쟁점을 심문하려면 선행 조건 필요 (없으면 처음부터 가능) */
  unlockCondition?: {
    /** 선행 쟁점이 특정 상태 이상이어야 함 */
    requireDispute?: { id: string; minState: string }
    /** 선행 증거가 제시되어야 함 */
    requireEvidence?: string
  }
  legitimacyIssue: boolean
}

export interface ContextSeed {
  contextType: string
  description: string
  emotionalPressure: number
  affects: 'a' | 'b' | 'both'
  triggerAmplifier: string
}

export interface CaseMeta {
  relationshipType: string
  relationshipState?: string
  familyRelation?: string
  conflictSeed: string
  variableModules?: string[]
  twistModule?: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  anchorTruth: string
  emotionalBait: string
  resolutionDilemma: string
}

export interface CaseData {
  caseId: string
  meta?: CaseMeta
  duo: DuoSeed
  context: ContextSeed
  disputes: Dispute[]
  evidence: EvidenceNode[]
  evidenceCombinations: EvidenceCombination[]
  truthTable: TruthItem[]
  lieConfigA: LieConfig[]
  lieConfigB: LieConfig[]
  solutions: Record<string, string[]>
  activeLedgerEntries: string[]
  activeThirdParties: string[]
}
