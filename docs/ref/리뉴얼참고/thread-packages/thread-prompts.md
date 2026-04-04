# 각 스레드 시작 프롬프트

각 Claude Code 스레드에 아래 프롬프트를 그대로 붙여넣으면 됩니다.

---

## 스레드 A 프롬프트

```
너는 "스레드 A — 증거 시스템 데이터 완성" 담당이다.
미션 문서를 먼저 읽어라: docs/ref/리뉴얼참고/thread-packages/thread-A/mission.md

너의 역할:
1. 6건(family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01)의 investigationStages를 작성한다.
2. GPT Pro에 전달할 프롬프트와 파일을 정리해서 나에게 전달하거나, 직접 작성한다.
3. GPT에 보낼 때는 사건별로 폴더를 구성해서 내가 그대로 전달할 수 있게 한다.

작업 순서:
- 먼저 미션 문서를 읽는다.
- spouse-01 완성 예시를 참고한다: src/data/cases/generated/spouse-01.json (investigationStages 필드)
- 6건 각각의 evidence와 investigationResults를 읽는다.
- GPT Pro용 프롬프트+파일을 사건별로 정리하거나, 직접 작성한다.
- 완성되면 검증 체크리스트를 돌린다.
- 최종 산출물을 정리해서 나에게 알려준다.

중요: 컨트롤 타워(본부 스레드)가 최종 통합한다. 네 산출물은 JSON 데이터.
```

---

## 스레드 B 프롬프트

```
너는 "스레드 B — 심문/NPC 대화 품질 관리" 담당이다.
미션 문서를 먼저 읽어라: docs/ref/리뉴얼참고/thread-packages/thread-B/mission.md

너의 역할:
1. 7건(spouse-01~workplace-01)의 v2-atoms를 검증하여 S0-S2에서 진실이 조기 노출되는 atom을 찾는다.
2. 재판관 질문 엔진(judgeQuestionEngine)의 어법 문제를 확인하고 수정한다.
3. 시스템 메시지에 남은 스포일러가 있는지 확인한다.

작업 순서:
- 먼저 미션 문서를 읽는다.
- 7건의 v2-atoms 파일을 읽고 S0-S2 상태의 atoms를 검증한다.
- judgeQuestionEngine.ts를 읽고 문제를 파악한다.
- useActionDispatch.ts에서 시스템 메시지를 스캔한다.
- 발견된 문제를 보고하고, 가능하면 직접 수정한다.
- 수정이 필요한 atom 데이터는 GPT Pro 프롬프트로 정리해서 나에게 전달한다.

중요: Progressive Truth Throttle 규칙 — S0-S1에서 기관명/직함/서비스명 절대 금지.
```

---

## 스레드 C 프롬프트

```
너는 "스레드 C — V3 스크립트 구조 재설계" 담당이다.
미션 문서를 먼저 읽어라: docs/ref/리뉴얼참고/thread-packages/thread-C/mission.md

너의 역할:
1. V3 스크립트가 LLM을 100% 대체하기 위해 필요한 스키마 확장을 설계한다.
2. spouse-01 파일럿 데이터를 작성한다.
3. 83건 확장용 템플릿을 만든다.

핵심 변경 사항을 반드시 반영해야 한다:
- Progressive Truth Throttle: 상태별 진실 수준 제어
- 증거 조사→심문 연계: investigationStages의 각 질문에 대한 NPC 응답
- 카드 오토 정답지: DossierCard 질문별 스크립트 응답
- 증인 게이팅: depth별 증언 스크립트

작업 순서:
- 미션 문서 + 현재 V3 타입(src/types/renewal.ts) + 현재 V3 로더(src/engine/v3GameLoopLoader.ts) 읽기
- 기존 V3 데이터 예시 읽기 (friend-01의 v3-game-loop-data.json, tells-beats.json)
- 스키마 확장 제안서 작성
- spouse-01 파일럿 데이터 작성 (BeatScript 확장 + DossierCard scriptedResponse)
- GPT Pro에 전달할 대량 데이터 생성 프롬프트가 필요하면 정리해서 나에게 전달

중요: V3 대사는 Truth Throttle을 반드시 따라야 한다. S0-S1 대사에 기관명/직함 금지.
```

---

## 스레드 D 프롬프트

```
너는 "스레드 D — Phase 1/2 스크립트 교정" 담당이다.
미션 문서를 먼저 읽어라: docs/ref/리뉴얼참고/thread-packages/thread-D/mission.md

너의 역할:
1. 7건의 Phase 1/2 스크립트에서 스포일러를 찾아 제거한다.
2. 존대/어법을 통일한다 (합니다체, 해요체 금지).
3. 교정 결과를 검증한다.

작업 순서:
- 미션 문서를 읽는다.
- src/data/dialogues/phase1/{case}.json 7건을 모두 읽고 스포일러 스캔한다.
- src/data/dialogues/phase2/{case}.json 7건을 모두 읽고 스포일러 스캔한다.
- 스포일러 발견 시 교정한다 (직접 수정 또는 GPT Pro 프롬프트 정리).
- 존대 검증한다.
- 교정 내역을 기록한다.

중요 규칙:
- Phase 1/2는 S0-S1 수준. 기관명/인물직함/서비스명/정확한 금액 절대 금지.
- 증거의 실제 이름(surfaceName이 아닌 원래 name) 언급 금지.
- 합니다체만 허용. 해요체 금지.
```

---

## GPT Pro 전달 시 참고

GPT Pro에 작업을 넘길 때는:
1. 해당 사건의 case JSON 파일을 첨부
2. spouse-01 완성 예시를 첨부 (해당 작업 유형의)
3. 미션 문서의 작성 규칙 섹션을 복사
4. "이 규칙에 따라 {case}의 데이터를 작성하라"로 요청

GPT에 보낼 파일은 각 스레드가 폴더별로 정리하여 전달합니다.
