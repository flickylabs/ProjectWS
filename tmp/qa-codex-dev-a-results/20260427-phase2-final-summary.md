# Codex-Dev A Phase 2 Final Summary

## 1. HEAD
- Final HEAD: `acf5d27bd45fe8a43d03c0d2a35b16ad1ae6dfa8`
- Base HEAD at start: `4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface`

## 2. Scope
- Phase 2.A-2: UI surface/deepInvestigated stabilization.
- Phase 2.A-3: archetype label helper + 6 active Korean mappings.
- Phase 2.A-1: ScriptedText 23-entry P1 stabilization.
- Out of scope untouched: wrapper scripts, whitelist, policy docs/JSON, Dev-B runtime guard files, baseline-v1 anchor.

## 3. Commands Run
- Start gate: `git status --short --branch`, `git log --oneline -1`, tracked clean check, `npm run check:all`.
- A-2/A-3 verification: `npm run build`, `npx tsc -b --force`, `git diff --check`.
- A-1 guard: `git diff --name-only`, per-case diff ID extraction with `Select-String`, exact Node validation.
- A-1 dirty check: `npm run check:all` expected FAIL with `v3-stage-aware 8 hard`.
- A-1 post-commit/final: `npm run check:all` PASS.
- Tag: `git tag -a baseline-pre-policy-v2 ...`.

## 4. Commit SHA List
- A-2/A-3 commit: `2e527bd430f303efa884732309357fe37efde7bd`
- A-1 commit / final HEAD: `acf5d27bd45fe8a43d03c0d2a35b16ad1ae6dfa8`

## 5. baseline-pre-policy-v2 Tag
- Tag name: `baseline-pre-policy-v2`
- Tag object SHA: `c0c8d14af12e9ee213f7f742c620f58a883d5781`
- Tag target commit: `acf5d27bd45fe8a43d03c0d2a35b16ad1ae6dfa8`
- Message: `tier-3 guard hardening + P1 stabilization patch — baseline v2 (HEAD-based wrapper, ScriptedText 23 entries 정정)`
- Push not performed per instruction.

## 6. Final npm run check:all
- PASS.
- `run-all-checks.cjs`: `v3-stage-aware 0 hard / 14931 variants`, overall `9/9 hard pass`.
- `policy-vs-data-cross-check.cjs`: PASS, `0 hard issues, 157 warnings`.
- `policy-md-json-sync-check.cjs`: PASS, `0 sync issues`.

## 7. Working Tree
- Tracked files: clean.
- `git status --short --branch`: `## main...origin/main [ahead 4]` plus expected untracked `tmp/REQUEST-*`, `tmp/qa-*`, and result directories.

## 8. 23 Entries 9-D Verification
- Exact changed set: 23/23 requested variants.
- Only `text` fields changed; `id`, `tags`, `behaviorHint`, `sourceRefs`, and structure unchanged.
- Truth-leak phrases were abstracted while preserving archetype voice, lieState gate, question dimension, speaker register, behaviorHint alignment, and scope.
- Dirty-tree hard fail was expected under HEAD-based wrapper; post-commit baseline PASS confirms no final regression.

## 9. UI 28 Path / Helper 6 Path
- UI surface/deepInvestigated paths changed in `ActionPanel`, `DossierCardPanel`, `DossierHint`, `EvidenceAppraisalModal`, `EvidenceBoard`, `DiscoveryFeedbackWatcher`, `PCActionsPanel`, `PCRightPanel`, `EvidenceLegality`, and `DisputeBoard`.
- Archetype helper: `src/utils/archetypeLabel.ts`.
- A-3 helper use paths: `PartyStatusBar`, `CourtHeader`, `PCCaseBrief`, `Phase0_CaseIntro`.
- Active mapping: `avoidant`, `victim_cosplay`, `confrontational`, `affect_flattening`, `cold_logic`, `premature_summary`; fallback `기타`.

## 10. Report Files
- `tmp/qa-codex-dev-a-results/20260427-spike-baseline-handling.md`
- `tmp/qa-codex-dev-a-results/20260427-phase2-A-2-A-3-summary.md`
- `tmp/qa-codex-dev-a-results/20260427-phase2-A-1-summary.md`
- `tmp/qa-codex-dev-a-results/20260427-phase2-final-summary.md`

## 11. Known Finding vs New Finding
- Known: policy-vs-data warnings remain 157 baseline-known warnings.
- Known: Vite chunk-size warning during build.
- New out-of-scope finding: none.

## 12. Baseline Regression
- `baseline-pre-policy-v1` / `a10b801` untouched.
- New operational baseline tag `baseline-pre-policy-v2` created at A-1 commit after PASS.
