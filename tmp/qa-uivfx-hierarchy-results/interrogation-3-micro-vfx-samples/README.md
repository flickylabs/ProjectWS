# Interrogation 3 Micro VFX Samples

These samples describe the implemented runtime mapping. They use existing aura/resonance infrastructure and do not add a new cutscene.

| Interrogation | Runtime label | Visual target | Existing VFX reused |
|---|---|---|---|
| Fact pursuit | 모순 생성 | `[data-dispute-id="..."]` | dispute aura / crack-style observation |
| Empathy approach | 방어 완화 | `[data-resonance-target="trust-a|b"]` | trust aura / red-gold emotional cue |
| Motive search | 숨은 쟁점 접근 | `[data-dispute-id="..."]` | dispute aura / reveal-style observation |

Implementation hook: `emitInterrogationMicroVfx()` in `src/hooks/useActionDispatch.ts`.
