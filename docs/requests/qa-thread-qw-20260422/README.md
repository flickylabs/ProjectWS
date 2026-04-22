# Thread-QW QA — 2026-04-22 (커밋 d82a0e9)

## 대상 세션
**Claude Code** (스크립트·콘텐츠·UX 품질 검증 담당) — **신규 세션으로 실행**

## 검증 범위
- spouse-01 금액 재배치(B 2천만 개인 / A 3천만 공동 적금 위임장 조작) 전수 반영 확인
- 조합 결과 UX 텍스트 (cleanOutputLabel, translateLeadLabel 결과물, discoveryText 자연스러움)
- 15개 dc-\* judgeHint (3건 × 5) 자연스러움/구체성
- 조합 재판관 코멘트 (combinationComments.ts 18개)
- 증거 단계별 뷰어 텍스트 (spouse-01 e-1, e-4)
- 증인 해금 시스템 메시지/잠김 UI 문구
- v3 끼어들기/감정 폭발 1인칭 대사 품질
- 조사 단계 텍스트 메타 누출 제거 확인
- 금지 패턴 전수 스캔

## 입력
- [`메시지.md`](메시지.md) — **22라운드 + 확장 가능** 검증 가이드 + 금지 패턴 자동 스캔 스크립트 포함
  - Phase A 정적 전수 스캔 (R1~R6)
  - Phase B UX 신규 텍스트 심층 (R7~R11)
  - Phase C 사건별 심층 (R12~R17)
  - Phase D 특수 상황·누락 (R18~R20)
  - Phase E 리그레션 + 최종 보고 (R21~R22)
  - 파생 이슈 발견 시 R23+ 추가 허용

## 산출물
- `tmp/qw-20260422-r{N}.md` (라운드별)
- `tmp/thread-qw-20260422-report.md` (최종)

## 관련 세션
- [Thread-Q 2026-04-22](../qa-thread-q-20260422/메시지.md) — 로직/엔진/상태 담당

## 주의
- **신규 세션**으로 시작 (기존 QW 세션 컨텍스트 없음)
- 과거 spouse-01 금액 체계(B 3천만, A 2천만)를 기준으로 FAIL 처리 금지 — 새 체계가 정답
- 3사건(spouse-01/family-01/friend-01)만 검증. 나머지 81건은 Legacy
