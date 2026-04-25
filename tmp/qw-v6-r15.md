# QW V6 R15: friend-01 default baseline (runtime)

## 실행
- 입력 전사본: `tests/transcripts/friend-01.json` (Apr 24)
- 스캐너 regex v2 적용 (HON_PARTNER에 더 많은 동사어미 syllable 배제)
- 출력: `tmp/qw-v6-r15-audit.json`

## 경로 시나리오
- R15: friend-01 default path (기존 Apr 24 전사본 활용, 20 entries = 40 turns)

## 집중-8/9/10/FORBID
- 모든 카운트 **0건**

## V5 집중-1 조사
- 송다은/최수민/김세라/박준혁/오미경 잘못된 조사 조합: **0건**

## 수정 (이번 라운드, 권한 내)
- 스캐너 regex v2: HON_PARTNER 공백 구분 제거 + 동사어미 stem 27개 배제 lookbehind (already integrated)

## 다음 라운드로 이월
- R16: family-01 default baseline
- R17: spouse-01 심문 대상 순서 변형 (A 먼저 → B 먼저)

## 라운드 판정: **PASS**
