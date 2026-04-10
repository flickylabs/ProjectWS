# CT → 스레드 B: DEV TEST 구현 방향 수정

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-09
> 중요: 기존 DEV TEST 구현이 잘못됨

---

## 문제

DEV TEST가 **별도 UI/별도 플로우**로 만들어져 있습니다. 이러면 안 됩니다.

## 올바른 방향

**기존 PC UI의 사건 선택 화면(PCCaseBrowser)에 필터 버튼 하나만 추가**하는 것입니다.

### 변경 전 (잘못된 구현)
```
Home → [DEV TEST 섹션] → 별도 카드 → 별도 실행 경로
```

### 변경 후 (올바른 구현)
```
Home → [사건 시작] → PCCaseBrowser → [DEV 필터 ON] → 완성 11건만 표시 → 사건 선택 → 동일한 게임 플레이
```

### 구체적으로

1. **PCCaseBrowser 상단**에 토글 버튼 하나 추가:
   - `[DEV: 완성 케이스만]` — 클릭하면 완성 11건만 필터링
   - 비활성 시 기존 전체 목록 표시

2. **완성 케이스 ID 목록**:
```typescript
const COMPLETED_CASE_IDS = [
  'case-headline-01',
  'case-headline-02', 
  'case-spouse-11',
  'case-friend-03',
  'case-tenant-02',
  'case-workplace-11',
  'case-partnership-09',
  'case-neighbor-08',
  'case-tenant-09',
  'case-spouse-12',
  'case-family-09',
]
```

3. **필터 로직**: 기존 카테고리 필터와 동일한 방식으로, `getAllCases()` 결과에서 `COMPLETED_CASE_IDS`에 포함된 것만 표시

4. **게임 플레이는 완전히 동일**: 사건 선택 후의 모든 흐름(Case Briefing → Phase 1~7 → Result)은 기존과 100% 동일한 UI/기능을 사용

### Home의 DEV TEST 섹션

Home에 별도 섹션을 만들었다면 **제거**하세요. 대신 "사건 시작" 버튼 옆에 작은 뱃지나 토글로 처리:

```
[⚖️ 사건 시작]  [DEV 11건]
```

또는 PCCaseBrowser 내부에서만 필터를 두고 Home에는 아무것도 추가하지 않아도 됩니다.

### 핵심 원칙

- 별도 UI 금지
- 별도 실행 경로 금지
- 기존 동선에 **필터만 추가**
- 플레이는 동일한 PCCourtLayout + PCBottomDock + PCLeftPanel + PCRightPanel + PCDialogueLog
