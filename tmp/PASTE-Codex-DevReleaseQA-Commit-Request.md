# Codex-Dev Release QA — 본인 산출물 commit + push 요청

CT-Main에서 의뢰합니다. Release QA Domain 1 재진입 + Domain 2~10 PASS with caveats 산출물 영역 commit + push 요청.

---

## 1. 진입 조건

```bash
git pull origin main                     # read/report only 영역도 진입 조건 git pull 필수 (학습 영역 정합)
git log --oneline -1
git status --short --branch
```

`git pull` 영역은 read 영역과 충돌 X (산출물 untracked / pull은 tracked merge).

---

## 2. 작업

```bash
git add tmp/qa-release-results/
git commit -m "docs(qa): add release qa domain 1-10 findings"
git push origin main
```

---

## 3. 검증

```bash
git status --short --branch              # tracked clean
npm run check:all                        # PASS
```

---

## 4. 절대 회피선

- 상대 세션 영역 stage 금지:
  - Script Polish 영역 (`tmp/qa-script-polish-audit-results/`)
  - UI Drawer 영역 (이미 commit됨 — `04ac5bf`)
  - Route Simulator 영역 (해당 시)
- 모르는 untracked 영역 stage 금지
- `tmp/PASTE-Codex-DevScriptPolishAudit-Commit-Request.md` / `tmp/PASTE-Codex-DevScriptPolish-CommitFix-Request.md` / 기타 PASTE 영역 stage 금지 (CT-Main 영역)
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` stage 금지 (사용자 명시 보존 영역)
- `tmp/MANUAL-QA-GUIDE-Domain-4-API-Failure-UX.md` stage 금지 (CT-Main 영역)
- stash / discard / reset 금지
- `pc.css` touch 금지
- `src/*` 영역 touch 금지

본인 산출물 `tmp/qa-release-results/` 영역만 stage.

---

## 5. Domain 4 caveat 영역

자동화 경로에서 실제 LLM 요청 도달 X 영역은 사용자 명시 영역에 따라 **별도 Manual QA spot check guide**(`tmp/MANUAL-QA-GUIDE-Domain-4-API-Failure-UX.md`)로 분리됨. Release QA 세션은 commit + push 후 종료. 자동화 보강 의뢰서 영역은 진입 X (사용자 명시).

---

## 6. 보고

commit + push 완료 후 commit SHA + CT-Main에 보고.
