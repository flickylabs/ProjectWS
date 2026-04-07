/**
 * 감정 실수 모달 — 격앙 상태에서 NPC가 실수로 자백했을 때
 */
import { useStore } from '../../store/useGameStore'

export default function EmotionalSlipModal() {
  const { discovery, addEmotionalSlip, setPendingSlip, caseData } = useStore((s) => s)
  const slip = discovery.pendingSlip

  if (!slip || !caseData) return null

  const partyData = slip.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const sourceDispute = caseData.disputes.find((d) => d.id === slip.sourceDisputeId)
  const linkedDispute = slip.linkedDisputeId
    ? caseData.disputes.find((d) => d.id === slip.linkedDisputeId)
    : null

  const handleAccept = () => {
    addEmotionalSlip(slip)
  }

  const handleDismiss = () => {
    setPendingSlip(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div
        className="bg-gray-900 border border-red-700/50 rounded-2xl w-full max-w-md animate-shake shadow-2xl shadow-red-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">💢</span>
            <h2 className="text-base font-bold text-red-400">감정적 실수 포착</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {partyData.name}이(가) 흥분 상태에서 의미심장한 발언을 했습니다
          </p>
        </div>

        {/* 실수 발언 */}
        <div className="px-5 py-4">
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`text-xs font-medium ${slip.party === 'a' ? 'text-blue-400' : 'text-rose-400'}`}>
                {partyData.name}
              </span>
              <span className="text-xs text-gray-600">— 격앙 상태</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed italic">"{slip.slipText}"</p>
          </div>
        </div>

        {/* 연결 정보 */}
        <div className="px-5 pb-3 space-y-2">
          {sourceDispute && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600">관련 쟁점:</span>
              <span className="text-gray-300">{sourceDispute.name}</span>
            </div>
          )}
          {linkedDispute && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-600">연결 쟁점:</span>
              <span className="text-amber-300">{linkedDispute.name}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 pt-2 flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            넘어가기
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold active:scale-95 hover:bg-red-500 transition-all"
          >
            진실 공방에 활용
          </button>
        </div>
      </div>
    </div>
  )
}
