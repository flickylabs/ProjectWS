# V3 BeatScript 생성 — Session 4: Party B (오세린) / d-3, d-4, d-5

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
- verbalTell: evidence_waving(캡처 흔들기), motive_jump(의도 단정), selective_quote(약한 고리 반복)
- 호칭: toPartner="자기", toJudge="제 남편", angry="한지석 씨!"

## 대상 쟁점

### d-3: 최민정은 외도 상대인가 (B는 의심하는 쪽 → 점점 흔들림)
- quadrant: shared_misconception, weight: high
- B 시점: 외도라고 확신했지만 자료가 나올수록 흔들림
- 관련 증거: e-3, e-4

### d-4: 세린의 우회 송금 150만원 (B가 주체 → 방어)
- quadrant: b_only, weight: high
- 진실: 동생 밀린 월세 3개월치를 정우성 계좌 경유로 우회 송금
- 관련 증거: e-5 (정우성 경유 이체기록), e-6 (월세 수납증과 메신저)

### d-5: 100만원 사전 상의 약속 위반 (B가 공동 당사자)
- quadrant: both_know, weight: medium
- B 시점: 배신감이 이유였지만 면책은 안 됨

## 생성할 BeatScriptV3 목록

### d-3 (B — 의심→흔들림)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "이게 다예요, 280만원에 모텔 골목" 류 |
| hedge | S2 | hint | "제 의심이 틀렸을 수도" |
| partial | S2, S3 | partial | "외도가 아닐 수도, 그래도 숨긴 건 배신" |
| emotional | S3, S4 | partial | "제가 그동안 뭘 한 거예요, 혼자 미쳐가면서" |

### d-4 (B 방어)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "제 개인 사정입니다, 여기서 다룰 문제 아닙니다" |
| hedge | S2 | hint | "급한 일이 있어서 돌려보냄, 280만원이랑 다른 문제" |
| partial | S2, S3 | partial | "정우성 씨 계좌를 거친 건 맞아요, 가족 급한 돈 문제" |
| blame | S3 | partial | "왜 제 150만원만 떼어 놓습니까" |
| emotional | S3, S4 | partial | "같은 구덩이를 메우는 사람처럼 보일까 봐" |
| confession | S4, S5 | full | "동생 세 달 밀린 월세, 남편 눈을 피한 것도 사실" |
| evidence_hit | S2, S3 | hint | afterEvidence: "e-5" |
| evidence_hit | S2, S3, S4 | partial | afterEvidence: "e-6" |

### d-5 (B 당사자)
| beatType | applicableStates | truthLevel | 비고 |
|----------|-----------------|-----------|------|
| deny | S0, S1 | none | "저까지 엮지 마세요, 먼저 넘은 쪽이 누구인지" |
| partial | S2, S3 | partial | "150만원도 기준 넘은 건 알아요, 배신감이 이유" |
| blame | S3 | partial | "같은 위반이라고 같은 무게는 아닙니다" |
| emotional | S3, S4 | partial | "그 약속을 먼저 지키자고 한 쪽이 저여서 더 창피" |
| confession | S4, S5 | full | "배신감이 이유, 그래도 면책은 안 됨" |

### InvestigationStage scriptedNpcResponses (B 시점)
e-5의 stage들에 대한 B 주체 응답, e-6의 stage들에 대한 B 주체 응답.

## Truth Throttle 규칙 (절대 위반 금지)

```
none (S0,S1): 재가돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙, 장모님, 동생 월세, 내용증명 금지
hint (S2):    위 금지어 + 구체적 기관명/직함 금지. "가족 일"/"개인 사정"/"급한 일" 수준까지만
partial (S3): 행위 인정 가능. 기관 정식명칭/대상자 실명 금지. "동생 돈 문제" → "가족 급한 돈" 로 표현
full (S4,S5): 모두 허용. "동생 월세 석 달", "내용증명", "정우성 경유" 등 구체적 사실 가능
```

**핵심**: applicableStates에 S0 또는 S1 포함 → truthLevel 반드시 `none`.

## 출력 형식
session-1과 동일한 JSON 구조. `"session": "partyB-d3d4d5"`로 표기.

## 각 beat 규칙
- `alternatives` 최소 2개
- `truthLevel` 필수
- `behaviorHint`에 tell 발현 여부 명시
- 1~3문장

## 자가 검증 (출력 전 반드시 확인)
- [ ] S0-S1 대사에 금지어가 단 한 개도 없는가?
- [ ] applicableStates 최저 state와 truthLevel 매칭되는가?
- [ ] alternatives 2개 이상인가?
- [ ] 오세린 tell 반영되어 있는가?
- [ ] partial 대사에 "동생 월세" 대신 "가족 급한 돈"으로 되어 있는가?
- [ ] evidence_hit에 afterEvidence 정확한가?
