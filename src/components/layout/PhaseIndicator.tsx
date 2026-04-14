import { GamePhase, Phase } from '../../types'
import { useStore } from '../../store/useGameStore'

const PHASE_LABELS: Record<GamePhase, string> = {
  [Phase.Briefing]: '개요',
  [Phase.Pretrial]: '진술',
  [GamePhase.Phase2_Rebuttal]: '반박',
  [Phase.Interrogation]: '심문',
  [GamePhase.Phase4_Evidence]: '심문',      // 통합: Phase4도 '심문'으로 표시
  [GamePhase.Phase5_ReExamination]: '심문', // 통합: Phase5도 '심문'으로 표시
  [Phase.Mediation]: '조정',
  [Phase.Verdict]: '판결',
  [Phase.Result]: '결과',
}

/** 통합된 Phase 순서 — Phase4/5 제외 */
const DISPLAY_ORDER: GamePhase[] = [
  Phase.Briefing,
  Phase.Pretrial,
  Phase.Interrogation,
  Phase.Mediation,
  Phase.Verdict,
  Phase.Result,
]

export default function PhaseIndicator({ compact }: { compact?: boolean } = {}) {
  const currentPhase = useStore((s) => s.currentPhase)

  // Phase4/5는 Phase3과 같은 '심문'으로 매핑
  const displayPhase =
    currentPhase === GamePhase.Phase4_Evidence || currentPhase === GamePhase.Phase5_ReExamination
      ? Phase.Interrogation
      : currentPhase
  const currentIdx = DISPLAY_ORDER.indexOf(displayPhase)

  const prev = currentIdx > 0 ? PHASE_LABELS[DISPLAY_ORDER[currentIdx - 1]] : null
  const current = PHASE_LABELS[displayPhase] ?? ''
  const next = currentIdx < DISPLAY_ORDER.length - 1 ? PHASE_LABELS[DISPLAY_ORDER[currentIdx + 1]] : null

  if (compact) {
    return (
      <span className="text-sm font-bold text-amber-400 px-2.5 py-0.5 bg-amber-500/10 ring-1 ring-amber-500/15 rounded-lg drop-shadow-[0_0_8px_rgba(217,119,6,0.2)]">{current}</span>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {prev && <span className="text-xs text-gray-600">{prev}</span>}
      {prev && <span className="text-gray-700 text-xs">›</span>}
      <span className="text-sm font-bold text-amber-400 px-2.5 py-0.5 bg-amber-500/10 ring-1 ring-amber-500/15 rounded-lg">{current}</span>
      {next && <span className="text-gray-700 text-xs">›</span>}
      {next && <span className="text-xs text-gray-600">{next}</span>}
    </div>
  )
}
