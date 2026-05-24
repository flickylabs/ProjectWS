---
name: feedback-self-reference-speaker-context
description: "자기지시 정책 발화 주체별 정밀화. 제3자 → NPC 본인 자연 / NPC 1인칭 자기 발화에서 본인 매우 어색. 발화 주체 명시 구분."
metadata:
  type: feedback
  originSessionId: 20260527-evidence-naturalization-multi-batch
---

## 정책

한국어 자기지시 ("본인" / "자신") 사용은 **발화 주체별 명확 구분** 필요.

| 발화 주체 → referent | "본인" | "자신" |
|----------------------|--------|--------|
| **제3자 (재판관 등) → NPC** | ✓ 자연 (정책 부합) | △ 통일 권장 (본인으로) |
| **NPC 1인칭 → 자기** | ✗ **매우 어색** | △ 일부 영역 자연 |
| 자연한 자기 발화 | "저 / 제" | "저 / 제" |
| 예외 (의도된 격식) | △ 캐릭터 톤 | △ 추상 책임 표현 |

**Why**: 사용자 피드백 (2026-05-27): "'본인'은 제3자가 상대에게 상대 스스로에 대한 일을 말할 때는 적절한 경우가 많아. 그런데 자기 자신을 말할 때는 또 '본인'이 매우 어색한 말이 돼."

→ 이전 정책 ([[design_self_reference_bonin_consistency]])의 "본인 우선"이 **발화 주체에 따라 적용 영역 다름**. 모든 영역에 무조건 본인 X.

**How to apply**:
- 채널/영역별 발화 주체 식별:
  - **judge_*** 채널 (judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon) = **재판관 발화** → "본인" 자연
  - **evidence_present / interrogation / interjection** 채널 = **NPC 1인칭 자기 발화** → "본인" 회피, "저/제" 자연
  - **dossier / aftermath** 채널 = 혼합 또는 시스템 (case별 확인)
- 분석 시 "본인" hit 카운트 → **발화 주체별 분류 후 판단**. 단순 hit 수치로 통일 대상 결정 X.

## 학습 영역

2026-05-27 spouse-01 judge_evidence_combo 어색 분석 시 "본인" 34 hits를 통일 대상으로 잘못 분류 → 사용자 정정 ("발화 주체별 구분이 가능한지").

실제 정확한 분석:
- judge_* 채널 본인 등장 57 hits = **모두 재판관 발화 = 정책 부합** (통일 X)
- judge_* 채널 "자신" 등장 = 0 hits ✓ (직전 세션 통일 완료)

## 자가 점검 체크리스트

분석 스크립트 작성 시:
1. 본인 hit이면 자동 어색 분류 ✗
2. 발화 주체 (channel/party) 사전 확인
3. NPC 1인칭 자기 발화 영역에서만 본인 어색 대상

GPT 의뢰서 작성 시 "자기지시 정책" 영역 명시:
- 재판관 발화: "본인" 보존 OK
- NPC 자기 발화: "본인 / 자신" 사용 X → "저 / 제" 자연

## 관련 영역

- [[design_self_reference_bonin_consistency]] — 본인 통일 정책 기본 (제3자 영역)
- [[feedback_natural_korean_npc_active_voice]] — NPC 적극 발화 5 차원
