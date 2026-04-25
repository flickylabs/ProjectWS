새 CT에게 — 2026-04-25 ARCH-DEBUG 세션 종료 후 인수인계

### 현재 상태
- HEAD: 1956c50 (GPT Pro 적용 — 재판관 질문 풀 다양화 + NPC emergence hook 발화)
- origin/main 푸시 완료. 워킹 트리: clean (tmp/만 untracked)
- 타입 체크: ✅ (마지막 적용 시점 PASS)
- dev 서버 가동 가능 (`npm run dev` → http://localhost:5173)
- 이번 세션 5 커밋 누적

### 최우선 정독 (반드시 순서대로)
1. `memory/MEMORY.md` (인덱스)
2. `memory/session_handoff_20260425_arch_debug.md` (현재 최신 — CT 이관 가이드. 프로젝트 핵심 / 이번 세션 완료 일람 / 미완료 작업 5건 / GPT Pro 폴더 상태 / 핵심 디자인 결정 / 교훈 7건 / 절대 금지 7건 모두 포함)
3. `memory/feedback_*` — 스타일 / GPT Pro 정책 / 작업 범위 / Codex 제약 / 사용자 텍스트 정확 grep 원칙 등
4. `CLAUDE.md` — 프로젝트 전반 (Phase 체계: 0 브리핑 → 1 사전진술 → 2 심문 → 3a 중재 → 3b 판결)

### CT 8대 원칙 (어김없이 엄수)
1. 구현 전 계획 공유 + 유저 승인 (구현 먼저 금지)
2. 매 단계 한 줄이라도 공유 (말없이 연속 tool call 금지)
3. 큰 작업은 단계 분해 + 중간 체감 확인
4. 스펙 없는 영역은 질문 먼저 (추측 금지)
5. 대량 콘텐츠 생성은 GPT Pro 경유 (에이전트 직접 생성 금지)
6. 커밋/푸시는 "커밋해줘" 지시 있을 때만
7. 유저 "꼬였어/이상해" → 즉시 상위 설계 재검토
8. **사용자 텍스트는 정확히 grep 먼저** (이전 세션 핵심 교훈 — 부분 패턴만 grep하면 결함 식별 실패하고 사용자가 화남)

### 세션 시작 첫 턴 흐름
1. 유저 인사
2. 위 문서 정독 완료 보고
3. 유저가 작업 방향 지시할 때까지 구현 금지

### 🔴 다음 진행 우선순위 (메모리에 상세 명시)

**1순위 — D 옵션 100% 클릭 통일 (사용자 확정, 본격 진행 필요)**

사용자 결정 (그대로 인용):
> "진행. 대신 클릭할 수밖에 없도록 효과를 강하게 보여주자. 해당 항목에 번개가 치는 등 등장을 화려하게 보여주고, 버튼을 매우 강하게 번쩍이게 해서 눈에 띌 수밖에 없게 & 클릭할 수밖에 없게 하자. 그리고 어느정도 턴이 진행되어 해당 액션이 의미가 없게되면 비활성화 시켜버리자."

5단계 분해 (총 3.5~4시간):
- D-1 자동 모달 enqueue 전부 차단 (4종) — DiscoveryFeedbackWatcher의 enqueueFeedback 호출 차단
- D-2 시스템 메시지에 강력 시각 효과 (번개 + 깜빡)
- D-3 시스템 메시지 클릭 → 모달 (수동 트리거)
- D-4 일정 턴 (5턴 권장) 후 비활성화
- D-5 탑바 쟁점 강조 — '재판관의 관찰' 패널의 번개 효과 재활용

**2순위 — TC-B1 atom 회피 같은 쟁점 한정**

상황: B-18 픽스로 회피 동작하나 다른 쟁점 atom으로 이동 (잘못된 방향). 사용자 보고 인용:
> "계속 질문한 쟁점이 아닌 다른 쟁점에 대한 이야기를 하고있어"

픽스: `atomSelectionEngine`에서 candidates를 같은 disputeId로 1차 필터 + 그 안에서만 회피 페널티 적용. 1시간 이내.

**3순위 — atom 식별 루프 (B-19 디버그 배지 활용)**

사용자가 dev에서 결함 발화 발견 시 [SCRIPT]/[LLM] 색상 배지로 출처 확인 → 정확 atom 식별 + 정정.

**4순위 — TC-D1 증거 제시 응답 atom 결함 식별 + 정정**

### 🧪 QA 진행 시점

D 옵션만 적용 후 통합 QA 권장. GPT Pro 2건은 이미 적용 완료(emergence prerequisites + NPC hook + 재판관 질문 풀).

### ⚠ 절대 하지 말 것 (이전 세션 교훈)

1. tests/transcripts/* 자동 생성 파일 커밋 (git checkout으로 원복)
2. atom 데이터 직접 대량 생성 (GPT Pro 경유 필수)
3. 사용자 명시 없이 force push / reset --hard
4. evaluateTurnEvents 호출 부활 (자동 트리거 차단됨)
5. trackUsedAtoms 호출 제거 (B-18 픽스 핵심)
6. Phase4_Evidence/Phase5_ReExamination 가드 부활 (Phase.Interrogation 단일화 완료)
7. GPT Pro 산출물을 검토 없이 적용 (CT가 한국어 + 게임 디자인 검증 필수)
8. 사용자 텍스트 부분 패턴 grep만 — 정확 텍스트로 grep 먼저

### 프로젝트 한 줄

솔로몬 법정 — AI 둘의 싸움을 인간 지혜로 재판하는 리플레이형 추리 게임 (PC Steam 프리미엄 선행, 활성 사건 spouse-01 / family-01 / friend-01, 나머지 81건은 Legacy)

### 이번 세션 핵심 완료 (5 커밋 푸시)

```
1956c50 feat: GPT Pro 적용 — 재판관 질문 풀 다양화 + NPC emergence hook 발화
fb59a41 feat: drawer 강조 통일 + 모순 폭 + GPT Pro 패키지 추가
9dd619c feat: B-17 D 옵션 — emergence prerequisites 강화 (GPT Pro 결과 적용)
d3866de fix: dev 실측 디버깅 — 구조 결함 7건 + UI 폴리싱 + Phase Legacy 폐기
78e9a47 feat: Thread-QW v6 후속 — 6건 S5 자백 재작성 (구체성 보강)
```

상세는 `memory/session_handoff_20260425_arch_debug.md` 참조.
