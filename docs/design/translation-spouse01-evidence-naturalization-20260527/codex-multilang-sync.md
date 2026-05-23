# Codex Thread — spouse-01 evidence_present 자연화 83 entries 다국어 sync

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
| **worktree spawn** | `git worktree add -b codex/spouse01-evidence-naturalization-sync ../ws-spouse01-evidence-naturalization-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-evidence-naturalization-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `evidence_present` channel NPC 자연화 polish **83 entries** (2 commits on main: `e7c1fad0` + `d5294624`). EN/JA/ZH-CN 동일 anchor 동기.

2 batch:
- Batch 1: e-1 (학원생 참고서) + e-2 (GPS 차량 좌표) + e-3 (통화기록) — 50 entries (commit `e7c1fad0`)
- Batch 2: e-4 (발신자 미상 문자) + e-5 (개인 계좌 현금 출금) + e-6 (투자방 텔레그램) + e-7 (송금 기록) — 33 entries (commit `d5294624`)

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file (`spouse-01.json`) — main에 이미 적용 완료 (commit `e7c1fad0` + `d5294624`)
- 다른 channel (`judge_question` / `judge_contradiction` / `interrogation` 등) — 본 의뢰 외
- 다른 case (family-01, friend-01) — 본 의뢰 외
- 다른 evidence_present entries (재의뢰 12개 미적용 영역) — 본 의뢰 외

---

## §2. Polish anchor (83 entries — 2 commit git show 참조)

main commit `e7c1fad0` + `d5294624` 의 git show 결과로 KO diff 확인. 각 entry id는 다음 형식:
- `{a|b}-e-{N}-{lieBand}-{stage}-v{idx}` (예: `a-e-1-mid-stage1-v2`)
- A = 박지연 (claimant 진술), B = 이준호 (defendant 진술)

### 2.1. Batch 1 (50 entries — commit `e7c1fad0`)

#### e-1 (학원생 참고서, 18 entries)

| ID | KO (변경 후) |
|----|--------------|
| a-e-1-mid-other-v5 | 품목이 생활용품에 이어 책까지 나옵니다. 한 번으로 끝난 구매는 아니라는 뜻 아닙니까. |
| a-e-1-early-stage2-v10 | 이건 한 장면이 아니라 흐름이었습니다. 정황이 계속 쌓이면서 저를 몰았습니다. |
| a-e-1-early-stage3-v8 | 이 단서가 있어도 남편 입으로 듣기 전엔 믿기 어려웠습니다. 저는 한동안 그 의심에서 벗어나지 못했습니다. |
| a-e-1-early-stage3-v10 | 자료가 다른 뜻을 보여도, 그때 저는 제대로 판단하기 어려웠습니다. |
| a-e-1-mid-stage1-v2 | 자료를 본 제 행동도 숨기진 않겠습니다. 그래도 그때는 달리 받아들이기 어려웠습니다. |
| a-e-1-mid-stage1-v8 | 남편이 말하지 않으니 저는 자료가 보여 주는 쪽을 믿었습니다. 그 생각을 한동안 굳히고 있었습니다. |
| a-e-1-late-stage1-v4 | 자료 자체보다 제가 붙인 의미가 컸다는 건 이제 압니다. 저는 한동안 그 생각을 놓지 못했습니다. |
| a-e-1-late-stage1-v5 | 그 자료를 본 순간 저는 제대로 판단하기 어려웠습니다. 그래서 다른 가능성을 늦게 봤습니다. |
| a-e-1-late-stage2-v2 | 연락 시간대와 문구가 생각보다 급박하게 맞물려 있습니다. 자료를 보면 제가 내렸던 결론이 흔들립니다. |
| a-e-1-late-stage2-v4 | 다른 가능성을 묻기보다 남편을 몰아붙인 부분은 있습니다. 저는 한동안 제 결론을 붙들고 있었습니다. |
| a-e-1-late-stage2-v6 | 제가 그 맥락을 외도 쪽으로 굳힌 건 맞습니다. 하지만 남편이 왜 샀는지 제때 말하지 않은 책임도 남습니다. |
| a-e-1-late-stage3-v5 | 제가 너무 빨리 결론을 냈습니다. 다만 남편이 왜 샀는지 제때 말하지 않은 책임도 남습니다. |
| b-e-1-early-stage2-v3 | 일이 이렇게 된 데에는 사정이 있습니다. 지금은 자세히 말하기 어렵습니다. |
| b-e-1-early-stage3-v4 | 제가 그런 행동을 한 데에는 복잡한 사정이 있습니다. 지금은 단정만 거둬 주셨으면 합니다. |
| b-e-1-mid-stage1-v5 | 제가 한 일은 맞습니다. 사정이 있어서 제가 나섰습니다. 그래서 설명이 늦었습니다. |
| b-e-1-mid-stage1-v7 | 제 쪽 기록이라는 건 인정합니다. 그때는 제가 처리해야 한다고 봤습니다. |
| b-e-1-late-stage1-v5 | 맞습니다. 그 자료에는 제 사정이 담겨 있습니다. 제 아내가 몰랐던 것도 사실입니다. |
| b-e-1-late-stage3-v8 | 그 참고서는 아이에게 사 준 겁니다. 처음부터 사실대로 말했어야 했습니다. |

#### e-2 (GPS 차량 좌표, 17 entries)

| ID | KO (변경 후) |
|----|--------------|
| a-e-2-mid-other-v3 | 주소를 즐겨찾기까지 해뒀더군요. 우연히 스친 곳이면 즐겨찾기에 남기지 않습니다. |
| a-e-2-late-other-v4 | 외도인지 개인적인 일인지 저는 아직 다 알지 못합니다. 하지만 숨긴 건 분명합니다. |
| a-e-2-early-stage2-v10 | 이건 한 장면이 아니라 흐름이었습니다. 정황이 계속 쌓이면서 저를 몰았습니다. |
| a-e-2-early-stage3-v8 | 이 단서가 있어도 남편 입으로 듣기 전엔 믿기 어려웠습니다. 저는 한동안 그 의심에서 벗어나지 못했습니다. |
| a-e-2-early-stage3-v10 | 자료가 다른 뜻을 보여도, 그때 저는 제대로 판단하기 어려웠습니다. |
| a-e-2-mid-stage1-v2 | 자료를 본 제 행동도 숨기진 않겠습니다. 그래도 그때는 달리 받아들이기 어려웠습니다. |
| a-e-2-mid-stage1-v8 | 남편이 말하지 않으니 저는 자료가 보여 주는 쪽을 믿었습니다. 그 생각을 한동안 굳히고 있었습니다. |
| a-e-2-late-stage1-v4 | 자료 자체보다 제가 붙인 의미가 컸다는 건 이제 압니다. 저는 한동안 그 생각을 놓지 못했습니다. |
| a-e-2-late-stage1-v5 | 그 자료를 본 순간 저는 제대로 판단하기 어려웠습니다. 그래서 다른 가능성을 늦게 봤습니다. |
| a-e-2-late-stage2-v4 | 다른 가능성을 묻기보다 남편을 몰아붙인 부분은 있습니다. 저는 한동안 제 결론을 붙들고 있었습니다. |
| b-e-2-early-stage2-v3 | 일이 이렇게 된 데에는 사정이 있습니다. 지금은 자세히 말하기 어렵습니다. |
| b-e-2-early-stage3-v4 | 제가 그런 행동을 한 데에는 복잡한 사정이 있습니다. 지금은 단정만 거둬 주셨으면 합니다. |
| b-e-2-mid-stage1-v5 | 제가 한 일은 맞습니다. 사정이 있어서 제가 움직였습니다. 그래서 설명이 늦었습니다. |
| b-e-2-mid-stage1-v7 | 제 쪽 기록이라는 건 인정합니다. 그때는 제가 움직여야 한다고 봤습니다. |
| b-e-2-late-stage1-v5 | 맞습니다. 그 자료에는 제 사정이 담겨 있습니다. 제 아내가 몰랐던 것도 사실입니다. |
| b-e-2-late-stage2-v8 | 그 자료에는 가족 쪽 사정이 담겨 있습니다. 제 아내에게는 그걸 말하지 못했습니다. |
| b-e-2-late-stage3-v8 | 퇴근 후 형네에 들러 아이 저녁을 챙겼습니다. 처음부터 사실대로 말했어야 했습니다. |

#### e-3 (통화기록, 15 entries)

| ID | KO (변경 후) |
|----|--------------|
| b-e-3-late-self-v5 | 문자 스레드까지 보시면 그 번호가 누구 것인지, 왜 급했는지 드러날 겁니다. |
| a-e-3-early-stage2-v10 | 이건 한 장면이 아니라 흐름이었습니다. 정황이 계속 쌓이면서 저를 몰았습니다. |
| a-e-3-early-stage3-v8 | 이 단서가 있어도 남편 입으로 듣기 전엔 믿기 어려웠습니다. 저는 한동안 그 의심에서 벗어나지 못했습니다. |
| a-e-3-early-stage3-v10 | 자료가 다른 뜻을 보여도, 그때 저는 제대로 판단하기 어려웠습니다. |
| a-e-3-mid-stage1-v2 | 자료를 본 제 행동도 숨기진 않겠습니다. 그래도 그때는 달리 받아들이기 어려웠습니다. |
| a-e-3-mid-stage1-v8 | 남편이 말하지 않으니 저는 자료가 보여 주는 쪽을 믿었습니다. 그 생각을 한동안 굳히고 있었습니다. |
| a-e-3-late-stage1-v4 | 자료 자체보다 제가 붙인 의미가 컸다는 건 이제 압니다. 저는 한동안 그 생각을 놓지 못했습니다. |
| a-e-3-late-stage1-v5 | 그 자료를 본 순간 저는 제대로 판단하기 어려웠습니다. 그래서 다른 가능성을 늦게 봤습니다. |
| b-e-3-early-stage2-v3 | 일이 이렇게 된 데에는 사정이 있습니다. 지금은 자세히 말하기 어렵습니다. |
| b-e-3-early-stage3-v4 | 제가 그런 행동을 한 데에는 복잡한 사정이 있습니다. 지금은 단정만 거둬 주셨으면 합니다. |
| b-e-3-mid-stage1-v5 | 제가 한 일은 맞습니다. 사정이 있어서 제가 연락했습니다. 그래서 설명이 늦었습니다. |
| b-e-3-mid-stage1-v7 | 제 쪽 기록이라는 건 인정합니다. 그때는 제가 연락해야 한다고 봤습니다. |
| b-e-3-late-stage1-v5 | 맞습니다. 그 자료에는 제 사정이 담겨 있습니다. 제 아내가 몰랐던 것도 사실입니다. |
| b-e-3-late-stage2-v8 | 그 자료에는 가족 쪽 사정이 담겨 있습니다. 제 아내에게는 그걸 말하지 못했습니다. |
| b-e-3-late-stage3-v8 | 집안 일 때문에 새벽에도 전화를 받았습니다. 처음부터 사실대로 말했어야 했습니다. |

### 2.2. Batch 2 (33 entries — commit `d5294624`)

#### e-4 (발신자 미상 문자, 13 entries)

| ID | KO (변경 후) |
|----|--------------|
| a-e-4-early-stage2-v10 | 이건 한 장면이 아니라 흐름이었습니다. 정황이 계속 쌓이면서 저를 몰았습니다. |
| a-e-4-early-stage3-v8 | 이 단서가 있어도 남편 입으로 듣기 전엔 믿기 어려웠습니다. 저는 한동안 그 의심에서 벗어나지 못했습니다. |
| a-e-4-early-stage3-v10 | 자료가 다른 뜻을 보여도, 그때 저는 제대로 판단하기 어려웠습니다. |
| a-e-4-mid-stage1-v2 | 자료를 본 제 행동도 숨기진 않겠습니다. 그래도 그때는 달리 받아들이기 어려웠습니다. |
| a-e-4-mid-stage1-v8 | 남편이 말하지 않으니 저는 자료가 보여 주는 쪽을 믿었습니다. 그 생각을 한동안 굳히고 있었습니다. |
| a-e-4-late-stage1-v4 | 자료 자체보다 제가 붙인 의미가 컸다는 건 이제 압니다. 저는 한동안 그 생각을 놓지 못했습니다. |
| a-e-4-late-stage1-v5 | 그 자료를 본 순간 저는 제대로 판단하기 어려웠습니다. 그래서 다른 가능성을 늦게 봤습니다. |
| a-e-4-late-stage2-v4 | 다른 가능성을 묻기보다 남편을 몰아붙인 부분은 있습니다. 저는 한동안 제 결론을 붙들고 있었습니다. |
| b-e-4-early-stage2-v3 | 일이 이렇게 된 데에는 사정이 있습니다. 지금은 자세히 말하기 어렵습니다. |
| b-e-4-early-stage3-v4 | 제가 그런 행동을 한 데에는 복잡한 사정이 있습니다. 지금은 단정만 거둬 주셨으면 합니다. |
| b-e-4-late-stage1-v5 | 맞습니다. 그 자료에는 제 사정이 담겨 있습니다. 제 아내가 몰랐던 것도 사실입니다. |
| b-e-4-late-stage2-v8 | 그 자료에는 가족 쪽 사정이 담겨 있습니다. 제 아내에게는 그걸 말하지 못했습니다. |
| b-e-4-late-stage3-v8 | 형과 조카를 챙기느라 그곳에 다녔습니다. 처음부터 사실대로 말했어야 했습니다. |

#### e-5 (개인 계좌 현금 출금, 13 entries)

| ID | KO (변경 후) |
|----|--------------|
| a-e-5-early-stage2-v10 | 이건 한 장면이 아니라 흐름이었습니다. 정황이 계속 쌓이면서 저를 몰았습니다. |
| a-e-5-early-stage3-v8 | 이 단서가 있어도 남편 입으로 듣기 전엔 믿기 어려웠습니다. 저는 한동안 그 의심에서 벗어나지 못했습니다. |
| a-e-5-early-stage3-v10 | 자료가 다른 뜻을 보여도, 그때 저는 제대로 판단하기 어려웠습니다. |
| a-e-5-mid-stage1-v2 | 자료를 본 제 행동도 숨기진 않겠습니다. 그래도 그때는 달리 받아들이기 어려웠습니다. |
| a-e-5-mid-stage1-v8 | 남편이 말하지 않으니 저는 자료가 보여 주는 쪽을 믿었습니다. 그 생각을 한동안 굳히고 있었습니다. |
| a-e-5-late-stage1-v4 | 자료 자체보다 제가 붙인 의미가 컸다는 건 이제 압니다. 저는 한동안 그 생각을 놓지 못했습니다. |
| a-e-5-late-stage1-v5 | 그 자료를 본 순간 저는 제대로 판단하기 어려웠습니다. 그래서 다른 가능성을 늦게 봤습니다. |
| a-e-5-late-stage2-v4 | 다른 가능성을 묻기보다 남편을 몰아붙인 부분은 있습니다. 저는 한동안 제 결론을 붙들고 있었습니다. |
| b-e-5-early-stage2-v3 | 일이 이렇게 된 데에는 사정이 있습니다. 지금은 자세히 말하기 어렵습니다. |
| b-e-5-early-stage3-v4 | 제가 그런 행동을 한 데에는 복잡한 사정이 있습니다. 지금은 단정만 거둬 주셨으면 합니다. |
| b-e-5-late-stage1-v5 | 맞습니다. 그 자료에는 제 사정이 담겨 있습니다. 제 아내가 몰랐던 것도 사실입니다. |
| b-e-5-late-stage2-v8 | 그 자료에는 가족 쪽 사정이 담겨 있습니다. 제 아내에게는 그걸 말하지 못했습니다. |
| b-e-5-late-stage3-v8 | 3,000만 원을 현금으로 빼서 제3자에게 이동했습니다. 처음부터 사실대로 말했어야 했습니다. |

#### e-6 (투자방 텔레그램, 5 entries)

| ID | KO (변경 후) |
|----|--------------|
| b-e-6-early-check_metadata-v3 | 송금 시점이 가까웠다면, 제가 눈치채지 못한 게 이상할 정도입니다. |
| b-e-6-early-check_metadata-v5 | 제 아내가 누구 말에 큰 결정을 했는지 몰랐습니다. |
| b-e-6-early-restore_context-v3 | 없어진 돈이라면, 그동안 적금이 왜 비었는지도 이제야 이어졌습니다. |
| b-e-6-early-restore_context-v9 | 아내가 몰렸다는 걸 몰랐습니다. 숨긴 손실은 충격입니다. |
| b-e-6-mid-check_metadata-v10 | 이제야 아내가 왜 저를 몰아붙였는지 조금은 보입니다. |

#### e-7 (송금 기록, 2 entries)

| ID | KO (변경 후) |
|----|--------------|
| a-e-7-early-check_metadata-v4 | 대신 적었다는 말은 너무 앞서간 판단입니다. 저는 인정할 수 없습니다. |
| b-e-7-mid-restore_context-v2 | 아내가 몰린 데 제 책임이 있습니다. 하지만 제 이름을 쓰면 안 됐습니다. |

---

## §3. 다국어 번역 원칙

### 3.1. NPC 자기 발화 영역 (★ 본 batch 핵심)

`evidence_present` channel은 NPC가 evidence 제시받고 반응하는 자기 진술. 재판관 청유 어미 X.

- **A (박지연, claimant)**: 자기 의심·자기 후회·자기 결론 보강 발화
- **B (이준호, defendant)**: 자기 사정 회피·부분 인정·진실 인정 발화

### 3.2. 진실 누설 정책 (절대 준수)

| KO 영역 | KO 톤 | 권장 EN/JA/ZH-CN |
|---------|-------|-------------------|
| "제 사정" (B 발화, 막연 회피) | "그 자료에는 제 사정이 담겨 있습니다" | EN "There are my own circumstances behind this record" / JA "その資料には私の事情があります" / ZH-CN "那份资料里有我自己的隐情" |
| "다 알지 못합니다" (A 발화, 추측 회피) | "외도인지 개인적인 일인지 저는 아직 다 알지 못합니다" | EN "I still don't fully know" / JA "まだ全部はわかりません" / ZH-CN "我还不完全清楚" |
| "**가족 쪽 사정**" (B late stage, 진실 인정) | 보존 — late stage는 의도된 진실 노출 단계 | EN "matters concerning my family" / JA "家族側の事情" / ZH-CN "家人那边的隐情" (직역 OK) |
| "**형/형네**" (B late stage) | 보존 — 이준호 형 영역 진실 인정 | EN "my older brother / my brother's place" / JA "兄/兄の家" / ZH-CN "哥哥/哥哥那里" |
| "**집안 일**" (B late stage) | 보존 — 가족 영역 진실 인정 | EN "family matters" / JA "家のこと" / ZH-CN "家里的事" |

### 3.3. 톤 보존 (NPC 적극 발화 5 차원)

- **강력 어휘 완화**: 범죄/사기/횡령 등 직접 단정 X
- **모호 referent → 명확 동사구**: "제 사정이 담겨 있습니다" / "제 도움이 필요했습니다" 형태 보존
- **피동 회피**: NPC 능동 발화 ("저는 ... 했습니다")
- **직역체 → 내면 발화**: "저는 한동안 그 의심에서 벗어나지 못했습니다" / "그 생각을 한동안 굳히고 있었습니다"
- **자연 완충재**: "지금은 자세히 말하기 어렵습니다 / 사정이 있어 / 어쩔 수 없었습니다"

### 3.4. lieBand 톤 보존

| lieBand | 톤 |
|---------|-----|
| early | 회피·부정·방어 ("아닙니다 / 단정 거둬 주십시오") |
| mid | 부분 인정·변명 ("맞습니다, 다만 사정이 있어") |
| late | 진실 인정 (★ hidden 키워드 보존 OK) |

### 3.5. 호명 (NPC 자기 발화 — 호명 거의 없음, but 등장 시)

- "남편" (A 발화 — 박지연 발화 안의 이준호): EN "my husband" / JA "夫" / ZH-CN "我丈夫"
- "아내" (B 발화 — 이준호 발화 안의 박지연): EN "my wife" / JA "妻" / ZH-CN "我妻子"
- "재판관님" (호명 — 본 batch entries 거의 없지만 등장 시): EN "Your Honor" / JA "裁判官" / ZH-CN "审判官"

기존 EN/JA/ZH-CN 번역의 호명 형식을 우선 확인하고 일관성 유지.

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (placeholder leak / mojibake / uniform entries 없을 것)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의 (★ 사고 회피)

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**. PowerShell file 직접 swap 회피.
- 필수 시 `-Encoding UTF8` 명시 + `[System.IO.File]::WriteAllLines + UTF8Encoding(false)`

---

## §6. 산출

- worktree branch `codex/spouse01-evidence-naturalization-sync` push
- main session에서 cherry-pick 후 cleanup
