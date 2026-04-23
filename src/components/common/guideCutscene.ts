import { useGameStore } from '../../store/useGameStore'

/**
 * 재판관 가이드 컷씬 — 중앙 검정 띠로 짧게 노출 후 지정한 타겟 selector로 수렴.
 * 수렴 완료 시 타겟이 2번 깜빡(빛남)으로 유저 시선을 그리로 유도.
 *
 * 주요 사용처:
 *  - 조합 성공 judgeHint → 증인/조합/증거 영역
 *  - 조합 가능 쌍 준비 / 자동 배치 → 조합 영역
 *  - Dossier 해금 → 증거 영역
 *  - 쟁점 정리 / 선례 감각 → 쟁점 리본
 */
export function showGuideCutscene(text: string, targetSelector: string): void {
  useGameStore.getState().enqueueFeedback({
    kind: 'observation',
    body: text,
    tone: 'gold',
    convergeTargetSelector: targetSelector,
  })
}
