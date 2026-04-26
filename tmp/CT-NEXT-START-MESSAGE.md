# 새 ClaudeCode CT 첫 메시지 (사용자 복사용)

> **사용 방법**: 새 ClaudeCode 스레드 시작 → 아래 박스 안 내용 그대로 복사 → 첫 메시지로 던짐
> **상황**: ClaudeCode CT 유지 + Codex가 5 Phase 종합 수습 진행 중

---

```
이전 CT 이관 받아줘. 다음 파일 정독:

1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260426_v3_truth_leak.md (CT 이관 최신 — 진실 누설 70건 + Codex 종합 수습)
3. memory/feedback_truth_leak_prohibition.md (잘못 패턴 #9 NEW — 진실 누설 금지 / 사건별 surface↔진실 매핑표)
4. memory/feedback_revision_meaning_over_form.md (잘못 패턴 #6/#7/#8)
5. memory/story_v2_confirmed_3cases.md (3건 사건 핵심)
6. memory/project_active_cases.md (활성 3건)
7. CLAUDE.md (게임 구조 + 핵심 원칙 "진실은 플레이어가 직접 밝혀낸다")

⚠️ 중요한 사실 (이전 CT 5번 실수 + 사용자 분노):
- ClaudeCode CT 유지 결정 (사용자가 ClaudeCode 선호)
- Codex가 Worker로 5 Phase 종합 수습 진행 중 (`tmp/REQUEST-Codex-comprehensive-recovery.md`)
- 새 CT는 Codex 회수 후 검증 + 적용 + 다음 작업
- 향후 모든 GPT/Codex 산출물 적용 전 사전 검증 자동 PASS 필수

최근 commit (이번 세션):
- `5de8d72` feat(script-redo): 9세션 적용 + disputeId fix + null 복구 + UI + 버그 fix
- `8b7866a` chore(gpt-pro/codex/qa): script-redo 패키지 + Codex 의뢰 + QA + 검증 시스템 + CT 인계
- ⚠ push 안 함. 누설 70건 P0 / d-5 누락 미해결 상태. Codex 수습 + 검증 PASS 후 push.

현재 상태 (Codex 수습 진행 전 baseline):
- 진실 누설 70건 P0 (재판관 채널)
- d-5 cells 누락 family/friend 5채널 × 2 사건
- 코드 fallback 23건 (?? '당사자' 류)
- 광범위 누설 가능성 (사용자 우려: 검출 패턴 좁아 더 많을 것)
- 빌드 + tsc 통과 (단 누설/누락 미해결)

진행 중 (Codex):
- Phase 1: 진실 누설 70건 fix
- Phase 2: 광범위 누설 재검출 (NPC 채널 포함 + 모든 evidence/dossier 진실)
- Phase 3: 9차원 광범위 audit 14,931 variants 전수
- Phase 4: 코드 fallback 23건 정리
- Phase 5: 검증 시스템 보강 (precheck-comprehensive.cjs)

진행 중 (사용자 GPT Pro):
- S10 family-01 d-5 fill (자기완결 패키지)
- S11 friend-01 d-5 fill (자기완결 패키지)
- ⚠ S10/S11 prompt에 "진실 누설 금지" 섹션 추가 필요 (현재 누락) — 새 CT가 의뢰 시작 전 수정

핵심 강조 (메인 절대 회피):
- 잘못 패턴 #9 (NEW): 진실 누설 금지 (게임 핵심 원칙)
- 잘못 패턴 #1~#8 (이전 누적)
- 사용자 모범 4 patch (인지 / 동기 / 직접 행동 / 동사형)
- ★ 모든 산출물 적용 전 자동 검증 PASS 필수 (Claude self-검증 X)

다음 메인 우선순위:
1순위. Codex Phase 1~5 회수 (`tmp/codex-recovery/FINAL-REPORT.md` 확인)
       → 모든 산출물에 대해 자동 검증 (precheck-comprehensive.cjs) PASS
       → FAIL시 즉시 보고 + 재의뢰
2순위. d-5 prompt에 "진실 누설 금지" 추가 (S10/S11 사용자 의뢰 전)
       — feedback_truth_leak_prohibition.md 내용 + 사건별 surface 매핑표 포함
3순위. 사용자 C/D 검토 결과 회수 (`tmp/USER-REVIEW-{C,D}-*.md`)
4순위. d-5 GPT 산출물 회수 → 적용 + 검증
5순위. commit + push (사용자 명시 후)

자료 위치:
- Codex 의뢰: tmp/REQUEST-Codex-comprehensive-recovery.md (5 Phase 종합)
- Codex 출력: tmp/codex-recovery/ (Phase별 + FINAL-REPORT)
- 누설 raw: tmp/truth-leak-detection.json
- d-5 패키지: gpt-pro-runs/script-redo-20260426/sessions/S10-d5-fill-family-01/, S11-d5-fill-friend-01/
- 사전 검증: tmp/precheck-matrix.cjs, tmp/detect-truth-leak.cjs
       (Codex Phase 5 후): tmp/codex-recovery/precheck-comprehensive.cjs
- 사용자 검토 대기: tmp/USER-REVIEW-{C,D}-*.md
- 이전 QA 결과: tmp/qa-redo-20260426/

현재 진행 안 하기:
- Claude self-검증으로 PASS 판단 X (검출 패턴 좁아 누락 가능)
- 사용자 spot check 의존 X (자동 검증 시스템에 모두 포함)
- 의뢰 메시지에 "사건 핵심 사실 강조"만 X — "진실 누설 금지" 동시 명시 필수

정독 + Codex 회수 상태 확인 후 다음 작업 알려줘.
```

---

## 사용자 참고 (이번 세션 핵심)

### 결정 사항
- **CT = ClaudeCode 유지** (UX + 도메인 + 메모리 우월)
- **Worker = Codex** (광범위 검증 + 자동화)

### Codex 종합 수습 (5 Phase)
의뢰서: `tmp/REQUEST-Codex-comprehensive-recovery.md`

| Phase | 작업 | 산출물 |
|---|---|---|
| 1 | 진실 누설 70건 fix | `tmp/codex-recovery/phase1-*` |
| 2 | NPC 채널 + 모든 채널 광범위 누설 재검출 | `tmp/codex-recovery/phase2-*` |
| 3 | 9차원 광범위 audit (14,931 variants 전수) | `tmp/codex-recovery/phase3-*` |
| 4 | 코드 fallback 23건 정리 | `tmp/codex-recovery/phase4-*` |
| 5 | 검증 시스템 보강 (precheck-comprehensive.cjs) | `tmp/codex-recovery/phase5-*` |
| 종합 | 종합 리포트 | `tmp/codex-recovery/FINAL-REPORT.md` |

### Codex 의뢰 진행 절차
1. `tmp/REQUEST-Codex-comprehensive-recovery.md` Codex에 전달
2. Codex가 Phase별 진행 (자체 빌드/tsc 검증)
3. FINAL-REPORT 회수 후 새 ClaudeCode CT가 검증 + 적용

### 새 CT 운영 약속
1. 모든 적용 전 `precheck-comprehensive.cjs` 자동 실행 → 0 PASS만 적용
2. 의뢰 메시지 작성 시 게임 핵심 원칙 (진실 누설 금지) 자동 포함
3. Claude self-검증 X — 외부 검증 (Codex audit + 사용자 spot check)

### 이전 CT 5가지 실수 (재발 방지)
1. GPT 산출물 무비판 적용 → Codex 자동 검증 게이트
2. status 필드 미체크 → 표준 적용 스크립트
3. 매트릭스 검증 누락 → precheck-matrix.cjs (이미 만듦, Codex Phase 5에서 강화)
4. 자동 검증에 도메인 원칙 미포함 → detect-truth-leak.cjs (이미 만듦, Codex Phase 5에서 광범위화)
5. 의뢰 메시지에 게임 핵심 원칙 누락 → 표준 의뢰 템플릿 + feedback_truth_leak_prohibition.md
