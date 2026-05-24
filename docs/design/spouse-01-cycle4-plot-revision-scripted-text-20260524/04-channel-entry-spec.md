# 04. 채널별 entry 작성 명세

본 의뢰서가 작성 요청하는 KO base entry의 정확한 명세. 각 entry는 `src/data/scriptedText/spouse-01.json` 의 `channels.{channelName}.entries[]` 배열에 추가됨.

**entry 형식 (모든 entry 공통)**

```json
{
  "key": "{party}|h-d4|{lieState}|{questionType}",
  "party": "a|b",
  "disputeId": "h-d4",
  "lieState": "S0|S1|S2|S3|S4|S5",
  "questionType": "fact_pursuit|motive_search|empathy_approach|evidence_query|contradiction_press|witness_call",
  "stanceHint": "deny|partial|truthful|...",
  "truthLevel": "none|partial|full",
  "variants": [
    {
      "id": "{party}-h-d4-{lieState}-{questionType}-v{N}",
      "text": "KO 텍스트",
      "behaviorHint": "행동 묘사 (1문장)",
      "tags": [ "channel:{name}", "speaker:{party}", "..." ],
      "sourceRefs": [ "dispute:h-d4" ]
    }
  ]
}
```

**tags 영역**: 기존 h-d3 entry의 tags를 그대로 복사하되 `dispute:h-d3` → `dispute:h-d4`로 변경. callTerm/judgeAddress 등 호칭 영역은 그대로 유지.

---

## Batch 1 — `interrogation` 채널 (24 entry 목표)

가장 핵심 채널. NPC가 재판관에게 답변하는 형식. S0~S5 × A/B × 2 questionType.

| # | key | party | lieState | questionType | text guideline |
|---|---|---|---|---|---|
| 1 | `a\|h-d4\|S0\|fact_pursuit` | a | S0 | fact_pursuit | A는 비자금 사용처 = 형으로 확정. 다른 목적은 모름 frame. truthStages.S0.a.allowedKeywords 영역. |
| 2 | `a\|h-d4\|S0\|motive_search` | a | S0 | motive_search | A는 동기 영역에서도 형 외 다른 목적 부정. |
| 3 | `b\|h-d4\|S0\|fact_pursuit` | b | S0 | fact_pursuit | B는 "그냥 모은 돈" frame strict. 사용처 = 형. |
| 4 | `b\|h-d4\|S0\|motive_search` | b | S0 | motive_search | B는 동기 영역에서 "그냥 모았다" 회피. |
| 5 | `a\|h-d4\|S1\|fact_pursuit` | a | S1 | fact_pursuit | A는 "왜 그렇게 오래 모았지" 의문 자문. 10년 누적의 다른 이유 가능성 인정. |
| 6 | `a\|h-d4\|S1\|evidence_query` | a | S1 | evidence_query | A는 증거(e-5의 10년 누적 패턴)로 묻는 단계. |
| 7 | `b\|h-d4\|S1\|fact_pursuit` | b | S1 | fact_pursuit | B는 "원래는 형 일과 별개로 모았다" 인정. 진짜 목적은 회피. |
| 8 | `b\|h-d4\|S1\|evidence_query` | b | S1 | evidence_query | B는 증거 영역 회피적 답변. |
| 9 | `a\|h-d4\|S2\|fact_pursuit` | a | S2 | fact_pursuit | A는 e-8/e-9 영역 인정. "형 일과 다른 영역"이라는 점 받아들임. 외도 의심도 한때 했으나 frame 변화. |
| 10 | `a\|h-d4\|S2\|evidence_query` | a | S2 | evidence_query | A는 e-8/e-9 evidence 직접 질의. |
| 11 | `b\|h-d4\|S2\|fact_pursuit` | b | S2 | fact_pursuit | B는 휴대폰 검색 + 보험 상담 본인 것 인정. "가입까지 가지 않았다." 용도는 회피. |
| 12 | `b\|h-d4\|S2\|evidence_query` | b | S2 | evidence_query | B는 e-8/e-9 evidence 영역 답변. |
| 13 | `a\|h-d4\|S3\|motive_search` | a | S3 | motive_search | A는 "그 사람이 그걸 혼자 알아봤었구나" 단계. 출산 관련 조사 사실 받아들임. |
| 14 | `a\|h-d4\|S3\|empathy_approach` | a | S3 | empathy_approach | A는 empathy 영역 — 남편의 혼자 조사 인지. |
| 15 | `b\|h-d4\|S3\|motive_search` | b | S3 | motive_search | B는 "혼자라도 알아봐야 했다" 단계. 의사 친구 + 보험 상담 + 가입 없음 + 부담 회피 동기 인정. **난임/치료비 키워드 X**. |
| 16 | `b\|h-d4\|S3\|empathy_approach` | b | S3 | empathy_approach | B는 empathy 영역 — 아내 부담 회피 동기. |
| 17 | `a\|h-d4\|S4\|empathy_approach` | a | S4 | empathy_approach | A는 "그 화제는 내가 닫아 둔 거였다" 단계. 본인 화제 회피 책임 인정. 난임 진단 영역 직접 언급 OK. |
| 18 | `a\|h-d4\|S4\|motive_search` | a | S4 | motive_search | A는 동기 영역에서 본인 회피 동기 진술. |
| 19 | `b\|h-d4\|S4\|empathy_approach` | b | S4 | empathy_approach | B는 "치료비" 단어 처음 꺼냄. 본 목적 명시. |
| 20 | `b\|h-d4\|S4\|motive_search` | b | S4 | motive_search | B는 동기 영역에서 아내 부담 회피 동기 진술. |
| 21 | `a\|h-d4\|S5\|fact_pursuit` | a | S5 | fact_pursuit | A는 두 사람의 침묵을 한 묶음으로 진술. 부부 침묵의 한 축 + 회피의 책임 명시. |
| 22 | `a\|h-d4\|S5\|empathy_approach` | a | S5 | empathy_approach | A는 empathy 영역에서 남편 침묵의 무게 직접 받아들임. |
| 23 | `b\|h-d4\|S5\|fact_pursuit` | b | S5 | fact_pursuit | B는 "그 돈은 처음엔 당신을 위한 거였다" 진술. 신혼 초기 + 의사 친구 + 보험 + 가입 없음 + 형 전환 모두 인정. |
| 24 | `b\|h-d4\|S5\|empathy_approach` | b | S5 | empathy_approach | B는 empathy 영역에서 침묵 + 단독 결정의 무게 진술. |

각 entry당 **2~3 variant**. 즉 24 entry × 2 variant = ~48~72 variant.

---

## Batch 2 — `judge_question` 채널 (16 entry)

재판관이 NPC에게 던지는 질문. 표면만 (isSurfaceOnly: true).

| # | key | party | lieState | text guideline |
|---|---|---|---|---|
| 1~16 | `judge\|h-d4\|S{0~5}\|{party}\|{angle}` | judge → a/b | S0~S5 | 비자금의 원래 목적 / 10년 누적 패턴 / 신규 증거 영역 질문. **단계별 forbiddenKeywords 절대 X**. |

각 entry당 1~2 variant. 표면 텍스트만 — 진실 keyword 등장 X.

**S2 이상에서만 dossier-surface / e-8·e-9 영역 언급 OK.**

---

## Batch 3 — `judge_evidence_combo` 채널 (6 entry)

e-8 + e-9 결합으로 dc-8 부상 시 재판관 발화.

| # | key | text guideline |
|---|---|---|
| 1 | `judge\|h-d4\|S2\|combo\|e-8+e-9\|v1` | 재판관이 "휴대폰 검색 기록과 보험 견적이 같은 시기·같은 영역으로 모입니다. 본 자료들이 형 사정과 분리된 영역을 가리키는지 검토합니다." |
| 2 | `judge\|h-d4\|S2\|combo\|e-8+e-9\|v2` | variant 2 (다른 어조) |
| 3 | `judge\|h-d4\|S3\|combo\|e-8+e-9\|v1` | S3 단계 — 자료 본질 직접 질의 |
| 4~6 | ... | 단계별 variant |

---

## Batch 4 — `evidence_present` 채널 (16 entry)

e-8, e-9를 NPC에게 제시 시 NPC 반응. 각 evidence × 2 party × S0~S2 (또는 S3까지).

| # | key | evidence | party | lieState | text guideline |
|---|---|---|---|---|---|
| 1~4 | `b\|e-8\|S{0~3}\|evidence_present` | e-8 | b | S0~S3 | B가 e-8 제시받고 단계별 반응 (S0 부정 → S3 인정) |
| 5~8 | `a\|e-8\|S{0~3}\|evidence_present` | e-8 | a | S0~S3 | A가 e-8 제시받고 외도 frame 시작 → S3 출산 조사 frame 인정 |
| 9~12 | `b\|e-9\|S{0~3}\|evidence_present` | e-9 | b | S0~S3 | B가 e-9 제시받고 단계별 반응 |
| 13~16 | `a\|e-9\|S{0~3}\|evidence_present` | e-9 | a | S0~S3 | A가 e-9 제시받고 단계별 반응 |

---

## Batch 5 — `dossier` 채널 (6 entry)

dc-8 단서 카드 영역. linked dispute h-d4 / linked party b. 도시에 시스템 발화 + B 측 challenges.

| # | key | text guideline |
|---|---|---|
| 1 | `dossier\|dc-8\|noteText\|v1` | dc-8 noteText 본문 (시스템 영역 — 권위 텍스트는 이미 case.ts에 정의됨, 자연성 polish만) |
| 2 | `dossier\|dc-8\|judgeHint\|v1` | 재판관이 e-8+e-9 결합으로 부상 시 발화 |
| 3 | `b\|dc-8.b.q1\|S3\|v1` | dc-8.b.q1 (책임 영역 질문) — 재판관 발화 (text 권위는 case.ts에 정의) |
| 4 | `b\|dc-8.b.q1\|S3\|response\|v1` | B의 q1 응답 |
| 5 | `b\|dc-8.b.q2\|S4\|v1` | dc-8.b.q2 (동기 영역 질문) |
| 6 | `b\|dc-8.b.q2\|S4\|response\|v1` | B의 q2 응답 |

---

## Batch 6 — `contradiction_pursuit` 채널 (6 entry)

h-d4 모순 추궁 영역. 재판관이 NPC의 진술 모순을 추궁.

| # | key | text guideline |
|---|---|---|
| 1 | `b\|h-d4\|S1\|contradiction\|v1` | B "원래는 형 일과 별개로 모았다" + S0에서 "그냥 모은 돈"이라 한 모순 추궁 |
| 2 | `b\|h-d4\|S2\|contradiction\|v1` | B의 검색/보험 영역 인정과 S0/S1 부정의 모순 |
| 3 | `b\|h-d4\|S3\|contradiction\|v1` | B의 혼자 조사 인정 + S2의 "그냥 알아본 정도"의 모순 |
| 4~6 | ... | A 측 모순 또는 단계별 variant |

---

## Batch 7 — `mediation` 채널 (2 entry, S4)

h-d4 S4 mediation 영역. 양 당사자 화해/책임 분담 영역.

| # | key | text guideline |
|---|---|---|
| 1 | `mediation\|h-d4\|S4\|v1` | 재판관 mediation 발화 — 침묵의 두 축 (B 독단 + A 회피) 분리 |
| 2 | `mediation\|h-d4\|S4\|v2` | variant 2 |

---

## Batch 8 — `aftermath` 채널 (2 entry, S5)

h-d4 S5 aftermath 영역.

| # | key | text guideline |
|---|---|---|
| 1 | `aftermath\|h-d4\|S5\|v1` | 사건 종결 후 두 당사자 회상 영역 — 비자금 원래 목적 + 부부 침묵 정리 |
| 2 | `aftermath\|h-d4\|S5\|v2` | variant 2 |

---

## Batch 9 — `judge_witness_summon` 채널 (옵션, 2 entry)

본 사건 witness 3명 (w-1 오피스텔 경비 / w-2 은행 직원 / w-3 박미라)이 모두 다른 dispute link. h-d4와 직접 link되는 witness는 없음.

**옵션 1**: 의사 친구나 보험사 상담원을 신규 witness로 추가? — **본 의뢰서 영역 외 (case.ts 변경 필요)**. 작성 X.

**옵션 2**: 기존 witness 영역 link 확장 없이 channel entry도 생략. 작성 X.

→ **Batch 9는 작성 X. 영역 외.**

---

## 합계

| Batch | 채널 | entry 수 | variant 수 (entry × 2) |
|---|---|---|---|
| 1 | interrogation | 24 | 48~72 |
| 2 | judge_question | 16 | 16~32 |
| 3 | judge_evidence_combo | 6 | 6~12 |
| 4 | evidence_present | 16 | 16~32 |
| 5 | dossier | 6 | 6~12 |
| 6 | contradiction_pursuit | 6 | 6~12 |
| 7 | mediation | 2 | 2~4 |
| 8 | aftermath | 2 | 2~4 |
| **합계** | **8 채널** | **78 entry** | **~102~180 variant** |

---

## 작성 우선순위

1. **Batch 1 (interrogation)** — 가장 핵심. NPC 1인칭 발화 전체.
2. **Batch 5 (dossier)** — dc-8 영역. case.ts에 정의된 텍스트가 권위. polish만.
3. **Batch 4 (evidence_present)** — e-8/e-9 제시 시 반응.
4. **Batch 2 (judge_question)** — 재판관 표면 질문.
5. **Batch 6 (contradiction_pursuit)** — 단계 전환 영역.
6. **Batch 3 (judge_evidence_combo)** — dc-8 부상 시 발화.
7. **Batch 7~8 (mediation / aftermath)** — 후반 단계.

각 batch를 별도 thread로 의뢰 권장 (GPT Pro 3 스레드 병렬 패턴 가능).
