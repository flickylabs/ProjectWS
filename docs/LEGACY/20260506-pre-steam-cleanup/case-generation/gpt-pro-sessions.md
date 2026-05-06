# GPT Pro 세션 템플릿

> 하나의 케이스를 생성할 때 GPT Pro에 보내는 6개 세션 템플릿.
> 각 세션의 REQUEST.md에 아래 내용을 케이스에 맞게 채워서 전달.

---

## Session 1: 케이스 JSON (F1)

### 보낼 파일
- REQUEST.md (아래 내용)
- (있다면) 기존 사건 시드/초안

### 프롬프트 핵심

```
# 요청: {caseId} 케이스 JSON 생성

## 사건 개요
- 카테고리: {category}
- 관계: {relationship type}
- 제목: {title}
- 갈등 시드: {1~2문장 설명}

## 등장인물
- partyA: {이름}, {나이}, {직업}, archetype={type}
  callTerms: toPartner="", toJudge="", angry=""
- partyB: {이름}, {나이}, {직업}, archetype={type}
  callTerms: toPartner="", toJudge="", angry=""

## 쟁점 구조 (3~5개)
| ID | 이름 | hidden | quadrant | 핵심 |
(표면 → 1차 반전 → 2차 반전 → 최종 구조 설명)

## 해금 체인
d-1(초기) → d-2(조건) → d-3(조건) → ...

## 증거 (5~7개)
| ID | 이름 | 타입 | 입증 쟁점 |

## 반전 구조
1. 표면: ...
2. 1차 반전: ...
3. 2차 반전: ...
4. 최종: ...

## 스키마
(schemas.md § 케이스 JSON 전체 붙여넣기)

## 규칙
- caseId: "case-{caseId}"
- dispute ID: 공개=d-N, 히든=h-dN (또는 d-N + v3Visibility:"hidden")
- evidence ID: e-N
- correctResponsibility 합계 = 100
- 한국어 자연어, 번역체 금지
- unlockCondition 연쇄: 동시 해금 방지 (minState 차이 2단계 이상)
- mediation 파일 caseId 필드: "case-{caseId}" (case-{caseId}-v3-01 ❌)
```

---

## Session 2: Phase 1 대화 (F3)

> Phase 1은 구 Phase 2(선택지 사전진술)를 포함한다. **별도 phase2 파일은 생성하지 않는다.**

### 보낼 파일
- REQUEST.md
- {caseId}.json (S1 산출물)

### 프롬프트 핵심

```
# 요청: {caseId} Phase 1 대화 생성

## 중요: Phase 구조 변경
Phase 2는 Phase 1에 통합되었다.
Phase 1 파일 하나에 초기 진술 + 선택지 사전진술을 모두 포함한다.
dialogues/phase2/ 파일은 생성하지 않는다.

## 입력
첨부된 {caseId}.json 참조

## 산출물
dialogues/phase1/{caseId}.json (phase2 파일 없음)

## 스키마
- caseId: "case-{caseId}" (case- 접두어 필수)
- speaker: system / a / b / choice
- 선택지 3개 (choiceId: c1, c2, c3)
- branchCondition으로 선택 분기

## 호칭 규칙
- 재판관(system) → 당사자: "{이름} 씨"
- 당사자 → 재판관: 합니다체
- 당사자 간: 반말 + callTerms 사용
- 재판관에게 상대 언급: callTerms.toJudge 사용

## 구성 (초기 진술 + 선택지 사전진술 통합)
1. system: 사건 소개 (배경, 인물 소개, 갈등 상황)
2. a: 첫 진술 (자기 입장 주장)
3. b: 첫 진술 (자기 입장 주장)
4. choice: 플레이어 선택지 3개 (구 Phase 2의 선택지 기반 사전진술)
5. 선택에 따른 분기 대화 (branchCondition)
6. system: 심문 전환 안내

전체 ~30개 항목, relatedDisputes는 d-1 중심
```

---

## Session 3: ScriptedText — interrogation (F2 핵심)

### 보낼 파일
- REQUEST.md
- {caseId}.json

### 프롬프트 핵심

```
# 요청: {caseId} ScriptedText interrogation 채널

## 산출물 스키마
키: "{party}|{disputeId}|{lieState}|{questionType}"
- party: a, b
- disputeId: (케이스의 모든 쟁점 ID)
- lieState: S0, S1, S2, S3, S4, S5
- questionType: fact_pursuit, motive_search, empathy_approach

엔트리당 variants 5개:
{ id, text, behaviorHint, tags, sourceRefs }

## Truth Throttle (진실 공개 수준)
| State | 금액 | 인물 | 기관 |
| S0-S1 | "해당 금액" | "그 사람" | "그곳" |
| S2 | "200만원대" | "김 씨" | 약칭 |
| S3+ | 구체적 | 실명 | 정식명칭 |
| S4 | 실수로 노출 | 실수로 노출 | 실수로 노출 |
| S5 | 전부 | 전부 | 전부 |

## stanceHint 매핑
S0: deny / S1: partial / S2: deflect / S3: shift / S4: emotional / S5: confess

## 금지 사항
- 번역체 9패턴 (schemas 참조)
- "특정" 사용 금지 → "어떤 X", "그 X" 사용
- "사전 상의/협의" S0~S2 금지
- 기계적 관찰문 ("~확인됩니다") 금지
- 변형 간 90% 이상 동일 텍스트 금지
```

---

## Session 4: ScriptedText — 나머지 14채널 + 게임 이벤트 스크립트

### 보낼 파일
- REQUEST.md
- {caseId}.json
- S3에서 생성한 interrogation 채널 (참조용)

### 프롬프트 핵심

```
# 요청: {caseId} ScriptedText 나머지 14채널 + 게임 이벤트 스크립트

## 채널 목록 + 키 패턴
(scripted-text-channels.md 내용 붙여넣기)

## 각 채널 산출물 수량
(수량 공식표 붙여넣기)

## 특별 규칙
- mediation: entries가 아닌 paths 구조 사용
- aftermath 5종 필수: a_primary_fault, b_primary_fault, shared_fault,
  protective_resolution, procedural_caution
- judge_question/judge_contradiction: party 필드 없음
- evidence_discovery: stanceHint/truthLevel 없음

## ★ v3 Fallback 교체 필수 항목
아래 항목은 v3FallbackGameLoopData가 쟁점명 직접 삽입 또는 LLM 폴백으로
자동 생성하는 placeholder이다. 사건별 고품질 스크립트로 반드시 교체할 것.

### 게임 이벤트 (별도 JSON — ScriptedText 아님)
게임 이벤트는 ScriptedText가 아닌 별도 JSON (`claimPolicies/{caseId}-game-events.json`)으로 생성한다.
- contradictions 2건, interjections 2건, emotionalOutbursts 2건
- 쟁점명 직접 삽입 ❌
- ScriptedText의 contradiction_pursuit / interjection / emotional_overload 채널은 이벤트 발생 시 NPC 응답을 제공

### evidence_present (42키 기본)
- 키 패턴: `{party}|{evidenceId}|{lieBand}|{subjectRole}`, 각 키 5변형
- subjectRole 폴백(self→other→both)은 caller에서 처리
- 전체 커버리지 필수

### transitionBeats (v3GameLoopData)
- 쟁점별 x lieState별 전이 비트
- 구조: { disputeId, party, fromState, toState, text, behaviorHint }

## DossierCard 질문 ID
(S5에서 생성 예정이므로 임시 dc-1~dc-5 사용, 나중에 매핑)

## 호칭/품질 규칙
(quality-rules.md 내용)
```

---

## Session 5: DossierCards + Structure V2 + Aftermath

### 보낼 파일
- REQUEST.md
- {caseId}.json
- spouse-01-dossier-example.json (형식 참고)
- spouse-01-structure-v2-LEGACY.json (형식 참고)
- spouse-01-aftermath-example.json (텍스트 참고)

### 프롬프트 핵심

```
# 요청: {caseId} DossierCards + Structure V2 + Aftermath

## 1. DossierCards 5장
(schemas.md § DossierCards 스키마 붙여넣기)
- ID: dc-N, 질문 ID: dc-N.{party}.qN
- text: 합니다체

## 2. Structure V2
(schemas.md § Structure V2 스키마 붙여넣기)
- depthLayers 3층: surface / motive / core
- disputeKind 정확 매핑
- linkEdges 쟁점 간 관계

## 3. Aftermath 보충 (S4에서 미포함 시)
- protective_resolution: 승패보다 회복 (200~300자, 2변형)
- procedural_caution: 법적 경고 + 회복 가능성 (200~300자, 2변형)
```

---

## Session 6: 증인 증언

### 보낼 파일
- REQUEST.md
- {caseId}.json (socialGraph 참조)

### 프롬프트 핵심

```
# 요청: {caseId} 증인 증언 데이터

## 증인 목록 (케이스 JSON socialGraph에서)
- w-1: {이름}, {역할}, 관련 쟁점
- w-2: ...
- w-3: ...

## 스키마
(schemas.md § 증인 증언 스키마 붙여넣기)

## 규칙
- 증인당 3~5 슬롯
- depth 1~3 (1=표면, 3=핵심)
- depth 2~3은 conditions로 선행 슬롯 필요
- 재판관 질문: 합니다체
- 증인 답변: 해당 증인 speechStyle 반영
- favorDirection: pro_a / pro_b / mixed
- emergenceTrigger: 히든 쟁점 발현 (선택)
```

---

## Claude 작업 (S1~S6 수령 후)

```
1. 각 산출물 한국어 보정
   - quality-rules.md 체크리스트 기준
   - A/B 리터럴 잔존 확인
   - 호칭 규칙 준수

2. F4 등록 함수 생성
   spouse-01.ts 복사 → caseId 교체
   R1 있으면 v3GameLoopData import 추가

3. F5 Store 등록
   useGameStore.ts import + if 블록

4. F6 Manifest 등록
   manifest.json refined[] 추가

5. R4 SolutionOrientations 추가
   solutions 카테고리별 principle/reconcile/hybrid 매핑

6. 검증
   npx tsc -b --force
   node tests/stage1-deep-audit.cjs
```
