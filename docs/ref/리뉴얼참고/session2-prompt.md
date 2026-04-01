# Session 2: spouse-01 — ExecutableVerbalTell + BeatScript

## 배경

Session 1이 완료됐습니다. ClaimPolicy 60개, RuntimeStartBridge 10개, EvidenceChallenge 6개 모두 스키마 검증 통과. 엔진 통합 진행 중입니다.

이번 Session에서는 같은 사건(spouse-01)의 **캐릭터 연기 레이어**를 생성합니다.

## 첨부 파일

1. **session1-spouse-01-case.json** — 사건 전체 데이터 (이전과 동일)
2. **renewal-schemas.ts** — 타입 정의 (이전과 동일)
3. **solomon_5_design_opinions.md** — 의견 3(Beat 작성 가이드) 참조용

## 생성 요청 1: ExecutableVerbalTell (6~8개)

spouse-01의 2명 캐릭터의 기존 verbalTell(설명문)을 **검증 가능한 실행 규칙**으로 변환해주세요.

### 원본 데이터

**한지석(a) — avoidant:**
```json
[
  { "type": "over_precision", "trigger": "lying", "pattern": "불편한 질문이 올수록 숫자가 정밀해진다. '한 9시쯤'이 아니라 '9시 12분쯤', '280만원 정도'가 아니라 '2,800,000원 딱' — 정확함 뒤에 감정을 숨기는 버릇이다." },
  { "type": "counter_question", "trigger": "cornered", "pattern": "의도를 추궁당하면 답 대신 되묻는다. '왜 그랬냐고요? 그럼 당신은 왜 그걸 봤는데요?' — 공격을 방어로 뒤집는 버릇이다." },
  { "type": "timeline_padding", "trigger": "shame", "pattern": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다. '그날 저녁 8시 반에 물류 마감 끝내고, 동료한테 인수인계하고, 주차장까지 걸어가는데…' — 핵심을 에둘러 시간을 번다." }
]
```

**오세린(b) — confrontational:**
```json
[
  { "type": "evidence_waving", "trigger": "lying", "pattern": "증거 한 장이면 충분하다는 듯 캡처를 흔들며 '이게 다예요, 이게 전부입니다'라고 단정 짓는다. 맥락은 안 보고 결론부터 내린다." },
  { "type": "motive_jump", "trigger": "hurt", "pattern": "행동 하나에서 의도를 곧바로 단정짓는다. 송금 한 건이 '그러니까 날 속인 거잖아'가 되고, 늦은 귀가가 '다른 여자 만나고 온 거잖아'로 뛴다." },
  { "type": "selective_quote", "trigger": "defensive", "pattern": "상대의 긴 해명에서 가장 불리한 세 단어만 골라 반복한다. '사정이 있었다? 사정이 있었다고요? 무슨 사정이요?' — 해명 전체가 아니라 약한 고리만 물고 늘어진다." }
]
```

### 변환 스키마

```ts
interface ExecutableVerbalTell {
  id: string                    // 기존 type과 동일
  appliesWhen: TellTrigger[]    // 'lying'|'cornered'|'emotional'|'avoiding'|'shame'|'hurt'|'defensive'
  lexicalHooks: string[]        // 텍스트에 포함되어야 하는 어휘 (최소 1개 매칭으로 검증)
  sentenceShape?: SentenceShape // 'number_first'|'question_end'|'enumeration'|'echo_repeat'|'conditional'|'self_reference'
  cadence: TellCadence          // 'every_turn'|'once_every_2_turns'|'max_once_per_turn'|'on_trigger_only'
  numericGranularity?: string   // over_precision용
  requiresSecondSentence?: boolean  // counter_question용
  originalPattern: string       // 원본 설명문 보존
}
```

### 변환 규칙
- `lexicalHooks`: 이 tell이 발현됐는지 판별할 수 있는 한국어 단어/표현 3~6개. post-process에서 응답 텍스트에 이 중 최소 1개가 있는지 검사함.
- `sentenceShape`: 문장 구조 패턴. over_precision은 `number_first`, counter_question은 `question_end`, timeline_padding은 `enumeration` 등.
- `cadence`: 발현 빈도. counter_question은 `max_once_per_turn`, over_precision은 `once_every_2_turns` 등.
- `requiresSecondSentence`: true이면 sentenceCount 최소 2 강제.

## 생성 요청 2: BeatScript (~36개)

spouse-01의 **핵심 dispute 3개** × 6 beat × 2명 = ~36개

### 핵심 dispute 선정
- d-1 (280만원 송금의 진실) — 사건의 중심축
- d-3 (제3자 정체) — 감정적 클라이맥스
- d-5 (100만원 상의 약속) — 양측 과실 쟁점

### Beat 스키마

```ts
interface BeatScript {
  caseId: string
  party: 'a' | 'b'
  disputeId: string
  beatType: 'deny' | 'hedge' | 'partial' | 'blame' | 'confession' | 'evidence_hit'
  line: string              // 핵심 대사 1~3문장
  behaviorHint: string      // 행동 묘사
  applicableStates: LieState[]  // 이 beat가 적용되는 상태 범위
  afterEvidence?: string    // 특정 증거 제시 후에만 사용
}
```

### 작성 가이드 (당신의 의견 3 기준)

**Voice Sheet 먼저 고정 후 beat 작성:**

한지석(avoidant):
1. 호칭: 재판관님(존댓말), 자기(반말), 제 아내(재판관 앞)
2. 기본 문장 길이: 중간~길음 (설명형)
3. 핵심 어휘: "기준으로", "순서", "정확히", "딱", "먼저"
4. 기본 tell: over_precision (숫자 선행)
5. 회피: 맥락 이동 + 시간벌기
6. 공격: 상대 행동 되묻기
7. 수치심 표현: 목소리 낮아짐 + 시선 회피
8. 진실 인정 상한선: 행위 인정 + 동기는 축소

오세린(confrontational):
1. 호칭: 재판관님(존댓말), 자기(반말), 제 남편(재판관 앞)
2. 기본 문장 길이: 짧고 날카로움
3. 핵심 어휘: "몇 번째", "전부", "다", "그러니까", "잖아"
4. 기본 tell: selective_quote (약한 고리 반복)
5. 회피: 거의 안 함 — 대신 역공
6. 공격: 증거 흔들기 + 동기 단정
7. 수치심 표현: 억울함으로 전환
8. 진실 인정 상한선: 행위 인정 + 즉시 반격

**beat별 길이 규칙:**
- deny: 1~2문장
- hedge: 2문장
- partial: 2문장
- blame: 2문장
- evidence_hit: 2문장 (균열 + 회복)
- confession: 2~3문장

**confession beat 핵심 원칙:**
좋은 사람이 된 순간이 아님. 여전히 같은 사람인데 못 버티는 지점. 기존 호칭/tell/책임 해석 중 최소 2개 유지.

**evidence_hit beat 핵심 원칙:**
붕괴가 아니라 금이 가는 순간. 1문장째 균열(멈춤/반복/정정) + 2문장째 캐릭터 고유 회복.

### applicableStates 가이드
- deny: ['S0', 'S1']
- hedge: ['S0', 'S1', 'S2']
- partial: ['S2', 'S3']
- blame: ['S2', 'S3']
- evidence_hit: ['S0', 'S1', 'S2', 'S3']
- confession: ['S4', 'S5']

## 출력 형식

JSON 파일 하나로 통합:

```json
{
  "caseId": "spouse-01",
  "executableTells": {
    "a": [
      { "id": "over_precision", "appliesWhen": [...], "lexicalHooks": [...], ... },
      ...
    ],
    "b": [ ... ]
  },
  "beatScripts": [
    { "caseId": "spouse-01", "party": "a", "disputeId": "d-1", "beatType": "deny", "line": "...", ... },
    ...
  ]
}
```

작업량이 많습니다. tell 변환 6개 + beat 36개 = 42개 항목. 특히 beat의 한국어 대사가 캐릭터 목소리와 일치하는지가 가장 중요합니다. Voice Sheet를 먼저 확립한 후 작성해주세요.
