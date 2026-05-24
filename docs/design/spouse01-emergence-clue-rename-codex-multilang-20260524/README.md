# spouse-01 emergence_narrative '사건 카드 → 단서' 다국어 일괄 변경 (Codex/ChatGPT)

## 폴더 목적

family-01 cycle 5 결정 정책 ([feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md))의 spouse-01 외국어 영역 일괄 적용.

KO는 main HEAD `cb770125` 시점에 일괄 변경 완료. 본 의뢰서는 그에 따른 **EN/JA/ZH-CN sync** — 16 string × 3 lang = **48 string 영역** 일괄 교체 + 자연 보정.

## 폴더 파일 (총 5개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-clue-rename.md](codex-multilang-clue-rename.md) | **주 의뢰서** — 48 string 정확 영역 + 다국어 사전 + paste prompt |
| 2 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 명칭 변경 정책 권위 (family-01 cycle 5 결정) |
| 3 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 4 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |

## 사용자 진행 방법

ChatGPT/Codex web Project에 위 5개 파일 모두 업로드 → 의뢰서 §4 paste-ready prompt 그대로 paste → JSON 응답 다운로드 → `result/output-spouse01-clue-rename.json` 저장 → 메인 Claude 세션에 알림.

본 영역은 단순 명칭 교체이므로 응답 시간 짧음.
