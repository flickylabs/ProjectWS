# Thread-D 84 Case Salvage Handoff

## 목적
- 기존 84개 원안 사건을 전수 검토해서 `변경 후 사용 가능`한 사건을 선별한다.
- 완전 신규 headline 사건과 별개로, 기존 골격을 살려 더 재미있게 키울 수 있는 케이스를 찾는다.
- 결과는 이후 실제 `CaseAuthoringSpec` 작성과 스크립트 제작의 입력 자료로 쓴다.

## 현재 전제
- 메인 스레드는 `headline-template compiler` 공용화 작업을 진행 중이다.
- Thread-D는 메인 스레드와 쓰기 충돌 없이 `분석/선별/정리`만 맡는다.
- 기존 1차 메모는 [case-salvage-shortlist-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/case-salvage-shortlist-v1.md)에 있다.
- 최종적으로 사건이 채택되면 스크립트는 별도 high-quality 작성 루프로 간다.

## 검토 대상
- 원본 사건 84개:
  - [src/data/cases/original](/d:/ProjectWS/src/data/cases/original)

## 참고 기준 문서
- [case-authoring-spec-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/case-authoring-spec-v1.md)
- [script-authoring-contract-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/script-authoring-contract-v1.md)
- [case-salvage-shortlist-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/case-salvage-shortlist-v1.md)

## 선별 기준
아래를 만족할수록 우선순위를 높인다.

- 양측 모두 자기 논리가 있다.
- 양측 모두 숨기는 사실이 있다.
- 증거가 단순 정답 확인이 아니라 해석 싸움으로 이어진다.
- 제3자, 커뮤니티, 기관, 가족, 회사 같은 외부 축이 사건을 증폭시킨다.
- 최종 판단이 `누가 더 나쁜가` 1축이 아니라 `무엇을 더 무겁게 볼 것인가`로 갈린다.
- 재판관 성향 분화가 가능하다.
  - 절차 vs 실체
  - 보호 vs 공개
  - 개인 책임 vs 구조 책임
  - 관계 회복 vs 제재 강화
- 기존 원안의 핵심 자산을 살릴 수 있다.
  - 인상적인 훅
  - 강한 증거 소재
  - 인물 관계
  - 기관/커뮤니티 개입 요소

## 탈락 기준
- 한쪽만 명백한 악당이고 다른 쪽은 거의 무결점이다.
- 증거가 하나만 나오면 사건이 끝난다.
- 법정 공방보다 설명 위주로 흘러간다.
- 관계/평판/생계/절차 충돌 없이 단순 선악 판정으로 닫힌다.
- 새로 뜯어고치느니 신규 사건이 더 싼 수준이다.

## 분류 체계
각 사건을 아래 4가지 중 하나로 분류한다.

- `keep`: 큰 틀 유지, 보강만 하면 됨
- `upgrade`: 골격은 좋고 고도화 가치 큼
- `rebuild`: 소재만 살리고 구조는 사실상 다시 짜야 함
- `drop`: 유지 가치 낮음

## 각 사건에 대해 남길 항목
- `caseId`
- `category`
- `classification`
- `one-line verdict`
- `salvageable assets`
- `core weakness`
- `recommended rewrite direction`
- `possible A/B framing`
- `judge-profile divergence potential`
- `priority`

## 기대 산출물
Thread-D는 아래 2개 파일을 만든다.

1. 전수 분류표
- 경로: [thread-d-84-case-salvage-matrix.md](/d:/ProjectWS/docs/ref/scripted-text/thread-d-84-case-salvage-matrix.md)
- 84개 전부 포함

2. 우선 리뉴얼 후보 요약
- 경로: [thread-d-84-case-salvage-top12.md](/d:/ProjectWS/docs/ref/scripted-text/thread-d-84-case-salvage-top12.md)
- 상위 12개
- 이 중 `즉시 pilot 6개`를 별도 표시

## 출력 형식
전수 분류표는 압축형으로 작성한다.

- `spouse-01 | upgrade | ...`
- `friend-03 | keep | ...`

Top12 문서는 조금 더 자세히 쓴다.

- 사건 훅
- 살릴 핵심
- 리라이트 방향
- A/B 공방형으로 바꿨을 때의 장점
- headline 사건군과 겹치지 않는 차별점

## 주의사항
- 아직 실제 runtime/scripted 파일은 만들지 않는다.
- 스크립트 문장을 쓰기보다 사건 골격의 재미와 분화 가능성을 평가한다.
- 사용자 취향 반영:
  - 순한 오해형은 낮게 본다.
  - 빌런 vs 빌런, 여론전, 은폐, 프레이밍, 해석 충돌은 높게 본다.
  - 너무 무거워서 해석 다양성이 죽는 소재는 경계한다.
- `리갈하이식 재해석 재미`가 살아나는지 계속 기준으로 삼는다.

## 현재 추천 출발점
기존 1차 shortlist를 출발점으로 삼되, 거기에 묶이지 말고 84개 전수를 다시 본다.

- spouse-11
- friend-03
- tenant-02
- workplace-11
- partnership-09
- neighbor-08

## 완료 기준
- 84개 전수 분류 완료
- top12 선정 완료
- immediate pilot 6개 선정 완료
- 각 top12에 대해 `왜 살릴 가치가 있는지`와 `어떻게 더 재밌게 바꿀지`가 명확해야 한다
