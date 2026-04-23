import DiscoveryFeedbackWatcher from '../feedback/DiscoveryFeedbackWatcher'

/**
 * Discovery Overlay (Option A 통합 후)
 * ───────────────────────────────────
 * 기존 7종 Panel 을 모두 통합 피드백 카드(EventFeedbackCard) 로 수렴.
 * 이 컴포넌트는 pending 상태 감시 Watcher 만 남김 — 직접 렌더하지 않음.
 */
export default function PCDiscoveryOverlay() {
  return <DiscoveryFeedbackWatcher />
}
