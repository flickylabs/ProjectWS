# QA-Q spouse-01 Codex Summary

- 대상: `src/data/scriptedText/spouse-01.json`
- 생성: 2026-04-26T01:28:53.599Z
- 총 채널: 18, entries: 560, variants: 4677
- 원본 수정: 없음

## 핵심 결과

- 위반/보정 권장 카테고리: 3
- 검토 후보 카테고리: 6
- 정합 통과 카테고리: 5
- 메인 적용 권장 patch 항목: 5

## 카테고리별 카운트

| 구분 | 항목 | 결과 |
| --- | --- | ---: |
| A | 약한 단어 "쪽" | 104 entries / 105 matches |
| A | 명사형 액션 | 20 entries / 20 matches |
| A | 정보/동기 차원 후보 | 77 |
| A | 번역체 9패턴 | 0 entries / 0 matches |
| A | 추상 표현 | 1 entries / 1 matches |
| A | 조사 오류 | 6 entries / 6 matches |
| B | "부인" 금지어 | 2 |
| B | 재판관 문체 | 0 |
| B | NPC callTerms issue/review | 0 |
| B | Truth Throttle | 0 |
| C | interrogation 키 누락/추가/중복 | 0 |
| C | evidence_present stage coverage 값 불일치 | 36 |
| C | 신규 4채널 payload mismatch | 0 |
| D | tag 차원 누락 variant | 3957 |
| D | channel tag mismatch | 192 |
| E | atom 누락(v2 기준) | 240 |
| E | atom 누락(v2+v3 기준) | 0 |
| E | evidence/dispute 누락 | 0 |
| F | 글자수 가이드 초과/미달 | 80 |
| G | headless 시뮬레이션 | not_found |

## Patch 권장 List

- P0 B61 부인 금지어: 2건. "부인" 문자열 제거. 지칭이면 "아내/배우자"로, 동사면 "부정/인정하지" 계열로 재작성 샘플: a-h-d3-S5-fact-pursuit-v5, b-h-d4-S4-fact-pursuit-v3
- P1 A11 명사형 액션: 20건. 조사 결합 명사형은 "X을/를 한 것" 형태로 의미 보존 재작성. 명사구 일부는 수동 검토 샘플: b-h-d3-S3-empathy-approach-v4, b-h-d4-S4-motive-search-v5, b-h-d4-S4-empathy-approach-v5, b-h-d4-S5-fact-pursuit-v1, a-e-4-late-stage1-v1, a-e-7-early-check_metadata-v6, dc-4-a-q2-late-v1, w-2-vague-v2, protective_resolution-v3, protective_resolution-v5
- P1 A1 약한 단어 쪽: 104건. "쪽"이 방향/관계축으로 꼭 필요한지 검토 후 구체 명사로 대체 샘플: a-d-1-S0-motive-search-v7, a-d-1-S1-motive-search-v7, a-d-1-S2-fact-pursuit-v10, a-d-1-S2-motive-search-v7, a-d-1-S2-motive-search-v10, a-d-1-S2-empathy-approach-v10, a-d-1-S3-motive-search-v7, a-d-1-S4-motive-search-v7, a-d-1-S5-fact-pursuit-v1, b-d-1-S3-motive-search-v5
- P1 C/D 키/태그 정합: 228건. 키 payload mismatch, channel tag mismatch, 필수 tag 차원 누락 보정
- P2 F 글자수 가이드: 80건. 짧은 NPC/system 문장 확장 또는 긴 재판관/NPC 문장 축약

## 주의

- `sourceRefs.atom`은 요청 기준인 v2 atom만 보면 v3 unlock atom이 누락으로 잡힙니다. v2+v3 통합 기준 누락은 별도 카운트로 분리했습니다.
- tag 차원 검사는 요청 목록을 전 채널에 엄격 적용했습니다. `questionType`, `rapport`, `contradict_token`은 채널 설계상 일부 누락이 의도일 수 있어 메인 검토가 필요합니다.
- `tests/run-84-headless.cjs`는 현재 워크스페이스에 없어 선택 항목 G는 실행하지 못했습니다.

Raw report: `tmp/QA-Q-spouse-01-codex-report.json`
