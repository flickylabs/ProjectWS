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
  verdictDetail?: {
    factFindings: Record<string, string>
    responsibility: Record<string, { a: number; b: number }>
    selectedSolutions: string[]
    disputeNames: Record<string, string>
    aftermath?: string
  }
  caseTelemetry?: { inquiry: number; judgment: number; resolution: number }
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
  avatar?: string  // 이모지 또는 업로드된 이미지 URL
  avatarType?: 'emoji' | 'image'  // 아바타 유형
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
