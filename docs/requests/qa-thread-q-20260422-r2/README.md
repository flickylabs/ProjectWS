# Thread-Q QA 2차 — 2026-04-22 (커밋 2dbfdd1)

## 대상 세션
**Codex** (로직·엔진·상태 검증)

## 검증 범위 (2차 집중)
1차 QA 이후 사용자 피드백 반영:
- **화자 판정 버그** — 시스템/가이드 메시지가 NPC 말풍선으로 출력되는 케이스 탐색
- **맥락 기반 진행 치밀 검증** — Phase 전환, LieState 전이, investigationStages 단계, 쟁점 emerge 체인의 정합성

## 입력
- [`메시지.md`](메시지.md) — **15라운드 + 확장 가능** 검증 가이드
  - Phase A 화자 판정 전수 (R1~R4)
  - Phase B 진행 정합성 (R5~R10)
  - Phase C 상태 전이 엣지 (R11~R13)
  - Phase D 빌드·최종 (R14~R15)

## 산출물
- `tmp/q-20260422-r2-r{N}.md` (라운드별)
- `tmp/thread-q-20260422-r2-report.md` (최종)

## 관련 세션
- [Thread-Q 1차](../qa-thread-q-20260422/) — 이미 CONDITIONAL PASS (커밋 `2dbfdd1`에 반영 완료)
- [Thread-QW 2차](../qa-thread-qw-20260422-r2/) — 텍스트·UX 측면 병행
