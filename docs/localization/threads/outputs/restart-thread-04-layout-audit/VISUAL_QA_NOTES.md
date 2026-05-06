# VISUAL_QA_NOTES — Restart Thread-04 Layout Audit

After PROJECT_CONTROL_TOWER hands the patches in [PATCH_SUGGESTIONS_FOR_CODEX.md](./PATCH_SUGGESTIONS_FOR_CODEX.md) to Codex, screenshot-test the following surfaces.

## Resolutions

- **1920×1080** — desktop default
- **1440×900** — laptop / 16:10
- **1280×800** — Steam Deck (explicit minimum target)

## Locales

For each surface capture: `ko` (regression baseline), `en`, `ja`, `zh-CN`.

## Pass criteria

For every screen × resolution × locale combination:

1. Brand title, eyebrows, and subtitles fit without horizontal scroll.
2. No text clipped at 1 character (silent ellipsis is fine; mid-word silent cut is not).
3. No portrait / icon / button overlap.
4. KO baseline is unchanged from pre-patch.
5. CJK at 11px floor renders cleanly on Steam Deck DPI.
6. Uppercase / wide-tracking eyebrows look intentional only in EN; CJK eyebrows are tracked at ≤0.06em with `text-transform: none`.

## Screens

### 1. Splash / Loading

- [`PCApp.tsx :120-130`](../../../../src/app/PCApp.tsx#L120) `.pc-splash` — verify `brand.fullTitle` fits at 32px on Steam Deck for all 4 locales.
- [`PCApp.tsx :132-145`](../../../../src/app/PCApp.tsx#L132) Steam-auth-required card — longest EN string `Check the Steam client and server authentication state, then try again.`
- [`PCApp.tsx :156-166`](../../../../src/app/PCApp.tsx#L156) Session-preparing card.
- **Critical:** if PROJECT_CONTROL_TOWER applies P0-8 option A, also verify the splash language selector overlay renders without blocking the brand title.

### 2. Intro slides

- [`PCIntroSlides.tsx :44-91`](../../../../src/components/pc/home/PCIntroSlides.tsx#L44) brand band — `brand.fullTitle | splash.subtitle | <kicker>` must wrap or ellipsis cleanly at 1280px.
- Footer buttons: 건너뛰기 / Skip / スキップ / 跳过 — verify min-width and same-row layout.

### 3. Home

- [`PCHomeScreen.tsx :316-323`](../../../../src/components/pc/home/PCHomeScreen.tsx#L316) hero h1 with new wrap rule — no overflow on Steam Deck for EN `Verdict Zero: Trial of Truth`.
- ModeCard badge / title at 1440 and 1280 — KO season name must render without uppercase/0.2em distortion.
- DepthHeader eyebrow (`GENERAL MODE / JUDGE DESK / SETTINGS`) stays uppercase under EN brand rule even when locale=ja/zh-CN — verify intentional.
- Judge desk tabs (`정보 확인 / 판결 기록 / 재판관 관리`) at translated widths.
- AxisRow poles (`논리 / 직관` etc.) clamp to 6em without touching the indicator dot.
- Leaderboard / Hall of Fame rows with the longest EN/JA case titles — score column stays in view.

### 4. Settings (PCSettingsPanel modal)

- Sidebar with all 9 categories, especially:
  - EN `Accessibility` + `Coming Soon` badge — fits 240px column with new ellipsis rule.
  - JA `アクセシビリティ` + `近日公開`.
  - zh-CN `辅助功能` + `即将推出`.
- About card — version / build / engine / credits / license rows under each locale.
- LanguageSettings panel — current language, restart note, and switching live applies.

### 5. Court header

- [`PCCourtLayout.tsx :415-433`](../../../../src/components/pc/layout/PCCourtLayout.tsx#L415) phase pill `Phase ${num} - ${PHASE_LABELS[phase]}` for all 6 phases × 4 locales — verify no clipping, no overlap with case-title chip.

### 6. Hotbar (in-play)

- [`PCBottomDock.tsx :474-535`](../../../../src/components/pc/hotbar/PCBottomDock.tsx#L474) full 6-slot row at 1920 / 1440 / 1280. Verify 2-line label clamp on EN slots after translation.
- Special row at 1280×800 should be icon-only (label hidden; `title=` populated and translated).
- Advance banner at all locales — verify wrap on narrow widths and that the "ready" sentence + button label do not duplicate verbiage.
- Question / evidence / free-question overlays — header titles + dispute hint translated, panel max-height respected.

### 7. Verdict screen

- [`PCVerdictScreen.tsx :529-584`](../../../../src/components/pc/verdict/PCVerdictScreen.tsx#L529) sidebar steps + horizontal rail. `VERDICT STUDIO` eyebrow stays English brand; localized step labels drop the numeric prefix.
- Footer buttons across all 4 verdict steps — primary button can grow when EN form is `Judge all disputes first (1/3)` (~30 chars).
- Confirm card: `사실로 판단 / 거짓으로 판단 / 판단 보류` translated.

### 8. Result screen

- [`PCResultScreen.tsx :122-184`](../../../../src/components/pc/result/PCResultScreen.tsx#L122) result frame: hero meta cards (관계 / 쟁점 / 증거), score unit, rating, both tab variants (vertical hero + horizontal `pc-result-tabs`).
- Verify each of the 4 tabs at 1280×800 with the longest EN string visible.
- `RESULT DOSSIER` eyebrow stays uppercase only when locale=en (EN brand constant).

### 9. Modals / overlays

- [`PCInteractionPanel.tsx`](../../../../src/components/pc/layout/PCInteractionPanel.tsx) — evidence / contradiction / witness variants. Action button labels wrap (no clip) and emoji prefix is rendered as icon, not part of the string.
- [`PCHomeScreen.tsx :550-560`](../../../../src/components/pc/home/PCHomeScreen.tsx#L550) `ScreenPresetConfirmModal` — Yes/No buttons hit 96px minimum width even on EN.

### 10. Test Console

- [`PCTestConsole.tsx :65-110`](../../../../src/components/pc/debug/PCTestConsole.tsx#L65) at 342px panel width — all three resource rows with localized labels truncated to single line.

### 11. Language switching live applies

- Open Settings → Language, switch ko → en → ja → zh-CN and back. After each switch verify:
  - sidebar labels update,
  - About card updates,
  - home title / tagline update,
  - splash subtitle eyebrow on home updates,
  - hotbar slots update (after P0-7 is applied),
  - verdict / result tabs update,
  - localStorage round-trip survives a reload.

## Capture path

Save screenshots to:

```
docs/localization/threads/outputs/restart-thread-04-layout-audit/qa-screens/<screen>-<resolution>-<locale>.png
```

Total target: 11 surfaces × 3 resolutions × 4 locales ≈ **132 captures** (some surfaces only need one resolution; trim accordingly).
