# C스레드 → 다음 스레드 인수인계 (C2)

> 작성일: 2026-04-02
> 이전 문서: thread-handoff-C.md

---

## 1. V1 배치 현황 — 완료

- 84개 사건 전체 등록 + 검증 + 교정 완료
- tells-beats 재생성 18건 완료 (round-1 ~ round-6)
- 최종 커밋: `e1d3556`
- 미커밋 변경:
  - 정밀검수 교정 136건
  - "다만" 과용 60건 제거
  - round-6 교체

---

## 2. V2 방향 변경

- **beats-v2-full 사용 안 함** (보존만)
- **structure-v2만 사용** → V2 메커닉 활성화
- LLM이 대사 생성, 엔진이 톤/층위/모드 제어

---

## 3. V2 structure-v2 검증 현황

84건 전수 검증 완료.

### 정규화 완료

| 항목 | 건수 |
|------|------|
| caseId 하이픈 정규화 | 16파일 |
| core층 S4 상향 | 51건 |
| clarifyOutcomeLabel | 104건 |
| atomId V1 매핑 | 1,357건 (64사건) |

### 미해결

- **red_herring 부재 41건** → GPT 재생성 준비 완료 (`gpt-batch-v2-regen/` 11라운드)
- **spouse-01, family-01 atomId 매핑 불가** — V1 atoms 파일 부재

---

## 4. 다음 스레드에서 할 일

1. V2 red_herring 재생성 GPT 실행 (11라운드)
2. 재생성 결과 교체 + 검증
3. spouse-01, family-01 atomId 해결
4. 전체 커밋 + A스레드 2차 검증 전달
5. V2 등록 모듈 생성 + Store 연결 (structure-v2를 코드에 통합)

---

## 5. 파일 위치 요약

```
V1 배치 데이터:       docs/ref/리뉴얼참고/gpt-batch/
V1 재생성:           docs/ref/리뉴얼참고/gpt-batch-regen/
V2 배치 데이터:       docs/ref/리뉴얼참고/gpt-batch-v2/round-{01~21}/output/
V2 재생성 준비:       docs/ref/리뉴얼참고/gpt-batch-v2-regen/regen-round-{01~11}/
등록 모듈:           src/data/claimPolicies/
Store:              src/store/useGameStore.ts
정규화 스크립트:      tests/normalize-gpt-batch.cjs
atomId 매핑 스크립트:  scripts/map-atom-ids.py
교정 가이드:         docs/ref/리뉴얼참고/gpt-batch/correction-guide.md
V2 검증 보고서:       docs/ref/리뉴얼참고/gpt-batch-v2/V2-structure-검증-보고서.md
V2 beats 검증 보고서:  docs/ref/리뉴얼참고/gpt-batch-v2/V2-검증-보고서.md
스레드 A 연동 문서:    docs/ref/리뉴얼참고/thread-sync-V2-requirements.md
```

---

## 6. 참고 문서 목록

- `thread-handoff-B.md` — 원본 배치 계획
- `thread-handoff-C.md` — C스레드 초기 인수인계
- `gpt-regen-needed.md` — V1 재생성 목록
- `correction-guide.md` — V1 대사 교정 기준
