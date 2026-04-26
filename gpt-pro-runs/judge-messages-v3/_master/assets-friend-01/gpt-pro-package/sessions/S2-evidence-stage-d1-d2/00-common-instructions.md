# 공통 작성 기준 (모든 세션 적용)

## 1. 사건 개요 — friend-01

**caseId**: friend-01 (case-friend-01)
**title**: 손절한 절친

**anchorTruth**:
> B는 예비신랑을 꼬시려 한 게 아니라 경고하려 했고, 그보다 오래전에는 A 아버지에게 당한 일을 말하지 못한 채 스스로 악역이 되었다.

**emotionalBait**: 손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다.

### 5 disputes
| dispute | 쟁점 | 비고 |
|---|---|---|
| d-1 | 9일간의 연락 의도 | initial |
| d-2 | 예비신랑의 선넘는 접근 | hidden |
| d-3 | 아버지의 돈 접근 패턴 | hidden |
| d-4 | 과거 손절과 아버지의 사기 | hidden |
| d-5 | 단톡방 매도와 명예훼손 | hidden |

(정확 책임 배분은 `04-case-friend-01.json` `disputes[].correctResponsibility` 참조)

### 7 evidence (e-1 ~ e-7)
정확 정의: `04-case-friend-01.json` top-level **`evidence` 필드 (단수형 — spouse-01의 `evidences` 복수형과 다름)** + ScriptedText의 evidence_present 키 분포 참조.

각 evidence의 `subjectParty / requiredLieState / investigationStages / partyContext` 정보는 source 04 파일 직접 read.

### 캐릭터
- **송다은 (party A)**: 31세, 온라인 쇼핑몰 CS 직원, archetype **premature_summary**, fear: **아버지의 진짜 모습이 드러나는 것**
  - verbalTells: premature_conclusion / pattern_citation / scope_narrowing
  - callTerms: toPartner "수민아" / toJudge "제 전 친구" / angry "최수민!"
- **최수민 (party B)**: 31세, 필라테스 강사, archetype **affect_flattening**, fear: **A에게 아버지의 진실(사기) 못 함**
  - verbalTells: flat_delivery / self_blame_shield / third_party_protection
  - callTerms: toPartner "다은아" / toJudge "다은이" / angry "송다은!"

### 증인 3종
- **w-1 김세라** (32, A의 고등학교 친구 미용실 직원, **pro_a 편향 sentA: 30, sentB: -10**): d-5 관련, dc-3 해금. addressA "다은이" / addressB "수민 씨". hiddenAgenda: 자신도 B를 비난하는 데 가담한 것이 부끄럽다
- **w-2 박준혁** (예비신랑의 회사 후배, neutral): d-2 관련, dc-2 해금. addressA "그분" / addressB "그 여자분". hiddenAgenda: 예비신랑과의 직장 관계가 불편해질까 조심
- **w-3 오미경** (B 측 친분, **pro_b 편향 sentB: 20**): d-4 관련, dc-4 해금. addressA "그 집 딸" / addressB "수민이". hiddenAgenda: 없음

### DossierCard 5장 (총 9 dossier question — spouse 8과 비슷)
파일: `07-dossier-cards.json`

| id | name | evidence | relatedDispute | subjectParty | 질문 |
|---|---|---|---|---|---|
| dc-1 | 집착의 겉면 | e-1, e-2 | d-1, d-5 | both | a q1, b q1 |
| dc-2 | 먼저 넘은 선 | e-1, e-4 | d-1, d-2 | b | b q1 |
| dc-3 | 같은 부탁 | e-5, e-6 | d-3, d-4 | both | b q1, a q1 |
| dc-4 | 손절의 값 | e-3, e-6 | d-4 | both | b q1, a q1 |
| dc-5 | 낙인의 순서 | e-2, e-7 | d-1, d-5 | both | a q1, b q1 |

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

**friend-01 banned_lexemes (S0~S2)**:
- "사기", "사기범" (S2 이전 NPC 직접 명명 X — A 아버지를 가리키는 단어)
- "예비신랑이 먼저" 류 표현 (S2 이전 B 발화 X — 사건 핵심 반전이라 후반 공개)
- "아버지" → S0~S1는 "그분", "그 어른" 등 우회
- "단톡방", "공통 친구" 구체적 명명 (S0~S1 NPC가 직접 X — 자기 정당화 우회)
- "9일간 연락" 구체 숫자 (S2 이전 회피)
- "9일", "3주" 같은 구체적 시점 (S0~S1 우회 — "한동안", "최근" 등으로)

→ **S3+에서만 구체적 표현 허용** (atoms 데이터 정확 매핑 필수)
→ **A 아버지 사기 사건은 S5 (자백) 단계에서만 직접 언급** — B의 fear가 "친구가 아버지를 사기꾼으로 봐야 하는 것"이라 매우 신중
→ **예비신랑이 먼저 선넘은 사실**도 S3~S5 점진적 공개 — A는 모르는 사실

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
