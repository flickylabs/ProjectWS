Thread-04 Summary
Components/files audited: 14 (PCApp, PCHomeScreen, PCSettingsPanel, PCBottomDock, PCActionsPanel, PCVerdictScreen, PCResultScreen, PCTestConsole, PCInteractionPanel, PCLanguageSelector + .css, pc.css, src/i18n/{index,locales,messages}, pcUiLabels.ts)
Layout risks flagged: 19 (P0:5 P1:10 P2:4)
Locales affected:
  en: 18
  ja: 11
  zh-CN: 11
  all: 0
Global rules proposed: 10
Locale-specific rules proposed: 4 (en / ja / zh-CN / ko-source-cleanup)
Codex patch suggestions: 14 (P0:5 P1:7 P2:3)
Visual QA targets: 14 screens × 3 resolutions × 3 locales = 126 captures
Files written:
  docs/localization/threads/outputs/thread-04-layout/LAYOUT_RISK_TABLE.csv
  docs/localization/threads/outputs/thread-04-layout/GLOBAL_RULES.md
  docs/localization/threads/outputs/thread-04-layout/LOCALE_SPECIFIC_RULES.md
  docs/localization/threads/outputs/thread-04-layout/PATCH_SUGGESTIONS_FOR_CODEX.md
  docs/localization/threads/outputs/thread-04-layout/VISUAL_QA_NOTES.md
  docs/localization/threads/outputs/thread-04-layout/SUMMARY.md

Top 3 P0 risks
  PCBottomDock .hotbar-special-btn (분리 심문 / 비공개 보호 / 즉답 요구) — max-width 92→58px with nowrap+ellipsis clips EN labels to 1-2 chars below 1320px — raise max-width to 120px ≥1320px and collapse to icon-only with kbd + title= below 1320px.
  PCBottomDock .slot-nm in 6-col minmax(62px,1fr) at 10px font — EN labels (≈12 chars) cannot single-line and have no clamp/ellipsis fallback — apply 2-line -webkit-line-clamp clamp, raise .slot min-height to 62px, ship compact EN aliases (Facts / Motive / Empathy / Free Q / Evidence / Witness).
  PCResultScreen / PCVerdictScreen numeric step prefixes (01 결과 확인 / 02 판결 선고 / 01 쟁점 판단 / 02 안건 책임) — EN / JA / zh-CN labels exceed sidebar width with no ellipsis — drop the numeric prefix on non-KO via t(), add min-width:0 + overflow-wrap:anywhere on chip and step-link.

Open questions for user
  1) Eyebrow labels (RESULT DOSSIER / JUDGE PROFILE / GENERAL MODE etc.): keep them English-only as branding constants for all locales, or translate them with reduced letter-spacing? Recommendation = English-only.
  2) Hotbar special-btn at 1280×800 Steam Deck: confirm icon-only (label hidden, title= as fallback) is acceptable — the labels are accessible via title and Q/W/E shortcuts.
  3) Numeric step prefixes (01 / 02 / 03 / 04) on result and verdict tabs: confirm they should be dropped on EN / JA / zh-CN. KO retains them.
  4) Compact EN aliases for hotbar slots: do we want them registered in glossary.csv as a separate "compact" column, or applied only via t() keys at the call site?
  5) Steam Deck (1280×800) is the explicit minimum target — any plans to support 1024×768 or smaller? If yes, more breakpoint work is needed.
