## Thread A Remaining 72 Run Report (2026-04-09)

### Scope
- Source handoff: `docs/ref/리뉴얼참고/ct-to-threadA-remaining-72-batch.md`
- Execution target: remaining `72` Thread-E new cases not already generated
- Execution mode: parallel batch runs using `scripts/run-parallel-case-batch.cjs`

### Batch manifests
- `scripts/manifests/thread-a-remaining-72-batch-a.json`
- `scripts/manifests/thread-a-remaining-72-batch-b.json`
- `scripts/manifests/thread-a-remaining-72-batch-c.json`
- `scripts/manifests/thread-a-remaining-72-batch-d.json`
- `scripts/manifests/thread-a-remaining-72.json`

### Result
- Batch A: completed
- Batch B: completed
- Batch C: completed
- Batch D: completed
- Aggregate result: `72 / 72 PASS`

Machine-readable aggregate:
- `tmp/thread-a-remaining-72-summary.json`

### Generator fix applied during run
- `friend-new-03` initially failed with `CRITICAL E1 meta/prompt leakage`
- Root cause: evidence-present surface text exposed the token `프롬프트`, which collided with the validator's prompt-leak rule
- Common fix applied:
  - `scripts/lib/build-pilot-scripted-bundle.cjs`
  - evidence surface replacements now sanitize prompt-like terms before dialogue generation
- After the fix, `friend-new-03` passed and Batch A was rerun successfully

### Validation standard
Every case in the remaining 72 passed all four checks:
- `runtime template`
- `scripted template`
- `semantic`
- `stage3`

Representative logs:
- `tmp/friend-new-03-stage3-validate.txt`
- `tmp/neighbor-new-01-stage3-validate.txt`
- `tmp/partnership-new-05-stage3-validate.txt`
- `tmp/workplace-new-07-stage3-validate.txt`
- `tmp/civic-new-09-stage3-validate.txt`

### Build confirmation
- `npm run build:pc` passed after the full remaining-72 execution
- Remaining output is limited to existing CSS `@import` ordering and chunk-size warnings

### Operational artifacts
- Batch summary: `tmp/pipeline-batch-status.json`
- Per-case status files: `tmp/pipeline-status/*.json`
- Per-case runner logs: `tmp/pipeline-runs/*.log`
- Per-case semantic logs: `tmp/*-semantic-validate.txt`
- Per-case final validation logs: `tmp/*-stage3-validate.txt`
