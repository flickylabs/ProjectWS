# 14-CODEX-DEV-TRACK-B-RESULT

Codex-Dev Track B implementation result.

## Baseline / Entry

- Worktree: `D:/ProjectWS-main-temp`
- HEAD at entry: `ff3f9a1 docs(handoff): mark spouse-01 integrated patch request as superseded`
- Baseline tags present: `baseline-pre-policy-v3`, `baseline-pre-policy-v3-stage1`, `baseline-pre-policy-v3-stage2`
- Tracked state before entry: clean; untracked packet/baseline artifact dirs preserved

## Diff Surface

- `scripts/qa-route-simulator.cjs`
- `tmp/qa-thread-guides/01-THREAD-GUIDE-COMMON.md`
- `tmp/qa-thread-guides/02-NORMAL-GUIDE.md`
- `tmp/qa-thread-guides/03-EXHAUSTIVE-GUIDE.md`
- `tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md`
- `tmp/qa-thread-guides/14-CODEX-DEV-TRACK-B-RESULT.md`

## Simulator Items

### S1 Combination Gate Runtime Parity

- Added simulator-side runtime parity gate for `evidence_combine`: evidence inputs must be unlocked and fully investigated.
- Added `--allow-impossible-states` opt-in flag. Default exhaustive excludes impossible stage-0 combinations.
- Manifest combine actions that fail parity are skipped and recorded in `manifest_validation_findings.json` as `combination_runtime_unreachable`.
- Validation:
  - `spouse-01-normal`: 3 manifest validation findings.
  - `family-01-normal`: `combine-2` / `combine-3` skipped for uninvestigated inputs.
  - `friend-01-normal`: `combine-1` / `combine-7` skipped for uninvestigated inputs.
  - `family-01-exhaustive`: `evidence_combine` action count = 0 under default parity gate; bad stage-0 combine count = 0.
  - `family-01-impossible-smoke --allow-impossible-states`: stage-0 combines reappear (`combine-1`, `combine-11`), confirming opt-in behavior.

### S2 Target-Aware Judge Selector

- Updated simulator `pickEntry` path to score judge variants by `tags.targetParty`.
- Mismatched targetParty variants are down-scored; explicit mismatched variant ids fall back to the best target-aware variant.
- Added QA annotations for no-target or mismatched target selection cases.
- Validation: inspected generated traces across spouse/family/friend normal and family exhaustive; judge `targetPartyTag` mismatch count = 0.

### S3 Facsimile Output Separation

- Added per-trace `playerTranscript` and `qaAnnotations`.
- Markdown transcripts now render separate `### Player` and `### QA Annotations` blocks.
- Raw ids, route/action JSON, state deltas, manifest prompts, skipped gate messages, `Analysis note`, `Witness summoned:`, `Discovery event applied`, and `Emergence event opened` are QA annotations only.
- Validation: searched generated playerTranscript blocks across validation dirs; facsimile/raw-id bad count = 0.

### S4 Witness Flow / Scope Validation

- Added manifest witness validation for:
  - witness question before summon
  - witness related dispute mismatch
  - route-domain / witness-knowledge mismatch
- Invalid witness actions are skipped from player transcript and recorded in `manifest_validation_findings.json`.
- Validation:
  - `family-01-normal`: notary route `w-1` / `d-2` mismatch recorded.
  - `friend-01-normal`: contact-log `w-1` scope mismatch and question-before-summon recorded.
  - Additional existing manifest order/domain issues were recorded as warnings without editing manifests.

### S5 Disclosure Policy Modeling

- No code change. `12-REQUEST-CODEX-DEV-TRACK-B.md` scoped this round to S1, S2, S3, S4, and S6 only.
- Deviation: S5 remains deferred to the later simulator policy-modeling round described in doc 11/10.

### S6 Detector Severity Tuning

- Reclassified `evidence_investigate_no_npc_followup` severity from `P1` to `observability`.
- Counts remain present in `findings.json`; detector category is unchanged.
- Validation:
  - `spouse-01-normal`: `{"observability":4}`
  - `family-01-normal`: `{"observability":2}`
  - `friend-01-normal`: `{"observability":3}`
  - `family-01-exhaustive`: `{"observability":401}`

## Guide Items

### G1 Finding Axis

- Added `## Finding Axis (D/R/S/N)` to `01-THREAD-GUIDE-COMMON.md`.

### G2 Transcript Interpretation Rule

- Added `### Transcript Interpretation Rule` under detector handling in `01-THREAD-GUIDE-COMMON.md`.

### G3 Normal vs Exhaustive Split

- Added `## Interpretation Rule` to `02-NORMAL-GUIDE.md`.
- Added `## Interpretation Rule` to `03-EXHAUSTIVE-GUIDE.md`.
- Added one-line cross-reference to `01-THREAD-GUIDE-COMMON.md`.

### G4 Detector Count Rule

- Added `### Detector Count Rule` to `01-THREAD-GUIDE-COMMON.md`.

### G5 Duplicate / Conflict Merge Protocol

- Added `## Duplicate / Conflict Merge Protocol` to `04-CT-INSTRUCTIONS.md`.

### G6 Browser Spot Check Criteria

- Added `### Browser Spot Check Criteria` to `01-THREAD-GUIDE-COMMON.md`.

### G7 Thread Operation Simplification

- Added `## Thread Operation Simplification` to `04-CT-INSTRUCTIONS.md`.
- Confirmed no `06-THREAD-OPERATION.md` was created.

## Validation Commands

- `node --check scripts/qa-route-simulator.cjs` PASS
- `node scripts/qa-route-simulator.cjs --case spouse-01 --result-dir tmp/codex-dev-track-b/spouse-01-normal` PASS: routes 4, actions 24, findings 10, hard 3
- `node scripts/qa-route-simulator.cjs --case family-01 --result-dir tmp/codex-dev-track-b/family-01-normal` PASS: routes 4, actions 20, findings 9, hard 2
- `node scripts/qa-route-simulator.cjs --case friend-01 --result-dir tmp/codex-dev-track-b/friend-01-normal` PASS: routes 4, actions 20, findings 13, hard 3
- `node scripts/qa-route-simulator.cjs --exhaustive --case family-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/codex-dev-track-b/family-01-exhaustive` PASS: routes 480, actions 1156, findings 544, hard 143
- `node scripts/qa-route-simulator.cjs --exhaustive --case family-01 --max-depth=1 --max-states=40 --max-routes=80 --max-actions-per-state=80 --allow-impossible-states --result-dir tmp/codex-dev-track-b/family-01-impossible-smoke` PASS
- `npx tsc -b --force` PASS after `npm ci`
- `npx eslint scripts/qa-route-simulator.cjs` PASS
- `npm run build:pc` PASS
- `npm run lint` FAILS on pre-existing repo-wide lint errors outside this Track B surface; targeted simulator lint passed.

## Deviations / Notes

- `npm ci` was required because local dependencies were not installed; `node_modules/` is ignored.
- `npm run lint` remains red due existing unrelated lint debt in docs, src, `.codex-tmp`, and tmp snapshots.
- No Track A data/runtime files were edited.
- `tmp/qa-route-simulator-manifests/*.json` contents were not changed.
- Warmup baseline dirs `tmp/qa-warmup-packet/` and `tmp/qa-warmup-trial/` were not regenerated.
