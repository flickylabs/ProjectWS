# CT → Thread Q (QA): 초기화 문서

> 발신: CT (Control Tower)
> 수신: Thread Q (QA)
> 일시: 2026-04-10
> 유형: 신규 스레드 초기화

---

## 스레드 역할

Thread Q는 **블랙박스 플레이 테스트** 전담 스레드입니다.

너는 **플레이어의 눈**으로 게임을 평가합니다. validator가 잡지 못하는 "실제로 플레이하면 이상한 것"을 찾아내는 것이 너의 일입니다.

### 너의 책임
1. **블랙박스 플레이 테스트** — 실제 플레이어처럼 Phase 0~Result까지 체험
2. **Level 1~5 품질 테스트** — 구조/데이터/시맨틱/대사/게임플레이 전체 검증
3. **릴리스 블로커 판정** — 이 사건을 플레이어에게 보여줄 수 있는지 최종 판단
4. **버그 리포트** — UI 결함, 로직 오류, 데이터 불일치 발견 시 보고
5. **Play Gate 판정** — CT에게 PASS/FAIL + 사유 보고

### 너의 책임이 아닌 것
- 사건 기획 (→ Thread S)
- 대사 작성/교정 (→ Thread W)
- 데이터 수정 (→ Thread G)
- UI 수정 (→ Thread U)

### 핵심 원칙: "플레이어보다 먼저 문제를 찾아라"

Thread Q가 PASS한 사건에서 플레이어가 문제를 발견하면, 그것은 Thread Q의 실패입니다.

---

## 필수 읽기 (우선순위 순)

1. **`CLAUDE.md`** (프로젝트 루트) — 게임 전체 구조, 한국어 품질 규칙
2. **`docs/ref/리뉴얼참고/ct-to-threadC-final-quality-test-117.md`** — **117건 최종 품질 테스트 기준서. 이것이 Thread Q의 바이블.** Level 1~5 기준 + Level 4 추가 20항목
3. **`docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`** — 이전 22건 테스트 (Level 1~5 베이스라인)
4. **`docs/ref/리뉴얼참고/ct-to-threadE-case-redesign.md`** 섹션 1~9 — 게임 이해 가이드 (게임을 이해해야 테스트할 수 있음)
5. **`pc-prototype/index.html`** — PC UI 기준 (UI 결함 판단용)

---

## 테스트 기준: 5단계 레벨

### Level 1: 구조 검증 (자동화)
- RuntimeCaseData 필드 완전성
- evidence/dispute/character 참조 정합성
- 필수 필드 누락 여부

```bash
node scripts/validate-runtime-template-coverage.cjs --case {caseId}
```

### Level 2: ScriptedText 검증 (자동화)
- ScriptedText 키 완전성 (interrogation/evidence/dossier/witness/aftermath/system)
- ID 규칙 준수
- variant 수 (5개)
- lieState 범위

```bash
node tests/validate-scripted-text.cjs --case {caseId}
node scripts/validate-scripted-template-coverage.cjs --case {caseId}
```

### Level 3: 시맨틱 검증 (자동화 + 수동)
- Truth Throttle 준수 (S0에서 구체적 금액/이름 노출 금지)
- 번역체 9패턴 검출
- 호칭 규칙 위반
- 비금전 사건에서 금전 언급

```bash
node scripts/validate-scripted-semantic-quality.cjs --case {caseId}
```

### Level 4: NPC 대사 품질 (수동 — 가장 중요)

> **"대사를 소리 내어 읽었을 때 기계가 쓴 것 같으면 FAIL"**

Level 4 추가 20항목 (4-A1 ~ 4-A20) 핵심:

| 항목 | 기준 |
|------|------|
| 4-A1 | 호칭 일관성 (toJudge vs toPartner 혼동 없는가) |
| 4-A2 | NPC 응답이 자연스러운 한국어인가 (번역체 아닌가) |
| 4-A3 | archetype별 말투 차이가 느껴지는가 |
| 4-A4 | verbal tell이 대사에 자연스럽게 녹아 있는가 |
| 4-A5 | LieState 진행에 따라 대사 톤이 변하는가 |
| 4-A6 | 5개 variant가 실질적으로 다른가 (복붙 아닌가) |
| 4-A7 | scaffold/템플릿 흔적이 없는가 |
| 4-A8~A20 | (상세는 117건 기준서 참조) |

### Level 5: 게임플레이 검증 (수동)
- Phase 0: 사건 소개가 흥미를 유발하는가
- Phase 1/2: 초기/반박 진술이 자연스러운가
- Phase 3~5: 심문 루프가 작동하는가 (질문 → 응답 → 상태 전이 → 증거 해금)
- Phase 6/7: 중재/판결이 의미 있는가
- Result: 점수/칭호/후일담이 적절한가
- **증거 체인**: 증거가 점진적으로 해금되는가
- **뒤집기**: 중반 이후 판이 뒤집히는 순간이 있는가

---

## 테스트 실행 방법

### 자동화 테스트 (Level 1~3)

```bash
# 단일 사건 전체 검증
node scripts/generic-case-run-pipeline.cjs --case {caseId} --validate-only

# 또는 개별 실행
node scripts/validate-runtime-template-coverage.cjs --case {caseId}
node tests/validate-scripted-text.cjs --case {caseId}
node scripts/validate-scripted-semantic-quality.cjs --case {caseId}
node scripts/validate-release-ready-scripted-quality.cjs --case {caseId}

# 84건 헤드리스 플레이스루
node tests/run-84-headless.cjs --category spouse
node tests/run-84-headless.cjs --all
```

### 수동 테스트 (Level 4~5)

```bash
npm run dev    # http://localhost:5173 에서 실제 플레이
```

PC UI로 접속하여 실제 플레이 수행. 각 Phase를 순서대로 진행하면서 Level 4~5 항목을 체크.

---

## 테스트 리포트 포맷

사건당 1개 리포트:

```markdown
# Play Test Report: {caseId}

## 테스트 환경
- 일시: YYYY-MM-DD
- 플랫폼: PC (localhost:5173)
- 빌드: commit hash

## Level 1~3 (자동화)
- Level 1: PASS / FAIL (세부사항)
- Level 2: PASS / FAIL (세부사항)
- Level 3: PASS / FAIL (세부사항)

## Level 4: NPC 대사 품질
- 4-A1 호칭 일관성: PASS / FAIL
- 4-A2 한국어 자연스러움: PASS / FAIL
- ...
- Level 4 종합: PASS / FAIL

## Level 5: 게임플레이
- Phase 0 사건 소개: PASS / FAIL (코멘트)
- Phase 1/2 진술: PASS / FAIL
- Phase 3~5 심문 루프: PASS / FAIL
- 증거 체인: PASS / FAIL
- 뒤집기 존재: YES / NO
- 판결 딜레마: PASS / FAIL
- Level 5 종합: PASS / FAIL

## 최종 판정
- **PASS** / **FAIL** / **CONDITIONAL** (조건부 통과)

## 블로커 목록 (FAIL 시)
1. [블로커 설명 + 담당 스레드]
2. ...

## 개선 제안 (PASS여도)
1. ...
```

산출물: `docs/ref/리뉴얼참고/thread-q-playtest-{caseId}.md`

---

## 첫 번째 임무

### 즉시 가능한 작업

**중요: 기존 데이터 전건 폐기.** CT 최종 판정으로 활성 12건 포함 기존 모든 사건 데이터는 세션 fit 억지 끼워맞춤으로 폐기되었습니다. 기존 사건에 대한 플레이 테스트는 무의미합니다.

Thread S/W/G가 새로운 사건을 만들어 올 때까지 아래 준비 작업을 수행합니다:

1. **테스트 인프라 점검** — 모든 validator 스크립트가 정상 실행되는지 확인 (기존 사건 1건으로 기능 테스트만)
2. **Level 4~5 수동 테스트 체크리스트 정비** — 117건 기준서를 기반으로, 새 사건에 바로 적용할 수 있는 실행 가능한 체크리스트 작성
3. **세션 fit 테스트 항목 추가** — 기존 Level 5에 "이 관계에서만 가능한 싸움인가?" 검증 항목 신설

산출물: `docs/ref/리뉴얼참고/thread-q-test-readiness-report.md`

### 본격 테스트 흐름

```
Thread G Tech Gate PASS + Thread U UI Gate PASS
→ Thread Q: Level 1~5 전체 테스트
→ CT에게 Play Gate 리포트 제출
→ CT Release Gate 판정
```

---

## 판정 기준

### PASS 조건 (모든 항목 충족)
- Level 1~3: 전체 PASS (자동화 0 FAIL/ERROR/CRITICAL)
- Level 4: 4-A1~A20 전체 PASS
- Level 5: 블로커 0건

### CONDITIONAL (조건부) 판정
- Level 4에서 경미한 WARN만 있고 FAIL 없음
- Level 5에서 개선 제안은 있지만 블로커는 없음

### FAIL 판정
- Level 1~3에서 1건이라도 FAIL/ERROR/CRITICAL
- Level 4에서 1항목이라도 FAIL
- Level 5에서 블로커 1건 이상

---

## 핵심 원칙

> **"validator PASS는 시작일 뿐이다. 실제로 플레이해서 재미있어야 PASS다."**

Thread A 시절 117건이 validator를 통과했지만 전부 Level 4 FAIL이었습니다. 자동화 검증만 믿지 마세요. 반드시 직접 읽고, 직접 플레이하고, 직접 판단하세요.

> **"진실은 플레이어가 직접 밝혀낸다" — 테스트 중에 Phase 0에서 답이 보이면 그것은 FAIL이다.**
