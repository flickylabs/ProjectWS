# 02. h-d4 Authority 정의 전문

본 파일은 `src/data/coreCases/spouse-01.case.ts`의 h-d4 dispute 정의 KO 본문 발췌. 본 정의가 권위 — ScriptedText 작성 시 본 정의의 `allowedKeywords` / `forbiddenKeywords` / `answerFrame` / `transitionBeat`를 그대로 따라가야 함.

---

## h-d4 메타

| field | 값 |
|---|---|
| id | `h-d4` |
| name | 비자금의 원래 목적 |
| truth | true |
| quadrant | `b_only` |
| weight | high |
| ambiguity | low |
| legitimacyIssue | true |
| hidden | true |
| v3Visibility | hidden |
| correctResponsibility | a: 30 / b: 70 |
| mediationLink | 비자금의 원래 목적과 부부 침묵의 무게 |
| requiredEvidence | `e-8`, `e-9` |
| judgmentStatement | 비자금의 원래 목적은 박지연의 난임 치료비였고, 그 사실을 침묵해 온 책임은 이준호가 더 크다. |

### truthDescription (권위 진실 영역 — pre-confession 노출 X)

> 이준호의 본인 명의 별도 계좌 비자금 3,000만 원은 원래 박지연의 난임 치료비 마련을 위해 신혼 초기부터 10년 가까이 모아 온 자금이었다. 박지연이 진단 후 출산을 포기하고 화제를 회피하자 이준호는 그 결정을 존중하면서도 혼자 의사 친구의 비공식 상담과 보험 상담을 받으며 출산 가능성을 더 알아봤다. 형이 개인회생에 들어가자 그 자금을 형에게 전환했다.

### unlockCondition

- requireDispute: `d-2` minState `S5` (자금 사용처 자백 완료 후)
- runtimeRule: d-2 S5 자백 후 비자금 운용 패턴 의문 + 신규 증거(e-8/e-9) 발현 시
- authoredRule: 자금 사용처는 형으로 확정됐으나 10년 누적 자금이 형 사건 이전부터 모인 패턴 + 휴대폰 검색·보험 상담 기록이 형 사정과 무관한 영역을 가리키면 새 쟁점 부상

### verdictOptions

| 선택 | 텍스트 |
|---|---|
| wrong | 비자금은 처음부터 형에게 줄 돈으로 모은 것이다. |
| partial | 비자금의 원래 목적은 불분명하나 사용처는 형이 맞다. |
| **truth** | **비자금은 원래 박지연의 난임 치료비를 위해 모은 자금이었고, 형 사건 발생 후 그 자금이 형 지원으로 전환되었다.** |
| defer | 원래 목적을 단정할 수 없다. 판단을 유보한다. |

### lieConfig

| Party | lieType | lieIntensity | lieMotive | initial |
|---|---|---|---|---|
| A | LT-1 | L1 | self_protection | S0 |
| B | LT-6 | L3 | partner_protection | S0 |

---

## truthStages — 6단계 권위 (S0~S5)

**※ 각 단계의 `allowedKeywords` / `forbiddenKeywords`는 절대 권위. ScriptedText의 NPC 발화는 해당 단계의 `allowedKeywords` 영역만 사용 + `forbiddenKeywords` 영역 절대 등장 X.**

### S0 (초기 — 표면 frame)

#### A 측

- **admittedFact**: 비자금 사용처는 형이라고 들었다. 다른 목적이 있었는지는 모른다.
- **allowedKeywords**: 형에게 간 돈 / 다른 목적 모른다
- **forbiddenKeywords**:
  - KO: 난임 치료비 / 난임 진단 / 출산 가능성 조사 / 보험 상담 / 의사 친구 상담
  - EN: infertility treatment funds / infertility diagnosis / fertility research / insurance consultation / doctor friend consultation
  - JA: 不妊治療費 / 不妊診断 / 妊娠可能性の調査 / 保険相談 / 医師の友人への相談
  - ZH-CN: 不孕治疗费 / 不孕诊断 / 生育可能性调查 / 保险咨询 / 医生朋友咨询
- **answerFrame**: A는 사용처 = 형으로 확정된 사실 인정. 원래 목적은 별도 영역으로 보지 않음. 난임·치료비 키워드 절대 등장 X.

#### B 측

- **admittedFact**: 비자금은 그냥 모은 돈이다. 사용처는 형 맞다.
- **allowedKeywords**: 그냥 모은 돈 / 사용처 = 형
- **forbiddenKeywords**:
  - KO: 난임 치료비 / 난임 진단 / 아내 모르게 / 출산 가능성 조사 / 보험 상담
  - EN: infertility treatment funds / infertility diagnosis / unbeknownst to wife / fertility research / insurance consultation
  - JA: 不妊治療費 / 不妊診断 / 妻に内緒で / 妊娠可能性の調査 / 保険相談
  - ZH-CN: 不孕治疗费 / 不孕诊断 / 瞒着妻子 / 生育可能性调查 / 保险咨询
- **answerFrame**: B는 비자금 원래 목적 부정. "그냥 모은 돈" frame strict.

### S1 (10년 누적의 다른 이유 가능성 인정)

#### A 측

- **admittedFact**: 남편이 가족 외부 일 때문에 따로 모았다는 설명은 들었지만, 10년 가까이 모은 데에는 다른 이유가 있을 수도 있다.
- **allowedKeywords**: 10년 누적 / 다른 이유
- **forbiddenKeywords**: 난임 치료비 / 난임 진단 / 출산 가능성 조사
- **transitionBeat**: 박지연은 "왜 그렇게 오래 모았지"라며 짧게 자문한다. → 시선이 잠깐 옆을 향했다 돌아온다.

#### B 측

- **admittedFact**: 처음부터 형을 위해 모은 돈은 아니다. 형 일은 나중에 생긴 일이다.
- **allowedKeywords**: 처음부터 형 아님 / 나중에 생긴 일
- **forbiddenKeywords**: 난임 치료비 / 난임 진단 / 아내 모르게 / 출산 가능성 조사
- **transitionBeat**: 이준호는 "원래는 형 일과 별개로 모았다"고 말한다. → 한 박자 늦은 답.

### S2 (수상한 자료 + 보험 상담 인정)

#### A 측

- **admittedFact**: 수상한 메모와 보험 상담 기록이 있다고 들었다. 처음엔 외도 의심까지 들었지만 형 일과는 다른 영역이라는 점을 받아들인다.
- **allowedKeywords**: 수상한 자료 / 보험 상담 / 형 일과 다른 영역
- **forbiddenKeywords**: 난임 치료비 / 난임 진단 / 출산 가능성 조사
- **transitionBeat**: 박지연은 "그건 또 무슨 자료냐"고 묻는다. → 손이 책상 위에서 잠깐 멈춘다.

#### B 측

- **admittedFact**: 휴대폰 검색 기록과 보험 상담 기록은 본인 것이 맞다. 다만 가입까지 가지는 않았다.
- **allowedKeywords**: 휴대폰 검색 / 보험 상담 / 가입 안 함
- **forbiddenKeywords**: 난임 치료비 / 난임 진단 / 출산 가능성 조사 / 아내 모르게
- **transitionBeat**: 이준호는 "그건 그냥 알아본 정도"라고 말한다. → 말끝이 흐려진다.

### S3 (출산 관련 조사 인정 — 본인 영역 직접 언급)

#### A 측

- **admittedFact**: 남편이 본인 모르게 출산 가능성을 알아본 영역이 있었다는 사실을 받아들인다.
- **allowedKeywords**: 출산 관련 조사 / 본인 모르게
- **forbiddenKeywords**: 난임 진단
- **transitionBeat**: 박지연은 처음으로 "그 사람이 그걸 혼자 알아봤었구나"라고 말한다. → 숨을 한 번 길게 내쉰다.

#### B 측

- **admittedFact**: 아내에게 부담을 주지 않으려고 혼자 출산 가능성을 알아본 시기가 있었다. 의사 친구와 상담했고 보험도 알아봤지만 가입은 하지 않았다.
- **allowedKeywords**: 혼자 알아봄 / 의사 친구 상담 / 보험 상담 / 가입 안 함 / 부담 주지 않으려
- **forbiddenKeywords**: 난임 진단 / 난임 치료비
- **transitionBeat**: 이준호는 "혼자라도 알아봐야 했다"고 말한다. → 어깨가 한 번 내려간다.

### S4 (난임·치료비 frame 명시)

#### A 측

- **admittedFact**: 남편의 조사가 본인 난임 진단과 관련된 영역이었다는 점을 인정한다. 그 화제를 다시 꺼낸 적이 없다는 점도 인정한다.
- **allowedKeywords**: 난임 진단과 관련 / 화제 회피
- **forbiddenKeywords**: (없음 — 모두 허용)
- **transitionBeat**: 박지연은 "그 화제는 내가 닫아 둔 거였다"고 말한다. → 손이 책상 위에서 길게 멈춘다.

#### B 측

- **admittedFact**: 비자금은 아내의 난임 치료비를 위해 모은 자금이었다. 의사 친구와 보험 상담은 모두 그 목적이었다.
- **allowedKeywords**: 난임 치료비 / 본 목적 / 의사 친구 / 보험 상담
- **forbiddenKeywords**: (없음)
- **transitionBeat**: 이준호는 처음으로 "치료비"라는 단어를 꺼낸다. → 호흡이 한 번 깊어진다.

### S5 (완전 자백)

#### A 측

- **admittedFact**: 남편의 비자금이 본인의 난임 치료비를 위한 자금이었다는 사실을 완전히 받아들인다. 본인이 그 화제를 닫고 회피한 것도 부부 침묵의 한 축이었음을 인정한다.
- **allowedKeywords**: 난임 치료비 / 부부 침묵의 한 축 / 회피의 책임
- **forbiddenKeywords**: (없음)
- **transitionBeat**: 박지연은 두 사람의 침묵을 처음으로 한 묶음으로 말한다. → 시선이 잠깐 남편 쪽을 향한다.

#### B 측

- **admittedFact**: 신혼 초기부터 박지연의 난임 치료비를 위해 본인 명의 별도 계좌에 비자금 3,000만 원을 모았고, 의사 친구의 비공식 상담과 보험 상담을 받았으나 가입은 하지 않았다. 형이 개인회생에 들어간 뒤 그 자금을 형에게 전환했다.
- **allowedKeywords**: 난임 치료비 / 신혼 초기 / 의사 친구 상담 / 보험 상담 / 가입 없음 / 형 사건 후 전환
- **forbiddenKeywords**: (없음)
- **transitionBeat**: 이준호는 "그 돈은 처음엔 당신을 위한 거였다"고 말한다. → 시선이 흔들리지 않는다.

---

## channelExposure (채널별 진입 단계)

| 채널 | minLieState | isSurfaceOnly | isDossierSurface |
|---|---|---|---|
| judge_question | S0 | true | false |
| judge_contradiction | S0 | true | false |
| judge_evidence_combo | S2 | true | false |
| judge_witness_summon | S2 | true | false |
| dossier | S2 | false | true |
| interrogation | S0 | false | false |
| contradiction_pursuit | S1 | false | false |
| evidence_present | S2 | false | false |
| mediation | S4 | false | false |
| aftermath | S5 | false | false |
| free_interrogation | S0 | false | false |

---

## progressionStages — 진행 단계 권위

| stage | surfaceClaim | hiddenTruth | requiredEvidence | requiredWitness | unlocks |
|---|---|---|---|---|---|
| S0 | 사용처 = 형으로 확정 / 다른 목적 없음 | 비자금 원래 목적 = 난임 치료비 | (없음) | (없음) | — |
| S1 | 10년 누적의 다른 이유 / 처음부터 형 아님 | 비자금 원래 목적 = 난임 치료비 | `e-5` | (없음) | — |
| S2 | 수상한 자료 / 보험 상담 (가입 X) | 출산 가능성 조사 + 난임 치료비 | `e-8`, `e-9` | (없음) | `dc-8` |
| S3 | 출산 관련 조사 / 혼자 알아봄 | 난임 치료비 + 아내 부담 회피 | `e-8`, `e-9` | (없음) | — |
| S4 | 난임 치료비 / 본 목적 명시 | 부부 침묵의 책임 분리 | (없음) | (없음) | — |
| S5 | 완전 인정 | — | (없음) | (없음) | — |
