# Thread: SCRIPT_EN family-01 e-4 Narrative Sync

Target: ClaudeCode
Role: `SCRIPT_EN`

## Status

The Korean source for family-01 evidence `e-4` (공증인 메모 기록, "notary record") has been restructured into a new narrative on `main` (commit `75391d7a`, "e-4 deep sweep"). The English sidecars are now stale and must be re-synced to match the new KO narrative.

Surface-tier KO changes (viewerData, investigationStages, partyContext, v3DepthPlan, description, socialGraph, evidencePresentationScripts) were committed earlier (`5700aa93`). Their EN sidecars are likely also stale and should be brought into the same narrative within this thread.

## Background — narrative shift on e-4

Old narrative (now removed):
- `공증 당일` treated as a single same-day event
- `숫자 혼동` / `숫자를 오락가락` — the mother is portrayed as confusing the inheritance ratio numbers
- `같은 자리에서 숫자가 달라진` — interpretation that the ratio changed within one sitting
- Stage 1 evidence label `일반 기록`
- `절차 압박` as label-style wording

New narrative (now canonical):
- **Two separate notary visits on the same day**:
  - `1차 접수 (오전)` ~10:10 — opens will notarization / inheritance distribution arrangement (entry, no ratio yet); 10:25 — identity check + 2 witnesses; 11:05 — seal + filing number issued.
  - `수정 접수 (오후)` 17:05 — request to re-visit for amendment; 18:57 — amended notarization opens, final 60:40 confirmed.
  - `상태 메모 (수정 절차 중)` — notes recorded during the afternoon amendment:
    - 18:32 — mother reports fatigue, asks for a rest before answering
    - 18:39 — mother delays answering when questions repeat, asks for a glass of water
    - 18:43 — when asked the reason for the amendment, mother speaks with her son's help
    - 18:47 — Yoon Junghu appears to push the process saying "we have to finish today"
- Stage gating:
  - Stage 1: 1차 접수 only (3 rows) — no ratio yet, no signs of trouble
  - Stage 2: 1차 + 수정 접수 (5 rows) — 60:40 first appears here
  - Stage 3: full 9 rows — fatigue / delayed answers / son's help / "have to finish today" emerge

Phrase mapping (KO → EN guideline; do not translate the mapping itself, use it as anchor for choosing English):

| KO (old) | KO (new) | EN target tone |
|---|---|---|
| 공증 당일 | 수정 접수 자리 / 1차와 수정 두 차례 절차 | "during the afternoon amendment visit" / "across the morning intake and afternoon amendment" |
| 숫자 혼동 / 숫자를 오락가락 / 어머니가 숫자를 혼동 | 어머니가 답변을 늦추심 / 피로를 호소 / 물 한 잔을 청함 / 답변을 잇지 못하심 | "mother delayed her answers" / "mother voiced fatigue" / "mother asked for a glass of water" / "mother could not sustain her answers" |
| 같은 자리에서 숫자가 달라진 흔적 | 오전엔 비율이 비어 있다가 오후 수정에서 60:40으로 마무리된 흔적 | "the ratio was left blank in the morning and was settled as 60:40 only in the afternoon amendment" |
| 절차 압박 / 절차를 밀어붙인 듯 | 오늘 마쳐야 한다며 진행을 재촉 / 진행을 재촉 | "pushed the process saying we had to finish today" / "rushed the process" |
| 공증 당일 절차에 제가 관여했습니다 | 오후 수정 접수 절차까지 제가 곁에서 끌고 갔습니다 | "I stayed close through the afternoon amendment as well" |
| 일반 기록 (stage 1 label) | 1차 접수 | "Morning intake" |
| 공증 당일 11월 5일 (a-d-1-S5 자백) | 공증이 마무리된 11월 5일 | "the day the notarization was completed, November 5" |

Avoid carry-over English idioms that imply a single same-day event ("on the day of notarization", "during that one sitting"). Prefer phrasings that preserve the morning/afternoon split.

## Source of truth

KO files updated in commit `75391d7a` (HEAD at time of writing):

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) witness summons line
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 anchor texts, ~144 variants total) + behaviorHints unchanged
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40 occurrences) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / judge-question line / witness summon lines

Surface-tier sync (from prior commit `5700aa93`) also needs EN parity if not already done:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status locale copy

Inspect `git diff 5700aa93~1 HEAD -- <file>` for the precise KO text deltas before composing the English equivalents.

## Mandatory References

- `docs/localization/threads/script-25-claudecode-en-spouse-01-polish.md` — sentence-pool patterns
- `docs/localization/threads/script-27-claudecode-en-family-friend-expansion.md` — family-01 EN baseline
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak rules (no `90:10` / `자기 몫을 줄인 조작` before S5)
- Memory references: `feedback_natural_korean_vs_translationese` (avoid newsroom-register prose; choose natural conversational English equivalents)

## Scope — allowed write targets

EN sidecars only. Do NOT touch KO sources or JA / zh-CN sidecars.

- `src/data/scriptedText/family-01.en.json`
- `src/data/scriptedAngles/family-01_angle_catalog.en.json`
- `src/data/scriptedAngles/family-01_judge_questions.en.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json`
- `src/data/scriptedAngles/family-01_special_scripts.en.json` (if structurally supported)
- `src/data/cases/generated/family-01.en.json`
- `src/data/claimPolicies/family-01-structure-v2.en.json` (if a sidecar exists; otherwise skip)
- `src/data/evidencePresentationScripts.en.json` (or wherever EN sidecar lives — confirm via Glob)
- Any UI-locale file containing `logFilter_first` / `logFilter_amend` / `logFilter_status` keys that requires EN copy

## Working procedure

1. `git fetch && git checkout main && git pull` — confirm at `75391d7a` or later.
2. `git diff 5700aa93~1 HEAD -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json` to enumerate every KO-side change since the old narrative.
3. For each KO-side change, locate the matching `id` in the EN sidecar and replace the English text following the phrase mapping above. Preserve `id`, `behaviorHint`, `tags`, ordering.
4. Apply the same shift in surface-tier sidecars (case data, viewer rows, log filter labels).
5. Watch out for new KO additions (e.g., `filterGroup` field on LogRow, new keywords array entries `"1차 접수"` / `"수정 접수"`) — they must propagate to the sidecar schema if it mirrors structure.
6. Run validation gates before finalizing.

## QA / truth-leak guards (must stay)

- Stage 0 / stage 1 surfaces (partyContext, viewerData stage 1, description, socialGraph) must NOT reveal stage 2 keywords (`60:40`) or stage 3 keywords (`mother's state`, `delayed answers`, `pushed the process`). The KO sweep already removed these — keep the EN parity strict.
- `90:10` / "reduced his own share" / "fabrication" forbidden in non-S5 surfaces. Keep S5 disclosure parity with the KO disclosure policy.
- `evidence-stage-gate` detector keywords for EN: align with `truth-leak-matrix.json` `hidden.en` array; do not introduce new EN phrasing that would shadow a hidden lexeme.

## Validation Commands

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=en --strict
npm run localization:cases:validate -- --case=family-01 --locale=en --strict
npm run check:policy -- --locale=en
npm run qa:lqa
npm run qa:fast
```

Optional but recommended: `npm run build:pc`.

## Output Directory

`docs/localization/threads/outputs/script-thread-32-en-family01-e4-narrative-sync/`

Required:

- `SUMMARY.md` — files touched, variant counts, narrative-shift compliance notes
- `VARIATION_AUDIT_SUMMARY.json` — confirm anchor diversity is preserved (non-S5 high-volume buckets still meet ≥3 opener anchors, ≥3 closer anchors, no >50% same 60-char prefix)
- `TRUTH_BOUNDARY_SUMMARY.json` — non-S5 forbidden lexeme violations = 0
- `GIT_LOG.md` — final commit hashes on the worktree

## Worktree hygiene

If spawning sub-agents, run `git config --global --add safe.directory <worktree>` first (see memory `feedback_codex_worktree_safe_directory`). Do not edit KO sources from any sub-agent.
