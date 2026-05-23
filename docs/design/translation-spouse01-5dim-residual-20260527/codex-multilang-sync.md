# Codex Thread — spouse-01 NPC 적극 발화 5 차원 cleanup 50 entries 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)
- [feedback_self_reference_speaker_context](../../../memory/feedback_self_reference_speaker_context.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-5dim-residual-sync ../ws-spouse01-5dim-residual-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-5dim-residual-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 **NPC 적극 발화 5 차원 cleanup 50 entries** (commit on main: `98240bfe`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- [[feedback_natural_korean_npc_active_voice]] 5 차원 정책 잔존 자연화 batch
- lieState 단계 분리:
  - S5 자백 영역 강력 어휘 자기 인정 보존 (이미 batch 제외, 32 entries)
  - S0~S4 회피/변명 + 모든 단계 모호 referent/직역구문 = 본 batch 50 entries
- 채널: evidence_present 27 + interrogation 13 + aftermath 7 + dossier 1 + contradiction_pursuit 1 + trust_action 1
- NPC 자기 발화 영역 (재판관 발화 X)

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `98240bfe`)
- 다른 batch — 별도 의뢰서

---

## §2. Polish anchor

main commit `98240bfe`의 `git show 98240bfe` 결과로 KO diff 확인. 각 변경 entry는 ID 기준으로 EN/JA/ZH-CN file의 동일 ID entry sync.

명령 예시:
```
git show 98240bfe -- src/data/scriptedText/spouse-01.json
```

---

## §3. 다국어 번역 원칙

### 3.1. NPC 자기 발화 영역

NPC 1인칭 자기 발화 — 변명/회피/인정/감정 표출. 재판관 격식 X.
- **자기지시 정책** ([[feedback_self_reference_speaker_context]]): NPC 1인칭 자기 발화에 "본인/자신" X → "저/제"
- 호명 보존 (박지연 씨 / 이준호 씨 / 제 남편 / 제 아내)

### 3.2. 5 차원 자연화 톤 보존

KO polish의 의도를 다국어에 보존:

| 차원 | KO 자연화 | 권장 다국어 톤 |
|------|-----------|----------------|
| 차원 1 강력 어휘 완화 | "사기" → "속았다" / "범죄" → "수상한" / "혐의" → "문제" (S0~S4 영역) | EN crime/fraud → was deceived / suspicious / problem |
| 차원 1 S5 보존 | "범죄인 걸 알면서도" 등 자기 인정 영역 보존 (본 batch 일부 confess entries 모호 referent만 정리, 강력 어휘는 보존 — KO diff 그대로 따라가시면 됩니다) | EN 그대로 / JA 同じ / ZH-CN 同樣 |
| 차원 2 모호 referent 구체화 | "다른 사정 / 다른 일 / 제 일과" → 구체 referent | EN that matter → 구체 / JA その件 → 구체 / ZH-CN 那件事 → 구체 |
| 차원 3 피동 직역 능동화 | "드러납니다" → "얽혀있어 말씀드리기 어렵습니다" | EN reveals → entangled, hard to disclose / JA 浮き上がる → 絡んでいる / ZH-CN 暴露 → 牽連 |
| 차원 4 직역구문 → 내면 발화 | "그 행동에는 ... 뜻이 있었습니다" → "제 도움이 필요했던 상황이라 ..." | EN action had purpose → I needed to help / JA その行為には...意図 → 助けが必要だった / ZH-CN 那行為有...意圖 → 我必須幫忙 |
| 차원 5 자연 완충재 | "말씀드리기 어렵지만 / 어쩔 수 없었습니다 / 분명 잘못입니다 / 변명의 여지가 없습니다" | EN it's hard to say but / I had no choice / clearly my fault |

### 3.3. 진실 누설 회피

spouse-01 진실 누설 정책: 가족/개인회생/형사 절차 자백 전 등장 X. 가족 = 오직 형 사업 영역.

본 batch에 신규 hidden keyword 도입 X. 원본 KO에 등장하는 회피 표현 ("다른 사람의 사정 / 그쪽 / 관련자 / 별도 사용처") 다국어 보존.

---

## §4. 검증 요구사항

1. `node node_modules/typescript/bin/tsc --noEmit` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (baseline ~57,719 — 회귀 X 확인, sync 후 감소 기대)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/spouse01-5dim-residual-sync` push
- main session에서 cherry-pick 후 cleanup
- 결과 보고 양식:
  ```
  완료. Branch: codex/spouse01-5dim-residual-sync
  Commit: <hash>
  검증: tsc/qa:fast/truth-leak/verify-translations PASS (total <숫자>)
  변경: spouse-01.en/ja/zh-CN.json (50 entries)
  ```
