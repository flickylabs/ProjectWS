# 마스터 의뢰서: Spouse-01 튜토리얼 시스템

작성일: 2026-05-18
선행 자료:
- `docs/design/game-improvement-2026-05-18.md` (Codex 게임 개선 제안 §2)
- ClaudeCode 메인 세션 정합성 점검 결과 (이 문서 §0)

---

## §0. 정합성 점검 요약

| 항목 | 결과 |
|---|---|
| PCCourtLayout / PCBottomDock / PCLeftPanel / PCDisputeRibbon / EventFeedbackCard / PCCaseBrief | 모두 존재. 부착 가능 |
| JudgeNotebook | **존재하지 않음**. `JudgeNotebookSection`만 존재 → Codex 원안 Step 9 target 수정 필요 |
| spouse-01 인물 구도 | A=지석(남편, 비밀 송금자) / B=세린(아내, 의심 제기자) |
| 첫 핵심 쟁점 d-1 | "지석의 비밀 송금 280만원" |
| 첫 핵심 증거 e-2 | "재가돌봄센터 추석 연휴 간병 예약서" |
| 사건 반전 구도 | **외도 의심 → 간병 선의 (해석 전환)**. 튜토리얼 카피가 이 구도를 살려야 함 |
| 완료 조건 감지 | 모든 단계 store state mutation으로 감지 가능 (`phaseSlice.advancePhase`, `setLastFocusedDisputeId`, `useActionDispatch.resolveInterrogation`, `lieStateMap` 등) |
| Store 패턴 | Zustand plain + StateCreator. `tutorialSlice` 추가는 같은 패턴 |
| DOM 속성 | 기존 `data-guide-target` 패턴 활용 가능. 추가 `data-tutorial-target` 충돌 없음 |

## §1. 목표

신규 유저가 spouse-01 첫 플레이에서 다음 인지 사슬을 **직접 행위로 학습**하게 한다.

```
쟁점 인식 → 대상 선택 → 질문 타입 선택 → 증거 조사 → 증거 제시 → 상태 변화 확인 → 기록 인지
```

성공 지표:
- 튜토리얼 완료율 (telemetry)
- 첫 플레이 spouse-01 완주율 상승
- 사용자 피드백 "뭘 해야 할지 모르겠다" 감소

비-목표 (이번 의뢰 범위 밖):
- family-01 / friend-01 튜토리얼 (1차 데이터 측정 후 결정)
- 고급 메커니즘 튜토리얼 (조합 / 미니게임 / 후일담)

## §2. 작업 분담 — 3개 트랙

| 트랙 | 자원 | 산출물 | 의존성 |
|---|---|---|---|
| **A. 코드 구현** | Codex (별도 스레드) | tutorialSlice / PCTutorialOverlay / CSS / data-target 부착 / store mutation event emit | §3 참조 |
| **B. 한국어 카피** | ClaudeCode (다른 스레드) | 10단계 한국어 안내 텍스트 + 어조 가이드 | 메모리 접근 필요 (해요체 정책 / 진실 누설 금지) |
| **C. 다국어 카피** | GPT Pro 5.5 Web | en/ja/zh-CN 번역 | B 완료 후 본 번역 배치 합류 (batch_01_spouse-01_part1.csv 추가 행) |

병렬 가능: **A와 B는 완전 독립**. C는 B의 한국어가 fix된 다음 진행.

권장 순서:
1. A·B 병렬 시작
2. B 완료 시 → C로 보내기 (튜토리얼 카피는 본 번역 batch_01에 prepend)
3. A 완료 + C 완료 → ClaudeCode 메인이 한국어 1차 통합 테스트
4. 다국어 적용 후 4언어 통합 QA

---

# §3. Track A — 코드 구현 (Codex 의뢰)

> 이 섹션을 그대로 Codex 별도 스레드에 의뢰서로 던질 수 있다.

## A.1. 작업 범위

spouse-01 전용 튜토리얼 시스템을 신규 구축한다. 기존 `src/components/layout/Tutorial.tsx`는 정적 Phase 안내용으로 유지하고, **PCTutorialOverlay를 별도로 신규 생성**한다.

## A.2. 산출물

### A.2.1. 새 파일

#### `src/store/slices/tutorialSlice.ts`
```ts
type TutorialStepId =
  | 'briefing-advance'
  | 'initial-statement-acknowledge'
  | 'dispute-focus-d1'
  | 'target-select-b'
  | 'question-fact'
  | 'evidence-investigate-e2'
  | 'evidence-present-e2-to-b'
  | 'feedback-acknowledge'
  | 'observation-hint'  // 보완안: hint 깜빡임 (선택적)
  | 'tutorial-complete'

type TutorialState = {
  enabled: boolean
  activeCase: string | null
  currentStepId: TutorialStepId | null
  completedSteps: TutorialStepId[]
  isOverlayVisible: boolean
}

// actions
startTutorial(caseId: 'spouse-01'): void
advanceStep(stepId: TutorialStepId): void  // 외부 mutation에서 호출
skipTutorial(): void
restartTutorial(): void  // 설정에서 재실행
markStepComplete(stepId: TutorialStepId): void
```

저장 키: `localStorage["solomon.tutorial.spouse01.v1"]`
- 값: `{ skipped: boolean, completedAt: ISO8601 | null }`
- 재플레이 시 설정에서 켜기 가능

#### `src/components/pc/tutorial/PCTutorialOverlay.tsx`
- 최상위 Portal (z-index: 9990 — CutsceneOverlay와 동일 계층)
- 현재 step의 target selector → BoundingRect 계산 → SVG mask로 그 영역만 뚫고 나머지는 `rgba(0,0,0,0.65)` 어둡게
- target 외곽에 glow ring (CSS keyframe pulse, 골드 톤 `#d4af37` 또는 기존 pc.css 토큰 활용)
- 손가락 포인터 SVG (lucide `MousePointer2` 또는 `Hand` 변형) — target 근처 배치, bounce keyframe
- 안내 메시지 카드 (target 위 또는 아래, 화면 가장자리 안 들어가게 자동 위치 조정)
- 우상단 "Skip tutorial" 버튼 (모든 step에서 노출)
- target 영역 외부 클릭 시 클릭 이벤트 차단 (`pointer-events: auto` overlay, target 영역만 `pointer-events: none`으로 뚫기)

#### `src/components/pc/tutorial/tutorialSteps.ts`
각 step의 정의:
```ts
type TutorialStep = {
  id: TutorialStepId
  targetSelector: string  // CSS selector
  fingerPlacement: 'top' | 'right' | 'bottom' | 'left' | 'auto'
  messageKey: string  // i18n key (예: 'pc.tutorial.spouse01.briefing-advance')
  completionCondition: {
    type: 'state-mutation' | 'click-with-state-check'
    storeSelector?: (state: GameState) => boolean
    actionType?: string
  }
}
```

10단계 정의 (target / 완료 조건은 §A.3 참조).

#### `src/app/pc.css` 또는 별도 `pc-tutorial.css`
- `.tutorial-overlay-backdrop`
- `.tutorial-spotlight-ring` (keyframe pulse)
- `.tutorial-hand-pointer` (keyframe bounce)
- `.tutorial-message-card` (글래스모피즘 / 기존 PC 톤 일치)
- `.tutorial-skip-button`

### A.2.2. 수정 파일

#### `src/components/pc/layout/PCCourtLayout.tsx`
- PCTutorialOverlay를 최상단에 마운트 (Portal이지만 부모 layout에 활성화 hook)

#### `src/components/pc/hotbar/PCBottomDock.tsx`
- 각 슬롯/버튼에 `data-tutorial-target` 부착:
  - 캐릭터 B 슬롯: `data-tutorial-target="character-slot-b"`
  - 질문 타입 "사실 추궁": `data-tutorial-target="question-type-fact"`
  - 증거 제시 버튼: `data-tutorial-target="evidence-present-button"`

#### `src/components/pc/panels/PCLeftPanel.tsx`
- 증거 e-2 카드: `data-tutorial-target="evidence-e2-card"`

#### `src/components/pc/layout/PCDisputeRibbon.tsx`
- 쟁점 d-1 칩: `data-tutorial-target="dispute-d1-chip"`

#### `src/components/pc/feedback/EventFeedbackCard.tsx`
- root 컨테이너: `data-tutorial-target="feedback-card"`

#### `src/components/pc/home/PCCaseBrief.tsx`
- "재판 시작" 진행 버튼: `data-tutorial-target="briefing-advance-button"`

#### `src/hooks/useActionDispatch.ts` (또는 해당 mutation 발생 지점)
- 다음 mutation 직후 `tutorialSlice.markStepComplete()` 호출:
  - `resolveInterrogation` 완료 → `'question-fact'` 검사
  - `presentEvidence(e-2, target=b)` 완료 → `'evidence-present-e2-to-b'`
  - `transitionLie` 첫 변화 → `'feedback-acknowledge'` 다음 step 활성화
- 단, **튜토리얼 활성 상태일 때만 emit** (성능 영향 없게)

#### `src/store/useGameStore.ts`
- tutorialSlice를 store에 통합 (다른 slice와 동일 패턴)

#### `src/i18n/messages/` 신규 namespace
- `pc.tutorial.spouse01.*` 키 추가 (값은 Track B 한국어 카피 적용 후 채움 — placeholder만 먼저)

## A.3. 10단계 정의

| Step | id | targetSelector | 완료 조건 |
|---|---|---|---|
| 1 | `briefing-advance` | `[data-tutorial-target="briefing-advance-button"]` | `phaseSlice.currentPhase === Phase.Pretrial` |
| 2 | `initial-statement-acknowledge` | dialogue log 마지막 entry | `dialogueSlice.entries.length >= N` (N = spouse-01 Phase 1 초기 진술 endpoint, 정합성 점검 시 확인) |
| 3 | `dispute-focus-d1` | `[data-tutorial-target="dispute-d1-chip"]` | `lastFocusedDisputeId === 'd-1'` |
| 4 | `target-select-b` | `[data-tutorial-target="character-slot-b"]` | `interrogationSelection.target === 'b'` |
| 5 | `question-fact` | `[data-tutorial-target="question-type-fact"]` | `resolveInterrogation` 1회 실행 + 결과 도착 (`agentSlice` lie state 또는 dialogue 추가) |
| 6 | `evidence-investigate-e2` | `[data-tutorial-target="evidence-e2-card"]` | e-2 viewer open state (`evidenceSlice.openEvidenceId === 'e-2'` 또는 ui state) |
| 7 | `evidence-present-e2-to-b` | `[data-tutorial-target="evidence-present-button"]` | `presentEvidence('e-2', 'b')` 완료 |
| 8 | `feedback-acknowledge` | `[data-tutorial-target="feedback-card"]` | EventFeedback card dismiss 또는 다음 action emit |
| 9 | `observation-hint` (보완안) | `[data-tutorial-target="judge-notebook-section"]` (JudgeNotebookSection에 부착) | **단순 hint 깜빡임 0.8초 × 2회 + 자동 다음 step**. 클릭 강제 아님. |
| 10 | `tutorial-complete` | — | localStorage 저장 + overlay 페이드아웃 |

## A.4. 검증 요구사항

- 진입 조건: working tree clean
- 작업 후 `npm run check:all` 통과
- `npm run dev:pc` 띄우고 spouse-01 진입 → 10단계 흐름 직접 실행
- localStorage 클리어 후 재진입 → 다시 처음부터 동작
- "Skip tutorial" 클릭 → 영구 저장 → 다음 진입에 안 뜸
- 설정에서 재실행 → 다시 활성화 확인

산출 commit은 사용자가 직접. Codex는 staged 상태로 둠.

## A.5. 카피 placeholder

Track B 완료 전까지는 메시지 key만 정의하고 fallback으로 한국어 임시 텍스트 ("[TUTORIAL_COPY_PENDING_briefing-advance]" 등) 표시. Track B 카피 도착 후 ClaudeCode 메인이 i18n 키에 매핑.

---

# §4. Track B — 한국어 카피 작성 (ClaudeCode 다른 스레드 의뢰)

> 이 섹션을 그대로 ClaudeCode 다른 스레드에 의뢰서로 던질 수 있다.

## B.1. 작업 범위

spouse-01 튜토리얼 10단계의 한국어 안내 카피를 작성한다. 이 게임은 4개 언어 지원이지만 1차 한국어만 fix하고, 다국어는 본 번역 파이프라인(GPT Pro)에 합류시킨다.

## B.2. 컨텍스트 (필수 읽기)

작업 시작 전 다음 메모리 항목을 반드시 reflect:
- [해요체 정책](memory/haeyo_policy_decision.md) — emotional/confession만 해요체 예외, 그 외는 평어 또는 단정형
- [진실 누설 금지](memory/feedback_truth_leak_prohibition.md) — 튜토리얼은 시스템 메시지 채널이므로 NPC 자백 전 진실 콘텐츠 직접 언급 절대 금지
- [재판관 질문 품질](memory/feedback_judge_question_quality.md) — 기계적 관찰문 금지, 자연어
- spouse-01 사건 구도 (이 문서 §0): A=지석 비밀 송금자 / B=세린 의심 제기자 / d-1=비밀 송금 / e-2=간병 예약서 / 사건 반전=외도 의심 → 간병 선의

## B.3. 어조 / 작성 원칙

| 차원 | 가이드 |
|---|---|
| **인칭** | 플레이어는 재판관 → "당신" 사용 가능. 다만 너무 친근하지 않게 |
| **어미** | 평어 (시스템 안내 톤). 해요체는 emotional 채널 전용이므로 튜토리얼에선 X |
| **길이** | 한 step 1~2문장, 각 30자 이내 권장 (UI 카드 폭 제한) |
| **진실 누설** | 사건 진실(280만원이 간병 예약금이라는 것)을 튜토리얼 단계에서 누설 절대 금지. "송금에 관해 사실을 확인해보세요" 같은 추상 안내만 |
| **메커니즘 학습** | "왜 이 행동을 하는지" 한 줄 의미 부여 (예: "같은 쟁점도 누구에게 묻느냐에 따라 답이 달라집니다") |
| **카타르시스 빌드업** | 7~8단계(증거 제시 + 피드백)는 첫 클라이맥스이므로 약간 톤 고조 허용 |

## B.4. 산출 형식

`docs/design/tutorial-spouse01/copy-ko.json` 신규 작성:

```json
{
  "pc.tutorial.spouse01.briefing-advance": {
    "title": "...",
    "body": "..."
  },
  "pc.tutorial.spouse01.initial-statement-acknowledge": {
    "title": "...",
    "body": "..."
  },
  ...
  "pc.tutorial.spouse01.tutorial-complete": {
    "title": "...",
    "body": "..."
  },
  "pc.tutorial.spouse01.skip-button": "튜토리얼 건너뛰기",
  "pc.tutorial.spouse01.completion-toast": "..."
}
```

각 step의 카피는 다음 정보를 참고:

| Step | 학습 의도 | 가이드 키워드 |
|---|---|---|
| 1 briefing-advance | "사건은 먼저 요약을 읽고 시작한다" | 브리핑 확인 / 재판 시작 |
| 2 initial-statement-acknowledge | "양측 진술이 기록으로 남는다" | 두 사람의 진술 / 기록 |
| 3 dispute-focus-d1 | "지금 다룰 질문 축을 고른다" | 쟁점 선택 / 어디부터 |
| 4 target-select-b | "같은 쟁점도 누구에게 묻느냐가 다르다" | 대상 선택 / 의심을 제기한 쪽 |
| 5 question-fact | "사실 확인 질문의 기본 사용법" | 사실 추궁 / 근거 캐묻기 |
| 6 evidence-investigate-e2 | "증거는 조사해야 깊어진다" | 증거 살펴보기 |
| 7 evidence-present-e2-to-b | "증거는 대상과 쟁점에 맞춰 써야 한다" | 증거 제시 / 결정적 순간 |
| 8 feedback-acknowledge | "결과 팝업은 다음 행동 힌트다" | 변화 확인 |
| 9 observation-hint | "중요한 변화는 수첩에 기록된다" | 기록 / 짧게 hint |
| 10 tutorial-complete | "이후는 자유 플레이" | 완료 / 격려 |

추가 카피:
- skip 버튼 텍스트
- 완료 후 짧은 toast
- (선택) 각 step의 손가락 옆 micro-hint (10자 이내)

## B.5. 검토 체크리스트

산출 후 self-check:
- [ ] 진실(간병 예약금) 누설 0
- [ ] 해요체 사용 0 (시스템 메시지 채널)
- [ ] 각 카피 30자 이내 (제목·본문 각각)
- [ ] 메커니즘 학습 의도가 카피에 드러남
- [ ] 어색한 명령조/기계적 톤 없음

검토 통과 후 ClaudeCode 메인 세션에 결과 회신.

---

# §5. Track C — 다국어 카피 (GPT Pro 5.5 본 번역 합류)

Track B 한국어 카피 완료 후, `copy-ko.json`의 모든 항목을 `translation_priority_inventory.csv` 형식으로 변환해 `batch_01_spouse-01_part1.csv`의 첫 행들에 prepend한다.

변환 형식:
```
id, category, source, case_id, key_path, ko, en, ja, zh-CN, notes
tutorial_pc.tutorial.spouse01.briefing-advance.title, ui_i18n_message, src/i18n/messages/tutorial.ts, spouse-01, pc.tutorial.spouse01.briefing-advance.title, [한국어], , , , "spouse-01 tutorial step 1 title"
...
```

이 변환 자체는 짧은 작업이므로 ClaudeCode 메인이 Track B 결과를 받아서 직접 수행. Codex의 batch 분할 산출물이 도착했을 때 batch_01에 추가 행으로 삽입.

GPT Pro Web 작업 가이드 (`gpt-pro-workflow-guide.md`) Phase 2 흐름 그대로 적용. 별도 의뢰서 불필요.

---

# §6. 통합 / 검증

## §6.1. 통합 순서

1. Track A 코드 산출 도착
2. Track B 한국어 카피 도착 → i18n 키 매핑 (ClaudeCode 메인 직접)
3. spouse-01 진입 → 한국어로 10단계 직접 플레이 (사용자 spot check)
4. 카피 어색한 부분 ClaudeCode 메인이 즉시 패치
5. Track C 다국어 카피는 본 번역 파이프라인 완료 후 일괄 적용
6. 4개 언어 통합 PC QA

## §6.2. 측정 (퍼널 합류)

Track A 구현 시 다음 telemetry event를 emit (퍼널 의뢰서 작성 후 wire):
- `tutorial_started`
- `tutorial_step_completed` (stepId 포함)
- `tutorial_skipped` (어느 step에서)
- `tutorial_finished`
- `tutorial_restarted_from_settings`

퍼널 인프라가 아직 없으므로 stub 호출만 먼저. 퍼널 인프라 도착 후 connect.

## §6.3. 완료 조건

- [ ] Track A 코드 통합 + check:all 통과
- [ ] Track B 한국어 카피 적용
- [ ] spouse-01 진입 시 10단계 정상 동작
- [ ] localStorage 영구 플래그 동작
- [ ] "Skip tutorial" / 설정에서 재실행 동작
- [ ] (후속) 다국어 카피 적용 후 4언어 통합 QA
- [ ] commit (사용자 직접)

---

# §7. 일정 권장

- 의뢰 발송: 오늘 (2026-05-18)
- Track A·B 병렬 진행: 약 1~2일
- 통합 + 한국어 QA: 1일
- 다국어 합류: 본 번역 파이프라인 완료 후
- 한국어 단독 베타 → 다국어 통합 사이에 telemetry 측정 가능

## §8. 추가 결정 사항 (사용자)

- [ ] Track A를 Codex 별도 스레드에 던지는 것 OK?
- [ ] Track B를 ClaudeCode 다른 스레드에 던지는 것 OK?
- [ ] Step 2 (initial-statement-acknowledge)의 완료 조건이 spouse-01 실제 진술 endpoint와 정합한지 — 코드 진입 후 Track A 담당자가 spot check 권장

문의: ClaudeCode 메인 세션으로 회신.
