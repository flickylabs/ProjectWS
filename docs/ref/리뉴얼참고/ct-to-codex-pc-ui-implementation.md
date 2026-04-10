# CT → Codex: PC UI React 구현 작업 요청

> 발신: CT (Claude Code)
> 수신: Codex (신규 스레드)
> 일시: 2026-04-08
> 유형: 구현 작업 위임

---

## 배경

PC(Steam) 버전의 프로토타입 HTML이 완성되어 있습니다 (`pc-prototype/index.html`, 2,400줄+). 이 프로토타입을 React + TypeScript + Tailwind 컴포넌트로 정확하게 이식하는 작업이 필요합니다.

현재 React 컴포넌트 초안이 있지만, **프로토타입과 심각하게 다른 상태**입니다:
- SVG 아이콘 시스템이 전혀 반영되지 않음 (이모지로 대체 중)
- 캐릭터 페이스 SVG (5종 감정별) 미반영
- 핫바 슬롯 크기, 패널 내 아이템 크기, 레이아웃 비율이 프로토타입과 불일치
- 증거 뷰어 세부 디자인 미반영
- 포커스 모드, 어코디언, 호버 하이라이트 등 인터랙션 미구현

**목표: `pc-prototype/index.html`을 React 컴포넌트로 pixel-level 재현**

---

## 프로젝트 구조 요약

```
기술 스택: React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS 4 + Zustand 5
빌드:      npm run dev:pc (포트 5174) / npm run build:pc (dist-pc/)
타입체크:  npx tsc -b --force (tsconfig.app.json 경유)
```

### 핵심 파일 위치

| 파일 | 역할 | 상태 |
|------|------|------|
| `pc-prototype/index.html` | **레퍼런스 (정답)** — CSS + SVG + HTML 전부 | 완성 |
| `index-pc.html` | PC 진입 HTML | 완성 |
| `src/app/pc-main.tsx` | PC 마운트 (StrictMode + ErrorBoundary) | 완성 |
| `src/app/PCApp.tsx` | PC 앱 루트 (Phase 라우팅) | 완성 |
| `src/app/pc.css` | PC CSS 오버라이드 (462줄) | **대폭 수정 필요** |
| `src/components/pc/layout/PCCourtLayout.tsx` | 3컬럼 메인 레이아웃 | **수정 필요** |
| `src/components/pc/layout/PCDialogueLog.tsx` | 채팅 말풍선 | **수정 필요** |
| `src/components/pc/panels/PCLeftPanel.tsx` | 좌패널 (쟁점/증거/미터/재판관) | **수정 필요** |
| `src/components/pc/panels/PCRightPanel.tsx` | 우패널 (대상/노트/타임라인) | **수정 필요** |
| `src/components/pc/hotbar/PCBottomDock.tsx` | 핫바 (6슬롯 × 3페이지) | **수정 필요** |
| `src/components/pc/evidence/` | 증거 뷰어 8종 (React) | **수정 필요** |
| `vite.config.pc.ts` | PC Vite 설정 | 완성 |

### 기존 모바일 컴포넌트 (참조용, 수정 불가)

```
src/components/actions/ActionPanel.tsx    — 심문/증거/스킬 탭 패널
src/components/layout/DialogueLog.tsx     — 모바일 채팅 (PC에서는 PCDialogueLog 사용)
src/store/useGameStore.ts                 — Zustand 스토어 (8슬라이스)
src/types/                                — 타입 정의
src/engine/                               — 게임 엔진 (48개 파일)
```

---

## 프로토타입의 핵심 설계 요소

### 1. SVG 아이콘 시스템 (`pc-prototype/index.html` 1238~1474줄)

프로토타입은 `<svg><defs>` 블록에 **20종+ SVG symbol**을 정의하고 `<use href="#id"/>` 방식으로 사용합니다.

#### 아이콘 목록

| ID | 용도 | 사용 위치 |
|----|------|----------|
| `i-gavel` | 로고 | 헤더 |
| `i-scale` | 법정 통제력 | 헤더 리소스 |
| `i-bolt` | 쟁점/번개 | 헤더, 좌패널 |
| `i-search` | 조사 토큰 | 헤더 |
| `i-clock` | 페이즈 | 헤더 필 |
| `i-sword` | 사실 추궁 | 핫바 슬롯 |
| `i-eye` | 동기 탐색 | 핫바 슬롯 |
| `i-heart` | 공감 접근 | 핫바 슬롯 |
| `i-brain` | 감정 분석 | 핫바 슬롯 |
| `i-shield` | 증거 감별 | 핫바 슬롯 |
| `i-doc` | 문서 증거 | 좌패널 증거, 뷰어 |
| `i-chat` | 채팅 증거 | 좌패널 증거, 뷰어 |
| `i-ledger` | 장부 증거 | 좌패널 증거, 뷰어 |
| `i-cam` | CCTV 증거 | 좌패널 증거, 뷰어 |
| `i-phone` | 통화/디바이스 | 좌패널 증거, 뷰어 |
| `i-sns` | SNS 증거 | 좌패널 증거, 뷰어 |
| `i-smartphone` | 디바이스 | 뷰어 |
| `i-person` | 인물 | 우패널, 증인 |
| `i-pin` | 핀 고정 | 우패널 노트 |
| `i-drop` | 누설 미터 | 좌패널 미터 |
| `i-conflict` | 모순 미터 | 좌패널 미터 |
| `i-hand` | 신뢰 미터 | 좌패널 미터 |
| `i-crown` | 재판관 등급 | 좌패널 |
| `i-flame` | 감정 | 우패널 |
| `i-bulb` | 시스템 메시지 | 채팅 |
| `i-gear` | 설정 | 헤더 |
| `i-lock` | 잠긴 슬롯 | 핫바 |
| `i-plus` | 빈 슬롯 | 핫바 |
| `i-send` | 전송 | 자유질문 |
| `i-judge` | 재판관 | 채팅 아바타 |

#### 캐릭터 페이스 SVG (5종 감정별)

| ID | 성별 | 감정 | 특징 |
|----|------|------|------|
| `i-man` | 남 | 기본 | 7:3 가르마 + 귀 + 보통 표정 |
| `i-man-confident` | 남 | 자신감 | 윙크 + 웃는 입 + ✦ |
| `i-man-defensive` | 남 | 경계 | 흘기는 눈 + 일자 입 + ··· |
| `i-woman` | 여 | 기본 | 단발 + 아이라인 + 볼터치 |
| `i-woman-shaken` | 여 | 동요 | 큰 눈 + 떨리는 입 + 땀방울 |
| `i-woman-angry` | 여 | 격앙 | V눈썹 + 벌린 입 + 핏줄 |
| `i-woman-resigned` | 여 | 체념 | ⌒⌒눈 + 작은 입 + 먹구름 |

**현재 React**: 이모지(`👨`, `👩`, `⚖️` 등)로 대체 중 → **SVG로 전부 교체 필요**

### 2. 레이아웃 (CSS Grid)

```css
.app {
  display: grid;
  grid-template-columns: 400px 1fr 380px;
  grid-template-rows: 52px 1fr;
  height: 100vh;
}
```

- 헤더: grid-column 1/-1 (전폭)
- 좌패널: 400px, 배경 `--p1`
- 중앙: 유동, 배경 `--bg` + ambient glow 3종 + vignette + watermark
- 우패널: 380px, 배경 `--p1`
- 하단 독: 센터 컬럼 하단 (gradient fade + hotbar bar + 좌우 character card)

### 3. 핫바 상세

```
┌─────────────────────────────────────────────────────────┐
│  [CharA 64px]   ┌────────────────────────┐  [CharB 64px] │
│  이름/감정/HP    │ 100×88 × 6 slots       │  이름/감정/HP  │
│                 │ F1·F2·F3 page tabs     │               │
│                 └────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

- 슬롯: **100×88px**, `linear-gradient(180deg, --p3, --p4)`, border 1.5px
- 키번호: 절대위치 좌상단, 13px bold, `rgba(0,0,0,.3)` 배경
- 호버: `translateY(-3px)`, `box-shadow: 0 6px 20px`
- 활성: gold border + gold bg gradient + `translateY(-4px)` + glow
- 빈 슬롯: dashed border
- 잠김: 대각선 줄무늬 오버레이 + opacity .35
- 캐릭터 카드: **64px 원형** face SVG, 이름(14px), 감정 badge, HP bar(56×4px)
- 페이지 탭: kbd 스타일 (F1/F2/F3), Tab 전환 힌트

### 4. 좌패널 섹션 상세

- 섹션 헤더: 12px uppercase, letter-spacing 0.12em, SVG 아이콘 14px
- **쟁점**: 넘버(13px) + 이름(**17px**) + LieState pill(12px bold, 색상별) + 어코디언 확장
- **증거**: **36×36 아이콘 박스**(rounded 8px, 배경 `--p3`) + 이름(**17px**) + 타입 badge
- **미터**: SVG 아이콘(16px) + 트랙(8px높이, `--p4`) + fill(gradient) + 값(14px tabular-nums)
- **재판관**: 3축 바(6px) + crown 아이콘 + 등급 텍스트

### 5. 우패널 섹션 상세

- **심문 대상**: **72×90px face card**(SVG, 감정별) + 22px 이름 + archetype tag(purple) + tell tag(blue)
- **LieState 바**: **32px 높이 세그먼트** 6개, 현재=gold 스케일 106%, 통과=red 25%, 잠김=`--p3`
- **감정 게이지**: 10px 트랙 + gold→red gradient fill + 틱마크 4개 + flame 아이콘
- **노트**: border-left 3px (gold=핀, red=모순, `--p4`=일반), 16px 텍스트
- **타임라인**: 수직선(2px) + 14px dot(completed=green filled, current=gold+glow, locked=dashed)

### 6. 채팅 말풍선

- 아바타: **44px 원형**, SVG face 사용 (재판관=`i-judge`, 남=`i-man-*`, 여=`i-woman-*`)
- 말풍선: padding 14px 20px, **18px** 텍스트, line-height 1.75, border-radius 18px
- A: 왼쪽 정렬, blue 색상계
- B: 오른쪽 정렬(flex-direction: row-reverse), red 색상계
- 재판관: 중앙 정렬, gold 색상계, max-width 68%
- 시스템: 중앙, gold pill (24px 라운드), 15px
- 감정별 버블 효과: angry=shake, resigned=opacity .6, confession=gold glow border

### 7. 증거 뷰어 (6종 타입별)

프로토타입의 CSS 클래스명과 구조:

| 타입 | CSS prefix | 특징 |
|------|-----------|------|
| bank | `.ev-bank-*` | 테이블, 의심 행 하이라이트, 금액 색상 |
| chat | `.ev-chat-*` | 좌/우 말풍선, 삭제 메시지(dashed), 읽음 표시 |
| contract | `.ev-doc-*` | 문서 배경(gold tint), 누락 행 하이라이트, 서명란 |
| testimony | `.ev-witness-*` | blockquote(border-left gold), 태그 카드, 관련 쟁점 |
| cctv | `.ev-cctv-*` | REC 표시, 타임라인 트랙+마커, 프레임 |
| log | `.ev-log-*` | 필터 탭, 테이블, 타입 뱃지(in/out/miss) |
| device | `.ev-device-*` | 스마트폰 셸(280px), 노치, 섹션 아코디언 |
| sns | `.ev-sns-*` | 프로필+핸들, 본문, 해시태그, 댓글, 경고 배너 |

### 8. 오버레이/이벤트

- 이의 제기(Objection): 96px 슬램 애니메이션 + 증거 카드
- 페이즈 전환: 72px 숫자 슬램 + 부제
- 모순 비교: 좌우 카드(A blue / B red) + VS
- 긴급 이벤트: 배경 blur + 아이콘 + 선택지 2개
- 판결: 2단계 (책임 슬라이더 → 솔루션 카드)
- 포커스 모드: 좌/우 패널 접기 (grid-template-columns 변경)
- 설정 드로어: 우측 슬라이드 (360px)

---

## 색상 토큰 (CSS Variables)

```css
:root {
  --gold: #d4a24e;   --gold-l: #e8c172;  --gold-d: #8b6914;
  --bg: #07070c;     --p1: #0c0c14;      --p2: #111119;
  --p3: #18181f;     --p4: #1f1f28;      --p5: #282832;
  --t1: #dcdce0;     --t2: #8b8b9a;      --t3: #4e4e5c;
  --blue: #5b8def;   --red: #e06060;     --green: #5cc97a;
  --purple: #9b7be8;
}
```

---

## 작업 범위 및 우선순위

### Phase 1: 핵심 레이아웃 + SVG (최우선)

1. **SVG 아이콘 컴포넌트 생성**: `src/components/pc/icons/PCSvgDefs.tsx` — 프로토타입의 `<svg><defs>` 블록을 React 컴포넌트로 전환. `<PCSvgIcon id="i-sword" size={24} />` 형태로 사용
2. **PCCourtLayout** 재작성: CSS Grid 기반으로 프로토타입과 동일한 비율
3. **PCDialogueLog** 재작성: SVG face 아바타, 18px 버블, 감정별 효과
4. **PCBottomDock** 재작성: 100×88 슬롯, 64px face card, kbd 탭

### Phase 2: 패널 컴포넌트

5. **PCLeftPanel**: SVG 아이콘, 17px 아이템, 36×36 증거 박스, 미터 SVG
6. **PCRightPanel**: 72×90 face card, 32px LieState 바, 감정 게이지, 노트 스타일

### Phase 3: 증거 뷰어 + 오버레이

7. **증거 뷰어 8종**: 프로토타입의 타입별 CSS 그대로 적용
8. **오버레이**: 이의제기, 페이즈전환, 모순비교, 긴급이벤트

### Phase 4: 인터랙션

9. **포커스 모드**: 패널 접기/펼치기 (grid-template-columns 트랜지션)
10. **호버 하이라이트**: 쟁점↔증거, 노트↔채팅 연동
11. **드래그**: 증거→핫바, 노트 재정렬
12. **키보드**: 1~6 슬롯, F1~F3 페이지, Tab 순환, Esc 닫기

---

## 유의사항

### 반드시 지킬 것
- **프로토타입을 정답으로 취급** — CSS 값, SVG path, 색상, 크기를 그대로 가져올 것
- **기존 모바일 컴포넌트 수정 금지** — `src/components/pc/` 아래에만 작업
- **Zustand 스토어 인터페이스 유지** — `useStore()` 호출 방식 그대로
- **타입 체크 필수** — 작업 후 `npx tsc -p tsconfig.app.json --noEmit` 통과 확인
- **pc.css 활용** — 모바일 컴포넌트 재사용 시 PC 테마 오버라이드는 `pc.css`에서 처리

### 하지 말 것
- 이모지(`Emoji` 컴포넌트)를 아이콘 용도로 사용하지 말 것 → SVG로 교체
- 임의로 프로토타입에 없는 기능/디자인 추가하지 말 것
- 대량 코드 한 번에 생성하지 말 것 → Phase별 단계적 진행

### Zustand 스토어 주요 셀렉터 (참조)

```typescript
useStore(s => s.caseData)              // RuntimeCaseData | null
useStore(s => s.currentPhase)          // GamePhase
useStore(s => s.dialogueLog)           // DialogueEntry[]
useStore(s => s.agentA)                // AgentState
useStore(s => s.agentB)                // AgentState
useStore(s => s.archetypeA)            // string
useStore(s => s.archetypeB)            // string
useStore(s => s.questionMeters)        // { a: QuestionMeters, b: QuestionMeters }
useStore(s => s.resources)             // { investigationTokens, skillPoints, courtControl }
useStore(s => s.evidenceStates)        // Record<string, EvidenceState>
useStore(s => s.evidenceDefinitions)   // EvidenceNode[]
useStore(s => s.lastFocusedDisputeId)  // string | null
useStore(s => s.recommendedEvidenceIds) // string[]
useStore(s => s.isLLMLoading)          // boolean
useStore(s => s.gameEventLog)          // GameEvent[]
useStore(s => s.pendingEvidenceView)   // string | null
useStore(s => s.setPendingEvidenceView) // (id: string | null) => void
```

---

## 프로토타입 읽는 법

`pc-prototype/index.html`은 standalone HTML입니다:
- **1~1237줄**: `<style>` — 모든 CSS. 클래스명이 React 컴포넌트 스타일의 기준
- **1238~1474줄**: `<svg><defs>` — SVG symbol 정의. React에서 재사용
- **1477줄~**: `<body>` — HTML 구조. React JSX 변환 대상
- **마지막 ~200줄**: `<script>` — JS 인터랙션 데모 (참고용, React에서는 state로 처리)

브라우저에서 `pc-prototype/index.html`을 직접 열면 완성된 디자인을 볼 수 있습니다.

---

## 현재 React 파일의 문제점 (수정 필요한 이유)

1. **SVG 아이콘 없음**: 전부 이모지로 대체 → 프로토타입의 일관된 아이콘 언어와 괴리
2. **핫바 슬롯 크기**: 현재 100×88이지만 gradient/hover/glow 효과 부족, 캐릭터 카드에 face SVG 없음
3. **좌패널**: 쟁점/증거 아이템에 SVG 아이콘 박스 없음, 미터에 SVG 아이콘 없음
4. **우패널**: face card에 SVG 없음 (이모지), LieState 바 높이는 32px이지만 스타일 불일치
5. **채팅**: 아바타가 이모지, 프로토타입의 SVG face와 완전히 다른 느낌
6. **포커스 모드 미구현**: 좌우 패널 접기/펴기 기능 없음
7. **증거 뷰어**: 기본 구조만 있고 프로토타입의 타입별 상세 디자인 미반영

---

## 확인 요청

작업 시작 전에 다음을 확인해 주세요:

1. `pc-prototype/index.html`을 브라우저에서 열어 디자인 확인
2. `npm run dev:pc`로 현재 React 상태 확인 (포트 5174)
3. 두 화면을 나란히 놓고 차이점 파악 후 Phase 1부터 시작

CT는 작업 결과를 리뷰하고, 게임 엔진과의 연결/통합 테스트를 담당합니다.
