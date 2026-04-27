# CT Instructions For Six Codex QA Analysis Threads

CT should use this file to generate the six deterministic QA artifact packets.

## Boundary

CT owns:

- execution
- artifact collection
- packet path consistency
- basic counts and category summaries
- preservation of pre-warmup trial artifacts

CT does not own:

- final QA judgment
- release-blocking decision
- fix scope decision
- code or script changes

## Baseline

Use:

```text
D:/ProjectWS-main-temp
```

Baseline commit:

```text
ff3f9a1
```

Before running, confirm:

```powershell
git -C D:/ProjectWS-main-temp status --short --branch
git -C D:/ProjectWS-main-temp log --oneline -5
```

Do not remove `D:/ProjectWS-main-temp` until all packets are generated, reviewed, and backed up if needed.

Do not touch `D:/ProjectWS` wip worktree.

Do not use `D:/ProjectWS-stage1` for these QA runs unless explicitly instructed.

## Preserve Pre-Warmup Trial

Existing trial artifacts:

```text
D:/ProjectWS-main-temp/tmp/qa-warmup-trial/spouse-01-normal
D:/ProjectWS-main-temp/tmp/qa-warmup-trial/spouse-01-exhaustive
```

They are pre-warmup trial artifacts. Do not delete them.

If useful, add a marker README:

```text
D:/ProjectWS-main-temp/tmp/qa-warmup-trial/README-PRE-WARMUP-TRIAL.md
```

The marker should state that these artifacts are reference-only and not the canonical six-thread packet result.

## Result Root

Canonical packet result root:

```text
D:/ProjectWS-main-temp/tmp/qa-warmup-packet
```

Create six result directories:

```text
tmp/qa-warmup-packet/spouse-01-normal
tmp/qa-warmup-packet/spouse-01-exhaustive
tmp/qa-warmup-packet/family-01-normal
tmp/qa-warmup-packet/family-01-exhaustive
tmp/qa-warmup-packet/friend-01-normal
tmp/qa-warmup-packet/friend-01-exhaustive
```

## Commands

Run from `D:/ProjectWS-main-temp`.

### T1

```powershell
node scripts/qa-route-simulator.cjs --case spouse-01 --result-dir tmp/qa-warmup-packet/spouse-01-normal
```

### T2

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case spouse-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/spouse-01-exhaustive
```

### T3

```powershell
node scripts/qa-route-simulator.cjs --case family-01 --result-dir tmp/qa-warmup-packet/family-01-normal
```

### T4

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case family-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/family-01-exhaustive
```

### T5

```powershell
node scripts/qa-route-simulator.cjs --case friend-01 --result-dir tmp/qa-warmup-packet/friend-01-normal
```

### T6

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case friend-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/friend-01-exhaustive
```

## Packet Files To Update

Update only the marked CT sections in:

```text
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T1-spouse-01-normal.md
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T2-spouse-01-exhaustive.md
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T3-family-01-normal.md
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T4-family-01-exhaustive.md
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T5-friend-01-normal.md
D:/ProjectWS-main-temp/tmp/qa-thread-guides/PACKET-T6-friend-01-exhaustive.md
```

For each packet, fill:

- execution status
- start/end time
- duration
- exit code
- result-dir
- route count
- action count
- finding count
- hard finding count
- category distribution
- artifact file list
- any command error

Do not add CT's final judgment.

## Duplicate / Conflict Merge Protocol

여러 thread report가 같은 cluster를 다르게 판정할 수 있다. 통합 단계는 cluster별로 다음을 기록한다:

- agreed facts
- disputed interpretation
- required confirmation
- final axis
- final severity

## Required Artifact Checklist

For each result-dir, confirm presence of:

- `action-by-action-trace.json`
- `coverage-summary.json`
- `coverage-summary.md`
- `findings.json`
- `manifest_validation_findings.json`
- `phase-b-1-gate-spec-report.json`
- `<caseId>-route-summary.md`
- `route-transcripts/`

For exhaustive only, also confirm:

- `exhaustive-generation-summary.json`
- `exhaustive-generation-summary.md`

## Deterministic Note

`qa-route-simulator` is deterministic.

Do not run 30/5 repeated packet runs. One run per thread is enough for canonical deterministic artifacts.

Repeated 30/5 and 2000/300 runs belong to a separate stability/non-deterministic/browser QA track.

## CT Report Message To User

After packet generation, report with this structure:

```text
6-thread QA packet generation complete.

Baseline:
- worktree: D:/ProjectWS-main-temp
- commit: ff3f9a1

Generated result dirs:
- tmp/qa-warmup-packet/spouse-01-normal
- tmp/qa-warmup-packet/spouse-01-exhaustive
- tmp/qa-warmup-packet/family-01-normal
- tmp/qa-warmup-packet/family-01-exhaustive
- tmp/qa-warmup-packet/friend-01-normal
- tmp/qa-warmup-packet/friend-01-exhaustive

Thread packet files:
- tmp/qa-thread-guides/PACKET-T1-spouse-01-normal.md
- tmp/qa-thread-guides/PACKET-T2-spouse-01-exhaustive.md
- tmp/qa-thread-guides/PACKET-T3-family-01-normal.md
- tmp/qa-thread-guides/PACKET-T4-family-01-exhaustive.md
- tmp/qa-thread-guides/PACKET-T5-friend-01-normal.md
- tmp/qa-thread-guides/PACKET-T6-friend-01-exhaustive.md

Short Codex thread messages are in:
- tmp/qa-thread-guides/05-CODEX-THREAD-MESSAGES.md

CT did not make final QA judgments. The files are ready for six Codex analysis threads.
```

## Thread Operation Simplification

6개 수동 thread 방식은 운영 비용이 크다. 다음부터는 기본을 2 thread로 단순화한다:

- Thread A: normal 3 cases
- Thread B: exhaustive 3 cases

각 thread는 case별 section을 나누고, 통합 report에서 cluster 기준으로 병합한다. 필요할 때만 6 thread로 확장한다.
