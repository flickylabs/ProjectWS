# VISUAL_QA_NOTES

After Codex applies the patches in [PATCH_SUGGESTIONS_FOR_CODEX.md](./PATCH_SUGGESTIONS_FOR_CODEX.md), screenshot-test the following screens at the listed resolutions for each non-`ko` locale.

## Resolutions

- 1920×1080 (desktop default)
- 1440×900 (laptop / 16:10)
- 1280×800 (Steam Deck)

## Locales

For each screen, capture `en`, `ja`, `zh-CN`. KO is the source and assumed correct.

## Screens

### Home

- [src/components/pc/home/PCHomeScreen.tsx:323-330](../../../../src/components/pc/home/PCHomeScreen.tsx#L323) — `ModeCard` badges + `metaLeft` / `metaRight`.
- [PCHomeScreen.tsx:413-417](../../../../src/components/pc/home/PCHomeScreen.tsx#L413) — `AxisRow` poles (논리/직관 etc.).
- [PCHomeScreen.tsx:387-389](../../../../src/components/pc/home/PCHomeScreen.tsx#L387) — Judge desk tabs.
- [PCHomeScreen.tsx:423-425](../../../../src/components/pc/home/PCHomeScreen.tsx#L423) — History mode tabs.
- [PCHomeScreen.tsx:510-511](../../../../src/components/pc/home/PCHomeScreen.tsx#L510) — Leaderboard / Hall of Fame rows with the longest case titles.
- [PCHomeScreen.tsx:638-654](../../../../src/components/pc/home/PCHomeScreen.tsx#L638) — `ScreenPresetConfirmModal` (Yes / No buttons + countdown).

### Settings

- [src/components/pc/settings/PCSettingsPanel.tsx:88-106](../../../../src/components/pc/settings/PCSettingsPanel.tsx#L88) — sidebar with all 9 categories visible, including `Accessibility` + "Coming Soon" badge dot for non-KO.

### Hotbar (in-play)

- [src/components/pc/hotbar/PCBottomDock.tsx:474-535](../../../../src/components/pc/hotbar/PCBottomDock.tsx#L474) — full 6-slot row at 1920 / 1440 / 1280. Verify 2-line label clamp on EN slots ("Empathy Approach", "Free Interrogation", "Witness Summon").
- [PCBottomDock.tsx:478-486](../../../../src/components/pc/hotbar/PCBottomDock.tsx#L478) — special row at 1280×800 should be icon-only (label hidden, `title=` populated).
- [PCBottomDock.tsx:340-348](../../../../src/components/pc/hotbar/PCBottomDock.tsx#L340) — advance-phase banner across all locales; verify wrap on narrow widths.
- [PCBottomDock.tsx:351-457](../../../../src/components/pc/hotbar/PCBottomDock.tsx#L351) — question / evidence / free-question overlays; verify `pc-question-choice__title` does not clip.

### Verdict

- [src/components/pc/verdict/PCVerdictScreen.tsx:529-584](../../../../src/components/pc/verdict/PCVerdictScreen.tsx#L529) — sidebar steps + horizontal rail (no numeric prefix on non-KO).
- Verdict footer buttons (`pc-verdict-footer__button`) on each step.

### Result

- [src/components/pc/result/PCResultScreen.tsx:122-184](../../../../src/components/pc/result/PCResultScreen.tsx#L122) — result frame: hero meta cards (관계/쟁점/증거), score unit, rating, both tab variants.
- All 4 tabs at 1280×800 with longest EN string in each panel.

### Modals / overlays

- [src/components/pc/layout/PCInteractionPanel.tsx](../../../../src/components/pc/layout/PCInteractionPanel.tsx) — evidence variant, contradiction variant (dual-statement), witness variant. Action buttons must wrap, not clip.
- [src/components/pc/home/PCHomeScreen.tsx:786+](../../../../src/components/pc/home/PCHomeScreen.tsx#L786) — `HistoryDetailModal` with each of the 4 result tabs.

### Test Console

- [src/components/pc/debug/PCTestConsole.tsx:65-110](../../../../src/components/pc/debug/PCTestConsole.tsx#L65) — 342px panel, all three resource rows, EN / JA / zh-CN labels truncated to single line.

### Auth / Splash

- [src/app/PCApp.tsx:127-172](../../../../src/app/PCApp.tsx#L127) — splash, "Steam authentication required" card, "Preparing session" card. These already use `t()` and exercise the longest EN strings.

### Language Selector

- [src/components/pc/i18n/PCLanguageSelector.tsx](../../../../src/components/pc/i18n/PCLanguageSelector.tsx) at full and ≤720px widths. All four native names must remain readable.

## Pass criteria

Each screen × resolution × locale combination must satisfy:

1. No text clipped at 1 character (silent ellipsis is fine; mid-word silent cut is not).
2. No scoreboard / status row pushed off-screen.
3. No overlap between portraits / icons / labels.
4. Korean source screen unchanged from baseline (no regression).
5. CJK at 11px floor renders cleanly on Steam Deck handheld DPI.

Capture each screenshot to `docs/localization/threads/outputs/thread-04-layout/qa-screens/<screen>-<resolution>-<locale>.png` for review.
