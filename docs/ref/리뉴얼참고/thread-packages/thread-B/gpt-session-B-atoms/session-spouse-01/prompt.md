# [Session B-1] spouse-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **spouse-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
이것을 "Progressive Truth Throttle"이라 한다.
현재 spouse-01의 v2-atoms 데이터에서 S0~S2 상태의 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `spouse-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보 (교정 시 참고)
- 지석 (partyA) — 남편
- 세린 (partyB) — 아내
- 최민정 — 재가돌봄센터 상담팀장 (S0-S2에서 숨겨야 하는 진실의 핵심)
- 오미숙 — 돌봄 대상자
- 정우성 — 중간 경유 계좌 인물

## 위반 목록

### d-1 (비밀 송금) — Side A
| atom ID | state | 위반 유형 | 문제 값 |
|---------|-------|----------|---------|
| d1.movement_only | S0 | amount, date/time | exact: "2,800,000원", dateExact: "9월 20일", timeExact: "14시 03분" |
| d1.recipient_name_overread | S0,S1 | fullName, role, institution | fullName: "최민정", role: "재가돌봄센터 상담팀장" |
| d1.illicit_intent_denial | S0 | amount | exact: "2,800,000원" |
| d1.purpose_withhold | S0,S1 | amount | exact: "2,800,000원" |
| d1.transfer_ack | S1,S2 | amount, date/time | exact: "2,800,000원", dateExact: "9월 20일" |
| d1.prior_consult_missed | S1,S2 | amount | exact: "2,800,000원" |
| d1.family_need_generic | S2 | fullName, role | fullName: "오미숙", role: "돌봄 대상자" |
| d1.professional_link_generic | S2 | fullName, role, institution | fullName: "최민정", role: "재가돌봄센터 상담팀장" |

**suppression 모순:** S0 suppression "최민정이 외도 상대가 아니라 돌봄센터 상담팀장이라는 사실"을 숨기라고 했으나, S0 atom d1.recipient_name_overread의 slots에 fullName: "최민정", role: "재가돌봄센터 상담팀장"이 그대로 노출.

### d-3 (야간 접촉) — Side A
| atom ID | state | 위반 유형 | 문제 값 |
|---------|-------|----------|---------|
| d3.affair_denial | S0,S1,S2 | fullName, role, institution | fullName: "최민정", role: "재가돌봄센터 상담팀장" |
| d3.contact_ack | S1,S2 | date/time | dateExact: "9월 20일", timeExact: "21시 14분" |
| d3.family_reason_generic | S2 | fullName, role, place | fullName: "오미숙", place: "상담동 후문" |
| d3.work_contact_generic | S2 | fullName, role, institution | fullName: "최민정", role: "재가돌봄센터 상담팀장" |

### d-2 (새벽 열람) — Side B
| atom ID | state | 위반 유형 | 문제 값 |
|---------|-------|----------|---------|
| d2.cause_first | S0 | amount | exact: "2,800,000원" |
| d2.trigger_transfer_message | S0,S1,S2 | amount | exact: "2,800,000원" |
| d2.phone_access_ack | S1,S2 | time | timeExact: "새벽 2시 07분" |

### d-4 (우회 송금) — Side B
| atom ID | state | 위반 유형 | 문제 값 |
|---------|-------|----------|---------|
| d4.family_emergency_frame | S0,S1 | amount | exact: "1,500,000원" |
| d4.route_temporary_frame | S0,S1 | fullName, amount | fullName: "정우성", exact: "1,500,000원" |
| d4.not_pleasure_money | S0,S1 | amount | exact: "1,500,000원" |
| d4.intermediary_ack | S2 | fullName, amount | fullName: "정우성", exact: "1,500,000원" |

**suppression 모순:** S0 suppression "정우성 계좌를 끼워 넣은 이유" ↔ S0 atom에 fullName: "정우성"

### d-5 (약속 위반) — 양측
- Side A: d5a.money_not_outside_family (S0) — fullName: "오미숙", role: "돌봄 대상자"
- Side A: d5a.self_cross_ack (S1,S2) — amount: "2,800,000원"
- Side A: d5a.partner_150_reference (S2) — amount: "1,500,000원"
- Side B: d5b.his_breach_anchor (S0,S1) — amount: "2,800,000원"
- Side B: d5b.my_case_not_same_yet (S0,S1) — amount: "1,500,000원"
- Side B: d5b.my_breach_reluctant_ack (S1,S2) — amount: "1,500,000원"

## 산출물 형식
- 교정된 `spouse-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
