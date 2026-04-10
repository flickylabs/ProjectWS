# Play Test Report: spouse-05

## 테스트 환경

- 일시: 2026-04-10 11:20:19 +09:00
- 플랫폼: baseline data review + validator CLI
- 빌드: `bb6ae68`
- 비고: 이 세션에는 browser click-through 수단이 없어 `localhost:5173` 실제 조작 대신 runtime/phase/scripted/mediation 텍스트를 직접 읽고 판정했다.

## Level 1~3

- Level 1: PASS
  - `validate-runtime-template-coverage` `summary={}`
- Level 2: PASS
  - `validate-scripted-text` `summary={}`
  - `validate-scripted-template-coverage` `summary={}`
- Level 3: PASS
  - `validate-scripted-semantic-quality` `summary={}`

## Level 4: NPC 대사 품질

- 4-A 호칭: PASS
  - Phase 1/2 authored text에서는 `제 아내`, `제 남편`, `여보` 축이 크게 흔들리지 않는다.
- 4-A 어체: WARN
  - authored Phase 1/2는 안정적이지만 scripted bundle에서는 문장 연결과 조사 품질이 흔들린다.
- 4-A TruthThrottle: PASS
  - baseline 판독 범위에서는 조기 금액/실명 누출보다 한국어 품질 문제가 더 컸다.
- 4-A 캐릭터/감정/LieState: FAIL
  - A/B가 각자 다른 캐릭터로 말한다기보다 같은 템플릿을 다른 쟁점명으로 채운 느낌이 강하다.
- 4-A 금지패턴: WARN
  - 명시적 메타 누출은 없었지만 생성기 냄새가 강한 반복 문장이 많다.
- 4-B 재판관 질문: WARN
  - full UI 교차 확인은 못 했지만 source 기준으로는 blocking issue보다 NPC 대사 품질 문제가 더 컸다.
- 4-C 시스템 메시지: WARN
  - Phase 1/2 시스템 문장은 비교적 안정적이지만 실제 플레이 중 system channel 전체 확인은 미완료다.
- 4-D 증인 증언: FAIL
  - 증인이 직접 말하지 않고 "증인은 ~ 진술합니다" 식의 서술자 문장이 나온다.
- 4-E 증거 반응: FAIL
  - 증거 이름만 끼워 넣은 반복 골격이 많고 사건별 반응이 충분히 살아 있지 않다.
- 4-F 한국어: FAIL
  - 조사/활용 어색함, 비문, 붙은 단어, 잘린 단어가 반복된다.
- 4-G variant 다양성: FAIL
  - 5개 variant가 실질적으로 같은 골격을 반복한다.
- 4-H aftermath: WARN
  - 사건 고유 정보는 들어가지만 summary template 톤이 강하다.

## 대표 문제 대사

1. `src/data/scriptedText/spouse-05.json:233`

> "민재는 ... 있었다와 제 아내의 서재 무단 출입을 같은 시간선에 놓고 봐야 실제 순서가 드러납니다"

- 위반: 4-F1, 4-F4, 4-F5

2. `src/data/scriptedText/spouse-05.json:271`

> "스마트락 출입기록과와 제 아내의 서재 무단 출입을 같이 봐야 판단이 맞습니다"

- 위반: 4-F1, 4-F9

3. `src/data/scriptedText/spouse-05.json:358`

> "제 아내의 서재 무단 출입이 단순한 감정 충돌로만 보가지 않습니다"

- 위반: 4-F4, 4-F9

4. `src/data/scriptedText/spouse-05.json:50903`

> "소담의 언니 증인은 ... 시간순으로 설명합니다. 마지막으로 자신이 직접 본 장면과 추정에 가까운 부분을 분리해 진술합니다"

- 위반: 4-D5, 4-D6

5. `src/data/dialogues/mediation/spouse-05.json:9`

> "공간경계와 공간경계를 같은 묶음으로 처리하지는 않겠습니다."

- 위반: Level 5 Phase 6/7 copy assembly error

## Level 5: 게임플레이

- Phase 0 사건 소개: PASS
  - hook가 강하고 사건 방향이 잘 잡힌다.
- Phase 1/2 진술: PASS
  - authored statement는 실제 부부 갈등 톤이 비교적 살아 있다.
- Phase 3~5 심문 루프: FAIL
  - 실제 노출 scripted layer가 기계 문장과 반복 골격 때문에 무너진다.
- 증거 체인: PASS
  - `requiredLieState`와 `evidenceCombinations`가 존재해 단계적 해금 구조는 보인다.
- 뒤집기 존재: YES
  - 위조 녹취 반전이 사건의 중심 뒤집기 역할을 한다.
- 판결 딜레마: WARN
  - runtime dilemma는 좋지만 mediation 출력 품질이 이를 받쳐 주지 못한다.
- Level 5 종합: FAIL

## 최종 판정

- **FAIL**

## 블로커 목록

1. scripted interrogation/evidence/witness가 Level 4 기준의 자연스러운 한국어를 충족하지 못함
   - 담당: Thread W / Thread G
2. mediation 출력에 중복 문자열 조립 오류가 있음
   - 담당: Thread G / Thread U
3. automation PASS와 실제 플레이 텍스트 품질 사이의 간극이 큼
   - 담당: Thread Q follow-up, validator owners

## 개선 제안

1. `spouse-05`는 scripted bundle을 generator 미세조정보다 사실상 재작성하는 편이 빠르다.
2. witness는 "증언 요약"이 아니라 실제 증인 발화 1인칭 진술로 교체해야 한다.
3. mediation 텍스트는 중재 키 조립 로직부터 점검해야 한다.
4. 수정 후에는 interactive PC play로 Phase 3~Result를 다시 확인해야 한다.
