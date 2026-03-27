import type { Season } from '../types'

const SEASON_EPOCH = new Date('2026-04-01T00:00:00+09:00').getTime()
const SEASON_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30일

function getSeasonNumber(timestamp: number): number {
  if (timestamp < SEASON_EPOCH) return 1
  return Math.floor((timestamp - SEASON_EPOCH) / SEASON_DURATION_MS) + 1
}

function buildSeason(num: number): Season {
  const start = SEASON_EPOCH + (num - 1) * SEASON_DURATION_MS
  const end = start + SEASON_DURATION_MS
  const now = Date.now()
  return {
    id: `s${num}`,
    name: `시즌 ${num}`,
    startDate: new Date(start).toISOString(),
    endDate: new Date(end).toISOString(),
    isActive: now >= start && now < end,
  }
}

export function getCurrentSeason(): Season {
  return buildSeason(getSeasonNumber(Date.now()))
}

export function getSeasonForDate(dateStr: string): Season {
  const ts = new Date(dateStr).getTime()
  return buildSeason(getSeasonNumber(ts))
}

export function getSeasonById(id: string): Season {
  const num = parseInt(id.replace('s', ''), 10) || 1
  return buildSeason(num)
}

export function getAllPastSeasons(): Season[] {
  const current = getSeasonNumber(Date.now())
  const seasons: Season[] = []
  for (let i = 1; i <= current; i++) {
    seasons.push(buildSeason(i))
  }
  return seasons
}

export function getRemainingDays(): number {
  const season = getCurrentSeason()
  const remaining = new Date(season.endDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)))
}
