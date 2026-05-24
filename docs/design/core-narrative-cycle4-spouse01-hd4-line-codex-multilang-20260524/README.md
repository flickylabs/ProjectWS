# Cycle 4 — spouse-01 h-d4 line Codex 다국어 sync 의뢰서 폴더

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역) — 사용자가 worktree spawn + branch에서 Codex 실행
범위: 51 KO entry × 3 lang (EN / JA / ZH-CN) = **153 entry sync**
KO baseline: main HEAD `66444bc7` (Cycle 4 6단계 적용 commit)

---

## 폴더 구성

| 파일 | 용도 |
|---|---|
| `README.md` | 본 인덱스 |
| `codex-multilang-sync.md` | **메인 의뢰서** — §0 진입 조건 + §2 51 entry 풀 list + §3 다국어 원칙 9 영역 + §5~6 작업 흐름·산출 |
| `result/` | (단순 placeholder — worktree 양식은 branch push로 산출. 본 폴더에는 산출 X) |

⚠ **메모리 사본 X** — Codex가 worktree 안의 repo + `C:\Users\user\.claude\projects\d--ProjectWS\memory\` 영역을 직접 접근 가능. 의뢰서에서 메모리 참조는 `[[memory-name]]` 표기로만 명시.

---

## Codex 진입 절차 (사용자 PowerShell)

```powershell
$slug = "spouse01-cycle4-multilang"
$wt = "../ws-$slug"
$br = "codex/$slug"
git worktree add $wt -b $br main
git -C $wt config user.name "codex"
git -C $wt config user.email "codex@local"
git -C $wt config commit.gpgsign false
git config --global --add safe.directory (Resolve-Path $wt).Path  # ★ 필수 — [[feedback_codex_worktree_safe_directory]]
```

Codex CLI agent 진입 후 의뢰서 정독 + 작업 진행 + branch push.

---

## 본 cycle 핵심 권위 (요약)

1. **51 entry × 3 lang = 153 entry**
2. **신규 영역 4 key**: `emerge-e-8` (13) / `emerge-e-9` (12) / `emerge-dc-8` (13) / `emerge-h-d4` (13)
3. **cascade chain 다국어 일관**: dc-3 (Cycle 2) → e-8 → e-9 → dc-8 → h-d4 — 5 cascade_from_card priorCard entity 다국어 명칭 baseline 보존
4. **진실 노출 정책 (최정점)**: h-d4 4-b b-outburst entry 1개만 박지연 난임/치료비 단어 surface — 나머지 50 entry 모두 surface 절대 X
5. **부부 직접 발화 다국어 신규**: h-d4 4-b/4-c (entry #42, #44, #46) "자기야" 반말 영역 → EN/JA/ZH-CN 친밀체 신규 적용
6. **Batch 7 톤 차용 다국어 보존**: h-d4 4-d (entry #50) 책임 split frame 보존 + `sourceTone:batch7-mediation-h-d4-S4-responsibility-split-v1` tag 그대로

---

## Cycle 1~7 reference

- Cycle 1 (e-5): 17 KO × 3 lang = 51 외국어 sync (적용 완료)
- Cycle 2 (자금 line 8 emergence, batch1~4 분리): 97 KO × 3 lang = 291 외국어 (적용 완료, worktree 양식)
- Cycle 3 (외도 line 4 emergence): 51 KO × 3 lang = 153 외국어 (적용 완료, ChatGPT 양식 — 예외)
- Cycle 5 (family-01 6 emergence): 별도 cycle 진행
- Cycle 7 (friend-01 Line A+B 5 emergence, batch1~4): 64 KO × 3 lang = 192 외국어 (적용 완료, worktree 양식)
- **Cycle 4 (h-d4 line 4 emergence): 51 KO × 3 lang = 153 외국어 (본 batch, worktree 양식)**

병렬 진행 가능성 (충돌 X — spouse-01.{lang}.json 단일 file 영역 / friend-01·family-01 별도 file):
- `friend-01` Cycle 8 (Line C 아버지 line) 별도 cycle 세션
- `family-01` 후속 cycle 별도 진행

본 sync는 `spouse-01.{en,ja,zh-CN}.json` 영역만 변경 → 다른 사건 영역과 ScriptedText file 영역 완전 분리.

---

## 메인 Claude 후속 (Codex branch push 도착 시)

사용자가 branch push 완료 알림 후:
1. 메인 Claude가 `git fetch origin + git log origin/codex/spouse01-cycle4-multilang` 확인
2. fast-forward merge OR JSON union script (다른 cycle/CT 세션과 동시 변경 시)
3. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` 검증
4. main push + worktree 정리 (사용자 IDE 닫은 후)
5. Cycle 4 완료 보고 + 다음 cycle 안내
