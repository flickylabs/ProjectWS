# [Session B-4] neighbor-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **neighbor-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 neighbor-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `neighbor-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 정한결 (partyA) — 윗층 주민
- 이주연 (partyB) — 아랫층 주민

## 위반 목록

### suppression 모순 (가장 심각 — 반드시 해소)
1. **a:d-1:act:0 (S0)**: suppression "두 차례 횟수를 감춘다" ↔ slots.count.exact = "두 차례"
2. **a:d-4:context:0 (S0)**: suppression "기사 출입 가능성을 숨긴다" ↔ slots.source.exact = "23시 58분 기사 출입과 제습기 진동"
3. **b:d-2:act:0 (S0)**: suppression "31시간 지나서야 문자 보낸 점 숨긴다" ↔ slots.time.exact = "31시간 뒤 문자"

### Side A (정한결)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-1:act:0 | S0 | fullName, time, count, place | "이주연", "7월 12일 00시 48분", "두 차례", "이주연 현관 앞" |
| a:d-1:evidence:0 | S1 | 동일 | 동일 |
| a:d-1:admission:0 | S2 | 동일 | 동일 |
| a:d-2:act:0 | S0 | fullName, time | "이주연", "31시간 뒤 문자" |
| a:d-2:threshold:0 | S1 | 동일 | 동일 |
| a:d-2:context:0 | S2 | 동일 | 동일 |
| a:d-3:evidence:0 | S0 | fullName, institution, cause, evidence | "이주연", "관리사무소", "공용 우수관 막힘과 외벽 실리콘 틈", "4라인 누수 점검 보고서" |
| a:d-3:uncertainty:0 | S1 | 동일 | 동일 |
| a:d-3:admission:0 | S2 | 동일 + factText "관리실 기록이 나오고 보니" | 동일 |
| a:d-4:context:0 | S0 | fullName, time, source, place | "이주연", "7월 12일 00시 48분", "기사 출입과 제습기 진동", "4라인" |
| a:d-4:uncertainty:0 | S1 | 동일 | 동일 |
| a:d-4:context:1 | S2 | 동일 | 동일 |
| a:d-5:rule:0 | S0 | fullName, institution, post, time (factText!) | "이주연", "관리사무소", "504호", "31시간", factText: "관리사무소에도 이미 말해 둔 상태" |
| a:d-5:uncertainty:0 | S1 | 동일 | 동일 |
| a:d-5:admission:0 | S2 | 동일 + factText "504호를 지목해 단체방에 올린 건 맞지만" | 동일 |

### Side B (이주연)
Side A와 동일 유형의 위반이 전 쟁점(d-1~d-5) S0-S2에 반복:
- fullName: "정한결", "이주연" — S0부터
- time: "7월 12일", "00시 48분", "23시 58분", "31시간" — S0부터
- institution: "관리사무소" — S0부터
- cause/source: "공용 우수관 막힘", "기사 출입과 제습기 진동" — S0부터
- evidence: "4라인 누수 점검 보고서" — S0부터
- place: "공용복도와 이주연 현관 앞", "504호" — S0부터

## 산출물 형식
- 교정된 `neighbor-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
