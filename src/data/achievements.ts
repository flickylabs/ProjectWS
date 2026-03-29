/**
 * 칭호/업적 시스템
 * 다양한 조건 달성 시 칭호 + 보상 지급
 * 수령 버튼 → 우편으로 보상 전달
 */

export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  category: 'beginner' | 'mastery' | 'collection' | 'special'
  reward: { type: 'invest' | 'skill'; amount: number }
  /** 달성 조건 체크 (localStorage 기반) */
  check: () => boolean
}

const ACHIEVEMENTS: Achievement[] = [
  // ── 입문 ──
  { id: 'first_login', title: '첫 발을 내딛다', description: '게임에 처음 접속', emoji: '👣', category: 'beginner', reward: { type: 'invest', amount: 2 }, check: () => true },
  { id: 'first_win', title: '첫 판결', description: '사건을 처음으로 해결', emoji: '⚖️', category: 'beginner', reward: { type: 'skill', amount: 2 }, check: () => getHistoryCount() >= 1 },
  { id: 'three_cases', title: '경험이 쌓이다', description: '3개의 사건 해결', emoji: '📚', category: 'beginner', reward: { type: 'invest', amount: 3 }, check: () => getHistoryCount() >= 3 },
  { id: 'ten_cases', title: '숙련 재판관', description: '10개의 사건 해결', emoji: '🏛️', category: 'beginner', reward: { type: 'skill', amount: 3 }, check: () => getHistoryCount() >= 10 },

  // ── 숙련 ──
  { id: 'perfect_score', title: '완벽한 판결', description: '3성(85점 이상) 달성', emoji: '⭐', category: 'mastery', reward: { type: 'invest', amount: 5 }, check: () => getBestScore() >= 85 },
  { id: 'triple_star_3', title: '별의 수집가', description: '3성을 3번 달성', emoji: '🌟', category: 'mastery', reward: { type: 'skill', amount: 3 }, check: () => getThreeStarCount() >= 3 },
  { id: 'insight_master', title: '통찰의 눈', description: '통찰 90점 이상', emoji: '🔍', category: 'mastery', reward: { type: 'invest', amount: 3 }, check: () => getBestAxis('insight') >= 90 },
  { id: 'authority_master', title: '법의 수호자', description: '권위 90점 이상', emoji: '⚖️', category: 'mastery', reward: { type: 'skill', amount: 3 }, check: () => getBestAxis('authority') >= 90 },
  { id: 'wisdom_master', title: '지혜의 현인', description: '지혜 90점 이상', emoji: '💡', category: 'mastery', reward: { type: 'invest', amount: 3 }, check: () => getBestAxis('wisdom') >= 90 },

  // ── 수집 ──
  { id: 'all_spouse', title: '가정법원 전문', description: '부부 사건 12개 모두 해결', emoji: '💑', category: 'collection', reward: { type: 'skill', amount: 5 }, check: () => getRelTypeCount('spouse') >= 12 },
  { id: 'all_workplace', title: '노동청 단골', description: '직장 사건 12개 모두 해결', emoji: '💼', category: 'collection', reward: { type: 'skill', amount: 5 }, check: () => getRelTypeCount('boss_employee') >= 12 },
  { id: 'all_types', title: '만능 재판관', description: '모든 관계 유형 최소 1건씩 해결', emoji: '🌈', category: 'collection', reward: { type: 'invest', amount: 10 }, check: () => getAllTypesPlayed() },
  { id: 'fifty_cases', title: '법정의 전설', description: '50개 사건 해결', emoji: '👑', category: 'collection', reward: { type: 'skill', amount: 10 }, check: () => getHistoryCount() >= 50 },

  // ── 특별 ──
  { id: 'daily_7', title: '성실한 재판관', description: '7일 연속 접속', emoji: '📅', category: 'special', reward: { type: 'invest', amount: 5 }, check: () => getConsecutiveDays() >= 7 },
  { id: 'all_evidence', title: '증거의 달인', description: '한 사건에서 증거 6개 모두 제시', emoji: '🗂️', category: 'special', reward: { type: 'invest', amount: 3 }, check: () => getMaxEvidencePresented() >= 6 },
]

// ── 헬퍼 함수 ──
function getHistoryCount(): number {
  try { return JSON.parse(localStorage.getItem('solomon-history') ?? '[]').length } catch { return 0 }
}

function getBestScore(): number {
  try {
    const history = JSON.parse(localStorage.getItem('solomon-history') ?? '[]')
    return Math.max(0, ...history.map((h: any) => h.score ?? 0))
  } catch { return 0 }
}

function getThreeStarCount(): number {
  try {
    const history = JSON.parse(localStorage.getItem('solomon-history') ?? '[]')
    return history.filter((h: any) => (h.score ?? 0) >= 85).length
  } catch { return 0 }
}

function getBestAxis(axis: string): number {
  try {
    const history = JSON.parse(localStorage.getItem('solomon-history') ?? '[]')
    return Math.max(0, ...history.map((h: any) => h[axis] ?? 0))
  } catch { return 0 }
}

function getRelTypeCount(relType: string): number {
  try {
    const history = JSON.parse(localStorage.getItem('solomon-history') ?? '[]')
    return new Set(history.filter((h: any) => h.relationshipType === relType).map((h: any) => h.caseId)).size
  } catch { return 0 }
}

function getAllTypesPlayed(): boolean {
  try {
    const history = JSON.parse(localStorage.getItem('solomon-history') ?? '[]')
    const types = new Set(history.map((h: any) => h.relationshipType))
    return ['spouse', 'neighbor', 'boss_employee', 'partnership', 'family', 'tenant_landlord', 'friend'].every(t => types.has(t))
  } catch { return false }
}

function getConsecutiveDays(): number {
  try {
    const raw = localStorage.getItem('solomon-login-streak')
    if (!raw) return 1
    const data = JSON.parse(raw)
    return data.streak ?? 1
  } catch { return 1 }
}

function getMaxEvidencePresented(): number {
  try { return Number(localStorage.getItem('solomon-max-evidence') ?? '0') } catch { return 0 }
}

// ── 공개 API ──

export function getAchievements(): Achievement[] { return ACHIEVEMENTS }

export function getClaimedIds(): string[] {
  try { return JSON.parse(localStorage.getItem('solomon-claimed-achievements') ?? '[]') } catch { return [] }
}

export function markClaimed(id: string): void {
  const claimed = getClaimedIds()
  if (!claimed.includes(id)) {
    claimed.push(id)
    localStorage.setItem('solomon-claimed-achievements', JSON.stringify(claimed))
  }
}

export function getAchievementStatus(): { total: number; unlocked: number; claimed: number } {
  const claimed = getClaimedIds()
  const unlocked = ACHIEVEMENTS.filter(a => a.check()).length
  return { total: ACHIEVEMENTS.length, unlocked, claimed: claimed.length }
}
