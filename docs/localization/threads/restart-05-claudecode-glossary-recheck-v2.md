# Thread: THREAD_05 Recheck v2

Target: ClaudeCode

This is a limited re-check request after Codex applied the Thread-05 recheck v1 follow-up patches.

## Applied By Codex

- Thread-05 recheck recommendations:
  - `lie_state` cluster aligned to the Codex schema.
  - `emotion_defensive` and `emotion_angry` aligned to Codex values.
  - Added `verdict_step_fact_finding`, `verdict_step_resolution`, and `verdict_step_decision` glossary disambiguator rows.
  - Added/updated responsibility usage notes.
- Migrated remaining sibling component labels toward i18n:
  - `PCCourtLayout`
  - `PCActionsPanel`
  - `PCInteractionPanel`
  - `PCRecordSummary`
  - `ArchetypeTag`
  - `hotbarHighlight`
- Confirmed compact alias call sites:
  - `PCBottomDock` already uses `.compact` keys for hotbar slots and special actions.

## Validation Already Run

- `npm run localization:glossary` PASS
- `npm run build:pc` PASS
- `npm run check:all` PASS
- `npm run build` PASS
- `npm run localization:scripts:validate` PASS
  - KO fallback warnings for missing script sidecars are expected at this stage.

## Limited Recheck Scope

Do not rerun the entire earlier audit. Check only:

1. New/changed layout/action/interaction/record/archetype message keys.
2. Glossary alignment for the accepted Codex terminology.
3. Forbidden public brand literals.
4. Disclosure-policy leak risk in newly localized UI/system strings.
5. Compact alias status.
6. Remaining P1/P2 findings and next Codex priority.

## Expected Output

Write results under:

`docs/localization/threads/outputs/restart-thread-05-recheck-v2/`

Required files:

- `SUMMARY.md`
- `RECHECK_FINDINGS.csv`
- `GLOSSARY_VS_KEY_DELTAS.csv`
- `NEXT_CODEX_ACTIONS.md`

## Final Response

Return:

- PASS/FAIL for the limited recheck.
- P0/P1/P2 counts.
- Any required Codex fixes.
- Any language/native-review-only items.
