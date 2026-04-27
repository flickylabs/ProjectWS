# 20260427 Phase A Audit — spouse-01 P0 Integrated Script Patch

## Entry Check

- `git pull origin main`: pass, already up to date.
- `git log --oneline -5`: `6643035` is current HEAD.
- `git status --short --branch`: tracked clean; preserved untracked handoff files only.
- `git diff --quiet && git diff --cached --quiet`: tracked clean.
- `npm run check:all`: pass, 0 hard, existing warnings.
- `npm run build:pc`: pass.
- `npx tsc -b --force`: pass.

## Required Reading Status

Read:

- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md`
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-spike-summary.md`
- `tmp/qa-script-polish-audit-results/findings.json`
- `tmp/qa-script-polish-audit-results/pattern-extraction.md`
- `tmp/qa-script-polish-audit-results/recommended-patch-priority.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `CLAUDE.md`

Missing from this checkout:

- `memory/feedback_revision_meaning_over_form.md`
- `memory/feedback_truth_leak_prohibition.md`
- `memory/feedback_broad_homologous_detection.md`
- `memory/feedback_baseline_anchor_scripted_text.md`
- `memory/feedback_wrapper_baseline_is_head.md`

`rg --files` found no matching `memory/` files. Phase A used the same principles from the user request and policy docs: meaning over wording, truth leak prohibition, broad homologous detection, and baseline anchor preservation.

## Gate Re-run Snapshot

Command:

```bash
node scripts/qa-runtime-gate.cjs
```

Result:

- routes: 3
- actions: 10
- findings: 3
- hard: 3
- candidates: 0

Current hard findings remain:

- `QARG-0001`: `b-e-4-early-self-v1`, early `evidence_present`, truth lexeme `형`.
- `QARG-0002`: same source as QARG-0001 through second route.
- `QARG-0003`: `evidence_investigate` on `e-1.request_original`, system-only output, no NPC or explicit safe fallback.

## Homologous Detection

Detection scope was limited to `spouse-01` data. `family-01` and `friend-01` were not changed or patched.

### Root Cause 1 — Surface-only Judge Truth Lexeme

Channels scanned:

- `judge_question`
- `judge_contradiction`
- `judge_evidence_combo`
- `judge_witness_summon`

Raw homologous hits: 56 variants.

Breakdown:

- `judge_question`: 22
- `judge_contradiction`: 7
- `judge_evidence_combo`: 25
- `judge_witness_summon`: 2

Representative hit IDs:

- `judgeq-d-1-motive_search-2-v1`
- `judgeq-d-1-motive_search-4-v3`
- `judgeq-d-1-empathy_approach-1-v1`
- `judgeq-d-2-fact_pursuit-3-v3`
- `judgeq-d-2-motive_search-2-v3`
- `judgec-d-1-soft-v4`
- `judgec-d-2-hard-v4`
- `judgecombo-dc-2-b-q1-hard-v1`
- `judgecombo-dc-3-b-q2-hard-v4`
- `judgewit-w-1-mid-v2`

Root cause: judge surface-only channels contain hidden-truth language such as `형`, `형에게`, `가족 사정`, and `가족을 돕는`, often because late-stage truth wording was reused in judge prompts.

### Root Cause 2 — Early/Gated Evidence Truth Leak

Channels scanned:

- `evidence_present` entries with `lieBand=early` or investigation stage 1/2
- `evidence_discovery`

Raw homologous hits:

- `evidence_present`: 53
- `evidence_discovery`: 0

Representative hit IDs:

- `b-e-4-early-self-v1`
- `b-e-5-early-self-v1`
- `a-e-1-early-stage2-v1`
- `b-e-1-early-stage2-v1`
- `b-e-3-early-stage3-v1`
- `b-e-5-early-stage3-v1`
- `b-e-4-late-stage1-v1`
- `b-e-4-late-stage2-v4`
- `b-e-5-late-stage2-v4`

Root cause: early or gated evidence responses reveal hidden relationship, hidden fund, or child/school-item lexemes before the player-discovered channel has safely earned that disclosure.

### Root Cause 3 — NPC S0-S2 Truth Leak

Channels scanned:

- `interrogation`
- `contradiction_pursuit`

Lie states scanned:

- `S0`
- `S1`
- `S2`

Raw homologous hits: 2 variants.

Hit IDs:

- `b-d-2-S2-fact-pursuit-v7`
- `b-d-2-S2-motive-search-v7`

Root cause: S2 NPC responses directly say `가족을 돕는 일이 급했습니다`, which is the hidden motive and matches the spouse paraphrase guard.

### Root Cause 5 — Korean Polish

Raw homologous hits: 5 variants.

Hit IDs:

- `b-e-4-mid-stage2-v1`: `이유은`
- `b-e-4-late-stage2-v1`: `이유은`
- `b-e-4-late-stage2-v4`: `때문입니다, 제가`
- `b-e-5-late-stage2-v4`: `때문입니다, 제가`
- `judgec-d-1-hard-v1`: `그 가족라는`

Root cause: generated response templates reused awkward cause/particle structures across adjacent evidence variants.

## Root Cause 4 Spike — Option (a) Feasibility

Requested default option:

- Prefer spouse-01 caseData coverage.
- Do not apply runtime safe fallback.
- If this is a common runtime path defect, stop and report without runtime edits.

Findings:

- `src/types/case.ts` types `investigationResults` as `Record<string, string>`.
- `src/types/case.ts` has an optional `investigationStages[].scriptedNpcResponses` shape, but no runtime/Gate path currently reads it.
- `src/hooks/useActionDispatch.ts` `handleEvidenceInvestigate` calls `state.investigateEvidence(...)` and adds only a `system` dialogue for the result.
- The same function explicitly documents that evidence investigation must not trigger automatic NPC interrogation; NPC speaks only when the user explicitly questions.
- `scripts/qa-runtime-gate.cjs` `doEvidenceInvestigate` mirrors that behavior: it reads `ev.investigationResults[subAction]`, emits `speaker: 'system'`, and never checks caseData NPC response coverage.
- `scripts/qa-runtime-gate.cjs` still lists `evidence_investigate` in `RESPONSE_REQUIRED_ACTIONS`, so `detectMissingResponse` flags the system-only output as P0.

Conclusion:

Root cause 4 is not closable by editing only `src/data/cases/generated/spouse-01.json` under the current runtime/Gate contract. Adding NPC response data to caseData would be dead data unless runtime or Gate behavior changes. This matches the user-defined stop condition for a common runtime path defect.

## 9-Dimension Meaning Accuracy Spike

Patch approach that would be safe after the root cause 4 blocker is resolved:

- Preserve speaker, listener, honorific, and relationship tags exactly.
- Replace hidden-truth nouns with surface references, not unrelated facts.
- Keep dispute/evidence target unchanged.
- Maintain lieState/evidenceStage disclosure level.
- Preserve question intent: fact pursuit remains factual; motive search remains motive-focused; empathy remains affective.
- Preserve stance strength and judge tone, especially `soft` vs `hard`.
- Avoid introducing new evidence, new motives, or unearned certainty.
- Keep Korean naturalness corrections local to particles and clause boundaries.
- Do not change family/friend files or runtime code in this patch scope.

## Phase A Decision

Phase B should not start in this session under the current instruction set.

Reason:

- Root cause 4 requires a runtime/Gate contract decision before a spouse-only data patch can satisfy `QARG-0003`.
- Runtime safe fallback option (b) is explicitly out of scope.
- The instruction says to stop and report when a common runtime path defect is confirmed.

