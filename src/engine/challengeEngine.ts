/**
 * 주간 판례 챌린지 엔진
 * - 시드 기반으로 모든 플레이어에게 동일한 사건 + 동일한 제약 조건 부여
 * - 결과 계산: 진실 정확도 > 실수 수 > 턴 효율 > 선택 일관성
 * - 티어: S/A/B/C/D
 */

export interface WeeklyChallenge {
  id: string
  weekStart: string  // ISO date (YYYY-MM-DD)
  caseId: string
  seed: number
  title: string
  description: string
  constraints: ChallengeConstraint[]
}

export interface ChallengeConstraint {
  type: 'max_evidence' | 'min_empathy' | 'max_turns' | 'no_skill' | 'single_target'
  value: number
  label: string  // UI display text
}

export type ChallengeTier = 'S' | 'A' | 'B' | 'C' | 'D'

export interface ChallengeResult {
  challengeId: string
  truthAccuracy: number    // 0-100
  mistakeCount: number
  turnEfficiency: number   // 0-100
  consistencyScore: number // 0-100
  totalScore: number       // weighted composite
  constraintsMet: boolean
  tier: ChallengeTier
  completedAt: string      // ISO datetime
}

export interface ChallengeMetrics {
  truthAccuracy: number
  mistakeCount: number
  turnsUsed: number
  totalTurns: number
  consistencyScore: number
  evidenceUsed: number
  empathyCount: number
  skillsUsed: number
  targetsQuestioned: number
}

const CHALLENGE_STORAGE_KEY = 'solomon-weekly-challenge'

/** 이번 주 챌린지 생성 (시드 기반 — 모든 플레이어 동일) */
export function generateWeeklyChallenge(weekStart: Date): WeeklyChallenge {
  const weekNum = getWeekNumber(weekStart)
  const seed = weekNum * 7919  // prime-based seed

  // 카테고리 순환
  const categories = ['spouse', 'family', 'friend', 'neighbor', 'partnership', 'tenant', 'workplace']
  const catIdx = weekNum % categories.length
  const caseNum = (seed % 12) + 1
  const caseId = `${categories[catIdx]}-${String(caseNum).padStart(2, '0')}`

  // 시드 기반 제약 조건 1~2개 선택
  const allConstraints: ChallengeConstraint[] = [
    { type: 'max_evidence', value: 2, label: '증거 2개만 사용' },
    { type: 'min_empathy', value: 2, label: '공감 접근 2회 이상' },
    { type: 'max_turns', value: 8, label: '8턴 내 판결' },
    { type: 'no_skill', value: 1, label: '스킬 사용 금지' },
    { type: 'single_target', value: 1, label: '한쪽만 심문' },
  ]
  const c1 = allConstraints[weekNum % allConstraints.length]
  const c2 = allConstraints[(weekNum + 3) % allConstraints.length]
  const constraints = c1.type !== c2.type ? [c1, c2] : [c1]

  return {
    id: `weekly-${weekNum}`,
    weekStart: weekStart.toISOString().slice(0, 10),
    caseId,
    seed,
    title: `제${weekNum}주 판례 챌린지`,
    description: `${caseId} 사건을 제한 조건 하에 해결하세요`,
    constraints,
  }
}

/** 현재 날짜 기준 이번 주 챌린지 */
export function getCurrentWeeklyChallenge(): WeeklyChallenge {
  const now = new Date()
  // 주 시작일 = 월요일
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.getFullYear(), now.getMonth(), diff)
  return generateWeeklyChallenge(monday)
}

/** 챌린지 결과 계산 */
export function computeChallengeResult(
  challenge: WeeklyChallenge,
  metrics: ChallengeMetrics,
): ChallengeResult {
  const turnEfficiency = Math.max(0, Math.round(
    (1 - metrics.turnsUsed / Math.max(metrics.totalTurns, 1)) * 100,
  ))

  // 제약 조건 충족 여부
  const constraintsMet = challenge.constraints.every(c => {
    switch (c.type) {
      case 'max_evidence': return metrics.evidenceUsed <= c.value
      case 'min_empathy': return metrics.empathyCount >= c.value
      case 'max_turns': return metrics.turnsUsed <= c.value
      case 'no_skill': return metrics.skillsUsed === 0
      case 'single_target': return metrics.targetsQuestioned <= 1
    }
  })

  // 가중 점수: 정확도 40% + 실수 25% + 턴효율 20% + 일관성 15% + 제약 충족 보너스
  const totalScore = Math.round(
    metrics.truthAccuracy * 0.4 +
    Math.max(0, 100 - metrics.mistakeCount * 15) * 0.25 +
    turnEfficiency * 0.2 +
    metrics.consistencyScore * 0.15 +
    (constraintsMet ? 10 : 0),
  )

  const tier: ChallengeTier =
    totalScore >= 90 ? 'S' :
    totalScore >= 75 ? 'A' :
    totalScore >= 60 ? 'B' :
    totalScore >= 40 ? 'C' : 'D'

  return {
    challengeId: challenge.id,
    truthAccuracy: metrics.truthAccuracy,
    mistakeCount: metrics.mistakeCount,
    turnEfficiency,
    consistencyScore: metrics.consistencyScore,
    totalScore,
    constraintsMet,
    tier,
    completedAt: new Date().toISOString(),
  }
}

/** localStorage에 챌린지 결과 저장 */
export function saveChallengeResult(result: ChallengeResult): void {
  try {
    const existing = loadChallengeResults()
    // 같은 챌린지의 기존 결과가 있으면 최고 점수만 유지
    const idx = existing.findIndex(r => r.challengeId === result.challengeId)
    if (idx >= 0) {
      if (result.totalScore > existing[idx].totalScore) {
        existing[idx] = result
      }
    } else {
      existing.push(result)
    }
    // 최근 52주(1년) 결과만 유지
    const trimmed = existing.slice(-52)
    localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    // localStorage 접근 실패 무시
  }
}

/** localStorage에서 챌린지 결과 목록 로드 */
export function loadChallengeResults(): ChallengeResult[] {
  try {
    const raw = localStorage.getItem(CHALLENGE_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ChallengeResult[]
  } catch {
    return []
  }
}

/** 특정 챌린지의 결과 조회 */
export function getChallengeResult(challengeId: string): ChallengeResult | null {
  return loadChallengeResults().find(r => r.challengeId === challengeId) ?? null
}

function getWeekNumber(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - start.getTime()
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))
}
