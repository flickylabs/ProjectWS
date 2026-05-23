# Codex Thread — spouse-01 judge_evidence_combo 17 entries 다국어 sync

작성일: 2026-05-23 (게임 내 2026-05-27 cycle)
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- [design_self_reference_bonin_consistency](../../../memory/design_self_reference_bonin_consistency.md)
- [feedback_self_reference_speaker_context](../../../memory/feedback_self_reference_speaker_context.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-judge-combo-sync ../ws-spouse01-judge-combo-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-judge-combo-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `judge_evidence_combo` channel **17 unique entries polish** (commit on main: `99d2fdc1`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- **judge_evidence_combo** — 재판관이 evidence 조합 (2개 이상)을 NPC에 제시하면서 추궁
- **17 unique entries** (동형 X) — 1:1 ID 매핑
- dispute combo: dc-1 (외도 의심), dc-2 (자금/통화), dc-3 (출금), dc-4 (투자방), dc-5 (다중)
- 재판관 청유 어미 톤 (soft / mid / hard)
- ★ **e-7 surfaceName 정책 변경 반영** — surfaceName = lockedName 통일 ("공동 적금 해지 서류"). 이전 잠정 처리 ("공동 적금 처리 서류") 폐기. main commit `1b9481eb` 참조.

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `99d2fdc1`)
- evidence_present Batch 5 150 entries / interjection 35 entries — 별도 의뢰서

---

## §2. Polish anchor (17 entries)

main commit `99d2fdc1`의 git show 결과로 KO diff 확인.

### 2.1. dc-1 (오피스텔 + 발신자 미상 문자) 2 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| judgecombo-dc-1-b-q1-soft-v4 | soft | 이준호 씨, 좌표만 보면 외도 의심으로 보일 수 있지만, 문자 내용까지 함께 보면 다른 사람이 있었다는 점도 확인됩니다. 그 사람이 누구였는지 설명해 주시겠습니까. |
| judgecombo-dc-1-b-q1-mid-v3 | mid | 이준호 씨, 오피스텔 기록만 보면 외도 의심이 생기지만, 발신자 미상 문자까지 함께 보면 누군가를 돌본 흔적도 보입니다. 두 내용을 어떻게 연결해야 하는지 설명해 주십시오. |

### 2.2. dc-2 (새벽 통화 + 발신자 미상 문자) 3 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| judgecombo-dc-2-b-q1-mid-v1 | mid | 이준호 씨, 새벽 통화와 발신자 미상 문자는 같은 사정과 맞물려 있습니다. 갈등이 두려워 계속 숨겨 오신 사항을 이제 밝혀 주십시오. |
| judgecombo-dc-2-b-q1-mid-v4 | mid | 이준호 씨, 발신자 미상 문자와 통화기록을 보면 외도는 아니었다는 말만으로는 설명이 부족합니다. 그 너머의 사정을 왜 끝까지 숨기셨습니까. |
| judgecombo-dc-2-b-q1-hard-v3 | hard | 이준호 씨, 통화기록과 발신자 미상 문자가 있는 상황에서, 그곳에 가신 사실을 왜 끝까지 숨기셨는지도 밝히셔야 합니다. 바로 답하십시오. |

### 2.3. dc-3 (출금 + 발신자 미상 문자) 4 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| judgecombo-dc-3-b-q1-soft-v1 | soft | 이준호 씨, 발신자 미상 문자와 개인 계좌 출금 내역을 함께 보겠습니다. 별도 사용처로 큰돈을 옮기신 사실을 박지연 씨에게 왜 끝까지 알리지 못하셨는지 설명해 주시겠습니까. |
| judgecombo-dc-3-b-q1-soft-v5 | soft | 이준호 씨, 발신자 미상 문자와 출금 내역을 보면 따로 급한 사정이 있으셨다 해도 큰돈을 따로 움직이신 것은 설명이 필요합니다. 그 사정과 실제 돈의 이동을 구분해서 말씀해 주십시오. |
| judgecombo-dc-3-b-q1-hard-v1 | hard | 이준호 씨, 발신자 미상 문자와 출금 내역은 같은 돈의 흐름으로 이어져 있습니다. 그 돈이 누구에게 왜 갔는지 지금 답하십시오. |
| judgecombo-dc-3-b-q2-soft-v1 | soft | 이준호 씨, 발신자 미상 문자와 출금 내역을 함께 보면 숨긴 자금 흐름이 확인됩니다. 박지연 씨를 배제한 책임을 어떻게 받아들이시는지 말씀해 주시겠습니까. |

### 2.4. dc-4 (투자방 텔레그램 + 송금) 4 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| judgecombo-dc-4-a-q1-soft-v1 | soft | 박지연 씨, 투자방 텔레그램과 송금 기록을 함께 보겠습니다. 이준호 씨의 해명을 듣기도 전에 본인 돈을 먼저 움직인 이유를 들려주시겠습니까. |
| judgecombo-dc-4-a-q1-soft-v3 | soft | 박지연 씨, 투자방 텔레그램의 권유와 송금 기록은 같은 날 내리신 판단과 맞물려 있습니다. 그때 어떤 계산을 하셨는지 말씀해 주십시오. |
| judgecombo-dc-4-a-q1-mid-v3 | mid | 박지연 씨, 투자방 텔레그램과 송금 기록을 보면 본인이 먼저 돈을 움직인 흐름이 확인됩니다. 왜 그 사실을 뒤늦게 밝히셨습니까. |
| judgecombo-dc-4-a-q2-hard-v1 | hard | 박지연 씨, 투자방 텔레그램과 송금 기록을 보면 손실로 이어진 본인 행동이 확인됩니다. 왜 숨기셨는지 답하십시오. |

### 2.5. dc-5 (다중 조합: 출금 + 송금 + 공동 적금 해지) 4 entries

| ID | 톤 | KO (변경 후) |
|----|----|--------------|
| judgecombo-dc-5-b-q1-soft-v2 | soft | 이준호 씨, 현금 출금과 박지연 씨의 투자방 송금, 공동 적금 해지는 각각 다른 흐름으로 보입니다. 어떤 순서였는지 하나씩 짚어 주시겠습니까. |
| judgecombo-dc-5-b-q1-soft-v4 | soft | 이준호 씨, 현금 출금은 이준호 씨 쪽 자료에서, 공동 적금 해지 서류는 박지연 씨 쪽 자료에서 확인됩니다. 두 내용을 구분해서 설명해 주십시오. |
| judgecombo-dc-5-a-q1-soft-v2 | soft | 박지연 씨, 출금 내역과 송금 기록, 공동 적금 해지 서류를 함께 보면 누가 먼저 숨겼는지, 누가 먼저 돈을 움직였는지가 각각 확인됩니다. 본인의 행동을 그 순서에 맞춰 말씀해 주십시오. |
| judgecombo-dc-5-a-q1-soft-v5 | soft | 박지연 씨, 두 큰돈의 순서를 보려면 본인 송금과 공동 적금 해지 서류를 따로 보아야 합니다. 두 자료가 어떤 순서로 이어졌는지 설명해 주십시오. |

---

## §3. 다국어 번역 원칙

### 3.1. judge_evidence_combo 채널 특이성

재판관이 NPC에 evidence 조합(2개 이상)을 제시하며 추궁. 청유 어미 톤 3단계:
- **soft**: "...설명해 주시겠습니까 / ...들려주시겠습니까 / ...말씀해 주시겠습니까"
- **mid**: "...밝히셔야 합니다 / ...설명해 주십시오"
- **hard**: "...답하십시오 / ...바로 답하십시오"

### 3.2. NPC 호명 보존

| KO 호명 | EN | JA | ZH-CN |
|---------|----|----|-------|
| "이준호 씨" | "Mr. Lee" | "イ・ジュノさん" | "李俊浩先生" |
| "박지연 씨" | "Ms. Park" | "パク・チヨンさん" | "朴智妍女士" |

### 3.3. 자기지시 "본인" 보존 (★ 본 batch 핵심)

재판관 발화에서 NPC를 가리키는 "본인"은 **정책 부합** ([[design_self_reference_bonin_consistency]]).

| KO | EN | JA | ZH-CN |
|----|-----|----|-------|
| "본인 돈" | "your own money" | "ご自身のお金" | "您自己的钱" |
| "본인이 먼저" | "you yourself first" | "ご自身がまず" | "您自己先" |
| "본인 행동" | "your own conduct" | "ご自身の行動" | "您自己的行为" |
| "본인의 행동" | "your own conduct" / "your actions" | "ご自身の行動" | "您自己的行为" |

★ NPC 자기 발화 (1인칭)에서는 "본인" 사용 X — 단, 본 batch는 재판관 → NPC 발화이므로 "본인" 유지.

### 3.4. 직역 어미 자연화

| KO 직역 | KO 자연화 | EN | JA | ZH-CN |
|---------|-----------|----|----|-------|
| "가리킵니다" | "맞물려 있습니다 / 이어져 있습니다" | "is bound up with / leads to / is connected to" | "結びついています / つながっています" | "彼此关联 / 相互交织" |
| "드러납니다" | "확인됩니다 / 보입니다" | "is evident / is confirmed / can be seen" | "確認できます / 見えます" | "可以确认 / 显现" |

### 3.5. 추궁 강도 보존

| KO 강조 | 톤 | EN | JA | ZH-CN |
|---------|-----|----|----|-------|
| "끝까지 숨기셨는지" | 추궁 (mid/hard) | "concealed all this time / kept hidden to the end" | "最後まで隠してこられたのか" | "一直隐瞒到最后" |
| "바로 답하십시오" | hard | "Answer at once." | "直ちにお答えください。" | "请立即回答。" |
| "지금 답하십시오" | hard | "Answer now." | "今、お答えください。" | "现在请回答。" |

### 3.6. evidence 명칭 보존

| KO | EN | JA | ZH-CN |
|----|-----|----|-------|
| "발신자 미상 문자" | "messages from an unknown sender" | "発信者不明のメッセージ" | "未知发件人短信" |
| "출금 내역" / "현금 출금" | "withdrawal records" / "cash withdrawals" | "出金履歴" / "現金出金" | "提款记录" / "现金提款" |
| "통화기록" | "call records" | "通話記録" | "通话记录" |
| "투자방 텔레그램" | "the investment-chat Telegram" | "投資チャットのテレグラム" | "投资群组的 Telegram" |
| "송금 기록" | "transfer records" | "送金記録" | "转账记录" |
| **"공동 적금 해지 서류"** (★ surfaceName = lockedName 통일, main commit `1b9481eb`) | "joint-savings cancellation documents" | "共同積立解約書類" | "共同储蓄解约文件" |
| **"공동 적금 해지"** (dispute name, dc-5-b-q1-soft-v2 한정) | "the joint-savings termination" | "共同積立の解約" | "共同储蓄解约" |

### 3.7. 진실 누설 회피 (★ 본 batch 핵심)

본 batch는 **e-7 surfaceName 정책 변경** (main commit `1b9481eb`) 반영. surfaceName = lockedName = "공동 적금 해지 서류" 통일. dc-5 entries 4건 모두 "공동 적금 해지 서류" 자연 표현 사용. qa-runtime-gate locked evidence name leak 검출은 `ev.name === ev.surfaceName` 조건으로 자동 skip.

| 위치 | 사용 표현 |
|------|-----------|
| dc-5-b-q1-soft-v2 | "공동 적금 해지" (행위 명사) |
| dc-5-b-q1-soft-v4 | "공동 적금 해지 서류" |
| dc-5-a-q1-soft-v2 | "공동 적금 해지 서류" |
| dc-5-a-q1-soft-v5 | "공동 적금 해지 서류" |

hidden keyword (가족/형/회생/사기/조작/위법 등) 신규 도입 X.

dispute label 인용 영역 (외도 의심, 외도, 갈등이 두려워, 손실, 숨긴 자금 흐름 등)은 원본 KO에 등장하던 표현으로 자백 frame 부합 — 보존.

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~58,936 — 회귀 X 확인)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/spouse01-judge-combo-sync` push
- main session에서 cherry-pick 후 cleanup
