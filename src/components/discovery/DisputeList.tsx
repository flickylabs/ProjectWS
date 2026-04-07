/**
 * 쟁점 리스트 — 캐릭터별 필터링 + 숨김/발현/(N) 뱃지 + 비활성화
 * 기존 QuestionSelector의 쟁점 선택을 대체/확장하는 컴포넌트
 */
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { PartyId } from '../../types'
import type { DisputeVisibility, TruthJudgment } from '../../types/discovery'

interface Props {
  target: PartyId | null
  selectedDisputeId: string | null
  onSelect: (disputeId: string) => void
  /** true면 선택 불가 (읽기 전용 모드) */
  readOnly?: boolean
}

const JUDGMENT_ICONS: Record<TruthJudgment, string> = {
  believe_a: '🔵',
  believe_b: '🔴',
  both_partial: '🟡',
  undetermined: '⬜',
}

const VISIBILITY_STYLE: Record<DisputeVisibility, { opacity: string; badge?: string; badgeColor?: string }> = {
  visible: { opacity: '' },
  hidden: { opacity: 'hidden' },  // 렌더링 안 함
  emerged: { opacity: '', badge: 'N', badgeColor: 'bg-red-500 text-white' },
  inactive: { opacity: 'opacity-40' },
}

export default function DisputeList({ target, selectedDisputeId, onSelect, readOnly }: Props) {
  const { caseData, discovery, agentA, agentB } = useStore((s) => s)

  if (!caseData || !target) return null

  const visEntries = Object.values(discovery.disputeVisibility)
    .filter((entry) => {
      // hidden은 표시 안 함
      if (entry.visibility === 'hidden') return false
      // 해당 파티에 관련된 쟁점만 표시
      return entry.relevantParties.includes(target)
    })
    .sort((a, b) => {
      // emerged(신규)를 상단에, inactive를 하단에
      const order: Record<DisputeVisibility, number> = { emerged: 0, visible: 1, inactive: 2, hidden: 3 }
      return (order[a.visibility] ?? 1) - (order[b.visibility] ?? 1)
    })

  const lieStateMap = target === 'a' ? agentA.lieStateMap : agentB.lieStateMap

  return (
    <div className="space-y-1.5">
      {visEntries.map((entry) => {
        const dispute = caseData.disputes.find((d) => d.id === entry.disputeId)
        if (!dispute) return null

        const style = VISIBILITY_STYLE[entry.visibility]
        const lieState = lieStateMap[entry.disputeId]
        const isCollapsed = lieState?.currentState === 'S5'
        const judgment = discovery.judgments[entry.disputeId]
        const isInactive = entry.visibility === 'inactive'
        const isSelected = selectedDisputeId === entry.disputeId

        return (
          <button
            key={entry.disputeId}
            onClick={() => !readOnly && !isInactive && onSelect(entry.disputeId)}
            disabled={readOnly || isInactive}
            className={`w-full text-left rounded-xl border p-2.5 transition-all ${style.opacity} ${
              isSelected
                ? 'bg-amber-900/30 border-amber-600/50 ring-1 ring-amber-500/20'
                : isInactive
                  ? 'bg-gray-900/30 border-gray-800/30 cursor-default'
                  : 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* 판단 아이콘 */}
                {judgment && (
                  <span className="flex-shrink-0"><Emoji char={JUDGMENT_ICONS[judgment.judgment]} size={14} /></span>
                )}

                {/* 쟁점명 */}
                <span className={`text-xs font-medium truncate ${
                  isCollapsed ? 'text-gray-500 line-through' : isInactive ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {dispute.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                {/* S5 표시 */}
                {isCollapsed && (
                  <span className="text-[10px] text-emerald-500 bg-emerald-950/40 px-1.5 py-0.5 rounded">자백</span>
                )}

                {/* Lie state */}
                {lieState && !isCollapsed && (
                  <span className="text-[10px] text-gray-600">{lieState.currentState}</span>
                )}

                {/* (N) 뱃지 */}
                {entry.isNew && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    style.badgeColor ?? 'bg-red-500 text-white'
                  }`}>
                    N
                  </span>
                )}

                {/* 비활성 표시 */}
                {isInactive && (
                  <span className="text-[10px] text-gray-600">완료</span>
                )}
              </div>
            </div>

            {/* 판단 요약 (있으면) */}
            {judgment && judgment.judgment !== 'undetermined' && (
              <div className="mt-1 ml-5">
                <span className="text-[10px] text-gray-600">
                  판단: {judgment.judgment === 'believe_a' ? `${caseData.duo.partyA.name} 측 진실`
                    : judgment.judgment === 'believe_b' ? `${caseData.duo.partyB.name} 측 진실`
                    : '양쪽 부분적 사실'}
                  {judgment.revisions.length > 0 && ` (수정 ${judgment.revisions.length}회)`}
                </span>
              </div>
            )}
          </button>
        )
      })}

      {visEntries.length === 0 && (
        <div className="text-center py-4 text-xs text-gray-600">
          {target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}에게 해당하는 쟁점이 없습니다
        </div>
      )}
    </div>
  )
}
