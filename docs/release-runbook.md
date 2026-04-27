# Release Runbook — `simulator.bat` 표준 절차

> 출시 전 품질 게이트 / 빌드 / 배포 / 정기 운영 표준 절차 문서.
> 본 문서가 출시 운영의 단일 진실 (single source of truth) 입니다.

**문서 기준일**: 2026-04-28
**기준 baseline tag**: `baseline-pre-policy-v3` → `a7aaec3` (Final P0 closing)
**출시 표준 명령**: `simulator.bat`

---

## 1. 진입 조건 (Pre-flight)

새 작업 세션 / 출시 게이트 진입 직전에 반드시 확인:

```bash
git pull origin main
git log --oneline -1                       # HEAD = a7aaec3 또는 그 이후
git status --short --branch                # tracked clean (untracked 보존 영역은 OK)
git tag --list 'baseline-pre-policy-v3*'   # 3 tag 정합 (-stage1 / -stage2 / final)
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
```

PASS 기준:
- `tracked clean` 출력 — modified / staged 0건
- baseline tag 3종 모두 존재
- main HEAD가 `a7aaec3` 이상

FAIL 시 즉시 중단 (작업 X) — §5 fail 대응 참조.

### 1.1 worktree 운영 패턴

본 repo는 멀티 worktree 운영. main 동시 사용 충돌 회피 패턴:

| 상황 | 권장 패턴 |
|---|---|
| 단일 작업자 / 단일 worktree | `git pull origin main` → 본 worktree에서 직접 작업 |
| 다른 worktree가 main 사용 중 | `git worktree add --detach <path> origin/main` → 작업 → `git push HEAD:main` → `git worktree remove <path>` |
| wip / 큰 트랙 작업 중 | `wip/<topic>-<date>` branch 보존 → final 단계 main에 squash merge |

---

## 2. 표준 실행 — `simulator.bat`

출시 게이트 표준 명령:

```cmd
simulator.bat
```

내부 동작 (`simulator.bat` 정의 기준):
1. `npm run qa:deep` — fast + exhaustive + browser
2. `npm run qa:visual` — HTML 리포트 생성
3. `tmp/qa-visual-report/index.html` 자동 open

### 2.1 옵션

| 명령 | 용도 |
|---|---|
| `simulator.bat` | 기본 — 전체 deep QA + 리포트 + auto open |
| `simulator.bat --visual-only` | 기존 결과 기반 HTML 재생성 (빠른 재확인) |
| `simulator.bat --no-open` | HTML auto open 생략 (CI / SSH 환경) |
| `simulator.bat --visual-only --no-open` | 기존 결과 기반 + 자동 open 없음 |

### 2.2 npm scripts (개별 실행)

`simulator.bat`이 차단된 환경 또는 부분 재실행:

| 명령 | 목적 | 출력 위치 |
|---|---|---|
| `npm run qa:fast` | static gate + manifest route + release-readiness | `tmp/qa-fast-results/` |
| `npm run qa:route:exhaustive` | bounded exhaustive (1440/3642/965/P0=0) | `tmp/qa-route-exhaustive-results/` |
| `npm run qa:browser` | Playwright actual play harness | `tmp/qa-browser-results/` |
| `npm run qa:deep` | fast + exhaustive + browser → DEEP READY | `tmp/qa-deep-results/` |
| `npm run qa:visual` | HTML 리포트 (route/coverage/browser tabs) | `tmp/qa-visual-report/index.html` |

### 2.3 PASS 기준

`simulator.bat` 또는 `qa:deep` 종료 코드 = 0 + 리포트 내 P0 = 0.

DEEP READY 정합:
- static gate hard = 0
- manifest route P0 = 0
- exhaustive route P0 = 0 (1440 routes / 3642 states / 965 transitions)
- browser harness 모든 케이스 PASS
- baseline tag 정합

---

## 3. HTML 리포트 검토

`tmp/qa-visual-report/index.html`이 권위 출력. 4 탭 구성:

| 탭 | 내용 |
|---|---|
| Routes | 12 (manifest) 또는 1440 (exhaustive) routes — 트레이스, action chain |
| Coverage | state / transition coverage 요약 |
| Findings | P0/P1/P2 detector 결과 (severity별 집계) |
| Browser | Playwright actual play 결과 |

검토 순서:
1. **Findings 탭**: P0 0 확인 — 단 1건이라도 P0 발생 시 출시 차단
2. **Coverage 탭**: state/transition 커버리지 회귀 없음 확인
3. **Browser 탭**: 케이스 3종 (`spouse-01` / `family-01` / `friend-01`) 모두 PASS
4. **Routes 탭**: 의심 영역 spot 점검 (필요 시)

P1 / P2는 출시 차단 X (트랙 영역 — §7 후속 트랙 참조).

---

## 4. 빌드 + 배포 (Vercel)

### 4.1 빌드

```bash
npm install                  # 신규 dependency 변동 시
npm run build:pc             # tsc -b --force + vite build (config: vite.config.pc.ts)
```

산출물: `dist-pc/`

빌드 검증:
- 종료 코드 = 0
- TypeScript 에러 0건 (`npx tsc -b --force`로 별도 확인 가능)
- `dist-pc/index-pc.html` 생성 확인

⚠️ 주의: `npx tsc --noEmit`은 루트 `tsconfig.json`이 `"files": []`라 체크 안 됨. **반드시 `-b --force`** 사용.

### 4.2 배포 (Vercel)

`vercel.json` 설정:
- `buildCommand`: `npm run build:pc`
- `outputDirectory`: `dist-pc`
- `framework`: `vite`
- rewrites: `index-pc.html`로 rewrite (api/assets/sfx/emoji/evidence/favicon/icon/manifest 제외)

배포 트리거:
- main push → Vercel 자동 빌드 / 배포
- 사전 게이트: §1 진입 조건 + §2 simulator.bat PASS + §4.1 빌드 PASS

PR 영역에서 preview 배포 자동 생성됨.

### 4.3 baseline tag 정합

신규 출시 시 baseline tag 갱신 영역은 별도 결정 사항 (현재 baseline = `a7aaec3` / Final P0 closing 기준).
정책 변경 / Tier 강화 시점에 새 baseline tag 발행 (`baseline-pre-policy-v4` 등).

---

## 5. Fail 대응

### 5.1 진입 조건 fail

| 증상 | 원인 | 대응 |
|---|---|---|
| `git pull` reject | wip branch / 다른 worktree 충돌 | §1.1 worktree 패턴 적용 |
| tracked dirty | 누군가 commit 안 한 변경 보존 | 변경 author 확인 → commit 또는 stash 후 진입 |
| baseline tag 없음 | `git fetch --tags` 미수행 | `git fetch origin --tags` |
| HEAD가 `a7aaec3` 이전 | pull 미수행 | `git pull origin main` |

### 5.2 `simulator.bat` fail

| 증상 | 원인 추정 | 대응 |
|---|---|---|
| `[simulator] npm was not found on PATH.` | Node.js 미설치 / PATH 누락 | Node.js 설치 + PATH 등록 후 재시도 |
| `Deep QA failed with exit code N` | qa:deep 단계 fail | `npm run qa:deep` 직접 실행 → 실패 step (`fast` / `routeExhaustive` / `browser`) 식별 → 해당 step 단독 실행으로 디버그 |
| `Visual report generation failed` | `tmp/qa-route-simulator-results/` 등 입력 누락 | `npm run qa:route` 또는 `qa:fast` 선행 후 재시도 |
| P0 발견 (exit 0이지만 리포트 P0>0) | 회귀 발생 | **즉시 출시 차단** + §5.3 회귀 대응 |

### 5.3 P0 회귀 대응

P0 detector 영역 (출시 차단 등급):
- `P0-evidence-stage-gate` — Stage 1 영역
- `P0-disclosure-gate` — Stage 2 영역
- `P0-surface-name-gate` — Stage 3 영역

회귀 시 절차:
1. `git log --oneline -10` — 최근 commit 식별
2. `git bisect` 또는 직전 commit checkout으로 회귀 commit 특정
3. 회귀 commit이 ScriptedText/Atom 텍스트 변경이면 **Codex-Dev 영역** (CT-Main 직접 Edit X — `feedback_baseline_anchor_scripted_text`)
4. baseline tag 재정합 + 의뢰서 작성 + GPT Pro 경유 패치 (`feedback_use_gpt_pro`)

### 5.4 빌드 fail

| 증상 | 대응 |
|---|---|
| TypeScript 에러 | `npx tsc -b --force` 단독 실행 → 해당 파일 수정 |
| Vite 빌드 fail | `npm run build:pc` 출력에서 에러 모듈 식별 |
| dependency 누락 | `npm install` 후 재시도 |

---

## 6. 정기 운영

### 6.1 일상 사이클

| 시점 | 명령 | 목적 |
|---|---|---|
| 작업 시작 | §1 진입 조건 검사 | tracked clean / baseline 정합 |
| 큰 변경 commit 전 | `simulator.bat --no-open` | 회귀 사전 검증 |
| 출시 직전 | `simulator.bat` (full) | 최종 게이트 |
| 출시 후 | `npm run build:pc` | 빌드 산출물 검증 |

### 6.2 임시 검증 (빠른 spot check)

기존 결과 기반 HTML 재생성:

```cmd
simulator.bat --visual-only --no-open
```

리포트만 다시 보고 싶을 때 / 공유용 HTML 갱신 시 사용. qa:deep 재실행 X — 빠름.

### 6.3 baseline tag 운영

| 명령 | 목적 |
|---|---|
| `git tag --list 'baseline-pre-policy-v3*'` | 정합 확인 |
| `git tag baseline-pre-policy-v4 <SHA>` | 신규 baseline 발행 (정책 강화 시점) |
| `git push origin baseline-pre-policy-v4` | origin push (필수) |

baseline tag = wrapper 검증 영역의 implicit baseline. ScriptedText 수정 시 새 HEAD가 자동 baseline이 되므로 wrapper PASS — `feedback_wrapper_baseline_is_head`.

### 6.4 worktree 정리

작업 완료한 worktree:

```bash
git worktree list                          # 현황 확인
git worktree remove <path>                 # 정리
git worktree prune                         # stale 항목 정리
```

장기 보존 wip worktree:
- final closing 후 squash merge 완료된 wip은 정리 가능
- branch 삭제 전 `git log main..<branch>` + `git diff --stat main...<branch>`로 고유 변경 0 확인 (강제 삭제 금지)

---

## 7. 후속 트랙

P0 closing 완료 (baseline `a7aaec3`) 이후 진행 가능 트랙. 각 트랙은 별도 의뢰서 + 사용자 승인 영역.

### 7.1 P1 트랙 (의뢰서 작성 후 실행)

| 트랙 | 영역 |
|---|---|
| P1-script-focus-review | `qa_mismatch_candidate` 822 — intent classifier / disputeId 매핑 |
| P1-script-metadata-review | 36 |
| P1-surface-copy-hygiene | `internal_label_or_term_exposed` 128 |
| P1-evidence-stage-review | 62 |
| 신규 P1 `qa_focus_review` | route 정책 조정 영역 |
| `evidence_investigate_no_npc_followup` | 9 / 옵션 (ii) informational |

### 7.2 P2 트랙

| 트랙 | 영역 |
|---|---|
| P2-fallback-polish | 82 |
| P2-korean-polish | 540 / 자동 정정 후보 |

### 7.3 RC4 진입 결정

- 옵션 (i) NPC follow-up data + dispatch read
- 옵션 (iii) `investigationStages[].scriptedNpcResponses` wire
- 별도 의뢰서 + 사용자 승인 영역

### 7.4 운영 정책 권장 (재사용)

- **Hybrid C-lite cluster**: `matchedLexemes` + `caseId` / 4-5 high-freq + 3 tail-by-case (P1/P2 dataset)
- **Option-2-Policy-A**: spot 보정 + 인물명 보존 (matchedLexemes 영역 외 보존)
- **단일 commit 두 tag**: Stage N closing이 final이 되는 영역
- **B-safe wip backup**: 큰 트랙 작업 중간 손실 방지 / final 단계 squash merge
- **Detached worktree commit**: 사용자 main worktree 사용 중 임시 commit 패턴

---

## 부록 — 문서 갱신 정책

본 문서는 출시 운영의 single source of truth. 다음 시점에 갱신:

- 신규 baseline tag 발행 시 → §1 / §6.3 갱신
- 신규 QA 명령 추가 시 → §2.2 / §3 표 갱신
- fail 패턴 신규 발견 시 → §5 갱신
- 후속 트랙 진행 / 닫힘 시 → §7 갱신

갱신은 **PR 경유** — 출시 운영 영역 변경은 review 대상.
