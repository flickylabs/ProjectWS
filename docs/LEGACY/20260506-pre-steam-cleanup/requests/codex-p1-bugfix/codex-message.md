# Codex 작업 지시

## 먼저 읽을 파일 (순서대로)
1. `docs/requests/codex-p1-bugfix/메시지.md` — 전체 작업 명세 (버그 3건)
2. `src/types/index.ts` — ProcessMetrics 타입 정의 위치 확인
3. `src/engine/verdictEngine.ts` — (A) 보너스 참조 위치
4. `src/engine/questionEffectEngine.ts` — (C) 공감접근 자백 조건
5. `src/hooks/useActionDispatch.ts` — (A) trackMetric 호출부, (B) 증인 소환 catch 블록
6. `src/store/slices/agentSlice.ts` — (C) empathyCountAtCurrentState 추가 위치

## 작업 내용 (3건)
(A) ProcessMetrics 타입에 3필드 추가 + verdictEngine에서 any 캐스팅 제거 + trackMetric 호출 삽입
(B) 증인 소환 LLM 실패 시 gain('investigationTokens', 1) 환불 + 토스트 메시지 변경
(C) 공감접근 S3+ 자백 조건에 empathyCountAtCurrentState >= 2 하한 추가

## 의존성
- (A), (B), (C) 세 건은 서로 독립적이므로 순서 무관
- **단, `useActionDispatch.ts`를 (A)와 (B) 모두 수정하므로 충돌 주의**

## 주의사항
- 빌드 확인: `npx tsc -b --force` 통과 필수
- 기존 로직 변경 최소화 — 해당 버그만 수정, 주변 리팩터 금지
- (C)의 empathyCountAtCurrentState는 lieState 전이 시 반드시 0으로 리셋

## ⚠️ 이 작업은 `codex-trait-ui` 작업과 별도 브랜치에서 진행해 주세요
두 작업이 같은 브랜치에서 동시 수정하면 충돌 가능.
`codex-trait-ui`가 완료된 후 이 작업을 시작하거나, 별도 브랜치 사용.
