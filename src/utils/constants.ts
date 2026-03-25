import { GamePhase, type Resources } from '../types'

export const INITIAL_RESOURCES: Resources = {
  investigationTokens: 3,
  skillPoints: 5,
  courtControl: 3,
}

export const SKILL_COSTS: Record<string, { resource: keyof Resources; amount: number }> = {
  immediate_answer: { resource: 'skillPoints', amount: 3 },
  cross_examination: { resource: 'skillPoints', amount: 2 },
  evasion_reading: { resource: 'skillPoints', amount: 1 },
  statement_comparison: { resource: 'skillPoints', amount: 1 },
  third_party_summon: { resource: 'investigationTokens', amount: 2 },
  order_warning: { resource: 'courtControl', amount: 1 },
  official_record: { resource: 'skillPoints', amount: 1 },
}

export const SKILL_LIMITS: Record<string, number> = {
  immediate_answer: 1,
  cross_examination: 2,
  statement_comparison: 3,
}

export const TRUST_THRESHOLDS = {
  voluntaryConfession: 70,
  confidentialAcceptance: 50,
  preDisclosureConsent: 60,
}

export const TRUST_DELTAS = {
  empathyQuestion: { trustTowardJudge: 12 },
  confidentialProtection: { trustTowardJudge: 20, fearOfExposure: -15 },
  interruptionBlock: { retaliationWorry: -10 },
  retaliationCheck: { retaliationWorry: -25 },
  emotionalStabilization: { trustTowardJudge: 8 },
  excessivePressure: { trustTowardJudge: -15 },
  sidingWithOpponent: { trustTowardJudge: -20 },
}

export const PHASE_ORDER: GamePhase[] = [
  GamePhase.Phase0_CaseIntro,
  GamePhase.Phase1_InitialStatement,
  GamePhase.Phase2_Rebuttal,
  GamePhase.Phase3_Interrogation,
  GamePhase.Phase4_Evidence,
  GamePhase.Phase5_ReExamination,
  GamePhase.Phase6_Mediation,
  GamePhase.Phase7_Verdict,
  GamePhase.Result,
]

export const MIN_TURNS_BEFORE_ADVANCE: Record<string, number> = {
  [GamePhase.Phase3_Interrogation]: 3,
  [GamePhase.Phase4_Evidence]: 1,
  [GamePhase.Phase5_ReExamination]: 2,
}
