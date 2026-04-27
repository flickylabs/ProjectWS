# phase2-investigate-gap-and-emergence-hook

caseId: spouse-01
description: Spike route for evidence_investigate response coverage and authored emergence hook path.

## 1. evidence_investigate

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-1","subAction":"request_original"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-1",
      "before": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 1,
        "deepInvestigated": true
      }
    },
    {
      "evidenceId": "e-4",
      "before": {
        "unlocked": false,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      }
    },
    {
      "evidenceId": "e-5",
      "before": {
        "unlocked": false,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      }
    }
  ],
  "disputes": []
}
```

- system [evidence_discovery/runtime_system] src/data/cases/generated/spouse-01.json:evidence.e-1.investigationResults.request_original
  틴트, 헤어롤 등 여성용 물건들이 눈에 띈다.
findings: QARG-0003

## 2. emergence_event

action: `{"type":"emergence_event","disputeId":"d-2","via":"runtime_spike"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [
    {
      "disputeId": "d-2",
      "from": "hidden",
      "to": "emerged",
      "via": "runtime_spike"
    }
  ]
}
```

- b [emergence_event/event_hook] src/data/emergenceHooks.ts:spouse-01.d-2.attack
  제 아내가 저를 딴 살림처럼 몰아갔지만, 그 돈 문제도 한쪽 말만으로 보면 안 됩니다. 제가 바로 설명하기 어려운 가족 일이 있었고, 지금은 사용처를 단정하지 말아주셨으면 합니다.

## 3. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-1"}`

- judge [judge_contradiction/scripted] src/data/scriptedText/spouse-01.json:channels.judge_contradiction.entries[key=d-1|soft].variants[id=judgec-d-1-soft-v1]
  이준호 씨, 처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 다른 사정이었다고 말씀이 달라졌습니다. 그 사이를 차분히 정리해 주십시오.
- b [contradiction_pursuit/scripted] src/data/scriptedText/spouse-01.json:channels.contradiction_pursuit.entries[key=b|d-1|S2].variants[id=contra-b-d-1-S2-v1]
  네, 처음보다 다르게 들릴 수 있습니다. 오피스텔에 간 건 맞습니다. 다만 이유는 그쪽에서 짐작한 것과 다릅니다.

## 4. free_interrogation

action: `{"type":"free_interrogation","target":"b","disputeId":"d-1","rawText":"오늘 점심은 무엇을 먹었습니까?","intent":"unmapped","surfaceDelta":{"observation":0,"notebook":0,"statementNote":0,"vfx":0}}`

- b [interrogation/fallback] src/engine/freeInterrogation/fallback.ts:SAFE_CONTEXT_FALLBACKS
  재판관님, 그 질문은 제가 확인해서 답할 수 있는 범위를 벗어납니다. 사건에 관한 부분만 말씀드리겠습니다.
