# Thread-QW P2 6건 — 사용자 검토용 (D) — 컨텍스트 강화

## 검토 가이드

Thread-QW (Claude) 보고: P2 6건 — 점진 보완 (낮은 우선순위).

각 항목 검토 방향:
1. **그대로 두기** — 게임 영향이 작다고 판단
2. **메인에게 직접 보정 요청** — 작은 영역 (단순 어휘 교체)
3. **GPT 추가 의뢰 작성** — 광범위 보정 필요 (예: 60v 영향)

---

## 사건별 컨텍스트 (참조)

### spouse-01 — "새벽 통화기록"
- A 박지연 (victim_cosplay) / B 이준호 (avoidant)

### family-01 — "치매 어머니의 유서"
- A 윤태성 (confrontational) / B 윤정후 (affect_flattening)

### friend-01 — "손절한 절친"
- A 송다은 (premature_summary) / B 최수민 (affect_flattening)

---

## D-1: family-01 / judge_contradiction

- **카테고리**: patch1 application gap
- **영향**: 60 samples
- **채널 의미**: 재판관 모순 추궁 (3 tone: soft/mid/hard)
- **화자**: 재판관 → 당사자
- **설명**: patch 1 (주장/의견 인지단계 약화)가 spouse-01 (30%) 대비 family-01에서 0% 적용. 60 variants 전체에 대해 단계적 보강 검토 권장.

**해당 채널 sample entries (참조용)**:

- **`d-1|soft`** (dispute=d-1 / tone=soft)
  - `judgec-d-1-soft-v1`: 윤정후 씨, 단순 방문에서 유서 대화 인정으로 입장이 바뀌었습니다. 어디까지가 사실입니까.
  - `judgec-d-1-soft-v2`: 윤태성 씨, 전면 무효 주장과 일부 의사 인정 사이의 차이를 설명해 주십시오.

- **`d-1|mid`** (dispute=d-1 / tone=mid)
  - `judgec-d-1-mid-v1`: 윤정후 씨, 처음엔 동석에 가까웠지만 지금은 유서 절차에 들어간 셈입니다. 이유를 답해 주십시오.
  - `judgec-d-1-mid-v2`: 윤태성 씨, 어머니가 전혀 판단 못 했다는 주장을 지금 일부 접고 있습니다. 왜 바뀌었습니까.

- **`d-1|hard`** (dispute=d-1 / tone=hard)
  - `judgec-d-1-hard-v1`: 윤정후 씨, 방문과 낭독을 인정하면서 개입 책임만 피하고 있습니다. 지금 선을 분명히 하십시오.
  - `judgec-d-1-hard-v2`: 윤태성 씨, 어머니 상태를 단정했다가 일부 가능성을 인정했습니다. 왜 그렇게 밀어붙였습니까.

**참고: 사용자 모범 patch 1**
> "쪽이었는데" → "주장이었는데" (인지 단계 약화: 강한 단정 → 한 발 물러선 의견)

**spouse-01 적용 예시 (참조)**:
- `judgec-d-1-soft-v1`: 이준호 씨, 처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 형과 조카를 돌본 일이었다고 입장을 옮기셨습니다. 그 사이를 차분히 정리해 주십시오.
- `judgec-d-1-soft-v2`: 박지연 씨, 처음에는 외도라고 단정한 주장이었는데 지금은 정황을 그렇게 받아들였다는 의견으로 낮아졌습니다. 왜 판단이 달라졌습니까.

---

## D-2: friend-01 / judge_contradiction

- **카테고리**: patch1 application gap
- **영향**: 60 samples
- **채널 의미**: 재판관 모순 추궁 (3 tone: soft/mid/hard)
- **화자**: 재판관 → 당사자
- **설명**: patch 1 적용도 < 5%. spouse-01 패턴 참고하여 점진 보강.

**해당 채널 sample entries (참조용)**:

- **`d-1|soft`** (dispute=d-1 / tone=soft)
  - `judgec-d-1-soft-v1`: 최수민 씨, 처음엔 안부라 하셨지만 지금은 경고 목적을 인정하십니다. 왜 달라졌습니까.
  - `judgec-d-1-soft-v2`: 송다은 씨, 집착이라고 단정한 주장과 경고 가능성이 함께 남았습니다. 판단 근거를 다시 말하십시오.

- **`d-1|mid`** (dispute=d-1 / tone=mid)
  - `judgec-d-1-mid-v1`: 최수민 씨, 목적을 숨기고 연락만 인정하면 의심이 커집니다. 왜 처음부터 말하지 않았습니까.
  - `judgec-d-1-mid-v2`: 송다은 씨, 확인 없이 집착으로 못 박은 판단을 계속 유지할 근거가 있습니까.

- **`d-1|hard`** (dispute=d-1 / tone=hard)
  - `judgec-d-1-hard-v1`: 최수민 씨, 의도를 감춘 채 반복해서 연락한 책임을 피할 수 없습니다. 핵심을 답하십시오.
  - `judgec-d-1-hard-v2`: 송다은 씨, 자료를 확인하지 않고 사람부터 규정했습니다. 왜 그렇게 확신했습니까.

**참고: 사용자 모범 patch 1**
> "쪽이었는데" → "주장이었는데" (인지 단계 약화: 강한 단정 → 한 발 물러선 의견)

**spouse-01 적용 예시 (참조)**:
- `judgec-d-1-soft-v1`: 이준호 씨, 처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 형과 조카를 돌본 일이었다고 입장을 옮기셨습니다. 그 사이를 차분히 정리해 주십시오.
- `judgec-d-1-soft-v2`: 박지연 씨, 처음에는 외도라고 단정한 주장이었는데 지금은 정황을 그렇게 받아들였다는 의견으로 낮아졌습니다. 왜 판단이 달라졌습니까.

---

## D-3: family-01 / judge_question

- **카테고리**: monotone ending diversity
- **영향**: 10 samples
- **채널 의미**: 재판관 정중 질문 (4 questionType × 4 depth)
- **화자**: 재판관 → 당사자
- **설명**: '설명해 주십시오.' 어미 단조 끝맺음 10건 / 240 (4%). 어미 다양화 (예: '~을 들려주시겠습니까', '~지 말씀해 주십시오', '~는 무엇입니까').

**해당 채널 sample entries (참조용)**:

- **`d-1|fact_pursuit|1`** (dispute=d-1 / questionType=fact_pursuit / depth=1)
  - `judgeq-d-1-fact_pursuit-1-v1`: 윤정후 씨, 유서가 작성되던 무렵 어머니를 얼마나 자주 찾아뵈었는지부터 말씀해 주십시오.
  - `judgeq-d-1-fact_pursuit-1-v2`: 윤태성 씨, 그 시기 어머니 상태가 평소와 달라졌다고 느낀 장면부터 말씀해 주십시오.

- **`d-1|fact_pursuit|2`** (dispute=d-1 / questionType=fact_pursuit / depth=2)
  - `judgeq-d-1-fact_pursuit-2-v1`: 윤정후 씨, 어머니께 유서 내용을 읽어드린 횟수와 그 이유는 무엇입니까.
  - `judgeq-d-1-fact_pursuit-2-v2`: 윤태성 씨, 요양보호사 교체와 공증 시점이 겹친다고 보신 근거는 무엇입니까.

- **`d-1|fact_pursuit|3`** (dispute=d-1 / questionType=fact_pursuit / depth=3)
  - `judgeq-d-1-fact_pursuit-3-v1`: 윤정후 씨, 유서 문구를 설명할 때 어머니가 직접 판단하고 답하셨는지 구체적으로 기억하십니까.
  - `judgeq-d-1-fact_pursuit-3-v2`: 윤태성 씨, 어머니가 스스로 결정하기 어렵다고 보게 된 결정적 순간이 있었습니까.

**단조 어미 sample**:
- `judgeq-d-1-fact-pursuit-4-v3`: 윤정후 씨, 윤태성 씨가 오기 전에 마치려 한 판단을 지금 설명해 주십시오.
- `judgeq-d-1-motive-search-3-v4`: 윤태성 씨, 윤정후 씨가 어머니를 움직였다고 확신한 이유를 설명해 주십시오.
- `judgeq-d-2-motive-search-2-v3`: 윤정후 씨, 윤태성 씨에게 원본을 바로 보이지 못한 부담을 설명해 주십시오.
- `judgeq-d-2-motive_search-4-v1`: 윤정후 씨, 위조라는 걸 알면서도 밀어붙인 이유를 선의라는 말 말고 다시 설명해 주십시오.
- `judgeq-d-3-fact-pursuit-2-v3`: 윤정후 씨, 매달 보낸 돈과 공장 자금이 같은 흐름인지 설명해 주십시오.

---

## D-4: spouse-01 / evidence_present

- **카테고리**: boilerplate duplication across cells
- **영향**: 724 samples
- **채널 의미**: 증거 제시 응답 (party × evidence × lieBand × stage/role)
- **화자**: 당사자 → 재판관
- **설명**: 채널 내 145 중복 텍스트 (총 724건 중복). 같은 메타-발화가 여러 evidence × stage에서 재사용. 게임 플레이 시 반복 노출 위험. 같은 cell 5 variants 다양성은 PASS이므로 우선순위 P2.

**해당 채널 sample entries (참조용)**:

- **`b|e-1|early|self`** (party=b / evidence=e-1 / lieBand=early / subjectRole=self)
  - `b-e-1-early-self-v1`: 그건... 제가 산 겁니다.
  - `b-e-1-early-self-v2`: 차에 있던 영수증들, 제가 결제한 건 맞습니다.

- **`b|e-1|mid|self`** (party=b / evidence=e-1 / lieBand=mid / subjectRole=self)
  - `b-e-1-mid-self-v1`: 가족한테 필요한 것들이었습니다.
  - `b-e-1-mid-self-v2`: 먹을 것하고 생활용품을 같이 산 겁니다. 가족에게 쓸 일이 있었습니다.

- **`b|e-1|late|self`** (party=b / evidence=e-1 / lieBand=late / subjectRole=self)
  - `b-e-1-late-self-v1`: 조카한테 필요한 거 사다 준 겁니다. 참고서는 중학교 2학년 거예요.
  - `b-e-1-late-self-v2`: 컵라면하고 삼각김밥은 저녁거리였고, 머리끈이랑 헤어롤도 그 애가 쓰는 겁니다.

**중복 sample 추출**:
- (5회 등장): 자료의 출처부터 말씀드리면, 제가 직접 확인했습니다. 그래서 그냥 넘길 수 없었습니다.
- (5회 등장): 저는 이 자료를 보고서야 의심을 말로 꺼냈습니다. 전에는 참고 있었습니다.
- (5회 등장): 이게 나온 순간, 제 의심이 혼자 만든 게 아니라고 느꼈습니다.

---

## D-5: family-01 / evidence_present

- **카테고리**: boilerplate duplication across cells
- **영향**: 185 samples
- **채널 의미**: 증거 제시 응답 (party × evidence × lieBand × stage/role)
- **화자**: 당사자 → 재판관
- **설명**: 37 중복 텍스트 (총 185건 중복). 같은 패턴.

**해당 채널 sample entries (참조용)**:

- **`a|e-1|early|both`** (party=a / evidence=e-1 / lieBand=early / subjectRole=both)
  - `a-e-1-early-self-v1`: 어머니를 모시고 산 건 저입니다. 그런데 저한테는 그 정도만 남긴다고요. 납득이 안 됩니다.
  - `a-e-1-early-self-v2`: 돌아가시기 두 달 전 문서라고 적혀 있는데, 그때도 제가 곁에 있었습니다. 그런데 제 몫이 이렇게 적다는 게 말이 됩니까.

- **`a|e-1|mid|both`** (party=a / evidence=e-1 / lieBand=mid / subjectRole=both)
  - `a-e-1-mid-self-v1`: 이 유서가 나온 경위는 제 동생에게 물으셔야 합니다. 저는 결과만 들이받은 사람입니다.
  - `a-e-1-mid-self-v2`: 문서가 최종본이라고는 하지만, 거기까지 가는 동안 무슨 일이 있었는지는 제가 모릅니다. 그걸 밝히셔야 합니다.

- **`a|e-1|late|both`** (party=a / evidence=e-1 / lieBand=late / subjectRole=both)
  - `a-e-1-late-self-v1`: 이제는 보입니다. 이 비율이 정말 어머니 뜻만으로 굳어진 건지, 제 동생 손이 더 크게 작용한 건지 말입니다.
  - `a-e-1-late-self-v2`: 처음엔 그저 화만 났습니다. 지금은 이 문서가 어머니 마음과 제 동생 판단이 뒤섞인 결과 아닌가 의심하게 됩니다.

**중복 sample 추출**:
- (5회 등장): 자료가 말하는 순서가 있습니다. 저는 그 순서를 의심의 근거로 봤습니다.
- (5회 등장): 재판관님, 여기서부터는 결과가 아니라 책임을 봐야 합니다. 그 부분이 제일 걸립니다.
- (5회 등장): 시점이 겹친 건 사실입니다. 다만 제가 그 의미를 너무 빨리 닫았을 수 있습니다.

---

## D-6: friend-01 / judge_question

- **카테고리**: monotone ending diversity
- **영향**: 6 samples
- **채널 의미**: 재판관 정중 질문 (4 questionType × 4 depth)
- **화자**: 재판관 → 당사자
- **설명**: '설명해 주십시오.' 단조 끝맺음 6건 / 240 (2.5%). 미세 영역.

**해당 채널 sample entries (참조용)**:

- **`d-1|fact_pursuit|1`** (dispute=d-1 / questionType=fact_pursuit / depth=1)
  - `judgeq-d-1-fact_pursuit-1-v1`: 최수민 씨, 며칠 동안 이어진 연락이 무엇을 전하려던 것이었는지 먼저 말씀해 주십시오.
  - `judgeq-d-1-fact_pursuit-1-v2`: 송다은 씨, 그 연락을 처음 본 시점과 반응을 정리해 주십시오.

- **`d-1|fact_pursuit|2`** (dispute=d-1 / questionType=fact_pursuit / depth=2)
  - `judgeq-d-1-fact_pursuit-2-v1`: 최수민 씨, 왜 송다은 씨가 아니라 예비신랑에게 먼저 연락했습니까.
  - `judgeq-d-1-fact_pursuit-2-v2`: 송다은 씨, 연락 횟수 말고 집착이라고 본 근거가 더 있었는지 말씀해 주십시오.

- **`d-1|fact_pursuit|3`** (dispute=d-1 / questionType=fact_pursuit / depth=3)
  - `judgeq-d-1-fact_pursuit-3-v1`: 최수민 씨, 그 연락이 경고였다는 근거를 기록에 맞춰 설명하십시오.
  - `judgeq-d-1-fact_pursuit-3-v2`: 송다은 씨, 호감 표현이 없다는 자료를 보고도 왜 단정했습니까.

**단조 어미 sample**:
- `judgeq-d-1-fact_pursuit-1-v4`: 최수민 씨, 전화와 문자가 반복된 순서를 구체적으로 설명해 주십시오.
- `judgeq-d-1-motive_search-4-v5`: 송다은 씨, 집착 프레임을 붙든 심리를 지금 설명해 주십시오.
- `judgeq-d-2-empathy_approach-2-v1`: 최수민 씨, 거절하고도 말하지 못한 압박을 설명해 주십시오.
- `judgeq-d-3-motive_search-3-v4`: 최수민 씨, 과거 피해를 떠올린 순간의 판단을 설명해 주십시오.
- `judgeq-d-3-empathy_approach-2-v4`: 최수민 씨, 다시 같은 장면을 본 두려움을 설명해 주십시오.

---


## 추가 통계 (Thread-QW 보고에서)

### 사용자 모범 4 patch 적용도 (user_pattern_application)
```json
{
  "patch1_weaken": {
    "description": "쪽이었는데 → 주장이었는데 (인지 단계 약화)",
    "applied_in_judge_channels": {
      "spouse-01": {
        "judge_contradiction": "30% (18/60)"
      },
      "family-01": {
        "judge_contradiction": "0% (0/60)"
      },
      "friend-01": {
        "judge_contradiction": "0% (0/60)"
      }
    },
    "preserved_in_npc_voice": 31,
    "preservation_basis": "memory feedback_revision_meaning_over_form.md — 이준호 avoidant 모호어 보존 영역"
  },
  "patch2_motive": {
    "description": "무엇을 알고 → 왜 그렇게 확신하고 (정보 → 동기)",
    "applied_in_judge_question": "6/720 (1%) — fact_pursuit 비중 큰 채널 특성",
    "violations_detected": 0
  },
  "patch3_direct": {
    "description": "흐리면 → 밝히지 않으면 (추상 → 직접)",
    "violations_detected": 0,
    "applied_directly": "0건 — 검출 패턴 부재가 곧 위반 0건"
  },
  "patch4_verb": {
    "description": "X 돌봄/지원 → X을 돌본/도운 것 (명사형 → 동사형)",
    "violations_detected": 0,
    "status": "전 채널 완전 적용 ✓"
  }
}
```

### machine_pattern_detected (단순 기계식)
- 검출 1건

### ambiguous_meaning_detected (의미 모호)
- 검출 0건
