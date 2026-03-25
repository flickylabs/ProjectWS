import { useMemo, useState } from 'react'
import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch } from '../../hooks/useActionDispatch'

interface Props {
  target: PartyId | null
  onPresent: (evidenceId: string) => void
}

const SUB_ACTIONS: { key: string; label: string; icon: string }[] = [
  { key: 'request_original', label: '원본', icon: '📋' },
  { key: 'check_metadata', label: '메타', icon: '🔍' },
  { key: 'restore_context', label: '맥락', icon: '📖' },
  { key: 'verify_source', label: '출처', icon: '📎' },
  { key: 'check_edits', label: '편집', icon: '✂️' },
  { key: 'question_acquisition', label: '경위', icon: '❓' },
]

export default function EvidencePresenter({ target, onPresent }: Props) {
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const dispatch = useActionDispatch()

  const { available, presented, locked } = useMemo(() => {
    const avail = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked && !evidenceStates[e.id]?.presented)
    const pres = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.presented)
    const lock = evidenceDefinitions.filter((e) => !evidenceStates[e.id]?.unlocked)
    return { available: avail, presented: pres, locked: lock }
  }, [evidenceDefinitions, evidenceStates])

  if (!target) {
    return (
      <div className="space-y-2">
        <div className="text-xs text-amber-600 bg-amber-900/20 border border-amber-800/30 rounded px-3 py-1.5">
          대상을 선택하면 증거를 제시할 수 있습니다.
        </div>
        {/* 대상 없어도 증거 목록은 보여줌 */}
        <EvidenceList
          items={[...available, ...presented]}
          states={evidenceStates}
          expandedId={expandedId}
          onToggle={setExpandedId}
          onInvestigate={(eid, sa) => dispatch({ type: 'evidence_investigate', evidenceId: eid, subAction: sa })}
        />
        {locked.length > 0 && <LockedList count={locked.length} />}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {available.length > 0 && (
        <>
          <div className="text-xs text-gray-400">제시 가능 ({available.length})</div>
          {available.map((ev) => (
            <EvidenceCard
              key={ev.id}
              ev={ev}
              state={evidenceStates[ev.id]}
              isExpanded={expandedId === ev.id}
              onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              onPresent={() => onPresent(ev.id)}
              onInvestigate={(sa) => dispatch({ type: 'evidence_investigate', evidenceId: ev.id, subAction: sa })}
              canPresent={true}
            />
          ))}
        </>
      )}
      {presented.length > 0 && (
        <>
          <div className="text-xs text-gray-400 mt-1">제시 완료 ({presented.length})</div>
          {presented.map((ev) => (
            <EvidenceCard
              key={ev.id}
              ev={ev}
              state={evidenceStates[ev.id]}
              isExpanded={expandedId === ev.id}
              onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              onInvestigate={(sa) => dispatch({ type: 'evidence_investigate', evidenceId: ev.id, subAction: sa })}
              canPresent={false}
            />
          ))}
        </>
      )}
      {locked.length > 0 && <LockedList count={locked.length} />}
    </div>
  )
}

function EvidenceCard({ ev, state, isExpanded, onToggle, onPresent, onInvestigate, canPresent }: {
  ev: any; state: any; isExpanded: boolean
  onToggle: () => void; onPresent?: () => void
  onInvestigate: (sa: string) => void; canPresent: boolean
}) {
  const relBadge = ev.reliability === 'hard'
    ? 'bg-emerald-900/40 text-emerald-400' : 'bg-yellow-900/40 text-yellow-400'
  const legWarning = ev.legitimacy !== 'lawful'

  return (
    <div className={`border rounded-lg overflow-hidden ${state?.presented ? 'border-gray-800 bg-gray-900/30' : 'border-gray-700 bg-gray-800/40'}`}>
      <button onClick={onToggle} className="w-full text-left px-2.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`text-xs px-1 py-0.5 rounded ${relBadge}`}>{ev.reliability === 'hard' ? 'H' : 'S'}</span>
          <span className="text-xs text-gray-200 truncate">{ev.name}</span>
          {state?.presented && <span className="text-emerald-500 text-xs">✓</span>}
          {legWarning && <span className="text-orange-400 text-xs">⚠</span>}
        </div>
        <span className="text-gray-600 text-xs">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {isExpanded && (
        <div className="px-2.5 pb-2 space-y-2 border-t border-gray-800">
          <p className="text-xs text-gray-400 mt-1.5">{ev.description}</p>

          {/* 조사 하위 액션 */}
          <div className="grid grid-cols-3 gap-1">
            {SUB_ACTIONS.map((sa) => {
              const result = ev.investigationResults?.[sa.key]
              if (!result) return null
              const done = state?.investigatedActions?.includes(sa.key)
              return (
                <button
                  key={sa.key}
                  onClick={() => !done && onInvestigate(sa.key)}
                  className={`text-xs px-1.5 py-1 rounded transition-colors ${
                    done ? 'bg-gray-700/50 text-emerald-500' : 'bg-gray-700 hover:bg-amber-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {sa.icon} {done ? '✓' : sa.label}
                </button>
              )
            })}
          </div>

          {/* 제시 버튼 */}
          {canPresent && onPresent && (
            <button
              onClick={onPresent}
              className="w-full text-xs py-1.5 rounded font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-colors"
            >
              이 증거 제시하기
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function EvidenceList({ items, states, expandedId, onToggle, onInvestigate }: {
  items: any[]; states: any; expandedId: string | null
  onToggle: (id: string | null) => void; onInvestigate: (eid: string, sa: string) => void
}) {
  if (items.length === 0) return <div className="text-xs text-gray-600">확보된 증거가 없습니다.</div>
  return (
    <>
      {items.map((ev) => (
        <EvidenceCard
          key={ev.id}
          ev={ev}
          state={states[ev.id]}
          isExpanded={expandedId === ev.id}
          onToggle={() => onToggle(expandedId === ev.id ? null : ev.id)}
          onInvestigate={(sa) => onInvestigate(ev.id, sa)}
          canPresent={false}
        />
      ))}
    </>
  )
}

function LockedList({ count }: { count: number }) {
  return (
    <div className="text-xs text-gray-600 bg-gray-800/20 rounded px-2.5 py-1.5">
      🔒 미확보 증거 {count}개 (선행 증거 필요)
    </div>
  )
}
