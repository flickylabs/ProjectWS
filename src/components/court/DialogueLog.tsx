import { useEffect, useState } from 'react'
import { useStore } from '../../store/useGameStore'
import DialogueEntry from './DialogueEntry'
import type { DialogueEntry as DialogueEntryType } from '../../types'
import { handleContradictionPursue } from '../../hooks/useActionDispatch'
import Emoji from '../common/Emoji'
import { hasContradictionComparison } from '../../utils/contradiction'

interface Props {
  onTestimonyClick?: () => void
}

type PendingContradiction = {
  entryId: string
  meta: NonNullable<DialogueEntryType['contradictionMeta']>
}

const usedContradictions = new Set<string>()

export default function DialogueLog({ onTestimonyClick }: Props) {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const llmTarget = useStore((s) => s.llmLoadingTarget)
  const caseData = useStore((s) => s.caseData)
  const [pendingContradiction, setPendingContradiction] = useState<PendingContradiction | null>(null)
  const [, setContradictionVersion] = useState(0)

  useEffect(() => {
    usedContradictions.clear()
  }, [caseData?.caseId])

  useEffect(() => {
    if (dialogueLog.length === 0) usedContradictions.clear()
  }, [dialogueLog.length])

  const handleContradictionClick = (entryId: string, meta: NonNullable<DialogueEntryType['contradictionMeta']>) => {
    if (usedContradictions.has(entryId)) return
    if (!hasContradictionComparison(meta)) return
    setPendingContradiction({ entryId, meta })
  }

  const handleConfirmPursue = async () => {
    if (!pendingContradiction) return
    const { entryId, meta } = pendingContradiction
    const { party, disputeId, previousClaim, currentClaim } = meta
    usedContradictions.add(entryId)
    setContradictionVersion((value) => value + 1)
    setPendingContradiction(null)
    await handleContradictionPursue(party, disputeId, previousClaim, currentClaim)
  }

  const npcName = pendingContradiction && caseData
    ? (pendingContradiction.meta.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)
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
            contradictionUsed={usedContradictions.has(entry.id)}
          />
        ))}
      </div>

      {isLLMLoading && (
        <div className={`flex items-center gap-2 my-2 px-3 py-2 ${llmTarget === 'b' ? 'justify-end' : ''}`}>
          <div className="gavel-loading" style={{ fontSize: 16 }}>⚖</div>
          <span className="text-xs text-gray-500">응답 중...</span>
        </div>
      )}

      {pendingContradiction && (
        <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={() => setPendingContradiction(null)}>
          <div className="bg-gray-900 border border-amber-700/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-800">
              <Emoji char="⚡" size={20} />
              <h2 className="text-base font-bold text-amber-400">모순 추궁</h2>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-400">
                {npcName}의 발언에서 바로 추궁할 수 있는 불일치가 발견되었습니다.
              </p>

              <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-3">
                <div className="text-[10px] text-gray-500 mb-1">{pendingContradiction.meta.previousLabel ?? '이전 발언 A'}</div>
                <p className="text-xs text-gray-400 leading-relaxed">"{pendingContradiction.meta.previousClaim}"</p>
              </div>

              <div className="flex justify-center">
                <span className="text-xs text-amber-500 font-bold">비교</span>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3">
                <div className="text-[10px] text-amber-600 mb-1">{pendingContradiction.meta.currentLabel ?? '현재 발언 B'}</div>
                <p className="text-xs text-amber-200 leading-relaxed">"{pendingContradiction.meta.currentClaim}"</p>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {pendingContradiction.meta.reason ?? '두 내용이 같은 사실관계를 서로 다르게 설명하고 있어 추가 확인이 필요합니다.'}
              </p>
            </div>

            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={() => setPendingContradiction(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
              >
                보류
              </button>
              <button
                onClick={handleConfirmPursue}
                className="flex-[1.7] py-3 rounded-xl bg-amber-500 text-gray-950 text-sm font-black active:scale-95 hover:bg-amber-400 transition-all shadow-lg shadow-amber-900/30"
              >
                추궁하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
