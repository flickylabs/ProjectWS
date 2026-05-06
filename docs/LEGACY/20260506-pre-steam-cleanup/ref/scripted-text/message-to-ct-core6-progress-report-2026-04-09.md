# CT 진행 보고: core 6 변환 + semantic/selection 보강 (2026-04-09)

## 1. 결론
- `ct-to-threadA-core6-handoff.md` 기준 core 6 변환이 완료되었습니다.
- 대상 6건:
  - overwrite 3건: `workplace-11`, `partnership-09`, `neighbor-08`
  - 신규 3건: `tenant-09`, `spouse-12`, `family-09`
- 6건 모두 동일 staged pipeline 경로에서 `runtime template PASS / scripted template PASS / scripted semantic PASS / stage3 PASS` 재현됩니다.
- `#1 semantic warning 감소`는 core 6 기준 완료되었습니다.
- `#2 variant selection`은 `src/engine/scriptedTextLoader.ts`에 최근 3개 맥락 기반 반복 억제 로직을 추가해 보강했습니다.

## 2. 이번 라운드 핵심 변경

### 2-1. core 6 runtime 재설계 반영
- 공용 재설계 적용기 추가:
  - `scripts/lib/core6-runtime-redesign.cjs`
- pilot runtime builders 추가:
  - `scripts/build-pilot-workplace-11-runtime.cjs`
  - `scripts/build-pilot-partnership-09-runtime.cjs`
  - `scripts/build-pilot-neighbor-08-runtime.cjs`
  - `scripts/build-pilot-tenant-09-runtime.cjs`
  - `scripts/build-pilot-spouse-12-runtime.cjs`
  - `scripts/build-pilot-family-09-runtime.cjs`
- 신규 run-pipeline 추가:
  - `scripts/tenant-09-run-pipeline.cjs`
  - `scripts/spouse-12-run-pipeline.cjs`
  - `scripts/family-09-run-pipeline.cjs`

### 2-2. scripted generator 보강
- generic pilot scripted builder 보강:
  - `scripts/lib/build-pilot-scripted-bundle.cjs`
- 반영 내용:
  - S5 금전 분쟁 금액 추출 규칙 확대
  - `monetaryDisputeIds`가 지정된 쟁점에만 금액 문장 삽입
  - witness `합니다체`/재판관 호칭 안정화
  - interrogation의 `S1/S3/S5` contour 강제
    - `S1`: 유보/범위 구분
    - `S3`: 상대 책임 언급
    - `S5`: 인정/수긍

### 2-3. variant selection 보강
- 런타임 선택 로직 보강:
  - `src/engine/scriptedTextLoader.ts`
- 반영 내용:
  - 최근 3개 선택 이력 기준으로 `emotion`, `continuity`, `reveal` 반복 패널티 추가
  - 같은 dispute/evidence/witness lane에서 같은 연속성 태그 반복을 더 강하게 회피

## 3. 검증 결과

### 3-1. core 6 stage3 validate
- `tmp/workplace-11-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/partnership-09-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/neighbor-08-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-09-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-12-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/family-09-stage3-validate.txt` -> `summary={}` / `PASS`

### 3-2. core 6 semantic validate
- `tmp/workplace-11-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/partnership-09-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/neighbor-08-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-09-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-12-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/family-09-semantic-validate.txt` -> `summary={}` / `PASS`

### 3-3. 배치 재현
- 실행:
  - `node scripts/run-parallel-case-batch.cjs --cases workplace-11,partnership-09,neighbor-08,tenant-09,spouse-12,family-09`
- 결과:
  - `tmp/pipeline-batch-status.json` -> `completed`

### 3-4. 빌드
- `npm run build:pc` 통과

## 4. 현재 판단
- core 6는 이제 `thread E 상세 기획서 반영 완료 + staged pipeline 재현 가능` 상태입니다.
- 이번 라운드 기준으로는 core 6에서 semantic 경고를 더 이상 남기지 않는 상태까지 정리했습니다.
- 생성기 완전 완료라고 말할 수 있는 범위는 아직 제한적이지만, 적어도 core 6는 `runtime/scripted/semantic/stage3`까지 안정적으로 닫혔습니다.

## 5. 남은 범위
- 이번 완료 범위는 core 6와 그에 필요한 generic scripted builder / runtime redesign / selection 보강입니다.
- headline 계열과 기존 다른 pilot 전체를 동일한 semantic 0경고 기준으로 다시 끌어올리는 작업은 남아 있습니다.
- 84종 확장 자체는 별도 thread E/E 후속 범위로 유지합니다.

## 6. CT 확인 포인트
- batch 상태:
  - `tmp/pipeline-batch-status.json`
- 전역 상태:
  - `tmp/codex-progress-status.json`
- core 6 validate:
  - `tmp/workplace-11-stage3-validate.txt`
  - `tmp/partnership-09-stage3-validate.txt`
  - `tmp/neighbor-08-stage3-validate.txt`
  - `tmp/tenant-09-stage3-validate.txt`
  - `tmp/spouse-12-stage3-validate.txt`
  - `tmp/family-09-stage3-validate.txt`
- core 6 semantic:
  - `tmp/workplace-11-semantic-validate.txt`
  - `tmp/partnership-09-semantic-validate.txt`
  - `tmp/neighbor-08-semantic-validate.txt`
  - `tmp/tenant-09-semantic-validate.txt`
  - `tmp/spouse-12-semantic-validate.txt`
  - `tmp/family-09-semantic-validate.txt`
