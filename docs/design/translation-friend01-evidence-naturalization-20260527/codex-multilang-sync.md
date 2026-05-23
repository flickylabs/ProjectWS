# Codex Thread — friend-01 evidence_present 자연화 9 archetype 80 entries 다국어 sync

작성일: 2026-05-27
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_friend01_truth_disclosure_policy](../../../memory/design_friend01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/friend01-evidence-naturalization-sync ../ws-friend01-evidence-naturalization-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/friend01-evidence-naturalization-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/friend-01.json`의 `evidence_present` channel 자연화 polish **9 archetype 80 entries** (commit on main: `f627cbd5`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- friend-01 사건 (★ spouse 아님 — 진실 정책 별도)
- **9 unique archetypes × 평균 8.9 entries = 80 entries** (효율 8.9x per polish)
- 3 core archetype + 6 보강 variant (prefix/suffix 추가)

### 1.1. 영향 파일

```
src/data/scriptedText/friend-01.en.json
src/data/scriptedText/friend-01.ja.json
src/data/scriptedText/friend-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `f627cbd5`)
- 다른 channel / 다른 case (spouse-01, family-01) — 본 의뢰 외

---

## §2. Polish anchor (9 archetypes / 80 entries)

main commit `f627cbd5`의 git show 결과로 KO diff 확인. 각 archetype은 7~14 entries에 동시 적용됨.

### 2.1. 9 archetypes 표

| Archetype | party | lieBand | evidence | x | KO (변경 후) |
|-----------|-------|---------|----------|---|---------------|
| 1 (core) | a | late | e-5 | 14 | 아버지가 예비신랑에게 돈 얘기를 꺼냈습니다. 최수민이 연락한 이유도 여기서 맞물립니다. |
| 2 (core) | b | early | e-6 | 14 | 송금 기록은 제 것이 맞습니다. 그 일을 다은이에게 바로 말할 용기가 없었습니다. |
| 3 (core) | b | late | e-4 | 10 | 현재 공개된 첫 대화만으로는 선후관계를 단정하기 어렵습니다. 뒤의 원문까지 확인해야 합니다. |
| 4 (Arch 1 + suffix) | a | late | e-5 | 7 | 아버지가 예비신랑에게 돈 얘기를 꺼냈고, 최수민이 연락한 이유도 여기서 맞물립니다. 양쪽 말을 함께 놓고 봐야 합니다. |
| 5 (Arch 1 + prefix) | a | late | e-5 | 7 | 양쪽 말을 함께 놓고 봐야 합니다. 아버지가 예비신랑에게 돈 얘기를 꺼냈고, 최수민이 연락한 이유도 여기서 맞물립니다. |
| 6 (Arch 1 + record suffix) | a | late | e-5 | 7 | 아버지가 예비신랑에게 돈 얘기를 꺼냈고, 최수민이 연락한 이유도 여기서 맞물립니다. 기록에 남은 범위까지만 말씀드리겠습니다. |
| 7 (Arch 2 + explain suffix) | b | early | e-6 | 7 | 송금 기록은 제 것이 맞습니다. 그 일을 다은이에게 바로 말할 용기가 없었고, 제가 직접 설명해야 할 부분입니다. |
| 8 (Arch 2 + explain prefix) | b | early | e-6 | 7 | 제가 직접 설명해야 할 부분입니다. 송금 기록은 제 것이 맞고, 그 일을 다은이에게 바로 말할 용기가 없었습니다. |
| 9 (Arch 2 + record suffix) | b | early | e-6 | 7 | 송금 기록은 제 것이 맞습니다. 그 일을 다은이에게 바로 말할 용기가 없었고, 기록에 남은 범위까지만 말씀드리겠습니다. |

### 2.2. archetype 적용 IDs (참조용)

각 archetype은 다음 entries에 동시 적용됨 (총 80 entries):

**Archetype 1 (x14)**: `a-e-5-late-both-v1`, `a-e-5-late-both-v4`, `a-e-5-late-stage1-v1/v4/v6/v9`, `a-e-5-late-stage2-v1/v4/v6/v9`, `a-e-5-late-stage3-v1/v4/v6/v9`

**Archetype 2 (x14)**: `b-e-6-early-self-v1/v4`, `b-e-6-early-stage1-v1/v4/v6/v9`, `b-e-6-early-stage2-v1/v4/v6/v9`, `b-e-6-early-stage3-v1/v4/v6/v9`

**Archetype 3 (x10)**: `b-e-4-late-stage1-v1` 부터 `v10` 까지 10 entries

**Archetype 4 (x7)**: `a-e-5-late-both-v2`, `a-e-5-late-stage1-v2/v7`, `a-e-5-late-stage2-v2/v7`, `a-e-5-late-stage3-v2/v7`

**Archetype 5 (x7)**: `a-e-5-late-both-v3`, `a-e-5-late-stage1-v3/v8`, `a-e-5-late-stage2-v3/v8`, `a-e-5-late-stage3-v3/v8`

**Archetype 6 (x7)**: `a-e-5-late-both-v5`, `a-e-5-late-stage1-v5/v10`, `a-e-5-late-stage2-v5/v10`, `a-e-5-late-stage3-v5/v10`

**Archetype 7 (x7)**: `b-e-6-early-self-v2`, `b-e-6-early-stage1-v2/v7`, `b-e-6-early-stage2-v2/v7`, `b-e-6-early-stage3-v2/v7`

**Archetype 8 (x7)**: `b-e-6-early-self-v3`, `b-e-6-early-stage1-v3/v8`, `b-e-6-early-stage2-v3/v8`, `b-e-6-early-stage3-v3/v8`

**Archetype 9 (x7)**: `b-e-6-early-self-v5`, `b-e-6-early-stage1-v5/v10`, `b-e-6-early-stage2-v5/v10`, `b-e-6-early-stage3-v5/v10`

(전체 ID 확인은 git show f627cbd5)

---

## §3. 다국어 번역 원칙

### 3.1. friend-01 사건 구도 (★ spouse 아님)

- **A = 송다은** (claimant): 31세, `premature_summary`. 단톡방에 최수민을 매도. 아버지의 진짜 모습이 드러나는 게 가장 큰 공포.
- **B = 최수민** (defendant): 31세, `affect_flattening`. 예비신랑에게 9일간 연락 — 실제로는 송다은 보호 위해 경고 의도. 가장 아픈 이야기에서도 톤 평평.

### 3.2. NPC 자기 발화 톤

`evidence_present` channel은 NPC 자기 진술. 재판관 청유 어미 X.

- **A 발화 (송다은)**: 자기 결론 선언 → 맥락 후 끼워넣기 (`premature_summary`)
- **B 발화 (최수민)**: 감정 평평 + 사실만 나열 (`affect_flattening`)

### 3.3. archetype 일관성 (★ 효율)

각 archetype 1 polish → 7~14 entries 동시 적용. **evidence-specific 동사 X**. 일반화된 자연 발화.

### 3.4. 자연화 톤 보존

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 직역 어미 "이어집니다" → "맞물립니다" | 자연 술어 (이어진다 → 맞물리다) | EN "intersect / meet here" / JA "ここで噛み合います" / ZH-CN "在这里交汇" |
| 자기지시 "자신이 없었습니다" → "용기가 없었습니다" | 명사 "자신감"의 줄임 → 자연 표현 | EN "I didn't have the courage" / JA "勇気がなかった" / ZH-CN "没有勇气" |
| 강조 부사 "끝까지" 제거 + "이어지는 원문" → "뒤의 원문" | 단정 보류 톤 | EN "I cannot conclude from this alone" / JA "断定するのは難しい" / ZH-CN "难以断定" |
| 보강 variants 마침표 → 콤마 결합 | 자연 흐름 | 다국어도 자연 결합 가능 |

### 3.5. friend-01 진실 누설 정책

본 batch의 각 archetype별 진실 노출 영역:

| Archetype | lieBand/stage | 진실 노출 영역 |
|-----------|--------------|----------------|
| 1/4/5/6 | a / late / e-5 | d-4 S3 이후 (그룹 4 아버지 원인 + 그룹 3 B 경고 의도). **"아버지가 예비신랑에게 돈 얘기" 보존 OK** |
| 2/7/8/9 | b / early / e-6 | 송금 인정 + 이유 회피 톤. "그 일" 모호 referent **보존** (송금 동기 = d-4 unlock 전) |
| 3 | b / late / e-4 | d-2 S3 이후 (그룹 1 예비신랑 선 넘기). 본 archetype은 단정 보류 톤 (B late 평평) |

**진실 누설 자가 점검**:
- early entries (Arch 2/7/8/9): hidden keyword (아버지 사기 / 예비신랑 선 넘기 / B 경고 의도) **신규 도입 X**
- late entries 한국어 원본에 등장하는 hidden keyword (아버지 돈 얘기 / 예비신랑 / 최수민 연락 이유) 보존 OK

### 3.6. 호명

- "다은이" (B → A, 친근 호명): EN "Daeun" / JA "ダウン" / ZH-CN "多恩"
- "최수민" (A → B, 풀네임): EN "Choi Sumin" / JA "チェ・スミン" / ZH-CN "崔秀敏"
- "아버지" (A 가족 — 송다은 아버지): EN "my father" / JA "父" / ZH-CN "我父亲"
- "예비신랑" (A 가족 — 송다은 약혼자): EN "my fiancé" / JA "婚約者" / ZH-CN "未婚夫"

기존 EN/JA/ZH-CN 번역의 호명 형식 우선 확인하고 일관성 유지.

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~59,258 — 회귀 X 확인)
5. `git diff --stat` 으로 friend-01 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/friend01-evidence-naturalization-sync` push
- main session에서 cherry-pick 후 cleanup
