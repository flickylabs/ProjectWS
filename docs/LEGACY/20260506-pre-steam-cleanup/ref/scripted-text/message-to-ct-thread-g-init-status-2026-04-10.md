# Thread G → CT 상태 보고 (2026-04-10)

## 1. 초기 임무 수행 결과

### 1-1. `spouse-05` staged pipeline dry-run

- 실행 방식: 산출물 3종(`generated`, `mediation`, `scripted`)을 백업 후 파이프라인 실행, 즉시 원복
- 실행 스크립트: `node scripts/generic-case-run-pipeline.cjs --case spouse-05`
- 결과: **exit code 0**
- 로그: `tmp/thread-g-spouse-05-pipeline-dry-run-postpatch.log`

단계별 결과:

1. `stage1a` runtime generate: PASS
2. `stage1b` runtime template coverage: PASS
3. `stage1c` mediation generate: PASS
4. `stage2` scripted bootstrap generate: PASS
5. `stage2b` scripted template coverage: PASS
6. `stage2c` scripted semantic quality: PASS
7. `stage3` scripted validate: **blocking 없음, WARN 3건**

stage3 경고 내용:

- `tp-1|vague`: 증인 증언이 공통 메타 서술 골격에 치우침
- `tp-2|vague`: 증인 증언이 공통 메타 서술 골격에 치우침
- `tp-3|vague`: 증인 증언이 공통 메타 서술 골격에 치우침

중요:

- 현재 워크트리의 curated `src/data/scriptedText/spouse-05.json`는 standalone `validate-scripted-text` 기준 **clean PASS**
- 즉, **생성기 재산출물과 현재 curated 산출물 사이에 품질 드리프트가 존재**

### 1-2. validator 상태 점검

실행 결과:

- `node scripts/validate-runtime-template-coverage.cjs --case spouse-05` → PASS
- `node scripts/validate-scripted-template-coverage.cjs --case spouse-05` → PASS
- `node scripts/validate-scripted-semantic-quality.cjs --case spouse-05` → PASS
- `node tests/validate-scripted-text.cjs --case spouse-05` → PASS
- `node scripts/validate-release-ready-scripted-quality.cjs --case spouse-05` → flagged 0
- `node scripts/validate-release-ready-manifest.cjs` → 최종 **12 / 12 PASS**

주의:

- `validate-release-ready-manifest`는 `tmp/*-stage3-validate.txt`를 참조하므로, dry-run 중 생성한 stage3 로그가 현재 curated 파일 상태와 다르면 audit 결과가 흔들릴 수 있음
- 이번 점검에서는 현재 curated `spouse-05`로 stage3 로그를 다시 갱신한 뒤 manifest를 재검증해 PASS를 확인함

## 2. `external_scripted_json` 모드 설계 및 반영

반영 파일:

- `scripts/lib/compile-scripted-bundle.cjs`
- `scripts/case-stage2-scripted-bootstrap.cjs`

구현 원칙:

1. 기존 `override builder` 우선순위는 유지
2. 외부 입력은 명시 모드 또는 전용 경로로만 사용
3. 외부 JSON 모드에서는 생성기 후처리(`enrich/normalize/hotfix`)를 건너뛰고 **복사 + 검증만 수행**
4. 출력 경로는 기존과 동일하게 `src/data/scriptedText/{caseId}.json`

선택 규칙:

1. `--mode external_scripted_json`이 명시되면 외부 JSON 사용
2. `--external-input <path>`가 있으면 해당 파일 사용
3. 명시 모드가 아니더라도 `src/data/scriptedText/external/{caseId}.json`가 존재하면 auto 모드에서 외부 JSON 사용
4. 외부 JSON이 없으면 기존 경로(`override builder` → generic builder → legacy stage2) 유지

CLI 예시:

```bash
node scripts/case-stage2-scripted-bootstrap.cjs --case spouse-05 --mode external_scripted_json --external-input tmp/thread-g-external-input/spouse-05.json
```

## 3. 구현 검증

검증 결과:

- `compileScriptedBundle(..., outPath=tmp/thread-g-auto-spouse-05.json)` → `mode=generic_builder`
- `compileScriptedBundle(..., mode=external_scripted_json, externalInputPath=tmp/thread-g-external-input/spouse-05.json, outPath=tmp/thread-g-external-spouse-05.json)` → `mode=external_scripted_json`
- 외부 입력 파일과 출력 파일 SHA256 일치 확인
- stage2 CLI `--mode external_scripted_json --external-input ...` 실행 확인

## 4. CT 확인 필요 사항

- 생성기 재산출물의 `spouse-05` witness vague 3건 WARN은 그대로 남아 있음
- 현재 curated 파일은 PASS이므로, Thread W 연동 시 release 후보는 **external input 경로 기반**으로 운영하는 편이 안전
- dry-run이 release audit 로그를 덮어쓸 수 있으므로, Thread G 운영 규칙에 `stage3 로그 재동기화` 절차를 포함할지 결정 필요
