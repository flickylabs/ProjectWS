import type { ReactNode } from 'react'
import { useState } from 'react'
import TopBar from './TopBar'
import PartyStatusBar from '../court/PartyStatusBar'
import DialogueLog from '../court/DialogueLog'
import DisputeChecklist from '../info/DisputeChecklist'
import ClaimGraph from '../info/ClaimGraph'
import EvidenceBoard from '../info/EvidenceBoard'

interface Props {
  actionPanel?: ReactNode
}

type InfoTab = 'disputes' | 'claims' | 'evidence'

export default function CourtLayout({ actionPanel }: Props) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoTab, setInfoTab] = useState<InfoTab>('disputes')

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-gray-100 max-w-lg mx-auto relative">
      <TopBar />
      <PartyStatusBar />

      <div className="flex-1 overflow-hidden relative">
        <DialogueLog />

        {/* 정보 토글 버튼 */}
        <button
          onClick={() => setInfoOpen(!infoOpen)}
          className={`absolute top-2 right-2 z-10 px-2.5 py-1 text-xs rounded-lg transition-all ${
            infoOpen
              ? 'bg-amber-600 text-gray-950 font-bold'
              : 'bg-gray-800/80 backdrop-blur-sm text-gray-400 hover:text-white ring-1 ring-gray-700/50'
          }`}
        >
          {infoOpen ? '✕' : '📋 정보'}
        </button>

        {/* 정보 패널 — 하단 시트 슬라이드 */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 bg-gray-900/98 backdrop-blur-sm border-t border-gray-700/50 rounded-t-2xl transition-all duration-300 ${
            infoOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          style={{ maxHeight: '60vh' }}
        >
          {/* 드래그 핸들 */}
          <div className="flex justify-center py-1.5">
            <div className="w-10 h-1 bg-gray-700 rounded-full" />
          </div>

          {/* 탭 바 */}
          <div className="flex px-3 gap-1 pb-2">
            {([
              { id: 'disputes' as const, label: '쟁점 현황', icon: '⚡' },
              { id: 'claims' as const, label: '주장 그래프', icon: '💬' },
              { id: 'evidence' as const, label: '증거 보드', icon: '📄' },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInfoTab(tab.id)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  infoTab === tab.id
                    ? 'bg-amber-600/15 text-amber-400 ring-1 ring-amber-500/20'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* 내용 */}
          <div className="overflow-y-auto px-3 pb-3" style={{ maxHeight: 'calc(60vh - 70px)' }}>
            {infoTab === 'disputes' && <DisputeChecklist />}
            {infoTab === 'claims' && <ClaimGraph />}
            {infoTab === 'evidence' && <EvidenceBoard />}
          </div>
        </div>
      </div>

      {actionPanel && (
        <div className="border-t border-gray-800/60 bg-gray-900/95 backdrop-blur-sm px-3 py-2 shrink-0 max-h-[45vh] overflow-y-auto">
          {actionPanel}
        </div>
      )}
    </div>
  )
}
