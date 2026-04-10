# Thread W Spouse v3-01 GPT Pro Prompt

## 목적
- Thread S가 설계하고 Story Gate를 통과한 spouse v3 사건 `새벽 통화기록` 전용 GPT Pro 프롬프트 완성본이다.
- `src/data/cases/generated/spouse-v3-01.json`과 `docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json`의 runtime/helper 실데이터를 반영했다.
- 목표는 **v3 게임 구조 + Level 4 품질 기준 + validator 규격**을 한 번에 만족하는 4세션 분할 프롬프트를 고정하는 것이다.

## 입력 고정본
- 구조 기준:
  - `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
  - `docs/ref/리뉴얼참고/thread-s-v3-case-design-spouse.md`
- 품질 기준:
  - `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
  - `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- 보조 기준:
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- runtime 기준:
  - `src/data/cases/generated/spouse-v3-01.json`
  - `docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json`

## 현재 상태
- Story Gate: `PASS`
- runtime: `available`
- v3 helper: `available`
- working slug: `spouse-v3-01`
- caseId: `case-spouse-v3-01`
- caseNumber: `TE-SpouseV301`

## runtime 반영 완료 항목
- exact `caseId`, `disputeIds`, `evidenceIds`, `baseEvidenceIds`, `witnessIds`, `monetaryDisputeIds` 반영 완료
- `dossierCardIds`, `dossierQuestionIds`, `leadIds`, `combination recipes`, `statement nodes`, `witness angle nodes` 반영 완료
- `authorityPlacements`, `hidden dispute unlock rules`, `officialRecordRecommendations`, `sensitive seal targets` 반영 완료
- witness profile과 party별 `fear`, `dailyRoutine`, `verbalTells`, `callTerms` 반영 완료
- `resultClasses`, `system_message` keys는 runtime/helper에 사건별 override가 없어 current writer bundle baseline을 사용한다

## 사건별 Intake

```yaml
story_gate_status: "PASS"
case_id: "case-spouse-v3-01"
working_slug: "spouse-v3-01"
case_number: "TE-SpouseV301"
title: "새벽 통화기록"
category: "spouse"
summary: "남편 카드 명세서에 여성 생리대와 스타킹이 찍히고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신하지만, 형 문자와 조카 알림이 열리며 외도 프레임은 가족 돌봄으로 재맥락화된다. 이후 공동 적금 3,000만 원, 아내의 2,000만 원 송금, 그리고 부부 돈 5,000만 원의 선후가 드러나며 사건의 중심이 외도 의심에서 비밀 송금과 신뢰 붕괴의 순서로 뒤집힌다."
headline_hook: "카드 결제, 오피스텔 출입, 새벽 통화가 한 방향으로만 겹치며 딴살림처럼 보인다."
emotional_bait: "남편은 외도가 아니라 형과 조카를 몰래 돌보고 있었고, 아내는 남편이 먼저 가정을 버렸다고 믿고 자기 몫을 지키려 움직였다."
anchor_truth: "이준호는 외도가 아니라 친형과 중2 조카를 숨겨 돌보고 있었지만 그 사실을 숨긴 채 공동 적금 3,000만 원을 형에게 보냈다. 박지연은 남편 외도를 확신한 뒤 2,000만 원을 따로 송금했다가 투자 사기에 당했다."
resolution_dilemma: "숨김은 남편이 먼저 시작했고 실제 비밀 송금은 아내가 먼저 실행했다. 형과 조카를 지키려다 공동재산을 독단 처분한 남편과, 배신당했다고 믿고 자기 몫을 지키려다 2,000만 원을 날린 아내 중 누구 책임이 더 무거운가."
context:
  type: "marital_finance_reframe"
  description: "남편 카드 명세서에 여성 생리대, 스타킹이 찍혀 있고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신한다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 카드 결제, 오피스텔 출입, 새벽 통화가 한 방향으로만 겹쳐 외도처럼 보인다. 그러나 형 문자와 조카 알림이 열리면 그 패턴은 가족 돌봄으로 재맥락화되고, 공동 적금 3,000만 원과 2,000만 원 송금이 연달아 드러나면서 사건의 중심은 외도가 아니라 서로 말하지 못한 가족 공포와 비밀 송금 순서로 뒤집힌다."
party_a:
  name: "박지연"
  age: 36
  occupation: "학원 데스크 직원"
  archetype: "victim_cosplay"
  speech_style: "배신당한 사람이라는 위치를 먼저 잡고 말하지만, 동기 질문이 들어오면 수치심과 불안을 핑계로 설명 범위를 넓힌다."
  fear: "외도가 아니었는데도 자신이 먼저 2,000만 원을 움직였다는 실행 책임이 중심으로 굳는 것을 두려워한다."
  daily_routine: "학원 마감 뒤 집에 돌아와 카드 내역과 통화기록을 반복해 확인하며 남편이 먼저 가정을 버릴지 모른다는 불안을 키웠다."
  sensitive_points:
    - "오피스텔 출입과 새벽 통화는 딴살림 흔적인가"
    - "아내의 2,000만 원 송금은 자기방어인가, 이혼 대비 은닉인가"
    - "누가 먼저 신뢰를 깼는가"
  verbal_tells:
    - "자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다."
    - "그때는 다른 선택이 없었다는 말로 계산된 선택의 각도를 흐린다."
    - "작은 인정부터 꺼내고 가장 수치스러운 사실은 마지막에 말한다."
  to_partner: "여보"
  to_judge: "제 남편"
  angry: "이준호!"
party_b:
  name: "이준호"
  age: 38
  occupation: "가전매장 직원"
  archetype: "avoidant"
  speech_style: "사실을 완전히 부정하기보다 중요한 이유를 뒤로 미루고, 모호어로 시간을 벌다가 압박이 누적되면 한꺼번에 털어놓는다."
  fear: "형네를 숨긴 이유와 공동 적금 3,000만 원 이체가 한 덩어리로 묶여 자기 책임만 남는 상황을 두려워한다."
  daily_routine: "매장 마감 뒤 형네 오피스텔에 들러 조카 저녁과 생필품을 챙기고 새벽에는 형 사정을 확인한 뒤 집으로 돌아왔다."
  sensitive_points:
    - "오피스텔 출입과 새벽 통화는 딴살림 흔적인가"
    - "공동 적금 3,000만 원은 어디로 갔고 배우자 동의 없이 움직인 것인가"
    - "누가 먼저 신뢰를 깼는가"
  verbal_tells:
    - "질문을 바로 받지 않고 한 박자 늦게 받아 핵심어를 피한다."
    - "큰 사실은 인정하되 가장 아픈 이유는 마지막까지 자른다."
    - "선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다."
  to_partner: "여보"
  to_judge: "제 아내"
  angry: "박지연!"
disputes:
  - id: "d-1"
    title: "오피스텔 출입과 새벽 통화는 딴살림 흔적인가"
    quadrant: "b_only"
    truth_description: "오피스텔 출입과 새벽 통화는 외도가 아니라 친형과 조카를 숨겨 돌본 가족 돌봄의 흔적이었다."
  - id: "d-2"
    title: "공동 적금 3,000만 원은 어디로 갔고, 배우자 동의 없이 움직인 것인가"
    quadrant: "b_only"
    truth_description: "이준호는 공동 적금 3,000만 원을 형 계좌로 보냈고, 가족 구제 의도와 별개로 공동 자금을 독단 처분했다."
  - id: "h-d3"
    title: "아내의 2,000만 원 송금은 자기방어인가, 이혼 대비 은닉인가"
    quadrant: "a_only"
    truth_description: "박지연의 2,000만 원 송금은 자기방어 심리와 이혼 대비 은닉 시도가 겹친 선택이었다."
  - id: "h-d4"
    title: "누가 먼저 신뢰를 깼는가"
    quadrant: "shared_misconception"
    truth_description: "숨김은 이준호가 먼저 시작했고 실제 비밀 송금은 박지연이 먼저 실행했다."
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids: ["dc-1", "dc-2", "dc-3", "dc-4", "dc-5"]
dossier_question_ids:
  - "dc-1.b.q1"
  - "dc-2.b.q1"
  - "dc-3.b.q1"
  - "dc-3.b.q2"
  - "dc-4.a.q1"
  - "dc-4.a.q2"
  - "dc-5.b.q1"
  - "dc-5.a.q1"
lead_ids: ["L-1", "L-2", "L-3", "L-4", "L-5"]
combination_recipe_ids:
  - "lead-1"
  - "dossier-1"
  - "lead-2"
  - "dossier-2"
  - "lead-3"
  - "dossier-3"
  - "lead-4"
  - "dossier-4"
  - "lead-5"
  - "dossier-5"
statement_node_ids: ["stmt-b-family", "stmt-b-repay", "stmt-a-protect"]
witness_angle_node_ids: ["w-1-angle", "w-3-angle"]
monetary_dispute_ids: ["d-2", "h-d3", "h-d4"]
result_classes:
  - "a_primary_fault"
  - "b_primary_fault"
  - "shared_fault"
  - "protective_resolution"
  - "procedural_caution"
system_keys:
  - "interrogation|repeat_warning"
  - "evidence|new_unlock"
  - "evidence|trap_notice"
  - "dossier|challenge_cleared"
  - "witness|credibility_shift"
  - "verdict|profile_update"
```

## runtime 구조 메모

### 1. 초기/숨은 쟁점 구조
- 초기 표시:
  - `d-1` 오피스텔 출입과 새벽 통화
  - `d-2` 공동 적금 3,000만 원 이동
- 숨은 쟁점:
  - `h-d3`: `e-6` 제시 시 해금
  - `h-d4`: `h-d3` 해금 + `e-7` 제시 시 해금
- 사건 곡선은 아래 순서로 유지한다.
  - early: 카드 결제, 오피스텔 출입, 새벽 통화가 한 방향으로만 겹치며 외도처럼 보이는 구간
  - mid: 형 문자와 조카 알림이 열리며 외도 프레임이 가족 돌봄으로 재맥락화되는 구간
  - late: 공동 적금 3,000만 원, A의 2,000만 원 송금, 부부 돈 5,000만 원의 선후가 분리되는 구간

### 2. Evidence Coverage
- `e-1` 카드 명세서
  - proves: `d-1`
  - subject: `b`
  - base evidence
- `e-2` 오피스텔 주차 출입 기록
  - proves: `d-1`
  - subject: `b`
  - base evidence
- `e-3` 새벽 통화기록
  - proves: `d-1`
  - subject: `b`
  - base evidence
- `e-4` 형 문자 + 조카 학교 알림 문자
  - proves: `d-1`
  - subject: `b`
  - requires: `e-3`
- `e-5` 공동 적금 해지 내역 + 형 계좌 이체
  - proves: `d-2`, `h-d4`
  - subject: `b`
  - requires: `e-4`
- `e-6` A의 투자방 카톡 + 2,000만 원 송금 영수증
  - proves: `h-d3`, `h-d4`
  - subject: `a`
  - requires: `e-5`
- `e-7` 통화·출입·계좌 이동 대조표
  - proves: `h-d4`
  - subject: `both`
  - requires: `e-5`, `e-6`

### 3. Witness Coverage
- `w-1` 이성호
  - bias: `pro_b`
  - related disputes: `d-1`, `d-2`, `h-d4`
  - profile: 친형 / 택배 상하차 / 생활 사정은 빨리 털어놓지만 동생 책임을 직접 묻는 질문에는 한 박자 늦게 답한다
  - judge address: `재판관님`
  - address A/B: `지연 씨`, `준호야`
- `w-2` 이가은
  - bias: `pro_b`
  - related disputes: `d-1`
  - profile: 중학생 / 짧고 구체적으로 말하고 부끄러운 내용은 직접 표현을 피한다
  - judge address: `재판관님`
  - address A/B: `아주머니`, `삼촌`
- `w-3` 박미라
  - bias: `pro_a`
  - related disputes: `h-d3`, `h-d4`
  - profile: 카페 운영 / 과장은 하지 않지만 누가 먼저 무슨 말을 했는지는 또렷하게 기억한다
  - judge address: `재판관님`
  - address A/B: `지연 씨`, `준호 씨`

### 4. 증거 깊이와 신뢰 축
- runtime의 `evidenceAxisLegend`를 그대로 따른다.
  - depth: `stub` -> `excerpt` -> `original` -> `context` -> `established`
  - trust: `submitted` -> `verifying` -> `authenticated` -> `challenged` -> `misread`
- spouse v3는 **같은 자료가 깊이에 따라 완전히 다른 의미로 읽히는 구조**다.
  - `e-1`, `e-2`, `e-3`: 외도처럼 보이는 표면
  - `e-4`: 외도 프레임이 형네 돌봄으로 뒤집히는 반전
  - `e-5`: 3,000만 원 독단 이동이 사건의 두 번째 축으로 올라오는 지점
  - `e-6`: A의 2,000만 원 송금과 수치심이 열리는 지점
  - `e-7`: 숨김의 시작과 송금 실행의 순서를 분리하는 최종 재프레임

### 5. Evidence Combinations + 핵심 발언 확장
- evidence combinations:
  - `e-1 + e-2 -> d-1`
  - `e-3 + e-4 -> d-1`
  - `e-4 + e-5 -> d-2`
  - `e-5 + e-6 -> h-d4`
  - `e-6 + e-7 -> h-d3`, `h-d4`
- 핵심 statement / witness angle nodes:
  - `stmt-b-family`: B의 발언 `"가족 쪽 일입니다"`
  - `stmt-b-repay`: B의 발언 `"형이 곧 갚는다고 했습니다"`
  - `stmt-a-protect`: A의 발언 `"혹시 모르니까 제 몫을 지키려 했어요"`
  - `w-1-angle`: `w-1` 이성호 증언 축
  - `w-3-angle`: `w-3` 박미라 증언 축
- combination recipes:
  - `lead-1`: `e-1 + e-2 -> L-1`
  - `dossier-1`: `L-1 + e-4 -> dc-1`
  - `lead-2`: `e-3 + stmt-b-family -> L-2`
  - `dossier-2`: `L-2 + e-4 -> dc-2`
  - `lead-3`: `e-4 + e-5 -> L-3`
  - `dossier-3`: `L-3 + stmt-b-repay -> dc-3`
  - `lead-4`: `e-6 + stmt-a-protect -> L-4`
  - `dossier-4`: `L-4 + w-3-angle -> dc-4`
  - `lead-5`: `e-5 + e-6 -> L-5`
  - `dossier-5`: `L-5 + e-7 -> dc-5`
- GPT Pro는 이 노드들을 문장에 그대로 읽어주면 안 된다.
  - 의미 축과 반응 방향만 가져가고 실제 대사는 자연 한국어로 재작성해야 한다.

### 6. Lead 해석 차이
- `L-1 Timeline Lead`
  - `L-1-A`: 외도 동선이다
  - `L-1-B`: 누군가를 돌보는 생활 동선이다
  - `L-1-C`: 단순 심부름일 수 있다
- `L-2 Context Lead`
  - `L-2-A`: 외도는 아니지만 창피해서 숨겼다
  - `L-2-B`: 시댁 불화를 피하려 숨겼다
- `L-3 Beneficiary Lead`
  - `L-3-A`: 형네를 실제로 살리려 한 돈이다
  - `L-3-B`: 형의 무책임을 대신 떠안은 월권이다
- `L-4 Emotion Lead`
  - `L-4-A`: 배신 공포 속 자기방어다
  - `L-4-B`: 이혼 대비 은닉이다
- `L-5 Reframe Lead`
  - `L-5-A`: 남편이 더 큰돈을 먼저 무너뜨렸다
  - `L-5-B`: 아내가 먼저 돈을 움직여 신뢰를 깼다
  - `L-5-C`: 거울형 거짓말 구조다
- GPT Pro는 lead를 정답처럼 선언하지 말고, **리드 해석에 따라 말의 온도와 무게중심이 바뀌는 구조**로 써야 한다.

### 7. DossierCard 압박 구조
- `dc-1 / dc-1.b.q1`
  - 질문: `"그 오피스텔에 있던 사람이 외도 상대가 아니라 형과 조카라면, 왜 지금까지 한마디도 못 했습니까?"`
  - effect: `spouse-v3-01:b:d-1:S3:0`
- `dc-2 / dc-2.b.q1`
  - 질문: `"숨긴 이유가 외도가 아니라면, 당신은 아내보다 시댁과의 싸움을 더 두려워한 겁니까?"`
  - effect: `spouse-v3-01:b:d-1:S4:1`
- `dc-3 / dc-3.b.q1`
  - 질문: `"공동 적금 3,000만 원을 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?"`
  - effect: `spouse-v3-01:b:d-2:S4:0`
- `dc-3 / dc-3.b.q2`
  - 질문: `"가족을 돕는 일이었다 해도, 배우자 동의 없이 공동 적금을 깬 책임은 인정합니까?"`
  - effect: `spouse-v3-01:b:d-2:S5:0`
- `dc-4 / dc-4.a.q1`
  - 질문: `"남편의 진실을 확인하기도 전에 2,000만 원을 먼저 움직인 이유가, 결국 이혼 대비였습니까?"`
  - effect: `spouse-v3-01:a:h-d3:S3:0`
- `dc-4 / dc-4.a.q2`
  - 질문: `"그 2,000만 원을 보내고 사기당한 사실까지 숨긴 건 결국 수치심 때문이었습니까?"`
  - effect: `spouse-v3-01:a:h-d3:S4:0`
- `dc-5 / dc-5.b.q1`
  - 질문: `"숨김은 누가 먼저 시작했고, 돈은 누가 먼저 움직였습니까?"`
  - effect: `spouse-v3-01:b:h-d4:S3:0`
- `dc-5 / dc-5.a.q1`
  - 질문: `"남편이 먼저 숨겼다고 해도, 실제 비밀 송금 실행은 당신이 먼저였다는 점까지 인정합니까?"`
  - effect: `spouse-v3-01:a:h-d4:S3:0`
- dossier 반응은 기본 증거 반응의 반복이 아니라, 위 질문이 state를 한 단계 밀어올리는 **붕괴 반응**이어야 한다.

### 8. Authority 배치
- `원본 제출 명령`
  - `d-1` 초반 `e-1/e-3` Excerpt 시점: 감정이 아니라 패턴으로 의심을 고정
  - `e-4` 등장 직후: 형 문자와 조카 알림 원본 확보
  - `h-d3` 등장 직후 `e-6` 축: A의 2,000만 원 송금 확정
- `정확히 답변하십시오`
  - B가 `"가족 쪽 일"` 같은 모호어를 반복할 때 사용
- `분리심문`
  - `e-4 Original` 직후 B: `avoidant`인 B를 더 빨리 무너뜨림
  - `e-6 Excerpt` 직후 A: 피해자 프레임을 줄이고 동기 노출
- `잠정 인정`
  - `e-4` 인증 후: 오피스텔 방문 대상은 형네였다고 기록
  - `e-5` 인증 후: 공동 적금 3,000만 원 이동 기록
  - `e-6` 인증 후: A의 2,000만 원 송금 기록
  - `e-7 Established` 후: 숨김 시작과 송금 실행의 선후 분리 기록
- `선처 창구`
  - `dc-3` 또는 `dc-4` 직후: B는 죄책감, A는 수치심을 더 빨리 인정
- `발언 제지 / 기록 제외`
  - A가 딴살림 단정만 반복하거나 B가 A를 조롱할 때 사용
- `민감정보 봉인 해제`
  - 돌봄 해석을 택했지만 실체가 부족할 때 또는 `dc-1` 직전 사용

### 9. 민감정보 경계 + 공식기록 권고
- `e-4` 민감 봉인 대상:
  - 조카 이름
  - 학교명
  - 학년
  - 생리 관련 직접 표현
- risk:
  - 미성년자 사생활을 너무 일찍 열면 인도성 점수 하락과 B의 추가 셧다운이 발생할 수 있다
- official record recommendations:
  - `B의 오피스텔 방문 대상은 형과 조카였다.`
  - `B는 공동 적금 3,000만 원을 배우자 동의 없이 형에게 보냈다.`
  - `A는 남편의 외도를 확신한 뒤 2,000만 원을 따로 송금했다.`
  - `숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.`
  - `두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.`

## 품질 + validator 통합 규격

### callTerms 절대 규칙
- spouse-v3-01의 직접 호칭은 아래만 쓴다.
  - A -> B: `여보`
  - B -> A: `여보`
  - A 격앙 호칭: `이준호!`
  - B 격앙 호칭: `박지연!`
  - A가 재판관에게 B를 지칭: `제 남편`
  - B가 재판관에게 A를 지칭: `제 아내`
- 부부 직접 호칭에 `~씨`는 금지다.
- `interrogation`, `evidence_present`, `dossier`, `witness`는 judge-facing validator가 걸리므로 line 전체는 `재판관님,`으로 시작하고 합니다체를 유지한다.
- 직접 호칭은 line 전체 register를 깨지 않는 범위에서만 감정의 잔향으로 제한적으로 녹인다.

### Level 4 핵심 항목 직접 반영
- `4-A1 호칭 정확성`
  - `toJudge`, `toPartner`, `angry` 혼용 금지
- `4-A2 존칭/어체`
  - 재판관에게 하는 모든 문장은 합니다체
  - 부부 세계관은 반말이지만 현재 bundle line은 judge-facing 우선
- `4-A3 Truth Throttle`
  - `S0~S1`: 정답 방향, 실명 축, 금액, 구조를 먼저 까지 마라
  - `S2~S3`: 부분 인정과 범위형 표현
  - `S4~S5`: 전면 공개 가능
- `4-A5 Archetype 일관성`
  - A=`victim_cosplay`
  - B=`avoidant`
- `4-A8 거짓말 단계 정합`
  - `S0`: 부정/회피
  - `S1`: 균열
  - `S2`: 합리화
  - `S3`: 부분 인정/전가
  - `S4`: 감정 붕괴
  - `S5`: 자백
- `4-A9 번역체 금지 9패턴`
- `4-F1~F7 한국어 품질`
  - 조사, 시제, 대명사, 문장 완결성, 맥락, 반복, 자연스러움 직접 관리
- `4-G1~G3 variant`
  - variant 간 차이가 실제로 느껴져야 한다
  - 같은 state 안에서는 사실관계가 흔들리면 안 된다
  - 다음 질문으로 넘어가면 state가 한 단계 더 열린 느낌이 나야 한다

### 번역체/보고서체 금지
- `된 것으로 생각됩니다`
- `인 측면이 있습니다`
- `부득이하게`
- `인지하고 있습니다`
- `에 기인합니다`
- `해당 건에 대해서는`
- `하는 바입니다`
- `관련 사항을 간과`
- `여러 가지 상황이 얽혀`
- `사전 상의`, `사전 협의`, `미리 말씀드리지 못한`, `특정 X`

### 추가 금지
- 설계 문서 문장 복붙
- 질문 원문 복창
- `truthDescription`, `surfaceName`, 필드명 직복붙
- narrator 문장
- 메타 발화
- 플레이어보다 먼저 정답 선언

### validator 규격
- judge-facing line은 `재판관님,`으로 시작한다.
- judge-facing line은 끝까지 합니다체를 유지한다.
- 금지 종결:
  - `-지요`
  - `-니까요`
  - `-거든요`
  - `-게요`
  - `-서요`
- 허용 예시:
  - `-습니다`
  - `-습니까`
  - `-입니다`
  - `-했습니다`
  - `-하겠습니다`
  - `-없습니다`
- 예외:
  - `emotional/confession` 성격의 `S4~S5 empathy_approach`에서만 해요체를 제한적으로 허용
- 문장 수:
  - `deny`, `hedge`: 1~2문장
  - `partial`, `blame`, `emotional`, `confess`: 2~3문장
  - `S5`: 3~4문장
  - `witness vague`: 1문장
  - `witness partial`: 2~3문장
  - `witness full`: 3~5문장
  - `aftermath`: 2~5문장
  - `system_message`: 1~3문장
- evidence_present는 해당 증거의 표면 키워드를 직접 포함해야 한다.
  - `e-1`: `카드`, `명세서`, `결제`
  - `e-2`: `오피스텔`, `출입`, `기록`
  - `e-3`: `새벽`, `통화`, `기록`
  - `e-4`: `문자`, `형`, `조카`
  - `e-5`: `적금`, `해지`, `계좌 이체`, `3,000만 원`
  - `e-6`: `카톡`, `송금`, `영수증`, `2,000만 원`
  - `e-7`: `통화`, `출입`, `대조표`, `계좌 이동`
- `S5` 금액 의무 노출은 monetary dispute에만 적용한다.
  - `d-2`: `3,000만 원`
  - `h-d3`: `2,000만 원`
  - `h-d4`: `5,000만 원`
- 비금전 쟁점 `d-1`에는 금전어를 넣지 마라.
  - 금지 예: `돈`, `적금`, `송금`, `이체`, `계좌`, `원`, `만원`

## GPT Pro 공통 첨부

### 필수 첨부
- `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
- `docs/ref/리뉴얼참고/thread-s-v3-case-design-spouse.md`
- `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
- `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- `src/data/cases/generated/spouse-v3-01.json`
- `docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json`

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 작업은 spouse v3 사건 "새벽 통화기록" 전용이다.
기존 spouse v1/v2 문장이나 다른 사건 대사를 참고하거나 모사하지 마라.
현재 첨부된 spouse v3 자료만 사용하라.

사건의 큰 곡선:
- 카드 명세서, 오피스텔 출입, 새벽 통화로 시작하는 외도 의심
- 형 문자와 조카 알림으로 드러나는 가족 돌봄 반전
- 시댁 불화 공포 때문에 숨겼다는 맥락 보강
- 공동 적금 3,000만 원 이동
- 아내의 2,000만 원 송금과 투자 사기
- 최종적으로 부부 돈 5,000만 원의 선후를 따지는 재프레임

callTerms 절대 규칙:
- A가 B를 직접 부를 때 기본은 "여보"
- B가 A를 직접 부를 때 기본은 "여보"
- 격앙 직접 호칭은 A="이준호!", B="박지연!"
- 재판관에게 상대를 말할 때는 A="제 남편", B="제 아내"
- 부부 사이 "~씨"는 금지
- interrogation/evidence_present/dossier/witness는 전부 "재판관님,"으로 시작하고 합니다체를 유지하라

Level 4 품질 규칙:
- 4-A1: 호칭 정확성
- 4-A2: 재판관에게는 합니다체
- 4-A3: Truth Throttle
- 4-A5: A는 victim_cosplay, B는 avoidant
- 4-A8: S0 부정/회피 -> S1 균열 -> S2 합리화 -> S3 부분 인정/전가 -> S4 감정 붕괴 -> S5 자백
- 4-A9: 번역체 9패턴 금지
- 4-F1~F7: 한국어 조사, 시제, 대명사, 자연스러움, 반복, 맥락 관리
- 4-G1~G3: variant 차이와 일관성 유지

v3 구조 규칙:
- evidence는 Stub/Excerpt/Original/Context/Established 깊이에 따라 반응 초점이 달라져야 한다
- `stmt-b-family`, `stmt-b-repay`, `stmt-a-protect`, `w-1-angle`, `w-3-angle`는 의미 축이지 문장 복붙 소스가 아니다
- Lead는 정답이 아니라 리드다. 해석 방향에 따라 말의 온도와 무게중심이 달라져야 한다
- DossierCard는 기본 증거 질문 반복이 아니라 state를 강제로 밀어올리는 카드여야 한다
- Authority 행동에 따라 숨김, 붕괴, 수치심, 죄책감의 타이밍이 달라져야 한다

validator 규격:
- judge-facing line은 "재판관님,"으로 시작
- judge-facing line은 합니다체
- deny/hedge 1~2문장
- partial/blame/emotional/confess 2~3문장
- S5 3~4문장
- witness vague 1문장 / partial 2~3문장 / full 3~5문장
- aftermath 2~5문장
- system_message 1~3문장
- evidence_present는 해당 증거 키워드를 직접 넣어라
- monetary dispute의 S5는 금액을 직접 넣어라
- d-1에는 금전어를 넣지 마라

한국어 금지:
- 된 것으로 생각됩니다
- 인 측면이 있습니다
- 부득이하게
- 인지하고 있습니다
- 에 기인합니다
- 해당 건에 대해서는
- 하는 바입니다
- 관련 사항을 간과
- 여러 가지 상황이 얽혀
- 사전 상의 / 사전 협의 / 미리 말씀드리지 못한 / 특정 X

절대 금지:
- 설계 문장 복붙
- 질문 원문 복창
- evidence name 낭독체
- narrator 문장
- 메타 발화
- 플레이어보다 먼저 정답 선언
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 박지연만이다.

생성 범위:
- disputes: d-1, d-2, h-d3, h-d4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

박지연 추가 규칙:
- 기본 프레임은 "이미 배신당한 사람"이다
- A는 victim_cosplay이므로, 먼저 피해 위치를 잡고 그 다음에 자기 행동을 설명하려 한다
- d-1 early에서는 남편 외도를 거의 확신하는 사람처럼 반응하되, 아직 2,000만 원 송금 쪽 자기 책임은 열지 마라
- d-2에서는 남편의 독단과 공동재산 배신을 먼저 문제 삼고, 자기 쪽 실행 책임은 늦게 연다
- h-d3는 "제 몫을 지키려 했다" -> "먼저 보냈다" -> "사기당한 것도 숨겼다" 순서가 보여야 한다
- h-d4에서는 "남편이 먼저 숨겼다"와 "실제 돈은 내가 먼저 움직였다"가 서로 다른 축이라는 점이 late에서 열려야 한다
- soft_confession tell은 S4~S5에서만 강하게 나온다
- avoidant 리듬을 흉내 내면 실패다

v3/Authority 반영:
- 분리심문 뒤에는 남편 비난보다 자기 불안과 수치심이 더 빨리 나온다
- 정확히 답변하십시오를 받으면 두루뭉술한 피해 호소가 줄고 자기 선택 설명이 늘어나야 한다
- 선처 창구가 열리면 "그때는 진짜 버려지는 줄 알았다"는 감정 축이 더 직접적으로 나올 수 있다

validator 절대 규칙:
- d-1에서는 금전어 금지
- h-d3의 S5는 반드시 `2,000만 원`을 직접 포함
- h-d4의 S5는 반드시 `5,000만 원`을 직접 포함

출력 형식:
{
  "channel": "interrogation",
  "party": "a",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

