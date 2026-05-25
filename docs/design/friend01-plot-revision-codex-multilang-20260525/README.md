# Codex Thread — friend-01 e-5 reframe plot revision 다국어 sync

## 배경

본 의뢰서는 [친구-01 e-5 reframe plot revision CT 영역](../friend01-plot-revision-e5-reframe-20260524/)의 KO baseline 변경을 EN/JA/ZH-CN 4언어 sync 작업.

- **KO baseline commit**: `b77a27c5` (main HEAD)
- **CT 영역 commit 범위**: `9572f4bb..b77a27c5` (3 commits — brief / Authority / ScriptedText reword)
- **다음 cycle**: Cycle 8b narrative wrapper의 다국어 sync는 별도 의뢰서 ([core-narrative-cycle8b-friend01-lineC-codex-multilang-20260525/](../core-narrative-cycle8b-friend01-lineC-codex-multilang-20260525/))

## 본 의뢰서 영역 (KO → 외국어 sync)

### Authority 변경 (7 영역, derive layer 4개 자동 sync 영역 포함)

| 영역 | KO 변경 본질 |
|---|---|
| `e-5` | 자료 자체 교체 — 예비신랑 회사 단톡 떠벌림 + 최수민의 9일간 차단 메시지. subjectParty 'b'. `sensitiveSealTargets` 신규 |
| `d-3` | truthDescription / verdictOptions / truthStages.b S2·S3·S5 / S5.a / progressionStages.S2 surfaceClaim — "경고/확인" → "직접 막아보려/차단" 정합 |
| `w-2` | testimony.byDispute['d-3'] 신규 + unlockedByDossier ['dc-2','dc-3'] + relatedDisputes ['d-2','d-3'] |
| `dc-3` | description / noteText / successEffects[0] / challenges.b.q1 lockedHint — "현재 문자" → "떠벌림 흔적" + "시도" 정합 |
| `combine-3` | discoveryText / surfaceFallback 자료 표현 정합 |
| `combine-5` (Line D 영역) | "경고였다" → "결혼 위기 차단" 정합 |
| `meta.anchorTruth` | "경고하려던" → "결혼 위기를 막으려" 정합 |

### ScriptedText 변경 (~155 KO entries reword)

| Channel | Entries (KO) | 변경 본질 |
|---|---|---|
| `evidence_present` (e-5 영역) | 105 | "아버지가 돈 얘기를 꺼냈" → "결혼 자금을 시도했" + 자료 인용 / "연락" → "직접 연락해 막으려" |
| `judge_evidence_combo` (combine-3 영역) | 30 | behaviorHint 통일 ("현재 문자와 과거 송금" → "예비신랑이 떠벌린 흔적과 과거 송금") + text 다양 변형 |
| `evidence_present` stageQuestion | 6 | "송다은 아버지가 먼저 돈 얘기를 꺼냈습니까?" → "결혼 자금을 시도했습니까?" |
| `interrogation` (d-3 b/a 영역) | 14 | "경고하려" → "직접 막아보려" + 자료 인용 정합 |
| `aftermath` / `contradiction_pursuit` / `interjection` / `trust_action` / `judge_question` / `evidence_discovery` | ~10 | 단어 정합 ("경고하려" → "직접 막아보려" 등) |

## 다국어 sync 대상 file

```
src/data/cases/generated/friend-01.{en,ja,zh-CN}.json        — Authority derive 결과 다국어 영역
src/data/scriptedText/friend-01.{en,ja,zh-CN}.json           — 155 KO entry × 3 lang = ~465 외국어 entries
```

⚠ KO 영역은 main에 이미 commit (`b77a27c5`) — 외국어만 sync.

## 신규 단어 다국어 baseline 제안

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 떠벌림 / 떠벌리다 | blurted out / boast openly | 口走った / べらべら話した | 脱口而出 / 张扬地说出 |
| 차단 메시지 / 차단 연락 | intervention messages / blocking outreach | 止めようとした連絡 / 阻止のメッセージ | 试图阻止的消息 / 拦截的联络 |
| 결혼 위기 / 결혼 위기 차단 | wedding jeopardy / blocking the wedding crisis | 結婚の危機 / 結婚の危機を止める | 婚姻危机 / 阻止婚姻危机 |
| 직접 막아보려 (했다) | tried to step in directly | 直接止めようとした | 直接出面阻止 |
| (시도/꺼냄 → ) 시도 | attempt / try | 試み / 試みた | 尝试 / 试图 |

(본 baseline은 권장 — Codex 작업 시 ScriptedText 기존 영역과 일관성 검토 + 4 lang 모두 일괄 적용)

## 업로드 파일 (총 7개 + 의뢰서)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — Authority + ScriptedText 영역 다국어 sync 명세 |
| 2 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline anchor 정책 |
| 3 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 후 Codex sync 필수 정책 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | git safe.directory 필수 |
| 5 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | "단서" 명칭 (evidence vs clue 경계) |
| 6 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | PowerShell 인코딩 (Write tool 권장) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 (KO 영역 권위 — 다국어도 동일 frame 유지) |
| 8 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | 진실 노출 정책 — 외국어 번역 시 surface 단어 경계 |

## Codex 진입 절차 (사용자 영역)

1. 새 worktree 생성:
   ```powershell
   git worktree add -b codex/friend01-plot-revision-multilang ../ws-friend01-plot-revision-multilang main
   git -C ../ws-friend01-plot-revision-multilang config --add safe.directory $((Get-Item ../ws-friend01-plot-revision-multilang).FullName)
   ```

2. 본 폴더 통째 Codex Project File로 업로드 (또는 prompt 첨부)

3. Codex prompt (한 줄):
   ```
   첨부한 codex-multilang-sync.md 의뢰서대로 friend-01 e-5 reframe plot revision의 KO baseline (commit b77a27c5)을 EN/JA/ZH-CN 4언어 sync 작업.
   영역: src/data/cases/generated/friend-01.{en,ja,zh-CN}.json + src/data/scriptedText/friend-01.{en,ja,zh-CN}.json
   권위: feedback_baseline_anchor_scripted_text / feedback_dossier_card_renamed_to_clue / feedback_judge_dispassionate_action_focused / design_friend01_truth_disclosure_policy (모두 정독 필수)
   신규 단어 baseline은 본 README의 다국어 baseline 제안 참조 + 기존 ScriptedText와 일관성 검토 후 4 lang 일괄 적용.
   완료 후 commit + push: codex/friend01-plot-revision-multilang branch.
   ```

4. Codex 완료 후 메인 Claude 세션(ws-friend-01-cycle worktree)에 commit hash + branch 알림 → Claude가 8단계 사후 통합 (fast-forward 또는 union script).

## 폴더 정책

self-contained — 외부 참조 X.
