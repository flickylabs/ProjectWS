import { useGameStore } from '../../store/useGameStore'

export default function SolutionPicker() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const selectSolution = useGameStore((s) => s.selectSolution)
  const removeSolution = useGameStore((s) => s.removeSolution)

  if (!caseData) return null

  const solutions = caseData.solutions

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400">③ 해결책 선택</h3>
      <p className="text-xs text-gray-500">각 영역에서 적절한 해결책을 선택하세요. 복수 선택 가능합니다.</p>

      <div className="space-y-3">
        {Object.entries(solutions).map(([category, options]) => (
          <div key={category} className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-300 mb-2">{category}</div>
            <div className="flex flex-wrap gap-1.5">
              {options.map((option) => {
                const key = `${category}::${option}`
                const isSelected = verdictInput.selectedSolutions.includes(key)
                return (
                  <button
                    key={key}
                    onClick={() => isSelected ? removeSolution(key) : selectSolution(key)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
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
        ))}
      </div>
    </div>
  )
}
