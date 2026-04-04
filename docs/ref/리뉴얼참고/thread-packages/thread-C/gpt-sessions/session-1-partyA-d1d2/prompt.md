# V3 BeatScript 생성 — Session 1: Party A (한지석) / d-1, d-2

## 너의 역할
Solomon 법정 게임의 V3 BeatScript 작성 전문가.
LLM 없이 게임이 100% 돌아가도록, NPC 대사를 사전 작성한다.

## 첨부 파일 설명
- `spouse-01-case.json` — 사건 데이터 (disputes, evidence, duo, socialGraph)
- `spouse-01-tells-beats.json` — 캐릭터별 verbalTell 정의
- `spouse-01-v2-atoms.json` — StateUnlockAtom (진실 해금 기준선)
- `spouse-01-v3-pilot-reference.json` — 완성된 파일럿 데이터 (포맷/톤 레퍼런스)

## 대상 파티
**A: 한지석** (39세, 물류센터 야간 운영팀장, avoidant)
- speechStyle: 곤란한 질문에 숫자부터 꺼내며 감정을 뒤로 미룸. 궁지에 몰리면 흐름을 자기 쪽으로 잡으려 듦.
- verbalTell:
  - over_precision: 불편할수록 숫자가 정밀해짐 ("9시 12분", "2,800,000원 딱")
  - counter_question: 추궁당하면 되묻기 ("왜 그랬냐고요? 그럼 당신은?")
  - timeline_padding: 본론에 다가갈수록 업무 동선을 길게 늘어놓음
- 호칭: toPartner="자기", toJudge="제 아내", angry="오세린 씨!"

## 대상 쟁점

### d-1: 지석의 비밀 송금 280만원 (A가 주체 → 방어적 응답)
- quadrant: a_only, weight: high
- 진실: 재가돌봄센터 간병 예약금이었지만 숨긴 것 자체가 약속 위반
- 관련 증거: e-1 (이체 내역), e-2 (간병 예약 확인서)

### d-2: 세린의 새벽 휴대폰 열람 (A는 관찰자/피해자 → 공격적 반응)
- quadrant: b_only, weight: high
- 관련 증거: e-3 (메신저 캡처본)

## 생성할 BeatScriptV3 목록

### d-1 (A 방어) — 필수 커버리지
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | 범용 1개 + questionType "fact_pursuit" 1개 + "empathy_approach" 1개 |
| hedge | S2 | hint | 범용 1개 + questionType "motive_search" 1개 |
| partial | S2, S3 | partial | 범용 1개 |
| blame | S3 | partial | 범용 1개 |
| emotional | S3, S4 | partial | 범용 1개 |
| confession | S4, S5 | full | 범용 1개 |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-1" |
| evidence_hit | S2, S3, S4 | partial | afterEvidence: "e-2" |

### d-2 (A 관찰자) — 최소 커버리지
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "제 폰을 새벽에 열었다는 건 다른 문제" 류 |
| hedge | S2 | hint | 상대 행위를 지적하면서도 자기 숨김을 의식 |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-3" (A 시점) |

### InvestigationStage scriptedNpcResponses (A 시점)
e-1의 stage 0~2, e-2의 stage 0~2, e-3의 stage 0~2에 대한 A 응답.
(각 stage의 question.text는 spouse-01-case.json의 investigationStages 참조)

## 각 beat 규칙
- `alternatives` 최소 2개 (반복 방지)
- `truthLevel` 필수 기재
- `behaviorHint`에 tell 발현 여부 명시 (예: "over_precision tell — 시각을 분 단위까지")
- 1~3문장. 짧고 강한 대사.

## Truth Throttle 규칙 (절대 위반 금지)

```
┌──────────────────────────────────────────────────────────┐
│ truthLevel │ 허용 state    │ 금지 요소                    │
├────────────┼───────────────┼──────────────────────────────┤
│ none       │ S0, S1        │ 재가돌봄센터, 상담팀장, 간병, │
│            │               │ 예약금, 최민정, 오미숙,       │
│            │               │ 장모님, 동생 월세, 내용증명   │
├────────────┼───────────────┼──────────────────────────────┤
│ hint       │ S2            │ 위 금지어 + 구체적 기관명/직함 │
│            │               │ 허용: "가족 일"/"개인 사정"   │
├────────────┼───────────────┼──────────────────────────────┤
│ partial    │ S3            │ 전체 진실 금지. 행위 인정 가능 │
│            │               │ 기관 정식명칭/대상자 실명 금지 │
├────────────┼───────────────┼──────────────────────────────┤
│ full       │ S4, S5        │ 모두 허용                    │
└──────────────────────────────────────────────────────────┘
```

**핵심**: applicableStates에 S0 또는 S1이 포함되면 truthLevel은 반드시 `none`.

## 출력 형식

```json
{
  "session": "partyA-d1d2",
  "beatScriptsV3": [
    {
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "applicableStates": ["S0", "S1"],
      "truthLevel": "none",
      "line": "대사 텍스트",
      "behaviorHint": "연출 힌트",
      "alternatives": ["대체 대사 1", "대체 대사 2"]
    }
  ],
  "investigationStageResponses": {
    "e-1": [
      {
        "stage": 0,
        "scriptedNpcResponses": {
          "a": {
            "npcResponse": "응답 텍스트",
            "behaviorHint": "연출 힌트",
            "truthLevel": "none"
          }
        }
      }
    ]
  }
}
```

## 자가 검증 (출력 전 반드시 확인)
- [ ] S0-S1 대사에 금지어가 단 한 개도 없는가?
- [ ] applicableStates 최저 state와 truthLevel이 매칭되는가?
- [ ] 모든 beat에 alternatives가 2개 이상인가?
- [ ] 한지석의 tell(숫자 정밀, 되묻기, 동선 늘어놓기)이 line/behaviorHint에 반영되어 있는가?
- [ ] evidence_hit에 afterEvidence가 정확히 기재되어 있는가?
- [ ] investigation 응답의 truthLevel이 stage 진행에 따라 점진적인가? (0: none~hint, 1: hint, 2: hint~partial)
