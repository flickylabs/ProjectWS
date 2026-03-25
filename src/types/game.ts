export enum GamePhase {
  Phase0_CaseIntro = 'phase0',
  Phase1_InitialStatement = 'phase1',
  Phase2_Rebuttal = 'phase2',
  Phase3_Interrogation = 'phase3',
  Phase4_Evidence = 'phase4',
  Phase5_ReExamination = 'phase5',
  Phase6_Mediation = 'phase6',
  Phase7_Verdict = 'phase7',
  Result = 'result',
}

export interface Resources {
  investigationTokens: number
  skillPoints: number
  courtControl: number
}

export interface VerdictInput {
  factFindings: Record<string, 'true' | 'false' | 'pending'>
  responsibility: Record<string, { a: number; b: number }>
  selectedSolutions: string[]
  evidenceLegality: Record<string, boolean>
}

export interface VerdictScore {
  insight: number
  authority: number
  wisdom: number
  total: number
}

export type PartyId = 'a' | 'b'
