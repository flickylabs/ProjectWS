# CT 세션 인수인계 (2026-04-06)

> 발신: 현재 CT 세션
> 수신: 다음 CT 세션
> 상태: Phase 1 품질 잠금 거의 완료, Codex LLM 테스트 대기 중

---

## 이번 세션에서 완료한 것

### 코드 수정
- freeQuestionV2 archetype 연결 (180패턴 활성화)
- 한국어 조사 시스템 신규 구축 (koreanPostposition.ts + fixPostpositions)
- 프롬프트 호칭 섹션 전면 개편 (동적 조사, 재판관 시점 가드)
- enforceHonorifics 이중 조사 버그 수정 ("사실이입니다"→"사실입니다")
- 심문 3종 질문풀 재설계 (empathy_approach 감정 이끌기 방향)
- 번역체 "~만을" 차단 (프롬프트+후처리)
- DossierCard UX 전면 개편 (위치/일회성/자동 시연 5단계)
- UI/UX 8건 수정 (팝업 위치, z-index, overflow, Toast portal)
- MS Fluent Emoji 전환 15개 컴포넌트 + 누락 3건 다운로드
- 후일담 문단 분리 버그 수정
- monetaryGuard 강화 (은유적 표현 차단)
- 장기 대화 반복 방지 가드 추가
- audit 스크립트 오탐 로직 조정

### 데이터 교정
- 77건 v2-atoms S0-S1 neutral화 (2,197건)
- tenant 12건 + partnership 12건 v2-atoms S0-S2 재교정 (420건)
- 84건 callTerms 전수 검증 + friend 11건 아/야 수정
- 84건 정적 검증 FAIL 261건 자동 교정 (CRITICAL 12→0, PASS 32→64)
- GPT Pro S3+ slots 보충 반영 (6건 100fill, 168 slots)
- workplace-07/08 caseId 교차 정규화
- 77건 investigationStages 병합 (504증거 전수 검증)
- Thread A/B/D 77건 확장 완료 (evidence 969건 + Phase 1/2 1,030건)

### 구조 정리
- Session A: 이중 구조 정리 완료 (끼어들기 V2, 쟁점발현 Discovery, 강제판결 readinessEngine)

### 문서/계획
- CLAUDE.md 작성 (Codex 온보딩)
- master-plan-v3 채택 (Phase 순서, R&R, 세션 구조)
- Codex 협업 체계 확립 (CT + Session A~D + Codex 독립 검증)
- Phase 2 상세 설계 문서 (Codex 작성, 5개 아이디어)
- 엔진 감사 보고서 (Codex 작성, 22파일)

---

## 현재 상태

### 정적 검증
- PASS: 64+/84 (CRITICAL 0, FAIL severity 2건만 잔존 — GPT Pro skip)
- WARN: 16건 (비표준 archetype 15 + DossierCard 미존재 1)
- 스크립트: tests/full-84-audit.cjs, tests/full-84-autofix.cjs

### 진행 중
- **Codex: 84건×3회 LLM 헤드리스 테스트** — 11채널×10축 심층 검증
  - 지시: docs/ref/리뉴얼참고/codex-task-84-llm-test-v2.md
  - 산출물 예정: tests/84-llm-quality-report.md

### 빌드
- tsc --noEmit: PASS
- vite build: PASS
- 최신 커밋: 8ff8261

---

## Codex 협의 확정사항 (반드시 숙지)

### 합의 문서 (전부 읽어야 함)
1. `docs/ref/리뉴얼참고/master-plan-v3.md` — Codex가 v2를 개정한 확정 플랜
2. `docs/ref/리뉴얼참고/message-to-claudecode-ct-v3.md` — Codex→CT 협업 구조 제안
3. `docs/ref/리뉴얼참고/ct-reply-to-codex-v3.md` — CT 평가 + 위임 정의
4. `docs/ref/리뉴얼참고/codex-reply-to-ct-v3.md` — Codex 회신 (Q1~Q4 합의)
5. `docs/ref/리뉴얼참고/game_mechanics_overhaul_recommendations.md` — Codex 재미 향상 원본 아이디어
6. `docs/ref/리뉴얼참고/discussion-game-design-overhaul.md` — 논의 기초
7. `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — 22파일 엔진 감사
8. `docs/ref/리뉴얼참고/phase2-detailed-design.md` — Phase 2 상세 설계 (Codex 작성)

### 확정된 핵심 합의

**Phase 순서 (변경 불가)**:
1. 품질 잠금 → 2. 에이전시 복구 + 재미 → 3. 밸런스 (연동 검토 후) → 4. BM (별도 분리)

**재미 증대 실행 순서 (확정)**:
1. 심문 3종 게임 효과 분리 + UI 피드백
2. 돌파 순간 연출 (state 전이 시각 이벤트)
3. 반복 심문 교착 피드백 (freshness budget)
4. 증거 카드 UI 재구성 (핵심 우선 표시)
5. 기존 이벤트 체감 강화 (끼어들기/감정폭발)
6. 증거 데이터 구조 변경 (보류)

**핵심 원칙**:
- 이벤트는 기존 엔진 활용, 신규 시스템 금지
- 밸런스는 숫자 단독 조정 금지, 시스템 연동 검토 필수
- Session B 초반에 에이전시 hotfix 최소 1개 묶기
- 증거 구조 변경(6→3~4)은 UI 타협으로 충분, 후속 판정
- Codex 리뷰는 단순 찬성이 아니라 반대 의견까지 포함하는 독립 품질 게이트

**Codex가 지적한 핵심 문제 3가지 (Phase 2에서 해결)**:
1. `QuestionSelector.tsx`의 자유 질문 경로 비활성화 (`false && llmMode`)
2. `ActionPanel.tsx`의 Dossier 자동 실행이 플레이어 발견 과정을 건너뜀
3. `EvidencePresenter.tsx`의 조사 루프가 메타 시스템(미니게임/광고)에 먹힘

**이중 구조 정리 결과 (Session A 완료)**:
- 끼어들기: V2 canonical (`interjectionV2.ts` + `GameEventModal.tsx`)
- 쟁점 발현: Discovery canonical (`discoverySlice` + `DisputeEmergenceModal.tsx`)
- 강제 판결: `readinessEngine.checkForcedVerdict()` canonical

**엔진 감사 핵심 발견 (Codex)**:
- "이벤트 엔진이 부족한 게 아니라, 좋은 엔진이 여러 벌 있고 canonical이 정리되지 않은 상태"
- Phase 2에서 살려 쓸 것: questionEffectEngine, questionFatigueEngine, interjectionV2, StateTransitionFeedback, npcReactionV2, beatSelectorV2
- 새로 만들기 금지

### R&R (확정)
- **CT (Claude Code)**: 전체 스코프 잠금, 세션 분할, 병합 판단, 유저 인터페이스
- **Codex**: 문서 설계, 자동 검증, 독립 리뷰, 리스크 지적 (반대 의견 포함)
- **GPT Pro**: 대량 데이터 생성/검증 (유저가 직접 운용)
- **세션 원칙**: 한 세션 = 한 write scope, CT는 대규모 구현보다 스코프 배정에 집중

---

## 다음 세션이 해야 할 것

### 즉시
1. **Codex LLM 테스트 결과 수신 + 분석**
   - tests/84-llm-quality-report.md 확인
   - CRITICAL/FAIL 패턴 분석 → 코드/데이터 수정
   - 구조적 결함(2회+ 반복) vs 비결정적 변동(1회) 구분

2. **Phase 1 품질 잠금 종료 판정**
   - 조건: CRITICAL 0건, FAIL 10건 이하, CT+유저 합의
   - master-plan-v3.md의 Phase 1 종료 조건 참조

### Phase 1 종료 후
3. **Phase 2 착수 (Session B)**
   - 설계: docs/ref/리뉴얼참고/phase2-detailed-design.md (Codex 작성)
   - Wave 1: 심문 3종 효과 분리 + 돌파 연출 + 교착 피드백 + 에이전시 hotfix
   - 수정 대상: QuestionSelector, StateTransitionFeedback, questionEffectEngine, questionFatigueEngine 등

4. **Phase 3 (밸런스)**: Phase 2 완료 후, 시스템 연동 검토
5. **Phase 4 (BM)**: 별도 문서로 분리됨

---

## 핵심 문서 위치

| 문서 | 경로 |
|------|------|
| 프로젝트 가이드 | CLAUDE.md |
| 마스터 플랜 | docs/ref/리뉴얼참고/master-plan-v3.md |
| Phase 2 설계 | docs/ref/리뉴얼참고/phase2-detailed-design.md |
| 엔진 감사 | docs/ref/리뉴얼참고/codex-engine-audit-report.md |
| Codex LLM 테스트 지시 | docs/ref/리뉴얼참고/codex-task-84-llm-test-v2.md |
| 합의 이력 | docs/ref/리뉴얼참고/ct-reply-to-codex-v3.md + codex-reply-to-ct-v3.md |
| Stage-1 마스터 가이드 | docs/ref/리뉴얼참고/stage1-master-guide-for-expansion.md |

---

## 협업 체계

| 역할 | 담당 | 상태 |
|------|------|------|
| CT | Claude Code (다음 세션) | 인수인계 |
| Session A | 완료 (이중 구조 정리) | ✅ 닫힘 |
| Session B | Phase 2 구현 | ⏸ 대기 |
| Session C | 밸런스 | ⏸ 대기 |
| Codex | LLM 테스트 진행 중 | 🔄 결과 대기 |
| GPT Pro | S3+ 보충 완료 | ✅ |
