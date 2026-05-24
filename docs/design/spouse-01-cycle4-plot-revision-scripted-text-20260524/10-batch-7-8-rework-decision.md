# 10. Batch 7 (mediation) + Batch 8 (aftermath) 처리 결정

**작성일**: 2026-05-24
**Batch 1~6 적용 완료** (HEAD `3ae6667d`)
**Batch 7 mediation 시안 도착** — ScriptedText 등록 X 결정. 보존만.

## 결정 요약

Batch 7/8 두 채널은 **dispute-agnostic** (모든 사건이 같은 entry 공유) 영역으로, h-d4 specific entry를 ScriptedText에 추가하는 작업이 채널 구조상 의미 없음. 본 CT 세션에서 ScriptedText 등록 X. **Cycle 4 narrative wrapper 세션 영역으로 보류**.

## 정밀 분석

### Batch 7 mediation

| 영역 | GPT 시안 형식 | 실제 채널 구조 |
|---|---|---|
| key | `mediation\|h-d4\|S4\|v1/v2` | `{path}\|{speaker}` (예: `immediate\|a`) |
| dispute 분기 | h-d4 specific | dispute-agnostic |
| 화자 | 재판관 | NPC (a 또는 b) |
| 시점 | h-d4 S4 단계 | mediation phase 6 (판결 후) |
| entry 수 | 2 (h-d4 전용) | 8 (모든 사건 공유) |

**ScriptedText runtime이 mediation entry를 dispatch하는 방식**:
- mediation phase 6 진입 시 사용자가 4 path (immediate/conditional/postpone/fact_first) 중 선택
- NPC가 본인 측 발화 (entry: `{path}\|{a|b}`)
- 모든 entry의 `sourceRefs`에 `dispute:d-1`, `dispute:d-2`, `dispute:h-d3`, `dispute:h-d4` 모두 포함되어 있음 (옛 h-d4 시점부터)

→ **h-d4 dispute가 발현되면 동일 8 entry가 그대로 dispatch**. h-d4 specific 신규 entry 영역 없음.

### Batch 8 aftermath (미수령, 동일 issue)

| 영역 | GPT 예상 형식 | 실제 채널 구조 |
|---|---|---|
| key | `aftermath\|h-d4\|S5\|v1/v2` | `{resultClass}` (예: `a_primary_fault`) |
| dispute 분기 | h-d4 specific | dispute-agnostic |
| 화자 | 재판관/narrator | narrator (3인칭) |
| entry 수 | 2 (h-d4 전용) | 5 (모든 사건 공유, 결과 분류별) |

→ 동일하게 ScriptedText 신규 entry 추가 X.

## GPT context drift 분석

본 의뢰서 첫 출력 시 의뢰서 1차 spec (`04-channel-entry-spec.md`)이 두 채널을 dispute-specific으로 잘못 정의. GPT가 그 spec 따라 작성. 또한 8 batch 분할 작성 시 후기 batch (7/8)에서 의뢰서 spec 인지 떨어짐 (context window 누적). 결과: 형식 mismatch 큰 시안.

근본 영역:
1. **의뢰서 1차 spec 부정확** — mediation/aftermath 실제 구조를 dispute-agnostic으로 명시 못함
2. **GPT context drift** — 후기 batch에서 의뢰서 참조 약화

## 본 CT 세션 처리

1. **의뢰서 04 spec 정밀화 완료** — 본 commit에 포함. 실제 채널 구조 명시 + dispute-agnostic 영역 표시
2. **Batch 7 시안 보존** — `result/spouse01_h-d4_batch7_mediation.json` 그대로 유지. 참고자료
3. **Batch 8 aftermath 작성 의뢰 X** — GPT가 작성해도 등록 영역 없음
4. **h-d4 dispute 발현 시 mediation/aftermath dispatch는 기존 entry로 자동 처리** — runtime에서 추가 영역 X

## Cycle 4 narrative wrapper 세션 결정 영역

다음 두 옵션 중 narrative cycle 세션에서 결정:

### 옵션 A: 기존 entry 그대로 사용 (권장)

h-d4 발현 시 기존 mediation 8 entry / aftermath 5 entry가 그대로 dispatch. 별도 작업 X. 자연스러운 영역.

### 옵션 B: h-d4 mediation 영역의 재판관 발화 신규 등록

신규 mediation/aftermath 채널 entry 형식 도입 (예: `mediation_dispute|{disputeId}|{stage}|v{N}`). 그러나 runtime 영역 추가 + 다른 사건 정합성 영향 고려 필요. 큰 작업.

→ 옵션 A 권장. Batch 7 시안 텍스트는 자료로 보존만.

## Batch 7 시안 자연성 (보존 가치)

GPT Batch 7 시안 텍스트는 자연성 매우 양호:

> 이 쟁점은 누가 더 상처받았는지를 가르는 문제가 아닙니다. 이준호 씨는 치료비를 혼자 준비하며 부부가 함께 결정할 일을 혼자 안았습니다. 박지연 씨는 난임 진단과 그 화제를 닫아 두면서 부부가 이야기할 자리를 좁혔습니다...

이 영역은 **emergence_narrative 채널** (Cycle 4 narrative wrapper 영역) 또는 **case.ts의 mediationLink polish**에 활용 가능. narrative wrapper 세션에서 참조.

## 다음 단계

본 CT 세션:
- Batch 7 시안 result 폴더에 보존 + 본 결정 문서 commit
- Batch 8 작성 의뢰 영역 외 (GPT에 추가 요청 안 함)
- CT 세션 종료 → Cycle 4 narrative wrapper 세션 진입 가능 조건 충족

Cycle 4 narrative wrapper 세션:
- mediation/aftermath 영역 옵션 A/B 결정
- Batch 7 시안 텍스트 emergence_narrative 또는 mediationLink로 활용 검토
