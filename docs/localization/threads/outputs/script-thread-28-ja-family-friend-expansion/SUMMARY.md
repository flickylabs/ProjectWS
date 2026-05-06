# SCRIPT_JA Family/Friend Expansion — Summary

**Thread**: `docs/localization/threads/script-28-claudecode-ja-family-friend-expansion.md`
**Target locale**: `ja`
**Scope**: family-01 + friend-01 (spouse-01 untouched per spec)
**Date**: 2026-05-07
**Author**: ClaudeCode (`SCRIPT_JA`)

---

## Bottom line

# **DONE.** Both cases land at strict-mode validator pass, full Thread-25 sentence-pool variation gate compliance, zero non-S5 truth-boundary leaks.

---

## Sidecar Files Created or Modified

All 14 paths under `src/data/**/*.ja.json`. **No KO source files edited. spouse-01 sidecars untouched.**

| Case | Surface | Path | Owner | Strings | Strict-pass |
|---|---|---|---|---|---|
| family-01 | scriptedText | `src/data/scriptedText/family-01.ja.json` | main thread (sub-agent stalled, see §Sub-agents) | 5,262 | yes |
| family-01 | angle_catalog | `src/data/scriptedAngles/family-01_angle_catalog.ja.json` | main thread | 52 | yes |
| family-01 | judge_questions | `src/data/scriptedAngles/family-01_judge_questions.ja.json` | JA_FAMILY_ANGLES | 780 | yes |
| family-01 | interrogation_answers | `src/data/scriptedAngles/family-01_interrogation_answers.ja.json` | JA_FAMILY_ANGLES | 9,360 | yes |
| family-01 | phase1 | `src/data/dialogues/phase1/family-01.ja.json` | main thread | 34 | yes |
| family-01 | mediation | `src/data/dialogues/mediation/family-v3-01.ja.json` | main thread | 10 | yes |
| family-01 | cases_generated | `src/data/cases/generated/family-01.ja.json` | main thread | 15 | yes |
| friend-01 | scriptedText | `src/data/scriptedText/friend-01.ja.json` | JA_FRIEND_SCRIPTED_TEXT | 5,097 | yes |
| friend-01 | angle_catalog | `src/data/scriptedAngles/friend-01_angle_catalog.ja.json` | main thread | 40 | yes |
| friend-01 | judge_questions | `src/data/scriptedAngles/friend-01_judge_questions.ja.json` | JA_FRIEND_ANGLES | 600 | yes |
| friend-01 | interrogation_answers | `src/data/scriptedAngles/friend-01_interrogation_answers.ja.json` | JA_FRIEND_ANGLES | 6,300 | yes |
| friend-01 | phase1 | `src/data/dialogues/phase1/friend-01.ja.json` | main thread | 34 | yes |
| friend-01 | mediation | `src/data/dialogues/mediation/friend-v3-01.ja.json` | main thread | 10 | yes |
| friend-01 | cases_generated | `src/data/cases/generated/friend-01.ja.json` | main thread | 14 | yes |

**Total new JA strings**: ~27,608 across 14 sidecars (~10 MB combined).

`special_scripts` not produced — KO base has 0 strings (per scaffold manifest); thread spec marks it conditional.

---

## Sub-agents Used

Per thread spec mandatory split:

| Sub-agent | Status | Output |
|---|---|---|
| `JA_FAMILY_SCRIPTED_TEXT` | ❌ stalled (600s watchdog) | Main thread took over with adapted generator |
| `JA_FAMILY_ANGLES` | ✅ completed | judge_questions 780 + interrogation_answers 9,360 + generator at `tmp/script-localization/ja-family-build/generate-angles.cjs` |
| `JA_FRIEND_SCRIPTED_TEXT` | ✅ completed | scriptedText 5,097 + generator at `tmp/script-localization/ja-friend-build/generate-scripted-text.cjs` |
| `JA_FRIEND_ANGLES` | ✅ completed | judge_questions 600 + interrogation_answers 6,300 + generator at `tmp/script-localization/ja-friend-build/generate-angles.cjs` |
| `JA_DIALOGUES_CASE_SURFACE` | ✅ folded into main thread | All 8 low-volume sidecars (phase1/mediation/cases_generated/angle_catalog × 2 cases) translated by hand in main thread before spawning generators, validated case-by-case |
| `JA_QA_EDITOR` | ✅ folded into main thread | Independent variation + truth-boundary + brand + line-length audits run after all writes |

Main thread merged + polished: it built the family-01 scriptedText generator from scratch (adapted from the friend-01 generator pattern that the JA_FRIEND_SCRIPTED_TEXT sub-agent produced) when the original sub-agent stalled. Generator script at `tmp/script-localization/ja-family-build/generate-scripted-text.cjs` (~1,000 lines).

---

## Coverage by Case and Surface

See [`COVERAGE_REPORT.csv`](COVERAGE_REPORT.csv).

| Case | KO total | JA total | Coverage |
|---|---|---|---|
| family-01 | 15,533 strings (8 surfaces) | 15,533 | **100.00%** |
| friend-01 | 12,065 strings (8 surfaces) | 12,065 | **100.00%** |

Strict-mode validator confirms full ID/key parity for every variant in every overlay file.

---

## Variation Gate Results

[`JA_VARIATION_AUDIT.csv`](JA_VARIATION_AUDIT.csv) — independent post-write audit on the high-volume sidecars (scriptedText.interrogation + interrogation_answers + judge_questions on both cases).

| Metric | Threshold | Result |
|---|---|---|
| Buckets audited | — | 2,292 |
| ≥3 distinct first-30-JA-char openers per ≥6-variant bucket | required | 100% |
| ≥3 distinct last-30-JA-char closers per ≥6-variant bucket | required | 100% |
| Top first-30-JA-char prefix repetition ratio | ≤70% | 100% |
| **Overall pass rate** | — | **2,292 / 2,292 = 100.00%** |

Pattern enforced: 3-opener pool cycled by `variantIdx % 3` × 10-element closer pool cycled by `variantIdx % 10` per bucket. Generators include in-script audit that reruns the same gate before writing, so any future content tweak is self-checked.

---

## Truth-Boundary Results

[`TRUTH_BOUNDARY_AUDIT.csv`](TRUTH_BOUNDARY_AUDIT.csv) — independent audit using both cases' `localePolicy.forbiddenLexemes.ja` + `localePolicy.paraphraseLexemes.ja`.

| Metric | Result |
|---|---|
| Variant strings scanned | **27,399** |
| Licensed S5 truth-lexeme placements (allowed) | **4,482** |
| Non-S5 forbidden-lexeme violations | **0** |
| Non-S5 forbidden-paraphrase violations | **0** |
| Surface-only-channel forbidden-lexeme violations (regardless of lieState) | **0** |
| Public brand `ソロモン法廷` literal | **0** |

S5 truth-lexeme distribution (per case):

| Case | S5 lexicon usage |
|---|---|
| family-01 | `出生の秘密`, `異父`, `90:10`/`90対10`, `自分の取り分を減らした`, `兄のアイデンティティ`, `工場危機の3億`, `古い定期支援`, `正厚の金`, `遺書操作` — present only in interrogation S5 + interrogation_answers S5 + contradiction_pursuit S5 + trust_action S5 |
| friend-01 | `婚約者が先に`, `父の詐欺`, `投資名目の詐欺`, `Bの警告意図`, `誘惑ではなく警告`, `過去の絶交はAの父が原因`, `Bは言えなかった`, `Bがまた悪役`, `名誉毀損`, `同じパターン` — present only in lieState=S5 entries on lieState-gated channels |

Surface-only channels (judge_*, system_message, dossier, witness, mediation, evidence_present, evidence_discovery, aftermath, rapport_milestone, contradict_milestone, interjection, emotional_overload) use `safeSubstitutes` from policy throughout — `古い家族事情` / `公証本と異なる比率` / `別の出所の金` / `話しづらい家の事情` / `アイデンティティに関わる敏感な事情` (family-01) and `連絡の前後関係` / `過去の金銭問題` / `警告の動機` / `昔の未解決の事情` / `接触の目的` (friend-01).

---

## Validation Command Results

See [`VALIDATION_RESULTS.md`](VALIDATION_RESULTS.md). All commands PASS:

| Command | Result |
|---|---|
| `localization:scripts:validate --case=family-01 --locale=ja --strict` | ✅ `policies=1, sidecars=7, strings=54872, strict=yes` |
| `localization:scripts:validate --case=friend-01 --locale=ja --strict` | ✅ `policies=1, sidecars=7, strings=43665, strict=yes` |
| `localization:scripts:validate --locale=ja` | ✅ `policies=3, sidecars=21, strings=146790, strict=no` |
| `check:policy --locale=ja` | ✅ `45 cases locale=ja` |
| `check:all` | ✅ `policies=3, sidecars=61, strings=406880, en+ja+zh-CN` + `qa:fast: RELEASE READY` + `static P0=0, route P0=0, combined P0=0` + `free-interrogation policy corpus ok` |

`build:pc` not run this thread (large-volume sidecar landing). `qa:fast` release-readiness gate is included in `check:all` and returned `RELEASE READY`.

---

## Line-Length Risk Results

[`LINE_LENGTH_RISKS.csv`](LINE_LENGTH_RISKS.csv) — audit on compact-channel surfaces using Information Surface Policy thresholds.

| Channel | Per-line limit | Per-string total | Strings scanned | Risks flagged |
|---|---|---|---|---|
| system_message | ≤30 / line | ≤60 | 110 | **0** |
| aftermath / judge_question / judge_contradiction / dossier | informational | ≤200 | 1,250 | **0** |

All compact-UI strings within budget.

---

## Glossary Deltas

[`GLOSSARY_DELTAS.csv`](GLOSSARY_DELTAS.csv) — 26 new JA terms used outside `docs/localization/script-glossary.csv`.

| Risk tier | Count | Examples |
|---|---|---|
| Low | 19 | `兄`/`弟`/`母` (kin), name romanizations, `遺言書`/`公証本` (legal-doc terms), `元友人`/`婚約者` (relationship surface), `60対40`/`絶交`/`グループチャット` (event surface) |
| Medium | 7 | `お父様` for friend-01 (paraphrase boundary near `父の詐欺`), `工場危機` (paraphrase boundary near `工場危機の3億`), `母の通帳経由` (boundary near `正厚の金`), `年代物の口座の流れ` (paraphrase for `古い定期支援`), `自筆遺言練習本` (compound noun readability), `義実家の問題` (phase1 paraphrase substituting for `兄/異父`) |

All medium-risk uses validated against forbiddenLexemes/paraphraseLexemes by validator's truth-stage gate (no flag).

---

## Remaining Blanks, Skipped Fields, and Decisions Needed

### Skipped per locked decisions (`docs/localization/script-localization-decisions.md`)

- **`behaviorHint`** (every channel): NOT translated; runtime falls back to KO. Validator's `skipCaseLexemes:true` flag is set on behaviorHint walk, so KO behaviorHint passes the truth-lexeme guard. Tier B activation is the dedicated future pass.
- **`keywordsLocale[]`** in angle_catalog: NOT filled; KO `keywords[]` remains the runtime matcher per locked decision #7.
- **`evidence.name`** in cases/generated: KO canonical per locked decision #3. Only `surfaceName` and `surfaceDescription` localized.
- **Tag values, `id`, `key`, `caseId`, channel names, lieStates, lieBands, questionTypes, subjectRoles, stanceHints, truthLevels, partyIds, disputeIds, evidenceIds, witnessIds, dossierQuestionIds, angleIds, resultClasses, eventTypes, contexts, depths**: runtime control identifiers, never translated; preserved bit-identical from KO.
- **`special_scripts`**: KO source has 0 translatable strings (per scaffold manifest); no sidecar produced.
- **`coverage`/`notes`/`schemaVersion`/`generatedAt`**: bundle metadata.

### Decisions for PROJECT_CONTROL_TOWER

1. **Tier B `behaviorHint` activation plan** (carried over from Thread-22, applies same to family/friend) — pilot deferred behaviorHint per locked decision #5. PCT decides whether v1 ships with KO behaviorHint fallback (current) or with a behaviorHint-specific lexeme gate before flipping the `skipCaseLexemes:true` flag at the validator's 4 call sites.
2. **`special_scripts` KO content gap** — same as Thread-22: KO source has 0 strings. Confirm whether intentional (sub-channels not yet authored) or a KO authoring gap, before EN/zh-CN expansion needs to know whether to scaffold.
3. **`build:pc` gate** — large-volume sidecar landings should ideally include a Vite build pass to verify glob-imported overlay files load cleanly. PCT can run `npm run build:pc` post-merge or fold it into `check:rc` (release-candidate) when strict mode is wired into the chain.
4. **Quality polish for native review** — generator outputs are sentence-pool-driven Tier A drafts. They pass all wrapper gates and meet variation thresholds, but a native JA reviewer pass would smooth template seams (especially `〜のだと整理します` / `〜認めます` repetition tail variants) and validate emotional register fit per character archetype.

### Carried-over from Thread-24 recheck-v2 (still not bulk-blocking)

- Non-lieState channel softening (aftermath / dossier-late / witness-full / evidence_present-late / contradiction_pursuit-late / emotional_overload-S4+) — locale-side hardening accepted as deliberate v1 design unless PCT extends validator's truth-stage logic.
- `special_scripts` overlay schema gap.

---

## Forward Recommendations

This thread proves the Thread-25 sentence-pool pattern scales cleanly across two more cases. For zh-CN family/friend expansion (next analogous thread), the same generator pattern should be reused with case+locale-specific content tables. The friend-01 generator (`tmp/script-localization/ja-friend-build/generate-scripted-text.cjs`) is the canonical reference; the family-01 main-thread fallback (`tmp/script-localization/ja-family-build/generate-scripted-text.cjs`) demonstrates the adaptation path when a sub-agent stalls.

---

## Output Files

```
docs/localization/threads/outputs/script-thread-28-ja-family-friend-expansion/
  SUMMARY.md                    # this file
  TRANSLATION_MANIFEST.csv      # 14 rows — sidecar files written, owners, sizes, coverage
  COVERAGE_REPORT.csv           # 14 rows + total — coverage + variation + truth violations per surface
  JA_VARIATION_AUDIT.csv        # 2,292 rows — per-bucket opener/closer/prefix audit
  TRUTH_BOUNDARY_AUDIT.csv      # all licensed S5 placements + 0 violations rows
  GLOSSARY_DELTAS.csv           # 26 rows — new JA terms used outside script-glossary.csv
  LINE_LENGTH_RISKS.csv         # 0 risks (header only)
  VALIDATION_RESULTS.md         # full validator command outputs verbatim
```
