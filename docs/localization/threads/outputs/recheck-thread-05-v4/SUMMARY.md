# Restart Thread-05 Re-check v4 — Tier A Verification

**Date: 2026-05-06.** Limited verification of Codex's Tier A application: 3 active case localePolicy promotion to `tier-a-draft` + validate-script-locale.cjs lexeme matcher wiring + check:all integration + public brand guard.

## Scope (announced by PROJECT_CONTROL_TOWER)

- localePolicy 콘텐츠 적정성 (active 3 cases)
- lexeme matcher wiring (validate-script-locale.cjs)
- check:all 통합
- public brand guard (truth lexeme matcher와 분리)
- behaviorHint Tier B 보류 게이팅 확인

## Inputs verified

- `src/data/disclosurePolicy/spouse-01.json` (1914 lines) — localePolicy block lines 305-444
- `src/data/disclosurePolicy/family-01.json` (2391 lines) — localePolicy block lines 415-558
- `src/data/disclosurePolicy/friend-01.json` (432 lines) — localePolicy block lines 95-236
- `scripts/validate-script-locale.cjs` (421 lines) — full file
- `package.json` `check:all` chain
- `docs/localization/glossary.csv` (140 rows) — brand structure rows still locked

## Tier A verification matrix

51 individual checks across 3 cases + script wiring + integration. **All PASS.** See [`TIER_A_VERIFICATION_MATRIX.csv`](TIER_A_VERIFICATION_MATRIX.csv) for the full per-aspect evidence trail.

| Verification group | Cases / scope | Result |
|---|---|---|
| schemaVersion = `script-localization-v1` | 3 cases | ✅ all PASS |
| status = `tier-a-draft` (not scaffold) | 3 cases | ✅ all PASS |
| forbiddenLexemes populated per locale | 3 cases × 3 locales = 9 | ✅ all PASS (18-21 entries each) |
| paraphraseLexemes populated per locale | 3 cases × 3 locales = 9 | ✅ all PASS (6 entries each) |
| uiSurfaceMap populated per locale | 3 cases × 3 locales = 9 | ✅ all PASS (6 fields each) |
| doNotLocalizeFields includes behaviorHint | 3 cases × 3 locales = 9 | ✅ all PASS |
| Tier B deferral notes block | 3 cases | ✅ all PASS |
| validate-script-locale.cjs structural validation | scaffold-rejection + non-empty + array/object types | ✅ PASS |
| Lexeme matcher wiring | forbiddenLexemes + paraphraseLexemes both checked | ✅ PASS |
| truthStage S5 gating | post-confession lexeme allowance | ✅ PASS |
| behaviorHint Tier B gating | `skipCaseLexemes: true` at 4 call sites | ✅ PASS |
| Public brand guard distinct from truth lexeme | brand always runs / lexeme conditional | ✅ PASS |
| EN brand patterns coverage | 3 patterns with `/i` flag | ✅ PASS |
| JA brand pattern (correctly narrow) | only `ソロモン法廷` rejected; locked `ソロモンのジレンマ` allowed | ✅ PASS |
| zh-CN brand patterns (correctly strict) | `所罗门` + `所羅門` (Simplified + Traditional) | ✅ PASS |
| check:all integration | localization:scripts:validate is 2nd step in check:all | ✅ PASS |
| Strict mode + locale CLI flag | `--strict` + `--locale zh-CN` work | ✅ PASS |

## Findings count

- PASS: 12 verification rows
- P0: 0
- P1: 0
- P2: 7 (all stylistic / Tier A draft expected gaps / future enforcement enhancements)
- INFO: 2 (Tier B activation planning + strict-mode RC gating)

Total findings: 21 (12 PASS + 7 P2 + 2 INFO).

## Architectural strengths observed

1. **Brand guard / truth lexeme separation is correct**. `validateOptionalText` always runs `publicBrandForbidden` patterns first; only `validateCaseLexemes` is conditional on `skipCaseLexemes` and `truthStage`. Brand violation is absolute (no S5 escape); truth lexeme has confession gate. The right separation.

2. **Tier B activation switch is localized** — 4 call sites with `skipCaseLexemes: true` for behaviorHint. When Tier B lands, removing the flag at those 4 sites enables behaviorHint lexeme check. Easy to track and revert.

3. **Defensive layering**: `registerSidecar` does a brand-only sweep over ALL strings in every overlay (line 313-315), so even if a per-variant validator misses a string field, the brand guard still catches violations. Critical for forbidden brand which is absolute.

4. **JA brand pattern is intentionally narrow** (only `ソロモン法廷`) per brand rule "Korean and Japanese may keep Solomon-based naming". The locked `ソロモンのジレンマ` doesn't trigger. Correct policy implementation.

5. **zh-CN brand pattern handles both Simplified and Traditional** — `所罗门` + `所羅門`. Catches all Solomon-based zh-CN forms. Correct policy.

6. **EN brand pattern is strict** — bare `\bSolomon\b` matches any Solomon form (case-insensitive). Aligns with brand rule "EN avoid Solomon".

7. **Schema enforcement is structural** — `validateLocalePolicy` rejects `scaffold` status, demands non-empty arrays/objects per locale. Forces tier promotion before bulk localization.

## P2 — Tier A draft expected gaps (not blockers)

1. **Lexeme coverage gaps vs KO master list (spouse-01)** — KO has 23 forbiddenLexemes; EN/JA/zh-CN have 18-19 each. Missing semantic anchors: `brother's place / 兄の家 / 哥哥家`, `caregiving / 介護 / 照顾`, `family circumstances / 家庭の事情 / 家事`, `8th grader`. Native review pass would close.

2. **paraphraseLexemes lean** — exactly 6 entries per locale per case. Real translators may produce paraphrase forms not on the list. Review pass should expand based on real translation drafts.

3. **doNotLocalizeFields not actively enforced** — declared in policy but the validator walks all strings indiscriminately. If a translator localizes `id` or `key` field by mistake, validator catches only if Solomon literal sneaks in. Optional Tier B enhancement: error if a doNotLocalizeFields path is non-empty in sidecar.

4. **JA brand pattern misses non-locked Solomon-based JA forms** — only `ソロモン法廷` rejected. Other forms like `ソロモンの裁判` / `ソロモン裁判官` / `ソロモン王` slip through. Brand rule allows JA Solomon-based generally; only the rejected subtitle is forbidden. Tier A design choice; may want stricter list as content matures.

5. **EN `\bSolomon\b` over-matches** — would catch any Solomon proper noun (witness named Solomon, Solomon Islands, biblical references). Acceptable in current scope (active 3 cases don't reference Solomon as non-brand). Future case content using the noun would require allowlist.

6. **paraphrase vs forbidden — same blocking severity** — both raise addError. Distinction is error-message-only. Acceptable design; lets reviewers triage by error category.

7. **behaviorHint Tier B activation marker** — 4 call sites with `skipCaseLexemes: true`. Worth a header comment in validate-script-locale.cjs documenting the activation switch for future maintainers.

## INFO — planning input for next phases

1. **Tier B activation effects**: Removing `skipCaseLexemes: true` for behaviorHint will require behaviorHint to (a) honor truthStage gating, (b) avoid forbidden/paraphrase lexemes pre-S5. behaviorHint often references underlying truth (e.g. `S3 짜증나서 부분 시인` referencing 형/조카/돌봄 surface) so failures are likely. Tier B will need either: a parallel `behaviorHintLexemes` list scoped narrower than case-content lexemes, OR an enforcement model where behaviorHint must paraphrase truth at S0–S4 and may state truth at S5.

2. **Strict mode for RC gating**: `--strict` flag is fully implemented but not in `check:all`. Once full sidecar coverage lands across 3 cases × 3 locales × 6 overlay types, enable `--strict` in a `check:rc` script for release-candidate gating.

## Files written

- [`docs/localization/threads/outputs/recheck-thread-05-v4/RECHECK_FINDINGS.csv`](RECHECK_FINDINGS.csv) (21 rows: 12 PASS + 7 P2 + 2 INFO)
- [`docs/localization/threads/outputs/recheck-thread-05-v4/TIER_A_VERIFICATION_MATRIX.csv`](TIER_A_VERIFICATION_MATRIX.csv) (51 evidence rows: 39 case-policy checks + 12 script-wiring checks)
- [`docs/localization/threads/outputs/recheck-thread-05-v4/SUMMARY.md`](SUMMARY.md) (this file)

## PROJECT_CONTROL_TOWER recommended actions

| # | Priority | Action | Owner |
|---|---|---|---|
| 1 | (none required) | Tier A wiring is solid. Proceed with bulk script localization landing per case × locale matrix when ready. | — |
| 2 | P2 (defer) | Native review pass to close lexeme coverage gaps when first sidecar drafts arrive. | translators / native reviewers |
| 3 | P2 (defer) | Optional Tier B enhancement: enforce `doNotLocalizeFields` actively (error if those paths are non-empty in sidecar). | Codex |
| 4 | INFO | Plan Tier B behaviorHint activation: design `behaviorHintLexemes` parallel list OR paraphrase-at-S0-S4 enforcement model. | PROJECT_CONTROL_TOWER + script-thread |
| 5 | INFO | After full sidecar coverage lands, enable `check:rc` script with `--strict` flag for release-candidate gating. | Codex / DevOps |

## Standby for next re-check

Trigger candidates for v5:

- First sidecar drafts (e.g. `src/data/scriptedText/spouse-01.en.json`) landing — verify lexeme/brand catches in real content
- Tier B activation (behaviorHint enforcement) — verify the 4-site flip + behaviorHint compliance
- Generated case overlays (`src/data/cases/generated/{case}.{locale}.json`) — full walkStrings lexeme + brand check on first overlay landings
- Mediation overlays (`src/data/dialogues/mediation/{mediationId}.{locale}.json`) — first overlay landings
- Strict mode enablement in `check:rc` — verify full coverage assertion

When any lands, send re-check request with affected paths and I'll verify against the v4 baseline + decision history.

## Disclosure-policy clearance

Tier A wrapper layer is structurally correct and policy-aligned. After first sidecar overlay drafts land per locale per case, re-run `npm run check:all` to validate runtime behavior. Strict mode (`--strict`) is the recommended pre-merge gate for sidecar PRs.
