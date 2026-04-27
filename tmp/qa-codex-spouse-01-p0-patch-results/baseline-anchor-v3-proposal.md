# Baseline Anchor v3 Proposal — spouse-01 P0 Patch

## Proposed Anchor Policy

Do not create or bless `baseline-pre-policy-v3` in this blocked session.

Reason:

- Phase A found a root cause 4 blocker that cannot be resolved by spouse-01 caseData alone.
- No scriptedText or caseData patch was applied.
- Creating a new anchor now would normalize a known Gate hard failure (`QARG-0003`).

## Proposed Creation Point

Create baseline anchor v3 only after one of these CT decisions:

- Allow a scoped runtime/Gate fix for `evidence_investigate` response coverage, or
- Redefine Gate so `evidence_investigate` system-only discovery output is not response-required, or
- Define and wire an approved caseData field such as `investigationStages[].scriptedNpcResponses` into both runtime and Gate.

## Proposed Contents

When unblocked, v3 should capture:

- `src/data/scriptedText/spouse-01.json` after root cause 1/2/3/5 patch.
- `src/data/cases/generated/spouse-01.json` after approved root cause 4 coverage.
- `tmp/qa-codex-spouse-01-p0-patch-results/*` verification records.
- Gate output showing hard 0.
- `npm run check:all`, `npm run build:pc`, and `npx tsc -b --force` pass records.

## Rollback Rule

Keep existing v1/v2 anchors intact. v3 should be an additive recovery point after the integrated spouse-01 patch is fully verified, not a replacement for previous anchors.

