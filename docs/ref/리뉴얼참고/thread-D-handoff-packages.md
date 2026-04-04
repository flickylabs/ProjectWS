# D스레드 산출물 — 하위 스레드 인수인계 패키지

> 작성일: 2026-04-04
> 작성자: 컨트롤 타워 (D스레드)
> 브랜치: `ui-phase3-overhaul`

---

## 0. 이번 세션에서 변경된 핵심 설계 원칙

> **"진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."**

이 원칙에 따라 다음 시스템이 신규 구현/변경됐다.

### 변경 1: 증거 2단계 (surface/deep)
- `EvidenceNode`에 `surfaceName`, `surfaceDescription` 추가
- 조사 전: 모호한 표면 정보만 노출 ("은행 이체 내역서")
- 조사 후: 실제 이름/설명 공개 ("공동계좌→최민정 280만원 이체 내역")
- 84건 504개 증거 전수 작성 완료

### 변경 2: 증거 해금 게이팅
- `EvidenceNode`에 `requiredLieState` 추가
- 선행 증거 제시 + 관련 dispute lieState 도달 시 해금
- 기준: free(출발점) / S2(심화,soft) / S3(결정적,hard)
- `checkUnlocks()`에 lieState 파라미터 추가

### 변경 3: 증거 조사 → 심문 연계 (investigationStages)
- `EvidenceNode`에 `investigationStages` 추가
- 조사할수록 더 날카로운 심문 질문이 해금
- stage 0(열람): 기본 확인 / stage 1(1회 조사): 속성 추궁 / stage 2(2회 조사): 결정적 질문
- **spouse-01만 완성** (6증거 × 3단계 = 18질문)

### 변경 4: 카드 → 오토 정답지
- 카드 탭 제거, 3탭 구조 (심문/증거/스킬)
- ❗ 플로팅 뱃지 → 클릭 → 증거 조사 자동 완료 → 최적 질문 자동 실행
- 카드 해금 조건: lieState S2 + (모순 3개 or 턴 8)
- 카드 질문 게이팅: q1(즉시), q2(S2), q3(S3)

### 변경 5: NPC 진실 누출 방지 (Progressive Truth Throttle)
- 프롬프트에 상태별 진실 차단 규칙 삽입
- S0-S1: 기관명/인물직함/서비스명 절대 금지
- S2: "개인 사정"/"가족 일" 수준까지만
- S3: 행위 인정, 구체적 진실 금지
- S4-S5: 전체 진실 허용
- `privateKnowledge` 상태별 게이팅 (S0-S2: 1개, S3: 2개, S4+: 전부)

### 변경 6: 증인 게이팅
- `determineTestimonyDepth()` — lieState 기반 3단계 (vague/partial/full)
- `surfaceKnowledge` — 소환 전 모호한 힌트만 표시
- `relatedDisputeIds` — 증인과 dispute 연결

### 변경 7: 시스템 메시지 중립화
- "일부를 인정하기 시작했다" → "답변에 변화가 감지된다"
- 거짓 전제 메시지 전수 교체

### 변경 8: 프롬프트 3대 수정
- 금액/날짜 누출 방지 (exact → "상당한 금액")
- 해요체 → 합니다체 강제 변환 (13개 규칙)
- blame 시 재판관 향 발화 강제 (상대 직접 반말 차단)

### 변경 9: 영문 → 한글
- archetype: avoidant→회피형, confrontational→정면돌파형 등

---

## 1. 스레드 A — 증거 시스템 데이터

### 미션
7건(spouse-01~workplace-01)의 증거 데이터를 완성한다.

### 이미 완료
- surfaceName/surfaceDescription: 7건 모두 완료
- requiredLieState: spouse-01 정교화 완료, 나머지 6건은 자동 배정(hard→S3, soft→S2)

### 남은 작업
1. **investigationStages** 6건 생성 (family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01)
   - 각 증거별 3단계 × 6증거 = 18질문/건
   - spouse-01을 템플릿으로 참고

2. **requiredLieState 정교화** 6건
   - 사건 맥락에 맞게 해금 순서 조정 (자동 배정은 기계적)

### 입력 파일
- `src/data/cases/generated/{case}.json` — 증거 정의 + investigationResults
- `src/data/cases/generated/spouse-01.json` — 완성 템플릿

### 산출물
- 수정된 6개 JSON 파일 (또는 각 증거의 investigationStages 데이터)

### 품질 기준
- stage 0 질문: 스포일러 제로, 존재 확인 수준
- stage 1 질문: 조사 결과 일부 언급, 결론 안 내림
- stage 2 질문: 조사 결과 정면 제시, 설명 요구
- 재판관 합니다체, 25~60자
- attackVector: context/identity/authenticity/legality 중 선택

---

## 2. 스레드 B — 심문/NPC 시스템

### 미션
NPC 대화 품질을 보장하는 프롬프트 + 가이드를 관리한다.

### 이미 완료
- Progressive Truth Throttle (양쪽 프롬프트 빌더)
- 해요체→합니다체 변환 (llmDialogueResolver)
- blame 재판관 향 강제
- 금액 누출 방지
- archetype 한글화

### 남은 작업
1. **v2-atoms 품질 검증** — 7건의 S0~S5 atoms에 진실이 조기 노출되는 부분이 있는지 확인
2. **재판관 질문 품질** — judgeQuestionEngine이 dispute name을 raw로 사용하는 문제 확인/교정
3. **플레이테스트 기반 프롬프트 튜닝** — 7건 테스트 후 발견되는 이슈 수정

### 입력 파일
- `src/engine/blueprintPromptBuilder.ts` — V1 빌더
- `src/engine/blueprintPromptBuilderV2.ts` — V2 빌더
- `src/engine/llmDialogueResolver.ts` — LLM 호출 + 후처리
- `src/engine/judgeQuestionEngine.ts` — 재판관 질문 생성
- `src/data/claimPolicies/{case}-v2-atoms.json` — 각 사건 atom 데이터

### 산출물
- 프롬프트 수정 코드
- atom 교정 데이터 (필요 시)

---

## 3. 스레드 C — V3 구조 재설계

### 미션
V3 게임 루프의 구조를 이번 변경 사항에 맞게 재설계한다.
**V3의 최종 목표: LLM을 100% 대체하는 스크립트 기반 게임 루프.**

### 핵심 질문
현재 V3 데이터 (DossierCard, StateUnlockAtom, TransitionBeat, EventText)가 새 설계와 어떻게 맞물려야 하는가?

변경된 시스템들:
- 증거 2단계 + 조사 연계 심문 → V3 스크립트에서는 어떻게 표현?
- 카드 오토 정답지 → V3 DossierCard 구조 변경 필요?
- Progressive Truth Throttle → V3 스크립트에서 상태별 대사 분기 강화?
- 증인 게이팅 → V3에서 증인 증언 스크립트 단계화?

### 입력
- 현재 V3 타입: `src/types/renewal.ts`
- 현재 V3 로더: `src/engine/v3GameLoopLoader.ts`
- 현재 V3 데이터 예시: `docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v3-game-loop-data.json`
- 이 문서의 섹션 0 (변경 사항 전체)

### 산출물
- V3 스키마 업데이트 제안서
- 마이그레이션 플랜 (현재 V3 데이터 → 새 V3 구조)
- GPT 배치 생성용 템플릿

---

## 4. 스레드 D — Phase 1/2 스크립트 교정

### 미션
Phase 1(초기 진술)과 Phase 2(반박)의 사전 스크립트에서 스포일러를 제거하고 품질을 교정한다.

### 현재 상태
- 7건 모두 Phase 1/2 JSON 스크립트 보유 (`src/data/dialogues/phase1/*.json`, `phase2/*.json`)
- 스포일러 여부 미검증

### 작업
1. 7건 Phase 1 스크립트 읽기 → 진실 조기 노출 부분 식별
2. 7건 Phase 2 스크립트 읽기 → 동일
3. 스포일러 제거 교정 (진실 → 모호한 표현으로)
4. 존대/어법 통일

### 입력
- `src/data/dialogues/phase1/{case}.json`
- `src/data/dialogues/phase2/{case}.json`
- 수정 가이드 (이 문서 섹션 0)

### 산출물
- 교정된 Phase 1/2 JSON 파일

---

## 5. 파일 위치 요약

```
사건 JSON:           src/data/cases/generated/{case}.json
등록 모듈:           src/data/claimPolicies/{case}.ts
V2 atoms:           src/data/claimPolicies/{case}-v2-atoms.json (spouse-01만 여기)
                    docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v2-atoms.json (나머지)
Structure V2:       src/data/claimPolicies/{case}-structure-v2.json
V3 GameLoop:        docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v3-game-loop-data.json
Phase 1 스크립트:    src/data/dialogues/phase1/{case}.json
Phase 2 스크립트:    src/data/dialogues/phase2/{case}.json
프롬프트 빌더 V1:    src/engine/blueprintPromptBuilder.ts
프롬프트 빌더 V2:    src/engine/blueprintPromptBuilderV2.ts
LLM 리졸버:         src/engine/llmDialogueResolver.ts
증거 엔진:          src/engine/evidenceEngine.ts
V3 로더:           src/engine/v3GameLoopLoader.ts
카드 해금:          src/engine/meterStagingV2.ts
증인 엔진:          src/engine/witnessEngine.ts
```

---

## 6. 컨트롤 타워 역할

각 스레드가 산출물을 전달하면:
1. JSON 유효성 검증
2. 코드 반영 + 빌드 확인
3. 7건 LLM 플레이테스트 (20턴씩)
4. 발견된 문제 → 해당 스레드에 피드백
5. 전부 통과 시 → 템플릿 확정 → 83건 확장 계획
