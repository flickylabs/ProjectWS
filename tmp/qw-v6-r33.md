# QW V6 R33: witnessEngine 프롬프트 와/과 조사 보정

## 🎯 발견 + 수정

`src/engine/witnessEngine.ts:357/358` (이전 357/358)

```diff
- - ${vars.nameA}와의 관계: ${vars.witnessRelationToA}
- - ${vars.nameB}와의 관계: ${vars.witnessRelationToB}
+ - ${vars.nameA}${pp과와(vars.nameA)}의 관계: ${vars.witnessRelationToA}
+ - ${vars.nameB}${pp과와(vars.nameB)}의 관계: ${vars.witnessRelationToB}
```

- 영향: LLM instruction 내 증인 프로필 "{이름}와의 관계" → 받침 대응 "{이름}과의 관계"
- 3사건 적용:
  - spouse: "박지연와의 관계" → **박지연과의 관계** / "이준호와의 관계" (그대로, 이준호 받침X)
  - friend: "송다은와의 관계" → **송다은과** / "최수민와의 관계" → **최수민과**
  - family: "윤태성와의 관계" → **윤태성과** / "윤정후와의 관계" (그대로)
- LLM이 이 instruction을 참조해 증언 생성 시 올바른 조사 학습

## 검증
- `npx tsc -b --force` → exit=0

## 누적 수정 (R17~R33)
- 시스템 메시지 실버그: **5건** (placeholder 1 + 조사 4)
- 후처리 rule 확장: 26 rule 추가 (R22/R27)
- 프롬프트 few-shot 강화: 1곳 (R31)
- 프롬프트 instruction 조사 보정: 1곳 (R33)

## 다음 라운드로 이월
- R34: aftermathLLMGenerator.ts 프롬프트 instruction 조사 보정 검토

## 라운드 판정: **FAIL → FIXED** (누적 수정 7건)
