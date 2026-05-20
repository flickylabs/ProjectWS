# Release Final QA — Codex Spawn Instructions

## 1단계: PowerShell 일괄 spawn

```powershell
# D:/ProjectWS 에서 실행
$threads = @(
  @{slug='q1-popup-sweep';    name='Q1 popup dismiss sweep'},
  @{slug='q2-i18n-audit';     name='Q2 i18n tone audit'},
  @{slug='q3-regression-qa';  name='Q3 release regression audit'}
)

foreach ($t in $threads) {
  $wt = "D:/solomon-$($t.slug)"
  $br = "codex/$($t.slug)"
  Write-Host "=== spawn $($t.name) ===" -ForegroundColor Cyan
  git worktree add $wt -b $br main
  # commit 권한 (anonymous Codex 환경 대응)
  git -C $wt config user.name "codex"
  git -C $wt config user.email "codex@local"
  git -C $wt config commit.gpgsign false
}

Write-Host "`n=== 다음 단계 ===" -ForegroundColor Yellow
Write-Host "각 worktree에서 'codex' CLI 실행 후 first message paste."
Write-Host "  cd D:/solomon-q1-popup-sweep && codex"
Write-Host "  cd D:/solomon-q2-i18n-audit && codex"
Write-Host "  cd D:/solomon-q3-regression-qa && codex"
```

## 2단계: 각 thread first message (paste)

### Q1 — Popup dismiss 패턴 Phase B sweep

```
docs/design/release-final-qa/master-brief.md 의 Q1 섹션 읽고 진행해.

너의 역할: EventFeedbackCard에 적용된 [확인 Space] + Space 키 dismiss + kbd pill 패턴을 PCInteractionPanel / PCRecordSummary / PCEvidenceViewer / (선택)PCSettingsPanel에 일관 적용.

진입 조건:
- git pull
- git status untracked OK / tracked dirty 0
- 본인 worktree (D:/solomon-q1-popup-sweep) 안에서만 작업

참고 reference 코드:
- src/components/pc/feedback/EventFeedbackCard.tsx — showConfirmButton + Space useEffect + kbd 렌더 (line 638-657 부근)
- src/app/pc.css — .pc-event-feedback__dismiss + .pc-event-feedback__kbd (line 18497-18540 부근)

검증:
- npm run qa:fast (RELEASE READY 유지)
- npx tsc -b --force (exit 0)
- npm run lint (0 error 유지)

산출: 단일 commit. PR-style msg "Apply popup dismiss pattern (confirm [Space]) to {surfaces}". 각 surface 변경 요약을 body에 bullet.

원칙:
- actions/필수 선택 있는 popup은 Space dismiss X (defensive)
- input/textarea/contenteditable focus 시 Space 통과
- Esc 핸들러 있으면 Space도 같은 dismiss 경로
- 모달이 phase 'visible'/'open'일 때만 활성

추가: 다른 chip 영역(grep) 발견 시 .pc-court-clash__chip 스탬프 패턴(rotate + 더블 보더 + pc-stamp-impact) 재사용 검토.
```

### Q2 — 신규 i18n 톤 audit

```
docs/design/release-final-qa/master-brief.md 의 Q2 섹션 읽고 진행해.

너의 역할: src/i18n/messages/tutorial.ts 의 2026-05-20 신규/수정 entries 4 lang 톤 audit + P0 발견 시 patch.

진입 조건:
- git pull
- git status untracked OK / tracked dirty 0
- 본인 worktree (D:/solomon-q2-i18n-audit) 안에서만 작업

대상 keys (총 5건 × 4 lang = 20 entries):
- pc.tutorial.spouse01.evidence-detail-open.title (각 lang)
- pc.tutorial.spouse01.evidence-view-open.title (신규)
- pc.tutorial.spouse01.evidence-view-open.body (신규, 대괄호 [증거 열람]/[Open Evidence]/[証拠を開く]/[打开证据] 사용)
- pc.tutorial.spouse01.tutorial-complete.body (수정, 끝에 [화면을 클릭하면 시작해요] 류 prompt 추가)

cross-ref: src/i18n/messages/layout.ts:445/948/1451/1954 의 pc.interaction.openEvidence 라벨과 대괄호 텍스트 정확 일치 확인.

기준:
1. 톤 일관성 ([[feedback-tutorial-copy-tone]] 존댓말 + Flicky 마스코트)
2. 대괄호 UI 라벨 정확 일치
3. 4 lang 동등 의미 (KO 기준)
4. 자연 발화 (신문체/번역체 회피)

출력:
- reports/release-final-qa/i18n-audit.csv — key,lang,original,finding,suggested_fix,severity
- P0 발견 시 src/i18n/messages/tutorial.ts 직접 patch
- 단일 commit (audit CSV + 필요 시 patch)

검증:
- npx tsc -b --force
- npm run qa:fast
```

### Q3 — 회귀 QA + UI/UX 종합 audit

```
docs/design/release-final-qa/master-brief.md 의 Q3 섹션 읽고 진행해.

너의 역할: 본 세션 변경 5 surface (tutorial flow / 좌측 패널 layout / EventFeedbackCard / 결정적 단서 스탬프 / cutscene wiring) 회귀 risk audit + 정적 QA full suite.

진입 조건:
- git pull
- git status untracked OK / tracked dirty 0
- 본인 worktree (D:/solomon-q3-regression-qa) 안에서만 작업

A. 정적 QA full suite (순차 실행):
- npm run qa:fast
- npm run qa:deep
- npm run qa:lqa
- npm run qa:cutscene -- --strict
- npm run qa:free-interrogation
- npx tsc -b --force
- npm run lint

각 결과를 reports/release-final-qa/q3-static-suite.md에 요약 (PASS/FAIL + finding 개수).

B. 5 surface 회귀 risk audit (코드 정독 + 분석):
1. Tutorial flow (tutorialSteps.ts 20 step / PCTutorialOverlay.tsx click listener)
2. 좌측 패널 layout (pc.css evidence 320 / important-notes 160)
3. EventFeedbackCard (Space 핸들러 + kbd)
4. 결정적 단서 스탬프 (.pc-court-clash__chip rotate)
5. Cutscene wiring (_suppressTrustCutsceneFor flag)

각 surface별 P0/P1/P2 risk을 reports/release-final-qa/q3-risk-audit.md에 정리.

C. PC QA test-case (docs/design/pre-launch-pc-qa/test-cases.md) 중 본 세션 변경 영역 케이스만 추출:
- 코드 정독으로 검증 가능한 케이스 → 직접 실행
- UI 직접 조작 필요 케이스 → risk audit로 대체

산출:
- reports/release-final-qa/q3-static-suite.md
- reports/release-final-qa/q3-risk-audit.md  
- reports/release-final-qa/q3-summary.md (P0 카운트 + 출시 가능 권고)

P0 발견 시:
- i18n 류 → 즉시 patch + commit
- 로직 류 → report only (Claude가 후속 수정 의뢰)

단일 commit. 메시지: "Q3 release regression audit reports".
```

## 3단계: 완료 후 cherry-pick (main에서)

```bash
git pull
git cherry-pick codex/q2-i18n-audit   # 작은 commit 먼저
npm run qa:fast && npx tsc -b --force
git cherry-pick codex/q1-popup-sweep   # 코드 변경
npm run qa:fast && npx tsc -b --force
git cherry-pick codex/q3-regression-qa # report only
npm run qa:fast && npx tsc -b --force
git push origin main
# worktree 정리
git worktree remove D:/solomon-q1-popup-sweep
git worktree remove D:/solomon-q2-i18n-audit
git worktree remove D:/solomon-q3-regression-qa
git branch -D codex/q1-popup-sweep codex/q2-i18n-audit codex/q3-regression-qa
```
