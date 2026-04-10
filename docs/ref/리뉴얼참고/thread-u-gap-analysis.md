# Thread U Gap Analysis

작성일: 2026-04-10

## 기준

- 단일 진실 소스: [pc-prototype/index.html](/d:/ProjectWS/pc-prototype/index.html)
- 비교 대상:
  - [PCCourtLayout.tsx](/d:/ProjectWS/src/components/pc/layout/PCCourtLayout.tsx)
  - [PCSvgDefs.tsx](/d:/ProjectWS/src/components/pc/icons/PCSvgDefs.tsx)
  - [PCLeftPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCLeftPanel.tsx)
  - [PCRightPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCRightPanel.tsx)
  - [PCBottomDock.tsx](/d:/ProjectWS/src/components/pc/hotbar/PCBottomDock.tsx)
  - [pc.css](/d:/ProjectWS/src/app/pc.css)

브라우저에서 [pc-prototype/index.html](/d:/ProjectWS/pc-prototype/index.html)과 React PC 화면을 직접 열어 구조를 대조했다.

## 1. 레이아웃 셸

프로토타입 기준 레이아웃은 [pc-prototype/index.html](/d:/ProjectWS/pc-prototype/index.html) `:22`, `:638`, `:639`, `:640`의 3열 그리드다.

- 기본: `400px / 1fr / 380px`
- 좌측 접힘: `40px / 1fr / 380px`
- 우측 접힘: `400px / 1fr / 40px`
- 양측 접힘: `40px / 1fr / 40px`

이번 패치에서 반영한 항목:

- [PCCourtLayout.tsx](/d:/ProjectWS/src/components/pc/layout/PCCourtLayout.tsx)가 프로토타입의 `F` 키 focus cycle과 좌우 collapse toggle 동작을 갖도록 수정했다.
- [pc.css](/d:/ProjectWS/src/app/pc.css)에 프로토타입 3-column grid와 collapsed grid 상태를 명시적으로 덮어썼다.
- React 래퍼인 `.pc-panel-content` 때문에 프로토타입의 `.panel > .sec` 숨김 규칙이 깨지던 부분을 보정했다.
- strip 레이블을 프로토타입 텍스트와 동일하게 맞췄다.

남아 있는 갭:

- [PCCourtLayout.tsx](/d:/ProjectWS/src/components/pc/layout/PCCourtLayout.tsx) 헤더에는 프로토타입에 없는 `나가기` 버튼이 추가되어 있다.
- 중앙 상단에 [PCDisputeRibbon.tsx](/d:/ProjectWS/src/components/pc/layout/PCDisputeRibbon.tsx)가 들어가 있는데, 이는 프로토타입 기본 셸에는 없는 보강 UI다.
- collapse shell은 맞췄지만, 패널 내부 섹션 구성은 아직 프로토타입과 다르다.

## 2. SVG 아이콘 시스템

아이콘 기준은 [pc-prototype/index.html](/d:/ProjectWS/pc-prototype/index.html)의 `<defs>` 전체다.

- [PCSvgDefs.tsx](/d:/ProjectWS/src/components/pc/icons/PCSvgDefs.tsx)는 이미 [prototypeSource.ts](/d:/ProjectWS/src/components/pc/prototype/prototypeSource.ts)를 통해 프로토타입 SVG defs를 통째로 주입하고 있다.
- 따라서 `PCSvgDefs.tsx` 자체의 등록 방식은 이미 "프로토타입 전체 등록" 상태다.

확인된 프로토타입 icon id 37개:

`i-bolt`, `i-brain`, `i-bulb`, `i-cam`, `i-chat`, `i-clock`, `i-conflict`, `i-crown`, `i-doc`, `i-drop`, `i-eye`, `i-flame`, `i-gavel`, `i-gear`, `i-hand`, `i-heart`, `i-judge`, `i-ledger`, `i-lock`, `i-man`, `i-man-confident`, `i-man-defensive`, `i-person`, `i-phone`, `i-pin`, `i-plus`, `i-scale`, `i-search`, `i-send`, `i-shield`, `i-smartphone`, `i-sns`, `i-sword`, `i-woman`, `i-woman-angry`, `i-woman-resigned`, `i-woman-shaken`

아이콘 사용 갭:

- React 코드에서 프로토타입에 없는 참조는 `i-arrow-r` 하나였다.
- 이번 패치에서 [PCActionsPanel.tsx](/d:/ProjectWS/src/components/pc/hotbar/PCActionsPanel.tsx)의 `i-arrow-r` 참조를 제거했다.
- 아직 React 코드에서 쓰이지 않는 프로토타입 icon id는 `i-brain`, `i-phone`, `i-plus`다.

해석:

- `i-arrow-r`는 dead reference였다.
- `i-brain`, `i-phone`, `i-plus` 미사용은 현재 dock/evidence/action UI가 아직 프로토타입 조합을 완전히 따라오지 못했다는 신호다.

## 3. 좌측 패널 갭

프로토타입 좌측 패널의 핵심 구조:

- 쟁점 카드 목록
- 증거 카드 목록
- 감정/상태 미터
- 재판관 카드

현재 React 좌측 패널의 핵심 구조:

- 증거 리스트
- 중요 노트
- 별도 타임라인 드로어

주요 차이:

- [PCLeftPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCLeftPanel.tsx)는 프로토타입의 쟁점 카드 섹션과 미터 섹션을 아직 재현하지 않았다.
- 노트와 타임라인 드로어는 프로토타입 좌측 패널 구성과 다르다.
- 좌측 패널은 현재 "증거/노트 중심"이고, 프로토타입은 "쟁점/증거/미터 중심"이다.

## 4. 우측 패널 갭

프로토타입 우측 패널의 핵심 구조:

- 대상 카드
- 중요 노트 보드
- 2-slot 비교 tray
- 타임라인/변화 로그

현재 React 우측 패널의 핵심 구조:

- 대상 선택/프로필
- 콤보 랩
- 요약 패널
- 타임라인 일부

주요 차이:

- [PCRightPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCRightPanel.tsx)는 프로토타입의 note board와 compare tray를 아직 정확히 복제하지 않았다.
- 현재의 combo lab, summary panel은 프로토타입 우측 패널 기본 구성과 일치하지 않는다.
- 프로토타입의 `대상 · 노트 · 타임라인` 정보 구조가 React에서는 `대상 · 콤보 · 요약` 쪽으로 이동해 있다.

## 5. 하단 dock / action 영역 갭

주요 차이:

- [PCBottomDock.tsx](/d:/ProjectWS/src/components/pc/hotbar/PCBottomDock.tsx)는 프로토타입 slot 구성과 잠금 상태 표현을 아직 정확히 따르지 않는다.
- 하단 dock와 action panel의 역할 분리가 프로토타입과 다르다.
- dead icon 참조가 여기서 파생되었고, 이는 아직 prototype-driven cleanup이 덜 끝났다는 증거다.

## 6. 우선순위

다음 구현 우선순위를 권장한다.

1. [PCLeftPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCLeftPanel.tsx)를 프로토타입의 쟁점/증거/미터 구조로 재작성
2. [PCRightPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCRightPanel.tsx)를 대상/노트/compare tray/타임라인 구조로 재작성
3. [PCBottomDock.tsx](/d:/ProjectWS/src/components/pc/hotbar/PCBottomDock.tsx)와 action 영역을 프로토타입 slot 시스템 기준으로 정리
4. [PCCourtLayout.tsx](/d:/ProjectWS/src/components/pc/layout/PCCourtLayout.tsx)에서 프로토타입 외 보강 UI를 제거할지 결정

## 7. 이번 작업 결과

- SVG defs 등록 방식은 프로토타입 기준으로 이미 완료 상태임을 확인했다.
- 프로토타입에 없는 icon reference 1건을 제거했다.
- 3-column court layout과 collapse shell 동작을 React 구조에 맞게 보정했다.
- 남은 핵심 갭은 패널 내부 정보 구조와 dock 구성이다.
