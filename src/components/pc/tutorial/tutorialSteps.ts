import { Phase } from '../../../types'
import type { GameStore } from '../../../store/useGameStore'
import { TUTORIAL_STEP_IDS, type TutorialStepId } from '../../../store/slices/tutorialSlice'

export type TutorialFingerPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto'

export type TutorialStep = {
  id: TutorialStepId
  targetSelector: string
  fingerPlacement: TutorialFingerPlacement
  messageKey: string
  /**
   * Per-selector body variants. Key = a selector substring from `targetSelector`;
   * value = base messageKey whose `.body` is used when that selector matched.
   * Falls back to the default `${messageKey}.body` when no variant matches.
   * Title stays the same across variants.
   */
  bodyVariants?: Record<string, string>
  /**
   * Optional larger anchor used to position the message card so it doesn't
   * overlap the active target (e.g., a choice panel that contains the options).
   * When set, the first matching element's rect is used for card placement;
   * the hand still tracks `targetSelector`. Falls back to bounding rect of
   * targets when omitted.
   */
  cardAnchorSelector?: string
  completionCondition: {
    type: 'state-mutation' | 'click-with-state-check'
    storeSelector?: (state: GameStore) => boolean
    actionType?: string
  }
}

export const SPOUSE01_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'briefing-advance',
    targetSelector: '[data-tutorial-target="briefing-advance-button"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.briefing-advance',
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.currentPhase === Phase.Pretrial,
    },
  },
  {
    id: 'initial-statement-acknowledge',
    // Prefer the multi-option choice buttons (.v4-choice-panel__option) so the
    // hand cycles between judge-intervention choices. Falls back to the dialogue
    // advance button or latest entry when only those are visible.
    targetSelector: '.v4-choice-panel__option, .pc-dialogue-advance, [data-tutorial-target="dialogue-latest-entry"]',
    // Card anchors on the whole choice panel so it sits above the panel wrapper
    // rather than overlapping it; falls through to dialogue advance / latest entry.
    cardAnchorSelector: '.v4-choice-panel, .pc-dialogue-advance, [data-tutorial-target="dialogue-latest-entry"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.initial-statement-acknowledge',
    bodyVariants: {
      '.v4-choice-panel__option': 'pc.tutorial.spouse01.initial-statement-acknowledge.choice',
      '.pc-dialogue-advance': 'pc.tutorial.spouse01.initial-statement-acknowledge.advance',
    },
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.currentPhase === Phase.Interrogation,
    },
  },
  {
    id: 'dispute-focus-d1',
    targetSelector: '[data-tutorial-target="dispute-d1-chip"]',
    fingerPlacement: 'bottom',
    messageKey: 'pc.tutorial.spouse01.dispute-focus-d1',
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.lastFocusedDisputeId === 'd-1',
    },
  },
  {
    id: 'target-select-b',
    targetSelector: '[data-tutorial-target="character-slot-b"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.target-select-b',
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.pcTargetParty === 'b',
    },
  },
  {
    id: 'question-fact',
    // First selector: the actual question option buttons (multi-target cycling).
    // Falls back to the panel/category button when the question list is not yet open.
    targetSelector: '[data-tutorial-target="question-fact-panel"] .pc-question-choice__msg-btn--question, [data-tutorial-target="question-fact-panel"] .pc-question-choice__dispute-btn, [data-tutorial-target="question-fact-panel"], [data-tutorial-target="question-type-fact"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-fact',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'question:fact_pursuit',
    },
  },
  {
    id: 'evidence-investigate-e2',
    // Prefer the actual investigate action button (inside the evidence detail panel)
    // so the hand points at the clickable slot, not the panel wrapper or the
    // upstream evidence card. Falls back to the detail panel / list card.
    targetSelector: '[data-tutorial-target="evidence-e2-investigate-action"], [data-tutorial-target="evidence-e2-detail"], [data-tutorial-target="evidence-e2-card"]',
    // Card anchors on the detail panel (or list card) so it stays in a stable
    // position above the panel while the hand sits on the investigate button.
    cardAnchorSelector: '[data-tutorial-target="evidence-e2-detail"], [data-tutorial-target="evidence-e2-card"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.evidence-investigate-e2',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'evidence_investigate:e-2',
    },
  },
  {
    id: 'evidence-present-e2-to-b',
    targetSelector: '[data-tutorial-target="evidence-present-e2-to-b"], [data-tutorial-target="evidence-present-button"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.evidence-present-e2-to-b',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'evidence_present:e-2:b',
    },
  },
  {
    id: 'feedback-acknowledge',
    targetSelector: '[data-tutorial-target="feedback-card"]',
    fingerPlacement: 'bottom',
    messageKey: 'pc.tutorial.spouse01.feedback-acknowledge',
    completionCondition: {
      type: 'click-with-state-check',
    },
  },
  {
    id: 'observation-hint',
    targetSelector: '[data-tutorial-target="judge-notebook-section"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.observation-hint',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
  {
    id: 'tutorial-complete',
    targetSelector: '[data-tutorial-target="tutorial-complete"]',
    fingerPlacement: 'auto',
    messageKey: 'pc.tutorial.spouse01.tutorial-complete',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
]

export function getTutorialStep(stepId: TutorialStepId | null): TutorialStep | null {
  if (!stepId) return null
  return SPOUSE01_TUTORIAL_STEPS.find((step) => step.id === stepId) ?? null
}

export function getTutorialStepNumber(stepId: TutorialStepId | null): number {
  if (!stepId) return 0
  const index = TUTORIAL_STEP_IDS.indexOf(stepId)
  return index < 0 ? 0 : index + 1
}
