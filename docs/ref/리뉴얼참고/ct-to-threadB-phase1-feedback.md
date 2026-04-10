# CT → 스레드 B: Phase 1 피드백 + 인터랙션 보완 작업

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-08

---

## Phase 1 결과 평가

프로토타입 CSS/SVG 통합, 클래스 구조 전환, 타입 체크/빌드 통과 — 잘 됐습니다.
하지만 **인터랙션 연결이 빠져 있어서** 실제 사용 시 제대로 동작하지 않는 상태입니다.

아래 3가지를 수정해 주세요.

---

## 이슈 1: 캐릭터 클릭 ↔ 우패널 심문 대상 동기화 (Critical)

### 현재 문제
- `PCBottomDock.tsx:46` — `const [targetParty, setTargetParty] = useState<PartyId>('a')`
- `PCRightPanel.tsx:47` — `const [targetParty, setTargetParty] = useState<'a' | 'b'>('a')`
- **두 컴포넌트가 각자 별도 state**를 가지고 있어, 핫바에서 캐릭터를 클릭해도 우패널의 심문 대상이 안 바뀜

### 해결 방안

Zustand store에 `pcTargetParty` 상태를 추가하여 공유:

```typescript
// useGameStore.ts (PC UI 슬라이스에 추가)
pcTargetParty: PartyId        // 기본값 'a'
setPcTargetParty: (party: PartyId) => void
```

그 다음 PCBottomDock, PCRightPanel 양쪽에서:
```typescript
const targetParty = useStore(s => s.pcTargetParty)
const setTargetParty = useStore(s => s.setPcTargetParty)
```

**추가 연동이 필요한 곳들:**
- 핫바 캐릭터 카드 클릭 → 우패널 심문 대상 변경
- 핫바 심문 슬롯 실행 시 → 해당 대상에게 질문
- 좌패널에서 쟁점 클릭 시 → `lastFocusedDisputeId`가 변경되고 핫바 효과성 재계산

---

## 이슈 2: 모바일 ActionPanel이 핫바와 겹침 (Critical)

### 현재 문제
- `PCApp.tsx:92` — `getActionPanel(currentPhase)`이 모바일용 `ActionPanel` 컴포넌트를 그대로 반환
- `PCBottomDock.tsx:245` — `<div className="pc-action-panel-shell">{actionPanel}</div>`로 마운트
- 결과: **모바일 디자인의 액션 패널**이 PC 핫바 위에 그대로 올라감

### 해결 방안

Phase별로 PC 핫바가 이미 해당 기능을 제공하므로, **Phase 3~5에서는 actionPanel을 null로**:

```typescript
// PCApp.tsx의 getActionPanel 수정
function getActionPanel(phase: GamePhase) {
  switch (phase) {
    case GamePhase.Phase1_InitialStatement:
      return <AutoDialoguePhase ... />     // Phase 1/2는 유지 (자동 재생이므로)
    case GamePhase.Phase2_Rebuttal:
      return <AutoDialoguePhase ... />
    case GamePhase.Phase3_Interrogation:
    case GamePhase.Phase4_Evidence:
    case GamePhase.Phase5_ReExamination:
      return null  // ← PC 핫바가 대체. ActionPanel 제거
    case GamePhase.Phase6_Mediation:
      return <Phase6_Mediation />          // 중재는 별도 UI이므로 유지
    case GamePhase.Phase7_Verdict:
      return <VerdictScreen />             // 판결도 유지
    default:
      return null
  }
}
```

Phase 1/2의 `AutoDialoguePhase`는 "탭하여 다음" 형태라서 핫바와 겹치지 않으므로 유지해도 됩니다. 단, Phase 6/7은 전체화면 오버레이이므로 `pc-action-panel-shell` 안에 들어가면 안 되고, 별도 처리가 필요합니다.

### Phase 6/7 처리
중재(`Phase6_Mediation`)와 판결(`VerdictScreen`)은 전체 화면 오버레이가 자연스럽습니다. `PCCourtLayout` 바깥에서 직접 렌더링하는 방식이 나을 수 있습니다:

```typescript
// PCApp.tsx — Phase 6/7은 PCCourtLayout 대신 직접 렌더링
if (currentPhase === GamePhase.Phase6_Mediation) {
  return <div className="pc-fullscreen-phase"><Phase6_Mediation /></div>
}
if (currentPhase === GamePhase.Phase7_Verdict) {
  return <div className="pc-fullscreen-phase"><VerdictScreen /></div>
}
```

---

## 이슈 3: 핵심 발언 노트 — 요약 키워드 + 확장 (UX 개선)

### 현재 문제
- 발언 전문이 그대로 표시되어 우패널이 너무 길어짐
- 여러 노트가 쌓이면 스크롤만 늘어남

### 해결 방안

각 노트를 **요약 키워드 1줄 + 클릭/호버 시 확장**하는 형태로:

```
┌─────────────────────────────────────┐
│ T7  금액 은폐 · 계좌 불일치          │  ← 접힌 상태 (키워드만)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ T7  금액 은폐 · 계좌 불일치      ▾   │  ← 펼친 상태
│                                     │
│ "그 돈은 생활비로 쓴 겁니다. 따로   │
│  빼돌린 게 아니라 가계부에 다 적혀  │
│  있어요."                          │
│                                     │
│ 🔗 d-2 금액 불일치                  │  ← 관련 쟁점
└─────────────────────────────────────┘
```

**요약 키워드 생성 방법** (런타임에서):
- `entry.relatedDisputes`가 있으면 해당 쟁점명 사용
- `entry.behaviorHint`가 있으면 그것을 키워드로 사용
- 둘 다 없으면 텍스트 첫 20자 + `...` 로 축약

구현:
```typescript
function getNoteKeyword(entry: DialogueEntry | PinnedNote, disputes: Dispute[]): string {
  // 1순위: 관련 쟁점명
  if ('relatedDisputes' in entry && entry.relatedDisputes?.length) {
    const names = entry.relatedDisputes
      .map(id => disputes.find(d => d.id === id)?.name)
      .filter(Boolean)
    if (names.length) return names.join(' · ')
  }
  // 2순위: behaviorHint
  if ('behaviorHint' in entry && entry.behaviorHint) {
    return entry.behaviorHint
  }
  // 3순위: 텍스트 축약
  return entry.text.length > 20 ? entry.text.slice(0, 20) + '…' : entry.text
}
```

각 노트에 `expandedId` state를 두고 클릭으로 토글:
```typescript
const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null)
```

---

## 작업 우선순위

| 순서 | 이슈 | 중요도 | 예상 범위 |
|------|------|--------|----------|
| 1 | 캐릭터 ↔ 우패널 동기화 | Critical | store 1개 필드 + 2개 컴포넌트 수정 |
| 2 | ActionPanel 겹침 해소 | Critical | PCApp.tsx getActionPanel 수정 |
| 3 | 노트 요약/확장 | UX 개선 | PCRightPanel 노트 섹션 수정 |

이슈 1, 2를 먼저 해결하고, 이슈 3은 그 다음에 진행해 주세요.
완료 후 `npm run dev:pc`로 브라우저 시각 확인까지 한 뒤 결과를 알려주세요.
