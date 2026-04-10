# Script Authoring Contract v1

## 목적
- 사건 데이터와 별도로, 스크립트 작성 시 반드시 지켜야 하는 말하기 계약이다.
- 현재 런타임 번들 구조는 [scriptedText.ts](/d:/ProjectWS/src/types/scriptedText.ts)를 따른다.
- 이 문서는 사용자가 반복해서 강조한 `화자/청자/호칭/공개 범위/맥락/감정/개연성`을 강제하기 위한 기준이다.

## 대상 파일
- `src/data/scriptedText/{caseId}.json`
- 번들 구조는 `coverage + channels + entries + variants + behaviorHint` 유지

## 채널별 계약

### interrogation
- 화자: 당사자 A 또는 B
- 청자: 재판관
- 상대 언급: 반드시 `callTerms.toJudge` 우선
- 핵심: 질문에 대한 응답이어야 하며, 묻지 않은 쟁점으로 도망가면 안 된다
- 질문 타입별 차이
- `fact_pursuit`: 사실관계, 시점, 수치, 출처
- `motive_search`: 동기, 의도, 정당화, 회피 심리
- `empathy_approach`: 상처, 불안, 관계 손상, 인간적 설명

### evidence_present
- 화자: 당사자 A 또는 B
- 청자: 재판관
- 핵심: 증거 자체보다 `증거의 의미`, `맥락`, `출처`, `적법성`, `불완전성` 중 relevant한 축으로 반응
- 금지: 증거를 보자마자 anchor truth를 통째로 토해내는 반응

### dossier
- 화자: 당사자 A 또는 B
- 청자: 재판관
- 핵심: 카드 질문에 정면 대응
- 금지: 일반 심문처럼 장황하게 넓히기

### witness
- 화자: 제3자 증인
- 청자: 재판관
- 문체: `합니다체` 기본
- 금지: 당사자 시점으로 감정이입해 대신 판결 내리기

### aftermath
- 화자: 시스템/결과 내레이션
- 핵심: 판결 후 관계와 후폭풍

### system_message
- 화자: 시스템
- 핵심: 짧고 명료한 진행 메시지

## 필수 품질 축
- 화자 정체성이 일관돼야 한다
- 청자가 누구인지 문장 단위로 흔들리면 안 된다
- 호칭은 상황과 감정에 맞게 바뀌어야 한다
- 존칭/반말/격앙 호칭 전환이 자연스러워야 한다
- 시제와 조사 오류가 없어야 한다
- 현재 lieState에서 알 수 없는 사실을 먼저 말하면 안 된다
- 앞뒤 메시지와 감정선이 이어져야 한다
- 증거, 카드, 끼어들기, 증언마다 반응 방식이 달라야 한다
- 같은 key의 5 variants는 핵심 사실은 같고 표현은 달라야 한다

## 문장 수 규칙
- S0~S1: 1~2문장 권장
- S2~S3: 2~3문장 권장
- S4~S5: 2~4문장 권장
- witness vague: 1~2문장
- witness partial/full: 2~4문장

## Truth Throttle
- `none`: 진실 직접 언급 금지
- `hint`: 방향만 암시
- `partial`: 핵심 일부만 노출
- `full`: 해당 채널에서 허용되는 범위까지 공개

## 강제 규칙
- `한 문장 = 한 청자`
- 재판관에게 말하면서 상대에게 직접 따지듯 호칭을 섞지 않는다
- 상대를 지칭할 때는 상황별 `toJudge` 또는 `angry` 사용 원칙을 지킨다
- 금전 쟁점이 아닌 곳에 금액 디테일을 흘리지 않는다
- S0~S1에서 실명, 기관명, 구체 금액, 결정적 사실을 조기 노출하지 않는다
- witness는 판단문보다 관찰문이 우선이다
- system_message는 서사체가 아니라 시스템 톤이다

## 금지 패턴
- 메타 발언
- 번역투 행정문
- 과도한 설명체
- 양측 청자 혼합
- 질문 무시
- 이미 밝혀진 말 반복만 하는 변형
- 같은 문장을 어순만 바꾼 variants
- 감정선과 맞지 않는 갑작스러운 존댓말/반말 전환
- evidence_present에서 증거 출처를 무시한 반응

## variant 설계 규칙
- 5개 variant는 모두 다른 시작점 또는 다른 강조점을 가져야 한다
- 하지만 `핵심 사실`, `stanceHint`, `truthLevel`은 같아야 한다
- 차이는 아래 축에서 낸다
- 문두 표현
- 정보 배열 순서
- 감정 비중
- 방어 방식
- 되묻기 유무

## variant 선택 필드
- `tags?: string[]`
- `sourceRefs?: string[]`
- 둘 다 현재 `ScriptedVariant` 타입에 존재하는 선택 필드다.
- `tags`는 스타일/의도/금지패턴 회피 점검용 짧은 라벨에 쓴다.
- `sourceRefs`는 어떤 claim/evidence/dispute를 참조해 작성했는지 추적할 때 쓴다.
- 둘 다 비워도 되지만, 대량 생성과 검수 자동화를 생각하면 남겨두는 편이 좋다.

## behaviorHint 규칙
- 대사와 충돌하지 않는 짧은 연출 힌트만 적는다
- 표정, 시선, 숨 고르기, 말 끊김, 목소리 톤 정도로 제한
- 새로운 사실을 behaviorHint에 넣지 않는다

## 스크립트 작성 체크리스트
- 이 텍스트는 지금 상태에서 말해도 되는가
- 화자 입장에서 자연스러운가
- 재판관에게 말하는 문체가 맞는가
- 상대를 부르는 호칭이 맞는가
- 이 채널에 맞는 반응 방식인가
- 같은 key의 다른 variant와 충분히 다른가
- validator의 금액, 실명, 문체, D2 경고를 피하는가

## 생산 워크플로우
1. 사건 데이터 로드
2. 채널 계약 확인
3. `party / dispute / lieState / questionType or evidence or witness depth` 단위로 작성
4. 번들 저장
5. `tests/validate-scripted-text.cjs` 실행
6. FAIL 0 달성
7. D2 경고와 문체 경고 수동 정리

## 현재 구조 유지 선언
- `Record<string, string[]>` 단순 구조로 되돌리지 않는다
- 현재 번들 구조의 `coverage`, `entries`, `variants`, `behaviorHint`, `truthLevel`, `stanceHint`를 유지한다
