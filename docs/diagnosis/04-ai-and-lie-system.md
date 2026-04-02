# 4. AI 에이전트 & 거짓말 시스템

> **V3 업데이트 (2026-04-02)**: Blueprint 엔진, V2 atom 시스템, 스크립트 전환 방향 반영

## AI 아키텍처 개요 (V3 현재)

```
사전 생성 (Pre-generation)
├── GPT Pro: 84개 사건 JSON + Phase 1/2 스크립트
├── GPT Pro: V2 ClaimAtom + V3 GameLoop 데이터 (2사건 완료, 82사건 준비 중)
└── Claude Code: 엔진 구현, 데이터 통합, 테스트

런타임 — 현재 (LLM 기반)
├── OpenAI GPT-4o-mini: Phase 3 심문 대화 실시간 생성
├── Blueprint 경로: 엔진이 stance/defenseMode 결정 → LLM은 1~3문장 연기만
└── BeatScript fallback: LLM 실패 시 사전 작성 대사로 자동 전환

런타임 — 전환 방향 (스크립트 기반)
├── Phase 3 (심문): BeatScript ×5 변형 랜덤 (LLM 제거)
├── Phase 3 (자유 심문): S3+ & 턴 6+ 에서만 AI 허용 (검토 중)
├── Phase 6 (조정): AI 유지 (조합 무한)
└── Result (후일담): AI 유지 (판결 기반 서사)

룰 엔진 (클라이언트, 모든 게임 로직)
├── BlueprintEngine: stance/defenseMode/claims/tell 결정
├── AtomSelectionEngine: V2 atom 선택 + V3 unlock atom 병합
├── QuestionEffectEngine: 미터 시스템 (모순/누설/신뢰)
├── GameEventTriggerEngine: 4종 이벤트 조건 평가
├── ReadinessEngine: 성과 기반 판결 조건
├── EvidenceChallengeEngine: 벡터 봉쇄 + 붕괴 감지
├── LieStateMachine: 쟁점별 S0~S5 상태 전이
├── EmotionEngine: 4-Tier 감정 상태
├── TrustEngine: 3축 신뢰 (대 재판관 / 노출 공포 / 보복 우려)
├── TellValidator: 말버릇 규칙 사후 검증
└── DiscoveryEngine: 4가지 발견 메커닉
```

**핵심 원칙**: 엔진이 의미를 결정하고, LLM(또는 스크립트)은 **연기만** 한다.

## Blueprint 파이프라인 (V2/V3)

매 턴 NPC 응답을 생성하는 핵심 파이프라인:

```
1. BlueprintEngine
   입력: lieState + emotionTier + blockedVectors + questionType + trust
   출력: ResponseBlueprint { stance, defenseMode, sentenceCount, mustUseTell, ... }

2. AtomSelectionEngine
   입력: ClaimPolicyV2 + subAction + stance + V3 UnlockAtoms
   처리: tag 매칭 점수 → 상위 atom 선택 → slot surface 결정
   출력: BlueprintAtomPlan { selectedAtoms, slotSelections, forbiddenAtomIds }

3. 응답 생성 (현재: LLM / 전환 예정: BeatScript)
   현재: atom + slot + blueprint → 프롬프트 조립 → LLM 1~3문장
   전환: stance + lieState + questionType → BeatScript 풀에서 랜덤 선택

4. TransitionBeat 강제 삽입
   lieState 전이 감지 시 → 사전 작성 대사로 LLM 응답 교체
```

### stance-defenseMode 호환성 매트릭스
```
deny:      flat_denial, context_attack, legality_attack, authenticity_attack, silence
hedge:     silence, context_attack, legality_attack, authenticity_attack
partial:   concession, context_attack, legality_attack, authenticity_attack, counterattack
blame:     counterattack, context_attack, legality_attack, authenticity_attack
emotional: silence, concession, counterattack
confess:   concession only
```

### admission floor
Phase 1에서 인정한 사실에 기반하여 **최소 stance 강제**. Phase 3에서 이미 인정한 걸 다시 부정할 수 없음.

## V2 ClaimAtom 시스템

기존 publicClaim(완성 문장)을 **의미 단위(atom) + 표현 층(slot)**으로 분해.

### atom 구조
```ts
{
  id: "spouse01:a:d-1:act:0",
  factText: "공동계좌에서 이체가 있었다는 사실",  // 의미
  tags: ["act", "timeline"],                       // 분류 (24종)
  slots: {                                          // 표현 변형
    amount: { exact: "2,800,000원", rounded: "280만원", neutral: "해당 금액" },
    time: { dateExact: "9월 20일", period: "추석 연휴 직전", neutral: "그 시점" },
  },
  stanceHints: ["deny", "hedge"],                   // 어울리는 stance
  usableInSubActions: ["fact_pursuit", "evidence_present"],  // 사용 가능 질문
}
```

### tag 24종
act, timeline, motive, emotion, rule, evidence, context, identity, responsibility, relationship, counter, self_justification, harm, fear, shame, privacy, admission, denial, uncertainty, quote, threshold, beneficiary, institution, legacy_sentence

### 질문 유형별 atom 선택 규칙
```
fact_pursuit:     primary [act, timeline, rule] → 사실 중심
motive_search:    primary [motive, self_justification] → 동기 중심
empathy_approach: primary [emotion, fear, shame, relationship] → 감정 중심
evidence_present: primary [evidence, context, identity, quote] → 증거 중심
```

## 6단계 거짓말 상태머신

각 쟁점(dispute)마다 독립적인 6단계 상태머신. 전이는 질문/증거/이벤트에 의해 발생.

```
S0: 완전 부정    → "그런 적 없습니다"
 ↓ (사실추궁 / 증거제시)
S1: 흔들림       → "그건... 순서가 있습니다"
 ↓ (추가 추궁 / 모순 감지)
S2: 부분 인정    → "일부는 맞지만 맥락이 다릅니다"
 ↓ (동기탐색 / 사건카드)
S3: 전가/반격    → "왜 저만 추궁받아야 합니까"
 ↓ (공감접근 / 감정폭발)
S4: 감정 호소    → "솔직히 말씀드리면, 두려웠습니다"
 ↓ (지속 추궁 / 자백 창구)
S5: 시인         → "네, 제가 보냈습니다. 먼저 말하지 않은 건 제 잘못입니다"
```

각 전이 순간에 **TransitionBeat** (사전 작성 대사)가 강제 삽입되어 극적 전환 보장.

### 전이 트리거
- `direct_question`, `timeline_question`: 사실추궁
- `motive_question`, `context_question`: 동기탐색
- `empathy_question`, `provenance_question`: 공감접근
- `hard_evidence`, `soft_evidence`: 증거제시
- `trust_separation`, `trust_confidential`: 신뢰행동
- `dossier_challenge`: 사건카드
- `event_contradiction`, `event_emotional_burst`: 이벤트

### 7가지 거짓말 유형 (lieType)
| 코드 | 유형 | 설명 |
|------|------|------|
| LT-1 | 완전 부정 | "그런 적 없다" |
| LT-2 | 축소/왜곡 | "한 적은 있지만 크게 아니다" |
| LT-3 | 맥락 날조 | "이유가 달랐다" |
| LT-4 | 책임 전가 | "상대가 먼저 그랬다" |
| LT-5 | 감정 은폐 | "힘들지 않았다" |
| LT-6 | 시간/장소 조작 | "그때 거기 없었다" |
| LT-7 | 부분 시인 후 은폐 | "이건 인정, 나머지는 아니다" |

### 7가지 거짓말 동기 (lieMotive)
shame_avoidance, face_saving, self_protection, relationship_maintenance, career_preservation, financial_protection, habit_denial

## 16종 아키타입 (archetype)

NPC의 성격 유형. stance 선택, 감정 곡선, 질문 효과에 영향.

| 아키타입 | 특성 | 질문 상성 |
|----------|------|----------|
| avoidant | 회피, 얼버무림 | 사실추궁에 약함 |
| confrontational | 공격적, 반격 | 공감접근에 약함 |
| victim_cosplay | 피해자 연기 | 동기탐색에 약함 |
| cold_logic | 논리 방어 | 감정 기반에 약함 |
| hyper_responsible | 의무 강조 | 규칙 모순에 약함 |
| martyr | 희생 호소 | 사실 직면에 약함 |
| ... (16종) | | |

## ExecutableVerbalTell (말버릇)

NPC별 3개, 검증 가능한 말버릇 규칙:

```ts
{
  id: "over_precision",
  appliesWhen: ["lying", "avoiding"],           // 발현 조건
  lexicalHooks: ["기준으로", "정확히", "딱"],    // 텍스트 필수 어휘
  sentenceShape: "number_first",                // 문장 구조
  cadence: "once_every_2_turns",                // 빈도 제한
  originalPattern: "불편한 질문이 올수록 숫자가 정밀해진다..."
}
```

TellValidator가 LLM 응답에 어휘 훅이 포함됐는지 사후 검증.

## 감정 시스템 (EmotionTier)

```
calm     (0~40):  방어력 높음, 전이 기본
agitated (40~65): 균형, 질문 효과 보너스 시작
explosive(65~85): 방어 약함, 감정 폭발 이벤트 가능
shutdown (85+):   응답 거부, 공감만 유효
```

## 신뢰 시스템 (TrustState)

3축 독립 추적:
- **trustTowardJudge** (0~100): 재판관 신뢰도. 공감 +12, 비공개 보호 +20, 과도 압박 -15
- **fearOfExposure** (0~100): 노출 공포. 높으면 감정적 방어 강화
- **retaliationWorry** (0~100): 보복 우려. 분리 심문으로 -10

## 스크립트 전환 방향 (검토 중)

### 목표
Phase 3 심문에서 LLM 의존을 제거하고 BeatScript 기반으로 전환.
게임당 API 호출 ~20회 → ~3회 (Phase 6 + 후일담만).

### BeatScript ×5 변형 구조
```
현재: d-1 / deny / S0~S1 → 대사 1개
확장: d-1 / deny / S0~S1 → [변형1, 변형2, 변형3, 변형4, 변형5]
엔진: 랜덤 선택 + 중복 방지 + 질문 유형별 분기
```

### 자유 심문 (S3+ 해금)
S3 이상에서만 AI 직접 답변 허용. 이미 전가/감정 단계라 Blueprint 규칙 안에서 작동.
