# 3차 사이클 자동 진행 — 작업 완료 보고서 (확장)

> ✏️ **3차 사이클 후속 작업 추가** (4차 사이클로 이어짐):
> 사용자 결정 정리에 대한 답변 + 시각 옵션 프리뷰 + GPT Pro 가이드 + 설정 풀스크린 + 도넛 SVG 사이즈 결함 픽스

---

## 🆕 후속 사이클 추가 작업

### A. 도넛 SVG 사이즈 결함 픽스 (긴급)
- **결함**: `body.pc-mode .pc-play-hbar .char-face svg` selector + !important가 도넛 SVG도 45px로 강제 축소시키고 있었음
- **픽스**: `:not(.char-emo-donut)`로 selector 좁힘
- 부수: 캐릭터 카드 padding 8 18px / gap 14px / 감정 라벨 9→12px
- 커밋: `338f9f3`

### B. 디자인 v2.0 시각 옵션 HTML 프리뷰
- 위치: `docs/design/v2-options-preview.html`
- 4가지 옵션을 한 화면에 비교: Polished Wood / Cinematic Court / Western Court / Quiet Authority
- 각 옵션마다 컬러 팔레트 + 컴포넌트 미리보기 (말풍선/시스템 메시지/버튼/캐릭터 카드)
- 사용자가 브라우저로 열어서 결정 가능

### C. GPT Pro 의뢰 가이드
- 위치: `gpt-pro-runs/contradiction-events-v2/HOW-TO-SUBMIT.md`
- 사용자가 GPT Pro에 바로 보낼 메시지 형식
- 첨부 파일 3개 (01-types.md / 02-spec-{caseId}.yaml / 05-lint-rules.md)
- 산출물 받은 후 검수 절차 (lint R1~R7 + 한국어 보정)
- Claude에게 보낼 메시지 형식

### D. 설정 풀스크린 1차 구조
- `src/components/pc/settings/PCSettingsPanel.tsx` 전면 재작성
- 모달 → 풀스크린 (좌측 사이드바 + 우측 메인)
- 9 카테고리 사이드바 (화면/오디오/게임플레이/데이터/언어/접근성/키보드/계정/정보)
- **화면**: 기존 해상도 옵션 + 5개 예정 옵션 placeholder (풀스크린/UI 스케일/FPS/모션 감소/그레인)
- **정보**: 버전/크레딧/라이선스
- 7개 카테고리: '준비 중' placeholder
- ESC 키 + 닫기 힌트 + 좁은 화면 사이드바 가로 폴백
- 커밋 예정

### E. Judge Desk + Phase 3a — 다음 사이클로 미룸
- **이유**: v2.0 시각 옵션 선택 후 진행이 효율적 (옵션마다 컬러/레이아웃 다름)
- 사용자가 옵션 선택 + Judge Desk 정보 우선순위 (현재 코드 기준 = 9조각/6성향/15퍼크) 확인 후 진행

---

## 📊 3차+후속 사이클 누적

### 커밋 (4건)
```
HEAD       (예정) feat: 디자인 v2.0 시각 옵션 프리뷰 + 설정 풀스크린 + GPT Pro 가이드
338f9f3    fix:   도넛 SVG 사이즈 결함 + 캐릭터 카드 안쪽 패딩 + 감정 라벨
(이전)     feat:  TC 3차 사이클 — 모순 시스템 통합 + UI 7건 + V2 패키지 + 가이드 v2.0
a13d2aa    (이전) feat:  TC 2차 사이클 — 시스템 결함 픽스 9건 + UI 정비 + 디자인 가이드
```

---

# 3차 사이클 자동 진행 — 작업 완료 보고서 (원본)

> **작업 시간**: 사용자 자리비움 동안 자동 진행
> **상태**: 모든 작업 완료. 빌드 + tsc 통과. 커밋 1건 추가 예정.

---

## ✅ 완료 작업 요약 (12건)

### 1. 시스템 결함 통합 (가장 중요)
- **Path A 비활성화** — `gameEventTriggerEngine.checkContradiction` 첫 줄 `return null`
  - 양측 사전 작성 statementA/B 스포일러 누설 즉시 차단
  - false positive '진술이 엇갈렸다' 차단
  - '판단 충돌' 팝업 반복(기타3) 자동 해결
  - Path B (notifyLieTransition contradictionMeta) 단일 모순 path로 운영
  - 함수 본문 보존 (M단계에서 `checkConflict()`로 재활용 예정)

### 2. UI 빠른 픽스 (5건)
| # | 작업 | 결과 |
|---|---|---|
| 도넛 | 위치/사이즈 재정렬 | char-face 외부 ring (inset -4px, viewBox 74×74). portrait 안 가림 |
| N9 | 수첩 영역 박스화 | 관찰과 동일 구조 (헤더 + 미니 타임라인 + 메인 슬롯). 클릭 시 PCInteractionPanel 토스트 + 발화 점프 |
| N10 | 증인소환 아이콘 | stroke 추가 두꺼움 (사용자 요청 2배 적용) |
| N11 | '처리됨' → '확인 완료' | 라벨 1줄 변경 |
| N12 | 조합 알럿 SVG | ✨/⚡ 이모지 → i-link / i-bolt |

### 3. 기타 결함
- **기타1** (동일 답변 회피로 스포일러): hard block 완화 (최근 3턴 → 직전 1턴만 차단)
- **기타3** (판단 충돌 반복): Path A 비활성화로 자동 해결

### 4. 분석 산출물 작성
- **GPT Pro 의뢰 패키지**: `gpt-pro-runs/contradiction-events-v2/` 6개 파일 (V2 타입 + spouse/family/friend-01 spec + lint 규칙)
- **디자인 가이드 v2.0**: `docs/design/PC-UI-DESIGN-SYSTEM-V2.md` (~25KB, 시각 옵션 4종 + UX 변경 + 설정 9카테고리 + 풀스크린 + 화면별)

---

## 📋 협의 내용과 다른 사항 / 특이사항

### 1. Path A 처리 방식 변경
- 분석 에이전트 권장: **단계적 폐기 6-8주**
- 실제 적용: **즉시 비활성화**
- 이유: 단계적 폐기는 사용자 결함(스포일러) 즉시 차단 안 됨
- 함수 본문은 보존 — M단계에서 `opinion_conflict` 트리거로 재활용 가능

### 2. GPT Pro 의뢰 대상 21건 → 3건
- 분석 에이전트 초안: 21사건 (활성 사건 정의 혼동)
- 메모리 정책 (`project_active_cases.md`) 따라 활성 3건 한정
- 작업 시간 21시간 → 3시간으로 단축

### 3. 디자인 가이드 v2.0 분량 25KB
- 권장은 10KB였으나 5가지 카테고리(시각 4종 / UX 변경 / 설정 9 / 풀스크린 / 화면별)를 모두 결정 가능한 형태로 담느라 증가
- 매트릭스/표 위주라 의사결정에 적합

### 4. '의견 충돌' (ConflictEventV2) — V2 단계로 미룸
- 현재 임시 조치: 의견 충돌 모달 자체 미발동 (Path A 비활성화)
- 사용자 의도 (필요 상황 한정 발동 + 효과 동반)는 V2 도입 시 구현 (`checkConflict()`)

### 5. N9 수첩 — 리스트 → 메인 슬롯 단순화
- 사용자 의도 ("관찰과 동일 구조") 정확히 반영
- 기존 entry 리스트 → 미니 타임라인 도트로 표시
- 메인 슬롯에 가장 최근 항목 큰 카드
- 기존 `.pc-notebook-item` CSS는 unused 상태 보존 (회귀 위험 0)

### 6. 핫바 락 — LLM 모드만 (1차 사이클부터)
- LLM 응답 진행 중에만 핫바/단축키 락
- ScriptedText 모드는 별도 (응답 즉시라 우선순위 낮음)
- 추가 락은 `isDispatching` store state 신설 필요 (다음 사이클)

### 7. 미발견 텍스트 처리
- "그 판단이 지금도 마음에 남습니다." — 사용자가 이전 응답에서 "네가 이미 수정해서 없는 거야" 명시
- 처리 완료된 것으로 간주

---

## 🔴 사용자 dev 재검증 권장 항목

### Phase A — 1·2차 사이클 적용 (이미 dev 검증 완료)

### Phase B — 3차 사이클 신규 적용
1. **도넛**: 캐릭터 프로필 외부에 ring 정확히 표시. portrait 가림 없음
2. **'진술이 엇갈렸다' 띠 사라짐**: Path A 비활성화로 더 이상 발동 X. '추궁하기' 띠만 남음
3. **모순 모달**: PCDialogueLog '추궁하기' 버튼 클릭 시 PCInteractionPanel feature variant (vs 구도)
4. **수첩 영역**: 박스 형태 (관찰과 동일). 빈 상태 placeholder 가독성. entry 등록 시 메인 슬롯 + 미니 타임라인 도트
5. **증인소환 아이콘 두께**: 다른 5개 아이콘과 동일 두께
6. **조합 알럿 SVG**: 자동 매칭 라벨에 i-link 아이콘, 비용에 i-bolt 아이콘 (이모지 X)
7. **'처리됨' → '확인 완료'**: 모순 감지 모달 처리 후 띠 라벨
8. **동일 답변 허용**: 사실 추궁 반복 시 동일 변종 다시 등장 가능 (스포일러 X)
9. **'판단 충돌' 팝업**: 발동 X (Path A 비활성화)

---

## 🟡 사용자 결정 필요 사항

1. **디자인 v2.0 시각 스타일 옵션 선택** — 1(Polished Wood)/2(Cinematic Court)/3(Western Court)/4(Quiet Authority) 중
2. **M단계 GPT Pro 의뢰 진행 여부** — 시점 + 사건 우선순위
3. **F 큰 작업 진행 순서** — Phase 3a 중재 / 설정 / Judge Desk

---

## 📦 빌드 상태

- `npx tsc -b --force`: ✅ 통과
- `npm run build`: ✅ 통과 (2.31s, dist 생성)
- 워킹 트리: 모든 변경 적용. 커밋 진행 예정

## 📁 신규 파일 (8건)

- `gpt-pro-runs/contradiction-events-v2/README.md`
- `gpt-pro-runs/contradiction-events-v2/01-types.md`
- `gpt-pro-runs/contradiction-events-v2/02-spec-spouse-01.yaml`
- `gpt-pro-runs/contradiction-events-v2/03-spec-family-01.yaml`
- `gpt-pro-runs/contradiction-events-v2/04-spec-friend-01.yaml`
- `gpt-pro-runs/contradiction-events-v2/05-lint-rules.md`
- `docs/design/PC-UI-DESIGN-SYSTEM-V2.md`
- `tmp/SESSION-3CYCLE-COMPLETE.md` (이 파일)

## 📁 수정 파일 (8건)

- `src/engine/gameEventTriggerEngine.ts` (Path A 비활성화)
- `src/engine/scriptedTextLoader.ts` (hard block 완화)
- `src/components/pc/observation/JudgeNotebookSection.tsx` (전면 재작성)
- `src/components/pc/layout/PCDialogueLog.tsx` (N11 라벨)
- `src/components/pc/panels/PCRightPanel.tsx` (N12 SVG)
- `src/components/pc/hotbar/PCBottomDock.tsx` (도넛 viewBox 74×74)
- `src/app/pc.css` (도넛 외부 ring + 수첩 박스화 + 조합 alert SVG 정렬)
- `pc-prototype/index.html` (i-witness 두께)

## 🧠 메모리 갱신

- `memory/design_contradiction_system_unified.md` (신규) — 모순 시스템 통합 결정
- `memory/session_handoff_20260425_3cycle.md` (신규) — 3차 사이클 종합
- `memory/MEMORY.md` (인덱스 갱신)
