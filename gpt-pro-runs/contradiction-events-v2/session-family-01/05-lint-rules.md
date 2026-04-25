# 데이터 검증 규칙 R1~R7

> 검증 스크립트 위치 권장: `scripts/lint-contradiction-v2.ts` (현재 가이드만, 작성 X)

## 규칙

- **R1 (spoilerLevel ↔ lieState 정합)**: `safe` ↔ S0~S2, `partial` ↔ S3~S4, `full` ↔ S5. 불일치 시 ERROR.
- **R2 (truth keyword 미포함, safe만)**: case 패키지의 `banned_lexemes_safe` 배열의 어떤 단어도 `safe` 이벤트의 `previousStatement`/`currentStatement`/`judgePursuitLine`에 등장하면 ERROR.
- **R3 (단일 화자 모순)**: `previousStatement`와 `currentStatement`는 모두 `defenderParty`의 발화여야 함. 양측 화자 섞이면 ERROR. (수동 휴리스틱: 상대 partyName이 발화 주체로 등장하면 의심)
- **R4 (글자수)**: previousStatement 30~60자, currentStatement 30~60자, judgePursuitLine 30~60자, defenderReactionLine 40~80자. 초과/미달 WARN.
- **R5 (호명 일관성)**: judgePursuitLine은 `${defenderParty.name}` 또는 `callTerms.toJudge` 중 하나를 포함해야 함. 미포함 WARN.
- **R6 (ConflictEventV2 유효 dispute)**: ConflictEventV2의 `disputeId`는 visible dispute만 허용. hidden dispute 사용 시 ERROR.
- **R7 (effect 범위)**: ConflictEventV2.effect.emotionDelta는 -15..-5 범위, trustDelta는 -5..-1 범위. 초과 시 WARN.

## 자동 실행 위치

`package.json`의 `lint` 스크립트에 통합, CI에서 활성 3건만 검증.
