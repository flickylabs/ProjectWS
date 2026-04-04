# witness few-shot 통합 메모

## 지금 코드에서 바로 보이는 품질 병목

1. `buildWitnessVars()`는 `witnessBudget`와 `witnessSpeechSamples`를 만들지만, `buildFallbackWitnessPrompt()`에서는 둘 다 실제 프롬프트에 넣지 않습니다.
   - 즉 폴백 경로는 보강 데이터를 전혀 못 씁니다.
2. 현재 기준 프롬프트는 few-shot 블록과 hiddenAgenda 행동 패턴 블록이 없습니다.
   - 그래서 hiddenAgenda가 "언급 안 함" 수준으로만 소극적으로 처리될 가능성이 큽니다.
3. 규칙에 `재판관에게 존댓말로 3~4문장 증언`이 있는데, depth 지시에서는 `vague = 2문장 이내`, `partial = 3문장 정도`라서 길이 지시가 서로 충돌합니다.
4. `generateFallbackTestimony()`의 partial 문장은 `그 건에 대해서는` 같은 다소 굳은 표현을 쓰고 있어, 실전 이슈 문서가 지적한 보고서 톤 재발 위험이 있습니다.

## 최소 수정 방향

### 1) data 주입
- 이 세션에서 만든 `witness-fewshot-examples.ts`를 데이터 모듈로 추가
- `buildWitnessVars()`에 아래 두 필드를 추가
  - `witnessFewShotExamples`
  - `witnessHiddenAgendaPatterns`

예시:

```ts
import {
  buildHiddenAgendaPatternBlock,
  buildWitnessFewShotBlock,
  type WitnessSlot,
} from '../data/witnessFewShotExamples'

function normalizeWitnessSlot(raw: string | undefined): WitnessSlot {
  if (raw === 'family' || raw === 'colleague' || raw === 'institutional' || raw === 'friend') {
    return raw
  }
  return 'friend'
}
```

```ts
const witnessSlot = normalizeWitnessSlot(witness.slot)

return {
  ...,
  witnessFewShotExamples: buildWitnessFewShotBlock(witnessSlot, depth, 2),
  witnessHiddenAgendaPatterns: buildHiddenAgendaPatternBlock(witnessSlot),
}
```

### 2) 프롬프트 삽입
`buildFallbackWitnessPrompt()`와 에이전트 템플릿 둘 다 아래 블록을 실제로 소비해야 합니다.

```ts
## 말투/호칭
${vars.witnessSpeechStyle}
- 재판관: "${vars.witnessAddressJudge}"
- ${vars.nameA}: "${vars.witnessAddressA}"
- ${vars.nameB}: "${vars.witnessAddressB}"

${vars.witnessFewShotExamples ? '\n' + vars.witnessFewShotExamples : ''}
${vars.witnessHiddenAgendaPatterns ? '\n' + vars.witnessHiddenAgendaPatterns : ''}
${vars.witnessBudget ? '\n## 증언 예산\n' + vars.witnessBudget : ''}
```

### 3) 길이 규칙 충돌 제거
고정 문장 수 규칙 대신 depth 기준으로 바꾸는 편이 좋습니다.

```ts
## 길이 규칙
- vague: 2문장 이내
- partial: 3문장 정도
- full: 필요한 만큼 답하되 장황한 설명은 피한다.
```

### 4) fallback 톤 개선
특히 partial fallback은 아래처럼 고치면 덜 굳습니다.

```ts
case 'partial':
  testimony = `재판관님, 그 일은 어느 정도 알고 있습니다. ${biasText[witness.bias] ?? biasText.neutral} 다만 세세한 경위까지는 제가 직접 본 건 아닙니다.`
```

## 추천 적용 순서

1. 에이전트 템플릿에 few-shot + hiddenAgenda 패턴 블록 먼저 주입
2. 폴백 프롬프트에도 동일 블록 반영
3. 고정 3~4문장 규칙 삭제
4. fallback 문구의 굳은 표현 교체
5. family/friend 샘플을 우선 적용해서 품질 확인
   - 실전 이슈 문서상 family 감정 부족과 friend의 과한 긴장감이 우선순위가 높음
