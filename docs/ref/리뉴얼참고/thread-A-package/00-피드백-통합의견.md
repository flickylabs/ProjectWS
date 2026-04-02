# GPT Thread A 피드백 — 통합 의견 + 확정 방향 + 구현 착수 요청

## 상황 설명

동일한 논의 문서를 **두 개의 GPT 스레드(A/B)**에 전달했습니다.
양쪽 답변을 모두 받은 뒤 비교 분석한 결과, **A스레드(당신)의 분석이 더 구조적이고 실행 가능성이 높다**고 판단했습니다.

아래에서:
- 당신의 의견 중 **확정 채택하는 부분**
- B스레드에서 **추가로 가져오는 포인트**
- **수정/보완이 필요한 부분**
- **다음 단계 요청**

을 정리합니다.

---

## 1. 확정 채택 (A스레드 의견 그대로)

### 1-1. Phase 3 LLM 제거 = 확정
Phase 3 스크립트 전환은 "품질 하향이 아니라 품질 회복"이라는 진단에 완전 동의합니다.

### 1-2. ×5 균등 반대 → 가변 밀도 = 확정
- 핫 노드: 6~8 변형
- 중간 노드: 4~5 변형
- 콜드 노드: 2~3 변형
- TransitionBeat: 1~2개 수작업

### 1-3. responseIntent 추상화 = 확정 (단, B에서 보완 — §2-1 참조)
`pressure_response / motive_response / rapport_response / evidence_response / fatigue_response / trap_confusion_response`
이 6종 추상화를 기본으로 채택합니다.

### 1-4. 조건 분기 5축 제한 = 확정 (단, B에서 1축 추가 — §2-2 참조)
`afterEvidence / emotionTier / trustWindow / fatigueLevel / interjectionState`

### 1-5. TransitionBeat 최상위 우선순위 = 확정

### 1-6. 자유 심문 = 의도 분류 후 제한 응답 + lieState 단독 상승 금지 = 확정

### 1-7. B-2 질문 피로도 — 로컬 + 스포트라이트 2축 = 확정 (단, B에서 보완 — §2-3 참조)

### 1-8. B-5 증거 타이밍 — intent 4종 분류 = 확정 (단, B에서 보완 — §2-4 참조)

### 1-9. B-1 NPC 확률 반응 — 행동 품질 기반 가중 = 확정
역공 상한은 A의 15%와 B의 5~10% 절충 → **10~15%** 범위로 결정.

### 1-10. B-4 감정 셧다운 — 인과적 누적형 = 확정
A의 25→50→80% 곡선 채택.

### 1-11. C-1 쟁점 층위 — 3층 = 확정
A 권장대로 표면/동기/핵심(관계 포함) 3층. 4층은 모바일에 무거움.

### 1-12. C-2 가짜 쟁점 — 별도 misconception state = 확정
A의 M0~M5 구조를 기반으로 하되, **M0~M4 5단계로 축소** (M5 제거 — 오해 해소는 M4에서 완료).
```
M0: 외형상 의심 → M1: 방어/당황 → M2: 잘못된 해석 고착
→ M3: 혼란/확신 약화 → M4: 오해 해소 (clarify_false)
```

### 1-13. C-3 쟁점 링크 — 3종 = 확정 (단, B에서 1종 추가 — §2-5 참조)
A 기준 `supports / weakens_counter / unlocks_layer`

### 1-14. C-4 = C-lite 확정
- 메인 쟁점 3개 (깊이)
- 서브 쟁점 2~3개 (폭)
- 가짜 쟁점 1~2개 (함정)
- 턴 14~18, 세션 12~18분
- 레거시 82건 → B형 마이그레이션, 신규 대표 사건 → C-lite형

### 1-15. 놓친 포인트 전량 채택
- "캐릭터 패턴은 살리고 사건 패턴만 죽인다"
- 미터 수치 직접 노출 → 단계형 (낮음/흔들림/높음/개방)
- 턴 4 고정 해금 → 조건 해금 (균열/모순토큰2/신뢰창구40)
- 작성 단가 1분 이하 필드만 추가

### 1-16. BeatScript 확장 스키마 (§5) = 기본 골격 확정
8개 핵심 추가 필드: `layer / questionTypes / responseIntent / requires / forbids / truthEnvelope / weight·priority·cooldown / setFlags`

### 1-17. 가짜 쟁점 별도 스키마 (§6) = 확정
`disputeKind / resolutionMode / knowledgeMode / misconceptionStates / trapSignals / truthExitEvidence / npcModes`

### 1-18. 우선순위 로드맵 (§8) = 확정 (단, B 피드백 반영하여 Beat selector를 독립 1순위로 분리)

---

## 2. B스레드에서 가져오는 보완 포인트

### 2-1. angleTag 2축 분기 추가
A의 `responseIntent`만으로는 **같은 pressure_response라도 timeline 추궁인지 responsibility 추궁인지** 구분 불가.

B스레드가 제안한 `angleTag` 7종을 responseIntent와 병행합니다:
```
angleTag: timeline / motive / responsibility / identity / context / legality / emotion
```

즉 BeatScript selector는 `responseIntent + angleTag` 2축.
- responseIntent = "NPC에게 어떤 심리 압력인가" (A 설계)
- angleTag = "어떤 각도에서 들어왔는가" (B 보완)

### 2-2. blockedVectors 조건 추가 (6번째 축)
B의 `blockedVectors` 조건은 독창적이고 실용적입니다.
attackVector 봉쇄 상태에 따라 스크립트 선택이 달라져야 하므로, 기존 5축에 추가:

```
조건 분기 6축:
1. afterEvidence
2. emotionTier
3. trustWindow
4. fatigueLevel
5. interjectionState / trapState
6. blockedVectors (봉쇄된 attackVector 목록)
```

### 2-3. 피로도 단위를 angleTag까지 확장
A: `쟁점 × 질문유형 + 스포트라이트`
B: `쟁점 × 대상 × angleTag`

B가 더 세밀합니다. **같은 사실추궁이라도 timeline → responsibility 전환은 피로 리셋**되어야 합니다.
채택: `쟁점 × 대상 × angleTag + 스포트라이트(같은 대상 연속)`

### 2-4. 증거 분류 — intent(A) + role(B) 병합
A: 증거 성격 (expose/contextualize/corroborate/disarm_trap)
B: 증거 역할 (establish/reframe/impeach/finish)

둘 다 유용하며 관점이 다릅니다. 증거마다 **intent 1개 + role 1개** 부여:
```json
{
  "evidenceId": "e-1",
  "intent": "expose",
  "role": "establish",
  "bestAtStates": ["S1", "S2"],
  "weakAtStates": ["S0"],
  "preferredQuestionTypes": ["fact_pursuit", "evidence_present"]
}
```

### 2-5. 쟁점 링크 4종으로 확장
A의 3종 + B의 `retaliation` 추가:
```
supports / weakens_counter / unlocks_layer / retaliation
```
`retaliation`: A를 밀면 B에서 반격 가능 — 전략적 긴장감 추가.

쟁점당 **최대 2개 링크** (B 권장). 사건당 총 3~5개.

### 2-6. 이벤트 텍스트 UI층 분리
B: "이벤트를 일반 응답 슬롯과 경쟁시키지 않는 것"

채택합니다. 전이 발생 시:
- NPC 응답 = TransitionBeat
- 이벤트 = 다음 UI 선택지 층에서 별도 표시

### 2-7. Phase 6/Result에 구조화 로그 전달
B: transcript만 넘기지 말고 아래도 전달

```ts
{
  revealedAtoms: string[]
  disprovedFakeIssues: string[]
  resolvedLinks: string[]
  relationCoreRevealed: boolean
  playerStyleTags: string[]
}
```

채택. Phase 6 AI가 스크립트화된 Phase 3 기록을 의미 있게 받으려면 필수.

### 2-8. B스레드 놓친 포인트 추가 채택
- **archetype 자체가 족보가 될 위험** → 실제 반응은 `archetype × lieMotive × disputeRole × linkState` 조합
- **score 시스템 족보화** → 판결 가능 조건 일부 숨기기
- **Phase 3 스크립트 ↔ Phase 6 AI 톤 어긋남** → 구조화 로그로 해결 (위 §2-7)
- **C-1 UI — 카드 하단 펼침** (B 권장) > 세로 레인 (A 권장) → B의 카드 펼침이 모바일에 더 직관적, 채택

### 2-9. B스레드의 beliefMode 채택
가짜 쟁점에서 NPC가 **어떤 자세로 믿고 있는가**:
```
knows / suspects / misbelief / weaponizes
```
A의 misconception state + B의 beliefMode를 합쳐야 가짜 쟁점이 살아남.

---

## 3. 확정 우선순위 (통합)

| # | 항목 | 근거 |
|---|------|------|
| **1** | **Beat Selector 엔진 재설계** | 모든 후속 작업의 기반. responseIntent + angleTag + 가변 밀도 |
| **2** | **B-2 질문 피로도** | 쟁점 × 대상 × angleTag 단위. 즉시 체감 개선 |
| **3** | **B-5 증거 타이밍** | intent + role 병합, 3축 매트릭스. B-2와 함께 "반복 루트" 파괴 |
| **4** | **B-3 끼어들기 강화** | 패턴형 보장(3턴=100%) + 지식사분면별 정보 차등 |
| **5** | **C-3 쟁점 링크** | 쟁점당 최대 2개, 4종. "뭘 먼저 파느냐"가 전략화 |
| **6** | **C-1 쟁점 층위** | 3층 + 카드 펼침 UI. 2건 파일럿 후 확대 |
| **7** | **B-1 확률 반응** | 행동 품질 기반, 역공 10~15% |
| **8** | **B-4 감정 셧다운** | 누적형, 인과적 |
| **9** | **C-2 가짜 쟁점** | M0~M4 상태머신 + beliefMode. 대표 사건부터 |
| **10** | **B-6 자유 심문** | 분류 기반 제한 응답. 마지막 |
| **11** | **C-4 규모 확대** | C-lite 기준. 배치 안정화 후 |

---

## 4. 다음 단계 요청

위 통합 의견을 바탕으로, 다음 산출물을 요청합니다:

### 4-1. BeatScript V2 확정 스키마
당신이 §5에서 제안한 스키마에 아래 보완을 반영한 **최종 확정 버전**:
- `angleTag` 필드 추가
- `blockedVectors` 조건 추가
- `beliefMode` (가짜 쟁점용)
- `layer` + `issueRole` (C-1/C-2 반영)

### 4-2. Dispute 확장 스키마
- 쟁점 층위 (`depthLayer`)
- 쟁점 역할 (`disputeKind`: core_truth / sub_truth / red_herring / shared_misconception)
- 링크 그래프 (`linkEdges`)
- misconception state (M0~M4)

### 4-3. Evidence 확장 스키마
- `intent` (expose/contextualize/corroborate/disarm_trap)
- `role` (establish/reframe/impeach/finish)
- `bestAtStates / weakAtStates / preferredQuestionTypes`

### 4-4. Beat Selector 엔진 설계
- 선택 알고리즘 (가중치 + 조건 매칭 + 중복 방지 + 쿨다운)
- TransitionBeat / EventBeat / EvidenceHitBeat / 일반 BeatScript 우선순위
- 피로도 반영 로직

### 4-5. 질문 피로도 엔진 설계
- 피로도 누적/감소/리셋 규칙
- angleTag 기반 세분화
- 피로 대사 트리거

### 4-6. GPT 배치 요청서 V2 템플릿
기존 `00-배치요청서-템플릿.md`에 아래를 추가한 **확장 버전**:
1. Dispute Layer 생성 (surface/motive/core + 해금 조건)
2. Dispute Kind (core_truth/sub_truth/red_herring/shared_misconception)
3. Link Edge (사건당 3~5개)
4. Evidence Timing Metadata (intent/role/bestAtStates/weakAtStates)
5. Fatigue Beats (2회차 짜증/3회차 차단/고피로 반격)
6. Interjection Beats (허용 시 새 정보/제지 시 불만)
7. Free Question Hooks (의도 태그/허용 envelope/거부 템플릿)
8. Trap/Misconception Beats (모른다/헷갈린다/그렇게 보일 수 있다)
9. Beat coverage matrix (actionFamily × stateBand × angleTag 필수 비트)
10. AntiRepeat group + fallback lines

### 4-7. spouse-01 파일럿 데이터 샘플
위 확장 스키마를 spouse-01에 적용한 **샘플 10~15개** BeatScript V2:
- 핫 노드 2~3개 (각 6~8 변형)
- 중간 노드 2~3개 (각 4~5 변형)
- 콜드 노드 1~2개 (각 2~3 변형)
- 가짜 쟁점용 1~2개 (misconception beat)

이걸로 실제 엔진 구현/테스트가 가능해집니다.

---

## 5. 참고: 첨부 파일 목록

아래 파일들을 함께 전달합니다. 스키마/엔진 설계 시 현재 구현 상태를 정확히 파악하는 데 사용하세요.

### 핵심 타입 정의 (현재 구조)
| 파일 | 내용 | 라인 |
|------|------|------|
| `src/types/renewal.ts` | ResponseBlueprint, Stance, DefenseMode, BeatScript, TransitionBeat, DossierCard, StateUnlockAtom, GameEventTexts 등 V3 전체 타입 | 350줄 |
| `src/types/claimV2.ts` | ClaimAtom, ClaimPolicyV2, Slot 타입, SubActionAtomRule | 253줄 |
| `src/types/case.ts` | Case, Dispute, Evidence 구조 | 126줄 |
| `src/types/agent.ts` | LieState 등 Agent 상태 | 42줄 |
| `src/types/discovery.ts` | Discovery 메커닉 타입 | 170줄 |

### 핵심 엔진 (현재 구현)
| 파일 | 내용 | 라인 |
|------|------|------|
| `src/engine/blueprintEngine.ts` | stance/defenseMode 결정 매트릭스 | 440줄 |
| `src/engine/questionEffectEngine.ts` | 모순토큰/누설미터/신뢰창구 3종 미터 | 389줄 |
| `src/engine/gameEventTriggerEngine.ts` | 모순/끼어들기/감정폭발/새쟁점 4종 이벤트 | 378줄 |
| `src/engine/readinessEngine.ts` | 성과 기반 판결 조건 | 171줄 |
| `src/engine/evidenceChallengeEngine.ts` | attackVector 봉쇄 + collapse | — |
| `src/engine/bridgeEngine.ts` | Phase 1→3 상태 연결 | — |
| `src/engine/atomSelectionEngine.ts` | V2 atom 선택 + V3 unlock atom 병합 | — |
| `src/engine/v3GameLoopLoader.ts` | V3 데이터 로더 | — |
| `src/engine/llmDialogueResolver.ts` | 현재 Phase 3 LLM 응답 (교체 대상) | 78KB |

### 핵심 핸들러
| 파일 | 내용 |
|------|------|
| `src/hooks/useActionDispatch.ts` | handleQuestion (379~612줄), handleEvidencePresent (82~201줄) — V3 미터+이벤트 자동 호출 |

### 완성된 데이터 샘플
| 파일 | 내용 |
|------|------|
| `spouse-01-v3-game-loop-data.json` | DossierCard 3장 + UnlockAtom 42개 + 이벤트 18개 + TransitionBeat 24개 (1,743줄) |
| `spouse-01-claimpolicy-v2-atoms.json` | V2 atom 155개 (5,732줄) |
| `spouse-01-tells-beats.json` | Tell 6개 + BeatScript 36개 (569줄) |

### 현재 배치 템플릿
| 파일 | 내용 |
|------|------|
| `gpt-batch/00-배치요청서-템플릿.md` | 현재 배치 요청서 (요청 A: V2 atom, 요청 B: Tell+Beat, 요청 C: V3 GameLoop) |

### 진단 문서
| 파일 | 내용 |
|------|------|
| `docs/diagnosis/PROMPT-FOR-ADVISOR.md` | 컨설턴트 역할 프롬프트 |
| `docs/diagnosis/01~10` | 게임 전체 진단 (컨셉/흐름/메커닉/AI/데이터/채점/엔진/규모/기술/실데이터) |

### 논의 이력
| 파일 | 내용 |
|------|------|
| `discussion-v3-script-transition.md` | 이번 논의 메인 문서 |

---

## 6. 작성 규칙 리마인드

### 필드 추가 원칙
- **GPT 작성 단가 1분 이하**인 필드만 추가
- 조건이 많아질수록 LLM 대신 "조건지옥"이 옴 — 최소한으로

### 데이터 규모 감각
- 84사건 × 36 BeatScript 기본 = 3,024개 (현재)
- 가변 밀도 적용 시 = 약 4,000~5,000개 (허용 범위)
- 질문유형 × 상태 × 증거 × 분기 × 변형 전면 스크립트화 = 40,000개+ (절대 금지)

### 현재 코드 호환성
- 기존 `BeatScript` 인터페이스는 `renewal.ts:179~192`
- 기존 `TransitionBeat` 인터페이스는 `renewal.ts:327~338`
- BeatScript V2는 기존 인터페이스를 **확장(extend)**하되 하위 호환 유지
- 새 엔진은 기존 엔진과 **병렬 배치** (기존 엔진 수정 최소화)
