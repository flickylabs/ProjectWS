# Restart Thread 03 — zh-CN UI Translation — Summary

## Counts

- **Total i18n keys reviewed (current namespaces):** 55
  - common: 14
  - settings: 8
  - home: 7
  - court: 19
  - verdict: 5
  - profile: 2
- **Status breakdown:**
  - `ok`: 49
  - `changed`: 6 (home.tagline, home.countdown.ready, court 4× em-dash polish, verdict 1× em-dash polish)
  - `needs_codex_refactor`: 0 (all P0 composition issues already templated in current i18n)
  - `needs_native_review`: 0 (folded into `changed` with notes)

## Missed static strings found

- **~250 hardcoded UI strings** still present in PC source files (mostly outside the 5 wired components: PCApp, PCHomeScreen partial, PCCourtLayout partial, PCIntroSlides, PCSettingsPanel partial).
- See `SOURCE_STRING_MAP.csv` for the full list with proposed namespace keys + zh-CN translations.
- Notable categories still hardcoded:
  - PCHomeScreen: ~70 strings (judge axes, leaderboard, settings preview, case select)
  - PCSettingsPanel: ~45 strings (all panels except language + credits)
  - PCResultScreen + PCClearanceDetailPopup + PCFragmentRewardOverlay: ~30 strings
  - PCVerdictScreen: ~20 strings (lie state + 14 solution categories)
  - PCInteractionPanel: ~30 strings
  - PCGameplayOverlay: 12 cut-in modal strings
  - PCRecordSummary: 11 strings
  - Observation / Notebook: 13 category labels
  - Progression / Profile: 17 strings (fragment names, traits, axes, perk panel)
  - 5 toast strings via showToast() (PCRightPanel, PCInteractionPanel, useActionDispatch, CombinationLabPanel)
  - PCTestConsole dev console: 6 strings
  - pcHomeShared.ts session taglines/descriptions: 13 + 4 intro slides (24 strings)

## P0 / P1 risks

### P0 (blocking)

- **None remaining in current i18n.** The 5 P0 composed-string risks identified in pre-restart Thread 03 (notes/unseen, moreCases, resolutionConfirm, verdictAdvance body, recordSummary moreConvincing) are all already templated with `{count}` / `{visible}` / `{hidden}` / `{seconds}` / `{party}` placeholders in the current namespace files. ✅
- **Brand consistency P0:** ensure no future translations use `所罗门的法庭`, `所罗门的两难`, or `所罗门困境`. Public CN title is `真相裁决：零点审判`. Add forbidden-list row to glossary as `locked=true`.

### P1 (verify on Steam Deck)

- 6 hotbar/cut-in body strings 22–33 chars long; verify wrap at `data-screen-bucket=sm` (1366×768).
- `pc.toast.onlyHighlightedCombinable` 14 chars may truncate at typical toast width 12. Shorter alternative provided.
- 12 `pc.session.*.description` lobby card descriptions 18–24 chars; verify card height.
- `pc.settings.data.resetDescription` 30 chars two-line zone wrap.
- See `LONG_TEXT_RISKS.csv` for full list.

## Disclosure-policy clearance

PASS. None of the proposed strings name truth content from the 3 active cases (spouse-01 / family-01 / friend-01). All translations are surface UI chrome (buttons, labels, empty states, generic gameplay cut-ins).

`pc.gameplay.*` cut-in bodies are abstract narration about lie-state behavior (e.g., "对方陈述大幅动摇") and never name specific case truths — confirmed compliant with `docs/disclosure-policy.md` §2.1.

## 裁决 vs 判决 split (recommended)

The brand title is `真相**裁决**` but the glossary draft maps `판결 → 判决`. To keep both correct, propose this split applied throughout the patch:

- **裁决** — the *act/process* of issuing a verdict. Used in `pc.verdictAdvance.*`, `pc.phase.verdictEntry`, "进入裁决", "裁决前确认", "裁决条件".
- **判决** — the *static record / output / criterion*. Used in `pc.phase.verdict`, `pc.home.judgeInfo.tab.records` (判决记录), `pc.home.records.summary` (判决结果摘要), `pc.home.judgeAxes.verdict` (判决（均衡）axis trait), `pc.profile.tab.fragments` (判决碎片), the result-finding judgments.

This split is internally consistent and brand-aligned. Recommend adding it as a glossary note rather than picking one term.

## Anything PROJECT_CONTROL_TOWER must decide

1. **裁决 / 判决 split** — confirm the proposed split above, OR pick one term and apply uniformly. Affects ~10 keys and will determine glossary update.
2. **`home.tagline`** — current `成为现代审判者` reads more dramatic; proposed `化身现代裁判官` aligns with glossary 재판관→裁判官. Pick one. Marketing tone vs glossary alignment.
3. **`pc.home.countdown.ready`** — current `即将恢复` vs proposed `即将补充`. KO source 곧 충전 leans toward 补充 (replenish). Confirm.
4. **objection rule application** — restart says "Keep `objection` as UI noun `异议`". Applied to `pc.interaction.objectionLabel` (now `提出异议`) and to subtitles like `pc.actions.special.subtitle` (uses 异议). Confirm 提出异议 vs bare 异议 for the action-button label.
5. **Per-component i18n adoption schedule** — bulk of strings (~250) still hardcoded in PC components. Decide whether this thread's SOURCE_STRING_MAP should be applied incrementally per-component or in a single Codex sweep adding new namespace files (`actions.ts`, `interaction.ts`, `gameplay.ts`, `result.ts`, `verdict-screen.ts`, `progression.ts`, `profile.ts`, `observation.ts`, `notebook.ts`, `phase.ts`, `lobby-categories.ts`, `intro.ts`, `toast.ts`, `settings-extended.ts`).
6. **Glossary additions** — 13 new rows recommended (emotions ×5, 법정 장악, 이의/objection, 봉합, 판결 조각, 칭호, public brand title, forbidden-brand-list, 시즌). See `GLOSSARY_AUDIT.csv`. Confirm approval to add.
7. **`재판관` translation in tagline context** — `审判者` (more poetic) vs `裁判官` (glossary). The tagline is the only current divergence. Confirm.

## Files written

- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/MESSAGE_PATCH_PROPOSAL.ts`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/COVERAGE_REPORT.csv`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/SOURCE_STRING_MAP.csv`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/LONG_TEXT_RISKS.csv`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/GLOSSARY_AUDIT.csv`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/SUMMARY.md`
