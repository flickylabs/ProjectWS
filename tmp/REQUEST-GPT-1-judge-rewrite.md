# GPT Pro 의뢰 — 재판관 스크립트 전면 재정비 (3 사건 4 채널)

## 작업 목표
**3 사건의 재판관 채널 4개 (judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon) 모든 variants를 자연체로 재정비**

현재 변수 치환 패턴이 너무 명백해서 기계적 톤. 사용자 핵심 지적:
- **잘못 예시**: "박지연씨, 오피스텔 방문과 새벽전화 당시 다른 선택지를 생각해 보셨습니까?"
- **모범 예시**: "박지연씨, 오피스텔 방문과 새벽전화를 발견하고, 다른 방향의 생각을 해보시지는 않으셨습니까?"

차이:
- 잘못: "{사건} 당시 {질문}" 단순 변수 치환 + 사무체
- 모범: 시간 흐름 자연어 + 부드러운 반문 + 1차 정중

## 대상 데이터

### 3 사건 4 채널 통계
| 사건 | judge_question | judge_contradiction | judge_evidence_combo | judge_witness_summon | 합계 |
|---|---|---|---|---|---|
| spouse-01 | 48 cells / 240v | 12 cells / 60v | 24 cells / 120v | 9 cells / 45v | 93 cells / 465v |
| family-01 | 48 cells / 240v | 12 cells / 60v | 33 cells / 165v | 9 cells / 45v | 102 cells / 510v |
| friend-01 | 48 cells / 240v | 12 cells / 60v | 27 cells / 135v | 9 cells / 45v | 96 cells / 480v |
| **합계** | **144 cells** | **36 cells** | **84 cells** | **27 cells** | **291 cells / 1,455v** |

각 cell당 5 variants, 총 **1,455 variants** 재정비 대상.

### 데이터 위치
- spouse-01: `src/data/scriptedText/spouse-01.json` channels.{judge_question,judge_contradiction,judge_evidence_combo,judge_witness_summon}
- family-01: `src/data/scriptedText/family-01.json` (동일)
- friend-01: `src/data/scriptedText/friend-01.json` (동일)

### Cell 구조
```json
{
  "key": "d-1|fact_pursuit|1",  // 또는 "d-1|soft" / "dc-1.b.q1|soft" / "w-1|soft"
  "variants": [
    { "id": "...", "text": "...", "behaviorHint": "...", "tags": [...] }
  ]
}
```

## 사건별 핵심 설정 (절대 충돌 금지)

### spouse-01 — 새벽 통화기록
- **A 박지연** (36, 학원 데스크) — victim_cosplay
- **B 이준호** (38, 가전매장) — avoidant
- 핵심 사실: B가 새벽~밤 형 빚 갚으려 일하는 형의 조카(중2)를 돌봐주고 있었음. 시댁 갈등 두려움 때문에 못 말함.
- A는 외도 의심으로 공동 적금 3,000만 원을 위임장 조작으로 해지 + 형에게 송금 추정 → 실제로는 **A가 투자 사기로 2,000만 원 손실**
- 부부 합산 5,000만 원 증발. 숨긴 돌봄은 B 먼저, 비밀 송금은 A 먼저.

### family-01 — 치매 어머니의 유서
- **A 윤태성** (48, 주방가구 공장 대표) — confrontational
- **B 윤정후** (44, 자동차부품 가게) — affect_flattening
- 핵심 사실: 원본 유서 = B 90% / A 10%. **B가 자기 몫을 줄여서 A 40% / B 60%로 변경**.
- 이유: B는 A의 출생 비밀(둘 다 배다른 자식 — A가 회사 대표라 노출 시 경영권 위기)을 알고 있었음. 60:40이면 형이 법정 안 가서 비밀 안 터질 거라고 판단.
- B가 어머니 통장에 20년간 매달 80~150만 원 보탰음 + 형 공장 부도 시 1억 넘는 돈 대신 막음.
- ⚠️ **반대 비율 절대 금지**: A 60 / B 40 패턴 사용 X. 사실은 A 40 / B 60.

### friend-01 — 손절한 절친
- **A 송다은** (31, 온라인 쇼핑몰 CS) — premature_summary
- **B 최수민** (31, 필라테스 강사) — affect_flattening
- 핵심 사실: A의 예비신랑이 B에게 찝적댐 (술자리 후 연락 등). B는 "A 남자친구잖아, 하지 마"로 선 그음.
- B가 예비신랑에게 연락한 진짜 이유: **A 아버지가 예비신랑에게 돈 갈취 접근 정황 포착** (물증 X).
- 과거 손절 사건도 A 아버지가 B에게 사기 친 것이 원인. B는 차마 못 말하고 A는 "B가 돈 때문에 변했다"고 오해.

## 채널별 자연체 가이드

### A. judge_question (정중 질문)
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

### B. judge_contradiction (모순 추궁)
- key 패턴: `{disputeId}|{tone}` (예: `d-1|soft` / `mid` / `hard`)
- tone: soft / mid / hard

**모범 패턴**:
- ❌ "박지연 씨, 진술 태도에 변화가 감지됩니다. 본래 사실을 말씀해 주십시오." (기계적 관찰문)
- ✅ "박지연 씨, 처음에는 외도가 확실하다는 주장이었는데 지금은 정황을 그렇게 읽었다는 의견입니다. 판단이 바뀐 이유를 말씀해 주십시오." (사용자 모범 patch 1)

**원칙**:
- **간접 인용 필수** (직접 인용 + 시스템 관찰 결합 절대 금지)
- 인지 단계 변화 명시 ("주장 → 의견", "확신 → 정황 해석")
- soft = 정리 요청 / mid = 추궁 / hard = 단호 핵심 요구

### C. judge_evidence_combo (증거 조합 발동 시 — ★최우선 재정비 대상)
- key 패턴: `{dossierCardId}|{tone}` (예: `dc-1.b.q1|soft`)
- 현재 가장 변수 치환 패턴이 심함

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
- 사건별 dossierCard 의미 정확 반영 ("dc-1 오피스텔의 사람들", "dc-3 3,000만 원의 권한" 등)
- soft → mid → hard 단계적 압박 강화 (단순 단어 교체 X)

### D. judge_witness_summon (증인 소환)
- key 패턴: `{witnessId}|{tone}`
- 현재 톤은 OK이나 5 variants 다양성 부족

**모범 방향**:
- ✅ "오피스텔 경비를 부르겠습니다. 그 시각, 그 차량이 어떻게 드나들었는지 직접 듣겠습니다."

## 9차원 검토 가이드 (모든 variants)

각 variant 작성 시 다음 9차원 모두 반영:

1. **모순/추궁의 종류** — 사실 / 입장 / 인지 단계 변화
2. **NPC archetype 톤 무게** — victim_cosplay 강한 단정 vs avoidant 모호어
3. **lieState 단계** (S0~S5) — S1 모순 vs S3 모순 톤 다름
4. **추궁 강도** (soft/mid/hard) — 의미는 첨예하지만 형식은 단계적
5. **NPC 마지막 발언 맥락** — 직접 인용 X but 본질 정확히 짚기
6. **인지 변화 단계** — "확실 → 정황 해석 → 인정" / "오해 → 사정 → 자백"
7. **재판관 호칭 규칙** — 당사자 → "OOO 씨" (절대 "제 아내/남편" X)
8. **합니다체 유지** — emotional/confession beat만 해요체 예외
9. **간접 인용** — "아까는 ~쪽으로 말씀하셨는데" (직접 인용 X)

## 사용자 모범 patch 4 (적용 일관)

| Patch | 잘못 → 보정 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기 추궁) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "가족 돌봄으로" → "가족을 돌본 것이라고" (명사형 → 동사형 자연체) |

## 메인 잘못 패턴 #1~#8 (절대 회피)

1. Agent 보고 무비판 수용 X — 데이터 직접 read 검증
2. 임의 이름/정보 작성 X
3. 다른 사건 정보 혼입 X
4. 신규 작성 vs 보완 혼동 X
5. 사용자 detail 메시지 = 항상 보완 방향
6. **보정 = 9차원 맥락-의미 정확성** (단순 어휘 교체 X)
7. 단순 확인 질문에 옵션 제시 X
8. **사건 설정 일치 검증** — 비율/금액/날짜/인물 관계 사용자 메모와 정확 일치

## 출력 포맷

### 산출물 1: `judge-rewrite-spouse-01.json`
```json
{
  "caseId": "spouse-01",
  "channels": {
    "judge_question": { "entries": [/* 48 cells × 5 variants 모두 재작성 */] },
    "judge_contradiction": { "entries": [/* 12 × 5 */] },
    "judge_evidence_combo": { "entries": [/* 24 × 5 */] },
    "judge_witness_summon": { "entries": [/* 9 × 5 */] }
  }
}
```

### 산출물 2: `judge-rewrite-family-01.json` (동일 형식)
### 산출물 3: `judge-rewrite-friend-01.json` (동일 형식)

각 entry는 기존 key + 모든 메타 필드 (party / disputeId / lieState / questionType / tone 등) 보존.
variants 배열의 각 변형은 기존 id 유지 + text 새로 작성 + behaviorHint / tags 보존 (필요시 톤 맞게 조정).

## 검증 체크리스트 (제출 전 확인)

- [ ] 변수 치환 패턴 ("{NPC}, {X} 설명해 주십시오") 0건
- [ ] judge_evidence_combo가 두 증거의 구체적 함의 본문에 녹음 (단순 이름 나열 X)
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 9차원 모두 반영
- [ ] family-01 비율 A 40 / B 60 (절대 반대 X)
- [ ] friend-01 사건 설정 (예비신랑 / 아버지 돈 갈취 / B 출생 비밀 X) 정확
- [ ] spouse-01 사건 설정 (조카 돌봄 / 시댁 갈등 / 형 빚) 정확
- [ ] 모든 호칭 "OOO 씨" (제 아내/남편 X)
- [ ] 합니다체 유지 (emotional/confession 외)
- [ ] 직접 인용 + 시스템 관찰 결합 0건

## 작업 우선순위

1. **judge_evidence_combo 84 cells** — 가장 시급 (변수 치환 패턴 100%)
2. judge_question 144 cells — 일부 단조 변수 치환
3. judge_contradiction 36 cells — 자연체이나 사용자 모범 4 patch 미적용
4. judge_witness_summon 27 cells — 톤 OK이나 다양성 부족
