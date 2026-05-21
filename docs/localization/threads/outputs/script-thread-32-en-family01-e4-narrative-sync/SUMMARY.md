# SCRIPT_EN family-01 e-4 narrative sync

## Files touched

- `src/data/scriptedText/family-01.en.json`
- `src/data/scriptedAngles/family-01_angle_catalog.en.json`
- `src/data/scriptedAngles/family-01_judge_questions.en.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json`
- `src/data/cases/generated/family-01.en.json`
- `src/components/pc/evidence/EvidenceSubViewers.tsx`

No KO source, JA sidecar, zh-CN sidecar, or `behaviorHint` values were edited.

## Variant counts

- Tier 1 e-4 narrative: 85 scriptedText anchors, 17 judge-question anchors, 90 scriptedAngles answer anchors, 1 angle catalog description, 21 generated-case e-4/w-2 strings, 2 EN UI filter labels.
- Tier 2 KO naturalization v3: 175 scriptedText text/question anchors reviewed and re-naturalized.
- Tier 3 scriptedAngles sweep: 4 judge-question anchors and 24 EN answer-sidecar variants updated with two uniform closers.

## Naturalization decisions

- Replaced literal resistance closers with stable courtroom English: `I won't give ground on this.`
- Kept repeated KO closers uniform: `Even if I give a step, the conclusion is the same.`, `That one line stayed with me a long time.`, and `That is all.`
- Converted Korean emotional idioms into idiomatic English: `my pride took a hit`, `bruises my pride`, `defense mechanism kicks in`, `anger got ahead of the facts`.
- Preserved formal-but-spoken register with contractions where natural, while avoiding casual reductions like `gonna`.
- Reworked e-4 away from single-day/single-sitting wording into morning intake, afternoon amendment, and amendment-status memo staging.

## Validation

- PASS: `npm run localization:scripts:validate -- --case=family-01 --locale=en --strict`
- BLOCKED BY NON-EN BASELINE: `npm run localization:cases:validate -- --case=family-01 --locale=en --strict`
  - The script validates all locales despite the `--locale=en` flag.
  - The remaining failures are in untouched `family-01.ja.json` and `family-01.zh-CN.json`, whose e-4 stage-3 overlays still have 7 log rows while KO now has 9.
- PASS: `npm run check:policy -- --locale=en`
- BROAD BASELINE FAIL: `npm run qa:lqa`
  - Full-corpus LQA reports pre-existing broad applied-localization issues: empty translations, length spikes, cross-batch inconsistency, JA/zh anomalies.
- PASS: `npm run qa:fast`
- PASS: `npm run qa:cutscene` with P0=0 and existing P1 length/pattern findings.

## Notes

- EN case sidecar now mirrors e-4 row counts for stage 1/2/3 and keeps stage 1 free of the final 60:40 ratio.
- The focused variation audit passes all 150 non-S5 high-volume family-01 interrogation buckets.
- Non-S5 forbidden lexeme audit is 0 for `90:10`, `reduced his own share`, and `fabrication`.
