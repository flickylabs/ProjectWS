# 3. 핵심 메커닉 상세

> **V3 업데이트 (2026-04-02)**: V3 엔진 구조, 미터 시스템, 이벤트 시스템, 사건카드 반영
> **V2 스크립트 전환 (2026-04-02)**: 9종 신규 엔진 추가 (beatSelector/fatigue/npcReaction/interjection/meterStaging/v2DataLoader/phase3LogCollector/misconception/linkEdge). 미터 단계화(4단계 텍스트), 사건카드 조건 해금, 쟁점 층위 UI. 상세는 `11-v2-script-transition-spec.md` 참조

## V3 엔진 구조 (5대 + 3대 추가)

### 기존 5대 엔진
| 엔진 | 역할 |
|------|------|
| **ResponseBlueprint** | 매 턴 stance/defenseMode/allowedAtoms/sentenceCount 결정 |
| **ClaimPolicyV2** | atom 기반 의미 단위 (publicClaim 문장을 원자로 분해) |
| **RuntimeStartBridge** | Phase 1→3 상태 연결 (인정 사실 lieState 반영) |
| **EvidenceChallenge** | attackVector 봉쇄 추적 + 방어선 붕괴 메커닉 |
| **ExecutableVerbalTell** | 검증 가능한 말버릇 규칙 (어휘 훅 + 문장 구조 + 빈도) |

### V3 추가 3대 엔진
| 엔진 | 역할 |
|------|------|
| **questionEffectEngine** | 질문 3종 미터 시스템 (모순토큰/누설미터/신뢰창구) |
| **gameEventTriggerEngine** | 4종 이벤트 조건 평가 + 쿨다운 + V3 텍스트 연결 |
| **v3GameLoopLoader** | DossierCard/StateUnlockAtom/EventText/TransitionBeat/BeatScript 통합 관리 |

## 질문 미터 시스템 (V3 핵심)

3종 질문이 각각 다른 미터를 축적. 미터 간 상충 관계가 전략적 선택을 강제.

### 모순토큰 (사실추궁)
```
이산형: 0~5칸
획득: 사실추궁 성공 시 +1 (연속 시 +2 보너스, 3회 연속부터 diminishing ×0.6)
효과: 2개 — lieState 전이 보너스, 3개 — 모순 이벤트 발동, 4개 — flat_denial 봉쇄
교차: 공감접근 시 -1 자연 감소
```

### 누설미터 (동기탐색)
```
연속형: 0~100%
축적: 동기탐색 시 +15~25 (감정 상태에 따라 보너스: agitated +10, explosive +20)
효과: 50% — suppression 누설 (숨기던 동기 일부 드러남), 80% — 감정 폭발 유도
교차: 사실추궁 시 -3 자연 감소
```

### 신뢰창구 (공감접근)
```
연속형: 0~100%
축적: 공감접근 시 +12~24 (lieState 높을수록 보너스: S4 +12)
효과: 60% — 자백 창구 개방 (3턴간 자발적 시인 가능성 증가)
교차: 사실추궁 시 -2 자연 감소, 모순토큰 -1
```

### 전략적 딜레마
- 사실추궁만 반복 → 모순은 쌓이지만 신뢰 하락, 자백 불가
- 공감만 반복 → 신뢰는 오르지만 모순토큰 감소, 이벤트 미발동
- **3종을 섞는 순서와 타이밍**이 최적 전략

## 이벤트 시스템 (V3)

조건 충족 시 플레이어에게 선택지를 제시하는 4종 이벤트.
우선순위: 모순 > 감정폭발 > 새쟁점 > 끼어들기

### 모순 감지 (Contradiction)
- **조건**: 모순토큰 3+ AND lieState S2 이하 AND 쿨다운 2턴
- **표시**: 양측 진술의 모순점 요약 (V3 사전 작성 텍스트)
- **선택**: 지적한다 (lieState +1, 방어문 축소) / 넘어간다 (토큰 유지)
- **NPC 반응**: 사전 작성 (npcReaction 필드)

### 끼어들기 (Interjection)
- **조건**: 상대방 감정 40+ AND 쿨다운 3턴 AND 현재 쟁점 S1+
- **표시**: 상대방의 끼어들기 대사 (V3 사전 작성)
- **선택**: 허용한다 (새 정보, 권위 -3) / 제지한다 (추궁 유지, 상대 응답 축소)

### 감정 폭발 (Emotional Burst)
- **조건**: 감정 75+ AND (누설미터 80%+ OR 최근 전이) AND 쿨다운 4턴
- **표시**: NPC의 감정 폭발 대사 (V3 사전 작성)
- **선택**: 더 압박한다 (감정 +8, 누설 위험) / 진정시킨다 (신뢰 +12, 감정 -10)

### 새 쟁점 출현 (Dispute Emergence)
- **조건**: 진행 쟁점 2+ AND S3+ 전이 발생 AND hidden 쟁점 존재
- **표시**: "심문 과정에서 새로운 쟁점이 드러났습니다"
- **선택**: 확인 (Dispute Board에 추가)

## 사건카드 (DossierCard)

증거 2개를 묶은 플레이어블 카드. 사건당 3장, 각 카드에 대상별 맞춤 질문 3개.

### 구조
```
사건카드 "자금 흐름"
├── 포함 증거: e-1 (송금 내역) + e-2 (예약 확인서)
├── 관련 쟁점: d-1, d-3, d-5
├── 한지석에게:
│   ├── q1: "수취인이 어떤 역할인지 말하십시오" (identity 공격)
│   ├── q2: "센터 통화 후 돈의 용도를 설명하십시오" (context 공격)
│   └── q3: "원본 확인 후에도 다투실 겁니까" (authenticity 공격, lie진행)
└── 오세린에게:
    ├── q1: "원본이어도 조작 주장을 유지하십니까" (authenticity 공격)
    └── ...
```

### 질문 성공 시
1. **벡터 봉쇄**: 해당 attackVector 방어 불가
2. **atom 해금**: revealAtom → StateUnlockAtom 조기 해금
3. **lie 진행**: lieAdvance=true면 lieState +1

### 해금 시점
턴 4 이후 (초반 탐색 구간 보호)

## StateUnlockAtom (V3)

lieState 전이 시 새로 해금되는 사실 원자. 같은 쟁점을 반복 질문해도 **새 정보가 깊어지는 느낌**.

```
S2 해금: 구조적 사실 ("추석 연휴 간병 공백이 있었다")
S3 해금: 왜곡/전가 이유 ("오해를 바로잡지 못한 건 아내 때문")
S4 해금: 감정/수치심 ("장모 문제를 꺼내는 게 수치스러웠다")
S5 해금: 전면 인정 ("오미숙의 추석 연휴 3일 간병 예약금이었다")
```

## TransitionBeat (V3)

lieState 전이 순간 **LLM 응답 대신 강제 삽입**하는 사전 작성 대사.
전이 순간의 극적 전환을 보장. 사건당 20~24개.

## BeatScript (fallback + V3 확장 예정)

stance별 사전 작성 대사. 현재는 LLM 실패 시 fallback. **×5 변형으로 확장하여 LLM을 대체**하는 방향 검토 중.

## 증거 시스템

### 증거 유형
- **Hard Evidence** (기관 발행): 은행 거래내역, 관공서 문서 — 방어선 붕괴에 효과적
- **Soft Evidence** (개인 자료): 캡처, 메모, 사진 — 균열은 내지만 붕괴는 어려움
- **함정 증거**: 잘린/조작된 증거 — 감별하면 보너스

### EvidenceChallenge (4축 공격 벡터)
```
authenticity: "조작된 겁니다" → 원본 확인으로 봉쇄
context:      "맥락이 잘렸잖아요" → 맥락 복원으로 봉쇄
legality:     "불법으로 얻은 거 아닙니까" → 적법성 확인으로 봉쇄
identity:     "그 사람이 누군지 모르잖아요" → 신원 확인으로 봉쇄
```

전부 봉쇄 시 **full collapse**: forceDefenseMode(concession/silence) + minLieAdvance(1~2)

### 증거 제시 피드백 (V3)
- **버팀 (hold)**: 전이 실패 — NPC가 방어 유지
- **균열 (crack)**: soft 증거로 전이 — 방어에 금
- **붕괴 (collapse)**: hard 증거로 전이 — 방어선 무너짐

## Discovery 시스템

### 진실 공방 (Truth Confrontation)
- A와 B가 같은 쟁점에서 모순 시 발동
- 플레이어: believe_a / believe_b / both_partial / undetermined
- 연쇄 추론 대상 쟁점에 영향

### 증거 감별 (Evidence Appraisal)
- 2회+ 조사 시 trustworthy / partial / suspicious 판단
- 부분 신뢰 시 세부 선택
- 함정 증거 간파 보너스

### 숨겨진 쟁점 발현 (Hidden Dispute Emergence)
- 5가지 경로: 증거, 진실 공방, 증인, 거짓말 붕괴, 감정 폭발
- V3에서 gameEventTriggerEngine이 자동 평가

### 감정 전략 (Emotional Leverage)
- 4-Tier: calm(0~40) → agitated(40~65) → explosive(65~85) → shutdown(85+)
- shutdown 시 모든 질문 효과 감소, 공감만 유효

## Readiness 기반 판결 조건 (V3)

턴 수 대신 **성과 기반**으로 판결 가능 여부 결정.

```
readinessScore = min(cracked, 2)×1 + min(resolved, 2)×2 + min(investigation, 2)×1
               + min(collapse, 2)×1 + min(hidden, 1)×1 + min(confession, 1)×2

판결 가능: 턴 8+ AND score 5+ AND 진행 쟁점 2+ AND 돌파 1+
조기 종료: 턴 6+ AND (고백 1+ OR resolved 2+ OR ...)
강제 판결: 턴 16 → forced_incomplete (감점)
```
