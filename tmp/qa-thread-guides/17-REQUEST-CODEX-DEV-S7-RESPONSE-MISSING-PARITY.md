# 17-REQUEST-CODEX-DEV-S7-RESPONSE-MISSING-PARITY

Codex-Dev follow-up packet for Track B item **S7 — `response_missing` detector parity**.

## Scope

- requester: ClaudeCode CT-Main (no code authority on this packet)
- recipient: Codex-Dev
- baseline commit: **`db7d7f3`** (Track B head, on top of `ff3f9a1`)
- baseline worktree: `D:/ProjectWS-main-temp` (per Track B Resolved Decision; do not switch)
- baseline tag: `baseline-pre-policy-v3` → `a7aaec3` (no bump in this round)
- in scope: **S7 only** (`response_missing` detector parity with S3/S4/S6 reclassification)
- out of scope: S5 (still deferred — see §S5 Deferred Trace), Track A (game data / runtime), additional simulator items beyond S7, additional guide updates

## Why S7

Per `16-SMALL-RERUN-TRACK-B-RESULT.md`, the post-Track-B small rerun produced large `response_missing` P0 hard floods on default exhaustive runs (spouse 180 / family 143 / friend 143; normals 2–3 each) and bulk QA readiness was assessed `NOT YET`.

Root cause (16 §Blocking Concern Before Bulk QA, verbatim summary):

- S3 / S4 correctly moved facsimile output and invalid witness/event output to QA annotations or `manifest_validation_findings.json`.
- The legacy `response_missing` detector still classifies those annotation-only / manifest-validation-only `witness_summon` / `emergence_event` / `discovery_event` actions as P0 hard.
- Without S7, hard-count stop rules become unusable at 30 / 200 / 2000-run scale.

S7 is the minimum follow-up required before bulk QA (15 / 11 §Final QA expansion).

## Source Documents (read before entry)

1. `tmp/qa-thread-guides/16-SMALL-RERUN-TRACK-B-RESULT.md` — small rerun + S7 specification (primary)
2. `tmp/qa-thread-guides/14-CODEX-DEV-TRACK-B-RESULT.md` — Track B result (S3/S4/S6 baseline behavior)
3. `tmp/qa-thread-guides/12-REQUEST-CODEX-DEV-TRACK-B.md` — Track B scope reference
4. `tmp/qa-thread-guides/11-FINAL-FIX-SCOPE-DRAFT.md` — final fix scope (Track B/A boundary)
5. (reference only) `tmp/qa-thread-guides/10-SIMULATOR-AND-QA-GUIDE-FIXES.md` §S6
6. (reference only) `tmp/qa-thread-guides/15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md` §Stop Rules

## Pre-Conditions

- **Critical worktree guard** (same as 12 §Pre-Conditions):
  - cwd must be `D:/ProjectWS-main-temp`. Do not use `D:/ProjectWS` (preserved wip worktree on `wip/phase-b-route-simulator-20260427`).
  - Do not use stale paste files under `D:/ProjectWS/tmp/`.
  - If HEAD is `8f7ca75 wip: complete Phase B route simulator continuation` or branch is `wip/phase-b-route-simulator-20260427`, stop immediately. Do not resolve merge conflicts there. If a merge is in progress, only run `git merge --abort`, then report.
- `git fetch origin main` then verify HEAD = `db7d7f3` (Track B head). If origin has not yet received `db7d7f3` (push is bundled with S7 per §Push Strategy), the local detached HEAD on `db7d7f3` is the baseline.
- tracked clean before entry; `tmp/qa-warmup-packet/`, `tmp/qa-warmup-trial/`, `tmp/qa-small-rerun-track-b-20260428-054018/`, `tmp/codex-dev-track-b/`, and existing packet `.md` artifacts are baseline-frozen — do not regenerate or move them.
- baseline tags `baseline-pre-policy-v3{,-stage1,-stage2}` present — do not modify.
- Track A surfaces and S5 (disclosurePolicy modeling) remain forbidden in this packet.

## Common Surface

| File / Path | Role in S7 |
|---|---|
| `scripts/qa-route-simulator.cjs` | sole code surface for S7. Detector emit site is around line 701 (`severity: 'P0', category: 'response_missing'`); aggregation site around line 1639/1670. Codex-Dev should locate both during inspection. |
| `tmp/qa-route-simulator-manifests/{spouse-01,family-01,friend-01}.json` | reference only (no content edits — that is Track A4) |

## Item — S7. response_missing Detector Parity

**Goal**: align the `response_missing` detector with S3 (facsimile/QA-annotation separation) and S4 (manifest validation) so that intentionally annotation-only or manifest-validation-only actions are no longer P0 hard. Keep P0 reserved for genuinely missing player-facing responses.

**Reference (read-only, do not modify)**:
- detector emit site: `scripts/qa-route-simulator.cjs` ~L701–706 (`response_missing` P0)
- aggregation: `scripts/qa-route-simulator.cjs` ~L1639 / L1670 / L1688 (`response_missing` count + summary lines)
- S3 channel split: `playerTranscript` vs `qaAnnotations` (per 14 §S3)
- S4 manifest validator output: `manifest_validation_findings.json` (per 14 §S4)
- S6 reclassification pattern: `evidence_investigate_no_npc_followup` reclassified from P0 to `observability` while preserving the detector category and count (per 14 §S6) — use the same pattern shape for S7 reclassification

**Required behavior**:
- For these action types — `witness_summon`, `emergence_event`, `discovery_event` — when the action's only output is QA-annotation-only or the action was skipped/recorded by manifest validation, **do not** emit `response_missing` as P0 hard. Reclassify to one of:
  - `manifest_validation_findings.json` — when the action was rejected by S4 validators (e.g. summon-before-question violation, scope mismatch, route-domain mismatch).
  - `safe_fallback_used` — when the action ran but produced only system-only / fallback output that S3 placed under `qaAnnotations`.
  - `observability` (or P2) — when the action is intentionally system-only by route-contract (parallel to S6's treatment of `evidence_investigate_no_npc_followup`).
- For `judge_question` and `evidence_present` (and any other genuinely player-facing action types currently caught by `response_missing`), **keep P0** when no actual player-facing response was produced.
- Counts must remain countable in `findings.json` after reclassification (do not delete the detector entries — only adjust severity / category, mirroring S6 §Required behavior).
- Reclassification adjusts **both severity and category** as needed (e.g. `P0 response_missing` → `P2 safe_fallback_used`, or `P0 response_missing` → `observability <category>`); a single-axis change is not assumed. The S6 pattern (preserve count / detector record, change classification) applies in spirit, but S7 is not limited to severity-only or category-only changes.
- Update gate-spec report aggregation lines (`writeGateSpecReport`, the summary lines around L1670/L1688) so that `response_missing` count after S7 reflects only the player-facing remainder — and add a new aggregation line for the reclassified category if Codex-Dev introduces a new category label.

**Validation (Codex-Dev self-check before hand-off)**:
- Re-run the same six commands from `16-SMALL-RERUN-TRACK-B-RESULT.md` §Commands, into a NEW result base (do **not** overwrite `tmp/qa-small-rerun-track-b-20260428-054018/`):
  - suggested base: `tmp/qa-small-rerun-track-b-s7-<UTC-timestamp>/`
  - one normal + one exhaustive per case (`spouse-01`, `family-01`, `friend-01`)
- Expected outcome:
  - hard count drops sharply on every exhaustive run (target: 0 if no genuine player-facing missing-response remains, otherwise ≤ a small known set Codex-Dev documents).
  - normal runs: hard count drops or is justified per finding.
  - `manifest_validation_findings.json` and QA annotations preserve traceability for every reclassified case (no information loss).
  - `evidence_investigate_no_npc_followup` distribution remains identical to db7d7f3 baseline (S6 untouched).
- Diff vs `tmp/qa-small-rerun-track-b-20260428-054018/`: compare per-route and per-category counts; the only intended delta is `response_missing` reclassification.
- Spot-read at least one transcript per (case × mode) to confirm no genuine player-facing missing response was silently downgraded.

**Out of scope for S7**:
- evidence_investigate detector behavior (S6 result must remain identical)
- witness / event content edits (Track A4 territory)
- case data / scripted text / disclosure policy / claim policies (Track A territory)
- runtime engine / hooks / store / components (runtime parity already addressed by S1/S2 — S7 is detector-side only)
- manifest content edits (validator-only — content fixes are Track A4)
- S5 disclosurePolicy modeling (still deferred — see §S5 Deferred Trace)
- baseline tag bump
- additional QA reruns beyond the validation pass above (post-S7 small rerun is the only required run; a separate larger expansion is user/CT-coordinated)

## S5 Deferred Trace

Per Codex's note (sharing message §1) and CT's review of 14, S5 (`disclosure policy modeling` per 11 §Track B / 10 §S5) was not in 12 §Scope and Codex-Dev correctly did not implement it. The Codex-Dev decision is accepted.

This packet does **not** ship S5. S5 remains formally deferred to a follow-up round (candidates: a dedicated `18-REQUEST-CODEX-DEV-S5.md` after S7 lands, or the 15-driven bulk-QA-prep round per CT's earlier suggestion (option c)).

S7 includes the following one-line trace (Codex-Dev: please add to `14-CODEX-DEV-TRACK-B-RESULT.md` §S5 as a postscript when committing S7, only if it does not require any content rewrite of 14):

```text
> S5 remains deferred to a follow-up round; S7 (response_missing detector parity) lands first.
```

If editing 14 alongside the S7 commit is undesirable (14 is a closed result document), Codex-Dev may instead add this trace to a new `18-S5-DEFERRED-TRACE.md` one-line memo. Decision delegated to Codex-Dev judgment; both options preserve trace.

## Out-Of-Scope (do not touch in this packet)

- everything listed in 12 §Out-Of-Scope (Track A surfaces, runtime engine, runtime dispatch, runtime UI, store, manifest content, baseline tag bump, A2-engine, additional QA expansion)
- `scripts/qa-route-simulator.cjs` regions unrelated to `response_missing` detector or its aggregation (do not refactor for the sake of refactor)
- new detectors or detector categories (S7 is reclassification, not addition — unless reclassification requires a new category label, in which case Codex-Dev may add the minimum needed; document in 18 result doc)
- guide files (`tmp/qa-thread-guides/01-…05-…`) — Track B already applied G1–G7; no further guide changes in this round (15 reflection is a separate later round per Codex's option (c))
- 11 / 12 / 13 / 14 / 15 / 16 / 17 packet files (this packet is read-only on prior packet history; only 17 itself and any new 18 result/trace doc are writable)

## Push Strategy (S7 + db7d7f3 bundled)

Per user/Codex decision (sharing message §4):
- `db7d7f3` (Track B head) is **not pushed standalone**.
- After S7 lands and post-S7 small rerun PASSes, push `db7d7f3` + S7 follow-up commit together (`git push origin HEAD:main`).
- The S7 commit is layered on top of `db7d7f3` (do not amend, do not rebase, do not squash db7d7f3).
- If multiple S7 fix iterations are needed, additional commits on top of `db7d7f3` are acceptable; the final push is a single fast-forward of all bundled commits.

## Commit Strategy

- default: single commit on top of `db7d7f3` (e.g. `fix(qa-simulator): S7 response_missing detector parity with S3/S4/S6`).
- if multiple iterations are required during S7 (e.g. reclassification, then aggregation summary fix), per-iteration commits are acceptable. No artificial squashing.
- every commit: `Co-Authored-By` trailer per project convention; signing/hooks must pass; no `--no-verify`.

## Codex-Dev Self-Validation Plan

| Phase | Action |
|---|---|
| pre-entry | worktree guard (above) + `git pull origin main` (or local check if Track B not yet pushed) + status clean + baseline `db7d7f3` confirmed |
| during S7 | locate detector emit + aggregation; implement reclassification per §Required behavior; no S5 / no Track A surfaces |
| pre-commit | `node --check scripts/qa-route-simulator.cjs` PASS; targeted `npx eslint scripts/qa-route-simulator.cjs` PASS; `npx tsc -b --force` PASS; `npm run build:pc` PASS (defensive — qa script change should not affect build) |
| post-commit small rerun | run 6 commands per §Validation into a new result base (suggested `tmp/qa-small-rerun-track-b-s7-<UTC-timestamp>/`); compare to `tmp/qa-small-rerun-track-b-20260428-054018/` |
| post-validation | summary report (suggested path: `tmp/qa-thread-guides/18-CODEX-DEV-S7-RESULT.md` or similar — do not overwrite 14/16) listing diff surface, reclassification table, validation outcome, before/after hard counts, any deviation, and the S5 deferred trace location decision |

The post-S7 larger QA (30 / 200 / 2000 runs per 15) is a **separate user-coordinated step** — Codex-Dev should not auto-trigger it.

## Resolved Decisions (this packet)

User-confirmed decisions for S7 round:

1. **Worktree**: `D:/ProjectWS-main-temp` (Track B Resolved Decision #1 carries forward).
2. **Baseline**: `db7d7f3`. Push `db7d7f3` + S7 commit together after small-rerun PASS — **no standalone push of `db7d7f3`** (S7 완료 전 db7d7f3 단독 push 금지).
3. **Baseline tag**: no bump in this round (Track A entry decision).
4. **Worktree retention**: `D:/ProjectWS-main-temp` retained until at least Track A entry decision; do not remove.
5. **Bulk QA**: **not started this round; not until post-S7 small rerun PASS** (post-S7 small rerun PASS 전 bulk QA 금지). Only the post-S7 small rerun (3 normal + 3 exhaustive, one each) runs in this packet.
6. **S5 deferred trace placement**: **delegated to Codex-Dev judgment** — Codex-Dev decides between a postscript to 14 §S5 and a new minimal one-line memo file (e.g. `<번호>-S5-DEFERRED-TRACE.md`). Either option preserves trace; CT does not pin a specific location.
7. **S7 result doc filename**: **`18-CODEX-DEV-S7-RESULT.md`** (confirmed). If a separate S5 deferred trace memo is created (per Resolved Decisions #6), it must use a number other than 18.

## Hand-off

Per §Resolved Decisions (all decisions confirmed; no Open Items remain):

1. Codex-Dev entry approval from user — **confirmed at packet hand-off** (sharing message of S7 round).
2. Codex-Dev reads §Source Documents in order, then this packet.
3. Codex-Dev executes S7 with per-item validation.
4. Codex-Dev runs post-S7 small rerun and reports back via `tmp/qa-thread-guides/18-CODEX-DEV-S7-RESULT.md` (per §Resolved Decisions #7).
5. CT reviews S7 result + small rerun delta; if PASS, CT requests user push approval for `db7d7f3 + S7` bundle.
6. CT resumes coordination (Track A entry decision, 15 reflection round, baseline-tag decision).

CT did not modify code, did not commit, did not change packet artifacts, did not run additional QA.
