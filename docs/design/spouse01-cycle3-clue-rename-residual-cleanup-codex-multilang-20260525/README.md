# spouse-01 Cycle 3 cross-cycle 단서 명칭 변경 잔존 영역 정리 — Codex 다국어 의뢰서

작성일: 2026-05-25
주체: Claude (의뢰서 작성) → 사용자 (worktree spawn + Codex 세션 실행) → Codex (4언어 일괄 치환 + 검증) → Claude (사후 통합)
범위: spouse-01 ScriptedText 4언어 × `judge_evidence_combo` 채널 dossier challenge query behaviorHint 영역 = **480 string** (120 variant × 4 lang)
선행: Cycle 3 종료 HEAD `17080b6a` 시점 cross-cycle 단서 명칭 변경 부분 누락 영역

---

## 본 작업 배경

Cycle 3 종료 시점에 cross-cycle 정책 [[feedback_dossier_card_renamed_to_clue]] 적용:
- 변경 commit:
  - `cb770125` (KO 일괄, cycle 1+2+3 spouse-01.json text 19 + behaviorHint 7 = 26 hit / 20 entry)
  - `17080b6a` (외국어 sync, emergence_narrative 채널 16 string × 3 lang = 48 string)

그러나 **`judge_evidence_combo` 채널의 dossier challenge query behaviorHint 영역은 변경 영역 외**로 누락:
- KO에 "사건카드 단서" 어색 합성 표현 120건 잔존 (자연 보정 누락)
- EN에 "case-card clue" 합성 표현 120건 잔존 (자연 보정 누락)
- JA에 "事件カード" 옛 명칭 120건 잔존 (cross-cycle 미적용)
- ZH-CN에 "案件卡" 옛 명칭 120건 잔존 (cross-cycle 미적용)

family-01 / friend-01에는 동일 누락 없음 (검증 완료) — **spouse-01 한정 누락**.

---

## 폴더 구성 (self-contained — 사용자 worktree 업로드 가능)

| 파일 | 용도 |
|---|---|
| `README.md` | 본 인덱스 + 사용 절차 |
| `codex-multilang-sync.md` | **메인 의뢰서** — 영역 명세 + 변경 매트릭스 + 검증 |
| `memory/feedback_dossier_card_renamed_to_clue.md` | cross-cycle 명칭 변경 권위 |
| `memory/feedback_natural_korean_npc_active_voice.md` | KO 자연 보정 권위 |
| `memory/feedback_external_brief_self_contained_folder.md` | self-contained 폴더 정책 |
| `memory/feedback_powershell_encoding_utf8.md` | PowerShell UTF-8 인코딩 권위 |
| `memory/design_core_narrative_cycle_procedure.md` | cycle 8단계 절차 권위 |

---

## 사용자 진행 절차 (worktree spawn 패턴 — Cycle 1/2 패턴)

### 1. Worktree spawn (사용자 영역)

본 작업은 별도 ClaudeCode 세션 worktree에서 진행. spouse-01 main 세션 (본 세션)과 영역 충돌 회피.

PowerShell 또는 git Bash:
```bash
git worktree add D:/ws-spouse01-clue-rename-cleanup -b codex/spouse01-clue-rename-cleanup-20260525 origin/main
git -C D:/ws-spouse01-clue-rename-cleanup config --local safe.directory D:/ws-spouse01-clue-rename-cleanup
```

### 2. 새 ClaudeCode 세션 시작 (사용자 영역)

해당 worktree에서 ClaudeCode 세션 spawn. 진입 message:
```
spouse-01 Cycle 3 cross-cycle 단서 명칭 변경 잔존 영역 정리 작업.

영역 = 별도 worktree (codex 권위). 본 작업은 spouse-01 ScriptedText 4언어 × judge_evidence_combo 채널 dossier challenge query behaviorHint 영역 = 480 string (120 variant × 4 lang) 일괄 치환.

진입 자료:
1. docs/design/spouse01-cycle3-clue-rename-residual-cleanup-codex-multilang-20260525/README.md (본 인덱스)
2. docs/design/spouse01-cycle3-clue-rename-residual-cleanup-codex-multilang-20260525/codex-multilang-sync.md (메인 의뢰서)
3. memory/ 권위 메모리 5개 정독

작업 영역 명확: 4언어 동일 패턴 1 문장 → 자연 표현 일괄 치환. 검증 = grep 잔존 0건 + qa:fast PASS.

진입 시작.
```

### 3. Codex 작업 + 검증 (worktree ClaudeCode 세션 영역)

- `codex-multilang-sync.md` §3 매트릭스에 따라 4언어 일괄 치환
- 검증: grep으로 잔존 0건 확인 + `npm run -s qa:fast` PASS
- commit + push

### 4. 사후 통합 (본 spouse-01 main 세션 영역)

- 사용자가 작업 완료 알림 → 본 세션 `git pull --ff-only` 으로 통합
- worktree 정리 안내 (사용자 IDE 창 닫기 → `git worktree remove --force D:/ws-spouse01-clue-rename-cleanup`)
- MEMORY.md index 갱신 (선택)

---

## 본 의뢰서 핵심 권위

1. **변경 영역 = behaviorHint만** (text 필드는 영향 X — 이미 0건 확인)
2. **4언어 동일 위치 동일 패턴** — entry/variant 매트릭스 동일, 각 언어 변경 표현만 다름
3. **단순 일괄 치환 + KO/EN 자연 보정** — 옛 명칭 제거 + 합성 어색 표현 정리
4. **검증 = grep 잔존 0건 + qa:fast RELEASE READY**
