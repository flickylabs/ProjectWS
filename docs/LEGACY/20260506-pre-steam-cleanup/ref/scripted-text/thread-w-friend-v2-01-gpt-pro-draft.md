# Thread W Friend v2-01 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 friend v2 사건 `손절한 절친`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 완성본**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-friend-v2-01`
- working slug: `friend-v2-01`
- 기준 파일:
  - `src/data/cases/generated/friend-v2-01.json`
  - `docs/ref/리뉴얼참고/thread-s-v2-case-design-friend.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 이번 케이스는 `v2 기획`이 사건 장치까지 직접 정의하고 있으므로, `investigationStages`, `evidenceCombinations`, `DossierCard`, `조합 스킬 노드`, `핵심 발언 확장`을 모두 프롬프트 내부에 명시 반영한다.
  - runtime JSON에는 별도 `dossierQuestionIds`/`dossierCards` 필드가 없으므로, v2 기획 문서의 `dc-1`~`dc-3`와 runtime `combinationLab`의 `combo-1`~`combo-4`, `n-1`~`n-4`, `q-d4-hard-pattern`, `wa-1`을 프롬프트 anchor로 사용한다.
  - v1 friend 사건 프롬프트/데이터는 이 문서의 기준이 아니다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-friend-v2-01"
working_slug: "friend-v2-01"
title: "손절한 절친"
category: "friend"
summary: "예비신랑에게 반복 연락한 전 절친과 단톡방 공개 매도만 보면 B가 집착한 것처럼 보이지만, 예비신랑의 선 넘는 메시지, A 아버지의 돈 접근, 과거 손절 때의 송금 기록, 과거·현재 대조표가 겹치며 두 번 다 침묵 속에서 악역이 된 사건으로 뒤집히는 friend v2 케이스."
headline_hook: "손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다."
emotional_bait: "결혼 3주 전, 전 절친이 예비신랑에게 반복 연락하고 단톡방까지 불탔다. 겉으로는 친구의 집착처럼 보이지만, 그 뒤에는 아버지의 반복된 돈 접근과 두 번 다 말하지 못한 침묵이 숨어 있다."
anchor_truth: "최수민은 예비신랑을 꼬시려 한 게 아니라 송다은 아버지의 반복된 돈 접근을 경고하려 했고, 과거 손절 사건 역시 변심이 아니라 같은 아버지 문제 때문에 침묵 속에 무너졌다. 송다은은 친구를 공개적으로 매도했지만 아버지 진실을 모른 채 또 같은 오해를 반복했다."
resolution_dilemma: "최수민은 매번 송다은을 지키려다 말하지 못했고, 결국 매번 송다은에게 버림받았다. 그렇다고 해서 송다은의 예비신랑에게 직접 연락한 방식이 완전히 옳았던 것도 아니다. 송다은은 친구를 잔인하게 몰아붙였지만, 아버지의 진실을 모른 채 반응한 사람이기도 하다. 예비신랑은 최수민에게 선을 넘은 잘못이 있고, 동시에 송다은 아버지에게 당할 뻔한 피해자이기도 하다."
context:
  type: "friendship_reputation_break"
  description: "손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 연락 기록, 단톡방 캡처, 과거 손절 직전 카톡만으로도 최수민이 예비신랑에게 집착하는 사람처럼 보인다. 하지만 e-4가 열리면 먼저 선을 넘은 쪽은 예비신랑이었다는 사실이 드러나고, e-5와 e-6이 이어지면 사건의 중심은 친구의 집착이 아니라 송다은 아버지의 반복된 돈 접근과 그걸 끝내 말하지 못한 침묵으로 뒤집힌다. 마지막 e-7은 과거와 현재의 패턴을 한 줄로 묶어, 최수민이 두 번 다 송다은을 지키려다 두 번 다 악역이 됐다는 구조를 확정한다."
party_a:
  id: "a"
  name: "송다은"
  age: 31
  occupation: "온라인 쇼핑몰 CS 직원"
  archetype: "premature_summary"
  speech_style: "패턴이 보이면 상대 설명보다 먼저 결론을 잡고, 그 결론을 주변 사람들과 공유하면서 확신을 키운다. 그러나 아버지 이야기가 나오면 문장이 짧아지고 시선이 흔들린다."
  to_partner: "수민아"
  to_judge: "재판장님"
  angry: "최수민"
  tells:
    - "정황 몇 개를 바로 묶어 결론처럼 말한다."
    - "자신만 그렇게 본 게 아니라 다들 그랬다고 강조한다."
    - "아버지와 예전 손절 얘기가 나오면 목소리가 갑자기 낮아진다."
party_b:
  id: "b"
  name: "최수민"
  age: 31
  occupation: "필라테스 강사"
  archetype: "affect_flattening"
  speech_style: "직접 부정하기보다 감정을 눌러 말하고, 핵심 이유는 끝까지 미루다가 마지막 문장에서야 꺼낸다. 자기 손해를 인정하는 말도 마치 남 얘기처럼 건조하게 뱉는다."
  to_partner: "다은아"
  to_judge: "재판장님"
  angry: "송다은"
  tells:
    - "강한 사실도 톤을 낮춰 말하며 사건의 온도를 떨어뜨리려 한다."
    - "핵심 이유를 끝까지 숨기다가 마지막 문장에 꺼낸다."
    - "자기 피해를 설명할 때도 자신을 지우는 표현을 쓴다."
disputes:
  - id: "d-1"
    name: "B의 연락은 예비신랑 집착인가, 위험 경고인가"
    quadrant: "b_only"
    runtime_truth: "최수민이 예비신랑에게 여러 차례 연락한 것은 사실이다. 하지만 그 목적은 유혹이 아니라, 송다은 아버지의 돈 접근과 예비신랑의 선 넘는 접근이 겹친 상황을 막아 보려는 경고였다. 문제는 그 경고를 왜 송다은이 아니라 예비신랑에게 직접 던졌는가다."
    writing_direction: "초반에는 집착 프레임이 강해야 하고, e-4 이후에야 경고와 대응으로 다시 읽히기 시작해야 한다."
  - id: "d-2"
    name: "예비신랑이 먼저 B에게 선을 넘은 사실이 있었는가"
    quadrant: "b_only"
    runtime_truth: "예비신랑은 몇 달 전부터 최수민에게 따로 보자고 하거나 취중 연락을 보내며 선을 넘었다. 최수민은 그때마다 선을 그었지만, 그 기록을 송다은에게 곧바로 말하지 못한 선택이 현재의 오해를 키웠다."
    writing_direction: "예비신랑의 잘못은 mid에서 열되, B가 왜 다은에게 곧바로 말하지 못했는지는 late까지 남겨야 한다."
  - id: "d-3"
    name: "A 아버지는 예비신랑에게 돈을 뜯어내려 접근하고 있었는가"
    quadrant: "b_only"
    runtime_truth: "송다은 아버지는 예비신랑에게 결혼 전 잠깐만 도와 달라며 돈 얘기를 꺼내고 있었다. 최수민은 그 흐름이 과거 자신이 당했던 방식과 너무 닮아 있어 위험 신호로 받아들였고, 그래서 이번 연락을 멈추지 못했다."
    writing_direction: "late에서는 이번 연락 사건의 핵심이 친구 집착이 아니라 반복된 돈 접근 패턴으로 바뀌어야 한다."
  - id: "d-4"
    name: "과거 손절 사건의 진짜 원인은 B의 변심이었는가, A 아버지의 사기였는가"
    quadrant: "b_only"
    runtime_truth: "과거 손절 사건은 최수민의 변심이 아니라 송다은 아버지가 빌려 간 돈을 갚지 않은 일에서 시작됐다. 최수민은 그 사실을 끝내 송다은에게 직접 말하지 못했고, 그 침묵이 현재까지 같은 오해를 반복하게 만들었다."
    writing_direction: "과거 손절은 mid 후반부터만 열고, 최종적으로는 두 번 반복된 침묵 구조를 닫는 축이 되어야 한다."
  - id: "d-5"
    name: "이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가"
    quadrant: "a_only"
    runtime_truth: "송다은은 직접 확인도 하기 전에 단톡방에서 최수민을 먼저 매도했고, 그 말이 결혼 직전의 불안과 결합하며 최수민을 집착하는 사람으로 낙인찍었다. 최수민이 또 설명보다 침묵을 택한 것도 문제였지만, 공개적인 첫 낙인은 A 쪽에서 시작됐다."
    writing_direction: "late에서는 A의 첫 낙인 책임과 B의 침묵 책임이 동시에 보여야 하지만, 공개적 첫 타격은 A가 했다는 축은 분명해야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4", "d-5"]
monetary_dispute_ids: ["d-3", "d-4"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "B→예비신랑 연락 기록"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "집착처럼 보이는 early 프레임의 핵심 출발점"
  - id: "e-2"
    type: "chat"
    surface_name: "공통 친구 단톡방 캡처"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "A가 먼저 공개 매도했다는 축을 여는 early 증거"
  - id: "e-3"
    type: "chat"
    surface_name: "과거 손절 직전 카톡"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "과거 손절이 단순 변심이 아니었다는 씨앗을 남기는 early 증거"
  - id: "e-4"
    type: "chat"
    surface_name: "예비신랑의 선 넘는 메시지와 B의 거절 답장"
    required_lie_state: "S2"
    requires: ["e-1"]
    subject_party: "b"
    writing_role: "누가 먼저 경계를 넘었는지 뒤집는 mid 핵심 증거"
  - id: "e-5"
    type: "chat"
    surface_name: "A 아버지와 예비신랑의 문자"
    required_lie_state: "S2"
    requires: ["e-1"]
    subject_party: "b"
    writing_role: "이번 연락이 아버지의 돈 접근과 연결된다는 late 증거"
  - id: "e-6"
    type: "bank"
    surface_name: "과거 송금 영수증 + 문자"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "b"
    writing_role: "과거 손절 원인이 A 아버지 문제였음을 여는 late 증거"
  - id: "e-7"
    type: "log"
    surface_name: "과거·현재 대조표"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "b"
    writing_role: "두 번 반복된 침묵과 첫 낙인 책임을 한 줄로 묶는 최종 증거"
witness_pool:
  - id: "w-1"
    name: "김세라"
    bias: "neutral"
    related_disputes: ["d-5"]
  - id: "w-2"
    name: "박준혁"
    bias: "neutral"
    related_disputes: ["d-2"]
  - id: "w-3"
    name: "오미경"
    bias: "pro_b"
    related_disputes: ["d-4"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids_v2: ["dc-1", "dc-2", "dc-3"]
evidence_combinations_ids_v2: ["c-1", "c-2", "c-3", "c-4"]
combination_recipe_ids: ["combo-1", "combo-2", "combo-3", "combo-4"]
combination_support_ids: ["cl-note-1", "cl-statement-1"]
derived_note_ids: ["n-1", "n-2", "n-3", "n-4"]
analysis_points_base: 5
special_unlocked_question_ids: ["q-d4-hard-pattern"]
special_witness_angle_ids: ["wa-1"]
result_classes_baseline:
  - "a_primary_fault"
  - "b_primary_fault"
  - "shared_fault"
  - "protective_resolution"
  - "procedural_caution"
system_keys_baseline:
  - "interrogation|repeat_warning"
  - "evidence|new_unlock"
  - "evidence|trap_notice"
  - "dossier|challenge_cleared"
  - "witness|credibility_shift"
  - "verdict|profile_update"
channel_inventory_source: "friend-v2-01 runtime JSON + friend v2 design doc + runtime combinationLab + current new-case scripted bundle baseline"
```

## v2 장치 반영 메모

### investigationStages
- `e-1 B→예비신랑 연락 기록`
  - stage 0: 연락 사실과 횟수 확인
  - stage 1: 왜 손절한 친구가 예비신랑에게 직접 연락했는지 추궁
  - stage 2: 왜 공통 친구나 A가 아니라 예비신랑에게 붙었는지 압박한다
- `e-2 공통 친구 단톡방 캡처`
  - stage 0: 누가 먼저 단톡방에 말했는지 확인
  - stage 1: 왜 확인 없이 B를 공개 매도했는지 추궁
  - stage 2: 그 첫 낙인이 어떤 파장을 만들었는지 압박한다
- `e-3 과거 손절 직전 카톡`
  - stage 0: 과거에도 미묘한 "그 문제"가 있었는지 확인
  - stage 1: 왜 끝까지 설명하지 않고 끊고 사라졌는지 추궁
  - stage 2: 그 침묵이 현재와 어떻게 이어지는지 압박한다
- `e-4 예비신랑의 선 넘는 메시지와 B의 거절 답장`
  - stage 0: 먼저 선을 넘은 사람이 누구인지 확인
  - stage 1: 그래도 왜 B가 집착하는 쪽처럼 남았는지 추궁
  - stage 2: 왜 A에게 직접 말하지 못했는지 late로 연결한다
- `e-5 A 아버지와 예비신랑의 문자`
  - stage 0: 돈 얘기 진위 확인
  - stage 1: 왜 B가 이 흐름을 위험 신호로 읽었는지 추궁
  - stage 2: 왜 이번에도 혼자 막으려 했는지 압박한다
- `e-6 과거 송금 영수증 + 문자`
  - stage 0: 과거 송금 사실 확인
  - stage 1: 그 돈이 왜 B에게서 나갔는지 추궁
  - stage 2: 왜 그때도 A에게 직접 말하지 못했는지 압박한다
- `e-7 과거·현재 대조표`
  - stage 0: 과거와 현재 문구·시점의 일치 확인
  - stage 1: 반복 패턴이 보인 뒤에도 왜 같은 선택이 이어졌는지 추궁
  - stage 2: 두 번 다 침묵 속에서 악역이 된 구조를 정면으로 묻는다

### evidenceCombinations
- `c-1`: `e-1 + e-2`
  - 효과: `"손절한 친구가 예비신랑에게 집착한다" + "A가 먼저 공개 매도했다"`가 함께 굳는다
  - 반영 규칙: d-1 early 반응과 d-5 early 반응은 모두 이 함정 프레임 위에서 움직여야 한다
- `c-2`: `e-1 + e-4`
  - 효과: `"연락 자체는 B가 먼저 했지만, 먼저 선을 넘은 건 예비신랑이었다"`가 열린다
  - 반영 규칙: 집착 프레임은 깨지기 시작하되, 왜 A에게 직접 말하지 않았는지 late 질문은 남겨야 한다
- `c-3`: `e-5 + e-6`
  - 효과: `"A 아버지의 돈 접근은 과거에도, 지금도 반복됐다"`가 확정된다
  - 반영 규칙: d-3, d-4는 현재 사건과 과거 손절을 같은 패턴으로 묶는 hard 압박으로 바뀌어야 한다
- `c-4`: `e-4 + e-7`
  - 효과: `"B의 연락은 유혹이 아니라 경고였다" + "두 번 다 침묵 때문에 악역이 됐다"`가 함께 선명해진다
  - 반영 규칙: `wa-1`과 A의 첫 낙인 책임까지 최종 판단 축으로 이어져야 한다

### DossierCard
- `dc-1`
  - 카드 문장: `예비신랑이 먼저 선을 넘었다면, 왜 그때 바로 A에게 말하지 않았습니까?`
  - 해금 조건: `d-2 S3+`, `e-4`
  - 효과: B의 침묵 선택을 d-4로 연결하는 late 카드다
- `dc-2`
  - 카드 문장: `A 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면, 당신은 이번에도 왜 혼자 막으려 했습니까?`
  - 해금 조건: `d-3 S2+`, `e-5`
  - 효과: B의 경고 서사를 자기희생과 독단 사이에서 더 깊게 흔드는 카드다
- `dc-3`
  - 카드 문장: `직접 확인도 하지 않고 친구를 단톡방에서 먼저 매도한 건 당신 아닙니까?`
  - 해금 조건: `d-5 S2+`, `e-2`
  - 효과: A의 성급한 결론과 공개 낙인 책임을 정면으로 세운다

### 조합 스킬 노드
- `combo-1` -> `n-1 모두가 B를 집착하는 사람으로 믿기 시작했다`
  - 입력: `e-1`, `e-2`
  - judgeHint: 초반 함정 프레임이 왜 이렇게 단단한지 설명하는 조합
- `combo-2` -> `n-2 먼저 선을 넘은 건 예비신랑이었다`
  - 입력: `cl-note-1`, `cl-statement-1`
  - judgeHint: 누가 먼저 경계를 넘었는지 뒤집는 핵심 조합
- `combo-3` -> `n-3 A 아버지의 돈 접근은 처음이 아니었다`
  - 입력: `e-5`, `e-6`
  - judgeHint: 현재 연락 사건이 아니라 반복된 돈 접근 사건으로 프레임을 바꾸는 조합
  - unlocked hard question: `q-d4-hard-pattern`
- `combo-4` -> `n-4 B는 두 번 다 말하지 못해 악역이 되었다`
  - 입력: `e-3`, `e-7`
  - judgeHint: 누가 먼저 잘못했는가보다, 왜 같은 구조가 두 번 반복됐는지 보여 주는 최종 조합
  - unlocked witness angle: `wa-1`

### 핵심 발언 확장
- d-1에서 B가 `꼭 전해야 할 말이 있었다`고 말하면, d-3에서는 `그 말이 A 아버지와 돈 문제였습니까?`로 연결돼야 한다
- d-2에서 B가 `먼저 찝적댄 건 그 사람이었다`고 말하면, d-1에서는 `그런데도 왜 당신이 먼저 연락하는 모습으로 남게 됐습니까?`로 재추궁돼야 한다
- d-3에서 B가 `예전에도 똑같은 걸 봤다`고 말하면, d-4에서는 `그 예전 일이 바로 A 아버지의 사기였습니까?`로 열려야 한다
- d-5에서 A가 `예전에도 비슷하다고 믿었다`고 말하면, d-4에서는 `그 믿음이 사실은 아버지가 만든 오해였을 가능성은 없습니까?`로 확장돼야 한다

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/friend-v2-01.json`
- `docs/ref/리뉴얼참고/thread-s-v2-case-design-friend.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- friend-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 생성되면 재실행 시 함께 첨부
- 다만 현재 문서는 위 파일들 없이도 runtime + 기획만으로 GPT Pro 실행이 가능하도록 닫아 둔다

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 friend 카테고리의 "손절한 절친"이다.
기존 friend v1 사건이나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건의 필수 곡선:
- 전 절친이 예비신랑에게 집착하는 것처럼 보이는 초반 함정
- 예비신랑이 먼저 선을 넘었다는 1차 반전
- A 아버지의 현재 돈 접근이 열리며 사건 축이 이동
- 과거 손절 사건도 같은 아버지 문제였다는 2차 반전
- 과거·현재 대조표로 두 번 반복된 침묵 구조가 닫힘
- 최종적으로는 "집착 사건"이 아니라 "반복된 돈 접근과 두 번의 침묵" 사건으로 프레임이 바뀜

사건 핵심:
- B의 예비신랑 연락 기록
- 공통 친구 단톡방 공개 매도
- 과거 손절 직전 카톡
- 예비신랑의 선 넘는 메시지와 B의 거절 답장
- A 아버지의 현재 돈 문자
- 과거 송금 영수증과 미상환 문자
- 과거·현재 대조표가 보여 주는 반복 패턴

초반 인상:
- 최수민이 손절한 친구의 예비신랑에게 계속 들이대는 사람처럼 보여야 한다.

중반 뒤집기:
- 먼저 경계를 넘은 건 예비신랑이었고, B의 연락은 적어도 집착이 아니라 경고와 대응으로 읽히기 시작해야 한다.

후반 정리:
- 최수민은 의도가 경고였더라도 또다시 송다은에게 직접 말하지 않고 혼자 막으려 한 책임이 남아야 한다.
- 송다은은 직접 확인도 없이 친구를 공개 매도하고, 과거 오해를 다시 반복한 책임이 남아야 한다.
- 결론은 "누가 예비신랑을 꼬셨는가"가 아니라 "누가 먼저 낙인을 찍었고, 왜 같은 침묵이 두 번 반복됐는가"가 되어야 한다.

화자 정보:
- A 송다은: 31세, 온라인 쇼핑몰 CS 직원, premature_summary
  - 패턴이 보이면 상대 설명보다 먼저 결론을 잡고, 그 결론을 주변 사람들과 공유하면서 확신을 키운다.
  - 정황 몇 개를 바로 묶어 결론처럼 말한다.
  - 자신만 그렇게 본 게 아니라 다들 그랬다고 강조한다.
  - 아버지와 예전 손절 얘기가 나오면 목소리가 갑자기 낮아진다.
  - 상대 직접 호칭은 "수민아", 감정이 올라가면 "최수민", 재판관에게는 "재판장님"
- B 최수민: 31세, 필라테스 강사, affect_flattening
  - 직접 부정하기보다 감정을 눌러 말하고, 핵심 이유는 끝까지 미루다가 마지막 문장에서야 꺼낸다.
  - 강한 사실도 톤을 낮춰 말하며 사건의 온도를 떨어뜨리려 한다.
  - 핵심 이유를 끝까지 숨기다가 마지막 문장에 꺼낸다.
  - 자기 피해를 설명할 때도 자신을 지우는 표현을 쓴다.
  - 상대 직접 호칭은 "다은아", 감정이 올라가면 "송다은", 재판관에게는 "재판장님"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 상대에게 직접 말할 때만 "수민아" / "최수민" / "다은아" / "송다은"을 쓴다
- 한 문장 안에 재판관 화법과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 예비신랑의 선 넘는 메시지, A 아버지의 돈 접근, 과거 송금, 두 번 반복된 침묵 구조를 전부 다 열지 마라
- early에서는 "그 연락", "그 방", "그 사람", "그때 그 일", "그 돈 얘기"처럼 감춘 표현을 주로 써라
- mid에서는 예비신랑의 선 넘는 메시지와 B의 경고 동기 일부까지만 연다
- late에서는 A 아버지의 반복된 돈 접근, 과거 손절 원인, 과거·현재 대조표, 첫 낙인 책임까지 구체화된다
- monetaryDisputeIds가 `d-3`, `d-4`이므로 관련 late 문장에는 실제 돈 부탁, 송금, 미상환, 반복 패턴 같은 금전 정보가 살아 있어야 한다

장치 반영 규칙:
- investigationStages는 evidence_present 반응에서 반드시 살아 있어야 한다: stage 0은 진위 확인, stage 1은 이유와 대상 추궁, stage 2는 왜 말하지 않았고 왜 같은 일이 반복됐는지 압박하는 톤으로 올라가야 한다
- evidenceCombinations `c-1`, `c-2`, `c-3`, `c-4`와 combo nodes `n-1`~`n-4`는 서로 다른 의미 전환을 만들어야 한다. 하나의 단순 반전으로 뭉개지 마라
- DossierCard `dc-1`~`dc-3`은 state를 강제로 밀어 올리는 카드처럼 들려야 한다
- 핵심 발언 확장은 interrogation 대사 간 연결 고리로 반드시 살아 있어야 한다
- `q-d4-hard-pattern`과 `wa-1`은 각각 late dossier 압박과 witness 해석축에서 반드시 반영해야 한다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 예비신랑의 선 넘는 메시지, 아버지 돈 문자, 과거 송금, 두 번 반복된 침묵을 전부 자백시키는 것
- 집착 프레임이 너무 빨리 풀려 초반 tension이 죽는 것
- 최수민을 순수한 희생자, 송다은을 순수한 가해자로 고정하는 것
- "손절한 절친"이라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 송다은만이다.

생성 범위:
- disputes: d-5
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

송다은 쪽 추가 규칙:
- 초반에는 B를 거의 집착하는 사람으로 확정한 친구처럼 들려야 한다
- 정황 몇 개를 빠르게 묶고, "나만 그렇게 본 게 아니다"는 집단 확신을 자주 끌어와라
- premature_summary답게 설명보다 결론을 먼저 말하고, 아버지 얘기가 나오면 짧아지고 흔들려라
- d-5의 고백은 `S0 수민이가 먼저 들이댔다 -> S1 확인 전 단톡방에 말한 건 맞다 -> S2 예전에도 비슷하다고 믿어서 더 세게 말했다 -> S3 내가 모르는 사정이 있었다는 건 안다 -> S4 내가 먼저 수민이를 그런 사람으로 몰았다 -> S5 아버지 진실을 몰랐어도 두 번 같은 방식으로 버린 건 내 잘못이다`의 흐름을 가져야 한다
- `예전에도 비슷하다고 믿었다` 같은 문장이 later d-4 질문으로 확장될 수 있게 씨앗을 심어라
- S0-S1에서는 아버지의 돈 접근이나 과거 손절 진실을 자기가 알고 있는 것처럼 쓰지 마라

이 사건에서 송다은의 실패 패턴:
- 너무 빨리 자기 낙인 책임을 자백하면 초반 함정 프레임이 죽는다
- 끝까지 억울함만 반복하면 d-5의 late 반성이 안 선다
- 최수민 같은 체온 낮은 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 최수민만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

최수민 쪽 추가 규칙:
- 초반에는 집착 의심을 정면 부정하기보다, 연락 사실은 인정하되 이유를 숨기는 affect_flattening 리듬이어야 한다
- 자기 행동은 "꼭 전해야 할 말이 있었다", "그 사람이 먼저 선을 넘었다", "또 같은 냄새가 났다"처럼 핵심을 늦게 열어라
- d-1의 고백은 `S0 집착이 아니다 -> S1 연락은 했다 -> S2 꼭 전해야 할 말이 있었다 -> S3 유혹이 아니라 경고였다 -> S4 다은이에게 바로 말할 길이 없었다 -> S5 예전에도 똑같은 구조였다`의 순서를 가져야 한다
- d-2의 고백은 `S0 그런 일 없었다 -> S1 가벼운 말 정도였다 -> S2 따로 보자는 말이 있었다 -> S3 먼저 찝적댄 건 그 사람이었다 -> S4 나는 선을 그었다 -> S5 다은이에게 말하면 결혼 직전 판이 무너질까 못 말했다`의 순서를 가져야 한다
- d-3의 고백은 `S0 아버지 돈 얘기 몰랐다 -> S1 이상한 낌새는 봤다 -> S2 예비신랑에게 돈 얘기를 꺼냈다 -> S3 예전과 너무 비슷했다 -> S4 그래서 혼자 막으려 했다 -> S5 다은이 삶이 무너질까 또 말 못 했다`의 순서를 가져야 한다
- d-4의 고백은 `S0 예전 일은 감정 문제였다 -> S1 그때도 돈 문제가 있었다 -> S2 아버지가 내게 돈을 받아 간 건 맞다 -> S3 사실상 사기였다 -> S4 다은이에게 말하면 집안이 무너질까 못 말했다 -> S5 차라리 내가 변심한 사람으로 보이는 게 낫다고 여겼다`의 순서를 가져야 한다
- `꼭 전해야 할 말이 있었다`, `예전에도 똑같은 걸 봤다` 같은 문장이 later d-3, d-4 압박으로 확장될 수 있게 미리 심어라
- S0-S1에서는 예비신랑의 선 넘는 메시지, 아버지 돈 문자, 과거 송금 영수증을 전부 다 열지 마라

이 사건에서 최수민의 실패 패턴:
- 너무 빨리 예비신랑 선넘기와 아버지 돈 패턴을 전부 자백하면 중반 뒤집기가 죽는다
- 끝까지 침묵만 반복하면 왜 또 혼자 막으려 했는지의 비극성이 안 선다
- 송다은 같은 결론 선점형 문장으로 쓰면 실패다

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
너는 위 공통 지시문과 v2 장치 반영 메모를 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

현재 증거 범위:
- e-1 B→예비신랑 연락 기록
- e-2 공통 친구 단톡방 캡처
- e-3 과거 손절 직전 카톡
- e-4 예비신랑의 선 넘는 메시지와 B의 거절 답장
- e-5 A 아버지와 예비신랑의 문자
- e-6 과거 송금 영수증 + 문자
- e-7 과거·현재 대조표

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: e-1, e-2, e-3, e-4, e-5, e-6, e-7
  - investigationStages: stage_0, stage_1, stage_2
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - dossierCardIdsV2: dc-1, dc-2, dc-3
  - targets:
    - dc-1 -> b
    - dc-2 -> b
    - dc-3 -> a
  - cardBands: unlock, pressure, collapse
  - key당 variants 3개

이 사건의 evidence reaction 축:
- e-1/e-2/e-3: 세 개가 겹치면 B가 예비신랑에게 집착하고, A가 먼저 공개 매도했다는 초반 함정이 함께 서야 한다
- e-4: 먼저 선을 넘은 쪽이 예비신랑이었다는 1차 반전이 열린다
- e-5: 현재 사건의 핵심이 A 아버지의 돈 접근으로 이동해야 한다
- e-6: 과거 손절 사건도 같은 아버지 문제였다는 2차 반전이 열린다
- e-7: 두 번 반복된 침묵과 첫 낙인 책임이 한 줄 구조로 닫혀야 한다

investigationStages 반영 규칙:
- stage 0 반응은 진위 확인을 받는 순간의 짧고 즉각적인 반응이어야 한다
- stage 1 반응은 왜 그런 행동을 했는지, 왜 그렇게 본 건지 추궁받는 순간의 방어·축소·흔들림이어야 한다
- stage 2 반응은 왜 말을 안 했고, 왜 같은 일이 반복됐는지까지 치고 들어가는 압박 반응이어야 한다

evidenceCombinations / combo nodes 반영 규칙:
- `c-1`과 `n-1`이 붙을 때는 B 집착 프레임과 A의 첫 낙인 축이 동시에 굳어야 한다
- `c-2`와 `n-2`가 붙을 때는 누가 먼저 경계를 넘었는지가 뒤집히되, 왜 B가 직접 연락하는 모습으로 남았는지가 남아 있어야 한다
- `c-3`과 `n-3`이 붙을 때는 현재 사건과 과거 손절이 같은 돈 접근 패턴으로 한 번에 이어져야 하며, `q-d4-hard-pattern`이 late 압박으로 살아야 한다
- `c-4`와 `n-4`가 붙을 때는 B가 두 번 다 침묵 속에서 악역이 됐다는 구조와 `wa-1`의 자기희생 해석이 함께 살아야 한다

DossierCard 반영 규칙:
- `dc-1`은 B에게 "왜 다은에게 바로 말하지 않았는가"를 찌르는 카드여야 한다
- `dc-2`는 B가 이번에도 혼자 막으려 한 선택을 정면으로 흔드는 카드여야 한다
- `dc-3`은 A의 성급한 결론과 공개 낙인 책임을 직접 세우는 카드여야 한다

핵심 발언 확장 규칙:
- B가 꼭 전해야 할 말이 있었다고 하면 d-3 아버지 돈 문제로 이어져야 한다
- B가 먼저 찝적댄 건 그 사람이라고 하면 d-1 왜 자신이 먼저 연락하는 모습으로 남았는지로 되돌아가야 한다
- B가 예전에도 똑같은 걸 봤다고 하면 d-4 과거 사기 질문으로 이어져야 한다
- A가 예전에도 비슷하다고 믿었다고 하면 d-4 아버지가 만든 오해 가능성으로 확장돼야 한다

출력 형식:
{
  "evidence_present": { "entries": [] },
  "dossier": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 4 Prompt

```text
너는 위 공통 지시문과 v2 장치 반영 메모를 따르는 scripted text 작성 모델이다.

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
  - resultClasses: a_primary_fault, b_primary_fault, shared_fault, protective_resolution, procedural_caution
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

증인 작성 지침:
- w-1 김세라: 공통 친구다. 단톡방에서 송다은이 어떤 톤으로 먼저 최수민을 몰아갔는지, 최수민이 바로 해명할 틈도 없이 분위기가 굳어졌는지 증언할 수 있어야 한다. d-5 핵심 증인이다
- w-2 박준혁: 예비신랑 회사 후배다. 예비신랑이 먼저 최수민 쪽으로 가벼운 선을 넘는 말과 연락을 했다는 쪽을 현장 분위기처럼 말할 수 있어야 한다. d-2 핵심 증인이다
- w-3 오미경: 동네 분식집 사장이다. 과거에 A 아버지가 B에게 돈 얘기를 하던 장면과, 그 뒤 B가 혼자 끊고 사라지던 모습을 기억하는 사람처럼 말해야 한다. d-4 핵심 증인이다
- `wa-1`을 반영해, w-3 full-depth 일부는 "최수민의 침묵은 변심보다 송다은 삶이 무너질까 두려워한 자기희생에 가깝다"는 각도를 지지할 수 있어야 한다
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 반복 구조와 감정 해석이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 직접 확인도 없이 단톡방에서 먼저 낙인을 찍고, 과거 오해까지 끌어와 친구 명예를 무너뜨린 쪽이라는 결말
- b_primary_fault: 의도가 경고였더라도 또다시 다은에게 직접 말하지 않고 예비신랑에게 먼저 접근해 오해를 키운 쪽이라는 결말
- shared_fault: 한쪽은 공개 낙인을 찍고, 다른 한쪽은 또 침묵과 우회 연락을 택해 같은 오해를 반복시켰다는 씁쓸한 결말
- protective_resolution: 결혼 직전 관계 판단과 A 아버지의 돈 문제를 분리하고, B의 명예 훼손과 예비신랑 경계 침해를 따로 정리하는 결말
- procedural_caution: 반복된 금전 접근, 선 넘는 사적 연락, 공개 낙인, 혼자 막으려는 침묵이 모두 사건을 키웠다는 경고성 결말
- aftermath는 판결문 요약이 아니라 "의도가 경고였어도 침묵과 낙인은 이미 두 사람을 돌이키기 어렵게 만들었다"는 뒷맛을 보여야 한다

system_message 원칙:
- 플레이어를 밀어주는 중립 문구만 허용
- A 아버지의 반복 패턴이나 예비신랑 책임을 직접 정답처럼 낭독하지 마라
- combo node나 derived note가 열릴 때도 비스포일러 문장으로 유지하라
- `evidence|new_unlock` 변형 일부는 `지금의 연락이 과거의 패턴과 연결되고 있습니다`, `숨겨진 동기가 다른 방향을 가리키고 있습니다` 같은 문장으로 v2 장치 반영이 가능해야 한다
- `dossier|challenge_cleared` 변형 일부는 late hard question이 먹혔다는 인상을 주되, `dc-1`~`dc-3` 문장을 그대로 말하지 마라

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 후속 보강 포인트
- friend-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 별도로 생성되면 combo note, dossier card, hard question, witness angle coverage를 1회 더 대조한다.
- 현재 문서는 runtime JSON과 v2 기획만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
