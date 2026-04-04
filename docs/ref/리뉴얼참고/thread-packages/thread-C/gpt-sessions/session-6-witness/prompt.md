# V3 증인 scriptedTestimonies 생성 — Session 6: Witness

## 너의 역할
Solomon 법정 게임의 증인 증언 스크립트 작성 전문가.
LLM 없이 증인 증언이 완전히 동작하도록, depth별 사전 작성 증언을 만든다.

## 첨부 파일 설명
- `spouse-01-case.json` — 사건 데이터 (socialGraph 섹션에 증인 4명 상세)
- `spouse-01-tells-beats.json` — 참고용 (NPC tell, 증인 톤과 별개)
- `spouse-01-v2-atoms.json` — StateUnlockAtom (진실 기준선)
- `spouse-01-v3-pilot-reference.json` — 파일럿 데이터 (witnessScriptedTestimonies 섹션 참고)

## 대상 증인 4명

### tp-1: 오미숙 (세린의 어머니, 61세, 주부)
- bias: pro_b / distortionRisk: unconscious
- knowledgeScope: 추석 연휴 간병 인력 필요한 사실 + 딸이 동생 돈 문제를 남편에게 숨기려 한 정황
- speechStyle: 자식 편을 들면서도 객관적으로 보이려 함. 어른 특유의 훈계 톤.
- 호칭: 재판관님 / 지석씨 / 세린

### tp-2: 이재훈 (지석의 직장 동료, 41세, 물류센터 야간 운영팀장)
- bias: pro_a / distortionRisk: accurate
- knowledgeScope: 지석이 추석 직전에 돌봄 관련 기관 견적을 여러 차례 문의한 사실
- speechStyle: 구체적이지만 본인 평판에 영향 갈까 봐 표현을 고름
- 호칭: 재판관님 / 지석씨 / 세린씨

### tp-3: 최민정 (재가돌봄센터 상담팀장, 42세)
- bias: neutral / distortionRisk: accurate
- knowledgeScope: 지석의 상담 예약 내역, 280만원 입금 목적, 상담 장소와 시간 (기관 기록)
- speechStyle: 사실 위주로 간결. 직업적 용어를 섞되 감정은 절제.
- 호칭: 재판관님 / 한지석씨 / 오세린씨
- **특수**: 기관 증인 — partial에서도 자기 업무 범위의 사실 일부 공개 가능

### tp-4: 정우성 (세린의 대학 동기, 36세, 프리랜서 디자이너)
- bias: neutral / distortionRisk: accurate
- knowledgeScope: 세린이 동생 월세를 대신 처리해달라며 계좌 경유 요청한 메신저 대화 + 이체 기록
- speechStyle: 편하게 말하다가 재판관 앞에서 존댓말로 돌아감. 친구 입장을 자연스럽게 대변.
- 호칭: 재판관님 / 지석씨 / 세린

## depth별 규칙

| depth | truthLevel | 해금 조건 | 내용 수준 |
|-------|-----------|----------|----------|
| vague | `hint` | 소환 즉시 | 모호하고 조심스러운. 핵심 사실 노출 금지. |
| partial | `partial` | 관련 dispute S2+ | 핵심 일부 공개. |
| full | `full` | 관련 dispute S3+ | 알고 있는 전부 공개. |

## Truth Throttle — 증인별 금지어

### 일반 증인 (tp-1, tp-2, tp-4)
```
vague (hint):   재가돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙(증인 자신 제외),
                장모님, 동생 월세, 내용증명 금지
                허용: "뭔가 챙기려 했다", "돈 좀 보내달라고 했다" 수준
partial:        기관 정식명칭 금지 → "돌봄 관련 기관" 등 간접 표현
                "동생 월세" → "가족 급한 돈 문제"
                행위 인정 가능
full:           모두 허용. 구체적 이름/금액/시각/기관명 가능.
```

### 기관 증인 (tp-3: 최민정)
```
vague (hint):   "업무상 상담을 진행한 적이 있다" 수준. 목적/내용 비공개.
partial:        자기 업무 범위: "간병 예약 건", "상담 요청", "예약금 수납" 가능
                대상자 실명(오미숙) 비공개 → "돌봄 대상자" 수준
full:           전부 공개. 오미숙, 상담 일시, 장소, 목적, "사적 관계 없음" 단정.
```

## 각 증언 형식
- 2~4문장
- 증인의 speechStyle/호칭 반영
- behaviorHint: 증인의 태도 변화 묘사

## 출력 형식

```json
{
  "session": "witness",
  "witnessScriptedTestimonies": {
    "tp-1": {
      "name": "오미숙 (세린의 어머니)",
      "scriptedTestimonies": {
        "vague": {
          "testimony": "증언 텍스트 (2~4문장)",
          "behaviorHint": "태도/표정 묘사",
          "truthLevel": "hint"
        },
        "partial": {
          "testimony": "...",
          "behaviorHint": "...",
          "truthLevel": "partial"
        },
        "full": {
          "testimony": "...",
          "behaviorHint": "...",
          "truthLevel": "full"
        }
      }
    },
    "tp-2": { ... },
    "tp-3": { ... },
    "tp-4": { ... }
  }
}
```

## 자가 검증 (출력 전 반드시 확인)
- [ ] vague 증언의 truthLevel이 모두 `hint`인가?
- [ ] partial 증언의 truthLevel이 모두 `partial`인가?
- [ ] full 증언의 truthLevel이 모두 `full`인가?
- [ ] vague 증언에 핵심 사실(기관명, 간병, 월세 등)이 노출되지 않는가?
- [ ] partial 증언에 기관 정식명칭이 없는가? (tp-3 예외: 자기 업무 범위 허용)
- [ ] partial 증언에 대상자 실명(오미숙)이 없는가? (tp-1 자신은 예외)
- [ ] 각 증인의 speechStyle/호칭이 반영되어 있는가?
- [ ] depth가 올라갈수록 구체성이 높아지는가?
- [ ] 4명 x 3 depth = 12개 증언이 모두 있는가?
