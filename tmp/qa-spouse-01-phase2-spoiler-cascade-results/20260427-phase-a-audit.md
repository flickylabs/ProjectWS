# Phase A Audit — spouse-01 Phase 2 Spoiler Cascade Fast Fix

Date: 2026-04-27

## Scope Restored

- Case: `spouse-01`
- Phase: Phase 2 / Phase 3 transition surface
- Repro focus: character A dispute `d-1` repeated `fact_pursuit`
- P0 symptoms:
  - e-4 truth name `형 문자 스레드` surfaced instead of `발신자 미상 문자`
  - repeated fact pursuit opened new evidence and chained disputes
  - B early hook leaked `형 사정`, `현금으로 전했다`
  - `[SCRIPT]`, `[FALLBACK]`, `[LLM]` source labels appeared in UI
  - contradiction/interrogation modal horizontal padding collapsed

## Policy Notes

- `docs/disclosure-policy.md` §3.2: evidence stage 0 may expose only `surfaceName` and surface description.
- `docs/disclosure-policy.md` §3.3: `system_message` and judge/UI surfaces are always surface-only.
- `docs/disclosure-policy.md` §4.1: e-4 truth name is `형 문자 스레드`; allowed surface name is `발신자 미상 문자`.
- `docs/information-surface-policy.md` §2.6: internal terms such as `LLM`, `guard`, `policy`, and leak-like labels must not be exposed in UI.

## Runtime Paths Audited

- Evidence display paths:
  - `src/hooks/useActionDispatch.ts`
  - `src/components/discovery/PerkChoiceModal.tsx`
  - `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
  - `src/components/pc/layout/PCMinigameOverlay.tsx`
- Chain unlock / emergence paths:
  - `src/hooks/useActionDispatch.ts`
  - `src/hooks/useDiscoveryIntegration.ts`
  - `src/engine/gameEventTriggerEngine.ts`
- Dialogue source label path:
  - `src/components/pc/layout/PCDialogueLog.tsx`
- Early hook copy:
  - `src/data/emergenceHooks.ts`
- Popup layout:
  - `src/app/pc.css`

## Boundaries Preserved

- No `VITE_OPENAI_API_KEY` reintroduction.
- No API proxy structure change.
- No Route Simulator integration.
- No Script Polish bulk patch.
- No `src/data/scriptedText/*`, `src/data/cases/generated/*`, or disclosure policy JSON edits in this hotfix.
