/**
 * Dispute V2 확장 스키마
 * ─────────────────────────────────
 * surface / motive / core 3층,
 * disputeKind / linkEdges / misconception state (M0~M4),
 * Phase 6/Result 구조화 로그.
 */

import type { LieState } from './agent'
import type { Dispute } from './case'
import type { PartyId } from './game'
import type {
  AngleTag,
  BeliefMode,
  IssueLayer,
  IssueRole,
  MisconceptionState,
} from './beatScriptV2'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DisputeKind — beatScriptV2.IssueRole의 alias
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type DisputeKind = IssueRole

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 층위 (Depth Layer)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type DepthLayerId = IssueLayer

export type LinkEdgeType =
  | 'supports'
  | 'weakens_counter'
  | 'unlocks_layer'
  | 'retaliation'

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
  lockedSummary?: string
  unlockCondition?: DisputeLayerUnlockCondition
  revealAtomIds?: string[]
  uiStyle?: 'card_expand' | 'badge_stack' | 'relation_core'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 쟁점 간 링크 (Link Edge)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DisputeLinkEdge {
  id: string
  fromDisputeId: string
  toDisputeId: string
  type: LinkEdgeType
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 가짜 쟁점 (Misconception)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DisputeV2 — Dispute 확장
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DisputeV2 extends Dispute {
  disputeKind?: DisputeKind
  depthLayers?: DisputeDepthLayer[]
  linkEdges?: DisputeLinkEdge[]
  misconception?: MisconceptionProfile
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 3 → Phase 6/Result 구조화 로그
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface Phase3StructuredLog {
  revealedAtoms: string[]
  disprovedFakeIssues: string[]
  resolvedLinks: string[]
  relationCoreRevealed: boolean
  playerStyleTags: string[]
}
