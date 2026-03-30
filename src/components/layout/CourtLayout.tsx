import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/useGameStore'
import TopBar from './TopBar'
import PartyStatusBar from '../court/PartyStatusBar'
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

interface Props {
  actionPanel?: ReactNode
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

type InfoTab = 'disputes' | 'claims' | 'evidence'

export default function CourtLayout({ actionPanel, onDialogueTap, isDialoguePhase }: Props) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoTab, setInfoTab] = useState<InfoTab>('disputes')
  const [actionOpen, setActionOpen] = useState(true)
  const [showTestimony, setShowTestimony] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const dialogueLog = useGameStore((s) => s.dialogueLog)

  useEffect(() => {
    if (!isDialoguePhase) setActionOpen(true)
  }, [isDialoguePhase])

  // 새 메시지 시 스크롤 — 약간의 지연으로 레이아웃 안정 후 실행
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
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {showTestimony && <TestimonyModal onClose={() => setShowTestimony(false)} />}

      {/* 미니게임 모달 */}
      <MinigameOverlay />
      <InterjectionOverlay />
      <div className="flex items-center shrink-0">
        <div className="flex-1"><TopBar /></div>
        {!isDialoguePhase && (
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className={`shrink-0 px-2.5 py-1 text-xs rounded-lg mr-2 transition-all ${
              infoOpen ? 'bg-amber-600 text-gray-950 font-bold' : 'bg-gray-800/80 text-gray-400 hover:text-white ring-1 ring-gray-700/50'
            }`}
          >
            {infoOpen ? <Emoji char="✕" size={12} /> : <Emoji char="📋" size={12} />}
          </button>
        )}
      </div>
      <PartyStatusBar />

      {/* 채팅 + 사건 요약 오버레이 컨테이너 */}
      <div className="flex-1 min-h-0 relative">
        {/* 사건 요약 패널 — absolute 오버레이 (대화창 레이아웃 영향 없음) */}
        {!isDialoguePhase && infoOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 right-0 z-30 bg-gray-900/98 backdrop-blur-sm border-b border-gray-700/50 rounded-b-xl shadow-xl shadow-black/30 animate-fade-in"
            style={{ height: 280, display: 'flex', flexDirection: 'column' }}
          >
            {/* 탭 */}
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
            {/* 콘텐츠 — 고정 사이즈 내 스크롤 */}
            <div className="overflow-y-auto px-3 pb-2 flex-1 min-h-0">
              {infoTab === 'disputes' && <DisputeChecklist />}
              {infoTab === 'claims' && <ClaimGraph />}
              {infoTab === 'evidence' && <EvidenceBoard />}
            </div>
            {/* 접기 */}
            <button
              onClick={() => setInfoOpen(false)}
              className="shrink-0 w-full py-1.5 text-xs text-gray-500 hover:text-gray-300 border-t border-gray-800/50 bg-gray-900/50"
            >▲ 접기</button>
          </div>
        )}

        {/* 채팅 — 전체 영역 스크롤, 정보 패널과 독립 */}
        <div
          ref={chatRef}
          className="absolute inset-0 overflow-y-auto"
          onClick={handleChatClick}
        >
          <DialogueLog onTestimonyClick={() => setShowTestimony(true)} />
          <PhaseOverlay />
        </div>
      </div>

      {/* 하단 — 토스트(접이식) + 고정 패널 */}
      {actionPanel && (
        <div
          className="shrink-0 z-30"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)' }}
        >
          {isDialoguePhase ? (
            <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800/60 px-3 py-2">
              {actionPanel}
            </div>
          ) : actionOpen ? (
            <div className="bg-gray-900/98 backdrop-blur-sm border-t border-gray-700/50 relative">
              <div className="px-3 pt-2 pb-1">
                {actionPanel}
              </div>
              <div className="px-2 pb-1">
                <button onClick={() => setActionOpen(false)}
                  className="w-full text-xs py-1.5 rounded-xl bg-gray-800 text-gray-500 active:scale-95"
                >▼ 닫기</button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/95 border-t border-gray-800/60 px-2 py-1">
              <button onClick={() => setActionOpen(true)}
                className="w-full text-xs py-2 rounded-xl bg-amber-600/90 text-gray-950 font-bold shadow-lg shadow-amber-600/20 active:scale-95"
              ><Emoji char="⚖️" size={14} /> 행동 선택</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
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

/** 끼어들기 선택지 오버레이 */
function InterjectionOverlay() {
  const ij = useGameStore((s) => s.pendingInterjection)
  const caseData = useGameStore((s) => s.caseData)
  if (!ij || !caseData) return null

  const name = ij.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm pb-20 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 w-full max-w-sm animate-slide-up shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Emoji char="✋" size={20} />
          <span className="text-sm font-bold text-amber-400">{name}이 끼어들려 합니다</span>
        </div>
        <p className="text-xs text-gray-400 mb-1">"{ij.text}"</p>
        <p className="text-[10px] text-gray-600 mb-3">허용하면 추가 정보를 얻지만 권위가 하락합니다.</p>
        <div className="flex gap-2">
          <button onClick={allowInterjection}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-600/80 text-gray-950 active:scale-95">
            발언 허용
          </button>
          <button onClick={denyInterjection}
            className="flex-1 py-2.5 rounded-xl text-xs font-medium bg-gray-800 text-gray-400 active:scale-95">
            제지하기
          </button>
        </div>
      </div>
    </div>
  )
}

/** 미니게임 오버레이 — pendingMinigame이 있으면 모달 표시 */
function MinigameOverlay() {
  const mg = useGameStore((s) => s.pendingMinigame)
  const clearMg = useGameStore((s) => s.setPendingMinigame)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const caseData = useGameStore((s) => s.caseData)

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-amber-700/50 rounded-2xl p-5 w-[340px] shadow-2xl">
            <HeartbeatDetector onSuccess={handleSuccess} onFail={handleFail} onWatchAd={handleWatchAd} />
          </div>
        </div>
      )
    }

    if (minigameVariant === 'matching') {
      // clues [string, string, string] → pairs [string, string][]
      const pairs: [string, string][] = clues.map((clue, i) => [`단서 ${i + 1}`, clue])
      return (
        <MatchingPuzzle
          pairs={pairs}
          onSuccess={handleSuccess}
          onFail={handleFail}
          onWatchAd={handleWatchAd}
        />
      )
    }

    if (minigameVariant === 'word_scramble') {
      // 증거 이름을 글자 단위로 분해 (공백 제거, 6~10글자)
      const evDef = evidenceDefinitions.find(e => e.id === evidenceId)
      const evName = evDef?.name ?? '새로운증거확보'
      const chars = evName.replace(/\s+/g, '').split('')
      // 6~10글자로 조정
      const words = chars.length >= 6 ? chars.slice(0, 10) : (evName + '확보').replace(/\s+/g, '').split('').slice(0, 10)
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

  // evidence_depth → MatchingPuzzle
  if (mg.type === 'evidence_depth') {
    const { evidenceId } = mg
    const evDef = evidenceDefinitions.find((e) => e.id === evidenceId)
    const dispute = evDef ? caseData?.disputes.find((d) => d.id === evDef.proves[0]) : undefined

    // 3번째 조사 subAction
    const KEY_ORDER = ['request_original', 'restore_context', 'check_edits'] as const
    const state = evidenceStates[evidenceId]
    const nextKey = KEY_ORDER.find((k) => !state?.investigatedActions?.includes(k)) ?? 'check_edits'

    const pairs: [string, string][] = [
      ['단서', dispute?.name?.slice(0, 6) ?? '쟁점'],
      ['증거', evDef?.name?.slice(0, 6) ?? '증거물'],
      ['핵심', '조사완료'],
    ]

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

    return (
      <MatchingPuzzle
        pairs={pairs}
        onSuccess={handleSuccess}
        onFail={handleFail}
        onWatchAd={handleWatchAd}
      />
    )
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
    const chars = text.replace(/\s+/g, '').split('')
    const words = chars.length >= 6 ? chars.slice(0, 10) : (text + '모순발견').replace(/\s+/g, '').split('').slice(0, 10)

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
