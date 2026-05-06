# Thread W Family v3-01 GPT Pro Prompt

## 목적
- Thread S가 설계하고 Story Gate를 통과한 family v3 사건 `치매 어머니의 유서` 전용 GPT Pro 프롬프트 완성본이다.
- `src/data/cases/generated/family-v3-01.json`과 `docs/ref/리뉴얼참고/family-v3-01-v3-game-loop-data.json`의 runtime/helper 실데이터를 반영했다.
- 목표는 **v3 게임 구조 + Level 4 품질 기준 + validator 규격**을 한 번에 만족하는 4세션 분할 프롬프트를 고정하는 것이다.

## 입력 고정본
- 구조 기준:
  - `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
  - `docs/ref/리뉴얼참고/thread-s-v3-case-design-family.md`
- 품질 기준:
  - `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
  - `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- 보조 기준:
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- runtime 기준:
  - `src/data/cases/generated/family-v3-01.json`
  - `docs/ref/리뉴얼참고/family-v3-01-v3-game-loop-data.json`

## 현재 상태
- Story Gate: `PASS`
- runtime: `available`
- v3 helper: `available`
- working slug: `family-v3-01`
- caseId: `case-family-v3-01`
- caseNumber: `TE-FamilyV301`

## runtime 반영 완료 항목
- exact `caseId`, `disputeIds`, `evidenceIds`, `baseEvidenceIds`, `witnessIds`, `monetaryDisputeIds` 반영 완료
- `dossierCardIds`, `dossierQuestionIds`, `leadIds`, `combination recipes`, `statement nodes`, `witness angle nodes` 반영 완료
- `authorityPlacements`, `hidden dispute unlock rules`, `officialRecordRecommendations`, `sensitive seal targets` 반영 완료
- witness profile과 party별 `fear`, `blindSpot`, `desireToBeSeen`, `callTerms` 반영 완료
- `resultClasses`, `system_message` keys는 runtime/helper에 사건별 override가 없어 current writer bundle baseline을 사용한다

## 사건별 Intake

```yaml
story_gate_status: "PASS"
case_id: "case-family-v3-01"
working_slug: "family-v3-01"
case_number: "TE-FamilyV301"
title: "치매 어머니의 유서"
category: "family"
summary: "배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 초반에는 요양원 방문기록과 보호사 음성, 60대 40 유서가 모두 동생의 유산 개입처럼 겹친다. 그러나 공증사무실 보관본과 90대 10 원본 유서가 열리면 조작 방향이 뒤집히고, 20년 송금 내역과 어머니 일기장 사진이 이어지면서 사건의 중심은 유산 다툼에서 형의 출생 비밀을 둘러싼 보호와 왜곡으로 이동한다."
headline_hook: "배다른 동생을 평생 못마땅해하던 형은, 치매 어머니의 마지막 유서에 자기 몫이 40퍼센트라는 걸 보고 무너진다."
emotional_bait: "요양원 방문과 말년 유서 개입은 동생의 탐욕처럼 보이지만, 원본이 열릴수록 감액 조작과 오래된 보호가 동시에 드러난다."
anchor_truth: "윤정후는 말년의 어머니 곁을 자주 드나들며 유서 문제에 개입했고 실제로 60대 40 유서를 만들었다. 그러나 그 조작은 자기 몫을 늘리는 방향이 아니라 줄이는 방향이었고, 그 배경에는 20년 생활비 지원과 형 윤태성의 출생 비밀을 끝까지 막으려 한 보호가 겹쳐 있었다."
resolution_dilemma: "유서를 직접 손댄 책임은 분명히 윤정후에게 있다. 하지만 그 조작은 자기 몫을 줄인 조작이었고, 형과 어머니를 떠받쳐 온 시간이 배경으로 붙어 있다. 윤태성은 진실을 몰랐기에 억울하지만, 마지막까지 어머니 뜻보다 자기 자리 상실 공포를 먼저 읽을 위험도 함께 안고 있다."
context:
  type: "inheritance_secret_reframe"
  description: "배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 요양원 방문기록과 보호사 음성, 60대 40 유서가 모두 동생의 유산 개입처럼 겹친다. 그러나 공증사무실 보관본과 90대 10 원본 유서가 열리면 조작 방향이 뒤집히고, 20년 송금 내역과 어머니 일기장 사진이 이어지면서 사건의 중심은 유산 다툼에서 형의 출생 비밀을 둘러싼 보호와 왜곡으로 이동한다."
party_a:
  name: "윤태성"
  age: 48
  occupation: "주방가구 공장 대표"
  archetype: "confrontational"
  speech_style: "동생을 몰아붙이는 단정형 말투가 빠르고, 불리한 자료가 나오면 더 큰 목소리로 프레임을 반복한다."
  fear: "유서 문제 뒤에 자신의 자리와 정통성을 흔드는 더 큰 비밀이 숨어 있다는 사실을 두려워한다."
  blind_spot: "어머니를 모시고 살았다는 자기 기여가 모든 판단의 기준이라고 믿는다."
  desire_to_be_seen: "끝까지 집을 지킨 장남으로 인정받고 싶어 한다."
  to_other: "정후야"
  to_judge: "제 동생"
  angry: "윤정후!"
party_b:
  name: "윤정후"
  age: 44
  occupation: "자동차부품 가게 운영"
  archetype: "affect_flattening"
  speech_style: "사실을 짧게 말하고 감정이나 이유는 끝까지 늦게 꺼내며, 압박이 심해질수록 더 담담한 척한다."
  fear: "형에게 출생 비밀과 오래된 지원 사실이 한꺼번에 터지면 형의 삶 전체가 무너질까 두려워한다."
  blind_spot: "보호하려는 침묵이 결국 더 큰 왜곡을 만들었다는 점을 늦게 인정한다."
  desire_to_be_seen: "형을 깎아내린 동생이 아니라 끝까지 떠받친 사람으로 이해받고 싶어 한다."
  to_other: "형"
  to_judge: "제 형"
  angry: "형!"
disputes:
  - id: "d-1"
    title: "말년의 어머니는 유서를 제대로 판단할 수 있었는가"
    quadrant: "b_only"
    truth_description: "B는 말년의 어머니 곁을 자주 드나들며 유서 문제에 실제로 개입했다."
  - id: "d-2"
    title: "60대 40 유서는 정말 어머니의 마지막 뜻이었는가"
    quadrant: "b_only"
    truth_description: "B는 60대 40 유서를 직접 만들었지만 자기 몫을 늘린 것이 아니라 줄였다."
  - id: "d-5"
    title: "누가 정말 어머니를 이용했는가"
    quadrant: "shared_misconception"
    truth_description: "A는 진실을 모르고 B를 미워했고, B는 형을 지키려다 어머니 뜻까지 손댔다."
  - id: "h-d3"
    title: "왜 원래 유서는 90대 10이었는가, 그리고 그 비율은 무엇에 대한 보답이었는가"
    quadrant: "b_only"
    truth_description: "어머니가 B에게 90을 주려 했던 이유는 20년 생활비와 A의 사업을 살린 돈 때문이었다."
  - id: "h-d4"
    title: "60대 40 조작이 막으려 한 더 큰 비밀은 무엇인가"
    quadrant: "b_only"
    truth_description: "B는 A의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다."
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids: ["dc-1", "dc-2", "dc-3", "dc-4", "dc-5"]
dossier_question_ids:
  - "dc-1.b.q1"
  - "dc-2.b.q1"
  - "dc-3.b.q1"
  - "dc-4.b.q1"
  - "dc-5.b.q1"
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
statement_node_ids: ["stmt-b-pride", "stmt-b-collapse", "stmt-b-reduction"]
witness_angle_node_ids: ["w-3-angle"]
monetary_dispute_ids: ["h-d3"]
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
  - `d-1` 말년의 어머니는 유서를 제대로 판단할 수 있었는가
  - `d-2` 60대 40 유서는 정말 어머니의 마지막 뜻이었는가
  - `d-5` 누가 정말 어머니를 이용했는가
- 숨은 쟁점:
  - `h-d3`: `e-5` 제시 시 해금
  - `h-d4`: `e-7` 제시 시 해금
- 사건 곡선은 아래 순서를 유지한다.
  - early: 요양원 방문과 60대 40 유서가 동생의 말년 개입처럼 보이는 구간
  - mid: 공증사무실 보관본과 90대 10 원본이 열리며 조작 방향이 뒤집히는 구간
  - late: 20년 송금과 일기장 사진이 열리며 출생 비밀 보호와 감액 조작이 연결되는 구간

### 2. Evidence Coverage
- `e-1` 60대 40 유서 사본
  - proves: `d-1`, `d-2`
  - subject: `b`
  - base evidence
- `e-2` 요양원 방문기록
  - proves: `d-1`
  - subject: `b`
  - base evidence
- `e-3` 전 요양보호사 음성증언
  - proves: `d-1`, `d-5`
  - subject: `b`
  - base evidence
- `e-4` 공증사무실 스캔 보관본
  - proves: `h-d3`, `d-2`
  - subject: `b`
  - requires: `e-1`
- `e-5` 원본 유서 90대 10
  - proves: `h-d3`, `d-2`
  - subject: `b`
  - requires: `e-4`
- `e-6` 20년 송금 내역 묶음
  - proves: `h-d3`, `d-5`, `h-d4`
  - subject: `b`
  - requires: `e-5`
- `e-7` 어머니 일기장 사진
  - proves: `d-5`, `h-d4`
  - subject: `b`
  - requires: `e-6`

### 3. Witness Coverage
- `w-1` 최복순
  - bias: `neutral`
  - related disputes: `d-1`
  - profile: 전 요양보호사 / 직접 본 장면은 또렷하게 말하지만 민감한 의료 표현은 조심한다
  - judge address: `재판관님`
  - address A/B: `태성 씨`, `정후 씨`
- `w-2` 김영수
  - bias: `neutral`
  - related disputes: `d-2`
  - profile: 공증사무실 직원 / 동기는 모르지만 서류 순서와 시간은 또렷하게 말한다
  - judge address: `재판관님`
  - address A/B: `태성 씨`, `정후 씨`
- `w-3` 박순애
  - bias: `pro_b`
  - related disputes: `h-d3`, `d-5`
  - profile: 은퇴 / 날짜는 흐리지만 정황과 감정선은 분명하게 말한다
  - judge address: `재판관님`
  - address A/B: `태성아`, `정후야`

### 4. 증거 깊이와 신뢰 축
- runtime의 `evidenceAxisLegend`를 그대로 따른다.
  - depth: `stub` -> `excerpt` -> `original` -> `context` -> `established`
  - trust: `submitted` -> `verifying` -> `authenticated` -> `challenged` -> `misread`
- family v3는 **같은 문서가 깊이에 따라 완전히 다른 의미로 읽히는 구조**다.
  - `e-1`, `e-2`, `e-3`: 동생이 말년을 파고든 것처럼 보이는 표면
  - `e-4`: 최종본과 손댄 사실이 고정되는 지점
  - `e-5`: 90대 10 원본으로 감액 조작이 드러나는 지점
  - `e-6`: 20년 지원과 사업 지원의 금전 근거가 열리는 지점
  - `e-7`: 유산 다툼이 출생 비밀 보호 서사로 뒤집히는 최종 재프레임

### 5. Evidence Combinations + 핵심 발언 확장
- 핵심 statement / witness angle nodes:
  - `stmt-b-pride`: B의 발언 `"형 자존심이 무너질까 봐"`
  - `stmt-b-collapse`: B의 발언 `"형이 알면 무너질까 봐"`
  - `stmt-b-reduction`: B의 발언 `"그래서 60으로 낮췄습니다"`
  - `w-3-angle`: `w-3` 박순애 증언 축
- combination recipes:
  - `lead-1`: `e-1 + e-2 -> L-1`
  - `dossier-1`: `L-1 + e-3 -> dc-1`
  - `lead-2`: `e-1 + e-4 -> L-2`
  - `dossier-2`: `L-2 + e-5 -> dc-2`
  - `lead-3`: `e-5 + e-6 -> L-3`
  - `dossier-3`: `L-3 + stmt-b-pride -> dc-3`
  - `lead-4`: `e-6 + stmt-b-collapse -> L-4`
  - `dossier-4`: `L-4 + w-3-angle -> dc-4`
  - `lead-5`: `e-6 + e-7 -> L-5`
  - `dossier-5`: `L-5 + stmt-b-reduction -> dc-5`
- GPT Pro는 이 노드들을 낭독하지 말고, 의미 축과 방어 리듬만 자연 한국어 대사로 재구성해야 한다.

### 6. Lead 해석 차이
- `L-1 Timeline Lead`
  - `L-1-A`: 동생이 말년을 파고들어 유산을 바꿨다
  - `L-1-B`: 마지막을 챙긴 사람이 동생이었다
- `L-2 Authenticity Lead`
  - `L-2-A`: 더 많이 가지려고 바꿨다
  - `L-2-B`: 비율을 다시 조정하려 했다
- `L-3 Beneficiary Lead`
  - `L-3-A`: 오랜 도움에 대한 보답이다
  - `L-3-B`: 형을 밀어낸 편애다
  - `L-3-C`: 형을 대신 떠받친 세월의 계산서다
- `L-4 Context Lead`
  - `L-4-A`: 생색을 피했다
  - `L-4-B`: 형의 삶을 보호하려 침묵했다
- `L-5 Reframe Lead`
  - `L-5-A`: 형의 돈보다 형의 자리를 지키려 했다
  - `L-5-B`: 형을 지킨다는 명분으로 어머니 뜻까지 바꿨다

### 7. DossierCard 압박 구조
- `dc-1 / dc-1.b.q1`
  - 질문: `"형이 보기엔 당신이 말년을 파고든 것처럼 보입니다. 실제로 그 몇 달 동안 어머니에게 무엇을 반복해서 말했습니까?"`
  - effect: `family-v3-01:b:d-1:S3:0`
- `dc-2 / dc-2.b.q1`
  - 질문: `"유서를 고친 건 맞는데, 왜 자기 몫을 늘리는 쪽이 아니라 줄이는 쪽으로 바꿨습니까?"`
  - effect: `family-v3-01:b:d-2:S4:0`
- `dc-3 / dc-3.b.q1`
  - 질문: `"형이 평생 어머니 돈인 줄 알고 받았던 그 돈, 사실은 당신 돈이었습니까?"`
  - effect: `family-v3-01:b:h-d3:S3:0`
- `dc-4 / dc-4.b.q1`
  - 질문: `"20년을 도왔으면서 왜 단 한 번도 형에게 말하지 않았습니까?"`
  - effect: `family-v3-01:b:h-d3:S4:0`
- `dc-5 / dc-5.b.q1`
  - 질문: `"60대 40으로 바꾸지 않았다면, 형은 돈 말고 무엇을 잃게 됐습니까?"`
  - effect: `family-v3-01:b:h-d4:S3:0`

### 8. Authority 배치
- `원본 제출 명령`
  - `e-1` 확인 직후: 유서 사본을 전체본으로 끌어올림
  - `e-4` 등장 직후: 공증사무실 스캔 보관본 원본 확보
  - `e-6` 또는 `e-7` 진입 전: 돈 흐름과 일기장 진본 확정
- `정확히 답변하십시오`
  - B가 `손댄 건 맞지만 이유는 말 못 한다` 수준에 머물 때 사용
- `분리심문`
  - `e-4 Original` 직후 B: 형 앞에서 닫히는 동기층을 먼저 열기
  - `e-6 Established` 직후 A: 공격적 프레임을 잠시 떼어 놓고 흔들림 보기
- `잠정 인정`
  - `e-4` 인증 후: B가 60대 40 유서를 직접 제출한 사실 기록
  - `e-5` 인증 후: 원래 유서는 90대 10이었다는 사실 기록
  - `e-6` 인증 후: B가 20년간 어머니에게 생활비를 보냈다는 사실 기록
  - `e-7 Original` 이후: 60대 40 감액 조작이 출생 비밀 보호와 연결된다는 사실 기록
- `선처 창구`
  - `dc-2`, `dc-4`, `dc-5` 직후: B의 자발적 동기 고백 유도
- `발언 제지 / 기록 제외`
  - A가 `배다른 놈` 프레임을 반복하거나 B가 지나치게 차갑게 사실만 던질 때 사용
- `민감정보 봉인 해제`
  - `h-d4` 진입 후 `L-5`가 완성됐지만 마지막 이유가 부족할 때 사용

### 9. 민감정보 경계 + 공식기록 권고
- `e-3` 민감 봉인 대상:
  - 치매 관련 직접 표현
  - 요양원 내부 개인 정보
- `e-6` 민감 봉인 대상:
  - 정확한 계좌번호
  - 사업 실패 당시 큰돈 액수
- `e-7` 민감 봉인 대상:
  - A의 출생 비밀 직접 문장
  - 혈연 여부 표현
  - 어머니의 치매 전 개인 기록 일부
- official record recommendations:
  - `B는 말년의 어머니 곁에 자주 있었고 유서 문제에 실제로 개입했다.`
  - `B는 60대 40 유서를 직접 만들었다.`
  - `원래 유서는 90대 10이었다.`
  - `B는 20년간 어머니를 돈으로 도왔고, A 사업이 무너질 때도 큰돈을 보탰다.`
  - `60대 40 조작의 진짜 이유에는 A의 출생 비밀 보호가 얽혀 있다.`

## 품질 + validator 통합 규격

### callTerms 절대 규칙
- family-v3-01의 직접 호칭은 아래만 쓴다.
  - A -> B: `정후야`
  - B -> A: `형`
  - A 격앙 호칭: `윤정후!`
  - B 격앙 호칭: `형!`
  - A가 재판관에게 B를 지칭: `제 동생`
  - B가 재판관에게 A를 지칭: `제 형`
- 형제 직접 대화의 세계관은 반말이 맞다.
- `interrogation`, `evidence_present`, `dossier`, `witness`는 judge-facing validator가 걸리므로 line 전체는 `재판관님,`으로 시작하고 합니다체를 유지한다.

### Level 4 핵심 항목 직접 반영
- `4-A1 호칭 정확성`
- `4-A2 존칭/어체`
- `4-A3 Truth Throttle`
- `4-A5 Archetype 일관성`
  - A=`confrontational`
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
  - `e-1`: `유서`, `60`, `40`
  - `e-2`: `요양원`, `방문`, `기록`
  - `e-3`: `요양보호사`, `음성`, `증언`
  - `e-4`: `공증`, `스캔`, `보관본`
  - `e-5`: `원본 유서`, `90`, `10`
  - `e-6`: `송금`, `생활비`, `큰돈`
  - `e-7`: `일기장`, `사진`, `출생 비밀`
- `S5` 수치 노출 규칙은 `h-d3`에만 적용한다.
  - family-v3-01에서 runtime이 고정한 핵심 수치 축은 `90대 10`과 `20년`이다.
  - 실제 액수가 없는 자리에서는 `90대 10`, `20년`, `큰돈 이동`을 모호어 없이 직접 드러내라.
- 비금전 쟁점 `d-1`에는 금전어를 넣지 마라.

## GPT Pro 공통 첨부

### 필수 첨부
- `docs/ref/리뉴얼참고/gdd-v3-game-structure-update.md`
- `docs/ref/리뉴얼참고/thread-s-v3-case-design-family.md`
- `docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`
- `docs/ref/참고용4_확인후제거요망/1회차_GPT_작업물_원본/solomon_callterms_guideline_and_patch_plan.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- `src/data/cases/generated/family-v3-01.json`
- `docs/ref/리뉴얼참고/family-v3-01-v3-game-loop-data.json`

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 작업은 family v3 사건 "치매 어머니의 유서" 전용이다.
기존 family v1/v2 문장이나 다른 사건 대사를 참고하거나 모사하지 마라.
현재 첨부된 family v3 자료만 사용하라.

사건의 큰 곡선:
- 동생이 말년의 어머니를 파고들어 유서를 바꿨다는 초반 의심
- 공증사무실 보관본으로 조작 사실 고정
- 90대 10 원본 유서로 조작 방향 반전
- 20년 송금으로 90대 10의 이유 설명
- 출생 비밀 보호를 위해 60대 40으로 낮췄다는 최종 재프레임

callTerms 절대 규칙:
- A가 B를 직접 부를 때 기본은 "정후야"
- B가 A를 직접 부를 때 기본은 "형"
- 격앙 직접 호칭은 A="윤정후!", B="형!"
- 재판관에게 상대를 말할 때는 A="제 동생", B="제 형"
- 형제 세계관은 반말이지만 interrogation/evidence_present/dossier/witness는 전부 "재판관님,"으로 시작하고 합니다체를 유지하라

Level 4 품질 규칙:
- 4-A1: 호칭 정확성
- 4-A2: 재판관에게는 합니다체
- 4-A3: Truth Throttle
- 4-A5: A는 confrontational, B는 affect_flattening
- 4-A8: S0 부정/공세 -> S1 균열 -> S2 합리화 -> S3 전가/부분 인정 -> S4 폭발 -> S5 자백
- 4-A9: 번역체 9패턴 금지
- 4-F1~F7: 한국어 조사, 시제, 대명사, 자연스러움, 반복, 맥락 관리
- 4-G1~G3: variant 차이와 일관성 유지

v3 구조 규칙:
- evidence는 Stub/Excerpt/Original/Context/Established 깊이에 따라 반응 초점이 달라져야 한다
- `stmt-b-pride`, `stmt-b-collapse`, `stmt-b-reduction`, `w-3-angle`은 의미 축이지 문장 복붙 소스가 아니다
- Lead는 정답이 아니라 리드다. 조작 사실과 조작 이유를 분리하고, 보호와 월권을 함께 다뤄라
- DossierCard는 기본 증거 질문 반복이 아니라 state를 강제로 밀어올리는 카드여야 한다
- Authority 행동에 따라 공격성, 감정 억제, 공식기록 상실감의 타이밍이 달라져야 한다

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
- family-v3-01의 monetary dispute는 h-d3 하나뿐이다. S5에서는 `90대 10`, `20년`, `큰돈 이동` 중 최소 하나를 직접 드러내라
- d-1에는 금전어를 넣지 마라
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 윤태성만이다.

생성 범위:
- disputes: d-1, d-2, d-5, h-d3, h-d4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

윤태성 추가 규칙:
- 기본 프레임은 "동생이 말년을 파고들었다"는 확신이다
- A는 confrontational이므로, 질문을 답하기보다 되받아치거나 단정으로 덮으려는 습관이 살아 있어야 한다
- d-1 early에서는 요양원 방문과 유서 개입을 한 프레임으로 묶는 공격성이 가장 강해야 한다
- d-2에서는 조작 사실에 집착하고, 감액 조작이라는 반전은 늦게 받아들여야 한다
- d-5에서는 "어머니를 이용한 건 동생"이라는 단정이 강하되 late에는 자기 프레임 붕괴가 보여야 한다
- h-d3 late에서는 자신이 어머니 돈이라고 믿어 온 것이 흔들리는 불안과 분노가 같이 올라와야 한다
- h-d4 late에서는 출생 비밀 그 자체보다 "내 자리와 삶이 통째로 흔들렸다"는 상실감이 커야 한다

출력 형식:
{
  "channel": "interrogation",
  "party": "a",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 2 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party b, 즉 윤정후만이다.

생성 범위:
- disputes: d-1, d-2, d-5, h-d3, h-d4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

윤정후 추가 규칙:
- 기본 프레임은 "사실만 짧게 말하며 이유를 최대한 늦추는 사람"이다
- d-1 early에서는 말년 개입 사실을 작게 축소하고, 왜 그 자리에 있었는지와 어머니와 나눈 말은 늦게 연다
- d-2는 "최종본이 있었다" -> "내가 다시 가져왔다" -> "60으로 낮췄다" 순서가 보여야 한다
- h-d3 late에서는 20년 지원과 사업 실패 해의 큰돈 이동이 생색이 아니라 보호의 배경이었음이 드러나야 한다
- h-d4 late에서는 출생 비밀을 바로 까기보다, 그게 형의 삶 전체를 무너뜨릴 문제였다는 축으로 밀어야 한다

출력 형식:
{
  "channel": "interrogation",
  "party": "b",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 3 Prompt

```text
너는 위 공통 지시문과 runtime 구조 메모를 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: e-1, e-2, e-3, e-4, e-5, e-6, e-7
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - parties: a, b
  - dossierQuestionIds:
    - dc-1.b.q1
    - dc-2.b.q1
    - dc-3.b.q1
    - dc-4.b.q1
    - dc-5.b.q1
  - cardBands: unlock, pressure, collapse
  - key당 variants 3개

증거 깊이 반영 규칙:
- early는 Stub/Excerpt 반응처럼 써라
- mid는 Original 반응처럼 써라
- late는 Context/Established 반응처럼 써라
- family v3는 같은 문서가 깊이에 따라 의미가 완전히 바뀌는 구조다

Lead 해석 반영 규칙:
- L-1은 말년 파고듦 vs 마지막을 챙김
- L-2는 탐욕 조작 vs 감액 조작
- L-3는 편애가 아니라 지원의 계산서였는지까지 연다
- L-4는 생색 회피와 형 보호 침묵을 분리한다
- L-5는 유산 프레임을 출생 비밀 보호 프레임으로 뒤집는다

validator 절대 규칙:
- evidence_present와 dossier는 모든 variant가 `재판관님,`으로 시작
- evidence_present는 해당 증거 키워드를 반드시 직접 포함
- d-1 계열은 금전어 금지
- h-d3 late 또는 collapse 계열은 `90대 10`, `20년`, `큰돈 이동`을 모호어 없이 직접 드러내라

출력 형식:
{
  "evidence_present": { "entries": [] },
  "dossier": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 4 Prompt

```text
너는 위 공통 지시문과 runtime 구조 메모를 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - witnessIds: w-1, w-2, w-3
  - depths: vague, partial, full
  - key당 variants 3개
- aftermath
  - resultClasses:
    - a_primary_fault
    - b_primary_fault
    - shared_fault
    - protective_resolution
    - procedural_caution
  - key당 variants 2개
- system_message
  - keys:
    - interrogation|repeat_warning
    - evidence|new_unlock
    - evidence|trap_notice
    - dossier|challenge_cleared
    - witness|credibility_shift
    - verdict|profile_update
  - key당 variants 2개

증인 규칙:
- w-1 최복순은 말년 분위기와 B의 말투, 긴장 흐름을 증언한다
- w-2 김영수는 서류 흐름과 시간차, 마지막 제출자를 증언한다
- w-3 박순애는 20년 지원과 오래된 감정선, 비밀의 무게를 증언한다

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 잔여 메모
- `resultClasses`, `system_keys`는 family-v3-01 runtime/helper에 사건별 override가 없어서 current writer bundle baseline을 그대로 사용했다.
- 그 외 caseId, 쟁점, 증거, dossier, witness, authority, official record, hidden dispute unlock 구조는 모두 family-v3-01 실데이터로 채웠다.
