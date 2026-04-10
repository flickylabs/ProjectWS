# Codex PC UI 스레드 초기 메시지

> 아래 내용을 새 Codex 스레드에 그대로 붙여넣으세요.

---

## 새 스레드 역할

이 스레드는 **솔로몬 법정 PC(Steam) 버전 UI 구현** 전담 스레드입니다.

## 프로젝트 이해를 위한 필수 읽기

1. **`CLAUDE.md`** (프로젝트 루트) — 전체 게임 구조, 기술 스택, 핵심 메커니즘
2. **`docs/ref/리뉴얼참고/ct-to-codex-pc-ui-implementation.md`** — CT가 작성한 PC UI 작업 요청서. SVG 아이콘 목록, 레이아웃 사양, 컴포넌트별 수정 사항, 우선순위가 정리되어 있음
3. **`pc-prototype/index.html`** — PC UI 프로토타입 (2,400줄+). **이것이 구현 목표이자 정답**. 브라우저에서 열어서 확인 가능

## 현재 상태

- React 컴포넌트 초안이 `src/components/pc/` 아래에 있지만, 프로토타입과 심각하게 다름
- 프로토타입에 정의된 20종+ SVG 아이콘과 5종 캐릭터 페이스 SVG가 전혀 반영되지 않음 (이모지로 대체 중)
- 핫바, 패널, 채팅 등 전체적으로 프로토타입의 크기/간격/색상/효과와 불일치

## 작업 요청

`ct-to-codex-pc-ui-implementation.md`에 정의된 Phase 1부터 순서대로 진행해 주세요:

**Phase 1 (최우선)**:
1. SVG 아이콘 시스템 구축 (`PCSvgDefs.tsx` + `PCSvgIcon` 컴포넌트)
2. PCCourtLayout CSS Grid 재작성
3. PCDialogueLog SVG face 아바타 + 프로토타입 버블 스타일
4. PCBottomDock 100×88 슬롯 + 64px SVG face card

**Phase 2**: 좌/우 패널 프로토타입 일치
**Phase 3**: 증거 뷰어 8종 + 오버레이
**Phase 4**: 포커스 모드 + 인터랙션

## 중요 규칙

- **프로토타입 HTML이 정답** — CSS 값, SVG path, 색상을 프로토타입에서 그대로 가져올 것
- **기존 모바일 컴포넌트 수정 금지** — `src/components/pc/` 내에서만 작업
- **타입 체크 필수** — `npx tsc -p tsconfig.app.json --noEmit` 통과
- **Phase별 단계적 진행** — 한 Phase 끝나면 CT에 리뷰 요청

## 빌드/실행 명령

```bash
npm run dev:pc        # PC dev 서버 (포트 5174)
npm run build:pc      # PC 프로덕션 빌드 (dist-pc/)
npx tsc -b --force    # 타입 체크
```

## CT 연락

CT(Claude Code)가 리뷰와 엔진 통합을 담당합니다. 각 Phase 완료 시 결과를 알려주세요.
