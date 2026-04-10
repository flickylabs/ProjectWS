# Thread U Summary Skill Design

Date: 2026-04-10
Status: Draft for CT approval

## Current Findings

- Restored PC UI baseline builds cleanly after reverting the four rewritten UI files.
- Summary skill runtime is not implemented yet.
- Existing store already has `pcSummaryUnlocked` and `setPcSummaryUnlocked` in `src/store/useGameStore.ts`.
- No dedicated summary slice, summary types, or `PCSummaryPanel` component exist yet.
- In the restored workspace snapshot, `src/app/pc.css` does not currently contain a `.pc-summary-panel` selector, even though CT guidance referenced a placeholder.

## Goal

Add a right-panel summary skill area below the combination skill area without rewriting the current panel structure.

This step is design-only. No summary feature code should be written before CT approval.

## Proposed UX

- Location: right panel, directly below the combination skill area.
- Form: compact panel card titled `요약 스킬`.
- Locked state: hidden or disabled until `pcSummaryUnlocked === true`.
- Core action: condense already surfaced case signals into a reusable summary card.
- Output shape: short actionable summary cards, not long prose blocks.

## Proposed Summary Modes

1. `fact_chain`
   - Compresses current dispute facts into a short sequence the player can immediately reuse.
2. `credibility`
   - Highlights contradictions, reliability shifts, and weak points in the current target narrative.
3. `mediation`
   - Reframes the discovered facts toward Phase 6 mediation leverage.

## Recommended Data Sources

Use store-derived state only in v1:

- `lastFocusedDisputeId`
- `pcTargetParty`
- `dialogueLog`
- `questionMeters`
- `combinationLabRuntime`
- `evidenceStates`
- `evidenceDefinitions`

Reason:

- Current pinned-note state is local to `PCImportantNotesSection`.
- Moving pinned notes into the global store would expand scope and should be approved explicitly.
- A first summary implementation can still work from globally visible evidence, dialogue, dispute focus, and combination outputs.

## Proposed State Shape

Use the existing unlock flag as the gate:

- `pcSummaryUnlocked: boolean`

Add new summary-specific state only after approval:

- `pcSummaryDrafts: PcSummaryDraft[]`
- `pcSummarySelectedId: string | null`
- `pcSummaryLastGeneratedAtTurn: number | null`

Suggested draft type:

```ts
type PcSummaryMode = 'fact_chain' | 'credibility' | 'mediation'

interface PcSummaryDraft {
  id: string
  mode: PcSummaryMode
  title: string
  bullets: string[]
  relatedDisputeIds: string[]
  relatedEvidenceIds: string[]
  targetParty: 'a' | 'b'
  generatedAtTurn: number
}
```

## Proposed Component Plan

- New component: `src/components/pc/panels/PCSummaryPanel.tsx`
- Initial props-free store consumer, matching current PC panel pattern.
- Responsibilities:
  - render locked / ready / generated states
  - generate draft summaries from current store state
  - expose follow-up actions:
    - focus dispute
    - open evidence
    - send to interaction panel

## Interaction Rules

- One summary panel should only summarize the currently focused dispute.
- Generated summaries should be short and actionable.
- Combination Lab outputs should influence summary content when available.
- No automatic generation on every turn in v1; generation should be explicit by user action.

## Non-Goals

- No new backend authoring format in this step.
- No automatic LLM summary generation.
- No migration of local pinned-note state into store without approval.
- No change to existing left/right panel structure beyond adding the approved summary panel later.

## Approval Questions For CT

1. Confirm reuse of existing `pcSummaryUnlocked` as the only unlock gate.
2. Confirm v1 should use store-derived signals only, without promoting pinned notes to global state.
3. Confirm whether Thread U should add the missing `.pc-summary-panel` selector after approval, since it is not present in the restored `src/app/pc.css` snapshot.
