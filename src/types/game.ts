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

/** 심문 과정 메트릭 — 과정 점수 보너스에 사용 */
export interface ProcessMetrics {
  questionsAsked: number         // 질문 횟수
  lieTransitions: number         // 거짓말 상태 전이 횟수
  liesCollapsed: number          // S5 도달 횟수
  evidenceDiscovered: number     // 심문 중 발견한 증거
  evidenceEffective: number      // 전이를 일으킨 증거 제시
  skillsUsedEffective: number    // 효과적 스킬 사용 (전이 발생)
  freeQuestionsRelevant: number  // 쟁점에 적중한 자유 질문
  togglesUsed: number            // 토글 스킬 사용 (회피판독 + 비공개보호)
  bothSidesQuestioned: boolean   // 양측 모두 심문했는지
  confidentialUsed: number       // 비공개 보호 사용 횟수
  // v2: 상성/경로/품질 지표
  affinityHits: number           // 상성 맞는 액션 횟수 (best/good)
  affinityMisses: number         // 상성 안 맞는 액션 횟수 (weak/worst)
  requiredPathsCovered: number   // optimalPath.requiredActions 충족한 쟁점 수
  bonusPathsCovered: number      // optimalPath.bonusActions 충족 횟수
  deepTruthsUnlocked: number    // narrativeExpansion 해금 횟수
  sameActionRepeats: number      // 같은 쟁점에 같은 액션 3회+ 반복 횟수
  unsupportedCollapses: number   // hard evidence/trust 없이 S5 달성 (즉답요구 제외)
  immediateAnswerUsed: number    // 즉답요구로 S5 달성 횟수
  trustActionsUsed: number       // 신뢰 행동 사용 횟수
}
