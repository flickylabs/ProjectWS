# Codex Thread — friend-01 Cycle 9 Line D narrative wrapper 다국어 sync (Upload Bundle)

## 본 thread 범위 — friend-01 narrative wrapper 영역 마지막 cycle (사건 전체 종료)

Cycle 9 Line D 종합 narrative wrapper의 다국어 sync:

- 3 신규 emergence (e-7 / d-5 / dc-5) × 4 trigger × 3 KO entry = **36 KO entries**
- EN / JA / ZH-CN 4언어 sync = **108 외국어 variants**
- 단일 file 영역 (`src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` channels.emergence_narrative)
- 본 cycle 영역에는 dossier label 변경 또는 cases/generated 영역 변경 **없음** (KO Authority의 narrativeTriggers 부착만)

## KO baseline anchor

| commit | 영역 |
|---|---|
| `3a1c2b79` | docs(friend-01) — Cycle 9 0~3단계 GPT Pro 의뢰서 폴더 |
| `df326a17` | **feat(friend-01) — Cycle 9 6단계: narrativeTriggers 3 emergence + 36 KO entries (본 의뢰서 baseline anchor)** |

본 의뢰서는 `df326a17` KO baseline의 외국어 sync.

## 진입 조건 (Codex worktree)

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-cycle9-narrative-multilang ../ws-friend01-cycle9-narrative-multilang friend-01-cycle-9` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean + `git log -1 --oneline` = `df326a17` 이상 |
| 파일 변경 도구 | Write/Edit tool 사용 (PowerShell 인코딩 mojibake 회피) |
| 산출 | branch `codex/friend01-cycle9-narrative-multilang` push |

## 업로드 파일 (총 9개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — entry table + cascade reference + 다국어 baseline 제안 |
| 2 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | friend-01 진실 노출 정책 (본 cycle 핵심 — 그룹 5 단어 다국어 baseline) |
| 3 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade trigger spec (priorCard reference text 다국어 일관) |
| 4 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 (다국어에서도 평가 어휘 회피) |
| 5 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 단서 명칭 (clue / 手がかり / 线索) |
| 6 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline anchor 권위 |
| 7 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO → Codex 다국어 sync 절차 |
| 8 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | git safe.directory (worktree spawn 시) |
| 9 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 encoding (Windows 환경) |

## Codex 사용 절차

1. worktree spawn (위 §진입 조건)
2. 위 9개 파일 정독 (또는 Codex CLI에 self-contained 폴더 통째 제공)
3. 다음 prompt:
   ```
   첨부한 codex-multilang-sync.md 의뢰서대로 friend-01 Cycle 9 Line D narrative wrapper 다국어 sync.

   baseline anchor: df326a17 (KO ScriptedText 36 신규 entries)
   영향 file: src/data/scriptedText/friend-01.{en,ja,zh-CN}.json
   변경 영역: channels.emergence_narrative.entries 배열에 emerge-e-7 / emerge-d-5 / emerge-dc-5 3 신규 entries 추가 (각 12 외국어 variants = 36 외국어 × 3 lang = 108 외국어 variants)

   준수 정책:
   - design_friend01_truth_disclosure_policy: 그룹 5 단어 봉인 정책 다국어 일관 (d-5 S0~S2 surface 영역)
   - design_narrative_cascade_from_card: cascade priorCard reference text 다국어 referent 일관
   - feedback_judge_dispassionate_action_focused: 재판관 어법 다국어 보존 (평가 어휘 회피)
   - feedback_dossier_card_renamed_to_clue: "단서" 명칭 다국어 (clue / 手がかり / 线索)

   다국어 baseline 신규 (본 cycle):
   - dc-5 label "낙인의 순서" → EN "The Order of Public Judgment" / JA "烙印の順序" / ZH-CN "烙印的顺序"
   - e-7 surfaceName "두 시점 대조표" → EN "Then-and-Now Comparison" / JA "二つの時点の対比表" / ZH-CN "两个时点对照表"

   캐릭터 frame 다국어 보존:
   - B (최수민) affect_flattening: 자제·단답 frame
   - A (송다은) premature_summary: 결론 먼저 + 격앙 부정 (본 cycle은 frame 약화 단계)
   - dc-5 cascade-d5 영역의 종결감: A 어깨가 처음으로 내려가는 행위 hint 다국어 보존

   완료 후 다음 검증 모두 PASS:
   - npx tsc --noEmit
   - npm run -s qa:fast (RELEASE READY)
   - node scripts/detect-truth-leak.cjs --strict (findings=0 4 lang)

   완료 보고 시 검증 출력 4종 강제:
   1. git diff --stat
   2. Node script 결과 (각 lang file의 emergence_narrative entries count: e-7/d-5/dc-5 각 12 variants 확인)
   3. 검증 명령 결과 (tsc/qa:fast/truth-leak)
   4. ls -la --time-style=full-iso (file 수정 시각 확인)

   commit message: i18n(friend-01): Cycle 9 Line D narrative wrapper 다국어 sync — emergence_narrative 36 entries × 3 lang
   push: git push -u origin codex/friend01-cycle9-narrative-multilang
   ```

## 산출 처리 (메인 세션)

Codex sync 완료 → 메인 세션(ws-friend-01-cycle-9 worktree)에서 8단계 사후 통합:
1. `git fetch origin` + `git log origin/codex/friend01-cycle9-narrative-multilang` 확인
2. 변경 영역 정합 검증 (3 file × 12 신규 variants × 3 entries = 108 외국어 variants)
3. 통합 방식: 단일 thread + 단일 file 영역 (emergence_narrative channel) → **fast-forward merge** 가능
4. 최종 검증 (tsc/qa:fast/truth-leak strict 모두 PASS)
5. 사용자가 main 통합

## 본 cycle의 의의

본 cycle Codex sync 완료 = **friend-01 narrative wrapper 영역 전체 종료** (Cycle 7 Line A+B + Cycle 8b Line C + Cycle 9 Line D 모두 4언어 sync 완료). 이후 friend-01 영역은 진실 단계별 dispute truth advance + verdict 영역만 (별도 game loop). narrative wrapper 영역의 신규 emergence 없음.
