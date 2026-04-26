# S6: judge 채널 보강 + 신규

**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
재판관 발화 채널 4개 (judge_question / judge_contradiction h-d3/h-d4 추가 + judge_evidence_combo 신규 + judge_witness_summon 신규).

## 분량
| 채널 | 작업 | 추가 entries |
|---|---|---|
| judge_question | h-d3/h-d4 추가: 24 → 48 cells × 5v = 240 | **+192** |
| judge_contradiction | h-d3/h-d4 추가: 6 → 12 cells × 5v = 60 | **+42** |
| judge_evidence_combo (신규) | 8 dossier × 3 tone × 5v = 120 | **+120** |
| judge_witness_summon (신규) | 3 witness × 3 tone × 5v = 45 | **+45** |
| **합계** | | **+399** |

---

## Part 1: judge_question (h-d3/h-d4 추가)

### 키 패턴
- `{disputeId}|{questionType}|{depth}`
- 4 disputes × 3 qType × 4 depth = **48 cells**

### 추가 cells (h-d3, h-d4)
- 24 cells: h-d3 / h-d4 × 3 qType × 4 depth
- 각 5v = 120 entries 신규
- + 기존 24 cells (d-1, d-2)도 2v→5v 확장 = +72

### 작성 가이드

#### h-d3 (적금 3,000만 해지)
- depth 1 fact_pursuit: "박지연 씨, 이 적금 해지 절차를 누가 진행했습니까?"
- depth 4 motive_search: "박지연 씨, 위임장에 남편 서명을 직접 쓴 그 순간의 판단을 설명해 주십시오."

#### h-d4 (은폐 순서)
- depth 1 fact_pursuit: "두 분, 어느 쪽이 먼저 숨김의 시작이었는지 시간순으로 정리해 주십시오."
- depth 4 empathy_approach: "이준호 씨, 침묵이 결국 더 큰 손해로 돌아왔다는 사실을 어느 순간 깨달으셨습니까?"

### 출력 형식
```json
{
  "key": "h-d3|fact_pursuit|1",
  "disputeId": "h-d3",
  "questionType": "fact_pursuit",
  "depth": 1,
  "variants": [
    // 5 variants (이준호용 + 박지연용 분리, 또는 양측 호명)
  ]
}
```

---

## Part 2: judge_contradiction (h-d3/h-d4 추가)

### 키 패턴
- `{disputeId}|{tone}` (12 cells = 4d × 3 tone)

### 추가 cells (h-d3, h-d4)
- 6 cells × 5v = 30 신규
- + 기존 6 cells도 3v→5v 확장 = +12

### 작성 가이드 (보정 톤 8원칙 + 잘못 패턴 #6 모범)
- "X 쪽으로" 약한 단어 회피 → "X으로 입장을 옮기셨습니다"
- 정보 추궁 → 동기/심리 추궁
- 명사형 → 동사형 자연체

#### 예시 — h-d3|soft
"박지연 씨, 처음에는 절차였다고 하셨는데 지금은 남편 서명을 직접 쓰셨다는 사실을 인정하십니다. 어느 쪽이 본래의 진술이었습니까?"

#### 예시 — h-d4|hard
"두 분 모두 자기 책임을 분리하려 하십니다. 그러나 숨김과 단정은 서로 단초가 됐습니다. 시간순으로 누가 먼저 무엇을 숨겼는지 분명히 답하십시오."

---

## Part 3: judge_evidence_combo (신규 채널)

### 키 패턴
- `{dossierCardId}|{tone}` (24 cells = 8 dossier 콤보 × 3 tone)
- ⚠️ 8 dossier = DossierCard 5장의 8 question (dc-1.b.q1 / dc-2.b.q1 / dc-3.b.q1 / dc-3.b.q2 / dc-4.a.q1 / dc-4.a.q2 / dc-5.b.q1 / dc-5.a.q1)

### 의미
DossierCard 콤보 발동 시 (e.g., e-2 + e-4로 dc-1 해금) 재판관 발화.

### 출력 형식
```json
{
  "key": "dc-1.b.q1|soft",
  "dossierCardId": "dc-1",
  "questionId": "dc-1.b.q1",
  "tone": "soft",
  "variants": [
    // 5 variants
  ]
}
```

### 작성 가이드 (각 dossier card 활용)

#### dc-1 "오피스텔의 사람들" (e-2+e-4 콤보)
- soft: "이 두 기록을 합치면 그 시각, 그 장소에 누가 있었는지가 분명해집니다. 이준호 씨, 정확히 답변해 주십시오."
- mid: "두 증거가 같은 방향을 가리키고 있습니다. 이준호 씨, 더 미루지 마십시오."
- hard: "이 콤보가 가리키는 것은 분명합니다. 이준호 씨, 핵심을 지금 답하십시오."

#### dc-3 "3,000만 원의 권한" (e-4+e-5 콤보)
- soft: "두 자료를 함께 보면 돈의 흐름이 가족 사정과 맞물립니다. 이준호 씨, 그 흐름을 직접 설명해 주십시오."
- ...

### 입력 자료
- DossierCard 정의: `Knowledge: `07-v3-game-loop-data.json``
- 각 카드의 name / description / successConditionSummary / successEffects

---

## Part 4: judge_witness_summon (신규 채널)

### 키 패턴
- `{witnessId}|{tone}` (9 cells = 3 witness × 3 tone)

### 의미
증인 소환 시 재판관 발화. 증인의 증언이 어떤 쟁점에 어떤 영향을 줄지 명시.

### 출력 형식
```json
{
  "key": "w-1|soft",
  "witnessId": "w-1",
  "tone": "soft",
  "variants": [
    // 5 variants
  ]
}
```

### 작성 가이드

#### w-1 (오피스텔 경비)
- soft: "오피스텔 경비를 부르겠습니다. 그날의 차량 출입 기록을 확인해 보겠습니다."
- mid: "양측 진술이 갈리는 만큼 경비의 직접 증언이 필요합니다."
- hard: "경비를 즉시 소환합니다. 더는 정황 해석으로만 시간을 보낼 수 없습니다."

#### w-3 (박미라 — A의 친구)
- soft: "박미라 씨를 부르겠습니다. 박지연 씨와 가까운 사이로 알고 있습니다."
- mid: "박미라 씨가 알고 있는 부분이 있습니다. 직접 확인하겠습니다."
- hard: "박미라 씨, 들어오십시오. 송금 경로에 대한 증언이 필요합니다."

⚠️ **박미라는 h-d3/h-d4 친구이지 오피스텔 무관**.

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] judge 채널 모두 5v (재판관 정책)
- [ ] 톤 (soft/mid/hard) 일관성
- [ ] judge_evidence_combo: DossierCard name/description 활용 + e-N 조합 명시
- [ ] judge_witness_summon: 각 증인 hiddenAgenda 인지 (w-2/w-3) + addressJudge 정합
- [ ] 보정 톤 8원칙 + 잘못 패턴 #6 (약한 단어 / 명사형 / 정보 추궁) 회피
