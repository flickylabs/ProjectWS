# GPT Pro 의뢰서 — family-01 Cycle 5 Batch 3: dc-2 + w-2 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-2 + w-2)의 multi-trigger narrative ScriptedText KO 시안

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음 — Batch 1과 동일 목록. 정독 후 작성.

---

## §1. 사건 context

**family-01** = 윤태성(A) vs 윤정후(B) 형제 유산 다툼. Batch 1/2와 동일 frame. 본 batch는 절차 단서(dc-2) 합성 + 공증인 메모 담당(w-2) 호출.

### dc-2 "수정된 유언장" — **라벨 변경 적용 (Cycle 5 신규)**

- **기존 라벨**: '줄인 유서'
- **변경 후 라벨**: **'수정된 유언장'**
- 본 batch에서 entry text의 단서 reference는 **모두 "수정된 유언장"** 사용. case.ts label 변경은 메인 Claude 세션 6단계에서 적용.
- **의미**: 공증 오후 수정의 존재를 넘어서, 절차 안에서 어떤 흐름이 만들어졌는지를 묻는 단서. 오전 1차 접수 공란 → 오후 수정 60:40 확정 흐름이 공증인 메모로 남아 있다.
- **게임 역할**: d-2 영역의 결정적 단서. 절차 개입 책임 surface (동기 d-5).
- **현재 mechanical 조건**: `combine-5` (stmt-b-silence + e-4 공증인 메모), `combine-11` (e-2 + e-3), `combine-12` (stmt-a-heir + stmt-b-silence) 등 다수 조합 경로.
- **linkedDisputes**: [`d-2`], **linkedParty**: `b`.

### w-2 "김영수"

- **의미**: 공증인 메모 담당. 오전 1차 접수 공란 + 오후 수정 절차 + 어머니 상태 + 윤정후 진행 태도 모두 메모 기록 + 직접 목격.
- **게임 역할**: dc-2의 직접 담당자. 본 cycle에서 호출 가능 자격 부여.
- **현재 mechanical 조건**: `unlockedByDossier: ['dc-2']`.
- **fromA**: "큰아들분" / **fromB**: "서류 제출자분".

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

---

### Emergence 1: **dc-2** "수정된 유언장" — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-5` (stmt-b-silence + e-4) 또는 `combine-11` (e-2 + e-3) 또는 `combine-12` 조합 실행
- 각 조합 입력 evidence stage 충족
- d-2 lieState ≥ S1 (d-2가 이미 surface된 상태)

**Narrative scenario:**
- 컨텍스트: 사용자가 공증인 메모 + 기타 자료 조합 → 단서 합성
- 발동 흐름 (~6초): 조합 결과 → 판사 자발 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-combo-judge-decree-v1` | 판사 | 전체 | 단서 등록 선언 | 1~2 문장 | 격식·확정 |
| `emerge-dc2-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 decree (v3 승인): **"공증 절차에서 유언장 수정 사실이 확인됐습니다. 단서 [수정된 유언장]을 등록합니다."**
- B respond: "예…" / "받아들이겠습니다."

#### Trigger 2 — d-2 cascade [type: `cascade_from_card`]

**선결조건:**
- `d-2` 이미 surface (Batch 2 결과로 surface된 상태) — priorCard:d-2
- e-4 (공증인 메모) Original 도달
- d-2 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: 절차 쟁점(d-2) surface 후 공증인 메모 검토 단계에서 단서 자동 합성
- 발동 흐름 (~6초): 판사 자발 d-2 reference + 메모 분석 + 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-cascade-judge-decree-v1` | 판사 | 전체 | d-2 reference + 단서 등록 | 1~2 문장 | 격식·분석 |
| `emerge-dc2-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 decree (v3 승인): **"공증인 메모를 확인한 결과, [수정된 유언장]을 별도 단서로 살펴볼 필요가 있어 보입니다. 본 법정에 단서로 등록합니다."** — priorCard:d-2 명시 (예: "앞서 별도 쟁점으로 둔 공증 절차의 개입과 관련하여, 공증인 메모를 확인한 결과…" 류 d-2 reference)
- B respond: "예…"

**※** 본 cascade는 dossier card → dossier card cascade가 아닌 dispute → dossier card. priorCard 필드는 dossierCardId / evidenceId 외에 **disputeId도 허용**할지 schema 확장 필요. 만약 schema가 disputeId 미지원 시, Trigger 2를 `priorCard:dc-1` (Batch 1에서 등록된 단서)로 변경. **메인 Claude 세션 6단계에서 schema 확인 후 결정.**

#### Trigger 3 — B의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- d-2 lieState ≥ S2
- B 평정 → 흔들림 진입 가능
- 활성 액션: 공증 영역 질문 중

**Narrative scenario:**
- 컨텍스트: 윤정후가 공증 영역 질문에 흔들리며 회피적 답변 흘림. 판사가 catch
- 발동 흐름 (~7초): 판사 질문 → B 흔들리며 회피 답변 → 판사 reactive catch → 단서 등록

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-b-outburst-v1` | B | 판사 | 흔들리며 회피 | 1 문장 | 흔들림·회피 |
| `emerge-dc2-via-b-outburst-judge-react-v1` | 판사 | B | reactive catch | 1 문장 | 격식·결정 |
| `emerge-dc2-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 단서 등록 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (v3 승인): **"오전 접수에도… 대부분의 내용은 비슷했습니다."** (말 끝 흔들림 — behaviorHint에 명시, 비율 직접 노출 회피하면서도 오전/오후 분리 정황 흘림)
- 판사 react: "오전과 오후 사이의 차이를 본 법정에서 단서로 정리하겠습니다."
- 판사 decree: "본 법정에 단서 [수정된 유언장]을 등록합니다."

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-2 S2 + e-4 Original 도달 + 일정 turn(예: 6턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 단서 등록 | 1~2 문장 | 격식·결정 |
| `emerge-dc2-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto: "공증 절차 영역이 충분히 정리됐다고 봅니다. 본 법정에 단서 [수정된 유언장]을 등록합니다."
- B respond: "예, 받아들이겠습니다."

**dc-2 total: 2 + 2 + 3 + 2 = 9 entry**

---

### Emergence 2: **w-2** "김영수" — 3 trigger

#### Trigger 1 — dc-2 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-2` 이미 fired (priorCard:dc-2)
- d-2 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-2 등록 직후, 그 단서의 직접 담당자(공증인 메모 담당) 호출 자연 흐름
- 발동 흐름 (~5초): 판사 자발 cascade mention → w-2 호출 자격 surface

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2-via-cascade-judge-summon-v1` | 판사 | 전체 | dc-2 reference + w-2 호출 선언 | 1~2 문장 | 격식·결정 |
| `emerge-w2-via-cascade-a-react-v1` | A | 판사 | 짧은 동의 | 1 문장 | 동의·짧음 |

**가이드:**
- 판사 summon (v3 승인): **"앞서 등록된 단서 [수정된 유언장]과 관련하여, 공증인 메모를 작성하신 담당자 분을 직접 자리로 모시겠습니다. 김영수 씨를 부르도록 준비하겠습니다."** — priorCard:dc-2 명시
- A react: "네, 감사합니다, 재판관님."

#### Trigger 2 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- dc-2 challenge 진행 중 OR d-2 lieState ≥ S2
- B 평정 톤

**Narrative scenario:**
- 컨텍스트: 윤정후가 dc-2 challenge 답변 중 본인 결백 강조하며 담당자 청취 권유
- 발동 흐름 (~6초): B 흘림 → 판사 reactive → w-2 호출 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2-via-b-interject-v1` | B | 판사 | 흘림 (담당자 청취 권유) | 1~2 문장 | 평정·짧음 |
| `emerge-w2-via-b-interject-judge-react-v1` | 판사 | B | reactive | 1 문장 | 격식·결정 |
| `emerge-w2-via-b-interject-judge-summon-v1` | 판사 | 전체 | w-2 호출 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject (v3 승인): **"담당자 분께서 진실을 알고 계실 겁니다."** (평정 톤)
- 판사 react (v3 승인): **"그렇다면 담당자 분께 직접 말씀을 듣겠습니다."**
- 판사 summon: "김영수 씨를 본 법정에 모시도록 준비하겠습니다."

#### Trigger 3 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2 모두 미발동 + dc-2 등록 + 일정 turn(예: 5턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 호출 결정 | 1~2 문장 | 격식·결정 |
| `emerge-w2-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto: "공증 절차 영역 확인을 위해 메모 담당자 진술이 필요한 시점이라 봅니다. 김영수 씨를 부르도록 준비하겠습니다."
- B respond: "예, 받아들이겠습니다."

**w-2 total: 2 + 3 + 2 = 7 entry**

---

**Batch 3 grand total: 9 + 7 = 16 entry**

---

## §3. cascade_from_card spec

Batch 1과 동일. **본 batch 특이점**: dc-2 Trigger 2의 priorCard 후보가 dispute(d-2). schema가 disputeId 지원 안 하면 Trigger 2를 dc-1 priorCard로 변경 (메인 세션 6단계).

---

## §4. 작성 산출 형식

Batch 1/2와 동일. 본 batch entry tag:
- dc-2: `emergence:dc-2` — 모든 entry에 명시
- w-2: `emergence:w-2` — 모든 entry에 명시
- cascade entry: `priorCard:dc-2` (w-2) 또는 `priorCard:d-2` 또는 `priorCard:dc-1` (dc-2, 결정 보류)

---

## §5. 톤 권위

Batch 1 §5와 동일.

---

## §6. 진실 노출 경계 — Line A 영역

Batch 1/2와 동일. **그룹 1~5 surface 절대 금지**.

본 batch 추가 주의:
- dc-2 emergence에서 "오전 1차 비율 공란 → 오후 수정 60:40 확정" 흐름이 단서 본질이지만, **정확 수치(60:40, 90:10) 절대 X**. "수정된 유언장" / "오전 1차" / "오후 수정" / "수정 사실" 같은 surface 표현만 사용.
- B outburst "오전 접수에도 대부분의 내용은 비슷했습니다" 같이 비율 직접 노출 회피 패턴 권장.
- w-2 호출 narrative에서도 직접 메모 내용 인용 X. "공증인 메모를 작성하신 담당자" 같은 자료 자체 표현만.

---

## §7. dossier card 명칭 변경 영역

Batch 1/2 §7과 동일. **본 batch 핵심: dc-2 라벨 = "수정된 유언장" 일관 사용.**

---

## §8 ~ §9

Batch 1/2와 동일 흐름.

---

## §10. dc-2 label rename 사전 안내 (메인 세션 6단계 영역)

본 batch 결과 적용 시 메인 Claude 세션이 수행해야 할 추가 작업:

1. `src/data/coreCases/family-01.case.ts` 의 dc-2 `label: ko('줄인 유서')` → `ko('수정된 유언장')` 변경
2. 기존 ScriptedText (`src/data/scriptedText/family-01.json` 등 4개 lang) 에서 dc-2 label reference grep:
   - "줄인 유서" / "줄인_유서" / dc-2 영역 dossier channel entry 내 reference
   - 모두 "수정된 유언장" 으로 일관 변경
3. 다국어 sync 의뢰서에 dc-2 label 변경 안내 명시 (EN/JA/ZH-CN 모두 갱신):
   - EN: "trimmed will" → "amended will"
   - JA: "縮減された遺言" → "修正された遺言書"
   - ZH-CN: "缩减的遗嘱" → "修订过的遗嘱"
   - 다국어 표현은 Codex 사용자 검토 권장
