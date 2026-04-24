# 작업 명세 — NPC hook + 재판관 질문 다양화

## 배경 (자세히)

솔로몬 법정은 재판관(플레이어)이 NPC를 심문해 진실을 밝히는 게임. 사용자 dev 테스트에서 두 가지 결함 보고:

### 결함 1 — NPC hook 발화 어색
새 쟁점이 발현(emerge)될 때 NPC가 화제 전환 발화를 하는데, 현재 generic 템플릿:
- "…사실, {emerged 쟁점명} 건도 함께 봐주셔야 합니다."
- "…사실, 그것만이 아니었습니다."

**사용자 평가**: "기계어, 맥락도 안 맞아". 깔끔한 사전 작성 메시지로 교체 필요.

### 결함 2 — 재판관 질문 100% 기계식
모든 질문이 같은 패턴:
- "{이름} 씨, {주제}에 대해 빠뜨린 부분이 있지 않습니까?"
- "{이름} 씨, {주제} 당시 정확히 어떤 일이 있었습니까?"

**사용자 평가**: "특정 문구를 그대로 갖다쓰고 앞뒤 서술만 붙인 형태. 게임 퀄리티 크게 떨어트림". 다양화 + 자연스러운 화법 필요.

---

## 작업 A — NPC hook 발화 사전 작성

### 배경
사용자 액션(예: 사실 추궁) → NPC 답변 → 시스템: "새 쟁점이 등장했다 — X" → **NPC가 화제 전환 hook 발화** → emergence 모달.

화제 전환 발화는 NPC 시점에서 자연스러워야:
- 자기 잘못을 인정하면서 다른 화제로 (자백 톤)
- 상대를 비난하면서 다른 화제로 (공격 톤)
- 더 못 숨긴다는 체념 (체념 톤)

### 케이스 분석 예시 (spouse-01의 d-2 = 개인 비자금 2,000만원 출금)

- **truthDescription**: 이준호가 형 보호 위해 개인 비자금 2,000만원을 형에게 현금 전달
- **speaker**: b (이준호 — correctResponsibility b 측이 더 큼)
- **변형 예시**:
  - confession: "재판관님, 사실은… 형 사정이 있어 개인 비자금 2,000만원을 따로 빼두었습니다. 박지연 씨한테는 끝내 말 못 했습니다."
  - attack: "박지연 씨가 적금 건드린 것만 문제가 아닙니다. 저도 따로 돈을 빼서 쓴 게 있긴 했지만, 그건 가족을 위한 거였습니다."
  - resignation: "…더 숨겨봐야 결국 다 드러날 일입니다. 개인 비자금 출금 건도 같이 봐주십시오."

### 산출물 형식

`proposals-A-npc-hooks.json`:

```json
{
  "spouse-01": {
    "d-2": {
      "name": "개인 비자금 2,000만원 출금",
      "speaker": "b",
      "variants": [
        { "tone": "confession", "text": "...", "behaviorHint": "..." },
        { "tone": "attack", "text": "...", "behaviorHint": "..." },
        { "tone": "resignation", "text": "...", "behaviorHint": "..." }
      ]
    },
    "h-d3": { ... },
    "h-d4": { ... }
  },
  "family-01": { /* 4개 hidden disputes */ },
  "friend-01": { /* 4개 hidden disputes */ }
}
```

### 활성 3사건 hidden disputes (총 11개)

`03-source-data.json`에 모든 정보 포함. 각 dispute마다:
- name (쟁점 이름)
- truthDescription (진실, 스포일러 포함)
- correctResponsibility (책임 비율 — speaker 결정 기준)
- quadrant (a_only / b_only / both / neither_knows / shared_misconception)

### 톤 결정 가이드

- speaker는 `correctResponsibility`가 큰 쪽 (책임자가 화제 전환하는 게 자연스러움)
- 단, quadrant가 'b_only'면 b가 진실 안 다른 쪽이 추궁받아서 화제 전환할 수도

### 변형 길이

- 1-3 문장. 너무 길지 않음
- behaviorHint도 필수 (1문장, NPC 비언어 반응 묘사)

---

## 작업 B — 재판관 질문 풀 확장

### 현재 코드 (`src/hooks/useActionDispatch.ts:2069-2129`)

```ts
function buildQuestionText(type, target, disputeId): string {
  // ...
  if (type === 'fact_pursuit') {
    if (lieState >= 'S3') return `${myName} 씨, 계속 돌려 말씀하시는데 — ${topic}, 정직하게 답해 주십시오.`
    const pool = [
      `${myName} 씨, ${topic}에 대해 사실대로 말씀해 주십시오.`,
      `${myName} 씨, ${topic} 당시 정확히 어떤 일이 있었습니까?`,
      `${myName} 씨, ${topic}에 대해 빠뜨린 부분이 있지 않습니까?`,
      `${myName} 씨, 아까 말씀하신 내용 중 ${topic}${pp과와(topic)} 맞지 않는 부분이 있습니다. 설명해 주시겠습니까?`,
    ]
    return pool[(turn + disputeId.charCodeAt(disputeId.length - 1)) % pool.length]
  }
  // motive_search, empathy_approach도 동일 4개씩
}
```

### 결함
- 각 풀 4개만. 변형 부족.
- 패턴이 단조 ("X 씨, Y에 대해 ..."로 시작)
- "빠뜨린 부분이 있지 않습니까?" 같은 한 패턴 과다 사용

### 요청
6개 풀 (3 questionType × soft/hard) 각각 **8-12개 변형** 작성:

```
{
  "fact_pursuit": {
    "soft": [10개 templates],
    "hard": [8개 templates]
  },
  "motive_search": {
    "soft": [10개 templates],
    "hard": [8개 templates]
  },
  "empathy_approach": {
    "soft": [10개 templates],
    "hard": [8개 templates]
  }
}
```

### 다양화 방향

**fact_pursuit**:
- "어떻게 알게 되었는지", "그 시점에 누가 옆에 있었습니까?", "그 직전에는 어떤 일이 있었습니까?", "왜 하필 그 시점이었습니까?", "그 부분은 사실로 확인된 겁니까, 추측입니까?", ...

**motive_search**:
- "그렇게 해야 한다고 판단한 결정적 이유가 있었습니까?", "그 순간 머릿속에 가장 먼저 떠오른 게 무엇이었습니까?", "다른 선택지는 고려하지 않았습니까?", ...

**empathy_approach**:
- "그날 잠을 잘 주무셨습니까?", "솔직히, 가장 두려웠던 게 무엇이었습니까?", "지금도 그 결정이 옳았다고 보십니까?", ...

### 변수

- `${myName}` (필수): 심문 대상 이름
- `${topic}` (필수): 쟁점 주제 (자동 처리)
- `${opName}` (옵션): 상대 이름 — 일부 질문에 사용 가능 ("X 씨가 Y에 대해 한 말씀과 다릅니다, 어느 쪽이 사실입니까?")

### 검증 기준 (B)

각 템플릿이:
- [ ] 합니다체 일관
- [ ] "X 씨" 호칭으로 시작 (또는 호칭 없이 바로 질문)
- [ ] 기계어 패턴 없음
- [ ] 풀 안 변형이 의미적으로 다름 (단순 어순 변경 아님)
- [ ] 재판관 권위 톤 유지 (반말 X, 친근체 X)

---

## 산출물 검증 자가 체크리스트

GPT Pro 산출물 작성 후 다음 자가 체크 통과해야:

### A 자가 체크
- [ ] 활성 3사건 모두 포함 (spouse-01, family-01, friend-01)
- [ ] 각 사건당 hidden dispute 수와 일치 (spouse 3, family 4, friend 4 = 총 11)
- [ ] 각 dispute마다 3개 변형 (confession / attack / resignation)
- [ ] speaker는 'a' 또는 'b'
- [ ] 각 변형마다 text + behaviorHint 모두 있음
- [ ] truthDescription의 핵심 정보(금액/이름/시각)가 변형에 자연스럽게 등장 가능

### B 자가 체크
- [ ] 6개 풀 모두 작성 (3 type × soft/hard)
- [ ] 각 풀 8개 이상 (가능하면 10-12개)
- [ ] 변수 `${myName}`, `${topic}` 사용
- [ ] 한국어 자연성 (조사 정확)
- [ ] 기계어/번역체 0건

---

## 적용 단계 (CT)

1. GPT Pro 산출물 도착 → CT 한국어 검토
2. A: 새 데이터 파일 (`src/data/emergenceHooks.ts` 또는 비슷한 곳) 추가 → DiscoveryFeedbackWatcher에서 emerged disputeId 기준 hook 발화 변형 선택
3. B: `buildQuestionText` 함수의 pool 교체 → typecheck 검증
4. dev 테스트로 효과 확인
