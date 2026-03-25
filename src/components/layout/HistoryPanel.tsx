import { useState, useEffect } from 'react'

interface HistoryEntry {
  caseId: string
  score: number
  date: string
  relationshipType: string
  nameA: string
  nameB: string
}

const HISTORY_KEY = 'solomon-history'

export function recordHistory(entry: Omit<HistoryEntry, 'date'>) {
  try {
    const history = loadHistory()
    history.unshift({ ...entry, date: new Date().toISOString() })
    if (history.length > 50) history.length = 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch { /* ignore */ }
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

interface Props {
  onClose: () => void
}

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부', neighbor: '이웃', boss_employee: '직장',
  partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
}

export default function HistoryPanel({ onClose }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/90 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-amber-400">판결 기록</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">✕</button>
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
                  <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">
                          {RELATION_LABELS[h.relationshipType] ?? h.relationshipType}
                        </span>
                        <span className="text-xs text-gray-300">{h.nameA} vs {h.nameB}</span>
                      </div>
                      <span className={`text-sm font-bold ${ratingColor}`}>{h.score}점</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{new Date(h.date).toLocaleDateString('ko')}</span>
                      <span className={`text-xs ${ratingColor}`}>{rating}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
