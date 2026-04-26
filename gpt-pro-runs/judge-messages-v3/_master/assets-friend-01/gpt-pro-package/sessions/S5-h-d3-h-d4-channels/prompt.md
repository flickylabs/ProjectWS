# S5: h-d3/h-d4 추가 채널 + variants 확장

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(송다은/최수민), dispute, evidence, dossier에 맞춰 작업하라.


**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
3개 NPC 응답 채널 (contradiction_pursuit / interjection / emotional_overload)에 **h-d3/h-d4 disputes 추가** + 모든 cell variants 확장 (3v→10v / 2v→10v).

## 분량

| 채널 | 현재 | 보완 후 | 추가 entries |
|---|---|---|---|
| contradiction_pursuit | 16 cells × 3v = 48 | 32 cells × 10v = 320 | **+272** |
| interjection | 8 cells × 3v = 24 | 16 cells × 10v = 160 | **+136** |
| emotional_overload | 4 cells × 2v = 8 | 8 cells × 10v = 80 | **+72** |
| **합계** | 80 entries | 560 entries | **+480** |

⚠️ 명세 v2 합계와 미세 차이 — 이 세션 정확 분량은 **+480**

---

## Part 1: contradiction_pursuit (모순 추궁 NPC 응답)

### 키 패턴
- `{party}|{disputeId}|{lieState}` (현재 d-1/d-2만, h-d3/h-d4 추가)
- 4 disputes × 2 parties × 4 lieStates (S1~S4) = **32 cells**

### 의미
재판관이 모순 추궁(judge_contradiction) 후 NPC 응답. 자기 진술 변화를 인정 또는 합리화.

### 출력 형식
```json
{
  "key": "a|h-d3|S2",
  "party": "a",
  "disputeId": "h-d3",
  "lieState": "S2",
  "stanceHint": "hedge",
  "truthLevel": "partial",
  "variants": [
    // 10 variants — 신규 cells (h-d3/h-d4) 또는 기존 cells (d-1/d-2) 확장
  ]
}
```

### 작성 가이드

기존 32 cells × 10v 모두 다음 차원 매핑:
- continuity:contradiction_press (모든 entries)
- emotion 변동: cautious / measured / shaken / resigned (4 lieStates 따라)

#### h-d3 (적금 3,000만 해지 — A 책임 75)
- a (박지연):
  - S1: 위임장 절차 회피 ("그건 그저 절차였습니다")
  - S2: 핑계 ("남편이 동의했을 거라 믿었습니다") ⚠️ "사전 상의/협의" 단어 금지
  - S3: 책임 전가 ("저는 그저 가족을 지키려 했습니다")
  - S4: 감정 폭발 ("그렇게 안 했으면 저는 끝장이었습니다!")
- b (이준호):
  - S1: 부분 인정 ("그 적금이 빠진 건 알았습니다")
  - S2: 핑계 ("정확한 경위는 몰랐습니다")
  - S3: 책임 분담 ("제가 침묵한 게 단초였습니다")
  - S4: 감정 ("처가 앞에 가장 노릇 못 한 게 부끄러웠습니다")

#### h-d4 (은폐와 선제행동 순서 — 50:50)
- a:
  - S1~S2: 자기 단정의 정당성
  - S3~S4: 단정 책임 + 위임장 인정
- b:
  - S1~S2: 침묵의 정당성 (시댁 갈등 두려움)
  - S3~S4: 침묵 = 단초 인정

---

## Part 2: interjection (NPC 끼어들기)

### 키 패턴
- `{party}|{disputeId}|{severity}`
- 4 disputes × 2 parties × 2 severity = **16 cells**
- severity: minor / major

### 의미
상대 발언 중간에 끼어드는 외침. 발언 흐름 잠시 끊음.

### 출력 형식
```json
{
  "key": "a|h-d3|major",
  "party": "a",
  "disputeId": "h-d3",
  "severity": "major",
  "stanceHint": "blame",
  "truthLevel": "hint",
  "variants": [
    // 10 variants
  ]
}
```

### 작성 가이드
- minor: "잠깐만요, 재판관님. 제 ~가 지금 ~한 것처럼 말씀하시는데..." (정중한 끼어들기)
- major: "재판관님, 저건 ~입니다!" (감정 폭발)

#### h-d3 (위임장 조작) — 박지연 입장 강한 부담
- a major: "재판관님, 저는 그렇게 한 게 아닙니다! 제 남편이 ~"
- b minor: "잠깐만요, 제가 ~"

#### h-d4 (은폐 순서)
- 양측 모두 자기 책임 완화 시도

---

## Part 3: emotional_overload (감정 과부하)

### 키 패턴
- `{party}|{disputeId}`
- 4 disputes × 2 parties = **8 cells**

### 의미
NPC 감정이 한계 도달 → 발화 끊김 + 자기 통제 회복 시도.

### 출력 형식
```json
{
  "key": "a|h-d3",
  "party": "a",
  "disputeId": "h-d3",
  "stanceHint": "emotional",
  "truthLevel": "hint",
  "variants": [
    // 10 variants
  ]
}
```

### 작성 가이드
- "...더는 말씀 못 드리겠습니다. 지금은 ~"
- 박지연: 위임장 두려움 / 시댁 미움 표출
- 이준호: 형 미안함 / 시댁 두려움 표출
- emotion 한계 도달 → 짧은 잠시 후 회복 시도

## 입력 자료
- game-events.json: 모순 추궁 + 끼어들기 + 감정 폭발 정의
- game-events-v2.json: contradictions 16건 (각 dispute별)
- atoms-current.json: lieState별 atoms

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] h-d3/h-d4 신규 cells 정확 (party × dispute × lieState/severity)
- [ ] 기존 d-1/d-2 cells도 5→10 v 확장
- [ ] 캐릭터 voice 보존 (박지연 victim / 이준호 avoidant)
- [ ] emotional/confession beat (S4/S5)만 해요체 일부 OK
