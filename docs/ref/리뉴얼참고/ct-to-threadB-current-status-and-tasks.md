# CT → 스레드 B: 현재 상황 공유 + 작업 요청 통합

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-09
> 중요도: 이전 피드백 문서들을 대체하는 **최신 통합 문서**

---

## 현재 상황 요약

### 스레드 A (스크립트 생성)가 완료한 것

5건의 케이스가 **enriched 데이터**로 완성되었습니다:
- `headline-01`, `headline-02`, `spouse-11`, `friend-03`, `tenant-02`
- 전부 validator PASS
- 증거 해금 체인(`requires` + `requiredLieState`), 증거 조합(`evidenceCombinations`) 보강 완료

각 케이스는 `src/data/cases/generated/`에 JSON이 있고, `manifest.json`에 등록되어 있어 **앱 실행 시 자동으로 로드**됩니다.

### CT가 수행한 엔진 수정

`src/engine/evidenceEngine.ts:22` — 증거 초기 상태 생성 로직 수정:

```typescript
// 수정 전
unlocked: e.requires.length === 0

// 수정 후
unlocked: e.requires.length === 0 && !e.requiredLieState
```

이 수정으로 `requiredLieState`가 설정된 증거는 초기에 잠깁니다. 이전에는 `requires: []`이면 `requiredLieState`가 있어도 초기 해금이 되는 버그가 있었습니다.

수정 결과 — 5건 모두 **초기 3개 해금 / 3개 잠금**:
```
headline-01: 해금 [e-1, e-3, e-5] / 잠금 [e-2, e-4, e-6]
headline-02: 해금 [e-1, e-2, e-5] / 잠금 [e-3, e-4, e-6]
spouse-11:   해금 [e-1, e-2, e-3] / 잠금 [e-4, e-5, e-6]
friend-03:   해금 [e-1, e-2, e-5] / 잠금 [e-3, e-4, e-6]
tenant-02:   해금 [e-1, e-2, e-3] / 잠금 [e-4, e-5, e-6]
```

---

## 스레드 B 작업 요청

이전 피드백 문서들(`ct-to-threadB-intro-and-layout-feedback.md`, `ct-to-threadB-engine-data-alignment.md`)의 내용을 아래에 통합 정리합니다.

### 작업 1: DEV TEST 섹션 추가 (즉시)

PC Home 화면에 **완성 케이스 직접 실행** 섹션을 추가해 주세요. 위치는 quick-grid 아래, footer 위.

대상 5건:
```typescript
const DEV_TEST_CASES = [
  { id: 'case-headline-01', label: 'headline-01', desc: '천만 조회의 저녁', tag: '헤드라인' },
  { id: 'case-headline-02', label: 'headline-02', desc: '사생팬 맞춤형 셀카', tag: '헤드라인' },
  { id: 'case-spouse-11',   label: 'spouse-11',   desc: '보험금의 설계도', tag: '부부' },
  { id: 'case-friend-03',   label: 'friend-03',   desc: '협업 댓글 저격 + 합성 DM', tag: '친구' },
  { id: 'case-tenant-02',   label: 'tenant-02',   desc: '곰팡이 무단 출입 + 타임스탬프 조작', tag: '세입자' },
]
```

- `getCaseById(id)`로 데이터 로드 → 카드 클릭 시 `handleStartCase(caseData)` 호출
- 데이터 없으면 비활성 + "데이터 없음" 표시
- `DEV TEST` 뱃지(빨간색)로 시각 구분 — 나중에 제거 예정이므로 분리된 CSS 클래스 사용
- dashed border로 임시 영역임을 명시

### 작업 2: 증거 해금/잠금 UI 반영 (Critical)

엔진 수정으로 이제 **잠긴 증거가 실제로 존재**합니다. UI에서 이를 반영해야 합니다.

**좌패널 증거 섹션**:
- `unlocked: false`인 증거 → 숨기거나 잠금 아이콘 + 흐림 처리
- `unlocked: true` 중 `surfacedIds`에 있으면 → 정상 표시
- `unlocked: true` 중 `dimmedIds`에 있으면 → dimmed 표시 (현재 구현 OK)

**해금 시점 알림**:
- `presentEvidence()` 반환값 `newlyUnlocked: string[]`을 감지하여 알림
- "새 증거 발견" 토스트 또는 좌패널에서 gold glow 연출

**핫바 증거 슬롯**:
- 잠긴 증거는 핫바에 장착 불가 — 드래그 시 `unlocked` 체크

### 작업 3: Phase별 액션 제한 (Critical)

현재 핫바에서 모든 액션이 Phase 무관하게 활성화되어 있습니다:

```typescript
const canUseEvidence = phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence)
const canUseSpecial = phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination)
```

- F1 심문 탭: Phase 3부터 활성
- F2 증거 탭: **Phase 4부터 활성** (Phase 3에서는 탭 비활성)
- F3 특수 탭: **Phase 5부터 활성**

리소스 부족 시:
- `investigationTokens < 1` → 질문 슬롯 비활성 + "토큰 부족"
- `skillPoints < 1` → 스킬 슬롯 비활성 + "포인트 부족"

### 작업 4: 증거 제시/조사 store 함수 호출 확인

핫바에서 증거 슬롯 실행 시 아래 store 함수가 호출되는지 확인:
- 증거 제시: `store.presentEvidence(evidenceId, targetParty)` → LieState 전이 트리거 + 해금 체크
- 증거 조사: `store.investigateEvidence(evidenceId, subAction)` → 해금 체크
- 증거 뷰어: `store.setPendingEvidenceView(evidenceId)`

이 함수들이 호출되지 않으면 게임 상태가 변하지 않아 해금 체인이 작동하지 않습니다.

### 작업 5: Home/Intro 개선 (이전 피드백 유지)

`ct-to-threadB-intro-and-layout-feedback.md`의 Part 1~5 내용 유지:
- Home 비주얼 개선 (FeatureCard 제거, 메시지 모바일 통일)
- 모바일 컴포넌트 import 금지 — PC 전용 UI
- 최소 사이즈 1280×720 + overflow: auto (모든 화면에 공통 적용)
- IntroSlides PC 전용 구현

### 작업 6: 메인 레이아웃 미세 조정

- 좌패널: 미터 → 쟁점 → 증거 순서 변경, 재판관 성향은 Home으로
- 우패널: 비교 트레이를 오버레이로 분리, 타임라인 기본 접힘
- 중앙: Phase 1/2 "클릭/Space로 다음" 힌트

---

## 우선순위

| 순서 | 항목 | 이유 |
|------|------|------|
| 1 | **창 최소 사이즈 대응** | 이게 없으면 모든 화면에서 하단 잘림 |
| 2 | **DEV TEST 섹션** | 완성 케이스 테스트 진입점 |
| 3 | **증거 해금/잠금 UI** | 엔진 수정 완료, UI만 반영하면 핵심 루프 작동 |
| 4 | **Phase별 액션 제한** | 게임 진행 흐름 정상화 |
| 5 | **증거 store 함수 호출 확인** | 해금 체인 작동 전제 조건 |
| 6 | Home/Intro 개선 | 첫인상 |
| 7 | 메인 레이아웃 미세 조정 | 후순위 |

1~5를 먼저 진행해 주세요. 특히 1~3이 가장 긴급합니다.
