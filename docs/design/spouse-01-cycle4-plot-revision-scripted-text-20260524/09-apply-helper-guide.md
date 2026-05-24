# 09. GPT 시안 적용 helper script 사용 가이드

본 문서는 CT 세션에서 사전 준비한 helper script `scripts/apply-hd4-scripted-text.cjs` 사용법입니다.

GPT가 batch별 JSON 시안을 작성해 보내면 Claude(또는 사용자)가 이 script로 spouse-01.json에 자동 적용 + 검증합니다.

---

## helper script 동작 흐름

1. **GPT 시안 input** (JSON 파일) — text + behaviorHint 만 채움. tags는 없음.
2. **template 찾기** — 같은 channel + 같은 party + 같은 lieState + 같은 questionType 의 **h-d3 entry**를 template으로 사용.
3. **tags 영역 복사** — h-d3 template의 tags를 그대로 복사 + `h-d3` → `h-d4`로 token 교체.
4. **신규 entry 등록** — spouse-01.json의 해당 channel.entries 끝에 추가.
5. **dedupe** — 이미 같은 key가 있으면 skip.

---

## 사용법

### Step 1 — GPT batch 시안을 JSON 파일로 저장

GPT가 작성한 batch별 JSON 출력 (08-gpt-prompt.md 형식)을 `tmp/gpt-hd4-batch-N.json` 같이 저장.

예: `tmp/gpt-hd4-batch-1-interrogation.json`

```json
{
  "batch": 1,
  "channel": "interrogation",
  "entries": [
    {
      "key": "b|h-d4|S0|fact_pursuit",
      "party": "b",
      "disputeId": "h-d4",
      "lieState": "S0",
      "questionType": "fact_pursuit",
      "stanceHint": "deny",
      "truthLevel": "none",
      "variants": [
        {
          "id": "b-h-d4-S0-fact-pursuit-v1",
          "text": "비자금이라 부르긴 좀 그렇고, 그냥 따로 모아 둔 돈입니다.",
          "behaviorHint": "한 박자 늦게 답한다."
        }
      ]
    }
  ]
}
```

### Step 2 — dry-run으로 결과 미리 보기

```bash
node scripts/apply-hd4-scripted-text.cjs --input tmp/gpt-hd4-batch-1-interrogation.json --dry-run
```

출력:
- ✓ added: keys (몇 개 등록될지)
- ↺ skip (already exists): 중복 keys
- ✗ failed: template 못 찾은 영역

### Step 3 — --write로 실제 적용

```bash
node scripts/apply-hd4-scripted-text.cjs --input tmp/gpt-hd4-batch-1-interrogation.json --write
```

`src/data/scriptedText/spouse-01.json`이 업데이트됨.

### Step 4 — 검증

```bash
npx tsc --noEmit
npm run -s qa:fast
node scripts/detect-truth-leak.cjs --strict
```

모두 PASS면 commit.

---

## tags 영역 자동 복사 메커니즘

h-d3 entry tags 예시 (`a|h-d3|S2|fact_pursuit`):

```json
[
  "channel:interrogation",
  "speaker:a",
  "speakerRole:party",
  "listener:judge",
  "listenerRole:judge",
  "address:toJudge",
  "scope:judge_only",
  "revealScope:judge_only",
  "register:formal",
  "honorific:formal",
  "audience:single",
  "tense:present",
  "relationship:spouse",
  "judgeAddress:재판관님",
  "judgeAddressState:defined",
  "callTerm:제_남편",
  "callTermState:defined",
  "counterpartyRef:제_남편",
  "counterpartyRefState:defined",
  "mentionTarget:dispute",
  "questionType:fact_pursuit",
  "stance:partial",
  ...
]
```

helper script는 위 tags를 그대로 복사 + `h-d3` → `h-d4`로 token 교체. 즉 channel/speaker/listener/scope/register/honorific/callTerm 등 모든 영역이 h-d3와 정확히 같은 형식으로 등록.

**예외 — q3 등 일부 영역의 tag 미세 조정 필요 시**: 직접 spouse-01.json 편집 (helper script는 일반적 영역만 처리).

---

## 영역별 적용 권장 순서 (의뢰서 batch 순서와 동일)

| batch | channel | 시안 doc 위치 | 적용 명령 |
|---|---|---|---|
| 1 | interrogation | tmp/gpt-hd4-batch-1.json | `node scripts/apply-hd4-scripted-text.cjs --input tmp/gpt-hd4-batch-1.json --write` |
| 2 | dossier | tmp/gpt-hd4-batch-2.json | 동일 |
| 3 | evidence_present | tmp/gpt-hd4-batch-3.json | 동일 |
| 4 | judge_question | tmp/gpt-hd4-batch-4.json | 동일 |
| 5 | contradiction_pursuit | tmp/gpt-hd4-batch-5.json | 동일 |
| 6 | judge_evidence_combo | tmp/gpt-hd4-batch-6.json | 동일 |
| 7 | mediation | tmp/gpt-hd4-batch-7.json | 동일 |
| 8 | aftermath | tmp/gpt-hd4-batch-8.json | 동일 |

각 batch 적용 후 검증 → commit 권장 (batch별 commit으로 회귀 영역 식별 쉬움).

---

## stale entry 정리 영역 (Cycle 4 CT 세션 사전 처리)

본 helper script가 동작하기 위해, CT 세션에서 **옛 h-d4 stale entry 236건 (4언어 × 59)을 사전 제거**했습니다 (commit 별도).

- KO/EN/JA/ZH-CN spouse-01.{,en,ja,zh-CN}.json 모두 정리
- 채널: interrogation 36 / judge_question 12 / judge_contradiction 3 / contradiction_pursuit 8 = 합계 59건 × 4언어

옛 h-d4는 2026-05-22 Cycle 2 진입 시점에 폐기되었으나 ScriptedText의 dead entry가 정리되지 않은 채 남아 있던 영역. 신규 h-d4 (Cycle 4 plot revision)와 같은 key를 사용하므로 사전 제거가 필요했습니다.

---

## helper script 제한 영역

- **dossier 채널의 일부 entry** (예: `dc-8.b.q1|early/mid/late`)는 h-d3가 아니라 dc-7 또는 dc-3 등 다른 dossier card의 패턴 사용. helper script는 fallback으로 가능한 한 가까운 매치 사용. dossier entry 작성 시 직접 검토 권장.
- **evidence_present 채널**도 e-8/e-9는 신규 evidence. e-7 또는 e-5의 evidence_present entry 패턴 참조.
- **mediation / aftermath** 채널은 h-d3에 0~8 entry. 영역에 따라 다른 dispute의 entry를 fallback.

이런 영역은 helper script가 fallback으로 작동하므로 결과를 직접 spot check 권장.
