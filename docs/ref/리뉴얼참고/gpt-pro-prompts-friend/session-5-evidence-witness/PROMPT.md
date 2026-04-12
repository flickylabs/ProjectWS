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

### 증거 7종 x 2 party x 3 lieBand = 42 entries

아래 표에서 **적절 대상**(self) 반응과 **부적절 대상**(other) 반응이 다름에 주의.

---

### e-1: B→예비신랑 연락 기록

내용: 최근 9일 전화 6번, 문자 11번. 대부분 답 없거나 짧게 끊김.

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | 담담하게 인정. "연락한 건 맞습니다." 이유는 밝히지 않음 |
| B (self) | mid | self | "꼭 전해야 할 일이 있었습니다. 답이 없으니까 계속 보낸 겁니다" |
| B (self) | late | self | "경고하려고 연락한 겁니다. 답이 없으면 만나서라도 말해야 했습니다" |
| A (other) | early | other | "이게 제 예비신랑한테 연락한 증거입니다. 9일 동안이요" — 분노 |
| A (other) | mid | other | "답도 안 하는데 계속 보냈습니다. 이게 정상입니까" |
| A (other) | late | other | "이렇게까지 한 이유가 있긴 한 건가요... 그래도 이건 너무 합니다" |

---

### e-2: 공통 친구 단톡방 캡처

내용: A가 "수민이가 또 내 남자한테 연락한다", "예전에도 이래서 손절했다" + 친구들 비난

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (self) | early | self | "제가 올린 건 맞습니다" — 최소 인정, 정당화 |
| A (self) | mid | self | "화가 나서 그랬습니다. 확인 안 하고 올린 건 인정합니다" |
| A (self) | late | self | "수민이한테 해명할 기회도 안 주고 먼저 매도한 건 제 잘못입니다" |
| B (other) | early | other | "이렇게 말하고 다닌 줄 몰랐습니다" — 충격, 건조한 톤 |
| B (other) | mid | other | "확인도 안 하고 '또 남자한테 붙었다'라고 했다면 저는 뭡니까" |
| B (other) | late | other | "예전 일까지 끌어와서 같은 프레임을 씌운 겁니다. 제가 변명할 곳이 없게 만들었습니다" |

---

### e-3: 과거 손절 직전 카톡

내용: B "돈 문제는 내가 알아서 정리할게" / A "넌 돈만 엮이면 사람이 달라진다"

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (both) | early | both | "그때 수민이가 변한 거라고 생각했습니다. 이 대화가 증거입니다" |
| A (both) | mid | both | "뭘 정리한다는 건지 끝내 말 안 했습니다. 저는 물어볼 수도 없었습니다" |
| A (both) | late | both | "이제 보니 수민이가 숨긴 게 아버지 얘기였을 수 있습니다" |
| B (both) | early | both | "사실을 말할 수 없었습니다. 그래서 저렇게밖에 못 했습니다" |
| B (both) | mid | both | "'알아서 정리할게'가 제가 할 수 있는 전부였습니다. 진짜 이유는 말할 수 없었으니까" |
| B (both) | late | both | "다은이가 '돈만 엮이면 달라진다'고 했을 때, 맞다 할 수밖에 없었습니다. 진실을 말하면 아버지까지 무너지니까" |

---

### e-4: 예비신랑의 선넘는 메시지 + B의 거절

내용: 예비신랑 "다은이 몰래 커피 한 번 보자", "네가 내 이상형" / B "친구 남자친구니까 이러지 마"

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "이런 메시지를 받았습니다. 제가 먼저 한 게 아닙니다" |
| B (self) | mid | self | "거절했습니다. '친구 남자친구니까 이러지 마'라고 했습니다" |
| B (self) | late | self | "이걸 다은이한테 말하면 결혼이 깨집니다. 그래서 혼자 끊어낸 겁니다" |
| A (other) | early | other | "이건... 처음 봅니다" — 충격 |
| A (other) | mid | other | "'다은이 몰래 보자'요? 이 사람이 수민이한테 이런 말을 했다고요?" |
| A (other) | late | other | "수민이가 거절한 거잖아요. 그러면 수민이가 연락한 건... 다른 이유였던 겁니까" |

---

### e-5: A 아버지와 예비신랑의 문자

내용: A 아버지 "결혼 전에 잠깐만 도와주면 금방 돌려준다", "사위 될 사람이면 이 정도는 믿어야지"

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "이걸 보고 연락한 겁니다" — 담담하게 |
| B (self) | mid | self | "예전에 제한테 했던 것과 같은 말입니다. '금방 돌려준다', '이 정도는 믿어야지'" |
| B (self) | late | self | "같은 문구, 같은 방식입니다. 이번에는 막아야 했습니다" |
| A (both) | early | both | "아버지가... 이런 말을 했다고요?" — 충격 |
| A (both) | mid | both | "아버지가 예비신랑한테 돈 얘기를 꺼냈다니 믿기 어렵습니다" |
| A (both) | late | both | "이게 사실이면 수민이가 경고하려 한 게 이거였던 겁니까" |

---

### e-6: 과거 송금 영수증 + 문자

내용: A 아버지 "급한 투자금이니 한 달만 쓰고 갚겠다" + 이체 내역 + 차일피일 문자

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "이때 제 돈을 가져갔습니다" — 건조하게 |
| B (self) | mid | self | "'투자금'이라고 했습니다. 한 달만 쓰겠다고 했습니다. 돌아오지 않았습니다" |
| B (self) | late | self | "다은이한테 말할 수 없었습니다. '네 아빠가 사기꾼이다'를 어떻게 말합니까" |
| A (both) | early | both | "아버지가... 수민이한테 돈을?" — 충격과 혼란 |
| A (both) | mid | both | "이체 내역이 이렇게 있는데... 아버지가 정말 이러셨습니까" |
| A (both) | late | both | "수민이가 '돈 때문에 변했다'가 아니라, 아버지 때문에 떠난 거였습니까" |

---

### e-7: 과거/현재 대조표

내용: A 아버지의 과거 문구(B에게)와 현재 문구(예비신랑에게)가 거의 동일 + B 침묵 시점 일치

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (both) | early | both | "문구가... 같습니다" — 사실 확인 단계 |
| A (both) | mid | both | "예전에 수민이한테 한 말이랑 지금 예비신랑한테 한 말이 거의 똑같습니다" |
| A (both) | late | both | "수민이가 두 번 다 말하지 못하고 혼자 막으려 한 거였습니다. 저는 두 번 다 수민이를 버렸습니다" |
| B (both) | early | both | "또 같은 일이 반복되고 있었습니다" — 건조하게 |
| B (both) | mid | both | "같은 문구, 같은 시점. 우연이 아닙니다" |
| B (both) | late | both | "예전에도 말하지 못했고, 이번에도 말하지 못했습니다. 달라진 건 없습니다" |

---

## Part B: witness (증인 증언)

### 개요

3인 증인, 각 3단계 depth (vague -> partial -> full), 각 3 variant.
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

### w-1: 김세라 (32, 공통 친구, 미용실 직원) — d-5 핵심 증인

- **아는 것**: A가 단톡방에서 먼저 B를 몰아간 분위기, B에게 해명 기회가 거의 없었음
- **편향**: 중립 (양쪽 다 아는 사이)
- **어체**: 합니다체 (재판관에게)

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "단톡방에서 분위기가 한쪽으로 쏠린 건 맞습니다" |
| partial | partial | "다은이가 먼저 올렸습니다. 수민이 얘기를 하면서 '예전에도 이랬다'고 했습니다. 그 뒤로 다들 수민이를 욕하기 시작했습니다" |
| full | full | "수민이한테 연락해서 사정을 들어본 사람은 아무도 없었습니다. 다은이가 먼저 결론을 내버렸으니까요. 저도 그때 한마디 해줘야 했는데 분위기에 눌렸습니다" |

---

### w-2: 박준혁 (34, 예비신랑 회사 후배) — d-2 핵심 증인

- **아는 것**: 술자리 뒤 예비신랑이 B를 두고 한 말, 먼저 연락 이어가려 한 분위기
- **편향**: 중립 (예비신랑 후배지만 있는 그대로 증언)
- **어체**: 합니다체 (재판관에게)

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "술자리 뒤에 선배가 그 분 얘기를 좀 했습니다. 좋게 말한 건 아닙니다" |
| partial | partial | "선배가 '그 필라테스 하는 애 괜찮더라' 이런 식으로 얘기했습니다. 약혼녀 있는 사람이 그러면 안 되지 않습니까" |
| full | full | "선배가 먼저 연락을 이어가려 한 건 맞습니다. '몰래 한 번 보자' 같은 말도 했다고 들었습니다. 그 분이 거절했는데 선배가 계속 시도한 겁니다" |

---

### w-3: 오미경 (58, 동네 분식집 사장) — d-4 보강 증인

- **아는 것**: A 아버지가 B와 돈 이야기 하던 장면, 그 뒤 B가 혼자 울며 나간 것
- **편향**: 중립 (동네 어르신, 양쪽 다 아는 정도)
- **어체**: 합니다체, 동네 어르신 톤

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "그 아가씨가 몇 년 전에 혼자 울면서 나간 적이 있습니다. 그 전에 누구랑 얘기하고 있었는데 목소리가 좀 컸습니다" |
| partial | partial | "다은이 아버지가 오셨었습니다. 그 아가씨랑 뭔가 돈 얘기를 하더라고요. 그 뒤에 아가씨 혼자 남아서 울었습니다" |
| full | full | "그날 다은이 아버지가 '이번만 도와주면 금방 갚겠다'고 했습니다. 아가씨가 힘들어하는 게 보였어요. 그 뒤로 아가씨가 한동안 안 왔습니다. 나중에 다은이한테 물어봤더니 '수민이랑 손절했다'고 하더라고요" |

---

## Part C: dossier (도시에 카드 대사)

### 도시에 카드 3종

| ID | 대상 | 질문 내용 | 해금 조건 |
|----|------|---------|----------|
| dc-1 | B | "예비신랑이 먼저 선을 넘었다면, 왜 그때 바로 A에게 말하지 않았습니까?" | d-2 S3+, e-4 해금 |
| dc-2 | B | "A 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면, 당신은 이번에도 왜 혼자 막으려 했습니까?" | d-3 S2+, e-5 해금 |
| dc-3 | A | "직접 확인도 하지 않고 친구를 단톡방에서 먼저 매도한 건 당신 아닙니까?" | d-5 S2+, e-2 해금 |

3 cards x 3 lieBands = 9 entries, 27 variants

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

### 도시에 대사 원칙
- 도시에 질문은 핵심을 직접 찌름 -> 답변도 다른 심문보다 구체적
- early: 방어적이지만 힌트 제공
- mid: 부분 인정
- late: 거의 전부 인정

---

### dc-1 (B 대상): "예비신랑이 먼저 선을 넘었다면, 왜 그때 바로 A에게 말하지 않았습니까?"

효과: B의 반복 침묵 이유를 d-4(과거 사기)와 연결

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|-----------|----------|
| early | hedge | hint | "말하면 더 복잡해집니다" — 이유 모호하게 |
| mid | partial | partial | "다은이가 믿지 않았을 겁니다. 손절한 친구가 갑자기 나타나서 그런 말을 하면" |
| late | confess | full | "예전에도 말하지 못한 게 있었습니다. 그때도, 이번에도 말하면 다은이가 더 무너집니다" |

---

### dc-2 (B 대상): "A 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면, 당신은 이번에도 왜 혼자 막으려 했습니까?"

효과: B의 보호 본능과 자기희생 서사를 d-1, d-4로 밀어 올림

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|-----------|----------|
| early | hedge | hint | "혼자 하는 게 나을 때가 있습니다" — 이유 비공개 |
| mid | partial | partial | "다은이한테 말하면 아버지 얘기까지 나옵니다. 다은이가 감당할 수 있겠습니까" |
| late | confess | full | "또 제가 나쁜 사람이 되는 쪽이 다은이한테는 덜 아픕니다. 아버지 진실을 아는 것보다" |

---

### dc-3 (A 대상): "직접 확인도 하지 않고 친구를 단톡방에서 먼저 매도한 건 당신 아닙니까?"

효과: A의 성급한 단정과 명예훼손 축 압박

| Band | stanceHint | truthLevel | 반응 방향 |
|------|-----------|-----------|----------|
| early | deny | none | "매도가 아닙니다. 사실을 말한 겁니다" — 정당화 |
| mid | hedge | partial | "확인을 안 한 건 맞습니다. 하지만 그때는 확신이 있었습니다" |
| late | emotional | full | "제가 먼저 못 박아버렸습니다. 수민이한테 해명할 기회도 안 줬습니다" |

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
| a_primary_fault | A가 확인 없이 B를 두 번 매도한 것이 핵심 문제. B의 우회 연락은 방법의 문제지 의도의 잘못이 아님. A 아버지의 반복된 사기가 구조적 원인. 두 사람의 이후. |
| b_primary_fault | B가 매번 혼자 판단하고 우회한 것이 오히려 더 큰 오해를 만듦. 마음은 이해되나 이번에도 말 대신 행동을 선택해 A와 주변을 혼란에 빠뜨림. 직접 말했어야 했다. |
| shared_fault | A는 확인 없이 매도했고, B는 진실을 숨겼다. 둘 다 상대를 향한 마음이 있었지만 소통 방식이 잘못됐다. 10년 우정이 두 번 무너진 건 둘 다의 몫. |
| protective_resolution | 재판관이 B의 보호 동기를 인정하면서 A에게 아버지 문제 직면을 권고. 두 사람의 관계 회복 가능성을 열어둠. 예비신랑 문제는 별도 해결 필요. |
| procedural_caution | 재판관이 A의 명예훼손 리스크를 경고하면서, B의 우회 연락 방식의 문제도 지적. 양쪽 모두 소통 방식 개선 필요. 아버지 문제는 별도 법적 조언 권고. |

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
| evidence\|trap_notice | evidence | trap_notice | 증거 함정 알림 (초반 e-1+e-2가 B에게 불리한 함정 프레임) |
| dossier\|challenge_cleared | dossier | challenge_cleared | 도시에 카드 해금 알림 |
| witness\|new_available | witness | new_available | 새 증인 이용 가능 알림 |
| phase\|transition | phase | transition | 페이즈 전환 알림 |

---

## 전체 체크리스트

- [ ] evidence: 적절 대상(self)와 부적절 대상(other/both) 반응이 명확히 다른가
- [ ] evidence: lieBand에 따라 구체성이 점진적으로 증가하는가
- [ ] evidence: e-1+e-2 초반 함정 프레임 → e-4 1차 뒤집기 → e-5 2차 뒤집기 → e-6 3차 뒤집기 → e-7 최종 확정 흐름이 반영되는가
- [ ] witness: vague -> partial -> full 정보량이 확실히 다른가
- [ ] witness: w-1의 "해명 기회 없었다"가 partial~full에서 등장하는가
- [ ] witness: w-2의 "선배가 먼저 연락 이어가려 함"이 full에서 확인되는가
- [ ] witness: w-3의 "아버지가 돈 얘기, 아가씨 울었다"가 partial~full에서 등장하는가
- [ ] dossier: 핵심을 직접 찌르는 질문에 대한 구체적 답변인가
- [ ] dossier: dc-1이 d-4 연결, dc-2가 d-1/d-4 연결, dc-3이 d-5 압박으로 작동하는가
- [ ] aftermath: 3인칭 관찰 시점, 양쪽 모두 언급, 판결 후 분위기
- [ ] aftermath: "B가 두 번 다 악역이 됨" 구조가 반영되는가
- [ ] 전체: 기획 용어 0건, 호칭 규칙 준수
- [ ] 전체: A의 premature_summary + B의 affect_flattening 아키타입이 반영되는가
