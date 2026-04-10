# CT 진행 보고 (2026-04-09)

## 1. 요약
- 공용 staged generator는 현재 `runtime -> runtime-template -> phase/mediation -> scripted -> scripted-template -> scripted-semantic -> scripted-validate` 흐름으로 정리되어 있습니다.
- 지원 5건은 병렬 재생성이 가능하고, 전부 `runtime template PASS / scripted template PASS / scripted validate PASS` 재현이 됩니다.
- semantic quality 단계도 추가되어 현재는 `PASS 여부`와 별개로 의미 수준 경고를 별도 집계합니다.
- PC 빌드는 현재 통과합니다.

## 2. 현재 generator-pass 케이스
- `headline-01`
  - runtime: `src/data/cases/generated/headline-01.json`
  - scripted: `src/data/scriptedText/headline-01.json`
  - runtime template: `tmp/headline-01-runtime-template-validate.txt` -> `summary={}` / `PASS`
  - scripted template: `tmp/headline-01-scripted-template-validate.txt` -> `summary={}` / `PASS`
  - semantic: `tmp/headline-01-semantic-validate.txt` -> `summary={"WARN":200}` / `PASS`
  - scripted validate: `tmp/headline-01-stage3-validate.txt` -> `summary={}` / `PASS`
- `headline-02`
  - runtime: `src/data/cases/generated/headline-02.json`
  - scripted: `src/data/scriptedText/headline-02.json`
  - runtime template: `tmp/headline-02-runtime-template-validate.txt` -> `summary={}` / `PASS`
  - scripted template: `tmp/headline-02-scripted-template-validate.txt` -> `summary={}` / `PASS`
  - semantic: `tmp/headline-02-semantic-validate.txt` -> `summary={"WARN":109}` / `PASS`
  - scripted validate: `tmp/headline-02-stage3-validate.txt` -> `summary={}` / `PASS`
- `spouse-11`
  - runtime: `src/data/cases/generated/spouse-11.json`
  - scripted: `src/data/scriptedText/spouse-11.json`
  - runtime template: `tmp/spouse-11-runtime-template-validate.txt` -> `summary={}` / `PASS`
  - scripted template: `tmp/spouse-11-scripted-template-validate.txt` -> `summary={}` / `PASS`
  - semantic: `tmp/spouse-11-semantic-validate.txt` -> `summary={"WARN":107}` / `PASS`
  - scripted validate: `tmp/spouse-11-stage3-validate.txt` -> `summary={}` / `PASS`
- `friend-03`
  - runtime: `src/data/cases/generated/friend-03.json`
  - scripted: `src/data/scriptedText/friend-03.json`
  - runtime template: `tmp/friend-03-runtime-template-validate.txt` -> `summary={}` / `PASS`
  - scripted template: `tmp/friend-03-scripted-template-validate.txt` -> `summary={}` / `PASS`
  - semantic: `tmp/friend-03-semantic-validate.txt` -> `summary={"WARN":160}` / `PASS`
  - scripted validate: `tmp/friend-03-stage3-validate.txt` -> `summary={}` / `PASS`
- `tenant-02`
  - runtime: `src/data/cases/generated/tenant-02.json`
  - scripted: `src/data/scriptedText/tenant-02.json`
  - runtime template: `tmp/tenant-02-runtime-template-validate.txt` -> `summary={}` / `PASS`
  - scripted template: `tmp/tenant-02-scripted-template-validate.txt` -> `summary={}` / `PASS`
  - semantic: `tmp/tenant-02-semantic-validate.txt` -> `summary={"WARN":160}` / `PASS`
  - scripted validate: `tmp/tenant-02-stage3-validate.txt` -> `summary={}` / `PASS`

## 3. 이번 라운드에서 반영된 핵심 변경
- compile 단계 강제 gate
  - `scripts/lib/compile-runtime-case.cjs`
  - `scripts/lib/compile-scripted-bundle.cjs`
- runtime gameplay/template enrichment
  - `scripts/lib/runtime-gameplay-enricher.cjs`
  - 기본 반영 대상: `baseEvidenceIds`, `requires`, `requiredLieState`, `evidenceCombinations`, `hard_evidence`, `meta`, `viewerData`, `investigationStages`, `partyContext`
- scripted metadata enrichment 강화
  - `scripts/lib/scripted-metadata-enricher.cjs`
  - 추가 메타: `judgeAddress`, `judgeAddressState`, `counterpartyRef`, `counterpartyRefState`
- scripted template coverage 강화
  - `scripts/validate-scripted-template-coverage.cjs`
- semantic quality validator 추가
  - `scripts/validate-scripted-semantic-quality.cjs`
  - `scripts/lib/scripted-semantic-rules.cjs`
- runner 단계 확장
  - 지원 5건 runner에 `stage2c scripted_semantic_validate` 추가
- 공용 non-headline builder의 judge-facing address 일관성 보정
  - `scripts/lib/build-pilot-scripted-bundle.cjs`

## 4. 병렬 실행 상태
- 병렬 배치 러너: `scripts/run-parallel-case-batch.cjs`
- 최신 배치 상태: `tmp/pipeline-batch-status.json`
- 현재 배치 상태: `completed`
- 배치 포함 케이스: `headline-01`, `headline-02`, `spouse-11`, `friend-03`, `tenant-02`
- per-case 상태 파일: `tmp/pipeline-status/*.json`
- per-case stdout/stderr: `tmp/pipeline-runs/*.log`

## 5. 지금 가능한 것
- 지원 5건은 공용 staged generator 경로로 끝까지 재생성 가능
- 병렬 배치 재실행 가능
- headline 계열과 일부 84-case pilot 계열의 `PASS` 재현 가능
- `npm run build:pc` 통과

## 6. 아직 남은 문제
- semantic warning이 아직 높습니다.
  - 특히 `headline-01`, `friend-03`, `tenant-02`
- 현재 semantic 단계는 의미 수준 경고를 잡아내는 상태이고, 경고를 생성기 쪽에서 충분히 줄이려면 custom builder 조정이 더 필요합니다.
- scripted runtime selector는 아직 adjacent-turn context를 거의 쓰지 않습니다.
  - structural metadata는 들어가 있지만, 실제 선택 로직은 문맥을 깊게 반영하지 않습니다.

## 7. 다음 우선순위
1. `headline-01`, `headline-02`, `spouse-11` custom builder에서 semantic warning 감소
2. `src/engine/scriptedTextLoader.ts`를 context-aware 선택기로 강화
3. semantic warning이 충분히 낮아진 뒤에만 다음 케이스 확장

## 8. CT 확인 포인트
- 전역 상태: `tmp/codex-progress-status.json`
- 사람용 상태: `tmp/codex-progress-status.md`
- 배치 상태: `tmp/pipeline-batch-status.json`
- 대표 로그:
  - `tmp/headline-01-semantic-validate.txt`
  - `tmp/headline-02-semantic-validate.txt`
  - `tmp/spouse-11-semantic-validate.txt`
  - `tmp/friend-03-semantic-validate.txt`
  - `tmp/tenant-02-semantic-validate.txt`

## 9. 해석 주의
- 현재 `PASS`는 구조/템플릿/기존 scripted validator 기준 통과를 의미합니다.
- semantic validator는 아직 `강한 FAIL gate`보다 `의미 수준 경고 가시화`에 가깝습니다.
- 따라서 현 단계는 `generator 구조 완성 + reproducible batch + semantic warning surfaced`로 보는 것이 정확합니다.
