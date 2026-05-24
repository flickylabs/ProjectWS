# GPT Pro 의뢰서 — friend-01 Batch 2: dc-2 (먼저 넘은 선) + e-4 (예비신랑 메시지/거절) emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-2 + e-4) 의 multi-trigger narrative ScriptedText KO 시안 — 총 25 entry (dc-2 13 + e-4 12)

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음 — Batch 1과 동일 12 파일. tone reference: `friend01-tone-samples.md`.

---

## §1. 사건 context

### dc-2 "먼저 넘은 선"

- 의미: 9일간 연락의 선후관계가 뒤집힘 — 예비신랑 김태윤이 먼저 "다은이 몰래 커피 한 번 보자" / "너 같은 스타일이 원래 내 이상형" 메시지 보냄 → 최수민 거절. 이후 9일간 연락은 이 상황의 연장선.
- 게임 역할: **d-2 (예비신랑 선 넘기) truth advance + d-3 (아버지 돈 접근 패턴) unlock 게이트**. dc-2 fired 시 d-2 S3 도달 + d-3 hidden dispute emergence cascade.
- 현재 mechanical 조건: `combine-2` (e-1 + e-4, requiredEvidenceStages: e-1=original, e-4=original) 또는 `combine-9` (stmt-b-silence + e-4)
- linkedDisputes: [`d-1`, `d-2`], linkedParty: `b`
- successEffects: d-2 선후관계 뒤집힘 / d-3 해금에 필요한 설명 경로 열림
- judgeHint: 박준혁(w-2)을 증인으로 부를 수 있게 됨

### e-4 "예비신랑의 선 넘는 메시지와 최수민의 거절 답장"

- 의미: 예비신랑 김태윤의 선 넘는 메시지 원본 + 최수민의 "친구 남자친구니까 이러지 마" 거절 응답
- 게임 역할: **dc-2 입력 증거**. e-4 자체 부상이 곧 dc-2 cascade 가능 영역.
- 현재 mechanical 조건: `requires=['e-1']` (e-1만 만족하면 unlock — sealed 영역 없음 baseline-adjacent)
- subjectParty: `b`
- proves: [`d-2`]

### dc-2 + e-4 인과 동시성

- e-4가 dc-2 입력 증거이므로 두 emergence가 짝으로 등장.
- 패턴: Trigger 발동 (B 끼어듦/감정 자백/cascade/fallback) → 판사 "관련 메시지를 제출하십시오" → B가 e-4 제출 → e-4 surface → 그 직후 combine 또는 dossier 등재로 dc-2 부상
- 본 batch 양 emergence의 trigger 발화는 서로 reference 가능 (예: dc-2 cascade trigger의 priorCard:dc-1 이지만 narrative entry text가 e-4 제출 명령 포함)

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

### Emergence 1: **dc-2** (단서) — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:** `combine-2` (e-1 + e-4): e-1=original, e-4=original

**Narrative scenario:**
- 조합 결과 표시 → 판사 reactive query (A 대상, 선후관계 확인) → A 답변 (충격/방어) → 판사 dc-2 surface 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc2-via-combo-judge-query-v1` | 판사 | A | 조합 직후 query | 격식·중립·사실 중심 (가치 평가 X) |
| `emerge-dc2-via-combo-a-response-v1` | A | 판사 | 답변 (충격→방어) | 단정 깨짐·동요 |
| `emerge-dc2-via-combo-b-react-v1` | B | 판사 | 부가 발언 (사실 확인 짧게) | 평평 |
| `emerge-dc2-via-combo-judge-decree-v1` | 판사 | 전체 | dc-2 단서 등록 선언 | 격식·확정 |

**가이드:**
- 판사 query (user-approved 시안 기반):
  > "도출 결과에 따르면, 예비신랑 측에서 먼저 연락을 한 정황입니다. 송다은 씨, 이 선후관계를 확인합니다."
- A 답변: 충격 + 방어 frame — "그… 메시지는 처음 봅니다. 수민이가 받았다고 어떻게 증명합니까?" 같은
- B 답변: 평평 — "메시지는 제 휴대폰에 그대로 있습니다." 정도
- 판사 decree: "본 법정에 [먼저 넘은 선]을 단서로 등록합니다." (가치 어휘 회피, 등록 사실만)

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-1` (단톡방 글의 근거) fired
- e-1 stub 이상
- d-1 lieState ≥ S0

**Narrative scenario:**
- dc-1 등재 후, 판사가 A의 frame 사실 근거 확인 절차로 진행 → B에게 관련 메시지 제출 명령 → B가 e-4 제출 → dc-2 부상

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc2-via-cascade-judge-decree-v1` | 판사 | B | dc-1 reference + e-4 제출 명령 | 격식·중립·진행 |
| `emerge-dc2-via-cascade-b-submit-v1` | B | 판사 | e-4 제출 발화 | 평평·짧음·사실 |
| `emerge-dc2-via-cascade-judge-decree-v2` | 판사 | 전체 | dc-2 단서 등록 선언 | 격식·확정 |

**가이드:**
- 판사 decree (user-approved 시안 기반):
  > "앞서 [단톡방 글의 근거]가 등재됐습니다. 관련 사실관계 확인이 필요합니다. 수민 씨, 9일 연락 시작 직전의 관련 메시지를 제출해 주십시오."
- B 제출: "예비신랑이 먼저 보낸 메시지와 제가 거절한 답장입니다." 정도 — 짧고 사실만
- 판사 decree v2: "[먼저 넘은 선]을 단서로 등록합니다." (Trigger 1과 다른 표현, cascade 후의 등록 어조)

#### Trigger 3 — NPC 끼어듦 [type: `npc_interjection`]

**선결조건:** A가 "수민이가 내 남자한테 손을 대서" 같은 단정 발화 중 + B의 d-2 lieState ≥ S0

**Narrative scenario:**
- A 단정 발화 → B 침묵 깨고 "그게 아니라 그쪽이 먼저..." → 판사 catch + 사실 확인 요청 → B가 e-4 제출 → dc-2 부상

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc2-via-npc-b-interject-v1` | B | A (간접) | A 단정 catch 끼어듦 | 평평 깨짐·짧음 |
| `emerge-dc2-via-npc-judge-query-v1` | 판사 | B | 끼어듦 catch + 제출 명령 | 격식·중립 |
| `emerge-dc2-via-npc-judge-decree-v1` | 판사 | 전체 | dc-2 단서 등록 | 격식·확정 |

**가이드:**
- B 끼어듦 (user-approved 시안 기반):
  > "그게 아니라 그쪽이 먼저..."
- 판사 catch (user-approved 시안 기반):
  > "수민 씨, 이 부분 또한 정확한 사실 확인이 필요해 보입니다. 관련 메시지를 제출해 주십시오."
- 판사 decree: dc-2 등록 (Trigger 1, 2와 또 다른 표현)

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**선결조건:** 1~3 trigger 모두 fire X + N턴 stall + e-1 stub 이상 + d-1 lieState ≥ S1

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc2-via-fallback-judge-query-v1` | 판사 | B | 자발 query | 격식·진행 |
| `emerge-dc2-via-fallback-b-submit-v1` | B | 판사 | 제출 답변 | 평평·짧음 |
| `emerge-dc2-via-fallback-judge-decree-v1` | 판사 | 전체 | dc-2 등록 | 격식·확정 |

**가이드:**
- 판사 자발 query (user-approved 시안 기반):
  > "예비신랑 측과의 접근 경위가 확인되지 않았습니다. 수민 씨, 관련 메시지를 제출하십시오."
- B 답변: "예비신랑이 보낸 메시지와 제가 거절한 답장입니다."
- 판사 decree: dc-2 등록

---

### Emergence 2: **e-4** (증거) — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:** dc-2 combine 직전 (combine-2 inputs 충족 시점). dc-2 trigger 1의 제출 명령 narrative와 paired — 여기서 e-4 자체의 surface 발화 (제출 행위의 인지)

**Narrative scenario:**
- dc-2 부상 직전 시점에서 e-4가 evidence 영역에 단독 surface (자료실 등록)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e4-via-combo-judge-mention-v1` | 판사 | 전체 | e-4 자료실 등재 선언 (dc-2 combine 직전) | 격식·중립·사실 |
| `emerge-e4-via-combo-b-context-v1` | B | 판사 | e-4 짧은 맥락 설명 | 평평·사실 |
| `emerge-e4-via-combo-a-react-v1` | A | 판사 | 반응 (충격/회피) | 단정 깨짐·동요 |

**가이드:**
- 판사 mention: "예비신랑 측 메시지 원본이 본 법정에 제출됩니다. [예비신랑 메시지와 답장]을 자료로 등록합니다."
- B 맥락: "메시지 수신 시각과 발신자 모두 휴대폰 원본에 그대로입니다." 같은 사실 진술
- A react: "…그건 처음 보는 메시지입니다." 또는 "예비신랑한테 직접 물어봐야겠습니다." 식 회피

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:** `dc-1` fired + A 단정 frame 유지 → 판사가 B에 관련 자료 요청

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e4-via-cascade-judge-request-v1` | 판사 | B | 관련 자료 요청 | 격식·중립 |
| `emerge-e4-via-cascade-b-submit-v1` | B | 판사 | e-4 제출 | 평평 |
| `emerge-e4-via-cascade-judge-mention-v1` | 판사 | 전체 | e-4 자료 등록 | 격식·확정 |

**가이드:**
- 판사 request (user-approved 시안 기반):
  > "수민 씨 측 관련 자료가 있다면 제출하십시오."
- B 제출: "예비신랑이 먼저 보낸 메시지와 제가 거절한 답장입니다."
- 판사 mention: "[예비신랑 메시지와 답장]을 자료로 등록합니다."

#### Trigger 3 — 감정 돌발 [type: `emotional_outburst`]

**선결조건:** B의 d-1 또는 d-2 lieState 흔들림 (S0→S1 전이 시점) + 평평 frame 깨짐

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e4-via-outburst-b-confess-v1` | B | 판사 | 평평 깨고 실수 자백 | 격앙 X 평평 무너짐 |
| `emerge-e4-via-outburst-judge-request-v1` | 판사 | B | catch + 자료 요청 | 격식·중립 |
| `emerge-e4-via-outburst-judge-mention-v1` | 판사 | 전체 | e-4 등록 | 격식·확정 |

**가이드:**
- B 자백 (user-approved 시안 기반):
  > "내가 아니야. 그 사람이 먼저 보낸거야."
- 호칭: 격앙이지만 B archetype `affect_flattening` 유지 — 격앙도 단정형 짧고 평평하게. 친구 호칭 "다은아"는 아니고 판사 영역이라 거의 혼잣말 톤
- 판사 catch (user-approved 시안 기반):
  > "수민 씨, 말씀하신 내용이 사실이라면, 관련 메시지를 제출하십시오."
- 판사 mention: e-4 자료 등록

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**선결조건:** 1~3 trigger 모두 fire X + N턴 stall + e-1 stub 이상

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e4-via-fallback-judge-request-v1` | 판사 | B | 자발 자료 요청 | 격식·진행 |
| `emerge-e4-via-fallback-b-submit-v1` | B | 판사 | 짧은 제출 | 평평 |
| `emerge-e4-via-fallback-judge-mention-v1` | 판사 | 전체 | e-4 등록 | 격식·확정 |

**가이드:**
- 판사 자발 (user-approved 시안 기반):
  > "관련하여 직접적인 동기가 되는 메시지가 있다면 제출하십시오."
- B 제출 + 판사 mention

---

## §3. ScriptedText tag spec

Batch 1과 동일. emerge tag만 다름:
- `emerge:dc-2` (dc-2 13 entries)
- `emerge:e-4` (e-4 12 entries)

cascade trigger 전용 tag:
- `priorCard:dc-1` (dc-2 Trigger 2 + e-4 Trigger 2 모두)

---

## §4. 작성 self-check

### 정책 준수
- [ ] dc-1 reference는 새 label "**단톡방 글의 근거**" 사용
- [ ] "사건 카드" 단어 등장 X → "단서" / dossier label만
- [ ] 재판관 발화에 "선을 넘다" / "흐름" / "낙인" 등 가치 어휘 X
  - 예외: dossier label "[먼저 넘은 선]" 자체는 OK (label 인용)
  - 단 재판관이 "선을 넘었다"고 평가 발화 X — "먼저 보낸 메시지" / "먼저 연락한 정황" 등 사실 표현 사용
- [ ] 재판관 발화에 "그 X" / "반증" X (대신 "관련 X")
- [ ] 진실 노출: "예비신랑이 먼저" 영역은 dc-2 등록 시점부터 OK. "아버지/사기/미상환" 절대 X

### 톤·voice·호칭
- [ ] A: `premature_summary` (충격 → 방어 → 단정), B: `affect_flattening` 유지
- [ ] B → A = "다은이/다은 씨" (간접 호칭 사용 시)
- [ ] B 격앙 시에도 단정형 짧고 평평 (다른 NPC 격앙 패턴과 차별성)
- [ ] friend01-tone-samples voice와 일관

### Schema 정합
- [ ] 25 entry id가 §2 ID 명세 정확 일치
- [ ] dc-2 13 entry + e-4 12 entry
- [ ] cascade trigger entry에 `priorCard:dc-1` tag
- [ ] dc-2/e-4 각 entry에 `emerge:dc-2` 또는 `emerge:e-4` tag

### Trigger별 차별성
- [ ] dc-2 Trigger 1~4 판사 decree 표현 모두 다름
- [ ] e-4 Trigger 1~4 판사 mention 표현 모두 다름
- [ ] dc-2 Trigger 2 cascade는 priorCard:dc-1 reference 자연 포함
- [ ] e-4 Trigger 2 cascade도 priorCard:dc-1 reference

---

## §5. 응답 형식

JSON 배열 25 entry. 파일명: `output-cycle7-batch2.json`

---

## §6. 메인 Claude 세션 산출 처리

GPT Pro 응답 도착 후:
1. JSON 정합성 검증
2. `src/data/scriptedText/friend-01.json` emergence_narrative 채널에 25 entry 추가
3. `src/data/coreCases/friend-01.case.ts`:
   - `dossierCards[id='dc-2'].narrativeTriggers` 부착 (4 후보)
   - `evidence[id='e-4'].narrativeTriggers` 부착 (4 후보, e-4의 cascade priorCard는 dc-1)
4. tsc + build + qa:fast PASS
5. Codex 다국어 sync (25 × 3 lang)
