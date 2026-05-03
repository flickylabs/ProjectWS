import { useEffect, useState } from 'react'
import { loadAgents, snapshotForSession } from '../api/agentManager'
import { loadPrompts } from '../api/promptManager'
import { registerAllEnrichments } from '../data/caseEnrichment'
import { buildGenericPhase1, buildGenericPhase2 } from '../data/dialogues/generic-phase1'
import { loadPhase1Script, loadPhase2Script } from '../data/dialogues/phaseScriptLoader'
import { generatePhase2Dialogues } from '../engine/llmPhaseDialogue'
import { GamePhase, Phase } from '../types'
import ActionPanel from '../components/actions/ActionPanel'
import AutoDialoguePhase, { triggerDialogueTap } from '../components/phase/AutoDialoguePhase'
import Phase0_CaseIntro, { resetPrefetch } from '../components/phase/Phase0_CaseIntro'
import PCCaseBrief from '../components/pc/home/PCCaseBrief'
import Phase6_Mediation from '../components/phase/Phase6_Mediation'
import PhaseTransition from '../components/layout/PhaseTransition'
import PCCourtLayout from '../components/pc/layout/PCCourtLayout'
import PCHomeScreen from '../components/pc/home/PCHomeScreen'
import { playBgm } from '../engine/soundEngine'
import PCResultScreen from '../components/pc/result/PCResultScreen'
import PCVerdictScreen from '../components/pc/verdict/PCVerdictScreen'
import { useActionDispatch } from '../hooks/useActionDispatch'
import { useScreenPreset } from '../hooks/useScreenPreset'
import { useGameStore, useStore } from '../store/useGameStore'

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { CASE_ENRICHMENT_DATA } = require('../data/caseEnrichmentData')
  if (CASE_ENRICHMENT_DATA) registerAllEnrichments(CASE_ENRICHMENT_DATA)
} catch {
  // optional
}

export default function PCApp() {
  const currentPhase = useStore((s) => s.currentPhase)
  const caseData = useStore((s) => s.caseData)
  const [sessionReady, setSessionReady] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const dispatch = useActionDispatch()
  // 해상도 프리셋 전역 바인딩 (body[data-screen-bucket] 자동 갱신)
  useScreenPreset()

  // 인트로 스플래시: 최소 1.2초 표시 후 fade out
  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const devWindow = globalThis as typeof globalThis & {
      __pcDispatch?: typeof dispatch
      __pcStore?: typeof useGameStore
      __pcTriggerDialogueTap?: typeof triggerDialogueTap
    }
    devWindow.__pcDispatch = dispatch
    devWindow.__pcStore = useGameStore
    devWindow.__pcTriggerDialogueTap = triggerDialogueTap
    return () => {
      delete devWindow.__pcDispatch
      delete devWindow.__pcStore
      delete devWindow.__pcTriggerDialogueTap
    }
  }, [dispatch])

  useEffect(() => {
    if (!caseData) {
      setSessionReady(false)
      return
    }
    if (sessionReady) return

    ;(async () => {
      try {
        await loadPrompts(true)
        await loadAgents(true)
        snapshotForSession()
        const { loadSettings: loadBalanceSettings } = await import('../api/settingsManager')
        await loadBalanceSettings()
      } catch {
        // offline mode
      }
      setSessionReady(true)
    })()
  }, [caseData, sessionReady])

  if (!splashDone) {
    return (
      <div className="pc-splash">
        <div className="pc-splash__content">
          <div className="pc-splash__icon">⚖</div>
          <h1 className="pc-splash__title">솔로몬의 딜레마</h1>
          <p className="pc-splash__sub">COURT SIMULATION GAME</p>
        </div>
      </div>
    )
  }

  if (!caseData) {
    return <PCHomeScreen />
  }

  if (!sessionReady) {
    return (
      <div className="pc-loading-screen">
        <div className="pc-loading-screen__card">
          <span className="pc-loading-screen__icon">⚖</span>
          <strong>세션 준비 중</strong>
          <p>사건 데이터와 재판 환경을 불러오고 있습니다.</p>
        </div>
      </div>
    )
  }

  if (currentPhase === Phase.Briefing) {
    return <PCCaseBrief />
  }

  if (currentPhase === Phase.Verdict) {
    return <PCVerdictScreen />
  }

  if (currentPhase === Phase.Result) {
    return <PCResultScreen />
  }

  return (
    <>
      <PhaseTransition />
      <PCCourtLayout
        actionPanel={getActionPanel(currentPhase)}
        isDialoguePhase={currentPhase === Phase.Pretrial || currentPhase === GamePhase.Phase2_Rebuttal}
        onDialogueTap={triggerDialogueTap}
      />
    </>
  )
}

function getActionPanel(phase: GamePhase) {
  const caseData = useGameStore.getState().caseData

  switch (phase) {
    case Phase.Pretrial: {
      const script = caseData ? loadPhase1Script(caseData.caseId) : null
      const fallback = script ?? (caseData ? buildGenericPhase1(caseData) : [])
      return <AutoDialoguePhase dialogues={fallback} nextPhase={Phase.Interrogation} phaseKey="phase1" />
    }
    case GamePhase.Phase2_Rebuttal: {
      const script = caseData ? loadPhase2Script(caseData.caseId) : null
      const fallback = script ?? (caseData ? buildGenericPhase2(caseData) : [])
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          llmGenerator={caseData ? () => generatePhase2Dialogues(caseData) : undefined}
          nextPhase={Phase.Interrogation}
          phaseKey="phase2"
        />
      )
    }
    case Phase.Interrogation:
    case GamePhase.Phase4_Evidence:
    case GamePhase.Phase5_ReExamination:
      return null
    case Phase.Mediation:
      return <Phase6_Mediation />
    default:
      return <ActionPanel />
  }
}

export function resetPcSessionToHome() {
  resetPrefetch()
  const state = useGameStore.getState()
  state.clearSavedGame?.()
  state.clearDialogue()
  useGameStore.setState({ caseData: null })
  state.setPhase(Phase.Briefing)
}
