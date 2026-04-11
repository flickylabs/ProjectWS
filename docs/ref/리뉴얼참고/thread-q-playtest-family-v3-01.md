# Thread Q Playtest Report — family-v3-01

테스트 전제
- 범위: 요청된 10개 접근을 기준으로 `--validate-only`, semantic heuristics, `ScriptedText` 전 채널 정독, `phase1/phase2/mediation` 정독, 앱 연결 상태 점검을 함께 수행했다.
- 한계: 현재 앱 코드에는 `family-v3-01` 전용 `src/data/claimPolicies/*.ts` 등록이 없어 `DossierCard/stateUnlockAtoms/transitionBeats`의 실제 런타임 노출을 확인하지 못했다. 또한 authored v3 data 자체에 `events`가 없어 Round 8은 설계 단계에서 막혀 있다.
- 자동 점검: `generic-case-run-pipeline --validate-only` PASS, `validate-scripted-semantic-heuristics` PASS. 다만 `WARN:15 / WARN:193 / WARN:10` 수준의 경고와 실제 복사 품질 문제가 확인됐다.

## 1. 10회차 요약
1. 사실추궁 중심: `d-1`과 `d-2`의 문서/시간축은 잘 잡힌다. 요양원 기록, 공증 전후, 최종본 스캔 흐름이 fact route에 잘 맞는다.
2. 동기탐색 중심: `90대 10 -> 60대 40` 감액 조작의 이유가 "탐욕"이 아니라 "형 보호"와 연결되며 숨은 쟁점이 열린다. 이 사건의 핵심 재미는 여기 있다.
3. 공감접근 중심: 형제 서사, 장남/동생 감정, "미움과 보호가 같이 있는 관계"가 살아난다. 세 유형 차이는 spouse보다 깔끔하다.
4. 증거 심층 1차: `e-1/e-4/e-5/e-6` 축에서 investigationStage 차이가 분명하다. late에서는 지원금, 유서 비율, 스캔 기록이 구체적으로 언급된다.
5. 증거 심층 2차: `e-6+e-7 -> lead-5`는 "유산 문제를 출생 비밀 문제로 뒤집는" 관계 고유의 전환점이다. 조합 설계는 좋지만 실제 dossier 후속 해금은 앱에서 미확인이다.
6. 증인 + 조합 1차: 요양보호사와 사무실 증인의 vague/partial/full 차이는 보인다. 특히 사무실 증언은 문서 흐름을 잘 박아 준다.
7. 증인 + 조합 2차: 늦게 읽을수록 "정후 씨", "태성 씨" 직접 호칭과 copy glitch가 더 눈에 띈다. 정보량은 늘지만 품질이 같이 흔들린다.
8. 끼어들기 + 감정 폭발: 실제 검증 불가. 이 사건의 authored v3 data에는 `events` 섹션이 없어서 Round 8을 열 수 없다.
9. 극단 플레이: 최소 행동만 하면 "동생의 유서 조작"으로 단순화된다. 끝까지 읽어야 "형을 지키려다 어머니 뜻까지 손댄" 양가 구조가 보인다.
10. 자유 플레이: 가장 재밌는 축은 `판단능력 -> 감액 조작 -> 90대 10의 이유 -> 누가 정말 이용했는가` 순이다. session fit 자체는 강하다.

## 2. 채널별 스크립트 품질
- `interrogation`: 총 180개. 유형별 역할 분담은 좋고, 특히 motive/empathy가 형제 관계의 보호-원망 이중성을 잘 살린다. 다만 일부 line은 형태 오류 때문에 좋은 설계를 스스로 깎아 먹는다.
- `evidence_present`: 총 42개. 유서 비율, 스캔 순서, 직원 메모, 20년 송금 같은 키워드를 직접 인지한다. 문서형 사건으로서는 강점이다.
- `witness`: 총 9개. 요양보호사/사무실 직원의 증언 방향은 잘 갈린다. 그러나 `정후 씨`, `태성 씨`가 그대로 노출되고 vague depth의 "내가 본 범위만 말한다" 문구가 더 필요하다.
- `dossier`: 총 15개. `90대 10`의 이유, 감액 조작의 성격, 형 보호 서사가 늦게 열릴수록 강해진다. 다만 일부 질문은 반응이 추상적이고 실제 runtime push는 확인 불가다.
- `system_message`: 총 6개. 중립적이다.
- `aftermath`: 총 5개. 분위기는 맞지만 genericity 경고가 있었고 템플릿 잔향이 남는다.

## 3. 심문 유형별 차이 비교
- 사실추궁: 문서/시간축 정리에 가장 적합하다. "누가 마지막 문서를 들고 왔는가" 같은 질문과 궁합이 좋다.
- 동기탐색: `왜 90을 60으로 낮췄는가`, `왜 형에게 원본 이유를 숨겼는가`가 열리며 가장 큰 반전이 나온다.
- 공감접근: 형제 사이 오래된 결핍과 보호 본능이 살아난다. 3건 중 관계 감정 차이는 이 사건이 가장 선명하다.
- 총평: 질문 유형 차이는 분명하고 유효하다. 문제는 차별화보다 copy corruption이 더 먼저 눈에 들어오는 지점들이다.

## 4. 호칭 전수 체크 결과
- 기대값: A->B `정후야`, B->A `형`, A->재판관 `제 동생`, B->재판관 `제 형`, 격앙 시 `윤정후! / 형!`
- 실제 위반:
  - `src/data/dialogues/phase1/family-v3-01.json:12` `윤정후 씨`
  - `src/data/dialogues/phase1/family-v3-01.json:39` `윤태성 씨`
  - `src/data/dialogues/phase2/family-v3-01.json:12` `윤정후 씨`
  - `src/data/dialogues/phase2/family-v3-01.json:21` `윤태성 씨`
  - `src/data/scriptedText/family-v3-01.json:47223` `정후 씨`
  - `src/data/scriptedText/family-v3-01.json:47838` `정후 씨였습니다`
- 판정: FAIL

## 5. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인
- 증거 연계: PASS. 문서형 사건답게 증거-대사 결속력이 높다.
- 증인 깊이: PASS. 사무실 증언은 vague/partial/full이 분명하다.
- 조합 스킬: PASS at data level. `combinationLab`에 10개 recipe가 있고 hidden dispute 해금 방향도 의미 있다.
- DossierCard 질문 성공 후 state push: CONDITIONAL. authored data는 있으나 앱 등록 누락으로 실제 체감 확인이 막혀 있다.
- 끼어들기 / 감정 폭발: FAIL for current build. `docs/ref/리뉴얼참고/family-v3-01-v3-game-loop-data.json`에 `events`가 아예 없어 Round 8 요구를 충족하지 못한다.
- Level 5 session fit: PASS. `치매 말년`, `형제 간 유서 비율`, `20년 지원`, `출생 비밀`은 family 관계가 아니면 유지되기 어렵다.

## 6. 발견된 버그 / 이슈 목록
- [P0][Thread G] `family-v3-01`용 `src/data/claimPolicies/*.ts` 등록이 없어 `registerV3GameLoopData`가 호출되지 않는다. dossier, unlock atom, transition beat가 앱에 연결되지 않는다.
- [P0][Thread G] `docs/ref/리뉴얼참고/family-v3-01-v3-game-loop-data.json`에는 `events` 섹션이 없다. 요청된 Round 8 수동 테스트를 구조적으로 수행할 수 없다.
- [P0][Thread W->G] 사용자 노출 텍스트에 `~씨` 호칭이 남아 있다. FAIL.
- [P1][Thread W->G] 형태 오류가 많다. `문제이`, `보가던`, `60대 40가었습니다`, `있은`, `망이뜨린다` 등은 출하 불가 수준이다.
- [P1][Thread W->G] `phase1/phase2/mediation` 문장 골격이 다른 사건들과 거의 동일하다. 형제 관계의 고유 텐션이 script 레이어에서 약해진다.

## 7. 대사 품질 전반 평가
- 좋은 예시: `"저는 더 가지려 한 게 아니라 90대 10이 불러올 일을 막으려고 60대 40으로 바꿨습니다."` 가족 내부 보호 논리가 즉시 드러난다.
- 좋은 예시: `"A는 진실을 모르고 B를 미워했고, B는 형을 지키려다 어머니 뜻까지 손댔다."` family 사건의 핵심 양가성을 정확히 집는다.
- 나쁜 예시: `"뒤는 60대 40가었습니다."` 핵심 문서 증언에서 바로 형태가 무너진다.
- 나쁜 예시: `"문제이 가볍지 않다는 건 압니다."` phase 대사 초반부터 번역체/오타가 튀어 immersion을 깨뜨린다.

## 8. 종합 판정
- FAIL
- 이유: 서사 설계와 session fit은 강하다. 그러나 `~씨` 하드 FAIL, Round 8 불가, 앱-side v3 등록 누락, 다량의 형태 오류가 동시에 존재한다. 우선순위는 `events 보강 + claimPolicies 등록 + 호칭/형태 전면 교정`이다.
