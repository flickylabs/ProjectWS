import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'

interface Props {
  selected: PartyId | null
  onSelect: (target: PartyId) => void
}

export default function TargetSelector({ selected, onSelect }: Props) {
  const caseData = useGameStore((s) => s.caseData)
  if (!caseData) return null

  const parties: { id: PartyId; name: string; color: string }[] = [
    { id: 'a', name: caseData.duo.partyA.name, color: 'blue' },
    { id: 'b', name: caseData.duo.partyB.name, color: 'rose' },
  ]

  return (
    <div className="flex gap-2">
      {parties.map((p) => {
        const isSelected = selected === p.id
        const base = p.color === 'blue'
          ? isSelected ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-800 text-blue-400 border-gray-700 hover:border-blue-600'
          : isSelected ? 'bg-rose-600 text-white border-rose-500' : 'bg-gray-800 text-rose-400 border-gray-700 hover:border-rose-600'
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`border rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${base}`}
          >
            {p.name}
          </button>
        )
      })}
    </div>
  )
}
