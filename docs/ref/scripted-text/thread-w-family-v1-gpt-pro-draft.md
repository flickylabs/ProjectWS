# Thread W Family v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 family 사건 `병실 서랍의 인감도장`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 완성 프롬프트**다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-family-v1-01`
- working slug: `family-v1-01`
- 기준 파일:
  - `src/data/cases/generated/family-v1-01.json`
  - `docs/ref/리뉴얼참고/family-v1-01-v3-game-loop-data.json`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 family-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-family-v1-01"
working_slug: "family-v1-01"
title: "병실 서랍의 인감도장"
category: "family"
summary: "장례 직전 아파트 사전 증여, 병원 면회 제한, 부모 돈을 돌려 만든 부양비 외형, 가족회의 압박이 한 사건으로 겹친 형제 사건."
headline_hook: "장례가 끝나기도 전에 어머니 아파트는 이미 누나 명의로 넘어가 있었다. 남동생은 병실에서 인감도장을 빼내 사전 증여를 밀어붙였다고 주장한다. 그런데 누나는 동생이 10개월 동안 \"보낸\" 부양비 상당수를 어머니 계좌에서 먼저 빼 갔다가 되돌려 보낸 돈이었다고 맞선다."
emotional_bait: "장례가 끝나기도 전에 어머니 아파트는 이미 누나 명의로 넘어가 있었다. 남동생은 병실에서 인감도장을 빼내 사전 증여를 밀어붙였다고 주장한다. 그런데 누나는 동생이 10개월 동안 \"보낸\" 부양비 상당수를 어머니 계좌에서 먼저 빼 갔다가 되돌려 보낸 돈이었다고 맞선다."
anchor_truth: "오혜진은 6년간 어머니를 돌본 대가라는 명분으로 아파트 증여를 서둘렀고, 병원 면회 제한과 공증 일정을 자신에게 유리하게 조정했다. 오민석은 장남 노릇을 했다는 송금 기록을 만들기 위해 어머니 계좌와 카드를 돌려 썼고, 막판에는 누나의 강압만 부각되게 자료를 정리했다."
resolution_dilemma: "실제로 6년을 돌본 사람에게 더 많은 몫이 가야 한다는 직관은 강하다. 하지만 그 보상이 부모의 취약한 시점에 강행된 사전 증여라면 정당성은 약해진다. 반대로 장남은 법적 상속분을 주장하지만, 정작 자신이 만든 \"부양\" 기록 상당수가 부모 돈을 돌린 외형이라면 가족 구성원으로서의 도덕적 기반이 무너진다."
context:
  type: "family_archive"
  description: "초반에는 장녀가 병원 접근을 통제하고 아파트까지 먼저 가져간 사람처럼 보여 A가 압도적으로 불리하다. 그러나 어머니 계좌 세부 거래내역이 열리면 장남의 부양비 상당수가 실제 지원이 아니라 부모 돈을 돌려 만든 외형이었다는 점이 드러나 판이 뒤집힌다."
  emotional_pressure: 9
  trigger_amplifier: "late에서는 장녀와 공증사무소 문자, 진통제 및 지남력 기록, 병원 사회복지사 가족회의 기록까지 붙으며 장녀의 절차 선점과 장남의 기록 조작이 한 장면에서 같이 무너져야 한다."
party_a:
  id: "a"
  name: "오혜진"
  age: 45
  occupation: "반찬가게 운영"
  archetype: "victim_cosplay"
  speech_style: "자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다."
  to_partner: "오민석 씨"
  to_judge: "저희 가족"
  angry: "오민석 씨"
  tells:
    - "스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다."
    - "선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다."
    - "작은 인정으로 큰 책임을 비껴 가려 한다."
party_b:
  id: "b"
  name: "오민석"
  age: 42
  occupation: "중고차 매매팀장"
  archetype: "cold_logic"
  speech_style: "질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다."
  to_partner: "오혜진 씨"
  to_judge: "저희 가족"
  angry: "오혜진 씨"
  tells:
    - "질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다."
    - "개인 책임을 조직 사정이나 구조 문제로 재배치한다."
    - "결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다."
disputes:
  - id: "d-1"
    name: "아파트 사전 증여는 간병 보상인가, 인지 저하를 이용한 선점인가"
    quadrant: "both_know"
    runtime_truth: "아파트 사전 증여는 간병 보상인가, 인지 저하를 이용한 선점인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "간병 공로 명분은 살아 있지만, 공증 시점과 면회 통제, 진통제·지남력 기록이 붙으면 선점 성격이 강해져야 한다."
  - id: "d-2"
    name: "동생의 월 부양비는 실제 지원인가, 부모 돈을 돌려 만든 외형인가"
    quadrant: "a_only"
    runtime_truth: "동생의 월 부양비는 실제 지원인가, 부모 돈을 돌려 만든 외형인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 효자 기록처럼 보이지만, e-3과 e-4가 붙으면 부모 돈을 돌린 외형이었다는 반전이 강하게 살아나야 한다."
  - id: "d-3"
    name: "병원 면회 제한은 환자 보호인가, 형제 배제인가"
    quadrant: "b_only"
    runtime_truth: "병원 면회 제한은 환자 보호인가, 형제 배제인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "표면상 보호 조치였다는 방어는 가능하지만, 단독 주 보호자화와 연락 차단 정황이 붙으면 배제 성격이 분명해져야 한다."
  - id: "d-4"
    name: "두 사람 중 누가 먼저 어머니의 남은 판단력을 자기 편 논리로 몰아갔는가"
    quadrant: "shared_misconception"
    runtime_truth: "두 사람 중 누가 먼저 어머니의 남은 판단력을 자기 편 논리로 몰아갔는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 공증 강행과 순환 이체, 가족회의 압박이 겹치며 둘 다 남은 판단력을 자기 몫 선점에 끌어다 썼다는 shared fault 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: []
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "contract"
    surface_name: "아파트 증여계약 등기요약"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "A가 먼저 수세에 몰리는 출발점"
  - id: "e-2"
    type: "log"
    surface_name: "요양병원 면회 제한 신청서"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "A의 단독 보호자화와 배제 축이 열리는 시작점"
  - id: "e-3"
    type: "cctv"
    surface_name: "장남 부양비 송금 캡처"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "B의 효자 프레임을 지탱하는 표면 증거"
  - id: "e-4"
    type: "log"
    surface_name: "어머니 계좌 세부 거래내역"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "b"
    writing_role: "B의 부양비 외형이 무너지는 mid 핵심 증거"
  - id: "e-5"
    type: "chat"
    surface_name: "장녀와 공증사무소 문자"
    required_lie_state: "S1"
    requires: ["e-1"]
    subject_party: "a"
    writing_role: "A가 동생 배제 상태에서 공증을 서둘렀다는 mid 증거"
  - id: "e-6"
    type: "log"
    surface_name: "진통제 및 지남력 기록"
    required_lie_state: "S2"
    requires: ["e-1", "e-5"]
    subject_party: "b"
    writing_role: "A의 절차 정당성이 late에서 붕괴하는 핵심 증거"
  - id: "e-7"
    type: "log"
    surface_name: "병원 사회복지사 가족회의 기록"
    required_lie_state: "S3"
    requires: ["e-2", "e-4", "e-6"]
    subject_party: "a"
    writing_role: "양쪽 모두 마지막 판단력을 자기 몫 논리에 밀어 넣었다는 shared fault 축"
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
    name: "가족 보관자료 열람자"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "가까운 친척"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "기록 보관기관 담당자"
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
channel_inventory_source: "family-v1-01 runtime JSON + family-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/family-v1-01.json`
- `docs/ref/리뉴얼참고/family-v1-01-v3-game-loop-data.json`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- family-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- family-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 family 카테고리의 "병실 서랍의 인감도장"이다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 아파트 사전 증여
- 병원 면회 제한과 단독 주 보호자화
- 장남 부양비 송금 외형
- 부모 돈을 돌려 만든 순환 이체
- 가족회의에서 재산과 카드 문제를 동시에 밀어붙인 압박

초반 인상:
- 오혜진이 병원 접근과 공증 일정을 통제해 아파트를 먼저 가져간 사람처럼 보여야 한다.

중반 뒤집기:
- 오민석의 부양비 상당수가 실제 지원이 아니라 부모 돈을 돌려 만든 효자 외형이었다는 사실이 열려야 한다.

후반 정리:
- 오혜진 역시 취약한 시점의 공증과 면회 통제로 선을 넘었고,
- 오민석 역시 상속 지분과 자기 체면을 위해 자료를 정리하고 부모 돈을 돌렸다는 점이 함께 열려야 한다.
- 결론은 "누가 더 효자/효녀인가"가 아니라 "누가 어머니의 취약함과 접근권을 자기 몫 선점에 더 많이 썼는가"가 되어야 한다.

화자 정보:
- A 오혜진: 45세, 반찬가게 운영, victim_cosplay
  - 자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다.
  - 스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다.
  - 선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다.
  - 작은 인정으로 큰 책임을 비껴 가려 한다.
  - 상대 직접 호칭은 "오민석 씨", 재판관에게 말할 때 기본 참조어는 "저희 가족"
- B 오민석: 42세, 중고차 매매팀장, cold_logic
  - 질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.
  - 질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.
  - 개인 책임을 조직 사정이나 구조 문제로 재배치한다.
  - 결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.
  - 상대 직접 호칭은 "오혜진 씨", 재판관에게 말할 때 기본 참조어는 "저희 가족"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- runtime callTerms.toJudge가 양측 모두 "저희 가족"으로 잡혀 있으므로 judge-facing 일반 참조는 이 표현을 기본으로 쓴다
- 다만 양측 구분이 꼭 필요한 judge-facing 문장만 "장녀 쪽", "장남 쪽" 같은 역할어를 보조로 허용하고, 실명 직호는 피한다
- 상대에게 직접 말할 때만 "오민석 씨" / "오혜진 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 6년, 장례 직후, 공증, 10개월, 부양비, 부모 계좌, 인감도장, 진통제, 지남력 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 집 문제", "그 기록", "그 돈 흐름", "그날 일정", "그 회의"처럼 감춘 표현을 주로 쓴다
- mid부터 증여 추진, 일부 송금 인정, 계좌 흐름, 공증 일정 조정 정도가 열린다
- late에서는 순환 이체 구조, 공증 시점, 진통제 및 지남력 기록, 가족회의 압박, 단독 보호자화까지 구체화된다
- runtime monetaryDisputeIds는 비어 있지만, d-2 late 반응에서는 금액·횟수·기간이 실제로 열릴 수 있다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 오혜진의 공증 강행과 인지 저하 논란을 전부 자백시키는 것
- 초반부터 오민석의 순환 이체 구조와 부양비 외형 조작을 전부 자백시키는 것
- 한쪽을 순수한 효녀/효자로 고정하는 것
- "병실 서랍의 인감도장"이라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 오혜진만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

오혜진 쪽 추가 규칙:
- 초반에는 "내가 6년을 버텼다"는 공로와 억울함이 먼저 들려야 한다
- 병원 면회 제한과 공증 일정은 환자 보호나 현실 정리처럼 포장하라
- victim_cosplay답게 희생과 감정 소모를 먼저 꺼내라
- 다만 mid 이후부터는 공증을 서둘렀고 접근을 자기에게 유리하게 조정했다는 기미가 보여야 한다
- S0-S1에서는 약물 상태, 공증 시점 활용, 단독 보호자화의 전모를 다 열지 마라
- S3 이후에는 "그날 상태 괜찮을 때 끝내려 했다"는 급함과 선점성이 함께 보이게 하라

이 사건에서 오혜진의 실패 패턴:
- 너무 계산형으로 쓰면 피해자 프레임이 죽는다
- 너무 끝까지 울분만 있으면 late shared fault가 안 선다
- 오민석 같은 기록형 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 오민석만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

오민석 쪽 추가 규칙:
- 초반에는 누나의 병원 접근 통제와 아파트 이전을 더 큰 문제처럼 말하라
- 자기 행동은 "실제 지원도 있었다", "정리 방식의 문제였다", "흐름상 그렇게 보일 수 있다" 식으로 줄여라
- cold_logic답게 월별 흐름, 기록, 내역, 외형의 차이를 먼저 말하라
- 감정이 올라가도 갑자기 피해자 호소형 문장으로 미끄러지지 마라
- S0-S1에서는 순환 이체 구조와 자기 자료 편집 의도를 전부 열지 마라
- S2 이후에는 부모 돈을 돌려 만든 외형이 점차 배어나오게 하라

이 사건에서 오민석의 실패 패턴:
- 너무 빨리 순환 이체를 전부 자백하면 mid 뒤집기가 죽는다
- 너무 차갑기만 하면 family 사건의 배신감이 안 산다
- 오혜진처럼 감정 호소형 문장으로 쓰면 실패다

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
- e-1 아파트 증여계약 등기요약
- e-2 요양병원 면회 제한 신청서
- e-3 장남 부양비 송금 캡처
- e-4 어머니 계좌 세부 거래내역
- e-5 장녀와 공증사무소 문자
- e-6 진통제 및 지남력 기록
- e-7 병원 사회복지사 가족회의 기록

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
- e-1: 장녀 단독 명의 이전이 먼저 보이는 시작점
- e-2: 면회 제한과 단독 보호자화가 A를 더 불리하게 만드는 시작점
- e-3: B의 효자 프레임을 지탱하는 표면 증거
- e-4: 그 효자 프레임을 뒤집는 핵심 증거
- e-5: A가 동생 배제 상태에서 공증을 서두른 정황
- e-6: 증여 시점 판단 능력 논란을 late로 끌고 가는 핵심
- e-7: 양쪽 다 같은 회의에서 재산·카드 문제를 밀어붙였다는 결말 축

반드시 지킬 것:
- evidence_present는 증거를 본 반응이어야지, 자료를 낭독하면 안 된다
- e-1/e-2에서는 A가 먼저 수세에 몰리되, 아직 완전한 약탈자처럼 쓰지 마라
- e-3은 B를 잠깐 지탱하는 표면 자료처럼 써라
- e-4에서는 B가 크게 흔들려야 한다
- e-5/e-6에서는 A의 절차 정당성이 다시 무너져야 한다
- e-7에서는 양쪽 다 어머니의 취약함을 자기 몫 논리에 썼다는 late 결말이 느껴져야 한다
- dossier는 late 갈수록 "누가 먼저 부모 돈을 건드렸는가", "누가 상태 흔들릴 때 공증을 밀었는가", "누가 지금 더 억울한 척하는가"를 더 날카롭게 묻게 설계하라

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
- tp-1 가족 보관자료 열람자: 보관 문서와 전달 순서를 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 가까운 친척: 부양비 말과 실제 가족 분위기 사이의 차이를 본 사람처럼 말하되, B 편향이 조금 보여야 한다
- tp-3 기록 보관기관 담당자: 문서와 기록 시점만 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 오랜 간병이 있어도 취약한 시점의 자산 선점은 남는다는 결말
- b_primary_fault: 효자 프레임이 부모 돈을 돌린 외형이었다는 사실이 남는 결말
- shared_fault: 두 사람 모두 마지막 판단력을 자기 몫 선점에 끌어다 썼다는 씁쓸한 결말
- protective_resolution: 의료 정보와 가족 사생활 보호가 우선이라 관계 설명을 최소화하는 결말
- procedural_caution: 절차와 동의를 넘은 방식 자체를 경고하는 결말
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
- family-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- family-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
