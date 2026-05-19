# bug-d-2-listener-mapping 결과

Anchor: `dd7eeac1`

## 결론

- 원인: **엔진 매핑 오류**.
- 데이터 swap은 아님. 현재 `spouse-01`의 실제 party 정의는 A=박지연, B=이준호이며, d-2 답변 데이터의 `a-`/`b-` prefix와 speaker/party tag는 이 정의와 일치한다.
- PC 자유 질문 경로에서 `context.target`을 직접 호명보다 먼저 사용해, 입력이 `이준호 씨, ...`로 시작해도 현재 UI target이 박지연이면 `target:a`로 dispatch될 수 있었다. 이 경우 재판관 질문 텍스트는 이준호를 부르지만 응답 portrait/listener는 박지연으로 찍혀 “이준호 답변 누락 + 박지연 답변”처럼 보인다.

## 진단

### 데이터 감사

- `src/data/scriptedText/spouse-01.json`
  - d-2 전체 interrogation variant 360개 감사.
  - `speaker:*`, id prefix, `counterpartyRef`/`callTerm` 정합성 문제 없음.
- `src/data/scriptedAngles/spouse-01_interrogation_answers.json`
  - d-2 angle answer variant 1,800개 감사.
  - party tag/id prefix mismatch 없음.
- 비교 범위:
  - `spouse-01`: d-1/d-2/h-d3/h-d4 sample + 전수 count 감사.
  - `family-01`, `friend-01`: d-1/d-2 answer variant party/id 정합성 감사.
  - 공통 speaker/id mismatch 없음.

### Dispatch 흐름

- PC 자유 질문 입력은 `FreeQuestionInput` -> `resolveFreeInterrogation` -> `mapFreeInterrogationContext` -> `dispatch(question)` 순서로 흐른다.
- 기존 `resolveTarget`은 UI target이 있으면 즉시 반환했다.
- 따라서 문장 첫머리 호명인 `이준호 씨, ...`도 target override로 쓰이지 못했고, 사용자가 target 선택을 바꾸지 않은 상태에서 이름을 직접 입력하면 텍스트와 실제 응답 party가 분리됐다.

## 적용 Fix

- 수정 파일: `src/engine/freeInterrogation/contextMapper.ts`
- `resolveTarget`에서 문장 첫머리의 명시적 호명만 먼저 감지한다.
- 감지 대상:
  - `박지연 씨, ...`
  - `이준호 씨, ...`
  - `Name님, ...`
  - `Name: ...`
- 비감지 대상:
  - `이준호 씨에게 왜 ...`
  - `박지연 씨가 주장하는 ...`
- 이렇게 하여 상대 이름이 목적어나 주어로 나온 질문은 기존 UI target 정책을 유지하고, 재판관이 말머리에서 특정인을 직접 부르는 자유 질문만 실제 target을 보정한다.

## 영향 범위

- 영향 범위: 자유 질문 dispatch target 결정.
- 데이터 변경 없음.
- preset/generated 질문 경로는 기존 `targetParty` 필터를 그대로 사용한다.
- 4언어 sync 필요 없음. 로직 fix이며 locale별 JSON text 변경이 없다.

## 재현 정리

1. PC 자유 질문에서 현재 UI target이 박지연(`a`)인 상태.
2. `이준호 씨, 돈 문제를 박지연 씨에게 열지 못하게 만든 가장 직접적인 두려움이 무엇이었습니까.` 입력.
3. 기존: `context.target` 우선으로 `target:a` dispatch 가능.
4. 수정 후: 문장 첫머리 직접 호명으로 `target:b` dispatch.
5. 다음 질문 `박지연 씨, 현금 출금이라는 방식을 보고 이 돈이 다른 생활과 연결됐다고 보신 근거는 무엇입니까.`는 `target:a`로 dispatch.

## 검증

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS
  - static P0=0, route P0=0
- `node scripts/detect-truth-leak.cjs`: 기존 matrix 기준 findings 3 (`family-01` ko). 이번 변경 파일과 무관하며 새 변경 파일 없음.
- `run-pc.bat`: 대화형 dev server 실행 스크립트라 자동 실행은 생략. 대신 동일 입력의 target 결정 로직을 ad-hoc 재현해 기존 `a` -> 수정 후 `b`, 그리고 `씨에게`/`씨가` 표현은 기존 target 유지됨을 확인했다.
