# Codex Thread — family-01 Line B 20년 돈 다국어 sync (Cycle 6)

## Cycle 6 개요

GPT Pro KO 시안 (Cycle 6 Line B 20년 돈 단일 batch) 적용 후, EN/JA/ZH-CN 다국어 sync 작업.

본 cycle은 family-01에 **그룹 2 (정후 돈) surface 진입 첫 cycle**. Cycle 5에서 회피했던 정후 돈 영역이 본 cycle entry text에 surface OK (S2~S4 영역). KO baseline은 main HEAD `40fbecf2` 적용 완료.

### 처리 범위

| 영역 | 영향 |
|---|---|
| **신규 channel sync** | `channels.emergence_narrative` 신규 entries 19 variant × 2 emergence group × 3 lang = **57 외국어 variant** |
| **신규 패턴 — 통합 event** | `emerge-d3-dc3` group은 entry.disputeId + entry.dossierCardId 둘 다 부착 (dispute_dossier_combined 신규 emergence kind) |
| **그룹 2 surface 영역 다국어 보존** | KO surface 표현 ("어머니 통장을 거친 윤정후 측 자금" 등)을 다국어에서 그룹 2 hidden 영역 (3억원/20년 비밀/공장 양보 등) 회피하면서 자연 번역 |

### 처리 emergence 2개 (Line B 20년 돈)

| # | 영역 | id | 자연 명칭 | KO trigger × variants |
|---|---|---|---|---|
| 1 | 쟁점+단서 통합 | `d-3` + `dc-3` | **오래된 지원의 출처** + **20년의 돈** (한 event 동시 surface) | 5 trigger × 12 variants |
| 2 | 증인 | `w-3` | **박순애** (어머니의 오랜 지인) | 3 trigger × 7 variants |
| **합계** | | | | **8 trigger × 19 variants** |

### 단일 thread 처리 권장

본 cycle은 19 entry × 3 lang = 57 외국어 variant — 단일 thread 처리 OK. 1 branch.

## 신규 정책 (Cycle 6 도입, 본 sync에 적용)

### 1. 통합 event 패턴 (dispute + dossier 한 자리 동시 surface)

본 cycle 신규 — 사용자 결정 (2026-05-24): d-3 "오래된 지원의 출처" + dc-3 "20년의 돈"이 **내용 동일** (둘 다 윤정후 돈 + 어머니 통장 경유) → narrative event 통합.

- KO entry id 영역: `emerge-d3-dc3-via-...` prefix (12 entry)
- entry text: "별도 쟁점으로 분리하고, 단서 [20년의 돈]을 본 법정에 등록합니다" 형식 (한 entry에서 두 layer 동시 surface)
- entry tag 영역: `emergence:d-3+dc-3` + `emergenceType:dispute_dossier_combined` (Cycle 5 normalize 영역 따라 제거됨 — KO baseline 확인) + `disputeId:d-3` + `dossierCardId:dc-3` + `linkedParty:b`

본 패턴은 dispute와 dossier card의 *내용*이 같은 영역에 적용. spouse-01 / friend-01에서는 dispute-dossier 분리가 자연했으므로 본 패턴 사용 X. family-01 d-3/dc-3 영역에 특수.

### 2. 그룹 2 (정후 돈) surface 진입 (본 cycle 핵심)

`design_family01_truth_disclosure_policy.md` 그룹 2 영역 — 본 cycle entry text가 그룹 2 S2~S4 영역 surface 시작점.

**surface OK** (다국어 보존):
- 윤정후 측에서 보낸 자금 / 어머니 통장을 거친 자금 / 어머니 명의 자금의 상당수가 윤정후 측 자금

**surface 절대 X** (다국어 모두 회피):
- 3억원 / 20년 비밀 지원 / 월 단위 정기 지원금 (그룹 2 hidden, S5만 OK — 본 cycle 영역 X)
- 공장 양보 / 친자가 양보 / 형 자존심 (그룹 4 — d-4 영역, 본 cycle 절대 X)
- 출생 비밀 / 친자 / 배다른 / 아버지 피 (그룹 1 — d-4 영역, 본 cycle 절대 X)
- 자필 90:10 / 공증 60:40 정확 수치 (그룹 3 — d-5 S5만, 본 cycle 절대 X)

### 3. 미스터리 dynamics 정책 (본 cycle 핵심 정책)

본 cycle entry는 다음 3 dynamics 일관 유지 — 다국어에서도 동일 효과 보존 필수:

| 차원 | KO 영역 | 다국어 보존 핵심 |
|---|---|---|
| **B "어머니 뜻" frame** (회피 동기 미스터리화) | "어머니께서 저를 통해 보내신 일입니다" / "어머니가 그렇게 하라 하셨다" | 어머니 주체화 + 본인 동기 표현 회피. *진짜 어머니 뜻인가, 정후가 어머니 뜻으로 책임 전가하는가?* 미스터리 유지 |
| **A 의심 frame** (자존심 frame 자기방어) | "정후 이놈이 어머니한테 무슨 짓 한 거 아니야? 어머니 명의를 앞세워 자기 돈으로 나를 묶어둔 거잖아!" | 부정→충격→의심 3단계. 단순 분노 X. 동생 직접 호명 시 반말 (영어 = 동생 first name 직호 + emphatic, 일본어 = 弟 first name + 「お前」, 중국어 = 弟弟 + 직호) |
| **재판관 "동기는 별도 영역으로" 명시** | 모든 decree에 "흐름의 동기는 별도 영역으로 둡니다" 일관 명시 (d-4 hook) | 다국어 동일 dynamics — *separate domain* / *別の領域* / *另立议题* 같은 명확 분리 표현 |

### 4. cascade priorCard 영역 (dc-2 / dc-3 reference)

본 cycle cascade 사용:
- d-3 cascade (priorCard:dc-2 — Cycle 5 마지막 단서를 cascade source로 사용)
- w-3 cascade (priorCard:dc-3 — 본 cycle 자체 등록 단서)

다국어 번역 시:
- `priorCard:dc-2` / `priorCard:dc-3` tag → 그대로 (번역 X)
- text 본문의 단서 reference는 일관 번역:
  - `[수정된 유언장]` (Cycle 5에서 다국어 baseline 적용 완료 — 재사용)
  - `[20년의 돈]` (본 cycle 신규 — 다국어 lookup table 참조)

### 5. e-6 surfaceName 일관 사용

`e-6` evidence는 **lockedName "오래된 계좌 흐름" 절대 X** / **surfaceName "오래된 송금 내역 묶음" 일관 사용** (KO 영역 적용 완료). 다국어도 동일:

| Lang | lockedName (entry text 금지) | surfaceName (entry text 사용) |
|---|---|---|
| KO | 오래된 계좌 흐름 | **오래된 송금 내역 묶음** |
| EN | Old account flow (또는 baseline 직접 확인) | **Old transfer records bundle** (baseline 직접 확인) |
| JA | (baseline 직접 확인) | (baseline 직접 확인) |
| ZH-CN | (baseline 직접 확인) | (baseline 직접 확인) |

→ baseline 직접 확인 = `git show main:src/data/coreCases/family-01.case.ts` 영역에서 e-6 surfaceName 영역 lookup.

## Codex 사용 절차

1. worktree spawn (`git worktree add -b codex/family01-cycle6-multilang ../ws-family01-cycle6-multilang main`)
2. `safe.directory` 추가: `git config --global --add safe.directory <worktree path>`
3. 본 폴더 파일 worktree에 복사 (또는 참조)
4. `codex-multilang-sync.md` §3~6 절차대로 진행
5. branch push 후 메인 Claude 세션에 보고

## 메인 session 후속 (Codex push 도착 시)

1. `git fetch origin`
2. `git log origin/codex/family01-cycle6-multilang` 확인
3. fast-forward merge 또는 cherry-pick
4. tsc + build + qa:fast PASS 검증
5. Cycle 6 완료 보고 + Cycle 7 (family-01 Line C 비밀+최종) 안내

## 폴더 파일

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 57 외국어 variant + 통합 event 패턴 + 그룹 2 surface 영역 + 미스터리 dynamics 다국어 보존 |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 단서 명칭 ('단서 [20년의 돈]' 다국어) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 사실/행위 중심 (호출 동사 다양화) |
| 8 | [design_family01_truth_disclosure_policy.md](design_family01_truth_disclosure_policy.md) | family-01 진실 노출 정책 (그룹 2 영역 — 본 cycle 진입) |
| 9 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger 정책 (priorCard reference 다국어 보존) |

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
