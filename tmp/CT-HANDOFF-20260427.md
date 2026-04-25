# CT 이관 — 04-27 (사용자용 진행 가이드)

> **이 문서**: 사용자가 다음 CT와 작업 시작할 때 직접 검토용
> **메모리 버전**: `memory/session_handoff_20260427.md` (CT 자동 인지)

---

## 🎯 현재 상태 (2026-04-27 세션 종료 시점)

### Git
- HEAD: `b38461a`
- 워킹 트리: clean
- 빌드 + tsc: ✅ 통과
- **12 커밋 로컬** — push 신호 시에만 진행

### 최근 12 커밋 (이번 세션)
```
b38461a feat(pc-layout): drawer Portal 마이그레이션 → 수첩 캐릭터 끝까지 확장
1be92e8 docs(plan): 재판관 메시지 전체 재작성 작업 계획서
8633d19 fix(pc): 수첩 잘림 + 새 쟁점 디자인 = 모순 통일
04a924c fix(pc-layout): C안 후속 — drawer overflow 결함 + 수첩 200 고정 원복
1c512ad fix(pc-layout): 좌측 패널 layout 근본 점검 (C안)
69d2c1f fix(pc): 수첩 240→200 원복 — 탑바 밀림
aec1cfa fix(pc): 수첩 디자인 = 관찰 통일 + 탑바 밀림 픽스
8903ef3 fix(pc): 추궁 흐름 호명 라우팅 + 'B측' 표현 정정
94b8823 docs(tc): 마스터 TC 인덱스 — 4개 가이드 + 누적 30+건
367bbff feat(pc-ui): 일관성 1차 정비 + family/friend GPT V2 적용
a4d0dfb feat(pc-ui): 디자인 리뉴얼 1차 + Phase 3a 중재 + 설정 9 카테고리 + ScriptedText 핫바 락
950eb76 docs(gpt-pro): V2 의뢰 폴더 3종 셋업
```

---

## 📋 다음 세션 진행 가능 작업

### 🔴 1. 재판관 메시지 v3 — spouse-01 시놉시스 작성 (1순위)

**배경**: 사용자 핵심 통찰 "쟁점-캐릭터-질문-답변 매핑이 명확해야 한다."
V2 패턴(분리 entry)으로 의뢰하면 또 같은 결함 발생.

**작업 흐름** (Phase 1~6):
1. **메인 — spouse-01 시놉시스** (truth_arc + scenes 골격)
2. **사용자 검수** (truth 곡선 / scene 의도 정확성)
3. **family/friend 시놉시스** 동일 패턴
4. **GPT Pro 의뢰 패키지 v3** (scene 기반)
5. **사용자 GPT Pro 3 세션 병렬**
6. **★ ClaudeCode 검수** (Agent 3개 + 메인 통합)
   - lint R1~R7 + R8(scene 일관성) + R9(질문-답변 매핑) + R10(archetype 부합)
   - 한국어 보정
   - scene flow 평가
7. **적용 + dev 검증**

**예상 사이클**: 4~5
**자세한 가이드**: [tmp/PLAN-judge-message-rewrite.md](tmp/PLAN-judge-message-rewrite.md)

### 🟡 2. dev 검증 결과 받기

dev에서 시각 확인:
- [ ] drawer 3종 (사건 타임라인 / 발언노트 즐겨찾기 / 관찰 전체보기) 정상
- [ ] 수첩 캐릭터 카드 끝까지 확장
- [ ] 탑바 정상

누적 미검증 30+건: [tmp/TC-master-index.md](tmp/TC-master-index.md)

### 🟠 3. Profile UI/UX (HOME → 내 정보)

dev 시각 결함 보고 시 핀포인트 픽스. 메모리 보존:
- view='profile' 4 탭
- pc-desk-grid 기반 (이미 토큰화 양호)

### 🟢 4. M1~M7 V2 엔진 연동 (장기)

GPT V2 데이터 3건 적용 완료. 엔진 어댑터 미연동.

---

## 🚨 절대 금기 (11가지)

1. Phase 1~2 톤 변경 X
2. 임의 카피 사용 X
3. 이모지 사용 X
4. Path A 비활성화 코드 본문 삭제 X
5. 메모 핀 시각화 재구현 X
6. 양측 주장 충돌을 모순으로 처리 X
7. 시각 옵션 4종 다시 제안 X
8. GPT Pro 산출물 검토 없이 적용 X
9. **PCCaseBrowser zigzag/브리핑 시스템 갈아엎기 X** (사용자 04-26 명시)
10. **drawer를 좌측 패널 자식으로 다시 옮기기 X** (Portal 패턴 유지)
11. **재판관 메시지를 V2 패턴(단발 entry)으로 의뢰 X** (scene 기반 v3 사용)

---

## 📁 핵심 산출물 위치

### 디자인 / 작업 계획
- `tmp/PLAN-judge-message-rewrite.md` — **재판관 메시지 v3 계획 (1순위 입력)**
- `tmp/CT-HANDOFF-20260427.md` — 이 파일
- `tmp/TC-master-index.md` — 누적 30+건 TC 인덱스
- `tmp/TC-design-renewal-20260426.md` — 이번 세션 TC

### 핵심 코드 (이번 세션)
- `src/components/pc/icons/PCSvgIcon.tsx` — i-scale PNG 분기
- `src/components/pc/observation/JudgeNotebookSection.tsx` — 관찰 동일 클래스
- `src/components/pc/observation/JudgeObservationHistoryDrawer.tsx` — Portal
- `src/components/pc/panels/PCLeftPanel.tsx` — Portal (timeline)
- `src/components/pc/panels/PCImportantNotesSection.tsx` — Portal (fav-notes)
- `src/components/pc/settings/PCSettingsPanel.tsx` — 9 카테고리
- `src/components/phase/Phase6_Mediation.tsx` — Phase 3a CSS만
- `src/hooks/useActionDispatch.ts` — 호명 라우팅 + 'B측' + ScriptedText 락
- `src/engine/scriptedTextLoader.ts` — getScriptedJudgeContradiction target
- `src/data/claimPolicies/{spouse|family|friend}-01-game-events-v2.json`
- `pc-prototype/index.html` — i-gear SVG
- `src/app/pc.css` — 다수 영역 정비

### 메모리 (이번 세션)
- `memory/session_handoff_20260427.md` — CT 이관 (현재 최신)
- `memory/MEMORY.md` 인덱스 갱신

---

## 🎬 다음 CT 첫 턴 흐름

1. **메모리 정독**: `MEMORY.md` → `session_handoff_20260427.md`
2. **계획서 정독**: `tmp/PLAN-judge-message-rewrite.md` (재판관 메시지 v3)
3. **사용자 인사** + dev 결함 보고 받기
4. **다음 작업 의향 확인**:
   - (a) spouse-01 시놉시스 작성 시작 (1순위 권장)
   - (b) Profile UI/UX (dev 결함 발견 시)
   - (c) M1~M7 V2 엔진 연동 (장기)
   - (d) 다른 결함 우선

### 권장 진행 순서
1. **spouse-01 시놉시스** — 메인이 작성, 사용자 검수
2. **family/friend 시놉시스** — 패턴 적용
3. **GPT Pro 의뢰 패키지 v3** — scene 기반
4. **사용자 GPT Pro 3 세션** — 병렬 실행
5. **★ ClaudeCode 검수** — Agent 3개 lint + 한국어 보정
6. **적용 + dev 검증**

---

## ⚠ 컨텍스트 부담 큰 영역 (다음 CT 주의)

### 시간 많이 쓴 작업
1. **수첩/탑바/drawer layout 점검** — 4 사이클 (이번 세션 b38461a로 근본 해결)
2. **추궁 모달 호명 라우팅** — 코드 픽스, 데이터(judge_contradiction 채널) 점검 다음 사이클
3. **Mock vs 실제 시스템 보존** — PCCaseBrowser zigzag 보존 (사용자 지시)

### 학습 정리
- layout 결함 시 부모 컨테이너부터 점검 (drawer overflow / grid template / flex grow)
- GPT Pro 의뢰는 분량보다 시퀀스 일관성 핵심
- ClaudeCode 검수는 사용자 명시 요청 (lint + 보정 + scene flow)

---

## 📌 사용자 요청 미반영 (다음 세션 우선)

1. **재판관 메시지 전체 재작성** — spouse-01 시놉시스부터 시작
2. **dev 결함 보고** — 사용자가 dev 시각 확인 결과 다음 세션에 보고 예정
