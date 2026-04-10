# CT → 스레드 A: Wave A 신규 10건 생성 요청

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 유형: 신규 케이스 생성 (스레드 E 기획서 기반)

---

## 배경

스레드 E가 신규 사건 100건을 기획 완료했고, 그 중 **Wave A 10건**이 즉시 생성기 투입 가능(READY_NOW) 판정을 받았습니다.

## 기획서 위치

- **배치 기획서**: `docs/ref/리뉴얼참고/thread-e-100-new-cases-batch-*.md` (배치 1~10)
- **Wave A 순서/주의사항**: `docs/ref/리뉴얼참고/thread-e-100-new-cases-wave-a-authoring-order.md`
- **인덱스**: `docs/ref/리뉴얼참고/thread-e-100-new-cases-master-index.md`

## 투입 순서 (스레드 E 권장)

| 순서 | caseId | 카테고리 | 배치 파일 |
|------|--------|---------|----------|
| 1 | workplace-new-02 | 직장 | batch-07-workplace.md |
| 2 | tenant-new-01 | 임대차 | batch-06-tenant.md |
| 3 | civic-new-10 | 공공/제도 | batch-10-civic.md |
| 4 | partnership-new-10 | 동업 | batch-05-partnership.md |
| 5 | spouse-new-06 | 부부 | batch-01-spouse.md |
| 6 | neighbor-new-03 | 이웃 | batch-04-neighbor.md |
| 7 | online-new-05 | 온라인 | batch-08-online.md |
| 8 | professional-new-01 | 의료/교육 | batch-09-professional.md |
| 9 | friend-new-08 | 친구 | batch-03-friend.md |
| 10 | family-new-04 | 가족 | batch-02-family.md |

## READY_NOW의 의미

10건 모두 "기획서만으로 추가 질의 없이 변환 착수 가능"입니다. 단, 스레드 A의 공통 전처리가 필요합니다:

- meta 보강 (emotionalBait, anchorTruth, resolutionDilemma)
- baseEvidenceIds 설정 (초기 해금 3개)
- requires + requiredLieState 설정 (기획서의 증거 해금 순서 기반)
- evidenceCombinations (기획서의 핵심 조합 기반)
- LieState transitions (기획서의 전이 설계 기반, hard_evidence 관문 포함)
- socialGraph/witness + relatedDisputeIds
- sensitivityTags
- viewerData/meta (증거 타입별)

이 전처리는 core 6에서 이미 구축한 `runtime-gameplay-enricher.cjs` + `core6-runtime-redesign.cjs` 경로와 동일합니다.

## 검증 기준

각 케이스가 아래 4중 검증을 PASS해야 합니다:
- runtime template PASS
- scripted template PASS
- semantic PASS (WARN 0 목표)
- stage3 PASS

## 병렬 처리

`run-parallel-case-batch.cjs`로 병렬 실행 가능합니다. 순서 1~3을 먼저 돌려서 파이프라인 호환성 확인 후 나머지 7건을 배치 실행하는 것도 좋습니다.

## 기획서에 질문이 있으면

CT를 통해 스레드 E에 전달합니다. 하지만 READY_NOW 판정이므로 대부분 기획서만으로 충분할 것입니다.
