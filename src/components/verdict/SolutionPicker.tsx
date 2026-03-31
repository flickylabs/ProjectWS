import { useGameStore } from '../../store/useGameStore'

interface Props {
  currentIdx: number
  onChangeIdx: (i: number) => void
}

export default function SolutionPicker({ currentIdx, onChangeIdx }: Props) {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const selectSolution = useGameStore((s) => s.selectSolution)
  const removeSolution = useGameStore((s) => s.removeSolution)

  if (!caseData) return null

  const categories = Object.entries(caseData.solutions)
  if (categories.length === 0) return null

  const safeIdx = Math.min(currentIdx, categories.length - 1)
  const [category, options] = categories[safeIdx]
  const selectedCount = verdictInput.selectedSolutions.length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-amber-400">③ 해결책 선택</h3>
        <span className="text-xs text-gray-500">{selectedCount}개 선택</span>
      </div>
      <p className="text-xs text-gray-500">각 영역에서 적절한 해결책을 선택하세요.</p>

      {/* 카테고리 카드 — 1개씩 */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 min-h-[100px] animate-fade-in" key={category}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-200">{category}</div>
          <span className="text-xs text-gray-600">{safeIdx + 1} / {categories.length}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const key = `${category}::${option}`
            const isSelected = verdictInput.selectedSolutions.includes(key)
            return (
              <button
                key={key}
                onClick={() => isSelected ? removeSolution(key) : selectSolution(key)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-amber-700 border-amber-600 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-amber-600'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* 네비게이션 dot */}
      <div className="flex items-center justify-center gap-2">
        {categories.map(([cat], i) => {
          const hasSelection = categories[i][1].some(opt =>
            verdictInput.selectedSolutions.includes(`${categories[i][0]}::${opt}`)
          )
          return (
            <button key={cat} onClick={() => onChangeIdx(i)}
              className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                i === safeIdx ? 'ring-2 ring-amber-400 scale-110' : ''
              } ${hasSelection ? 'bg-amber-600 text-gray-950' : 'bg-gray-800 text-gray-500'}`}>
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
