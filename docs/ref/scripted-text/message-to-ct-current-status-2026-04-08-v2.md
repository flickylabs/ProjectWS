# Message To CT - 2026-04-08 Current Status (v2)

Use this note as the current handoff baseline.

## 1. Parallel staged generation is now working
- A batch runner exists and was executed successfully:
  - `scripts/run-parallel-case-batch.cjs`
- It runs multiple case pipelines concurrently with isolated status files:
  - `tmp/pipeline-status/headline-01.json`
  - `tmp/pipeline-status/headline-02.json`
  - `tmp/pipeline-status/spouse-11.json`
- It also writes per-case stdout/stderr logs:
  - `tmp/pipeline-runs/headline-01.log`
  - `tmp/pipeline-runs/headline-02.log`
  - `tmp/pipeline-runs/spouse-11.log`
- Aggregate batch status:
  - `tmp/pipeline-batch-status.json`

## 2. Current validation state
- `headline-01`:
  - `tmp/headline-01-stage3-validate.txt` -> `summary={}` / `PASS`
- `headline-02`:
  - `tmp/headline-02-stage3-validate.txt` -> `summary={}` / `PASS`
- `spouse-11`:
  - `tmp/spouse-11-stage3-validate.txt` -> `summary={}` / `PASS`

## 3. Important clarification
- `headline-02` is the idol stalking / sasaeng pipeline.
- It was not removed; it is part of the completed parallel batch.

## 4. Shared pipeline pieces
- Shared runner core:
  - `scripts/lib/run-staged-pipeline.cjs`
  - `scripts/lib/run-scripted-validate.cjs`
- Shared headline compiler:
  - `scripts/lib/headline-spec-compiler.cjs`
  - `scripts/lib/build-headline-scripted-bundle.cjs`
- Shared headline stages:
  - `scripts/headline-stage1a-runtime.cjs`
  - `scripts/headline-stage1b-v3.cjs`
  - `scripts/headline-stage2-scripted-bootstrap.cjs`
- Case runners:
  - `scripts/headline-01-run-pipeline.cjs`
  - `scripts/headline-02-run-pipeline.cjs`
  - `scripts/spouse-11-run-pipeline.cjs`

## 5. Current limitation
- `runtime` and `V3` are now shared compilers.
- `scripted` is still partly case-shaped:
  - headline cases use the shared headline scripted entry
  - `spouse-11` still uses its dedicated stage2 generator
- The next generalization target is the spouse-style scripted generator for additional non-headline pilots.

## 6. 84-case salvage thread
- Thread-D salvage review is complete.
- Output files:
  - `docs/ref/scripted-text/thread-d-84-case-salvage-matrix.md`
  - `docs/ref/scripted-text/thread-d-84-case-salvage-top12.md`
- Immediate pilot 6:
  - `case-spouse-11`
  - `case-friend-03`
  - `case-tenant-02`
  - `case-work-11`
  - `case-partner-09`
  - `case-neighbor-08`

## 7. Where CT should look first
1. `tmp/pipeline-batch-status.json`
2. `tmp/codex-progress-status.json`
3. `tmp/headline-01-stage3-validate.txt`
4. `tmp/headline-02-stage3-validate.txt`
5. `tmp/spouse-11-stage3-validate.txt`

## 8. Status interpretation
- If chat UI looks stale, trust `tmp/pipeline-batch-status.json` first.
- Then trust the per-case status files under `tmp/pipeline-status/`.
