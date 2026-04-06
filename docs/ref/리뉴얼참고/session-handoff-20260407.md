# CT 세션 인수인계 (2026-04-07)

> 발신: 현재 CT 세션
> 수신: 다음 CT 세션
> 상태: Phase 1~3 구현 완료, 스크립트화 프로젝트 Codex 위임 중

---

## 이번 세션에서 완료한 것

### Phase 1 품질 가드 2차 수정
- Lane A~D 10단계 수정 (S5Guard, Truth Throttle, MonetaryGuard, ClicheFilter 등)
- quick 19건 통과 (CRITICAL 0, FAIL 0, D2 WARN 1건 수용)
- .env.local 만료 키 문제 해결

### Phase 2 Wave 1 (H1 + Idea 2 + Idea 3+1)
- H1: Dossier 자동 조사 완료 제거 → 추천 증거 뱃지
- Idea 2: S4='opening' 분리 + 행동 추천 토스트
- Idea 3: 교착 피드백 (streak 2=warning, 3+=stalemate) + dossier_execute 리셋
- Idea 1: computeEffectiveness 효과 칩 (Codex 합의 반영)

### Phase 2 Wave 2
- 증거 카드 UI 재구성 (점수 기반 정렬 + 추천 카드 + 접기)
- lastFocusedDisputeId 추적

### Phase 2 Wave 3
- 모순 지적: 효과 지연 실행 (deferredEffects)
- 감정 폭발: leak +10 / trust +15 보너스 + 후속 추천

### 재판관 성향 시스템
- Phase 2 후반: ProcessMetrics 확장 + deriveCaseProfile + 결과 화면 '성향' 탭
- Phase 3: 퍼크 12종 + 성장 5단계 + 프로필 카드
- 축 단계형 드리프트 (연속 수치 → 레벨+포인트)
- 솔루션 orientation 태그 963개 + 해결 축 연동
- 퍼크 밸런스 조정 (Codex 합의)

### 기타 수정
- ResultScreen 중앙 팝업 UI
- 번개(skillPoints) 글로벌 연동
- v2DataLoader require() → import()
- recentlyUsedAtomIds 실제 추적 구현 + 반복 방지 프롬프트 강화
- CLAUDE.md 갱신

---

## 현재 상태

### 빌드
- tsc --noEmit: PASS
- vite build: PASS

### 커밋 이력

| 커밋 | 내용 |
|------|------|
| `b7eb11b` | Phase 1 2차 수정 + Wave 1 |
| `0302993` | Wave 2 (증거 카드 UI) |
| `42bc49b` | Wave 3 (이벤트 체감) + 성향 리포트 |
| `714ea29` | Phase 3 퍼크/성장/프로필 + 솔루션 태그 |
| `d0d0abe` | solution tag → 해결 축 연동 |
| `cd3e62f` | 축 단계형 드리프트 + 퍼크 밸런스 + solution 공식 |

---

## Codex에 위임 중인 작업

### 전체 텍스트 채널 스크립트화 프로젝트
- **목표**: 게임 실행 시 LLM 호출 0건
- **범위**: NPC 대사, 재판관 질문 확장, 증거 반응, 증인 증언, 후일담, 시스템 메시지 등 16개 채널
- **예상 규모**: NPC 대사만 ~75,600개 (84건 × 180키 × 5변형)
- **파이프라인**: 참고 대사 수집 → GPT Pro 생성 → 품질 검증 → 엔진 연동
- **Codex 회신 대기 중**: 설계 검토(A) + 구현 계획(B) + GPT Pro 위임(C) + 로드맵(D) + 채널 설계(E)

---

## 다음 세션이 해야 할 것

### 즉시: Codex 스크립트화 회신 처리
1. Codex 회신 수신 → 설계 합의
2. 파일럿 1건(spouse-01) 완전 스크립트화 착수
3. 엔진 측 스크립트 우선 경로 구현

### 보류 (스크립트화 완료 후)
- full 45건×3 정식 검증
- 실제 플레이 테스트
- Phase 4: BM/서버/시즌 (방향성 합의 완료, 메모리 저장됨)

---

## 기획 합의 현황

| 기획 | 상태 | 메모리 |
|------|------|--------|
| 재판관 클래스/성향 | **구현 완료** | project_judge_profile_final.md |
| 게임 디자인 확장 | 방향 합의 | project_design_expansion.md |
| Phase 4 설계 | 방향 합의 | project_phase4_design.md |
| 스크립트화 | Codex 위임 중 | (이 인수인계 문서) |

---

## 협업 체계

| 역할 | 담당 | 상태 |
|------|------|------|
| CT | Claude Code | 인수인계 |
| Codex | 스크립트화 설계 + 검증 | 🔄 회신 대기 |
| GPT Pro | 대량 스크립트 생성 | ⏸ Codex 설계 후 착수 |

---

## 수정된 파일 목록 (이번 세션)

### 엔진 (12파일)
| 파일 | 변경 |
|------|------|
| `llmDialogueResolver.ts` | 후처리 강화, parseLLMResponse 컨텍스트, 반복 방지 |
| `blueprintPromptBuilderV2.ts` | S5 프롬프트 강화, 비금전 예시 분리, 반복 방지 |
| `atomSelectionEngine.ts` | S5 rescue amount 우선, recentlyUsedAtomIds 연동 |
| `judgeProfileEngine.ts` | 3축 성향 + 드리프트 시스템 (신규) |
| `judgePerks.ts` | 퍼크 테이블 12종 (신규) |
| `questionEffectEngine.ts` | computeEffectiveness 효과 판정 |
| `questionFatigueEngine.ts` | 교착 3단계 + dossier 리셋 |
| `stateTransitionHelper.ts` | S4='opening' + 행동 추천 |
| `gameEventTriggerEngine.ts` | 모순 deferredEffects |
| `v2DataLoader.ts` | require() → import() |
| `verdictEngine.ts` | (변경 없음, 참조만) |
| `koreanPostposition.ts` | (이전 세션에서 수정됨) |

### 스토어 (3파일)
| 파일 | 변경 |
|------|------|
| `useGameStore.ts` | recentAtomIds, lastFocusedDisputeId, activePerks, applyPerks |
| `resourceSlice.ts` | skillPoints 글로벌 연동 |
| `evidenceSlice.ts` | recommendedEvidenceIds |

### 컴포넌트 (8파일)
| 파일 | 변경 |
|------|------|
| `ActionPanel.tsx` | Dossier 자동 실행 제거 → 추천 |
| `EvidencePresenter.tsx` | 점수 정렬 + 추천 카드 + 접기 |
| `QuestionSelector.tsx` | 효과 칩 + 교착 경고 |
| `StateTransitionFeedback.tsx` | opening 라벨 + 행동 추천 |
| `GameEventModal.tsx` | 모순 지연실행 + 감정 폭발 강화 |
| `ResultScreen.tsx` | 중앙 팝업 + 성향 탭 |
| `JudgeProfileReport.tsx` | 3축 바 + 퍼크 선택 + 프로필 카드 (신규) |
| `JudgeProfileCard.tsx` | SNS 공유용 카드 (신규) |
| `CourtHeader.tsx` | 요약 해금 글로벌 번개 체크 |
| `VerdictScreen.tsx` | 드리프트 업데이트 + caseTelemetry |

### 데이터 (3파일)
| 파일 | 변경 |
|------|------|
| `solutionOrientations.ts` | 963개 솔루션 태그 (신규) |
| `leaderboard.ts` | driftState 저장/로드 + getJudgeProfile |
| `game.ts` | ProcessMetrics 6개 필드 추가 |

### 테스트/문서
| 파일 | 변경 |
|------|------|
| `run-84-revalidation-v3.cjs` | Codex 작성 재검증 러너 |
| `84-llm-quality-report-v3-quick.md` | quick 검증 결과 |
| `ct-to-codex-revalidation-request-v3.md` | 재재검증 요청서 |
| `tests/transcripts/*-r1-v3.json` | quick 검증 트랜스크립트 19건 |
| `session-handoff-20260407.md` | 이 인수인계 문서 |
| `CLAUDE.md` | 세션 변경사항 반영 갱신 |
