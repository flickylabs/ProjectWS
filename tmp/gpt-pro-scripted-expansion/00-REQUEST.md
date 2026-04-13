# GPT Pro 요청: 특수 상황 ScriptedText 전면 보강 (spouse-01)

## 배경

솔로몬 법정 게임의 NPC 대사 시스템. 일반 심문/증거제시/증인/후일담은 ScriptedText로 커버되어 있으나, 특수 발동 조건(모순 추궁/끼어들기/감정 과부하 등)에 대한 전용 응답이 없어 LLM 폴백 시 어색하거나 맥락에 맞지 않는 응답이 생기고 있음.

---

## 첨부 파일 안내

| 파일 | 내용 | 용도 |
|------|------|------|
| `01-case-data-spouse-01.json` | spouse-01 사건 데이터 (캐릭터/쟁점/증거/증인 전체) | 캐릭터 성격, 쟁점 구조, 증거 내용 참고 |
| `02-structure-v2-spouse-01.json` | 쟁점별 상세 구조 (claimPolicies, disputeAliases, beats) | 쟁점별 논쟁 맥락, lieConfig 참고 |
| `03-type-definitions.ts` | ScriptedText TypeScript 타입 정의 | 출력 JSON 구조 참고 |
| `04-scripted-samples.json` | 기존 ScriptedText 채널별 대표 샘플 (interrogation/evidence/dossier/witness/aftermath/system) | 톤/포맷/태그 구조 참고 |
| `05-quality-rules.md` | 한국어 품질 규칙 + 재판관 질문 품질 기준 | 금지 패턴/톤 기준 참고 |

---

## 사건 요약 (spouse-01)

- **캐릭터 A (박지연, 아내)**: 남편의 외도를 의심. 블랙박스 GPS, 영수증을 증거로 확보. 실제로는 공동 적금을 빼 사기 피해 사건에 투자. archetype: victim_cosplay
- **캐릭터 B (이준호, 남편)**: 형 가족(조카)을 몰래 돌보고 있었음. 오피스텔은 형 소유, 여성 물품은 조카 것. 아내에게 말 못한 이유: 형의 체면. archetype: avoidant
- **관계**: 부부 (spouse)
- **핵심 쟁점**:
  - d-1: 오피스텔 방문과 새벽 전화 (외도 의혹 vs 형 돌봄)
  - d-2: 공동 적금 300만원 인출 (투자 사기 vs 숨김)
  - h-d3: 위임장 조작 의혹 (hidden)
  - h-d4: 투자 사기 피해 (hidden)
- **호칭**: A→재판관: "재판관님", A→상대 언급: "제 남편", B→재판관: "재판관님", B→상대 언급: "제 아내"

---

## 요청 항목

### A. NPC 응답 (6종)

#### A-1. contradiction_pursuit (모순 추궁 응답)

플레이어가 NPC 진술의 모순을 발견하고 추궁할 때, NPC가 대응하는 대사.

**키 구조**: `{party}|{disputeId}|{lieState}`
**생성 범위**: 2 party × 2 dispute(d-1, d-2) × 4 state(S1, S2, S3, S4) × 3 variant = **48건**

**톤 가이드**:
- S1: 완강히 부정하지만 살짝 당황. "그건 다른 의미입니다", "제가 말한 건 그런 뜻이 아닙니다"
- S2: 일부 인정하면서 변명. "네, 좀 다르게 말했습니다. 그런데 그건..."
- S3: 감정적 동요. "...맞습니다. 처음에 말한 것과 다릅니다. 그런데 이유가 있습니다"
- S4: 거의 인정, 마지막 방어. "솔직히 말씀드리면... 처음에 그렇게 말한 건 제가 두려웠기 때문입니다"

**예시 (B, d-1, S2)**:
```json
{
  "key": "b|d-1|S2",
  "party": "b",
  "disputeId": "d-1",
  "lieState": "S2",
  "stanceHint": "hedge",
  "truthLevel": "partial",
  "variants": [
    {
      "id": "contra-b-d1-S2-v1",
      "text": "네, 처음에 말한 것과 좀 다릅니다. 오피스텔에 간 건 맞는데, 이유가 제가 말씀드린 것과는... 달랐습니다.",
      "behaviorHint": "시선이 흔들리고, 인정은 하되 핵심은 아직 감추려 한다.",
      "tags": ["channel:contradiction_pursuit", ...]
    }
  ]
}
```

---

#### A-2. interjection (끼어들기)

상대방 진술 중 NPC가 참지 못하고 끼어드는 대사.

**키 구조**: `{party}|{disputeId}|{severity}`
**생성 범위**: 2 party × 2 dispute × 2 severity(minor/major) × 3 variant = **24건**

**톤 가이드**:
- minor: 반박이지만 절제됨. "잠깐요, 그 부분은 사실과 다릅니다"
- major: 격앙된 폭발. "아니, 그건 제가 할 말입니다! 제가 왜—"

---

#### A-3. emotional_overload (감정 과부하)

감정이 임계치를 넘어 응답을 거부하거나 폭발하는 대사. 2턴간 질문 불가 상태에 진입.

**키 구조**: `{party}|{disputeId}`
**생성 범위**: 2 party × 2 dispute × 2 variant = **8건**

**톤 가이드**:
- 울먹임/침묵: "...더 이상은 말씀드리기 어렵습니다"
- 분노 폭발: "됐습니다! 더 이상 이 얘기 안 합니다!"
- 복귀 대사 (2턴 후): "...죄송합니다. 이어서 말씀드리겠습니다" (variant에 포함)

---

#### A-4. evidence_discovery_sequence (증거 발견 시퀀스)

NPC 응답 중 의도치 않게 새 증거로 이어지는 4단계 대사.

**키 구조**: `{party}|{evidenceId}|{step}`  (step: probe/slip/capture/confirm)
**생성 범위**: 핵심 증거 3건(e-1, e-3, e-5) × 4 step × 1 variant = **12건**

**톤 가이드**:
- probe: 재판관이 유도 질문 ("그 시점에 다른 지출은 없었습니까?")
- slip: NPC가 실수로 단서를 흘림 ("아, 그때 참고서는... 아닙니다, 그건 다른 얘기입니다")
- capture: 재판관이 포착 ("지금 참고서라고 하셨습니다. 좀 더 설명해 주시겠습니까?")
- confirm: NPC가 인정하거나 추가 부정 ("...네, 참고서를 산 건 맞습니다")

---

#### A-5. trust_action_response (신뢰 행동 응답)

분리심문/비공개보호/즉답요구 후 NPC 반응.

**키 구조**: `{party}|{actionType}|{lieState}`
**생성 범위**: 2 party × 3 action(separation/confidential/immediate) × 3 state(S1,S2,S3) × 2 variant = **36건**

**톤 가이드**:
- separation(분리심문): 상대 없으니 경계가 풀림. "...둘이서만 말씀드리는 거죠? 그러면..."
- confidential(비공개보호): 비공개 약속에 안도. "비공개라면... 하나만 말씀드리겠습니다"
- immediate(즉답요구): 압박에 즉시 반응. "네, 맞습니다. 제가 했습니다"

---

#### A-6. mediation (중재 단계 대화)

Phase 6 중재 단계에서 최종 입장 정리.

**키 구조**: `{party}|{resultClass}`
**생성 범위**: 2 party × 3 class(a_primary_fault/b_primary_fault/shared_fault) × 2 variant = **12건**

**톤 가이드**:
- 자기 잘못이 큰 결과: 반성 + 변명 없는 인정
- 상대 잘못이 큰 결과: 안도 + 상대에 대한 아쉬움
- 공동 잘못 결과: 서로에 대한 이해 + 반성

---

### B. 재판관 대사 (2종)

#### B-1. judge_question (사건별 심문 질문)

현재 일반 템플릿으로 생성되는 재판관 질문을 사건 맥락에 맞게 작성.

**키 구조**: `{disputeId}|{questionType}|{depth}`
**생성 범위**: 2 dispute × 3 type(fact_pursuit/motive_search/empathy_approach) × 4 depth(1~4) × 2 variant = **48건**

**depth 가이드**:
- depth 1: 표면 질문 ("그날 어디에 계셨습니까?")
- depth 2: 구체화 ("그 시간에 전화를 받으신 건 누구였습니까?")
- depth 3: 핵심 접근 ("오피스텔에서 누구를 만나셨습니까?")
- depth 4: 결정적 질문 ("그 사람이 조카라면 왜 아내에게 말하지 않았습니까?")

---

#### B-2. judge_contradiction (사건별 모순 추궁 질문)

**키 구조**: `{disputeId}|{tone}`
**생성 범위**: 2 dispute × 3 tone(soft/mid/hard) × 3 variant = **18건**

**톤 가이드**: 05-quality-rules.md 참고. 직접 인용 금지, 간접 참조만 사용.

---

### C. 시스템 메시지 (5종, 각 3~5 변형)

| # | 상황 | 예시 | 수량 |
|---|------|------|------|
| C-1 | 교착/피로도 경고 | "같은 방향의 질문이 이어지고 있습니다" | 5건 |
| C-2 | 모순 토큰 피드백 (쟁점별) | "d-1에서 진술의 틈이 벌어지고 있다" | 4건 |
| C-3 | 공감 시도 피드백 (캐릭터별) | "박지연의 경계가 조금씩 풀리고 있다" | 4건 |
| C-4 | 증인 증언 깊이 안내 | "증인이 핵심까지는 아직 말하지 않고 있다" | 3건 |
| C-5 | 쟁점 발현 설명 (쟁점별) | "숨겨진 문제가 수면 위로 떠오르고 있다" | 4건 |

---

## 출력 형식

기존 ScriptedText JSON과 동일한 구조. `04-scripted-samples.json` 참고.

**채널별 JSON 파일로 분리하여 출력**:
- `output-A1-contradiction-pursuit.json`
- `output-A2-interjection.json`
- `output-A3-emotional-overload.json`
- `output-A4-evidence-discovery.json`
- `output-A5-trust-action.json`
- `output-A6-mediation.json`
- `output-B1-judge-question.json`
- `output-B2-judge-contradiction.json`
- `output-C-system-messages.json`

각 파일은 `{ "entries": [...] }` 형태.

**variant 구조**: 
```json
{
  "id": "{channel}-{party}-{disputeId}-{state}-v{n}",
  "text": "대사 텍스트",
  "behaviorHint": "연기 지시/감정 묘사",
  "tags": ["channel:{channel}", "speaker:{party}", ...]
}
```

**tags**: 기존 샘플과 동일한 태그 체계 사용 (04-scripted-samples.json 참고).

---

## 품질 기준

1. **번역체 9패턴 금지**: "~된 것으로 생각됩니다", "부득이하게" 등
2. **기계적 관찰문 금지**: "태도에 변화가 감지됩니다", "내용이 확인됩니다"
3. **재판관 직접 인용 금지**: NPC 발언을 따옴표로 넣지 않음 → 간접 참조
4. **호칭 규칙**: A→재판관 "재판관님", A→상대 "제 남편", B→상대 "제 아내"
5. **톤**: 재판관=합니다체, 당사자 간=반말, emotional/confession만 해요체 예외
6. **Truth Throttle 준수**: S0-S1에서는 구체적 금액/실명 숨김, S3+에서 공개

## 총 예상 수량
A(140건) + B(66건) + C(20건) = **약 226건**
