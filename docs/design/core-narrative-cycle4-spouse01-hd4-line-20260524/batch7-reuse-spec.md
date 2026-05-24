# Batch 7 mediation 시안 → h-d4 fallback (4-d) 재활용 명세

작성일: 2026-05-25
사용자 결정: Batch 7 4 variant 중 **1개만 채택** — `emerge-hd4-via-judge-auto-decree-v1` entry로 재작성

---

## 배경

CT 세션 ([`session_handoff_20260524_ct_spouse01_cycle4_plot_revision_complete`]) Batch 7 mediation 시안은
**dispute-agnostic 채널** 등록 X 결정됨 (모든 사건이 같은 entry 공유, h-d4 specific 영역 없음).
**시안 자연성 우수** — Cycle 4 narrative wrapper 세션에서 `emergence_narrative` 채널의
h-d4 fallback 영역 (재판관 자발 5턴 stall) entry로 재활용 검토.

본 Cycle 4 진입 시 사용자 결정: **Batch 7 4 variant 중 1개만 채택** —
`mediation-h-d4-S4-responsibility-split-v1` 톤만 차용하여 `emerge-hd4-via-judge-auto-decree-v1` 재작성.
나머지 3 variant (v2 / mutual-responsibility v1·v2)는 보존만, 본 batch 영역 외.

---

## 재활용 대상 Batch 7 시안 (1개)

원본 위치: `batch7-original.json` 또는 `docs/design/spouse-01-cycle4-plot-revision-scripted-text-20260524/result/spouse01_h-d4_batch7_mediation.json`

### 원본 `mediation-h-d4-S4-responsibility-split-v1`

```json
{
  "id": "mediation-h-d4-S4-responsibility-split-v1",
  "text": "이 쟁점은 누가 더 상처받았는지를 가르는 문제가 아닙니다. 이준호 씨는 치료비를 혼자 준비하며 부부가 함께 결정할 일을 혼자 안았습니다. 박지연 씨는 난임 진단과 관련된 화제를 오래 닫아 두었습니다. 책임의 무게는 같지 않지만, 두 분 모두 말하지 않은 시간이 있습니다.",
  "behaviorHint": "재판관이 두 사람을 번갈아 보며 책임을 차분히 나눠 짚는다.",
  "stageGate": "S4 mediation 권위 준수 — 치료비와 난임 진단 관련 화제 회피를 함께 다루되, S5 완전 자백 연표는 보류.",
  "naturalKoreanNotes": "재판관 격식체로 책임을 분리하되 과한 비난을 피함. 추상 대비 대신 ‘혼자 준비’와 ‘화제를 닫음’으로 구체화."
}
```

### 차용 톤 요소

| 요소 | 원본 텍스트 | 본 cycle 적용 |
|---|---|---|
| 책임 split frame | "이 쟁점은 누가 더 상처받았는지를 가르는 문제가 아닙니다." | **그대로 유지** |
| B 책임 frame | "이준호 씨는 ... 부부가 함께 결정할 일을 혼자 안았습니다." | **유지하되 단어 변경** ("치료비" → "다른 영역의 준비") |
| A 책임 frame | "박지연 씨는 난임 진단과 관련된 화제를 오래 닫아 두었습니다." | **사용 X 또는 단어 변경** (h-d4 surface 직전 영역 — 난임 진단 단어 X) → "박지연 씨도 부부 사이에서 말하지 않은 영역이 있었습니다" |
| 마무리 frame | "두 분 모두 말하지 않은 시간이 있습니다." | **그대로 유지** |

---

## 적용 영역 — `emerge-hd4-via-judge-auto-decree-v1` (h-d4 4-d fallback)

### 영역 위치

- emergence: `h-d4`
- trigger: `judge_auto_mention` (4-d fallback)
- 발동 조건: T1 (cascade) / T2 (b-outburst) / T3 (a-confront) 모두 미발동 + dc-8 fired + 5턴 stall
- sequence: 2 entry (`judge_auto_decree` + `b_respond`)

### 적용 제약 — **단어 surface 회피 필수**

본 fallback entry는 **h-d4 surface 시점** (Batch 7 시안의 S4 mediation = 이미 h-d4 부상 후 영역과 다름).
따라서 박지연 난임/치료비/난임 진단/출산 가능성 단어는 본 fallback entry에 **surface X**.

| Batch 7 원본 | 본 cycle fallback 적용 |
|---|---|
| "치료비를 혼자 준비하며" | "다른 영역의 준비를 혼자 안고" 또는 "형 관련 자금 사용과는 분리된 준비를 혼자 이어 왔습니다" |
| "난임 진단과 관련된 화제" | "부부 사이에서 말하지 않은 영역" 또는 "함께 결정할 일을 미루어 둔 영역" |
| 그 외 frame ("책임 split", "말하지 않은 시간") | 그대로 차용 |

본 cycle fallback entry는 **h-d4 쟁점 부상 자체를 선언**까지가 영역 — 책임 split + 화제 회피 자세한 surface는 h-d4 부상 후 mediation/aftermath dispatch 영역.

---

## GPT Pro 작성 가이드

`gpt-pro-brief.md` §2 emergence 4 trigger 4-d 위치 참조 후, 다음 spec 따라 정밀 KO 작성:

### `emerge-hd4-via-judge-auto-decree-v1`

- **화자**: 재판관 → 전체
- **분량**: 3~4 문장 (긴 톤 — Batch 7 책임 split 차용)
- **emotion**: measured / 중재·차분
- **단어 surface 제약**:
  - **금지**: "박지연 난임 / 난임 진단 / 난임 치료비 / 치료비 / 출산 가능성 / 출산 화제 / 출산 포기 / 의사 친구 / 비공식 상담 / 보장 견적 / 의료비 견적 / 신혼 초기 / 10년 가까이"
  - **허용**: "비자금 / 형 관련 자금 사용 / 분리된 준비 / 다른 영역의 준비 / 함께 결정할 일 / 부부가 말하지 않은 시간 / 책임의 무게 / 누가 더 상처받았는지"

**예시 (참고용 — GPT Pro 정밀 KO 작성):**

```
본 법정은 비자금의 원래 목적이 형 관련 자금 사용과는 분리된 영역이라고 봅니다.
이 쟁점은 누가 더 상처받았는지를 가르는 문제가 아닙니다.
이준호 씨는 부부가 함께 결정할 일을 혼자 안아 왔고, 박지연 씨도 말하지 않은 시간이 있습니다.
본 법정에 [비자금의 원래 목적] 쟁점을 정식 부상시키고, 두 분이 함께 정리할 기회를 드립니다.
```

**behaviorHint:**
```
판단이 길어진 끝에 재판관이 직접 정리에 들어간다. 책임을 가르기보다, 양측이 함께 정리할 영역으로 차분히 옮긴다.
```

### `emerge-hd4-via-judge-auto-b-respond-v1`

- **화자**: B → 재판관
- **분량**: 1 문장
- **emotion**: 무표정·시인
- 예시: "예, 받아들이겠습니다." (다른 fallback respond entry 패턴 동일)

---

## tag spec

```
"channel:emergence_narrative",
"caseId:spouse-01",
"speaker:judge",
"speakerRole:judge",
"listener:all",
"listenerRole:all",
"address:toAll",
"audience:all",
"scope:all_present",
"register:formal",
"honorific:formal",
"tense:present",
"relationship:spouse",
"callTerm:none",
"callTermState:none",
"emotion:measured",
"continuity:cascade_mention",
"reveal:none",
"disclosure:guarded",
"trigger:judge_auto_mention",
"emergence:h-d4",
"sourceTone:batch7-mediation-h-d4-S4-responsibility-split-v1"
```

마지막 tag `sourceTone:batch7-mediation-h-d4-S4-responsibility-split-v1` 는 본 entry의 톤 reference 출처 명시 (telemetry/maintenance용).

---

## 보존 변경 X 영역 (Batch 7 나머지 3 variant)

본 Cycle 4에서 채택 X — 자료 보존만:
- `mediation-h-d4-S4-responsibility-split-v2`
- `mediation-h-d4-S4-communication-repair-v1`
- `mediation-h-d4-S4-communication-repair-v2`

원본 위치: `batch7-original.json` (본 폴더 사본) + `docs/design/spouse-01-cycle4-plot-revision-scripted-text-20260524/result/spouse01_h-d4_batch7_mediation.json` (원본)

후속 mediation channel narrative wrapper 작업 시 재검토 가능.
