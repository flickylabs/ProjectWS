# SCRIPT_EN Intake — Summary

Thread: `script-thread-01-en-intake`
Target locale: `en`
Brief: `docs/localization/threads/script-01-claudecode-en-script-intake.md`
Date: 2026-05-06

## Files inspected

Reference docs:
- `docs/localization/glossary.csv` (138 rows)
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md` (v1.1)
- `docs/information-surface-policy.md` (v1.1)
- `src/types/scriptedText.ts`, `src/types/scriptedAngleText.ts`, `src/types/dialogue.ts`
- `src/i18n/messages/common.ts`, `court.ts`, `verdict.ts`

Active script surfaces:
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` (3 files, 1,797 entries / 15,036 variants total)
- `src/data/scriptedAngles/{spouse-01,family-01,friend-01}_{angle_catalog,judge_questions,interrogation_answers,special_scripts}.json` (12 files; 408 judge_q entries / 2,040 variants, 2,448 answers entries / 23,580 variants, 68 angles, 429 special-script entries)
- `src/data/dialogues/phase1/{spouse-01,family-01,friend-01}.json` (3 files, ~34 dialogues each + branching choices)
- `src/data/dialogues/mediation/spouse-v3-01.json` (loaded for spouse-01 via versioned alias rule in `mediationScriptLoader.ts`)
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` (3 files, ~3,000 KO+other string fields per case)
- `src/data/witnessTestimonyData/{spouse-01,family-01,friend-01}.ts` (3 modules, ~57 testimony slots total)
- `src/data/evidencePresentationScripts.ts` (~255 KO strings)
- `src/data/confessionScripts.ts` (~13 confession entries × 3 strings)
- `src/data/combinationComments.ts` (~30 lines)

Legacy / non-authoritative surfaces flagged but not translated:
- `src/data/cases/refined/{spouse-01,family-01,friend-01}_texts.json` — older v1 storyline; `caseLoader.ts` reads `manifest.json` only, not the `_texts.json` content.
- `src/data/cases/refined/spouse-01_backup.json` — snapshot.
- `src/data/legacy/dialogues/{phase1,phase2,phase3-5}.ts` — pre-V4 legacy.
- `src/data/dialogues/mediation/{spouse-05,spouse-11,spouse-12,family-05,family-09,friend-03,friend-07,neighbor-03,neighbor-08,partnership-04,partnership-09,tenant-02,tenant-09}.json` — Legacy storyline (numeric suffix).
- `src/data/dialogues/mediation/spouse-v2-01.json` — superseded by `-v3-01` via the versioned alias rule.
- `src/data/scriptedAngles/free_interrogation_{mapping_schema,response_policy,test_cases}.json` — policy/test fixtures, not user-facing dialogue.

## Cases found (active)

- `spouse-01` (박지연 · 이준호) — disputes d-1, d-2, h-d3, h-d4. Hidden truth: B was caring for nephew at brother's apartment; A forged power of attorney for joint-savings withdrawal and lost it to investment fraud.
- `family-01` (윤태성 · 윤정후) — sibling will dispute. Hidden truth: birth secret + 20-year remittance + altered will.
- `friend-01` (송다은 · 최수민) — pre-wedding friendship dispute. Hidden truth: A's father's prior fraud + B's silence after the fiance's inappropriate message.

Other inventoried `case-*` and `*-new-*` files exist but are not currently part of the active 3 per `memory/project_active_cases.md`.

## Estimated translatable volume (text strings only; excludes behaviorHint and tags)

Per active case, rough counts (variant text + per-channel multipliers):

| Surface | spouse-01 | family-01 | friend-01 |
|---|---:|---:|---:|
| scriptedText (all channels) | 4,677 | 5,262 | 5,097 |
| scriptedAngles judge_questions | 660 | 780 | 600 |
| scriptedAngles interrogation_answers | 7,920 | 9,360 | 6,300 |
| scriptedAngles special_scripts (text/preConfession/etc.) | ~270 | ~360 | ~230 |
| scriptedAngles angle_catalog (label + description) | ~44 | ~52 | ~40 |
| phase1 dialogue | ~70 | ~70 | ~70 |
| mediation (active version) | ~15 | TBD | TBD |
| witnessTestimony (topic + question + testimony) | ~63 | ~54 | ~54 |
| evidencePresentationScripts (per-case slice) | ~85 | ~85 | ~85 |
| confessionScripts | ~12 | ~12 | ~15 |
| combinationComments | ~6 | ~12 | ~10 |
| case data surface fields (surfaceName, uiSurfaceMap, judgeHint surface form, dispute name, etc.) | ~150 | ~150 | ~150 |
| **Total per case (surface-only translation path)** | **~13,970** | **~16,200** | **~12,650** |

If the EN side also mirrors truth-channel fields (`evidence.name`, etc.) for disclosure-guard parity (recommended via `disclosurePolicy/*.en.json`), add ~200 strings per case.

Three-case grand total: **~42,800 translatable strings** (surface-only path) or **~43,400** (with EN guard parity).

## Pilot samples completed (spouse-01)

All in `PILOT_TRANSLATION_SAMPLES.json`. Each sample translates 3 variants (or 1 passage for phase1 / mediation) and explains the pattern for the rest:

- `scripted_text_interrogation`: `a|d-1|S0|fact_pursuit` — A's S0 surface frame.
- `scripted_text_evidence_present`: `b|e-1|early|self` — B's early-band hedge on receipts.
- `scripted_text_witness`: `w-1|vague` — security guard's vague depth.
- `scripted_text_system_message`: `interrogation|repeat_warning` — UI system message.
- `scripted_angles_judge_question`: `d-1 / fact_pursuit / b / general`.
- `scripted_angles_interrogation_answer`: `b|d-1|S0|fact_pursuit|general`.
- `phase1_dialogue_passage`: opening 6 dialogues + first choice.
- `mediation_path_sample`: `paths.conditional` (judge intro + 2 dialogues) from `spouse-v3-01.json`.

Total pilot variants translated: **24 strings** across 8 surfaces.

## Major glossary risks

(Detail in `SCRIPT_GLOSSARY_CANDIDATES.csv` and `TRUTH_BOUNDARY_RISKS.csv`.)

1. **Vocative `재판관님`.** UI glossary has `Judge` (referential) but no spoken vocative form. Recommend `Your Honor` as locked entry. Affects every NPC line.
2. **`오피스텔` → `studio apartment`.** No clean EN equivalent. spouse-01 hinges on it; cultural nuance partially lost. Locked candidate.
3. **`친형` and `조카`.** Truth-channel forbidden lexemes. EN must mirror the disclosure ban: `older brother / my brother`, `nephew` are forbidden in surface channels before S5. Without an EN forbidden-lexeme set, an EN translator could leak earlier than the KO version.
4. **System-message length cap (≤ 30 chars).** Authored against KO; almost no EN equivalent fits. Need style-guide decision: relax cap for EN, or rewrite each system message tighter.
5. **`evidence.name` is truth-bearing.** Some case-data fields contain truth labels that must NOT be UI-rendered (`evidence.e-4.name = 형 문자 스레드`). EN must translate the surface variant only and either skip truth fields or mirror them only for guard parity.
6. **`behaviorHint` is a writer note.** Currently always KO. Recommend keeping it KO across all locales. If translated, it could leak truth content (some hints reference 친형·조카 directly).

## Blocking questions before full translation

These need PROJECT_CONTROL_TOWER (or a designated decision-owner) before EN bulk work begins:

1. **Storage architecture.** Approve Option B (parallel `*.en.json` overlay alongside KO source). Without this decision, there is no place to put EN content without mutating KO source — which breaks the `baseline-pre-policy-v3` anchor.
2. **Vocative glossary lock.** Approve `Your Honor` as the EN vocative for `재판관님`, plus per-case relationship vocatives (Honey, my husband, my wife, my older brother, etc.).
3. **`behaviorHint` policy.** Confirm EN does NOT translate `behaviorHint`. Default recommendation: KO-only writer note across all locales.
4. **System-message length cap for EN.** Decide: relax to ~50 chars / single line for EN (and update `docs/information-surface-policy.md` §6.3) — or commit to aggressive rewriting.
5. **Truth-channel mirror policy.** Decide whether EN translation mirrors `evidence.name` and other truth-bearing fields (for disclosure-guard parity) or strictly translates surface fields only. Mirroring is required if Tier 3 LLM Guard ever runs against EN.
6. **TS-source modules.** Approve migration of `evidencePresentationScripts.ts`, `confessionScripts.ts`, `combinationComments.ts`, `witnessTestimonyData/*.ts` to JSON before their EN content is added. If migration is rejected, EN is gated for those surfaces until the team accepts TS edits.
7. **Tag-side EN address forms.** Approve approach: render `judgeAddress` / `callTerm` from per-locale message map at runtime (recommended) rather than embedding `Your Honor` / `my husband` into 14,931 tag-values.
8. **Disclosure policy EN extension.** Confirm Codex owns drafting `src/data/disclosurePolicy/{caseId}.en.json` (forbidden-lexeme + paraphrase + surface map in EN).

Until the above are answered, this thread holds at "intake + pilot complete; awaiting CT-Main decisions before bulk."

## Files in this output

```
docs/localization/threads/outputs/script-thread-01-en-intake/
  SCRIPT_SURFACE_INVENTORY.csv
  TEXT_FIELD_EXTRACTION_PLAN.md
  SCRIPT_GLOSSARY_CANDIDATES.csv
  PILOT_TRANSLATION_SAMPLES.json
  TRUTH_BOUNDARY_RISKS.csv
  IMPLEMENTATION_NOTES_FOR_CODEX.md
  SUMMARY.md
```

No `src/data/**` files were modified. No bulk translation performed.
