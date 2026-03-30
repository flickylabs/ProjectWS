import { useState, useMemo, useRef, useEffect } from 'react'
import type { CaseData } from '../../types'
import { loadGeneratedCases } from '../../data/cases/caseLoader'
import Emoji from '../common/Emoji'
import MailInbox from '../mail/MailInbox'
import { mailApi } from '../../api/client'

interface Props {
  onSelectCase: (caseData: CaseData) => void
  onBack: () => void
  initialChapterType?: string
}

interface CaseProgress {
  [caseId: string]: { bestScore: number; stars: number; reputation: number; clearedAt: string }
}

const CHAPTERS = [
  { id: 'spouse', label: '부부', icon: '⚖️', type: 'spouse', color: '#ef4444', bg: 'from-red-950/30' },
  { id: 'neighbor', label: '이웃', icon: '🏠', type: 'neighbor', color: '#3b82f6', bg: 'from-blue-950/30' },
  { id: 'workplace', label: '직장', icon: '💼', type: 'boss_employee', color: '#8b5cf6', bg: 'from-purple-950/30' },
  { id: 'partnership', label: '동업', icon: '🤝', type: 'partnership', color: '#f59e0b', bg: 'from-amber-950/30' },
  { id: 'family', label: '가족', icon: '👨‍👩‍👧', type: 'family', color: '#10b981', bg: 'from-emerald-950/30' },
  { id: 'tenant', label: '세입자', icon: '🏢', type: 'tenant_landlord', color: '#06b6d4', bg: 'from-cyan-950/30' },
  { id: 'friend', label: '친구', icon: '🫂', type: 'friend', color: '#ec4899', bg: 'from-pink-950/30' },
]

function loadProgress(): CaseProgress {
  try { return JSON.parse(localStorage.getItem('solomon-case-progress') || '{}') } catch { return {} }
}

function getStars(score: number): number {
  return score >= 80 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0
}

function getReputation(score: number): number {
  return score >= 90 ? 50 : score >= 75 ? 35 : score >= 60 ? 20 : score >= 40 ? 10 : 5
}

export function saveCaseProgress(caseId: string, score: number) {
  const progress = loadProgress()
  const existing = progress[caseId]
  if (!existing || score > existing.bestScore) {
    progress[caseId] = { bestScore: score, stars: getStars(score), reputation: getReputation(score), clearedAt: new Date().toISOString() }
    localStorage.setItem('solomon-case-progress', JSON.stringify(progress))
  }
}

export default function CaseMap({ onSelectCase, onBack, initialChapterType }: Props) {
  const initialIdx = initialChapterType ? CHAPTERS.findIndex(c => c.type === initialChapterType) : 0
  const [chapterIdx, setChapterIdx] = useState(initialIdx >= 0 ? initialIdx : 0)
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null)
  const [showMail, setShowMail] = useState(false)
  const [unreadMail, setUnreadMail] = useState(0)

  useEffect(() => {
    const playerId = localStorage.getItem('solomon-player-id')
    if (playerId) {
      mailApi.unreadCount(playerId).then(r => setUnreadMail(r.count)).catch(() => {})
    }
  }, [showMail])
  const progress = useMemo(() => loadProgress(), [])
  const allCases = useMemo(() => loadGeneratedCases(), [])
  const scrollRef = useRef<HTMLDivElement>(null)

  const chapter = CHAPTERS[chapterIdx]
  const cases = useMemo(() => {
    const filtered = allCases.filter(c => c.duo.relationshipType === chapter.type)
    // 난이도 오름차순 정렬: easy → medium → hard
    const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
    return filtered.sort((a, b) => (diffOrder[a.meta?.difficulty ?? 'medium'] ?? 1) - (diffOrder[b.meta?.difficulty ?? 'medium'] ?? 1))
  }, [allCases, chapter.type])

  const isChapterUnlocked = (_idx: number) => true // 모든 챕터 해금

  const isStageUnlocked = (idx: number) => {
    if (idx === 0) return true // 첫 사건은 항상 해금
    // 이전 사건을 클리어해야 다음 사건 해금
    const prev = cases[idx - 1]
    return prev && (progress[prev.caseId]?.bestScore ?? 0) >= 40
  }

  // 총 별/명성 계산
  const chapterStats = useMemo(() => {
    let stars = 0, rep = 0, cleared = 0
    cases.forEach(c => {
      const p = progress[c.caseId]
      if (p) { stars += p.stars; rep += p.reputation; cleared++ }
    })
    return { stars, rep, cleared, total: cases.length }
  }, [cases, progress])

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-950 text-gray-100 max-w-lg mx-auto"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>

      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-gray-800/50">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-sm">← 홈</button>
        <div className="text-center">
          <span className="text-sm font-bold text-amber-400"><Emoji char={chapter.icon} size={14} /> {chapter.label}</span>
          <div className="text-xs text-gray-500">{chapterStats.cleared}/{chapterStats.total} 클리어 · <Emoji char="★" size={10} />{chapterStats.stars}</div>
        </div>
        <button onClick={() => setShowMail(true)} className="relative text-gray-400 hover:text-white text-lg w-10 text-right">
          <Emoji char="📨" size={16} />
          {unreadMail > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">{unreadMail}</span>
          )}
        </button>
      </div>

      {showMail && <MailInbox onClose={() => setShowMail(false)} />}

      {/* 챕터 선택 */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide shrink-0">
        {CHAPTERS.map((ch, i) => {
          const unlocked = isChapterUnlocked(i)
          return (
            <button key={ch.id} onClick={() => unlocked && setChapterIdx(i)} disabled={!unlocked}
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                chapterIdx === i ? 'ring-2 ring-amber-400 scale-110' : ''
              } ${unlocked ? 'bg-gray-800/60' : 'bg-gray-900/40 opacity-40'}`}
              style={chapterIdx === i ? { backgroundColor: ch.color + '30' } : {}}
            >
              <Emoji char={unlocked ? ch.icon : '🔒'} size={18} />
            </button>
          )
        })}
      </div>

      {/* 맵 — 캔디크러시 스타일 여행 경로 */}
      <div ref={scrollRef} className={`flex-1 overflow-y-auto bg-gradient-to-b ${chapter.bg} to-gray-950`}>
        {cases.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div><div className="text-4xl mb-2"><Emoji char="🚧" size={36} /></div><div className="text-sm text-gray-600">사건 준비 중</div></div>
          </div>
        ) : (
          <div className="relative py-6 px-4">
            {/* 연결 경로 (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {cases.map((_, i) => {
                if (i === 0) return null
                const segH = 110
                const y1 = 40 + (i - 1) * segH + 30
                const y2 = 40 + i * segH + 30
                const xL = 80, xR = 260
                const x1 = (i - 1) % 2 === 0 ? xL : xR
                const x2 = i % 2 === 0 ? xL : xR
                const midY = (y1 + y2) / 2
                const cleared = (progress[cases[i - 1]?.caseId]?.bestScore ?? 0) >= 40
                return (
                  <path key={i}
                    d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                    fill="none"
                    stroke={cleared ? chapter.color : '#374151'}
                    strokeWidth={cleared ? 3 : 2}
                    strokeDasharray={cleared ? '0' : '6 4'}
                    opacity={cleared ? 0.5 : 0.2}
                  />
                )
              })}
            </svg>

            {/* 스테이지 노드 */}
            {cases.map((c, i) => {
              const prog = progress[c.caseId]
              const unlocked = isStageUnlocked(i)
              const cleared = prog && prog.bestScore >= 40
              const stars = prog?.stars ?? 0
              const isLeft = i % 2 === 0
              const name = c.disputes[0]?.name?.slice(0, 14) ?? `사건 #${i + 1}`
              const isCurrent = unlocked && !cleared

              return (
                <div key={c.caseId}
                  className={`flex ${isLeft ? 'justify-start pl-2' : 'justify-end pr-2'}`}
                  style={{ height: '110px' }}
                >
                  <button
                    onClick={() => unlocked && setSelectedCase(c)}
                    disabled={!unlocked}
                    className={`relative flex items-center gap-3 w-[70%] transition-all active:scale-95 ${
                      isLeft ? '' : 'flex-row-reverse'
                    }`}
                  >
                    {/* 원형 노드 */}
                    <div className={`shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-black shadow-lg transition-all ${
                      isCurrent ? 'animate-pulse ring-2 ring-amber-400 scale-110' : ''
                    }`} style={{
                      backgroundColor: cleared ? chapter.color : unlocked ? '#1f2937' : '#111827',
                      borderWidth: 2,
                      borderColor: cleared ? chapter.color : unlocked ? '#374151' : '#1f2937',
                    }}>
                      {!unlocked ? (
                        <Emoji char="🔒" size={18} />
                      ) : cleared ? (
                        <>
                          <span className="text-white text-sm">{i + 1}</span>
                          <div className="flex -mt-0.5">
                            {[1, 2, 3].map(s => (
                              <Emoji key={s} char="★" size={8} className={s <= stars ? 'opacity-100' : 'opacity-30'} />
                            ))}
                          </div>
                        </>
                      ) : (
                        <span className={`text-lg ${isCurrent ? 'text-amber-400' : 'text-gray-400'}`}>{i + 1}</span>
                      )}
                    </div>

                    {/* 사건 정보 */}
                    <div className={`min-w-0 ${isLeft ? 'text-left' : 'text-right'}`}>
                      <div className={`text-xs font-semibold ${unlocked ? 'text-gray-200' : 'text-gray-600'}`}>
                        {unlocked ? name : '???'}
                      </div>
                      {cleared && (
                        <div className={`text-xs ${isLeft ? '' : 'text-right'}`}>
                          <span className="text-gray-500">{prog.bestScore}점</span>
                          <span className="text-amber-500/60 ml-1">+{prog.reputation}</span>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="text-xs text-amber-400/80">도전 가능</div>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}

            {/* 맨 아래 여백 */}
            <div className="h-16" />
          </div>
        )}
      </div>

      {/* 사건 상세 팝업 */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm p-5 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Emoji char={chapter.icon} size={20} />
                <span className="text-sm font-bold text-gray-200">{selectedCase.disputes[0]?.name?.slice(0, 20) ?? '사건'}</span>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-500 text-lg"><Emoji char="✕" size={16} /></button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {selectedCase.context.description.slice(0, 120)}...
            </p>

            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              <span>난이도: {selectedCase.meta?.difficulty === 'easy' ? <Emoji char="⭐" size={12} /> : selectedCase.meta?.difficulty === 'hard' ? <><Emoji char="⭐" size={12} /><Emoji char="⭐" size={12} /><Emoji char="⭐" size={12} /></> : <><Emoji char="⭐" size={12} /><Emoji char="⭐" size={12} /></>}</span>
              <span>쟁점 {selectedCase.disputes.length}개</span>
              <span>증거 {selectedCase.evidence.length}개</span>
            </div>

            {progress[selectedCase.caseId] && (
              <div className="bg-gray-800/60 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(s => (
                      <Emoji key={s} char="★" size={18} className={s <= (progress[selectedCase.caseId]?.stars ?? 0) ? 'opacity-100' : 'opacity-30'} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-amber-400">{progress[selectedCase.caseId].bestScore}점</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setSelectedCase(null)}
                className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-400">닫기</button>
              <button onClick={() => { onSelectCase(selectedCase); setSelectedCase(null) }}
                className="flex-1 text-xs py-2.5 rounded-xl font-bold text-white shadow-lg active:scale-95"
                style={{ backgroundColor: chapter.color }}>
                <Emoji char="🔍" size={14} /> 도전하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
