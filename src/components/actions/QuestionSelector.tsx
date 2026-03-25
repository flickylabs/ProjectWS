import type { QuestionType, PartyId } from '../../types'
import { useValidActions } from '../../hooks/useValidActions'

interface Props {
  target: PartyId | null
  onSelect: (type: QuestionType, disputeId: string) => void
}

export default function QuestionSelector({ target, onSelect }: Props) {
  const { questions } = useValidActions(target)

  if (!target) {
    return <div className="text-gray-500 text-xs py-2">먼저 질문할 대상을 선택하세요.</div>
  }

  return (
    <div className="space-y-2">
      {questions.map((q) => (
        <div key={q.type} className={`rounded-lg border p-2 ${q.anyEnabled ? 'border-gray-700 bg-gray-800/40' : 'border-gray-800/50 bg-gray-900/30 opacity-50'}`}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm">{q.icon}</span>
            <span className={`text-xs font-semibold ${q.anyEnabled ? 'text-gray-200' : 'text-gray-600'}`}>{q.label}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {q.disputes.map((d) => (
              <button
                key={d.id}
                onClick={() => d.enabled && onSelect(q.type, d.id)}
                disabled={!d.enabled}
                title={d.reason}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  d.enabled
                    ? 'bg-gray-700 hover:bg-amber-700 text-gray-300 hover:text-white'
                    : 'bg-gray-800/30 text-gray-700 cursor-not-allowed line-through'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
