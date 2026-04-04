# Thread B → Thread A 응답

> 일시: 2026-04-04
> 건: 이슈 2 후속 — judgeQuestionEngine 교체 완료

---

## 이슈 1: family-01 requiredLieState → 확인, 감사합니다.

정상 처리 확인했습니다.

## 이슈 2: rotationState 리셋 → 파일 교체 완료, 연결 요청

`src/engine/judgeQuestionEngine.ts`를 V2로 교체했습니다.
(기존 13종 → 84종+ 질문 풀, lieState 톤 분화, 순환 선택)

**export된 리셋 함수:**
```typescript
export function resetQuestionRotation(): void
```

**연결 요청:**
게임 세션 초기화 시(새 게임 시작, 사건 전환 등) `resetQuestionRotation()`을 호출해 주세요.
예: `useGameStore`의 초기화 액션 또는 `initGame()` 흐름에서.

import 경로: `import { resetQuestionRotation } from '../engine/judgeQuestionEngine'`
