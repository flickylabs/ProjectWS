# spouse-01 JA witness/cutscene mirror result

Date: 2026-05-21
Branch: `codex/witness-cutscene-spouse-ja`
Baseline: `afbc7c4b`

## Scope

- Updated only spouse-01 Japanese witness overlays in `src/data/witnessTestimonyData/localized.ts`.
- Updated only `slip_explosive.phase2.ja` in:
  - `src/data/cutsceneText/spouse-01/d-1.json`
  - `src/data/cutsceneText/spouse-01/d-2.json`
  - `src/data/cutsceneText/spouse-01/h-d3.json`
  - `src/data/cutsceneText/spouse-01/h-d4.json`
- No KO/EN/ZH-CN, family-01, or friend-01 text was changed.

## Witness JA Updates

- `w1-d1-resident-info`: reflected night-shift resident context and frequent lights-off wording.
- `w1-d1-no-single-woman`: reflected no single-woman household plus couples / male-single composition.
- `w1-d1-core`: used `住人` for the 302 resident and `叔父さん` for the visitor callout.
- `w2-d2-cash-pattern`: changed from same-branch ATM wording to direct counter withdrawal due to large amounts.
- `w2-hd3-signature-doubt`: changed from concrete neat/scribbled contrast to uncertain felt-different signature plus documents-complete rationale.
- `w2-hd3-core`: explicitly stated `ご主人がいらっしゃって`.

## Cutscene JA Updates

- `d-1`: changed placeholder to the "それは…" trailing-ellipsis dismay about keeping the brother's matter out.
- `d-2`: changed placeholder to the repeated temporary support / delayed timing admission.
- `h-d3`: changed placeholder to the investment-chat exit and realization of responsibility.
- `h-d4`: changed placeholder to Jiyeon's account-monitoring admission and final paperwork responsibility.

## Mirror Review

- Reviewed `src/data/cases/generated/spouse-01.ja.json` as the spouse-01 JA generated case mirror.
- No JA-only divergence requiring an edit was found in that file. Some ATM/window-counter evidence details mirror the current KO generated case data, so they were left unchanged to avoid JA diverging from KO.

## Verification

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS, static P0=0, route P0=0, combined P0=0
- `node scripts/detect-truth-leak.cjs`: PASS, truth leak findings=0
