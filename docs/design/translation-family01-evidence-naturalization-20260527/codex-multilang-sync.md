# Codex Thread — family-01 evidence_present 자연화 5 archetype 19 entries 다국어 sync

작성일: 2026-05-27
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_family01_truth_disclosure_policy](../../../memory/design_family01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/family01-evidence-naturalization-sync ../ws-family01-evidence-naturalization-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/family01-evidence-naturalization-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/family-01.json`의 `evidence_present` channel 자연화 polish **5 archetype 19 entries** (commit on main: `9b48590a`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- family-01 사건 (★ spouse/friend 아님 — 진실 정책 별도)
- 모두 **B 발화 (윤정후, defendant)** late stage = 진실 인정 단계
- 1 core (Arch 1) + 4 보강 variants (Arch 2 base + prefix/suffix)
- 19 entries × 3 lang = 57 anchor

### 1.1. 영향 파일

```
src/data/scriptedText/family-01.en.json
src/data/scriptedText/family-01.ja.json
src/data/scriptedText/family-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `9b48590a`)
- 다른 channel / 다른 case — 본 의뢰 외

---

## §2. Polish anchor (5 archetypes / 19 entries)

main commit `9b48590a`의 git show 결과로 KO diff 확인.

### 2.1. 5 archetypes 표

| Archetype | party | lieBand | evidence | x | KO (변경 후) |
|-----------|-------|---------|----------|---|---------------|
| 1 | b | late | e-5 | 10 | 현재 공개된 연습본만으로는 제가 인정한 변경 경위의 핵심이 아직 다 드러나지 않습니다. 그 단계가 열리면 남은 내용도 설명하겠습니다. |
| 2 (core) | b | late | e-4 | 4 | 어머니께서 답변을 바로 하지 않고 물 한 잔을 청하셨다는 기록이 있고, 제가 진행을 재촉하는 것처럼 보였다는 메모도 남았습니다. 그 정황은 부정하지 않겠습니다. |
| 3 (Arch 2 + record suffix) | b | late | e-4 | 2 | 어머니께서 답변을 바로 하지 않고 물 한 잔을 청하셨다는 기록이 있고, 제가 진행을 재촉하는 것처럼 보였다는 메모도 남았습니다. 그 정황은 부정하지 않겠습니다만, 기록에 남은 범위 안에서만 말씀드리겠습니다. |
| 4 (Arch 2 + direct prefix) | b | late | e-4 | 2 | 제가 직접 설명해야 할 일입니다. 어머니께서 답변을 바로 하지 않고 물 한 잔을 청하셨다는 기록이 있고, 제가 진행을 재촉하는 것처럼 보였다는 메모도 남아 있으니, 그 정황은 부정하지 않겠습니다. |
| 5 (Arch 2 + direct suffix) | b | late | e-4 | 1 | 어머니께서 답변을 바로 하지 않고 물 한 잔을 청하셨다는 기록과 제가 진행을 재촉하는 것처럼 보였다는 메모가 남아 있습니다. 그 정황은 부정하지 않겠고, 제가 직접 설명해야 할 일입니다. |

### 2.2. archetype 적용 IDs

- **Archetype 1 (x10)**: `b-e-5-late-stage1-v1` 부터 `v10` 까지 10 entries
- **Archetype 2 (x4)**: `b-e-4-late-self-v1`, `b-e-4-late-stage1-v4`, `b-e-4-late-stage2-v6`, `b-e-4-late-stage3-v4`
- **Archetype 3 (x2)**: `b-e-4-late-self-v5`, `b-e-4-late-stage2-v10`
- **Archetype 4 (x2)**: `b-e-4-late-stage1-v8`, `b-e-4-late-stage3-v8`
- **Archetype 5 (x1)**: `b-e-4-late-stage2-v2`

(전체 ID 확인은 git show 9b48590a)

---

## §3. 다국어 번역 원칙

### 3.1. family-01 사건 구도

- **A = 윤정희** (claimant): 큰누나, 어머니의 마지막 1년 거의 못 찾아옴. 유서·자필 90:10 불일치 의심.
- **B = 윤정후** (defendant): 동생, 어머니 직접 모심. 공증 단계 진행 재촉 정황. 친부 = 정후 (출생 비밀, e-7 영구 봉인).

본 batch는 모두 **B 발화 (윤정후) late stage**.

### 3.2. NPC 자기 발화 톤

`evidence_present` channel은 NPC 자기 진술. 재판관 청유 어미 X.

B late = 자기 책임 부분 인정 + 후술 약속:
- "부정하지 않겠습니다 / 설명하겠습니다 / 일입니다" 발화 어미
- 1인칭 자기 발화 — **"본인 / 자신" 사용 X**, "저 / 제 / 제가" 자연

### 3.3. 자연화 톤 보존

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 추상 referent "그 부분" → "남은 내용" (후술 약속) | 명확 referent | EN "what's left" / JA "残りの内容" / ZH-CN "剩余的内容" |
| 추상 referent "그 부분" → "그 정황" (자기 인정) | 명확 referent | EN "those circumstances" / JA "その状況" / ZH-CN "那些情况" |
| 어색 부분 "직접 설명해야 할 부분" → "직접 설명해야 할 일" | 명확 명사 | EN "what I should explain myself" / JA "私が直接説明すべきこと" / ZH-CN "我应该亲自说明的事" |
| 보강 결합 (마침표→콤마/만) | 자연 흐름 | 다국어도 자연 결합 가능 |

### 3.4. family-01 진실 누설 정책

본 batch entries는 모두 **B late stage** = 진실 인정 단계:
- **e-4 (공증 재촉 정황)**: late stage 표면 evidence (어머니 답변 늦춤 / 물 한 잔 / 재촉 메모) **보존 OK**
- **e-5 (자필 연습본)**: late stage 표면 (연습본 공개) **보존 OK**

**hidden keyword 신규 도입 절대 X**:
- 출생 비밀 / 친부 실명 (e-7 영구 봉인)
- 90:10 단정 (e-5 → S5 단계 전 회피)
- 정후 진실 직접 명시

### 3.5. 호명

- "어머니" (B 가족 — 모친): EN "my mother" / JA "母" / ZH-CN "我母亲"

기존 EN/JA/ZH-CN 번역의 호명 형식 우선 확인하고 일관성 유지.

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~58,944 — 회귀 X 확인)
5. `git diff --stat` 으로 family-01 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/family01-evidence-naturalization-sync` push
- main session에서 cherry-pick 후 cleanup
