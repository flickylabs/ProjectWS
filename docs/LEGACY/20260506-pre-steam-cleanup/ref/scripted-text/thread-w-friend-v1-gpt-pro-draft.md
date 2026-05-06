# Thread W Friend v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 friend 사건 `삭제되지 않은 음성메모`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 완성 프롬프트**다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-friend-v1-01`
- working slug: `friend-v1-01`
- 기준 파일:
  - `src/data/cases/generated/friend-v1-01.json`
  - `docs/ref/리뉴얼참고/friend-v1-01-v3-game-loop-data.json`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 friend-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-friend-v1-01"
working_slug: "friend-v1-01"
title: "삭제되지 않은 음성메모"
category: "friend"
summary: "1,200만 원 대여/증여 공방, 차용 사유 은폐, 선물 캡처 편집, 비공개 병원 음성메모 유출, 8인 친구모임 여론전이 한 사건으로 겹친 친구 사건."
headline_hook: "20년 친구에게 시술 예약금이라며 1,200만 원을 빌려줬다. 몇 달 뒤 돌아온 건 상환이 아니라 \"그 돈은 네가 그냥 준 선물\"이라는 캡처였다. 그런데 상대는 오히려, 빌려준 쪽이 자기의 비공개 병원 음성메모를 친구들 사이에 흘려 사회적으로 매장하려 했다고 맞선다."
emotional_bait: "20년 친구에게 시술 예약금이라며 1,200만 원을 빌려줬다. 몇 달 뒤 돌아온 건 상환이 아니라 \"그 돈은 네가 그냥 준 선물\"이라는 캡처였다. 그런데 상대는 오히려, 빌려준 쪽이 자기의 비공개 병원 음성메모를 친구들 사이에 흘려 사회적으로 매장하려 했다고 맞선다."
anchor_truth: "김하린은 친구라는 이유로 차용증도 없이 큰돈을 빌려준 뒤, 사기당했다는 확신이 들자 예서가 털어놓은 비공개 시술 음성메모를 모임 운영진에게 보내 압박했다. 차예서는 \"시술 예약금\" 명목으로 돈을 빌렸지만 실제 사용처 대부분을 숨겼고, 갚지 못하자 A가 돈을 준 것처럼 보이게 캡처를 편집해 친구들 여론을 선점했다."
resolution_dilemma: "먼저 돈을 속이고 증거까지 편집한 쪽을 더 중하게 볼지, 아니면 가까운 친구만 알 수 있는 의료 비밀을 공동 친구모임에 흘려 사회적 관계망 자체를 무너뜨린 쪽을 더 중하게 볼지 갈린다. 하나는 계산된 기만이고, 다른 하나는 돌이키기 어려운 신뢰 배신이다."
context:
  type: "friendship_breach"
  description: "초반에는 김하린이 돈 문제를 우정 파탄으로 키우고 친구의 비밀까지 흘린 사람처럼 보일 수 있다. 그러나 원본 메신저 DB와 편집 히스토리, 사용처 세부 거래내역이 열리면 차예서가 먼저 선물 캡처를 조작해 여론을 선점했고 차용 사유도 상당 부분 거짓이었다는 점이 드러난다."
  emotional_pressure: 9
  trigger_amplifier: "late에서는 운영진 1대1 대화와 8인 친구모임 운영 패널 감사로그까지 붙으며 B의 편집 선점과 A의 비공개 음성메모 유출이 같은 밤 공동 친구관계를 전장으로 바꿨다는 구조가 선명해진다."
party_a:
  id: "a"
  name: "김하린"
  age: 33
  occupation: "프리랜서 번역가"
  archetype: "confrontational"
  speech_style: "상대의 책임을 먼저 세게 지적하고, 자기 설명은 그 반격 속에 끼워 넣는다."
  to_partner: "차예서 씨"
  to_judge: "제 친구"
  angry: "차예서 씨"
  tells:
    - "자신의 설명보다 상대 비난을 먼저 꺼낸다."
    - "질문을 받으면 다른 잘못을 역으로 들이민다."
    - "상대의 행위를 실제보다 더 의도적이었던 것처럼 키운다."
party_b:
  id: "b"
  name: "차예서"
  age: 33
  occupation: "네일숍 운영"
  archetype: "cold_logic"
  speech_style: "질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다."
  to_partner: "김하린 씨"
  to_judge: "제 친구"
  angry: "김하린 씨"
  tells:
    - "질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다."
    - "개인 책임을 조직 사정이나 구조 문제로 재배치한다."
    - "결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다."
disputes:
  - id: "d-1"
    name: "1,200만 원은 대여금인가, 우정 명목의 증여인가"
    quadrant: "both_know"
    runtime_truth: "1,200만 원은 대여금인가, 우정 명목의 증여인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "차용증이 없고 친구 사이였다는 점 때문에 초반에는 증여처럼 흔들릴 수 있지만, 송금 맥락과 차용 요청 대화가 붙으면 대여금 축이 살아나야 한다."
  - id: "d-2"
    name: "돈의 실제 사용처는 시술 준비였는가, 다른 급한 구멍 메우기였는가"
    quadrant: "a_only"
    runtime_truth: "돈의 실제 사용처는 시술 준비였는가, 다른 급한 구멍 메우기였는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 시술 예약금 명목이 표면을 지탱하지만, e-4와 e-5가 붙으면 실제 사용처가 다른 급한 구멍 메우기였다는 반전이 강해져야 한다."
  - id: "d-3"
    name: "비공개 병원 음성메모 유출은 실수인가, 의도된 평판 공격인가"
    quadrant: "b_only"
    runtime_truth: "비공개 병원 음성메모 유출은 실수인가, 의도된 평판 공격인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 A가 선을 넘은 사람처럼 보여야 하지만, late로 갈수록 분노 속 실수인지 계산된 압박인지가 더 날카롭게 갈라져야 한다."
  - id: "d-4"
    name: "공유 친구모임을 먼저 전장으로 만든 쪽은 누구인가"
    quadrant: "shared_misconception"
    runtime_truth: "공유 친구모임을 먼저 전장으로 만든 쪽은 누구인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 B의 편집 캡처 선점과 A의 음성메모 유출이 맞물리며 둘 다 친구관계를 무기로 썼다는 shared damage 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: ["d-1", "d-2"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "A에서 B로 보낸 계좌이체 내역"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "대여금/증여 공방이 시작되는 출발점"
  - id: "e-2"
    type: "chat"
    surface_name: "B의 차용 요청 대화"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "차용 사유와 시술 예약금 명목이 표면적으로 제시되는 시작점"
  - id: "e-3"
    type: "cctv"
    surface_name: "운영진에게 전달된 선물 캡처와 A 강퇴 공지"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "A가 먼저 사회적 전장을 키운 사람처럼 보이게 만드는 early 축"
  - id: "e-4"
    type: "chat"
    surface_name: "원본 메신저 DB 및 편집 히스토리"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "b"
    writing_role: "B가 선물 캡처를 편집해 여론을 선점했다는 mid 뒤집기 핵심 증거"
  - id: "e-5"
    type: "log"
    surface_name: "사용처 세부 거래내역"
    required_lie_state: "S2"
    requires: ["e-1", "e-2"]
    subject_party: "a"
    writing_role: "B의 차용 사유가 시술 준비가 아니었다는 mid 핵심 증거"
  - id: "e-6"
    type: "chat"
    surface_name: "운영진 1대1 대화"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "b"
    writing_role: "친구모임 운영진과의 직접 접촉이 의도된 압박이었는지 드러나는 late 전환축"
  - id: "e-7"
    type: "log"
    surface_name: "8인 친구모임 운영 패널 감사로그"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "a"
    writing_role: "두 사람 모두 모임 관계망을 무기로 썼다는 shared damage 결말 축"
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
    name: "현장 동행인"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "브랜드 담당자"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "공적 기록 검토자"
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
channel_inventory_source: "friend-v1-01 runtime JSON + friend-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/friend-v1-01.json`
- `docs/ref/리뉴얼참고/friend-v1-01-v3-game-loop-data.json`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- friend-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- friend-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 friend 카테고리의 "삭제되지 않은 음성메모"다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 1,200만 원 대여금/증여 공방
- 시술 예약금 명목과 실제 사용처 불일치
- 선물 캡처 편집
- 비공개 병원 음성메모 유출
- 8인 친구모임 운영진과 패널을 둘러싼 여론전

초반 인상:
- 김하린이 돈 문제를 우정 파탄으로 키우고 친구 비밀까지 흘린 사람처럼 보여야 한다.

중반 뒤집기:
- 차예서가 먼저 선물 캡처를 편집해 여론을 선점했고, 차용 사유도 상당 부분 거짓이었다는 사실이 열려야 한다.

후반 정리:
- 김하린 역시 비공개 병원 음성메모를 운영진에게 보내 의도된 압박을 가한 쪽으로 드러나야 한다.
- 차예서 역시 돈의 사용처를 숨기고 편집 캡처로 친구모임 여론을 조작한 쪽으로 드러나야 한다.
- 결론은 "누가 더 억울한가"가 아니라 "누가 먼저 돈을 속였고, 누가 관계망을 무기로 썼는가"가 되어야 한다.

화자 정보:
- A 김하린: 33세, 프리랜서 번역가, confrontational
  - 상대 책임을 먼저 세게 지적하고, 자기 설명은 그 반격 속에 끼워 넣는다.
  - 자신의 설명보다 상대 비난을 먼저 꺼낸다.
  - 질문을 받으면 다른 잘못을 역으로 들이민다.
  - 상대의 행위를 실제보다 더 의도적이었던 것처럼 키운다.
  - 상대 직접 호칭은 "차예서 씨", 재판관에게 상대를 말할 때는 "제 친구"
- B 차예서: 33세, 네일숍 운영, cold_logic
  - 질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.
  - 질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.
  - 개인 책임을 조직 사정이나 구조 문제로 재배치한다.
  - 결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.
  - 상대 직접 호칭은 "김하린 씨", 재판관에게 상대를 말할 때는 "제 친구"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 실명 대신 반드시 "제 친구"를 사용한다
- 상대에게 직접 말할 때만 "차예서 씨" / "김하린 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 1,200만 원, 선물 캡처 편집, 메신저 DB, 운영진 1대1 대화, 병원 음성메모, 감사로그 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 돈", "그 캡처", "그 메모", "그 모임 쪽", "그 대화"처럼 감춘 표현을 주로 쓴다
- mid부터는 차용 명목, 일부 사용처, 캡처 편집 의심, 운영진 전달 정황 정도가 열린다
- late에서는 1,200만 원, 사용처 세부 거래내역, 원본 메신저 DB 및 편집 히스토리, 운영진 1대1 대화, 8인 친구모임 운영 패널 감사로그까지 구체화된다
- 금전 사건 S5는 숫자 1개 이상을 넣는다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 차예서의 편집 캡처와 실제 사용처 은폐를 전부 자백시키는 것
- 초반부터 김하린의 음성메모 전달과 운영진 압박 의도를 전부 자백시키는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "삭제되지 않은 음성메모"라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 김하린만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

김하린 쪽 추가 규칙:
- 초반에는 "내가 속았다"보다 "상대가 먼저 판을 뒤틀었다"는 비난이 더 먼저 튀어나와야 한다
- confrontational답게 공격을 먼저 하고, 자기 설명은 그 공격 사이에 끼워 넣어라
- 돈 얘기와 비공개 메모 유출을 모두 방어하되, 자기 선 넘음은 쉽게 인정하지 마라
- S0-S1에서는 음성메모를 운영진에게 보낸 의도와 강퇴 공지 이후의 압박 결을 전부 열지 마라
- S3 이후에는 분노 때문에 선을 넘었고 관계망을 압박에 썼다는 기미가 보여야 한다

이 사건에서 김하린의 실패 패턴:
- 너무 피해자 호소형으로만 쓰면 confrontational이 죽는다
- 너무 빨리 비공개 메모 유출 의도를 다 자백하면 early tension이 죽는다
- 차예서처럼 계산형, 기록형 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 차예서만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

차예서 쪽 추가 규칙:
- 초반에는 친구 사이 도움이나 선물 오해처럼 범위를 흐리며 돈 문제를 줄여라
- 자기 행동은 "정리 방식", "오해 소지", "맥락이 잘린 캡처" 같은 표현으로 축소하라
- cold_logic답게 기록, 순서, 사용 시점, 캡처 흐름을 먼저 말하라
- 감정이 올라가도 갑자기 confrontational처럼 맞공격 일변도로 무너지지 마라
- S0-S1에서는 선물 캡처 편집과 실제 사용처, 친구모임 선점 의도를 전부 열지 마라
- S2 이후에는 차용 사유와 편집 흔적이 점점 배어나오게 하라

이 사건에서 차예서의 실패 패턴:
- 너무 빨리 편집 캡처와 사용처 은폐를 다 자백하면 mid 뒤집기가 죽는다
- 너무 차갑기만 하면 20년 친구 사건의 배신감이 안 산다
- 김하린처럼 비난부터 던지는 리듬으로 쓰면 실패다

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
- e-1 A에서 B로 보낸 계좌이체 내역
- e-2 B의 차용 요청 대화
- e-3 운영진에게 전달된 선물 캡처와 A 강퇴 공지
- e-4 원본 메신저 DB 및 편집 히스토리
- e-5 사용처 세부 거래내역
- e-6 운영진 1대1 대화
- e-7 8인 친구모임 운영 패널 감사로그

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
- e-1: 대여금/증여 공방이 시작되는 출발점
- e-2: 시술 예약금 명목이 표면적으로 지탱되는 출발점
- e-3: 김하린이 먼저 사회적 전장을 키운 사람처럼 보이는 early 축
- e-4: 차예서의 선물 캡처 편집이 드러나는 mid 뒤집기 핵심
- e-5: 차용 사유와 실제 사용처가 다르다는 mid 핵심
- e-6: 운영진과의 직접 접촉이 의도된 압박이었는지 드러나는 late 전환축
- e-7: 두 사람 모두 친구모임 관계망을 무기로 썼다는 shared damage 결말 축

반드시 지킬 것:
- evidence_present는 자료를 보고 반응하는 문장이어야 한다
- 자료 이름이나 핵심 요소를 그대로 낭독하지 마라
- e-1/e-2에서는 아직 친구 사이 돈 문제처럼 흔들릴 수 있어야 한다
- e-3에서는 A가 먼저 사회적으로 선 넘은 사람처럼 보이게 하되, 아직 B의 편집 선점은 다 열지 마라
- e-4/e-5에서는 B가 주도적으로 판을 뒤틀었다는 mid 반전이 강하게 살아야 한다
- e-6/e-7에서는 A의 압박과 B의 여론 선점이 함께 무기로 작동했다는 late 결말이 느껴져야 한다
- dossier는 late 갈수록 "누가 먼저 돈의 의미를 바꿨는가", "누가 사용처를 숨겼는가", "누가 모임을 전장으로 만들었는가"를 더 날카롭게 묻게 설계하라

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
- tp-1 현장 동행인: 실제 돈이 오가던 때와 요청 분위기를 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 브랜드 담당자: 사용처와 일정 사정을 들은 사람처럼 말하되, B 편향이 조금 보여야 한다
- tp-3 공적 기록 검토자: 로그와 패널 기록만 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 분노가 있었어도 비공개 의료 비밀과 친구관계를 압박에 쓴 무게가 남는 결말
- b_primary_fault: 차용 사유 은폐와 선물 캡처 편집으로 우정을 계산된 기만으로 바꿨다는 결말
- shared_fault: 두 사람이 20년 친구와 공동 모임을 동시에 무기로 썼다는 씁쓸한 결말
- protective_resolution: 의료 비밀과 공동 친구관계 보호가 우선이라 관계 설명을 최소화하는 결말
- procedural_caution: 캡처 편집, 기록 유출, 운영진 압박 같은 방식 자체를 경고하는 결말
- aftermath는 판결문 요약이 아니라 관계의 뒷맛이 보여야 한다

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
- friend-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- friend-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
