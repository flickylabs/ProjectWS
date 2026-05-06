import { getVerdictDisputeGate, MIN_VISIBLE_DISPUTES_FOR_VERDICT } from '../../../engine/verdictAdvanceGate'
import { useGameStore } from '../../../store/useGameStore'
import { translate } from '../../../i18n'
import { showToast } from '../../common/Toast'
import { openPcInteractionPanel } from './PCInteractionPanel'

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

  if (gate.hiddenCount > 0) {
    openPcInteractionPanel({
      title: translate('pc.verdictAdvance.hidden.title'),
      subtitle: translate('pc.verdictAdvance.hidden.subtitle'),
      tone: 'gold',
      body: translate('pc.verdictAdvance.hidden.body', {
        visible: gate.visibleCount,
        hidden: gate.hiddenCount,
      }),
      tags: [
        translate('pc.verdictAdvance.hidden.visibleTag', { count: gate.visibleCount }),
        translate('pc.verdictAdvance.hidden.hiddenTag', { count: gate.hiddenCount }),
      ],
      actions: [
        {
          kind: 'run_special',
          label: translate('pc.verdictAdvance.hidden.confirm'),
          specialAction: 'advance_phase',
        },
        {
          kind: 'collapse_verdict_cta',
          label: translate('pc.verdictAdvance.hidden.collapse'),
        },
        {
          kind: 'close',
          label: translate('pc.verdictAdvance.hidden.keepInvestigating'),
        },
      ],
    })
    return true
  }

  state.advancePhase()
  return true
}
