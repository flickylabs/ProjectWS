import type { ExtendedHistoryEntry, HallOfFameEntry, SortCategory, LocalPlayerProfile } from '../types'
import { getSeasonForDate, getCurrentSeason } from './seasons'
import { deriveJudgeProfile } from '../engine/judgeProfileEngine'
import type { JudgeProfile, JudgeCaseTelemetryLite } from '../engine/judgeProfileEngine'

const HISTORY_KEY = 'solomon-history'
const PROFILE_KEY = 'solomon-profile'
const HOF_KEY = 'solomon-hall-of-fame'
const JUDGE_PERKS_KEY = 'solomon-judge-perks'
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

// ── 재판관 퍼크 저장/로드 ──

export function saveJudgePerks(major: string | null, minor: string | null): void {
  localStorage.setItem(JUDGE_PERKS_KEY, JSON.stringify({ major, minor }))
}

export function loadJudgePerks(): { major: string | null; minor: string | null } {
  try {
    const raw = localStorage.getItem(JUDGE_PERKS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { major: parsed.major ?? null, minor: parsed.minor ?? null }
    }
  } catch { /* ignore */ }
  return { major: null, minor: null }
}

// ── 재판관 성향 프로필 ──

export function getJudgeProfile(): JudgeProfile {
  const history = loadExtendedHistory()
  const telemetryEntries: JudgeCaseTelemetryLite[] = history
    .filter(e => e.caseTelemetry != null)
    .map(e => ({
      caseId: e.caseId,
      inquiry: e.caseTelemetry!.inquiry,
      judgment: e.caseTelemetry!.judgment,
      resolution: e.caseTelemetry!.resolution,
      date: e.date,
    }))
  const savedPerks = loadJudgePerks()
  return deriveJudgeProfile(telemetryEntries, {
    major: savedPerks.major as any,
    minor: savedPerks.minor as any,
  })
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
