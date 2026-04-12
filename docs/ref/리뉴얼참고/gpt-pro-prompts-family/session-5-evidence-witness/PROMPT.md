# Session 5: 증거 제시 + 증인 + 도시에 + 후일담 + 시스템 메시지

> **채널**: evidence_present, witness, dossier, aftermath, system_message
> **이 세션은 분량이 클 수 있습니다. 필요시 5a(증거)/5b(증인+나머지)로 나눠서 진행하세요.**

---

## 작업 지시

session-0-context의 규칙을 준수하며, 심문 이외의 모든 채널 ScriptedText를 생성해주세요.

---

## Part A: evidence_present (증거 제시 대사)

### 개요

플레이어가 NPC에게 증거를 제시했을 때의 반응.
LieBand 3단계: early(S0~S1), mid(S2~S3), late(S4~S5)
각 entry 5 variant.

### 출력 형식

```json
{
  "session": "session-5a-evidence",
  "channel": "evidence_present",
  "entries": [
    {
      "key": "b|e-1|early|self",
      "party": "b",
      "evidenceId": "e-1",
      "lieBand": "early",
      "subjectRole": "self",
      "stanceHint": "hedge",
      "truthLevel": "hint",
      "variants": [
        { "id": "v1", "text": "...", "behaviorHint": "..." },
        ...5개
      ]
    }
  ]
}
```

### 증거 7종 × 2 party × 3 lieBand = 42 entries

아래 표에서 **self**(본인 관련) 반응과 **other/both**(상대/양쪽 관련) 반응이 다름에 주의.

---

### e-1: 60:40 유서 사본

내용: 어머니 사망 두 달 전 작성. B 60%, A 40%. 공증 도장.

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (self) | early | self | 분노. "어머니를 모시고 산 건 저입니다. 40이 말이 됩니까." |
| A (self) | mid | self | "이 유서가 나온 경위를 동생한테 물어보십시오." |
| A (self) | late | self | "이 비율이 어머니 뜻인지 동생 뜻인지, 이제 좀 보이기 시작합니다." |
| B (self) | early | self | "어머니가 쓰신 겁니다." — 최소 답변 |
| B (self) | mid | self | "이 유서가 만들어진 과정은... 복잡합니다." |
| B (self) | late | self | "이 비율에는 이유가 있습니다. 제가 설명하겠습니다." |

---

### e-2: 요양원 방문기록

B가 말년에 유독 자주 방문 + 공증 3주 전 요양보호사 교체.

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (other) | early | other | "자주 간 건 동생이 인정했습니다. 왜 갑자기 자주 갔겠습니까." |
| A (other) | mid | other | "보호사까지 바뀌었다는 건 처음 알았습니다. 동생이 바꿨습니까?" |
| A (other) | late | other | "공증 직전에 보호사가 바뀐 건 우연이 아닐 겁니다." |
| B (self) | early | self | "자주 간 건 맞습니다." — 담담 |
| B (self) | mid | self | "어머니 상태가 안 좋으셔서 더 자주 갔습니다. 보호사 건은 별개입니다." |
| B (self) | late | self | "보호사를 바꾼 건 어머니가 원하셔서입니다. 서두른 건 시간이 없었기 때문입니다." |

---

### e-3: 전 요양보호사 음성증언

"정후 씨가 종이를 자주 읽어드렸고, 형님 오기 전엔 끝내자고 조심스러워했다"

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (other) | early | other | "형 오기 전에 끝내자? 뭘 끝내겠다는 겁니까." |
| A (other) | mid | other | "종이를 읽어드렸다? 유서를 읽어드린 겁니다. 뭘 숨기려고 저를 빼놓은 거죠." |
| A (other) | late | other | "조심스러워했다는 건 뭔가를 알고 있었다는 뜻 아닙니까. 그래도 형을 배제한 건 맞습니다." |
| B (self) | early | self | "어머니한테 필요한 서류를 읽어드린 겁니다." — 최소 인정 |
| B (self) | mid | self | "끝내자고 한 건 어머니가 힘들어하시기 전에 마무리하려 한 겁니다." |
| B (self) | late | self | "형이 보시면 싸울까 봐 조심한 것도 맞습니다. 하지만 어머니를 배제한 건 아닙니다." |

---

### e-4: 공증사무실 스캔 보관본

같은 날 두 번 스캔: 앞=90:10, 뒤=60:40. 마지막 제출자=B.

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (other) | early | other | "같은 날 두 번? 중간에 바꿨다는 뜻 아닙니까." |
| A (other) | mid | other | "90이 60으로 바뀌었습니다. 동생이 바꾼 겁니다." |
| A (other) | late | other | "줄인 거라고요? 90을 60으로? 그게 가능합니까?" — 혼란 |
| B (self) | early | self | "서류를 다시 제출한 건 맞습니다." |
| B (self) | mid | self | "두 번 제출한 이유가 있습니다. 원래 비율을 바꿨습니다." |
| B (self) | late | self | "90을 60으로 줄인 겁니다. 제 몫을 줄였습니다." |

---

### e-5: 어머니 서랍 원본 유서

날짜 더 앞, 내용 90:10 (B에게 90%).

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (both) | early | both | "이게 원본이라면... 어머니는 동생한테 90을 주려 했다는 겁니까?" — 충격 |
| A (both) | mid | both | "어머니가 왜 동생한테 90을 주려 했는지 모르겠습니다." |
| A (both) | late | both | "어머니의 마음을 몰랐습니다. 곁에 있었으면서." |
| B (self) | early | self | "어머니가 쓰신 원본 맞습니다." |
| B (self) | mid | self | "이것이 어머니의 원래 뜻이었습니다. 이유가 있습니다." |
| B (self) | late | self | "어머니가 90을 남기신 데는 20년의 이유가 있습니다." |

---

### e-6: 20년 송금 내역 묶음

B→어머니 매달 생활비 + A 부도 때 큰돈 = B 돈.

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (both) | early | both | "이 송금 기록이 동생 명의입니까?" — 처음 알게 됨 |
| A (both) | mid | both | "어머니한테 온 돈이 동생 돈이었다고요? 매달?" |
| A (both) | late | both | "공장이 무너질 뻔했을 때 받은 돈도 동생 돈이었습니까? 어머니 돈인 줄 알았습니다." |
| B (self) | early | self | "제가 보낸 겁니다." — 무표정 인정 |
| B (self) | mid | self | "어머니 통장을 경유해서 보냈습니다. 형이 모르게." |
| B (self) | late | self | "20년 동안 보냈습니다. 형이 알면 안 받으실 거니까." |

---

### e-7: 어머니 일기장 사진

"태성이도 네 아버지 피는 아니다", "정후가 형 지켜주겠다 했다", "90대 10으로 남기면 태성이 끝까지 파고들까 무섭다"

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (both) | early | both | "이게 어머니 글씨입니까? 아버지 피가 아니라니요?" — 충격 |
| A (both) | mid | both | "어머니가 이런 걸 쓰셨습니까. 아무한테도 말하지 않으셨습니까." |
| A (both) | late | both | "동생이 이걸 알고도 저한테 말 안 한 겁니까. 나를 지키려고?" |
| B (self) | early | self | "어머니 글씨 맞습니다." — 한 마디 |
| B (self) | mid | self | "이 일기장을 보고 유서를 바꾸기로 결심했습니다." |
| B (self) | late | self | "형이 파고들면 이게 터집니다. 그래서 90을 60으로 낮춘 겁니다." |

---

## Part B: witness (증인 증언)

### 개요

3인 증인, 각 3단계 depth (vague → partial → full), 각 3 variant.
**총 9 entries, 27 variants.**

### 출력 형식

```json
{
  "session": "session-5b-witness",
  "channel": "witness",
  "entries": [
    {
      "key": "w-1|vague",
      "witnessId": "w-1",
      "depth": "vague",
      "stanceHint": "answer",
      "truthLevel": "hint",
      "variants": [
        { "id": "v1", "text": "...", "behaviorHint": "..." },
        { "id": "v2", "text": "...", "behaviorHint": "..." },
        { "id": "v3", "text": "...", "behaviorHint": "..." }
      ]
    }
  ]
}
```

---

### w-1: 최복순 (61, 전 요양보호사) — 중립

- **아는 것**: 공증 전 분위기, B의 말투와 행동, 어머니 상태를 가장 가까이서 본 인물
- **핵심 역할**: d-1 핵심 증인. 어머니의 의사 능력과 B의 행동 동시 증언.
- **어체**: 합니다체, 솔직하고 직설적인 톤 (60대 중년 여성)

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "정후 씨가 자주 오신 건 맞습니다. 어머님은 좋아하셨습니다" — 방문 사실 + 긍정적 분위기 |
| partial | partial | "종이를 읽어드리는 걸 몇 번 봤습니다. 어머님이 고개를 끄덕이시기도 하고, 어떤 날은 멍하실 때도 있었습니다" — 유서 관련 + 어머니 상태 양면 |
| full | full | "정후 씨가 '형님 오시기 전에 마무리하자'고 하신 건 맞습니다. 근데 그게 나쁜 뜻이었는지는 모르겠습니다. 형 분이 오시면 큰소리가 나니까. 어머님이 그걸 무서워하셨어요" — 핵심: "배제"가 아니라 "보호"일 수 있다는 관점 전환 |

---

### w-2: 김영수 (57, 공증사무실 직원) — 중립

- **아는 것**: 같은 날 두 버전 유서 접수, B가 다시 제출한 사실
- **핵심 역할**: d-2 핵심 증인. 유서 조작의 객관적 확인.
- **어체**: 합니다체, 직업적이고 조심스러운 톤

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "그 건은 기억합니다. 하루에 같은 분이 두 번 오신 건 흔한 일은 아닙니다" |
| partial | partial | "처음 가져오셨을 때 비율이 한쪽으로 많이 치우쳐 있었습니다. 두 번째는 좀 더 균형 잡힌 비율이었습니다" — 90→60 변화 방향 힌트 |
| full | full | "첫 번째 서류에 90대 10으로 적혀 있었고, 두 번째는 60대 40으로 바뀌어 있었습니다. 제출하신 분은 같은 분이었습니다. 자기 쪽 비율이 줄어든 서류를 다시 가져오신 겁니다" — 핵심 반전: 조작이 아니라 양보 |

---

### w-3: 박순애 (69, 어머니의 오래된 친구) — pro_B

- **아는 것**: "정후가 보내주는 돈으로 겨우 버틴다"고 어머니가 말함 + 형 몰래 동생이 집을 받쳐왔다는 배경
- **핵심 역할**: d-3, d-5 보강. B의 헌신을 간접 증명.
- **어체**: 합니다체, 감정적이고 회고적인 톤 (어머니와의 우정)

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "그 집안 사정을 조금 알고 있습니다. 어머니가 힘들어하셨습니다" — 배경만 |
| partial | partial | "어머니가 '정후가 보내주는 돈으로 겨우 버틴다'고 하신 적 있습니다. 큰아들한테는 비밀이라고" — B 송금 + 비밀 유지 |
| full | full | "어머니가 마지막에 '태성이는 몰라야 한다. 알면 무너진다'고 하셨습니다. 정후가 그 짐을 혼자 지고 있다고. 구체적으로 뭔지는 말씀 안 하셨지만, 무거운 것이라는 건 느꼈습니다" — 출생 비밀 암시 + B의 짐 |

---

## Part C: dossier (도시에 카드 대사)

### 도시에 카드 설계 (V4 기준)

도시에 카드 = 심문 중 특정 조건 달성 시 해금되는 결정적 질문.
3 lieBand × 3 variant.

| ID | 대상 | 질문 내용 | 해금 조건 |
|----|------|---------|----------|
| dc-1 | B | "유서를 고친 건 맞는데, 왜 자기 몫을 더 가져가는 쪽이 아니라 덜 가져가는 쪽으로 바꿨습니까?" | d-2 S3+, e-5 해금 |
| dc-2 | B | "형이 평생 어머니 돈인 줄 알았던 그 돈, 사실은 당신 돈이었습니까?" | d-3 S2+, e-6 해금 |
| dc-3 | B | "60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?" | d-4 S3+, e-7 해금 |

### 출력 형식

```json
{
  "session": "session-5c-dossier",
  "channel": "dossier",
  "entries": [
    {
      "key": "b|dc-1|early",
      "party": "b",
      "dossierQuestionId": "dc-1",
      "lieBand": "early",
      "stanceHint": "hedge",
      "truthLevel": "hint",
      "variants": [
        { "id": "v1", "text": "...", "behaviorHint": "..." },
        { "id": "v2", "text": "...", "behaviorHint": "..." },
        { "id": "v3", "text": "...", "behaviorHint": "..." }
      ]
    }
  ]
}
```

**총 entries**: 3 questions × 3 lieBands = 9 entries, 27 variants

### 도시에 대사 원칙
- 도시에 질문은 핵심을 직접 찌름 → 답변도 다른 심문보다 구체적
- early: 방어적이지만 힌트 제공
- mid: 부분 인정
- late: 거의 전부 인정

---

### dc-1: "왜 자기 몫을 덜 가져가는 쪽으로 바꿨습니까?"

효과: d-2를 S4~S5로 밀어올리며 조작의 진짜 이유를 캐묻게 함.

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|------------|----------|
| early | hedge | hint | "말씀드리기 어렵습니다. 제가 더 가져가려 한 건 아니라는 것만 알아주십시오." |
| mid | partial | partial | "90이 제 몫이었는데, 그대로 두면 형이 법정까지 올 것이라고 판단했습니다." |
| late | confess | full | "형이 파고들면 유서만이 아니라 더 큰 것이 터집니다. 그걸 막으려고 제 몫을 줄인 겁니다." |

---

### dc-2: "그 돈, 사실은 당신 돈이었습니까?"

효과: d-3의 숨은 20년 서사를 강제로 열어줌.

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|------------|----------|
| early | hedge | hint | "어머니를 돕기 위해 돈을 보낸 적은 있습니다." |
| mid | partial | partial | "매달 생활비를 보냈습니다. 형이 어머니 돈으로 알게 해달라고 어머니가 부탁하셨습니다." |
| late | confess | full | "생활비도, 공장 살린 돈도, 전부 제 돈이었습니다. 형 이름으로 보낸 적은 한 번도 없습니다." |

---

### dc-3: "60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?"

효과: B의 마지막 자백 유도 (돈보다 더 큰 것을 막으려 했다).

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|------------|----------|
| early | hedge | hint | "형이 잃을 수 있는 게 있습니다. 지금은 말하기 어렵습니다." |
| mid | partial | partial | "돈보다 더 큰 것을 잃게 됩니다. 형이 자기 자신에 대해 알고 있는 것이 바뀝니다." |
| late | confess | full | "형도 아버지의 친자가 아니라는 걸 알게 됩니다. 공장도, 집안에서의 자리도, 형이라는 정체성도 흔들립니다." |

---

## Part D: aftermath (후일담)

### 출력 형식

```json
{
  "session": "session-5d-aftermath",
  "channel": "aftermath",
  "entries": [ ... ]
}
```

**화자**: 내레이터 (3인칭 관찰 시점)
**variant 수**: 2개
**behaviorHint 불필요**

| resultClass | 내용 방향 |
|-------------|----------|
| a_primary_fault | A의 평생에 걸친 괄시와 악의적 해석이 더 큰 문제로 판단됨. B의 유서 조작은 가족 보호 목적이었으나, 어머니 뜻을 고친 것 자체는 남는다. A가 돌아보는 이후. |
| b_primary_fault | B의 유서 조작이 동기와 무관하게 "치매 어머니의 문서를 임의로 변경한 행위"로서 더 큰 문제. 20년 헌신은 인정되나 방법이 잘못됐다. B가 받아들이는 이후. |
| shared_fault | 형은 곁에 두고도 몰랐고, 동생은 알면서도 혼자 졌다. 어머니의 유서는 두 아들 모두에게 온전히 전달되지 못했다. 유산보다 관계가 문제. |
| protective_resolution | 재판관이 유서 비율보다 형제 관계 회복을 우선. 출생 비밀은 형이 수용할 시간이 필요하고, 유산은 어머니의 뜻을 존중하되 형에게 적절한 배려를 권고. |
| procedural_caution | 재판관이 유서 변경의 법적 위험을 경고하면서도, 어머니의 원래 뜻(90:10)이 존재했다는 사실과 B의 동기를 함께 고려. 법적 정리와 관계 정리를 분리하여 권고. |

---

## Part E: system_message (시스템 메시지)

### 출력 형식

```json
{
  "session": "session-5e-system",
  "channel": "system_message",
  "entries": [ ... ]
}
```

**variant 수**: 2개
**behaviorHint 불필요**

| key | context | eventType | 내용 |
|-----|---------|-----------|------|
| interrogation\|repeat_warning | interrogation | repeat_warning | 같은 질문 반복 시 경고 |
| evidence\|new_unlock | evidence | new_unlock | 새 증거 해금 알림 |
| evidence\|trap_notice | evidence | trap_notice | 증거 함정 알림 (잘못된 대상에게 제시) |
| dossier\|challenge_cleared | dossier | challenge_cleared | 도시에 카드 해금 알림 |
| witness\|new_available | witness | new_available | 새 증인 이용 가능 알림 |
| phase\|transition | phase | transition | 페이즈 전환 알림 |

---

## 전체 체크리스트

- [ ] evidence: self와 other/both 반응이 명확히 다른가
- [ ] evidence: lieBand에 따라 구체성이 점진적으로 증가하는가
- [ ] evidence: e-1~e-3(초기 공개)은 early부터 반응 가능, e-4~e-7은 해금 조건 충족 후 등장
- [ ] evidence: A의 e-5~e-7 반응은 "처음 알게 되는 충격"이 반영되는가
- [ ] witness: vague → partial → full 정보량이 확실히 다른가
- [ ] witness: w-1의 full에서 "형 배제"가 아닌 "어머니 보호"일 수 있다는 관점 전환이 나오는가
- [ ] witness: w-2의 full에서 "자기 몫이 줄어든 서류를 다시 가져왔다"는 핵심 반전이 나오는가
- [ ] witness: w-3의 full에서 출생 비밀을 직접 말하지 않되 암시하는가
- [ ] dossier: dc-1→dc-2→dc-3 순서로 사건의 깊이가 깊어지는가
- [ ] dossier: 핵심을 직접 찌르는 질문에 대한 구체적 답변인가
- [ ] aftermath: 3인칭 관찰 시점, 양쪽 모두 언급, 판결 후 분위기
- [ ] aftermath: 어머니의 존재가 회고적으로 언급되는가
- [ ] 전체: 기획 용어 0건, 호칭 규칙 준수
- [ ] 전체: A(confrontational), B(affect_flattening) 톤 일관성
