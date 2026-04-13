# Thread-QW V4 Quality Report: spouse-01 (20회)

> 검증일: 2026-04-13
> 대상: src/data/scriptedText/spouse-01.json (15채널, 332 entries, 1,277 variants)

---

## 채널별 6축+7축 결과

### interrogation (144 entries / 720 variants) — R1~5
- 축1 의미: **PASS** — S0→S5 NEW FACT 진행 정확. A: 블랙박스→영수증→회피패턴→목돈→적금해지→위임장. B: 부정→아는사람→가족→형+조카→시댁갈등→비자금3000만
- 축2 내용: **PASS** — V4 사실관계 정합. Truth Throttle S0~S1 위반 0건
- 축3 맥락: **PASS** — 감정 흐름 자연. A victim_cosplay, B avoidant 질감 일관
- 축4 호칭: **PASS** — "제 남편"/"제 아내" 일관, 자기+합니다체 모순 0건
- 축5 존칭: **PASS** — 합니다체 일관, 반말 종결 0건
- 축6 어법: **PASS** — 번역체 0건, 기획용어 0건, 깨진한글 0건
- 축7 액션 차별화: **PASS** — fact=사실/motive=동기/empathy=감정 분리 명확 (d-2 B S3 샘플: "현금으로 줬습니다" / "빚 독촉에 시달리는데" / "피가 섞인 형입니다")

### evidence_present (42 entries / 210 variants) — R6~7
- 축1~6: **PASS**
- 증거별 반응 적절: e-1 early "제가 산 겁니다" → mid "가족한테 필요한 것들" → late "조카한테. 참고서는 중학교 2학년"
- band 진행 자연 ✓

### dossier (24 entries / 72 variants) — R8
- 축1: **PASS** — band별 깊이 진행: early 모호 → mid 시댁 구체 → late "부모님 재산을 형이 혼자 받아 다 써버린 뒤"
- cross-band 중복: 0건 ✓

### witness (9 entries / 27 variants) — R9
- 축3: **PASS** — depth별 정보 수준 명확
  - w-1(경비) vague "자주 오긴 합니다" → full "여자 혼자 사는 집은 없는 걸로 압니다" (핵심 균열)
  - w-2(은행) full "서명 필체가 좀 달라 보였습니다" (위임장 힌트)
  - w-3(박미라) full "투자방 링크는 제가 보냈습니다" (사기 경위)
- vague 구체정보: 0건 ✓

### contradiction_pursuit (16 entries / 48 variants) — R10~11
- 축1 의미: **PASS** — S1→S4 에스컬레이션 자연
  - A d-1: 방어("말 바뀐 게 아닙니다") → 부분인정("전부 본 건 아니었습니다") → 핵심인정("속이고 있다고 믿고 있었습니다") → 심층동기("무서웠습니다")
  - B d-2: 방어 → 인정 → 형+개인회생 → "반대할 걸 알아서 먼저 처리"
- 축4 호칭: **PASS** — 합니다체 일관
- 축5 존칭: **PASS**

### interjection (8 entries / 24 variants) — R12
- 축3 맥락: **PASS** — minor=논리적 이의("잠깐만요"), major=감정 폭발("아니요, 그건 제가 들을 말이 아닙니다!")
- 축5 반말: **PASS** — major에서 자연스러운 반말 전환 ("끝입니까!" = 재판관 대상이므로 합니다체 변형, 적절)

### emotional_overload (4 entries / 8 variants) — R13
- 축3 감정: **PASS** — 울먹임→일시정지→(두 턴 후)→복귀 구조 자연
- 축6 어법: **PASS** — A "더는 말씀 못 드리겠습니다" / B "숨이 막힙니다. 잠깐만 멈추겠습니다" — 과잉 없이 절제된 감정 표현

### evidence_discovery (12 entries / 12 variants) — R14
- 축7 재판관: **PASS** — probe→slip→capture→confirm 4단계 자연
  - probe "생활용품 말고도 다른 물건이 보입니다" (유도)
  - slip "참고서도… 아닙니다" (실수)
  - capture "방금 참고서라고 하셨습니다" (간접참조 ✓, 직접인용 아님)
  - confirm "참고서를 산 건 맞습니다" (인정)
- 축2 NPC slip: **PASS** — V4 사건 내용(참고서, 학교 알림, 3000만원) 정확

### trust_action (18 entries / 36 variants) — R15
- 축1 톤 차이: **PASS**
  - separation "이 자리에서는 숨기지 않겠습니다" (방어↓)
  - confidential "비공개로 남는다면 인정하겠습니다" (안도)
  - immediate "네, 맞습니다" (즉답)
- 축5: **PASS** — 전원 합니다체

### mediation (6 entries / 12 variants) — R16
- 축1 resultClass: **PASS** — a_primary_fault "제 잘못이 더 크다는 말씀 받아들이겠습니다" / b_primary_fault "제 책임이 더 크다는 판단 받아들이겠습니다" / shared "서로를 믿지 못한 채 각자 움직였습니다"
- 축4 호칭: **PASS** — "재판관님"/"제 남편"/"제 아내" 일관

### judge_question (24 entries / 48 variants) — R17~18
- 축7-1 금지패턴: **PASS** (0건)
- 축7-2 depth 차별화: **PASS** — depth1 "어디로 향했는지" → depth4 "왜 끝까지 아내를 밖에 세웠습니까" 구체성 자연 증가
- 축7-3 questionType 차별화: **PASS** — fact "퇴근 뒤 어디로" / motive "말하지 못한 이유가 있었습니까" / empathy "가장 먼저 마음에 걸리는 사람이 누구입니까"
- 축7-4 사건맥락: **PASS** — 오피스텔/통화/영수증/현금출금/시댁/위임장 키워드 자연 포함

### judge_contradiction (6 entries / 18 variants) — R19
- 축7-1 금지패턴: **PASS** (직접인용 0건 — "'~'라고 하셨는데" 패턴 없음)
- 축7-3 톤 차별화: **PASS**
  - soft "어느 선까지가 사실입니까" (정리)
  - mid "왜 처음부터 그 이유를 빼셨습니까" (추궁)
  - hard "핵심을 늦게 꺼낸 이유를 더 돌리지 말고 답하십시오" (단호)
- 간접참조만 사용: **PASS** — "아까는 방문 사실만 두루뭉술하게 말씀하셨는데" (간접) ✓

### system_message_v2 (8 entries / 20 variants)
- 축6 어법: **CONDITIONAL** — 메타 쟁점ID "d-1", "d-2" 노출 4건 (아래 FAIL 참조)

### aftermath (5 entries / 10 variants) — R20
- 축6 어법: **PASS** — 서술체("~했다") ✓, 실명(박지연/이준호) ✓, 번역체 0건
- 구체적 사실: 위임장 조작, 3000만원, 비자금, 시댁 갈등 포함 ✓
- 판결 반영: 5개 resultClass별 차별화된 서사 ✓

---

## 금지 패턴 스캔

| 카테고리 | 건수 | 판정 |
|----------|------|------|
| 축7 금지 (직접인용/기계관찰) | **0건** | ✓ |
| 축6 금지 (번역체) | **0건** | ✓ |
| 데이터 금지 ((핵심)/(여성/청소년)/특정X) | **0건** | ✓ |
| 메타 금지 (d-N/e-N/S0~S5/archetype) | **4건** | **FAIL** |

---

## FAIL 항목 상세

| # | 채널 | 축 | variant ID | 원문 | 문제 |
|---|------|-----|-----------|------|------|
| 1 | system_message_v2 | 메타 | sys-d-1-contradiction-feedback-v1 | "**d-1**에서 말의 빈틈이 벌어지기 시작합니다" | 쟁점ID "d-1" 플레이어 노출 |
| 2 | system_message_v2 | 메타 | sys-d-1-contradiction-feedback-v2 | "**d-1** 진술이 한 방향으로 매끈하지 않습니다" | 동일 |
| 3 | system_message_v2 | 메타 | sys-d-2-contradiction-feedback-v1 | "**d-2**에서 돈의 흐름과 이유가 어긋납니다" | 쟁점ID "d-2" |
| 4 | system_message_v2 | 메타 | sys-d-2-contradiction-feedback-v2 | "**d-2**는 금액보다 용도 설명에서 흔들립니다" | 동일 |

## 교정 방향

1. system_message_v2 4건: "d-1" → "오피스텔과 통화 쪽", "d-2" → "돈 흐름 쪽" 등 자연어 표현으로 교체

---

## 종합 판정

| 영역 | 판정 |
|------|------|
| 기존 6채널 (6축) | **PASS** |
| V4 8채널 (6축+축7) | **PASS** |
| system_message_v2 | **FAIL** (메타 4건) |
| 축7 재판관 품질 | **PASS** |
| 금지 패턴 | **FAIL** (메타 4건) |
| **최종** | **CONDITIONAL** — system_message_v2 메타 4건 교정 후 PASS |
