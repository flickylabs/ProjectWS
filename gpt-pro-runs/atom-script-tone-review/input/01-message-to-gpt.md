# GPT Pro 의뢰 — ScriptedText 발화 톤 적합성 검토 (활성 3사건)

## 프로젝트
**솔로몬 법정 (Solomon Court)** — AI 둘의 싸움을 인간 지혜로 재판하는 리플레이형 추리 게임. 활성 사건 3건(spouse-01·family-01·friend-01)의 ScriptedText 4,109건이 캐릭터 입장과 stage 맥락에 맞는지 전수 검토 의뢰.

## 핵심 문제

LLM 또는 사전 작성된 ScriptedText 일부가 **캐릭터의 입장·동기·감정 단계와 어긋나는 발화**를 포함하고 있음. 예시:

- 외도 의심자(원고)가 외도자(피고) 같은 회피 톤으로 말함
- 분노 표출해야 할 단계에서 차분한 분석 톤
- 감정 폭발 직후인데도 격식 격언으로 답함
- 화자의 방어 입장과 발화의 호소 방향이 어긋남
- 시스템 말투 ("~을 수 있겠습니다", "~답니다") 같은 기계어

본 검토의 목표는 **이런 어색한 발화를 식별하고 정정 제안을 제공**하는 것.

## 입력 자료

| 파일 | 내용 |
|---|---|
| `02-task-spec.md` | 검토 기준·출력 형식 상세 명세 |
| `03-character-context.md` | 3사건 캐릭터 입장 / 증거 owner / stage 확장 정보 |
| `source/spouse-01-extracted.json` | spouse-01 ScriptedText 1,245건 (id·text·behaviorHint·tags) |
| `source/family-01-extracted.json` | family-01 ScriptedText 1,441건 |
| `source/friend-01-extracted.json` | friend-01 ScriptedText 1,423건 |

각 source JSON entry 필드:
- `id`: 발화 고유 ID
- `text`: 발화 본문 (검토 대상)
- `behaviorHint`: 행동/감정 지시 (있는 경우)
- `speaker`: a / b / judge
- `channel`: interrogation / evidence_present / dossier / judge_contradiction 등
- `address`: toJudge / toParty
- `stance`: deny / hedge / partial / blame / emotional / confess
- `emotion`: guarded / defensive / shaken / resigned 등
- `reveal`: none / partial / full
- `responseMode`: 응답 모드
- `path`: 발화 호출 경로 (dispute/evidence ID 포함, stage 추적용)

## 작업 분량

ScriptedText 4,109건 전수 검토. 각 사건별로 별도 산출 가능(GPT Pro 컨텍스트 분할 필요 시).

## 산출물

`output/proposals-{caseId}.json` 형태로 사건별 분리. 발화별 ❌/⚠/✅ 판정 + 정정 제안. 자세한 형식은 [02-task-spec.md](02-task-spec.md).

## 핵심 가이드라인

1. **인격 일관성 우선** — 발화는 화자의 동기·감정 단계에 부합해야 함
2. **stage 맥락 인식** — `path`로 추적 가능한 stage 정보를 활용해 적절한 톤 판단
3. **번역체·기계어 제거** — "~을 수 있겠습니다", "~답니다", "혼란과 불안으로 가득 차" 등
4. **재판관 발화 방향 검증** — NPC가 재판관에게 답을 요구하는 형태 금지
5. **호칭 규칙** — `03-character-context.md` 참조

## 출력 채택 흐름

GPT Pro 산출물(`proposals-*.json`) → CT(Claude Code)에서 한국어 보정 → ScriptedText 정정 → dev 검증.

## 컨텍스트 한계 시

전체를 한 번에 처리 불가능하면:
1. 사건 단위 분할 (spouse-01 → family-01 → friend-01)
2. 또는 channel 단위 분할 (interrogation 먼저, 그 다음 evidence_present 등)

각 partial 산출물도 동일 형식으로 제공.
