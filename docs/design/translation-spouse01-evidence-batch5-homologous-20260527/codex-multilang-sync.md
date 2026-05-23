# Codex Thread — spouse-01 evidence_present Batch 5 동형 archetype 150 entries 다국어 sync

작성일: 2026-05-23 (게임 내 2026-05-27 cycle)
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)
- [feedback_naturalization_substance_not_variant_count](../../../memory/feedback_naturalization_substance_not_variant_count.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-evidence-batch5-sync ../ws-spouse01-evidence-batch5-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-evidence-batch5-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `evidence_present` channel **B5 동형 archetype polish 150 entries** (commit on main: `4644413c`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- **동형 archetype 그룹** = 동일 KO 텍스트가 e-1/e-2/e-3/e-4/e-5 5개 evidence에 동시 등장
- 30 unique archetypes × 5 evidence = 150 entries
- **박지연(A) claimant 자기 진술 archetype** (evidence 비 의존)
- ★ B4가 early/mid stage1 영역이었다면, **B5는 mid-stage2/3 + late stage 영역** (자기 반성·후회·인정 톤)

→ 다국어 처리도 같은 텍스트 1 polish → 5 evidence 동시 적용 가능 (효율 5x).

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `4644413c`)
- interjection 35 entries / judge_evidence_combo 17 entries — 각각 별도 의뢰서

---

## §2. Polish anchor (30 archetypes / 150 entries)

main commit `4644413c`의 git show 결과로 KO diff 확인.
**각 archetype은 e-1/e-2/e-3/e-4/e-5에 동일 텍스트 적용됨**.

### 2.1. mid / stage 2 (3 archetypes / 15 entries)

| Archetype | KO (변경 후) | 적용 IDs (5 evidence × 1 archetype) |
|-----------|--------------|-------------------------------------|
| a-eN-mid-stage2-v6 | 남편이 설명해 줬다면 제 판단도 달라졌을 겁니다. 그런데 그때는 자료들끼리 맞춰 보는 수밖에 없었습니다. | a-e-{1,2,3,4,5}-mid-stage2-v6 |
| a-eN-mid-stage2-v9 | 그 자료가 누구를 말하는 건지, 저는 이미 마음속으로 답을 정해 두었습니다. | a-e-{1,2,3,4,5}-mid-stage2-v9 |
| a-eN-mid-stage2-v10 | 맥락을 볼수록 남편이 누군가를 숨기고 있다고 생각했습니다. 남편이 설명하지 않으니 그 생각이 더 굳어졌습니다. | a-e-{1,2,3,4,5}-mid-stage2-v10 |

### 2.2. mid / stage 3 (9 archetypes / 45 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-mid-stage3-v2 | 실제 목적이 다를 수 있다는 걸 봤는데도, 저는 한동안 받아들이지 못했습니다. | a-e-{1,2,3,4,5}-mid-stage3-v2 |
| a-eN-mid-stage3-v3 | 이 단서를 보고 제 해석이 흔들렸습니다. 그렇다고 남편이 숨긴 것까지 넘어갈 수는 없습니다. | a-e-{1,2,3,4,5}-mid-stage3-v3 |
| a-eN-mid-stage3-v4 | 제가 먼저 안 좋은 쪽으로 결론을 낸 건 맞습니다. 그래도 아무 이유 없이 그런 건 아니었습니다. | a-e-{1,2,3,4,5}-mid-stage3-v4 |
| a-eN-mid-stage3-v5 | 맥락이 복원되고 나서야 제가 놓친 부분을 알았습니다. 그때는 눈앞에 보이는 게 전부라고 생각했습니다. | a-e-{1,2,3,4,5}-mid-stage3-v5 |
| a-eN-mid-stage3-v6 | 다른 목적이 있었다면 남편이 바로 말했어야 했습니다. 저도 지나치게 단정한 건 맞습니다. | a-e-{1,2,3,4,5}-mid-stage3-v6 |
| a-eN-mid-stage3-v7 | 저는 결과만 보고 남편을 몰아붙였습니다. 목적부터 확인했어야 했는데, 그 순서가 늦었습니다. | a-e-{1,2,3,4,5}-mid-stage3-v7 |
| a-eN-mid-stage3-v8 | 이 단서가 나오기 전까지 저는 제 결론만 붙들고 있었습니다. 그건 제 책임입니다. | a-e-{1,2,3,4,5}-mid-stage3-v8 |
| a-eN-mid-stage3-v9 | 목적을 제대로 확인하려면 더 물었어야 했는데, 저는 이미 제 결론 쪽으로 마음이 기울어 있었습니다. | a-e-{1,2,3,4,5}-mid-stage3-v9 |
| a-eN-mid-stage3-v10 | 제 해석이 전부가 아닐 수 있다는 걸 받아들이기 시작했지만, 남편이 설명하지 않아서 쉽게 물러서지는 못했습니다. | a-e-{1,2,3,4,5}-mid-stage3-v10 |

### 2.3. late / stage 1 (7 archetypes / 35 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-late-stage1-v2 | 제가 그 자료를 한쪽으로만 본 건 인정합니다. 그래도 숨긴 건 남편이었습니다. | a-e-{1,2,3,4,5}-late-stage1-v2 |
| a-eN-late-stage1-v3 | 그때 제 해석이 성급했을 수 있습니다. 하지만 아무 설명 없이 지나간 시간도 같이 봐야 한다고 생각합니다. | a-e-{1,2,3,4,5}-late-stage1-v3 |
| a-eN-late-stage1-v6 | 제가 먼저 단정했다는 말은 피하지 않겠습니다. 다만 그 단정을 키운 건 남편의 침묵이었습니다. | a-e-{1,2,3,4,5}-late-stage1-v6 |
| a-eN-late-stage1-v7 | 처음 보이는 것만으로 결론을 낸 건 제 책임입니다. 그래서 더 세게 몰아붙였습니다. | a-e-{1,2,3,4,5}-late-stage1-v7 |
| a-eN-late-stage1-v8 | 그 자료를 보고 제 생각이 흔들렸습니다. 늦게라도 다른 뜻이 있을 수 있다는 걸 보게 됐습니다. | a-e-{1,2,3,4,5}-late-stage1-v8 |
| a-eN-late-stage1-v9 | 제가 너무 빨리 최악의 경우를 떠올린 건 맞습니다. 그렇다고 남편이 숨긴 일이 없어지는 건 아닙니다. | a-e-{1,2,3,4,5}-late-stage1-v9 |
| a-eN-late-stage1-v10 | 이제는 자료 자체와 제 해석을 따로 보려고 합니다. 그때는 그렇게 하지 못했습니다. | a-e-{1,2,3,4,5}-late-stage1-v10 |

### 2.4. late / stage 2 (5 archetypes / 25 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-late-stage2-v3 | 자료들이 겹쳐 보였지만, 그 의미를 제가 먼저 정해 버린 것도 사실입니다. | a-e-{1,2,3,4,5}-late-stage2-v3 |
| a-eN-late-stage2-v5 | 그때는 정황만 보고도 답이 나온다고 믿었습니다. 지금은 정황도 잘못 읽을 수 있다는 걸 압니다. | a-e-{1,2,3,4,5}-late-stage2-v5 |
| a-eN-late-stage2-v7 | 자료가 수상해 보였던 건 사실입니다. 다만 그 의미를 제가 너무 빨리 확정해 버렸습니다. | a-e-{1,2,3,4,5}-late-stage2-v7 |
| a-eN-late-stage2-v9 | 남편에게 먼저 물었어야 했습니다. 그런데 저는 자료들끼리만 맞춰 보고 결론을 냈습니다. | a-e-{1,2,3,4,5}-late-stage2-v9 |
| a-eN-late-stage2-v10 | 그때 저는 자료보다 제 불안에 기대어 결론을 냈습니다. 남편이 설명하지 않으니 그 불안이 더 커졌습니다. | a-e-{1,2,3,4,5}-late-stage2-v10 |

### 2.5. late / stage 3 (6 archetypes / 30 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-late-stage3-v2 | 실제 목적을 확인하지 않은 채 외도라고 단정한 책임은 제게도 있습니다. | a-e-{1,2,3,4,5}-late-stage3-v2 |
| a-eN-late-stage3-v3 | 제가 본 자료와 제가 붙인 의미는 달랐습니다. 그걸 늦게 깨달았습니다. | a-e-{1,2,3,4,5}-late-stage3-v3 |
| a-eN-late-stage3-v4 | 이 단서를 보고도 바로 물러서지 못했습니다. 그때는 판단보다 배신감이 앞섰습니다. | a-e-{1,2,3,4,5}-late-stage3-v4 |
| a-eN-late-stage3-v7 | 자료가 실제로 무엇을 뜻하는지 확인하기도 전에, 제 불안이 먼저 답을 만들어 버렸습니다. | a-e-{1,2,3,4,5}-late-stage3-v7 |
| a-eN-late-stage3-v8 | 제가 단정한 책임은 인정합니다. 하지만 남편이 숨긴 일에 대해서는 남편에게 따로 책임을 물어야 합니다. | a-e-{1,2,3,4,5}-late-stage3-v8 |
| a-eN-late-stage3-v9 | 이 단서를 제대로 봤다면 다른 질문을 했어야 했는데, 저는 그러지 못했습니다. | a-e-{1,2,3,4,5}-late-stage3-v9 |

---

## §3. 다국어 번역 원칙

### 3.1. NPC 자기 발화 영역 (★ 본 batch 핵심)

`evidence_present` channel은 NPC 자기 진술. 재판관 청유 어미 X.

본 batch는 모두 **A (박지연, claimant)** archetype:
- mid-stage2/3: 부분 인정·자기 반성·진짜 목적 회피·결론 굳히기 흔적
- late-stage1/2/3: 단정 책임 인정·표면만 본 부분 인정·불안이 답을 만든 점 인정·남편 침묵 책임 분리

### 3.2. archetype 일관성 (★ 효율 5x)

각 archetype 1 polish → e-1/e-2/e-3/e-4/e-5 5 entries 동시 적용. **evidence-specific 동사 X**. 일반화된 자연 발화.

기존 EN/JA/ZH-CN 번역은 evidence별로 변형됐을 수 있음. 본 polish에서는 **archetype 단위로 통합** (KO 자연화 결과와 일관성 유지). 5 entries에 동일 다국어 텍스트 적용 가능.

### 3.3. 자연화 톤 보존

KO polish의 의도를 다국어에 보존:

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 강조 부사 "진짜" 제거 | "실제 목적" | EN "the actual purpose" / JA "実際の目的" / ZH-CN "真正的目的" |
| 직역체 "복원된 맥락" 자연화 | "맥락이 복원되고 나서야" | EN "Only after the context was restored" / JA "文脈が見えてからやっと" / ZH-CN "脉络补全后才" |
| 무생물 주어 회피 | "이 단서가 ... 흔들었습니다" → "이 단서를 보고 제 해석이 흔들렸습니다" | NPC 능동 발화로 / EN "I felt my reading waver upon seeing this clue" |
| 표면→자연 표현 | "표면만으로" → "처음 보이는 것만으로" | EN "based only on what was visible at first" / JA "最初に見えたものだけで" / ZH-CN "只凭最初看到的" |
| 어미 단조 회피 | "없었습니다" → "어려웠습니다 / 기울었습니다 / 굳어졌습니다" | 어미 다양화 (단어 직역 X) |

### 3.4. lieBand 톤 보존

| lieBand | 톤 |
|---------|-----|
| mid-stage2/3 | 부분 인정·자기 반성·진짜 목적 회피 / hidden keyword **신규 도입 X** |
| late-stage1/2/3 | 단정 책임 인정·표면만 본 부분 인정 / hidden keyword **신규 도입 X** |

본 batch는 **모두 mid/late stage = 일부 자백 후 영역**. KO에서 "외도라고 단정" (a-eN-late-stage3-v2) 등장은 박지연 의심 frame 보존 영역으로 정책 허용. 단, hidden keyword (가족/형/회생/사기/조작/위법 등) 절대 도입 X.

### 3.5. 호명

- "남편" (A 발화 → 이준호): EN "my husband" / JA "夫" / ZH-CN "我丈夫"
- 본 batch는 박지연 화자, 이준호 호명만 등장.

### 3.6. 특수 단어 보존

- **"외도"** (Group 25, a-eN-late-stage3-v2): A의 자기 의심 frame 표현. 보존 OK. EN "infidelity / affair" / JA "浮気" / ZH-CN "外遇". 박지연 본인이 가설을 사실처럼 단정한 것을 후회하는 맥락.
- **"배신감"** (Group 27, a-eN-late-stage3-v4): A의 내면 감정. EN "betrayal" / JA "裏切られたという感情" / ZH-CN "被背叛的感觉".

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

- worktree branch `codex/spouse01-evidence-batch5-sync` push
- main session에서 cherry-pick 후 cleanup
