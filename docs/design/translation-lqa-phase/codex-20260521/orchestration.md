---
name: codex-20260521-orchestration
description: 2026-05-21 9 thread (case+lang) 병렬 Codex spawn + 통합 계획 + cherry-pick 가이드
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
---

# Orchestration — 2026-05-21 witness/family-truth/cutscene 다국어 적용

Anchor: `afbc7c4b` (main HEAD).

본 문서는 9 thread (case × lang) 병렬 Codex spawn + 결과 통합 가이드.

---

## 1. Thread 매트릭스

| Thread ID | Case | Lang | Brief | Worktree | Branch |
|---|---|---|---|---|---|
| T1 | spouse-01 | EN | [thread-spouse01-en.md](thread-spouse01-en.md) | `D:/solomon-codex-spouse-en` | `codex/witness-cutscene-spouse-en` |
| T2 | spouse-01 | JA | [thread-spouse01-ja.md](thread-spouse01-ja.md) | `D:/solomon-codex-spouse-ja` | `codex/witness-cutscene-spouse-ja` |
| T3 | spouse-01 | ZH-CN | [thread-spouse01-zh.md](thread-spouse01-zh.md) | `D:/solomon-codex-spouse-zh` | `codex/witness-cutscene-spouse-zh` |
| T4 | family-01 ⚠️ | EN | [thread-family01-en.md](thread-family01-en.md) | `D:/solomon-codex-family-en` | `codex/witness-cutscene-family-en` |
| T5 | family-01 ⚠️ | JA | [thread-family01-ja.md](thread-family01-ja.md) | `D:/solomon-codex-family-ja` | `codex/witness-cutscene-family-ja` |
| T6 | family-01 ⚠️ | ZH-CN | [thread-family01-zh.md](thread-family01-zh.md) | `D:/solomon-codex-family-zh` | `codex/witness-cutscene-family-zh` |
| T7 | friend-01 | EN | [thread-friend01-en.md](thread-friend01-en.md) | `D:/solomon-codex-friend-en` | `codex/witness-cutscene-friend-en` |
| T8 | friend-01 | JA | [thread-friend01-ja.md](thread-friend01-ja.md) | `D:/solomon-codex-friend-ja` | `codex/witness-cutscene-friend-ja` |
| T9 | friend-01 | ZH-CN | [thread-friend01-zh.md](thread-friend01-zh.md) | `D:/solomon-codex-friend-zh` | `codex/witness-cutscene-friend-zh` |

⚠️ T4/T5/T6 (family-01): 영역 최대 + case truth 정정 포함. 검증 가장 신중.

공통 base 의뢰서: [codex-20260521-witness-family-cutscene-multilang.md](../codex-20260521-witness-family-cutscene-multilang.md)

---

## 2. Worktree 일괄 생성

PowerShell 한 번에 9 worktree:

```powershell
cd D:/ProjectWS
git fetch

# 9 worktree spawn
$threads = @(
  @{ Path = "D:/solomon-codex-spouse-en";  Branch = "codex/witness-cutscene-spouse-en" }
  @{ Path = "D:/solomon-codex-spouse-ja";  Branch = "codex/witness-cutscene-spouse-ja" }
  @{ Path = "D:/solomon-codex-spouse-zh";  Branch = "codex/witness-cutscene-spouse-zh" }
  @{ Path = "D:/solomon-codex-family-en";  Branch = "codex/witness-cutscene-family-en" }
  @{ Path = "D:/solomon-codex-family-ja";  Branch = "codex/witness-cutscene-family-ja" }
  @{ Path = "D:/solomon-codex-family-zh";  Branch = "codex/witness-cutscene-family-zh" }
  @{ Path = "D:/solomon-codex-friend-en";  Branch = "codex/witness-cutscene-friend-en" }
  @{ Path = "D:/solomon-codex-friend-ja";  Branch = "codex/witness-cutscene-friend-ja" }
  @{ Path = "D:/solomon-codex-friend-zh";  Branch = "codex/witness-cutscene-friend-zh" }
)

foreach ($t in $threads) {
  git worktree add $t.Path -b $t.Branch afbc7c4b
  Push-Location $t.Path
  git config user.name "codex"
  git config user.email "codex@anthropic.local"
  git config commit.gpgsign false
  git config --global --add safe.directory $t.Path
  Pop-Location
}

git worktree list
```

⚠️ `git config --global --add safe.directory` 필수 — [[feedback-codex-worktree-safe-directory]] 메모리 학습 사례 (이전 Q1/Q2/Q3 spawn 사고).

---

## 3. Codex spawn 명령 (각 thread)

각 worktree에서 Codex CLI 또는 다른 spawn 메커니즘으로:

```
codex --workdir <worktree> --prompt "Read docs/design/translation-lqa-phase/codex-20260521/<thread-brief>.md and the base 의뢰서. Apply KO changes as the brief specifies for {case} {lang}. Output result md in docs/design/translation-lqa-phase/codex-20260521/result-{case}-{lang}.md."
```

(spawn 명령 자체는 사용자 도구에 맞게 조정.)

---

## 4. 통합 (cherry-pick) 순서

9 thread 모두 완료 후 main 세션에서:

```powershell
cd D:/ProjectWS

# 1. spouse 3 lang
git cherry-pick codex/witness-cutscene-spouse-en
git cherry-pick codex/witness-cutscene-spouse-ja
git cherry-pick codex/witness-cutscene-spouse-zh

# 2. family 3 lang ⚠️ (case truth 정정 검증 신중)
git cherry-pick codex/witness-cutscene-family-en
git cherry-pick codex/witness-cutscene-family-ja
git cherry-pick codex/witness-cutscene-family-zh

# 3. friend 3 lang
git cherry-pick codex/witness-cutscene-friend-en
git cherry-pick codex/witness-cutscene-friend-ja
git cherry-pick codex/witness-cutscene-friend-zh
```

### 4.1. 충돌 영역

**localized.ts 충돌**: 9 thread 모두 같은 파일을 수정 (각 case+lang overlay 블록). 같은 hunk가 아니라 file-level conflict는 manual 해결 (각 case overlay 블록이 독립이라 의미 conflict X).

cherry-pick 순서를 위 sequence로 하면 spouse → family → friend 영역이 순차 추가됨. 한 번에 하나씩 cherry-pick하고 conflict 발생 시 union of changes 형태로 resolve.

### 4.2. cutsceneText 충돌 X

각 thread는 자기 case 영역만 (spouse는 spouse 4 파일, family는 family 5 파일, friend는 friend 5 파일). 다른 case는 건드리지 X. 단 같은 case의 EN/JA/ZH 3 thread는 같은 파일의 다른 lang key를 수정 — file-level conflict 가능.

해결: 같은 case 안 3 lang은 sequential cherry-pick. 충돌 발생 시 lang별 key가 다르므로 union 형태로 resolve.

### 4.3. case data (family-01만)

T4/T5/T6는 `src/data/cases/generated/family-01.{en,ja,zh-CN}.json` 각각 다른 파일. 충돌 X.

---

## 5. 통합 후 검증

cherry-pick 완료 후:

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs    # 0건 baseline 유지
npm run qa:lqa
npm run qa:cutscene                   # 길이 / emdash 패턴 P1 영향 확인
```

### 5.1. 진실 누설 영역 (zero tolerance)

family-01 d-4 truth 정정이 가장 risk 큼. 다음 확인:
- 다국어 영역에서 "Yoon Jeong-hu is not the biological son" 같은 역방향 오류 X
- 박순애 testimony 주체 "본인" = 윤태성 (the older brother)으로 명시되었는지

발견 시 해당 thread 결과 revert + retry brief.

---

## 6. 산출물 정리

각 thread 완료 후 다음 산출물:
- `D:/solomon-codex-{case}-{lang}` worktree 안 WRITE commits
- `docs/design/translation-lqa-phase/codex-20260521/result-{case}-{lang}.md` (변경 요약 + 검증 결과)

main 세션에서 cherry-pick 후:
- `docs/design/translation-lqa-phase/codex-20260521/integration-report.md` (전체 통합 결과)

origin push 결정은 사용자 별도 결정.

---

## 7. Rollback 가이드

문제 발생 시:
- 단일 thread 회귀: 해당 branch revert + thread 재실행
- 통합 단계 회귀: 마지막 cherry-pick commit revert
- 전체 회귀: `git reset --hard afbc7c4b`

회귀 시점에 cf41ce93 + afbc7c4b 두 commit은 유지 (이미 보존).

---

## 8. 추정 비용

- Worktree 9개 생성: ~5분 + 디스크 (각 worktree node_modules 없음 — 추후 검증 시 install 필요할 수 있음, 메인에서 검증하면 skip 가능)
- Codex thread 작업: 병렬 9개 동시 가능 시 ~30분 / sequential 시 ~3시간
- Cherry-pick + 검증: ~15분
- 총 예상: 1~3시간

---

## 9. 메모리 reference

- [[session-handoff-20260521-witness-truth-cutscene-complete]] — 본 batch 인계
- [[feedback-codex-worktree-safe-directory]] — worktree spawn 안전 규칙
- [[feedback-claude-ko-needs-codex-multilang]] — KO 변경 다국어 의뢰 원칙
- [[design-spouse01-truth-disclosure-policy]] — spouse-01 노출 정책
- [[design-truth-leak-keyword-nature]] — hidden keyword 본성 분류
