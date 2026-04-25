# 새 기획 — 감정 단계 재설계 (격앙→셧다운, 체념→자백)

> 사용자 의견 (2026-04-25 자리 비움 직전):
> "셧다운 개념을 내가 조정하면서 얘기했는데, 격앙에서 셧다운, 체념에서 순순히 심문에 응하는게 더 좋지 않을까 싶어. 지금은 체념에서 셧다운인 것 같아서 재조정이 필요할 수 있어."

## 현재 vs 새 기획

| 단계 (emotion) | 현재 코드 (Phase A 통일 후) | 새 기획 |
|---|---|---|
| 0~30 (calm) | **침착** — 질문 효과 보통 | 동일 |
| 30~60 (agitated) | **동요** — 균형 상태 | 동일 |
| 60~85 (explosive) | **격앙** — 거짓 전이 1.5배, 자백 확률 30% | **격앙 + 셧다운 트리거 가능** — 격앙 중 누설 임계 도달 시 일시적 응답 거부(2턴) |
| 85~100 (shutdown→resigned) | **체념** — 응답 거부 (2턴 차단) | **체념** — 자백 모드. **순순히 핵심 진실에 응답**. 응답 거부가 아닌 자백 응대 |

## 핵심 의미 분리

새 기획에서:
- **셧다운** = 격앙 단계의 일시 lockout 상태 (2턴). emotion 수치와 별개.
- **체념** = emotion ≥ 85의 감정 단계. 응대 자체는 가능. 자백 모드 활성화.

즉 **셧다운은 emotion tier가 아닌 lockout state**로 분리됨. 둘은 동시에 일어날 수도, 따로 일어날 수도 있음.

## 코드 영향 범위

### 1. discoveryEngine.ts EMOTION_TIER_CONFIG 재정의

```ts
// 현재
{ tier: 'shutdown', min: 85, max: 100, label: '체념', description: '응답을 거부합니다.', ... }

// 새 기획
{ tier: 'resigned', min: 85, max: 100, label: '체념', description: '저항 의지를 잃고 자백 모드에 들어갑니다. 핵심 진실을 순순히 답합니다.', ... }
```

EmotionTier 타입에서 `'shutdown'` → `'resigned'`로 변경 (또는 'shutdown' 유지하되 의미만 변경).

### 2. canInterrogate() 의미 변경

```ts
// 현재
export function canInterrogate(emotionValue: number): boolean {
  return getEmotionTier(emotionValue).tier !== 'shutdown'  // emotion 기반 차단
}

// 새 기획
export function canInterrogate(party: PartyId, state: GameStore): boolean {
  // emotion tier가 아닌 lockoutUntil 단일 기반
  return (state.emotionalLockoutUntil[party] ?? 0) <= state.turnCount
}
```

체념 진입 자체는 차단 신호 아님. lockout만 차단.

### 3. 셧다운 트리거 조건 변경

```ts
// 현재 (useDiscoveryIntegration.ts)
if (!canInterrogate(agent.emotionalState.internalValue)) {
  // emotion >= 85 → 셧다운 진입
  state.setEmotionalLockout(party, turnCount + 3)
}

// 새 기획
const isExplosive = emotion >= 60 && emotion < 85
const leakHigh = state.questionMeters[party]?.leakMeter >= 70
const shouldShutdown = isExplosive && leakHigh && /* 추가 트리거 */
if (shouldShutdown) {
  state.setEmotionalLockout(party, turnCount + 3)
}
```

격앙 + 누설 임계가 동시 충족되면 셧다운 진입. 새 변수·임계 도입 필요.

### 4. 자백 트리거 조건 변경 (Phase C와 통합)

```ts
// 현재 (lieState 기반)
if (lieState === 'S5') { /* 자백 모드 */ }

// 새 기획 (emotion + lieState 결합)
const isResigned = emotion >= 85
const isS5 = lieState === 'S5'
if (isResigned || isS5) { /* 자백 발화 출력 */ }
```

체념 진입이 자백의 1차 트리거. lieState S5 도달은 별개 트리거 (둘 다 가능).

### 5. emotion 자동 격앙 전환 로직 폐기

Phase B-2에서 추가한 "체념 만료 시 emotion = 75 자동 조정" 로직은 **새 기획에서 불필요**. 셧다운이 emotion과 분리되므로 lockout 만료해도 emotion은 그대로 (체념 유지). 체념 = 자백 모드라 응대 가능.

→ `phaseSlice.ts incrementTurn`의 자동 emotion 조정 hook을 제거하거나 다른 의미(체념 유지+lockout 해제)로 변경.

### 6. PartyStatusBar / EmotionGuidePopup 설명 업데이트

체념 description 변경:
- 현재: "응답을 거부합니다. 2턴간 이 당사자에게 질문할 수 없습니다."
- 새: "저항 의지를 잃었습니다. 핵심 진실을 순순히 답합니다. 자백을 유도할 수 있는 상태입니다."

격앙 description 변경:
- 현재: "방어력이 약해져 거짓말 전이가 쉬워집니다. 흥분 상태에서 실수로 자백할 수 있지만, 더 밀면 체념 상태에 빠집니다."
- 새: "방어력이 약해져 거짓말 전이가 쉬워집니다. 흥분이 누적되면 일시적으로 응답을 거부할 수 있고, 더 밀면 체념 상태로 넘어갑니다."

## 설계 질문 (사용자 답변 완료 — 2026-04-25)

1. **셧다운 트리거 조건** → ✅ **안 2** — 모순 추궁 직후 + emotion ≥ 75
2. **셧다운 → 체념 전환** → ✅ **안 1** — 자동으로 체념(85+)으로 진입
3. **체념 도달 후 자백 흐름** → ✅ **안 3** — 시스템 메시지 안내 + 플레이어 선택 (자백 받기 / 추가 추궁)
4. **자백 1회 제한** → ✅ **안 1** — 자백 발화 1회만. 이후 동일 쟁점 추궁은 짧은 재진술/회피
5. **체념 시 응답 톤** → ✅ **안 3** — 캐릭터별 다름 (avoidant B: 짧고 평평한 자백 / victim_cosplay A: 책임 + 두려움)

### 답변 종합 — Phase C 통합 적용 가이드

- **셧다운 트리거** = 격앙(60~85) 중에 모순 추궁이 일어났을 때만 발동. 단순 누설 미터 임계 만으로는 트리거 X. 즉 **"잘못된 모순 추궁의 패널티"** 의미.
- **셧다운 → 체념 자동 전환** = 셧다운 lockout 만료 시 emotion을 85+로 자동 상승시켜 체념 진입. Phase B-2의 "emotion 75로 자동 조정" 로직은 **반대로 변경 필요** (75가 아닌 85로).
- **체념 진입 → 플레이어 선택 모달** = 체념 진입 시 자동 자백 X. 시스템 메시지 + 모달로 "자백 받기 / 추가 추궁" 선택지 제시. '재판관의 수첩'(Phase D)에 자백 등록은 자백 받기 선택 시.
- **자백 후 동일 쟁점 추궁** = 짧은 재진술 (이미 자백한 내용 요약 1줄) + 회피 (더 이상 새 정보 없음). 비활성화는 안 함.
- **체념 응답 톤 캐릭터별** = ScriptedText에 이미 캐릭터별 톤이 박혀 있음 (avoidant 짧음 / victim_cosplay 분노+두려움 / confrontational 잠시 침묵 + 작은 목소리). Phase C에서 자백 entry 호출 시 캐릭터별 분기 자동 적용 가능.

## 권장 적용 순서 (Phase C 일부로 통합)

1. **GPT Pro 자백 스크립트 산출** (12개 자백 entry) — 이미 패키지 준비됨
2. **EmotionTier 'shutdown' 라벨 변경** — 'shutdown' → 'resigned' (또는 의미만 변경)
3. **canInterrogate / runDiscoveryChecks 분리** — emotion 기반 X, lockout 기반만
4. **셧다운 트리거 조건 신설** — 격앙 + 누설 임계 (위 설계 질문 1 답변 기반)
5. **체념 진입 시 자백 모드 활성화** — 위 설계 질문 3 답변 기반
6. **자백 1회 제한 + '재판관의 수첩' 등록** — Phase D 인프라와 통합
7. **PartyStatusBar / EmotionGuidePopup 설명 업데이트**
8. **Phase B-2 incrementTurn emotion 자동 조정 로직 제거 또는 변경**

## 임팩트 평가

- **게임 플레이 경험**: 체념 = 자백이라는 기획이 더 직관적. 사용자가 "체념 = 응답 거부"의 모순을 지적한 이유.
- **셧다운의 의미 강화**: 격앙 단계의 보너스 결과로 일시 lockout = "잘못 추궁하면 일시적 손실"이라는 게임 메카닉
- **자백의 무게 강화**: 체념 진입 = 자백 = '재판관의 수첩' 등록 = 게임 핵심 진행 = 결정적 순간
- **코드 변경 범위**: emotionEngine + dispatch 가드 + scriptedText 트리거 = 중간~큰 작업

## Phase B 적용 결정 사항이 새 기획에 영향

Phase B-1·B-2·B-3는 현재 구조 기반 (체념=셧다운=응답 거부). 새 기획 적용 시:
- B-1 lockoutUntil +3은 그대로 유지 (셧다운 자체는 새 기획에도 존재)
- B-2 emotion 자동 격앙 전환은 새 기획에서 폐기 또는 의미 변경
- B-3 증거 제시 차단은 그대로 유지 (셧다운 lockout 중에는 모든 액션 차단)
- B-4 우회 안내는 그대로 유지

→ Phase B는 새 기획 도입 시 일부 조정 필요하지만 큰 충돌 없음.

## 결론

**현재 Phase B는 임시 픽스로 유지**. 사용자 복귀 후 위 설계 질문 5개 답변 → Phase C 자백 시스템 재설계 시 새 기획 통합 적용. GPT Pro 자백 스크립트 산출물 도착 시 본격 진행.
