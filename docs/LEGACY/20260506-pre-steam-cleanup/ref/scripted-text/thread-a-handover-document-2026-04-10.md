# Thread A Handover Document (2026-04-10)

이 문서는 "이관" 문서가 아니라 `기록 보존` 문서입니다.  
Thread A가 실제로 만든 파이프라인, 생성기, validator, manifest, 데이터 자산, 그리고 이번 실패의 원인을 CT가 읽고 필요한 부분만 새 스레드에 재분배할 수 있도록 정리한 문서입니다.

---

## 1. 파이프라인 구조 기록

### 1-1. 전체 staged pipeline 개요

현재 공용 실행 진입점은 아래 2개입니다.

- 케이스 1건 실행: [D:\ProjectWS\scripts\generic-case-run-pipeline.cjs](D:/ProjectWS/scripts/generic-case-run-pipeline.cjs)
- 병렬 배치 실행: [D:\ProjectWS\scripts\run-parallel-case-batch.cjs](D:/ProjectWS/scripts/run-parallel-case-batch.cjs)

공용 staged runner는:
- [D:\ProjectWS\scripts\lib\run-staged-pipeline.cjs](D:/ProjectWS/scripts/lib/run-staged-pipeline.cjs)

`generic-case-run-pipeline.cjs` 기준 단계는 아래 순서입니다.

1. `stage1a` `runtime_case_generate`
- 스크립트: [D:\ProjectWS\scripts\case-stage1a-runtime.cjs](D:/ProjectWS/scripts/case-stage1a-runtime.cjs)
- 입력: `caseId`
- 출력: [D:\ProjectWS\src\data\cases\generated\<caseId>.json](D:/ProjectWS/src/data/cases/generated)

2. `stage1b` `runtime_template_validate`
- 스크립트: [D:\ProjectWS\scripts\validate-runtime-template-coverage.cjs](D:/ProjectWS/scripts/validate-runtime-template-coverage.cjs)
- 입력: generated runtime case
- 출력: [D:\ProjectWS\tmp\<caseId>-runtime-template-validate.txt](D:/ProjectWS/tmp)

3. `stage1c` `mediation_dialogues_generate`
- 스크립트: [D:\ProjectWS\scripts\case-stage1e-mediation-dialogues.cjs](D:/ProjectWS/scripts/case-stage1e-mediation-dialogues.cjs)
- 입력: generated runtime case
- 출력: [D:\ProjectWS\src\data\dialogues\mediation\<caseId>.json](D:/ProjectWS/src/data/dialogues/mediation)

4. `stage2` `scripted_bootstrap_generate`
- 스크립트: [D:\ProjectWS\scripts\case-stage2-scripted-bootstrap.cjs](D:/ProjectWS/scripts/case-stage2-scripted-bootstrap.cjs)
- 입력: generated runtime case + case-specific builder inputs
- 출력: [D:\ProjectWS\src\data\scriptedText\<caseId>.json](D:/ProjectWS/src/data/scriptedText)

5. `stage2b` `scripted_template_validate`
- 스크립트: [D:\ProjectWS\scripts\validate-scripted-template-coverage.cjs](D:/ProjectWS/scripts/validate-scripted-template-coverage.cjs)
- 입력: scripted bundle + runtime case
- 출력: [D:\ProjectWS\tmp\<caseId>-scripted-template-validate.txt](D:/ProjectWS/tmp)

6. `stage2c` `scripted_semantic_validate`
- 스크립트: [D:\ProjectWS\scripts\validate-scripted-semantic-quality.cjs](D:/ProjectWS/scripts/validate-scripted-semantic-quality.cjs)
- 입력: scripted bundle + runtime case
- 출력: [D:\ProjectWS\tmp\<caseId>-semantic-validate.txt](D:/ProjectWS/tmp)

7. `stage3` `scripted_validate`
- 액션: `run-scripted-validate.cjs` 경유
- 실제 validator: [D:\ProjectWS\tests\validate-scripted-text.cjs](D:/ProjectWS/tests/validate-scripted-text.cjs)
- 출력: [D:\ProjectWS\tmp\<caseId>-stage3-validate.txt](D:/ProjectWS/tmp)

### 1-2. runtime 생성기 계층

공용 runtime compiler:
- [D:\ProjectWS\scripts\lib\compile-runtime-case.cjs](D:/ProjectWS/scripts/lib/compile-runtime-case.cjs)

현재 우선순위는 아래와 같습니다.

1. `headline` 전용 spec가 있으면
- [D:\ProjectWS\scripts\lib\headline-spec-compiler.cjs](D:/ProjectWS/scripts/lib/headline-spec-compiler.cjs)

2. Thread-E case spec가 있으면
- [D:\ProjectWS\scripts\lib\thread-e-case-compiler.cjs](D:/ProjectWS/scripts/lib/thread-e-case-compiler.cjs)

3. 파일럿 런타임 빌더가 있으면
- `scripts/build-pilot-<caseId>-runtime.cjs`

4. 이미 generated runtime이 있으면 그대로 사용

그 후 모든 runtime은 공통 후처리를 탑니다.
- [D:\ProjectWS\scripts\lib\runtime-gameplay-enricher.cjs](D:/ProjectWS/scripts/lib/runtime-gameplay-enricher.cjs)

이 파일은 아래를 같이 맡습니다.
- `baseEvidenceIds`, `monetaryDisputeIds`, `requires`, `requiredLieState` 보강
- `viewerData` / `meta` / `media` 보강
- PC evidence viewer용 SVG media 생성

### 1-3. scripted 생성기 계층

공용 scripted compiler:
- [D:\ProjectWS\scripts\lib\compile-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/compile-scripted-bundle.cjs)

현재 우선순위는 아래와 같습니다.

1. `override builder`
- 경로: [D:\ProjectWS\src\data\headlineSpecs\<caseId>\scripted-builder.cjs](D:/ProjectWS/src/data/headlineSpecs)
- `compile({ root, caseId, outPath })` 함수 필요

2. `generic builder`
- 경로: [D:\ProjectWS\scripts\lib\build-pilot-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/build-pilot-scripted-bundle.cjs)
- 입력: runtime case + `docs/ref` 아래의 `<caseId>-v3-game-loop-data.json`

3. `legacy stage2 script`
- 경로: [D:\ProjectWS\scripts\<caseId>-stage2-scripted-bootstrap.cjs](D:/ProjectWS/scripts)

그 후 공통 후처리 체인은 아래입니다.
- [D:\ProjectWS\scripts\lib\scripted-metadata-enricher.cjs](D:/ProjectWS/scripts/lib/scripted-metadata-enricher.cjs)
- [D:\ProjectWS\scripts\lib\scripted-semantic-normalizer.cjs](D:/ProjectWS/scripts/lib/scripted-semantic-normalizer.cjs)
- [D:\ProjectWS\scripts\lib\release-ready-scripted-hotfix.cjs](D:/ProjectWS/scripts/lib/release-ready-scripted-hotfix.cjs)

### 1-4. 병렬 실행 구조

병렬 배치 실행:
- [D:\ProjectWS\scripts\run-parallel-case-batch.cjs](D:/ProjectWS/scripts/run-parallel-case-batch.cjs)

기능:
- manifest에서 케이스 목록 읽기
- 각 케이스별 `*-run-pipeline.cjs` 또는 generic runner 실행
- 상태 파일 생성
  - [D:\ProjectWS\tmp\pipeline-batch-status.json](D:/ProjectWS/tmp/pipeline-batch-status.json)
  - [D:\ProjectWS\tmp\pipeline-status\*.json](D:/ProjectWS/tmp/pipeline-status)
  - [D:\ProjectWS\tmp\pipeline-runs\*.log](D:/ProjectWS/tmp/pipeline-runs)

현재 있는 manifest 예시:
- [D:\ProjectWS\scripts\manifests\parallel-default.json](D:/ProjectWS/scripts/manifests/parallel-default.json)
- [D:\ProjectWS\scripts\manifests\thread-a-current-106.json](D:/ProjectWS/scripts/manifests/thread-a-current-106.json)
- [D:\ProjectWS\scripts\manifests\thread-a-current-new100.json](D:/ProjectWS/scripts/manifests/thread-a-current-new100.json)
- [D:\ProjectWS\scripts\manifests\thread-a-remaining-72.json](D:/ProjectWS/scripts/manifests/thread-a-remaining-72.json)
- [D:\ProjectWS\scripts\manifests\thread-e-wave-ab-20.json](D:/ProjectWS/scripts/manifests/thread-e-wave-ab-20.json)

---

## 2. 생성기의 능력과 한계

### 2-1. 현재 생성기가 할 수 있는 것

현재 생성기는 아래까지는 실제로 수행 가능합니다.

- RuntimeCaseData 구조 생성
- evidence chain / `requires` / `requiredLieState` / `baseEvidenceIds` 보강
- ScriptedText 구조 생성
  - interrogation
  - evidence_present
  - dossier
  - witness
  - aftermath
  - system_message
- mediation 파일 생성
- validator 기반 형식/semantic 점검
- 병렬 배치 실행

즉, `구조 생성기 / 스캐폴드 생성기 / 검증 파이프라인`으로는 작동합니다.

### 2-2. 현재 생성기가 못 하는 것 / 본질적 한계

핵심 한계는 아래입니다.

1. `Session-fit 판단`을 못 합니다.
- story가 정말 spouse/friend/workplace에 맞는지 생성기가 판단하는 구조가 아닙니다.
- 이 판단은 생성기 바깥에서 선행되어야 합니다.

2. `실제 출시 품질의 대사`를 보장하지 못합니다.
- witness / evidence_present / aftermath / system_message가 여전히 scaffold 흔적이 강합니다.
- validator PASS가 실제 플레이 품질을 뜻하지 않습니다.

3. `Phase 0~2 품질`을 hard gate로 보장하지 못합니다.
- 현재 파이프라인의 공식 gate는 runtime/scripted/semantic/stage3 중심입니다.
- 실제 Phase 문장 품질은 별도로 검증하지 않으면 빠집니다.

4. `카테고리별 voice pack`이 약합니다.
- friend / neighbor / spouse / workplace의 정서가 generator 본체에서 충분히 분리되지 않습니다.

5. `SVG media`는 now-readable 수준까지는 갔지만, 실제 자산급 일러스트/실사 증거는 아닙니다.

### 2-3. 외부 대사 주입 가능성

이 항목이 가장 중요합니다.

#### 현재 가능한 경로

1. `override builder` 방식
- [D:\ProjectWS\src\data\headlineSpecs\<caseId>\scripted-builder.cjs](D:/ProjectWS/src/data/headlineSpecs)
- `compile({ root, caseId, outPath })`를 구현하면 생성기 대신 외부 작성 로직을 넣을 수 있습니다.
- 즉, Thread W가 고품질 대사를 생성해서 builder 안에서 직접 bundle을 써주는 방식은 가능합니다.

2. `legacy stage2 script` 방식
- [D:\ProjectWS\scripts\<caseId>-stage2-scripted-bootstrap.cjs](D:/ProjectWS/scripts)
- 케이스별 custom script로 외부 대사 생성/주입 가능

#### 현재 없는 것

아래는 **현재 깔끔하게 지원되지 않습니다.**

- “구조만 생성하고, 완성된 외부 ScriptedText JSON을 그대로 주입”하는 공용 모드
- “generator는 건너뛰고, 외부 대사 파일을 공식 입력으로 받는 모드”

즉, 현재는 외부 대사를 넣으려면:
- override builder를 새로 만들거나
- legacy stage2 script를 케이스마다 따로 만들어야 합니다.

#### 필요한 구조

Thread W 같은 별도 대사 작성 스레드를 붙이려면 아래 중 하나가 필요합니다.

1. `external_scripted_json` 입력 모드 추가
- `compile-scripted-bundle.cjs`가 외부 JSON을 읽어 검증만 수행하게

2. `structure_only + external_text_merge` 모드 추가
- generator가 key skeleton만 만들고
- 외부 대사 payload를 merge

3. `Phase1/2 external dialogue payload` 경로 추가
- 지금은 scripted보다 Phase 쪽이 더 취약한데, 외부 입력 공식 경로가 없습니다.

결론:
- `외부 대사 주입은 가능`하지만 `정식 지원되는 공용 입력 모드`는 아닙니다.
- Thread W 연동을 진지하게 하려면 이 부분을 새로 만들어야 합니다.

---

## 3. 현재 데이터 상태 기록

### 3-1. 활성 12건

현재 일반 모드 active manifest:
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)

현재 active 12는 아래입니다.

| caseId | session | scripted | phase1 | phase2 | mediation | semantic/stage3 | 비고 |
|---|---|:---:|:---:|:---:|:---:|:---:|---|
| family-05 | family | O | O | O | O | O | provisional active |
| family-09 | family | O | O | O | O | O | provisional active |
| friend-03 | friend | O | O | O | O | O | provisional active |
| neighbor-03 | neighbor | O | O | O | O | O | provisional active |
| neighbor-08 | neighbor | O | O | O | O | O | provisional active |
| partnership-04 | partnership | O | O | O | O | O | provisional active |
| partnership-09 | partnership | O | O | O | O | O | provisional active |
| spouse-05 | spouse | O | O | O | O | O | provisional active |
| spouse-11 | spouse | O | O | O | O | O | provisional active |
| tenant-02 | tenant_landlord | O | O | O | O | O | provisional active |
| tenant-09 | tenant_landlord | O | O | O | O | O | provisional active |
| workplace-12 | boss_employee | O | O | O | O | O | provisional active |

중요:
- 이 12건은 “구조 파일이 있다”는 뜻입니다.
- “최종 출시 품질이 확정되었다”는 뜻은 아닙니다.

### 3-2. active에서 제외된 4건

현재 제외:
- `friend-07`
- `headline-01`
- `spouse-12`
- `workplace-11`

상태는 모두 파일은 있습니다.

| caseId | scripted | phase1 | phase2 | mediation | semantic/stage3 | 제외 이유 |
|---|:---:|:---:|:---:|:---:|:---:|---|
| friend-07 | O | O | O | O | O | session보다 스캔들/선발 비리 프레임이 더 강함 |
| headline-01 | O | O | O | O | O | 관계 세션이 아니라 특집 lane 성격 |
| spouse-12 | O | O | O | O | O | rumor/forgery scandal 프레임이 spouse보다 강함 |
| workplace-11 | O | O | O | O | O | boss_employee보다 IP/유출 공모 프레임이 더 강함 |

참조:
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-active12-session-fit-audit-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-active12-session-fit-audit-2026-04-10.md)
- [D:\ProjectWS\tmp\session-reframe-backlog-4.json](D:/ProjectWS/tmp/session-reframe-backlog-4.json)

### 3-3. 신규 100건(+replacement 포함 현재 102건)

실제 generated 기준 `new` 계열은 현재 `102건`입니다.
- 100건 본편
- DROP 대체 2건 포함

현재 상태:
- generated: `102`
- scripted: `102`
- mediation: `102`
- phase1: `0`
- phase2: `0`

즉:
- 구조/스크립트/mediation은 있음
- Phase1/2는 아예 없음
- 따라서 일반 플레이용 release set으로 쓰면 안 됩니다.

근거:
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-current-new100-level4-report-2026-04-09.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-current-new100-level4-report-2026-04-09.md)
- [D:\ProjectWS\tmp\thread-a-current-new100-level4-summary.json](D:/ProjectWS/tmp/thread-a-current-new100-level4-summary.json)

### 3-4. 기존 84건

legacy 84 상태:
- generated: `84`
- scripted: `15`
- mediation: `15`
- phase1: `84`
- phase2: `84`

즉:
- 예전 단계에서 phase1/2는 전건 존재
- 그러나 scripted/mediation은 15건만 있음
- 품질 기준도 현재 release 기준과 다릅니다.

scripted/mediation이 있는 15건:
- `family-05`, `family-09`
- `friend-03`, `friend-07`
- `neighbor-03`, `neighbor-08`
- `partnership-04`, `partnership-09`
- `spouse-05`, `spouse-11`, `spouse-12`
- `tenant-02`, `tenant-09`
- `workplace-11`, `workplace-12`

중요:
- `spouse-01 ~ spouse-04`는 generated + phase1/2는 있으나, 지금 기준으로는 scripted/mediation/semantic/stage3가 없습니다.
- 따라서 “예전에 어느 시점엔 통과처럼 보였다”는 기억과 별개로, 현재 기준에서는 release basis가 아닙니다.

### 3-5. 조합 실험실 (Combination Lab)

현재 실제 데이터가 authoring된 케이스는 `headline-01` 1건뿐입니다.

- [D:\ProjectWS\src\data\cases\generated\headline-01.json](D:/ProjectWS/src/data/cases/generated/headline-01.json)
- node `25`
- output `12`
- recipe `12`

구현 상태:
- 타입 있음: [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)
- store slice 있음: [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)
- panel 있음: [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)
- 표시 위치: [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

현재 동작:
- caseData에 `combinationLab`가 있으면 UI 표시
- `runCombinationRecipe()`로 파생 노드/증거/쟁점/노트 해금

현재 한계:
- 전 사건 확장 안 됨
- UI는 Thread A가 최소 삽입만 한 상태
- Thread B와 충돌 위험이 있어 UI 주도권은 B가 가져가는 편이 맞음

---

## 4. 유실 위험 목록

### 4-1. 지금 건드리면 안 되는 파일

핵심 결합 파일:
- [D:\ProjectWS\scripts\lib\build-pilot-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/build-pilot-scripted-bundle.cjs)
- [D:\ProjectWS\scripts\lib\runtime-gameplay-enricher.cjs](D:/ProjectWS/scripts/lib/runtime-gameplay-enricher.cjs)
- [D:\ProjectWS\scripts\lib\release-phase-dialogue-builder.cjs](D:/ProjectWS/scripts/lib/release-phase-dialogue-builder.cjs)
- [D:\ProjectWS\scripts\lib\compile-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/compile-scripted-bundle.cjs)
- [D:\ProjectWS\scripts\lib\compile-runtime-case.cjs](D:/ProjectWS/scripts/lib/compile-runtime-case.cjs)
- [D:\ProjectWS\src\data\cases\caseLoader.ts](D:/ProjectWS/src/data/cases/caseLoader.ts)
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)

이 파일들은 각각 여러 단계와 연동됩니다.

### 4-2. 건드리면 깨지는 설정

1. `caseLoader.ts`
- `USE_REFINED_ONLY = true`
- `REFINED_SET`
- `SCRIPTED_SET`
- `EXCLUDED_CASE_KEYS`

이 로직이 깨지면:
- scripted 없는 케이스가 일반 모드에 섞일 수 있음
- excluded case가 다시 노출될 수 있음

2. manifest 계층
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)
- [D:\ProjectWS\scripts\manifests\*.json](D:/ProjectWS/scripts/manifests)

`refined`와 `batch manifest`는 역할이 다릅니다.
- `refined/manifest.json`: 일반 모드 노출 대상
- `scripts/manifests/*.json`: 생성/재생성 작업 대상

둘을 혼동하면 안 됩니다.

### 4-3. import chain / glob 주의

[D:\ProjectWS\src\data\cases\caseLoader.ts](D:/ProjectWS/src/data/cases/caseLoader.ts)는 Vite glob을 씁니다.

- `./generated/*.json`
- `../scriptedText/*.json`

따라서:
- 파일 추가/삭제와 manifest 변경이 로더 동작에 직접 영향
- glob path를 건드리면 일반 모드 로딩 전체가 흔들립니다

### 4-4. 현재 workaround

현재 많이 의존하는 workaround:
- release-ready gate를 별도 스크립트로 돌림
  - [D:\ProjectWS\scripts\validate-release-ready-manifest.cjs](D:/ProjectWS/scripts/validate-release-ready-manifest.cjs)
  - [D:\ProjectWS\scripts\validate-release-ready-scripted-quality.cjs](D:/ProjectWS/scripts/validate-release-ready-scripted-quality.cjs)
- 그러나 이 gate도 아직 실제 플레이 품질을 완전히 보장하지 못했습니다.

즉 workaround는 존재하지만, 이것도 재설계 대상입니다.

---

## 5. Thread A의 오케스트라 재편 제안

### 5-1. 문제의 근본 원인

Thread A가 너무 많은 역할을 동시에 맡았습니다.

- story/session mapping
- generator 설계
- scripted 생성
- phase 생성
- media 생성
- validator 설계
- release readiness 판단

이 구조에서는 `구조 PASS`가 곧 `출시 가능`처럼 보이는 false positive가 반복됩니다.

### 5-2. 권장 역할 재분배

#### Thread E
책임:
- story concept
- session fit 판단
- 재배치 / 재프레이밍 / 제거

원칙:
- `story-session fit`이 먼저 확정된 케이스만 생성기로 넘김

#### Thread A
책임:
- compiler/generator
- hard gate
- deterministic scaffolding
- regeneration / manifests / infra

원칙:
- Thread A는 story가 이 session에 맞는지를 최종 판단하지 않음

#### Thread C
책임:
- black-box QA
- actual play test
- release blocker 판정

원칙:
- validator PASS만 보지 말고
- first screen / Phase0 / Phase1 / Phase2 / evidence readability까지 직접 봄

#### Thread B
책임:
- UI
- evidence viewer readability
- combination lab UI

원칙:
- Thread A는 store/API 계약만 유지
- UI 주도권은 B가 가져감

### 5-3. 생성기 사용 방침

생성기를 “완성본 제조기”가 아니라 아래처럼 써야 합니다.

- 구조 생성기
- scaffold 생성기
- validator 보조기
- 재생성 도구

즉:
- generator output = 초안/구조
- release decision = 별도

### 5-4. 실제 추천 흐름

1. Thread E가 session-fit 확인
2. Thread A가 생성
3. Thread C가 black-box QA
4. Thread B가 표현/UI 보정
5. 통과한 것만 refined manifest에 올림

### 5-5. 결론

현재 문제는 “Thread A가 못해서”만은 아니고,  
`Thread A가 맡아서는 안 되는 역할까지 맡은 상태`에서 오케스트라가 무너진 것입니다.

따라서 재편의 핵심은:
- story 판단과 generation을 분리
- generation과 release 판정을 분리
- validator PASS와 실제 플레이 PASS를 분리

입니다.

---

## 부록: 핵심 참조 파일

### 파이프라인
- [D:\ProjectWS\scripts\generic-case-run-pipeline.cjs](D:/ProjectWS/scripts/generic-case-run-pipeline.cjs)
- [D:\ProjectWS\scripts\run-parallel-case-batch.cjs](D:/ProjectWS/scripts/run-parallel-case-batch.cjs)
- [D:\ProjectWS\scripts\lib\run-staged-pipeline.cjs](D:/ProjectWS/scripts/lib/run-staged-pipeline.cjs)

### 컴파일러 / 생성기
- [D:\ProjectWS\scripts\lib\compile-runtime-case.cjs](D:/ProjectWS/scripts/lib/compile-runtime-case.cjs)
- [D:\ProjectWS\scripts\lib\compile-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/compile-scripted-bundle.cjs)
- [D:\ProjectWS\scripts\lib\build-pilot-scripted-bundle.cjs](D:/ProjectWS/scripts/lib/build-pilot-scripted-bundle.cjs)
- [D:\ProjectWS\scripts\lib\runtime-gameplay-enricher.cjs](D:/ProjectWS/scripts/lib/runtime-gameplay-enricher.cjs)
- [D:\ProjectWS\scripts\lib\release-phase-dialogue-builder.cjs](D:/ProjectWS/scripts/lib/release-phase-dialogue-builder.cjs)

### 로더 / 설정
- [D:\ProjectWS\src\data\cases\caseLoader.ts](D:/ProjectWS/src/data/cases/caseLoader.ts)
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)

### 검증
- [D:\ProjectWS\scripts\validate-runtime-template-coverage.cjs](D:/ProjectWS/scripts/validate-runtime-template-coverage.cjs)
- [D:\ProjectWS\scripts\validate-scripted-template-coverage.cjs](D:/ProjectWS/scripts/validate-scripted-template-coverage.cjs)
- [D:\ProjectWS\scripts\validate-release-ready-manifest.cjs](D:/ProjectWS/scripts/validate-release-ready-manifest.cjs)
- [D:\ProjectWS\scripts\validate-release-ready-scripted-quality.cjs](D:/ProjectWS/scripts/validate-release-ready-scripted-quality.cjs)
- [D:\ProjectWS\tests\validate-scripted-text.cjs](D:/ProjectWS/tests/validate-scripted-text.cjs)

### 상태/리포트
- [D:\ProjectWS\docs\ref\scripted-text\message-to-ct-thread-a-crisis-report-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/message-to-ct-thread-a-crisis-report-2026-04-10.md)
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-salvage-status-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-salvage-status-2026-04-10.md)
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-active12-session-fit-audit-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-active12-session-fit-audit-2026-04-10.md)
