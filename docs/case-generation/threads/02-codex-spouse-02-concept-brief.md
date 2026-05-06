# Thread: CASE_GENERATOR_REBUILD - spouse-02 Concept Brief

Target: Codex

You are continuing the Korean-first case generator work for Project_Solomon.

## Controller Context

The main coordination thread is `PROJECT_CONTROL_TOWER`.

Controller decisions:

- Relationship type: `spouse`
- Production case ID: `spouse-02`
- Draft workspace ID: `spouse-02`
- Source language: Korean first
- Do not write production files under `src/data/**`
- Keep all draft outputs under `tmp/case-generation/spouse-02/`
- Do not add `spouse-02` to `src/data/cases/refined/manifest.json`
- Do not generate translated content
- Do not regenerate or edit existing active cases

Read:

- `docs/case-generation/spouse-02-controller-plan.md`
- `docs/case-generation/current-generator-design.md`
- `docs/case-generation/pilot-case-generation-plan.md`
- `docs/case-generation/pilot-case-brief-template.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `src/data/cases/generated/spouse-01.json`

## Goal For This Step

Do not generate full runtime data yet.

Create a concept/design packet for `spouse-02` so the controller can choose the direction before detailed generation.

## Required Output Files

Create these under `tmp/case-generation/spouse-02/input/`:

1. `concept-options.md`
2. `selected-concept-brief.md`

Also create or update:

3. `tmp/case-generation/spouse-02/README.md`

If the draft workspace does not exist yet, you may run:

```powershell
node scripts/generate-case-draft.mjs --case-id spouse-02 --relationship spouse --brief docs/case-generation/pilot-case-brief-template.md --out tmp/case-generation
```

Do not use `--force` unless the existing files are only generator scaffolds and you have inspected them.

## Concept Requirements

Create 3 distinct spouse-case concepts in Korean.

Each concept must include:

- Working title
- One-line premise
- Core misunderstanding
- Anchor truth
- Emotional bait
- Resolution dilemma
- Why Party A sounds plausible
- Why Party B sounds plausible
- 4-5 dispute candidates
- 5-7 evidence candidates
- 3 witness candidates
- Hidden truth lexemes
- Surface aliases
- Why it is distinct from `spouse-01`
- Localization risk notes
- Sensitivity risk notes
- Recommended difficulty

Then recommend one concept and explain why.

## Constraints

- Do not make the case a copy of `spouse-01`.
- Avoid extreme criminality, minors as direct victims, graphic abuse, or topics that create unnecessary ratings/platform risk.
- The case must be solvable through evidence and questioning.
- The case must support fair responsibility allocation, not a single obvious villain from the first minute.
- The anchor truth must be hidden but discoverable.
- The initial surface story must be plausible but incomplete.
- Do not reveal hidden truth in surface aliases.

## Output Format

`concept-options.md`:

```markdown
# spouse-02 Concept Options

## Option A. <title>
...

## Option B. <title>
...

## Option C. <title>
...

## Recommendation
...
```

`selected-concept-brief.md`:

Use `docs/case-generation/pilot-case-brief-template.md` as the structure, but fill only sections that can be filled at concept stage.

Leave unknown detailed fields as `TBD`, not invented filler.

## Validation

After writing files, run:

```powershell
node --check scripts/generate-case-draft.mjs
npm run build:pc
```

If these are blocked or too slow, report it.

## Final Response

Report:

- Files created/modified.
- The 3 concept titles.
- Recommended option.
- Validation results.
- Questions for `PROJECT_CONTROL_TOWER`.
