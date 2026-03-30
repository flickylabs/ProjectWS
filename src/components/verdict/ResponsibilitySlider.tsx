import { useGameStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

export default function ResponsibilitySlider() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setResponsibility = useGameStore((s) => s.setResponsibility)

  if (!caseData) return null

  const activeDisputes = caseData.disputes.filter(
    (d) => verdictInput.factFindings[d.id] && verdictInput.factFindings[d.id] !== 'pending',
  )

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400">② 책임 배분</h3>
      <p className="text-xs text-gray-500">슬라이더를 밀어 누구의 잘못이 더 큰지 정하세요.</p>

      {activeDisputes.length === 0 && (
        <div className="text-xs text-gray-600">사실 인정 단계에서 판단한 쟁점이 없습니다.</div>
      )}

      <div className="space-y-3">
        {activeDisputes.map((d) => {
          const resp = verdictInput.responsibility[d.id] ?? { a: 50, b: 50 }
          const tiltAngle = ((resp.b - resp.a) / 100) * 12 // A 무거우면 왼쪽 기울어짐(음수), B 무거우면 오른쪽(양수)
          const aHeavy = resp.a > 50
          const bHeavy = resp.b > 50
          const _balanced = resp.a === 50

          return (
            <div key={d.id} className="bg-gray-800/60 border border-gray-700 rounded-xl p-3">
              <div className="text-sm font-semibold text-gray-200 mb-3">{d.name}</div>

              {/* 저울 시각화 */}
              <div className="relative h-16 flex items-center justify-center mb-2">
                {/* 받침대 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-600" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-500 rounded" />

                {/* 저울 막대 */}
                <div
                  className="absolute w-[85%] h-px bg-gray-400 transition-transform duration-300"
                  style={{ transform: `rotate(${tiltAngle}deg)`, transformOrigin: 'center' }}
                >
                  {/* A 접시 (왼쪽) — A 귀책 높으면 아래로 */}
                  <div className={`absolute -left-1 -bottom-3 flex flex-col items-center transition-all duration-300 ${aHeavy ? 'translate-y-2' : bHeavy ? '-translate-y-1' : ''}`}>
                    <div className={`w-10 h-3 rounded-t-lg border border-b-0 transition-colors ${aHeavy ? 'bg-blue-600/40 border-blue-500' : 'bg-gray-800 border-gray-600'}`} />
                  </div>
                  {/* B 접시 (오른쪽) — B 귀책 높으면 아래로 */}
                  <div className={`absolute -right-1 -bottom-3 flex flex-col items-center transition-all duration-300 ${bHeavy ? 'translate-y-2' : aHeavy ? '-translate-y-1' : ''}`}>
                    <div className={`w-10 h-3 rounded-t-lg border border-b-0 transition-colors ${bHeavy ? 'bg-rose-600/40 border-rose-500' : 'bg-gray-800 border-gray-600'}`} />
                  </div>
                </div>

                {/* ⚖️ 중심 */}
                <div className="absolute text-lg z-10"><Emoji char="⚖️" size={18} /></div>
              </div>

              {/* 이름 + 비율 — 귀책 방향 표시 */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${aHeavy ? 'text-blue-400' : 'text-gray-500'}`}>
                  ← {nameA} 귀책 {resp.a}%
                </span>
                <span className={`font-bold ${bHeavy ? 'text-rose-400' : 'text-gray-500'}`}>
                  {nameB} 귀책 {resp.b}% →
                </span>
              </div>

              {/* 슬라이더 — 왼쪽=A 귀책↑, 오른쪽=B 귀책↑ */}
              <div className="relative">
                <div className="absolute inset-0 h-2 rounded-full overflow-hidden top-1/2 -translate-y-1/2 pointer-events-none flex">
                  <div className="h-full bg-blue-600/30" style={{ width: `${resp.a}%` }} />
                  <div className="h-full bg-rose-600/30 flex-1" />
                </div>
                <input
                  type="range"
                  min={0} max={100} step={10}
                  value={resp.b}
                  onChange={(e) => {
                    const b = Number(e.target.value)
                    setResponsibility(d.id, 100 - b, b)
                  }}
                  className="w-full accent-amber-500 h-2 relative z-10 opacity-80"
                />
              </div>

              {d.ambiguity === 'high' && (
                <div className="text-xs text-amber-500/60 mt-1"><Emoji char="⚠️" size={12} /> 모호성이 높은 쟁점</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
