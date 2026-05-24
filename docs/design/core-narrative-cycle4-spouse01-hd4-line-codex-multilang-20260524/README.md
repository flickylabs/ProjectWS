# Cycle 4 — spouse-01 h-d4 line Codex 다국어 sync 의뢰서 폴더

작성일: 2026-05-25
주체: Claude → Codex (외부 AI 도구, 사용자가 폴더 업로드 + prompt paste) → 메인 Claude apply
범위: 51 KO entry × 3 lang (EN / JA / ZH-CN) = **153 entry sync**
KO baseline: main HEAD `66444bc7` (Cycle 4 6단계 적용 commit)

---

## 폴더 구성 (self-contained — 사용자가 폴더 통째 업로드 가능)

| 파일 | 용도 |
|---|---|
| `README.md` | 본 인덱스 + Codex 사용 절차 |
| `codex-multilang-sync.md` | **메인 의뢰서** — 51 entry 풀 list + 다국어 번역 원칙 7 영역 + paste-ready prompt |
| `design_spouse01_truth_disclosure_policy.md` | ★★★ 본 cycle 최대 위험 영역 — h-d4 fire 전 박지연 난임/치료비 단어 surface X |
| `feedback_baseline_anchor_scripted_text.md` | ScriptedText baseline anchor 정책 |
| `feedback_claude_ko_needs_codex_multilang.md` | Claude KO 변경 시 Codex 다국어 sync 권위 |
| `feedback_codex_worktree_safe_directory.md` | Codex worktree safe directory 정책 |
| `feedback_powershell_encoding_utf8.md` | PowerShell UTF-8 인코딩 정책 (Windows) |
| `feedback_family_address_speaker_perspective.md` | B 발화 자기 가족 호칭 자기 시점 |
| `feedback_judge_dispassionate_action_focused.md` | 재판관 평가 어휘 회피 (Cycle 7 도입) |
| `feedback_dossier_card_renamed_to_clue.md` | '단서' 명칭 정책 (dossier → clue 다국어 일관) |
| `feedback_self_reference_speaker_context.md` | 자기지시 정밀 |
| `result/` | Codex 응답 JSON 저장 위치 (`output-cycle4-multilang.json`) |

---

## Codex 사용 절차 (사용자 진행)

1. ChatGPT / OpenAI Codex web Project 에 본 폴더 통째 업로드 (또는 11 파일 개별)
2. 새 thread 시작 → `codex-multilang-sync.md` §7 paste-ready prompt 그대로 사용
3. Codex 응답 JSON 파일 → `result/output-cycle4-multilang.json` 저장
4. 메인 Claude 세션에 "Cycle 4 다국어 응답 도착" 알림

**다음 단계 (메인 Claude 8단계):**
- spouse-01.{en,ja,zh-CN}.json channels.emergence_narrative.entries 에 4 새 key 추가 (id 매핑으로 KO tags 자동 복사)
- tsc + build + qa:fast PASS 검증
- commit + push
- cycle 완료 보고

---

## 본 cycle 핵심 권위 (요약)

1. **51 entry × 3 lang = 153 entry**
2. **신규 영역 4 key**: `emerge-e-8` (13) / `emerge-e-9` (12) / `emerge-dc-8` (13) / `emerge-h-d4` (13)
3. **cascade chain 다국어 일관**: dc-3 (Cycle 2) → e-8 → e-9 → dc-8 → h-d4 — 5 cascade_from_card priorCard entity 다국어 명칭 baseline 보존
4. **진실 노출 정책 (최정점)**: h-d4 4-b b-outburst entry 1개만 박지연 난임/치료비 단어 surface — 나머지 50 entry 모두 surface 절대 X
5. **부부 직접 발화 다국어 신규**: h-d4 4-b/4-c (entry #42, 44, 46) "자기야" 반말 영역 → EN/JA/ZH-CN 친밀체 신규 적용
6. **Batch 7 톤 차용 다국어 보존**: h-d4 4-d (entry #50) 책임 split frame 보존 + `sourceTone:batch7-mediation-h-d4-S4-responsibility-split-v1` tag 그대로

---

## Cycle 1/2/3 정확한 reference

- Cycle 1 (e-5 emergence): 17 KO entry × 3 lang = 51 외국어 entry (적용 완료, baseline)
- Cycle 2 (자금 line 8 emergence): 97 KO entry × 3 lang = 291 외국어 entry (적용 완료)
- Cycle 3 (외도 line 4 emergence): 51 KO entry × 3 lang = 153 외국어 entry (적용 완료)
- **Cycle 4 (h-d4 line 4 emergence): 51 KO entry × 3 lang = 153 외국어 entry (본 batch)**

병렬 진행 중인 사건 (충돌 X — spouse-01.{lang}.json 단일 file 영역):
- `friend-01` Cycle 8 (Line C 아버지 line) 별도 cycle 세션 진행 가능성
- `family-01` 별도 cycle 세션 진행 가능성

본 sync는 `spouse-01.{en,ja,zh-CN}.json` 영역만 변경 → 다른 사건 영역과 ScriptedText file 영역 완전 분리.
