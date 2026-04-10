# spouse-01 GPT Pro Web Runbook

웹의 GPT Pro 5.4로 `spouse-01`을 재생성할 때 사용하는 실행 문서다.

## 목적
- `spouse-01` 전체 scripted bundle을 4세션으로 나눠 생성한다
- 로컬 validator 기준으로 특히 아래 문제를 줄이는 것이 목표다
  - `C1`: 재판관 대상 합니다체 위반
  - `D2`: variant 유사도 과다
- 결과물은 최종적으로 `src/data/scriptedText/spouse-01.json`으로 병합한다

## 왜 4세션으로 나누는가
- `interrogation`만 해도 조합 수가 매우 많다
- GPT Pro 웹은 한 번에 너무 많은 key를 넣으면 후반부 품질이 급락한다
- 현재 합의된 배치 전략도 `interrogation-a`, `interrogation-b`, `evidence+dossier`, `witness+aftermath` 분리를 전제로 한다

## 공통 첨부 파일
매 세션마다 아래 파일을 함께 첨부한다.

- `docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md`
- `src/data/cases/generated/spouse-01.json`
- `src/data/claimPolicies/spouse-01-v2-atoms.json`
- `docs/ref/scripted-text/spouse-01-reference.json`
- `docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.json`

## 공통 지침
- `spouse-01-gpt-pro-prompt.md`를 최우선 규칙으로 따른다
- 출력은 반드시 JSON만 반환한다
- 설명문, 사과문, 코드블록을 금지한다
- 기존 `spouse-01.json`의 문제를 복제하지 마라
  - `...이다`
  - `...니까요`
  - `...이지요`
  - 의미만 바꾼 중복 variant
- key 누락이 없도록 범위를 끝까지 채운다
- 각 세션은 부분 산출물만 만들고, 내가 로컬에서 병합한다

## 세션 1: interrogation-a

### 첨부
- 공통 첨부 파일 5개

### 프롬프트
```text
너는 `spouse-01-gpt-pro-prompt.md`를 절대 규칙으로 따르는 scripted text 생성기다.

이번 세션 범위는 `interrogation` 채널 중 party `a`만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4, d-5
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

반드시 지킬 것:
- 재판관 대상 문장은 모두 합니다체
- 재판관에게 배우자를 언급할 때는 `제 아내`
- S0-S1에는 구체 금액, 실명, 기관 정식명칭 금지
- S5 금전 사건은 숫자 1개 이상 포함
- 같은 key의 5 variants는 사실 관계를 유지하고, 표현/길이/감정 강도만 바꿔라
- 5 variants는 단순 동의어 치환 금지
- 이미 알려진 문제인 100% 중복 variant를 만들지 마라

출력 형식:
{
  "channel": "interrogation",
  "party": "a",
  "entries": [ ... party a entries only ... ]
}

JSON 바깥 텍스트 없이 반환하라.
```

## 세션 2: interrogation-b

### 첨부
- 공통 첨부 파일 5개

### 프롬프트
```text
너는 `spouse-01-gpt-pro-prompt.md`를 절대 규칙으로 따르는 scripted text 생성기다.

이번 세션 범위는 `interrogation` 채널 중 party `b`만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4, d-5
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

반드시 지킬 것:
- 재판관 대상 문장은 모두 합니다체
- 재판관에게 배우자를 언급할 때는 `제 남편`
- S0-S1에는 구체 금액, 실명, 기관 정식명칭 금지
- S5 금전 사건은 숫자 1개 이상 포함
- 같은 key의 5 variants는 사실 관계를 유지하고, 표현/길이/감정 강도만 바꿔라
- 5 variants는 단순 동의어 치환 금지
- evidence_waving, motive_jump, selective_quote tell은 자연스럽게만 반영하고 과잉 반복하지 마라

출력 형식:
{
  "channel": "interrogation",
  "party": "b",
  "entries": [ ... party b entries only ... ]
}

JSON 바깥 텍스트 없이 반환하라.
```

## 세션 3: evidence+dossier

### 첨부
- 공통 첨부 파일 5개

### 프롬프트
```text
너는 `spouse-01-gpt-pro-prompt.md`를 절대 규칙으로 따르는 scripted text 생성기다.

이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: e-1, e-2, e-3, e-4, e-5, e-6
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - parties: a, b
  - dossier 질문은 첨부된 dossier 구조 파일 기준
  - lieBands: early, mid, late
  - key당 variants 3개

반드시 지킬 것:
- 재판관 대상 문장은 모두 합니다체
- evidence_present는 증거 이름이나 핵심 요소에 직접 반응해야 한다
- 증거를 보고 반응해야지, 증거가 말하지 않은 사실을 먼저 길게 풀지 마라
- evidence_present에서 `...거래내역이다`, `...예약서다`, `...기록이다` 같은 종결 금지
- dossier는 플레이어보다 먼저 정답을 전부 말하지 마라
- same key variants는 사실 관계 동일, 표현만 다르게

출력 형식:
{
  "evidence_present": { "entries": [ ... ] },
  "dossier": { "entries": [ ... ] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 세션 4: witness+aftermath+system

### 첨부
- 공통 첨부 파일 5개

### 프롬프트
```text
너는 `spouse-01-gpt-pro-prompt.md`를 절대 규칙으로 따르는 scripted text 생성기다.

이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - witnessIds: tp-1, tp-2, tp-3, tp-4
  - depths: vague, partial, full
  - key당 variants 3개
- aftermath
  - resultClasses: a_primary_fault, b_primary_fault, shared_fault, trust_rebuild, procedural_caution
  - key당 variants 2개
- system_message
  - keys:
    - interrogation|repeat_warning
    - evidence|new_unlock
    - evidence|trap_notice
    - dossier|challenge_cleared
    - witness|credibility_shift
    - verdict|profile_update
  - key당 variants 2개

반드시 지킬 것:
- witness는 재판관 대상 문장을 모두 합니다체로 쓴다
- `vague`, `partial`, `full`의 구체성 차이를 분명히 둔다
- 기관 증인은 partial부터 업무상 사실을 조금 더 구체적으로 말해도 된다
- aftermath는 보고서 말투 금지, 관계 변화가 보이는 서사 문장
- system_message는 중립적이어야 하며 정답을 직접 알려주지 마라

출력 형식:
{
  "witness": { "entries": [ ... ] },
  "aftermath": { "entries": [ ... ] },
  "system_message": { "entries": [ ... ] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 결과 수령 형식
세션별 결과를 아래처럼 보관하면 된다.

- `session-1-interrogation-a.json`
- `session-2-interrogation-b.json`
- `session-3-evidence-dossier.json`
- `session-4-witness-aftermath-system.json`

## 로컬 반입 순서
1. 4세션 결과를 모두 받는다
2. 아래 명령으로 부분 결과를 병합한다
   - `node scripts/merge-scripted-text-gptpro.cjs --case spouse-01 --input-dir "<세션 결과 폴더>"`
3. `node tests/validate-scripted-text.cjs --case spouse-01` 실행
4. `FAIL 0` 확인
5. `D2 WARN` 감소 여부 확인
6. 필요 시 GPT Pro 재시도 또는 로컬 수동 교정

## 현재 기준선
현재 로컬 기준 spouse-01은 새 validator에서 아래 상태다.

- `FAIL 59`
- `WARN 185`

즉, 이번 GPT Pro 재생성의 1차 목표는 `FAIL 0`, 2차 목표는 `D2 WARN` 대폭 감소다.
