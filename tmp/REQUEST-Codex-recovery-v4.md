# Codex 종합 수습 의뢰 v4 — 의미·맥락·상황 차원 보정 (Q-A 정합 + 화법 + 추궁 각도 + 정황 + 시스템 정합)

> **작업 성격**: v3 (누설/롤백 차원) 회수 후 사용자가 직접 게임 테스트해서 발견한 11 사례를 토대로, 의미·맥락·상황 차원의 광범위 보정.
>
> **사용자 명시**: "한 글자 한 글자가 중요한 게 아니라, 그 수정이 필요한 이유를 이해해서 전체 수정 가이드를 제대로 세우는 게 중요" + "Codex는 의미·맥락·상황(단계 등 모든 것 고려)에 맞는 대화에 집중. ClaudeCode는 호칭·존칭·어법 자연체에 집중".
>
> **시간 제약 없음**. 14,931 variants 전수 정독. 사례 11개에서 추출된 7 패턴의 동형 사례를 광범위 검출 + 처리.

---

## 0. TL;DR — Codex v4 작업 한 줄 요약

**v3 회수 후 ScriptedText는 누설/Truth Throttle 정합 OK이지만 의미·맥락·자연체 차원에 광범위 부족.**
사용자 spot check (11 사례) 분석 결과 다음 7 패턴 도출:

| Pattern | 영역 | 처리자 |
|---|---|---|
| P1 Q-A 정합 (재판관 질문 ↔ NPC 답변 의미 분리) | 의미 | **Codex** |
| P2 캐릭터 화법 (시적/추상 → 일상 직설) | 의미 / archetype voice | **Codex** |
| P3 재판관 추궁 각도 (추상 → 구체 / 노골 → 거리감) | 의미 / 추궁 메커니즘 | **Codex** |
| P4 정황 풀어쓰기 (단순 인과 → 정황 디테일) | 맥락 / 화법 | **Codex** |
| P5 캐릭터 코드명 잔여 ("A"/"B") | 변수 치환 / 의미 | **Codex** |
| P6 시스템 메시지 트리거 정합 | 시점 / 메시지 정의 | **Codex** |
| P7 누설 surface UI ("형 문자 스레드" 류) | 코드/렌더 | **별도 의뢰 (코드 fix)** |

본 의뢰는 **P1~P6**를 처리. P7은 명시만 하고 별도 코드 fix.

산출물: 수정된 ScriptedText (직접) + 변경 log + Claude 2차 폴리싱 후보 + 종합 리포트.
대상: 3 사건 (`spouse-01`, `family-01`, `friend-01`) ScriptedText 전수 + 시스템 메시지 정의.

---

## 1. 작업 원칙

### 1.1 핵심 원칙 (v2/v3 계승 + 신규)

| # | 원칙 | 비고 |
|---|---|---|
| P1 | **데이터 직접 read 검증** | 추측 X. case data + ScriptedText 직접 read |
| P2 | **9차원 맥락-의미 정확성** | 잘못 패턴 #6. 단순 어휘 교체 X |
| P3 | **사건 설정 일치** | family A 40/B 60 등 절대 |
| P4 | **진실 누설 금지 (채널 × 시점 × 화자)** | v3에서 정립. 이번에도 유지 |
| P5 | **archetype voice 보존** | NPC 자기 호칭/화법 본질 |
| P6 | **lieState 단계별 자연 노출** | S0/S1/S2 회피, S3+/late 정상 |
| P7 | **자율 판단 권장** | 사용자 사례 11개를 패턴 단서로. 동형 사례 광범위 검출 |
| P8 | **시간 제약 없음** | 깊이 우선 |
| **P9** | **★ 자동 검증 PASS = 완료 X** | 측정한 차원만 정상. 측정 안 한 차원은 별개. spot check 대비 |
| **P10** | **★ Codex = 의미·맥락·상황 / Claude = 호칭·존칭·어법** | 분담 엄격. 영역 침범 X |

### 1.2 Codex의 자율 판단 흐름 (각 variant 처리 시)

```
variant 입력
  ↓
[1. Truth Throttle 정합 — v3 매트릭스 유지]
  채널 × lieState/stage marker 매핑
  - 재판관 4채널 / system / mediation: 시점 무관 surface
  - NPC S0/S1: 부정. 진실 lexeme 회피
  - NPC S2: 핑계. 부분 노출
  - NPC S3+/late/stage3: 자백 진행 정상 (patch X)
  - aftermath: 판결 후 narrative (patch X)
  ↓
[2. P1~P6 검출 — 의미·맥락·상황]
  P1: 재판관 질문 의도와 NPC 답변 의미 정합?
  P2: NPC 발화가 시적/추상인가? → 일상 직설로 + archetype voice 보존
  P3: 재판관 추궁이 추상이거나 너무 노골적인가?
  P4: 발화에 정황 디테일이 있는가? 짧은 인과로 끊기는가?
  P5: 묘사 / 시스템에 "A" / "B" 코드명 잔여?
  P6: 시스템 메시지가 트리거 조건과 정합하는가?
  ↓
[3. 처리 결정]
  - 패턴 검출 → patch 제안
  - archetype voice / 사건 fact / lieState 매트릭스 절대 위반 X
  - "어법 자연체"만 어색하면 → claude_polish_candidate flag
  ↓
[4. 충돌 시 우선순위]
  TruthThrottle (P4) > FactCheck (P3) > QACoherence > 
  CharacterRegister > JudgeAngle > NarrativeDetail > 
  CodeNameResolve > SystemTrigger
  ↓
[5. 사용자 모범 patch 적용]
  Patch 1 (인지 단계 약화): 재판관 발화에서 "쪽" → "주장/의견"
  Patch 2 (정보 → 동기): "무엇을" → "왜 그렇게"
  Patch 3 (추상 → 직접 행동): "흐리면" → "밝히지 않으면"
  Patch 4 (명사형 → 동사형): → ★ Claude 영역 (Codex는 적용 X)
```

---

## 2. 게임 구조 이해 (재상기 — v2 의뢰서 2절 압축)

### 2.1 게임 한 줄

플레이어 = 재판관. NPC 양측 = 거짓말로 자기 입장 변호하는 부부/가족/친구. 플레이어가 질문·증거·증인을 통해 거짓을 깨고 진실을 밝혀낸다.

### 2.2 8단계 재판 루프

```
Phase 0: 사건 소개 / Phase 1: 초기 진술 / Phase 2: 반박 진술
Phase 3: 심문 (LLM 생성) / Phase 4: 증거 조사
Phase 5: 재심문 / Phase 6: 중재 / Phase 7: 판결
```

핵심 Phase: 3 ~ 5.

### 2.3 lieState S0~S5 + Truth Throttle

```
S0: 완전 부정 → S1: 일부 인정 → S2: 핑계 → S3: 책임 전가 → 
S4: 감정적 → S5: 자백
```

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S0-S1 | "해당 금액" | "그 사람" | "그곳" | 허용 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 |
| S3+ | 구체적 허용 | 실명 | 정식명칭 | 전부 |
| S5 | 전부 공개 | 전부 | 전부 | 전부 |

### 2.4 재판관 역할 — 답을 알지만 안 말한다

재판관은 모든 진실 알지만 **답을 말하면 게임 무력화**. 추궁 단서 제공 / NPC 자백 압박 / 답은 NPC가.

### 2.5 게임 메커니즘 핵심 — NPC 자백 진행 보호

S3+/late 단계의 NPC 발화 = **플레이어가 질문해서 끌어낸 자백** = **게임 본체**. patch X.

---

## 3. 누설 정의 (v3 정립 매트릭스 유지)

### 3.1 채널 × 시점 매트릭스 ★ 절대 위반 X

```
| 채널                       | S0 | S1 | S2 | S3+ | late | aftermath |
|----------------------------|----|----|----|-----|------|-----------|
| 재판관 4채널                | X  | X  | X  | X   | X    | X         |
| system_message              | X  | X  | X  | X   | X    | X         |
| mediation                   | X  | X  | X  | X   | X    | X         |
| judge_evidence_combo        | X  | X  | X  | X   | X    | X         |
| NPC interrogation           | X  | X  | △  | OK  | OK   | -         |
| NPC evidence_present        | X  | X  | △  | OK  | OK   | -         |
| NPC contradiction_pursuit   | X  | X  | △  | OK  | OK   | -         |
| NPC interjection            | X  | X  | △  | OK  | OK   | -         |
| NPC emotional_overload      | X  | X  | △  | OK  | OK   | -         |
| dossier (NPC 발화 부분)     | X  | X  | △  | OK  | OK   | -         |
| aftermath                   | -  | -  | -  | -   | -    | OK        |

X = 누설 회피 (patch 적용)
△ = 부분 노출 가능 (약칭/모호어)
OK = 정상 진실 노출 — 자백 진행 = 게임 메커니즘 (patch X)
- = 무관
```

### 3.2 사건별 진실 lexeme

| 사건 | 누설 키워드 (S0~S2 / 재판관 / 시스템 노출 X) |
|---|---|
| spouse | "3,000만원", "위임장", "박미라", "형", "조카", "친형", "시댁 갈등", "투자 사기", "형 빚" |
| family | "60", "40", "90", "출생 비밀", "일기장", "20년", "배다른", "혈연 다른" |
| friend | "9일", "6번", "11번", "아버지 돈", "아버지 사기", "갈취", "예비신랑이 먼저", "같은 패턴" |

### 3.3 evidence surfaceName 매핑

case data `evidence[].surfaceName` 만 사용. v3에서 정립 (3.2/3.3절 참조).

---

## 4. ★ 7 패턴 정의 (사용자 spot check 도출)

이 절이 v4의 핵심. 각 패턴마다:
- 정의
- 진단 방법
- 처리 방법
- Before/After sample
- 광범위 검출 단서

### 4.1 P1 — Q-A 정합 (재판관 질문 ↔ NPC 답변 의미 분리) ★ 핵심

#### 정의
재판관 질문이 묻는 본질(정보·동기·책임·인지·결과·과정)에 NPC 답변이 정합하지 않음. variantId 메타 (questionType × disputeId × lieState)는 일치해도 의미 정합은 별개.

#### 진단 방법
1. 재판관 질문 entry에서 **질문의 추궁 차원** 식별:
   - fact_pursuit → 정보 추궁 ("무슨 일이 있었는가")
   - motive_search → 동기 추궁 ("왜 그렇게 했는가")
   - empathy_approach → 심정 탐색 ("어떤 마음이었는가")
   - + 질문 본문에서 더 세부 차원 (지키려 한 것 / 두려워 한 것 / 다른 선택지 / 가장 먼저 / 결과 / 과정 / 직접 본 것 vs 들은 것 / 짐작 vs 직접 / 등)
2. 답변 entry가 그 차원에 정합한가? 차원 어긋남 또는 추궁 본질 회피?

#### 처리 방법
- 답변을 질문 본질에 맞춤 (단 lieState 단계 정합 + archetype voice 보존)
- 답변이 archetype voice로 회피하는 건 정상 (avoidant의 답변 미루기 등). 단 회피여도 질문 차원과 맞물려야 함

#### 사례 — 스샷6 (★ 사용자 명시 지적)

**질문**: "박지연 씨, 오피스텔 방문과 새벽 전화 관련해서 가장 먼저 지키려 했던 것은 무엇입니까?"
- 추궁 차원: **지키려 한 것 = 가치 / 가정 / 자기 입지**

**답변 (현재)**: "이미 한 번 크게 속은 느낌이었는데, 또 비슷한 냄새가 났습니다. 이번에는 더 집요해질 수밖에 없었습니다."
- 의미 차원: **속은 경험 → 집요해진 동기**
- → 차원 어긋남. 질문은 "지키려 한 것"인데 답변은 "왜 집요했는가"

**사용자 모범 (방향 제시)**: "그래도 가정을 지키고 싶었다는 류의 이야기"
- 답변 차원: **가정 / 가족 / 자기 입지** 같은 "지키려 한 가치"

**처리 방향**: 답변을 "지키고 싶었던 것 (가정 / 자존감 / 결혼 생활 등)" 차원으로 재작성. 단 박지연 victim_cosplay archetype + lieState (해당 entry stage marker 확인) 정합 유지.

#### 사례 — 스샷11

**질문**: "박지연 씨, 오피스텔 방문과 새벽 전화에 관해 직접 본 것과 나중에 들은 것을 나누어 말씀해 주십시오."
- 추궁 차원: **직접 관찰 vs 간접 정보 분리**

**답변 (현재)**: "제 남편은 늘 제가 예민하다는 말로 저를 눌렀습니다. 정작 답해야 할 말은 끝까지 안하면서요."
- 의미 차원: **남편 책임 전가**
- → 차원 어긋남. 질문은 "직접 본 것 vs 들은 것"인데 답변은 "남편이 나를 눌렀다"

**처리 방향**: 답변을 "직접 본 것 (영수증 / GPS 기록 등) vs 짐작·추론 (외도 가능성)" 분리 차원으로. 박지연 archetype 보존하면서.

#### 광범위 검출 단서

검출 패턴:
1. 재판관 질문에 명시된 차원 키워드 (지키려 / 두려워 / 가장 먼저 / 다른 선택지 / 직접 vs 짐작 / 결과 / 과정) 추출
2. NPC 답변에 그 차원이 반영되었는지 의미 분석
3. 질문 차원과 답변 차원이 분리되면 P1 후보

### 4.2 P2 — 캐릭터 화법 (시적/추상 → 일상 직설)

#### 정의
NPC 발화에 한국어 일상 화자가 사용하지 않는 시적·은유·추상 표현이 광범위. 특히 박지연 / 이준호 같은 일반 직장인 인물의 자기 심리 묘사가 과하게 문학적.

#### 진단 방법
- 다음 표현 패턴 검출:
  - 은유 ("물건이 같은 방향으로 겹쳤다", "마음이 무너지면", "비슷한 냄새가 났다", "두려움이 제 선택을 끌고 갔다")
  - 추상 명사 ("기록과 물건", "그 종이 한 장", "그 두려움")
  - 사적 시 ("종이 한 장도 그냥 못 넘깁니다")
- archetype voice (victim_cosplay 단정 / avoidant 모호어 / affect_flattening 평면 / premature_summary 결론 먼저 / confrontational 강한 단정)는 **보존**

#### 처리 방법
- 시적/은유 → 일상 직설로 (archetype voice 보존)
- 단순 어휘 치환 X. 의미 정확성 유지하면서 한국어 일반 화자가 자기 심리 말하는 화법으로 재작성

#### 사례 — 스샷2-a

**현재**: "재판관님, 기록과 물건이 같은 방향으로 겹쳤습니다. 결국 그 두려움이 제 선택을 끌고 갔습니다."
**사용자 모범**: "재판관님, 모든 상황과 증거가 한 가지 방향을 향하고 있었습니다. 두렵지만 그것들이 무엇을 의미하는지는 너무나도 분명했습니다."

분석:
- "기록과 물건" → "모든 상황과 증거" (구체화)
- "같은 방향으로 겹쳤다" → "한 가지 방향을 향하고 있었다" (자연체)
- "그 두려움이 제 선택을 끌고 갔다" → "두렵지만 그것들이 무엇을 의미하는지는 너무나도 분명했다" (직설 + 인지 강조)

#### 사례 — 스샷4-b

**현재**: "마음이 한 번 무너지면 종이 한 장도 그냥 못 넘깁니다. 확인하면서도 매번 더 무서웠습니다."
**사용자 모범**: "한 번 의심이 시작되면 종이 한 장도 못 넘기게 되는 것 같습니다. 확인하면서도 매번 더 무서웠습니다."

분석:
- "마음이 한 번 무너지면" → "한 번 의심이 시작되면" (시적 → 직설)

#### 사례 — 스샷5-b

**현재**: "그 종이 한 장이 더 무서웠습니다. 제가 안 쓰는 색의 틴트 이름이 찍혀 있는데,"
**사용자 모범**: "영수증 한 장에 가슴이 무너졌습니다. 영수증에 제가 사용하지 않는 색깔의 틴트 이름이 찍혀 있는데,"

분석:
- "그 종이 한 장" → "영수증" (구체)
- "더 무서웠습니다" → "가슴이 무너졌습니다" (감정 구체)
- "안 쓰는 색의 틴트" → "사용하지 않는 색깔의 틴트" (★ **이건 어법 — Claude 영역**)

→ Codex는 의미/맥락 ("그 종이" → "영수증" / "더 무서웠다" → "가슴이 무너졌다")만 처리. "안 쓰는 → 사용하지 않는"은 Claude.

#### 사례 — 스샷6-b

**현재**: "이미 한 번 크게 속은 느낌이었는데, 또 비슷한 냄새가 났습니다."
**사용자 모범**: "예전에 속은 경험이 아직 잊혀지지도 않았는데, 또 비슷한 느낌이 들었습니다."

분석:
- "한 번 크게 속은 느낌" → "예전에 속은 경험" (시적 → 직설)
- "비슷한 냄새가 났습니다" → "비슷한 느낌이 들었습니다" (은유 → 직설)

#### 사례 — 스샷8-b

**현재**: "제가 해석을 앞세운 것은 사실입니다. 그래도 그 해석이 생긴 이유를 빼면 제 말만 이상해집니다."
**사용자 모범**: "심증만으로 결론을 내린 것은 사실입니다. 하지만, 그럴만한 이유가 있으니 그렇게 된 것입니다."

분석:
- "해석을 앞세운" → "심증만으로 결론을 내린" (추상 → 직설)
- "그 해석이 생긴 이유를 빼면 제 말만 이상해집니다" → "그럴만한 이유가 있으니 그렇게 된 것입니다" (구문 자연화)

#### 광범위 검출 단서

자주 등장하는 시적/은유 패턴:
- "마음이 무너지다", "마음이 끌리다", "마음이 흔들리다"
- "X가 X로 겹쳤다", "X가 X를 끌고 갔다"
- "냄새가 났다" (비유), "방향으로 흘렀다", "장면이 남는다"
- "그 종이 한 장", "그 두려움", "그 단서"
- 추상 주어 ("기록과 물건이", "그 두려움이")

→ 검출 후 일상 직설로 재작성. archetype voice 보존.

### 4.3 P3 — 재판관 추궁 각도 (추상 → 구체 / 노골 → 거리감)

#### 정의
재판관 질문이 두 방향에서 부족:
- (a) 추궁 본질을 추상어로 가림 → 질문 의도 모호
- (b) 정답을 거의 가리킴 → 누설 가까운 노골

#### 진단 방법
- (a) 검출: "관련해서", "당시", "그것", "어떤 일", "다른 선택지" 류 추상 부사구
- (b) 검출: 진실 lexeme 가까운 명시 ("당시 상대방과 연락을 주고받은 적이 있습니까" — 메시지 진실 가리킴), 또는 dossier 카드 의미 직접 언급 (v3 surface 매핑 위반)

#### 처리 방법
- (a) → 추궁 본질을 명료한 한국어 일상 표현으로
- (b) → 거리감 두면서도 NPC가 답할 여지 명확한 표현으로

#### 사례 — 스샷4-a

**현재**: "박지연 씨, 오피스텔 방문과 새벽 전화 당시 다른 선택지를 생각해 보셨습니까?"
**사용자 모범**: "박지연 씨, 오피스텔 방문과 새벽 전화가 사실 생각하시는 것과 다른 상황일 수도 있다는 생각은 안해보셨습니까?"

분석:
- "다른 선택지를 생각해 보셨습니까" (추상) → "사실 생각하시는 것과 다른 상황일 수도 있다는 생각은 안해보셨습니까" (구체)
- 추궁 본질이 명료해짐: "혹시 외도가 아닐 가능성을 고려해보았는가"

#### 사례 — 스샷5-a

**현재**: "박지연 씨, 오피스텔 방문과 새벽 전화 직전에는 어떤 일이 있었습니까?"
**사용자 모범**: "박지연 씨, 오피스텔 방문과 새벽 전화 외에 다른 일도 있으셨던 겁니까?"

분석:
- "직전에는 어떤 일" (시간 추상) → "외에 다른 일도" (정황 확장)
- 추궁 의도 변화. (★ 이 사례는 의미 차원 변경 — 단순 어휘 교체 X)

#### 사례 — 스샷6-a

**현재**: "박지연 씨, 오피스텔 방문과 새벽 전화 관련해서 가장 먼저 지키려 했던 것은 무엇입니까?"
**사용자 모범**: "박지연 씨, 오피스텔 방문과 새벽 전화를 발견하고 나서 가장 지키고 싶던 것은 무엇이었습니까?"

분석:
- "관련해서 가장 먼저 지키려 했던" (어색) → "발견하고 나서 가장 지키고 싶던" (자연)
- "지키려 했던" → "지키고 싶던" (Claude 어법 영역도 포함됨)

→ 의미는 같지만 표현 자연체. **Codex가 의미 정확성 검증 + Claude가 어법 다듬기**.

#### 사례 — 스샷8-a

**현재**: "박지연 씨, 외도라는 확신에서 정황 해석으로 물러섰다면 그 확신으로 밀어붙인 행동도 함께 설명해야 합니다."
**사용자 모범**: "박지연 씨, 정황적 해석 만으로 외도라는 확신을 하셨다면, 그 확신에 대한 근거도 함께 설명해야 합니다."

분석:
- "확신에서 해석으로 물러섰다면" (추상 / 어색) → "정황적 해석 만으로 외도라는 확신을 하셨다면" (구체 / 명료)
- 추궁 본질이 명료: "정황만 갖고 외도 확신했다면 근거를 대라"

#### 사례 — 스샷9-a (★ 노골 → 거리감)

**현재**: "박지연 씨, 당시 상대방과 연락을 주고받은 적이 있습니까."
**사용자 모범**: "박지연 씨, 상대방에 대해 짐작할 수 있는 다른 정보는 없습니까"

분석:
- "연락을 주고받은 적이 있습니까" — **진실(메시지 존재)을 거의 가리킴** = 노골
- "짐작할 수 있는 다른 정보는 없습니까" — 거리감. NPC가 메시지 존재를 자기 입으로 답할 여지

→ **재판관이 진실을 가리키지 않는 추궁 거리감 핵심**.

#### 사례 — 스샷11-a

**현재**: "박지연 씨, 오피스텔 방문과 새벽 전화에 관해 직접 본 것과 나중에 들은 것을 나누어 말씀해 주십시오."
**사용자 모범**: "박지연 씨, 오피스텔 방문과 새벽 전화에 관해 직접 본 것과 짐작한 사실을 구분하여 말씀해 주십시오."

분석:
- "나중에 들은 것" → "짐작한 사실" (의미 차원 변경)
- "직접 본 것 vs 짐작" 차원이 박지연의 인지 단계 (확신 vs 해석)에 정합

#### 광범위 검출 단서

추상 부사구:
- "관련해서", "당시", "그것에 대해", "어떤 X", "어떻게 X"
- "다른 선택지", "직전", "이후"

노골 패턴 (재판관 발화):
- 진실 lexeme 가까운 명시
- dossier 카드 의미 직접 언급
- "X와 Y을 주고받은 적이 있습니까" (정답 가리킴)

→ 모든 재판관 4채널 entry 검토. 추상 부사구 ≥1 또는 노골 패턴 ≥1 → P3 후보.

### 4.4 P4 — 정황 풀어쓰기 (단순 인과 → 정황 디테일)

#### 정의
NPC 발화가 짧은 인과로 끊겨 캐릭터의 정황·심리·행동이 드러나지 않음.

#### 진단 방법
- 짧은 인과 패턴: "X해서 Y했습니다" / "X 때문에 Y" / "X니까 Y"
- 정황 부족: 특정 행동만 명시되고 그 주변 정황 (시간 / 장소 / 다른 행동 / 심리)이 풀어쓰여지지 않음

#### 처리 방법
- 정황 디테일 추가 (단 archetype voice 보존)
- 캐릭터 인지가 단계적으로 드러나는 흐름

#### 사례 — 스샷3

**현재**: "의심하고 싶어서 의심한 게 아닙니다. 제 남편이 문을 닫고 전화를 받으니까 제가 문 앞에 서게 된 겁니다."
**사용자 모범**: "의심하고 싶어서 의심한게 아닙니다. 문을 닫고 작게 통화를 하고 다녀온게 그곳에 분명한데도 숨기기만 하니 이상하게 생각할 수밖에 없었던 겁니다."

분석:
- "문을 닫고 전화를 받으니까" → "문을 닫고 작게 통화를 하고 다녀온게 그곳에 분명한데도 숨기기만 하니" (정황 풍부화)
- "제가 문 앞에 서게 된 겁니다" → "이상하게 생각할 수밖에 없었던 겁니다" (인지 결과)

추가된 정황:
- "작게 통화를 하고" (행동 디테일)
- "다녀온게 그곳에 분명한데도" (확인된 사실)
- "숨기기만 하니" (이준호의 행동 패턴)
- "이상하게 생각할 수밖에" (박지연의 인지 결론)

#### 사례 — 스샷9-b

**현재**: "아니, 그러니까... 그것도 관련이 있긴 한데... 그때 주고받은 메시지가 있긴 한데..."
**사용자 모범**: "남편이 누군가와 주고받은 메시지도 있습니다... 아니, 그러니까... 제가 몰래 보려고 본 것은 아니었는데..."

분석:
- "그것도 관련이 있긴 한데" → "남편이 누군가와 주고받은 메시지도 있습니다" (정황 명시)
- "그때 주고받은 메시지가 있긴 한데" → "제가 몰래 보려고 본 것은 아니었는데" (박지연의 행동 정당화)

추가된 정황:
- "남편이 누군가와" (주체 명시)
- "제가 몰래 보려고 본 것은 아니었는데" (박지연 자기 행동 변호)

#### 광범위 검출 단서

- 짧은 인과 ("X니까 Y", "X해서 Y") 50자 미만
- 1문장 답변
- "그것", "그때", "그곳" 등 추상 지시어로 끝나는 답변
- archetype별 정황 디테일 풍부도 (victim_cosplay = 자기 정당화 풍부 / avoidant = 정황 회피)

### 4.5 P5 — 캐릭터 코드명 잔여 ("A" / "B")

#### 정의
Phase1/2 묘사 채널 또는 시스템 메시지에 사건 데이터 코드명 ("A", "B")이 잔여로 남음. 변수 치환 미흡.

#### 진단 방법
- 모든 채널 텍스트에서 정규식 검출:
  - `\bA의\b`, `\bA가\b`, `\bA를\b`, `\bA[은는이가을를]`
  - `\bB의\b`, `\bB가\b`, `\bB를\b`
  - `의 진심`, `의 입장` 류와 결합 시 코드명 가능성

#### 처리 방법
- 캐릭터 실명 또는 적절 표현으로 변환:
  - spouse: A 박지연 / B 이준호
  - family: A 윤태성 / B 윤정후
  - friend: A 송다은 / B 최수민
- 묘사 채널: 실명 또는 캐릭터 호칭 ("그", "남편", "동생" 등 — 단 surface 정합)
- 부수 의미 정합: "B의 진심" → "B의 말" 같은 의미 정확성도 검토

#### 사례 — 스샷2-c

**현재 (Phase1 묘사)**: "B의 진심에 서운함이 커진다. 왜 나한테는 말 안 했느냐는 배신감."
**사용자 모범**: "B의 말에 서운함이 커진다." (또는 "이준호의 말에...")

분석:
- "B의 진심" → "B의 말" 또는 "이준호의 말" (코드명 + 의미 정확성)
- "진심"이 아니라 "말" — 박지연이 인지하는 차원은 "말 안 했음" = "행동/말 차원"이지 "진심 자체"가 아님

#### 광범위 검출 단서

- Phase1 / Phase2 묘사 channel 전수
- ScriptedText의 모든 채널 description / behaviorHint
- 시스템 메시지 정의

### 4.6 P6 — 시스템 메시지 트리거 정합

#### 정의
시스템 메시지가 실제 lieState/contradict_token/conversation flow와 무관하게 트리거되거나 메시지 내용이 트리거 조건과 불일치.

#### 진단 방법
- 트리거 조건 분석:
  - lieState 변화 → 메시지: "한 발 물러서기 시작한다"
  - contradict_token 누적 → "이야기가 어긋난다"
  - 일관 유지 → 다른 메시지
  - 동기 탐색 효과 → "동기 탐색이 효과를 보이고 있다"
- 메시지 내용이 트리거 조건과 정합?

#### 처리 방법
- 트리거 조건과 메시지 내용 cross-check
- 캐릭터 실제 진행 상태와 무관한 메시지는 트리거 조건 재정의 또는 메시지 텍스트 재작성

#### 사례 — 스샷6-c

**메시지**: "박지연의 진술에서 이전과 다른 점이 발견되었다 — 탭하여 추궁"
**사용자 지적**: "캐릭터A는 계속 일관되게 의심만 하고 있는데, 뭐가 달라졌다는 거지?"

분석:
- 트리거가 "lieState 변화" 또는 "모순 토큰 누적"으로 발동했지만, 박지연이 일관 의심 유지 시 → **트리거 오발동** 또는 메시지 텍스트가 사용자 지각과 불일치
- 처리: 박지연 lieState 진행 추적 → 실제 변화 없으면 트리거 X / 변화 있으면 메시지 텍스트가 그 변화를 정확 묘사

#### 사례 — 스샷6-d (시스템 메시지 출현 순서)

**문제**: 시스템 메시지가 캐릭터A 답변 **전에** 출현
**사용자 지적**: "이 시스템 메시지는 캐릭터A의 답변 이후에 나와야 맞는 거야"

분석:
- 관찰자(시스템)는 발화 후에 평가
- 답변 전에 메시지 출현 → 시스템이 미리 결과 알려주는 셈 (몰입 깨짐)
- → **렌더 / 코드 영역**. ScriptedText text 변경으로 해결 X. 단 메시지 정의(when 트리거)는 데이터 측

#### 광범위 검출 단서

- 시스템 메시지 정의 파일 직접 read (`src/engine/*` 또는 시스템 메시지 dictionary)
- 각 메시지의 트리거 조건 (when) ↔ 메시지 텍스트 (what) 정합 검증

### 4.7 P7 — 누설 surface UI ("형 문자 스레드" 류)

#### 정의
case data `evidence[].name` (진실 호칭)이 UI 알림 / 새 증거 표시 등에 직접 출력. surfaceName 사용 미적용.

#### 사례 — 스샷10

**알림**: "새 증거: 형 문자 스레드"
**사용자 지적**: "발신자 미상 문자"가 출력되어야 함 (surfaceName)

#### 처리

→ **Codex 본 의뢰 범위 X**. 별도 코드 fix 의뢰 필요:
- 새 증거 알림 / 증거 목록 / dossier 화면 등에서 `evidence.surfaceName` 사용 강제
- `evidence.name`은 시스템 내부 식별자로만

본 의뢰 산출물에 P7 사례를 별도 list로 기록 (`tmp/codex-recovery-v4/p7-ui-surface-leaks.json`) — Codex가 ScriptedText 정독 중 다른 P7 동형 사례 발견 시 함께.

---

## 5. 사례 11개 종합 표 (참조용)

| # | 채널 | 화자 | 패턴 | Before (요약) | After (사용자 모범) |
|---|---|---|---|---|---|
| 1 | NPC interrogation | 박지연 | C1 (Claude) | "그곳이 반복된 건 사실" | "남편이 그곳에 반복해서 간 것은 사실" |
| 2-a | NPC interrogation | 박지연 | P2 | "기록과 물건이 같은 방향으로 겹쳤다" | "모든 상황과 증거가 한 가지 방향을 향하고 있었다" |
| 2-b | Phase1 묘사 | (묘사) | C2 (Claude) | "위치를 세우지만 단어를 작게 줄인다" | "내세우지만 말 끝을 흐린다" |
| 2-c | Phase1 묘사 | (묘사) | P5 | "B의 진심에" | "B의 말에" (또는 실명) |
| 3 | NPC interrogation | 박지연 | P4 | "문 앞에 서게 된 겁니다" | "이상하게 생각할 수밖에 없었던 겁니다" + 정황 |
| 4-a | judge_question | 재판관 | P3 | "다른 선택지를 생각해 보셨습니까" | "다른 상황일 수도 있다는 생각은 안해보셨습니까" |
| 4-b | NPC interrogation | 박지연 | P2 | "마음이 한 번 무너지면" | "한 번 의심이 시작되면" |
| 5-a | judge_question | 재판관 | P3 | "직전에는 어떤 일이 있었습니까" | "외에 다른 일도 있으셨던 겁니까" |
| 5-b | NPC interrogation | 박지연 | P2 + Claude | "그 종이 한 장이 더 무서웠다 / 안 쓰는 색" | "영수증 한 장에 가슴이 무너졌다 / 사용하지 않는 색깔" |
| 6-a | judge_question | 재판관 | P3 + Claude | "관련해서 가장 먼저 지키려 했던" | "발견하고 나서 가장 지키고 싶던" |
| 6-b | NPC interrogation | 박지연 | P2 | "비슷한 냄새가 났습니다" | "비슷한 느낌이 들었습니다" |
| 6-c | NPC answer | 박지연 | P1 | "속은 느낌이었는데 집요해질 수밖에" | "가정을 지키고 싶었다 류" |
| 6-d | system_message | (시스템) | P6 | "이전과 다른 점 발견" (오발동 / 순서) | 트리거 정합 + 답변 후 출현 |
| 6-e | UI | (UI) | C5 (Claude) | "탭하여 추궁" | "클릭하여 추궁" |
| 7 | system_message | (시스템) | C4 (Claude) | "어긋남이 감지 / 모순을 찌른다" | "어색한 느낌이 듭니다 / 모순을 파고든다" |
| 8-a | judge_question | 재판관 | P3 | "확신에서 정황 해석으로 물러섰다면" | "정황적 해석 만으로 외도라는 확신을 하셨다면" |
| 8-b | NPC | 박지연 | P2 | "해석을 앞세운" | "심증만으로 결론을 내린" |
| 9-a | judge_question | 재판관 | P3 (★ 노골) | "연락을 주고받은 적이 있습니까" | "짐작할 수 있는 다른 정보는 없습니까" |
| 9-b | NPC interrogation | 박지연 | P4 | "그때 주고받은 메시지가 있긴" | "남편이 누군가와 주고받은 메시지" + 정황 |
| 10 | UI evidence 알림 | (시스템) | P7 (★ 별도) | "형 문자 스레드" | "발신자 미상 문자" |
| 11-a | judge_question | 재판관 | P3 | "직접 본 것과 나중에 들은 것" | "직접 본 것과 짐작한 사실" |
| 11-b | NPC interrogation | 박지연 | C3 (Claude) | "예민하다는 말로 저를 눌렀다 / 안하면서요" | "예민한 것이라며 몰아세웠다 / 답하지 않으면서요" |
| 11-c | NPC answer | 박지연 | P1 | (직접 vs 짐작 분리 X) | 직접 본 것 / 짐작 분리 차원 |

---

## 6. ClaudeCode 2차 영역 (Codex 안 건드림)

### 6.1 분담 명시

**Codex 작업 X (Claude가 처리)**:
- C1. 주어 보완 + 명사형 → 동사형 (사용자 모범 patch 4)
- C2. 묘사 채널 자연체
- C3. 일상 어휘 (안 쓰는 → 사용하지 않는, 안하면서요 → 답하지 않으면서요 등)
- C4. 시스템 메시지 관찰자 톤 (감지되었다 / 찌른다 → 어색한 느낌 / 파고든다)
- C5. UI 디바이스 카피 (탭 → 클릭)
- 호칭 / callTerms / 합니다체 / 깨진 조사 / 번역체 9패턴 / 부인 동사 / 단조 어미 boilerplate

**Codex 작업 O**:
- P1 ~ P6 (의미·맥락·상황)
- v3 누설/Truth Throttle 매트릭스 유지

### 6.2 Codex가 발견했지만 처리 안 할 영역

P2 (캐릭터 화법) 처리 시 의미는 Codex가 보정. 단 어휘 자연체 ("안 쓰는 → 사용하지 않는" 류)는 **변경 X. claude-polish-candidates.json에 표시**.

```json
{
  "variantKey": "...",
  "current": "Codex 의미 보정 후 텍스트",
  "claudeAreaIssue": "어휘 자연체 (C3) — '안 쓰는 → 사용하지 않는' 변환 필요",
  "categoryFlag": "C3_lexicon_naturalize"
}
```

---

## 7. 사건별 핵심 fact (v2 의뢰서 6절 압축 — 재상기)

### spouse-01
- A 박지연 victim_cosplay / B 이준호 avoidant
- 5,000만원 (3,000 적금 + 2,000 사기) / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 조작 / 투자 사기

### family-01 ⚠
- A 윤태성 confrontational / B 윤정후 affect_flattening
- **유서 비율 A 40 / B 60** (B가 90→60). 절대 반대 X.
- 출생 비밀 / 20년 지원 / 어머니 일기장

### friend-01
- A 송다은 premature_summary / B 최수민 affect_flattening
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

(상세 매트릭스: v2 의뢰서 6절)

---

## 8. 사용자 모범 4 patch — Codex / Claude 분담

| Patch | 차원 | 처리 |
|---|---|---|
| **Patch 1** | 인지 단계 약화 ("쪽이었는데" → "주장이었는데") | **Codex** (의미) |
| **Patch 2** | 정보 → 동기 추궁 ("무엇을 알고" → "왜 그렇게 확신하고") | **Codex** (의미) |
| **Patch 3** | 추상 → 직접 행동 ("흐리면" → "밝히지 않으면") | **Codex** (의미) |
| **Patch 4** | 명사형 → 동사형 ("X 돌봄" → "X을 돌본 것") | **Claude** (어법) |

→ Codex는 Patch 1~3 적용. Patch 4는 적용 X (Claude가 2차 처리).

---

## 9. 멀티 에이전트 / 멀티 라운드 자동화 (v2 19절 재사용 + 신규 specialist)

### 9.1 specialist 5종 재정의 (v4)

| Agent | v2 | v4 |
|---|---|---|
| A | A_TruthLeak | **A_TruthLeak** (v3 매트릭스 유지) |
| B | B_JudgeTone (Claude로 이관) | **B_RegisterAngle** (NEW — P3 재판관 추궁 각도 / P2 캐릭터 화법 / P4 정황 풀어쓰기) |
| C | C_FactCheck | **C_FactCheck** (유지) |
| D | D_KoreanQ (Claude로 이관) | **D_QACoherence** (NEW — P1 Q-A 정합 ★ 핵심) |
| E | E_UserPattern | **E_SystemAlignment** (NEW — P5 캐릭터 코드명 + P6 시스템 메시지 트리거) |

JudgeTone / KoreanQ / UserPattern (Patch 4)는 Claude 영역으로 이관. Codex는 의미·맥락·상황만.

### 9.2 Coordinator 우선순위

```
TruthLeak (P0 — 누설 절대 회피) ★★★★★
  ↓
FactCheck (P0 — 사건 무결성) ★★★★
  ↓
QACoherence (P0 — 게임 본체 메커니즘) ★★★★
  ↓
RegisterAngle (P1 — 화법 / 추궁) ★★★
  ↓
SystemAlignment (P2 — 코드명 / 트리거) ★★
```

QACoherence가 새로 P0 등급 — Q-A 정합이 깨지면 게임 본체 (재판관 ↔ NPC 대화) 무력화.

### 9.3 라운드 구조 (v2 19.3 재사용)

```
ROUND 1 — Detection (5 specialist 병렬)
  → tmp/codex-recovery-v4/round-N/{A,B,C,D,E}-proposals.json

ROUND 2 — Coordination (X_Coordinator)
  → 우선순위 매트릭스로 충돌 통합 + 직접 적용
  → tmp/codex-recovery-v4/round-N/coordinated-patches.json

ROUND 3 — Cross-Validation (Z_Validator + 각 specialist 재검증)
  → 25 cross-check 매트릭스
  → tmp/codex-recovery-v4/round-N/cross-validation.json

ROUND 4 — Re-Detection (specialist 5종 재실행)
  → tmp/codex-recovery-v4/round-N/residual-issues.json

  종료 조건:
  1. 모든 specialist 잔여 0건
  2. 변경 0건 round 1회 (수렴)
  3. max 5 round
  4. patch oscillation

ROUND 5 — Final Validation
  - npm run build / npx tsc -b --force PASS
  - precheck-stage-aware (v3 유지) PASS
  - precheck-qa-coherence (NEW) PASS
  - 14,931 variant count 보존
  - status='skipped' 보존
  → tmp/codex-recovery-v4/final-validation-v4.json

ROUND 6 — Claude Polish Candidate Classification
  → tmp/codex-recovery-v4/claude-polish-candidates.json
```

### 9.4 무한 루프 / 과잉 방지 (v2 19.5 유지)

- archetype voice / 사건 fact / lieState 매트릭스 절대 변경 X
- "글자수 ±5자" → P4 정황 풀어쓰기는 ±20자까지 허용 (단 의미 풍부화 명확)
- 같은 variant 3회 이상 patch → manual review flag
- max 5 round 안전 한계

### 9.5 정황 풀어쓰기 (P4) 글자수 가이드

P4 적용 시 글자수 +10~20자 가능 (정황 디테일 추가). 단:
- archetype voice 보존
- 의미가 단순 보정이 아니라 정황 풍부화임이 명확
- claude-polish-candidates에 flag (Claude가 어법 다듬기 가능)

---

## 10. 작업 절차

### 10.1 1단계: 데이터 / 메타 정독

```
src/data/cases/generated/{caseId}.json     # 사건 fact + evidence + dossier
src/data/scriptedText/{caseId}.json        # 14,931 variants
src/data/dialogues/phase1/{caseId}.json    # Phase1 묘사
src/data/dialogues/phase2/{caseId}.json    # Phase2 묘사 (있는 경우)
src/data/claimPolicies/{caseId}-*.json     # v2-atoms / dossier-cards / structure-v2
src/engine/judgeQuestionEngine.ts          # 재판관 질문 84종 정의
src/engine/blueprintPromptBuilderV2.ts     # NPC 발화 정의
시스템 메시지 dictionary (검색 필요)
```

### 10.2 2단계: 5 specialist 병렬 detection

각 variant × 채널 × lieState/stage 메타 추출 후 5 specialist 병렬 실행.

### 10.3 3단계: 라운드 자동화 (max 5 round)

v2 의뢰서 19절 라운드 구조 재사용.

### 10.4 4단계: 자체 검증

```bash
npm run build
npx tsc -b --force
node tmp/codex-recovery-v4/precheck-stage-aware.cjs       # v3 매트릭스 유지
node tmp/codex-recovery-v4/precheck-qa-coherence.cjs      # NEW (P1 검증)
node tmp/codex-recovery-v4/precheck-comprehensive-v4.cjs  # 통합
```

### 10.5 5단계: 산출물 저장

`tmp/codex-recovery-v4/` 새 폴더.

---

## 11. 산출물 형식

### 11.1 디렉토리 구조

```
tmp/codex-recovery-v4/
├── FINAL-REPORT-v4.md
├── fact-matrix.json (v3 재사용 또는 갱신)
├── changes-log.json (변경 patches × 카테고리 P1~P6)
├── claude-polish-candidates.json (C1~C5 영역)
├── p7-ui-surface-leaks.json (Codex가 발견한 UI 누설 사례 — 별도 코드 fix 의뢰용)
├── round-1/ ~ round-5/
│   ├── A-proposals.json ~ E-proposals.json
│   ├── coordinated-patches.json
│   ├── cross-validation.json
│   └── residual-issues.json
├── round-log.json
├── precheck-stage-aware.cjs (v3 유지)
├── precheck-qa-coherence.cjs (NEW)
├── precheck-comprehensive-v4.cjs (통합)
├── final-validation-v4.json
└── (sample: 의미 검증 표 — fact-matrix와 cross-check)
```

### 11.2 changes-log.json 형식

```json
{
  "generatedAt": "ISO8601",
  "totalPatches": 0,
  "byCase": { "spouse-01": 0, "family-01": 0, "friend-01": 0 },
  "byPattern": {
    "P1_QACoherence": 0,
    "P2_CharacterRegister": 0,
    "P3_JudgeAngle": 0,
    "P4_NarrativeDetail": 0,
    "P5_CodeNameResolve": 0,
    "P6_SystemTrigger": 0
  },
  "patches": [
    {
      "caseId": "spouse-01",
      "channel": "interrogation",
      "entryKey": "...",
      "variantId": "...",
      "before": "...",
      "after": "...",
      "pattern": ["P2_CharacterRegister"],
      "rationale": "박지연 victim_cosplay archetype voice 보존하면서 시적 표현 '마음이 무너지면' → '의심이 시작되면' 일상 직설로",
      "claudeAreaIssue": null
    }
  ]
}
```

### 11.3 claude-polish-candidates.json 형식

```json
{
  "generatedAt": "ISO8601",
  "totalCandidates": 0,
  "byCategory": {
    "C1_subject_and_verb_form": 0,
    "C2_narration_naturalness": 0,
    "C3_lexicon_naturalize": 0,
    "C4_system_observer_tone": 0,
    "C5_ui_device_copy": 0
  },
  "candidates": [
    {
      "variantKey": "...",
      "current": "Codex 의미 보정 후 텍스트",
      "claudeAreaIssue": "어휘 자연체 — '안 쓰는' → '사용하지 않는' 변환 필요",
      "categoryFlag": "C3_lexicon_naturalize",
      "suggestion": "(선택) Codex가 미리 본 자연체 후보"
    }
  ]
}
```

### 11.4 FINAL-REPORT-v4.md 구조

```markdown
# Codex Recovery v4 Final Report

## 작업 요약
- 시간 / 라운드 수 / 종료 사유
- 14,931 variants 정독 / 패턴 검출 / 적용 patch 통계

## 패턴별 통계 (P1~P6)
- 사건별 / 채널별 / lieState별 분포

## 라운드 진행 추적
| Round | A | B | C | D | E | 적용 | 잔여 |
| ... |

## 대표 patch 사례 (각 패턴 5건씩, before/after/rationale)

## 검증 결과
- precheck-stage-aware
- precheck-qa-coherence (NEW)
- precheck-comprehensive-v4
- npm run build / tsc

## ClaudeCode 인계
- claude-polish-candidates.json (C1~C5 영역, N건)
- p7-ui-surface-leaks.json (별도 코드 fix 의뢰용, M건)

## Known Issue
- d-5 신규 cell (사용자 GPT Pro S10/S11 진행 중)
- P7 UI 누설 (별도 코드 fix)

## 결정 대기 항목
- case data 자체 잘못으로 보이는 항목
- 의미 모호로 Codex 단독 결정 어려운 항목
```

---

## 12. 검증 체크리스트 (Codex 제출 전)

### 12.1 데이터 검증

- [ ] 14,931 variants 전수 정독
- [ ] variant count 보존: spouse 4,677 / family 5,172 / friend 5,082
- [ ] metadata 보존: id / tags / sourceRefs / status / entry key
- [ ] status='skipped' 보존 (변경 X)
- [ ] case data 직접 수정 X
- [ ] 코드 fallback / d-5 신규 / P7 UI 영역 변경 X

### 12.2 v3 매트릭스 유지 (회귀 방지)

- [ ] 누설 키워드 0 hits (`detect-truth-leak.cjs`)
- [ ] precheck-stage-aware PASS
- [ ] NPC S3+/late/stage3 자연 자기 호칭 보존 (그 가족 / 그 분 같은 surface 토큰 강제 X)
- [ ] aftermath 보존
- [ ] 재판관 4채널의 v3 surface 매핑 정합

### 12.3 v4 신규 검증

- [ ] P1 Q-A 정합 PASS (precheck-qa-coherence)
- [ ] P2 캐릭터 화법 (시적/추상 패턴 광범위 검출 후 보정)
- [ ] P3 재판관 추궁 각도 (추상 부사구 / 노골 패턴 검출 후 보정)
- [ ] P4 정황 풀어쓰기 (짧은 인과 검출 후 풍부화)
- [ ] P5 캐릭터 코드명 잔여 0건
- [ ] P6 시스템 메시지 트리거 정합 검증

### 12.4 빌드 / tsc

- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS

### 12.5 산출물 검증

- [ ] FINAL-REPORT-v4.md 생성
- [ ] changes-log.json (P1~P6 카테고리 분류)
- [ ] claude-polish-candidates.json (C1~C5 분류)
- [ ] p7-ui-surface-leaks.json (Codex 발견한 UI 누설)
- [ ] round-log.json
- [ ] precheck-qa-coherence.cjs / precheck-comprehensive-v4.cjs

---

## 13. 잘못 패턴 #1~#10 (절대 회피)

### #1 Agent 보고 무비판 수용 X
- 자체 검증 PASS = 작업 완료 X. 측정한 차원만 정상

### #2 임의 정보 작성 X
- source 파일 명시 외 X

### #3 다른 사건 정보 혼입 X

### #4 신규 작성 vs 보완 혼동 X
- variant 폐기/추가 X. text 교체만

### #5 사용자 detail 메시지 = 항상 보완 방향

### #6 보정 = 9차원 맥락-의미 정확성 ★
- 단순 어휘 교체 X. 9차원 매핑 후 표현 선택

### #7 단순 확인 질문에 옵션 제시 X

### #8 사건 설정 일치 검증
- family A 40/B 60 절대

### #9 진실 누설 금지 (채널 × 시점 × 화자) ★
- v3에서 정립. 매트릭스 절대 위반 X

### #10 (NEW v4) 자동 검증 PASS = 완료 아님 ★
- 키워드 / 메타 / 매트릭스 검증은 측정 차원만 정상
- 의미 / 맥락 / 자연체 / Q-A 정합 / 추궁 각도 등은 별개 차원
- spot check가 새 차원 깨면 = 검증 정의 자체의 부족 신호
- "범위 밖"으로 분류하기 전에 패턴 추출 / 영역 확인

---

## 14. 참고 자료

### 14.1 데이터 (직접 read 필수)
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json`
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/dialogues/phase1/{caseId}.json`
- `src/data/dialogues/phase2/{caseId}.json` (있는 경우)
- `src/data/claimPolicies/{caseId}-*.json`

### 14.2 메모리 / 도메인
- `CLAUDE.md` — 게임 구조 + 핵심 원칙
- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` — 사건 핵심
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md` — 사용자 모범 4
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md`
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md`

### 14.3 v2/v3 의뢰서 (재사용 영역)
- `tmp/REQUEST-Codex-recovery-v2.md` — 게임 구조 / 누설 정의 / 라운드 구조
- `tmp/codex-recovery-v3/FINAL-REPORT-v3.md` — v3 작업 결과 / 매트릭스

### 14.4 v3 산출물 (회귀 방지)
- `tmp/codex-recovery-v3/precheck-stage-aware.cjs`
- `tmp/codex-recovery-v3/channel-stage-matrix.json`
- `tmp/codex-recovery-v3/archetype-voice-audit.json`

### 14.5 사용자 사례 (본 의뢰 5절 표 + 4절 패턴별 sample)
- 11 사례에서 7 패턴 도출
- 각 패턴마다 동형 사례 광범위 검출

---

## 15. 작업 시 주의

1. **시간 제약 없음** — 14,931 전수 정독 + 의미 차원 깊이 우선
2. **자율 판단** — 의사 결정 흐름(1.2절) 따라 단독 진행
3. **분담 엄격** — Codex = 의미·맥락·상황 / Claude = 호칭·존칭·어법. 영역 침범 X
4. **메타 보존** — text 교체만. status='skipped' 명시 체크
5. **archetype voice 절대 보존** — NPC 자기 호칭/화법 본질
6. **v3 매트릭스 절대 보존** — 채널 × 시점 × 화자 누설 정의
7. **사건 fact 절대 보존** — family A 40/B 60, spouse 5,000만원 등
8. **claude-polish-candidates에 어법 issue 표시** — Codex가 발견했지만 처리 안 할 영역
9. **p7-ui-surface-leaks 별도 list** — Codex가 ScriptedText 정독 중 발견한 UI 누설 사례 (별도 코드 fix 의뢰용)
10. **사용자 사례 11개를 패턴 단서로** — 한 글자 한 글자가 아니라 패턴 인식 + 동형 사례 광범위 검출

---

## 16. ClaudeCode 회수 후 작업 흐름

```
[Codex v4 — 본 의뢰]
- P1~P6 의미·맥락·상황 보정
- 14,931 variants 전수 정독
- 5 round 자동화
- 자체 검증 PASS
- 산출물 저장
       ↓
[ClaudeCode CT 회수]
- FINAL-REPORT-v4.md 검토
- changes-log.json spot check (각 패턴 / 각 사건 10건)
- precheck-comprehensive-v4 재실행 → ALL PASS 확인
- 빌드 / tsc 재확인
- v3 매트릭스 회귀 검증 (NPC 자기 호칭 보존 / archetype voice / 사건 fact)
       ↓
[ClaudeCode 2차 — C1~C5 어법 폴리싱]
- claude-polish-candidates.json 처리
- C1 주어 보완 + 명사형 → 동사형
- C2 묘사 자연체
- C3 일상 어휘
- C4 시스템 관찰자 톤
- C5 UI 카피 (탭 → 클릭)
       ↓
[별도 의뢰 — P7 UI 누설 코드 fix]
- p7-ui-surface-leaks.json 회수
- src/components/* 등 UI 렌더 코드에서 surfaceName 강제 사용
       ↓
[commit + push]
- 사용자 명시 후
- ALL PASS 후
```

---

## 17. 본 의뢰 범위 X (별도 작업)

- **P7 UI 누설** — 코드 fix (`src/components/*` UI 렌더 영역)
- **d-5 신규 cell 작성** — 사용자 GPT Pro S10/S11 진행 중
- **코드 fallback 23건** — 별도 의뢰
- **신규 사건 / 신규 콘텐츠** — 본 의뢰 = 기존 보완

---

## 18. 마무리 — Codex에게

이 의뢰서는 **꼼꼼히 / 시간 우선 / 자율 판단 / 패턴 인식**의 4원칙을 그대로 반영했다.

각 variant를 검토할 때:
1. **v3 매트릭스** (채널 × 시점 × 화자) 우선 확인 — 누설/회귀 방지
2. **5 specialist** 의 자기 차원 검출:
   - A_TruthLeak: 누설 회귀 검증
   - B_RegisterAngle: P2 화법 + P3 추궁 각도 + P4 정황 풀어쓰기
   - C_FactCheck: 사건 fact 충돌
   - D_QACoherence: P1 Q-A 정합 ★ 핵심
   - E_SystemAlignment: P5 코드명 + P6 시스템 트리거
3. **Coordinator 우선순위** 충돌 통합
4. **archetype voice 보존** 절대
5. **Claude 영역** (C1~C5)은 변경 X — claude-polish-candidates에 표시
6. **P7 UI 누설** 발견 시 별도 list

**14,931 variants 전수 정독은 큰 작업이지만, 사용자 spot check가 의미·맥락 차원에 광범위 부족을 드러냈다. 부분 fix로는 해결 X**. 패턴 인식 + 동형 사례 광범위 검출이 핵심.

자체 검증 PASS 후 `tmp/codex-recovery-v4/FINAL-REPORT-v4.md`로 종합 보고. ClaudeCode CT가 회수해 2차 폴리싱 (C1~C5) + 별도 코드 fix (P7) + commit 진행.

— END —
