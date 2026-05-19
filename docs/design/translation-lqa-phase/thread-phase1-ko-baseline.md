---
name: thread-phase1-ko-baseline
description: LQA Phase 1 — KO baseline 정독 + 사인오프. Phase 2 (Codex β1~β10 외국어 LQA) spawn 게이트.
metadata:
  origin: claude (CT main thread)
  anchor: 058ad3d5
  parent_plan: docs/design/translation-lqa-phase/execution-plan-v2.md §3
  signoff_target: docs/design/translation-lqa-phase/ko-baseline-signoff.md
  expected_duration_days: 3-5
---

# LQA Phase 1 — KO Baseline 정독 의뢰서 (ClaudeCode 별도 스레드)

Anchor commit: `058ad3d5`
가이드: [execution-plan-v2.md §3](./execution-plan-v2.md)
사인오프 대상: `docs/design/translation-lqa-phase/ko-baseline-signoff.md`
Phase 2 spawn 게이트: 본 의뢰서 완료 + 사용자 사인오프

---

## 0. 작업 환경

### 0.1. 별도 worktree 사용 (필수)

메인 worktree `D:\ProjectWS`와 분리된 worktree에서 작업. 메인 세션은 PC QA / 디자인 / 다른 thread와 병행 가능해야 함.

```bash
git fetch
git worktree add D:/solomon-lqa-phase1 -b claude/lqa-phase1-ko-baseline 058ad3d5
cd D:/solomon-lqa-phase1
```

### 0.2. 진입 조건

- working tree clean (`git status --short` 빈 출력 또는 의도된 untracked만)
- HEAD = `058ad3d5` (또는 후행)
- `docs/design/translation-lqa-phase/reports/` 비어있음

### 0.3. 메모리 컨텍스트 (필수 정독)

본 thread는 사용자 메모리 시스템 접근 가능. 작업 시작 전 다음 메모리 정독:

- `feedback_natural_korean_vs_translationese` — 자연 한국어 vs 번역체 정책
- `feedback_truth_leak_prohibition` — 진실 누설 금지 (게임 핵심 원칙)
- `feedback_revision_meaning_over_form` — 9차원 의미 정확성 보정 기준
- `feedback_judge_question_quality` — 재판관 질문 품질 기준
- `feedback_tutorial_copy_tone` — 튜토리얼 카피 톤 (Flicky)
- `design_judge_progression_v2` — 재판관 성향 v2 (재료 강화)
- `project_active_cases` — 활성 케이스 3건 한정

---

## 1. 작업 범위 (execution-plan-v2 §3.2 기준)

### 1.1. 검수 대상 + 표본

| 영역 | 파일 | 표본 |
|---|---|---|
| KO judge_question 채널 | `src/data/scriptedAngles/spouse-01_judge_questions.json` / `family-01_*` / `friend-01_*` | **100% 전수** |
| KO aftermath/mediation 채널 | `src/data/scriptedText/{spouse,family,friend}-01.json` aftermath/mediation 영역 | **100% 전수** |
| KO witness/dossier 채널 | 동상 (witness/dossier 영역) | **무작위 20%** + 의심 spot |
| KO case 메타 | `src/data/cases/generated/{spouse,family,friend}-01.json` | **전수** (양 적음) |
| KO scriptedAngles catalog | `src/data/scriptedAngles/{spouse,family,friend}-01_angle_catalog.json` (또는 `*_angle_catalog.json`) | **전수** |

### 1.2. 검수 차원 (각 행에서 5차원 평가)

| 차원 | 기준 | 합격 |
|---|---|---|
| **자연 한국어** | `feedback_natural_korean_vs_translationese` 정책 — 번역체/신문체 회피. 무형명사 능동동사 패턴(`이유가 거칠게 쏟아진다`) 회피. 한국어 자연 발화 우선. | 위배 0건 |
| **진실 누설** | `feedback_truth_leak_prohibition` — surface 키워드만 사용. judge/system/dossier 채널에서 NPC 자백 전 진실 콘텐츠 직접 언급 금지. evidence surfaceName만 노출. | 위배 0건 |
| **9차원 의미 정확성** | `feedback_revision_meaning_over_form` — lieState × archetype × tone × emotion × 추궁 차원(정보/동기/책임). 단순 어휘 교체 X. | 위배 ≤ 5%, P0 0건 |
| **재판관 톤 일관** | 합쇼체 + 정중 추궁 + 단정 회피. `feedback_judge_question_quality` — 기계적 관찰문 X, 간접 인용, 자연어 질문. | 위배 0건 |
| **캐릭터 발화 톤** | NPC archetype에 일치. 화자별 발화 분기 자연. lieState stage 정합. | 위배 ≤ 5%, P0 0건 |

### 1.3. 실패 처리

한 카테고리(영역×케이스) 안에서 **P0 ≥ 10건 또는 위배율 ≥ 10%**면 해당 영역을 GPT Pro 재의뢰 (배치 단위 한국어 재생성). 즉시 메인 세션에 알림 + thread 중단 X (계속 진행하면서 알림).

---

## 2. 진행 방법

### 2.1. 카테고리별 batch 순회

- spouse-01 → family-01 → friend-01 순서 (활성 우선순위)
- 각 케이스 내: judge_question → aftermath/mediation → case 메타 → angle catalog → witness/dossier (20% 표본)

### 2.2. Issue 출력 CSV 스키마

각 case 검수 후 CSV 출력 (메인 세션이 P0/P1 검토용):

```
row_id              | file_path                                      | json_path                | source_ko             | severity | issue_dimension          | issue_summary            | recommended_fix
spouse-01-q42       | src/data/scriptedAngles/spouse-01_judge_q.json | $.variants[42].text      | "이준호 씨, …"        | P0       | truth_leak               | 형 직접 언급             | "그 자금 출처 …"
spouse-01-after-12  | src/data/scriptedText/spouse-01.json           | $.aftermath[12].text     | "감정이 무너지면서…"  | P1       | natural_korean           | 무형명사 능동동사 패턴   | "감정이 격해지며 …"
```

파일 경로: `docs/design/translation-lqa-phase/phase1-issues-{case}.csv`

### 2.3. 정정 적용

- **P0** (진실 누설 / 의미 뒤바뀜 / 재판관 톤 위배): 즉시 메인 세션 알림 + 사용자 confirm 후 직접 fix commit
- **P1** (자연성 심각 / 톤 어긋남): 사용자 confirm 후 batch 단위 fix commit
- **P2** (미세 어휘 / 표기 분기): CSV로 누적 → 사용자 종합 검토 후 batch commit

### 2.4. 메인 세션 알림 방법

- P0 발견 즉시: 사용자에게 알림 (Phase 1 thread 진행 중단 X)
- 카테고리 1개 완료마다: CSV 인계 + 합격/불합격 판정 보고
- 마지막: 전체 사인오프 권고 (또는 GPT Pro 재의뢰 권고)

---

## 3. 산출물

### 3.1. Issue CSV (case별 3개)

- `docs/design/translation-lqa-phase/phase1-issues-spouse-01.csv`
- `docs/design/translation-lqa-phase/phase1-issues-family-01.csv`
- `docs/design/translation-lqa-phase/phase1-issues-friend-01.csv`

### 3.2. 사인오프 문서

`docs/design/translation-lqa-phase/ko-baseline-signoff.md`. 형식:

```markdown
# LQA Phase 1 KO Baseline Sign-off

Anchor: <commit SHA at signoff>
Reviewer: <claude-thread-id> + <user signature>
Date: <YYYY-MM-DD>

## 검수 통계 per case

| case | judge_q | aftermath/mediation | witness/dossier 20% | case meta | angle catalog |
|---|---|---|---|---|---|
| spouse-01 | rows=N, P0=0, P1=x, P2=y | rows=N, P0=0, P1=x, P2=y | sample=N, P0=0, P1=x, P2=y | … | … |
| family-01 | … | … | … | … | … |
| friend-01 | … | … | … | … | … |

## 합격/불합격 판정

자연 한국어 / 진실 누설 / 9차원 의미 / 재판관 톤 / 캐릭터 톤 5차원 모두 합격 기준 통과.
사용자 사인오프 = Phase 2 spawn 게이트 통과.

## 사용자 서명

User: <user signature commit>
```

### 3.3. P0/P1 fix commit (검수 중 즉시 적용)

별도 worktree에서 commit. 메인에는 사용자 cherry-pick으로 진행.

---

## 4. 검증 (작업 종료 시)

```bash
npx tsc -b --noEmit                        # 타입 검증
npm run qa:fast                            # P0=0 유지
node scripts/detect-truth-leak.cjs         # baseline 유지 (family-01 3건)
npm run qa:lqa                             # KO 영역 회귀 없는지 (KO polish가 V01/V06 등에 영향 가능)
```

산출 worktree clean 확인. 사용자 cherry-pick / merge로 main 반영.

---

## 5. 사인오프 후 다음 단계 (Phase 2 spawn 안내)

Phase 1 완료 시 메인 세션이 진행:

1. `ko-baseline-signoff.md` commit 확인
2. `docs/design/translation-lqa-phase/orchestration.md` §2.1 사전 체크 (5개 항목)
3. 통과 → Codex β1~β10 10 thread 동시 spawn (사용자 운영)
4. 각 thread 입력 = `docs/design/translation-lqa-phase/threads/thread-beta{N}-*.md` 의뢰서 본문

---

## 6. 안전 규칙

- ✅ READ from `src/` (검수 대상)
- ✅ WRITE to 자기 disjoint 경로 (`docs/design/translation-lqa-phase/phase1-issues-*.csv` + `ko-baseline-signoff.md`)
- ✅ WRITE to `src/` (KO polish 정정 commit 시) — 단 P0/P1 사용자 confirm 후만
- ❌ origin/main push
- ❌ glossary 수정
- ❌ scripted text 외국어 영역 수정 (Phase 2 영역)

---

## 7. 메인 세션 인계 사항

본 thread spawn 후 메인 세션이 보장:

- 메인 worktree는 PC QA / 다른 작업 진행 가능 (working tree 분리됨)
- Phase 1 thread CSV / fix commit은 cherry-pick으로 main 반영
- Phase 2 spawn은 Phase 1 사인오프 commit 확인 후 사용자 운영
