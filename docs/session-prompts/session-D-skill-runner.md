# Session D: 횡스크롤 러너 미니게임 (Phase 3-2)

■ 브랜치: codex/ui-handoff-freeze-20260411
■ 커밋: e27963d
■ 참조: CLAUDE.md

## 선행 작업 (Session A에서 완료)
- 미니게임 타입: src/types/minigame.ts (MiniGameType = 'skill_runner')
- 미니게임 슬라이스: src/store/slices/minigameSlice.ts
- 미니게임 프레임: src/components/pc/minigame/MiniGameFrame.tsx
- 미니게임 오버레이: src/components/pc/minigame/MiniGameOverlay.tsx (현재 placeholder)

## 작업 범위

### src/components/pc/minigame/SkillRunnerGame.tsx (신규)

스킬 포인트 획득용 횡스크롤 러너 게임. Canvas 기반.

#### 캐릭터 — 관절 애니메이션 재판관
구조: 머리(원) + 몸통(선) + 팔(상완+전완)×2 + 다리(허벅지+종아리)×2
스타일: **금색(#d4a24e) 스틱맨** + 재판관 망토(몸통에서 뒤로 흘러내리는 삼각형/곡선, 약간 더 어두운 금색) + 관복 실루엣(어깨 넓게)

애니메이션 (sin() 기반 관절 각도):
- **달리기**: 팔다리 교차 스윙. 속도 올라가면 주기 빨라짐 + 몸 앞으로 5~10도 기울어짐
- **점프**: 다리 웅크림 → 공중에서 팔 위로 벌림 → 착지 시 다리 쿠션(살짝 웅크렸다 펴짐)
- **피격**: 빨갛게 0.2초 깜빡 + 뒤로 살짝 밀림
- **달리기 속도에 따라**: 망토가 더 많이 펄럭이는 효과 (sin 진폭 증가)

#### 조작
- **스페이스바** = 점프 (짧게 = 낮은 점프, 길게 = 높은 점프)
- 자동 달리기 (조작은 점프만)

#### 게임 요소
- **스킬 조각**: 책/저울/펜 아이콘 (금색, 공중에 배치) — 닿으면 수집 (+1 카운트)
- **장애물**: 가시/바리케이드 (빨간색 #e06060) — 부딪히면 생명 -1
- **낭떠러지**: 바닥이 끊김 — 떨어지면 즉시 실패
- **생명**: 3개 (❤️❤️❤️ 좌상단 표시)
- **수집 카운트**: 우상단에 크게 표시 ("42 / 100")
- **속도**: 시간 경과에 따라 점진적 가속 (매 10초마다 5% 증가)

#### 난이도 테이블
| 회차 | 목표 | 시작 속도 | 가속률 | 장애물 밀도 |
|------|------|----------|--------|-----------|
| 1 | 50개 | 3 px/frame | 5%/10s | 낮음 |
| 2 | 100개 | 4 px/frame | 5%/10s | 보통 |
| 3 | 150개 | 5 px/frame | 7%/10s | 보통 |
| 4 | 200개 | 5 px/frame | 7%/10s | 높음 |
| 5 | 250개 | 6 px/frame | 10%/10s | 높음 |

#### 배경 (Canvas 렌더)
- 2~3 레이어 패럴랙스 스크롤
- 뒤: 법정 기둥/아치 실루엣 (진한 회색 #1a1a24, 느린 스크롤)
- 중간: 책장/서류더미 실루엣 (#222230, 중간 스크롤)
- 앞: 바닥 타일/대리석 패턴 (#2a2a36, 게임 속도로 스크롤)

#### 기술 구현
- <canvas> + requestAnimationFrame 게임 루프
- 중력: 0.6/frame, 점프력: -12 (길게 누르면 -15까지)
- 충돌: AABB 사각형 판정
- 장애물/아이템: 랜덤 생성 (최소 간격 150px 보장, 난이도별 밀도 조절)
- 게임 상태: running | paused | success | failed
- 성공: completeMinigame(true), 실패: 재도전/스킵 UI 표시

#### 중요
- 캐릭터의 **관절 애니메이션이 핵심**. 달리는 느낌이 확실해야 함.
- 팔과 다리가 자연스럽게 교차하며, 속도에 따라 동작이 빨라져야 함.
- 망토가 펄럭이는 연출도 중요.

### MiniGameOverlay.tsx 수정
- type === 'skill_runner'일 때 SkillRunnerGame 렌더링

### CSS
- Canvas는 자체 렌더링이므로 CSS 추가 최소화
- 성공/실패 오버레이 스타일만 추가

## 건드리면 안 되는 파일
- MiniGameFrame.tsx, minigameSlice.ts
- 다른 미니게임 파일 (MemoryMatch, WhackAMole)
- src/hooks/useActionDispatch.ts
- src/store/ (슬라이스 구조 변경 금지)

## 검증
- npx tsc -b --force PASS
- npm run build PASS
- 완료 후 커밋 메시지: "feat: Session D — 횡스크롤 러너 미니게임 (스킬 포인트)"
