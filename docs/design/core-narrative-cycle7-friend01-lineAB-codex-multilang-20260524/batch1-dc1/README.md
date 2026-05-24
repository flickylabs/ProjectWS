# Codex Batch 1 — friend-01 dc-1 (단톡방 글의 근거) 다국어 sync

## 폴더 목적

Codex worktree 통째 업로드용 self-contained 묶음. 외부 참조 X.

## 폴더 파일 (총 6개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 13 entry × 3 lang = 39 entry sync (entry list는 메인 세션이 GPT 응답 도착 후 채움) + dc-1 label 변경 영역 |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | "사건 카드" → "단서" 명칭 변경 (Cycle 5 도입, 본 batch 일괄 적용) |

## Codex 사용 절차

1. worktree spawn (sync.md §0)
2. 본 폴더 파일 worktree에 복사 또는 참조
3. sync.md §3 다국어 번역 원칙 + friend-01 기존 entry 톤 참조하여 39 entry 작성
4. dc-1 label 다국어 변경 ("확인 없이 매도한 건 누구인가" → "단톡방 글의 근거" 의 EN/JA/ZH-CN)
5. 검증 (sync.md §5)
6. branch push (sync.md §6)

## 메인 session 후속

Codex push 도착 시:
1. `git fetch origin`
2. `git log origin/codex/friend01-cycle7-batch1-multilang` 확인
3. fast-forward merge 또는 JSON union script

## 자매 batch

- batch2 (dc-2 + e-4), batch3 (w-1), batch4 (w-2) 와 ScriptedText entry id 영역 겹침 X → **4 worktree 병렬 진행 가능**.
- 단 dc-1 label 변경은 본 batch 단독 영역 (dossier label은 단일 위치 — 다른 batch 영향 X)
