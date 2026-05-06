# Restart Thread-05 Re-check v2 — Codex P1 / 6 sibling migration verification

**Date: 2026-05-06.** Limited verification of Codex's recheck v1 follow-up: glossary lie_state/emotion_* updates + 3 new verdict_step_* disambiguator rows + 6 sibling component i18n migration + compact alias call-site wiring.

## Scope (announced by PROJECT_CONTROL_TOWER)

- glossary updates: lie_state cluster + emotion_defensive/angry + verdict_step_* disambiguators + responsibility usage note
- 6 sibling component i18n migration: PCCourtLayout / PCActionsPanel / PCInteractionPanel / PCRecordSummary / ArchetypeTag / hotbarHighlight
- compact alias state in PCBottomDock
- forbidden brand grep
- disclosure-policy lexeme leak
- remaining P1/P2 + next priorities

## Inputs verified

- `docs/localization/glossary.csv` — 140 rows (137 → 140; 3 new disambiguator rows added)
- `src/i18n/messages/{common,settings,home,court,verdict,hotbar,layout,profile,scripts}.ts` — 9 namespaces (was 7; added hotbar.ts in prior cycle, scripts.ts new)
- 6 sibling components — t() / translate() call counts: PCCourtLayout 51 / PCActionsPanel 32 / PCInteractionPanel 79 / PCRecordSummary 50 / ArchetypeTag 4 / hotbarHighlight 3
- `src/components/pc/hotbar/PCBottomDock.tsx` — 9 .compact call sites confirmed (lines 507-560)
- forbidden-brand grep across `src/i18n/messages/**` + `src/components/pc/**` — zero matches
- disclosure-policy lexeme grep across `src/i18n/messages/**` — only the locked brand subtitle 真実の裁き (allowed) + 1 stale 真実 in layout.ts:645 + 2 brand-aligned 真実 in home.ts intro slides

## Decision verifications — all PASS

| Verification | Result |
|---|---|
| Decision 1 (numeric prefix): KO retains, en/ja/zh-CN drop | ✅ PASS — verdict.step.* + glossary disambiguator KO source values include `01 / 03 / 04` prefix when not corrupted |
| Decision 5 (compact alias = t() suffix): 9 keys × 4 locales | ✅ PASS — all 9 wired in PCBottomDock; .compact rendered in chip span; .label used in title attribute for accessibility |
| Decision 8 (forbidden-brand linter): zero forbidden literals in PC scope | ✅ PASS — grep clean across messages + components |
| Decision 6 (migration sequence: SLIDES → EMOTION_LABELS → observation Set) | ✅ PARTIAL — SLIDES + EMOTION_LABELS done; observation Set still pending (correct order) |

## Findings count

- PASS: 9
- **P0 (BLOCKING): 2** — glossary CJK encoding corruption + validator gap
- P1: 1 — layout.ts:645 stale 真実
- P2: 5 — stylistic / out-of-scope flags

Total findings: 17 (9 PASS + 2 P0 + 1 P1 + 5 P2)

## CRITICAL — P0 ENCODING CORRUPTION

**11 glossary rows have CJK characters silently corrupted to `?` placeholders.** The `npm run localization:glossary` validator PASSED because `?` is a valid character. This is data damage that the toolchain did not catch.

### Affected rows (canonical values pulled from `src/i18n/messages/verdict.ts`)

| Line | term_id | Field | Current (corrupt) | Canonical |
|---|---|---|---|---|
| 30 | responsibility | note | `JA uses ???? and zh-CN uses ????` | `JA uses 責任配分 and zh-CN uses 责任分配` |
| 100 | emotion_defensive | zh-CN | `??` | `防备` |
| 103 | emotion_angry | zh-CN | `??` | `激动` |
| 105 | lie_state_s0 | JA | `??` | `防御` |
| 105 | lie_state_s0 | zh-CN | `??` | `防备` |
| 108 | lie_state_s3 | zh-CN | `????` | `被逼入角` |
| 109 | lie_state_s4 | KO | `??` | `한계` |
| 109 | lie_state_s4 | JA | `??` | `限界` |
| 109 | lie_state_s4 | zh-CN | `????` | `到达极限` |
| 110 | lie_state_s5 | KO | `??` | `고백` |
| 110 | lie_state_s5 | JA | `??` | `告白` |
| 110 | lie_state_s5 | zh-CN | `??` | `承认` |
| 110 | lie_state_s5 | note | `JA ?? and zh-CN ?? require...` | `JA 告白 and zh-CN 承认 require...` |
| 138 | verdict_step_fact_finding | KO | `01 ?? ??` | `01 쟁점 판단` |
| 138 | verdict_step_fact_finding | JA | `????` | `争点判断` |
| 138 | verdict_step_fact_finding | zh-CN | `????` | `争议判断` |
| 139 | verdict_step_resolution | KO | `03 ???` | `03 해결안` |
| 139 | verdict_step_resolution | JA | `???` | `解決案` |
| 139 | verdict_step_resolution | zh-CN | `????` | `解决方案` |
| 140 | verdict_step_decision | KO | `04 ???` | `04 판결문` |
| 140 | verdict_step_decision | JA | `???` | `判決文` |
| 140 | verdict_step_decision | zh-CN | `???` | `判决书` |

Full mapping in [`GLOSSARY_VS_KEY_DELTAS.csv`](GLOSSARY_VS_KEY_DELTAS.csv).

### Required Codex fixes (P0)

1. **Restore CJK encoding in 11 rows** — apply canonical values above. Save the file with UTF-8 encoding (no BOM).
2. **Add validator guard** — extend `scripts/validate-glossary.*` to reject:
   - any value containing 2+ consecutive `?` characters
   - any value matching pattern `\d+ \?+( \?+)*` (e.g. `01 ?? ??`)
   - empty CJK column when sibling locales have non-empty values
   - Add to `npm run check:all` so future encoding round-trips are caught.

## P1

**`pc.record.noConfirmedFacts` JA still uses 真実** at `src/i18n/messages/layout.ts:645`. Glossary truth=真相. Same alignment issue Thread-02 fixed in `pc.verdictAdvance.conditionsMissing` (court.ts:74) but not propagated to layout.ts. Single-character patch (真実→真相).

## P2 (stylistic / out-of-scope)

1. **Brand-aligned 真実 in intro slides** — `pc.home.intro.slide.digitalCourt.body` + `.conflict.title` use 真実 to match locked brand subtitle 真実の裁き. Native review decision: keep brand cohesion (recommended) or strictly align to glossary 真相.

2. **i18n style inconsistency across siblings** — PCInteractionPanel uses `translate()` helper; others use `useI18n().t()` hook. Both functional. Stylistic standardization for follow-up.

3. **3 remaining `법정 장악` inline KO** in PCTestConsole / MiniGameFrame / PCJudgeProgressionPanel. Out of recheck scope; flag for next Codex pass (PCJudgeProgressionPanel is shipped UI, P1 once profile namespace expands).

4. **9 hardcoded toast/dialogue literals** (Thread-02 P1) still pending. PCInteractionPanel × 2 / PCRightPanel × 4 / useActionDispatch × 2 / resourceSlice × 2.

5. **observation Set migration** still pending per decision 6 sequence (last step after SLIDES + EMOTION_LABELS done).

6. **Legacy mobile App.tsx + IntroSlides.tsx** — `현대판 솔로몬` literal present. NOT PC scope (PC uses PCApp.tsx). Informational only.

## Files written

- [`docs/localization/threads/outputs/recheck-thread-05-v2/RECHECK_FINDINGS.csv`](RECHECK_FINDINGS.csv) (17 rows: 9 PASS / 2 P0 / 1 P1 / 5 P2)
- [`docs/localization/threads/outputs/recheck-thread-05-v2/GLOSSARY_VS_KEY_DELTAS.csv`](GLOSSARY_VS_KEY_DELTAS.csv) (45 rows — every modified glossary row + canonical value cross-reference)
- [`docs/localization/threads/outputs/recheck-thread-05-v2/SUMMARY.md`](SUMMARY.md) (this file)

## PROJECT_CONTROL_TOWER required actions

| # | Priority | Action | Estimated effort |
|---|---|---|---|
| 1 | P0 | Restore CJK encoding in 11 glossary rows (canonical values in this report) | Single-file patch |
| 2 | P0 | Add `?` placeholder + empty-CJK guard to `scripts/validate-glossary.*` and wire into `check:all` | Small script change |
| 3 | P1 | Patch layout.ts:645 JA 真実→真相 | 1-character |
| 4 | P2 | Native review: intro slide 真実 (brand cohesion vs glossary alignment) | Native review |
| 5 | P2 | Next Codex priorities — choose order from: (a) PCJudgeProgressionPanel inline `법정 장악` migration, (b) 9 hardcoded toast/dialogue literals, (c) observation Set migration | Sequencing decision |

## Disclosure-policy clearance

PASS for this scope. No new hidden-truth lexeme leak. After P0 + P1 patches land, run `npm run check:policy` to re-verify (the layout.ts:645 JA fix in particular routes through truth-progress UI surfaces).

## Standby for next re-check

Codex's next batch will likely include items (a)/(b)/(c) above. When any lands, send a re-check request and I will verify against:
- the v2 P0 fix (CJK restoration)
- the v2 P1 fix (layout.ts:645)
- new keys vs glossary alignment
- forbidden-brand + disclosure-policy guards
- new Codex priority area (e.g. observation Set decoupling, toast/dialogue migration, or PCJudgeProgressionPanel)
