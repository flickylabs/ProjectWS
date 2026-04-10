import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getAllCases, getCaseById } from '../../../data/cases'
import { getHallOfFameForSeason, getJudgeProfile, getLeaderboard, getPlayerStats, loadExtendedHistory, loadProfile } from '../../../data/leaderboard'
import { getCurrentSeason, getRemainingDays } from '../../../data/seasons'
import { TITLE_LABELS } from '../../../engine/judgeProfileEngine'
import { checkConnection } from '../../../engine/llmClient'
import { isBgmEnabled, isSoundEnabled, playBgm as playBgmFn, setBgmEnabled, setSoundEnabled, stopBgm as stopBgmFn } from '../../../engine/soundEngine'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { setLLMMode } from '../../../hooks/useActionDispatch'
import { useStore } from '../../../store/useGameStore'
import type { CaseData, ExtendedHistoryEntry, SortCategory } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCCaseBrowser from './PCCaseBrowser'
import PCIntroSlides from './PCIntroSlides'
import { type PCGeneralSessionId, PC_GENERAL_SESSIONS, formatCountdown, getCasesForPcGeneralSession, getRelationshipLabel, getSeasonCases, hasSeenPcIntro, loadPcCaseProgress } from './pcHomeShared'

type HomeView = 'home' | 'general' | 'generalCases' | 'season' | 'profile' | 'leaderboard' | 'settings'
type JudgeDeskTab = 'profile' | 'history'
type HistoryTrackId = PCGeneralSessionId | 'season'
type HomeSettings = ReturnType<typeof getSettings>
type SessionProgress = { completedCount: number; totalCount: number; averageScore: number | null; progressRate: number }

const SORTS: { id: SortCategory; label: string }[] = [
  { id: 'total', label: '총점' },
  { id: 'insight', label: '탐구' },
  { id: 'authority', label: '판결' },
  { id: 'wisdom', label: '해결' },
]

export default function PCHomeScreen() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenPcIntro())
  const [view, setView] = useState<HomeView>('home')
  const [judgeDeskTab, setJudgeDeskTab] = useState<JudgeDeskTab>('profile')
  const [selectedSession, setSelectedSession] = useState<PCGeneralSessionId | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<HistoryTrackId>('spouse')
  const [selectedHistoryKey, setSelectedHistoryKey] = useState<string | null>(null)
  const [leaderboardSort, setLeaderboardSort] = useState<SortCategory>('total')
  const [settings, setSettings] = useState<HomeSettings>(() => getSettings())
  const [bgmOn, setBgmOn] = useState(() => isBgmEnabled())
  const [sfxOn, setSfxOn] = useState(() => isSoundEnabled())
  const [llmConnected, setLlmConnected] = useState<boolean | null>(null)
  const [checkingConnection, setCheckingConnection] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [countdown, setCountdown] = useState(0)

  const initializeCase = useStore((s) => s.initializeCase)
  const globalInvest = useStore((s) => s.globalInvestTokens)
  const globalSkill = useStore((s) => s.globalSkillPoints)
  const getCountdown = useStore((s) => s.getNextRechargeCountdown)
  const tickRecharge = useStore((s) => s.tickInvestRecharge)

  const season = getCurrentSeason()
  const remainingDays = getRemainingDays()

  useEffect(() => {
    tickRecharge()
    setCountdown(getCountdown())
    const timer = window.setInterval(() => {
      tickRecharge()
      setCountdown(getCountdown())
    }, 10000)
    return () => window.clearInterval(timer)
  }, [getCountdown, tickRecharge])

  useEffect(() => {
    checkConnection().then((r) => setLlmConnected(r.connected)).catch(() => setLlmConnected(false))
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
  const selectedTrackEntries = useMemo(() => {
    if (selectedTrack === 'season') return seasonHistory
    const ids = new Set(getCasesForPcGeneralSession(allCases, selectedTrack).map((c) => c.caseId))
    return history.filter((entry) => ids.has(entry.caseId))
  }, [allCases, history, seasonHistory, selectedTrack])
  const selectedHistory = selectedTrackEntries.find((entry) => getHistoryKey(entry) === selectedHistoryKey) ?? selectedTrackEntries[0] ?? null

  useEffect(() => {
    if (!selectedTrackEntries.length) return
    if (selectedHistoryKey && selectedTrackEntries.some((entry) => getHistoryKey(entry) === selectedHistoryKey)) return
    setSelectedHistoryKey(getHistoryKey(selectedTrackEntries[0]))
  }, [selectedHistoryKey, selectedTrackEntries])

  const startCase = (caseData: CaseData) => {
    stopBgmFn()
    setLLMMode(llmConnected ?? false)
    initializeCase(caseData)
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
            <div className="pc-home-v2__center-mark"><span className="pc-home-v2__mark"><PCSvgIcon id="i-scale" size={34} /></span></div>
            <div className="pc-home-v2__tools">
              <button className="pc-home-v2__tool" onClick={openLive} type="button"><PCSvgIcon id="i-bolt" size={16} /></button>
              <button className="pc-home-v2__tool" onClick={openGuide} type="button"><PCSvgIcon id="i-bulb" size={16} /></button>
              <button className="pc-home-v2__tool" onClick={toggleBgm} type="button"><PCSvgIcon id={bgmOn ? 'i-bolt' : 'i-lock'} size={16} /></button>
              <button className="pc-home-v2__tool" onClick={() => setView('settings')} type="button"><PCSvgIcon id="i-gear" size={16} /></button>
            </div>
          </header>
          <div className="pc-home-v2__hero"><span className="pc-home-v2__eyebrow">COURT SIMULATION GAME</span><h1>솔로몬의 딜레마</h1><p>현대판 솔로몬이 되어 판결을 내려보세요.</p></div>
          <div className="pc-home-v2__mode-grid">
            <ModeCard badge="NORMAL MODE" iconId="i-gavel" label="일반 모드 >" metaLeft={`세션 ${PC_GENERAL_SESSIONS.length}개`} metaRight={`진척 ${totalGeneralCompleted}/${totalGeneralCases}`} onClick={() => { setSelectedSession(null); setView('general') }} progressRate={totalGeneralCases ? (totalGeneralCompleted / totalGeneralCases) * 100 : 0} />
            <ModeCard badge={season.name} iconId="i-crown" label="시즌 모드 >" metaLeft={seasonCases.length ? `${seasonCases.length}건 배정` : '배정 준비 중'} metaRight={`${remainingDays}일 남음`} onClick={() => setView('season')} progressRate={seasonProgress.progressRate} season />
          </div>
          <div className="pc-home-v2__resource-row">
            <span className="pc-home-v2__resource-pill"><PCSvgIcon id="i-search" size={14} /> 조사 {globalInvest}/10</span>
            <span className="pc-home-v2__resource-pill"><PCSvgIcon id="i-bolt" size={14} /> 스킬 {globalSkill}/5</span>
            <span className="pc-home-v2__resource-pill"><PCSvgIcon id="i-crown" size={14} /> 명성 {reputation.toLocaleString()}</span>
          </div>
          <div className="pc-home-v2__info-grid">
            <InfoCard actionLabel="내 정보 >" iconId="i-person" onClick={() => { setJudgeDeskTab('profile'); setView('profile') }} subtitle={profile.playerName} title={titleInfo.name} />
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
                  <div className="pc-session-card-v2__top"><span>{`SESSION ${String(index + 1).padStart(2, '0')}`}</span><strong>{disabled ? '준비 중' : `${progress.completedCount}/${progress.totalCount}`}</strong></div>
                  <div className="pc-session-card-v2__main"><span className="pc-session-card-v2__icon"><PCSvgIcon id={session.iconId} size={24} /></span><div><h3>{session.label}</h3>{progress.averageScore != null ? <p>{`평균 ${progress.averageScore}점`}</p> : null}</div></div>
                  <div className="pc-session-card-v2__track"><i style={{ width: `${progress.progressRate}%` }} /></div>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {view === 'generalCases' && selectedSessionMeta && (
        <PCCaseBrowser accentIconId={selectedSessionMeta.iconId} cases={selectedSessionCases} description={`${selectedSessionMeta.tagline}. 선택한 사건은 브리핑을 거쳐 바로 재판으로 이어집니다.`} eyebrow="일반 모드" onBack={() => setView('general')} onSelectCase={startCase} progressLabel={`${sessionProgress[selectedSessionMeta.id].completedCount}/${sessionProgress[selectedSessionMeta.id].totalCount}`} showCompletedFilter title={`${selectedSessionMeta.label} · ${selectedSessionCases.length}건`} />
      )}

      {view === 'season' && (
        <PCCaseBrowser accentIconId="i-crown" cases={seasonCases} description={`${season.name}에 배정된 사건들입니다. 시즌 전용 사건은 추후 선별 배정됩니다.`} emptyDescription="시즌 배정이 열리면 이곳에 자동으로 반영됩니다." emptyTitle="현재 시즌 사건이 아직 배정되지 않았습니다." eyebrow={season.name} onBack={() => setView('home')} onSelectCase={startCase} progressLabel={`${seasonProgress.completedCount}/${seasonProgress.totalCount}`} title="시즌 모드" />
      )}

      {view === 'profile' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="JUDGE DESK" title="내 정보" description="재판관 프로필과 판결 기록을 한 화면에서 관리합니다." onBack={() => setView('home')} />
          <div className="pc-desk-tabs">
            <button className={`pc-desk-tab${judgeDeskTab === 'profile' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('profile')} type="button">내 정보</button>
            <button className={`pc-desk-tab${judgeDeskTab === 'history' ? ' is-active' : ''}`} onClick={() => setJudgeDeskTab('history')} type="button">판결 기록</button>
          </div>

          {judgeDeskTab === 'profile' ? (
            <div className="pc-desk-grid">
              <Card eyebrow="JUDGE PROFILE" title={`Lv ${Math.max(1, judgeLevel)} ${titleInfo.name}`}>
                <div className="pc-desk-hero__meter"><strong>명성 진행</strong><span>{`${Math.min(reputation, 1200)}/1200`}</span><div className="pc-progress-bar"><i style={{ width: `${Math.min(100, (Math.min(reputation, 1200) / 1200) * 100)}%` }} /></div></div>
                <div className="pc-desk-hero__stats"><MiniStat label="명성" value={reputation.toLocaleString()} /><MiniStat label="처리 사건" value={`${history.length}건`} /><MiniStat label="최고 점수" value={`${playerStats.bestScore}점`} /><MiniStat label="평균 점수" value={`${Math.round(playerStats.avgScore ?? 0)}점`} /></div>
              </Card>
              <Card eyebrow="PLAYER" title={profile.playerName}>
                <div className="pc-player-card__resources"><MiniActionCard iconId="i-search" label={`조사 ${globalInvest}/10`} subLabel={`충전 ${formatCountdown(countdown)}`} /><MiniActionCard iconId="i-bolt" label={`스킬 ${globalSkill}/5`} subLabel="즉시 사용 가능" /><MiniActionCard iconId="i-crown" label={`명성 ${reputation.toLocaleString()}`} subLabel={season.name} /></div>
                <div className="pc-player-card__actions"><button className="pc-inline-button" onClick={() => setJudgeDeskTab('history')} type="button">지난 기록</button><button className="pc-inline-button is-ghost" onClick={() => setView('settings')} type="button">설정</button></div>
              </Card>
              <Card eyebrow="AXES" title={titleInfo.name}>
                <AxisRow label="탐구(균형)" left="논리" right="직관" value={judgeProfile.inquiryAxis} />
                <AxisRow label="판결(균형)" left="엄격" right="관용" value={judgeProfile.judgmentAxis} />
                <AxisRow label="해결(균형)" left="원칙" right="봉합" value={judgeProfile.resolutionAxis} />
              </Card>
              <Card eyebrow="ACHIEVEMENTS" title="업적">
                <div className="pc-achievement-strip__track">
                  <Achievement iconId="i-crown" label="명성" value={reputation.toLocaleString()} />
                  <Achievement iconId="i-doc" label="처리 사건" value={`${history.length}건`} />
                  <Achievement iconId="i-scale" label="최고 점수" value={`${playerStats.bestScore}점`} />
                </div>
              </Card>
            </div>
          ) : (
            <div className="pc-history-board">
              <Card eyebrow="GENERAL MODE" title="일반 모드">
                <div className="pc-history-chip-row">{PC_GENERAL_SESSIONS.map((session) => <button className={`pc-history-chip${selectedTrack === session.id ? ' is-active' : ''}`} key={session.id} onClick={() => setSelectedTrack(session.id)} type="button"><strong>{session.label}</strong><span>{`${sessionProgress[session.id].completedCount}/${sessionProgress[session.id].totalCount}`}</span></button>)}</div>
              </Card>
              <Card eyebrow="SEASON MODE" title="시즌 모드">
                <div className="pc-history-chip-row"><button className={`pc-history-chip${selectedTrack === 'season' ? ' is-active' : ''}`} onClick={() => setSelectedTrack('season')} type="button"><strong>{season.name}</strong><span>{`${seasonProgress.completedCount}/${seasonProgress.totalCount}`}</span></button></div>
              </Card>
              <Card eyebrow="TRACK RECORD" title={selectedTrack === 'season' ? season.name : PC_GENERAL_SESSIONS.find((session) => session.id === selectedTrack)?.label ?? '기록'}>
                <div className="pc-history-strip">{selectedTrackEntries.length === 0 ? <Empty title="표시할 기록이 없습니다." description="해당 트랙의 플레이 기록이 아직 없습니다." /> : selectedTrackEntries.map((entry) => <button className={`pc-history-case-card${selectedHistoryKey === getHistoryKey(entry) ? ' is-active' : ''}`} key={getHistoryKey(entry)} onClick={() => setSelectedHistoryKey(getHistoryKey(entry))} type="button"><span>{entry.date.slice(0, 10)}</span><strong>{entry.score}점</strong><small>{entry.nameA} vs {entry.nameB}</small></button>)}</div>
              </Card>
              <Card eyebrow="DETAIL" title={selectedHistory ? `${selectedHistory.nameA} vs ${selectedHistory.nameB}` : '기록 상세'}>
                {selectedHistory ? <div className="pc-history-focus"><div className="pc-history-focus__meta"><MiniStat label="총점" value={`${selectedHistory.score}점`} /><MiniStat label="탐구" value={`${selectedHistory.insight}`} /><MiniStat label="판결" value={`${selectedHistory.authority}`} /><MiniStat label="해결" value={`${selectedHistory.wisdom}`} /></div><div className="pc-history-focus__body"><div className="pc-history-focus__line"><strong>관계</strong><span>{getRelationshipLabel(selectedHistory.relationshipType)}</span></div><div className="pc-history-focus__line"><strong>일시</strong><span>{new Date(selectedHistory.date).toLocaleString('ko-KR')}</span></div><div className="pc-history-focus__line"><strong>해결</strong><span>{selectedHistory.verdictDetail?.selectedSolutions?.join(', ') || '기록 없음'}</span></div></div></div> : <Empty title="선택된 기록이 없습니다." description="기록을 선택하면 상세 정보가 표시됩니다." />}
              </Card>
            </div>
          )}
        </section>
      )}

      {view === 'leaderboard' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow={season.name} title="리더보드" description="현재 시즌 기준 점수와 명예의 전당 기록입니다." onBack={() => setView('home')} />
          <div className="pc-filter-pills-v2">{SORTS.map((sort) => <button className={`pc-filter-pill-v2${leaderboardSort === sort.id ? ' is-active' : ''}`} key={sort.id} onClick={() => setLeaderboardSort(sort.id)} type="button">{sort.label}</button>)}</div>
          <div className="pc-leaderboard-grid">
            <Card eyebrow="SCOREBOARD" title="시즌 랭킹">{leaderboard.length === 0 ? <Empty title="아직 시즌 기록이 없습니다." description="플레이 기록이 쌓이면 이곳에 자동 반영됩니다." /> : <div className="pc-ranking-list-v2">{leaderboard.slice(0, 10).map((entry, index) => <div className="pc-ranking-row-v2" key={getHistoryKey(entry)}><span className="pc-ranking-row-v2__rank">{index + 1}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.nameA} vs {entry.nameB}</strong><span>{getRelationshipLabel(entry.relationshipType)}</span></div><strong className="pc-ranking-row-v2__score">{sortMetric(entry, leaderboardSort)}</strong></div>)}</div>}</Card>
            <Card eyebrow="HALL OF FAME" title="명예의 전당">{hallOfFame.length === 0 ? <Empty title="아직 전당 기록이 없습니다." description="최고 기록이 쌓이면 시즌 명예의 전당이 채워집니다." /> : <div className="pc-ranking-list-v2">{hallOfFame.map((entry) => <div className="pc-ranking-row-v2" key={`${entry.seasonId}:${entry.rank}:${entry.caseId}`}><span className="pc-ranking-row-v2__rank">{entry.rank}</span><div className="pc-ranking-row-v2__copy"><strong>{entry.playerName}</strong><span>{entry.caseId.replace(/^case-/, '')}</span></div><strong className="pc-ranking-row-v2__score">{entry.score}점</strong></div>)}</div>}</Card>
          </div>
        </section>
      )}

      {view === 'settings' && (
        <section className="pc-depth-shell">
          <DepthHeader eyebrow="SETTINGS" title="설정" description="오디오, 텍스트 속도, AI 연결 상태를 관리합니다." onBack={() => setView('home')} />
          <div className="pc-settings-grid-v2">
            <Card eyebrow="AUDIO" title="오디오"><ToggleRow checked={bgmOn} label="배경음" description="타이틀과 플레이 배경음" onToggle={toggleBgm} /><ToggleRow checked={sfxOn} label="효과음" description="상호작용과 판결 효과음" onToggle={toggleSfx} /></Card>
            <Card eyebrow="GAMEPLAY" title="게임 플레이"><SummaryRow label="행동 힌트" value={settings.showBehaviorHints ? '켜짐' : '꺼짐'} /><SummaryRow label="대사 자동 진행" value={settings.autoAdvanceDialogue ? '켜짐' : '꺼짐'} /><div className="pc-settings-select-row"><div><strong>텍스트 속도</strong><p>대사 표시와 타이핑 속도</p></div><select className="pc-settings-select" onChange={(event) => updateTypingSpeed(event.target.value as HomeSettings['typingSpeed'])} value={settings.typingSpeed}><option value="fast">빠르게</option><option value="normal">보통</option><option value="slow">느리게</option></select></div></Card>
            <Card eyebrow="LIVE" title="라이브 상태"><SummaryRow label="AI 연결" value={llmConnected == null ? '확인 중' : llmConnected ? '정상' : '오프라인'} /><SummaryRow label="다음 충전" value={formatCountdown(countdown)} /><button className="pc-inline-button" disabled={checkingConnection} onClick={refreshConnection} type="button">{checkingConnection ? '확인 중…' : '연결 다시 확인'}</button></Card>
          </div>
        </section>
      )}
    </div>
  )
}

function ModeCard({ badge, iconId, label, metaLeft, metaRight, onClick, progressRate, season = false }: { badge: string; iconId: string; label: string; metaLeft: string; metaRight: string; onClick: () => void; progressRate: number; season?: boolean }) {
  return <button className={`pc-mode-card${season ? ' is-season' : ''}`} onClick={onClick} type="button"><div className="pc-mode-card__badge-row"><span className="pc-mode-card__badge">{badge}</span></div><div className="pc-mode-card__content"><span className="pc-mode-card__icon"><PCSvgIcon id={iconId} size={38} /></span><div className="pc-mode-card__copy"><strong>{label}</strong><div className="pc-mode-card__meta"><span>{metaLeft}</span><span>{metaRight}</span></div></div></div><div className="pc-mode-card__track"><i style={{ width: `${progressRate}%` }} /></div></button>
}

function InfoCard({ actionLabel, iconId, onClick, subtitle, title }: { actionLabel: string; iconId: string; onClick: () => void; subtitle: string; title: string }) {
  return <div className="pc-home-info-card"><div className="pc-home-info-card__head"><span className="pc-home-info-card__icon"><PCSvgIcon id={iconId} size={26} /></span><div><strong>{title}</strong><p>{subtitle}</p></div></div><button className="pc-home-info-card__action" onClick={onClick} type="button">{actionLabel}</button></div>
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
  return <div className="pc-axis-row"><div className="pc-axis-row__head"><strong>{label}</strong><span>{clamped > 0 ? right : left}</span></div><div className="pc-axis-row__track"><span>{left}</span><div className="pc-axis-row__line"><i style={{ left: `${percent}%` }} /></div><span>{right}</span></div></div>
}

function ToggleRow({ checked, label, description, onToggle }: { checked: boolean; label: string; description: string; onToggle: () => void }) {
  return <div className="pc-toggle-row"><div><strong>{label}</strong><p>{description}</p></div><button className={`pc-toggle-row__switch${checked ? ' is-on' : ''}`} onClick={onToggle} type="button"><i /></button></div>
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="pc-summary-row"><strong>{label}</strong><span>{value}</span></div>
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
