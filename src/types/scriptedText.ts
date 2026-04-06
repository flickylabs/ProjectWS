import type { PartyId } from './game'

export const SCRIPTED_TEXT_SCHEMA_VERSION = 1 as const

export const SCRIPTED_LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'] as const
export type ScriptedLieState = typeof SCRIPTED_LIE_STATES[number]

export const SCRIPTED_LIE_BANDS = ['early', 'mid', 'late'] as const
export type ScriptedLieBand = typeof SCRIPTED_LIE_BANDS[number]

export const SCRIPTED_INTERROGATION_QUESTION_TYPES = [
  'fact_pursuit',
  'motive_search',
  'empathy_approach',
] as const
export type ScriptedInterrogationQuestionType = typeof SCRIPTED_INTERROGATION_QUESTION_TYPES[number]

export const SCRIPTED_SUBJECT_ROLES = ['self', 'other', 'both', 'institutional'] as const
export type ScriptedSubjectRole = typeof SCRIPTED_SUBJECT_ROLES[number]

export const SCRIPTED_WITNESS_DEPTHS = ['vague', 'partial', 'full'] as const
export type ScriptedWitnessDepth = typeof SCRIPTED_WITNESS_DEPTHS[number]

export const SCRIPTED_STANCE_HINTS = [
  'deny',
  'hedge',
  'partial',
  'blame',
  'emotional',
  'confess',
  'answer',
] as const
export type ScriptedStanceHint = typeof SCRIPTED_STANCE_HINTS[number]

export const SCRIPTED_TRUTH_LEVELS = ['none', 'hint', 'partial', 'full'] as const
export type ScriptedTruthLevel = typeof SCRIPTED_TRUTH_LEVELS[number]

export interface ScriptedVariant {
  id: string
  text: string
  behaviorHint: string
  tags?: string[]
  sourceRefs?: string[]
}

export interface ScriptedInterrogationEntry {
  key: string
  party: PartyId
  disputeId: string
  lieState: ScriptedLieState
  questionType: ScriptedInterrogationQuestionType
  stanceHint?: ScriptedStanceHint
  truthLevel?: ScriptedTruthLevel
  variants: ScriptedVariant[]
}

export interface ScriptedEvidencePresentEntry {
  key: string
  party: PartyId
  evidenceId: string
  lieBand: ScriptedLieBand
  subjectRole: ScriptedSubjectRole
  stanceHint?: ScriptedStanceHint
  truthLevel?: ScriptedTruthLevel
  variants: ScriptedVariant[]
}

export interface ScriptedDossierEntry {
  key: string
  party: PartyId
  dossierQuestionId: string
  lieBand: ScriptedLieBand
  stanceHint?: ScriptedStanceHint
  truthLevel?: ScriptedTruthLevel
  variants: ScriptedVariant[]
}

export interface ScriptedWitnessEntry {
  key: string
  witnessId: string
  depth: ScriptedWitnessDepth
  stanceHint?: ScriptedStanceHint
  truthLevel?: ScriptedTruthLevel
  variants: ScriptedVariant[]
}

export interface ScriptedAftermathEntry {
  key: string
  resultClass: string
  variants: ScriptedVariant[]
}

export interface ScriptedSystemMessageEntry {
  key: string
  context: string
  eventType: string
  variants: ScriptedVariant[]
}

export interface ScriptedCoverageManifest {
  interrogation: {
    parties: PartyId[]
    disputes: string[]
    lieStates: ScriptedLieState[]
    questionTypes: ScriptedInterrogationQuestionType[]
    variantsPerKey: number
  }
  evidence_present: {
    parties: PartyId[]
    evidenceIds: string[]
    lieBands: ScriptedLieBand[]
    variantsPerKey: number
  }
  dossier: {
    parties: PartyId[]
    questionIds: string[]
    lieBands: ScriptedLieBand[]
    variantsPerKey: number
  }
  witness: {
    witnessIds: string[]
    depths: ScriptedWitnessDepth[]
    variantsPerKey: number
  }
  aftermath: {
    resultClasses: string[]
    variantsPerKey: number
  }
  system_message: {
    keys: Array<{ context: string; eventType: string }>
    variantsPerKey: number
  }
}

export interface ScriptedTextBundle {
  schemaVersion: typeof SCRIPTED_TEXT_SCHEMA_VERSION
  caseId: string
  generatedAt: string
  notes?: string[]
  coverage: ScriptedCoverageManifest
  channels: {
    interrogation: {
      entries: ScriptedInterrogationEntry[]
    }
    evidence_present: {
      entries: ScriptedEvidencePresentEntry[]
    }
    dossier: {
      entries: ScriptedDossierEntry[]
    }
    witness: {
      entries: ScriptedWitnessEntry[]
    }
    aftermath: {
      entries: ScriptedAftermathEntry[]
    }
    system_message: {
      entries: ScriptedSystemMessageEntry[]
    }
  }
}

export function toScriptedLieBand(lieState: ScriptedLieState): ScriptedLieBand {
  if (lieState === 'S0' || lieState === 'S1') return 'early'
  if (lieState === 'S2' || lieState === 'S3') return 'mid'
  return 'late'
}

export function buildInterrogationKey(input: {
  party: PartyId
  disputeId: string
  lieState: ScriptedLieState
  questionType: ScriptedInterrogationQuestionType
}): string {
  return [input.party, input.disputeId, input.lieState, input.questionType].join('|')
}

export function buildEvidencePresentKey(input: {
  party: PartyId
  evidenceId: string
  lieBand: ScriptedLieBand
  subjectRole: ScriptedSubjectRole
}): string {
  return [input.party, input.evidenceId, input.lieBand, input.subjectRole].join('|')
}

export function buildDossierKey(input: {
  party: PartyId
  dossierQuestionId: string
  lieBand: ScriptedLieBand
}): string {
  return [input.party, input.dossierQuestionId, input.lieBand].join('|')
}

export function buildWitnessKey(input: {
  witnessId: string
  depth: ScriptedWitnessDepth
}): string {
  return [input.witnessId, input.depth].join('|')
}

export function buildAftermathKey(input: { resultClass: string }): string {
  return input.resultClass
}

export function buildSystemMessageKey(input: {
  context: string
  eventType: string
}): string {
  return [input.context, input.eventType].join('|')
}
