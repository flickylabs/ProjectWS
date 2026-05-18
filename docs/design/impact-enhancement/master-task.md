# 마스터 의뢰서: 임팩트 / 클라이맥스 강화

작성일: 2026-05-18
선행 자료:
- `docs/design/game-improvement-2026-05-18.md` §3 (Codex 게임성 강화 제안)
- ClaudeCode 메인 세션 정합성 점검 결과 (이 문서 §0)

---

## §0. 정합성 점검 요약

| 항목 | 상태 |
|---|---|
| `src/engine/vfxHierarchyEngine.ts` | 존재. `shouldPlayCutscene` / `shouldPlayLightning` — 7일 cooldown / case 8회 hard cap |
| `src/engine/presentationEngine.ts` | 존재. `emitPresentationEvent` + 8개 event type + `v4Effects.xxx()` helper |
| `src/engine/soundEngine.ts` | 존재. `playCourtBeat` / `playCutsceneSfx` / `playLightningStrike` |
| `src/components/pc/feedback/EventFeedbackCard.tsx` `CourtBeatClash` | 존재. portrait reaction state 5종 (`neutral/defensive/shaken/resigned/softened`) |
| `src/components/pc/observation/ResonanceLayer.tsx` `ResonanceBolt` / `AuraBolt` | 존재 |
| **새 쟁점 등장** (`emergenceHooks` + `presentationEngine.handleDisputeDiscovery`) | SFX·카드 O / **screen shake·freeze·대형 타이포 X** |
| **증거 hard hit** (`useActionDispatch.presentEvidence` + `playEvidencePresent`) | stamp SFX(0.25vol)만 / **카드 slam·portrait shake·gauge 애니메이션 X** |
| **S4→S5 자백 붕괴** (`confessionDispatcher` + `v4-confession-overlay`) | **완성** — 강화 대상 아님 |
| **판단 충돌** (`CourtBeatClash` `kind='conflict'`) | court beat O / **좌우 clash 시각 X** |
| **판결 진입** (phase 6→7) | gavel SFX(`playCutsceneSfx('verdict_gavel')`)만 / **cutscene 엔트리포인트 X** |
| spouse-01 d-1, d-2 emergence hook | 데이터 완비 ✓ |
| spouse-01 e-4+e-1 조합 `dc-6` | combination lab 완성 ✓ |
| **spouse-01 h-d3 공동 적금/위임장 조작** | emergenceHooks 데이터 있음 / **hidden·T3 마킹 부재** |
| **판결 전 review screen** | 완전 부재 |
| `eventFeedbackSlice` intensity 시스템 | `focus|impact|breakthrough` 3단계 / `cue` 4종 / **visualEffects(shake/flash/freeze) 필드 없음** |
| portrait `state-shaken` CSS shake | 존재 ✓ (`@keyframes court-clash-portrait-shake`, 0.36s) |
| portrait 데사추레이션 (`filter: saturate()`) | 부재 (1줄 추가) |
| portrait zoom (`transform: scale()`) | 부재 (CSS 추가) |
| `v4Effects.dramaticMoment('account_spy'|'forgery_reveal')` screen-shake | 이미 호출됨 (`presentationEngine.ts` L232~234) — 다른 이벤트로 확장 가능 |

**총평: 기반 70% 존재. 5개 강화 비트 중 1개(S5)는 완성, 나머지 4개는 신규/확장 필요. portrait reaction은 1~2줄로 강화 가능.**

## §1. 목표

다음 5개 결정적 순간을 **몸으로 느끼는 클라이맥스**로 끌어올린다.

1. 새 쟁점 등장
2. 증거 hard hit (effective evidence present)
3. 판단 충돌 (judge decision conflict)
4. 판결 진입 (phase 6 → 7)
5. **spouse-01 h-d3 위임장 조작 반전** (최고 T3, 사건당 1회)

비-목표:
- 모든 이벤트 강화 (피로 누적 — `vfxHierarchyEngine`의 case 8회 hard cap 준수)
- 새 VFX 엔진 신규 작성 (기존 엔진 확장만)
- family-01 / friend-01 케이스별 비트 (spouse-01 완료 후 패턴 복제)
- S4→S5 자백 (이미 완성)

성공 지표:
- "재미없다 / 무난하다" 사용자 피드백 감소
- 첫 모순 적중 후 세션 지속률 상승 (퍼널 측정)
- spouse-01 h-d3 도달 후 완주율 상승

## §2. 작업 분담 — 2개 트랙

| 트랙 | 자원 | 산출물 |
|---|---|---|
| **A. 엔진/코드/CSS** | Codex 별도 스레드 | visualEffects 필드 확장 / 5개 비트 트리거 wire / portrait 데사추레이션·zoom CSS / h-d3 hidden·T3 마킹 / 판결 진입 cutscene 엔트리포인트 / 판결 전 review screen |
| **B. 스토리보드 + 카피** | ClaudeCode 다른 스레드 (필요 시 Plan agent로 보강) | 5개 비트 각각의 step-by-step 스토리보드 (타이밍·duration·SFX cue·portrait 상태·카메라) + 임팩트 카피 (한국어, 다국어는 본 번역 합류) |

병렬: A·B 완전 독립. 단, A 구현 시 B의 스토리보드 파라미터(duration·시퀀스)를 기준으로 wire하므로, **B를 약간 먼저 시작**하면 A의 placeholder 추정이 줄어든다.

권장 순서:
1. B 시작 (스토리보드 1차 초안)
2. B 1차 초안 도착하면 A 시작 (스토리보드의 duration·intensity 파라미터 반영)
3. A 도착 후 ClaudeCode 메인이 spouse-01 진입해 PC QA
4. B의 한국어 카피는 본 번역 batch_01에 합류

---

# §3. Track A — 엔진/코드/CSS (Codex 의뢰)

> 이 섹션을 그대로 Codex 별도 스레드에 던질 수 있다. §0 정합성 점검 표를 컨텍스트로 함께 첨부.

## A.1. 작업 범위

다음 4개 강화 + 1개 신규 + 1개 데이터 마킹.

### A.1.1. `eventFeedbackSlice` visualEffects 필드 확장

기존 `EventFeedbackCourtBeat`에 시각 효과 envelope 추가:

```ts
type EventFeedbackVisualEffect =
  | 'screen-shake-light'      // 200ms / 2px
  | 'screen-shake-medium'     // 350ms / 4px
  | 'screen-shake-heavy'      // 600ms / 8px
  | 'screen-flash-white'      // 200ms
  | 'screen-flash-dark'       // 400ms
  | 'screen-freeze'           // 200ms (모든 애니메이션 일시정지)
  | 'vignette-red'            // 700ms (긴장 가장자리)
  | 'vignette-strong'         // 700ms (장면 전환 가장자리)
  | 'portrait-shake'          // 기존 state-shaken 재사용
  | 'portrait-desaturate'     // 1000ms, filter: saturate(0.4)
  | 'portrait-zoom-in'        // 600ms, scale(1.08)
  | 'card-slam'               // 400ms, EventFeedbackCard 진입 시 강한 slide+bounce

type EventFeedbackCourtBeat = {
  // 기존 필드 유지
  intensity: 'focus' | 'impact' | 'breakthrough'
  cue: 'evidence' | 'contradiction' | 'notebook' | 'truth'
  // 신규
  visualEffects?: EventFeedbackVisualEffect[]
  effectTiming?: 'before' | 'during' | 'after'  // default 'during'
  // T3 전용
  bigTypography?: { text: string; durationMs: number }  // 새 쟁점/반전 시 화면 중앙 대형 텍스트
}
```

구현 위치:
- `src/store/slices/eventFeedbackSlice.ts` — 타입 + state 확장
- `src/components/pc/feedback/EventFeedbackCard.tsx` — visualEffects 배열을 보고 className 토글 + Portal 효과
- `src/app/pc.css` 또는 신규 `pc-impact.css` — 각 effect의 keyframe + class

`screen-shake-*`는 `<body>` 또는 PC root에 일시 className 추가 → keyframe 종료 시 제거.
`screen-freeze`는 root에 `* { animation-play-state: paused }` 적용 + setTimeout 해제.

### A.1.2. 5개 비트 트리거 wire

| 비트 | 트리거 위치 | wire 내용 |
|---|---|---|
| **새 쟁점 등장** | `presentationEngine.handleDisputeDiscovery` (또는 emerge hook 호출 직후) | `enqueueFeedback({ kind: 'emergence', visualEffects: ['screen-flash-dark', 'screen-shake-medium', 'vignette-strong'], bigTypography: { text: dispute.label, durationMs: 1200 } })` |
| **증거 hard hit** | `useActionDispatch.presentEvidence` → effective 분기 | 기존 stamp SFX 유지 + `enqueueFeedback({ kind: 'evidence_hit', intensity: 'breakthrough', visualEffects: ['card-slam', 'portrait-shake', 'screen-shake-light'], effectTiming: 'during' })` |
| **판단 충돌** | `CourtBeatClash` `kind='conflict'` | 좌우 split-screen 레이아웃 추가 (CourtBeatClash 내 신규 layout variant). `visualEffects: ['screen-freeze', 'screen-shake-light']` 0.2s freeze → 좌우 portrait 동시 표시 → "VS" 중앙 타이포 |
| **판결 진입** (phase 6 → 7) | `phaseSlice.advancePhase` 또는 phase transition observer | 신규 `verdictEntryCutscene()` 함수 (`presentationEngine.ts`): 0.4s blackout → 망치 클로즈업 SVG/이미지 fade-in → `playCutsceneSfx('verdict_gavel')` → screen white-flash 200ms → phase 7 화면 fade-in. 총 약 2.5초 |
| **h-d3 위임장 조작 반전** (spouse-01 전용) | h-d3 emerge 시점 (Track A.1.4 마킹 후) | 상위 T3 변형: `enqueueFeedback({ kind: 'emergence', intensity: 'breakthrough', visualEffects: ['screen-freeze', 'screen-shake-heavy', 'screen-flash-dark', 'portrait-desaturate', 'vignette-strong'], bigTypography: { text: '책임의 축이 뒤집힌다', durationMs: 1800 } })` — 카피는 Track B 결과로 교체 |

각 wire는 Track B 스토리보드의 duration·시퀀스를 정밀 반영. Track B 도착 전엔 위 추정값으로 placeholder.

### A.1.3. portrait 강화 CSS

`pc.css` (또는 신규 `pc-impact.css`):
```css
.pc-portrait.state-desaturated {
  filter: saturate(0.4) brightness(0.85);
  transition: filter 600ms ease-out;
}
.pc-portrait.state-zoomed-in {
  transform: scale(1.08);
  transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes pc-portrait-zoom-pulse {
  0% { transform: scale(1); }
  40% { transform: scale(1.10); }
  100% { transform: scale(1.06); }
}
.pc-portrait.state-zoom-pulse {
  animation: pc-portrait-zoom-pulse 700ms ease-out;
}
```

`EventFeedbackCard` CourtBeatClash에서 visualEffects 배열에 따라 className 동적 적용.

### A.1.4. h-d3 hidden·T3 마킹

`emergenceHooks.ts` (또는 spouse-01 case config)에서 `h-d3` 항목에 다음 필드 추가:
```ts
{
  id: 'h-d3',
  hidden: true,
  tier: 'T3',        // 신규 필드 (vfxHierarchyEngine이 인식)
  visualImpact: 'climactic'  // 신규 필드
}
```

`vfxHierarchyEngine.shouldPlayCutscene`이 `tier='T3'`인 emergence는 hard cap 8회와 별개로 우선 통과시키되, T3는 사건당 최대 1회로 제한 (T3 cap=1).

### A.1.5. 판결 전 review screen (신규 컴포넌트)

phase 6 → phase 7 사이에 약 4초 review:
- 컴포넌트: `src/components/pc/verdict/PCVerdictReviewMontage.tsx`
- 표시: 핵심 증거 카드 3장 (점멸 1.2s 간격) + 붕괴한 거짓말 카운트 + 미해결 쟁점 표시
- 끝나면 자동 phase 7 진입 또는 "판결로 진입" 버튼 fade-in
- 스킵 가능 (Esc 또는 클릭)
- 데이터 source: `gameStore.evidenceSlice` + `agentSlice.lieStateMap` + `disputeSlice`

이 컴포넌트는 spouse-01뿐 아니라 모든 케이스에 적용.

## A.2. 검증 요구

- working tree clean 진입
- `npm run check:all` 통과
- `npm run dev:pc`에서 spouse-01 진입 후 다음 시나리오 직접 실행:
  - Phase 3 진입 → d-1 첫 질문 → 첫 evidence present 효과 확인
  - dc-6 조합 성공 → 새 쟁점 emerge 효과 확인
  - h-d3 emerge 시점 → T3 강도 확인 (1회만 발동)
  - phase 6 → 7 전환 → review montage 4초 → verdict 진입 cutscene 확인
- `vfxHierarchyEngine` cooldown 동작 확인 (같은 비트가 짧은 시간에 두 번 안 터지는지)
- portrait reaction state 5종 + 신규 3종(desaturated/zoomed-in/zoom-pulse) 시각 확인

산출 commit은 사용자가 직접 (staged 상태로 둠).

## A.3. 비-목표 (이번 의뢰에서 손대지 않음)

- S4→S5 자백 (`v4-confession-overlay`) — 이미 완성
- family-01 / friend-01 케이스별 T3 비트 — 후속
- 새 미니게임 / 메커니즘 추가
- BGM 추가 (별도 의뢰)

---

# §4. Track B — 5개 비트 스토리보드 + 임팩트 카피 (ClaudeCode 다른 스레드 의뢰)

> 이 섹션을 그대로 ClaudeCode 다른 스레드에 의뢰서로 던질 수 있다.

## B.1. 작업 범위

5개 강화 비트 각각에 대해 **타임라인 스토리보드 + 한국어 임팩트 카피**를 작성한다.

코드는 작성하지 않는다. Codex(Track A)가 wire할 때 참고할 정확한 파라미터(타이밍/duration/시퀀스/사운드 큐)와 카피만 산출.

## B.2. 컨텍스트 (필수 읽기)

작업 시작 전 다음 메모리 항목 reflect:
- [진실 누설 금지](memory/feedback_truth_leak_prohibition.md) — 새 쟁점 등장 / 판결 진입 카피에서 진실 직접 언급 금지
- [재판관 질문 품질](memory/feedback_judge_question_quality.md) — 기계적 관찰문 금지
- [PC VFX/컷씬 인벤토리](memory/design_vfx_inventory_pc.md) — 기존 9 Discovery + 6 Cutscene + 큐 시스템 패턴
- [플레이 씬 v3 통합 정리](memory/design_play_scene_v3_consolidation.md) — 의도 차이 보존 항목 (Phase pill / 화자색 / amber warning / portrait ring)
- spouse-01 사건 구도 (§0): A=지석 비밀 송금자 / B=세린 의심 제기자 / d-1=비밀 송금 / e-2=간병 예약서 / dc-6=e-4+e-1 조합 / h-d3=공동 적금 해지·위임장 조작 (책임 축 뒤집힘, T3 최고)

## B.3. 산출 형식

`docs/design/impact-enhancement/storyboard.md` 신규 작성. 5개 비트 각각에 다음 형식:

```markdown
## Beat N: [이름]

### 트리거
- 게임 시점: [언제]
- 트리거 조건: [무엇이 만족되면]
- 빈도: [사건당 최대 N회 / 케이스 hard cap 적용 여부]

### 타임라인 (총 N초)
| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | (시작) | (cue) | (state) | — |
| 0.20s | screen-flash-dark | bass drop | — | — |
| 0.40s | bigTypography fade-in "..." | tension build | desaturated | — |
| ... | ... | ... | ... | ... |
| N.NN s | (종료) | resolve | neutral | (있다면) |

### 카피 (한국어)
- title (대형 타이포): "..."
- subtitle (있다면): "..."
- 카피 의도: [학습/감정/긴장 어느 차원]
- 길이: [N자]
- 진실 누설 체크: [통과]

### Codex wire 권장 파라미터
- visualEffects: ['screen-shake-...', 'vignette-...', ...]
- intensity: focus | impact | breakthrough
- effectTiming: before | during | after
- bigTypography.durationMs: NNN
- 추가 SFX cue: [있다면]

### 빈도 제한
- 일반 비트: case 8회 hard cap 적용
- h-d3: T3 cap=1, hard cap과 별개
```

## B.4. 작성 원칙

| 차원 | 가이드 |
|---|---|
| **진실 누설** | 새 쟁점 등장 카피는 쟁점 ID·이름까지만 허용. 진실 콘텐츠(예: "송금의 진짜 목적은 간병") 직접 언급 절대 금지 |
| **카피 길이** | bigTypography 6~14자, subtitle 12~20자 권장 |
| **어조** | 시스템 메시지 톤 (해요체 X). 단정형 또는 명사형 |
| **카타르시스** | h-d3는 사건 최고점. 카피·연출 모두 다른 4개와 명확히 차별 |
| **재사용성** | 일반 비트는 모든 케이스에서 재사용 가능한 추상 카피. h-d3만 spouse-01 전용 |
| **타이밍** | 일반 비트 1.2~2.5초, h-d3 최대 3.5초. 너무 길면 흐름 끊김 |

## B.5. 5개 비트 작성 가이드

### Beat 1: 새 쟁점 등장 (일반)
- 학습 의도: "새로운 질문 축이 열렸다 — 이쪽도 봐야 한다"
- 카피 예: 대형 "새로운 쟁점" + 쟁점 label (게임이 동적 주입)
- 톤: 발견·전개

### Beat 2: 증거 hard hit (일반)
- 학습 의도: "이 증거가 결정적이었다"
- bigTypography 대신 portrait shake + card slam으로 처리
- 카피는 짧은 짤막 효과음 정도. 또는 "결정적 단서" 같은 짧은 라벨 1회

### Beat 3: 판단 충돌 (일반)
- 학습 의도: "양측 주장이 정면 충돌한다"
- 좌우 split + 중앙 "VS" + 0.2s freeze
- 카피: 좌(A 핵심 주장 요약) + 우(B 핵심 주장 요약). 게임이 동적 주입

### Beat 4: 판결 진입 (일반)
- 학습 의도: "결정의 순간"
- 망치 클로즈업 + 짧은 침묵 + white flash
- 카피: 판결 진입 직전 화면에 "최종 판단" 1회

### Beat 5: h-d3 위임장 조작 반전 (spouse-01 전용, T3)
- 학습 의도: **사건의 진짜 구도가 보인다 — 책임의 축이 뒤집힌다**
- 다른 비트보다 명확히 무겁게
- 카피: bigTypography "책임의 축이 뒤집힌다" (예시, 보정 가능) + 짧은 subtitle
- 진실 누설 주의: "위임장 조작" 같은 결과 공개 금지. **개념만** ("축이 뒤집힌다")
- 타이밍 약 3.5초

## B.6. 검토 체크리스트

- [ ] 5개 비트 모두 스토리보드 작성
- [ ] 카피 진실 누설 0 (특히 Beat 5)
- [ ] 각 비트의 visualEffects 권장 배열 명시
- [ ] duration 합계가 비트당 권장 범위 내
- [ ] h-d3 비트가 다른 4개와 명확히 차별

검토 통과 후 ClaudeCode 메인 세션에 결과 회신.

---

# §5. 통합 / 검증

## §5.1. 통합 순서

1. Track B 1차 초안 도착 → Track A에 파라미터 전달 (Codex가 wire할 정확한 값)
2. Track A 도착 → spouse-01 진입 PC QA (ClaudeCode 메인)
3. Track B 카피 어색 시 ClaudeCode 메인이 즉시 패치
4. Track B 한국어 카피를 본 번역 batch_01에 행으로 합류 (튜토리얼 카피와 같은 방식)
5. 4언어 통합 QA (본 번역 파이프라인 완료 후)

## §5.2. PC QA 시나리오

- spouse-01 진입 → d-1 첫 질문 → 첫 evidence present → Beat 2 확인
- 추가 추궁 → 새 쟁점 emerge → Beat 1 확인 (1~2회)
- dc-6 조합 성공 → 새 쟁점 emerge 강화 확인
- h-d3 emerge 도달 → Beat 5 (T3) 확인 — **1회만**
- 판단 충돌 발생 시점 → Beat 3 확인
- phase 6 진입 → review montage 4초 → phase 7 → Beat 4 (gavel cutscene) 확인
- `vfxHierarchyEngine` hard cap 동작 확인 (장시간 플레이 시 비트 누적 cap)

## §5.3. 측정 (퍼널 합류)

다음 telemetry event를 emit (퍼널 의뢰서 작성 후 wire):
- `impact_beat_played` (beatId, intensity, caseId)
- `impact_beat_skipped` (있다면 — review montage Esc 등)
- `t3_climax_reached` (h-d3 도달 시)
- `verdict_entry_cutscene_played`

## §5.4. 완료 조건

- [ ] Track A 코드 통합 + check:all 통과
- [ ] Track B 스토리보드 + 카피 적용
- [ ] spouse-01 5개 비트 모두 정상 동작
- [ ] vfxHierarchyEngine cooldown / hard cap 동작
- [ ] portrait reaction 8종 (기존 5 + 신규 3) 시각 OK
- [ ] 판결 진입 review montage + cutscene OK
- [ ] (후속) 다국어 합류 후 4언어 QA
- [ ] commit (사용자 직접)

---

# §6. 일정 권장

- 의뢰 발송: 오늘 (2026-05-18)
- Track B 1차 초안: 약 1일
- Track A 구현: Track B 도착 후 약 1~2일
- 통합 + 한국어 QA: 1일
- 다국어 합류: 본 번역 파이프라인 완료 후

## §7. 추가 결정 사항 (사용자)

- [ ] Track A를 Codex 별도 스레드에 보내는 것 OK?
- [ ] Track B를 ClaudeCode 다른 스레드에 보내는 것 OK?
- [ ] 판결 전 review montage 길이 4초가 적절한지 (너무 길면 흐름 끊김)
- [ ] h-d3 비트의 bigTypography 카피 안 "책임의 축이 뒤집힌다"의 톤 OK인지 (Track B에서 후보 여러 안 제시 예정)

문의: ClaudeCode 메인 세션으로 회신.
