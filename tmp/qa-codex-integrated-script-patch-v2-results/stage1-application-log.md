# Stage 1 Application Log

- Date: 2026-04-27
- Worktree: `D:\ProjectWS-stage1`
- Branch: `main`
- Input: `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json`
- Scope: P0-evidence-stage-gate Stage 1 application

## Application

- Patch packet items: 122
- Applied packet items: 122
- Actual content drift: 0
- Skipped items: 0
- Resolver note: `src/data/cases/generated/family-01.json:evidence.e-6.investigationStages.1.question.text` was resolved as `investigationStages` item with `stage: 1`, matching the packet original text. Treating `.1` as array index would point at stage 2 and falsely report drift.
- Post-gate correction: `QARG-00589` packet patched `src/data/cases/generated/spouse-01.json:evidence.e-3.partyContext.b.implication` to `형과의 새벽 통화였다.`, which still matched the evidence `descriptionTruth` lexeme `형과의 새벽 통화`. The field was lowered to the surface-safe wording `같은 번호와 반복 통화였다.`.

## Applied Counts

By file:

- `src/data/cases/generated/family-01.json`: 13
- `src/data/cases/generated/friend-01.json`: 9
- `src/data/cases/generated/spouse-01.json`: 9 packet items + 1 post-gate correction
- `src/data/disclosurePolicy/family-01.json`: 6
- `src/data/disclosurePolicy/friend-01.json`: 5
- `src/data/scriptedText/family-01.json`: 41
- `src/data/scriptedText/friend-01.json`: 38
- `src/data/scriptedText/spouse-01.json`: 1

By field:

- `text`: 79
- `behaviorHint`: 1
- `description`: 8
- `partyContext.implication`: 11 packet items + 1 post-gate correction
- `partyContext.questionAngle`: 1
- `investigationResults.request_original`: 2
- `investigationStage.question.text`: 1
- `v3DepthPlan.summary`: 3
- `surfaceName`: 9
- `surfaceDescription`: 5
- `discoveryText.surfaceFallback`: 2

## Runtime Gate

Baseline from `HEAD:tmp/qa-runtime-gate-results/findings.json`:

- total findings: 1914
- severity: P0 243, P1 1048, P2 623
- `P0-evidence-stage-gate`: 122
- `P0-disclosure-gate`: 98
- `P0-surface-name-gate`: 23

After `node scripts/qa-runtime-gate.cjs`:

- total findings: 1757
- severity: P0 87, P1 1048, P2 622
- `P0-evidence-stage-gate`: 0
- `P0-disclosure-gate`: 87
- `P0-surface-name-gate`: 0
- total finding delta: -157

## Verification

- Pre-application `npm run check:all`: PASS, hard 0, existing warnings only.
- Pre-application `npm run build:pc`: PASS after `npm ci` installed missing worktree dependencies.
- Pre-application `npx tsc -b --force`: PASS.
- Post-application `node scripts/qa-runtime-gate.cjs`: PASS, `P0-evidence-stage-gate` 122 -> 0.
- Post-application dirty-tree `npm run check:all`: expected FAIL at `v3-stage-aware` 79 hard because that checker compares ScriptedText changes against `HEAD` while the worktree is dirty. This repo behavior is documented in `tmp/CODEX-MAIN-HANDOFF-20260427-TIER3-PHASE0.md`.
- Post-application `npm run build:pc`: PASS.
- Post-application `npx tsc -b --force`: PASS.

