/**
 * 칭호 시스템.
 * 판결 결과에 따라 특수 칭호를 부여한다.
 */
import type { VerdictScore, VerdictInput } from '../types'

export interface Title {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface TitleCondition {
  title: Title
  check: (score: VerdictScore, input: VerdictInput, meta: TitleCheckMeta) => boolean
}

interface TitleCheckMeta {
  turnsUsed: number
  evidencePresented: number
  trustActionsUsed: number
  skillsUsed: number
  collapsedDisputes: number
  totalDisputes: number
  /** 100% 클리어 달성률 (0~100) */
  clearancePercent?: number
  /** 조합 달성 수 (자동+수동) */
  combinationsCompleted?: number
  /** 총 조합 가능 수 */
  combinationsTotal?: number
  /** 증인 depth 3 도달 수 */
  witnessDepth3Count?: number
  /** 미니게임 총 성공 수 */
  minigameSuccessTotal?: number
}

const TITLES: TitleCondition[] = [
  {
    title: { id: 'perfect-judge', name: '완벽한 판결', description: '통찰/권위/지혜 모두 80점 이상', icon: '👑', rarity: 'legendary' },
    check: (s) => s.insight >= 80 && s.authority >= 80 && s.wisdom >= 80,
  },
  {
    title: { id: 'truth-seeker', name: '진실 추적자', description: '통찰 90점 이상', icon: '🔍', rarity: 'epic' },
    check: (s) => s.insight >= 90,
  },
  {
    title: { id: 'wise-solomon', name: '솔로몬의 지혜', description: '지혜 90점 이상', icon: '💡', rarity: 'epic' },
    check: (s) => s.wisdom >= 90,
  },
  {
    title: { id: 'iron-judge', name: '철의 재판관', description: '권위 90점 이상', icon: '⚖️', rarity: 'epic' },
    check: (s) => s.authority >= 90,
  },
  {
    title: { id: 'speed-trial', name: '신속 재판', description: '10턴 이내에 판결', icon: '⚡', rarity: 'rare' },
    check: (_s, _i, m) => m.turnsUsed <= 10,
  },
  {
    title: { id: 'trust-builder', name: '신뢰의 판사', description: '신뢰 행동 3회 이상 사용', icon: '🤝', rarity: 'rare' },
    check: (_s, _i, m) => m.trustActionsUsed >= 3,
  },
  {
    title: { id: 'full-collapse', name: '완전 붕괴', description: '모든 쟁점의 거짓말을 붕괴', icon: '💥', rarity: 'rare' },
    check: (_s, _i, m) => m.collapsedDisputes >= m.totalDisputes && m.totalDisputes > 0,
  },
  {
    title: { id: 'evidence-master', name: '증거의 달인', description: '모든 증거를 제시', icon: '📄', rarity: 'rare' },
    check: (_s, _i, m) => m.evidencePresented >= 5,
  },
  {
    title: { id: 'no-skill', name: '맨손의 재판관', description: '스킬 사용 없이 판결', icon: '✋', rarity: 'rare' },
    check: (_s, _i, m) => m.skillsUsed === 0,
  },
  {
    title: { id: 'merciful', name: '자비로운 판결', description: '모든 해결책을 온건하게 선택', icon: '🕊️', rarity: 'common' },
    check: (_s, i) => i.selectedSolutions.length >= 3,
  },
  {
    title: { id: 'cautious', name: '신중한 판단', description: '1개 이상 쟁점을 보류', icon: '🤔', rarity: 'common' },
    check: (_s, i) => Object.values(i.factFindings).some((v) => v === 'pending'),
  },
  {
    title: { id: 'dirty-hands', name: '더러운 손', description: '위법 증거를 판결 근거로 사용', icon: '🧤', rarity: 'common' },
    check: (_s, i) => Object.values(i.evidenceLegality).some((v) => v === true),
  },
  // ── 100% 클리어 + 조합 칭호 (V5) ──
  {
    title: { id: 'perfect-clearance', name: '완벽한 재판관', description: '100% 달성률로 클리어', icon: '🏆', rarity: 'legendary' },
    check: (_s, _i, m) => (m.clearancePercent ?? 0) >= 100,
  },
  {
    title: { id: 'evidence-weaver', name: '증거의 직조자', description: '모든 조합을 발견', icon: '🔗', rarity: 'epic' },
    check: (_s, _i, m) => (m.combinationsTotal ?? 0) > 0 && (m.combinationsCompleted ?? 0) >= (m.combinationsTotal ?? 0),
  },
  {
    title: { id: 'deep-listener', name: '깊은 경청자', description: '모든 증인의 핵심 증언을 청취', icon: '👂', rarity: 'epic' },
    check: (_s, _i, m) => (m.witnessDepth3Count ?? 0) >= 3,
  },
  {
    title: { id: 'minigame-master', name: '법정의 만능인', description: '미니게임 15회 모두 성공', icon: '🎮', rarity: 'legendary' },
    check: (_s, _i, m) => (m.minigameSuccessTotal ?? 0) >= 15,
  },
  {
    title: { id: 'resource-master', name: '자원의 달인', description: '모든 토큰을 1개 이상 잔여로 판결', icon: '💎', rarity: 'rare' },
    check: (_s, _i, m) => m.skillsUsed >= 1 && m.trustActionsUsed >= 1 && m.evidencePresented >= 5,
  },
]

export function evaluateTitles(
  score: VerdictScore,
  input: VerdictInput,
  meta: TitleCheckMeta,
): Title[] {
  return TITLES
    .filter((t) => t.check(score, input, meta))
    .map((t) => t.title)
}

// 칭호 저장
const TITLES_STORAGE_KEY = 'solomon-titles'

export function loadUnlockedTitles(): string[] {
  try {
    const raw = localStorage.getItem(TITLES_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUnlockedTitles(titleIds: string[]) {
  const existing = loadUnlockedTitles()
  const merged = [...new Set([...existing, ...titleIds])]
  localStorage.setItem(TITLES_STORAGE_KEY, JSON.stringify(merged))
}
