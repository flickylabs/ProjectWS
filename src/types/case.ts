import type { DuoSeed } from './character'
import type { LieType, LieIntensity, LieMotive, LieState } from './agent'
import type { TruthLevel } from './renewal'

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
  /** 조사 전 표면 이름 (진실을 숨긴 버전) */
  surfaceName?: string
  /** 조사 전 표면 설명 (진실을 숨긴 버전) */
  surfaceDescription?: string
  type: EvidenceType
  reliability: Reliability
  completeness: Completeness
  provenance: Provenance
  legitimacy: Legitimacy
  proves: string[]
  isTrap: boolean
  requires: string[]
  /** 이 증거가 해금되려면 proves에 연결된 dispute의 lieState가 이 값 이상이어야 함 */
  requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'
  investigationResults: Record<string, string>
  /** 이 증거가 보여주는 행위의 주체: a/b/both */
  subjectParty?: 'a' | 'b' | 'both'
  /** 조사 단계별 해금되는 심문 질문. stage 0은 열람만으로, stage N은 N회 조사 후. */
  investigationStages?: {
    stage: number
    /** 이 단계에서 공개되는 investigationResults 키 */
    revealKey: string
    /** 이 단계에서 해금되는 심문 질문 */
    question: {
      text: string
      attackVector: string
    }
    /** V3: 이 조사 질문에 대한 NPC 스크립트 응답 (party별) */
    scriptedNpcResponses?: {
      a?: { npcResponse: string; behaviorHint: string; truthLevel: TruthLevel }
      b?: { npcResponse: string; behaviorHint: string; truthLevel: TruthLevel }
    }
  }[]
  /** 캐릭터별 증거 제시 맥락 (subjectParty: both일 때 활용) */
  partyContext?: {
    a?: {
      /** A에게 이 증거를 제시할 때의 질문 각도 */
      questionAngle: string
      /** A 관점에서 이 증거가 의미하는 것 */
      implication: string
    }
    b?: {
      /** B에게 이 증거를 제시할 때의 질문 각도 */
      questionAngle: string
      /** B 관점에서 이 증거가 의미하는 것 */
      implication: string
    }
  }
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
  /** AI 생성 판정문 (30자 이내) */
  judgmentStatement?: string
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
