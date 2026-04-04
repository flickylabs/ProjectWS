# [재요청] V3 BeatScript 생성 — Party B (오세린) / d-1, d-2

> 이전 세션에서 partyB d-3,d-4,d-5 데이터가 잘못 생성되었습니다.
> 이번에는 **partyB d-1, d-2**만 생성해 주세요.

## 너의 역할
Solomon 법정 게임의 V3 BeatScript 작성 전문가.
LLM 없이 게임이 100% 돌아가도록, NPC 대사를 사전 작성한다.

## 첨부 파일 설명
- `spouse-01-case.json` — 사건 데이터 (disputes, evidence, duo, socialGraph)
- `spouse-01-tells-beats.json` — 캐릭터별 verbalTell 정의
- `spouse-01-v2-atoms.json` — StateUnlockAtom (진실 해금 기준선)
- `spouse-01-v3-pilot-reference.json` — 완성된 파일럿 데이터 (포맷/톤 레퍼런스)

## 대상 파티
**B: 오세린** (36세, 프리랜서 플로리스트, confrontational)
- speechStyle: 같은 질문을 어조만 바꿔가며 상대 표정을 읽음. 확신이 서면 감정과 팩트를 한 문장에 섞어 쏘아붙임.
- verbalTell:
  - evidence_waving: 캡처를 흔들며 "이게 다예요, 이게 전부입니다" 단정
  - motive_jump: 행동 하나에서 의도를 곧바로 단정 ("그러니까 날 속인 거잖아")
  - selective_quote: 긴 해명에서 가장 불리한 세 단어만 골라 반복 ("사정이? 사정이라고요?")
- 호칭: toPartner="자기", toJudge="제 남편", angry="한지석 씨!"

## 대상 쟁점

### d-1: 지석의 비밀 송금 280만원 (B는 관찰자/피해자 → 공격적)
- quadrant: a_only, weight: high
- B 시점: 남편이 낯선 여자에게 280만원을 보냈다는 충격. 외도 의심의 출발점.
- 관련 증거: e-1 (이체 내역)

### d-2: 세린의 새벽 휴대폰 열람 (B가 주체 → 방어적)
- quadrant: b_only, weight: high
- 진실: 새벽 2시에 잠든 남편 폰을 열어 캡처하고 언니에게 보냄
- 관련 증거: e-3 (메신저 캡처본)

## 생성할 BeatScriptV3 목록

### d-1 (B 관찰자/피해자)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "280만원이 문제지, 제가 폰 본 게 문제입니까" 류 |
| hedge | S2 | hint | "외도가 아닐 수도 있지만, 숨긴 건 사실" |
| partial | S3 | partial | "자료가 나올수록 의심이 흔들림, 그래도 숨긴 건 배신" |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-1" (B 시점 — 관찰자 반응) |

### d-2 (B 방어)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "확인하지 않으면 누가 합니까" |
| deny | S0, S1 | none | questionType: "fact_pursuit" |
| hedge | S2 | hint | "새벽이었던 건 맞아요, 불안하면 손이 먼저" |
| partial | S3 | partial | "캡처를 언니한테 보낸 건 인정" |
| emotional | S3, S4 | partial | "바보 같은 아내가 되는 게 가장 무서웠어요" |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-3" (B 시점 — 주체 인정) |

### InvestigationStage scriptedNpcResponses (B 시점)
- e-1의 stage 0~2에 대한 B 관찰자 응답
- e-3의 stage 0~2에 대한 B 주체 응답

## 절대 지켜야 할 규칙

### Truth Throttle
```
none (S0,S1): 재가돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙, 장모님, 동생 월세, 내용증명 금지
hint (S2):    위 금지어 + 구체적 기관명/직함 금지. "가족 일"/"개인 사정" 수준까지만
partial (S3): 행위 인정 가능. 기관 정식명칭/대상자 실명 금지
full (S4,S5): 모두 허용
```

### applicableStates ↔ truthLevel 매칭 (이전 세션에서 이 규칙이 위반되었음!)
```
applicableStates에 S0 또는 S1 포함 → truthLevel 반드시 "none"
applicableStates 최저가 S2       → truthLevel 최대 "hint"
applicableStates 최저가 S3       → truthLevel 최대 "partial"
applicableStates 최저가 S4/S5    → truthLevel 최대 "full"

예시: applicableStates ["S2","S3"] + truthLevel "partial" → 위반! (S2에선 hint까지만)
      applicableStates ["S3"] + truthLevel "partial" → 정상
```

## 각 beat 규칙
- `alternatives` 최소 2개
- `truthLevel` 필수
- `behaviorHint`에 tell 발현 여부 명시
- 1~3문장

## 출력 형식

```json
{
  "session": "partyB-d1d2-redo",
  "beatScriptsV3": [ ... ],
  "investigationStageResponses": { ... }
}
```

## 자가 검증 (출력 전 반드시 확인)
- [ ] 모든 beat의 disputeId가 "d-1" 또는 "d-2"인가? (d-3/d-4/d-5가 섞이면 안 됨!)
- [ ] S0-S1 대사에 금지어가 단 한 개도 없는가?
- [ ] applicableStates 최저 state와 truthLevel이 정확히 매칭되는가?
- [ ] partial beat의 applicableStates에 S2가 포함되어 있지 않은가?
- [ ] alternatives 2개 이상인가?
- [ ] 오세린 tell(캡처 흔들기, 의도 단정, 약한 고리 반복) 반영되어 있는가?
