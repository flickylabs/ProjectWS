/**
 * 액션 상성 기본 계수표 (lieMotive 기반)
 * GPT 확정 수치. personalityTags/contentTags로 ±0.05~0.10 보정.
 * 사건별 override는 case_meta DB에서 로드.
 */

export type ActionKey = 'fact_pursuit' | 'motive_search' | 'empathy_approach' | 'evidence_present' | 'separation' | 'confidential_protection'

export const BASE_AFFINITY: Record<string, Record<ActionKey, number>> = {
  self_protection:         { fact_pursuit: 1.20, motive_search: 0.95, empathy_approach: 0.75, evidence_present: 1.25, separation: 1.00, confidential_protection: 0.90 },
  face_saving:             { fact_pursuit: 0.85, motive_search: 1.20, empathy_approach: 0.90, evidence_present: 1.00, separation: 0.95, confidential_protection: 1.10 },
  shame_avoidance:         { fact_pursuit: 0.70, motive_search: 0.95, empathy_approach: 1.25, evidence_present: 0.90, separation: 1.00, confidential_protection: 1.25 },
  relationship_maintenance:{ fact_pursuit: 0.80, motive_search: 0.95, empathy_approach: 1.20, evidence_present: 0.85, separation: 0.95, confidential_protection: 1.20 },
  revenge:                 { fact_pursuit: 1.15, motive_search: 0.90, empathy_approach: 0.60, evidence_present: 1.10, separation: 0.95, confidential_protection: 0.80 },
  third_party_protection:  { fact_pursuit: 0.75, motive_search: 0.95, empathy_approach: 1.10, evidence_present: 0.85, separation: 1.20, confidential_protection: 1.30 },
  career_preservation:     { fact_pursuit: 1.05, motive_search: 0.95, empathy_approach: 0.70, evidence_present: 1.25, separation: 0.90, confidential_protection: 0.95 },
}

/**
 * 상성 점수 조회.
 * @returns 0.70~1.30 범위의 계수. 1.00이 기본.
 */
export function getAffinityScore(lieMotive: string, actionKey: ActionKey): number {
  const motiveScores = BASE_AFFINITY[lieMotive]
  if (!motiveScores) return 1.00
  return motiveScores[actionKey] ?? 1.00
}

/**
 * 상성 등급 판정 (스코어링용)
 * best: >= 1.20 → +2점
 * good: >= 1.05 → +1점
 * neutral: 0.85~1.04 → 0점
 * weak: 0.70~0.84 → -1점
 * worst: < 0.70 → -2점
 */
export function getAffinityGrade(score: number): 'best' | 'good' | 'neutral' | 'weak' | 'worst' {
  if (score >= 1.20) return 'best'
  if (score >= 1.05) return 'good'
  if (score >= 0.85) return 'neutral'
  if (score >= 0.70) return 'weak'
  return 'worst'
}

export function getAffinityPoints(grade: string): number {
  const points: Record<string, number> = { best: 2, good: 1, neutral: 0, weak: -1, worst: -2 }
  return points[grade] ?? 0
}

/**
 * action → trigger family 매핑
 * optimalPath의 상위 액션(fact_pursuit 등)을 lieConfig의 구체 트리거 패밀리에 매핑.
 * 실제 사건별 정확한 매핑은 GPT가 triggerMapping으로 제공.
 * 여기서는 폴백용 일반 패턴만 정의.
 */
export const ACTION_TRIGGER_FAMILIES: Record<string, string[]> = {
  fact_pursuit: ['direct_question', 'timeline_question', 'amount_question', 'location_question', 'fact_fixing'],
  motive_search: ['motive_question', 'context_question', 'reason_question', 'nonjudgmental_question'],
  empathy_approach: ['empathy_question', 'empathy', 'trust', 'emotional_question', 'confidential'],
  evidence_present: ['_presented', 'hard_evidence', 'soft_evidence'],
  separation: ['separation', 'retaliation'],
  confidential_protection: ['confidential', 'trust', 'private'],
}

/**
 * 주어진 액션이 lieConfig의 특정 트리거와 매칭되는지 검사
 */
export function doesActionMatchTrigger(actionKey: string, trigger: string): boolean {
  const family = ACTION_TRIGGER_FAMILIES[actionKey]
  if (!family) return false
  return family.some(pattern => trigger.includes(pattern) || pattern.includes(trigger))
}
