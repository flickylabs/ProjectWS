# Thread D — 77건 Phase 1/2 교정 완료 보고

> 일시: 2026-04-05
> 대상: 77건 × 2 Phase = 154파일
> 방법: GPT Pro 11배치 교정 → Claude Code grep 기계 검증 → 소스 적용

---

## 1. 작업 완료 요약

| 항목 | 결과 |
|------|------|
| 대상 파일 | 154파일 (77건 × Phase 1 + Phase 2) |
| GPT Pro 배치 | 11개 (배치1은 재검증, 배치2~11은 신규 교정) |
| 총 교정 건수 | **~1,030건** |
| 소스 적용 | 154파일 전부 `src/data/dialogues/phase{1,2}/` 에 적용 완료 |

---

## 2. 배치별 교정 통계

| 배치 | 사건 | 교정 건수 | 주요 reason |
|------|------|----------|------------|
| 1 (재검증) | spouse-02~08 | 55건 | 호칭 27, 스포일러 13, 톤수위 9 |
| 2 | spouse-09~12, family-02~05 | 107건 | 스포일러, 호칭, 해요체 |
| 3 | family-06~12 | 82건 | 스포일러, 해요체 |
| 4 | friend-02~08 | 86건 | 호칭 23, 스포일러-금액 17, anchorTruth 16 |
| 5 | friend-09~12, neighbor-02~05 | 99건 | anchorTruth 35, 해요체 22, 호칭 21 |
| 6 | neighbor-06~12 | 103건 | 해요체 30, 스포일러-금액 26, anchorTruth 19 |
| 7 | partnership-02~08 | 101건 | 해요체 37, anchorTruth 28, 자연스러움 17 |
| 8 | partnership-09~12, tenant-02~05 | 113건 | 해요체 59, 호칭 25, anchorTruth 17 |
| 9 | tenant-06~12 | 116건 | anchorTruth 33, 스포일러-금액 36, 날짜 10 |
| 10 | workplace-02~08 | 106건 | 자연스러움 32, 해요체 29, anchorTruth 28 |
| 11 | workplace-09~12 | 68건 | anchorTruth 41, 호칭 8, 해요체 7 |

---

## 3. 기계 검증 결과 (소스 적용 후)

| 검증 항목 | 패턴 | 결과 |
|-----------|------|------|
| 해요체 (`text` 필드) | 에요\|해요\|거예요\|했어요\|있어요\|같아요\|됐어요... | **0건** ✅ |
| 번역체 9패턴 | 했던 것이다\|한 바 있다\|것으로 보인다... | **0건** ✅ |
| "특정 X" / "사전 상의" | 특정 \|사전 상의\|사전 협의 | **0건** ✅ |
| system speaker "제 아내/남편" | multiline grep | **0건** ✅ |

### 참고
- `behaviorHint` 필드에 해요체 5건 잔존 (tenant-02, 03, 06) → 내부 메타데이터이므로 플레이어 비노출. 교정 불필요.

---

## 4. 발견 사항

### 4-1. workplace-07 / workplace-08 caseId 뒤바뀜 (기존 데이터 오류)
- `src/data/dialogues/phase1/workplace-07.json`에 `caseId: "case-work-08"` 내용
- `src/data/dialogues/phase1/workplace-08.json`에 `caseId: "case-work-07"` 내용
- Phase 2도 동일
- **GPT Pro(배치10)가 이를 감지**하고 사건 기준으로 정규화 완료
- 적용 시 GPT 정규화 결과를 그대로 반영 → **현재 파일명과 caseId가 정상 매핑됨**
- CT에서 추가 확인 필요: 이 뒤바뀜이 다른 시스템(엔진, 라우팅)에 영향이 있었는지

### 4-2. Stage-1 패턴 재확인
77건에서도 Stage-1과 동일 패턴이 대량 재발:
- anchorTruth 직접 노출: **~280건** (전체 교정의 ~27%)
- 해요체: **~234건** (전체의 ~23%)
- 호칭 위반: **~152건** (전체의 ~15%)
- 스포일러-금액: **~127건** (전체의 ~12%)

---

## 5. 변경 파일 목록

```
src/data/dialogues/phase1/{spouse,family,friend,neighbor,partnership,tenant,workplace}-{02~12}.json (77파일)
src/data/dialogues/phase2/{spouse,family,friend,neighbor,partnership,tenant,workplace}-{02~12}.json (77파일)
총 154파일
```

---

## 6. 산출물 위치

| 산출물 | 위치 |
|--------|------|
| GPT Pro 세션 (프롬프트+입력+출력) | `docs/ref/리뉴얼참고/thread-packages/thread-D/gpt-sessions/batch-{01~11}-*/` |
| 이 보고서 | `docs/ref/리뉴얼참고/thread-packages/thread-D/77expansion-final-report.md` |
| Stage-1 교정 내역 | `docs/ref/리뉴얼참고/thread-packages/thread-D/correction-log.md` |
| 기준본 (spouse-01 등 7건) | `src/data/dialogues/phase{1,2}/{case}-01.json` |
