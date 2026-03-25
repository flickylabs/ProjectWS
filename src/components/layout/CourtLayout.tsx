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

        <button
          onClick={() => setInfoOpen(!infoOpen)}
          className="absolute top-2 right-2 bg-gray-800/90 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-gray-400 hover:text-white transition-colors z-10"
        >
          {infoOpen ? '✕ 닫기' : '📋 정보'}
        </button>

        {infoOpen && (
          <div className="absolute inset-0 bg-gray-950/95 z-20 flex flex-col overflow-hidden">
            <div className="flex border-b border-gray-800">
              {([
                { id: 'disputes' as const, label: '쟁점' },
                { id: 'claims' as const, label: '주장' },
                { id: 'evidence' as const, label: '증거' },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInfoTab(tab.id)}
                  className={`flex-1 py-2 text-xs font-semibold transition-colors ${
                    infoTab === tab.id ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {infoTab === 'disputes' && <DisputeChecklist />}
              {infoTab === 'claims' && <ClaimGraph />}
              {infoTab === 'evidence' && <EvidenceBoard />}
            </div>
          </div>
        )}
      </div>

      {actionPanel && (
        <div className="border-t border-gray-800 bg-gray-900 px-3 py-2 shrink-0 max-h-[45vh] overflow-y-auto">
          {actionPanel}
        </div>
      )}
    </div>
  )
}
