/**
 * Evidence V2 확장 스키마
 * ─────────────────────────────────
 * intent + role 병합,
 * bestAtStates / weakAtStates / preferredQuestionTypes,
 * criticalWindows 계산.
 */

import type { LieState } from './agent'
import type { EvidenceNode } from './case'
import type { AttackVector, QuestionType } from './renewal'
import type { AngleTag, MisconceptionState } from './beatScriptV2'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Evidence 분류 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type EvidenceIntent =
  | 'expose'
  | 'contextualize'
  | 'corroborate'
  | 'disarm_trap'

export type EvidenceRole =
  | 'establish'
  | 'reframe'
  | 'impeach'
  | 'finish'

export type EvidenceTargetState = LieState | MisconceptionState

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Timing Metadata
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EvidenceCriticalWindow {
  disputeId: string
  state: EvidenceTargetState
  multiplier: number
  note: string
}

export interface EvidenceTimingMetadata {
  intent: EvidenceIntent
  role: EvidenceRole
  bestAtStates: EvidenceTargetState[]
  weakAtStates?: EvidenceTargetState[]
  preferredQuestionTypes?: QuestionType[]
  preferredAngles?: AngleTag[]
  blockedVectorsHelp?: AttackVector[]
  criticalWindows?: EvidenceCriticalWindow[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EvidenceNodeV2 — EvidenceNode 확장
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EvidenceNodeV2 extends EvidenceNode {
  timing?: EvidenceTimingMetadata
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타이밍 배율 계산
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getEvidenceTimingMultiplier(
  timing: EvidenceTimingMetadata | undefined,
  currentState: EvidenceTargetState,
  questionType?: QuestionType,
  angleTag?: AngleTag,
): number {
  if (!timing) return 1

  let score = 1

  // criticalWindow가 있으면 bestAtStates 보너스를 스킵 (이중 적용 방지)
  const hasCriticalMatch = timing.criticalWindows?.some(w => w.state === currentState)

  if (hasCriticalMatch) {
    for (const window of timing.criticalWindows!) {
      if (window.state === currentState) {
        score *= window.multiplier
      }
    }
  } else {
    if (timing.bestAtStates.includes(currentState)) score *= 1.35
    if (timing.weakAtStates?.includes(currentState)) score *= 0.7
  }

  if (questionType && timing.preferredQuestionTypes?.includes(questionType)) {
    score *= 1.1
  }

  if (angleTag && timing.preferredAngles?.includes(angleTag)) {
    score *= 1.05
  }

  return Number(score.toFixed(2))
}
