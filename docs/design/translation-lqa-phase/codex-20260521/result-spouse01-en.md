# spouse-01 EN Witness/Cutscene Result

Branch: `codex/witness-cutscene-spouse-en`
Baseline: `afbc7c4b`
Scope: spouse-01 EN only

## Changes

- Updated `SPOUSE_01_OVERLAYS.en` for the 6 changed spouse-01 witness slots:
  - floor residents/night-shift lights-off context
  - no single-woman household context
  - unit 302 decisive child/uncle testimony with "resident", not landlord
  - cash withdrawals as teller-counter withdrawals, not ATM withdrawals
  - signature doubt as a felt difference with spouse/documents pass-through
  - explicit Mr. Lee Jun-ho subject for the later bank visit
- Updated `slip_explosive.phase2.en` in spouse-01 `d-1`, `d-2`, `h-d3`, and `h-d4` to the requested dismay tone beginning with "It's just that..." and trailing ellipses.
- Reviewed spouse-01 EN mirrors and updated stale corresponding text in:
  - `src/data/cases/generated/spouse-01.en.json`
  - `src/data/scriptedText/spouse-01.en.json`

## Validation

- `npx tsc -b --noEmit` PASS
- `npm run qa:fast` PASS, combined P0=0
- `node scripts/detect-truth-leak.cjs` PASS, truth leak findings=0

## Notes

- No KO source files, JA/ZH-CN overlays, family/friend files, glossary, truth-leak matrix, or origin push were touched.
- The requested thread brief path was not present in this checkout; work followed the embedded task brief and base request document references.
