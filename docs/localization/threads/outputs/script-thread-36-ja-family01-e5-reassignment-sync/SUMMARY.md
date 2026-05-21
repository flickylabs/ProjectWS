# SCRIPT_JA family-01 e-5 reassignment sync summary

Branch: `codex/family01-ja-e5-sync`

## Files touched

- `src/data/cases/generated/family-01.ja.json`
- `src/data/scriptedText/family-01.ja.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.ja.json`
- `src/data/scriptedAngles/family-01_special_scripts.ja.json`
- `docs/localization/threads/outputs/script-thread-36-ja-family01-e5-reassignment-sync/*`

Verified but not rewritten:

- `src/data/scriptedAngles/family-01_judge_questions.ja.json`: no KO delta in the target commit range.
- `src/data/scriptedAngles/family-01_angle_catalog.ja.json`: no KO delta in the target commit range.
- `src/data/disclosurePolicy/family-01.json`: JA policy sections already present; no JA rewrite required.
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json`: JA d-2/d-5 sections already reflect the new boundary.
- `src/data/claimPolicies/family-01-*.ja.json`: no family-01 JA claimPolicy sidecars exist in this worktree.

## Variant counts

Tier 1 data:

- 40 generated-case JA leaf strings updated.
- Scope: d-2 case data, d-5 strengthening text, e-5 party context, truth table, combinationLab, v3Design lead/cross-reference text, official-record recommendations.

Tier 2 narrative split:

- 575 `scriptedText` d-2 variants regenerated around the procedural narrative.
- 905 `interrogation_answers` d-2 variants synced to the procedural narrative, including a final cleanup of old document-gap and ratio-direction clauses.
- 17 `special_scripts` JA strings recorded in the new sidecar: 4 confessions, 10 S5 re-question responses, 1 judge evidence combo, 2 dossier prompts.
- 3 d-5 `scriptedText` variants strengthened from old forgery phrasing to `手続介入の責任`.

Total touched localized narrative/data strings: 1,540.

## Narrative conversion notes

- d-2 is now framed as `公証手続への介入`: 午前 1 次受付, 午後の修正受付, ジョンフの進行圧力, and 母の不安定な状態.
- d-2 anchor text removes 自筆 / 90:10 / 偽造 / 自分の取り分を減らした / 下書き equivalents and avoids reintroducing those concepts through cross-reference copy.
- d-5 now carries the hard-evidence trace: 母の自筆下書き 90:10 が公証本 60:40 に縮小された流れ.
- The recurring confession and S5 response templates use one canonical JA closer for the same KO closer, especially `手続介入の責任は残ります` and `その範囲内でのみ説明します`.
- B-side admissions were naturalized around explicit subject responsibility: `私が進行を急がせました`, `説明しなければなりません`, `責任は私にあります`.

## Validation

- PASS: `npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict`
- PASS: `npm run localization:cases:validate -- --case=family-01 --locale=ja --strict`
- PASS: `npm run check:policy -- --locale=ja`
- PASS: `node scripts/detect-truth-leak.cjs --strict`
- PASS: `npm run qa:fast`
- PASS: `npm run qa:cutscene`
- BLOCKED by existing repository-wide baseline: `npm run qa:lqa`
  - The command is not scoped to family-01 JA and fails in `scripts/verify-translations.cjs --strict --scan-applied` before truth-leak detection.
  - Reported total issues: 59,659 applied-translation issues across the repository baseline.
