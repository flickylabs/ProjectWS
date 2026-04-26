/**
 * PCDeferredVerdictIcon — 핫바 위 floating 미니 아이콘
 * ─────────────────────────────────────────────────────
 * 진실 공방을 일시 보류 (X 버튼 또는 "지금은 보류" 액션)했을 때, deferredVerdicts에
 * 누적된 항목을 핫바 바로 위에 작은 아이콘으로 표시. 클릭 시 해당 disputeId의 진실
 * 공방 띠가 다시 활성화 (pendingConfrontation 복귀).
 *
 * 동작:
 * - deferredVerdicts 0건 → 미렌더
 * - 1+건 → 각 dispute별 작은 칩 가로 나열. 카운트 N도 함께
 * - 클릭 → restoreDeferredVerdict(disputeId) → DiscoveryFeedbackWatcher의 confrontation
 *   useEffect가 다시 발화해 띠 재생성
 * - 다른 진실 공방이 이미 활성(pendingConfrontation 있음)이면 진입 X (큐 충돌 방지)
 */
import { useStore, useGameStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'

export default function PCDeferredVerdictIcon() {
  const deferredVerdicts = useStore((s) => s.discovery.deferredVerdicts)
  const pendingConfrontation = useStore((s) => s.discovery.pendingConfrontation)
  const caseData = useStore((s) => s.caseData)

  const entries = Object.values(deferredVerdicts)
  if (entries.length === 0 || !caseData) return null

  return (
    <div className="pc-deferred-verdict" role="region" aria-label="보류된 판결">
      <span className="pc-deferred-verdict__label">보류된 판결</span>
      {entries.map((event) => {
        const disputeName = caseData.disputes.find((d) => d.id === event.disputeId)?.name ?? event.disputeId
        return (
          <button
            key={event.disputeId}
            type="button"
            className="pc-deferred-verdict__chip"
            // 다른 진실 공방이 활성 중이면 클릭 무시 (큐 충돌 방지)
            disabled={Boolean(pendingConfrontation)}
            title={`판결 재개 — ${disputeName}`}
            onClick={() => {
              useGameStore.getState().restoreDeferredVerdict(event.disputeId)
            }}
          >
            <PCSvgIcon id="i-scale" size={14} />
            <span className="pc-deferred-verdict__chip-name">{disputeName}</span>
          </button>
        )
      })}
    </div>
  )
}
