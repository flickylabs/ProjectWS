# Thread-QW-Cross (Codex) 시작 메시지

> **사용자가 Codex 새 스레드에 던질 메시지** (아래 박스 내용 그대로 복사 + `QA-thread-QW-codex-cross.md` 파일 첨부)

```
첨부한 QA-thread-QW-codex-cross.md 파일을 읽고 작업을 진행해줘.

100회 작업 (Part A 50 + Part B 50):
- Part A: 기존 ClaudeCode가 수행한 Thread-QW QA 50회 결과를 cross-check
  - 일치/부분 일치/다른 발견 보고
  - ClaudeCode 결과 위치: tmp/QA-QW-spouse-01-{report.md,findings.json,audit.cjs}
- Part B: Codex의 통계 분석 강점 활용한 추가 50회
  - trigram-overlap 전수 / 캐릭터 voice 통계 / Truth Throttle 곡선 / 신규 4 채널 정량 / 종합 우선순위

산출물:
- tmp/QA-QW-codex-cross-report.json (raw)
- tmp/QA-QW-codex-cross-summary.md (요약 + 권장 patch P0/P1/P2)

규칙:
- 원본 spouse-01.json 수정 X (메인 검증 후 적용)
- 활성 3건만 (spouse-01 / family-01 / friend-01) — _LEGACY 무시
- 잘못 패턴 #6 (보정 = 9차원 맥락-의미 정확성) 일관 적용
- 메인 13 patch + QA 9 patch 이미 적용된 현재 상태 검증
```

## 별도 첨부 파일

GPT Pro Codex 세션에 첨부:
1. **`tmp/QA-thread-QW-codex-cross.md`** (작업 명세 본문)
2. (선택) **`tmp/QA-QW-spouse-01-report.md`** — ClaudeCode 결과 (cross-check base)
3. (선택) **`tmp/QA-QW-spouse-01-findings.json`** — ClaudeCode raw findings
