# PublicClaim 재설계 권고안

## 결론

가장 효과적인 방향은 **A안 채택**입니다.

다만 실무적으로는 **A안에 C안을 내장한 형태(A-lite)**가 가장 좋습니다.

- **A안**: `publicClaim`을 완성된 한국어 문장이 아니라 **사실 원자(claim atom)** 로 바꾼다.
- **C안**: 그 원자 안의 숫자/날짜/이름은 **slot화(delexicalization)** 해서, tell이 필요할 때만 exact surface로 실현한다.
- **D안**: 마지막 안전장치로만 유지한다. (호칭 보정, 반복 opener 감지, 금지 표현 제거)
- **B안**: 주력안으로는 비추천. sentence template를 늘리는 방식이라 근본 문제가 남는다.

요약하면:

> **주 구조는 A, surface 제어는 C, 안전망은 D. B는 보조도구 정도로만.**

---

## 왜 A안이 맞는가

현재 문제의 뿌리는 `publicClaim`이 **의미 단위**가 아니라 **이미 말해진 문장(surface text)** 이라는 점이다.
그러니 LLM은 캐릭터 연기나 tell cadence보다 먼저 그 문장을 베껴 쓴다.

이 구조에서는 아래 3가지가 동시에 무력화된다.

1. **tell cadence**
   - 숫자를 매턴 말하지 말라고 해도 `publicClaim`에 이미 `2,800,000원`이 들어 있으면 그대로 나온다.
2. **archetype voice**
   - confrontational 캐릭터라도 claim 문장이 avoidant 톤이면 그 톤을 따라간다.
3. **answerFocus / subAction 차별화**
   - 사실추궁/동기탐색/공감접근이 모두 같은 문장을 받으면 응답 초점이 거의 안 바뀐다.

즉 문제는 프롬프트 강도 부족이 아니라 **표현 레이어가 의미 레이어를 덮는 것**이다.

---

## A안 vs B/C/D 비교

### A안 — 사실 원자화

### 장점
- 반복 시작어, 숫자 강박, 동일 문장 재사용을 구조적으로 줄인다.
- subAction마다 다른 atom을 선택할 수 있어 **answerFocus**가 실제로 작동한다.
- archetype이 같은 사실을 다른 톤으로 표면화할 수 있다.
- 호칭도 atom의 slot realization에서 해결 가능하다.

### 단점
- 데이터 구조 변경 비용이 있다.
- 기존 ClaimPolicy 데이터를 일부 다시 써야 한다.

### 판단
- **근본 해결책**이다.

---

### B안 — archetype별 publicClaim variant 추가

### 장점
- 기존 구조를 크게 안 바꾸고도 톤 차이는 조금 좋아질 수 있다.

### 단점
- 여전히 **완성 문장**을 LLM에 준다.
- 반복 문제 해결 안 됨.
- subAction 차별화 해결 안 됨.
- tell cadence 해결 안 됨.
- 사건마다 variant 수가 폭증한다.

### 판단
- **증상 완화는 가능하지만 구조적 해결은 아님.**

---

### C안 — publicClaim 중립화 + tell 주입

### 장점
- 숫자/날짜/고유명 반복은 크게 줄일 수 있다.
- over_precision 같은 tell이 실제로 살아난다.
- 기존 스키마 위에서 비교적 빠르게 적용 가능하다.

### 단점
- `publicClaim`이 여전히 문장이면 archetype과 subAction 문제는 일부 남는다.
- 결국 A안 없이 C안만 가면 “덜 거슬리는 sentence template” 수준에 머무를 수 있다.

### 판단
- **A안의 일부로 흡수해야 가장 효과적**이다.

---

### D안 — post-process 위반 검출 후 재생성

### 장점
- 기존 시스템을 유지한 채 빠르게 안전망을 둘 수 있다.
- 호칭 오류, opener 반복, banned lexeme 같은 건 잘 잡는다.

### 단점
- 비용/지연 증가.
- 위반을 잡아도 다시 생성하면 비슷한 문장이 또 나올 수 있다.
- 근본 원인이 surface text 입력인 이상, 재생성은 증상 반복 가능성이 높다.

### 판단
- **주력 해법이 아니라 마지막 가드레일**이다.

---

## 추천안: A-lite (A + C + D)

## 1) ClaimPolicy를 “문장”이 아니라 “원자”로 바꾼다

예시:

### 현재
```json
"publicClaim": [
  "공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다.",
  "그 돈의 용도는 설명할 순서가 있습니다."
]
```

### 권장
```json
"claimAtoms": [
  {
    "id": "d1_act_admit",
    "semantic": "공동계좌 송금 행위는 인정",
    "focusTags": ["fact", "act"],
    "surfaceSlots": {
      "amount": { "exact": "2,800,000원", "neutral": "그 돈" },
      "date": { "exact": "9월 20일", "neutral": "그날" }
    }
  },
  {
    "id": "d1_purpose_withhold",
    "semantic": "송금 목적 설명은 유보",
    "focusTags": ["motive", "evidence"],
    "surfaceSlots": {}
  }
]
```

핵심은 `semantic`이 **발화문이 아니라 의미 단위**여야 한다는 점이다.

---

## 2) 숫자/날짜/이름은 slot으로 분리한다

이게 C안의 핵심이다.

규칙 예시:
- `mustUseTell = over_precision` → `amount.exact`, `date.exact` 사용 허용
- 기본 턴 → `amount.neutral`, `date.neutral` 사용
- `questionType = evidence_present` + hard evidence → exact 허용
- 연속 2턴 내 같은 slot exact 반복 금지

즉, **정밀 surface는 정보가 아니라 연기 장치**가 되어야 한다.

---

## 3) subAction은 atom 선택 단계에서 반영한다

현재처럼 stance만 보정하면 약하다.
먼저 무슨 atom을 열지 정해야 한다.

예:
- `fact_pursuit` → `act`, `timeline`, `rule`
- `motive_search` → `motive`, `counter`, `self_justification`
- `empathy_approach` → `emotion`, `fear`, `shame`
- `evidence_present` → `evidence`, `context`, `identity`

순서는:

1. subAction으로 focus tag 결정
2. 해당 tag의 atom 선택
3. stance/defenseMode 적용
4. tell/호칭/정밀도 surface realization

이 순서가 맞다.

---

## 4) 호칭은 post-process보다 slot realization으로 푼다

예:
```json
"entityRefs": {
  "spouse_to_judge": "제 남편",
  "spouse_to_opponent": "자기",
  "spouse_angry": "한지석 씨"
}
```

그 후 엔진이:
- 재판관에게 말하는 턴인지
- 상대에게 직접 되묻는 턴인지
- angry mode인지
를 보고 surface form을 선택한다.

이렇게 하면 `지석 씨` → `제 남편` 같은 사후 치환에 덜 의존하게 된다.

---

## 5) D안은 최소 가드만 남긴다

권장 post-process는 딱 3개 정도다.

1. **호칭 validator**
   - audience가 judge인데 spouse name 직접 호출 시 교정
2. **opener repetition detector**
   - 최근 2턴과 같은 5~7글자 시작이면 1회 재생성 또는 opener paraphrase
3. **slot overuse detector**
   - mustUseTell가 아닌데 same exact amount/date가 2턴 연속 나오면 neutral slot으로 강등

이 정도면 충분하다.

---

## B안은 왜 비추천인가

B안은 얼핏 좋아 보이지만, 실제로는 **template 수를 늘리는 일**이다.

예를 들어:
- avoidant용 문장
- confrontational용 문장
- fact/motive/empathy별 문장
- 관계별 문장

이렇게 늘리기 시작하면 사건별 데이터 양이 급증하고, 결국 또 “완성 문장 복사” 문제가 돌아온다.

B안은 최대한 써도 **fallback phrase bank** 정도가 적당하다.
주 구조가 되어서는 안 된다.

---

## 현실적인 이행 순서

### 1단계 — 파일럿 2사건에 A-lite 적용
- spouse-01, family-01만 `claimAtoms`로 재작성
- 기존 `publicClaim`은 fallback/보드 요약용으로만 유지

### 2단계 — 엔진에서 atom 선택 우선 적용
- `allowedClaimAtoms`를 실제 atom ID 기반으로 변경
- prompt에는 완성 문장 대신 selected atoms + surface constraints 전달

### 3단계 — tell/호칭 slot realization 추가
- exact vs neutral slot 선택
- judge/opponent reference 선택

### 4단계 — validator 추가
- opener repetition
- misaddress
- slot overuse

### 5단계 — 나머지 84개 사건 확장
- 기존 사건은 우선 neutralized atom으로 변환
- 고난도 사건만 full slotization

---

## 최종 권고

**주 방향은 A안입니다.**
다만 실제 구현은 **A안 단독**이 아니라:

- **A안**으로 의미 단위를 원자화하고,
- **C안**으로 숫자/날짜/이름을 slot화하고,
- **D안**으로 마지막 검증만 얹는 구조가 가장 좋습니다.

즉 결론은:

> **A를 채택하되, C를 내부 실현 규칙으로 포함하고, D는 안전망으로만 사용하라. B는 주력안으로 쓰지 마라.**

