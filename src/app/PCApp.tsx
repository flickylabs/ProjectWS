import { useEffect, useState } from 'react'
import { GamePhase } from '../types'
import { useGameStore, useStore } from '../store/useGameStore'
import { checkConnection } from '../engine/llmClient'
import { setLLMMode, isLLMMode } from '../hooks/useActionDispatch'
import { getRandomCase } from '../data/cases'
import { generatePhase2Dialogues } from '../engine/llmPhaseDialogue'
import { loadPrompts, startPromptPolling } from '../api/promptManager'
import { loadAgents, startAgentPolling, snapshotForSession } from '../api/agentManager'
import { registerAllEnrichments } from '../data/caseEnrichment'
import Emoji from '../components/common/Emoji'
import PhaseTransition from '../components/layout/PhaseTransition'
import Phase0_CaseIntro, { resetPrefetch } from '../components/phase/Phase0_CaseIntro'
import AutoDialoguePhase from '../components/phase/AutoDialoguePhase'
import Phase6_Mediation from '../components/phase/Phase6_Mediation'
import ActionPanel from '../components/actions/ActionPanel'
import VerdictScreen from '../components/verdict/VerdictScreen'
import ResultScreen from '../components/result/ResultScreen'
import { triggerDialogueTap } from '../components/phase/AutoDialoguePhase'
import { phase1Dialogues } from '../data/dialogues/phase1'
import { phase2Dialogues } from '../data/dialogues/phase2'
import { buildGenericPhase1, buildGenericPhase2 } from '../data/dialogues/generic-phase1'
import { loadPhase1Script, loadPhase2Script } from '../data/dialogues/phaseScriptLoader'
import PCCourtLayout from '../components/pc/layout/PCCourtLayout'

// 보강 데이터 자동 등록
try {
  // @ts-ignore — H 단계 전에는 파일 미존재
  const { CASE_ENRICHMENT_DATA } = require('../data/caseEnrichmentData')
  if (CASE_ENRICHMENT_DATA) registerAllEnrichments(CASE_ENRICHMENT_DATA)
} catch { /* 보강 데이터 없음 — 정상 */ }

export default function PCApp() {
  const currentPhase = useStore((s) => s.currentPhase)
  const caseData = useStore((s) => s.caseData)
  const [sessionReady, setSessionReady] = useState(false)

  // 세션 복원 시 프롬프트/에이전트 재로드
  useEffect(() => {
    if (!caseData) { setSessionReady(false); return }
    if (sessionReady) return
    ;(async () => {
      try {
        await loadPrompts(true)
        await loadAgents(true)
        snapshotForSession()
        const { loadSettings: loadBalanceSettings } = await import('../api/settingsManager')
        await loadBalanceSettings()
      } catch { /* offline 모드 */ }
      setSessionReady(true)
    })()
  }, [caseData, sessionReady])

  // 타이틀 화면 (사건 미선택)
  if (!caseData) return <PCTitleScreen />

  // 세션 로딩
  if (caseData && !sessionReady) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--pc-bg)' }}>
        <div className="text-center">
          <div className="gavel-loading text-3xl mb-3"><Emoji char="⚖️" size={48} /></div>
          <p className="text-sm" style={{ color: '#4e4e5c' }}>세션 복원 중...</p>
        </div>
      </div>
    )
  }

  // Phase 0: 사건 소개 (전체 화면)
  if (currentPhase === GamePhase.Phase0_CaseIntro) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--pc-bg)', color: '#dcdce0' }}>
        <div className="w-full max-w-2xl"><Phase0_CaseIntro /></div>
      </div>
    )
  }

  // Result: 결과 화면 (전체 화면)
  if (currentPhase === GamePhase.Result) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--pc-bg)', color: '#dcdce0' }}>
        <div className="w-full max-w-2xl"><ResultScreen /></div>
      </div>
    )
  }

  // 메인 재판 레이아웃
  return (
    <>
      <PhaseTransition />
      <PCCourtLayout
        actionPanel={getActionPanel(currentPhase)}
        onDialogueTap={triggerDialogueTap}
        isDialoguePhase={currentPhase === GamePhase.Phase1_InitialStatement || currentPhase === GamePhase.Phase2_Rebuttal}
      />
    </>
  )
}

/** PC 타이틀 화면 — 간소화 버전 */
function PCTitleScreen() {
  const [llmStatus, setLlmStatus] = useState<{ connected: boolean } | null>(null)
  const initializeCase = useStore((s) => s.initializeCase)

  useEffect(() => {
    checkConnection().then(setLlmStatus)
    ;(async () => {
      try {
        await loadPrompts(true)
        startPromptPolling()
        await loadAgents(true)
        startAgentPolling()
        const { loadSettings: loadBalanceSettings } = await import('../api/settingsManager')
        await loadBalanceSettings()
      } catch { /* offline */ }
    })()
  }, [])

  const handleStart = (relationshipType?: string) => {
    resetPrefetch()
    setLLMMode(llmStatus?.connected ?? false)
    const caseData = getRandomCase(relationshipType)
    initializeCase(caseData)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center" style={{ background: 'var(--pc-bg)', color: '#dcdce0' }}>
      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(212,162,78,0.06)' }} />
      </div>

      <div className="text-center relative z-10 mb-12">
        <div className="text-6xl mb-4 animate-pulse-glow"><Emoji char="⚖️" size={72} /></div>
        <h1 className="text-5xl font-black tracking-tight mb-3" style={{ color: 'var(--pc-gold)' }}>솔로몬</h1>
        <p className="text-base" style={{ color: '#8b8b9a' }}>현대판 솔로몬이 되어 판결을 내려보세요</p>
      </div>

      <div className="relative z-10 w-80 space-y-3">
        <button
          onClick={() => handleStart()}
          className="w-full font-bold py-4 rounded-xl transition-all active:scale-95 text-lg"
          style={{ background: 'linear-gradient(135deg, var(--pc-gold-dim), var(--pc-gold))', color: 'var(--pc-bg)' }}
        >
          <Emoji char="⚖️" size={20} /> 사건 시작
        </button>

        <div className="grid grid-cols-3 gap-2">
          {(['spouse', 'family', 'workplace'] as const).map((type) => (
            <button key={type} onClick={() => handleStart(type)}
              className="py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: 'var(--pc-p2)', color: '#8b8b9a', border: '1px solid rgba(255,255,255,0.04)' }}>
              {type === 'spouse' ? '부부' : type === 'family' ? '가족' : '직장'}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 text-xs" style={{ color: '#4e4e5c' }}>
        {llmStatus === null && 'AI 연결 확인 중...'}
        {llmStatus?.connected && <span style={{ color: 'var(--pc-green)' }}>● AI 연결됨</span>}
        {llmStatus && !llmStatus.connected && '● AI 미연결 (오프라인 모드)'}
      </div>
    </div>
  )
}

/** 페이즈별 액션 패널 — App.tsx와 동일 로직 */
function getActionPanel(phase: GamePhase) {
  const caseData = useGameStore.getState().caseData

  switch (phase) {
    case GamePhase.Phase1_InitialStatement: {
      const caseScript = caseData ? loadPhase1Script(caseData.caseId) : null
      const fallback = caseScript ?? (caseData ? buildGenericPhase1(caseData) : phase1Dialogues)
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          nextPhase={GamePhase.Phase2_Rebuttal}
          nextLabel="반박 단계로"
          phaseKey="phase1"
        />
      )
    }
    case GamePhase.Phase2_Rebuttal: {
      const caseScript = caseData ? loadPhase2Script(caseData.caseId) : null
      const fallback = caseScript ?? (caseData ? buildGenericPhase2(caseData) : phase2Dialogues)
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          llmGenerator={caseData ? () => generatePhase2Dialogues(caseData) : undefined}
          nextPhase={GamePhase.Phase3_Interrogation}
          nextLabel="심문 시작"
          phaseKey="phase2"
        />
      )
    }
    case GamePhase.Phase3_Interrogation:
    case GamePhase.Phase4_Evidence:
    case GamePhase.Phase5_ReExamination:
      return <ActionPanel />
    case GamePhase.Phase6_Mediation:
      return <Phase6_Mediation />
    case GamePhase.Phase7_Verdict:
      return <VerdictScreen />
    default:
      return null
  }
}
