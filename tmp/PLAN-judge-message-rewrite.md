# 재판관 메시지 전체 재작성 — 작업 계획서

> 사용자 요청: "재판관 메시지가 죄다 엉망진창이야. 전체 재작성을 진행해줘."
> 메모리 정책: `feedback_llm_script_policy.md` — "후일담만 LLM. 나머지 스크립트 단독"

---

## 🎯 목표

활성 3 사건(spouse-01 / family-01 / friend-01)의 **재판관 발화** 및 **NPC 응답**을 LLM/atom 폴백 없이 **사건별 ScriptedText 데이터**로 100% 커버.

---

## 📊 현재 구조 (개선 전)

```
[handleQuestion → resolveAndApply 흐름]
1. ScriptedText 우선 (사건별 데이터)
2. 데이터 부재 시 → LLM 호출 (gpt-4o)
3. LLM 폴백 시 → atom 조합 + buildFallbackLine

[사용자가 본 결함]
- 박지연 모순인데 이준호 호명 (target 라우팅 누락 — 코드 픽스됨)
- "가족 돌봄" truth 누설 (스크립트 entry 자체 결함)
- "네, 제가 전부 본 건 아니었습니다…" (시스템 atom 조합)
- 같은 메시지 반복 ("말씀해 주십시오" 패턴)
```

**근본 원인**: ScriptedText 데이터 커버리지 부족. 부재 시 LLM/atom 폴백으로 떨어짐 → 어색한 발화.

---

## 🗂️ 필요한 ScriptedText 채널

### 재판관 발화

| 채널 | key 패턴 | 분량/사건 | 비고 |
|---|---|---|---|
| `judge_question` | `${disputeId}\|${questionType}\|${depth}` | 4 dispute × 3 type × 3 depth × 2 party = **72** | target party variant 분리 (B1·B2 픽스) |
| `judge_contradiction` | `${disputeId}\|${tone}` | 4 dispute × 3 tone × 2 party = **24** | 직전 코드 픽스로 target 라우팅 추가됨 — 데이터 보강 필요 |
| `judge_evidence_response` | `${evidenceId}\|${disputeId}` | 평균 8 evidence × 4 dispute = **32** | 증거 제시 후 재판관 멘트 |
| `judge_mediation_intro` | `phase6` | 4 (양측 책임 / 일방 책임 / 미해결 / 자백) = **4** | Phase 6 진입 멘트 |
| `judge_verdict_open` | `phase7\|${stage}` | 4 stage × 2 party = **8** | 판결 단계별 멘트 |

**합계**: 72 + 24 + 32 + 4 + 8 = **140 entries / 사건**

### NPC 응답 (당사자 발화)

| 채널 | key 패턴 | 분량/사건 |
|---|---|---|
| `contradiction_pursuit` | `${disputeId}\|${party}\|${lieState}` | 4 × 2 × 6 = **48** |
| `npc_response_question` | `${disputeId}\|${party}\|${lieState}\|${questionType}` | 4 × 2 × 6 × 3 = **144** |
| `npc_response_evidence` | `${evidenceId}\|${party}\|${lieState}` | 8 × 2 × 6 = **96** |
| `npc_emotional_outburst` | `${party}\|${trigger}` | 2 × 6 = **12** |

**합계**: 48 + 144 + 96 + 12 = **300 entries / 사건**

---

## 📦 총 분량

| 사건 | 재판관 | NPC | 합계 |
|---|---|---|---|
| spouse-01 | 140 | 300 | **440** |
| family-01 | 140 | 300 | **440** |
| friend-01 | 140 | 300 | **440** |
| **총계** | 420 | 900 | **1320 entries** |

각 entry는 30~80자 텍스트 + behaviorHint + targetParty/lieState/tone tags.

---

## 🔄 진행 옵션

### 옵션 A — GPT Pro 의뢰 (권장)

**분량**: 1320 entries — 사람이 직접 작성 시 ~40시간. GPT Pro로는 사건당 1~2 세션.

**절차**:
1. **의뢰 패키지 준비** (이번 사이클 가능):
   - `gpt-pro-runs/judge-messages-v2/` 폴더 신규
   - `01-types.md` — 채널별 타입 정의
   - `02-spec-{caseId}.yaml` — 사건별 spec (캐릭터 정보 + truth 보호 + archetype 톤 + 채널별 분량)
   - `03-channel-templates.md` — 채널별 작성 가이드 + 예시
   - `04-lint-rules.md` — R1~R7 + 추가 규칙 (호명 / target party / truth / 글자수 / archetype 부합)
   - `05-tone-guide.md` — 재판관 합니다체 / NPC archetype별 패턴
   - 각 사건 폴더 `session-{caseId}/` + README.md (GPT 작업 지시서)

2. **사용자 GPT Pro 3 세션 동시 실행** (V2 데이터 의뢰 패턴과 동일)

3. **산출물 받으면 Claude lint + 한국어 보정 + 적용**:
   - 백그라운드 Agent 3개 병렬 (V2 검수 패턴 재사용)
   - `src/data/scriptedText/{caseId}.json`에 채널별 entries 추가

4. **빌드 + dev 검증**

**예상 사이클 수**: 의뢰 패키지 1 + 의뢰/검수 1~2 + 적용/검증 1 = **3~4 사이클**

---

### 옵션 B — 메인이 spouse-01 우선 시도

**spouse-01 재판관 메시지(140 entries)만 메인이 직접 작성** → 패턴 확립 후 family/friend GPT Pro로.

**장점**: 패턴 정밀 통제. 사용자 의도 100% 반영.
**단점**: 시간 소요. 컨텍스트 부담.

---

### 옵션 C — 부분 적용 (가장 시급한 결함만 우선)

사용자가 본 구체적 결함부터 부분 보강:
1. spouse-01 `judge_contradiction` 채널 24 entries (코드 픽스로 target 추가됨, 데이터만 채우면 호명 정확)
2. spouse-01 `contradiction_pursuit` 48 entries (NPC 응답 — "네 제가 전부 본 건…" 같은 atom 조합 폴백 제거)

**총**: 72 entries / spouse-01 만. 다른 채널은 LLM/atom 그대로.

---

## 🎨 톤 가이드 핵심

### 재판관 발화 (모든 채널 공통)
- **합니다체** 필수
- **호칭 정확**: "박지연 씨" / "이준호 씨" (절대 "제 아내/남편" 사용 금지)
- **간접 인용**: 긴 NPC 발언 직접 인용 금지 → 요약 ("아까는 ~쪽으로 말씀하셨는데")
- **기계적 관찰문 금지**: "태도에 변화가 감지됩니다" 등 시스템 톤 X
- **Tone 단계** (`judge_question`): soft (정리 요청) / mid (추궁) / hard (단호)

### NPC 발화 (archetype별)

| Archetype | 패턴 |
|---|---|
| `victim_cosplay` (박지연/송다은) | 감정형, 피해자 자기연출, "제가 얼마나~" |
| `avoidant` (이준호/윤정후) | 얼버무림, 회피, "그건…/요즘은…" |
| `confrontational` (윤태성) | 직설, 공격, "분명히 ~입니다" |
| `cold_logic` (최수민) | 냉정, 거리감, "사실관계만~" |

### LieState 부합

| LieState | 발화 패턴 |
|---|---|
| S0~S2 | 부정/얼버무림/모호한 변명 (truth 키워드 0) |
| S3~S4 | 부분 인정 + 책임 전가 |
| S5 | 자백 본문 (truth 키워드 직접 노출 OK) |

---

## 🚨 핵심 제약 (기존 V2 lint 규칙 재사용)

- **R1**: spoilerLevel ↔ lieState 정합 (safe ↔ S0~S2 / partial ↔ S3~S4 / full ↔ S5)
- **R2**: banned_lexemes_safe 단어 safe 등급 노출 금지 (사건별 spec yaml의 truth 보호 목록)
- **R3**: 단일 화자 (NPC 응답은 해당 party만)
- **R4**: 글자수 (재판관 30~60 / NPC 40~80)
- **R5**: 호명 일관성 (재판관 → callTerms 정확)
- **R6**: target party tag 정합 (judge_question/contradiction은 a/b 분리)
- **R7**: archetype 부합 검증

---

## 🎬 다음 단계 (사용자 결정)

1. **(A) GPT Pro 의뢰 패키지 작성 시작** — 이번 사이클에서 패키지 작성 (3 사건 × 1.3K entries)
2. **(B) 메인이 spouse-01 시도** — 작은 단위로 시작, 패턴 확립
3. **(C) 부분 적용** — spouse-01 judge_contradiction + contradiction_pursuit만 (가장 시급)
4. **(D) 다른 결함 우선** — UI 결함이 더 시급하면 후순위

권장: **(A) — V2 데이터 의뢰 패턴이 R1~R7 PASS로 검증됨**. 같은 패턴으로 재판관/NPC 메시지도 의뢰 → 검수 → 적용. 3 사건 동시 진행 가능.

진행 신호 주시면 즉시 의뢰 패키지 작성 시작.
