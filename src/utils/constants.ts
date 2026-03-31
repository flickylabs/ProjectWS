import { GamePhase, type Resources } from '../types'

export const INITIAL_RESOURCES: Resources = {
  investigationTokens: 6,   // 증거 조사(~3) + 증인(~1) + AI분석(1) + 여유(1)
  skillPoints: 5,
  courtControl: 3,
}

export const SKILL_COSTS: Record<string, { resource: keyof Resources; amount: number }> = {
  immediate_answer: { resource: 'skillPoints', amount: 1 },
  evasion_reading: { resource: 'skillPoints', amount: 1 },
}

export const SKILL_LIMITS: Record<string, number> = {
  immediate_answer: 1,
}

export const TRUST_THRESHOLDS = {
  voluntaryConfession: 70,
  confidentialAcceptance: 50,
  preDisclosureConsent: 60,
}

export const TRUST_DELTAS = {
  empathyQuestion: { trustTowardJudge: 12 },
  confidentialProtection: { trustTowardJudge: 20, fearOfExposure: -15 },
  separation: { retaliationWorry: -10 },
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
  [GamePhase.Phase3_Interrogation]: 10,
  [GamePhase.Phase4_Evidence]: 10,
  [GamePhase.Phase5_ReExamination]: 10,
}

/** 최대 턴 수 — 초과 시 자동으로 Phase6(중재안)으로 전환 */
export const MAX_TURNS = 20
