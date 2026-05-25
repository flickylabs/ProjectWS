---
name: feedback-codex-worktree-safe-directory
description: Codex worktree spawn 시 git safe.directory 필수. user.name/email/gpgsign만으로는 부족 — dubious ownership 검사가 Codex의 npm script 안 git 호출까지 막음. 2026-05-20 사고 학습.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 72eda7fc-b42f-48cf-a405-0c00e717b715
---

# Codex worktree spawn 시 safe.directory 필수

**Why**:
2026-05-20 Release Final QA Q1/Q2/Q3 spawn 시 권한 부여 영역에서 사고 발생. PowerShell 스크립트에 다음 3 줄만 넣음:
```powershell
git -C $wt config user.name "codex"
git -C $wt config user.email "codex@local"
git -C $wt config commit.gpgsign false
```
사용자가 "권한 챙겼냐" 두 번이나 물었고, "챙겼다" 답변. 그러나 실제 Codex 세션 진행 중 모두 `dubious ownership` 에러로 git 호출 실패:
```
fatal: detected dubious ownership in repository at 'D:/solomon-q1-popup-sweep'
```

원인: worktree directory가 `BUILTIN/Administrators`로 만들어졌는데 (관리자 권한으로 PowerShell 돌렸을 때) 현재 사용자(`DESKTOP-.../user`) 소유가 아니라서 git이 안전 검사로 reject. 이는 git 2.35+ 기본 동작.

Codex 3 thread 모두 자체 workaround로 우회 — qa:fast 실행 중 process 환경 변수에 `safe.directory` 주입. 사용자 시간 낭비 + Claude 신뢰 손실.

**How to apply**:

Codex worktree spawn 시 4 줄 모두 포함:
```powershell
foreach ($t in $threads) {
  $wt = "D:/solomon-$($t.slug)"
  $br = "codex/$($t.slug)"
  git worktree add $wt -b $br main
  git -C $wt config user.name "codex"
  git -C $wt config user.email "codex@local"
  git -C $wt config commit.gpgsign false
  git config --global --add safe.directory $wt   # ← 누락 시 사고
}
```

**대안 검증 방법** (spawn 전):
```bash
# 새로 만든 worktree에 가서 git status 실행 시 dubious ownership 안 뜨면 OK
git -C D:/solomon-test status
```

**관련 사고**:
- 2026-05-20 Release Final QA Q1/Q2/Q3 spawn — 사용자 시간 낭비 + "권한 챙겼냐" 두 번 질문 후 사고 발견.
- main에서 cherry-pick할 때도 같은 에러 — `git fetch D:/solomon-q2-i18n-audit ...` 실패. cherry-pick은 그래도 SHA 기반으로 가능 (worktree들이 같은 object DB 공유).

**관련 메모리**:
- [[feedback-shared-worktree-no-parallel-with-dirty]] — 병렬 spawn 시 worktree 별도 필수
- [[feedback-no-codex-on-uncommitted]] — Codex 영역 분리 원칙
