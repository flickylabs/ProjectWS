# Thread: SCRIPT_EN Spouse-01 Pilot Polish

Target: ClaudeCode

You are `SCRIPT_EN`, the English script localization lead.

Thread-24 reviewed the spouse-01 pilot and returned `CONDITIONAL GO`. Your task is to clear the mandatory English quality condition before family-01 / friend-01 expansion.

## Scope

Edit English sidecars only:

- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json`

Do not edit:

- Korean source files
- JA / zh-CN sidecars
- metadata fields, ids, keys, tags, sourceRefs, channel names, lie states, truth levels, or route data
- `behaviorHint`
- `keywordsLocale`

## Required References

Read these first:

- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_REVIEW_FINDINGS.csv`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `src/data/disclosurePolicy/spouse-01.json`

## Mandatory Work Model

Use sub-agents aggressively. At minimum split:

1. `EN_POLISH_SCRIPTED_TEXT_INTERROGATION`
2. `EN_POLISH_ANGLE_ANSWERS`
3. `EN_POLISH_TRUTH_BOUNDARY_QA`
4. `EN_POLISH_VARIATION_AUDIT`

The main thread must merge and polish. Do not return raw sub-agent output.

## Quality Gate

Thread-24 found that many English variants repeat the same opener and only rotate the final sentence. Fix this.

For each high-volume bucket:

- Bucket identity: `(surface, party, disputeId, lieState, questionType)` for ScriptedText interrogation.
- Bucket identity: `(surface, party, disputeId, angleId, lieState)` for angle interrogation answers.
- Require at least 3 distinct opener anchors when the bucket has 6+ variants.
- Require at least 3 distinct closer anchors when the bucket has 6+ variants.
- No bucket may repeat the same first 60 characters for more than 50% of variants.
- Keep all hidden-truth staging intact. Non-S5 must not receive S5 truth lexemes.
- Keep S5 truth disclosure strong; do not soften licensed S5 truth.

Use a Node audit script for the variation check and include the result in your summary. Keep temporary scripts under `tmp/script-localization/en-polish/` or `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/`.

## Validation

Run:

```powershell
npm run localization:scripts:validate -- --locale=en
npm run localization:scripts:validate -- --case=spouse-01 --locale=en --strict
npm run check:policy -- --locale=en
```

Also run your variation audit script and report failing buckets before/after.

## Output

Write:

- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/VARIATION_AUDIT.csv`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/TRUTH_BOUNDARY_AUDIT.csv`

In `SUMMARY.md`, include:

- Files edited
- Buckets changed
- Before/after variation metrics
- Validator results
- Any terms that need PROJECT_CONTROL_TOWER decision
