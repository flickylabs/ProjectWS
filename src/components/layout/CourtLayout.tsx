import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/useGameStore'
import CourtHeader from './CourtHeader'
import DialogueLog from '../court/DialogueLog'
import TestimonyModal from '../court/TestimonyModal'
import MemoryPuzzle from '../minigame/MemoryPuzzle'
import HeartbeatDetector from '../minigame/HeartbeatDetector'
import MatchingPuzzle from '../minigame/MatchingPuzzle'
import WordScramble from '../minigame/WordScramble'
import AdCountdown from '../minigame/AdCountdown'
import { actuallyDiscoverEvidence, applyLieCollapseSuccess, applyLieCollapseFail, applyContradictionSuccess, applyContradictionFail, allowInterjection, denyInterjection } from '../../hooks/useActionDispatch'
import DisputeChecklist from '../info/DisputeChecklist'
import ClaimGraph from '../info/ClaimGraph'
import EvidenceBoard from '../info/EvidenceBoard'
import Emoji from '../common/Emoji'
import {
  TruthConfrontationModal,
  JudgmentConflictModal,
  DisputeEmergenceModal,
  EmotionalSlipModal,
} from '../discovery'

interface Props {
  actionPanel?: ReactNode
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

type InfoTab = 'disputes' | 'claims' | 'evidence'

export default function CourtLayout({ actionPanel, onDialogueTap, isDialoguePhase }: Props) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoTab, setInfoTab] = useState<InfoTab>('disputes')
  const [showTestimony, setShowTestimony] = useState(false)
  const [dockOpen, setDockOpen] = useState(true)
  const chatRef = useRef<HTMLDivElement>(null)
  const dialogueLog = useGameStore((s) => s.dialogueLog)

  // 대화 Phase가 아닐 때 독 자동 열림
  useEffect(() => {
    if (!isDialoguePhase) setDockOpen(true)
  }, [isDialoguePhase])

  // 새 메시지 시 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = chatRef.current
      if (el) el.scrollTop = el.scrollHeight
    }, 50)
    return () => clearTimeout(timer)
  }, [dialogueLog.length])

  const handleChatClick = useCallback(() => {
    if (isDialoguePhase) onDialogueTap?.()
  }, [isDialoguePhase, onDialogueTap])

  return (
    <div
      className="h-[100dvh] flex flex-col bg-gray-950 text-gray-100 max-w-lg mx-auto court-bg"
    >
      {showTestimony && <TestimonyModal onClose={() => setShowTestimony(false)} />}

      {/* Discovery 모달들 */}
      <DiscoveryOverlay />

      {/* 미니게임 모달 */}
      <MinigameOverlay />
      <InterjectionOverlay />

      {/* 헤더 (1행: 캐릭터/단계, 2행: 요약/리소스/점수/쟁점) */}
      <CourtHeader
        isDialoguePhase={isDialoguePhase}
        onToggleInfo={() => setInfoOpen(!infoOpen)}
        infoOpen={infoOpen}
      />

      {/* 채팅 + 사건 요약 오버레이 컨테이너 */}
      <div className="flex-1 min-h-0 relative chat-fade-top">
        {/* 사건 요약 패널 — absolute 오버레이 */}
        {!isDialoguePhase && infoOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 right-0 z-30 bg-gray-900/98 backdrop-blur-sm border-b border-gray-700/50 rounded-b-xl shadow-xl shadow-black/30 animate-fade-in"
            style={{ height: 280, display: 'flex', flexDirection: 'column' }}
          >
            <div className="flex px-3 gap-1 py-2 shrink-0">
              {([
                { id: 'disputes' as const, label: '쟁점', icon: '⚡' },
                { id: 'claims' as const, label: '주장', icon: '💬' },
                { id: 'evidence' as const, label: '증거', icon: '📄' },
              ]).map(tab => (
                <button key={tab.id} onClick={() => setInfoTab(tab.id)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    infoTab === tab.id
                      ? 'bg-amber-600/15 text-amber-400 ring-1 ring-amber-500/20'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                ><Emoji char={tab.icon} size={12} /> {tab.label}</button>
              ))}
            </div>
            <div className="overflow-y-auto px-3 pb-2 flex-1 min-h-0">
              {infoTab === 'disputes' && <DisputeChecklist />}
              {infoTab === 'claims' && <ClaimGraph />}
              {infoTab === 'evidence' && <EvidenceBoard />}
            </div>
            <button
              onClick={() => setInfoOpen(false)}
              className="shrink-0 w-full py-1.5 text-xs text-gray-500 hover:text-gray-300 border-t border-gray-800/50 bg-gray-900/50"
            >▲ 접기</button>
          </div>
        )}

        {/* 채팅 — 전체 영역 스크롤 */}
        <div
          ref={chatRef}
          className="absolute inset-0 overflow-y-auto"
          onClick={handleChatClick}
        >
          <DialogueLog onTestimonyClick={() => setShowTestimony(true)} />
          <PhaseOverlay />
        </div>
      </div>

      {/* 하단 ActionDock — 접기/펼치기 */}
      {actionPanel && (
        <div
          className="shrink-0 z-30"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)' }}
        >
          {dockOpen ? (
            <div className="relative">
              {/* 접기 핸들 — 독 위에 절대 위치로 떠있음, 완전 투명 */}
              <button onClick={() => setDockOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 -top-3 z-20 px-6 h-3 flex items-center justify-center active:scale-95">
                <svg width="20" height="3" viewBox="0 0 20 3" className="text-gray-600 hover:text-gray-400 transition-colors">
                  <path d="M2 0.5l8 2 8-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
              <div className="glass-surface px-3 pt-2 pb-1.5 border-t border-amber-500/25 ring-1 ring-white/[0.04] rounded-t-xl dock-border-glow">
                {actionPanel}
              </div>
            </div>
          ) : (
            <div className="glass-surface border-t border-amber-500/20 px-3 py-1.5">
              <button onClick={() => setDockOpen(true)}
                className="w-full py-2.5 rounded-xl bg-amber-600/90 text-gray-950 font-bold text-sm shadow-lg shadow-amber-600/20 active:scale-95 flex items-center justify-center gap-2">
                <Emoji char="⚖️" size={16} /> 행동 선택
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** Discovery 모달 오버레이 — pendingXxx 상태에 따라 적절한 모달 표시 */
function DiscoveryOverlay() {
  const discovery = useGameStore((s) => s.discovery)

  // 우선순위: 감정실수 > 쟁점발현 > 진실공방 > 판단충돌
  if (discovery.pendingSlip) return <EmotionalSlipModal />
  if (discovery.pendingEmergence) return <DisputeEmergenceModal />
  if (discovery.pendingConfrontation) return <TruthConfrontationModal />
  if (discovery.pendingConflict) return <JudgmentConflictModal />

  return null
}

function PhaseOverlay() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const [show, setShow] = useState(false)
  const [label, setLabel] = useState('')
  const prevRef = useRef(currentPhase)

  const LABELS: Record<string, string> = {
    phase1: '초기 진술', phase2: '반박', phase3: '심문 개시',
    phase4: '증거 심리', phase5: '재심문', phase6: '중재', phase7: '판결',
  }

  useEffect(() => {
    if (currentPhase !== prevRef.current) {
      prevRef.current = currentPhase
      const l = LABELS[currentPhase]
      if (l) {
        setLabel(l)
        setShow(true)
        const t = setTimeout(() => setShow(false), 1500)
        return () => clearTimeout(t)
      }
    }
  }, [currentPhase])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none bg-gray-950/30">
      <div className="text-4xl font-black text-amber-400/50 animate-fade-in tracking-wider">{label}</div>
    </div>
  )
}

/** 끼어들기 선택지 — 말풍선 형태 + 버튼 */
function InterjectionOverlay() {
  const ij = useGameStore((s) => s.pendingInterjection)
  const caseData = useGameStore((s) => s.caseData)
  const [showConfirm, setShowConfirm] = useState(false)
  const [processing, setProcessing] = useState(false)
  if (!ij || !caseData) return null

  const isA = ij.party === 'a'
  const name = isA ? caseData.duo.partyA.name : caseData.duo.partyB.name

  const handleAllow = () => {
    if (processing) return
    setProcessing(true)
    void allowInterjection()
  }
  const handleDeny = () => {
    if (processing) return
    setProcessing(true)
    denyInterjection()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-sm animate-fade-in shadow-2xl">
        {!showConfirm ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Emoji char="✋" size={24} />
              <div>
                <span className={`text-sm font-bold ${isA ? 'text-blue-400' : 'text-rose-400'}`}>{name}</span>
                <span className="text-sm text-gray-400">이 끼어들려 합니다</span>
              </div>
            </div>
            <div className={`border rounded-xl px-3.5 py-2.5 mb-4 ${isA ? 'bg-blue-950/30 border-blue-800/30' : 'bg-rose-950/30 border-rose-800/30'}`}>
              <p className="text-sm text-gray-200 leading-relaxed">"{ij.text}"</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { if (!processing) setShowConfirm(true) }} disabled={processing}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95 disabled:opacity-50">
                발언 허용
              </button>
              <button onClick={handleDeny} disabled={processing}
                className="flex-1 py-2.5 rounded-xl text-xs bg-gray-800 text-gray-400 active:scale-95 disabled:opacity-50">
                제지하기
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-3">
              <Emoji char="⚠️" size={28} />
            </div>
            <p className="text-sm text-gray-200 font-semibold text-center mb-1">정말 허용하시겠습니까?</p>
            <p className="text-xs text-amber-400/80 text-center mb-4">추가 정보를 얻을 수 있지만,<br />재판관의 <span className="font-bold">권위가 소폭 하락</span>합니다.</p>
            <div className="flex gap-2">
              <button onClick={() => { if (!processing) setShowConfirm(false) }} disabled={processing}
                className="flex-1 py-2.5 rounded-xl text-xs bg-gray-800 text-gray-400 active:scale-95 disabled:opacity-50">돌아가기</button>
              <button onClick={handleAllow} disabled={processing}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95 disabled:opacity-50">허용</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/** 미니게임 오버레이 — pendingMinigame이 있으면 모달 표시 */
/** 증거/쟁점명을 단어 단위로 분해 (4~7단어). 띄어쓰기 기준. */
function splitToWords(text: string): string[] {
  let words = text.split(/\s+/).filter(w => w.length > 0)
  if (words.length > 7) words = words.slice(0, 7)
  while (words.length < 4) words.push('확인')
  return words
}

function MinigameOverlay() {
  const mg = useGameStore((s) => s.pendingMinigame)
  const clearMg = useGameStore((s) => s.setPendingMinigame)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const caseData = useGameStore((s) => s.caseData)
  const [chosenMethod, setChosenMethod] = useState<'minigame' | null>(null)

  // 광고 카운트다운 상태: null이면 비활성, 함수이면 완료 시 실행할 성공 콜백
  const [adSuccessCallback, setAdSuccessCallback] = useState<(() => void) | null>(null)

  // 광고 카운트다운 요청 — 성공 콜백을 미리 저장
  const showAdCountdown = (successFn: () => void) => {
    setAdSuccessCallback(() => successFn)
  }

  const handleAdComplete = () => {
    const cb = adSuccessCallback
    setAdSuccessCallback(null)
    cb?.()
  }

  const handleAdCancel = () => {
    setAdSuccessCallback(null)
  }

  // 광고 카운트다운 중이면 최상위에 오버레이
  if (adSuccessCallback !== null) {
    return <AdCountdown onComplete={handleAdComplete} onCancel={handleAdCancel} />
  }

  if (!mg) return null

  if (mg.type === 'evidence_discovery') {
    const { evidenceId, clues, minigameVariant } = mg

    const handleSuccess = () => {
      actuallyDiscoverEvidence(evidenceId)
      clearMg(null)
    }
    const handleFail = () => clearMg(null)
    const handleWatchAd = () => showAdCountdown(handleSuccess)

    if (minigameVariant === 'heartbeat') {
      return (
        <HeartbeatDetector onSuccess={handleSuccess} onFail={handleFail} onWatchAd={handleWatchAd} />
      )
    }

    if (minigameVariant === 'matching') {
      return (
        <MatchingPuzzle
          onSuccess={handleSuccess}
          onFail={handleFail}
          onWatchAd={handleWatchAd}
        />
      )
    }

    if (minigameVariant === 'word_scramble') {
      // 증거 이름을 글자 단위로 분해 (공백 제거, 6~10글자)
      const evDef = evidenceDefinitions.find(e => e.id === evidenceId)
      const evName = evDef?.name ?? '새로운 증거 확보'
      const words = splitToWords(evName)
      return (
        <WordScramble
          words={words}
          onSuccess={handleSuccess}
          onFail={handleFail}
          onWatchAd={handleWatchAd}
        />
      )
    }

    // variant === 'memory' (기본값)
    return (
      <MemoryPuzzle
        clues={clues}
        onSuccess={handleSuccess}
        onFail={handleFail}
        onWatchAd={handleWatchAd}
      />
    )
  }

  // evidence_depth → 단계별 미니게임 + 선택지
  if (mg.type === 'evidence_depth') {
    const { evidenceId, depth } = mg
    const evDef = evidenceDefinitions.find((e) => e.id === evidenceId)

    const KEY_ORDER = ['request_original', 'restore_context', 'check_edits'] as const
    const evState = evidenceStates[evidenceId]
    const nextKey = KEY_ORDER.find((k) => !evState?.investigatedActions?.includes(k)) ?? 'check_edits'

    const handleSuccess = () => {
      const { investigateEvidence, addDialogue, turnCount } = useGameStore.getState()
      const result = investigateEvidence(evidenceId, nextKey)
      if (result) {
        addDialogue({ speaker: 'system', text: `🔍 ${result}`, relatedDisputes: evDef?.proves ?? [], turn: turnCount })
      }
      clearMg(null)
    }
    const handleFail = () => {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '조사가 실패했다. 결정적 단서를 놓쳤다.',
        relatedDisputes: evDef?.proves ?? [],
        turn: useGameStore.getState().turnCount,
      })
      clearMg(null)
    }
    const handleWatchAd = () => showAdCountdown(handleSuccess)

    // 선택지 화면: 미니게임 / 광고 / 아이템(=즉시 성공) 택1
    if (!chosenMethod) {
      const depthLabel = depth === 1 ? '1단계: 원본 확보' : depth === 2 ? '2단계: 맥락 복원' : '3단계: 편집 검증'
      const miniLabel = depth === 1 ? '하트 맞추기' : depth === 2 ? '그림 짝 맞추기' : '글자 순서 맞추기'
      return (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-6"
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="text-center mb-6">
            <Emoji char="🔍" size={48} />
            <div className="text-lg font-bold text-amber-400 mt-3">{depthLabel}</div>
            <div className="text-xs text-gray-500 mt-1">"{evDef?.name ?? '증거'}" 조사</div>
          </div>
          <div className="w-full max-w-xs space-y-3">
            <button onClick={() => setChosenMethod('minigame')}
              className="w-full py-3.5 rounded-2xl text-sm font-bold bg-amber-600 text-gray-950 active:scale-95">
              🎮 {miniLabel} 미니게임
            </button>
            <button onClick={() => { setChosenMethod(null); handleWatchAd() }}
              className="w-full py-3.5 rounded-2xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 active:scale-95">
              📺 광고 보기
            </button>
            <button onClick={() => { setChosenMethod(null); handleSuccess() }}
              className="w-full py-3.5 rounded-2xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 active:scale-95">
              🔍 조사 토큰 사용 (즉시)
            </button>
            <button onClick={() => clearMg(null)}
              className="w-full py-2 text-xs text-gray-600">
              취소
            </button>
          </div>
        </div>
      )
    }

    // 미니게임 실행 — depth별 분기
    // 1단계: 하트 맞추기, 2단계: 그림 짝 맞추기, 3단계: 글자 순서 맞추기
    if (depth === 1) {
      return <HeartbeatDetector onSuccess={() => { setChosenMethod(null); handleSuccess() }} onFail={() => { setChosenMethod(null); handleFail() }} onWatchAd={() => { setChosenMethod(null); handleWatchAd() }} />
    }
    if (depth === 2) {
      return <MatchingPuzzle onSuccess={() => { setChosenMethod(null); handleSuccess() }} onFail={() => { setChosenMethod(null); handleFail() }} onWatchAd={() => { setChosenMethod(null); handleWatchAd() }} />
    }
    // depth === 3: 글자 순서 맞추기
    const evName3 = evDef?.name ?? '증거 조사'
    const words3 = splitToWords(evName3)
    return <WordScramble words={words3} onSuccess={() => { setChosenMethod(null); handleSuccess() }} onFail={() => { setChosenMethod(null); handleFail() }} onWatchAd={() => { setChosenMethod(null); handleWatchAd() }} />
  }

  // lie_collapse → HeartbeatDetector
  if (mg.type === 'lie_collapse') {
    const { disputeId, party } = mg

    const handleSuccess = () => {
      applyLieCollapseSuccess(disputeId, party)
      clearMg(null)
    }
    const handleFail = () => {
      applyLieCollapseFail(disputeId)
      clearMg(null)
    }
    const handleWatchAd = () => showAdCountdown(handleSuccess)

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-900 border border-amber-700/50 rounded-2xl p-5 w-[340px] shadow-2xl">
          <HeartbeatDetector onSuccess={handleSuccess} onFail={handleFail} onWatchAd={handleWatchAd} />
        </div>
      </div>
    )
  }

  // contradiction → WordScramble
  if (mg.type === 'contradiction') {
    const { text, disputeId, target } = mg
    const words = splitToWords(text)

    const handleSuccess = () => {
      applyContradictionSuccess(disputeId, target)
      clearMg(null)
    }
    const handleFail = () => {
      applyContradictionFail(disputeId)
      clearMg(null)
    }
    const handleWatchAd = () => showAdCountdown(handleSuccess)

    return (
      <WordScramble
        words={words}
        onSuccess={handleSuccess}
        onFail={handleFail}
        onWatchAd={handleWatchAd}
      />
    )
  }

  return null
}
