# CT 이관 — 04-25 최종 (사용자용 진행 가이드)

> **이 문서**: 사용자가 다음 CT와 작업 시작할 때 직접 검토용
> **메모리 버전**: `memory/session_handoff_20260425_ct_final.md` (CT 자동 인지)

---

## 🎯 현재 상태 (2026-04-25 세션 종료 시점)

### Git
- HEAD: `94e6116`
- 워킹 트리: clean (tmp/만 untracked)
- 빌드 + tsc: ✅ 통과
- **8 커밋 로컬 (push 안 됨)** — 사용자가 push 명시 시에만 진행

### 최근 커밋 (이번 세션)
```
94e6116 docs: Mock 정정 — PNG + 배지 + Session>사건 분리 (사용자 승인)
8525bec fix(docs): Mock 정밀 정정 — 실제 카피 + scale-balance + 사용자 스크린샷 버튼
9bc79cb fix(docs): Mock 시안 정확성 정정 — 실제 Phase 1~2 토큰/패턴/SVG
31eef7b docs: 디자인 방향 정정 — Phase 1~2 톤 일관 통일 + screen-mockups 신규
c5a15ff feat: 디자인 v2.0 시각 옵션 프리뷰 + 설정 풀스크린 1차 + GPT Pro 의뢰 가이드
338f9f3 fix: 도넛 SVG 사이즈 결함 + 캐릭터 카드 안쪽 패딩 + 감정 라벨
2cf1a5e feat: TC 3차 사이클 — 모순 시스템 통합 + UI 7건 + V2 패키지
a13d2aa feat: TC 2차 사이클 — 시스템 결함 픽스 9건 + UI 정비
```

---

## 📋 진행 가능한 작업 5개 (우선순위순)

### 🔴 1. Home 디자인 실제 구현 (Mock → React)

**Mock 위치**: `docs/design/screen-mockups.html` (사용자 승인 완료)

**구현 5개 화면**:
1. **HOME** — 솔로몬의 딜레마 + scale-balance.png 양옆 + 모드/정보 카드 (배지 정리)
2. **SESSION SELECT** — 12 세션 카드 그리드 (일러스트 + 진행 바 + 잠금/해금) — **여정 느낌 핵심**
3. **CASE BROWSER** — 헤더 컨텍스트 + 좌측 필터 + 카드 메타 배지
4. **INTRO** — PCIntroSlides 슬라이드 4종 (실제 카피)
5. **JUDGE DESK** — 3섹션 풀스크린 (프로필/9조각/6성향+퍼크) — **가장 큰 작업**

**예상 작업량**: HOME 0.5d / SESSION+CASE 1d / INTRO 0.3d / JUDGE DESK 1.5d = **총 ~3.5일**

**핵심 절대 규칙**:
- Phase 1~2 톤 변경 X (다크 우드 + 골드)
- 임의 카피 X (코드 실제 텍스트만)
- 이모지 X (SVG/PNG만)

### 🟡 2. dev 검증 결과 받기 + 픽스 사이클

**TC 가이드**: `tmp/TC-2nd-cycle-detailed.md`

**검증 미수령 결함 (총 18+건)**:
- 도넛 위치/크기 (방금 SVG 결함 픽스됨)
- 메모 핀 완전 제거
- 모순 시스템 통합 효과 (Path A 비활성화)
- 스크립트 통합 변경 ('저희 형 전화번호입니다…')
- 17개 추가 픽스

**진행 방식**: 사용자 dev 진행 → 결함 보고 → 즉시 픽스 사이클

### 🟠 3. S5 자백 디스패처 회귀 (dev 재현 필요)

**결함**: 캐릭터B에게 fact_pursuit → 답변 없이 종료

**현재 상태**: 4가지 가능 path 분석 완료, 추측 기반 픽스 위험. **dev 재현 케이스 받은 후** 정확한 path 픽스.

### 🟢 4. GPT Pro V2 데이터 의뢰 (장기)

**의뢰 가이드**: `gpt-pro-runs/contradiction-events-v2/HOW-TO-SUBMIT.md`

**진행 방식**:
1. 사용자가 GPT Pro에 spouse-01 spec yaml 의뢰 (메시지 형식 준비됨)
2. 산출물 받으면 Claude에게 전달
3. Claude가 lint R1~R7 + 한국어 보정 + JSON 적용
4. 마이그레이션 M1~M7 (~10시간)

### 🔵 5. Phase 3a 중재 / 설정 8개 카테고리 / 기타

- Phase 3a 중재: 컬러·버튼만 토큰 치환 (S~M)
- 설정 8개 카테고리 옵션 채우기 (M)
- ScriptedText 모드 핫바 락 (S)

---

## 🧠 다음 CT가 알아야 할 핵심 결정

### 디자인
- **Phase 1~2 톤 = 절대 기준** (다크 우드 + 골드, 변경 X)
- **갈아엎기 = UX 구조 + 컴포넌트 레이아웃** (톤은 통일)
- **시각 옵션 4종 = 폐기** (`design_v2_tone_unified.md` 참조)
- **갈아엎기 대상**: Intro / Home / 사건 선택 / Judge Desk / 설정만
- **Phase 3 / 판결 / 결과**: 컬러·버튼만 치환
- **Phase 1~2**: 결함 픽스만

### 시스템
- **모순 = 단일 캐릭터 진술 변화만** (Path B만 사용)
- **양측 주장 충돌 = '의견 충돌'** (ConflictEventV2, V2 도입 후)
- **Path A 비활성화** (`checkContradiction` return null) — 함수 본문 보존 (V2에서 재활용)
- **메모 핀 = 폐기** (autoPin 시각화 재구현 X)
- **셧다운 = 격앙(75-84) + 모순 추궁 lockout / 체념(85+) = 자백 모드**
- **emotion ≥ 85 = 응답 가능** (이전 응답 거부 의미 폐기)

### 호명/카피
- 임의 카피 사용 X
- 카피 위치:
  - INTRO: `pcHomeShared.ts:130 PC_HOME_INTRO_SLIDES`
  - HOME: `PCHomeScreen.tsx:199-205` ('솔로몬의 딜레마' / 'COURT SIMULATION GAME' / '현대판 솔로몬이 되어 판결을 내려보세요.')
- 키비주얼: `/public/icons/ornament/scale-balance.png` + `/public/icons/session/{type}.png` + `/public/icons/emblem/{title}.png`

---

## 🚨 절대 하지 말 것 (10대 금기)

1. Phase 1~2 톤 변경 X
2. 임의 카피 사용 X
3. 이모지 사용 X (SVG/PNG만)
4. Path A `checkContradiction` 본문 삭제 X
5. 메모 핀 시각화 재구현 X
6. 양측 주장 충돌을 모순으로 처리 X
7. 시각 옵션 4종 다시 제안 X
8. GPT Pro 산출물 검토 없이 적용 X
9. 사용자 명시 없이 force push / reset --hard X
10. tests/transcripts/* 자동 생성 파일 커밋 X

---

## 📁 핵심 산출물 위치

### 디자인
- `docs/design/screen-mockups.html` — **Mock 5화면 (승인됨, 구현 기준)**
- `docs/design/PC-UI-DESIGN-SYSTEM.md` — v1.0 가이드
- `docs/design/PC-UI-DESIGN-SYSTEM-V2.md` — v2.0 가이드 (옵션 4종 폐기, 일관 통일)
- `docs/design/PC-SCREEN-DIAGNOSIS.md` — 11화면 진단
- `docs/design/v2-options-preview.html` — 폐기 (안내만)

### GPT Pro 의뢰
- `gpt-pro-runs/contradiction-events-v2/README.md`
- `gpt-pro-runs/contradiction-events-v2/HOW-TO-SUBMIT.md` — **사용자가 바로 보낼 메시지**
- `01-types.md` / `02-spec-spouse-01.yaml` / `03-spec-family-01.yaml` / `04-spec-friend-01.yaml` / `05-lint-rules.md`

### TC 검증
- `tmp/TC-2nd-cycle-detailed.md` — 9건 + 부속 (사용자 dev용)
- `tmp/TC-phase-A-G.md` — Phase A~G 검증 가이드 (이전 세션)
- `tmp/SESSION-3CYCLE-COMPLETE.md` — 3차 사이클 보고서

### 핵심 코드 (시스템 결함 픽스)
- `src/engine/gameEventTriggerEngine.ts` — Path A 비활성화
- `src/engine/scriptedTextLoader.ts` — target 필터 + hard block 완화
- `src/store/useGameStore.ts` — evaluateTurnEvents
- `src/store/slices/evidenceSlice.ts` — lastInvestigateUnlocks
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx` — modal contrast
- `src/components/pc/layout/PCInteractionPanel.tsx` — contrast 필드
- `src/components/pc/hotbar/PCBottomDock.tsx` — 도넛 + 핫바 락
- `src/components/pc/settings/PCSettingsPanel.tsx` — 풀스크린 1차

### 메모리
- `memory/session_handoff_20260425_ct_final.md` — CT 이관 (현재 최신)
- `memory/design_v2_tone_unified.md` — 톤 일관 통일 결정
- `memory/design_contradiction_system_unified.md` — 모순 시스템 통합
- `memory/design_bubble_memo_pin.md` — 폐기 결정
- `memory/MEMORY.md` — 인덱스 갱신됨

---

## 🎬 다음 CT 첫 턴 흐름

1. **메모리 정독**: `MEMORY.md` → `session_handoff_20260425_ct_final.md`
2. **Mock 확인**: 브라우저로 `docs/design/screen-mockups.html` 열기
3. **사용자 인사** + 다음 작업 의향 확인:
   - (a) Home 실제 구현 시작 (어느 화면부터)
   - (b) dev 검증 결과 받기 (TC 픽스 사이클)
   - (c) S5 자백 디스패처 (dev 재현 후)
   - (d) GPT Pro V2 의뢰 진행
   - (e) 다른 우선순위

### 권장 진행 순서 (제 추천)
1. **dev 검증 먼저** — 누적된 픽스 18+건 검증 완료 (안정화)
2. **HOME 구현** — Mock → React 1화면씩 (체감 빠름)
3. **GPT Pro 의뢰 병행** — 사용자가 GPT Pro로, Claude는 Home 작업
4. **Judge Desk** — 가장 큰 화면 (마지막)
5. **Phase 3a 중재 + 설정 8개** — 마무리

---

## ⚠ 컨텍스트 부담 큰 영역 (다음 CT 주의)

### 시간 많이 쓴 작업 (실패 후 재작업)
1. **Mock 시안 작성 4회** — 매번 사용자 정정. 학습:
   - Phase 1~2 정확한 카피/키비주얼/버튼 사용
   - 짐작 금지
   - SVG selector specificity 주의

2. **모순 시스템 분석** — Path A vs Path B 이원화 풀이

3. **디자인 가이드 v2.0 옵션 4종** — 사용자 의도 잘못 해석. 톤 통일이 정답

4. **도넛 그래프** — `.char-face svg` selector가 도넛도 강제 → `:not()` 필요

### 학습 정리 (다음 CT 동일 실수 방지)
- 사용자 의도 명확히 파악 후 작업
- 코드 실제 텍스트/패턴 그대로 사용 (짐작 X)
- CSS specificity 충돌 주의
- Mock 만들 때 시각 정확성보다 **실제 코드 패턴 재현**이 우선
