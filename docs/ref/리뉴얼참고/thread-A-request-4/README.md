# Thread A 추가 요청 3차 — 읽기 순서

## 요청 본문
- **`00-추가요청-3차.md`** — 요청 A(family-01 V2 데이터) + B(structuredLog 수집기) + C(spouse-01 atom ID 매핑)

## 스키마 (네이밍 기준)
| # | 파일 |
|---|------|
| `schema-01` | `schema-01-beat-script-v2.ts` |
| `schema-02` | `schema-02-dispute-v2.ts` |

## 2차 산출물 (Phase 6 프롬프트)
| # | 파일 |
|---|------|
| `prev-04` | `prev-04-phase6-result-prompt-v2-design.md` |

## family-01 실데이터 (요청 A)
| # | 파일 | 크기 |
|---|------|------|
| `ref-01` | family-01 사건 원본 | 31KB |
| `ref-02` | family-01 Tell + Beat | 25KB |
| `ref-03` | family-01 V3 데이터 | 71KB |
| `ref-04` | family-01 V2 atom (큰 파일) | 202KB |

## spouse-01 매핑용 (요청 C)
| # | 파일 | 크기 |
|---|------|------|
| `ref-05` | spouse-01 V2 atom (검색 대상) | 197KB |
| `ref-06` | spouse-01 beat 66개 (매핑 대상) | 111KB |
| `ref-07` | spouse-01 structure (proposed atoms 참고) | 49KB |

## 통합 지점 (요청 B)
| # | 파일 |
|---|------|
| `ref-08` | useActionDispatch 발췌 |

## 구조 레퍼런스 (요청 A)
| # | 파일 |
|---|------|
| `ref-10` | spouse-01 beat 풀셋 (밀도/구조 참고) |

## 기대 산출물 5개
1. `family-01-structure-v2.json` (+ .ts)
2. `family-01-beats-v2-full.json` (+ .ts)
3. `phase3-log-collector-design.ts`
4. `spouse-01-beats-v2-full-mapped.json`
5. `spouse-01-atom-mapping-summary.md`
