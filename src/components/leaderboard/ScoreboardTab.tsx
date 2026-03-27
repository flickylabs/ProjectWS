import { useState, useMemo } from 'react'
import type { SortCategory } from '../../types'
import { getLeaderboard } from '../../data/leaderboard'
import { getCurrentSeason, getAllPastSeasons } from '../../data/seasons'
import Emoji from '../common/Emoji'

const SORT_OPTIONS: { key: SortCategory; label: string; icon: string }[] = [
  { key: 'total', label: '종합', icon: '⚖️' },
  { key: 'insight', label: '통찰', icon: '🔍' },
  { key: 'authority', label: '권위', icon: '🏛️' },
  { key: 'wisdom', label: '지혜', icon: '💡' },
]

const RELATION_FILTERS: { key: string; label: string }[] = [
  { key: '', label: '전체' },
  { key: 'spouse', label: '부부' },
  { key: 'neighbor', label: '이웃' },
  { key: 'boss_employee', label: '직장' },
  { key: 'partnership', label: '동업' },
  { key: 'family', label: '가족' },
  { key: 'tenant_landlord', label: '세입자' },
  { key: 'friend', label: '친구' },
]

export default function ScoreboardTab() {
  const [sortBy, setSortBy] = useState<SortCategory>('total')
  const [relationFilter, setRelationFilter] = useState('')
  const [seasonId, setSeasonId] = useState(getCurrentSeason().id)

  const seasons = useMemo(() => getAllPastSeasons().reverse(), [])
  const entries = useMemo(
    () => getLeaderboard(seasonId, sortBy, relationFilter || undefined),
    [seasonId, sortBy, relationFilter],
  )

  const scoreKey = sortBy === 'total' ? 'score' : sortBy

  return (
    <div className="space-y-3">
      {/* 시즌 선택 */}
      <select
        value={seasonId}
        onChange={e => setSeasonId(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300"
      >
        {seasons.map(s => (
          <option key={s.id} value={s.id}>{s.name}{s.isActive ? ' (진행중)' : ''}</option>
        ))}
      </select>

      {/* 정렬 기준 */}
      <div className="flex gap-1">
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => setSortBy(opt.key)}
            className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${
              sortBy === opt.key ? 'bg-amber-600 text-gray-950 font-bold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Emoji char={opt.icon} size={12} /> {opt.label}
          </button>
        ))}
      </div>

      {/* 관계 유형 필터 */}
      <div className="flex gap-1 flex-wrap">
        {RELATION_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setRelationFilter(f.key)}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              relationFilter === f.key ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-500 hover:text-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 순위 목록 */}
      <div className="space-y-1.5">
        {entries.length === 0 ? (
          <div className="text-center text-gray-600 text-xs py-6">이 시즌의 기록이 없습니다.</div>
        ) : (
          entries.map((entry, i) => {
            const rank = i + 1
            const medalColor = rank === 1 ? 'text-amber-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-orange-400' : 'text-gray-600'
            const val = entry[scoreKey] as number
            return (
              <div key={i} className="flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2">
                <span className={`text-sm font-bold w-6 text-right ${medalColor}`}>{rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300 truncate">{entry.playerName}</span>
                    <span className="text-xs text-gray-600">{entry.nameA} vs {entry.nameB}</span>
                  </div>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-xs text-blue-400/50">통{entry.insight}</span>
                    <span className="text-xs text-amber-400/50">권{entry.authority}</span>
                    <span className="text-xs text-emerald-400/50">지{entry.wisdom}</span>
                  </div>
                </div>
                <span className={`text-sm font-bold ${val >= 75 ? 'text-amber-400' : val >= 50 ? 'text-gray-300' : 'text-gray-500'}`}>
                  {val}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
