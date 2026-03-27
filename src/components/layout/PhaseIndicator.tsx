import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.Phase0_CaseIntro]: '개요',
  [GamePhase.Phase1_InitialStatement]: '진술',
  [GamePhase.Phase2_Rebuttal]: '반박',
  [GamePhase.Phase3_Interrogation]: '심문',
  [GamePhase.Phase4_Evidence]: '증거 심리',
  [GamePhase.Phase5_ReExamination]: '최종 심문',
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

  const prev = currentIdx > 0 ? PHASE_LABELS[PHASE_ORDER[currentIdx - 1]] : null
  const current = PHASE_LABELS[currentPhase] ?? ''
  const next = currentIdx < PHASE_ORDER.length - 1 ? PHASE_LABELS[PHASE_ORDER[currentIdx + 1]] : null

  return (
    <div className="flex items-center justify-center gap-3">
      {prev && <span className="text-xs text-gray-600">{prev}</span>}
      {prev && <span className="text-gray-700 text-xs">›</span>}
      <span className="text-sm font-bold text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded-lg">{current}</span>
      {next && <span className="text-gray-700 text-xs">›</span>}
      {next && <span className="text-xs text-gray-600">{next}</span>}
    </div>
  )
}
