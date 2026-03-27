import { useEffect, useState } from 'react'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { playPhaseTransition } from '../../engine/soundEngine'
import Emoji, { replaceEmojisInText } from '../common/Emoji'

const PHASE_INFO: Record<GamePhase, { title: string; subtitle: string; icon: string; unlocks?: string[] } | null> = {
  [GamePhase.Phase0_CaseIntro]: null,
  [GamePhase.Phase1_InitialStatement]: { title: '초기 진술', subtitle: '양측의 주장을 들어봅니다', icon: '🗣️' },
  [GamePhase.Phase2_Rebuttal]: { title: '즉각 반박', subtitle: '양측이 서로의 진술에 반박합니다', icon: '⚡' },
  [GamePhase.Phase3_Interrogation]: { title: '심문 개시', subtitle: '질문을 통해 진실을 파헤치세요', icon: '🔍' },
  [GamePhase.Phase4_Evidence]: { title: '증거 심리', subtitle: '확보한 증거를 공개하세요', icon: '📄', unlocks: ['📄 증거 제시 해금', '⚡ 즉답 요구 해금', '🔍 회피 판독 토글 해금'] },
  [GamePhase.Phase5_ReExamination]: { title: '최종 심문', subtitle: '붕괴된 쟁점을 깊이 파고드세요', icon: '🔬', unlocks: ['🔒 비공개 보호 토글 해금'] },
  [GamePhase.Phase6_Mediation]: { title: '중재안', subtitle: '판결 방식을 선택하세요', icon: '🤝' },
  [GamePhase.Phase7_Verdict]: { title: '최종 판결', subtitle: '사실과 책임, 해결책을 결정하세요', icon: '⚖️' },
  [GamePhase.Result]: null,
}

export default function PhaseTransition() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const caseData = useGameStore((s) => s.caseData)
  const [visible, setVisible] = useState(false)
  const [lastPhase, setLastPhase] = useState(currentPhase)

  useEffect(() => {
    if (currentPhase !== lastPhase) {
      const info = PHASE_INFO[currentPhase]
      if (info) {
        setVisible(true)
        playPhaseTransition()
        const timer = setTimeout(() => setVisible(false), 1800)
        setLastPhase(currentPhase)
        return () => clearTimeout(timer)
      }
      setLastPhase(currentPhase)
    }
  }, [currentPhase, lastPhase])

  if (!visible) return null

  const info = PHASE_INFO[currentPhase]
  if (!info) return null

  const nameA = caseData?.duo.partyA.name
  const nameB = caseData?.duo.partyB.name

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/85 animate-fade pointer-events-none">
      <div className="text-center space-y-2 animate-scale-in px-8">
        <div className="text-5xl mb-1"><Emoji char={info.icon} size={48} /></div>
        <div className="text-xl font-bold text-amber-400">{info.title}</div>
        <div className="text-sm text-gray-400">{info.subtitle}</div>
        {info.unlocks && info.unlocks.length > 0 && (
          <div className="pt-2 space-y-0.5">
            {info.unlocks.map((u, i) => (
              <div key={i} className="text-xs text-emerald-400/90">{replaceEmojisInText(u, 12)}</div>
            ))}
          </div>
        )}
        {nameA && nameB && (
          <div className="text-xs text-gray-600 pt-1">
            <span className="text-blue-400/60">{nameA}</span>
            <span className="mx-1.5">vs</span>
            <span className="text-rose-400/60">{nameB}</span>
          </div>
        )}
      </div>
    </div>
  )
}
