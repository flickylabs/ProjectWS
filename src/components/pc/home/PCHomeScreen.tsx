import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getAllCases, getCaseById } from '../../../data/cases'
import { getHallOfFameForSeason, getJudgeProfile, getLeaderboard, getPlayerStats, loadExtendedHistory, loadProfile } from '../../../data/leaderboard'
import { getCurrentSeason, getRemainingDays } from '../../../data/seasons'
import { checkConnection } from '../../../engine/llmClient'
import { isBgmEnabled, isSoundEnabled, playBgm as playBgmFn, setBgmEnabled, setSoundEnabled, stopBgm as stopBgmFn } from '../../../engine/soundEngine'
import { isTelemetryOptedOut, setOptOut as setTelemetryOptOut } from '../../../telemetry/funnelClient'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { setLLMMode } from '../../../hooks/useActionDispatch'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, type ScreenPresetId } from '../../../utils/screenPresets'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { shouldRunSpouse01Tutorial } from '../../../store/slices/tutorialSlice'
import { translate, useI18n, type LocaleCode, type MessageKey } from '../../../i18n'
import { hasUnexpectedHangulForLocale } from '../../../i18n/llmLocale'
import { GamePhase, type CaseData, type ExtendedHistoryEntry, type SortCategory } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCSessionIcon from '../icons/PCSessionIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCJudgeProgressionPanel from '../profile/PCJudgeProgressionPanel'
import { FRAGMENT_VISUALS, PCFragmentIcon } from '../progression/PCJudgeProgressionShared'
import { PCResultFrame } from '../result/PCResultScreen'
import { getFragmentLabel, getResultCopy, getRewardTitleInfo } from '../result/resultCopy'
import PCCaseBrowser from './PCCaseBrowser'
import PCIntroSlides from './PCIntroSlides'
import { type PCGeneralSessionId, PC_GENERAL_SESSIONS, formatCountdown, getCasesForPcGeneralSession, getLocalizedPcGeneralSession, getRelationshipLabel, getSeasonCases, hasSeenPcIntro, loadPcCaseProgress } from './pcHomeShared'
import type { UnsafeAny } from '../../../types/lint'


type HomeView = 'home' | 'general' | 'generalCases' | 'season' | 'profile' | 'leaderboard' | 'settings'
type JudgeDeskTab = 'profile' | 'history' | 'progression'
type HistoryMode = 'general' | 'season'
type HistoryResultTab = 'result' | 'verdict_pronounce' | 'epilogue' | 'bonus'
type HomeSettings = ReturnType<typeof getSettings>
type SessionProgress = { completedCount: number; totalCount: number; averageScore: number | null; progressRate: number }
type PendingScreenPreset = { previous: ScreenPresetId; next: ScreenPresetId }
type HistoryCaseCard = {
  caseData: CaseData
  entries: ExtendedHistoryEntry[]
  playedCount: number
  avgScore: number | null
  bestScore: number | null
  latestScore: number | null
}

const SORTS: SortCategory[] = ['total', 'insight', 'authority', 'wisdom']
const HISTORY_RESULT_TAB_IDS: HistoryResultTab[] = ['result', 'verdict_pronounce', 'epilogue', 'bonus']

function formatHallOfFameCaseLabel(caseId: string, cases: CaseData[]): string {
  const normalized = caseId.replace(/^case-/, '')
  const caseData = cases.find((item) => item.caseId.replace(/^case-/, '') === normalized)
  const number = normalized.match(/-(\d+)$/)?.[1] ?? ''
  const relationship = getRelationshipLabel(caseData?.meta?.relationshipType ?? normalized.replace(/-\d+$/, ''))
  const title = caseData?.meta?.title ?? normalized
  return number ? `${relationship}-${number} / ${title}` : `${relationship} / ${title}`
}

export default function PCHomeScreen() {
  const { t, locale, locales, setLocale } = useI18n()
  const { preset: screenPreset, setPreset: setScreenPreset } = useScreenPreset()
  const [showIntro, setShowIntro] = useState(() => !hasSeenPcIntro())
  const [view, setView] = useState<HomeView>('home')
  const [judgeDeskTab, setJudgeDeskTab] = useState<JudgeDeskTab>('profile')
  const [selectedSession, setSelectedSession] = useState<PCGeneralSessionId | null>(null)
  const [historyMode, setHistoryMode] = useState<HistoryMode>('general')
  const [selectedHistoryCaseId, setSelectedHistoryCaseId] = useState<string | null>(null)
  const [selectedHistoryKey, setSelectedHistoryKey] = useState<string | null>(null)
  const [historyDetailEntry, setHistoryDetailEntry] = useState<ExtendedHistoryEntry | null>(null)
  const [leaderboardSort, setLeaderboardSort] = useState<SortCategory>('total')
  const [settings, setSettings] = useState<HomeSettings>(() => getSettings())
  const [bgmOn, setBgmOn] = useState(() => isBgmEnabled())
  const [sfxOn, setSfxOn] = useState(() => isSoundEnabled())
  const [telemetryAllowed, setTelemetryAllowed] = useState(() => !isTelemetryOptedOut())
  const [llmConnected, setLlmConnected] = useState<boolean | null>(null)
  const [checkingConnection, setCheckingConnection] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [pendingScreenPreset, setPendingScreenPreset] = useState<PendingScreenPreset | null>(null)
  const [screenConfirmCountdown, setScreenConfirmCountdown] = useState(5)
  const countdown = 0 // 충전 시스템 비활성 상태

  const initializeCase = useStore((s) => s.initializeCase)
  const globalInvest = useStore((s) => s.resources.investigationTokens)
  const globalSkill = useStore((s) => s.resources.skillPoints)
  const season = getCurrentSeason()
  const remainingDays = getRemainingDays()

  useEffect(() => {
    checkConnection().then((r) => setLlmConnected(r.connected)).catch(() => setLlmConnected(false))
  }, [])

  useEffect(() => {
    playBgmFn('/bgm/title.mp3')
  }, [])

  const allCases = useMemo(
    () => getAllCases().map(({ caseId }) => getCaseById(caseId)).filter((item): item is CaseData => item != null),
    [locale],
  )
  const generalSessions = useMemo(() => PC_GENERAL_SESSIONS.map((session) => getLocalizedPcGeneralSession(session, locale)), [locale])
  const seasonCases = useMemo(() => getSeasonCases(allCases), [allCases])
  const profile = useMemo(() => loadProfile(), [refreshKey])
  const history = useMemo(() => loadExtendedHistory(), [refreshKey])
  const judgeProfile = useMemo(() => getJudgeProfile(), [refreshKey])
  const playerStats = useMemo(() => getPlayerStats(), [refreshKey])
  const hallOfFame = useMemo(() => getHallOfFameForSeason(season.id), [refreshKey, season.id])
  const leaderboard = useMemo(() => getLeaderboard(season.id, leaderboardSort), [leaderboardSort, refreshKey, season.id])
  const progressStore = useMemo(() => loadPcCaseProgress(), [refreshKey])
  const bestHistoryScores = useMemo(() => {
    const map: Record<string, number> = {}
    history.forEach((entry) => { map[entry.caseId] = Math.max(map[entry.caseId] ?? 0, entry.score) })
    return map
  }, [history])

  const titleName = t(`pc.home.judgeTitle.${judgeProfile.titleId}.name` as MessageKey)
  const titleSubtitle = t(`pc.home.judgeTitle.${judgeProfile.titleId}.subtitle` as MessageKey)
  const selectedLocale = locales.find((item) => item.code === locale)
  const seasonNumber = season.id.replace(/^s/, '')
  const seasonLabel = t('pc.home.season.name', { number: seasonNumber })
  const liveStatus = llmConnected == null
    ? t('pc.home.status.checking')
    : llmConnected
      ? t('pc.home.status.connected')
      : t('pc.home.status.disconnected')
  const judgeLevel = Math.max(1, history.length || 1)
  const reputation = history.reduce((sum, entry) => sum + Math.max(0, entry.score), 0)

  const sessionProgress = useMemo(() => {
    return Object.fromEntries(PC_GENERAL_SESSIONS.map((session) => {
      const cases = getCasesForPcGeneralSession(allCases, session.id)
      const scores = cases.map((c) => Math.max(progressStore[c.caseId]?.bestScore ?? 0, bestHistoryScores[c.caseId] ?? 0)).filter((score) => score > 0)
      const totalCount = cases.length
      const completedCount = scores.length
      const averageScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
      return [session.id, { totalCount, completedCount, averageScore, progressRate: totalCount ? (completedCount / totalCount) * 100 : 0 }]
    })) as Record<PCGeneralSessionId, SessionProgress>
  }, [allCases, bestHistoryScores, progressStore])

  const totalGeneralCases = PC_GENERAL_SESSIONS.reduce((sum, session) => sum + sessionProgress[session.id].totalCount, 0)
  const totalGeneralCompleted = PC_GENERAL_SESSIONS.reduce((sum, session) => sum + sessionProgress[session.id].completedCount, 0)
  const selectedSessionMeta = generalSessions.find((session) => session.id === selectedSession) ?? null
  const selectedSessionCases = selectedSession ? getCasesForPcGeneralSession(allCases, selectedSession) : []
  const seasonProgress = buildSessionProgress(seasonCases, progressStore, bestHistoryScores)
  const _seasonHistory = useMemo(() => {
    const ids = new Set(seasonCases.map((c) => c.caseId))
    return history.filter((entry) => ids.has(entry.caseId))
  }, [history, seasonCases])
  const generalHistoryCases = useMemo(() => {
    const ids = new Set<string>()
    PC_GENERAL_SESSIONS.forEach((session) => {
      getCasesForPcGeneralSession(allCases, session.id).forEach((caseData) => ids.add(caseData.caseId))
    })
    return allCases.filter((caseData) => ids.has(caseData.caseId))
  }, [allCases])
  const historyCaseCards = useMemo<HistoryCaseCard[]>(() => {
    const cases = historyMode === 'season' ? seasonCases : generalHistoryCases
    return cases.map((caseData) => {
      const entries = history
        .filter((entry) => entry.caseId === caseData.caseId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      const scores = entries.map((entry) => entry.score)
      return {
        caseData,
        entries,
        playedCount: entries.length,
        avgScore: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null,
        bestScore: scores.length ? Math.max(...scores) : null,
        latestScore: entries[0]?.score ?? null,
      }
    })
  }, [generalHistoryCases, history, historyMode, seasonCases])
  const selectedHistoryCase = historyCaseCards.find((item) => item.caseData.caseId === selectedHistoryCaseId)
    ?? historyCaseCards.find((item) => item.playedCount > 0)
    ?? historyCaseCards[0]
    ?? null
  const selectedCaseEntries = selectedHistoryCase?.entries ?? []
  const selectedHistory = selectedCaseEntries.find((entry) => getHistoryKey(entry) === selectedHistoryKey) ?? selectedCaseEntries[0] ?? null

  const setHistoryModeAndTrack = (mode: HistoryMode) => {
    setHistoryMode(mode)
    setSelectedHistoryCaseId(null)
    setSelectedHistoryKey(null)
  }

  useEffect(() => {
    if (!historyCaseCards.length) {
      setSelectedHistoryCaseId(null)
      setSelectedHistoryKey(null)
      return
    }
    if (selectedHistoryCaseId && historyCaseCards.some((item) => item.caseData.caseId === selectedHistoryCaseId)) return
    const first = historyCaseCards.find((item) => item.playedCount > 0) ?? historyCaseCards[0]
    setSelectedHistoryCaseId(first.caseData.caseId)
    setSelectedHistoryKey(first.entries[0] ? getHistoryKey(first.entries[0]) : null)
  }, [historyCaseCards, selectedHistoryCaseId])

  useEffect(() => {
    if (!selectedHistoryCase) return
    if (selectedCaseEntries.length === 0) {
      if (selectedHistoryKey !== null) setSelectedHistoryKey(null)
      return
    }
    if (selectedHistoryKey && selectedCaseEntries.some((entry) => getHistoryKey(entry) === selectedHistoryKey)) return
    setSelectedHistoryKey(getHistoryKey(selectedCaseEntries[0]))
  }, [selectedCaseEntries, selectedHistoryCase, selectedHistoryKey])

  useEffect(() => {
    if (!pendingScreenPreset) return

    setScreenConfirmCountdown(5)
    const countdownTimer = window.setInterval(() => {
      setScreenConfirmCountdown((current) => Math.max(0, current - 1))
    }, 1000)
    const revertTimer = window.setTimeout(() => {
      setScreenPreset(pendingScreenPreset.previous)
      setPendingScreenPreset(null)
    }, 5000)

    return () => {
      window.clearInterval(countdownTimer)
      window.clearTimeout(revertTimer)
    }
  }, [pendingScreenPreset, setScreenPreset])

  const startCase = async (caseData: CaseData) => {
    stopBgmFn()
    setLLMMode(llmConnected ?? false)
    // ScriptedText 번들 미리 로드 (lazy 로드 대응)
    const { preloadScriptedTextBundle } = await import('../../../engine/scriptedTextLoader')
    await preloadScriptedTextBundle(caseData.caseId)
    // LLM 프리패치 (기존 브리핑 화면에서 수행하던 것)
    const { beginCasePrefetch } = await import('../../phase/Phase0_CaseIntro')
    initializeCase(caseData)
    beginCasePrefetch(caseData)
    // 브리핑 건너뛰고 바로 Phase1 진입
    if (!shouldRunSpouse01Tutorial(caseData.caseId)) {
      useGameStore.getState().advancePhase(GamePhase.Phase1_InitialStatement)
    }
  }

  const toggleBgm = () => {
    const next = !bgmOn
    setBgmOn(next)
    setBgmEnabled(next)
    if (next) playBgmFn('/bgm/title.mp3', 0.12)
    else stopBgmFn()
  }

  const toggleSfx = () => {
    const next = !sfxOn
    setSfxOn(next)
    setSoundEnabled(next)
  }

  const toggleTelemetry = () => {
    const next = !telemetryAllowed
    setTelemetryAllowed(next)
    setTelemetryOptOut(!next)
  }

  const refreshConnection = async () => {
    setCheckingConnection(true)
    try {
      const result = await checkConnection()
      setLlmConnected(result.connected)
    } finally {
      setCheckingConnection(false)
    }
  }

  const updateTypingSpeed = (value: HomeSettings['typingSpeed']) => {
    updateSettings({ typingSpeed: value })
    setSettings((current) => ({ ...current, typingSpeed: value }))
  }

  const requestScreenPreset = (nextPreset: ScreenPresetId) => {
    if (nextPreset === screenPreset) return
    const previousPreset = pendingScreenPreset?.previous ?? screenPreset
    setScreenPreset(nextPreset)
    setPendingScreenPreset({ previous: previousPreset, next: nextPreset })
    setScreenConfirmCountdown(5)
  }

  const keepScreenPreset = () => {
    setPendingScreenPreset(null)
    setScreenConfirmCountdown(5)
  }

  const revertScreenPreset = () => {
    if (pendingScreenPreset) setScreenPreset(pendingScreenPreset.previous)
    setPendingScreenPreset(null)
    setScreenConfirmCountdown(5)
  }

  const _openGuide = () => openPcInteractionPanel({
    title: t('pc.home.modal.guide.title'),
    subtitle: t('pc.home.modal.guide.subtitle'),
    tone: 'blue',
    body: t('pc.home.modal.guide.body'),
  })

  const _openLive = () => openPcInteractionPanel({
    title: t('pc.home.modal.live.title'),
    subtitle: llmConnected ? t('pc.home.status.aiConnected') : t('pc.home.status.offline'),
    tone: llmConnected ? 'gold' : 'neutral',
    body: [
      t('pc.home.modal.live.ai', { status: llmConnected ? t('pc.home.status.connected') : t('pc.home.status.disconnected') }),
      t('pc.home.modal.live.invest', { count: globalInvest }),
      t('pc.home.modal.live.skill', { count: globalSkill }),
      t('pc.home.modal.live.recharge', { time: formatCountdown(countdown) }),
    ].join('\n'),
  })

  const refreshProgression = () => setRefreshKey((current) => current + 1)

  if (showIntro) {
    return <div className="pc-home-shell"><div className="pc-home-shell__ambient pc-home-shell__ambient--gold" /><div className="pc-home-shell__ambient pc-home-shell__ambient--blue" /><PCIntroSlides onComplete={() => setShowIntro(false)} /></div>
  }

  return (
    <div className="pc-home-shell">
      <div className="pc-home-shell__ambient pc-home-shell__ambient--gold" />
      <div className="pc-home-shell__ambient pc-home-shell__ambient--blue" />

      {view === 'home' && (
        <section className="pc-home-v2">
          <header className="pc-home-v2__topbar">
            <div className="pc-home-v2__tools">
              <button className="pc-home-v2__tool pc-home-v2__tool--settings" onClick={() => setView('settings')} type="button" aria-label={t('settings.title')}>
                <PCSvgIcon id="i-gear" size={28} />
              </button>
            </div>
          </header>
          <div className="pc-home-v2__hero">
            <span className="pc-home-v2__eyebrow">{t('splash.subtitle')}</span>
            <div className="pc-home-v2__title-row">
              <img className="pc-home-v2__title-scale" src="/icons/ornament/scale-balance.png" alt="" width={48} height={48} aria-hidden="true" />
              <h1>{t('home.gameTitle')}</h1>
              <img className="pc-home-v2__title-scale" src="/icons/ornament/scale-balance.png" alt="" width={48} height={48} aria-hidden="true" />
            </div>
            <p>{t('home.tagline')}</p>
          </div>
          <div className="pc-home-v2__mode-grid">
            <ModeCard badge="NORMAL MODE" iconId="i-gavel" label={t('pc.home.mode.general.label')} metaLeft={t('pc.home.mode.sessions', { count: PC_GENERAL_SESSIONS.length })} metaRight={t('pc.home.mode.progress', { completed: totalGeneralCompleted, total: totalGeneralCases })} onClick={() => { setSelectedSession(null); setView('general') }} progressRate={totalGeneralCases ? (totalGeneralCompleted / totalGeneralCases) * 100 : 0} />
            <ModeCard badge={seasonLabel} iconId="i-crown" label={t('pc.home.mode.season.label')} metaLeft={seasonCases.length ? t('pc.home.mode.assignedCases', { count: seasonCases.length }) : t('pc.home.mode.assignmentPending')} metaRight={t('pc.home.mode.daysLeft', { days: remainingDays })} onClick={() => setView('season')} progressRate={seasonProgress.progressRate} season />
          </div>
<div className="pc-home-v2__info-grid">
            <InfoCard actionLabel={t('pc.home.profile.info')} iconId="i-person" onClick={() => { setJudgeDeskTab('profile'); setView('profile') }} subtitle={titleSubtitle} title={titleName} />
            <InfoCard actionLabel={t('pc.home.profile.details')} iconId="i-crown" onClick={() => setView('leaderboard')} subtitle={seasonLabel} title={t('pc.home.leaderboard')} />
          </div>
        </section>
      )}

      {view === 'general' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="GENERAL MODE" title={t('pc.home.mode.general.label')} description={t('pc.home.general.description')} onBack={() => setView('home')} />
          <div className="pc-session-grid-v2">
            {generalSessions.map((session, index) => {
              const progress = sessionProgress[session.id]
              const disabled = progress.totalCount === 0
              return (
                <button className={`pc-session-card-v2 pc-session-card-v2--${session.accent}${disabled ? ' is-disabled' : ''}`} disabled={disabled} key={session.id} onClick={() => { setSelectedSession(session.id); setView('generalCases') }} type="button">
                  <div className="pc-session-card-v2__top">
                    <span>{`SESSION ${String(index + 1).padStart(2, '0')}`}</span>
                    <strong>{disabled ? t('pc.home.session.ready') : `${progress.completedCount}/${progress.totalCount}`}</strong>
                  </div>
                  <div className="pc-session-card-v2__inner">
                    <div className="pc-session-card-v2__main">
                      <span className="pc-session-card-v2__icon"><PCSessionIcon sessionId={session.id} size={56} fallbackSymbolId={session.iconId} alt={session.label} /></span>
                      <div className="pc-session-card-v2__body">
                        <h3>{session.label}</h3>
                        <p className="pc-session-card-v2__tagline">{session.tagline}</p>
                      </div>
                    </div>
                    <div className="pc-session-card-v2__track"><i style={{ width: `${progress.progressRate}%` }} /></div>
                  </div>
                  <div className="pc-session-card-v2__bottom">
                    {progress.averageScore != null
                      ? <span className="pc-session-card-v2__avg">{t('pc.home.session.averageScore', { score: progress.averageScore })}</span>
                      : <span className="pc-session-card-v2__avg pc-session-card-v2__avg--empty">—</span>}
                  </div>
                  {disabled && (
                    <div className="pc-session-card-v2__lock-overlay" aria-label={t('pc.common.locked')}>
                      <PCSvgIcon id="i-lock" size={56} />
                      <span>{t('pc.home.session.ready')}</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {view === 'generalCases' && selectedSessionMeta && (
        <section className="pc-depth-shell"><PCCaseBrowser accentIconId={selectedSessionMeta.iconId} cases={selectedSessionCases} description={t('pc.home.session.caseListDescription', { tagline: selectedSessionMeta.tagline })} eyebrow={t('pc.home.mode.general.label')} onBack={() => setView('general')} onSelectCase={startCase} progressLabel={`${sessionProgress[selectedSessionMeta.id].completedCount}/${sessionProgress[selectedSessionMeta.id].totalCount}`} showCompletedFilter title={t('pc.home.session.caseCountTitle', { label: selectedSessionMeta.label, count: selectedSessionCases.length })} /></section>
      )}

      {view === 'season' && (
        <section className="pc-depth-shell"><PCCaseBrowser accentIconId="i-crown" cases={seasonCases} description={t('pc.home.season.description', { season: seasonLabel })} emptyDescription={t('pc.home.season.emptyDescription')} emptyTitle={t('pc.home.season.emptyTitle')} eyebrow={seasonLabel} onBack={() => setView('home')} onSelectCase={startCase} progressLabel={`${seasonProgress.completedCount}/${seasonProgress.totalCount}`} title={t('pc.home.mode.season.label')} /></section>
      )}

      {view === 'profile' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="JUDGE DESK" title={t('pc.home.profile.info')} description={t('pc.home.profile.description')} onBack={() => setView('home')} />
          <div className="pc-desk-tabs">
            <button className={`pc-desk-tab${judgeDeskTab === 'profile' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('profile')} type="button">{t('pc.home.profile.tab.info')}</button>
            <button className={`pc-desk-tab${judgeDeskTab === 'history' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('history')} type="button">{t('pc.home.profile.tab.history')}</button>
            <button className={`pc-desk-tab${judgeDeskTab === 'progression' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('progression')} type="button">{t('pc.home.profile.tab.progression')}</button>
          </div>

          <div className="pc-desk-tab-content">
          {judgeDeskTab === 'profile' ? (
            <div className="pc-desk-grid pc-desk-grid--profile">
              <Card eyebrow="JUDGE PROFILE" title={profile.playerName}>
                <div className="pc-desk-profile-title">
                  <span>Lv {Math.max(1, judgeLevel)}</span>
                  <strong>{titleName}</strong>
                  <p>{titleSubtitle}</p>
                </div>
                <div className="pc-desk-hero__meter">
                  <strong>{t('pc.home.profile.reputation')}</strong>
                  <span>{`${Math.min(reputation, 1200)}/1200`}</span>
                  <div className="pc-progress-bar"><i style={{ width: `${Math.min(100, (Math.min(reputation, 1200) / 1200) * 100)}%` }} /></div>
                </div>
                <div className="pc-desk-hero__stats">
                  <MiniStat label={t('pc.home.profile.processedCases')} value={t('pc.home.unit.cases', { count: history.length })} />
                  <MiniStat label={t('pc.home.profile.bestScore')} value={t('pc.home.unit.points', { count: playerStats.bestScore })} />
                  <MiniStat label={t('pc.home.profile.averageScore')} value={t('pc.home.unit.points', { count: Math.round(playerStats.avgScore ?? 0) })} />
                  <MiniStat label={t('pc.home.profile.season')} value={seasonLabel} />
                </div>
              </Card>
              <Card eyebrow="JUDGE AXES" title={titleName}>
                <AxisRow label={t('pc.home.profile.axis.inquiry')} left={t('pc.home.profile.axis.logic')} right={t('pc.home.profile.axis.intuition')} value={judgeProfile.inquiryAxis} />
                <AxisRow label={t('pc.home.profile.axis.judgment')} left={t('pc.home.profile.axis.strict')} right={t('pc.home.profile.axis.lenient')} value={judgeProfile.judgmentAxis} />
                <AxisRow label={t('pc.home.profile.axis.resolution')} left={t('pc.home.profile.axis.principle')} right={t('pc.home.profile.axis.reconcile')} value={judgeProfile.resolutionAxis} />
              </Card>
            </div>
          ) : judgeDeskTab === 'progression' ? (
            <PCJudgeProgressionPanel onChange={refreshProgression} syncKey={refreshKey} />
          ) : (
            <div className="pc-history-board pc-history-board--select">
              <div className="pc-history-mode-tabs" role="tablist" aria-label={t('pc.home.history.modeLabel')}>
                <button className={`pc-history-mode-tab${historyMode === 'general' ? ' is-active' : ''}`} onClick={() => setHistoryModeAndTrack('general')} type="button">{t('pc.home.mode.general.label')}</button>
                <button className={`pc-history-mode-tab${historyMode === 'season' ? ' is-active' : ''}`} onClick={() => setHistoryModeAndTrack('season')} type="button">{t('pc.home.mode.season.label')}</button>
              </div>
              <div className="pc-history-case-layout">
                <Card eyebrow={historyMode === 'general' ? 'GENERAL MODE' : seasonLabel.toUpperCase()} title={t('pc.home.history.caseSelect')}>
                  {historyCaseCards.length === 0 ? (
                    <Empty title={t('pc.home.history.noCasesTitle')} description={t('pc.home.history.noCasesDescription')} />
                  ) : (
                    <div className="pc-history-case-picker">
                      {selectedHistoryCase ? (
                        <div className="pc-history-case-stats">
                          <MiniStat label={t('pc.home.history.playCount')} value={t('pc.home.unit.times', { count: selectedHistoryCase.playedCount })} />
                          <MiniStat label={t('pc.home.history.average')} value={selectedHistoryCase.avgScore != null ? t('pc.home.unit.points', { count: selectedHistoryCase.avgScore }) : '-'} />
                          <MiniStat label={t('pc.home.history.best')} value={selectedHistoryCase.bestScore != null ? t('pc.home.unit.points', { count: selectedHistoryCase.bestScore }) : '-'} />
                        </div>
                      ) : null}

                      <div className="pc-history-case-list" role="list">
                        {historyCaseCards.map((item, index) => (
                          <button
                            className={`pc-history-case-option${selectedHistoryCase?.caseData.caseId === item.caseData.caseId ? ' is-active' : ''}`}
                            key={item.caseData.caseId}
                            onClick={() => { setSelectedHistoryCaseId(item.caseData.caseId); setSelectedHistoryKey(null) }}
                            type="button"
                          >
                            <span className="pc-history-case-option__title">{getNumberedCaseTitle(item.caseData, index)}</span>
                            <span className="pc-history-case-option__meta">
                              {getRelationshipLabel(item.caseData.meta?.relationshipType ?? item.caseData.duo.relationshipType)}
                              {' · '}
                              {item.playedCount > 0 ? t('pc.home.history.averageBest', { average: item.avgScore ?? '-', best: item.bestScore ?? '-' }) : t('pc.home.history.noRecord')}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                <Card eyebrow="PLAY HISTORY" title={selectedHistoryCase ? getCaseDisplayTitle(selectedHistoryCase.caseData) : t('pc.home.history.playHistory')}>
                  {selectedCaseEntries.length === 0 ? (
                    <Empty title={t('pc.home.history.noPlayTitle')} description={t('pc.home.history.noPlayDescription')} />
                  ) : (
                    <div className="pc-history-play-panel">
                      <div className="pc-history-play-selects">
                        <label>
                          <span>{t('pc.home.history.playTimeScore')}</span>
                          <select className="pc-history-record-select pc-settings-select" value={selectedHistory ? getHistoryKey(selectedHistory) : ''} onChange={(event) => setSelectedHistoryKey(event.target.value)}>
                            {selectedCaseEntries.map((entry) => (
                              <option key={getHistoryKey(entry)} value={getHistoryKey(entry)}>
                                {formatHistoryOptionLabel(entry, t, locale)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {selectedHistory ? (
                        <div className="pc-history-summary-card">
                          <div className="pc-history-score-strip">
                            <MiniStat label={t('pc.home.sort.total')} value={t('pc.home.unit.points', { count: selectedHistory.score })} />
                            <MiniStat label={t('pc.home.sort.insight')} value={`${selectedHistory.insight}`} />
                            <MiniStat label={t('pc.home.sort.authority')} value={`${selectedHistory.authority}`} />
                            <MiniStat label={t('pc.home.sort.wisdom')} value={`${selectedHistory.wisdom}`} />
                          </div>
                          <div className="pc-history-verdict-brief">
                            <strong>{t('pc.home.history.verdictBrief')}</strong>
                            <p>{getHistoryVerdictBrief(selectedHistory, locale)}</p>
                          </div>
                          <button className="pc-inline-button" onClick={() => setHistoryDetailEntry(selectedHistory)} type="button">{t('pc.home.history.details')}</button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
          </div>
        </section>
      )}

      {view === 'leaderboard' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow={seasonLabel} title={t('pc.home.leaderboard')} description={t('pc.home.leaderboard.description')} onBack={() => setView('home')} />
          <div className="pc-filter-pills-v2">{SORTS.map((sort) => <button className={`pc-filter-pill-v2${leaderboardSort === sort ? ' is-active' : ''}`} key={sort} onClick={() => setLeaderboardSort(sort)} type="button">{t(`pc.home.sort.${sort}` as MessageKey)}</button>)}</div>
          <div className="pc-leaderboard-grid">
            <Card eyebrow="SCOREBOARD" title={t('pc.home.leaderboard.seasonRanking')}>{leaderboard.length === 0 ? <Empty title={t('pc.home.leaderboard.noSeasonTitle')} description={t('pc.home.leaderboard.noSeasonDescription')} /> : <div className="pc-ranking-list-v2">{leaderboard.slice(0, 10).map((entry, index) => <div className="pc-ranking-row-v2" key={getHistoryKey(entry)}><span className="pc-ranking-row-v2__rank">{index + 1}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.nameA} vs {entry.nameB}</strong><span>{getRelationshipLabel(entry.relationshipType)}</span></div><strong className="pc-ranking-row-v2__score">{sortMetric(entry, leaderboardSort, t)}</strong></div>)}</div>}</Card>
            <Card eyebrow="HALL OF FAME" title={t('pc.home.leaderboard.hallOfFame')}>{hallOfFame.length === 0 ? <Empty title={t('pc.home.leaderboard.noHallTitle')} description={t('pc.home.leaderboard.noHallDescription')} /> : <div className="pc-ranking-list-v2">{hallOfFame.map((entry) => <div className="pc-ranking-row-v2" key={`${entry.seasonId}:${entry.rank}:${entry.caseId}`}><span className="pc-ranking-row-v2__rank">{entry.rank}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.playerName}</strong><span>{formatHallOfFameCaseLabel(entry.caseId, allCases)}</span></div><strong className="pc-ranking-row-v2__score">{t('pc.home.unit.points', { count: entry.score })}</strong></div>)}</div>}</Card>
          </div>
        </section>
      )}

      {view === 'settings' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="SETTINGS" title={t('settings.title')} description={t('settings.preview.designGuideNote')} onBack={() => setView('home')} />
          <div className="pc-settings-grid-v2">
            <Card eyebrow="DISPLAY" title={t('settings.display.title')}>
              <div className="pc-settings-select-row">
                <div>
                  <strong>{t('settings.display.resolutionPreset')}</strong>
                  <p>{t('settings.display.resolutionDescription')}</p>
                </div>
                <select
                  className="pc-settings-select"
                  value={screenPreset}
                  onChange={(event) => requestScreenPreset(event.target.value as ScreenPresetId)}
                >
                  <option value="auto">{t('settings.display.autoDetect')}</option>
                  {SCREEN_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}{p.note ? ` (${p.note})` : ''}</option>
                  ))}
                </select>
              </div>
            </Card>
            <Card eyebrow="LANGUAGE" title={t('settings.language.title')}>
              <div className="pc-settings-select-row">
                <div>
                  <strong>{t('settings.language.displayLanguage')}</strong>
                  <p>{t('settings.language.displayLanguageDescription')}</p>
                </div>
                <select
                  className="pc-settings-select"
                  value={locale}
                  aria-label={t('language.selectorTitle')}
                  onChange={(event) => setLocale(event.target.value as LocaleCode)}
                >
                  {locales.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.nativeName}
                    </option>
                  ))}
                </select>
              </div>
              <SummaryRow label={t('settings.language.current')} value={selectedLocale?.nativeName ?? locale} />
            </Card>
            <Card eyebrow="AUDIO" title={t('settings.audio.title')}><ToggleRow checked={bgmOn} label={t('settings.audio.bgmShort')} description={t('settings.audio.bgmHomeDesc')} onToggle={toggleBgm} /><ToggleRow checked={sfxOn} label={t('settings.audio.sfxShort')} description={t('settings.audio.sfxHomeDesc')} onToggle={toggleSfx} /></Card>
            <Card eyebrow="GAMEPLAY" title={t('settings.gameplay.homeTitle')}><SummaryRow label={t('settings.gameplay.behaviorHintsShort')} value={settings.showBehaviorHints ? t('settings.toggle.on') : t('settings.toggle.off')} /><SummaryRow label={t('settings.gameplay.autoAdvance')} value={settings.autoAdvanceDialogue ? t('settings.toggle.on') : t('settings.toggle.off')} /><div className="pc-settings-select-row"><div><strong>{t('settings.gameplay.textSpeed')}</strong><p>{t('settings.gameplay.textSpeedHomeDesc')}</p></div><select className="pc-settings-select" onChange={(event) => updateTypingSpeed(event.target.value as HomeSettings['typingSpeed'])} value={settings.typingSpeed}><option value="fast">{t('settings.gameplay.speed.fastAdverb')}</option><option value="normal">{t('settings.gameplay.speed.normal')}</option><option value="slow">{t('settings.gameplay.speed.slowAdverb')}</option></select></div></Card>
            <Card eyebrow="LIVE" title={t('pc.home.modal.live.title')}><SummaryRow label="AI" value={liveStatus} /><SummaryRow label={t('pc.home.modal.live.rechargeLabel')} value={formatCountdown(countdown)} /><button className="pc-inline-button" disabled={checkingConnection} onClick={refreshConnection} type="button">{checkingConnection ? t('pc.home.status.checking') : t('pc.home.modal.live.checkAgain')}</button></Card>
            <Card eyebrow="DATA" title={t('settings.data.telemetry.group')}>
              <ToggleRow
                checked={telemetryAllowed}
                label={t('settings.data.telemetry.toggle')}
                description={t('settings.data.telemetry.toggleDesc')}
                onToggle={toggleTelemetry}
              />
            </Card>
          </div>
        </section>
      )}

      {historyDetailEntry ? (
        <HistoryDetailModal entry={historyDetailEntry} onClose={() => setHistoryDetailEntry(null)} />
      ) : null}

      {pendingScreenPreset ? (
        <ScreenPresetConfirmModal countdown={screenConfirmCountdown} onCancel={revertScreenPreset} onConfirm={keepScreenPreset} />
      ) : null}
    </div>
  )
}

function ModeCard({ badge, iconId, label, metaLeft, metaRight, onClick, progressRate, season = false }: { badge: string; iconId: string; label: string; metaLeft: string; metaRight: string; onClick: () => void; progressRate: number; season?: boolean }) {
  return (
    <button className={`pc-mode-card${season ? ' is-season' : ''}`} onClick={onClick} type="button">
      <div className="pc-mode-card__head">
        <span className="pc-mode-card__icon"><PCSvgIcon id={iconId} size={36} /></span>
        <div className="pc-mode-card__head-text">
          <span className="pc-mode-card__eyebrow">{badge}</span>
          <strong className="pc-mode-card__title">{label.replace(/\s*>$/, '')}</strong>
        </div>
        <span className="pc-mode-card__arrow" aria-hidden="true">›</span>
      </div>
      <div className="pc-mode-card__meta">
        <span>{metaLeft}</span>
        <span>{metaRight}</span>
      </div>
      <div className="pc-mode-card__track"><i style={{ width: `${progressRate}%` }} /></div>
    </button>
  )
}

function InfoCard({ iconId, onClick, subtitle, title }: { actionLabel?: string; iconId: string; onClick: () => void; subtitle: string; title: string }) {
  return (
    <button className="pc-home-info-card" onClick={onClick} type="button">
      <span className="pc-home-info-card__icon"><PCSvgIcon id={iconId} size={22} /></span>
      <div className="pc-home-info-card__copy">
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>
      <span className="pc-home-info-card__arrow" aria-hidden="true">›</span>
    </button>
  )
}

function DepthHeader({ eyebrow, title, description, onBack }: { eyebrow: string; title: string; description: string; onBack: () => void }) {
  return <header className="pc-depth-header"><button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span>{translate('pc.home.back')}</button><div className="pc-depth-header__copy"><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></header>
}

function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="pc-panel-card-v2"><span className="pc-panel-card-v2__eyebrow">{eyebrow}</span><h3>{title}</h3>{children}</section>
}

function Empty({ title, description }: { title: string; description: string }) {
  return <div className="pc-empty-block"><span className="pc-empty-block__icon"><PCSvgIcon id="i-doc" size={22} /></span><strong>{title}</strong><p>{description}</p></div>
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="pc-mini-stat"><span>{label}</span><strong>{value}</strong></div>
}

function _MiniActionCard({ iconId, label, subLabel }: { iconId: string; label: string; subLabel: string }) {
  return <div className="pc-mini-action-card"><span className="pc-mini-action-card__icon"><PCSvgIcon id={iconId} size={16} /></span><strong>{label}</strong><small>{subLabel}</small></div>
}

function _Achievement({ iconId, label, value }: { iconId: string; label: string; value: string }) {
  return <div className="pc-achievement-card"><span className="pc-achievement-card__icon"><PCSvgIcon id={iconId} size={26} /></span><strong>{value}</strong><small>{label}</small></div>
}

function AxisRow({ label, left, right, value }: { label: string; left: string; right: string; value: number }) {
  const clamped = Math.max(-100, Math.min(100, value))
  const percent = ((clamped + 100) / 200) * 100
  const leftGlow = clamped < 0 ? Math.ceil((Math.abs(clamped) / 100) * 5) : 0
  const rightGlow = clamped > 0 ? Math.ceil((clamped / 100) * 5) : 0
  return (
    <div className="pc-axis-row">
      <div className="pc-axis-row__head"><strong>{label}</strong></div>
      <div className="pc-axis-row__track">
        <span className={`pc-axis-row__pole glow-${leftGlow}`}>{left}</span>
        <div className="pc-axis-row__line"><i style={{ left: `${percent}%` }} /></div>
        <span className={`pc-axis-row__pole glow-${rightGlow}`}>{right}</span>
      </div>
    </div>
  )
}

function ToggleRow({ checked, label, description, onToggle }: { checked: boolean; label: string; description: string; onToggle: () => void }) {
  return <div className="pc-toggle-row"><div><strong>{label}</strong><p>{description}</p></div><button className={`pc-toggle-row__switch${checked ? ' is-on' : ''}`} onClick={onToggle} type="button"><i /></button></div>
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="pc-summary-row"><strong>{label}</strong><span>{value}</span></div>
}

function ScreenPresetConfirmModal({ countdown, onCancel, onConfirm }: { countdown: number; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="pc-resolution-confirm-backdrop" role="presentation">
      <section className="pc-resolution-confirm" role="dialog" aria-modal="true" aria-labelledby="pc-resolution-confirm-title">
        <h3 id="pc-resolution-confirm-title">{translate('pc.resolutionConfirm.title')}</h3>
        <div className="pc-resolution-confirm__count">
          <span>{translate('pc.resolutionConfirm.rollback', { seconds: countdown })}</span>
        </div>
        <div className="pc-resolution-confirm__actions">
          <button className="pc-inline-button" onClick={onConfirm} type="button">{translate('pc.home.yes')}</button>
          <button className="pc-inline-button is-ghost" onClick={onCancel} type="button">{translate('pc.home.no')}</button>
        </div>
      </section>
    </div>
  )
}

function getCaseDisplayTitle(caseData: CaseData): string {
  return caseData.meta?.title ?? `${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`
}

function getNumberedCaseTitle(caseData: CaseData, index: number): string {
  return `${String(index + 1).padStart(2, '0')}-${getCaseDisplayTitle(caseData)}`
}

function formatHistoryDate(date: string, locale: LocaleCode = 'ko'): string {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatHistoryOptionLabel(entry: ExtendedHistoryEntry, t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string, locale: LocaleCode): string {
  const d = new Date(entry.date)
  const stamp = d.toLocaleString(locale, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  return `[ ${stamp} ] - ${t('pc.home.unit.points', { count: entry.score })} / ${getHistoryRating(entry.score, t)}`
}

function getHistoryRating(score: number, t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string = translate): string {
  if (score >= 90) return t('pc.home.history.rating.legend')
  if (score >= 75) return t('pc.home.history.rating.excellent')
  if (score >= 60) return t('pc.home.history.rating.good')
  if (score >= 40) return t('pc.home.history.rating.fair')
  return t('pc.home.history.rating.poor')
}

function formatSolutionLabel(solution: string): string {
  return solution.includes('::') ? solution.slice(solution.indexOf('::') + 2) : solution
}

function sanitizeStoredText(text: string): string {
  return text
    .replace(/[.。]\s*,\s*/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function splitResolutionSentences(text: string): string[] {
  return sanitizeStoredText(text)
    .split(/[.。]\s*/)
    .map((sentence) => sentence.trim().replace(/^,\s*/, '').trim())
    .filter(Boolean)
}

function getHistoryVerdictBrief(entry: ExtendedHistoryEntry, locale: LocaleCode): string {
  const detail = entry.verdictDetail
  if (detail?.verdictSummary?.caseSummary && !hasUnexpectedHangulForLocale(detail.verdictSummary.caseSummary, locale)) return sanitizeStoredText(detail.verdictSummary.caseSummary)
  if (detail?.selectedSolutions?.length) {
    const text = sanitizeStoredText(detail.selectedSolutions.map(formatSolutionLabel).slice(0, 2).join('. '))
    if (!hasUnexpectedHangulForLocale(text, locale)) return text
  }
  if (locale === 'en') return `${entry.nameA} vs ${entry.nameB} · ${formatHistoryDate(entry.date, locale)} verdict record`
  if (locale === 'ja') return `${entry.nameA} vs ${entry.nameB} · ${formatHistoryDate(entry.date, locale)} 判決記録`
  if (locale === 'zh-CN') return `${entry.nameA} vs ${entry.nameB} · ${formatHistoryDate(entry.date, locale)} 判决记录`
  return `${entry.nameA} vs ${entry.nameB} · ${formatHistoryDate(entry.date, locale)} 판결 기록`
}

function getStoredFindingLabel(value: string, locale: LocaleCode): string {
  const labels = {
    ko: { true: '사실', false: '거짓', pending: '보류', none: '미기록' },
    en: { true: 'Fact', false: 'False', pending: 'Deferred', none: 'Not recorded' },
    ja: { true: '事実', false: '虚偽', pending: '保留', none: '未記録' },
    'zh-CN': { true: '事实', false: '虚假', pending: '暂缓', none: '未记录' },
  } as const
  const table = labels[locale] ?? labels.ko
  if (value === 'true') return table.true
  if (value === 'false') return table.false
  if (value === 'pending') return table.pending
  return value || table.none
}

function splitStoredParagraphs(text?: string): string[] {
  return (text ?? '')
    .replace(/\*?\*?(?:교훈 한 문장|교훈|명언|lesson|moral|quote|教訓|格言|启示|教训|名言)\*?\*?\s*[:：]\s*/gi, '')
    .split(/\n\n+/)
    .map((para) => sanitizeStoredText(para))
    .filter(Boolean)
}

function pickStoredAftermath(snapshotText?: string, detailText?: string): string | undefined {
  const candidates = [snapshotText, detailText].filter((text): text is string => Boolean(text?.trim()))
  if (candidates.length === 0) return undefined
  return candidates.sort((a, b) => {
    const paraDelta = splitStoredParagraphs(b).length - splitStoredParagraphs(a).length
    if (paraDelta !== 0) return paraDelta
    return b.length - a.length
  })[0]
}

function buildHistoryAftermathFallback(entry: ExtendedHistoryEntry, caseTitle: string, selectedSolutions: string[], locale: LocaleCode): string[] {
  const mainAction = selectedSolutions.map(formatSolutionLabel).filter(Boolean)[0]
  if (locale === 'en') {
    const actionText = mainAction
      ? `The conclusion, "${mainAction}", did not remain as wording on a record. It became a promise and boundary the two had to check again.`
      : 'Instead of declaring the conclusion loudly, the two first wrote down the records and words that still needed checking.'
    const lesson = entry.relationshipType === 'friend'
      ? 'Even a late warning leaves a wound if it is never explained.'
      : entry.relationshipType === 'family'
        ? 'A family heart also has to be reread before the facts.'
        : entry.relationshipType === 'spouse'
          ? 'Silence can outlast goodwill as suspicion.'
          : 'An unchecked heart returns from outside the relationship.'
    return [
      `Even after the verdict in ${caseTitle}, ${entry.nameA} and ${entry.nameB} could not speak easily for a while. Scores and records had been organized, but the feelings between them were still less clear than the words spoken in court. One nodded first, and the other read both fatigue and hesitation in that expression.`,
      `A few days later, they exchanged only necessary messages. ${actionText} Their replies stayed cautious because the emotions were not fully settled, and several sentences were written, erased, and rewritten. Still, they did not corner each other again with certainty that had never been checked.`,
      `As time passed, the case became less about winning and more about the distance that remained. They could not return easily to the way things were, but they understood more clearly where the same wound had started. That understanding was too small to call reconciliation, but it was enough to keep the next words from breaking immediately.`,
      `"${lesson}"`,
    ]
  }
  if (locale === 'ja') {
    const actionText = mainAction
      ? `「${mainAction}」という結論は文面のまま残らず、二人がもう一度確かめるべき約束と境界へ移りました。`
      : '二人は結論を大きく語るよりも、確認すべき記録と残った言葉を先に書き分けました。'
    const lesson = entry.relationshipType === 'friend'
      ? '遅い警告も、説明されなければ傷として残る。'
      : entry.relationshipType === 'family'
        ? '家族の心も、事実の前で読み直されなければならない。'
        : entry.relationshipType === 'spouse'
          ? '沈黙は時に、善意より長く疑いを残す。'
          : '確かめない心は、関係の外から戻ってくる。'
    return [
      `${caseTitle}の判決が終わった後も、${entry.nameA}と${entry.nameB}はしばらく簡単には言葉を出せませんでした。点数と記録は整理されましたが、互いに残った感情はまだ法廷の言葉ほど明確ではありませんでした。片方が先にうなずき、もう片方はその表情に遅れてきた疲れと迷いを見ました。`,
      `数日後、二人は必要な連絡だけを短く交わしました。${actionText} 感情が完全にほどけたわけではなく、返信は慎重で、何度か書いた言葉を消してまた書き直しました。それでも、以前のように確かめない確信で相手を追い詰めることはありませんでした。`,
      `時間が経つにつれ、事件は勝敗よりも残った距離の問題へ変わりました。二人は簡単に以前のようには戻れませんでしたが、同じ傷がどこから始まったのかは少しはっきり分かるようになりました。その理解は和解と呼ぶには小さくても、次の言葉を壊さないための最低限の変化でした。`,
      `「${lesson}」`,
    ]
  }
  if (locale === 'zh-CN') {
    const actionText = mainAction
      ? `“${mainAction}”这个结论没有停留在文字上，而是变成两人需要重新确认的约定和边界。`
      : '两人没有急着大声宣告结论，而是先把需要重新确认的记录和没说完的话分别写下。'
    const lesson = entry.relationshipType === 'friend'
      ? '迟来的提醒若不被说明，也会留下伤口。'
      : entry.relationshipType === 'family'
        ? '家人的心意，也要在事实面前重新读过。'
        : entry.relationshipType === 'spouse'
          ? '沉默有时比善意更久地留下怀疑。'
          : '未经确认的心意，会从关系之外再次回来。'
    return [
      `${caseTitle}的判决结束后，${entry.nameA}和${entry.nameB}仍有一段时间很难开口。分数和记录已经整理完，但彼此留下的情绪还没有法庭里的句子那样清楚。一方先点了头，另一方从那个表情里看见迟来的疲惫和犹豫。`,
      `几天后，两人只短短交换必要的联系。${actionText} 情绪并没有完全松开，回复仍很谨慎，有几次写下的话又被删掉再重新写过。即便如此，他们没有再像以前那样用未经确认的确信逼迫对方。`,
      `随着时间过去，案件从胜负变成了剩余距离的问题。两人很难轻易回到过去，但他们更清楚同一道伤是从哪里开始的。那份理解还小得不能称作和解，却至少成了不让下一句话立刻崩坏的变化。`,
      `“${lesson}”`,
    ]
  }

  const actionText = mainAction
    ? `${mainAction}라는 결론은 문장 그대로 남지 않고, 두 사람이 다시 확인해야 할 약속과 경계로 옮겨졌다.`
    : '두 사람은 당장 결론을 크게 말하기보다, 다시 확인해야 할 기록과 남은 말을 먼저 나누어 적었다.'
  const lesson = entry.relationshipType === 'friend'
    ? '늦은 경고도 설명되지 않으면 상처로 남는다.'
    : entry.relationshipType === 'family'
      ? '가족의 마음도 사실 앞에서 다시 읽혀야 한다.'
      : entry.relationshipType === 'spouse'
        ? '침묵은 때로 선의보다 오래 의심을 남긴다.'
        : '확인하지 않은 마음은 관계 밖에서 다시 돌아온다.'

  return [
    `${caseTitle}의 판결이 끝난 뒤에도 ${entry.nameA}과 ${entry.nameB}은 한동안 쉽게 말을 꺼내지 못했다. 점수와 기록은 정리되었지만, 서로에게 남은 감정은 아직 법정 안의 문장처럼 또렷하지 않았다. 한쪽이 먼저 고개를 끄덕였고, 다른 한쪽은 그 표정에서 뒤늦은 피로와 망설임을 함께 보았다.`,
    `며칠 뒤 두 사람은 필요한 연락만 짧게 주고받았다. ${actionText} 감정이 완전히 풀린 것은 아니어서 답장은 조심스러웠고, 몇 번은 쓴 말을 지우고 다시 적었다. 그래도 예전처럼 확인하지 않은 확신으로 상대를 몰아붙이지는 않았다.`,
    `시간이 지나면서 사건은 승패보다 남은 거리의 문제로 바뀌었다. 두 사람은 쉽게 예전처럼 돌아가지는 못했지만, 같은 상처가 어디서 시작됐는지는 조금 더 선명하게 알게 되었다. 그 이해는 화해라고 부르기에는 작았지만, 다음 말을 망치지 않기 위한 최소한의 변화였다.`,
    `"${lesson}"`,
  ]
}

function splitStoredAftermathDisplay(text: string | undefined, entry: ExtendedHistoryEntry, caseTitle: string, selectedSolutions: string[], locale: LocaleCode): { bodyParas: string[]; lesson: string | null } {
  const fallback = buildHistoryAftermathFallback(entry, caseTitle, selectedSolutions, locale)
  const paragraphs = splitStoredParagraphs(text).filter((paragraph) => !hasUnexpectedHangulForLocale(paragraph, locale))
  const isMechanicalOldText = Boolean(text && /책임\s*비율|책임.*배분.*판결|판결문에\s*적힌\s*해결\s*방향|다음\s*조치였다|후일담의\s*방향/.test(text))
  const completed = isMechanicalOldText
    ? fallback
    : paragraphs.length === 0
    ? fallback
    : paragraphs.length >= 4
    ? paragraphs
    : [
      ...paragraphs,
      ...fallback.slice(Math.max(1, paragraphs.length)),
    ].slice(0, 4)

  if (completed.length === 0) return { bodyParas: [], lesson: null }
  const last = completed[completed.length - 1]
  const quotedLesson = last.match(/^[“"']?(.+?)[”"']?$/)
  return {
    bodyParas: completed.slice(0, -1),
    lesson: quotedLesson?.[1]?.trim() ?? last,
  }
}

function HistoryDetailModal({ entry, onClose }: { entry: ExtendedHistoryEntry; onClose: () => void }) {
  const { t, locale } = useI18n()
  const resultCopy = getResultCopy(locale)
  const [tab, setTab] = useState<HistoryResultTab>('result')
  const caseData = getCaseById(entry.caseId)
  const detail = entry.verdictDetail
  const snapshot = entry.resultSnapshot
  const summary = snapshot?.verdictSummary ?? detail?.verdictSummary
  const score = snapshot?.score ?? {
    total: entry.score,
    insight: entry.insight,
    authority: entry.authority,
    wisdom: entry.wisdom,
    rating: getHistoryRating(entry.score, t),
  }
  const selectedSolutions = snapshot?.selectedSolutions ?? detail?.selectedSolutions ?? []
  const caseTitle = snapshot?.caseTitle ?? (caseData ? getCaseDisplayTitle(caseData) : `${entry.nameA} vs ${entry.nameB}`)
  const aftermath = pickStoredAftermath(snapshot?.aftermath, detail?.aftermath)
  const { bodyParas: aftermathBodyParas, lesson: aftermathLesson } = splitStoredAftermathDisplay(aftermath, entry, caseTitle, selectedSolutions, locale)
  const factRows = snapshot?.factFindings?.length
    ? snapshot.factFindings
    : caseData?.disputes.map((dispute) => ({
      id: dispute.id,
      name: detail?.disputeNames?.[dispute.id] ?? dispute.name,
      finding: detail?.factFindings?.[dispute.id] ?? 'pending',
      truth: dispute.truth,
    })) ?? Object.entries(detail?.factFindings ?? {}).map(([id, finding]) => ({
      id,
      name: detail?.disputeNames?.[id] ?? id,
      finding,
      truth: undefined,
    }))
  const rawResolutionText = summary?.resolution && !hasUnexpectedHangulForLocale(summary.resolution, locale)
    ? summary.resolution
    : selectedSolutions.map(formatSolutionLabel).filter((item) => !hasUnexpectedHangulForLocale(item, locale)).join('. ')
  const resolutionSentences = splitResolutionSentences(rawResolutionText)
  const relationshipLabel = snapshot?.relationshipLabel && !hasUnexpectedHangulForLocale(snapshot.relationshipLabel, locale)
    ? snapshot.relationshipLabel
    : getRelationshipLabel(entry.relationshipType)
  const factMomentLines = factRows.map((row) => {
    const findingLabel = getStoredFindingLabel(row.finding, locale)
    if (locale === 'en') return `${row.name}: organized as ${findingLabel}.`
    if (locale === 'ja') return `${row.name}: ${findingLabel}として整理しました。`
    if (locale === 'zh-CN') return `${row.name}: 整理为${findingLabel}。`
    return `${row.name}: ${findingLabel}로 정리했습니다.`
  })
  const keyMomentLines = summary?.keyMoment && !hasUnexpectedHangulForLocale(summary.keyMoment, locale)
    ? splitResolutionSentences(summary.keyMoment)
    : factMomentLines
  const partyAName = caseData?.duo.partyA.name ?? entry.nameA
  const partyBName = caseData?.duo.partyB.name ?? entry.nameB
  const responsibility = summary?.responsibility
  const percentA = responsibility?.percentA ?? 50
  const percentB = responsibility?.percentB ?? 50
  const historyResultTabs = HISTORY_RESULT_TAB_IDS.map((id) => ({
    id,
    label: t(`pc.home.history.tab.${id}` as MessageKey),
  }))
  const currentTabIndex = HISTORY_RESULT_TAB_IDS.findIndex((item) => item === tab)
  const prevTab = currentTabIndex > 0 ? HISTORY_RESULT_TAB_IDS[currentTabIndex - 1] : null
  const nextTab = currentTabIndex >= 0 && currentTabIndex < HISTORY_RESULT_TAB_IDS.length - 1 ? HISTORY_RESULT_TAB_IDS[currentTabIndex + 1] : null
  const stars = Math.max(1, Math.min(3, Math.ceil(score.total / 35)))
  const rewardTitles: Array<{ id: string; name: string; rarity?: string; description?: string }> = snapshot?.titles?.length
    ? snapshot.titles.map((title) => ({ id: title.id, name: title.name, rarity: title.rarity, description: title.description }))
    : entry.titles.map((title) => ({ id: title, name: title }))
  const rewardFragments = snapshot?.rewards ?? []

  return (
    <div className="pc-history-detail-modal" role="dialog" aria-modal="true" aria-label={t('pc.home.history.details')}>
      <div className="pc-history-detail-modal__backdrop" onClick={onClose} />
      <section className="pc-history-detail-modal__panel" onClick={(event) => event.stopPropagation()}>
        <PCResultFrame
          activeTab={tab}
          className="pc-result-screen--history"
          eyebrow={t('pc.home.profile.tab.history')}
          footer={(
            <>
              <button
                className="pc-verdict-footer__button"
                disabled={!prevTab}
                onClick={() => prevTab && setTab(prevTab)}
                type="button"
              >
                {t('pc.verdict.footer.previous')}
              </button>
              {nextTab ? (
                <button className="pc-verdict-footer__button is-primary" onClick={() => setTab(nextTab)} type="button">
                  {t('pc.verdict.footer.next')}
                </button>
              ) : (
                <button className="pc-verdict-footer__button is-primary" onClick={onClose} type="button">
                  {t('pc.common.close')}
                </button>
              )}
            </>
          )}
          headline={caseTitle}
          meta={[
            { label: t('pc.interaction.relationship'), value: relationshipLabel },
            { label: t('pc.interaction.disputeList'), value: t('pc.home.unit.cases', { count: factRows.length }) },
            { label: t('pc.interaction.unlockedEvidence'), value: `${caseData?.evidence.length ?? 0}` },
          ]}
          onTabChange={setTab}
          rating={score.rating}
          score={score.total}
          stars={stars}
          summary={`${formatHistoryDate(entry.date, locale)} · ${relationshipLabel} · ${t('pc.home.unit.points', { count: score.total })}`}
          tabs={historyResultTabs}
        >
                {tab === 'result' ? (
                  <div className="pc-result-combined">
                    <div className="pc-result-donuts">
                      <HistoryScoreDonut label={t('pc.home.sort.insight')} value={score.insight} color="var(--pc-blue)" />
                      <HistoryScoreDonut label={t('pc.home.sort.authority')} value={score.authority} color="var(--pc-gold)" />
                      <HistoryScoreDonut label={t('pc.home.sort.wisdom')} value={score.wisdom} color="var(--pc-green)" />
                      <HistoryScoreDonut label={t('pc.home.sort.total')} value={score.total} color="#d4a24e" />
                    </div>

                    <div className="pc-result-truth">
                      <h3>{t('pc.home.history.verdictBrief')}</h3>
                      {factRows.map((row) => {
                        const correct = row.truth == null || row.finding === 'pending' ? null : (row.finding === 'true') === row.truth
                        return (
                          <div className={`pc-result-truth__card ${correct === true ? 'is-correct' : correct === false ? 'is-wrong' : ''}`} key={row.id}>
                            <div>
                              <strong>{row.name}</strong>
                              <p>{t('pc.record.myJudgment')}: {getStoredFindingLabel(row.finding, locale)}</p>
                            </div>
                            <div className="pc-history-result-mark">
                              {correct === true ? 'O' : correct === false ? 'X' : '—'}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <span aria-hidden="true" style={{ display: 'none' }} />
                  </div>
                ) : null}

                {tab === 'verdict_pronounce' ? (
                  <div className="pc-result-text">
                    <p className="pc-history-result-pronounce">
                      {locale === 'en'
                        ? `This ${relationshipLabel} dispute between ${partyAName} and ${partyBName} is being replayed from the saved verdict record.`
                        : locale === 'ja'
                          ? `本件は${partyAName}と${partyBName}の${relationshipLabel}をめぐる紛争で、保存された判決記録をもとに再表示しています。`
                          : locale === 'zh-CN'
                            ? `本案是${partyAName}与${partyBName}之间的${relationshipLabel}纠纷，正在根据已保存的判决记录重新显示。`
                            : `본 사건은 ${partyAName}과 ${partyBName}의 ${relationshipLabel} 분쟁으로, 저장된 판결 기록을 기준으로 다시 표시합니다.`}
                    </p>

                    {summary ? (
                      <>
                        <div className="pc-result-verdict-pronounce-grid">
                          <div className="pc-history-result-scale">
                            <svg width="240" height="180" viewBox="0 0 420 220" aria-hidden="true">
                              <polygon points="210,160 192,188 228,188" fill="#8b6f3d" opacity="0.7" />
                              <rect x="175" y="188" width="70" height="5" rx="2" fill="#8b6f3d" opacity="0.35" />
                              <g transform={`rotate(${((50 - percentA) / 50) * 12}, 210, 156)`}>
                                <rect x="50" y="154" width="320" height="6" rx="3" fill="#8b6f3d" />
                                <circle cx="100" cy="118" r="32" fill="rgba(74, 111, 165, 0.12)" stroke="#4a6fa5" strokeWidth="1.8" />
                                <foreignObject x="70" y="88" width="60" height="60">
                                  <div className="pc-history-result-portrait"><PCCharacterPortrait alt={partyAName} caseId={entry.caseId} emotion="defensive" fallbackSymbolId="i-person" party="a" size={60} /></div>
                                </foreignObject>
                                <text x="100" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4a6fa5">{partyAName}</text>
                                <circle cx="320" cy="118" r="32" fill="rgba(168, 79, 79, 0.12)" stroke="#a84f4f" strokeWidth="1.8" />
                                <foreignObject x="290" y="88" width="60" height="60">
                                  <div className="pc-history-result-portrait"><PCCharacterPortrait alt={partyBName} caseId={entry.caseId} emotion="defensive" fallbackSymbolId="i-person" party="b" size={60} /></div>
                                </foreignObject>
                                <text x="320" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a84f4f">{partyBName}</text>
                              </g>
                            </svg>
                            <div><span>{percentA}%</span><span>{percentB}%</span></div>
                          </div>

                          <div className="pc-result-summary__section pc-result-summary__section--compact">
                            <h3>{resultCopy.sections.keyMoments}</h3>
                            <ul className="pc-result-key-moments__list">
                              {keyMomentLines.map((line, index) => <li className="pc-result-key-moments__item" key={`${index}-${line}`}>{line}</li>)}
                            </ul>
                          </div>

                          <div className="pc-result-summary__section pc-result-summary__section--compact pc-result-resolution--wide" style={{ margin: 0, gridColumn: '1 / -1' }}>
                            <h3>{resultCopy.sections.resolution}</h3>
                            <div className="pc-result-resolution__list">
                              {resolutionSentences.map((item, index) => <div className="pc-result-resolution__item" key={`${index}-${item}`}>{item}</div>)}
                            </div>
                          </div>
                        </div>
                        <div className="pc-result-summary__section">
                          <h3>{locale === 'en' ? 'Verdict Summary' : locale === 'ja' ? '判決要約' : locale === 'zh-CN' ? '判决摘要' : '판결문 요약'}</h3>
                          <p>{hasUnexpectedHangulForLocale(summary.caseSummary, locale) ? getHistoryVerdictBrief(entry, locale) : summary.caseSummary}</p>
                          {summary.responsibilityReason && !hasUnexpectedHangulForLocale(summary.responsibilityReason, locale) ? <p>{summary.responsibilityReason}</p> : null}
                        </div>
                      </>
                    ) : (
                      <div className="pc-result-summary__section">
                        <h3>{locale === 'en' ? 'Verdict Summary' : locale === 'ja' ? '判決要約' : locale === 'zh-CN' ? '判决摘要' : '판결문 요약'}</h3>
                        <p>{getHistoryVerdictBrief(entry, locale)}</p>
                      </div>
                    )}
                    <span aria-hidden="true" style={{ display: 'none' }} />
                  </div>
                ) : null}

                {tab === 'epilogue' ? (
                  <div className="pc-result-text pc-history-epilogue-tab">
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--pc-gold-light)', textTransform: 'uppercase' }}>Epilogue</div>
                    </div>
                    <div className="pc-history-epilogue-box">
                      <div className="pc-result-aftermath">
                        {aftermathBodyParas.length ? aftermathBodyParas.map((paragraph, index) => (
                          <p className="pc-result-aftermath__para" key={`${index}-${paragraph.slice(0, 12)}`}>
                            {paragraph}
                          </p>
                        )) : (
                          <p className="pc-history-detail-empty">
                            {locale === 'en' ? 'This previous play record has no saved epilogue. Future completed plays will save the epilogue as well.'
                              : locale === 'ja' ? '以前のプレイ記録には後日談が保存されていません。今後完了したプレイでは後日談も保存されます。'
                                : locale === 'zh-CN' ? '该历史游玩记录没有保存后日谈。之后完成的游玩会一并保存后日谈。'
                                  : '이전 플레이 기록에는 후일담이 저장되어 있지 않습니다. 앞으로 완료되는 플레이는 후일담까지 함께 저장됩니다.'}
                          </p>
                        )}
                        {aftermathLesson ? (
                          <p className="pc-result-aftermath__lesson">
                            &ldquo;{aftermathLesson}&rdquo;
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <span aria-hidden="true" style={{ display: 'none' }} />
                  </div>
                ) : null}

                {tab === 'bonus' ? (
                  <div className="pc-result-text">
                    <div className="pc-history-bonus-layout">
                      <div className="pc-result-summary__section">
                        <h3>{locale === 'en' ? 'Earned Cards' : locale === 'ja' ? '獲得カード' : locale === 'zh-CN' ? '获得卡片' : '획득 카드'}</h3>
                        {rewardTitles.length ? (
                          <div className="pc-history-title-cards">
                            {rewardTitles.map((title) => {
                              const titleCopy = getRewardTitleInfo(title, locale)
                              return (
                                <div className={`pc-result-title-card ${title.rarity ? `is-${title.rarity}` : ''}`} key={title.id}>
                                  <span className="pc-result-title-card__name">{titleCopy.name}</span>
                                  {titleCopy.description ? <span className="pc-result-title-card__tooltip">{titleCopy.description}</span> : null}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <p className="pc-history-detail-empty">
                            {locale === 'en' ? 'No saved title record.'
                              : locale === 'ja' ? '保存された称号記録がありません。'
                                : locale === 'zh-CN' ? '没有保存的称号记录。'
                                  : '저장된 칭호 기록이 없습니다.'}
                          </p>
                        )}
                      </div>
                      <div className="pc-result-summary__section">
                        <h3>{locale === 'en' ? 'Reward Fragments' : locale === 'ja' ? '報酬フラグメント' : locale === 'zh-CN' ? '奖励碎片' : '보상 조각'}</h3>
                        <HistoryRewardGrid rewards={rewardFragments} />
                      </div>
                    </div>
                    <span aria-hidden="true" style={{ display: 'none' }} />
                  </div>
                ) : null}
        </PCResultFrame>
      </section>
    </div>
  )
}

function HistoryScoreDonut({ color, label, value }: { color: string; label: string; value: number }) {
  const pct = Math.max(0, Math.min(value, 100))
  const dash = (pct / 100) * 251
  return (
    <div className="pc-result-donut-single">
      <span className="pc-result-donut-label" style={{ color }}>{label}</span>
      <svg viewBox="0 0 100 100" width="180" height="180">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          className="pc-result-donut-ring"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeDasharray={`${dash} 251`}
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeWidth="6"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="55" textAnchor="middle" fill="#f2efe8" fontSize="28" fontWeight="900">{value}</text>
      </svg>
    </div>
  )
}

function HistoryRewardGrid({ rewards }: { rewards: Array<{ fragmentId: string; count: number; label?: string }> }) {
  const { locale } = useI18n()
  if (!rewards.length) {
    return (
      <p className="pc-history-detail-empty">
        {locale === 'en' ? 'No saved reward record.'
          : locale === 'ja' ? '保存された報酬記録がありません。'
            : locale === 'zh-CN' ? '没有保存的奖励记录。'
              : '저장된 보상 기록이 없습니다.'}
      </p>
    )
  }

  return (
    <div className="pc-history-reward-grid">
      {rewards.map((reward) => {
        const visual = FRAGMENT_VISUALS[reward.fragmentId as keyof typeof FRAGMENT_VISUALS]
        const rewardLabel = reward.label && !hasUnexpectedHangulForLocale(reward.label, locale)
          ? reward.label
          : getFragmentLabel(reward.fragmentId, locale)
        return (
          <div className="pc-history-reward-card" key={reward.fragmentId}>
            <PCFragmentIcon fragmentId={reward.fragmentId as UnsafeAny} size={56} />
            <strong>{rewardLabel ?? visual?.name ?? reward.fragmentId}</strong>
            <span>× {reward.count}</span>
          </div>
        )
      })}
    </div>
  )
}

function buildSessionProgress(cases: CaseData[], store: Record<string, { bestScore: number }>, historyScores: Record<string, number>): SessionProgress {
  const scores = cases.map((caseData) => Math.max(store[caseData.caseId]?.bestScore ?? 0, historyScores[caseData.caseId] ?? 0)).filter((score) => score > 0)
  const totalCount = cases.length
  const completedCount = scores.length
  return { totalCount, completedCount, averageScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null, progressRate: totalCount ? (completedCount / totalCount) * 100 : 0 }
}

function getHistoryKey(entry: ExtendedHistoryEntry) {
  return `${entry.caseId}:${entry.date}`
}

function sortMetric(entry: ExtendedHistoryEntry, sort: SortCategory, t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string) {
  if (sort === 'total') return t('pc.home.unit.points', { count: entry.score })
  if (sort === 'insight') return `${entry.insight}`
  if (sort === 'authority') return `${entry.authority}`
  return `${entry.wisdom}`
}
