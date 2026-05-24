# 04. 채널별 entry 작성 명세 (정밀화 — 2026-05-24 갱신)

## ⚠️ 채널별 실제 구조 매트릭스 (이전 spec 정정)

본 의뢰서 1차 spec은 채널별 실제 구조를 충분히 반영하지 못했습니다. 본 정밀화 spec이 권위.

`src/data/scriptedText/spouse-01.json`의 9개 채널 실제 구조:

| 채널 | key 형식 | 핵심 fields | dispute 분기 | 비고 |
|---|---|---|---|---|
| `interrogation` | `{party}\|{disputeId}\|{lieState}\|{questionType}` | party, disputeId, lieState, questionType, stanceHint, truthLevel, variants | ✅ disputeId 기반 | NPC가 재판관에게 답변 |
| `judge_question` | `{disputeId}\|{questionType}\|{depth}` | disputeId, questionType, depth (1~4), truthLevel, variants | ✅ disputeId 기반 | 재판관이 NPC에게 질문. variant.tags의 `targetParty:a/b/both`로 호명 결정 |
| `judge_evidence_combo` | `{dossierCardId}.{party}.q{N}\|{tone}` | dossierCardId, questionId, tone (`soft\|mid\|hard`), variants | ✅ dossierCard 기반 (질문 결합) | dossier 결합 시 재판관 발화 |
| `judge_contradiction` | `{disputeId}\|{tone}` | disputeId, tone, variants | ✅ disputeId 기반 | 모순 추궁 재판관 발화 |
| `evidence_present` | `{party}\|{evidenceId}\|{lieBand}\|{subjectRole}` | party, evidenceId, lieBand (`early\|mid\|late`), subjectRole, subjectParty, stanceHint, truthLevel, variants | ✅ evidenceId 기반 | NPC가 증거 제시받았을 때 반응 |
| `dossier` | `{dossierCardId}.{party}.q{N}\|{lieBand}` | dossierCardId, questionId, questionText, targetParty, requiredLieState, lieBand, stanceHint, truthLevel, variants | ✅ dossierCard 기반 | dossier challenge NPC 응답 |
| `contradiction_pursuit` | `{party}\|{disputeId}\|{lieState}` | party, disputeId, lieState, stanceHint, truthLevel, variants | ✅ disputeId 기반 | 모순 추궁 NPC 응답 |
| **`mediation`** | **`{path}\|{speaker}`** | **path (`immediate\|conditional\|postpone\|fact_first`), speaker (`a\|b`), stanceHint, truthLevel, variants** | **❌ dispute-agnostic** | **모든 사건 공유 8 entry. sourceRefs에 모든 dispute 포함** |
| **`aftermath`** | **`{resultClass}`** | **resultClass (`a_primary_fault\|b_primary_fault\|shared_fault\|protective_resolution\|procedural_caution`), variants** | **❌ dispute-agnostic** | **모든 사건 공유 5 entry. 결과 분류별 결말 narrator 발화** |

## ✅ Batch별 실제 작성 가능 영역

신규 hidden 쟁점 `h-d4` 추가 시 작성해야 할 entry는 dispute-aware 7개 채널에 한정. mediation/aftermath는 dispute-agnostic이라 h-d4 specific entry 추가가 채널 구조상 의미 없음.

### Batch 1 — `interrogation` (24 entry / 권위)

기존 h-d3 entry 패턴 그대로 + disputeId 'h-d4'.

| # | key | text guideline |
|---|---|---|
| 1~24 | `{a\|b}\|h-d4\|S{0~5}\|{questionType}` | 단계별 NPC 답변 (의뢰서 1차 spec 그대로) |

### Batch 2 — `judge_question` (8~12 entry, depth 기반)

**기존 spec 정정**: `lieState` 기반이 아니라 `depth` 기반 (1~4).

| key 패턴 | 의미 |
|---|---|
| `h-d4\|fact_pursuit\|1~4` | 사실 추궁 4 depth |
| `h-d4\|motive_search\|1~2` | 동기 추궁 |
| `h-d4\|empathy_approach\|1~2` | 공감 접근 |

- entry-level에 `party` 영역 없음. variant.tags의 `targetParty:a/b/both` token으로 호명 결정
- variants는 a/b/both target 섞임 가능 (한 entry에 다양한 호명 variant)
- depth와 lieState의 매핑은 작성자 자유 — 표면 질문은 depth 1, 깊은 질문은 depth 4 영역

### Batch 3 — `judge_evidence_combo` (6 entry)

**기존 spec 정정**: dossier card 기반. `dc-8.b.q1\|{soft\|mid\|hard}` 및 `dc-8.b.q2\|{soft\|mid\|hard}` = 6 entry.

| key | 의미 |
|---|---|
| `dc-8.b.q1\|soft/mid/hard` | dc-8.b.q1 challenge 재판관 결합 발화 강도 점진 |
| `dc-8.b.q2\|soft/mid/hard` | dc-8.b.q2 동일 |

### Batch 4 — `evidence_present` (12 entry)

**기존 spec 정정**: lieBand 기반 (early/mid/late) 3단계.

| key 패턴 | 의미 |
|---|---|
| `{a\|b}\|e-8\|{early\|mid\|late}` | e-8 제시 시 NPC 반응 6 entry |
| `{a\|b}\|e-9\|{early\|mid\|late}` | e-9 제시 시 NPC 반응 6 entry |

- subjectRole 추가 영역 ('self' / 'other')
- subjectParty = 'b' (e-8/e-9 모두 B subject)

### Batch 5 — `dossier` 채널 (6 entry) + case.ts polish (4 영역)

**ScriptedText dossier 채널 영역 (6 entry)**:
- `dc-8.b.q1\|early/mid/late` (3 entry)
- `dc-8.b.q2\|early/mid/late` (3 entry)
- fields: dossierCardId, questionId, questionText, targetParty='b', requiredLieState, lieBand, stanceHint, truthLevel, variants

**case.ts 영역 (별도 patch)**:
- `dc-8.noteText` polish
- `dc-8.judgeHint` polish
- `dc-8.challenges.b.questions[0].text` polish
- `dc-8.challenges.b.questions[1].text` polish

### Batch 6 — `contradiction_pursuit` (6 entry)

| key 패턴 | 의미 |
|---|---|
| `{a\|b}\|h-d4\|S{1~3}` | 모순 추궁 NPC 응답 단계별 |

questionType field 없음. lieState만.

### Batch 7 — `mediation` (작성 X, dispute-agnostic)

**중요**: mediation 채널은 **dispute-agnostic**. 모든 사건이 같은 8 entry 공유 (`immediate|a`, `immediate|b`, `conditional|a`, `conditional|b`, `postpone|a`, `postpone|b`, `fact_first|a`, `fact_first|b`).

h-d4 specific entry 추가 X. h-d4 발현 시 동일 8 entry가 dispatch (sourceRefs에 `dispute:h-d4` 포함되어 있음 — 본 cycle 4에서 dead reference가 활성화).

**다만** h-d4 mediation 영역의 dispute-specific 재판관 발화가 필요하다면:
- `case.ts`의 `dispute h-d4.mediationLink` 영역 (1줄 frame label) 활용
- 또는 narrative wrapper 영역 (`emergence_narrative` 채널) — Cycle 4 narrative wrapper 세션 영역

### Batch 8 — `aftermath` (작성 X, dispute-agnostic)

**중요**: aftermath 채널도 **dispute-agnostic**. 5 entry는 결과 분류별 narrator 발화:
- `a_primary_fault` / `b_primary_fault` / `shared_fault` / `protective_resolution` / `procedural_caution`

h-d4 specific entry 추가 X. 판결 결과 분류로 dispatch.

**다만** h-d4 결말 narration이 필요하다면:
- `case.ts`의 `dispute h-d4.verdictOptions` 영역 (이미 정의됨)
- 또는 사건 전체 결말 narration의 일부로 통합

## 📋 Batch 적용 상태 (2026-05-24)

| Batch | 채널 | entry / variant | 상태 |
|---|---|---|---|
| 1 | interrogation | 24 / 48 | ✅ commit `2b153d7d` |
| 4 | evidence_present | 12 / 32 | ✅ commit `77c597e8` |
| 5 | dossier + case.ts | 6 + 4 / ~20 | ✅ commit `a1a74faa` |
| 2 | judge_question | 8 / 32 | ✅ commit `eabff2ec` |
| 6 | contradiction_pursuit | 6 / 18 | ✅ commit `eabff2ec` |
| 3 | judge_evidence_combo | 6 / 12 | ✅ commit `3ae6667d` |
| **7** | **mediation** | **시안 보존, ScriptedText 등록 X** | ⏸️ **Cycle 4 narrative wrapper 영역** |
| **8** | **aftermath** | **(미수령)** | ⏸️ **Cycle 4 narrative wrapper 영역** |

**누적 적용**: 62 entry / ~162 variant.

## 🔄 GPT 재요청 시 형식 명세 (다음 cycle 또는 보강)

다음 cycle에서 본 사건 또는 다른 사건의 ScriptedText 작성 시 GPT에 전달할 정확한 형식:

```json
{
  "batch": N,
  "channel": "{채널명}",
  "entries": [
    {
      "key": "{실제 채널 형식 그대로}",
      "{disputeId 기반이면 disputeId, dossierCard 기반이면 dossierCardId, evidence 기반이면 evidenceId}": "{ID}",
      "{단계 영역: lieState 또는 lieBand 또는 depth 또는 tone}": "{값}",
      "stanceHint": "{deny|partial|truthful}",
      "truthLevel": "{none|partial|full}",
      "variants": [
        {
          "id": "{고유 ID}",
          "text": "{KO 텍스트}",
          "behaviorHint": "{행동 묘사}",
          "targetParty": "{a|b|both}"
        }
      ]
    }
  ]
}
```

GPT에 8 batch 분할 의뢰 시 **각 batch마다 본 형식 sheet를 reminder로 첨부** 권장 — context drift 영역 방지.
