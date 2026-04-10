# CT → 스레드 A: 파이프라인 검증 결과 피드백

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-08

---

## 검증 항목

headline-01, headline-02 파이프라인을 CT에서 직접 재실행하여 검증했습니다.

## 결과

### headline-01: `headline-01-run-pipeline.cjs` — PASS

```
[headline-01] wrote headline-01-v3-game-loop-data.json
[headline-01] wrote headline-01-v3-game-loop-data.ts
[headline-01] wrote headline-01.json (scriptedText)
[headline-01] enriched runtime evidence viewer data
[headline-01] refined scriptedText
[headline-01] diversified interrogation variants
[headline-01] diversified evidence_present variants
[headline-01] wrote headline-01-stage3-validate.txt
→ summary={}, PASS
```

문제 없음. 전 단계 정상 완주.

### headline-02: `headline-02-run-pipeline.cjs` — 첫 실행 FAIL, 수정 후 PASS

**첫 실행 시 에러:**
```
Error: Cannot find module 'D:\ProjectWS\scripts\headline-02-stage3-validate.cjs'
```

**원인:** `headline-02-stage3-validate.cjs` 파일이 존재하지 않음. stage1a~stage2까지는 성공했으나 stage3에서 파이프라인이 중단됨.

**CT 조치:** `headline-01-stage3-validate.cjs`와 동일한 패턴으로 생성:
```javascript
#!/usr/bin/env node
const path = require('path')
const { runScriptedValidate } = require('./lib/run-scripted-validate.cjs')
runScriptedValidate({
  root: path.join(__dirname, '..'),
  caseId: 'headline-02',
  logPath: path.join(__dirname, '..', 'tmp', 'headline-02-stage3-validate.txt'),
})
```

**수정 후 재실행:** 전 단계 정상 완주, `summary={}, PASS`.

### 독립 validator 교차 확인

파이프라인 외에 `tests/validate-scripted-text.cjs`로도 별도 검증:
- `--case headline-01`: PASS
- `--case headline-02`: PASS

재생성된 산출물의 채널 구조/coverage도 기존과 동일 확인.

---

## 요청 사항

### 1. stage3 validate 스크립트 자동 생성 (필수)

현재 `headline-02-run-pipeline.cjs`가 참조하는 `headline-02-stage3-validate.cjs`가 누락되어 있었습니다. 파이프라인이 중간에 끊기므로 **공용 helper 분리 시 validate 스크립트를 자동 생성하거나, run-pipeline 내에서 inline 실행하도록** 개선해 주세요.

패턴이 모든 케이스에서 동일합니다:
```javascript
runScriptedValidate({ root, caseId: '{caseId}', logPath: 'tmp/{caseId}-stage3-validate.txt' })
```

이걸 `run-staged-pipeline.cjs`에서 직접 처리하면 별도 파일이 필요 없습니다.

### 2. 다음 케이스 파이프라인 적용 시 체크리스트

공용화 작업 시 아래 항목이 충족되는지 확인 부탁합니다:
- [ ] `run-pipeline.cjs` 단독 실행으로 stage1a → validate까지 완주 가능
- [ ] 중간 단계 실패 시 `codex-progress-status.json`에 `blocked` + `blockingIssues` 기록됨
- [ ] validate 단계에서 FAIL/CRITICAL 발생 시 파이프라인이 non-zero exit로 종료됨
- [ ] 모든 참조 스크립트 파일이 존재함 (MODULE_NOT_FOUND 없음)

---

## 전체 판정

| 항목 | 판정 |
|------|------|
| 생성기 코어 로직 | **정상** — stage별 산출물 품질 양호 |
| 파이프라인 오케스트레이션 | **경미한 결함** — validate 스크립트 누락 1건 |
| 산출물 재현성 | **확인** — 재실행 시 동일 구조/PASS |

생성기 자체는 신뢰할 수 있는 상태입니다. 공용화 작업 진행해 주세요.
