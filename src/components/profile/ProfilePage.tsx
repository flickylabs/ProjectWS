import { useState, useMemo } from 'react'
import { loadProfile, saveProfile, loadExtendedHistory, getPlayerStats } from '../../data/leaderboard'
import { loadCampaignProgress, CAMPAIGN_STAGES } from '../../data/campaign'
import Emoji from '../common/Emoji'

interface Props {
  onBack: () => void
}

// Reputation tiers
function getReputationTier(points: number): { label: string; color: string; next: number | null } {
  if (points >= 2000) return { label: '솔로몬', color: 'text-amber-300', next: null }
  if (points >= 1000) return { label: '원로', color: 'text-purple-400', next: 2000 }
  if (points >= 600) return { label: '숙련', color: 'text-blue-400', next: 1000 }
  if (points >= 300) return { label: '정식', color: 'text-emerald-400', next: 600 }
  if (points >= 100) return { label: '견습', color: 'text-yellow-400', next: 300 }
  return { label: '수습', color: 'text-gray-400', next: 100 }
}

function calculateReputation(history: ReturnType<typeof loadExtendedHistory>): number {
  return history.reduce((sum, e) => sum + Math.max(0, e.score), 0)
}

export default function ProfilePage({ onBack }: Props) {
  const [profile, setProfile] = useState(loadProfile())
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(profile.playerName)

  const history = useMemo(() => loadExtendedHistory(), [])
  const stats = useMemo(() => getPlayerStats(), [])
  const campaign = useMemo(() => loadCampaignProgress(), [])

  const reputation = useMemo(() => calculateReputation(history), [history])
  const tier = getReputationTier(reputation)

  const threeStarCount = useMemo(
    () => history.filter((h) => h.score >= 90).length,
    [history],
  )

  // Collect all unique titles
  const allTitles = useMemo(() => {
    const set = new Set<string>()
    for (const h of history) {
      if (h.titles) h.titles.forEach((t) => set.add(t))
    }
    return Array.from(set)
  }, [history])

  // Campaign chapter progress
  const chapterProgress = useMemo(() => {
    return CAMPAIGN_STAGES.map((stage) => ({
      stage: stage.stage,
      title: stage.title,
      unlocked: campaign.unlockedStages.includes(stage.stage),
      bestScore: campaign.stageScores[stage.stage] ?? null,
      minScore: stage.minScore,
    }))
  }, [campaign])

  const handleSaveName = () => {
    const trimmed = nameInput.trim() || '재판관'
    const updated = { ...profile, playerName: trimmed.slice(0, 8) }
    saveProfile(updated)
    setProfile(updated)
    setEditingName(false)
  }

  const maxAxis = 100

  return (
    <div
      className="h-[100dvh] bg-gray-950 text-gray-100 max-w-lg mx-auto flex flex-col font-[Pretendard]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-white text-sm transition-colors"
        >
          ← 뒤로
        </button>
        <h1 className="text-sm font-bold text-amber-400">프로필</h1>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Nickname */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">닉네임</div>
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={8}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button
                onClick={handleSaveName}
                disabled={nameInput.trim().length < 2}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-gray-950 font-bold hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setNameInput(profile.playerName)
                  setEditingName(false)
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">{profile.playerName}</span>
              <button
                onClick={() => setEditingName(true)}
                className="text-xs text-gray-500 hover:text-amber-400 transition-colors"
              >
                편집
              </button>
            </div>
          )}
        </div>

        {/* Reputation */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs text-gray-500">명성 등급</div>
              <div className={`text-lg font-bold ${tier.color}`}>{tier.label}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">명성 포인트</div>
              <div className="text-lg font-bold text-amber-400">
                {reputation.toLocaleString()}
              </div>
            </div>
          </div>
          {tier.next !== null && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>다음 등급까지</span>
                <span>{tier.next - reputation} 필요</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, (reputation / tier.next) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3-axis bar chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 font-semibold mb-3">3축 평균</div>
          {stats.totalGames === 0 ? (
            <div className="text-xs text-gray-600 text-center py-2">
              통계를 표시하려면 사건을 플레이하세요.
            </div>
          ) : (
            <div className="space-y-2.5">
              {[
                { label: '통찰', key: 'avgInsight' as const, value: stats.avgInsight, color: 'bg-blue-500' },
                { label: '권위', key: 'avgAuthority' as const, value: stats.avgAuthority, color: 'bg-amber-500' },
                { label: '지혜', key: 'avgWisdom' as const, value: stats.avgWisdom, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-gray-300 font-bold">{item.value}</span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${(item.value / maxAxis) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 font-semibold mb-3">통계</div>
          <div className="grid grid-cols-2 gap-2">
            <StatBox label="총 판결" value={`${stats.totalGames}회`} />
            <StatBox label="평균 점수" value={`${stats.avgScore}점`} />
            <StatBox label="최고 점수" value={`${stats.bestScore}점`} accent />
            <StatBox label="3성 클리어" value={`${threeStarCount}회`} accent />
          </div>
        </div>

        {/* Title collection */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 font-semibold mb-3">
            칭호 컬렉션 ({allTitles.length})
          </div>
          {allTitles.length === 0 ? (
            <div className="text-xs text-gray-600 text-center py-2">
              아직 획득한 칭호가 없습니다.
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {allTitles.map((title) => (
                <span
                  key={title}
                  className="text-xs bg-amber-900/30 text-amber-400 border border-amber-800/40 px-2 py-1 rounded-lg"
                >
                  {title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 업적/보상 수령 */}
        <AchievementSection />

        {/* Campaign chapter progress */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 font-semibold mb-3">챕터별 진행률</div>
          <div className="space-y-1.5">
            {chapterProgress.map((ch) => (
              <div
                key={ch.stage}
                className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
                  ch.unlocked ? 'bg-gray-800/40' : 'bg-gray-900/50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded ${
                      ch.bestScore !== null
                        ? 'bg-emerald-800 text-emerald-300'
                        : ch.unlocked
                          ? 'bg-amber-800/60 text-amber-300'
                          : 'bg-gray-800 text-gray-600'
                    }`}
                  >
                    {ch.stage}
                  </span>
                  <span className="text-xs text-gray-300">{ch.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {ch.bestScore !== null ? (
                    <>
                      <span className="text-xs text-emerald-400 font-bold">
                        {ch.bestScore}점
                      </span>
                      {ch.bestScore >= 90 && <Emoji char="⭐" size={12} />}
                    </>
                  ) : ch.unlocked ? (
                    <span className="text-xs text-gray-600">미완료</span>
                  ) : (
                    <Emoji char="🔒" size={12} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
      <div className={`text-lg font-bold ${accent ? 'text-amber-400' : 'text-gray-200'}`}>
        {value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

// ── 업적/보상 수령 섹션 ──
import { getAchievements, getClaimedIds, markClaimed, type Achievement } from '../../data/achievements'

function AchievementSection() {
  const [claimedIds, setClaimedIds] = useState(getClaimedIds())
  const achievements = getAchievements()

  const handleClaim = (ach: Achievement) => {
    markClaimed(ach.id)
    setClaimedIds([...claimedIds, ach.id])
    // 보상은 localStorage에 직접 지급 (우편 시스템 연동 시 mailApi 사용)
    const profile = JSON.parse(localStorage.getItem('solomon-profile') ?? '{}')
    alert(`🎉 "${ach.title}" 보상 수령!\n${ach.reward.type === 'invest' ? '🔍' : '⚡'} ×${ach.reward.amount}`)
  }

  const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
    beginner: { label: '입문', emoji: '🌱' },
    mastery: { label: '숙련', emoji: '🏆' },
    collection: { label: '수집', emoji: '📦' },
    special: { label: '특별', emoji: '✨' },
  }

  const grouped = achievements.reduce((acc, a) => { (acc[a.category] ??= []).push(a); return acc }, {} as Record<string, Achievement[]>)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="text-xs text-gray-500 font-semibold mb-3">
        🏅 업적 ({claimedIds.length}/{achievements.length})
      </div>
      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, achs]) => {
          const catInfo = CATEGORY_LABELS[cat] || { label: cat, emoji: '📋' }
          return (
            <div key={cat}>
              <div className="text-xs text-gray-400 font-semibold mb-2">{catInfo.emoji} {catInfo.label}</div>
              <div className="space-y-1.5">
                {(achs as Achievement[]).map(ach => {
                  const unlocked = ach.check()
                  const claimed = claimedIds.includes(ach.id)
                  return (
                    <div key={ach.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                      claimed ? 'bg-gray-800/30 opacity-60' : unlocked ? 'bg-amber-950/20 border border-amber-800/30' : 'bg-gray-800/20'
                    }`}>
                      <span className="text-lg">{ach.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold ${unlocked ? 'text-amber-300' : 'text-gray-400'}`}>{ach.title}</div>
                        <div className="text-xs text-gray-500">{ach.description}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {ach.reward.type === 'invest' ? '🔍' : '⚡'}×{ach.reward.amount}
                        </span>
                        {claimed ? (
                          <span className="text-xs text-gray-600">✓</span>
                        ) : unlocked ? (
                          <button onClick={() => handleClaim(ach)} className="px-3 py-1 text-xs rounded-lg bg-amber-600 text-gray-950 font-bold hover:bg-amber-500 active:scale-95">받기</button>
                        ) : (
                          <span className="text-xs text-gray-700">🔒</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
