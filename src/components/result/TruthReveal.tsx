import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

export default function TruthReveal() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)

  if (!caseData) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400 text-center">숨겨진 진실</h3>

      <div className="space-y-2">
        {caseData.disputes.map((d) => {
          const playerAnswer = verdictInput.factFindings[d.id]
          const correct = d.truth
          const playerCorrect =
            playerAnswer === 'pending'
              ? null
              : (playerAnswer === 'true') === correct

          return (
            <div key={d.id} className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-200">{d.name}</span>
                {playerCorrect === true && <span className="text-xs text-emerald-400 font-bold"><Emoji char="✓" size={10} /> 정확</span>}
                {playerCorrect === false && <span className="text-xs text-red-400 font-bold"><Emoji char="✗" size={10} /> 오답</span>}
                {playerCorrect === null && <span className="text-xs text-gray-500">— 보류</span>}
              </div>

              <div className="text-xs space-y-1">
                <div className="text-gray-400">
                  <span className="text-gray-600">실제 진실:</span> {d.truthDescription}
                </div>
                <div className="text-gray-500">
                  <span className="text-gray-600">정답 책임:</span>{' '}
                  {caseData.duo.partyA.name} {d.correctResponsibility.a}% / {caseData.duo.partyB.name} {d.correctResponsibility.b}%
                </div>
                {verdictInput.responsibility[d.id] && (
                  <div className="text-gray-500">
                    <span className="text-gray-600">당신의 판단:</span>{' '}
                    {caseData.duo.partyA.name} {verdictInput.responsibility[d.id].a}% / {caseData.duo.partyB.name} {verdictInput.responsibility[d.id].b}%
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
