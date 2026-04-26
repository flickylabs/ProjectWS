# GPT Pro 의뢰 — 잘못 패턴 #6 보정 (3 사건 noun_action / weak_쪽 / 사용자 모범 4)

## 작업 목표
**3 사건 통합본에서 잘못 패턴 #6 차원 보정**. 단순 어휘 교체 X, 9차원 맥락-의미 정확성 살림.

### 검출 결과
| 사건 | noun_action | weak_쪽 | 합계 |
|---|---|---|---|
| spouse-01 | (이미 1차 자동 보정 후 재검토 가치 미미) | 104건 | - |
| family-01 | 120건 | 55건 | 175건 |
| friend-01 | 8건 | 101건 | 109건 |

## ⚠️ 중요: 단순 어휘 교체 X

이전 메인 자동 보정 정밀도 낮음 (1차 후 19건 거부). 사용자가 직접 검토 → 모범 4 patch 제시:

| Patch | 잘못 (메인 자동) → 보정 (사용자 직접) | 차원 |
|---|---|---|
| 1 | "쪽이었는데" → "주장이었는데" | 인지 단계 약화 |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" | 정보 → 동기 추궁 |
| 3 | "흐리면" → "밝히지 않으면" | 추상 → 직접 행동 |
| 4 | "가족 돌봄으로" → "가족을 돌본 것이라고" | 명사형 → 동사형 자연체 |

## 보정 차원 (9차원 + α)

각 보정 시 다음 차원 정확 매핑:

1. **모순의 종류** — 사실 / 입장 / 인지 단계 변화
2. **NPC archetype**:
   - spouse: 박지연 victim_cosplay / 이준호 avoidant
   - family: 윤태성 confrontational / 윤정후 affect_flattening
   - friend: 송다은 premature_summary / 최수민 affect_flattening
3. **lieState 단계** (S0~S5)
4. **추궁 차원** — 정보 / 동기 / 책임 / 인지
5. **NPC 마지막 발언 맥락** — 직접 인용 X but 본질 정확히
6. **인지 변화 단계** — "확실 → 정황 해석 → 인정"
7. **호칭 규칙**
8. **합니다체 유지**
9. **공개 가능 정보** (Truth Throttle)

## 검출 항목 카테고리

### A. noun_action — 명사형 → 동사형 자연체
패턴: "{X} 돌봄", "{X} 지원", "{X} 처리", "{X} 회피", "{X} 은폐"

**잘못**:
- ❌ "가족 지원이었다고 말씀하십니다"
- ❌ "출처 은폐로 보입니다"
- ❌ "정황 회피로 일관하셨습니다"

**보정 (동사형 풀어쓰기)**:
- ✅ "가족을 도운 것이었다고 말씀하십니다"
- ✅ "출처를 숨긴 것으로 보입니다"
- ✅ "정황을 피하시는 모습이 이어지셨습니다"

### B. weak_쪽 — 약한 단어 "쪽" 처리
**중요**: "쪽"은 NPC voice 보존 대상. 무조건 변환 X. 9차원 검토 후:

- 재판관 발화 → "쪽" 회피, 명확한 표현 ("이쪽" → "이 시점에서", "쪽으로" → "방향으로/측면에서")
- NPC 발화 → archetype 보존 (예: avoidant 이준호의 "그 쪽 일이라" → 자연 모호어, 유지)
- 인지 약화 표현이라면 → "주장 → 의견 / 정황" 등 명시

### C. 사용자 모범 4 patch 적용 대상 검색
다음 패턴이 있는 variant 모두 보정:

1. "쪽이었는데" / "쪽으로 말씀하셨" → "주장/의견이었는데" 류
2. "무엇을 알고" / "무엇을 보고" → "왜 그렇게 확신하고" 류
3. "흐리면" / "흐릴 수 없" → "밝히지 않으면" 류
4. "{X} 돌봄/지원" → "{X}을 돌본/도운 것" 류

## 사건별 핵심 설정 (보정 시 충돌 금지)

### spouse-01
- B 이준호 (avoidant) — 모호어 일부 보존
- 외도 의심 / 조카 돌봄 / 시댁 갈등 / 위임장 조작 / 투자 사기
- 5,000만 원 증발 (3,000 적금 해지 + 2,000 사기 손실)

### family-01
- ⚠️ **유서 비율 절대**: A 40 / B 60 (B가 자기 몫 90→60 줄임)
- A 윤태성 confrontational / B 윤정후 affect_flattening
- 출생 비밀 / 20년 지원 / 어머니 일기장

### friend-01
- A 송다은 premature_summary (빠른 단정) / B 최수민 affect_flattening (침묵)
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

## 작업 절차

### 1단계: 통합본에서 검출
- `src/data/scriptedText/{spouse,family,friend}-01.json` 읽음
- noun_action 패턴 + weak_쪽 패턴 + 사용자 모범 4 적용 대상 검색
- 검출 list 작성

### 2단계: 9차원 검토
각 검출 항목에 대해:
- 9차원 메타 (party / disputeId / lieState / questionType / tone / 발동 맥락) 정확 매핑
- archetype 톤 무게 검토
- 추궁 차원 식별
- 의미 정확성 우선

### 3단계: 보정 작성
- 글자수 ±5자 편차 허용 (단 가이드 30~70/40~80/20~50 큰 틀 유지)
- 단순 어휘 교체 시 의미 손상 위험 검토
- archetype voice 보존

### 4단계: 산출물 생성

각 사건당 별도 patch 파일:
```
correction-pattern6-spouse-01.json
correction-pattern6-family-01.json
correction-pattern6-friend-01.json
```

각 파일 구조:
```json
{
  "caseId": "{caseId}",
  "version": "pattern6-v1",
  "generatedAt": "...",
  "totalDetected": N,
  "totalCorrected": M,
  "skipped": [/* NPC voice 보존 등 / 이유 명시 */],
  "patches": [
    {
      "channel": "interrogation",
      "id": "{variant id}",
      "category": "noun_action" | "weak_쪽" | "user_pattern_1~4",
      "before": "{현재 통합본 정확한 text}",
      "after": "{보정된 text}",
      "dimension_check": {
        "archetype": "...",
        "lieState": "S0",
        "interrogation_dimension": "정보/동기/책임/인지",
        "reasoning": "..."
      }
    },
    ...
  ]
}
```

## 잘못 패턴 #1~#8 회피

특히:
- #4 신규 작성 vs 보완 혼동 X — 기존 본문의 의미를 보존하면서 표현만 보정
- #6 단순 어휘 교체 X — 9차원 맥락 검토 필수
- #8 사건 설정 일치 검증

## 검증 체크리스트 (제출 전 필수)

- [ ] **모든 before 본문이 현재 통합본의 실제 text와 정확히 일치**
- [ ] noun_action 보정은 모두 동사형 자연체 (명사구 X)
- [ ] weak_쪽 NPC voice 보존 항목은 skipped에 분류 + 이유 명시
- [ ] 사용자 모범 4 patch 패턴 일관
- [ ] 사건별 archetype 톤 차별화
- [ ] 사건 설정 (family 비율 / friend 아버지 돈 / spouse 시댁 갈등) 정확
- [ ] 글자수 ±5 편차 내
- [ ] 의미 손상 없음 (NPC 본질 발언 보존)

## 메모리 참조
- `memory/feedback_revision_meaning_over_form.md` 잘못 패턴 #6
- `memory/story_v2_confirmed_3cases.md` 사건 설정
- `memory/haeyo_policy_decision.md` 해요체 정책
