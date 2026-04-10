# Thread W Friend v3-01 GPT Pro Prompt

## 목적
- Thread S가 설계하고 Story Gate를 통과한 friend v3 사건 `손절한 절친` 전용 GPT Pro 프롬프트 완성본이다.
- `src/data/cases/generated/friend-v3-01.json`과 `docs/ref/리뉴얼참고/friend-v3-01-v3-game-loop-data.json`의 runtime/helper 실데이터를 반영했다.
- 목표는 **v3 게임 구조 + Level 4 품질 기준 + validator 규격**을 한 번에 만족하는 4세션 분할 프롬프트를 고정하는 것이다.

## 입력 고정본
- 구조 기준:
  - `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
  - `docs/ref/리뉴얼참고/thread-s-v3-case-design-friend.md`
- 품질 기준:
  - `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
  - `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- 보조 기준:
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- runtime 기준:
  - `src/data/cases/generated/friend-v3-01.json`
  - `docs/ref/리뉴얼참고/friend-v3-01-v3-game-loop-data.json`

## 현재 상태
- Story Gate: `PASS`
- runtime: `available`
- v3 helper: `available`
- working slug: `friend-v3-01`
- caseId: `case-friend-v3-01`
- caseNumber: `TE-FriendV301`

## runtime 반영 완료 항목
- exact `caseId`, `disputeIds`, `evidenceIds`, `baseEvidenceIds`, `witnessIds`, `monetaryDisputeIds` 반영 완료
- `dossierCardIds`, `dossierQuestionIds`, `leadIds`, `combination recipes`, `statement nodes`, `witness angle nodes` 반영 완료
- `authorityPlacements`, `hidden dispute unlock rules`, `officialRecordRecommendations`, `sensitive seal targets` 반영 완료
- witness profile과 party별 `fear`, `blindSpot`, `desireToBeSeen`, `callTerms` 반영 완료
- `resultClasses`, `system_message` keys는 runtime/helper에 사건별 override가 없어 current writer bundle baseline을 사용한다

## 사건별 Intake

```yaml
story_gate_status: "PASS"
case_id: "case-friend-v3-01"
working_slug: "friend-v3-01"
case_number: "TE-FriendV301"
title: "손절한 절친"
category: "friend"
summary: "손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다. 초반에는 연락기록과 단톡방 캡처가 모두 B의 집착을 가리키지만, 예비신랑의 선넘는 메시지와 아버지의 돈 접근이 열리면 현재 사건은 경고 실패로, 과거 손절은 오래된 사기와 침묵 구조로 재맥락화된다. 마지막에는 과거와 현재가 같은 패턴이라는 대조표가 열리며 사건의 중심이 친구의 집착이 아니라 두 번 반복된 악역 서사로 뒤집힌다."
headline_hook: "손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다."
emotional_bait: "연락기록과 단톡방 캡처는 친구 집착처럼 보이지만, 예비신랑의 선넘기와 아버지의 돈 접근이 열릴수록 사건은 경고 실패와 반복 패턴으로 재정의된다."
anchor_truth: "최수민의 반복 연락은 집착이 아니라 경고였다. 예비신랑이 먼저 선을 넘었고, 송다은의 아버지는 과거에도 B에게, 현재는 예비신랑에게 비슷한 방식으로 돈을 뜯어내려 했다. 그러나 최수민은 두 번 다 진실을 직접 말하지 못한 채 악역이 되는 쪽을 택했고, 송다은은 직접 확인 없이 먼저 친구를 문제 인물로 만들었다."
resolution_dilemma: "최수민은 친구를 지키려 했지만 이번에도 우회하고 숨겼고, 그래서 더 큰 오해를 만들었다. 송다은은 직접 확인도 없이 친구를 매도했지만, 아버지의 진실을 모른 채 결혼이 무너질까 두려워 반응한 사람이기도 하다."
context:
  type: "friendship_warning_reframe"
  description: "손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 연락기록과 단톡방 캡처가 모두 B의 집착을 가리킨다. 그러나 예비신랑의 선넘는 메시지와 아버지의 돈 접근이 열리면 현재 사건은 경고 실패로, 과거 손절은 오래된 사기와 침묵 구조로 재맥락화된다. 마지막에는 과거와 현재가 같은 패턴이라는 대조표가 열리며 사건의 중심이 친구의 집착이 아니라 두 번 반복된 악역 서사로 뒤집힌다."
party_a:
  name: "송다은"
  age: 31
  occupation: "온라인 쇼핑몰 CS 직원"
  archetype: "premature_summary"
  speech_style: "핵심 사실을 확인하기 전에 이미 결론난 이야기처럼 요약하고, 감정이 올라오면 같은 문장을 반복한다."
  fear: "결혼 직전에 모든 게 무너지고 자신이 또 속았다는 사실을 직면하는 걸 두려워한다."
  blind_spot: "과거와 현재를 한 문장으로 덮는 요약이 오히려 진실을 가린다는 점을 늦게 본다."
  desire_to_be_seen: "불안해서 과하게 반응한 사람이 아니라 정당하게 상처받은 사람으로 보이고 싶어 한다."
  to_other: "수민아"
  to_judge: "제 친구"
  angry: "최수민!"
party_b:
  name: "최수민"
  age: 31
  occupation: "필라테스 강사"
  archetype: "affect_flattening"
  speech_style: "상대가 감정적으로 몰아칠수록 더 담담하게 말하며, 수치심이 걸린 사실은 끝까지 늦게 꺼낸다."
  fear: "진실을 말하는 순간 다은의 결혼과 가족 세계가 한꺼번에 무너질까 두려워한다."
  blind_spot: "직접 말하지 않고 악역이 되는 편을 택한 선택이 두 번 다 같은 상처를 남겼다는 점을 과소평가한다."
  desire_to_be_seen: "친구를 노린 사람이 아니라 두 번 다 막으려 했던 사람으로 이해받고 싶어 한다."
  to_other: "다은아"
  to_judge: "제 친구"
  angry: "송다은!"
disputes:
  - id: "d-1"
    title: "B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가"
    quadrant: "b_only"
    truth_description: "B의 반복 연락은 집착처럼 보였지만 실제 목적은 경고였다."
  - id: "d-4"
    title: "예전 손절 사건도 정말 B의 변심 때문이었는가"
    quadrant: "b_only"
    truth_description: "과거 손절의 진짜 시작은 B의 변심이 아니라 A 아버지의 사기와 B의 침묵이었다."
  - id: "d-5"
    title: "이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가"
    quadrant: "a_only"
    truth_description: "A는 직접 확인 없이 단톡방에서 먼저 B를 문제 인물로 만들었다."
  - id: "h-d2"
    title: "예비신랑이 먼저 B에게 선을 넘었는가"
    quadrant: "b_only"
    truth_description: "먼저 선을 넘은 쪽은 예비신랑이었다."
  - id: "h-d3"
    title: "A 아버지의 돈 접근은 과거와 현재가 같은 패턴인가"
    quadrant: "third_party"
    truth_description: "A 아버지는 과거에도 B에게, 현재는 예비신랑에게 비슷한 방식으로 돈을 요구했다."
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids: ["dc-1", "dc-2", "dc-3", "dc-4", "dc-5"]
dossier_question_ids:
  - "dc-1.b.q1"
  - "dc-2.b.q1"
  - "dc-3.b.q1"
  - "dc-4.b.q1"
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
statement_node_ids: ["stmt-b-protect", "stmt-b-villain"]
witness_angle_node_ids: ["w-3-angle"]
monetary_dispute_ids: []
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
  - `d-1` B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가
  - `d-4` 예전 손절 사건도 정말 B의 변심 때문이었는가
  - `d-5` 이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가
- 숨은 쟁점:
  - `h-d2`: `e-4` 제시 시 해금
  - `h-d3`: `e-5` 제시 시 해금
- 사건 곡선은 아래 순서를 유지한다.
  - early: B가 예비신랑에게 집착한 것처럼 보이는 구간
  - mid: 예비신랑의 선넘기와 단톡방 낙인이 충돌하며 프레임이 흔들리는 구간
  - late: A 아버지의 돈 접근이 과거와 현재의 같은 패턴으로 묶이는 구간

### 2. Evidence Coverage
- `e-1` B→예비신랑 연락 기록
  - proves: `d-1`
  - subject: `b`
  - base evidence
- `e-2` 공통 친구 단톡방 캡처
  - proves: `d-1`, `d-5`
  - subject: `a`
  - base evidence
- `e-3` 과거 손절 직전 카톡
  - proves: `d-4`
  - subject: `b`
  - base evidence
- `e-4` 예비신랑의 선넘는 메시지 + B의 거절 답장
  - proves: `d-1`, `h-d2`
  - subject: `b`
  - requires: `e-1`
- `e-5` A 아버지와 예비신랑의 문자
  - proves: `d-1`, `h-d3`
  - subject: `b`
  - requires: `e-4`
- `e-6` 과거 송금 영수증 + 아버지 문자
  - proves: `d-4`, `h-d3`
  - subject: `b`
  - requires: `e-5`
- `e-7` 과거·현재 대조표
  - proves: `d-4`, `d-5`, `h-d3`
  - subject: `b`
  - requires: `e-5`, `e-6`

### 3. Witness Coverage
- `w-1` 김세라
  - bias: `pro_a`
  - related disputes: `d-5`
  - profile: 미용실 직원 / 분위기를 읽으며 말해 A 쪽으로 약간 기울 수 있다
  - judge address: `재판관님`
  - address A/B: `다은아`, `수민아`
- `w-2` 박준혁
  - bias: `neutral`
  - related disputes: `h-d2`
  - profile: 회사원 / 직접 본 분위기만 말하려 하고 단정은 피한다
  - judge address: `재판관님`
  - address A/B: `다은 씨`, `수민 씨`
- `w-3` 오미경
  - bias: `pro_b`
  - related disputes: `d-4`, `h-d3`
  - profile: 분식집 사장 / 오래전 기억이라 날짜는 흐리지만 분위기와 장면은 선명하게 말한다
  - judge address: `재판관님`
  - address A/B: `다은아`, `수민아`

### 4. 증거 깊이와 신뢰 축
- runtime의 `evidenceAxisLegend`를 그대로 따른다.
  - depth: `stub` -> `excerpt` -> `original` -> `context` -> `established`
  - trust: `submitted` -> `verifying` -> `authenticated` -> `challenged` -> `misread`
- friend v3는 **발췌본만 보면 B가 나빠 보이고, 맥락이 복원될수록 A의 낙인과 B의 침묵이 같이 재평가되는 구조**다.
  - `e-1`, `e-2`, `e-3`: 집착과 손절처럼 보이는 표면
  - `e-4`: 예비신랑이 먼저 선을 넘었다는 반전
  - `e-5`: 현재 사건의 진짜 제3자 패턴이 열리는 지점
  - `e-6`: 과거 손절과 돈 접근이 연결되는 지점
  - `e-7`: 과거와 현재를 같은 악역 서사로 묶는 최종 재프레임

### 5. Evidence Combinations + 핵심 발언 확장
- 핵심 statement / witness angle nodes:
  - `stmt-b-protect`: B의 발언 `"또 당하게 둘 수 없었다"`
  - `stmt-b-villain`: B의 발언 `"차라리 내가 나쁜 사람이 되는 게 낫다고 생각했다"`
  - `w-3-angle`: `w-3` 오미경 증언 축
- combination recipes:
  - `lead-1`: `e-1 + e-2 -> L-1`
  - `dossier-1`: `L-1 + e-4 -> dc-1`
  - `lead-2`: `e-2 + e-3 -> L-2`
  - `dossier-2`: `L-2 + e-6 -> dc-2`
  - `lead-3`: `e-1 + e-5 -> L-3`
  - `dossier-3`: `L-3 + stmt-b-protect -> dc-3`
  - `lead-4`: `e-6 + stmt-b-villain -> L-4`
  - `dossier-4`: `L-4 + w-3-angle -> dc-4`
  - `lead-5`: `e-5 + e-6 -> L-5`
  - `dossier-5`: `L-5 + e-7 -> dc-5`

### 6. Lead 해석 차이
- `L-1 Contradiction Lead`
  - `L-1-A`: B가 예비신랑에게 집착한다
  - `L-1-B`: 겉으로는 집착처럼 보여도 빠진 맥락이 있다
- `L-2 Timeline Lead`
  - `L-2-A`: B는 예전에도 비슷한 식으로 문제를 만들었다
  - `L-2-B`: 예전에도 설명되지 않은 공백이 있었다
- `L-3 Third-party Lead`
  - `L-3-A`: B는 또 핑계를 만든다
  - `L-3-B`: B는 A 아버지의 접근을 보고 경고하려 했다
- `L-4 Context Lead`
  - `L-4-A`: B는 늘 말을 비틀어 더 큰 오해를 만든다
  - `L-4-B`: B는 A의 세계가 무너질까 봐 직접 진실을 못 말했다
- `L-5 Reframe Lead`
  - `L-5-A`: A 아버지의 반복된 돈 접근이 두 사건을 만들었다
  - `L-5-B`: 그 패턴을 봐도 B는 항상 더 좋은 방식으로 말했어야 했다

### 7. DossierCard 압박 구조
- `dc-1 / dc-1.b.q1`
  - 질문: `"먼저 선을 넘은 게 예비신랑이라면, 왜 결국 당신만 집착하는 사람처럼 남았습니까?"`
  - effect: `friend-v3-01:b:h-d2:S3:0`
- `dc-2 / dc-2.b.q1`
  - 질문: `"예전 손절도 정말 당신 변심 때문이었습니까, 아니면 그때도 돈 문제를 숨긴 겁니까?"`
  - effect: `friend-v3-01:b:d-4:S3:0`
- `dc-3 / dc-3.b.q1`
  - 질문: `"A 아버지가 예비신랑에게 또 같은 방식으로 접근했다면, 당신은 왜 이번에도 혼자 막으려 했습니까?"`
  - effect: `friend-v3-01:b:h-d3:S3:0`
- `dc-4 / dc-4.b.q1`
  - 질문: `"왜 늘 진실을 말하는 대신, 차라리 당신이 나쁜 사람처럼 보이는 쪽을 택했습니까?"`
  - effect: `friend-v3-01:b:d-4:S4:0`
- `dc-5 / dc-5.a.q1`
  - 질문: `"과거와 현재가 같은 패턴이었다면, 이번 사건에서 가장 먼저 잘못 기록된 사람은 누구였습니까?"`
  - effect: `friend-v3-01:a:d-5:S3:0`

### 8. Authority 배치
- `원본 제출 명령`
  - `e-1` 확인 직후: 연락 횟수를 감정이 아니라 원본으로 고정
  - `e-4` 포착 직후: 예비신랑 메시지의 전체 흐름 확보
  - `e-5`, `e-6` 진입 직후: 아버지의 현재/과거 돈 접근을 모두 원본으로 확정
- `정확히 답변하십시오`
  - A가 `예전에도 이래서`만 반복하며 과거와 현재를 덮으려 할 때 사용
- `분리심문`
  - `e-4 Original` 직후 B: A 앞에서 닫히는 설명을 먼저 끌어내기
  - `e-6 Original` 직후 A: 아버지 문제가 나오면 즉시 방어적인 A를 흔들어 보기
- `잠정 인정`
  - `e-1` 인증 후: B가 예비신랑에게 반복 연락한 사실 기록
  - `e-4` 인증 후: 예비신랑이 먼저 선을 넘는 메시지를 보낸 사실 기록
  - `e-2` 인증 후: A가 단톡방에서 먼저 B를 문제 인물로 퍼뜨린 사실 기록
  - `e-5` 또는 `e-6` 인증 후: A 아버지가 과거와 현재 모두 돈 접근을 시도한 사실 기록
- `선처 창구`
  - `dc-3`, `dc-4` 직후: B가 `또 내가 나쁜 사람 되는 쪽을 택했다`는 본심을 풀도록 유도
- `발언 제지 / 기록 제외`
  - A가 `내 남자` 프레임만 반복하거나 B가 예비신랑 잘못만 강조할 때 사용
- `민감정보 봉인 해제`
  - `h-d2` 또는 `h-d3`가 열렸지만 마지막 한 걸음이 부족할 때 사용

### 9. 민감정보 경계 + 공식기록 권고
- `e-4` 민감 봉인 대상:
  - 결혼 날짜·장소 표현
  - 성적 뉘앙스가 강한 문장 일부
- `e-5` 민감 봉인 대상:
  - 정확한 돈 액수
  - 결혼 일정·예식장 정보
  - 계좌번호
- `e-6` 민감 봉인 대상:
  - 정확한 송금 액수
  - B의 계좌번호
- official record recommendations:
  - `B는 예비신랑에게 반복 연락했다.`
  - `예비신랑이 먼저 B에게 선을 넘는 메시지를 보냈다.`
  - `A는 단톡방에서 먼저 B를 문제 인물로 퍼뜨렸다.`
  - `A 아버지는 과거 B에게, 현재 예비신랑에게 비슷한 방식으로 돈을 요구했다.`
  - `B는 두 번 다 A를 지키려다 직접 말하지 못했고, 그 대가로 두 번 다 악역이 되었다.`

## 품질 + validator 통합 규격

### callTerms 절대 규칙
- friend-v3-01의 직접 호칭은 아래만 쓴다.
  - A -> B: `수민아`
  - B -> A: `다은아`
  - A 격앙 호칭: `최수민!`
  - B 격앙 호칭: `송다은!`
  - 양측이 재판관에게 상대를 지칭: `제 친구`
- 친구 직접 대화의 세계관은 반말이 맞다.
- `interrogation`, `evidence_present`, `dossier`, `witness`는 judge-facing validator가 걸리므로 line 전체는 `재판관님,`으로 시작하고 합니다체를 유지한다.

### Level 4 핵심 항목 직접 반영
- `4-A1 호칭 정확성`
- `4-A2 존칭/어체`
- `4-A3 Truth Throttle`
- `4-A5 Archetype 일관성`
  - A=`premature_summary`
  - B=`affect_flattening`
- `4-A8 거짓말 단계 정합`
- `4-A9 번역체 금지 9패턴`
- `4-F1~F7 한국어 품질`
- `4-G1~G3 variant`

### validator 규격
- judge-facing line은 `재판관님,`으로 시작한다.
- judge-facing line은 끝까지 합니다체를 유지한다.
- 문장 수:
  - `deny`, `hedge`: 1~2문장
  - `partial`, `blame`, `emotional`, `confess`: 2~3문장
  - `S5`: 3~4문장
  - `witness vague`: 1문장
  - `witness partial`: 2~3문장
  - `witness full`: 3~5문장
  - `aftermath`: 2~5문장
  - `system_message`: 1~3문장
- evidence_present는 해당 증거 키워드를 직접 포함해야 한다.
  - `e-1`: `연락`, `전화`, `문자`
  - `e-2`: `단톡방`, `캡처`, `퍼뜨렸`
  - `e-3`: `과거`, `손절`, `카톡`
  - `e-4`: `메시지`, `선을 넘`, `거절`
  - `e-5`: `아버지`, `돈`, `문자`
  - `e-6`: `송금`, `영수증`, `과거`
  - `e-7`: `대조표`, `과거`, `현재`
- `monetaryDisputeIds`가 비어 있으므로 friend-v3-01에는 S5 금액 의무 노출 규칙을 적용하지 않는다.
- 비금전 쟁점 `d-1`에는 직접 금전어를 넣지 마라.

## GPT Pro 공통 첨부

### 필수 첨부
- `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
- `docs/ref/리뉴얼참고/thread-s-v3-case-design-friend.md`
- `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
- `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- `src/data/cases/generated/friend-v3-01.json`
- `docs/ref/리뉴얼참고/friend-v3-01-v3-game-loop-data.json`

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 작업은 friend v3 사건 "손절한 절친" 전용이다.
기존 friend v1/v2 문장이나 다른 사건 대사를 참고하거나 모사하지 마라.
현재 첨부된 friend v3 자료만 사용하라.

사건의 큰 곡선:
- 예비신랑에게 계속 연락한 B가 집착처럼 보이는 초반
- 단톡방 낙인과 과거 손절 프레임이 B를 더 수상하게 만드는 중반 전반
- 예비신랑이 먼저 선을 넘었고, B는 경고하려 했다는 반전
- A 아버지의 현재/과거 돈 접근이 같은 패턴으로 열리는 후반
- 두 번 다 B가 악역이 되고 A가 오해했다는 최종 재프레임

callTerms 절대 규칙:
- A가 B를 직접 부를 때 기본은 "수민아"
- B가 A를 직접 부를 때 기본은 "다은아"
- 격앙 직접 호칭은 A="최수민!", B="송다은!"
- 재판관에게 상대를 말할 때는 양측 모두 "제 친구"
- 친구 세계관은 반말이지만 interrogation/evidence_present/dossier/witness는 전부 "재판관님,"으로 시작하고 합니다체를 유지하라

Level 4 품질 규칙:
- 4-A1: 호칭 정확성
- 4-A2: 재판관에게는 합니다체
- 4-A3: Truth Throttle
- 4-A5: A는 premature_summary, B는 affect_flattening
- 4-A8: S0 부정/단정 -> S1 균열 -> S2 합리화 -> S3 전가/부분 인정 -> S4 감정 붕괴 -> S5 자백
- 4-A9: 번역체 9패턴 금지
- 4-F1~F7: 한국어 조사, 시제, 대명사, 자연스러움, 반복, 맥락 관리
- 4-G1~G3: variant 차이와 일관성 유지

v3 구조 규칙:
- evidence는 Stub/Excerpt/Original/Context/Established 깊이에 따라 반응 초점이 달라져야 한다
- `stmt-b-protect`, `stmt-b-villain`, `w-3-angle`은 의미 축이지 문장 복붙 소스가 아니다
- Lead는 정답이 아니라 리드다. 집착처럼 보이는 그림과 실제 경고 목적을 분리해서 다뤄라
- DossierCard는 기본 증거 질문 반복이 아니라 state를 강제로 밀어올리는 카드여야 한다
- Authority 행동에 따라 낙인, 침묵, 경고의 해석이 달라져야 한다
```

## Session 2 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party b, 즉 최수민만이다.

생성 범위:
- disputes: d-1, d-4, d-5, h-d2, h-d3
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

최수민 추가 규칙:
- 기본 프레임은 "감정을 누른 채 사실만 말하는 사람"이다
- d-1 early에서는 연락 사실만 인정하고 의도는 늦게 연다
- h-d2는 "선을 넘는 느낌이 있었다" -> "먼저 선을 넘은 건 그 사람" 흐름이 보여야 한다
- h-d3는 A 아버지 얘기를 쉽게 못 꺼내는 수치심과 두려움이 겹쳐야 한다
- d-4 late에서는 과거 손절의 진짜 이유를 친구를 지키려다 악역이 된 사건으로 닫아야 한다

출력 형식:
{
  "channel": "interrogation",
  "party": "b",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

