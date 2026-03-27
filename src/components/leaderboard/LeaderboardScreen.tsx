import { useState } from 'react'
import { getCurrentSeason, getRemainingDays } from '../../data/seasons'
import { loadProfile } from '../../data/leaderboard'
import ScoreboardTab from './ScoreboardTab'
import HallOfFame from './HallOfFame'
import StatsPanel from './StatsPanel'
import PlayerProfile from './PlayerProfile'
import Emoji from '../common/Emoji'

type Tab = 'scoreboard' | 'halloffame' | 'stats'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'scoreboard', label: '스코어보드', icon: '🏆' },
  { id: 'halloffame', label: '명예의 전당', icon: '👑' },
  { id: 'stats', label: '통계', icon: '📊' },
]

interface Props {
  onClose: () => void
}

export default function LeaderboardScreen({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>('scoreboard')
  const [showProfile, setShowProfile] = useState(false)
  const [, setRefresh] = useState(0)

  const season = getCurrentSeason()
  const remaining = getRemainingDays()
  const profile = loadProfile()

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/95 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Emoji char="🏆" size={18} />
          <h2 className="text-sm font-bold text-amber-400">리더보드</h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white text-lg"><Emoji char="✕" size={16} /></button>
      </div>

      {/* 시즌 배너 */}
      <div className="px-4 py-2 bg-gradient-to-r from-amber-950/30 to-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400">{season.name}</span>
            <span className="text-xs text-gray-500 ml-2">{remaining}일 남음</span>
          </div>
          <button
            onClick={() => setShowProfile(true)}
            className="text-xs text-gray-400 hover:text-amber-400 bg-gray-800 px-2 py-1 rounded"
          >
            {profile.playerName}
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-800">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              tab === t.id
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Emoji char={t.icon} size={12} /> {t.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {tab === 'scoreboard' && <ScoreboardTab />}
        {tab === 'halloffame' && <HallOfFame />}
        {tab === 'stats' && <StatsPanel />}
      </div>

      {/* 닉네임 설정 모달 */}
      {showProfile && (
        <PlayerProfile
          onClose={() => setShowProfile(false)}
          onSave={() => setRefresh(n => n + 1)}
        />
      )}
    </div>
  )
}
