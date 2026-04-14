# Solomon Court (솔로몬 법정) — AI Agent 가이드

> AI 둘의 싸움을 인간의 지혜로 재판하는 리플레이형 추리 게임

---

## 빌드 & 실행

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build (Vercel 배포용)
npx tsc -b --force   # 타입 체크만 (tsconfig.app.json 경유)
```

- Vercel 배포: `vercel.json` 설정 있음
- 빌드 에러 발생 시 `npx tsc -b --force` 먼저 확인
- ⚠️ `npx tsc --noEmit`은 루트 tsconfig이 `"files": []`라 체크 안 됨 — 반드시 `-b` 플래그 사용

---

## 기술 스택

- **React 19** + TypeScript 5.9 + Vite 8 + Tailwind CSS 4
- **Zustand 5** (슬라이스 패턴 — 10개 도메인 슬라이스)
- **OpenAI GPT-4o** (NPC 대사) / GPT-4o-mini (분석)
- Web Audio API (합성음)

---

## 프로젝트 구조

```
src/
├── engine/           58개 룰 엔진 (게임 로직의 핵심)
├── store/            Zustand 10슬라이스 (상태 관리)
├── hooks/            useActionDispatch (97KB, 액션 디스패치 메인)
├── components/       16개 UI 모듈
├── data/             84건 사건 데이터 + 대사 + 솔루션 태그
├── types/            TypeScript 타입 (GDD v2.0 기반)
└── utils/            상수 및 유틸

docs/case-generation/  ★ 신규 스테이지 생성 가이드 (스키마/절차/GPT Pro 템플릿)
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
| `judgeProfileEngine.ts` | 재판관 성향 프로필 (caseAxis 계산, 하위 호환 드리프트 로직) |
| `judgeProgressionEngine.ts` | 재판관 성향 v2 (9종 조각, 6성향 강화, 변환 3:1, 칭호 9종) |
| `judgePerks.ts` | 재판관 퍼크 v2 (메이저 6종 + 마이너 9종, 성향 레벨별 해금) |
| `questionEffectEngine.ts` | 심문 3종 효과 판정 (computeEffectiveness) + 교착 피드백 |
| `questionFatigueEngine.ts` | 심문 피로도 (streak/교착 3단계 + dossier 리셋) |
| `stateTransitionHelper.ts` | 상태 전이 라벨 (S4='opening' 분리 + 행동 추천) |
| `gameEventTriggerEngine.ts` | 이벤트 트리거 (모순 지연실행 + 감정 폭발 선택 강화) |

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

### 솔루션 태그 (재판관 성향 축 연동)
```
src/data/solutionOrientations.ts  (963개 태그: principle/reconcile/hybrid)
```

### 재판관 성향 저장
```
localStorage 'solomon-judge-progression'  (v3: 조각 인벤토리 + 6성향 레벨 + 장착 퍼크)
localStorage 'solomon-history'            (caseTelemetry 포함, max 100건)
```

---

## 재판관 성향 시스템 (v2 — 재료 기반 강화)

### 9종 조각 (3축 × 3방향)
| 축 | 음(-) | 중립 | 양(+) |
|---|---|---|---|
| 탐구 | 추론의 조각 | 탐구의 조각 | 공감의 조각 |
| 심판 | 준엄의 조각 | 심리의 조각 | 이해의 조각 |
| 해결 | 법리의 조각 | 균형의 조각 | 봉합의 조각 |

### 획득 (사건 결과 기반)
- |caseAxis| ≥ 45 → 해당 방향 3개
- |caseAxis| 15~44 → 해당 방향 2개 + 중립 1개
- |caseAxis| < 15 → 중립 2개
- 보너스 조건: 양측 S3+, 100% 달성, 첫 플레이, 전체 조합, 전체 증인

### 강화 비용 (방향 + 중립 필수)
- Lv0→1: 방향 ×3 + 중립 ×5 → Minor 퍼크 개방
- Lv1→2: 방향 ×6 + 중립 ×10
- Lv2→3: 방향 ×10 + 중립 ×16 → Major 퍼크 해금

### 변환: 같은 축 중립 3개 → 방향 1개

### 퍼크 (15종)
- Major 6종 (Lv3, 상시 효과): 논리의 눈/직감의 촉/냉정한 관찰/두 번째 기회/철저한 수사관/마음의 다리
- Minor 9종 (Lv1): 모순 감각/비교 확장/누설 감지/집요한 추궁/선례 감각/신뢰의 기반/법의 눈/자동 정리/경청의 힘
- 장착: Major 1 + Minor 1

### 칭호 9종 (3축 최고 레벨 조합)
- 냉철한 심판자/실용적 분석가/균형의 현자/신중한 중재자/직감의 심판관/열정의 조정관/온화한 수호자/따뜻한 중재자/중립의 관찰자

### 성장 5단계
- apprentice(1~4건) → regular(5건+Lv1) → veteran(10건) → senior(20건) → legendary(30건)

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

### 재판관 질문/시스템 메시지 품질 규칙
- **기계적 관찰문 금지**: "태도에 변화가 감지됩니다", "내용이 확인됩니다", "흐름이 나타납니다" 등
- **긴 발언 직접 인용 금지**: NPC 발언을 따옴표로 그대로 넣지 않음 → **간접 인용으로 요약** ("아까는 ~쪽으로 말씀하셨는데")
- **시스템 관찰 + 직접 인용 결합 금지**: `'${prev}'라고 하셨는데, '${curr}'라는 내용이 확인됩니다` 패턴 절대 사용 안 함
- 올바른 패턴: "아까는 ~쪽으로 말씀하셨는데, 지금은 ~. 왜 달라졌습니까?"
- 톤 단계: soft(정리 요청) / mid(추궁) / hard(단호)
- 시스템 메시지도 동일: "진술 태도에 변화가 감지된다" → "진술이 달라지기 시작한다"

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

## ★ 신규 스테이지 생성 가이드

**`docs/case-generation/`** 폴더에 5개 문서로 체계화:

| 문서 | 내용 |
|------|------|
| `README.md` | 전체 절차 (Phase A~E), 산출물 일람, 완료 체크리스트 |
| `schemas.md` | 케이스JSON/ScriptedText/Phase1/증인/DossierCards/StructureV2 필드 스키마 |
| `scripted-text-channels.md` | 15채널 키 패턴, 수량 공식, 엔트리 구조 |
| `gpt-pro-sessions.md` | GPT Pro 6세션 프롬프트 템플릿 |
| `quality-rules.md` | 번역체 금지, 호칭, TruthThrottle, 검증 체크리스트 |

**새 사건 추가 시 반드시 이 가이드를 따를 것.** 등록 아키텍처는 v3 fallback 패턴 (spouse-01 기준).

---

## 주의사항

- **"진실은 플레이어가 직접 밝혀낸다"** — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 됨
- LLM 대사 수정 시 반드시 `fixPostpositions()` 후처리 파이프라인 확인
- v2-atoms 수정 시 S3+ atoms는 절대 건드리지 마 (구체적 값 보존 필수)
- 에이전트로 대량 코드 생성 금지 — GPT Pro 경유 필수 (메모리: feedback_use_gpt_pro.md)
