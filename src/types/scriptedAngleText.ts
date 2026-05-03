import type { PartyId } from './game'
import type { ScriptedInterrogationQuestionType, ScriptedLieState, ScriptedVariant } from './scriptedText'

export interface ScriptedAngleUnlockCondition {
  defaultUnlocked?: boolean
  evidenceIds?: string[]
  witnessIds?: string[]
  notes?: string
}

export interface ScriptedAngleTruthBoundary {
  beforeS5MustNotSay?: string[]
  s5CanSay?: string[]
}

export interface ScriptedAngleDefinition {
  disputeId: string
  angleId: string
  label: string
  description: string
  keywords: string[]
  unlockCondition?: ScriptedAngleUnlockCondition
  truthBoundary?: ScriptedAngleTruthBoundary
}

export interface ScriptedAngleCatalogBundle {
  schemaVersion: number
  caseId: string
  sourceCaseId?: string
  angles: ScriptedAngleDefinition[]
}

export interface ScriptedAngleJudgeQuestionEntry {
  disputeId: string
  questionType: ScriptedInterrogationQuestionType | string
  targetParty?: PartyId
  angleId: string
  variants: ScriptedVariant[]
}

export interface ScriptedAngleJudgeQuestionsBundle {
  schemaVersion: number
  caseId: string
  sourceCaseId?: string
  judgeQuestions: ScriptedAngleJudgeQuestionEntry[]
}

export interface ScriptedAngleAnswerEntry {
  party: PartyId
  disputeId: string
  questionType: ScriptedInterrogationQuestionType | string
  angleId: string
  lieState: ScriptedLieState | string
  key?: string
  variants: ScriptedVariant[]
}

export interface ScriptedAngleAnswersBundle {
  schemaVersion: number
  caseId: string
  sourceCaseId?: string
  answers: ScriptedAngleAnswerEntry[]
}

export interface ScriptedAngleSpecialScriptsBundle {
  schemaVersion: number
  caseId: string
  sourceCaseId?: string
  confessions?: unknown[]
  s5RequestionResponses?: unknown[]
  postS5Requestions?: unknown[]
  interjections?: unknown[]
  emotionalOverload?: unknown[]
  trustAction?: unknown[]
  evidenceDiscovery?: unknown[]
  judgeEvidenceCombo?: unknown[]
  judgeWitnessSummon?: unknown[]
  dossierPrompts?: unknown[]
}
