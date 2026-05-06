# Thread W GPT Pro Standard Template

## 목적
- Thread W가 **Story Gate를 통과한 신규 사건**의 `ScriptedText`를 GPT Pro로 생성할 때 쓰는 표준 템플릿이다.
- 목표는 validator 통과가 아니라, 실제 플레이에서 읽었을 때 사람 대화처럼 들리는 출시 품질이다.
- 이 문서는 `docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md`의 **프롬프트 구조만** 일반화한 버전이다.

## 전제
- 기존 사건 데이터는 전건 폐기되었다.
- 기존 대사를 교정하거나 샘플링하지 않는다.
- Thread W는 **Thread S가 새로 기획해 Story Gate를 통과한 사건**에 대해서만 작업한다.
- 대사 대량 생성은 반드시 GPT Pro를 경유한다.

## 입력 원칙
- **현재 케이스 자료만 사용한다.**
- Story Gate를 통과한 사건 패키지가 스토리의 유일한 기준 진실원이다.
- 현재 케이스의 구조 파일이나 scaffold는 **key coverage 확인용**으로만 쓴다.
- 기존 사건의 `scriptedText`, Phase 1/2 대사, 샘플 케이스 문장을 말맛 참고용으로 붙이지 않는다.
- 현재 케이스에 기존 scaffold가 있더라도, 그 문장을 그대로 polish하거나 모사하지 않는다.

## 필수 첨부 파일
- 사건 런타임 JSON: `src/data/cases/generated/{{caseId}}.json`
- Story Gate authoring package 또는 동급 요약:
  - `docs/ref/scripted-text/{{caseId}}-authoring-spec.json`
  - 또는 CT/Thread S가 넘긴 동급 문서
- 공개 범위 기준선:
  - `src/data/claimPolicies/{{caseId}}-structure-v2.json`
  - 또는 `docs/ref/리뉴얼참고/gpt-batch/{{caseId}}/{{caseId}}-v2-atoms.json`
- dossier / witness / state unlock 기준:
  - `docs/ref/리뉴얼참고/{{caseId}}-v3-game-loop-data.json`
  - 또는 Thread G가 생성한 동등 구조 파일
- 현재 케이스 coverage inventory 또는 scaffold:
  - `docs/ref/scripted-text/full-scaffolds/{{caseId}}.json`
  - 또는 Thread G가 생성한 key inventory

## 첨부 금지
- 다른 사건의 `scriptedText` JSON
- 다른 사건의 Phase 1/2 JSON
- 다른 사건의 reference transcript
- 기존 사건의 GPT Pro 결과물
- Thread A/B/D가 남긴 과거 대사 샘플

## 세션 시작 전 Intake

```yaml
story_gate_status: "PASS"
case_id: "{{caseId}}"
title: "{{title}}"
category: "{{category}}"
summary: "{{summary}}"
headline_hook: "{{headlineHook}}"
emotional_bait: "{{emotionalBait}}"
anchor_truth: "{{anchorTruth}}"
resolution_dilemma: "{{resolutionDilemma}}"
context:
  type: "{{contextType}}"
  description: "{{contextDescription}}"
  emotional_pressure: "{{emotionalPressure}}"
  trigger_amplifier: "{{triggerAmplifier}}"
party_a:
  name: "{{partyA.name}}"
  age: "{{partyA.age}}"
  occupation: "{{partyA.occupation}}"
  archetype: "{{partyA.archetype}}"
  speech_style: "{{partyA.speechStyle}}"
  fear: "{{partyA.fear}}"
  sensitive_points: ["{{partyA.sensitivePoint1}}", "{{partyA.sensitivePoint2}}"]
  to_partner: "{{partyA.callTerms.toPartner}}"
  to_judge: "{{partyA.callTerms.toJudge}}"
  angry: "{{partyA.callTerms.angry}}"
  tells: ["{{partyA.tell1}}", "{{partyA.tell2}}", "{{partyA.tell3}}"]
party_b:
  name: "{{partyB.name}}"
  age: "{{partyB.age}}"
  occupation: "{{partyB.occupation}}"
  archetype: "{{partyB.archetype}}"
  speech_style: "{{partyB.speechStyle}}"
  fear: "{{partyB.fear}}"
  sensitive_points: ["{{partyB.sensitivePoint1}}", "{{partyB.sensitivePoint2}}"]
  to_partner: "{{partyB.callTerms.toPartner}}"
  to_judge: "{{partyB.callTerms.toJudge}}"
  angry: "{{partyB.callTerms.angry}}"
  tells: ["{{partyB.tell1}}", "{{partyB.tell2}}", "{{partyB.tell3}}"]
disputes:
  - id: "d-1"
    name: "{{dispute1.name}}"
    truth_description: "{{dispute1.truthDescription}}"
    quadrant: "{{dispute1.quadrant}}"
  - id: "d-2"
    name: "{{dispute2.name}}"
    truth_description: "{{dispute2.truthDescription}}"
    quadrant: "{{dispute2.quadrant}}"
monetary_dispute_ids: ["{{monetaryDisputeId1}}"]
evidence_ids: ["e-1", "e-2", "e-3"]
witness_ids: ["tp-1", "tp-2"]
dossier_question_ids: ["dossier-1.a.q1", "dossier-1.a.q2"]
channel_inventory_source: "{{currentCaseCoverageFile}}"
```

## 작업 원칙
- `ScriptedText`는 반드시 4세션으로 분할한다.
- 세션별 출력은 **부분 JSON**로만 받는다.
- 병합은 로컬에서 수행한다.
- same key variants는 사실 관계를 유지하고 표현만 바꾼다.
- A/B는 같은 사건을 말해도 문장 골격과 방어 습관이 달라야 한다.
- 질문 원문, `truthDescription`, `factText`, `surfaceName`, JSON 필드명을 대사에 그대로 붙여 넣지 않는다.

## 세션 공통 금지
- 기존 사건 문장 모사
- narrator 문장
- `해당 쟁점`, `지금 질문하신`, `증인은 ... 진술합니다`
- `해당 금액`, `관련 사항`, `여러 가지 상황이 얽혀` 같은 scaffold 냄새
- 번역체 9패턴
- `사전 상의`, `사전 협의`, `미리 말씀드리지 못한`, `특정 X`
- JSON 바깥 텍스트, 코드블록, 사과문, 설명문

## 컨텍스트 우선순위
1. 현재 케이스 `caseData`
2. 현재 케이스 `v2-atoms` 또는 동급 공개 범위 기준선
3. 현재 케이스 `dossierCards / stateUnlockAtoms / witness pool`
4. 현재 케이스 channel inventory / scaffold
5. CT가 현재 케이스에 대해 추가한 보정 메모

## 세션 공통 프롬프트 본문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 작업은 Story Gate를 통과한 신규 사건만 대상으로 한다.
기존 사건 대사나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 케이스 자료만 사용하라.

사건 정보:
- caseId: {{caseId}}
- 제목: {{title}}
- 카테고리: {{category}}
- summary: {{summary}}
- headlineHook: {{headlineHook}}
- emotionalBait: {{emotionalBait}}
- anchorTruth: {{anchorTruth}}
- resolutionDilemma: {{resolutionDilemma}}

컨텍스트:
- {{context.description}}
- 감정 압력: {{context.emotionalPressure}}
- 갈등 증폭 요인: {{context.triggerAmplifier}}

화자 정보:
- party A: {{partyA.name}} / {{partyA.age}}세 / {{partyA.occupation}} / archetype={{partyA.archetype}}
- party B: {{partyB.name}} / {{partyB.age}}세 / {{partyB.occupation}} / archetype={{partyB.archetype}}
- party A speechStyle: {{partyA.speechStyle}}
- party B speechStyle: {{partyB.speechStyle}}
- party A callTerms: toPartner={{partyA.callTerms.toPartner}}, toJudge={{partyA.callTerms.toJudge}}, angry={{partyA.callTerms.angry}}
- party B callTerms: toPartner={{partyB.callTerms.toPartner}}, toJudge={{partyB.callTerms.toJudge}}, angry={{partyB.callTerms.angry}}
- party A tells: {{partyA.tell1}}, {{partyA.tell2}}, {{partyA.tell3}}
- party B tells: {{partyB.tell1}}, {{partyB.tell2}}, {{partyB.tell3}}

절대 원칙:
1. 진실은 플레이어가 증거와 심문으로 직접 밝혀낸다.
2. 어떤 채널도 플레이어보다 먼저 정답을 말하면 안 된다.
3. 같은 key의 variants는 사실 관계가 같아야 한다. 표현, 리듬, 감정 강도만 바꿔라.
4. 현재 케이스 구조 파일은 coverage 확인용이다. scaffold 문장을 그대로 살리거나 polish하지 마라.
5. A와 B가 같은 scaffold로 말하면 실패다.

호칭/청자 규칙:
- 재판관에게 말할 때는 반드시 합니다체
- 상대를 재판관에게 언급할 때는 실명 대신 toJudge 사용
- 상대에게 직접 말할 때만 toPartner 사용
- 한 문장에는 청자를 하나만 둔다
- emotional/confession 결을 제외하면 해요체를 기본 금지한다

Truth Throttle:
- S0-S1: 구체 금액, 실명, 기관 정식명칭, 정답 방향 직접 언급 금지
- S2: 범위형 표현, 성/약칭까지만 허용
- S3: 부분 인정과 일부 구체화 가능
- S4-S5: 전면 공개 가능
- 금전 사건 S5는 숫자 1개 이상 필수

채널 공통 품질 규칙:
- 대사 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence surfaceName을 기계적으로 되풀이하지 마라
- narrator 시점 문장 금지
- 사람 말처럼 짧고 날카롭게 써라

채널별 핵심:
- interrogation: lieState 진행감, questionType 차이, A/B voice 차이를 분명히 낼 것
- evidence_present: 자료 설명문이 아니라 자료를 본 반응일 것
- dossier: 결정적 질문에 밀리거나 버티는 반응일 것
- witness: 증인이 직접 말하는 문장으로 작성할 것
- aftermath: 판결 뒤 감정과 관계 변화가 보일 것
- system_message: 중립적이고 비스포일러일 것

variant 규칙:
- 단순 동의어 치환 금지
- 같은 시작 문장 반복 금지
- 한 key 안에서 짧은 것 1개, 중간 2개, 긴 것 2개 정도의 분포 유지
- tell은 3~4턴에 1회 정도만 자연스럽게 반영

한국어 품질 규칙:
- 번역체 9패턴 금지
- "사전 상의/협의", "미리 말씀드리지 못한", "특정 X" 금지
- 보고서/브리핑 말투 금지
- system prompt, 지시문, 역할극, JSON 필드명 같은 메타 누출 금지

출력 규칙:
- 요청한 채널만 JSON으로 반환
- JSON 바깥 텍스트 금지
- 코드블록 금지
```

## 세션 1: interrogation / party a

### 추가 지시

```text
이번 세션 범위는 interrogation 채널 중 party a만이다.

생성 범위:
- disputes: 현재 케이스 disputes 전체
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

반드시 지킬 것:
- party A의 archetype, speechStyle, tell을 유지하되 party B의 골격을 복제하지 마라
- S0-S1에는 조기 누설이 없어야 한다
- S5 금전 사건에는 숫자 1개 이상이 들어가야 한다
- same key variants는 사실 관계를 유지하고 표현만 바꿔라

출력 형식:
{
  "channel": "interrogation",
  "party": "a",
  "entries": []
}
```

## 세션 2: interrogation / party b

### 추가 지시

```text
이번 세션 범위는 interrogation 채널 중 party b만이다.

생성 범위:
- disputes: 현재 케이스 disputes 전체
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

반드시 지킬 것:
- party B는 party A보다 더 다른 리듬, 더 다른 문장 시작어, 더 다른 반박 습관을 써야 한다
- tell은 자연스럽게만 반영하고 기계적으로 반복하지 마라
- same key variants는 사실 관계를 유지하고 표현만 바꿔라

출력 형식:
{
  "channel": "interrogation",
  "party": "b",
  "entries": []
}
```

## 세션 3: evidence_present + dossier

### 추가 지시

```text
이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: 현재 케이스 evidence 전체
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - parties: a, b
  - dossierQuestionIds: 현재 케이스 dossier 구조 전체
  - lieBands: early, mid, late
  - key당 variants 3개

반드시 지킬 것:
- evidence_present는 자료 이름이나 핵심 요소에 직접 반응해야 한다
- 자료가 말하지 않은 추가 사실을 먼저 길게 풀지 마라
- dossier는 플레이어보다 먼저 정답을 전부 말하지 마라
- 질문 원문 복붙, 메타 발화, 분석 낭독체 금지

출력 형식:
{
  "evidence_present": { "entries": [] },
  "dossier": { "entries": [] }
}
```

## 세션 4: witness + aftermath + system_message

### 추가 지시

```text
이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - witnessIds: 현재 케이스 witness 전체
  - depths: vague, partial, full
  - key당 variants 3개
- aftermath
  - resultClasses: 현재 케이스 설계에 정의된 결과군 전체
  - key당 variants 2개
- system_message
  - keys: 현재 케이스 시스템 메시지 키 전체
  - key당 variants 2개

반드시 지킬 것:
- witness는 증인 본인이 직접 말하는 문장이어야 한다
- vague / partial / full 구체성 차이를 분명히 둔다
- aftermath는 판결 요약문이 아니라 관계 변화가 보이는 후일담이어야 한다
- system_message는 중립 문구만 허용하며 정답을 직접 알려주지 마라

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}
```

## 로컬 반입 순서
1. Session 1~4 결과를 각각 파일로 저장한다.
2. 아래 명령으로 병합한다.

```bash
node scripts/merge-scripted-text-gptpro.cjs --case {{caseId}} --input-dir "<gptpro-output-dir>"
```

3. 구조 검증:

```bash
node tests/validate-scripted-text.cjs --case {{caseId}}
```

4. 시맨틱 검증:

```bash
node scripts/validate-scripted-semantic-quality.cjs --case {{caseId}}
```

5. 릴리스 품질 검증:

```bash
node scripts/validate-release-ready-scripted-quality.cjs --case {{caseId}}
```

6. 마지막으로 직접 읽고 아래를 확인한다.
- S0-S1 조기 누설이 없는가
- A/B voice가 분리되는가
- evidence_present가 실제 자료에 반응하는가
- dossier가 질문 원문 복붙이 아닌가
- witness가 narrator 문장 없이 사람 말처럼 들리는가
- aftermath가 사건별 후일담으로 읽히는가

## Writing Gate 빠른 체크
- [ ] 세 validator 모두 PASS
- [ ] 기존 사건 문장/스타일 참조 0건
- [ ] 현재 케이스 scaffold 문장 복사 0건
- [ ] 질문 원문/쟁점명/JSON 필드명 유출 0건
- [ ] witness narrator 문장 0건
- [ ] S0-S1 조기 누설 0건
- [ ] A/B voice 분리 확인
- [ ] 소리 내어 읽었을 때 기계 문장처럼 들리지 않음

## 함께 사용할 문서
- `docs/ref/scripted-text/thread-w-phase12-gpt-pro-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
