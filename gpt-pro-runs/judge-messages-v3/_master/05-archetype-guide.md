# Archetype × Verbal Tells 가이드

## 6 Archetype

### 1. avoidant (회피형)
- pattern: 직접 부정보다 모호어로 시간 벌기, 핵심어 회피
- 자주 쓰이는 tells: answer_delay, partial_scope, minimize_harm
- 예시 톤:
  - "그건… 잠시 후에 말씀드릴 수 있겠습니다."
  - "사실관계가 좀 다릅니다."
  - "한 번에 다 설명드리기가 어렵습니다."

### 2. confrontational (대립형)
- pattern: 직설, 공격, "분명히 ~입니다"
- tells: direct_attack, denial_loud, evidence_waving
- 예시:
  - "그건 사실이 아닙니다. 분명히 말씀드립니다."
  - "그 증거는 신빙성이 없습니다. 다시 보십시오."

### 3. victim_cosplay (피해자 연출형)
- pattern: 피해자 위치 먼저 잡기, 수치심/불안 핑계로 설명 범위 넓힘
- tells: victim_frame, helplessness, soft_confession
- 예시:
  - "재판관님, 제가 얼마나 참았는지 모르실 겁니다."
  - "그때는 다른 선택이 없었습니다."
  - "작은 부분은 인정합니다. 하지만 큰 잘못은 그 사람입니다."

### 4. cold_logic (냉정 논리형)
- pattern: 거리감, "사실관계만~"
- tells: over_precision, fact_only
- 예시:
  - "사실관계만 말씀드리겠습니다. 정확히 X시 X분에..."
  - "감정적 판단은 피하시지요."

### 5. affect_flattening (감정 무효화형)
- pattern: 감정 표현 억제, 평탄한 톤
- tells: emotion_mute
- 예시:
  - "그건 별로 중요하지 않습니다."
  - "특별한 감정 없이 일어난 일입니다."

### 6. premature_summary (조급 결론형)
- pattern: 빠르게 결론짓기, 자기 해석으로 마감
- tells: early_conclusion
- 예시:
  - "결론은 ~입니다. 더 이상 드릴 말씀이 없습니다."
  - "이 정도면 충분히 정리됐다고 봅니다."

## 6 Verbal Tells (전체 목록)

| tell | 작동 |
|---|---|
| over_precision | 과도한 정확성 ("정확히 X시 X분에...") |
| counter_question | 역질문 ("재판관님은 어떻게 생각하십니까?") |
| timeline_padding | 시간 채우기 ("그때... 음... 그러니까...") |
| evidence_waving | 증거 흔들기 ("그 증거는 신빙성이 없습니다") |
| motive_jump | 동기 점프 ("그건 그렇고...") |
| selective_quote | 선택 인용 ("앞부분만 들으셨는데...") |

추가로 character-info에서 사건별 verbalTells (각 캐릭터마다 3개 정도) 명시됨. 이를 우선 적용.

## 캐릭터별 적용

각 사건의 character-info.md 참조. archetype + verbalTells 정확 매핑.

### scene 작성 시 R7 체크
**모든 NPC variant에 archetype tell 1개 이상 포함 필수.**
- 같은 base 응답이라도 tell이 다르면 다른 variant.
- archetype 일관성 위반 시 R7 fail (07-lint-rules.md).
- character-info의 verbalTells 우선, 그 다음 archetype 일반 tells.

## archetype별 tone arc

### avoidant
defensive (S0) → cornered (S1~S2) → wavering (S3) → opening (S4) → resigned (S5)

### victim_cosplay
defensive (S0) → soft_confession (S1) → emotional (S2~S3) → broken (S4) → confessed (S5)

### confrontational
denial_loud (S0~S1) → counter_attack (S2) → angry (S3) → exhausted (S4) → forced_confession (S5)

### cold_logic
fact_only (S0~S2) → cracked (S3) → admitted (S4) → analyzed (S5)
