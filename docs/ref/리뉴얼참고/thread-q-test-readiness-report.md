# Thread Q Test Readiness Report

## 요약

- 일시: 2026-04-10 11:42:47 +09:00
- 기준 빌드: `bb6ae68`
- 레거시 샘플 케이스: `headline-01`
- 종합 판정: **CONDITIONAL READY**

이번 readiness pass의 목적은 두 가지였다.

1. 새 사건이 오기 전, Thread Q가 바로 돌릴 수 있는 validator 세트를 읽기 전용으로 확정한다.
2. 새 사건에 즉시 적용 가능한 Level 4~5 수동 플레이 체크리스트를 정리한다.

결론은 다음과 같다.

- `validate-*.cjs` 10종은 모두 실행 경로를 확인했다.
- 케이스 단위 smoke에서는 `headline-01`로 5개 validator를 실행했고, 4개는 PASS, 1개는 FAIL, 1개는 WARN-only였다.
- 전역 validator 5개도 모두 정상 실행됐다.
- 다만 `ct-to-threadQ-init.md`에 적힌 `generic-case-run-pipeline.cjs --validate-only`는 현재 코드상 읽기 전용 모드가 구현돼 있지 않다. Thread Q 표준 smoke 명령으로 쓰면 안 된다.

핵심 교훈은 그대로다.

> validator PASS는 시작일 뿐이다. Thread Q는 반드시 직접 읽고, 직접 플레이하고, 직접 판단해야 한다.

---

## 이번 readiness pass 범위

- 기존 사건 데이터는 전건 폐기 상태이므로, `headline-01`은 **출시 판정용이 아니라 validator 기능 점검용 샘플**로만 사용했다.
- 실제 클릭 기반 플레이는 이번 세션에서 수행하지 않았다.
  - 현재 세션에는 browser click-through 수단이 없어 Level 4~5는 실행 체크리스트 정비에 집중했다.
- 파일 재생성/덮어쓰기를 유발하는 파이프라인은 제외했다.
  - Thread Q readiness 기준의 표준 smoke는 **직접 validator 실행**이다.

---

## Validator 인벤토리와 실행 결과

### 실행 기준

- `실행 상태`: 스크립트가 런타임 에러 없이 끝까지 기동했는지
- `샘플 결과`: `headline-01` 또는 전역 스캔 기준의 PASS/FAIL/WARN 요약

| 스크립트 | 범위 | 실행 상태 | 샘플 결과 | 메모 |
|---|---|---:|---|---|
| `scripts/validate-runtime-template-coverage.cjs` | 단일 케이스 | PASS | `summary={}` | 정상 |
| `tests/validate-scripted-text.cjs` | 단일 케이스 | PASS | `FAIL {"FAIL":24,"WARN":69}` | 실행은 정상, 샘플 데이터에서 구조/문장 규칙 위반 다수 포착 |
| `scripts/validate-scripted-template-coverage.cjs` | 단일 케이스 | PASS | `summary={}` | 정상 |
| `scripts/validate-scripted-semantic-quality.cjs` | 단일 케이스 | PASS | `summary={}` | 정상 |
| `scripts/validate-scripted-semantic-heuristics.cjs` | 단일 케이스 | PASS | `WARN {"WARN":12}` | 휴리스틱 경고만 반환, 종료는 PASS |
| `scripts/validate-release-ready-scripted-quality.cjs` | active 12 전역 | PASS | `scanned: 12, flagged: 0` | false negative 위험 계속 의심 |
| `scripts/validate-release-ready-manifest.cjs` | active 12 전역 | PASS | `passCount: 12, failCount: 0` | 정상 |
| `scripts/validate-phase-script-coverage.cjs` | active 12 전역 | PASS | `missingCount: 0` | 정상 |
| `scripts/validate-phase-dialogue-quality.cjs` | active 12 전역 | PASS | `failCount: 0` | 정상 |
| `scripts/validate-gpt-batch.cjs` | friend-01~12 전역 | PASS | `PASS 12 / FAIL 0 / SKIP 0` | 정상 |

### `validate-scripted-text.cjs` 샘플 FAIL 해석

이 스크립트는 고장 난 것이 아니라, 레거시 샘플 `headline-01`에서 실제 문제를 정확히 잡아냈다.

대표 패턴:

- ST1 `문장 수 불일치 (3, expected 1-2)`
  - `b|d-1|S0`
  - `b|d-2|S0/S1`
  - `b|d-4|S0/S1`
  - 여러 interrogation 변형에서 반복
- dossier 4-E 경고 다수
  - "Dossier 반응에 질문 고유 전제가 거의 반영되지 않았습니다"

해석:

- Thread Q 관점에서 이 validator는 **정상 동작 중**이다.
- 다만 PASS만 보는 용도로 쓰면 안 되고, FAIL/WARN 내용을 실제 텍스트 판독과 연결해야 한다.

---

## 운영 규칙과 즉시 반영할 주의사항

### 1. `generic-case-run-pipeline.cjs --validate-only` 검증 완료

CT 후속 지시에 따라 아래 명령을 `spouse-05`로 실검증했다.

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05 --validate-only
```

결과:

- 종료 코드 `0`
- 실행 단계:
  - `runtime_template_validate`
  - `scripted_template_validate`
  - `scripted_semantic_validate`
  - `scripted_validate`
- 샘플 결과:
  - runtime PASS
  - scripted template PASS
  - semantic quality PASS
  - scripted text PASS
- 로그 산출:
  - `tmp/spouse-05-runtime-template-validate.txt`
  - `tmp/spouse-05-scripted-template-validate.txt`
  - `tmp/spouse-05-semantic-validate.txt`
  - `tmp/spouse-05-stage3-validate.txt`
  - `tmp/pipeline-status/spouse-05.json`

무변경 확인:

- `src/data/cases/generated/spouse-05.json` 해시 불변
- `src/data/scriptedText/spouse-05.json` 해시 불변
- `src/data/dialogues/mediation/spouse-05.json` 해시 불변

판정:

- `--validate-only`는 Thread Q 기준에서 **읽기 전용 validator wrapper로 사용 가능**
- 다만 tmp 로그/상태 파일은 정상적으로 갱신된다

### 2. release-ready scripted gate는 단독 Play Gate가 아니다

`validate-release-ready-scripted-quality.cjs`는 이번에도 `flagged: 0`이었다.  
그러나 Thread Q baseline에서도 이미 확인했듯, 이 스크립트는 실제 Level 4 한국어 품질 문제를 충분히 잡지 못한다.

운영 규칙:

- 이 스크립트는 참고용이다.
- Play Gate 기준은 항상 **Level 4 직접 판독 + Level 5 직접 플레이**다.

### 3. Thread Q 표준 smoke 명령 세트

새 사건 1건이 올라오면, Thread Q의 첫 자동 점검은 아래 순서로 고정한다.

```bash
node scripts/generic-case-run-pipeline.cjs --case {caseId} --validate-only
node scripts/validate-scripted-semantic-heuristics.cjs --case {caseId}
```

설명:

- 첫 줄이 Thread Q 표준 wrapper다.
- 둘째 줄은 wrapper에 아직 포함되지 않은 추가 휴리스틱 점검이다.
- 필요하면 개별 validator를 직접 재실행해 세부 로그를 다시 확인한다.

전역 점검이 필요할 때만 아래를 별도 실행한다.

```bash
node scripts/validate-release-ready-scripted-quality.cjs
node scripts/validate-release-ready-manifest.cjs
node scripts/validate-phase-script-coverage.cjs
node scripts/validate-phase-dialogue-quality.cjs
node scripts/validate-gpt-batch.cjs
```

---

## Level 4 수동 테스트 체크리스트

아래 체크리스트는 `ct-to-threadC-final-quality-test-117.md`를 기준으로, 새 사건에 바로 복사해서 쓸 수 있게 재정리한 실행 버전이다.

### 사전 준비

- [ ] 깨끗한 브라우저 프로필 또는 시크릿 세션에서 시작한다.
- [ ] `solomon-judge-drift`, `solomon-judge-perks`, `solomon-history`를 비우거나 신규 프로필을 사용한다.
- [ ] `npm run dev`로 PC 기준 환경을 띄운다.
- [ ] 테스트 로그에 `caseId`, 빌드 해시, 테스트 일시, 브라우저/해상도, 로컬스토리지 초기화 여부를 기록한다.
- [ ] Phase 0부터 Result까지 한 번은 끊지 않고 간다.

### 필수 실행 동선

- [ ] Phase 3에서 최소 5턴 심문한다.
- [ ] 질문 분포를 `fact_pursuit` 2회, `motive_search` 1회, `empathy_approach` 2회로 맞춘다.
- [ ] 같은 조건에서 최소 2회 반복 질문해 variant 차이를 확인한다.
- [ ] 최소 한 쟁점을 `S0 → S2 이상`으로 올린다.
- [ ] 서로 다른 증거를 최소 2회 제시한다.
- [ ] 증인 증언이 있다면 최소 1회 확인한다.
- [ ] 대사는 반드시 소리 내어 읽는 수준으로 확인한다.

### 4-A. NPC 대사

- [ ] 4-A1 `toJudge` 호칭이 관계 특화형이다. generic label이 아니다.
- [ ] 4-A2 `toPartner` 호칭이 직접 호명 상황에 맞다.
- [ ] 4-A3 감정 격앙 시 `angry` 호칭으로 실제 전환된다.
- [ ] 4-A4 한 대사 안에서 호칭이 섞이지 않는다.
- [ ] 4-A5 재판관 대상 대사는 합니다체다.
- [ ] 4-A6 당사자끼리 말할 때는 반말 흐름이 유지된다.
- [ ] 4-A7 일반 대사에서 해요체 남용이 없다.
- [ ] 4-A8 S0~S1에서는 금액/실명/기관이 모호하게 유지된다.
- [ ] 4-A9 S2에서는 범위형 표현까지만 나온다.
- [ ] 4-A10 S3+에서는 실제로 구체화된다.
- [ ] 4-A11 S5에서는 숨긴 부분 없이 전부 공개된다.
- [ ] 4-A12 archetype이 말투와 전략에 실제 반영된다.
- [ ] 4-A13 verbal tell이 자연스럽게 보인다.
- [ ] 4-A14 감정 톤이 현재 phase와 맞는다.
- [ ] 4-A15 LieState 단계와 대사 내용이 어긋나지 않는다.
- [ ] 4-A16 번역체 9패턴이 한 줄도 없다.
- [ ] 4-A17 금지 클리셰가 반복되지 않는다.
- [ ] 4-A18 메타 누출이 없다.
- [ ] 4-A19 비금전 분쟁에 금전 오염이 없다.
- [ ] 4-A20 JSON 필드명/쟁점명 조각이 대사에 그대로 끼지 않는다.

### 4-B. 재판관 질문

- [ ] 4-B1 `fact_pursuit`는 단호하고 논리적이다.
- [ ] 4-B2 `motive_search`는 탐색적이고 단정적이지 않다.
- [ ] 4-B3 `empathy_approach`는 부드럽고 공격적이지 않다.
- [ ] 4-B4 질문이 한쪽 편을 먼저 들지 않는다.
- [ ] 4-B5 재판관은 항상 `"OOO 씨"`로 당사자를 부른다.
- [ ] 4-B6 증거 기반 질문이 실제 증거 내용과 정확히 맞는다.

### 4-C. 시스템 메시지

- [ ] 4-C1 시스템 메시지가 실제 게임 상태와 맞는다.
- [ ] 4-C2 시스템 메시지가 진실을 미리 말하지 않는다.
- [ ] 4-C3 시스템 메시지가 감정적이거나 편향되지 않는다.

### 4-D. 증인 증언

- [ ] 4-D1 vague/partial/full 문장 수가 기준과 맞다.
- [ ] 4-D2 증인 입장이 설정과 반대로 흔들리지 않는다.
- [ ] 4-D3 기관 증인은 감정 과잉 없이 공적 톤을 유지한다.
- [ ] 4-D4 증인도 재판관 대상 합니다체를 지킨다.
- [ ] 4-D5 증언에 사건 고유 사실이 들어간다.
- [ ] 4-D6 "증인은 ~합니다" 같은 서술자 시점 문장이 없다.

### 4-E. 증거 반응과 특수 상황

- [ ] 4-E1 NPC가 제시된 증거의 구체 내용을 인지해 반응한다.
- [ ] 4-E2 증거가 바뀌면 반응도 바뀐다.
- [ ] 4-E3 DossierCard 반응은 일반 증거보다 강도가 높다.
- [ ] 4-E4 모순 추궁 시 모순을 실제로 인지한다.
- [ ] 4-E5 끼어들기나 감정 폭발이 맥락상 자연스럽다.
- [ ] 4-E6 비공개 진술은 공개 진술과 내용이 구분된다.
- [ ] 4-E7 `evidence_present`가 사건명 치환 템플릿으로 보이지 않는다.
- [ ] 4-E8 `dossier` 반응이 질문 고유 전제를 실제로 반영한다.

### 4-F. 한국어 품질

- [ ] 4-F1 조사 오류가 없다.
- [ ] 4-F2 시제가 한 대사 안에서 흔들리지 않는다.
- [ ] 4-F3 대명사/화자 시점 혼동이 없다.
- [ ] 4-F4 문장이 끝까지 완결된다.
- [ ] 4-F5 실제 사람이 법정에서 말하는 것처럼 들린다.
- [ ] 4-F6 같은 단어/구문 반복이 과도하지 않다.
- [ ] 4-F7 직전 질문에 대한 답으로 자연스럽다.
- [ ] 4-F8 데이터 필드명이 그대로 노출되지 않는다.
- [ ] 4-F9 잘린 단어, 붙은 단어, 깨진 형태가 없다.
- [ ] 4-F10 지나치게 문어체 일색이 아니라 구어적 흐름이 있다.

### 4-G. Variant 다양성

- [ ] 4-G1 5개 variant가 명사 치환 수준이 아니라 실질적으로 다르다.
- [ ] 4-G2 variant 간 정보 수준이 같은 LieState 범위를 유지한다.
- [ ] 4-G3 연속 질문 시 톤 전환이 급변하지 않는다.
- [ ] 4-G4 같은 조건 variant끼리 문장 구조 자체가 다르다.
- [ ] 4-G5 같은 질문이라도 이 사건의 이 쟁점에 대한 고유한 대답이 나온다.

### 4-H. Aftermath

- [ ] 4-H1 선택한 판결/솔루션이 후일담에 실제 반영된다.
- [ ] 4-H2 후일담에 사건 고유 정보가 들어간다.
- [ ] 4-H3 후일담 톤이 사건 분위기와 맞는다.
- [ ] 4-H4 다른 사건의 scaffold를 가져온 티가 나지 않는다.

### Level 4 판정 규칙

- PASS: 읽었을 때 상품 수준으로 자연스럽다.
- WARN: 기능은 하지만 반복/어색함이 남아 있다.
- FAIL: 기계 문장, 범용 템플릿, 호칭 오류, 메타 누출, 필드명 노출, 비문이 있다.

주의:

- WARN/FAIL은 반드시 **원문 인용**을 남긴다.
- "조금 어색하지만 이해는 됨"은 PASS가 아니라 대체로 WARN이다.
- "기계가 쓴 글 같다"는 느낌이 나면 즉시 FAIL이다.

---

## Level 5 수동 플레이 체크리스트

Level 5는 기존 18항목에 Thread Q용 플레이 감각 검증을 합쳐서 재정리했다.

### 5-0. 핵심 플레이 게이트

- [ ] 5-0-1 Phase 0 소개가 바로 사건의 질문을 만든다.
- [ ] 5-0-2 Phase 1/2 authored statement가 자연스럽고 당사자 관계를 살린다.
- [ ] 5-0-3 Phase 3~5 심문 루프가 실제로 작동한다.
- [ ] 5-0-4 증거가 점진적으로 해금되고 체인이 느껴진다.
- [ ] 5-0-5 중반 이후 판을 뒤집는 순간이 있다.
- [ ] 5-0-6 판결 딜레마가 재판관 성향에 따라 갈릴 수 있다.
- [ ] 5-0-7 **세션 fit: "이 관계에서만 가능한 싸움인가?"**

### 5-0-7 세션 fit 판정 기준

- [ ] 갈등의 핵심 압박이 관계 특유의 권한/거리감/의무에서 나온다.
- [ ] 증거와 호칭이 관계 타입을 바꾸면 성립하지 않거나 힘이 급격히 빠진다.
- [ ] 뒤집기와 딜레마도 관계 특유의 배신, 공모, 생활권, 직무, 친밀성에 기대고 있다.
- [ ] 관계 타입을 다른 카테고리로 바꿔도 거의 그대로 성립한다면 FAIL이다.

빠른 질문:

- [ ] 이 사건을 `spouse → friend`, `tenant → workplace`, `partnership → neighbor`처럼 바꿔도 거의 같은 싸움이 되지 않는가?
- [ ] 이 당사자들이 왜 하필 이 관계여야 하는지가 Phase 0~2에서 바로 느껴지는가?
- [ ] 증거 체인과 판결 딜레마가 관계-specific stakes를 강화하는가?

### 5-A. 중재 Phase 6

- [ ] 5-A1 중재 화면에 정상 진입한다.
- [ ] 5-A2 중재 옵션 문구가 맥락상 자연스럽다.
- [ ] 5-A3 중재 옵션 선택이 정상 작동한다.
- [ ] 5-A4 중재 선택 결과가 다음 단계에 실제 반영된다.

### 5-B. 판결 Phase 7

- [ ] 5-B1 판결 화면이 정상 로드된다.
- [ ] 5-B2 책임 비율 슬라이더가 정상 작동한다.
- [ ] 5-B3 solutions 변환/노출이 자연스럽다.
- [ ] 5-B4 솔루션 카드 문구가 사건 맥락과 맞다.
- [ ] 5-B5 솔루션 선택이 정상 작동한다.
- [ ] 5-B6 판결 확정 버튼이 정상 작동한다.

### 5-C. 결과 Result

- [ ] 5-C1 점수가 정상 표시된다.
- [ ] 5-C2 점수 설명이 납득 가능하다.
- [ ] 5-C3 칭호가 정상 표시된다.
- [ ] 5-C4 통찰/권위/지혜 분화가 보인다.
- [ ] 5-C5 aftermath 텍스트가 사건 고유 정보를 반영한다.
- [ ] 5-C6 결과가 history에 저장된다.
- [ ] 5-C7 재판관 드리프트/퍼크 갱신이 일관된다.
- [ ] 5-C8 Home 복귀가 정상 작동한다.

### Level 5 블로커 판정 기준

- Phase 0에서 이미 답이 보이면 FAIL
- 증거 체인이 없이 심문만 반복해도 다 풀리면 FAIL
- 중반 뒤집기 없이 한쪽이 처음부터 끝까지 명백하면 FAIL
- 세션 fit이 약해서 관계를 바꿔도 같은 사건이 되면 FAIL
- Phase 6/7/Result의 문자열 조립 오류가 노출되면 FAIL

---

## 새 사건 도착 시 Thread Q 권장 순서

1. direct validator 5종을 먼저 돌린다.
2. FAIL/WARN를 보고 Level 4 수동 판독의 주의 포인트를 미리 적는다.
3. 깨끗한 저장 상태에서 Phase 0→Result까지 직접 플레이한다.
4. Level 4는 원문 인용과 함께 판정한다.
5. Level 5는 증거 체인, 뒤집기, 딜레마, 세션 fit까지 본다.
6. 최종 Play Gate는 PASS / CONDITIONAL / FAIL로 정리한다.

---

## 현 시점 결론

Thread Q는 지금 바로 새 사건 QA를 시작할 최소 준비는 끝났다.

- validator 세트는 확정됐다.
- 실행 결과를 해석하는 기준도 정리됐다.
- Level 4~5 수동 체크리스트도 ready 상태다.

다만 아래 두 가지는 반드시 기억해야 한다.

1. `generic-case-run-pipeline --validate-only`는 현재 믿으면 안 된다.
2. `validate-release-ready-scripted-quality.cjs`의 `flagged: 0`은 절대 출시 허가가 아니다.

Thread Q의 표준은 앞으로도 동일하다.

> 자동화는 입구다. Play Gate는 사람이 닫는다.

---

## CT 후속 지시 반영

- CT Play Gate 준비 판정: **PASS**
- Level 4~5 체크리스트: **승인**
- 신규 Level 5 세션 fit 항목: **승인**

현재 Thread Q 상태:

- 새 사건이 Thread G에서 나올 때까지 대기
- `--validate-only` 구현 및 Thread Q 검증 완료

대기 중 즉시 수행할 다음 작업:

1. 첫 실전 적용 사건 `spouse "공유 캘린더의 월요일"`이 Thread G를 거쳐 도착하면 바로 Level 1~5 테스트 시작
