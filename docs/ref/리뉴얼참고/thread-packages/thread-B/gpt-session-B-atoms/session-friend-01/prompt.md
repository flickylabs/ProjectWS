# [Session B-5] friend-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **friend-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 friend-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `friend-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 서도윤 (partyA) — 여행 정산 주도자
- 정하린 (partyB) — 정산 이의 제기자
- 김수아 — 공통 친구 (제3자)
- 박은지 — 숙소 운영자

## 위반 목록

### 체계적 위반 (전 쟁점 d-1~d-5 양측)
모든 S0-S2 atom의 slots에 아래 값이 동일하게 노출:
- person.fullName: "서도윤", "정하린", "김수아", "박은지" — S0부터
- amount.exact: "92,000원", "70,000원", "184,000원", "140,000원" — S0부터
- institution.name: "인스타그램 스토리", "정산 앱", "정산 앱 원본 CSV", "친한친구 스토리" — S0부터
- time.period: "오후 2시", "캡처 공유 14분 뒤", "다음 날 새벽 3시 취소 확정 전" — S0부터

### 대표적 위반 목록
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-1:S0:refund_received | S0 | fullName, amount, institution | "서도윤", "92,000원", "박은지" |
| a:d-1:S0:delayed_share | S0 | fullName | "정하린" |
| a:d-1:S1:offset_message | S1 | fullName, time, amount | "김수아", "오후 2시", "70,000원" |
| a:d-2:S0:preconfirmation_share | S0 | fullName, service | "김수아", "인스타그램 스토리" |
| a:d-2:S0:capture_then_story | S0 | time, amount | "캡처 공유 14분 뒤", "184,000원" |
| a:d-3:S0:mid_screen_not_final | S0 | amount, service | "184,000원", "정산 앱" |
| a:d-3:S0:refund_and_reversal_pending | S0 | amount x2, time | "92,000원", "70,000원", "새벽 3시" |
| a:d-4:S0:taxi_loan_exists | S0 | amount x2, fullName | "70,000원", "140,000원", "정하린" |
| a:d-5:S0:kimsua_side_message | S0 | fullName, amount x2 | "김수아", "70,000원", "92,000원" |
| b:d-1:S0:refund_gap | S0 | amount, fullName | "92,000원", "서도윤" |
| b:d-2:S0:capture_and_story | S0 | fullName, service | "김수아", "인스타그램 스토리" |
| b:d-3:S0:csv_reorders_balance | S0 | service, time | "정산 앱 원본 CSV", "새벽 3시" |
| b:d-4:S0:paid_full_fare | S0 | amount x2 | "140,000원", "70,000원" |
| b:d-5:S0:doyun_also_leaked | S0 | fullName x2 | "서도윤", "김수아" |

(이 외 ~50건 추가 위반이 동일 패턴으로 존재)

## 산출물 형식
- 교정된 `friend-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
