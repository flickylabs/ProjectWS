# GPT Pro 의뢰서 — friend-01 Batch 4: w-2 (박준혁 예비신랑 회사 후배 증인) emergence narrative

작성일: 2026-05-24
범위: 1 emergence (w-2) 의 multi-trigger narrative — 총 13 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 12 파일 복사돼 있음. tone reference: `friend01-tone-samples.md` — 특히 `judge_witness_summon` 채널 sample.

---

## §1. 사건 context

### w-2 "박준혁" — 증인 emergence

- 인물: 34세, 회사원. 예비신랑 김태윤의 회사 후배. `neutral` bias + `accurate` distortion (사실 그대로).
- knowledgeScope: 예비신랑이 최수민에게 사적 자리에서 먼저 접근하려 했다는 사실을 알고 있다.
- hiddenAgenda: 예비신랑과의 직장 관계가 불편해질까 봐 조심한다 (조심스럽고 보수적인 톤).
- 호칭: A → "그분" (먼 호칭, 사적 관계 X), B → "최수민 씨" (사적 친분 X)
- 관련 dispute: d-2 (예비신랑 선 넘기)
- unlockedByDossier: dc-2 (먼저 넘은 선)
- testimony.byDispute['d-2']:
  - canProve: 예비신랑이 사적 자리에서 최수민에게 먼저 접근하려 했다는 사실. 예비신랑이 메시지 송신 직후 자기 말을 어떻게 자랑했는지.
  - cannotDisprove: 두 사람 사이 모든 메시지를 직접 본 것은 아님. 최수민이 거절했는지는 본인 진술 기준.

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-2` (먼저 넘은 선) fired
- d-2 lieState ≥ S0

**Narrative scenario:**
- dc-2 등재 후, 판사가 예비신랑 측 객관 확인 필요성 인지 → 박준혁 호출

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-2 reference + w-2 호출 | 격식·진행 |
| `emerge-w2-via-cascade-a-react-v1` | A | 판사 | 반응 (충격/회피) | 단정 깨짐 |
| `emerge-w2-via-cascade-b-react-v1` | B | 판사 | 반응 (평평한 수긍) | 평평·짧음 |

**가이드:**
- 판사 decree (user-approved 시안 기반):
  > "예비신랑 측 행적을 확인해 줄 증인이 필요합니다. 박준혁 씨를 증인으로 모시겠습니다."
- A 반응: "예비신랑 회사 사람까지요?" 또는 "…그 사람은 김태윤 씨 후배인데 한쪽 얘기만 들리지 않겠습니까." 식 의심
- B 반응: "확인되면 좋겠습니다." 정도 평평

### Trigger 2 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- `combine-2` (e-1 + e-4) 또는 `combine-9` (stmt-b-silence + e-4) 성공 → dc-2 부상 직후

**Narrative scenario:**
- 조합 결과 표시 후 판사가 객관 확인 증인 호출

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-combo-judge-mention-v1` | 판사 | 전체 | 조합 결과 mention + w-2 호출 | 격식·중립 |
| `emerge-w2-via-combo-a-react-v1` | A | 판사 | 반응 | 동요 또는 의심 |
| `emerge-w2-via-combo-judge-decree-v1` | 판사 | 전체 | w-2 등록 선언 | 격식·확정 |

**가이드:**
- 판사 mention (user-approved 시안 기반):
  > "방금 도출된 [먼저 넘은 선]에 대해 객관적으로 확인할 증인이 필요합니다."
- A 반응: "그 회사 사람이 객관적이겠습니까?" 식 의심
- 판사 decree: "본 법정에 박준혁 씨를 증인으로 등록합니다." (Trigger 1과 다른 표현)

### Trigger 3 — NPC 끼어듦 [type: `npc_interjection`]

**선결조건:**
- A가 "수민이만 일방적이었다" 같은 단정 발화 중
- B의 d-2 lieState ≥ S0
- B가 침묵 frame 깨고 짧게 정보 흘림 ("그 사람 회사에선 다들 알고 있어")

**Narrative scenario:**
- A 단정 → B 짧은 정보 흘림 → 판사 catch + w-2 호출

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-npc-a-claim-v1` | A | 판사 | "수민이만 일방적" 단정 | 단정·확신 |
| `emerge-w2-via-npc-b-interject-v1` | B | A (간접) | 침묵 깨고 짧은 정보 | 평평 깨짐 |
| `emerge-w2-via-npc-judge-decree-v1` | 판사 | 전체 | catch + w-2 호출 | 격식·중립 |
| `emerge-w2-via-npc-a-react-v1` | A | 판사 | 반응 (동요) | 동요·단정 약화 |

**가이드:**
- A 단정: "수민이가 일방적으로 메시지 보냈고 김태윤 씨는 받기만 했습니다." 식
- B 끼어듦: "그 사람 회사에선 다들 알고 있어. 거기서 본 사람 부르면 돼." 짧고 평평. 친구 호칭 "다은아"는 회피 (법정 자리)
- 판사 decree: "박준혁 씨 측 확인을 진행하겠습니다." (Trigger 1, 2와 또 다른 표현)
- A 반응: "…네, 그쪽 회사 사람한테 들으면 되겠네요." 톤 변화

### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**선결조건:** 1~3 trigger 모두 fire X + N턴 stall + e-4 stub 이상 (자료는 존재) — 또는 dc-2 미발현이라도 d-2 영역 진입 후 stall

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 진술 필요성 언급 | 격식·진행 |
| `emerge-w2-via-fallback-a-react-v1` | A | 판사 | 반응 | 의심 또는 동의 |
| `emerge-w2-via-fallback-judge-decree-v1` | 판사 | 전체 | w-2 등록 선언 | 격식·확정 |

**가이드:**
- 판사 mention (user-approved 시안 기반):
  > "예비신랑 측 행적을 확인해 줄 수 있는 증인이 필요합니다."
- A 반응: "굳이 그쪽 회사 사람을요?" 식 의심
- 판사 decree: "본 법정에 박준혁 씨를 증인으로 등록합니다." (자발 어조)

---

## §3. ScriptedText tag spec

기존 +:
- `emerge:w-2`
- `priorCard:dc-2` (Trigger 1 cascade entries 만)

---

## §4. 작성 self-check

### 정책 준수
- [ ] dc-2 reference 시 label "**먼저 넘은 선**" 그대로 사용
- [ ] "사건 카드" 단어 등장 X
- [ ] 재판관 발화에 가치 어휘 X
- [ ] 증인 호출 동사 trigger별 다양화

### 톤·voice·호칭
- [ ] A: `premature_summary` (단정 → 의심 → 동요)
- [ ] B: `affect_flattening` (평평·짧음·정보만)
- [ ] B → 박준혁 직접 호칭 X (사적 친분 없음. "그 사람 회사에선" 같은 우회 인용)
- [ ] 재판관 → "박준혁 씨"
- [ ] A 의심 표현은 단정형 (예비신랑 frame 보호 본능)

### Schema 정합
- [ ] 13 entry id가 §2 ID 명세 정확 일치
- [ ] cascade trigger entry에 `priorCard:dc-2` tag
- [ ] 모든 entry에 `emerge:w-2` tag

### Trigger별 차별성
- [ ] 4 trigger 판사 호출 발화 표현 모두 다름:
  - T1: "박준혁 씨를 증인으로 모시겠습니다"
  - T2: "본 법정에 박준혁 씨를 증인으로 등록합니다"
  - T3: "박준혁 씨 측 확인을 진행하겠습니다"
  - T4: "본 법정에 박준혁 씨를 증인으로 등록합니다" (T2와 비슷하지만 자발 발견 어조)

---

## §5. 응답 형식

JSON 배열 13 entry. 파일명: `output-cycle7-batch4.json`

---

## §6. 메인 세션 처리

1. JSON 정합성
2. `friend-01.json` emergence_narrative에 13 entry 추가
3. `friend-01.case.ts`: `witnesses[id='w-2'].narrativeTriggers` 부착
4. tsc + build + qa:fast PASS
