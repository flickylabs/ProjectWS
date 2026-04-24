# GPT Pro 의뢰 — NPC hook 발화 + 재판관 질문 다양화

안녕하세요. 솔로몬 법정 게임의 텍스트 작업 두 가지를 함께 의뢰드립니다.

## 작업 A — 새 쟁점 emerge 시 NPC hook 발화 (사전 작성)

새 쟁점이 발현될 때 NPC가 화제 전환 발화를 합니다. 현재는 generic 템플릿 (`"…사실, X 건도 함께 봐주셔야 합니다."`)을 사용하는데, **기계적이고 어색**합니다.

**해결**: 활성 3사건의 각 hidden dispute별로 **자연스러운 hook 발화 2-3 변형**을 사전 작성.

### 변형 톤 (각 dispute당 2-3개)

1. **자백 톤** — NPC가 자기 잘못을 먼저 인정하면서 화제 전환  
   예: "재판관님, 사실은… 저도 그 부분을 숨기고 있었습니다."
2. **공격 톤** — 상대를 공격하면서 화제 전환  
   예: "잠깐만요. 그쪽도 X에 대해 말씀해 주셔야 합니다."
3. **체념 톤** — 더는 못 숨긴다는 듯  
   예: "…이제 와서 숨기는 게 무슨 의미가 있습니까."

### 산출물 형식 — A 부분

```json
{
  "spouse-01": {
    "<dispute-id>": {
      "name": "<현재 dispute 이름>",
      "speaker": "a" | "b",  // 누가 hook 발화하는지 (correctResponsibility 큰 쪽 권장)
      "variants": [
        { "tone": "confession", "text": "...", "behaviorHint": "..." },
        { "tone": "attack", "text": "...", "behaviorHint": "..." },
        { "tone": "resignation", "text": "...", "behaviorHint": "..." }
      ]
    }
  },
  "family-01": { ... },
  "friend-01": { ... }
}
```

---

## 작업 B — 재판관 질문 톤 다양화

현재 재판관 질문이 100% 기계식 — 항상 같은 패턴 ("X 씨, Y에 대해 빠뜨린 부분이 있지 않습니까?"). 게임 퀄리티 큰 저하.

**해결**: 재판관 질문 템플릿 풀을 **확장 + 다양화**. 

### 현재 템플릿 (`src/hooks/useActionDispatch.ts:2069+ buildQuestionText`)

```ts
// fact_pursuit (S0~S2)
"${myName} 씨, ${topic}에 대해 사실대로 말씀해 주십시오."
"${myName} 씨, ${topic} 당시 정확히 어떤 일이 있었습니까?"
"${myName} 씨, ${topic}에 대해 빠뜨린 부분이 있지 않습니까?"
"${myName} 씨, 아까 말씀하신 내용 중 ${topic}과 맞지 않는 부분이 있습니다. 설명해 주시겠습니까?"
// motive_search (S0~S2)
"${myName} 씨, ${topic}을 왜 그렇게 하셨습니까?"
... (4개)
// empathy_approach (S0~S2)
"${myName} 씨, ${topic}에 대해서 — 그때 어떤 마음이셨는지..."
... (4개)
```

### 요청 — 각 질문 유형 × lieState별 새 템플릿

3종 질문 (fact_pursuit / motive_search / empathy_approach) × 각 톤 (S0-S2 / S3+) = 6개 풀.

**각 풀당 8-12개 변형** 작성. 다양한 자연스러운 화법:
- "어떻게 알게 되었는지", "그때 누가 옆에 있었습니까?", "그 직전에는 어떤 일이 있었습니까?", "왜 하필 그 시점이었습니까?" 등
- 기계어 회피: "빠뜨린 부분이 있지 않습니까?" 같은 단조 패턴 비중 줄이기
- 단, 호칭 일관: "${myName} 씨, ..." 또는 "${myName} 씨에게 묻습니다, ..."
- 합니다체 유지

### 산출물 형식 — B 부분

```json
{
  "fact_pursuit": {
    "soft": ["${myName} 씨, ...", "..."],   // S0-S2용 약 10개
    "hard": ["${myName} 씨, ...", "..."]    // S3+용 약 8개
  },
  "motive_search": { "soft": [...], "hard": [...] },
  "empathy_approach": { "soft": [...], "hard": [...] }
}
```

**변수**:
- `${myName}` — 심문 대상 이름 (예: "박지연")
- `${topic}` — 쟁점 주제 (예: "오피스텔 방문과 새벽 전화")
- `${opName}` — 상대 이름 (옵션, 일부 질문에 사용)

---

## 검증 기준 (자가 체크)

- [ ] 기계어/번역체 패턴 없음 ("측면이 있다", "사실관계를 정리하면" 등)
- [ ] 합니다체 일관 (재판관 권위 톤)
- [ ] 호칭 일관 ("X 씨")
- [ ] 직접 인용으로 NPC 발화 그대로 옮기지 않음 (간접 인용)
- [ ] A: hook 발화는 1-3 문장 (너무 길지 않음)
- [ ] A: speaker는 correctResponsibility 큰 쪽 (책임자가 화제 전환)
- [ ] B: 각 풀 8-12개, 다양한 화법

---

## 입력 데이터

- `02-task-spec.md` — 추가 명세 (이 파일과 같은 내용 더 상세)
- `03-source-data.json` — 활성 3사건 정보 (parties / disputes / quadrant / responsibility)

## 산출물 위치

`gpt-pro-runs/npc-hook-and-judge-questions/output/`
- `proposals-A-npc-hooks.json`
- `proposals-B-judge-questions.json`

(둘 다 같은 폴더에 저장)

## 적용 방향

CT(Claude)가 한국어 검토 + 게임 디자인 정합성 검증 후:
- A: 새 데이터 파일 또는 dispute 데이터에 hook variants 추가 + DiscoveryFeedbackWatcher가 변형 선택
- B: `buildQuestionText` 함수의 template pool 교체

감사합니다.
