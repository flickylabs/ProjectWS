# Solomon Court 재판관 메시지 v3 — 작업 개요

## 작업 목표
3 활성 사건(spouse-01 / family-01 / friend-01)의 **재판관 발화 + NPC 응답**을 scene 기반 시퀀스 데이터로 100% 커버.
LLM/atom 폴백 없이 ScriptedText 단독 작동 가능하게 함.

## 세션 분할
사건당 3 세션 (총 9 세션 병렬). 본 세션은 한 사건의 한 그룹 담당:

| 그룹 | 채널 범위 | 분량 |
|---|---|---|
| **A — 기본 진술/심문** | judge_question 9 sub × tone + npc base/cornered/silenced/deflecting/justification_long | ~110 scene / 3,300 entries |
| **B — 특수 + 증거/증인** | contradiction/evidence×stage/witness/dossier/interjection/credibility 등 28종 + npc 5종 | ~120 scene / 1,100 entries |
| **C — Phase + 감정 + system** | Phase 0/3a/6/7 + mediation/verdict + system 메시지 10종 + npc 7종 | ~120 scene / 350 entries |

본 세션 정확한 범위는 같은 폴더의 `MESSAGE.md` 참조.

## 작업 절차
1. 본 폴더의 모든 파일 read (가이드 8 + assets 5 + synopsis + MESSAGE)
2. synopsis-{caseId}-{X}.yaml의 scene 골격 채움 (variants 풀)
3. R1~R10 self-check (07-lint-rules.md)
4. 산출물 형식: `scene-output-{caseId}-{X}.yaml` (모든 scene 변형 풀 포함)

## 산출물 적용 (참고)
ClaudeCode가 lint + 한국어 보정 + scene flow 검수 → src/data/scriptedText/{caseId}.json 통합 적용.

## 핵심 원칙 (위반 시 폐기)
- 보정 톤 8원칙 (02-tone-guide.md)
- 25 메커니즘 정합 (03-game-state-system.md — **위반 시 게임 동작 깨짐**)
- 기존 자산은 보정+발전+빈틈 채우기 (그대로 복사 X)
- R1~R10 lint 통과 (07-lint-rules.md)
- 한 entry라도 위반 시 폴백 필요 → ScriptedText 단독 작동 실패
