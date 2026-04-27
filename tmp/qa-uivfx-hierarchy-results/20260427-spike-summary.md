# UI/VFX Hierarchy Spike Summary

Date: 2026-04-27
Scope: P0-E VFX hierarchy, cooldown, lightning reduction, interrogation micro VFX
Entry HEAD: 6a4846b

## Entry Checks
- `git pull origin main`: already up to date
- `git status --short --branch`: tracked clean at entry; one unrelated untracked handoff file existed
- `npm run check:all`: PASS, hard 0, 157 known warnings

## Audit Findings
- Cutscene surfaces are split across `CutsceneOverlay`, `presentationEngine`, and `PhaseTransition`.
- Resonance lightning had three active call sites:
  - `DiscoveryFeedbackWatcher`: new dispute modal confirmation fired 3 repeated bolts to the same dispute.
  - `JudgeObservationSection`: generic event observations fired 3 repeated bolts from the observation card to a dialogue bubble.
  - `PCGameplayOverlay`: evidence result cards fired a bolt to the evidence card.
- Existing aura infrastructure in `ResonanceLayer` was sufficient for reduced micro feedback; no new CSS or queue was required.
- `src/app/pc.css` remained untouched.

## Prototype Result
- Central helper added in `src/engine/vfxHierarchyEngine.ts`.
- Interrogation micro VFX map:
  - fact pursuit: `모순 생성`, crack-style aura on dispute target
  - empathy approach: `방어 완화`, aura on trust target
  - motive search: `숨은 쟁점 접근`, reveal-style aura on dispute target
- Lightning is now allowed only when a caller provides an allowed reason. Existing generic lightning paths were either reduced to aura or marked as `system_to_dispute`.

## Spike Outcome
Proceed to MVP implementation: central cooldown, hard cap, lightning gate, micro VFX hook, and 6 cutscene wording/frequency alignment.
