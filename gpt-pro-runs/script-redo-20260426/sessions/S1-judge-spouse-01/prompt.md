# S1 — 재판관 4 채널 전면 재정비 (spouse-01)

## 작업 목표
**spouse-01의 재판관 4 채널 (judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon) 모든 variants를 자연체로 재정비**.

현재 변수 치환 패턴이 너무 명백 → 기계적 톤. 사용자 핵심 지적:
- ❌ **잘못 예시**: "박지연씨, 오피스텔 방문과 새벽전화 당시 다른 선택지를 생각해 보셨습니까?"
- ✅ **모범 예시**: "박지연씨, 오피스텔 방문과 새벽전화를 발견하고, 다른 방향의 생각을 해보시지는 않으셨습니까?"

차이:
- 잘못: "{사건} 당시 {질문}" 단순 변수 치환 + 사무체
- 모범: 자연어 시간 흐름 + 부드러운 반문 + 1차 정중

## 입력 source

| 파일 | 용도 |
|---|---|
| `01-case-spouse-01.json` | 사건 정의 (인물 / disputes / evidence / dossierCards / witnesses / combinationLab) |
| `02-scriptedText-spouse-01-judge.json` | **현재 재판관 4 채널 — 재작성 대상 (465 variants)** |
| `04-story-v2-3cases.md` | spouse 사건 핵심 스토리 (인물 archetype / 반전 구조) |
| `05-user-pattern-correction.md` | 사용자 모범 patch 4 (필수 적용) |
| `06-korean-quality-rules.md` | 호칭 / 톤 / Truth Throttle |
| `07-mistake-patterns.md` | 잘못 패턴 #1~#8 (절대 회피) |

## spouse-01 사건 핵심 (절대 충돌 금지)

### 인물
- **A 박지연** (36, 학원 데스크) — **victim_cosplay** (강한 단정 + 수치심 핑계)
- **B 이준호** (38, 가전매장) — **avoidant** (모호어, 회피)

### 반전 구조 핵심
1. 오피스텔에 친형+중2 조카딸. B가 새벽~밤 일하는 형의 조카 돌봄.
2. 시댁 갈등 두려움 때문에 B가 못 말함.
3. 공동 적금 3,000만 원 → A가 위임장 조작으로 해지 + 형에게 송금했다고 의심하나 실제로는 A가 투자 사기로 2,000만 원 손실.
4. 부부 합산 5,000만 원 증발. **숨긴 돌봄은 B 먼저, 비밀 송금은 A 먼저**.

### 5 disputes
- d-1: 외도 의심 (오피스텔 방문 / 새벽 전화)
- d-2: 이준호 비밀 송금 (외도성 vs 가족성)
- h-d3: 박지연 위임장 조작 (피해자 vs 가해자)
- h-d4: 5,000만 원 순서 (3,000 + 2,000 누가 먼저)
- (5 disputes — case data에서 확인)

### 7 evidences (subjectParty)
- e-1 영수증 묶음 (b)
- e-2 GPS 기록 (b)
- e-3 통화기록 (b)
- e-4 발신자 미상 문자 (b)
- e-5 개인 계좌 출금 (both)
- e-6 투자방 카톡 (a)
- e-7 공동 적금 해지 서류 (a)

### 3 witnesses (실명)
- w-1: **오피스텔 경비** (이름 없음 — "오피스텔 경비님" 호명)
- w-2: **은행 직원** ("은행 직원님" 호명)
- w-3: **박미라** ("박미라 씨" 호명)

⚠️ **재판관이 증인을 부를 때 "증인 씨" 절대 X**. 위 실명 사용.

## 채널별 작업 가이드

### A. judge_question (48 cells × 5v = 240 variants)
- key 패턴: `{disputeId}|{questionType}|{depth}` (예: `d-1|fact_pursuit|1`)
- questionType: fact_pursuit / motive_search / context_seeking / responsibility_probing
- depth 1~4 (얕음 → 깊음)

**모범 패턴**:
- ❌ "이준호 씨, 그 동선에 대해 답해 주십시오." (사무체 단조)
- ✅ "이준호 씨, 그 동선이 매일 같은 시각에 같은 곳으로 이어진 이유를 들려주시겠습니까."

**원칙**:
- 호칭 + 구체적 사실 인용 (변수 치환식 X)
- 자연어 시간 흐름 ("발견하고", "확인하면서", "보면서")
- 부드러운 반문 ("~지는 않으셨습니까", "~하지 않았는지 들려주시겠습니까")
- 정중한 합니다체 유지
- 5 variants 다양성 (의문형/평서형/강조점 변화)

### B. judge_contradiction (12 cells × 5v = 60 variants)
- key 패턴: `{disputeId}|{tone}` (soft / mid / hard)

**모범 패턴**:
- ❌ "박지연 씨, 진술 태도에 변화가 감지됩니다. 본래 사실을 말씀해 주십시오." (기계적 관찰문)
- ✅ "박지연 씨, 처음에는 외도가 확실하다는 주장이었는데 지금은 정황을 그렇게 읽었다는 의견입니다. 판단이 바뀐 이유를 말씀해 주십시오." (사용자 모범 patch 1)

**원칙**:
- **간접 인용 필수** (직접 인용 + 시스템 관찰 결합 절대 금지)
- 인지 단계 변화 명시 ("주장 → 의견", "확신 → 정황 해석")
- soft = 정리 요청 / mid = 추궁 / hard = 단호 핵심 요구
- 사용자 모범 patch 4 (인지 / 동기 / 직접 행동 / 동사형)

### C. judge_evidence_combo (24 cells × 5v = 120 variants) ★★★ 최우선 재정비
- key 패턴: `{dossierCardId}|{tone}` (예: `dc-1.b.q1|soft`)

**현재 잘못 (절대 금지)**:
- ❌ soft: "이 자료들을 함께 보겠습니다. {NPC}, {증거 함의} 설명해 주십시오."
- ❌ mid: "{증거이름1}과 {증거이름2}가 같은 방향입니다. {NPC}, 더 미루지 마십시오."
- ❌ hard: "이 조합의 뜻은 분명합니다. {NPC}, 지금 답하십시오."

**모범 방향**:
- ✅ soft: "이준호 씨, GPS와 형 문자 스레드를 같이 펼쳐 보겠습니다. 두 자료가 같은 시각, 같은 사람을 가리키는데 그 자리에 누가 있었는지 차분히 들려주시겠습니까."
- ✅ mid: "이준호 씨, GPS 좌표와 형의 문자 시각이 정확히 맞물립니다. 더는 가족 이야기를 빼두고 설명할 수 없습니다."
- ✅ hard: "이준호 씨, 두 자료가 한 사실을 가리키고 있습니다. 그 자리에 누가 있었는지 지금 답하십시오."

**원칙**:
- 두 증거의 **구체적 함의 본문**에 녹임 (단순 이름 나열 X)
- spouse-01 dossierCard 의미 정확 반영:
  - dc-1: 오피스텔의 사람들 (e-2 + e-4 → d-1, h-d4)
  - dc-2: 시댁 얘기만 나오면 싸움 (e-3 + e-4 → d-1)
  - dc-3: 3,000만 원의 권한 (e-4 + e-5 → h-d3)
  - dc-4: 2,000만 원의 수치 (e-6 → d-2)
  - dc-5: 5,000만 원의 순서 (e-5 + e-6 + e-7 → h-d4)
- soft → mid → hard 단계적 압박 강화 (단순 단어 교체 X)

### D. judge_witness_summon (9 cells × 5v = 45 variants)
- key 패턴: `{witnessId}|{tone}`

**원칙**:
- ⚠️ **증인 실명 사용 필수** (w-1 → "오피스텔 경비님", w-2 → "은행 직원님", w-3 → "박미라 씨")
- "증인 씨" 절대 X
- 5 variants 다양성

## 9차원 검토 가이드 (모든 variants)

각 variant 작성 시:

1. **모순/추궁의 종류** — 사실 / 입장 / 인지 단계 변화
2. **NPC archetype 톤 무게** — 박지연 victim_cosplay 강한 단정 vs 이준호 avoidant 모호어
3. **lieState 단계** (judge_question은 NPC lieState 무관, judge_contradiction은 NPC lieState 영향)
4. **추궁 강도** (soft/mid/hard) — 의미는 첨예하지만 형식은 단계적
5. **NPC 마지막 발언 맥락** — 직접 인용 X but 본질 정확히 짚기
6. **인지 변화 단계** — "확실 → 정황 해석 → 인정"
7. **재판관 호칭 규칙** — "박지연 씨" / "이준호 씨" / 증인 실명
8. **합니다체 유지**
9. **간접 인용**

## 사용자 모범 patch 4 (필수 일관 적용)

| Patch | 잘못 → 보정 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "가족 돌봄으로" → "가족을 돌본 것이라고" (명사형 → 동사형) |

## 출력 포맷

`output/judge-rewrite-spouse-01.json`:

```json
{
  "caseId": "spouse-01",
  "session": "S1-judge-rewrite",
  "generatedAt": "2026-04-26T...",
  "version": "v1",
  "channels": {
    "judge_question": {
      "entries": [
        {
          "key": "d-1|fact_pursuit|1",
          "party": "...",
          "disputeId": "d-1",
          "questionType": "fact_pursuit",
          "tone": "..." (있으면),
          "variants": [
            {
              "id": "judgeq-d-1-fact_pursuit-1-v1",
              "text": "{재작성된 자연체 본문}",
              "behaviorHint": "{보존 또는 톤에 맞게 조정}",
              "tags": [/* 보존 */]
            },
            ... (5 variants)
          ]
        },
        ... (48 cells)
      ]
    },
    "judge_contradiction": { "entries": [...] },
    "judge_evidence_combo": { "entries": [...] },
    "judge_witness_summon": { "entries": [...] }
  }
}
```

각 entry는 기존 key + 모든 메타 필드 (party / disputeId / lieState / questionType / tone 등) 보존.
variants 배열의 각 변형은 기존 id 유지 + text 새로 작성 + behaviorHint / tags 보존.

## 검증 체크리스트 (제출 전)

- [ ] 변수 치환 패턴 ("{NPC}, {X} 설명해 주십시오") 0건
- [ ] judge_evidence_combo가 두 증거의 구체적 함의 본문에 녹음
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 9차원 모두 반영
- [ ] **증인 호칭 실명 ("오피스텔 경비님" / "은행 직원님" / "박미라 씨")**, "증인 씨" 0건
- [ ] 호칭 "박지연 씨" / "이준호 씨" (제 아내/남편 X)
- [ ] 합니다체 유지
- [ ] 직접 인용 + 시스템 관찰 결합 0건
- [ ] 사건 핵심 사실 (조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기) 정확
- [ ] 5 variants 다양성 (의미 같지만 표현 변화)

## 작업 우선순위

1. **judge_evidence_combo 24 cells** (가장 시급)
2. judge_contradiction 12 cells (모순 추궁 — 사용자 모범 4 핵심)
3. judge_question 48 cells (다양성)
4. judge_witness_summon 9 cells (증인 실명 fix + 다양성)
