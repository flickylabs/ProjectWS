# Solomon pilot request 4

## 포함 파일
1. `misconception-engine-design.ts`
2. `free-question-v2-design.ts`
3. `spouse-01-interjection-beats-v2.json`
4. `family-01-interjection-beats-v2.json`

## 메모
- interjection beat pack은 `actionFamily: "interjection"` 값을 사용합니다.
  현재 `BeatActionFamily` union에 이 값이 없다면 작은 enum 확장이 필요합니다.
- free question 설계는 현재 `llmFreeQuestion.ts`의 2콜 구조를 대체하는 deterministic-first 설계입니다.
- misconception 설계는 `misconceptionStateMap` + `misconceptionRuntimeMap` 이중 저장을 권장합니다.
