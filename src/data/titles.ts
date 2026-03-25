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
