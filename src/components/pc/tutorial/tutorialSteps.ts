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
  /**
   * Optional element whose rect is used for the spotlight cutout / blockers /
   * spotlight ring. Hand position still tracks `targetSelector`. Use when the
   * hand should point at a small element (e.g., a close × button) but the
   * surrounding panel content should remain visible to the user.
   */
  spotlightSelector?: string
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
    // 2026-05-20 후속 사용자 요청: 3 버튼 모두 cycling 노출 (어떤 걸 눌러도 OK 안내).
    // findAllTutorialTargets는 첫 매치 selector만 반환하므로 attribute prefix selector로 통합.
    id: 'question-method-select',
    targetSelector: '[data-tutorial-target^="question-type-"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-method-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'tutorial:question_panel_opened',
    },
  },
  {
    // PC QA round 2: inside the opened panel — pick a dispute chip.
    // 2026-05-20 후속: data-tutorial-target은 fact 패널에만 있어서 motive/empathy
    // 패널에서 안내가 표시되지 않았음. class-based selector로 3 method 모두 지원.
    id: 'question-dispute-select',
    targetSelector: '.pc-question-choice__panel .pc-question-choice__dispute-btn, .pc-question-choice__panel',
    cardAnchorSelector: '.pc-question-choice__panel',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-dispute-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'tutorial:question_dispute_selected',
    },
  },
  {
    // PC QA round 2: after the dispute is chosen — pick a question variant.
    // 2026-05-20 후속: 동일하게 class-based selector로 변경.
    id: 'question-content-select',
    targetSelector: '.pc-question-choice__panel .pc-question-choice__msg-btn--question, .pc-question-choice__panel',
    cardAnchorSelector: '.pc-question-choice__panel',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.question-content-select',
    completionCondition: {
      type: 'state-mutation',
      actionType: 'question:any',
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
    // 2026-05-20: SVG viewer를 직접 열어보게 한다. 버튼 클릭 → pendingEvidenceView가 e-2로 세팅되면 완료.
    // 2026-05-20 후속 사용자 요청: 카드가 [증거 열람] 버튼을 가리지 않도록 fingerPlacement 'right'.
    id: 'evidence-view-open',
    targetSelector: '[data-tutorial-target="evidence-e2-view-btn"], [data-tutorial-target="evidence-e2-detail"]',
    cardAnchorSelector: '[data-tutorial-target="evidence-e2-detail"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.evidence-view-open',
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.pendingEvidenceView === 'e-2',
    },
  },
  {
    // 2026-05-20 후속: SVG viewer 닫고 investigate 흐름으로 진입.
    // 2026-05-20 후속2 사용자 요청: viewer 내용(GPS 기록 등)이 spotlight 밖이라 dimmed로
    // 보임 → spotlightSelector로 viewer 패널 전체를 비추고 hand만 × 버튼 가리킴.
    id: 'evidence-view-close',
    targetSelector: '[data-tutorial-target="evidence-viewer-close"]',
    spotlightSelector: '.pc-ev-panel--viewer',
    fingerPlacement: 'bottom',
    messageKey: 'pc.tutorial.spouse01.evidence-view-close',
    completionCondition: {
      type: 'click-with-state-check',
      storeSelector: (state) => state.pendingEvidenceView === null,
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
    // 2026-05-20 후속: 우측 패널 하단의 큰 [기록 정리] 버튼(PCRightPanel pc-summary-button)을
    // 가리키고 직접 클릭하게 한다. fingerPlacement 'top' = 버튼 위에 카드 배치 (버튼은
    // 우측 패널 최하단이라 'top'이 자연스러움 + 화면 좌상단 fallback 회피).
    id: 'record-summary-intro',
    targetSelector: '[data-tutorial-target="record-summary-button"]',
    fingerPlacement: 'top',
    messageKey: 'pc.tutorial.spouse01.record-summary-intro',
    completionCondition: {
      type: 'click-with-state-check',
      // 완료 시점은 PCTutorialOverlay에서 pc:open-record-summary 이벤트로 처리.
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
    // 2026-05-20 사용자 요청: auto → 직접 클릭 (한번씩 눌러보게).
    id: 'judge-observation-intro',
    targetSelector: '[data-tutorial-target="judge-observation-section"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.judge-observation-intro',
    completionCondition: {
      type: 'click-with-state-check',
      // 완료 시점은 PCTutorialOverlay의 acknowledge-click 처리.
    },
  },
  {
    // 2026-05-20 사용자 요청: auto → 직접 클릭.
    id: 'observation-hint',
    targetSelector: '[data-tutorial-target="judge-notebook-section"]',
    fingerPlacement: 'right',
    messageKey: 'pc.tutorial.spouse01.observation-hint',
    completionCondition: {
      type: 'click-with-state-check',
    },
  },
  {
    // 2026-05-20 사용자 요청: auto → 메시지 카드 클릭 시 dismiss.
    id: 'tutorial-complete',
    targetSelector: '[data-tutorial-target="tutorial-complete"]',
    fingerPlacement: 'auto',
    messageKey: 'pc.tutorial.spouse01.tutorial-complete',
    completionCondition: {
      type: 'click-with-state-check',
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
