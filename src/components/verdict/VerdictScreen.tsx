import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import { calculateVerdict } from '../../engine/verdictEngine'
import { recordGameComplete } from '../../hooks/useLocalStorage'
import { recordHistory } from '../layout/HistoryPanel'
import FactChecklist from './FactChecklist'
import ResponsibilitySlider from './ResponsibilitySlider'
import SolutionPicker from './SolutionPicker'
import EvidenceLegality from './EvidenceLegality'

export default function VerdictScreen() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setVerdictScore = useGameStore((s) => s.setVerdictScore)
  const advancePhase = useGameStore((s) => s.advancePhase)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const turnCount = useGameStore((s) => s.turnCount)
  const resources = useGameStore((s) => s.resources)

  if (!caseData) return null

  const hasFactFindings = Object.keys(verdictInput.factFindings).length > 0

  const handleSubmit = () => {
    const score = calculateVerdict({
      disputes: caseData.disputes,
      evidence: caseData.evidence,
      evidenceStates,
      input: verdictInput,
      turnsUsed: turnCount,
      courtControlRemaining: resources.courtControl,
    })
    setVerdictScore(score)
    if (caseData) {
      recordGameComplete(caseData.caseId, score.total)
      recordHistory({
        caseId: caseData.caseId, score: score.total,
        relationshipType: caseData.duo.relationshipType,
        nameA: caseData.duo.partyA.name, nameB: caseData.duo.partyB.name,
      })
    }
    advancePhase(GamePhase.Result)
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="text-center">
        <div className="text-amber-500 text-sm font-semibold tracking-widest">판결</div>
        <h2 className="text-xl font-bold mt-1">최종 판결을 내려주십시오</h2>
        <p className="text-xs text-gray-500 mt-1">사실 인정, 책임 배분, 해결책 선택, 증거 정당성 판단을 완료하세요.</p>
      </div>

      <FactChecklist />
      <ResponsibilitySlider />
      <SolutionPicker />
      <EvidenceLegality />

      {/* 제출 */}
      <div className="border-t border-gray-800 pt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={!hasFactFindings}
          className={`px-10 py-3 rounded-lg font-bold text-lg transition-colors ${
            hasFactFindings
              ? 'bg-amber-600 hover:bg-amber-500 text-gray-950'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          ⚖️ 판결 확정
        </button>
        {!hasFactFindings && (
          <p className="text-xs text-gray-600 mt-2">최소 하나의 쟁점에 대해 사실 인정을 해야 판결할 수 있습니다.</p>
        )}
      </div>
    </div>
  )
}
