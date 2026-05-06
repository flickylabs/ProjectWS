Thread A update for `ct-to-all-threads-20260410.md`:

1. `scripted` key matching was audited across the current `117` scripted cases and the result is clean.
- interrogation key mismatches: `0`
- evidence_present key mismatches: `0`
- caseId normalization mismatches: `0`

2. The actual fallback cause was manifest/caseLoader drift, not missing `motive_search` / `empathy_approach` keys.
- stale refined manifest contained `69` non-scripted cases
- `82` scripted cases were missing from refined manifest
- `caseLoader.ts` still had `USE_REFINED_ONLY = false`

3. Fixes applied:
- added scripted coverage verifier
  - [D:\ProjectWS\scripts\verify-scripted-key-coverage.cjs](D:/ProjectWS/scripts/verify-scripted-key-coverage.cjs)
- added manifest sync script
  - [D:\ProjectWS\scripts\sync-scripted-refined-manifest.cjs](D:/ProjectWS/scripts/sync-scripted-refined-manifest.cjs)
- regenerated refined manifest to the actual scripted set
  - [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)
- hardened `caseLoader.ts` so general mode only loads curated cases with scripted bundles
  - [D:\ProjectWS\src\data\cases\caseLoader.ts](D:/ProjectWS/src/data/cases/caseLoader.ts)

4. `combinationLab` stays optional.
- only `headline-01` currently has authored lab data
- `DisputeBoard.tsx` now only renders the lab panel when `caseData.combinationLab` exists

5. Verification:
- coverage report: [D:\ProjectWS\tmp\scripted-key-coverage-report.json](D:/ProjectWS/tmp/scripted-key-coverage-report.json)
- build log: [D:\ProjectWS\tmp\thread-a-scripted-manifest-build-20260410.txt](D:/ProjectWS/tmp/thread-a-scripted-manifest-build-20260410.txt)
- `npm run build:pc` passed

Detailed write-up:
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-scripted-loader-manifest-audit-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-scripted-loader-manifest-audit-2026-04-10.md)
