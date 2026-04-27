# phase2-discovery-e4-cascade

caseId: spouse-01
description: Spike route for scripted evidence discovery cascade into e-4 and immediate presentation.

## 1. discovery_event

action: `{"type":"discovery_event","target":"b","evidenceId":"e-4"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
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
    }
  ],
  "disputes": []
}
```

- judge [evidence_discovery/runtime_discovery_fallback] src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getDiscoveryLines:e-4:probe
  이준호 씨, 당시 상대방과 연락을 주고받은 적이 있습니까.
- b [evidence_discovery/runtime_discovery_fallback] src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getDiscoveryLines:e-4:slip
  그건… 사실 그때… 그때 주고받은 메시지가 있긴 한데…
- system [evidence_discovery/runtime_discovery_fallback] src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getDiscoveryLines:e-4:capture
  이준호의 말에서 새로운 증거를 확보했다
- judge [evidence_discovery/runtime_discovery_fallback] src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getDiscoveryLines:e-4:confirm
  메시지 기록이 있다고 하셨습니다. 해당 대화 내용을 확보하겠습니다.
- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:actuallyDiscoverEvidence:getEvidenceDisplayName:e-4
  새 증거: 발신자 미상 문자

## 2. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-4"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-4",
      "before": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": true,
        "stage": 0,
        "deepInvestigated": false
      }
    }
  ],
  "disputes": []
}
```

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-4
  증거 제시: 발신자 미상 문자
- b [evidence_present/scripted] src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-4|early|self].variants[id=b-e-4-early-self-v1]
  형한테 온 문자 맞습니다.
findings: QARG-0002
