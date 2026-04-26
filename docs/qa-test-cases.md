# QA Test Cases — Index

**대상**: 활성 3건 (spouse-01, family-01, friend-01)
**Tier**: 2 (정책 보호막 작동 검증 단계 — 30일 안정 운영)
**대응 baseline**: a10b801 (`baseline-pre-policy-v1`)
**HEAD 기준**: `5378700` (병렬 QA 결과 취합은 동일 HEAD에서만 가능. 변경 시 CT-Main이 갱신)

---

## 시작 조건 (모든 QA 세션 공통)

```bash
git status --short --branch    # branch + dirty 여부
git log --oneline -1           # HEAD = 5378700 확인
npm run check:all              # baseline-known 157 warning / hard 0
```

**중단 조건**: HEAD 불일치 / dirty / hard issues > 0 → 작업 중단 + CT-Main 보고
**진행 조건**: HEAD 일치 + clean (untracked OK) + hard 0 / warnings ≈ 157

---

## 두 문서 분리 (병렬 세션 가능)

QA TC는 **검증 방법과 반복 의미가 다른 두 영역**으로 분리. 각 문서 자기완결 — 다른 세션에서 단독 실행 OK.

| 문서 | 영역 | 핵심 검증 | 1000회 plan 의미 |
|---|---|---|---|
| [`qa-functional.md`](qa-functional.md) | 게임 흐름 / 시뮬레이션 / LLM 응답 / 동적 | 헤드리스 플레이스루 / Sim stress / LLM sampling | **있음** (시드 다양화) |
| [`qa-scripted.md`](qa-scripted.md) | 정적 텍스트 / 호칭 / 진실 누설 / 한국어 / UI | 정적 분석 / semantic review / 코드 audit | **부분** (의미 차원 sample만) |

---

## 카테고리 매핑

### qa-functional.md
- **A.** 게임 흐름 (Phase / Action) — TC-A1 ★ NPC 응답 누락 (사용자 명시)
- **E.** Evidence Stage 정합 (게임 메커니즘)
- **H.** 재판관 성향 시스템 (게임 로직)
- **I.** NPC LLM 응답 검증 (동적 영역)
- **J.** 시뮬레이션 Stress (Codex 1000회 plan 영역)

### qa-scripted.md
- **B.** 호칭 / 명칭 — TC-B3 ★ 행동 설명 코멘트 A/B (사용자 명시)
- **C.** Truth Disclosure (Tier 1 정책 보호막)
- **D.** lieState 정합 (Truth Throttle, 정적 데이터)
- **F.** 한국어 품질 (정적 데이터)
- **G.** UI 누설 (P7, 컴포넌트 렌더)

---

## Codex 1000회 plan 우선순위

### qa-functional 영역
| Plan | 영역 | 회수 | 우선 | 상태 |
|---|---|---|---|---|
| **P-1** | TC-A1 헤드리스 다중 시드 (응답 누락 / fallback) | smoke 100 → stress 1000 | ★★★★★ | **BLOCKED** (`tests/run-84-headless.cjs` 부재) |
| **P-2** | TC-I1 LLM 응답 누설 우회 검출 | 500 | ★★★★ | ready |
| **P-3** | TC-J2 회귀 stress (`npm run check:all` 반복) | 1000 (patch마다) | ★★★★ | ready |
| **P-4** | TC-A3 judge question 84종 정적 매트릭스 audit | 84+500 | ★★★ | ready |
| **P-5** | TC-I2 archetype voice 정량 (LLM) | 100×6 | ★★ | ready |
| **P-6** | TC-J3 9 specialist cross-validation | 100~500 | ★★ | ready |

**P-1 BLOCKED**: CLAUDE.md 기재 `tests/run-84-headless.cjs` 현재 repo 부재 (Legacy 격리 시 제거된 듯). harness 신규 작성은 **별도 Codex-Dev 의뢰** 분리. QA 세션 = 검출/보고 전용 (코드 작성 X).

### qa-scripted 영역
| Plan | 영역 | 회수 | 우선 |
|---|---|---|---|
| **S-1** | 동의어 우회 lexeme semantic detection | 500~1000 entries × 9 차원 | ★★★★★ |
| **S-2** | 9 specialist semantic review | random 500 × 9 차원 = 4500 | ★★★★ |
| **S-3** | archetype voice 정량 (정적) | 6 × 100 entries | ★★★ |
| **S-4** | UI 코드 audit (P7) | src/components/* sweep | ★★★ |
| **S-5** | uiSurfaceMap 정합 cross-check | 정적 1회 | ★★ |

---

## 분담 (전체)

| 역할 | qa-functional | qa-scripted |
|---|---|---|
| **Codex 단독** | P-3, P-4, P-5 (P-1은 harness 마련 후) | S-1, S-3, S-4 (읽기/보고만), S-5 |
| **CT 별도 스레드 교차** | P-2, P-6 (LLM/의미) | **S-2 (의미 차원 깊은 review)** |
| **사용자 Manual** | TC-A1·A2·A4·A5 spot check | TC-B·C·D·F·G spot check |
| **별도 Codex-Dev 의뢰** | harness 신규 작성 (P-1 unblock) | S-4 발견 P7 누설 코드 fix (QA 외부) |

**CT-Cross 역할 명시**: P-2 / S-2 의미 차원 교차에 집중. P-1·J 같은 stress 통계는 Codex 담당. CT는 LLM 우회 누설 / lieState 자연성 / 한국어 의미 흐름 / 9차원 의미 정확성 review에 집중.

---

## 합격 기준 (전체 Tier 2 안정 인정)

3가지 동시 충족 시 **Tier 3 진입 검토 가능**:

1. **Auto / Sim wrapper PASS**
   - `npm run check:all` hard 0 + new warnings 사유 명시 (스크립트)
   - 헤드리스 다중 시드 (기능성, harness 마련 후)
2. **Manual spot check P0/P1 발견 0건** (P2 누적 OK)
3. **상대 모델 역리뷰 PASS**
   - 발견된 case 처리 후 Codex/CT 재검증

→ 한 사람 단독 완료 선언 X (잘못 패턴 #1).

**Tier 2 warning 기준**:
- baseline-known warnings (현재 ≈ 157건) = hard fail 아님
- `forbiddenLexemes.surfaceOnly` 기본 WARN (false positive 회피)
- `surfaceName alias` 보호 alias 가능성 = WARN (의도된 추상화)
- 합격 기준 = **new hard issues 0** + **new warnings 사유 설명**

---

## 결과 보고 공통 포맷 (모든 세션)

각 세션 완료 시 `tmp/qa-{functional|scripted|ct-cross}-results/{YYYYMMDD}-{plan}-summary.md`:

```md
# QA Result — Plan {ID}

- **Session**: QA-Codex-Functional / QA-Codex-Scripted / QA-CT-Cross
- **HEAD**: 5378700 (변경 시 명시)
- **Scope**: TC-? / TC-? / ...
- **Commands run**: 시작 조건 명령 + plan 명령
- **PASS / FAIL / BLOCKED**: 카운트
- **P0 findings**: 개수 + variant ID list
- **P1 findings**: 개수 + variant ID list
- **P2 findings**: 개수 + variant ID list
- **Known baseline warnings**: 157
- **New warnings**: 0 (변경 시 사유)
- **New hard issues**: 0 (>0 = 작업 중단)
- **Warning delta explanation**: surfaceOnly / surfaceName alias 영역 명시
- **Repro seed / variant ID / TC ID / channel / lieState**: 발견 case별
- **Suggested next action**: CT-Main 처리 / Codex 의뢰서 / GPT Pro / Manual spot check 보강
- **Files touched**: none (검출/보고 전용)
```

---

## 사용자 명시 우선 점검 영역 ★

1. **TC-A1** (qa-functional.md) — 재판관 멘트 후 NPC 응답 발동 누락
2. **TC-B3** (qa-scripted.md) — 행동 설명 코멘트에서 A/B 호칭 노출
3. **TC-B1·B2·B4·G3** — 모든 호칭 영역 보완 점검

---

## 다음 작업 추천 순서

### 즉시 시작 (병렬 가능)
- **Codex 세션 1 (QA-Codex-Functional)**: Plan **P-3·4·5** (P-1은 harness 부재로 BLOCKED)
- **Codex 세션 2 (QA-Codex-Scripted)**: Plan **S-1** 우선 (동의어 우회 semantic) — 진실 누설 정적 한계 보강
- **CT 별도 스레드 (QA-CT-Cross)**: Plan **S-2** 우선 + **P-2** 병렬 (의미 차원 교차)
- **사용자**: spouse-01 부터 게임 플레이 spot check (TC-A1 / TC-B3 우선)
- **별도 Codex-Dev (QA 외부)**: 헤드리스 harness 신규 작성 의뢰 → P-1 unblock

### 30일 안정 운영
- `npm run check:all` 정기 실행 (자동 wrapper)
- 발견 사례 → CT 패턴 추출 → Codex 의뢰 또는 직접 Edit → 검증 → commit
- baseline-pre-policy-v1 (a10b801) 회귀 X 보장

### 30일 이후 (조건부)
- Tier 3 진입 검토 (사용자 명시 승인 + 안정 운영 증거)
- `llmDialogueResolver.ts` 에 `blockHiddenTruthLexemes()` feature flag default-off

---

## 실패 발견 시 워크플로우 (공통)

1. 발견 (Auto / Sim / Review / Manual)
2. [`docs/spot-check-format.md`](spot-check-format.md) 8필드 기록 (TC-? 식별자 부착)
3. 분류 → 우선순위 (P0~P2) → 자매 문서 (functional / scripted) 분류
4. CT 패턴 추출 (잘못 패턴 #11 — 사용자 사례 = 시작점, 동형 광범위 검출)
5. Codex 의뢰서 또는 직접 Edit (소규모 / 대규모는 GPT Pro 경유)
6. 처리 → 검증 (자동 wrapper + 상대 모델 review) → 사용자 confirm
7. baseline-pre-policy-v1 (a10b801) 회귀 X 확인 → commit

---

## 절대 회피 (전체)

### QA 세션 공통 (검출/보고 전용)
- ScriptedText / caseData / runtime code / 정책 JSON·MD / 검증 wrapper / TC 문서 직접 수정 X
- baseline anchor (a10b801) 회귀 X
- runtime import 신규 X (Tier 3 진입 전)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader` 대형 리팩터 X (Tier 4+ 보류)
- S-4 UI 코드 audit = 읽기/보고만, 수정은 별도 Codex-Dev 의뢰 분리

### 작업 영역 잘못 패턴
- ScriptedText 자동 일괄 수정 (잘못 패턴 #6)
- 사용자 1 사례만 처리 (잘못 패턴 #11)
- 자동 PASS = 완료 단정 (잘못 패턴 #1, #12)

---

## 관련 자료

- 정책: [`docs/disclosure-policy.md`](disclosure-policy.md)
- 의뢰서 표준: [`docs/codex-request-template.md`](codex-request-template.md)
- spot check 포맷: [`docs/spot-check-format.md`](spot-check-format.md)
- 자동 wrapper: [`tmp/run-all-checks.cjs`](../tmp/run-all-checks.cjs)
- 헤드리스: [`tests/run-84-headless.cjs`](../tests/run-84-headless.cjs)
- baseline: [`baseline/pre-policy-v1/rollback-procedure.md`](../baseline/pre-policy-v1/rollback-procedure.md)
- 자매 문서:
  - [`qa-functional.md`](qa-functional.md)
  - [`qa-scripted.md`](qa-scripted.md)
