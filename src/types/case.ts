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

export type EvidenceType =
  | 'bank'
  | 'financial_record'
  | 'receipt'
  | 'chat'
  | 'contract'
  | 'estimate'
  | 'document'
  | 'institutional_note'
  | 'medical_record'
  | 'testimony'
  | 'cctv'
  | 'photo'
  | 'photo_video'
  | 'video'
  | 'dashcam'
  | 'log'
  | 'platform_log'
  | 'cloud_log'
  | 'device_log'
  | 'record'
  | 'delivery_record'
  | 'repair_record'
  | 'email'
  | 'audio'
  | 'forensic_report'
  | 'device'
  | 'sns'
export type Reliability = 'hard' | 'soft'
export type Completeness = 'original' | 'edited' | 'partial' | 'context_missing'
export type Provenance = 'self_possessed' | 'third_party' | 'anonymous' | 'institutional'
export type Legitimacy = 'lawful' | 'privacy_concern' | 'unlawful'

export interface EvidenceMediaAsset {
  imageUrl: string
  thumbnailUrl?: string
  posterUrl?: string
  width?: number
  height?: number
  alt?: string
  caption?: string
}

export interface EvidenceViewerMedia {
  imageUrl?: string
  thumbnailUrl?: string
  posterUrl?: string
  width?: number
  height?: number
  alt?: string
  caption?: string
  frameImages?: EvidenceMediaAsset[]
  screenshotImages?: EvidenceMediaAsset[]
}

export interface EvidenceNode {
  id: string
  name: string
  description: string
  /** 조사 전 표면 이름 (진실을 숨긴 버전) */
  surfaceName?: string
  /** 조사 전 표면 설명 (진실을 숨긴 버전) */
  surfaceDescription?: string
  /** PC 증거 뷰어용 메타 정보 */
  meta?: {
    trustLevel: 'high' | 'mid' | 'low'
    trustLabel: string
    source: 'a' | 'b' | 'org' | 'third'
    sourceLabel: string
    legality: 'ok' | 'sus' | 'unlawful'
    legalLabel: string
    stage: number
    stageLabel?: string
    sourceNote?: string
    redactions?: string[]
  }
  /** PC 증거 뷰어 상세 데이터 */
  viewerData?: {
    meta?: Record<string, unknown>
    media?: EvidenceViewerMedia
    bank?: unknown
    financial_record?: unknown
    receipt?: unknown
    chat?: unknown
    contract?: unknown
    estimate?: unknown
    document?: unknown
    institutional_note?: unknown
    medical_record?: unknown
    testimony?: unknown
    cctv?: unknown
    photo?: unknown
    photo_video?: unknown
    video?: unknown
    dashcam?: unknown
    log?: unknown
    platform_log?: unknown
    cloud_log?: unknown
    device_log?: unknown
    record?: unknown
    delivery_record?: unknown
    repair_record?: unknown
    email?: unknown
    audio?: unknown
    forensic_report?: unknown
    device?: unknown
    sns?: unknown
    [key: string]: unknown
  }
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

export type CombinationLabNodeType =
  | 'evidence'
  | 'note'
  | 'derived_note'
  | 'derived_evidence'
  | 'question'
  | 'statement'
  | 'dispute'
  | 'witness_angle'
  | 'mediation_hint'

export type CombinationLabResultKind =
  | 'unlock_evidence'
  | 'unlock_note'
  | 'unlock_question'
  | 'unlock_statement'
  | 'unlock_dispute'
  | 'unlock_witness_angle'
  | 'unlock_interjection'
  | 'unlock_mediation_hint'
  | 'upgrade_question'
  | 'upgrade_evidence'
  | 'upgrade_dispute'
  | 'reframe_question'
  | 'reframe_evidence'
  | 'reframe_dispute'
  | 'split_dispute'
  | 'merge_disputes'
  | 'elevate_reliability'
  | 'expand_context'
  | 'narrow_scope'
  | 'shift_legality_weight'
  | 'shift_responsibility_weight'

export interface CombinationLabNode {
  id: string
  type: CombinationLabNodeType
  label: string
  sourceRef?: string
  linkedDisputeIds?: string[]
  linkedEvidenceIds?: string[]
  linkedQuestionIds?: string[]
  visibility: 'base' | 'hidden' | 'derived'
}

export interface CombinationLabEffect {
  kind: CombinationLabResultKind
  targetId?: string
  unlockNodeId?: string
  upgradeFromId?: string
  upgradeToId?: string
  reframeFromId?: string
  reframeToId?: string
  splitFromId?: string
  splitIntoIds?: string[]
  mergeFromIds?: string[]
  mergeToId?: string
  evidenceUpgrade?: {
    evidenceId: string
    toReliability?: Reliability
    toCompleteness?: Completeness
    addContextTags?: string[]
  }
  disputeUpgrade?: {
    disputeId: string
    weight?: 'high' | 'medium' | 'low'
    ambiguity?: 'none' | 'low' | 'high'
    legitimacyIssue?: boolean
  }
  questionUpgrade?: {
    questionId: string
    tier?: 'advanced' | 'pressure' | 'closing'
  }
}

export interface CombinationLabOutput {
  id: string
  label: string
  summary: string
  nodeType: CombinationLabNodeType
  effects: CombinationLabEffect[]
  judgeHint?: string
  noteText?: string
  questionPrompts?: { id: string; text: string; tier?: 'advanced' | 'pressure' | 'closing' }[]
  statementEntries?: { id: string; text: string; targetParty?: 'a' | 'b' | 'both' }[]
  witnessAngles?: { id: string; text: string }[]
  mediationHints?: { id: string; text: string }[]
  evidenceNode?: EvidenceNode
  disputeNodes?: Dispute[]
}

export interface CombinationLabRecipe {
  id: string
  inputs: string[]
  cost: number
  hidden?: boolean
  repeatable?: boolean
  failHint?: string
  discoveryText: string
  outputId: string
}

export interface CombinationLabConfig {
  analysisPointsBase: number
  analysisPointRefundOnFirstHidden?: number
  nodes: CombinationLabNode[]
  outputs: CombinationLabOutput[]
  recipes: CombinationLabRecipe[]
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
  title?: string
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
  /** 증거 표면화 기본 3장 — PC에서 처음 보이는 증거 */
  baseEvidenceIds?: [string, string, string]
  /** 금전 관련 쟁점 IDs — 비금전 사건 금전 오염 방지 */
  monetaryDisputeIds?: string[]
  /** 조합 실험실 V2/V2.1 확장 데이터 */
  combinationLab?: CombinationLabConfig
}
