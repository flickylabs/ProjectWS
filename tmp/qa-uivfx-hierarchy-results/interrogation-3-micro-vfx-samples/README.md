# Interrogation 3 Micro VFX Samples

These samples document the Phase A runtime mapping. They reuse existing aura/resonance infrastructure and do not add a new cutscene or source CSS keyframe.

Visual feel-check:

- `visual-sample.html` loads the existing `src/app/pc.css` aura/job-card classes in an isolated static sample.
- `phase-a-micro-vfx-fact.png`, `phase-a-micro-vfx-empathy.png`, and `phase-a-micro-vfx-motive.png` are 1440x900 Chrome captures of one runtime action at a time.
- Each frame intentionally shows aura paused mid-flicker so the screenshot can be reviewed without adding a new runtime animation.

| Interrogation | Runtime label | Visual target | Existing VFX reused |
|---|---|---|---|
| Fact pursuit | 모순 생성 | `[data-dispute-id="..."]` | dispute aura / crack-style observation |
| Empathy approach | 방어 완화 | `[data-resonance-target="trust-a\|b"]` | trust aura / emotional cue |
| Motive search | 숨은 쟁점 접근 | `[data-dispute-id="..."]` | dispute aura / reveal-style observation |

Implementation hook: `emitInterrogationMicroVfx()` in `src/hooks/useActionDispatch.ts`.
