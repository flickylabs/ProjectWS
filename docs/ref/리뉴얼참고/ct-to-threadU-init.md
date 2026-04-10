# CT → Thread U (UI): 초기화 문서

> 발신: CT (Control Tower)
> 수신: Thread U (UI)
> 일시: 2026-04-10
> 유형: 신규 스레드 초기화

---

## 스레드 역할

Thread U는 **PC UI 전담** 스레드입니다.

프로토타입 HTML이 디자인의 단일 진실 소스(single source of truth)이며, 이를 React 컴포넌트로 정확히 구현하는 것이 너의 일입니다.

### 너의 책임
1. **PC React 컴포넌트 구현** — 프로토타입 기준 픽셀 수준 구현
2. **SVG 아이콘 시스템** — 프로토타입의 20+ SVG 아이콘을 React 컴포넌트화
3. **증거 뷰어 8종** — bank, chat, cctv, contract, testimony, log, device, sns
4. **3-column 레이아웃** — 좌패널(쟁점/증거/미터), 중앙(대화), 우패널(타겟/노트/타임라인)
5. **핫바 시스템** — 6슬롯 × 3페이지 + 얼굴 카드
6. **홈 화면** — 일반/시즌 모드 + 보조 메뉴 (내정보/리더보드/판결기록/설정)
7. **반응형 최소 사이즈** — 최소 해상도 대응

### 너의 책임이 아닌 것
- 사건 기획 (→ Thread S)
- 대사 작성 (→ Thread W)
- 데이터 생성 / 파이프라인 (→ Thread G)
- 플레이 테스트 (→ Thread Q)
- Zustand 스토어 로직 변경 (CT 승인 필요)

---

## 필수 읽기 (우선순위 순)

1. **`pc-prototype/index.html`** — **PC 프로토타입 (3,315줄). 이것이 디자인의 유일한 기준.** 브라우저에서 열어보고 모든 인터랙션을 확인
2. **`CLAUDE.md`** (프로젝트 루트) — 기술 스택, 프로젝트 구조
3. **`docs/ref/리뉴얼참고/ct-to-codex-pc-ui-implementation.md`** — PC UI React 구현 작업 요청서 (Phase 1~4, 컴포넌트별 요구사항)
4. **`docs/ref/리뉴얼참고/ct-to-threadB-final-ui-directive.md`** — PC UI 최종 지시 (현재 미준수 항목)
5. **`docs/ref/리뉴얼참고/ct-to-threadB-home-ux-redesign.md`** — 홈 화면 UX 재설계
6. **`docs/ref/리뉴얼참고/threadB-to-ct-pc-ui-status-report-2026-04-10.md`** — Thread B 최종 상태 보고 (현재 이슈 목록)
7. **`docs/app-flow-design.md`** — 앱 플로우 다이어그램

---

## 현재 상태 (Thread B에서 인계)

### 기존 PC 컴포넌트 (src/components/pc/)

| 분류 | 파일 | 상태 |
|------|------|------|
| **레이아웃** | `layout/PCCourtLayout.tsx` | 3-column 기본 구조, CSS Grid 리라이트 필요 |
| | `layout/PCDialogueLog.tsx` | 채팅 버블 + SVG 아바타, 프로토타입 정렬 필요 |
| | `layout/PCDiscoveryOverlay.tsx` | 기본 동작 |
| | `layout/PCDisputeRibbon.tsx` | 기본 동작 |
| | `layout/PCGameplayOverlay.tsx` | 기본 동작 |
| | `layout/PCInteractionPanel.tsx` | 기본 동작 |
| **패널** | `panels/PCLeftPanel.tsx` | 좌패널 (쟁점/증거/미터/재판관) |
| | `panels/PCRightPanel.tsx` | 우패널 (타겟/노트/타임라인) |
| **핫바** | `hotbar/PCBottomDock.tsx` | 100×88 슬롯, 프로토타입 사이즈 리사이징 필요 |
| | `hotbar/PCActionsPanel.tsx` | 액션 인터페이스 |
| **증거** | `evidence/PCEvidenceViewer.tsx` | 메인 뷰어 |
| | `evidence/EvidenceSubViewers.tsx` | 8종 서브뷰어 |
| **아이콘** | `icons/PCSvgDefs.tsx` | SVG 정의 (미완성) |
| | `icons/PCSvgIcon.tsx` | 아이콘 컴포넌트 (부분 구현) |
| **홈** | `home/PCHomeScreen.tsx` | UX 재설계 필요 |
| | `home/PCCaseBrowser.tsx` | 케이스 브라우저 |
| **결과** | `verdict/PCVerdictScreen.tsx` | 판결 화면 |
| | `result/PCResultScreen.tsx` | 결과 화면 |

### 알려진 이슈 (Thread B 보고 기준)

- 프로토타입 CSS/SVG가 React에 완전히 반영되지 않음
- 개발용 텍스트 잔존 (DEV TEST 필터 등)
- 핫바 슬롯 사이즈가 프로토타입과 불일치
- 홈 화면이 이전 디자인 기준 → UX 재설계 문서 반영 필요
- 최소 해상도 대응 미완

---

## 프로토타입 핵심 디자인 요소

### 테마
- **다크 테마** (배경 #0a0a12 ~ #1a1a2e)
- **골드 액센트** (#c5a55a, #d4af37)
- 폰트: 시스템 sans-serif

### 3-column 레이아웃
```
[좌패널 280px] [중앙 flex-1] [우패널 300px]
```
- 좌패널: 쟁점 목록 / 증거 카드 / 미터 / 재판관 정보
- 중앙: 대화 로그 + 인터랙션 패널
- 우패널: 타겟 선택 / 중요 노트 / 타임라인

### 핫바 (하단 도크)
- 6슬롯 × 3페이지 (페이지 전환 가능)
- 64px 얼굴 카드 (당사자 A/B 선택)
- 슬롯: 심문 3종 + 증거 제시 + 특수 행동

### SVG 아이콘 (20+ 종)
프로토타입에 정의된 아이콘: gavel, scale, bolt, search, clock, sword, eye, heart, brain, shield, book, fire, star, crown, diamond, arrow, chat, document, lock, unlock 등

### 캐릭터 얼굴 SVG
- 5가지 감정 변형: neutral, happy, angry, sad, surprised

---

## 기술 스택

- **React 19** + TypeScript 5.9
- **Tailwind CSS 4** (유틸리티 우선)
- **Vite 8** (HMR)
- Zustand 5 (스토어 — 읽기 전용, 변경 시 CT 승인)

### 스타일링 규칙
- 프로토타입의 CSS를 Tailwind 클래스로 변환
- 프로토타입에 없는 스타일 추가 금지
- 반응형: 최소 1280px 너비 기준

---

## 첫 번째 임무

### Phase 1: 기반 정비

1. **프로토타입 vs 현재 React 갭 분석** — `pc-prototype/index.html`을 브라우저에서 열고, 현재 React 컴포넌트와 비교하여 차이점 목록 작성
2. **SVG 아이콘 시스템 완성** — `PCSvgDefs.tsx`에 프로토타입의 모든 SVG 아이콘 등록
3. **PCCourtLayout CSS Grid 리라이트** — 프로토타입의 3-column 레이아웃 정확히 구현

산출물: `docs/ref/리뉴얼참고/thread-u-gap-analysis.md`

### Phase 2: 핵심 화면

4. **PCDialogueLog 프로토타입 정렬** — 채팅 버블 + 아바타 + 스크롤
5. **PCBottomDock 리사이징** — 프로토타입 규격에 맞춰 슬롯 사이즈 조정
6. **PCHomeScreen UX 재설계 반영** — `ct-to-threadB-home-ux-redesign.md` 기준

### Phase 3: 증거 뷰어 + 패널

7. **증거 뷰어 8종** 프로토타입 수준으로 완성
8. **좌/우 패널** — 아래 커스텀 설계 기준으로 구현 (프로토타입과 다름, 이쪽이 우선)

#### 좌/우 패널 커스텀 설계 (프로토타입보다 우선)

**좌측 패널:**
1. 증거 카드
2. 핵심 발언 노트 (평소 제목만 표시 / 마우스오버 시 확장)
3. 확장 버튼 → 두 번째 레이어 패널이 열리며 타임라인 노출

**우측 패널:**
- 상단: 심문 대상 토글 + 대상의 미터값 노출
- 하단: 조합 스킬 (증거/핵심발언 중 2가지를 조합 → 새 증거/발언/쟁점 등장 또는 기존 것이 발전된 버전으로 변경)
- 조합 스킬 아래: 요약 스킬

**주의**: 이 구조는 프로토타입 HTML에 반영되지 않은 후속 설계 결정이다. "프로토타입 기준으로 리라이트"하면 이 커스텀이 날아간다. 패널 작업 시 반드시 이 섹션을 기준으로 해라.

### Phase 4: 최종 정리

9. 개발용 텍스트 제거
10. 최소 해상도 대응
11. DEV TEST 필터 → 정식 필터 전환

---

## 산출물 → CT 게이트

```
Thread U 작업 → CT UI Gate 판정 → PASS → Thread Q 플레이 테스트에 포함
                                → REVISE → Thread U 수정 후 재제출
```

UI Gate 기준:
- 프로토타입과 시각적 일치도
- 빌드 에러 없음 (`npx tsc -b --force` + `npm run build`)
- 개발용 흔적 없음
- 최소 해상도에서 깨지지 않음

---

## 핵심 원칙

> **"프로토타입은 출발점이다. 단, CT가 지정한 커스텀 설계가 있는 영역은 커스텀이 우선한다."**

- 프로토타입에만 의존하지 마라. 이 문서의 "좌/우 패널 커스텀 설계" 섹션이 프로토타입보다 우선한다.
- 커스텀 설계가 없는 영역(SVG, 3-column 셸, 핫바 등)은 프로토타입이 기준이다.
- 디자인 변경이 필요하다고 판단되면 CT에게 제안하세요.
