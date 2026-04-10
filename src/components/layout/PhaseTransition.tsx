import { useEffect, useState } from 'react'
import { GamePhase } from '../../types'
import { useStore } from '../../store/useGameStore'
import { playPhaseTransition, playBgm, stopBgm } from '../../engine/soundEngine'

/** Phase별 BGM 매핑 */
const PHASE_BGM: Partial<Record<GamePhase, string>> = {
  [GamePhase.Phase1_InitialStatement]: '/bgm/court.mp3',
  [GamePhase.Phase2_Rebuttal]: '/bgm/court.mp3',
  [GamePhase.Phase3_Interrogation]: '/bgm/court.mp3',
  [GamePhase.Phase4_Evidence]: '/bgm/court.mp3',
  [GamePhase.Phase5_ReExamination]: '/bgm/court.mp3',
  [GamePhase.Phase6_Mediation]: '/bgm/court.mp3',
  [GamePhase.Phase7_Verdict]: '/bgm/verdict.mp3',
  [GamePhase.Result]: '/bgm/result.mp3',
}
import PCSvgIcon from '../pc/icons/PCSvgIcon'

const PHASE_INFO: Record<GamePhase, { title: string; subtitle: string; iconId: string; unlocks?: string[] } | null> = {
  [GamePhase.Phase0_CaseIntro]: null,
  [GamePhase.Phase1_InitialStatement]: { title: '초기 진술', subtitle: '양측의 주장을 들어봅니다', iconId: 'i-person' },
  [GamePhase.Phase2_Rebuttal]: { title: '즉각 반박', subtitle: '양측이 서로의 진술에 반박합니다', iconId: 'i-bolt' },
  [GamePhase.Phase3_Interrogation]: { title: '심문 개시', subtitle: '질문을 통해 진실을 파헤치세요', iconId: 'i-search' },
  [GamePhase.Phase4_Evidence]: { title: '증거 심리', subtitle: '확보한 증거를 공개하세요', iconId: 'i-doc', unlocks: ['증거 제시 해금', '즉답 요구 해금'] },
  [GamePhase.Phase5_ReExamination]: { title: '최종 심문', subtitle: '붕괴된 쟁점을 깊이 파고드세요', iconId: 'i-eye', unlocks: ['비공개 보호 해금'] },
  [GamePhase.Phase6_Mediation]: { title: '중재안', subtitle: '판결 방식을 선택하세요', iconId: 'i-heart' },
  [GamePhase.Phase7_Verdict]: { title: '최종 판결', subtitle: '사실과 책임, 해결책을 결정하세요', iconId: 'i-scale' },
  [GamePhase.Result]: null,
}

export default function PhaseTransition() {
  const currentPhase = useStore((s) => s.currentPhase)
  const caseData = useStore((s) => s.caseData)
  const [visible, setVisible] = useState(false)
  const [lastPhase, setLastPhase] = useState<GamePhase | null>(null)

  useEffect(() => {
    if (currentPhase !== lastPhase) {
      const info = PHASE_INFO[currentPhase]
      if (info) {
        setVisible(true)
        playPhaseTransition()
        // Phase별 BGM 전환
        const bgmTrack = PHASE_BGM[currentPhase]
        if (bgmTrack) playBgm(bgmTrack)
        const timer = setTimeout(() => setVisible(false), 1800)
        setLastPhase(currentPhase)
        return () => clearTimeout(timer)
      }
      // BGM 전환 (info가 없는 Phase — Result 등)
      const bgmTrack = PHASE_BGM[currentPhase]
      if (bgmTrack) playBgm(bgmTrack)
      else if (currentPhase === GamePhase.Phase0_CaseIntro) stopBgm()
      setLastPhase(currentPhase)
    }
  }, [currentPhase, lastPhase])

  if (!visible) return null

  const info = PHASE_INFO[currentPhase]
  if (!info) return null

  const nameA = caseData?.duo.partyA.name
  const nameB = caseData?.duo.partyB.name

  return (
    <div className="pc-phase-transition">
      <div className="pc-phase-transition__card">
        <span className="pc-phase-transition__icon">
          <PCSvgIcon id={info.iconId} size={48} />
        </span>
        <h2 className="pc-phase-transition__title">{info.title}</h2>
        <p className="pc-phase-transition__subtitle">{info.subtitle}</p>
        {info.unlocks && info.unlocks.length > 0 ? (
          <div className="pc-phase-transition__unlocks">
            {info.unlocks.map((u, i) => (
              <span className="pc-phase-transition__unlock" key={i}>
                <PCSvgIcon id="i-bolt" size={12} />
                <span>{u}</span>
              </span>
            ))}
          </div>
        ) : null}
        {nameA && nameB ? (
          <div className="pc-phase-transition__parties">
            <span className="pc-phase-transition__party-a">{nameA}</span>
            <span className="pc-phase-transition__vs">vs</span>
            <span className="pc-phase-transition__party-b">{nameB}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
