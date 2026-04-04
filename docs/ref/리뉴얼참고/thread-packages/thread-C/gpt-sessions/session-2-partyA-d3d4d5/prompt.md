# V3 BeatScript 생성 — Session 2: Party A (한지석) / d-3, d-4, d-5

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
- verbalTell: over_precision(숫자 정밀), counter_question(되묻기), timeline_padding(동선 늘어놓기)
- 호칭: toPartner="자기", toJudge="제 아내", angry="오세린 씨!"

## 대상 쟁점

### d-3: 최민정은 외도 상대인가 (A가 오해의 당사자 → 방어)
- quadrant: shared_misconception, weight: high
- 진실: 최민정은 재가돌봄센터 상담팀장. 모텔 골목은 센터 후문 상담실.
- 관련 증거: e-3 (메신저 캡처), e-4 (출입기록과 카페 영수증)

### d-4: 세린의 우회 송금 150만원 (A는 관찰자 → 충격/반격)
- quadrant: b_only, weight: high
- 관련 증거: e-5 (정우성 경유 이체기록), e-6 (월세 수납증과 메신저)

### d-5: 100만원 사전 상의 약속 위반 (A가 공동 당사자)
- quadrant: both_know, weight: medium
- 진실: 두 사람 모두 약속을 어김. 지석 280만원이 먼저, 규모도 더 큼.

## 생성할 BeatScriptV3 목록

### d-3 (A 방어)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "그 사람은 제가 만나야 했던 사람" 류 |
| hedge | S2 | hint | "겉모습만 보면 오해" 류 |
| partial | S2, S3 | partial | "잘린 캡처 인정, 상담 장소 약속" |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-3" (A 시점) |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-4" |

### d-4 (A 관찰자)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "제 아내 쪽 돈 문제는 저도 처음 듣는다" 류 |
| hedge | S2 | hint | "그쪽도 사정이 있었겠지만" |

### d-5 (A 당사자)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "그 약속 얘기를 지금 꺼내는 건 순서가 아닙니다" |
| partial | S2, S3 | partial | "기준을 넘긴 건 제가 먼저" |
| blame | S3 | partial | "저만 배신자처럼 세우면 버틸 수밖에" |
| emotional | S3, S4 | partial | "마지막 체면이었습니다" |
| confession | S4, S5 | full | "선후관계로 보면 제가 먼저 깼습니다" |

### InvestigationStage scriptedNpcResponses (A 시점)
e-4의 stage들에 대한 A 응답, e-5/e-6의 stage들에 대한 A 관찰자 응답 (있는 경우).

## Truth Throttle 규칙 (절대 위반 금지)

```
none (S0,S1): 재가돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙, 장모님, 동생 월세, 내용증명 금지
hint (S2):    위 금지어 + 구체적 기관명/직함 금지. "가족 일"/"개인 사정" 수준까지만
partial (S3): 행위 인정 가능. 기관 정식명칭/대상자 실명 금지
full (S4,S5): 모두 허용
```

**핵심**: applicableStates에 S0 또는 S1 포함 → truthLevel 반드시 `none`.

## 출력 형식
session-1과 동일한 JSON 구조. `"session": "partyA-d3d4d5"`로 표기.

## 각 beat 규칙
- `alternatives` 최소 2개
- `truthLevel` 필수
- `behaviorHint`에 tell 발현 여부 명시
- 1~3문장

## 자가 검증 (출력 전 반드시 확인)
- [ ] S0-S1 대사에 금지어가 단 한 개도 없는가?
- [ ] applicableStates 최저 state와 truthLevel 매칭되는가?
- [ ] alternatives 2개 이상인가?
- [ ] 한지석 tell 반영되어 있는가?
- [ ] evidence_hit에 afterEvidence 정확한가?
