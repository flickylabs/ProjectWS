---
name: feedback-family-address-speaker-perspective
description: NPC 1인칭 자기 발화 시 본인 가족 호칭에 제3자 시점 호칭(시댁/처가) 사용 X. 본인은 "우리 집/우리 가족/형/친정" 등 자기 시점 호칭 사용.
metadata:
  type: feedback
  originSessionId: cycle3-spouse01-affair-line-20260524
---

## 규칙

NPC 1인칭 자기 발화 영역에서, **본인 가족을 가리킬 때 제3자 시점의 친족 호칭(시댁/처가/시아버지/장인 등)을 사용하면 X.** 본인은 자기 시점 호칭으로 발화해야 자연.

| 발화 주체 | referent | ✗ 어색 (제3자 시점) | ✓ 자연 (자기 시점) |
|---|---|---|---|
| **남편 (이준호) → 본인 부모/형제** | 본인 부모 | "시댁" | "우리 집 / 우리 부모님 / 본가" |
| 남편 → 본인 형 | "시댁 형" | "형 / 우리 형 / 형네" |
| 남편 → 본인 조카 | "시댁 조카" | "조카 / 형 아이" |
| **아내 (박지연) → 본인 부모/형제** | 본인 부모 | "처가" | "친정 / 우리 엄마 / 우리 집" |
| 아내 → 본인 동생/자매 | "처가 동생" | "동생 / 우리 동생" |
| **제3자 (재판관) → NPC 가족** | 남편의 부모 | △ "시댁"(아내 시점 인용 시 OK) | "이준호씨 부모님 / 친가" |
| 아내의 부모 | △ "처가"(남편 시점 인용 시 OK) | "박지연씨 부모님 / 친정" |

**Why**: 2026-05-24 Cycle 3 사용자 지적:
> "남자가 본인 가족을 '시댁'이라고 언급하는게 매우 이상함"

"시댁"은 본질적으로 **아내 시점 호칭** (남편의 부모 집을 가리키는 며느리 입장 표현). 남편 본인이 "시댁 얘기"라고 말하면 자기를 객관화하는 묘한 어색함 발생 — 본인 가족인데 외부인처럼 부르는 격.

본 정책 위반 예시 (cycle 3 trigger 설계 v1 dc-2):
- ✗ B(이준호) 격앙: "시댁 얘기는 이제 그만 좀!"
- ✓ B(이준호) 격앙: "우리 집 얘기는 이제 그만 좀!"

**How to apply**:

### 발화 영역 식별
- NPC 1인칭 발화 영역 (interrogation / evidence_present / interjection / emotional_outburst / answer*)
  - 본인 가족 referent 시 자기 시점 호칭만 사용
- 제3자 발화 영역 (judge_* / dossier 시스템 narrator)
  - 외부 시점 호칭(시댁/처가) OK. 단 객관 표현("이준호씨 부모님" 등) 권장

### Surface 정책과 별도 영역
본 정책은 호칭 자연성. surface(친형/조카/회생 등) 등장 정책 ([[design_spouse01_truth_disclosure_policy]])과 별도 layer. 호칭만 자기 시점이어도 surface keyword가 노출되면 안 됨. 두 정책 모두 통과 필요.

### 작성 self-check
- NPC 본인 발화에서 "시댁/처가" 등장 → 즉시 자기 시점 표현으로 교체
- 재판관/시스템 narrator도 가능하면 인물 직접 호칭("박지연씨 / 이준호씨") 권장
- dossier noteText 등 시스템 영역도 "시댁 갈등 공포" 같은 표현은 narrator 시점 OK 

### Cycle 작업 시 검증
- 1단계 trigger 설계 시 각 NPC 발화 line에서 가족 호칭 사전 점검
- 5단계 검토 시 다른 NPC가 본인 가족을 외부 시점으로 부르는 영역 grep
- 8단계 사후 통합 시 외국어 번역에서도 동일 정책 적용 (다국어에 host-family/in-law 영역 구분 다를 수 있음 — Codex 의뢰서 명시)

## 관련 영역

- [[feedback_self_reference_speaker_context]] — 자기지시 "본인"의 발화 주체별 정밀 (유사 패턴 — 발화 시점에 따라 자연성 다름)
- [[design_spouse01_truth_disclosure_policy]] — surface 정책 (별도 layer)
- [[feedback_natural_korean_npc_active_voice]] — NPC 적극 발화 5 차원
