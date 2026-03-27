import { useMemo } from 'react'
import { getPlayerStats } from '../../data/leaderboard'
import { getCurrentSeason } from '../../data/seasons'

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부', neighbor: '이웃', boss_employee: '직장',
  partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
}

const CATEGORY_LABELS: Record<string, string> = {
  insight: '통찰', authority: '권위', wisdom: '지혜', total: '종합',
}

export default function StatsPanel() {
  const season = getCurrentSeason()
  const stats = useMemo(() => getPlayerStats(season.id), [season.id])
  const allStats = useMemo(() => getPlayerStats(), [])

  if (allStats.totalGames === 0) {
    return <div className="text-center text-gray-600 text-xs py-8">통계를 표시하려면 먼저 사건을 플레이하세요.</div>
  }

  const maxAxis = 100

  return (
    <div className="space-y-4">
      {/* 레이더 차트 (심플 바 차트로 대체) */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 mb-3">역량 분석 (이번 시즌)</h4>
        {stats.totalGames === 0 ? (
          <div className="text-xs text-gray-600">이번 시즌 기록 없음</div>
        ) : (
          <div className="space-y-2">
            {[
              { label: '통찰', value: stats.avgInsight, color: 'bg-blue-500' },
              { label: '권위', value: stats.avgAuthority, color: 'bg-amber-500' },
              { label: '지혜', value: stats.avgWisdom, color: 'bg-emerald-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-300 font-bold">{item.value}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${(item.value / maxAxis) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 강점/약점 */}
      <div className="flex gap-2">
        <div className="flex-1 bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-3">
          <div className="text-xs text-emerald-400 font-bold mb-1">강점</div>
          <div className="text-sm text-emerald-300">{CATEGORY_LABELS[allStats.strongestCategory]}</div>
        </div>
        <div className="flex-1 bg-red-950/30 border border-red-800/30 rounded-lg p-3">
          <div className="text-xs text-red-400 font-bold mb-1">약점</div>
          <div className="text-sm text-red-300">{CATEGORY_LABELS[allStats.weakestCategory]}</div>
        </div>
      </div>

      {/* 요약 수치 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-amber-400">{allStats.totalGames}</div>
          <div className="text-xs text-gray-500">총 판결</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-gray-200">{allStats.avgScore}</div>
          <div className="text-xs text-gray-500">평균 점수</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-amber-400">{allStats.bestScore}</div>
          <div className="text-xs text-gray-500">최고 점수</div>
        </div>
      </div>

      {/* 관계 유형별 성적 */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 mb-3">관계 유형별 성적</h4>
        <div className="space-y-1.5">
          {Object.entries(allStats.byRelationship).sort((a, b) => b[1].avgScore - a[1].avgScore).map(([rt, data]) => (
            <div key={rt} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{RELATION_LABELS[rt] ?? rt}</span>
                <span className="text-xs text-gray-500">{data.count}회</span>
              </div>
              <span className={`text-xs font-bold ${data.avgScore >= 75 ? 'text-amber-400' : data.avgScore >= 50 ? 'text-gray-300' : 'text-gray-500'}`}>
                평균 {data.avgScore}점
              </span>
            </div>
          ))}
          {Object.keys(allStats.byRelationship).length === 0 && (
            <div className="text-xs text-gray-600">기록 없음</div>
          )}
        </div>
      </div>
    </div>
  )
}
