import { useGameStore } from '../../store/useGameStore'

export default function ResponsibilitySlider() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setResponsibility = useGameStore((s) => s.setResponsibility)

  if (!caseData) return null

  // 사실 인정을 보류하지 않은 쟁점만 책임 배분 대상
  const activeDisputes = caseData.disputes.filter(
    (d) => verdictInput.factFindings[d.id] && verdictInput.factFindings[d.id] !== 'pending',
  )

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400">② 책임 배분</h3>
      <p className="text-xs text-gray-500">각 쟁점에 대해 A와 B의 책임 비율을 설정하세요.</p>

      {activeDisputes.length === 0 && (
        <div className="text-xs text-gray-600">사실 인정 단계에서 판단한 쟁점이 없습니다.</div>
      )}

      <div className="space-y-3">
        {activeDisputes.map((d) => {
          const resp = verdictInput.responsibility[d.id] ?? { a: 50, b: 50 }
          return (
            <div key={d.id} className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
              <div className="text-sm font-semibold text-gray-200 mb-2">{d.name}</div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-400 w-20 text-right">
                  {caseData.duo.partyA.name} {resp.a}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={resp.a}
                  onChange={(e) => {
                    const a = Number(e.target.value)
                    setResponsibility(d.id, a, 100 - a)
                  }}
                  className="flex-1 accent-amber-500 h-2"
                />
                <span className="text-xs text-rose-400 w-20">
                  {resp.b}% {caseData.duo.partyB.name}
                </span>
              </div>

              {d.ambiguity === 'high' && (
                <div className="text-xs text-gray-500 mt-1">⚠️ 모호성이 높은 쟁점입니다.</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
