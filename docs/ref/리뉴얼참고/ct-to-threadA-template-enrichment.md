# CT → 스레드 A: 템플릿 조건부 데이터 보강 요청

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-08
> 중요도: Critical — 게임플레이 핵심 루프에 직결

---

## 배경

PC 스모크 테스트 + UI 확인 결과, headline-01/02가 validator PASS이고 전체 루프 완주도 가능하지만, **게임플레이의 핵심 메커니즘이 작동하지 않는 상태**입니다.

원인: 엔진은 조건부 시스템을 전부 지원하지만, **RuntimeCaseData에서 해당 필드를 활용하지 않고 있습니다.** 결과적으로:

- 증거 6개 중 5개가 처음부터 전부 해금 → 탐색/발견의 재미 없음
- 거짓말 전이가 질문만 하면 무조건 진행 → 증거 제시의 의미 없음
- 증거 조합이 1개뿐 → 조합 시스템이 사실상 미작동

## 엔진이 이미 지원하는 조건부 필드 (코드 확인 완료)

### 1. `evidence[].requires: string[]`

**위치**: `src/engine/evidenceEngine.ts:50-53`

```typescript
const allRequirementsMet = e.requires.every((reqId) => {
  const reqState = updated[reqId]
  return reqState && (reqState.presented || reqState.unlocked)
})
```

선행 증거가 제시되거나 해금되어야 이 증거가 해금된다.

**headline-01 현황**: 5/6개가 `requires: []` → 전부 초기 해금

### 2. `evidence[].requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'`

**위치**: `src/engine/evidenceEngine.ts:57-65`, `src/types/case.ts:72`

```typescript
if (e.requiredLieState && lieStates) {
  const reqRank = LIE_STATE_RANK[e.requiredLieState] ?? 0
  const disputeIds = e.proves ?? []
  const maxDisputeRank = Math.max(
    ...disputeIds.map(dId => LIE_STATE_RANK[lieStates[dId] ?? 'S0'] ?? 0)
  )
  if (maxDisputeRank < reqRank) continue  // 조건 미충족 → 해금 안 됨
}
```

이 증거의 `proves`에 연결된 쟁점의 LieState가 지정 값 이상이어야 해금된다.

**headline-01 현황**: 전체 미설정 → LieState와 무관하게 해금

### 3. `lieConfig[].transitions[].trigger` 내 증거 연동

**위치**: `src/engine/lieStateMachine.ts:58`

```typescript
if (trigger.includes('hard_evidence') && currentState !== 'S5') {
  const nextState = getNextState(currentState)
}
```

현재 `trigger` 문자열에 `hard_evidence`가 포함되면 전이하는 구조. 데이터에서 어떤 증거가 `hard_evidence` 트리거를 발동시키는지는 `hooks/useActionDispatch.ts`에서 증거 제시 시 결정됨.

**headline-01 현황**: 모든 전이가 `requiredEvidence: none` → 어떤 증거를 제시해도 전이

### 4. `evidenceCombinations`

**위치**: `src/store/slices/evidenceSlice.ts:80-86`

```typescript
const combos = checkCombinations(updated, evidenceCombinations)
```

두 증거를 모두 제시하면 새로운 사실이 드러나는 조합.

**headline-01 현황**: 1개만 (`e-4 + e-6 → hard`) → 사실상 미작동

### 5. `evidence[].investigationStages`

3단계 조사 질문 시스템. 이건 headline-01에 **잘 설정되어 있음** (각 증거당 stage 0~2).

---

## 요청 사항

### 요청 1: 증거 해금 체인 설계 (requires + requiredLieState)

**모든 케이스에서** 증거가 점진적으로 발견되도록 해금 조건을 설정해 주세요.

설계 원칙:
- **초기 제공 증거**: `baseEvidenceIds`에 포함된 2~3개만 `requires: []`
- **1차 해금 증거**: 초기 증거를 제시하거나 조사하면 해금 (`requires: ["e-1"]`)
- **2차 해금 증거**: 1차 증거 + LieState 조건 (`requires: ["e-2"], requiredLieState: "S2"`)
- **최종 증거**: 복수 증거 조합 필요 (`requires: ["e-1", "e-5"]`)

headline-01 예시:
```
e-1 원본/업로드본 비교:    requires: []                                ← baseEvidence
e-3 구청 위생 시정:        requires: []                                ← baseEvidence
e-5 점주 단체방 캡처:      requires: []                                ← baseEvidence
e-2 주방 CCTV:            requires: ["e-3"], requiredLieState: "S1"    ← e-3 제시 + d-2가 S1+
e-4 사전 협조 DM:          requires: ["e-1"], requiredLieState: "S2"    ← e-1 제시 + d-3가 S2+
e-6 평점 타임라인:         requires: ["e-1", "e-5"]                    ← 현재와 동일
```

### 요청 2: 거짓말 전이에 증거 연동

**핵심 전이 관문**에서 특정 증거를 제시해야 전이되도록 설정해 주세요. 모든 전이가 아니라, **게임 진행에서 중요한 2~3개 관문**만.

설계 원칙:
- S0→S1: 직접 질문만으로 전이 OK (초기 진입 허들 낮춤)
- **S1→S2 또는 S2→S3**: 핵심 증거를 제시해야 전이 (증거 제시에 의미 부여)
- S3→S5: 감정/책임 추궁으로 전이 OK (마무리 국면)

headline-01 예시:
```
lieConfigB (정태성):
  d-2 (위생 위반):
    S0 → S1: trigger: "direct_question"                           ← 현재와 동일
    S1 → S2: trigger: "hard_evidence"  ★ e-2 제시 시 발동         ← 증거 연동 추가
    S2 → S3: trigger: "timeline_question" ★ e-3 제시 후 발동      ← 증거 연동 추가
    S3 → S5: trigger: "responsibility_question"                    ← 현재와 동일

  d-4 (신상 보복):
    S0 → S1: trigger: "direct_question"
    S1 → S2: trigger: "hard_evidence"  ★ e-5 제시 시 발동
    S2 → S4: trigger: "emotion_threshold"
    S4 → S5: trigger: "provenance_question"
```

현재 엔진은 `trigger.includes('hard_evidence')` 체크만 하므로, 실제 구현은:
- useActionDispatch에서 증거 제시 시 `hard_evidence` 트리거를 날림
- 어떤 증거가 어떤 쟁점에 영향을 주는지는 `evidence[].proves`로 결정됨

따라서 **데이터에서 해야 할 것**: 증거의 `proves`가 올바른 쟁점을 가리키고 있으면 됨 (이건 이미 OK). 추가로 `lieConfig`의 전이 설명에 "이 단계는 e-X 증거가 필요하다"는 것을 명시하면 됨.

### 요청 3: 증거 조합 보강

케이스당 **최소 2~3개** 의미 있는 증거 조합을 추가해 주세요.

설계 원칙:
- 조합은 "따로 보면 약하지만 같이 보면 결정적"인 증거 쌍
- `upgradesTo`로 신뢰도를 높이거나, 새로운 쟁점 연결(`proves`)을 추가

headline-01 예시:
```json
[
  {
    "requires": ["e-1", "e-2"],
    "upgradesTo": "hard",
    "proves": ["d-1", "d-2"],
    "description": "편집본과 원본 CCTV를 대조하면 의도적 편집 구간이 드러난다"
  },
  {
    "requires": ["e-3", "e-4"],
    "upgradesTo": "hard",
    "proves": ["d-2", "d-3"],
    "description": "위생 시정 이력과 협조 요청 DM 시점이 겹쳐 상호 이용 관계가 보인다"
  },
  {
    "requires": ["e-4", "e-6"],
    "upgradesTo": "hard",
    "proves": ["d-3"],
    "description": "현재도 있음 — 유지"
  }
]
```

---

## 적용 범위

| 대상 | 상태 | 작업 |
|------|------|------|
| **headline-01** | 완성, PASS | requires/requiredLieState/조합 보강 |
| **headline-02** | 완성, PASS | 동일하게 보강 |
| **pilot-spouse-11** | AuthoringSpec 작성 중 | 처음부터 반영 |
| **이후 모든 케이스** | 미작성 | 파이프라인 템플릿에 포함 |

### 파이프라인 템플릿 반영

`CaseAuthoringSpec` → `RuntimeCaseData` 변환 시, 다음 필드가 **의미 있게 채워져야** 합니다:

```
evidence[].requires         — 비어있으면 안 됨 (baseEvidence만 [] 허용)
evidence[].requiredLieState — 중후반 증거에 필수
lieConfig[].transitions     — 핵심 관문에 hard_evidence 트리거 + 실제 증거 연결
evidenceCombinations        — 케이스당 최소 2~3개
```

이 필드들의 설계 기준을 파이프라인의 `stage1a` (RuntimeCaseData 생성) 또는 `stage1c` (evidence enrichment)에 내장해 주세요.

### 검증 추가 요청

`validate-scripted-text.cjs` 또는 별도 검증 스크립트에 다음 체크를 추가할 수 있으면 좋겠습니다:

- [ ] `baseEvidenceIds` 외의 증거 중 `requires: []`인 것이 없는지
- [ ] `requiredLieState`가 하나도 없으면 경고
- [ ] `evidenceCombinations`가 0~1개면 경고
- [ ] `lieConfig` 전이에 `hard_evidence` 트리거가 하나도 없으면 경고

---

## 우선순위

1. **headline-01 보강** — 이미 스모크 테스트 통과한 기준 케이스이므로 즉시 적용 가능
2. **headline-02 보강** — headline-01과 동일 패턴
3. **파이프라인 템플릿 반영** — 이후 케이스 자동 적용
4. **검증 스크립트 추가** — 누락 방지
