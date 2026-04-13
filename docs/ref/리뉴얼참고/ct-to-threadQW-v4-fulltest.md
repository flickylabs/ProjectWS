# CT → Thread QW: V4 통합 품질 검증 가이드

> 발신: CT (Control Tower)
> 수신: Thread QW (Quality Writing)
> 일시: 2026-04-13
> 유형: V4 ScriptedText 9채널 + 재판관 품질 통합 검증

---

## 검증 범위

spouse-01 기준. ScriptedText 기존 6채널 + V4 신규 9채널 = 15채널 전수 검증.
Vercel: https://solomon-mvp-pc.vercel.app

---

## 6축 검증 가이드 (기존 유지)

### 축 1: 의미 (Meaning)
- LieState 단계에 맞는 정보 수준인가?
- 해당 쟁점에 대한 답변인가?
- 심문 유형(사실추궁/동기탐색/공감접근)에 맞는 반응인가?

### 축 2: 내용 (Content)
- 사건 사실관계와 모순 없는가?
- 숨은 쟁점 해금 전 노출 없는가?
- 정보 비대칭 위반 없는가?

### 축 3: 맥락 (Context)
- 직전 질문/증거에 대한 답변으로 적절한가?
- 감정 흐름 자연스러운가?

### 축 4: 호칭 (Address)
- 부부 직접: 자기/자기야 (반말)
- 재판관에게: 제 남편/제 아내 (합니다체)
- 격앙 시: 이름! (이준호!/박지연!)

### 축 5: 존칭 (Formality)
- 당사자→재판관: 합니다체
- 부부 간: 반말
- 증인→재판관: 합니다체
- **절대 금지**: 반말 호칭 + 합니다체 조합

### 축 6: 어법 (Language Quality)
- 번역체 9패턴 0건
- 메타 누출 0건
- 조사 정확성
- 자연스러운 구어체

---

## V4 추가 축: 축 7 재판관 품질

> **이번 업데이트의 핵심 검증 항목**

### 7-1. 재판관 질문 금지 패턴
| 패턴 | 검출 시 FAIL |
|------|-------------|
| 직접 인용 `'${prev}'라고 하셨는데` | FAIL |
| 기계적 관찰 "태도에 변화가 감지됩니다" | FAIL |
| "내용이 확인됩니다" | FAIL |
| "흐름이 나타납니다" | FAIL |
| 번역체 "~된 것으로 생각됩니다" | FAIL |

### 7-2. 재판관 질문 품질
| 항목 | PASS 기준 |
|------|----------|
| depth 1~4 구체성 | 표면→구체→핵심→결정적 순서 |
| questionType 차별화 | fact=사실, motive=동기, empathy=감정 톤 구분 |
| 사건 맥락 | 오피스텔/영수증/적금 등 구체적 키워드 포함 |
| 간접 참조 | "아까 말씀하셨는데" (직접 인용 아님) |

### 7-3. 재판관 모순 추궁
| 톤 | 예시 | PASS 기준 |
|-----|------|----------|
| soft | "어느 쪽이 맞는 건지 정리해 주시겠습니까?" | 정리 요청 톤 |
| mid | "왜 말이 달라졌습니까?" | 추궁 톤 |
| hard | "어느 쪽이 진실입니까? 분명히 답하십시오." | 단호 톤 |

---

## 채널별 검증 항목

### 기존 6채널 (6축 검증)

| 채널 | 검증 포커스 |
|------|-----------|
| interrogation | 6축 전체, 특히 축1(의미) + 축5(존칭) |
| evidence_present | 축2(내용) — 증거 내용에 맞는 반응 |
| dossier | 축1(의미) — 결정적 질문에 맞는 답 |
| witness | 축3(맥락) — depth별 정보 수준 |
| aftermath | 축6(어법) — 서술체 + 담담한 톤 |
| system_message | 축6(어법) — 관찰자 톤 |

### V4 신규 9채널 (6축 + 7축)

| 채널 | entries | 검증 포커스 |
|------|---------|-----------|
| **contradiction_pursuit** | 16 | 축1(S1~S4 톤 에스컬레이션) + 축4(호칭) |
| **interjection** | 8 | 축3(맥락 — 상대 진술에 대한 반응) + 축5(반말/합니다체) |
| **emotional_overload** | 4 | 축3(감정 흐름) + 축6(자연스러움) |
| **evidence_discovery** | 12 | 축7(재판관 probe/capture 품질) + 축2(NPC slip 내용 정확성) |
| **trust_action** | 18 | 축1(action별 톤 차이) + 축5(분리심문=방어↓, 비공개=안도) |
| **mediation** | 6 | 축1(resultClass별 적절한 반응) + 축4(호칭) |
| **judge_question** | 24 | **축7 전면 적용** — depth/questionType/사건맥락 |
| **judge_contradiction** | 6 | **축7 전면 적용** — 직접인용 금지, 간접참조만 |
| **system_message_v2** | 8 | 축6(관찰자 톤) |

---

## 검증 방법

### 자동 스캔 (금지 패턴)
spouse-01.json ScriptedText에서 아래 패턴 grep:
```
"라고 하셨" / "내용이 확인" / "태도에 변화가 감지"
"흐름이 나타납니다" / "된 것으로 생각됩니다"
"(핵심)" / "(여성/청소년)" / "특정 X"
```

### 수동 검증 (품질)
1. https://solomon-mvp-pc.vercel.app 에서 spouse-01 풀 플레이스루
2. 각 채널의 대사가 발생하는 시점에서 6축+7축 체크
3. 특히 **모순 추궁 → 재판관 질문 → NPC 응답** 흐름의 자연스러움 집중

---

## 검증 보고 형식

```markdown
# Thread QW V4 품질 검증: spouse-01

## 채널별 결과

### interrogation (기존)
- 축1 의미: PASS
- 축2 내용: PASS
- 축3 맥락: PASS
- 축4 호칭: PASS
- 축5 존칭: PASS
- 축6 어법: PASS

### contradiction_pursuit (V4 신규)
- 축1 의미: PASS / FAIL (S별 톤 에스컬레이션)
- 축4 호칭: PASS / FAIL
- 축5 존칭: PASS / FAIL
- 축6 어법: PASS / FAIL
- [FAIL 시] 원문: "..." → 문제: ...

### judge_question (V4 신규)
- 축7-1 금지패턴: PASS / FAIL (건수)
- 축7-2 depth 차별화: PASS / FAIL
- 축7-3 questionType 차별화: PASS / FAIL
- 축7-4 사건 맥락 반영: PASS / FAIL

### judge_contradiction (V4 신규)
- 축7-1 금지패턴: PASS / FAIL
- 축7-3 톤 차별화: PASS / FAIL
- [FAIL 시] 원문: "..." → 문제: ...

...(나머지 채널)

## 종합 판정
- 기존 6채널: PASS / FAIL
- V4 9채널: PASS / FAIL
- 축7 재판관 품질: PASS / FAIL
- **최종: PASS / FAIL / CONDITIONAL**

## FAIL 항목 상세
1. [채널] [축] 원문: "..." → 문제: ...
2. ...

## 교정 방향 제안
1. ...
```

산출물: `tmp/thread-qw-v4-fulltest-report.md`

---

## PASS 기준

### PASS
- 기존 6채널: 6축 전체 PASS
- V4 9채널: 6축 + 축7 전체 PASS
- 금지 패턴 0건

### CONDITIONAL
- 경미한 WARN만 (축6 어법 minor)
- FAIL 0건

### FAIL
- 축1~5 FAIL 1건 이상
- 축7 금지 패턴 1건 이상
- 호칭/존칭 혼동 1건 이상
