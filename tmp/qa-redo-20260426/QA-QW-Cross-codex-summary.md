# QA-QW Cross Codex Summary

- 대상: `src/data/scriptedText/{spouse,family,friend}-01.json`
- 총량: 14,931 variants / 1,776 cells
- 공식 Claude QW 입력: 확인됨 (patch-level cross-check 수행)
- fallback: tmp\QA-QW-spouse-01-findings.json, tmp\QA-QW-spouse-01-report.md

## 핵심 결론

- family-01 비율 alarm: **정합**. B 90→60 후보 46건, A 40/B 60 후보 34건, 반대 후보 0건.
- 깨진 조사/자동 치환 artifact: **0건**.
- S0~S2 Truth Throttle 직접 fact 후보: S0 21, S1 17, S2 14.
- judge_evidence_combo: deep 397 / shallow 23, 의미 정확도 94.5%.
- judge_witness_summon 실명 사용: 135/135 (100.0%).

## Trigram Top Channels

| channel | overlap >= 0.6 pairs | avg cell overlap |
| --- | ---: | ---: |
| interrogation | 216 | 0.082 |
| evidence_present | 178 | 0.071 |
| contradiction_pursuit | 161 | 0.078 |
| judge_question | 7 | 0.077 |
| trust_action | 3 | 0.089 |
| emotional_overload | 1 | 0.178 |

## 권장 우선순위

- P0: 0개 묶음
- P1: 3개 묶음
- P2: 1개 묶음

## 산출물

- Raw JSON: `tmp/qa-redo-20260426/QA-QW-Cross-codex-report.json`
- Audit script: `tmp/qa-redo-20260426/QA-QW-Cross-codex-audit.cjs`
