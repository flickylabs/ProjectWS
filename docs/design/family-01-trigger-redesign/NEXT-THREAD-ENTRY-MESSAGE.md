# 다음 thread 진입 메시지 (family-01 narrative integrity review)

> 본 file = 다음 Claude Code 인스턴스에 던질 진입 메시지 (자료용).
> 사용자가 새 thread 시작 시 본 file 내용을 복사 → 첫 메시지로 전달.
> 본 file 자체는 git untracked 또는 commit 제외 (임시 자료).

---

## 진입 메시지 (이 아래 내용 복사)

family-01 사건 narrative integrity 비판적 검토 + 수정 제안 thread 진입.

본 thread = 사건 데이터 자체 (timeline / 5 쟁점 lieConfig + truthStages / 7 증거 description + depthStages / 5 단서 leadLine + challenges / 3 증인 testimony / 12 결합 recipe / 진실 노출 정책 / 사건 핵심 진실) 의 **개연성·일관성·자연성 비판적 검토 + 수정 제안**.

직전 family-01 trigger 재편성 thread (schema 영역) 와 **다른 layer**. 같은 사건 (family-01) 의 narrative integrity 영역.

## 진입 절차

1. git pull --ff-only + git log --oneline -5 + git status (HEAD = 90c3fb24 확인 — direct main / friend-01 thread 가 함께 commit 됨)
2. 진입 base 메모리 정독:
   - session-handoff-20260527-family01-narrative-integrity-review-pending (본 thread 진입 자료, **사전 review 영역 14개 정리됨**)
   - session-handoff-20260527-family01-trigger-redesign-applied (직전 schema 재편성 결과, 본 thread 영역 다름)
   - session-handoff-20260527-parallel-trigger-redesign-policy (4 thread 병렬 정책)
   - design-family01-truth-disclosure-policy (진실 노출 정책 5 keyword 그룹)
3. family-01 권위 자료 정독:
   - docs/design/family-01-trigger-redesign/structure-overview.html (620 line, 사건 전체 구조 12 section 시각화) — **본 thread 진입 base 핵심 자료**
   - src/data/coreCases/family-01.case.ts (3021 line) — case 본문 전수 정독
   - src/data/coreCases/family-01.narrative.ts (740 line) — narrative wrapper
4. **4 thread 병렬 운영 중** 인지 — spouse-01 manual 테스트 / friend-01 trigger 재편성 / 공통 CT. 영역 외 요청 발견 시 거절 + 해당 thread 안내.

## 본 thread 영역

family-01 사건 데이터 (case.ts + narrative.ts) 의 **narrative integrity** layer:
- 사건 흐름 (timeline 6 stage) 시점·인물·동기 개연성
- 두 당사자 (윤태성 confrontational / 윤정후 affect_flattening) verbalTells + lieConfig + truthStages 일관성
- 5 쟁점 (d-1~d-5) truth / truthDescription / S0~S5 양측 발화 자연성 + transitionTrigger 정합
- 7 증거 description / depthStages 단계별 노출 자연성 + sensitiveSealTargets 정합
- 5 단서 leadLine + noteText + challenges (questions + revealAtom) 의도 부합
- 3 증인 knowledgeScope / bias / testimony.byDispute 신뢰성·자연성 + cross-witness
- 12 결합 recipe (combine-11 폐기) inputs → outputId 의도 부합 + statement_combine 자연성
- 진실 노출 정책 5 keyword 그룹 × dispute 단계 disclosure tier 일관성
- 사건 핵심 진실 (20년 송금 + 출생 비밀 + 친자 양보 + 자필 90:10 + 공장 위기 3억 등) 개연성

## 본 thread 영역 외 (다른 thread 안내)

- spouse-01 사건 영역 → spouse-01 manual 테스트·수정 thread
- friend-01 사건 영역 → friend-01 trigger 재편성 thread (또는 후속 thread)
- 공통 모듈 / UI / engine / store / schema 변경 → 게임 전체 공통 CT thread
- narrative trigger schema 재편성 (직전 thread 완료)
- ScriptedText 작성 / 다국어 sync (별도 다음 thread)

## 작업 단위 (9단계 권장)

1. 정찰 (case.ts + narrative.ts 전수 정독)
2. 영역별 review 사전 분석
3. review 결과 매트릭스 작성 (`docs/design/family-01-narrative-review/review-findings.md` 권장)
4. 수정 제안 자료 작성 (`docs/design/family-01-narrative-review/proposals.md`)
5. 사용자 결정 받기 (영역별 단계적)
6. 결정된 수정 적용 (case.ts 변경 영역 매우 클 수 있음 — 영역별 commit 분리)
7. 검증 (tsc + qa:fast)
8. 시각화 자료 (`discussion-summary.html`)
9. commit + 핸드오프 메모리 + MEMORY.md 갱신

## 사전 review 영역 14개 (정찰 시 식별)

자세한 영역 매트릭스는 `session-handoff-20260527-family01-narrative-integrity-review-pending` 메모리 정독. 핵심 검토 포인트:

1. timeline stage 0 시점 개연성 (윤정후 24세에 가업 양보 결정)
2. 공장 위기 3억원 자금 출처 + 어머니 통장 경유 흐름 자연성
3. 어머니 자필 90:10 연습본 작성 시점 (어머니 치매 상태 vs 명료한 자필)
4. 출생 비밀 윤정후 사전 인지 경로 + 시점
5. e-7 일기장 정보 집중 영역 (한 일기장에 너무 많은 진실)
6. w-1 + w-3 cross-witness 자연성 (동네 지인 관계)
7. w-3 박순애 bias=pro_a + 어머니 "정후가 더 짊어졌다" 발화 충돌
8. w-3 cross-cycle unlock (dc-3 + dc-5) narrative 정합
9. dc-3 통합 event 의 narrative 정합
10. 결합 recipe (combine-2/3 등) 의도 부합
11. truthTable t-3 (월 단위 송금 + 3억 한 번에) 통장 경유 자연성
12. 윤정후 자동차부품 가게 운영자가 어머니 송금 + 형 정기 지원 + 3억 + 어머니 병원비 동시 감당 자금 규모
13. 윤태성 "모시고 살았다" 자기 인식 vs 정후 어머니 병원비 대왔다는 진실
14. d-1 truthDescription "말년에 자주 방문" vs timeline stage 2 "공증 3주 전 방문 급증" 자연성

---

## 본 메시지 사용 안내

위 영역만 복사 → 새 Claude Code 인스턴스 첫 메시지로 전달. 인스턴스가 정독 후 1단계 정찰 진입 전 상태 보고 받기.

본 thread 와 같은 영역 (family-01 사건) 이라 사건별 thread 정책상 본 thread (trigger 재편성) 종료 후 자연 후속. 단 영역 layer 가 달라 (schema vs narrative integrity) 별도 thread 운영 권장.
