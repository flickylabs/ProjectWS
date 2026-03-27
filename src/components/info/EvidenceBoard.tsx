import { useState, useMemo } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import type { EvidenceNode } from '../../types'
import Emoji from '../common/Emoji'

const SUB_ACTIONS: { key: string; label: string; icon: string }[] = [
  { key: 'request_original', label: '원본 요청', icon: '📋' },
  { key: 'check_metadata', label: '메타데이터', icon: '🔍' },
  { key: 'restore_context', label: '맥락 복원', icon: '📖' },
  { key: 'verify_source', label: '출처 확인', icon: '📎' },
  { key: 'check_edits', label: '편집 검사', icon: '✂️' },
  { key: 'question_acquisition', label: '취득 경위', icon: '❓' },
]

export default function EvidenceBoard() {
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const dispatch = useActionDispatch()

  const { unlocked, locked } = useMemo(() => {
    const u = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked)
    const l = evidenceDefinitions.filter((e) => !evidenceStates[e.id]?.unlocked)
    return { unlocked: u, locked: l }
  }, [evidenceDefinitions, evidenceStates])

  const handleInvestigate = (evidenceId: string, subAction: string) => {
    dispatch({ type: 'evidence_investigate', evidenceId, subAction })
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-500 font-semibold px-1">증거 보드</div>

      {unlocked.map((ev) => {
        const state = evidenceStates[ev.id]
        const isExpanded = expandedId === ev.id
        return (
          <div key={ev.id} className="border border-gray-700 rounded-lg bg-gray-800/40 overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : ev.id)}
              className="w-full text-left px-2.5 py-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`text-xs px-1 py-0.5 rounded ${ev.reliability === 'hard' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                  {ev.reliability === 'hard' ? 'H' : 'S'}
                </span>
                <span className="text-xs text-gray-200 truncate">{ev.name}</span>
                {state?.presented && <Emoji char="✓" size={10} />}
              </div>
              <span className="text-gray-600 text-xs">{isExpanded ? '▲' : '▼'}</span>
            </button>

            {isExpanded && (
              <div className="px-2.5 pb-2 space-y-2 border-t border-gray-800">
                <p className="text-xs text-gray-400 mt-1.5">{ev.description}</p>
                <div className="flex flex-wrap gap-1 text-xs">
                  {ev.legitimacy !== 'lawful' && (
                    <span className="text-orange-400"><Emoji char="⚠" size={12} /> {ev.legitimacy === 'privacy_concern' ? '사생활 침해' : '위법'}</span>
                  )}
                  <span className="text-gray-600">완전성: {ev.completeness}</span>
                </div>

                {/* 조사 하위 액션 */}
                <div className="text-xs text-gray-500 font-semibold mt-1">조사:</div>
                <div className="grid grid-cols-3 gap-1">
                  {SUB_ACTIONS.map((sa) => {
                    const result = ev.investigationResults[sa.key]
                    const alreadyDone = state?.investigatedActions.includes(sa.key)
                    if (!result) return null
                    return (
                      <button
                        key={sa.key}
                        onClick={() => !alreadyDone && handleInvestigate(ev.id, sa.key)}
                        className={`text-xs px-1.5 py-1 rounded transition-colors ${
                          alreadyDone
                            ? 'bg-gray-700/50 text-emerald-500'
                            : 'bg-gray-700 hover:bg-amber-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Emoji char={sa.icon} size={12} /> {alreadyDone ? <Emoji char="✓" size={10} /> : sa.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {locked.map((ev) => (
        <div key={ev.id} className="text-xs text-gray-600 bg-gray-800/20 rounded px-2.5 py-1.5 flex items-center gap-1.5">
          <Emoji char="🔒" size={12} />
          <span>??? (선행 증거 필요)</span>
        </div>
      ))}
    </div>
  )
}
