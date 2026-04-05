# Solomon Court (솔로몬 법정) — AI Agent 가이드

> AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임

---

## 빌드 & 실행

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build (Vercel 배포용)
npx tsc --noEmit     # 타입 체크만
```

- Vercel 배포: `vercel.json` 설정 있음
- 빌드 에러 발생 시 `npx tsc --noEmit` 먼저 확인

---

## 기술 스택

- **React 19** + TypeScript 5.9 + Vite 8 + Tailwind CSS 4
- **Zustand 5** (슬라이스 패턴 — 8개 도메인 슬라이스)
- **OpenAI GPT-4o** (NPC 대사) / GPT-4o-mini (분석)
- Web Audio API (합성음)

---

## 프로젝트 구조

```
src/
├── engine/           46개 룰 엔진 (게임 로직의 핵심)
├── store/            Zustand 8슬라이스 (상태 관리)
├── hooks/            useActionDispatch (97KB, 액션 디스패치 메인)
├── components/       16개 UI 모듈
├── data/             84건 사건 데이터 + 대사
├── types/            TypeScript 타입 (GDD v2.0 기반)
└── utils/            상수 및 유틸

docs/ref/리뉴얼참고/   설계 문서, GPT 배치 결과, 스레드 패키지
tests/                 헤드리스 플레이스루 + 검증 스크립트
public/emoji/          MS Fluent Emoji PNG 에셋
```

---

## 게임 구조: 8단계 재판 루프

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

**핵심 Phase**: 3~5가 게임의 본체. 플레이어의 질문 선택 → 재판관 질문 생성 → NPC 응답(LLM) → 상태 전이.

---

## 핵심 메커니즘

### 1. 거짓말 상태 기계 (LieState: S0→S5)

```
S0: 완전 부정 → S1: 일부 인정 → S2: 핑계 → S3: 책임 전가 → S4: 감정적 → S5: 자백
```

- 질문/증거/모순 추궁에 의해 전이
- 각 state에서 공개 가능한 정보 수준이 다름 (Truth Throttle)

### 2. Truth Throttle (진실 공개 곡선)

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S0-S1 | "해당 금액" | "그 사람" | "그곳" | 허용 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 |
| S3+ | 구체적 허용 | 실명 | 정식명칭 | 전부 |
| S5 | 전부 공개 | 전부 | 전부 | 전부 |

### 3. NPC 대사 생성 파이프라인

```
1. 룰 엔진: ResponseBlueprint 생성 (stance + defenseMode + 허용 claim)
2. Atom 선택: v2-atoms에서 현재 state에 맞는 발화 재료 선별
3. 프롬프트 조립: blueprintPromptBuilderV2.ts
   - ARCHETYPE_GUIDE (6종), TELL_HINTS (6종), ANSWER_FOCUS (4종)
   - 번역체 금지, 호칭 규칙, Truth Throttle
4. LLM 호출: gpt-4o (temperature 1.0, maxTokens 400)
5. 후처리: enforceHonorifics + fixPostpositions + fixMisdirectedAddress
```

### 4. 심문 3종 하위 액션

| 액션 | 효과 | 재판관 톤 |
|------|------|----------|
| fact_pursuit | 사실 추궁, 모순 토큰↑ | 단호, 논리적 |
| motive_search | 동기 탐색, 누설 미터↑ | 설명 요구 |
| empathy_approach | 공감, 신뢰 창구↑ | 감정 이끌기 |

### 5. 증거 시스템

- 8종 타입: bank, chat, cctv, contract, testimony, log, device, sns
- investigationStages: 3단계 질문 (stage 0→1→2, 점진적 핵심 접근)
- DossierCard: 결정적 질문 (자동 해금 → 무료 사용)

### 6. 캐릭터 시스템

- **Archetype 6종**: avoidant, confrontational, victim_cosplay, cold_logic, affect_flattening, premature_summary
- **Verbal Tell 6종**: over_precision, counter_question, timeline_padding, evidence_waving, motive_jump, selective_quote
- **CallTerms**: toPartner(직접 호칭), toJudge(재판관에게 상대 언급), angry(격앙 시)

---

## 핵심 엔진 파일

| 파일 | 역할 |
|------|------|
| `blueprintPromptBuilderV2.ts` | LLM 시스템 프롬프트 조립 (ARCHETYPE, TELL, FOCUS, few-shot) |
| `atomSelectionEngine.ts` | v2-atoms에서 현재 state 맞는 발화 재료 선별 |
| `llmDialogueResolver.ts` | LLM 호출 + 후처리 (enforceHonorifics, fixPostpositions) |
| `judgeQuestionEngine.ts` | 재판관 질문 84종 생성 (4타입 × 4depth × soft/hard) |
| `lieStateMachine.ts` | S0→S5 전이 규칙, 트리거 판정 |
| `emotionEngine.ts` | 감정 페이즈 (defensive→confident→shaken→angry→resigned) |
| `evidenceEngine.ts` | 증거 해금, 조합 업그레이드, 조사 질문 |
| `witnessEngine.ts` | 증인 증언 (vague/partial/full depth, 기관 증인 예외) |
| `koreanPostposition.ts` | 한국어 조사 헬퍼 (이/가, 을/를, 은/는, 과/와) + 후처리 |
| `meterStagingV2.ts` | DossierCard 해금 조건 판정 |
| `verdictEngine.ts` | 최종 점수 계산 (통찰/권위/지혜) |

---

## 데이터 구조

### 사건 데이터 (84건)
```
src/data/cases/generated/{category}-{01~12}.json
  카테고리: spouse, family, friend, neighbor, partnership, tenant, workplace
```

### v2-atoms (NPC 발화 재료)
```
docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v2-atoms.json
  구조: claimPolicies.{a|b}.{disputeId}.{S0~S5}.claimAtoms[]
```

### Phase 1/2 스크립트 (초기 진술/반박)
```
src/data/dialogues/phase1/{case}.json  (84건)
src/data/dialogues/phase2/{case}.json  (84건)
```

### Structure V2 (쟁점 구조)
```
src/data/claimPolicies/{case}-structure-v2.json  (84건)
```

---

## 한국어 품질 규칙

### 절대 금지
- 번역체 9패턴: "~된 것으로 생각됩니다", "~인 측면이 있었습니다", "부득이하게" 등
- "사전 상의/협의" (S0-S2에서)
- "미리 말씀드리지 못한"
- "특정 X" 패턴
- "~만을" → "~만"

### 호칭 규칙
- 재판관 → 당사자: "OOO 씨" (절대 "제 아내/남편" 사용 금지)
- 당사자 → 재판관에게 상대 언급: callTerms.toJudge ("제 아내가~")
- 당사자 → 상대에게 직접: callTerms.toPartner ("자기야~")
- 조사 자동 교정: `koreanPostposition.ts`의 `fixPostpositions()`

### 톤 규칙
- 재판관 대상: 합니다체 필수
- 당사자 간: 반말 유지
- emotional/confession beat만 해요체 예외

---

## 테스트

```bash
# Stage-1 데이터 자동 검증 (30+항목)
node tests/stage1-deep-audit.cjs

# 84건 헤드리스 플레이스루
node tests/run-84-headless.cjs --category spouse
node tests/run-84-headless.cjs --all

# v2-atoms S0-S1 neutral화 검증
node tests/v2-atoms-audit.cjs
```

---

## 스레드 구조 (멀티 에이전트)

| 스레드 | 역할 |
|--------|------|
| **CT (컨트롤 타워)** | 전체 조율, 품질 관리 |
| **Thread A** | 증거 데이터 (investigationStages) |
| **Thread B** | NPC 품질 + GPT Pro (evidence/DossierCard 교정) |
| **Thread C** | V3 스크립트 (보류 중) |
| **Thread D** | Phase 1/2 스크립트 교정 |
| **Thread E** | 통합 테스트 (헤드리스 플레이스루 + GPT Pro 분석) |

---

## 주의사항

- **"진실은 플레이어가 직접 밝혀낸다"** — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 됨
- LLM 대사 수정 시 반드시 `fixPostpositions()` 후처리 파이프라인 확인
- v2-atoms 수정 시 S3+ atoms는 절대 건드리지 마 (구체적 값 보존 필수)
- 에이전트로 대량 코드 생성 금지 — GPT Pro 경유 필수 (메모리: feedback_use_gpt_pro.md)
