# UI/VFX Hierarchy MVP Summary

Date: 2026-04-27
Scope: P0-E VFX hierarchy MVP

## Implemented
- Added central VFX hierarchy state in `src/engine/vfxHierarchyEngine.ts`.
- Enforced:
  - same cut-in cooldown: 5 turns
  - emotional burst cooldown: 7 turns
  - major hard cap: 3 per case
  - phase transition strong cutscene limit: 2 per case
  - phase cut-in warning: console warn at 5 cut-ins in the same phase
  - lightning: 1 sequence per turn and same target cooldown of 5 turns
- Reduced lightning:
  - generic observation-to-dialogue lightning is now aura only
  - evidence result lightning is now evidence-card aura only
  - dispute unlock keeps one allowed system-to-dispute lightning plus aura
- Added interrogation 3-type micro VFX through the existing observation/aura path:
  - `모순 생성`
  - `방어 완화`
  - `숨은 쟁점 접근`
- Aligned existing cutscene wording:
  - `lie_collapse`: `방어 붕괴`
  - `contradiction_hit`: `진술 균열`
  - `emotional_burst`: `방어 완화`
- Added verdict gavel cutscene before the PC result phase, gated by the same major hard cap.
- Reset VFX hierarchy state on case initialization.

## Guardrails
- `src/app/pc.css` was not touched.
- No new cutscene id was added.
- No case data, ScriptedText, baseline anchor, or feature flag default was changed.
- Existing queues were reused; no new queue was introduced.

## Verification
- `npx tsc -b --force`: PASS
- `npm run check:all`: PASS, hard 0, 157 known warnings
- `npm run build`: PASS, Vite chunk-size warning only

## Residual Notes
- `memory/design_vfx_inventory_pc.md` and `memory/reference_resonance_selectors.md` were referenced by the request but no `memory/` directory exists in this workspace, so the audit used the live code and `docs/information-surface-policy.md`.
