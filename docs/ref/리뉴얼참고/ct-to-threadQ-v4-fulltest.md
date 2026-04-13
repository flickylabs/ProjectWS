# CT → Thread Q: V4 통합 심층 테스트 가이드

> 발신: CT (Control Tower)
> 수신: Thread Q (QA)
> 일시: 2026-04-13
> 유형: V4 대규모 업데이트 통합 검증
> 커밋 범위: 89f1fab ~ 30d141b (12+ 커밋)

---

## 중요: dev server 반드시 재시작 후 테스트

이전 테스트에서 dev server 미재시작으로 소스 변경 미반영 이슈가 있었음.
반드시 종료 후 재시작한 뒤 테스트 실행.

---

## Level 1: 구조 검증 (자동화)

기존 항목 유지 + V4 추가:

| # | 항목 | 검증 방법 |
|---|------|----------|
| 1-1 | RuntimeCaseData 필드 완전성 | `validate-runtime-template-coverage.cjs` |
| 1-2 | evidence/dispute/character 참조 정합성 | 상동 |
| 1-3 | 필수 필드 누락 여부 | 상동 |
| **1-4** | **emergence AND 조건 (lieThresholdAll)** | family-01 d-5, friend-01 d-5: 배열 requireDispute 정상 파싱 |
| **1-5** | **emergence 경로 제한** | unlockCondition 있는 dispute에 evidence/witness/truth_confrontation 경로 비생성 |
| **1-6** | **증거 requiredLieState 국소화** | proves[] 쟁점만 체크 (전역 max 아님) |
| **1-7** | **ScriptedText 9채널 키 매칭** | 94/94 전부 매칭 (miss 0) |

### 검증 대상 사건
- spouse-01 (기준본)
- family-01 (emergence AND + 증거 체인)
- friend-01 (emergence AND + 증거 체인)

---

## Level 2: ScriptedText 검증 (자동화)

기존 6채널 + V4 신규 9채널:

### 기존 채널 (6종)
| 채널 | 검증 |
|------|------|
| interrogation | 키 완전성, variant 수, lieState 범위 |
| evidence_present | 키 완전성, subjectRole 정합성 |
| dossier | 키 완전성 |
| witness | depth 3종 커버 |
| aftermath | resultClass 커버 |
| system_message | eventType 커버 |

### V4 신규 채널 (9종 — spouse-01만)
| 채널 | entries | 검증 |
|------|---------|------|
| contradiction_pursuit | 16 | party × dispute × lieState 커버 |
| interjection | 8 | party × dispute × severity 커버 |
| emotional_overload | 4 | party × dispute 커버 |
| evidence_discovery | 12 | party × evidence × step 커버 |
| trust_action | 18 | party × action × lieState 커버 |
| mediation | 6 | party × resultClass 커버 |
| judge_question | 24 | dispute × questionType × depth 커버 |
| judge_contradiction | 6 | dispute × tone 커버 |
| system_message_v2 | 8 | 상황별 변형 |

### 폴백 동작 확인
- family-01/friend-01: 신규 9채널 ScriptedText 없음 → LLM 폴백 정상 동작
- TypeError/undefined 0건

---

## Level 3: 시맨틱 검증 (자동화 + 수동)

기존 항목 유지 + V4 추가:

| # | 항목 | PASS 기준 |
|---|------|----------|
| 3-1 | Truth Throttle 준수 | S0에서 구체적 금액/이름 노출 금지 |
| 3-2 | 번역체 9패턴 검출 | 0건 |
| 3-3 | 호칭 규칙 위반 | 0건 |
| **3-4** | **재판관 질문 직접 인용 금지** | `'${prev}'라고 하셨는데` 패턴 0건 |
| **3-5** | **재판관 기계적 관찰문 금지** | "태도에 변화가 감지됩니다" 등 0건 |
| **3-6** | **spouse-01 영수증 데이터** | "(핵심)", "(여성/청소년)" 문구 없음 |
| **3-7** | **TransitionChoiceModal 문구** | "모순을 파고든다" / "숨긴 이유를 캔다" / "증거를 들이민다" |

---

## Level 4: NPC 대사 품질 (수동 — 가장 중요)

기존 4-A1~A20 + V4 추가:

### 기존 항목 (4-A1~A20)
| 항목 | 기준 |
|------|------|
| 4-A1 | 호칭 일관성 (toJudge vs toPartner 혼동 없는가) |
| 4-A2 | 자연스러운 한국어 (번역체 아닌가) |
| 4-A3 | archetype별 말투 차이 |
| 4-A4 | verbal tell이 자연스럽게 녹아 있는가 |
| 4-A5 | LieState 진행에 따른 톤 변화 |
| 4-A6 | variant 실질적 차이 |
| 4-A7 | scaffold/템플릿 흔적 없음 |

### V4 추가 항목 (4-B1~B8)
| 항목 | 기준 |
|------|------|
| **4-B1** | **모순 추궁 응답**: S1~S4별 톤 에스컬레이션 자연스러운가 |
| **4-B2** | **끼어들기**: minor/major 강도 차이, 캐릭터 성격 반영 |
| **4-B3** | **감정 과부하**: 울먹임/침묵/분노 + 2턴 후 복귀 자연스러운가 |
| **4-B4** | **재판관 심문 질문**: depth 1~4별 구체성 증가, 사건 맥락 반영 |
| **4-B5** | **재판관 모순 추궁**: soft/mid/hard 톤 차이, 간접 참조만 사용 |
| **4-B6** | **신뢰 행동 응답**: separation(경계풀림)/confidential(안도)/immediate(압박) 차이 |
| **4-B7** | **증거 발견 시퀀스**: probe→slip→capture→confirm 4단계 자연스러운 흐름 |
| **4-B8** | **중재 대화**: resultClass별 적절한 반응, 호칭 규칙 준수 |

---

## Level 5: 게임플레이 검증 (수동)

기존 Phase 검증 + V4 추가:

### 기존 Phase 검증
| Phase | 검증 |
|-------|------|
| Phase 0 | 사건 소개가 흥미를 유발하는가 |
| Phase 1/2 | 초기/반박 진술이 자연스러운가 |
| Phase 3~5 | 심문 루프 작동 (질문→응답→전이→해금) |
| Phase 6/7 | 중재/판결이 의미 있는가 |
| Result | 점수/칭호/후일담 적절 |

### V4 추가 검증 (5-V1~V15)
| # | 항목 | PASS 기준 |
|---|------|----------|
| **5-V1** | **핫바 6슬롯** | [추궁][탐색][공감][자유질문][증거제시][증인소환] 순서, 키보드 1~6 |
| **5-V2** | **Q/W/E 특수 버튼** | 핫바 위 가로 배치, 클릭+키보드 동작 |
| **5-V3** | **캐릭터 선택** | A=파란 pulse, B=빨간 pulse, 확실한 시각 피드백 |
| **5-V4** | **증거 팝업** | 분류(주황) + 태그(회색배지) + 제목(좌측) + 증거열람(설명 우측 1개) |
| **5-V5** | **SVG 뷰어 복귀** | 증거열람 → SVG → 닫기 → 증거 팝업 복귀 |
| **5-V6** | **핫바 증거제시 플로우** | 선택 → 증거 정보 패널 (직접 제시 아님) |
| **5-V7** | **발언노트** | 컴팩트 리스트 + T{n}\|S{n} + 확장패널 + 핀 최상단 |
| **5-V8** | **발언기록 팝업** | "발언 기록 - Turn N" + 화자 색상 우측 + 쟁점 구분자 |
| **5-V9** | **시스템 메시지 6종** | 모순=빨강, 증거=녹색, 경고=주황, 성공=파랑, 증인=청록 |
| **5-V10** | **모순 추궁 1회 제한** | 사용 후 "추궁 완료" + 비활성화 |
| **5-V11** | **전략 선택 모달** | 버튼 가로 3개, 턴당 1회만 |
| **5-V12** | **Phase 번호** | 심문=Phase 2, 중재=Phase 3, 판결=Phase 4 |
| **5-V13** | **중재/판결 패널** | 화면 중앙 불투명 팝업 |
| **5-V14** | **후일담** | LLM 3문단 상세 (짧은 ScriptedText 아님) |
| **5-V15** | **BGM** | 홈=title, Phase0~3=court, 중재/판결=verdict, 결과=result |

### emergence / 증거 체인 검증 (family-01 / friend-01)
| # | 항목 | PASS 기준 |
|---|------|----------|
| **5-E1** | **family-01 emergence 순차** | d-2→d-3→d-4→d-5, d-1 종료 시 d-4 미노출 |
| **5-E2** | **family-01 d-5 AND 조건** | d-3 S3 AND d-4 S2 모두 충족 시에만 |
| **5-E3** | **family-01 증거 국소** | e-1 제시만으로 e-4~7 전부 해금 안 됨 |
| **5-E4** | **friend-01 d-5 AND 조건** | d-3 S3 AND d-4 S2 모두 충족 시에만 |
| **5-E5** | **friend-01 증거 순차** | e-4/e-5/e-6 순차 해금 |
| **5-E6** | **spouse-01 리그레션** | 기존 PASS 유지, d-2→h-d3→h-d4 정상 |

---

## 테스트 실행 방법

### 자동화 (Level 1~3)
```bash
npm run dev:pc

# spouse-01
CASE_KEY=spouse-01 RUN_PROFILE=focus9 node tmp/spouse-01-v4-playthrough.mjs

# family-01
CASE_KEY=family-01 RUN_PROFILE=focus11 node tmp/spouse-01-v4-playthrough.mjs

# friend-01
CASE_KEY=friend-01 RUN_PROFILE=focus11 node tmp/spouse-01-v4-playthrough.mjs
```

### 수동 (Level 4~5)
```
https://solomon-mvp-pc.vercel.app
spouse-01 풀 플레이스루 (Phase 0 → Result)
```

---

## 테스트 리포트 포맷

```markdown
# Thread Q Play Test Report: V4 통합

## 테스트 환경
- 일시: YYYY-MM-DD
- 플랫폼: PC (Vercel / localhost)
- 커밋: 30d141b

## Level 1: 구조 검증
- 1-1~1-3 기존: PASS / FAIL
- 1-4 emergence AND: PASS / FAIL
- 1-5 emergence 제한: PASS / FAIL
- 1-6 증거 국소: PASS / FAIL
- 1-7 ScriptedText 9채널: PASS / FAIL (miss 수)

## Level 2: ScriptedText 검증
- 기존 6채널: PASS / FAIL
- 신규 9채널: PASS / FAIL (채널별 miss 수)
- 폴백 동작: PASS / FAIL

## Level 3: 시맨틱 검증
- 3-1~3-3 기존: PASS / FAIL
- 3-4 재판관 직접 인용: PASS / FAIL (건수)
- 3-5 재판관 기계적 관찰: PASS / FAIL (건수)
- 3-6 영수증 데이터: PASS / FAIL
- 3-7 TransitionChoice 문구: PASS / FAIL

## Level 4: NPC 대사 품질
- 4-A1~A20 기존: PASS / FAIL
- 4-B1 모순추궁 응답: PASS / FAIL
- 4-B2 끼어들기: PASS / FAIL
- 4-B3 감정과부하: PASS / FAIL
- 4-B4 재판관 질문: PASS / FAIL
- 4-B5 재판관 모순추궁: PASS / FAIL
- 4-B6 신뢰행동 응답: PASS / FAIL
- 4-B7 증거발견 시퀀스: PASS / FAIL
- 4-B8 중재 대화: PASS / FAIL

## Level 5: 게임플레이
- Phase 0~Result 기존: PASS / FAIL
- 5-V1~V15 UI 검증: PASS / FAIL (항목별)
- 5-E1~E6 emergence/증거: PASS / FAIL (항목별)

## 최종 판정
- **PASS** / **FAIL** / **CONDITIONAL**

## 블로커 목록
1. ...

## 개선 제안
1. ...
```

산출물: `tmp/thread-q-v4-fulltest-report.md`

---

## PASS 기준

### PASS (모든 항목 충족)
- Level 1~3: 전체 PASS (자동화 0 FAIL)
- Level 4: 4-A1~A20 + 4-B1~B8 전체 PASS
- Level 5: 5-V1~V15 + 5-E1~E6 블로커 0건

### CONDITIONAL
- Level 4에서 경미한 WARN만
- Level 5에서 블로커 없이 개선 제안만

### FAIL
- Level 1~3 FAIL 1건 이상
- Level 4 FAIL 1항목 이상
- Level 5 블로커 1건 이상
