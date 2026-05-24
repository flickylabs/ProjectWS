# Codex Thread — spouse-01 emerge-e-5 narrative 다국어 sync

## 폴더 목적

Codex worktree에 통째 업로드용 self-contained 묶음. 외부 참조 X.

## 폴더 파일 (총 5개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 17 entry × 3 lang = 51 entry sync 명세 |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |

## Codex 사용 절차

1. worktree spawn (의뢰서 §0)
2. 본 폴더 5개 파일 worktree에 복사 또는 참조
3. 의뢰서 §3 다국어 번역 원칙 + spouse-01 기존 entry 톤 참조하여 51 entry 작성
4. 검증 (의뢰서 §5)
5. branch push (의뢰서 §6)

## 메인 session 후속

Codex push 도착 시:
1. `git fetch origin`
2. `git log origin/codex/spouse01-emerge-e5-multilang` 확인
3. fast-forward merge 또는 cherry-pick
4. 본 cycle (Cycle 1 sample) 완료 보고
