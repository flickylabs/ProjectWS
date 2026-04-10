# CT 보고 메시지 — Thread-E GPT 리뷰 반영 현황 (2026-04-09)

CT,

GPT Pro 리뷰(`solomon_100_cases_review.md/csv`) 기준으로 Thread-E 신규 100건을 재정리했습니다.

## 1. GPT 결과 요약

- `KEEP 75 / DEVELOP 23 / DROP 2`
- 평균 재미 점수 `8.0 / 10`
- 강세 카테고리: `spouse / online / workplace / professional`
- 약세 구간: `neighbor / civic / easy 일부`

상위권은 `냉동배아 연장동의서`, `데이터룸의 체크박스`, `음성모델 11초`, `주황 팔찌의 13분`이 `9.5`로 가장 높았습니다.  
하위권은 `공동텃밭의 pH센서`, `1365의 18시간`이 `DROP` 판정을 받았습니다.

## 2. Thread-E 판단

이번 결과는 `대량 폐기`보다 `선별 보정`이 맞다는 쪽입니다.

- `DROP 2`는 활성 생성 풀에서 제외
  - `neighbor-new-09`
  - `civic-new-03`
- `DEVELOP 23`은 훅/초반 stakes/차별화 보정이 필요
- `KEEP 75`는 유지

핵심은 구조 실패보다 `훅 약함`, `stakes 부족`, `유사군 반복` 문제가 더 컸다는 점입니다.

## 3. 기존 Thread-E 산출물과의 관계

기존 Wave A 10건은 GPT 기준으로 `10/10 전부 KEEP`입니다.  
따라서 기존 `thread-e-100-new-cases-wave-a-authoring-order.md` 기준 handoff를 뒤집을 필요는 없습니다.

다만 재미 점수만 보면 기존 top20 밖에서도 승격 후보가 보입니다.

- `tenant-new-05`
- `workplace-new-05`
- `online-new-01`
- `online-new-04`
- `online-new-07`
- `online-new-10`
- `civic-new-02`

이 케이스들은 기존엔 비중복/운영 기준 때문에 밀렸지만, GPT 재미 점수는 높게 나왔습니다.

## 4. 이미 취한 조치

후속 실행 문서 작성 완료:

- `docs/ref/리뉴얼참고/thread-e-gpt-review-followup-action.md`

여기에 아래를 정리했습니다.

- `DROP 2` 즉시 제외
- `DEVELOP 23`을 `Priority 1 / 2 / 3`으로 재배치
- 중복군 관리 규칙 정리
- `KEEP 75` 중 `9.0+` 즉시 생성 우선군 분리

즉, 지금 상태는 GPT 피드백을 읽고 끝난 단계가 아니라, **실제 후속 작업 기준까지 고정한 상태**입니다.

## 5. Thread-E 권장안

Thread-E 권장 순서는 아래입니다.

1. 기존 Wave A 10건은 그대로 Thread A handoff 유지
2. Thread-E는 `Priority 1` 8건부터 보정 착수
3. `DEVELOP 23` 보정 완료 후에만 `top20 / waveA` 재정렬 여부 재검토

이렇게 가는 이유는 두 가지입니다.

- 현재 Wave A는 이미 GPT에서도 강하게 통과했다.
- 지금 top20을 바로 뒤집기보다, 저점 DEVELOP 군을 먼저 끌어올리는 편이 전체 생산 효율이 높다.

요약하면:

> GPT 피드백은 기존 Thread-E 설계를 뒤엎는 결과가 아니라,  
> 상위권은 더 확신해 주고, 중하위권은 무엇을 고쳐야 하는지 선명하게 만든 검증 결과였습니다.

상세판은 아래 문서에 정리해 두었습니다.

- `docs/ref/리뉴얼참고/thread-e-gpt-review-report-for-ct-2026-04-09.md`
- `docs/ref/리뉴얼참고/thread-e-gpt-review-followup-action.md`
