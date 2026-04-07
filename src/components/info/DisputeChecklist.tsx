import { useStore } from '../../store/useGameStore'
import type { LieState } from '../../types'
import type { TruthJudgment } from '../../types/discovery'

const STATE_DISPLAY: Record<LieState, { label: string; color: string }> = {
  S0: { label: '부정 중', color: 'bg-gray-600' },
  S1: { label: '흔들림', color: 'bg-yellow-700' },
  S2: { label: '부분 인정', color: 'bg-orange-700' },
  S3: { label: '책임 전가', color: 'bg-red-800' },
  S4: { label: '감정 호소', color: 'bg-red-600' },
  S5: { label: '인정/붕괴', color: 'bg-emerald-700' },
}

const JUDGMENT_ICONS: Record<TruthJudgment, string> = {
  believe_a: '🔵',
  believe_b: '🔴',
  both_partial: '🟡',
  undetermined: '⬜',
}

export default function DisputeChecklist() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const discovery = useStore((s) => s.discovery)

  if (!caseData) return null

  // discovery 가시성에 따라 필터링
  const entries = Object.values(discovery.disputeVisibility)
    .filter((v) => v.visibility !== 'hidden')
    .sort((a, b) => {
      // emerged(신규) 상단, inactive 하단
      const order = { emerged: 0, visible: 1, inactive: 2, hidden: 3 }
      return (order[a.visibility] ?? 1) - (order[b.visibility] ?? 1)
    })

  const hiddenCount = Object.values(discovery.disputeVisibility)
    .filter((v) => v.visibility === 'hidden').length

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-gray-500 font-semibold">쟁점 현황</span>
        {hiddenCount > 0 && (
          <span className="text-[10px] text-gray-600">미발견 {hiddenCount}건</span>
        )}
      </div>
      {entries.map((entry) => {
        const d = caseData.disputes.find((x) => x.id === entry.disputeId)
        if (!d) return null

        const stateA = agentA.lieStateMap[d.id]
        const stateB = agentB.lieStateMap[d.id]
        const judgment = discovery.judgments[d.id]
        const isInactive = entry.visibility === 'inactive'
        const isNew = entry.isNew

        return (
          <div
            key={d.id}
            className={`rounded px-2 py-1.5 ${
              isInactive
                ? 'bg-gray-800/20 opacity-40'
                : isNew
                  ? 'bg-amber-950/30 border border-amber-700/30'
                  : 'bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {/* 판단 아이콘 */}
              {judgment && (
                <span className="text-xs">{JUDGMENT_ICONS[judgment.judgment]}</span>
              )}
              <span className={`text-xs font-semibold flex-1 ${
                isInactive ? 'text-gray-600 line-through' : 'text-gray-300'
              }`}>
                {d.name}
              </span>
              {/* (N) 뱃지 */}
              {isNew && (
                <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">N</span>
              )}
              {isInactive && (
                <span className="text-[10px] text-gray-600">완료</span>
              )}
            </div>
            <div className="flex gap-2">
              {/* 관련 파티의 lie state만 표시 */}
              {entry.relevantParties.includes('a') && stateA && (
                <StateBadge party={caseData.duo.partyA.name.slice(0, 2)} state={stateA.currentState} isA />
              )}
              {entry.relevantParties.includes('b') && stateB && (
                <StateBadge party={caseData.duo.partyB.name.slice(0, 2)} state={stateB.currentState} isA={false} />
              )}
              {!stateA && !stateB && !isInactive && (
                <span className="text-xs text-gray-600">미공개</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StateBadge({ party, state, isA }: { party: string; state: LieState; isA: boolean }) {
  const display = STATE_DISPLAY[state]
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${display.color} ${
      isA ? 'text-blue-200' : 'text-rose-200'
    }`}>
      {party}: {display.label}
    </span>
  )
}
