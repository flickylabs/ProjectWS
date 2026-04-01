# Solomon 진단 소스맵

아래는 진단에 직접 사용한 원문 발췌입니다. 파일명과 원문 줄번호를 함께 적었습니다.

## A. 핵심 판타지/설계 원칙
출처: `01-game-concept.md` lines 11-69
```text
  11 | 
  12 | ## 핵심 판타지
  13 | 플레이어는 **재판관**이다. 두 AI 당사자(원고/피고)가 사건을 들고 찾아오면, 심문하고 증거를 분석하고 진실을 밝혀 판결을 내린다. 단, 양쪽 모두 거짓말을 하고, 감정이 있고, 각자의 사정이 있다. 정답은 하나가 아니다.
  14 | 
  15 | ## 3-Layer 데이터 아키텍처
  16 | ```
  17 | Layer 1 (고정) : DuoSeed — 캐릭터 쌍 (성격, 말투, 관계사)
  18 | Layer 2 (변동) : ContextSeed — 배경 압력 (명절, 계약 만료 등)
  19 | Layer 3 (생성) : CaseSeed — 이번 사건 (쟁점, 증거, 반전)
  20 | ```
  21 | → 같은 커플이 매번 다른 사건으로 재등장하는 "반복 캐릭터 + 다른 사건" 모델
  22 | 
  23 | ## 진실 3-Layer 구조
  24 | ```
  25 | 실제 진실 (Actual Truth) — 사건의 객관적 사실
  26 |   ↓
  27 | 각자의 이해 (Perceived Truth) — 같은 사건을 다르게 기억/해석
  28 |   ↓
  29 | 법정 진술 (Testified Truth) — 전략적으로 재구성한 말
  30 | ```
  31 | → 플레이어는 "말" 뒤에 숨겨진 "이해"를 뚫고 "실제 진실"에 도달해야 한다
  32 | 
  33 | ## 7가지 USP (Unique Selling Points)
  34 | 
  35 | ### USP 1: 같은 사람, 다른 사건
  36 | 한지석 & 오세린은 spouse-01에서 비밀 송금 건으로, spouse-02에서 육아 갈등으로, spouse-03에서 재산 분할로 찾아온다. 캐릭터를 알수록 거짓말 패턴을 읽기 쉬워진다.
  37 | 
  38 | ### USP 2: 진실 3-Layer
  39 | 단순히 "누가 범인인가?"가 아니다. 양쪽 모두 자기가 피해자라 믿고, 그 믿음 위에 전략적 거짓말을 쌓는다.
  40 | 
  41 | ### USP 3: AI 논쟁 중재
  42 | 두 AI가 실시간으로 서로 반박하고, 끼어들고, 감정적으로 반응한다. 플레이어는 이 논쟁을 통제하는 재판관이다.
  43 | 
  44 | ### USP 4: 압박 vs 신뢰, 두 갈래 길
  45 | - **압박 루트**: 증거를 들이밀어 거짓말을 부순다 → 빠르지만 셧다운 위험
  46 | - **신뢰 루트**: 공감으로 마음을 열게 한다 → 느리지만 자발적 고백 가능
  47 | 
  48 | ### USP 5: 판결은 지혜
  49 | "누가 잘못했나?"보다 "어떻게 해결할 것인가?"가 중요하다. 책임 비율을 정하고, 조정안을 제시하고, 모호한 쟁점은 보류할 줄 아는 것이 높은 점수다.
  50 | 
  51 | ### USP 6: 편향 역전
  52 | 시스템이 플레이어의 패턴을 읽는다. 항상 한쪽만 몰아세우면 시스템이 반전을 넣고, 항상 같은 질문만 하면 효율 패널티를 준다.
  53 | 
  54 | ### USP 7: Discovery 시스템
  55 | Phase 3~5에서 작동하는 4가지 능동 발견 메커닉:
  56 | 1. **진실 공방** — A vs B 충돌 진술을 플레이어가 판단
  57 | 2. **증거 감별** — 증거의 신뢰도를 3단계로 평가
  58 | 3. **숨겨진 쟁점 발현** — 심문 중 새로운 쟁점이 드러남
  59 | 4. **감정 전략** — 감정 상태를 이용한 실수 유도
  60 | 
  61 | ## 7가지 설계 원칙
  62 | 
  63 | 1. **신뢰할 수 없는 화자** — 양쪽 모두 거짓말한다. 플레이어가 유일한 객관자다.
  64 | 2. **사건은 반드시 구조적** — 랜덤이 아니라 설계된 쟁점·증거·반전으로 구성된다.
  65 | 3. **판결은 3단계 + 조정** — 사실 인정 → 책임 비율 → 해결 방안 → (조정)
  66 | 4. **캐릭터 우선, 사건 차순** — 사건이 아니라 사람이 재미의 중심이다.
  67 | 5. **증거는 사실이자 적법성** — 결정적 증거라도 위법이면 쓸 수 없다.
  68 | 6. **압박과 신뢰, 두 루트** — 어느 쪽이든 정답이 될 수 있다.
  69 | 7. **시스템도 플레이어를 읽는다** — 편향, 반복, 효율을 추적하여 피드백한다.
```

## B. 페이즈 구조와 턴/전환 조건
출처: `02-game-flow-and-phases.md` lines 5-93
```text
   5 | 타이틀 → 챕터 선택 → 스테이지 선택
   6 |   ↓
   7 | Phase 0: 사건 개요 (읽기 전용)
   8 |   ↓
   9 | Phase 1: 초기 진술 (사전 생성 스크립트, 자동 재생)
  10 |   ↓
  11 | Phase 2: 반박 (사전 생성 스크립트, 자동 재생)
  12 |   ↓
  13 | Phase 3: 심문 — 교차 검증 (LLM 실시간 대화)
  14 |   ↓
  15 | Phase 4: 증거 심리 (LLM 실시간 대화)
  16 |   ↓
  17 | Phase 5: 재심문 (LLM 실시간 대화)
  18 |   ↓
  19 | Phase 6: 조정 (LLM 조정안 제시)
  20 |   ↓
  21 | Phase 7: 최종 판결 (플레이어 판단 입력)
  22 |   ↓
  23 | 결과 화면 (점수, 진실 공개, 칭호, 후일담, 공유)
  24 | ```
  25 | 
  26 | ## 사전 생성 vs 실시간 LLM 구간
  27 | 
  28 | | 구간 | 방식 | 설명 |
  29 | |------|------|------|
  30 | | Phase 0 | 정적 JSON | 사건 개요 텍스트 표시 |
  31 | | Phase 1~2 | 사전 생성 스크립트 | GPT Pro로 84개 사건 × 2 페이즈 = 168개 스크립트 미리 생성. 세션 중 LLM 호출 없음 |
  32 | | Phase 3~5 | 실시간 LLM | GPT-4o-mini가 플레이어 질문에 실시간 응답. 핵심 게임플레이 구간 |
  33 | | Phase 6 | 실시간 LLM | 조정안 생성 |
  34 | | Phase 7 | 룰 엔진 | 판결 입력 → 채점 (LLM 불필요) |
  35 | | 결과 | 룰 엔진 + 정적 | 점수 계산 + 후일담/칭호 표시 |
  36 | 
  37 | ## 각 페이즈 상세
  38 | 
  39 | ### Phase 0: 사건 개요
  40 | - 사건번호, 사건명, 당사자 소개, 상황 배경 표시
  41 | - 플레이어에게 읽을 시간을 준 뒤 "심리 개시" 버튼
  42 | 
  43 | ### Phase 1: 초기 진술 (자동 재생)
  44 | - A와 B가 각자 입장을 밝히는 오프닝 독백
  45 | - 대사가 순서대로 표시 (스킵 가능)
  46 | - 여기서 플레이어는 관찰만 함 — 쟁점 파악의 시작점
  47 | 
  48 | ### Phase 2: 반박 (자동 재생)
  49 | - A의 진술에 대한 B의 반박, B의 진술에 대한 A의 반박
  50 | - "그건 사실이 아닙니다" 같은 직접 충돌이 드러남
  51 | - 여전히 관찰 모드 — 어디를 파고들지 판단하는 시간
  52 | 
  53 | ### Phase 3~5: 심문 (핵심 게임플레이)
  54 | 플레이어가 직접 행동을 선택하는 구간. 세 페이즈가 연속이며, 페이즈 전환 조건이 있다.
  55 | 
  56 | **플레이어 행동 옵션:**
  57 | - 🔵 **사실 추궁** (fact_pursuit) — "그 돈은 어디로 갔습니까?"
  58 | - 🟣 **동기 탐색** (motive_search) — "왜 그런 선택을 하셨습니까?"
  59 | - 🩷 **공감 접근** (empathy_approach) — "많이 힘드셨겠습니다" (+12 신뢰)
  60 | - 📎 **증거 제시** (evidence_present) — 증거를 보여주며 압박
  61 | - ❓ **자유 질문** (free_question) — AI에게 자유롭게 질문 (조사 토큰 1 소모)
  62 | - 🗣️ **증인 소환** (witness_call) — 제3자 증인의 증언 듣기 (조사 토큰 1 소모)
  63 | 
  64 | **스킬 시스템:**
  65 | - 🔍 회피 감지 (Phase 4, ⚡1) — 답변의 회피도를 수치로 표시
  66 | - 🔒 비공개 보호 (Phase 5, 무료) — "이 증거는 판결에 안 씁니다"
  67 | - ❗ 이의제기 (⚡1) — 모든 쟁점 강제 전이
  68 | - 🚪 분리 심문 (🔍1) — 3턴간 끼어들기 차단
  69 | - ⚡ 즉답요구 (⚡1) — 특정 쟁점 S5 강제
  70 | 
  71 | **끼어들기(Interjection) 시스템:**
  72 | - 한 쪽을 심문하면 다른 쪽이 25% 확률로 끼어듦
  73 | - 플레이어는 **허용** (-3 권위 패널티) 또는 **제지** (패널티 없음) 선택
  74 | - 법정 통제력의 핵심 요소
  75 | 
  76 | ### Phase 전환 조건
  77 | ```
  78 | Phase 3 → 4: MIN_TURNS(10) OR (거짓말 전이 2회 이상) OR (10턴 경과)
  79 | Phase 4 → 5: MIN_TURNS(10) OR (거짓말 전이 2회 이상) OR (10턴 경과)
  80 | Phase 5 → 6: MAX_TURNS(20) 도달 시 자동 전환
  81 | 판결 가능 조건: 총 30턴 이상 사용
  82 | ```
  83 | 
  84 | ### Phase 6: 조정
  85 | - AI가 양측의 진술을 종합하여 조정안 제시
  86 | - 플레이어는 조정을 수락하거나 직접 판결로 넘어감
  87 | 
  88 | ### Phase 7: 최종 판결
  89 | 플레이어가 입력하는 것들:
  90 | 1. **사실 인정** — 각 쟁점이 사실인지 거짓인지 판단 (또는 보류)
  91 | 2. **책임 비율** — 각 쟁점에서 A:B 비율 설정 (0~100)
  92 | 3. **증거 적법성** — 각 증거의 사용 가부 판단
  93 | 4. **해결 방안** — 조정안 중 선택
```

## C. 증거/질문/감정 메커닉
출처: `03-core-mechanics.md` lines 1-84
```text
   1 | # 3. 핵심 메커닉 상세
   2 | 
   3 | ## Discovery 시스템 (v7.0 핵심 추가)
   4 | 
   5 | Phase 3~5에서 작동하는 4가지 능동 발견 메커닉. 플레이어가 단순히 "질문 → 답변"을 반복하는 것이 아니라, 진실을 **발견**하는 느낌을 주기 위한 시스템.
   6 | 
   7 | ### 1. 진실 공방 (Truth Confrontation)
   8 | - **트리거**: A와 B가 같은 쟁점에서 서로 모순되는 주장을 할 때 자동 발생
   9 | - **예시**: A "280만원은 간병비" vs B "외도 자금이 분명해"
  10 | - **플레이어 선택**: believe_a / believe_b / both_partial / undetermined
  11 | - **효과**: 판단 결과가 이후 질문의 방향과 에이전트 반응에 영향
  12 | 
  13 | ### 2. 증거 감별 (Evidence Appraisal)
  14 | - **트리거**: 같은 증거에 대해 2회 이상 조사 (원본 확인, 맥락 복원, 편집 탐지)
  15 | - **플레이어 판단**: trustworthy(신뢰) / partial(부분 신뢰) / suspicious(의심)
  16 | - **부분 신뢰 시**: 어떤 조사 결과를 신뢰할지 세부 선택 가능
  17 | - **함정 증거 보너스**: 위조 증거를 정확히 간파하면 추가 점수
  18 | 
  19 | ### 3. 숨겨진 쟁점 발현 (Hidden Dispute Emergence)
  20 | 처음에 보이지 않던 쟁점이 심문 과정에서 드러나는 시스템.
  21 | - **5가지 발현 경로**:
  22 |   1. 증거에서 → 새 증거 조사 시 연관 쟁점 발현
  23 |   2. 진실 공방에서 → 공방 판단 후 관련 숨겨진 쟁점 발현
  24 |   3. 증인에서 → 증인 증언이 새 쟁점을 언급
  25 |   4. 거짓말 붕괴에서 → 거짓말이 S5(침묵/재구성)까지 무너지면 관련 쟁점 발현
  26 |   5. 감정 폭발에서 → 격앙(explosive) 상태의 실수 자백으로 발현
  27 | 
  28 | ### 4. 감정 전략 (Emotional Leverage)
  29 | - **4-Tier 감정 시스템**:
  30 |   ```
  31 |   침착 (0~30)  : 방어력 높음, 거짓말 전이 ×0.5, 실수 확률 0%
  32 |   동요 (30~60) : 균형 상태, 거짓말 전이 ×1.0, 실수 확률 0%
  33 |   격앙 (60~85) : 방어력 약함, 거짓말 전이 ×1.5, 실수 확률 30%
  34 |   셧다운 (85~100): 응답 거부, 2턴간 질문 불가, 공감으로 낮춰야 함
  35 |   ```
  36 | - **전략적 딜레마**: 밀수록 전이가 빨라지지만, 너무 밀면 셧다운되어 아무 것도 못 함
  37 | 
  38 | ## 증거 시스템
  39 | 
  40 | ### 증거 유형
  41 | - **Hard Evidence** (기관 발행): 은행 거래내역, 관공서 문서, CCTV — 1개만으로 쟁점 붕괴 가능
  42 | - **Soft Evidence** (개인 자료): 카톡 캡처, 녹음, 사진 — 2개 이상 모이면 Hard로 업그레이드
  43 | 
  44 | ### 4축 감별
  45 | 증거 하나에 대해 4가지 축으로 평가:
  46 | 1. **신뢰성** (trustworthiness) — 내용이 사실과 부합하는가
  47 | 2. **완전성** (completeness) — 빠진 부분이 없는가
  48 | 3. **출처 신빙성** (source credibility) — 제공자가 믿을 만한가
  49 | 4. **적법성** (legitimacy) — 합법적으로 수집된 증거인가
  50 | 
  51 | ### 3단계 조사
  52 | 1. **원본 확인** (verify_original) — 증거 자체를 확인
  53 | 2. **맥락 복원** (restore_context) — 증거가 나온 상황을 파악
  54 | 3. **편집 탐지** (detect_editing) — 변조 여부 확인
  55 | 
  56 | ### 적법성 판단
  57 | - `lawful` → 자유롭게 사용 가능
  58 | - `gray` → 사용은 가능하나 권위 감점 위험
  59 | - `unlawful` → 사용 시 -15 권위 패널티
  60 | - **비공개 보호**: 상대가 "비공개로 해주세요"라고 요청한 증거를 판결에 쓰면 -20 패널티
  61 | 
  62 | ## 질문 시스템
  63 | 
  64 | ### 3가지 질문 유형과 효과
  65 | | 유형 | 아이콘 | 주요 효과 | 감정 변화 |
  66 | |------|--------|-----------|-----------|
  67 | | 사실 추궁 | 🔵 | 쟁점 직접 공격, 거짓말 전이 유도 | 감정 상승 |
  68 | | 동기 탐색 | 🟣 | 숨겨진 동기 탐색, 맥락 확보 | 약간 상승 |
  69 | | 공감 접근 | 🩷 | 신뢰 +12, 감정 하강 | 감정 하강 |
  70 | 
  71 | ### 상성 (Affinity) 시스템
  72 | 각 쟁점의 거짓말 유형에 따라 효과적인 질문이 다르다:
  73 | - 완전 부정(LT-1) → 사실 추궁이 효과적
  74 | - 감정 은폐(LT-5) → 공감 접근이 효과적
  75 | - 책임 전가(LT-4) → 동기 탐색이 효과적
  76 | - 상성이 맞으면 전이 확률 보너스, 안 맞으면 패널티
  77 | 
  78 | ## 미니게임 (5종)
  79 | 게임플레이 사이에 등장하는 소규모 인터랙션:
  80 | 1. **기억력 퍼즐** (MemoryPuzzle) — 진술 기억 테스트
  81 | 2. **심박 감지기** (HeartbeatDetector) — 거짓말 탐지 연출
  82 | 3. **매칭 퍼즐** (MatchingPuzzle) — 증거-쟁점 매칭
  83 | 4. **단어 스크램블** (WordScramble) — 핵심 단어 맞추기
  84 | 5. **광고 카운트다운** (AdCountdown) — 구조용
```

## D. 거짓말 FSM/내부상태/verbal tell
출처: `04-ai-and-lie-system.md` lines 22-134
```text
  22 | **핵심 원칙**: LLM은 "대사 생성"만 하고, **상태 관리와 게임 로직은 모두 클라이언트 룰 엔진**이 담당한다.
  23 | 
  24 | ## 3-Layer 프롬프트 아키텍처
  25 | 
  26 | ```
  27 | Agent (에이전트 설정)
  28 | ├── LLM config: model, temperature, max_tokens
  29 | ├── Block 조합: 15개 재사용 블록 중 선택 + sort_order
  30 | └── Context Flags: 어떤 데이터 필드를 주입할지
  31 | 
  32 | Prompt Block (프롬프트 블록, 15종)
  33 | ├── character_base: 캐릭터 기본 설정
  34 | ├── naming_rules: 호칭 규칙
  35 | ├── dialogue_rules: 대화 규칙
  36 | ├── speech_guide_short: 말투 가이드
  37 | ├── phase3/4/5_guide: 각 페이즈 행동 지침
  38 | ├── lie_state_guide: 현재 거짓말 상태에 맞는 응답 지침
  39 | ├── question_type_guide: 질문 유형별 응답 전략
  40 | ├── evidence_guide: 증거 제시 시 반응 지침
  41 | └── output_json_npc: 출력 형식
  42 | 
  43 | Data Field (데이터 필드, 25종)
  44 | ├── 캐릭터: name, archetype, speechStyle, verbalTells...
  45 | ├── 사건: disputes, evidence, truthLayers...
  46 | ├── 에이전트 상태: lieState, emotion, trust, fear...
  47 | ├── 세션: recentDialogue, currentPhase, turnsUsed...
  48 | └── 계산값: emotionTier, affinityMatch, discoveryState...
  49 | ```
  50 | 
  51 | ## 6단계 거짓말 상태머신 (Lie State Machine)
  52 | 
  53 | 각 쟁점(dispute)마다 독립적인 6단계 상태머신이 돌아간다.
  54 | 
  55 | ```
  56 | S0: 완전 부정    → "그런 적 없습니다"
  57 |  ↓
  58 | S1: 맥락 추가    → "그런 적은 있지만 이유가 있었습니다"
  59 |  ↓
  60 | S2: 부분 인정    → "일부는 맞지만 핵심은 다릅니다"
  61 |  ↓
  62 | S3: 책임 전가    → "제가 그렇게 된 건 상대방 때문입니다"
  63 |  ↓
  64 | S4: 감정 호소    → "제 입장에서 한번 생각해 보세요..."
  65 |  ↓
  66 | S5: 침묵/재구성  → "... (더 이상 부정하지 않음)"
  67 | ```
  68 | 
  69 | ### 전이 트리거
  70 | - **사실 추궁** + 관련 증거 → 높은 전이 확률
  71 | - **Hard Evidence 제시** → 매칭 안 되어도 최소 1단계 보장
  72 | - **증인 증언** → S0~S2에서 1단계 진행
  73 | - **감정 격앙(explosive)** → 전이 ×1.5 배율
  74 | - **셧다운** → 전이 불가 (0배율)
  75 | 
  76 | ### 전이 확률에 영향을 주는 요소
  77 | 1. 질문-쟁점 상성 (affinity)
  78 | 2. 감정 티어 배율 (calm ×0.5, agitated ×1.0, explosive ×1.5)
  79 | 3. 증거 유형 (hard > soft)
  80 | 4. 쟁점 가중치 (high/medium/low)
  81 | 
  82 | ## 7가지 거짓말 유형 (Lie Type)
  83 | 
  84 | | 코드 | 유형 | 설명 | 효과적인 공략 |
  85 | |------|------|------|--------------|
  86 | | LT-1 | 완전 부정 | "그런 적 없다" | Hard Evidence 직접 제시 |
  87 | | LT-2 | 부분 인정 | 작은 것 인정, 큰 것 숨김 | 인정한 부분에서 확대 |
  88 | | LT-3 | 맥락 왜곡 | 사실은 맞지만 해석이 다름 | 제3자 증언으로 맥락 복원 |
  89 | | LT-4 | 책임 전가 | "다 상대방 탓" | 동기 탐색으로 진짜 이유 캐기 |
  90 | | LT-5 | 감정 은폐 | 감정으로 논리를 덮음 | 공감 접근으로 마음 열기 |
  91 | | LT-6 | 질문 회피 | 답 대신 되물음 | 즉답요구 스킬 |
  92 | | LT-7 | 희생 발언 | 작은 것 먼저 인정해 신뢰 확보 | 큰 것을 바로 추궁 |
  93 | 
  94 | ## 7가지 거짓말 동기 (Lie Motive)
  95 | 
  96 | | 코드 | 동기 | 특징 | 공략 루트 |
  97 | |------|------|------|----------|
  98 | | LM-1 | 자기 방어 | 논리적 방어선 구축 | 논리로 깨기 (사실 추궁) |
  99 | | LM-2 | 체면 유지 | 작은 것 먼저 인정, 큰 것 숨김 | 인정에서 확대 |
 100 | | LM-3 | 제3자 보호 | 누군가를 지키려 거짓말 | 보복 걱정 해소 → S3에서 S5 직행 |
 101 | | LM-4 | 복수 | 공격적 방어 | S2→S4 스킵 (특수 전이) |
 102 | | LM-5 | 수치 회피 | **신뢰 루트 핵심** | 비공개 보호 + 공감 → 자발적 고백 |
 103 | | LM-6 | 직업/평판 보전 | 격식 있는 방어 | 증거로 논리 깨기 |
 104 | | LM-7 | 관계 유지 | 평화를 위해 숨김 | 신뢰 높이면 S4→S5 |
 105 | 
 106 | ## 에이전트 내부 상태 (3축)
 107 | 
 108 | ```
 109 | trust_toward_judge (0~100)
 110 | ├── 높을수록: 자발적 공개, 비공개 보호 수락
 111 | └── 올리는 법: 공감 접근, 비공개 보호, 일관된 공정함
 112 | 
 113 | fear_of_exposure (0~100)
 114 | ├── 높을수록: 회피 빈도 증가
 115 | └── 올리는 법: 증거 제시, 증인 소환
 116 | 
 117 | retaliation_worry (0~100)
 118 | ├── 높을수록: 제3자 보호 강화
 119 | └── 낮추는 법: 보호 보장, 분리 심문
 120 | ```
 121 | 
 122 | ## Verbal Tell (언어적 단서)
 123 | 
 124 | 각 캐릭터는 3~4개의 언어적 습관이 있다. 특정 상황에서만 발현되며, 거짓말 탐지의 단서가 된다.
 125 | 
 126 | **예시 (한지석 — avoidant 유형):**
 127 | - `over_precision` (거짓말 시): 숫자가 비정상적으로 정밀해짐 ("9시 12분쯤", "2,800,000원 딱")
 128 | - `counter_question` (궁지에 몰릴 때): 답 대신 되물음
 129 | - `timeline_padding` (수치심): 업무 동선을 길게 늘어놓으며 핵심을 회피
 130 | 
 131 | **예시 (오세린 — confrontational 유형):**
 132 | - `evidence_waving` (거짓말 시): 캡처 하나를 흔들며 단정짓기
 133 | - `motive_jump` (상처받을 때): 행동→의도 비약
 134 | - `selective_quote` (방어 시): 긴 해명에서 가장 약한 세 단어만 물기
```

## E. case-spouse-01 구조/쟁점
출처: `05-case-data-structure.md` lines 66-117
```text
  66 | ## Dispute 구조
  67 | ```typescript
  68 | {
  69 |   id: string,                    // "d-1"
  70 |   name: string,                  // "지석의 비밀 송금 280만원"
  71 |   truth: boolean,                // 사실 여부
  72 |   truthDescription: string,      // 진실 상세 설명
  73 |   quadrant: string,              // "a_only" | "b_only" | "both_know" | "shared_misconception"
  74 |   requiredEvidence: string[],    // 필수 증거 ID
  75 |   correctResponsibility: { a: number, b: number }, // 정답 책임비율
  76 |   ambiguity: string,             // "none" | "low" | "high"
  77 |   weight: string,                // "high" | "medium" | "low"
  78 |   mediationLink: string,         // 관련 조정안
  79 |   legitimacyIssue: boolean,      // 적법성 쟁점 여부
  80 |   judgmentStatement: string,     // 판결문용 한 줄 요약
  81 | }
  82 | ```
  83 | 
  84 | ## 샘플: spouse-01 "비밀 송금 의혹"
  85 | 
  86 | ### 핵심 진실
  87 | > 지석이 낯선 여자 이름으로 보낸 280만원은 외도 자금이 아니었다. 추석 연휴, 비어버린 간병 구간을 메우려 몰래 보낸 돌봄센터 예약금이었다.
  88 | 
  89 | ### 감정적 미끼
  90 | > 낯선 여자 이름으로 빠져나간 280만원, 밤 9시 모텔 골목 출입기록, '조용한 데서 보자'는 메시지 — 세 가지가 겹치면 누구라도 외도를 의심한다.
  91 | 
  92 | ### 캐릭터
  93 | - **한지석 (A)**: 39세, 물류센터 야간 운영팀장, avoidant. 숫자로 감정을 숨기고, 궁지에 몰리면 되묻는다.
  94 | - **오세린 (B)**: 36세, 프리랜서 플로리스트, confrontational. 같은 질문을 어조만 바꿔가며 반복하고, 증거 하나로 단정짓는다.
  95 | 
  96 | ### 5개 쟁점
  97 | | 쟁점 | 진실 | 비중 | 정답 책임비율 | 지식 사분면 |
  98 | |------|------|------|-------------|-----------|
  99 | | d-1: 지석의 비밀 송금 280만원 | TRUE | high | A:70 B:30 | A만 알고 있음 |
 100 | | d-2: 세린의 새벽 휴대폰 열람 | TRUE | high | A:20 B:80 | B만 알고 있음 |
 101 | | d-3: 최민정은 외도 상대인가 | FALSE | high | A:40 B:60 | 공유된 오해 |
 102 | | d-4: 세린의 우회 송금 150만원 | TRUE | high | A:25 B:75 | B만 알고 있음 |
 103 | | d-5: 100만원 사전 상의 약속 위반 | TRUE | medium | A:55 B:45 | 양측 모두 앎 |
 104 | 
 105 | ### 반전 모듈: TW-6 (공유 오해 반전)
 106 | 두 사람 모두 같은 거짓 사실을 믿고 있다: "최민정은 외도 상대"라는 세린의 확신을, 지석도 (변명을 못 해서) 부인하지 못한다. 진실은 돌봄센터 상담팀장.
 107 | 
 108 | ### 관계 원장 (Relationship Ledger)
 109 | 1. **확인된 과거**: 재작년 주식 손실 후 "100만원 이상은 반드시 상의" 약속
 110 | 2. **왜곡된 과거**: 세린 동생 급전 도움에 대한 서로 다른 기억
 111 | 3. **침묵의 과거**: 처가 어머니 간병 분담을 제대로 정하지 못한 채 덮어둠
 112 | 
 113 | ### 증인 (Social Graph)
 114 | 1. **오미숙** (세린 어머니, pro_b) — 간병 필요성 알지만 딸 편
 115 | 2. **이재훈** (지석 동료, pro_a) — 지석의 돌봄센터 문의를 알고 있음
 116 | 3. **최민정** (돌봄센터 상담팀장, neutral) — 사건의 핵심 열쇠
 117 | 4. **정우성** (세린 대학동기, neutral) — 세린의 우회 송금 경유 계좌 보유
```

## F. 채점/권위 패널티
출처: `06-scoring-and-progression.md` lines 1-44
```text
   1 | # 6. 채점 & 진행 시스템
   2 | 
   3 | ## 3축 채점 시스템
   4 | 
   5 | 판결 후 3가지 축으로 점수를 매기고, 평균이 최종 점수가 된다.
   6 | 
   7 | ### 🔍 통찰 (Insight) — "진실을 얼마나 정확히 파악했는가"
   8 | - **기본 점수**: 각 쟁점의 사실 판단 정확도 × 쟁점 가중치
   9 | - **책임 비율 정확도**: 정답과의 차이에 따라 가감
  10 | - **모호한 쟁점 보류**: ambiguity=high인 쟁점을 보류하면 70% 인정 (단정지으면 0 or 100)
  11 | - **과정 보너스**:
  12 |   - 거짓말 붕괴 1회당 +3 (최대 +10)
  13 |   - 증거 발견 1회당 +3 (최대 +6)
  14 |   - 자유질문 적중 1회당 +2 (최대 +6)
  15 |   - 심층 truth 해금 1회당 +4 (최대 +8)
  16 |   - 상성 적중 1회당 +2 (최대 +6)
  17 |   - 질문 효율(전이율 30%+) +5
  18 | 
  19 | ### ⚖️ 권위 (Authority) — "법정을 얼마나 잘 통제했는가"
  20 | - **기본 점수**: 70점 시작
  21 | - **법정 통제력**: 남은 통제력 × 5
  22 | - **위법 증거 사용**: -15 per evidence
  23 | - **비공개 약속 위반**: -20
  24 | - **턴 초과**: 20턴 이후부터 턴당 -2 (최대 -10)
  25 | - **과정 보너스**:
  26 |   - 효과적 증거 제시 +4 (최대 +8)
  27 |   - 필수 경로 충족 +3 (최대 +6)
  28 |   - 양측 모두 심문 +4
  29 | - **패널티**:
  30 |   - 반복 심문 -2 (최대 -6)
  31 |   - 근거 없는 거짓말 붕괴 -6 (최대 -6)
  32 |   - **끼어들기 허용 -3 (최대 -9)** ← 핵심 메커닉
  33 | 
  34 | ### 💡 지혜 (Wisdom) — "판결이 얼마나 현명한가"
  35 | - **기본 점수**: 50점 시작
  36 | - **해결 방안 제시**: +20
  37 | - **극단적 판결**: 모든 책임을 한쪽에 몰면 -20
  38 | - **모호한 쟁점 적절 보류**: +10
  39 | - **과정 보너스**:
  40 |   - 비공개 보호 활용 +4 (최대 +8)
  41 |   - 토글 스킬 활용 +2 (최대 +6)
  42 |   - 자유질문 2회+ 적중 +3
  43 |   - 보너스 경로 충족 +2 (최대 +4)
  44 | - **패널티**:
```

## G. 엔진 코드 샘플(거짓말/감정/폴백)
출처: `07-engine-code-samples.md` lines 1-120
```text
   1 | # 7. 핵심 엔진 코드 샘플
   2 | 
   3 | ## 1. 거짓말 상태머신 (lieStateMachine.ts)
   4 | 
   5 | 쟁점(dispute)마다 독립적인 상태머신이 돌아간다. 핵심은 `attemptLieTransition` 함수.
   6 | 
   7 | ```typescript
   8 | // 전이 시도의 핵심 로직
   9 | export function attemptLieTransition(
  10 |   entry: LieStateEntry,
  11 |   config: LieConfig,
  12 |   trigger: string,
  13 |   agentState: AgentState,
  14 | ): TransitionResult {
  15 |   // 이미 S5면 더 이상 전이 없음
  16 |   if (currentState === 'S5') return noTransition
  17 | 
  18 |   // 1순위: 신뢰 루트 — trust 임계치 + 공감/신뢰 트리거 → S5 직행
  19 |   if (entry.collapseViaTrust &&
  20 |       agentState.trustState.trustTowardJudge >= TRUST_THRESHOLDS.voluntaryConfession &&
  21 |       (trigger.includes('empathy') || trigger.includes('trust'))) {
  22 |     return { transitioned: true, from: currentState, to: 'S5', trigger: 'voluntary_confession' }
  23 |   }
  24 | 
  25 |   // 2순위: 동기별 특수 전이
  26 |   // - LM-4(복수): S2 → S4 스킵 (감정적 폭발)
  27 |   // - LM-3(제3자 보호): 보복 걱정 해소 시 S3 → S5 직행
  28 |   // - LM-7(관계 유지): 신뢰 높으면 S4 → S5
  29 | 
  30 |   // 3순위: config의 transitions 매칭
  31 |   // 4순위: Hard Evidence → 최소 1단계 보장
  32 |   // 5순위: 증인 증언 → S0~S2에서 1단계 진행
  33 | }
  34 | ```
  35 | 
  36 | ## 2. 감정 엔진 (emotionEngine.ts)
  37 | 
  38 | 캐릭터 archetype × 감정 단계별 행동 힌트를 정의.
  39 | 
  40 | ```typescript
  41 | const BEHAVIOR_HINTS: Record<Archetype, Record<EmotionalPhase, string>> = {
  42 |   avoidant: {
  43 |     defensive: '답변 전에 시선을 아래로 향하고, 단어를 고르듯 천천히 말한다.',
  44 |     confident: '어깨를 펴고 단정한 어조로 말한다.',
  45 |     shaken: '말이 길어지기 시작하고, "정확히"라는 표현이 반복된다.',
  46 |     angry: '목소리가 낮아지며 "제가 그런 사람으로 보이십니까"를 반복한다.',
  47 |     resigned: '한숨과 함께 시선이 탁자로 내려간다. 답변이 짧아진다.',
  48 |   },
  49 |   confrontational: {
  50 |     defensive: '팔짱을 끼고 빠르게 반박한다.',
  51 |     confident: '목소리가 커지고 단정적으로 말한다.',
  52 |     shaken: '말이 빨라지고 같은 표현을 반복한다.',
  53 |     angry: '자리에서 일어서려 하고, 목소리가 높아진다.',
  54 |     resigned: '고개를 숙이고 한 마디씩 끊어 말한다.',
  55 |   },
  56 |   // victim_cosplay, cold_logic도 동일 구조
  57 | }
  58 | 
  59 | // 감정 업데이트: delta 적용 → 0~100 클램핑 → 새 phase 판정
  60 | export function updateEmotion(current, delta, archetype): EmotionalState {
  61 |   const newValue = Math.max(0, Math.min(100, current.internalValue + delta))
  62 |   const newPhase = getEmotionalPhase(newValue)
  63 |   return { phase: newPhase, internalValue: newValue, behaviorHint: getBehaviorHint(archetype, newPhase) }
  64 | }
  65 | ```
  66 | 
  67 | ## 3. Discovery 엔진 (discoveryEngine.ts, 발췌)
  68 | 
  69 | 4개 메커닉의 핵심 로직.
  70 | 
  71 | ```typescript
  72 | // 감정 4-Tier 설정
  73 | export const EMOTION_TIER_CONFIG = [
  74 |   { tier: 'calm',      min: 0,  max: 30,  lieTransitionMultiplier: 0.5, slipChance: 0   },
  75 |   { tier: 'agitated',  min: 30, max: 60,  lieTransitionMultiplier: 1.0, slipChance: 0   },
  76 |   { tier: 'explosive', min: 60, max: 85,  lieTransitionMultiplier: 1.5, slipChance: 0.3 },
  77 |   { tier: 'shutdown',  min: 85, max: 100, lieTransitionMultiplier: 0,   slipChance: 0   },
  78 | ]
  79 | 
  80 | // 셧다운이면 질문 불가
  81 | export function canInterrogate(emotionValue: number): boolean {
  82 |   return getEmotionTier(emotionValue).tier !== 'shutdown'
  83 | }
  84 | 
  85 | // 진실 공방 트리거 — 같은 쟁점에서 A와 B의 주장이 실질적으로 충돌하는지 확인
  86 | export function checkTruthConfrontation(claims, judgments, ...): TruthConfrontationEvent | null {
  87 |   // 양측 claim 비교 → 같은 disputeId에서 서로 다른 주장 → 이벤트 생성
  88 | }
  89 | ```
  90 | 
  91 | ## 4. 증거 엔진 (evidenceEngine.ts)
  92 | 
  93 | ```typescript
  94 | // 증거 잠금 해제 체크 — 선행 증거가 제시되면 후행 증거 잠금 해제
  95 | export function checkUnlocks(states, evidence): { updated, newlyUnlocked } {
  96 |   for (const e of evidence) {
  97 |     if (state.unlocked) continue
  98 |     const allRequirementsMet = e.requires.every(reqId => states[reqId]?.presented || states[reqId]?.unlocked)
  99 |     if (allRequirementsMet) { updated[e.id] = { ...state, unlocked: true } }
 100 |   }
 101 | }
 102 | 
 103 | // 증거 감별 가능 조건: 2회 이상 조사
 104 | export function canAppraise(state: EvidenceRuntimeState): boolean {
 105 |   return state.unlocked && state.investigatedActions.length >= 2
 106 | }
 107 | ```
 108 | 
 109 | ## 5. 판결 채점 엔진 (verdictEngine.ts)
 110 | 
 111 | ```typescript
 112 | export function calculateVerdict(ctx: VerdictContext): VerdictScore {
 113 |   const insight = calculateInsight(ctx)   // 진실 파악 정확도
 114 |   const authority = calculateAuthority(ctx) // 법정 통제력
 115 |   const wisdom = calculateWisdom(ctx)      // 판결 현명함
 116 |   const total = Math.round((insight + authority + wisdom) / 3)
 117 |   return { insight, authority, wisdom, total }
 118 | }
 119 | 
 120 | // 통찰: 쟁점별 사실판단 정확도 + 책임비율 정확도 + 과정 보너스
```

## H. 콘텐츠 규모/84사건
출처: `08-content-scale.md` lines 1-60
```text
   1 | # 8. 콘텐츠 규모 & 구조
   2 | 
   3 | ## 전체 콘텐츠 규모
   4 | 
   5 | | 항목 | 수량 | 설명 |
   6 | |------|------|------|
   7 | | 관계 유형 | 7종 | spouse, neighbor, workplace, partnership, family, tenant, friend |
   8 | | 사건 (케이스) | 84개 | 7종 × 12개 |
   9 | | 쟁점 (dispute) | ~420개 | 사건당 평균 5개 |
  10 | | 증거 (evidence) | ~504개 | 사건당 평균 6개 |
  11 | | 증인 (witness) | ~253명 | 사건당 3~4명 |
  12 | | 관계 이력 | ~252개 | 사건당 3개 |
  13 | | Phase 1 스크립트 | 84개 | 초기 진술 (사전 생성) |
  14 | | Phase 2 스크립트 | 84개 | 반박 (사전 생성) |
  15 | | 진실 정책 (truthPolicy) | 568KB | 진실 평가 규칙 |
  16 | | 증인 예산 (witnessBudget) | 267KB | 증인 가용성 정책 |
  17 | | 사건 보강 데이터 | 850KB | 증인 말투 샘플, 상성 데이터 등 |
  18 | 
  19 | ## 사건 조합 공식
  20 | 
  21 | ```
  22 | DuoSeed (캐릭터 쌍)
  23 |   × ContextSeed (배경 압력)
  24 |   × CS (갈등 씨앗 1개 필수)
  25 |   × VM (변수 모듈 1~2개)
  26 |   × TW (반전 모듈 0~1개)
  27 | ```
  28 | 
  29 | ### 6가지 갈등 씨앗 (Conflict Seed)
  30 | | 코드 | 유형 | 예시 |
  31 | |------|------|------|
  32 | | CS-1 | 재정 은폐 | 비밀 송금, 숨긴 지출 |
  33 | | CS-2 | 공 가로채기 | 아이디어 도용, 성과 횡취 |
  34 | | CS-3 | 영역/권한 침범 | 사생활 침해, 월권 |
  35 | | CS-4 | 신뢰 배반 | 약속 파기, 뒷담화 |
  36 | | CS-5 | 명예 훼손 | 험담, SNS 공격 |
  37 | | CS-6 | 계약/약속 파기 | 계약 위반, 구두 약속 불이행 |
  38 | 
  39 | ### 5가지 변수 모듈 (Variable Module)
  40 | | 코드 | 유형 | 효과 |
  41 | |------|------|------|
  42 | | VM-A | 제3자 개입 | 증인이 핵심 역할 |
  43 | | VM-B | 증거 변조/누락 | 위조 증거 판별 필요 |
  44 | | VM-C | 오해 기반 | 사실 자체가 아닌 해석이 문제 |
  45 | | VM-D | 공동 책임 | 양쪽 모두 잘못 |
  46 | | VM-E | 과거 소환 | 관계 이력이 현재 갈등에 영향 |
  47 | 
  48 | ### 6가지 반전 모듈 (Twist Module)
  49 | | 코드 | 유형 | 설명 |
  50 | |------|------|------|
  51 | | TW-1 | 피해자 역전 | 피해자가 사실 가해자 |
  52 | | TW-2 | 배신 역전 | 배신한 줄 알았던 사람의 사정 |
  53 | | TW-3 | 공모 역전 | 둘 다 짜고 친 것 |
  54 | | TW-4 | 증거 위조 역전 | 결정적 증거가 가짜 |
  55 | | TW-5 | 사전 합의 역전 | 사전에 약속이 있었음 |
  56 | | TW-6 | 공유 오해 역전 | 양쪽 모두 같은 거짓을 믿음 |
  57 | 
  58 | ## 인과 4-Layer
  59 | 
  60 | 각 사건은 4겹의 인과 구조:
```

## I. 기술 스택/런타임 GPT-4o-mini
출처: `09-tech-stack.md` lines 1-40
```text
   1 | # 9. 기술 스택 & 아키텍처
   2 | 
   3 | ## 프론트엔드
   4 | - **React 19** + **TypeScript**
   5 | - **Vite 8** (빌드 도구)
   6 | - **Tailwind CSS v4** (스타일링)
   7 | - **Zustand 5** (상태 관리, 슬라이스 패턴)
   8 | 
   9 | ## 백엔드
  10 | - **Express.js** (API 서버)
  11 | - **SQLite** (better-sqlite3)
  12 | - 12개 API 라우트: aiAgents, aiBlocks, aiDataFields, aiPrompts, caseMeta, eval, llmLog, mail, notices, players, seasons, stats
  13 | 
  14 | ## LLM 통합
  15 | - **OpenAI GPT-4o-mini** (런타임 Phase 3~5 대화)
  16 | - **GPT Pro** (사전 생성: 84개 사건 + 168개 스크립트)
  17 | - **Claude Code** (텍스트 정제, 구조 검수, 개발 전반)
  18 | 
  19 | ## 비주얼
  20 | - **MS Fluent Emoji** (81종, 256×256 PNG)
  21 | - 캐릭터/장면은 이모지 기반 (별도 일러스트 없음)
  22 | 
  23 | ## 사운드
  24 | - **Web Audio API** (음향 합성)
  25 | - BGM 4트랙 + SFX 9종 (MP3)
  26 | 
  27 | ## 상태 관리 (Zustand 8 Slices)
  28 | 
  29 | ```
  30 | useGameStore
  31 | ├── phaseSlice      — 현재 페이즈, 턴 카운트, 전환 조건
  32 | ├── dialogueSlice   — 대화 이력, 현재 대화 노드
  33 | ├── evidenceSlice   — 증거 상태 (잠금/해제/제시)
  34 | ├── discoverySlice  — Discovery 4 메커닉 상태 (v7.0 신규)
  35 | ├── agentSlice      — AI 에이전트 상태 (거짓말, 감정, 신뢰)
  36 | ├── resourceSlice   — 플레이어 리소스 (토큰, 통제력)
  37 | ├── shopSlice       — 글로벌 리소스, 캡
  38 | └── verdictSlice    — 판결 입력, 점수
  39 | ```
  40 | 
```

## J. 실제 데이터: 캐릭터/쟁점/증거
출처: `10-actual-data-samples.md` lines 8-220
```text
   8 | ## A. 사건 JSON 전체 — spouse-01 "비밀 송금 의혹"
   9 | 
  10 | ### A-1. 메타 정보
  11 | ```json
  12 | {
  13 |   "caseId": "case-spouse-01",
  14 |   "meta": {
  15 |     "relationshipType": "spouse",
  16 |     "conflictSeed": "CS-1",
  17 |     "variableModules": ["VM-C"],
  18 |     "twistModule": "TW-6",
  19 |     "difficulty": "medium",
  20 |     "anchorTruth": "지석이 낯선 여자 이름으로 보낸 280만원은 외도 자금이 아니었다. 추석 연휴, 비어버린 간병 구간을 메우려 몰래 보낸 돌봄센터 예약금이었다.",
  21 |     "emotionalBait": "낯선 여자 이름으로 빠져나간 280만원, 밤 9시 모텔 골목 출입기록, '조용한 데서 보자'는 메시지 — 세 가지가 겹치면 누구라도 외도를 의심한다.",
  22 |     "resolutionDilemma": "아내 몰래 처가 어머니를 챙긴 남편의 선의와, 새벽에 남편 폰을 열어본 아내의 불안 — 어느 쪽이 더 무거운가?"
  23 |   }
  24 | }
  25 | ```
  26 | 
  27 | ### A-2. 캐릭터 프로필 (partyA — 한지석)
  28 | ```json
  29 | {
  30 |   "name": "한지석",
  31 |   "age": 39,
  32 |   "occupation": "물류센터 야간 운영팀장",
  33 |   "incomeBracket": "mid",
  34 |   "archetype": "avoidant",
  35 |   "speechStyle": "곤란한 질문에는 '9월 20일 기준으로 말씀드리면'처럼 숫자부터 꺼내며 감정을 뒤로 미룬다. 궁지에 몰리면 '그건 순서가 있습니다'라며 흐름을 자기 쪽으로 잡으려 든다.",
  36 |   "pride": 7,
  37 |   "fear": "처가 살림을 혼자 감당 못 하는 무능한 남편, 돈 앞에서 쩔쩔매는 가장이라는 시선이 가장 두렵다.",
  38 |   "riskAppetite": 4,
  39 |   "digitalHabit": "banking_app_heavy",
  40 |   "dailyRoutine": "오후에 출근해 밤샘 근무를 하고, 새벽 귀가 후 오전엔 은행·관공서 일을 몰아서 처리한다.",
  41 |   "sensitivePoints": ["가장 역할", "처가 지원 문제", "실패한 투자 전력"],
  42 |   "verbalTells": [
  43 |     {
  44 |       "type": "over_precision",
  45 |       "trigger": "lying",
  46 |       "pattern": "불편한 질문이 올수록 숫자가 정밀해진다. '한 9시쯤'이 아니라 '9시 12분쯤', '280만원 정도'가 아니라 '2,800,000원 딱' — 정확함 뒤에 감정을 숨기는 버릇이다."
  47 |     },
  48 |     {
  49 |       "type": "counter_question",
  50 |       "trigger": "cornered",
  51 |       "pattern": "의도를 추궁당하면 답 대신 되묻는다. '왜 그랬냐고요? 그럼 당신은 왜 그걸 봤는데요?'"
  52 |     },
  53 |     {
  54 |       "type": "timeline_padding",
  55 |       "trigger": "shame",
  56 |       "pattern": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다. '그날 저녁 8시 반에 물류 마감 끝내고, 동료한테 인수인계하고, 주차장까지 걸어가는데…' — 핵심을 에둘러 시간을 번다."
  57 |     }
  58 |   ],
  59 |   "callTerms": {
  60 |     "toPartner": "자기",
  61 |     "toJudge": "제 아내",
  62 |     "angry": "오세린 씨!"
  63 |   }
  64 | }
  65 | ```
  66 | 
  67 | ### A-3. 쟁점 (Disputes) — 5개 전부
  68 | ```json
  69 | [
  70 |   {
  71 |     "id": "d-1",
  72 |     "name": "지석의 비밀 송금 280만원",
  73 |     "truth": true,
  74 |     "truthDescription": "지석은 세린에게 한마디 상의 없이 공동생활비 계좌에서 280만원을 빼냈다. 받는 사람은 재가돌봄센터 상담팀장 최민정. 목적은 추석 연휴 간병 예약금이었지만, 숨긴 것 자체가 약속 위반이다.",
  75 |     "quadrant": "a_only",
  76 |     "requiredEvidence": ["e-1", "e-2"],
  77 |     "correctResponsibility": { "a": 70, "b": 30 },
  78 |     "ambiguity": "none",
  79 |     "weight": "high",
  80 |     "judgmentStatement": "지석은 세린에게 비밀 송금을 했다."
  81 |   },
  82 |   {
  83 |     "id": "d-2",
  84 |     "name": "세린의 새벽 휴대폰 열람",
  85 |     "truth": true,
  86 |     "truthDescription": "세린은 새벽 2시에 잠든 지석의 휴대폰 잠금을 풀고 메신저 대화를 캡처했다. 그 캡처를 언니에게 보내며 '이거 외도 맞지?'라고 물었다.",
  87 |     "quadrant": "b_only",
  88 |     "requiredEvidence": ["e-3"],
  89 |     "correctResponsibility": { "a": 20, "b": 80 },
  90 |     "ambiguity": "none",
  91 |     "weight": "high",
  92 |     "judgmentStatement": "세린은 지석의 휴대폰을 열람했다."
  93 |   },
  94 |   {
  95 |     "id": "d-3",
  96 |     "name": "최민정은 외도 상대인가",
  97 |     "truth": false,
  98 |     "truthDescription": "최민정은 외도 상대가 아니다. 재가돌봄센터 상담팀장이며, 모텔 골목에서 만난 것처럼 보인 장면은 같은 블록에 붙은 센터 후문 상담실에서 간병 일정을 잡은 것이었다.",
  99 |     "quadrant": "shared_misconception",
 100 |     "requiredEvidence": ["e-3", "e-4"],
 101 |     "correctResponsibility": { "a": 40, "b": 60 },
 102 |     "ambiguity": "low",
 103 |     "weight": "high",
 104 |     "judgmentStatement": "최민정은 외도 상대가 아니다."
 105 |   },
 106 |   {
 107 |     "id": "d-4",
 108 |     "name": "세린의 우회 송금 150만원",
 109 |     "truth": true,
 110 |     "truthDescription": "세린도 깨끗하지 않다. 동생의 밀린 월세 3개월치를 막으려 대학 동기 정우성 계좌를 경유해 150만원을 우회 송금했다.",
 111 |     "quadrant": "b_only",
 112 |     "requiredEvidence": ["e-5", "e-6"],
 113 |     "correctResponsibility": { "a": 25, "b": 75 },
 114 |     "ambiguity": "none",
 115 |     "weight": "high",
 116 |     "judgmentStatement": "세린은 150만원을 우회 송금했다."
 117 |   },
 118 |   {
 119 |     "id": "d-5",
 120 |     "name": "100만원 사전 상의 약속 위반",
 121 |     "truth": true,
 122 |     "truthDescription": "재작년에 세운 '100만원 이상은 반드시 상의' 약속을 두 사람 모두 어겼다.",
 123 |     "quadrant": "both_know",
 124 |     "requiredEvidence": ["e-1", "e-6"],
 125 |     "correctResponsibility": { "a": 55, "b": 45 },
 126 |     "ambiguity": "none",
 127 |     "weight": "medium",
 128 |     "judgmentStatement": "지석과 세린은 약속을 위반했다."
 129 |   }
 130 | ]
 131 | ```
 132 | 
 133 | ### A-4. 증거 (Evidence) — 대표 3개
 134 | ```json
 135 | [
 136 |   {
 137 |     "id": "e-1",
 138 |     "name": "공동계좌→최민정 280만원 이체 내역",
 139 |     "type": "bank",
 140 |     "reliability": "hard",
 141 |     "completeness": "original",
 142 |     "provenance": "institutional",
 143 |     "legitimacy": "lawful",
 144 |     "proves": ["d-1", "d-5"],
 145 |     "isTrap": false,
 146 |     "requires": [],
 147 |     "subjectParty": "a",
 148 |     "investigationResults": {
 149 |       "request_original": "은행 발급 원본에 이체 시각 '9월 20일 14:03', 수취인 '최민정'이 찍혀 있다. 금액 2,800,000원. 메모란은 비어 있다.",
 150 |       "check_metadata": "이체 단말은 지석 명의 휴대폰, 공인인증도 지석 본인 명의다.",
 151 |       "restore_context": "이체 7분 전과 23분 전, 돌봄센터 대표번호(1588-XXXX)로 두 차례 통화한 기록이 있다.",
 152 |       "verify_source": "은행 고객센터에 대조한 결과, PDF 해시값이 원본과 일치한다. 위·변조 흔적 없음.",
 153 |       "check_edits": "은행 시스템에서 직접 출력한 PDF 발급본이다. 수정 이력이나 이미지 편집 흔적은 없다.",
 154 |       "question_acquisition": "부부 공동명의 계좌이므로 어느 쪽이든 조회할 권리가 있다."
 155 |     }
 156 |   },
 157 |   {
 158 |     "id": "e-3",
 159 |     "name": "지석 휴대폰 메신저 캡처본",
 160 |     "type": "chat",
 161 |     "reliability": "soft",
 162 |     "completeness": "cropped",
 163 |     "provenance": "personal_device",
 164 |     "legitimacy": "privacy_concern",
 165 |     "proves": ["d-2", "d-3"],
 166 |     "isTrap": true,
 167 |     "requires": [],
 168 |     "subjectParty": "both",
 169 |     "partyContext": {
 170 |       "a": {
 171 |         "questionAngle": "한지석에게: \"최민정은 외도 상대인가\" 관련 해명 요구",
 172 |         "implication": "이 증거는 한지석의 \"최민정은 외도 상대인가\" 쟁점과 관련된다."
 173 |       },
 174 |       "b": {
 175 |         "questionAngle": "오세린에게: \"세린의 새벽 휴대폰 열람\" 관련 해명 요구",
 176 |         "implication": "이 증거는 오세린의 \"세린의 새벽 휴대폰 열람\" 쟁점과 관련된다."
 177 |       }
 178 |     },
 179 |     "investigationResults": {
 180 |       "request_original": "전체 대화 원본은 제출되지 않았다. 세린이 캡처한 스크린샷 1장뿐이며, 앞뒤 수십 줄이 잘려 있다.",
 181 |       "check_metadata": "캡처 파일의 생성 시각이 새벽 2시 07분이다. 지석이 잠든 사이에 폰을 열어 찍은 것으로 보인다.",
 182 |       "restore_context": "'조용한 데서 보죠'만 떼어 보면 밀회처럼 읽히지만, 앞뒤가 잘려 있어 상담 장소 약속인지 사적 만남인지 이 캡처만으로는 알 수 없다.",
 183 |       "check_edits": "글자를 고치거나 합성한 흔적은 없다. 다만 대화의 위아래를 의도적으로 잘라낸 선택적 크롭이 확인된다.",
 184 |       "question_acquisition": "새벽에 잠든 배우자의 휴대폰 잠금을 풀고 무단 열람해 얻은 자료다. 취득 과정 자체가 사생활 침해에 해당할 수 있다."
 185 |     }
 186 |   },
 187 |   {
 188 |     "id": "e-2",
 189 |     "name": "재가돌봄센터 간병 예약 확인서",
 190 |     "type": "contract",
 191 |     "reliability": "hard",
 192 |     "completeness": "original",
 193 |     "provenance": "institutional",
 194 |     "legitimacy": "lawful",
 195 |     "proves": ["d-1", "d-3"],
 196 |     "isTrap": false,
 197 |     "requires": ["e-1"],
 198 |     "subjectParty": "a",
 199 |     "investigationResults": {
 200 |       "request_original": "예약서 신청인란에 '한지석', 돌봄 대상자란에 '오미숙(처모)'. 기간은 추석 연휴 3일, 예약금 280만원 수납 완료.",
 201 |       "check_metadata": "예약서 작성 시각은 송금 당일 14:31, 이체 28분 뒤다.",
 202 |       "restore_context": "상담 사유란에 '추석 연휴 기간 가족 돌봄 공백 — 가족 간 일정 조율 전 긴급 예약'이라고 적혀 있다.",
 203 |       "verify_source": "센터 직인, 대표번호, 사업자등록번호를 대조한 결과 모두 실제 기관 정보와 일치.",
 204 |       "check_edits": "전자서명 유효성 검증 통과. 발급 이후 한 글자도 수정되지 않았다.",
 205 |       "question_acquisition": "돌봄센터가 직접 발급한 기관 제출본이라 취득 경위에 문제없다."
 206 |     }
 207 |   }
 208 | ]
 209 | ```
 210 | 
 211 | ### A-5. 진실 테이블 (Truth Table)
 212 | ```json
 213 | [
 214 |   { "id": "t-1", "fact": "지석이 최민정에게 보낸 280만원은 연휴 간병 예약금이었다.", "isTrue": true, "weight": 10, "quadrant": "a_only" },
 215 |   { "id": "t-2", "fact": "세린은 지석의 휴대폰을 무단 열람해 캡처를 제3자에게 보냈다.", "isTrue": true, "weight": 9, "quadrant": "b_only" },
 216 |   { "id": "t-3", "fact": "골목 만남처럼 보인 접촉은 돌봄센터 후문 상담 일정이었다.", "isTrue": true, "weight": 8, "quadrant": "shared_misconception" },
 217 |   { "id": "t-4", "fact": "세린도 동생을 위해 150만원을 우회 송금했다.", "isTrue": true, "weight": 8, "quadrant": "b_only" },
 218 |   { "id": "t-5", "fact": "두 사람 모두 100만원 이상 사전 상의 약속을 다른 방식으로 어겼다.", "isTrue": true, "weight": 7, "quadrant": "both_know" }
 219 | ]
 220 | ```
```

## K. 실제 데이터: lie config + truth policy
출처: `10-actual-data-samples.md` lines 224-292
```text
 224 | ## B. 거짓말 설정 (Lie Config) — spouse-01 partyA
 225 | 
 226 | LLM은 이 설정에 따라 "어떻게 거짓말하고, 어떤 트리거에 어떤 순서로 무너지는지"를 제어받는다.
 227 | 
 228 | ```json
 229 | [
 230 |   {
 231 |     "disputeId": "d-1",
 232 |     "lieType": "LT-2",
 233 |     "lieIntensity": "L2",
 234 |     "lieMotive": "face_saving",
 235 |     "initialState": "S0",
 236 |     "collapseViaTrust": false,
 237 |     "transitions": [
 238 |       { "from": "S0", "to": "S1", "trigger": "bank_transfer_question" },
 239 |       { "from": "S1", "to": "S2", "trigger": "e-1_presented" },
 240 |       { "from": "S2", "to": "S3", "trigger": "purpose_followup" },
 241 |       { "from": "S3", "to": "S5", "trigger": "e-2_or_responsibility_question" }
 242 |     ]
 243 |   },
 244 |   {
 245 |     "disputeId": "d-3",
 246 |     "lieType": "LT-6",
 247 |     "lieIntensity": "L3",
 248 |     "lieMotive": "relationship_maintenance",
 249 |     "initialState": "S0",
 250 |     "collapseViaTrust": true,
 251 |     "transitions": [
 252 |       { "from": "S0", "to": "S1", "trigger": "cropped_chat_presented" },
 253 |       { "from": "S1", "to": "S2", "trigger": "location_timeline_question" },
 254 |       { "from": "S2", "to": "S4", "trigger": "nonjudgmental_question_about_mother_in_law" },
 255 |       { "from": "S4", "to": "S5", "trigger": "e-4_or_emotion_threshold" }
 256 |     ]
 257 |   },
 258 |   {
 259 |     "disputeId": "d-5",
 260 |     "lieType": "LT-3",
 261 |     "lieIntensity": "L1",
 262 |     "lieMotive": "self_protection",
 263 |     "initialState": "S0",
 264 |     "collapseViaTrust": false,
 265 |     "transitions": [
 266 |       { "from": "S0", "to": "S1", "trigger": "agreement_reminder" },
 267 |       { "from": "S1", "to": "S2", "trigger": "e-6_presented" },
 268 |       { "from": "S2", "to": "S5", "trigger": "shared_responsibility_question" }
 269 |     ]
 270 |   }
 271 | ]
 272 | ```
 273 | 
 274 | **핵심 포인트**: d-3("최민정은 외도 상대인가")에서 `collapseViaTrust: true`이다. 즉 압박이 아니라 **공감 루트**로도 무너뜨릴 수 있다. 신뢰가 임계치를 넘으면 자발적 고백(S5 직행).
 275 | 
 276 | ---
 277 | 
 278 | ## C. 진실 공개 정책 (Truth Policy) — spouse-01, partyA
 279 | 
 280 | LLM이 각 lie state에서 **어떤 진실을 말해도 되고, 어떤 진실을 절대 말하면 안 되는지** 제어한다.
 281 | 
 282 | ```
 283 | spouse-01 → partyA → d-1 (비밀 송금 280만원):
 284 |   S0: allowed=[], forbidden=[t-1,t-2,t-3,t-4,t-5]  ← 전부 금지
 285 |   S1: allowed=[], forbidden=[t-1,t-2,t-3,t-4,t-5]  ← 전부 금지
 286 |   S2: allowed=[t-3], forbidden=[t-1,t-2,t-4,t-5]    ← "골목 만남=상담" 만 허용
 287 |   S3: allowed=[t-3], forbidden=[t-1,t-2,t-4,t-5]
 288 |   S4: allowed=[t-3,t-5], forbidden=[t-1,t-2,t-4]    ← "약속 위반" 추가 허용
 289 |   S5: allowed=[t-1~t-5], forbidden=[]                ← 전부 공개
 290 | ```
 291 | 
 292 | **이것이 왜 중요한가**: LLM은 사건의 모든 정보를 system prompt로 받지만, truth policy가 "지금 이 상태에서 이 진실은 말하면 안 된다"를 강제한다. **이 가드가 제대로 작동하지 않으면 AI가 너무 일찍 진실을 누설**한다.
```

## L. 실제 데이터: witness budget + Phase1 script
출처: `10-actual-data-samples.md` lines 296-388
```text
 296 | ## D. 증인 예산 (Witness Budget) — spouse-01
 297 | 
 298 | 각 증인이 **말해도 되는 것 / 불확실한 것 / 절대 말하면 안 되는 것**을 정의한다.
 299 | 
 300 | ```
 301 | tp-1: 오미숙 (세린의 어머니) — bias: pro_b
 302 |   canState:
 303 |     - "추석 연휴에 본인 돌봄 공백이 생겨 가족이 간병 인력을 알아보던 분위기가 있었다."
 304 |     - "세린이 동생 돈 문제를 남편에게 바로 말하지 못해 마음이 급해 보였다."
 305 |   uncertain:
 306 |     - "280만원 송금의 정확한 시각과 명목은 직접 보지 못했다."
 307 |     - "최민정을 만난 밤 골목 접촉의 실제 목적은 전해 들은 수준이다."
 308 |   forbidden:
 309 |     - "세린의 휴대폰 무단 열람과 제3자 캡처 공유의 구체적 경위"
 310 |     - "정우성 계좌를 거친 150만원의 실제 금융 흐름"
 311 | 
 312 | tp-3: 최민정 (재가돌봄센터 상담팀장) — bias: neutral
 313 |   canState:
 314 |     - "지석이 280만원을 추석 연휴 간병 예약금으로 납부했고 대상자가 오미숙이었다."
 315 |     - "문제의 만남은 센터 후문 상담 일정이었고 사적 밀회가 아니었다."
 316 |     - "예약서, 직인, 수납 기록 등 기관 원본으로 그 사실을 확인할 수 있다."
 317 |   uncertain:
 318 |     - "부부 사이에 100만원 이상 사전 상의 약속이 어떻게 정해졌는지는 모른다."
 319 |   forbidden:
 320 |     - "세린의 휴대폰 열람·캡처 공유 경위"
 321 |     - "세린 동생의 월세 사정과 150만원 우회 송금 세부"
 322 | ```
 323 | 
 324 | ---
 325 | 
 326 | ## E. Phase 1 스크립트 (사전 생성) — spouse-01
 327 | 
 328 | Phase 1~2는 LLM이 아닌 **미리 생성된 스크립트**가 자동 재생된다. 실제 대사:
 329 | 
 330 | ```json
 331 | [
 332 |   {
 333 |     "speaker": "system",
 334 |     "text": "추석을 앞두고 간병 공백과 빠듯한 살림 속에서, 부부가 서로의 침묵을 의심으로 받아들인 사건이다."
 335 |   },
 336 |   {
 337 |     "speaker": "a",
 338 |     "text": "재판관님, 9월 20일 기준으로 공동통장에서 2,800,000원이 빠진 건 맞습니다. 다만 그 돈의 용도는 제가 설명드릴 수 있고, 100만원 넘는 지출을 미리 상의하지 못한 건 제 잘못입니다.",
 339 |     "relatedDisputes": ["d-1", "d-5"],
 340 |     "behaviorHint": "손가락으로 금액을 짚으며 숨을 고르고 말한다."
 341 |   },
 342 |   {
 343 |     "speaker": "b",
 344 |     "text": "자기야, 세 번째로 묻는 건데 그 280만원 어디 쓴 거야. 그 여자 이름으로 새벽 문자까지 오갔는데 내가 뭘 믿어야 해.",
 345 |     "relatedDisputes": ["d-1", "d-3"],
 346 |     "behaviorHint": "휴대폰 캡처 화면을 들어 보이며 몰아붙인다."
 347 |   },
 348 |   {
 349 |     "speaker": "a",
 350 |     "text": "9시 12분에 메시지가 온 건 맞아. 하지만 그게 외도라는 뜻은 아니야. 그건 순서가 있어 — 문자보다 먼저, 왜 새벽에 내 폰을 열어봤는지부터 말해.",
 351 |     "relatedDisputes": ["d-2", "d-3"],
 352 |     "behaviorHint": "시선을 피하다가 마지막 문장에서만 고개를 든다."
 353 |   },
 354 |   {
 355 |     "speaker": "b",
 356 |     "text": "폰을 안 봤으면 내가 계속 바보처럼 명절상만 차렸겠지. 자기가 숨긴 건 280만원 하나가 아니라 나를 속인 거잖아.",
 357 |     "relatedDisputes": ["d-2", "d-1"],
 358 |     "behaviorHint": "팔짱을 끼고 단어마다 힘을 준다."
 359 |   },
 360 |   {
 361 |     "speaker": "a",
 362 |     "text": "왜 그랬냐고 묻기 전에 자기는 왜 150만원을 다른 계좌로 돌려보냈어. 서로 100만원 넘는 돈은 먼저 상의하자고 해놓고 둘 다 그 약속을 깬 거잖아.",
 363 |     "relatedDisputes": ["d-4", "d-5"],
 364 |     "behaviorHint": "방어적으로 되묻다가 입술을 한 번 깨문다."
 365 |   },
 366 |   {
 367 |     "speaker": "b",
 368 |     "text": "내 150만원은 급해서 다른 계좌로 돌린 거야. 그런데 자기는 출처도 안 말하고 낯선 여자 이름이 찍혀 있으니까 내가 의심할 수밖에 없었잖아.",
 369 |     "relatedDisputes": ["d-4", "d-3", "d-1"],
 370 |     "behaviorHint": "억울함에 웃듯 숨을 뱉고 다시 쏘아본다."
 371 |   },
 372 |   {
 373 |     "speaker": "a",
 374 |     "text": "그날 저녁 8시 반에 물류 마감 끝내고, 동료한테 인수인계하고, 주차장까지 걸어가는 동안 연락이 온 거라서 바로 설명을 못 했어. 그리고… 처가 살림도 제대로 못 감당하는 사람처럼 보일까 봐 말을 미뤘어.",
 375 |     "relatedDisputes": ["d-1", "d-3"],
 376 |     "behaviorHint": "업무 동선을 길게 늘어놓다가 끝내 목소리가 낮아진다."
 377 |   },
 378 |   {
 379 |     "speaker": "system",
 380 |     "text": "양측 모두 진정해 주십시오. 휴대폰 열람과 송금 경위를 구분해서 정리해 주시기 바랍니다."
 381 |   },
 382 |   {
 383 |     "speaker": "b",
 384 |     "text": "재판관님, 저는 새벽에 폰을 본 잘못이 있습니다. 하지만 제 남편은 공동통장 송금도, 100만원 상의 약속도, 외도처럼 보일 정황도 먼저 숨겼고 — 그래서 신뢰가 무너진 겁니다.",
 385 |     "relatedDisputes": ["d-1", "d-2", "d-3", "d-5"],
 386 |     "behaviorHint": "감정을 누르려 입술을 다문 채 또렷하게 정리한다."
 387 |   }
 388 | ]
```

## M. 실제 시스템 프롬프트 + JSON + 후처리
출처: `10-actual-data-samples.md` lines 393-452
```text
 393 | ## F. LLM 시스템 프롬프트 구성 — 실제 코드
 394 | 
 395 | Phase 3~5에서 LLM에 보내는 시스템 프롬프트는 다음과 같이 조립된다:
 396 | 
 397 | ### F-1. 거짓말 상태별 지시문 (stateInstructions)
 398 | ```
 399 | S0: "이 쟁점을 완전히 부정하세요. 자신감 있게, 흔들림 없이.
 400 |      거짓말 방식: [LT에 따라 다름]
 401 |      ★ 핵심 행위를 절대 인정하지 마세요.
 402 |      ★ 부정하면서 동시에 죄책감/불안/후회를 표현하지 마세요. 모순됩니다.
 403 |        ❌ '안 했습니다. 다만 불안한 마음에...' (부정과 죄책감이 동시에 → 모순)
 404 |        ✅ '그런 적 없습니다. 상대방의 오해입니다.' (깨끗한 부정)"
 405 | 
 406 | S1: "약간 흔들리고 있지만 아직 핵심은 부정합니다.
 407 |      배경이나 주변 상황은 인정할 수 있지만, 핵심 행위 자체는 부정 유지."
 408 | 
 409 | S2: "일부를 인정합니다. '맞지만 이유가 달랐다'는 식으로.
 410 |      행위 자체는 인정하되, 의도나 맥락을 다르게 설명."
 411 | 
 412 | S3: "상대 탓으로 돌리세요. '내가 그런 건 상대 때문이다'."
 413 | 
 414 | S4: "감정적으로 호소하세요. '그때 얼마나 힘들었는지...'
 415 |      이전에 거짓말한 것에 대해 '말하기 두려웠다'고 인정 가능."
 416 | 
 417 | S5: "인정합니다. 사실을 인정하되 자기 입장에서 재해석하세요."
 418 | ```
 419 | 
 420 | ### F-2. 쟁점 컨텍스트 구성 (상태에 따라 달라짐)
 421 | ```
 422 | S0~S1: "상대방이 '지석의 비밀 송금 280만원' 건에 대해 당신을 추궁하고 있다.
 423 |         당신은 이 사안의 핵심을 부정하는 입장이다.
 424 |         숨기려는 이유: 체면을 지키려는 마음
 425 |         ★ 진실을 모르는 것처럼 행동하세요. 구체적 사실을 스스로 꺼내지 마세요."
 426 | 
 427 | S2~S3: "일부 사실이 드러나고 있다. 행위 자체는 부분적으로 인정하지만,
 428 |         의도나 맥락은 다르게 설명하는 입장이다."
 429 | 
 430 | S5:    "당신은 진실을 인정한 상태다.
 431 |         사실: [truthDescription 전체 공개]"
 432 | ```
 433 | 
 434 | **핵심**: S0~S1에서는 `truthDescription`을 LLM에 주지 않는다. NPC는 "자기가 뭘 했는지"를 프롬프트에서 모른다. 이것이 진실 누설 방지의 핵심 메커니즘.
 435 | 
 436 | ### F-3. LLM 응답 JSON 형식
 437 | ```json
 438 | {
 439 |   "npcResponse": "2~3문장 대사 (괄호 행동묘사 가능)",
 440 |   "behaviorHint": "행동 묘사",
 441 |   "stance": "deny|hedge|partial_admit|admit|reframe",
 442 |   "mentionedTruthIds": ["t-1", "t-2"],
 443 |   "responseMode": "answer_only|answer_then_counter|evidence_rebuttal|private_confession",
 444 |   "requestedFollowup": "추가 심문 요청 (선택)"
 445 | }
 446 | ```
 447 | 
 448 | ### F-4. 후처리 (Post-processing)
 449 | 1. **호칭 교정**: LLM이 상대 호칭을 잘못 쓰면 자동 교정 (예: 상대에게 "자기야"라고 했는데 재판관 앞이면 "제 아내"로)
 450 | 2. **존댓말 강제**: 재판관에게 반말을 쓰면 ~습니다/~요로 자동 변환
 451 | 3. **truth 누출 체크**: mentionedTruthIds가 forbidden 리스트에 있으면 필터링
 452 | 
```

## N. 알려진 이슈
출처: `10-actual-data-samples.md` lines 496-516
```text
 496 | ## H. 현재 AI 답변 문제 (알려진 이슈)
 497 | 
 498 | ### 문제 1: 진실 조기 누설
 499 | - S0~S1인데도 AI가 죄책감이나 후회를 표현하여 사실상 "내가 뭔가 했다"를 암시
 500 | - truthPolicy의 forbidden을 프롬프트에 넣어도 LLM이 무시하는 경우 있음
 501 | - **원인 추정**: system prompt가 너무 길어서 LLM이 뒷부분 지시를 놓침
 502 | 
 503 | ### 문제 2: 호칭/존댓말 혼란
 504 | - 재판관에게 반말, 상대에게 존댓말 등이 뒤섞임
 505 | - 후처리로 교정하지만 100% 잡히지 않음
 506 | - **원인 추정**: 한국어 경어법의 복잡성 + GPT-4o-mini의 한국어 한계
 507 | 
 508 | ### 문제 3: 캐릭터성 유지 실패
 509 | - avoidant 캐릭터가 돌연 공격적으로 변하거나, confrontational이 갑자기 순해짐
 510 | - verbalTell이 발현되지 않는 경우가 많음
 511 | - **원인 추정**: speechStyle, verbalTells를 프롬프트에 넣어도 LLM이 자기 스타일로 답변
 512 | 
 513 | ### 문제 4: 반복적/뻔한 답변
 514 | - 같은 질문 유형에 비슷한 패턴의 답변
 515 | - "그건 제가 말씀드린 것처럼..." 같은 회피 패턴 반복
 516 | - **원인 추정**: temperature 설정 (0.85)이 충분하지 않거나, 프롬프트에 다양성 지시 부족
```
