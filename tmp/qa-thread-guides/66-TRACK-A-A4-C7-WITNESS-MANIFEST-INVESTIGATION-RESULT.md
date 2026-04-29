# 66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT (placeholder skeleton — Codex-Dev 작성 대기)

> 본 doc은 **CT-authored result target placeholder**입니다. 본 PASTE 진입 후 Codex-Dev (또는 Codex-QA) 세션이 §Stage 1~8 진행 결과를 본 doc 영역 직접 작성/덮어씁니다. CT는 본 placeholder 영역 §0 / §1 / §결과 frame 영역 영역 / Stage 별 결과 영역 영역 Codex-Dev 작성.

---

## §0 Result Status

**상태**: ⏳ Pending Codex-Dev (or Codex-QA) session entry (65 packet + PASTE 영역 영역 진입 영역 영역).

**Verdict**: TBD (B.1~B.5 routing decision 중 하나).

**기대 영역**:
- Stage 1~8 모두 PASS.
- Stage 6 decision routing 영역 B.1~B.5 중 하나 결정.
- 영역 영역 → Phase 2 진입 영역 영역 결정 영역 영역 영역.

## §1 Source Documents (read before write)

- 65 packet: `tmp/qa-thread-guides/65-REQUEST-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION.md`
- companion PASTE: `tmp/qa-thread-guides/PASTE-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-FIRST-MESSAGE.md`
- CT handoff (source-of-truth): `tmp/CT-HANDOFF-20260429-B809CCC-CLEANUP.md`
- 64 result PASS (a386a8a verified): `tmp/qa-thread-guides/64-POST-C6-MINIMAL-CONFIRMATION-RESULT.md`
- 60 result PASS (a386a8a source-of-truth): `tmp/qa-thread-guides/60-TRACK-A-A3-C6-SPOUSE-PHASE2-MANUAL-FIX-RETRY-RESULT.md`
- round-20260429 4-worker integrated: `tmp/qa-thread-guides/56-ROUND-20260429-CLAUDECODE-CROSS-CHECK-INTEGRATED-SUMMARY.md`

## §2 Entry Guard (Codex-Dev 작성 영역)

- [ ] CWD Guard: `D:/ProjectWS` canonical main/Live-QA worktree (PowerShell `$pwd_check` + Bash `pwd_check` 결과 명시).
- [ ] file write verification: 본 packet 영역 file write = 66 result doc only (D:/ProjectWS/tmp/qa-thread-guides/66-...md absolute path).
- [ ] Worker identity guard: worker name = Codex-Dev (or Codex-QA) Track A A4 C7 Witness Manifest Investigation / scope = Phase 1 read-only / single worker / no parallel.
- [ ] HEAD = `b809ccc` (= origin/main).
- [ ] origin/main = `b809ccc`.
- [ ] `origin/main..HEAD` = empty.
- [ ] 5 baseline tags 정합 (`a7aaec3` / `de3ad48` / `a7aaec3` / `8e07b0a` / `a386a8a` peeled).
- [ ] tracked working tree clean (no M / 5 known-dirty cleanup 완료).
- [ ] entry-clean targets 모두 clean (engine / manifest / case data / claim policy / scriptedText / dialogues / simulator script).
- [ ] preserved untracked 영역 영역.
- [ ] `tmp/qa-route-simulator-results/` clean.
- [ ] default RESULT_DIR 영역 쓰기 X.

## §3 Investigation (Codex-Dev 작성 영역)

### §Stage 1 — Entry guard
- [ ] (TBD / Codex-Dev 작성)

### §Stage 2 — Worker identity guard
- [ ] (TBD / Codex-Dev 작성)

### §Stage 3 — QA finding extraction

| Source | Case | Channel | Category | Finding count |
|---|---|---|---|---:|
| codex-qa-a-normal | spouse-01 | TBD | TBD | TBD |
| codex-qa-a-normal | family-01 | TBD | TBD | TBD |
| codex-qa-a-normal | friend-01 | TBD | TBD | TBD |
| codex-qa-b-exhaustive | spouse-01 | TBD | TBD | TBD |
| codex-qa-b-exhaustive | family-01 | TBD | TBD | TBD |
| codex-qa-b-exhaustive | friend-01 | TBD | TBD | TBD |
| claudecode-qa-a-normal | spouse-01 | TBD | TBD | TBD |
| ... | ... | ... | ... | ... |
| 60 normal | spouse-01 | TBD | TBD | TBD |
| 60 exhaustive | spouse-01 | TBD | TBD | TBD |
| 64 normal | spouse-01 | TBD | TBD | TBD |
| 64 exhaustive | spouse-01 | TBD | TBD | TBD |

Witness 관련 finding total: TBD.

### §Stage 4 — Source-of-truth read

#### 4.1 Engine read-only verify
- `src/engine/witnessEngine.ts`: TBD (라인 수 / 핵심 function / scope / order resolution logic).
- `src/engine/witnessTestimonyResolver.ts`: TBD (라인 수 / 핵심 function / depth resolution).

#### 4.2 Manifest / case loader read-only verify
- `src/data/cases/index.ts`: TBD.
- `src/data/cases/caseLoader.ts`: TBD.
- `src/data/cases/refined/manifest.json`: TBD.

#### 4.3 Case data read-only (witnesses array)
| Case | Witness count | Witness IDs | Order | Scope metadata |
|---|---:|---|---|---|
| spouse-01 | TBD | TBD | TBD | TBD |
| family-01 | TBD | TBD | TBD | TBD |
| friend-01 | TBD | TBD | TBD | TBD |

#### 4.4 Claim policy read-only
- structure-v2 witness leads: TBD.
- game-events witness triggers: TBD.
- v2-atoms NPC reactions: TBD.

#### 4.5 ScriptedText read-only
- witness 채널 (channel name pattern / variant id / 영역): TBD.

#### 4.6 Dialogues read-only
- phase1/phase2 witness 영역 영역 영역: TBD.

### §Stage 5 — Cross-reference analysis

#### 5.1 Witness ID match (A.9.1)
| Case | Source A | Source B | ID A | ID B | Match? |
|---|---|---|---|---|---|
| spouse-01 | case data | structure-v2 | TBD | TBD | TBD |
| spouse-01 | case data | scriptedText | TBD | TBD | TBD |
| ... | ... | ... | ... | ... | ... |

#### 5.2 Witness scope match (A.9.2)
| Case | Witness ID | Source scope | Runtime scope | Match? |
|---|---|---|---|---|
| spouse-01 | TBD | TBD | TBD | TBD |
| ... | ... | ... | ... | ... |

#### 5.3 Witness order match (A.9.3)
| Case | Manifest order | Runtime order | Match? |
|---|---|---|---|
| spouse-01 | TBD | TBD | TBD |
| ... | ... | ... | ... |

#### 5.4 Manifest registration match (A.9.4)
| Case | In manifest? | In case data? | In claim policy? | Match? |
|---|---|---|---|---|
| spouse-01 | TBD | TBD | TBD | TBD |
| family-01 | TBD | TBD | TBD | TBD |
| friend-01 | TBD | TBD | TBD | TBD |

### §Stage 6 — Decision routing

**Verdict**: TBD (B.1~B.5 중 하나).

- [ ] B.1 `no-fix-needed` — 모든 cross-reference 정합 / mismatch 영역 영역 / QA finding 영역 영역 영역.
- [ ] B.2 `manifest-data-relink-needed` — mechanical relink 영역 영역 / Phase 2 manual fix packet.
- [ ] B.3 `source-scope-decision-needed` — canonical source 결정 영역 사용자 결정 영역.
- [ ] B.4 `content-needed-gpt-pro-decision-pending` — 새 content 영역 영역 / GPT Pro 영역 영역 사용자 결정 영역.
- [ ] B.5 `defer/carry-forward` — 별도 라운드 / 영역 영역 영역 영역 영역.

**근거**: TBD (Stage 5 cross-reference analysis 영역 영역).

**영향 영역 case**: TBD (모두 / 일부 / spouse-01 / family-01 / friend-01).

### §Stage 7 — Validation plan proposal (Phase 2)

#### C.1 Static checks
- [ ] `node --check scripts/qa-route-simulator.cjs`
- [ ] `npx tsc -b --force`
- [ ] `npm run build:pc`

#### C.2 Targeted simulator QA
- [ ] normal mode: `tmp/qa-{case}-a4-c7-witness-fix-normal-{UTC}/`
- [ ] exhaustive mode: `tmp/qa-{case}-a4-c7-witness-fix-exhaustive-{UTC}/`

#### C.3 Witness keyword/id/order sweep
- [ ] witness id occurrence vs Phase 1 baseline
- [ ] witness order array integrity
- [ ] finding category 영역 영역

#### C.4 Strict stop counters
- [ ] hard 0
- [ ] active `response_missing` 0
- [ ] `qa_focus_review` 0
- [ ] 새 P0/P1 0

#### C.5 Diff scope verification
- [ ] manifest / case data / claim policy 변경 영역 영역
- [ ] scriptedText / runtime / engine 변경 X
- [ ] friend-01 / family-01 / spouse-01 영역 영역 영역 영역

### §Stage 8 — Result doc 작성
- [ ] 본 doc (`66-...md`) 작성 완료 + 보고.

## §4 Status

**Final verdict**: TBD (Codex-Dev 작성 영역).

- B.1 (no-fix-needed) → CT 검토 → handoff 업데이트 + 다음 Track A item 결정.
- B.2 (manifest-data-relink-needed) → CT 검토 → Phase 2 manual fix packet 작성 영역 사용자 결정.
- B.3 (source-scope-decision-needed) → CT 검토 → 사용자 결정 영역 (canonical source 결정).
- B.4 (content-needed-gpt-pro-decision-pending) → CT 검토 → 사용자 결정 영역 (GPT Pro routing).
- B.5 (defer/carry-forward) → CT 검토 → 별도 라운드 / 우선순위 영역.

## §5 Boundary Reports (Codex-Dev 작성 영역)

- (TBD — runtime / engine / manifest / source files 변경 시도 / 새 content 시도 / GPT Pro 시도 / 새 QA simulator run 시도 영역 영역 영역).

## §6 Caveats (Codex-Dev 작성 영역)

- (TBD — CWD guard 영역 / Worker identity 영역 / 영역 영역 deviation / 새 발견 영역).

## §7 Result Path

- result doc: 본 doc (`tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`).
- dedicated artifact root: 없음 (Phase 1 read-only / no QA simulator run).

---

## §8 CT 작성 메타 (placeholder origin)

- **본 placeholder 작성 시점**: 2026-04-29 (post b809ccc cleanup + tag bump session / CT-Main).
- **CT 작성 범위**: §0 / §1 / §결과 frame (§3 finding extraction table skeleton + §4 source-of-truth section skeleton + §5 cross-reference table skeleton + §6 decision routing checklist + §7 validation plan checklist).
- **Codex-Dev 작성 범위**: §2 Entry Guard 결과 / §3 finding count / §4 per-source detail / §5 mismatch detection / §6 verdict + 근거 / §7 validation plan finalize / §4 final verdict / §5 Boundary Reports / §6 Caveats.
- **CT는 §0 frame 변경 X / §1 source list 변경 X (Codex-Dev 영역 영역 영역 영역 영역 추가 가능)**.
- **본 placeholder는 Codex-Dev 결과 작성 시 §8 영역 영역 영역 영역 / 또는 §8 carry-over 영역 영역 결정 영역**.
