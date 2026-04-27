# Codex-Dev Script Polish — commit 꼬임 처리 (soft reset 1회 한정)

CT-Main에서 의뢰합니다. 본인 세션 로컬 HEAD `900232a` 안에 UI Drawer 영역(`src/app/pc.css` / `src/components/pc/panels/*` / `tmp/qa-ui-drawer-consistency-results/*`) + Script Polish 영역(`tmp/qa-script-polish-audit-results/*`)이 함께 commit된 영역. UI Drawer 영역은 이미 origin/main `04ac5bf`에 있으므로 분기 영역.

**사용자 명시**: `git reset --soft origin/main` 1회만 허용. `git reset --hard` / `stash` / `discard` / `checkout discard` 계열 모두 금지.

---

## 1. 진입 조건

```bash
git fetch origin
git log --oneline origin/main..HEAD       # 900232a 1개만 나와야 함
git diff --stat origin/main..HEAD         # 분기된 파일 list 확인
```

`origin/main..HEAD` 영역 = 1개 (`900232a`) — 다른 영역이 있으면 즉시 중단 + CT-Main 보고.

---

## 2. soft reset 절차 (사용자 명시 1회)

```bash
git reset --soft origin/main              # commit pointer만 origin/main으로 이동, working tree 100% 보존
git status --short                        # 모든 파일 staged 상태
```

**중요**: 이 reset은 **destructive X** (working tree 영역 손실 X / commit pointer만 이동). 사용자 승인 영역 (1회 한정).

---

## 3. UI Drawer 영역 unstage (이미 origin/main `04ac5bf`에 있음)

```bash
git restore --staged src/app/pc.css
git restore --staged src/components/pc/panels/
git restore --staged tmp/qa-ui-drawer-consistency-results/
```

다른 영역도 staged 상태면 list로 확인 + unstage.

---

## 4. 산출물 영역만 staged 상태 검증

```bash
git status --short
```

**기대 상태**: `A  tmp/qa-script-polish-audit-results/*` 만 staged. 다른 영역 모두 unstaged 또는 untracked.

다음 중 하나라도 발견 시 **즉시 중단 + CT-Main 보고** (stash / discard / 추가 reset 금지):
- UI Drawer 영역 (`src/app/pc.css` / `src/components/pc/panels/*` / `tmp/qa-ui-drawer-consistency-results/*`)이 staged 또는 unstaged로 남음
- `src/*` 파일이 staged 또는 unstaged로 남음
- 모르는 untracked 영역 staged

---

## 5. commit + push

```bash
git commit -m "docs(qa): add script polish audit findings"
git push origin main
```

---

## 6. 검증

```bash
git status --short --branch              # tracked clean / origin sync
npm run check:all                        # PASS
```

---

## 7. 절대 회피선

- `git reset --hard` 금지
- `git stash` 금지
- `git checkout` discard 계열 금지
- soft reset은 이번 1회만 (사용자 명시)
- `tmp/qa-script-polish-audit-results/` 외 영역 stage 금지
- UI Drawer 영역 / `src/*` / 모르는 untracked 영역 stage 금지
- `pc.css` 직접 stage 금지
- 다른 영역 발견 시 즉시 중단 + 보고 (자체 처리 X)

---

## 8. 보고

commit + push 완료 후 commit SHA + CT-Main에 보고. 다른 영역 / 예상 외 staged 영역 발견 시 **자체 처리 X / 즉시 보고**.
