# Thread W Tenant v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 tenant 사건 `비밀번호가 바뀐 오후`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 완성본**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-tenant-v1-01`
- working slug: `tenant-v1-01`
- 기준 파일:
  - `src/data/cases/generated/tenant-v1-01.json`
  - `docs/ref/리뉴얼참고/tenant-v1-01-v3-game-loop-data.json`
  - `docs/ref/리뉴얼참고/thread-s-v1-case-design-tenant_landlord.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 tenant-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-tenant-v1-01"
working_slug: "tenant-v1-01"
title: "비밀번호가 바뀐 오후"
category: "tenant_landlord"
summary: "현관 비밀번호 변경, 점유 중 무단 출입, 누수·곰팡이 구조 하자 은폐, 2천만 원 보증금 전액 반환 공방, 다음 세입자 보여주기 정리, 제습기·문열림 센서 로그가 맞물리는 임대차 사건."
headline_hook: "퇴근하고 돌아온 세입자는 현관 비밀번호가 바뀐 걸 보고 문 앞에서 40분을 서 있었다. 집 안에서는 젖은 벽지가 이미 뜯겨 있었고, 임대인은 \"긴급 누수 보수\"였다고 주장한다. 세입자는 보증금 2천만 원 전액 반환을 요구한다. 임대인은 오히려 세입자가 곰팡이를 일부러 키운 뒤, 원상복구비와 공실 손해를 피하려 사진과 습도 기록을 조작했다고 맞선다."
emotional_bait: "퇴근하고 돌아온 세입자는 현관 비밀번호가 바뀐 걸 보고 문 앞에서 40분을 서 있었다. 집 안에서는 젖은 벽지가 이미 뜯겨 있었고, 임대인은 \"긴급 누수 보수\"였다고 주장한다. 세입자는 보증금 2천만 원 전액 반환을 요구한다. 임대인은 오히려 세입자가 곰팡이를 일부러 키운 뒤, 원상복구비와 공실 손해를 피하려 사진과 습도 기록을 조작했다고 맞선다."
anchor_truth: "이주연은 갱신 직전 보증금을 지키기 위해 곰팡이 진행 상황을 과장한 촬영 구도와 습도계 배치를 의도적으로 만들었고, 임대인 통화는 일부만 캡처해 준비했다. 남태호는 다음 세입자 계약을 살리기 위해 점유 중인 집 비밀번호를 관리업체로 바꾸고, 입주자 부재 중 벽지와 몰딩을 먼저 뜯어 하자 범위를 통제하려 했다."
resolution_dilemma: "먼저 구조적 하자를 숨기고 점유권을 침범한 임대인을 더 무겁게 볼지, 아니면 실제 하자를 분쟁 레버리지로 키우고 기록을 유리하게 만든 세입자를 더 무겁게 볼지 갈린다. 하나는 권한 남용이고, 다른 하나는 피해를 협상 자산으로 키운 계산이다."
context:
  type: "lease_conflict"
  description: "퇴근하고 돌아온 세입자는 현관 비밀번호가 바뀐 걸 보고 문 앞에서 40분을 서 있었다. 집 안에서는 젖은 벽지가 이미 뜯겨 있었고, 임대인은 \"긴급 누수 보수\"였다고 주장한다. 세입자는 보증금 2천만 원 전액 반환을 요구한다. 임대인은 오히려 세입자가 곰팡이를 일부러 키운 뒤, 원상복구비와 공실 손해를 피하려 사진과 습도 기록을 조작했다고 맞선다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 임대인이 비밀번호까지 바꿔 무단 출입했으므로 남태호의 잘못이 압도적으로 커 보인다. 관리업체 하자 접수 이력과 복도 CCTV 및 공동현관 출입기록이 열리면 실제로 같은 하자를 이전 세입자 때부터 알고 있었고, 점유 중인 집에 들어가 벽지를 뜯은 사실까지 확인돼 그 인상이 강화된다. 하지만 부동산 중개사 3자 대화와 스마트제습기·문열림 센서 통합 로그가 이어지면 이주연 역시 곰팡이가 가장 심하게 보이도록 조건을 유지하고 그 장면을 보증금 분쟁용으로 축적한 쪽으로 드러난다."
party_a:
  id: "a"
  name: "이주연"
  age: 29
  occupation: "콘텐츠 마케터"
  archetype: "victim_cosplay"
  speech_style: "자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다."
  to_partner: "남태호 씨"
  to_judge: "집주인"
  angry: "남태호 씨"
  tells:
    - "스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다."
    - "선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다."
    - "작은 인정으로 큰 책임을 비껴 가려 한다."
party_b:
  id: "b"
  name: "남태호"
  age: 52
  occupation: "다가구주택 임대인"
  archetype: "cold_logic"
  speech_style: "질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다."
  to_partner: "이주연 씨"
  to_judge: "임대차 당사자"
  angry: "이주연 씨"
  tells:
    - "질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다."
    - "개인 책임을 조직 사정이나 구조 문제로 재배치한다."
    - "결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다."
disputes:
  - id: "d-1"
    name: "누수와 곰팡이는 임대인이 미리 알고 숨긴 구조적 하자인가, 세입자 생활 습관으로 악화된 관리 문제인가"
    quadrant: "both_know"
    runtime_truth: "누수와 곰팡이는 임대인이 미리 알고 숨긴 구조적 하자인가, 세입자 생활 습관으로 악화된 관리 문제인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 구조 하자 은폐와 점유권 침범이 크게 보여야 하고, B가 더 직접적으로 선을 넘은 인상이 우세해야 한다."
  - id: "d-2"
    name: "비밀번호 변경 후 출입은 긴급 보수였는가, 보증금 방어를 위한 무단 출입이었는가"
    quadrant: "a_only"
    runtime_truth: "비밀번호 변경 후 출입은 긴급 보수였는가, 보증금 방어를 위한 무단 출입이었는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "e-5와 e-6가 붙으면 긴급 보수가 아니라 다음 세입자 일정과 보증금 방어를 위한 선제 정리였다는 결이 살아나야 한다."
  - id: "d-3"
    name: "세입자의 하자 기록은 정당한 증거 수집인가, 보증금 분쟁을 위한 과장과 조작인가"
    quadrant: "b_only"
    runtime_truth: "세입자의 하자 기록은 정당한 증거 수집인가, 보증금 분쟁을 위한 과장과 조작인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 억울한 기록 확보처럼 남아 있어도, late에는 제습기 중단과 촬영 구도 조정이 분명히 보여야 한다."
  - id: "d-4"
    name: "누구의 선택이 이 집을 살 수 있는 집에서 서로 못 믿는 분쟁 현장으로 바꿨는가"
    quadrant: "shared_misconception"
    runtime_truth: "누구의 선택이 이 집을 살 수 있는 집에서 서로 못 믿는 분쟁 현장으로 바꿨는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 '하자를 숨긴 임대인'과 '하자를 키워 협상력으로 만든 세입자'가 함께 서는 shared fault 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: []
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "비밀번호 변경 항의 및 임대인 답변"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "B의 무단 출입과 점유권 침범이 먼저 드러나는 출발점"
  - id: "e-2"
    type: "cctv"
    surface_name: "곰팡이 벽면 사진 묶음"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "A가 전액 반환을 주장하는 하자 피해 외형의 출발점"
  - id: "e-3"
    type: "contract"
    surface_name: "임대차계약서 특약"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "구조 하자 책임과 무단 출입 금지 기준선을 세우는 계약 축"
  - id: "e-4"
    type: "log"
    surface_name: "관리업체 하자 접수 이력"
    required_lie_state: "S2"
    requires: ["e-2"]
    subject_party: "b"
    writing_role: "B가 이전부터 같은 하자를 알고도 덮었다는 mid 핵심 증거"
  - id: "e-5"
    type: "cctv"
    surface_name: "복도 CCTV와 공동현관 출입기록"
    required_lie_state: "S2"
    requires: ["e-1"]
    subject_party: "a"
    writing_role: "B가 실제로 점유 중인 집에 들어가 벽지를 뜯었다는 mid 강증거"
  - id: "e-6"
    type: "chat"
    surface_name: "부동산 중개사 3자 대화"
    required_lie_state: "S3"
    requires: ["e-3", "e-5"]
    subject_party: "b"
    writing_role: "B의 출입이 긴급 보수보다 다음 세입자 일정과 보증금 방어 목적이었다는 late 증거"
  - id: "e-7"
    type: "log"
    surface_name: "스마트제습기 및 문열림 센서 통합 로그"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "a"
    writing_role: "A가 곰팡이가 가장 심하게 보이도록 조건을 유지했고, B의 원격 비밀번호 변경까지 한 타임라인으로 묶이는 late shared fault 축"
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
    name: "관리실 직원"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "중개 관련 실무자"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "공공 민원 담당자"
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
channel_inventory_source: "tenant-v1-01 runtime JSON + tenant-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/tenant-v1-01.json`
- `docs/ref/리뉴얼참고/tenant-v1-01-v3-game-loop-data.json`
- `docs/ref/리뉴얼참고/thread-s-v1-case-design-tenant_landlord.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- tenant-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- tenant-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 tenant_landlord 카테고리의 "비밀번호가 바뀐 오후"다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 점유 중 비밀번호 변경과 무단 출입
- 누수·곰팡이 구조 하자 은폐
- 2천만 원 보증금 전액 반환 공방
- 다음 세입자 일정과 상태 정리 시도
- 하자 사진·통화 캡처·제습기 로그의 선별 축적
- 스마트제습기·문열림 센서가 묶는 late 타임라인

초반 인상:
- 남태호가 점유권과 계약을 먼저 넘은 사람처럼 보여야 한다.

중반 뒤집기:
- 남태호가 이전부터 같은 하자를 알고 있었고, 다음 세입자 계약과 보증금 방어를 위해 무단 출입과 선작업까지 했다는 사실이 열려야 한다.

후반 정리:
- 이주연 역시 단순 기록 보존이 아니라 곰팡이가 가장 심하게 보이도록 조건을 유지하고, 그 장면을 보증금 분쟁용으로 축적한 쪽으로 드러나야 한다.
- 결론은 "누가 더 억울한가"가 아니라 "누가 하자를 숨기고 권한을 남용했으며, 누가 그 하자를 협상 자산으로 키웠는가"가 되어야 한다.

화자 정보:
- A 이주연: 29세, 콘텐츠 마케터, victim_cosplay
  - 자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다.
  - 스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다.
  - 선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다.
  - 작은 인정으로 큰 책임을 비껴 가려 한다.
  - 상대 직접 호칭은 "남태호 씨", 재판관에게 상대를 말할 때는 "집주인"
- B 남태호: 52세, 다가구주택 임대인, cold_logic
  - 질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.
  - 질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.
  - 개인 책임을 조직 사정이나 구조 문제로 재배치한다.
  - 결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.
  - 상대 직접 호칭은 "이주연 씨", 재판관에게 상대를 말할 때는 "임대차 당사자"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- judge-facing 일반 참조는 runtime callTerms를 따라 A는 "집주인", B는 "임대차 당사자"를 기본으로 쓴다
- 필요할 때만 "세입자 쪽", "임대인 쪽" 같은 역할어를 보조로 허용하고, judge-facing 실명 직호는 피한다
- 상대에게 직접 말할 때만 "남태호 씨" / "이주연 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 2천만 원, 이전 세입자 민원, 53분 체류, 이번 주말 집 보여주기, 보증금 얘기 나오기 전 정리, 제습기 중단, 창문 센서 닫힘 유지 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 비밀번호", "그 벽", "그 하자", "그 사진", "그 기록", "그 일정"처럼 감춘 표현을 주로 쓴다
- mid부터는 누수, 곰팡이, 하자 접수, 출입 기록, 벽지 선작업 정도가 열린다
- late에서는 2천만 원, 이전 세입자 민원, 다음 세입자 일정, 제습기·문열림 센서 타임라인, 원격 비밀번호 변경까지 구체화된다
- 이 사건은 monetaryDisputeIds가 비어 있지만, 보증금 전액 반환이나 공실 손해 언급이 late 문장에 보조적으로 들어갈 수 있다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 남태호의 이전 하자 인지, 다음 세입자 일정, 비밀번호 변경과 벽지 선작업 목적을 전부 자백시키는 것
- 초반부터 이주연의 제습기 중단, 창문 센서 닫힘 유지, 촬영 구도 조정 의도를 전부 자백시키는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "비밀번호가 바뀐 오후"라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 이주연만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

이주연 쪽 추가 규칙:
- 초반에는 퇴근 후 문 앞에서 막힌 사람의 억울함과 불안을 먼저 들려줘야 한다
- 자기 행동은 "살려고 기록한 것", "보증금을 지키려 한 최소한", "말로는 안 돼서 남긴 것"처럼 피해자 프레임 안에 넣어라
- victim_cosplay답게 구조 하자와 집주인 권한 남용을 먼저 꺼내라
- 작은 인정은 하되 큰 책임은 집 상태를 숨기고 먼저 들어온 집주인 쪽으로 밀어내라
- S0-S1에서는 제습기 중단, 창문 센서 닫힘 유지, 촬영 구도 조정의 전모를 다 열지 마라
- S4-S5에서는 "지키려 했다"는 명분과 "가장 심하게 보이게 만들었다"는 계산이 동시에 보이게 하라

이 사건에서 이주연의 실패 패턴:
- 너무 빨리 환경 조정과 사진 과장 의도를 다 자백하면 late 뒤집기가 죽는다
- 너무 끝까지 억울함만 있으면 shared fault가 안 선다
- 남태호 같은 계산형, 기록형 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 남태호만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

남태호 쪽 추가 규칙:
- 초반에는 긴급 보수와 손해 최소화 차원이었다는 방향으로 말해야 한다
- 자기 행동은 "급한 정리", "보수 기사 동행", "확대 방지", "다음 피해 예방"처럼 범위를 잘라 축소하라
- cold_logic답게 계약 조항, 출입 시각, 하자 범위, 수리 필요성을 먼저 꺼내라
- 감정이 올라가도 이주연처럼 피해자 호소형 리듬으로 미끄러지지 마라
- S0-S1에서는 이전 세입자 민원, 이번 주말 집 보여주기, 보증금 방어를 위한 선제 정리의 전모를 다 열지 마라
- S3 이후에는 "긴급 보수"라는 말이 점점 버거워지고, 말 끝을 평평하게 누르면서도 범주를 넓혀 책임을 흐리는 습관이 살아 있어야 한다

이 사건에서 남태호의 실패 패턴:
- 너무 빨리 구조 하자 은폐와 무단 출입 목적을 다 자백하면 mid 긴장감이 죽는다
- 너무 냉정한 계약 말만 남기면 임대차 사건의 침범감이 안 산다
- 이주연 같은 피해자 프레임 문장으로 쓰면 실패다

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
- e-1 비밀번호 변경 항의 및 임대인 답변
- e-2 곰팡이 벽면 사진 묶음
- e-3 임대차계약서 특약
- e-4 관리업체 하자 접수 이력
- e-5 복도 CCTV와 공동현관 출입기록
- e-6 부동산 중개사 3자 대화
- e-7 스마트제습기 및 문열림 센서 통합 로그

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
- e-1: B의 비밀번호 변경과 무단 출입이 먼저 드러나는 출발점
- e-2: A가 전액 반환을 요구하는 하자 피해 외형의 출발점
- e-3: 구조 하자 책임과 무단 출입 금지의 계약 기준선
- e-4: B가 이전부터 같은 하자를 알고도 덮었다는 mid 핵심 증거
- e-5: B가 점유 중인 집에 실제로 들어가 벽지를 뜯었다는 mid 강증거
- e-6: B의 출입이 다음 세입자 일정과 보증금 방어를 위한 정리였다는 late 증거
- e-7: A의 제습기·창문 제어와 B의 원격 비밀번호 변경·출입이 하나의 타임라인으로 묶이는 late shared fault 축

반드시 지킬 것:
- evidence_present는 자료를 보고 반응하는 문장이어야 한다
- 자료 이름이나 핵심 요소를 그대로 낭독하지 마라
- e-1/e-3/e-4/e-5에서는 남태호가 더 직접적 가해자로 보이되, 마지막 전까지는 A의 조작 의도를 성급히 확정하지 마라
- e-2에서는 이주연의 피해 프레임이 우세해야 하지만, 사진만으로 모든 구조를 미리 단정하지 마라
- e-6/e-7에서는 이주연의 피해자 프레임도 무너지기 시작해야 한다
- dossier는 late 갈수록 "누가 하자를 알고도 덮었는가", "누가 점유권을 먼저 넘었는가", "누가 하자를 협상 카드로 키웠는가"를 더 날카롭게 묻게 설계하라

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
- tp-1 관리실 직원: 출입 민원과 하자 접수 흐름을 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 중개 관련 실무자: 보여주기 일정과 상태 정리 압박을 들은 사람처럼 말하되, B 편향이 조금 보여야 한다
- tp-3 공공 민원 담당자: 접수 순서와 기록만 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 이주연이 실제 하자를 보증금 전액 반환의 카드로 키우고 기록을 유리하게 만든 쪽이라는 결말
- b_primary_fault: 남태호가 구조 하자를 숨기고 점유권을 침범한 채 비밀번호 변경과 무단 출입까지 한 쪽이라는 결말
- shared_fault: 한쪽은 하자를 숨기고 먼저 들어왔고, 다른 한쪽은 하자를 키워 협상 자산으로 만들었다는 씁쓸한 결말
- protective_resolution: 거주 안전, 사생활, 보증금과 공실 리스크 보호가 우선이라 갈등 서사를 최소화하는 결말
- procedural_caution: 비밀번호 변경, 무단 출입, 하자 은폐, 제습기·환기 조작 같은 방식 자체를 경고하는 결말
- aftermath는 판결문 요약이 아니라 집이 분쟁 현장으로 바뀐 뒷맛을 보여야 한다

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
- tenant-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- tenant-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
