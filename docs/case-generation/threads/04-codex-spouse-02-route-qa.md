# Thread: SPOUSE_02_ROUTE_QA

Target: Codex
Role: Case QA / Route QA

## Context

`spouse-02` is a generated draft case under:

`tmp/case-generation/spouse-02/`

It has passed promotion-readiness review and is now approved only for:

`promotion-candidate-route-qa`

It is **not** approved for production registration yet. Do not copy draft files into `src/data/**` unless PROJECT_CONTROL_TOWER explicitly approves a later production promotion step.

Read these first:

- `tmp/case-generation/spouse-02/manifests/controller-review-v3-promotion-candidate.md`
- `tmp/case-generation/spouse-02/manifests/promotion-readiness-report.md`
- `tmp/case-generation/spouse-02/qa/route-simulator-adapter-spec.md`
- `tmp/case-generation/spouse-02/qa/route-manifest.simulator.json`
- `tmp/case-generation/spouse-02/manifests/coverage-parity-report.json`
- `tmp/case-generation/spouse-02/manifests/surface-leak-report.csv`

## Goal

Run route/runtime QA for `spouse-02` while keeping the case in the draft workspace.

The main question:

Can `spouse-02` move from `promotion-candidate-route-qa` to `production-mapping-candidate`?

## Required Work

1. Inspect the current route simulator and runtime QA tools:
   - `scripts/qa-route-simulator.cjs`
   - `scripts/qa-runtime-gate.cjs`
   - existing manifests under `tmp/qa-route-simulator-manifests/`
   - active production case loaders under `src/data/**`

2. Choose the safest draft QA path:
   - preferred: add a `--draft-root tmp/case-generation/spouse-02/draft` option to the route simulator, or
   - acceptable: create a temp runtime mirror under `tmp/qa-route-draft-runtime/spouse-02/`

3. Do not write `spouse-02` into production `src/data/**`.

4. Run the simulator against:
   - `tmp/case-generation/spouse-02/qa/route-manifest.simulator.json`

5. Verify especially:
   - early routes do not unlock or present `e-6`
   - early routes do not expose `h-d4` / `h-d5`
   - `e-6` only appears in `spouse02-phase5-hd4-mutual-prep`
   - `e-6` requires `e-4`, `e-5`, and `requiredLieState: S4`
   - `S0-S5` route transitions are reachable enough for the intended route
   - scriptedText and scriptedAngles route-critical lines are actually resolved, not falling back to generic placeholders
   - no new hard route findings or blocking leak findings appear

6. Re-run these checks:

```powershell
node --check scripts/generate-case-draft.mjs
node --check tmp/case-generation/spouse-02/tools/promotion-readiness-pass.mjs
npm run build:pc
```

Run any route QA commands you add or adapt, and document exact commands.

## Allowed Writes

Allowed:

- route QA adapter changes under `scripts/` if needed
- temporary QA runtime mirrors under `tmp/`
- reports under `tmp/case-generation/spouse-02/qa/`
- reports under `tmp/case-generation/spouse-02/manifests/`

Not allowed:

- `src/data/**` production promotion writes
- changing active `spouse-01`, `family-01`, or `friend-01` data
- changing generated `spouse-02` narrative content unless a route bug proves it is required

If a narrative/content bug is found, report it and stop before editing generated content.

## Required Outputs

Write:

- `tmp/case-generation/spouse-02/qa/route-qa-report.md`
- `tmp/case-generation/spouse-02/qa/route-qa-findings.csv`
- any simulator output directory or JSON summary produced by the adapted tool

The report must include:

- GO/NO-GO decision for `production-mapping-candidate`
- commands run
- files changed
- route pass/fail summary
- early `e-6` / hidden dispute exposure result
- fallback/missing scripted text result
- route hard findings count
- remaining blockers or deferred polish items

## Decision Format

Use one of:

- `GO: spouse-02 may proceed to production-mapping-candidate`
- `NO-GO: route QA blockers remain`

If GO, include a production mapping checklist, but do not perform the mapping yet.
