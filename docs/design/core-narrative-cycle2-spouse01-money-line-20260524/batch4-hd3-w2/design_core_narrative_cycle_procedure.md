---
name: design-core-narrative-cycle-procedure
description: Core narrative wrapper cycle 표준 8단계 절차 (Cycle 1 sample 경험 기반). Cycle 2+ 진입 시 본 절차 정확히 준수.
metadata: 
  node_type: memory
  type: design
  originSessionId: 13115bcb-1440-4e69-9d18-2cc04b4569f7
---

## 권위 적용 범위

본 절차는 **각 사건의 새 증거/쟁점/증인 narrative wrapper** 작업에 적용. 한 cycle에 여러 emergence 묶어 진행 가능.

권위 근거:
- [[feedback_new_dispute_evidence_narrative_justification]] — Core narrative trigger 권위 (multi-trigger + first-fired-wins)
- [[feedback_avoid_code_abbreviations_with_user]] — 사용자 대화 약어 풀어쓰기
- [[feedback_external_brief_self_contained_folder]] — self-contained 폴더 정책
- [[feedback_external_brief_path_explicit]] — 경로 명시 공유
- [[feedback_claude_korean_polish_limitation]] — KO 시안 GPT Pro 경유
- [[feedback_claude_ko_needs_codex_multilang]] — KO 변경 후 Codex sync

---

## 8단계 절차

### 0. 사전 정찰 (Claude 단독)

**책임:** Claude
**산출:** 사건별 emergence inventory + 우선순위 추천
**예시:** `Cycle X 진입 정찰 — {사건} {증거 1, 증거 2, 쟁점 3 ...} emergence 후보 N개`

표 형식 권장:
| 영역 | id | 이름 | 현 mechanical trigger | 우선순위 |
|---|---|---|---|---|

사용자에게 한 번에 처리할 묶음 (배치 단위) 결정 받기.

### 1. 등장 방식 기획 (Claude 아이디어)

**책임:** Claude
**산출:** 각 emergence별 multi-trigger 후보 2~3개 + fallback. 사용자 권위 trigger 타입 (NPC 끼어듦, 증거 조합, 감정 돌발, 판사 자발 fallback) 활용.

**검증 체크리스트:**
- [ ] 각 후보 trigger type 명시 (npc_interjection / combination_result / emotional_outburst / judge_auto_mention)
- [ ] preconditions (lieState / distrust / phase / contextAction) 명시
- [ ] First-Fired-Wins 보장 (한 trigger fire 시 나머지 disabled)
- [ ] judge_auto_mention fallback 포함 (N턴 후 stall 방지)
- [ ] dynamics 차별성 (각 trigger마다 NPC 인지/감정 상태 다름)

### 2. 사용자에게 풀어 설명 + 피드백 (사용자 결정 영역)

**책임:** Claude (정리/공유) + 사용자 (피드백)
**산출:** 사용자 친화 표 (트리거, 조건, 후속 상황, 기타) — 약어 풀어쓰기 필수

표 형식 예:
| Trigger | 조건 | 후속 상황 | 참고 |
|---|---|---|---|

피드백 받은 후 trigger 후보/dynamics 수정. 사용자 승인 후 다음 단계.

### 3. GPT Pro 전달 자료 폴더 준비 (Claude 단독)

**책임:** Claude
**산출:** `docs/design/{cycle-or-emergence}-{date}/` self-contained 폴더 — 사용자가 폴더 통째 GPT Pro 업로드 가능.

필수 파일:
- `README.md` — index + 사용 절차 + 산출 prompt 예시
- `gpt-pro-brief.md` — 의뢰서 (emergence별 설계 + 13~17 KO entry 명세)
- `{case}-tone-samples.md` — 톤 reference (관련 channel 발췌)
- 관련 메모리 파일 모두 복사 (외부 link X)

**GPT 요청 시 파일로 출력 (여러 건 동시 진행 대비):**
- prompt에 "출력은 JSON 파일 형식" 명시
- 응답 파일명 명세 (예: `output-{cycle}-{emergence}.json`)

**여러 건 동시 진행:**
- 폴더 1개에 여러 emergence 묶기 (배치 단위) OR
- 각 emergence별 별도 폴더 (병렬 GPT 세션)

### 4. 스크립트 작성 (GPT Pro — 사용자 진행)

**책임:** 사용자 (GPT Pro 실행)
**산출:** GPT Pro의 KO entry JSON 응답 (파일 형식)

**중요 — 절대 흔들리면 안 되는 영역:**
- **호칭**: 부부 직접 발화 = "자기야/여보/당신" + 반말. 판사 대상 = "재판관님" + 격식
- **어법**: 격식 발화는 "...십시오/...습니다", 반말은 단정형 회피 + 자연
- **상황 이해**: 진실 노출 정책 ([[design_spouse01_truth_disclosure_policy]] 등) 준수. emergence 시점에 S5 자백 surface 금지

### 5. 세부 검토 + 사용자 의견 묻기 (Claude + 사용자)

**책임:** Claude (검토/수정 시안) + 사용자 (피드백)
**산출:** 풀 버전 entry 공유 + 수정 방향 제시 + 사용자 결정.

**검토 차원:**
- 호칭/어법 일관성 (위 영역)
- 톤 차별성 (각 trigger dynamics 보존)
- 시스템 용어 ("조합", "트리거") behaviorHint에서 제거 → 자연어
- 시제 자연성 (현재 유효 정황은 현재형)
- 감정 디테일 강화

검토는 Claude 또는 spawn한 review 에이전트.

### 6. 로직 체크 (Claude 단독)

**책임:** Claude
**산출:** 특이사항 보고 (사용자에게 알림).

**체크:**
- Schema 정합 (narrativeTriggers field, preconditions 형식, scriptedRefs 시퀀스)
- 데이터 wiring (사건 카드 + recipe + e-XX narrativeTriggers 정합)
- Runtime 통합 (useActionDispatch refreshEvidenceUnlocks 경로)
- tsc + build + qa:fast PASS
- ScriptedText JSON valid

특이사항 있으면 사용자 보고. 없으면 다음 단계.

### 7. 번역 (Codex — 사용자 진행)

**책임:** 사용자 (Codex 실행)
**산출:** EN/JA/ZH-CN sync (N entry × 3 lang).

**Claude 책임:**
- Codex self-contained 의뢰서 폴더 준비 (`docs/design/{cycle}-codex-multilang-{date}/`)
- README + codex-multilang-sync.md + 관련 메모리 복사
- KO baseline commit hash 명시
- 호칭/어법/dynamics 다국어 보존 원칙 명시

### 8. 사후 통합 (Claude 단독)

**책임:** Claude
**산출:** Codex sync 도착 → fast-forward merge → 최종 검증 → 완료 보고.

**작업:**
- `git fetch origin` + `git log origin/{codex-branch}` 확인
- 변경 영역 정합 검증 (3 file × N entry diff)
- fast-forward merge → main push
- 최종 tsc PASS 확인
- 사용자에게 cycle 완료 보고 (HEAD hash + 다음 cycle 안내)

---

## 여러 건 동시 진행 패턴

**가능 영역:**
- 단계 3 (폴더 준비) — 사용자가 GPT 여러 thread 병렬 가능
- 단계 4 (GPT 작성) — 여러 emergence 동시 작성
- 단계 5 (검토) — Claude가 여러 emergence 동시 검토 (또는 review 에이전트 병렬 spawn)
- 단계 7 (Codex sync) — 여러 worktree 동시 작업 가능

**병렬 시 주의:**
- 폴더 1개당 1 emergence (또는 1 batch) 유지 — cross-pollution 방지
- 각 폴더 README에 emergence 범위 명시
- Codex sync는 ScriptedText 영역 충돌 회피 (각 worktree 다른 entry id)

---

## 단계별 Gate (사용자 결정 필요 지점)

| 단계 | 결정 영역 | 사용자 답변 형태 |
|---|---|---|
| 0 후 | 배치 단위 (한 번에 처리할 emergence 묶음) | 수치/이름 list |
| 2 | trigger 후보 수정/승인 | text 피드백 또는 표 수정 |
| 5 | 스크립트 수정 시안 승인 | text 피드백 또는 OK |
| 6 후 | 특이사항 발견 시 처리 방향 | option 선택 |

다른 단계는 Claude 자율 진행.

---

## Cycle 1 sample (기준 reference)

- 폴더: `docs/design/core-narrative-cycle1-spouse01-e5-emergence-20260524/`
- 결과: spouse-01 e-5 emergence wrapper full (17 narrative entry + 4 trigger + 사건 카드 + recipe)
- HEAD: `1ff347ee` (2026-05-24)
- 미완: Codex 다국어 sync (사용자 진행 영역)

본 cycle 진행에서 형성된 모든 정책이 본 메모리 + 관련 메모리에 저장됨. Cycle 2 진입 시 본 메모리 정독 후 0단계 시작.

---

## 관련 메모리 (모두 cycle 진행에 참조)

- [[feedback_new_dispute_evidence_narrative_justification]] — 핵심 권위
- [[feedback_avoid_code_abbreviations_with_user]] — 사용자 대화 약어
- [[feedback_external_brief_self_contained_folder]] — 폴더 정책
- [[feedback_external_brief_path_explicit]] — 경로 공유
- [[feedback_claude_korean_polish_limitation]] — KO GPT Pro 경유
- [[feedback_claude_ko_needs_codex_multilang]] — Codex sync
- [[feedback_natural_korean_npc_active_voice]] — NPC 발화 자연화
- [[feedback_judge_question_quality]] — 재판관 질문 품질
- [[design_spouse01_truth_disclosure_policy]] — spouse 진실 노출
- [[design_core_case_derive_hybrid_merge]] — Core System derive
