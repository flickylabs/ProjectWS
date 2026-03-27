import { useState, useMemo } from 'react'
import { getHallOfFameForSeason } from '../../data/leaderboard'
import { getAllPastSeasons } from '../../data/seasons'

const MEDAL = ['', '🥇', '🥈', '🥉', '4th', '5th']

export default function HallOfFame() {
  const seasons = useMemo(() => getAllPastSeasons().reverse(), [])
  const [seasonId, setSeasonId] = useState(seasons[0]?.id ?? 's1')
  const entries = useMemo(() => getHallOfFameForSeason(seasonId), [seasonId])

  return (
    <div className="space-y-3">
      <select
        value={seasonId}
        onChange={e => setSeasonId(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300"
      >
        {seasons.map(s => (
          <option key={s.id} value={s.id}>{s.name}{s.isActive ? ' (진행중)' : ''}</option>
        ))}
      </select>

      {entries.length === 0 ? (
        <div className="text-center text-gray-600 text-xs py-8">명예의 전당 기록이 없습니다.</div>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => {
            const isTop3 = e.rank <= 3
            const borderColor = e.rank === 1 ? 'border-amber-600/50' : e.rank === 2 ? 'border-gray-400/50' : e.rank === 3 ? 'border-orange-600/50' : 'border-gray-700/50'
            return (
              <div key={e.rank} className={`border rounded-xl p-3 ${borderColor} ${isTop3 ? 'bg-gray-800/70' : 'bg-gray-800/30'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{MEDAL[e.rank]}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${e.rank === 1 ? 'text-amber-400' : 'text-gray-200'}`}>{e.playerName}</span>
                      <span className={`text-lg font-bold ${e.rank === 1 ? 'text-amber-400' : 'text-gray-300'}`}>{e.score}점</span>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-blue-400/60">통찰 {e.insight}</span>
                      <span className="text-xs text-amber-400/60">권위 {e.authority}</span>
                      <span className="text-xs text-emerald-400/60">지혜 {e.wisdom}</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1 block">{new Date(e.date).toLocaleDateString('ko')}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
