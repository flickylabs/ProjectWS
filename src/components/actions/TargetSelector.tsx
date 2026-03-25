import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'

interface Props {
  selected: PartyId | null
  onSelect: (target: PartyId) => void
}

export default function TargetSelector({ selected, onSelect }: Props) {
  const caseData = useGameStore((s) => s.caseData)
  if (!caseData) return null

  return (
    <div className="flex gap-1 shrink-0">
      <TargetBtn
        id="a" name={caseData.duo.partyA.name} selected={selected === 'a'}
        activeClass="bg-blue-600/90 text-white ring-1 ring-blue-400/50"
        inactiveClass="text-blue-400/70 hover:bg-blue-950/40"
        onSelect={() => onSelect('a')}
      />
      <TargetBtn
        id="b" name={caseData.duo.partyB.name} selected={selected === 'b'}
        activeClass="bg-rose-600/90 text-white ring-1 ring-rose-400/50"
        inactiveClass="text-rose-400/70 hover:bg-rose-950/40"
        onSelect={() => onSelect('b')}
      />
    </div>
  )
}

function TargetBtn({ name, selected, activeClass, inactiveClass, onSelect }: {
  id: string; name: string; selected: boolean; activeClass: string; inactiveClass: string; onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all ${selected ? activeClass : inactiveClass}`}
    >
      {name}
    </button>
  )
}
