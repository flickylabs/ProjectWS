# Core System Narrative Layer Cycle — Thread Brief

작성일: 2026-05-24
주체: Codex worktree 또는 ClaudeCode 새 세션 (메인 세션 외 별도 스레드)
범위: 다중 cycle 작업 (1 cycle ≠ 본 brief 전체 완료)

---

## §1. 배경 (필독)

본 cycle은 2026-05-24 QA round에서 사용자가 제기한 *narrative trigger 부재* 문제를 해결한다.

**핵심 권위:** [feedback-new-dispute-evidence-narrative-justification](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_new_dispute_evidence_narrative_justification.md) — 모든 의사결정의 baseline. 진입 시 정독 필수.

요약:
- 현재 게임의 새 쟁점/증거/증인 등장은 mechanical trigger (조건 충족 → 즉시 unlock)
- 사용자 보고 사례:
  - "통화기록으로 질문하는데 갑자기 개인 계좌 출금 내역이 unlock" — 납득 사건 없이 발동
  - 은행 직원 첫 호출만으로 "공동 적금 해지" 질문 노출 — hidden 쟁점 무리 노출
- 목표: 각 emergence/unlock에 **narrative wrapper layer**를 부착해 *말꼬리 잡을 만한 사건* + *임팩트 VFX*로 등장

---

## §2. 권위 trigger 타입 (메모리에 정리됨)

권장 trigger 순서:
1. **증거 조합 결과** (combinationLab) — 가장 자연 (사용자 의도 추론 → deterministic 보상)
2. **증거 기반 질문 대답 과정** (evidence_present interrogation) — NPC 말실수
3. **증인 답변 연장선** (witness testimony) — 단, 첫 호출 일괄 노출 금지

비권장 (정책 위반):
- lieState 자동 unlock
- 증인 첫 호출 일괄 노출
- 단순 toast만 (narrative 없음)

자유 심문은 trigger source 부적합 → 사전 조건 게이트 역할만.

---

## §3. 작업 범위 (3 사건 × 평균 ~10 emergence/unlock ≈ 30 narrative event)

### 3.1. 사건별 영역

| 사건 | 영역 |
|------|------|
| spouse-01 | 5 dossierCard (dc-1~dc-7), 7 evidence (e-1~e-7 unlock chain), 3 witnesses (w-1, w-2, w-3) emergence |
| family-01 | 동일 규모 |
| friend-01 | 동일 규모 |

각 case의 hidden 쟁점, 잠겨있는 증거, 증인 emergenceTrigger 모두 audit.

### 3.2. cycle 분할 권장

전체를 1 thread에서 끝내려 하지 말 것. cycle 단위 분할:
- **Cycle 1**: spouse-01 대표 emergence 1~2개 (priority: 사용자 보고된 e-5 reveal mapping)
- **Cycle 2**: spouse-01 잔존 emergence 일괄
- **Cycle 3**: family-01 전체
- **Cycle 4**: friend-01 전체

각 cycle 종료 시 commit + push + 메인 세션 보고.

---

## §4. 작업 패턴 (cycle 내부 흐름)

per-emergence 단위:

1. **현 mechanical trigger 식별**
   - 코드 위치 (case.ts, claimPolicies, scriptedAngles, useActionDispatch unlock 경로)
   - 현재 발동 조건 (evidenceIds, lieState, witnessIds 등)

2. **Narrative event 설계**
   - 권위 trigger 타입 중 1 선택 (조합 결과 / 질문 답변 / 증인 답변)
   - NPC 발화 또는 judge reactive query 대사 1~3 문장 작성
   - 발화 시점: trigger 직전 → narrative dialogue → 1.5초 후 emergence VFX
   - 임팩트 등장: cutscene 또는 강조 popup (단순 toast X)

3. **ScriptedText 작성 (KO)**
   - `src/data/scriptedText/{case}.json`에 새 entry 추가
   - tags: `channel:emergence_narrative`, `speaker:{npc/judge}`, `listener:judge`, `register:formal` 등

4. **데이터 wiring**
   - emergence trigger에 narrative event ID 부착
   - useActionDispatch 또는 emergence 처리 경로에서 narrative dispatch 후 unlock

5. **VFX 연출 wiring**
   - 기존 cutscene 시스템 ([[design_vfx_inventory_pc]]) 재활용 가능 영역 우선
   - 신규 VFX 필요 시 별도 의뢰서

6. **다국어 sync 의뢰서** (KO 작성 직후)
   - `docs/design/core-system-narrative-layer-cycle-{N}-{topic}/codex-multilang-sync.md`
   - 표준 form 따름 ([[feedback_claude_ko_needs_codex_multilang]])

7. **검증**
   - tsc PASS
   - qa:fast PASS (있으면)
   - 수동 시뮬: run-pc.bat → 해당 emergence 발동 시점 narrative 정상 표시 확인

---

## §5. 진입 조건

| 항목 | 조건 |
|---|---|
| 메모리 읽기 | `feedback-new-dispute-evidence-narrative-justification` 정독 필수 |
| Core System 정독 | [[design_core_case_derive_hybrid_merge]] + spouse/family/friend `*.case.ts` 영역 파악 |
| trigger 영역 정독 | `src/hooks/useActionDispatch.ts` refreshEvidenceUnlocks 경로, `src/data/witnessTestimonyData/` |
| ScriptedText 정독 | `src/data/scriptedText/{case}.json` 구조 |
| baseline | 메인 세션 HEAD 기준. 메인이 작업하는 작은 fix들과 충돌 회피 |
| 산출 | branch 또는 PR — 메인 세션이 review/merge |

---

## §6. 메인 세션과의 분업

- **메인 세션 (this session)**: 작은 QA fix (텍스트 polish, 팝업 UX, 단발 bug) 지속
- **본 cycle (별도 스레드)**: Core System narrative layer 작업 단독
- 충돌 회피: 각 cycle 진입 시 `git pull` 필수. ScriptedText 영역 작업 분리 (cycle은 새 entry 추가, 메인 세션은 기존 entry polish)

---

## §7. 산출 / 보고 format

각 cycle 종료 시 메인 세션(또는 사용자)에 1 page 보고:
- 처리한 emergence ID 목록
- 신규 narrative event ID 목록
- KO commit hash + Codex 의뢰서 경로
- 발견된 추가 audit 영역 (다음 cycle 위임)
- 미해결 의사결정 (사용자 결정 필요 영역)
