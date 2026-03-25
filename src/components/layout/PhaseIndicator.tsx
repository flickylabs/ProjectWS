import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.Phase0_CaseIntro]: '개요',
  [GamePhase.Phase1_InitialStatement]: '진술',
  [GamePhase.Phase2_Rebuttal]: '반박',
  [GamePhase.Phase3_Interrogation]: '심문',
  [GamePhase.Phase4_Evidence]: '증거',
  [GamePhase.Phase5_ReExamination]: '재심문',
  [GamePhase.Phase6_Mediation]: '중재',
  [GamePhase.Phase7_Verdict]: '판결',
  [GamePhase.Result]: '결과',
}

const PHASE_ORDER: GamePhase[] = [
  GamePhase.Phase0_CaseIntro,
  GamePhase.Phase1_InitialStatement,
  GamePhase.Phase2_Rebuttal,
  GamePhase.Phase3_Interrogation,
  GamePhase.Phase4_Evidence,
  GamePhase.Phase5_ReExamination,
  GamePhase.Phase7_Verdict,
  GamePhase.Result,
]

export default function PhaseIndicator() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const currentIdx = PHASE_ORDER.indexOf(currentPhase)

  return (
    <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
      {PHASE_ORDER.map((phase, i) => {
        const isCurrent = phase === currentPhase
        const isPast = i < currentIdx
        return (
          <div key={phase} className="flex items-center gap-0.5 shrink-0">
            <div
              className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                isCurrent
                  ? 'bg-amber-500 text-gray-950 font-bold'
                  : isPast
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-800/50 text-gray-600'
              }`}
            >
              {PHASE_LABELS[phase]}
            </div>
            {i < PHASE_ORDER.length - 1 && <span className="text-gray-700 text-xs">›</span>}
          </div>
        )
      })}
    </div>
  )
}
