# GPT Pro 의뢰서 — friend-01 Cycle 9: e-7 + d-5 + dc-5 emergence narrative

작성일: 2026-05-25
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 3 emergence (e-7 + d-5 + dc-5)의 multi-trigger narrative ScriptedText KO 시안 — 총 36 entry (12 trigger × 3 entry)
**의의**: friend-01 narrative wrapper 영역 마지막 cycle (사건 전체 종료)

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — cascade_from_card trigger spec
- `feedback_dossier_card_renamed_to_clue.md` — "사건 카드" → "단서" 명칭
- `feedback_judge_dispassionate_action_focused.md` — **재판관 어법 (Cycle 7 도입, 본 cycle도 유지)**
- `feedback_judge_question_quality.md` — 재판관 질문 quality
- `feedback_natural_korean_npc_active_voice.md` — NPC 적극 발화 5 차원
- `feedback_family_address_speaker_perspective.md` — 본인 가족 호칭 자기 시점
- `feedback_avoid_code_abbreviations_with_user.md` — 약어 풀어쓰기
- `design_friend01_truth_disclosure_policy.md` — **friend-01 진실 노출 정책 (본 cycle 핵심 — 그룹 5 surface tier 단독)**

톤 reference: `friend01-tone-samples.md`

---

## §1. 사건 context

**friend-01** = 송다은(A, 원고) vs 최수민(B, 피고) 친구 분쟁.

핵심 frame (anchorTruth 권위):
> 최수민의 9일간 연락은 집착이 아니라 송다은 아버지가 결혼 직전 예비신랑에게 돈 접근을 시도하는 흐름을 차단하려던 것이었다. 과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였고, 최수민은 송다은이 무너질까 봐 끝내 그 사실을 말하지 못한 채 악역을 자처했다. **송다은은 확인 없이 단톡방에서 최수민을 매도했고, 같은 구조가 반복됐다.**

본 cycle (Line D 종합) 영역:
- **d-1** (9일간 연락 의도): Cycle 7 영역에서 처리됨
- **d-2** (예비신랑 선 넘기): Cycle 7 영역에서 처리됨
- **d-3** (아버지의 돈 접근 패턴, hidden): Cycle 8b 영역에서 처리됨
- **d-4** (과거 손절과 아버지의 사기, hidden, legitimacyIssue): Cycle 8b 영역에서 처리됨
- **d-5** (단톡방 매도와 명예훼손, hidden): **본 cycle에서 emergence wrapper 신규** — 본 cycle 중심 쟁점

### 캐릭터 frame (필수 준수)

**A = 송다은** (`premature_summary` archetype):
- 결론 먼저 선언, 맥락 후 끼워넣기
- 아버지의 진짜 모습이 드러나는 것이 가장 큰 공포 — Cycle 8b에서 d-3/d-4 부상으로 frame이 깊게 흔들렸음
- **본 cycle은 송다은 자기 행위(단톡방 매도) 책임 영역** — A의 단정 방어 frame이 최대치로 작동
- a-outburst 격앙 정당화: "그건 사실 알림이었어!" / "내가 매도한 게 아니야!" / "그때 그 글만 봤는데 어떻게…" frame

**B = 최수민** (`affect_flattening` archetype):
- 감정을 평평하게 누른 채 사실만 나열
- 본 cycle은 B의 침묵 결과 영역 — 또 악역 frame 인지하면서도 자기 정리
- b-submit / b-cascade-react trigger는 "어쩔 수 없이 단답" frame
- **b-outburst 사용 X 원칙은 본 cycle에서도 유지**. 단 e-7 영역의 T3 (outburst-b)는 **이례적 허용** — d-4 S3 도달 직후 ("예전에도 같은 일이 있었다" 진술 후) 영역에서 "그때랑 똑같은 문구였어요. 지금 보세요" 단발 격앙. 캐릭터 dynamics 일관성 유지 위해 격앙은 1문장으로 제한

### 본 cycle 영역 surface 정책 (진실 노출 정책 핵심 — 그룹 5)

| Keyword 영역 | e-7 영역 | d-5 S0~S2 영역 | d-5 S3 이후 | dc-5 영역 | 본 cycle 노출? |
|---|---|---|---|---|---|
| 과거/현재 대조 (두 시점 같은 흐름) | ✓ surface | △ (사실 알림 frame) | ✓ | ✓ | **본 cycle 영역** (d-3/d-4 영역 fired 후) |
| "단톡방 매도" / "명예훼손" | ✗ | ✗ | ✓ A 인정 | △ challenge 본문만 OK | **d-5 S3 이상만** |
| "확인 없이 매도" / "먼저 낙인" | ✗ | ✗ | ✓ S4 이상 | ✓ challenge 본문 | **d-5 S4+ / dc-5 challenge 영역만** |
| "B 또 악역" / "반복 침묵" | ✗ | ✗ | ✓ S4 이상 | △ noteText 영역 | **d-5 S4+ 영역만** |
| 단정 / 사실 확인 누락 (행위 frame) | ✓ | ✓ | ✓ | ✓ | **본 cycle 영역** (재판관 어법 중립) |
| 아버지 사기 / 미상환 (그룹 2) | △ 인용만 | ✗ | ✓ (Cycle 8b 영역) | △ | **본 cycle 본문 등장 X** (Cycle 8b 영역, 본 cycle reference만 OK) |

**위반 영역**: 본 cycle entry text 또는 behaviorHint에 d-5 S0~S2 영역에서 "매도" / "명예훼손" / "낙인" 단어 등장 시 P0 leak. 5단계 검토 + 6단계 qa:fast에서 검출.

**예외 영역** (재판관 어법 정책):
- 재판관 발화는 "매도" / "낙인" 평가 어휘 절대 회피 (모든 S 단계). dc-5 등재 시점도 "낙인의 순서" 단서명만 인용 가능 + 본문은 "공개 매도" 또는 "단정 행위" frame
- NPC 발화는 d-5 S3 이상 영역에서 단어 인용 OK (A 자기 인정 / B 자기 frame). 다만 자제 톤 유지

### cascade chain (Line D 종합 = 사건 종결)

```
[Cycle 8b 사전 fired]
d-3 S3 + d-4 S3 + w-3 testimony + dc-4 fired
        │
        └─cascade(d-4→e-7)─▶  e-7 (과거/현재 대조표)
        └─cascade(w-3→e-7)─▶  e-7 (별경로)
                                  │
                                  └─cascade(e-7→d-5)─▶  d-5 (단톡방 매도와 명예훼손, hidden)
                                  └─cascade(dc-4→d-5)─▶  d-5 (별경로 — unlock_dispute effect)
                                                            │
                                                            └─cascade(d-5→dc-5)─▶  dc-5 (낙인의 순서) = 종결
```

---

## §2. emergence 설계 — e-7 (4 trigger × 3 entry = 12 entry)

### e-7 자료 본질

| 영역 | 값 |
|---|---|
| 자료 본질 | 과거 송다은 아버지가 최수민에게 했던 돈 부탁 문구와 현재 예비신랑에게 보낸 문구, 그 사이마다 최수민이 혼자 끊고 사라졌던 시점을 한 줄 타임라인으로 정리한 두 시점 대조표 |
| 자료 surfaceName | 두 시점 대조표 |
| subjectParty | both |
| proves | d-5, d-1 |
| requires | e-4, e-5, e-6 |
| requiredLieState | S3 |
| sensitiveSealTargets | 구체 송금 금액 + 아버지 실명 + 회사 실명 (자료 본문 영역) |

### e-7 multi-trigger candidate 4종

**First-Fired-Wins**: e-7는 trigger 후보 4개. 첫 발동 시 나머지 3개 영구 disabled.

#### Trigger 1 — cascade_from_card [priorCard: d-4]

**선결조건:**
- `requirePriorCardFired: 'd-4'` (Cycle 8b dispute d-4 영역 fired)
- `disputeLieState: { 'd-4': 'S3+' }`
- 게이트 channel: evidence_present / dossier (judge 자발)

**Narrative scenario:**
- 컨텍스트: d-4 fired (과거 손절과 아버지 사기 영역 진실 단계 도달) 직후 — 두 시점을 통합 정리할 필요가 부상
- 발동 흐름 (~6초): d-4 fired event → 판사 자발 mention (cascade reference) → A 짧은 반응 → 판사 e-7 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e7-via-cascade-d4-judge-decree-v1` | 판사 | 전체 | d-4 fired 후 cascade mention + 자료 등재 decree | 격식·관찰·중립 ("두 시점" / "정리" 어휘) |
| `emerge-e7-via-cascade-d4-a-react-v1` | A | 판사 | 짧은 반응 (단정 frame 잔존) | 결론 먼저·단정 frame 약화 |
| `emerge-e7-via-cascade-d4-b-react-v1` | B | 판사 | 자제 단답 인정 | 평평·정리 frame |

**가이드:**
- 판사 decree dynamics 의도: "앞서 정리된 [과거 손절과 아버지의 사기] 쟁점과 [같은 부탁] 단서의 흐름이 정리됐습니다. 두 시점을 같은 표로 놓고 확인할 필요가 있습니다. 본 법정에 [두 시점 대조표]를 자료로 채택합니다." (cascade reference 명시 + 단서 명칭 사용)
- A 반응 dynamics: "그건… 지금 일이랑 그때 일이 같은 일이 아니에요" 단정 frame 잔존 (그러나 외침 X). 시선이 옆으로 떨어진다 behaviorHint
- B 반응 dynamics: "관련 자료가 있긴 합니다." 평평한 단답. 손가락이 천천히 맞물린다 behaviorHint

#### Trigger 2 — cascade_from_card [priorCard: w-3]

**선결조건:**
- `requirePriorCardFired: 'w-3'` (Cycle 8b witness 오미경 fired)
- `disputeLieState: { 'd-4': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: w-3 testimony 완료 직후 — 과거 영역이 증인 진술로 확정 → 두 시점 종합 영역으로 자연 진행
- 발동 흐름 (~6초): w-3 testimony 마무리 → 판사 cascade mention → B 자료 제출 → 판사 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e7-via-cascade-w3-judge-mention-v1` | 판사 | B | w-3 testimony 후 cascade mention (자료 요청) | 격식·관찰·중립 |
| `emerge-e7-via-cascade-w3-b-submit-v1` | B | 판사 | 자제 단답 자료 제출 | 평평·어쩔 수 없이 |
| `emerge-e7-via-cascade-w3-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 격식·확정 |

**가이드:**
- 판사 mention dynamics 의도: "앞서 진술하신 [오미경 씨]의 증언으로 과거 영역이 확인됐습니다. 같은 흐름의 현재 자료와 나란히 정리할 시점입니다. 관련 자료를 제출해 주시기 바랍니다." (cascade reference 명시)
- B 제출 dynamics: "두 시점을 한 표로 정리한 게 있긴 합니다." 평평한 단답. 목소리가 더 평평해지는 archetype 패턴
- 판사 decree: "본 법정에 [두 시점 대조표]를 자료로 채택합니다." 격식

#### Trigger 3 — emotional_outburst [source: b]

**선결조건:**
- `partyPhase: { b: ['shaken'] }` (B 흔들림 영역)
- `disputeLieState: { 'd-4': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: B가 d-4 S3 진실 단계 직후 ("예전에 같은 일이 있었다" 진술 후) — 자기 침묵의 결과를 인지하면서 단발 격앙
- 발동 흐름 (~5초): B 단발 격앙 ("그때랑 똑같은 문구였어요. 지금 보세요") → 판사 catch → e-7 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e7-via-outburst-b-surface-v1` | B | 전체 | 단발 격앙 (자료 본질 1문장 surface) | 평평 잠시 깨짐·단발 |
| `emerge-e7-via-outburst-judge-catch-v1` | 판사 | B | catch + 자료 영역 확인 의지 | 격식·중립 |
| `emerge-e7-via-outburst-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 격식·확정 |

**가이드:**
- B 격앙 dynamics 의도: "그때랑 똑같은 문구였어요. 지금 보세요." (단발 1문장 — affect_flattening 깨짐을 1문장으로 제한). 자기 자료 본질 직접 surface. 손등 힘줄이 도드라질 만큼 주먹이 잠깐 조여진다 behaviorHint
- 판사 catch dynamics: "방금 발화 중 두 시점의 문구가 동일하다는 주장이 있었습니다. 관련 자료 확인이 필요합니다." 중립
- 판사 decree: "본 법정에 [두 시점 대조표]를 자료로 채택합니다." 격식

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5` (e-7 unlock 자격 충족 + 5턴 경과 시점, fallback)

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과 — 판사 자발 정리 흐름
- 발동 흐름 (~5초): 판사 자발 query → B 단답 제출 → 판사 surface decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e7-via-fallback-judge-query-v1` | 판사 | B | 자발 query (자료 영역 직접 요청) | 격식·관찰·중립 |
| `emerge-e7-via-fallback-b-submit-v1` | B | 판사 | 자제 단답 자료 제출 | 평평·어쩔 수 없이 |
| `emerge-e7-via-fallback-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query: "앞서 정리된 자료들의 시점 흐름을 한 자리에서 확인할 자료가 있는지 묻겠습니다."
- B 제출: "두 시점을 정리한 표가 있긴 합니다." 자제 단답
- 판사 decree: "본 법정에 [두 시점 대조표]를 자료로 채택합니다." 격식

---

## §3. emergence 설계 — d-5 (4 trigger × 3 entry = 12 entry)

### d-5 (쟁점, hidden) 본질

| 영역 | 값 |
|---|---|
| name | 단톡방 매도와 명예훼손 |
| truthDescription | 송다은이 확인 없이 단톡방에서 최수민을 매도했고, 최수민은 또 악역을 자처하는 구조가 반복됐다 |
| quadrant | both_know |
| hidden | true |
| unlockCondition | d-3 S3 + d-4 S3 도달 시 (현재 + 과거 패턴 확정) 또는 dc-4 success effect (unlock_dispute d-5) |
| requiredEvidence | e-2, e-7 |
| correctResponsibility | a:60, b:40 |
| collapseViaTrust | a=true (A 측 trust meter로 단계 진행 가능) |

### d-5 multi-trigger candidate 4종

**First-Fired-Wins**: d-5는 trigger 후보 4개. 첫 발동 시 나머지 3개 영구 disabled.

#### Trigger 1 — cascade_from_card [priorCard: e-7]

**선결조건:**
- `requirePriorCardFired: 'e-7'` (본 cycle e-7 영역 fired)
- `disputeLieState: { 'd-4': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: e-7 등재 직후 — 두 시점 대조표가 정리되니 현재 단톡방 발언 영역도 별도 쟁점으로 분리 필요
- 발동 흐름 (~6초): e-7 fired event → 판사 cascade mention + 쟁점 부상 decree → A 단정 방어 반응 → B 침묵 반응

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d5-via-cascade-e7-judge-decree-v1` | 판사 | 전체 | e-7 fired 후 cascade decree (쟁점 부상) | 격식·관찰·중립 (행위 frame) |
| `emerge-d5-via-cascade-e7-a-react-v1` | A | 판사 | 단정 방어 반응 | 결론 먼저·자기 정당화 (그러나 외침 X) |
| `emerge-d5-via-cascade-e7-b-react-v1` | B | 판사 | 침묵 자제 반응 | 평평·짧음 |

**가이드:**
- 판사 decree dynamics 의도: "앞서 채택된 [두 시점 대조표]가 두 시점의 사실관계를 정리했습니다. 현재 단톡방 발언 영역의 책임 구조를 별도 쟁점으로 분리합니다." (cascade reference 명시 + "매도/명예훼손" 단어 회피)
- A 반응 dynamics: "그건 별도로 다룰 일이 아니에요. 그때는 사실 그대로였잖아요" 단정 frame 잔존. behaviorHint: 손이 책상 위에서 짧게 움직인다
- B 반응 dynamics: "…" 짧은 침묵 후 "이해합니다." 평평. behaviorHint: 시선이 책상 위로 내려간다

#### Trigger 2 — cascade_from_card [priorCard: dc-4]

**선결조건:**
- `requirePriorCardFired: 'dc-4'` (Cycle 8b dossier dc-4 영역 fired)
- `disputeLieState: { 'd-3': 'S3+', 'd-4': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: dc-4 (손절의 이유) success effect = unlock_dispute d-5. 별경로 cascade — 단서 채택 직후 현재 명예 영역 부상
- 발동 흐름 (~6초): dc-4 success event → 판사 cascade mention + 쟁점 부상 decree → A 짧은 반응

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d5-via-cascade-dc4-judge-mention-v1` | 판사 | 전체 | dc-4 success 후 cascade mention | 격식·관찰·중립 |
| `emerge-d5-via-cascade-dc4-a-react-v1` | A | 판사 | 짧은 반응 | 결론 먼저·약화 frame |
| `emerge-d5-via-cascade-dc4-judge-decree-v1` | 판사 | 전체 | d-5 surface 선언 | 격식·확정 |

**가이드:**
- 판사 mention dynamics 의도: "앞서 등재된 [손절의 이유] 단서로 과거 영역이 정리됐습니다. 같은 구조가 현재 단톡방 발언 영역에서도 반복되는지 별도 쟁점으로 확인이 필요합니다." (cascade reference 명시)
- A 반응 dynamics: "그때 일이랑 단톡방 글은 다른 얘기에요" 단정 frame. behaviorHint: 단정의 톤이 흔들린다 (Cycle 8b 영역 d-4 인정 후 frame 균열)
- 판사 decree: "본 법정에 [단톡방 매도와 명예훼손] 쟁점을 별도 쟁점으로 분리합니다." (쟁점명만 인용, 평가 X)

#### Trigger 3 — npc_interjection [source: a]

**선결조건:**
- `disputeLieState: { 'd-3': 'S3+', 'd-4': 'S3+' }`
- `partyPhase: { a: ['shaken', 'defensive'] }`

**Narrative scenario:**
- 컨텍스트: A가 d-3/d-4 인정 후 단정 방어 frame 발설 — 단톡방 발언이 사실 확인 절차였다는 자기 정당화 외침
- 발동 흐름 (~5초): A 단정 방어 외침 → 판사 catch + 쟁점 부상 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d5-via-npc-a-defend-v1` | A | 전체 | 단정 방어 외침 ("사실 알림이었다" frame) | 격앙·결론 먼저·정당화 |
| `emerge-d5-via-npc-judge-catch-v1` | 판사 | A | catch + 쟁점 부상 의지 | 격식·중립 |
| `emerge-d5-via-npc-judge-decree-v1` | 판사 | 전체 | d-5 surface 선언 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "사실 확인은 했어요. 그날 단톡방에서 본 그 메시지가 다였잖아요. 그게 어떻게 매도예요?" (격앙 + 자기 정당화 frame — "매도" 단어는 A 자기 인용 OK, S3+ 영역이므로). behaviorHint: 손이 책상을 한 번 친다
- 판사 catch dynamics: "방금 발화 중 단톡방 발언이 사실 확인이었다는 주장이 있었습니다. 그 시점 직전의 사실 확인 절차를 별도 쟁점으로 분리합니다." 중립
- 판사 decree: "본 법정에 [단톡방 매도와 명예훼손] 쟁점을 별도 쟁점으로 분리합니다." 격식

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5` (d-3 S3 + d-4 S3 도달 + 5턴 경과)

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과 — 판사 자발 정리 흐름
- 발동 흐름 (~5초): 판사 자발 mention → A 짧은 반응 → 판사 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d5-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 mention | 격식·관찰·중립 |
| `emerge-d5-via-fallback-a-react-v1` | A | 판사 | 짧은 반응 | 결론 먼저·약화 frame |
| `emerge-d5-via-fallback-judge-decree-v1` | 판사 | 전체 | d-5 surface 선언 | 격식·확정 |

**가이드:**
- 판사 mention: "앞서 정리된 두 시점의 흐름과 단톡방 발언의 책임 구조를 별도 쟁점으로 분리합니다."
- A 반응: "…알겠습니다." 짧은 인정 (frame 약화)
- 판사 decree: "본 법정에 [단톡방 매도와 명예훼손] 쟁점을 별도 쟁점으로 분리합니다." 격식

---

## §4. emergence 설계 — dc-5 (4 trigger × 3 entry = 12 entry)

### dc-5 (단서) 본질

| 영역 | 값 |
|---|---|
| label | 낙인의 순서 |
| description | 누가 먼저 공개적으로 최수민을 낙인찍었는지와 왜 같은 구조가 반복됐는지를 묻는 최종 카드. 송다은의 공개 매도 책임 중심 |
| linkedDisputes | d-1, d-5 |
| linkedParty | a (송다은 측 책임 frame) |
| linkedEvidence | e-2, e-7 |
| recipeId (combo) | combine-6 (e-3 + e-7) 또는 combine-7 (e-2 + e-7) |
| successEffects | d-5가 최종 쟁점으로 정리됨 / 정정과 사과가 필요한 지점이 명확해짐 |
| effects | unlock_note dc-5 / upgrade_dispute d-5 high |

**의의**: dc-5는 friend-01 사건 narrative의 종결 단서. linkedParty가 'a'인 점은 송다은 책임 frame 명시 (a 측이 먼저 공개 매도). 본 cycle의 dc-5 narrative entry는 사건 정리 톤이 핵심.

### dc-5 multi-trigger candidate 4종

**First-Fired-Wins**: dc-5는 trigger 후보 4개. 첫 발동 시 나머지 3개 영구 disabled.

#### Trigger 1 — cascade_from_card [priorCard: d-5]

**선결조건:**
- `requirePriorCardFired: 'd-5'` (본 cycle d-5 영역 fired)
- 게이트 channel: dossier (judge 자발)

**Narrative scenario:**
- 컨텍스트: d-5 부상 직후 — 자연 cascade로 dc-5 등재 (Line D 종결)
- 발동 흐름 (~6초): d-5 fired event → 판사 cascade decree (단서 등재) → A 어깨 내려감 반응 → B 시선 변화 반응

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc5-via-cascade-d5-judge-decree-v1` | 판사 | 전체 | d-5 fired 후 cascade decree (단서 등재) | 격식·관찰·중립·종결감 |
| `emerge-dc5-via-cascade-d5-a-react-v1` | A | 판사 | 어깨가 처음으로 내려가는 반응 | 결론 먼저 frame 약화·인정 시작 |
| `emerge-dc5-via-cascade-d5-b-react-v1` | B | 판사 | 시선이 처음으로 A를 정면으로 향하는 반응 | 평평하지만 직시 |

**가이드:**
- 판사 decree dynamics 의도: "앞서 분리된 [단톡방 매도와 명예훼손] 쟁점과 관련하여, 공개 매도의 시간 순서와 반복 구조를 정리한 단서를 등록합니다. 단서명은 [낙인의 순서]입니다." (cascade reference + 단서명 인용 — "낙인"은 단서명에만, 본문은 평가 회피)
- A 반응 dynamics 의도: "…" 어깨가 처음으로 내려간다. "그때는… 정말 그 글만 봤어요" 단정 frame이 처음으로 균열. behaviorHint: 어깨가 내려간다
- B 반응 dynamics 의도: 시선이 처음으로 A를 정면으로 향한다. 발화는 없거나 "…알겠어요." 정도 단답. behaviorHint: 시선이 처음으로 A를 향한다

#### Trigger 2 — combination_result [recipeId: combine-7]

**선결조건:**
- `recipeId: 'combine-7'` (e-2 + e-7)
- 게이트 channel: evidence_present / dossier

**Narrative scenario:**
- 컨텍스트: 사용자가 단톡방 캡처(e-2)와 두 시점 대조표(e-7)를 조합 → A 측 단톡방 매도 frame이 객관 자료로 정리
- 발동 흐름 (~6초): 조합 결과 등재 → 판사 mention + 단서 decree → A 입술 다물기 반응

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc5-via-combo-judge-mention-v1` | 판사 | 전체 | 조합 결과 mention | 격식·관찰·중립 |
| `emerge-dc5-via-combo-a-react-v1` | A | 판사 | 입술 다물기 반응 | 결론 먼저 frame 약화 |
| `emerge-dc5-via-combo-judge-decree-v1` | 판사 | 전체 | dc-5 등재 decree | 격식·확정·종결감 |

**가이드:**
- 판사 mention dynamics 의도: "[단톡방 캡처]와 [두 시점 대조표]를 함께 보면, 공개 매도의 시점이 사실 확인 시점보다 먼저였다는 점이 정리됩니다." (자료명 인용 + 행위 frame)
- A 반응 dynamics: "…" 입술이 다물어진다. 발화는 없거나 "…" 짧은 침묵. behaviorHint: 입술이 다물어진다, 손가락이 멈춘다
- 판사 decree: "본 법정에 [낙인의 순서] 단서를 등록합니다." 격식

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken'] }`
- `disputeLieState: { 'd-5': 'S2+' }`

**Narrative scenario:**
- 컨텍스트: A가 d-5 S2 도달 후 (판단 섞임 인정) 자기 정당화 격앙 — 단톡방 발언 시점에 사실 확인을 했다는 주장 외침
- 발동 흐름 (~5초): A 격앙 자기 정당화 → 판사 catch + 단서 등재 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc5-via-outburst-a-defend-v1` | A | 전체 | 단정 방어 외침 (사실 확인 했다 frame) | 격앙·결론 먼저·정당화 |
| `emerge-dc5-via-outburst-judge-catch-v1` | 판사 | A | catch + 시간 순서 확인 의지 | 격식·중립 |
| `emerge-dc5-via-outburst-judge-decree-v1` | 판사 | 전체 | dc-5 등재 decree | 격식·확정·종결감 |

**가이드:**
- A 외침 dynamics 의도: "내가 먼저 매도한 게 아니라 그땐 그 글만 봤어요. 그게 그렇게 잘못된 거예요?" (격앙 자기 정당화 — "매도" 단어 A 자기 인용 OK, S2+이지만 본 trigger 영역은 S2 도달 후이므로 A 발화 OK). behaviorHint: 손이 책상을 한 번 친다
- 판사 catch dynamics: "방금 발화 중 글을 본 시점과 단톡방 발언 시점의 순서가 언급됐습니다. 두 시점의 시간 순서를 정리한 단서를 등록합니다." 중립
- 판사 decree: "본 법정에 [낙인의 순서] 단서를 등록합니다." 격식

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5` (d-5 S2 이상 + 5턴 경과)

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과 — 판사 자발 종결 흐름
- 발동 흐름 (~5초): 판사 자발 mention → A 짧은 반응 → 판사 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc5-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 mention | 격식·관찰·중립 |
| `emerge-dc5-via-fallback-a-react-v1` | A | 판사 | 짧은 반응 | 결론 먼저·약화·종결감 |
| `emerge-dc5-via-fallback-judge-decree-v1` | 판사 | 전체 | dc-5 등재 decree | 격식·확정·종결감 |

**가이드:**
- 판사 mention: "앞서 분리된 [단톡방 매도와 명예훼손] 쟁점과 관련하여, 공개 매도의 시점과 사실 확인 시점의 순서를 정리한 단서를 등록할 시점입니다."
- A 반응: "…알겠습니다." 짧은 인정 (frame 약화 + 종결감)
- 판사 decree: "본 법정에 [낙인의 순서] 단서를 등록합니다." 격식

---

## §5. entry 작성 가이드 — 호칭·tag·tone

### 호칭 (party / address)

| 화자 | 청자 | 호칭 |
|---|---|---|
| A (송다은) | B (최수민) | "수민아" / "최수민!" (격앙) — 본 cycle은 격앙 발화 등장 (a-outburst) |
| A | 판사 | "재판관님" + "제 전 친구" (B 지칭 시) |
| B (최수민) | A | "다은아" / "송다은!" (격앙 영역 X — affect_flattening) |
| B | 판사 | "재판관님" + "다은이" (A 지칭 시) |
| 판사 | A/B | "송다은 씨" / "최수민 씨" (격식) |
| NPC (w-1/w-2/w-3) | A | "다은이" (w-1) / "그분" (w-2 neutral) / "그 집 딸" (w-3) |
| NPC | B | "수민 씨" (w-1) / "수민 선생님" (w-2) / "수민이" (w-3) |

### 본 cycle 호칭 정책 추가 (feedback_family_address_speaker_perspective 준수)

- 본 cycle은 친구 분쟁 영역. 가족 호칭 영역 없음. 단, A 자기 아버지 인용 시 "아버지" / "우리 아빠" 자기 시점 호칭 사용 (`feedback_family_address_speaker_perspective` 권위)
- "송다은 아버지" 같은 제3자 호칭은 판사·NPC 발화에서만 OK

### tag 패턴 (friend01-tone-samples.md 권위 + Cycle 7/8b 신규 tag)

**공통 tag (모든 entry):**
- `cycleEntry`: true
- `caseId`: "friend-01"
- `emergenceId`: "e-7" / "d-5" / "dc-5"
- `triggerId`: "via-cascade-d4" / "via-cascade-w3" / "via-outburst" / "via-fallback" / "via-combo" / "via-npc" 등

**채널 tag:**
- `channel`: "emergence_narrative"

**trigger 영역 tag:**
- `trigger`: "cascade_from_card" / "combination_result" / "emotional_outburst" / "npc_interjection" / "judge_auto_mention"
- `priorCard` (cascade trigger만): "d-4" / "w-3" / "e-7" / "dc-4" / "d-5"
- `recipeId` (combination trigger만): "combine-6" / "combine-7"

**화자/청자 tag:**
- `speaker`: "judge" / "a" / "b"
- `listener`: "judge" / "a" / "b" / "everyone"

**dynamics tag:**
- `register`: "formal" / "informal" / "outburst"
- `dynamics`: "decree" / "mention" / "query" / "catch" / "submit" / "react" / "defend" / "surface"

**본 cycle 종결감 tag (신규):**
- `lineProgress`: "lineD-start" (e-7) / "lineD-middle" (d-5) / "lineD-end" (dc-5)
- `caseProgress`: "case-closing" (dc-5만 — 사건 종결 단서)

### tone reference (friend01-tone-samples.md 정독 필수)

- 판사 톤: 격식·관찰·중립. "정리" / "확인" / "분리" / "등재" / "채택" 행위 어휘. "선" / "흐름" / "낙인" / "매도" 평가 어휘 회피 (단 단서명/쟁점명 인용은 OK)
- A 톤: 결론 먼저 + 단정 frame. 본 cycle은 frame이 단계적으로 약화 (Cycle 7/8b 영역에서 d-3/d-4 인정 후) → 격앙 outburst는 자기 정당화 frame ("내가 매도한 게 아니라…")
- B 톤: 평평·자제·단답. 본 cycle은 침묵의 결과 영역 — 직시 + 짧은 인정 ("…알겠어요"). e-7 T3는 이례적 단발 격앙 (1문장 제한)

---

## §6. 산출 형식

JSON 배열 (36 entry):

```json
[
  {
    "id": "emerge-e7-via-cascade-d4-judge-decree-v1",
    "text": "앞서 정리된 [과거 손절과 아버지의 사기] 쟁점과 [같은 부탁] 단서의 흐름이 정리됐습니다. 두 시점을 같은 표로 놓고 확인할 필요가 있습니다. 본 법정에 [두 시점 대조표]를 자료로 채택합니다.",
    "behaviorHint": "재판관이 두 시점의 표를 마주 놓는다.",
    "tags": {
      "cycleEntry": true,
      "caseId": "friend-01",
      "emergenceId": "e-7",
      "triggerId": "via-cascade-d4",
      "channel": "emergence_narrative",
      "trigger": "cascade_from_card",
      "priorCard": "d-4",
      "speaker": "judge",
      "listener": "everyone",
      "register": "formal",
      "dynamics": "decree",
      "lineProgress": "lineD-start"
    }
  },
  ... (35 more)
]
```

각 entry 필수 field: `id` / `text` / `behaviorHint` / `tags`

응답 파일명: **output-cycle9.json**

---

## §7. 검증 체크리스트 (작성 후 self-check)

- [ ] 36 entry 모두 작성됨 (12 trigger × 3 entry)
- [ ] entry id가 의뢰서 §2~§4 명세 정확히 일치 (typo X)
- [ ] **그룹 5 keyword 봉인**: d-5 S0~S2 영역에서 "확인 없이 매도" / "명예훼손" / "먼저 낙인" / "B 또 악역" / "반복 침묵" 단어 등장 X (재판관 발화는 모든 S 영역에서 회피)
- [ ] 그룹 2 keyword 봉인: 본 cycle entry에 "아버지의 사기" / "투자 명목 사기" / "미상환" 단어 등장 X (Cycle 8b 영역 — 본 cycle reference만 OK)
- [ ] 재판관 어법: "선" / "흐름" / "낙인" / "매도" 평가 어휘 회피 (단서명/쟁점명 인용만 OK)
- [ ] 본인 가족 호칭 자기 시점: A 자기 아버지 인용 "아버지" / "우리 아빠" (X "송다은 아버지")
- [ ] "사건 카드" → "단서" 명칭 사용
- [ ] cascade trigger의 priorCard tag와 text 본문의 priorCard 인용 일관 ("앞서 등재된 [X]" 패턴)
- [ ] First-Fired-Wins 정합: 각 emergence의 4 trigger는 서로 배타 (한 trigger fire 시 나머지 disabled)
- [ ] dynamics 차별성: 각 trigger마다 NPC 인지/감정 상태 다름 (cascade=정리 / combo=객관화 / outburst=격앙 / fallback=자발)
- [ ] B 캐릭터 dynamics 일관성: affect_flattening 자제 톤. e-7 T3 outburst는 1문장 격앙으로 제한
- [ ] A 캐릭터 dynamics 일관성: premature_summary 결론 먼저 frame. 본 cycle은 frame 단계적 약화 + 격앙 outburst 영역
- [ ] 종결감 (dc-5 영역): 사건 정리 + 단정 책임 인지 시작 톤 — Trigger 1 (cascade-d5)의 A 반응 "어깨가 처음으로 내려간다" behaviorHint 정확히

---

## §8. 본 cycle의 의의 — friend-01 사건 종결

본 cycle은 friend-01 narrative wrapper 영역의 **마지막 cycle**. 이후 friend-01 영역은:
- Cycle 7 (Line A+B): 단톡방 매도 시작 + 예비신랑 선 넘기
- Cycle 8b (Line C): 아버지의 돈 접근 + 과거 손절과 사기
- **Cycle 9 (Line D): 두 시점 종합 대조표 + 단톡방 매도 명예훼손 + 낙인의 순서** ← 본 cycle

dc-5 등재 = 사건 전체 narrative wrapper 완료. 이후 friend-01 영역은 진실 단계별 dispute truth advance + verdict 영역만 (별도 game loop). narrative wrapper 영역의 신규 emergence 없음.

본 cycle 작성 시 특히 dc-5 cascade decree (T1)의 톤이 사건 정리 + 양측 단정 책임 인지 시작 영역을 명확히 표현해야 함. 친구 분쟁의 핵심은 두 사람 모두 확인 전에 단정한 책임 — dc-5는 그 책임 구조를 객관화하는 단서.
