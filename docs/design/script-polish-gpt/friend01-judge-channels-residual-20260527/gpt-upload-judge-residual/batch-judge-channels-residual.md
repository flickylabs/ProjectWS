# friend-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (18 entries)

> 본 file을 진행하기 전 `policy-01-natural-korean.md` 와 `policy-02-truth-disclosure.md` 를 정독해 주세요.

---

## 본 batch 특이성

- 18 unique entries 1:1 polish
- 채널 구성: judge_question: 10 / judge_contradiction: 5 / judge_witness_summon: 3
- 패턴 분포: 강조부사:차분히 5 + 강조부사:끝까지 3 + 강조부사:그렇게 3 + 추상명사:그_판단 2 + 자기지시:자신 2 + 강조부사:진짜 1 + 직역어미:이어집니다 1 + 추상명사:그_부분 1
- 자기지시 정책 분리:
  - **자기지시 "본인" only** (정책 부합, 보존) → batch에서 이미 제외
  - **자기지시 "자신" only** (자신 → 본인 통일) → 본 batch 포함 (2 entries)
  - **다른 어색 패턴 + 자기지시** (자연화 + 본인 보존/자신 통일) → 본 batch 포함 (16 entries)

---

## 변경 대상 18 entries

| ID | channel | party | lieBand | stage | qt | 패턴 | KO 원본 |
|----|---------|-------|---------|-------|-----|------|---------|
| judgec-d-1-hard-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 송다은 씨, 자료를 확인하지 않고 사람부터 규정했습니다. 왜 그렇게 확신했습니까. |
| judgec-d-2-mid-v1 | judge_contradiction | - | - | - | - | 추상명사:그_판단 | 최수민 씨, 답장의 성격이 다르다면 왜 바로 보이지 않았습니까. 그 판단을 설명하십시오. |
| judgec-d-3-hard-v2 | judge_contradiction | - | - | - | - | 추상명사:그_판단 | 송다은 씨, 가족을 감싸려고 자료를 밀어냈다면 그 판단도 책임입니다. |
| judgec-d-4-hard-v3 | judge_contradiction | - | - | - | - | 강조부사:차분히 | 두 분, 과거 투자 명목 피해와 손절의 순서를 기준 사실로 보겠습니다. 차분히 답하십시오. |
| judgec-d-4-soft-v1 | judge_contradiction | - | - | - | - | 직역어미:이어집니다 | 최수민 씨, 변심처럼 보였던 손절이 돈을 잃은 피해와 이어집니다. 왜 끝내 말하지 못했습니까. |
| judgeq-d-1-empathy_approach-1-v5 | judge_question | - | - | - | empathy_approach | 강조부사:그렇게 | 송다은 씨, 결혼 앞에서 그 일이 왜 그렇게 크게 다가왔습니까. |
| judgeq-d-1-empathy_approach-2-v3 | judge_question | - | - | - | empathy_approach | 강조부사:차분히 | 두 분, 서로에게 기대하지 못한 지점을 차분히 설명하십시오. |
| judgeq-d-1-motive_search-3-v5 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 송다은 씨, 상대의 설명 가능성을 왜 끝까지 낮게 보셨습니까. |
| judgeq-d-2-empathy_approach-3-v5 | judge_question | - | - | - | empathy_approach | 자기지시:자신 | 송다은 씨, 예비신랑의 잘못을 보며 자신을 탓한 부분이 있습니까. |
| judgeq-d-2-fact_pursuit-2-v1 | judge_question | - | - | - | fact_pursuit | 강조부사:차분히 | 최수민 씨, 부담스러운 말이 오갔을 때 어떻게 선을 그었는지 차분히 말씀하십시오. |
| judgeq-d-4-fact_pursuit-4-v3 | judge_question | - | - | - | fact_pursuit | 강조부사:진짜 | 두 분, 과거 손절의 진짜 비용을 각자 어떻게 받아들이십니까. |
| judgeq-d-4-motive_search-1-v5 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 송다은 씨, 최수민 씨에게 끝까지 묻지 않은 이유가 무엇입니까. |
| judgeq-d-4-motive_search-4-v1 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 최수민 씨, 끝까지 숨긴 선택이 결국 누구를 보호했다고 보십니까. |
| judgeq-d-4-motive_search-4-v4 | judge_question | - | - | - | motive_search | 자기지시:자신 | 최수민 씨, 자신을 불리한 위치에 둔 선택이 반복된 이유를 설명하십시오. |
| judgeq-d-4-motive_search-4-v5 | judge_question | - | - | - | motive_search | 강조부사:그렇게 | 송다은 씨, 최수민 씨를 잃게 만든 결론을 왜 그렇게 빨리 믿었습니까. |
| judgewitness-w-1-mid-v5 | judge_witness_summon | - | - | - | - | 추상명사:그_부분 | 김세라 씨를 부르겠습니다. 부끄러운 동조가 있었다면 그 부분도 말해야 합니다. |
| judgewitness-w-2-soft-v5 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 박준혁 씨를 통해 예비신랑 연락의 선후관계를 차분히 확인하겠습니다. |
| judgewitness-w-3-soft-v5 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 오미경 씨를 통해 과거 손절 원인을 차분히 확인하겠습니다. |

---

## 출력 형식

```
## friend-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (18 entries) 결과

judgec-d-1-hard-v2:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>

... (18 entries 모두)
```

### 출력 시 주의사항

1. ID 표 그대로 사용
2. 변경 후 텍스트는 자연 한국어 (원문 길이/리듬 보존)
3. 변경 영역은 짧고 명료
4. 채널별 재판관 톤 보존 (jec soft/mid/hard / jq 일반 추궁 / jc 확인 형식 / jws 격식)
5. **자기지시 정책**: "자신" → "본인" 통일 / "본인" 보존 (정책 부합)
6. **직역 어미 자연화**: "가리킵니다 / 드러납니다 / 이어집니다 / 나타납니다"
7. **강조 부사 정밀**: "그렇게 / 끝까지 / 차분히 / 완전히 / 진짜"
8. **추상명사 구체화**: "그 부분 / 그 점 / 그 판단 / 그 결론 / 그 상황" → 구체 referent
9. **진실 누설 자가 점검**: friend-01 hidden keyword 신규 도입 X
