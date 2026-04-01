# 4. AI 에이전트 & 거짓말 시스템

## AI 아키텍처 개요

```
사전 생성 (Pre-generation)
├── GPT Pro: 84개 사건 JSON + 168개 Phase 1/2 스크립트
└── Claude Code: 텍스트 정제, 구조 검수

런타임 LLM (Phase 3~5)
├── OpenAI GPT-4o-mini: 심문 대화 실시간 생성
└── 5개 에이전트: interrogation, free_question, testimony_analysis, witness, phase generators

룰 엔진 (클라이언트)
├── 거짓말 상태머신
├── 감정 엔진
├── Discovery 엔진
├── 증거 엔진
└── 판결 채점 엔진
```

**핵심 원칙**: LLM은 "대사 생성"만 하고, **상태 관리와 게임 로직은 모두 클라이언트 룰 엔진**이 담당한다.

## 3-Layer 프롬프트 아키텍처

```
Agent (에이전트 설정)
├── LLM config: model, temperature, max_tokens
├── Block 조합: 15개 재사용 블록 중 선택 + sort_order
└── Context Flags: 어떤 데이터 필드를 주입할지

Prompt Block (프롬프트 블록, 15종)
├── character_base: 캐릭터 기본 설정
├── naming_rules: 호칭 규칙
├── dialogue_rules: 대화 규칙
├── speech_guide_short: 말투 가이드
├── phase3/4/5_guide: 각 페이즈 행동 지침
├── lie_state_guide: 현재 거짓말 상태에 맞는 응답 지침
├── question_type_guide: 질문 유형별 응답 전략
├── evidence_guide: 증거 제시 시 반응 지침
└── output_json_npc: 출력 형식

Data Field (데이터 필드, 25종)
├── 캐릭터: name, archetype, speechStyle, verbalTells...
├── 사건: disputes, evidence, truthLayers...
├── 에이전트 상태: lieState, emotion, trust, fear...
├── 세션: recentDialogue, currentPhase, turnsUsed...
└── 계산값: emotionTier, affinityMatch, discoveryState...
```

## 6단계 거짓말 상태머신 (Lie State Machine)

각 쟁점(dispute)마다 독립적인 6단계 상태머신이 돌아간다.

```
S0: 완전 부정    → "그런 적 없습니다"
 ↓
S1: 맥락 추가    → "그런 적은 있지만 이유가 있었습니다"
 ↓
S2: 부분 인정    → "일부는 맞지만 핵심은 다릅니다"
 ↓
S3: 책임 전가    → "제가 그렇게 된 건 상대방 때문입니다"
 ↓
S4: 감정 호소    → "제 입장에서 한번 생각해 보세요..."
 ↓
S5: 침묵/재구성  → "... (더 이상 부정하지 않음)"
```

### 전이 트리거
- **사실 추궁** + 관련 증거 → 높은 전이 확률
- **Hard Evidence 제시** → 매칭 안 되어도 최소 1단계 보장
- **증인 증언** → S0~S2에서 1단계 진행
- **감정 격앙(explosive)** → 전이 ×1.5 배율
- **셧다운** → 전이 불가 (0배율)

### 전이 확률에 영향을 주는 요소
1. 질문-쟁점 상성 (affinity)
2. 감정 티어 배율 (calm ×0.5, agitated ×1.0, explosive ×1.5)
3. 증거 유형 (hard > soft)
4. 쟁점 가중치 (high/medium/low)

## 7가지 거짓말 유형 (Lie Type)

| 코드 | 유형 | 설명 | 효과적인 공략 |
|------|------|------|--------------|
| LT-1 | 완전 부정 | "그런 적 없다" | Hard Evidence 직접 제시 |
| LT-2 | 부분 인정 | 작은 것 인정, 큰 것 숨김 | 인정한 부분에서 확대 |
| LT-3 | 맥락 왜곡 | 사실은 맞지만 해석이 다름 | 제3자 증언으로 맥락 복원 |
| LT-4 | 책임 전가 | "다 상대방 탓" | 동기 탐색으로 진짜 이유 캐기 |
| LT-5 | 감정 은폐 | 감정으로 논리를 덮음 | 공감 접근으로 마음 열기 |
| LT-6 | 질문 회피 | 답 대신 되물음 | 즉답요구 스킬 |
| LT-7 | 희생 발언 | 작은 것 먼저 인정해 신뢰 확보 | 큰 것을 바로 추궁 |

## 7가지 거짓말 동기 (Lie Motive)

| 코드 | 동기 | 특징 | 공략 루트 |
|------|------|------|----------|
| LM-1 | 자기 방어 | 논리적 방어선 구축 | 논리로 깨기 (사실 추궁) |
| LM-2 | 체면 유지 | 작은 것 먼저 인정, 큰 것 숨김 | 인정에서 확대 |
| LM-3 | 제3자 보호 | 누군가를 지키려 거짓말 | 보복 걱정 해소 → S3에서 S5 직행 |
| LM-4 | 복수 | 공격적 방어 | S2→S4 스킵 (특수 전이) |
| LM-5 | 수치 회피 | **신뢰 루트 핵심** | 비공개 보호 + 공감 → 자발적 고백 |
| LM-6 | 직업/평판 보전 | 격식 있는 방어 | 증거로 논리 깨기 |
| LM-7 | 관계 유지 | 평화를 위해 숨김 | 신뢰 높이면 S4→S5 |

## 에이전트 내부 상태 (3축)

```
trust_toward_judge (0~100)
├── 높을수록: 자발적 공개, 비공개 보호 수락
└── 올리는 법: 공감 접근, 비공개 보호, 일관된 공정함

fear_of_exposure (0~100)
├── 높을수록: 회피 빈도 증가
└── 올리는 법: 증거 제시, 증인 소환

retaliation_worry (0~100)
├── 높을수록: 제3자 보호 강화
└── 낮추는 법: 보호 보장, 분리 심문
```

## Verbal Tell (언어적 단서)

각 캐릭터는 3~4개의 언어적 습관이 있다. 특정 상황에서만 발현되며, 거짓말 탐지의 단서가 된다.

**예시 (한지석 — avoidant 유형):**
- `over_precision` (거짓말 시): 숫자가 비정상적으로 정밀해짐 ("9시 12분쯤", "2,800,000원 딱")
- `counter_question` (궁지에 몰릴 때): 답 대신 되물음
- `timeline_padding` (수치심): 업무 동선을 길게 늘어놓으며 핵심을 회피

**예시 (오세린 — confrontational 유형):**
- `evidence_waving` (거짓말 시): 캡처 하나를 흔들며 단정짓기
- `motive_jump` (상처받을 때): 행동→의도 비약
- `selective_quote` (방어 시): 긴 해명에서 가장 약한 세 단어만 물기
