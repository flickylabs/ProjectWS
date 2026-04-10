# Thread Q Baseline 12 Report

## 요약

- 일시: 2026-04-10 11:20:19 +09:00
- 기준 빌드: `bb6ae68`
- 대상: refined manifest active 12건
- 종합 판정: **FAIL**

이번 baseline에서는 Thread Q 초기 임무에 따라 active 12건의 Level 1~3 자동 검증을 일괄 실행했고, 대표 1건인 `spouse-05`를 Level 4~5 관점에서 수동 판독했다.

결론은 명확하다.

1. active 12 중 7건이 이미 Level 2 scripted validator에서 FAIL이다.
2. `spouse-05`는 자동화는 통과했지만 실제 플레이 텍스트 층에서 Level 4 FAIL이다.
3. `validate-release-ready-scripted-quality.cjs`는 12건 모두 `flagged: 0`이었지만, 실제 한국어 품질 문제를 거의 잡지 못했다.

현재 refined manifest는 Thread Q Play Gate 기준으로 출시 불가다.

## 범위와 방법

실행한 자동화:

- `node scripts/validate-runtime-template-coverage.cjs --case {caseId}`
- `node tests/validate-scripted-text.cjs --case {caseId}`
- `node scripts/validate-scripted-template-coverage.cjs --case {caseId}`
- `node scripts/validate-scripted-semantic-quality.cjs --case {caseId}`
- `node scripts/validate-release-ready-scripted-quality.cjs`

수동 판독:

- 대표 케이스 `spouse-05`
- 확인 파일: runtime case, Phase 1/2, mediation, scripted bundle

제한 사항:

- 이 세션에는 interactive browser/PC click-through 수단이 없어 `localhost:5173` 실제 클릭 플레이는 수행하지 못했다.
- 따라서 Level 5 평가는 UI 조작이 아니라 실제 플레이에 노출될 텍스트와 게임 데이터 구조를 기준으로 한 baseline 판독이다.

## Active 12 Level 1~3 결과

| caseId | L1 runtime | L2 scripted | L2 template | L3 semantic | 메모 |
|---|---|---|---|---|---|
| family-05 | PASS | PASS | PASS | PASS | clean |
| family-09 | PASS | PASS | PASS | PASS | clean |
| friend-03 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":27}` |
| neighbor-03 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":24}` |
| neighbor-08 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":17}` |
| partnership-04 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":27}` |
| partnership-09 | PASS | PASS | PASS | PASS | clean |
| spouse-05 | PASS | PASS | PASS | PASS | clean, but manual read FAIL |
| spouse-11 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":18}`, semantic `WARN 4` |
| tenant-02 | PASS | PASS | PASS | PASS | clean |
| tenant-09 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":30}`, semantic `WARN 2` |
| workplace-12 | PASS | **FAIL** | PASS | PASS | `summary={"FAIL":24}` |

정리:

- 완전 통과 5건: `family-05`, `family-09`, `partnership-09`, `spouse-05`, `tenant-02`
- Level 2 scripted FAIL 7건: `friend-03`, `neighbor-03`, `neighbor-08`, `partnership-04`, `spouse-11`, `tenant-09`, `workplace-12`
- semantic WARN 추가 2건:
  - `spouse-11`: affect_flattening archetype 대비 감정 노출 과다 4건
  - `tenant-09`: evidence_present 해석 부족 2건

실패 양상은 개별 케이스 특이점보다 공통된 generator 산출 문제에 가깝다.

- `friend-03`: ST1 interrogation/evidence_present/dossier 다수에서 `문장 수 불일치 (3, expected 1-2)`
- `tenant-09`: ST1 S0 구간 다수 + 일부 S5 구간에서 `문장 수 불일치 (5, expected 3-4)`

즉, active set 전체 기준으로 Level 1~3 Gate는 이미 FAIL이다.

## Infra 체크

- Level 1~3 validator 4종은 active 12 전건에 대해 정상 실행됐다.
- `validate-release-ready-scripted-quality.cjs` 결과:
  - `scanned: 12`
  - `flagged: 0`

판단:

- infra 자체는 동작한다.
- 다만 release-ready scripted quality gate는 현재 실제 한국어 품질/템플릿성/메타성 누출을 거의 검출하지 못한다.

## Representative Manual Review: `spouse-05`

### 좋은 점

- Phase 0 훅은 강하다.
  - 서재 전용화, 구 관리자 코드 침입, 위조 녹취라는 축이 바로 잡힌다.
- Phase 1/2 authored text는 비교적 자연스럽다.
  - Phase 1 intro/주장: `src/data/dialogues/phase1/spouse-05.json`
  - Phase 2 반박 구조: `src/data/dialogues/phase2/spouse-05.json`
- evidence chain 구조는 있다.
  - `requiredLieState`가 `S3`, `S1`, `S2`로 걸린 증거가 있고
  - `e-3 + e-4`, `e-1 + e-6` 조합 업그레이드가 존재한다.

### Level 4 FAIL 근거

#### 1. interrogation/evidence 층이 기계 문장처럼 읽힌다

대표 원문:

> "민재는 ... 있었다와 제 아내의 서재 무단 출입을 같은 시간선에 놓고 봐야 실제 순서가 드러납니다"

> "스마트락 출입기록과와 제 아내의 서재 무단 출입을 같이 봐야 판단이 맞습니다"

> "제 아내의 서재 무단 출입이 단순한 감정 충돌로만 보가지 않습니다"

출처:

- `src/data/scriptedText/spouse-05.json:233`
- `src/data/scriptedText/spouse-05.json:271`
- `src/data/scriptedText/spouse-05.json:358`

판정:

- 4-F1/4-F4/4-F5/4-F9 FAIL
- 조사 오류, 비문, 끊긴 호응, 불완전한 단어 조합이 반복된다.

#### 2. variant가 실질적으로 다르지 않고 같은 골격을 계속 반복한다

같은 의미 골격이 상태 문구만 바뀐 채 반복된다.

- `아직 단정할 단계는 아닙니다`
- `불리해 보가는 부분이 있다는 점은 압니다`
- `제 설명이 부족했다는 점은 인정합니다`

그 뒤에는 거의 항상

- 쟁점명 반복
- "같은 시간선에 놓고 봐야"
- "범위와 책임은 구분해 주십시오"

구조가 이어진다.

판정:

- 4-G1/4-G4 FAIL
- 4-E7/4-E8 FAIL

#### 3. witness가 증인이 직접 말하는 형식이 아니라 서술자 설명문이다

대표 원문:

> "소담의 언니 증인은 ... 사건의 핵심 장면으로 진술합니다. 이어서 ... 시간순으로 설명합니다. 마지막으로 ... 분리해 진술합니다"

출처:

- `src/data/scriptedText/spouse-05.json:50903`
- `src/data/scriptedText/spouse-05.json:51272`
- `src/data/scriptedText/spouse-05.json:51641`

판정:

- 4-D5 FAIL
- 4-D6 FAIL

증언이 아니라 "증언 요약 가이드"처럼 읽힌다.

#### 4. mediation에 중복 문자열이 노출된다

대표 원문:

> "공간경계와 공간경계를 같은 묶음으로 처리하지는 않겠습니다."

> "소담의 서재 무단 출입과 소담의 서재 무단 출입의 경위부터 고정하겠습니다."

출처:

- `src/data/dialogues/mediation/spouse-05.json:9`
- `src/data/dialogues/mediation/spouse-05.json:54`

판정:

- Level 5 Phase 6/7 FAIL
- 실제 플레이에서 바로 눈에 띄는 copy assembly 오류다.

### Level 5 baseline 판정

- Phase 0 사건 소개: PASS
- Phase 1/2 진술: PASS
- Phase 3~5 심문 루프: **FAIL**
  - 이유: 실제 심문 텍스트 층이 상품 수준 한국어를 못 버틴다.
- 증거 체인: PASS
  - `requiredLieState`와 `evidenceCombinations` 구조 확인
- 뒤집기 존재: YES
  - 위조 녹취 반전이 분명하다.
- 판결/중재 딜레마: WARN
  - runtime 딜레마는 좋지만 mediation 노출 텍스트가 깨진다.
- Result/aftermath: WARN
  - case-specific 정보는 들어가지만 아직 summary-template 톤이 강하다.

### `spouse-05` 종합

- 자동화 Level 1~3: PASS
- 실제 플레이 텍스트 품질(Level 4): **FAIL**
- 플레이 게이트(Level 5 baseline): **FAIL**

따라서 `spouse-05`는 현재 Thread Q 기준 PASS로 올릴 수 없다.

## Play Gate 판정

- active 12 전체: **FAIL**

사유:

1. active 12 중 7건이 이미 Level 2 scripted validator FAIL
2. representative case `spouse-05`가 automation PASS인데도 Level 4 수동 판독에서 FAIL
3. release-ready scripted quality gate가 실제 문제를 포착하지 못함

## 블로커 목록

1. active manifest 12건 중 7건이 `validate-scripted-text` FAIL
   - 담당: Thread G / Thread W / scripted pipeline owners
2. `spouse-05` interrogation/evidence/witness scripted가 기계 문장, 비문, 템플릿 반복으로 Level 4 FAIL
   - 담당: Thread W 우선, 필요 시 Thread G pipeline 수정
3. `spouse-05` mediation 문자열 조립 오류가 플레이 화면에 그대로 노출될 가능성
   - 담당: Thread G / Thread U
4. release-ready scripted gate가 false negative를 내고 있음
   - 담당: Thread G / validator owners

## 권고

1. active 12에서 Level 2 FAIL 7건은 scripted generator 산출 포맷부터 먼저 정리해야 한다.
2. `spouse-05`는 자동화 통과 케이스라도 곧바로 release 후보로 보지 말고, scripted 대사 전면 재작성 후 재검증해야 한다.
3. 다음 Thread Q 라운드에서는 interactive PC play 환경을 붙여 Phase 3~Result 실제 클릭 테스트를 다시 해야 한다.
