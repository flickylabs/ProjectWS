# Codex Scripted-Text Open Issues

Updated: 2026-04-07

## Current Status

- `spouse-01.json` strict validation is currently `WARN 94 / FAIL 0`.
- Remaining warnings are all `D2` similarity warnings in:
  - `interrogation` S4/S5
  - `evidence_present`

## Resolved During This Session

- Restored `tests/validate-scripted-text.cjs` from Git bytes after validator execution became unstable.
- Recovered `spouse-01.json` from backup and re-applied safe fixes with file-based scripts.
- Reduced `spouse-01` warning count from 139 to 94 by rewriting exact-duplicate `interrogation` variants.

## Operational Risks

- PowerShell inline execution with Korean string literals can introduce encoding corruption or `???` substitution.
- `Get-Content` output may look mojibake even when Node can still parse the file correctly; validator execution is the source of truth.
- For Korean-heavy edits, prefer:
  - `apply_patch` for direct text edits
  - `.cjs` helper scripts created on disk, then executed with Node

## Remaining Quality Risks

- `interrogation` S4/S5 variants still share too much base text and differ mostly by intro sentence.
- `evidence_present` contains repetitive structural frames and a few awkward phrasings, especially:
  - `...가리키는 흐름은 피하지 않겠습니다...`
  - `...겨누는 쟁점은 분명합니다...`
  - object-particle mismatches like `문서을`

## Pending Decisions

- After `spouse-01` reaches a stronger baseline, decide whether bulk generation for 84 cases should:
  - use deterministic scripts first, then localized hand-polish
  - or generate richer first drafts with LLM assistance and run local reduction/fix passes afterward

## Next Immediate Actions

1. Reduce `interrogation` S4/S5 D2 warnings with targeted variant rewrites.
2. Reduce `evidence_present` D2 warnings and clean awkward phrasing.
3. Produce a split list of `scriptable` vs `LLM-needed` fields for 84-case expansion.
