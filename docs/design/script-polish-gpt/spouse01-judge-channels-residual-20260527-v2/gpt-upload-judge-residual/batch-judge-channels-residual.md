# spouse-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (20 entries)

> 본 file을 진행하기 전 `policy-01-natural-korean.md` 와 `policy-02-truth-disclosure.md` 를 정독해 주세요.

---

## 본 batch 특이성

- 20 unique entries 1:1 polish
- 채널 구성: judge_evidence_combo: 9 / judge_question: 6 / judge_contradiction: 5
- 패턴 분포: 강조부사:그렇게 8 + 강조부사:끝까지 5 + 추상명사:그_점 2 + 직역어미:이어집니다 1 + 피동:느껴집니다 1 + 추상명사:그_상황 1 + 추상명사:그_부분 1 + 자기지시:본인 1 + 추상명사:그_판단 1
- 자기지시 정책 분리:
  - **자기지시 "본인" only** (정책 부합, 보존) → batch에서 이미 제외
  - **자기지시 "자신" only** (자신 → 본인 통일) → 본 batch 포함 (0 entries)
  - **다른 어색 패턴 + 자기지시** (자연화 + 본인 보존/자신 통일) → 본 batch 포함 (20 entries)

---

## 변경 대상 20 entries

| ID | channel | party | lieBand | stage | qt | 패턴 | KO 원본 |
|----|---------|-------|---------|-------|-----|------|---------|
| judgec-d-1-hard-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 박지연 씨, 외도라고 단정한 이유를 밝히지 않으면 이후 행동을 피해자 입장만으로 설명할 수 없습니다. 왜 그렇게 확신했습니까. |
| judgec-d-1-hard-v3 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 두 분, 정황 해석만 반복해서는 더 나아갈 수 없습니다. 무엇을 숨겼고 왜 그렇게 단정 지었는지 지금 말씀해 주십시오. |
| judgec-d-1-mid-v5 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 박지연 씨, 정황을 본 것과 외도라고 단정한 것은 다릅니다. 왜 그렇게 확신하고 밀어붙이셨습니까. |
| judgec-d-1-soft-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 박지연 씨, 처음에는 외도라고 단정하셨지만, 지금은 정황상 그렇게 받아들였다는 입장입니다. 판단이 왜 달라졌는지 말씀해 주십시오. |
| judgec-h-d4-hard-v1 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 두 분 모두 자기 책임을 따로 떼어 내려고 하고 있습니다. 숨긴 일과 실행한 일은 다른 문제입니다. 누가 먼저 왜 그렇게 행동했는지 답하십시오. |
| judgecombo-dc-1-b-q1-hard-v5 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 이준호 씨, 두 자료는 같은 밤의 같은 장소로 이어집니다. 그 안에 있었던 일을 지금 인정해 주십시오. |
| judgecombo-dc-2-b-q1-hard-v1 | judge_evidence_combo | - | - | - | - | 추상명사:그_상황 | 이준호 씨, 통화기록과 발신자 미상 문자가 숨긴 사정을 직접 가리키고 있습니다. 그 상황에 대해 무엇을 숨기신 것인지 지금 답해 주십시오. |
| judgecombo-dc-2-b-q1-hard-v3 | judge_evidence_combo | - | - | - | - | 강조부사:끝까지 | 이준호 씨, 통화기록과 발신자 미상 문자가 있는 상황에서, 그곳에 가신 사실을 왜 끝까지 숨기셨는지도 밝히셔야 합니다. 바로 답하십시오. |
| judgecombo-dc-2-b-q1-mid-v4 | judge_evidence_combo | - | - | - | - | 강조부사:끝까지 | 이준호 씨, 발신자 미상 문자와 통화기록을 보면 외도는 아니었다는 말만으로는 설명이 부족합니다. 그 너머의 사정을 왜 끝까지 숨기셨습니까. |
| judgecombo-dc-2-b-q1-soft-v5 | judge_evidence_combo | - | - | - | - | 피동:느껴집니다 | 이준호 씨, 통화기록과 발신자 미상 문자를 나란히 놓으면 외도보다 다른 부담이 더 크게 느껴집니다. 그게 무엇인지 말씀해 주시겠습니까. |
| judgecombo-dc-3-b-q1-soft-v1 | judge_evidence_combo | - | - | - | - | 강조부사:끝까지 | 이준호 씨, 발신자 미상 문자와 개인 계좌 출금 내역을 함께 보겠습니다. 별도 사용처로 큰돈을 옮기신 사실을 박지연 씨에게 왜 끝까지 알리지 못하셨는지 설명해 주시겠습니까. |
| judgecombo-dc-3-b-q2-mid-v1 | judge_evidence_combo | - | - | - | - | 추상명사:그_부분 | 이준호 씨, 발신자 미상 문자와 출금 내역상 별도 사용처를 위한 자금 흐름은 확인됩니다. 그러나 박지연 씨를 배제한 선택까지 설명되지는 않습니다. 그 부분을 답해 주십시오. |
| judgecombo-dc-3-b-q2-mid-v4 | judge_evidence_combo | - | - | - | - | 추상명사:그_점 | 이준호 씨, 발신자 미상 문자와 출금 기록의 사실관계와 별개로, 부부 사이의 신뢰를 깬 일은 또다른 문제입니다. 그 점을 고려해 말씀해 주십시오. |
| judgecombo-dc-4-a-q1-hard-v2 | judge_evidence_combo | - | - | - | - | 자기지시:본인 / 추상명사:그_판단 | 박지연 씨, 투자방 텔레그램과 송금 기록은 이준호 씨에게 확인을 받기 전에 본인이 먼저 움직이셨음을 보여줍니다. 그 판단을 인정하고 말씀해 주십시오. |
| judgeq-d-1-fact_pursuit-4-v1 | judge_question | - | - | - | fact_pursuit | 강조부사:끝까지 | 이준호 씨, 개인적인 이유로 오피스텔에 간 것이라면 왜 박지연 씨에게 끝까지 숨기셨는지 답하십시오. |
| judgeq-d-1-motive_search-2-v5 | judge_question | - | - | - | motive_search | 강조부사:그렇게 | 두 분, 한쪽은 말하지 않고 한쪽은 묻지 않은 시간이 왜 그렇게 길어졌는지 각각 답해 주십시오. |
| judgeq-d-1-motive_search-4-v4 | judge_question | - | - | - | motive_search | 강조부사:그렇게 | 박지연 씨, 왜 그렇게 확신했고 외도 쪽으로 밀어붙였는지 그 마음의 근거를 답하십시오. |
| judgeq-d-2-motive_search-4-v1 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 이준호 씨, 급한 사정이 있었다 해도 배우자 동의 없이 밀어붙인 이유를 끝까지 답하십시오. |
| judgeq-h-d3-motive_search-3-v5 | judge_question | - | - | - | motive_search | 추상명사:그_점 | 박지연 씨, 두려움이 있었다 해도 서류에 손댄 선택은 직접 한 행동입니다. 그 점을 어떻게 받아들이십니까. |
| judgeq-h-d3-motive_search-4-v5 | judge_question | - | - | - | motive_search | 강조부사:그렇게 | 박지연 씨, 왜 그렇게 확신했고, 돈을 먼저 빼야 한다는 결론까지 밀어붙였습니까. |

---

## 출력 형식

```
## spouse-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (20 entries) 결과

judgec-d-1-hard-v2:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>

... (20 entries 모두)
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
9. **진실 누설 자가 점검**: spouse-01 hidden keyword 신규 도입 X
