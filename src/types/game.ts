export enum GamePhase {
  Phase0_CaseIntro = 'phase0',
  Phase1_InitialStatement = 'phase1',
  /** @deprecated PC 경로에서 미사용 — Phase1로 통합됨 */
  Phase2_Rebuttal = 'phase2',
  Phase3_Interrogation = 'phase3',
  /** @deprecated PHASE_ORDER에서 제외됨 */
  Phase4_Evidence = 'phase4',
  /** @deprecated PHASE_ORDER에서 제외됨 */
  Phase5_ReExamination = 'phase5',
  Phase6_Mediation = 'phase6',
  Phase7_Verdict = 'phase7',
  Result = 'result',
}

/**
 * 의도된 Phase 체계 alias.
 * 코드에서는 GamePhase enum 값을 직접 사용하되, 의미를 명확히 할 때 참조.
 *
 *   Phase 0: 브리핑     = Phase0_CaseIntro
 *   Phase 1: 사전진술   = Phase1_InitialStatement (선택지 포함, 구 Phase1+2 통합)
 *   Phase 2: 심문       = Phase3_Interrogation
 *   Phase 3a: 중재      = Phase6_Mediation
 *   Phase 3b: 판결      = Phase7_Verdict
 *   결과                = Result
 */
export const Phase = {
  Briefing: GamePhase.Phase0_CaseIntro,
  Pretrial: GamePhase.Phase1_InitialStatement,
  Interrogation: GamePhase.Phase3_Interrogation,
  Mediation: GamePhase.Phase6_Mediation,
  Verdict: GamePhase.Phase7_Verdict,
  Result: GamePhase.Result,
} as const

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

export type ClearanceCategory =
  | 'evidence'
  | 'combination'
  | 'witness'
  | 'interrogation'
  | 'dispute'

export interface ClearanceItem {
  id: string
  category: ClearanceCategory
  label: string
  achieved: boolean
  current: number
  target: number
}

export interface ClearanceResult {
  items: ClearanceItem[]
  achieved: number
  total: number
  percent: number
  missedConnections: { a: string; b: string; label: string }[]
}

export interface VerdictScore {
  insight: number
  authority: number
  wisdom: number
  total: number
  clearanceResult?: ClearanceResult
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
  combinationDossierUnlocked: number // 조합 DossierCard 해금 횟수
  counterQuestionUsed: number        // 반격 질문 사용 횟수
  bothSidesS3Plus: boolean           // 양쪽 NPC 모두 S3 이상 도달 여부
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
  interjectionAllowed: number    // 끼어들기 허용 횟수 (권위 -3/회)
  // v3: 재판관 성향 추적용
  effectiveFactCount: number       // fact_pursuit로 전이 발생 횟수
  effectiveEmpathyCount: number    // empathy_approach로 전이 발생 횟수
  factQuestionsAsked: number       // fact_pursuit 질문 횟수
  motiveQuestionsAsked: number     // motive_search 질문 횟수
  empathyQuestionsAsked: number    // empathy_approach 질문 횟수
  collapseViaTrustOrEmpathy: number  // 신뢰/공감 경로로 S5 도달
}
