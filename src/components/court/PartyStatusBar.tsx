import { useGameStore } from '../../store/useGameStore'

export default function PartyStatusBar() {
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const separationTarget = useGameStore((s) => s.separationTarget)
  const separationTurns = useGameStore((s) => s.separationTurns)

  if (!caseData) return null

  const emotionEmoji: Record<string, string> = {
    defensive: '🛡️', confident: '😤', shaken: '😰', angry: '🔥', resigned: '😔',
  }

  // 분리심문 중이면 배제된 쪽을 표시
  const aExcluded = separationTarget === 'b'  // B와 분리심문 중 = A가 배제
  const bExcluded = separationTarget === 'a'  // A와 분리심문 중 = B가 배제

  return (
    <div className="flex border-b border-gray-800 bg-gray-900/50">
      {/* Party A */}
      <div className={`flex-1 flex items-center gap-2 px-3 py-2 border-r border-gray-800 ${aExcluded ? 'opacity-30' : ''}`}>
        <div className="w-8 h-8 rounded-full bg-blue-900/50 border-2 border-blue-600 flex items-center justify-center text-sm">👨</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-blue-400 truncate">{caseData.duo.partyA.name}</span>
            <span className="text-xs">{emotionEmoji[agentA.emotionalState.phase]}</span>
            {aExcluded && <span className="text-xs text-gray-500">🚪</span>}
          </div>
          <div className="text-xs text-gray-600 truncate">
            {aExcluded ? '퇴장됨' : agentA.emotionalState.behaviorHint?.slice(0, 20) || '평온'}
          </div>
        </div>
      </div>

      {/* VS / 분리심문 표시 */}
      <div className="flex flex-col items-center justify-center px-2">
        {separationTarget ? (
          <>
            <span className="text-xs text-amber-500">🚪</span>
            <span className="text-xs text-amber-500 font-bold">{separationTurns}</span>
          </>
        ) : (
          <span className="text-xs text-gray-600 font-bold">VS</span>
        )}
      </div>

      {/* Party B */}
      <div className={`flex-1 flex items-center gap-2 px-3 py-2 border-l border-gray-800 flex-row-reverse ${bExcluded ? 'opacity-30' : ''}`}>
        <div className="w-8 h-8 rounded-full bg-rose-900/50 border-2 border-rose-600 flex items-center justify-center text-sm">👩</div>
        <div className="min-w-0 flex-1 text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-xs">{emotionEmoji[agentB.emotionalState.phase]}</span>
            <span className="text-xs font-bold text-rose-400 truncate">{caseData.duo.partyB.name}</span>
            {bExcluded && <span className="text-xs text-gray-500">🚪</span>}
          </div>
          <div className="text-xs text-gray-600 truncate">
            {bExcluded ? '퇴장됨' : agentB.emotionalState.behaviorHint?.slice(0, 20) || '평온'}
          </div>
        </div>
      </div>
    </div>
  )
}
