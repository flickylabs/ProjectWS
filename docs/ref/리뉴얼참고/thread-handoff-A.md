# 스레드 A: GPT 논의 결과 기반 엔진/구조 수정

## 현재 상황

### 프로젝트
Solomon — LLM 기반 법정 심문 게임. 재판관(플레이어)이 양측 당사자(AI NPC)를 심문하여 진실을 밝히는 게임.

### V3 리뉴얼 완료 상태 (2026-04-02)
대대적 리뉴얼이 엔진/데이터 수준에서 완료되었다.

**완성된 엔진 8종:**
- BlueprintEngine (stance/defenseMode 결정)
- AtomSelectionEngine (V2 atom 선택 + V3 unlock atom 병합)
- QuestionEffectEngine (모순토큰/누설미터/신뢰창구 3종 미터)
- GameEventTriggerEngine (모순/끼어들기/감정폭발/새쟁점 4종 이벤트)
- V3GameLoopLoader (DossierCard/UnlockAtom/EventText/TransitionBeat/BeatScript)
- ReadinessEngine (성과 기반 판결 조건)
- EvidenceChallengeEngine (attackVector 봉쇄)
- BridgeEngine (Phase 1→3 상태 연결)

**완성된 UI:**
- StateTransitionFeedback (균열/궁지/개방/시인 토스트 + 미터 HUD)
- GameEventModal (이벤트 발생 시 플레이어 선택지 모달)
- DossierCardPanel (사건카드 UI)
- EvidenceResultToast (버팀/균열/붕괴)
- ForcedVerdictBanner (16턴 초과 경고)
- DisputeBoard (쟁점 현황판 + 질문 라우팅)

**완성된 연결:**
- handleQuestion/handleEvidencePresent → V3 미터 + 이벤트 자동 호출
- llmDialogueResolver → TransitionBeat 강제 삽입 + BeatScript fallback
- DisputeBoard → ActionPanel 자동 라우팅
- 증거 제시 → DossierCard 맞춤 질문

**완성된 데이터 (2사건):**
- spouse-01: V2 atom 155개, Tell 6개, Beat 36개, V3 전체 (DossierCard 3장 + UnlockAtom 42개 + 이벤트 18개 + TransitionBeat 24개)
- family-01: V2 atom 148개, Tell 6개, Beat 36개, V3 전체 (동일 규모)

**나머지 82개 사건:** 레거시 경로 (V2 미적용). 배치 요청서 폴더 생성 완료 (`docs/ref/리뉴얼참고/gpt-batch/`).

**테스트:** 114/114 PASS, tsc 0 에러, Vite 빌드 성공.

### 최근 수정 사항 (Vercel 배포 + 플레이테스트)
- Vercel strict 타입 에러 해소 (QuestionType/EmotionTier 중복 export, 순환 추론)
- React #185 무한 리렌더 수정 (QuestionMeterHUD selector)
- Phase 2 d.text undefined 에러 방어
- emitStateTransitionEvent를 엔진으로 분리 (React 의존 제거)
- 심문 시 상대방 담당 쟁점 목록에서 완전 제거
- 직접 입력(자유 질문) 비활성화 (Blueprint 우회 방지)
- 증거 제시 질문을 DossierCard 맞춤형으로 고도화
- 사건카드 턴 4 이후 해금

### GPT와 진행 중인 논의
`docs/ref/리뉴얼참고/discussion-v3-script-transition.md`에서 GPT와 다음 주제를 논의 중:

**A. LLM → 스크립트 전환**
- Phase 3 심문 응답을 BeatScript ×5 변형으로 교체
- AI는 Phase 6(조정) + 후일담에서만 사용
- 자유 심문은 S3+ & 턴 6+에서만 AI 허용

**B. 게임 패턴화 방지**
- B-1: NPC 확률적 반응 (순응/저항/역공)
- B-2: 질문 피로도
- B-3: 상대방 간섭 강화
- B-4: 감정 변동성
- B-5: 증거 타이밍 보너스
- B-6: 자유 심문 (S3+ 해금)

**C. 사건 구조의 깊이와 복잡성**
- C-1: 쟁점 층위 구조 (표면→중간→핵심→관계)
- C-2: 가짜 쟁점 (Red Herring)
- C-3: 쟁점 간 연결/의존 관계
- C-4: 사건 규모 확대

---

## 이 스레드에서 할 일

GPT 논의 결과가 확정되면:

1. **BeatScript 구조 확장** — ×5 변형, 질문 유형별 분기, 조건부 대사 등
2. **스크립트 선택 엔진** — 랜덤 + 중복 방지 + 질문 유형 매칭
3. **LLM 의존 제거** — Phase 3 interrogation 경로를 스크립트 우선으로 전환
4. **자유 심문 해금** — S3+ & 턴 6+ 조건부 AI 허용
5. **패턴화 방지 엔진** — GPT 논의 결과에 따라 B-1~B-6 중 채택된 것 구현
6. **사건 구조 변경** — C-1~C-4 중 채택된 것 반영 (데이터 스키마 변경 가능)
7. **GPT 배치 요청서 업데이트** — 새 구조 반영

### 참고 파일 위치
```
논의 문서: docs/ref/리뉴얼참고/discussion-v3-script-transition.md
diagnosis: docs/diagnosis/ (V3 업데이트 완료)
배치 폴더: docs/ref/리뉴얼참고/gpt-batch/ (82개 사건 요청서)
엔진: src/engine/
스토어: src/store/useGameStore.ts
테스트: tests/v3-engine-test.cjs, tests/v3-integration-test.ts, tests/v3-round2-validation.cjs
```
