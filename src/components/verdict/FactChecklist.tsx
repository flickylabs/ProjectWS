import { useGameStore } from '../../store/useGameStore'

export default function FactChecklist() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setFactFinding = useGameStore((s) => s.setFactFinding)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)

  if (!caseData) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400">① 사실 인정</h3>
      <p className="text-xs text-gray-500">각 쟁점의 사실 여부를 판단하세요. 확신이 없으면 보류도 가능합니다.</p>

      <div className="space-y-2">
        {caseData.disputes.map((d) => {
          const current = verdictInput.factFindings[d.id] ?? 'pending'
          const lieA = agentA.lieStateMap[d.id]
          const lieB = agentB.lieStateMap[d.id]
          const collapsed = lieA?.currentState === 'S5' || lieB?.currentState === 'S5'

          return (
            <div key={d.id} className={`bg-gray-800/60 border rounded-lg p-3 ${collapsed ? 'border-emerald-800' : 'border-gray-700'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-gray-200">
                  {d.name}
                  {collapsed && <span className="text-xs text-emerald-400 ml-2">거짓말 붕괴됨</span>}
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${d.weight === 'high' ? 'bg-red-900/50 text-red-400' : d.weight === 'medium' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
                    {d.weight === 'high' ? '핵심' : d.weight === 'medium' ? '중요' : '부가'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {(['true', 'false', 'pending'] as const).map((val) => {
                  const labels = { true: '사실', false: '거짓', pending: '보류' }
                  const colors = {
                    true: current === val ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-emerald-600',
                    false: current === val ? 'bg-red-700 text-white border-red-600' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-red-600',
                    pending: current === val ? 'bg-gray-600 text-white border-gray-500' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500',
                  }
                  return (
                    <button
                      key={val}
                      onClick={() => setFactFinding(d.id, val)}
                      className={`flex-1 border rounded px-3 py-1.5 text-xs font-semibold transition-colors ${colors[val]}`}
                    >
                      {labels[val]}
                    </button>
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
