import { useEffect, useState, useMemo } from 'react'
import { GamePhase } from '../types'
import { useGameStore } from '../store/useGameStore'
import { checkConnection, getProviderName } from '../engine/llmClient'
import { setLLMMode, isLLMMode } from '../hooks/useActionDispatch'
import { getRandomCase, getCaseCount, getCaseCountByType } from '../data/cases'
import { generatePhase1Dialogues, generatePhase2Dialogues } from '../engine/llmPhaseDialogue'
import type { StageDefinition } from '../data/campaign'
import { loadProfile, loadExtendedHistory, getPlayerStats } from '../data/leaderboard'
import { getCurrentSeason, getRemainingDays } from '../data/seasons'
import { loadCampaignProgress } from '../data/campaign'
import { playBgm as playBgmFn, stopBgm as stopBgmFn, isBgmEnabled, setBgmEnabled } from '../engine/soundEngine'
import ResourcePopup from '../components/shop/ResourcePopup'
import Emoji from '../components/common/Emoji'
import CourtLayout from '../components/layout/CourtLayout'
import PhaseTransition from '../components/layout/PhaseTransition'
import Tutorial from '../components/layout/Tutorial'
import Phase0_CaseIntro, { resetPrefetch } from '../components/phase/Phase0_CaseIntro'
import AutoDialoguePhase from '../components/phase/AutoDialoguePhase'
import Phase6_Mediation from '../components/phase/Phase6_Mediation'
import CampaignScreen from '../components/phase/CampaignScreen'
import CaseMap from '../components/phase/CaseMap'
import SessionSelect from '../components/phase/SessionSelect'
import ActionPanel from '../components/actions/ActionPanel'
import VerdictScreen from '../components/verdict/VerdictScreen'
import ResultScreen from '../components/result/ResultScreen'
import HistoryPanel from '../components/layout/HistoryPanel'
import SettingsPanel from '../components/layout/SettingsPanel'
import LeaderboardScreen from '../components/leaderboard/LeaderboardScreen'
import IntroSlides, { hasSeenIntro } from '../components/layout/IntroSlides'
import ProfilePage from '../components/profile/ProfilePage'
import NoticePanel, { isDismissedToday } from '../components/notice/NoticePanel'
import MailInbox from '../components/mail/MailInbox'
import { loadPrompts, startPromptPolling } from '../api/promptManager'
import { loadAgents, startAgentPolling, snapshotForSession } from '../api/agentManager'
import { registerAllEnrichments } from '../data/caseEnrichment'

// 보강 데이터 자동 등록 (H 단계 후 caseEnrichmentData.ts가 존재하면 로드)
try {
  // @ts-ignore — H 단계 전에는 파일 미존재
  const { CASE_ENRICHMENT_DATA } = require('../data/caseEnrichmentData')
  if (CASE_ENRICHMENT_DATA) registerAllEnrichments(CASE_ENRICHMENT_DATA)
} catch { /* H 단계 전: 보강 데이터 없음 — 정상 */ }
import { playerApi, mailApi, healthApi, noticeApi } from '../api/client'
import { phase1Dialogues } from '../data/dialogues/phase1'
import { phase2Dialogues } from '../data/dialogues/phase2'
import { buildGenericPhase1, buildGenericPhase2 } from '../data/dialogues/generic-phase1'
import { loadPhase1Script, loadPhase2Script, getScriptCounts } from '../data/dialogues/phaseScriptLoader'

// 디버그: 스크립트 로드 확인
if (typeof window !== 'undefined') {
  const counts = getScriptCounts()
  console.log(`[Solomon] Script loader — Phase1: ${counts.phase1}, Phase2: ${counts.phase2}`)
}

// prefetch는 AutoDialoguePhase 내부에서 직접 소비
import { triggerDialogueTap } from '../components/phase/AutoDialoguePhase'

export default function App() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const caseData = useGameStore((s) => s.caseData)
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

  if (!caseData) return <TitleScreen />
  if (caseData && !sessionReady) {
    return (
      <div className="h-[100dvh] bg-gray-950 text-gray-100 flex items-center justify-center max-w-lg mx-auto">
        <div className="text-center">
          <div className="gavel-loading text-3xl mb-3"><Emoji char="⚖️" size={40} /></div>
          <p className="text-sm text-gray-500">세션 복원 중...</p>
        </div>
      </div>
    )
  }

  if (currentPhase === GamePhase.Phase0_CaseIntro) {
    return <div className="h-[100dvh] bg-gray-950 text-gray-100 max-w-lg mx-auto"><Phase0_CaseIntro /></div>
  }
  if (currentPhase === GamePhase.Result) {
    return <div className="h-[100dvh] bg-gray-950 text-gray-100 max-w-lg mx-auto"><ResultScreen /></div>
  }

  return (
    <>
      <PhaseTransition />
      <Tutorial />
      <CourtLayout
        actionPanel={getActionPanel(currentPhase)}
        onDialogueTap={triggerDialogueTap}
        isDialoguePhase={currentPhase === GamePhase.Phase1_InitialStatement || currentPhase === GamePhase.Phase2_Rebuttal}
      />
    </>
  )
}

function formatCountdown(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m}분` : `${s}초`
}

function TitleScreen() {
  const [llmStatus, setLlmStatus] = useState<{ connected: boolean; provider?: string; modelId?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSessionSelect, setShowSessionSelect] = useState(false)
  const [showCaseMap, setShowCaseMap] = useState(false)
  const [selectedSessionType, setSelectedSessionType] = useState<string | undefined>(undefined)
  const [showHistory, setShowHistory] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro())
  const [showNotice, setShowNotice] = useState(false)
  const [noticeAutoPopup, setNoticeAutoPopup] = useState(false)
  const [showMail, setShowMail] = useState(false)
  const [unreadMail, setUnreadMail] = useState(0)
  const [serverConnected, setServerConnected] = useState(false)
  const [showResourcePopup, setShowResourcePopup] = useState<'invest' | 'skill' | null>(null)
  const [bgmOn, setBgmOn] = useState(isBgmEnabled())
  const initializeCase = useGameStore((s) => s.initializeCase)
  const globalInvest = useGameStore((s) => s.globalInvestTokens)
  const globalSkill = useGameStore((s) => s.globalSkillPoints)
  const getCountdown = useGameStore((s) => s.getNextRechargeCountdown)
  const tickRecharge = useGameStore((s) => s.tickInvestRecharge)
  const adCountInvest = useGameStore((s) => s.adWatchCountInvest)
  const adCountSkill = useGameStore((s) => s.adWatchCountSkill)
  const watchAdInvest = useGameStore((s) => s.watchAdForInvest)
  const watchAdSkill = useGameStore((s) => s.watchAdForSkill)
  const [investCountdown, setInvestCountdown] = useState(0)

  // 충전 타이머
  useEffect(() => {
    tickRecharge()
    setInvestCountdown(getCountdown())
    const timer = setInterval(() => { tickRecharge(); setInvestCountdown(getCountdown()) }, 10_000)
    return () => clearInterval(timer)
  }, [tickRecharge, getCountdown])

  useEffect(() => {
    checkConnection().then(setLlmStatus)
    // 타이틀 BGM — 유저 첫 인터랙션 후 재생 (Autoplay Policy)
    const startBgm = () => {
      playBgmFn('/bgm/title.mp3', 0.12)
      document.removeEventListener('click', startBgm)
      document.removeEventListener('touchstart', startBgm)
    }
    document.addEventListener('click', startBgm, { once: true })
    document.addEventListener('touchstart', startBgm, { once: true })

    // 서버 연결 + AI 프롬프트 로드 + 플레이어 동기화
    ;(async () => {
      try {
        await healthApi.check()
        setServerConnected(true)
        await loadPrompts(true)
        startPromptPolling()
        await loadAgents(true)
        startAgentPolling()
        // 밸런스 설정 로드
        const { loadSettings: loadBalanceSettings } = await import('../api/settingsManager')
        await loadBalanceSettings()

        // 플레이어 동기화
        const p = loadProfile()
        await playerApi.sync(p.playerId, p.playerName, p.region || 'KR').catch(() => {})

        // 미읽은 우편 수
        const { count } = await mailApi.unreadCount(p.playerId).catch(() => ({ count: 0 }))
        setUnreadMail(count)

        // 자동 공지 팝업 (하루동안 보지않기가 아닌 경우)
        if (!isDismissedToday()) {
          const activeNotices = await noticeApi.list().catch(() => [])
          if (activeNotices.length > 0) { setShowNotice(true); setNoticeAutoPopup(true) }
        }
      } catch {
        // 서버 미연결 — offline 모드 유지
      }
    })()
  }, [])

  // Profile & stats data
  const profile = useMemo(() => loadProfile(), [showProfile])
  const history = useMemo(() => loadExtendedHistory(), [showProfile, showHistory])
  const stats = useMemo(() => getPlayerStats(), [showProfile, showHistory])
  const campaign = useMemo(() => loadCampaignProgress(), [showCaseMap])
  const season = getCurrentSeason()
  const remaining = getRemainingDays()

  const reputation = useMemo(
    () => history.reduce((sum, e) => sum + Math.max(0, e.score), 0),
    [history],
  )

  const tierLabel = useMemo(() => {
    if (reputation >= 2000) return '솔로몬'
    if (reputation >= 1000) return '원로'
    if (reputation >= 600) return '숙련'
    if (reputation >= 300) return '정식'
    if (reputation >= 100) return '견습'
    return '수습'
  }, [reputation])

  const handleStart = (relationshipType?: string) => {
    resetPrefetch()
    stopBgmFn() // 타이틀 BGM 정지
    setLLMMode(llmStatus?.connected ?? false)
    const caseData = getRandomCase(relationshipType)
    initializeCase(caseData)
  }

  const handleCampaignStage = (stage: StageDefinition) => {
    resetPrefetch()
    stopBgmFn() // 타이틀 BGM 정지
    setLLMMode(llmStatus?.connected ?? false)
    const caseData = getRandomCase(stage.relationshipType || undefined)
    initializeCase(caseData)
  }

  // 1. Intro (first time only)
  if (showIntro) {
    return <IntroSlides onComplete={() => setShowIntro(false)} />
  }

  // 2. Profile page
  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />
  }

  // 3. Session select
  if (showSessionSelect && !showCaseMap) {
    return <SessionSelect
      onSelectSession={(type) => {
        setSelectedSessionType(type)
        setShowCaseMap(true)
      }}
      onBack={() => setShowSessionSelect(false)}
    />
  }

  // 4. Case map (세션 선택 후)
  if (showCaseMap) {
    return <CaseMap onSelectCase={(caseData) => {
      resetPrefetch()
      setLLMMode(llmStatus?.connected ?? false)
      initializeCase(caseData)
      setShowCaseMap(false)
      setShowSessionSelect(false)
      setSelectedSessionType(undefined)
    }} onBack={() => {
      setShowCaseMap(false)
      // 세션 선택으로 돌아감
    }} initialChapterType={selectedSessionType} />
  }

  // 4. Leaderboard
  if (showLeaderboard) {
    return <LeaderboardScreen onClose={() => setShowLeaderboard(false)} />
  }

  const handleRetry = async () => {
    setLoading(true)
    setLlmStatus(await checkConnection())
    setLoading(false)
  }

  return (
    <div
      className="h-[100dvh] bg-gray-950 text-gray-100 flex flex-col max-w-lg mx-auto"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {showHistory && <HistoryPanel onClose={() => setShowHistory(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showNotice && <NoticePanel onClose={() => { setShowNotice(false); setNoticeAutoPopup(false) }} autoPopup={noticeAutoPopup} />}
      {showMail && <MailInbox onClose={() => { setShowMail(false); setUnreadMail(0) }} />}

      {/* 상단 — 프로필 + 설정 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <button onClick={() => setShowProfile(true)}
          className="flex items-center gap-2 bg-gray-900/60 hover:bg-gray-800/60 border border-gray-800/40 rounded-full px-3 py-1.5 transition-all active:scale-95">
          <Emoji char="👑" size={14} />
          <span className="text-xs font-semibold text-gray-300">{profile.playerName}</span>
          <span className="text-xs text-amber-400 font-bold">{reputation.toLocaleString()}</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => { const next = !bgmOn; setBgmOn(next); setBgmEnabled(next) }}
            className="hover:opacity-80 active:scale-95">
            <Emoji char="🎵" size={16} className={bgmOn ? 'opacity-100' : 'opacity-30'} />
          </button>
          <button onClick={() => { setShowNotice(true); setNoticeAutoPopup(true) }} className="text-gray-600 hover:text-gray-300 text-lg relative">
            <Emoji char="📢" size={16} />
          </button>
          <button onClick={() => setShowMail(true)} className="text-gray-600 hover:text-gray-300 text-lg relative">
            <Emoji char="📨" size={16} />
            {unreadMail > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadMail > 9 ? '9+' : unreadMail}
              </span>
            )}
          </button>
          <button onClick={() => setShowSettings(true)} className="text-gray-600 hover:text-gray-300 text-lg"><Emoji char="⚙️" size={18} /></button>
        </div>
      </div>

      {/* 리소스 표시 — 클릭 시 충전 팝업 */}
      <div className="flex items-center justify-center gap-4 py-1.5 bg-gray-900/50 border-b border-gray-800/30">
        <button onClick={() => setShowResourcePopup('invest')} className="flex items-center gap-1 text-xs hover:opacity-80 active:scale-95">
          <Emoji char="🔍" size={12} />
          <span className="text-amber-400 font-bold">{globalInvest}</span>
          <span className="text-gray-600">/10</span>
        </button>
        <button onClick={() => setShowResourcePopup('skill')} className="flex items-center gap-1 text-xs hover:opacity-80 active:scale-95">
          <Emoji char="⚡" size={12} />
          <span className="text-amber-400 font-bold">{globalSkill}</span>
          <span className="text-gray-600">/5</span>
        </button>
      </div>

      {showResourcePopup === 'invest' && (
        <ResourcePopup type="invest" current={globalInvest} countdown={investCountdown}
          adRemaining={5 - adCountInvest} onWatchAd={watchAdInvest} onClose={() => setShowResourcePopup(null)} />
      )}
      {showResourcePopup === 'skill' && (
        <ResourcePopup type="skill" current={globalSkill}
          adRemaining={2 - adCountSkill} onWatchAd={watchAdSkill} onClose={() => setShowResourcePopup(null)} />
      )}

      {/* 중앙 — 타이틀 + 버튼 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-rose-600/5 rounded-full blur-2xl" />
        </div>

        {/* 타이틀 */}
        <div className="text-center relative z-10 mb-10">
          <div className="text-6xl mb-3 animate-pulse-glow"><Emoji char="⚖️" size={56} /></div>
          <h1 className="text-4xl font-black text-amber-400 tracking-tight mb-2">솔로몬</h1>
          <p className="text-sm text-gray-400 leading-relaxed">현대판 솔로몬이 되어<br/>판결을 내려보세요!</p>
          <p className="text-[10px] text-gray-600 mt-2 leading-relaxed">사회·경험 기반 모의 재판 게임<br/>등장하는 사건은 가상이며, 실제 판례와 다를 수 있습니다</p>
        </div>

        {/* 버튼 영역 — 중앙에서 약간 아래 */}
        <div className="relative z-10 w-full max-w-xs space-y-3">
          <button
            onClick={() => setShowSessionSelect(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-600/25 active:scale-95"
          >
            <span className="text-lg"><Emoji char="⚖️" size={18} /> 사건 시작</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setShowLeaderboard(true)}
              className="bg-gray-900/80 hover:bg-gray-800/80 text-gray-300 font-semibold py-3 rounded-xl transition-colors border border-gray-800/50 text-sm">
              <Emoji char="🏆" size={14} /> 리더보드
            </button>
            <button onClick={() => setShowHistory(true)}
              className="bg-gray-900/80 hover:bg-gray-800/80 text-gray-300 font-semibold py-3 rounded-xl transition-colors border border-gray-800/50 text-sm">
              <Emoji char="📊" size={14} /> 내 기록
            </button>
          </div>
        </div>
      </div>

      {/* 하단 — 시즌 + AI */}
      <div className="px-5 pb-4 shrink-0">
        <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
          <span>{season.name} · {remaining}일</span>
          <span>·</span>
          {llmStatus === null && <span>연결 확인 중...</span>}
          {llmStatus?.connected && <span className="text-emerald-500/70">● AI 연결됨</span>}
          {llmStatus && !llmStatus.connected && (
            <button onClick={handleRetry} disabled={loading} className="hover:text-gray-400">
              {loading ? '확인 중...' : '● AI 미연결'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function getActionPanel(phase: GamePhase) {
  const caseData = useGameStore.getState().caseData
  const llmMode = isLLMMode()

  switch (phase) {
    case GamePhase.Phase1_InitialStatement: {
      // Phase 1: 사건별 사전 생성 스크립트 우선 → 없으면 범용 폴백
      const caseScript = caseData ? loadPhase1Script(caseData.caseId) : null
      if (caseData) console.log(`[Phase1] caseId=${caseData.caseId}, script=${caseScript ? `loaded(${caseScript.length} entries)` : 'NOT FOUND → fallback'}`)
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
      // Phase 2: AI 생성 우선, 없으면 스크립트 폴백
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
