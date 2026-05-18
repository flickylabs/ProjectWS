import { getVerdictDisputeGate, MIN_VISIBLE_DISPUTES_FOR_VERDICT } from '../../../engine/verdictAdvanceGate'
import { useGameStore } from '../../../store/useGameStore'
import { translate } from '../../../i18n'
import { showToast } from '../../common/Toast'

// PC QA round 2 A-1: hidden-dispute pre-modal removed. The verdict-entry decision
// modal (Phase6_Mediation) now surfaces the visible/hidden dispute counts and
// the "incomplete record" warning itself, so the user sees one decision screen
// instead of two stacked modals.
export function requestVerdictAdvance(): boolean {
  const state = useGameStore.getState()
  const gate = getVerdictDisputeGate(state)

  if (!gate.hasMinimumVisibleDisputes) {
    showToast(
      translate('pc.verdictAdvance.minimumVisible', {
        required: MIN_VISIBLE_DISPUTES_FOR_VERDICT,
        visible: gate.visibleCount,
      }),
      'warn',
    )
    return false
  }

  if (!state.canAdvancePhase()) {
    showToast(translate('pc.verdictAdvance.conditionsMissing'), 'warn')
    return false
  }

  state.advancePhase()
  return true
}
