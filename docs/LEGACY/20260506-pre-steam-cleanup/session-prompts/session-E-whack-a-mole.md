# Session E: 두더지 잡기 미니게임 (Phase 3-3)

■ 브랜치: codex/ui-handoff-freeze-20260411
■ 커밋: e27963d
■ 참조: CLAUDE.md

## 선행 작업 (Session A에서 완료)
- 미니게임 타입: src/types/minigame.ts (MiniGameType = 'whack_a_mole')
- 미니게임 슬라이스: src/store/slices/minigameSlice.ts
- 미니게임 프레임: src/components/pc/minigame/MiniGameFrame.tsx
- 미니게임 오버레이: src/components/pc/minigame/MiniGameOverlay.tsx (현재 placeholder)

## 작업 범위

### src/components/pc/minigame/WhackAMoleGame.tsx (신규)

법정 지배력 획득용 두더지 잡기 게임.

#### 두더지 종류 (SVG)
| 종류 | 외형 | 효과 |
|------|------|------|
| **범인** | 검정 실루엣 + 빨간 눈 + 줄무늬 죄수복 | 때리면 +1 |
| **시민** | 파란(#5b8def) 실루엣 + 웃는 얼굴 | 때리면 -2 |
| **보스 범인** (3회차+) | 크고 금색(#d4a24e) 테두리 | 때리면 +3, 출현 시간 짧음 (0.6초) |

각 두더지는 inline SVG로 렌더링. 심플한 실루엣 스타일로 게임 톤과 통일.

#### 비율
| 회차 | 범인 | 시민 | 보스 |
|------|------|------|------|
| 1~2 | 80% | 20% | 0% |
| 3~4 | 60% | 25% | 15% |
| 5 | 45% | 40% | 15% |

#### 그리드
| 회차 | 그리드 | 구멍 수 |
|------|--------|---------|
| 1~2 | 3×3 | 9 |
| 3~4 | 4×3 | 12 |
| 5 | 4×4 | 16 |

#### 난이도 테이블
| 회차 | 목표 | 등장 속도(두더지 유지 시간) | 제한시간 |
|------|------|--------------------------|---------|
| 1 | 10마리 | 1.5초 | 30초 |
| 2 | 14마리 | 1.2초 | 25초 |
| 3 | 18마리 | 1.0초 | 25초 |
| 4 | 22마리 | 0.8초 | 20초 |
| 5 | 26마리 | 0.6초 | 20초 |

#### 동작
1. 구멍에서 두더지가 올라옴: CSS translateY 애니메이션
2. 마우스 커서 → **망치 모양**으로 변경 (CSS cursor: url(...) 또는 커스텀 커서 div)
3. 클릭 시:
   - 망치 내려치는 애니메이션 (scale down + 별 파티클 SVG)
   - 범인 적중: +1, 빨간 X 표시 후 내려감
   - 시민 적중: -2, 화면 살짝 흔들림 (CSS shake) + 빨간 플래시
   - 보스 적중: +3, 금색 폭발 이펙트
4. 두더지 놓침: 유지 시간 후 자동 내려감
5. 점수 달성: completeMinigame(true)
6. 시간 초과: 실패 (재도전/스킵)

#### UI
- 점수: 좌상단 크게 표시 ("12 / 18")
- 시간: 우상단 카운트다운
- 구멍: 타원형 어두운 홀 (그림자 효과)
- 배경: 어두운 법정 바닥 톤

### 망치 커서
- 방법 1: CSS `cursor: url(hammer.svg) 16 16, pointer` — SVG 망치 아이콘
- 방법 2: 마우스 위치 추적 div (클릭 시 swing 애니메이션 가능)
- **방법 2 추천**: 클릭 시 내려치는 모션이 있어야 재미있음

### MiniGameOverlay.tsx 수정
- type === 'whack_a_mole'일 때 WhackAMoleGame 렌더링

### CSS
- src/app/pc.css에 두더지 등장/퇴장 + 구멍 + 흔들림 + 파티클 애니메이션 추가

## 건드리면 안 되는 파일
- MiniGameFrame.tsx, minigameSlice.ts
- 다른 미니게임 파일 (MemoryMatch, SkillRunner)
- src/hooks/useActionDispatch.ts
- src/store/ (슬라이스 구조 변경 금지)

## 검증
- npx tsc -b --force PASS
- npm run build PASS
- 완료 후 커밋 메시지: "feat: Session E — 두더지 잡기 미니게임 (법정 지배력)"
