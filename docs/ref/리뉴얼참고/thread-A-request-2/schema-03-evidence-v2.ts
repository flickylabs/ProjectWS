/**
 * Evidence V2 extension schema
 * ----------------------------
 * 목표:
 * - intent + role 병합
 * - bestAtStates / weakAtStates / preferredQuestionTypes 메타
 * - evidence timing critical window 계산
 */

import type { LieState } from './agent'
import type { EvidenceNode } from './case'
import type { AttackVector, QuestionType } from './renewal'

export type AngleTag =
  | 'timeline'
  | 'motive'
  | 'responsibility'
  | 'identity'
  | 'context'
  | 'legality'
  | 'emotion'

export type MisconceptionState = 'M0' | 'M1' | 'M2' | 'M3' | 'M4'

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

export interface EvidenceNodeV2 extends EvidenceNode {
  timing?: EvidenceTimingMetadata
}

export function getEvidenceTimingMultiplier(
  timing: EvidenceTimingMetadata | undefined,
  currentState: EvidenceTargetState,
  questionType?: QuestionType,
  angleTag?: AngleTag,
): number {
  if (!timing) return 1

  let score = 1

  if (timing.bestAtStates.includes(currentState)) score *= 1.35
  if (timing.weakAtStates?.includes(currentState)) score *= 0.7

  if (questionType && timing.preferredQuestionTypes?.includes(questionType)) {
    score *= 1.1
  }

  if (angleTag && timing.preferredAngles?.includes(angleTag)) {
    score *= 1.05
  }

  for (const window of timing.criticalWindows ?? []) {
    if (window.state === currentState) {
      score *= window.multiplier
    }
  }

  return Number(score.toFixed(2))
}
