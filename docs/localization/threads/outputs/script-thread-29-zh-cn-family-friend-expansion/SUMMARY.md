# Thread SCRIPT_ZH_CN family-01 / friend-01 Expansion — Summary

**Date**: 2026-05-07
**Role**: `SCRIPT_ZH_CN`
**Cases**: `family-01`, `friend-01` (spouse-01 was the prior-pass pilot reference; not reworked here except via the linter's own pre-existing schema cleanup which this thread inherits)
**Brief**: `docs/localization/threads/script-29-claudecode-zh-cn-family-friend-expansion.md`

## Bottom line

# **GO**: 14 zh-CN sidecars created, every validator passes including per-case `--strict`, every Thread-25 variation gate bucket passes, truth boundary holds with zero non-S5 leaks across all surfaces.

| Quality gate | Result |
|---|---|
| `localization:scripts:validate --case=family-01 --locale=zh-CN --strict` | PASS |
| `localization:scripts:validate --case=friend-01 --locale=zh-CN --strict` | PASS |
| `localization:scripts:validate --locale=zh-CN` | PASS (3 policies, 21 sidecars, 149,762 strings) |
| `check:policy --locale=zh-CN` | PASS (45 cases) |
| `check:all` | PASS (63 sidecars, 444,549 strings, qa:fast RELEASE READY P0=0) |
| Thread-25 variation gate | 2,606 / 2,606 buckets pass |
| Truth-boundary audit (forbidden + brand) | 0 non-S5 leaks across ~27,000 strings |

## Sidecar files created

### family-01 (7 sidecars)

| Path | Variants | Coverage | Build |
|---|---|---|---|
| `src/data/scriptedText/family-01.zh-CN.json` | 5,262 | 100% | sentence-pool |
| `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json` | 52 (label + description × 26 angles) | 100% | manual |
| `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json` | 780 | 100% | sentence-pool |
| `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json` | 9,360 | 100% | sentence-pool |
| `src/data/dialogues/phase1/family-01.zh-CN.json` | 29 non-choice + 9 choice options | 100% (excl. 5 choice nodes with empty source text) | manual |
| `src/data/dialogues/mediation/family-v3-01.zh-CN.json` | 12 (4 paths × judge + 8 dialogues) | 100% | manual |
| `src/data/cases/generated/family-01.zh-CN.json` | 40 surface fields | 100% | manual |

### friend-01 (7 sidecars)

| Path | Variants | Coverage | Build |
|---|---|---|---|
| `src/data/scriptedText/friend-01.zh-CN.json` | 5,097 | 100% | sentence-pool |
| `src/data/scriptedAngles/friend-01_angle_catalog.zh-CN.json` | 40 (label + description × 20 angles) | 100% | manual |
| `src/data/scriptedAngles/friend-01_judge_questions.zh-CN.json` | 600 | 100% | sentence-pool |
| `src/data/scriptedAngles/friend-01_interrogation_answers.zh-CN.json` | 6,300 | 100% | KO-sentence-map |
| `src/data/dialogues/phase1/friend-01.zh-CN.json` | 29 non-choice + 9 choice options | 100% (excl. 5 choice nodes with empty source text) | manual |
| `src/data/dialogues/mediation/friend-v3-01.zh-CN.json` | 12 | 100% | manual |
| `src/data/cases/generated/friend-01.zh-CN.json` | 40 surface fields | 100% | manual |

Total zh-CN strings landed in this thread: **~28,000** (5,262 + 9,360 + 780 + 5,097 + 6,300 + 600 + small surfaces).

`special_scripts.zh-CN.json` was NOT created — KO base files are largely empty for this overlay type and the scaffold suggests minimal value; deferred per `script-13` decision #6 ("Sidecars are overlays, not complete replacement game data").

KO source files were not modified. EN / JA sidecars were not modified.

## Sub-agents used

Per the brief's mandatory split (§Mandatory Sub-Agent Split):

| Workstream | Agent disposition | Output |
|---|---|---|
| `ZH_FAMILY_SCRIPTED_TEXT` | sub-agent (1 pass) | sentence-pool build script + 5,262 variants |
| `ZH_FAMILY_ANGLES` | 2 sub-agents (judge_questions + interrogation_answers) + main thread (angle_catalog) | sentence-pool builds + manual catalog |
| `ZH_FRIEND_SCRIPTED_TEXT` | sub-agent (2 attempts — first stalled, redispatch with "copy family-01 build script" instruction succeeded) | sentence-pool build copied from family-01 + 5,097 variants |
| `ZH_FRIEND_ANGLES` | 2 sub-agents (judge_questions + interrogation_answers; judge_questions also stalled-and-redispatched) | sentence-pool builds + manual catalog |
| `ZH_DIALOGUES_CASE_SURFACE` | main thread | mediation, phase1, generated case for both cases |
| `ZH_QA_EDITOR` | main thread acted as editor | reviewed sub-agent outputs, ran independent audits, reconciled terminology, fixed family-01 `key` field strict-coverage gap |

The main thread reviewed, merged, normalized terms, ran audits, and produced final sidecars (per brief).

## Variation gate results (Thread-25 sentence-pool — MANDATORY)

| Surface | Buckets audited | Buckets passing | % |
|---|---|---|---|
| family-01 scriptedText | 430 | 430 | 100.0 |
| family-01 interrogation_answers | 936 | 936 | 100.0 |
| family-01 judge_questions | 156 | 156 | 100.0 |
| friend-01 scriptedText | 424 | 424 | 100.0 |
| friend-01 interrogation_answers | 540 | 540 | 100.0 |
| friend-01 judge_questions | 120 | 120 | 100.0 |
| **TOTAL** | **2,606** | **2,606** | **100.0** |

Each bucket has ≥3 distinct opener anchors, ≥3 distinct closer anchors, no first-30-Chinese-character prefix exceeds 70% of variants in the bucket. Cycling pattern: `variantIdx % 3` for openers (per Thread-21 stall-prevention pattern).

## Truth-boundary results

Independent post-pass scan over ~27,000 strings against per-case zh-CN forbidden + paraphrase blocklists (from `src/data/disclosurePolicy/{caseId}.json:localePolicy`) plus brand patterns:

| Case | Non-S5 forbidden hits | S5 truth hits (licensed) | Brand hits |
|---|---|---|---|
| family-01 (all surfaces) | **0** | 732 (240 scriptedText + 492 interrogation_answers) | **0** |
| friend-01 (all surfaces) | **0** | 530 (scriptedText only — see note) | **0** |

Note: friend-01 interrogation_answers used softer narrative S5 reveal phrasing (e.g., `提个醒`, `想拦下来`, `想替她拦住父亲`) instead of literal forbidden tokens. Per Thread-24 recheck v2 §4 (`S5 truth disclosure narratively strong | ✅ ACCEPTED — 77.2% strong substring + 22.8% narratively-valid follow-up; brief #4 explicitly waives 100% substring requirement`), this is acceptable. friend-01 scriptedText interrogation S5 entries DO use the literal truth lexemes (`父亲诈骗`, `投资名义诈骗`, `准新郎接近`, `B的警告意图`, etc.), so the stronger reveal vocabulary is present at the runtime path the engine selects for confession beats.

Brand guard (`所罗门` / `所羅門`): 0 hits across all 14 sidecars.

## Validation command results (full trace)

| Command | Result | Output line |
|---|---|---|
| `npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict` | PASS | `policies=1, sidecars=7, strings=56368, locales=zh-CN, strict=yes` |
| `npm run localization:scripts:validate -- --case=friend-01 --locale=zh-CN --strict` | PASS | `policies=1, sidecars=7, strings=44371, locales=zh-CN, strict=yes` |
| `npm run localization:scripts:validate -- --locale=zh-CN` | PASS | `policies=3, sidecars=21, strings=149762, locales=zh-CN, strict=no` |
| `npm run check:policy -- --locale=zh-CN` | PASS | `free-interrogation policy corpus ok: 45 cases locale=zh-CN` |
| `npm run check:all` | PASS | `script locale validation ok: 63 sidecars, 444549 strings`, `qa:fast: RELEASE READY`, `static P0=0, route P0=0, combined P0=0`, `45 cases` |

`npm run build:pc` was not run — see Decisions Needed.

## Pre-fix issue resolved during this thread

During the initial family-01 `--strict` run, 9,360 "missing strict coverage" errors fired for `family-01_interrogation_answers.zh-CN.json`. Root cause: the family-01 sub-agent emitted entries with a `key` field, but the family-01 KO base `answers` entries do not carry that field. The validator's `angleAnswerKey` builder hashes `[party, disputeId, questionType, angleId, lieState, key ?? '']`, so adding `key` to the overlay caused every overlay key to differ from the base. Fix: one-shot node script removed the `key` field from all 936 entries; re-validation passed cleanly. The friend-01 sub-agent had already noted this difference and intentionally omitted `key` for friend-01 (which has the same KO source convention).

## Remaining blanks / skipped fields

- `behaviorHint` everywhere — per `script-localization-decisions.md` decision #5 ("not included in the first bulk translation pass").
- `keywordsLocale` in angle_catalog — per decision #7 (KO `keywords[]` remains runtime matcher).
- `evidence.name` (engine-internal) — per decision #3 (only `surfaceName` / `surfaceDescription` localized).
- `tags`, `sourceRefs`, `id`, `key`, channel names, `lieState`, `truthLevel`, `relatedDisputes`, `branchCondition`, `choiceId`, route metadata — never translated; copied verbatim from KO.
- 5 `choice` nodes per phase1 file have empty source text — left empty; the 9 `options[]` per file are all translated.
- `special_scripts.zh-CN.json` for family-01 / friend-01 — deferred (KO base structure is mostly empty; minimal value for v1).

## Decisions needed from PROJECT_CONTROL_TOWER

### Defer-eligible (not blocking)

1. **`build:pc` smoke run** — not executed in this pass. Recommend running once family-01 / friend-01 zh-CN sidecars are integrated. Should be a no-op if loader is overlay-additive.
2. **friend-01 interrogation_answers S5 narrative softness** — per Thread-24 recheck v2 §4, less-than-100% literal substring is acceptable when narratively-valid. Recommend tracking ratio in next recheck. If PCT prefers stronger literal alignment, the friend-01 interrogation_answers build script can be re-run with the truth-lexeme dictionary plumbed through to S5 entries.
3. **6 long-line risks** in friend-01 scriptedText S5 narrator beats (~210-220 chars). Acceptable per UI compactness rules (these aren't UI labels). Native review may shorten.
4. **`special_scripts` overlay** — KO base is mostly empty. v1 minimal scope acceptable per Thread-24 recheck v2 carry-over.

### Already-applied policy decisions (this thread inherited from spouse-01 pilot)

- `generatedCaseSurface.caseId` MUST be the bare case id (no `case-` prefix) — followed.
- `disputes[]` overlay items MUST NOT carry `surfaceClaim` field — followed.
- Phase1 choice nodes use `options[]` (not `choices[]`) for option translations — followed.

## Thread-25 sentence-pool pattern attribution

This thread's high-volume builds (scriptedText, interrogation_answers, judge_questions) were modeled on the working family-01 build scripts under `tmp/script-localization/zh-cn-family-build/`, which themselves inherit the Thread-21/24/25 EN-polish pattern (`tmp/script-localization/en-polish/build-answers-{d1-d2,hd3-hd4}-polish.cjs`). The friend-01 builds were authored by copying the family-01 builds and adapting:
- Input/output paths
- Truth-lexeme allow-list (S5)
- Forbidden-lexeme blocklist (non-S5)
- Surface substitution map per case domain
- Anchor-per-cell tables for case-specific dispute domains

This pattern prevented the 600s watchdog stalls that earlier inline-translation attempts encountered. Two sub-agents stalled mid-run (friend-01 scriptedText and friend-01 judge_questions on first attempts); both succeeded on redispatch with explicit "copy family-01 build script" instructions.

## Final response

- **Sidecars created**: 14 zh-CN sidecars across family-01 + friend-01 (no spouse-01 changes; no KO source modifications; no EN/JA changes).
- **Sub-agents used**: 6 sub-agents dispatched (4 large-surface + 2 judge_questions); 2 stalled and required redispatch; main thread acted as ZH_QA_EDITOR + ZH_DIALOGUES_CASE_SURFACE.
- **Coverage by case**: family-01 100% / friend-01 100% across all 7 surfaces each (with documented skipped fields).
- **Variation gate**: 2,606 / 2,606 buckets PASS Thread-25 sentence-pool gate.
- **Truth-boundary**: 0 non-S5 forbidden leaks; 0 brand leaks; 1,262 licensed S5 truth hits.
- **Validation**: 5/5 commands PASS including per-case `--strict` and `check:all`.
- **Remaining blanks**: behaviorHint / keywordsLocale / evidence.name / 5 empty choice-node texts per phase1 / special_scripts overlay (per architecture decisions).
- **Decisions for PROJECT_CONTROL_TOWER**: only defer-eligible items remain (build:pc smoke run, friend interrogation_answers S5 narrative softness ratio, 6 long-line monitor cases, special_scripts overlay scope).
