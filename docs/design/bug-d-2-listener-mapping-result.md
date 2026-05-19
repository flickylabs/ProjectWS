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

## 다음 세션 재검증 (2026-05-19 메인 thread)

### 사용자 케이스 경로 식별

사용자 보고 Q1/Q2 텍스트가 scripted variant와 정확히 일치한다. 두 경로 가능:

| 경로 | 시작점 | Codex fix 적용 여부 |
|---|---|---|
| (a) **Free interrogation 입력** | 사용자가 textbox에 "이준호 씨, ..." 입력 | ✅ Fix 적용 (resolveTarget vocative override) |
| (b) **Scripted judge_question 버튼** | 사용자가 PC 핫바 motive_search 버튼 클릭 | ❌ Fix 미적용 (별도 dispatch 경로) |

### Scripted 경로 코드 정합성 확인

- `useActionDispatch.handleQuestion`: `action.target='b'` 명시적 전달 → `buildQuestionText` → `getScriptedJudgeQuestion(..., target='b')`.
- `scriptedTextLoader.getScriptedJudgeQuestion`: `targetParty` 인자를 `selectVariant`/`getFromChannel`에 전달.
- `scriptedTextLoader.scoreVariant:263-265`: **`tags.targetParty !== context.targetParty` 시 score=-1000 강제 제외, 일치 시 +30 강한 선호**.
- `scriptedAngleTextLoader.ts:160,196`: explicit filter `entry.targetParty !== input.target` continue.
- 답변 fetch: `getScriptedInterrogation(caseId, party, disputeId, lieState, questionType)` → `b|d-2|S0|motive_search` key (line 24265 존재) → `b-d-2-S0-motive-search-v*` variant 반환.

→ Scripted 경로는 target/vocative 불일치에 대해 hard filter로 방어됨. **이론적 회귀 X**.

### 잠재적 silent-fail (낮은 확률)

`getScriptedInterrogation:551-565`에 **opposite-party fallback** 존재. target party 키가 없을 때 상대 party 키로 폴백. 단, `speaker:action.target` 그대로 사용 → 텍스트만 상대 발화. 단, `b|d-2|S0|motive_search` 키는 데이터에 존재(line 24265) → trigger 안 됨. 다른 (party, dispute, lieState, questionType) 조합에서는 가능.

### PC QA 재현 절차 (사용자 영역)

dev server `run-pc.bat` (port 5176) 띄운 상태에서:

1. **case = spouse-01**, h-d3 직후 또는 d-2 활성 단계까지 진행.
2. **Path A 검증 (scripted 버튼)**:
   - 핫바 슬롯에서 `이준호 + motive_search` depth 1 버튼 클릭.
   - 기대: 재판관 질문 "이준호 씨, 돈 문제를..." + **이준호 portrait 답변** 1개.
   - 이어서 `박지연 + fact_pursuit` depth 2 버튼 클릭.
   - 기대: 재판관 질문 "박지연 씨, ..." + **박지연 portrait 답변** 1개.
   - **재현 시**: 별도 진단 thread 필요 (scripted dispatch 영역).
3. **Path B 검증 (자유 질문)**:
   - UI target = 박지연(a) 선택 상태에서 자유 입력 textbox에 "이준호 씨, 돈 문제를 박지연 씨에게 열지 못하게 만든 가장 직접적인 두려움이 무엇이었습니까." 입력.
   - 기대 (post-fix): vocative override로 target=b 라우팅 → **이준호 portrait 답변**.
   - 비교 control: "이준호 씨에게 왜 ..." 입력 → 기존 UI target(a) 유지 → **박지연 portrait 답변**.

### 결론

- Codex fix (8590abd6)는 **Path B free interrogation vocative override** 영역에 정확히 적용됨.
- 사용자 원래 케이스가 Path A scripted였다면 별도 thread. Path B였다면 fix 효과 확인 필요.
- 사용자 직접 PC QA 재현 후 확인 시점에서 결정.

검증 일자: 2026-05-19 (메인 thread)

