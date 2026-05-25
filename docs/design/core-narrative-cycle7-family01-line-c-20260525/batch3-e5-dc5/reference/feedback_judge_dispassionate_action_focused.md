---
name: feedback-judge-dispassionate-action-focused
description: 재판관 발화는 감정·가치 판단 회피하고 사실/행위/선후관계 중심. "선을 넘었다"·"흐름" 같은 평가 어휘 X, "먼저 연락"·"정황/선후관계" O. dossier label도 "누구" frame이 아닌 "행위/상황" frame.
metadata:
  type: feedback
  originSessionId: cycle7-friend01-lineAB-20260524
---

## 규칙

재판관(judge) 발화 영역 + dossier label naming에서:

1. **감정·가치 판단 어휘 회피** — 재판관은 사실 확인자이지 판단자가 아님 (사실 확정 전 단계)
2. **사실/행위/선후관계 중심 어휘 사용** — 누가/언제/어떤 행위
3. **dossier label** — "누구" frame이 아닌 "행위/상황" frame
4. **"관련"으로 중립 유지** — "반증/그 X" → "관련 X"

## 위반 vs 권장 어휘 사전

| 영역 | ✗ 위반 (감정·가치 판단) | ✓ 권장 (사실·행위) |
|---|---|---|
| 행위 평가 | "선을 넘은 메시지" | "먼저 연락한 메시지" / "먼저 보낸 메시지" |
| 인과 표현 | "흐름입니다" / "흐름이 보입니다" | "정황입니다" / "선후관계" |
| 자료 요청 | "반증 자료" (대립 frame) | "관련 자료" (중립) |
| 지시 대명사 | "그 메시지" / "그 자료" | "관련 메시지" / "관련 자료" |
| dossier label | "확인 없이 매도한 건 누구인가" (인격 추궁) | "단톡방 글의 근거" (행위·근거) |
| 단정 cascade | "낙인의 시작점이 정리됐으니" (가치 평가) | "앞서 [X]가 등재됐습니다. 관련 사실관계 확인이 필요합니다" |
| outburst catch | "그 글이 단정이었다는 인정으로 들립니다" | "그 글이 정확한 확인 없이 작성했다는 것을 인정하는 것처럼 들립니다" |
| 증인 호출 동사 | "호출하겠습니다" 단일 반복 | "호출하겠습니다" / "증인으로 모시겠습니다" / "확인해 보겠습니다" 다양화 |

## NPC 발화도 단정 어휘 완화

| ✗ | ✓ |
|---|---|
| "수민이가 또 내 남자한테 손댄다" | "수민이가 내 남자한테 손을 대서" |
| "그 사람이 먼저 보냈어" | "내가 아니야. 그 사람이 먼저 보낸거야." |
| "참았어야 했다" 같은 자책 단정 | "혼자 막아보려 했어" 같은 행위 인정 |

NPC도 단정형/완료형 회피하면 자연. 단, 격앙 emotional_outburst는 단정 톤 OK (캐릭터 dynamics).

## dossier label naming 정책

dossier (단서) label은 player가 직접 보는 짧은 frame. 행위·상황 중심:

| ✗ "누구" frame | ✓ "행위·상황" frame |
|---|---|
| 확인 없이 매도한 건 누구인가 | 단톡방 글의 근거 |
| 누가 먼저 잘못했는가 | 먼저 넘은 선 |
| 누가 거짓말하는가 | 진술의 정합성 |

`successConditionSummary` / `successEffects` / `noteText` 본문에는 "확인 없는 매도" / "단정" 등 평가 어휘 OK (analysis 영역). label만 frame 중립.

## Why

2026-05-24 friend-01 Cycle 7 (Line A+B) 2단계 사용자 피드백에서 명시:
> "'선을 넘은 메시지는 예비신랑 측이었고 수민씨가 거절한 흐름입니다'에서 '흐름'이라는 표현도 어색하고, 재판관이 선을 넘는다는 등의 감정적 판단을 하는 것도 적절하지 않아보여. 먼저 연락을 했다는 등의 내용으로도 충분하잖아."
>
> "dc-1 이름 자체를 변경하자. 이름 때문에 실제로도 누구인가에 집중하게 되는 것 같아. 정확한 확인 없이 섣부르게 올린 것일 수도 있다는 상황에 대한 내용 아니야?"

재판관이 emergence narrative에서 감정·가치 판단을 하면:
- 플레이어가 사건을 직접 추론하기 전에 게임이 답 frame 제공 → 추리 게임의 본질 훼손
- 후속 dispute truth 전개에서 frame 충돌 (재판관이 미리 결론 내림)

dossier label도 같은 이유 — "누구인가"는 추궁 답이 정해진 frame ("매도한 = A"). "단톡방 글의 근거"는 추궁 영역을 객관화.

## How to apply

### 작성 시점
- emergence narrative entry 작성 (cycle 4~5단계)
- dossier card label 신규 작성 (Core Case authority)
- judge 발화 영역 (`judge_*` channel, narrative trigger의 judge mention/cascade/judge_auto_mention)

### 작성 self-check
- [ ] 재판관 발화에 "선을 넘다" / "흐름" / "낙인" 등 가치 어휘 없는가?
- [ ] dossier label이 "누구/어느 쪽" 아닌 "행위/상황/근거" frame인가?
- [ ] 자료 요청에 "반증" / "그 X" 아닌 "관련" 중립 어휘 사용했는가?
- [ ] 증인 호출 동사가 단일 반복 아닌가? (호출/모시겠습니다/확인해 보겠습니다 등 다양화)

### 예외 영역
- dispute truth advance 직후 (S3+) 재판관 정리 발화 — 사실 확정 단계라 평가 어휘 OK
- `noteText` / `successConditionSummary` 본문 — analysis 영역, 평가 어휘 OK
- NPC outburst 발화 — 캐릭터 dynamics 단정 OK

## 관련 메모리

- [[feedback_judge_question_quality]] — 재판관 질문 quality (기계적 관찰문 금지, 간접 인용)
- [[feedback_natural_korean_npc_active_voice]] — NPC 적극 발화 5 차원
- [[feedback_new_dispute_evidence_narrative_justification]] — multi-trigger + 자연 narrative event
- [[design_core_narrative_cycle_procedure]] — 8단계 절차 (본 정책은 1~2단계 trigger 설계, 4~5단계 entry 작성에서 적용)
