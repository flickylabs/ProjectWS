import type { PartyId } from './game'

// ─────────────────────────────────────────
// 1. 진실 공방 (Truth Confrontation)
// ─────────────────────────────────────────

/** 플레이어의 쟁점별 진실 판단 */
export type TruthJudgment = 'believe_a' | 'believe_b' | 'both_partial' | 'undetermined'

export interface PlayerJudgmentEntry {
  disputeId: string
  judgment: TruthJudgment
  /** 판단 시점 턴 번호 */
  turnMade: number
  /** 판단 수정 이력 */
  revisions: { from: TruthJudgment; to: TruthJudgment; turn: number }[]
  /** 이 판단으로부터 파생된 연쇄 추론 쟁점 IDs */
  cascadeTargets: string[]
}

/** 진실 공방 트리거 이벤트 */
export interface TruthConfrontationEvent {
  disputeId: string
  claimA: { summary: string; claimId: string }
  claimB: { summary: string; claimId: string }
  /** 관련 증거 IDs (판단에 참고할 수 있는) */
  relevantEvidence: string[]
}

/** 기존 판단과 충돌하는 새 정보 발견 시 */
export interface JudgmentConflictEvent {
  disputeId: string
  currentJudgment: TruthJudgment
  conflictingInfo: string
  source: 'evidence' | 'testimony' | 'lie_collapse' | 'emotional_slip'
}

// ─────────────────────────────────────────
// 2. 증거 감별 (Evidence Appraisal)
// ─────────────────────────────────────────

export type AppraisalVerdict = 'trustworthy' | 'partial' | 'suspicious' | 'unappraised'

/** 부분 신뢰 시 개별 조사 항목에 대한 신뢰 체크 */
export interface PartialTrustDetail {
  /** investigationResults의 key */
  subAction: string
  /** 이 항목을 신뢰하는지 */
  trusted: boolean
}

export interface EvidenceAppraisalEntry {
  evidenceId: string
  verdict: AppraisalVerdict
  /** partial일 때만 — 어떤 조사 결과를 믿고 안 믿는지 */
  partialDetails: PartialTrustDetail[]
  /** 감별 시점 턴 번호 */
  turnAppraised: number
  /** 감별이 정확했는지 (게임 종료 시 채점용, 런타임에서는 null) */
  wasCorrect: boolean | null
}

// ─────────────────────────────────────────
// 3. 숨겨진 쟁점 (Hidden Dispute System)
// ─────────────────────────────────────────

export type DisputeVisibility = 'visible' | 'hidden' | 'emerged' | 'inactive'

export interface DisputeVisibilityEntry {
  disputeId: string
  visibility: DisputeVisibility
  /** 이 쟁점이 관련된 당사자 */
  relevantParties: PartyId[]
  /** 발현 조건 (어떤 경로로 드러날 수 있는지) */
  emergenceRoutes: EmergenceRoute[]
  /** 발현 시점 턴 번호 (null이면 아직 안 드러남) */
  emergedAtTurn: number | null
  /** 발현 경로 (어떻게 드러났는지) */
  emergedVia: EmergenceRoute['type'] | null
  /** 신규 표시 (N) — 플레이어가 확인하면 false */
  isNew: boolean
}

export interface EmergenceRoute {
  type: 'evidence' | 'truth_confrontation' | 'witness' | 'lie_collapse' | 'emotional_slip'
  /** 필요 조건 상세 */
  condition: {
    /** 특정 증거 제시/조사 필요 */
    evidenceIds?: string[]
    /** 특정 쟁점의 판단 완료 필요 */
    judgedDisputes?: string[]
    /** 특정 증인 소환 필요 */
    witnessId?: string
    /** 특정 쟁점에서 S5 도달 필요 */
    lieCollapseDispute?: string
    /** 특정 쟁점에서 감정 격앙 실수 필요 */
    emotionalSlipDispute?: string
  }
}

// ─────────────────────────────────────────
// 4. 감정 전략 (Emotional Leverage)
// ─────────────────────────────────────────

// EmotionTier는 renewal.ts에서 정의
// 이 파일 내부에서만 사용, re-export 안 함
import type { EmotionTier } from './renewal'

export interface EmotionTierConfig {
  tier: EmotionTier
  min: number
  max: number
  /** 거짓말 전이 확률 보정 (1.0 = 기본) */
  lieTransitionMultiplier: number
  /** 감정적 실수 자백 확률 (0~1) */
  slipChance: number
  /** 설명 텍스트 */
  label: string
  description: string
}

/** 감정 격앙 시 발생하는 실수 자백 이벤트 */
export interface EmotionalSlipEvent {
  party: PartyId
  /** 실수로 노출한 쟁점 */
  sourceDisputeId: string
  /** 관련된 다른 쟁점 (연쇄 연결) */
  linkedDisputeId: string | null
  /** 실수 발언 내용 (verbalTells 기반) */
  slipText: string
  turn: number
}

// ─────────────────────────────────────────
// 5. 통합 Discovery State
// ─────────────────────────────────────────

export interface DiscoveryState {
  /** 쟁점별 진실 판단 기록 */
  judgments: Record<string, PlayerJudgmentEntry>
  /** 증거별 감별 기록 */
  appraisals: Record<string, EvidenceAppraisalEntry>
  /** 쟁점 가시성 상태 */
  disputeVisibility: Record<string, DisputeVisibilityEntry>
  /** 감정 실수 이벤트 로그 */
  emotionalSlips: EmotionalSlipEvent[]
  /** 발견한 진실 IDs (truthTable 기준) */
  discoveredTruths: string[]

  /** 진실 공방 대기 이벤트 (UI 모달 트리거) */
  pendingConfrontation: TruthConfrontationEvent | null
  /** 판단 충돌 대기 이벤트 (UI 모달 트리거) */
  pendingConflict: JudgmentConflictEvent | null
  /** 숨겨진 쟁점 발현 대기 이벤트 */
  pendingEmergence: { disputeId: string; route: EmergenceRoute['type']; description: string } | null
  /** 감정 실수 대기 이벤트 */
  pendingSlip: EmotionalSlipEvent | null
}

// ─────────────────────────────────────────
// 6. PlayerAction 확장
// ─────────────────────────────────────────

/** 기존 PlayerAction 타입에 추가될 신규 액션 */
export type DiscoveryAction =
  | { type: 'truth_confrontation'; disputeId: string; judgment: TruthJudgment }
  | { type: 'revise_judgment'; disputeId: string; newJudgment: TruthJudgment }
  | { type: 'evidence_appraisal'; evidenceId: string; verdict: AppraisalVerdict; partialDetails?: PartialTrustDetail[] }
  | { type: 'acknowledge_emergence'; disputeId: string }
  | { type: 'acknowledge_slip'; accept: boolean }
