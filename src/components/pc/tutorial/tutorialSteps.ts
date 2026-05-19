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
    // PC QA round 2 A-3: spotlight the emotion donut + trust state on Character B.
    id: 'emotion-trust-intro',
    targetSelector: '[data-tutorial-target="character-slot-b"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.emotion-trust-intro',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
  {
    // PC QA round 2: split — show the three hotbar question slots, complete when
    // the user opens any question panel.
    id: 'question-method-select',
    targetSelector: '[data-tutorial-target="question-type-fact"], [data-tutorial-target="question-type-motive"], [data-tutorial-target="question-type-empathy"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-method-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'tutorial:question_panel_opened',
    },
  },
  {
    // PC QA round 2: inside the opened panel — pick a dispute chip.
    id: 'question-dispute-select',
    targetSelector: '[data-tutorial-target="question-fact-panel"] .pc-question-choice__dispute-btn, [data-tutorial-target="question-fact-panel"]',
    cardAnchorSelector: '[data-tutorial-target="question-fact-panel"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-dispute-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'tutorial:question_dispute_selected',
    },
  },
  {
    // PC QA round 2: after the dispute is chosen — pick a question variant.
    id: 'question-content-select',
    targetSelector: '[data-tutorial-target="question-fact-panel"] .pc-question-choice__msg-btn--question, [data-tutorial-target="question-fact-panel"]',
    cardAnchorSelector: '[data-tutorial-target="question-fact-panel"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-content-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'question:fact_pursuit',
    },
  },
  {
    // PC QA round 2: split — pick the evidence card to open its detail panel.
    id: 'evidence-select',
    targetSelector: '[data-tutorial-target="evidence-e2-card"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.evidence-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'tutorial:evidence_card_opened',
    },
  },
  {
    // PC QA round 2 A-3: spotlight the evidence detail panel once it's opened.
    id: 'evidence-detail-open',
    targetSelector: '[data-tutorial-target="evidence-e2-detail"]',
    fingerPlacement: 'left',
    messageKey: 'pc.tutorial.spouse01.evidence-detail-open',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
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
    // PC QA round 2 A-3: highlight the combination lab between investigate and present.
    id: 'combination-intro',
    targetSelector: '[data-tutorial-target="combination-lab"], .pc-combination-lab',
    fingerPlacement: 'left',
    messageKey: 'pc.tutorial.spouse01.combination-intro',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
  {
    id: 'evidence-present-e2-to-b',
    targetSelector: '[data-tutorial-target="evidence-present-e2-to-b"], [data-tutorial-target="evidence-present-button"]',
    // PC QA round 2: anchor the card on the evidence detail wrapper so it sits
    // beside the present buttons rather than overlapping the choice modal.
    cardAnchorSelector: '[data-tutorial-target="evidence-e2-detail"]',
    fingerPlacement: 'right',
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
    // PC QA round 2 A-3: walk through the right-side info surfaces — record
    // summary → speech notes → judge's observation → judge's notebook.
    id: 'record-summary-intro',
    targetSelector: '[data-tutorial-target="record-summary"], .pc-record-summary',
    fingerPlacement: 'left',
    messageKey: 'pc.tutorial.spouse01.record-summary-intro',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
  {
    id: 'speech-note-intro',
    targetSelector: '[data-tutorial-target="speech-notes"], .pc-favorite-speech, .pc-speech-notes',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.speech-note-intro',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
    },
  },
  {
    id: 'judge-observation-intro',
    targetSelector: '[data-tutorial-target="judge-observation-section"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.judge-observation-intro',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'auto',
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
