import type { PartyId } from '../../types'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

interface Props {
  party: PartyId
}

export default function PartyPortrait({ party }: Props) {
  const caseData = useStore((s) => s.caseData)
  const agent = useStore((s) => (party === 'a' ? s.agentA : s.agentB))

  if (!caseData) return null

  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const isA = party === 'a'

  const emotionColors: Record<string, string> = {
    defensive: 'border-blue-500',
    confident: 'border-green-500',
    shaken: 'border-yellow-500',
    angry: 'border-red-500',
    resigned: 'border-gray-500',
  }

  const emotionEmoji: Record<string, string> = {
    defensive: '🛡️',
    confident: '😤',
    shaken: '😰',
    angry: '🔥',
    resigned: '😔',
  }

  return (
    <div className={`flex flex-col items-center gap-2 p-3 ${isA ? 'items-start' : 'items-end'}`}>
      {/* 아바타 원 */}
      <div
        className={`w-16 h-16 rounded-full border-3 flex items-center justify-center text-2xl bg-gray-800 ${
          emotionColors[agent.emotionalState.phase]
        }`}
      >
        <Emoji char={isA ? '👨' : '👩'} size={24} />
      </div>

      {/* 이름 + 관계 */}
      <div className={`text-center ${isA ? 'text-left' : 'text-right'}`}>
        <div className="font-bold text-sm">
          <span className={isA ? 'text-blue-400' : 'text-rose-400'}>{profile.name}</span>
          <span className="text-gray-600 text-xs ml-1">({profile.age})</span>
        </div>
        <div className="text-xs text-gray-500">{profile.occupation}</div>
      </div>

      {/* 감정 상태 */}
      <div className={`text-xs px-2 py-1 rounded bg-gray-800/50 max-w-[160px] ${isA ? 'text-left' : 'text-right'}`}>
        <Emoji char={emotionEmoji[agent.emotionalState.phase]} size={14} className="mr-1" />
        <span className="text-gray-400">{agent.emotionalState.behaviorHint || '평온한 상태.'}</span>
      </div>
    </div>
  )
}
