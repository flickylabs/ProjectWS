# Codex Thread — friend-01 Cycle 7 Batch 2 (dc-2 먼저 넘은 선 + e-4) 다국어 sync

작성일: 2026-05-24 (skeleton — entry table은 5단계 검토 후 fill-in)
범위: dc-2 (13 variants) + e-4 (12 variants) = 25 variants × 3 lang = **75 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-cycle7-batch2-multilang ../ws-friend01-cycle7-batch2-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| PowerShell 회피 | Write/Edit tool로만 변경 |
| 산출 | branch `codex/friend01-cycle7-batch2-multilang` push |

---

## §1. 작업 배경

Cycle 7 Line B (예비신랑 선 넘기 reframe) 핵심 batch.

- Brief: `docs/design/core-narrative-cycle7-friend01-lineAB-20260524/batch2-dc2-e4/`

### Batch 2 처리 emergence

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 단서 (dossier) | `dc-2` | 먼저 넘은 선 | 4 (combo / cascade:dc-1 / npc / fallback) | 13 |
| 증거 | `e-4` | 예비신랑의 선 넘는 메시지와 최수민의 거절 답장 | 4 (combo / cascade:dc-1 / outburst / fallback) | 12 |

### 본 batch cascade 영역

- dc-2 cascade: `priorCard:dc-1` (이전 단서 reference)
- e-4 cascade: `priorCard:dc-1` (이전 단서 reference)

다국어 번역 시 priorCard reference text "앞서 [단톡방 글의 근거]가 등재됐습니다" 같은 표현이 새 label로 자연 일관.

---

## §2. KO baseline (main HEAD)

⚠ **5단계 검토 후 fill-in 영역**.

### 영향 파일

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative
```

### 25 entry 구조 (skeleton — 6단계 KO apply 후 fill-in)

| Trigger | # | ID 예상 | speaker→listener | 핵심 KO (fill-in 대기) |
|---|---|---|---|---|
| **dc-2** combination_result | 1~4 | emerge-dc2-via-combo-* | 판사·A·B | combine-2 후 선후관계 확인 |
| **dc-2** cascade_from_card (priorCard:dc-1) | 5~7 | emerge-dc2-via-cascade-* | 판사·B | 앞서 [단톡방 글의 근거] 등재 후 사실관계 확인 |
| **dc-2** npc_interjection | 8~10 | emerge-dc2-via-npc-* | A·B·판사 | "그게 아니라 그쪽이 먼저..." catch |
| **dc-2** judge_auto_mention | 11~13 | emerge-dc2-via-fallback-* | 판사·B | N턴 stall 후 자발 |
| **e-4** combination_result | 14~16 | emerge-e4-via-combo-* | 판사·B·A | dc-2 combine 직전 e-4 자료실 등재 |
| **e-4** cascade_from_card (priorCard:dc-1) | 17~19 | emerge-e4-via-cascade-* | 판사·B | 앞서 [단톡방 글의 근거] 등재 후 자료 요청 |
| **e-4** emotional_outburst | 20~22 | emerge-e4-via-outburst-* | B·판사 | "내가 아니야. 그 사람이 먼저 보낸거야." 흘림 catch |
| **e-4** judge_auto_mention | 23~25 | emerge-e4-via-fallback-* | 판사·B | N턴 stall 후 자발 자료 요청 |

⚠ 위 ID 예상. GPT Pro 실제 응답 + 5단계 검토 후 확정.

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역 + 파티 NPC 영역

(Batch 1 §3.1, §3.2 동일 — friend-01 캐릭터 voice/호칭 일관)

### 3.2. **재판관 어법 (Cycle 7 신규 정책)**

(Batch 1 §3.3 동일) — 감정·가치 판단 회피, 사실·행위 중심.

dossier label "[먼저 넘은 선]" 인용은 OK (label은 시스템 정의), 단 재판관이 "선을 넘었다"고 평가 발화 X. "먼저 보낸 메시지" / "먼저 연락한 정황" 같은 사실 표현.

### 3.3. cascade `priorCard:dc-1` 다국어 보존

cascade entry (dc-2 5~7, e-4 17~19)의 text 본문 "앞서 [단톡방 글의 근거]가 등재됐습니다" 같은 reference:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[단톡방 글의 근거]` | `[Grounds for the Group Chat Post]` | `[グループチャット投稿の根拠]` | `[群聊帖子的依据]` |

⚠ Batch 1에서 dc-1 label 다국어 baseline 확정. 본 batch는 Batch 1의 다국어 label과 정확히 일관 사용.

### 3.4. dossier label "먼저 넘은 선" 다국어 baseline

기존 friend-01.{en,ja,zh-CN}.json dossierCards 영역의 dc-2 label 확인:
- 기존 KO: "먼저 넘은 선" (변경 X)
- 다국어: 기존 다국어 label 그대로 유지 (변경 X, dc-1만 변경)

### 3.5. 진실 노출 정책

`design_friend01_truth_disclosure_policy`:

- 본 batch 영역 surface OK:
  - "예비신랑이 먼저" / "선 넘는 메시지" / "최수민의 거절" — **dc-2 부상 시점부터 OK** (본 batch가 dc-2 영역)
- 본 batch 영역 절대 X:
  - "아버지 사기" / "투자 명목 사기" / "미상환" (Line C / Cycle 8 영역)

### 3.6. dynamics 차별성 보존

- combination_result: 사용자 액션 결과 → 판사 발견적
- cascade_from_card: 이전 [단톡방 글의 근거] reference → 판사 정리적
- npc_interjection: B 침묵 깨고 짧은 정보 흘림 → catch
- emotional_outburst (e-4 영역만): B archetype affect_flattening — 격앙도 단정형 짧고 평평
- judge_auto_mention: N턴 fallback → 판사 결정·진행적

### 3.7. "사건 카드" → "단서" 명칭

(Batch 1 §3.8 동일)

---

## §4~§6. 작업 단계 / 검증 / 산출

(Batch 1 §4~§6 동일 — friend-01.{en,ja,zh-CN}.json emergence_narrative channel 영역만)

```
git add src/data/scriptedText/friend-01.en.json \
        src/data/scriptedText/friend-01.ja.json \
        src/data/scriptedText/friend-01.zh-CN.json
git commit -m "i18n(friend-01): sync Cycle 7 Batch 2 — dc-2 + e-4 emergence narrative (25 variants × 3 lang)"
git push -u origin codex/friend01-cycle7-batch2-multilang
```

---

## §7. 자매 batch

| Batch | branch | entry | 의존성 |
|---|---|---|---|
| 1 (dc-1) | `codex/friend01-cycle7-batch1-multilang` | 13 + dc-1 label 변경 | priorCard reference 다국어 baseline 영역에서 정합 필요 |
| 2 (본) | `codex/friend01-cycle7-batch2-multilang` | 25 | priorCard:dc-1 reference 영역에서 Batch 1과 label 정합 |
| 3 (w-1) | `codex/friend01-cycle7-batch3-multilang` | 13 | priorCard:dc-1 정합 |
| 4 (w-2) | `codex/friend01-cycle7-batch4-multilang` | 13 | priorCard:dc-2 정합 (dc-2 label 변경 X, 기존 다국어 그대로) |

4 batch ScriptedText entry id 영역 겹침 X → 병렬 worktree 안전.
