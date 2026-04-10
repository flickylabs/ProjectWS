# CT → 스레드 B: 엔진 데이터 연동 가이드

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-08
> 관련: 스레드 A에 `ct-to-threadA-template-enrichment.md` 요청 완료

---

## 배경

스레드 A에 RuntimeCaseData 템플릿 보강을 요청했습니다. 보강되는 필드들이 PC UI에서 올바르게 반영되어야 게임플레이가 성립합니다.

이 문서는 **스레드 A가 채우는 데이터 → 스레드 B가 UI에서 어떻게 소비해야 하는지**를 정리합니다.

---

## 1. 증거 해금 상태 반영

### 데이터 변경 (스레드 A)
```
evidence[].requires: string[]        — 선행 증거 ID 목록 (비어있으면 초기 해금)
evidence[].requiredLieState?: string  — 연결된 쟁점의 LieState 조건
```

### UI 대응 (스레드 B)

**좌패널 증거 섹션**:
- `unlocked: false`인 증거 → **표시하지 않거나, 잠금 아이콘 + 흐림 처리**
- `unlocked: true`이지만 `surfacedIds`에 없으면 → dimmed 처리 (현재 구현 OK)
- 새 증거가 해금될 때 → **해금 알림 연출** (gold glow + "새 증거 발견" 토스트)

```typescript
// 이미 있는 store 값 활용
const evidenceStates = useStore(s => s.evidenceStates)
// unlocked 여부로 표시/숨김 결정 — UI에서 임의로 필터링하지 말 것
const isUnlocked = evidenceStates[evidenceId]?.unlocked ?? false
```

**핫바 증거 슬롯**:
- 잠긴 증거는 핫바에 장착 불가
- 드래그 시 `unlocked` 체크 → false면 드랍 거부 + "아직 해금되지 않았습니다" 피드백

### 해금 시점 감지

증거 해금은 `presentEvidence()` 또는 `investigateEvidence()` 호출 시 `checkUnlocks()`에서 자동 발생합니다. 반환값 `newlyUnlocked: string[]`을 받아서 UI 피드백을 줄 수 있습니다.

```typescript
// evidenceSlice.ts:89
return newlyUnlocked  // 새로 해금된 증거 ID 배열
```

이 값을 핫바나 좌패널에서 감지하여 알림을 표시하면 됩니다.

---

## 2. LieState 전이와 증거 연동

### 데이터 변경 (스레드 A)
```
lieConfig[].transitions[]:
  trigger: "hard_evidence"  — 증거 제시 시 전이
  trigger: "direct_question" — 질문만으로 전이
```

### UI 대응 (스레드 B)

**우패널 LieState 바**:
- 현재 구현(32px 세그먼트)은 OK
- **추가**: 현재 상태에서 다음 전이에 필요한 조건을 힌트로 표시

```
┌──────────────────────────────────────────┐
│  S0   S1   [S2]   S3   S4   S5          │
│            ↑ 현재                         │
│  💡 다음 단계: 증거 제시가 필요합니다      │  ← 전이 트리거가 hard_evidence일 때
└──────────────────────────────────────────┘
```

이건 `lieConfig`의 현재 상태에서 다음 전이의 `trigger`를 읽으면 됩니다:

```typescript
const currentConfig = lieConfigs[targetParty === 'a' ? 'a' : 'b']
  ?.find(c => c.disputeId === focusedDisputeId)
const nextTransition = currentConfig?.transitions
  .find(t => t.from === currentLieState)

if (nextTransition?.trigger.includes('hard_evidence')) {
  // "증거 제시가 필요합니다" 힌트 표시
}
```

**핫바 심문 슬롯 효과성**:
- 현재 `computeEffectiveness()`로 strong/normal/weak 표시 중 — 이건 유지
- **추가**: 현재 전이 트리거가 `hard_evidence`인데 질문 슬롯을 선택하면 → "이 단계에서는 증거 제시가 더 효과적입니다" 피드백

---

## 3. 증거 조합 UI

### 데이터 변경 (스레드 A)
```json
evidenceCombinations: [
  { "requires": ["e-1", "e-2"], "upgradesTo": "hard", "proves": ["d-1", "d-2"] },
  { "requires": ["e-3", "e-4"], "upgradesTo": "hard", "proves": ["d-2", "d-3"] }
]
```

### UI 대응 (스레드 B)

**좌패널 증거 카드**:
- 두 증거가 모두 제시되면 → 조합 발동 알림 (gold glow + "증거 조합 발견")
- 조합 가능한 증거 쌍에 시각적 힌트 (같은 accent color, 연결선 등)

**핫바**:
- 증거 조합은 두 증거를 **순서대로 제시**하면 자동 발동 (엔진이 처리)
- 특별한 UI 조작이 필요하지 않음 — 결과 알림만 표시하면 됨

---

## 4. Phase별 액션 제한 (기존 피드백 보강)

이전 피드백에서도 언급했지만, 데이터 보강과 함께 정리합니다:

| Phase | 사용 가능 액션 | 제한 |
|-------|-------------|------|
| Phase 3 (심문) | 질문 3종 + 자유질문 | 증거 제시 슬롯 비활성 |
| Phase 4 (증거) | 증거 제시/조사/감별 + 질문 | 전부 활성 |
| Phase 5 (재심문) | 질문 + 증거 + 특수행동 | 전부 활성 |

핫바 페이지별로:
- **F1 심문**: Phase 3부터 활성
- **F2 증거**: Phase 4부터 활성 (Phase 3에서는 탭 자체를 비활성)
- **F3 특수**: Phase 5부터 활성 (Phase 3~4에서는 비활성)

```typescript
const canUseEvidence = phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence)
const canUseSpecial = phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination)
```

---

## 5. 리소스 소비 체크

```typescript
// 질문 실행 전
if (resources.investigationTokens < 1) → 슬롯 비활성 + "조사 토큰 부족"

// 스킬 사용 전
if (resources.skillPoints < 1) → 슬롯 비활성 + "스킬 포인트 부족"

// 증거 조사 전 (조사 횟수 제한)
const stage = evidenceStates[id]?.investigatedActions.length ?? 0
if (stage >= 3) → "최대 조사 완료"
```

---

## 요약: 스레드 B 체크리스트

| # | 항목 | 현재 | 목표 |
|---|------|------|------|
| 1 | 잠긴 증거 표시 | 전부 보임 | `unlocked: false`는 숨김/잠금 표시 |
| 2 | 새 증거 해금 알림 | 없음 | gold glow + 토스트 |
| 3 | LieState 전이 힌트 | 없음 | "증거 제시 필요" 등 다음 조건 표시 |
| 4 | 증거 조합 발동 알림 | 없음 | 조합 발견 연출 |
| 5 | Phase별 핫바 탭 제한 | 전부 활성 | Phase에 따라 비활성 |
| 6 | 리소스 부족 시 비활성 | 미체크 | 토큰/스킬 부족 시 비활성 + 메시지 |
| 7 | 증거 제시/조사 store 호출 | 미확인 | `presentEvidence()`, `investigateEvidence()` 호출 확인 |

**중요**: 위 항목들은 스레드 A의 데이터 보강과 무관하게, **현재 엔진 로직으로도 대응해야 하는 것들**입니다. 데이터가 보강되면 더 명확하게 작동하지만, 기본 체크(unlocked, phase, resources)는 지금 바로 적용 가능합니다.
