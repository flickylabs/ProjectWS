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
import { actuallyDiscoverEvidence } from '../../hooks/useActionDispatch'
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

/** 미니게임 오버레이 — pendingMinigame이 있으면 모달 표시 */
function MinigameOverlay() {
  const mg = useGameStore((s) => s.pendingMinigame)
  const clearMg = useGameStore((s) => s.setPendingMinigame)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)

  if (!mg) return null

  if (mg.type === 'evidence_discovery') {
    const { evidenceId, clues, minigameVariant } = mg

    const handleSuccess = () => {
      actuallyDiscoverEvidence(evidenceId)
      clearMg(null)
    }
    const handleFail = () => clearMg(null)
    const handleWatchAd = () => {
      // 광고 보기 → 즉시 성공
      actuallyDiscoverEvidence(evidenceId)
      clearMg(null)
    }

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
      // 증거 이름 기반 문장을 5~7단어로 구성
      const evDef = evidenceDefinitions.find(e => e.id === evidenceId)
      const evName = evDef?.name ?? '새로운 증거'
      const nameWords = evName.split(/\s+/).filter(w => w.length > 0)

      let words: string[]
      if (nameWords.length >= 5) {
        // 이름 자체가 충분히 길면 그대로 사용 (최대 7개)
        words = nameWords.slice(0, 7)
      } else {
        // 이름이 짧으면 문장으로 확장: "새로운 증거 [이름] 확보"
        words = ['새로운', '증거', ...nameWords, '확보']
        if (words.length < 5) words.splice(2, 0, '핵심')
      }
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

  // TODO: evidence_depth → MatchingPuzzle
  // TODO: lie_collapse → HeartbeatDetector
  // TODO: contradiction → WordScramble

  return null
}
