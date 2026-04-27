# REQUEST — UI Drawer Consistency Fix (출시 전 polish — 단일 세션 / pc.css 소유)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P1 (출시 전 체감 품질 / UI consistency)
**병렬 영역**: Release QA / Script Polish Audit (별도 트랙) — 충돌 X
**소유 영역**: **`src/app/pc.css` 단일 소유 영역** — 다른 UI 세션과 병렬 touch X

---

## 1. 목표

활성 4 drawer의 **visual / layout 일관성** 정합. 신규 기능 X / 기능 로직 변경 최소 / `재판관의 관찰` drawer를 기준 디자인으로 삼아 나머지 3 영역 정합.

대상 drawer 4개:
1. 사건 타임라인
2. 발언 노트
3. 재판관의 관찰 (기준 영역)
4. 재판관의 수첩 (drawer 미존재 또는 미적용 — 신설 또는 수정 영역)

---

## 2. 진입 조건

- HEAD: `3629a8e` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS
- `src/app/pc.css` 영역에 **다른 UI 세션 dirty 0** (단일 소유 영역 — 충돌 회피)

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 영역 매핑 / 검수 | CT-Main |
| **이 세션 (UI Drawer Consistency)** | **4 drawer audit + visual/layout 정합 + screenshot 영역** |
| Release QA / Script Polish | 별도 트랙 (영역 충돌 X) |
| 사용자 | 최종 visual confirm |

---

## 4. 사전 audit 결과 (CT 영역)

### 4.1 기존 영역 식별

| drawer | 컴포넌트 영역 | 상태 |
|---|---|---|
| 재판관의 관찰 | `src/components/pc/observation/JudgeObservationSection.tsx` + `JudgeObservationHistoryDrawer.tsx` | **기준 영역** |
| 재판관의 수첩 | `src/components/pc/observation/JudgeNotebookSection.tsx` | **drawer 컴포넌트 미존재** (또는 미적용 — 사용자 언급 영역) |
| 사건 타임라인 | `src/components/pc/panels/PCCaseTimelineSection.tsx` | 정합 영역 |
| 발언 노트 | `src/components/pc/panels/PCImportantNotesSection.tsx` | 정합 영역 |

### 4.2 진입 시 재확인

- `JudgeNotebookHistoryDrawer.tsx` (또는 같은 영역 컴포넌트) 신설 영역인지 / 기존 영역에 drawer 영역이 있지만 미적용인지 read + 보고
- 4 drawer 정합 영역 사전 비교 (헤더 / 리스트 / 빈 상태 / 간격)

---

## 5. Scope

### 5.1 정합 영역 9개 (사용자 명시)

`재판관의 관찰` drawer 기준으로 나머지 3 영역 정합:

| # | 영역 |
|---|---|
| 1 | 패널 shell (배경 / 그림자 / radius) |
| 2 | border / divider line (색상 / 두께 / spacing) |
| 3 | spacing / padding (panel-level / item-level) |
| 4 | header layout (title / 닫기 / sort / filter 영역) |
| 5 | list item layout (icon / text / meta / 시간) |
| 6 | empty state (메시지 / 아이콘 / 톤) |
| 7 | toggle 디자인 (열기/닫기 / collapsed/expanded) |
| 8 | 선택 항목 (음영 / 색상 / hover / active) |
| 9 | 모바일·PC 해상도 텍스트 넘침 (1280×720 / 1920×1080 / 4K + 모바일 영역) |

### 5.2 신규 영역 (수첩 drawer)
- 수첩 drawer가 미존재 영역이면 `JudgeNotebookHistoryDrawer.tsx` 신설 (관찰 drawer 영역 그대로 정합)
- 수첩 drawer가 미적용 영역이면 적용 영역 정합 (`PCCourtLayout.tsx` 또는 정합 영역)
- 수첩 카테고리 (자백 / 결정적 모순 / 핵심 증거) 영역 정합 (`docs/information-surface-policy.md` v1.1 §2.3 / §7.1)

### 5.3 visual/layout 정합 (사용자 명시)
- 신규 기능 X
- 기능 로직 변경 최소
- visual / layout / spacing / 색상 영역만

---

## 6. Write Scope (이 의뢰서 영역)

### 6.1 write OK
- `src/components/pc/observation/JudgeObservationSection.tsx` (기준 영역 — 변경 minimal)
- `src/components/pc/observation/JudgeObservationHistoryDrawer.tsx` (기준 영역 — 변경 minimal)
- `src/components/pc/observation/JudgeNotebookSection.tsx`
- `src/components/pc/observation/JudgeNotebookHistoryDrawer.tsx` (신설 영역 가능)
- `src/components/pc/panels/PCCaseTimelineSection.tsx`
- `src/components/pc/panels/PCImportantNotesSection.tsx`
- `src/components/pc/panels/PCRightPanel.tsx` (drawer 영역 등록 정합)
- `src/components/pc/layout/PCCourtLayout.tsx` (drawer 영역 등록 정합)
- **`src/app/pc.css`** (단일 소유 영역 — 다른 UI 세션과 병렬 touch X)
- 신규 CSS 모듈 영역도 OK (예: `src/styles/drawerConsistency.css`)

### 6.2 절대 touch X
- store / slice 영역 (`judgeObservationSlice.ts` / `judgeNotebookSlice.ts` / `eventFeedbackSlice.ts`) — 기능 로직 영역
- `useActionDispatch.ts` / `useGameStore.ts` — 핵심 hook 영역
- `useEffect` 영역 / 데이터 fetch 영역 — 기능 영역
- ScriptedText / caseData / 정책 영역
- LLM / API 영역
- baseline anchor / feature flag

### 6.3 충돌 회피 영역
- **`src/app/pc.css` 단일 소유** — 다른 UI 세션이 활성이면 충돌 회피 영역 / 진입 시 `git status --short --branch` 확인 필수
- Release QA / Script Polish Audit과 영역 충돌 X (read/build/grep만 / drawer 영역 변경 X)

---

## 7. 진행 순서

### Phase A — 사전 audit + 영역 비교
1. 4 drawer 컴포넌트 read
2. 9 정합 영역 (panel shell / border / spacing / header / list / empty / toggle / 선택·hover·active / 텍스트 넘침) 영역 비교
3. **수첩 drawer 영역 상태 확인** (미존재 / 미적용 / 정합 영역 일부)
4. 정합 차이 list 작성
5. screenshot 수정 전 영역 (4 drawer × 3 해상도 + 모바일)
6. 산출물: `tmp/qa-ui-drawer-consistency-results/20260427-phase-a-audit.md`
7. CT-Main 보고

### Phase B — 정합 패치
1. 수첩 drawer 영역 (신설 또는 적용 정합)
2. 사건 타임라인 / 발언 노트 영역 정합
3. pc.css 영역 정합 (단일 소유)
4. 신규 CSS 모듈 영역 (필요 시)
5. 기능 로직 변경 0 검증

### Phase C — screenshot + 검증
1. screenshot 수정 후 영역 (4 drawer × 3 해상도 + 모바일)
2. before/after 비교 영역
3. 텍스트 넘침 검증
4. reduced motion 정합 검증
5. `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS
6. commit + push
7. CT-Main 보고

---

## 8. 절대 회피선

- **`src/app/pc.css` 단일 소유 영역** — 다른 UI 세션과 병렬 touch X (진입 시 `git status` 확인 필수)
- 신규 기능 추가 X (consistency fix 영역만)
- 기능 로직 변경 X (visual·layout 영역만)
- store / slice / hook 변경 X
- ScriptedText / caseData / 정책 / baseline anchor / feature flag X
- LLM / API 영역 X
- screenshot 영역에 secret / 실제 키 / 사용자 PII X
- Release QA / Script Polish 영역 충돌 X (별도 commit / 별도 산출물)

---

## 9. 종료 조건

- [ ] Phase A audit 보고서 (`tmp/qa-ui-drawer-consistency-results/20260427-phase-a-audit.md`)
- [ ] Phase B 정합 패치 (4 drawer × 9 정합 영역)
- [ ] 수첩 drawer 영역 (신설 또는 적용)
- [ ] Phase C screenshot 수정 전후 (4 drawer × 3+ 해상도)
- [ ] 텍스트 넘침 검증 PASS
- [ ] 기능 로직 변경 0 검증
- [ ] `npm run check:all` PASS
- [ ] `npm run build:pc` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

## 10. 산출물

```
tmp/qa-ui-drawer-consistency-results/
├── 20260427-phase-a-audit.md              (Phase A — 9 정합 영역 차이 list)
├── 20260427-phase-b-patch-summary.md      (Phase B 변경 요약)
├── 20260427-phase-c-verification.md       (Phase C 검증)
├── screenshots/
│   ├── before/
│   │   ├── case-timeline-1920x1080.png
│   │   ├── case-timeline-1280x720.png
│   │   ├── case-timeline-mobile.png
│   │   ├── important-notes-{1920,1280,mobile}.png
│   │   ├── observation-{1920,1280,mobile}.png
│   │   └── notebook-{1920,1280,mobile}.png  (또는 미존재 영역 명시)
│   └── after/
│       ├── case-timeline-{1920,1280,mobile}.png
│       ├── important-notes-{1920,1280,mobile}.png
│       ├── observation-{1920,1280,mobile}.png
│       └── notebook-{1920,1280,mobile}.png
└── consistency-checklist.md               (9 정합 영역별 OK/NG)
```

---

## 11. 관련 자료

- `docs/information-surface-policy.md` v1.1 (§2 표면 역할 / §6.1 관찰 vs 수첩 / §7.1 수첩 카테고리 P1-D 최소형)
- `memory/design_color_tokens_pc.md` (pc.css 토큰 권위 문서)
- `memory/design_play_scene_v3_consolidation.md` (의도 차이 보존 영역)
- `memory/session_handoff_20260427_ui_v3_subthread.md` (UI 서브 스레드 영역)
- 본 세션 진입 메시지: `tmp/UI-Drawer-Consistency-Fix-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. UI/VFX Dev 검토 + Phase A audit 진입 대기.
