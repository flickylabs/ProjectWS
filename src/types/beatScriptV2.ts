/**
 * BeatScript V2 — Phase 3 스크립트 선택 스키마
 * ─────────────────────────────────
 * 기존 BeatScript 하위 호환 유지.
 * responseIntent + angleTag 2축 선택,
 * 조건 분기 6축, red herring / misconception 대응.
 */

import type { LieState } from './agent'
import type { PartyId } from './game'
import type { AttackVector, BeatScript, EmotionTier, QuestionType } from './renewal'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공유 열거형 — disputeV2, evidenceV2에서도 import
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type AngleTag =
  | 'timeline'
  | 'motive'
  | 'responsibility'
  | 'identity'
  | 'context'
  | 'legality'
  | 'emotion'

export type MisconceptionState = 'M0' | 'M1' | 'M2' | 'M3' | 'M4'

export type IssueRole =
  | 'core_truth'
  | 'sub_truth'
  | 'red_herring'
  | 'shared_misconception'

export type BeliefMode = 'knows' | 'suspects' | 'misbelief' | 'weaponizes'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BeatScript V2 전용 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 기존 BeatType에 emotional 추가 */
export type BeatTypeV2 = BeatScript['beatType']

export type ResponseIntent =
  | 'pressure_response'
  | 'motive_response'
  | 'rapport_response'
  | 'evidence_response'
  | 'fatigue_response'
  | 'trap_confusion_response'

export type IssueLayer = 'surface' | 'motive' | 'core'

export type TrustWindowBand = 'closed' | 'narrow' | 'open'

export type FatigueLevel = 'fresh' | 'wary' | 'high' | 'exhausted'

export type InterjectionState =
  | 'none'
  | 'allow_last_turn'
  | 'block_last_turn'
  | 'cooldown'

export type TrapState = 'none' | 'suspected' | 'active' | 'clarified'

export type BeatActionFamily =
  | 'question'
  | 'evidence'
  | 'transition'
  | 'fatigue'
  | 'free_question'
  | 'interjection'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 조건 + truthEnvelope
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface BeatScriptConditionsV2 {
  afterEvidenceIds?: string[]
  emotionTiers?: EmotionTier[]
  trustWindowBands?: TrustWindowBand[]
  fatigueLevels?: FatigueLevel[]
  interjectionStates?: InterjectionState[]
  trapStates?: TrapState[]
  misconceptionStates?: MisconceptionState[]
  blockedVectors?: AttackVector[]
  requiresFlags?: string[]
  forbidsFlags?: string[]
}

export interface BeatTruthEnvelope {
  allowAtomIds?: string[]
  forbidAtomIds?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BeatScriptV2 인터페이스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface BeatScriptV2 extends Omit<BeatScript, 'beatType'> {
  id: string
  schemaVersion: 'beat_v2'

  beatType: BeatTypeV2

  layer: IssueLayer
  issueRole: IssueRole

  /** selector 1축 */
  responseIntent: ResponseIntent
  /** selector 2축 */
  angleTag: AngleTag

  actionFamily: BeatActionFamily

  questionTypes?: QuestionType[]

  /** red_herring / shared_misconception 전용 */
  beliefMode?: BeliefMode

  conditions?: BeatScriptConditionsV2
  truthEnvelope?: BeatTruthEnvelope

  weight?: number
  priority?: number
  cooldownTurns?: number
  maxUsesPerCase?: number

  antiRepeatGroup?: string

  /** coverage 관리용 */
  coverageKey?: string
  variantTarget?: number

  /** 플래그 기반 상태 연결 */
  setFlags?: string[]
  clearFlags?: string[]

  tags?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Telemetry (디버깅/분석용)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface BeatSelectorTelemetry {
  selectedBeatId: string
  selectedCoverageKey?: string
  selectedScore: number
  lane: 'transition' | 'evidence_hit' | 'normal'
  responseIntent: ResponseIntent
  angleTag: AngleTag
  fatigueLevel: FatigueLevel
  trustWindowBand: TrustWindowBand
  debugNotes?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function toTrustWindowBand(value: number): TrustWindowBand {
  if (value >= 60) return 'open'
  if (value >= 25) return 'narrow'
  return 'closed'
}
