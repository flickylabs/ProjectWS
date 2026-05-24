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

## §2. KO baseline (main HEAD `f2e9a529`, Cycle 7 6단계 commit 완료)

### 영향 파일

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative
  - emerge-dc-2 key (13 variants)
  - emerge-e-4 key (12 variants)
```

### 25 entry 구조 (확정)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **dc-2** combination_result | 1 | emerge-dc2-via-combo-judge-query-v1 | 판사→A | combine-2 후 예비신랑 측 먼저 연락 정황 확인 요청 |
| dc-2 combination_result | 2 | emerge-dc2-via-combo-a-response-v1 | A→판사 | A 충격 — 메시지 처음 봄, 예비신랑이 먼저 자신한테 말했어야 |
| dc-2 combination_result | 3 | emerge-dc2-via-combo-b-react-v1 | B→판사 | B 평평 — 휴대폰 원본 발신자·수신 시각 그대로 |
| dc-2 combination_result | 4 | emerge-dc2-via-combo-judge-decree-v1 | 판사→전체 | 연락 시작 + 거절 답장 근거로 [먼저 넘은 선] 단서 등록 |
| **dc-2** cascade_from_card | 5 | emerge-dc2-via-cascade-judge-decree-v1 | 판사→A (priorCard:dc-1) | 앞서 [단톡방 글의 근거] 등재, 9일 연락 직전 메시지 제출 명령 |
| dc-2 cascade_from_card | 6 | emerge-dc2-via-cascade-b-submit-v1 | B→판사 (priorCard:dc-1) | 예비신랑 먼저 보낸 메시지 + 거절 답장 휴대폰 원본 제출 |
| dc-2 cascade_from_card | 7 | emerge-dc2-via-cascade-judge-decree-v2 | 판사→전체 (priorCard:dc-1) | 제출된 메시지·답장 근거로 [먼저 넘은 선] 단서 등록 |
| **dc-2** npc_interjection | 8 | emerge-dc2-via-npc-b-interject-v1 | B→A | "아니요. 먼저 연락한 사람은 제가 아닙니다. 방금 말씀은 바로잡아야 합니다." |
| dc-2 npc_interjection | 9 | emerge-dc2-via-npc-judge-query-v1 | 판사→B | 사실관계 영향, 관련 메시지 제출 요청 |
| dc-2 npc_interjection | 10 | emerge-dc2-via-npc-judge-decree-v1 | 판사→전체 | 예비신랑 측 최초 연락 여부 새로 제기, [먼저 넘은 선] 단서 추가 |
| **dc-2** judge_auto_mention | 11 | emerge-dc2-via-fallback-judge-query-v1 | 판사→B | N턴 stall, 예비신랑 접근 경위 미확인, 관련 메시지 제출 요청 |
| dc-2 judge_auto_mention | 12 | emerge-dc2-via-fallback-b-submit-v1 | B→판사 | B 짧은 제출 — 예비신랑 메시지 + 거절 답장 |
| dc-2 judge_auto_mention | 13 | emerge-dc2-via-fallback-judge-decree-v1 | 판사→전체 | 시작 시점 + 답장 내용 근거로 [먼저 넘은 선] 단서 정리 |
| **e-4** combination_result | 14 | emerge-e4-via-combo-judge-mention-v1 | 판사→전체 | 예비신랑 측 메시지 원본 제출, [예비신랑 메시지와 답장] 자료 등록 |
| e-4 combination_result | 15 | emerge-e4-via-combo-b-context-v1 | B→판사 | 수신 시각 + 발신자 표시 휴대폰 원본 그대로, 답장도 같은 대화 안에 |
| e-4 combination_result | 16 | emerge-e4-via-combo-a-react-v1 | A→판사 | A 회피 — 메시지 처음 봄, 예비신랑 직접 확인 필요 frame |
| **e-4** cascade_from_card | 17 | emerge-e4-via-cascade-judge-request-v1 | 판사→B (priorCard:dc-1) | 앞서 [단톡방 글의 근거] 등재, B 측 관련 자료 제출 요청 |
| e-4 cascade_from_card | 18 | emerge-e4-via-cascade-b-submit-v1 | B→판사 (priorCard:dc-1) | 예비신랑 먼저 보낸 메시지 + 거절 답장 원본 대화 제출 |
| e-4 cascade_from_card | 19 | emerge-e4-via-cascade-judge-mention-v1 | 판사→전체 (priorCard:dc-1) | 휴대폰 대화 원본 확인, [예비신랑 메시지와 답장] 자료 등재 |
| **e-4** emotional_outburst | 20 | emerge-e4-via-outburst-b-confess-v1 | B→판사 | B 평평 깨고 자백 "제가 아니었습니다. 먼저 보낸 사람은 예비신랑입니다. 저는 답장으로 거절했습니다." |
| e-4 emotional_outburst | 21 | emerge-e4-via-outburst-judge-request-v1 | 판사→B | catch — 사실이라면 관련 메시지 제출 요청, 발신자·답장 함께 검토 |
| e-4 emotional_outburst | 22 | emerge-e4-via-outburst-judge-mention-v1 | 판사→전체 | 발신·수신 내역 자료, [예비신랑 메시지와 답장] 자료 등록 |
| **e-4** judge_auto_mention | 23 | emerge-e4-via-fallback-judge-request-v1 | 판사→B | N턴 stall, 직접 동기 메시지 있다면 제출, 발신자·답장 자료 필요 |
| e-4 judge_auto_mention | 24 | emerge-e4-via-fallback-b-submit-v1 | B→판사 | B 짧은 제출 — 예비신랑 메시지 + 답장 원본 |
| e-4 judge_auto_mention | 25 | emerge-e4-via-fallback-judge-mention-v1 | 판사→전체 | 접근 경위 원문 자료 제출, [예비신랑 메시지와 답장] 법정 자료 등록 |

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
