# Thread W Phase 1/2 GPT Pro Template

## 목적
- Phase 1(초기 진술)과 Phase 2(반박 진술)를 **신규 사건 전용**으로 생성할 때 쓰는 표준 템플릿이다.
- 목표는 두 가지다.
  - `anchorTruth`를 숨긴 채 표면 갈등과 감정 전선을 선명하게 세운다
  - 자동 재생 스크립트로 읽었을 때 Phase 1보다 Phase 2가 분명히 더 날카롭게 느껴지게 만든다

## 전제
- 기존 사건 Phase 1/2 대사는 참고하지 않는다.
- Phase 1/2는 ScriptedText와 별도 작업이다.
- Story Gate를 통과한 현재 케이스 자료만 사용한다.
- 권장 workflow는 **2-pass**다.
  - Pass 1: Phase 1 생성
  - Pass 2: Phase 1 결과를 첨부해 Phase 2 생성

## 필수 입력 파일

### Phase 1
- `src/data/cases/generated/{{caseId}}.json`
- Story Gate authoring package 또는 동급 요약
- 현재 케이스 쟁점 / 증거 / witness 구조 요약

### Phase 2
- Phase 1 입력 파일 전체
- 방금 생성한 `src/data/dialogues/phase1/{{caseId}}.json`

## 출력 파일
- `src/data/dialogues/phase1/{{caseId}}.json`
- `src/data/dialogues/phase2/{{caseId}}.json`

## 절대 규칙
- Phase 1/2에서 `anchorTruth`의 핵심 결론을 먼저 까면 실패다.
- 정확한 금액, 정확한 날짜, 기관 정식명칭, 숨겨진 제3자 실명, 조작/공모/외도/위조 같은 결론 단어를 먼저 열지 마라.
- 재판관 대상 문장은 합니다체다.
- 상대에게 직접 말할 때만 `callTerms.toPartner` 또는 `callTerms.angry`를 쓴다.
- 한 문장에 재판관 호소와 상대 직접 공격을 섞지 마라.
- system 문장은 중립적이어야 하며, 다음 단계 판단 포인트만 열어야 한다.

## Phase 차이

### Phase 1
- 표면 갈등 소개
- 각자 자기 프레임 선점
- 감정 수위는 아직 억제
- 플레이어가 "누가 더 숨기고 있지?"를 느끼게 해야 한다

### Phase 2
- Phase 1에서 나온 주장에 정면 반박
- 감정 수위 상승
- 하지만 여전히 정답 직노출 금지
- 플레이어가 "이제 심문에서 뚫어야 한다"를 느끼게 해야 한다

## 권장 길이
- Phase 1: `18~22 dialogues`
- Phase 2: `18~22 dialogues`

## 권장 배치

### Phase 1
- `system` 오프닝 1개
- `a` 재판관 대상 초기 진술 3~4개
- `b` 재판관 대상 초기 진술 3~4개
- `a ↔ b` 직접 충돌 6~8개
- `a`, `b` 재판관 대상 정리 4~6개
- `system` 마감 1개

### Phase 2
- `system` 오프닝 1개
- `a`, `b`가 Phase 1의 상대 주장에 직접 반박 8~10개
- 감정 상승 구간 4~6개
- 재판관 대상 판단 포인트 제시 4~6개
- `system` 심문 단계 연결 1개

## 출력 스키마

```json
{
  "caseId": "case-{{caseId}}",
  "dialogues": [
    {
      "speaker": "system",
      "text": "중립 오프닝",
      "relatedDisputes": [],
      "behaviorHint": null
    },
    {
      "speaker": "a",
      "text": "대사",
      "relatedDisputes": ["d-1", "d-2"],
      "behaviorHint": "짧은 감정/행동 힌트"
    }
  ]
}
```

## speaker 규칙
- `system`
- `a`
- `b`

## 공통 프롬프트 본문

```text
너는 솔로몬 법정 게임의 Phase 1/2 스크립트 작성 모델이다.
출력은 반드시 JSON만 반환한다.
현재 Story Gate를 통과한 신규 사건만 다룬다.
기존 사건 대사나 다른 케이스 샘플을 참고하거나 모사하지 마라.

사건:
- caseId: {{caseId}}
- 제목: {{title}}
- category: {{category}}
- summary: {{summary}}
- headlineHook: {{headlineHook}}
- emotionalBait: {{emotionalBait}}
- anchorTruth: {{anchorTruth}}
- resolutionDilemma: {{resolutionDilemma}}

화자:
- party A: {{partyA.name}} / archetype={{partyA.archetype}} / speechStyle={{partyA.speechStyle}}
- party B: {{partyB.name}} / archetype={{partyB.archetype}} / speechStyle={{partyB.speechStyle}}
- party A callTerms: toPartner={{partyA.callTerms.toPartner}}, toJudge={{partyA.callTerms.toJudge}}, angry={{partyA.callTerms.angry}}
- party B callTerms: toPartner={{partyB.callTerms.toPartner}}, toJudge={{partyB.callTerms.toJudge}}, angry={{partyB.callTerms.angry}}

공통 규칙:
1. 정답을 먼저 말하지 마라.
2. Phase 1은 표면 갈등, Phase 2는 반박 강화다.
3. 재판관 대상 문장은 합니다체다.
4. 상대에게 직접 말할 때만 toPartner / angry call을 쓴다.
5. system 문장은 중립적이어야 하며 스포일러를 주지 마라.
6. behaviorHint는 장면 연출 힌트이지 메타 설명이 아니다.
7. 대사는 자동 재생 기준으로 짧고 또렷해야 한다.

금지:
- anchorTruth 핵심 문장 직노출
- 정확한 금액/실명/정확한 날짜/기관 정식명칭 직노출
- "증인은 ...", "해당 쟁점 ...", "지금 질문하신 ..." 같은 메타 문장
- 번역체 9패턴
- JSON 바깥 텍스트
```

## Phase 1 전용 프롬프트

```text
위 공통 규칙을 따른다.

이번 작업은 Phase 1(초기 진술)만 생성한다.

목표:
- 양측이 자기 프레임을 먼저 선점하게 한다
- 표면 갈등은 선명하지만 정답은 여전히 안 보이게 한다
- 플레이어가 Phase 2와 심문을 기대하게 만든다

반드시 지킬 것:
- Phase 1은 숨긴 핵심보다 표면적 상처와 불신을 먼저 보여 준다
- A와 B 모두 자기 정당화가 있어야 한다
- 한쪽만 완전 악당처럼 보이면 실패다
- system 문장은 "무엇을 단정하지 않았는지"가 중요하다
- 총 길이는 18~22 dialogues
- speaker는 system, a, b만 사용한다
- relatedDisputes는 비어 있지 않은 경우 실제 관련 쟁점만 넣는다

출력 형식:
{
  "caseId": "case-{{caseId}}",
  "dialogues": []
}
```

## Phase 2 전용 프롬프트

```text
위 공통 규칙을 따른다.

이번 작업은 Phase 2(반박 진술)만 생성한다.
첨부된 현재 케이스 Phase 1 결과를 읽고, 그 주장에 대한 직접 반박을 구성하라.

목표:
- Phase 1보다 감정 수위와 공격성이 분명히 올라가야 한다
- 그러나 여전히 anchorTruth의 정답을 직접 노출하면 안 된다
- 심문 단계에서 뚫어야 할 포인트가 선명해져야 한다

반드시 지킬 것:
- Phase 2는 Phase 1의 상대 주장에 대한 반박이어야 한다
- Phase 1에서 없던 숨겨진 정답 정보를 갑자기 새로 까지 마라
- A와 B 모두 상대의 허점을 찌르되, 자기 숨김도 남겨 둬야 한다
- system 문장은 심문 포인트만 열고 정답을 주지 마라
- 총 길이는 18~22 dialogues
- speaker는 system, a, b만 사용한다
- direct clash 구간에서는 관계에 맞는 호칭과 어체를 유지한다

출력 형식:
{
  "caseId": "case-{{caseId}}",
  "dialogues": []
}
```

## Phase 1 자가 검수
- [ ] 표면 갈등만 보이고 정답은 숨겨져 있는가
- [ ] A와 B 모두 자기 프레임이 분명한가
- [ ] 재판관 대상 문장은 모두 합니다체인가
- [ ] 당사자 직접 충돌 문장에서 callTerms가 맞는가
- [ ] exact 금액, exact 날짜, 기관 정식명칭, 숨겨진 제3자 실명이 먼저 나오지 않는가
- [ ] 총 길이가 18~22 dialogues인가

## Phase 2 자가 검수
- [ ] Phase 1보다 더 직접적이고 날카로운가
- [ ] 그래도 정답 직노출은 없는가
- [ ] Phase 1의 실제 주장에 대한 반박으로 읽히는가
- [ ] 감정 수위가 상승하지만 관계와 호칭은 무너지지 않는가
- [ ] system 문장이 심문 연결 역할만 하는가
- [ ] 총 길이가 18~22 dialogues인가

## 로컬 확인
1. Phase 1 JSON 저장
2. Phase 2 생성 시 Phase 1 JSON 첨부
3. 로더 스키마 확인
   - `caseId`
   - `dialogues`
   - `speaker`
   - `text`
   - `relatedDisputes`
   - `behaviorHint`
4. 실제 자동 재생처럼 소리 내어 읽기

## 함께 사용할 문서
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
