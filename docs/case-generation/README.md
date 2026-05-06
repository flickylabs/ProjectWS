# Case Generation Status

The old bulk case generation pipeline is archived. Do not run archived generator scripts directly against current runtime data without first reviewing and updating the pathway.

## Current Source Of Truth

- Runtime cases: `src/data/cases/generated/`
- Scripted text: `src/data/scriptedText/`
- Mediation dialogue: `src/data/dialogues/mediation/`
- Disclosure policy: `src/data/disclosurePolicy/`
- QA manifests: `tmp/qa-runtime-gate-manifests/` and `tmp/qa-route-simulator-manifests/`

## Current Validation

```powershell
npm run build:pc
npm run check:policy
npm run check:sync
```

`check:policy` runs the free interrogation policy corpus. `check:sync` runs `qa:fast`, which covers the static runtime gate and route simulator.

## Archived Generator Material

Historical generator scripts, prompt batches, GPT Pro request packets, and reference inputs were moved to:

- `docs/LEGACY/20260506-pre-steam-cleanup/scripts/`
- `docs/LEGACY/20260506-pre-steam-cleanup/ref/`
- `docs/LEGACY/20260506-pre-steam-cleanup/prompts/`
- `docs/LEGACY/20260506-pre-steam-cleanup/gpt-pro-request/`
- `docs/LEGACY/20260506-pre-steam-cleanup/gpt-pro-requests/`

The archived scripts include the previous pipeline runners and assemblers. They are preserved for reference only.

## Rule For Future Generator Work

Before generating new production case data:

1. Write a new current generator design in this folder.
2. Use a new script under `scripts/` with explicit input and output paths.
3. Keep generated drafts in `tmp/` until reviewed.
4. Validate with `npm run build:pc`, `npm run check:policy`, and `npm run check:sync`.
5. Only then move approved data into `src/data/**`.

Avoid restoring the archived generators as-is. Several were tied to obsolete channel counts, stale `docs/ref` inputs, or one-off GPT Pro sessions.
