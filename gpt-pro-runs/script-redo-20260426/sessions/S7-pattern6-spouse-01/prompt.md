# S7 — 잘못 패턴 #6 보정 (spouse-01)

## 작업 목표
**spouse-01 통합본에서 잘못 패턴 #6 차원 보정**. 단순 어휘 교체 X, 9차원 맥락-의미 정확성 살림.

## 입력 source
- `01-case-spouse-01.json` — 사건 정의
- `03-scriptedText-spouse-01-full.json` — **현재 통합본** (4,677v / 18ch)
- `04-story-v2-3cases.md` — spouse 사건 핵심
- `05-user-pattern-correction.md` — **사용자 모범 patch 4** ★
- `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ 사용자 모범 patch 4 (필수 일관 적용)

| Patch | 잘못 (메인 자동) → 보정 (사용자 직접) | 차원 |
|---|---|---|
| 1 | "쪽이었는데" → "주장이었는데" | 인지 단계 약화 |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" | 정보 → 동기 추궁 |
| 3 | "흐리면" → "밝히지 않으면" | 추상 → 직접 행동 |
| 4 | "가족 돌봄으로" → "가족을 돌본 것이라고" | 명사형 → 동사형 자연체 |

## spouse-01 사건 핵심
- A 박지연 victim_cosplay
- B 이준호 avoidant
- 5,000만 원 증발 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기

## 검출 패턴 (대상)

### A. noun_action (명사형 → 동사형 자연체) ★
패턴: `(\S+)\s+돌봄|(\S+)\s+지원|(\S+)\s+처리|(\S+)\s+회피|(\S+)\s+은폐`

**잘못**:
- ❌ "가족 지원이었다고 말씀하십니다"
- ❌ "출처 은폐로 보입니다"

**보정 (동사형)**:
- ✅ "가족을 도운 것이었다고 말씀하십니다"
- ✅ "출처를 숨긴 것으로 보입니다"

### B. weak_쪽 (약한 단어 — NPC voice 보존)
패턴: `쪽이었\b|쪽인\b|쪽은\b|쪽까지|쪽으로의|판단이 바뀐 쪽`

**처리 원칙**:
- 재판관 발화 → "쪽" 회피, 명확한 표현으로 ("이쪽" → "이 시점에서", "쪽으로" → "방향으로/측면에서")
- NPC 발화 (특히 avoidant 이준호) → archetype 보존, 모호어 유지 가능
- 인지 약화 표현 → "주장 → 의견 / 정황" 등 명시 (사용자 patch 1)

### C. 사용자 모범 4 적용 대상
- "쪽이었는데" / "쪽으로 말씀하셨" → "주장/의견이었는데"
- "무엇을 알고" / "무엇을 보고" → "왜 그렇게 확신하고"
- "흐리면" / "흐릴 수 없" → "밝히지 않으면"
- "{X} 돌봄/지원" → "{X}을 돌본/도운 것"

## 9차원 검토 가이드

각 보정 시:

1. **모순 종류** — 사실 / 입장 / 인지 단계
2. **NPC archetype**: 박지연 victim_cosplay (강한 단정) / 이준호 avoidant (모호어 보존)
3. **lieState 단계** (S0~S5)
4. **추궁 차원** — 정보 / 동기 / 책임 / 인지
5. **NPC 발언 본질**
6. **인지 변화 단계** — "확실 → 정황 해석 → 인정" / "오해 → 사정 → 자백"
7. **호칭** — "박지연 씨" / "이준호 씨" / 증인 실명
8. **합니다체**
9. **공개 가능 정보** (Truth Throttle)

## 작업 절차

### 1단계: 검출
- `03-scriptedText-spouse-01-full.json` 모든 채널 순회
- noun_action / weak_쪽 / 사용자 모범 4 적용 대상 검출

### 2단계: 9차원 매핑
- 각 검출 항목 메타 (party / disputeId / lieState / questionType / tone) 매핑
- archetype 톤 무게 검토
- 추궁 차원 식별

### 3단계: 보정 작성
- 글자수 ±5자 편차 허용 (큰 틀 30~70/40~80/20~50 유지)
- archetype voice 보존
- 단순 어휘 교체 시 의미 손상 위험 검토 → skipped 분류 (이유 명시)

## 출력 포맷

`output/correction-pattern6-spouse-01.json`:

```json
{
  "caseId": "spouse-01",
  "session": "S7-pattern6-correction",
  "version": "v1",
  "generatedAt": "2026-04-26T...",
  "totalDetected": N,
  "totalCorrected": M,
  "skipped": [
    {
      "id": "...",
      "category": "weak_쪽",
      "text": "...",
      "reason": "avoidant archetype 모호어 보존"
    }
  ],
  "patches": [
    {
      "channel": "interrogation",
      "id": "{variant id}",
      "category": "noun_action" | "weak_쪽" | "user_pattern_1~4",
      "before": "{현재 통합본 정확한 text}",
      "after": "{보정된 text}",
      "dimension_check": {
        "archetype": "...",
        "lieState": "...",
        "interrogation_dimension": "정보/동기/책임/인지",
        "reasoning": "..."
      }
    },
    ...
  ]
}
```

## 검증 체크리스트 (제출 전)

- [ ] **모든 before 본문이 03-scriptedText-spouse-01-full.json의 실제 text와 정확히 일치**
- [ ] noun_action 보정 모두 동사형 자연체
- [ ] weak_쪽 NPC voice 보존 항목은 skipped로 분류 + 이유 명시
- [ ] 사용자 모범 4 patch 패턴 일관
- [ ] archetype 톤 차별화 (박지연 강한 단정 / 이준호 모호어)
- [ ] 사건 설정 (시댁 갈등 / 형 빚 / 위임장 / 투자 사기) 정확
- [ ] 글자수 ±5 편차 내
- [ ] 의미 손상 없음
