# 세션 시작 — UI Drawer Consistency Fix (출시 전 polish)

ClaudeCode CT-Main에서 의뢰합니다. 4 drawer (사건 타임라인 / 발언 노트 / 재판관의 관찰 / 재판관의 수첩) visual·layout 일관성 정합 영역입니다.

⚠️ **`src/app/pc.css` 단일 소유 영역** — 다른 UI 세션과 병렬 touch 절대 X.
⚠️ **신규 기능 X / 기능 로직 변경 최소** — visual·layout 영역만.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** (단일 소유 영역 충돌).

---

## 2. 필수 정독

1. `tmp/UI-Drawer-Consistency-Fix-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-UI-Drawer-Consistency-Fix.md` (**의뢰서 본문 — 사전 audit §4 / scope / 회피선**)
3. `docs/information-surface-policy.md` v1.1 §2·6.1·7.1
4. `src/components/pc/observation/JudgeObservationHistoryDrawer.tsx` (기준 영역)
5. `src/components/pc/observation/JudgeNotebookSection.tsx` (수첩 drawer 영역 상태 확인)
6. `src/components/pc/panels/PCCaseTimelineSection.tsx` / `PCImportantNotesSection.tsx`
7. `src/app/pc.css` (관련 영역)

---

## 3. 작업 본질

### 정합 영역 9개
panel shell / border·divider / spacing·padding / header / list item / empty state / toggle / 선택·hover·active / 텍스트 넘침

### 기준
**재판관의 관찰** drawer (`JudgeObservationHistoryDrawer.tsx`)

### 수첩 drawer
- 미존재 또는 미적용 가능성 (사용자 언급) — 진입 시 read + 상태 보고
- 신설 시 관찰 drawer 영역 그대로 정합

### 4 drawer × 3 해상도 + 모바일 screenshot 전후

---

## 4. 진행 순서

Phase A (audit + 9 정합 영역 비교 + screenshot 전) → commit + 보고
→ Phase B (정합 패치) → 보고
→ Phase C (screenshot 후 + 검증 + commit + push) → 보고

---

## 5. 산출물 위치

`tmp/qa-ui-drawer-consistency-results/`

---

## 6. 절대 회피선

- **`src/app/pc.css` 단일 소유** — 병렬 touch X
- 신규 기능 X / 기능 로직 변경 X
- store / slice / hook 변경 X
- ScriptedText / caseData / 정책 / baseline / feature flag X
- LLM / API X
- secret / 실제 키 / 사용자 PII screenshot X
- Release QA / Script Polish 영역과 commit 섞기 X

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit 진입.
