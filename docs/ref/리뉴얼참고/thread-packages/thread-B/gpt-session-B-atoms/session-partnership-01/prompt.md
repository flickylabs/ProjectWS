# [Session B-3] partnership-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **partnership-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 partnership-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `partnership-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 이서준 (partyA) — 공동대표
- 윤해나 (partyB) — 공동대표
- 정민우 — 법무사

## 위반 목록

### factText 직접 위반 (가장 심각 — 이것들은 반드시 교정)
| atom ID | state | 위반 factText |
|---------|-------|---------------|
| a:d-1:denial:0 | S0 | "브리지 투자 예치 절차" → "해당 투자 절차" |
| a:d-1:uncertainty:1 | S1 | "9월 3일 안에 신탁계좌를 잡아두지 않으면" → "그 기한 안에 계좌를 잡아두지 않으면" |
| a:d-1:admission:2 | S2 | "공동승인 토큰 없이 1,800만원을 보낸 건 맞지만 전날 해나가 2,000만원 한도 안에서" → 인물명/금액 제거 |
| a:d-2:denial:0 | S0 | "법무사 신탁계좌에 묶인 예치금" → "해당 계좌에 묶인 돈" |
| a:d-2:uncertainty:1 | S1 | "투자 검토와 법률 실사 맥락" → "해당 검토 맥락" |
| a:d-2:admission:2 | S2 | "브리지 투자 독점검토를 잡기 위한 예치금과 법률 검토비" + "해나" → 절차명/인물명 제거 |
| a:d-3:uncertainty:1 | S1 | "회식 직후 대화에서 2,000만원 한도를 언급" → "그 자리에서 한도를 언급" |
| a:d-3:admission:2 | S2 | "원본 단톡과 음성메모 기준으로 해나는..." → 증거명/인물명 제거 |
| a:d-4:admission:2 | S2 | "해나가 세무사에게 일단 2주년 캠페인 컨설팅비로 잡아달라고" → 인물명/직함/라벨 제거 |
| a:d-5:admission:2 | S2 | "320만원 위험을 충분히 짚어 설명하지 않은" → 금액 제거 |
| b:d-1:denial:0 | S0 | "회사 돈 1,800만원을 밖으로 뺀 겁니다" → 금액 제거 |
| b:d-1:admission:2 | S2 | "9월 3일 이체 버튼을 누른 사람은 서준이고" → 날짜/인물명 제거 |
| b:d-4:denial:0 | S0 | "세무사에게 허위 분개를 지시한 적 없고" → 직함 제거 |
| b:d-5:denial:0 | S0 | "320만원이 고정으로 날아간다는 얘긴" → 금액 제거 |

### slots 체계적 위반
모든 S0-S2 atom의 slots에 동일한 값이 들어있음:
- counterparty.fullName: "윤해나" (side a) / "이서준" (side b) — S0부터 노출
- lawyer.fullName: "정민우 법무사" — S0부터 노출
- 구체적 금액(exact), 날짜(dateExact), 절차명(institution) 등도 동일

**S0-S1**: fullName→neutral, exact→neutral, institution→neutral로 교체
**S2**: fullName→neutral, judgeRef→성씨만 ("윤 씨","이 씨"), exact→rounded 수준

## 산출물 형식
- 교정된 `partnership-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
