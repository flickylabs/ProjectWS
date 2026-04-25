# QW V6 R34: aftermathLLMGenerator 프롬프트 조사 보정

## 🎯 발견 + 수정

`src/engine/aftermathLLMGenerator.ts:109/112`

```diff
- ${partyA.name}과 ${partyB.name}이 판결 내용을 듣는 순간
+ ${partyA.name}${pp과와(partyA.name)} ${partyB.name}${pp이가(partyB.name)} 판결 내용을...

- "${partyA.name}은 그 사실을 알았을 때", "${partyB.name}은 비밀이..."
+ "${partyA.name}${pp은는(partyA.name)} 그 사실을...", "${partyB.name}${pp은는(partyB.name)} 비밀이..."
```

- 영향: 후일담 LLM 프롬프트 instruction. LLM이 이 instruction을 참조해 정확한 조사로 후일담 생성
- 3사건 적용 (기존 → 수정):
  - spouse: "박지연과 이준호이" → **박지연과 이준호가**, "박지연은 ~ 이준호은" → **박지연은 ~ 이준호는**
  - friend: "송다은과 최수민이" → **송다은과 최수민이** (이미 맞음), "송다은은 ~ 최수민은" (그대로 맞음)
  - family: "윤태성과 윤정후이" → **윤태성과 윤정후가**, "윤태성은 ~ 윤정후은" → **윤태성은 ~ 윤정후는**

## 검증
- `npx tsc -b --force` → exit=0

## 누적 수정 (R17~R34)
- 시스템 메시지 + 프롬프트 조사 보정: **8건** (placeholder 1 + 조사 7)
- 후처리 rule 확장: 26 rule (R22/R27)
- 프롬프트 few-shot 강화: 1곳 (R31)

## 다음 라운드로 이월
- R35: llmDialogueResolver 프롬프트 내 `이고`/`이다` 등 copula 유지 (대부분 안전)

## 라운드 판정: **FAIL → FIXED** (누적 8건)
