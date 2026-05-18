# 임팩트 강화 — 5개 비트 스토리보드 + 한국어 카피

작성일: 2026-05-18
작성: ClaudeCode Track B
선행: [master-task.md](master-task.md) §4

---

## §0. 정합성 점검 요약 (Track B 기준)

> Track B는 코드를 작성하지 않는다. 본 §0은 Track A wire 정확도를 높이기 위한 컨텍스트 재확인.

### 0.1. 강화 비트별 기반 상태 (master-task.md §0 재인용)

| 비트 | 기반 상태 | Track B 산출 |
|---|---|---|
| 1. 새 쟁점 등장 | SFX·카드·번개·관찰 패널 O / screen shake·freeze·bigTypography X | 타임라인 + bigTypography 카피 |
| 2. 증거 hard hit | stamp SFX(0.25vol)만 / card slam·portrait shake·gauge 애니메이션 X | 타임라인 + 짧은 라벨 |
| 3. 판단 충돌 | court beat 모달 O / 좌우 clash + freeze + VS X | 타임라인 + VS 카피 + 좌우 카피 슬롯 정의 |
| 4. 판결 진입 (phase 6→7) | gavel SFX만 / cutscene 엔트리포인트 X | 타임라인 + bigTypography 카피 |
| 5. spouse-01 h-d3 (T3) | emergenceHooks 데이터 O / hidden·T3 마킹 X / 전용 연출 X | 타임라인 + 카피 후보 5안 + subtitle 후보 4안 |

### 0.2. 보존 항목 reflect

[design_play_scene_v3_consolidation.md](../../../memory/design_play_scene_v3_consolidation.md) §"의도적으로 다르게 유지된 항목" 보존:

- **화자색 (A blue / B red)**: Beat 3 좌우 split에서 좌=A blue, 우=B red **유지** (골드로 통일 X)
- **amber WARNING** `#ffb347`: Beat 3 중앙 "VS" 텍스트 / Beat 5 subtitle은 amber tone 권장 — "주의 환기" 의미
- **portrait ring 2px**: Beat 1·2·5에서 ring 두께 유지
- **SUCCESS green pulse**: Beat 2 증거 hard hit "정통" 신호 — green `#5cc97a` 1.2s glow 활용 권장
- **Phase pill**: Beat 4에서 phase 7 진입 시 약간 더 크게 강조

### 0.3. 진실 누설 체크 사전 (Beat 5 핵심)

[feedback_truth_leak_prohibition.md](../../../memory/feedback_truth_leak_prohibition.md) 적용:

| 영역 | spouse-01 금지 어휘 (재판관/시스템 채널) |
|---|---|
| evidence 진실 | "형 문자", "조카", "위임장 조작", "투자 사기", "비자금", "박지연 사기" |
| 인물 진실 | "이준호 가족 돌봄", "공동 적금 해지" (h-d3 결과 직접 언급) |
| h-d3 노출 한계 | "공동 자금 해지 절차" (= emergence dispute name, surface) **까지만 OK**. 그 너머(권한·조작·동의 결손)는 NPC가 답할 때까지 금지 |

→ **Beat 5 bigTypography·subtitle 후보 전수에서 "위임장", "조작", "공동", "적금", "권한", "동의" 단어 사용 X**. 추상 어휘만 ("축", "구도", "방향", "무게").

### 0.4. 재판관/시스템 톤 reflect

[feedback_judge_question_quality.md](../../../memory/feedback_judge_question_quality.md) 시스템 메시지 기준 적용:

- bigTypography 전수: **단정형 또는 명사형**. 해요체·습니다체 X.
- 기계적 관찰문 X ("...가 감지됩니다" 같은 시스템 로그 톤 회피)
- 관찰자 서술체 OK ("뒤집힌다", "달라진다")

### 0.5. 기존 VFX 인벤토리 재활용 권장

[design_vfx_inventory_pc.md](../../../memory/design_vfx_inventory_pc.md) 기반:

- 기존 keyframe 재활용 가능: `v4-shake` (0.4s) / `v4-bolt-flash` (0.4s) / `v4-dark-flash` (0.3s) / `pc-resonance-flicker` (0.6s) / `pc-aura-flicker` (1.2s)
- Beat 1은 기존 9 Discovery emergence flow에 layer 추가 (모달·번개·오라는 그대로 유지)
- Beat 5는 기존 Cutscene 6종과 격을 맞추되 더 무겁게 — `dispute_emergence` cutscene을 T3 variant로 확장 권장 (Track A 판단)

### 0.6. self-check 사전 (§4.6 본 체크)

- [x] 5개 비트 모두 스토리보드 작성 → 본 §1~§5
- [x] 카피 진실 누설 0 (특히 Beat 5) → §0.3 체크리스트 + 본문 진실 누설 체크 각 비트
- [x] 각 비트의 visualEffects 권장 배열 명시 → 각 비트 "Codex wire 권장 파라미터"
- [x] duration 합계가 비트당 권장 범위 내 → Beat 1·2·3·4 = 1.5~2.5s / Beat 5 = 3.5s
- [x] h-d3 비트가 다른 4개와 명확히 차별 → §6 "차별화 매트릭스"

---

## §1. Beat 1: 새 쟁점 등장 (일반)

### 트리거
- 게임 시점: 추궁 진행 중, 증거 제시 또는 진술 변화로 숨은 쟁점이 emerge 조건 충족
- 트리거 조건: `presentationEngine.handleDisputeDiscovery` 호출 직후 (NPC hook 발화와 동시 또는 0.1s 선행)
- 빈도: case 8회 hard cap 적용 (vfxHierarchyEngine). dc-6 같은 조합 결과 emerge도 동일 비트 재사용

### 학습 의도
"새 질문 축이 열렸다 — 이쪽도 살펴야 한다"

### 타임라인 (총 1.8초)

| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | 정상 화면 (트리거 직전) | — | neutral | — |
| 0.10s | screen-flash-dark 300ms 시작 (어둠 → 정상) | bass drop (저음 약 -8dB) | — | — |
| 0.10s | 기존 모달·번개 3연발·오라 4초 flow 동시 시작 (기존 유지) | resonance SFX (기존) | — | — |
| 0.20s | vignette-strong fade-in (600ms 도달) | — | — | — |
| 0.20s | screen-shake-medium 350ms / 4px | — | — | — |
| 0.40s | bigTypography fade-in 250ms — 중앙 약간 상단 | tension build (mid pad) | — | **"새로운 쟁점"** (대형) |
| 0.65s | bigTypography hold | — | — | 대형 유지 |
| 0.65s | subtitle fade-in 200ms (대형 아래 80px) | — | — | (dispute label 동적 주입) |
| 1.00s | hold | — | — | hold |
| 1.40s | bigTypography + subtitle fade-out 시작 (300ms) | resolve (저음 dissipate) | — | fade |
| 1.70s | vignette fade-out 100ms | — | neutral | — |
| 1.80s | 종료. 기존 NPC hook 발화는 1.0s 시점 이후 정상 흐름 | — | neutral | — |

### 카피 (한국어)

**bigTypography (대형):**
- 1차 안: **"새로운 쟁점"** (5자)
- 대안: "쟁점 추가" (4자) / "새 쟁점 발견" (6자) / "새 축 등장" (5자)

**subtitle (대형 아래, 동적 주입):**
- 형식: `dispute.label` 그대로 — 예: "공동 자금 해지 절차" / "목돈 출금의 경위" / "동선과 금전 흐름"
- 길이: 사건 dispute label 12~20자 범위 검증 완료 (spouse-01 d-2/h-d3/h-d4 전수 OK)

**카피 의도**
- 차원: 학습 (정보 차원) — "쟁점이 추가됐다"는 사실 신호
- 톤: 발견·전개 — 정적이고 단단한 명사형
- 길이: 대형 5자 / subtitle 9~12자
- 진실 누설 체크: **통과**. dispute label은 surface 이름 (예: "공동 자금 해지 절차") — 결과(권한·조작) 미포함

### Codex wire 권장 파라미터

```ts
enqueueFeedback({
  kind: 'emergence',
  intensity: 'impact',
  cue: 'truth',
  visualEffects: ['screen-flash-dark', 'screen-shake-medium', 'vignette-strong'],
  effectTiming: 'during',
  bigTypography: { text: '새로운 쟁점', durationMs: 1000 },
  // subtitle은 EventFeedbackCard에서 dispute.label로 별도 렌더
})
```

- visualEffects 발동 시점: trigger + 100ms (bass drop과 동기)
- bigTypography fade-in 시점: trigger + 400ms (shake 완료 후 안정 프레임)
- 기존 9 Discovery emergence flow와 **병행**. 본 layer는 추가 envelope.

### 빈도 제한
- 일반 비트: case 8회 hard cap 적용 (vfxHierarchyEngine 기존 정책)
- 같은 dispute 재 emerge는 비트 발동 X (cooldown은 vfxHierarchyEngine 7일 정책과 별개로 케이스 내 1회 권장)

---

## §2. Beat 2: 증거 hard hit (일반)

### 트리거
- 게임 시점: 효과적 증거 제시 분기 (`useActionDispatch.presentEvidence` → effective)
- 트리거 조건: 증거가 NPC lieState 전이 또는 dispute 확장에 effective 판정된 경우만
- 빈도: case 8회 hard cap. 같은 (evidence, target) 쌍은 1회만 강조

### 학습 의도
"이 증거가 정통으로 박혔다"

### 타임라인 (총 1.5초)

| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | 증거 카드 손에서 제출 모션 (기존 흐름) | — | neutral | — |
| 0.05s | stamp SFX 0.25vol (기존 유지) | stamp (기존) | — | — |
| 0.05s | card-slam 400ms — 증거 카드가 법정 책상 중앙으로 강한 slide+bounce | stamp + low thud | — | — |
| 0.15s | 대상 NPC portrait shake (state-shaken, 0.36s) | — | **shaken** | — |
| 0.20s | screen-shake-light 200ms / 2px (전체) | bass tap | — | — |
| 0.30s | 카드 모서리 SUCCESS green pulse 1.2s 시작 (기존 green `#5cc97a` 활용) | green chime (높지 않게) | — | — |
| 0.40s | 카드 우측 상단 small label fade-in 200ms | — | shaken hold | **"결정적 단서"** (label) |
| 0.80s | portrait shake 종료. portrait state는 NPC lieState 결과에 따라 `defensive` 또는 `resigned`로 자연 전이 | — | defensive/resigned | label hold |
| 1.20s | label fade-out 200ms. green pulse 종료 | — | — | fade |
| 1.50s | 종료. 카드는 책상 위치에 자연 정착 | — | 상태 유지 | — |

### 카피 (한국어)

**bigTypography**: 없음 (의뢰서 §B.5 Beat 2 가이드 따름 — portrait shake + card slam이 주효과)

**라벨 (카드 우측 상단 작은 chip 11px):**
- 1차 안: **"결정적 단서"** (5자)
- 대안: "정통" (2자, 가장 짧은 임팩트) / "유효 타격" (4자) / "결정타" (3자) / "급소" (2자)

**카피 의도**
- 차원: 감정 (카타르시스) + 학습 (effective 신호) 동시
- 톤: 짧고 단단한 명사 — 라벨 chip이라 더 길면 시각 노이즈
- 길이: 2~5자
- 진실 누설 체크: **통과**. 카피에 evidence 진실명 미포함 (surface label은 이미 카드 자체에 표시)

### Codex wire 권장 파라미터

```ts
enqueueFeedback({
  kind: 'evidence_hit',
  intensity: 'breakthrough',
  cue: 'evidence',
  visualEffects: ['card-slam', 'portrait-shake', 'screen-shake-light'],
  effectTiming: 'during',
  // bigTypography 미사용. label은 EventFeedbackCard 내 chip slot으로 별도 렌더 권장
  metadata: { label: '결정적 단서' }
})
```

- card-slam: `pc-efb-card-in` 0.3s를 강한 bounce variant로 확장 (cubic-bezier 강조)
- portrait-shake: 기존 `state-shaken` (`@keyframes court-clash-portrait-shake` 0.36s) 재활용
- SUCCESS green pulse: 기존 SUCCESS green 1.2s glow 패턴 재활용 (별도 신규 X)
- screen-shake-light는 effectTiming 'during', card-slam 시작과 동기 (trigger + 200ms)

### 빈도 제한
- case 8회 hard cap 적용
- 같은 (evidenceId, targetParty) 쌍은 1회 권장 (같은 증거의 다른 대상은 별도 카운트)
- 비효과적 증거 제시는 본 비트 발동 X (기존 stamp SFX만)

---

## §3. Beat 3: 판단 충돌 (일반)

### 트리거
- 게임 시점: `CourtBeatClash` `kind='conflict'` 발생 — 기존 판단 ↔ 신규 증거 모순 시
- 트리거 조건: conflict 종류 court beat이 enqueue되는 시점
- 빈도: case 8회 hard cap. 같은 conflict 쌍은 1회

### 학습 의도
"양측 주장이 정면 충돌한다 — 어느 쪽이 사실인가"

### 타임라인 (총 2.0초)

| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | 정상 화면 (현재 발언 마지막 프레임) | — | 발화자 active | — |
| 0.05s | screen-freeze 200ms — 모든 애니메이션 일시정지 | freeze chime (짧은 high tick) | freeze | — |
| 0.10s | 화면 좌우 split 진입 애니 시작 (300ms wipe — 중앙에서 좌우로 갈라짐) | tension swell | — | — |
| 0.30s | screen-shake-light 200ms (전체) | — | — | — |
| 0.40s | **좌 panel** 자리잡음 — A portrait + A 화자색 `.30` border + A 주장 요약 카피 fade-in | — | A portrait active | (A 주장 요약, 동적) |
| 0.50s | **우 panel** 자리잡음 — B portrait + B 화자색 `.30` border + B 주장 요약 카피 fade-in | — | B portrait active | (B 주장 요약, 동적) |
| 0.60s | 중앙 "VS" bigTypography fade-in 300ms — amber `#ffb347` text-shadow (WARNING tone) | clash hit (mid impact) | — | **"VS"** |
| 0.90s | hold (좌+우+VS 동시 표시) | low hum | — | hold |
| 1.40s | hold 유지 — 플레이어가 양측 인지할 시간 | — | — | hold |
| 1.60s | 좌우 panel + VS 동시 fade-out 시작 (300ms) | resolve | — | fade |
| 1.85s | freeze 해제 (애니메이션 재개) | — | active 복귀 | — |
| 2.00s | 종료. CourtBeatClash 모달 정상 표시 또는 자연 흐름 | — | neutral | — |

### 카피 (한국어)

**bigTypography 중앙:**
- 확정: **"VS"** (2자, 로마자) — amber tone, text-shadow로 WARNING 의미 강조
- 한글 대안 (필요 시): **"맞섬"** (2자) / **"정면 충돌"** (4자)
- 권장: "VS" — 로마자 자체로 충돌 의미가 통문화적, 디자인 임팩트 강함

**좌 panel 카피 (A 주장 요약, 동적 주입):**
- 형식: A의 핵심 주장 한 줄 요약 — 게임 엔진이 동적 주입
- 길이 권장: 12~20자
- 예시 (spouse-01 d-2 가정): "출금은 정상 사용처였다" / "기록은 절차대로였습니다"
- **진실 누설 주의**: NPC 직접 발언 surface만 사용. 시스템 판단/해석 부가 X

**우 panel 카피 (B 주장 요약, 동적 주입):**
- 동일 규칙. A와 화자색 반대
- 예시: "사용처를 끝까지 숨기고 있다" / "흐름이 일관되지 않습니다"

**카피 의도**
- 차원: 긴장 (대립 차원)
- 톤: 명사형/단정형. 양측 모두 시스템 메시지 톤 X — **NPC 발언 요약**이라 직접 인용 톤 OK (단, 짧게)
- 길이: 중앙 2자 / 좌·우 각 12~20자
- 진실 누설 체크: **통과 (조건부)**. 좌·우 카피는 NPC 발언 surface 요약만 사용 — 엔진 wire 시 surface 카피 슬롯에서 추출 (Track A wire 검증 필요)

### Codex wire 권장 파라미터

```ts
// CourtBeatClash conflict variant 확장
enqueueFeedback({
  kind: 'conflict',
  intensity: 'impact',
  cue: 'contradiction',
  layoutVariant: 'split-vs',  // 신규
  visualEffects: ['screen-freeze', 'screen-shake-light'],
  effectTiming: 'before',  // freeze가 먼저
  bigTypography: { text: 'VS', durationMs: 1000, tone: 'amber-warning' },
  splitContent: {
    left: { partyId: 'a', text: /* A 주장 요약 */ },
    right: { partyId: 'b', text: /* B 주장 요약 */ },
  },
})
```

- freeze 구현: `* { animation-play-state: paused }` 200ms 적용 + setTimeout 해제
- 좌우 panel border = 화자색 `.30` (alpha) — 기존 v3 토큰 사용 (`feedback_play_scene_v3_consolidation` 화자색 보존)
- VS 텍스트는 amber `#ffb347` + text-shadow `0 0 8px rgba(255,179,71,0.6)` 권장
- A/B partyId는 case config에서 받아서 일관 — 좌=plaintiff(A), 우=defendant(B) 고정

### 빈도 제한
- case 8회 hard cap 적용
- 같은 (A 주장 ID, B 주장 ID) 쌍은 1회 (재충돌 시 일반 conflict modal만)

---

## §4. Beat 4: 판결 진입 (일반)

### 트리거
- 게임 시점: phase 6 → phase 7 전환 시점
- 트리거 조건: `phaseSlice.advancePhase` 또는 phase transition observer가 phase 7 진입 직전 호출
- 빈도: case당 1회 (phase 7은 1회만 도달)

### 학습 의도
"결정의 순간 — 사건이 끝을 향한다"

### 타임라인 (총 2.5초)

| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | phase 6 마지막 프레임 (review montage 종료 직후) | — | neutral | — |
| 0.10s | screen blackout 시작 (400ms fade to black) | silence (모든 BGM duck -20dB) | — | — |
| 0.50s | 화면 완전 검정. **짧은 침묵 300ms** — 의도적 정적 | silence | — | — |
| 0.80s | 망치 클로즈업 SVG/이미지 fade-in 시작 (400ms) — 중앙에서 약간 상단 | — | — | — |
| 1.20s | 망치 fully visible. bigTypography fade-in 300ms — 망치 아래 100px | — | — | **"최종 판단"** (대형) |
| 1.50s | hold (망치 + 카피 동시) | low rumble (점진 증폭) | — | hold |
| 1.80s | **gavel SFX** `playCutsceneSfx('verdict_gavel')` (기존 재활용) | gavel hit | — | hold |
| 1.85s | screen-flash-white 200ms (white 100% → 정상) | — | — | — |
| 2.10s | phase 7 화면 fade-in 시작 (400ms). 망치·bigTypography는 white flash로 자연 소실 | BGM 정상 복귀 (verdict track) | — | — |
| 2.50s | 종료. phase 7 화면 정상 표시 | — | neutral | — |

### 카피 (한국어)

**bigTypography (대형, 망치 아래):**
- 1차 안: **"최종 판단"** (4자)
- 대안: "판결의 시간" (5자) / "결정의 순간" (5자) / "판단을 내릴 시간" (8자) / "재판관의 시간" (6자)
- 권장: "최종 판단" — 단정형 명사, 4자 임팩트, "판결"이라는 결과 어휘 회피하면서 의미 전달

**카피 의도**
- 차원: 긴장 (전환 차원)
- 톤: 묵직한 단정형 명사. 시스템 메시지 톤 OK
- 길이: 4~6자
- 진실 누설 체크: **통과**. 사건 결과·진실 미포함

### Codex wire 권장 파라미터

```ts
// 신규 cutscene type 또는 기존 verdict_gavel variant 확장
verdictEntryCutscene({
  blackoutMs: 400,
  silenceMs: 300,
  gavelFadeInMs: 400,
  bigTypography: { text: '최종 판단', durationMs: 1000 },
  gavelSfxAt: 1800,  // ms after trigger
  whiteFlashMs: 200,
  phase7FadeInMs: 400,
  totalMs: 2500,
})
```

- blackout: PC root에 `pc-verdict-blackout` className 적용 (`background: black, z-index: top-overlay`)
- 망치 SVG: 기존 verdict_gavel cutscene asset 재활용 가능하면 우선 (Track A 판단)
- gavel SFX는 기존 `playCutsceneSfx('verdict_gavel')` 그대로 호출 — 본 비트는 cutscene 엔트리포인트만 신규
- white flash 종료와 phase 7 fade-in을 100ms overlap → 자연스러운 컷
- 스킵 불가 권장 (2.5s 짧음). Esc로 스킵 가능하게 할 경우 white flash까지 1.85s 시점만 스킵 허용

### 빈도 제한
- case당 1회 (phase 7 진입 자체가 1회)
- vfxHierarchyEngine hard cap과 별개로 카운트 — phase transition cutscene은 별도 슬롯

---

## §5. Beat 5: spouse-01 h-d3 책임 축 반전 (T3 — 사건 최고점, 1회)

### 트리거
- 게임 시점: spouse-01 h-d3 emerge 시점 — `emergenceHooks` `'h-d3'` (`공동 자금 해지 절차`) 화제 전환 hook 발화와 동시
- 트리거 조건: h-d3 emerge 조건 충족 + Track A가 `tier='T3'` 마킹 후 `vfxHierarchyEngine`이 T3 cap=1 슬롯에서 통과 판정
- 빈도: spouse-01 사건당 **최대 1회**. T3 cap=1 (hard cap 8회와 별개 슬롯)
- 본 비트는 일반 Beat 1과 **별도 비트**로 동작 (h-d3 emerge 시 Beat 1 대신 Beat 5만 발동)

### 학습 의도
**"사건의 진짜 구도가 보인다 — 지금까지의 추궁이 다시 보인다"**

플레이어가 그동안 쌓아온 추궁 방향(A=지석 비밀 송금자 / B=세린 의심 제기자)이 흔들리는 순간. 결과(권한 결손·조작)는 NPC가 답해야 드러난다.

### 타임라인 (총 3.5초)

| 시간 | 화면 | 사운드 | portrait | 카피 |
|---|---|---|---|---|
| 0.00s | 정상 화면. h-d3 emerge 트리거 | — | active | — |
| 0.05s | screen-freeze 200ms — 모든 애니메이션·BGM duck -30dB | freeze + sub-bass drop (-12dB) | freeze | — |
| 0.10s | screen-flash-dark 400ms — 깊은 어둠 플래시 (기존 `v4-dark-flash` 0.3s를 0.4s로 확장) | — | freeze | — |
| 0.30s | **portrait-desaturate 1000ms** — 모든 NPC portrait (A + B + 증인 등) 채도 0.4로 빠짐. 사건 톤 변환 신호 | low pulse 시작 (subtle, 4Hz) | desaturated | — |
| 0.40s | vignette-strong 700ms (전체 화면 가장자리 어둠) | — | — | — |
| 0.50s | screen-shake-heavy 600ms / 8px — 가장 무거운 흔들림 | heavy thud + sustained low | desaturated + tremor | — |
| 0.80s | (애니 재개) freeze 해제 — desaturate / vignette / shake는 유지 | — | desaturated | — |
| 1.00s | **bigTypography fade-in 400ms** — 중앙. 약간 크게 (Beat 1보다 14% 크게 권장) | tension peak | hold | **"책임의 축이 뒤집힌다"** |
| 1.40s | bigTypography hold | low pulse 유지 | hold | hold |
| 2.00s | shake 종료. desaturate / vignette는 유지 | — | hold | hold |
| 2.20s | **subtitle fade-in 300ms** — bigTypography 아래 100px. amber `#ffb347` tone (WARNING 의미) | — | hold | (subtitle) |
| 2.50s | hold (bigTypography + subtitle 동시) | low pulse 페이드 | hold | hold |
| 3.00s | bigTypography + subtitle fade-out 시작 (400ms) | resolve (저음 dissipate) | desaturated → 채도 복귀 시작 (400ms) | fade |
| 3.40s | vignette fade-out 시작 | — | neutral 복귀 | — |
| 3.50s | 종료. NPC hook 발화 (`'h-d3'` confession/attack/resignation variant)는 본 비트 종료 직후 자연 흐름 | — | neutral | — |

### 카피 (한국어) — bigTypography 후보 5안

| # | 후보 | 길이 | 톤 | 의도 | 진실 누설 체크 |
|---|---|---|---|---|---|
| **A** | **책임의 축이 뒤집힌다** | 10자 | 단정·관찰자 서술체 | "축" = 추궁의 방향성 추상. "뒤집힌다" 동사로 전환 명확 | 통과 ✓ |
| B | 구도가 무너진다 | 8자 | 단정 | "구도" = 사건 인지 구조 추상. 더 짧고 임팩트 강함 | 통과 ✓ |
| C | 사건의 무게가 옮겨간다 | 11자 | 관찰자 서술체 | "무게" 비유 — 시적·문학적 | 통과 ✓ |
| D | 추궁의 방향이 바뀐다 | 10자 | 단정·관찰자 | "추궁 방향" 게임 메커니즘 직접 신호 — 학습 차원 강함 | 통과 ✓ |
| E | 지금까지의 추궁이 흔들린다 | 13자 | 단정·관찰자 | 플레이어가 쌓은 가설 자체가 흔들린다는 메타 신호 | 통과 ✓ |

**추천: A "책임의 축이 뒤집힌다"** — 의뢰서 §B.5에서 사용자 1차 제시한 카피. "책임" = 사건 전반 어휘로 누설 영역 아님, "축이 뒤집힌다" = 가장 명확한 전환 메타포. 10자로 시각 무게 충분.

**다음 권장: D "추궁의 방향이 바뀐다"** — 학습 차원 강함. 플레이어가 "어디를 추궁해야 하는가" 게임 메커니즘과 직결.

### 카피 (한국어) — subtitle 후보 4안

amber tone, bigTypography 아래.

| # | 후보 | 길이 | 의도 | 진실 누설 체크 |
|---|---|---|---|---|
| **a** | **지금까지의 추궁이 다시 보인다** | 14자 | 메타 회고 — 플레이어가 누적 가설을 재평가 | 통과 ✓ |
| b | 물어야 할 사람이 달라졌다 | 12자 | A vs B 추궁 대상 전환 신호 — 직접적 | 통과 ✓ ("사람" 추상, 특정 인물명 X) |
| c | 처음 본 구도가 흔들린다 | 12자 | 사건 초반 인지 구조 와해 신호 | 통과 ✓ |
| d | 사건의 무게중심이 옮겨간다 | 13자 | "무게중심" 비유 — bigTypography C와 짝 권장 안 함 (중복) | 통과 ✓ |

**추천: a "지금까지의 추궁이 다시 보인다"** — 메타 차원에서 플레이어 누적 가설을 재평가하게 만드는 가장 강한 신호. bigTypography A와 짝지을 때 자연스러움.

### 진실 누설 체크 (Beat 5 전수)

[feedback_truth_leak_prohibition.md](../../../memory/feedback_truth_leak_prohibition.md) §"spouse-01 (가장 위험)" 적용:

| 검사 어휘 | 후보 A | B | C | D | E | subtitle a | b | c | d |
|---|---|---|---|---|---|---|---|---|---|
| "위임장" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "조작" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "공동" / "적금" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "권한" / "동의" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "형" / "조카" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "지석" / "세린" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |
| "비자금" / "투자" | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ | X ✓ |

**전수 통과**. 모든 후보가 추상 어휘만 사용 — 결과·진실 직접 언급 0건.

### Codex wire 권장 파라미터

```ts
// Beat 5 — T3 전용. h-d3 emerge 시 일반 Beat 1 대신 본 비트 발동
enqueueFeedback({
  kind: 'emergence',
  intensity: 'breakthrough',
  cue: 'truth',
  tier: 'T3',  // 신규 — vfxHierarchyEngine T3 슬롯
  visualEffects: [
    'screen-freeze',
    'screen-flash-dark',
    'portrait-desaturate',
    'vignette-strong',
    'screen-shake-heavy',
  ],
  effectTiming: 'before',  // freeze가 먼저
  bigTypography: {
    text: '책임의 축이 뒤집힌다',
    durationMs: 1800,  // fade-in 400 + hold 1000 + fade-out 400
    sizeScale: 1.14,  // Beat 1 대비 14% 크게
  },
  subtitle: {
    text: '지금까지의 추궁이 다시 보인다',
    durationMs: 1100,  // fade-in 300 + hold 500 + fade-out 300 (subtitle은 bigTypography보다 늦게 시작)
    tone: 'amber-warning',
  },
  // NPC hook 발화는 본 비트 종료 후 (3500ms+) 자연 흐름
})
```

- 비트 시작 시 BGM duck -30dB (Beat 4 verdict 수준)
- portrait-desaturate는 화면 내 **모든** portrait에 동시 적용 (A·B·증인) — 사건 톤 전환 신호
- shake-heavy 600ms / 8px는 본 게임 내 **가장 무거운** 흔들림으로 예약 (다른 비트와 격 차별)
- vfxHierarchyEngine T3 cap=1 슬롯에서만 통과. 같은 case 재 emerge X
- 7일 cooldown 정책은 본 비트에 미적용 (사건당 1회 보장)

### 빈도 제한
- **T3 cap=1, case당 최대 1회**
- 일반 hard cap 8회와 별개 슬롯
- 본 비트 발동 시 일반 Beat 1 (`emergence` Beat) 발동 안 함 (같은 트리거에서 둘 다 X)
- spouse-01 한정. family-01 / friend-01에는 본 비트 wire X (후속 사건별 T3 패턴 복제 시 별도 의뢰)

---

## §6. 차별화 매트릭스 (5개 비트 비교)

| 비트 | duration | shake | freeze | flash | desaturate | bigTypography | subtitle | tier |
|---|---|---|---|---|---|---|---|---|
| Beat 1 새 쟁점 | 1.8s | medium 4px | — | dark 300ms | — | "새로운 쟁점" | dispute label | 일반 |
| Beat 2 evidence hit | 1.5s | light 2px | — | — | — | (없음) | (없음, label만) | 일반 |
| Beat 3 conflict | 2.0s | light 2px | 200ms | — | — | "VS" (amber) | 좌·우 주장 요약 | 일반 |
| Beat 4 verdict 진입 | 2.5s | — | — | white 200ms (+blackout 400ms) | — | "최종 판단" | (없음) | phase-1회 |
| **Beat 5 h-d3 (T3)** | **3.5s** | **heavy 8px** | **200ms** | **dark 400ms** | **1000ms (all portrait)** | "책임의 축이 뒤집힌다" (14% 크게) | "지금까지의 추궁이 다시 보인다" (amber) | **T3 cap=1** |

**Beat 5 차별화 검증:**
- duration: Beat 5만 3.5s, 다른 모두 ≤2.5s (40%+ 차이) ✓
- shake: Beat 5만 heavy 8px, 다른 모두 ≤4px (2배 차이) ✓
- 효과 조합: Beat 5만 freeze + flash + desaturate + shake-heavy + vignette **모두** 사용. 다른 비트는 일부만 ✓
- desaturate: Beat 5 **단독 사용** ✓
- subtitle amber: Beat 3 "VS"와 Beat 5만 amber tone — Beat 5는 subtitle 자체로 amber (Beat 3는 bigTypography로 amber) ✓
- tier: Beat 5만 T3, 별도 cap 슬롯 ✓

→ **명확히 차별 완료**. 의뢰서 §B.4 "h-d3는 사건 최고점. 카피·연출 모두 다른 4개와 명확히 차별" 요건 충족.

---

## §7. Codex(Track A) 통합 권장 요약

본 §7은 Track A wire 시 §1~§5 산출을 합산한 인덱스.

### 7.1. visualEffects 토큰 사용 매트릭스

| 토큰 | Beat 1 | Beat 2 | Beat 3 | Beat 4 | Beat 5 |
|---|---|---|---|---|---|
| `screen-shake-light` | — | ✓ 200ms | ✓ 200ms | — | — |
| `screen-shake-medium` | ✓ 350ms | — | — | — | — |
| `screen-shake-heavy` | — | — | — | — | ✓ 600ms |
| `screen-flash-white` | — | — | — | ✓ 200ms | — |
| `screen-flash-dark` | ✓ 300ms | — | — | (blackout 400ms로 대체) | ✓ 400ms |
| `screen-freeze` | — | — | ✓ 200ms | — | ✓ 200ms |
| `vignette-strong` | ✓ 700ms | — | — | — | ✓ 700ms |
| `portrait-shake` | — | ✓ (target NPC) | — | — | — |
| `portrait-desaturate` | — | — | — | — | ✓ 1000ms (all) |
| `card-slam` | — | ✓ 400ms | — | — | — |

### 7.2. bigTypography 카피 인덱스

| 비트 | 텍스트 | 자수 | durationMs | 비고 |
|---|---|---|---|---|
| Beat 1 | "새로운 쟁점" | 5 | 1000 | subtitle = dispute.label (동적) |
| Beat 2 | (없음) | — | — | label "결정적 단서" 별도 chip |
| Beat 3 | "VS" | 2 | 1000 | amber tone |
| Beat 4 | "최종 판단" | 4 | 1000 | — |
| Beat 5 | "책임의 축이 뒤집힌다" | 10 | 1800 | sizeScale 1.14, subtitle "지금까지의 추궁이 다시 보인다" (amber) |

### 7.3. intensity / effectTiming

| 비트 | intensity | effectTiming | cue |
|---|---|---|---|
| Beat 1 | impact | during | truth |
| Beat 2 | breakthrough | during | evidence |
| Beat 3 | impact | before (freeze 선행) | contradiction |
| Beat 4 | breakthrough | during | truth |
| Beat 5 | breakthrough | before (freeze 선행) | truth |

### 7.4. 다국어 합류

- 본 산출 한국어 카피는 모두 **다국어 합류 대상**.
- 카피 풀:
  - Beat 1 "새로운 쟁점"
  - Beat 2 "결정적 단서"
  - Beat 3 "VS" (로마자, 번역 면제)
  - Beat 4 "최종 판단"
  - Beat 5 "책임의 축이 뒤집힌다"
  - Beat 5 subtitle "지금까지의 추궁이 다시 보인다"
- 합류 위치: `docs/localization/non-dialogue-extract/batches/` 새 batch 또는 `batch_13_global_ui_part1.csv` 합류 (튜토리얼 UI 카피와 같은 방식)
- 사용자 결정 항목 (master-task.md §7): h-d3 후보 5안 중 최종 1안 확정 후 합류

---

## §8. 검토 체크리스트 self-check (§B.6 본 체크)

- [x] 5개 비트 모두 스토리보드 작성 → §1~§5
- [x] 카피 진실 누설 0 (특히 Beat 5) → §5 진실 누설 체크 매트릭스 전수 통과
- [x] 각 비트의 visualEffects 권장 배열 명시 → §1~§5 각 "Codex wire 권장 파라미터" + §7.1 통합 매트릭스
- [x] duration 합계가 비트당 권장 범위 내 → §6 비교표 (Beat 1·2·3·4 = 1.5~2.5s / Beat 5 = 3.5s, 모두 §B.4 가이드 부합)
- [x] h-d3 비트가 다른 4개와 명확히 차별 → §6 차별화 매트릭스 (duration·shake·desaturate·tier 4축 차별 검증)

**모든 체크 항목 통과.**

---

## §9. 사용자 결정 요청

본 산출 적용 전 사용자 결정 필요 항목 (master-task.md §7과 합류):

1. **Beat 5 bigTypography 최종 1안**
   - 추천: A "책임의 축이 뒤집힌다" (의뢰서 1차 제시)
   - 대안: B "구도가 무너진다" (가장 짧음) / D "추궁의 방향이 바뀐다" (학습 차원 강함)

2. **Beat 5 subtitle 최종 1안**
   - 추천: a "지금까지의 추궁이 다시 보인다"
   - 대안: b "물어야 할 사람이 달라졌다" / c "처음 본 구도가 흔들린다"

3. **Beat 2 label 어휘**
   - 추천: "결정적 단서" (5자)
   - 짧은 대안: "정통" (2자) / "급소" (2자) / "결정타" (3자)

4. **Beat 3 중앙 텍스트**
   - 추천: "VS" (로마자, 임팩트 강함, 번역 면제)
   - 한글 대안: "맞섬" (2자) / "정면 충돌" (4자)

5. **Beat 4 bigTypography**
   - 추천: "최종 판단" (4자)
   - 대안: "결정의 순간" (5자) / "판결의 시간" (5자)

ClaudeCode 메인 세션에서 사용자 결정 받은 뒤 Track A wire 시 본 인덱스 갱신.

---

## §10. 사용자 확정 카피 (2026-05-18 메인 세션)

사용자 결정 결과. Track A wire 시 본 §10을 권위로 함.

**Beat 1 (새 쟁점 등장)**
- bigTypography: **"새로운 쟁점"** (5자, durationMs 1000)
- subtitle: `dispute.label` 동적 주입

**Beat 2 (증거 hard hit)**
- chip label: **"결정적 단서"** (5자)
- bigTypography 미사용

**Beat 3 (판단 충돌)**
- bigTypography: **"VS"** (2자, 로마자, amber tone, durationMs 1000)
- 좌·우 panel: A/B 주장 요약 동적 주입
- 다국어 번역 면제 (로마자 그대로)

**Beat 4 (판결 진입)**
- bigTypography: **"최종 판단"** (4자, durationMs 1000)

**Beat 5 (h-d3 T3, spouse-01 한정)**
- bigTypography: **"사건이 완전히 다르게 보인다"** (14자, durationMs 1800, sizeScale 1.14)
- subtitle: **"어디서부터 어긋났을까"** (10자, amber tone, durationMs 1100)

### 진실 누설 재검증

새 Beat 5 카피 [feedback_truth_leak_prohibition.md](../../../memory/feedback_truth_leak_prohibition.md) 검사 어휘 매트릭스:

| 검사 어휘 | "사건이 완전히 다르게 보인다" | "어디서부터 어긋났을까" |
|---|---|---|
| 위임장 / 조작 | 미포함 ✓ | 미포함 ✓ |
| 공동 / 적금 | 미포함 ✓ | 미포함 ✓ |
| 권한 / 동의 | 미포함 ✓ | 미포함 ✓ |
| 형 / 조카 | 미포함 ✓ | 미포함 ✓ |
| 지석 / 세린 | 미포함 ✓ | 미포함 ✓ |
| 비자금 / 투자 | 미포함 ✓ | 미포함 ✓ |

**전수 통과**. 추상 메타 어휘만 사용 (사건/완전/다르/보인다/어디/어긋).

### 어조 차별화 재검증

| 카피 | 톤 | 자연성 |
|---|---|---|
| "사건이 완전히 다르게 보인다" | 메타 신호 / 단정형 평어 | 한국어 자연 발화 ✓ |
| "어디서부터 어긋났을까" | 자기 회고 / 의문 어조(부호 없음) | 한국어 자연 입말 ✓ |

신문체·번역체 ("축이 뒤집힌다 / 구도가 무너진다") 회피 완료. 사용자 피드백 반영.

### 다국어 합류 풀 (확정)

| 카피 | 다국어 합류 대상 |
|---|---|
| "새로운 쟁점" | ✓ |
| "결정적 단서" | ✓ |
| "VS" | ✗ (번역 면제) |
| "최종 판단" | ✓ |
| "사건이 완전히 다르게 보인다" | ✓ |
| "어디서부터 어긋났을까" | ✓ |

합류 위치: `docs/localization/non-dialogue-extract/batches/` — `batch_13_global_ui_part1.csv` 또는 별도 mini-batch. 튜토리얼 12행과 동일 흐름으로 처리.

---

작성 완료. 사용자 확정 카피 §10 반영. Track A wire 가능 상태.
