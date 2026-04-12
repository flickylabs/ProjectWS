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

아래 표에서 **적절 대상**(self) 반응과 **부적절 대상**(other) 반응이 다름에 주의.

---

### e-1: 영수증 묶음 (5장)

내용: 편의점 컵라면/삼각김밥, 올리브영 머리끈/틴트/헤어롤, 서점 중학교 참고서, 꽃집 화분, 주유소

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | 당황. "그건... 제가 산 겁니다" 수준. 구체 설명 회피 |
| B (self) | mid | self | "가족한테 필요한 것들이었습니다" — 가족 범위만 |
| B (self) | late | self | "조카한테 필요한 거 사다 준 겁니다. 참고서는 중학교 2학년 거예요" |
| A (other) | early | other | "제가 남편 차에서 찾은 겁니다. 남편한테 물어보세요" |
| A (other) | mid | other | "틴트, 머리끈... 제가 안 쓰는 물건들입니다. 누구 건지 남편이 답해야 합니다" |
| A (other) | late | other | "참고서요? 중학교 참고서가 왜 거기 있습니까?" — 조카 힌트 인지 시작 |

---

### e-2: 블랙박스 GPS / 네비 즐겨찾기

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "그 주소에 간 건 맞습니다" — 최소 인정 |
| B (self) | mid | self | "가족 문제로 다녔습니다. 자주 간 건 사실입니다" |
| B (self) | late | self | "형네 오피스텔 주소 맞습니다. 조카가 혼자 있으니까 자주 갔습니다" |
| A (other) | early | other | "이걸 제가 확인한 겁니다. 매일 같은 곳" |
| A (other) | mid | other | "몇 달째 같은 주소입니다. 야근이라고 했는데요" |
| A (other) | late | other | "오피스텔이라는 건 알겠는데... 거기가 어떤 곳인지는 남편이 말해야죠" |

---

### e-3: 통화기록

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "그 번호는... 설명드리겠습니다" — 말끝 흐림 |
| B (self) | mid | self | "가족한테 온 전화입니다. 새벽에 급한 일이 생기면 연락이 옵니다" |
| B (self) | late | self | "형 번호입니다. 조카가 아프거나 무서워하면 새벽에도 전화가 옵니다" |
| A (other) | early | other | "매일 새벽에 이 번호로 전화합니다. 누군지 물어보세요" |
| A (other) | mid | other | "같은 번호, 같은 시간. 이게 야근 전화입니까" |
| A (other) | late | other | "새벽 통화가 이렇게 많으면 급한 사정이 있는 건 맞나 봅니다" |

---

### e-4: 형 문자 스레드

"오늘도 부탁해", "가은이 학교 알림" 등

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "형한테 온 문자 맞습니다" — 최소 인정 |
| B (self) | mid | self | "형이 일 나가면서 부탁하는 겁니다. 가은이가 조카입니다" |
| B (self) | late | self | "형은 새벽부터 밤까지 일하니까 조카를 제가 봐야 합니다. 그 문자가 증거입니다" |
| A (other) | early | other | "이건 처음 봅니다. 이게 뭔 내용입니까?" — 진짜 모름 |
| A (other) | mid | other | "'가은이'? 누구입니까? '부탁해'가 무슨 뜻입니까?" |
| A (other) | late | other | "학교 알림이면... 아이가 있다는 얘기입니까? 남편한테 아이가?" — 오해 가능 |

---

### e-5: B 계좌 출금 내역

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| B (self) | early | self | "비자금에서 뺀 건 맞습니다" |
| B (self) | mid | self | "현금으로 뺐습니다. 계좌 이체가 안 되는 사정이 있었습니다" |
| B (self) | late | self | "3,000만원 현금 출금 맞습니다. 형에게 직접 전달했습니다" |
| A (both) | early | both | "이건 제가 이미 알고 있었습니다" — **주의: 감시 노출 위험** |
| A (both) | mid | both | "이 금액이 빠진 걸 봤을 때 딴살림을 확신했습니다" |
| A (both) | late | both | "이 돈이 어디로 갔는지는 이미 알고 있었습니다. 제가... 통장을 봐왔으니까요" |

---

### e-6: 투자방 카톡 + 송금 기록

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (self) | early | self | "이건... 제가 보낸 겁니다" — 당황 |
| A (self) | mid | self | "친구가 보내준 링크였습니다. 돈을 지키려고 한 건데 사기였습니다" |
| A (self) | late | self | "2,000만원 전부 넣었습니다. 하루 만에 사라졌습니다. 범죄인 건 압니다" |
| B (other) | early | other | "이건 처음 봅니다. 아내가 이런 걸 했습니까?" — 충격 |
| B (other) | mid | other | "투자방이요? 아내가 이런 데 돈을 넣었습니까?" |
| B (other) | late | other | "2,000만원을... 적금을 깨서 여기에 넣었다고요?" |

---

### e-7: 공동 적금 해지 서류

위임장 + 해지 기록

| 대상 | Band | subjectRole | 반응 방향 |
|------|------|-------------|----------|
| A (self) | early | self | "제가 해지했습니다" — 최소 인정 |
| A (self) | mid | self | "위임장을 써서 해지했습니다. 남편 동의 없이 한 건 맞습니다" |
| A (self) | late | self | "위임장에 남편 서명을 제가 썼습니다. 범죄 행위인 것 알고 있습니다" |
| B (other) | early | other | "제 동의 없이 해지됐습니다. 위임장은 제가 쓴 게 아닙니다" — 충격 |
| B (other) | mid | other | "이 서명은 제 것이 아닙니다. 아내가 위조한 겁니다" |
| B (other) | late | other | "위임장 조작은 범죄입니다. 하지만... 거기까지 몰아간 건 저입니다" |

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

### w-1: 오피스텔 경비 (중립)

- **아는 것**: 1주 2~3번 방문, 꽤 빈번. 정확한 호수 모름. 그 층에 여자 혼자 사는 집은 없는 것으로 알고 있음.
- **핵심 역할**: 외도 의심에 균열 — "여자 혼자 사는 집이 없다?"
- **어체**: 합니다체 (재판관에게)

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "그 분이 자주 오긴 합니다. 정확한 호수는 모릅니다" |
| partial | partial | "1주일에 2~3번은 봤습니다. 보통 저녁에 와서 몇 시간 있다 갑니다" |
| full | full | "그 층에 여자 혼자 사는 집은 없는 걸로 압니다. 가족이 사는 집이 있긴 합니다" |

---

### w-2: 은행 직원 (중립)

- **아는 것**: 위임장으로 적금 해지한 건이 있었음. 절차상 이상한 점이 있었지만 처리됨.
- **핵심 역할**: A의 위임장 조작 힌트
- **어체**: 합니다체 (재판관에게), 직업적 톤

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "해당 건은 처리된 것으로 기억합니다. 자세한 건 확인이 필요합니다" |
| partial | partial | "위임장이 첨부되어 있었습니다. 서명을 보고 약간 의아했지만 서류가 갖춰져 있어서 처리했습니다" |
| full | full | "솔직히 말씀드리면 서명 필체가 좀 달라 보였습니다. 하지만 위임장이 있으니 절차상 거부할 수가 없었습니다" |

---

### w-3: 박미라 (A 지인, pro_A 편향)

- **아는 것**: A가 "남편이 바람이면 내 돈부터 지키겠다"고 말함. 투자방 링크를 보냄.
- **핵심 역할**: A의 사기 경위 + 링크 전달 책임
- **어체**: 합니다체, 친구를 감싸려는 톤

| depth | truthLevel | 내용 방향 |
|-------|-----------|----------|
| vague | hint | "지연이가 힘들어하는 건 알았습니다. 제가 도와주고 싶었습니다" |
| partial | partial | "지연이가 '남편이 바람피면 돈이라도 지키겠다'고 했습니다. 그래서 제가 알고 있던 투자 정보를 보내줬습니다" |
| full | full | "투자방 링크는 제가 보냈습니다. 저도 그게 사기인 줄 몰랐습니다. 지연이한테 미안합니다. 제가 안 보냈으면 이런 일은 없었을 겁니다" |

---

## Part C: dossier (도시에 카드 대사)

### 도시에 카드 설계 (V4 기준)

도시에 카드 = 심문 중 특정 조건 달성 시 해금되는 결정적 질문.
3 lieBand × 3 variant.

| ID | 대상 | 질문 내용 | 해금 조건 |
|----|------|---------|----------|
| dc-1.b.q1 | B | "형에 대해 숨기는 이유가 시댁 갈등 때문입니까?" | B d-1 S2+ (가족 언급 후) |
| dc-2.b.q1 | B | "현금으로 전달한 이유가 형의 개인회생 때문입니까?" | B d-2 S3+ (형 언급 후) |
| dc-3.b.q1 | B | "오피스텔에서 정확히 무엇을 했습니까?" | B d-1 S1+ |
| dc-3.b.q2 | B | "조카는 몇 살이고 왜 혼자 있습니까?" | B d-1 S3+ (조카 언급 후) |
| dc-4.a.q1 | A | "남편 계좌를 언제부터 봐왔습니까?" | A d-2 S1+ (감시 언급 후) |
| dc-4.a.q2 | A | "적금 해지 과정을 정확히 설명해 주십시오" | A h-d3 S3+ (위임장 언급 후) |
| dc-5.b.q1 | B | "아내가 계좌를 봐온 걸 오늘 처음 알았습니까?" | h-d4 발현 후 |
| dc-5.a.q1 | A | "남편이 형을 도운 걸 알았다면 어떻게 했겠습니까?" | h-d4 발현 후 |

### 출력 형식

```json
{
  "session": "session-5c-dossier",
  "channel": "dossier",
  "entries": [
    {
      "key": "b|dc-1.b.q1|early",
      "party": "b",
      "dossierQuestionId": "dc-1.b.q1",
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

**총 entries**: 8 questions × 3 lieBands = 24 entries, 72 variants

### 도시에 대사 원칙
- 도시에 질문은 핵심을 직접 찌름 → 답변도 다른 심문보다 구체적
- early: 방어적이지만 힌트 제공
- mid: 부분 인정
- late: 거의 전부 인정

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
| a_primary_fault | A의 위임장 조작/사기가 더 큰 문제로 판단됨. B의 숨김은 가족 보호. 두 사람의 이후. |
| b_primary_fault | B의 비밀 유지/3,000만원 무단 사용이 더 큰 문제. A의 범죄는 B의 침묵이 몰아간 결과. |
| shared_fault | 양쪽 모두 숨기고, 움직이고, 무너뜨렸다. 5,000만원이 사라졌지만 진짜 잃은 건 신뢰. |
| protective_resolution | 재판관이 양쪽의 화해를 유도. 형/조카 문제도, 투자 사기도 함께 풀어야 할 문제. |
| procedural_caution | 재판관이 위임장 조작의 법적 위험을 경고하면서도, 관계 회복 가능성을 열어둠. |

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
| evidence\|trap_notice | evidence | trap_notice | 증거 함정 알림 |
| dossier\|challenge_cleared | dossier | challenge_cleared | 도시에 카드 해금 알림 |
| witness\|new_available | witness | new_available | 새 증인 이용 가능 알림 |
| phase\|transition | phase | transition | 페이즈 전환 알림 |

---

## 전체 체크리스트

- [ ] evidence: 적절 대상(self)와 부적절 대상(other/both) 반응이 명확히 다른가
- [ ] evidence: lieBand에 따라 구체성이 점진적으로 증가하는가
- [ ] witness: vague → partial → full 정보량이 확실히 다른가
- [ ] witness: 경비의 "여자 혼자 사는 집 없다"가 full에서 등장하는가
- [ ] witness: 은행 직원의 "서명 필체 의아" 언급이 partial~full에서 등장하는가
- [ ] dossier: 핵심을 직접 찌르는 질문에 대한 구체적 답변인가
- [ ] aftermath: 3인칭 관찰 시점, 양쪽 모두 언급, 판결 후 분위기
- [ ] 전체: 기획 용어 0건, 호칭 규칙 준수
