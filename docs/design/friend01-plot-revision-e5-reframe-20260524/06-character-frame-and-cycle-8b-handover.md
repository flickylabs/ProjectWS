# 06 — Character frame 재확인 + Cycle 8b narrative wrapper 영역 안내

본 문서는 두 영역 다룸:
- **A**: B character integrity 재반영 원칙 (CT 세션이 reword 시 self-check)
- **B**: Cycle 8b (narrative wrapper) 진입 시 작업 영역 명세 (다음 Cycle 세션 진입자용)

---

## A. Character frame 재확인

### partyB = 최수민 (`affect_flattening`)

**archetype 본질** ([friend-01.case.ts:15](../../../src/data/coreCases/friend-01.case.ts#L15)):
> 감정을 평평하게 누른 채 사실만 나열. 가장 아픈 이야기에서 톤이 오히려 더 평평.

**사용자 권위 영역** (Cycle 8 cycle 세션 2단계):
> "B는 예전에는 계속 숨겨줬었는데 이제와서 갑자기 억울하다는 듯이 달려드는게 안맞아."
> "B도 격앙될 수 있지만 다 떠벌리는 형태의 결론은 아니야. 그 중에도 자제를 하는 느낌이 있어야 돼."

### B 발화 reword 원칙

| ✗ 위반 (active voice 위반) | ✓ 권장 (affect_flattening 자제 톤) |
|---|---|
| "그 자료를 같이 봐주세요!" (자발 자료 제출 + 격앙) | "...자료 확인이 필요할 수 있습니다." (자제 톤 제안) |
| "억울합니다! 제가 다 설명할 수 있어요!" | "..." (긴 침묵 후) "그때는 그게 맞다고 생각했어요." (단조 톤 단정) |
| "그 사람이 먼저 떠벌렸어요!" | "회사 단톡방 캡처를 본 시점이 있었어요." (사실 나열) |
| "끝까지 제가 다 막으려 했어요!" | "그때는 직접 막을 수밖에 없었습니다." (자제 단정) |
| 단정형/완료형 자기 정당화 | 단정형 회피 + 자연 + 사실 나열 |

### B 격앙 가능 영역 (사용자 명시)

격앙은 가능하나 **다 떠벌리는 결론 X**. 자제 톤 유지:
- 격앙 표현: "표정 변화가 사라진다" / "시선이 한 점에 박힌다" / "거의 속삭임처럼 나온다" (affect-flatten 격앙)
- 직접 격앙: 매우 짧은 외침 1~2문장 후 즉시 자제 (예: "그게...그게 어떻게 그렇게 들리죠." → 침묵 → 단조 인정)
- ✗ 회피: 줄줄이 자기 변호 / 책임 전가 격앙 / "내가 다 막으려 했다" 줄줄이

### partyA = 송다은 (`premature_summary`)

**archetype 본질**:
> 결론 먼저 선언, 맥락 후 끼워넣기. 아버지의 진짜 모습이 드러나는 것이 가장 큰 공포.

### A 발화 reword 원칙 (e-5 reframe 후)

| 변경 영역 | 원칙 |
|---|---|
| "아버지는 그런 문자 안 보냈어!" | "아버지는 그런 일 시도한 적 없어!" (단정 + 아버지 부정 frame 유지) |
| 아버지 시도 영역 직접 부정 | S0~S2 강하게 frame 유지 ("결혼 자금 시도" 단어 절대 등장 X) |
| 아버지 영역 단정 frame 무너짐 (S3+) | "아버지가 시도하려 했다는 건 알고 있다" 같이 단계적 무너짐 |

A character의 단정 frame은 reframe 후에도 유효 (아버지 영역 부정).

---

## B. Cycle 8b narrative wrapper 영역 안내

본 plot revision CT 완료 + main 통합 후 새 Cycle 세션 (Cycle 8b) 진입. 본 영역은 narrative wrapper layer (7 emergence × 4 trigger 시안 + entry 작성 + Codex sync).

### Cycle 8b 처리 7 emergence

| # | 영역 | id | 자연 명칭 | unlock 조건 (mechanical) | cascade priorCard 후보 |
|---|---|---|---|---|---|
| 1 | 증거 | e-5 | 예비신랑 회사 단톡 떠벌림과 최수민의 9일간 차단 연락 (S1 reframe 후) | requires e-1 + d-3 S2 | d-2 (예비신랑 선) |
| 2 | 단서 | dc-3 | 같은 부탁 | combine-3 (e-5+e-6) + d-2 S3 | e-5 |
| 3 | 쟁점 | d-3 (hidden) | 아버지의 돈 접근 패턴 | d-2 S3 도달 시 unlock | dc-3 |
| 4 | 증거 | e-6 | 과거 송금 영수증 + 문자 | requires e-3 + d-4 S2 | d-3 |
| 5 | 단서 | dc-4 | **손절의 이유** (label 변경) | combine-4 (e-3+e-6) + d-3 S2 | e-6 |
| 6 | 쟁점 | d-4 (hidden, **legitimacyIssue**) | 과거 손절과 아버지의 사기 | d-3 S3 도달 시 unlock | dc-4 |
| 7 | 증인 | w-3 | 오미경 (분식집 사장, pro_b) | unlockedByDossier=['dc-4'] | dc-4 |

⚠️ **e-7은 Cycle 9 (Line D 종합)로 분리** — d-3 + d-4 모두 S3 후 cascade가 자연.

### Cycle 8b 사용자 결정 완료 영역 (cycle 8 cycle 세션 사전)

| 결정 | 답 |
|---|---|
| Batch 분할 | 2 batch (Batch 1 = e-5+dc-3+d-3, Batch 2 = e-6+dc-4+d-4+w-3) |
| dc-3 label | "같은 부탁" (현 유지) |
| dc-4 label | "손절의 이유" (신규 — Cycle 8b 작업) |
| B character trigger 방향 | 자제 톤, 격앙 가능 but 다 떠벌리지 X |

### Cycle 8b 진입 절차 (cycle 2/7 패턴 동일)

새 세션 시작 시:
1. 본 폴더 + 본 plot revision 결과 정독
2. 권위 메모리 정독:
   - [[design_core_narrative_cycle_procedure]] (8단계 절차)
   - [[feedback_new_dispute_evidence_narrative_justification]] (multi-trigger + First-Fired-Wins)
   - [[design_narrative_cascade_from_card]] (cascade trigger)
   - [[design_friend01_truth_disclosure_policy]] (**진실 노출 정책 — 핵심 권위**)
   - [[feedback_judge_dispassionate_action_focused]] (재판관 어법)
   - [[feedback_dossier_card_renamed_to_clue]] ("단서" 명칭)
   - [[feedback_family_address_speaker_perspective]] (호칭 자기 시점)
   - [[feedback_avoid_code_abbreviations_with_user]] (사용자 대화 약어)
3. 0단계: cycle 8 결과 inventory 보여 batch 분할 확인 ("이미 2 batch 결정됨, 변경 없으면 그대로 진행")
4. 1단계: 7 emergence × 4 trigger 시안 (B character 재반영 + A trigger 영역 확대 + cascade 매개)
5. 2단계: 사용자 검토 + 피드백 (B character 단조 톤 재확인)
6. 3단계: GPT Pro 의뢰서 폴더 (2 batch 또는 1 통합)
7. 4~7단계: GPT Pro → 검토 → 로직 체크 → Codex 다국어 sync
8. 8단계: 사후 통합 + 핸드오프 + Cycle 9 (Line D 종합) 안내

### Cycle 8b trigger 시안 사전 가이드 (참고용)

**B character 재반영 영역:**

- ✗ NPC interjection source=B 자발 자료 제출 — 회피
- ✗ Emotional outburst source=B 격앙 long → 회피
- ✓ Emotional outburst source=B 자제 톤 격앙 (1~2 문장 후 즉시 단조)
- ✓ Cascade에서 B는 수동 단조 반응 (transitionBeat의 affect-flatten 격앙 표현)
- ✓ 판사 silence-catch (B의 회피/단조 톤을 판사가 catch)

**A trigger 영역 확대:**

- ✓ A 부정 외침 catch ("아버지는 그런 일 안 해!" → 판사가 "그런 일이라고 하시는 그 일이 무엇입니까" reactive query)
- ✓ A 단정 frame 흔들림 (S2+ 시점 단정 frame 회피 단계 ↑ 표현)
- ✓ A premature_summary archetype의 "결론 먼저 선언" 무너짐 표현 (선언 후 끼워넣기 영역에서 모순 노출)

**Cascade 매개:**

- ✓ priorCard=dc-2 → e-5 부상 (Line B+C 연속)
- ✓ priorCard=e-5 → dc-3 부상
- ✓ priorCard=dc-3 → d-3 부상
- ✓ priorCard=d-3 → e-6 부상
- ✓ priorCard=e-6 → dc-4 부상
- ✓ priorCard=dc-4 → d-4 부상
- ✓ priorCard=dc-4 → w-3 부상 (또는 priorCard=d-4 alt)

**w-2 d-3 영역 narrative trigger 신규 (CT 적용 후 영역):**

본 plot revision에서 w-2.unlockedByDossier 확장 (['dc-2'] → ['dc-2', 'dc-3'])했으므로 Cycle 8b에서 w-2의 d-3 호출 narrative trigger 추가 **필수** (mechanical 호출 정책 위반 회피).

후보 trigger:
- Cascade priorCard=dc-3 — dc-3 등재 후 w-2의 d-3 영역 testimony 호출
- 단 w-2의 d-2 영역 호출과 충돌하지 않게 narrative entry id 분리 (예: `emerge-w2-d3-via-cascade-dc3-v1`)

### Cycle 9 (Line D 종합) 영역 미리보기

본 Cycle 8 + 8b 완료 후 Cycle 9 진입 영역:
- e-7 (과거/현재 대조표) — d-3+d-4 모두 S3 후 cascade
- d-5 (단톡방 매도와 명예훼손) — d-3+d-4 모두 S3 후 unlock
- dc-5 (낙인의 순서)
- Line A + B + C 모두 종합 정리

본 plot revision은 Cycle 9 영역 직접 영향 없음 (e-7/d-5/dc-5는 Line D 영역).

---

## CT 세션이 본 영역 작업 시 권장 commit 메시지 패턴

### Authority 변경 commit

```
plot(friend-01): e-5 reframe + d-3/w-2/dc-3 정합 reword (CT 세션 영역)

- e-5 자료 자체 교체: 아버지 직접 문자 → 예비신랑 회사 단톡 떠벌림 + B 9일간 차단 연락 (시안 S1)
- d-3 truthDescription / verdictOptions / truthStages.b (S2/S3/S5) + S5.a 일부 reword
- w-2 testimony.byDispute['d-3'] 신규 + unlockedByDossier/relatedDisputes ['d-2','d-3'] 확장
- dc-3 description / noteText / successEffects[0] / challenges.b.q1 lockedHint reword
- combine-3 discoveryText / surfaceFallback reword
- e-5 sensitiveSealTargets 신규 ('회사 동료 실명' + '최수민 메시지 사적 톤')

권위: friend-01-cycle-8 cycle 세션 결정 (사용자 권위)
영역: docs/design/friend01-plot-revision-e5-reframe-20260524/
영역 외: narrative wrapper triggers (Cycle 8b 영역)
```

### ScriptedText KO reword commit

```
text(friend-01): e-5/d-3/dc-3 ScriptedText KO 정합 reword (CT 세션 영역)

- interrogation d-3 영역 ~36 entries reword (B '경고/확인' → '직접 막아보려/차단')
- evidence_present e-5 영역 ~28 entries reword (자료 자체 표현 정합)
- dossier dc-3 영역 ~6 entries reword
- judge_evidence_combo combine-3 영역 ~6 entries reword
- judge_question / judge_contradiction / mediation / aftermath d-3 영역 ~12 entries reword

KO 변경 완료. 다국어 sync는 별도 Codex worktree.
```

### 다국어 sync 의뢰서 commit

```
docs(friend-01): plot revision Codex 다국어 sync 의뢰서 (CT 세션 영역)

- e-5 + d-3 + dc-3 + combine-3 KO 변경 영역 EN/JA/ZH-CN sync 명세
- 예상 ~88 entries × 3 lang = 264 외국어 entries
- 신규 단어 다국어 가이드 (떠벌림/차단 메시지/결혼 위기 등)
```
