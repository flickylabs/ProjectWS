# GPT Pro 의뢰서 — friend-01 Batch 3: w-1 (김세라 단톡방 동조 증인) emergence narrative

작성일: 2026-05-24
범위: 1 emergence (w-1) 의 multi-trigger narrative — 총 13 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 12 파일 복사돼 있음. tone reference: `friend01-tone-samples.md` — 특히 `judge_witness_summon` 채널 sample (w-1 soft/mid/hard 발화).

---

## §1. 사건 context

### w-1 "김세라" — 증인 emergence

- 인물: 32세, 미용실 직원. A(송다은) 편향(`pro_a`) + strategic distortion (전략적 왜곡).
- knowledgeScope: 단톡방에서 송다은의 글을 보고 최수민을 비난하는 데 동조했다. 나중에 찜찜한 마음이 들었다.
- hiddenAgenda: 자신도 최수민 비난에 가담한 것이 부끄럽다.
- 호칭: A → "다은이" (친근), B → "수민 씨" (거리감)
- 관련 dispute: d-5 (단톡방 매도와 명예훼손)
- unlockedByDossier: dc-1 (단톡방 글의 근거)
- testimony.byDispute['d-5']:
  - canProve: 송다은의 최초 단톡방 발언 경위 + 공통 친구들의 동조 흐름. 직접 확인 없이 분위기가 잡혀간 시점.
  - cannotDisprove: 두 사람 사이의 실제 사정은 모름. 자신도 동조한 책임이 있어 발언이 보수적.

본 emergence는 **w-1 호출 가능 상태(unlocked) 부상** narrative. 실제 증인 testimony entry는 별도 채널 (witness)이며 본 batch 범위 X. 본 batch는 "호출 가능해짐" 시점의 emergence narrative.

### w-1 호출 가능성과 narrative wrapping

기존 mechanical 조건: `dc-1 fired` → `w-1.unlockedByDossier=['dc-1']` mechanical unlock.

narrative wrapping은 이 unlock 시점에 자연스러운 등장 사건을 부여. 4 trigger 후보:

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-1` (단톡방 글의 근거) fired
- d-5 lieState ≥ S0 또는 dispute 영역 진입 추궁 누적

**Narrative scenario:**
- dc-1 등재 후, 판사가 단톡방 분위기 직접 확인 필요성 인지 → 김세라 호출 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w1-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-1 reference + w-1 호출 선언 | 격식·진행 |
| `emerge-w1-via-cascade-a-react-v1` | A | 판사 | 반응 (안도/지지 또는 동요) | 단정→찰나의 불안 |
| `emerge-w1-via-cascade-b-react-v1` | B | 판사 | 반응 (평평한 수긍) | 평평·짧음 |

**가이드:**
- 판사 decree (user-approved 시안 기반):
  > "단톡방 발언과 분위기를 증언해 줄 증인이 필요합니다. 김세라 씨를 호출하겠습니다."
- A 반응: 안도성 동의 또는 자기 frame 반영 우려 — "네, 세라가 다 봤습니다." / "…세라까지 와야 하는 일인가요." 식
- B 반응: 평평 — "확인되면 좋겠습니다." 정도

### Trigger 2 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- `combine-8` (stmt-a-accusation + e-2) 성공: A의 "또 내 남자한테 연락한다" 발언이 단톡방 확산 경로 확정

**Narrative scenario:**
- 조합 결과 표시 → 판사가 확산 경로 추가 확인 필요성 → w-1 호출

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w1-via-combo-judge-mention-v1` | 판사 | 전체 | 조합 결과 mention + w-1 호출 | 격식·중립 |
| `emerge-w1-via-combo-a-react-v1` | A | 판사 | 반응 | 동요 또는 동의 |
| `emerge-w1-via-combo-judge-decree-v1` | 판사 | 전체 | w-1 등록 선언 | 격식·확정 |

**가이드:**
- 판사 mention (user-approved 시안 기반):
  > "송다은 씨의 발언이 실제 단톡방에서 어떻게 확산됐는지 증인을 통해 확인해 보겠습니다."
- A 반응: "…그건 단톡방에 있는 친구들이 다 봤습니다." 짧은 인정
- 판사 decree: "본 법정에 김세라 씨를 증인으로 등록합니다." (Trigger 1과 다른 표현)

### Trigger 3 — NPC 끼어듦 [type: `npc_interjection`]

**선결조건:**
- B가 d-1 또는 d-5 영역에서 "그땐 다들 그렇게 보고 있었어" 같은 우회 인용 발화
- A의 d-1 lieState ≤ S2

**Narrative scenario:**
- B 우회 인용 → 판사가 "그 자리에 있던 사람" 확인 필요성 인지 → w-1 호출

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w1-via-npc-b-context-v1` | B | 판사 | "다들 그렇게 보고 있었어" 식 우회 인용 | 평평·맥락 |
| `emerge-w1-via-npc-judge-decree-v1` | 판사 | 전체 | catch + w-1 호출 | 격식·중립 |
| `emerge-w1-via-npc-a-react-v1` | A | 판사 | 반응 | 동요 또는 단정 |

**가이드:**
- B 우회 인용: "그때 단톡방에는 다들 같은 시선이었어요. 저 혼자 다른 얘기를 할 자리도 아니었습니다." 식
- 판사 decree (user-approved 시안 기반):
  > "관련 내용은 증인을 통해 확인하겠습니다. 김세라 씨."
- A 반응: "…네, 세라가 다 압니다." 또는 "…굳이 세라까지요?" 식

### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**선결조건:** 1~3 trigger 모두 fire X + N턴 stall + dc-1 fired (cascade 영역과 같지만 stall 후 자발 발화) — 또는 dc-1 미발현이라도 d-5 영역 진입 후 stall

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w1-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 진술 필요성 언급 | 격식·진행 |
| `emerge-w1-via-fallback-a-react-v1` | A | 판사 | 반응 | 동요 또는 동의 |
| `emerge-w1-via-fallback-b-react-v1` | B | 판사 | 반응 (평평) | 평평·짧음 |
| `emerge-w1-via-fallback-judge-decree-v1` | 판사 | 전체 | w-1 등록 선언 | 격식·확정 |

**가이드:**
- 판사 mention (user-approved 시안 기반):
  > "단톡방에 함께 있던 인물의 진술이 필요합니다."
- A 반응: "…네, 세라가 그 자리에 있었습니다."
- B 반응: "확인되면 좋겠습니다." 평평 수긍
- 판사 decree: "본 법정에 김세라 씨를 증인으로 등록합니다." (Trigger 1, 2와 또 다른 표현)

---

## §3. ScriptedText tag spec

기존 (Batch 1, 2와 같음) +:
- `emerge:w-1` (모든 entry)
- `priorCard:dc-1` (Trigger 1 cascade entries 만)

증인 etc. 호출 영역 특수:
- 판사 → 증인 발화는 listener:witness가 아닌 listener:all (등록 선언이므로). 단 호출 시점이 증인이 자리에 들어오기 직전이라 address:summon 사용 검토
- Batch 3 emergence narrative entry 영역은 "w-1 호출 가능해짐" 시점의 narrative이므로 listener:all + address:toAll 권장 (실제 증인 testimony는 별도 channel)

---

## §4. 작성 self-check

### 정책 준수
- [ ] dc-1 reference 시 새 label "**단톡방 글의 근거**" 사용 (Trigger 1 cascade에서)
- [ ] "사건 카드" 단어 등장 X
- [ ] 재판관 발화에 가치 어휘 X
- [ ] 증인 호출 동사 trigger별 다양화 ("호출하겠습니다" / "확인해 보겠습니다" / "증인으로 등록합니다" 등)

### 톤·voice·호칭
- [ ] A: `premature_summary` (단정 / 안도성 동의 또는 자기 frame 동요)
- [ ] B: `affect_flattening` (평평·짧은 수긍)
- [ ] 양측 모두 김세라 호칭: A → "세라가" (친근), B → 우회 인용 시 "친구들" 정도 (직접 호칭 회피 — B는 침묵 frame)
- [ ] 재판관 → "김세라 씨"

### Schema 정합
- [ ] 13 entry id가 §2 ID 명세 정확 일치
- [ ] cascade trigger entry에 `priorCard:dc-1` tag
- [ ] 모든 entry에 `emerge:w-1` tag

### Trigger별 차별성
- [ ] 4 trigger 판사 호출 발화 표현 모두 다름:
  - T1: "김세라 씨를 호출하겠습니다"
  - T2: "본 법정에 김세라 씨를 증인으로 등록합니다"
  - T3: "관련 내용은 증인을 통해 확인하겠습니다. 김세라 씨"
  - T4: "본 법정에 김세라 씨를 증인으로 등록합니다" (T2와 비슷하지만 발견 흐름 다름 — 자발 fallback 어조)
- [ ] A 반응 entry는 trigger 분위기에 따라 안도성/동요 차별 (T2/T4는 동의, T1/T3은 약간의 동요 가능)

---

## §5. 응답 형식

JSON 배열 13 entry. 파일명: `output-cycle7-batch3.json`

---

## §6. 메인 세션 처리

1. JSON 정합성
2. `friend-01.json` emergence_narrative에 13 entry 추가
3. `friend-01.case.ts`: `witnesses[id='w-1'].narrativeTriggers` 부착
4. tsc + build + qa:fast PASS
