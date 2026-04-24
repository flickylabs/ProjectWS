# CT → Thread QW v6 후속: S5 자백 구체성 보강 (6건)

> 발신: CT (Control Tower)
> 수신: **Thread QW v6 후속** (신규 Claude Code 세션)
> 일시: 2026-04-28
> 베이스 커밋: `38f4e55` (cb36c16 이후 폴리싱 P-1~P-5 반영됨)
> 대상: **spouse-01 / family-01 / friend-01** (활성 3사건)
> 범위: S5 단계 자백 스크립트 **6건** 구체성/금액 보강

---

## ⚠️ 이 세션은 신규 생성

V6 본 세션은 이미 2026-04-28에 100R 완주 PASS 판정. 이 지시서는 V6 세션 종료 시 남긴 **"QW 이월 6건"**(Thread Q Codex 리포트 식별)의 후속 처리 전용.

---

## 배경

Thread Q (Codex) V6 최종 리포트에서 "QW 이월" 섹션에 아래 6건 보고됨:

```
spouse-01
  turn 17: S5 자백 2문장, 구체성 부족
  turn 18: S5 자백 2문장, 금액 미포함

family-01
  turn 17: S5 자백 2문장, 구체성 부족
  turn 18: S5 자백 1문장, 금액 미포함

friend-01
  turn 17: S5 자백 2문장, 구체성 부족
  turn 18: S5 자백 2문장, 금액 미포함
```

참고: [tmp/thread-q-codex-v6-final-report.md](../../../tmp/thread-q-codex-v6-final-report.md)

**문제**: V5 자백은 "280만원" 같은 구체적 금액·이름·시각을 포함해야 `Truth Throttle`의 S5 open 단계 기준을 만족. 현재 일부 자백이 **2문장 이내의 일반화된 진술**에 그쳐 진실 공개 임계를 충족 못 함.

**참고**: [llm-quality-tuning-guide.md](llm-quality-tuning-guide.md) 섹션 6~7 Truth Throttle "S5 자백(open)" + S5 slot 승격 로직. 자백은 **구체적 사실 1문장 + 왜 숨겼는지 1문장 + 심정 1문장 = 최소 3문장**이 기준.

---

## 작업 절차

### Phase 1 — 원문 확인 (필수 선행)

1. 헤드리스 3사건 각 1회 실행하여 transcript 생성:
   ```bash
   node tests/run-84-headless.cjs --case spouse-01
   node tests/run-84-headless.cjs --case family-01
   node tests/run-84-headless.cjs --case friend-01
   ```

2. `tests/transcripts/{caseId}.json` 에서 **turn 17 / turn 18** 발화를 추출. 스피커(a/b), dispute, lieState, scripted 여부 확인.

3. scripted 경로라면 해당 원문이 아래 후보 중 하나에 저장되어 있음:
   - `src/data/scriptedText/{caseId}.json` (ScriptedText 채널 — `interrogation` / `empathy_approach` / `contradiction_pursuit` 등 S5 entries)
   - `src/data/claimPolicies/{caseId}-v2-atoms.json` (v2 atoms — stage S5, party a/b, disputeId)

4. 각 6건의 원문 + 파일 경로 + 라인 번호 목록화.

### Phase 2 — 재작성 스펙

각 S5 자백에 대해 아래 **모두 충족**:

| # | 항목 | 내용 |
|---|---|---|
| 1 | **최소 3문장** | 단락 하나 내 3~5문장 구성 |
| 2 | **구체적 사실 1문장** | 금액(280만원), 시각(2026.02.15 03:17), 인물 실명(최민정), 기관 정식명칭(간병센터 상담팀장) 중 사건 맥락에 맞는 항목을 **1개 이상** 포함 |
| 3 | **왜 숨겼는지 1문장** | 동기 — 두려움, 수치심, 관계 보호 등 |
| 4 | **심정 1문장** | 격양 혹은 체념 감정, 방어가 무너진 톤 |
| 5 | **Truth Throttle.open 준수** | S5이므로 **모호한 표현 금지** (`상당한 금액`, `그 사람` → 구체화) |
| 6 | **호칭 규칙 유지** | 재판관 상대 합니다체 / 상대 지칭 "제 아내/제 남편" / 격앙 시만 이름 호출 |
| 7 | **번역체 9패턴 0건** | `~된 것으로 생각됩니다`, `~인 측면이 있었습니다` 등 절대 금지 |

### 사건별 필수 구체 정보

**spouse-01 (박지연 vs 이준호)**:
- 송금: `280만원` 공동계좌에서, `간병센터 상담팀장 최민정`에게 `처가 쪽 간병 예약금` 명목
- 새벽 전화: 최민정과의 업무 통화
- 비자금 2,000만원: B의 개인 자금 (처가 자존심 보호)
- A 측: 공동 적금 `3,000만원` 해지 + 투자 손실 맥락 (h-d3 쟁점)

**family-01 (윤태성 vs 윤정후)**:
- 공증 시점 어머니 판단능력 제한
- 유서 조작 방향: 자기 몫 축소 (60:40 → 더 낮추려 함)
- 비밀 생활비: 월 40~60만원대 장기 송금 (20년 기간)
- 출생 비밀: 형이 혈연 아님

**friend-01 (송다은 vs 최수민)**:
- 예비신랑에게 먼저 경고 (송다은 본인 건너뛰고)
- 과거 손절 이유: 돈 문제 은폐
- 단톡방 공개: 확인 전 공개 선택
- 아버지 돈 부탁 (최수민 측)과의 시점 겹침

### Phase 3 — 수정 적용

각 6건 원문의 해당 파일 entry text를 위 스펙 맞게 재작성.

- **ScriptedText entries**: 해당 entry의 `text` 필드 직접 교정 (기존 beat 구조 유지, 텍스트만 확장)
- **v2-atoms**: 해당 atom의 `factText` 직접 교정. 단 atom id는 변경하지 말 것.
- **금액/시각/인명 고유값은 이미 atom의 `slot` 또는 case anchorTruth에 있을 수 있음** — 사전 체크 후 기존 값과 불일치 없도록

### Phase 4 — 검증

```bash
# 타입 체크
npx tsc -b --force

# 3사건 헤드리스 (재실행으로 S5 자백 새 텍스트 확인)
node tests/run-84-headless.cjs --case spouse-01
node tests/run-84-headless.cjs --case family-01
node tests/run-84-headless.cjs --case friend-01

# stage1 감사 (품질 회귀)
node tests/stage1-deep-audit.cjs

# V6 런타임 audit (집중-8/9/10 재확인)
# transcript JSON을 넘겨 audit 스크립트 실행 (V6 스캐너는 이미 tests/qw-runtime-audit.cjs 존재)
```

각 turn 17/18의 S5 자백이:
- [ ] 최소 3문장
- [ ] 금액 또는 구체적 실명/시각 포함
- [ ] 왜 숨겼는지 + 심정 톤
- [ ] 번역체 0건
- [ ] 호칭 위반 0건
- [ ] 집중-8/9/10 0건 유지

### Phase 5 — 산출물

`tmp/qw-v6-s5-followup-report.md` 작성:

```markdown
# QW v6 S5 자백 보강 — 후속 리포트

## 대상 6건 상세
| 사건 | turn | 원본 위치 | 원본 요약 | 재작성 요약 |
|---|---|---|---|---|
| spouse-01 | 17 | {파일:라인} | {60자 발췌} | {60자 발췌} |
| ... 6행 ... |

## 검증
- tsc: ✓
- 헤드리스 3사건: ✓
- stage1-deep-audit: ✓
- V6 스캐너(qw-runtime-audit): 집중-8/9/10 = 0/0/0

## 남은 이슈
- {없으면 빈 섹션}
```

---

## 수정 권한

### ✅ 직접 수정 가능

- `src/data/scriptedText/{caseId}.json` entry `text` 보강
- `src/data/claimPolicies/{caseId}-v2-atoms.json` atom `factText` 보강 (단 id 변경 금지)
- `npx tsc -b --force` 통과 확인 후 커밋 전 CT 보고

### ⚠️ CT 경유

- 사건 anchorTruth 변경
- 새 atom/entry 추가
- 엔진 로직 변경 (Truth Throttle 기준 등)
- 기타 텍스트 외 파일

### 필수 절차

- 매 수정 후 tsc 통과 확인
- 커밋 **금지** — CT가 검수 후 일괄 커밋
- 산출물 `tmp/qw-v6-s5-followup-report.md` 작성
- 작업 완료 후 CT 보고

---

## 예상 소요

- Phase 1 원문 확인: 30~45분
- Phase 2~3 재작성: 6건 × 10~15분 = 60~90분
- Phase 4 검증: 20~30분
- **총 2~3시간**

---

## 참고 자료

- [ct-to-threadQW-v6-fulltest.md](ct-to-threadQW-v6-fulltest.md) (V6 본 가이드)
- [ct-to-threadQW-v5-fulltest.md](ct-to-threadQW-v5-fulltest.md) (V5 체계 상속)
- [llm-quality-tuning-guide.md](llm-quality-tuning-guide.md) 특히 섹션 6~7 (Truth Throttle)
- [tmp/thread-qw-v6-final-report.md](../../../tmp/thread-qw-v6-final-report.md) (본 세션 리포트)
- [tmp/thread-q-codex-v6-final-report.md](../../../tmp/thread-q-codex-v6-final-report.md) (이월 6건 식별)
- `CLAUDE.md` — 호칭/번역체/한국어 품질 규칙

---

## 시작 체크리스트

- [ ] `git status` clean 확인 (Modified 0건)
- [ ] 베이스 커밋 `38f4e55` 이상 확인
- [ ] 이 문서 + 위 참고자료 정독
- [ ] Phase 1 헤드리스 실행 + transcript 확인
- [ ] 6건 원문 목록화 후 CT 보고 (선택) → 재작성 시작
- [ ] Phase 4 검증 전수 통과 후 산출물 작성
