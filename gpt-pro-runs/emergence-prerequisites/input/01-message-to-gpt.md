# GPT Pro 의뢰 — 활성 3사건 emergence prerequisites 강화

안녕하세요. 솔로몬 법정 게임의 데이터 작업 요청드립니다.

## 작업 요약

활성 3사건(spouse-01 / family-01 / friend-01)의 hidden 쟁점이 너무 쉽게 등장(emerge)하는 결함을 해결하기 위해, 각 hidden dispute에 **자연스러운 선행 조건**(unlockCondition)을 제안해주세요.

## 첨부 파일

1. **`02-task-spec.md`** — 작업 명세서 (배경 / 스키마 / 검증 기준 / 산출물 형식)
2. **`03-source-data.json`** — 3사건의 모든 dispute 정보 (id / name / truthDescription / hidden 여부 / quadrant / weight / requiredEvidence)

## 산출물 요청

`02-task-spec.md`의 **"각 dispute별 제안 형식"** 섹션을 참고하여 JSON 형식으로 작성:

- 활성 3사건 × 평균 3-4 hidden dispute = 약 11개 dispute에 대한 unlockCondition 제안
- 각 제안에 `reasoning` (1-2문장) 포함
- 자가 체크리스트 (스토리 자연성 / 너무 빠르지/늦지 않은지 / 순환 참조 / minState 적정성) 통과

산출물은 **하나의 JSON 파일**로 작성해주세요. 파일명: `proposals.json`

## 적용 방향

GPT Pro 산출물을 받으면:
1. CT(Claude)가 한국어 검토 + 게임 디자인 정합성 검증
2. `src/data/cases/generated/{case}.json`의 각 dispute에 `unlockCondition` 필드 추가
3. dev/헤드리스 테스트로 emerge 흐름 검증

## 주의

- truthDescription에는 진실(스포일러) 포함되어 있음. 이 정보를 활용하되, prerequisites 자체에는 진실을 노출하지 않음
- minState는 'S0'~'S5' 중 보통 'S3'(책임 전가) 또는 'S5'(자백) 사용
- 단일 dispute 의존이면 객체 1개, AND 조건이면 배열로 표현
- 순환 참조 금지 (A→B→A)

감사합니다.
