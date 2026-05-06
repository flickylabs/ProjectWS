# 5. 사건 데이터 구조 + 샘플

## 사건 데이터 구조 (CaseData)

```typescript
{
  caseId: string,           // "case-spouse-01"
  meta: {
    relationshipType: string,    // "spouse" | "neighbor" | "workplace" | ...
    conflictSeed: string,        // "CS-1" ~ "CS-6"
    variableModules: string[],   // ["VM-C", "VM-E"] 등
    twistModule: string | null,  // "TW-6" 또는 null
    difficulty: string,          // "easy" | "medium" | "hard"
    anchorTruth: string,         // 사건의 핵심 진실 (1줄 요약)
    emotionalBait: string,       // 플레이어를 오판으로 유도하는 미끼
    resolutionDilemma: string,   // 판결의 딜레마
  },
  duo: {
    partyA: CharacterProfile,    // 원고
    partyB: CharacterProfile,    // 피고
    relationshipLedger: LedgerEntry[],  // 과거사 3~5개
    socialGraph: ThirdParty[],          // 제3자 3~5명
    relationshipType: string,
  },
  context: {
    contextType: string,         // "holiday" | "contract_end" | ...
    description: string,         // 상황 배경
    emotionalPressure: number,   // 감정 압력 (1~10)
    affects: string,             // "both" | "a" | "b"
    triggerAmplifier: string,    // 왜 이 상황이 갈등을 키웠는지
    caseNumber: string,          // "E-SP-N-0001"
    caseName: string,            // "비밀 송금 의혹"
  },
  disputes: Dispute[],           // 쟁점 4~6개
  evidence: EvidenceNode[],      // 증거 6~8개
  truthLayers: TruthItem[],     // 진실 아이템 (3-layer)
  lieConfigs: LieConfig[],      // 쟁점별 거짓말 설정
  mediationOptions: MediationOption[], // 조정안
}
```

## CharacterProfile 구조
```typescript
{
  name: string,              // "한지석"
  age: number,               // 39
  occupation: string,        // "물류센터 야간 운영팀장"
  incomeBracket: string,     // "low" | "mid" | "high"
  archetype: string,         // "avoidant" | "confrontational" | "victim_cosplay" | "cold_logic"
  speechStyle: string,       // 말투 상세 설명 (프롬프트에 주입)
  pride: number,             // 자존심 (1~10)
  fear: string,              // 가장 두려운 것 (문장)
  riskAppetite: number,      // 위험 감수 성향 (1~10)
  digitalHabit: string,      // 디지털 사용 패턴
  dailyRoutine: string,      // 일상 루틴
  sensitivePoints: string[], // 민감한 주제들
  verbalTells: VerbalTell[], // 언어적 단서 3~4개
  callTerms: {               // 호칭 규칙
    toPartner: string,       // 평소 호칭 ("자기")
    toJudge: string,         // 재판관 앞 호칭 ("제 아내")
    angry: string,           // 화났을 때 호칭 ("오세린 씨!")
  }
}
```

## Dispute 구조
```typescript
{
  id: string,                    // "d-1"
  name: string,                  // "지석의 비밀 송금 280만원"
  truth: boolean,                // 사실 여부
  truthDescription: string,      // 진실 상세 설명
  quadrant: string,              // "a_only" | "b_only" | "both_know" | "shared_misconception"
  requiredEvidence: string[],    // 필수 증거 ID
  correctResponsibility: { a: number, b: number }, // 정답 책임비율
  ambiguity: string,             // "none" | "low" | "high"
  weight: string,                // "high" | "medium" | "low"
  mediationLink: string,         // 관련 조정안
  legitimacyIssue: boolean,      // 적법성 쟁점 여부
  judgmentStatement: string,     // 판결문용 한 줄 요약
}
```

## 샘플: spouse-01 "비밀 송금 의혹"

### 핵심 진실
> 지석이 낯선 여자 이름으로 보낸 280만원은 외도 자금이 아니었다. 추석 연휴, 비어버린 간병 구간을 메우려 몰래 보낸 돌봄센터 예약금이었다.

### 감정적 미끼
> 낯선 여자 이름으로 빠져나간 280만원, 밤 9시 모텔 골목 출입기록, '조용한 데서 보자'는 메시지 — 세 가지가 겹치면 누구라도 외도를 의심한다.

### 캐릭터
- **한지석 (A)**: 39세, 물류센터 야간 운영팀장, avoidant. 숫자로 감정을 숨기고, 궁지에 몰리면 되묻는다.
- **오세린 (B)**: 36세, 프리랜서 플로리스트, confrontational. 같은 질문을 어조만 바꿔가며 반복하고, 증거 하나로 단정짓는다.

### 5개 쟁점
| 쟁점 | 진실 | 비중 | 정답 책임비율 | 지식 사분면 |
|------|------|------|-------------|-----------|
| d-1: 지석의 비밀 송금 280만원 | TRUE | high | A:70 B:30 | A만 알고 있음 |
| d-2: 세린의 새벽 휴대폰 열람 | TRUE | high | A:20 B:80 | B만 알고 있음 |
| d-3: 최민정은 외도 상대인가 | FALSE | high | A:40 B:60 | 공유된 오해 |
| d-4: 세린의 우회 송금 150만원 | TRUE | high | A:25 B:75 | B만 알고 있음 |
| d-5: 100만원 사전 상의 약속 위반 | TRUE | medium | A:55 B:45 | 양측 모두 앎 |

### 반전 모듈: TW-6 (공유 오해 반전)
두 사람 모두 같은 거짓 사실을 믿고 있다: "최민정은 외도 상대"라는 세린의 확신을, 지석도 (변명을 못 해서) 부인하지 못한다. 진실은 돌봄센터 상담팀장.

### 관계 원장 (Relationship Ledger)
1. **확인된 과거**: 재작년 주식 손실 후 "100만원 이상은 반드시 상의" 약속
2. **왜곡된 과거**: 세린 동생 급전 도움에 대한 서로 다른 기억
3. **침묵의 과거**: 처가 어머니 간병 분담을 제대로 정하지 못한 채 덮어둠

### 증인 (Social Graph)
1. **오미숙** (세린 어머니, pro_b) — 간병 필요성 알지만 딸 편
2. **이재훈** (지석 동료, pro_a) — 지석의 돌봄센터 문의를 알고 있음
3. **최민정** (돌봄센터 상담팀장, neutral) — 사건의 핵심 열쇠
4. **정우성** (세린 대학동기, neutral) — 세린의 우회 송금 경유 계좌 보유
