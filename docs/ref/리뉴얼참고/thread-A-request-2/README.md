# Thread A 추가 요청 1차 — 읽기 순서

## 요청 본문
- **`00-추가요청-1차.md`** — 요청 A(structure) + B(풀셋) + C(legacy 우회)

## 당신이 만든 스키마 (이번 요청의 기준)
| # | 파일 | 내용 |
|---|------|------|
| `schema-01` | `schema-01-beat-script-v2.ts` | BeatScript V2 스키마 |
| `schema-02` | `schema-02-dispute-v2.ts` | Dispute V2 스키마 (층위/링크/misconception) |
| `schema-03` | `schema-03-evidence-v2.ts` | Evidence V2 스키마 (intent/role/timing) |
| `schema-04` | `schema-04-beat-selector-v2.ts` | Beat Selector 엔진 설계 |
| `schema-05` | `schema-05-question-fatigue-v2.ts` | 피로도 엔진 설계 |

## spouse-01 실데이터 (데이터 생성의 소스)
| # | 파일 | 내용 | 크기 |
|---|------|------|------|
| `ref-01` | `ref-01-spouse01-case.json` | 사건 원본 (당사자/쟁점/증거/진실테이블) | 34KB |
| `ref-02` | `ref-02-spouse01-tells-beats.json` | Tell 6개 + BeatScript 36개 (톤 레퍼런스) | 23KB |
| `ref-03` | `ref-03-spouse01-v3-game-loop.json` | V3 데이터 (DossierCard/UnlockAtom/Event/TransitionBeat) | 60KB |
| `ref-04` | `ref-04-spouse01-v2-atoms.json` | V2 atom 155개 (**truthEnvelope 매핑용**, 큰 파일) | 197KB |

## 현재 엔진 코드 (확장/우회 대상)
| # | 파일 | 내용 |
|---|------|------|
| `ref-05` | `ref-05-questionEffectEngine.ts` | 3종 미터 — **legacy 감쇠 우회 대상** |
| `ref-06` | `ref-06-gameEventTriggerEngine.ts` | 4종 이벤트 — 끼어들기 참고 |
| `ref-07` | `ref-07-blueprintEngine.ts` | stance/defenseMode 매트릭스 |
| `ref-08` | `ref-08-useActionDispatch-excerpt.ts` | handleQuestion 핵심 발췌 + V2 통합 지점 주석 |

## 기타 참고
| # | 파일 | 내용 |
|---|------|------|
| `ref-09` | `ref-09-batch-template-v2.md` | V2 배치 템플릿 |
| `ref-10` | `ref-10-spouse01-beats-v2-sample.json` | 15개 샘플 (이걸 확장) |

## 기대 산출물 3개
1. `spouse-01-structure-v2.json` (+ .ts)
2. `spouse-01-beats-v2-full.json` (+ .ts)
3. `spouse-01-legacy-bypass-design.ts`
