# Codex Thread — spouse-01 evidence_present Batch 4 동형 archetype 150 entries 다국어 sync

작성일: 2026-05-27
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
| **worktree spawn** | `git worktree add -b codex/spouse01-evidence-batch4-sync ../ws-spouse01-evidence-batch4-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-evidence-batch4-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `evidence_present` channel **B4 동형 archetype polish 150 entries** (commit on main: `5f447948`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- **동형 archetype 그룹** = 동일 KO 텍스트가 e-1/e-2/e-3/e-4/e-5 5개 evidence에 동시 등장
- 30 unique archetypes × 5 evidence = 150 entries
- **박지연(A) claimant 자기 진술 archetype** (evidence 비 의존)

→ 다국어 처리도 같은 텍스트 1 polish → 5 evidence 동시 적용 가능 (효율 5x).

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `5f447948`)
- 다른 channel / 다른 case / B3 잔존 12 entries (별도 의뢰서) — 본 의뢰 외

---

## §2. Polish anchor (30 archetypes / 150 entries)

main commit `5f447948`의 git show 결과로 KO diff 확인.
**각 archetype은 e-1/e-2/e-3/e-4/e-5에 동일 텍스트 적용됨**.

### 2.1. early / stage 1 (8 archetypes / 40 entries)

| Archetype | KO (변경 후) | 적용 IDs (5 evidence × 1 archetype) |
|-----------|--------------|-------------------------------------|
| a-eN-early-stage1-v3 | 자료의 출처부터 말씀드리면, 제가 직접 확인한 겁니다. 그래서 가볍게 넘기기는 어려웠습니다. | a-e-{1,2,3,4,5}-early-stage1-v3 |
| a-eN-early-stage1-v4 | 이 자료를 보고 나서야 의심을 입 밖에 냈습니다. 그전까지는 혼자 눌러 두고 있었습니다. | a-e-{1,2,3,4,5}-early-stage1-v4 |
| a-eN-early-stage1-v5 | 이 자료를 보는 순간, 제가 괜히 의심한 것만은 아니라고 느꼈습니다. | a-e-{1,2,3,4,5}-early-stage1-v5 |
| a-eN-early-stage1-v6 | 처음엔 제가 예민한 건가 싶었습니다. 그런데 이 자료를 보고 나서는 생각이 한쪽으로 굳었습니다. | a-e-{1,2,3,4,5}-early-stage1-v6 |
| a-eN-early-stage1-v7 | 자료가 눈앞에 있는데 더는 모른 척하기 어려웠습니다. 남편은 아무 설명도 하지 않았습니다. | a-e-{1,2,3,4,5}-early-stage1-v7 |
| a-eN-early-stage1-v8 | 이 자료를 보고 제가 먼저 물어보기 시작했습니다. 그런데 답이 돌아오지 않으니 의심만 더 커졌습니다. | a-e-{1,2,3,4,5}-early-stage1-v8 |
| a-eN-early-stage1-v9 | 그때 제 눈에는 이 자료가 딴살림의 시작처럼 보였습니다. 저는 그때 그렇게밖에 받아들이지 못했습니다. | a-e-{1,2,3,4,5}-early-stage1-v9 |
| a-eN-early-stage1-v10 | 제가 꾸며낸 자료가 아닙니다. 남편에게서 나온 흔적을 제가 본 겁니다. 설명이 없으니 더 의심할 수밖에 없었습니다. | a-e-{1,2,3,4,5}-early-stage1-v10 |

### 2.2. early / stage 2 (6 archetypes / 30 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-early-stage2-v3 | 저는 이 자료가 누구를 두고 나온 건지 묻고 싶었습니다. 남편은 대답을 피했습니다. | a-e-{1,2,3,4,5}-early-stage2-v3 |
| a-eN-early-stage2-v5 | 그 연결을 우연으로 넘기기 어려웠습니다. 남편이 설명하지 않으니 의심이 더 갔습니다. | a-e-{1,2,3,4,5}-early-stage2-v5 |
| a-eN-early-stage2-v6 | 저는 이 자료가 누구를 뜻하는지 계속 물었습니다. 그런데 제대로 된 답은 듣지 못했습니다. | a-e-{1,2,3,4,5}-early-stage2-v6 |
| a-eN-early-stage2-v7 | 비슷한 일이 반복되니 저는 좋지 않은 쪽으로 해석할 수밖에 없었습니다. | a-e-{1,2,3,4,5}-early-stage2-v7 |
| a-eN-early-stage2-v8 | 그 맥락까지 보고 나니 모른 척하기 어려웠습니다. 제가 내린 결론도 거기서 시작됐습니다. | a-e-{1,2,3,4,5}-early-stage2-v8 |
| a-eN-early-stage2-v9 | 자료들이 서로 맞아떨어진다고 느꼈습니다. 그래서 남편 말보다 기록을 더 믿게 됐습니다. | a-e-{1,2,3,4,5}-early-stage2-v9 |

### 2.3. early / stage 3 (7 archetypes / 35 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-early-stage3-v2 | 이 단서가 있다고 해서 전부를 안다는 뜻은 아닙니다. 다만 제게는 남편이 왜 숨겼는지가 먼저였습니다. | a-e-{1,2,3,4,5}-early-stage3-v2 |
| a-eN-early-stage3-v3 | 목적이 무엇이었는지는 남편이 답해야 합니다. 저는 그때 보이는 쪽으로 판단할 수밖에 없었습니다. | a-e-{1,2,3,4,5}-early-stage3-v3 |
| a-eN-early-stage3-v4 | 그 부분은 아직도 혼란스럽습니다. 자료를 달리 볼 수 있다는 걸 너무 늦게 알았습니다. | a-e-{1,2,3,4,5}-early-stage3-v4 |
| a-eN-early-stage3-v5 | 최종 목적까지 제가 알 길은 없었습니다. 그래서 눈앞에 보이는 대로 판단했습니다. | a-e-{1,2,3,4,5}-early-stage3-v5 |
| a-eN-early-stage3-v6 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. | a-e-{1,2,3,4,5}-early-stage3-v6 |
| a-eN-early-stage3-v7 | 저한테는 목적보다 배신감이 먼저였습니다. 그 감정은 지금도 쉽게 지워지지 않습니다. | a-e-{1,2,3,4,5}-early-stage3-v7 |
| a-eN-early-stage3-v9 | 책임을 저한테만 돌리기는 어렵습니다. 그 목적을 숨긴 사람은 남편입니다. | a-e-{1,2,3,4,5}-early-stage3-v9 |

### 2.4. mid / stage 1 (7 archetypes / 35 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-mid-stage1-v3 | 그 자료가 저를 더 몰아붙인 건 맞습니다. 남편이 설명하지 않으니 제 결론도 한쪽으로 기울었습니다. | a-e-{1,2,3,4,5}-mid-stage1-v3 |
| a-eN-mid-stage1-v4 | 겉으로 보이는 것만 보고 단정했다고 하실 수 있습니다. 다만 제 눈에는 그게 너무 선명했습니다. | a-e-{1,2,3,4,5}-mid-stage1-v4 |
| a-eN-mid-stage1-v5 | 처음 확인하고 바로 감정부터 터뜨린 건 아닙니다. 며칠은 더 맞춰 봤습니다. | a-e-{1,2,3,4,5}-mid-stage1-v5 |
| a-eN-mid-stage1-v6 | 저도 확인하는 과정이 편하지는 않았습니다. 그래도 답을 들을 다른 길이 보이지 않았습니다. | a-e-{1,2,3,4,5}-mid-stage1-v6 |
| a-eN-mid-stage1-v7 | 자료를 손에 넣고 나서 저는 마음속으로 답을 정해 가고 있었습니다. | a-e-{1,2,3,4,5}-mid-stage1-v7 |
| a-eN-mid-stage1-v9 | 그 자료 하나만 보고 말한 건 아닙니다. 다른 흔적들과 함께 놓고 봤습니다. | a-e-{1,2,3,4,5}-mid-stage1-v9 |
| a-eN-mid-stage1-v10 | 제가 어떻게 알게 됐는지보다, 그 자료가 왜 나왔는지가 먼저라고 생각했습니다. | a-e-{1,2,3,4,5}-mid-stage1-v10 |

### 2.5. mid / stage 2 (2 archetypes / 10 entries)

| Archetype | KO (변경 후) | 적용 |
|-----------|--------------|------|
| a-eN-mid-stage2-v2 | 맥락을 맞춰 보니 더 의심스러웠습니다. 그때 제 눈에는 달리 해석할 여지가 없었습니다. | a-e-{1,2,3,4,5}-mid-stage2-v2 |
| a-eN-mid-stage2-v4 | 저도 하나만 보고 말한 건 아닙니다. 여러 흔적을 놓고 보니 같은 쪽으로 이어진다고 봤습니다. | a-e-{1,2,3,4,5}-mid-stage2-v4 |

---

## §3. 다국어 번역 원칙

### 3.1. NPC 자기 발화 영역 (★ 본 batch 핵심)

`evidence_present` channel은 NPC 자기 진술. 재판관 청유 어미 X.

본 batch는 모두 **A (박지연, claimant)** archetype:
- early: 자기 의심·자기 결론 굳히기·외도 단정 회피
- mid: 부분 인정·자기 반성·확인 과정 변명

### 3.2. archetype 일관성 (★ 효율 5x)

각 archetype 1 polish → e-1/e-2/e-3/e-4/e-5 5 entries 동시 적용. **evidence-specific 동사 X**. 일반화된 자연 발화.

기존 EN/JA/ZH-CN 번역은 evidence별로 변형됐을 수 있음. 본 polish에서는 **archetype 단위로 통합** (KO 자연화 결과와 일관성 유지). 5 entries에 동일 다국어 텍스트 적용 가능.

### 3.3. 자연화 톤 보존

KO polish의 의도를 다국어에 보존:

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 강조 부사 "진짜" 제거 | "목적이 무엇이었는지" | EN 직접 "the purpose" / JA "目的が何だったか" / ZH-CN "目的是什么" |
| 추상명사 자연화 | "같은 흐름" → "비슷한 일" | EN "similar things" / JA "似たようなこと" / ZH-CN "类似的事" |
| 직역 어미 자연화 | "가리킨다" → "이어진다" | EN "connect / point to the same" / JA "つながる" / ZH-CN "彼此关联" |
| 피동 회피 | "숨겨져 있었습니다" → "남편이 숨긴 게 ... 느꼈습니다" | NPC 능동 발화로 / EN "I felt my husband had hidden..." |
| 어미 단조 회피 | "없었습니다" → "어려웠습니다 / 기울었습니다" | 어미 다양화 (단어 직역 X) |

### 3.4. lieBand 톤 보존

| lieBand | 톤 |
|---------|-----|
| early | 자기 의심·자기 결론 굳히기 / hidden keyword **신규 도입 X** |
| mid | 부분 인정·자기 반성 / hidden keyword **신규 도입 X** |

본 batch는 **모두 early/mid stage = 진실 노출 전 영역**. 한국어 원본에 등장하는 키워드 외 hidden keyword (가족/형/회생/사기/조작/위법 등) 절대 도입 X.

### 3.5. 호명

- "남편" (A 발화 → 이준호): EN "my husband" / JA "夫" / ZH-CN "我丈夫"
- 본 batch는 박지연 화자, 이준호 호명만 등장.

### 3.6. 특수 단어 보존

- **"딴살림"** (Group 7, a-eN-early-stage1-v9): A의 외도 의심 표현. 보존 OK. EN "having another household/life" / JA "別の家庭" / ZH-CN "另起炉灶" 등 NPC가 외도 의심 표현으로 사용한 의미 유지.

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

- worktree branch `codex/spouse01-evidence-batch4-sync` push
- main session에서 cherry-pick 후 cleanup
