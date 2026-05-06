# 84 Scripted Text Rollout Plan

Updated: 2026-04-07

## Current State

- `spouse-01` is validator-clean.
- `src/data/cases/generated` contains 84 case JSON files.
- `src/data/scriptedText` currently contains 1 completed bundle: `spouse-01.json`.
- Deterministic channel drafts were generated for all 84 cases under `docs/ref/scripted-text/deterministic-drafts/`.
- Full scaffolds were generated for all 84 cases under `docs/ref/scripted-text/full-scaffolds/`.
- `node scripts/inventory-scripted-text-inputs.cjs` confirms:
  - case JSON: 84/84
  - v3 game loop JSON: 84/84
  - dossier JSON: 77/84
  - evidence JSON: 77/84

## Missing Secondary Inputs

- Missing dossier JSON: `family-01`, `friend-01`, `neighbor-01`, `partnership-01`, `spouse-01`, `tenant-01`, `workplace-01`
- Missing evidence JSON: `family-01`, `friend-01`, `neighbor-01`, `partnership-01`, `spouse-01`, `tenant-01`, `workplace-01`
- These 7 cases still have v3 game loop JSON, so coverage extraction is not blocked. The gap is in extra packaged review inputs, not the base case data.

## Scriptable Now

- Coverage manifests
  - `interrogation`: parties, disputes, lie states, question types
  - `evidence_present`: parties, evidence ids, lie bands
  - `dossier`: question ids from v3 game loop / dossier data
  - `witness`: witness ids from `duo.socialGraph`
  - `aftermath`: fixed result classes
  - `system_message`: fixed context/event key set

- Key and variant id generation
  - Every channel key can be generated deterministically from case data and the scripted text schema.

- Input inventory and path resolution
  - Case JSON, v3 game loop JSON, dossier/evidence sidecar JSON lookup can be automated.

- Low-risk deterministic text
  - `system_message` can be generated from a fixed template set.
  - `aftermath` can be generated from result class plus case solution labels.
  - Witness baseline scaffolds can be generated from `socialGraph` metadata, then reviewed.

## LLM-Or-Manual Required

- `interrogation`
  - Highest sensitivity channel.
  - Requires lie-state disclosure control, speaker-specific phrasing, relationship-aware honorifics, and pairwise variant separation.

- `evidence_present`
  - Requires evidence-specific reaction, disclosure throttling, and subject-role-aware framing.
  - Template-only output risks sounding mechanical and repetitive.

- `dossier`
  - Requires a direct answer to each dossier question while preserving unlock timing and role consistency.
  - The question text alone is not enough to guarantee natural, immersive answers without generation or human rewrite.

- `witness`
  - `vague` and some `partial` lines are scriptable with templates.
  - `full` depth testimony should still be treated as LLM-or-manual because tone, certainty, and bias handling matter.

## Recommended Production Split

- Deterministic generator
  - Coverage manifest
  - Key creation
  - Variant id creation
  - `system_message`
  - `aftermath`
  - witness draft scaffolds

- Case-writing queue
  - `interrogation`
  - `evidence_present`
  - `dossier`
  - witness final polish

## Execution Order

1. Lock `spouse-01` as the reference baseline.
2. Generate inventory and scaffold metadata for all 84 cases.
3. Expand by user-requested order:
   - `spouse-02` to `spouse-12`
   - `family-01` to `family-12`
   - `friend-01` to `friend-12`
   - `neighbor-01` to `neighbor-12`
   - `partnership-01` to `partnership-12`
   - `tenant-01` to `tenant-12`
   - `workplace-01` to `workplace-12`
4. For each case:
   - build scaffold
   - write high-sensitivity channels
   - run `node tests/validate-scripted-text.cjs --case <caseId>`
5. After each category:
   - run a category sweep
   - keep `CRITICAL`, `ERROR`, `FAIL` at zero

## Files To Watch

- Inventory:
  - `docs/ref/scripted-text/84-scripted-text-input-inventory.md`
  - `docs/ref/scripted-text/84-scripted-text-input-inventory.json`

- Open risks and workarounds:
  - `docs/ref/scripted-text/codex-scripted-text-issues.md`

- Validation entrypoint:
  - `tests/validate-scripted-text.cjs`
