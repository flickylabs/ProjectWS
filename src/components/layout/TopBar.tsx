import { useState, useEffect, lazy, Suspense } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import { Phase } from '../../types'
import _PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'
import Emoji from '../common/Emoji'
import { checkConnection } from '../../engine/llmClient'
import { MAX_TURNS } from '../../utils/constants'

import { StateTransitionToast } from '../discovery/StateTransitionFeedback'

const DisputeBoard = lazy(() => import('../discovery/DisputeBoard'))
const GameEventModal = lazy(() => import('../discovery/GameEventModal'))
const PerkChoiceModal = lazy(() => import('../discovery/PerkChoiceModal'))
const TransitionChoiceModal = lazy(() => import('../discovery/TransitionChoiceModal'))
const EvidenceResultToast = lazy(() => import('../discovery/EvidenceResultToast'))
const ForcedVerdictBanner = lazy(() => import('../discovery/ForcedVerdictBanner'))

/** 판결 준비도 칩 — 달성/미달성 시각 표시 */
function ReadinessChip({ label, value, target }: { label: string; value: number; target: number }) {
  const met = value >= target
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
      met ? 'bg-emerald-900/50 text-emerald-400' : 'bg-gray-800/60 text-gray-500'
    }`}>
      {label} {value}/{target}
    </span>
  )
}

export default function TopBar() {
  const [showSettings, setShowSettings] = useState(false)
  const [aiStatus, setAiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showDisputeBoard, setShowDisputeBoard] = useState(false)

  const globalInvest = useStore((s) => s.resources.investigationTokens)
  const globalSkill = useStore((s) => s.resources.skillPoints)
  const currentPhase = useStore((s) => s.currentPhase)
  const turnCount = useStore((s) => s.turnCount)
  const processMetrics = useStore((s) => s.processMetrics)
  const readinessState = useStore((s) => s.readinessState)
  const verdictMode = useStore((s) => s.verdictMode)
  const pendingEvidenceResult = useStore((s) => s.pendingEvidenceResult)
  const setPendingEvidenceResult = useStore((s) => s.setPendingEvidenceResult)
  const recentlyEmergedDisputeId = useStore((s) => s.recentlyEmergedDisputeId)

  // Phase 2(심문) 이후 단계 여부. 활성 체계: 0 → 1 → 2 → 3a → 3b → R
  const isLatePhase = currentPhase === Phase.Interrogation
    || currentPhase === Phase.Mediation
    || currentPhase === Phase.Verdict
    || currentPhase === Phase.Result
  const isInterrogation = currentPhase === Phase.Interrogation

  // 예상 점수 (기존 호환) 또는 readinessScore
  const estimatedScore = readinessState
    ? readinessState.readinessScore
    : Math.min(100, processMetrics.liesCollapsed * 10 + processMetrics.evidenceDiscovered * 8 + processMetrics.evidenceEffective * 5 + processMetrics.freeQuestionsRelevant * 3)

  const remainingTurns = MAX_TURNS - turnCount

  // AI 연결 상태 주기적 체크 (30초마다)
  useEffect(() => {
    const check = () => checkConnection().then(r => setAiStatus(r.connected ? 'connected' : 'disconnected'))
    check()
    const timer = setInterval(check, 30_000)
    return () => clearInterval(timer)
  }, [])

  const handleExit = () => {
    // 게임 상태 초기화 → 홈으로 돌아감
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(Phase.Briefing)
    useGameStore.getState().clearDialogue()
  }

  return (
    <>
      {/* 1행: 나가기 / 수치 4종 / AI + 설정 */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/60 px-3 h-9 flex items-center shrink-0">
        <div className="flex items-center justify-between w-full">
          <button onClick={() => setShowExitConfirm(true)}
            className="text-gray-500 hover:text-white text-xs mr-2 shrink-0">
            ← 나가기
          </button>
          {isLatePhase && (
            <div className="flex items-center gap-3">
              {/* 판결 준비도 (readiness 있으면 3칸 요약, 없으면 기존 점수) */}
              {readinessState && isInterrogation ? (
                <div className="flex items-center gap-2">
                  <ReadinessChip label="균열" value={readinessState.crackedDisputeCount + readinessState.resolvedDisputeCount} target={2} />
                  <ReadinessChip label="조사" value={readinessState.investigationSuccessCount} target={2} />
                  <ReadinessChip label="돌파" value={readinessState.resolvedDisputeCount + readinessState.fullCollapseCount + readinessState.confessionCount} target={1} />
                </div>
              ) : (
                <span className="text-xs text-indigo-300/80"><Emoji char="📊" size={14} /> {estimatedScore}</span>
              )}
              <span className="flex items-center gap-1 text-xs">
                <Emoji char="🔍" size={16} /><span className={`font-bold ${globalInvest === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalInvest}</span>
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Emoji char="⚡" size={16} /><span className={`font-bold ${globalSkill === 0 ? 'text-red-400' : 'text-amber-400'}`}>{globalSkill}</span>
              </span>
              <span className={`text-xs font-semibold ${remainingTurns <= 5 ? 'text-red-400' : 'text-gray-400'}`}>
                {turnCount}/{MAX_TURNS}
              </span>
              {/* 쟁점 현황 보드 버튼 — emergence 시 깜빡 강조 */}
              {isInterrogation && (
                <button
                  onClick={() => setShowDisputeBoard(true)}
                  className={`text-[10px] px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-400 hover:bg-amber-900/60 font-semibold transition-colors${recentlyEmergedDisputeId ? ' pc-hotbar-slot-pulse' : ''}`}
                >
                  쟁점
                </button>
              )}
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            <span className={`text-[10px] ${
              aiStatus === 'connected' ? 'text-emerald-500/70' :
              aiStatus === 'disconnected' ? 'text-red-400/70' :
              'text-gray-600'
            }`}>
              {aiStatus === 'connected' ? '● AI' :
               aiStatus === 'disconnected' ? '● 연결끊김' :
               '○ 확인중'}
            </span>
            <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-white"><Emoji char="⚙️" size={16} /></button>
          </div>
        </div>
      </header>

      {/* 2행: PartyStatusBar에서 통합 표시 */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

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

      {/* 게임 이벤트 모달 (모순/끼어들기/감정폭발/새쟁점) */}
      {isInterrogation && (
        <Suspense fallback={null}>
          <GameEventModal />
        </Suspense>
      )}
      {isInterrogation && (
        <Suspense fallback={null}>
          <PerkChoiceModal />
        </Suspense>
      )}
      {isInterrogation && (
        <Suspense fallback={null}>
          <TransitionChoiceModal />
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
