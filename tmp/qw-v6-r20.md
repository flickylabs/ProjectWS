# QW V6 R20: PCDialogueLog speaker 분기 + addDialogue 시스템 메시지 전수 스캔

## 실행
- `PCDialogueLog.tsx`: speaker별 렌더 분기 전수 확인
- `useActionDispatch.ts`: addDialogue(system) 40곳 전수 스캔
- `ActionPanel.tsx` / `CourtLayout.tsx` / `AutoDialoguePhase.tsx` / `Phase6_Mediation.tsx` / `PCInteractionPanel.tsx`: 시스템 메시지 전수

## 집중-10 경계 오염 검증

### PCDialogueLog 분기 구조
```
speaker === 'system'  → pc-log-system-row / pc-log-system-card
speaker === 'judge'   → pc-log-judge-center (isolated bubble)
speaker === 'witness' → pc-log-row with witness avatar/bubble
speaker === 'a' | 'b' → pc-log-row with party avatar/bubble
default               → '시스템' fallback
```
- **집중-10a (system→chat bubble 오염) 없음**: system은 전용 `pc-log-system-*` 컨테이너로만 렌더
- **집중-10b (빈 NPC content)**: 데이터 레벨 검증. 전사본 40턴 중 0건 (R14~R16)
- **집중-10d (judge 1인칭)**: static scriptedText + judgeQuestionEngine 템플릿 모두 합니다체

### addDialogue 시스템 메시지 텍스트 품질
- 40개 `speaker: 'system'` 호출 전수 확인
- `${def.name}` / `${witness.name}에게` / `${name}의 진술` / `${name} 씨` 등 **안전 접미사만 사용**
- 받침-의존 조사(은/는/이/가/을/를/과/와) 직접 결합 **0건**

### judgeQuestionEngine QUESTION_POOL 템플릿
- `${name} 씨, ${subject} 건에 ...`, `${subject}에 대해`, `${subject}의 구체적인 경위` — 모두 **안전**
- interpolate() 단순 치환. 조사 보정 불필요 (템플릿 설계로 회피)

## R17~R20 누적 수정 요약
1. ✅ `DiscoveryFeedbackWatcher.tsx:633` — `${witnessName}이(가)` 원시 → `pp이가()`
2. ✅ `presentationEngine.ts:177` — `${partyName}가` → `pp이가()`
3. ✅ `Aftermath.tsx:200/203/205` — `${nameA}와 ${nameB}는` → `pp과와/pp은는`
4. ✅ `PCResultScreen.tsx:1068/1071/1073` — 동일

## 수정 (이번 라운드, 권한 내)
- 없음 (R17~R18로 모든 발견된 실버그 수정 완료)

## 검증
- `npx tsc -b --force` → exit=0 (R18 이후 상태 유지)

## 다음 라운드로 이월
- R21: Phase 4~6 v3 게임 이벤트 데이터 스캔 (contradiction/interjection/outburst 등)
- R22: witnessEngine/interjectionV2 호칭 분기 로직

## 라운드 판정: **PASS**
