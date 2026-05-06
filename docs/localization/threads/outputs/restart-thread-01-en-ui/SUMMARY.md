# SUMMARY — restart-thread-01-en-ui

## Scope

Audit + restart the EN UI translation pass for `Verdict Zero: Trial of Truth`
(public English title) under the new branding rules. Reviews all keys in
the six i18n namespace files and proposes corrections for any value that
drifts from the new brand or reads awkwardly in compact PC UI.

## Totals

- **Total keys reviewed:** 55 (common 14, settings 8, home 7, court 19, verdict 5, profile 2)
- **Status: `ok`:** 32 (already correct, no change needed)
- **Status: `changed`:** 23 (wording/casing/typography improvements proposed)
- **Status: `needs_codex_refactor`:** 0 *(all current keys are already wired through `t()`)*
- **Status: `needs_native_review`:** 5 *(see COVERAGE_REPORT.csv — combo notice voice + responsibility tone + credits description)*
- **Missed static strings found:** ~340 (catalogued in SOURCE_STRING_MAP.csv as 25 representative groups + the prior-thread carryover from `01-en-ui-translation/SOURCE_STRING_MAP.csv` which remains the authoritative full list)

## Brand verification (locked rules)

| rule | source | result |
| --- | --- | --- |
| Public EN title = `Verdict Zero: Trial of Truth` | `common.app.title`, `common.brand.fullTitle`, `home.gameTitle`, `settings.about.credits.title` | ✅ all four call sites already aligned |
| Public EN title fragment = `Verdict Zero` | `common.brand.title` | ✅ |
| Public EN subtitle = `Trial of Truth` | `common.brand.subtitle` | ✅ |
| Internal name = `Project_Solomon` | `common.brand.internalProjectName` | ✅ never surfaced as user-facing |
| Forbidden public titles (`Project Solomon`, `Solomon's Dilemma`, `Solomon Court`) | (search across all current i18n EN values) | ✅ no occurrences |
| Forbidden public titles (`Project Solomon`, `Solomon's Dilemma`, `Solomon Court`) | (search across remaining hardcoded PC strings) | ⚠️ one remaining in `pcHomeShared.ts:134` (KO-only `현대판 솔로몬이 되어`) — EN translation must NOT surface Solomon. Proposed brand-clean EN in SOURCE_STRING_MAP.csv: `Step onto the bench and untangle every dispute yourself.` |

## P0 risks (must fix before EN UI ships)

1. **`pcHomeShared.ts:134` brand collision (P0).** The first home intro
   slide title `'현대판 솔로몬이 되어 갈등을 해결해주세요.'` still uses
   the legacy Solomon brand metaphor in Korean. The EN translation MUST
   drop Solomon per restart rules. Tracked in
   [SOURCE_STRING_MAP.csv](SOURCE_STRING_MAP.csv) row 1. Codex must
   promote the constant to i18n before the next EN release.

2. **Hotbar slot labels overflow (P0).** Korean slot names are 4 chars
   (`사실 추궁` etc.); proposed EN equivalents are 12–16 chars
   (`Fact Pursuit`, `Empathy Approach`, `Demand Answer`). The fixed
   `.slot-nm` width in M/S/XS buckets clips the EN labels. Mitigation:
   `[lang="en"]` CSS scope + single-word fallbacks listed in
   [LONG_TEXT_RISKS.csv](LONG_TEXT_RISKS.csv).

3. **Korean score-axis ↔ phase noun overload (P0 disambiguation).**
   `판결` is reused both as the *score axis label* (alongside
   `통찰/탐구·권위·지혜`) and as the *gameplay phase / verdict noun*. Same
   pattern with `해결` (Wisdom vs Solution) and `탐구` (Insight vs
   Inquiry). Three new glossary IDs proposed in
   [GLOSSARY_AUDIT.csv](GLOSSARY_AUDIT.csv): `score_axis_insight`,
   `score_axis_authority`, `score_axis_wisdom`.

## P1 risks

- **Combo card copy** (`pc.combo.ready` / `.potential` / `.readyDetailLabel`)
  reads slightly off and wraps in compact buckets. Proposed shorter
  forms in MESSAGE_PATCH_PROPOSAL.ts.
- **Verdict-screen option button** (`pc.verdict.factOption.partyClaimCorrectWithContradiction`)
  goes to 2 lines with name interpolation in compact width. Compact
  fallback in LONG_TEXT_RISKS.csv.
- **Source-side duplicate term** (`법정 장악` and `법정 지배력` both used
  for Court Control in different files) — EN collapses both correctly
  but Korean source needs cleanup. Tracked in GLOSSARY_AUDIT.csv as
  `court_control` new entry + non-translation follow-up for Codex.

## P2 (nice-to-have)

- Title Case alignment (5 settings/court keys flipped from sentence case
  to Title Case per English Rules).
- Typographic apostrophe `’` replaces ASCII `'` in 3 places.
- Em-dash `—` replaces hyphen `-` in 4 combo/verdict copy lines for
  Steam-style typography.

## Items PROJECT_CONTROL_TOWER must decide

1. **Apply the COVERAGE_REPORT changes?** 23 entries marked `changed`
   are wording/typography upgrades. None alters meaning. PROJECT_CONTROL_TOWER
   can either accept the patch as-is or accept only a subset. Recommend
   accepting all 23.

2. **Approve the 3 new score-axis glossary entries?**
   `score_axis_insight = Insight`, `score_axis_authority = Authority`,
   `score_axis_wisdom = Wisdom`. Adds clarity; not a change to existing
   gameplay or other locales.

3. **Promote `pc.home.intro.slide.*` (8 strings)** from
   `pcHomeShared.ts` constant to the i18n namespace? This is required
   for EN to drop the Solomon reference. PROJECT_CONTROL_TOWER decision
   needed: bundle into `home.ts` namespace or new `intro.ts` namespace.

4. **`brand.fullTitle` deduplication.** Four keys carry the same value
   (`app.title`, `brand.fullTitle`, `home.gameTitle`,
   `settings.about.credits.title`). Recommend Codex collapse to a single
   source-of-truth key and drop the duplicates. PROJECT_CONTROL_TOWER:
   approve removal?

5. **`splash.subtitle = COURT SIMULATION GAME`** — KO source changed
   from English `COURT SIMULATION GAME` to Korean `법정 시뮬레이션 게임`,
   but the EN value retains all-caps English. Confirm intent — if the
   Korean source change implies the splash should be locale-aware in
   English too, EN may want sentence-case or omit `GAME`. Current
   recommendation: keep `COURT SIMULATION GAME` (Steam genre eyebrow
   convention).

6. **Source-side resource term unification.** Korean source uses both
   `법정 장악` and `법정 지배력` for the same resource. This is not a
   translation bug but a source-side normalization needed before the
   next major UI build. Codex follow-up.

## Files written

- `docs/localization/threads/outputs/restart-thread-01-en-ui/MESSAGE_PATCH_PROPOSAL.ts`
- `docs/localization/threads/outputs/restart-thread-01-en-ui/COVERAGE_REPORT.csv`
- `docs/localization/threads/outputs/restart-thread-01-en-ui/SOURCE_STRING_MAP.csv`
- `docs/localization/threads/outputs/restart-thread-01-en-ui/LONG_TEXT_RISKS.csv`
- `docs/localization/threads/outputs/restart-thread-01-en-ui/GLOSSARY_AUDIT.csv`
- `docs/localization/threads/outputs/restart-thread-01-en-ui/SUMMARY.md`

## Hidden-truth / surface-text policy verification

No proposed EN string moves information across the
`hidden_truth` / `surface_text` boundary. Spot checks:

- `pc.verdictAdvance.hidden.title` (`Unrevealed disputes remain`) — keeps
  gating language; does not surface concealed content.
- `pc.verdictAdvance.hidden.body` — references `{visible}` and
  `{hidden}` counts only; never names the hidden disputes.
- `pc.combo.potential` (`{count} leads still missing — keep investigating`)
  — abstract; preserves disclosure policy.

No P0 hidden-truth violations introduced by this patch.
