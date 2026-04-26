# S7: trust_action 보강 + mediation 변환 + system_message 신규 + milestone 신규

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(윤태성/윤정후), dispute, evidence, dossier에 맞춰 작업하라.


**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
4개 채널 동시 작업 — 자율 보정으로 처리 어려운 영역.

## 분량
| 채널 | 작업 | 추가 entries |
|---|---|---|
| trust_action | 18 cells × 2v=36 → 18 × 10v=180 | **+144** |
| mediation | paths 형식 → entries 형식 변환 + 8 cells × 10v=80 | **+72** |
| system_message | 5 신규 event 추가 + 5v 정책: 6×2=12 → 11×5=55 | **+43** |
| rapport_milestone (신규) | 6 cells × 5v = 30 | **+30** |
| contradict_milestone (신규) | 6 cells × 5v = 30 | **+30** |
| **합계** | | **+319** (명세 §6의 +260 — h-d4 inclusion으로 미세 증가) |

---

## Part 1: trust_action (v 확장 2→10)

### 키 패턴 (현재 유지)
- `{party}|{actionType}|{lieState}`
- 2 × 3 actionType × 3 lieState (S1~S3) = 18 cells

### actionType
- `separation`: 분리 심문 (혼자 있을 때 솔직 발화)
- `confidential`: 별실 (재판관과만)
- `immediate`: 즉시 답변 (압박)

### 작성 가이드

#### a (박지연) — 신뢰 행동
- separation S1: "둘이서만 말씀드리는 거죠? 그러면 제가 왜 그렇게 예민해졌는지는 조금 말씀드릴 수 있습니다."
- confidential S3: "재판관님께만 말씀드리겠습니다. 제 남편이 모르는 부분이 있어서…"
- immediate S2: "지금 답하라고 하시면… 그건 제가 바로 답할 수 있는 게 아닙니다."

#### b (이준호) — 신뢰 행동
- separation S1: "혼자 있을 때라면 말씀드릴 수 있습니다. 제 아내 앞에서는 제가 더 흔들립니다."
- confidential S3: "이건 제 가족 사정이라 제 아내에게는… 시댁 갈등 때문입니다."

---

## Part 2: mediation (paths 형식 → entries 변환 + v 확장)

### 현재 형식 (`paths.{4 paths}.dialogues[].{2 speakers × 1 line}` = 8 lines)
- 4 paths: immediate / conditional / postpone / fact_first
- 각 path: a 발화 1 + b 발화 1

### 새 형식
```json
{
  "key": "immediate|a",
  "path": "immediate",
  "speaker": "a",
  "stanceHint": "answer",
  "truthLevel": "partial",
  "variants": [
    // 10 variants
  ]
}
```

### 키 패턴
- `{path}|{speaker}` (4 × 2 = 8 cells)
- × 10v = 80 entries

### path별 의미 (Phase 6 중재 단계)
- **immediate**: 지금 결정 (양측 모두 핵심 사실 인정 의사)
- **conditional**: 조건부 (자기 보호 라인 제시)
- **postpone**: 시간 두기 (감정 안정 필요)
- **fact_first**: 사실 먼저 (정황 vs 사실 명확화 우선)

### 작성 가이드 (기존 8 lines 의미 보존하되 풍부하게)

#### immediate.a (박지연)
"지금 정리하셔도 됩니다. 다만 제 남편이 외도 의심으로 저를 먼저 단정한 부분과, 제가 공동 통장 이야기를 끝까지 피한 부분은 따로 봐주셨으면 합니다. 한꺼번에 섞이면 저는 또 말을 놓치게 됩니다." (기존 라인)

10 variants — 같은 의도 다른 표현. 박지연 victim_cosplay voice 보존.

#### conditional.b (이준호)
"조건부로 가는 건 괜찮습니다. 대신 제 남편이 베팅 여부와 돈 흐름부터 분명히 해야 외도 의심도 제가 거둘 수 있습니다." (기존 라인 — ⚠️ "베팅" 단어는 데이터 inconsistency 의심, 사건 데이터 직접 확인 필수)

⚠️ **mediation 데이터 inconsistency 가능성**:
- 기존 paths에서 "d-3" 언급 (h-d3 약칭? 또는 데이터 오류?)
- "베팅" / "투자 사기" 단어 정합성 확인
- 사건 데이터(`cases/generated/family-01.json`) 직접 read 후 작성

---

## Part 3: system_message (5 신규 event + v 5)

### 기존 6 events (v 5로 확장)
- interrogation | repeat_warning
- evidence | new_unlock
- evidence | trap_notice
- dossier | challenge_cleared
- witness | new_available
- phase | transition

### 신규 5 events
- `interrogation | judge_contradiction_trigger` — 재판관이 모순 발견
- `evidence | judge_combo_trigger` — DossierCard 콤보 발동
- `witness | judge_summon_trigger` — 증인 소환 결정
- `meta | rapport_milestone_trigger` — 신뢰 임계점 도달
- `meta | emotion_phase_shift_trigger` — 감정 단계 전환

### 톤 가이드
**기계적 관찰문 절대 금지** (CLAUDE.md):
- ❌ "태도에 변화가 감지됩니다"
- ✅ "진술이 달라지기 시작한다" (자연 narrative)

### 작성 예시
- judge_contradiction_trigger v1: "양측 진술 사이에 갈라진 지점이 보인다. 재판관이 그 틈을 짚는다."
- judge_combo_trigger v1: "두 증거가 합쳐지면서 가려졌던 그림이 드러난다."
- emotion_phase_shift_trigger v1: "한쪽의 표정이 무너지기 시작한다."

---

## Part 4: rapport_milestone (신규 채널)

### 키 패턴
- `{party}|{threshold}` (2 × 3 = 6 cells)
- threshold:
  - `low_to_mid` (+15)
  - `mid_to_high` (+30)
  - `high_to_open` (+50)

### 의미
신뢰 게이지 임계점 도달 시 NPC 발화 (재판관에 대한 신뢰감 표현).

### 출력 형식
```json
{
  "key": "a|low_to_mid",
  "party": "a",
  "threshold": "low_to_mid",
  "stanceHint": "partial",
  "truthLevel": "hint",
  "variants": [
    // 5 variants
  ]
}
```

### 작성 가이드

#### a (박지연) — low_to_mid
"재판관님께 말씀드리는 게 처음보다는 덜 무섭습니다. 제가 다 풀 자신은 없지만…"

#### b (이준호) — high_to_open
"재판관님이 끝까지 들어주실 거라는 믿음이 생깁니다. 그래서 한 발 더 말씀드리겠습니다."

---

## Part 5: contradict_milestone (신규 채널)

### 키 패턴
- `{party}|{token_count}` (2 × 3 = 6 cells)
- token_count: `1` / `2` / `3+`

### 의미
모순 누적 토큰 임계점 도달 시 NPC 발화 (자기 진술 변화 무게 인지).

### 출력 형식
```json
{
  "key": "b|3+",
  "party": "b",
  "token_count": "3+",
  "stanceHint": "shaken",
  "truthLevel": "partial",
  "variants": [
    // 5 variants
  ]
}
```

### 작성 가이드

#### a (박지연) — 1 token
"제가 말이 좀 흔들린 건 인정합니다. 다만…"

#### b (이준호) — 3+ tokens
"…제가 계속 흐리고 있다는 거 압니다. 더는 그러지 않겠습니다."

---

## 입력 자료
- mediation: 사건 데이터 + game-events.json mediationOptions
- system_message: 02-tone-guide.md 시스템 톤 규칙
- milestone: game-events.json transitionBeats 20건

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] mediation 데이터 inconsistency 검증 (d-3 / 베팅 단어)
- [ ] system_message: 기계적 관찰문 금지
- [ ] milestone: 임계점 도달 시점 발화 의도 명확
- [ ] rapport: 재판관에 대한 신뢰감 (NPC 입장)
- [ ] contradict: 자기 진술 변화 인지 (자기 평가)
