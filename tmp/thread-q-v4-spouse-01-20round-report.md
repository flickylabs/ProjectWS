# Thread-Q V4 Test Report: spouse-01

## 요약
- 요청 기준: 20회 종합 검증
- 실제 재실행: `focus9` 3런 (`301`, `902`, `903`)
- 결과: `FAIL`
- 핵심 블로커: `v3State is not defined`, `require is not defined`, 9채널 ScriptedText 미배선 5종, 후일담 LLM 미생성

## 실행 근거
- 산출 JSON: `tmp/spouse-01-focus9.json`
- 콘솔 로그: `tmp/spouse-01-focus9-rerun.out.log`
- 공통 phase 경로: `phase0 -> phase1 -> phase3 -> phase6 -> phase7 -> result`

## Level 1~3 자동화
- PASS: 실행된 3런 모두 `scriptedMissCount = 0`
- PASS: Run 301/902는 `seriousErrors = []`
- FAIL: Run 903에서 `seriousErrors = ["[unhandledrejection] v3State is not defined"]`
- FAIL: 9채널 전수 적중 불가
  - 적중: `interrogation`, `judge_contradiction`, `contradiction_pursuit`, `interjection`
  - 미적중: `judge_question`, `trust_action`, `emotional_overload`, `evidence_discovery`, `mediation`
- PASS: 재판관 질문 샘플은 간접 참조형 유지
  - `박지연 씨, 오피스텔 방문과 새벽 전화 당시 정확히 어떤 일이 있었습니까?`

## Level 4 NPC 품질
- PASS: 모순 추궁 응답과 끼어들기 ScriptedText는 실제 적중
- FAIL: `judge_question` 채널은 사건 맞춤 질문이 보이지만 `[Scripted]` 로그가 없어 ScriptedText 우선 사용을 증명하지 못함
- FAIL: `mediation` 채널은 ScriptedText 적중 0건, 실행 중 브라우저에서 OpenAI 호출이 CORS로 차단됨
- FAIL: `emotional_overload`, `evidence_discovery`, `trust_action`은 런타임 오류/미배선으로 품질 판정 불가

## Level 5 게임플레이 / UI
- PASS: 중재 헤더 `Phase 3 - 중재`
- PASS: 판결 버튼 분리 표기 확인
  - `거짓 / 박지연 측 부정`
  - `사실 / 이준호 측 인정`
- PASS: 사건 선택 카드에 인라인 제목 없음 (`stageNodeHasInlineTitle = false`)
- PASS: 결과 화면 액션 버튼 가로 배치 (`flexDirection = row`)
- PASS: 모순 추궁 배지 1회 사용 후 `추궁 완료`로 비활성화
- FAIL: 후일담이 `후일담을 정리하고 있습니다...` 1문단 placeholder에 머무름
- FAIL: 시스템 메시지 색상은 이번 런에서 `info/action/unlock` 3종만 확인되어 6종 전수 PASS 불가
- FAIL: 전략 선택 모달은 이번 재실행에서 관측되지 않음

## 발견된 이슈
1. `FAIL` 엔진/Thread G: `src/hooks/useActionDispatch.ts:1397` 부근에서 `handleTrustAction()`이 `v3State`를 정의하지 않은 채 참조. Run 903에서 `v3State is not defined` 재현.
2. `FAIL` 엔진/Thread G: `src/hooks/useActionDispatch.ts:1645`에서 브라우저 런타임에 `require('../engine/scriptedTextLoader')` 호출. `evidence_discovery` 경로에서 `require is not defined` 재현.
3. `FAIL` 엔진/Thread G: `judge_question`는 `src/hooks/useActionDispatch.ts:658`에서 여전히 `buildQuestionText()`를 사용해 ScriptedText 우선 경로가 메인 질문 플로우에 연결되지 않음.
4. `FAIL` 엔진/Thread G: `mediation`은 `src/components/phase/Phase6_Mediation.tsx:103`에서 ScriptedText 조회가 있으나 실제 런에서는 적중 0건. 현재 경로상 브라우저 OpenAI 호출 CORS 실패 후 폴백만 보임.
5. `FAIL` 엔진/Thread G: `src/components/pc/layout/PCDiscoveryOverlay.tsx:413`의 `emotional_burst` 경로는 이번 런에서 ScriptedText 적중을 만들지 못함.

## 최종 판정
- `FAIL`
- 근거: 9채널 ScriptedText 전수 PASS 실패, 런타임 블로커 2건 재현, 후일담 LLM 미생성.
