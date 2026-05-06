# Thread 03 (zh-CN UI Translation) — Summary

**Source files scanned:** 35 (PC home / settings / result / verdict / debug / hotbar / panels / layout / observation / progression / profile + PCApp.tsx)
**Korean strings extracted:** 297 (incl. duplicates across files)
**Distinct proposed message keys:** 282
**Long-text / readability risks flagged:** 21 (P0:5  P1:9  P2:7)

**Glossary audit (69 rows in glossary.csv):**
- clean: 30
- needs-normalization: 0
- locked-violation: 0
- unused: 39
- new-coverage: 0 (8 new-row candidates listed in IMPLEMENTATION_NOTES §9, not eligible for DELTA)

**Glossary delta proposals:** 2 (high:0  medium:2  low:0)

**Files written:**
- docs/localization/threads/outputs/03-zh-cn-ui-translation/MESSAGE_KEY_PROPOSALS.ts
- docs/localization/threads/outputs/03-zh-cn-ui-translation/SOURCE_STRING_MAP.csv
- docs/localization/threads/outputs/03-zh-cn-ui-translation/READABILITY_RISKS.md
- docs/localization/threads/outputs/03-zh-cn-ui-translation/GLOSSARY_AUDIT.csv
- docs/localization/threads/outputs/03-zh-cn-ui-translation/GLOSSARY_DELTA.csv
- docs/localization/threads/outputs/03-zh-cn-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md
- docs/localization/threads/outputs/03-zh-cn-ui-translation/SUMMARY.md

**Top 3 risks for review:**
1. **5 P0 composed-string refactors** (notes/unseen-count, common/moreCount `외`, home/resolutionConfirm seconds, verdictAdvance modal body, recordSummary moreConvincing party). All require Codex to refactor call sites to pass placeholders via `t(key, { … })`. Direct key-replacement breaks Chinese word order.
2. **Hotbar subtitle overflow risk on Steam Deck (sm bucket).** `pc.actions.interrogation.subtitle` and `pc.actions.evidence.subtitle` land at 22 chars; visual QA pass at 1366×768 required before merge.
3. **Korean source has 2 inconsistencies** that propagate to CN: `엄격` vs `엄정` (verdict axis), `심판 축` vs `판결(균형)` (axis label). Recommend KR-side cleanup before locking glossary CN values.

**Open questions for user:**
1. **Tone choice for 이의 있습니다.** — pick `反对！` (Phoenix-Wright dramatic, currently proposed) or `我提出异议。` (formal courtroom register)?
2. **`체념` emotion meter** — `放弃` (gives up) vs `默许` (resigned acceptance) vs `认命` (accepts fate). 2-char label preferred.
3. **`调查 토큰` glossary** — keep `调查代币` (matches glossary, slight crypto-token feel) or update to `调查点数` (DELTA proposal, more game-UI-natural)?
4. **`信任度` vs `信任`** — DELTA proposes dropping 度 to match actual UI usage (`信任顺序` / `信任恢复`). Confirm or keep current.
5. Confirm Codex should split `messages.ts` into per-surface files before applying — needed to avoid >1000-line single file. (Recommendation in IMPLEMENTATION_NOTES §1.)

**Disclosure-policy clearance:** PASS. None of the translated strings name truth content from the 3 active cases. UI chrome only.
