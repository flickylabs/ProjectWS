## Thread A Current New100 Level 4 Follow-up Report

- Date: `2026-04-09`
- Scope: `current new100` after `remaining72` completion and Level 4 follow-up fixes
- Manifest: [thread-a-current-new100.json](/d:/ProjectWS/scripts/manifests/thread-a-current-new100.json)
- Machine summary: [thread-a-current-new100-level4-summary.json](/d:/ProjectWS/tmp/thread-a-current-new100-level4-summary.json)

### What Was Fixed
- `callTerms.toJudge` is now normalized through a common utility so generic references and judge salutations are rejected.
  - [judge-reference-utils.cjs](/d:/ProjectWS/scripts/lib/judge-reference-utils.cjs)
- Thread-E runtime compiler now emits relationship-specific `toJudge`.
  - [thread-e-case-compiler.cjs](/d:/ProjectWS/scripts/lib/thread-e-case-compiler.cjs)
- Wave A/B runtime builder now normalizes spec-authored `toJudge` values during generation.
  - [wave-a-case-builder.cjs](/d:/ProjectWS/scripts/lib/wave-a-case-builder.cjs)
- Runtime validator now blocks generic, judge-salutation, and false-amount `toJudge` values for `*-new-*` cases.
  - [validate-runtime-template-coverage.cjs](/d:/ProjectWS/scripts/validate-runtime-template-coverage.cjs)
- Scripted generator now uses the same safe counterparty reference logic, which removed civic-category false positives such as `심사원`, `신청자`, and role labels carrying monetary tokens.
  - [build-pilot-scripted-bundle.cjs](/d:/ProjectWS/scripts/lib/build-pilot-scripted-bundle.cjs)

### Regeneration Result
- `current new100` was regenerated in four 25-case parallel batches.
- All 100 cases passed:
  - `runtime template`
  - `scripted template`
  - `semantic`
  - `stage3`
- Build smoke also passed:
  - `npm run build:pc`

### Level 4 Follow-up Checks
- `callTerms.toJudge`
  - Total values checked: `200`
  - Unique values: `132`
  - Generic or judge-like values: `0`
- `a|d-1|S0|fact_pursuit` first variant
  - Total cases checked: `100`
  - Unique first variants: `100`
  - Result: case-specific dispute/evidence context is now reflected in the first interrogation variant

### Batch Evidence
- Latest batch status: [pipeline-batch-status.json](/d:/ProjectWS/tmp/pipeline-batch-status.json)
- Representative validation logs:
  - [civic-new-01-stage3-validate.txt](/d:/ProjectWS/tmp/civic-new-01-stage3-validate.txt)
  - [civic-new-04-stage3-validate.txt](/d:/ProjectWS/tmp/civic-new-04-stage3-validate.txt)
  - [friend-new-02-stage3-validate.txt](/d:/ProjectWS/tmp/friend-new-02-stage3-validate.txt)
  - [workplace-new-02-stage3-validate.txt](/d:/ProjectWS/tmp/workplace-new-02-stage3-validate.txt)

### Conclusion
- The Level 4 follow-up issues raised from the 28-case sample are resolved on the full `current new100` set.
- No additional full-regeneration pass is currently required on this axis.
