# 스레드 A 인수인계 — V2 스크립트 전환

## 이 문서를 읽는 대상

새 ClaudeCode 스레드가 이 프로젝트의 V2 스크립트 전환 작업을 이어받을 때 사용합니다.
이전 스레드에서의 모든 설계 결정, 구현 상태, GPT와의 협업 맥락, 미완료 작업을 포함합니다.

---

## 1. 프로젝트 배경 요약

Solomon은 LLM 기반 법정 심문 게임입니다. 플레이어(재판관)가 양측 NPC를 심문하여 진실을 밝힙니다.

**V2 스크립트 전환**은 Phase 3(통합 심문)의 NPC 응답을 LLM 실시간 생성에서 **BeatScript V2 선택기** 기반으로 교체하는 작업입니다.

### 전환 이유
1. LLM이 Blueprint를 무시하고 자백하는 품질 문제
2. 호칭/반말/자기모순 등 LLM 불안정
3. API 비용 (게임당 ~20회 호출)
4. 오프라인 불가

### 핵심 설계 원칙 (GPT-A 스레드에서 확정)
- **"더 똑똑한 LLM"이 아니라 "더 정교한 선택 구조 + 스크립트 선택기"**
- **패턴화 방지는 RNG가 아닌 "상황 의존성"으로** — 피로도, 증거 타이밍, 끼어들기, 쟁점 연결
- **캐릭터 패턴은 읽히되, 사건 패턴은 읽히면 안 됨**
- **미터가 보이면 정답이 보인다 → 단계형(텍스트) 표시로 산수 게임 방지**
- **작성 단가 1분 이하 필드만 추가** — GPT 배치 운영 가능성이 핵심 제약

---

## 2. GPT-A 협업 구조

### 역할 분담
- **GPT-A (GPT Pro)**: 게임 디자인 컨설턴트. 스키마 설계, 엔진 설계, 데이터 생성, 프롬프트 템플릿
- **ClaudeCode-A (이전 스레드)**: 설계를 코드로 구현, GPT에 요청서 준비, 산출물 검토/통합
- **GPT-C / ClaudeCode-C**: 84개 사건 V1 배치 담당 (별도 병렬 작업)

### 통신 방식
1. ClaudeCode가 요청서 + 참조 파일을 폴더로 정리
2. 유저가 GPT-A 스레드에 폴더 전달
3. GPT가 산출물 반환 (보통 1시간+)
4. 유저가 산출물을 output 폴더에 저장
5. ClaudeCode가 검토 → 구현

### GPT-A 스레드 요청 이력

| 차수 | 폴더 | 요청 내용 | 산출물 |
|------|------|----------|--------|
| 초기 피드백 | `thread-A-package/` | A/B 스레드 통합 의견 + 7종 산출물 요청 | `thread-A-package/feeback/` — 스키마 5종 + 배치 템플릿 + spouse-01 샘플 15개 |
| 1차 | `thread-A-request-2/` | spouse-01 실데이터 3종 | `thread-A-request-2/1차_Output/` — structure-v2 + beats-v2-full(66개) + legacy-bypass-design |
| 2차 | `thread-A-request-3/` | 끼어들기/확률반응/미터단계화/Phase6 프롬프트 | `thread-A-request-3/output/` — 설계 4종 (interjection/npcReaction/meterStaging/phase6-prompt) |
| 3차 | `thread-A-request-4/` | family-01 V2 + log collector + atom mapping | `thread-A-request-4/output/` — family-01 데이터 2종 + log collector 설계 + atom mapping |
| **4차** | `thread-A-request-5/` | misconception 전이 + free question + interjection beat 확장 | **⏳ 대기 중** |

---

## 3. 설계 결정 기록

### 3-1. BeatScript 선택 구조

**responseIntent 6종 + angleTag 7종 2축 선택** (A스레드 제안 + B스레드 보완)
- responseIntent: NPC에게 어떤 심리 압력인가 (pressure/motive/rapport/evidence/fatigue/trap_confusion)
- angleTag: 어떤 각도에서 들어왔는가 (timeline/motive/responsibility/identity/context/legality/emotion)
- 이유: responseIntent만으로는 같은 pressure도 timeline/responsibility 구분 불가

**가변 밀도** (×5 균등 반대)
- 핫 노드 6~8, 중간 4~5, 콜드 2~3, TransitionBeat 1~2
- 이유: 15,120개 폭발 방지. 자주 나오는 장면만 두껍게

**3단계 lane 우선순위**
- TransitionBeat > EvidenceHitBeat > GeneralBeat
- 이벤트 텍스트는 main beat와 경쟁시키지 않고 UI lane 분리 (B스레드 제안 채택)

**가중 랜덤 top-4** (결정론 + 변형 양립)
- 상위 4개 후보에서 상대 가중치 기반 랜덤 선택

### 3-2. 조건 분기 6축

1. `afterEvidence` — 직전 증거 제시 여부
2. `emotionTier` — calm/agitated/explosive/shutdown
3. `trustWindow` — closed/narrow/open
4. `fatigueLevel` — fresh/wary/high/exhausted
5. `interjectionState/trapState` — 끼어들기/함정 상태
6. `blockedVectors` — attackVector 봉쇄 상태 (B스레드 추가)

### 3-3. 피로도 엔진

**2축 피로** (A스레드 기본 + B스레드 angleTag 확장)
- 로컬: `쟁점 × 대상 × angleTag` — 1회:100%, 2회:70%, 3회:35%, 4회:10%
- 스포트라이트: 같은 대상 연속 — 1회:100%, ..., 5회:45%
- 리셋: new_evidence, layer_unlock, target_switch, interjection_allow

**legacy 감쇠 우회**: `questionEffectEngine`에 `externalMultiplier` 옵션 추가.
V2 모드에서는 legacy `consecutiveSameType` 감쇠를 무시하고 피로도 엔진의 배율만 사용.
필드(`lastQuestionType`/`consecutiveSameType`)는 삭제하지 않고 analytics/rollback용으로 유지.

### 3-4. NPC 확률 반응

**행동 품질 기반 가중 확률**
- good: 순응75/저항20/역공5, normal: 55/30/15, bad: 35/40/25
- **counter cap 15%** (초과분은 resist로 이관)
- archetype 16종별 보정, lieMotive 7종별 조건부 보정, disputeKind+beliefMode 보정
- resentment (끼어들기 제지 시): 순응 -10, 3턴 지속
- truth floor: S4+/blockedVectors 3+/trust 60+이면 counter → resist로 강제 이관

**resist 시**: stance 1단계 하향 (truth floor 이하로는 안 내려감), 효과 55%
**counter 시**: stance=blame, defenseMode=counterattack, 효과 20%, authority -1

### 3-5. 끼어들기 V2

**패턴 보장**
- 같은 대상 2턴 연속 + 감정 40+ → 35~45%
- 같은 대상 3턴 연속 → 100%
- S4/S5 전이 → 100% (강제), S3 전이 → 100% (강제)
- retaliation link 열림 + 감정 55+ → 40%
- 쿨다운 3턴, 파티별 사건당 최대 2회

**지식 차등** (quadrant 기반)
- both_know → detail_rebuttal (구체 디테일 반박)
- a_only/b_only → emotional_only (감정적 끼어들기만)
- red_herring + knows → trap_signal
- red_herring + misbelief → misbelief_escalation

**리밸런스** (허용이 실질 이득이 되도록)
- allow: reset_fatigue + readiness_nudge + atom/link/trap_signal reveal
- block: authority -2 + resentment flag (순응률 -10, 3턴)

**UI**: `pendingInterjectionV2` → GameEventModal에서 allow/block 선택

### 3-6. Misconception 상태 머신 (M0→M4)

lieState(S0→S5)가 "숨긴 진실의 자백"이라면, misconception은 "잘못된 해석의 해소".

**현재 전이 규칙 (기본 구현, GPT 4차에서 정밀화 예정)**
- M0→M1: 해당 쟁점에 첫 질문
- M1→M2: 같은 쟁점 3회 이상 추궁
- M2→M3: truthExitEvidence 제시 or trapSignal flag
- M3→M4: truthExitEvidence + identity/context 벡터 봉쇄, 또는 증거 2개 이상

M4 도달 시 `recordDisprovedFakeIssue` 자동 호출.

### 3-7. LinkEdge

**4종**: supports, weakens_counter, unlocks_layer, retaliation
- 사건당 3~5개, 쟁점당 최대 2개
- 매 턴 종료 시 모든 linkEdge 조건 검사
- 조건: minState, minLayer, disproved, requireFlags
- 효과: grantFlag, supportBonus, weakenCounterTags, unlockLayer, retaliationAngleTag

### 3-8. 쟁점 층위 (3층)

- surface (표면) — 항상 열림
- motive (동기) — S2+ 또는 특정 flag로 해금
- core (핵심/관계) — S3~S4+ 또는 증거+flag 조합으로 해금

**UI**: DisputeBoard에서 카드 펼침. 해금된 층은 컬러+아이콘+summary, 잠긴 층은 회색+🔒+lockedSummary.

### 3-9. 미터 단계화

- 누설미터: 안정(0~24) / 흔들림(25~49) / 위험(50~79) / 폭발직전(80~100)
- 신뢰창구: 닫힘(0~19) / 살짝(20~39) / 열림(40~59) / 완전개방(60~100)
- 모순토큰: 기존 pip 형태 유지
- 하드코어 모드(V2 off): % 수치 그대로 표시

### 3-10. 사건카드 조건 해금

턴 4 고정 → 조건 해금:
1. 첫 균열 (아무 쟁점 S0→S1 이상)
2. 모순토큰 2+
3. 신뢰창구 40+
4. 턴 6 (안전장치)

### 3-11. Feature Flag

```typescript
phase3Flags: {
  useBeatSelectorV2: boolean,  // true: V2, false: LLM
  useQuestionFatigueV2: boolean // true: angleTag 피로도, false: legacy
}
```
V2 데이터 없는 사건은 flag와 무관하게 LLM fallback.

### 3-12. Phase3StructuredLog

게임 중 실시간 수집:
- `revealedAtoms`: beat의 truthEnvelope + StateUnlockAtom + evidence onSuccess
- `disprovedFakeIssues`: misconception M4 도달 시
- `resolvedLinks`: linkEdge 활성화 시
- `relationCoreRevealed`: core 층 최초 해금 시
- `playerStyleTags`: 턴별 패턴에서 자동 파생

Phase 6 브릿지 변환: `buildPhase3PromptBridge()` → `Phase3PromptBridgeV2`

---

## 4. 파이프라인 전체 흐름

```
플레이어 질문 입력
├─ lie 전이 시도 (기존)
├─ affinity 게이팅 (기존)
│
├─ [V2 분기] useBeatSelectorV2 && hasV2Data(caseId)
│   ├─ 1. getActiveLayer() + getDisputeRole()
│   ├─ 2. deriveAngleTag()
│   ├─ 3. evaluateQuestionFatigue()
│   ├─ 4. deriveActionQuality() → resolveNpcReaction() → comply/resist/counter
│   ├─ 5. selectTurnPresentation() (reaction 적용된 stance로)
│   ├─ 6. 재판관 질문 + NPC 응답(beat.line) 출력
│   ├─ 7. beat 기록 + Phase3 로그 + 피로도 커밋 + 미터 효과(피로×반응 배율) + authority
│   ├─ 8. misconception 전이 시도
│   ├─ 9. 끼어들기 V2 (focus streak → 기회 평가 → pendingInterjectionV2)
│   └─ 10. linkEdge 평가
│
├─ [LLM 분기] !v2BeatUsed → resolveAndApply() (기존)
│
├─ 기존 끼어들기 (!v2BeatUsed일 때만)
├─ 이벤트 트리거 평가 (V2에서 미터 이미 적용했으면 스킵)
├─ lieState 전이 피드백
└─ 턴 증가
```

---

## 5. 세션 리셋 (initializeCase에서 호출)

```
resetV3State(caseKey)
resetV2State(caseKey)
resetSessionFatigueState()
resetSessionInterjectionTracker()
resetPhase3Log()
resetMisconceptionState()
resetActivatedLinks()
```

---

## 6. V2 데이터 파일럿 현황

| 사건 | V1 | Structure V2 | Beats V2 | Atom Mapped | V2 활성 |
|------|:--:|:-----------:|:--------:|:-----------:|:------:|
| spouse-01 | O | O (49KB) | O (74개, interj 12) | O (28실+8proposed) | O |
| family-01 | O | O (47KB) | O (68개, interj 12) | O | O |
| family-02~12 | O | — | — | — | fallback |
| friend-01~12 | O | — | — | — | fallback |
| 나머지 59사건 | 대기 | — | — | — | fallback |

---

## 7. GPT-A 요청 이력 (업데이트)

| 차수 | 폴더 | 요청 내용 | 상태 |
|------|------|----------|------|
| 초기 | `thread-A-package/` | A/B 스레드 통합 + 스키마 7종 | ✅ 완료 |
| 1차 | `thread-A-request-2/` | spouse-01 실데이터 3종 | ✅ 완료 |
| 2차 | `thread-A-request-3/` | 끼어들기/확률반응/미터단계화/Phase6 프롬프트 | ✅ 완료 |
| 3차 | `thread-A-request-4/` | family-01 V2 + log collector + atom mapping | ✅ 완료 |
| 4차 | `thread-A-request-5/` | misconception 정밀화 + free question + interjection 12개 | ✅ 완료, 구현 완료 |
| **5차** | `thread-A-request-6/` | V2 배치 템플릿 업데이트 + free question 키워드 확장 방안 | **⏳ 대기 중** |

### GPT-A 4차 결과 (구현 완료)

**A: Misconception 전이 정밀화** → `misconceptionEngine.ts` 전면 교체
- trigger 9종 + belief mode별 threshold (misbelief/weaponizes: 1, suspects/knows: 2)
- `deriveTriggerFromQuestion/Evidence/Interjection/Link` 4종 파생 함수
- `applyMisconceptionTrigger()` → effects 배열 (flag set/clear, log_disproved)
- `matchTrapSignal()` 부분문자열+alias 매칭
- `useActionDispatch.ts`에 3곳 연결 완료 (question/interjection/linkEdge)

**B: Free Question V2** → `freeQuestionV2.ts` 신규 생성
- deterministic-first 분류기 (intentTag 키워드 + dispute alias)
- 게이트: V2 + turn≥6 + (S3+ OR red_herring_pressed)
- lieState/misconception 전이 완전 차단
- 게임루프 연결은 미완 (자유 심문 UI 활성화 시 연결 예정)

**C: Interjection beat 확장** → beats-v2-full merge 완료
- spouse-01: 66→74개 (+12 interjection, -4 기존)
- family-01: 60→68개 (+12 interjection, -4 기존)
- `BeatActionFamily`에 `'interjection'` 추가

### GPT-A 5차 대기 사항
- V2 추가배치 템플릿: interjection 4→12개 반영 필요
- Free question 키워드 확장: disputeAliases vs triggerKeywords 방안 결정

---

## 8. 추가 구현 완료 항목

### Phase 6/Result 프롬프트 V2 브릿지
- `phase3LogCollector.ts` — Phase3PromptBridgeV2 확장 (contestedIssues, disprovedFakeIssueDetails, resolvedLinkDetails, toneProfile, lastMeaningfulBeatIds)
- `phase6ResultPromptV2.ts` — 프롬프트 빌더 (buildBridgeFromStore, buildPhase6SystemPrompt/UserPrompt, buildResultSystemPrompt/UserPrompt)
- `Phase6_Mediation.tsx` — 마운트 시 V2 bridge 빌드 → store 캐시 → LLM 프롬프트 주입
- `Aftermath.tsx` — V2 bridge 있으면 구조화 로그 기반 프롬프트, 실패 시 기존 fallback
- `llmDialogueResolver.ts` — mediation 액션 시 bridge 기반 프롬프트 교체
- `useGameStore.ts` — `phase3PromptBridge` 캐시 + initializeCase 리셋

---

## 9. 미구현 항목 전체 (업데이트)

| 항목 | 상태 | 의존 | 비고 |
|------|------|------|------|
| Misconception 전이 정밀화 | ✅ 구현 + 연결 완료 | — | trigger 기반 리듀서 |
| Free Question 엔진 | ✅ 엔진 구현 완료 | 게임루프 연결 미완 | 자유 심문 UI 활성화 시 연결 |
| Interjection beat 확장 | ✅ 데이터 merge 완료 | — | 사건당 12개 |
| Phase 6/Result 프롬프트 | ✅ 구현 + 연결 완료 | — | V2 bridge 기반 |
| V2 배치 템플릿 업데이트 | ⏳ GPT-A 5차 대기 | — | interjection 12개 + 키워드 방안 |
| 82사건 V2 데이터 | 미생성 | C스레드 + 5차 결과 | 템플릿 업데이트 후 시작 |

---

## 10. 병렬 작업 (C스레드) 상태

- **ClaudeCode-C**: 84개 사건 V1 배치 감독. 25개 완료, 59개 대기
- **GPT-C**: V1 배치 산출물 생성
- **공유 문서**: `docs/ref/리뉴얼참고/thread-sync-V2-requirements.md`
- **V2 추가배치 템플릿**: `docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md`
- C스레드는 V1 배치 완료 후 V2 추가배치를 순차 진행 예정
- **⚠️ 중요**: GPT-A 5차 결과로 V2 템플릿이 업데이트되면 C스레드에 반드시 공유

### C스레드 ID 규칙과 V2 ID 규칙
- V1: 콜론(`:`) 구분자 — `family02:a:d-1:act:0`
- V2 BeatScript: 원래 점(`.`) 구분자였으나, **V2 추가배치 템플릿에서 콜론으로 통일** — `family02:beat_v2:a:d-1:surface:pressure:timeline:01`
- **주의**: spouse-01과 family-01의 기존 V2 beat ID는 점(`.`) 구분자 (`spouse01.a.d1.surface...`). beatSelectorV2는 ID 형식에 의존하지 않으므로 (문자열 비교만) 혼재해도 동작함

---

## 11. 파일 위치 전체 맵

```
== 엔진 (src/engine/) ==
beatSelectorV2.ts           — Beat 선택기 (3단계 lane)
questionFatigueEngine.ts    — 피로도 (로컬+spotlight)
npcReactionV2.ts            — 순응/저항/역공 확률
interjectionV2.ts           — 끼어들기 V2 (패턴 보장+지식 차등)
meterStagingV2.ts           — 미터 단계화 + 사건카드 해금 + readiness 힌트
v2DataLoader.ts             — V2 데이터 등록/조회/런타임 상태
phase3LogCollector.ts       — Phase3 로그 수집 + Phase 6 브릿지 (V2 확장)
phase6ResultPromptV2.ts     — Phase 6/Result 프롬프트 빌더 (V2 bridge 기반)
misconceptionEngine.ts      — M0→M4 상태 머신 (V2 — trigger 9종 + belief mode)
freeQuestionV2.ts           — 자유 질문 V2 (deterministic-first 분류기)
linkEdgeEngine.ts           — LinkEdge 조건 체크 + effect
questionEffectEngine.ts     — (패치) externalMultiplier 옵션

== 타입 (src/types/) ==
beatScriptV2.ts             — BeatScriptV2, ResponseIntent, AngleTag, FatigueLevel 등
disputeV2.ts                — DisputeV2, 층위, 링크, Misconception, Phase3StructuredLog
evidenceV2.ts               — EvidenceNodeV2, timing, getEvidenceTimingMultiplier()
renewal.ts                  — (패치) BeatType에 emotional 추가
claimV2.ts                  — (패치) dateTimeExact, PlaceSlot, ThresholdSlot, location, fallbackPublicClaim

== 데이터 (src/data/claimPolicies/) ==
spouse-01-structure-v2.json
spouse-01-beats-v2-full.json (atom ID mapped)
family-01-structure-v2.json
family-01-beats-v2-full.json

== 통합 ==
src/hooks/useActionDispatch.ts        — V2 파이프라인 전체 + resolveInterjectionV2 export
src/store/useGameStore.ts             — phase3Flags, pendingInterjectionV2, 리셋 7종

== UI ==
src/components/discovery/StateTransitionFeedback.tsx  — QuestionMeterHUD (meterStagingV2 기반)
src/components/discovery/ForcedVerdictBanner.tsx      — readiness 3단계 힌트
src/components/discovery/GameEventModal.tsx           — V2 끼어들기 allow/block
src/components/discovery/DisputeBoard.tsx             — 쟁점 층위 카드 펼침 + Misconception 진행바
src/components/actions/ActionPanel.tsx                — 사건카드 조건 해금 + 토스트

== 테스트 ==
tests/v2-fatigue-bypass-test.cjs      — 40/40 PASS

== 문서 ==
docs/diagnosis/11-v2-script-transition-spec.md              — V2 전체 스펙
docs/ref/리뉴얼참고/thread-sync-V2-requirements.md          — C스레드 공유
docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md       — V2 추가배치 GPT 요청서

== GPT-A 요청/산출물 ==
docs/ref/리뉴얼참고/thread-A-package/                       — 초기 피드백 + 스키마 7종
docs/ref/리뉴얼참고/thread-A-package/feeback/               — GPT 초기 산출물
docs/ref/리뉴얼참고/thread-A-request-2/                     — 1차 요청
docs/ref/리뉴얼참고/thread-A-request-2/1차_Output/          — spouse-01 실데이터 3종
docs/ref/리뉴얼참고/thread-A-request-3/                     — 2차 요청
docs/ref/리뉴얼참고/thread-A-request-3/output/              — 설계 4종
docs/ref/리뉴얼참고/thread-A-request-4/                     — 3차 요청
docs/ref/리뉴얼참고/thread-A-request-4/output/              — family-01 + log collector + atom mapping
docs/ref/리뉴얼참고/thread-A-request-5/                     — 4차 요청 (대기 중)

== GPT-A 설계 문서 (구현 시 참고) ==
thread-A-request-3/output/phase6-result-prompt-v2-design.md — Phase 6/Result 프롬프트 설계
thread-A-request-4/output/phase3-log-collector-design.ts    — Phase3 로그 수집기 GPT 설계 (immutable 패턴)
```

---

## 11. 검증 상태

```
tsc --noEmit: 0 에러
tests/v3-engine-test.cjs: 53/53 PASS
tests/v3-round2-validation.cjs: 33/33 PASS
tests/v2-fatigue-bypass-test.cjs: 40/40 PASS
npx vite build: 성공 (1.38s)
```

---

## 12. 새 스레드 시작 시 첫 작업

1. 이 문서를 읽고 상황 파악
2. GPT-A 4차 결과가 `thread-A-request-5/output/`에 있는지 확인
   - 있으면: 산출물 검토 → misconception 정밀화 + free question 엔진 + interjection beat 추가
   - 없으면: GPT 결과 대기. 그동안 할 수 있는 작업 탐색
3. `tsc --noEmit` + 기존 테스트로 현재 상태 검증
4. `docs/diagnosis/11-v2-script-transition-spec.md` 참조하여 전체 구조 파악
