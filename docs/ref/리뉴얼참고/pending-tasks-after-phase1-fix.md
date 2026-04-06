# Phase 1 수정 완료 후 즉시 시행할 보류 작업

> 작성: CT (2026-04-06)
> 조건: Phase 1 P0/P1 코드 수정 9단계 완료 후 실행
> 참조 문서: 아래 각 섹션에 명시

---

## 작업 A: 45건×3 + sentinel 재검증 (Codex 위임)

**선행 조건**: P0/P1 코드 수정 9단계 + 빌드 통과
**담당**: Codex
**참조**: `docs/ref/리뉴얼참고/ct-to-codex-phase1-fix-plan.md` Section 4

### 범위

- **주 대상**: CRITICAL 13건 + FAIL 32건 = 45건 × 3회 = 135회
- **sentinel smoke**: PASS 사건 4-6건 × 1회 = 4-6회 (회귀 확인)
- 권장 sentinel 후보: `friend-06`, `friend-03`, `neighbor-01`, `family-02` (가장 안정 PASS)

### 검증 기준 (Phase 1 종료 조건)

- CRITICAL 0건
- FAIL ≤ 10건
- sentinel 사건 회귀 없음 (기존 PASS 유지)

### 산출물

- `tests/84-llm-quality-report-v2.md` (동일 포맷)
- 트랜스크립트: `tests/transcripts/{case-id}-r{1,2,3}-v2.json`

### Codex에 전달할 메시지 (수정 완료 시)

```
CT → Codex: Phase 1 P0/P1 수정 완료, 재검증 요청

수정 내역:
1. postProcessNpcText() 공통 함수 추출 (두 경로 통합)
2. enforceTruthThrottle (S0-S1 금액/실명 치환)
3. enforceMonetaryGuard (비금전 사건 금전 표현 치환)
4. atomSelectionEngine S0-S1 강제 neutral + slotMaterial 제외
5. 해요체 정규식 확장 (문장 중간)
6. 클리셰/번역체/특정X 필터
7. "만을" 정규식 수정
8. S5 exact-slot rescue (조건부 보강)
9. S5 후처리 검증 (금액 미포함 경고 로그)

재검증 범위: 45건×3 + sentinel 4-6건
산출물: tests/84-llm-quality-report-v2.md
판정 기준: CRITICAL 0, FAIL ≤ 10, sentinel 회귀 없음
```

---

## 작업 B: 84건 S5 atoms 데이터 수정 (GPT Pro 위임)

**선행 조건**: 작업 A 재검증 결과 확인 후 판단
**담당**: 유저 → GPT Pro
**참조**: `docs/ref/리뉴얼참고/ct-to-codex-phase1-fix-plan.md` Section 3 P1-A

### 수정 대상

84건 v2-atoms의 S5 `usableInSubActions` 필드

### 수정 규칙

S5(자백) 단계의 atom 중 금액/실명/기관 등 exact-support slot을 포함하는 atom:
- **현재**: `usableInSubActions: ["fact_pursuit", "evidence_present"]` (motive_search/empathy_approach 제외)
- **수정**: `usableInSubActions: ["fact_pursuit", "evidence_present", "motive_search", "empathy_approach"]` 또는 필드 자체 제거 (S5는 전체 허용)

### 주의

- S0-S4의 usableInSubActions는 건드리지 않는다 (의도적 제한)
- S5 내에서도 subAction 전용 설계된 감정/관계 atom은 기존 usableInSubActions 유지
- 금액/실명/기관 slot이 있는 atom만 확장 대상

### 판단 조건

- 작업 A 재검증에서 B4 FAIL이 10건 이하로 줄면: 데이터 수정 보류 가능
- 작업 A 재검증에서 B4 FAIL이 여전히 10건 초과: 데이터 수정 필수

---

## 작업 C: Phase 2 Wave 1 구현 (Phase 1 통과 후)

**선행 조건**: Phase 1 품질 잠금 종료 (CRITICAL 0, FAIL ≤ 10, CT+유저 합의)
**담당**: CT (Claude Code)
**참조**:
- `docs/ref/리뉴얼참고/ct-to-codex-wave1-review-request.md` (CT 구현 계획)
- `docs/ref/리뉴얼참고/codex-wave1-review-reply.md` (Codex 피드백)
- `docs/ref/리뉴얼참고/phase2-detailed-design.md` (Codex 원본 설계)

### 구현 순서

1. **H1: Dossier 자동 실행 축소** — ActionPanel.tsx, EvidencePresenter.tsx, useGameStore.ts
2. **Idea 2: 돌파 순간 연출** — stateTransitionHelper.ts, StateTransitionFeedback.tsx
3. **Idea 3+1 통합: 교착 피드백 + 심문 효과 분리** — questionFatigueEngine.ts, questionEffectEngine.ts, QuestionSelector.tsx, useActionDispatch.ts

### Codex 피드백 반영 사항 (codex-wave1-review-reply.md)

| 피드백 | 반영 내용 |
|--------|----------|
| fact_pursuit: S0-S1 strong, S2 normal, S3 strong (S0-S2 일괄 strong 아님) | computeEffectiveness 규칙 수정 |
| empathy_approach: S4 strong, S3 conditional (S3+ 일괄 아님) | computeEffectiveness 규칙 수정 |
| cold_logic weak: S0-S2 && contradictionTokens < 2로 축소 | computeEffectiveness 조건 수정 |
| angleTag: questionType만으로 불충분 → questionType + layerBand | getStalemateStatus 키 정밀화 |
| dormant effect: UI는 "힌트" 수준, 실제 효과처럼 표시 금지 | 칩 라벨을 "추천/주의" 수준으로 제한 |
| H1 pacing: 추천 뱃지 시각적 강조 | amber 뱃지 + border glow |
| threshold 중앙화 | constants.ts에 효과성 threshold 집중 |
| bypassLegacyDiminish V2 fallback 정리 | useActionDispatch.ts:1088 bypass 추가 |

### Codex 독립 리뷰 요청 (위임 3)

Wave 1 구현 완료 후 Codex에 독립 리뷰 요청:
- "플레이어 에이전시가 정말 복구되었는가?"
- "심문 3종 선택이 정말 다른 결과를 만드는가?"
- "돌파 순간이 정말 체감되는가?"

---

## 작업 D: 추가 위임 (Phase 2 진행 중)

### D1: 비금전 사건 예시 분리 (A1 보강)

blueprintPromptBuilderV2.ts의 예시 section(145-173)이 spouse-01(금전 사건) 고정.
비금전 사건에서 금전 표현 오염의 2차 원인.
P0 후처리(enforceMonetaryGuard)로 1차 커버되지만, 프롬프트 레벨 근본 해소는 별도.

### D2: 전용 헤드리스 harness 추가

현재 동적 검증 미완료 채널:
- 증인 증언
- 끼어들기
- 자유 질문 응답
- 후일담 (Phase 6)

Phase 2 완료 후 다음 사이클에서 Codex에 harness 설계 위임 가능.

### D3: atoms_empty_fallback 데이터 보강

spouse-01, family-01에서 `atoms_empty_fallback` 3/3 반복.
v2-atoms 데이터 결손 — GPT Pro 보강 시 함께 처리.

---

## 문서 위치 인덱스

| 문서 | 용도 |
|------|------|
| `ct-to-codex-phase1-fix-plan.md` | Phase 1 수정 계획 (Codex 리뷰 완료) |
| `codex-phase1-fix-plan-review-reply.md` | Codex 회신 (합의 완료) |
| `ct-to-codex-wave1-review-request.md` | Wave 1 구현 계획 (Codex 리뷰 완료) |
| `codex-wave1-review-reply.md` | Wave 1 Codex 피드백 (반영 예정) |
| `phase2-detailed-design.md` | Phase 2 상세 설계 (Codex 작성) |
| `master-plan-v3.md` | 확정 마스터 플랜 |
| `codex-engine-audit-report.md` | 22파일 엔진 감사 |
| `84-llm-quality-report.md` | 84×3 LLM 테스트 리포트 |
