# [GPT Pro Session B-M3] 자유 질문 응답 캐릭터 톤 패턴 설계

---

## 이 폴더의 파일 목록
1. **prompt.md** — 이 문서 (작업 지시)
2. **freeQuestionV2.ts** — 현재 코드 (수정 대상)
3. **reference-archetype-guide.md** — archetype 6종의 상세 설명 + 실제 코드에서 사용 중인 톤 패턴

---

## 1. 프로젝트 배경

### 자유 질문이란
플레이어가 NPC에게 **텍스트로 직접 질문**할 수 있는 시스템.
예: "왜 그 돈을 보냈습니까?", "그 사람은 누구입니까?"

질문이 들어오면:
1. 질문의 의도를 분류 (identity/motive/emotion/responsibility/context)
2. 관련 atom(진술 단위)을 1-2개 선택
3. atom의 factText를 조합하여 응답 생성

### 현재 문제
```typescript
// 현재 코드 — renderResponse()
// 모든 캐릭터가 동일한 접합 패턴:
case 'identity':
  return `${firstText} 그리고 ${secondText}.`
case 'motive':
  return `${firstText}. 그래서 ${secondText}.`
case 'responsibility':
  return `${firstText}. 다만 ${secondText}.`
```

→ **회피형(avoidant)이든 대결형(confrontational)이든** 전부 같은 톤. 캐릭터 차별화 0%.

### 목표
archetype별 (opener, connector, closer) 패턴을 정의하여, 같은 factText라도 **캐릭터마다 다른 톤**으로 조합되도록 한다.

```
조합 공식: opener + factText1 + connector + factText2 + closer
```

---

## 2. NPC archetype 6종

### 현재 코드에서의 정의
```typescript
type Archetype = 'avoidant' | 'confrontational' | 'victim_cosplay' | 'cold_logic' | 'affect_flattening' | 'premature_summary'
```

### 각 archetype의 성격과 말투

| archetype | 성격 | 말투 핵심 | 법정에서의 태도 |
|-----------|------|----------|---------------|
| **avoidant** | 회피형 | 얼버무림, 말끝 흐림, 시선 회피 | "그 부분은... 뭐라고 해야 할까요" |
| **confrontational** | 대결형 | 직접적, 단정적, 반격 | "~입니다. 오히려 상대가—" |
| **victim_cosplay** | 피해자 연기 | 억울함, 감정 호소, 자기중심 | "저는 정말... 억울합니다" |
| **cold_logic** | 냉철 논리 | 사실 나열, 감정 배제, 조건부 | "사실관계만 보면 ~입니다" |
| **affect_flattening** | 감정 평탄화 | 무덤덤, 최소 표현, 짧은 문장 | "그렇습니다." (끝) |
| **premature_summary** | 성급한 정리 | 빨리 끝내려 함, 결론 먼저 | "결국 ~라는 겁니다" |

---

## 3. 설계 요청

### 3-1. archetype별 × angleTag별 (opener, connector, closer) 세트

**angleTag 5종:**
| angleTag | 질문 의도 | 예시 질문 |
|----------|----------|----------|
| `identity` | 인물/역할 확인 | "그 사람은 누구입니까?" |
| `motive` | 동기/이유 탐색 | "왜 그랬습니까?" |
| `emotion` | 감정/심정 탐색 | "그때 어떤 기분이었습니까?" |
| `responsibility` | 책임 인정 여부 | "잘못을 인정합니까?" |
| `context` | 배경/맥락 설명 | "당시 상황이 어떠했습니까?" |

**각 조합에 대해:**
- **opener** (문장 시작): archetype 특성이 드러나는 도입부
- **connector** (연결): 두 factText를 잇는 표현
- **closer** (종결): 마무리 표현

가능하면 같은 archetype/angleTag에 **2종 변형** 제공 (반복 방지).

### 3-2. 산출물 규모
```
6 archetype × 5 angleTag × 3 패턴(opener/connector/closer) × 2 변형 = 180개 텍스트
최소: 6 × 5 × 3 × 1 = 90개 텍스트
```

---

## 4. 품질 기준

### 캐릭터 차별화 테스트
같은 factText 쌍에 6종 archetype을 적용했을 때 **모두 달라야** 한다:

```
factText1: "해당 금액을 보낸 건 맞습니다"
factText2: "가족 사정 때문이었습니다"
angleTag: "motive"

avoidant:        "그 부분은... 해당 금액을 보낸 건 맞는데요, 사실 그게... 가족 사정 때문이었던 것 같습니다."
confrontational: "해당 금액을 보낸 건 맞습니다. 오히려 가족 사정 때문이었으니까요."
victim_cosplay:  "저도... 해당 금액을 보낸 건 맞습니다. 그런데 제가 왜 그랬겠습니까. 가족 사정 때문이었습니다."
cold_logic:      "해당 금액을 보낸 건 사실입니다. 동기는 가족 사정이었고, 그 외 다른 이유는 없습니다."
affect_flattening: "보냈습니다. 가족 사정입니다."
premature_summary: "결론부터 말씀드리면, 가족 사정 때문에 보낸 겁니다."
```

### 한국어 기준
- **합니다체 기반** (법정이므로)
- 하지만 archetype에 따라:
  - avoidant는 "~것 같습니다", "~인데요" (불확실 표현 허용)
  - affect_flattening은 초짧은 문장 허용
  - confrontational은 강한 단정 허용
- **번역체 금지**: "그것에 대해서 말씀드리자면"(X) → "그 부분은요"(O)

### factText 독립
opener/connector/closer는 **factText 내용과 무관**한 범용 표현이어야 한다.
factText가 어떤 내용이든 자연스럽게 감쌀 수 있어야 함.

---

## 5. 산출물 형식

```json
{
  "characterTonePatterns": {
    "avoidant": {
      "identity": {
        "opener": ["그 사람에 대해서는... 제가 아는 선에서 말씀드리자면,", "..."],
        "connector": ["그리고 또...", "..."],
        "closer": ["...인 것 같습니다.", "..."]
      },
      "motive": {
        "opener": [...],
        "connector": [...],
        "closer": [...]
      },
      "emotion": { ... },
      "responsibility": { ... },
      "context": { ... }
    },
    "confrontational": { ... },
    "victim_cosplay": { ... },
    "cold_logic": { ... },
    "affect_flattening": { ... },
    "premature_summary": { ... }
  },
  "assemblyRule": "opener + factText1 + connector + factText2 + closer",
  "singleAtomRule": "opener + factText1 + closer (factText2가 없을 때)",
  "designNotes": "각 archetype의 설계 의도"
}
```
