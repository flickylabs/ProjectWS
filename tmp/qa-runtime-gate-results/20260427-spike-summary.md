# 20260427 Script Runtime QA Gate Phase A Spike Summary

## 기술 방식
- runner: `scripts/qa-runtime-gate.cjs`
- mode: Node/CommonJS, ScriptedText/caseData/disclosurePolicy/emergenceHooks read-only runtime facsimile
- actual OpenAI 호출 없음, browser full playthrough 없음, runtime source mutation 없음
- 기본 실행은 결과 생성용 exit 0, `--fail-on-hard` 사용 시 P0 발견을 CI hard fail로 승격 가능

## 실행 범위
- routes: 3
- actions: 10
- hard findings: 3
- candidates: 0

## 검출 영역 1차 검증
- 응답 누락: 1건. `evidence_investigate`가 system-only 결과를 만들고 NPC 응답/safe fallback이 없어 P0로 잡힘.
- Q-A 불일치: 0건. 이번 3-route spike에서는 후보 없음.
- 스포일러: 2건. `e-4` early evidence_present가 S0/S1 표면 단계에서 truth lexeme을 노출함.
- fallback/표면 품질: 0건. unmapped free question은 chat fallback-only로 통과, discovery_event는 runtime fallback path로 보정됨.

## P0 Findings
- QARG-0001 [truth_lexeme_early_exposure] Forbidden truth lexeme exposed in evidence_present.
  source: src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-4|early|self].variants[id=b-e-4-early-self-v1]
  actual: matched=형; text=형한테 온 문자 맞습니다.
- QARG-0002 [truth_lexeme_early_exposure] Forbidden truth lexeme exposed in evidence_present.
  source: src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-4|early|self].variants[id=b-e-4-early-self-v1]
  actual: matched=형; text=형한테 온 문자 맞습니다.
- QARG-0003 [response_missing] evidence_investigate produced no NPC response and no explicit safe fallback.
  source: src/data/cases/generated/spouse-01.json:evidence.e-1.investigationResults.request_original
  actual: 1 visible outputs; speakers=system

## Candidate Findings
- none

## 산출물
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/action-by-action-trace.json`
- `tmp/qa-runtime-gate-results/route-transcripts/`
- `tmp/qa-runtime-gate-results/resolver-path-summary.md`
- `tmp/qa-runtime-gate-results/source-path-summary.md`

## 한계
- Phase A spike는 3개 route의 lightweight facsimile이며 browser store 전체 playthrough가 아님.
- scriptedTextLoader의 Vite glob을 직접 import하지 않고 JSON source를 읽어 resolver/source path를 재구성함.
- 실제 patch는 하지 않았고, findings는 root cause/source path 입력으로만 남김.

## 다음 단계
- spouse-01 Phase B에서는 fact_pursuit 반복, e-4/e-5 unlock, dossier card, hidden dispute emergence, witness/dossier action까지 manifest를 확장.
- family-01/friend-01 확장은 CT/user 결정 후 동일 manifest/runner 구조로 추가.