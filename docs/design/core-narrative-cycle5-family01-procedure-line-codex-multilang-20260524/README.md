# Codex Thread — family-01 절차/판단 line 다국어 sync (Cycle 5)

## Cycle 5 개요

GPT Pro KO 시안 (Cycle 5 Line A 절차/판단 3 batch) 적용 후, EN/JA/ZH-CN 다국어 sync 작업.

본 cycle은 family-01에 narrative wrapper 첫 적용 cycle. KO baseline은 main HEAD `fcd6465a` 적용 완료.

### 처리 범위

| 영역 | 영향 |
|---|---|
| **신규 channel sync** | `channels.emergence_narrative` 신규 entries 54 variant × 6 emergence group × 3 lang = **162 외국어 variant** |
| **dc-2 라벨 rename 검토** | KO `줄인 유서` → `수정된 유언장`. EN/ZH-CN는 자동 변환 적용됨 (검토 필요), JA cardName 영역 누락 보강 필요 |
| **surface-name gate 외국어 회귀 검출** | KO에서 발견된 e-3 lockedName 노출 패턴이 외국어에도 있는지 일괄 grep + fix |

### 처리 emergence 6개 (Line A 절차/판단)

| # | 영역 | id | 자연 명칭 | KO trigger × variants |
|---|---|---|---|---|
| 1 | 단서 | `dc-1` | 말년의 종이 | 4 trigger × 12 variants |
| 2 | 증인 | `w-1` | 최복순 | 3 trigger × 7 variants |
| 3 | 쟁점 | `d-2` | 공증 절차의 개입 | 4 trigger × 10 variants |
| 4 | 증거 | `e-3` | 전 요양보호사 음성증언 | 4 trigger × 9 variants |
| 5 | 단서 | `dc-2` | **수정된 유언장** (라벨 변경) | 4 trigger × 9 variants |
| 6 | 증인 | `w-2` | 김영수 | 3 trigger × 7 variants |
| **합계** | | | | **22 trigger × 54 variants** |

### 단일 batch 처리 (3 GPT batch → 1 Codex batch)

GPT Pro 단계에서는 3 batch 분할로 thread 부담 분산. Codex 단계에서는 entry id 영역 모두 같은 channel(`emergence_narrative`) + 같은 file이라 **단일 thread 처리 권장**. branch 1개로 통합.

## 신규 정책 (Cycle 5 도입, 본 sync에 적용)

### 1. '단서' 명칭 (player-visible text)

`feedback_dossier_card_renamed_to_clue.md` 권위. player-visible text에서 'dossier card / 사건 카드' → '단서' (clue) 표현 통일.

- KO: 단서
- EN: clue
- JA: 手がかり
- ZH-CN: 线索

⚠ **evidence(증거)와 layer 구분 유지 필수**: evidence = 자료 (e-1~e-N), 단서 = 자료 묶어 만든 추론 (dc-1~dc-N). 두 layer 경계 흐리는 표현 회피.

### 2. 재판관 어법 — 사실/행위 중심

`feedback_judge_dispassionate_action_focused.md` (Cycle 7 신규, 본 cycle 적용). 재판관 발화에 감정·가치 어휘 회피, 사실/행위/선후관계 중심.

### 3. `cascade_from_card` trigger의 priorCard scope 확장

본 cycle Batch 3 (dc-2)에서 처음으로 `priorCard:d-2` (dispute → dossier cascade) 사용. schema/runtime 모두 지원 확인됨 (`requirePriorCardFired: string` — dossier/evidence/dispute/witness ID 모두 호환).

## Codex 사용 절차

1. worktree spawn (`git worktree add -b codex/family01-cycle5-multilang ../ws-family01-cycle5-multilang main`)
2. `safe.directory` 추가: `git config --global --add safe.directory <worktree path>`
3. 본 폴더 파일 worktree에 복사 (또는 참조)
4. `codex-multilang-sync.md` §3~6 절차대로 진행
5. branch push 후 메인 Claude 세션에 보고

## 메인 session 후속 (Codex push 도착 시)

1. `git fetch origin`
2. `git log origin/codex/family01-cycle5-multilang` 확인
3. fast-forward merge 또는 cherry-pick
4. tsc + build + qa:fast PASS 검증
5. Cycle 5 완료 보고 + Cycle 6 (family-01 Line B 20년 돈) 안내

## 폴더 파일

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 162 외국어 variant + dc-2 label rename 검토 + surface-name gate 검출 |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | **Cycle 5 신규** — 단서 명칭 변경 + evidence layer 구분 |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | **Cycle 7 신규** — 재판관 어법 사실/행위 중심 |
| 8 | [design_family01_truth_disclosure_policy.md](design_family01_truth_disclosure_policy.md) | family-01 진실 노출 정책 (Line A 영역 그룹 1~5 surface 금지) |
| 9 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger 정책 (다국어 priorCard reference 보존) |

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
