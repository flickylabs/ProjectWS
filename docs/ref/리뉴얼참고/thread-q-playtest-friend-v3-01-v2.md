# Thread Q Playtest Report v2 — friend-v3-01

테스트 전제
- 이번 v2는 기존 Thread Q 10회차 시나리오를 유지한 상태에서 P0 재테스트를 위해 `--validate-only`, semantic heuristics, 런타임 headless probe, visible-text 전수 스캔을 다시 수행한 보고서다.
- friend 사건은 이번 재테스트에서 “claimPolicies 복구 여부”와 “S5 유사도 해소 여부”를 같이 본다.

## 1. P0 해결 확인 결과

- `claimPolicies` 등록 자체: PASS
  - `registerFriendV301Data()` 후 `hasClaimPolicy=true`, `dossierCardCount=5`.
  - `resolveDossierQuestion('friend-v3-01', 'dc-1.b.q1')`가 `revealedAtomId=friend-v3-01:b:h-d2:S3:0`, `lieAdvance=true`를 반환했다.
- `event / transition` 런타임: FAIL
  - `getEventTexts('friend-v3-01') = null`
  - `transitionBeatCount=0`
  - `getTransitionBeat('friend-v3-01', 'b', 'd-1', 'S1', 'S2')` 호출 시 `TypeError: Cannot read properties of undefined (reading 'find')`
  - 즉, DossierCard는 복구됐지만 event/transition 런타임은 아직 살아 있지 않다.
- 호칭 0건: PASS
  - `최수민 씨`, `송다은 씨`, `수민 씨`, `다은 씨` exact hit 0건.
  - runtime callTerms는 `수민아 / 다은아 / 제 친구 / 최수민! / 송다은!`.
  - phase 문장도 `수민아`, `다은아`로 맞아 있다.
- 형태 오류 0건: FAIL
  - visible text에 남아 있다.
  - `src/data/scriptedText/friend-v3-01.json:461` `왜 ... 갔은지`
  - `src/data/scriptedText/friend-v3-01.json:47223` `다는이`
  - `src/data/scriptedText/friend-v3-01.json:48331` `수민에게 사와는 했지만`
  - `src/data/scriptedText/friend-v3-01.json:39909` `곳장 좁아집니다`
  - `src/data/scriptedText/friend-v3-01.json:48920` `겉으로 강해 보가는 단서입니다`
- friend S5 유사도 해소: CONDITIONAL
  - `b / d-1 / S5`의 사실추궁, 동기탐색, 공감접근 첫 variant는 실제로 성격이 나뉜다.
  - 그러나 케이스 전체 기준으로는 `scripted-semantic-quality WARN:66`, `validate-scripted-text WARN:336`, `heuristics WARN:12`라서 “해소 완료”라고는 못 한다.
- P0 종합: `FAIL`
  - Dossier는 살았지만 event/transition이 비어 있고, visible typo와 variant 과다 유사도가 남아 있다.

## 2. 10회차 요약

1. 사실추궁 중심: `d-1`, `d-4`에서 “집착인가 경고인가”를 밀면 구조는 빨리 선명해진다.
2. 동기탐색 중심: 예비신랑, 과거 손절, 아버지 돈 문제까지 이어지며 friend 관계 특유의 보호-배신 혼합 구조가 드러난다.
3. 공감접근 중심: 부끄러움, 급함, 평판 손실 감정은 살아 있지만 후반부는 다른 유형과 다시 닮아간다.
4. 증거 심층 1: `e-4/e-5/e-6`은 stage가 올라갈수록 “경고 채널”, “과거 패턴”, “아버지 자금”이 분리된다.
5. 증거 심층 2: Dossier 질문 자체는 direct resolve가 된다. 그러나 transition beat가 없어 사건의 감각적 전환이 약하다.
6. 증인 + 조합 1: 단톡방 witness는 방향이 맞다. 누가 먼저 낙인찍었는지, 누가 맞장구쳤는지가 살아 있다.
7. 증인 + 조합 2: 조합 설계는 좋지만 `다는이`, `사와`류 문장 오염이 감정선을 끊는다.
8. 끼어들기 + 감정 폭발: 현재 빌드에서는 검증 불가다. authored `events`가 없다.
9. 극단 플레이: 최소 행동으로는 `집착처럼 보인 연락`만 남고, 끝까지 밀어야 `경고 실패 + 과거 손절 + 제3자 돈 문제` 구조가 나온다.
10. 자유 플레이: session fit은 여전히 있다. 다만 현재 스크립트 완성도는 3건 중 가장 불안정하다.

## 3. 채널별 스크립트 품질

- `interrogation`: FAIL
  - entry tone 차이는 있으나 케이스 전체 validator 경고가 너무 많다.
  - friend S5 일부는 재작성 효과가 있지만, 전체적으로는 아직 중복이 두껍다.
- `evidence_present`: CONDITIONAL
  - late 단계의 방향성은 좋다.
  - 하지만 일부 문장에는 visible typo와 설명식 템플릿 문장이 섞여 있다.
- `witness`: CONDITIONAL
  - depth 차이는 존재한다.
  - `다는이` 같은 잔존 오류가 witness 채널 신뢰도를 직접 깎는다.
- `dossier`: CONDITIONAL
  - direct resolve는 된다.
  - 다만 validator가 question-specific reflection 부족을 계속 경고한다.
- `system_message`: PASS
  - 중립 톤은 유지한다.
  - 다만 사건 전체 오염과 분리해서 볼 때만 PASS다.
- `aftermath`: FAIL
  - 감정 후폭풍 구조는 맞지만 `사와` 같은 visible typo가 직접 남아 있다.

## 4. 심문 유형별 차이 비교

- 사실추궁
  - `꼬시려던 게 아니라 경고하려고 연락했습니다.`
  - 행위의 외형을 바로 부정한다.
- 동기탐색
  - `제 친구가 알기 전에 정리되면 좋겠다고 생각했고...`
  - friend 관계 특유의 보호 논리가 열린다.
- 공감접근
  - `솔직히 부끄럽고도 급했습니다.`
  - 감정값은 가장 높다.
- 종합
  - `b/d-1/S5` 한정으로는 v1보다 분명히 좋아졌다.
  - 하지만 케이스 전체에서 이 개선이 충분히 퍼지지 못했다.

## 5. 호칭 전수 체크 결과

- A→B: `수민아` 확인
- B→A: `다은아` 확인
- A→재판관: `제 친구` 확인
- B→재판관: `제 친구` 확인
- 격앙: `최수민!`, `송다은!` runtime callTerms 확인
- exact-name `~씨`: 0건
- 판정: PASS

## 6. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인

- 증거 연계: CONDITIONAL
  - `e-4` late 반응은 `경고 채널`, `제가 어디서 잘못됐는지`까지 간다.
  - 하지만 오염된 표현이 섞인 라인이 적지 않다.
- 증인: CONDITIONAL
  - full witness는 단톡방의 집단 낙인 구조를 잘 살린다.
  - 그러나 witness 채널에도 잔존 typo가 있다.
- 조합 스킬: CONDITIONAL
  - 설계 방향은 좋다.
  - 실제 전환 연출은 transition beat 부재 때문에 약하다.
- DossierCard state push: PASS at runtime
  - `dc-1.b.q1` direct resolve 시 `friend-v3-01:b:h-d2:S3:0` 조기 해금이 확인됐다.
- 끼어들기 / 감정 폭발: FAIL
  - `events`가 없어 현 빌드에서는 Round 8을 검증할 수 없다.

## 7. 발견된 버그 / 이슈 목록

- [P0][Thread G] `friend-v3-01`에 `events`와 `transitionBeats`가 실제 등록되지 않았다.
- [P0][Thread G] `getTransitionBeat()`가 `transitionBeats` 부재 시 크래시한다.
- [P0][Thread W→G] visible typo와 잔존 형태 오류가 아직 남아 있다.
- [P0][Thread W→G] friend S5 개선은 있었지만, 케이스 전체 variant 유사도는 아직 PASS 수준이 아니다.
- [P1][Thread W→G] 일부 대사가 템플릿식 설명 문장으로 흐르며 friend 사건의 날카로움을 무디게 만든다.

## 8. 대사 품질 전반 평가

- 좋은 예시
  - `그 연락의 목적은 경고였습니다. 제 친구가 알기 전에 정리되면 좋겠다고 생각했고...`
  - `그날 다는이가 먼저 수민이가 또 자기 남자에게 연락한다고 올렸습니다.`
  - 사건의 본질인 “친구 보호가 낙인으로 변하는 순간”은 포착한다.
- 나쁜 예시
  - `왜 저를 두고 제 예비신랑에게 갔은지`
  - `그날 단톡방은 다는이 말이 먼저`
  - `수민에게 사와는 했지만`
  - 이 정도면 단순 미세 오탈자가 아니라 QA block이다.

## 9. 종합 판정

- `FAIL`
- 이유
  - DossierCard는 복구됐지만 event/transition 런타임은 아직 없다.
  - friend S5는 국소 개선에 그쳤고, 전체 variant 유사도와 visible typo가 여전히 심하다.
  - 현 상태로는 3건 중 가장 재작업 필요량이 크다.
