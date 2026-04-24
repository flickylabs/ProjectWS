import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GamePhase, Phase } from '../../types'
import { useStore } from '../../store/useGameStore'
import { playPhaseTransition, playBgm } from '../../engine/soundEngine'

interface CutsceneSpec {
  label: string
  title: string
  subtitle: string
}

/** Phase 전환 시 컷씬에 노출할 3단 카피. 정의되지 않은 Phase는 컷씬 없이 조용히 전환. */
const PHASE_CUTSCENE: Partial<Record<GamePhase, CutsceneSpec>> = {
  [Phase.Pretrial]: {
    label: 'Phase 1',
    title: '초기 진술',
    subtitle: '초기 진술을 주의깊게 관찰해주세요.',
  },
  [Phase.Interrogation]: {
    label: 'Phase 2',
    title: '심문',
    subtitle: '직접 심문을 통해 진실을 파악해주세요.',
  },
  [Phase.Mediation]: {
    label: 'Phase 3',
    title: '중재',
    subtitle: '사건에 대한 중재안을 제시해주세요.',
  },
  [Phase.Verdict]: {
    label: 'Phase 4',
    title: '판결',
    subtitle: '판단 내용을 기준으로 판결을 내려주세요.',
  },
}

/** Phase 진입 시 전환할 BGM 트랙. 이전 Phase와 같은 트랙이면 playBgm 내부에서 no-op. */
const PHASE_BGM: Partial<Record<GamePhase, string>> = {
  [Phase.Briefing]: '/bgm/court.mp3',
  [Phase.Pretrial]: '/bgm/court.mp3',
  [Phase.Interrogation]: '/bgm/court.mp3',
  [Phase.Mediation]: '/bgm/verdict.mp3',
  [Phase.Verdict]: '/bgm/verdict.mp3',
  [Phase.Result]: '/bgm/result.mp3',
}

const CUTSCENE_DURATION_MS = 2300

export default function PhaseTransition() {
  const currentPhase = useStore((s) => s.currentPhase)
  const [visible, setVisible] = useState(false)
  const [activeSpec, setActiveSpec] = useState<CutsceneSpec | null>(null)
  // ref 기반 추적 — state로 두면 dep 재실행이 타이머 cleanup을 유발함
  const lastPhaseRef = useRef<GamePhase | null>(null)
  // timer를 ref로 유지 — StrictMode의 cleanup 이중 실행이 타이머를 취소하지 않도록
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (currentPhase === lastPhaseRef.current) return
    lastPhaseRef.current = currentPhase

    const bgmTrack = PHASE_BGM[currentPhase]
    if (bgmTrack) playBgm(bgmTrack)

    const spec = PHASE_CUTSCENE[currentPhase]
    if (!spec) return

    // Phase 변경 시에만 이전 타이머 명시적으로 취소 (StrictMode cleanup에서는 취소 안 함)
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setActiveSpec(spec)
    setVisible(true)
    playPhaseTransition()
    timerRef.current = window.setTimeout(() => {
      setVisible(false)
      timerRef.current = null
    }, CUTSCENE_DURATION_MS)
  }, [currentPhase])

  // unmount 시에만 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  if (!visible || !activeSpec) return null

  // key={activeSpec.label} — Phase가 바뀌면 DOM 교체되어 CSS animation 재시작
  return createPortal(
    <div className="pc-phase-cutscene" role="presentation" key={activeSpec.label}>
      <div className="pc-phase-cutscene__band">
        <div className="pc-phase-cutscene__label">{activeSpec.label}</div>
        <h2 className="pc-phase-cutscene__title">{activeSpec.title}</h2>
        <p className="pc-phase-cutscene__subtitle">{activeSpec.subtitle}</p>
      </div>
    </div>,
    document.body,
  )
}
