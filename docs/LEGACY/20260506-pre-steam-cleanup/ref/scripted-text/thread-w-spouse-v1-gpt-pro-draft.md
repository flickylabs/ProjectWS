# Thread W Spouse v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 spouse 사건 `공유 캘린더의 월요일`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 완성 프롬프트**다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-spouse-v1-01`
- working slug: `spouse-v1-01`
- 기준 파일:
  - `src/data/cases/generated/spouse-v1-01.json`
  - `docs/ref/리뉴얼참고/spouse-v1-01-v3-game-loop-data.json`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 spouse-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-spouse-v1-01"
working_slug: "spouse-v1-01"
title: "공유 캘린더의 월요일"
category: "spouse"
summary: "공동 비상금 4,800만 원 분산 이체, 배우자 명의 공동인증서 접근, 가족용 태블릿 동기화, 아이 전학과 별거 준비가 한 월요일 안에서 충돌한 부부 사건."
headline_hook: "가정 비상금 4,800만 원이 장모 계좌로 사라졌다. 남편은 아내가 아이를 데리고 나갈 준비를 했다고 주장한다. 그런데 아내는 먼저 자기 휴대폰이 밤마다 남편 계정으로 백업됐고, 자기 명의 공동인증서로 추가 담보대출까지 조회됐다고 맞선다."
emotional_bait: "가정 비상금 4,800만 원이 장모 계좌로 사라졌다. 남편은 아내가 아이를 데리고 나갈 준비를 했다고 주장한다. 그런데 아내는 먼저 자기 휴대폰이 밤마다 남편 계정으로 백업됐고, 자기 명의 공동인증서로 추가 담보대출까지 조회됐다고 맞선다."
anchor_truth: "강정민은 아내 명의 공동인증서로 부부 합산 추가 담보대출을 준비했고, 가족용 태블릿을 이용해 아내 휴대폰 백업을 몰래 붙여 놓았다. 윤서아는 공동 비상금을 친정 계좌로 분산 이체하고, 딸 전학이 가능한 투룸 가계약과 별거 동선을 미리 짜 두었다."
resolution_dilemma: "먼저 사생활과 금융 동의를 침범한 쪽을 더 무겁게 볼지, 아니면 실제로 공동재산을 외부 계좌로 빼돌리고 아이 문제를 단독 선점한 쪽을 더 무겁게 볼지 갈린다. 절차 위반의 시작점은 남편 쪽이 더 선명하지만, 실행된 생활 파괴의 크기는 아내 쪽이 더 직접적이다."
context:
  type: "family_decision"
  description: "초반에는 아내가 공동재산과 아이를 먼저 빼돌리려 한 사람처럼 보이지만, 중반부터 공동인증서 접속과 기기 백업, 추가 담보대출 준비가 열리며 남편의 선침범이 드러난다."
  emotional_pressure: 9
  trigger_amplifier: "late에서는 장모 계좌 분산 이체, 은행앱 푸시알림 삭제, 추가 담보대출 상담서 초안, 공유 가족 캘린더 복원본이 겹치며 양쪽 모두 월요일 안에 먼저 움직였다는 구조가 선명해진다."
party_a:
  id: "a"
  name: "강정민"
  age: 41
  occupation: "세무사 사무실 공동운영자"
  archetype: "cold_logic"
  speech_style: "질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다."
  to_partner: "윤서아"
  to_judge: "제 배우자"
  angry: "윤서아 씨"
  tells:
    - "질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다."
    - "개인 책임을 조직 사정이나 구조 문제로 재배치한다."
    - "결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다."
party_b:
  id: "b"
  name: "윤서아"
  age: 39
  occupation: "초등 학원 상담실장"
  archetype: "victim_cosplay"
  speech_style: "자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다."
  to_partner: "강정민"
  to_judge: "제 배우자"
  angry: "강정민 씨"
  tells:
    - "스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다."
    - "선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다."
    - "작은 인정으로 큰 책임을 비껴 가려 한다."
disputes:
  - id: "d-1"
    name: "공동 비상금 4,800만 원 이체의 성격은 보호인가, 선점인가"
    quadrant: "both_know"
    runtime_truth: "표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "분산 이체 명분은 방어처럼 들리지만, 장모 계좌 회수 보류와 별거 동선 선점이 겹치면 단순 보호로 남지 않는다."
  - id: "d-2"
    name: "남편의 공동인증서 접근은 단순 조회인가, 실행 직전 준비인가"
    quadrant: "a_only"
    runtime_truth: "표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 '조회'로 줄어들지만, e-3과 e-5가 붙으면 실행 직전 준비였다는 기색이 살아나야 한다."
  - id: "d-3"
    name: "휴대폰과 클라우드 감시는 불안의 표현인가, 이혼 대비 사찰인가"
    quadrant: "b_only"
    runtime_truth: "표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "가족용 태블릿과 자동 백업이 열리면 단순 불안 표현이 아니라 계획성 있는 사찰 결로 이동해야 한다."
  - id: "d-4"
    name: "아이 전학과 별거 준비를 누가 먼저 시작했는가"
    quadrant: "shared_misconception"
    runtime_truth: "표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 둘 다 같은 월요일 안에 동선을 먼저 짜고 있었다는 shared fault 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: ["d-1", "d-2"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "가정 비상금 계좌 거래요약"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "B가 먼저 수세에 몰리는 출발점"
  - id: "e-2"
    type: "device"
    surface_name: "가족용 태블릿 기기 동기화 기록"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "A의 사찰 축이 구체화되는 출발점"
  - id: "e-3"
    type: "log"
    surface_name: "공동인증서 접속 로그"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "A가 '조회만 했다'고 줄이던 범위가 흔들리기 시작하는 축"
  - id: "e-4"
    type: "chat"
    surface_name: "부동산 중개 채팅"
    required_lie_state: "S1"
    requires: ["e-1"]
    subject_party: "b"
    writing_role: "B의 별거·전학 선점이 드러나는 mid 증거"
  - id: "e-5"
    type: "log"
    surface_name: "추가 담보대출 상담서 초안"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "a"
    writing_role: "A의 행위가 조회를 넘어 실행 직전 준비였다는 mid 증거"
  - id: "e-6"
    type: "log"
    surface_name: "은행앱 푸시알림 삭제 로그"
    required_lie_state: "S2"
    requires: ["e-1"]
    subject_party: "b"
    writing_role: "B가 단순 보호가 아니라 추적 회피 정리까지 했다는 late 전환축"
  - id: "e-7"
    type: "device"
    surface_name: "공유 가족 캘린더 복원본"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "a"
    writing_role: "같은 월요일 안에 양쪽 일정 선점이 겹친다는 late shared fault 축"
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
    name: "가족 상담 동행인"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "병원 접수 담당자"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "문서 검토 기관 담당자"
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
channel_inventory_source: "spouse-v1-01 runtime JSON + spouse-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/spouse-v1-01.json`
- `docs/ref/리뉴얼참고/spouse-v1-01-v3-game-loop-data.json`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- spouse-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- spouse-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 spouse 카테고리의 "공유 캘린더의 월요일"이다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 공동 비상금 4,800만 원 분산 이체
- 가족용 태블릿을 통한 휴대폰/클라우드 동기화와 감시
- 아내 명의 공동인증서 접근과 추가 담보대출 준비
- 아이 전학, 투룸 가계약, 별거 동선 선점

초반 인상:
- 윤서아가 공동재산과 아이를 먼저 빼돌리려 한 사람처럼 보여야 한다.

중반 뒤집기:
- 강정민이 먼저 공동인증서, 기기 백업, 추가 담보대출 준비로 선을 넘었다는 사실이 열려야 한다.

후반 정리:
- 윤서아 역시 단순 방어가 아니라 장모 계좌 분산 이체, 푸시알림 삭제, 전학 가능한 투룸 가계약과 별거 동선을 미리 짠 쪽으로 드러나야 한다.
- 결론은 "누가 더 순수한 피해자인가"가 아니라 "누가 먼저 사생활과 금융 경계를 침범했고, 누가 더 직접적으로 생활 파괴를 실행했는가"가 되어야 한다.

화자 정보:
- A 강정민: 41세, 세무사 사무실 공동운영자, cold_logic
  - 질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.
  - 질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.
  - 개인 책임을 조직 사정이나 구조 문제로 재배치한다.
  - 결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.
  - 상대 직접 호칭은 "윤서아", 감정이 올라가면 "윤서아 씨", 재판관에게 상대를 말할 때는 "제 배우자"
- B 윤서아: 39세, 초등 학원 상담실장, victim_cosplay
  - 자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다.
  - 스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다.
  - 선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다.
  - 작은 인정으로 큰 책임을 비껴 가려 한다.
  - 상대 직접 호칭은 "강정민", 감정이 올라가면 "강정민 씨", 재판관에게 상대를 말할 때는 "제 배우자"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 실명 대신 반드시 "제 배우자"를 사용한다
- 상대에게 직접 말할 때만 "윤서아" / "강정민" / 감정형 호칭을 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 4,800만 원, 장모 계좌, 공동인증서, 추가 담보대출, 투룸 가계약, 전학, 푸시알림 삭제, 공유 가족 캘린더 복원본 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 돈", "그 기기", "그 준비", "그 일정", "그 집 쪽 얘기"처럼 감춘 표현을 주로 쓴다
- mid부터는 분산 이체, 동기화, 조회, 상담서 초안, 부동산 문의 정도가 열린다
- late에서는 장모 계좌, 공동인증서, 추가 담보대출, 푸시알림 삭제, 전학과 별거 동선, 공유 가족 캘린더 복원본까지 구체화된다
- 금전 사건 S5는 숫자 1개 이상을 넣는다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 강정민의 공동인증서 접근과 추가 담보대출 준비를 전부 자백시키는 것
- 초반부터 윤서아의 장모 계좌 분산 이체, 푸시알림 삭제, 투룸 가계약, 전학 동선을 전부 자백시키는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "공유 캘린더의 월요일"이라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 강정민만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

강정민 쪽 추가 규칙:
- 초반에는 윤서아의 자금 이동과 아이 선점이 더 큰 문제라는 방향으로 말해야 한다
- 자기 행동은 "조회", "확인", "정리", "실행 직전은 아니었다"처럼 범위를 잘라 축소하라
- cold_logic답게 숫자, 순서, 기록, 동의 여부를 먼저 꺼내라
- 감정이 올라가도 윤서아처럼 피해자 호소형 리듬으로 미끄러지지 마라
- S0-S1에서는 가족용 태블릿 동기화, 휴대폰 백업, 추가 담보대출 상담서 초안의 전모를 다 열지 마라
- S3 이후에는 "조회만 했다"는 말이 점점 버거워지고, 말 끝을 평평하게 누르면서도 범주를 넓혀 책임을 흐리는 습관이 살아 있어야 한다

이 사건에서 강정민의 실패 패턴:
- 너무 빨리 사찰과 대출 준비를 다 자백하면 mid 뒤집기가 죽는다
- 너무 냉정한 숫자말만 남기면 spouse 사건의 배신감이 안 산다
- 윤서아 같은 피해자 프레임 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 윤서아만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

윤서아 쪽 추가 규칙:
- 초반에는 아이와 생활을 지키려 한 사람처럼 들려야 한다
- 강정민이 먼저 뭘 건드렸고, 자신은 그 압박에 밀렸다는 프레임을 먼저 세워라
- victim_cosplay답게 불안, 생활 붕괴, 선택권 부족을 먼저 꺼내라
- 작은 인정은 하되 큰 책임은 구조와 압박 쪽으로 밀어내라
- S0-S1에서는 장모 계좌 분산 이체, 투룸 가계약, 푸시알림 삭제, 전학 동선 선점의 전모를 다 열지 마라
- S4-S5에서는 "지키려 했다"는 명분과 "먼저 챙기고 있었다"는 실행이 동시에 보이게 하라

이 사건에서 윤서아의 실패 패턴:
- 너무 빨리 장모 계좌, 부동산 문의, 전학 준비를 다 자백하면 early bait가 죽는다
- 너무 끝까지 감정 호소만 하면 late shared fault가 안 선다
- 강정민 같은 계산형, 기록형 문장으로 쓰면 실패다

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
- e-1 가정 비상금 계좌 거래요약
- e-2 가족용 태블릿 기기 동기화 기록
- e-3 공동인증서 접속 로그
- e-4 부동산 중개 채팅
- e-5 추가 담보대출 상담서 초안
- e-6 은행앱 푸시알림 삭제 로그
- e-7 공유 가족 캘린더 복원본

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
- e-1: 윤서아의 분산 이체가 먼저 불리하게 보이는 시작점
- e-2: 강정민의 기기 동기화와 감시 축이 구체화되는 시작점
- e-3: 강정민이 "조회만 했다"고 줄이던 말이 흔들리기 시작하는 축
- e-4: 윤서아의 별거·전학 선점이 보이기 시작하는 mid 축
- e-5: 강정민이 조회를 넘어 실행 직전 준비까지 갔다는 mid 축
- e-6: 윤서아가 단순 방어가 아니라 추적 회피 정리까지 했다는 late 축
- e-7: 같은 월요일 안에 양쪽 일정 선점이 겹친다는 shared fault late 축

반드시 지킬 것:
- evidence_present는 자료를 보고 반응하는 문장이어야 한다
- 자료 이름이나 핵심 요소를 그대로 낭독하지 마라
- e-1/e-4에서는 윤서아가 먼저 수세에 몰리되, 아직 완전한 약탈자로 단정하지 마라
- e-2/e-3/e-5에서는 강정민의 "기록 정리" 프레임이 점점 깨져야 한다
- e-6/e-7에서는 양쪽 모두 피해자 프레임이 무너지기 시작해야 한다
- dossier는 late 갈수록 "누가 먼저 준비했는가", "누가 어디까지 실행했는가", "누가 지금 더 피해자처럼 말하는가"를 더 날카롭게 묻게 설계하라

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
- tp-1 가족 상담 동행인: 관계 악화와 금전 마찰의 순서를 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 병원 접수 담당자: 접수와 동행, 현장에서 본 사실만 말하는 실무자처럼 쓰되, B 편향이 조금 보여야 한다
- tp-3 문서 검토 기관 담당자: 문서 제출과 시점만 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 단정과 연결이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 선침범과 사찰, 금융 준비를 먼저 시작한 쪽의 무게가 남는 결말
- b_primary_fault: 공동재산 외부 이동과 아이 선점 실행이 더 직접적이었다는 결말
- shared_fault: 둘 다 같은 월요일 안에 먼저 움직이고 서로를 감시했다는 씁쓸한 결말
- protective_resolution: 아이, 기기, 금융 정보 보호가 우선이라 관계 설명을 최소화하는 결말
- procedural_caution: 동의와 절차를 넘은 방식 자체를 경고하는 결말
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
- spouse-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- spouse-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
