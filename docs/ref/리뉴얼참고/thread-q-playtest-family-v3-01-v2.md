# Thread Q Playtest Report v2 — family-v3-01

테스트 전제
- 이번 v2는 기존 Thread Q 10회차 시나리오를 유지한 상태에서 P0 재테스트를 위해 `--validate-only`, semantic heuristics, 런타임 headless probe, visible-text 전수 스캔을 다시 수행한 보고서다.
- 판정 원칙은 동일하다. validator PASS와 직접 읽은 문장이 충돌하면 직접 읽은 결과를 우선한다.

## 1. P0 해결 확인 결과

- `claimPolicies` 등록 자체: PASS
  - `registerFamilyV301Data()` 후 `hasClaimPolicy=true`, `dossierCardCount=5`.
  - `resolveDossierQuestion('family-v3-01', 'dc-1.b.q1')`가 `revealedAtomId=family-v3-01:b:d-1:S3:0`, `lieAdvance=true`를 반환했다.
- `event / transition` 런타임: FAIL
  - `getEventTexts('family-v3-01') = null`
  - `transitionBeatCount=0`
  - `getTransitionBeat('family-v3-01', 'b', 'd-1', 'S1', 'S2')` 호출 시 `TypeError: Cannot read properties of undefined (reading 'find')`
  - 즉, DossierCard는 등록됐지만 `events`와 `transitionBeats`는 아직 실제 런타임에 없다.
- 호칭 0건: PASS
  - `윤정후 씨`, `정후 씨`, `태성 씨` exact hit 0건.
  - runtime callTerms는 `정후야 / 제 동생 / 형 / 제 형 / 윤정후! / 형!`.
  - phase 문장도 `정후야, ...`, `제 동생`으로 맞아 있다.
- 형태 오류 0건: FAIL
  - visible text에 잔존 오류가 많다.
  - `src/data/scriptedText/family-v3-01.json:5774` `마지막 뜻이었은이`
  - `src/data/scriptedText/family-v3-01.json:19393` `보가는 부분`, `있었는이는`
  - `src/data/scriptedText/family-v3-01.json:32458` `문제가 된 금액은 10원 수준이었습니다`
  - `src/data/scriptedText/family-v3-01.json:48805` `보가지 않던 흐름`
- friend S5 유사도 해소: 해당 없음
- P0 종합: `FAIL`
  - Dossier만 복구됐고, 요청된 event/transition 런타임은 아직 막혀 있다.
  - visible typo도 여전히 남아 있다.

## 2. 10회차 요약

1. 사실추궁 중심: `d-1`, `d-2`에서 유서 개입 시기와 말년 접근 순서를 압박하면 구조는 잘 드러난다.
2. 동기탐색 중심: `형 보호`, `말년 관리`, `90대 10 -> 60대 40`의 동기가 family 관계 특유의 뒤틀린 보호 논리로 열린다.
3. 공감접근 중심: 죄책감과 장남/동생 역할 갈등은 잘 나온다. 정서 계층은 spouse보다 거칠고 차갑다.
4. 증거 심층 1: `e-1/e-2/e-3/e-6`은 investigationStage가 올라갈수록 `20년`, `생활비`, `공장 쪽 큰돈 이동` 같은 구체성이 붙는다.
5. 증거 심층 2: Dossier 질문 자체는 이제 런타임 해금이 가능하지만, transition beat가 없어 state 전환 연출이 이어지지 않는다.
6. 증인 + 조합 1: 요양보호사/직원 witness는 방향성이 살아 있다. `정후라는 분`, `태성이 오기 전에` 같은 현장감도 있다.
7. 증인 + 조합 2: 조합은 family 사건 특유의 “보호 vs 개입” 논리를 만든다. 다만 scriptedText 문장 오염이 몰입을 자주 끊는다.
8. 끼어들기 + 감정 폭발: 현재 빌드에서는 검증 불가다. authored `events`가 없어서 Round 8 요구사항을 충족하지 못한다.
9. 극단 플레이: 최소 행동으로는 유서 조작 여부만 남고, 끝까지 밀면 “형은 몰라서 미워했고 동생은 알아서 손댔다” 구조가 산다.
10. 자유 플레이: session fit은 강하다. 이 갈등은 가족관계가 아니면 무게 중심이 성립하기 어렵다.

## 3. 채널별 스크립트 품질

- `interrogation`: CONDITIONAL
  - 질문 유형 차이는 있다.
  - `scripted-semantic-quality WARN:15`, `validate-scripted-text WARN:193`, `heuristics WARN:10` 수준으로 아직 중복과 붕괴가 남아 있다.
- `evidence_present`: PASS
  - late 반응에서 `20년`, `생활비`, `공장 쪽 큰돈 이동`이 직접 언급된다.
- `witness`: CONDITIONAL
  - depth 차이는 분명하다.
  - 다만 vague witness의 기억 한계 문구가 약하고, 일부 문장은 오염된 템플릿 냄새가 난다.
- `dossier`: CONDITIONAL
  - direct resolve는 된다.
  - 그러나 live transition/event와 연결된 “밀어붙이는 체감”은 현재 빌드에서 증명되지 않았다.
- `system_message`: FAIL
  - 중립 톤은 맞지만 visible typo가 남아 있다.
- `aftermath`: CONDITIONAL
  - 판결별 감정 후폭풍은 괜찮다.
  - 다만 전체 완성도를 끌어내릴 정도의 문장 오염이 남아 있다.

## 4. 심문 유형별 차이 비교

- 사실추궁
  - `제가 말년의 어머니를 밀어붙인 건 맞습니다. 그래도 어머니 뜻 자체를 뒤집으려고 한 건 아니었습니다.`
  - 인정 범위를 좁게 관리한다.
- 동기탐색
  - `그 뜻이 제 형을 무너뜨리는 방식으로 터지는 걸 막고 싶었습니다.`
  - family 사건의 핵심인 “보호라는 이름의 개입”을 가장 잘 드러낸다.
- 공감접근
  - `제 형이 무너질까 봐 감정을 눌렀고...`
  - 형제 관계의 죄책감과 역할 압박이 가장 잘 살아난다.
- 종합
  - 질문 유형 차이 자체는 유효하다.
  - 문제는 후반에 script 오염과 template 문장이 누적되며 힘이 빠진다는 점이다.

## 5. 호칭 전수 체크 결과

- A→B: `정후야` 확인
- B→A: `형` 확인
- A→재판관: `제 동생` 확인
- B→재판관: `제 형` 확인
- 격앙: `윤정후!`, `형!` runtime callTerms 확인
- exact-name `~씨`: 0건
- 판정: PASS

## 6. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인

- 증거 연계: PASS
  - family 사건은 문서형 증거 해석력이 좋다.
- 증인: PASS
  - `w-1` full은 말년 설득, 서류 읽기, 태성 도착 전 마무리 압박까지 이어진다.
- 조합 스킬: CONDITIONAL
  - 데이터 설계 방향은 맞다.
  - 그러나 transition beat가 없어서 state 연출이 실제 플레이 감각으로 이어지지 않는다.
- DossierCard state push: PASS at runtime
  - `dc-1.b.q1` direct resolve 시 `family-v3-01:b:d-1:S3:0` 조기 해금이 확인됐다.
- 끼어들기 / 감정 폭발: FAIL
  - `events` 자체가 없어 현 빌드에서는 Round 8 확인이 불가능하다.

## 7. 발견된 버그 / 이슈 목록

- [P0][Thread G] `family-v3-01`에 `events`와 `transitionBeats`가 실제 등록되지 않았다.
- [P0][Thread G] `getTransitionBeat()`가 `transitionBeats` 부재 시 `.find`에서 터진다.
- [P0][Thread W→G] visible typo가 아직 많이 남아 있다.
- [P1][Thread W→G] 일부 문장은 템플릿/placeholder성 구문이 남아 실제 사건 고유성이 약해진다.

## 8. 대사 품질 전반 평가

- 좋은 예시
  - `송금은 20년 동안 이어졌고 생활비뿐 아니라 공장 쪽 큰돈 이동도 있었습니다.`
  - `정후라는 분이 오면 어머님 앞에서 큰소리를 내진 않았습니다. 대신 종이를 천천히 읽어드리고...`
  - family 사건의 시간 누적과 역할 왜곡을 잘 잡는다.
- 나쁜 예시
  - `왜 원래 유서는 90대 10이었은이`
  - `불리해 보가는 부분`
  - `문제가 된 금액은 10원 수준이었습니다`
  - 이 수준의 오염이면 QA 기준으로는 P0 미해결이다.

## 9. 종합 판정

- `FAIL`
- 이유
  - DossierCard 등록은 됐지만 event/transition 런타임이 아직 비어 있다.
  - visible typo가 남아 있고, Round 8 요구사항을 현재 빌드로는 검증할 수 없다.
  - session fit은 좋지만 QA gate를 통과할 상태는 아니다.
