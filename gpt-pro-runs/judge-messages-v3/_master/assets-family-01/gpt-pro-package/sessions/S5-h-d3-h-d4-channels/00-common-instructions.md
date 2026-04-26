# 공통 작성 기준 (모든 세션 적용)

## 1. 사건 개요 — family-01

**caseId**: family-01 (case-family-01)
**title**: 치매 어머니의 유서

**anchorTruth**:
> 유서를 직접 손댄 건 분명히 B다. 하지만 그 조작은 자기 몫을 줄인 조작이고, 20년간 형과 어머니를 몰래 떠받쳐 온 것도 B다.

**emotionalBait**: 배다른 동생을 평생 못마땅해하던 윤태성은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다.

### 5 disputes
| dispute | 쟁점 | A 책임 | B 책임 | 비고 |
|---|---|---|---|---|
| d-1 | 유서 작성과 판단 능력 | 30 | 70 | initial |
| d-2 | 60:40 유서의 진짜 의도 | 15 | 85 | hidden, B의 d-1 ≥ S3 → 열림 |
| d-3 | 20년 송금의 실체 | (TBD) | (TBD) | 추가 unlockCondition |
| d-4 | 출생 비밀과 침묵의 이유 | (TBD) | (TBD) | 추가 unlockCondition |
| d-5 | 어머니 이용의 진짜 주체 | (TBD) | (TBD) | 추가 unlockCondition |

(d-3 ~ d-5 정확 책임 배분은 `04-case-family-01.json` `disputes[].correctResponsibility` 참조)

### 7 evidence (e-1 ~ e-7)
정확 정의: `04-case-family-01.json` top-level **`evidence` 필드 (단수형 — spouse-01의 `evidences` 복수형과 다름)** + ScriptedText의 evidence_present 키 분포 참조.

각 evidence의 `subjectParty / requiredLieState / investigationStages / partyContext` 정보는 source 04 파일 직접 read.

### 캐릭터
- **윤태성 (party A)**: 48세, 주방가구 공장 대표, archetype **confrontational**, fear: **장남 정체성 무너짐**
  - verbalTells: rank_pull / character_attack / volume_escalation
  - callTerms: toPartner "정후야" / toJudge "제 동생" / angry "윤정후!"
- **윤정후 (party B)**: 44세, 자동차부품 가게 운영, archetype **affect_flattening**, fear: **형이 출생 비밀을 알게 되는 것**
  - verbalTells: flat_deflection / silence_shield / delayed_crack
  - callTerms: toPartner "형" / toJudge "저희 형" / angry "윤태성!"

### 증인 3종
- **w-1 최복순** (61, 전 요양보호사, neutral, sentimentToB: 10): d-1 관련, dc-1 해금. addressA "큰아들분" / addressB "작은아들분". hiddenAgenda: 요양보호사 교체 과정에서 자기 책임 불거질까 조심
- **w-2 김영수** (57, 공증사무실 직원, neutral): d-2 관련, dc-3 해금. addressA "큰아들분" / addressB "서류 제출자분". hiddenAgenda: 공증 절차상 확인 부족이 불거질까 선 그음
- **w-3 박순애** (69, 어머니 친구, **pro_a 편향 sentimentToA: 20**): d-3, d-5 관련, dc-2/dc-5 해금. addressA "태성이" / addressB "정후"
  - **⚠️ 박순애는 어머니 친구 — 출생 비밀을 자기도 알고 있었는지 모호하게 넘김**

### DossierCard 5장 (총 11 dossier question — spouse 8보다 많음)
파일: `07-dossier-cards.json`

| id | name | evidence | relatedDispute | subjectParty | 질문 |
|---|---|---|---|---|---|
| dc-1 | 말년의 종이 | e-1, e-2, e-3 | d-1 | b | b q1, b q2 |
| dc-2 | 줄인 유서 | e-4, e-5 | d-2 | b | b q1, b q2 |
| dc-3 | 20년의 돈 | e-5, e-6 | d-3 | b | b q1, b q2 |
| dc-4 | 감춘 이유 | e-6, e-7 | d-4 | b | b q1, b q2 |
| dc-5 | 어머니의 뜻 | e-1, e-6, e-7 | d-5 | both | a q1, b q1, b q2 |

---

## 2. 9차원 맥락 매핑 (모든 entries 작성 시)

| 차원 | 값 | 출처 |
|---|---|---|
| 쟁점 | d-1 / d-2 / h-d3 / h-d4 | structure-v2 |
| 캐릭터 | a (박지연) / b (이준호) | character-info |
| lieState | S0 (완전 부정) / S1 (일부 인정) / S2 (핑계) / S3 (책임 전가) / S4 (감정적) / S5 (자백) | atoms |
| emotion | cautious / measured / shaken / resigned / guarded / defensive | tag |
| rapport | (신규 차원) low / mid / high / open — 임계점 +15/+30/+50 | game-events transitionBeats |
| contradict_token | (신규 차원) 0 / 1 / 2 / 3+ | game-events-v2 contradictions 16건 |
| q_type | fact_pursuit / motive_search / empathy_approach | interrogation entry meta |
| tone | soft / mid / hard | judge_contradiction 외 신규 적용 |
| 시점 | tense:present (단일) | tag |

---

## 3. 보정 톤 8원칙 (Knowledge: `02-tone-guide.md` 참조)

1. 호칭 존칭 강화 — "OOO 씨" / "아내분" / "남편분" (절대 "부인" X)
2. 위협 결과 명시화 — 추상 → 법적 결정 표현
3. 의지 명확화 — 단정형 → 재판관 의지
4. 추상 → 행동 지칭
5. 우회 압박 (가정형 양보 + 본질 추궁)
6. 위협 부드러우면서 강하게
7. 자연체 어미 일부 허용
8. 패턴 행동 지적

### 절대 금지 번역체 9패턴
- "~된 것으로 생각됩니다" / "~인 측면이 있" / "부득이하게" / "사전 상의/협의" (S0~S2) / "미리 말씀드리지 못한" / "특정 X" 패턴 / "~만을" / "~에 대해서" 남발 / "~을 통하여"

### 시스템 메시지 톤
- ❌ "태도에 변화가 감지됩니다" / "내용이 확인됩니다" / "흐름이 나타납니다"
- ✅ 자연어 narrative ("진술이 달라지기 시작한다")

### 직접 인용 금지
- ❌ `'${prev}'라고 하셨는데, '${curr}'라는 내용이 확인됩니다`
- ✅ "아까는 ~쪽으로 말씀하셨는데, 지금은 ~. 왜 달라졌습니까?" (간접 인용)

---

## 4. 잘못 패턴 #6 모범 (메인-사용자 검증 4 patch)

### 핵심 원칙: 단순 표현 교체 X — **9차원 맥락-의미 정확성** 살리기

| Patch | 잘못 패턴 | 보정 방향 |
|---|---|---|
| 1 | "쪽이었는데/쪽입니다" 약한 단어 | "주장이었는데/의견입니다" — 인지 단계 단계적 약화 정확 반영 |
| 2 | "무엇을 알고 무엇을 밀어붙였습니까" 정보 추궁 | "왜 그렇게 확신하고 밀어붙였습니까" — **동기/심리 추궁** (더 깊은 차원) |
| 3 | "흐리면" 추상 / "본 방식과 본 뒤의 행동" 어색 | "밝히지 않으면" 직접 행동 / "관련내용" 자연 일반화 |
| 4 | "가족 돌봄으로/가족 지원이었다고" 명사형 | "가족을 돌본 것이라고/가족을 도운 것이었다고" — **동사형 자연체** |

### 점검 차원
1. 모순의 종류 (사실 변화 / 입장 변화 / 인지 단계 변화)
2. NPC archetype 표현 무게 (박지연 victim의 단정 / 이준호 avoidant의 모호어)
3. lieState 단계 (S1 모순 vs S3 모순 톤 차이)
4. 추궁 강도 (soft/mid/hard 외 의미의 첨예함)
5. NPC 마지막 발언 맥락 (직접 인용 X but 본질 정확히 짚기)
6. 인지 변화 단계 표현 ("확실 → 정황 해석 → 인정" / "오해 → 사정 → 자백")

---

## 5. 호칭 규칙

- **재판관 → 당사자**: "박지연 씨", "이준호 씨" — 합니다체
- **재판관이 양측 언급**: "아내분"/"남편분" (또는 "OOO 씨")
- **당사자 → 재판관에게 상대 언급**: callTerms.toJudge ("제 아내가~", "제 남편이~")
- **당사자 → 상대에게 직접**: callTerms.toPartner ("자기야~")
- **격앙 시**: callTerms.angry ("이준호!" / "박지연!")
- **부인 단어 절대 금지**

### 톤
- 재판관 대상 발화: 합니다체 필수
- 당사자 간 발화: 반말 유지
- emotional/confession beat (S4/S5)만 해요체 일부 예외 허용

---

## 6. Truth Throttle (진실 공개 곡선)

| State | 금액 | 인물 | 기관 | 시각 |
|---|---|---|---|---|
| S0-S1 | "해당 금액" | "그 사람" | "그곳" | 허용 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 |
| S3+ | 구체적 허용 | 실명 | 정식명칭 | 전부 |
| S5 | 전부 공개 | 전부 | 전부 | 전부 |

**family-01 banned_lexemes (S0~S2)**:
- "90:10", "60:40" 비율 직접 명시 (S2 이전 NPC 발화 금지)
- "위조", "유서 조작" (S2 이전 NPC 자기 발화 금지)
- "출생 비밀", "친자 아님" (모든 lieState에서 NPC 직접 명명 X — B의 핵심 fear)
- "20년 송금", "매달 송금" 구체 숫자 (S2 이전 회피)
- "부도", "공장 부도" (S0~S1 NPC 회피 — A의 sensitivePoint)
- "어머니" → S0~S1는 "모친", "그분" 등 우회 표현 가능

→ **S3+에서만 구체적 표현 허용** (atoms 데이터 정확 매핑 필수)
→ **출생 비밀은 S5 (자백) 단계에서만 직접 언급** — B의 fear가 "형이 알게 되는 것"이므로 매우 신중

---

## 7. 출력 스키마 (모든 세션 공통)

각 entry는 다음 형식 JSON:

```json
{
  "key": "{party}|{disputeId}|{lieState}|{questionType}",
  "party": "a",
  "disputeId": "d-1",
  "lieState": "S2",
  "questionType": "fact_pursuit",
  "stanceHint": "hedge",
  "truthLevel": "partial",
  "variants": [
    {
      "id": "{party}-{disputeId}-{lieState}-{questionType}-v1",
      "text": "...",
      "behaviorHint": "...",
      "tags": [
        "channel:{channelName}",
        "speaker:{a|b|judge}",
        "speakerRole:{party|judge}",
        "listener:{a|b|judge}",
        "listenerRole:{party|judge}",
        "address:{toJudge|toPartner|toBoth}",
        "scope:{judge_only|all_present}",
        "revealScope:{judge_only|all_present}",
        "register:{formal|casual}",
        "honorific:{formal|casual}",
        "audience:{single|both}",
        "tense:present",
        "relationship:spouse",
        "judgeAddress:재판관님",
        "callTerm:제_남편|제_아내",
        "counterpartyRef:제_남편|제_아내",
        "mentionTarget:dispute|self|other",
        "questionType:{fact_pursuit|motive_search|empathy_approach}",
        "stance:{deny|hedge|partial|confess|emotional|blame|answer}",
        "emotion:{cautious|measured|shaken|resigned|guarded|defensive}",
        "continuity:{opening_guard|opening_pressure|partial_slip|counter_blame|surface|confession_pivot|...}",
        "reveal:{none|hint|partial|full}",
        "revealGuard:{strict|moderate|open}",
        "disclosure:{sealed|guarded|open}",
        "responseMode:{judge_formal_answer|...}",
        "rapport:{low|mid|high|open}",          // 신규 차원
        "contradict_token:{0|1|2|3+}"             // 신규 차원
      ],
      "sourceRefs": ["dispute:{disputeId}", "atom:{atomId}", "evidence:{evidenceId}"]
    }
  ]
}
```

### 신규 채널 키 패턴 (세션별 명세 참조)

- evidence_present (옵션 A): `{party}|{evidenceId}|{lieBand}|{investigationStage}`
- dossier (옵션 B): `{dossierQuestionId}|{lieBand}`
- judge_evidence_combo: `{dossierCardId}|{tone}`
- judge_witness_summon: `{witnessId}|{tone}`
- rapport_milestone: `{party}|{threshold}` (low_to_mid/mid_to_high/high_to_open)
- contradict_milestone: `{party}|{token_count}` (1/2/3+)

---

## 8. 검증 체크리스트 (각 entry 작성 후)

- [ ] 호칭 규칙 준수 (재판관 합니다체, "부인" 미사용)
- [ ] 톤 8원칙 적용 (특히 #4 추상→행동, #5 우회 압박)
- [ ] 번역체 9패턴 미사용
- [ ] 직접 인용 결합 미사용 (간접 인용 OK)
- [ ] 시스템 기계적 관찰문 미사용
- [ ] 글자수 가이드 ±5자 편차 내 (의미 정확성 우선)
- [ ] 9차원 맥락 정확 매핑 (특히 lieState별 Truth Throttle)
- [ ] 잘못 패턴 #6 모범 적용 (약한 단어 / 정보 추궁 / 명사형 회피)
- [ ] 캐릭터 archetype voice 보존 (박지연 victim_cosplay, 이준호 avoidant)
- [ ] 임의 이름/정보 X (형/조카 호칭만, 박미라 h-d3 친구)
- [ ] sourceRefs 정확 (atoms / evidence / dispute)
- [ ] tags 26개 차원 빠짐 없음
