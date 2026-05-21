# SCRIPT_JA family-01 e-4 Narrative Sync

Status: JA synchronization and naturalization edits are implemented, but no commit was created because two required gates do not pass under the requested write scope.

## Files Touched

- src/components/pc/evidence/EvidenceSubViewers.tsx
- src/data/cases/generated/family-01.ja.json
- src/data/scriptedAngles/family-01_angle_catalog.ja.json
- src/data/scriptedAngles/family-01_interrogation_answers.ja.json
- src/data/scriptedAngles/family-01_judge_questions.ja.json
- src/data/scriptedText/family-01.ja.json

## Variant Counts

- Tier 1 e-4 narrative source rows: 192 text rows (src/data/scriptedAngles/family-01_interrogation_answers.json: 90; src/data/scriptedAngles/family-01_judge_questions.json: 17; src/data/scriptedText/family-01.json: 85). JA also updated the generated e-4 evidence surface and JA log filter label.
- Tier 2 KO naturalization v3 source rows: 175 scriptedText rows.
- Tier 3 scriptedAngles source rows: 28 rows (src/data/scriptedAngles/family-01_interrogation_answers.json: 24; src/data/scriptedAngles/family-01_judge_questions.json: 4). The 24 answer records are normalized into two canonical JA templates.

## Narrative Sync Notes

- e-4 now uses the two-visit same-day flow: 10:10/10:25/11:05 first filing, 17:05 amendment reception, 18:32/18:39/18:43/18:47 state/pressure notes, and 18:57 finalized 60:40 amendment.
- Old same-place number-confusion language was removed from player-facing JA e-4 text; remaining old phrasing is only in behaviorHint where the brief said not to touch KO-only fields.
- UI JA log filter first label is now 一次受付, with 修正受付 and 状態メモ retained.

## Naturalization Decisions

- Recurring KO closers map to one JA closer each, e.g. 이건 양보 못 합니다. -> これだけは譲れません。 and 한 발 양보해도 결론은 같습니다. -> 一歩譲っても、結論は変わりません。
- Literal defensive phrasing was softened into courtroom Japanese with warmth, e.g. delayed explanations use どうしても遅れました rather than Korean-tense glosses.
- Emotion lines favor idiomatic Japanese: プライド, 恥ずかしく思います, 怖かったのです, and 傷ついた気持ち.
- Agency is explicit where the KO asks for it: 私が...説明しなければなりません / 私が...否定しません / 私の説明.
- Non-S5 truth leakage was softened, while S5 confession rows keep explicit truth details.

## Validation

- PASS: npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict
- PASS: npm run check:policy -- --locale=ja
- PASS: npm run qa:fast
- PASS: npm run qa:cutscene (P0=0; existing P1=159)
- PASS: node scripts/detect-truth-leak.cjs --strict
- BLOCKED: npm run localization:cases:validate -- --case=family-01 --locale=ja --strict. The script ignores --case/--locale and loops all generated locales; remaining 12 failures are EN and zh-CN family-01 e-4 stage-3 overlay rows missing the new 18:47/18:57 entries. EN/zh-CN sidecars are outside allowed write scope.
- BLOCKED: npm run qa:lqa. Global applied-translation scan fails with 59948 existing issues across all locales; this is repo-wide and not specific to the JA family-01 sidecar changes.

## Commit Status

No commit or push was performed because the brief requires all validation gates to pass before commit.
