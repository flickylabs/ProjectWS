# Codex V6 Mini 10
- 범위: R1~R10 대응 정적 점검 배치
- 엔진 59개(archive 제외) 인벤토리, UI→engine import 맵, type/build baseline 확보
- `npx tsc -b --force` 통과
- 초기 발견: `judgeProgression/judgeTitle` 순환 의존, `fixPostpositions()` 직접 호출은 LLM 경로 2곳
- CT 대기: 없음
- QW 이월: 아직 분류 전
