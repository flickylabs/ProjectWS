# GPT Pro 의뢰서 — friend-01 Batch 1: dc-1 (단톡방 글의 근거) emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 1 emergence (dc-1) 의 multi-trigger narrative ScriptedText KO 시안 — 총 13 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — cascade_from_card trigger spec
- `feedback_dossier_card_renamed_to_clue.md` — "사건 카드" → "단서" 명칭
- `feedback_judge_dispassionate_action_focused.md` — **재판관 어법 (본 cycle 핵심)**
- `feedback_judge_question_quality.md` — 재판관 질문 quality
- `feedback_natural_korean_npc_active_voice.md` — NPC 적극 발화 5 차원
- `feedback_family_address_speaker_perspective.md` — 본인 가족 호칭 자기 시점
- `feedback_avoid_code_abbreviations_with_user.md` — 약어 풀어쓰기
- `design_friend01_truth_disclosure_policy.md` — friend-01 진실 노출 정책

톤 reference: `friend01-tone-samples.md`

---

## §1. 사건 context

**friend-01** = 송다은(A, 원고) vs 최수민(B, 피고) 친구 분쟁.

핵심 frame:
- **d-1**: 9일간의 연락 의도 (A가 집착으로 단정, 실은 경고 의도)
- **d-2**: 예비신랑 선 넘기 + 최수민의 거절 (B 측 reframe, dc-2에서 부상)
- **d-5**: 단톡방 매도와 명예훼손 (A 측 책임 frame, dc-1에서 부상)

### dc-1 "단톡방 글의 근거" (label 변경: 기존 "확인 없이 매도한 건 누구인가")

- 의미: 송다은이 단톡방에 "수민이가 또 내 남자한테 연락한다"고 올린 글의 사실 근거 추궁. 연락 기록(e-1)과 단톡방 캡처(e-2)를 대조하면 직접 확인 없이 단정한 정황 드러남.
- 게임 역할: **d-5 영역 (단톡방 매도와 명예훼손)의 시작 단서**. A의 공개 매도 책임 추궁 첫 카드. w-1 (김세라 단톡방 동조) 호출 가능 unlock.
- 현재 mechanical 조건: `combine-1` (e-1 + e-2, requiredEvidenceStages: e-1=excerpt, e-2=excerpt) 또는 `combine-8` (stmt-a-accusation + e-2, e-2=original)
- linkedDisputes: [`d-5`], linkedParty: `a` (A 측 책임)
- successEffects: d-5 핵심 사실 "확인 없는 매도" 잠정 인정 / A 공개 매도 시점 인정
- judgeHint: 김세라(w-1)를 증인으로 부를 수 있게 됨

### dc-1 label 변경 사항 (중요)

| 영역 | 변경 전 | 변경 후 |
|---|---|---|
| dossierCards[id='dc-1'].label | "확인 없이 매도한 건 누구인가" | **"단톡방 글의 근거"** |
| cascade priorCard reference text 본문 (dc-2 / e-4 / w-1 등) | "확인 없이 매도한 건 누구인가" | "**단톡방 글의 근거**" |
| KO entry 본문에서 dc-1 등장 시 | "[확인 없이 매도한 건 누구인가]" | **"[단톡방 글의 근거]"** |

이유: "누구" frame이 인격 추궁 → "행위/근거" frame이 게임 핵심에 더 적합 + 후속 cascade(dc-5 "낙인의 순서")와도 자연 chain (글의 근거 → 낙인 순서).

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

**First-Fired-Wins**: dc-1은 trigger 후보 4개. 첫 발동 시 나머지 3개 영구 disabled.

각 trigger의 narrative entry는 trigger별로 분리. ID 명명 규칙:
```
emerge-dc1-via-{trigger_short}-{role}-{verb}-v{N}
```

### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- `combine-1` (e-1 + e-2): e-1=excerpt 이상, e-2=excerpt 이상 → dc-1 부상
- 또는 `combine-8` (stmt-a-accusation + e-2): e-2=original
- 게이트 channel: evidence_present / dossier

**Narrative scenario:**
- 컨텍스트: 사용자가 e-1(연락 기록) + e-2(단톡방 캡처) 조합 → "단톡방 게시 시각이 수민에게 직접 묻기 전" 정황 드러남
- 발동 흐름 (~6초): 조합 결과 표시 → 판사 자발 reactive query (A 대상) → A 답변 (회피적 부분 시인) → 판사 dc-1(단서) surface 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc1-via-combo-judge-query-v1` | 판사 | A | 조합 결과 직후 reactive query | 격식·관찰·중립 (감정·가치 판단 X) |
| `emerge-dc1-via-combo-a-response-v1` | A | 판사 | 답변 (회피적 부분 시인 또는 frame 유지) | 결론 먼저 + 부분 시인 |
| `emerge-dc1-via-combo-b-react-v1` | B | 판사 | 부가 발언 (평평한 톤, 침묵 frame) | 평평, 사실만 |
| `emerge-dc1-via-combo-judge-decree-v1` | 판사 | 전체 | dc-1 (단서) surface 선언 | 격식·확정, 평가 어휘 X |

**가이드:**
- 판사 query (의뢰서 §1의 user-approved 시안 기반):
  > "방금 도출된 [단톡방 글의 근거] 보고에 따르면, 단톡방 게시 시각이 수민 씨에게 직접 묻기 전입니다. 송다은 씨, 그 순서를 확인합니다."
- A 답변: 결론 먼저 + 부분 시인. "글을 올린 시점이 먼저였던 건 맞습니다. 하지만 그땐 이미 며칠 연락이 이어졌고…" 식. 책임 frame 유지하되 시점 사실은 인정.
- B 답변: 평평. "기록은 그대로입니다." 정도. 침묵 frame.
- 판사 decree: "본 법정에 [단톡방 글의 근거]를 단서로 등록합니다." — 격식 + 평가 어휘 회피

### Trigger 2 — NPC 끼어듦 [type: `npc_interjection`]

**선결조건:**
- A가 d-1 영역에서 "9일간 연락한 건 집착이다" 단정 발화 중
- B의 d-1 lieState ≥ S0 (기본)
- A의 d-1 lieState ≤ S2 (집착 frame 유지 중)

**Narrative scenario:**
- 컨텍스트: A가 9일 연락을 집착으로 단정 발화 → B가 짧게 끼어들어 "다은아 제대로 확인은 하고 말한 거야?" → 판사 catch → A 대상 reactive query

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc1-via-npc-b-interject-v1` | B | A (간접 to 판사) | A 단정 발화 중 끼어듦 | 평평·짧음·B archetype |
| `emerge-dc1-via-npc-judge-query-v1` | 판사 | A | B 끼어듦 catch → A 대상 query | 격식·중립 |
| `emerge-dc1-via-npc-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 격식·확정 |

**가이드:**
- B 끼어듦 (user-approved 시안 기반):
  > "다은아 제대로 확인은 하고 말한 거야?"
- 호칭: B → A = "다은아" (친근 자기 시점). 친구 사이 친근 frame이지만 법정 자리라 짧게.
- 판사 query: "최수민 씨, 발언 정리하십시오. 송다은 씨, 단톡방에 먼저 올린 시점을 확인합니다."
- 판사 decree: dc-1 단서 등록 선언 (Trigger 1과 다른 표현)

### Trigger 3 — 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- A의 lieState 흔들림 (S0→S1 전이 시점)
- distrust 상승 또는 모순 추궁 누적

**Narrative scenario:**
- 컨텍스트: A의 단정 frame 깨지는 순간 — 자신도 모르게 "솔직히..." 흘림 → 판사 reactive query

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc1-via-outburst-a-confess-v1` | A | 판사 | 감정 격앙 중 실수 자백 | 격앙·자기 통제 실패 |
| `emerge-dc1-via-outburst-judge-catch-v1` | 판사 | A | 자백 catch → 확인 query | 격식·중립·확인 어조 |
| `emerge-dc1-via-outburst-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 격식·확정 |

**가이드:**
- A 자백 (user-approved 시안 기반):
  > "솔직히 감정이 앞서서 글을 먼저 올리긴 했지만 그래도..."
- 판사 catch (user-approved 시안 기반):
  > "그 글이 정확한 확인 없이 작성했다는 것을 인정하는 것처럼 들립니다. 송다은 씨, 답변 정정하시겠습니까?"
- 판사 decree: dc-1 단서 등록 (Trigger 1, 2와 또 다른 표현 — 같은 emergence이지만 trigger별 발화 차별성 유지)

### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**선결조건:**
- 1~3 trigger 모두 fire 안 함 + N턴 stall (전체 진행 N턴 이상, dc-1 영역 미진입)
- e-1, e-2 모두 stub 이상 (자료는 노출됨)

**Narrative scenario:**
- 컨텍스트: 자료는 있지만 player가 조합도 안 하고 추궁도 안 함 → 판사 자발적으로 단서 등재 절차 시작

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc1-via-fallback-judge-query-v1` | 판사 | A | 자발 query (사실 정리 요청) | 격식·중립·진행 어조 |
| `emerge-dc1-via-fallback-a-response-v1` | A | 판사 | 답변 (방어적, frame 유지) | 결론 먼저 + 방어 |
| `emerge-dc1-via-fallback-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 격식·확정 |

**가이드:**
- 판사 자발 query (user-approved 시안 기반):
  > "단톡방 발언과 본인 확인 사이 순서가 정리되지 않았습니다. 송다은 씨, 단톡방에 먼저 글을 올린 경위를 묻습니다."
- A 답변: 방어적 frame 유지 — "글을 올린 게 뭐가 잘못입니까. 다들 알아야 했던 사실인데..." 식
- 판사 decree: dc-1 단서 등록 (자발 발견 어조)

---

## §3. ScriptedText tag spec

각 entry의 `tags` 배열에 다음 포함:

### 공통 tag
- `channel:emergence_narrative` (신규 channel)
- `register:formal,honorific:formal` (법정 공식)
- `scope:all_present,revealScope:all_present`
- `tense:present`

### Speaker/Listener/Address (entry별)
- 판사 query/decree: `speaker:judge,speakerRole:judge,listener:party|all,listenerRole:party|all,address:toParty|toAll`
- A 답변: `speaker:a,speakerRole:party,listener:judge,listenerRole:judge,address:toJudge`
- B 발언: `speaker:b,speakerRole:party,listener:judge,address:toJudge`

### Trigger 식별 (신규)
- `trigger:combination_result` (Trigger 1)
- `trigger:npc_interjection` (Trigger 2)
- `trigger:emotional_outburst` (Trigger 3)
- `trigger:judge_auto_mention` (Trigger 4)

### Emergence 식별 (신규)
- `emerge:dc-1`

### Trigger 2 추가 — B 끼어듦
- `interrupt:true` (Trigger 2의 b-interject entry만)

---

## §4. 작성 self-check (제출 전 필수 확인)

### 정책 준수
- [ ] 모든 dc-1 reference에 새 label "**단톡방 글의 근거**" 사용 (구 "확인 없이 매도한 건 누구인가" 등장 X)
- [ ] "사건 카드" 단어 등장 X → "단서" 또는 dossier label만
- [ ] 재판관 발화에 "선을 넘다" / "흐름" / "낙인" 등 가치 어휘 X
- [ ] 재판관 발화에 "그 X" / "반증" 단어 X (대신 "관련 X" 사용)
- [ ] friend-01 truth disclosure 정책 위반 X — "아버지 사기/투자 명목 사기/미상환" 등장 X, "예비신랑이 먼저"는 A 측 S0~S2 발화에 등장 X

### 톤·voice·호칭
- [ ] A: `premature_summary` (단정 → 부연), B: `affect_flattening` (평평·사실만) archetype 유지
- [ ] A→B="다은이/다은 씨" (B→A 영역인 Trigger 2에서 호칭 자기 시점)
- [ ] 재판관 → "송다은 씨" / "최수민 씨"
- [ ] friend01-tone-samples 영역의 기존 voice와 일관 (interjection / overload / contradiction_pursuit 패턴 참조)

### Schema 정합
- [ ] 13 entry id가 의뢰서 §2의 ID 명세 정확히 일치
- [ ] tags에 trigger type + emerge id + 공통 tag 모두 포함
- [ ] behaviorHint는 짧고 NPC 심리 dynamics 명시 (시스템 용어 X — "조합/트리거" 등 player-visible text X)
- [ ] text 본문에 코드 약어 (dc/e/w 등) 단독 등장 X — 자연 명칭 사용

### Trigger별 차별성
- [ ] 같은 dc-1 발현이지만 Trigger 1~4의 판사 decree 표현이 모두 다른가?
- [ ] Trigger 1은 "방금 도출된 조합 결과" 기반 reactive
- [ ] Trigger 2는 "B 끼어듦 catch" 기반
- [ ] Trigger 3은 "A 감정 자백 catch" 기반
- [ ] Trigger 4는 "stall 후 판사 자발" 기반

---

## §5. 응답 형식

```json
[
  {
    "id": "emerge-dc1-via-combo-judge-query-v1",
    "text": "...",
    "behaviorHint": "...",
    "tags": ["channel:emergence_narrative", "trigger:combination_result", "emerge:dc-1", "speaker:judge", "speakerRole:judge", "listener:party", "listenerRole:party", "address:toParty", "register:formal", "honorific:formal", "scope:all_present", "revealScope:all_present", "tense:present"]
  },
  ...
]
```

파일명: `output-cycle7-batch1.json`

---

## §6. 메인 Claude 세션 산출 처리 (참고)

GPT Pro 응답 도착 후 메인 세션(ws-friend-01-cycle worktree)에서:

1. JSON 정합성 검증 (id 정확 일치, tags 정합)
2. `src/data/scriptedText/friend-01.json`의 `channels.emergence_narrative.entries` 신규 channel 추가 + 13 entry 등록
3. `src/data/coreCases/friend-01.case.ts` dossierCards[id='dc-1'] 영역 작업:
   - `label: ko('확인 없이 매도한 건 누구인가')` → `label: ko('단톡방 글의 근거')`
   - `narrativeTriggers: NarrativeTriggerCandidate[]` 부착 (4 후보, 각 trigger의 precondition / scriptedRefs)
4. tsc + build + qa:fast PASS 확인
5. Cycle 8 (Line C) 진입 전 핸드오프 + commit
