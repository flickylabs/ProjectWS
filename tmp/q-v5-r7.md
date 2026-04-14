# Q V5 R7

- Phase: `B / 엔진 코드 리뷰`
- 대상: `끼어들기 로직`
- 수행: interruptor/target 분리, S5 차단, 대상 복원 흐름 검토
- 근거: `src/engine/interjectionV2.ts:181`, `src/engine/interjectionV2.ts:284`, `src/hooks/useActionDispatch.ts:235`
- 판정: `PASS`
- 메모: `S5` 도달 시 interjection 차단, 처리 후 심문 대상은 `opportunity.target`으로 복원됨
