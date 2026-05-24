# GPT Pro 의뢰서 — spouse-01 e-5 emergence narrative wrapper (Cycle 1 Sample)

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 1 emergence (e-5 = 이준호의 개인 계좌 출금 내역) 의 3 trigger 후보 + N턴 fallback 의 narrative ScriptedText KO 시안

---

## §0. 권위 메모리 (정독 필수)

- [feedback-new-dispute-evidence-narrative-justification](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_new_dispute_evidence_narrative_justification.md) — Core System narrative trigger 권위
- [project-spouse01-event-timeline](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/project_spouse01_event_timeline.md) — spouse-01 사건 흐름
- [feedback-natural-korean-npc-active-voice](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_natural_korean_npc_active_voice.md) — NPC 발화 자연화 5 차원
- [feedback-judge-question-quality](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_judge_question_quality.md) — 재판관 질문 품질
- [design-spouse01-truth-disclosure-policy](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/design_spouse01_truth_disclosure_policy.md) — 진실 노출 정책

---

## §1. 사건 context

**spouse-01** = 박지연(A, 원고) vs 이준호(B, 피고) 부부 분쟁.

핵심 frame:
- d-1: 외도 의심 (A가 제기, 실은 오해)
- d-2: 남편 명의 계좌 목돈 출금 (B의 형 사업 자금)
- h-d3 (hidden): 공동 적금 2,000만 원 해지 경위 (B의 위임장 위조)

**e-5** = "이준호의 개인 계좌 출금 내역"
- 의미: B가 10년간 별도로 운용해 온 개인 비자금 통장. 3,000만 원이 분할 출금됨 (500/800/700/1,000만)
- 게임 역할: d-2 frame의 핵심 증거. 이게 등재돼야 자금 흐름 추궁 가능
- 현재 mechanical 조건: `requires=['e-4']` + d-2 lieState ≥ S2

---

## §2. emergence 설계 — 3 trigger 후보 + N턴 fallback

**First-Fired-Wins**: 4 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

### Trigger 1 — A의 끼어들기 (현금 의심 토로) [type: npc_interjection]

**선결조건** (Loose 세팅 — 자연 만족 보장):
- d-1 lieState ≥ S2 OR A의 distrust ≥ 50 (둘 중 하나만 만족하면 됨)
- 활성 액션: 사용자가 e-2/e-3로 B에게 d-1 영역 심문 중

**Narrative scenario:**
- 컨텍스트: B가 오피스텔 방문에 대해 변명 중. A는 옆에서 분노/불신 누적 상태
- 발동 흐름 (~7초): B 답변 중 → A 끼어들기 → 판사 reactive query → A 답변 → 판사 등재 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-a-interject-v1` | A | 판사 | 끼어들기 | 1~2 문장 | 격앙·결단 |
| `emerge-e5-via-a-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-e5-via-a-interject-a-response-v1` | A | 판사 | 답변 | 1~2 문장 | 위축→인정 |
| `emerge-e5-via-a-interject-judge-decree-v1` | 판사 | 전체 | 등재 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A는 "그 사람 통장 내역", "출금", "큰돈" 정도까지만 발설 (구체 금액·계좌 X — 그건 e-5 정식 등재 이후 surface)
- 판사 reactive는 사실 확인 (어떻게 알았는지) 한정 — A의 사적 조회 정당성은 별도 영역 (지금은 emergence만)
- A 답변은 "의심이 들어서 한 번 본 것" 정도 — 깊이 보지는 않았다는 톤
- 판사 등재 선언은 spouse-01의 다른 등재 선언과 일관 (예: "본 법정에 [{evidence name}]을 정식 등재합니다.")

---

### Trigger 2 — 증거 조합 결과 (e-3+e-4 cash pattern clue) [type: combination_result]

**선결조건** (Loose):
- d-2 lieState ≥ S1 (간단)
- 사용자가 신규 조합 `e-3+e-4 = clue-cash-pattern` 실행

**Narrative scenario:**
- 컨텍스트: 사용자가 통화기록(e-3)과 발신자 미상 문자(e-4)를 조합 → 단서 "분할 통화 + 발신자 미상 문자 = 정기 송금 흐름"
- 발동 흐름: 조합 결과 표시 → 판사 reactive query → B 답변 중 발동 → 판사 등재 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-combo-judge-query-v1` | 판사 | B | reactive query | 1~2 문장 | 격식·관찰 |
| `emerge-e5-via-combo-b-response-v1` | B | 판사 | 답변 (말 흘림) | 1~2 문장 | 회피→흘림 |
| `emerge-e5-via-combo-judge-decree-v1` | 판사 | 전체 | 등재 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query는 조합 단서 인용 ("이 정기적 자금 이동 정황을 보니...") 한정. 구체 비자금 통장 언급 X
- B는 "개인 비자금 통장이 있긴 합니다. 자세한 건 말씀드리기 곤란합니다만..." 같은 회피적 시인
- 판사 등재 선언: trigger 1과 동일 form

---

### Trigger 3 — B의 격앙 시 돌발 발화 [type: emotional_outburst]

**선결조건** (Loose):
- B emotional phase = 'shaken' OR 'angry' (격앙 직전부터)
- d-2 lieState ≥ S2
- 활성 액션: 사용자 fact_pursuit 류 강압 질문 직후

**Narrative scenario:**
- 컨텍스트: B가 격앙 상태. 사용자 강압 질문에 폭발
- 발동 흐름: B 돌발 발화 → 판사 catch → B 인정 → 판사 등재 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-b-angry-outburst-v1` | B | 판사 | 격앙 돌발 발화 | 1~2 문장 | 격앙·역항의 |
| `emerge-e5-via-b-angry-judge-catch-v1` | 판사 | B | catch + 지적 | 1 문장 | 격식·매서움 |
| `emerge-e5-via-b-angry-b-admit-v1` | B | 판사 | 인정 | 1 문장 | 체념·시인 |
| `emerge-e5-via-b-angry-judge-decree-v1` | 판사 | 전체 | 등재 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B 돌발 발화는 "통장 내역", "계좌"라는 단어 자체를 본인이 흘리는 핵심. 격앙 톤으로 "도대체 더 뭘 보여드려야 합니까!"류 역항의 + 흘림 결합
- 판사 catch는 "방금 말씀하신 [통장 내역]은..." 인용 형태
- B 인정은 짧은 굴복 한 줄

---

### Fallback — N턴 후 판사 자발 언급 [type: judge_auto_mention]

**조건:**
- Legacy unlock 조건 (`requires=[e-4]` + d-2 S2) 만족 후 **5턴 경과**
- 위 3 trigger 모두 미발동

**Narrative scenario:**
- 판사가 자발적으로 "본 법정은 이준호 씨의 개인 계좌 출금 내역을 정식 검토할 필요가 있다고 봅니다" 선언
- B 무답 또는 짧은 시인 후 등재

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-judge-auto-decree-v1` | 판사 | B | 자발 등재 선언 | 1~2 문장 | 격식·결정 |
| `emerge-e5-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 시인 | 1 문장 | 무표정·시인 |

---

## §3. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 형식으로 작성:

```json
{
  "id": "emerge-e5-via-a-interject-v1",
  "text": "{KO 시안}",
  "behaviorHint": "{선택 — 발화자의 행동/표정 힌트}",
  "tags": [
    "channel:emergence_narrative",
    "speaker:a",
    "speakerRole:party",
    "listener:judge",
    "listenerRole:judge",
    "register:formal",
    "honorific:formal",
    "relationship:spouse",
    "trigger:npc_interjection",
    "emergence:e-5"
  ]
}
```

태그 명세:
- `channel:emergence_narrative` (신규 channel)
- `speaker:{a|b|judge}`
- `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}`
- `register:formal` (재판관 격식 환경)
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention}`
- `emergence:e-5` (대상 emergence ID)

전체 entry 수: 4 + 3 + 4 + 2 = **13 entry** (KO 시안)

---

## §4. 톤 권위 (전체 공통)

- 재판관: 격식·신중·확정. "...십시오", "...습니다" 종결. 단정·강압 회피
- A (박지연): 격앙·결단·후 시인. "...요" 가능 (감정 발화) → 답변은 "...습니다"
- B (이준호): 회피→흘림→체념. "...만요", "...만..." 회피체 → 인정 시 "...니다"
- 다른 spouse-01 entry와 호명·종결 일관 (재판관님, 박지연 씨, 이준호 씨)
- [[feedback-natural-korean-npc-active-voice]] 5 차원 적용:
  - 강력 어휘 완화 / 모호 referent 명확 동사구 / 피동 회피 / 직역체 내면 발화 / 자연 완충재
- [[feedback-self-reference-speaker-context]] 자기지시 정밀: NPC 1인칭 자기 발화에 "본인" X → "저/제"

---

## §5. 진실 노출 경계

[[design-spouse01-truth-disclosure-policy]] 권위 준수:
- e-5 emergence narrative에서 다음은 surface 금지:
  - "형에게 현금 전달" (S5 이후만 surface)
  - "형 빚 / 개인회생" (S5 이후만)
  - 구체 금액 (3,000만 원 / 500/800/700/1,000) — surface 가능하나 시점 신중
- emergence narrative는 "비자금 통장 존재"까지만 확정. 사용처는 후속 추궁 영역

---

## §6. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 13 KO entry 작성
2. 사용자 spot check (3~5분)
3. Claude가 `src/data/scriptedText/spouse-01.json`에 entry 추가 + tags 정합 검증
4. Claude가 다국어 sync 의뢰서 작성 (별도 form)
5. Codex worktree에서 EN/JA/ZH-CN 39 entry 작성
6. Claude cherry-pick + merge

---

## §7. 후속 데이터 작업 (GPT Pro 영역 외 — Claude 별도)

- `narrativeTriggers` schema field 신설 (evidence type)
- e-5에 narrativeTriggers 배열 부착 (4 후보 + 각 scriptedRefs)
- 신규 combine recipe `clue-cash-pattern` (e-3+e-4 → 단서 output)
- Runtime engine `narrativeTriggerEngine.ts` 신설
- `useActionDispatch` refreshEvidenceUnlocks 경로 통합
- VFX 연출 wiring (기존 cutscene 재활용)

위는 GPT Pro 작업 진행 동안 Claude 본 세션에서 병행 진행.
