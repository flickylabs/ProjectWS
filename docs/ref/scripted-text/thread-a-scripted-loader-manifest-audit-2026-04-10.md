## Thread A Scripted Loader / Manifest Audit

Date: 2026-04-10  
Scope: `docs/ref/리뉴얼참고/ct-to-all-threads-20260410.md` Thread A priority 1~3

### 1. Root Cause

The observed LLM fallback in normal play was not caused by missing scripted interrogation keys.

Audit result:
- scripted cases audited: `117`
- interrogation key mismatches: `0`
- evidence_present key mismatches: `0`
- caseId normalization mismatches: `0`

Actual root cause:
- `src/data/cases/refined/manifest.json` was stale.
- It still contained `69` non-scripted generated cases.
- It was also missing `82` scripted cases.
- `src/data/cases/caseLoader.ts` still had `USE_REFINED_ONLY = false`, so general mode effectively loaded all generated cases.

That combination allowed non-renewed cases to enter normal mode and fall through to LLM fallback.

### 2. Changes Applied

#### 2-1. Scripted coverage verifier added
- [D:\ProjectWS\scripts\verify-scripted-key-coverage.cjs](D:/ProjectWS/scripts/verify-scripted-key-coverage.cjs)
- report output:
  - [D:\ProjectWS\tmp\scripted-key-coverage-report.json](D:/ProjectWS/tmp/scripted-key-coverage-report.json)

Verifier checks:
- all `party × dispute × lieState × questionType` interrogation keys
- all `party × evidence × lieBand × subjectRole` evidence_present keys
- manifest/scripted set drift

#### 2-2. Refined manifest sync script added
- [D:\ProjectWS\scripts\sync-scripted-refined-manifest.cjs](D:/ProjectWS/scripts/sync-scripted-refined-manifest.cjs)

This regenerates `src/data/cases/refined/manifest.json` from the actual scripted bundles, excluding:
- `neighbor-new-10`
- `civic-new-07`

#### 2-3. caseLoader hardened
Updated:
- [D:\ProjectWS\src\data\cases\caseLoader.ts](D:/ProjectWS/src/data/cases/caseLoader.ts)

Applied changes:
- added `SCRIPTED_SET` from `../scriptedText/*.json`
- switched `USE_REFINED_ONLY` to `true`
- filtered generated cases by:
  - not dropped
  - scripted bundle exists
  - case is in refined manifest

Result:
- general mode generated pool is now curated scripted-only

#### 2-4. Combination Lab kept optional
Updated:
- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

Applied change:
- render `CombinationLabPanel` only when `caseData.combinationLab` exists

Current authored status:
- manifest cases: `117`
- cases with `combinationLab`: `1`
  - `headline-01`
- cases without `combinationLab`: `116`

Non-authored cases continue through the old flow with no lab UI.

### 3. Verification

#### 3-1. Coverage
- [D:\ProjectWS\tmp\scripted-key-coverage-report.json](D:/ProjectWS/tmp/scripted-key-coverage-report.json)

Final result:
- scriptedCaseCount: `117`
- manifestCaseCount: `117`
- manifestOnlyCount: `0`
- scriptedOnlyCount: `0`
- missingInterrogationCaseCount: `0`
- missingEvidencePresentCaseCount: `0`
- totalMissingInterrogationKeys: `0`
- totalMissingEvidencePresentKeys: `0`

#### 3-2. Manifest
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)

Final result:
- refined count: `117`
- all refined cases have scripted bundles

#### 3-3. Build
- [D:\ProjectWS\tmp\thread-a-scripted-manifest-build-20260410.txt](D:/ProjectWS/tmp/thread-a-scripted-manifest-build-20260410.txt)

Final result:
- `npm run build:pc` passed

### 4. Interpretation

As of this fix:
- there is no evidence of `motive_search` / `empathy_approach` key mismatch in the current `117` scripted cases
- the previous fallback path is explained by non-scripted generated cases leaking into normal mode
- normal mode is now constrained to the `117` scripted cases only

### 5. Remaining Notes

- This audit covers current scripted coverage and general-mode availability.
- It does not change per-case semantic quality rules.
- `combinationLab` remains optional and authored only for `headline-01`.
