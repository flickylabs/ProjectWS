import { useGameStore } from '../../store/useGameStore'

const PC_CLOSE_INTERACTION_PANEL_EVENT = 'pc:close-interaction-panel'
const GUIDE_CUTSCENE_PANEL_CLOSE_DELAY_MS = 120

/**
 * 재판관 가이드 컷씬 — 중앙 검정 띠로 짧게 노출 후 지정한 타겟 selector로 수렴.
 * 수렴 완료 시 타겟이 2번 깜빡(빛남)으로 유저 시선을 그리로 유도.
 *
 * 주요 사용처:
 *  - 조합 성공 judgeHint → 증인/조합/증거 영역
 *  - 조합 가능 쌍 준비 / 자동 배치 → 조합 영역
 *  - Dossier 해금 → 증거 영역
 *  - 쟁점 정리 / 선례 감각 → 쟁점 리본
 *
 * options.autoDismissMs 지정 시 [확인 Space] 미노출 + 해당 ms 후 자동 소멸 (allowAutoDismiss opt-in).
 */
export function showGuideCutscene(
  text: string,
  targetSelector: string,
  options?: { autoDismissMs?: number },
): void {
  // 사용자 요청 2026-05-21 (8th): guide cutscene text는 단일 알림이므로 body가 아닌 title로
  // 전달해 22px 위계 (이전 body 14.5~15.5px로 작아 보이던 문제 해소).
  const autoDismissMs = options?.autoDismissMs
  const enqueuePayload = {
    kind: 'observation' as const,
    title: text,
    tone: 'gold' as const,
    convergeTargetSelector: targetSelector,
    ...(autoDismissMs !== undefined ? { autoDismissMs, allowAutoDismiss: true } : {}),
  }
  if (typeof window === 'undefined') {
    useGameStore.getState().enqueueFeedback(enqueuePayload)
    return
  }

  window.dispatchEvent(new Event(PC_CLOSE_INTERACTION_PANEL_EVENT))
  window.setTimeout(() => {
    useGameStore.getState().enqueueFeedback(enqueuePayload)
  }, GUIDE_CUTSCENE_PANEL_CLOSE_DELAY_MS)
}
