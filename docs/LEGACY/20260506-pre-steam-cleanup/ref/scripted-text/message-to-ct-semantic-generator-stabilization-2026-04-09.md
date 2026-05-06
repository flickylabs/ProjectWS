# CT 진행 보고: semantic 안정화 + 지원 11건 batch 재현 완료 (2026-04-09)

## 1. 결론
- 이번 라운드에서 generator의 semantic 품질층을 추가 보강했고, 현재 지원 케이스 11건이 동일 staged pipeline 경로에서 `runtime template PASS / scripted template PASS / semantic PASS / stage3 PASS`로 재현됩니다.
- 기존에 semantic warning이 남아 있던 `headline-01`, `headline-02`, `spouse-11`, `friend-03`, `tenant-02`도 모두 `semantic summary={}` 상태로 내려왔습니다.
- 전체 병렬 배치도 다시 완료 상태입니다.
  - `tmp/pipeline-batch-status.json` -> `completed`

## 2. 이번 라운드 핵심 수정

### 2-1. non-generic semantic normalizer 보강
- 수정 파일:
  - `scripts/lib/scripted-semantic-normalizer.cjs`
- 반영 내용:
  - non-generic/custom builder 경로에서도 문장 수를 늘리지 않는 안전한 contour 보정 추가
  - `S0/S1`: 범위/책임 구분을 암시하는 hedge contour 강제
  - `S3`: 상대 조치 책임을 드러내는 blame contour 강제
  - `S5`: 인정/수긍 contour 강제
- 목적:
  - stage3 문장 수 규칙을 깨지 않으면서 semantic warning을 직접 줄이기 위한 조치

### 2-2. headline-01 evidence_present 해석성 보강
- 수정 파일:
  - `tmp/diversify-headline01-evidence-pass4.cjs`
- 반영 내용:
  - `headline-01`의 `e-1` 일부 evidence_present 변형이 증거 문구를 그대로 답습하던 문제를 해석형 문장으로 재작성
- 결과:
  - `headline-01` semantic `WARN 5 -> 0`

### 2-3. 금전 쟁점 판정 안정화
- 수정 파일:
  - `scripts/lib/runtime-gameplay-enricher.cjs`
- 반영 내용:
  - 금전 쟁점 판정에 사용되는 금액 정규식 경로를 안전한 `SAFE_AMOUNT_RE`로 분리
  - dispute 단위 금액 판정이 케이스 전체 숫자나 비금전 숫자(예: 일수)에 끌려가지 않도록 보정
- 결과:
  - `partnership-09`, `tenant-09`의 false-positive monetary dispute 판정 해소
  - 두 케이스 stage3 `B4` 실패 복구

## 3. 현재 재현 범위

### 3-1. headline 계열
- `headline-01`
- `headline-02`

### 3-2. 기존/파일럿 계열
- `spouse-11`
- `friend-03`
- `tenant-02`

### 3-3. core 6 계열
- `workplace-11`
- `partnership-09`
- `neighbor-08`
- `tenant-09`
- `spouse-12`
- `family-09`

총 11건이 현재 지원 범위입니다.

## 4. 검증 결과

### 4-1. semantic PASS
- `tmp/headline-01-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/headline-02-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-11-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/friend-03-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-02-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/workplace-11-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/partnership-09-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/neighbor-08-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-09-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-12-semantic-validate.txt` -> `summary={}` / `PASS`
- `tmp/family-09-semantic-validate.txt` -> `summary={}` / `PASS`

### 4-2. stage3 PASS
- `tmp/headline-01-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/headline-02-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-11-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/friend-03-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-02-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/workplace-11-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/partnership-09-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/neighbor-08-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/tenant-09-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/spouse-12-stage3-validate.txt` -> `summary={}` / `PASS`
- `tmp/family-09-stage3-validate.txt` -> `summary={}` / `PASS`

### 4-3. 병렬 배치
- 실행:
  - `node scripts/run-parallel-case-batch.cjs`
- 결과:
  - `tmp/pipeline-batch-status.json` -> `completed`
  - 완료 케이스:
    - `headline-01`
    - `headline-02`
    - `spouse-11`
    - `family-09`
    - `friend-03`
    - `neighbor-08`
    - `partnership-09`
    - `spouse-12`
    - `tenant-02`
    - `tenant-09`
    - `workplace-11`

### 4-4. 빌드
- `npm run build:pc` 통과

## 5. 현재 판단
- generator는 이제 “지원 11건에 대해 semantic까지 포함한 재현 가능한 상태”입니다.
- 이번 결과로 확인된 것은 다음 두 가지입니다.
  - semantic warning이 많이 나오더라도, generator 수정만으로 0까지 내릴 수 있다.
  - 그 수정이 특정 케이스 땜질이 아니라 공용 경로에 들어가면, 지원 전반으로 확산시킬 수 있다.

## 6. 아직 남은 일
- 아직 generator 완성이라고 부를 단계는 아닙니다.
- 남은 주요 과제:
  - legacy `spouse-01~04` 계열을 공용 generator 경로로 이관
  - 현재 지원 11건 밖의 케이스로 공용 semantic 품질층 확대
  - `free question`, 일부 `contradiction`의 LLM 의존 축소

## 7. CT 확인 파일
- 상태:
  - `tmp/pipeline-batch-status.json`
  - `tmp/codex-progress-status.json`
- semantic:
  - `tmp/headline-01-semantic-validate.txt`
  - `tmp/headline-02-semantic-validate.txt`
  - `tmp/spouse-11-semantic-validate.txt`
  - `tmp/friend-03-semantic-validate.txt`
  - `tmp/tenant-02-semantic-validate.txt`
  - `tmp/workplace-11-semantic-validate.txt`
  - `tmp/partnership-09-semantic-validate.txt`
  - `tmp/neighbor-08-semantic-validate.txt`
  - `tmp/tenant-09-semantic-validate.txt`
  - `tmp/spouse-12-semantic-validate.txt`
  - `tmp/family-09-semantic-validate.txt`
- stage3:
  - `tmp/headline-01-stage3-validate.txt`
  - `tmp/headline-02-stage3-validate.txt`
  - `tmp/spouse-11-stage3-validate.txt`
  - `tmp/friend-03-stage3-validate.txt`
  - `tmp/tenant-02-stage3-validate.txt`
  - `tmp/workplace-11-stage3-validate.txt`
  - `tmp/partnership-09-stage3-validate.txt`
  - `tmp/neighbor-08-stage3-validate.txt`
  - `tmp/tenant-09-stage3-validate.txt`
  - `tmp/spouse-12-stage3-validate.txt`
  - `tmp/family-09-stage3-validate.txt`
