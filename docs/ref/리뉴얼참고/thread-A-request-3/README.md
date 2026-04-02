# Thread A 추가 요청 2차 — 읽기 순서

## 요청 본문
- **`00-추가요청-2차.md`** — 요청 D(끼어들기) + E(확률반응) + F(미터단계화) + G(Phase6 프롬프트)

## 1차 산출물 (이번 요청의 기반)
| # | 파일 | 내용 | 크기 |
|---|------|------|------|
| `prev-01` | `prev-01-spouse01-structure-v2.json` | Dispute 확장 + Evidence timing | 49KB |
| `prev-02` | `prev-02-spouse01-beats-v2-full.json` | BeatScript V2 풀셋 66개 | 111KB |
| `prev-03` | `prev-03-legacy-bypass-design.ts` | legacy 감쇠 우회 설계 | 16KB |

## 당신이 만든 스키마
| # | 파일 | 내용 |
|---|------|------|
| `schema-01~05` | beat/dispute/evidence/selector/fatigue | 1차에서 작성한 V2 스키마 5종 |

## 현재 엔진/UI 코드
| # | 파일 | 내용 | 요청 |
|---|------|------|------|
| `ref-05` | questionEffectEngine.ts | 3종 미터 | F |
| `ref-06` | gameEventTriggerEngine.ts | checkInterjection | D |
| `ref-07` | blueprintEngine.ts | stance 결정 | E |
| `ref-08` | useActionDispatch-excerpt.ts | 끼어들기 521~574줄 | D |
| `ref-11` | emotionEngine.ts | archetype별 감정/행동 | E |
| `ref-12` | QuestionMeterHUD-excerpt.tsx | 미터 UI | F |
| `ref-13` | readinessEngine.ts | readiness 점수 | F |

## 사건 데이터
| # | 파일 | 내용 |
|---|------|------|
| `ref-01` | spouse01-case.json | archetype/쟁점/증거 |

## 기대 산출물 4개
1. `interjection-v2-design.ts` — 끼어들기 강화 엔진
2. `npc-reaction-v2-design.ts` — NPC 확률 반응 엔진
3. `meter-staging-v2-design.ts` — 미터 단계화 + 사건카드 해금 + readiness 힌트
4. `phase6-result-prompt-v2-design.md` — Phase 6/Result 프롬프트 템플릿
