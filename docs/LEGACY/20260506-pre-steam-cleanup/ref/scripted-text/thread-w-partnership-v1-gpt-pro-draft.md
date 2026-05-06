# Thread W Partnership v1 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 partnership 사건 `지워진 지분표`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 초안**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-partnership-v1-01`
- working slug: `partnership-v1-01`
- 기준 파일:
  - `src/data/cases/generated/partnership-v1-01.json`
  - `docs/ref/리뉴얼참고/partnership-v1-01-v3-game-loop-data.json`
  - `docs/ref/리뉴얼참고/thread-s-v1-case-design-partnership.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 현재 저장소에는 partnership-v1-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold` 파일이 아직 없다.
  - 따라서 Session 4의 `resultClasses`와 `system_message` key는 현재 엔진과 신형 scripted bundle baseline을 따른다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-partnership-v1-01"
working_slug: "partnership-v1-01"
title: "지워진 지분표"
category: "partnership"
summary: "공동법인 장부에서 사라진 2억 3천만 원 주문, 후배 명의 개인 유통사 우회 출고, 친언니 명의 상표 선출원, 12% 지분 희석 투자안, 공동 데이터룸·ERP 감사로그가 한날 선점 경쟁을 묶는 동업 사건."
headline_hook: "대형 편집숍 입점이 확정된 다음 날, 공동법인 장부에서 2억 3천만 원어치 주문이 통째로 사라졌다. 한쪽은 동업자가 거래처를 개인 유통사로 빼돌렸다고 주장한다. 그런데 상대는 이미 브랜드 상표가 회사가 아니라 파트너 누나 명의로 출원돼 있었고, 투자설명회 자료엔 자기 지분이 12%까지 깎이는 표가 들어 있었다고 맞선다."
emotional_bait: "대형 편집숍 입점이 확정된 다음 날, 공동법인 장부에서 2억 3천만 원어치 주문이 통째로 사라졌다. 한쪽은 동업자가 거래처를 개인 유통사로 빼돌렸다고 주장한다. 그런데 상대는 이미 브랜드 상표가 회사가 아니라 파트너 누나 명의로 출원돼 있었고, 투자설명회 자료엔 자기 지분이 12%까지 깎이는 표가 들어 있었다고 맞선다."
anchor_truth: "서지안은 브랜드를 지키겠다는 명분으로 상표를 친언니 명의로 선출원했고, 신규 투자 유치 과정에서 도윤 지분을 급격히 희석하는 구조를 숨긴 채 준비했다. 한도윤은 회사가 자신을 밀어내기 전에 핵심 편집숍 거래를 따로 살리겠다며 후배 명의 유통사를 세워 주문과 재고를 빼냈고, 이후엔 \"이미 끝난 동업\"인 것처럼 정리 프레임을 밀었다."
resolution_dilemma: "실제 매출과 거래처를 빼돌린 쪽을 더 무겁게 볼지, 아니면 브랜드와 지배구조를 선점해 동업자를 사실상 쫓아낼 계획을 먼저 세운 쪽을 더 무겁게 볼지 갈린다. 하나는 눈앞의 현금흐름과 신뢰를 훔친 행위이고, 다른 하나는 회사의 미래와 소유권 자체를 조용히 갈아치우려 한 행위다."
context:
  type: "business_conflict"
  description: "대형 편집숍 입점이 확정된 다음 날, 공동법인 장부에서 2억 3천만 원어치 주문이 통째로 사라졌다. 한쪽은 동업자가 거래처를 개인 유통사로 빼돌렸다고 주장한다. 그런데 상대는 이미 브랜드 상표가 회사가 아니라 파트너 누나 명의로 출원돼 있었고, 투자설명회 자료엔 자기 지분이 12%까지 깎이는 표가 들어 있었다고 맞선다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 한도윤이 대형 거래처와 물량을 개인 유통사로 빼돌린 직접 가해자로 보인다. 유통사 입금과 공동 자원 사용, 야간 창고 출고 축이 붙으면 그 인상이 더 강해진다. 그러나 상표 출원서와 투자 데이터룸 초안이 열리면 서지안이 이미 회사 밖 상표와 지분 구조를 따로 묶고 있었다는 사실이 드러난다. 마지막에는 감사로그가 같은 날 양쪽이 서로 다른 축에서 회사를 자기 쪽으로 접수하려 했다는 구조를 확정한다."
party_a:
  id: "a"
  name: "서지안"
  age: 38
  occupation: "반려동물 영양식 브랜드 공동대표"
  archetype: "cold_logic"
  speech_style: "질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다."
  to_partner: "한도윤 씨"
  to_judge: "제 동업자"
  angry: "한도윤 씨"
  tells:
    - "질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다."
    - "개인 책임을 조직 사정이나 구조 문제로 재배치한다."
    - "결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다."
party_b:
  id: "b"
  name: "한도윤"
  age: 40
  occupation: "OEM 생산 출신 공동대표"
  archetype: "premature_summary"
  speech_style: "결론을 먼저 말하고 세부는 나중에 붙이며, 전체 틀을 선점해 불리한 사실의 무게를 줄이려 한다."
  to_partner: "서지안 씨"
  to_judge: "제 동업자"
  angry: "서지안 씨"
  tells:
    - "결론을 먼저 박아 두고 세부 질문을 그 결론 안으로 끌어들인다."
    - "개인 계산을 원칙이나 집단 권리 뒤에 숨긴다."
    - "복잡한 경위를 두세 문장으로 압축해 결의 단서를 없앤다."
disputes:
  - id: "d-1"
    name: "2억 3천만 원 주문 이관은 브랜드를 살리기 위한 긴급 조치인가, 핵심 거래처 탈취인가"
    quadrant: "both_know"
    runtime_truth: "2억 3천만 원 주문 이관은 브랜드를 살리기 위한 긴급 조치인가, 핵심 거래처 탈취인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 한도윤의 직접 탈취처럼 들리지만, 단순 도둑 프레임으로 고정하지 말고 누가 먼저 동업 신뢰를 깨뜨렸는지까지 이어질 발판을 남겨야 한다."
  - id: "d-2"
    name: "상표 선출원은 법적 보호 장치였는가, 동업 배제를 위한 무기였는가"
    quadrant: "a_only"
    runtime_truth: "상표 선출원은 법적 보호 장치였는가, 동업 배제를 위한 무기였는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 보호 장치처럼 들리되, e-3과 e-5가 붙으면 회사 귀속 의사 부재와 협상 카드화가 살아나야 한다."
  - id: "d-3"
    name: "투자 유치는 회사 생존을 위한 선택이었는가, 파트너 축출을 위한 지분 희석 시도였는가"
    quadrant: "b_only"
    runtime_truth: "투자 유치는 회사 생존을 위한 선택이었는가, 파트너 축출을 위한 지분 희석 시도였는가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "초반에는 막연한 투자 검토처럼 흘러가지만, mid 이후에는 12% 지분 구조와 의결권 제한 결이 선명해져야 한다."
  - id: "d-4"
    name: "동업 관계를 먼저 쿠데타로 바꾼 쪽은 누구인가"
    quadrant: "shared_misconception"
    runtime_truth: "동업 관계를 먼저 쿠데타로 바꾼 쪽은 누구인가는 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다."
    writing_direction: "late에는 어느 한쪽의 단독 배신이 아니라 같은 날 서로 다른 축에서 회사를 선점하려 한 shared fault 결말이 보여야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4"]
monetary_dispute_ids: ["d-1", "d-2"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "log"
    surface_name: "월말 정산 요약표"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "공동법인 장부에서 주문이 비어 보이며 B가 먼저 수세에 몰리는 출발점"
  - id: "e-2"
    type: "chat"
    surface_name: "편집숍 바이어 메신저"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "B가 거래처를 새 유통사로 직접 돌린 흔적이 잡히는 early 직접 증거"
  - id: "e-3"
    type: "log"
    surface_name: "상표 출원서"
    required_lie_state: null
    requires: []
    subject_party: "a"
    writing_role: "A의 '브랜드 보호' 프레임이 회사 밖 소유 구조 문제로 흔들리기 시작하는 축"
  - id: "e-4"
    type: "log"
    surface_name: "유통사 입금 및 공동 자원 사용 내역"
    required_lie_state: "S2"
    requires: ["e-1", "e-2"]
    subject_party: "b"
    writing_role: "B가 선금과 공동 자원까지 끌어다 썼다는 mid 강증거"
  - id: "e-5"
    type: "log"
    surface_name: "투자 데이터룸 초안"
    required_lie_state: "S2"
    requires: ["e-3"]
    subject_party: "a"
    writing_role: "A가 상표와 지분 희석 구조를 함께 준비했다는 mid 뒤집기 증거"
  - id: "e-6"
    type: "cctv"
    surface_name: "야간 창고 출고 영상과 라벨 프린트 로그"
    required_lie_state: "S3"
    requires: ["e-4"]
    subject_party: "b"
    writing_role: "B의 우회 출고가 즉흥 해명이 아니라 실행된 탈취였다는 late 확증 축"
  - id: "e-7"
    type: "log"
    surface_name: "공동 데이터룸 및 ERP 감사로그"
    required_lie_state: "S3"
    requires: ["e-4", "e-5", "e-6"]
    subject_party: "a"
    writing_role: "같은 날 양쪽이 거래처·상표·권한을 서로 선점했다는 late shared fault 축"
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
    name: "내부 실무 리드"
    bias: "pro_a"
    related_disputes: ["d-1", "d-2"]
  - id: "tp-2"
    name: "외부 협상 상대"
    bias: "pro_b"
    related_disputes: ["d-2", "d-3", "d-1"]
  - id: "tp-3"
    name: "감사 또는 기관 담당자"
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
channel_inventory_source: "partnership-v1-01 runtime JSON + partnership-v1-01 v3 dossier data + current new-case scripted bundle baseline"
```

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/partnership-v1-01.json`
- `docs/ref/리뉴얼참고/partnership-v1-01-v3-game-loop-data.json`
- `docs/ref/리뉴얼참고/thread-s-v1-case-design-partnership.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- partnership-v1-01 전용 `structure-v2` / `v2-atoms` 파일이 생성되면 재실행 시 함께 첨부
- partnership-v1-01 전용 `full-scaffold` 또는 coverage inventory가 생성되면 Session 4 범위 최종 대조에 사용

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 partnership 카테고리의 "지워진 지분표"다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건 핵심:
- 공동법인 장부에서 사라진 2억 3천만 원 주문
- 후배 명의 개인 유통사 우회 출고와 공동 자원 사용
- 친언니 명의 상표 선출원
- 투자 데이터룸 초안의 12% 지분 희석 구조
- 공동 데이터룸·ERP 감사로그가 같은 날의 선점 순서를 묶는 구조

초반 인상:
- 한도윤이 거래처와 물량을 개인 유통사로 빼돌린 직접 가해자처럼 보여야 한다.

중반 뒤집기:
- 서지안이 이미 회사 밖 상표와 투자 구조를 따로 묶어 한도윤을 밀어낼 준비를 하고 있었다는 사실이 열려야 한다.

후반 정리:
- 한도윤은 단순 임시조치가 아니라 선금과 공동 자원, 야간 창고 출고까지 써 가며 우회 출고를 실행한 쪽으로 드러나야 한다.
- 서지안 역시 단순 보호가 아니라 회사 귀속 의사 없는 상표 선출원과 지분 12% 희석 구조를 조용히 준비한 쪽으로 드러나야 한다.
- 결론은 "누가 더 억울한가"가 아니라 "누가 먼저 동업의 전제를 뒤집었고, 누가 더 직접적으로 회사를 자기 쪽으로 당겼는가"가 되어야 한다.

화자 정보:
- A 서지안: 38세, 반려동물 영양식 브랜드 공동대표, cold_logic
  - 질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.
  - 질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.
  - 개인 책임을 조직 사정이나 구조 문제로 재배치한다.
  - 결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.
  - 상대 직접 호칭은 "한도윤 씨", 재판관에게 상대를 말할 때는 "제 동업자"
- B 한도윤: 40세, OEM 생산 출신 공동대표, premature_summary
  - 결론을 먼저 말하고 세부는 나중에 붙이며, 전체 틀을 선점해 불리한 사실의 무게를 줄이려 한다.
  - 결론을 먼저 박아 두고 세부 질문을 그 결론 안으로 끌어들인다.
  - 개인 계산을 원칙이나 집단 권리 뒤에 숨긴다.
  - 복잡한 경위를 두세 문장으로 압축해 결의 단서를 없앤다.
  - 상대 직접 호칭은 "서지안 씨", 재판관에게 상대를 말할 때는 "제 동업자"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 실명 대신 반드시 "제 동업자"를 사용한다
- 상대에게 직접 말할 때만 "한도윤 씨" / "서지안 씨"를 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 `리본펫랩`, `오가닉테일`, `친언니 명의`, `12%`, `revised_captable_final`, `거래처 CSV`, `결재권한 제한`, `18:26 우회 출고` 같은 정답 키워드를 함부로 다 열지 마라
- early에서는 "그 거래처", "그 출원", "그 투자안", "그 표", "그 로그", "그 별도 쪽"처럼 감춘 표현을 주로 쓴다
- mid부터는 별도 유통사, 편집숍 바이어, 상표 출원, 투자 자료, 공동 자원 사용 정도가 열린다
- late에서는 `리본펫랩`, `오가닉테일`, 친언니 명의, 12%, 감사로그, 거래처 CSV 내보내기, 결재권한 제한, 야간 출고와 라벨 로그까지 구체화된다
- 금전 사건 S5는 숫자 1개 이상을 넣는다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON, v3 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 방어 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 서지안의 친언니 명의 상표 선출원과 12% 지분 희석 구조를 전부 자백시키는 것
- 초반부터 한도윤의 후배 명의 유통사, 공동 자원 사용, 야간 창고 출고를 전부 자백시키는 것
- 한쪽을 순수한 피해자나 순수한 가해자로 고정하는 것
- "지워진 지분표"라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 서지안만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

서지안 쪽 추가 규칙:
- 초반에는 한도윤의 주문 이관과 우회 출고가 더 즉각적인 문제라는 방향으로 말해야 한다
- 자기 행동은 "브랜드 보호", "법적 안전장치", "검토용 자료", "회사 생존 가능성 확인"처럼 범위를 잘라 축소하라
- cold_logic답게 숫자, 순서, 권리 귀속, 거래 구조를 먼저 꺼내라
- 감정이 올라가도 한도윤처럼 결론만 먼저 박는 summary-first 리듬으로 쓰지 마라
- S0-S1에서는 친언니 명의 출원, 회사 귀속 의사 부재, 12% 지분 구조, 의결권 제한 결을 전부 열지 마라
- S3 이후에는 "보호 장치였다"는 말이 점점 버거워지고, 말 끝을 평평하게 누르면서도 범주를 넓혀 책임을 흐리는 습관이 살아 있어야 한다

이 사건에서 서지안의 실패 패턴:
- 너무 빨리 상표와 지분 구조를 배제용 무기처럼 자백하면 mid 뒤집기가 죽는다
- 너무 차갑게 계산 말만 남기면 partnership 사건의 배신감과 권력감이 안 산다
- 한도윤 같은 premature_summary 문장으로 쓰면 실패다

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

이번 세션 범위는 interrogation 채널 중 party b, 즉 한도윤만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

한도윤 쪽 추가 규칙:
- 초반에는 거래처를 빼돌린 사람이 아니라 이미 기울어진 판에서 물량을 살려 놓은 사람처럼 들리려 해야 한다
- 자기 행동은 "정리", "임시 우회", "거래처 보호", "이미 무너진 동업의 수습"처럼 결론부터 박고 세부를 늦게 붙여라
- premature_summary답게 결론을 먼저 말하되, 세부는 질문을 받으면 뒤늦게 툭툭 붙여야 한다
- 감정이 올라가도 서지안처럼 구조와 기록을 길게 정리하는 cold_logic 문장으로 미끄러지지 마라
- S0-S1에서는 후배 명의 유통사, 공동 자원 사용, 선금 9천만 원, 야간 라벨 갈이와 우회 출고를 전부 열지 마라
- S2 이후에는 서지안의 상표·지분 선점 설계를 계속 끌어와 자기 행동의 명분을 강화하되, 노골적인 피해자 코스프레로 흐르지 마라

이 사건에서 한도윤의 실패 패턴:
- 너무 빨리 후배 명의 유통사와 공동 자원 사용을 다 자백하면 early bait가 죽는다
- 너무 끝까지 "살리려 했다"만 반복하면 late의 실행 책임이 안 선다
- 서지안 같은 계산형, 기록형 문장으로 쓰면 실패다

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
- e-1 월말 정산 요약표
- e-2 편집숍 바이어 메신저
- e-3 상표 출원서
- e-4 유통사 입금 및 공동 자원 사용 내역
- e-5 투자 데이터룸 초안
- e-6 야간 창고 출고 영상과 라벨 프린트 로그
- e-7 공동 데이터룸 및 ERP 감사로그

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
- e-1: 공동법인 장부에서 주문이 빠져 보이며 B가 먼저 불리해지는 시작점
- e-2: B가 거래처를 새 유통사로 직접 돌렸다는 early 직접 증거
- e-3: A의 상표가 회사 바깥에 묶여 있다는 사실이 mid 뒤집기의 씨앗이 되는 축
- e-4: B가 선금과 공동 자원까지 함께 빼낸 흔적이 붙는 mid 강증거
- e-5: A가 상표와 12% 지분 구조를 함께 설계했다는 mid 뒤집기 핵심 증거
- e-6: B의 야간 우회 출고가 실행된 탈취였다는 late 확증 축
- e-7: 같은 날 양쪽이 거래처, 상표, 지배구조, 결재권한을 서로 선점하려 했다는 shared fault late 축

반드시 지킬 것:
- evidence_present는 자료를 보고 반응하는 문장이어야 한다
- 자료 이름이나 핵심 요소를 그대로 낭독하지 마라
- e-1/e-2/e-4/e-6에서는 한도윤이 더 직접적 가해자로 보이되, 마지막 전까지는 단독 악당으로 확정하지 마라
- e-3/e-5에서는 서지안의 "보호 장치" 프레임이 점점 깨져야 한다
- e-7에서는 양쪽 모두 피해자 프레임이 무너지기 시작해야 한다
- dossier는 late 갈수록 "누가 회사를 회사 밖으로 빼돌렸는가", "누가 공동 자원을 먼저 자기 것으로 썼는가", "누가 권한과 미래를 먼저 선점했는가"를 더 날카롭게 묻게 설계하라

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
- tp-1 내부 실무 리드: 주문 흐름, 창고, 내부 업무 순서를 본 사람처럼 말하되, A 편향이 은근히 느껴져야 한다
- tp-2 외부 협상 상대: 투자나 협상장에서 들은 말과 태도를 말하는 사람처럼 쓰되, B 편향이 조금 보여야 한다
- tp-3 감사 또는 기관 담당자: 업로드 시각, 내보내기 기록, 권한 제한, 승인 로그만 건조하게 말하는 중립 증인처럼 써라
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 연결과 단정이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 서지안이 브랜드와 지배구조를 회사 밖에서 먼저 묶어 동업의 전제를 무너뜨린 쪽이라는 결말
- b_primary_fault: 한도윤이 실제 주문, 선금, 공동 자원, 우회 출고를 실행해 즉시 손해를 만든 쪽이라는 결말
- shared_fault: 둘 다 같은 날 회사를 각자 자기 축으로 접수하려 했다는 씁쓸한 결말
- protective_resolution: 거래처, 직원, 외부 투자자, 브랜드 자산 보호가 우선이라 관계 서사를 최소화하는 결말
- procedural_caution: 회사 밖 상표 소유, 숨긴 지분 희석안, 별도 유통사 우회 출고, 권한 차단 같은 방식 자체를 경고하는 결말
- aftermath는 판결문 요약이 아니라 동업의 뒷맛과 회사의 빈 껍데기감을 보여야 한다

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
- partnership-v1-01 전용 `v2-atoms` 또는 `structure-v2`가 나오면 Truth Throttle 문구를 1회 더 정렬한다.
- partnership-v1-01 전용 `full-scaffold` 또는 coverage inventory가 나오면 Session 4의 결과군/시스템 키 범위를 대조 검수한다.
- 현재 문서는 runtime JSON과 v3 데이터만으로도 GPT Pro 실행 직전 검토가 가능하도록 닫아 두었다.
