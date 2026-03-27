import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/useGameStore'
import TopBar from './TopBar'
import PartyStatusBar from '../court/PartyStatusBar'
import DialogueLog from '../court/DialogueLog'
import TestimonyModal from '../court/TestimonyModal'
import DisputeChecklist from '../info/DisputeChecklist'
import ClaimGraph from '../info/ClaimGraph'
import EvidenceBoard from '../info/EvidenceBoard'

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
      <div className="flex items-center shrink-0">
        <div className="flex-1"><TopBar /></div>
        {!isDialoguePhase && (
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className={`shrink-0 px-2.5 py-1 text-xs rounded-lg mr-2 transition-all ${
              infoOpen ? 'bg-amber-600 text-gray-950 font-bold' : 'bg-gray-800/80 text-gray-400 hover:text-white ring-1 ring-gray-700/50'
            }`}
          >
            {infoOpen ? '✕' : '📋'}
          </button>
        )}
      </div>
      <PartyStatusBar />

      {/* 채팅 — flex-1로 남은 공간 전부 차지, 직접 스크롤 */}
      <div
        ref={chatRef}
        className="flex-1 min-h-0 overflow-y-auto relative"
        onClick={handleChatClick}
      >
        <DialogueLog onTestimonyClick={() => setShowTestimony(true)} />

        {/* 정보 버튼 */}
        {/* 정보 버튼은 TopBar 옆에 렌더링 — 아래 별도 처리 */}

        {/* 정보 패널 */}
        {!isDialoguePhase && infoOpen && (
          <div onClick={(e) => e.stopPropagation()}
            className="sticky bottom-0 bg-gray-900/98 backdrop-blur-sm border-t border-gray-700/50 rounded-t-2xl z-20"
            style={{ maxHeight: '55vh' }}
          >
            <div className="flex justify-center py-1.5"><div className="w-10 h-1 bg-gray-700 rounded-full" /></div>
            <div className="flex px-3 gap-1 pb-2">
              {([
                { id: 'disputes' as const, label: '쟁점', icon: '⚡' },
                { id: 'claims' as const, label: '주장', icon: '💬' },
                { id: 'evidence' as const, label: '증거', icon: '📄' },
              ]).map(tab => (
                <button key={tab.id} onClick={() => setInfoTab(tab.id)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${infoTab === tab.id ? 'bg-amber-600/15 text-amber-400 ring-1 ring-amber-500/20' : 'text-gray-500'}`}
                >{tab.icon} {tab.label}</button>
              ))}
            </div>
            <div className="overflow-y-auto px-3 pb-3" style={{ maxHeight: 'calc(55vh - 60px)' }}>
              {infoTab === 'disputes' && <DisputeChecklist />}
              {infoTab === 'claims' && <ClaimGraph />}
              {infoTab === 'evidence' && <EvidenceBoard />}
            </div>
          </div>
        )}

        <PhaseOverlay />
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
              >⚖️ 행동 선택</button>
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
