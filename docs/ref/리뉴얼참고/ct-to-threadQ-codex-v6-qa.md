# CT → Thread Q (Codex 세션): V6 시스템/로직 QA — 100라운드

> 발신: CT (Control Tower)
> 수신: **Codex** (신규 세션, = Thread Q)
> 일시: 2026-04-28
> 베이스 커밋: `8d18a39`
> 검증 대상: 엔진/UI/빌드 전반 + 활성 3사건 런타임

---

## ⚠️ Codex 작업 절대 주의사항

### 1. Modified 파일에 Codex 투입 금지

이전 세션에 Modified 상태 파일에 Codex 투입 → **작업물 유실** 사례 있음.
참고 메모리: `feedback_no_codex_on_uncommitted.md`

**시작 전 절대 확인**:
```bash
git status
```
Modified가 있으면 **CT에 보고하고 대기**. Clean 상태에서만 시작.

### 2. 커밋 주도권은 CT

- Codex 자체 커밋 **금지**
- 라운드별 변경 완료 후 CT에 보고 → CT가 **5~10라운드씩 묶어 일괄 커밋**
- 커밋 간 재시작 전 `git status` clean 재확인

### 3. ThreadQW와 파일 영역 겹침 금지

| 영역 | 담당 |
|---|---|
| **Codex (Thread Q)** | 엔진 로직 / UI 컴포넌트 / 빌드 구성 / 타입 |
| **ThreadQW** | 데이터 파일 (ScriptedText/Phase1/viewerData/atoms/cases) / 텍스트 교정 / 프롬프트 few-shot |

**경계 영역** (`koreanPostposition.fixPostpositions()` 호출 누락 등):
- 처음 발견한 쪽이 "이월 섹션"에 기록
- **CT 조정 후** 한쪽에만 배정 (중복 수정 금지)

### 4. Hotfix 스크립트 실행 금지

- `release-ready-scripted-hotfix.cjs` 같은 레거시 hotfix 스크립트는 한글 텍스트를 깨뜨리는 것으로 확인됨
- 참고 메모리: `feedback_hotfix_contamination.md`
- tmp/\*.cjs 스크립트를 신규로 만드는 것은 OK. 작업 후 제거.

### 5. 에이전트로 대량 콘텐츠 생성 금지

- Codex가 직접 대사/시나리오/아톰을 대량 생성하지 말 것
- 대량 콘텐츠 = **GPT Pro 경유**가 원칙
- 참고 메모리: `feedback_use_gpt_pro.md`
- Codex 역할은 **시스템/로직 품질**만

---

## 분업 매트릭스 (ThreadQW vs Codex 상세)

| 영역 | ThreadQW | Codex (Thread Q) |
|---|---|---|
| 텍스트/대사 품질 (대사, 호칭, 조사, 번역체) | ✅ 주력 | 관찰만 → QW 이월 |
| 시스템 메시지 텍스트 교정 | ✅ 주력 | 관찰만 |
| 엔진 로직 (lieState 전이, 감정 페이즈, 트리거 타이밍) | 관찰만 → Codex 이월 | ✅ 주력 |
| 미터/토큰 누적 로직 (모순/감정/신뢰/누설) | 관찰만 → Codex 이월 | ✅ 주력 |
| UI 렌더 분기 (speaker/role → bubble 타입) | 관찰만 → Codex 이월 | ✅ 주력 |
| `fixPostpositions()` 호출 누락 | 텍스트 레벨 탐지 + 빌더 호출 추가 가능 | 엔진 레벨 정적 스캔 + 호출 추가 |
| 타입/빌드/경고 | — | ✅ 주력 |
| 성능/리렌더/메모리 | — | ✅ 주력 |
| 빌드 청크 사이즈 | — | ✅ 주력 |
| 증거 해금/조합 해금 로직 | — | ✅ 주력 |
| 프롬프트 few-shot 추가 | ✅ 가능 | — |

### 이월 절차

- Codex가 텍스트/콘텐츠 문제 발견 → `tmp/codex-v6-rNN.md`의 **"QW 이월"** 섹션에 기록
- CT가 10라운드마다 이월 목록을 `tmp/handoff-codex-to-qw-{date}.md`로 정리 → ThreadQW 세션으로 전달
- 역방향(QW → Codex)도 동일

---

## 프로젝트 요약 (30초)

"솔로몬 법정" — Phase 0→7 구조. Phase 3~5가 심문 핵심 루프.

**활성 사건 3건만 QA 대상** (나머지 81건은 Legacy):
- spouse-01 / friend-01 / family-01

상세는 [CLAUDE.md](../../../CLAUDE.md) 참조.

---

## 집중 영역 5종

### 영역 1. 엔진 로직 정합성

| 엔진 파일 | 검증 포인트 |
|---|---|
| `src/engine/lieStateMachine.ts` | S0→S5 전이 규칙, 트리거 판정 일관성, 역전이 방지 |
| `src/engine/emotionEngine.ts` | 감정 페이즈 (defensive/confident/shaken/angry/resigned) 전이 임계값 |
| `src/engine/questionEffectEngine.ts` | 심문 3종 effectiveness + 교착 피드백 |
| `src/engine/questionFatigueEngine.ts` | streak/교착 3단계 + dossier 리셋 조건 |
| `src/engine/gameEventTriggerEngine.ts` | 모순 지연실행 + 감정 폭발 선택 강화 |
| `src/engine/evidenceEngine.ts` | 증거 해금, 조합 업그레이드, presentStage 진행 |
| `src/engine/witnessEngine.ts` | vague/partial/full depth, 기관 증인 예외, prevSlotRequired |
| `src/engine/verdictEngine.ts` | 최종 점수 (통찰/권위/지혜) 계산, liesCollapsed 보너스 |
| `src/engine/judgeProgressionEngine.ts` | 9조각 × 6성향 레벨 + 변환 3:1 + 칭호 9종 |
| `src/engine/judgePerks.ts` | Major 6 + Minor 9, 레벨별 해금, 장착 슬롯 |
| `src/engine/atomSelectionEngine.ts` | stance별 slot 승격 (S5 confess rounded/fullName) |
| `src/engine/blueprintPromptBuilderV2.ts` | ARCHETYPE/TELL/FOCUS 배치, Truth Throttle |
| `src/engine/llmDialogueResolver.ts` | enforceHonorifics / fixPostpositions / fixMisdirectedAddress 파이프라인 |
| `src/engine/stateTransitionHelper.ts` | S4 opening 분리 + 행동 추천 |
| `src/engine/meterStagingV2.ts` | DossierCard 해금 조건 판정 |
| `src/engine/judgeQuestionEngine.ts` | 재판관 질문 84종 (4타입 × 4depth × soft/hard) |

각 엔진에서 검증할 것:
- 입력 범위 경계 조건 (0, max, 음수, undefined, null)
- undefined/null 방어 누락
- 상태 간 불일치 (예: lieState S3인데 공개 레벨은 S1)
- 타이밍 race (멀티 이벤트 동시 발화)
- 멱등성 (같은 액션 2회 → 동일 결과)

### 영역 2. UI 렌더 분기

| 컴포넌트 | 검증 포인트 |
|---|---|
| `src/components/pc/layout/PCDialogueLog.tsx` + bubble 컴포넌트 | speaker 필드 → bubble 타입 매핑 (judge/A/B/system/witness) |
| `src/components/pc/layout/PCInteractionPanel.tsx` | payload 분기 (note/dialogue/evidence) + close 타이밍 |
| `src/components/pc/hotbar/PCBottomDock.tsx` | hotbar 실측 → `--pc-dock-area-h` 주입 타이밍, ResizeObserver cleanup |
| `src/components/pc/layout/PCCourtLayout.tsx` | Phase 컷씬 + 설정 패널 + 타임라인 드로어 + floating toggle (XS) |
| `src/components/pc/layout/CutsceneOverlay.tsx` | 6종 cutscene 렌더 분기, 이중 트리거 방지 |
| `src/components/pc/observation/JudgeObservationSection.tsx` | archetype 뱃지, resonance 타겟 |
| `src/components/pc/layout/PCGameplayOverlay.tsx` | pendingEvidenceResult 등 overlay 파이프라인 |
| `src/components/pc/panels/PCImportantNotesSection.tsx` + 발언노트 드로어 | 중앙 팝업 vs 우측 드로어 분기, 바로가기 동작 |
| `src/components/pc/panels/PCRightPanel.tsx` | 쟁점 nav, 카운터, 상태 뱃지 |
| `src/components/pc/home/PCHomeScreen.tsx` + `settings/PCSettingsPanel.tsx` | 해상도 프리셋 전환, persist |

각 컴포넌트에서 검증할 것:
- props 미싱 fallback
- state 비동기 업데이트 race
- cleanup (ResizeObserver, timeout, event listener)
- stacking context (z-index, backdrop-filter 상호작용)
- 해상도 bucket 전환 시 layout 깨짐

### 영역 3. 엔진 헬퍼 정합

| 헬퍼 | 검증 포인트 |
|---|---|
| `src/engine/koreanPostposition.ts` (fixPostpositions + 개별 조사 헬퍼) | 시스템 메시지 빌더에서 **호출 누락 지점 전수 스캔** |
| `src/engine/blueprintPromptBuilderV2.ts` (호칭 규칙 생성) | toJudge/toPartner 분기 생성 시 조건 |
| `src/engine/llmDialogueResolver.ts` (후처리) | enforceHonorifics + fixPostpositions + fixMisdirectedAddress 파이프라인 순서 |
| placeholder 치환 (`{A}/{B}/{CASE}/{hostName}/...`) | ScriptedText 로더 및 템플릿 변수 소비 지점 |

**⚠️ 중요**: 시스템 메시지에서 `fixPostpositions()`를 호출하지 않고 직접 이름+조사를 문자열 결합하는 패턴(`${name}(이)가 섰다`) 색출이 ThreadQW v6의 집중-9(조사 placeholder 원시 노출) 원인. Codex가 **엔진 레벨 스캔** 담당.

### 영역 4. 성능/메모리/리렌더

- React Profiler로 불필요한 리렌더 Top 10 식별
- ResizeObserver / setTimeout / event listener cleanup 누수
- CSS reflow/repaint 비용 (특히 Phase 컷씬, 드로어 개폐, bucket 전환)
- 번들 분석 (engine 청크 크기 추이, scriptedText eager 상태)

### 영역 5. 타입/빌드

- `npx tsc -b --force` 경고 0건 유지
- `npm run build` 성공
- vite 빌드 경고 목록 (특히 `INEFFECTIVE_DYNAMIC_IMPORT`)
- `src/engine/scriptedTextLoader.ts`의 eager/lazy 상태 (현재 eager=true, 모바일 출시 전 lazy로 전환 블로커)

---

## 100라운드 실행 계획

### Phase G — 정적 코드 분석 (R1~R20)

| R | 대상 |
|---|---|
| R1 | 엔진 파일 전수 인벤토리 (58개) — 파일별 역할/공개 API |
| R2 | 엔진 간 의존성 맵 (누가 누구를 import) |
| R3 | UI 컴포넌트 → 엔진 호출 맵 |
| R4 | `npx tsc -b --force` 경고 0건 확인 + 잔존 warning 분류 |
| R5 | strictNullChecks 위반 의심 지점 |
| R6 | `any` / `as unknown` / `// @ts-ignore` 전수 |
| R7~R8 | import 순환 감지 + 순서 문제 |
| R9~R11 | 엔진별 undefined/null 방어 패턴 전수 (null-safe 접근, ?. 누락) |
| R12~R14 | 상태 머신 일관성 (lieState/emotion/trust/court/fatigue 조합 경계) |
| R15~R17 | 경계 조건 (초기 null → 첫 턴, 마지막 턴 → reset, 자원 0, 자원 max) |
| R18 | `fixPostpositions()` 호출 누락 지점 전수 스캔 (시스템 메시지 빌더) |
| R19 | placeholder `{A}/{B}/{CASE}` 치환 파이프라인 엔드-투-엔드 추적 |
| R20 | Phase G 요약 + Phase H 우선순위 설정 |

### Phase H — 런타임 헤드리스 (R21~R60)

방법: `node tests/run-84-headless.cjs --category <cat> --case <id>` 다회 실행 + 로그 덤프 + 엔진 상태 덤프(필요 시 hook 추가).

| R 범위 | 내용 |
|---|---|
| R21~R25 | spouse-01 정상 경로 5회 (로그 에러/경고 수집, 상태 일관성 체크) |
| R26~R30 | spouse-01 비정상 경로 5회 (조기 자백 / 모순 집중 / 공감 집중 / fatigue 도달 / 자원 고갈) |
| R31~R35 | friend-01 정상/비정상 각 |
| R36~R40 | family-01 정상/비정상 각 |
| R41~R45 | 경계 시나리오 (퍼크 최대/최소, 자원 고갈, 조합 전수, 증인 전수) |
| R46~R50 | 재판관 성향 조합별 (9칭호 커버 + 각 Minor/Major 퍼크 발현 확인) |
| R51~R55 | LLM 폴백 케이스 (API 키 없음 / 타임아웃 시뮬) — 폴백 텍스트 정합성 |
| R56~R60 | 리플레이 2회차 이상 (퍼크 캐리 + 진척도 누적 + localStorage 호환) |

각 라운드에서 수집:
- 런타임 에러/경고 (console)
- 엔진 상태 dump (각 turn 직후 questionMeters, lieState, emotionPhase, trustMeter 스냅샷)
- undefined/null 유입 지점
- UI 렌더 에러 (React warning)

### Phase I — UI 시뮬 (R61~R80)

| R 범위 | 내용 |
|---|---|
| R61~R65 | 해상도 프리셋 8종 각각 + Auto (L/M/S/XS bucket 전환 회귀) |
| R66~R70 | 드로어/모달/팝업 개폐 조합 (stacking context, backdrop-filter 사이드 이펙트) |
| R71~R75 | Phase 전환 컷씬 (중단, 이중 트리거, Cutscene Overlay 정합) |
| R76~R78 | Observation 공명 타겟 정확성 (data-resonance-target 링크) |
| R79~R80 | 발언노트/중앙 팝업/핫바 상호작용 (바로가기, 드로어 토글) |

### Phase J — 버그 수정 + 회귀 (R81~R100)

- R81~R95: 발견 건 우선순위 상위 15건 수정 (critical 우선)
- R96~R98: 수정 회귀 (해당 경로 재실행)
- R99: 빌드/타입 종합 확인
- R100: 최종 리포트 작성

---

## 수정 권한

### ✅ Codex 직접 수정 가능

| 범주 | 조건 |
|---|---|
| 엔진 버그 픽스 (상태 전이 누락, race condition) | **CT에 수정 내용 사전 보고** 후 진행 |
| UI 렌더 분기 수정 (speaker → bubble 매핑 보강, stacking 정리) | 주요 변경은 CT 승인 후 |
| `fixPostpositions()` 호출 누락 보강 | 호출 추가만, 로직 변경 없음 → 바로 가능. 단 ThreadQW와 **중복 금지** — "이월 섹션" 체크 |
| 타입 에러 / 빌드 경고 제거 | 바로 가능 |
| 성능 최적화 (memoization, 리렌더 감소) | 바로 가능, 기능 영향 없어야 |
| cleanup 누락 수정 (ResizeObserver, timeout) | 바로 가능 |

### ⚠️ CT 경유 (직접 수정 금지)

| 범주 | 이유 |
|---|---|
| 텍스트/콘텐츠 변경 | **ThreadQW 영역** |
| 아키텍처/상태 구조 변경 (QuestionMetersState 등) | 유저 판단 필요 |
| 게임 밸런스 로직 (점수 공식, 미터 임계값, 퍼크 효과) | 기획 결정 |
| 새 컴포넌트/채널 추가 | 전반 영향 |
| CSS specificity 조정 `.pc-play-app` grid (line 1318/3146/7799 3중 선언) | 이번 세션에 여러 번 삽질한 덫 — 신중 |
| Portal/stacking context 변경 (isolation, z-index 상승) | 사이드 이펙트 큼 |

### 필수 절차

- 매 수정 후 `npx tsc -b --force` 통과 확인
- 헤드리스 플레이 회귀 (최소 1회, 해당 경로)
- 커밋 **금지** — CT 일괄 커밋
- 라운드별 `tmp/codex-v6-rNN.md`에 변경/영향/회귀 결과 기록

---

## 라운드별 산출물

`tmp/codex-v6-rNN.md` (최대 80줄):

```markdown
# Codex V6 R{N}: {대상}

## 실행
- 대상 파일/경로/커맨드: ...
- 로그: tmp/codex-v6-rNN-log.txt (필요 시)

## 발견
- 유형별 카운트 (critical / major / minor)
- 상위 3건 상세 (위치 + 원인 추정 + 영향 범위)

## QW 이월 (텍스트 품질)
- {항목} — 발견 위치, 전달할 맥락

## 수정 (권한 내)
- {파일:라인} — 변경 요약 + diff 요약
- 빌드/타입 통과: ✓/✗
- 회귀 (해당 경로): ✓/✗

## CT 검토 요청 (권한 초과)
- {항목} — 2~3안 제시

## 다음 라운드로 이월
- {항목}
```

10라운드마다 `tmp/codex-v6-mini-NN.md` (최대 15줄):
- 누적 critical/major/minor 카운트
- 수정 완료 파일 목록
- QW 이월 대기 건수
- CT 검토 대기 건수
- 다음 10R 우선순위

R50 → `tmp/codex-v6-mid-report.md` (Phase J 우선순위 재정의)
R100 → `tmp/thread-q-codex-v6-final-report.md` (최종)

---

## 컨텍스트 관리 (100R 단일 세션)

ThreadQW와 동일 원칙:
- 라운드당 80줄 md
- 10R mini, 50R mid, 100R final
- 세션 중단 시 인수인계: 마지막 mini + 현재 라운드 번호
- 긴 로그는 `tmp/codex-v6-rNN-log.txt`로 분리, md에는 핵심만

---

## ThreadQW 협업·이월 규약

- Codex가 텍스트 품질 문제 발견 → `tmp/codex-v6-rNN.md` "QW 이월" 섹션 기록
- CT가 10R 주기로 이월 목록을 `tmp/handoff-codex-to-qw-{date}.md`로 정리
- 반대로 ThreadQW가 엔진/로직 문제 발견 시 CT가 `tmp/handoff-qw-to-codex-{date}.md`로 전달

---

## 시작 체크리스트

- [ ] `git status` 확인 → **Modified 없음** 필수. 있으면 CT 보고 후 대기
- [ ] 이 문서 + [CLAUDE.md](../../../CLAUDE.md) + [memory/backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) + [memory/session_handoff_20260428.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\session_handoff_20260428.md) 정독
- [ ] 엔진 파일 인벤토리 (58개 추정) 파악
- [ ] `tests/run-84-headless.cjs` 옵션 확인
- [ ] Phase G R1 시작

---

## PASS 기준

| 등급 | 조건 |
|---|---|
| **PASS** | 엔진 critical 0건 + UI 분기 critical 0건 + 빌드 경고 기존 대비 증가 0건 + `fixPostpositions()` 누락 0건 |
| CONDITIONAL | minor WARN만 존재 + major 3건 이하 |
| FAIL | critical 1건 이상 또는 major 4건 이상 |

최종 판정은 R100 final-report에서.
