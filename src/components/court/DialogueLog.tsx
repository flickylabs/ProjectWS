import { useState } from 'react'
import { useStore } from '../../store/useGameStore'
import DialogueEntry from './DialogueEntry'
import type { DialogueEntry as DialogueEntryType } from '../../types'
import { handleContradictionPursue } from '../../hooks/useActionDispatch'
import Emoji from '../common/Emoji'

interface Props {
  onTestimonyClick?: () => void
}

export default function DialogueLog({ onTestimonyClick }: Props) {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const llmTarget = useStore((s) => s.llmLoadingTarget)
  const caseData = useStore((s) => s.caseData)
  const [pendingContradiction, setPendingContradiction] = useState<NonNullable<DialogueEntryType['contradictionMeta']> | null>(null)

  const handleContradictionClick = (meta: NonNullable<DialogueEntryType['contradictionMeta']>) => {
    setPendingContradiction(meta)
  }

  const handleConfirmPursue = async () => {
    if (!pendingContradiction) return
    const { party, disputeId, previousClaim, currentClaim } = pendingContradiction
    setPendingContradiction(null)
    await handleContradictionPursue(party, disputeId, previousClaim, currentClaim)
  }

  const npcName = pendingContradiction && caseData
    ? (pendingContradiction.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)
    : ''

  return (
    <div className="px-3 py-2">
      {dialogueLog.length === 0 && !isLLMLoading && (
        <div className="text-center text-gray-600 text-sm py-20">
          사건이 시작되면 대화가 여기에 표시됩니다.
        </div>
      )}

      <div className="space-y-1">
        {dialogueLog.filter(e => !e.isHidden).map((entry, i) => (
          <DialogueEntry
            key={entry.id}
            entry={entry}
            animate={i === dialogueLog.length - 1}
            onTestimonyClick={onTestimonyClick}
            onContradictionClick={handleContradictionClick}
          />
        ))}
      </div>

      {isLLMLoading && (
        <div className={`flex items-center gap-2 my-2 px-3 py-2 ${llmTarget === 'b' ? 'justify-end' : ''}`}>
          <div className="gavel-loading" style={{ fontSize: 16 }}>⚖️</div>
          <span className="text-xs text-gray-500">응답 중...</span>
        </div>
      )}

      {/* 모순 추궁 확인 팝업 */}
      {pendingContradiction && (
        <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={() => setPendingContradiction(null)}>
          <div className="bg-gray-900 border border-amber-700/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-800">
              <Emoji char="⚡" size={20} />
              <h2 className="text-base font-bold text-amber-400">모순 추궁</h2>
            </div>

            {/* 이전 vs 현재 주장 */}
            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-400">
                {npcName}의 진술에서 모순이 발견되었습니다.
              </p>

              <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-3">
                <div className="text-[10px] text-gray-600 mb-1">이전 주장</div>
                <p className="text-xs text-gray-400 leading-relaxed">"{pendingContradiction.previousClaim}"</p>
              </div>

              <div className="flex justify-center">
                <span className="text-xs text-amber-500 font-bold">↕ 모순</span>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3">
                <div className="text-[10px] text-amber-600 mb-1">현재 주장</div>
                <p className="text-xs text-amber-200 leading-relaxed">"{pendingContradiction.currentClaim}"</p>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                이 모순을 추궁하면 거짓말 상태가 흔들리고, 핵심 진실에 더 가까워질 수 있습니다.
              </p>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={() => setPendingContradiction(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
              >
                넘어가기
              </button>
              <button
                onClick={handleConfirmPursue}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 text-gray-950 text-sm font-bold active:scale-95 hover:bg-amber-500 transition-all"
              >
                모순 추궁하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
