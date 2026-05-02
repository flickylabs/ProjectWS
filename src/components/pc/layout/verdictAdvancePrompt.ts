import { getVerdictDisputeGate, MIN_VISIBLE_DISPUTES_FOR_VERDICT } from '../../../engine/verdictAdvanceGate'
import { useGameStore } from '../../../store/useGameStore'
import { showToast } from '../../common/Toast'
import { openPcInteractionPanel } from './PCInteractionPanel'

export function requestVerdictAdvance(): boolean {
  const state = useGameStore.getState()
  const gate = getVerdictDisputeGate(state)

  if (!gate.hasMinimumVisibleDisputes) {
    showToast(
      `판결은 쟁점이 ${MIN_VISIBLE_DISPUTES_FOR_VERDICT}개 이상 드러난 뒤 진행할 수 있습니다. 현재 드러난 쟁점은 ${gate.visibleCount}개입니다.`,
      'warn',
    )
    return false
  }

  if (!state.canAdvancePhase()) {
    showToast('아직 판결 조건이 충족되지 않았습니다. 쟁점별 진실과 증거를 더 확인하세요.', 'warn')
    return false
  }

  if (gate.hiddenCount > 0) {
    openPcInteractionPanel({
      title: '아직 밝혀지지 않은 쟁점이 있습니다',
      subtitle: '판결 전 확인',
      tone: 'gold',
      body: [
        `현재 드러난 쟁점은 ${gate.visibleCount}개입니다.`,
        `아직 밝혀지지 않은 쟁점이 ${gate.hiddenCount}개 남아 있습니다.`,
        '',
        '그래도 바로 판결을 진행하시겠습니까?',
      ].join('\n'),
      tags: [
        `공개 쟁점 ${gate.visibleCount}`,
        `숨은 쟁점 ${gate.hiddenCount}`,
      ],
      actions: [
        {
          kind: 'run_special',
          label: '그래도 판결 진행',
          specialAction: 'advance_phase',
        },
        {
          kind: 'collapse_verdict_cta',
          label: '판결 버튼만 남기기',
        },
        {
          kind: 'close',
          label: '더 조사하기',
        },
      ],
    })
    return true
  }

  state.advancePhase()
  return true
}
