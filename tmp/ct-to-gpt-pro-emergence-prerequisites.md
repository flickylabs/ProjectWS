# GPT Pro 작업 의뢰 — emergence prerequisites 강화 (B-17 D 옵션)

## 배경

활성 3사건 (`spouse-01` / `family-01` / `friend-01`)에서 **hidden dispute가 너무 쉽게 emerge**되는 결함이 발견됨. 사용자 보고: 쟁점1·2는 진행 초반인데 갑자기 쟁점3이 emerge.

### Root Cause
`src/engine/discoveryEngine.ts:287` `generateEmergenceRoutes` 함수가 dispute 데이터의 `unlockCondition`이 **없으면** 자동으로 약한 routes를 생성함:
- 경로 1: `requiredEvidence` 1개만 presented되어도 emerge
- 경로 2: 관련 증인 소환 시 emerge
- 경로 3: 다른 evidence가 같은 쟁점 prove 시 emerge

→ **해결**: 각 hidden dispute에 명시적 `unlockCondition.requireDispute` 추가. 그러면 generateEmergenceRoutes의 첫 분기로 진입해 **선행 쟁점 도달 조건**만으로 emerge 결정 (다른 약한 routes 생성 안 함).

## unlockCondition 스키마

```ts
unlockCondition: {
  requireDispute: [
    { id: 'd-1', minState: 'S3', party: 'a' },
    // 또는 단일 객체 — { id: 'd-1', minState: 'S5' }
  ]
}
```

- `id`: 선행되어야 하는 dispute ID
- `minState`: 'S0' ~ 'S5' (S5 = collapse)
- `party`: 'a' | 'b' | undefined (양쪽 모두 OK)

배열이면 **AND 조건** (모두 충족되어야 emerge).

## 작업 요청

`tmp/emergence-prerequisites-source.json` 데이터를 참고하여:

각 hidden dispute별로 **자연스러운 emergence prerequisites** 제안:

1. **스토리상 자연스러운 선행 조건** — 어떤 쟁점이 먼저 드러나야 이 hidden 쟁점이 자연스럽게 따라오는가?
2. **너무 빠른 emerge 차단** — 사용자가 한 쟁점 진행 초반에 다른 쟁점이 갑자기 안 뜨도록
3. **너무 늦은 emerge 차단** — 게임 끝까지 emerge 안 되는 경우 방지

### 각 dispute별 제안 형식

```json
{
  "spouse-01": {
    "<dispute-id>": {
      "name": "<현재 dispute 이름>",
      "currentState": "현재 unlockCondition 없음 (자동 routes 약함)",
      "proposedUnlockCondition": {
        "requireDispute": [
          { "id": "<선행 dispute>", "minState": "S3" }
        ]
      },
      "reasoning": "<왜 이 prerequisites가 자연스러운지 1-2문장>"
    }
  }
}
```

### 검증 기준 (GPT Pro 자가 체크)

각 제안이:
- [ ] 스토리상 자연스러운가? (선행 사건 → 후행 사건)
- [ ] 너무 일찍 emerge되지 않는가? (다른 쟁점 진행도 충분 후)
- [ ] 너무 늦지 않는가? (게임 끝까지 도달 가능)
- [ ] 순환 참조 없는가? (A가 B를 require + B가 A를 require)
- [ ] minState가 적절한가? (S3 = 책임 전가, S5 = 자백)

## 산출물

`gpt-pro-runs/emergence-prerequisites/output/proposals.json` 파일로 위 형식 제출.

## 입력 데이터

`tmp/emergence-prerequisites-source.json`에 다음 정보 포함:
- 3사건의 모든 dispute 목록
- 각 dispute의 name / truthDescription / requiredEvidence / hidden 여부 / quadrant / weight / 현재 unlockCondition

## 적용 방식 (CT가 처리)

GPT Pro 산출물 받으면:
1. CT가 한국어 검토 + 게임 디자인 정합성 검증
2. `src/data/cases/generated/{case}.json`의 각 dispute에 `unlockCondition` 추가
3. dev 헤드리스 테스트로 emerge 흐름 검증
