/**
 * Dispute V2 extension schema
 * ---------------------------
 * 목표:
 * - surface / motive / core 3층 도입
 * - disputeKind / linkEdges / misconception state(M0~M4) 도입
 * - Phase 6 / Result용 structured log 전달
 */

import type { LieState } from './agent'
import type { Dispute } from './case'
import type { PartyId } from './game'

export type DisputeKind =
  | 'core_truth'
  | 'sub_truth'
  | 'red_herring'
  | 'shared_misconception'

export type DepthLayerId = 'surface' | 'motive' | 'core'

export type LinkEdgeType =
  | 'supports'
  | 'weakens_counter'
  | 'unlocks_layer'
  | 'retaliation'

export type BeliefMode = 'knows' | 'suspects' | 'misbelief' | 'weaponizes'

export type MisconceptionState = 'M0' | 'M1' | 'M2' | 'M3' | 'M4'

export interface DisputeLayerUnlockCondition {
  requireDisputes?: Array<{
    id: string
    minState: LieState | MisconceptionState
  }>
  requireEvidenceIds?: string[]
  requireFlags?: string[]
  requireResolvedLinks?: string[]
}

export interface DisputeDepthLayer {
  id: DepthLayerId
  label: string
  summary: string

  /**
   * 카드 UI는 "하단 펼침"을 기본으로 가정.
   * lockedSummary 는 카드가 접힌 상태에서 보이는 힌트 텍스트.
   */
  lockedSummary?: string
  unlockCondition?: DisputeLayerUnlockCondition

  /** 해당 층 완료 시 주로 열리는 atom / hook */
  revealAtomIds?: string[]

  /** 모바일 카드 연출 힌트 */
  uiStyle?: 'card_expand' | 'badge_stack' | 'relation_core'
}

export interface DisputeLinkEdge {
  id: string
  fromDisputeId: string
  toDisputeId: string
  type: LinkEdgeType

  /**
   * 사건당 총 3~5개, 쟁점당 최대 2개 권장.
   * from 쪽이 어느 정도 파였을 때 to 쪽에 영향이 간다.
   */
  when: {
    minState?: LieState
    minLayer?: DepthLayerId
    disproved?: boolean
    requireFlags?: string[]
  }

  effect: {
    unlockLayer?: DepthLayerId
    weakenCounterTags?: string[]
    supportBonus?: number
    retaliationAngleTag?: string
    grantFlag?: string
  }

  uiLabel?: string
}

export interface MisconceptionStage {
  state: MisconceptionState
  summary: string
  npcMode:
    | 'confused_defensive'
    | 'mistaken_certainty'
    | 'doubt_creeping'
    | 'clarifying'
    | 'clarified'
}

export interface MisconceptionProfile {
  beliefModeByParty: Partial<Record<PartyId, BeliefMode>>
  stages: MisconceptionStage[]
  trapSignals: string[]
  truthExitEvidenceIds: string[]
  clarifyOutcomeLabel?: string
}

export interface DisputeV2 extends Dispute {
  disputeKind?: DisputeKind
  depthLayers?: DisputeDepthLayer[]
  linkEdges?: DisputeLinkEdge[]
  misconception?: MisconceptionProfile
}

/**
 * Phase 3 → Phase 6 / Result bridge
 * transcript만 넘기지 말고 구조화 로그를 함께 넘긴다.
 */
export interface Phase3StructuredLog {
  revealedAtoms: string[]
  disprovedFakeIssues: string[]
  resolvedLinks: string[]
  relationCoreRevealed: boolean
  playerStyleTags: string[]
}
