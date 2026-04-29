# PASTE — Track A A4 C7 Witness Manifest Investigation — Codex-Dev First Message

> 새 Codex-Dev (또는 Codex-QA) 세션 진입 시 본 메시지 본문을 그대로 붙여넣어 주세요. 본 PASTE는 본 worktree (`D:/ProjectWS`) 영역에 untracked로 보존됩니다.

---

## ⚠️ Worker Identity (사용자 명시 / 절대 혼동 금지)

- **본 worker = Codex-Dev (or Codex-QA) Track A A4 C7 Witness Manifest Investigation** (single worker / 동시 병렬 entry X).
- **본 worker scope = Phase 1 read-only investigation only** (NO apply / NO mechanical edit / NO commit / NO push / NO tag / NO QA simulator run / NO GPT Pro / NO new content).
- **본 worker apply targets = 없음** (사용자 명시 / 영역 영역 영역 영역 변경 X).
- **본 worker result doc** = `tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`.
- **본 worker dedicated artifact root**: 없음 (read-only investigation / artifact write = 66 result doc only).
- **default `tmp/qa-route-simulator-results/` 사용 X**.
- 진입 시 §Stage 2 영역 worker name + scope (read-only) + result doc + no apply + no QA verify.

---

Codex-Dev (또는 Codex-QA) 세션 — **b809ccc baseline** (= origin/main / 5 known-dirty cleanup + tag bump applied) 영역 영역 영역 **Track A A4 C7 (manifest 영역) item 영역 활성 3건 (spouse-01 / family-01 / friend-01) witness id / scope / order Phase 1 investigation (read-only / no apply / no commit / no GPT Pro / no QA simulator run)** 영역입니다.

본 라운드 = **active 3건 witness 영역 영역 (id / scope / order) 영역 정합성 영역 영역 영역 영역 + manifest / case data / claim policy / scriptedText / runtime engine 영역 source-of-truth 영역 영역 영역 영역 + round-20260429 4-worker bulk QA + 60 + 64 result root 영역 영역 finding 영역 영역 영역 cross-reference + Phase 2 routing 영역 결정 영역 (5 outputs: B.1~B.5)**.

본 PASTE는 **단계별 진행 의무**입니다 (사용자 명시): Stage 1 entry guard 완료 후 **종결 X / 자동 Stage 2 → ... → Stage 8 (result doc 작성) 영역 진행**. strict stop 영역 영역 영역 영역 stage 진행 X.

## ⚠️ Decision Input Values (사용자 명시 / frozen)

- **Baseline = `b809ccc`** (= origin/main / push 완료 / fast-forward `a386a8a` → `b809ccc`).
- **Scope = active 3건 (spouse-01 / family-01 / friend-01)** witness 영역 영역 영역.
- **Phase 1 investigation only / no apply** (사용자 명시).
- **No QA simulator run** (사용자 명시 / round-20260429 + 60 + 64 artifact 영역 영역 영역 영역 영역).
- **No GPT Pro / no new content** (사용자 명시).

## ⚠️ Investigation Boundary (사용자 명시)

1. **read-only / no modification** (engine / manifest / case data / claim policy / scriptedText / dialogues 영역 영역 영역 변경 X).
2. **runtime / simulator / hook / store / component 변경 X** (사용자 명시).
3. **새 narrative / dialogue / content 작성 X** (사용자 명시 / 작성 영역 → 즉시 stop / 66 boundary report).
4. **GPT Pro 호출 X** (사용자 명시 / 호출 영역 → 즉시 stop / 66 boundary report).
5. **새 QA simulator run X** (사용자 명시 / 새 simulator run 영역 → 즉시 stop / 66 boundary report).
6. **commit / push / tag X** (사용자 명시 / 영역 영역 → stop/report).
7. **본 packet 영역 mechanical apply 없음** — investigation only.
8. **결정 routing 영역 5 outputs** (B.1~B.5 / Stage 6).

## ⚠️ CRITICAL CWD GUARD (사용자 명시 / 58/60 §Caveats tooling-path deviation 강화)

본 investigation 영역 영역 = 58 §Caveats + 60 §Caveats 영역 발견된 apply_patch tool ambient workspace 영역 영역 영역 영역. 진입 시 다음 영역 영역 가장 먼저 영역 영역.

### PowerShell 영역 영역

```powershell
Set-Location -LiteralPath D:/ProjectWS
$pwd_check = (Get-Location).Path.Replace('\', '/')
Write-Output "CWD: $pwd_check"

if ($pwd_check -ne "D:/ProjectWS") {
  Write-Error "CWD GUARD VIOLATION: not in D:/ProjectWS (got: $pwd_check)"
  exit 1
}

$pwd_lower = $pwd_check.ToLowerInvariant()
if ($pwd_lower -like "*projectws-dev*" -or $pwd_lower -like "*projectws-stage1*" -or $pwd_lower -like "*projectws-live-qa-archive*" -or $pwd_lower -like "*projectws-main-temp*") {
  Write-Error "CWD GUARD VIOLATION: detected non-canonical ProjectWS worktree (got: $pwd_check)"
  exit 1
}

Write-Output "CWD GUARD: OK ($pwd_check)"
```

### Bash 영역 영역

```bash
cd D:/ProjectWS
pwd_check=$(pwd)
echo "CWD: $pwd_check"

if [[ "$pwd_check" != "/d/ProjectWS" && "$pwd_check" != "D:/ProjectWS" ]]; then
  echo "CWD GUARD VIOLATION: not in D:/ProjectWS (got: $pwd_check)" >&2
  exit 1
fi

pwd_lower=$(echo "$pwd_check" | tr '[:upper:]' '[:lower:]')
if [[ "$pwd_lower" == *"projectws-dev"* || "$pwd_lower" == *"projectws-stage1"* || "$pwd_lower" == *"projectws-live-qa-archive"* || "$pwd_lower" == *"projectws-main-temp"* ]]; then
  echo "CWD GUARD VIOLATION: detected non-canonical ProjectWS worktree (got: $pwd_check)" >&2
  exit 1
fi

echo "CWD GUARD: OK ($pwd_check)"
```

### file 영역 영역 영역 (58/60 §Caveats 영역 강화)

- **본 packet 영역 file write = 66 result doc only** (`D:/ProjectWS/tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`).
- **다른 file / dir 영역 영역 영역 영역 X** (사용자 명시 / read-only).
- **모든 read 영역 absolute path 영역 영역** (`D:/ProjectWS/...`).
- **66 result doc write 영역 즉시 verify**:
  - PowerShell: `Test-Path D:/ProjectWS/tmp/qa-thread-guides/66-...md` → True / `Test-Path D:/ProjectWS/tmp/qa-thread-guides/66-...md` → False.
  - Bash: `[[ -f D:/ProjectWS/tmp/qa-thread-guides/66-...md ]]`.
- **D:/ProjectWS 영역 결과 영역 발견 영역 영역 즉시 stop / 66 boundary report**.
- 66 result doc §Entry Guard 영역 영역 cwd guard 완료 영역 명시.

## 진입 자료 (필수)

- **본 의뢰서**: `tmp/qa-thread-guides/65-REQUEST-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION.md`
- **CT 인계 (source-of-truth)**: `tmp/CT-HANDOFF-20260429-B809CCC-CLEANUP.md` (b809ccc cleanup + tag bump milestone source-of-truth)
- **64 result PASS (post-C6 confirmation / a386a8a verified)**: `tmp/qa-thread-guides/64-POST-C6-MINIMAL-CONFIRMATION-RESULT.md`
- **60 result PASS (a386a8a 영역 source-of-truth)**: `tmp/qa-thread-guides/60-TRACK-A-A3-C6-SPOUSE-PHASE2-MANUAL-FIX-RETRY-RESULT.md`
- **round-20260429 4-worker bulk QA + cross-check (PASS / pushed baseline)**:
  - `tmp/qa-thread-guides/56-ROUND-20260429-CLAUDECODE-CROSS-CHECK-INTEGRATED-SUMMARY.md`
  - `tmp/qa-thread-guides/50-ROUND-20260429-BULK-QA-RERUN-INTEGRATED-SUMMARY.md`
  - `tmp/qa-thread-guides/48-...md` / `49-...md` / `54-...md` / `55-...md`
- **04-CT-INSTRUCTIONS.md §Stop Rules**: `tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md` (`d217df0`)
- **CLAUDE.md**: §witnessEngine / §데이터 구조 / §주의사항
- **case generation docs** (read-only):
  - `docs/case-generation/quality-rules.md`
  - `docs/case-generation/scripted-text-channels.md`
  - `docs/case-generation/schemas.md`
- **Active engine (read-only / 변경 X)**:
  - `src/engine/witnessEngine.ts`
  - `src/engine/witnessTestimonyResolver.ts`
- **Active manifest / case loader (read-only / 변경 X)**:
  - `src/data/cases/index.ts`
  - `src/data/cases/caseLoader.ts`
  - `src/data/cases/refined/manifest.json`
- **Active case data (read-only / 활성 3건)**:
  - `src/data/cases/generated/spouse-01.json`
  - `src/data/cases/generated/family-01.json`
  - `src/data/cases/generated/friend-01.json`
- **Active claim policies (read-only / 19 file)**:
  - `src/data/claimPolicies/{spouse-01, family-01, friend-01}-structure-v2.json`
  - `src/data/claimPolicies/{case}-game-events.json` / `{case}-game-events-v2.json`
  - `src/data/claimPolicies/{case}-v2-atoms.json`
  - `src/data/claimPolicies/{case}-v3-game-loop-data.json`
  - `src/data/claimPolicies/{case}.ts`
- **Active scriptedText (read-only / 변경 X)**:
  - `src/data/scriptedText/spouse-01.json` (a386a8a ship 영역 / 변경 X)
  - `src/data/scriptedText/family-01.json`
  - `src/data/scriptedText/friend-01.json`
- **Active dialogues (read-only)**:
  - `src/data/dialogues/phase1/{case}.json` / `phase2/{case}.json`
- **Pre-edit baseline (read-only / Stage 3 영역 영역)**:
  - `tmp/qa-bulk-runs/round-20260429/codex-qa-{a-normal,b-exhaustive}/{case}/route-transcripts/`
  - `tmp/qa-bulk-runs/round-20260429/claudecode-qa-{a-normal,b-exhaustive}/{case}/route-transcripts/`
  - `tmp/qa-spouse-01-phase2-manual-fix-retry-{normal,exhaustive}-20260429T0038*/`
  - `tmp/qa-spouse-01-post-c6-confirmation-{normal,exhaustive}-20260429T0128*/`
- **QA guides** (read-only): `01` / `02` / `03`
- **simulator script** (read-only / 변경 X): `scripts/qa-route-simulator.cjs`

## ⚠️ 단계별 진행 의무 (사용자 명시)

본 PASTE는 **Stage 1 영역 영역 종결 X**. Stage 1 OK → **자동 Stage 2 → ... → Stage 8 (result doc 작성) 영역 진행**.

stage 영역 영역 (Phase 1 investigation only / 8 stages):

1. **Stage 1 — Entry guard** (CWD / worktree / HEAD = b809ccc / origin/main = b809ccc / 5 baseline tags / tracked clean / preserved untracked).
2. **Stage 2 — Worker identity guard** (worker name / scope = read-only investigation / result doc / no apply / no QA / no GPT Pro).
3. **Stage 3 — QA finding extraction** (round-20260429 4-worker + 60 + 64 영역 영역 witness 영역 finding / channel × category × route × case 영역 영역).
4. **Stage 4 — Source-of-truth read** (engine / manifest / case data / claim policy / scriptedText / dialogues 영역 영역 영역 read-only verify).
5. **Stage 5 — Cross-reference analysis** (witness ID match / scope match / order match / manifest registration match).
6. **Stage 6 — Decision routing** (B.1 no-fix-needed / B.2 manifest-data-relink-needed / B.3 source-scope-decision-needed / B.4 content-needed-gpt-pro / B.5 defer/carry-forward).
7. **Stage 7 — Validation plan proposal** (Phase 2 영역 영역 영역 영역 / static / targeted QA / witness sweep / strict counters / diff scope).
8. **Stage 8 — Result doc 작성** (`66-...md`).

strict stop 영역 영역 영역 영역 stage 진행 X / 66 result doc 영역 부분 결과 + stop 사유 명시.

## §Stage 1 — Entry guard

진입 명령:

```bash
git fetch origin
git log --oneline -3                                              # local HEAD = b809ccc (top)
git rev-parse origin/main                                         # b809ccc (= local HEAD)
git log --oneline origin/main..HEAD                               # (empty / 완전 동기화)
git status --short --branch | head -10                            # ## main...origin/main / tracked clean + preserved untracked only만
git tag --list 'baseline-pre-policy-v3*'                          # 5 tag 정합 (변동 X)
git status --short -- tmp/qa-route-simulator-results/             # 빈 출력 (clean)
git status --short -- tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md  # 빈 출력 (clean)
git status --short -- src/data/scriptedText/spouse-01.json        # 빈 출력 (a386a8a ship / clean)
git status --short -- src/data/disclosurePolicy/spouse-01.json    # 빈 출력 (a386a8a ship / clean)
git status --short -- src/data/cases/generated/spouse-01.json     # 빈 출력 (clean)
git status --short -- src/data/cases/generated/friend-01.json     # 빈 출력 (clean)
git status --short -- src/data/cases/generated/family-01.json     # 빈 출력 (clean)
git status --short -- docs/case-generation/regeneration-policy.md # 빈 출력 (clean)
git status --short -- src/engine/witnessEngine.ts                 # 빈 출력 (clean)
git status --short -- src/engine/witnessTestimonyResolver.ts      # 빈 출력 (clean)
git status --short -- src/data/cases/index.ts                     # 빈 출력 (clean)
git status --short -- src/data/cases/caseLoader.ts                # 빈 출력 (clean)
git status --short -- src/data/cases/refined/manifest.json        # 빈 출력 (clean)
ls tmp/qa-thread-guides/64-POST-C6-MINIMAL-CONFIRMATION-RESULT.md  # 64 PASS doc
ls tmp/qa-thread-guides/56-ROUND-20260429-CLAUDECODE-CROSS-CHECK-INTEGRATED-SUMMARY.md  # 4-worker integrated baseline
```

기대 영역:
- local HEAD = `b809ccc`
- origin/main = `b809ccc` (= local HEAD)
- `origin/main..HEAD` = empty (완전 동기화)
- branch is not `main` / local HEAD is detached
- 5 baseline tags (변동 X / `a7aaec3` / `de3ad48` / `a7aaec3` / `8e07b0a` / `a386a8a` peeled)
- **tracked working tree clean** (no M / 5 known-dirty cleanup 완료)
- preserved untracked 영역 영역 (124+ / 본 65 packet+PASTE / 66 placeholder 영역 / handoff 영역)
- entry-clean targets 모두 clean (engine / manifest / case data / claim policy / scriptedText / dialogues / simulator script)
- `tmp/qa-route-simulator-results/` clean

Stage 1 OK → 자동 Stage 2 진입.

## §Stage 2 — Worker identity guard

다음 영역 명시 verify:

- worker name = **Codex-Dev (or Codex-QA) Track A A4 C7 Witness Manifest Investigation**.
- single worker / 동시 병렬 entry X.
- scope = Phase 1 read-only investigation only (NO apply / NO mechanical edit / NO commit / NO push / NO tag / NO QA simulator run / NO GPT Pro / NO new content).
- apply targets = **없음** (사용자 명시).
- result doc filename = `66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`.
- dedicated artifact root = 없음 (read-only / file write = 66 result doc only).
- 66 result doc §Entry Guard 영역 영역 worker identity guard 완료 영역 명시.

Stage 2 OK → 자동 Stage 3 진입.

## §Stage 3 — QA finding extraction

### 3.1 round-20260429 4-worker bulk QA finding (활성 3건)

- `tmp/qa-bulk-runs/round-20260429/codex-qa-a-normal/{spouse-01, family-01, friend-01}/findings.json`
- `tmp/qa-bulk-runs/round-20260429/codex-qa-b-exhaustive/{spouse-01, family-01, friend-01}/findings.json`
- `tmp/qa-bulk-runs/round-20260429/claudecode-qa-a-normal/{case}/findings.json`
- `tmp/qa-bulk-runs/round-20260429/claudecode-qa-b-exhaustive/{case}/findings.json`

각 finding 영역 영역 witness 관련 영역 영역 영역 (channel name / category / route / phase / id 영역).

### 3.2 60 + 64 result root finding (spouse-01 only)

- `tmp/qa-spouse-01-phase2-manual-fix-retry-normal-20260429T003822Z/findings.json`
- `tmp/qa-spouse-01-phase2-manual-fix-retry-exhaustive-20260429T003827Z/findings.json`
- `tmp/qa-spouse-01-post-c6-confirmation-normal-20260429T012842Z/findings.json`
- `tmp/qa-spouse-01-post-c6-confirmation-exhaustive-20260429T012846Z/findings.json`

### 3.3 Witness 관련 finding extraction

- finding category 영역 영역 영역 영역:
  - `response_missing` (witness call 영역 영역 영역).
  - `safe_fallback_used` (witness id 영역 영역 영역 영역).
  - `system_only_action_no_npc_followup` (witness call 영역 영역 영역).
  - `evidence_investigate_no_npc_followup` (witness 관련 영역 영역).
  - `qa_annotation_only_action` (witness 관련 영역 영역).
- channel 영역 영역 영역:
  - `witness_*` / `witness-*` / `*-witness-*`.
  - `witness_call` / `witness_testify` / `witness_resolution` / `witness_no_response` / 기타.
- 영역 영역 영역 → Stage 5 cross-reference 영역 영역 영역.

Stage 3 OK → 자동 Stage 4 진입.

## §Stage 4 — Source-of-truth read

### 4.1 Engine read-only verify

- `src/engine/witnessEngine.ts`: witness 영역 영역 / scope / order 영역 runtime 결정 영역 영역 영역 영역.
- `src/engine/witnessTestimonyResolver.ts`: witness statement / depth (vague / partial / full) 영역 resolver 영역 영역 영역.

### 4.2 Manifest / case loader read-only verify

- `src/data/cases/index.ts`: active 3건 import / export entry.
- `src/data/cases/caseLoader.ts`: case data load logic.
- `src/data/cases/refined/manifest.json`: refined manifest (활성 3건 영역 영역 영역).

### 4.3 Case data read-only (witnesses array)

- `src/data/cases/generated/{spouse-01, family-01, friend-01}.json`:
  - witnesses array (id / order / scope / statement metadata).
  - 각 case 영역 영역 영역 영역 영역.

### 4.4 Claim policy read-only

- `{case}-structure-v2.json`: witness lead lines / scene witness reference.
- `{case}-game-events.json` / `{case}-game-events-v2.json`: witness trigger events.
- `{case}-v2-atoms.json`: NPC atom 영역 영역 영역 witness reaction.

### 4.5 ScriptedText read-only (변경 X / 사용자 명시)

- `src/data/scriptedText/{case}.json`: witness 채널 (channel name / variant id / statement 영역).

### 4.6 Dialogues read-only

- `src/data/dialogues/phase1/{case}.json`: phase1 영역 witness 영역 영역.
- `src/data/dialogues/phase2/{case}.json`: phase2 동일.

Stage 4 OK → 자동 Stage 5 진입.

## §Stage 5 — Cross-reference analysis

### 5.1 Witness ID match (A.9.1)

- 모든 source 영역 witness id 정합 영역 영역.
- mismatch 영역 → 어느 source 영역 ground truth 영역 영역 영역 영역.

### 5.2 Witness scope match (A.9.2)

- phase / disputeId / route 영역 영역 영역 영역 영역.
- mismatch 영역 → scope 정의 영역 영역 영역 결정 영역.

### 5.3 Witness order match (A.9.3)

- array index / runtime resolution order 영역 영역 영역.
- order discrepancy 영역 → manifest array vs runtime resolution 영역 영역 영역 결정 영역.

### 5.4 Manifest registration match (A.9.4)

- active 3건 영역 영역 영역 영역 영역 영역 / 누락.

Stage 5 OK → 자동 Stage 6 진입.

## §Stage 6 — Decision routing

### B.1 `no-fix-needed`
- 모든 cross-reference 영역 영역 정합 / mismatch 영역 영역 영역 / QA finding 영역 영역 영역 영역 영역 영역 영역 영역 영역.
- → close.

### B.2 `manifest-data-relink-needed`
- mechanical relink (rename / reorder / scope clarify) 영역 영역 영역.
- 새 content X / GPT Pro X / scriptedText 변경 X.
- → Phase 2 manual fix packet (CT-Main / Codex-Dev).

### B.3 `source-scope-decision-needed`
- canonical source 결정 영역 영역 사용자 결정 영역.
- → Phase 2 진입 영역 영역 사용자 결정 영역.

### B.4 `content-needed-gpt-pro-decision-pending`
- 새 witness statement / 새 narrative 영역 영역 → GPT Pro 영역 영역 영역.
- → Phase 2 영역 영역 사용자 결정 영역.

### B.5 `defer/carry-forward`
- 별도 라운드 / carry-forward note만.
- → 사용자 결정 영역 / 우선순위 영역.

Stage 6 OK → 자동 Stage 7 진입.

## §Stage 7 — Validation plan proposal (Phase 2)

### C.1 Static checks

- `node --check scripts/qa-route-simulator.cjs` (PASS).
- `npx tsc -b --force` (PASS).
- `npm run build:pc` (PASS / Vite warning carry-over OK).

### C.2 Targeted simulator QA (영역 영역 영역 case(s))

- normal mode mandatory: dedicated result root `tmp/qa-{case}-a4-c7-witness-fix-normal-{UTC-timestamp}/`.
- exhaustive mode mandatory: dedicated result root `tmp/qa-{case}-a4-c7-witness-fix-exhaustive-{UTC-timestamp}/`.
- default `tmp/qa-route-simulator-results/` 사용 X.

### C.3 Witness keyword/id/order sweep (pre vs post)

- witness id occurrence count vs Phase 1 baseline.
- witness order array integrity.
- finding category 영역 영역.

### C.4 Strict stop counters (post)

- hard 0 / active `response_missing` 0 / `qa_focus_review` 0 / 새 P0/P1 0.

### C.5 Diff scope verification

- manifest / case data / claim policy 변경 영역 영역.
- scriptedText / runtime / engine 변경 X.
- friend-01 / family-01 / spouse-01 영역 영역 영역 영역.

Stage 7 OK → 자동 Stage 8 진입.

## §Stage 8 — Result doc 작성

`tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`

**구조** (51 doc 형식 + Stage 5 (cross-reference) + Stage 6 (routing) + Stage 7 (validation plan)):

- §Entry Guard:
  - **CWD Guard 완료 영역 명시 (58/60 §Caveats 영역 강화)**
  - **Worker identity guard 완료 영역 명시** (worker name / scope / result doc / no apply / no QA / no GPT Pro)
  - worktree / **HEAD = `b809ccc`** / **origin/main = `b809ccc`** / **`origin/main..HEAD` = empty** / tracked clean / preserved untracked / 5 baseline tags
- §Investigation:
  - §Stage 1~8 영역 영역 (각 stage status + per-stage detail)
  - Stage 3 finding extraction table (channel × category × route × case × finding count)
  - Stage 4 source-of-truth read (per-source summary / id / scope / order metadata)
  - Stage 5 cross-reference analysis table (5.1~5.4 / mismatch 영역 영역 영역)
  - Stage 6 decision routing (B.1~B.5 결정 영역 영역 + 영역 영역)
  - Stage 7 validation plan proposal (C.1~C.5 / Phase 2 영역 영역 영역 영역)
- §Status (B.1~B.5 routing decision)
- §Boundary Reports
- §Caveats (deviation / 새 발견 / **CWD guard 영역 / Worker identity / 영역 영역 영역**)
- §Result Path

Stage 8 OK → 보고.

## Stop Rules (strict)

다음 중 하나라도 발생 시 **즉시 stop / 이후 stage 진행 X / 66 result doc 영역 영역 보고**:

- **CWD guard 영역 위반 / apply_patch tool ambient workspace 영역 영역 영역**.
- **Worker identity 영역 위반**.
- **새 `M` 영역 등장** (본 packet 영역 영역 영역 영역 변경 영역 영역 X).
- preserved untracked 영역 손상 / 누락.
- worktree guard 위반 (HEAD ≠ `b809ccc` / origin/main ≠ `b809ccc` / branch wip / cwd 잘못된 worktree).
- baseline tags 5 변동.
- file write fail / disk full / encoding error.
- commit / push / tag 시도 → stop/report.
- **code / data / scriptedText / disclosurePolicy / atom / structure / dossier-cards / case-data / simulator code / runner / generator / Phase 1 dialogues / runtime / policy engine / witness engine / manifest / case loader 변경 시도** → stop/report (사용자 명시).
- **새 dialogue / narrative content 의미 작성 시도** → 즉시 stop / 66 boundary report.
- **GPT Pro 호출 시도** → 즉시 stop / 66 boundary report.
- **assemble-family-friend-bundles.cjs regeneration** → stop/report.
- **family-01 / friend-01 / spouse-01 source files 영역 영역 영역 영역** → stop/report.
- **default `tmp/qa-route-simulator-results/` 영역 쓰기** → stop/report.
- **새 QA simulator run 시도** → stop/report (사용자 명시).
- **regeneration-policy.md / 04-CT-INSTRUCTIONS.md 본문 변경 시도** → stop/report.

## Push / Commit / Tag / QA / Apply 영역

- 본 packet 영역 = **Phase 1 investigation only / static + read-only + 66 result doc 작성만 / NO apply / NO commit / NO push / NO tag / NO QA simulator run**.
- commit X / tag X / push X.
- Apply / Stage edit X (사용자 명시 / 영역 영역 영역 영역 변경 X).
- 새 content X / GPT Pro X / atom X / Phase 1 dialogues X / runtime/policy engine X / friend-family X / 새 QA bulk rerun X.
- 66 result doc 영역만 untracked.
- commit / push / tag 영역 사용자 명시 결정 영역 별도 라운드 (Phase 2 영역 영역).

## CT 영역 확약

- 코드 / atom / structure / dossier-cards / case-data / runtime / policy engine / Phase 1 dialogues / friend-01 / family-01 / spouse-01 source files / simulator code / runner / generator / disclosurePolicy / scriptedText / witness engine / manifest / case loader 수정 X
- commit X / push X / tag X / build / lint / static validation 외 영역 X (Phase 1 read-only)
- 5 known-dirty packet docs 손대지 X (현재 b809ccc 영역 영역 영역 영역 모두 committed)
- preserved untracked 손대지 X
- 기존 packet 본문 변경 X (60 + 64 result + 4-worker bulk QA result roots / 본 65 packet+PASTE / 66 placeholder 영역)
- `tmp/qa-route-simulator-results/` default 영역 영역 X
- 새 dialogue / narrative content 영역 영역 X
- GPT Pro 호출 X
- 새 QA simulator run X
- `D:/ProjectWS-dev` wip worktree 비접촉
- 66 report 도착 시 CT 검토 → 사용자 결정 영역 진입.

## 시작

진입 → **CWD guard 완료** → **Worker identity guard 완료** (worker name = Codex-Dev (or Codex-QA) Track A A4 C7 Witness Manifest Investigation / scope = Phase 1 read-only investigation / doc = 66) → §Stage 1 → ... → §Stage 8 → 보고.

**Phase 1 investigation only / read-only / NO apply / static + QA finding extraction + source-of-truth read + cross-reference analysis + decision routing (B.1~B.5) + validation plan proposal**.

**단독 entry / 동시 병렬 entry X**.

**단계별 의무 진행 / Stage 1 영역 영역 영역 영역 / strict stop 영역 영역 영역 영역 즉시 stop**.

**기대 영역**:
- Stage 3 finding extraction (witness 관련 영역 영역) / Stage 4 source-of-truth read / Stage 5 cross-reference analysis / Stage 6 decision routing (B.1~B.5 중 하나) / Stage 7 validation plan proposal / Stage 8 PASS verdict.
