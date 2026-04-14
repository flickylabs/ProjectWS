import type { ExtendedHistoryEntry, HallOfFameEntry, SortCategory, LocalPlayerProfile } from '../types'
import { getSeasonForDate, getCurrentSeason } from './seasons'
import {
  createDefaultProgressionState,
  migrateDriftToProgression,
  resolveTitle,
  computeTier,
  TITLE_LABELS,
  TIER_LABELS,
} from '../engine/judgeProgressionEngine'
import type { JudgeProgressionState } from '../engine/judgeProgressionEngine'
import { createDefaultTitleLevels, createDefaultLoadout } from '../engine/judgeTitleEngine'
// 하위 호환: 기존 소비자가 import하는 타입/함수를 re-export
import { deriveJudgeProfile, createDefaultDriftState, applyDriftUpdate } from '../engine/judgeProfileEngine'
import type { JudgeProfile, JudgeDriftState } from '../engine/judgeProfileEngine'
export { deriveJudgeProfile, applyDriftUpdate, createDefaultDriftState }
export type { JudgeProfile, JudgeDriftState }

const HISTORY_KEY = 'solomon-history'
const PROFILE_KEY = 'solomon-profile'
const HOF_KEY = 'solomon-hall-of-fame'
const JUDGE_PROGRESSION_KEY = 'solomon-judge-progression'
// Legacy keys (마이그레이션 후 제거 대상)
const LEGACY_PERKS_KEY = 'solomon-judge-perks'
const LEGACY_DRIFT_KEY = 'solomon-judge-drift'
const MAX_HISTORY = 100

// ── 프로필 ──

export function loadProfile(): LocalPlayerProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return createDefaultProfile()
}

export function saveProfile(profile: LocalPlayerProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

// 랜덤 닉네임 풀
const RANDOM_ADJECTIVES = ['공정한','현명한','냉철한','날카로운','온화한','단호한','침착한','민첩한','신중한','당당한','정직한','용감한','꼼꼼한','예리한','관대한']
const RANDOM_NOUNS = ['재판관','판사','심판관','조정자','중재인','법관','현자','탐정','분석가','조사관','검증자','감찰관','심리관','해결사','수호자']
const RANDOM_EMOJIS = ['⚖️','🦉','🏛️','📜','🔍','🎯','💡','🛡️','👨‍⚖️','👩‍⚖️','🦅','🌟','🔮','📖','🗡️','🌿']

function randomPick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function createDefaultProfile(): LocalPlayerProfile {
  const profile: LocalPlayerProfile = {
    playerId: crypto.randomUUID?.() ?? `p-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    playerName: `${randomPick(RANDOM_ADJECTIVES)} ${randomPick(RANDOM_NOUNS)}`,
    region: '서울',
    createdAt: new Date().toISOString(),
    avatar: randomPick(RANDOM_EMOJIS),
  }
  saveProfile(profile)
  return profile
}

export function ensureProfile(): LocalPlayerProfile {
  return loadProfile()
}

// ── 히스토리 (확장형) ──

export function loadExtendedHistory(): ExtendedHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as any[]
    return arr.map(migrateEntry)
  } catch { return [] }
}

export function saveExtendedHistory(entries: ExtendedHistoryEntry[]): void {
  const trimmed = entries.slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed))
}

export function addHistoryEntry(entry: ExtendedHistoryEntry): void {
  const history = loadExtendedHistory()
  history.unshift(entry)
  saveExtendedHistory(history)
  updateHallOfFame(entry)
}

/** 최근 기록에 후일담 추가 */
export function updateLatestAftermath(aftermath: string): void {
  const history = loadExtendedHistory()
  if (history.length > 0 && history[0].verdictDetail) {
    history[0].verdictDetail.aftermath = aftermath
    saveExtendedHistory(history)
  }
}

/** 기존 HistoryEntry → ExtendedHistoryEntry 마이그레이션 */
function migrateEntry(old: any): ExtendedHistoryEntry {
  if ('insight' in old && 'seasonId' in old) return old as ExtendedHistoryEntry
  const profile = loadProfile()
  const season = old.date ? getSeasonForDate(old.date) : getCurrentSeason()
  return {
    caseId: old.caseId ?? '',
    score: old.score ?? 0,
    insight: old.insight ?? Math.round((old.score ?? 0) * 0.34),
    authority: old.authority ?? Math.round((old.score ?? 0) * 0.33),
    wisdom: old.wisdom ?? Math.round((old.score ?? 0) * 0.33),
    date: old.date ?? new Date().toISOString(),
    relationshipType: old.relationshipType ?? '',
    nameA: old.nameA ?? 'A',
    nameB: old.nameB ?? 'B',
    seasonId: season.id,
    playerId: profile.playerId,
    playerName: profile.playerName,
    titles: old.titles ?? [],
  }
}

// ── 리더보드 조회 ──

export function getLeaderboard(
  seasonId?: string,
  sortBy: SortCategory = 'total',
  relationshipType?: string,
): ExtendedHistoryEntry[] {
  let entries = loadExtendedHistory()

  if (seasonId) {
    entries = entries.filter(e => e.seasonId === seasonId)
  }
  if (relationshipType) {
    entries = entries.filter(e => e.relationshipType === relationshipType)
  }

  const sortKey = sortBy === 'total' ? 'score' : sortBy
  entries.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number))

  return entries
}

// ── 통계 ──

export interface PlayerStats {
  totalGames: number
  avgScore: number
  avgInsight: number
  avgAuthority: number
  avgWisdom: number
  bestScore: number
  strongestCategory: SortCategory
  weakestCategory: SortCategory
  byRelationship: Record<string, { count: number; avgScore: number }>
}

export function getPlayerStats(seasonId?: string): PlayerStats {
  let entries = loadExtendedHistory()
  if (seasonId) entries = entries.filter(e => e.seasonId === seasonId)

  if (entries.length === 0) {
    return {
      totalGames: 0, avgScore: 0, avgInsight: 0, avgAuthority: 0, avgWisdom: 0,
      bestScore: 0, strongestCategory: 'total', weakestCategory: 'total',
      byRelationship: {},
    }
  }

  const sum = (key: keyof ExtendedHistoryEntry) =>
    entries.reduce((acc, e) => acc + (e[key] as number), 0)

  const avgInsight = Math.round(sum('insight') / entries.length)
  const avgAuthority = Math.round(sum('authority') / entries.length)
  const avgWisdom = Math.round(sum('wisdom') / entries.length)

  const categories: { key: SortCategory; val: number }[] = [
    { key: 'insight', val: avgInsight },
    { key: 'authority', val: avgAuthority },
    { key: 'wisdom', val: avgWisdom },
  ]
  categories.sort((a, b) => b.val - a.val)

  const byRelationship: Record<string, { count: number; avgScore: number }> = {}
  for (const e of entries) {
    const rt = e.relationshipType || 'unknown'
    if (!byRelationship[rt]) byRelationship[rt] = { count: 0, avgScore: 0 }
    byRelationship[rt].count++
    byRelationship[rt].avgScore += e.score
  }
  for (const rt of Object.keys(byRelationship)) {
    byRelationship[rt].avgScore = Math.round(byRelationship[rt].avgScore / byRelationship[rt].count)
  }

  return {
    totalGames: entries.length,
    avgScore: Math.round(sum('score') / entries.length),
    avgInsight, avgAuthority, avgWisdom,
    bestScore: Math.max(...entries.map(e => e.score)),
    strongestCategory: categories[0].key,
    weakestCategory: categories[categories.length - 1].key,
    byRelationship,
  }
}

// ── 재판관 진행 상태 저장/로드 (v3 재료 기반) ──

export function saveProgressionState(state: JudgeProgressionState): void {
  localStorage.setItem(JUDGE_PROGRESSION_KEY, JSON.stringify(state))
}

export function loadProgressionState(): JudgeProgressionState {
  try {
    const raw = localStorage.getItem(JUDGE_PROGRESSION_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.schemaVersion === 4) return parsed as JudgeProgressionState
      // v3 → v4 마이그레이션: 타이틀 시스템 추가 (기존 조각 보존)
      if (parsed.schemaVersion === 3) {
        const migrated: JudgeProgressionState = {
          ...parsed,
          titleLevels: createDefaultTitleLevels(),
          titleLoadout: createDefaultLoadout(),
          schemaVersion: 4,
        }
        saveProgressionState(migrated)
        return migrated
      }
    }
  } catch { /* ignore */ }

  // v2 드리프트 마이그레이션 시도
  try {
    const driftRaw = localStorage.getItem(LEGACY_DRIFT_KEY)
    if (driftRaw) {
      const drift = JSON.parse(driftRaw)
      if (drift.schemaVersion === 2) {
        const perksRaw = localStorage.getItem(LEGACY_PERKS_KEY)
        const perks = perksRaw
          ? JSON.parse(perksRaw)
          : { major: null, minor: null }
        const migrated = migrateDriftToProgression(drift, perks)
        saveProgressionState(migrated)
        return migrated
      }
    }
  } catch { /* ignore */ }

  return createDefaultProgressionState()
}

/** 하위 호환: 기존 코드에서 loadJudgePerks를 호출하는 곳을 위한 어댑터 */
export function loadJudgePerks(): { major: string | null; minor: string | null } {
  const state = loadProgressionState()
  return { major: state.equippedMajor, minor: state.equippedMinor }
}

/** 하위 호환: 기존 코드에서 saveJudgePerks를 호출하는 곳을 위한 어댑터 */
export function saveJudgePerks(major: string | null, minor: string | null): void {
  const state = loadProgressionState()
  state.equippedMajor = (major as JudgeProgressionState['equippedMajor'])
  state.equippedMinor = (minor as JudgeProgressionState['equippedMinor'])
  saveProgressionState(state)
}

/** 재판관 요약 프로필 (UI 표시용) */
export function getJudgeProgressionSummary() {
  const state = loadProgressionState()
  const titleId = resolveTitle(state.traits)
  const maxLevel = Math.max(
    ...Object.values(state.traits).map(t => t.level),
  )
  const tier = computeTier(state.casesCompleted, maxLevel)
  const titleLabel = TITLE_LABELS[titleId]
  const tierLabel = TIER_LABELS[tier]

  return {
    state,
    titleId,
    titleName: titleLabel.name,
    titleSubtitle: titleLabel.subtitle,
    tier,
    tierName: tierLabel.name,
    tierEmoji: tierLabel.emoji,
    maxLevel,
  }
}

// ── 하위 호환 어댑터: loadDriftState / saveDriftState / getJudgeProfile ──
// 기존 컴포넌트(VerdictScreen, PCVerdictScreen, PCResultScreen 등)가 사용

export function loadDriftState(): JudgeDriftState {
  const prog = loadProgressionState()
  // v3 traits → v2 drift 형식으로 변환
  function toLegacyAxis(negTrait: keyof typeof prog.traits, posTrait: keyof typeof prog.traits) {
    const neg = prog.traits[negTrait].level
    const pos = prog.traits[posTrait].level
    if (neg > pos) return { level: -neg, progress: 0 }
    if (pos > neg) return { level: pos, progress: 0 }
    return { level: 0, progress: 0 }
  }
  return {
    inquiry: toLegacyAxis('logical', 'intuitive'),
    judgment: toLegacyAxis('strict', 'lenient'),
    resolution: toLegacyAxis('principled', 'reconciling'),
    casesProcessed: prog.casesCompleted,
    lastUpdated: prog.lastUpdated,
    schemaVersion: 2,
  }
}

export function saveDriftState(state: JudgeDriftState): void {
  // v2 drift 저장 요청을 v3로 변환하여 저장
  const prog = loadProgressionState()
  function updateTraits(axis: { level: number }, negKey: keyof typeof prog.traits, posKey: keyof typeof prog.traits) {
    if (axis.level < 0) {
      prog.traits[negKey] = { level: Math.min(3, Math.abs(axis.level)) }
    } else if (axis.level > 0) {
      prog.traits[posKey] = { level: Math.min(3, axis.level) }
    }
  }
  updateTraits(state.inquiry, 'logical', 'intuitive')
  updateTraits(state.judgment, 'strict', 'lenient')
  updateTraits(state.resolution, 'principled', 'reconciling')
  prog.casesCompleted = state.casesProcessed
  prog.lastUpdated = new Date().toISOString()
  saveProgressionState(prog)
}

export function getJudgeProfile(): JudgeProfile {
  const prog = loadProgressionState()
  const titleId = resolveTitle(prog.traits)
  const titleLabel = TITLE_LABELS[titleId]
  const maxLevel = Math.max(...Object.values(prog.traits).map(t => t.level))
  const tier = computeTier(prog.casesCompleted, maxLevel)

  function traitToAxis(negKey: keyof typeof prog.traits, posKey: keyof typeof prog.traits): number {
    const neg = prog.traits[negKey].level
    const pos = prog.traits[posKey].level
    if (neg > pos) return -neg * 33
    if (pos > neg) return pos * 33
    return 0
  }

  return {
    inquiryAxis: traitToAxis('logical', 'intuitive'),
    judgmentAxis: traitToAxis('strict', 'lenient'),
    resolutionAxis: traitToAxis('principled', 'reconciling'),
    titleId,
    subtags: [],
    casesCompleted: prog.casesCompleted,
    tier: tier as any,
    majorPerk: prog.equippedMajor as any,
    minorPerk: prog.equippedMinor as any,
    isStabilized: maxLevel >= 1 && prog.casesCompleted >= 4,
  }
}

// ── 명예의 전당 ──

export function loadHallOfFame(): HallOfFameEntry[] {
  try {
    const raw = localStorage.getItem(HOF_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

function saveHallOfFame(entries: HallOfFameEntry[]): void {
  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
}

function updateHallOfFame(entry: ExtendedHistoryEntry): void {
  const hof = loadHallOfFame()
  const seasonEntries = hof.filter(h => h.seasonId === entry.seasonId)
  const others = hof.filter(h => h.seasonId !== entry.seasonId)

  const candidate: HallOfFameEntry = {
    seasonId: entry.seasonId,
    seasonName: `시즌 ${entry.seasonId.replace('s', '')}`,
    rank: 0,
    playerName: entry.playerName,
    score: entry.score,
    insight: entry.insight,
    authority: entry.authority,
    wisdom: entry.wisdom,
    caseId: entry.caseId,
    date: entry.date,
  }

  seasonEntries.push(candidate)
  seasonEntries.sort((a, b) => b.score - a.score)
  const top5 = seasonEntries.slice(0, 5).map((e, i) => ({ ...e, rank: i + 1 }))

  saveHallOfFame([...others, ...top5])
}

export function getHallOfFameForSeason(seasonId: string): HallOfFameEntry[] {
  return loadHallOfFame()
    .filter(h => h.seasonId === seasonId)
    .sort((a, b) => a.rank - b.rank)
}
