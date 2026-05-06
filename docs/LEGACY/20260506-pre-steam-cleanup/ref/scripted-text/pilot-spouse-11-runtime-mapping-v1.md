# Pilot Spouse-11 Runtime Mapping v1

## 목적
- [pilot-spouse-11-authoring-spec-v1.json](/d:/ProjectWS/docs/ref/scripted-text/pilot-spouse-11-authoring-spec-v1.json)을 실제 runtime case data로 내릴 때 무엇을 유지하고 무엇을 바꿔야 하는지 정리한다.

## 현재 방향
- 기존 [spouse-11.json](/d:/ProjectWS/src/data/cases/original/spouse-11.json)의 소재 자산은 유지한다.
- 하지만 사건의 중심은 `무단 접근` 단독이 아니라 `현재의 위법 접근 + 과거의 공동 보험 설계 + 복구 지연 + 자료 과장`의 결합으로 재배치한다.

## runtime 변환 원칙
- `caseId`: `case-spouse-11` 유지 가능
- `meta.anchorTruth`는 공동 공모와 현재 배신을 함께 담아야 한다.
- `emotionalBait`는 `무단 접속 로그`에서 시작하되 `보험 계산 메모`가 열리며 뒤집히게 둔다.
- `resolutionDilemma`는 다음 두 축이 동시에 살아야 한다.
  - 현재의 위법 행위 제재
  - 과거의 공동 가담 공개 범위

## duo 변환 메모
- A는 `기록과 캡처를 무기화하는 사람`으로, B는 `현장 조치와 일정 언어로 책임을 미루는 사람`으로 고정한다.
- `callTerms`는 부부지만 이미 정서적으로 멀어진 상태여야 한다.
  - 기본은 `차유리 씨`, `백득호 씨`
  - 코너에 몰리면 성만 부르거나 이름만 부르는 패턴 허용
- `verbalTells`는 scripted generation의 핵심 입력으로 유지한다.

## disputes runtime 반영
1. `d-1 무단 포털 접속과 자료 반출`
- A 쪽 핵심 lie ladder
- 증거 우선순위: `e-1 -> e-3`
- phase2에서 바로 강하게 뜨는 축

2. `d-2 긴급 복구 지연과 권한 재조정`
- B 쪽 실무 변명형 lie ladder
- 증거 우선순위: `e-2 -> e-6`

3. `d-3 하자 규모와 촬영 자료 과장`
- shared fault처럼 보이지만, 실제론 둘 다 자기 몫을 줄이려 한다.
- trap evidence 축으로 쓰기 좋다.

4. `d-4 보험금으로 적자를 메우려 한 공동 설계`
- phase3 또는 중후반 dossier/witness에서 강하게 열린다.
- 재판관 성향 분화 핵심 축

5. `d-5 지급 보류의 직접 원인`
- 기관 기록으로 정리되는 마감 축
- 결말 정리에 유용

## evidence runtime 반영
- baseEvidence 권장:
  - `e-1` 무단 접속 로그
  - `e-2` 복구 지연 로그
  - `e-3` 잘린 CCTV 캡처
- 이유:
  - 시작 10초 훅
  - 양측 공방 즉시 가능
  - 나중에 `e-4`, `e-5`, `e-6`로 뒤집기 쉬움

## witness runtime 반영
- `w-1 현장소장`: factual witness
- `w-2 손해사정 담당`: institutional witness
- `w-3 남편 누나`: biased witness

이 3명 구조가 좋다.
- 현장
- 기관
- 가족 편향

## lie config 방향
- A:
  - `d-1`: self_protection -> 사실 은폐 -> 제한적 인정
  - `d-3`: evidence framing -> 과장 부인 -> 일부 인정
  - `d-4`: financial_preservation -> 공동 설계 축소 -> 공모 인정
- B:
  - `d-2`: expedient management -> 복구 지연 축소 -> 권한 조정 인정
  - `d-3`: damage inflation blame-shift -> 상호 책임화
  - `d-4`: survival motive -> 계산은 했지만 실행은 아니었다는 식으로 버팀

## runtime 위험 요소
- `보험 사기`가 너무 빨리 드러나면 초반 공방이 죽는다.
- 반대로 너무 늦으면 사건이 `무단 접근 분쟁`으로 축소된다.
- 따라서 `e-4`는 mid-game, `e-5/e-6`는 mid-late unlock이 맞다.

## 바로 다음 구현 단위
1. `spouse-11` runtime case data 재작성
2. `baseEvidenceIds` 명시
3. 필요 시 `viewerData/meta` draft 추가
4. 그 다음 scripted channel plan 기준으로 문장 생성
