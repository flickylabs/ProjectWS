/**
 * 판단 충돌 모달 — 기존 판단과 새 정보가 충돌할 때 수정 여부 결정
 */
import { useStore } from '../../store/useGameStore'
import type { TruthJudgment } from '../../types/discovery'

const JUDGMENT_LABELS: Record<TruthJudgment, string> = {
  believe_a: 'A의 주장이 진실',
  believe_b: 'B의 주장이 진실',
  both_partial: '양쪽 다 일부만 사실',
  undetermined: '판단 보류',
}

const SOURCE_LABELS: Record<string, string> = {
  evidence: '새로운 증거',
  testimony: '증인 증언',
  lie_collapse: '거짓말 붕괴',
  emotional_slip: '감정적 실수',
}

export default function JudgmentConflictModal() {
  const { discovery, setPendingConflict, reviseJudgment, turnCount, caseData } = useStore((s) => s)
  const event = discovery.pendingConflict

  if (!event || !caseData) return null

  const dispute = caseData.disputes.find((d) => d.id === event.disputeId)
  const partyAName = caseData.duo.partyA.name
  const partyBName = caseData.duo.partyB.name

  const currentLabel = JUDGMENT_LABELS[event.currentJudgment]
    .replace('A', partyAName)
    .replace('B', partyBName)

  const handleKeep = () => setPendingConflict(null)

  const handleRevise = () => {
    // 기존 판단의 반대로 수정 (간단한 기본 로직)
    let newJudgment: TruthJudgment = 'both_partial'
    if (event.currentJudgment === 'believe_a') newJudgment = 'believe_b'
    else if (event.currentJudgment === 'believe_b') newJudgment = 'believe_a'
    reviseJudgment(event.disputeId, newJudgment, turnCount)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={handleKeep}>
      <div
        className="bg-gray-900 border border-amber-700/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-800">
          <span className="text-xl">⚠️</span>
          <h2 className="text-base font-bold text-amber-400">기존 판단과 충돌</h2>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {/* 기존 판단 */}
          <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">{dispute?.name} — 기존 판단</div>
            <div className="text-sm font-medium text-gray-300">{currentLabel}</div>
          </div>

          {/* 충돌 정보 */}
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3">
            <div className="text-xs text-amber-500 mb-1">{SOURCE_LABELS[event.source] ?? event.source}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{event.conflictingInfo}</p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            새로운 정보가 기존 판단과 다른 방향을 가리킵니다. 판단을 수정하시겠습니까?
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={handleKeep}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            현재 판단 유지
          </button>
          <button
            onClick={handleRevise}
            className="flex-1 py-2.5 rounded-xl bg-amber-600 text-gray-950 text-sm font-bold active:scale-95 hover:bg-amber-500"
          >
            판단 수정
          </button>
        </div>
      </div>
    </div>
  )
}
