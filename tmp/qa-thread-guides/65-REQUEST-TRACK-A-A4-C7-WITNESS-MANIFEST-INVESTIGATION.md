# 65-REQUEST-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION

Codex-Dev (or Codex-QA) request packet for **Track A A4 C7 witness manifest scope/order investigation (Phase 1 only / read-only / no apply / no commit / no GPT Pro / no QA simulator run)**.

본 packet 영역 round-20260429 4-worker bulk QA + ClaudeCode cross-check PASS (`56-...md`) + 60 result PASS + 64 post-C6 confirmation PASS (b809ccc baseline) 영역 후속 **Track A A4 C7 (manifest 영역) item** 영역 영역. 목적 = active 3건 (spouse-01 / family-01 / friend-01) 영역 **witness id / scope / order 영역 정합성 영역 영역 + manifest / case data / claim policy / scriptedText / runtime 영역 영역 source-of-truth 영역 영역 + QA 영역 영역 영역 영역 영역 witness 영역 finding 영역 영역 영역 영역 + Phase 2 (manifest-data relink / source-scope decision / content needed) 영역 결정 영역 routing**.

본 라운드 영역 **investigation only (Phase 1)**. 수정 영역 영역 영역 영역 사용자 결정 영역 별도 packet (Phase 2 apply / manifest relink / source scope / 새 content / GPT Pro routing 영역).

## Decision Input Values (사용자 명시 / frozen for this packet)

- **Worktree**: `D:/ProjectWS` (carry-over).
- **Baseline**: `b809ccc docs(qa-guide): record fresh-run-to-final correction in bulk QA guide stack` (= origin/main / push 완료).
- **Scope**: active 3건 (spouse-01 / family-01 / friend-01) 영역 witness 영역 영역 영역.
- **No code-data change**: 사용자 명시 / 본 packet 영역 영역 영역 영역 변경 영역 영역 X.
- **No GPT Pro / no new content / no QA simulator run**: 사용자 명시.
- **No apply / no manifest relink in this packet**: 사용자 명시 / Phase 2 별도 라운드.

## Scope

- requester: ClaudeCode CT-Main (no code authority on this packet)
- recipient: Codex-Dev (or Codex-QA) — single entry / 동시 병렬 entry X
- baseline commit: **`b809ccc docs(qa-guide): record fresh-run-to-final correction in bulk QA guide stack`** (= origin/main / fast-forward `a386a8a` → `b809ccc` / push 완료)
- baseline worktree: `D:/ProjectWS`
- baseline tags 5 (변동 X):
  - `baseline-pre-policy-v3` → `a7aaec3`
  - `baseline-pre-policy-v3-stage1` → `de3ad48`
  - `baseline-pre-policy-v3-stage2` → `a7aaec3`
  - `baseline-pre-policy-v3-track-a-friend-01` → `8e07b0a`
  - **`baseline-pre-policy-v3-track-a-a3-c6-spouse-fix`** → **`a386a8a`** (annotated / NEW carry-over)
- recent commits already in `b809ccc` history (do NOT touch / do NOT revert):
  - `8e6e302` (37/38) / `794b27b` (43/44) / `a386a8a` (59/60) / **`b809ccc` (5 known-dirty cleanup / NEW)**.

### A. In scope (read-only / Phase 1 investigation)

#### A.1 Witness runtime engine (read-only / 영역 영역 X)

- `src/engine/witnessEngine.ts` — witness 영역 영역 / scope / order 영역 runtime 결정 영역.
- `src/engine/witnessTestimonyResolver.ts` — witness statement / depth (vague / partial / full) 영역 resolver.

본 라운드 영역 read 영역 / **engine source-of-truth verify** 영역 영역. 수정 영역 영역 영역 → 즉시 stop / 66 boundary report.

#### A.2 Manifest / case loader (read-only)

- `src/data/cases/index.ts` — active 3건 import / export entry.
- `src/data/cases/caseLoader.ts` — case data load logic.
- `src/data/cases/refined/manifest.json` — refined manifest (활성 3건 영역 영역 영역).

#### A.3 Active case data (read-only / 3건)

- `src/data/cases/generated/spouse-01.json` (witnesses array / order / scope / id).
- `src/data/cases/generated/family-01.json`.
- `src/data/cases/generated/friend-01.json`.

각 case 영역 `witnesses` array (또는 동등 schema 영역) 영역 영역:
- witness id (식별자).
- witness scope (어떤 phase / route / disputeId 영역 영역 영역).
- witness order (manifest array 영역 index).
- witness statement / depth metadata (vague / partial / full).

#### A.4 Claim policies (read-only / 활성 3건 19 file)

- `src/data/claimPolicies/{spouse-01, family-01, friend-01}-structure-v2.json` (witness lead lines / scene witness reference).
- `src/data/claimPolicies/{case}-game-events.json` / `{case}-game-events-v2.json` (witness trigger events).
- `src/data/claimPolicies/{case}-v2-atoms.json` (witness 영역 NPC atom 영역 영역 영역 영역 영역 영역).
- `src/data/claimPolicies/{case}-v3-game-loop-data.json` / `{case}.ts` (read-only).

#### A.5 ScriptedText (read-only / 영역 영역 X)

- `src/data/scriptedText/{spouse-01, family-01, friend-01}.json` — witness 채널 (`witness_*` 또는 동등 channel name) 영역 영역 영역 영역.

본 라운드 영역 read 영역 / **scriptedText 영역 modification 영역 영역 영역 X** (사용자 명시 / Phase 2 별도 라운드 영역).

#### A.6 Phase 1/2 dialogues (read-only)

- `src/data/dialogues/phase1/{case}.json` — witness 영역 영역 phase1 dialogue 영역 영역 영역 영역.
- `src/data/dialogues/phase2/{case}.json` — phase2 동일.

#### A.7 QA artifact sweep (read-only / round-20260429 + 60 + 64)

- `tmp/qa-bulk-runs/round-20260429/codex-qa-a-normal/{case}/route-transcripts/` (4 routes / 활성 3건).
- `tmp/qa-bulk-runs/round-20260429/codex-qa-b-exhaustive/{case}/route-transcripts/` (480 routes 영역 영역 영역 / 활성 3건).
- `tmp/qa-bulk-runs/round-20260429/claudecode-qa-a-normal/{case}/route-transcripts/` (cross-check / 4-worker).
- `tmp/qa-bulk-runs/round-20260429/claudecode-qa-b-exhaustive/{case}/route-transcripts/` (cross-check).
- `tmp/qa-spouse-01-phase2-manual-fix-retry-normal-20260429T003822Z/` (60 normal).
- `tmp/qa-spouse-01-phase2-manual-fix-retry-exhaustive-20260429T003827Z/` (60 exhaustive).
- `tmp/qa-spouse-01-post-c6-confirmation-normal-20260429T012842Z/` (64 normal).
- `tmp/qa-spouse-01-post-c6-confirmation-exhaustive-20260429T012846Z/` (64 exhaustive).

각 finding 영역 영역 witness 영역 (witness_call / witness_testify / witness_resolution / witness_no_response / etc.) 영역 영역 영역 영역 → A.4/A.5 source 영역 cross-reference.

#### A.8 Witness keyword sweep (read-only)

다음 영역 영역 active 3건 데이터 영역 영역:

- channel name pattern: `witness_*` / `witness-*` / `*-witness-*` / 영역 영역 영역.
- field name pattern: `witnesses` / `witness` / `witnessId` / `witnessOrder` / `witnessScope` / 영역 영역.
- 한국어 키워드: `증인` / `증언` / `목격자` / `참고인` / `진술` (witness statement 영역).
- finding category: `response_missing` (witness 영역 영역 영역 영역) / `safe_fallback_used` (witness 영역 영역 영역 영역) / `system_only_action_no_npc_followup` (witness 영역 영역 영역 영역).

#### A.9 Cross-reference analysis (read-only)

- A.9.1 **Witness ID match**: A.3 case data witness id ↔ A.4 claim policy structure-v2 / game-events 영역 영역 ↔ A.5 scriptedText witness channel id 영역 영역 영역.
- A.9.2 **Witness scope match**: A.3 case data scope (phase / disputeId) ↔ A.4 structure-v2 / game-events 영역 영역 ↔ A.7 QA artifact 영역 영역 영역 영역 (어떤 route / phase 영역 등장).
- A.9.3 **Witness order match**: A.3 case data witnesses array order ↔ A.1 witnessEngine.ts 영역 runtime resolution order ↔ A.7 QA artifact 영역 영역 영역 영역 영역.
- A.9.4 **Manifest registration match**: A.2 manifest / case loader 영역 active 3건 영역 영역 영역 영역 영역 / 누락 / 영역 영역 영역.

### B. Decision routing (66 result doc 영역 영역 영역)

본 라운드 영역 영역 영역 (Stage 6) 영역 영역 5 outputs 중 하나:

#### B.1 `no-fix-needed`
- A.9 cross-reference 영역 영역 영역 정합 / mismatch 영역 영역 영역 / QA 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역.
- → Phase 2 진입 X / close.

#### B.2 `manifest-data-relink-needed`
- A.9 cross-reference 영역 영역 영역 mismatch 영역 영역 (witness id / scope / order 불일치) 영역 영역 → manifest / case data / claim policy 영역 mechanical relink (rename / reorder / scope clarify) 영역 영역 영역.
- 영역 영역 영역 새 content X / GPT Pro X / scriptedText 변경 X.
- → Phase 2 manual fix packet (CT-Main / Codex-Dev / no GPT Pro).

#### B.3 `source-scope-decision-needed`
- A.9 cross-reference 영역 영역 영역 mismatch 영역 영역 / source-of-truth 영역 영역 결정 영역 영역 영역 영역 (어떤 영역 영역 ground truth 영역 영역 영역) → 사용자 결정 영역 / Phase 2 영역 영역 영역 영역.
- 영역 예: case data witness id `w-1` ↔ claim policy structure-v2 witness id `witness-001` ↔ scriptedText channel id `wc-001` 영역 영역 영역 영역 영역 영역 영역 영역 (어느 영역 source-of-truth 영역 영역 영역 영역).
- → Phase 2 진입 영역 영역 사용자 결정 영역 (canonical source 결정 영역).

#### B.4 `content-needed-gpt-pro-decision-pending`
- A.9 cross-reference 영역 영역 영역 mismatch 영역 영역 / 영역 영역 영역 영역 영역 영역 영역 새 witness 영역 영역 / 새 statement 영역 영역 / 영역 영역 영역 영역 영역 영역 → GPT Pro 영역 영역 영역 영역 사용자 결정 영역.
- → Phase 2 영역 영역 사용자 결정 영역 (GPT Pro 호출 / Claude Korean review / dedicated apply packet 영역).

#### B.5 `defer/carry-forward`
- A.9 cross-reference 영역 영역 영역 영역 영역 영역 영역 영역 / risk level 영역 영역 영역 / 다른 영역 영역 영역 우선순위 영역 영역.
- → 별도 라운드 / 사용자 결정 영역 / 본 packet 영역 영역 carry-forward note만.

### C. Validation plan proposal (Phase 2 영역 영역 영역 영역)

본 packet 영역 = Phase 1 only / 영역 영역 X. 영역 Phase 2 fix 영역 영역 영역 영역 사용자 결정 영역 영역 영역 영역 영역 다음 Validation plan 영역 영역:

- C.1 **Static checks** (pre + post):
  - `node --check scripts/qa-route-simulator.cjs`
  - `npx tsc -b --force`
  - `npm run build:pc`
  - 모두 PASS 영역 영역.
- C.2 **Targeted simulator QA** (영역 영역 영역 영역 case(s)):
  - normal mode mandatory: dedicated result root `tmp/qa-{case}-a4-c7-witness-fix-normal-{UTC-timestamp}/`.
  - exhaustive mode mandatory: dedicated result root `tmp/qa-{case}-a4-c7-witness-fix-exhaustive-{UTC-timestamp}/`.
  - default `tmp/qa-route-simulator-results/` 사용 X.
- C.3 **Witness keyword/id/order sweep** (pre vs post):
  - witness id occurrence count vs Phase 1 baseline.
  - witness order array integrity (manifest order ↔ runtime resolution).
  - finding category 영역 영역 (response_missing 영역 영역 영역 영역 영역 영역).
- C.4 **Strict stop counters** (post):
  - hard 0 / active `response_missing` 0 / `qa_focus_review` 0 / 새 P0/P1 0 (round-20260428 baseline allow-list 영역 영역 영역).
- C.5 **Diff scope verification**:
  - manifest / case data / claim policy 영역 변경 영역 영역 / scriptedText / runtime / engine 변경 X.
  - friend-01 / family-01 / spouse-01 영역 영역 영역 영역 변경 영역 영역.

### Out of scope (**사용자 명시**)

- **Phase 2 apply / manifest relink / source scope decision / 새 content 작성 X** — 본 packet 영역 영역 영역 영역 영역 X / 발견 영역 별도 packet 영역.
- **`src/engine/witnessEngine.ts` / `witnessTestimonyResolver.ts` 영역 변경 X** (사용자 명시 / runtime/simulator/hook/store/component 변경 X).
- **`src/data/cases/index.ts` / `caseLoader.ts` 변경 X**.
- **manifest / case data / claim policy / scriptedText / dialogues 변경 X** (Phase 1 read-only / 변경 영역 → 즉시 stop + boundary report).
- **새 dialogue / narrative content 작성 X** (사용자 명시 / 작성 영역 영역 영역 → 즉시 stop + boundary report).
- **GPT Pro 호출 X** (사용자 명시 / 호출 영역 영역 → 즉시 stop + boundary report).
- **assembler / regeneration 실행 X**.
- **새 QA simulator run X** (사용자 명시 / round-20260429 + 60 + 64 artifact 영역 영역 영역 영역 영역 영역 / 새 simulator run 영역 → 즉시 stop + boundary report).
- **commit / push / tag X**.
- 5 known-dirty packet docs (15/19/20/21/22) 손대지 X (현재 모두 committed in b809ccc / clean carry-over).
- preserved untracked 손대지 X (특히 `42 / 44 / 46 / 48 / 49 / 50 / 52 / 54 / 55 / 56 / 58 / 60 / 64 result+summary docs / 45 / 47 / 51 / 53 / 57 / 59 / 61 / 63 / 본 65 packets+PASTEs / handoff / 4 worker bulk QA result roots / spouse-01 60+64 result roots` 영역).
- regeneration-policy.md / 04-CT-INSTRUCTIONS.md 본문 변경 X.
- friend-01 §5.1 manual fix 영역 영역 X.
- default `tmp/qa-route-simulator-results/` 사용 X.
- baseline tag 추가 X.

## Why

round-20260429 4-worker bulk QA PASS + 60 + 64 PASS 영역 영역 spouse-01 / family-01 / friend-01 baseline 안정 confirmed (`hard 0` / `qa_focus_review 0` / new P0/P1 0). 단 finding 영역 영역 영역 영역 영역 영역 cluster signature 영역 영역 영역 영역:

- `evidence_investigate_no_npc_followup` (P1 obs) — system-only action / NPC followup 영역 영역.
- `system_only_action_no_npc_followup` (obs) — 영역 영역 영역 영역 영역 영역.
- `safe_fallback_used` (P2) — 영역 영역 영역 영역 영역 fallback 영역 영역 영역.
- `qa_annotation_only_action` (obs) — annotation 영역 영역 영역.

본 finding 영역 영역 영역 **witness 영역 영역 영역 영역 영역 영역 영역 영역 영역 가능성** — 영역 영역:
- witness call action 영역 NPC followup 영역 영역 (`witness_no_response` / `system_only_action_no_npc_followup`).
- witness id 영역 영역 영역 영역 영역 영역 → safe fallback / annotation 영역 영역 영역.
- witness scope 영역 영역 영역 영역 영역 영역 영역 → evidence_investigate_no_npc_followup 영역 영역 영역.

CLAUDE.md 영역 핵심 원칙 영역:
- **witnessEngine** 영역 = 증인 증언 (vague / partial / full depth, 기관 증인 예외).
- **manifest registration** 영역 = active 3건만 (Legacy 81건 영역 영역 영역 영역 / `_LEGACY_84CASES_DO_NOT_REFERENCE/` 영역 영역 영역 영역).

본 sweep 영역 영역 = **A4 C7 (manifest 영역) item 영역 영역 영역 영역 영역 + witness 영역 영역 영역 영역 영역 + Phase 2 영역 영역 영역 결정 영역 영역**. 영역 영역 영역 → Phase 2 영역 사용자 결정 영역 진입.

## Source Documents (read before entry)

1. `tmp/CT-HANDOFF-20260429-B809CCC-CLEANUP.md` (본 milestone source-of-truth / b809ccc cleanup + tag bump 영역)
2. `tmp/qa-thread-guides/64-POST-C6-MINIMAL-CONFIRMATION-RESULT.md` (64 PASS / a386a8a 영역 verified)
3. `tmp/qa-thread-guides/60-TRACK-A-A3-C6-SPOUSE-PHASE2-MANUAL-FIX-RETRY-RESULT.md` (60 PASS / a386a8a 영역 source-of-truth)
4. `tmp/qa-thread-guides/56-ROUND-20260429-CLAUDECODE-CROSS-CHECK-INTEGRATED-SUMMARY.md` (round-20260429 4-worker integrated summary)
5. `tmp/qa-thread-guides/50-ROUND-20260429-BULK-QA-RERUN-INTEGRATED-SUMMARY.md` (Codex 2-worker integrated)
6. `tmp/qa-thread-guides/48-...md` / `49-...md` / `54-...md` / `55-...md` (4 worker results)
7. `tmp/qa-bulk-runs/round-20260429/codex-qa-a-normal/{case}/` (read-only / route-transcripts / findings.json / coverage / 활성 3건)
8. `tmp/qa-bulk-runs/round-20260429/codex-qa-b-exhaustive/{case}/` (read-only / 활성 3건)
9. `tmp/qa-bulk-runs/round-20260429/claudecode-qa-a-normal/{case}/` (read-only / cross-check)
10. `tmp/qa-bulk-runs/round-20260429/claudecode-qa-b-exhaustive/{case}/` (read-only / cross-check)
11. `tmp/qa-spouse-01-phase2-manual-fix-retry-{normal,exhaustive}-20260429T0038*/` (60 result roots / read-only)
12. `tmp/qa-spouse-01-post-c6-confirmation-{normal,exhaustive}-20260429T0128*/` (64 result roots / read-only)
13. `tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md` §Stop Rules (`d217df0`)
14. **CLAUDE.md** §witnessEngine / §데이터 구조 / §주의사항
15. `docs/case-generation/quality-rules.md` (read-only)
16. `docs/case-generation/scripted-text-channels.md` (read-only / 15채널 영역 witness 채널 영역)
17. `docs/case-generation/schemas.md` (read-only / 케이스JSON / 증인 / DossierCards / StructureV2 필드 스키마)
18. **Active engine (read-only / 변경 X)**:
    - `src/engine/witnessEngine.ts`
    - `src/engine/witnessTestimonyResolver.ts`
19. **Active manifest / case loader (read-only / 변경 X)**:
    - `src/data/cases/index.ts`
    - `src/data/cases/caseLoader.ts`
    - `src/data/cases/refined/manifest.json`
20. **Active case data (read-only / 활성 3건)**:
    - `src/data/cases/generated/spouse-01.json`
    - `src/data/cases/generated/family-01.json`
    - `src/data/cases/generated/friend-01.json`
21. **Active claim policies (read-only / 19 file)**:
    - `src/data/claimPolicies/{case}-structure-v2.json`
    - `src/data/claimPolicies/{case}-game-events.json`
    - `src/data/claimPolicies/{case}-game-events-v2.json`
    - `src/data/claimPolicies/{case}-v2-atoms.json`
    - `src/data/claimPolicies/{case}-v3-game-loop-data.json`
    - `src/data/claimPolicies/{case}.ts`
    - `src/data/claimPolicies/disclosurePolicy/{case}.json` (영역 영역 영역 영역 영역)
22. **Active scriptedText (read-only / 변경 X)**:
    - `src/data/scriptedText/spouse-01.json` (a386a8a ship 영역 / 변경 X)
    - `src/data/scriptedText/family-01.json`
    - `src/data/scriptedText/friend-01.json`
23. **Active dialogues (read-only)**:
    - `src/data/dialogues/phase1/{case}.json` / `phase2/{case}.json`
24. (read-only) `tmp/qa-thread-guides/01-THREAD-GUIDE-COMMON.md` / `02-NORMAL-GUIDE.md` / `03-EXHAUSTIVE-GUIDE.md`
25. `scripts/qa-route-simulator.cjs` (read-only / 변경 X)

## Pre-Conditions

### CRITICAL CWD Guard (사용자 명시 / mandatory / 모든 file 영역 작업 이전 / 58/60 §Caveats tooling-path deviation 강화)

본 영역 영역 영역 = 사용자 명시 + 58/60 §Caveats 영역 발견된 apply_patch tool ambient workspace 영역 영역 영역 영역. 진입 시 다음 영역 영역 영역:

1. `Set-Location -LiteralPath D:/ProjectWS` (PowerShell) 또는 `cd D:/ProjectWS` (Bash).
2. `(Get-Location).Path` / `pwd` 영역 영역 cwd verify.
3. cwd 영역 `D:/ProjectWS` 영역 X 영역 → 즉시 stop.
4. cwd 영역 `D:/ProjectWS-dev` / `D:/ProjectWS-stage1` / archived worktree 영역 → 즉시 stop.
5. **모든 read 영역 absolute path 영역 영역** (`D:/ProjectWS/...`).
6. **본 packet 영역 = read-only + 66 result doc 작성만** — file write = 66 result doc only (`D:/ProjectWS/tmp/qa-thread-guides/66-...md` absolute path).
7. cwd guard 완료 영역 명시 (66 result doc §Entry Guard).

### 표준 pre-conditions

- HEAD = **`b809ccc`** (= origin/main / push 완료).
- `git rev-parse origin/main` = `b809ccc`.
- `git log origin/main..HEAD` = empty (완전 동기화).
- 5 baseline tags 모두 정합 (변동 X).
- `git fetch origin` then verify origin/main = `b809ccc`.
- **tracked working tree clean** (no `M` / b809ccc 영역 영역 영역 영역 모두 committed / 5 known-dirty 영역 영역 cleanup 완료).
- **Allowed untracked preserved (do NOT touch / do NOT delete)** — 모든 carry-forward (특히 60 / 64 result + summary docs / 본 65 packet+PASTE / 66 placeholder 영역 / handoff / 4 worker bulk QA result roots / spouse-01 60+64 result roots).
- `tmp/qa-route-simulator-results/` clean.

### Entry-time worktree expected state

```
HEAD: b809ccc (= origin/main)
(no M)
?? <preserved untracked carry-forward>
```

### Final worktree expected state (post-Stage 8)

```
HEAD: b809ccc (= origin/main / 변동 X)
(no M / 본 packet 영역 영역 영역 영역 변경 영역 영역 X)
?? tmp/qa-thread-guides/66-...md              # ← Stage 8 result doc
... <preserved untracked carry-forward>
```

영역 외 새 `M` 영역 등장 → 즉시 stop / 66 boundary report.

## Investigation Stage Map (Phase 1 only / 8 stages)

본 packet 영역 = **단계별 진행 의무 (사용자 명시)**. Stage 1 entry guard 완료 후 **종결 X / 자동 Stage 2 → ... → Stage 8 (result doc 작성) 영역 진행**.

### Stage map

| Stage | 내용 | 영역 |
|---|---|---|
| Stage 1 | Entry guard | CWD / worktree / HEAD = b809ccc / origin/main = b809ccc / 5 baseline tags / tracked clean / preserved untracked |
| Stage 2 | Worker identity guard | worker name / scope = read-only investigation only / result doc / no apply / no QA / no GPT Pro |
| Stage 3 | QA finding extraction | round-20260429 4-worker + 60 + 64 영역 영역 witness 영역 finding extract (channel / category / route / case 영역 영역) |
| Stage 4 | Source-of-truth read | A.1 engine / A.2 manifest / A.3 case data / A.4 claim policy / A.5 scriptedText / A.6 dialogues 영역 영역 영역 read |
| Stage 5 | Cross-reference analysis | A.9.1 ID match / A.9.2 scope match / A.9.3 order match / A.9.4 manifest registration match |
| Stage 6 | Decision routing | B.1 no-fix-needed / B.2 manifest-data-relink-needed / B.3 source-scope-decision-needed / B.4 content-needed-gpt-pro / B.5 defer/carry-forward |
| Stage 7 | Validation plan proposal | C.1 static / C.2 targeted QA / C.3 witness sweep / C.4 strict counters / C.5 diff scope (Phase 2 영역 영역 영역) |
| Stage 8 | Result doc 작성 | `66-...md` |

각 Stage 완료 영역 자동 다음 Stage 진입. strict stop trigger 영역 영역 영역 영역 영역 stage 진행 X.

### Stage 3 영역 영역

- round-20260429 4-worker (codex-qa-{a-normal,b-exhaustive} + claudecode-qa-{a-normal,b-exhaustive}) 영역 영역 활성 3건 영역 영역 finding 영역 witness 관련 영역 영역.
- 60 + 64 result root 영역 영역 spouse-01 영역 영역 finding 영역 witness 관련 영역 영역.
- finding category × witness 영역 영역 영역 (channel / route / phase / depth / id) 영역 영역 영역.
- 영역 영역 영역 → Stage 5 cross-reference 영역 영역 영역.

### Stage 4 영역 영역

- A.1 witness engine read-only verify (no modification).
- A.2 manifest / case loader read-only verify (active 3건 영역 영역 영역 영역).
- A.3 case data witnesses array read-only (id / order / scope).
- A.4 claim policy 영역 witness reference read-only (structure-v2 lead / game-events trigger / v2-atoms NPC reaction).
- A.5 scriptedText witness 채널 read-only (channel name / variant id / 영역 영역).
- A.6 dialogues phase1/phase2 witness 영역 영역 영역 read-only.

### Stage 5 영역 영역

- A.9.1 witness ID match: 모든 source 영역 witness id 영역 정합 영역 영역.
- A.9.2 witness scope match: phase / disputeId / route 영역 영역 영역 영역 영역.
- A.9.3 witness order match: array index / runtime resolution order 영역 영역 영역.
- A.9.4 manifest registration match: active 3건 영역 영역 영역 영역 영역 영역 / 누락.

### Stage 6 영역 영역

- B.1~B.5 영역 영역 영역 영역 영역 영역 영역.
- 영역 영역 영역 → 영역 영역 mismatch 영역 영역 영역 영역 영역 + 영역 영역 영역 + Phase 2 routing 영역 영역.
- mismatch 영역 영역 영역 영역 영역 → B.1 (no-fix-needed) → close.
- mechanical relink 영역 영역 영역 영역 → B.2.
- canonical source 결정 영역 영역 영역 → B.3.
- 새 content 영역 영역 영역 → B.4 (GPT Pro 결정 영역).
- 영역 영역 영역 영역 → B.5 (defer).

### Stage 7 영역 영역

- C.1~C.5 영역 영역 Phase 2 fix 영역 영역 validation plan 영역 영역.
- Stage 6 영역 B.1 영역 영역 영역 → C.1~C.5 영역 영역 영역 영역 (Phase 2 진입 X).
- B.2~B.4 영역 영역 영역 → C.1~C.5 영역 영역 영역 (Phase 2 영역 영역 영역 영역 영역 영역).

### Stage 8 영역 영역

- 66 result doc 작성.
- 다음 §Stage 8 detail 영역 영역.

## Stop Rules (strict)

다음 중 하나라도 발생 시 **즉시 stop / 이후 stage 진행 X / 66 result doc 영역 영역 보고**:

- **CWD guard 영역 위반 / apply_patch tool ambient workspace 영역 영역 영역**.
- **Worker identity 영역 위반**.
- **새 `M` 영역 등장** (본 packet 영역 영역 영역 영역 변경 영역 영역 X / 새 M 발견 영역 → 즉시 stop).
- preserved untracked 영역 손상 / 누락.
- worktree guard 위반 (HEAD ≠ `b809ccc` / branch wip / cwd 잘못된 worktree).
- baseline tags 5 변동.
- file write fail / disk full / encoding error.
- commit / push / tag 시도 → stop/report.
- **code / data / scriptedText / disclosurePolicy / atom / structure / dossier-cards / case-data / simulator code / runner / generator / Phase 1 dialogues / runtime / policy engine / witness engine / manifest / case loader 변경 시도** → stop/report (사용자 명시 / 본 packet 영역 영역 영역 영역 변경 영역 영역 X).
- **새 dialogue / narrative content 의미 작성 시도** → 즉시 stop / 66 boundary report.
- **GPT Pro 호출 시도** → 즉시 stop / 66 boundary report.
- **assemble-family-friend-bundles.cjs regeneration** → stop/report.
- **family-01 / friend-01 / spouse-01 source files 영역 영역 영역 영역** → stop/report.
- **default `tmp/qa-route-simulator-results/` 영역 쓰기** → stop/report.
- **새 QA simulator run 시도** → stop/report (사용자 명시 / round-20260429 + 60 + 64 artifact 영역 영역 영역 영역 영역).
- **regeneration-policy.md / 04-CT-INSTRUCTIONS.md 본문 변경 시도** → stop/report.
- **manifest / case loader / engine 변경 시도** → stop/report (사용자 명시 / runtime/simulator/hook/store/component 변경 X).
- **scriptedText 변경 시도** → stop/report (사용자 명시 / Phase 1 read-only).

## Worktree Retention / Allowed Dirty / Untracked

- Worktree: `D:/ProjectWS` retained.
- Allowed dirty: **없음** (b809ccc 영역 영역 영역 영역 cleanup 완료 / tracked clean).
- **Allowed new M (Stage 영역 영역)**: **없음** (본 packet 영역 = read-only / 영역 영역 영역 영역 변경 X).
- Preserved untracked: 손대지 X.
- 새 untracked 영역 추가 (본 packet 영역):
  - 66 result doc only.
- **새 tracked-modify 영역 추가 X** (본 packet 영역 영역 영역 영역 변경 영역 영역 X).
- baseline tags 5 변동 X.

## Push / Commit / Tag 영역

**본 packet 영역 = Phase 1 investigation only / static + read-only + 66 result doc 작성만 / NO apply / NO commit / NO push / NO tag / NO QA simulator run**.

- 변경 영역 0 tracked file (read-only).
- 66 result doc 영역만 untracked.
- commit / push / tag 영역 사용자 명시 결정 영역 별도 라운드 (Phase 2 영역 영역).

## Decision Values (16 — frozen for this packet)

1. Worktree: `D:/ProjectWS` (carry-over).
2. Baseline: **`b809ccc`** (= origin/main / push 완료 / NEW carry-over).
3. Baseline tag: 변동 X (5 tags 영역).
4. Worktree retention: until next round decision.
5. Bulk QA: 본 packet 영역 X / round-20260429 + 60 + 64 artifact 영역 영역 영역 영역 영역 영역 / 새 QA simulator run X.
6. Codex-QA-B retry: N/A.
7. Claude-QA-B QA-ops S/P2: 35/36 영역 완료.
8. Bulk raw artifact commit: deferred.
9. A2-engine: still deferred.
10. Other §Track A items: A1 C3 closed (4-worker cross-runner verified) / A3 C6 closed (4중 verification + tagged at a386a8a) / **A4 C7 = 본 packet (Phase 1 investigation / 활성 3건 witness manifest)** / A2 C2 / A5 C4 / A6 C8 = 별도 라운드.
11. Source-of-truth verification: MANDATORY (Stage 4 / 5).
12. **GPT Pro routing: 호출 X** (사용자 명시).
13. Push: N/A.
14. Companion entry PASTE: `tmp/qa-thread-guides/PASTE-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-FIRST-MESSAGE.md`.
15. Result doc filename: `66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`.
16. Validation: read-only / 영역 영역 X / no QA Playwright / no qa:fast/qa:deep/qa:visual/qa:browser / no apply / no edit / no commit / no push / no tag / no GPT Pro.

## Status

CT-authored / awaiting Codex-Dev (or Codex-QA) session entry. CT remains in coordination mode. 66 report 도착 시 CT 검토 → 사용자 결정 영역 받음 → recommendation 영역 영역:
- B.1 (no-fix-needed) → handoff 업데이트 + 다음 Track A item 영역 결정 영역.
- B.2 (manifest-data-relink-needed) → Phase 2 manual fix packet (CT-Main / Codex-Dev / no GPT Pro).
- B.3 (source-scope-decision-needed) → 사용자 결정 영역 / canonical source 결정 영역.
- B.4 (content-needed-gpt-pro-decision-pending) → 사용자 결정 영역 (GPT Pro 호출 영역 영역).
- B.5 (defer/carry-forward) → 별도 라운드 / carry-forward note만.
