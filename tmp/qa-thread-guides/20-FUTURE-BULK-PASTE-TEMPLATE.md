# 20-FUTURE-BULK-PASTE-TEMPLATE

> SUPERSEDED FOR ACTIVE OPERATIONS as of 2026-04-28. This template encodes per-stage PASTE generation and can cause workers to stop after the smoke stage. Do not instantiate it as-is. Use the four rewritten fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files, which start under `tmp/qa-bulk-runs/restart-20260428/` and run to final targets with stage-local checkpoints.

Future bulk-QA session entry PASTE template — supports parallel Codex-primary + ClaudeCode-cross-check rounds.

## Scope

- writer: ClaudeCode CT-Main
- baseline commit (template): `<replace-with-current-main-HEAD-at-instantiation>` (current at template authoring: `344e686`)
- mode: **template only** — clone and instantiate per (runner × stage) round.
  - Codex primary Stage 1 → one instantiated PASTE
  - ClaudeCode cross-check Stage 1 → another instantiated PASTE
  - both run in parallel under the Cross-Check Common Execution Contract
- source: `15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md` (§Per-Thread Preflight Requirement / §Sub-Agent Prompt Requirements / §Stop Rules / §Required Aggregation / §Sub-Agent Operating Model / §Integration Rules / §CT Role / §Codex Planning Secretary Role) + `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` (§Stage Plan per runner + §Cross-Check Common Execution Contract).
- coupled with: `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` (guide 4 파일 변경 안) + `21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md` (Codex-Dev 적용 의뢰서).

## Variables To Fill At Instantiation

Every instantiation must replace the following placeholders:

| Placeholder | Meaning |
|---|---|
| `<runner-id>` | `codex-primary` **or** `claudecode-crosscheck` |
| `<stage-id>` | `stage-1-smoke`, `stage-2-soak`, `stage-3-bulk`, `stage-4-full` |
| `<utc-timestamp>` | run launch UTC timestamp, e.g. `20260501-120000` |
| `<main-HEAD>` | pinned `origin/main` SHA (must match across both runners for the same stage), e.g. `344e686` |
| `<normal-runs-per-case>` | per stage plan + runner (e.g. Codex Stage 1 = `30`; ClaudeCode Stage 1 = `6`) |
| `<exhaustive-runs-per-case>` | per stage plan + runner (e.g. Codex Stage 1 = `30`; ClaudeCode Stage 1 = `6`) |
| `<runner-result-base>` | `tmp/qa-bulk-runs/<runner-id>/<stage-id>-<utc-timestamp>/` |
| `<previous-aggregate-baseline>` | path to previous stage's `aggregate/` for baseline diff (Stage 1 has none — use `(none)`); same-runner-only |
| `<allowed-cases>` | usually `spouse-01,family-01,friend-01` |
| `<other-runner-id>` | the OTHER runner — `claudecode-crosscheck` if this PASTE is for `codex-primary`, or vice versa |

## How To Use

1. Copy the **Template Body** below into a new file `tmp/qa-thread-guides/PASTE-BULK-QA-<runner-id>-<stage-id>-FIRST-MESSAGE.md`.
2. Replace every `<...>` placeholder.
3. Verify Stage Plan row matches the target (runner, stage).
4. Confirm `<main-HEAD>` is identical to the parallel runner's PASTE for the same stage (Cross-Check Common Execution Contract).
5. Use the resulting file as the runner session start message.

---

## Template Body (copy below this line)

```markdown
# PASTE — Bulk QA <runner-id> <stage-id> Entry Message

> 이 PASTE를 <runner-id> 세션 시작 시 그대로 붙여넣어 주세요.

---

ClaudeCode CT-Main에서 Bulk QA <runner-id> <stage-id> 라운드를 의뢰합니다.

본 라운드는 Codex primary와 ClaudeCode cross-check가 **병렬 독립 실행**하는 구조의 한 쪽입니다. 다른 한 쪽 (`<other-runner-id>`)도 같은 stage / 같은 commit `<main-HEAD>`로 별도 실행됩니다.

## CRITICAL Worktree Guard

작업 cwd는 반드시 `D:/ProjectWS-main-temp`입니다.

`D:/ProjectWS`는 보존 중인 wip worktree입니다. Bulk QA 작업에 사용하지 마세요.

금지:
- `D:/ProjectWS`에서 `git pull origin main` 실행 금지
- `D:/ProjectWS/tmp/PASTE-*` 파일 사용 금지
- `wip/phase-b-route-simulator-20260427` branch에서 conflict resolve 금지

진입 직후 아래 조건 확인:
- current directory = `D:/ProjectWS-main-temp`
- `git log --oneline -1`이 `<main-HEAD>` 정확히 일치 (양쪽 runner 동일 commit pin)
- `git status --short --branch`가 `D:/ProjectWS-main-temp` 기준 상태

만약 HEAD가 `8f7ca75` 또는 branch가 `wip/phase-b-route-simulator-20260427`이면 즉시 중단 + 보고. 진행 중인 merge가 있으면 `git merge --abort`만 수행한 뒤 멈춥니다.

## Cross-Check Common Execution Contract

본 runner와 다른 runner는 다음 항목을 동일하게 유지합니다:

| Item | Required value |
|---|---|
| commit | `<main-HEAD>` 정확 일치 |
| harness version | identical (`scripts/qa-route-simulator.cjs` 변경 X) |
| active cases | `<allowed-cases>` |
| normal / exhaustive mode definition | identical CLI flags |
| stop rules | identical |
| aggregate schema | identical (Required Aggregate Artifacts 영역) |
| result-dir | **separate per runner** |
| raw / result sharing during execution | **forbidden** |
| merge | aggregate-only / 양쪽 완료 후 |

다른 runner의 result-dir (`tmp/qa-bulk-runs/<other-runner-id>/...`)은 **본 라운드 실행 중 절대 read 금지**.

## Bulk QA Stage Plan (전체 / 본 라운드는 <runner-id> <stage-id> 한정)

### Codex primary
| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 30 | 30 |
| Stage 2 — soak | 200 | 50 |
| Stage 3 — bulk | 770 | 120 |
| Stage 4 — full | 1000 | 300 |

### ClaudeCode cross-check
| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 6 | 6 |
| Stage 2 — soak | 40 | 10 |
| Stage 3 — bulk | 154 | 24 |
| Stage 4 — full | 200 | 60 |

본 라운드: **<runner-id> <stage-id>** — Normal `<normal-runs-per-case>` per case + Exhaustive `<exhaustive-runs-per-case>` per case.
허용 case: `<allowed-cases>`.

## Per-Thread Preflight (15 §Per-Thread Preflight Requirement)

```text
runner: <runner-id>
thread id: <runner-id>-<stage-id>
mode: normal + exhaustive
case scope: <allowed-cases>
run count: Normal <normal-runs-per-case> × cases + Exhaustive <exhaustive-runs-per-case> × cases
expected artifact volume: high (raw under <runner-result-base>raw/)
aggregation available: yes (runner produces in <runner-result-base>aggregate/)
sub-agent plan: Agent A (Normal Cluster Reviewer) + Agent B (Exhaustive Cluster Reviewer) + Agent C (Runtime/Simulator Classifier) + Agent D (Integration Secretary) — within this runner only
raw artifact read budget: drill-down only, named cluster, this runner only
representative sample limit: max 3 routes / max 1 shortest / max 1 highest-severity / max 1 flaky / max 200 lines per cluster
stop rules: hard>0 → stop; new P0/P1 cluster → stop after batch; flaky/new category → preserve sample then stop/hold; known repeat → continue
handoff output path: <runner-result-base>review/REVIEW.md
```

If expected artifact volume is high and aggregation is not available, the thread must stop and request aggregation first.

## Stop Rules (per runner / mandatory)

- **hard > 0** → stop the batch immediately and summarize.
- **new P0/P1 cluster** → finish current batch, then stop and review the cluster.
- **flaky / new category** → preserve representative samples (run ids, seed/timing/log), then stop or hold.
- **only known clusters repeat** → may proceed to next stage.
- hard failures must be summarized before any further stage launches.
- A runner that stops does not block the other runner; merge waits for actually-completed coverage from each runner.

## Aggregation-First Rule

Bulk execution is machine-owned. Cluster review is agent-owned. Raw artifact reading is drill-down only. Integration reads summaries only. Cross-runner merge reads aggregates only.

No agent — including Integration — should read 2000 raw transcripts or complete action traces directly.

## Required Aggregate Artifacts (per <runner-result-base>)

```text
<runner-result-base>PROGRESS.md
<runner-result-base>raw/run-NNNN/...
<runner-result-base>aggregate/run-stats.json
<runner-result-base>aggregate/unique-finding-clusters.json
<runner-result-base>aggregate/new-vs-baseline-clusters.json
<runner-result-base>aggregate/flaky-run-summary.json
<runner-result-base>aggregate/hard-failure-summary.md
<runner-result-base>aggregate/category-counts.json
<runner-result-base>representative-samples/<cluster-id>/
<runner-result-base>review/REVIEW.md
```

Baseline diff: compare to `<previous-aggregate-baseline>` (same runner, prior stage; or `(none)` for Stage 1).

## Cluster Signature (15 §Cluster Signature)

```text
caseId
mode
routeId or routeShape
phase
actionType
category
severity
sourcePath
normalizedActual
normalizedExpected
policyOrRuntimeFlag
```

Hash implementation is the runner's choice but must be **stable across reruns and across runners** (so cross-runner cluster diff is meaningful).

## Representative Sample Limit (15 §Representative Sample Rule)

- max 3 representative routes per cluster
- max 1 shortest reproduction
- max 1 highest-severity reproduction
- max 1 flaky or divergent reproduction
- max 200 relevant transcript lines per cluster unless explicitly expanded

Agents may request more raw samples only for a named cluster and reason. Cross-runner merge consumes only the per-runner representative samples.

## Sub-Agent Layout (15 §Sub-Agent Operating Model — per runner)

```text
Agent A — Normal Cluster Reviewer
Input: aggregate normal clusters + representative samples only

Agent B — Exhaustive Cluster Reviewer
Input: aggregate exhaustive clusters + representative samples only

Agent C — Runtime / Simulator Classifier
Input: clusters marked D/R/S/N uncertain, source pointers, small samples

Agent D — Integration Secretary
Input: Agent A/B/C summaries only (within this runner)
Output: per-runner final action list and unresolved decisions
```

Agent D must not read raw artifacts unless explicitly authorized for a named unresolved cluster. Sub-agents do not cross runner boundaries during execution.

## Sub-Agent Prompt Requirements (15 §Sub-Agent Prompt Requirements)

Every sub-agent prompt must include the following constraints:

```text
Do not read all raw transcripts.
Start from aggregate summaries.
Open raw artifacts only for named clusters.
Use at most 3 representative samples per cluster unless escalation is needed.
Return cluster-level findings, not per-run repetition.
Classify each finding with D/R/S/N before severity.
Do not make runtime-release claims from simulator transcript alone.
Do not read the other runner's result-dir during execution.
```

## Per-Runner Integration Rules (15 §Integration Rules)

Per-runner integration happens by cluster, not by run.

The per-runner integrated summary must contain:

- new clusters since baseline (same runner, prior stage)
- resolved known clusters
- repeated known clusters
- flaky clusters
- hard failures
- D/R/S/N distribution
- recommended fix track
- raw artifact pointers, not pasted raw content

The per-runner integrated summary must not paste long transcript blocks; link to representative samples.

## Cross-Runner Merge (separate later step — NOT in this PASTE's scope)

Cross-runner merge is performed only after **both** runners complete this stage (or both halt). Merge happens under `tmp/qa-bulk-runs/integrated/<stage-id>-<utc-timestamp>/` and produces `MERGE-REPORT.md`, `codex-vs-claudecode-cluster-diff.json`, `final-cluster-summary.json`. This PASTE does not perform the merge.

## CT Role (15 §CT Role)

CT may report (per runner):
- exit status
- hard count
- run count
- artifact completeness
- result paths
- aggregate counts
- new/known cluster counts
- flaky run ids

CT must not decide that a cluster is benign or release-blocking from detector count alone.

## Out-of-Scope (this round)

- raw transcript 전체 read 금지 (모든 agent / 모든 runner)
- detector count만으로 release 판단 금지
- agent가 모든 run을 별도로 처리 X (cluster 단위 보고)
- **다른 runner의 result-dir read 금지** (본 라운드 실행 중)
- 다른 runner와의 sample/intermediate 공유 금지
- guide files (`tmp/qa-thread-guides/01-…04-…`) 변경 금지
- `15` / `19` / `20` / `21` 본문 변경 금지
- `scripts/qa-route-simulator.cjs` / `src/**` / runtime 변경 금지
- Track A surfaces (game data / scripted text / disclosure policy / case data / claim policies) 변경 금지
- baseline tag bump 금지
- 다음 stage 자동 launch 금지 (각 stage 종료 후 CT/사용자 승인 필요)
- cross-runner merge 본 라운드에서 수행 X (별도 단계)

## Commit Strategy (this round)

- bulk QA 결과 자체는 commit 영역 X (raw + aggregate는 untracked baseline-frozen artifact 영역; commit 여부는 별도 결정 영역).
- runner가 simulator/detector 추가 fix를 발견할 경우 별도 follow-up commit (separate packet) — 본 PASTE에서는 코드 수정 X.

## 작업 후

- summary 보고: `<runner-result-base>review/REVIEW.md`
- CT가 양쪽 runner의 stage 완료를 확인 → 사용자 승인 후 cross-runner merge 단계 진입 또는 다음 stage 진입.

## 진입 승인

본 PASTE = 사용자 명시 승인 후 사용. instantiation 시 모든 `<...>` 영역 채움. 미채운 placeholder가 남아 있으면 즉시 중단 + 보고.
```

---

## End Of Template Body

The above body (everything between `## Template Body (copy below this line)` and `## End Of Template Body`) is superseded for active use. Do not instantiate it without applying the 2026-04-28 fresh-run-to-final correction used in the four active `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files.

## Resolved Decisions (this template)

1. **Variable list** — fixed: `<runner-id>` / `<stage-id>` / `<utc-timestamp>` / `<main-HEAD>` / `<normal-runs-per-case>` / `<exhaustive-runs-per-case>` / `<runner-result-base>` / `<previous-aggregate-baseline>` / `<allowed-cases>` / `<other-runner-id>`. Adding new variables requires a separate guide-update round.
2. **Allowed runner-id values** — `codex-primary` and `claudecode-crosscheck` only.
3. **Allowed cases** — defaults to `spouse-01,family-01,friend-01` (CLAUDE.md §활성 사건). Other case lists must be approved separately.
4. **Stop rules in body** — verbatim from 19; no relaxation per round.
5. **Sub-agent layout** — verbatim from 15 §Sub-Agent Operating Model; per-round adaptation requires guide update.
6. **Cross-runner sharing** — forbidden during execution; merge is a separate later step under `tmp/qa-bulk-runs/integrated/`.

## Hand-off

This template file was added by round 21 (`21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md` §Item — Commit 20), but active operation has been corrected. Future bulk-QA rounds should instantiate per worker/mode run-to-final, not once per runner per stage, unless CT/user explicitly chooses manual stage gates.
