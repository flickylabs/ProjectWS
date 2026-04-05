# Thread E 전달 메시지: 84건 헤드리스 플레이스루

## 상황

84건 전체 사건 데이터(V2 structure + atoms)가 준비 완료되었다. 이제 실제 LLM 대화 품질을 검증해야 한다. UI를 거치지 않고 엔진을 직접 호출하여 84건 전체를 플레이스루하고, 그 트랜스크립트를 GPT Pro에 넘겨 품질 분석을 받는다.

## 네 역할 (Thread E)

1. 헤드리스 플레이스루 스크립트 작성 (`tests/run-84-headless.cjs`)
2. 84건 전체 실행 → JSON 트랜스크립트 출력 (`tests/transcripts/`)
3. GPT Pro 전달용 포맷 변환 스크립트 작성 (`tests/format-for-gptpro.cjs`)
4. 카테고리별 트랜스크립트 파일 생성 (`tests/gptpro-input/`)

## GPT Pro 역할 (유저가 직접 전달)

- 카테고리별 7개 세션 동시 가동
- 트랜스크립트를 받아서 5개 검증 항목(화자시점/한국어품질/TruthThrottle/캐릭터성/Hallucination) 분석
- PASS/FAIL 리포트 반환

## 미션 문서 경로

```
docs/ref/리뉴얼참고/thread-packages/thread-E/mission-84-headless-gptpro.md
```

## 작업 순서

1. **기존 스크립트 구조 파악** -- `tests/full-playthrough-v2.cjs`, `tests/playthrough-runner.cjs`, `tests/scenarios/*.cjs`를 먼저 읽어라
2. **`tests/run-84-headless.cjs` 작성** -- playthrough-runner.cjs를 require하여 확장. 84건 자동 시나리오 생성 + 실행
3. **spouse-01 단건 테스트** -- `node tests/run-84-headless.cjs --case spouse-01`로 동작 확인
4. **spouse 12건 카테고리 테스트** -- `node tests/run-84-headless.cjs --category spouse`
5. **문제 없으면 84건 전체 실행**
6. **`tests/format-for-gptpro.cjs` 작성** -- JSON → GPT Pro 분석용 텍스트 변환
7. 유저에게 결과물 전달

## 주의사항

- `.env`의 `VITE_OPENAI_API_KEY`가 설정되어 있어야 함
- API rate limit: 호출 간 3초 딜레이, 429 시 30초 대기 재시도
- v2-atoms 파일은 `src/data/claimPolicies/`와 `docs/ref/리뉴얼참고/gpt-batch/` 두 곳을 모두 탐색
- 실패 사건은 스킵하고 `_errors.json`에 기록
