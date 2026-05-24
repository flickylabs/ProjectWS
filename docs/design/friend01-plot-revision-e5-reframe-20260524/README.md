# friend-01 e-5 reframe — plot revision 의뢰서 (CT 세션용)

**작성일**: 2026-05-24
**작성 cycle**: friend-01-cycle-8 (narrative wrapper cycle) — 진행 중 plot revision 필요 발견하여 CT 위임
**작업 영역**: **CT 세션** — case content 본질 재설계 (narrative wrapper Cycle 8b 영역 아님)
**HEAD 시점**: `731073a6` (friend-01-cycle-8 branch — Cycle 7 통합 완료 상태)
**대상 사건**: friend-01 "손절한 절친"
**핵심 reframe**: e-5 자료 자체 교체 (예비신랑이 회사 단톡에서 떠벌린 흔적 + 최수민의 9일간 차단 연락) + 영향 영역(d-3/w-2/dc-3/combine-3) 정합 reword

---

## 본 의뢰서 진행 흐름

1. 본 폴더를 CT 세션에 자료 전달 (Claude Code CT 세션 진입 후 본 README 경로 참조)
2. CT 세션이 `02~04` Authority 변경 spec 적용
3. CT 세션이 `05` ScriptedText 영역 grep + reword 진행
4. CT 세션이 `npm run build` + `npm run -s qa:fast` 검증
5. CT 완료 시 main branch 통합
6. 새 Cycle 세션 (Cycle 8b — narrative wrapper) 진입 시 본 폴더 `06` handover 참조

### CT 세션 진입 한 줄 (template)

```
friend-01 e-5 reframe plot revision 진행. docs/design/friend01-plot-revision-e5-reframe-20260524/ 폴더 self-contained brief. 진행 순서:
1. 본 폴더 README + 01~06 정독 + 07-policies 권위 메모리 정독
2. Authority 변경 적용 (02~04 spec)
3. ScriptedText 영향 영역 reword (05 가이드)
4. tsc + build + qa:fast 검증
5. KO 적용 commit + 다국어 sync 영역 식별
6. main 통합 + 새 Cycle 세션 (8b narrative wrapper) 안내
```

---

## 본 의뢰서 작업 영역

### Authority 변경 (5 영역)

| # | 영역 | 변경 본질 | spec |
|---|---|---|---|
| 1 | `e-5` 전체 재구성 | 자료 자체 교체: 아버지가 보낸 직접 문자 → 예비신랑이 회사 단톡에서 떠벌린 흔적 + 최수민 9일간 차단 메시지 | `02-authority-e5-spec.md` |
| 2 | `d-3` truthDescription + truthStages.b + verdictOptions | "꺼내고 있었" → "시도하려 하고 있었", "경고하려" → "직접 연락해 막으려" 정합 reword | `03-authority-d3-spec.md` |
| 3 | `w-2` testimony.byDispute['d-3'] 신규 + unlockedByDossier ['dc-2'→'dc-2','dc-3'] + relatedDisputes ['d-2'→'d-2','d-3'] | w-2가 d-3 영역에서도 호출 가능, 떠벌림 chain 증언 | `04-authority-w2-dc3-combine3-spec.md` |
| 4 | `dc-3` description / noteText / successEffects[0] / challenges.b.q1 lockedHint | e-5 reframe과 정합 reword | `04-authority-w2-dc3-combine3-spec.md` |
| 5 | `combine-3` discoveryText / surfaceFallback | e-5 reframe과 정합 reword | `04-authority-w2-dc3-combine3-spec.md` |

### ScriptedText 변경 (5 channel × KO + 다국어)

| Channel | 영향 영역 | 추정 entry 수 (KO) |
|---|---|---|
| `interrogation` | a/b × d-3 × S0~S5 × 3 question type | ~36 |
| `evidence_present` | a/b × e-5 × lieBand × stage | ~28 |
| `dossier` | dc-3 영역 (label은 그대로, noteText 등) | ~6 |
| `judge_evidence_combo` | combine-3 영역 | ~6 |
| `judge_question` / `judge_contradiction` / `mediation` / `aftermath` | d-3 surface area | ~12 |
| **합계** | | **~88 KO entry** |

다국어 (EN/JA/ZH-CN) 같은 영역 sync 필요 → **약 264 외국어 entry**. Codex 다국어 sync는 KO 변경 commit 후 별도 worktree 진행.

---

## 영역 외 (본 의뢰서 작성 X — Cycle 8b narrative wrapper 영역)

- ❌ `friend-01.narrative.ts`의 e-5/dc-3/d-3/e-6/dc-4/d-4/w-3 narrativeTriggers 신규 추가 — **Cycle 8b 영역**
- ❌ `emergence_narrative` 채널 entry 신규 작성 — **Cycle 8b 영역**
- ❌ Line C 7 emergence × 4 trigger 시안 — **Cycle 8b 영역**

본 plot revision은 Cycle 8b 진입 전 사전 정합 완료 영역. Cycle 8b 진입 시 본 reframe 결과를 baseline으로 narrative wrapper 작업.

---

## 폴더 구조

```
friend01-plot-revision-e5-reframe-20260524/
├── README.md (본 파일 — index)
├── 01-context-and-reframe-rationale.md (사건 context + e-5 reframe 결정 사용자 권위)
├── 02-authority-e5-spec.md (e-5 전체 재구성 spec — field별 before/after)
├── 03-authority-d3-spec.md (d-3 truthDescription/verdictOptions/truthStages reword)
├── 04-authority-w2-dc3-combine3-spec.md (영향 영역 spec)
├── 05-scriptedtext-affected-areas.md (grep 명령 + reword 가이드라인)
├── 06-character-frame-and-cycle-8b-handover.md (B character 재설계 + Cycle 8b 안내)
└── 07-policies/ (정책 메모리 사본 — self-contained)
    ├── design-friend01-truth-disclosure-policy.md
    ├── feedback-session-separation-cycle-vs-ct.md
    ├── feedback-judge-dispassionate-action-focused.md
    ├── feedback-dossier-card-renamed-to-clue.md
    ├── feedback-family-address-speaker-perspective.md
    ├── feedback-natural-korean-npc-active-voice.md
    └── feedback-truth-leak-prohibition.md
```

---

## 권위 정책 (정독 필수)

- [`07-policies/design-friend01-truth-disclosure-policy.md`](07-policies/design-friend01-truth-disclosure-policy.md) — 진실 노출 정책 (그룹 2/3/4 영역, e-5 reframe 후에도 유효)
- [`07-policies/feedback-session-separation-cycle-vs-ct.md`](07-policies/feedback-session-separation-cycle-vs-ct.md) — Cycle/CT 분리 권위 (본 의뢰서 자체의 정당성)
- [`07-policies/feedback-judge-dispassionate-action-focused.md`](07-policies/feedback-judge-dispassionate-action-focused.md) — 재판관 어법 + dossier label frame
- [`07-policies/feedback-dossier-card-renamed-to-clue.md`](07-policies/feedback-dossier-card-renamed-to-clue.md) — "단서" 명칭
- [`07-policies/feedback-family-address-speaker-perspective.md`](07-policies/feedback-family-address-speaker-perspective.md) — 본인 가족 호칭 자기 시점
- [`07-policies/feedback-natural-korean-npc-active-voice.md`](07-policies/feedback-natural-korean-npc-active-voice.md) — NPC 적극 발화 (B character 정합 영역)
- [`07-policies/feedback-truth-leak-prohibition.md`](07-policies/feedback-truth-leak-prohibition.md) — 진실 누설 금지 (e-5 reframe 후 그룹 2 keyword 정합)

---

## 사용자 결정 영역 요약 (Cycle 8 cycle 세션에서 확정)

| 결정 | 답 | 영역 |
|---|---|---|
| Batch 분할 | 2 batch (Cycle 8b 적용) | Line C 처리 단위 |
| dc-3 label | "같은 부탁" (현 유지) | dc-3 |
| dc-4 label | "손절의 이유" (신규) | dc-4 (Cycle 8b 적용 영역) |
| e-5 reframe 범위 | R-C 완전 재구성 | e-5 |
| Cycle scope | 옵션 2 (plot revision만, narrative wrapper는 Cycle 8b) | 본 의뢰서 정당성 |
| e-5 새 자료 시안 | S1 (예비신랑 회사 단톡 떠벌림 + B 9일간 차단 연락) | e-5 |
| w-2 unlockedByDossier 확장 | 확장 (['dc-2', 'dc-3']) | w-2 |
| e-5 sensitiveSealTargets 신규 | 시안대로 추가 ('회사 동료 실명', '최수민 메시지 사적 톤') | e-5 |
| B character trigger 방향 | B 격앙 가능 but 자제 톤 (다 떠벌리지 X) | Cycle 8b 영역 |
| plot revision 진행 영역 | CT 세션 위임 | 본 의뢰서 자체 |

---

## Cycle 8b (narrative wrapper) 진입 안내

본 plot revision CT 완료 + main 통합 후 새 Cycle 세션 진입.

Cycle 8b 영역:
- Line C 7 emergence × 4 trigger (e-5 / dc-3 / d-3 / e-6 / dc-4 / d-4 / w-3)
- B character 재반영 (affect_flattening 자제 톤, 격앙 가능하나 다 떠벌리지 X)
- A trigger 영역 확대 (부정 외침 catch, 단정 frame 흔들림)
- cascade 매개 (B 능동 자발 X, 판사 silence-catch + cascade 위주)
- dc-4 label "손절의 이유"로 변경 (Cycle 8b 영역 작업)
- e-7은 Cycle 9 (Line D 종합)로 분리

상세는 `06-character-frame-and-cycle-8b-handover.md` 참조.
