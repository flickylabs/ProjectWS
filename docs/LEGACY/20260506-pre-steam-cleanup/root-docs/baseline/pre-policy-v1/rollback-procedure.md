# Tier 0 Baseline Rollback Procedure

## Baseline

- Baseline name: `baseline-pre-policy-v1`
- Baseline target SHA: `a10b801`
- Full SHA: `a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`
- Scope: active 3 cases only (`spouse-01`, `family-01`, `friend-01`)
- Purpose: restore the last verified pre-policy state if Tier 1+ policy, validation, or runtime work causes regressions.

## Rollback Conditions

Rollback is required or should be considered when any of these occur:

- Any active ScriptedText checksum differs from `scripted-text-checksum.json` without an approved change.
- Any active case data checksum differs from `case-data-checksum.json` without an approved change.
- `truth-leak-snapshot.json` no longer reproduces 0 leaks.
- Any required precheck in `precheck-snapshot.json` fails.
- User spot check finds a regression in truth disclosure, Q-A coherence, lieState flow, evidence unlock timing, or core case facts.
- User explicitly asks to return to the baseline state.

## Option 1: Partial Restore

Use this when only one case file or one data area regressed.

```bash
git checkout a10b801 -- src/data/scriptedText/<case-id>.json
git checkout a10b801 -- src/data/cases/generated/<case-id>.json
node tmp/detect-truth-leak.cjs
```

After restoring, rerun the relevant prechecks and compare the restored file checksum with the baseline snapshot.

## Option 2: Active Data Restore

Use this when multiple active case data files regressed.

```bash
git checkout a10b801 -- src/data/scriptedText/spouse-01.json
git checkout a10b801 -- src/data/scriptedText/family-01.json
git checkout a10b801 -- src/data/scriptedText/friend-01.json
git checkout a10b801 -- src/data/cases/generated/spouse-01.json
git checkout a10b801 -- src/data/cases/generated/family-01.json
git checkout a10b801 -- src/data/cases/generated/friend-01.json
node tmp/detect-truth-leak.cjs
```

When Tier 2 quality wrappers exist, also run:

```bash
npm run check:all
```

## Option 3: Full Reset

Use only as a last resort after saving current work.

```bash
git tag emergency-pre-rollback-YYYYMMDD-HHMM
git reset --hard baseline-pre-policy-v1
```

This resets the repository to the exact baseline commit. Any uncommitted work must be stashed or committed before running this.

## Post-Rollback Verification

After any rollback:

1. Recalculate checksums for restored active files.
2. Confirm they match `scripted-text-checksum.json` and `case-data-checksum.json`.
3. Run `node tmp/detect-truth-leak.cjs` and confirm 0 leaks.
4. Rerun the required prechecks or `npm run check:all` once Tier 2 exists.
5. Record the rollback reason and restored files in the working notes.

## Dirty Worktree Handling

The pre-baseline dirty file was stashed before Tier 0:

```bash
stash@{0}: On main: pre-baseline-tier0: CT-NEXT-START-MESSAGE preserved for post-baseline commit
```

After Tier 0 is reviewed and accepted, decide whether to:

- restore and commit `tmp/CT-NEXT-START-MESSAGE.md`,
- keep it stashed,
- or intentionally discard it after user approval.

Do not mix the stashed CT handoff change into baseline artifacts.
