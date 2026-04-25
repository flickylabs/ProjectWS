# QW V6 R61: Phase E R61 — interjectionV2 호칭 분기 (파일 부재 확인)

## 원래 계획
> R61: 끼어들기 대사의 호칭 분기

## 확인
- `src/engine/interjectionV2.ts` **파일 존재하지 않음**
- `llm-quality-tuning-guide.md` (2026-04-04 작성)에는 언급되나 **이후 제거됨**
- `src/hooks/useActionDispatch.ts:135`: "V2 끼어들기 opportunity/모달/resolveInterjectionV2 경로는 제거됨 — 끼어들기는 gameEventTriggerEngine의 V3 경로(PCDiscoveryOverlay interjection 분기)로 일원화"

## 현행 끼어들기 처리
- ScriptedText `interjection` 채널 (3사건 각 8 entries)
- gameEventTriggerEngine V3 getInterjectionEvent 경유
- 정적 스캔 (R6/R11): party 필드와 key 접두 전수 일치, 텍스트 clean

## 라운드 판정: **R61 완료 — interjectionV2 제거됨, 현 경로 clean**
