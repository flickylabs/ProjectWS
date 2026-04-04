# A스레드 → A2스레드 인수인계

## 0. 이 스레드의 역할과 현재 상태

### 역할: V2 시스템 컨트롤타워

이 스레드(A)는 Solomon 게임의 **V2 스크립트 전환 시스템**의 설계, 구현, 검증, 조율을 총괄했다.

**관리한 스레드:**
- **GPT-A 스레드**: 게임 디자인 컨설턴트. 5차에 걸쳐 스키마/엔진/데이터 설계 완료
- **C/D 스레드**: V1 84건 배치 + V2 structure 84건 생성/교정
- **UI 스레드**: Phase 3 심문 화면 리뉴얼 (별도 분리, `thread-handoff-UI.md`)

**완료한 것:**
- V2 엔진 8종 설계 + 구현 + 게임루프 연결
- Phase 6/Result 프롬프트 V2 브릿지
- V2 하이브리드 전환 (structure만으로 V2 메커닉 활성화, beat는 V3로 보류)
- structure-v2 84건 2차 검증 + main 머지
- GPT-A 5차까지 요청/검토 완료
- C스레드 공유 문서 갱신

**현재 막힌 것:**
- LLM NPC 응답 품질이 심각하게 낮음 — 사건카드뿐 아니라 일반 심문도 문제
- 이건 V2 엔진 문제가 아니라 **LLM 프롬프트에 전달되는 사건 맥락 부족** 문제
- 프롬프트 디버깅 + 개선이 즉시 필요

### 프로젝트 전체 구조

```
Solomon = 모바일 법정 심문 게임
├── V1 (완료): 84건 사건 데이터 (ClaimPolicy/Bridge/Evidence/Tell/V3GameLoop)
├── V2 (완료): structure-v2 84건 + 하이브리드 엔진 (LLM + V2 메커닉 제어)
│   ├── 엔진: misconception/층위/linkEdge/reaction/fatigue/interjection
│   └── 대사: LLM 생성 (V2 컨텍스트 주입)
├── V3 (보류): beat 스크립트 점진 적용 (LLM → 스크립트 전환)
└── UI 리뉴얼 (보류): Phase 3 화면 개선 (별도 스레드)
```

### 기술 스택
- React + TypeScript + Zustand + Vite
- LLM: OpenAI API (gpt-4o) 또는 로컬 LM Studio
- 데이터: JSON 기반 사건 데이터 84건
- 테스트: CJS 테스트 147개

## 현재 브랜치: `ui-phase3-overhaul` (main에 머지 전)

---

## 1. 긴급 이슈: LLM NPC 응답 품질 문제

### 증상
- 사건카드 질문 후 NPC 응답이 두루뭉술하고 사건 맥락을 이해하지 못함
- 일반 심문에서도 NPC가 상대방의 행동을 자기가 한 것처럼 답변
- "캡처가 잘렸다"는 구체적 질문에 "상황에 따라 다르게 해석될 수 있다" 같은 의미 없는 답변

### 원인 분석
- `llmDialogueResolver.ts`의 시스템 프롬프트가 **쟁점 이름과 lieState만** 전달하고, **구체적 사실관계(증거 내용, 누가 뭘 했는지)를 충분히 전달하지 않음**
- S0~S1에서는 의도적으로 truthDescription을 숨기는 설계 → NPC가 뭘 부인해야 하는지도 모름
- 사건카드는 증거 기반 구체적 질문인데, LLM이 증거 내용을 모르니 엉뚱한 응답

### 이미 수정한 것 (최근 커밋 안 됨)
1. **사건카드 전용 프롬프트 경로** 추가:
   - `setDossierQuestionOverride()` — 사건카드 질문 텍스트+증거 상세를 LLM에 직접 전달
   - `setSkipNextJudgeQuestion()` — 재판관 질문 중복 방지
   - `llmDialogueResolver.ts`에 사건카드 모드 프롬프트 주입
2. **`handleEvidencePresent` → `question` dispatch** 전환 (증거 unlock 문제 해결)

### 아직 해결 안 된 것
- **일반 심문에서도 NPC 응답 품질이 낮음** — 이건 사건카드만의 문제가 아님
- LLM 프롬프트에 전달되는 **사건 맥락이 근본적으로 부족**
- V2 `_v2Context` 브릿지가 응답 톤(순응/저항/역공)만 지시하고, **사건의 구체적 사실관계를 전달하지 않음**

### 우선 작업
1. **LLM 프롬프트 디버깅**: 실제로 LLM에 전달되는 system/user 프롬프트를 콘솔에 출력하여 확인
2. **프롬프트 개선**: 증거 내용, 당사자별 행동, 쟁점의 구체적 사실관계를 프롬프트에 추가
3. **사건카드 응답 품질 테스트**: spouse-01로 사건카드 3종 테스트

---

## 2. V2 시스템 상태 (완료됨)

- V2 structure-v2 84건 통합 완료 (`2a3734c`)
- V2 하이브리드 전환 완료 (structure만으로 V2 메커닉 활성화)
- `hasStructureV2()` 분리, `_v2Context` LLM 브릿지 구현
- misconception/fatigue/reaction/interjection/linkEdge 엔진 8종 연결 완료
- 147/147 테스트 PASS

---

## 3. 미커밋 변경사항 (현재 워킹 디렉토리)

수정된 파일:
- `src/components/actions/DossierCardPanel.tsx` — 사건카드 dispatch 경로 변경
- `src/components/actions/ActionPanel.tsx` — `onDispatchDossier` + `setSkipNextJudgeQuestion` + `setDossierQuestionOverride`
- `src/hooks/useActionDispatch.ts` — `setDossierQuestionOverride` / `consumeDossierQuestionOverride` 추가
- `src/engine/llmDialogueResolver.ts` — 사건카드 모드 프롬프트 주입 + V2 컨텍스트 브릿지
- `index.html` — `viewport-fit=cover` 추가

---

## 4. 핵심 파일

### LLM 프롬프트 관련 (품질 문제의 핵심)
- `src/engine/llmDialogueResolver.ts` — 전체 프롬프트 빌드 (line 262: buildSystemPrompt, line 163: buildUserPrompt)
- `src/engine/blueprintPromptBuilderV2.ts` — V2용 blueprint 프롬프트
- `src/api/agentManager.ts` — 에이전트별 프롬프트 설정

### 사건카드 관련
- `src/components/actions/DossierCardPanel.tsx` — 사건카드 UI + dispatch
- `src/engine/v3GameLoopLoader.ts` — getDossierCards, resolveDossierQuestion

### V2 엔진 관련
- `src/hooks/useActionDispatch.ts` — V2 파이프라인 전체 (line 638~)
- `src/engine/v2DataLoader.ts` — hasStructureV2, hasV2Data
- `src/store/useGameStore.ts` — _v2Context, phase3PromptBridge

### 참고 문서
- `docs/ref/리뉴얼참고/thread-handoff-A-continued.md` — V2 전체 인수인계
- `docs/ref/리뉴얼참고/thread-handoff-D.md` — D스레드 V2 통합 보고서
- `C:\Users\user\.claude\projects\d--ProjectWS\memory\` — 프로젝트 메모리

---

## 5. 추가 보류 작업

| 작업 | 상태 | 비고 |
|------|------|------|
| UI 리뉴얼 (Phase 3 심문 화면) | 보류 | `thread-handoff-UI.md` 참조, 별도 스레드 |
| V3 beat 스크립트 점진 적용 | 보류 | V2 안정화 후 |
| C스레드 공유 문서 갱신 | 완료 | `thread-sync-V2-requirements.md` |
