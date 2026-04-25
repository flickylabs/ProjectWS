# friend-01 V2 데이터 생성 — GPT Pro 작업 지시

> 이 폴더의 파일들을 읽고 그대로 산출물을 생성해주세요.

## 🎯 목표

솔로몬 법정 게임의 모순 시스템 V2 데이터 생성:

- **ContradictionEventV2**: 같은 캐릭터의 진술 변화만이 모순 (단일 화자)
- **ConflictEventV2**: 양측 주장 충돌 = '의견 충돌' (별도 카테고리, 극단 한정)

대상 사건: **friend-01 (송다은 × 최수민, 손절 + 예비신랑 접근)**

## 📂 입력 파일 (이 폴더 안)

| 파일 | 역할 |
|---|---|
| `01-types.md` | TypeScript 타입 정의 + spoilerLevel↔LieState 매핑 |
| `04-spec-friend-01.yaml` | 사건별 스펙 + truth 보호 목록 + 톤 가이드 |
| `05-lint-rules.md` | 검증 규칙 R1~R7 |

## 📦 산출물 명세

**단일 JSON 파일** (코드 블록으로 출력):

```json
{
  "contradictions": [/* 24개 ContradictionEventV2 */],
  "conflicts":      [/* 6~8개 ConflictEventV2 */]
}
```

### contradictions (정확히 24개)

- 4 dispute (`d-1`, `d-2`, `h-d3`, `h-d4`) × 2 party (`a`, `b`) × 3 spoilerLevel (`safe`, `partial`, `full`)
- 각 항목은 `01-types.md`의 `ContradictionEventV2` 인터페이스를 정확히 따름
- `id` 패턴: `friend-01-{disputeId}-{party}-{lieState}-c{n}` (예: `friend-01-d1-b-S2-c1`)

### conflicts (6~8개)

- 가시 쟁점만 (`d-1`, `d-2`) — hidden 쟁점(`h-d3`, `h-d4`) 사용 시 R6 위반
- `triggerCondition`: `'extreme_only'` 고정
- `effect`: `emotionDelta` -8 ~ -15, `trustDelta` -3 ~ -5

## 🚨 핵심 제약 (위반 시 LINT 실패)

1. **단일 화자**: ContradictionEventV2의 `previousStatement`/`currentStatement`는 같은 캐릭터의 두 발화. 양측 화자 섞으면 R3 ERROR.
2. **truth 보호**: `04-spec-friend-01.yaml`의 `banned_lexemes_safe` 단어(`아버지`, `사기`, `투자`, `돈`, `명목`, `피해자`, `경고`, `결혼 자금`)가 `safe` 등급 어디든 등장하면 R2 ERROR.
3. **호명**: `judgePursuitLine`은 `${name}` (`송다은`/`최수민`) 또는 `callTerms.toJudge` (`수민이`/`다은이`) 포함 필수.
4. **글자수**: previousStatement / currentStatement / judgePursuitLine = 30~60자, defenderReactionLine = 40~80자.
5. **spoilerLevel ↔ lieState 정합**: `safe`↔S0~S2, `partial`↔S3~S4, `full`↔S5.
6. **시간 압박**: 결혼 3주 전이라는 시간 압박을 발화에 자연스럽게 녹임 (특히 partial/full 등급).

## 🎨 한국어 톤 가이드

- **재판관 (judgePursuitLine, judgeMediationLine)**: 합니다체 필수
- **NPC (defenderReactionLine, partyA/B.statement)**:
  - 송다은 (archetype: `victim_cosplay`) — 감정형, 피해자 자기연출
  - 최수민 (archetype: `cold_logic`) — 냉정한 논리, 거리감
  - 재판관에게는 합니다체, 상대에게 직접 호칭은 `callTerms.angry` 사용
- **친구 사이**: 재판관에게는 합니다체, 상대에게는 반말 (`callTerms.angry` 활용)
- **lieState 부합**:
  - S0~S2 (safe) = 부정/얼버무림/모호한 변명
  - S3~S4 (partial) = 부분 인정 + 책임 전가
  - S5 (full) = 자백 본문 (truth 키워드 직접 노출 OK)

## ✅ 셀프 검증 (출력 전 필수)

산출물 출력 전에 R1~R7 자체 점검:

- [ ] R1: spoilerLevel ↔ defenderLieState 조합이 매핑표 일치
- [ ] R2: safe 항목 어디에도 `banned_lexemes_safe` 단어 0개
- [ ] R3: previousStatement/currentStatement에 상대 화자 등장 X
- [ ] R4: 글자수 범위 모두 통과
- [ ] R5: judgePursuitLine 24개 모두 호명 포함
- [ ] R6: conflicts의 disputeId가 `d-1` 또는 `d-2`만
- [ ] R7: emotionDelta -15..-5, trustDelta -5..-1

## 📤 출력 형식

1. (선택) 자체 점검 요약 1~2줄
2. **JSON 코드 블록 1개** — 위 산출물 명세 그대로

설명/해설 최소화, JSON 본문이 핵심.

## 📚 참고 예시

`04-spec-friend-01.yaml`의 `example_safe_contradiction` 섹션 참조 (톤·구조 견본).
