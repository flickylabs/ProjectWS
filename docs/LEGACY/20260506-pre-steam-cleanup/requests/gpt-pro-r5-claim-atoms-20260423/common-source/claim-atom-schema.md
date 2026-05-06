# ClaimAtom 스키마 (v2)

> R5 atom 생성 시 **반드시** 이 스키마를 준수하세요. TypeScript 타입은 `src/types/claimV2.ts:19-152`에 정의.

---

## 1. 파일 최상위 구조

```jsonc
{
  "caseId": "spouse-01" | "family-01" | "friend-01",
  "schemaVersion": "v2",
  "claimPolicies": {
    "a": {  // party A
      "d-1": {  // disputeId
        "S0": { ClaimPolicyV2 },  // lieState
        "S1": { ClaimPolicyV2 },
        "S2": { ClaimPolicyV2 },
        "S3": { ClaimPolicyV2 },
        "S4": { ClaimPolicyV2 },
        "S5": { ClaimPolicyV2 }
      },
      "d-2": { ... },
      // ... 이 사건의 모든 쟁점
    },
    "b": {  // party B
      // 동일 구조
    }
  }
}
```

**필수**: 각 사건의 모든 쟁점 × 양측 × 6단계(S0~S5) 전부 커버. 누락 금지.

---

## 2. ClaimPolicyV2 (하나의 `{party}.{disputeId}.{state}` 블록)

```jsonc
{
  "disputeId": "d-1",
  "state": "S0",
  "schemaVersion": "v2",
  "claimAtoms": [ ClaimAtom, ClaimAtom, ... ],  // 3~5개 권장, 최소 2개
  "privateKnowledge": [
    "이 시점에 NPC가 알고 있는 진짜 사실들 (속마음 기록)",
    "factText보다 긴 서술문 OK"
  ],
  "suppressions": [
    "이 시점에 절대로 꺼내지 않는 정보 (숨기려는 것)"
  ],
  "emotionalLeakRisk": "none" | "low" | "mid" | "high",
  "tellPool": [
    "이 시점에 발현 가능한 verbal tell 종류 (archetype 기반)"
  ]
}
```

### 필드 가이드

- **claimAtoms**: 이 state에서 NPC가 발화 재료로 쓸 수 있는 의미 원자들. 3~5개 권장.
- **privateKnowledge**: NPC 내면(진실). 외부에 직접 안 나옴. 서술문 OK. 2~4개.
- **suppressions**: NPC가 드러내기 싫어하는 사실. 2~4개.
- **emotionalLeakRisk**: 감정이 새어나올 위험. S0-S1은 low, S2-S3는 mid, S4는 high, S5는 mid(자백 후).
- **tellPool**: archetype 기반 tell 3~5개.

---

## 3. ClaimAtom (한 개의 발화 원자)

```jsonc
{
  "id": "d1.movement_only",  // 고유 ID (쟁점단축명.의미키)
  "factText": "공동계좌 금액 이동 사실만 인정",  // 의미 라벨 (완성 문장 금지!)
  "tags": ["act", "timeline", "uncertainty"],  // ClaimAtomTag 중 2~4개
  "slots": {  // 표현 slot (lieState별 공개 수준 조정)
    "amount": { "exact": "...", "rounded": "...", "neutral": "해당 금액" },
    "time": { "dateExact": "9월 20일", "timeExact": "오후 2시", "neutral": "그날" },
    "action": { "exact": "공동계좌 송금", "neutral": "그 송금" },
    // ... 필요한 slot만
  },
  "stanceHints": ["deny", "hedge"],  // Stance 1~3개
  "usableInSubActions": ["fact_pursuit"],  // (선택) 이 subAction에서만 선택 가능
  "requiresEvidenceIds": ["e-2"],  // (선택) 이 증거 제시 후에만 열림
  "repeatPenalty": 50,  // (선택) 반복 사용 시 페널티
  "isAdmissionSafe": true,  // (선택) S3+ 인정 후 재부정 불가
  "source": "v2"
}
```

### factText 규칙 (매우 중요)

- **의미 라벨이지 완성 대사가 아님** — "나는 그때 공동계좌에서 돈을 옮긴 게 맞아요" ❌
- **서술 형식으로 축약** — "공동계좌 금액 이동 사실만 인정" ✅
- **어떤 의미인지 이해 가능한 짧은 구절** (10~30자 권장)
- 최종 NPC 대사는 blueprintPromptBuilder가 atom들의 factText + slot을 조합해서 LLM 프롬프트로 만듦

### id 명명 규칙

- 형식: `{disputeIdShort}.{meaningKey}`
- disputeIdShort: `d-1` → `d1`, `h-d3` → `hd3`
- meaningKey: snake_case로 의미 요약 (`movement_only`, `motive_shame`, `rule_violation` 등)
- 같은 atom이 S0~S5에 재등장할 수 있음 (진화된 variant 포함). id 중복 OK (state별 독립).

### 태그 (ClaimAtomTag) — 전체 목록

| tag | 뜻 |
|-----|-----|
| `act` | 무엇을 했는지 |
| `timeline` | 언제/순서 |
| `motive` | 왜 그랬는지 |
| `emotion` | 어떤 심정이었는지 |
| `rule` | 약속/절차/원칙 |
| `evidence` | 증거 연결 |
| `context` | 맥락/배경 |
| `identity` | 사람/기관 정체 |
| `responsibility` | 책임 배분 |
| `relationship` | 관계 감정 |
| `counter` | 역공/되묻기 |
| `self_justification` | 자기 합리화 |
| `harm` | 피해/부담 |
| `fear` | 두려움 |
| `shame` | 수치심 |
| `privacy` | 사생활 |
| `admission` | 이미 인정된 사실 |
| `denial` | 부정 대상 |
| `uncertainty` | 유보/흐림 |
| `quote` | 인용 |
| `threshold` | 기준선 (100만원 등) |
| `beneficiary` | 대상자 |
| `institution` | 기관/센터 |
| `location` | 장소/위치 |

### Stance 가능값 (stanceHints)

`deny` | `hedge` | `admit_partial` | `admit_full` | `counter` | `defend` | `shame` | `resigned`

- S0: deny, hedge
- S1-S2: hedge, admit_partial, counter
- S3: admit_partial, defend, counter
- S4: shame, defend, counter, resigned
- S5: admit_full, resigned

---

## 4. Slot 구조 (ClaimAtomSlots)

각 slot은 lieState별 표현 수준을 분리:

### AmountSlot (금액)
```jsonc
{ "exact": "2,800,000원", "rounded": "280만원", "neutral": "해당 금액" }
```

### TimeSlot (시간)
```jsonc
{ "dateExact": "9월 20일", "timeExact": "오후 2시 03분", "dateTimeExact": "9월 20일 14시 03분", "period": "추석 연휴 직전", "neutral": "그날" }
```

### PersonSlot (사람)
```jsonc
{ "fullName": "최민정", "judgeRef": "제 남편", "directRef": "자기", "angryRef": "한지석 씨!", "role": "상담팀장", "neutral": "그 사람" }
```

### EvidenceSlot
```jsonc
{ "fullName": "재가돌봄센터 간병 예약 확인서", "shortName": "예약서", "neutral": "그 자료" }
```

### 기타: `message / rule / action / place / threshold / beneficiary(=PersonSlot)`

**Truth Throttle 적용**: blueprintPromptBuilder가 state에 따라 적절한 mode 선택
- S0-S1: `neutral` 위주
- S2: `rounded`, `shortName`, `period`
- S3+: `exact`, `fullName`, `dateExact`
- S4: 실수로 노출 허용
- S5: 전부 허용

→ **당신은 slot에 가능한 모든 mode를 채워둠**. 런타임이 적절히 선택.

---

## 5. SubAction별 Atom 선택 규칙 (SUBACTION_ATOM_RULES)

각 subAction이 선호하는 tag와 slot mode:

### fact_pursuit (사실 추궁)
- primaryTags: `act`, `timeline`, `rule`
- secondaryTags: `evidence`, `responsibility`, `threshold`
- avoidTags: `emotion`, `fear`, `shame`
- preferredSlotModes: amount=neutral, time=neutral, person=judgeRef

### motive_search (동기 탐색)
- primaryTags: `motive`, `self_justification`, `responsibility`
- secondaryTags: `act`, `fear`, `shame`, `harm`
- avoidTags: `timeline`
- preferredSlotModes: person=judgeRef

### empathy_approach (공감 접근)
- primaryTags: `emotion`, `fear`, `shame`, `relationship`, `harm`
- secondaryTags: `motive`, `responsibility`
- avoidTags: `rule`, `timeline`, `counter`

### evidence_present (증거 제시)
- primaryTags: `evidence`, `context`, `identity`, `quote`
- secondaryTags: `act`, `timeline`, `rule`, `privacy`
- avoidTags: `emotion`
- preferredSlotModes: amount=exact, time=dateExact, evidence=fullName

→ **각 쟁점·state별 atom 구성 시 다양한 tag 분포를 갖추도록**. 모든 atom이 `act`만 달면 subAction 간 차별화 불가.

---

## 6. 수량 가이드

### 최소 목표 (lieConfig당)
- claimAtoms: **3~5개**
  - 2개는 fact/timeline 계열 (fact_pursuit 대응)
  - 1개는 motive/self_justification 계열 (motive_search 대응)
  - 1개는 emotion/relationship 계열 (empathy_approach 대응)
  - 1개는 evidence/context 계열 (evidence_present 대응)
- privateKnowledge: 2~4개
- suppressions: 2~4개
- tellPool: 3~5개

### 전체 규모 (사건 1건)
- 양측(a/b) × 쟁점 N개 × lieState 6단계 × atom 4개 평균
- = 2 × 5 × 6 × 4 = 240 atoms (family/friend 기준, 쟁점 5개)
- spouse-01 (쟁점 4개) = 2 × 4 × 6 × 4 = 192 atoms

---

## 7. 레거시 참고 파일

`common-source/legacy-spouse-01-v2-atoms-example.json` — v1 spouse-01 사건(다른 스토리)의 v2-atoms 샘플. **스토리 내용은 무시하고 구조·포맷만 참고**. 현재 활성 3건과는 스토리가 다름.
