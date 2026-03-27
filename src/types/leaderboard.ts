export interface ExtendedHistoryEntry {
  caseId: string
  score: number
  insight: number
  authority: number
  wisdom: number
  date: string
  relationshipType: string
  nameA: string
  nameB: string
  seasonId: string
  playerId: string
  playerName: string
  titles: string[]
  campaignStage?: number
}

export interface Season {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
}

export interface LocalPlayerProfile {
  playerId: string
  playerName: string
  region: string
  createdAt: string
}

export type SortCategory = 'total' | 'insight' | 'authority' | 'wisdom'

export interface LeaderboardFilter {
  seasonId: string
  sortBy: SortCategory
  relationshipType?: string
}

export interface HallOfFameEntry {
  seasonId: string
  seasonName: string
  rank: number
  playerName: string
  score: number
  insight: number
  authority: number
  wisdom: number
  caseId: string
  date: string
}
