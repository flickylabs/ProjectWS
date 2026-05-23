# Codex Thread — spouse-01 evidence_present Batch 3 재의뢰 12 entries 다국어 sync

작성일: 2026-05-27
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-evidence-batch3-sync ../ws-spouse01-evidence-batch3-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-evidence-batch3-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `evidence_present` channel Batch 3 재의뢰 자연화 polish **12 entries** (commit on main: `69b4f11b`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch는 직전 Codex sync (commit `760f8e6e` = a564ff1d cherry-pick, 83 entries) 직후 잔존 12 entries:
- 영역 A: evidence-specific 동사 (b-e-4/5-mid-stage1-v5/v7) — 4건
- 영역 B: 어색 패턴 강제 제거 (그렇게/그 흐름/느껴집니다/그 판단) — 8건

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file (`spouse-01.json`) — main에 이미 적용 완료 (commit `69b4f11b`)
- 다른 channel — 본 의뢰 외
- 다른 evidence_present entries — 본 의뢰 외

---

## §2. Polish anchor (12 entries)

main commit `69b4f11b`의 git show 결과로 KO diff 확인.

### 2.1. 영역 A. evidence-specific 동사 (4건)

| ID | KO (변경 후) |
|----|--------------|
| b-e-4-mid-stage1-v5 | 제가 한 일은 맞습니다. 사정이 있어서 제가 그 문자에 답했습니다. 그래서 설명이 늦었습니다. |
| b-e-4-mid-stage1-v7 | 제 쪽 기록이라는 건 인정합니다. 그때는 제가 그 문자에 답해야 한다고 봤습니다. |
| b-e-5-mid-stage1-v5 | 제가 한 일은 맞습니다. 사정이 있어서 제가 돈을 출금했습니다. 그래서 설명이 늦었습니다. |
| b-e-5-mid-stage1-v7 | 제 쪽 기록이라는 건 인정합니다. 그때는 제가 출금해야 한다고 봤습니다. |

### 2.2. 영역 B. 어색 패턴 강제 제거 (8건)

| ID | KO (변경 후) |
|----|--------------|
| a-e-4-mid-stage2-v8 | 문자가 오간 내용이 숨긴 사정을 보여 줍니다. 저는 그 내용을 외도 정황으로 읽었고, 그 부분이 제일 걸립니다. |
| a-e-5-mid-both-v2 | 주소, 새벽 통화, 거기에 목돈까지. 저는 이 일들이 서로 이어진다고 봤습니다. |
| a-e-5-mid-both-v4 | 그때 저는 남편 말을 완전히 믿지 못하게 됐습니다. 기록의 숫자가 남편 말과 맞지 않았습니다. |
| b-e-6-mid-check_metadata-v5 | 저는 아내가 그런 곳까지 믿을 만큼 의지할 데가 없었다는 점을 무겁게 받아들이고 있습니다. |
| a-e-7-early-check_metadata-v9 | 그 서류는 제가 숨기려고 꾸민 물건이 아닙니다. 숨기려 만든 것처럼 비치는 게 두렵습니다. |
| a-e-7-early-restore_context-v7 | 위임장 문제를 그런 식으로 단정하면, 제 입장에서는 모든 게 끝나는 것 같습니다. |
| a-e-6-mid-self-v4 | 저는 벌려고 들어간 게 아니라 빼앗기기 싫어서 들어갔습니다. 하지만 제 선택이 빗나갔습니다. |
| a-e-6-mid-request_original-v7 | 송금한 건 제가 맞습니다. 제 선택이 잘못됐다는 점도 이제는 압니다. |

---

## §3. 다국어 번역 원칙

### 3.1. NPC 자기 발화 영역

`evidence_present` channel은 NPC 자기 진술. 재판관 청유 어미 X.

- **A (박지연, claimant)**: 자기 의심·자기 후회·자기 결론
- **B (이준호, defendant)**: 자기 사정 회피·부분 인정

### 3.2. evidence-specific 동사 (영역 A)

| evidence | KO 동사 | 권장 EN | 권장 JA | 권장 ZH-CN |
|----------|---------|---------|---------|------------|
| e-4 (문자) | "그 문자에 답했습니다 / 답해야" | "responded to the text / had to respond" | "そのメッセージに返した / 返さなければ" | "回复了那条短信 / 必须回复" |
| e-5 (현금 출금) | "돈을 출금했습니다 / 출금해야" | "withdrew the cash / had to withdraw" | "現金を引き出した / 引き出さなければ" | "取了那笔现金 / 必须取出" |

기존 EN/JA/ZH-CN 번역의 동사 형식을 우선 확인하고 (b-e-1/2/3-mid-stage1-v5/v7 동형 archetype의 기존 다국어 처리) 일관성 유지.

### 3.3. 어색 패턴 자연화 영역 (영역 B)

KO polish의 의도를 다국어에 보존:

| KO 패턴 | KO 자연화 | 권장 EN/JA/ZH-CN 톤 |
|---------|-----------|----------------------|
| "그 흐름" → "문자가 오간 내용" | 명확 발화 | EN "what the texts conveyed" / JA "やり取りされた内容" / ZH-CN "短信往来的内容" |
| "느껴집니다" (피동) → "받아들이고 있습니다" (능동) | NPC 능동 발화 | EN "I'm taking it heavily" 능동 / JA "重く受け止めています" / ZH-CN "我沉重地接受了这一点" |
| "그 판단" → "제 선택" | 자기 선택 발화 | EN "my choice" / JA "私の判断/選択" / ZH-CN "我的选择" |
| "그렇게 보이는" → "숨기려 만든 것처럼 비치는" | 명확 비유 | EN "looking like I made it to hide" / JA "隠そうとして作ったかのように見える" / ZH-CN "看起来像我刻意制造来隐瞒" |
| "그렇게 부르면" → "그런 식으로 단정하면" | 명확 단정 표현 | EN "if you label it that way" / JA "そんな風に決めつけると" / ZH-CN "如果那样断定" |

### 3.4. 진실 누설 정책 (절대 준수)

본 batch entries는 모두 **early/mid stage** = 진실 노출 전 영역.
- hidden 키워드 (가족/집안/시댁/형/회생/형사/사기/횡령/범죄/위조/위법) **신규 도입 X**
- KO 원본에 등장하는 hidden keyword 없음 — 다국어에도 도입 금지

### 3.5. lieBand 톤 보존

- **early** (a-e-7 영역): 회피·부정·방어 ("아닙니다 / 끝나는 것 같습니다")
- **mid** (대부분 entries): 부분 인정·자기 반성 ("맞습니다 / 인정합니다 / 압니다")

### 3.6. 호명

- "남편" (A 발화 → 이준호): EN "my husband" / JA "夫" / ZH-CN "我丈夫"
- "아내" (B 발화 → 박지연): EN "my wife" / JA "妻" / ZH-CN "我妻子"

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~59,258 — 회귀 X 확인)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/spouse01-evidence-batch3-sync` push
- main session에서 cherry-pick 후 cleanup
