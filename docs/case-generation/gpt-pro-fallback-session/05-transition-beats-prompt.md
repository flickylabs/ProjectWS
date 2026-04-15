# GPT Pro 추가 요청: transitionBeats — family-01, friend-01

> NPC lie state 전이 시 보이는 대사/연출 비트. 현재 family-01, friend-01에 0건 — 작성 필요.

---

## 첨부 파일

| 파일 | 용도 |
|------|------|
| `01-case-context.json` | 사건 맥락 (이미 전달됨) |
| `04-quality-rules.md` | 품질 규칙 (이미 전달됨) |
| 이 문서 하단의 spouse-01 참고 샘플 | 톤/구조 참고 |

---

## TransitionBeat 구조

NPC의 거짓말 상태(S0→S5)가 바뀔 때 플레이어에게 보이는 서술 비트입니다.

```json
{
  "id": "{caseId}-beat-{party}-{disputeId}-{fromState}-{toState}",
  "caseId": "{caseId}",
  "party": "a" | "b",
  "disputeId": "d-1",
  "fromState": "S1",
  "toState": "S2",
  "primaryBeatType": "hedge" | "partial" | "confession" | "emotional" | "evidence_hit" | "counter_shift",
  "line": "3인칭 관찰자 서술 — NPC가 어떤 말을 하고 어떤 태도를 보이는지 (1~2문장)",
  "behaviorHint": "시각적 연출 힌트 — 구체적 표정/동작/목소리 변화 (1문장)"
}
```

### 필드 설명

| 필드 | 설명 |
|------|------|
| `line` | **플레이어에게 보이는 핵심 서술**. "윤정후는 ~한다", "최수민은 ~한다" 형태. 사건의 구체적 사실 포함. |
| `behaviorHint` | 시각적/청각적 연출 힌트. "답이 짧아지고 시선이 아래로 떨어진다" 등. |
| `primaryBeatType` | 전이 성격: hedge(회피), partial(일부 인정), confession(시인), emotional(감정), evidence_hit(증거에 밀림), counter_shift(반격+인정) |
| `fromState → toState` | S0(완전 부정) → S1(일부 인정) → S2(핑계) → S3(책임전가) → S4(감정적) → S5(자백) |

### 작성 기준

- **핵심 전이만 선별** — 모든 쟁점 × 모든 state가 아니라, 스토리상 중요한 변곡점 6~10건
- S1→S2, S2→S3 전이가 가장 드라마틱 (첫 균열 ~ 핵심 인정)
- S4→S5(자백)는 가장 강력한 순간
- **line은 3인칭 관찰체** ("~한다/~한다고 말한다")
- **behaviorHint는 구체적 행동** ("화난다" ❌ → "주먹을 쥐며 시선을 내린다" ✓)
- 쟁점명을 따옴표로 직접 삽입 금지

---

## 사건별 요청

### family-01 (윤태성 vs 윤정후 — 형제, 유서 분쟁) — 8~10건

핵심 전이 포인트:
- **윤태성(A, confrontational)**: 처음엔 분노로 밀다가 → 동생의 희생이 드러나며 흔들림 → 자존심 vs 진실 사이에서 갈등
- **윤정후(B, affect_flattening)**: 담담하게 사실만 → 유서 조작 인정 → 자기 몫을 줄인 이유 → 형을 지키려 했다는 고백

쟁점별 추천 전이:
- d-1(유서 작성과 판단 능력): B가 어머니 판단력을 처음 인정할 때
- d-2(60:40 유서의 진짜 의도): B가 조작 사실을 인정하되 자기 몫을 줄였다고 말할 때
- d-3(20년 송금의 실체): A가 20년간 동생 돈이었다는 걸 처음 알았을 때
- d-4(출생 비밀과 침묵의 이유): B가 형의 출생 비밀을 알고 있었다고 인정할 때
- d-5(어머니 이용의 진짜 주체): 핵심 반전 — B가 형을 지키려 한 거였다는 고백

### friend-01 (송다은 vs 최수민 — 절친, 예비신랑 연락) — 8~10건

핵심 전이 포인트:
- **송다은(A, premature_summary)**: 결론부터 밀다가 → 아버지 사실이 나오며 결론이 무너짐 → 확인 없이 단정한 자신을 직면
- **최수민(B, affect_flattening)**: 감정을 눌러 담고 → 경고 목적을 인정 → 아버지에게 당한 일을 말하기 시작 → 악역을 자처한 이유 고백

쟁점별 추천 전이:
- d-1(9일간의 연락 의도): B가 집착이 아니라 경고였다고 처음 인정
- d-2(예비신랑의 선넘는 접근): B가 예비신랑이 먼저 선을 넘었다는 증거를 인정
- d-3(아버지의 돈 접근 패턴): A가 아버지의 돈 문제를 처음 직면
- d-4(과거 손절과 아버지의 사기): B가 "네 아버지가 내 돈을 가져갔다"를 말하는 순간
- d-5(단톡방 매도와 명예훼손): A가 확인 없이 단톡방에 올린 것을 인정

---

## spouse-01 참고 샘플 (6건)

```json
[
  {
    "id": "spouse-v3-01-beat-b-d1-s1-s2",
    "party": "b", "disputeId": "d-1", "fromState": "S1", "toState": "S2",
    "primaryBeatType": "evidence_hit",
    "line": "이준호는 더 숨기기 어려워졌다는 걸 알면서도 가족 일이라는 말만 먼저 꺼낸다.",
    "behaviorHint": "답이 짧아지고 시선이 아래로 떨어진다."
  },
  {
    "id": "spouse-v3-01-beat-b-d1-s2-s3",
    "party": "b", "disputeId": "d-1", "fromState": "S2", "toState": "S3",
    "primaryBeatType": "partial",
    "line": "이준호는 형네 일이었고 시댁 얘기만 꺼내면 더 크게 싸울 게 뻔해서 말을 못 했다고 털어놓는다.",
    "behaviorHint": "변명보다 이유 설명이 길어진다."
  },
  {
    "id": "spouse-v3-01-beat-b-d2-s2-s3",
    "party": "b", "disputeId": "d-2", "fromState": "S2", "toState": "S3",
    "primaryBeatType": "confession",
    "line": "이준호는 3,000만 원 전부 형 빚을 막는 데 썼다고 인정하지만 그때는 그 방법밖에 없었다고 덧붙인다.",
    "behaviorHint": "숫자를 말하는 목소리는 단단하지만 마지막 문장 끝이 흔들린다."
  },
  {
    "id": "spouse-v3-01-beat-a-hd3-s2-s3",
    "party": "a", "disputeId": "h-d3", "fromState": "S2", "toState": "S3",
    "primaryBeatType": "confession",
    "line": "박지연은 혹시 몰라 제 몫을 지키려 2,000만 원을 보냈고 결국 다 날렸다고 인정한다.",
    "behaviorHint": "금액 부분에서 속도가 느려진다."
  },
  {
    "id": "spouse-v3-01-beat-a-hd4-s2-s3",
    "party": "a", "disputeId": "h-d4", "fromState": "S2", "toState": "S3",
    "primaryBeatType": "counter_shift",
    "line": "박지연은 먼저 숨긴 쪽은 남편이었다고 되받아치지만 실제 송금이 먼저 실행된 건 자기 쪽이었다는 사실도 부정하지 못한다.",
    "behaviorHint": "상대 비난과 자기 인정이 한 문장 안에서 충돌한다."
  },
  {
    "id": "spouse-v3-01-beat-b-hd4-s2-s3",
    "party": "b", "disputeId": "h-d4", "fromState": "S2", "toState": "S3",
    "primaryBeatType": "partial",
    "line": "이준호는 자신이 먼저 숨긴 건 맞지만 먼저 돈을 움직인 건 박지연 쪽이었다고 힘겹게 선을 긋는다.",
    "behaviorHint": "고개를 끄덕인 뒤 바로 반박 문장을 이어 붙인다."
  }
]
```

---

## 출력 형식

사건별로 JSON 배열을 반환해 주세요:

```json
{
  "caseId": "family-01",
  "transitionBeats": [ /* 8~10건 */ ]
}
```

family-01, friend-01 각각 작성해 주세요.
