# CT 진행 보고: core6 테스트 수정 반영 완료 (2026-04-09)

## 1. 결론
- `ct-to-threadA-core6-test-fixes.md` 기준 실제 수정 필요 항목 2건을 공용 경로에 반영했습니다.
- 수정 완료 항목:
  - `partnership-09` scripted/runtime key 호환성
  - core6 6건 witness `relatedDisputeIds` 주입 및 depth gate 복구
- 문서의 `S5 concrete amount` 항목은 이번 라운드 수정 대상이 아니라, 이전 generator 수정으로 이미 해소된 상태였고 이번에도 PASS 유지 확인했습니다.

## 2. 반영 내용

### 2-1. case key 정규화 보강
- `partner-09` → `partnership-09`
- `work-11` → `workplace-11`
- 공용 정규화 경로:
  - [caseHelpers.ts](/d:/ProjectWS/src/utils/caseHelpers.ts)
  - [scriptedTextLoader.ts](/d:/ProjectWS/src/engine/scriptedTextLoader.ts)
  - [phaseScriptLoader.ts](/d:/ProjectWS/src/data/dialogues/phaseScriptLoader.ts)
  - [mediationScriptLoader.ts](/d:/ProjectWS/src/data/dialogues/mediationScriptLoader.ts)
  - [useGameStore.ts](/d:/ProjectWS/src/store/useGameStore.ts)
  - [phaseSlice.ts](/d:/ProjectWS/src/store/slices/phaseSlice.ts)
  - [blueprintPromptBuilder.ts](/d:/ProjectWS/src/engine/blueprintPromptBuilder.ts)
  - [llmDialogueResolver.ts](/d:/ProjectWS/src/engine/llmDialogueResolver.ts)

### 2-2. core6 runtime canonical caseId 적용
- core6 runtime redesign 단계에서 canonical `caseId`를 직접 쓰도록 수정했습니다.
  - 예: `case-partner-09` → `case-partnership-09`
- 수정 파일:
  - [core6-runtime-redesign.cjs](/d:/ProjectWS/scripts/lib/core6-runtime-redesign.cjs)

### 2-3. core6 witness `relatedDisputeIds` 주입
- 아래 6건에 witness별 `relatedDisputeIds`를 명시 매핑했습니다.
  - `workplace-11`
  - `partnership-09`
  - `neighbor-08`
  - `tenant-09`
  - `spouse-12`
  - `family-09`
- 결과적으로 [witnessEngine.ts](/d:/ProjectWS/src/engine/witnessEngine.ts)의 depth gate가 실제로 작동합니다.

### 2-4. runtime validator 강화
- core6 6건은 witness `relatedDisputeIds` 누락 시 runtime template 단계에서 바로 실패하도록 올렸습니다.
- 수정 파일:
  - [validate-runtime-template-coverage.cjs](/d:/ProjectWS/scripts/validate-runtime-template-coverage.cjs)

## 3. 재검증 결과

### 3-1. core6 generated runtime 확인
- 현재 generated runtime에서 canonical `caseId`와 witness `relatedDisputeIds`가 모두 반영돼 있습니다.
  - [workplace-11.json](/d:/ProjectWS/src/data/cases/generated/workplace-11.json)
  - [partnership-09.json](/d:/ProjectWS/src/data/cases/generated/partnership-09.json)
  - [neighbor-08.json](/d:/ProjectWS/src/data/cases/generated/neighbor-08.json)
  - [tenant-09.json](/d:/ProjectWS/src/data/cases/generated/tenant-09.json)
  - [spouse-12.json](/d:/ProjectWS/src/data/cases/generated/spouse-12.json)
  - [family-09.json](/d:/ProjectWS/src/data/cases/generated/family-09.json)

### 3-2. runtime/stage3/semantic
- runtime template:
  - [partnership-09-runtime-template-validate.txt](/d:/ProjectWS/tmp/partnership-09-runtime-template-validate.txt) → `summary={}` / `PASS`
- stage3:
  - [partnership-09-stage3-validate.txt](/d:/ProjectWS/tmp/partnership-09-stage3-validate.txt) → `summary={}` / `PASS`
  - [workplace-11-stage3-validate.txt](/d:/ProjectWS/tmp/workplace-11-stage3-validate.txt) → `summary={}` / `PASS`
  - [neighbor-08-stage3-validate.txt](/d:/ProjectWS/tmp/neighbor-08-stage3-validate.txt) → `summary={}` / `PASS`
  - [tenant-09-stage3-validate.txt](/d:/ProjectWS/tmp/tenant-09-stage3-validate.txt) → `summary={}` / `PASS`
  - [spouse-12-stage3-validate.txt](/d:/ProjectWS/tmp/spouse-12-stage3-validate.txt) → `summary={}` / `PASS`
  - [family-09-stage3-validate.txt](/d:/ProjectWS/tmp/family-09-stage3-validate.txt) → `summary={}` / `PASS`
- semantic:
  - [spouse-12-semantic-validate.txt](/d:/ProjectWS/tmp/spouse-12-semantic-validate.txt) → `summary={}` / `PASS`
  - core6 나머지 semantic 로그도 기존 PASS 유지

### 3-3. 병렬 배치
- 전체 지원 케이스 병렬 배치를 다시 돌렸고 완료 상태입니다.
  - [pipeline-batch-status.json](/d:/ProjectWS/tmp/pipeline-batch-status.json)

### 3-4. 빌드
- `npm run build:pc` 재통과 확인

## 4. CT 문서 항목별 상태
- 요청 1 `partnership-09 key mismatch`: 해결 완료
- 요청 2 `S5 concrete amount`: 이미 해결되어 있었고 PASS 유지
- 요청 3 `socialGraph witness relatedDisputeIds`: 해결 완료

## 5. 현재 판단
- core6 테스트 기준 blocking issue는 정리됐습니다.
- 이번 수정은 케이스별 임시 우회가 아니라 공용 정규화/runtime validator/generator 경로에 반영돼 회귀 가능성이 낮습니다.
