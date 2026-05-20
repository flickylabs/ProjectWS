---
name: codex-20260521-spawn-runbook
description: 2026-05-21 9 thread Codex spawn 실전 절차 — PowerShell batch / VS Code window / Claude prompt / 검증 / 통합 cherry-pick
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
---

# Spawn Runbook — 2026-05-21 9 thread 병렬 진행

본 문서는 위에서 만든 9 worktree에 VS Code window를 띄우고 각 window의 Claude Code Extension에 작업을 위임하는 실전 절차이다. 메인 세션(여기, Claude Opus 4.7 1M)이 마지막에 cherry-pick + 통합 검증을 수행한다.

Anchor: `afbc7c4b` (main HEAD).

---

## §0. 전제

- 9 worktree 이미 생성됨 (orchestration §2 완료).
- 각 worktree에 `git config user.codex` + `safe.directory` 적용됨.
- VS Code Native Extension 환경 (Windows 11 + PowerShell 5.1).
- Claude Code Extension이 user-level 권한 (`C:\Users\user\.claude\settings.json`) + memory를 자동 로드.
- 메인 세션은 통합 + 검증 + cherry-pick 충돌 해결 담당. **각 worktree 작업은 그 window의 Claude가 자율 진행.**

---

## §1. Step-by-step

### Step 1 — 메인 worktree clean 확인 (PowerShell)

```powershell
cd D:/ProjectWS
git status --short
git log -1 --oneline
```

기대 결과: working tree clean, HEAD = `afbc7c4b`.

### Step 2 — 9 VS Code window 일괄 open (PowerShell)

PowerShell 한 줄로 9개를 동시에:

```powershell
$worktrees = @(
  "D:/solomon-codex-spouse-en",  "D:/solomon-codex-spouse-ja",  "D:/solomon-codex-spouse-zh",
  "D:/solomon-codex-family-en",  "D:/solomon-codex-family-ja",  "D:/solomon-codex-family-zh",
  "D:/solomon-codex-friend-en",  "D:/solomon-codex-friend-ja",  "D:/solomon-codex-friend-zh"
)
foreach ($wt in $worktrees) { code $wt }
```

⚠️ **주의**: `code` 명령 9번 = 9 새 window. CPU/메모리 부담 있음. 점진적 spawn (3+3+3) 원하면:

```powershell
# Wave A — spouse 3 lang
$worktrees[0..2] | ForEach-Object { code $_ }
# 점검 후 다음 wave
$worktrees[3..5] | ForEach-Object { code $_ }   # family 3 lang
$worktrees[6..8] | ForEach-Object { code $_ }   # friend 3 lang
```

### Step 3 — 각 window 권한 부여 (사용자 manual)

각 새 window 열릴 때:

1. **VS Code Workspace Trust 프롬프트** — "Do you trust the authors of the files in this folder?" 뜨면 → **Yes, I trust the authors** 클릭
2. **Claude Code Extension 패널 열기** — 단축키 (기본 `Ctrl+Esc` 또는 사이드바 Claude 아이콘)
3. **첫 도구 호출 시 권한 prompt** — Bash/Edit/Write 등 권한 요청 시 → **Allow** (worktree 안에서만 작업하므로 안전)

권한이 매 도구마다 묻는 게 번거로우면, 처음 한 번에 `.claude/settings.local.json` 영역으로 미리 허용 가능. 다만 9 worktree 각각 적용하는 게 더 일이라 그냥 첫 호출 시 Allow가 효율적.

### Step 4 — 각 window에 prompt 전달

각 window의 Claude Code 패널에 아래 prompt를 paste (case+lang 자리만 바꿔서 9번).

#### 4.1. spouse-01 (3 thread 공통 — lang만 다름)

EN window에서:
```
이 worktree는 spouse-01 EN thread (codex/witness-cutscene-spouse-en).
HEAD baseline = afbc7c4b.

작업 brief 정독 후 작업 수행:
- 본 thread brief: docs/design/translation-lqa-phase/codex-20260521/thread-spouse01-en.md
- base 의뢰서: docs/design/translation-lqa-phase/codex-20260521-witness-family-cutscene-multilang.md

작업 영역 (brief §1):
1. src/data/witnessTestimonyData/localized.ts 안 SPOUSE_01_OVERLAYS.en 영역 — 6 slot (w1-d1-resident-info, w1-d1-no-single-woman, w1-d1-core, w2-d2-cash-pattern, w2-hd3-signature-doubt, w2-hd3-core) — 새 KO와 일치하게 EN 갱신
2. src/data/cutsceneText/spouse-01/{d-1,d-2,h-d3,h-d4}.json → slip_explosive.phase2.en 키 4건 — base 의뢰서 §4 spouse-01 EN 톤 가이드 따름
3. (조사) src/data/cases/generated/spouse-01.en.json / src/data/scriptedText/spouse-01.en.json mirror 영역 — 변경된 KO 영역에 대응하는 EN이 있다면 검토 갱신

KO 원문은 brief + base 의뢰서 §2/§4에 표 형태로 명시됨. KO 변경의 의미·의도 정확히 반영하여 EN 번역.

검증:
- npx tsc -b --noEmit (typecheck PASS)
- npm run qa:fast (P0=0)
- node scripts/detect-truth-leak.cjs (0건 baseline)

산출:
- WRITE commit (영역별 분리 가능)
- docs/design/translation-lqa-phase/codex-20260521/result-spouse01-en.md (변경 요약 + 검증 결과)

안전 규칙: brief §2 절대 준수. KO 정본/다른 lang/spouse 외 case 절대 수정 X. origin push X.

완료하면 final commit hash + result md path 보고.
```

JA / ZH-CN 동일한 형식으로 `spouse01-en` → `spouse01-ja` / `spouse01-zh`, `EN` → `JA` / `ZH-CN`, `phase2.en` → `phase2.ja` / `phase2.zh-CN` 치환. (각 thread brief 안에 lang별 정확한 경로/키 명시됨)

#### 4.2. family-01 (⚠️ 영역 최대 + truth 정정)

EN window:
```
이 worktree는 family-01 EN thread (codex/witness-cutscene-family-en).
HEAD baseline = afbc7c4b.

⚠️ 영역 최대: witness 13 slot + case data 6 truth 영역 + cutscene 5 dispute. case truth 정정 포함.

작업 brief: docs/design/translation-lqa-phase/codex-20260521/thread-family01-en.md
base 의뢰서: docs/design/translation-lqa-phase/codex-20260521-witness-family-cutscene-multilang.md

작업 영역 (brief §1):
1. src/data/witnessTestimonyData/localized.ts 안 FAMILY_01_OVERLAYS.en — 13 slot
   - w1-d2-before-brother-arrives, w1-d3-avoid-conflict ⭐
   - w-2 6 slot (출장 공증인 sweep 적용 — topic/question/testimony 전부)
   - w-3 5 slot (박순애)
2. src/data/cases/generated/family-01.en.json — base 의뢰서 §3 6 truth 영역 EN 적용
   - partyB dailyRoutine / d-3 truthDescription / d-4 truthDescription (핵심 정정) / e-7 restore_context / truthTable t-4 / officialRecord 4 / evidence-2 restore_context / e-7 v3DepthPlan summary
3. src/data/cutsceneText/family-01/{d-1~d-5}.json → slip_explosive.phase2.en 5건
4. (검토) src/data/scriptedText/family-01.en.json — 변경된 KO truth 영역(공장 양보/친자/일기) 일관성 확인 + 어긋난 부분만 수정

⚠️ ZERO-TOLERANCE 진실 누설 검증 (D5):
- 박순애 w3-d3-why-kept-secret testimony의 "본인이 아버지 친자가 아닌 것을 눈치채고" → 주어 = 큰아들(윤태성), 본인 = 그 큰아들 자신. EN: "perhaps he himself had noticed that he is not his father's biological son". 절대 정후를 가리키게 X.
- d-4 truthDescription "윤태성이 아버지의 친자가 아니라는" → EN: "that Yoon Tae-seong (the older brother) is not Father's biological son". 역방향 오류 X.
- 친자인 윤정후가 가업 공장을 형에게 양보한 사실 정확 번역.

검증:
- npx tsc -b --noEmit
- npm run qa:fast (P0=0)
- node scripts/detect-truth-leak.cjs (0건 baseline 유지 — 회귀 시 stop)
- npm run qa:lqa (verify pass)

산출:
- WRITE commits (witness / case data / cutscene 분리 추천)
- docs/design/translation-lqa-phase/codex-20260521/result-family01-en.md

안전 규칙: brief §2 + truth-leak zero tolerance. KO/다른 lang/spouse/friend 절대 수정 X.

완료 시 final commit hash + result md path + truth-leak 검증 결과 보고.
```

JA / ZH-CN 동일 형식 + 박순애 주체 명시 (JA: "本人 = 兄(尹泰成)" / ZH: "本人 = 大儿子(尹泰成)").

#### 4.3. friend-01 (3 thread 공통)

EN window:
```
이 worktree는 friend-01 EN thread (codex/witness-cutscene-friend-en).
HEAD baseline = afbc7c4b.

작업 brief: docs/design/translation-lqa-phase/codex-20260521/thread-friend01-en.md
base 의뢰서: docs/design/translation-lqa-phase/codex-20260521-witness-family-cutscene-multilang.md

작업 영역 (brief §1):
1. src/data/witnessTestimonyData/localized.ts 안 FRIEND_01_OVERLAYS.en — 12 slot
   - w-1 5 slot (김세라), w-2 4 slot (박준혁), w-3 3 slot (오미경)
2. src/data/cutsceneText/friend-01/{d-1~d-5}.json → slip_explosive.phase2.en 5건
   - d-5는 송다은 시점, 나머지는 최수민 시점 (시점 전환 주의)
3. (검토) friend-01.en.json mirror

오미경 testimony 주체 명확화 (다국어에서 명시):
- "그 남성분" = 송다은 아버지 (older man / Daeun's father)
- "그 젊은 분" = 최수민 (younger woman / Sumin)

검증:
- npx tsc -b --noEmit
- npm run qa:fast (P0=0)
- node scripts/detect-truth-leak.cjs (0건)

산출:
- WRITE commit + docs/design/translation-lqa-phase/codex-20260521/result-friend01-en.md

안전 규칙: brief §2 절대 준수. KO/다른 lang/spouse/family 절대 수정 X.

완료 시 final commit hash + result md path 보고.
```

JA / ZH-CN 동일.

### Step 5 — 각 worktree 진행 모니터링 (메인에서)

각 worktree의 진행 상황을 메인 PowerShell에서 모니터링:

```powershell
$worktrees = @(
  "D:/solomon-codex-spouse-en",  "D:/solomon-codex-spouse-ja",  "D:/solomon-codex-spouse-zh",
  "D:/solomon-codex-family-en",  "D:/solomon-codex-family-ja",  "D:/solomon-codex-family-zh",
  "D:/solomon-codex-friend-en",  "D:/solomon-codex-friend-ja",  "D:/solomon-codex-friend-zh"
)
foreach ($wt in $worktrees) {
  Write-Output "=== $wt ==="
  Push-Location $wt
  git log --oneline afbc7c4b..HEAD
  git status --short
  Pop-Location
}
```

기대: 각 worktree에 1~3 commit 추가됨 (witness / case data / cutscene 분리). working tree clean.

result md 일괄 확인:

```powershell
Get-ChildItem D:/ProjectWS/docs/design/translation-lqa-phase/codex-20260521/result-*.md -ErrorAction SilentlyContinue | Select-Object Name, Length
```

기대: 9 result md.

### Step 6 — 메인 세션 (여기) cherry-pick + 통합 검증

9 thread 모두 완료 보고가 오면 메인 세션에 알리세요. 그러면 다음을 진행:

#### 6.1. 사전 점검 (메인 세션이 수행)

각 branch의 commit 변경 sanity check:
- 변경 파일이 brief 영역 범위 안에만 있는지
- KO / 다른 lang / 다른 case 영역 침범 X
- localized.ts 안 각 case overlay 블록만 손댐

이상 발견 시 해당 thread 결과 revert + retry brief.

#### 6.2. cherry-pick 순서

```
# spouse 3 lang (낮은 risk)
git cherry-pick codex/witness-cutscene-spouse-en
git cherry-pick codex/witness-cutscene-spouse-ja
git cherry-pick codex/witness-cutscene-spouse-zh

# family 3 lang ⚠️ (truth 정정 — 가장 신중)
git cherry-pick codex/witness-cutscene-family-en
node scripts/detect-truth-leak.cjs    # 직후 검증
git cherry-pick codex/witness-cutscene-family-ja
node scripts/detect-truth-leak.cjs
git cherry-pick codex/witness-cutscene-family-zh
node scripts/detect-truth-leak.cjs

# friend 3 lang
git cherry-pick codex/witness-cutscene-friend-en
git cherry-pick codex/witness-cutscene-friend-ja
git cherry-pick codex/witness-cutscene-friend-zh
```

#### 6.3. localized.ts conflict 처리

같은 파일을 9 thread가 수정 → cherry-pick 시 file-level conflict 가능. 의미적으로는 독립 (각 case+lang overlay 블록이 분리). 메인 세션이 manual union resolve.

#### 6.4. cutsceneText/{case}/*.json conflict

같은 case 안 3 lang은 같은 파일의 다른 key를 수정. cherry-pick file-level conflict 가능. 메인 세션이 manual union (lang key 별로 add).

#### 6.5. 통합 후 검증

```
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs    # 0건 maintain
npm run qa:lqa
npm run qa:cutscene
```

⚠️ family-01 영역 회귀 발견 시 → 해당 commit revert + retry brief 작성.

### Step 7 — 정리

통합 + 검증 PASS 후 메인 세션이 정리:

1. `integration-report.md` 작성 — 9 thread 결과 요약 + 검증 통과 기록
2. (선택) 9 worktree 정리:
   ```powershell
   foreach ($wt in $worktrees) { git worktree remove $wt --force }
   git branch -D codex/witness-cutscene-*    # 또는 보존 — 사용자 결정
   ```
3. origin push 결정 (cf41ce93 + afbc7c4b + 9 cherry-pick commit)

---

## §2. 권한 관련 메모

### 2.1. Claude Code Extension 권한 source

권한 순위 (높은 → 낮은):
1. 각 worktree의 `.claude/settings.local.json` (worktree 한정, gitignore됨)
2. 각 worktree의 `.claude/settings.json` (commit됨)
3. user-level `C:\Users\user\.claude\settings.json` (모든 worktree 공유)
4. 명령 실행 시점 prompt (Allow / Deny / Always)

### 2.2. 자주 묻는 권한 (도구별)

각 worktree에서 처음 호출 시 prompt 뜨는 도구:
- `Bash`: `npx tsc`, `node scripts/...`, `npm run` 등 → **Allow**
- `Edit` / `Write`: src/ 안 KO 영역 외 — brief 명시된 lang 영역 → **Allow**
- 외부 네트워크 (`WebFetch`): 본 작업에는 불필요. 도달 시 의심.

### 2.3. user-level settings.json 확인 (메인에서 1회)

```powershell
Get-Content C:\Users\user\.claude\settings.json
```

메인에서 자주 쓰는 명령(`npm run`, `git`, etc.)이 이미 allowlist에 있으면 worktree도 자동 적용.

---

## §3. Troubleshooting

### 3.1. VS Code window 안 열림 → `code` 명령 PATH 확인

```powershell
Get-Command code
```

없으면 VS Code 설치 시 "Add to PATH" 옵션 활성화 또는 manual 추가.

### 3.2. Worktree 안에서 `git status` 오류 (dubious ownership)

`git config --global --add safe.directory` 이미 적용됨. 재발 시 메인에서:

```powershell
git config --global --get-all safe.directory
```

worktree path 9개 모두 있어야 함.

### 3.3. Claude Code Extension 권한 prompt 너무 자주 뜸

worktree별 `.claude/settings.local.json` 만들어 `allow` 추가:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npx tsc *)",
      "Bash(node scripts/*)",
      "Bash(git *)",
      "Edit(*)",
      "Write(*)"
    ]
  }
}
```

가장 안전: 위 파일을 메인 `D:/ProjectWS/.claude/settings.local.json`에 두고 worktree에 cp. (단 .claude/는 gitignore에 있어야 함)

### 3.4. 한 worktree 작업 너무 오래 걸림

각 thread는 medium scope. family-01만 영역 큼 (1~2시간). spouse/friend는 ~30분. 1시간 이상 정체 시 해당 window 작업 상태 확인.

### 3.5. Thread 결과에 KO 정본 수정 포함 발견

회귀. revert 후 retry brief 강조: "KO 정본은 절대 수정 X". 

### 3.6. truth-leak 회귀 발견

해당 thread cherry-pick revert + retry brief에 박순애 주체 등 명시 강화.

---

## §4. 요약 timeline

| Step | 행위자 | 예상 시간 |
|---|---|---|
| 1 | 메인 PowerShell | <1분 (clean 확인) |
| 2 | 메인 PowerShell | <1분 (9 window open) |
| 3 | 사용자 manual | 9 × 1분 (workspace trust + Claude 패널) |
| 4 | 사용자 manual + 각 window Claude | spouse/friend ~30분, family ~1-2시간 (병렬) |
| 5 | 메인 PowerShell | <5분 (모니터링) |
| 6 | 메인 세션 Claude (여기) | 30분 (cherry-pick + 충돌 해결 + 검증) |
| 7 | 메인 세션 | 10분 (report + cleanup) |

총 예상: **1.5~2.5시간** (병렬 진행 시).
