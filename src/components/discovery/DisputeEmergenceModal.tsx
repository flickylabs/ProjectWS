/**
 * 숨겨진 쟁점 발현 모달 — 새로운 쟁점이 드러났을 때
 */
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

const ROUTE_LABELS: Record<string, { icon: string; label: string }> = {
  evidence: { icon: '📄', label: '증거를 통해 발견' },
  truth_confrontation: { icon: '⚖️', label: '진실 공방을 통해 발견' },
  witness: { icon: '🗣️', label: '증인 증언을 통해 발견' },
  lie_collapse: { icon: '💥', label: '거짓말 붕괴를 통해 발견' },
  emotional_slip: { icon: '💢', label: '감정적 실수를 통해 발견' },
}

export default function DisputeEmergenceModal() {
  const { discovery, acknowledgeEmergence, caseData } = useStore((s) => s)
  const event = discovery.pendingEmergence

  if (!event || !caseData) return null

  const dispute = caseData.disputes.find((d) => d.id === event.disputeId)
  const routeInfo = ROUTE_LABELS[event.route] ?? { icon: '💡', label: '발견' }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/90 flex items-center justify-center px-4">
      <div
        className="bg-gray-900 border border-amber-600/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — 극적 연출 */}
        <div className="px-5 pt-6 pb-3 text-center">
          <div className="mb-2 animate-shake"><Emoji char="💡" size={32} /></div>
          <h2 className="text-lg font-bold text-amber-400">새로운 쟁점이 드러났습니다</h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Emoji char={routeInfo.icon} size={14} />
            <span className="text-xs text-gray-500">{routeInfo.label}</span>
          </div>
        </div>

        {/* 쟁점 내용 */}
        <div className="px-5 py-4">
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4">
            <div className="text-sm font-bold text-amber-300 mb-2">{dispute?.name ?? event.disputeId}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* quadrant 설명 */}
        {dispute && (dispute.quadrant === 'neither_knows' || dispute.quadrant === 'shared_misconception') && (
          <div className="px-5 pb-3">
            <div className={`rounded-lg p-3 ${
              dispute.quadrant === 'neither_knows'
                ? 'bg-purple-950/30 border border-purple-800/30'
                : 'bg-orange-950/30 border border-orange-800/30'
            }`}>
              <p className="text-xs text-gray-400 leading-relaxed">
                {dispute.quadrant === 'neither_knows'
                  ? '양측 모두 이 사실을 알지 못했습니다. 이 발견은 사건의 전제를 근본적으로 바꿀 수 있습니다.'
                  : '양측 모두 이 사안에 대해 잘못 알고 있었습니다. 진실은 양쪽 주장과 다릅니다.'}
              </p>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 pt-2">
          <button
            onClick={() => acknowledgeEmergence(event.disputeId)}
            className="w-full py-3 rounded-xl bg-amber-600 text-gray-950 text-sm font-bold active:scale-95 hover:bg-amber-500 transition-all"
          >
            확인 — 쟁점 목록에 추가됨
          </button>
        </div>
      </div>
    </div>
  )
}
