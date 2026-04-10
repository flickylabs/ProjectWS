# Thread B -> CT 보고

작성일: 2026-04-09  
대상: PC UI 리뉴얼 진행 현황 공유

## 1. 이번 턴 반영 범위

### A. Home를 게임형 허브로 재구성
- 기존의 정적인 글래스 카드 배열에서, `게임 허브 + 진행 현황 + 모드 진입` 구조로 재정비했습니다.
- Hero 영역에 아래 요소를 추가했습니다.
  - 메인 카피/서브카피 재정렬
  - 심문/붕괴/판결 3축 소개 비트
  - 시즌/일반 진행 요약 카드
- 일반 모드 / 시즌 모드 카드에 진행도 바와 명확한 CTA를 넣어, 기능 소개보다 "플레이 시작" 위주 구조로 바꿨습니다.

### B. Session 카드를 전면 재설계
- 각 Session에 다음 메타를 부여했습니다.
  - 상징 이모지
  - 감성 태그라인
  - 짧은 게임형 설명
  - 진행도 `n/total`
  - 올클리어 시 평균 점수 표시
- 이모지는 신규 다운로드 대신, 레포에 이미 있는 `MS Fluent Emoji` 렌더링 파이프라인을 사용했습니다.
- 진행도는 `solomon-case-progress` 저장값을 우선 사용하고, 판결 히스토리 최고점으로 보완합니다.

### C. Session 내 사건 리스트를 스테이지형 구조로 교체
- 기존 다량의 카드 정보를 노출하던 grid를 제거했습니다.
- 현재는 아래 구조입니다.
  - 좌측: 스테이지 루트/노드
  - 우측: 선택된 사건 인스펙터
- 스테이지 노드 클릭 시 우측 패널에 아래 정보만 노출합니다.
  - 짧은 제목
  - 짧은 티저
  - 난이도
  - 쟁점 수 / 증거 수
  - 더보기
  - 사건 들어가기
- `더보기`에서는 상세 설명을 짧게 보여주고, 핵심 쟁점은 최대 3개만 미리보기로 제한했습니다.
- 진입은 1회 클릭으로 바로 `initializeCase()`로 이어집니다.

### D. 플레이 화면 위상 일부 재정리
- 좌측 패널은 `쟁점 · 증거 보드` 역할로 정리했습니다.
- 우측 패널은 `대상 · 미터 · 조합` 역할로 재배치했습니다.
- 변경 내용:
  - 미터를 좌측에서 제거하고 우측 대상 카드 아래로 이동
  - 기존 `비교 트레이`를 `조합 실험실`로 변경
  - 노트 Shift+클릭, 증거 드롭을 받아 조합 힌트를 제공
- 하단 Dock는 `TACTICAL DOCK` 표현을 제거하고 `ACTION HUD` 톤으로 낮췄습니다.
- Dock는 여전히 메인 액션 허브 역할을 하지만, 보조 안내/메타 문구의 밀도를 낮추는 방향으로 정리했습니다.

### E. 실행 배치 파일 정리
- `run-pc.bat`를 단순화했습니다.
- 현재는 `npm run dev:pc`를 바로 호출하는 구조이며, 브라우저 오픈은 Vite PC 설정(`open: /index-pc.html`)에 맡깁니다.
- 이유:
  - 배치 파일 내부에서 별도 창 실행/대기/브라우저 오픈까지 모두 처리하는 방식은 이 환경에서 오히려 불안정했습니다.
  - 사용자 PC 환경에서는 Vite의 기본 open 동작을 따르는 편이 더 안전합니다.

## 2. 이번 턴에 실제 수정한 주요 파일

- `D:\ProjectWS\src\components\pc\home\pcHomeShared.ts`
  - Session 메타(이모지/태그라인/설명)
  - 진행도 로더
  - 사건용 짧은 제목/티저 헬퍼 추가

- `D:\ProjectWS\src\components\pc\home\PCHomeScreen.tsx`
  - Home 허브 재구성
  - Session 카드 진행도/평균점수 반영
  - 일반/시즌 브라우저로 넘기는 메타 확장

- `D:\ProjectWS\src\components\pc\home\PCCaseBrowser.tsx`
  - 카드 grid 제거
  - 스테이지 경로형 UI + 우측 인스펙터 도입
  - 더보기 / 단일 진입 구조 반영

- `D:\ProjectWS\src\app\pc.css`
  - Home 게임형 허브
  - Session 카드 테마
  - 스테이지 루트/인스펙터 스타일
  - 우측 조합 힌트 / Dock 톤 보정

- `D:\ProjectWS\src\components\pc\layout\PCCourtLayout.tsx`
  - 좌/우 패널 라벨 정리

- `D:\ProjectWS\src\components\pc\panels\PCLeftPanel.tsx`
  - 미터 섹션 제거

- `D:\ProjectWS\src\components\pc\panels\PCRightPanel.tsx`
  - 대상 정보 + 미터 + 조합 실험실 구조로 재작성

- `D:\ProjectWS\src\components\pc\hotbar\PCBottomDock.tsx`
  - `ACTION HUD`로 명칭 변경

- `D:\ProjectWS\run-pc.bat`
  - PC 테스트용 실행 배치 단순화

## 3. 엔진/데이터 연동 관점 메모

- Session 진행도는 `solomon-case-progress`를 직접 소비합니다.
- Session 평균 점수는 올클리어 조건일 때만 카드에 노출합니다.
- 조합 실험실은 아래 엔진 상태를 읽습니다.
  - `evidenceCombinations`
  - `triggeredCombinations`
- 조합 실험실은 현재 `조합 유효성/힌트 UI` 역할입니다.
  - 엔진 상태를 임의로 mutate하지는 않습니다.
  - 실제 조합 발동 canonical 경로는 기존 증거 제시 흐름을 유지합니다.

## 4. 검증 결과

### PASS
- `npx tsc -p tsconfig.app.json --noEmit`
- `npm run build:pc`

### 빌드 경고
- 기존 CSS `@import` 순서 경고 1건 유지
- chunk size 경고 유지

### 실행 관련 메모
- `run-pc.bat`는 현재 `npm run dev:pc`를 직접 호출하는 형태입니다.
- 이 Codex 환경에서는 새 창/브라우저 자동 오픈까지 완전하게 검증하기 어려웠습니다.
- 따라서 최종 실행성은 사용자 데스크톱에서 `run-pc.bat` 기준으로 한 번 더 확인이 필요합니다.

## 5. 아직 남은 항목 / 미완료

### A. 캐릭터 SVG 확장
- 아직 `남/여 + 청년/중년/장년/노년 + 감정 variants` 16종 체계는 미반영입니다.
- 현재는 기존 `man/woman` 중심 심벌 매핑을 유지합니다.
- 이 작업은 심벌 정의 추가 + face mapping 규칙 정비가 같이 필요합니다.

### B. 증인 전용 단순 실루엣
- 아직 미반영입니다.
- NPC SVG 파생형으로 별도 witness silhouette를 만드는 것이 맞아 보입니다.

### C. 증거/패널 클릭 체인 전수 검증
- 증거 뷰어와 기존 PC 클릭 체인은 계속 살아 있지만,
- "모바일에서 클릭되던 대부분의 항목이 PC에서도 모두 클릭 가능" 기준으로는 아직 전수 점검이 끝나지 않았습니다.

### D. 판결 Phase / 결과 화면 전면 리디자인
- 이번 턴 범위에는 포함하지 않았습니다.
- 아직 Result/Verdict는 기존 PC 셸 위주입니다.

### E. 플레이 중 끊김 후 재실행 안정성
- 이번 턴에서는 배치 실행 단순화까지 처리했습니다.
- 다만 실제 사용자 환경에서 `플레이 도중 끊김 -> 다시 실행` 재현/회복 루프까지 완전히 닫았다고 보기는 어렵습니다.
- sessionStorage persist 범위 점검과 재실행 smoke가 추가로 필요합니다.

## 6. CT 확인 또는 의견이 필요한 지점

1. Session 스테이지 루트 구조 방향
- 현재는 `좌측 스테이지 루트 + 우측 사건 인스펙터` 형태입니다.
- 더 캐주얼한 곡선 path 연출이나 캐릭터 미니 토큰까지 원하면, CSS/SVG 레벨에서 한 번 더 밀어붙일 수 있습니다.

2. 핵심 쟁점 노출량
- 현재 Case Browser 더보기에서는 쟁점명을 최대 3개만 미리보기로 보여줍니다.
- 사용자가 지적한 대로 Phase0 노출량이 과한지 추가 기준이 있으면 더 줄이겠습니다.

3. 조합 실험실의 canonical 행동 범위
- 현재는 `힌트/검증 UI`입니다.
- 실제 조합 발동을 여기서도 직접 허용할지, 아니면 기존 evidence present 경로만 canonical로 유지할지 판단이 필요합니다.

## 7. 개인 판단

- 이번 턴은 “정보 나열형 PC UI”에서 벗어나기 위한 뼈대를 다시 세우는 단계였습니다.
- Home/Session은 방향이 많이 바로잡혔습니다.
- 다음 우선순위는 아래가 적절하다고 봅니다.
  1. 플레이 전체 시각 밀도 축소
  2. 캐릭터/증인 SVG 체계 확장
  3. Verdict/Result 전면 리디자인
  4. 클릭 체인/재실행 안정성 전수 스모크
