import { useGameStore } from '../../store/useGameStore'
import type { LieState } from '../../types'

const STATE_DISPLAY: Record<LieState, { label: string; color: string }> = {
  S0: { label: '부정 중', color: 'bg-gray-600' },
  S1: { label: '흔들림', color: 'bg-yellow-700' },
  S2: { label: '부분 인정', color: 'bg-orange-700' },
  S3: { label: '책임 전가', color: 'bg-red-800' },
  S4: { label: '감정 호소', color: 'bg-red-600' },
  S5: { label: '인정/붕괴', color: 'bg-emerald-700' },
}

export default function DisputeChecklist() {
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)

  if (!caseData) return null

  return (
    <div className="space-y-1.5">
      <div className="text-xs text-gray-500 font-semibold px-1">쟁점 현황</div>
      {caseData.disputes.map((d) => {
        const stateA = agentA.lieStateMap[d.id]
        const stateB = agentB.lieStateMap[d.id]
        return (
          <div key={d.id} className="bg-gray-800/50 rounded px-2 py-1.5">
            <div className="text-xs font-semibold text-gray-300 mb-1">{d.name}</div>
            <div className="flex gap-2">
              {stateA && <StateBadge party="A" state={stateA.currentState} />}
              {stateB && <StateBadge party="B" state={stateB.currentState} />}
              {!stateA && !stateB && (
                <span className="text-xs text-gray-600">미공개</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StateBadge({ party, state }: { party: string; state: LieState }) {
  const display = STATE_DISPLAY[state]
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${display.color} text-gray-200`}>
      {party}: {display.label}
    </span>
  )
}
