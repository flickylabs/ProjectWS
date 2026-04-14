# Session 4: family-01 / friend-01 Dossier 응답 전면 재생성

## 배경

기존 ScriptedText dossier 엔트리는 **카드 레벨 키**(예: `b|dc-1|early`)로만 존재하여, 같은 카드의 다른 질문에 같은 응답이 나오는 문제가 있습니다. spouse-01처럼 **질문 레벨 키**(예: `b|dc-1.b.q1|early`)로 전면 교체해야 합니다.

기존 카드 레벨 엔트리(family-01 9개, friend-01 9개)는 **삭제하고**, 질문 레벨로 전부 새로 생성합니다.

## 산출물

**`family-01-dossier-entries.json`** — 33개 엔트리 (11질문 × 3밴드)
**`friend-01-dossier-entries.json`** — 27개 엔트리 (9질문 × 3밴드)

각 파일은 ScriptedText dossier 채널의 `entries` 배열에 넣을 엔트리 목록입니다.

## 엔트리 스키마

```json
{
  "key": "{party}|{questionId}|{lieBand}",
  "party": "a|b",
  "dossierQuestionId": "{questionId}",
  "lieBand": "early|mid|late",
  "stanceHint": "hedge|partial|deflect|confess",
  "truthLevel": "hint|surface|partial|full",
  "variants": [
    {
      "id": "{party}-{dcId}-{qN}-{band}-v1",
      "text": "NPC 응답 (200~400자)",
      "behaviorHint": "구체적 행동 묘사",
      "tags": ["channel:dossier", "speaker:{party}", "speakerRole:party", "listener:judge", "listenerRole:judge", "address:toJudge", "scope:judge_only", "register:formal", "honorific:formal", "relationship:{category}", "stance:{stanceHint}", "reveal:{truthLevel}"],
      "sourceRefs": ["dossier:{dcId}"]
    },
    { "id": "...-v2", ... },
    { "id": "...-v3", ... }
  ]
}
```

**variants는 3개씩.** id 형식: `{party}-dc{N}-q{N}-{band}-v{N}`

## lieBand별 톤

| lieBand | stanceHint | truthLevel | 태도 |
|---------|-----------|------------|------|
| early | hedge | hint | 방어적, 핵심 회피, 최소 답변 |
| mid | partial | partial | 일부 인정, 변명 섞임 |
| late | confess | full | 거의 인정, 감정 노출 |

---

## family-01 전체 질문 목록 (11질문 × 3밴드 = 33엔트리)

partyA=윤태성, partyB=윤정후. 호칭: 재판관→당사자 "윤태성 씨"/"윤정후 씨"

### dc-1 "말년의 종이" (윤정후 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 1 | dc-1.b.q1 | "이 유서의 60대40 비율을 처음 봤을 때, 어떤 생각이 드셨습니까?" | b |
| 2 | dc-1.b.q2 | "어머니가 이 종이에 서명하실 때 윤정후 씨는 옆에 계셨습니까?" | b |

### dc-2 "줄인 유서" (윤정후 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 3 | dc-2.b.q1 | "원본에서 90이 60으로 바뀐 건 누구의 판단이었습니까?" | b |
| 4 | dc-2.b.q2 | "자기 몫을 줄이면서까지 고쳐야 했던 이유가 무엇입니까?" | b |

### dc-3 "20년의 돈" (윤정후 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 5 | dc-3.b.q1 | "어머니 통장으로 보낸 돈이 결국 윤태성 씨 쪽으로 나간 건 알고 계셨습니까?" | b |
| 6 | dc-3.b.q2 | "20년간 돈을 보내면서 한 번도 형에게 말하지 않은 이유는 무엇입니까?" | b |

### dc-4 "감춘 이유" (윤정후 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 7 | dc-4.b.q1 | "윤태성 씨의 출생 비밀을 알게 된 건 언제입니까?" | b |
| 8 | dc-4.b.q2 | "그 사실을 알면서 왜 형에게 말하지 않았습니까?" | b |

### dc-5 "어머니의 뜻" (윤태성 + 윤정후 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 9 | dc-5.a.q1 | "어머니가 동생에게 90을 남기려 했다는 사실을 알고 나서, 지금 무엇이 가장 억울하십니까?" | a |
| 10 | dc-5.b.q1 | "어머니의 원래 뜻을 90에서 60으로 고친 건 형을 보호하기 위해서였다고 했습니다. 그러면 형에게 직접 설명할 수는 없었습니까?" | b |
| 11 | dc-5.b.q2 | "결국 어머니의 뜻도, 형의 알 권리도 당신 혼자 결정한 겁니다. 그 무게를 어떻게 감당하고 계십니까?" | b |

---

## friend-01 전체 질문 목록 (9질문 × 3밴드 = 27엔트리)

partyA=송다은, partyB=최수민. 호칭: "송다은 씨"/"최수민 씨"

### dc-1 "집착의 겉면" (송다은 + 최수민 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 1 | dc-1.a.q1 | "최수민 씨가 예비신랑에게 연락한 기록을 보셨을 때, 제일 먼저 든 감정이 무엇이었습니까?" | a |
| 2 | dc-1.b.q1 | "9일 동안 예비신랑에게 계속 연락하신 건 맞습니까? 무엇을 전달하려 하셨습니까?" | b |

### dc-2 "뒤집힌 순서" (최수민 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 3 | dc-2.b.q1 | "예비신랑의 메시지를 받았을 때, 송다은 씨에게 바로 알리지 않은 이유는 무엇입니까?" | b |

### dc-3 "같은 부탁" (송다은 + 최수민 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 4 | dc-3.b.q1 | "송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸 걸 어떻게 아셨습니까?" | b |
| 5 | dc-3.a.q1 | "아버지가 예비신랑에게 돈 관련 연락을 했다는 사실을 알고 계셨습니까?" | a |

### dc-4 "손절의 값" (최수민 + 송다은 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 6 | dc-4.b.q1 | "과거에 송다은 씨 아버지에게 당한 일을 왜 송다은 씨에게 말하지 않았습니까?" | b |
| 7 | dc-4.a.q1 | "과거 손절이 최수민 씨의 변심이 아니라 아버지 문제 때문이었을 수 있다는 생각은 해보셨습니까?" | a |

### dc-5 "낙인의 순서" (송다은 + 최수민 대상)

| # | questionId | 질문 텍스트 | target |
|---|-----------|-----------|--------|
| 8 | dc-5.a.q1 | "공통 친구 단톡방에 최수민 씨에 대해 올린 글, 사실 확인은 하고 올리셨습니까?" | a |
| 9 | dc-5.b.q1 | "송다은 씨가 단톡방에 올린 내용을 보고도 해명하지 않은 이유는 무엇입니까?" | b |

---

## 규칙
- **합니다체** (재판관 대상 답변)
- 번역체 9패턴 금지
- A/B 리터럴 금지 → 실명 사용
- Truth Throttle 준수 (early=모호, mid=일부, late=구체)
- variants 3개, 각 200~400자
- variants 간 90% 이상 동일 텍스트 금지
- behaviorHint: 구체적 행동 ("화난다" ❌ → "손가락으로 탁자를 두드리다 멈춘다" ✓)
- **같은 카드의 다른 질문은 반드시 다른 응답이어야 함** (q1과 q2가 같은 텍스트 금지)

## 첨부 파일
- `family-01-existing-dossier-example.json` — 기존 엔트리 형식+태그 참조
- `family-01-dossier-cards.json` — DossierCards 전체 (질문 텍스트 참조)
- `friend-01-dossier-cards.json` — DossierCards 전체
- `missing-entries.json` — 누락 목록 참조
