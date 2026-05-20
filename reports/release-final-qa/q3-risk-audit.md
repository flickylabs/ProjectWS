# Q3 Regression Risk Audit

Date: 2026-05-20 KST  
Scope: HEAD `2f2785f0`, requested changed surfaces plus overlapping PC QA test cases.

## Executive Counts

| Severity | Count |
|---|---:|
| P0 | 0 |
| P1 | 5 |
| P2 | 9 |

## Surface 1: Tutorial Flow

Files read: `src/components/pc/tutorial/tutorialSteps.ts`, `src/components/pc/tutorial/PCTutorialOverlay.tsx`, `src/store/slices/tutorialSlice.ts`, `src/components/pc/hotbar/PCBottomDock.tsx`, `src/components/pc/evidence/PCEvidenceViewer.tsx`, `src/hooks/useActionDispatch.ts`, `src/i18n/messages/tutorial.ts`.

| Severity | Finding |
|---|---|
| P1 | `observation-hint` is now click-complete only, but the 4-language body still says it will advance "in a moment" (`잠시 후 다음으로 넘어가요` / `We'll move on in a moment`). `PCTutorialOverlay.tsx` excludes this step from the auto timer, so a user who follows the copy can wait indefinitely. |
| P2 | `evidence-view-close` completes on `pendingEvidenceView === null`, so any close path advances the step: close X, backdrop click, Escape, or `openInvestigationPanel()`. This is probably acceptable for "viewer closed", but it is broader than the copy's X-button instruction. |
| P2 | `question-dispute-select` and `question-content-select` now target `.pc-question-choice__panel`. This fixes motive/empathy, and normal `closeAll()` means only one hotbar panel is open. If a free-question/evidence panel with the same class is somehow open at the same time, the first matching panel can steal the spotlight/card anchor. |
| P2 | `tutorial-complete` attaches `onClick` to the final message card. The pin/close child buttons do not stop propagation, so clicking them completes the tutorial instead of collapsing the guide. The final copy says click anywhere to begin, so this is not a flow blocker, but the controls are semantically inconsistent. |
| None | `record-summary-intro` listener is scoped to the active step and cleaned up on effect teardown. Duplicate `pc:open-record-summary` events are idempotent because `markStepComplete` checks `currentStepId`. |
| None | `judge-observation-intro` / `observation-hint` window click listener uses capture but only completes when `event.target.closest(targetSelector)` matches the intended section; outside spotlight clicks do not complete the step. |
| None | `useActionDispatch.ts` now marks `question-content-select` for any truthy `action.questionType`. For `PlayerAction.type === 'question'`, `questionType` is required, so motive/empathy now advance. Normal PC hotbar dispatches only fact/motive/empathy here. |

PC QA overlap:

- `§2.5` and `§9.2` are stale for `dispute-focus-d1`: the expected copy still says "쟁점 선택", while current copy is "쟁점 살펴보기". Code read confirms the new copy matches the non-committal focus action.
- `§2.6` only covers fact pursuit. Code read confirms the new selectors and `markStepComplete` path cover motive/empathy too, but UI clicking is still needed for full visual confirmation.
- `§2.10` is stale: it expects auto advance, but current code requires clicking the notebook section.

## Surface 2: Left Panel Layout

Files read: `src/app/pc.css`, `src/components/pc/panels/PCLeftPanel.tsx`, `src/components/pc/observation/JudgeNotebookSection.tsx`, `src/hooks/useScreenPreset.ts`, `src/utils/screenPresets.ts`.

| Severity | Finding |
|---|---|
| P1 | Static height math indicates S/XS bucket clipping risk. S at 768px height has left content minimums of evidence 240 + notes 120 + observation 176 + notebook 176 + three 8px gaps = 736px, while the panel max-height is approximately `100vh - 52px` = 716px. XS at low heights has the same risk. The left rail has `overflow: hidden`, so lower sections can be clipped instead of scrolling. |
| P2 | Base evidence height is fixed at 320px and evidence cards are `flex-shrink: 0`, so the evidence list scrolls as intended. However, "5 cards visible" depends on localized text/combo badge height and cannot be proven from CSS alone. |
| None | Judge observation and notebook are both fixed to 176px after the latest overrides; they no longer compete for flex growth with important notes. |

PC QA overlap:

- No direct test case covers the new 320/160 and M/S/XS bucket math. This remains risk-audit-only unless a viewport visual pass is added.

## Surface 3: EventFeedbackCard

Files read: `src/components/pc/feedback/EventFeedbackCard.tsx`, `src/store/slices/eventFeedbackSlice.ts`, `src/app/pc.css`.

| Severity | Finding |
|---|---|
| P1 | `manualCloseOnly` is computed but unused in `EventFeedbackCard.tsx`, producing one of the two lint errors. This blocks `npm run lint`. |
| P2 | Space dismiss is guarded for `hasActions` and `active.onDefer`, so required-choice/defer popups are not dismissed accidentally. It also dismisses auto-dismiss popups without actions, which matches the visible confirm button behavior but is broader than the "manual-close popup" comment. |
| P2 | Multiple-popup queue handling appears safe: Space sets `phase='leaving'`, the key listener is removed when phase changes, and `dismissActiveFeedback` promotes the next queued item only after the leaving timer. |
| None | The `kbd` pill uses min-width 44px and monospace 11px for "Space"; no static overflow risk for the current 5-character label. |

PC QA overlap:

- `§2.9` feedback acknowledge is partially code-verified: the card still has `data-tutorial-target="feedback-card"`, and click/Space close paths exist. Full timing/visual validation requires UI interaction.

## Surface 4: Decisive-Clue Stamp

Files read: `src/components/pc/feedback/EventFeedbackCard.tsx`, `src/app/pc.css`.

| Severity | Finding |
|---|---|
| P1 | `.pc-court-clash__chip` is positioned at `top: 18px; right: 26px; z-index: 3`, while the feedback close X is `top: 8px; right: 10px; z-index: 1`. For court-beat cards with a chip label, the stamp can visually cover the close X. `pointer-events: none` keeps the X clickable, but the control may look obscured. |
| P2 | The stamp uses uppercase, `letter-spacing: 0.18em`, and `rotate(-7deg)`. Short KO/EN labels remain plausible, but JA/ZH-CN readability can degrade if localized labels are longer than the current chip. |
| None | `pc-stamp-impact` animates only the chip transform and does not override the card/root phase animation, so no static animation conflict with popup entry was found. |

PC QA overlap:

- `§2.8` and `§9.3` expect chip label "결정적 단서" and impact VFX. Code confirms the chip renderer and animation exist; label readability and X overlap need visual confirmation.

## Surface 5: Cutscene Wiring

Files read: `src/hooks/useActionDispatch.ts`, `src/engine/cutsceneTriggerEngine.ts`, `src/engine/vfxHierarchyEngine.ts`, `src/engine/cutsceneTextLoader.ts`, `src/components/discovery/TruthRevealCutscene.tsx`, `src/components/discovery/CutsceneOverlay.tsx`.

| Severity | Finding |
|---|---|
| P1 | `TruthRevealCutscene.tsx` defines `portraitAlt` but never uses it, producing the other lint error. The nearby comment says witness should oscillate shaken/resigned, but render code currently toggles defensive/resigned. This is a likely visual regression in witness reveal. |
| P2 | `_suppressTrustCutsceneFor` correctly prevents duplicate trust cutscenes in the normal witness -> force S5 -> notify path, and it is consumed synchronously. Edge case: if `shouldTriggerCutscene('truth_reveal_witness')` is blocked by the major cutscene hard cap or listener absence, the flag still suppresses the trust fallback, so the S5 breakthrough can proceed with no truth-reveal cutscene. |
| P2 | Missing cutscene text getters return an empty string, despite the loader comment promising a generic placeholder. `qa:cutscene` confirms 14/14 current files are present, so this is not active today, but missing future entries would render blank monologue text. |

PC QA overlap:

- `§2.19` and `§2.20` cover verdict montage/cutscene, not the trust/witness truth reveal path audited here. Current cutscene wiring needs a separate witness/trust scenario test if UI validation is required.

## Surface 6: `dispute-focus-d1` Copy

Files read: `src/i18n/messages/tutorial.ts`, `docs/localization/tutorial-additions-20260520/README.md`, `docs/localization/non-dialogue-extract/batches/batch_26_tutorial_session_20260520.csv`.

| Severity | Finding |
|---|---|
| None | The copy change from "쟁점 선택" to "쟁점 살펴보기" aligns with the actual step: click d-1 to focus and inspect available issues, not commit to a later interrogation dispute. EN/JA/ZH-CN are semantically aligned with browse/look/check. |
| P2 | The pre-launch PC QA test-case table is now stale for this key and can cause false QA failures if not updated. |

