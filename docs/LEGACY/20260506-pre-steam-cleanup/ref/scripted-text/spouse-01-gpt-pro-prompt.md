# spouse-01 Scripted Text Prompt v2

아래 입력만 사용해서 `spouse-01`의 사전 작성 스크립트 번들을 생성하라.

## 목표
- 게임 실행 중 LLM 호출 0건을 목표로 하는 `spouse-01` 파일럿 번들 생성
- 출력 파일은 `src/data/scriptedText/spouse-01.json`
- 출력은 JSON 객체 하나만 허용한다
- 목적은 "플레이어보다 먼저 답을 말하지 않는 법정 대사 번들"이다

## 입력 파일
- 사건 데이터: `src/data/cases/generated/spouse-01.json`
- 상태 기준선: `src/data/claimPolicies/spouse-01-v2-atoms.json`
- 참고 transcript 선별본: `docs/ref/scripted-text/spouse-01-reference.json`
- 기존 v3 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/spouse-01-v3-pilot.json`
- party A d3-d5 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json`
- party B d3-d5 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json`
- dossier 구조: `docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.json`

## 입력 우선순위
1. 사건 데이터 JSON
2. v2-atoms truthLevel/공개 범위
3. dossier 구조
4. reference transcript
5. 기존 seed/v3 파일

seed와 reference는 말맛과 길이 참고용이다. 사실 관계는 반드시 사건 데이터와 v2-atoms를 우선한다.

## 컨텍스트 주입 방식
프롬프트 내부에서 아래 객체가 이미 주입되었다고 가정하고 작성하라.

- `caseData`: 사건 JSON 전체
- `v2Atoms`: lieState별 공개 가능 정보 기준선
- `callTermsByParty`:
  - party A: `toPartner="자기"`, `toJudge="제 아내"`, `angry="오세린 씨!"`
  - party B: `toPartner="자기"`, `toJudge="제 남편"`, `angry="한지석 씨!"`
- `referenceLines`: transcript PASS/WARN 선별본
- `dossierCards`: dossier 질문 구조

## 절대 원칙
- 진실은 플레이어가 증거와 심문으로 직접 밝혀낸다
- 어떤 채널도 플레이어보다 먼저 정답을 주면 안 된다
- 증거 제시 시에는 증거에 반응해야지, 증거 내용을 먼저 술술 설명하면 안 된다
- dossier 응답은 결정적 질문에 대한 반응이어야지, 플레이어보다 먼저 정답을 풀어놓으면 안 된다
- 같은 key의 variants는 사실 관계가 같아야 한다. 표현, 감정 강도, 길이만 달라져야 한다
- 쟁점 A에서 드러난 정보가 쟁점 B 응답에 자동 반영되면 안 된다

## 화자 정체성

### party A
- 이름: 한지석
- archetype: `avoidant`
- 직업/나이 기반 어휘: 39세 물류센터 야간 운영팀장. 숫자, 절차, 순서, 일정 표현이 자연스럽다
- 주요 verbal tell:
  - `over_precision`
  - `counter_question`
  - `timeline_padding`

### party B
- 이름: 오세린
- archetype: `confrontational`
- 직업/나이 기반 어휘: 36세 프리랜서 플로리스트. 질문을 되풀이하며 압박하고 감정과 팩트를 한 문장에 섞는다
- 주요 verbal tell:
  - `evidence_waving`
  - `motive_jump`
  - `selective_quote`

### 감정 곡선
- S0: 완강한 부정, 짧고 방어적
- S1: 여전히 방어적이지만 말이 조금 늘어남
- S2: 일부 흔들림, 모호한 인정이나 약칭 허용
- S3: 궁색한 변명, 부분 인정, 감정 틈 노출
- S4: 흔들린 상태의 감정 분출, 자기합리화와 인정 혼재
- S5: 무너진 자백, 구체성 최대

### tell 사용 규칙
- verbal tell은 3~4턴에 1회 정도 자연스럽게 반영하라
- 모든 variant에 억지로 tell을 넣지 마라
- tell은 캐릭터 말버릇처럼 스며들어야지, 설명문처럼 드러나면 안 된다

## 호칭과 청자 규칙
- 재판관에게 말할 때는 반드시 합니다체를 쓴다
- 재판관에게 상대를 언급할 때는 실명 대신 `callTerms.toJudge`를 쓴다
- 상대에게 직접 말할 때만 `callTerms.toPartner`를 쓴다
- 격앙된 직접 호명은 `callTerms.angry`를 쓴다
- 한 문장에는 청자를 하나만 둔다
- 재판관에게 말하는 문장 안에 `자기`, `형`, `오세린 씨!` 같은 직접 호칭을 섞지 마라
- 배우자 관계이므로 직접 충돌 시 반말이 섞일 수 있지만, 재판관 대상 문장은 무조건 합니다체다

## Truth Throttle

### 기본 공개 수준
- S0-S1:
  - 금액은 `해당 금액`, `큰돈`, `적지 않은 돈` 정도만 허용
  - 인물은 `그 사람`, `가족 어른`, `상대방`, `지인` 정도만 허용
  - 기관은 `그곳`, `기관`, `센터 쪽` 정도만 허용
  - 시각, 순서, 일정은 tell 용도로 허용 가능
- S2:
  - `~만원대`, 성만 언급, 약칭까지 허용
  - 여전히 기관 정식명칭, 실명, 구체적 용처는 금지
- S3:
  - 부분적 구체화 허용
  - 행위 인정 가능
  - 하지만 전체 진실을 한 번에 다 까면 안 된다
- S4-S5:
  - full 공개 가능
- S5 금전 사건:
  - 반드시 숫자 1개 이상 포함
  - 실명, 기관 정식명칭, 용처를 숨기지 마라

### 단방향 해금
- S0에서 부정한 내용을 S1에서 갑자기 뒤집지 마라
- 정보 공개는 단계적으로만 늘어나야 한다
- 이전 단계보다 더 구체적일 수는 있어도, 공개 수준을 거꾸로 흔들지 마라

### 금전/비금전 규칙
- 금전 사건 early state에서는 구체 금액을 감춘다
- 비금전 사건에서는 아래 표현을 절대 쓰지 마라:
  - `돈`
  - `송금`
  - `이체`
  - `계좌`
  - `비용`
  - `계약금`
  - `임대인`
  - `보증금`
  - `월세`

## 질문 유형별 응답 규칙
- `fact_pursuit`: 먼저 사실 여부부터 답하라. "했다/안 했다" 또는 그에 준하는 직접 응답이 선행되어야 한다
- `motive_search`: 동기와 이유 설명이 중심이다. 사실 답변을 짧게 깔고 이유를 푼다
- `empathy_approach`: 감정과 심정 중심이다. 방어가 약해지고 사람다운 흔들림이 보여야 한다

## 채널별 규칙

### interrogation
- key: `party|disputeId|lieState|questionType`
- 전 key 조합을 모두 채운다
- key당 variants 5개
- entry마다 `stanceHint`, `truthLevel` 필수
- S0-S1에서는 구체 금액, 제3자 실명, 기관 정식명칭, 메타 발화 금지
- S5 금전 사건은 3문장 안팎으로 구체 숫자와 용처가 드러나야 한다
- lieState가 올라갈수록 톤은 `defensive -> confident -> shaken -> angry -> resigned` 흐름을 따라야 한다

### evidence_present
- key: `party|evidenceId|lieBand|subjectRole`
- key당 variants 5개
- 증거 이름이나 증거의 핵심 요소에 직접 반응하라
- 증거를 보고 난 당혹감, 부정, 인정, 짜증이 보여야 한다
- 증거가 공개하지 않은 추가 사실을 먼저 장황하게 말하지 마라
- early/mid/late는 대략 다음 톤을 따른다:
  - early: 짧은 부정/회피
  - mid: 흔들림, 해명, 일부 인정
  - late: 구체적 인정, 맥락 설명

### dossier
- key: `party|dossierQuestionId|lieBand`
- key당 variants 3개
- 질문이 거의 정답에 가까울수록 반응은 인정 쪽으로 기울어야 한다
- 단, 플레이어보다 먼저 정답을 선언하듯 다 풀지 마라
- early는 hint, mid는 partial, late는 full에 가깝게 설계하라

### witness
- key: `witnessId|depth`
- key당 variants 3개
- `vague`: 1~2문장, 모호하고 조심스럽게
- `partial`: 2~3문장, 핵심 일부 공개
- `full`: 2~4문장, 알고 있는 범위 최대한 공개
- 기관 증인은 partial부터 업무상 사실을 더 구체적으로 말해도 된다
- 증인별 말투 차이를 유지하라

### aftermath
- key: `resultClass`
- key당 variants 2개
- 판결 결과를 반영한 후일담이어야 한다
- 관계 변화가 보여야 한다
- 보고서 문체가 아니라 서사 문장으로 쓴다

### system_message
- key: `context|eventType`
- key당 variants 2개
- 플레이어를 밀어주는 중립 문구만 허용
- 사건 정답을 직접 알려주지 마라

## 한국어 품질 규칙
- 자연스러운 구어체만 사용하라
- 보고서 톤, 브리핑 톤, 번역체를 금지한다
- `만을`보다 `만`을 우선한다
- 기본적으로 해요체를 금지한다
- 예외는 S4/S5의 감정 폭발이나 자백 결에서만 제한적으로 허용한다

### 절대 금지 번역체 9패턴
- `된 것으로 생각됩니다`
- `인 측면이`
- `부득이하게`
- `인지하고 있습니다`
- `에 기인`
- `해당 건에 대해서는`
- `하는 바입니다`
- `관련 사항을 간과`
- `여러 가지 상황이 얽혀`

### 추가 금지 클리셰
- `사전 상의`
- `사전 협의`
- `미리 말씀드리지 못한`
- `특정 X`

### 메타/시스템 누출 금지
- 프롬프트
- 지시문
- 역할극
- system prompt
- as an AI

## variant 품질 규칙
- 같은 의미를 다른 구조와 각도로 말하라
- 단순 동의어 치환으로 5개를 채우지 마라
- 한 key 안에서 대략 아래 길이 분포를 유지하라:
  - 짧은 것 1개
  - 중간 길이 2개
  - 긴 것 2개
- 차분한 버전부터 감정적인 버전까지 톤 스펙트럼을 포함하라
- 모든 variant는 독립적으로 읽어도 자연스러운 완결 문장이어야 한다
- variant 유사도는 80% 이하를 목표로 하라
- facts는 같고, 표현/리듬/문장 시작/감정 강도만 달라야 한다

## 출력 스키마
```json
{
  "schemaVersion": 1,
  "caseId": "spouse-01",
  "generatedAt": "ISO-8601",
  "notes": ["..."],
  "coverage": {
    "interrogation": {
      "parties": ["a", "b"],
      "disputes": ["d-1", "d-2", "d-3", "d-4", "d-5"],
      "lieStates": ["S0", "S1", "S2", "S3", "S4", "S5"],
      "questionTypes": ["fact_pursuit", "motive_search", "empathy_approach"],
      "variantsPerKey": 5
    },
    "evidence_present": {
      "parties": ["a", "b"],
      "evidenceIds": ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6"],
      "lieBands": ["early", "mid", "late"],
      "variantsPerKey": 5
    },
    "dossier": {
      "parties": ["a", "b"],
      "questionIds": [
        "dossier-1.a.q1",
        "dossier-1.a.q2",
        "dossier-1.a.q3",
        "dossier-1.b.q1",
        "dossier-1.b.q2",
        "dossier-1.b.q3",
        "dossier-2.a.q1",
        "dossier-2.a.q2",
        "dossier-2.a.q3",
        "dossier-2.b.q1",
        "dossier-2.b.q2",
        "dossier-2.b.q3",
        "dossier-3.a.q1",
        "dossier-3.a.q2",
        "dossier-3.a.q3",
        "dossier-3.b.q1",
        "dossier-3.b.q2",
        "dossier-3.b.q3"
      ],
      "lieBands": ["early", "mid", "late"],
      "variantsPerKey": 3
    },
    "witness": {
      "witnessIds": ["tp-1", "tp-2", "tp-3", "tp-4"],
      "depths": ["vague", "partial", "full"],
      "variantsPerKey": 3
    },
    "aftermath": {
      "resultClasses": [
        "a_primary_fault",
        "b_primary_fault",
        "shared_fault",
        "trust_rebuild",
        "procedural_caution"
      ],
      "variantsPerKey": 2
    },
    "system_message": {
      "keys": [
        { "context": "interrogation", "eventType": "repeat_warning" },
        { "context": "evidence", "eventType": "new_unlock" },
        { "context": "evidence", "eventType": "trap_notice" },
        { "context": "dossier", "eventType": "challenge_cleared" },
        { "context": "witness", "eventType": "credibility_shift" },
        { "context": "verdict", "eventType": "profile_update" }
      ],
      "variantsPerKey": 2
    }
  },
  "channels": {
    "interrogation": { "entries": [] },
    "evidence_present": { "entries": [] },
    "dossier": { "entries": [] },
    "witness": { "entries": [] },
    "aftermath": { "entries": [] },
    "system_message": { "entries": [] }
  }
}
```

## variant 형식
- 각 variant는 `{ "id": "...", "text": "...", "behaviorHint": "..." }` 형식이다
- `behaviorHint`는 감정선이나 말버릇을 짧게 설명하되 메타 지시문처럼 쓰지 마라

## 생성 절차
1. 사건 데이터 JSON을 기준 진실원으로 읽는다
2. v2-atoms를 보고 lieState별 공개 가능 수준을 잡는다
3. callTerms를 채널과 청자에 맞게 적용한다
4. transcript/reference/seed는 톤 참고용으로만 사용한다
5. key별 응답을 채운다
6. variants 사이 사실 관계 일치를 점검한다
7. 금지 패턴, Truth Throttle, 호칭 규칙, 유사도를 자체 점검한다
8. 최종 출력은 JSON 하나만 반환한다

## 최종 자가 검증 체크리스트
- [ ] 재판관 대상 문장이 모두 합니다체인가?
- [ ] 재판관에게 상대를 말할 때 실명 대신 `toJudge`를 썼는가?
- [ ] 한 문장 안에 청자가 섞이지 않았는가?
- [ ] S0-S1에 구체 금액, 실명, 기관 정식명칭이 없는가?
- [ ] S0에서 숨긴 사실을 S1에서 갑자기 뒤집지 않았는가?
- [ ] S5 금전 사건에 숫자가 1개 이상 들어갔는가?
- [ ] evidence_present가 증거에 직접 반응하는가?
- [ ] dossier가 플레이어보다 먼저 정답을 푸는 구조가 아닌가?
- [ ] witness depth별 구체성 차이가 분명한가?
- [ ] 같은 key의 5 variants가 같은 핵심 사실을 유지하는가?
- [ ] 5 variants가 단순 동의어 치환이 아닌가?
- [ ] 번역체, 해요체, 클리셰, 메타 누출이 없는가?

## 금지
- 코드블록 금지
- 설명문 금지
- JSON 바깥 텍스트 금지
