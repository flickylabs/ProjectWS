import { useState, useEffect, lazy, Suspense } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'
import ResourcePopup from '../shop/ResourcePopup'
import Emoji from '../common/Emoji'
import { checkConnection } from '../../engine/llmClient'
import { MAX_TURNS } from '../../utils/constants'

const DisputeBoard = lazy(() => import('../discovery/DisputeBoard'))
const StateTransitionToast = lazy(() => import('../discovery/StateTransitionFeedback').then(m => ({ default: m.StateTransitionToast })))
const GameEventModal = lazy(() => import('../discovery/GameEventModal'))
const EvidenceResultToast = lazy(() => import('../discovery/EvidenceResultToast'))
const ForcedVerdictBanner = lazy(() => import('../discovery/ForcedVerdictBanner'))

const EMOTION_EMOJI: Record<string, string> = {
  defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
}

function ReadinessChip({ label, value, target }: { label: string; value: number; target: number }) {
  const met = value >= target
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold transition-all ${
      met
        ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20 glow-emerald'
        : 'bg-gray-800/50 text-gray-500 ring-1 ring-gray-700/30'
    }`}>
      {label} {value}/{target}
    </span>
  )
}


// 외부에서 리소스 팝업을 여는 전역 함수 (PartyStatusBar 호환)
let openResourcePopupFn: ((type: 'invest' | 'skill') => void) | null = null
export function openResourcePopup(type: 'invest' | 'skill') {
  openResourcePopupFn?.(type)
}

interface CourtHeaderProps {
  isDialoguePhase?: boolean
  onToggleInfo?: () => void
  infoOpen?: boolean
}

export default function CourtHeader({ isDialoguePhase, onToggleInfo, infoOpen }: CourtHeaderProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showResource, setShowResource] = useState<'invest' | 'skill' | null>(null)
  const [showDisputeBoard, setShowDisputeBoard] = useState(false)
  const [aiStatus, setAiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  const caseData = useGameStore((s) => s.caseData)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const separationTarget = useGameStore((s) => s.separationTarget)
  const tickRecharge = useGameStore((s) => s.tickInvestRecharge)
  const turnCount = useGameStore((s) => s.turnCount)
  const globalInvest = useGameStore((s) => s.globalInvestTokens)
  const globalSkill = useGameStore((s) => s.globalSkillPoints)
  const adCountInvest = useGameStore((s) => s.adWatchCountInvest)
  const adCountSkill = useGameStore((s) => s.adWatchCountSkill)
  const watchAdInvest = useGameStore((s) => s.watchAdForInvest)
  const watchAdSkill = useGameStore((s) => s.watchAdForSkill)
  const getCountdown = useGameStore((s) => s.getNextRechargeCountdown)
  const readinessState = useGameStore((s) => s.readinessState)
  const processMetrics = useGameStore((s) => s.processMetrics)
  const pendingEvidenceResult = useGameStore((s) => s.pendingEvidenceResult)
  const setPendingEvidenceResult = useGameStore((s) => s.setPendingEvidenceResult)
  const verdictMode = useGameStore((s) => s.verdictMode)

  // 전역 리소스 팝업
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
  const estimatedScore = readinessState
    ? readinessState.readinessScore
    : Math.min(100, processMetrics.liesCollapsed * 10 + processMetrics.evidenceDiscovered * 8 + processMetrics.evidenceEffective * 5 + processMetrics.freeQuestionsRelevant * 3)

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

  const phaseA = agentA.emotionalState.phase
  const phaseB = agentB.emotionalState.phase
  const aExcluded = separationTarget === 'b'
  const bExcluded = separationTarget === 'a'

  return (
    <>
      {/* 1행: 나가기 | 😐 파티A | 심문 1/16 | 파티B 😐 | AI ⚙️ */}
      <header
        className="glass-surface inner-glow-amber px-3 flex items-end shrink-0"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6px)', paddingBottom: '8px' }}
      >
        <button onClick={() => setShowExitConfirm(true)}
          className="text-gray-500 hover:text-gray-200 text-xs shrink-0 px-2 py-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-colors">
          ← 나가기
        </button>

        {caseData && (
          <div className={`flex items-center gap-1.5 ml-1 shrink-0 ${aExcluded ? 'opacity-30' : ''}`}>
            <Emoji char={aExcluded ? '🚪' : (EMOTION_EMOJI[phaseA] ?? '😐')} size={22} />
            <span className="text-sm font-bold text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.3)]">{caseData.duo.partyA.name}</span>
          </div>
        )}

        {/* 중앙: 현재 단계 + 턴수 */}
        <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
          <PhaseIndicator compact />
          {isLatePhase && (
            <span className={`text-sm font-semibold tabular-nums ${remainingTurns <= 5 ? 'text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.4)]' : 'text-gray-400'}`}>
              {turnCount}/{MAX_TURNS}
            </span>
          )}
        </div>

        {caseData && (
          <div className={`flex items-center gap-1.5 shrink-0 ${bExcluded ? 'opacity-30' : ''}`}>
            <span className="text-sm font-bold text-rose-400 drop-shadow-[0_0_6px_rgba(251,113,133,0.3)]">{caseData.duo.partyB.name}</span>
            <Emoji char={bExcluded ? '🚪' : (EMOTION_EMOJI[phaseB] ?? '😐')} size={22} />
          </div>
        )}

        <div className="flex items-center gap-1 ml-1.5 shrink-0">
          <span className={`text-[10px] ${
            aiStatus === 'connected' ? 'text-emerald-400/80 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]' :
            aiStatus === 'disconnected' ? 'text-red-400/80' :
            'text-gray-600'
          }`}>
            {aiStatus === 'connected' ? '●' : aiStatus === 'disconnected' ? '●' : '○'}
          </span>
          <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-gray-200 p-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-colors">
            <Emoji char="⚙️" size={18} />
          </button>
        </div>
      </header>

      {/* 2행 (44px): 요약 | 🔍 | ⚡ | 균열/조사/돌파 or 📊점수 | 쟁점 — Phase3 이후만 */}
      {isLatePhase && (
        <div className="glass-surface-light inner-glow-subtle px-2.5 h-11 flex items-center gap-1.5 shrink-0">
          {/* 📋 요약 */}
          {!isDialoguePhase ? (
            <button
              onClick={onToggleInfo}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold active:scale-95 transition-all ${
                infoOpen
                  ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30 glow-amber'
                  : 'bg-white/5 text-gray-400 ring-1 ring-white/5 hover:ring-white/10 hover:text-gray-200'
              }`}
            >
              <Emoji char={infoOpen ? '✕' : '📋'} size={14} />
              요약
            </button>
          ) : (
            <div className="w-14" />
          )}

          {/* 🔍 조사 토큰 */}
          <button onClick={() => setShowResource('invest')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-amber-500/20 hover:bg-amber-500/5 active:scale-95 transition-all">
            <Emoji char="🔍" size={16} />
            <span className={`text-sm font-bold tabular-nums ${globalInvest === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalInvest}</span>
          </button>

          {/* ⚡ 스킬 포인트 */}
          <button onClick={() => setShowResource('skill')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] ring-1 ring-white/5 hover:ring-amber-500/20 hover:bg-amber-500/5 active:scale-95 transition-all">
            <Emoji char="⚡" size={16} />
            <span className={`text-sm font-bold tabular-nums ${globalSkill === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalSkill}</span>
          </button>

          <div className="flex-1" />

          {/* 균열/조사/돌파 준비도 칩 (심문 Phase) or 📊 점수 (그 외) */}
          {readinessState && isInterrogation ? (
            <div className="flex items-center gap-1">
              <ReadinessChip label="균열" value={readinessState.crackedDisputeCount + readinessState.resolvedDisputeCount} target={2} />
              <ReadinessChip label="조사" value={readinessState.investigationSuccessCount} target={2} />
              <ReadinessChip label="돌파" value={readinessState.resolvedDisputeCount + readinessState.fullCollapseCount + readinessState.confessionCount} target={1} />
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-500/5 ring-1 ring-indigo-500/10">
              <Emoji char="📊" size={14} />
              <span className="text-xs font-bold text-indigo-300 tabular-nums">{estimatedScore}</span>
            </div>
          )}

          {/* 쟁점 현황 */}
          {isInterrogation ? (
            <button
              onClick={() => setShowDisputeBoard(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 hover:bg-amber-500/20 text-xs font-semibold active:scale-95 transition-all"
            >
              쟁점
            </button>
          ) : (
            <div className="w-14" />
          )}
        </div>
      )}

      {/* 설정 패널 */}
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

      {/* 쟁점 현황 보드 */}
      {showDisputeBoard && (
        <Suspense fallback={null}>
          <DisputeBoard
            onClose={() => setShowDisputeBoard(false)}
            onSelectDispute={(disputeId, party) => {
              useGameStore.getState().setDisputeBoardAction({ disputeId, party })
              setShowDisputeBoard(false)
            }}
          />
        </Suspense>
      )}

      {/* 상태 전이 토스트 */}
      {isInterrogation && (
        <Suspense fallback={null}>
          <StateTransitionToast />
        </Suspense>
      )}

      {/* 게임 이벤트 모달 */}
      {isInterrogation && (
        <Suspense fallback={null}>
          <GameEventModal />
        </Suspense>
      )}

      {/* 증거 결과 토스트 */}
      {pendingEvidenceResult && (
        <Suspense fallback={null}>
          <EvidenceResultToast
            result={pendingEvidenceResult.type}
            evidenceName={pendingEvidenceResult.evidenceName}
            onDone={() => setPendingEvidenceResult(null)}
          />
        </Suspense>
      )}

      {/* 불충분 심리 경고 배너 */}
      {verdictMode === 'forced_incomplete' && (
        <Suspense fallback={null}>
          <ForcedVerdictBanner />
        </Suspense>
      )}

      {/* 나가기 확인 */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={() => setShowExitConfirm(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-xs animate-fade-in" onClick={e => e.stopPropagation()}>
            <p className="text-sm text-gray-200 mb-1 font-semibold">사건을 중단하시겠습니까?</p>
            <p className="text-xs text-gray-500 mb-4">현재 진행 상황은 저장되지 않습니다.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowExitConfirm(false)}
                className="flex-1 text-xs py-2 rounded-xl bg-gray-800 text-gray-400">계속하기</button>
              <button onClick={handleExit}
                className="flex-1 text-xs py-2 rounded-xl bg-red-700 text-white font-bold">나가기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
