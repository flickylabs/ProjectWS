# Codex Thread — family-01 contradiction_pursuit 어색 잔존 16 entries 다국어 sync

작성일: 2026-05-23
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)

관련 정책:
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [design_family01_truth_disclosure_policy](../../../memory/design_family01_truth_disclosure_policy.md)
- [feedback_natural_korean_npc_active_voice](../../../memory/feedback_natural_korean_npc_active_voice.md)
- [feedback_self_reference_speaker_context](../../../memory/feedback_self_reference_speaker_context.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/family01-contradiction-pursuit-sync ../ws-family01-contradiction-pursuit-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/family01-contradiction-pursuit-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/family-01.json`의 `contradiction_pursuit` channel **16 entries** (commit on main: `d7736fbe`). EN/JA/ZH-CN 동일 anchor 동기.

본 batch 특이성:
- 완전히 4 + 그_판단 4 + 그_부분 4 + 그렇게 3 다중 패턴. 16 unique entries 1:1 polish.
- NPC 모순 지적 channel. 호명 보존 (제 동생 / 제 아내 / 형 / 어머니).

### 1.1. 영향 파일

```
src/data/scriptedText/family-01.en.json
src/data/scriptedText/family-01.ja.json
src/data/scriptedText/family-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file — main에 이미 적용 완료 (commit `d7736fbe`)
- 다른 batch — 별도 의뢰서

---

## §2. Polish anchor

main commit `d7736fbe`의 `git show d7736fbe` 결과로 KO diff 확인. 각 변경 entry는 ID 기준으로 EN/JA/ZH-CN file의 동일 ID entry sync.

명령 예시:
```
git show d7736fbe -- src/data/scriptedText/family-01.json
```

---

## §3. 다국어 번역 원칙

### 3.1. contradiction_pursuit 채널 특이성

NPC가 상대 진술의 모순을 지적·추궁하는 채널. 단정 X / 의문·확인 형식 자연.

### 3.2. NPC 자기 발화 영역 (★ 핵심)

본 batch는 NPC 1인칭 자기 발화 영역:
- **"본인 / 자신" 사용 X** — "저 / 제" 자연 ([[feedback_self_reference_speaker_context]])
- 호명 (제 남편 / 제 아내 / 제 동생 / 어머니 / 예비신랑 등) 보존
- 재판관 청유 어미 X

### 3.3. 자연화 톤 보존

KO polish의 의도를 다국어에 보존:

| KO 영역 | KO 자연화 | 권장 다국어 톤 |
|---------|-----------|----------------|
| 강조 부사 완화 | "그렇게" → 명확 표현 또는 제거 | EN 단정 어휘 완화 / JA 副詞 자연화 / ZH-CN 정도 부사 자연화 |
| 추상 referent 구체화 | "그 부분" → "그 정황 / 그 점" 등 | 구체 referent 다국어 적용 |
| 직역체 자연화 | "가리킵니다 / 드러납니다" → "맞물려 / 확인됩니다" | 어미 자연화 |
| 어미 다양화 | "...습니다" 반복 → "...어려웠습니다 / ...기울었습니다" 등 | 어미 다양화 |

### 3.4. 진실 누설 회피

NPC 모순 지적 channel. 호명 보존 (제 동생 / 제 아내 / 형 / 어머니).

본 batch에 신규 hidden keyword 도입 X. 원본 KO에 등장하는 표현만 다국어 보존.

---

## §4. 검증 요구사항

1. `npx tsc -b --force` (silent PASS)
2. `npm run qa:fast` (P0=0)
3. `node scripts/detect-truth-leak.cjs --strict` (findings=0)
4. `node scripts/verify-translations.cjs --strict --scan-applied` (현재 baseline ~58,695 — 회귀 X 확인)
5. `git diff --stat` 으로 3 file만 변경 확인 (KO file 변경 X)

---

## §5. PowerShell 인코딩 주의

- `Get-Content` 기본 ANSI = 한국어/일본어/중국어 mojibake 발생
- 파일 swap PowerShell로 진행 시 mojibake 복구 불가
- **Edit / Write tool 우선 사용**

---

## §6. 산출

- worktree branch `codex/family01-contradiction-pursuit-sync` push
- main session에서 cherry-pick 후 cleanup
- 결과 보고 양식:
  ```
  완료. Branch: codex/family01-contradiction-pursuit-sync
  Commit: <hash>
  검증: tsc/qa:fast/truth-leak/verify-translations PASS (total <숫자>)
  변경: family-01.en/ja/zh-CN.json (... entries)
  ```
