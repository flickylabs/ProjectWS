import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getAllCases, getCaseById } from '../../../data/cases'
import { getHallOfFameForSeason, getJudgeProfile, getLeaderboard, getPlayerStats, loadExtendedHistory, loadProfile } from '../../../data/leaderboard'
import { getCurrentSeason, getRemainingDays } from '../../../data/seasons'
import { TITLE_LABELS } from '../../../engine/judgeProfileEngine'
import { checkConnection } from '../../../engine/llmClient'
import { isBgmEnabled, isSoundEnabled, playBgm as playBgmFn, setBgmEnabled, setSoundEnabled, stopBgm as stopBgmFn } from '../../../engine/soundEngine'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { setLLMMode } from '../../../hooks/useActionDispatch'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, type ScreenPresetId } from '../../../utils/screenPresets'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { GamePhase, type CaseData, type ExtendedHistoryEntry, type SortCategory } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCSessionIcon from '../icons/PCSessionIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCJudgeProgressionPanel from '../profile/PCJudgeProgressionPanel'
import { FRAGMENT_VISUALS, PCFragmentIcon } from '../progression/PCJudgeProgressionShared'
import { PCResultFrame } from '../result/PCResultScreen'
import PCCaseBrowser from './PCCaseBrowser'
import PCIntroSlides from './PCIntroSlides'
import { type PCGeneralSessionId, PC_GENERAL_SESSIONS, formatCountdown, getCasesForPcGeneralSession, getRelationshipLabel, getSeasonCases, hasSeenPcIntro, loadPcCaseProgress } from './pcHomeShared'

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

const SORTS: { id: SortCategory; label: string }[] = [
  { id: 'total', label: '총점' },
  { id: 'insight', label: '탐구' },
  { id: 'authority', label: '판결' },
  { id: 'wisdom', label: '해결' },
]

const HISTORY_RESULT_TABS: { id: HistoryResultTab; label: string }[] = [
  { id: 'result', label: '01 결과 확인' },
  { id: 'verdict_pronounce', label: '02 판결 선고' },
  { id: 'epilogue', label: '03 후일담' },
  { id: 'bonus', label: '04 보너스' },
]

function formatHallOfFameCaseLabel(caseId: string, cases: CaseData[]): string {
  const normalized = caseId.replace(/^case-/, '')
  const caseData = cases.find((item) => item.caseId.replace(/^case-/, '') === normalized)
  const number = normalized.match(/-(\d+)$/)?.[1] ?? ''
  const relationship = getRelationshipLabel(caseData?.meta?.relationshipType ?? normalized.replace(/-\d+$/, ''))
  const title = caseData?.meta?.title ?? normalized
  return number ? `${relationship}-${number} / ${title}` : `${relationship} / ${title}`
}

export default function PCHomeScreen() {
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
    [],
  )
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

  const titleInfo = TITLE_LABELS[judgeProfile.titleId] ?? TITLE_LABELS.neutral_observer
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
  const selectedSessionMeta = PC_GENERAL_SESSIONS.find((session) => session.id === selectedSession) ?? null
  const selectedSessionCases = selectedSession ? getCasesForPcGeneralSession(allCases, selectedSession) : []
  const seasonProgress = buildSessionProgress(seasonCases, progressStore, bestHistoryScores)
  const seasonHistory = useMemo(() => {
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
    useGameStore.getState().advancePhase(GamePhase.Phase1_InitialStatement)
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

  const openGuide = () => openPcInteractionPanel({
    title: '도움말',
    subtitle: 'PC 로비 가이드',
    tone: 'blue',
    body: '모드를 고르고 세션을 선택한 뒤 사건을 클릭하면 브리핑을 거쳐 바로 재판이 시작됩니다.',
  })

  const openLive = () => openPcInteractionPanel({
    title: '라이브 상태',
    subtitle: llmConnected ? 'AI 연결됨' : '오프라인 모드',
    tone: llmConnected ? 'gold' : 'neutral',
    body: [`AI 연결: ${llmConnected ? '정상' : '미연결'}`, `조사 토큰: ${globalInvest}`, `스킬 포인트: ${globalSkill}`, `다음 충전: ${formatCountdown(countdown)}`].join('\n'),
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
              <button className="pc-home-v2__tool pc-home-v2__tool--settings" onClick={() => setView('settings')} type="button" aria-label="설정">
                <PCSvgIcon id="i-gear" size={28} />
              </button>
            </div>
          </header>
          <div className="pc-home-v2__hero">
            <span className="pc-home-v2__eyebrow">COURT SIMULATION GAME</span>
            <div className="pc-home-v2__title-row">
              <img className="pc-home-v2__title-scale" src="/icons/ornament/scale-balance.png" alt="" width={48} height={48} aria-hidden="true" />
              <h1>솔로몬의 딜레마</h1>
              <img className="pc-home-v2__title-scale" src="/icons/ornament/scale-balance.png" alt="" width={48} height={48} aria-hidden="true" />
            </div>
            <p>현대판 솔로몬이 되어 판결을 내려보세요.</p>
          </div>
          <div className="pc-home-v2__mode-grid">
            <ModeCard badge="NORMAL MODE" iconId="i-gavel" label="일반 모드 >" metaLeft={`세션 ${PC_GENERAL_SESSIONS.length}개`} metaRight={`진척 ${totalGeneralCompleted}/${totalGeneralCases}`} onClick={() => { setSelectedSession(null); setView('general') }} progressRate={totalGeneralCases ? (totalGeneralCompleted / totalGeneralCases) * 100 : 0} />
            <ModeCard badge={season.name} iconId="i-crown" label="시즌 모드 >" metaLeft={seasonCases.length ? `${seasonCases.length}건 배정` : '배정 준비 중'} metaRight={`${remainingDays}일 남음`} onClick={() => setView('season')} progressRate={seasonProgress.progressRate} season />
          </div>
<div className="pc-home-v2__info-grid">
            <InfoCard actionLabel="재판관 정보 >" iconId="i-person" onClick={() => { setJudgeDeskTab('profile'); setView('profile') }} subtitle={profile.playerName} title={titleInfo.name} />
            <InfoCard actionLabel="상세 보기 >" iconId="i-crown" onClick={() => setView('leaderboard')} subtitle={season.name} title="리더보드" />
          </div>
        </section>
      )}

      {view === 'general' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="GENERAL MODE" title="일반 모드" description="세션을 고르면 해당 사건 리스트로 바로 이동합니다." onBack={() => setView('home')} />
          <div className="pc-session-grid-v2">
            {PC_GENERAL_SESSIONS.map((session, index) => {
              const progress = sessionProgress[session.id]
              const disabled = progress.totalCount === 0
              return (
                <button className={`pc-session-card-v2 pc-session-card-v2--${session.accent}${disabled ? ' is-disabled' : ''}`} disabled={disabled} key={session.id} onClick={() => { setSelectedSession(session.id); setView('generalCases') }} type="button">
                  <div className="pc-session-card-v2__top">
                    <span>{`SESSION ${String(index + 1).padStart(2, '0')}`}</span>
                    <strong>{disabled ? '준비 중' : `${progress.completedCount}/${progress.totalCount}`}</strong>
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
                      ? <span className="pc-session-card-v2__avg">평균 {progress.averageScore}점</span>
                      : <span className="pc-session-card-v2__avg pc-session-card-v2__avg--empty">—</span>}
                  </div>
                  {disabled && (
                    <div className="pc-session-card-v2__lock-overlay" aria-label="잠김">
                      <PCSvgIcon id="i-lock" size={56} />
                      <span>준비 중</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {view === 'generalCases' && selectedSessionMeta && (
        <section className="pc-depth-shell"><PCCaseBrowser accentIconId={selectedSessionMeta.iconId} cases={selectedSessionCases} description={`${selectedSessionMeta.tagline}. 선택한 사건은 브리핑을 거쳐 바로 재판으로 이어집니다.`} eyebrow="일반 모드" onBack={() => setView('general')} onSelectCase={startCase} progressLabel={`${sessionProgress[selectedSessionMeta.id].completedCount}/${sessionProgress[selectedSessionMeta.id].totalCount}`} showCompletedFilter title={`${selectedSessionMeta.label} · ${selectedSessionCases.length}건`} /></section>
      )}

      {view === 'season' && (
        <section className="pc-depth-shell"><PCCaseBrowser accentIconId="i-crown" cases={seasonCases} description={`${season.name}에 배정된 사건들입니다. 시즌 전용 사건은 추후 선별 배정됩니다.`} emptyDescription="시즌 배정이 열리면 이곳에 자동으로 반영됩니다." emptyTitle="현재 시즌 사건이 아직 배정되지 않았습니다." eyebrow={season.name} onBack={() => setView('home')} onSelectCase={startCase} progressLabel={`${seasonProgress.completedCount}/${seasonProgress.totalCount}`} title="시즌 모드" /></section>
      )}

      {view === 'profile' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="JUDGE DESK" title="재판관 정보" description="현재 재판관의 성향과 타이틀, 판결 기록을 확인합니다." onBack={() => setView('home')} />
          <div className="pc-desk-tabs">
            <button className={`pc-desk-tab${judgeDeskTab === 'profile' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('profile')} type="button">정보 확인</button>
            <button className={`pc-desk-tab${judgeDeskTab === 'history' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('history')} type="button">판결 기록</button>
            <button className={`pc-desk-tab${judgeDeskTab === 'progression' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('progression')} type="button">재판관 관리</button>
          </div>

          <div className="pc-desk-tab-content">
          {judgeDeskTab === 'profile' ? (
            <div className="pc-desk-grid pc-desk-grid--profile">
              <Card eyebrow="JUDGE PROFILE" title={profile.playerName}>
                <div className="pc-desk-profile-title">
                  <span>Lv {Math.max(1, judgeLevel)}</span>
                  <strong>{titleInfo.name}</strong>
                  <p>{titleInfo.subtitle}</p>
                </div>
                <div className="pc-desk-hero__meter">
                  <strong>명성 진행</strong>
                  <span>{`${Math.min(reputation, 1200)}/1200`}</span>
                  <div className="pc-progress-bar"><i style={{ width: `${Math.min(100, (Math.min(reputation, 1200) / 1200) * 100)}%` }} /></div>
                </div>
                <div className="pc-desk-hero__stats">
                  <MiniStat label="처리 사건" value={`${history.length}건`} />
                  <MiniStat label="최고 점수" value={`${playerStats.bestScore}점`} />
                  <MiniStat label="평균 점수" value={`${Math.round(playerStats.avgScore ?? 0)}점`} />
                  <MiniStat label="시즌" value={season.name} />
                </div>
              </Card>
              <Card eyebrow="JUDGE AXES" title={titleInfo.name}>
                <AxisRow label="탐구(균형)" left="논리" right="직관" value={judgeProfile.inquiryAxis} />
                <AxisRow label="판결(균형)" left="엄격" right="관용" value={judgeProfile.judgmentAxis} />
                <AxisRow label="해결(균형)" left="원칙" right="봉합" value={judgeProfile.resolutionAxis} />
              </Card>
            </div>
          ) : judgeDeskTab === 'progression' ? (
            <PCJudgeProgressionPanel onChange={refreshProgression} syncKey={refreshKey} />
          ) : (
            <div className="pc-history-board pc-history-board--select">
              <div className="pc-history-mode-tabs" role="tablist" aria-label="판결 기록 모드">
                <button className={`pc-history-mode-tab${historyMode === 'general' ? ' is-active' : ''}`} onClick={() => setHistoryModeAndTrack('general')} type="button">일반 모드</button>
                <button className={`pc-history-mode-tab${historyMode === 'season' ? ' is-active' : ''}`} onClick={() => setHistoryModeAndTrack('season')} type="button">시즌 모드</button>
              </div>
              <div className="pc-history-case-layout">
                <Card eyebrow={historyMode === 'general' ? 'GENERAL MODE' : season.name.toUpperCase()} title="사건 선택">
                  {historyCaseCards.length === 0 ? (
                    <Empty title="표시할 사건이 없습니다." description="아직 이 모드에 연결된 사건이 없습니다." />
                  ) : (
                    <div className="pc-history-case-picker">
                      {selectedHistoryCase ? (
                        <div className="pc-history-case-stats">
                          <MiniStat label="플레이" value={`${selectedHistoryCase.playedCount}회`} />
                          <MiniStat label="평균" value={selectedHistoryCase.avgScore != null ? `${selectedHistoryCase.avgScore}점` : '-'} />
                          <MiniStat label="최고" value={selectedHistoryCase.bestScore != null ? `${selectedHistoryCase.bestScore}점` : '-'} />
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
                              {item.playedCount > 0 ? `평균 ${item.avgScore} / 최고 ${item.bestScore}` : '기록 없음'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                <Card eyebrow="PLAY HISTORY" title={selectedHistoryCase ? getCaseDisplayTitle(selectedHistoryCase.caseData) : '플레이 이력'}>
                  {selectedCaseEntries.length === 0 ? (
                    <Empty title="선택한 사건의 플레이 기록이 없습니다." description="해당 사건을 클리어하면 날짜와 점수별 기록이 이곳에 저장됩니다." />
                  ) : (
                    <div className="pc-history-play-panel">
                      <div className="pc-history-play-selects">
                        <label>
                          <span>플레이 시점 / 점수</span>
                          <select className="pc-history-record-select pc-settings-select" value={selectedHistory ? getHistoryKey(selectedHistory) : ''} onChange={(event) => setSelectedHistoryKey(event.target.value)}>
                            {selectedCaseEntries.map((entry) => (
                              <option key={getHistoryKey(entry)} value={getHistoryKey(entry)}>
                                {formatHistoryOptionLabel(entry)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {selectedHistory ? (
                        <div className="pc-history-summary-card">
                          <div className="pc-history-score-strip">
                            <MiniStat label="총점" value={`${selectedHistory.score}점`} />
                            <MiniStat label="탐구" value={`${selectedHistory.insight}`} />
                            <MiniStat label="판결" value={`${selectedHistory.authority}`} />
                            <MiniStat label="해결" value={`${selectedHistory.wisdom}`} />
                          </div>
                          <div className="pc-history-verdict-brief">
                            <strong>판결 결과 요약</strong>
                            <p>{getHistoryVerdictBrief(selectedHistory)}</p>
                          </div>
                          <button className="pc-inline-button" onClick={() => setHistoryDetailEntry(selectedHistory)} type="button">상세 보기</button>
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
          <DepthHeader eyebrow={season.name} title="리더보드" description="현재 시즌 기준 점수와 명예의 전당 기록입니다." onBack={() => setView('home')} />
          <div className="pc-filter-pills-v2">{SORTS.map((sort) => <button className={`pc-filter-pill-v2${leaderboardSort === sort.id ? ' is-active' : ''}`} key={sort.id} onClick={() => setLeaderboardSort(sort.id)} type="button">{sort.label}</button>)}</div>
          <div className="pc-leaderboard-grid">
            <Card eyebrow="SCOREBOARD" title="시즌 랭킹">{leaderboard.length === 0 ? <Empty title="아직 시즌 기록이 없습니다." description="플레이 기록이 쌓이면 이곳에 자동 반영됩니다." /> : <div className="pc-ranking-list-v2">{leaderboard.slice(0, 10).map((entry, index) => <div className="pc-ranking-row-v2" key={getHistoryKey(entry)}><span className="pc-ranking-row-v2__rank">{index + 1}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.nameA} vs {entry.nameB}</strong><span>{getRelationshipLabel(entry.relationshipType)}</span></div><strong className="pc-ranking-row-v2__score">{sortMetric(entry, leaderboardSort)}</strong></div>)}</div>}</Card>
            <Card eyebrow="HALL OF FAME" title="명예의 전당">{hallOfFame.length === 0 ? <Empty title="아직 전당 기록이 없습니다." description="최고 기록이 쌓이면 시즌 명예의 전당이 채워집니다." /> : <div className="pc-ranking-list-v2">{hallOfFame.map((entry) => <div className="pc-ranking-row-v2" key={`${entry.seasonId}:${entry.rank}:${entry.caseId}`}><span className="pc-ranking-row-v2__rank">{entry.rank}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.playerName}</strong><span>{formatHallOfFameCaseLabel(entry.caseId, allCases)}</span></div><strong className="pc-ranking-row-v2__score">{entry.score}점</strong></div>)}</div>}</Card>
          </div>
        </section>
      )}

      {view === 'settings' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="SETTINGS" title="설정" description="오디오, 텍스트 속도, AI 연결 상태를 관리합니다." onBack={() => setView('home')} />
          <div className="pc-settings-grid-v2">
            <Card eyebrow="DISPLAY" title="화면">
              <div className="pc-settings-select-row">
                <div>
                  <strong>해상도 프리셋</strong>
                  <p>선택한 해상도에 맞춰 좌우 패널이 단계적으로 조정됩니다</p>
                </div>
                <select
                  className="pc-settings-select"
                  value={screenPreset}
                  onChange={(event) => requestScreenPreset(event.target.value as ScreenPresetId)}
                >
                  <option value="auto">Auto (자동 감지)</option>
                  {SCREEN_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}{p.note ? ` (${p.note})` : ''}</option>
                  ))}
                </select>
              </div>
            </Card>
            <Card eyebrow="AUDIO" title="오디오"><ToggleRow checked={bgmOn} label="배경음" description="타이틀과 플레이 배경음" onToggle={toggleBgm} /><ToggleRow checked={sfxOn} label="효과음" description="상호작용과 판결 효과음" onToggle={toggleSfx} /></Card>
            <Card eyebrow="GAMEPLAY" title="게임 플레이"><SummaryRow label="행동 힌트" value={settings.showBehaviorHints ? '켜짐' : '꺼짐'} /><SummaryRow label="대사 자동 진행" value={settings.autoAdvanceDialogue ? '켜짐' : '꺼짐'} /><div className="pc-settings-select-row"><div><strong>텍스트 속도</strong><p>대사 표시와 타이핑 속도</p></div><select className="pc-settings-select" onChange={(event) => updateTypingSpeed(event.target.value as HomeSettings['typingSpeed'])} value={settings.typingSpeed}><option value="fast">빠르게</option><option value="normal">보통</option><option value="slow">느리게</option></select></div></Card>
            <Card eyebrow="LIVE" title="라이브 상태"><SummaryRow label="AI 연결" value={llmConnected == null ? '확인 중' : llmConnected ? '정상' : '오프라인'} /><SummaryRow label="다음 충전" value={formatCountdown(countdown)} /><button className="pc-inline-button" disabled={checkingConnection} onClick={refreshConnection} type="button">{checkingConnection ? '확인 중…' : '연결 다시 확인'}</button></Card>
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
  return <header className="pc-depth-header"><button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span>뒤로</button><div className="pc-depth-header__copy"><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></header>
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

function MiniActionCard({ iconId, label, subLabel }: { iconId: string; label: string; subLabel: string }) {
  return <div className="pc-mini-action-card"><span className="pc-mini-action-card__icon"><PCSvgIcon id={iconId} size={16} /></span><strong>{label}</strong><small>{subLabel}</small></div>
}

function Achievement({ iconId, label, value }: { iconId: string; label: string; value: string }) {
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
        <h3 id="pc-resolution-confirm-title">지금 해상도를 유지하시겠습니까?</h3>
        <div className="pc-resolution-confirm__count">
          <strong>{countdown}</strong>
          <span>초 후 이전 해상도로 돌아갑니다.</span>
        </div>
        <div className="pc-resolution-confirm__actions">
          <button className="pc-inline-button" onClick={onConfirm} type="button">예</button>
          <button className="pc-inline-button is-ghost" onClick={onCancel} type="button">아니요</button>
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

function formatHistoryDate(date: string): string {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatHistoryOptionLabel(entry: ExtendedHistoryEntry): string {
  const d = new Date(entry.date)
  const pad = (value: number) => String(value).padStart(2, '0')
  const stamp = `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}. ${pad(d.getHours())}:${pad(d.getMinutes())}`
  return `[ ${stamp} ]  -  ${entry.score}점 / ${getHistoryRating(entry.score)}`
}

function getHistoryRating(score: number): string {
  if (score >= 90) return '전설'
  if (score >= 75) return '우수'
  if (score >= 60) return '양호'
  if (score >= 40) return '보통'
  return '미흡'
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

function getHistoryVerdictBrief(entry: ExtendedHistoryEntry): string {
  const detail = entry.verdictDetail
  if (detail?.verdictSummary?.caseSummary) return sanitizeStoredText(detail.verdictSummary.caseSummary)
  if (detail?.selectedSolutions?.length) {
    return sanitizeStoredText(detail.selectedSolutions.map(formatSolutionLabel).slice(0, 2).join('. '))
  }
  return `${entry.nameA} vs ${entry.nameB} · ${formatHistoryDate(entry.date)} 판결 기록`
}

function getStoredFindingLabel(value: string): string {
  if (value === 'true') return '사실'
  if (value === 'false') return '거짓'
  if (value === 'pending') return '보류'
  return value || '미기록'
}

function splitStoredParagraphs(text?: string): string[] {
  return (text ?? '')
    .replace(/\*?\*?(?:교훈 한 문장|교훈|명언)\*?\*?\s*[:：]\s*/g, '')
    .split(/\n\n+/)
    .map((para) => sanitizeStoredText(para))
    .filter(Boolean)
}

function HistoryDetailModal({ entry, onClose }: { entry: ExtendedHistoryEntry; onClose: () => void }) {
  const [tab, setTab] = useState<HistoryResultTab>('result')
  const caseData = getCaseById(entry.caseId)
  const detail = entry.verdictDetail
  const snapshot = entry.resultSnapshot
  const summary = snapshot?.verdictSummary ?? detail?.verdictSummary
  const aftermath = snapshot?.aftermath ?? detail?.aftermath
  const paragraphs = splitStoredParagraphs(aftermath)
  const score = snapshot?.score ?? {
    total: entry.score,
    insight: entry.insight,
    authority: entry.authority,
    wisdom: entry.wisdom,
    rating: getHistoryRating(entry.score),
  }
  const selectedSolutions = snapshot?.selectedSolutions ?? detail?.selectedSolutions ?? []
  const caseTitle = snapshot?.caseTitle ?? (caseData ? getCaseDisplayTitle(caseData) : `${entry.nameA} vs ${entry.nameB}`)
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
  const resolutionSentences = splitResolutionSentences(summary?.resolution ?? selectedSolutions.map(formatSolutionLabel).join('. '))
  const relationshipLabel = snapshot?.relationshipLabel ?? getRelationshipLabel(entry.relationshipType)
  const factMomentLines = factRows.map((row) => `${row.name}: ${getStoredFindingLabel(row.finding)}로 정리했습니다.`)
  const keyMomentLines = summary?.keyMoment
    ? splitResolutionSentences(summary.keyMoment)
    : factMomentLines
  const partyAName = caseData?.duo.partyA.name ?? entry.nameA
  const partyBName = caseData?.duo.partyB.name ?? entry.nameB
  const responsibility = summary?.responsibility
  const percentA = responsibility?.percentA ?? 50
  const percentB = responsibility?.percentB ?? 50
  const currentTabIndex = HISTORY_RESULT_TABS.findIndex((item) => item.id === tab)
  const prevTab = currentTabIndex > 0 ? HISTORY_RESULT_TABS[currentTabIndex - 1] : null
  const nextTab = currentTabIndex >= 0 && currentTabIndex < HISTORY_RESULT_TABS.length - 1 ? HISTORY_RESULT_TABS[currentTabIndex + 1] : null
  const stars = Math.max(1, Math.min(3, Math.ceil(score.total / 35)))
  const rewardTitles: Array<{ id: string; name: string; rarity?: string; description?: string }> = snapshot?.titles?.length
    ? snapshot.titles.map((title) => ({ id: title.id, name: title.name, rarity: title.rarity, description: title.description }))
    : entry.titles.map((title) => ({ id: title, name: title }))
  const rewardFragments = snapshot?.rewards ?? []

  return (
    <div className="pc-history-detail-modal" role="dialog" aria-modal="true" aria-label="판결 기록 상세">
      <div className="pc-history-detail-modal__backdrop" onClick={onClose} />
      <section className="pc-history-detail-modal__panel" onClick={(event) => event.stopPropagation()}>
        <PCResultFrame
          activeTab={tab}
          className="pc-result-screen--history"
          eyebrow="판결 기록"
          footer={(
            <>
              <button
                className="pc-verdict-footer__button"
                disabled={!prevTab}
                onClick={() => prevTab && setTab(prevTab.id)}
                type="button"
              >
                &lt; 이전
              </button>
              {nextTab ? (
                <button className="pc-verdict-footer__button is-primary" onClick={() => setTab(nextTab.id)} type="button">
                  다음 &gt;
                </button>
              ) : (
                <button className="pc-verdict-footer__button is-primary" onClick={onClose} type="button">
                  닫기
                </button>
              )}
            </>
          )}
          headline={caseTitle}
          meta={[
            { label: '관계', value: relationshipLabel },
            { label: '쟁점', value: `${factRows.length}건` },
            { label: '증거', value: `${caseData?.evidence.length ?? 0}종` },
          ]}
          onTabChange={setTab}
          rating={score.rating}
          score={score.total}
          stars={stars}
          summary={`${formatHistoryDate(entry.date)} · ${relationshipLabel} · ${score.total}점`}
          tabs={HISTORY_RESULT_TABS}
        >
                {tab === 'result' ? (
                  <div className="pc-result-combined">
                    <div className="pc-result-donuts">
                      <HistoryScoreDonut label="통찰" value={score.insight} color="var(--pc-blue)" />
                      <HistoryScoreDonut label="권위" value={score.authority} color="var(--pc-gold)" />
                      <HistoryScoreDonut label="지혜" value={score.wisdom} color="var(--pc-green)" />
                      <HistoryScoreDonut label="총점" value={score.total} color="#d4a24e" />
                    </div>

                    <div className="pc-result-truth">
                      <h3>쟁점별 판단 결과</h3>
                      {factRows.map((row) => {
                        const correct = row.truth == null || row.finding === 'pending' ? null : (row.finding === 'true') === row.truth
                        return (
                          <div className={`pc-result-truth__card ${correct === true ? 'is-correct' : correct === false ? 'is-wrong' : ''}`} key={row.id}>
                            <div>
                              <strong>{row.name}</strong>
                              <p>내 판단: {getStoredFindingLabel(row.finding)}</p>
                            </div>
                            <div className="pc-history-result-mark">
                              {correct === true ? 'O' : correct === false ? 'X' : '—'}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                {tab === 'verdict_pronounce' ? (
                  <div className="pc-result-text">
                    <p className="pc-history-result-pronounce">
                      본 사건은 <strong>{partyAName}</strong>과 <strong>{partyBName}</strong>의 {relationshipLabel} 분쟁으로, 저장된 판결 기록을 기준으로 다시 표시합니다.
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
                            <h3>결정적 순간</h3>
                            <ul className="pc-result-key-moments__list">
                              {keyMomentLines.map((line, index) => <li className="pc-result-key-moments__item" key={`${index}-${line}`}>{line}</li>)}
                            </ul>
                          </div>

                          <div className="pc-result-summary__section pc-result-summary__section--compact pc-result-resolution--wide" style={{ margin: 0, gridColumn: '1 / -1' }}>
                            <h3>해결 방향</h3>
                            <div className="pc-result-resolution__list">
                              {resolutionSentences.map((item, index) => <div className="pc-result-resolution__item" key={`${index}-${item}`}>{item}</div>)}
                            </div>
                          </div>
                        </div>
                        <div className="pc-result-summary__section">
                          <h3>판결문 요약</h3>
                          <p>{summary.caseSummary}</p>
                          <p>{summary.responsibilityReason}</p>
                        </div>
                      </>
                    ) : (
                      <div className="pc-result-summary__section">
                        <h3>판결문 요약</h3>
                        <p>{getHistoryVerdictBrief(entry)}</p>
                      </div>
                    )}
                  </div>
                ) : null}

                {tab === 'epilogue' ? (
                  <div className="pc-result-text">
                    <div className="pc-history-epilogue-box">
                      <div style={{ textAlign: 'center', marginBottom: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--pc-gold-light)', textTransform: 'uppercase' }}>Epilogue</div>
                      </div>
                      <div className="pc-result-aftermath">
                        {paragraphs.length ? paragraphs.map((paragraph, index) => (
                          <p className="pc-result-aftermath__para" key={`${index}-${paragraph.slice(0, 12)}`}>
                            {paragraph}
                          </p>
                        )) : <p className="pc-history-detail-empty">이전 플레이 기록에는 후일담이 저장되어 있지 않습니다. 앞으로 완료되는 플레이는 후일담까지 함께 저장됩니다.</p>}
                      </div>
                    </div>
                  </div>
                ) : null}

                {tab === 'bonus' ? (
                  <div className="pc-result-text">
                    <div className="pc-history-bonus-layout">
                      <div className="pc-result-summary__section">
                        <h3>획득 카드</h3>
                        {rewardTitles.length ? (
                          <div className="pc-history-title-cards">
                            {rewardTitles.map((title) => (
                              <div className={`pc-result-title-card ${title.rarity ? `is-${title.rarity}` : ''}`} key={title.id}>
                                <span className="pc-result-title-card__name">{title.name}</span>
                                {title.description ? <span className="pc-result-title-card__tooltip">{title.description}</span> : null}
                              </div>
                            ))}
                          </div>
                        ) : <p className="pc-history-detail-empty">저장된 칭호 기록이 없습니다.</p>}
                      </div>
                      <div className="pc-result-summary__section">
                        <h3>보상 조각</h3>
                        <HistoryRewardGrid rewards={rewardFragments} />
                      </div>
                    </div>
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
  if (!rewards.length) {
    return <p className="pc-history-detail-empty">저장된 보상 기록이 없습니다.</p>
  }

  return (
    <div className="pc-history-reward-grid">
      {rewards.map((reward) => {
        const visual = FRAGMENT_VISUALS[reward.fragmentId as keyof typeof FRAGMENT_VISUALS]
        return (
          <div className="pc-history-reward-card" key={reward.fragmentId}>
            <PCFragmentIcon fragmentId={reward.fragmentId as any} size={56} />
            <strong>{reward.label ?? visual?.name ?? reward.fragmentId}</strong>
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

function sortMetric(entry: ExtendedHistoryEntry, sort: SortCategory) {
  if (sort === 'total') return `${entry.score}점`
  if (sort === 'insight') return `${entry.insight}`
  if (sort === 'authority') return `${entry.authority}`
  return `${entry.wisdom}`
}
