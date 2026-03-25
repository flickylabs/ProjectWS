import { useState, useEffect } from 'react'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'

interface TutorialStep {
  phase: GamePhase
  trigger: 'phase_enter' | 'first_action'
  title: string
  message: string
  icon: string
  position: 'top' | 'center' | 'bottom'
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    phase: GamePhase.Phase1_InitialStatement,
    trigger: 'phase_enter',
    title: '초기 진술',
    message: '양측의 주장을 잘 들어보세요. 누가 더 그럴듯한지가 아니라, 어디서 모순이 보이는지 집중하세요.',
    icon: '👂',
    position: 'center',
  },
  {
    phase: GamePhase.Phase3_Interrogation,
    trigger: 'phase_enter',
    title: '심문 시작',
    message: '하단에서 대상(민준/서연)을 선택하고, 질문 유형과 쟁점을 골라 질문하세요. 비활성화된 선택지는 현재 의미 없는 조합입니다.',
    icon: '🔍',
    position: 'bottom',
  },
  {
    phase: GamePhase.Phase4_Evidence,
    trigger: 'phase_enter',
    title: '증거 제시',
    message: '확보한 증거를 대상에게 제시하면 거짓말이 붕괴됩니다. 증거 탭에서 4축 정보(신뢰도/완전성/출처/정당성)를 확인하세요.',
    icon: '📄',
    position: 'bottom',
  },
  {
    phase: GamePhase.Phase5_ReExamination,
    trigger: 'phase_enter',
    title: '재심문 & 신뢰 루트',
    message: '신뢰 탭에서 비공개 진술 보호, 감정 안정화를 사용해보세요. 압박만으로는 나오지 않는 진실이 있습니다.',
    icon: '🤝',
    position: 'bottom',
  },
  {
    phase: GamePhase.Phase6_Mediation,
    trigger: 'phase_enter',
    title: '중재안',
    message: '바로 판결할 수도 있고, 조건부 조정안을 제시할 수도 있습니다. 솔로몬다운 지혜를 보여주세요.',
    icon: '⚖️',
    position: 'center',
  },
  {
    phase: GamePhase.Phase7_Verdict,
    trigger: 'phase_enter',
    title: '최종 판결',
    message: '사실 인정 → 책임 배분 → 해결책 선택. 위법 증거를 판결 근거로 쓰면 권위 점수가 떨어집니다.',
    icon: '📋',
    position: 'center',
  },
]

const TUTORIAL_STORAGE_KEY = 'solomon-tutorial'

function getSeenSteps(): Set<string> {
  try {
    const raw = localStorage.getItem(TUTORIAL_STORAGE_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function markSeen(stepKey: string) {
  const seen = getSeenSteps()
  seen.add(stepKey)
  localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify([...seen]))
}

export default function Tutorial() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const [visible, setVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null)

  useEffect(() => {
    const seen = getSeenSteps()
    const step = TUTORIAL_STEPS.find(
      (s) => s.phase === currentPhase && s.trigger === 'phase_enter' && !seen.has(`${s.phase}-${s.trigger}`),
    )
    if (step) {
      // Phase 전환 연출 이후에 표시
      const timer = setTimeout(() => {
        setCurrentStep(step)
        setVisible(true)
      }, 2200)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [currentPhase])

  const handleDismiss = () => {
    if (currentStep) {
      markSeen(`${currentStep.phase}-${currentStep.trigger}`)
    }
    setVisible(false)
  }

  if (!visible || !currentStep) return null

  const positionClass = {
    top: 'items-start pt-20',
    center: 'items-center',
    bottom: 'items-end pb-48',
  }[currentStep.position]

  return (
    <div
      className={`fixed inset-0 z-30 bg-gray-950/70 flex justify-center px-6 ${positionClass}`}
      onClick={handleDismiss}
    >
      <div
        className="bg-gray-900 border border-amber-700/50 rounded-xl p-5 max-w-sm w-full shadow-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-3">
          <div className="text-3xl">{currentStep.icon}</div>
          <div className="text-sm font-bold text-amber-400">{currentStep.title}</div>
          <p className="text-xs text-gray-300 leading-relaxed">{currentStep.message}</p>
          <button
            onClick={handleDismiss}
            className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-semibold px-6 py-1.5 rounded-lg text-xs transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
