# Thread W Spouse v2-01 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 spouse v2 사건 `새벽 통화기록`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 완성본**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-spouse-v2-01`
- working slug: `spouse-v2-01`
- 기준 파일:
  - `src/data/cases/generated/spouse-v2-01.json`
  - `docs/ref/리뉴얼참고/thread-s-v2-case-design-spouse.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 이번 케이스는 `v2 기획`이 사건 장치까지 직접 정의하고 있으므로, `investigationStages`, `evidenceCombinations`, `DossierCard`, `조합 스킬 노드`, `핵심 발언 확장`을 모두 프롬프트 내부에 명시 반영한다.
  - runtime JSON에는 별도 `dossierQuestionIds`/`dossierCards` 필드가 없으므로, v2 기획 문서의 `dc-1`~`dc-3`와 runtime `combinationLab`의 `combo-1`~`combo-4`, `n-1`~`n-4`를 프롬프트 anchor로 사용한다.
  - v1 spouse 사건 프롬프트/데이터는 이 문서의 기준이 아니다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-spouse-v2-01"
working_slug: "spouse-v2-01"
title: "새벽 통화기록"
category: "spouse"
summary: "카드 명세서, 오피스텔 출입, 새벽 통화는 외도처럼 보이지만, 친형·조카 돌봄, 시댁 불화, 공동 적금 3,000만 원 해지, 아내의 2,000만 원 투자 사기, 통화·출입·계좌이체 대조표가 겹치며 부부 합산 5,000만 원 증발 사건으로 바뀌는 spouse v2 케이스."
headline_hook: "남편 카드 명세서에 여성 생리대, 스타킹이 찍혀 있고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신한다."
emotional_bait: "카드값, 오피스텔 출입, 새벽 통화가 모두 외도처럼 보인다. 그런데 그 끝에는 친형과 조카를 숨겨 돌본 남편과, 배신당했다고 믿고 2,000만 원을 먼저 움직인 아내의 비밀이 동시에 걸려 있다."
anchor_truth: "박지연은 남편이 딴살림을 차렸다고 믿고 이혼 대비로 집 돈 2,000만 원을 따로 빼두려다 투자 사기에 당했다. 이준호는 외도가 아니라 친형과 중2 조카를 몰래 돌보고 있었지만 시댁 불화를 피하려고 숨겼고, 끝내 공동 적금 3,000만 원을 깨 형 빚을 갚아 줬다."
resolution_dilemma: "형과 조카를 지키려다 가정 돈 3,000만 원을 상의 없이 써 버린 남편과, 배신당했다고 믿고 자기 몫을 지키려다 집 돈 2,000만 원을 사기에 날린 아내 중 누가 더 나쁜가. 남편은 가족을 지키려 했지만 배우자 동의를 버렸고, 아내는 자기 자신을 지키려 했지만 실제로 돈을 먼저 따로 움직였다."
context:
  type: "marital_finance_distrust"
  description: "남편 카드 명세서에 여성 생리대, 스타킹이 찍혀 있고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신한다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 카드값, 오피스텔 출입, 새벽 통화기록이 너무 선명해서 이준호의 딴살림처럼 보인다. 그러나 e-4가 열리면 그 오피스텔에는 친형과 조카딸이 살고 있었고, 생리대와 스타킹 역시 조카의 생필품이었다는 사실이 드러난다. 이후 공동 적금 3,000만 원 해지와 2,000만 원 송금이 연달아 열리면서, 사건의 핵심은 외도가 아니라 서로에게 말하지 않고 가정 돈을 움직인 부부의 비밀과 공포였다는 방향으로 뒤집힌다."
party_a:
  id: "a"
  name: "박지연"
  age: 36
  occupation: "학원 데스크 직원"
  archetype: "victim_cosplay"
  speech_style: "자신도 배신당한 피해자였다고 먼저 말하고, 책임 질문이 들어오면 불안과 수치심을 이유로 설명 범위를 넓힌다."
  to_partner: "준호 씨"
  to_judge: "제 남편"
  angry: "이준호 씨"
  tells:
    - "자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다."
    - "그때는 다른 선택이 없었다는 표현으로 책임의 각도를 흐린다."
    - "작은 인정부터 꺼낸 뒤 가장 수치스러운 선택은 늦게 말한다."
party_b:
  id: "b"
  name: "이준호"
  age: 38
  occupation: "가전매장 직원"
  archetype: "avoidant"
  speech_style: "직접적인 책임 질문이 오면 한 박자 늦게 답하고, 사실을 완전히 부정하기보다 중요한 부분만 뒤로 미룬다."
  to_partner: "지연 씨"
  to_judge: "제 아내"
  angry: "박지연 씨"
  tells:
    - "질문을 바로 받지 않고 짧게 시간을 끌며 핵심어를 피한다."
    - "큰 사실은 인정하되 가장 아픈 이유는 마지막까지 잘라 낸다."
    - "선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다."
disputes:
  - id: "d-1"
    name: "오피스텔 출입은 딴살림인가, 가족 돌봄인가"
    quadrant: "b_only"
    runtime_truth: "오피스텔 출입은 외도를 위한 별도 생활이 아니라, 친형과 조카를 돌보러 간 가족 돌봄이었다. 다만 이준호는 시댁 불화가 다시 터질까 두려워 그 사실을 배우자에게 숨겼다."
    writing_direction: "초반에는 외도 의심이 가장 강하게 올라와야 하고, e-4 이후에야 형·조카 돌봄과 시댁 불화 축으로 재해석돼야 한다."
  - id: "d-2"
    name: "공동 적금 3,000만 원 해지는 급한 가족 구제인가, 배우자 몰래 한 월권인가"
    quadrant: "b_only"
    runtime_truth: "이준호는 형네를 지키기 위한 가족 구제라고 주장하지만, 배우자 동의 없이 공동 적금 3,000만 원 전액을 해지해 형 빚으로 보낸 책임은 피할 수 없다."
    writing_direction: "형과 조카를 위한 사정은 살리되, 공동 적금 3,000만 원 독단 처리의 무게는 late로 갈수록 더 커져야 한다."
  - id: "d-3"
    name: "아내의 2,000만 원 이체는 자기방어인가, 이혼 대비 은닉 시도인가"
    quadrant: "a_only"
    runtime_truth: "박지연은 배신당했다고 믿고 자기 몫을 먼저 지키려 했다. 그러나 남편의 진실을 확인하기 전에 2,000만 원을 따로 움직여 투자방에 보낸 선택은 자기방어이면서 동시에 은닉 시도였다."
    writing_direction: "초반에는 겁나서 잠깐 빼두려 한 것처럼 들리되, e-6 이후에는 수치심과 이혼 대비 심리가 함께 살아나야 한다."
  - id: "d-4"
    name: "누가 먼저 부부의 신뢰를 깼는가"
    quadrant: "shared_misconception"
    runtime_truth: "숨긴 돌봄은 이준호 쪽에서 먼저 시작됐고, 비밀 송금 실행은 박지연 쪽이 먼저였다. 누가 먼저 신뢰를 깼는지와 누가 먼저 돈을 움직였는지는 서로 다른 축으로 갈라진다."
    writing_direction: "late에는 '누가 먼저 숨겼는가'와 '누가 먼저 돈을 움직였는가'가 다른 결론으로 갈라지는 구조가 선명해야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: ["d-2", "d-3", "d-4"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "bank"
    surface_name: "카드 명세서"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "딴살림 오해를 강하게 여는 출발점"
  - id: "e-2"
    type: "log"
    surface_name: "오피스텔 출입 기록"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "B의 반복 방문이 외도처럼 보이는 early 직접 증거"
  - id: "e-3"
    type: "log"
    surface_name: "새벽 통화기록"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "외도 의심을 가장 날카롭게 조이는 early 증거"
  - id: "e-4"
    type: "chat"
    surface_name: "형과의 문자 + 조카 학교 알림 문자"
    required_lie_state: "S1"
    requires: ["e-3"]
    subject_party: "b"
    writing_role: "형·조카 돌봄 1차 반전과 시댁 불화 축을 여는 mid 증거"
  - id: "e-5"
    type: "bank"
    surface_name: "공동 적금 해지 내역과 계좌이체 기록"
    required_lie_state: "S2"
    requires: ["e-4"]
    subject_party: "b"
    writing_role: "B의 선의가 공동재산 3,000만 원 독단 처분으로 무거워지는 late 축"
  - id: "e-6"
    type: "chat"
    surface_name: "A와 지인 박미라의 카톡 + 송금 영수증"
    required_lie_state: "S2"
    requires: ["e-5"]
    subject_party: "a"
    writing_role: "A의 2,000만 원 송금과 투자 사기 수치심이 열리는 late 뒤집기 축"
  - id: "e-7"
    type: "log"
    surface_name: "통화·출입·계좌이체 대조표"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "both"
    writing_role: "숨긴 돌봄 시작 시점과 비밀 송금 실행 시점의 순서를 갈라 보여주는 최종 타임라인 축"
witness_pool:
  - id: "w-1"
    name: "이성호"
    bias: "pro_b"
    related_disputes: ["d-1", "d-2", "d-4"]
  - id: "w-2"
    name: "이가은"
    bias: "pro_b"
    related_disputes: ["d-1"]
  - id: "w-3"
    name: "박미라"
    bias: "pro_a"
    related_disputes: ["d-3", "d-4"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids_v2: ["dc-1", "dc-2", "dc-3"]
combination_recipe_ids: ["combo-1", "combo-2", "combo-3", "combo-4"]
derived_note_ids: ["n-1", "n-2", "n-3", "n-4"]
analysis_points_base: 5
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
channel_inventory_source: "spouse-v2-01 runtime JSON + spouse v2 design doc + runtime combinationLab + current new-case scripted bundle baseline"
```

## v2 장치 반영 메모

### investigationStages
- `e-1 카드 명세서`
  - stage 0: 카드 사용 내역 진위 확인
  - stage 1: 여성용품이 누구를 위한 구매였는지 추궁
  - stage 2: 그 반복 패턴을 아내에게 어떻게 설명했는지 추궁
- `e-2 오피스텔 출입 기록`
  - stage 0: 차량 출입 진위 확인
  - stage 1: 왜 퇴근 뒤마다 같은 오피스텔에 갔는지 추궁
  - stage 2: 그 두 시간 동안 집에는 뭐라고 말했는지 추궁
- `e-3 새벽 통화기록`
  - stage 0: 새벽 통화 사실 확인
  - stage 1: 왜 새벽 다섯 시 전후로 통화했는지 추궁
  - stage 2: 새벽 통화와 저녁 방문이 왜 같은 날 반복됐는지 추궁
- `e-4 형 문자 + 조카 학교 알림 문자`
  - stage 0: 번호가 친형 번호인지 확인
  - stage 1: 민서가 누구고 왜 밥과 생필품을 챙겼는지 추궁
  - stage 2: "제수씨는 또 싸움 난다"가 무엇을 숨겼다는 뜻인지 추궁
- `e-5 공동 적금 해지 내역`
  - stage 0: 공동 적금 여부 확인
  - stage 1: 해지한 3,000만 원을 누구에게 보냈는지 추궁
  - stage 2: 가족 구제라 해도 왜 배우자와 상의하지 않았는지 추궁
- `e-6 A의 투자방 카톡 + 송금 영수증`
  - stage 0: 2,000만 원 송금 사실 확인
  - stage 1: "내 돈부터 지켜야겠다"고 말한 이유 추궁
  - stage 2: 진실 확인 전 돈을 옮긴 것이 이혼 대비였는지 추궁
- `e-7 통화·출입·계좌이체 대조표`
  - stage 0: 날짜와 시각 진위 확인
  - stage 1: 남편의 비밀 방문과 아내의 비밀 송금 중 무엇이 먼저 실행됐는지 추궁
  - stage 2: 숨긴 채 돈을 움직인 시점에 각자 무엇을 결심했는지 추궁

### evidenceCombinations
- `c-1`: `e-1 + e-3`
  - 효과: `"딴살림처럼 보이는 반복 패턴"` 확정
  - 반영 규칙: d-1 early 반응과 system hint는 외도 오해가 강하게 붙는 함정 메모 결을 가져야 한다
- `c-2`: `e-4 + e-5`
  - 효과: `"형네 돌봄이 생필품 수준이 아니라 공동 적금 3,000만 원 지출까지 갔다"` 확정
  - 반영 규칙: d-2 hard 압박과 `dc-2`가 붙으며, B는 선의 방어가 점점 버거워져야 한다
- `c-3`: `e-5 + e-6`
  - 효과: `"남편 3,000만 원 + 아내 2,000만 원, 부부 합산 5,000만 원 증발"` 전체 그림 확정
  - 반영 규칙: d-4 hard 질문과 최종 타임라인 해석, aftermath 결말의 중심 축이 된다

### DossierCard
- `dc-1`
  - 카드 문장: `새벽 통화 상대가 형이라면, 왜 아내에게 한마디도 못 했습니까?`
  - 해금 조건: `d-1 S2+`, `e-4`
  - 효과: d-1을 S3로 밀어 올리며 시댁 불화가 숨김의 이유였다는 축을 강제로 연다
- `dc-2`
  - 카드 문장: `공동 적금 3,000만 원은 부부 돈인데, 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?`
  - 해금 조건: `d-2 S3+`, `e-5`
  - 효과: d-2 책임 추궁을 강화하고 B의 S4~S5 감정 붕괴를 촉발한다
- `dc-3`
  - 카드 문장: `남편이 먼저 숨겼다고 해도, 먼저 2,000만 원을 움직인 건 당신이지요?`
  - 해금 조건: `d-3 S3+`, `e-6` 또는 `c-3`
  - 효과: A의 자기방어 서사를 d-4와 직접 연결하며, 실행 순서 쟁점을 날카롭게 만든다

### 조합 스킬 노드
- `combo-1` -> `n-1 딴살림처럼 보이는 반복 패턴`
  - 입력: `e-1`, `e-3`
  - judgeHint: 초반 외도 오해가 왜 강했는지 설명하는 조합
- `combo-2` -> `n-2 오피스텔 방문의 실제 목적은 형네 돌봄`
  - 입력: `e-2`, `e-4`
  - judgeHint: 딴살림처럼 보이던 이동 패턴이 가족 돌봄으로 뒤집히는 첫 반전
- `combo-3` -> `n-3 부부 돈 5,000만 원이 각자 비밀로 사라졌다`
  - 입력: `e-5`, `e-6`
  - judgeHint: 외도 의심 사건이 아니라 가정 돈 5,000만 원 증발 사건으로 프레임이 바뀌는 조합
  - unlocked hard question: `q-d4-hard-order`
- `combo-4` -> `n-4 숨김의 이유는 외도 은폐가 아니라 시댁 불화`
  - 입력: `cl-note-1`, `cl-statement-1`
  - judgeHint: 숨김의 동기 해석이 외도 은폐에서 관계 공포로 이동하는 조합
  - unlocked witness angle: `wa-1`

### 핵심 발언 확장
- d-1에서 B가 `형편이 어려운 가족이 있습니다`라고 말하면, d-2에서는 `그 가족에게 공동 적금 3,000만 원을 보낸 게 맞습니까?`로 바로 이어져야 한다
- d-1에서 B가 `말하면 더 크게 싸웠을 겁니다`라고 말하면, d-4에서는 `싸움이 두려워 먼저 숨긴 건 당신이지요?`로 확장돼야 한다
- d-3에서 A가 `내 돈이라도 지키려 했어요`라고 말하면, d-4에서는 `그래서 먼저 2,000만 원을 움직인 건 당신이지요?`로 이어져야 한다
- d-2에서 B가 `형이 곧 갚는다고 했습니다`라고 말하면, d-4에서는 `갚을 거였는데도 왜 아내 동의 없이 보냈습니까?`로 발전돼야 한다

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/spouse-v2-01.json`
- `docs/ref/리뉴얼참고/thread-s-v2-case-design-spouse.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- spouse-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 생성되면 재실행 시 함께 첨부
- 다만 현재 문서는 위 파일들 없이도 runtime + 기획만으로 GPT Pro 실행이 가능하도록 닫아 둔다

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 spouse 카테고리의 "새벽 통화기록"이다.
기존 spouse v1 사건이나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건의 필수 곡선:
- 딴살림 의심
- 형/조카 돌봄 1차 반전
- 시댁 불화가 숨김의 이유로 열림
- 공동 적금 3,000만 원 독단 해지로 B가 다시 무거워짐
- A의 투자 사기 2,000만 원이 열림
- 최종적으로는 부부 합산 5,000만 원 증발 사건으로 프레임이 바뀜

사건 핵심:
- 카드 명세서의 여성용품 결제
- 오피스텔 반복 출입
- 새벽 통화
- 친형과 조카 돌봄
- 시댁 불화 때문에 숨긴 이유
- 공동 적금 3,000만 원
- A의 2,000만 원 투자 사기
- 통화·출입·계좌이체 대조표가 보여 주는 실행 순서

초반 인상:
- 이준호가 딴살림을 하는 것처럼 보여야 한다.

중반 뒤집기:
- 오피스텔과 새벽 통화의 상대가 친형과 조카였고, 숨김의 이유가 시댁 불화였다는 1차 반전이 열려야 한다.

후반 정리:
- 이준호는 외도가 아니어도 공동 적금 3,000만 원을 독단 해지한 책임이 무겁게 남아야 한다.
- 박지연 역시 배신 확신 속에서 2,000만 원을 먼저 움직여 투자방에 보낸 책임이 무겁게 남아야 한다.
- 결론은 "누가 바람을 폈는가"가 아니라 "누가 먼저 숨겼고, 누가 먼저 돈을 움직였으며, 왜 서로에게 말하지 못했는가"가 되어야 한다.

화자 정보:
- A 박지연: 36세, 학원 데스크 직원, victim_cosplay
  - 자신도 배신당한 피해자였다고 먼저 말하고, 책임 질문이 들어오면 불안과 수치심을 이유로 설명 범위를 넓힌다.
  - 자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다.
  - 그때는 다른 선택이 없었다는 표현으로 책임의 각도를 흐린다.
  - 작은 인정부터 꺼낸 뒤 가장 수치스러운 선택은 늦게 말한다.
  - 상대 직접 호칭은 "준호 씨", 감정이 올라가면 "이준호 씨", 재판관에게 상대를 말할 때는 "제 남편"
- B 이준호: 38세, 가전매장 직원, avoidant
  - 직접적인 책임 질문이 오면 한 박자 늦게 답하고, 사실을 완전히 부정하기보다 중요한 부분만 뒤로 미룬다.
  - 질문을 바로 받지 않고 짧게 시간을 끌며 핵심어를 피한다.
  - 큰 사실은 인정하되 가장 아픈 이유는 마지막까지 잘라 낸다.
  - 선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다.
  - 상대 직접 호칭은 "지연 씨", 감정이 올라가면 "박지연 씨", 재판관에게 상대를 말할 때는 "제 아내"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 A는 "제 남편", B는 "제 아내"를 쓴다
- 상대에게 직접 말할 때만 "준호 씨" / "이준호 씨" / "지연 씨" / "박지연 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 친형, 조카, 시댁 불화, 공동 적금 3,000만 원, A의 2,000만 원 투자방 송금, 부부 합산 5,000만 원 증발 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 번호", "그 집", "그 돈", "그 새벽 연락", "그 사람들", "그 사정"처럼 감춘 표현을 주로 쓴다
- mid부터는 형·조카 돌봄, 오피스텔의 실제 용도, 숨김의 이유 일부가 열린다
- late에서는 공동 적금 3,000만 원, A의 2,000만 원, 부부 합산 5,000만 원, 숨긴 돌봄 시작 시점 vs 비밀 송금 실행 시점까지 구체화된다
- monetaryDisputeIds가 `d-2`, `d-3`, `d-4`이므로 이 범위의 S5 문장에는 실제 숫자가 들어가야 한다

장치 반영 규칙:
- investigationStages는 evidence_present 반응에서 반드시 살아 있어야 한다: stage 0은 진위 확인, stage 1은 목적 추궁, stage 2는 숨김과 관계 파장을 추궁하는 톤으로 올라가야 한다
- evidenceCombinations `c-1`, `c-2`, `c-3`과 combo nodes `n-1`~`n-4`는 서로 다른 의미 전환을 만들어야 한다. 하나의 단순 요약으로 뭉개지 마라
- DossierCard `dc-1`~`dc-3`은 기본 증거 질문의 반복이 아니라, 한 단계 더 강제로 state를 밀어 올리는 질문처럼 들려야 한다
- 핵심 발언 확장은 interrogation 대사 간 연결 고리로 반드시 살아 있어야 한다
- `q-d4-hard-order`와 `wa-1`은 각각 late dossier 압박과 witness 해석축에서 반영돼야 한다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 이준호의 친형·조카 돌봄, 시댁 불화, 공동 적금 3,000만 원을 전부 자백시키는 것
- 초반부터 박지연의 2,000만 원 투자방 송금과 이혼 대비 심리를 전부 자백시키는 것
- 외도 오해가 너무 빨리 풀려 초반 tension이 죽는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "새벽 통화기록"이라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 박지연만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

박지연 쪽 추가 규칙:
- 초반에는 딴살림을 거의 확신한 사람처럼 들려야 한다
- 카드값, 오피스텔, 새벽 통화가 왜 자신에게 배신처럼 느껴졌는지 피해자 프레임을 먼저 세워라
- 자기 행동은 "잠깐 빼두려 했다", "제 몫이라도 지키려 했다", "그때는 너무 무서웠다"처럼 축소·정당화하라
- victim_cosplay답게 불안, 수치심, 배신감, 자기방어 본능을 먼저 꺼내라
- d-3의 자기 고백은 `S0 돈 건드린 적 없다 -> S1 잠깐 따로 두려 했다 -> S2 제 몫을 지키려 했다 -> S3 투자방 2,000만 원 인정 -> S4 바람 의심과 바보 되기 싫었다 -> S5 이혼 준비·사기 수치심 인정`의 순서를 가져야 한다
- d-4에서는 "먼저 숨긴 건 남편"과 "먼저 돈을 움직인 건 자신"이 다른 축이라는 점이 late에 보이게 하라
- `내 돈이라도 지키려 했어요` 같은 문장이 later d-4 실행 순서 질문으로 확장될 수 있게 미리 씨앗을 심어라
- S0-S1에서는 투자방, 박미라, 2,000만 원, 이혼 준비를 전부 다 열지 마라

이 사건에서 박지연의 실패 패턴:
- 너무 빨리 2,000만 원 투자 사기와 이혼 준비를 전부 자백하면 late 뒤집기가 죽는다
- 너무 끝까지 억울함만 반복하면 d-4의 shared fault가 안 선다
- 이준호 같은 회피형 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 이준호만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

이준호 쪽 추가 규칙:
- 초반에는 딴살림 의심을 직접 부정하기보다, 핵심을 말하지 않고 옆으로 피하는 회피형 리듬이어야 한다
- 자기 행동은 "아는 사람 집", "가족 쪽 일", "잠깐 돌린 돈", "좋은 의도였다"처럼 중요한 부분을 늦게 열어라
- avoidant답게 질문을 한 박자 늦게 받고, 사실은 조금씩만 꺼내라
- d-1의 고백은 `S0 그런 식의 일 아님 -> S1 아는 사람 집 잠깐 -> S2 가족 쪽 일 인정 -> S3 시댁 불화 때문에 숨김 -> S4 형 빚과 조카 사정 -> S5 적금까지 건드린 배경`의 순서를 가져야 한다
- d-2의 축은 `S0 적금은 정리만 -> S1 잠깐 돌린 돈 -> S2 형이 급했다 -> S3 3,000만 원 전부 형 빚 -> S4 아니면 완전히 무너질 상황 -> S5 아내가 반대할 걸 알아 숨겼다`가 되어야 한다
- `말하면 더 크게 싸웠을 겁니다` 같은 문장이 later d-4 신뢰 파괴 질문으로 확장될 수 있게 미리 심어라
- S0-S1에서는 친형 번호, 조카 생필품, 공동 적금 3,000만 원, 시댁 불화를 전부 다 열지 마라

이 사건에서 이준호의 실패 패턴:
- 너무 빨리 형·조카 돌봄과 적금 3,000만 원을 다 자백하면 딴살림 의심 bait가 죽는다
- 너무 끝까지 선의만 반복하면 공동재산 독단 처분의 무게가 안 선다
- 박지연 같은 피해자 호소형 문장으로 쓰면 실패다

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
- e-1 카드 명세서
- e-2 오피스텔 출입 기록
- e-3 새벽 통화기록
- e-4 형과의 문자 + 조카 학교 알림 문자
- e-5 공동 적금 해지 내역과 계좌이체 기록
- e-6 A와 지인 박미라의 카톡 + 송금 영수증
- e-7 통화·출입·계좌이체 대조표

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
- e-1/e-2/e-3: 세 개가 겹치면 외도처럼 보이는 오해가 가장 강해야 한다
- e-4: 같은 번호가 친형이고, 오피스텔 방문이 형·조카 돌봄이었다는 1차 반전이 열린다
- e-5: B의 선의가 공동 적금 3,000만 원 독단 처분이라는 큰 책임으로 뒤집힌다
- e-6: A의 자기방어가 2,000만 원 비밀 송금과 투자 사기라는 수치심으로 열린다
- e-7: "숨긴 돌봄은 B가 먼저 / 비밀 송금 실행은 A가 먼저"라는 순서 차이가 분리돼 보여야 한다

investigationStages 반영 규칙:
- stage 0 반응은 진위 확인이나 본인성 확인을 받는 순간의 짧고 즉각적인 반응이어야 한다
- stage 1 반응은 목적과 대상이 좁혀지는 순간의 방어·축소·흔들림이어야 한다
- stage 2 반응은 무엇을 숨겼고, 배우자에게 뭐라고 말했고, 왜 관계가 더 무너졌는지까지 치고 들어가는 압박 반응이어야 한다

evidenceCombinations / combo nodes 반영 규칙:
- `c-1`과 `n-1`이 붙을 때는 d-1이 외도 쪽으로 강하게 기울어지는 함정 메모 결을 반영하라
- `c-2`와 `dc-2`가 붙을 때는 "돌봄이었다"는 해명이 곧바로 "그래도 3,000만 원을 보낼 권리가 있었느냐"는 책임 추궁으로 바뀌어야 한다
- `c-3`와 `n-3`이 붙을 때는 사건 프레임이 외도 의심에서 `부부 돈 5,000만 원 증발`로 완전히 바뀌어야 한다
- `combo-4`와 `n-4`가 붙을 때는 숨김의 이유가 외도 은폐에서 시댁 불화 공포로 재해석돼야 하며, witness angle `wa-1`의 씨앗도 심어야 한다

DossierCard 반영 규칙:
- `dc-1`은 B에게 "왜 말하지 못했는가"를 직접 찌르는 카드여야 한다
- `dc-2`는 B의 선의 프레임을 무너뜨리고 공동재산 동의권을 정면으로 묻는 카드여야 한다
- `dc-3`은 A의 자기방어 프레임을 "그래서 누가 먼저 실행했는가" 질문으로 바꾸는 카드여야 한다

핵심 발언 확장 규칙:
- B가 가족 사정을 말하면 d-2의 돈 문제로 자연스럽게 번져야 한다
- B가 시댁 싸움 공포를 말하면 d-4 신뢰 파괴 질문으로 이어져야 한다
- A가 자기 돈이라도 지키려 했다고 말하면 d-4 실행 순서 질문으로 이어져야 한다

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
- w-1 이성호: 친형이자 채무 압박 당사자다. 새벽부터 밤까지 일했고, 동생에게 "제수씨에게 말하지 마"라고 했던 사람처럼 말해야 한다. d-1, d-2, d-4 핵심 증인이다
- w-2 이가은: 중2 조카딸이다. 삼촌이 왜 생리대와 스타킹을 사 왔는지, 왜 저녁마다 들렀는지 감정적으로 증언할 수 있어야 한다. d-1 감정 축 핵심 증인이다
- w-3 박미라: A의 동네 지인이다. A가 먼저 "혹시 따로 굴릴 데 없냐"고 물었고 자신이 투자방 링크를 보냈다는 사실을 증언하는 사람처럼 말해야 한다. d-3, d-4 핵심 증인이다
- combo-4에서 열린 witness angle `wa-1`을 반영해, w-1 full-depth 일부는 "외도 은폐보다 시댁 갈등 재폭발 공포" 해석을 지지할 수 있어야 한다
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 배신 확신 속에서 2,000만 원을 먼저 움직여 사기에 날리고, 자기방어를 결국 은닉 시도로 만든 쪽이라는 결말
- b_primary_fault: 외도처럼 보일 행동을 오래 숨기고, 끝내 공동 적금 3,000만 원을 독단으로 처리한 쪽이라는 결말
- shared_fault: 숨긴 돌봄은 B가 먼저, 비밀 송금 실행은 A가 먼저였고, 결국 부부 돈 5,000만 원이 각자 비밀 속에서 사라졌다는 씁쓸한 결말
- protective_resolution: 미성년 조카, 투자 사기 2차 피해, 남은 공동재산 복구가 우선이라 관계 서사를 최소화하는 결말
- procedural_caution: 시댁 갈등을 핑계로 한 장기 은폐, 공동 적금 독단 해지, 투자방 비밀 송금 같은 방식 자체를 경고하는 결말
- aftermath는 판결문 요약이 아니라 "외도 오해가 풀려도 신뢰와 돈은 이미 무너져 있다"는 뒷맛을 보여야 한다

system_message 원칙:
- 플레이어를 밀어주는 중립 문구만 허용
- "누가 먼저였다"를 직접 알려주지 마라
- combo node나 derived note가 열릴 때도 비스포일러 문장으로 유지하라
- `evidence|new_unlock` 변형 일부는 `오해의 방향이 바뀌고 있습니다`, `흩어진 자금 흐름이 연결되고 있습니다` 같은 문장으로 v2 조합 노드 반영이 가능해야 한다
- `dossier|challenge_cleared` 변형 일부는 hard question이 통했다는 인상을 주되, `dc-1`~`dc-3` 내용 자체를 낭독하지 마라

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 후속 보강 포인트
- spouse-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 별도로 생성되면 combo note, dossier card, hard question coverage를 1회 더 대조한다.
- 현재 문서는 runtime JSON과 v2 기획만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
