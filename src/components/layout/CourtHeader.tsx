import { useState, useEffect, lazy, Suspense } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'
import ResourcePopup from '../shop/ResourcePopup'
import Emoji from '../common/Emoji'
import { checkConnection } from '../../engine/llmClient'
import { MAX_TURNS } from '../../utils/constants'

const StateTransitionToast = lazy(() => import('../discovery/StateTransitionFeedback').then(m => ({ default: m.StateTransitionToast })))
const GameEventModal = lazy(() => import('../discovery/GameEventModal'))
const EvidenceResultToast = lazy(() => import('../discovery/EvidenceResultToast'))
const ForcedVerdictBanner = lazy(() => import('../discovery/ForcedVerdictBanner'))

const EMOTION_EMOJI: Record<string, string> = {
  defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
}

// 외부에서 리소스 팝업을 여는 전역 함수
let openResourcePopupFn: ((type: 'invest' | 'skill') => void) | null = null
export function openResourcePopup(type: 'invest' | 'skill') {
  openResourcePopupFn?.(type)
}

interface CourtHeaderProps {
  isDialoguePhase?: boolean
  onToggleInfo?: () => void
  infoOpen?: boolean
}

/* ── 도움말 가이드 데이터 ── */
const HELP_PAGES = [
  { icon: '⚖️', title: '게임 목표', desc: '당신은 재판관입니다.\n양쪽 당사자의 주장을 듣고\n진실을 밝혀 공정한 판결을 내리세요.' },
  { icon: '🔍', title: '조사 토큰', desc: '증거를 조사하거나\n자유 질문을 할 때 소모됩니다.\n시간이 지나면 자동 충전됩니다.' },
  { icon: '⚡', title: '스킬 포인트', desc: '이의 제기, 분리 심문 등\n특수 행동에 사용됩니다.\n전략적으로 아껴 사용하세요.' },
  { icon: '❓', title: '심문', desc: '당사자에게 질문하여\n거짓말을 흔들고\n진실에 가까워지세요.' },
  { icon: '📄', title: '증거', desc: '발견한 증거를 제시하면\n당사자의 거짓말이\n더 빨리 무너집니다.' },
  { icon: '😐', title: '감정 상태', desc: '당사자의 감정이 변합니다.\n너무 몰아붙이면 셧다운,\n적절히 압박하면 자백을 유도할 수 있습니다.' },
]

/* ── Phase 설명 ── */
const PHASE_DESC: Record<string, { title: string; desc: string }> = {
  [GamePhase.Phase0_CaseIntro]: { title: '사건 개요', desc: '사건의 배경과 당사자를 확인합니다.' },
  [GamePhase.Phase1_InitialStatement]: { title: '초기 진술', desc: '양측의 첫 진술을 듣습니다.\n대화를 탭하면 다음으로 넘어갑니다.' },
  [GamePhase.Phase2_Rebuttal]: { title: '반박', desc: '상대 주장에 대한 반박을 듣습니다.' },
  [GamePhase.Phase3_Interrogation]: { title: '심문', desc: '직접 질문하고 증거를 제시하여\n진실을 밝히는 핵심 단계입니다.' },
  [GamePhase.Phase4_Evidence]: { title: '증거 심리', desc: '증거 제시와 즉답 요구가\n해금됩니다.' },
  [GamePhase.Phase5_ReExamination]: { title: '재심문', desc: '비공개 보호 토글이 해금됩니다.\nAI 진술 분석도 사용 가능합니다.' },
  [GamePhase.Phase6_Mediation]: { title: '조정', desc: '최종 판결 전 조정 단계입니다.' },
  [GamePhase.Phase7_Verdict]: { title: '판결', desc: '수집한 증거와 심문 결과를 바탕으로\n판결을 내립니다.' },
}

export default function CourtHeader({ isDialoguePhase, onToggleInfo, infoOpen }: CourtHeaderProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showResource, setShowResource] = useState<'invest' | 'skill' | null>(null)
  const [aiStatus, setAiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [showSummaryLock, setShowSummaryLock] = useState(false)
  const [showScorePopup, setShowScorePopup] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [helpPage, setHelpPage] = useState(0)
  const [showPhaseInfo, setShowPhaseInfo] = useState(false)
  const [showTurnInfo, setShowTurnInfo] = useState(false)
  const [showPartyPopup, setShowPartyPopup] = useState<{ party: 'a' | 'b'; tab: 'info' | 'emotion' } | null>(null)
  const [summaryUnlocked, setSummaryUnlocked] = useState(false)

  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const separationTarget = useStore((s) => s.separationTarget)
  const tickRecharge = useStore((s) => s.tickInvestRecharge)
  const turnCount = useStore((s) => s.turnCount)
  const globalInvest = useStore((s) => s.globalInvestTokens)
  const globalSkill = useStore((s) => s.globalSkillPoints)
  const adCountInvest = useStore((s) => s.adWatchCountInvest)
  const adCountSkill = useStore((s) => s.adWatchCountSkill)
  const watchAdInvest = useStore((s) => s.watchAdForInvest)
  const watchAdSkill = useStore((s) => s.watchAdForSkill)
  const getCountdown = useStore((s) => s.getNextRechargeCountdown)
  const processMetrics = useStore((s) => s.processMetrics)
  const pendingEvidenceResult = useStore((s) => s.pendingEvidenceResult)
  const setPendingEvidenceResult = useStore((s) => s.setPendingEvidenceResult)
  const verdictMode = useStore((s) => s.verdictMode)

  openResourcePopupFn = setShowResource

  const LATE_PHASES = [
    GamePhase.Phase3_Interrogation, GamePhase.Phase4_Evidence,
    GamePhase.Phase5_ReExamination, GamePhase.Phase6_Mediation,
    GamePhase.Phase7_Verdict, GamePhase.Result,
  ]
  const isLatePhase = LATE_PHASES.includes(currentPhase)
  const isInterrogation = [
    GamePhase.Phase3_Interrogation, GamePhase.Phase4_Evidence, GamePhase.Phase5_ReExamination,
  ].includes(currentPhase)

  const remainingTurns = MAX_TURNS - turnCount
  const estimatedScore = Math.min(100,
    processMetrics.liesCollapsed * 10 + processMetrics.evidenceDiscovered * 8
    + processMetrics.evidenceEffective * 5 + processMetrics.freeQuestionsRelevant * 3
  )

  useEffect(() => {
    tickRecharge()
    const timer = setInterval(tickRecharge, 60_000)
    return () => clearInterval(timer)
  }, [tickRecharge])

  useEffect(() => {
    const check = () => checkConnection().then(r => setAiStatus(r.connected ? 'connected' : 'disconnected'))
    check()
    const timer = setInterval(check, 30_000)
    return () => clearInterval(timer)
  }, [])

  const handleExit = () => {
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  const handleSummaryClick = () => {
    if (summaryUnlocked) {
      onToggleInfo?.()
    } else {
      setShowSummaryLock(true)
    }
  }

  const handleUnlockSummary = () => {
    const s = useGameStore.getState()
    if (s.globalSkillPoints >= 3) {
      s.spend('skillPoints', 3)
      setSummaryUnlocked(true)
      setShowSummaryLock(false)
      onToggleInfo?.()
    }
  }

  const phaseA = agentA.emotionalState.phase
  const phaseB = agentB.emotionalState.phase
  const aExcluded = separationTarget === 'b'
  const bExcluded = separationTarget === 'a'

  return (
    <>
      {/* ═══ 1행: 나가기 | 😐A | 심문 턴 | B😐 | AI ⚙️ ═══ */}
      <header
        className="glass-surface inner-glow-amber px-3 flex items-end shrink-0"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6px)', paddingBottom: '8px' }}
      >
        <button onClick={() => setShowExitConfirm(true)}
          className="text-gray-500 hover:text-gray-200 text-xs shrink-0 px-2 py-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-colors">
          ← 나가기
        </button>

        {/* 파티A — 이모지→감정탭, 이름→캐릭터탭 */}
        {caseData && (
          <div className={`flex items-center gap-1.5 ml-1 shrink-0 ${aExcluded ? 'opacity-30' : ''}`}>
            <button onClick={() => setShowPartyPopup({ party: 'a', tab: 'emotion' })} className="active:scale-90 transition-all">
              <Emoji char={aExcluded ? '🚪' : (EMOTION_EMOJI[phaseA] ?? '😐')} size={22} />
            </button>
            <button onClick={() => setShowPartyPopup({ party: 'a', tab: 'info' })} className="active:scale-95 transition-all">
              <span className="text-sm font-bold text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.3)]">{caseData.duo.partyA.name}</span>
            </button>
          </div>
        )}

        {/* 중앙: 심문 + 턴 — 각각 클릭 가능 */}
        <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
          <button onClick={() => setShowPhaseInfo(true)} className="active:scale-95 transition-all">
            <PhaseIndicator compact />
          </button>
          {isLatePhase && (
            <button onClick={() => setShowTurnInfo(true)} className="active:scale-95 transition-all">
              <span className={`text-sm font-semibold tabular-nums ${remainingTurns <= 5 ? 'text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.4)]' : 'text-gray-400'}`}>
                {turnCount}/{MAX_TURNS}
              </span>
            </button>
          )}
        </div>

        {/* 파티B */}
        {caseData && (
          <div className={`flex items-center gap-1.5 shrink-0 ${bExcluded ? 'opacity-30' : ''}`}>
            <button onClick={() => setShowPartyPopup({ party: 'b', tab: 'info' })} className="active:scale-95 transition-all">
              <span className="text-sm font-bold text-rose-400 drop-shadow-[0_0_6px_rgba(251,113,133,0.3)]">{caseData.duo.partyB.name}</span>
            </button>
            <button onClick={() => setShowPartyPopup({ party: 'b', tab: 'emotion' })} className="active:scale-90 transition-all">
              <Emoji char={bExcluded ? '🚪' : (EMOTION_EMOJI[phaseB] ?? '😐')} size={22} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 ml-1.5 shrink-0">
          <span className={`text-[10px] ${
            aiStatus === 'connected' ? 'text-emerald-400/80 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]' :
            aiStatus === 'disconnected' ? 'text-red-400/80' : 'text-gray-600'
          }`}>
            {aiStatus === 'connected' ? '●' : aiStatus === 'disconnected' ? '●' : '○'}
          </span>
          <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-gray-200 p-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-colors">
            <Emoji char="⚙️" size={18} />
          </button>
        </div>
      </header>

      {/* ═══ 2행: 🔒요약 | 스코어 | (flex) | 🔍 | ⚡ | ❓ ═══ */}
      {isLatePhase && (
        <div className="glass-surface-light inner-glow-subtle px-2.5 h-11 flex items-center gap-1.5 shrink-0">
          {/* 🔒 요약 */}
          {!isDialoguePhase ? (
            <button
              onClick={handleSummaryClick}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold active:scale-95 transition-all ${
                summaryUnlocked && infoOpen
                  ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30 glow-amber'
                  : summaryUnlocked
                    ? 'bg-white/5 text-gray-400 ring-1 ring-white/5 hover:ring-white/10 hover:text-gray-200'
                    : 'bg-white/[0.02] text-gray-500 ring-1 ring-white/[0.04] hover:ring-white/10'
              }`}
            >
              <Emoji char={summaryUnlocked ? (infoOpen ? '✕' : '📋') : '🔒'} size={14} />
              요약
            </button>
          ) : (
            <div className="w-14" />
          )}

          {/* 스코어 — ⚖️ 아이콘, 클릭→팝업 */}
          <button onClick={() => setShowScorePopup(true)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-amber-500/20 active:scale-95 transition-all">
            <Emoji char="⚖️" size={14} />
            <span className="text-xs font-bold text-amber-300 tabular-nums">{estimatedScore}</span>
          </button>

          <div className="flex-1" />

          {/* 🔍 조사 토큰 */}
          <button onClick={() => setShowResource('invest')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-amber-500/20 hover:bg-amber-500/5 active:scale-95 transition-all">
            <Emoji char="🔍" size={16} />
            <span className={`text-sm font-bold tabular-nums ${globalInvest === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalInvest}</span>
          </button>

          {/* ⚡ 스킬 */}
          <button onClick={() => setShowResource('skill')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-amber-500/20 hover:bg-amber-500/5 active:scale-95 transition-all">
            <Emoji char="⚡" size={16} />
            <span className={`text-sm font-bold tabular-nums ${globalSkill === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalSkill}</span>
          </button>

          {/* ❓ 도움말 */}
          <button onClick={() => { setHelpPage(0); setShowHelp(true) }}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-white/15 active:scale-95 transition-all">
            <Emoji char="❓" size={16} />
          </button>
        </div>
      )}

      {/* ═══ 모달/팝업들 — 모두 중앙 ═══ */}

      {/* 설정 */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* 리소스 팝업 */}
      {showResource === 'invest' && (
        <ResourcePopup type="invest" current={globalInvest} countdown={getCountdown()}
          adRemaining={5 - adCountInvest} onWatchAd={watchAdInvest} onClose={() => setShowResource(null)} />
      )}
      {showResource === 'skill' && (
        <ResourcePopup type="skill" current={globalSkill}
          adRemaining={2 - adCountSkill} onWatchAd={watchAdSkill} onClose={() => setShowResource(null)} />
      )}

      {/* 요약 활성화 경고 */}
      {showSummaryLock && (
        <CenterModal onClose={() => setShowSummaryLock(false)}>
          <div className="text-center mb-4">
            <Emoji char="🔒" size={40} />
          </div>
          <h3 className="text-base font-bold text-gray-100 text-center mb-2">요약 활성화</h3>
          <p className="text-sm text-gray-300 text-center mb-3 leading-relaxed">
            쟁점·주장·증거를 한 눈에 볼 수 있습니다.
          </p>
          <p className="text-xs text-amber-400/80 text-center mb-1 leading-relaxed">
            <Emoji char="⚠️" size={14} /> 요약 활성화에 스킬 포인트 3개가 소모됩니다.
          </p>
          <p className="text-xs text-gray-400 text-center mb-4 leading-relaxed">
            <Emoji char="🤔" size={14} /> 스스로 추리하는 재미가 줄어들 수 있으니<br />신중하게 생각해주세요!
          </p>
          <div className="flex gap-2">
            <button onClick={() => setShowSummaryLock(false)}
              className="flex-1 py-2.5 rounded-xl text-sm bg-gray-800 text-gray-400 active:scale-95">아니요</button>
            <button onClick={handleUnlockSummary} disabled={globalSkill < 3}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-amber-600 text-gray-950 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
              활성화 (<Emoji char="⚡" size={12} />3)
            </button>
          </div>
          {globalSkill < 3 && (
            <p className="text-[10px] text-red-400/70 text-center mt-2">스킬 포인트가 부족합니다 ({globalSkill}/3)</p>
          )}
        </CenterModal>
      )}

      {/* 스코어 팝업 */}
      {showScorePopup && (
        <CenterModal onClose={() => setShowScorePopup(false)}>
          <div className="text-center mb-3">
            <Emoji char="⚖️" size={36} />
          </div>
          <h3 className="text-base font-bold text-amber-400 text-center mb-3">판결 준비도</h3>
          <div className="space-y-2.5">
            <ScoreRow icon="💥" label="거짓말 붕괴" value={processMetrics.liesCollapsed} weight={10} />
            <ScoreRow icon="🔍" label="증거 발견" value={processMetrics.evidenceDiscovered} weight={8} />
            <ScoreRow icon="📄" label="증거 효과" value={processMetrics.evidenceEffective} weight={5} />
            <ScoreRow icon="❓" label="유효 질문" value={processMetrics.freeQuestionsRelevant} weight={3} />
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between">
            <span className="text-sm text-gray-400">총점</span>
            <span className="text-lg font-bold text-amber-400">{estimatedScore}</span>
          </div>
        </CenterModal>
      )}

      {/* 도움말 가이드 */}
      {showHelp && (
        <CenterModal onClose={() => setShowHelp(false)}>
          <div className="text-center mb-3">
            <Emoji char={HELP_PAGES[helpPage].icon} size={40} />
          </div>
          <h3 className="text-base font-bold text-gray-100 text-center mb-2">{HELP_PAGES[helpPage].title}</h3>
          <p className="text-sm text-gray-300 text-center whitespace-pre-line leading-relaxed mb-4">
            {HELP_PAGES[helpPage].desc}
          </p>
          {/* 페이지 인디케이터 */}
          <div className="flex justify-center gap-1.5 mb-3">
            {HELP_PAGES.map((_, i) => (
              <button key={i} onClick={() => setHelpPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === helpPage ? 'bg-amber-400 w-4' : 'bg-gray-600'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setHelpPage(Math.max(0, helpPage - 1))} disabled={helpPage === 0}
              className="flex-1 py-2 rounded-xl text-xs bg-gray-800 text-gray-400 active:scale-95 disabled:opacity-30">이전</button>
            {helpPage < HELP_PAGES.length - 1 ? (
              <button onClick={() => setHelpPage(helpPage + 1)}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95">다음</button>
            ) : (
              <button onClick={() => setShowHelp(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95">닫기</button>
            )}
          </div>
        </CenterModal>
      )}

      {/* Phase 설명 */}
      {showPhaseInfo && (
        <CenterModal onClose={() => setShowPhaseInfo(false)}>
          <div className="text-center mb-3">
            <Emoji char="⚖️" size={36} />
          </div>
          <h3 className="text-base font-bold text-amber-400 text-center mb-2">
            {PHASE_DESC[currentPhase]?.title ?? '단계'}
          </h3>
          <p className="text-sm text-gray-300 text-center whitespace-pre-line leading-relaxed mb-4">
            {PHASE_DESC[currentPhase]?.desc ?? ''}
          </p>
          <button onClick={() => setShowPhaseInfo(false)}
            className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-600 text-gray-950 active:scale-95">확인</button>
        </CenterModal>
      )}

      {/* 턴 설명 */}
      {showTurnInfo && (
        <CenterModal onClose={() => setShowTurnInfo(false)}>
          <div className="text-center mb-3">
            <Emoji char="⏳" size={36} />
          </div>
          <h3 className="text-base font-bold text-gray-100 text-center mb-2">남은 턴</h3>
          <p className="text-sm text-gray-300 text-center leading-relaxed mb-1">
            현재 <span className="font-bold text-amber-400">{turnCount}</span>턴 / 최대 <span className="font-bold">{MAX_TURNS}</span>턴
          </p>
          <p className="text-xs text-gray-500 text-center mb-4">
            턴이 모두 소진되면 현재까지의 정보로<br />강제 판결이 진행됩니다.
          </p>
          <button onClick={() => setShowTurnInfo(false)}
            className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-600 text-gray-950 active:scale-95">확인</button>
        </CenterModal>
      )}

      {/* 캐릭터/감정 팝업 — PartyStatusBar에서 가져옴 */}
      {showPartyPopup && caseData && (
        <PartyPopupBridge
          party={showPartyPopup.party}
          initialTab={showPartyPopup.tab}
          onClose={() => setShowPartyPopup(null)}
        />
      )}

      {/* 나가기 확인 */}
      {showExitConfirm && (
        <CenterModal onClose={() => setShowExitConfirm(false)}>
          <p className="text-sm text-gray-200 mb-1 font-semibold">사건을 중단하시겠습니까?</p>
          <p className="text-xs text-gray-500 mb-4">현재 진행 상황은 저장되지 않습니다.</p>
          <div className="flex gap-2">
            <button onClick={() => setShowExitConfirm(false)}
              className="flex-1 text-xs py-2 rounded-xl bg-gray-800 text-gray-400 active:scale-95">계속하기</button>
            <button onClick={handleExit}
              className="flex-1 text-xs py-2 rounded-xl bg-red-700 text-white font-bold active:scale-95">나가기</button>
          </div>
        </CenterModal>
      )}

      {/* 상태 전이/이벤트/증거/경고 토스트 */}
      {isInterrogation && <Suspense fallback={null}><StateTransitionToast /></Suspense>}
      {isInterrogation && <Suspense fallback={null}><GameEventModal /></Suspense>}
      {pendingEvidenceResult && (
        <Suspense fallback={null}>
          <EvidenceResultToast result={pendingEvidenceResult.type} evidenceName={pendingEvidenceResult.evidenceName}
            onDone={() => setPendingEvidenceResult(null)} />
        </Suspense>
      )}
      {verdictMode === 'forced_incomplete' && <Suspense fallback={null}><ForcedVerdictBanner /></Suspense>}
    </>
  )
}

/* ── 공용 중앙 모달 ── */
function CenterModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center px-5" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-5 w-full max-w-sm animate-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

/* ── 스코어 행 ── */
function ScoreRow({ icon, label, value, weight }: { icon: string; label: string; value: number; weight: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Emoji char={icon} size={14} />
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{value} × {weight}</span>
        <span className="text-sm font-bold text-gray-200 w-8 text-right">{value * weight}</span>
      </div>
    </div>
  )
}

/* ── 캐릭터 팝업 브릿지 — PartyStatusBar의 PartyDetailPopup을 lazy import ── */
function PartyPopupBridge({ party, initialTab, onClose }: { party: 'a' | 'b'; initialTab: 'info' | 'emotion'; onClose: () => void }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  if (!caseData) return null

  // PartyStatusBar의 PartyDetailPopup은 내부 컴포넌트이므로 직접 렌더링할 수 없음
  // 대신 동일한 데이터로 import된 컴포넌트를 사용 — PartyStatusBar를 한번 렌더해야 함
  // 여기서는 간소화된 팝업으로 대체
  const agent = party === 'a' ? agentA : agentB
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const nameColor = party === 'a' ? 'text-blue-400' : 'text-rose-400'
  const ringColor = party === 'a' ? 'ring-blue-500/40' : 'ring-rose-500/40'
  const emo = agent.emotionalState
  const EMOTION_LABELS: Record<string, string> = {
    defensive: '방어적 — 신중하게 말을 고릅니다',
    confident: '자신감 — 확신을 가지고 있습니다',
    shaken: '동요 — 흔들리고 있습니다',
    angry: '격앙 — 감정이 격해졌습니다',
    resigned: '체념 — 더 이상 숨기지 않습니다',
  }
  const [tab, setTab] = useState(initialTab)

  return (
    <CenterModal onClose={onClose}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-full bg-gray-800 ring-2 ${ringColor} flex items-center justify-center`}>
          <Emoji char={EMOTION_EMOJI[emo.phase] ?? '😐'} size={22} />
        </div>
        <div className="flex-1">
          <h3 className={`text-base font-bold ${nameColor}`}>{profile.name}</h3>
          <p className="text-xs text-gray-500">{profile.age}세 · {profile.occupation}</p>
        </div>
      </div>

      {/* 탭 토글 */}
      <div className="flex mb-3 bg-gray-800/60 rounded-lg p-0.5">
        <button onClick={() => setTab('info')}
          className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${tab === 'info' ? 'bg-gray-700 text-gray-200' : 'text-gray-500'}`}>
          캐릭터 정보
        </button>
        <button onClick={() => setTab('emotion')}
          className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${tab === 'emotion' ? 'bg-gray-700 text-gray-200' : 'text-gray-500'}`}>
          감정 상태
        </button>
      </div>

      {tab === 'info' && (
        <div className="space-y-1.5 text-xs text-gray-400">
          <div className="py-1.5 border-b border-gray-800/40">
            <span className="text-gray-300 font-semibold">성격:</span> {({avoidant:'회피형',confrontational:'정면돌파형',victim_cosplay:'피해자형',cold_logic:'냉정논리형'} as Record<string,string>)[profile.archetype] ?? profile.archetype}
          </div>
          <div className="py-1.5 border-b border-gray-800/40">
            <span className="text-gray-300 font-semibold">말투:</span> {profile.speechStyle}
          </div>
        </div>
      )}

      {tab === 'emotion' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">감정 수치</span>
            <span className="text-xs font-bold text-amber-400">{Math.round(emo.internalValue)} / 100</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${Math.min(emo.internalValue, 100)}%` }} />
          </div>
          <p className="text-xs text-gray-400">{EMOTION_LABELS[emo.phase] ?? emo.phase}</p>
        </div>
      )}
    </CenterModal>
  )
}
