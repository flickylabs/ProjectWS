# PC UI 디자인 시스템 가이드

> **목적**: Phase 1~2(사전 진술 / 심문) 화면에서 정립된 디자인 시스템을 표준화해 모든 PC 화면(Phase 3, Home, Intro, 사건 선택, 프로필, 설정, 판결, 결과)에 일관되게 적용한다.
>
> **버전**: v1.0 — 2026-04-25
>
> **참조 파일**: `src/app/pc.css`, `src/app/index.css`, `src/components/pc/layout/PCDialogueLog.tsx`

---

## 1. 디자인 철학 (Tone & Manner)

### 핵심 키워드
- **다크 우드 (Dark Wood)** — 법정·서재의 무게감. `#0d0e12` ~ `#1c1f26` 톤
- **골드 강조 (Judicial Gold)** — 재판관·시스템 권위. `#d4a24e` 단일 강조색
- **당사자 식별 (Party Color)** — A=블루(#5b8def), B=레드(#e06060)
- **글래스모픽 (Glassmorphic)** — 반투명 패널 + 6px 블러 + 골드 림 라이트
- **그레인 텍스처 (Grain)** — SVG fractalNoise로 모든 카드/말풍선에 미세 노이즈 입혀 종이/우드 질감 부여
- **감정 시각화 (Emotion-driven Animation)** — NPC 감정을 말풍선 애니메이션으로 표현 (분노=빨강 펄스, 흔들림=블루 미세 진동, 체념=탈채도, 자백=보라 글로우)

### 무엇을 피할 것
- ❌ 순백색(#fff) 텍스트 — 항상 따뜻한 오프화이트(`#ede3cc`)
- ❌ 채도 높은 원색 — 게임 의미 색(블루/레드/골드/올리브) 외에는 무채색 계열
- ❌ 직각/날카로운 모서리 — 최소 6px radius (지나치게 둥글지도 않음, 12px가 표준)
- ❌ 고정된 솔리드 배경 — 패널은 그라디언트 + 블러 + 그레인 조합

---

## 2. 컬러 토큰

### 2.1 코어 팔레트 (정립됨, `pc.css :root`)

```css
/* === 골드 (재판관 / 권위 / 강조) === */
--pc-gold:        #d4a24e;
--pc-gold-light:  #e8c172;
--pc-gold-bright: #f0d890;
--pc-gold-dim:    #8b6914;

/* === 우드 (배경 레이어) === */
--pc-wood-deep:      #0d0e12;  /* 페이지 끝 / 가장 깊은 그림자 */
--pc-wood-dark:      #12141a;  /* 패널 베이스 */
--pc-wood-medium:    #1c1f26;  /* 본문 fallback */
--pc-wood-highlight: #3a3d47;  /* 림 라이트 / 강조 */
--pc-wood-warm:      #5a5f6c;  /* 따뜻한 림 글로우 */

/* === 당사자 식별 === */
--pc-blue:    #5b8def;  /* A */
--pc-red:     #e06060;  /* B */
--pc-amber:   #d4a24e;  /* 재판관 (= --pc-gold 동일, 통합 권장) */
--pc-witness: #9ba87a;  /* 증인 (올리브-골드 블렌드) */
--pc-purple:  #9b7be8;  /* 자백 / 결정적 순간 */
--pc-green:   #5cc97a;  /* 성공 / 해금 */

/* === 텍스트 === */
--pc-text:       #ede3cc;  /* 본문 (warm off-white) */
--pc-text-dim:   #b5a888;  /* 보조 / 라벨 */
--pc-text-muted: #857b68;  /* 캡션 / placeholder */

/* === 패널 그라디언트 === */
--pc-panel-bg:        linear-gradient(180deg, rgba(18,19,24,0.42), rgba(13,14,18,0.52));
--pc-panel-bg-strong: linear-gradient(180deg, rgba(18,19,24,0.54), rgba(13,14,18,0.64));
--pc-panel-bg-soft:   linear-gradient(180deg, rgba(26,28,34,0.30), rgba(18,19,24,0.42));

/* === 패널 보더 === */
--pc-panel-border:        rgba(212, 162, 78, 0.22);  /* 표준 */
--pc-panel-border-strong: rgba(212, 162, 78, 0.40);  /* 강조 */
--pc-panel-border-soft:   rgba(212, 162, 78, 0.12);  /* 미묘 */

/* === 그림자 / 림 === */
--pc-panel-shadow: 0 14px 34px rgba(0, 0, 0, 0.42);
--pc-panel-inset:  inset 0 1px 0 rgba(255, 255, 255, 0.06);
```

### 2.2 신규 추가 권장 토큰 (가이드 적용 시 정립)

```css
/* === 간격 (4px scale) === */
--pc-space-xs:  4px;
--pc-space-sm:  8px;
--pc-space-md:  12px;
--pc-space-lg:  16px;
--pc-space-xl:  20px;
--pc-space-2xl: 24px;
--pc-space-3xl: 28px;
--pc-space-4xl: 36px;

/* === 보더 반경 === */
--pc-radius-sm:   6px;   /* 배지 / chip */
--pc-radius-md:   12px;  /* 표준 카드 / 말풍선 */
--pc-radius-lg:   18px;  /* 큰 카드 (증거, 사건) */
--pc-radius-xl:   24px;  /* 모달 / 메인 카드 */
--pc-radius-pill: 999px; /* 알약 / 토글 */

/* === 백드롭 블러 === */
--pc-blur-light:  blur(6px);                  /* 말풍선 / 카드 */
--pc-blur-modal:  blur(16px) saturate(1.4);   /* 모달 / 오버레이 */

/* === 전환 === */
--pc-transition-fast:     0.08s ease;   /* 클릭/액티브 */
--pc-transition-standard: 0.15s ease;   /* 컬러/테두리 */
--pc-transition-slow:     0.18s ease;   /* 호버 lift */

/* === 폰트 사이즈 === */
--pc-font-hero:     74px;  /* 결과 hero */
--pc-font-h1:       38px;  /* 화면 제목 */
--pc-font-h2:       22px;  /* 섹션 제목 */
--pc-font-body-lg:  18px;  /* 말풍선 본문 */
--pc-font-body:     15px;  /* 카드 본문 */
--pc-font-label:    14px;  /* 화자/라벨 */
--pc-font-small:    12px;  /* 캡션 / 보조 */
--pc-font-tiny:     11px;  /* 마이크로 라벨 */

/* === 라인 높이 === */
--pc-leading-tight:   1.0;   /* hero / 큰 제목 */
--pc-leading-snug:    1.35;  /* 라벨 */
--pc-leading-normal:  1.6;   /* 캡션 */
--pc-leading-relaxed: 1.74;  /* 말풍선 본문 */
```

### 2.3 시멘틱 컬러 매핑 (시스템 메시지)

| 의미 | 베이스 | 보더 | 배경 (활성) |
|---|---|---|---|
| **재판관/권위** | `--pc-gold` | `rgba(212,162,78,0.45)` | `rgba(212,162,78,0.08)` |
| **모순/공격** (action) | `--pc-red` | `rgba(224,96,96,0.25)` | `rgba(224,96,96,0.10)` |
| **해금/성공** (unlock) | `--pc-green` | `rgba(96,192,144,0.20)` | `rgba(96,192,144,0.10)` |
| **경고/차단** (warning) | `#f0a060` | `rgba(240,160,60,0.25)` | `rgba(240,160,60,0.12)` |
| **정보/연결** (info) | `--pc-blue` | `rgba(91,141,239,0.25)` | `rgba(91,141,239,0.12)` |
| **증인** (witness) | `--pc-witness` | `rgba(80,180,170,0.20)` | `rgba(80,180,170,0.10)` |
| **자백/결정적** (confession) | `--pc-purple` | `rgba(167,139,250,0.30)` | `rgba(167,139,250,0.12)` |

---

## 3. 타이포그래피

### 3.1 폰트 스택
- 본문: 시스템 sans (한글 자동 fallback)
- **권장**: 한글 전용 폰트 도입 검토 (예: Pretendard, Noto Sans KR)
- 숫자 강조: tabular-nums 사용

### 3.2 타입 스케일

| 레벨 | 크기 | 무게 | 라인 | 사용 예 |
|---|---|---|---|---|
| **Hero** | 74px | 900 | 1.0 | 결과 점수, 칭호 |
| **H1** | 38px | 800 | 1.1 | 화면 제목 (Phase, 사건명) |
| **H2** | 22px | 800 | 1.2 | 섹션 제목 (증거, 쟁점) |
| **Body Large** | 18px | 400 | 1.74 | 말풍선 본문 |
| **Body** | 15px | 400 | 1.7 | 카드 설명, 일반 본문 |
| **Label** | 14px | 700~800 | 1.35 | 화자명, 버튼 |
| **Small** | 12px | 700 | 1.6 | 시스템 메시지, 라벨 |
| **Tiny** | 11px | 700 | 1.5 | 캡션, 배지 |

### 3.3 한글 처리
- `word-break: keep-all;` (말줄임 방지, 어절 단위 줄바꿈)
- `letter-spacing: -0.02em;` (큰 제목)
- `letter-spacing: 0.02em;` (작은 라벨, 시스템 메시지)

### 3.4 컬러 매핑
- Body 본문: `--pc-text` (#ede3cc)
- 보조/라벨: `--pc-text-dim` (#b5a888)
- 캡션/플레이스홀더: `--pc-text-muted` (#857b68)
- 강조 텍스트: `--pc-gold-light` (#e8c172)

---

## 4. 버튼 컴포넌트 스펙

### 4.1 4종 변형

#### Primary (Gold) — 주요 액션
```css
.pc-btn-primary {
  background: rgba(212, 162, 78, 0.7);
  color: #07070c;
  border: none;
  border-radius: var(--pc-radius-md);
  padding: 12px 28px;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: var(--pc-transition-slow);
}
.pc-btn-primary:hover {
  background: rgba(212, 162, 78, 0.85);
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.2);
}
.pc-btn-primary:active {
  transform: translateY(0);
  filter: brightness(0.95);
}
```
**사용**: 판결 시작, 다음 단계 진행, 사건 선택, 메인 CTA

#### Secondary (Wood) — 보조 액션
```css
.pc-btn-secondary {
  background: var(--pc-wood-medium);
  color: var(--pc-text-dim);
  border: 1px solid var(--pc-panel-border-soft);
  border-radius: var(--pc-radius-md);
  padding: 10px 20px;
  font-weight: 700;
}
.pc-btn-secondary:hover {
  background: var(--pc-wood-highlight);
  border-color: var(--pc-panel-border);
}
```
**사용**: 모달 취소, 옵션 선택, 비주력 액션

#### Ghost — 인라인/툴바
```css
.pc-btn-ghost {
  background: transparent;
  color: var(--pc-text);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--pc-radius-sm);
  padding: 8px 14px;
}
.pc-btn-ghost:hover {
  background: rgba(212, 162, 78, 0.08);
  border-color: var(--pc-panel-border);
}
```
**사용**: 헤더 툴바, 인라인 토글, 카드 내 액션

#### Icon — 아이콘 전용
```css
.pc-btn-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--pc-radius-sm);
  background: rgba(18, 19, 24, 0.6);
  border: 1px solid var(--pc-panel-border-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pc-btn-icon:hover {
  background: rgba(212, 162, 78, 0.12);
  border-color: var(--pc-panel-border);
}
```

### 4.2 사이즈 변형

| 사이즈 | 패딩 | 폰트 | 사용처 |
|---|---|---|---|
| `sm` | 6px 10px | 11px | 핫바 아이콘, 조밀한 툴바 |
| `md` | 10px 16px | 13px | 표준 버튼 |
| `lg` | 12px 28px | 14px | 주요 CTA, 페이즈 진행 |
| `xl` | 16px 36px | 16px | 영웅 버튼 (게임 시작 등) |

### 4.3 비활성화 상태
```css
.pc-btn:disabled,
.pc-btn[aria-disabled="true"] {
  opacity: 0.45;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.04);
  color: #5a5e70;
}
```

---

## 5. 카드 / 패널 컴포넌트

### 5.1 표준 카드
```css
.pc-card {
  background: var(--pc-panel-bg);
  border: 1px solid var(--pc-panel-border);
  border-radius: var(--pc-radius-lg);
  padding: var(--pc-space-2xl);
  box-shadow: var(--pc-panel-shadow), var(--pc-panel-inset);
  backdrop-filter: var(--pc-blur-light);
  background-image: var(--pc-paint-grain);  /* SVG 그레인 */
}
```

### 5.2 강조 카드 (선택됨/활성)
```css
.pc-card.is-active {
  background: var(--pc-panel-bg-strong);
  border-color: var(--pc-panel-border-strong);
  box-shadow: var(--pc-panel-shadow), 0 0 24px -2px rgba(212, 162, 78, 0.35);
}
```

### 5.3 모달 (오버레이)
```css
.pc-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 12, 0.72);
  backdrop-filter: var(--pc-blur-modal);  /* blur(16px) saturate(1.4) */
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-modal {
  background: var(--pc-panel-bg-strong);
  border: 1px solid var(--pc-panel-border-strong);
  border-radius: var(--pc-radius-xl);
  padding: var(--pc-space-3xl);
  min-width: 480px;
  max-width: 720px;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6), var(--pc-panel-inset);
}
```

---

## 6. 시스템 메시지 / 배지 / Chip

### 6.1 시스템 메시지 밴드 (전폭)
```css
.pc-system-band {
  display: flex;
  width: 100%;
  min-height: 44px;
  padding: 10px 54px;
  border-top: 1px solid var(--pc-panel-border-soft);
  border-bottom: 1px solid var(--pc-panel-border-soft);
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.04) 15%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.04) 85%,
    transparent 100%);
  color: var(--pc-text-dim);
  font-size: 13px;
  letter-spacing: 0.02em;
  text-align: center;
}
```

### 6.2 Chip (작은 태그/배지)
```css
.pc-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--pc-space-xs);
  padding: 4px 10px;
  border-radius: var(--pc-radius-pill);
  background: rgba(212, 162, 78, 0.12);
  color: var(--pc-gold-light);
  font-size: var(--pc-font-tiny);
  font-weight: 700;
  border: 1px solid rgba(212, 162, 78, 0.25);
}
```

### 6.3 카운트 배지
```css
.pc-count-badge {
  display: inline-flex;
  width: 18px;
  height: 18px;
  border-radius: var(--pc-radius-pill);
  background: var(--pc-red);
  color: white;
  font-size: 10px;
  font-weight: 800;
  align-items: center;
  justify-content: center;
}
```

---

## 7. 애니메이션 / 전환

### 7.1 표준 타이밍

| 용도 | 시간 | Easing |
|---|---|---|
| 클릭/액티브 | 0.08s | ease |
| 컬러/보더 | 0.15s | ease |
| 호버 lift | 0.18s | ease |
| 모달 열림/닫힘 | 0.24s | cubic-bezier(0.2, 0.9, 0.3, 1.1) |
| 감정 펄스 | 1.4~2.2s | ease-in-out infinite |

### 7.2 키프레임 라이브러리 (재사용 가능)

```css
/* 호버 lift */
.pc-hover-lift:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.2);
  transition: var(--pc-transition-slow);
}

/* 등장 (페이드 + 슬라이드) */
@keyframes pc-fade-in-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 골드 펄스 (강조/준비됨) */
@keyframes pc-gold-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 162, 78, 0.4); }
  50%      { box-shadow: 0 0 24px 4px rgba(212, 162, 78, 0.55); }
}

/* 카드 등장 (스프링) */
@keyframes pc-card-pop {
  0%   { opacity: 0; transform: scale(0.92); }
  60%  { opacity: 1; transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
}
```

### 7.3 감정 애니메이션 (Phase 2 전용 — 다른 화면 X)

말풍선 감정 애니메이션(`bubble-emotion-angry`, `bubble-emotion-shaken` 등)은 **심문 단계 한정**으로 유지. Home/Intro/Settings 등에는 적용 안 함.

---

## 8. 레이아웃 그리드

### 8.1 게임플레이 (Phase 1~2 / 3) — 3패널
```css
.pc-play-app {
  display: grid;
  grid-template-columns: minmax(360px, 380px) minmax(0, 1fr) minmax(320px, 340px);
  grid-template-rows: 56px minmax(0, 1fr);
  min-width: 1280px;
}
```

### 8.2 단일 화면 (Home / Intro / 사건 선택 / 설정 / 프로필)
```css
.pc-screen {
  width: 100%;
  min-height: 100vh;
  padding: var(--pc-space-4xl) var(--pc-space-3xl);
  display: flex;
  flex-direction: column;
  gap: var(--pc-space-3xl);
}

.pc-screen__content {
  width: min(1240px, 100%);
  margin: 0 auto;
}
```

### 8.3 카드 그리드 (사건 선택)
```css
.pc-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--pc-space-xl);
}
```

---

## 9. 화면별 적용 체크리스트

신규/리뉴얼 화면 작성 시 다음 항목을 체크:

### 컬러
- [ ] 배경에 `--pc-wood-deep` 또는 `--pc-panel-bg` 사용
- [ ] 본문 텍스트 `--pc-text` (순백색 X)
- [ ] 강조/CTA에 `--pc-gold` 또는 `--pc-gold-light`
- [ ] 당사자 표시 시 `--pc-blue` (A) / `--pc-red` (B) 사용

### 타이포그래피
- [ ] 한글에 `word-break: keep-all` 적용
- [ ] 헤드라인 폰트 무게 800~900
- [ ] 본문 line-height 1.7+
- [ ] tabular-nums (숫자 정렬 시)

### 컴포넌트
- [ ] 모든 버튼이 4종 변형(primary/secondary/ghost/icon) 중 하나
- [ ] 카드는 `--pc-panel-bg` + `--pc-panel-border` + `--pc-blur-light`
- [ ] 모달은 `backdrop-filter: var(--pc-blur-modal)`
- [ ] 보더 반경 토큰 사용 (6/12/18/24/999)

### 인터랙션
- [ ] 호버 시 `transform: translateY(-1px)` + 그림자 강화
- [ ] 액티브 시 `transform: translateY(0)` + brightness(0.95)
- [ ] 비활성화 opacity 0.45 + pointer-events: none
- [ ] 전환 시간 토큰 사용 (0.08/0.15/0.18s)

### 그래픽 효과
- [ ] 패널에 그레인 텍스처(`--pc-paint-grain`) 옵션 적용
- [ ] 그림자 `--pc-panel-shadow` + `--pc-panel-inset` 조합
- [ ] 골드 펄스 애니메이션은 "강조/준비됨" 상태에만

### 한글 품질
- [ ] 합니다체 / 해요체 적절히 분리
- [ ] 시스템 메시지에 기계적 관찰문 금지 ("~이 확인됩니다" X)
- [ ] 호칭은 직접 인용 X, 간접 인용 O

---

## 10. 알려진 inconsistency / 정리 우선순위

### 즉시 정리
- `--pc-amber`와 `--pc-gold` 중복 → **`--pc-gold` 단일화**
- 100+ Tailwind override (`!important`) → tailwind.config로 사전 매핑

### 점진 정리
- spacing/radius/font 토큰 도입 + 기존 하드코딩 값 점진 치환
- box-shadow 변형 명명화 (`--pc-glow-party-a` 같이)
- focus state 패턴 정립 (키보드 내비게이션)

---

## 11. 변경 영향 범위

이 가이드의 토큰을 도입하면 영향받는 영역:
- `src/app/pc.css` — `:root` 토큰 섹션 확장
- 신규 파일: `src/app/pc-tokens.css` (선택, 토큰만 분리)
- 신규 화면 컴포넌트는 토큰 사용 강제
- 기존 화면(Home/Intro/사건 선택/판결/결과)은 점진 치환 (1차 변경 X)

**기존 동작 회귀 위험**: 토큰을 단순 추가만 하면 0. 기존 클래스에 토큰을 적용할 때만 시각적 변화 발생.
