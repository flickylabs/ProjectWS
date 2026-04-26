# QA Test Cases — 기능성 (Functional)

**대상**: 활성 3건 (spouse-01, family-01, friend-01)
**Tier**: 2 (정책 보호막 작동 검증 단계 — 30일 안정 운영)
**대응 baseline**: a10b801 (`baseline-pre-policy-v1`)
**HEAD 기준**: `5378700` (병렬 QA 결과 취합은 동일 HEAD에서만 가능)
**자매 문서**: [`qa-scripted.md`](qa-scripted.md) (스크립트 영역) / [`qa-test-cases.md`](qa-test-cases.md) (인덱스)
**병렬 세션 가능**: 이 문서는 자기완결. Codex / ClaudeCode 별도 스레드에서 단독 실행 OK.

---

## 시작 조건 (모든 세션 필수)

QA 시작 전 반드시 실행 + 결과 보고서 헤더에 기록:

```bash
git status --short --branch
git log --oneline -1
npm run check:all
```

**중단 조건**:
- HEAD가 명시 기준과 다름 → 작업 중단 + CT-Main 보고
- working tree dirty (untracked 외 modified 있음) → 작업 중단
- `npm run check:all` hard issues > 0 → 작업 중단 (baseline 회귀 의심)

**진행 조건**:
- HEAD = `5378700` (또는 CT-Main이 갱신한 새 기준)
- working tree clean (untracked OK)
- `npm run check:all` hard 0 / warnings ≈ 157 (baseline-known)

---

## 범위

코드 / 게임 로직 / 시뮬레이션 / LLM 응답 / 동적 영역.

**제외**: 정적 텍스트 / 호칭 / 진실 누설 lexeme / 한국어 품질 → [`qa-scripted.md`](qa-scripted.md)에서 다룸.

---

## 사용 방법

각 TC 표기:
- **[Auto]** — `npm run build` / `tests/run-84-headless.cjs` 등 자동 검출
- **[Sim]** — Codex 다중 시드 시뮬레이션 (1000회 plan 영역)
- **[Manual]** — 사용자 게임 플레이 spot check

우선순위:
- **P0** — 게임 핵심 원칙 위반 / 진행 불가
- **P1** — 게임 흐름 / 정책 위반 (눈에 띔)
- **P2** — 품질 / 자연성

실패 발견 시 [`docs/spot-check-format.md`](spot-check-format.md) 8필드 포맷 → CT 분류.

---

## A. 게임 흐름 (Phase / Action)

### TC-A1 [Manual+Sim, P0] 재판관 멘트 후 NPC 응답 발동 보장 ★ 사용자 명시
- **범위**: 3 case × Phase 3, 5 (심문 / 재심문)
- **절차**: 심문 액션 4종 (`fact_pursuit` / `motive_search` / `empathy_approach` / dossier 카드) 각각 양측에 사용
- **합격**:
  - 매 액션 후 NPC 응답 entry 발동 (5초 이내)
  - 응답 비어있지 않음 / `...` 또는 빈 말풍선만 표시 X
  - LLM 호출 실패 시 fallback entry 발동 (멈춤 X)
- **Sim**: ⚠️ **헤드리스 harness 부재 — 현재 BLOCKED**. 하단 "헤드리스 Harness 상태" 참조
- **실패 기록**: 액션명 / 케이스 / dispute / lieState / NPC archetype / 응답 상태 (빈 / 시간초과 / 에러)
- **연관 코드**: [src/hooks/useActionDispatch.ts](src/hooks/useActionDispatch.ts), [src/engine/llmDialogueResolver.ts](src/engine/llmDialogueResolver.ts), [src/engine/atomSelectionEngine.ts](src/engine/atomSelectionEngine.ts)

---

#### ⚠️ 헤드리스 Harness 상태 (P-1 의존)

CLAUDE.md에 기재된 `tests/run-84-headless.cjs` **현재 repo 부재** (Legacy 격리 시 제거된 듯). 즉:

- **P-1 (헤드리스 1000회) = BLOCKED**
- 대안 1: Codex-Dev에 harness 신규 작성 별도 의뢰 (QA 세션 = 검출/보고 전용, 코드 작성 X)
- 대안 2: Manual spot check (사용자) 우선 진행
- 대안 3: P-3 (회귀 stress = `npm run check:all` 반복) / P-4 (judge question 84종 정적 매트릭스 audit) / P-5 진행

**P-1 진입 절차 (harness 마련 후)**:
1. harness 존재 + 정상 동작 확인 (`node <runner> --case spouse-01 --seed 1`)
2. **smoke 100회** (TC-A1·A2·A3·A4 통계 + 비정상 빈도 측정)
3. smoke PASS 시 → **stress 1000회** 진입
4. smoke FAIL 시 → CT-Main 보고 + 작업 중단

### TC-A2 [Manual+Sim, P1] 증거 제시 → NPC 반응 발동
- **범위**: 3 case × Phase 4
- **절차**: 모든 unlocked 증거를 양측 모두에 제시 (`subjectParty` 매칭 / 비매칭 모두)
- **합격**:
  - 매칭 측: 진술 변화 entry 발동
  - 비매칭 측: disabled + 사유 표시 (빈 모달 X)
- **Sim**: 다중 시드로 evidence 제시 100회 → 모달 상태 통계
- **실패 기록**: 증거 ID / `subjectParty` / 노출된 모달 상태

### TC-A3 [Manual+Sim, P0] 재판관 질문 4타입 × depth × tone 모두 트리거
- **범위**: 3 case × Phase 3, 5
- **절차**: judge question 84 templates (4 type × depth × 2 tone) 다양한 조합 자연 플레이
  - fact_pursuit / motive_search / empathy_approach: depth 0~3 × soft/hard = 24 each
  - evidence_present: depth 0~2 × soft/hard = 12 (depth 3 미적용)
  - 합계 84 templates / mid tone 미적용 (Tier 4+ 보류)
- **합격**:
  - 각 type / depth / tone 조합 발동 시 question entry 정상 + NPC 응답 정상
  - 부조화 entry 발동 X (예: depth 1에서 hard tone 발동)
- **Sim**: 84종 매트릭스 전수 1회 + 무작위 시드 500회로 발동 분포 검증
- **실패 기록**: 발동 entry / 부조화 위치
- **연관 코드**: [src/engine/judgeQuestionEngine.ts](src/engine/judgeQuestionEngine.ts)

### TC-A4 [Manual+Sim, P0] Phase 전환 정상
- **범위**: 3 case × Phase 0→1→2→3→4→5→6→7→Result
- **절차**: 정상 플레이 처음부터 끝까지
- **합격**: 어떤 Phase에서도 멈춤 / 무한 루프 / 진행 불가 X
- **Sim**: 전수 플레이 100회 + 빠른 진행 / 액션 누락 / 무작위 종료 시드
- **실패 기록**: 멈춘 phase / 마지막 액션

### TC-A5 [Manual, P1] localStorage 저장/로드
- **범위**: 3 case × Phase 7 진입 후
- **절차**: 판결 완료 → 새로고침 → 결과 / 조각 인벤토리 / 성장 단계 / 칭호 정상 로드
- **합격**: `solomon-judge-progression` / `solomon-history` 정상 복원
- **실패 기록**: 잃은 데이터 / 복원 안 된 영역

### TC-A6 [Auto, P1] 빌드 / 타입 체크 PASS
- **합격**: `npm run build` PASS / `npx tsc -b --force` PASS
- **빈도**: 매 commit / 매 patch 후

---

## E. Evidence Stage 정합 (게임 메커니즘)

### TC-E1 [Manual+Sim, P1] evidence unlocked=false 노출 X (런타임 게이트)
- **범위**: 모든 채널 (런타임)
- **합격**: unlock 안 된 evidence 직접 명시 X (judge / system / dossier 모두)
- **Sim**: 진행도 0%, 25%, 50%, 75% 시점에 모든 채널 dump → unlock 외 evidence 노출 검출
- **실패 기록**: 노출 위치 / evidence ID

### TC-E2 [Manual, P1] stage 0: surface만 노출
- **범위**: evidence 노출 모든 영역 (UI / 채널)
- **합격**: stage 0 evidence 노출 시 `surfaceName` + `surfaceDescription`만. description 진실 영역 X
- **실패 기록**: stage 0인데 진실 노출 위치

### TC-E3 [Manual, P1] stage 2: deep investigation 시만 진실 노출
- **범위**: stage 2 evidence
- **합격**:
  - 자동/시스템 노출 X. 플레이어 직접 도달 시만
  - NPC 자백보다 늦지 않음 (자백 후 노출이면 OK)
- **실패 기록**: 자동 노출 위치

### TC-E4 [Manual, P1] discoveryText route/stage gate
- **범위**: `discoveryText` 필드 노출
- **합격**:
  - 자동/시스템 안내 X
  - 플레이어 직접 evidence 조합 + deep investigation 시만 노출
- **실패 기록**: 자동 노출 위치 / route 위반

---

## H. 재판관 성향 시스템 (게임 로직)

### TC-H1 [Manual+Sim, P1] 조각 획득 정상
- **범위**: 사건 결과 → 9종 조각 획득
- **합격**:
  - `|caseAxis| ≥ 45` → 해당 방향 3개
  - `|caseAxis| 15~44` → 해당 방향 2개 + 중립 1개
  - `|caseAxis| < 15` → 중립 2개
  - 보너스 조건 (양측 S3+ / 100% / 첫 플레이 / 전체 조합 / 전체 증인) 정상
- **Sim**: 다양한 caseAxis 시드 100회 → 조각 분포 통계 검증

### TC-H2 [Manual, P1] 강화 비용 / 변환 정상
- **합격**:
  - Lv0→1: 방향×3 + 중립×5 / Minor 퍼크 개방
  - Lv1→2: 방향×6 + 중립×10
  - Lv2→3: 방향×10 + 중립×16 / Major 퍼크 해금
  - 같은 축 중립 3개 → 방향 1개 변환

### TC-H3 [Manual, P2] 칭호 / 성장 단계 정합
- **합격**: 9종 칭호 + 5단계 (apprentice / regular / veteran / senior / legendary) 정상

---

## I. NPC LLM 응답 검증 (동적 영역)

### TC-I1 [Sim, P0] LLM 응답 진실 누설 동적 검출
- **범위**: NPC interrogation LLM 호출 (gpt-4o)
- **절차**: case × dispute × lieState (S0~S5) × archetype 조합 × 50시드 sampling → LLM 응답 텍스트 dump
- **합격**:
  - S0~S2: 진실 lexeme 0건 (정책 금지 lexeme list)
  - S3+: lieState gate 따라 점진 노출
  - 동의어 우회 표현 검출 (정적 wrapper 한계, 잘못 패턴 #12)
- **Sim**: Codex가 LLM 응답 sampling 후 동의어 / 우회 표현 검출 → 패턴 추출
- **실패 기록**: 시드 / case / dispute / lieState / 응답 텍스트 / 검출 우회 표현
- **연관 코드**: [src/engine/llmDialogueResolver.ts](src/engine/llmDialogueResolver.ts), [src/engine/blueprintPromptBuilderV2.ts](src/engine/blueprintPromptBuilderV2.ts)

### TC-I2 [Sim, P1] LLM 응답 archetype voice 정량 일관
- **범위**: 같은 NPC LLM 응답 100시드
- **합격**:
  - `victim_cosplay` (박지연): 단정 빈도 ≥ 70%
  - `avoidant` (이준호): 모호어 ≥ 50% (S0~S2)
  - `affect_flattening` (윤정후 / 최수민): 격앙 ≤ 10%
  - `confrontational` (윤태성): 직접 공격 빈도 높음
  - `premature_summary` (송다은): 결론 jump 패턴
- **Sim**: archetype별 100시드 → 정량 메트릭 측정 (빈도 / 비율)
- **실패 기록**: archetype / 메트릭 명 / 측정값 / 기대값

### TC-I3 [Sim+Manual, P1] LLM 호출 실패 시 fallback 자연성
- **범위**: API 실패 / 시간초과 / 빈 응답 시 fallback entry 발동
- **합격**:
  - fallback 발동 (멈춤 X)
  - fallback 텍스트 자연성 (캐릭터 voice 부조화 X / "..." 단독 X)
  - fallback도 정책 따름 (진실 lexeme X)
- **Sim**: API mock 실패 100회 → fallback entry 분포 + 텍스트 dump
- **실패 기록**: 실패 시나리오 / fallback entry 텍스트

---

## J. 시뮬레이션 Stress (Codex 1000회 plan 영역)

### TC-J1 [Sim, P1] 무작위 액션 시퀀스 stress
- **범위**: 3 case 전체
- **절차**: Phase 3, 5에서 무작위 액션 시퀀스 100~1000회
- **합격**:
  - 진행 불가 / 무한 루프 0건
  - 응답 누락 (TC-A1) 0건
  - lieState 진행 비정상 점프 0건 (예: S1 → S5 직행)
- **실패 기록**: 시드 / 시퀀스 / 멈춤 위치

### TC-J2 [Sim, P1] checksum 변화 영역 회귀 stress
- **범위**: 정책/데이터 patch 후 변경된 file 영역
- **절차**: 변경 영역 집중 1000회 플레이스루
- **합격**: baseline-pre-policy-v1 (a10b801) 회귀 0건
- **실패 기록**: patch SHA / 회귀 영역 / 시드

### TC-J3 [Sim, P2] LLM 응답 다중 시드 cross-validation
- **범위**: 14,931 variants에서 random sample 100~500
- **절차**: 같은 entry × 9 specialist (D1 lieState flow / D3 archetype voice / 진실 누설 / Q-A 정합 등) 다중 평가
- **합격**: 9 specialist 일치도 ≥ 80%
- **실패 기록**: variant ID / specialist / 불일치 차원

---

## Codex 1000회 plan — 우선순위

| Plan | 영역 | 회수 | 의미 | 우선 | 상태 |
|---|---|---|---|---|---|
| **P-1** | TC-A1 헤드리스 플레이스루 다중 시드 | smoke 100 → stress 1000 | 응답 누락 / fallback / 진행 회귀 stress | ★★★★★ | **BLOCKED** (harness 부재) |
| **P-2** | TC-I1 LLM 응답 진실 누설 우회 검출 | 500 | 정적 wrapper 한계 보강 (잘못 패턴 #12) | ★★★★ | ready |
| **P-3** | TC-J2 회귀 stress (`npm run check:all` 반복) | 1000 (patch마다) | baseline 보호 | ★★★★ | ready |
| **P-4** | TC-A3 judge question 84종 정적 매트릭스 audit | 84+500 | 부조화 발동 / 분포 | ★★★ | ready (정적 audit만) |
| **P-5** | TC-I2 archetype voice 정량 (LLM sample) | 100×6 | 캐릭터 일관성 | ★★ | ready |
| **P-6** | TC-J3 9 specialist cross-validation | 100~500 | 의미 차원 깊은 review | ★★ | ready |

**P-1 우선이지만 harness 부재로 BLOCKED**. P-3·4·5 순차 진행 가능.

**Codex 단독 가능**: P-3, P-4, P-5 / P-1 (harness 마련 후)
**ClaudeCode 별도 스레드 교차 추천**: P-2, P-6 (LLM/의미 영역)

---

## 분담

| 항목 | Codex 단독 | CT 별도 스레드 | 사용자 |
|---|---|---|---|
| TC-A1 (응답 누락) | Sim 1000회 | — | Manual spot check |
| TC-A2 (증거 제시) | Sim 100회 | — | Manual |
| TC-A3 (질문 매트릭스) | Sim 84+500회 | — | Manual |
| TC-A4 (Phase 전환) | Sim 100회 | — | Manual 1회 전수 |
| TC-A5 (localStorage) | — | — | Manual |
| TC-A6 (build) | Auto 매 commit | Auto 매 commit | — |
| TC-E1~4 (evidence stage) | Sim | — | Manual |
| TC-H1~3 (성향) | Sim H1 | — | Manual |
| TC-I1 (LLM 누설) | Sim 500회 | **교차 sample 100회** | Manual |
| TC-I2 (archetype voice) | Sim | 교차 review | — |
| TC-I3 (fallback 자연성) | Sim 100회 | 교차 review | Manual |
| TC-J1~3 (stress) | Sim 1000회 | — | — |

**자동 검출 한계** (잘못 패턴 #12): LLM 응답 의미 자연성 / lieState 진행 자연성 / fallback voice 부조화 → Manual + CT 별도 스레드 review 필요.

---

## 합격 기준 (기능성 영역)

3가지 동시 충족 시 Tier 2 안정 인정:
1. **Auto / Sim**: TC-A6 매 commit PASS / TC-J1·2 1000회 PASS (P-1 harness 마련 후)
2. **Manual spot check**: 사용자 게임 플레이 중 P0/P1 발견 0건 (P2 누적 OK)
3. **상대 모델 역리뷰**: 발견된 case 처리 후 CT/Codex 재검증 PASS

→ 한 사람 단독 완료 선언 X (잘못 패턴 #1).

**Tier 2 warning 기준**:
- baseline-known warnings (현재 ≈ 157건) = hard fail 아님
- `forbiddenLexemes.surfaceOnly` 기본 WARN (정적 분석 false positive 회피 — `--strict-lexeme` 옵션으로 hard 승격 가능)
- `surfaceName alias` 보호 alias 가능성 = WARN (Codex 설계로 의도된 추상화)
- 합격 기준은 **new hard issues = 0** + **new warnings 사유 설명** (baseline 회귀 X 입증)

---

## 결과 보고 공통 포맷

각 세션 완료 시 `tmp/qa-functional-results/{YYYYMMDD}-{plan}-summary.md` 작성:

```md
# QA Functional Result — Plan {P-1~P-6}

- **Session**: QA-Codex-Functional / QA-CT-Cross
- **HEAD**: 5378700 (기준 HEAD, 변경 시 명시)
- **Scope**: TC-A1 / TC-A3 / TC-I1 / ...
- **Commands run**: `git log --oneline -1` / `npm run check:all` / `<harness 명령>` / ...
- **PASS / FAIL / BLOCKED**: 0 / 0 / 0
- **P0 findings**: 개수 + variant ID list
- **P1 findings**: 개수 + variant ID list
- **P2 findings**: 개수 + variant ID list
- **Known baseline warnings**: 157 (또는 갱신값)
- **New warnings**: 0 (변경 시 사유 명시)
- **New hard issues**: 0 (>0 = 작업 중단 + CT-Main 보고)
- **Warning delta explanation**: (필요 시)
- **Repro seed / variant ID / TC ID**: 발견 case별
- **Suggested next action**: CT-Main 처리 / Codex 의뢰서 / Manual spot check 보강
- **Files touched**: none (검출/보고 전용 — 수정 X)
```

---

## 실패 발견 시 워크플로우

1. 발견 (Sim 통계 / Manual spot check)
2. [`docs/spot-check-format.md`](spot-check-format.md) 8필드 기록 (TC-? 식별자 부착)
3. 분류: A / E / H / I / J → 우선순위 (P0~P2)
4. CT 패턴 추출 (잘못 패턴 #11 — 동형 광범위 검출)
5. Codex 의뢰서 (필요시) 또는 직접 Edit (소규모)
6. 처리 → 검증 (Sim 회귀 + 상대 모델) → 사용자 confirm
7. baseline-pre-policy-v1 (a10b801) 회귀 X 확인 → commit

---

## 세션 절대 금지선 (검출/보고 전용)

QA 세션은 **검출 + 보고 전용**. 다음 모두 금지:

- ScriptedText 직접 수정 X
- caseData 직접 수정 X
- runtime code 직접 수정 X (`src/engine/`, `src/components/`, `src/hooks/`, `src/store/`)
- 정책 JSON 수정 X (`src/data/disclosurePolicy/`)
- 정책 Markdown 수정 X (`docs/disclosure-policy.md`)
- 검증 wrapper 수정 X (`tmp/run-all-checks.cjs` 등)
- TC 문서 수정 X (CT-Main 영역)
- baseline anchor 회귀 X (a10b801)
- runtime import 신규 X (Tier 3 진입 전)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader` 등 대형 리팩터 X (Tier 4+ 보류)

발견 case → 보고서 작성 → CT-Main이 처리 결정.

코드/데이터 수정이 필요한 영역은 **별도 Codex-Dev 의뢰** 또는 **CT-Main 직접 Edit** 분리.

---

## 다음 작업

이 TC 문서 검토 후:
- **Plan P-3·4·5** 우선 시작 (P-1 harness 부재 — BLOCKED)
- **Plan P-2** 병렬 (LLM 응답 누설 우회 검출 — CT 별도 스레드 교차)
- 별도: harness 신규 작성 의뢰 (Codex-Dev — QA 세션 외부)
- 결과 통계 → 패턴 발견 시 Tier 1 정책 lexeme list 보강 (CT-Main)

---

## 관련 자료

- 정책: [`docs/disclosure-policy.md`](disclosure-policy.md)
- 의뢰서 표준: [`docs/codex-request-template.md`](codex-request-template.md)
- spot check 포맷: [`docs/spot-check-format.md`](spot-check-format.md)
- 자동 wrapper: [`tmp/run-all-checks.cjs`](../tmp/run-all-checks.cjs)
- 헤드리스: [`tests/run-84-headless.cjs`](../tests/run-84-headless.cjs)
- baseline: [`baseline/pre-policy-v1/rollback-procedure.md`](../baseline/pre-policy-v1/rollback-procedure.md)
- 자매 문서: [`qa-scripted.md`](qa-scripted.md)
