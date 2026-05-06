# Thread 01-en-ui-translation Summary

```
Source files scanned: 33
Korean strings extracted: ~520 (deduplicated to ~340 unique source lines)
Proposed message keys: 504
Long-text risks flagged: 17 (P0:4 P1:8 P2:5)
Glossary audit:
  clean: 32
  needs-normalization: 8
  locked-violation: 0
  unused: 21
  new-coverage: 35
Glossary delta proposals: 8 (high:5 medium:5 low:0)
  (other 5 entries are documentation rows confirming "no change")
Files written:
  docs/localization/threads/outputs/01-en-ui-translation/MESSAGE_KEY_PROPOSALS.ts
  docs/localization/threads/outputs/01-en-ui-translation/SOURCE_STRING_MAP.csv
  docs/localization/threads/outputs/01-en-ui-translation/LONG_TEXT_RISKS.md
  docs/localization/threads/outputs/01-en-ui-translation/GLOSSARY_AUDIT.csv
  docs/localization/threads/outputs/01-en-ui-translation/GLOSSARY_DELTA.csv
  docs/localization/threads/outputs/01-en-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md
  docs/localization/threads/outputs/01-en-ui-translation/SUMMARY.md
```

## Top 3 risks for review

1. **P0 — Hotbar slot label overflow.** Korean slot names are 4
   characters (e.g. `사실 추궁`); EN equivalents are 12–16 (`Fact Pursuit`,
   `Empathy Approach`, `Demand Answer`). The fixed `.slot-nm` width in
   M/S buckets (~74 px) clips. Mitigation: `[lang="en"]` CSS scope plus
   2-line wrap fallback. Detailed in
   [LONG_TEXT_RISKS.md](LONG_TEXT_RISKS.md) §P0.

2. **P0 — Score axis vs Judge axis Korean ambiguity.** `판결` is used
   both as the *score axis* (alongside 통찰/탐구·권위·지혜) and as the
   *gameplay phase / verdict noun*. Translated as `Authority` for the
   score axis (`sort.authority`, `result.donut.authority`) and `Verdict`
   everywhere else. Same overload affects `해결` (Wisdom vs Solution) and
   `탐구` (Insight vs Inquiry). New glossary IDs `score_axis_authority`,
   `score_axis_wisdom`, `score_axis_insight` proposed in
   [GLOSSARY_AUDIT.csv](GLOSSARY_AUDIT.csv) `new-coverage` rows.

3. **P0 — Korean source has duplicate term `법정 장악` / `법정 지배력`** for
   the same resource. EN collapses both to `Court Control`. Source-side
   cleanup recommended; flagged as a follow-up issue in
   [IMPLEMENTATION_NOTES_FOR_CODEX.md](IMPLEMENTATION_NOTES_FOR_CODEX.md) §10.

## Open questions for user

1. **`솔로몬의 딜레마` vs `Project Solomon`.** The home hero shows
   `솔로몬의 딜레마` (`Solomon’s Dilemma`). The Steam product brand is
   `Project Solomon` (locked in glossary). Should the EN home hero match
   the Steam brand (`Project Solomon`), keep an in-app subtitle
   (`Solomon’s Dilemma`), or use both (`Project Solomon — Solomon’s
   Dilemma`)? Currently translated as `Solomon’s Dilemma` — flagged as
   `requires_user_decision=false` because it’s a stylistic choice the
   reviewer can flip without breaking glossary lock.

2. **`결정적 질문` vs `dossier`.** The combination feed banner says
   `Decisive Question Unlocked` in EN. The glossary draft term is
   `Dossier`. The Korean source never uses the dossier metaphor in UI —
   only in code naming (`dc-` prefix). Recommend keeping `Decisive
   Question` as the user-facing term and reserving `Dossier` for
   internal docs. Flagged in [GLOSSARY_DELTA.csv](GLOSSARY_DELTA.csv)
   with `requires_user_decision=true`.

3. **In-character spoken lines.** Strings like `이의 있습니다.` and
   `즉답을 요구합니다.` are pushed into the chat as the player-judge’s
   line. They straddle UI/dialogue boundaries. Should they translate
   here (this thread), in the dialogue thread, or stay locale-locked
   (Korean only)? Currently translated as `Objection.` and `I demand an
   immediate answer on this dispute.` — flagged in
   [IMPLEMENTATION_NOTES_FOR_CODEX.md](IMPLEMENTATION_NOTES_FOR_CODEX.md) §8
   for design sign-off before Codex applies.

4. **Solution category translations.** 14 gameplay solution categories
   (`공동재산회복` → `Joint Property Recovery`, etc.) are proposed but
   should not auto-apply without design review. They sit between UI
   (label) and content (gameplay mechanic).
