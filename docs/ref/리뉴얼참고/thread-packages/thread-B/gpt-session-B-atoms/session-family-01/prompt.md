# [Session B-6] family-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **family-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 family-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `family-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 윤서아 (partyA) — 큰딸
- 윤도현 (partyB) — 아들 (동생)
- 조혜진 — 병원 사회복지사

## 위반 목록

### d-1 (선이체 분쟁)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| d1.parent_account_movement | S0 | amount, time, service | "1,800만원", "간병 시작 3주 전", "부모 관리계좌 선이체" |
| d1.greed_framing_denial | S0 | amount | "1,800만원" |
| d1.brother_numbers_only | S0 | fullName, role | "윤도현", "동생" |
| d1.transfer_ack | S1,S2 | amount (factText!) | factText: "1,800만원 선이체 사실 인정" |
| d1.not_simple_private_outflow | S1,S2 | amount | "1,800만원" |
| d1.mother_care_rollcall | S1 | fullName, role | "윤도현", "동생", "돌봄 대상자" |
| d1.personal_account_first | S2 | amount, fullName(evidence) | evidence: "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서" |
| d1.card_insurance_paid_first | S2 | amount, service, evidence | "1,800만원", 동일 증거 |
| d1.care_overlap_claim | S2 | time | "간병 시작 3주 전" |

### d-2 (간병비 분담)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| d2.not_unpaid_just_delayed | S0 | amount, time | "60만원", "12일 뒤" |
| d2.sister_gap_exaggeration | S0 | fullName | "윤서아" |
| d2.full_abandonment_reject | S0,S1 | evidence | "가족 단톡과 간병 스케줄표 원본" |
| d2.twelve_day_delay_ack | S1,S2 | amount, time (factText!) | factText: "60만원을 12일 늦게 냈다" |
| d2.not_total_absence | S1 | amount, evidence | "60만원", "가족 단톡과 간병 스케줄표 원본" |
| d2.responsibility_not_zero_but_not_all | S2 | fullName | "윤서아" |

### d-3 (수첩 메모)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| d3.memo_line_quote | S0 | evidence, date | "2021년 아버지 수첩 메모 사진", "2021년" |
| d3.brother_cuts_one_line | S0,S1 | fullName, evidence | "윤도현", 동일 증거 |
| d3.memo_photo_reason | S1 | evidence | "2021년 아버지 수첩 메모 사진" |
| d3.father_task_history | S1,S2 | role | "관리계좌 명의인" |
| d3.not_legal_will_ack | S2 | evidence | "2021년 아버지 수첩 메모 사진" |

### d-4 (요양 경감 미신청)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| d4.initial_210_estimate | S0,S1 | amount, institution, service | "210만원", "병원 사회복지사 장기요양 경감 신청 기록과 첫 달 산정표" |
| d4.no_visible_alternative_then | S0,S1 | amount | "210만원" |
| d4.retrospective_judgment_reject | S0 | institution, service | "병원 사회복지사 장기요양 경감 신청 기록" |
| d4.cost_pressure_real | S0,S1,S2 | amount | "210만원" |
| d4.info_scope_limit | S1,S2 | amount | "210만원" |
| d4.missed_guidance_possibility | S2 | fullName, role, institution | "조혜진", "병원 사회복지사" |

### d-5 (양측 과실)
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| d5a.brother_not_clean_either | S0 | fullName | "윤도현" |
| d5a.brother_late_drug_logs | S1 | fullName | "윤도현" |
| d5a.mutual_breach_frame | S2 | fullName | "윤도현" |
| d5a.hidden_1800_ack | S2 | amount (factText!) | factText: "1,800만원 선이체를 남기지 않았다는 인정" |
| d5b.sister_1800_biggest | S0,S1 | amount, fullName | "1,800만원", "윤서아" |
| d5b.my_late_logs_minor_frame | S0 | fullName, evidence | "윤서아", "가족 단톡과 간병 스케줄표 원본" |
| d5b.scale_type_difference | S0,S1 | amount | "1,800만원" |
| d5b.mutual_breach_not_equal | S2 | fullName, amount | "윤서아", "1,800만원" |

## 산출물 형식
- 교정된 `family-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
