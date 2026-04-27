# UI Drawer Consistency Fix 진입 메시지 (출시 전 polish / pc.css 단일 소유)

**세션 영역**: 4 drawer (사건 타임라인 / 발언 노트 / 재판관의 관찰 / 재판관의 수첩) visual·layout 일관성 정합
**병렬**: Release QA / Script Polish Audit (영역 충돌 X)
**소유 영역**: **`src/app/pc.css` 단일 소유** — 다른 UI 세션과 병렬 touch 절대 X
**의뢰서 본문**: `tmp/REQUEST-UI-Drawer-Consistency-Fix.md`

---

## 1. 진입 조건 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** — 단일 소유 영역 충돌.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-UI-Drawer-Consistency-Fix.md` (의뢰서 — 사전 audit 결과 §4 / scope §5·6 / 회피선 §8) |
| P0 | `docs/information-surface-policy.md` v1.1 §2 (표면 역할) / §6.1 (관찰 vs 수첩) / §7.1 (수첩 카테고리 P1-D 최소형) |
| P0 | `src/components/pc/observation/JudgeObservationHistoryDrawer.tsx` (**기준 영역**) |
| P0 | `src/components/pc/observation/JudgeObservationSection.tsx` |
| P0 | `src/components/pc/observation/JudgeNotebookSection.tsx` (drawer 영역 상태 확인) |
| P0 | `src/components/pc/panels/PCCaseTimelineSection.tsx` |
| P0 | `src/components/pc/panels/PCImportantNotesSection.tsx` |
| P0 | `src/components/pc/panels/PCRightPanel.tsx` (drawer 영역 등록 정합) |
| P0 | `src/app/pc.css` (관련 영역) |
| P1 | `memory/design_color_tokens_pc.md` (pc.css 토큰 권위 문서) |
| P1 | `memory/design_play_scene_v3_consolidation.md` (의도 차이 보존 영역) |

---

## 3. 작업 본질

### 정합 영역 9개 (사용자 명시)
1. 패널 shell (배경 / 그림자 / radius)
2. border / divider line
3. spacing / padding
4. header layout
5. list item layout
6. empty state
7. toggle 디자인
8. 선택 항목 (음영 / 색상 / hover / active)
9. 모바일·PC 해상도 텍스트 넘침

### 기준 영역
**재판관의 관찰** (`JudgeObservationHistoryDrawer.tsx`) — 나머지 3 영역 이 영역 정합.

### 수첩 drawer 영역 (사용자 언급)
- `JudgeNotebookHistoryDrawer.tsx` 영역 미존재 또는 미적용 가능성
- 진입 시 read + 상태 확인 + 보고
- 신설 영역이면 관찰 drawer 영역 그대로 정합 영역
- 수첩 카테고리 (자백 / 결정적 모순 / 핵심 증거) 정합

### 신규 기능 X
visual·layout 정합 영역만. 기능 로직 변경 최소.

---

## 4. 진행 순서

### Phase A — audit + 영역 비교
- 4 drawer read + 9 정합 영역 차이 list
- 수첩 drawer 상태 확인
- screenshot 수정 전 (4 drawer × 3 해상도 + 모바일)
- 산출물 commit + push + CT-Main 보고

### Phase B — 정합 패치
- 수첩 drawer (신설 또는 적용 정합)
- 사건 타임라인 / 발언 노트 정합
- pc.css 영역 정합 (단일 소유)
- 기능 로직 변경 0 검증

### Phase C — screenshot + 검증
- screenshot 수정 후 (4 drawer × 3 해상도 + 모바일)
- 텍스트 넘침 / reduced motion 검증
- check:all / build:pc / tsc PASS
- commit + push + CT-Main 보고

---

## 5. 절대 회피선

- **`src/app/pc.css` 단일 소유 영역** — 다른 UI 세션 병렬 touch X
- 신규 기능 추가 X
- 기능 로직 변경 X (visual·layout 영역만)
- store / slice / hook 변경 X (`judgeObservationSlice.ts` / `judgeNotebookSlice.ts` / `eventFeedbackSlice.ts` / `useActionDispatch.ts` / `useGameStore.ts`)
- ScriptedText / caseData / 정책 / baseline anchor / feature flag X
- LLM / API 영역 X
- screenshot 영역에 secret / 실제 키 / 사용자 PII X
- Release QA / Script Polish 영역 commit과 섞기 X (별도 commit / 별도 산출물)

---

## 6. 산출물 위치

```
tmp/qa-ui-drawer-consistency-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-patch-summary.md
├── 20260427-phase-c-verification.md
├── screenshots/before/  (4 × 3 해상도 + 모바일)
├── screenshots/after/   (동)
└── consistency-checklist.md
```

---

## 7. 종료 조건

- [ ] Phase A·B·C 완료
- [ ] 수첩 drawer 영역 (신설 또는 적용)
- [ ] 9 정합 영역 OK/NG checklist
- [ ] screenshot 전후 4 drawer × 3+ 해상도
- [ ] 텍스트 넘침 PASS
- [ ] 기능 로직 변경 0
- [ ] check:all / build:pc / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit 진입 → CT-Main 보고.
