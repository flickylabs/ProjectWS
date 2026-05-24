# Codex Thread — family-01 Line C 비밀+최종 다국어 sync (Cycle 7)

## Cycle 7 개요

GPT Pro KO 시안 (Cycle 7 Line C 비밀+최종, 3 batch) 적용 후, EN/JA/ZH-CN 다국어 sync 작업.

본 cycle은 family-01에 **그룹 1 (출생 비밀) + 그룹 4 (친자 양보) + 그룹 5 (보호 명분) surface 진입 첫 cycle**. Cycle 6에서 회피했던 정체성·관계 영역이 본 cycle entry text에 surface OK. **그룹 3 (자필 90:10 정확 수치) 절대 X** (가장 엄격 봉인). 친부 실명 영구 봉인. KO baseline은 main HEAD `c7534184` 적용 완료.

### 처리 범위

| 영역 | 영향 |
|---|---|
| **신규 channel sync** | `channels.emergence_narrative` 신규 entries 61 variant × 6 emergence group × 3 lang = **183 외국어 variant** |
| **신규 패턴 — cascade 다중 priorCard** | d-5에 cascade priorCard:dc-4 메인 + priorCard:e-7 차선 (두 cascade candidate, 별도 entry id `-cascade-e7-` 영역 구분) |
| **신규 패턴 — combo 다중 recipe** | dc-4에 combo combine-4 + combo combine-7 두 candidate, 동일 scriptedRefs 공유 (단 ScriptedText 영역에선 하나의 entry pair만 존재, narrative.ts 영역에서만 두 candidate 분리) |
| **그룹 1/4/5 surface 영역 다국어 보존** | KO surface 표현 ("본인이 친자임을 알고도 형의 자리를 흔들지 않으려 한 결정" / "어머니 뜻을 본인이 다른 방향으로 다듬었습니다" 등)을 다국어에서 그룹 3 (정확 수치) + 친부 실명 회피하면서 자연 번역 |
| **그룹 3 봉인 다국어 회귀 검출** | 자필 90:10 / 공증 60:40 정확 수치는 모든 외국어에 절대 등장 X (Codex self-check 정밀) |

### 처리 emergence 6개 (Line C 비밀+최종) — 3 batch 통합

| Batch | # | 영역 | id | 자연 명칭 | KO trigger × variants |
|---|---|---|---|---|---|
| 1 | 1 | 쟁점 | `d-4` | **가족 기록과 침묵의 이유** | 5 × 12 |
| 1 | 2 | 증거 | `e-7` | **오래된 노트 사본** (lockedName=어머니 일기장) | 4 × 10 |
| 2 | 3 | 단서 | `dc-4` | **감춘 이유** | 5 × 9 |
| 2 | 4 | 쟁점 | `d-5` | **어머니의 숨겨진 마음** | 5 × 12 |
| 3 | 5 | 증거 | `e-5` | **자필 메모 사본** (lockedName=어머니 자필 유언장 연습본) | 4 × 9 |
| 3 | 6 | 단서 | `dc-5` | **어머니의 뜻** (최종 단서) | 4 × 9 |
| **합계** | | | | | **27 × 61** |

### 단일 thread 처리 권장

본 cycle은 61 entry × 3 lang = 183 외국어 variant. Cycle 6 (57 variant) 보다 약 3.2배 큼. 단 단일 thread 처리 OK (단일 emergence_narrative channel append 영역). 1 branch.

## 신규 정책 (Cycle 7 도입, 본 sync에 적용)

### 1. 다중 cascade 패턴 (d-5 priorCard 두 candidate 분리)

본 cycle 신규 — d-5 emergence는 두 cascade source 모두 자연:
- d-5 cascade priorCard:dc-4 (Batch 2 메인 — dc-4 → d-5 dispute upgrade chain)
- d-5 cascade priorCard:e-7 (Batch 2 차선 — e-7 context+ 도달 후 양측 책임 영역 자연 연속)

KO entry id 영역:
- 메인: `emerge-d5-via-cascade-judge-decree-v1` / `emerge-d5-via-cascade-b-respond-v1` (priorCard:dc-4 tag)
- 차선: `emerge-d5-via-cascade-e7-judge-decree-v1` / `emerge-d5-via-cascade-e7-b-respond-v1` (priorCard:e-7 tag)

다국어 보존:
- 두 entry pair의 text 모두 자연 cascade reference 유지
- priorCard tag 영역은 그대로 (번역 X)
- text 본문의 reference (단서 [감춘 이유] / 오래된 노트 사본)는 lookup table 일관

### 2. 다중 recipe 패턴 (dc-4 combo 두 candidate)

dc-4 emergence는 두 recipe candidate 모두 자연:
- combo combine-4 (e-6 + e-7)
- combo combine-7 (e-5 + e-7)

KO ScriptedText 영역에는 단일 entry pair (`emerge-dc4-via-combo-judge-decree-v1` / `emerge-dc4-via-combo-b-respond-v1`) — recipeId:combine-4 tag만 부착. narrative.ts 영역에서 두 candidate (`dc4-via-combo-4` + `dc4-via-combo-7`) 분리, 동일 scriptedRefs 공유.

다국어 보존:
- ScriptedText 영역에는 단일 entry pair만 — 다국어도 동일 구조
- recipeId tag 영역은 KO normalize 영역 그대로 (`recipeId:combine-4` 단일)

### 3. 그룹 1/4/5 surface 진입 (본 cycle 핵심)

`design_family01_truth_disclosure_policy.md` 그룹 1/4/5 영역 — 본 cycle entry text가 surface 시작점.

**surface OK** (다국어 보존):
- 그룹 1 출생 비밀:
  - Batch 1 hook: "어머니가 두 아들을 똑같이 보셨다" / "어머니의 평등 마음"
  - Batch 2 dc-4: "본인이 친자임을 알고도 형의 자리를 흔들지 않으려 한 결정" (B 첫 명시)
- 그룹 4 친자 양보:
  - Batch 2 dc-4: "가업의 자리를 형에게 두는 결정"
- 그룹 5 보호 명분:
  - Batch 2 d-5: "어머니 뜻을 본인이 다른 방향으로 다듬었습니다" / "형을 흔들지 않으려 한 본인의 선택" / "어머니 뜻을 있는 그대로 두지 못한 책임은 본인에게 있습니다"
  - Batch 3 dc-5: "두 형제 모두 어머니 뜻을 있는 그대로 두지 못한 영역"

**surface 절대 X** (다국어 모두 회피):
- 그룹 3 자필 90:10 / 공증 60:40 정확 수치 — **본 cycle 가장 엄격 정책** (Batch 3 e-5 surface는 OK 단 수치 표현 절대 X)
- "비율을 줄였다" / "축소했다" 같은 수치 방향 단정 표현 X (단 "다른 방향으로 다듬은" 모호 표현 OK)
- 친부 실명 — 영구 봉인 (모든 entry 절대 X)
- 친부 / 친자가 아니다 직접 표현 — Batch 2 dc-4 "본인이 친자임을 알고도" 영역만 OK, 다른 곳에서 직접 X

### 4. 미스터리 dynamics 정책 (본 cycle 핵심 정책)

본 cycle entry는 다음 3 dynamics 일관 유지 — 다국어에서도 동일 효과 보존 필수:

| 차원 | KO 영역 | 다국어 보존 핵심 |
|---|---|---|
| **B "어머니 뜻 + 보호 명분" frame 첫 깨짐** | "본인이 친자라는 사실을 알고 있었습니다" (dc-4) / "어머니가 남기신 비중을 본인이 다른 방향으로 다듬었습니다" (d-5) | **B "본인" 주체화 첫 사용** — Cycle 6의 "어머니께서 ...하셨다" 회피 frame → "본인이 ...했다" 결정 주체화. 다국어에서 동일 grammar 변화 보존 (EN: I → I (강조) / JA: 母が → 自分が / ZH-CN: 母亲 → 我) |
| **A "장남 당연시 frame" 첫 흔들림 → 책임 인식** | "어머니가 동생을 더 보셨을 수도 있다는 말, 처음 들었어" (d-5 interject) → "본인이 그 영역을 똑바로 보지 못했습니다" (dc-5 outburst) | A "본인" 주체화 첫 발화 (dc-5 outburst) — B의 거울 영역. 다국어에서 책임 인식 톤 보존 |
| **재판관 "가족 영역 vs 책임 구조 영역 분리" + "정확한 비율 영역 봉인"** | 모든 decree에 "본 영역의 책임 구조 영역은 별도로 둡니다" (Batch 1/2) + "정확한 비율 영역은 단계별로만 공개합니다" (Batch 2/3) 일관 명시 | 다국어 동일 dynamics — separate domain / 別領域 / 另立议题 + 자연어 봉인 명시 (시스템 정책 직접 X) |

### 5. cascade priorCard 영역 (dc-3 / d-4 / dc-4 / e-7 / d-5 reference)

본 cycle cascade 사용:
- d-4 cascade (priorCard:dc-3 — Cycle 6 마지막 단서를 cascade source로 사용)
- e-7 cascade (priorCard:d-4 — 본 cycle 자체 등록 쟁점)
- dc-4 cascade (priorCard:d-4 — 본 cycle 자체 쟁점)
- d-5 cascade (priorCard:dc-4 메인 / priorCard:e-7 차선)
- e-5 cascade (priorCard:dc-4 — 본 cycle 단서 → 자료 cascade)
- dc-5 cascade (priorCard:d-5 — 본 cycle 쟁점 → 단서 종합)

다국어 번역 시:
- `priorCard:X` tag → 그대로 (번역 X)
- text 본문의 단서/쟁점 reference는 일관 번역:
  - `[20년의 돈]` (Cycle 6에서 다국어 baseline 적용 완료 — 재사용)
  - `[감춘 이유]` (본 cycle 신규 — dc-4 label)
  - `[어머니의 뜻]` (본 cycle 신규 — dc-5 label)

### 6. e-7 / e-5 surfaceName 일관 사용

본 cycle 핵심 P0 위험 영역. lockedName entry text 등장 절대 X.

| Evidence | lockedName (entry text 금지) | surfaceName (entry text 사용 OK) |
|---|---|---|
| e-7 | 어머니 일기장 | **오래된 노트 사본** |
| e-5 | 어머니 자필 유언장 연습본 | **자필 메모 사본** |
| e-6 | 오래된 계좌 흐름 | 오래된 송금 내역 묶음 (Cycle 6에서 적용 완료) |

다국어 baseline 직접 확인:
```
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'e-5'"'"'/,/id: '"'"'e-6'"'"'/p'
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'e-7'"'"'/,/witnesses:/p'
```

case.ts는 KO 영역만 — 외국어 baseline은 case.ts에서 KO 영역만, 외국어 surfaceName 영역은 cycle 5/6 다국어 sync 영역에서 결정된 표현 영역.

## Codex 사용 절차

1. worktree spawn (`git worktree add -b codex/family01-cycle7-multilang ../ws-family01-cycle7-multilang main`)
2. `safe.directory` 추가: `git config --global --add safe.directory <worktree path>`
3. 본 폴더 파일 worktree에 복사 (또는 참조)
4. `codex-multilang-sync.md` §3~6 절차대로 진행
5. branch push 후 메인 Claude 세션에 보고

## 메인 session 후속 (Codex push 도착 시)

1. `git fetch origin`
2. `git log origin/codex/family01-cycle7-multilang` 확인
3. fast-forward merge 또는 cherry-pick
4. tsc + build + qa:fast PASS 검증
5. Cycle 7 완료 보고 + Cycle 8 (friend-01 잔여 line 또는 다른 사건) 안내

## 폴더 파일

| # | 파일 | 역할 |
|---|---|---|
| 1 | [codex-multilang-sync.md](codex-multilang-sync.md) | **주 의뢰서** — 183 외국어 variant + 다중 cascade/recipe 패턴 + 그룹 1/4/5 surface 영역 + 그룹 3 봉인 정밀 검증 + 미스터리 dynamics 다국어 보존 |
| 2 | [feedback_claude_ko_needs_codex_multilang.md](feedback_claude_ko_needs_codex_multilang.md) | KO 변경 시 다국어 sync 표준 |
| 3 | [feedback_baseline_anchor_scripted_text.md](feedback_baseline_anchor_scripted_text.md) | ScriptedText baseline 권위 |
| 4 | [feedback_codex_worktree_safe_directory.md](feedback_codex_worktree_safe_directory.md) | Codex worktree 진입 정책 |
| 5 | [feedback_powershell_encoding_utf8.md](feedback_powershell_encoding_utf8.md) | UTF-8 인코딩 주의 |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 단서 명칭 ('단서 [감춘 이유]' / '단서 [어머니의 뜻]' 다국어) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 사실/행위 중심 (호출 동사 다양화) |
| 8 | [design_family01_truth_disclosure_policy.md](design_family01_truth_disclosure_policy.md) | family-01 진실 노출 정책 (그룹 1/3/4/5 영역 — 본 cycle 본격 진입, 그룹 3 가장 엄격 봉인) |
| 9 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger 정책 (priorCard reference 다국어 보존, 다중 cascade 영역 — d-5 신규) |

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
