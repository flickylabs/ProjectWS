# [Session B-7] tenant-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **tenant-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 tenant-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `tenant-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 하림 (partyA) — 세입자
- 상우 (partyB) — 집주인
- 김도현 — 공인중개사 (S3에서 등장)

## 위반 목록

### Side A (하림)

**d-1 (월세 지연):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-1:denial:0 | S0 | delay, time | "5일", "계약 종료 한 달 전 약정일" |
| a:d-1:timeline:0 | S1 | delay, cause | "5일", "자동이체 한도 문제" |
| a:d-1:admission:0 | S2 | delay (factText!) | factText: "월세가 정확히 5일 늦었다" |
| a:d-1:self_justification:1 | S2 | cause | "자동이체 한도 문제" |

**d-2 (벽지 손상):** 위반 없음

**d-3 (수전 누수):** 경미한 위반만 (borderline pass)

**d-4 (보증금 반환 약속):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-4:quote:0 | S0 | role | "중개사 포함 대화" |
| a:d-4:privacy:0 | S0 | condition | "미납 월세와 실제 복구비만 정산 후" |
| a:d-4:timeline:0 | S1 | date | "이사 당일" |
| a:d-4:fear:0 | S1 | date | "이사 당일" |
| a:d-4:admission:0 | S2 | condition | "미납 월세와 실제 복구비만 정산 후" |

**suppression 모순:** d-4 S0 suppressions "미납 월세와 실제 복구비 정산 조건" 숨기라 했으나 slots.condition.exact에 그대로 노출

**d-5 (공제 범위):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-5:counter:0 | S0 | service | "전면 도배와 노후 수전 교체" |
| a:d-5:rule:0 | S1 | rule, scope | "고의·과실 손상과 미납액만 세입자 정산", "전면 도배와 노후 수전 교체" |
| a:d-5:rule:1 | S2 | rule | "고의·과실 손상과 미납액만 세입자 정산" |

### Side B (상우)

**d-1:**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| b:d-1:timeline:0 | S0 | delay, time | "5일", "계약 종료 한 달 전 약정일" |
| b:d-1:rule:0 | S0 | delay | "5일" |
| b:d-1:timeline:1 | S1 | delay | "5일" |
| b:d-1:self_justification:0 | S1 | time | "계약 종료 한 달 전 약정일" |
| b:d-1:admission:0 | S2 | delay | "5일" |
| b:d-1:context:0 | S2 | time | "계약 종료 한 달 전 약정일" |

**d-4:**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| b:d-4:denial:0 | S0 | date | "이사 당일" |
| b:d-4:rule:0 | S0 | condition | "미납 월세와 실제 복구비만 정산 후" |
| b:d-4:rule:1 | S1 | condition | "미납 월세와 실제 복구비만 정산 후" |
| b:d-4:counter:0 | S1 | date | "이사 당일" |
| b:d-4:admission:0 | S2 | condition | "미납 월세와 실제 복구비만 정산 후" |

**d-5:**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| b:d-5:rule:0 | S0 | scope | "전면 도배와 노후 수전 교체" |
| b:d-5:context:0 | S0 | scope | "전면 도배와 노후 수전 교체" |
| b:d-5:rule:1 | S1 | rule | "고의·과실 손상과 미납액만 세입자 정산" |

## 산출물 형식
- 교정된 `tenant-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
