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
import PCTestConsole from '../components/pc/debug/PCTestConsole'
import { useActionDispatch } from '../hooks/useActionDispatch'
import { useScreenPreset } from '../hooks/useScreenPreset'
import { ensureSteamAuthSession } from '../api/steamAuth'
import { useGameStore, useStore } from '../store/useGameStore'
import { useI18n, type LocaleCode } from '../i18n'

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { CASE_ENRICHMENT_DATA } = require('../data/caseEnrichmentData')
  if (CASE_ENRICHMENT_DATA) registerAllEnrichments(CASE_ENRICHMENT_DATA)
} catch {
  // optional
}

export default function PCApp() {
  const { t } = useI18n()
  const currentPhase = useStore((s) => s.currentPhase)
  const caseData = useStore((s) => s.caseData)
  const [sessionReady, setSessionReady] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const [steamSessionChecked, setSteamSessionChecked] = useState(false)
  const [steamAuthError, setSteamAuthError] = useState<string | null>(null)
  const dispatch = useActionDispatch()
  const steamAuthRequired = !import.meta.env.DEV || import.meta.env.VITE_STEAM_AUTH_REQUIRED === 'true'
  // 해상도 프리셋 전역 바인딩 (body[data-screen-bucket] 자동 갱신)
  useScreenPreset()

  // 인트로 스플래시: 최소 1.2초 표시 후 fade out
  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let active = true
    ensureSteamAuthSession()
      .catch((err) => {
        console.warn('[SteamAuth] Session bootstrap failed; API calls will retry before use.', err)
        if (active) setSteamAuthError(err instanceof Error ? err.message : t('steam.authFailedFallback'))
      })
      .finally(() => {
        if (active) setSteamSessionChecked(true)
      })
    return () => {
      active = false
    }
  }, [])

  const retrySteamAuth = async () => {
    setSteamSessionChecked(false)
    setSteamAuthError(null)
    try {
      await ensureSteamAuthSession(true)
    } catch (err) {
      setSteamAuthError(err instanceof Error ? err.message : t('steam.authFailedFallback'))
    } finally {
      setSteamSessionChecked(true)
    }
  }

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
        await ensureSteamAuthSession()
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

  if (!splashDone || !steamSessionChecked) {
    return (
      <div className="pc-splash">
        <div className="pc-splash__content">
          <div className="pc-splash__icon">⚖</div>
          <h1 className="pc-splash__title">{t('brand.fullTitle')}</h1>
          <p className="pc-splash__sub">{t('splash.subtitle')}</p>
          <PCLanguageMiniSelect className="pc-splash__language" />
        </div>
      </div>
    )
  }

  if (steamAuthRequired && steamAuthError) {
    return (
      <div className="pc-loading-screen">
        <div className="pc-loading-screen__card">
          <span className="pc-loading-screen__icon">STEAM</span>
          <strong>{t('steam.authRequired.title')}</strong>
          <p>{t('steam.authRequired.description')}</p>
          <PCLanguageMiniSelect className="pc-loading-screen__language" />
          <button type="button" className="pc-btn pc-btn--primary" onClick={retrySteamAuth}>
            {t('steam.authRequired.retry')}
          </button>
        </div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <>
        <PCHomeScreen />
        <PcTestConsoleMount />
      </>
    )
  }

  if (!sessionReady) {
    return (
      <div className="pc-loading-screen">
        <div className="pc-loading-screen__card">
          <span className="pc-loading-screen__icon">⚖</span>
          <strong>{t('session.preparing.title')}</strong>
          <p>{t('session.preparing.description')}</p>
          <PCLanguageMiniSelect className="pc-loading-screen__language" />
        </div>
      </div>
    )
  }

  if (currentPhase === Phase.Briefing) {
    return (
      <>
        <PCCaseBrief />
        <PcTestConsoleMount />
      </>
    )
  }

  if (currentPhase === Phase.Verdict) {
    return (
      <>
        <PCVerdictScreen />
        <PcTestConsoleMount />
      </>
    )
  }

  if (currentPhase === Phase.Result) {
    return (
      <>
        <PCResultScreen />
        <PcTestConsoleMount />
      </>
    )
  }

  return (
    <>
      <PhaseTransition />
      <PCCourtLayout
        actionPanel={getActionPanel(currentPhase)}
        isDialoguePhase={currentPhase === Phase.Pretrial || currentPhase === GamePhase.Phase2_Rebuttal}
        onDialogueTap={triggerDialogueTap}
      />
      <PcTestConsoleMount />
    </>
  )
}

function PcTestConsoleMount() {
  const enabled = import.meta.env.DEV || import.meta.env.VITE_PC_TEST_CONSOLE === 'true'
  return enabled ? <PCTestConsole /> : null
}

function PCLanguageMiniSelect({ className }: { className?: string }) {
  const { locale, locales, setLocale, t } = useI18n()

  return (
    <label className={`pc-language-mini${className ? ` ${className}` : ''}`}>
      <span>{t('language.selectorLabel')}</span>
      <select
        aria-label={t('language.selectorTitle')}
        value={locale}
        onChange={(event) => setLocale(event.target.value as LocaleCode)}
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </select>
    </label>
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
