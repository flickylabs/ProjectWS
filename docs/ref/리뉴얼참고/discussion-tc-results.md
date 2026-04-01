# 파일럿 TC 결과 분석 — GPT 논의 요청

## 배경

이전 논의(pilot_blueprint_adjustments.md)에서 제안한 5가지 보정을 모두 구현했습니다:
1. stance-defenseMode 호환성 강제 (ALLOWED_MODES_BY_STANCE) ✅
2. admission floor (Phase 1 인정 사실 재부정 불가) ✅
3. 재판관 질문 엔진 템플릿 전환 ✅
4. 하위 액션 → answerFocus 기반 재설계 ✅
5. Phase 0 쟁점 노출 축소 ✅

구현 후 TC-1~TC-7을 실행한 결과, **구조적 개선은 확인**됐지만 **새로운 층위의 문제 3가지**가 발견됐습니다.

---

## TC 결과 요약

| TC | 항목 | 결과 | 비고 |
|----|------|------|------|
| TC-1 | 하위 액션 차별화 | **PASS** | 사실/동기/공감이 확실히 다른 응답 생성 |
| TC-2 | 캐릭터 차이 | **부분 PASS** | 톤은 다르지만, 호칭 오류 발생 |
| TC-3 | 연속 심문 | **부분 PASS** | 오세린이 한지석식 표현 사용 |
| TC-4 | 쟁점 전환 | **PASS** | 쟁점 간 내용 분리 성공 |
| TC-5 | tell 반복 방지 | **FAIL** | "9월 20일 기준으로" 3턴 연속 |
| TC-6 | Phase 0 쟁점 노출 | **PASS** | 2개만 표시 |
| TC-7 | 호칭 규칙 | **부분 PASS** | "지석 씨" 사용 (should be "제 남편") |

---

## 문제 1: "9월 20일 기준으로 말씀드리면" 매 턴 반복 (심각도: 높음)

### 현상
한지석에게 d-1(280만원 송금)을 3턴 연속 심문하면, 3턴 모두 "9월 20일 기준으로 말씀드리면"으로 시작합니다. "2,800,000원"도 거의 매턴 등장합니다.

### 왜 cadence로 해결이 안 되는가
tell cadence는 `mustUseTell` 선택 여부만 제어합니다. 즉, 2턴째에 `mustUseTell = null`이 되어 tell 발현을 강제하지 않더라도, **publicClaim 자체에 "2,800,000원"이 텍스트로 포함**되어 있어서 LLM이 자연스럽게 이 숫자를 사용합니다.

또한 한지석의 `speechStyle`이 "숫자부터 꺼내며 감정을 뒤로 미룬다"로 기술되어 있어서, LLM이 캐릭터 연기로서 매 턴 정밀 숫자를 앞세웁니다.

### 현재 구조의 한계
```
publicClaim: ["공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다."]
                          ↑ 이 숫자가 매번 LLM에 전달됨
```

tell cadence가 "over_precision을 강제하지 마라"라고 해도, publicClaim에 이미 정밀 숫자가 있으므로 무의미합니다.

### 질문
1. **publicClaim에서 정밀 숫자를 제거하고 중립적 표현으로 바꿔야 하는가?**
   - 예: "2,800,000원" → "해당 금액" 또는 "그 돈"
   - 이러면 over_precision tell이 발동할 때만 정밀 숫자가 나오게 됨
   - 하지만 publicClaim 자체의 구체성이 떨어질 수 있음

2. **아니면 mustUseTell이 아닐 때 "정밀 숫자를 쓰지 마라"는 negative instruction을 넣어야 하는가?**
   - 프롬프트에 "이번 턴에는 구체적 숫자 대신 대명사로 지칭하라" 추가
   - 하지만 프롬프트 복잡도 증가

3. **근본적으로: tell 발현을 "프롬프트 권고"가 아니라 "post-process 치환"으로 바꿔야 하는가?**
   - LLM이 일단 생성 → post-process에서 tell 규칙 검증 → 미발현 시 주입 / 과다 발현 시 제거
   - 가장 안정적이지만 구현 복잡도 높음

---

## 문제 2: 오세린이 한지석식 표현 사용 (심각도: 중간)

### 현상
TC-3에서 오세린(confrontational)이 "설명드릴 순서가 필요합니다"라고 답변. 이건 한지석(avoidant)의 전형적 표현입니다.

### 원인
**ClaimPolicy의 publicClaim이 archetype 무관하게 작성**되어 있습니다. 같은 쟁점(d-2)에서도:
- 한지석 관점의 publicClaim은 avoidant 톤으로 작성됨
- 오세린 관점의 publicClaim도 비슷한 톤 → LLM이 그대로 사용

현재 publicClaim 예시 (오세린 d-2 S1):
```json
"publicClaim": [
  "세린 씨가 새벽에 제 폰을 본 건 본인도 인정한 부분입니다.",
  "의심이 있었다 해도 먼저 묻지 않고 잠금부터 푼 건 잘못입니다.",
  "저를 따지려면 그 방식부터 따로 판단해 주셔야 합니다."
]
```

이건 한지석(a) 관점에서 작성된 claim입니다. 오세린(b)이 자신의 d-2에 대해 답할 때의 publicClaim이 따로 있지만, **톤이 confrontational답지 않은 경우**가 있습니다.

### 질문
1. **publicClaim을 archetype 톤에 맞게 재작성해야 하는가?**
   - 한지석의 claim: "설명할 순서가 있습니다", "먼저 말씀드리기 어렵습니다"
   - 오세린의 claim: "그건 제가 확인한 거예요", "의심할 만한 상황이었잖아요"
   - GPT Session 1에서 생성한 데이터를 보정해야 하는 것

2. **아니면 프롬프트에서 archetype 가이드를 더 강하게 강제하면 되는가?**
   - 현재도 ARCHETYPE_GUIDE가 있지만, publicClaim 텍스트의 영향이 더 큼
   - publicClaim을 "의미만 전달"로 두고, 표현은 LLM이 archetype에 맞게 변환?

3. **publicClaim을 "원자적 사실"과 "표현 방식"으로 분리하는 것이 맞는가?**
   - 현재: `publicClaim: ["설명할 순서가 있습니다"]` (표현 포함)
   - 제안: `claimFact: "용도 설명을 미루고 있다"` + archetype이 표현 결정
   - 이러면 같은 사실을 avoidant는 "순서가 있습니다"로, confrontational은 "지금 말할 건 아니에요"로 표현

---

## 문제 3: 호칭 오류 — "지석 씨" vs "제 남편" (심각도: 중간)

### 현상
오세린이 재판관에게 한지석을 언급할 때 "지석 씨"라고 합니다. 규칙상 "제 남편"이어야 합니다.

### 현재 장치
- 프롬프트에 호칭 규칙이 명시되어 있음
- post-process에 `fixMisdirectedAddress` 함수가 있지만, 기존 경로(구 프롬프트)에서만 적용되고 **blueprint 경로에서는 미적용**

### 질문
이건 설계 질문보다 구현 수정입니다. blueprint 경로의 응답에도 호칭 post-process를 적용하면 됩니다.
다만 한 가지: **post-process 치환이 정확한가?** "지석 씨"를 일괄 "제 남편"으로 바꾸면, 오세린이 한지석에게 직접 말할 때도 바뀌어 버립니다. 현재 responseMode(answer_only vs answer_then_counter)에 따라 치환 범위를 다르게 해야 할 수 있습니다.

---

## 종합 질문

위 3개 문제의 뿌리는 하나입니다: **ClaimPolicy의 publicClaim이 "캐릭터의 구체적 발화문"을 포함하고 있어서, archetype/tell/호칭 제어와 충돌**합니다.

현재 publicClaim 구조:
```json
"publicClaim": ["공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다."]
```

이건 "사실 + 표현 + 숫자"가 하나의 문자열에 섞여 있습니다.

**근본 해결 방향에 대한 의견을 구합니다:**

A안: **publicClaim을 사실 원자(fact atom)로 재구성** — 표현은 LLM + archetype이 결정
```json
"claimAtoms": [
  { "fact": "공동계좌에서 송금한 사실 인정", "tags": ["act"] },
  { "fact": "용도 설명을 유보 중", "tags": ["motive"] }
]
```

B안: **publicClaim은 유지하되, archetype별 변형을 추가**
```json
"publicClaim_avoidant": ["설명할 순서가 있습니다"],
"publicClaim_confrontational": ["지금 말할 건 아니에요"]
```

C안: **publicClaim에서 정밀 숫자/고유 표현을 제거하고, tell이 주입**
```json
"publicClaim": ["해당 금액을 송금한 건 맞습니다"]
// over_precision tell 발동 시에만 "2,800,000원"으로 변환
```

D안: **현재 구조 유지 + post-process에서 tell/archetype 규칙 위반 검출 시 재생성**

어떤 방향이 가장 효과적이고 현실적인지 의견 부탁드립니다.

---

## 추가: LLM 자동 테스트 결과 (API 직접 호출 12회)

UI 없이 blueprintPromptBuilder의 프롬프트를 직접 GPT-4o-mini에 전송하여 응답을 수집했습니다.

### 로직 테스트 (LLM 없이)
- 2,400개 입력 조합에 대해 stance-defenseMode 호환성 검증: **전체 PASS**
- admission floor, 감정 보정, 증거 봉쇄 등 모든 규칙 정상 작동

### LLM 응답 테스트 결과

**TC-1 (하위 액션 차별화):** 3개 응답 모두 "9월 20일 기준으로 말씀드리면"으로 시작. 동기탐색에서도 사실 설명이 먼저 나옴. answerFocus 지시가 publicClaim 텍스트를 이기지 못함.

**TC-2 (캐릭터 차이):** 오세린(confrontational)이 "복잡한 상황과 많은 요소들이 얽혀 있어서 간단히 말하기 어려운 점이 있습니다"라고 답변 — 이건 avoidant 화법. confrontational은 "그건 제가 확인한 거예요. 의심할 만했잖아요"처럼 답해야 함.

**TC-3 (연속 심문):** 2턴과 3턴이 거의 동일한 내용 반복.

**TC-5 (반복 방지):** 3회 모두 "9월 20일 기준으로 말씀드리면, 공동계좌에서 2,800,000원을 송금한 것은..." — 완전 동일 패턴.

**TC-7 (호칭):** "지석 씨"가 "제 남편" 대신 사용됨.

### 근본 원인 확인

이 테스트로 **문제의 근본 원인이 확정**됐습니다:

**publicClaim 텍스트가 LLM 응답을 지배합니다.**

현재 publicClaim은 "공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다"처럼 **완성된 한국어 문장**입니다. LLM은 이 문장을 거의 그대로 사용하므로:
- tell cadence가 무의미해짐 (publicClaim에 이미 정밀 숫자가 있음)
- archetype 가이드가 무력해짐 (publicClaim 문장의 톤이 archetype을 덮어씀)
- answerFocus가 약해짐 (사실/동기/감정 중 무엇을 물어도 같은 publicClaim이 선택됨)

이것은 **프롬프트 미세조정으로 해결할 수 없는 구조적 문제**입니다.

A~D안 중 어느 방향이 맞는지 의견 부탁드립니다.
