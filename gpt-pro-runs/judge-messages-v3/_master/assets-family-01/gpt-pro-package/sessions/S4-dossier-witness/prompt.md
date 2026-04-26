# S4: dossier 옵션 B (lieBand 신설) + witness v 확장

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(윤태성/윤정후), dispute, evidence, dossier에 맞춰 작업하라.


**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
1. **dossier 채널 옵션 B**: lieBand 차원 신설 (current 8 question × 3v = 24 entries → 8 × 3 lieBand × 10v = 240 entries)
2. **witness 채널 v 확장**: 기존 9 keys × 3v = 27 → 9 × 10v = 90 entries

## 분량
- dossier: +216 entries (24 → 240)
- witness: +63 entries (27 → 90)
- **합계: +279 entries**

---

## Part 1: dossier 채널 (lieBand 신설)

### 키 패턴
- 새 키: `{dossierQuestionId}|{lieBand}` (8 × 3 = 24 cells)
- lieBand: early / mid / late

### dossier 8 questions (DossierCard 5장)
| dossierCardId | questionId | targetParty | requiredLieState |
|---|---|---|---|
| dc-1 | dc-1.b.q1 | b | S2 |
| dc-2 | dc-2.b.q1 | b | S3 |
| dc-3 | dc-3.b.q1 | b | (재확인) |
| dc-3 | dc-3.b.q2 | b | (재확인) |
| dc-4 | dc-4.a.q1 | a | (재확인) |
| dc-4 | dc-4.a.q2 | a | (재확인) |
| dc-5 | dc-5.b.q1 | b | (재확인) |
| dc-5 | dc-5.a.q1 | a | (재확인) |

### 출력 형식
```json
{
  "key": "dc-1.b.q1|early",
  "dossierCardId": "dc-1",
  "questionId": "dc-1.b.q1",
  "targetParty": "b",
  "lieBand": "early",
  "stanceHint": "hedge",
  "truthLevel": "hint",
  "variants": [
    // 10 variants
  ]
}
```

### 입력 자료
- DossierCard 정의: `Knowledge: `07-v3-game-loop-data.json`` → `dossierCards[]`
- 각 카드: name / description / evidenceIds / relatedDisputes / subjectParty / leadId / successConditionSummary / successEffects / challenges[].questions[]

### 예시 — dc-1
```json
{
  "id": "dc-1",
  "name": "오피스텔의 사람들",
  "description": "외도 서사를 가족 돌봄 서사로 뒤집는 첫 반전 카드다.",
  "evidenceIds": ["e-2", "e-4"],
  "relatedDisputes": ["d-1", "h-d4"],
  "subjectParty": "b",
  "challenges": [{
    "targetParty": "b",
    "questions": [{
      "id": "dc-1.b.q1",
      "text": "그 오피스텔에 있던 사람이 외도 상대가 아니라 형과 조카라면, 왜 지금까지 한마디도 못 했습니까?",
      "lockedHint": "형 문자와 조카 알림이 원본 수준까지 열려야 질문이 보인다.",
      "attackVector": "context",
      "requiredLieState": "S2",
      "onSuccess": {"blockVector": "context", "revealAtom": "spouse-v3-01:b:d-1:S3:0", "lieAdvance": true}
    }]
  }]
}
```

### 작성 가이드

#### lieBand × NPC 응답 (각 question별)
- **early**: 부분 인정 (질문 거부 못 함, lockedHint 통과한 상태) but 핵심 회피
- **mid**: 핑계 + 가족 단서 흘림 (이준호 partial_scope) / 위임장 핑계 (박지연 helplessness)
- **late**: 자백 / 깊은 인지 (S4-S5 연결)

#### 캐릭터 voice
- targetParty=b (이준호): avoidant — answer_delay → partial_scope → 자백
- targetParty=a (박지연): victim_cosplay → helplessness → soft_confession

---

## Part 2: witness 채널 (v 확장)

### 키 패턴
기존: `{witnessId}|{depth}` (9 cells)
- witnessId: w-1, w-2, w-3
- depth: vague, partial, full

### 분량
- 9 cells × 10v = 90 entries (기존 27 → +63)

### 증인 정보
| witnessId | name | role | sentiment | 관련 dispute | 해금 dossier |
|---|---|---|---|---|---|
| w-1 | (오피스텔 경비) | 58, 경비원 | neutral | d-1 | dc-1 |
| w-2 | (은행 직원) | 32, 은행원 | neutral, hiddenAgenda: 자기 책임 불거질까 조심 | h-d3 / h-d4 | dc-3 / dc-4 |
| w-3 | 박미라 | 37, 카페 운영, A의 친구 | **pro_a 편향 (sentimentToA: 40)**, hiddenAgenda: 자기 링크 책임 불거질까 표현 조심 | h-d3 / h-d4 | dc-3 / dc-5 |

⚠️ **w-3 박미라**:
- addressA: "지연 씨" / addressB: "준호 씨"
- "지연 씨가 '남편이 바람이면 내 돈부터 지키겠다'고 했다. 내가 투자방 링크를 보냈다."
- **h-d3 친구이지 오피스텔 무관**

### 출력 형식
```json
{
  "key": "w-3|partial",
  "witnessId": "w-3",
  "depth": "partial",
  "stanceHint": "answer",
  "truthLevel": "partial",
  "variants": [
    // 10 variants
  ]
}
```

### 작성 가이드

#### depth (정보 깊이)
- **vague**: 일반적 인상만 (구체 시각/금액 X)
- **partial**: 일부 사실 + 자기 책임 회피 (hiddenAgenda 작용)
- **full**: 핵심 사실 전부 (재판관 추궁 시 어쩔 수 없이 공개)

#### 증인별 voice 차이
- w-1 (경비, neutral): 사무적 / "그날 차량 본 적 있다"
- w-2 (은행, neutral + hiddenAgenda): 절차 강조 / 자기 절차 위반 가능성 회피
- w-3 (박미라, pro_a + hiddenAgenda): 친구 옹호 + 자기 링크 책임 회피 ("지연 씨가 ~"라며 친근감)

### 입력 자료
- witnessProfile: `Knowledge: `04-case-family-01.json`` → `witnesses[]` 또는 `socialGraph`
- speechStyle / addressJudge / hiddenAgenda 정합 유지

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] dossier: lockedHint 통과 후 발화 (S0~S1 거부 X — 이미 해금된 상태)
- [ ] dossier: requiredLieState 시점부터 사용 가능
- [ ] dossier: revealAtom 정합 (해당 atom의 사실을 NPC가 인정 또는 회피)
- [ ] witness: 각 증인 hiddenAgenda 표현에 반영
- [ ] witness: w-3 박미라는 h-d3 친구이지 오피스텔 무관
- [ ] witness: depth별 정보 단계적 공개 (Truth Throttle)
