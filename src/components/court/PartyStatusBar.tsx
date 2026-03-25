import { useGameStore } from '../../store/useGameStore'

const EMOTION_CONFIG: Record<string, { emoji: string; color: string; label: string }> = {
  defensive: { emoji: '🛡️', color: 'border-blue-500', label: '방어적' },
  confident: { emoji: '😤', color: 'border-green-500', label: '자신감' },
  shaken: { emoji: '😰', color: 'border-yellow-500', label: '동요' },
  angry: { emoji: '🔥', color: 'border-red-500', label: '분노' },
  resigned: { emoji: '😔', color: 'border-gray-500', label: '체념' },
}

export default function PartyStatusBar() {
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const separationTarget = useGameStore((s) => s.separationTarget)
  const separationTurns = useGameStore((s) => s.separationTurns)

  if (!caseData) return null

  const emoA = EMOTION_CONFIG[agentA.emotionalState.phase] ?? EMOTION_CONFIG.defensive
  const emoB = EMOTION_CONFIG[agentB.emotionalState.phase] ?? EMOTION_CONFIG.defensive
  const aExcluded = separationTarget === 'b'
  const bExcluded = separationTarget === 'a'

  return (
    <div className="flex items-center border-b border-gray-800/60 bg-gray-900/50 px-2 py-1.5">
      {/* Party A */}
      <div className={`flex-1 flex items-center gap-2 ${aExcluded ? 'opacity-25' : ''}`}>
        <div className={`w-8 h-8 rounded-full bg-blue-950/50 border-2 ${emoA.color} flex items-center justify-center text-sm transition-colors`}>
          {aExcluded ? '🚪' : emoA.emoji}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-blue-400 truncate">{caseData.duo.partyA.name}</span>
            {!aExcluded && <span className="text-xs text-gray-600">{emoA.label}</span>}
          </div>
          {!aExcluded && (
            <div className="text-xs text-gray-600 truncate leading-tight">{agentA.emotionalState.behaviorHint?.slice(0, 25) || ''}</div>
          )}
        </div>
      </div>

      {/* 중앙 */}
      <div className="flex flex-col items-center px-2 shrink-0">
        {separationTarget ? (
          <>
            <span className="text-xs text-amber-500">🚪</span>
            <span className="text-xs text-amber-500 font-bold leading-none">{separationTurns}</span>
          </>
        ) : (
          <span className="text-xs text-gray-700 font-black">VS</span>
        )}
      </div>

      {/* Party B */}
      <div className={`flex-1 flex items-center gap-2 flex-row-reverse ${bExcluded ? 'opacity-25' : ''}`}>
        <div className={`w-8 h-8 rounded-full bg-rose-950/50 border-2 ${emoB.color} flex items-center justify-center text-sm transition-colors`}>
          {bExcluded ? '🚪' : emoB.emoji}
        </div>
        <div className="min-w-0 text-right">
          <div className="flex items-center justify-end gap-1">
            {!bExcluded && <span className="text-xs text-gray-600">{emoB.label}</span>}
            <span className="text-xs font-bold text-rose-400 truncate">{caseData.duo.partyB.name}</span>
          </div>
          {!bExcluded && (
            <div className="text-xs text-gray-600 truncate leading-tight">{agentB.emotionalState.behaviorHint?.slice(0, 25) || ''}</div>
          )}
        </div>
      </div>
    </div>
  )
}
