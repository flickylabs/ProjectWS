import { useEffect, useState } from 'react'
import { loadAgents, snapshotForSession } from '../api/agentManager'
import { loadPrompts } from '../api/promptManager'
import { registerAllEnrichments } from '../data/caseEnrichment'
import { buildGenericPhase1, buildGenericPhase2 } from '../data/dialogues/generic-phase1'
import { phase1Dialogues } from '../data/dialogues/phase1'
import { phase2Dialogues } from '../data/dialogues/phase2'
import { loadPhase1Script, loadPhase2Script } from '../data/dialogues/phaseScriptLoader'
import { generatePhase2Dialogues } from '../engine/llmPhaseDialogue'
import { GamePhase } from '../types'
import ActionPanel from '../components/actions/ActionPanel'
import AutoDialoguePhase, { triggerDialogueTap } from '../components/phase/AutoDialoguePhase'
import Phase0_CaseIntro, { resetPrefetch } from '../components/phase/Phase0_CaseIntro'
import PCCaseBrief from '../components/pc/home/PCCaseBrief'
import Phase6_Mediation from '../components/phase/Phase6_Mediation'
import PhaseTransition from '../components/layout/PhaseTransition'
import PCCourtLayout from '../components/pc/layout/PCCourtLayout'
import PCHomeScreen from '../components/pc/home/PCHomeScreen'
import PCResultScreen from '../components/pc/result/PCResultScreen'
import PCVerdictScreen from '../components/pc/verdict/PCVerdictScreen'
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

  if (currentPhase === GamePhase.Phase0_CaseIntro) {
    return <PCCaseBrief />
  }

  if (currentPhase === GamePhase.Phase7_Verdict) {
    return <PCVerdictScreen />
  }

  if (currentPhase === GamePhase.Result) {
    return <PCResultScreen />
  }

  return (
    <>
      <PhaseTransition />
      <PCCourtLayout
        actionPanel={getActionPanel(currentPhase)}
        isDialoguePhase={currentPhase === GamePhase.Phase1_InitialStatement || currentPhase === GamePhase.Phase2_Rebuttal}
        onDialogueTap={triggerDialogueTap}
      />
    </>
  )
}

function getActionPanel(phase: GamePhase) {
  const caseData = useGameStore.getState().caseData

  switch (phase) {
    case GamePhase.Phase1_InitialStatement: {
      const script = caseData ? loadPhase1Script(caseData.caseId) : null
      const fallback = script ?? (caseData ? buildGenericPhase1(caseData) : phase1Dialogues)
      return <AutoDialoguePhase dialogues={fallback} nextLabel="반박 단계로" nextPhase={GamePhase.Phase2_Rebuttal} phaseKey="phase1" />
    }
    case GamePhase.Phase2_Rebuttal: {
      const script = caseData ? loadPhase2Script(caseData.caseId) : null
      const fallback = script ?? (caseData ? buildGenericPhase2(caseData) : phase2Dialogues)
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          llmGenerator={caseData ? () => generatePhase2Dialogues(caseData) : undefined}
          nextLabel="심문 시작"
          nextPhase={GamePhase.Phase3_Interrogation}
          phaseKey="phase2"
        />
      )
    }
    case GamePhase.Phase3_Interrogation:
    case GamePhase.Phase4_Evidence:
    case GamePhase.Phase5_ReExamination:
      return null
    case GamePhase.Phase6_Mediation:
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
  state.setPhase(GamePhase.Phase0_CaseIntro)
}
