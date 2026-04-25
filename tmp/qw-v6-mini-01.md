# QW V6 mini-summary R1~R10

## 상태 스냅샷 (Phase A 1/3 진행)

### 누적 카운트 (정적, 3사건 전수)
- 집중-8: a=0, b=0, c=1(FP), d=1(FP) → 실 FAIL **0**
- 집중-9: 0/0/0/0/0/0/0 → 실 FAIL **0**
- 집중-10c NPC 관찰자 서술체: 0
- FORBID(금지 10종): 9 (3 FP + 6 WARN + 0 FAIL)
- PLACEHOLDER: 0

### 수정 완료 파일 목록
- 없음 (FAIL 0건, 수정 불요)

### 대기 중인 CT 검토 항목
- **"지금/방금 X라고 하셨습니다" 단어되묻기 패턴 7건**: judge evidence_discovery + witness 후속질문. V5 PASS 기준에서는 용인. V6 정적 스캔에선 WARN. 정책 판단 요청.
- **스캐너 regex 개선 (8-d)**: `[가-힣]+(아|야),` → 동사 어미 `-야` 제외하도록 개선 필요. R14 qw-runtime-audit.cjs 작성 시 반영

### 다음 10R (R11~R20)
- R11: interjection + contradiction_pursuit 집중 (집중-3/4)
- R12: 증인 다층 (집중-5)
- R13: 증거/판결/aftermath (집중-6/7) + Phase A 종료
- R14: ★ qw-runtime-audit.cjs 작성 후 runtime 시작 (spouse default path)
- R15~R20: Phase D 경로 변형

### 판정
Phase A R1~R10 정적 스캔: **PASS** 지속 (V5 수준 유지 + V6 신규 검출 패턴에서도 실 FAIL 0)
