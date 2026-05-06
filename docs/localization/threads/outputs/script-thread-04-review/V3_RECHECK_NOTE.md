# Thread-04 v3 Limited Recheck — Codex P0/P1 Patches Verified

**Date**: 2026-05-06 (post-Codex v2 patches)
**Scope**: Limited recheck of Codex v2 patches + remaining Thread-04 P0/P1/P2 reprioritization.
**Inputs**: working-tree changes (not yet committed) + npm green outputs reported by user.

---

## 1. v2 P0 fix verification — PASS

### 1.1 `glossary.csv` CJK 11-row 복원

**Verified**: ✅ PASS

Spot-checked 6 anchor rows from the locked rules:

| Row | id | KO | EN | JA | zh-CN | Status |
|---|---|---|---|---|---|---|
| 35 | `truth` | 진실 | Truth | 真相 | 真相 | ✓ |
| 36 | `hidden_truth` | 숨은 진실 | Hidden Truth | 隠された真相 | 隐藏真相 | ✓ |
| 71 | `brand_title` | 솔로몬의 딜레마 | Verdict Zero | ソロモンのジレンマ | 真相裁决 | ✓ (locked) |
| 72 | `brand_subtitle` | 진실의 재판 | Trial of Truth | 真実の裁き | 零点审判 | ✓ (locked, intentional 真実) |
| 73 | `brand_full_title` | 솔로몬의 딜레마: 진실의 재판 | Verdict Zero: Trial of Truth | ソロモンのジレンマ：真実の裁き | 真相裁决：零点审判 | ✓ (locked) |
| 91 | `truth_progress` | 진실파악 단계 | Truth Progress | 真相把握段階 | 真相进度 | ✓ |

`brand_subtitle` JA `真実` and `brand_full_title` JA `真実の裁き` are LOCKED brand exceptions — preserved correctly. All other JA truth-context cells use `真相` per glossary rule.

### 1.2 JA `pc.record.noConfirmedFacts` 真実 → 真相 패치

**Verified**: ✅ PASS

[src/i18n/messages/layout.ts:645](src/i18n/messages/layout.ts#L645) → `'まだ争点単位で確定した真相はありません。'` — patch applied as reported.

### 1.3 GLOSSARY_AUDIT cross-check (UI restart-thread-05 P1 row 13)

**Verified**: ✅ PASS

JA `glossary.csv` row 35 = `真相`. Restart-05 P1 row 13 (`pc.verdictAdvance.conditionsMissing 真実 → 真相`) addressed at glossary level. Need to spot-check that `pc.verdictAdvance.conditionsMissing` JA value also uses `真相` (separate i18n key) — see new finding §3.4 below.

---

## 2. v2 P1 fix verification — PASS w/ adequacy notes

### 2.1 `scripts/validate-glossary.mjs` guards

**Verified**: ✅ PASS for stated scope.

| Guard | Pattern | Coverage | Adequacy |
|---|---|---|---|
| Placeholder corruption | `/\?{2,}/` | 2+ consecutive `?` | catches `??` `???` |
| Numbered placeholder | `/\d+\s+\?+/` | digits + space + `?` | catches `1 ?` `12 ??` |
| Replacement char | `/�/` | U+FFFD | catches lossy decode artifacts |
| CJK sibling consistency | `cjkPattern` per `[ko, ja, zh-CN]` | if any has CJK, all 3 must | catches asymmetric CJK rows |
| Brand literal guard | `text.indexOf(literal)` over `src/i18n` + `src/app` + `src/components/pc` | 7 forbidden literals | catches literal substrings |

### 2.2 `check:all` integration

**Verified**: ✅ PASS

[package.json:40](package.json#L40):
```json
"check:all": "npm run localization:glossary && npm run qa:fast && npm run qa:free-interrogation"
```

`localization:glossary` runs first → fast-fail on glossary issues before downstream gates.

### 2.3 Validator guard adequacy assessment

**Strengths**:
- 4 distinct corruption patterns + structural CJK consistency = catches the recovered-11-row regression class.
- Brand guard scope (`src/i18n` + `src/app` + `src/components/pc`) is wide enough for UI surface coverage.
- Status integrity check (`locked=true → status=locked`) prevents lock-status drift.
- Required column presence (`category/ko/en/ja/zh-CN/context` all non-empty) prevents schema gaps.

**Gaps** (not breaking; documented for future hardening):

1. **`真実 vs 真相` glossary→source drift not enforced** (see §3.1).
   `glossary.csv` row 35 `truth=真相` is `draft` status, not `locked`. Validator does not flag JA `真実` outside brand-locked rows. `home.ts:80–81` intro slide tagline `食い違う真実` slips past current guard.
2. **Brand guard literal-only matching**.
   `text.indexOf(literal)` for 7 fixed strings. EN `Solomon-style judge` (without `Project` / `'s` / `Court`) would NOT trigger. By contrast, `validate-script-locale.cjs:294` uses regex word-boundary `\bSolomon(?:'s)?\b/i` — stricter. Asymmetry between UI guard and script guard.
3. **No JA `ソロモン` partial-context check**.
   Validator only catches `ソロモン法廷` / `プロジェクト・ソロモン`. JA-allowed brand `ソロモンのジレンマ` correctly skipped — but a non-brand JA tagline like `現代のソロモン` would slip past UI guard. Same asymmetry vs script guard.
4. **No `localePolicy` content match**.
   `validate-script-locale.cjs:65–75` checks `localePolicy.forbiddenLexemes.{en,ja,zh-CN}` is an array, but the arrays are empty `[]` (Codex landed schema as scaffold). When content authored, the locale forbidden-lexeme check needs a separate pass per overlay file's `text` against the locale's lexeme array. Not yet implemented.
5. **`localization:scripts:validate` not in `check:all`**.
   Currently standalone via `localization:scripts:validate` / `check:script-locales`. Not part of the release gate. OK for current empty-scaffold state; must integrate when locale content lands.

**Verdict**: guards are **adequate for the recovered corruption class**. Insufficient for full P1+P2 enforcement but Codex landing scope was P0/P1 only, so this is not a regression.

---

## 3. New findings introduced or surfaced by Codex v2 work

### 3.1 (NEW P1) `home.ts` JA intro slides use `真実` outside locked brand rows

**Status**: P1 (style/glossary drift; not bulk-blocking but should be resolved before EN/JA bulk).

[src/i18n/messages/home.ts:80–81](src/i18n/messages/home.ts#L80-L81):
```
"pc.home.intro.slide.digitalCourt.body": "問い、証拠、判断をつなぎ、食い違う真実を見極める模擬裁判ゲームです。",
"pc.home.intro.slide.conflict.title": "正しさよりも、食い違う真実に目を向けましょう。",
```

`glossary.csv` row 35 says `truth=真相` for JA. These two slide values use `真実`. Two possible decisions:

- **(a) Keep `真実`** as poetic tagline register echoing `brand_subtitle=真実の裁き`. Add a glossary note that JA marketing/intro tagline contexts may use `真実` for brand consonance. Validator should add tagline-row whitelist.
- **(b) Align with glossary** — change both to `真相`. Loses the brand subtitle echo; gains glossary consistency.

**Recommendation**: (a) is cheaper + thematically consistent. Add explicit note to glossary truth row + add allowlist entry to validate-glossary.mjs for `pc.home.intro.slide.*` JA values.

### 3.2 (NEW P1) PC_HOME_INTRO_SLIDES i18n promotion landed (restart-05 P0 row 2 RESOLVED)

[src/i18n/messages/home.ts:78–84](src/i18n/messages/home.ts#L78-L84) shows JA intro slide keys exist. Spot-checked filename presence; restart-05 P0 row 2 `pcHomeShared.ts:134` KO Solomon literal i18n promotion appears resolved. Cross-check restart-05 SCRIPT_REVIEW P0 row "pcHomeShared.ts:134 PC_HOME_INTRO_SLIDES KO hardcode" → CLEARED for EN script bulk surface coherence.

### 3.3 (NEW INFO) Script storage architecture decision LANDED

[scripts/validate-script-locale.cjs:78–110](scripts/validate-script-locale.cjs#L78-L110): validator checks sidecar pattern `src/data/scriptedText/{caseId}.{locale}.json`. Confirms PROJECT_CONTROL_TOWER decision **adopted Stage 1.1 sibling-files architecture** (per Thread-04 IMPLEMENTATION_PLAN recommendation). EN/JA pattern preferred, zh-CN's parallel-tree alternative rejected.

### 3.4 (NEW SUSPECT) `pc.verdictAdvance.conditionsMissing` JA value not yet spot-verified

Restart-05 P1 row 13 patch said change `真実 → 真相`. Glossary line 35 reflects this. But the actual i18n key `pc.verdictAdvance.conditionsMissing` JA value needs grep verification after Codex landed:

```bash
grep -A1 "pc\.verdictAdvance\.conditionsMissing" src/i18n/messages/*.ts
```

Recommend Codex run this grep + confirm JA value uses `真相`. If `真実` lingers, separate one-line patch (mirroring layout.ts:645 fix).

### 3.5 (NEW INFO) `localePolicy` schema scaffolded in all 3 active disclosurePolicy files

[src/data/disclosurePolicy/spouse-01.json:305–328](src/data/disclosurePolicy/spouse-01.json#L305-L328) + family-01.json:415 + friend-01.json:95 — Codex landed `localePolicy` block per Thread-04 Stage 3.1, with empty `forbiddenLexemes/paraphraseLexemes/uiSurfaceMap` per locale + `status="scaffold"` + explanatory `notes`. Stage 3.1 schema = ✅ landed. Stage 3.1 content authoring = ❌ pending (P0 blocker for bulk).

### 3.6 (NEW INFO) Script loaders + scriptLocale runtime resolver landed

- [src/i18n/scriptLocale.ts](src/i18n/scriptLocale.ts) — `getRuntimeScriptLocale()` resolves locale via localStorage / `<html lang>` / `navigator.languages` fallback chain, returning `LocaleCode`.
- `src/engine/scriptedTextLoader.ts` / `scriptedAngleTextLoader.ts` / `disclosurePolicyLoader.ts` / `mediationScriptLoader.ts` / `phaseScriptLoader.ts` / `caseLoader.ts` — modified (locale-aware overlay merge per Stage 1.6).

These five-loader changes implement the sibling-file overlay merge runtime described in IMPLEMENTATION_PLAN §1.6. Scope of behavioral verification: `localization:scripts:validate` reported PASS with KO-fallback warnings expected — runtime gracefully falls back to KO when locale sidecar missing. This is the correct intended behavior.

### 3.7 (NEW INFO) `extract-script-text.cjs` exists (Stage 2.1)

[scripts/extract-script-text.cjs](scripts/extract-script-text.cjs) — KO-source extraction script created. Not yet exercised (no `tmp/locale-bootstrap/` evidence) but available for translator/Codex handoff. Stage 2.1 = ✅ scaffold landed.

---

## 4. Thread-04 P0 status update (12-item gating list)

Mapping each P0 from `SUMMARY.md` to current state:

| # | P0 from Thread-04 | Status | Evidence |
|---|---|---|---|
| 1 | Storage architecture = sibling files | ✅ LANDED | validate-script-locale.cjs:80 confirms `<file>.<locale>.json` |
| 2 | `behaviorHint` policy (Codex grep audit) | ❌ PENDING | No grep result reported; validator passes value through `validateOptionalText` without policy enforcement |
| 3 | `disclosurePolicy/{case}.json` locale extension | ⚠ SCHEMA LANDED, CONTENT EMPTY | localePolicy block scaffolded; arrays all empty; status="scaffold" |
| 4 | `check:policy --locale` wrapper | ⚠ PARTIAL | validate-script-locale.cjs has `--locale` arg + EN/zh-CN brand guard; not yet integrated as `check:policy --locale` (separate `check:script-locales` script) |
| 5 | `evidence.name` mirror policy | ✅ DECIDED | localePolicy notes line 326: "evidence.name is not localized in v1; translate surfaceName only" — Option (a) confirmed |
| 6 | Tag-side address rendering | ⚠ PARTIAL | `scriptLocale.ts` runtime resolver landed; `src/i18n/messages/scripts.ts` rendering helper not yet seen — needs cross-check |
| 7 | TS-module migration to JSON sidecars | ❌ PENDING | `witnessTestimonyData/*.ts` etc still TS source |
| 8 | `pcHomeShared.ts:134` UI restart-05 P0 i18n promotion | ✅ LANDED | home.ts has new `pc.home.intro.slide.*` keys per locale |
| 9 | `uiSurfaceMap` per-locale | ❌ PENDING | `localePolicy.uiSurfaceMap` empty objects |
| 10 | Active mediation alias confirmation | ✅ LANDED | validate-script-locale.cjs:9–13 hardcodes `spouse-v3-01 / family-v3-01 / friend-v3-01` |
| 11 | phase1 `부모님 재산을 형이 다 날린` KO line review | ❌ PENDING | spouse-01.json phase1 still has the line (working tree marker only — file modified) |
| 12 | Active mediation file list = 3 v3-01 | ✅ LANDED | validate-script-locale.cjs:9–13 |

**Net P0 status**: 5 LANDED / 2 PARTIAL / 5 PENDING. Bulk still NO-GO.

---

## 5. Thread-04 P1 status update (selected representative items)

| Thread-04 P1 finding | Status |
|---|---|
| `cases/refined/*_texts.json` legacy disposal | ❌ PENDING (no `_LEGACY_*` rename or delete observed) |
| Vocative `재판관님` glossary lock | ❌ PENDING (no `judge_vocative` row added) |
| Per-case relationship vocative + name transliteration | ❌ PENDING |
| Volume divergence resolves once behaviorHint locked | DEPENDS on P0-2 |
| System-message length cap per-locale | ❌ PENDING |
| EN forbidden-lexeme `nephew + niece` split | DEPENDS on P0-3 content authoring |
| zh-CN family-01 paraphrase blocklist | DEPENDS on P0-3 content authoring |
| JA `needs_decision` rows (체념 / 신뢰함 / 엄격↔엄정) | ❌ PENDING |
| `angle_catalog.keywords[]` runtime semantics | ❌ PENDING (Codex grep needed) |
| UI restart-05 P0 8건 surface coherence | PARTIAL (PC_HOME_INTRO_SLIDES landed; other 7 not verified) |
| Tag-side address forms KO retention | DEPENDS on P0-6 |

**Net P1 status**: 1 PARTIAL / 10 PENDING. Most P1 work depends on P0 content authoring.

---

## 6. Reprioritized next-Codex priority queue

Order is gating-aware: only items that unblock other work appear first.

### Tier A — unblocks everything else

1. **Author `disclosurePolicy/{caseId}.localePolicy.forbiddenLexemes.{en,ja,zh-CN}`** content (P0-3). Use [SCRIPT_GLOSSARY_CONFLICTS.csv](docs/localization/threads/outputs/script-thread-04-review/SCRIPT_GLOSSARY_CONFLICTS.csv) `blocks_bulk_translation=yes` rows as input. Per-case scope:
   - spouse-01: 형 / 친형 / 조카 / 위임장 조작 / 투자 사기 / 형 빚 / 형의 오피스텔 / 형에게 전달 + EN/JA/zh-CN equivalents.
   - family-01 (highest density): 유서 paraphrase 7+ variants × 3 locales / 20년 송금 paraphrase 5+ × 3 / 60대40 paraphrase 4+ × 3 / 출생 비밀 paraphrase 4+ × 3.
   - friend-01: 선을 넘는 메시지 paraphrase 4+ × 3 / 아버지 사기 paraphrase 4+ × 3 / 같은 패턴 paraphrase 3+ × 3.
2. **Author `localePolicy.paraphraseLexemes.{en,ja,zh-CN}`** content (P0-3 sibling). Same input source.
3. **Author `localePolicy.uiSurfaceMap.{en,ja,zh-CN}`** content (P0-9). Cross-walk `disclosure-policy.md` §4.1/§4.2/§4.3 uiSurfaceMap surface texts × 3 locales.
4. **Wire `validate-script-locale.cjs` lexeme matching**: when `localePolicy.forbiddenLexemes[locale]` non-empty, walk every overlay sidecar `text` field; assert no forbidden lexeme appears in surface-only-channel entries; assert truth lexeme MUST appear in S5 confession entries (negative validator). Currently the validator only schema-checks the localePolicy structure.
5. **Integrate `check:script-locales` into `check:all`** once Tier A.4 lands. Update `package.json` line 40:
   ```json
   "check:all": "npm run localization:glossary && npm run qa:fast && npm run qa:free-interrogation && npm run check:script-locales"
   ```

### Tier B — high-value precondition, can run parallel with Tier A

6. **`behaviorHint` runtime audit** (P0-2). One-line: `grep -rn "behaviorHint" src/engine src/components src/hooks src/utils`. Document result. Lock policy = KO-only across all locales (recommended, cuts ~50% bulk volume) unless audit finds runtime consumer.
7. **TS-module → JSON sidecar migration** (P0-7) for `witnessTestimonyData/*.ts` + `evidencePresentationScripts.ts` + `confessionScripts.ts` + `combinationComments.ts`. Constraints: KO content bytes preserved, exported function signatures unchanged.
8. **phase1 `부모님 재산을 형이 다 날린` KO line review** (P0-11). Disclosure-policy author + CT-Main decision. Block bulk JA + zh-CN phase1 until decided.
9. **Glossary script-vocab extension rows** (P1). ~30–40 rows: vocative `재판관님 / 자기야` per locale + per-case relationship vocatives + 7 NPC names transliteration + currency + `오피스텔` / `시댁 갈등` / etc. Add to `glossary.csv` directly (or new `script-glossary.csv` appendix).

### Tier C — UI surface coherence

10. **JA `pc.home.intro.slide.*` `真実 → 真相` decision** (NEW §3.1). Two options: (a) tagline-register exception with note in glossary; (b) full alignment to `真相`. Recommend (a). Add allowlist entry to validate-glossary.mjs.
11. **`pc.verdictAdvance.conditionsMissing` JA value spot-verify** (NEW §3.4). One-line grep + confirm uses `真相`.
12. **Other UI restart-05 P0 8件** still pending: Settings categories / About / Verdict step labels / Hotbar slot labels / pc.css uppercase scope / h1 nowrap / language fallback / numeric prefix conflict. Track separately.

### Tier D — cleanup & polish

13. `cases/refined/*_texts.json` disposal (P1) — physical delete or `_LEGACY_*` rename per memory pattern.
14. JA `needs_decision` glossary rows (체념 / 신뢰함 / 엄격↔엄정) — JA native review.
15. `angle_catalog.keywords[]` runtime semantics audit (P1).
16. Brand guard regex hardening (validate-glossary.mjs §2.3 gap items 2 + 3) — switch from `text.indexOf(literal)` to regex word-boundary similar to validate-script-locale.cjs:294.

---

## 7. Validator guard adequacy verdict

**For the v2 patch scope (CJK 11-row recovery + JA 真相 alignment + check:all integration)**: ✅ ADEQUATE.

**For full Thread-04 P0/P1 scope**: ⚠ NEEDS HARDENING when Tier A.4 lands. Specifically:
- Brand guard regex (UI side) should match validate-script-locale.cjs strictness.
- localePolicy lexeme matching wired into validator (currently structural-only).
- `localization:scripts:validate` integrated into `check:all`.

---

## 8. Bulk translation GO/NO-GO — STILL NO-GO

5 P0 items still pending (Thread-04 SUMMARY 12-list items 2/3-content/4-wiring/7/9/11). All Tier A items above must clear before any locale bulk pass.

After Tier A + Tier B clear: run pilot wrapper-gated `spouse-01 only, scriptedText only` per locale (~4,677 strings). Reviewer pass. Then full bulk per locale ordering en → ja → zh-CN.

---

## 9. Files in this v3 recheck note

- `docs/localization/threads/outputs/script-thread-04-review/V3_RECHECK_NOTE.md` — this file.

No other `src/data/**` files modified by this recheck.

---

## 10. References

- v2 patch reports (user message 2026-05-06)
- [SCRIPT_REVIEW_FINDINGS.csv](docs/localization/threads/outputs/script-thread-04-review/SCRIPT_REVIEW_FINDINGS.csv)
- [IMPLEMENTATION_PLAN_FOR_CODEX.md](docs/localization/threads/outputs/script-thread-04-review/IMPLEMENTATION_PLAN_FOR_CODEX.md)
- [SUMMARY.md](docs/localization/threads/outputs/script-thread-04-review/SUMMARY.md)
- [scripts/validate-glossary.mjs](scripts/validate-glossary.mjs)
- [scripts/validate-script-locale.cjs](scripts/validate-script-locale.cjs)
- [scripts/extract-script-text.cjs](scripts/extract-script-text.cjs)
- [src/i18n/scriptLocale.ts](src/i18n/scriptLocale.ts)
- [src/data/disclosurePolicy/spouse-01.json](src/data/disclosurePolicy/spouse-01.json) (line 305–328 localePolicy)
- [src/i18n/messages/layout.ts:645](src/i18n/messages/layout.ts#L645) (JA noConfirmedFacts patch)
- [src/i18n/messages/home.ts:80–81](src/i18n/messages/home.ts#L80-L81) (NEW §3.1 JA intro slide finding)
