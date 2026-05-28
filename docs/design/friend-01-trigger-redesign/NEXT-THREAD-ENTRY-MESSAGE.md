# 다음 thread 진입 메시지 (friend-01 narrative integrity review)

> 본 file = 다음 Claude Code 인스턴스에 던질 진입 메시지 (자료용).
> 사용자가 새 thread 시작 시 본 file 내용을 복사 → 첫 메시지로 전달.
> 본 file 자체는 git untracked 또는 commit 제외 (임시 자료).

---

## 진입 메시지 (이 아래 내용 복사)

friend-01 사건 narrative integrity 비판적 검토 + 수정 제안 thread 진입.

본 thread = 사건 데이터 자체 (timeline / 5 쟁점 lieConfig + truthStages / 7 증거 description + depthStages / 5 단서 leadLine + challenges / 3 증인 testimony / 10 결합 recipe / 진실 노출 정책 / 사건 핵심 진실 / 3rd party character) 의 **개연성·일관성·자연성 비판적 검토 + 수정 제안**.

직전 friend-01 trigger 재편성 thread (schema 영역) 와 **다른 layer**. 같은 사건 (friend-01) 의 narrative integrity 영역.

## 진입 절차

1. git pull --ff-only + git log --oneline -5 + git status (HEAD = 90c3fb24 또는 이후 commit 확인)
2. 진입 base 메모리 정독:
   - session-handoff-20260527-friend01-narrative-integrity-review-pending (본 thread 진입 자료, **사전 review 영역 20개 정리됨**)
   - session-handoff-20260527-friend01-trigger-redesign-applied (직전 schema 재편성 결과, 본 thread 영역 다름)
   - session-handoff-20260527-parallel-trigger-redesign-policy (4 thread 병렬 정책)
   - design-friend01-truth-disclosure-policy (진실 노출 정책 5 keyword 그룹)
   - feedback-judge-dispassionate-action-focused (재판관 어법 — Cycle 7 도입)
3. friend-01 권위 자료 정독:
   - docs/design/friend-01-trigger-redesign/structure-overview.html (사건 전체 구조 12 section 시각화) — **본 thread 진입 base 핵심 자료**
   - src/data/coreCases/friend-01.case.ts (3031 line) — case 본문 전수 정독
   - src/data/coreCases/friend-01.narrative.ts (1019 line) — narrative wrapper
4. **4 thread 병렬 운영 중** 인지 — spouse-01 manual 테스트 / family-01 narrative integrity review (동일 패턴 진행 중) / 공통 CT. 영역 외 요청 발견 시 거절 + 해당 thread 안내.

## 본 thread 영역

friend-01 사건 데이터 (case.ts + narrative.ts) 의 **narrative integrity** layer:
- 사건 흐름 (timeline 6 stage) 시점·인물·동기 개연성
- 두 당사자 (송다은 premature_summary / 최수민 affect_flattening) verbalTells + lieConfig + truthStages 일관성
- 5 쟁점 (d-1~d-5) truth / truthDescription / S0~S5 양측 발화 자연성 + transitionTrigger 정합
- 7 증거 description / depthStages 단계별 노출 자연성 + sensitiveSealTargets 정합
- 5 단서 leadLine + noteText + challenges (questions + revealAtom) 의도 부합 (dc-5 leadLine 미정의 영역 검토 포함)
- 3 증인 knowledgeScope / bias / hiddenAgenda / testimony.byDispute 신뢰성·자연성 + cross-witness
- 10 결합 recipe inputs → outputId 의도 부합 + statement_combine 자연성 (combine-9/10 신설 영역 포함)
- 진실 노출 정책 5 keyword 그룹 × dispute 단계 disclosure tier 일관성
- 사건 핵심 진실 (5년 전 A 아버지 사기 + 결혼 3주 전 동일 패턴 반복 + B 우회 경고 + 단톡방 매도 + 반복 침묵) 개연성
- 3rd party character (예비신랑 김태윤 + A 아버지) 입체성 — 사건 핵심 동기 인물

## 본 thread 영역 외 (다른 thread 안내)

- spouse-01 사건 영역 → spouse-01 manual 테스트·수정 thread
- family-01 사건 영역 → family-01 narrative integrity review thread (동일 패턴 진행 중)
- 공통 모듈 / UI / engine / store / schema 변경 → 게임 전체 공통 CT thread
- narrative trigger schema 재편성 (직전 thread 완료)
- ScriptedText 작성 / 다국어 sync (별도 다음 thread)

## 작업 단위 (9단계 권장)

1. 정찰 (case.ts + narrative.ts 전수 정독)
2. 영역별 review 사전 분석
3. review 결과 매트릭스 작성 (`docs/design/friend-01-narrative-review/review-findings.md` 권장)
4. 수정 제안 자료 작성 (`docs/design/friend-01-narrative-review/proposals.md`)
5. 사용자 결정 받기 (영역별 단계적, 한글 명칭 병기 필수)
6. 결정된 수정 적용 (case.ts 변경 영역 매우 클 수 있음 — 영역별 commit 분리)
7. 검증 (tsc + qa:fast)
8. 시각화 자료 (`discussion-summary.html`)
9. commit + 핸드오프 메모리 + MEMORY.md 갱신

## 사전 review 영역 20개 (정찰 시 식별)

자세한 영역 매트릭스는 `session-handoff-20260527-friend01-narrative-integrity-review-pending` 메모리 정독. 핵심 검토 포인트:

1. timeline stage 0 (5년 전) A 아버지 ↔ B 직접 돈 거래 자연성 (친구 부모와 친구 자식 거래)
2. B 손절 결정 "돈 문제 내가 알아서 정리할게" frame 모호성 자연성
3. timeline stage 2 (2년 두절) B 가 A 약혼 사실 알게 되는 경로 미명시
4. 결혼 3주 전 A 아버지 동일 패턴 반복 character 자연성
5. B 9일간 6 전화 + 11 문자 = 친구 직접 말 X + 예비신랑에게만 반복 연락 자연성
6. B 메시지 frame ("다은이 관련 / 예전에 같은 일") 모호성 vs 추파 오해 가능성
7. A 단톡방 매도 즉각성 + 친구들 즉각 동조 사회적 자연성
8. 예비신랑 김태윤 character 입체성 (추파 + 회사 단톡 떠벌림 = 결혼 직전 신부 친구 추파 + 장인 돈 부탁 동료 떠벌림)
9. w-2 박준혁 이중 관계 (김태윤 회사 후배 + B 필라테스 수강생) 자연성 + 알린 동기
10. w-3 오미경 분식집 사장 5년 전 장면 정확 기억·증언 자연성
11. w-1 김세라 strategic + pro_a + hiddenAgenda "동조 부끄러움" 정합
12. e-1 ↔ e-4 출처 분리 (김태윤 휴대폰 같은 대화 다른 측면) 자연성
13. B 9일간 메시지 11건 ↔ e-1 evidence 분포 (전화 6 + 문자 11) 정합
14. A 아버지 5년 패턴 반복 character 입체성 (사기꾼 / 가족 어려움?)
15. e-7 본 법정 자체 정리 자료 영역 자연성 (다른 evidence 와 다른 출처)
16. dc-5 leadLine 미정의 (다른 dc-1~dc-4 명시) 의도 또는 누락
17. truthTable t-5 weight 8 (다른 t-1~t-4 weight 10) 의도 차별?
18. anchorTruth 다층 진실 5 chain disclosure tier 정합
19. 「예비신랑」 표기 일관성 (사건 권위 자료 내 다른 영역)
20. 김태윤 실명 등장 영역 자연성 + 3rd party 책임 frame

## 친구-01 사건 특이 영역 (검토 시 정책 기준)

- **design-friend01-truth-disclosure-policy** — 5 keyword 그룹 × 5 chain disclosure tier (예비신랑 먼저 / 아버지 사기 / B 경고 의도 / 손절 원인 / 매도 책임)
- **feedback-judge-dispassionate-action-focused** — 재판관 어법 (사실/행위 중심, 감정·가치 판단 회피, dc-1 label "단톡방 글의 근거" 패턴)
- **친구 사건 특이 character 영역** — B (affect_flattening) 의 "감정 누른 채 사실만 / 가장 아픈 이야기 톤 더 평평" / "self_blame_shield" / "third_party_protection" verbalTells

---

## 본 메시지 사용 안내

위 영역만 복사 → 새 Claude Code 인스턴스 첫 메시지로 전달. 인스턴스가 정독 후 1단계 정찰 진입 전 상태 보고 받기.

본 thread 와 같은 영역 (friend-01 사건) 이라 사건별 thread 정책상 본 thread (trigger 재편성) 종료 후 자연 후속. 단 영역 layer 가 달라 (schema vs narrative integrity) 별도 thread 운영 권장.
