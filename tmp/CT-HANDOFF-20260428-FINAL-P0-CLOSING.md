# CT Handoff — 2026-04-28 Final P0 Closing + Deep QA Automation

**세션 종료일**: 2026-04-28
**origin/main HEAD (세션 종료 시점)**: `e1b5d67 chore(scripts): add simulator batch launcher`
**Final P0 closing tag**: `baseline-pre-policy-v3` → `a7aaec3` (origin push 완료)

본 문서는 본 CT 세션의 공식 인계 자료입니다. 운영 메모리에는 별도 [`session_handoff_20260428_final_p0_closing.md`](../../C:/Users/user/.claude/projects/d--ProjectWS/memory/session_handoff_20260428_final_p0_closing.md) 자료가 함께 저장됩니다.

---

## 1. 세션 본질

### 1.1 Pre-session 상태
- spouse-01 한정 Stage 1 spike (Phase A audit)
- RC4 blocker — `evidence_investigate` Gate spec 충돌 (NPC 자동 발언 X / runtime 의도)
- baseline anchor v1 / v2 보존
- All-Cases sweep 미수행

### 1.2 Post-session 결과
- **All-Cases sweep 14,931 variants → P0 232 closing 완료**
  - Stage 1: P0-evidence-stage-gate 122 → 0 (`de3ad48`)
  - Stage 2: P0-disclosure-gate 87 → 0 (`a7aaec3`)
  - Stage 3: P0-surface-name-gate 23 → 0 (auto-closed by Stage 1 cross-effect)
- **Final tag `baseline-pre-policy-v3` 발행** — 단일 commit `a7aaec3`에 두 tag 동시 (`-stage2` + final)
- **Deep QA 자동화 완성**: `qa:fast` / `qa:deep` / `qa:visual` / `simulator.bat`
- **출시 표준 명령**: `simulator.bat`

---

## 2. main commit timeline (본 세션)

| commit | 의미 | tag |
|---|---|---|
| `3973ac6` | v2 통합 의뢰서 (3 stage 분할 / RC4 별도 / GPT Pro 경유) | — |
| `10f5aed` | Stage 1 GPT Pro 의뢰서 + dataset (122 / Hybrid C-lite 7 cluster) | — |
| `434fdba` | Phase B Route Simulator 의뢰서 | — |
| `7eaad2e` | Stage 1 application 의뢰서 + JSON (option-2-policy-a / 4건 보정) | — |
| `de3ad48` | Stage 1 closing (P0-evidence-stage-gate 122 → 0) | `baseline-pre-policy-v3-stage1` |
| `6d18c63` | Phase B Route Simulator merge (B-1~B-5 squash / 옵션 (ii) Gate spec 확정) | — |
| `2c062dd` | Stage 2 application 의뢰서 + JSON (87건 / 4건 CT 보정 / Stage 1 cross-effect로 11 auto-closed) | — |
| `adfad65` | Full Fast Test Finalization — `qa:fast` 통합 runner | — |
| **`a7aaec3`** | **Stage 2 closing (P0-disclosure-gate 87 → 0)** | **`baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3` (final)** |
| `1ff8da4` | Deep QA + browser automation (`qa:route:exhaustive` / `qa:browser` / `qa:deep`) | — |
| `745ce89` | QA Visual Replay Report (`qa:visual`) | — |
| `e1b5d67` | `simulator.bat` batch launcher | — |

---

## 3. 핵심 의사결정 (재사용 가치)

### 3.1 v2 통합 의뢰서 — 3 stage 분할
- (a-2) 3 묶음별 분할 commit (회귀 추적 / rollback 단위)
- (c-2) RC4 별도 의뢰서로 분리 (v2 안에 통합 X)
- (d-2) Patch 본문 = GPT Pro 경유 / Codex-Dev 대량 창작 X

### 3.2 Hybrid C-lite cluster 패턴 (P1/P2 트랙 재사용)
- `matchedLexemes` + `caseId` 기준 / 4-5 high-freq + 3 tail-by-case
- Stage 1: 7 cluster / 122 items
- Stage 2: 8 cluster / 87 items (Stage 1 cross-effect로 11 auto-closed)
- Stage 3: 3 cluster / 23 items (auto-closed)

### 3.3 Option-2-Policy-A (CT 보정 정책)
- 옵션 2 = Claude spot 보정 후 적용 (전수 보정 X / 4-건 영역)
- 정책 (a) = **인물명 보존** (`형`, `다은이`, `다은이 아버지`, `정후`, `태성`, `이준호 씨`, `박지연 씨`, `윤정후 씨`, `최수민 씨` 등) — `matchedLexemes` 영역이 아니면 그대로
- judge hard 톤 / 화자 stance / 단언 강도 보존
- Stage 1 보정 4건: `QARG-01334` / `00589` / `01333` / `01287`
- Stage 2 보정 4건: `QARG-00919` / `01208` / `01209` / `00589`

### 3.4 Phase B Route Simulator (옵션 (ii) Gate spec)
- `evidence_investigate` = system-only 정보 획득 action 유지
- NPC 자동 발언 X / 후속 NPC 발화는 명시적 `judge_question`만
- `RESPONSE_REQUIRED_ACTIONS`에서 `evidence_investigate` 제외
- 신규 detector `evidence_investigate_no_npc_followup` (P1 informational / 9건)
- Phase A QARG-0003 / B-1 QARS-0001 dead finding 처리
- 옵션 (i)/(iii) = Phase B-6 별도 의뢰서 (현재 진입 X)

### 3.5 B-safe wip backup 정책
- 큰 트랙 (Phase B) 작업물 손실 방지
- `wip/phase-b-route-simulator-20260427` / `c230b2e` (wip backup)
- B-3 closing 후 main에 squash merge (`6d18c63`) — 단일 commit
- wip은 사용자 명시 보류 (final closing 후 cleanup 가능)

### 3.6 Final tag 단일 commit 동시 발행 (α)
- Stage 2 closing이 곧 final P0 closing
- Stage 3 = Stage 1 cross-effect로 auto-closed → 별도 patch X / verification만
- 단일 commit `a7aaec3`에 두 tag 동시: `-stage2` + final

### 3.7 Deep QA 자동화 영역 (CT 의뢰서 superset)
- CT 작성 `tmp/REQUEST-Codex-Full-Fast-Test-Finalization.md` 초안 → Codex-Dev 자율 확장 4 commit
- 정책 조정: route semantic focus heuristic = P1 `qa_focus_review` (false positive 회피)
- 출시 표준: `simulator.bat` (qa:deep + qa:visual + auto open)

### 3.8 운영: detached worktree 임시 commit 패턴
- 사용자가 main worktree (`D:\ProjectWS-stage1`) 사용 중일 때 본 세션 wip worktree에서 main commit 진입 불가
- `git worktree add --detach <path> origin/main` → cp + commit + `git push origin HEAD:main` → `git worktree remove`
- 사용 사례: `2c062dd` Stage 2 bundle commit / 본 handoff commit

---

## 4. QA 자동화 명령 누적

| 명령 | 목적 | 출력 위치 |
|---|---|---|
| `npm run qa:fast` | static gate + manifest route + release-readiness | `tmp/qa-fast-results/` |
| `npm run qa:route:exhaustive` | bounded exhaustive (1440/3642/965/P0=0) | `tmp/qa-route-exhaustive-results/` |
| `npm run qa:browser` | Playwright actual play harness | `tmp/qa-browser-results/` |
| `npm run qa:deep` | fast + exhaustive + browser → DEEP READY | `tmp/qa-deep-results/` |
| `npm run qa:visual` | HTML 리포트 (route/coverage/browser tabs) | `tmp/qa-visual-report/index.html` |
| **`simulator.bat`** | **qa:deep + qa:visual + auto open** | (위 모두) |
| `simulator.bat --visual-only` | 기존 결과 기반 HTML 재생성 | `tmp/qa-visual-report/` |
| `simulator.bat --no-open` | HTML auto open 생략 (CI 영역) | (위 모두) |

---

## 5. 후속 트랙 (사용자 결정 대기)

### (α) 출시 운영 문서 — `docs/release-runbook.md` (권장 우선)
- simulator.bat 기준 표준 절차
- 7 섹션 구조 (진입 조건 / 표준 실행 / HTML 리포트 검토 / 빌드+배포 / fail 대응 / 정기 운영 / 후속 트랙)

### (β) `6643035` superseded 표시 commit
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` → superseded by `3973ac6`+`7eaad2e`+`2c062dd`
- 작은 정리 commit / final closing trace

### (γ) wip branch cleanup
- `wip/phase-b-route-simulator-20260427` (`c230b2e`) — Phase B는 main에 squash 완료 (`6d18c63`)
- 사용자 명시 보류였으나 final closing 후 정리 가능
- `git push origin --delete wip/phase-b-route-simulator-20260427` + `git branch -d ...`

### (δ) P1 트랙 (의뢰서 작성)
- P1-script-focus-review (`qa_mismatch_candidate` 822) — intent classifier / disputeId 매핑
- P1-script-metadata-review (36)
- P1-surface-copy-hygiene (`internal_label_or_term_exposed` 128)
- P1-evidence-stage-review (62)
- 신규 P1 `qa_focus_review` (`1ff8da4` 정책 조정 영역)
- `evidence_investigate_no_npc_followup` (9 / 옵션 (ii) informational / 후속 X 가능)

### (ε) P2 트랙
- P2-fallback-polish (82)
- P2-korean-polish (540 / 자동 정정 후보)

### (ζ) RC4 진입 결정
- 현재 옵션 (ii) closing (P1 informational reclassify)
- 옵션 (i)/(iii) = data/runtime 변경 / 별도 의뢰서 + 사용자 승인

---

## 6. 산출물 위치

### Commit된 자료 (main / origin)
- 의뢰서: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` / `tmp/REQUEST-GPT-Pro-Stage1-*` / `tmp/REQUEST-Codex-Fast-Tester-Phase-B-*` / `tmp/REQUEST-Codex-Stage{1,2}-Application-*`
- Application logs: `tmp/qa-codex-integrated-script-patch-v2-results/stage{1,2}-application-log.md`
- Patch outputs: `tmp/qa-codex-integrated-script-patch-v2-results/stage{1,2}-patch-output.json`
- Runners: `scripts/qa-runtime-gate.cjs` / `scripts/qa-route-simulator.cjs` / `scripts/qa-browser-harness.cjs` / `scripts/qa-deep.cjs` / `scripts/qa-visual-report.cjs` / `simulator.bat`

### Untracked (본 worktree wip / 보존)
- `tmp/CT-HANDOFF-20260428-FINAL-P0-CLOSING.md` (본 자료)
- `tmp/PASTE-CT-NEXT-START-MESSAGE.md` (다음 CT 진입 PASTE)
- `tmp/scripts/verify-stage-output.cjs` (Stage 1/2/3 재사용 검증 스크립트)
- `tmp/REQUEST-GPT-Pro-Stage2-*` + dataset (Stage 2 GPT Pro 자료)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` (auto-closed 영역 / dead reference)
- `tmp/REQUEST-Codex-Stage3-Final-Verification.md` (verification 절차 / Stage 2 안에서 완료)
- `tmp/REQUEST-Codex-Full-Fast-Test-Finalization.md` (superseded by adfad65~e1b5d67)
- `tmp/GPT-Pro-Stage{1,2}-PACKET/` (업로드 패킷)
- `tmp/PASTE-Codex-*-FIRST-MESSAGE.md` 5종 (Phase B / Stage 1·2 / Phase B-2-3 / 보류 PASTE)
- `tmp/REQUEST-Codex-Runtime-Gate-AllCases-Sweep.md` (보류 의뢰서)
- `tmp/qa-codex-spouse-01-p0-patch-results/` (Phase A audit / RC4 분석)
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` (사용자 보존)
- `tmp/GPT_output/` (GPT Pro 원본)

---

## 7. 다음 CT 세션 진입 조건

### 7.1 진입 조건
```bash
git pull origin main
git log --oneline -1                       # HEAD = e1b5d67 또는 그 이후
git status --short --branch                # tracked clean
git tag --list 'baseline-pre-policy-v3*'   # 3 tag 정합 (-stage1 / -stage2 / final)
simulator.bat --visual-only --no-open      # PASS — DEEP READY 정합 확인
```

### 7.2 진입 PASTE
- `tmp/PASTE-CT-NEXT-START-MESSAGE.md` (untracked / 본 worktree wip 영역 안)
- 또는 사용자가 직접 본 자료 경로 전달

### 7.3 worktree 옵션
- 본 wip worktree (`D:\ProjectWS` / `wip/phase-b-route-simulator-20260427`) — wip cleanup 보류 결정 시 그대로
- 또는 사용자 main worktree (`D:\ProjectWS-stage1`)에서 작업
- 또는 임시 detached worktree (큰 작업 시)

---

**상태**: CT 세션 인계 완료. 다음 CT 세션 진입 준비됨.
