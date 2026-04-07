import { useMemo } from 'react'
import Emoji from '../common/Emoji'
import { loadGeneratedCases } from '../../data/cases/caseLoader'
import { useStore } from '../../store/useGameStore'

interface Props {
  onSelectSession: (sessionType: string) => void
  onBack: () => void
}

const SESSIONS = [
  { id: 'spouse', label: '부부', icon: '💑', type: 'spouse', desc: '부부 간 갈등과 신뢰 문제', color: '#ef4444', bg: 'from-red-950/40 to-gray-900' },
  { id: 'neighbor', label: '이웃', icon: '🏠', type: 'neighbor', desc: '이웃 간 분쟁과 생활 갈등', color: '#3b82f6', bg: 'from-blue-950/40 to-gray-900' },
  { id: 'workplace', label: '직장', icon: '💼', type: 'boss_employee', desc: '직장 내 갈등과 권력 관계', color: '#8b5cf6', bg: 'from-purple-950/40 to-gray-900' },
  { id: 'partnership', label: '동업', icon: '🤝', type: 'partnership', desc: '동업자 간 금전·신뢰 분쟁', color: '#f59e0b', bg: 'from-amber-950/40 to-gray-900' },
  { id: 'family', label: '가족', icon: '👨‍👩‍👧', type: 'family', desc: '가족 간 유산·돌봄·관계 갈등', color: '#10b981', bg: 'from-emerald-950/40 to-gray-900' },
  { id: 'tenant', label: '세입자', icon: '🏢', type: 'tenant_landlord', desc: '임대인·임차인 간 분쟁', color: '#06b6d4', bg: 'from-cyan-950/40 to-gray-900' },
  { id: 'friend', label: '친구', icon: '🫂', type: 'friend', desc: '친구 간 배신·금전·관계 갈등', color: '#ec4899', bg: 'from-pink-950/40 to-gray-900' },
]

interface SessionProgress {
  cleared: number
  total: number
  stars: number
}

function loadProgress(): Record<string, { bestScore: number; stars: number }> {
  try { return JSON.parse(localStorage.getItem('solomon-case-progress') || '{}') } catch { return {} }
}

function getSessionProgress(type: string, allCases: any[], progress: Record<string, { bestScore: number; stars: number }>): SessionProgress & { avgScore: number } {
  const cases = allCases.filter((c: any) => c.duo.relationshipType === type)
  let cleared = 0, stars = 0, totalScore = 0
  cases.forEach((c: any) => {
    const p = progress[c.caseId]
    if (p) { cleared++; stars += p.stars; totalScore += p.bestScore }
  })
  const avgScore = cleared > 0 ? totalScore / cleared : 0
  return { cleared, total: cases.length, stars, avgScore }
}

function ResourceBadge() {
  const invest = useStore((s) => s.globalInvestTokens)
  const skill = useStore((s) => s.globalSkillPoints)
  return (
    <div className="flex items-center gap-2 text-xs">
      <span><Emoji char="🔍" size={11} /> <span className="text-amber-400 font-bold">{invest}</span></span>
      <span><Emoji char="⚡" size={11} /> <span className="text-amber-400 font-bold">{skill}</span></span>
    </div>
  )
}

export default function SessionSelect({ onSelectSession, onBack }: Props) {
  const allCases = useMemo(() => loadGeneratedCases(), [])
  const progress = useMemo(() => loadProgress(), [])

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-950 text-gray-100 max-w-lg mx-auto"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>

      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-gray-800/50">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-sm">← 이전</button>
        <span className="text-sm font-bold text-amber-400">세션 선택</span>
        <ResourceBadge />
      </div>

      {/* 세션 카드 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {SESSIONS.map((session, idx) => {
          const stats = getSessionProgress(session.type, allCases, progress)
          const isUnlocked = true // 모든 세션 해금

          return (
            <button
              key={session.id}
              onClick={() => isUnlocked && onSelectSession(session.type)}
              disabled={!isUnlocked}
              className={`w-full text-left rounded-2xl border transition-all active:scale-[0.98] ${
                isUnlocked
                  ? 'border-gray-700/50 hover:border-gray-600 bg-gradient-to-r'
                  : 'border-gray-800/30 opacity-40 cursor-not-allowed bg-gray-900/50'
              } ${isUnlocked ? session.bg : ''}`}
            >
              <div className="flex items-center gap-4 px-4 py-4">
                {/* 아이콘 */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: isUnlocked ? session.color + '20' : undefined }}
                >
                  <Emoji char={isUnlocked ? session.icon : '🔒'} size={28} />
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold" style={{ color: isUnlocked ? session.color : '#6b7280' }}>
                      Session {idx + 1}
                    </span>
                    <span className="text-sm text-gray-300 font-semibold">{session.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{session.desc}</p>
                  {isUnlocked && (
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-gray-500">
                        {stats.cleared}/{stats.total} 클리어
                      </span>
                      {stats.stars > 0 && (
                        <span className="text-[11px] text-amber-500">
                          <Emoji char="★" size={10} /> {stats.stars}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* 진행도 or 평균 점수 */}
                {isUnlocked && (
                  <div className="text-right shrink-0 min-w-[48px]">
                    {stats.cleared === stats.total && stats.total > 0 ? (
                      <div>
                        <div className="text-lg font-bold text-amber-400">{stats.avgScore.toFixed(1)}</div>
                        <div className="text-[10px] text-amber-500/60">평균</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-bold text-gray-400">{stats.cleared}/{stats.total}</div>
                        <div className="text-[10px] text-gray-600">진행</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
