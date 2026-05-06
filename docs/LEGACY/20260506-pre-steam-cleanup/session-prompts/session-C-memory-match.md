# Session C: 짝맞추기 미니게임 (Phase 3-1)

■ 브랜치: codex/ui-handoff-freeze-20260411
■ 커밋: e27963d
■ 참조: CLAUDE.md

## 선행 작업 (Session A에서 완료)
- 미니게임 타입: src/types/minigame.ts (MiniGameType = 'memory_match')
- 미니게임 슬라이스: src/store/slices/minigameSlice.ts (startMinigame/completeMinigame/cancelMinigame)
- 미니게임 프레임: src/components/pc/minigame/MiniGameFrame.tsx
- 미니게임 오버레이: src/components/pc/minigame/MiniGameOverlay.tsx (현재 placeholder)

## 작업 범위

### src/components/pc/minigame/MemoryMatchGame.tsx (신규)

조사 토큰 획득용 카드 짝맞추기 게임.

#### 난이도 테이블
| 회차 | 그리드 | 카드 수 | 쌍 수 | 제한시간 |
|------|--------|---------|------|---------|
| 1~2 | 4×3 | 12장 | 6쌍 | 45초 |
| 3~4 | 4×4 | 16장 | 8쌍 | 40초 |
| 5 | 6×4 | 24장 | 12쌍 | 50초 |

#### 카드 디자인 (inline SVG)
뒷면: 어두운 배경(#1a1a24) + 금색 둥근 사각형 + '?' 아이콘
앞면: 각 증거 타입별 **고유 배경색 + 흰색 아이콘**

| 카드 | 배경색 | 아이콘 설명 |
|------|--------|------------|
| 영수증 | #5cc97a (초록) | 영수증 실루엣 |
| GPS | #5b8def (파랑) | 위치 핀 |
| 통화 | #a78bfa (보라) | 전화기 |
| 문자 | #e8c172 (노랑) | 말풍선 |
| 계좌 | #e06060 (빨강) | 은행 건물 |
| 카톡 | #f59e0b (주황) | 채팅 버블 |
| 서류 | #60c090 (청록) | 문서 |
| 돋보기 | #ec4899 (분홍) | 돋보기 |
| 지문 | #38bdf8 (하늘) | 지문 |
| 자물쇠 | #8b8b9a (회색) | 자물쇠 |
| 망치 | #d4a24e (금색) | 재판 망치 |
| 저울 | #6366f1 (남색) | 저울 |

각 아이콘은 **inline SVG path**로 직접 렌더링. 외부 의존성 없음.
배경색이 확실히 달라서 한눈에 구분 가능해야 함.

#### 동작
1. 게임 시작 시 카드 배열 랜덤 셔플
2. 카드 클릭 → CSS 3D perspective flip 애니메이션 (앞면 공개)
3. 2장 뒤집으면:
   - 짝이면: 금색 빛 이펙트 + 0.3초 후 카드 사라짐 (fade out)
   - 아니면: 0.8초 후 다시 뒤집힘
4. 전부 맞추면: completeMinigame(true) 호출
5. 시간 초과: 실패 화면 표시 (재도전/스킵 버튼)

#### 타이머
- 우상단에 남은 시간 표시 (초 단위, 10초 이하 빨간색)

### MiniGameOverlay.tsx 수정
- type === 'memory_match'일 때 MemoryMatchGame 렌더링
- 다른 타입은 기존 placeholder 유지

### CSS
- src/app/pc.css에 카드 flip 애니메이션 + 그리드 레이아웃 추가

## 건드리면 안 되는 파일
- MiniGameFrame.tsx (공통 프레임, 수정 불필요)
- minigameSlice.ts (슬라이스 구조 변경 금지)
- 다른 미니게임 파일 (SkillRunner, WhackAMole)
- src/hooks/useActionDispatch.ts
- src/store/slices/evidenceSlice.ts

## 검증
- npx tsc -b --force PASS
- npm run build PASS
- 완료 후 커밋 메시지: "feat: Session C — 짝맞추기 미니게임 (조사 토큰)"
