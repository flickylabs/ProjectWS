# Q3 Static QA Suite

Date: 2026-05-20 KST  
Worktree: `D:/solomon-q3-regression-qa`  
HEAD: `2f2785f07a41de7802e4ec244f3639cdc97e89e7`

## Entry Check

- `git pull`: FAIL. Branch `codex/q3-regression-qa` has no upstream tracking branch. Follow-up `git fetch origin --prune` succeeded, but `origin/codex/q3-regression-qa` was not present.
- Tracked dirty files at entry: 0.
- `node_modules` was absent. Ran `npm ci` before re-running the suite so browser/tsc/lint checks could execute.

## Results

| Order | Command | Result | Finding Count | Notes |
|---:|---|---|---:|---|
| 1 | `npm run qa:fast` | FAIL | 1,522 | `RELEASE BLOCK`; static total 1,489, route total 33, P0 0. Blocked by missing final tags: `baseline-pre-policy-v3-stage1`, `baseline-pre-policy-v3-stage2`, `baseline-pre-policy-v3`. |
| 2 | `npm run qa:deep` | FAIL | 3,361 + 1 browser failure | `DEEP BLOCK`; fast total 1,522 P0 0, exhaustive route findings 1,839 P0 0, browser status FAIL. Browser failure: telemetry consent modal intercepted click on `.pc-home-v2__mode-grid button:not([disabled])`. |
| 3 | `npm run qa:lqa` | FAIL | 60,004 | Translation verifier failed: empty translation 36,920; English length spike 16,612; literal English noun phrase 75; cross-batch inconsistency 1,782; Japanese particle anomaly 4,067; Chinese Korean word order 516; person-name divergence 32. Because the npm script uses `&&`, truth-leak detection did not run in this command. |
| 4 | `npm run qa:cutscene -- --strict` | PASS | 111 | P0 0, P1 111. 14/14 cutscene files present. |
| 5 | `npm run qa:free-interrogation` | PASS | 0 | Policy corpus passed: 45 cases. |
| 6 | `npx tsc -b --force` | PASS | 0 | No compiler output. |
| 7 | `npm run lint` | FAIL | 161 | 2 errors, 159 warnings. Errors: unused `portraitAlt` in `src/components/discovery/TruthRevealCutscene.tsx:57`; unused `manualCloseOnly` in `src/components/pc/feedback/EventFeedbackCard.tsx:699`. |

## Supplemental

Because `npm run qa:lqa` stopped before truth-leak detection, I ran `node scripts/detect-truth-leak.cjs --strict` as a supplemental check. Result: PASS, truth leak findings 0 across ko/en/ja/zh-CN.

