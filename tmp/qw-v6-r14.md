# QW V6 R14: spouse-01 default path baseline (runtime)

## 실행
- 스캐너: `tests/qw-runtime-audit.cjs` 신규 작성 완료
- 입력 전사본: `tests/transcripts/spouse-01.json` (Apr 24 16:37, 20 entries = 40 V6 turns)
- 출력: `tmp/qw-v6-r14-audit.json`

## 경로 시나리오
- R14: 정상 경로 (표준 플레이) — 기존 Apr 24 전사본 활용
- turns 40개: 각 entry 1개당 judge 질문(t1) + party 응답(t2)로 분해

## 집중-8 호칭 혼종
- 8-a: 0, 8-b: 0, 8-c: 0, 8-d: 0 → **전부 0건**

## 집중-9 Placeholder 유출
- 9-a~9-g: 전부 0 → **0건**

## 집중-10 경계 오염
- 10-a (system→response bubble): 0
- 10-b (빈 NPC content): 0
- 10-c (NPC 관찰자 서술체 종결): 0
- 10-d (judge 1인칭): 0
- 10-e (NPC에 [시스템] 프리픽스): 0 (스캐너 미구현, 전사본엔 해당 필드 없음)

## FORBID 금지패턴
- 0건 (실런타임 LLM 응답 clean — prompt 정책이 작동)

## V5 기본/집중 스냅샷
- 축1~8: 정적 기준 PASS + 런타임 기준 PASS
- 집중-1 조사 오류(이준호/박지연/박미라 조합): 0건 (스캐너 LLM 응답 40개 내 grep 미발견)

## 스캐너 기능 확인
- FP 완화: 내부 따옴표 재인용 stripInnerQuotes() 적용 → R1 정적 FP 해소
- 8-d 호격 regex 개선: `(?<![되어아이우으오해하히짖알봤])[가-힣](아|야)[\s,!?]` → 어미 '-야' 상당수 제외 (R3 FP 해소 대상)

## 수정 (이번 라운드, 권한 내)
- 없음 (FAIL 0건)

## CT 검토 요청 (권한 초과)
- **run-84-headless.cjs의 전사본 스키마 확장 필요 여부**:
  - 현 스키마: turn/label/party/partyName/dispute/lieState/action/stance/judgeQuestion/npcResponse/...
  - V6 어댑터(qw-runtime-audit.cjs)가 위 entry를 2개의 V6 turn으로 변환 → 현재 방식 작동
  - 단, phase/eventType 필드는 heuristic 추론 중. 정확도 필요 시 runner에 명시 추가 제안
  - 제안: **현 상태 유지**. Phase D 완료 후 재평가.

- **Apr 24 전사본 재활용 정당성**:
  - 각 라운드별 신규 LLM 실행은 비용·시간 부담 → 기존 전사본(Apr 24, 최신)으로 baseline 잡고
  - 변형 경로가 필요한 라운드(R15~)는 **시나리오 수정 후 선택적 신규 실행**
  - 제안: baseline 기반 취합 후 심각 이슈 발견 시에만 신규 실행

## 다음 라운드로 이월
- R15: spouse-01 경로 변형 (심문 대상 순서 A→B) — 기존 전사본 재활용 vs 신규 실행 필요 판단
- R16: 증거 제시 타이밍 지연

## 라운드 판정: **PASS** (FAIL 0, WARN 0, FP 0)
