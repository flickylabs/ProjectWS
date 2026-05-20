# Release Final QA — Master Brief

작성: 2026-05-20 (claude opus 4.7) — 본 게임 최종 출시 직전 품질 보정 마지막 라운드.

## 배경

본 세션(2026-05-20)에 cutscene wiring + tutorial overhaul + popup dismiss 인프라 + 좌측 패널 layout이 대거 변경됨. 직접 적용 + 정적 QA(typecheck / qa:fast / qa:lqa / qa:cutscene) 모두 PASS 상태지만, **실측 사용자 흐름과 회귀 영역**은 미검증.

3 thread 병렬 진행:
- **Q1** = Popup dismiss 패턴 Phase B sweep (코드)
- **Q2** = 신규 i18n 톤 audit (4 lang)
- **Q3** = 회귀 QA + UI/UX 종합 audit (분석 + report)

각 thread는 자기 worktree에서 작업 → 단일 commit → cherry-pick.

## 본 세션 변경 영역 (Codex 참조용)

| 영역 | 파일 | 요약 |
|---|---|---|
| Cutscene wiring | useActionDispatch.ts (3 hook) / useDiscoveryIntegration.ts | trust/slip/witness 3 경로 컷씬 트리거. _suppressTrustCutsceneFor flag |
| Tutorial steps | tutorialSteps.ts / tutorialSlice.ts | record-summary 모달→버튼 / evidence-view-open 신규 (card 우측 배치) / evidence-view-close 신규 / question-method-select 3 버튼 모두 cycling(prefix selector) / judge-obs+notebook+tutorial-complete = click 완료 |
| Tutorial overlay | PCTutorialOverlay.tsx | window click listener for judge sections / pc:open-record-summary listener / tutorial-complete onClick |
| Tutorial i18n | i18n/messages/tutorial.ts | KO/EN/JA/ZH-CN 5건 신규 + 3건 수정 |
| 좌측 패널 | app/pc.css | evidence 204→320 / important-notes 260→160 (+ M/S/XS bucket) |
| Popup dismiss | feedback/EventFeedbackCard.tsx | showConfirmButton 항상 노출 + Space 키 글로벌 핸들러 + kbd pill |
| Chip → 스탬프 | app/pc.css `.pc-court-clash__chip` | rotate(-7deg) + 더블 보더 + pc-stamp-impact 540ms |
| 데이터 attr | PCCourtLayout.tsx (record-summary-button) / PCInteractionPanel.tsx (evidence-e2-view-btn) | 튜토리얼 타겟 anchor |
| Cutscene 디버그 (DEV) | components/pc/debug/PCCutsceneDebugPanel.tsx + PCApp.tsx mount | DEV-only FAB. shouldTriggerCutscene 우회 |

## 진입 조건 (모든 thread 공통)

```powershell
git pull
git status --short  # untracked OK, tracked dirty 0 필수
# 본인 worktree 들어가서 작업, 단일 commit
```

[[feedback-qa-session-clean-worktree]] 준수. [[feedback-shared-worktree-no-parallel-with-dirty]] 영역.

---

## Q1 — Popup dismiss 패턴 Phase B sweep

**Worktree**: `D:/solomon-q1-popup-sweep`
**Branch**: `codex/q1-popup-sweep`
**Output**: 코드 변경 commit 1개

### 목표

EventFeedbackCard에 적용된 `[확인 Space]` + Space 키 dismiss + 자동 닫기 인지 부담 해결 패턴을 **다른 popup/modal surface**에 일관 적용.

### 참고 reference

이번 세션에 추가된 패턴 (그대로 활용):
- 버튼: `<button class="pc-event-feedback__dismiss"><span>확인</span><kbd class="pc-event-feedback__kbd">Space</kbd></button>`
- Space 핸들러: `window.addEventListener('keydown')` + `event.code === 'Space'` + input/textarea/contenteditable 통과 + `event.preventDefault()`
- CSS는 `.pc-event-feedback__dismiss` (gold tone) + `.pc-event-feedback__kbd` (kbd pill) — `src/app/pc.css` line 18497~18540 부근

### Sweep 대상 (audit 우선순위)

1. **`src/components/pc/layout/PCInteractionPanel.tsx`**
   - 증거 detail / dialogue / witness / contrast / claims / dispute picker 등 다양한 variant
   - close button(X)만 있음. Space dismiss + 동일 kbd pill 추가
   - 단 `payload.actions`가 있는 variant(증거 선택 / 증인 선택)는 Space는 첫 액션에 매핑 X (defensive, 사고 방지) → 그냥 제외

2. **`src/components/pc/layout/PCRecordSummary.tsx`**
   - 모달. close button + backdrop click 존재. Space dismiss + kbd pill 추가
   - `[화면을 클릭하면 닫혀요 Space]` 류 안내 추가 가능 (선택)

3. **`src/components/pc/evidence/PCEvidenceViewer.tsx`**
   - Esc 핸들러 있음(line 46-53). Space 동등 처리 + visible UI 표시
   - viewer 자체 콘텐츠가 SVG라 키보드 트랩 X

4. **`src/components/pc/settings/PCSettingsPanel.tsx`**
   - 우선순위 낮음. 설정 화면이라 Space=토글 의도와 충돌 가능 → audit 후 적용 여부 결정. 적용 시 footer에 "[Esc] 닫기" 안내만 추가도 OK

5. **그 외 modal/overlay (선택 audit)**
   - PCTelemetryConsentModal — 동의 필수 actions이라 Space dismiss 부적합. 제외
   - PCSettingsPanel sub-drawer 등
   - PCInteractionPanel 내부 confirmation dialog 등 nested overlay

### 일관 원칙

| 항목 | 규칙 |
|---|---|
| Space dismiss | actions/필수 선택 없는 modal만. 선택 필요한 modal은 Space 트랩 X |
| kbd pill 시각 | `.pc-event-feedback__kbd` 클래스 재사용 (스타일 통일) |
| Esc 핸들러 | 이미 있으면 Space도 같은 dismiss로. 없으면 추가 |
| input focus 처리 | input/textarea/contenteditable focus 시 Space 통과 (defensive) |
| visibility timing | 모달이 phase 'visible'/'open'일 때만 핸들러 활성. unmount/dismiss 시 cleanup |

### 추가 항목: stamp 클래스 재사용

`.pc-court-clash__chip`을 스탬프로 변환한 CSS — 다른 곳에서 유사한 "결정적 단서" 류 chip 발견 시 동일 패턴 적용 검토:
- `.pc-court-clash__chip` selector 그대로 쓰는 곳 외에 별도 chip 존재할 수 있음. grep으로 audit.
- 발견 시 `transform: rotate(-Xdeg)` + 더블 보더 + `pc-stamp-impact` keyframe 재사용

### 산출

- 단일 commit. PR-style msg: "Apply popup dismiss pattern (confirm [Space]) to {surface list}"
- 각 surface별 변경 요약을 commit body에 bullet로

### 검증

- `npm run qa:fast` — RELEASE READY 유지
- `npx tsc -b --force` — exit 0
- `npm run lint` — 0 error 유지 (warnings 변동만 OK)

---

## Q2 — 신규 i18n 톤 audit

**Worktree**: `D:/solomon-q2-i18n-audit`
**Branch**: `codex/q2-i18n-audit`
**Output**: audit CSV + 필요 시 수정 patch commit

### 대상

`src/i18n/messages/tutorial.ts`의 본 세션 신규/수정 entries:

| key | 작업 |
|---|---|
| `pc.tutorial.spouse01.evidence-detail-open.title` | KO/EN/JA/ZH-CN 모두 "증거 정보" 류로 변경 (기존 "증거 열람"이 신규 step과 충돌) |
| `pc.tutorial.spouse01.evidence-view-open.title` (신규) | 4 lang 모두 |
| `pc.tutorial.spouse01.evidence-view-open.body` (신규) | 4 lang 모두. `[증거 열람]` / `[Open Evidence]` / `[証拠を開く]` / `[打开证据]` 대괄호 라벨 사용 |
| `pc.tutorial.spouse01.tutorial-complete.body` | 4 lang 모두. 끝에 `[화면을 클릭하면 시작해요]` / `[Click anywhere to begin]` / `[画面をクリックすると始まります]` / `[点击屏幕开始]` 추가됨 |

### Audit 기준

1. **톤 일관성** — [[feedback-tutorial-copy-tone]] 준수 (존댓말 + Flicky 마스코트, 명령조 X)
2. **대괄호 UI 라벨** — `pc.interaction.openEvidence` (KO 증거 열람 / EN Open Evidence / JA 証拠を開く / ZH-CN 打开证据)와 정확 일치
3. **4 lang 동등 의미** — KO 기준에 EN/JA/ZH-CN 의미 손실 없음
4. **자연 발화** — 신문체/번역체 회피 [[feedback-natural-korean-vs-translationese]] (KO 중심), 각 언어 native 자연체

### 출력

`reports/release-final-qa/i18n-audit.csv` (3~5 column):
```
key, lang, original_text, audit_finding (NONE / TONE / LABEL / EQUIVALENCE / NATURAL), suggested_fix, severity (P0/P1/P2)
```

P0 = 출시 차단 (의미 손실 / 대괄호 라벨 불일치). 발견 시 즉시 i18n 파일 patch + commit.
P1/P2 = report only.

### 진입 + 검증

```bash
git pull
npx tsc -b --force
npm run qa:fast
```

---

## Q3 — 회귀 QA + UI/UX 종합 audit

**Worktree**: `D:/solomon-q3-regression-qa`
**Branch**: `codex/q3-regression-qa`
**Output**: regression report (no code unless P0 found)

### 진행

#### A. 정적 QA full suite

```bash
npm run qa:fast              # baseline 무회귀 확인 (RELEASE READY 유지)
npm run qa:deep              # full route + state regression
npm run qa:lqa               # truth-leak 0 / translation baseline 무회귀
npm run qa:cutscene --strict # 14 dispute × 5 entry × 4 lang 무회귀
npm run qa:free-interrogation
npx tsc -b --force
npm run lint
```

각 결과를 `reports/release-final-qa/q3-static-suite.md`에 요약.

#### B. 본 세션 변경 영역 회귀 risk audit

다음 surface에 대해 코드 정독 + 잠재 회귀 분석:

1. **Tutorial flow** (`tutorialSteps.ts` 20 step / PCTutorialOverlay.tsx click listener)
   - record-summary-intro: `pc:open-record-summary` 이벤트 leak / 중복 발동 가능성?
   - evidence-view-open: `state.pendingEvidenceView === 'e-2'`가 게임 중 다른 경로로 트리거되어 step 잘못 완료될 가능성?
   - judge-observation-intro/observation-hint: window-level click listener가 spotlight rect 외 클릭에도 반응할 위험?
   - tutorial-complete onClick: 카드 내부 pin/close 버튼과 onClick stopPropagation 처리 누락? 사이드 이펙트?

2. **좌측 패널 layout** (`pc.css` evidence 320 / important-notes 160)
   - 5 카드 visible 검증: pc-ev-notebook 실제 높이 측정 (조합 badge / 진실 단계 / 확장 등 상태별 변동)
   - M/S/XS bucket transition 매끄러움
   - 다른 영역(judge-observation-section 176 / judge-notebook 176) flex 분배 깨짐 여부

3. **EventFeedbackCard** (`pc-event-feedback__kbd` / Space 핸들러)
   - actions 있는 popup에서 Space 핸들러 누락 동작 확인
   - hasActions/onDefer 동시에 있는 edge case
   - 다중 popup queue 처리 시 Space가 잘못된 popup 닫는지
   - kbd pill 4언어 텍스트 변형 시 width overflow 여부

4. **결정적 단서 스탬프** (`.pc-court-clash__chip` rotate)
   - 스탬프 텍스트가 영문/중문/일문에서도 가독성 유지 (3 column grid 우상단)
   - 카드 우상단 close button(X)와 겹침 여부
   - pc-stamp-impact 540ms 애니메이션이 popup 진입 애니메이션과 충돌 X

5. **Cutscene wiring** (`useActionDispatch.ts` 3 hook / `_suppressTrustCutsceneFor`)
   - witness → S5 cascade에서 suppress flag 정확히 작동
   - 다중 witness probe 연속 호출 시 flag 잘못 carry-over 가능성
   - cutsceneText JSON missing 시 빈 카드 표시 vs 폴백 (loader getter pick 동작)

각 surface별 발견된 P0/P1/P2 risk을 `reports/release-final-qa/q3-risk-audit.md`에 정리.

#### C. PC QA test-case 재실행 (가능 범위)

`docs/design/pre-launch-pc-qa/test-cases.md`의 본 세션 변경 surface 관련 케이스만 추출 → 실행 가능한 케이스(코드 정독으로 검증 가능한 것)는 직접 실행, UI 직접 조작 필요한 케이스는 risk audit로 대체.

### 산출

- `reports/release-final-qa/q3-static-suite.md` (정적 QA 결과)
- `reports/release-final-qa/q3-risk-audit.md` (5 surface risk 분석)
- `reports/release-final-qa/q3-summary.md` (P0 카운트 + 출시 가능 여부 권고)

P0 발견 시: i18n 류는 즉시 patch + commit. 로직 류는 report only + Claude 후속 수정 의뢰서 작성.

### 진입 + 검증

```bash
git pull
# 위 A 명령 순차 실행 → 결과 cache
# B/C 작업 → report file 작성
git add reports/release-final-qa/
git commit -m "Q3 release regression audit reports"
```

---

## Cherry-pick 순서 (3 thread 완료 후 main에서)

1. Q2 (i18n patch, 작은 commit, 충돌 없음)
2. Q1 (코드 변경, 충돌 가능성 중간)
3. Q3 (report only, 충돌 없음)

각 cherry-pick 후 `npm run qa:fast` + `npx tsc -b --force` 무회귀 확인.
