Restart Thread-04 Summary
Components/files audited: 18 (PCApp, PCHomeScreen, PCIntroSlides, PCSettingsPanel, PCCourtLayout, PCBottomDock, PCActionsPanel, PCVerdictScreen, PCResultScreen, PCTestConsole, PCInteractionPanel, JudgeObservationSection, JudgeNotebookSection, src/i18n/index.tsx + messages/{common,settings,home,court,verdict,profile}.ts, src/app/pc.css)
Layout / locale risks flagged: 26 (P0:8 P1:14 P2:4)
Locales affected:
  en: 24
  ja: 19
  zh-CN: 19
  ko: 4 (eyebrow/tracking distortion under existing rules)
  all (en|ja|zh-CN): 14

Files written:
  docs/localization/threads/outputs/restart-thread-04-layout-audit/LAYOUT_RISKS.csv
  docs/localization/threads/outputs/restart-thread-04-layout-audit/SCREEN_SURFACE_INVENTORY.csv
  docs/localization/threads/outputs/restart-thread-04-layout-audit/PATCH_SUGGESTIONS_FOR_CODEX.md
  docs/localization/threads/outputs/restart-thread-04-layout-audit/VISUAL_QA_NOTES.md
  docs/localization/threads/outputs/restart-thread-04-layout-audit/SUMMARY.md

Top P0 risks
  1) Settings sidebar (PCSettingsPanel CATEGORIES + 준비 중 badge) — entirely hardcoded ko literals; user who switches language sees ko sidebar everywhere except the Language section. Translate via settings.category.* and add min-width:0 + ellipsis on .pc-settings-sidebar__label.
  2) Settings About card — only credits.title/description are localized; 정보 / 버전 / 빌드 / 엔진 / 크레딧 / 라이선스 stay ko in en/ja/zh. Add settings.about.* keys.
  3) Verdict + Hotbar surfaces — zero t() calls in PCVerdictScreen.tsx and PCBottomDock.tsx. STEPS, footer buttons, hotbar slots, special actions, advance banner, overlays are all ko literals. The most-played gameplay loop is unlocalized.
  4) Eyebrow text-transform:uppercase + letter-spacing:0.2em rule (pc.css :4565-4574) wraps localized .pc-home-v2__eyebrow / .pc-mode-card__badge / .pc-intro__brand-copy — distorts ko/ja/zh-CN. Scope to html[lang^='en'] only; non-EN gets letter-spacing:0.04em + text-transform:none. Inline EN brand literals (RESULT DOSSIER / VERDICT STUDIO etc.) stay as-is and only render uppercase under the EN-scoped rule.
  5) .pc-home-v2__hero h1 has white-space:nowrap + clamp(44px,4.6vw,64px) + 2× 48px scale ornaments + 28px gaps. EN 'Verdict Zero: Trial of Truth' is tight at 1280×800. Switch to controlled wrap with max-width:min(1100px, 100% - 200px).
  6) PCApp splash / Steam-auth / Preparing screens have no language switcher (PCLanguageSelector was removed). First-launch users with mismatched browser locale cannot change language until they reach Home → Settings. Decide: re-introduce a small selector overlay or persist locale earlier via the launcher.

Top P1 risks
  - PCIntroSlides brand band overflows at 1280×800 in EN ('Verdict Zero: Trial of Truth | COURT SIMULATION GAME | <kicker>'); buttons hardcoded ko.
  - PCHomeScreen ModeCard / DepthHeader / InfoCard / desk tabs / leaderboard rows / AxisRow poles still ko literals; some rows lack min-width:0 + ellipsis.
  - PCResultScreen TABS '01 결과 확인 / 02 판결 선고 / 03 후일담 / 04 보너스' + getRating ko; needs result.tab.* + result.rating.* keys.
  - PCCourtLayout PHASE_LABELS hardcoded; phase pill stays ko in en/ja/zh.
  - .pc-play-hbar grid steps from 196px to 78px at 1320px — Steam Deck (1280×800) sits on the boundary; need a deck-tuned breakpoint.
  - 80+ word-break:keep-all rules without paired overflow-wrap will overflow EN long words; one html[lang^='en'] override fixes it.

CSS / component changes recommended first (in patch order)
  P0-1  i18n base (locale-aware word-break / overflow-wrap / hyphens / letter-spacing) at top of pc.css
  P0-2  Scope uppercase + 0.2em eyebrow rule to html[lang^='en'] (and pc-splash__sub 0.16em likewise)
  P0-3  Replace .pc-home-v2__hero h1 nowrap with controlled wrap + max-width
  P0-4  Translate PCSettingsPanel CATEGORIES + badge + add sidebar __label clamp
  P0-5  Translate PCSettingsPanel AboutSection literals
  P0-6  Translate PCVerdictScreen STEPS + footer + add chip / step-link wrap rules
  P0-7  Translate PCBottomDock hotbar slots / special actions / overlay / advance banner + add slot-nm 2-line clamp + special-btn icon-only ≤1320px
  P0-8  PROJECT_CONTROL_TOWER decision: language fallback during splash / loading screens
  P1-1..P1-7 follow-up screens (intro slides, home migrations, result tabs, court phase pill, interaction panel, resolution-confirm modal, Steam-Deck breakpoint)

Anything PROJECT_CONTROL_TOWER must decide
  Q1. Language switcher during splash / loading screens — re-introduce a lightweight overlay (P0-8 option A) or rely on launcher / Steam handoff (option B)?
  Q2. Eyebrow strategy — keep inline English brand literals (RESULT DOSSIER / VERDICT STUDIO / GENERAL MODE / JUDGE PROFILE / JUDGE AXES / PLAY HISTORY / JUDGE DESK / DISPLAY / AUDIO / GAMEPLAY / LIVE / SETTINGS / SCOREBOARD / HALL OF FAME) for all locales as branding constants, or translate them and remove uppercase entirely? Audit recommends: keep as English brand constants, scope uppercase to html[lang^='en'].
  Q3. Numeric step prefixes (01 / 02 / 03 / 04) on result + verdict tabs — drop in en/ja/zh-CN, keep in ko? Audit recommends yes.
  Q4. ModeCard NORMAL MODE badge value vs season.name — split classes (.pc-mode-card__badge--brand for English vs .pc-mode-card__badge--locale for season name) or feed both through a single locale-aware rule?
  Q5. Compact hotbar slot aliases (Facts / Motive / Empathy / Free Q / Evidence / Witness) — ship as a separate "compact" column in glossary.csv, or only as t() values at the call site?
  Q6. PC_HOME_INTRO_SLIDES content + EMOTION_LABELS / TYPE_LABELS / observation Set keys — these are stringly-typed ko. Sequence the migration before Codex translates the layout, or accept that intro slides + observation chips remain ko in v0.x?
  Q7. Resolution support — Steam Deck 1280×800 is the explicit minimum. Confirm no 1024×768 or smaller targets exist (would require additional breakpoints).
