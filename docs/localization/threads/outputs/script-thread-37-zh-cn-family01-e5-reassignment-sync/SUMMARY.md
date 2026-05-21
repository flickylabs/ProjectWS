# SCRIPT_ZH_CN family-01 e-5 sync summary

## Files touched

- `src/data/cases/generated/family-01.zh-CN.json`
- `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json`
- `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json`
- `src/data/scriptedAngles/family-01_special_scripts.zh-CN.json`
- `src/data/scriptedText/family-01.zh-CN.json`

ClaimPolicy zh-CN sidecars were requested only if present; none exist in this checkout, so KO policy JSON was left untouched.

## Variant / field counts

- Tier 1 data: 18 generated-case zh-CN text fields updated; disclosurePolicy zh-CN and truth-leak matrix zh-CN were verified but not rewritten.
- Tier 2 narrative split: 595 scriptedText variants, 655 interrogation-answer variants, 150 judge-question variants, 17 special-script entries, and 4 angle-catalog records.

## Narrative conversion notes

- d-2 zh-CN now speaks in terms of 公证程序介入, 上午受理, 下午修订, 母亲状态不稳定, and 尹正厚催促进度.
- d-2 localized surfaces avoid 亲笔 / 90:10 / 伪造 / 自己份额 language; motive remains deferred to later disputes.
- d-5 carries the hard-evidence trace: 母亲亲笔90:10 -> 公证本60:40.
- d-4 cross-reference no longer repeats d-5’s 90:10 evidence language; it bridges through 公证流程 and the identity-truth path.

## Validation

- `npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict`: passed
- `npm run localization:cases:validate -- --case=family-01 --locale=zh-CN --strict`: passed
- `npm run check:policy -- --locale=zh-CN`: passed
- `node scripts/detect-truth-leak.cjs --strict`: passed; truth leak findings = 0
- `npm run qa:fast`: passed; RELEASE READY, static P0=0, route P0=0
- `npm run qa:cutscene`: passed; strict P0=0
- `npm run qa:lqa`: blocked in verify-translations global baseline before truth-leak phase; verify report showed 59,713 existing cross-locale issues. Separate truth-leak strict pass is 0 findings.
