import { useState, useEffect } from 'react'
import type { ExtendedHistoryEntry } from '../../types'
import { loadExtendedHistory, addHistoryEntry, ensureProfile } from '../../data/leaderboard'
import { getCurrentSeason } from '../../data/seasons'
import Emoji from '../common/Emoji'

/** 판결 완료 시 호출 — VerdictScreen에서 사용 */
export function recordHistory(entry: {
  caseId: string
  score: number
  insight?: number
  authority?: number
  wisdom?: number
  relationshipType: string
  nameA: string
  nameB: string
  titles?: string[]
  verdictDetail?: {
    factFindings: Record<string, string>
    responsibility: Record<string, { a: number; b: number }>
    selectedSolutions: string[]
    disputeNames: Record<string, string>
    aftermath?: string
  }
}) {
  const profile = ensureProfile()
  const season = getCurrentSeason()
  addHistoryEntry({
    caseId: entry.caseId,
    score: entry.score,
    insight: entry.insight ?? entry.score,
    authority: entry.authority ?? entry.score,
    wisdom: entry.wisdom ?? entry.score,
    date: new Date().toISOString(),
    relationshipType: entry.relationshipType,
    nameA: entry.nameA,
    nameB: entry.nameB,
    seasonId: season.id,
    playerId: profile.playerId,
    playerName: profile.playerName,
    titles: entry.titles ?? [],
    verdictDetail: entry.verdictDetail,
  })
}

interface Props {
  onClose: () => void
}

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부', neighbor: '이웃', boss_employee: '직장',
  partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
}

export default function HistoryPanel({ onClose }: Props) {
  const [history, setHistory] = useState<ExtendedHistoryEntry[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [detailTab, setDetailTab] = useState<'score' | 'result' | 'aftermath'>('score')

  useEffect(() => {
    setHistory(loadExtendedHistory())
  }, [])

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/90 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-amber-400">판결 기록</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg"><Emoji char="✕" size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center text-gray-600 text-sm py-8">아직 판결 기록이 없습니다.</div>
          ) : (
            <div className="space-y-2">
              {history.map((h, i) => {
                const rating = h.score >= 90 ? '전설' : h.score >= 75 ? '현명' : h.score >= 60 ? '유능' : h.score >= 40 ? '보통' : '미숙'
                const ratingColor = h.score >= 75 ? 'text-amber-400' : h.score >= 50 ? 'text-gray-300' : 'text-gray-500'
                return (
                  <button key={i} onClick={() => { setSelectedIdx(i); setDetailTab('score') }}
                    className="w-full text-left bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-amber-600 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">
                          {RELATION_LABELS[h.relationshipType] ?? h.relationshipType}
                        </span>
                        <span className="text-xs text-gray-300">{h.nameA} vs {h.nameB}</span>
                      </div>
                      <span className={`text-sm font-bold ${ratingColor}`}>{h.score}점</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-blue-400/70">통찰 {h.insight}</span>
                      <span className="text-xs text-amber-400/70">권위 {h.authority}</span>
                      <span className="text-xs text-emerald-400/70">지혜 {h.wisdom}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{new Date(h.date).toLocaleDateString('ko')}</span>
                      <span className={`text-xs ${ratingColor}`}>{rating} ›</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 상세 보기 */}
      {selectedIdx !== null && history[selectedIdx] && (() => {
        const h = history[selectedIdx]
        const d = h.verdictDetail
        const tabs = ['score', 'result', 'aftermath'] as const
        const tabLabels = { score: '점수', result: '판결 결과', aftermath: '후일담' }
        return (
          <div className="fixed inset-0 z-50 bg-gray-950/95 flex flex-col overflow-hidden max-w-lg mx-auto"
            style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)', paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <button onClick={() => setSelectedIdx(null)} className="text-gray-400 text-sm">← 목록</button>
              <span className="text-xs text-gray-400">{h.nameA} vs {h.nameB}</span>
              <div className="w-12" />
            </div>

            {/* 탭 */}
            <div className="flex border-b border-gray-800">
              {tabs.map(t => (
                <button key={t} onClick={() => setDetailTab(t)}
                  className={`flex-1 py-2 text-xs font-semibold ${detailTab === t ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'}`}>
                  {tabLabels[t]}
                </button>
              ))}
            </div>

            {/* 탭 내용 */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {detailTab === 'score' && (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-amber-400">{h.score}<span className="text-lg text-amber-500/60 ml-1">점</span></div>
                  <div className="flex justify-center gap-1">
                    {[1,2,3].map(s => <span key={s} className={`text-2xl ${s <= (h.score >= 75 ? 3 : h.score >= 55 ? 2 : h.score >= 35 ? 1 : 0) ? 'text-amber-400' : 'text-gray-700'}`}>★</span>)}
                  </div>
                  <div className="space-y-2 mt-4">
                    {[{l:'통찰',v:h.insight,c:'bg-blue-600'},{l:'권위',v:h.authority,c:'bg-amber-600'},{l:'지혜',v:h.wisdom,c:'bg-emerald-600'}].map(b => (
                      <div key={b.l} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10 text-right">{b.l}</span>
                        <div className="flex-1 bg-gray-800 rounded-full h-2"><div className={`h-2 rounded-full ${b.c}`} style={{width:`${b.v}%`}} /></div>
                        <span className="text-xs text-gray-300 w-8">{b.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailTab === 'result' && d && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400">사실 인정</h4>
                  {Object.entries(d.factFindings).map(([id, val]) => (
                    <div key={id} className="flex justify-between text-xs bg-gray-800/50 rounded-lg px-3 py-2">
                      <span className="text-gray-300">{d.disputeNames?.[id] ?? id}</span>
                      <span className={val === 'true' ? 'text-emerald-400' : val === 'false' ? 'text-red-400' : 'text-gray-500'}>
                        {val === 'true' ? '사실' : val === 'false' ? '거짓' : '보류'}
                      </span>
                    </div>
                  ))}
                  <h4 className="text-xs font-bold text-amber-400 mt-3">책임 배분</h4>
                  {Object.entries(d.responsibility).map(([id, val]) => (
                    <div key={id} className="text-xs bg-gray-800/50 rounded-lg px-3 py-2">
                      <div className="text-gray-300 mb-1">{d.disputeNames?.[id] ?? id}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">{h.nameA} {val.a}%</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-1.5 flex overflow-hidden">
                          <div className="bg-blue-600/50 h-full" style={{width:`${val.a}%`}} />
                          <div className="bg-rose-600/50 h-full flex-1" />
                        </div>
                        <span className="text-rose-400">{val.b}% {h.nameB}</span>
                      </div>
                    </div>
                  ))}
                  {d.selectedSolutions.length > 0 && (
                    <>
                      <h4 className="text-xs font-bold text-amber-400 mt-3">해결책</h4>
                      <div className="flex flex-wrap gap-1">
                        {d.selectedSolutions.map(s => (
                          <span key={s} className="text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">{s.split('::')[1] ?? s}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              {detailTab === 'result' && !d && (
                <div className="text-center text-gray-600 text-sm py-8">상세 결과가 저장되지 않은 기록입니다.</div>
              )}

              {detailTab === 'aftermath' && d?.aftermath && (
                <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
                  {d.aftermath.split('\n\n').map((p, i) => (
                    <p key={i} className={`text-sm leading-relaxed ${i === d.aftermath!.split('\n\n').length - 1 ? 'text-amber-400/80 italic mt-3 text-center' : 'text-gray-300 mb-3'}`}>{p}</p>
                  ))}
                </div>
              )}
              {detailTab === 'aftermath' && (!d?.aftermath) && (
                <div className="text-center text-gray-600 text-sm py-8">후일담이 저장되지 않은 기록입니다.</div>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
