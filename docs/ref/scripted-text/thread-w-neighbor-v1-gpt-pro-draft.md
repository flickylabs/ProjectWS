# Thread W Neighbor v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 neighbor 사건 `천장 너머의 18초`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 완성본**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-neighbor-v1-01`
- working slug: `neighbor-v1-01`
- 기준 파일:
  - `src/data/cases/generated/neighbor-v1-01.json`
  - `docs/ref/리뉴얼참고/neighbor-v1-01-v3-game-loop-data.json`
  - `docs/ref/리뉴얼참고/thread-s-v1-case-design-neighbor.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 neighbor-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-neighbor-v1-01"
working_slug: "neighbor-v1-01"
title: "천장 너머의 18초"
category: "neighbor"
summary: "층간소음 조정 합의금 320만 원, 방음매트 설치 약속, 자정 18초 충격음 게시글, 방음매트 반품, 블루투스 스윙센서 로그, 배관 샤프트 마이크와 편집 업로드, 복도·엘리베이터 합본 영상이 맞물리는 이웃 사건."
headline_hook: "층간소음 조정 합의서까지 썼는데, 한 달 뒤 입주민 게시판에 자정 18초 충격음이 올라왔다. 윗집은 그 글 하나로 집 매매 계약이 깨졌다고 주장한다. 아랫집은 합의금을 받고도 윗집이 방음매트를 반품하고 밤마다 실내 스윙 연습을 재개했다고 말한다. 윗집은 오히려 아랫집이 배관 샤프트에 불법 마이크를 숨겨 최악의 18초만 잘라 올렸다고 맞선다."
emotional_bait: "층간소음 조정 합의서까지 썼는데, 한 달 뒤 입주민 게시판에 자정 18초 충격음이 올라왔다. 윗집은 그 글 하나로 집 매매 계약이 깨졌다고 주장한다. 아랫집은 합의금을 받고도 윗집이 방음매트를 반품하고 밤마다 실내 스윙 연습을 재개했다고 말한다. 윗집은 오히려 아랫집이 배관 샤프트에 불법 마이크를 숨겨 최악의 18초만 잘라 올렸다고 맞선다."
anchor_truth: "문소라는 소음 재발 뒤 관리사무소 대신 직접 끝내겠다는 마음으로 공용 배관 샤프트에 접촉 마이크를 숨기고, 가장 심한 18초만 입주민 게시판에 올렸다. 박도현은 층간소음 합의금과 매트 설치 약속으로 민원을 잠재운 뒤, 집을 깔끔하게 보이려 방음매트를 반품하고 야간 실내 스윙 연습을 다시 시작했다."
resolution_dilemma: "합의를 깨고 다시 충격 소음을 낸 윗집을 더 무겁게 볼지, 아니면 불법 감청과 편집 게시로 사적 분쟁을 공동체 전체의 처벌로 바꿔 버린 아랫집을 더 무겁게 볼지 갈린다. 하나는 생활 침해의 반복이고, 다른 하나는 공동체 인프라를 사적으로 무기화한 보복이다."
context:
  type: "resident_conflict"
  description: "층간소음 조정 합의서까지 썼는데, 한 달 뒤 입주민 게시판에 자정 18초 충격음이 올라왔다. 윗집은 그 글 하나로 집 매매 계약이 깨졌다고 주장한다. 아랫집은 합의금을 받고도 윗집이 방음매트를 반품하고 밤마다 실내 스윙 연습을 재개했다고 말한다. 윗집은 오히려 아랫집이 배관 샤프트에 불법 마이크를 숨겨 최악의 18초만 잘라 올렸다고 맞선다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 아랫집의 게시글이 과격해 보여도, 윗집이 약속을 지키지 않았을 가능성이 더 커 보인다. 방음매트 주문 및 반품 내역과 블루투스 스윙센서 앱 로그가 열리면 실제로 박도현이 방음매트를 반품하고 실내 스윙 연습을 재개해 조정 합의를 사실상 무력화했다는 점이 드러난다. 하지만 배관 샤프트 점검 사진과 오디오 편집 폴더, 복도·엘리베이터 영상이 이어지면 문소라 역시 공용 설비를 이용해 최악의 18초만 골라 여론전과 매매 파기를 노린 쪽으로 드러난다."
party_a:
  id: "a"
  name: "문소라"
  age: 37
  occupation: "웹디자이너 재택근무"
  archetype: "confrontational"
  speech_style: "상대의 책임을 먼저 세게 지적하고, 자기 설명은 그 반격 속에 끼워 넣는다."
  to_partner: "박도현 씨"
  to_judge: "옆집 분"
  angry: "박도현 씨"
  tells:
    - "자신의 설명보다 상대 비난을 먼저 꺼낸다."
    - "질문을 받으면 다른 잘못을 역으로 들이민다."
    - "상대의 행위를 실제보다 더 의도적이었던 것처럼 키운다."
party_b:
  id: "b"
  name: "박도현"
  age: 43
  occupation: "보험사 보상팀 과장"
  archetype: "victim_cosplay"
  speech_style: "자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다."
  to_partner: "문소라 씨"
  to_judge: "옆집 분"
  angry: "문소라 씨"
  tells:
    - "스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다."
    - "선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다."
    - "작은 인정으로 큰 책임을 비껴 가려 한다."
disputes:
  - id: "d-1"
    name: "윗집은 층간소음 조정 합의를 실제로 이행했는가, 서류로만 끝냈는가"
    quadrant: "both_know"
    runtime_truth: "윗집은 층간소음 조정 합의를 실제로 이행했는가, 서류로만 끝냈는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 합의 파기 여부가 가장 크게 걸려야 하고, B가 약속을 지키지 않았다는 인상이 우세해야 한다."
  - id: "d-2"
    name: "자정의 18초 충격음은 정상 생활소음인가, 약속 위반의 반복인가"
    quadrant: "a_only"
    runtime_truth: "자정의 18초 충격음은 정상 생활소음인가, 약속 위반의 반복인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "e-4와 e-5가 붙으면 우발적 생활소음이 아니라 합의 위반이 반복됐다는 결이 살아나야 한다."
  - id: "d-3"
    name: "아랫집의 음원 수집은 정당한 증거 확보인가, 공용 설비를 이용한 불법 감청인가"
    quadrant: "b_only"
    runtime_truth: "아랫집의 음원 수집은 정당한 증거 확보인가, 공용 설비를 이용한 불법 감청인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 억울한 증거 확보처럼 남아 있어도, late에는 샤프트 내부 설치와 18초 편집 업로드의 의도가 분명히 보여야 한다."
  - id: "d-4"
    name: "이 분쟁을 관리 절차가 아닌 입주민 여론전으로 먼저 키운 쪽은 누구인가"
    quadrant: "shared_misconception"
    runtime_truth: "이 분쟁을 관리 절차가 아닌 입주민 여론전으로 먼저 키운 쪽은 누구인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 '소음을 재발시킨 사람'과 '전장을 공동체 전체로 키운 사람'이 분리되는 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: []
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "층간소음 조정 합의서"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "B가 지켜야 할 약속과 기준선을 세우는 출발점"
  - id: "e-2"
    type: "cctv"
    surface_name: "입주민 앱 게시판 캡처"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "A가 게시판 여론전을 먼저 연 것처럼 보이게 하는 early 축"
  - id: "e-3"
    type: "log"
    surface_name: "부동산 중개사 메시지"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "게시글이 실제 매매 파기까지 이어졌다는 피해 축"
  - id: "e-4"
    type: "log"
    surface_name: "방음매트 주문 및 반품 내역"
    required_lie_state: "S2"
    requires: ["e-1"]
    subject_party: "b"
    writing_role: "B가 합의를 서류로만 끝냈다는 mid 핵심 증거"
  - id: "e-5"
    type: "log"
    surface_name: "블루투스 스윙센서 앱 로그"
    required_lie_state: "S2"
    requires: ["e-2", "e-4"]
    subject_party: "a"
    writing_role: "자정 18초가 우발이 아니라 반복 충격 운동과 겹친다는 mid 강증거"
  - id: "e-6"
    type: "cctv"
    surface_name: "배관 샤프트 점검 사진과 오디오 편집 폴더"
    required_lie_state: "S2"
    requires: ["e-2"]
    subject_party: "b"
    writing_role: "A의 증거 확보가 불법 감청과 편집 게시였다는 late 뒤집기 증거"
  - id: "e-7"
    type: "cctv"
    surface_name: "복도 및 엘리베이터 합본 영상"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "a"
    writing_role: "B의 매트 반품과 A의 샤프트 작업·게시가 한 패키지로 묶이는 late shared fault 축"
dossier_cards:
  - id: "dossier-1"
    related_disputes: ["d-1", "d-2"]
    question_ids: ["dossier-1.a.q1", "dossier-1.a.q2", "dossier-1.b.q1", "dossier-1.b.q2"]
  - id: "dossier-2"
    related_disputes: ["d-2", "d-3"]
    question_ids: ["dossier-2.a.q1", "dossier-2.a.q2", "dossier-2.b.q1", "dossier-2.b.q2"]
  - id: "dossier-3"
    related_disputes: ["d-3", "d-4"]
    question_ids: ["dossier-3.a.q1", "dossier-3.a.q2", "dossier-3.b.q1", "dossier-3.b.q2"]
  - id: "dossier-4"
    related_disputes: ["d-4"]
    question_ids: ["dossier-4.a.q1", "dossier-4.a.q2", "dossier-4.b.q1", "dossier-4.b.q2"]
dossier_card_ids: ["dossier-1", "dossier-2", "dossier-3", "dossier-4"]
witness_pool:
  - id: "tp-1"
    name: "관리사무소 직원"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "입주민 대표"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "구청 실무자"
    bias: "neutral"
    related_disputes: ["d-3", "d-4", "d-1"]
witness_ids: ["tp-1", "tp-2", "tp-3"]
dossier_question_ids:
  - "dossier-1.a.q1"
  - "dossier-1.a.q2"
  - "dossier-1.b.q1"
  - "dossier-1.b.q2"
  - "dossier-2.a.q1"
  - "dossier-2.a.q2"
  - "dossier-2.b.q1"
  - "dossier-2.b.q2"
  - "dossier-3.a.q1"
  - "dossier-3.a.q2"
  - "dossier-3.b.q1"
  - "dossier-3.b.q2"
  - "dossier-4.a.q1"
  - "dossier-4.a.q2"
  - "dossier-4.b.q1"
  - "dossier-4.b.q2"
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
channel_inventory_source: "neighbor-v1-01 runtime JSON + neighbor-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/neighbor-v1-01.json`
- `docs/ref/리뉴얼참고/neighbor-v1-01-v3-game-loop-data.json`
- `docs/ref/리뉴얼참고/thread-s-v1-case-design-neighbor.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- neighbor-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- neighbor-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 neighbor 카테고리의 "천장 너머의 18초"다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 층간소음 조정 합의서와 320만 원 합의금
- 방음매트 설치 약속과 반품
- 자정 18초 충격음 게시글과 매매 계약 파기
- 블루투스 스윙센서 로그
- 공용 배관 샤프트 마이크와 18초 편집 업로드
- 복도·엘리베이터 영상으로 묶이는 반품과 게시 동선

초반 인상:
- 아랫집 게시글이 과격해 보여도, 윗집이 합의를 지키지 않았을 가능성이 더 크게 느껴져야 한다.

중반 뒤집기:
- 박도현이 방음매트를 반품하고 야간 실내 스윙 연습을 재개해 합의를 사실상 무력화했다는 사실이 열려야 한다.

후반 정리:
- 문소라 역시 관리사무소 절차 대신 공용 배관 샤프트에 마이크를 숨기고, 가장 심한 18초만 잘라 공동체 여론전으로 키운 쪽으로 드러나야 한다.
- 결론은 "누가 더 시끄러웠는가"만이 아니라 "누가 합의를 깨고 소음을 재발시켰고, 누가 이웃 분쟁을 공동체 전체의 전장으로 키웠는가"가 되어야 한다.

화자 정보:
- A 문소라: 37세, 웹디자이너 재택근무, confrontational
  - 상대의 책임을 먼저 세게 지적하고, 자기 설명은 그 반격 속에 끼워 넣는다.
  - 자신의 설명보다 상대 비난을 먼저 꺼낸다.
  - 질문을 받으면 다른 잘못을 역으로 들이민다.
  - 상대의 행위를 실제보다 더 의도적이었던 것처럼 키운다.
  - 상대 직접 호칭은 "박도현 씨", 재판관에게 상대를 말할 때는 "옆집 분"
- B 박도현: 43세, 보험사 보상팀 과장, victim_cosplay
  - 자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다.
  - 스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다.
  - 선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다.
  - 작은 인정으로 큰 책임을 비껴 가려 한다.
  - 상대 직접 호칭은 "문소라 씨", 재판관에게 상대를 말할 때는 "옆집 분"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- judge-facing 일반 참조는 runtime callTerms에 맞춰 양측 모두 "옆집 분"을 기본으로 쓴다
- 상대에게 직접 말할 때만 "박도현 씨" / "문소라 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 320만 원, 방음매트 전량 반품, 자정 전후 스윙 로그, 배관 샤프트 접촉 마이크, 14분 원본, 18초 export, 매매 파기 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 합의", "그 게시글", "그 충격음", "그 장치", "그 파일", "그 집 문제"처럼 감춘 표현을 주로 쓴다
- mid부터는 방음매트, 반품, 자정 연습, 게시판 폭로, 녹음 파일 정도가 열린다
- late에서는 320만 원, 배관 샤프트, 18초 편집, 14분 원본, 매매 파기, 복도·엘리베이터 동선까지 구체화된다
- 이 사건은 monetaryDisputeIds가 비어 있지만, 합의금이나 매매 손해가 late 문장에 보조적으로 들어갈 수 있다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 박도현의 방음매트 반품과 야간 실내 스윙 연습 재개를 전부 자백시키는 것
- 초반부터 문소라의 샤프트 마이크 설치와 18초 편집 업로드를 전부 자백시키는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "천장 너머의 18초"라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 문소라만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

문소라 쪽 추가 규칙:
- 초반에는 "약속을 깨고 또 시끄럽게 했다"는 비난이 먼저 튀어나와야 한다
- 자기 행동은 "더는 관리 절차가 안 먹혔다", "증거를 남길 수밖에 없었다", "다들 알아야 했다"처럼 반격 명분 속에 섞어 넣어라
- confrontational답게 상대 책임을 먼저 강하게 꽂고, 자기 설명은 그 사이에 끼워 넣어라
- 감정이 올라가도 박도현처럼 피해자 호소형 리듬으로 미끄러지지 마라
- S0-S1에서는 샤프트 내부 설치, 14분 원본, 18초 편집, 매매 파기 의도까지 전부 열지 마라
- S3 이후에는 "끝내야 했다"는 분노와 "보여주려고 골랐다"는 선별 의도가 함께 보이게 하라

이 사건에서 문소라의 실패 패턴:
- 너무 빨리 불법 감청과 편집 게시를 다 자백하면 late 뒤집기가 죽는다
- 너무 억울함만 반복하면 confrontational 결이 사라진다
- 박도현 같은 피해자 프레임 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 박도현만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

박도현 쪽 추가 규칙:
- 초반에는 게시글과 공개 망신 때문에 자신이 더 큰 피해를 봤다는 느낌이 먼저 나와야 한다
- 소음 문제는 "생활 중 생길 수 있는 범위", "정리 중 생긴 일", "과하게 부풀려진 문제"처럼 축소하라
- victim_cosplay답게 억울함, 매매 파기 압박, 선택권 부족을 먼저 꺼내라
- 작은 인정은 하되 큰 책임은 문소라의 과한 폭로와 여론전 쪽으로 밀어내라
- S0-S1에서는 방음매트 반품, 자정 스윙 연습 재개, 반복 충격 로그를 전부 열지 마라
- S4-S5에서는 "나도 압박받았다"는 명분과 "합의를 실제로는 안 지켰다"는 실행이 동시에 보이게 하라

이 사건에서 박도현의 실패 패턴:
- 너무 빨리 매트 반품과 자정 연습을 다 자백하면 early bait가 죽는다
- 너무 끝까지 억울함만 있으면 late shared fault가 안 선다
- 문소라 같은 공격형 문장으로 쓰면 실패다

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
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

현재 증거 범위:
- e-1 층간소음 조정 합의서
- e-2 입주민 앱 게시판 캡처
- e-3 부동산 중개사 메시지
- e-4 방음매트 주문 및 반품 내역
- e-5 블루투스 스윙센서 앱 로그
- e-6 배관 샤프트 점검 사진과 오디오 편집 폴더
- e-7 복도 및 엘리베이터 합본 영상

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: e-1, e-2, e-3, e-4, e-5, e-6, e-7
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - parties: a, b
  - dossierQuestionIds:
    - dossier-1.a.q1
    - dossier-1.a.q2
    - dossier-1.b.q1
    - dossier-1.b.q2
    - dossier-2.a.q1
    - dossier-2.a.q2
    - dossier-2.b.q1
    - dossier-2.b.q2
    - dossier-3.a.q1
    - dossier-3.a.q2
    - dossier-3.b.q1
    - dossier-3.b.q2
    - dossier-4.a.q1
    - dossier-4.a.q2
    - dossier-4.b.q1
    - dossier-4.b.q2
  - lieBands: early, mid, late
  - key당 variants 3개

이 사건의 evidence reaction 축:
- e-1: B가 지켜야 할 약속과 기준선이 먼저 세워지는 축
- e-2: A가 게시판 여론전을 연 사람처럼 보이는 early 축
- e-3: 게시글이 실제 매매 파기까지 번졌다는 외부 피해 축
- e-4: B가 방음매트를 반품해 합의를 비운 사람이었다는 mid 증거
- e-5: 자정 18초가 우발이 아니라 반복 충격 운동과 겹친다는 mid 강증거
- e-6: A의 증거 수집이 공용 설비를 쓴 불법 감청과 편집이었다는 late 뒤집기 증거
- e-7: B의 반품과 A의 샤프트 작업·게시 동선이 함께 묶이는 shared fault late 축

반드시 지킬 것:
- evidence_present는 자료를 보고 반응하는 문장이어야 한다
- 자료 이름이나 핵심 요소를 그대로 낭독하지 마라
- e-1/e-4/e-5에서는 박도현이 더 직접적 가해자로 보이되, 마지막 전까지는 단독 악당으로 확정하지 마라
- e-2/e-3에서는 문소라의 공개 폭로가 과격해 보여도, 아직 불법 감청의 전모는 다 열지 마라
- e-6/e-7에서는 문소라의 피해자 프레임이 무너지기 시작해야 한다
- dossier는 late 갈수록 "누가 합의를 비웠는가", "누가 증거를 선별했는가", "누가 공동체 여론을 무기화했는가"를 더 날카롭게 묻게 설계하라

출력 형식:
{
  "evidence_present": { "entries": [] },
  "dossier": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 4 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - witnessIds: tp-1, tp-2, tp-3
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
- tp-1 관리사무소 직원: 합의, 민원 재발, 후속 대응 순서를 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 입주민 대표: 게시판 파장과 주민 반응을 체감한 사람처럼 말하되, B 편향이 조금 보여야 한다
- tp-3 구청 실무자: 신고 경위와 절차 위반 여부를 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 문소라가 공용 설비와 편집 게시를 무기화해 이웃 분쟁을 공동체 처벌로 키운 쪽이라는 결말
- b_primary_fault: 박도현이 합의를 깨고 방음 조치를 비운 채 야간 충격 운동을 재개한 쪽이라는 결말
- shared_fault: 한쪽은 소음을 재발시켰고, 다른 한쪽은 여론전과 감청으로 전장을 키웠다는 씁쓸한 결말
- protective_resolution: 매매 예정 세대, 주민 공동체, 민감 녹음 정보 보호가 우선이라 갈등 서사를 최소화하는 결말
- procedural_caution: 합의 이행 무력화, 공용 설비 불법 사용, 편집 폭로, 게시판 여론전 같은 방식 자체를 경고하는 결말
- aftermath는 판결문 요약이 아니라 아파트 공동체의 뒷맛과 금 간 신뢰를 보여야 한다

system_message 원칙:
- 플레이어를 밀어주는 중립 문구만 허용
- "누가 먼저였다"를 직접 알려주지 마라
- 증거가 열렸다, 질문이 통했다, 반복 심문을 피하라는 식의 비스포일러 시스템 문장으로 유지하라

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 후속 보강 포인트
- neighbor-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- neighbor-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
