# Restart Thread-05 Re-check v1 — Codex P0 Verification

**Date: 2026-05-06.** Limited consistency verification of Codex's PCVerdictScreen + PCBottomDock i18n migration, against Restart Thread-05 confirmed decisions and the current glossary state.

## Scope (announced by PROJECT_CONTROL_TOWER)

- PCVerdictScreen step / sidebar / fact / responsibility / solution / confirm / footer i18n
- PCBottomDock hotbar slot / special action / advance banner / overlays / emotion labels i18n
- `src/i18n/messages/verdict.ts` extension
- `src/i18n/messages/hotbar.ts` new namespace + `index.ts` registration
- Compact alias key application
- Numeric prefix decision verification
- Forbidden brand guard
- Disclosure-policy lexeme leakage

## Inputs verified

- `src/i18n/messages/index.ts` — hotbar namespace registered (line 7 import + ja/en/zh-CN spread)
- `src/i18n/messages/verdict.ts` — 40 keys × 4 locales
- `src/i18n/messages/hotbar.ts` — 73 keys × 4 locales (NEW file)
- `docs/localization/glossary.csv` — 137 rows (current state)
- `src/components/pc/verdict/PCVerdictScreen.tsx` — 33 t() calls confirmed
- `src/components/pc/hotbar/PCBottomDock.tsx` — 44 t() calls confirmed

## Decision verifications — all PASS

| # | Decision | Result |
|---|---|---|
| 1 | Numeric prefix dropped on en/ja/zh-CN, KO retains | ✅ PASS — verdict.step.* applied as required (KO `01 / 02 / 03 / 04`; en/ja/zh-CN no prefix) |
| 5 | Compact alias = t() suffix (`.compact`) not glossary column | ✅ PASS — 9 keys × 4 locales = 36 entries verified. EN compact values shortened (Fact / Motive / Empathy / Free / Evidence / Witness + Separate / Protect / Demand). JA / zh-CN .compact = same as .label per Thread-05 design (compact only for EN) |
| 8 | forbidden-brand guard | ✅ PASS — grep across messages/** for forbidden literals returned zero matches |

## Cross-cutting verifications — all PASS

- **Disclosure-policy** ✅ `verdict.fact.locked` keeps abstract gating in all 4 locales. `verdict.factOption.*` uses `{party}` placeholder. No truth content leakage.
- **zh-CN 裁决/判决 process-vs-record split** ✅ Codex applied correctly: process/action context = 裁决 (sidebar.eyebrow / title.final / footer.submit / hotbar.advance.interrogation); record/document context = 判决书 (step.confirm). Mixed usage matches Thread-05 FINAL_NORMALIZED_TERMS row notes.
- **t() wiring** ✅ PCVerdictScreen has 33 t() calls + PCBottomDock has 44 t() calls (was zero before this batch).

## Findings count

- PASS: 5
- P0 (blocking): 0
- P1 (should fix before release): 14
- P2 (polish): 4

Total findings: 18 + 5 PASS rows.

## P1 categories (no blockers, all glossary alignment)

### A. lie_state cluster (KO/EN/JA/zh-CN drift) — 4 findings

Codex preserved component-level KO source (`한계` / `고백` for S4 / S5) over glossary KR (`붕괴` / `자백`). EN scheme also diverges: Codex uses adjective/verb forms (Defensive / Shaken / Excusing / At Limit / Confessed) while glossary has noun forms (Defense / Wavering / Excuse / Breaking / Confession). JA + zh-CN follow.

**Recommendation**: Update glossary to match Codex (KO source canonical, EN scheme = adjective/verb). Verify JA `告白` vs `自白` and zh-CN `承认` vs `自白` with native review — `自白` is the legal/formal `confession`; `告白` and `承认` lean to softer `admission`. Design intent matters here.

### B. emotion_* (en + zh-CN deviations) — 4 findings

Codex: `Defensive / Agitated` (EN) and `防备 / 激动` (zh-CN). Glossary: `Guarded / Enraged` (EN) and `警戒 / 激愤` (zh-CN). KR + JA match glossary.

**Recommendation**: Update glossary to Codex values. Both schemes work; Codex reads more natural as meter state.

### C. verdict.step.* concept disambiguators — 4 findings

EN `Fact Finding / Resolution / Decision` deviate from glossary nouns `fact / solution / verdict`. JA `解決案` deviates from glossary `solution=解決策`.

**Recommendation**: Add 3 new glossary disambiguator rows (mirrors `score_axis_*` pattern that disambiguates score-axis names from gameplay phase nouns):
- `verdict_step_fact_finding` = KO `01 쟁점 판단` / EN `Fact Finding` / JA `争点判断` / zh-CN `争议判断`
- `verdict_step_resolution` = KO `03 해결안` / EN `Resolution` / JA `解決案` / zh-CN `解决方案`
- `verdict_step_decision` = KO `04 판결문` / EN `Decision` / JA `判決文` / zh-CN `判决书`

Plus update glossary `solution` JA value `解決策→解決案` (or document the step-context override).

### D. verdict.step.responsibility — JA/zh-CN suffix usage note — 1 finding

JA `責任配分` and zh-CN `责任分配` add allocation suffix for step-action sense. Bare noun (`責任 / 责任`) used elsewhere. Acceptable; recommend adding usage note to glossary `responsibility` row.

### E. residual hardcoded KO labels in 6 sibling components — 1 finding (out of scope)

`grep` found inline KO in PCCourtLayout / PCActionsPanel / PCInteractionPanel / PCRecordSummary / ArchetypeTag / hotbarHighlight. These consume the same migrated concepts but are OUTSIDE the announced re-check scope. Flag for next Codex pass — except ArchetypeTag + hotbarHighlight which use KO keywords as INTERNAL pattern-matching (do not display); verify if they can stay as-is.

## P2 categories (polish only)

### F. em-dash typography polish missing — 18+ instances

Thread-01 COVERAGE_REPORT proposed em-dash `—` for verdict factOption + defer + judgment + hotbar slot title keys; Codex applied ASCII hyphen `-`. Single-pass typography PR.

### G. EN compact alias deviations from Thread-05 proposal — 4 instances

- `Fact` (Codex) vs `Facts` (Thread-05) — minor
- `Free` (Codex) vs `Free Q` (Thread-05) — minor
- `Protect` (Codex) vs `Confidential` (Thread-05) — verb vs noun; both work
- `Demand` (Codex) vs `Immediate` (Thread-05) — verb vs adverb; both work

**Recommendation**: Keep Codex values. Document Thread-05 proposal as alternate.

### H. carry-over items not in this batch (still pending)

- 9 hardcoded KO toast/dialogue literals (Thread-02 P1) — pending separate Codex pass
- observation Set migration — pending per decision 6 sequence (after EMOTION_LABELS, which IS this batch)

## Files written

- `docs/localization/threads/outputs/restart-thread-05-recheck-v1/RECHECK_FINDINGS.csv` (23 rows: 5 PASS + 14 P1 + 4 P2)
- `docs/localization/threads/outputs/restart-thread-05-recheck-v1/GLOSSARY_VS_KEY_DELTAS.csv` (45 rows — every relevant glossary row + new key cross-referenced; 21 match / 24 deviation)
- `docs/localization/threads/outputs/restart-thread-05-recheck-v1/SUMMARY.md` (this file)

## Recommended PROJECT_CONTROL_TOWER decisions

Three small glossary-side decisions resolve all P1 findings in this batch:

1. **lie_state cluster** — accept Codex schema (한계/고백 KO; adjective/verb EN; matching JA/zh-CN) and update 6 glossary rows. JA 告白 / zh-CN 承认 → flag for native review pass before lock.

2. **emotion_* deviations** — accept Codex values (`Defensive / Agitated` EN; `防备 / 激动` zh-CN) and update 4 glossary fields.

3. **verdict.step.* disambiguators** — add 3 new glossary rows (`verdict_step_fact_finding / verdict_step_resolution / verdict_step_decision`) to document step concepts distinct from gameplay nouns. Mirrors the existing `score_axis_*` pattern.

Plus 1 carry-forward:
- Em-dash typography polish — defer to a single small typography PR (P2).

## Disclosure-policy clearance

PASS for this batch. No hidden-truth lexeme leakage in new keys. After P1 alignment PRs land, run `npm run check:policy` again to verify.

## Re-check standby (next cycles)

Codex's standby-flagged work that will trigger another limited re-check:

- compact hotbar alias key 적용 in call sites (CSS scope `[data-screen-bucket]` selectors) — out of this re-check, will verify when wired
- observation Set migration — pending per decision 6 sequence
- PCActionsPanel + PCInteractionPanel + PCRecordSummary + PCCourtLayout label migration (residual sibling components) — pending
- Hardcoded toast/dialogue literals (Thread-02 P1) — pending

When any of those land, send a re-check request and I'll verify against this batch's findings + the Thread-05 confirmed decisions.
