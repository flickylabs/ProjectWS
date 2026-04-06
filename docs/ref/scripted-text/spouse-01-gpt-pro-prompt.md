# spouse-01 Scripted Text Prompt

아래 입력만 사용해서 `spouse-01`의 사전 작성 스크립트 번들을 생성하라.

## 목표
- 게임 실행 중 LLM 호출 0건을 목표로 하는 `spouse-01` 파일럿 번들 생성
- 출력 파일은 `src/data/scriptedText/spouse-01.json`
- 출력은 JSON 객체 하나만 허용한다

## 입력 파일
- 사건 데이터: `src/data/cases/generated/spouse-01.json`
- 참고 transcript 선별본: `docs/ref/scripted-text/spouse-01-reference.json`
- 기존 v3 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/spouse-01-v3-pilot.json`
- party A d3-d5 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json`
- party B d3-d5 씨앗: `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json`
- dossier 구조: `docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.json`

## 출력 스키마
```json
{
  "schemaVersion": 1,
  "caseId": "spouse-01",
  "generatedAt": "ISO-8601",
  "notes": ["..."],
  "coverage": {
    "interrogation": {
      "parties": ["a", "b"],
      "disputes": ["d-1", "d-2", "d-3", "d-4", "d-5"],
      "lieStates": ["S0", "S1", "S2", "S3", "S4", "S5"],
      "questionTypes": ["fact_pursuit", "motive_search", "empathy_approach"],
      "variantsPerKey": 5
    },
    "evidence_present": {
      "parties": ["a", "b"],
      "evidenceIds": ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6"],
      "lieBands": ["early", "mid", "late"],
      "variantsPerKey": 5
    },
    "dossier": {
      "parties": ["a", "b"],
      "questionIds": ["dossier-1.a.q1"],
      "lieBands": ["early", "mid", "late"],
      "variantsPerKey": 3
    },
    "witness": {
      "witnessIds": ["tp-1", "tp-2", "tp-3", "tp-4"],
      "depths": ["vague", "partial", "full"],
      "variantsPerKey": 3
    },
    "aftermath": {
      "resultClasses": [
        "high_repair",
        "mixed_repair",
        "mutual_fault_stalemate",
        "trust_breakdown",
        "ambiguous_hold"
      ],
      "variantsPerKey": 2
    },
    "system_message": {
      "keys": [
        { "context": "scripted_text", "eventType": "bundle_loaded" }
      ],
      "variantsPerKey": 2
    }
  },
  "channels": {
    "interrogation": { "entries": [] },
    "evidence_present": { "entries": [] },
    "dossier": { "entries": [] },
    "witness": { "entries": [] },
    "aftermath": { "entries": [] },
    "system_message": { "entries": [] }
  }
}
```

## 채널별 키
- `interrogation`: `party|disputeId|lieState|questionType`
- `evidence_present`: `party|evidenceId|lieBand|subjectRole`
- `dossier`: `party|dossierQuestionId|lieBand`
- `witness`: `witnessId|depth`
- `aftermath`: `resultClass`
- `system_message`: `context|eventType`

## 필수 규칙
- `interrogation`은 전 키 조합을 모두 채운다
- `interrogation`과 `evidence_present`는 key당 5 variants를 만든다
- `dossier`와 `witness`는 key당 3 variants를 만든다
- 각 variant는 `{ "id": "...", "text": "...", "behaviorHint": "..." }` 형식이다
- entry마다 `stanceHint`와 `truthLevel`을 넣는다
- 출력은 자연스러운 한국어만 사용한다
- `S0-S1 interrogation`에서는 구체 금액, 제3자 실명, 메타 발화를 노출하지 마라
- `evidence_present`는 반드시 증거 이름이나 증거 핵심 요소에 직접 반응하라
- `S5` 금전 사건 interrogation은 구체 금액과 3문장 구조를 포함하라
- `해요체`, 번역체, 공문체, 클리셰를 피하라
- 재판관 앞에서 배우자 실명 대신:
  - A가 B를 언급할 때: `제 아내`
  - B가 A를 언급할 때: `제 남편`

## 스타일 규칙
- 초기 상태는 짧고 방어적이어야 한다
- 중간 상태는 일부 인정, 일부 전가, 감정 흔들림이 보여야 한다
- 후기 상태는 맥락, 감정, 자기합리화, 인정이 자연스럽게 늘어나야 한다
- 변형 5종은 어휘, 문장 시작, 감정 강도, 방어 논리의 각도가 분명히 달라야 한다
- 같은 key 안에서 trigram 유사도가 높지 않게 하라

## 생성 절차
1. transcript 선별본의 PASS/WARN 응답을 key별 참고 예시로 분류한다
2. thread-C 씨앗을 disputes별 tone seed로 사용한다
3. 부족한 key는 사건 truthDescription, evidence, dossier question 문맥을 바탕으로 새로 생성한다
4. 최종 출력은 JSON 하나만 반환한다

## 금지
- 코드블록 금지
- 설명문 금지
- JSON 바깥 텍스트 금지
