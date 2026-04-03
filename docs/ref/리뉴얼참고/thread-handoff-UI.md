# UI 리뉴얼 스레드 인수인계

## 작업 브랜치

- **브랜치**: `ui-phase3-overhaul` (이미 생성됨)
- **분기점**: `main` 브랜치 `34d3dbb`
- **롤백**: `git checkout main`으로 즉시 원복 가능

## 이미 완료된 것

- `index.html`에 `viewport-fit=cover` 추가됨 (이 브랜치에서)

## 해결해야 할 문제

### 1. safe-area (심각)
- `viewport-fit=cover`가 이제 추가되었으므로 `env(safe-area-inset-*)` 값이 실제로 반영됨
- iPhone 노치/다이나믹 아일랜드 + AOS 하단 제스처 바 대응
- 관련 파일: `CourtLayout.tsx`, `App.tsx`, 모든 `fixed inset-0` 모달

### 2. 상단 과밀 — TopBar + PartyStatusBar 병합
- 현재: 2줄 80px (TopBar 36px + PartyStatusBar 44px)
- 목표: 1줄 40px (CourtHeader)
- TopBar에 7~8개 아이콘/수치가 빼곡 → 오버플로 메뉴로 이동
- PartyStatusBar의 파티 이름+이모지를 헤더에 통합
- **주의**: TopBar.tsx에 모달/오버레이가 많이 포함됨 (Settings, ResourcePopup, DisputeBoard, StateTransitionToast, GameEventModal, EvidenceResultToast, ForcedVerdictBanner). header UI만 변경하고 모달은 유지해야 함

### 3. 하단 과대 — ActionPanel 리팩토링
- 현재: 대상 선택(44px) + 미터(20px) + 탭(40px) + 닫기(30px) = ~134px
- 목표: 단일 행 ActionDock (72px)
- 대상 선택: 2개 큰 버튼 → pill/세그먼트 컨트롤
- 미터: 별도 행 → 독 우측에 컬러 바 인라인
- 닫기/열기 토글 제거
- 사건카드 탭을 증거 탭의 서브섹션으로 병합 검토

### 4. 토스트 → 바텀시트
- 현재: 토스트가 액션패널 위에 올라가며 대화창 55vh 차지
- 목표: 드래그 가능 바텀시트 (반열림 55% / 전열림 85% / 닫기)
- 대화창 하단 40%는 항상 보이도록
- 시트 배경에 액션별 색조 (심문: 블루, 증거: 앰버, 스킬: 퍼플)

### 5. 시각적 개선
- 대화 텍스트: 14px → 15px
- 독 상단에 앰버 라인 (법정 느낌)
- 미터는 텍스트 라벨 제거, 컬러 바만 (노랑/주황/파랑)
- court-bg 텍스처 강화

## iPhone SE (667px) 목표 공간 배분

```
현재                          목표
─────────────────────         ─────────────────────
TopBar       36px             CourtHeader  40px
PartyStatus  44px             (병합됨)      0px
대화창      ~399px            대화창      ~521px
액션패널    ~104px            ActionDock   72px
닫기버튼     30px             (제거됨)      0px
safe area    54px             safe area    34px
```

## 주요 파일

- `src/components/layout/CourtLayout.tsx` — 전체 레이아웃
- `src/components/layout/TopBar.tsx` — 상단바 (모달 다수 포함)
- `src/components/court/PartyStatusBar.tsx` — 파티 상태바
- `src/components/actions/ActionPanel.tsx` — 하단 액션 패널
- `src/components/court/DialogueLog.tsx` — 대화 로그
- `src/app/index.css` — 전역 CSS
- `index.html` — viewport 메타 (수정 완료)

## 스크린샷 참고

유저가 제공한 스크린샷 10장:
1. 홈 화면
2. 세션 선택
3. 사건 맵
4. Phase 1 (진술) — 대화 흐름
5. Phase 3 (심문) — 액션패널 닫힌 상태
6. Phase 3 — 질문 유형 선택 (3카드)
7. Phase 3 — 쟁점 선택
8. Phase 3 — 증거 목록
9. Phase 3 — 증거 펼침 (조사/제시)
10. Phase 3 — 증거 상세 (질문 옵션)

## 제약 조건

- 기능 삭제 없음 — 모든 기능 유지, 배치만 변경
- 다크 테마 유지 (gray-950 베이스, amber 액센트)
- Tailwind CSS (v4.2.2) 사용
- 대화창이 최우선 — 가장 넓은 공간 확보
- 완료 후 main에 merge (PR 또는 직접)
