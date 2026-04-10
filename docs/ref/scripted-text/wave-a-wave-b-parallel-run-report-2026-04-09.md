# Wave A / Wave B Parallel Run Report (2026-04-09)

## Summary

- Wave A 10:
  - `workplace-new-02` was already approved and remained PASS.
  - Remaining 9 were executed in parallel.
  - Initial failures: `civic-new-10`, `spouse-new-06`, `online-new-05`
  - Fix: non-monetary evidence label pollution in generic scripted builder
  - Final status: all Wave A 10 PASS

- Wave B 10:
  - Executed in parallel after Wave A.
  - Initial failure: `civic-new-07`
  - Fix: generic evidence label selection now filters generic stopwords and keeps evidence-direct keywords
  - Final status: all Wave B 10 PASS

## Generator Changes

- Generic Thread-E parser:
  - `scripts/lib/thread-e-case-parser.cjs`
- Generic Thread-E compiler:
  - `scripts/lib/thread-e-case-compiler.cjs`
- Generic runner already used by batch:
  - `scripts/generic-case-run-pipeline.cjs`
- Generic scripted builder fixes:
  - `scripts/lib/build-pilot-scripted-bundle.cjs`

## Wave A Cases

- `workplace-new-02`
- `tenant-new-01`
- `civic-new-10`
- `partnership-new-10`
- `spouse-new-06`
- `neighbor-new-03`
- `online-new-05`
- `professional-new-01`
- `friend-new-08`
- `family-new-04`

## Wave B Cases

- `spouse-new-03`
- `family-new-02`
- `friend-new-01`
- `neighbor-new-10`
- `partnership-new-01`
- `tenant-new-10`
- `workplace-new-10`
- `online-new-06`
- `professional-new-10`
- `civic-new-07`

## Verification

- Latest batch status:
  - `tmp/pipeline-batch-status.json`
- Per-case validate logs:
  - `tmp/*-runtime-template-validate.txt`
  - `tmp/*-scripted-template-validate.txt`
  - `tmp/*-semantic-validate.txt`
  - `tmp/*-stage3-validate.txt`

All Wave A / Wave B cases now pass runtime template, scripted template, semantic, and stage3 validation.
