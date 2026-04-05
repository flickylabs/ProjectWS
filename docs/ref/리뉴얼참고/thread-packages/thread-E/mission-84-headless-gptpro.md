# Thread E Mission: 84건 헤드리스 플레이스루 + GPT Pro 품질 분석

## 목표
84건 전체 사건에 대해 UI 없이 엔진을 직접 호출하여 20턴 플레이스루를 실행하고, 대화 트랜스크립트를 JSON으로 출력한다. 이 트랜스크립트를 GPT Pro 7개 세션에 카테고리별로 나눠 동시 품질 분석을 수행한다.

---

## Part 1: 헤드리스 플레이스루 스크립트 준비

### 기존 코드 참조

반드시 아래 파일들을 먼저 읽고 구조를 파악한 뒤 작업할 것:

| 파일 | 역할 |
|------|------|
| `tests/full-playthrough-v2.cjs` | V2 풀 플레이스루 원본 (프롬프트/엔진 로직 전부 포함) |
| `tests/playthrough-runner.cjs` | 공통 인프라 (full-playthrough-v2.cjs 로직을 모듈화) |
| `tests/scenarios/*.cjs` | 사건별 시나리오 정의 (7건 대표 사건) |
| `tests/run-playthrough.cjs` | 시나리오 실행기 |

핵심: `playthrough-runner.cjs`가 엔진 로직(atom 선택, slot 해소, LLM 호출, stance 결정 등)을 전부 갖고 있다. 시나리오 파일은 턴 구성만 정의한다.

### 스크립트 요구사항

**대상 스크립트:** `tests/run-84-headless.cjs` (신규 작성)

1. 84건 각각에 대해 20턴 플레이스루 실행
2. UI 없이 엔진 함수 직접 호출 (LLM API 호출 포함, gpt-4o)
3. 각 턴마다 기록:
   - 턴 번호
   - 선택한 액션 (`questionType`, `evidenceId` 등)
   - 재판관 질문 텍스트
   - NPC 응답 텍스트
   - lieState 변화 (이전 → 이후)
   - 시스템 메시지 (있는 경우)
4. 출력: 사건별 JSON 트랜스크립트 → `tests/transcripts/{case-id}.json`

### 시나리오 자동 생성 로직

기존 `tests/scenarios/*.cjs`는 7건 대표 사건만 수동으로 정의되어 있다. 84건 전체를 커버하려면 시나리오를 자동 생성해야 한다.

**자동 시나리오 턴 구성 (각 사건 20턴):**

| 턴 | 구간 | 주요 액션 | lieState 목표 |
|----|------|-----------|---------------|
| 1-5 | 초기 심문 | `fact_pursuit` 위주, partyA d-1 중심 | S0 → S1 |
| 6-10 | 증거 + 동기 | `evidence_present` + `motive_search`, partyB 투입 | S1 → S2 |
| 11-15 | 공감 + 모순 추궁 | `empathy_approach` + 교차 심문 | S2 → S3 |
| 16-20 | 압박 + 자백 | `fact_pursuit` hard + 자백 유도 | S3 → S5 |

**자동 생성 규칙:**
- 사건 JSON에서 `disputes`, `evidence`, `partyA`, `partyB` 읽기
- d-1 ~ d-N 쟁점을 턴에 분배 (주 쟁점 d-1에 가중치)
- 증거 e-1 ~ e-N을 턴 6-10 구간에 배치
- partyA/partyB를 번갈아 심문 (A 위주 60%, B 40%)
- lieState는 턴 구간에 따라 강제 설정 (실제 엔진의 자동 진행과 별개로 시뮬레이션)

### 실행 방법

```bash
# 카테고리별 실행 (API rate limit 고려)
node tests/run-84-headless.cjs --category spouse
node tests/run-84-headless.cjs --category family
node tests/run-84-headless.cjs --category friend
node tests/run-84-headless.cjs --category neighbor
node tests/run-84-headless.cjs --category partnership
node tests/run-84-headless.cjs --category tenant
node tests/run-84-headless.cjs --category workplace

# 전체 실행
node tests/run-84-headless.cjs --all

# 단일 사건 테스트
node tests/run-84-headless.cjs --case spouse-01
```

### Rate Limit 및 에러 처리

- API 호출 간 **3초 딜레이** (gpt-4o rate limit)
- 사건 간 **5초 딜레이**
- 실패 시 해당 사건 스킵 + `tests/transcripts/_errors.json`에 에러 로그
- 429 응답 시 30초 대기 후 재시도 (최대 3회)

### 출력 디렉토리 구조

```
tests/transcripts/
  spouse-01.json
  spouse-02.json
  ...
  workplace-12.json
  _errors.json          # 실패한 사건 목록 + 에러 메시지
  _summary.json         # 실행 결과 요약 (성공/실패 건수, 소요 시간)
```

---

## Part 2: GPT Pro 분석용 트랜스크립트 포맷

### JSON → 텍스트 변환 스크립트

`tests/transcripts/{case-id}.json`을 GPT Pro에 전달할 텍스트 포맷으로 변환한다.

**변환 스크립트:** `tests/format-for-gptpro.cjs` (신규 작성)

```bash
# 카테고리별 변환
node tests/format-for-gptpro.cjs --category spouse
# → tests/gptpro-input/spouse-transcript.md
```

### 출력 포맷

```
## {caseId} 플레이스루 트랜스크립트

### 사건 정보
- 카테고리: {category}
- 당사자 A: {name} ({archetype})
- 당사자 B: {name} ({archetype})
- 쟁점: {disputes 요약}

### 대화 로그
[턴 1] 재판관(fact_pursuit/soft): "한지석 씨, 이 사건의 경위를 말씀해 주십시오."
[턴 1] NPC(한지석/S0/deny): "적지 않은 돈이 움직인 건 맞습니다. 하지만..."
[턴 1] lieState: S0→S0
...
[턴 20] NPC(한지석/S5/confess): "280만원은 오미숙 장모님 추석 연휴 간병..."
[턴 20] lieState: S4→S5

### 턴 요약
- 총 턴: 20
- S5 도달: 턴 16 (partyA), 턴 18 (partyB)
- 증거 제시: e-1(턴5), e-2(턴8), e-3(턴10)
```

카테고리 12건을 하나의 파일로 합쳐서 GPT Pro 세션에 전달한다.

---

## Part 3: GPT Pro 세션 구성 (7개 동시)

### 세션 배치

| 세션 | 카테고리 | 사건 수 | 예상 턴 |
|------|----------|---------|---------|
| GPT-1 | spouse | 12건 | 240턴 |
| GPT-2 | family | 12건 | 240턴 |
| GPT-3 | friend | 12건 | 240턴 |
| GPT-4 | neighbor | 12건 | 240턴 |
| GPT-5 | partnership | 12건 | 240턴 |
| GPT-6 | tenant | 12건 | 240턴 |
| GPT-7 | workplace | 12건 | 240턴 |

합계: 84건 x 20턴 = 1,680턴 분석

### GPT Pro 세션 프롬프트 (복사하여 사용)

```
너는 솔로몬 법정 게임의 품질 분석 전문가다.
아래는 {category} 카테고리 12건의 플레이스루 트랜스크립트야.
각 사건의 대화 로그를 분석해서 다음 항목을 검증해줘.

[검증 A: 화자 시점/호칭]
- 재판관이 "제 아내/남편" 같은 NPC 1인칭 호칭 사용 여부 → CRITICAL
- 당사자가 상대를 올바른 호칭으로 부르는지 (관계에 맞는 호칭)
- 조사 정합성 (이/가, 을/를, 은/는)
- 1인칭 혼동 없음 (화자가 바뀌었는데 시점이 안 바뀌는 경우)

[검증 B: 한국어 품질]
- 번역체 9패턴:
  1. "~하는 것이 사실입니다" → "~한 건 맞습니다"
  2. "~에 대해 말씀드리겠습니다" → "~을 말씀드리겠습니다"
  3. "저는 ~라고 생각합니다" → "~라고 봅니다"
  4. "그것은 ~때문입니다" → "~때문입니다"
  5. "~하는 것은 아닙니다" → "~한 건 아닙니다"
  6. "~할 수 있는 상황이었습니다" → "~할 수 있었습니다"
  7. "~라는 점을 말씀드립니다" → "~입니다" (직접 진술)
  8. "상호 간의 합의" → "서로 합의" (한자어 과다)
  9. "해당 건에 대하여" → "그 건에 대해" (공문서체)
- "사전 상의/협의" 잔존 여부
- 같은 표현 2턴 연속 반복
- 어색한 조사/어미
- "~만을" 이중 조사

[검증 C: Truth Throttle]
- S0-S1에서 구체적 금액/인물명/기관명 노출 → CRITICAL
- S2에서 과도한 정보 공개 (아직 부분 인정 단계)
- S5에서 구체적 진실 포함 여부 (금액+인물+기관+목적 모두 등장해야 함)
- 스테이지 간 정보량 점진적 증가 확인

[검증 D: 캐릭터성/몰입감]
- archetype에 맞는 말투 차별화 (avoidant ≠ confrontational ≠ cold_logic 등)
- 감정 변화 곡선 자연스러움 (S0 부정 → S3 갈등 → S5 고백)
- 이전 발언과 모순되는 내용
- tell 발현 빈도와 자연스러움 (3~4턴에 1회 적절, 매턴 과다)

[검증 E: Hallucination]
- 사건 데이터에 없는 사실 생성 (인물명, 장소, 날짜, 금액)
- 금전 무관 사건에서 금전 표현 등장
- 증거에 없는 내용을 증거에서 봤다고 말하는 경우

[출력 형식]
사건별로:
{caseId}: PASS / FAIL
  CRITICAL: N건 (상세)
  FAIL: N건 (상세)
  WARN: N건 (상세)

마지막에 카테고리 종합:
총 12건 중 PASS: N건 / FAIL: N건
CRITICAL 총계: N건
가장 빈번한 문제 유형 TOP 3
```

---

## Part 4: 실행 순서

```
Step 1: [Thread E] 기존 스크립트 구조 파악
        - tests/full-playthrough-v2.cjs 분석
        - tests/playthrough-runner.cjs 분석
        - tests/scenarios/*.cjs 패턴 파악
        - src/engine/ 에서 직접 호출 가능한 함수 확인

Step 2: [Thread E] 헤드리스 스크립트 작성
        - tests/run-84-headless.cjs 작성
        - tests/format-for-gptpro.cjs 작성
        - 자동 시나리오 생성 로직 포함

Step 3: [Thread E] 카테고리 1개 테스트 실행
        - node tests/run-84-headless.cjs --case spouse-01
        - 결과 확인 후 포맷 변환 테스트
        - 문제 없으면 spouse 12건 실행

Step 4: [Thread E] 84건 전체 실행
        - 카테고리별 순차 실행 (7 카테고리)
        - _summary.json으로 성공/실패 확인
        - _errors.json에 기록된 실패 건 재실행

Step 5: [Thread E] GPT Pro 포맷 변환
        - 7개 카테고리별 트랜스크립트 파일 생성
        - tests/gptpro-input/{category}-transcript.md

Step 6: [유저] GPT Pro 7세션에 카테고리별 전달
        - 각 세션에 프롬프트 + 트랜스크립트 전달

Step 7: [GPT Pro] 품질 분석 보고서 반환
        - 카테고리별 PASS/FAIL 리포트

Step 8: [Thread E 또는 CT] FAIL 항목 수정
        - CRITICAL 먼저, FAIL, WARN 순서
```

---

## Part 5: 스크립트 작성 가이드

### 핵심 아키텍처

`playthrough-runner.cjs`의 구조를 확장한다:

```
run-84-headless.cjs
├── 사건 목록 로드 (src/data/cases/generated/*.json)
├── 카테고리 필터링 (--category / --case / --all)
├── 사건별 루프
│   ├── caseData 로드 (cases/generated/{id}.json)
│   ├── v2Atoms 로드 (claimPolicies/{id}-v2-atoms.json)
│   ├── 시나리오 자동 생성 (disputes/evidence 기반 20턴)
│   ├── 턴별 루프
│   │   ├── atom 선택 (selectAtoms)
│   │   ├── slot 해소 (resolveSlots)
│   │   ├── stance 결정 (getStance)
│   │   ├── 프롬프트 구성 (buildPrompt)
│   │   ├── LLM 호출 (callLLM → gpt-4o)
│   │   ├── 결과 기록 (턴 데이터)
│   │   └── 3초 딜레이
│   ├── JSON 저장 (tests/transcripts/{id}.json)
│   └── 5초 딜레이
└── 요약 출력 (_summary.json)
```

### 엔진 함수 직접 호출 (참고용)

`src/engine/` 내 주요 함수들. CJS 스크립트에서는 직접 import이 어려우므로, `playthrough-runner.cjs`처럼 로직을 복제하여 사용한다:

| 함수 | 파일 | 역할 |
|------|------|------|
| `selectAtoms()` | `atomSelectionEngine.ts` | 쟁점별 atom 선택 |
| `resolveSlots()` | `blueprintPromptBuilderV2.ts` | slot 값 해소 |
| `getStance()` | 로직 내부 | lieState 기반 stance 결정 |
| `buildPrompt()` | `blueprintPromptBuilderV2.ts` | NPC 응답 프롬프트 구성 |
| `callLLM()` | `llmClient.ts` | OpenAI API 호출 |

실제로는 `playthrough-runner.cjs`에 이 로직이 모두 CJS로 구현되어 있으므로, 그것을 require하여 사용하면 된다.

### v2-atoms 파일 경로 규칙

- 대표 7건: `src/data/claimPolicies/{id}-v2-atoms.json`
- 나머지 77건: 같은 경로에 있을 수도 있고, `docs/ref/리뉴얼참고/gpt-batch/{id}/` 아래에 있을 수도 있음
- 스크립트에서 두 경로를 모두 탐색하도록 구현할 것

```javascript
function findAtomsPath(caseId) {
  const primary = path.join(ROOT, `src/data/claimPolicies/${caseId}-v2-atoms.json`)
  if (fs.existsSync(primary)) return primary
  const secondary = path.join(ROOT, `docs/ref/리뉴얼참고/gpt-batch/${caseId}/${caseId}-v2-atoms.json`)
  if (fs.existsSync(secondary)) return secondary
  return null  // atoms 없으면 스킵
}
```

---

## Part 6: 사전 확인 체크리스트

스크립트 작성 전에 반드시 확인:

- [ ] `tests/full-playthrough-v2.cjs` 전체 구조 파악 (300줄 정도)
- [ ] `tests/playthrough-runner.cjs` 모듈 인터페이스 확인
- [ ] `tests/scenarios/*.cjs` 시나리오 패턴 파악 (턴 구성 규칙)
- [ ] `tests/run-playthrough.cjs` 실행기 구조 확인
- [ ] `src/data/cases/generated/` 아래 84건 JSON 존재 확인
- [ ] `src/data/claimPolicies/` 아래 v2-atoms 파일 존재 확인 (7건 또는 그 이상)
- [ ] `docs/ref/리뉴얼참고/gpt-batch/` 아래 77건 v2-atoms 존재 확인
- [ ] `.env` 파일에 `VITE_OPENAI_API_KEY` 설정 확인
- [ ] `tests/transcripts/` 디렉토리 생성 필요
- [ ] `tests/gptpro-input/` 디렉토리 생성 필요

---

## Part 7: 예상 소요 시간 및 비용

### 시간

- 사건당 20턴 x 3초 딜레이 = 약 60초 + LLM 응답 시간
- 사건당 실제 약 2~3분
- 84건 순차 실행: 약 3~4시간
- 카테고리 병렬 실행 시: 약 30~40분

### API 비용 (gpt-4o 기준)

- 턴당 input ~800 tokens, output ~150 tokens
- 84건 x 20턴 = 1,680 호출
- 예상 비용: $5~10 (gpt-4o 가격 기준)

---

## 성공 기준

1. 84건 전체 트랜스크립트 JSON 생성 완료
2. GPT Pro 포맷 변환 완료 (7개 카테고리별 파일)
3. GPT Pro 분석 결과에서 CRITICAL 0건
4. PASS율 80% 이상 (84건 중 67건 이상)
