# Codex Thread — friend-01 Cycle 8b Line C narrative wrapper 다국어 sync

## 배경

본 의뢰서는 [Cycle 8b narrative wrapper](../core-narrative-cycle8b-friend01-lineC-20260525/) 6단계 commit 결과의 EN/JA/ZH-CN 4언어 sync 작업.

- **KO baseline commit**: `6e0acaad` (friend-01-cycle-8b branch HEAD, origin push 완료)
- **본 cycle 6단계 commit 영역**: 7 신규 emergence narrativeTriggers + w-2 확장 + dc-4 label 변경 + 92 KO entries
- **base**: main HEAD `b77a27c5` (CT plot revision 영역 완료 baseline)
- **선행 의뢰서**: [친구-01 e-5 reframe plot revision 다국어 sync](../friend01-plot-revision-codex-multilang-20260525/) (별도 의뢰서 — plot revision 영역의 다국어 sync)

## 본 의뢰서 영역 (KO → 외국어 sync)

### 1. ScriptedText emergence_narrative channel (92 KO entries → 276 외국어 entries)

| 영역 | KO entries | 외국어 sync (× 3 lang) |
|---|---|---|
| `emerge-e-5` (evidenceId: e-5) | 12 | 36 |
| `emerge-dc-3` (dossierCardId: dc-3) | 13 | 39 |
| `emerge-d-3` (disputeId: d-3) | 12 | 36 |
| `emerge-e-6` (evidenceId: e-6) | 12 | 36 |
| `emerge-dc-4` (dossierCardId: dc-4) | 13 | 39 |
| `emerge-d-4` (disputeId: d-4) | 12 | 36 |
| `emerge-w-3` (witnessId: w-3) | 12 | 36 |
| `emerge-w-2` (witnessId: w-2 — dc-3 영역 확장 +6 variants) | 6 | 18 |
| **합계** | **92** | **276** |

⚠ KO 영역은 friend-01-cycle-8b branch에 이미 commit (`6e0acaad`) — 외국어만 sync.

### 2. dc-4 label 다국어 변경 (필수 동반)

dc-4 label "손절의 값" → **"손절의 이유"** (Cycle 8b 영역 변경)

| 영역 | KO (변경 후) | EN baseline 제안 | JA baseline 제안 | ZH-CN baseline 제안 |
|---|---|---|---|---|
| dossier label (단서) | 손절의 이유 | The Reason for the Breakup | 絶交の理由 | 绝交的原因 |

⚠ 기존 다국어 label ("손절의 값" 영역)을 새 label로 일괄 변경. ScriptedText의 dossier channel + cases/generated 영역.

영향 file:
- `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dossierCards 영역 (dc-4 label)
- `src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` dossier channel + emergence_narrative channel (dc-4 reference 부분)

## 다국어 sync 대상 file

```
src/data/scriptedText/friend-01.{en,ja,zh-CN}.json   — emergence_narrative channel 92 entries × 3 lang + dossier channel (dc-4 label)
src/data/cases/generated/friend-01.{en,ja,zh-CN}.json — dossierCards (dc-4 label)
```

## 신규 단어 다국어 baseline 제안

(Cycle 7 baseline 유지 + 본 cycle 신규)

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 같은 부탁 (dc-3 label) | The Same Request | 同じ頼み | 同样的请求 |
| 손절의 이유 (dc-4 label, 변경) | The Reason for the Breakup | 絶交の理由 | 绝交的原因 |
| 아버지의 돈 접근 패턴 (d-3 쟁점명) | The Pattern of Her Father's Money Approach | 父の金銭接近のパターン | 父亲的金钱接近模式 |
| 과거 손절과 아버지의 사기 (d-4 쟁점명) | The Past Breakup and Her Father's Fraud | 過去の絶交と父の詐欺 | 过去的绝交与父亲的诈骗 |
| 떠벌림 흔적과 9일간 메시지 (e-5 surfaceName) | traces of his blurting out and the 9-day messages | 口走った痕跡と9日間のメッセージ | 脱口而出的痕迹与9天的消息 |
| 과거 송금 기록과 문자 (e-6 surfaceName) | Past Transfer Records and Messages | 過去の送金記録とメッセージ | 过去的转账记录与信息 |
| 다 끝난 일을 왜 또 끌고와서 (A 격앙) | Why drag up something that's already over? | もう終わった話をどうしてまた持ち出すの? | 都已经过去的事，为什么又拉出来? |
| 우리 아빠를 사기꾼으로 만들지 마 (A 격앙) | Don't turn my dad into a fraud! | うちのお父さんを詐欺師にしないで! | 不要把我爸说成是骗子! |
| 관련 자료가 있긴 합니다 (B 자제 b-submit) | There is some related material, yes. | 関連の資料があるにはあります | 倒是有一些相关的资料 |

## 업로드 파일 (총 8개 + 의뢰서)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — emergence_narrative channel + dc-4 label 다국어 sync |
| 2 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline anchor 정책 |
| 3 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 후 Codex sync 필수 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | git safe.directory 필수 |
| 5 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | "단서" 명칭 (evidence vs clue 경계) |
| 6 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | PowerShell 인코딩 (Write tool 권장) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 (KO 영역 권위 — 다국어도 동일 frame 유지) |
| 8 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | 진실 노출 정책 — 외국어 번역 시 surface 단어 경계 (그룹 2 사기/투자/미상환 단어 영역) |
| 9 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger spec — priorCard reference 다국어 보존 |

## Codex 진입 절차 (사용자 영역)

1. 새 worktree 생성:
   ```powershell
   git worktree add -b codex/friend01-cycle8b-narrative-multilang ../ws-friend01-cycle8b-narrative-multilang friend-01-cycle-8b
   git -C ../ws-friend01-cycle8b-narrative-multilang config --add safe.directory $((Get-Item ../ws-friend01-cycle8b-narrative-multilang).FullName)
   ```

   ⚠ base branch는 `friend-01-cycle-8b` (Cycle 8b 6단계 commit `6e0acaad` 포함).

2. 본 폴더 통째 Codex Project File로 업로드

3. Codex prompt (한 줄):
   ```
   첨부한 codex-multilang-sync.md 의뢰서대로 friend-01 Cycle 8b Line C narrative wrapper의 KO baseline (commit 6e0acaad)을 EN/JA/ZH-CN 4언어 sync 작업.
   영역: src/data/scriptedText/friend-01.{en,ja,zh-CN}.json emergence_narrative channel (92 entries × 3 lang = 276) + dossier channel dc-4 label / src/data/cases/generated/friend-01.{en,ja,zh-CN}.json dossierCards dc-4 label
   권위: feedback_baseline_anchor_scripted_text / feedback_dossier_card_renamed_to_clue / feedback_judge_dispassionate_action_focused / design_friend01_truth_disclosure_policy / design_narrative_cascade_from_card (모두 정독 필수)
   신규 단어 baseline은 본 README의 다국어 baseline 제안 참조 + 기존 ScriptedText와 일관성 검토 후 4 lang 일괄 적용.
   완료 후 commit + push: codex/friend01-cycle8b-narrative-multilang branch.
   ```

4. Codex 완료 후 메인 Claude 세션에 commit hash + branch 알림 → Claude 8단계 사후 통합.

## 폴더 정책

self-contained — 외부 참조 X.
