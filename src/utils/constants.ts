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

/**
 * Phase 순서 — Phase 3/4/5를 통합 심문(Phase3)으로 병합.
 * Phase4_Evidence, Phase5_ReExamination은 enum에 남아 있지만 흐름에서 제외.
 * Phase3 → Phase6(조정) → Phase7(판결)로 직행.
 */
export const PHASE_ORDER: GamePhase[] = [
  GamePhase.Phase0_CaseIntro,
  GamePhase.Phase1_InitialStatement,
  GamePhase.Phase2_Rebuttal,
  GamePhase.Phase3_Interrogation,
  GamePhase.Phase6_Mediation,
  GamePhase.Phase7_Verdict,
  GamePhase.Result,
]

/** @deprecated Phase 통합으로 미사용 — readinessEngine 참조 */
export const MIN_TURNS_BEFORE_ADVANCE: Record<string, number> = {
  [GamePhase.Phase3_Interrogation]: 10,
}

/**
 * 최대 턴 수 — readinessEngine.MAX_INTERROGATION_TURNS(16)이 기준.
 * 기존 코드 호환을 위해 유지하되, 값은 16으로 맞춤.
 */
export const MAX_TURNS = 16
