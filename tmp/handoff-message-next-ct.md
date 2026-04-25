새 CT에게 — 2026-04-25 Phase A~C 세션 종료 후 인수인계

### 현재 상태
- HEAD: db4b965 (Phase C 자백 시스템 재설계 + 결함 17·23·24·26·27 픽스)
- **로컬 3 커밋, origin/main 푸시 안 됨** (사용자 dev 검증 후 푸시)
- 워킹 트리: clean (tmp/만 untracked — 보고서·임시 파일)
- 타입 체크 + 빌드 PASS (마지막 적용 시점)
- dev 서버 가동 가능 (`npm run dev` → http://localhost:5173)

### 최우선 정독 (반드시 순서대로)
1. `memory/MEMORY.md` (인덱스)
2. `memory/session_handoff_20260425_phase_a_to_c.md` (현재 최신 — CT 이관 가이드. Phase A~G + C + 결함 + 새 기획 결정 + 잔존 결함 + 다음 단계 모두 포함)
3. `tmp/TC-phase-A-G.md` (사용자 dev 검증용 TC. TC-A·B·D·E·F·G)
4. `tmp/session-changes-summary.md` (263+건 변경 일람 + 변경 파일 목록)
5. `tmp/new-design-emotion-redesign.md` (사용자 답변 5개 결정 — 자백 시스템 핵심)
6. `memory/feedback_*` — 스타일 / GPT Pro 정책 / 작업 범위 / Codex 제약 / 사용자 텍스트 정확 grep 원칙 등
7. `CLAUDE.md` — 프로젝트 전반 (Phase 체계: 0 브리핑 → 1 사전진술 → 2 심문 → 3a 중재 → 3b 판결)

### CT 8대 원칙 (어김없이 엄수)
1. 구현 전 계획 공유 + 유저 승인
2. 매 단계 한 줄이라도 공유
3. 큰 작업은 단계 분해 + 중간 체감 확인
4. 스펙 없는 영역은 질문 먼저
5. 대량 콘텐츠 생성은 GPT Pro 경유 (에이전트 직접 생성 금지)
6. 커밋/푸시는 "커밋해줘 / 푸시해줘" 지시 있을 때만
7. 유저 "꼬였어/이상해" → 즉시 상위 설계 재검토
8. 사용자 텍스트는 정확히 grep 먼저

### 세션 시작 첫 턴 흐름
1. 유저 인사
2. 위 문서 정독 완료 보고 (간략)
3. 유저 dev 검증 진행 의향 확인 — TC 어떤 것부터 검증할지

### 🔴 다음 진행 우선순위

**1순위 — 사용자 dev 검증 결과 받기 + 결함 픽스 사이클**

이번 세션에서 적용된 변경이 매우 큼 (~263건 + Phase C 자백 시스템). 사용자가 dev 검증 못 한 상태로 이관됨. **첫 작업은 사용자 dev 검증 진행 + 결함 보고 청취 + 추가 픽스**.

검증 우선순위 (`tmp/TC-phase-A-G.md`):
- TC-B (체념 시스템) — 가장 큰 변경, 최우선
- TC-E (emergence 모달) — 시각 변화 큼
- TC-F (호칭) — 사용자 인지 빠름
- TC-A → TC-D → TC-G

Phase C 추가 검증 (TC에 미포함, 다음 CT가 검증 가이드 작성):
1. 격앙(75-84) + 모순 추궁 → 셧다운 진입
2. 셧다운 만료 → emotion 87+ 자동 전환 → "저항이 무너졌습니다" 메시지
3. 자백 유도 모달 ("자백 유도 / 추가 추궁")
4. "자백 유도" 클릭 → 3단계 자백 발화
5. 재판관의 수첩에 자백 자동 등록
6. 자백 후 동일 쟁점 추궁 → 짧은 재진술
7. 끼어들기 트리거 발동 확인 (evaluateTurnEvents 부활)

**2순위 — 잔존 결함 처리 (dev 보고 결과에 따라)**
- 결함 1·2: LLM 위반 발화 5건 정확 식별 (B-19 디버그 배지 활용)
- 결함 12: atom 회피로 다른 쟁점 누설 — ScriptedText 매칭 시점 추적
- 결함 28: 4-D 감정 폭발 클릭형 모달 미재현 dev 재현 시 확인

**3순위 — 사용자 검증 OK 후 푸시**
- `git push origin main` 명시 지시 후 진행

### 🆕 새 기획 핵심 (Phase C 적용 완료, 사용자 답변 5개)

| 단계 | 의미 (변경 후) |
|---|---|
| 침착 (0-30) | 그대로 |
| 동요 (30-60) | 그대로 |
| 격앙 (60-85) | 모순 추궁 시 75+에서 셧다운(2턴 lockout) 발동 가능 |
| **셧다운** | **격앙의 일시 lockout state. emotion과 별개. 모순 추궁의 패널티** |
| **체념 (85-100)** | **응답 가능 + 자백 모드** (이전 "응답 거부" 의미 폐기). 자백 유도 모달 표출 |

**핵심 의미 분리**:
- 셧다운 = `emotionalLockoutUntil > turnCount` 인 동안 차단
- 체념 = `emotion ≥ 85` (응답 가능, 자백 활성화)

자세한 내용: `tmp/new-design-emotion-redesign.md` 참조

### ⚠ 절대 하지 말 것 (이전 세션 교훈 + Phase C 추가)

1. tests/transcripts/* 자동 생성 파일 커밋 (git checkout으로 원복)
2. atom 데이터 직접 대량 생성 (GPT Pro 경유 필수)
3. 사용자 명시 없이 force push / reset --hard
4. **evaluateTurnEvents 호출 다시 차단** (Phase C 부활 후 D 옵션 패턴이 모달 자동 표출 막아줘 안전)
5. **emotion ≥ 85 = 응답 거부 가정** (Phase C 새 기획에서 emotion ≥ 85 = 체념 = 자백 모드 = 응답 가능)
6. **canInterrogate 함수를 새 가드에 사용** (emotion 기반 차단 의미 폐기. lockoutUntil만 가드)
7. GPT Pro 산출물을 검토 없이 적용 (CT가 한국어 + 게임 디자인 검증 필수)
8. 사용자 텍스트 부분 패턴 grep만 — 정확 텍스트로 grep 먼저

### 프로젝트 한 줄

솔로몬 법정 — AI 둘의 싸움을 인간 지혜로 재판하는 리플레이형 추리 게임 (PC Steam 프리미엄 선행, 활성 사건 spouse-01 / family-01 / friend-01, 나머지 81건은 Legacy)

### 이번 세션 핵심 완료 (3 커밋 — 푸시 안 됨)

```
db4b965 feat: Phase C 자백 시스템 재설계 + 결함 17·23·24·26·27 픽스
03b4ca8 feat: 체념 시스템 보강 + 재판관의 수첩 신설 + emergence 모달 정정 + D 옵션 + 후처리
74fc460 feat: ScriptedText 발화 톤 정정 (217건) + emergence hook 호칭 12건
```

상세는 `memory/session_handoff_20260425_phase_a_to_c.md` 참조.
