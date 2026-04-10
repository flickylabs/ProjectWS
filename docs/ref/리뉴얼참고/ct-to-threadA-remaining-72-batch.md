# CT → 스레드 A: 나머지 72건 일괄 생성 요청

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 선행 조건: 생성기 품질 고도화 (`ct-to-threadA-generator-quality-upgrade.md`) 완료 후 실행

---

## 배경

스레드 E가 기획한 신규 100건 중 **28건은 이미 생성 완료**되었습니다. 나머지 **72건**을 고도화된 생성기로 일괄 생성합니다.

---

## 이미 생성 완료된 28건 (생성하지 마세요)

### Wave A (10건)
workplace-new-02, tenant-new-01, civic-new-10, partnership-new-10, spouse-new-06, neighbor-new-03, online-new-05, professional-new-01, friend-new-08, family-new-04

### Wave B KEEP (8건)
spouse-new-03, family-new-02, friend-new-01, partnership-new-01, tenant-new-10, workplace-new-10, online-new-06, professional-new-10

### DROP 대체 (2건)
neighbor-new-11, civic-new-11

### DEVELOP P1 재생성 (8건)
family-new-03, family-new-05, friend-new-02, friend-new-09, neighbor-new-07, tenant-new-09, workplace-new-09, professional-new-08

---

## 생성 대상: 72건

100건 전체에서 위 28건 + DROP 2건(neighbor-new-10, civic-new-07)을 뺀 나머지입니다.

### 기획서 위치 (배치별)

| 배치 | 파일 | 카테고리 |
|------|------|---------|
| 1 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-01-spouse.md` | 부부 |
| 2 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-02-family.md` | 가족 |
| 3 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-03-friend.md` | 친구 |
| 4 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-04-neighbor.md` | 이웃 |
| 5 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-05-partnership.md` | 동업 |
| 6 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-06-tenant.md` | 임대차 |
| 7 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-07-workplace.md` | 직장 |
| 8 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-08-online.md` | 온라인 |
| 9 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-09-professional.md` | 의료/교육 |
| 10 | `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-10-civic.md` | 공공/제도 |

### 전체 인덱스
`docs/ref/리뉴얼참고/thread-e-100-new-cases-master-index.md` — 100건 전체 caseId/제목/카테고리/난이도 목록

### DEVELOP 수정분 (기획서가 수정된 케이스)

GPT 리뷰 후 스레드 E가 기획서를 수정한 케이스가 있습니다. 이 케이스들은 **원본 배치 파일이 이미 수정 반영됨**이므로 배치 파일을 그대로 읽으면 됩니다.

수정 내역: `docs/ref/리뉴얼참고/thread-e-develop-priority1-fixes.md`

DEVELOP P1 (8건)은 이미 재생성 완료. 나머지 DEVELOP 케이스:
- **P2 (9건)**: 배치 파일에 수정 반영 완료
- **P3 (6건)**: 배치 파일에 수정 반영 완료

### DROP 제외 (생성하지 마세요)
- `neighbor-new-10` (공동텃밭 pH센서) — DROP
- `civic-new-07` (1365의 18시간) — DROP

이 2건은 이미 `neighbor-new-11`, `civic-new-11`으로 대체 생성 완료.

---

## 72건 caseId 목록

아래 목록에서 각 배치 파일의 해당 케이스를 찾아 생성합니다:

### 부부 (배치 1) — 미생성분
spouse-new-01, spouse-new-02, spouse-new-04, spouse-new-05, spouse-new-07, spouse-new-08, spouse-new-09, spouse-new-10

### 가족 (배치 2) — 미생성분
family-new-01, family-new-06, family-new-07, family-new-08, family-new-09, family-new-10

### 친구 (배치 3) — 미생성분
friend-new-03, friend-new-04, friend-new-05, friend-new-06, friend-new-07, friend-new-10

### 이웃 (배치 4) — 미생성분
neighbor-new-01, neighbor-new-02, neighbor-new-04, neighbor-new-05, neighbor-new-06, neighbor-new-08, neighbor-new-09

### 동업 (배치 5) — 미생성분
partnership-new-02, partnership-new-03, partnership-new-04, partnership-new-05, partnership-new-06, partnership-new-07, partnership-new-08, partnership-new-09

### 임대차 (배치 6) — 미생성분
tenant-new-02, tenant-new-03, tenant-new-04, tenant-new-05, tenant-new-06, tenant-new-07, tenant-new-08

### 직장 (배치 7) — 미생성분
workplace-new-01, workplace-new-03, workplace-new-04, workplace-new-05, workplace-new-06, workplace-new-07, workplace-new-08

### 온라인 (배치 8) — 미생성분
online-new-01, online-new-02, online-new-03, online-new-04, online-new-07, online-new-08, online-new-09, online-new-10

### 의료/교육 (배치 9) — 미생성분
professional-new-02, professional-new-03, professional-new-04, professional-new-05, professional-new-06, professional-new-07, professional-new-09

### 공공/제도 (배치 10) — 미생성분
civic-new-01, civic-new-02, civic-new-03, civic-new-04, civic-new-05, civic-new-06, civic-new-08, civic-new-09

---

## 실행 방법

72건 동시 병렬이 부담이면 **20건씩 4배치**로 나눠도 됩니다:

```bash
# 배치 A: 부부 8 + 가족 6 + 친구 6 = 20건
node scripts/run-parallel-case-batch.cjs --cases spouse-new-01,...,friend-new-10

# 배치 B: 이웃 7 + 동업 8 + 임대차 5(일부) = 20건
node scripts/run-parallel-case-batch.cjs --cases neighbor-new-01,...,tenant-new-05

# 배치 C: 임대차 2(나머지) + 직장 7 + 온라인 8 + 의료 3(일부) = 20건
node scripts/run-parallel-case-batch.cjs --cases tenant-new-06,...,professional-new-04

# 배치 D: 의료 4(나머지) + 공공 8 = 12건
node scripts/run-parallel-case-batch.cjs --cases professional-new-05,...,civic-new-09
```

또는 manifest JSON 파일을 만들어서 한 번에:
```bash
node scripts/run-parallel-case-batch.cjs --manifest scripts/manifests/thread-e-remaining-72.json
```

## 검증 기준

각 케이스: runtime template PASS / scripted template PASS / semantic PASS / stage3 PASS

**고도화된 생성기의 새 validator 규칙(callTerms, Truth Throttle 강화 등)도 전부 통과해야 합니다.**

## 완료 보고

```
72건 병렬 배치 완료
- 성공: N건
- 실패: N건 (caseId + 실패 이유)
- 전체 소요 시간: NN분
- batch status: tmp/pipeline-batch-status.json
```
