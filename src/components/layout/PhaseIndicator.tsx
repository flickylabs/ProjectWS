import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.Phase0_CaseIntro]: '개요',
  [GamePhase.Phase1_InitialStatement]: '진술',
  [GamePhase.Phase2_Rebuttal]: '반박',
  [GamePhase.Phase3_Interrogation]: '심문',
  [GamePhase.Phase4_Evidence]: '심문',      // 통합: Phase4도 '심문'으로 표시
  [GamePhase.Phase5_ReExamination]: '심문', // 통합: Phase5도 '심문'으로 표시
  [GamePhase.Phase6_Mediation]: '조정',
  [GamePhase.Phase7_Verdict]: '판결',
  [GamePhase.Result]: '결과',
}

/** 통합된 Phase 순서 — Phase4/5 제외 */
const DISPLAY_ORDER: GamePhase[] = [
  GamePhase.Phase0_CaseIntro,
  GamePhase.Phase1_InitialStatement,
  GamePhase.Phase2_Rebuttal,
  GamePhase.Phase3_Interrogation,
  GamePhase.Phase6_Mediation,
  GamePhase.Phase7_Verdict,
  GamePhase.Result,
]

export default function PhaseIndicator() {
  const currentPhase = useGameStore((s) => s.currentPhase)

  // Phase4/5는 Phase3과 같은 '심문'으로 매핑
  const displayPhase =
    currentPhase === GamePhase.Phase4_Evidence || currentPhase === GamePhase.Phase5_ReExamination
      ? GamePhase.Phase3_Interrogation
      : currentPhase
  const currentIdx = DISPLAY_ORDER.indexOf(displayPhase)

  const prev = currentIdx > 0 ? PHASE_LABELS[DISPLAY_ORDER[currentIdx - 1]] : null
  const current = PHASE_LABELS[displayPhase] ?? ''
  const next = currentIdx < DISPLAY_ORDER.length - 1 ? PHASE_LABELS[DISPLAY_ORDER[currentIdx + 1]] : null

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
