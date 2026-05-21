# script-thread-34 zh-CN family-01 e-4 sync

## Scope

Touched zh-CN sidecars only:

- `src/data/scriptedText/family-01.zh-CN.json`
- `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json`
- `src/data/cases/generated/family-01.zh-CN.json`

## Variant Counts

- Tier 1 e-4 narrative sync: 85 scriptedText variants, 17 judge question texts, 90 interrogation answer variants, 1 angle catalog entry, plus generated case e-4 surface/viewer/stage strings.
- Tier 2 KO naturalization v3: 175 concrete scriptedText text ids updated from the `d957a9c7` diff.
- Tier 3 scriptedAngles sweep: 4 judge questions and 24 concrete interrogation answer ids found in the current repo diff. The 24 answers map to two canonical zh-CN templates, 12 ids each.
- Validation hygiene: 2 witness strings adjusted from `正厚的钱` to `另一来源的资金` to satisfy pre-S5 truth-boundary validation.

## Narrative Sync

- Replaced the retired single-day e-4 frame with the current two-visit sequence: 上午首次受理, 下午修订受理, and 状态备忘.
- Stage 1 generated-case surface now has 3 rows only and no `60:40`, fatigue, delayed-answer, or pressure details.
- Stage 2 introduces the afternoon amendment and final `60:40`.
- Stage 3 expands to 9 rows and includes fatigue, delayed answers, help from son, and `今天必须办完` pressure.

## Naturalization Decisions

- Replaced literal line/stance language with legal but human closers, especially `这一点我不能让步。`
- Kept recurring closers canonical instead of over-varying: `即便退让一步，结论也一样。`, `那句话在我心里久久地留着。`, `到这一步我可以承认。`
- Used Chinese emotional idiom for pride/shame: `自尊心`, `面子上挂不住`, `羞愧`, `怒火跑在事实之前`.
- Recast passive or vague statements with clearer subjecthood: `凭母亲自己的意愿`, `我在旁推进`, `被写成只对弟弟有利的样子`.
- Preserved courtroom register while adding hedging: `我觉得`, `好像`, `应该`, `很难说`.

## Validation Status

- PASS: `npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict`
- BLOCKED OUT OF SCOPE: `npm run localization:cases:validate -- --case=family-01 --locale=zh-CN --strict`
  - The validator ignores `--case/--locale` and scans EN/JA too.
  - Remaining failures are EN/JA `family-01` e-4 generated-case sidecars missing the two new stage-3 rows. EN/JA edits are explicitly out of scope.
  - A zh-CN-only merge/Hangul sanity check reports 0 issues.
- PASS: `npm run check:policy -- --locale=zh-CN`
- BASELINE FAIL: `npm run qa:lqa`
  - Fails on the repo-wide translation corpus with 59,966 existing strict LQA findings.
- PASS: `npm run qa:fast`
- PASS: `npm run qa:cutscene`
- PASS: `npm run build:pc`
