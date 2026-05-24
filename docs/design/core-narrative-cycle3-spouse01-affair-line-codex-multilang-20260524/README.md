# Codex Thread — spouse-01 Cycle 3 외도 line 다국어 sync (단일 batch)

## 폴더 목적

Codex worktree 통째 업로드용 self-contained 묶음. 외부 참조 X.

본 폴더 = **단일 batch** (4 emergence 51 entry 일괄). Cycle 2 자금 line이 4 batch로 분할된 것과 달리 Cycle 3는 외도 line 단일 batch로 진행.

## 폴더 파일 (총 5개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 51 entry × 3 lang = 153 entry sync |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 (git safe.directory 필수) |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | PowerShell UTF-8 인코딩 주의 |

## Codex 사용 절차

1. worktree spawn (sync.md §0)
2. 본 폴더 5개 파일 worktree에 복사 또는 참조
3. KO baseline 확인 (main HEAD `6308113c` 시점)
4. sync.md §3 다국어 번역 원칙 + spouse-01 기존 entry 톤 참조하여 153 entry 작성
5. 검증 (sync.md §5)
6. branch push (sync.md §6)

## 메인 session 후속

Codex push 도착 시:
1. `git fetch origin`
2. `git log origin/codex/spouse01-cycle3-affair-line-multilang` 확인
3. fast-forward merge (단일 batch이므로 JSON union script 불필요)

## 단일 batch 권위

51 entry는 같은 emergence_narrative 채널의 4 새 key (emerge-e-4 / emerge-dc-1 / emerge-w-1 / emerge-dc-2)에 묶음 추가. main에 동일 file 동시 변경 영역 없음 (다른 Cycle 3 worktree 없음 + family-01/friend-01 worktree는 자기 사건 파일만 변경) → **fast-forward merge 안전**.
