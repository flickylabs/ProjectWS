/**
 * BeatScript V2 — Phase 3 script selection schema
 * ------------------------------------------------
 * 목표:
 * 1) 기존 BeatScript 하위 호환 유지
 * 2) responseIntent + angleTag 2축 선택 지원
 * 3) 조건 분기 6축(afterEvidence / emotionTier / trustWindow / fatigue / interjection|trap / blockedVectors)
 * 4) red herring / misconception / fatigue / free question 대응
 *
 * repo 배치 권장:
 *   - src/types/beatScriptV2.ts 로 추가
 *   - src/types/index.ts 에 re-export
 *   - renewal.ts 의 BeatType 은 emotional 을 포함하도록 동기화
 */

import type { LieState } from './agent'
import type { PartyId } from './game'
import type { AttackVector, BeatScript, EmotionTier, QuestionType } from './renewal'

// 기존 BeatType은 deny|hedge|partial|blame|confession|evidence_hit 이지만
// 실제 transition 데이터에는 emotional 이 이미 등장하므로 V2에서 보정한다.
export type BeatTypeV2 = BeatScript['beatType'] | 'emotional'

export type ResponseIntent =
  | 'pressure_response'
  | 'motive_response'
  | 'rapport_response'
  | 'evidence_response'
  | 'fatigue_response'
  | 'trap_confusion_response'

export type AngleTag =
  | 'timeline'
  | 'motive'
  | 'responsibility'
  | 'identity'
  | 'context'
  | 'legality'
  | 'emotion'

export type IssueLayer = 'surface' | 'motive' | 'core'

export type IssueRole =
  | 'core_truth'
  | 'sub_truth'
  | 'red_herring'
  | 'shared_misconception'

export type BeliefMode = 'knows' | 'suspects' | 'misbelief' | 'weaponizes'

export type TrustWindowBand = 'closed' | 'narrow' | 'open'

export type FatigueLevel = 'fresh' | 'wary' | 'high' | 'exhausted'

export type InterjectionState =
  | 'none'
  | 'allow_last_turn'
  | 'block_last_turn'
  | 'cooldown'

export type TrapState = 'none' | 'suspected' | 'active' | 'clarified'

export type MisconceptionState = 'M0' | 'M1' | 'M2' | 'M3' | 'M4'

export type BeatActionFamily =
  | 'question'
  | 'evidence'
  | 'transition'
  | 'fatigue'
  | 'free_question'

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

export interface BeatScriptV2 extends Omit<BeatScript, 'beatType'> {
  /** 고유 ID (variant 단위) */
  id: string
  schemaVersion: 'beat_v2'

  /** V2에서 emotional 추가 */
  beatType: BeatTypeV2

  /** 쟁점의 깊이 */
  layer: IssueLayer

  /** 쟁점 역할 */
  issueRole: IssueRole

  /** selector 1축 */
  responseIntent: ResponseIntent

  /** selector 2축 */
  angleTag: AngleTag

  /** 어떤 액션에서 소모되는 비트인가 */
  actionFamily: BeatActionFamily

  /**
   * UI 질문 카드 3종과의 직접 연결.
   * evidence_present / empathy_approach 등 복수 허용.
   */
  questionTypes?: QuestionType[]

  /**
   * red_herring/shared_misconception일 때만 필수.
   * knows/suspects/misbelief/weaponizes
   */
  beliefMode?: BeliefMode

  /** 선택 조건 */
  conditions?: BeatScriptConditionsV2

  /**
   * Blueprint / AtomSelection 단계의 사실 제약과 연결.
   * - allowAtomIds: 이 대사가 말해도 되는 사실
   * - forbidAtomIds: 이 대사에 절대 섞이면 안 되는 사실
   */
  truthEnvelope?: BeatTruthEnvelope

  /** selection score의 기본값 */
  weight?: number

  /** lane 우선순위 내부 tie-breaker */
  priority?: number

  /** 동일 비트 재사용 쿨다운 */
  cooldownTurns?: number

  /** 사건당 최대 사용 횟수 */
  maxUsesPerCase?: number

  /** 같은 antiRepeatGroup은 연속 노출을 피함 */
  antiRepeatGroup?: string

  /** selector coverage 묶음 키 */
  coverageKey?: string

  /** hot/mid/cold 밀도 목표치 */
  variantTarget?: number

  /** 플래그 기반 상태 연결 */
  setFlags?: string[]
  clearFlags?: string[]

  /** free question / diagnostics / analytics용 */
  tags?: string[]
}

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

export function toTrustWindowBand(value: number): TrustWindowBand {
  if (value >= 60) return 'open'
  if (value >= 25) return 'narrow'
  return 'closed'
}
