# Codex 종합 수습 의뢰 v2 — 진실 누설 + 재판관 말투 + 9차원 보정

> **작업 성격**: ClaudeCode CT가 GPT 9 세션 적용 후 사용자 spot check로 발견한 광범위 품질 문제를 Codex가 정독·자율 판단으로 수습.
> **시간 제약 없음**. 14,931 variants를 꼼꼼히 정독해 누설·말투·의미를 모두 보정. 산출물 회수 후 ClaudeCode가 한국어 자연체 2차 폴리싱 진행.
>
> ⚠ **사용자 명시**: "Codex가 읽고 알아서 생각하고 판단해서 꼼꼼하게 해결할 수 있도록", "오랜 시간이 걸려서라도", "재판관 말투들도 여전히 엉망".

---

## 0. TL;DR — Codex 작업 한 줄 요약

**3 사건 (`spouse-01`, `family-01`, `friend-01`) ScriptedText 14,931 variants 전수 정독해서:**
1. **진실 누설 광범위 검출 + 직접 수정** (재판관 4채널 + system_message + mediation + dossier 안내 + NPC 채널 lieState 정합)
2. **재판관 말투 품질 전면 재정비** (기계적 관찰문 / 직접 인용 / 단조 어미 / 명사형 / 시스템 톤 모두 제거)
3. **사건 설정 충돌 검출 + 직접 수정** (family A 40/B 60, spouse 5,000만원, friend 아버지 사기 패턴 등)
4. **사용자 모범 4 patch 패턴 적용** (인지 단계 / 동기 추궁 / 직접 행동 / 동사형 자연체)
5. **번역체 9패턴 / 깨진 조사 / 호칭 위반 / 부인 동사 / 변수 치환 boilerplate 검출 + 수정**

**산출물**: 수정된 ScriptedText (직접) + 변경 log + Claude 2차 폴리싱 후보 list + 종합 리포트.

---

## 1. 작업 원칙 (Codex 자율 판단 시 기준점)

### 1.1 핵심 원칙

| # | 원칙 | 의미 |
|---|---|---|
| P1 | **데이터 직접 read 검증** | source 파일 직접 read 후 판단. 추측 X |
| P2 | **9차원 맥락-의미 정확성** | 글자수/단순 어휘 교체 X. 캐릭터 인지 단계와 lieState 진행 반영 |
| P3 | **사건 설정 일치** | 비율/금액/날짜/인물 관계 사용자 메모와 정확 일치 |
| P4 | **진실 누설 금지** ★ | NPC 자백 전 진실 콘텐츠 직접 언급 X (게임 핵심 원칙) |
| P5 | **표면 변경 X — 의미 보존** | 단순 어휘 교체로 회귀 X. archetype voice 보존 |
| P6 | **재판관 말투 품질** ★ | 합니다체 + 자연체 + 간접 인용 + 톤 단계 |
| P7 | **자율 판단 권장** | 사용자 메모/case data/scriptedText cross-check해서 충돌 시 case data 우선 |
| P8 | **시간 제약 없음** | 깊이 우선. 1차 spot check 통과해도 만족 X — 14,931 전수 정독 |

### 1.2 의사 결정 흐름 (Codex가 각 variant 판단할 때)

```
variant text 입력
  │
  ├─ 1) 진실 누설 검출 (사건별 lexeme + dossier 의미 + evidence 진실 호칭)
  │     누설 ✓ → 수정 대상
  │
  ├─ 2) 채널 × lieState 정합
  │     judge_* / system_message → 재판관 톤 검증 (기계적 관찰문 / 직접 인용 / 단조 어미)
  │     NPC interrogation 등 → archetype voice + lieState 단계별 노출
  │
  ├─ 3) 사건 설정 충돌
  │     family A 40 / B 60, spouse 5,000만원, friend 아버지 패턴
  │     충돌 ✓ → 수정 대상 (P0)
  │
  ├─ 4) 한국어 품질
  │     번역체 / 깨진 조사 / 명사형 / 부인 동사 / 호칭 위반 / "쪽" 모호어
  │
  ├─ 5) 사용자 모범 4 patch 패턴 적용 가능?
  │     예 ✓ → 적용 (인지 단계 / 동기 / 직접 행동 / 동사형)
  │
  └─ 6) Claude 2차 폴리싱 후보 표시?
        의미 정확하지만 자연체 어색 / 호흡 어색 / 단조 어미 → polish_candidate flag
```

---

## 2. 게임 구조 이해 — 누설이 X인 이유 (Codex 필수 흡수)

### 2.1 게임 한 줄 요약

> **Solomon Court (솔로몬 법정)** — AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임. 플레이어 = 재판관. NPC 양측 = 거짓말로 자기 입장 변호하는 부부/가족/친구. 플레이어가 질문·증거·증인을 통해 거짓을 깨뜨리고 진실을 밝혀내야 한다.

### 2.2 8단계 재판 루프

```
Phase 0: 사건 소개 → 배경/인물 파악
Phase 1: 초기 진술 → 양측 입장 청취 (스크립트)
Phase 2: 반박 진술 → 상대 진술에 대한 반박 (스크립트)
Phase 3: 심문 → 플레이어가 질문하여 진실 추궁 (LLM 생성)
Phase 4: 증거 조사 → 증거 제시/조사/감별
Phase 5: 재심문 → 추가 추궁
Phase 6: 중재 → 결론 도출
Phase 7: 판결 → 책임 배분 + 해결안 선택
Result:  점수/칭호/후일담
```

핵심 Phase: **3 ~ 5가 게임의 본체**. 플레이어의 질문 선택 → 재판관 질문 생성 → NPC 응답 → 상태 전이.

### 2.3 lieState S0 → S5 (거짓말 상태 기계)

```
S0: 완전 부정       → "그런 적 없습니다"
S1: 일부 인정       → "그건 그런데..."
S2: 핑계            → "사정이 있었습니다"
S3: 책임 전가       → "상대 때문에..."
S4: 감정적          → "이미 끝났습니다"
S5: 자백            → "...사실은..."
```

NPC는 S0에서 시작. 질문/증거/모순 추궁이 누적되면 단계 전이. **각 state마다 공개 가능한 정보 수준이 다름** (Truth Throttle).

### 2.4 Truth Throttle — 정보 노출 곡선

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S0-S1 | "해당 금액" | "그 사람" | "그곳" | 허용 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 |
| S3+ | 구체적 허용 | 실명 | 정식명칭 | 전부 |
| S5 | 전부 공개 | 전부 | 전부 | 전부 |

**즉, S0~S2 단계에서 NPC가 진실을 직접 말하면 안 된다. 단계 어김 = 게임 메커니즘 무력화.**

### 2.5 사건별 lexeme — Truth Throttle 위반 키워드 (S0~S2 노출 X)

| 사건 | 누설 키워드 (S0~S2 노출 X) |
|---|---|
| spouse | "3,000만원", "위임장", "박미라", "형", "조카", "친형", "시댁 갈등", "투자 사기", "형 빚" |
| family | "60", "40", "90", "출생 비밀", "일기장", "20년", "배다른", "혈연 다른" |
| friend | "9일", "6번", "11번", "아버지 돈", "아버지의 사기", "갈취", "예비신랑이 먼저", "같은 패턴" |

### 2.6 재판관의 역할 — 답을 알지만 안 말한다

재판관은 **모든 진실을 알고 있는 권위자**. 그러나 **재판관이 답을 말하면 게임이 무너진다**:
- 플레이어가 질문 / 증거 / 증인으로 진실을 밝혀내야 게임의 의미가 생김
- 재판관은 "추궁의 단서" 제공만. 진실은 NPC가 입을 열어야 드러남
- 재판관 발화는 **NPC를 자백 단계(S3~S5)로 밀어넣는 압박**이지, **답을 알려주는 친절한 안내**가 아님

→ **재판관 발화에서 진실 콘텐츠 직접 언급 = 게임 메커니즘 자체를 무력화한다.**

### 2.7 dossier 카드 — 추궁의 단서, 답이 아니다

DossierCard = 두 증거 조합으로 드러나는 **진실의 방향성**을 정리한 카드. 카드의 "의미"는 게임 시스템이 인식하는 진실(예: spouse-01 dc-1 의미 = "형+조카")이지만, **재판관이 dossier를 발동했을 때 그 진실 의미를 직접 말하면 누설**이다.

dossier 카드 발동 시 재판관 = "두 자료가 한 사실을 가리킵니다. NPC님, 그게 무엇인지 답해 주십시오." (= 답은 NPC가 한다)

---

## 3. 누설 정의 — 무엇이 누설인지

### 3.1 채널별 누설 위험 등급

| 채널 | 위험 등급 | 누설 정의 |
|---|---|---|
| **judge_evidence_combo** | ★★★ 최고 | dossier 카드 발동 시 카드 의미 (= 진실) 직접 언급 |
| **judge_question** | ★★★ | 재판관 질문에 진실 콘텐츠/lexeme 포함 |
| **judge_contradiction** | ★★★ | 모순 추궁 시 진실 직접 인용 또는 사건 핵심 fact 노출 |
| **judge_witness_summon** | ★★ | 증인 소환 시 증언 내용 미리 노출 |
| **system_message** | ★★ | 시스템 메시지에 진실 키워드 / lexeme 포함 |
| **mediation** | ★★ | 중재 단계 진행 안내에서 진실 노출 |
| **NPC interrogation** | ★ (lieState 정합) | S0~S2에서 진실 직접 발화 |
| **NPC contradiction_pursuit** | ★ (lieState 정합) | S0~S2에서 진실 lexeme 사용 |
| **NPC dossier 안내** | ★★★ | dossier 카드 발동 후 NPC가 카드 의미를 자백 단계 전에 말함 |
| **NPC evidence_present** | ★ (lieState 정합) | S0~S2에서 진실 노출 |
| **interjection / emotional_overload** | ★ | 격앙 시 진실 누설 |
| **trust_action** | ★ | 신뢰 형성 단계에서 진실 누설 위험 |
| **aftermath** | OK (판결 후) | 판결 후 narrative — 진실 노출 OK |

### 3.2 evidence — surfaceName vs 진실 호칭

각 사건의 case data `evidence[].surfaceName` 만 사용. `evidence[].name` (진실 호칭) 사용 X.

#### spouse-01 evidence 매핑

| ID | ✅ surfaceName (사용 OK) | ❌ name (재판관 X) |
|---|---|---|
| e-1 | 영수증 묶음 5장 | (조카 학용품 등) |
| e-2 | 블랙박스 GPS 기록 | (오피스텔 주소) |
| e-3 | 통화기록 | (형과의 새벽 통화) |
| **e-4** | **발신자 미상 문자** | **형 문자 / 조카 학교 알림** ★ 가장 위험 |
| e-5 | 개인 계좌 출금 내역 | (이준호 비자금) |
| e-6 | 투자방 카톡 기록 | (박지연 사기) |
| e-7 | 공동 적금 해지 서류 | (위임장 조작) |

#### family-01 evidence 매핑

case data `evidence[]`의 surfaceName / name 직접 read해서 매핑표 작성 후 적용.
- e-7 surface = "어머니 일기장" / 진실 = "출생 비밀 (A 배다른 자식)"
- 일반 패턴: 재판관 발화에 "출생 비밀", "배다른", "혈연 다른", "20년 동안 B 돈", "정후 돈으로 어머니" 등 X

#### friend-01 evidence 매핑

case data `evidence[]` 직접 read.
- e-1 surface = "연락 기록" / 진실 = "B→예비신랑 9일 6번 11번"
- 일반 패턴: 재판관 발화에 "예비신랑이 먼저", "아버지의 사기", "아버지 돈 갈취", "같은 패턴 반복" X

### 3.3 dossier 카드 의미 추상화 (judge_evidence_combo)

#### spouse-01 dossier (case data dossierCards 직접 read 후 매핑)

| 카드 | 의미 (진실, 재판관 발화 X) | 재판관 가능 표현 sample |
|---|---|---|
| dc-1 | 오피스텔의 사람들 (=형+조카) | "두 자료가 같은 시각 같은 장소를 가리킵니다. 그 안에 누가 있었는지 들려주시겠습니까." |
| dc-2 | 시댁 얘기만 나오면 싸움 (=시댁 갈등 두려움) | "두 자료를 합치면 단순 연락이라 보기 어렵습니다. 가족 안에서 무엇이 어렵게 만들었는지 답해 주십시오." |
| dc-3 | 3,000만원의 권한 (=위임장 조작) | "두 자료가 큰돈 흐름의 권한을 묻게 만듭니다. 그 권한이 어디서 왔는지 밝혀 주십시오." |
| dc-4 | 2,000만원의 수치 | "두 자료가 한 사람의 큰돈 사용을 가리킵니다. 그 쓰임을 답해 주십시오." |
| dc-5 | 5,000만원의 순서 | "두 자료가 두 큰돈의 선후를 묻게 만듭니다. 어느 쪽이 먼저였는지 들려주시겠습니까." |

#### family-01 / friend-01 dossier

case data `dossierCards[]` 직접 read해서 매핑표 작성. 같은 추상화 원칙 적용.

#### dossier 추상화 변환 패턴

| Before (누설) | After (추상화) |
|---|---|
| "GPS와 형 문자 스레드가 한 사실을 가리킵니다." | "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다." (surface 사용) |
| "조카 학교 알림이 한 장소로 모입니다." | "두 자료가 같은 시점, 같은 사람을 가리킵니다." (자료 의미 추상화) |
| "형과 조카 쪽으로 맞물립니다." | "두 자료가 같은 가족 영역을 가리킵니다." |
| "가족을 돌본 것이라고 볼 수 있습니다." | (재판관이 추궁 결론 X) → "그 자리에서 누구를 위해 있었는지 답해 주십시오." |
| "위임장 조작 의심과 송금이..." | "큰돈 처리 절차의 의심과 송금 흐름이..." |
| "출생 비밀이 여기서 드러납니다." | "가장 민감한 사정이 여기서 드러납니다." |
| "예비신랑이 먼저 메시지를 보냈는지..." | "그 메시지의 선후가 어떻게 되는지..." |
| "아버지의 돈 문제가 있었습니까?" | "송금 흐름의 출처가 어디였습니까?" |

### 3.4 dispute truthDescription 누설

case data `disputes[].truthDescription`은 **사건의 객관적 진실**. 재판관 / 시스템 메시지 / NPC (자백 전 lieState 단계)에서 직접 언급 X.

각 사건의 disputes 직접 read해서 truthDescription 키워드 추출 → 누설 검출 dictionary 구성.

### 3.5 사용자 지적 잘못 4가지 sample (절대 회피)

```
❌ "GPS 좌표와 형의 문자 내용을..." → "형 문자" = e-4 진실 노출
❌ "GPS와 형 문자 스레드가..." → 동일
❌ "형과 조카 쪽으로 맞물립니다." → "형/조카" 진실 직접 언급
❌ "GPS 좌표와 형 문자 앞에서는..." → 동일
```

→ Codex는 이 4가지 패턴이 **다른 evidence ID / 다른 사건에도 동형으로 발생**한다고 가정하고 광범위 검출.

---

## 4. 재판관 말투 품질 ★ (사용자 강조 — "여전히 엉망")

### 4.1 절대 금지 패턴

#### (1) 기계적 관찰문 — 시스템 로그 톤

```
❌ "태도에 변화가 감지됩니다."
❌ "내용이 확인됩니다."
❌ "흐름이 나타납니다."
❌ "변화가 관찰됩니다."
❌ "패턴이 검출되었습니다."
❌ "변동이 추적됩니다."
```

→ **재판관은 사람이지 시스템이 아니다.** 분석 톤 / 보고서 톤 X.

#### (2) 긴 발언 직접 인용

```
❌ '각방 중이었으니 더 잘 들렸습니다. 문틈 너머로...'라고 하셨는데
❌ '저는 그런 적 없습니다'라고 답하셨고...
```

→ NPC 발언을 따옴표에 그대로 넣지 말 것. **간접 인용으로 요약**:

```
✅ "아까는 ~쪽으로 말씀하셨는데"
✅ "처음에는 ~취지였는데"
✅ "방금 전에 ~라고 표현하셨습니다."
```

#### (3) 시스템 관찰 + 직접 인용 결합 (최악)

```
❌ '${prev}'라고 하셨는데, 현재는 '${curr}'라는 내용이 확인됩니다.
❌ "X라고 하셨는데, 지금은 Y라는 내용이 확인됩니다."
```

→ 따옴표 + 시스템 톤 결합 = 절대 사용 금지.

#### (4) 명사형 어색 표현

```
❌ "가족 돌봄으로 입장을 옮기셨습니다."
❌ "가족 지원이었다고 말씀하십니다."
❌ "분명한 해명이 필요합니다."
❌ "정확한 진술 부탁드립니다."
```

→ 명사형 풀어서 동사형으로:

```
✅ "가족을 돌본 것이라고 입장을 옮기셨습니다."
✅ "가족을 도운 것이었다고 말씀하십니다."
✅ "분명히 해명해 주셔야 합니다."
✅ "정확하게 진술해 주십시오."
```

#### (5) 단조 어미 / boilerplate 변수 치환 패턴

```
❌ "OOO 씨, [evidence_a]와 [evidence_b]를 합쳐 보면 [meaning]이 드러납니다."
❌ "OOO 씨, 답해 주시겠습니까."  (10개 variant 모두 동일 끝맺음)
```

→ variant마다 어미·호흡·접근 각도 변주 필요. boilerplate 동일 어미 X.

#### (6) "쪽" 모호어 (재판관 발화에서)

```
❌ "어느 쪽이 사실입니까?"  (NPC voice라면 OK / 재판관 발화에선 약함)
❌ "그쪽 입장에서..."
```

→ 재판관은 단정·명료·합니다체. "어느 쪽" 같은 약한 단어 회피:

```
✅ "어느 진술이 사실입니까?"
✅ "어느 입장이 맞습니까?"
```

(단 NPC가 사용 시는 archetype voice 보존 — avoidant의 "쪽" 모호어는 OK)

#### (7) 부인 동사 (재판관 발화에서)

```
❌ "혐의를 부인하셨는데..."
❌ "사실을 부인하지 마십시오."
```

→ "부인" 단어는 일반적으로 "부정"으로:

```
✅ "혐의를 부정하셨는데..."
✅ "사실을 부정하지 마십시오."
```

(단 NPC가 archetype voice로 "부인" 사용 시 보존)

#### (8) 번역체 9패턴

```
❌ "~된 것으로 생각됩니다"
❌ "~인 측면이 있었습니다"
❌ "부득이하게"
❌ "사전 상의/협의" (S0~S2에서)
❌ "미리 말씀드리지 못한"
❌ "특정 X" 패턴 (특정 시간, 특정 인물 등)
❌ "~을 통하여"
❌ "~에 대해서"
❌ "~만을" → "~만"
```

### 4.2 올바른 재판관 발화 패턴

#### (1) 합니다체 필수

재판관 → 당사자 / 증인: **"~십시오 / ~십니까 / ~입니다"** 합니다체 강제.

```
✅ "박지연 씨, 그 시각의 입금 경위를 밝혀 주십시오."
✅ "이 부분에서는 어느 진술이 맞습니까?"
✅ "지금까지 말씀하신 내용을 정리하시겠습니까?"
```

#### (2) 간접 화법 — NPC 발언 요약

```
✅ "아까는 ~쪽으로 말씀하셨는데, 지금은 ~. 왜 달라졌습니까?"
✅ "처음에는 그렇게 표현하지 않으셨습니다. 어느 쪽이 맞습니까?"
✅ "방금 전 진술과는 결이 다릅니다. 어느 쪽이 사실입니까?"
```

#### (3) 재판관 관찰 — 분석 톤 X / 관찰자 서술체

```
❌ "진술 태도에 변화가 감지된다."
✅ "진술이 달라지기 시작한다."

❌ "거짓말 패턴이 검출됨."
✅ "말이 점점 어긋나고 있다."

❌ "내용이 확인됩니다."
✅ "여기서 흐름이 끊깁니다."
```

#### (4) 직접적 질문 (강도 hard)

```
✅ "어느 쪽이 진실입니까?"
✅ "왜 바뀐 겁니까?"
✅ "경위를 밝히십시오."
✅ "사실대로 답해 주십시오."
✅ "지금 답할 차례입니다."
✅ "이제 답하실 차례입니다."
```

(주의: "더 미루지 마십시오" 같은 표현은 사용자 P1 보정으로 → "이제 답하실 차례입니다 / 지금 밝혀 주십시오"로 변경된 사례 있음)

### 4.3 톤 단계 (soft / mid / hard)

| 단계 | 시기 | 톤 | 예시 |
|------|------|-----|------|
| soft | S0~S1 | 정리 요청 | "어느 쪽이 맞는 건지 정리해 주시겠습니까?" / "차분히 들려주시겠습니까." |
| mid | S2 | 추궁 | "왜 말이 달라졌습니까?" / "분명히 해 주십시오." / "그 경위를 답해 주십시오." |
| hard | S3+ | 단호 | "어느 쪽이 진실입니까?" / "경위를 밝히십시오." / "이제 답하실 차례입니다." |

각 entry의 `tone` 필드 / `lieState` / `disputeId` 메타 확인 후 톤 단계 정합 검증.

### 4.4 시스템 메시지 — 관찰자 서술체

```
❌ "진술 태도에 변화가 감지된다."  (분석 톤)
✅ "진술이 달라지기 시작한다."

❌ "lieState S2 진입이 확인된다."  (시스템 용어)
✅ "한 발 물러서기 시작한다."

❌ "모순 토큰 누적 1."
✅ "이야기가 어긋난다."
```

게임 내 모든 시스템 메시지는 **재판관의 관점에서 관찰한 서술체** — 일관성 유지.

### 4.5 호칭 규칙

```
재판관 → 당사자: "OOO 씨"  (절대 "제 아내/남편" X)
재판관 → 증인: 증인 실명 사용  (절대 "증인 씨" X. 예: "오피스텔 경비님" / "박미라 씨")

당사자 → 재판관에게 상대 언급: callTerms.toJudge
   spouse-01: "제 남편" / "제 아내"
   family-01: case data callTerms.toJudge 확인
   friend-01: case data callTerms.toJudge 확인

당사자 → 상대에게 직접: callTerms.toPartner
   spouse-01: "자기"
   family-01: 확인
   friend-01: 확인

당사자 격앙 시: callTerms.angry
   spouse-01 A: "이준호!" / B: "박지연!"
```

### 4.6 깨진 조사 (자동 보정 artifact)

```
❌ "X 것는" → ✅ "X 것은"
❌ "X 것를" → ✅ "X 것을"
❌ "X 것와" → ✅ "X 것과"
❌ "X 것였" → ✅ "X 것이었"
❌ "X 것로" → ✅ "X 것으로"
❌ "X을 → X를" (받침 없는 명사 + 을)
❌ "X가 → X이" (받침 있는 명사 + 가)
```

`koreanPostposition.ts`의 후처리 로직 위반 사례. 자동 검출 + 수정.

### 4.7 변수 치환 패턴 / boilerplate 동일 어미 (사용자 강조)

QW-Cross 검토 결과 patch 누적: 같은 entry의 5~10개 variant가 동일한 끝맺음을 쓰면 boilerplate. 변주 필수:

```
❌ Variant 1~10 모두: "...답해 주시겠습니까."
✅ Variant 다양화:
   - "...답해 주시겠습니까."
   - "...밝혀 주십시오."
   - "...들려주십시오."
   - "...설명해 주십시오."
   - "...정리해 주시겠습니까."
   - "...어떻게 된 건지 말씀해 주십시오."
   - "...어느 쪽이 사실인지 말씀해 주시겠습니까."
   - "...지금 답하실 차례입니다."
   - "...이 자리에서 분명히 해 주십시오."
   - "...무엇이 사실인지 말씀해 주시겠습니까."
```

### 4.8 길이 가이드 (참조용 — 의미 우선, 글자수 ±5자 편차 OK)

| 채널 | 권장 글자수 |
|---|---|
| judge_question | 30~70 |
| judge_contradiction | 40~80 |
| judge_evidence_combo | 40~80 |
| judge_witness_summon | 30~60 |
| system_message | 20~50 |

→ **글자수 가이드는 큰 틀만**. 의미 정확성 우선.

---

## 5. NPC 발화 품질 — archetype voice + lieState 단계별

### 5.1 archetype 6종

| Archetype | 특징 | 표현 무게 |
|---|---|---|
| **avoidant** | 핵심어 회피, 모호어로 시간 벌기 | "쪽", "그건...", "상황이..." 등 약한 단어 OK |
| **confrontational** | 강한 단정, 공격적 반박 | "그건 분명히 X입니다." |
| **victim_cosplay** | 피해자 위치 선점, 단정의 무게 | "저도 당했습니다." / 강한 단정 |
| **cold_logic** | 사실 위주, 감정 평면 | "사실은 ~이고, 따라서 ~." |
| **affect_flattening** | 감정 톤 거의 없음, 평면 | 격앙 emotional_overload에서도 평면 유지 ★ |
| **premature_summary** | 결론 먼저, 자기 해석 강조 | "결국 ~입니다." |

#### 사건별 archetype

| 사건 | A archetype | B archetype |
|---|---|---|
| spouse-01 | 박지연 victim_cosplay | 이준호 avoidant |
| family-01 | 윤태성 confrontational | 윤정후 affect_flattening |
| friend-01 | 송다은 premature_summary | 최수민 affect_flattening |

### 5.2 archetype voice 보존 — 사용자 모범 patch 1

**박지연 (victim_cosplay) d-1 모순 추궁 (soft)**:
```
❌ 메인 보정: "쪽이었는데" / "쪽입니다"  (단순 어휘 교체)
✅ 사용자 보정: "주장이었는데" / "의견입니다"  (인지 단계 약화 — 강한 단정 → 한 발 물러선 해석)
```

→ "쪽" 같은 약한 단어를 victim_cosplay archetype의 단정 무게에 맞춰 "주장 / 의견"으로 강화.

**이준호 (avoidant)** 발화에선 "쪽" 모호어 유지 OK (archetype voice).

### 5.3 lieState 단계별 노출 (NPC interrogation / contradiction_pursuit)

| State | NPC 발화에서 노출 가능 범위 |
|---|---|
| S0 | 부정만. 진실 lexeme X. callTerms.toPartner / toJudge에 따라 호칭 |
| S1 | 일부 인정. 표면적 사실. 진실 lexeme X. 모호어 OK |
| S2 | 핑계. "사정이 있었다" 류. 약칭만. lexeme 부분 노출 시작 |
| S3 | 책임 전가. 구체적 진실 일부. lexeme OK |
| S4 | 감정적. 진실 직설 시작 (격앙). 호칭 angry 가능 |
| S5 | 자백. 모든 진실 공개 |

→ 각 entry의 `lieState` 메타 확인 후 **단계별 정합** 검증. S0/S1 entry에 진실 lexeme 들어있으면 위반.

### 5.4 부인 / 부정 동사

NPC가 archetype voice로 "부인" 단어 사용 시 보존. 그 외 일반적으로 "부정" 사용.

### 5.5 callTerms 사용

각 entry의 NPC 시점에 따라:
- 재판관에게 상대 언급: `callTerms.toJudge` 사용 ("제 남편이~")
- 상대에게 직접 발화: `callTerms.toPartner` 사용 ("자기야~")
- 격앙 시: `callTerms.angry` 사용 ("이준호!")

(case data 직접 read 후 정확 매칭)

---

## 6. 사건별 핵심 fact (절대 충돌 금지)

### 6.1 spouse-01 — "새벽 통화기록"

| Fact | 값 |
|---|---|
| 제목 | 매일 아내 몰래 오피스텔에 머물다 오는 남편 |
| A 박지연 | 36, 학원 데스크, victim_cosplay |
| B 이준호 | 38, 가전매장, avoidant |
| 진실 — 오피스텔 거주자 | 친형 + 중2 조카딸 (B의 형 가족) |
| 진실 — 형 사정 | 개인회생 중. 새벽~밤 일. B가 조카 돌봄 |
| 진실 — 말 못한 이유 | 시댁 갈등. 시댁 얘기 = 가정 폭발 |
| 진실 — A 위임장 조작 | 공동 적금 3,000만원 해지 → 투자 사기로 전액 손실 |
| 진실 — B 비자금 | 개인 비자금 2,000만원 현금으로 형에게 전달 |
| 총 손실 | 5,000만원 (3,000 적금 + 2,000 사기) |
| 순서 | 숨김 = B 먼저 / 비밀 송금(범죄) = A 먼저 |
| 핵심 dilemma | A의 위임장 조작(범죄) vs B의 가족 돌봄(은폐) — 누가 더 무거운가 |

### 6.2 family-01 — "치매 어머니의 유서" ⚠

| Fact | 값 |
|---|---|
| 훅 | 배다른 동생(B)을 평생 미워한 A. 치매 어머니 사망 후 유산 60%가 B에게 |
| A 윤태성 | 48, 주방가구 공장 대표, confrontational |
| B 윤정후 | 44, 자동차부품 가게, affect_flattening |
| **유서 비율** | **A 40 / B 60** ★ 절대 반대 X |
| **B가 90→60 줄임** | 원본은 B 90%였고 B가 자기 몫을 60%로 줄임 |
| 어머니가 90% 준 이유 | B가 20년간 매달 생활비 보냄 + A 사업 실패 때 B 돈으로 빚 갚음 |
| A 사업 실패 빚 처리 | B 돈으로. 어머니가 "내 돈"이라며 전달 |
| 출생 비밀 ★ | A도 배다른 자식. B는 알지만 A에게 안 말함 |
| B 90→60 진짜 이유 | "법정 가면 일기장(어머니 일기)까지 터진다. 60:40이면 형이 법정까지 안 간다." |
| A 위치 | 아버지 회사 대표 — 출생 비밀 드러나면 경영권 위기 |

### 6.3 friend-01 — "손절한 절친"

| Fact | 값 |
|---|---|
| 훅 | 손절한 전 절친 B가 내 예비신랑에게 자꾸 연락한다 |
| A 송다은 | 31, 온라인 쇼핑몰 CS, premature_summary |
| B 최수민 | 31, 필라테스 강사, affect_flattening |
| 표면 | A → 주변에 "B가 내 남자한테 또 손댄다" 퍼뜨림. B 차단당해 해명 불가 |
| 진실 (예비신랑→B) | 예비신랑이 B에게 찝적댐 (술자리 후 연락, 둘이 보자 등). B는 "A 남자친구잖아, 하지 마"로 선 그음 |
| 진실 (B 연락 이유) | A 아버지가 예비신랑의 돈을 갈취하려 접근하는 정황 포착. 물증 X |
| 과거 손절 사건 | A 아버지가 B에게 사기. B는 "네 아빠가 사기꾼이야" 차마 못 말함. A는 "B가 돈 때문에 변했다" 오해 → 손절 |
| **현재 위협** | A 아버지가 과거에 B에게 한 것을 이번엔 예비신랑에게 시도 |
| **B의 동기** | 같은 패턴 알아봄. "또 당하게 놔둘 수 없다." 근데 또 말 못하고 또 B만 악역 |

### 6.4 사건 fact 충돌 검증 절차

각 사건의 case data `meta.anchorTruth` / `meta.resolutionDilemma` / `disputes[].truthDescription` 직접 read. ScriptedText variant text와 cross-check.

충돌 사례 (이전 발견):
- family-01 S8 tonePatch 64건: "유서에는 제가 60, 제 동생이 40" → A 60/B 40 (반대) 사용 → 폐기
- friend-01 S8 dossier 21건: id 형식 잘못 (`a-dc1-q1-...` vs 통합 `dc-1-a-q1-...`)

→ Codex가 14,931 variants 정독하면서 **사건 fact 충돌** 발견 시 P0 수정 대상.

---

## 7. 사용자 모범 4 patch (필수 일관 적용)

### 7.1 Patch 1 — 인지 단계 약화 (단정 → 해석)

```
❌ "분명히 X였습니다."  (강한 단정 유지)
✅ "X였다는 주장이었는데"  (단정 → 한 발 물러선 해석)
```

박지연 (victim_cosplay) d-1 모순 추궁 (soft):
- ❌ "쪽이었는데" / "쪽입니다"
- ✅ "주장이었는데" / "의견입니다"

→ NPC 인지 단계가 단계적으로 약화되는 흐름을 표현.

### 7.2 Patch 2 — 정보 추궁 → 동기/심리 추궁

```
❌ "무엇을 알고 무엇을 밀어붙였습니까?"  (정보 추궁 — 무엇)
✅ "왜 그렇게 확신하고 밀어붙였습니까?"  (동기/심리 추궁 — 왜)
```

→ 단순 사실 추궁이 아니라 NPC 의사결정 동기를 짚음.

```
❌ "그 책임도 졌습니까?"
✅ "그 이유도 있었습니까?"  (책임 → 이유)
```

### 7.3 Patch 3 — 추상 → 직접 행동 지적

```
❌ "흐리면 바로 세울 수 없습니다."  (추상)
✅ "밝히지 않으면 내세울 수 없습니다."  (직접 행동 지적)
```

→ 재판관이 NPC의 행동 자체를 명시적으로 짚음.

```
❌ "본 방식과 본 뒤의 행동을..."  (어색)
✅ "관련 내용을..."  (자연스러운 일반화)
```

### 7.4 Patch 4 — 명사형 → 동사형 자연체 (한국어)

```
❌ "가족 돌봄으로 입장을 옮기셨습니다."  (명사형)
✅ "가족을 돌본 것이라고 입장을 옮기셨습니다."  (동사형)

❌ "가족 지원이었다고 말씀하십니다."
✅ "가족을 도운 것이었다고 말씀하십니다."

❌ "분명한 해명이 필요합니다."
✅ "분명히 해명해 주셔야 합니다."

❌ "정확한 진술 부탁드립니다."
✅ "정확하게 진술해 주십시오."
```

→ "X 돌봄" / "X 지원" / "X 해명" 류 명사형 = 한국어 재판관 발화에서 부자연. **"X을 ~한 것" 동사형**으로 풀어쓰기.

### 7.5 모범 patch 적용 검출 패턴

Codex는 다음 패턴 자동 검출 후 사용자 모범으로 변환 시도:

| 검출 정규식 (개념) | 변환 |
|---|---|
| `(\w+) 돌봄`, `(\w+) 지원`, `(\w+) 보호` 류 명사형 | `\1을 돌본/도운/지킨 것` 동사형 |
| "쪽이었는데" / "쪽입니다" (재판관 발화) | "주장이었는데" / "의견입니다" |
| "무엇을 알고" / "무엇을 했" (정보 추궁) | "왜 그렇게..." (동기 추궁) |
| "흐리면" / "흐리지" (추상) | "밝히지 않으면" / "분명히 하지 않으면" |

→ 각 변환은 **9차원 맥락 + archetype voice** 검토 후 적용.

---

## 8. 9차원 맥락 (Codex 검토 기준)

각 variant 검토 시 다음 9차원 + α 매핑:

| # | 차원 | 검토 |
|---|---|---|
| 1 | **사건 setting** | family A 40/B 60, spouse 5,000만원 등 fact 정합 |
| 2 | **archetype voice** | victim_cosplay 단정 / avoidant 모호어 / affect_flattening 평면 등 일관 |
| 3 | **lieState 단계** | S0~S2에서 진실 lexeme X. S3+에서 점진 노출 |
| 4 | **disputeId × 채널** | judge_evidence_combo dc-1 의미 (=형+조카) 직접 노출 X |
| 5 | **emotion / contradict_token** | 격앙(emotional_overload)에서도 archetype voice 보존 |
| 6 | **추궁 차원** | 정보(무엇) / 동기(왜) / 책임(누가) / 인지 단계 — 어느 차원의 추궁인지 |
| 7 | **NPC 마지막 발언 맥락** | 직접 인용 X but 본질 정확히 짚는 표현 |
| 8 | **인지 변화 단계** | NPC 인지가 단계적으로 약화 (확실 → 정황 해석 → 인정) |
| 9 | **재판관 톤 단계** | soft / mid / hard 정합 |
| α | **호칭** | 재판관 = "OOO 씨" / 증인 실명 / NPC = callTerms |

---

## 9. 작업 절차 (Codex 자율 진행)

### 9.1 1단계: 사건 fact 매트릭스 구축

각 사건의 case data 직접 read해서 fact 매트릭스 구축:

```bash
src/data/cases/generated/spouse-01.json
src/data/cases/generated/family-01.json
src/data/cases/generated/friend-01.json
```

추출 항목:
- `meta.anchorTruth` (사건 진실 한 줄 요약)
- `meta.resolutionDilemma` (핵심 dilemma)
- `duo.partyA/B.archetype` / `callTerms` / `verbalTells`
- `evidence[]` (id / surfaceName / name)
- `dossierCards[]` (id / 의미)
- `disputes[]` (id / truthDescription)
- `socialGraph[]` (증인 정보)

→ 사건 fact 매트릭스 = `tmp/codex-recovery/fact-matrix.json`

### 9.2 2단계: ScriptedText 전수 정독 + 검출

```bash
src/data/scriptedText/spouse-01.json   (4,677 variants)
src/data/scriptedText/family-01.json   (5,172 variants)
src/data/scriptedText/friend-01.json   (5,082 variants)
                                        ─────
                                        14,931 variants 전수
```

각 variant 검토:
1. 진실 누설 검출 (사건별 lexeme + dossier 의미 + evidence 진실 호칭 + truthDescription)
2. 채널별 톤 위반 검출 (재판관 4채널 + system_message + mediation)
3. 사건 fact 충돌 검출
4. 한국어 품질 (번역체 / 깨진 조사 / 명사형 / 부인 동사 / 호칭)
5. 사용자 모범 4 patch 적용 가능성

### 9.3 3단계: 직접 수정 적용

`src/data/scriptedText/{caseId}.json` 직접 수정:
- variant `text` 필드 교체
- `behaviorHint` / `tags` / `sourceRefs` / `id` / 다른 메타 필드 보존
- `status: 'skipped'` 등 메타 필드는 표준 적용 스크립트로 처리

### 9.4 4단계: 자체 검증

```bash
npm run build                          # 빌드 통과
npx tsc -b --force                     # tsc 통과
node tmp/detect-truth-leak.cjs         # 누설 0건
node tmp/precheck-matrix.cjs           # 매트릭스 정합
```

→ 위 검증 PASS 안 되면 추가 수정.

### 9.5 5단계: 산출물 저장

`tmp/codex-recovery/` 폴더 생성 + 저장:

```
tmp/codex-recovery/
├── FINAL-REPORT.md                       # 종합 (사건별/채널별/카테고리별 통계 + 대표 patch)
├── fact-matrix.json                      # 사건 fact 매트릭스 (1단계)
├── changes-log.json                      # 변경된 모든 variant (before/after/rationale)
├── claude-polish-candidates.json         # Claude 2차 폴리싱 대상 list
├── truth-leak-after.json                 # detect-truth-leak.cjs 결과
├── precheck-after.json                   # precheck-matrix.cjs 결과
├── build-log.txt                         # npm run build 로그
├── tsc-log.txt                           # tsc 로그
└── precheck-comprehensive.cjs            # ★ Codex가 보강한 통합 검증 스크립트
```

---

## 10. 산출물 형식 상세

### 10.1 `changes-log.json`

```json
{
  "generatedAt": "ISO8601",
  "totalVariantsScanned": 14931,
  "totalChanged": 0,
  "byCase": {
    "spouse-01": { "scanned": 4677, "changed": 0 },
    "family-01": { "scanned": 5172, "changed": 0 },
    "friend-01": { "scanned": 5082, "changed": 0 }
  },
  "byChannel": { ... },
  "byCategory": {
    "truth_leak": 0,
    "judge_tone_mechanical": 0,
    "judge_tone_direct_quote": 0,
    "judge_tone_nominalization": 0,
    "judge_tone_monotone_ending": 0,
    "fact_conflict": 0,
    "translationese": 0,
    "broken_postposition": 0,
    "honorific_violation": 0,
    "user_pattern_1_cognition": 0,
    "user_pattern_2_motive": 0,
    "user_pattern_3_action": 0,
    "user_pattern_4_verb_form": 0,
    "boilerplate_variation": 0,
    "denial_verb": 0
  },
  "patches": [
    {
      "caseId": "spouse-01",
      "channel": "judge_evidence_combo",
      "entryId": "...",
      "variantId": "...",
      "before": "...",
      "after": "...",
      "category": ["truth_leak", "judge_tone_nominalization"],
      "rationale": "evidence e-4 진실 '형 문자' 누설 → surface '발신자 미상 문자'로 변경. 명사형 '돌봄' → 동사형 '돌본 것'.",
      "polishCandidate": false
    }
  ]
}
```

### 10.2 `claude-polish-candidates.json`

```json
{
  "generatedAt": "ISO8601",
  "totalCandidates": 0,
  "description": "Codex가 의미는 보정했으나 한국어 자연체 측면에서 ClaudeCode의 2차 폴리싱이 필요한 entries.",
  "candidates": [
    {
      "caseId": "...",
      "channel": "...",
      "entryId": "...",
      "variantId": "...",
      "current": "Codex 1차 보정 후 텍스트",
      "issue": "예: 호흡 어색 / 단조 어미 / 자연체 폴리싱 필요",
      "suggestion": "(선택) Codex 권장 방향"
    }
  ]
}
```

### 10.3 `FINAL-REPORT.md`

```markdown
# Codex 종합 수습 v2 — 종합 리포트

## 작업 요약
- 작업 시간: ...
- 전수 정독: 14,931 variants
- 직접 수정: N건
- Claude 2차 폴리싱 후보: M건
- 자체 검증 결과: ALL PASS / N건 FAIL

## 사건별 통계
...

## 채널별 통계
...

## 카테고리별 통계 (잘못 패턴별)
- 진실 누설: N건 (재판관 / system / mediation / NPC ...)
- 재판관 톤: ...
  - 기계적 관찰문: ...
  - 직접 인용: ...
  - 명사형: ...
  - 단조 어미 boilerplate: ...
  - "쪽" 모호어: ...
- 사건 fact 충돌: ...
- 한국어 품질: ...
- 사용자 모범 4 patch 적용: ...

## 대표 patch 30건 (사건별 10건씩, before/after/rationale)
...

## ClaudeCode 인계 영역
- claude-polish-candidates.json M건
- 권장 검토 우선순위: ...

## 자체 검증 결과
- npm run build: PASS / FAIL
- npx tsc -b --force: PASS / FAIL
- node tmp/detect-truth-leak.cjs: 0건 / N건
- node tmp/precheck-matrix.cjs: PASS / N항목 FAIL

## 미해결 / 결정 대기 항목
- (사건 fact 충돌 발견했으나 case data 자체가 수정 필요할 수도 있는 항목)
- (의미 모호로 Codex 단독 결정 어려운 항목)
```

### 10.4 `precheck-comprehensive.cjs` (검증 시스템 보강)

기존 `tmp/precheck-matrix.cjs` + `tmp/detect-truth-leak.cjs` 통합 + 강화:

```javascript
// 통합 사전 검증
// 사용: node tmp/codex-recovery/precheck-comprehensive.cjs
//
// 검증 항목 (10+):
// 1. 진실 누설 (사건별 lexeme + evidence name + dossier 의미 + truthDescription)
// 2. 재판관 톤 위반
//    - 기계적 관찰문 ("감지됩니다" / "확인됩니다" / "검출되었" 등)
//    - 긴 직접 인용 (따옴표 + 30자 이상)
//    - 시스템 + 직접 인용 결합
//    - 명사형 ("X 돌봄" / "X 지원" 류)
//    - 단조 어미 boilerplate (같은 entry variant 5+ 동일 어미)
//    - "쪽" 모호어 (재판관 발화)
//    - "부인" 동사 (재판관 발화 — 일반 패턴)
// 3. 사건 fact 충돌 (case data anchorTruth / disputes[].truthDescription cross-check)
// 4. 번역체 9패턴
// 5. 깨진 조사
// 6. 호칭 위반 ("증인 씨" / "제 아내" / "제 남편")
// 7. lieState × 사건 lexeme 매트릭스 (S0~S2 노출 X)
// 8. variant id 형식
// 9. null / empty text
// 10. callTerms 일관성

// 출력: tmp/codex-recovery/precheck-result.json
//       (PASS/FAIL + 위반 entries + 카테고리별 통계)
```

새 ClaudeCode CT는 모든 적용 전후 이 스크립트 실행 → ALL PASS만 적용.

---

## 11. ClaudeCode 2차 폴리싱 (Codex 회수 후)

Codex 작업 완료 후 ClaudeCode CT가 인계받아 자연체 폴리싱:

### 11.1 ClaudeCode 작업 영역
- Codex가 `claude-polish-candidates.json`에 표시한 entries 검토
- Codex 변경 entries 중 spot check (각 사건 10~20건)
- 한국어 자연체 측면 (호흡, 어미 다양화, 표현 어색함)
- 의미는 Codex가 보정 — Claude는 자연체 양립만

### 11.2 ClaudeCode 작업 영역이 아닌 것
- 진실 누설 (Codex가 1차 처리)
- 사건 fact 충돌 (Codex가 1차 처리)
- 번역체 / 깨진 조사 / 호칭 위반 (Codex가 1차 처리)
- 9차원 맥락 의미 보정 (Codex가 1차 처리)

→ Claude는 **자연체 마감 + 사용자 spot check 대비**.

---

## 12. 검증 체크리스트 (Codex 제출 전 필수)

### 12.1 데이터 검증
- [ ] 14,931 variants 전수 정독 (skip 0건)
- [ ] 진실 누설 0건 (`detect-truth-leak.cjs`)
- [ ] 재판관 톤 위반 0건 (precheck 강화 후)
- [ ] 사건 fact 충돌 0건
- [ ] 번역체 9패턴 0건
- [ ] 깨진 조사 0건
- [ ] 호칭 위반 0건 ("증인 씨" / "제 아내" / "제 남편" 등)
- [ ] null / empty text 0건
- [ ] variant id 형식 일관 (caseId-channel-... 패턴)
- [ ] callTerms 일관 (toJudge / toPartner / angry)

### 12.2 빌드 / tsc 검증
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS

### 12.3 산출물 검증
- [ ] `tmp/codex-recovery/FINAL-REPORT.md` 생성
- [ ] `tmp/codex-recovery/changes-log.json` 생성
- [ ] `tmp/codex-recovery/claude-polish-candidates.json` 생성
- [ ] `tmp/codex-recovery/fact-matrix.json` 생성
- [ ] `tmp/codex-recovery/precheck-comprehensive.cjs` 생성
- [ ] 자체 검증 모든 결과 저장

### 12.4 메타 보존 검증
- [ ] 모든 patch에서 `id`, `behaviorHint`, `tags`, `sourceRefs`, `lieState`, `tone`, `disputeId`, `party` 등 메타 필드 보존
- [ ] `status` 필드 보존 (status: 'skipped' 등)
- [ ] 채널별 통합 통계 (사건별 variant 수) 변동 없음 (모든 변경 = text 교체만)

---

## 13. 잘못 패턴 #1~#9 (절대 회피)

### #1 데이터 직접 read 검증
- 추측 X. case data + scriptedText 직접 read

### #2 임의 정보 작성 X
- source 파일에 명시되지 않은 인물/장소/금액 사용 X

### #3 다른 사건 정보 혼입 X
- spouse 작업 중 family/friend fact 혼입 X
- 각 사건 자기완결 처리

### #4 신규 작성 vs 보완 혼동 X
- 신규 작성 X. 기존 본문 의미 보존하면서 표현 보정
- variant 폐기/추가 X (text 교체만)

### #5 사용자 detail 메시지 = 항상 보완 방향
- 메인 detail = 그 부분 깊이 보완. 다른 영역으로 우회 X

### #6 보정 = 9차원 맥락-의미 정확성 ★
- 단순 어휘 교체 X. 9차원 매핑 후 표현 선택

### #7 단순 확인 질문에 옵션 제시 X
- 자율 판단 + 단일 결정. 사용자에게 선택지 제시 X

### #8 사건 설정 일치 검증
- 비율/금액/날짜/인물 관계 case data와 정확 일치
- ★ family A 40/B 60 절대 반대 X

### #9 진실 누설 금지 ★ (NEW — 게임 핵심 원칙)
- 재판관 / 시스템 메시지 / dossier 안내 등에서 NPC 자백 전 진실 콘텐츠 직접 언급 X
- evidence는 surfaceName만
- dossier 카드 의미는 추상화

---

## 14. 참고 자료 (모두 정독)

### 14.1 데이터 (직접 read 필수)
- `src/data/cases/generated/spouse-01.json`
- `src/data/cases/generated/family-01.json`
- `src/data/cases/generated/friend-01.json`
- `src/data/scriptedText/spouse-01.json` (4,677 variants)
- `src/data/scriptedText/family-01.json` (5,172 variants)
- `src/data/scriptedText/friend-01.json` (5,082 variants)
- `src/data/claimPolicies/{caseId}-v2-atoms.json`
- `src/data/claimPolicies/{caseId}-structure-v2.json`
- `src/data/claimPolicies/{caseId}-game-events-v2.json`
- `src/data/claimPolicies/{caseId}-dossier-cards.json`

### 14.2 메모리 / 도메인 가이드
- `CLAUDE.md` — 게임 구조 + 핵심 원칙 ("진실은 플레이어가 직접 밝혀낸다")
- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` — 사건 핵심
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md` — 사용자 모범 4
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md` — 한국어 품질
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md` — 잘못 패턴 #1~#8

### 14.3 이전 audit / 검출 결과
- `tmp/qa-redo-20260426/QA-{Q,QW,QW-Cross}-*` — Thread별 QA 결과
- `tmp/truth-leak-detection.json` — Phase 1 raw (70건 검출)
- `tmp/precheck-result.json` — 매트릭스 검증
- `tmp/detect-truth-leak.cjs` — 검출 스크립트 (좁은 패턴, Codex가 보강)
- `tmp/precheck-matrix.cjs` — 사전 검증 (10항목, Codex가 강화)

### 14.4 사용자 검토 자료
- `tmp/USER-REVIEW-C-thread-qw-cross-p1.md` (1,754 lines)
- `tmp/USER-REVIEW-D-thread-qw-p2.md` (253 lines)

### 14.5 메인 코드 (수정 대상 — 단 코드 fallback은 별도 작업)
- `src/hooks/useActionDispatch.ts`
- `src/engine/llmDialogueResolver.ts`
- `src/engine/blueprintPromptBuilderV2.ts`
- `src/engine/judgeQuestionEngine.ts`
- (코드 fallback 23건 정리는 별도 의뢰 — 이번 작업 범위 X)

---

## 15. 출력 폴더 / 파일 일람

```
tmp/codex-recovery/
├── FINAL-REPORT.md
├── fact-matrix.json
├── changes-log.json
├── claude-polish-candidates.json
├── truth-leak-after.json
├── precheck-after.json
├── build-log.txt
├── tsc-log.txt
└── precheck-comprehensive.cjs

(직접 수정)
src/data/scriptedText/spouse-01.json
src/data/scriptedText/family-01.json
src/data/scriptedText/friend-01.json
```

---

## 16. 작업 시 주의 (메인 ClaudeCode CT 인계)

1. **시간 제약 없음** — 14,931 전수 정독 깊이 우선. 1일 / 2일 / 3일 걸려도 OK
2. **자율 판단** — 의사 결정 흐름(1.2) 따라 단독 진행. 사용자에게 옵션 제시 X
3. **메타 보존** — 모든 변경 = `text` 교체만. 다른 메타 필드 보존
4. **status='skipped' 메타** — 메인의 이전 적용 스크립트 버그 (status 무시 → null 적용)와 동일 위험. Codex는 status 명시적으로 체크
5. **변동 통계** — 사건별 variant 수 / 채널별 수 변동 없어야 함
6. **빌드 / tsc PASS 필수** — 적용 후 자체 검증 후 산출물 저장
7. **claude-polish-candidates.json** — 의미는 보정했으나 자연체 양립이 어려운 entries 별도 표시
8. **사건 fact 충돌 발견 시** — case data 자체가 잘못된 경우 P0 list에 별도 표시 (Codex가 case data 직접 수정 X — 사용자 결정 영역)

---

## 17. 1차 / 2차 작업 흐름

```
[Codex 1차 — 본 의뢰서]
- 전수 정독
- 누설 + 톤 + fact + 한국어 직접 수정
- 자체 검증 PASS
- 산출물 저장
       ↓
[ClaudeCode CT 회수]
- FINAL-REPORT.md 검토
- changes-log.json spot check (각 사건 10~20건)
- precheck-comprehensive.cjs 재실행 → ALL PASS 확인
- 빌드 / tsc 재확인
       ↓
[ClaudeCode 2차 폴리싱]
- claude-polish-candidates.json 검토
- 자연체 양립 (호흡 / 어미 / 표현)
- 사용자 spot check 대비
       ↓
[commit + push]
- 사용자 명시 후
- ALL PASS 후
```

---

## 18. 다른 작업 (이번 의뢰 범위 X)

다음은 별도 의뢰 — 이번 작업에서 진행 X:

### 18.1 코드 fallback 23건 정리
- `src/hooks/useActionDispatch.ts` 등 `?? '당사자'` / `?? '상대방'` 류
- 별도 의뢰 (이번 의뢰 후 진행)

### 18.2 d-5 cells 신규 생성
- family-01 / friend-01 d-5 cells 누락 (각 29 cells / 215 variants)
- 사용자 GPT Pro로 진행 (S10/S11 패키지 준비됨)
- 본 의뢰 회수 후 메인이 prompt에 "진실 누설 금지" 추가

### 18.3 신규 사건 / 신규 콘텐츠
- 본 의뢰 = 기존 보완. 신규 작성 X (잘못 패턴 #4)

---

## 19. 멀티 에이전트 / 멀티 라운드 자동화 구조 ★ (논스톱 완료 보장)

> **사용자 명시**: "Codex가 스스로 여러 에이전트를 만들어서 잡아내서 의견 나누고, 수정하고, 2차/3차 검증하고, 다른 문제 없는지 몇 바퀴 더 돌면서 확인할 수 있는 구조" + "시간이 훨씬 오래 걸려도 논스톱으로 작성 완료" + "과잉으로 근본 목적성 잃는 것 경계".

### 19.1 왜 멀티 에이전트인가

14,931 variants × 다차원(누설 / 재판관 톤 / 사건 fact / 한국어 / archetype / 사용자 모범 / lieState 정합) 검토를 **단일 패스 단일 에이전트**로 처리 시:
- 한 차원에 집중하면 다른 차원 누락 (사용자 우려: "하나가 복합적으로 다 따지기 어려움")
- 한 번 보면 후속 검출 동력 떨어짐 (1차 spot check OK = 깊은 검토 회피, 메인 잘못 패턴 #6 사례)
- patch 충돌 (예: 톤 fix가 누설 유발) 자체 검출 X

→ **specialist 분리 + 라운드 순환 + cross-validation**으로 해소.

### 19.2 에이전트 역할 분담 (specialist 5 + Coordinator + Validator)

```
specialist 5종 (Round 1 병렬):
┌──────────────┬─────────────────────────────────────────────────┐
│ Agent        │ 책임 영역                                       │
├──────────────┼─────────────────────────────────────────────────┤
│ A_TruthLeak  │ 누설 검출 (사건별 lexeme + evidence name +      │
│              │ dossier 의미 + truthDescription) — 3절          │
│              │                                                 │
│ B_JudgeTone  │ 재판관 4채널 + system_message 톤 (기계적 관찰문 │
│              │ / 직접 인용 / 명사형 / 단조 어미 / "쪽" / 부인)  │
│              │ — 4절                                           │
│              │                                                 │
│ C_FactCheck  │ 사건 fact 충돌 (anchorTruth / disputes 비율 /   │
│              │ 인물 관계) — 6절                                │
│              │                                                 │
│ D_KoreanQ    │ 번역체 9패턴 / 깨진 조사 / 호칭 위반 — 4.6/4.5  │
│              │                                                 │
│ E_UserPattern│ 사용자 모범 4 patch (인지/동기/직접 행동/동사형) │
│              │ — 7절                                           │
└──────────────┴─────────────────────────────────────────────────┘

조율 / 검증 (Round 2~5):
┌──────────────┬─────────────────────────────────────────────────┐
│ X_Coordinator│ 같은 variant 다중 제안 → 통합 결정 (우선순위)   │
│ Z_Validator  │ Cross-validation (각 specialist 결과 재검증)    │
└──────────────┴─────────────────────────────────────────────────┘
```

각 에이전트는 자기 영역 외엔 판단 X (자기 차원만 본다 → 깊이 보장).

### 19.3 라운드 구조 (사이클 1회)

```
┌─────────────────────────────────────────────────────────────────┐
│ ROUND 1 — Detection (병렬, 5 specialist 동시 실행)              │
│   - A_TruthLeak    → tmp/codex-recovery/round-N/A-proposals.json│
│   - B_JudgeTone    → tmp/codex-recovery/round-N/B-proposals.json│
│   - C_FactCheck    → tmp/codex-recovery/round-N/C-proposals.json│
│   - D_KoreanQ      → tmp/codex-recovery/round-N/D-proposals.json│
│   - E_UserPattern  → tmp/codex-recovery/round-N/E-proposals.json│
│   각 proposals.json = { variantKey, before, suggested, reason } │
│   직접 수정 X — 제안만                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ ROUND 2 — Coordination (X_Coordinator 단독)                     │
│   같은 variant에 다중 제안 충돌 시 통합 결정:                    │
│   우선순위 (위반 심각도): TruthLeak > FactCheck > JudgeTone     │
│                          > KoreanQ > UserPattern                │
│   누설 fix가 우선 → 그 위에 톤 / fact / 한국어 / 패턴 차례로   │
│   결정된 patch만 src/data/scriptedText/{caseId}.json 직접 적용  │
│   결과: tmp/codex-recovery/round-N/coordinated-patches.json     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ ROUND 3 — Cross-Validation (Z_Validator + 각 specialist 재검증) │
│   각 specialist가 *다른 specialist*의 patch 결과 검증:          │
│   - A → B, C, D, E 결과 검증 (B의 톤 fix가 누설 만들지 않았나?)│
│   - B → A, C, D, E 결과 검증 (A의 누설 fix가 톤을 망치지 않았나?│
│   - C → A, B, D, E 결과 검증                                    │
│   - D → A, B, C, E 결과 검증                                    │
│   - E → A, B, C, D 결과 검증                                    │
│   → 25 cross-check 매트릭스 자동                                │
│   결과: tmp/codex-recovery/round-N/cross-validation.json        │
│         새 issue 발견 시 다음 round 1로 피드                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ ROUND 4 — Re-Detection (specialist 5 재실행 + 잔여 issue 검출)  │
│   변경된 ScriptedText에 specialist 5종 재실행                   │
│   잔여 issue 카운트                                             │
│   결과: tmp/codex-recovery/round-N/residual-issues.json         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      [종료 조건 판정]
                              ↓
              ┌───────── 0건? ─────── YES → ROUND 5
              │
              NO
              ↓
       Round N+1 (max 5 round)
```

### 19.4 종료 조건 (논스톱 완료 보장 + 과잉 방지)

```
종료 = 다음 중 하나 충족 시:
1. 모든 specialist 잔여 issue = 0건
2. 변경 0건 round 1회 (수렴)
3. max 5 round 도달 (안전 한계)
4. patch oscillation 검출 (같은 variant 3회 이상 toggle)
```

종료 후 Round 5~6 진행:

```
ROUND 5 — Final Validation
  - npm run build PASS
  - npx tsc -b --force PASS
  - precheck-comprehensive.cjs ALL PASS
  - 변경된 메타 필드 (id / behaviorHint / tags / status / ...) 보존 검증
  → tmp/codex-recovery/final-validation.json

ROUND 6 — Claude Polish Candidate Classification
  - 의미 OK + archetype voice 정합 + 누설 X but 자연체 어색
  - 단조 어미 boilerplate 잔여
  - 호흡 어색 / 한국어 표현 자연체 미흡
  → tmp/codex-recovery/claude-polish-candidates.json
```

### 19.5 무한 루프 / 과잉 방지 (사용자 우려 대응)

| 위험 | 방지 매커니즘 |
|---|---|
| **과잉 수정** | specialist는 자기 차원만 검토. 다른 차원 변경 X. archetype voice / 사건 fact / lieState 절대 변경 X |
| **무한 oscillation** | 같은 variant 3회 이상 toggle → manual review flag. 종료 조건 4 |
| **글자수 폭증** | "글자수 ±5자 큰 틀" 유지. 의미 정확 + 자연체 우선 (4.8) |
| **신규 작성 회귀** | 기존 본문 의미 보존. variant 폐기/추가 X (text 교체만) — 잘못 패턴 #4 |
| **재예술화** | "예술적 변형 X — 의미 보정만". 도메인 사실은 절대 보정 X |
| **무한 루프** | max 5 round 안전 한계. round-log.json에 각 round 추적 |
| **patch 정체성 손실** | round 사이 diff 추적. patch 누적해도 원본 의미 일치 검증 |

### 19.6 라운드별 진행 추적

```
tmp/codex-recovery/
├── round-1/
│   ├── A-proposals.json       # 누설 제안
│   ├── B-proposals.json       # 톤 제안
│   ├── C-proposals.json       # fact 제안
│   ├── D-proposals.json       # 한국어 제안
│   ├── E-proposals.json       # 사용자 모범 제안
│   ├── coordinated-patches.json  # 통합 결정
│   ├── cross-validation.json     # 25 cross-check 결과
│   └── residual-issues.json      # 잔여 issue
├── round-2/
│   ├── ... (위와 동일 구조)
├── round-3/
│   ...
├── round-N/  (수렴 라운드)
├── round-log.json              # ★ 라운드별 timestamp / 변경 N건 / specialist별 검출 N건
├── final-validation.json
├── claude-polish-candidates.json
└── FINAL-REPORT.md
```

`round-log.json` 형식:

```json
{
  "rounds": [
    {
      "round": 1,
      "startedAt": "ISO8601",
      "endedAt": "ISO8601",
      "durationSeconds": 0,
      "detections": {
        "A_TruthLeak": 0,
        "B_JudgeTone": 0,
        "C_FactCheck": 0,
        "D_KoreanQ": 0,
        "E_UserPattern": 0
      },
      "coordinated": 0,
      "applied": 0,
      "crossValidationNewIssues": 0,
      "residual": 0,
      "convergence": false
    }
  ],
  "totalRounds": 0,
  "totalApplied": 0,
  "convergedAt": 0,
  "terminationReason": "all_zero | no_change | max_rounds | oscillation"
}
```

### 19.7 specialist별 검출 / 수정 패턴 가이드

#### A_TruthLeak — 검출 패턴

```
1. evidence.name (사건 진실 호칭) 키워드 매칭
2. dossier 카드 의미 (= 진실) 키워드 매칭
3. dispute truthDescription 핵심 키워드 매칭
4. 사건별 lexeme dictionary (2.5절 / 3.2절)
5. 채널별 위험 등급 (3.1절)
   - 재판관 4 채널 / system_message / mediation: 거의 모든 진실 lexeme 누설
   - NPC 채널: lieState S0~S2일 때만 누설 (S3+는 정상)
   - aftermath: 항상 OK
6. 간접 누설 (진실 본질을 돌려 표현하지만 명백한 노출)
```

#### B_JudgeTone — 검출 패턴

```
1. 기계적 관찰문 (4.1.1)
   "감지됩니다", "확인됩니다", "검출되었습니다", "관찰됩니다",
   "추적됩니다", "패턴이 나타납니다", "흐름이 보입니다"
2. 직접 인용 (4.1.2)
   "..."(따옴표) + 30자 이상 + "라고 하셨" / "라고 답하셨"
3. 시스템 + 인용 결합 (4.1.3) — 최악
4. 명사형 (4.1.4)
   "X 돌봄", "X 지원", "X 해명", "X 진술" 류 명사 + "이/가/을/를/으로/입니다"
5. 단조 어미 boilerplate (4.1.5)
   같은 entry의 5+ variant가 동일 끝맺음
6. "쪽" 모호어 (재판관 발화) (4.1.6)
7. "부인" 동사 (재판관 발화) (4.1.7)
8. 번역체 9패턴 (4.1.8)
9. 깨진 조사 (4.6)
10. 톤 단계 정합 (4.3) — soft/mid/hard × lieState 단계
11. 합니다체 위반 (4.2.1)
```

#### C_FactCheck — 검출 패턴

```
1. case data anchorTruth와 cross-check
2. case data disputes[].truthDescription와 cross-check
3. 사건별 핵심 fact 매트릭스 (6절):
   spouse: 5,000만원 / 3,000 적금 / 2,000 사기 / 형+조카 / 시댁 갈등
   family: A 40 / B 60 / B가 90→60 줄임 / 출생 비밀 / 20년 송금
   friend: 아버지 사기 / 같은 패턴 / 예비신랑 찝적 / 손절 사건
4. 인물 archetype 일관 (5.1)
5. callTerms 일관 (5.5)
```

#### D_KoreanQ — 검출 패턴

```
1. 번역체 9패턴 (4.1.8)
2. 깨진 조사 (4.6)
3. 호칭 위반 (4.5)
   - 재판관 → 당사자: "OOO 씨" 외 X
   - 재판관 → 증인: 실명 외 X
   - 당사자 → 재판관: callTerms.toJudge
   - 당사자 → 상대 직접: callTerms.toPartner
4. 부인/부정 동사 (4.7)
5. 일반 한국어 자연체 (호흡, 어미, 표현)
```

#### E_UserPattern — 검출 패턴

```
1. Patch 1 — "쪽이었는데" / "쪽입니다" (재판관 발화) → "주장/의견"
2. Patch 2 — "무엇을 알고/했" → "왜 그렇게..." (정보 → 동기)
3. Patch 3 — "흐리면" / "흐리지" (추상) → "밝히지 않으면" (직접 행동)
4. Patch 4 — 명사형 ("X 돌봄") → 동사형 ("X을 돌본 것")
```

### 19.8 우선순위 매트릭스 (X_Coordinator 통합 결정)

같은 variant에 여러 specialist가 다른 patch 제안 시 통합:

```
TruthLeak (P0 — 절대 회피) ★★★★★
  ↓
FactCheck (P0 — 사건 무결성) ★★★★
  ↓
JudgeTone (P1 — 몰입 깨짐) ★★★
  ↓
KoreanQ (P2 — 자연체) ★★
  ↓
UserPattern (P2 — 의미 정확) ★★
```

상위 우선순위가 patch 적용. 하위는 상위 patch 위에 추가 적용 가능 (예: 누설 fix 텍스트 + 단조 어미 fix).

### 19.9 patch 충돌 사례 처리

#### 충돌 사례 1: 톤 fix가 누설 유발

```
원본: "GPS 좌표와 형의 문자 내용을 함께 놓고 보겠습니다." (누설)
B_JudgeTone 제안: "GPS 좌표와 형의 문자 내용을 정리해 주십시오." (톤 OK but 누설)
A_TruthLeak 제안: "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다." (surface 사용)

X_Coordinator 결정: A 우선 → "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다."
                    + B 톤 추가 검토 → "정리해 주십시오" 어미 변형 적용 가능 시 추가
                    
최종: "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다. 그 안에서 누구를 만났는지
       말씀해 주시겠습니까."
```

#### 충돌 사례 2: 사용자 모범과 archetype 충돌

```
원본 (이준호 avoidant, S2 발화): "그쪽 사정이 있었습니다."
E_UserPattern 제안: "쪽" → "주장/의견" — Patch 1 적용
B_JudgeTone 제안: NPC 발화이므로 archetype voice 보존

X_Coordinator 결정: B 우선 (NPC archetype 보존) → 변경 X
   (Patch 1은 재판관 발화에만 적용 — 박지연 victim_cosplay에선 강화, 이준호 avoidant에선 X)
```

### 19.10 Codex의 자율 판단 기준

각 라운드에서 Codex가 자율 판단:

1. **언제 다음 라운드로?** — 모든 specialist 검출 결과 0건 시
2. **언제 종료?** — 종료 조건 4종 중 하나 충족 시
3. **patch 충돌 시 누구 우선?** — 19.8 우선순위 매트릭스
4. **archetype voice vs 사용자 모범** — archetype 우선
5. **글자수 vs 의미** — 의미 우선 (단 ±5자 큰 틀 유지)
6. **case data 자체 잘못 발견 시** — Codex가 case data 직접 수정 X. P0 list에 별도 표시 (사용자 결정 영역)
7. **사건 fact 모호 시** — case data anchorTruth / truthDescription 직접 read 후 결정
8. **dossier 의미 모호 시** — case data dossierCards[].meaning 직접 read

### 19.11 과잉 회피 — "근본 목적성" 보호 (사용자 강조)

**과잉 신호** (Codex가 자체 감지 + 종료):

| 신호 | 대응 |
|---|---|
| 같은 variant 3회 이상 patch | manual review flag — Codex 종료 |
| Round 사이 변경 0건 + 잔여 issue | 수렴. 종료 |
| 글자수 +20자 이상 폭증 | 의미 우선이지만 한계. 재고 |
| archetype voice 변형 시도 | NPC voice = 절대 변경 X |
| 사건 fact 변경 시도 | case data 충돌 발견은 별도 list로 — 직접 변경 X |
| Round 5 도달 + 잔여 issue | manual review flag. 사용자 검토 영역 |

**근본 목적성** = "진실은 플레이어가 직접 밝혀낸다" + "재판관 = 사람" + "사건 fact 정합" + "한국어 자연체". 이 4 축이 보호되면 OK. 그 외는 보조.

### 19.12 round-log.json 종합 출력 (FINAL-REPORT.md용)

각 라운드 종료 시 round-log.json에 누적. 최종 FINAL-REPORT.md에 포함:

```markdown
## 라운드 진행 추적

| Round | 시작 | 종료 | A 검출 | B 검출 | C 검출 | D 검출 | E 검출 | 통합 patch | 적용 | 잔여 |
|-------|------|------|--------|--------|--------|--------|--------|-----------|------|------|
| 1 | ... | ... | 487 | 1,243 | 31 | 856 | 412 | 2,180 | 2,089 | 940 |
| 2 | ... | ... | 28 | 412 | 5 | 187 | 92 | 612 | 598 | 187 |
| 3 | ... | ... | 4 | 87 | 1 | 12 | 14 | 113 | 109 | 18 |
| 4 | ... | ... | 0 | 12 | 0 | 2 | 1 | 14 | 14 | 0 |
| 5 | ... | ... | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |  ← 수렴

수렴 라운드: 5 (max 5 도달 / 모든 0건)
종료 사유: all_zero
총 적용 patch: 2,810
Claude 폴리싱 후보: 142
```

---

## 20. 마무리 — Codex에게

이 의뢰서는 **꼼꼼히 / 시간 우선 / 자율 판단**의 3원칙을 그대로 반영했다.

각 variant를 검토할 때:
1. 게임 구조(2절)를 떠올려서 "이 발화가 게임 메커니즘을 무력화하는가?" 자문
2. 누설 정의(3절)와 재판관 말투(4절)에 비춰 위반 항목 식별
3. 사건 fact(6절)와 충돌하는지 cross-check
4. 사용자 모범 4 patch(7절) 적용 가능성 검토
5. 9차원 맥락(8절) 매핑 후 표현 선택
6. 의미는 보정했으나 자연체 양립이 부족하면 `claude-polish-candidates.json`에 표시

**14,931 variants 전수 정독은 큰 작업이지만, "재판관 말투들도 여전히 엉망"이라는 사용자 지적은 부분 spot check로는 해결 X**. 모든 entry를 그대로 본다.

자체 검증 PASS 후 `tmp/codex-recovery/FINAL-REPORT.md`로 종합 보고. ClaudeCode CT가 회수해 2차 폴리싱 + commit 진행.

— END —
