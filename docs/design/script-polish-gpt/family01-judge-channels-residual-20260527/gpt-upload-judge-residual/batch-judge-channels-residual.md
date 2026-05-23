# family-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (56 entries)

> 본 file을 진행하기 전 `policy-01-natural-korean.md` 와 `policy-02-truth-disclosure.md` 를 정독해 주세요.

---

## 본 batch 특이성

- 56 unique entries 1:1 polish
- 채널 구성: judge_evidence_combo: 28 / judge_question: 14 / judge_contradiction: 8 / judge_witness_summon: 6
- 패턴 분포: 강조부사:차분히 19 + 자기지시:자신 9 + 직역어미:이어집니다 6 + 강조부사:그렇게 6 + 직역어미:가리킵니다 5 + 강조부사:끝까지 5 + 자기지시:본인 3 + 추상명사:그_판단 3 + 직역어미:드러납니다 2 + 추상명사:그_점 1 + 추상명사:그_부분 1
- 자기지시 정책 분리:
  - **자기지시 "본인" only** (정책 부합, 보존) → batch에서 이미 제외
  - **자기지시 "자신" only** (자신 → 본인 통일) → 본 batch 포함 (9 entries)
  - **다른 어색 패턴 + 자기지시** (자연화 + 본인 보존/자신 통일) → 본 batch 포함 (47 entries)

---

## 변경 대상 56 entries

| ID | channel | party | lieBand | stage | qt | 패턴 | KO 원본 |
|----|---------|-------|---------|-------|-----|------|---------|
| judgec-d-1-hard-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 윤태성 씨, 어머니 상태를 단정했다가 일부 가능성을 인정했습니다. 왜 그렇게 밀어붙였습니까. |
| judgec-d-1-hard-v3 | judge_contradiction | - | - | - | - | 자기지시:본인 / 강조부사:차분히 | 윤정후 씨, 절차에 들어갔는지 아닌지 더 밝혀 주십시오. 본인 행동을 차분히 말씀해 주십시오. |
| judgec-d-1-mid-v5 | judge_contradiction | - | - | - | - | 강조부사:차분히 | 윤정후 씨, 윤태성 씨가 오기 전 끝내려 한 말의 의미를 계속 줄이고 있습니다. 차분히 말씀해 주십시오. |
| judgec-d-2-hard-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 윤태성 씨, 윤정후 씨를 욕심으로만 몰아간 판단이 기록과 어긋납니다. 왜 그렇게 확신했습니까. |
| judgec-d-2-mid-v5 | judge_contradiction | - | - | - | - | 추상명사:그_판단 | 윤정후 씨, 어떤 사정이 있었더라도 문서가 달라진 책임은 남습니다. 그 판단을 답해 주십시오. |
| judgec-d-3-soft-v2 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 윤태성 씨, 어머니 돈이라고 믿던 말에서 출처를 몰랐다는 인정으로 옮기셨습니다. 왜 그렇게 말씀하십니까. |
| judgec-d-3-soft-v4 | judge_contradiction | - | - | - | - | 강조부사:그렇게 | 두 분, 돈의 출처를 두고 기억이 달라졌습니다. 누가 왜 그렇게 판단했는지 정리해 주십시오. |
| judgec-d-4-hard-v5 | judge_contradiction | - | - | - | - | 추상명사:그_판단 | 윤정후 씨, 침묵은 윤태성 씨를 지킨 게 아니라 의심을 키웠습니다. 그 판단을 지금 설명해 주십시오. |
| judgeec-dc-1-b-q1-soft-v1 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 유서 사본과 말년 방문기록, 최복순 씨의 음성증언을 함께 보면 방문이 늘어난 시기와 종이를 읽어드린 장면이 겹칩니다. 윤정후 씨, 왜 윤태성 씨가 오기 전에 마치려 했는지 차분히 말씀해 주십시오. |
| judgeec-dc-1-b-q1-soft-v4 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 말년 방문이 늘어난 기록과 종이를 읽어드렸다는 증언이 한 결론으로 이어집니다. 윤정후 씨, 그 방문의 목적을 정리해 주십시오. |
| judgeec-dc-1-b-q2-hard-v2 | judge_evidence_combo | - | - | - | - | 직역어미:가리킵니다 | 유서 결과와 방문 과정, 최복순 씨 증언이 윤정후 씨 판단을 가리킵니다. 대신 결정한 부분을 명확히 답해 주십시오. |
| judgeec-dc-1-b-q2-hard-v4 | judge_evidence_combo | - | - | - | - | 자기지시:본인 / 강조부사:차분히 | 윤정후 씨, 기록은 곁에 선 사람이 아니라 방향을 잡은 사람을 묻고 있습니다. 본인 역할을 차분히 인정해 주십시오. |
| judgeec-dc-1-b-q2-mid-v3 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 어머니 뜻이 남아 있었다 해도 윤정후 씨가 문장과 순서를 잡았다면 책임이 달라집니다. 그 경계를 차분히 말씀해 주십시오. |
| judgeec-dc-1-b-q2-soft-v3 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 어머니가 혼자 읽기 어려웠다는 사정과 윤정후 씨가 절차를 서둘렀다는 정황이 함께 있습니다. 윤정후 씨, 차분히 구분해 주십시오. |
| judgeec-dc-2-b-q1-hard-v1 | judge_evidence_combo | - | - | - | - | 직역어미:가리킵니다 | 인증 절차 메모과 오전 1차 접수가 윤정후 씨의 절차 개입을 가리킵니다. 어머니가 답변을 잇지 못하신 자리에서 진행을 빨리 끌고 정리한 이유를 지금 말씀해 주십시오. |
| judgeec-dc-2-b-q1-hard-v5 | judge_evidence_combo | - | - | - | - | 직역어미:가리킵니다 | 윤정후 씨, 기록은 탐욕이 아니라 다른 숨김을 가리킵니다. 그 숨김 때문에 문서를 바꾼 사실을 인정하고 설명해 주십시오. |
| judgeec-dc-2-b-q1-soft-v5 | judge_evidence_combo | - | - | - | - | 직역어미:드러납니다 | 어머니 서랍의 처음 적힌 문안과 공증본을 함께 보면 절차가 두 번 진행된 방향이 드러납니다. 윤정후 씨, 그 자리에서 진행을 끌고 간 판단부터 말씀해 주십시오. |
| judgeec-dc-2-b-q2-hard-v1 | judge_evidence_combo | - | - | - | - | 자기지시:자신 | 윤정후 씨, 자신의 이득을 챙기지 않았다는 말로 절차 개입이 사라지지 않습니다. 공증인 메모와 오전 1차 접수 기록이 남아 있습니다. 무엇을 막으려 했습니까. |
| judgeec-dc-3-b-q1-hard-v4 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 윤정후 씨, 돈의 출처를 밝히지 않으면 어머니 뜻도 제대로 판단할 수 없습니다. 송금 흐름을 차분히 말해 주십시오. |
| judgeec-dc-3-b-q1-hard-v5 | judge_evidence_combo | - | - | - | - | 자기지시:본인 / 강조부사:그렇게 | 자필 연습본이 왜 그렇게 기울었는지는 계좌 흐름이 설명합니다. 윤정후 씨, 본인 부담을 숨긴 판단을 지금 인정해 주십시오. |
| judgeec-dc-3-b-q1-soft-v5 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 자필 연습본과 계좌 흐름은 어머니 돈처럼 보였던 돈의 출처를 다시 묻게 합니다. 윤정후 씨, 차분히 말씀해 주십시오. |
| judgeec-dc-4-b-q1-hard-v4 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 윤정후 씨, 자료는 보호 명분보다 먼저 숨긴 사실을 보여 줍니다. 윤태성 씨에게 말하지 않은 이유를 차분히 답해 주십시오. |
| judgeec-dc-4-b-q1-hard-v5 | judge_evidence_combo | - | - | - | - | 직역어미:가리킵니다 | 계좌 흐름과 어머니 기록이 모두 윤정후 씨의 침묵을 가리킵니다. 그 침묵이 누구를 위한 것이었는지 지금 말해 주십시오. |
| judgeec-dc-4-b-q1-mid-v3 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 돈을 보낸 흐름과 어머니 기록이 한 방향으로 이어집니다. 윤정후 씨, 윤태성 씨가 알게 될까 두려웠던 지점을 말씀해 주십시오. |
| judgeec-dc-4-b-q1-soft-v1 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 장기간 계좌 흐름과 어머니 기록을 함께 보면 윤정후 씨가 돈과 가족사를 함께 떠안은 흐름이 이어집니다. 윤정후 씨, 언제 그 사실을 알았습니까. |
| judgeec-dc-4-b-q1-soft-v3 | judge_evidence_combo | - | - | - | - | 직역어미:드러납니다 | 돈의 출처와 어머니 기록이 맞물리며 윤정후 씨의 침묵 이유가 드러납니다. 처음 알게 된 시점부터 설명해 주십시오. |
| judgeec-dc-4-b-q1-soft-v5 | judge_evidence_combo | - | - | - | - | 직역어미:가리킵니다 | 윤정후 씨, 계좌 흐름과 어머니 기록은 서로 다른 자료이지만 같은 부담을 가리킵니다. 그 부담을 언제부터 알고 있었습니까. |
| judgeec-dc-4-b-q2-hard-v2 | judge_evidence_combo | - | - | - | - | 추상명사:그_판단 | 계좌 흐름과 어머니 기록은 유서 변경의 끝에 법정 회피가 있었다는 점을 보여 줍니다. 윤정후 씨, 그 판단을 책임져야 합니다. |
| judgeec-dc-4-b-q2-mid-v3 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 윤정후 씨, 유서 절차 개입은 윤태성 씨가 그 공증 자리의 이유를 묻지 않게 하려는 판단과 이어집니다. 그 연결을 인정합니까. |
| judgeec-dc-4-b-q2-soft-v2 | judge_evidence_combo | - | - | - | - | 추상명사:그_점 | 오래된 돈의 흐름과 어머니 기록은 상속 문제가 가족사 문제로 번질 수 있음을 보여 줍니다. 윤정후 씨, 그 점이 두려웠습니까. |
| judgeec-dc-4-b-q2-soft-v3 | judge_evidence_combo | - | - | - | - | 직역어미:이어집니다 | 어머니 기록과 계좌 흐름이 맞물리면 유서 문제가 더 깊은 질문으로 이어집니다. 윤정후 씨, 그 질문을 막으려 했는지 말씀해 주십시오. |
| judgeec-dc-4-b-q2-soft-v5 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 계좌 흐름와 어머니 기록은 왜 유서 문제를 법정까지 보내고 싶지 않았는지 묻습니다. 윤정후 씨, 차분히 설명해 주십시오. |
| judgeec-dc-5-a-q1-mid-v1 | judge_evidence_combo | - | - | - | - | 강조부사:그렇게 | 윤태성 씨, 계좌 흐름과 어머니 기록을 본 뒤에도 장남의 몫을 먼저 말한다면 판단 기준을 밝혀야 합니다. 왜 그렇게 확신했습니까. |
| judgeec-dc-5-b-q1-soft-v3 | judge_evidence_combo | - | - | - | - | 추상명사:그_부분 | 세 자료를 함께 보면 윤정후 씨가 왜 숨겼는지는 보이지만, 어머니 뜻을 고친 사실도 남습니다. 그 부분을 설명해 주십시오. |
| judgeec-dc-5-b-q1-soft-v5 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 | 윤정후 씨, 보호하려 했다는 말과 문서를 고친 책임은 동시에 남습니다. 세 자료를 앞에 두고 차분히 말씀해 주십시오. |
| judgeec-dc-5-b-q2-soft-v1 | judge_evidence_combo | - | - | - | - | 강조부사:차분히 / 직역어미:이어집니다 | 변경된 유서 사본과 계좌 흐름, 어머니 기록을 함께 보면 두 사람이 모두 어머니 뜻을 자기 방식으로 읽은 흐름이 이어집니다. 두 분, 차분히 답해 주십시오. |
| judgeq-d-1-motive-search-1-v3 | judge_question | - | - | - | motive_search | 강조부사:차분히 | 윤정후 씨, 말년 방문이 갑자기 늘어난 이유를 차분히 말씀해 주십시오. |
| judgeq-d-2-empathy_approach-3-v1 | judge_question | - | - | - | empathy_approach | 강조부사:끝까지 | 윤정후 씨, 윤태성 씨가 그 공증 절차의 경위를 알면 끝까지 파고들까 두려웠다는 뜻입니까. |
| judgeq-d-2-empathy_approach-4-v2 | judge_question | - | - | - | empathy_approach | 자기지시:자신 | 윤태성 씨, 윤정후 씨를 용서 못 하는 마음과 자신이 외면당했다는 상처 중 무엇이 더 큽니까. |
| judgeq-d-2-fact_pursuit-4-v1 | judge_question | - | - | - | fact_pursuit | 자기지시:자신 | 윤정후 씨, 자신의 이득만 챙긴 개입이 아니었다고 해도 왜 절차에 손대는 선을 넘었습니까. |
| judgeq-d-2-fact_pursuit-4-v2 | judge_question | - | - | - | fact_pursuit | 강조부사:끝까지 | 윤태성 씨, 윤정후 씨가 문서를 바꾼 이유가 탐욕만은 아닐 수 있다는 가능성을 끝까지 배제한 이유가 무엇입니까. |
| judgeq-d-2-motive_search-3-v2 | judge_question | - | - | - | motive_search | 자기지시:자신 | 윤태성 씨, 이 문제를 유산 다툼으로만 붙들면 자신도 덜 흔들린다고 느끼셨습니까. |
| judgeq-d-3-empathy_approach-1-v2 | judge_question | - | - | - | empathy_approach | 자기지시:자신 | 윤태성 씨, 그 시절 도움을 받던 자신을 떠올리면 가장 먼저 드는 감정은 무엇입니까. |
| judgeq-d-3-empathy_approach-4-v2 | judge_question | - | - | - | empathy_approach | 강조부사:끝까지 | 윤태성 씨, 진실을 알고 싶은 마음과 끝까지 모른 척하고 싶은 마음 중 무엇이 더 큽니까. |
| judgeq-d-3-empathy-approach-1-v4 | judge_question | - | - | - | empathy_approach | 자기지시:자신 | 윤태성 씨, 그 시절 도움을 받던 자신을 떠올리면 어떤 감정이 듭니까. |
| judgeq-d-3-fact_pursuit-4-v2 | judge_question | - | - | - | fact_pursuit | 자기지시:자신 | 윤태성 씨, 그 도움의 출처를 잘못 알고도 어머니가 자신만 믿었다고 더 굳히신 이유가 무엇입니까. |
| judgeq-d-3-motive_search-1-v1 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 윤정후 씨, 그 송금을 효도라는 이름으로만 두고 끝까지 밝히지 않은 이유는 무엇입니까. |
| judgeq-d-4-empathy-approach-1-v2 | judge_question | - | - | - | empathy_approach | 자기지시:자신 | 윤태성 씨, 자신만 몰랐다는 말을 들었을 때 무엇이 먼저 무너졌습니까. |
| judgeq-d-4-motive-search-1-v2 | judge_question | - | - | - | motive_search | 자기지시:자신 | 윤태성 씨, 왜 자신만 빠졌다고 느끼셨는지 말씀해 주십시오. |
| judgeq-d-4-motive-search-3-v5 | judge_question | - | - | - | motive_search | 강조부사:끝까지 | 윤정후 씨, 윤태성 씨가 끝까지 파고들 것을 예상하고 숫자를 낮춘 것입니까. |
| judgew-w-1-hard-v5 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 최복순 씨, 지금부터 유서 작성 직전의 장면을 차분히 확인하겠습니다. |
| judgew-w-1-soft-v1 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 최복순 씨를 부르겠습니다. 말년 방문이 늘어난 시기와 종이를 읽어드린 장면을 차분히 확인하겠습니다. |
| judgew-w-2-hard-v3 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 김영수 씨, 인증 절차 메모의 순서를 차분히 말씀해 주셔야 합니다. |
| judgew-w-2-soft-v1 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 김영수 씨를 부르겠습니다. 같은 날 공증인 메모의 순서와 절차 기록을 차분히 확인하겠습니다. |
| judgew-w-3-hard-v3 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 박순애 씨, 어머니에게서 들은 돈 이야기와 두 아들에 관한 말을 차분히 말씀해 주셔야 합니다. |
| judgew-w-3-soft-v1 | judge_witness_summon | - | - | - | - | 강조부사:차분히 | 박순애 씨를 부르겠습니다. 어머니가 말한 송금과 윤태성 씨 사업 자금 이야기를 차분히 확인하겠습니다. |

---

## 출력 형식

```
## family-01 judge_* 채널 어색 잔존 (자기지시 정책 부합 분리) (56 entries) 결과

judgec-d-1-hard-v2:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>

... (56 entries 모두)
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
9. **진실 누설 자가 점검**: family-01 hidden keyword 신규 도입 X
