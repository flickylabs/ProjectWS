# Restart Thread 02 (JA UI) — Summary

## Scope reminder

- Restart prompt: [docs/localization/threads/restart-02-claudecode-ja-ui-translation.md](docs/localization/threads/restart-02-claudecode-ja-ui-translation.md)
- Reviewed only the keys that exist in [src/i18n/messages/](src/i18n/messages/) namespaces today, plus a focused sweep of unwired UI strings in source areas.
- Did **not** touch `src/data/**`, Steam, Electron, server, Railway, or scripted dialogue.

## Counts

- **Total keys reviewed**: 55 across 6 namespaces
  - common: 14
  - settings: 8
  - home: 7
  - court: 19
  - verdict: 5
  - profile: 2
- **Status breakdown**:
  - ok: 41
  - changed: 7
  - needs_native_review: 7
  - needs_codex_refactor: 0
- **Missed static strings found (not yet wired)**:
  - 9 confirmed showToast / addDialogue / resource-recovery KO literals (P1/P2) — see [SOURCE_STRING_MAP.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/SOURCE_STRING_MAP.csv)
  - **~470 distinct UI strings** still hardcoded across PCHomeScreen, PCSettingsPanel, PCBottomDock, PCActionsPanel, PCInteractionPanel, PCJudgeProgressionPanel, PCDialogueLog, observation/notebook drawers, etc. Comprehensive list lives in the prior thread output [02-ja-ui-translation/SOURCE_STRING_MAP.csv](docs/localization/threads/outputs/02-ja-ui-translation/SOURCE_STRING_MAP.csv) (791 rows).
- **Long-text risks**: 16 entries flagged in [LONG_TEXT_RISKS.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/LONG_TEXT_RISKS.csv) (P1: 3, P2: 13)
- **Glossary audit**: 28 terms reviewed; 1 critical gap (`court_control` 법정 장악 missing); 1 source-of-truth update needed (`project_solomon` underscore + add `public_full_title` entry); 1 truth/真相 lexicon alignment (current i18n leaks 真実 into court namespace).

## Files written

- [docs/localization/threads/outputs/restart-thread-02-ja-ui/MESSAGE_PATCH_PROPOSAL.ts](docs/localization/threads/outputs/restart-thread-02-ja-ui/MESSAGE_PATCH_PROPOSAL.ts)
- [docs/localization/threads/outputs/restart-thread-02-ja-ui/COVERAGE_REPORT.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/COVERAGE_REPORT.csv)
- [docs/localization/threads/outputs/restart-thread-02-ja-ui/SOURCE_STRING_MAP.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/SOURCE_STRING_MAP.csv)
- [docs/localization/threads/outputs/restart-thread-02-ja-ui/LONG_TEXT_RISKS.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/LONG_TEXT_RISKS.csv)
- [docs/localization/threads/outputs/restart-thread-02-ja-ui/GLOSSARY_AUDIT.csv](docs/localization/threads/outputs/restart-thread-02-ja-ui/GLOSSARY_AUDIT.csv)
- [docs/localization/threads/outputs/restart-thread-02-ja-ui/SUMMARY.md](docs/localization/threads/outputs/restart-thread-02-ja-ui/SUMMARY.md)

## Brand-rule compliance

All current JA values in the namespaces match the locked brand title `ソロモンのジレンマ：真実の裁き` (full-width colon). No occurrences of `ソロモン法廷` or `プロジェクト・ソロモン` were found in the 55 wired keys. Internal `brand.internalProjectName` correctly uses `Project_Solomon` with underscore.

## Top P0/P1 risks for review

### P0 (none)
No locked-glossary violations or hidden-truth leaks detected in the current 55-key surface.

### P1
1. **`court_control` (법정 장악) is not in glossary** — concept used in 5+ source-code locations (PCInteractionPanel toast, useActionDispatch system dialogue, resourceSlice failure messages). Rendered consistently as `法廷掌握` in proposals, but without a glossary anchor, parallel locale threads (en/zh-CN) can diverge. PROJECT_CONTROL_TOWER decision: add `court_control` glossary entry.
2. **`pc.verdictAdvance.conditionsMissing` currently renders 真実 instead of 真相** — disclosure-policy and `truth` glossary both use 真相. The patch proposal corrects this; until applied, JA verdict-advance toast leaks the wrong truth-noun. Low policy risk (it's a UI prompt, not a hidden-truth channel) but it's a glossary inconsistency that propagates if the string is reused.
3. **9 hardcoded KO toast/dialogue literals still in source code** (showToast / addDialogue / resourceSlice failure). Visible to JA players as raw KO if locale=ja. Wire them via the new `pc.toast.*` / `pc.dialogue.system.*` / `pc.resource.recovery.*.failure` keys proposed in SOURCE_STRING_MAP.
4. **`home.tagline` uses 裁き手 instead of 裁判官** — diverges from glossary `judge=裁判官` and KO source 재판관. The patch proposal corrects this.

### P2
- 16 long-text risks (see LONG_TEXT_RISKS.csv). Highest concern: `pc.verdictAdvance.minimumVisible` and `pc.verdictAdvance.hidden.body` may wrap to 3+ lines on Steam Deck (XS bucket).
- ~470 unwired UI strings remain across major PC components. Until those are wired, switching `locale=ja` shows mostly KO text outside the splash/settings/verdict-advance shell.

## Anything PROJECT_CONTROL_TOWER must decide

1. **Update glossary `project_solomon` row?** Current `glossary.csv` line 2 has `project_solomon,product,Project Solomon,Project Solomon,Project Solomon,Project Solomon,...,locked,true,...`. New brand rules differentiate internal name (`Project_Solomon` with underscore) from public titles (per-locale, full-width colon). Recommend (a) update the existing `project_solomon` row's KO/EN/JA/ZH columns to `Project_Solomon`, then (b) add a new `public_full_title` row (locked) with the four locale-specific public titles.
2. **Add `court_control` glossary entry**? Required for cross-locale consistency. Proposed: ko=법정 장악, en=Court Control, ja=法廷掌握, zh-CN=法庭掌控, locked=false (draft).
3. **Wire the 9 hardcoded KO toast/dialogue strings**? Proposed key namespace in SOURCE_STRING_MAP. Decision needed on whether `pc.dialogue.system.insufficientControl` (routed via addDialogue) should be a separate key from the toast variant or share one — code currently emits both, with same text.
4. **Apply the 7 `changed` patches** in MESSAGE_PATCH_PROPOSAL.ts (home.tagline, pc.combo.ready, pc.combo.potential, pc.combo.readyMaterialsNotice, pc.verdictAdvance.conditionsMissing, pc.verdict.factOption.partyClaimCorrectWithContradiction, pc.verdict.responsibility.similar)? These are confidence-medium-to-high improvements (glossary alignment + naturalness) with no breaking change.
5. **Apply the 7 `needs_native_review` patches**? Lower urgency; defer to native JA reviewer pass before locking.
6. **Out-of-scope but blocking for full JA coverage**: ~470 unwired UI strings. This is a separate Codex i18n-wiring effort, not a translation thread output. Reference the prior thread output as the comprehensive translation map.
