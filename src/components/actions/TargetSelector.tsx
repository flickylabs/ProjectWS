import type { PartyId } from '../../types'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

interface Props {
  selected: PartyId | null
  onSelect: (target: PartyId) => void
}

function getEmotionEmoji(phase?: string): string {
  switch (phase) {
    case 'angry': return '😡'
    case 'shaken': return '😰'
    case 'confident': return '😤'
    case 'resigned': return '😞'
    default: return '😐'
  }
}

export default function TargetSelector({ selected, onSelect }: Props) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  if (!caseData) return null

  const emoA = getEmotionEmoji(agentA?.emotionalState?.phase)
  const emoB = getEmotionEmoji(agentB?.emotionalState?.phase)

  return (
    <div className="flex gap-1.5 shrink-0">
      <button
        onClick={() => onSelect('a')}
        className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold transition-all active:scale-95 ${
          selected === 'a'
            ? 'bg-blue-600/90 text-white ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/20'
            : 'text-blue-400/70 hover:bg-blue-950/40 ring-1 ring-blue-800/30'
        }`}
      >
        <Emoji char={emoA} size={14} />
        {caseData.duo.partyA.name}
      </button>
      <button
        onClick={() => onSelect('b')}
        className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold transition-all active:scale-95 ${
          selected === 'b'
            ? 'bg-rose-600/90 text-white ring-2 ring-rose-400/50 shadow-lg shadow-rose-500/20'
            : 'text-rose-400/70 hover:bg-rose-950/40 ring-1 ring-rose-800/30'
        }`}
      >
        <Emoji char={emoB} size={14} />
        {caseData.duo.partyB.name}
      </button>
    </div>
  )
}
