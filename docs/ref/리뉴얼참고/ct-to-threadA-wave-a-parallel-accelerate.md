# CT → 스레드 A: Wave A 병렬 가속 지시

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09

---

## workplace-new-02 결과 확인

- stage3 validate: **PASS** (summary={})
- 증거 7개 (해금 3 / 잠금 4), 조합 3개, 쟁점 5개
- 구조 양호, 기존 11건과 동일 품질

**workplace-new-02 승인합니다.**

---

## 문제: 속도

1건에 40분 → 20건이면 13시간 이상. 순차 실행으로는 답이 없습니다.

## 지시: 나머지 9건 전부 병렬 실행

`run-parallel-case-batch.cjs`가 이미 있고, 11건 동시 실행 경험도 있습니다. **Wave A 나머지 9건을 한 번에 병렬 실행**해 주세요.

```bash
node scripts/run-parallel-case-batch.cjs --cases tenant-new-01,civic-new-10,partnership-new-10,spouse-new-06,neighbor-new-03,online-new-05,professional-new-01,friend-new-08,family-new-04
```

### 병렬 실행 시 주의

- per-case status가 `tmp/pipeline-status/*.json`에 분리 저장되므로 충돌 없음
- per-case log가 `tmp/pipeline-runs/*.log`에 분리 저장되므로 추적 가능
- 실패한 케이스만 개별 재실행하면 됨

### 완료 후 보고 형식

```
Wave A 병렬 배치 완료
- 성공: N건 (case-id 나열)
- 실패: N건 (case-id + 실패 이유)
- 전체 소요 시간: NN분
- batch status: tmp/pipeline-batch-status.json
```

### 이후 Wave B도 동일

Wave A 10건 완료 후, Wave B 10건도 동일하게 병렬 실행합니다. CT가 별도 지시 없이 바로 이어서 진행해도 됩니다.

---

## Wave A 전체 목록 (참고)

| # | caseId | 상태 |
|---|--------|:---:|
| 1 | workplace-new-02 | **완료 (PASS)** |
| 2 | tenant-new-01 | 병렬 실행 대상 |
| 3 | civic-new-10 | 병렬 실행 대상 |
| 4 | partnership-new-10 | 병렬 실행 대상 |
| 5 | spouse-new-06 | 병렬 실행 대상 |
| 6 | neighbor-new-03 | 병렬 실행 대상 |
| 7 | online-new-05 | 병렬 실행 대상 |
| 8 | professional-new-01 | 병렬 실행 대상 |
| 9 | friend-new-08 | 병렬 실행 대상 |
| 10 | family-new-04 | 병렬 실행 대상 |
