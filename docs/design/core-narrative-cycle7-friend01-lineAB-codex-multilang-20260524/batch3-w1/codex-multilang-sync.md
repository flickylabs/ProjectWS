# Codex Thread — friend-01 Cycle 7 Batch 3 (w-1 김세라 단톡방 동조 증인) 다국어 sync

작성일: 2026-05-24 (skeleton — entry table은 5단계 검토 후 fill-in)
범위: w-1 (13 variants) × 3 lang = **39 entry sync**

---

## §0~§1. 진입 조건 / 작업 배경

(Batch 1, 2와 동일 — worktree spawn, safe.directory, Brief 정독)

worktree branch: `codex/friend01-cycle7-batch3-multilang`
Brief: `docs/design/core-narrative-cycle7-friend01-lineAB-20260524/batch3-w1/`

### Batch 3 처리 emergence

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 증인 | `w-1` | 김세라 (단톡방 동조자) | 4 (cascade:dc-1 / combo / npc / fallback) | 13 |

### 본 batch cascade 영역

- w-1 cascade: `priorCard:dc-1` (이전 단서 reference)

---

## §2. KO baseline (main HEAD)

⚠ **5단계 검토 후 fill-in 영역**.

### 영향 파일

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative
```

### 13 entry 구조 (skeleton — 6단계 KO apply 후 fill-in)

| Trigger | # | ID 예상 | speaker→listener | 핵심 KO (fill-in 대기) |
|---|---|---|---|---|
| **w-1** cascade_from_card (priorCard:dc-1) | 1~3 | emerge-w1-via-cascade-* | 판사·A·B | 앞서 [단톡방 글의 근거] 후 김세라 호출 |
| **w-1** combination_result (combine-8) | 4~6 | emerge-w1-via-combo-* | 판사·A | stmt-a-accusation + e-2 후 김세라 호출 |
| **w-1** npc_interjection | 7~9 | emerge-w1-via-npc-* | B·판사·A | B 우회 인용 "그땐 다들 그렇게..." catch |
| **w-1** judge_auto_mention | 10~13 | emerge-w1-via-fallback-* | 판사·A·B | N턴 stall 후 자발 호출 |

⚠ 위 ID 예상. GPT Pro 실제 응답 + 5단계 검토 후 확정.

---

## §3. 다국어 번역 원칙

### 3.1~3.2. 판사/NPC 영역 + 재판관 어법

(Batch 1, 2 §3.1~§3.3 동일)

### 3.3. cascade `priorCard:dc-1` 다국어 보존

cascade entry 1~3의 text 본문 "앞서 [단톡방 글의 근거]가 등재됐습니다" 같은 reference:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[단톡방 글의 근거]` | `[Grounds for the Group Chat Post]` | `[グループチャット投稿の根拠]` | `[群聊帖子的依据]` |

⚠ Batch 1에서 dc-1 label 다국어 baseline 확정. 본 batch는 Batch 1의 다국어 label과 정확 일관 사용.

### 3.4. 증인 호출 동사 다양화 (Cycle 7 신규 정책)

`feedback_judge_dispassionate_action_focused` 권위. trigger별 호출 동사 다양화:

- T1 cascade: "김세라 씨를 호출하겠습니다" / "We summon Ms. Kim Se-ra" / "キム・セラ氏を召喚いたします" / "传唤金世罗女士"
- T2 combo: "본 법정에 김세라 씨를 증인으로 등록합니다" / "We register Ms. Kim Se-ra as a witness" / "本法廷でキム・セラ氏を証人として登録します" / "本法庭将金世罗女士登记为证人"
- T3 npc: "관련 내용은 증인을 통해 확인하겠습니다. 김세라 씨" / "We will verify through a witness, Ms. Kim Se-ra" / "関連内容は証人を通じて確認します。キム・セラ氏" / "相关内容将通过证人确认。金世罗女士"
- T4 fallback: "본 법정에 김세라 씨를 증인으로 등록합니다" (T2와 비슷하지만 자발 발견 어조)

⚠ 다국어 4 표현 모두 다양화. KO와 동일하게 4 trigger entries에서 호출 발화가 모두 다른 표현.

### 3.5. 증인 박지/voice 보존

김세라 (w-1):
- 32세, 미용실 직원
- A 편향(pro_a) + strategic distortion
- hiddenAgenda: 자기도 비난 가담한 것이 부끄럽다
- 본 batch는 "호출 가능해짐" 시점이지 실제 증인 testimony 영역 X → 김세라 직접 발화 entry 없음 (판사/A/B 발화만)

### 3.6. 진실 노출 정책

- 본 batch (w-1 호출 영역) 절대 X:
  - "아버지 사기" / "예비신랑이 먼저" — Line C / Line B 영역
- 본 batch 영역 OK:
  - 단톡방 동조 / 공통 친구들 분위기 — w-1 영역 자연

### 3.7. dynamics + "사건 카드" → "단서" 명칭

(Batch 1, 2 동일)

---

## §4~§7. 작업 단계 / 검증 / 산출 / 자매 batch

(Batch 1, 2 동일)

산출 commit:
```
git commit -m "i18n(friend-01): sync Cycle 7 Batch 3 — w-1 김세라 증인 호출 narrative (13 variants × 3 lang)"
git push -u origin codex/friend01-cycle7-batch3-multilang
```
