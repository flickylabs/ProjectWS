# Thread-QW (Claude) — 스크립트 중심 QA 200 tasks

## 작업 목표
**3 사건 통합본 모든 ScriptedText variants를 14차원 관점에서 의미/맥락/표현 깊이 검토**.
기술적 접근 X. 한국어 자연체로서 정확한 의미 / 맥락 / 화자-대상 관계 / 캐릭터 archetype voice / 사건 설정 정확성 / 사용자 모범 4 patch 적용도 모두 검토.

특히 **단순 기계식 표현, 의미를 알 수 없는 표현** 광범위 검출.

## 대상

### ScriptedText 통합본 (14,931 variants)
- spouse-01: 4,677 variants / 18 channels (`src/data/scriptedText/spouse-01.json`)
- family-01: 5,172 variants / 18 channels (`src/data/scriptedText/family-01.json`)
- friend-01: 5,082 variants / 18 channels (`src/data/scriptedText/friend-01.json`)

### Case Data (보조 참조)
- `src/data/cases/generated/{caseId}.json`

### 작업량 분배 (200 tasks)
- 사건당 60 tasks (3 × 60 = 180)
- 종합 비교 20 tasks
- **각 task당 5~30 variants 깊이 검토** (총 1,000~6,000 variants 검토 = 14,931의 7~40%)

---

## 14차원 검토 가이드 (각 variant마다 모두 평가)

### 1. **의미 (Meaning)**
- 발화의 본질이 정확히 전달되는가
- 의미를 알 수 없는 표현 / 모호한 표현 검출
- 단순 어휘 교체로 끝나지 않고 9차원 맥락 살리는가

### 2. **내용 (Content)**
- 사건 핵심 사실과 일치 (비율/금액/날짜/인물 관계)
- 누락된 핵심 정보 / 잘못된 사실 검출

### 3. **의도 (Intent)**
- 화자가 무엇을 의도하는가 (정보 / 동기 / 책임 / 인지)
- 의도가 발화에 명확히 드러나는가

### 4. **맥락 (Context)**
- 현재 lieState / emotion / rapport / contradict_token 단계와 일치
- 적절한 시점에 적절한 표현인가

### 5. **전후상황 (Before/After Flow)**
- 같은 cell의 5~10 variants 사이 흐름
- 다른 채널의 같은 cellKey 흐름 (interrogation S0 → S1 → S2 단계 변화)
- emotional_overload / interjection 발동 맥락 자연스러움

### 6. **화자 (Speaker)**
- party (a/b) 캐릭터 archetype 일관:
  - spouse-01: 박지연 victim_cosplay (강한 단정 + 수치심 핑계) / 이준호 avoidant (모호어, 회피)
  - family-01: 윤태성 confrontational (강하고 단정적) / 윤정후 affect_flattening (침착, 평면)
  - friend-01: 송다은 premature_summary (빠른 결론) / 최수민 affect_flattening (침묵)
- 재판관 / 시스템 / 증인 voice 차별화
- 증인은 신분 (오피스텔 경비 / 은행 직원 / 일반인 등)별 톤 차별

### 7. **대상 (Listener)**
- 재판관 / 상대 / 자기 (독백) / 시스템
- listener에 따른 호칭 / 어법 차별화
- callTerms.toJudge / toPartner 정합

### 8. **표현 (Expression)**
- 자연체 한국어 (번역체 9패턴 회피)
- **변수 치환식 X** (사용자 가장 강조 영역)
- 사건 핵심 사실 본문에 녹임
- **단순 기계식 표현 검출**:
  - "{NPC}, {X} 설명해 주십시오." 류
  - "이 자료들을 함께 보겠습니다."
  - "이 조합의 뜻은 분명합니다."
  - "더 미루지 마십시오."
- **의미를 알 수 없는 표현 검출**:
  - 본문이 너무 일반적 / 추상적
  - 두 번 읽어도 무슨 뜻인지 모르는 표현
  - 사건 맥락 없이는 이해 불가능한 표현

### 9. **호칭 / 존칭 (Address / Honorifics)**
- 재판관 → 당사자: "OOO 씨" (절대 "제 아내/남편" X)
- 재판관 → 증인: 실명 ("오피스텔 경비님" / "박미라 씨" 등). **"증인 씨" 절대 X**
- 당사자 → 재판관: "재판관님"
- 당사자 → 상대 직접 (callTerms.toPartner): "자기야" / "수민아" 등
- 당사자 → 재판관에게 상대 언급 (callTerms.toJudge): "제 아내가" / "제 형이" 등

### 10. **어법 (Grammar / Register)**
- 합니다체 유지 (재판관 / 정중한 진술)
- 반말 (당사자 간 직접 발화)
- 해요체 예외 (emotional/confession beat만)
- 종결 어미 / 조사 / 시제 정확

### 11. **감정 (Emotion)**
- emotion 단계 (defensive → confident → shaken → angry → resigned)
- emotional_overload / interjection 채널 = 격앙 표현
- archetype 톤 무게:
  - victim_cosplay: 수치심 / 불안
  - avoidant: 회피 / 모호
  - confrontational: 강한 단정
  - affect_flattening: 침착 / 감정 평면
  - premature_summary: 빠른 결론 / 후회

### 12. **공개 가능 정보 (Truth Throttle)**
- lieState 단계별 정보 수준:
  - S0~S1: "해당 금액", "그 사람", "그곳" (모호)
  - S2: 약칭 / 부분 노출
  - S3+: 구체적 허용
  - S5: 전부 공개
- 사건별 핵심 lexeme S0~S2 노출 X

### 13. **쟁점 (Dispute / Issue)**
- disputeId에 맞는 발화
- 다른 dispute 정보 혼입 X
- dossier 카드 unlock 시 해당 사실 정확

### 14. **인지 변화 단계 (Cognition)**
- 사용자 모범 patch 1: "확실 → 정황 해석 → 인정"
- "주장 → 의견" / "확신 → 정황 해석" / "오해 → 사정 → 자백"

### α. 사용자 모범 patch 4 (필수 적용 검증)
| Patch | 잘못 → 보정 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "{X} 돌봄/지원" → "{X}을 돌본/도운 것" (명사형 → 동사형) |

---

## 채널별 검토 우선순위

| 채널 | 우선도 | 핵심 검토 | 비중 |
|---|---|---|---|
| **judge_evidence_combo** | ★★★★★ | 변수 치환 패턴 0건 검증 + 두 증거 함의 본문 녹임 | 30 tasks |
| **judge_question** | ★★★★ | 자연체 + 5 variants 다양성 + 사용자 모범 적용 | 25 tasks |
| **judge_contradiction** | ★★★★ | 간접 인용 + 인지 단계 변화 + 사용자 모범 | 20 tasks |
| **judge_witness_summon** | ★★★ | 증인 실명 + 톤 다양성 | 15 tasks |
| **interrogation** | ★★★★ | NPC archetype voice + Truth Throttle + S1 v6~v10 보강 다양성 | 30 tasks |
| **dossier** | ★★★ | lieBand 단계 톤 + 사건 핵심 사실 (특히 family 비율) | 20 tasks |
| **evidence_present** | ★★★ | subjectParty/Role 일관 + 신규 stage cells 자연체 | 15 tasks |
| **contradiction_pursuit** | ★★ | 간접 인용 + archetype voice | 10 tasks |
| **witness** | ★★ | 기관 증인 톤 / vague/partial/full 차별 | 10 tasks |
| **aftermath** | ★★ | narrative 평서체 / 사건 결말 정확 (특히 family 비율) | 10 tasks |
| **mediation** | ★★ | 양측 균형 / 중재 톤 | 5 tasks |
| **trust_action** | ★★ | trust 단계별 정보 노출 | 5 tasks |
| **system_message** | ★ | 평서체 narrative / 직접 인용 X | 3 tasks |
| **emotional_overload** / **interjection** | ★ | 격앙 톤 archetype | 2 tasks |

---

## 사건별 핵심 검토 포인트

### spouse-01 — "새벽 통화기록"
- 박지연 victim_cosplay 강한 단정 톤 일관
- 이준호 avoidant 모호어 보존 (NPC voice — "쪽" 보존 영역)
- 사건 사실: 5,000만 원 증발 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기

### family-01 — "치매 어머니의 유서" ⚠️
- ⚠️ **유서 비율 검증 필수**: A 40 / B 60 (B가 자기 몫 90→60 줄임). 반대 패턴 발견 시 P0.
- 윤태성 confrontational 강한 단정
- 윤정후 affect_flattening 침착 평면 — 격앙 시도 차분함 유지
- 사건 사실: 출생 비밀 / 20년 지원 / 어머니 일기장 / 공장 부도 / 1억 막음
- 새 증인 이름: 최복순 / 김영수 / 박순애 (case data와 일치 검증)

### friend-01 — "손절한 절친"
- 송다은 premature_summary 빠른 단정
- 최수민 affect_flattening 침묵 / "악역이 되는 게 익숙해서가 아니라" 특유 톤
- 사건 사실: 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복
- **family 사건 fact 절대 혼입 X** (출생 비밀 / 유서 / 60:40 등은 family-01 영역)
- 새 증인 이름: 김세라 / 박준혁 / 오미경

---

## 출력 포맷

### 산출물 1: `tmp/qa-redo-20260426/QA-QW-claude-report.md`

```markdown
# Thread-QW Claude 스크립트 중심 QA 리포트

## 개요
- 검토 variants: N건 / 14,931건 (X%)
- 사건별 / 채널별 분포
- P0/P1/P2 분류

## 사건별 핵심 발견

### spouse-01
- ⚠ P0 N건 (사건 설정 충돌 / 호칭 위반 / 합니다체 위반)
- ⚠ P1 N건 (Truth Throttle / 변수 치환 / 잘못 패턴 #6)
- ⚠ P2 N건 (다양성 부족 / archetype voice 약함)
- 보정 권장 패턴 (대표 5건)

### family-01
- ⚠⚠ 유서 비율 충돌 발견 시 즉시 P0 보고
- ...

### friend-01
- ...

## 채널별 핵심 발견

### judge_evidence_combo (★★★★★)
- 변수 치환 패턴 N건 (0건 목표)
- 두 증거 함의 본문 녹임 정도
- 모범 보정 예시 (5~10건)

### judge_question (★★★★)
- 자연체 + 다양성
- 사용자 모범 4 patch 적용도

### ... (각 채널 보고)

## 14차원 분석 (대표 10건)

### 사례 1: variant id `xxx`
- 화자: ...
- 대상: ...
- 14차원 평가:
  - 의미: ✗ (사유)
  - 호칭: ✓
  - 표현: ✗ (변수 치환 잔존)
  - ...
- 보정 제안: "..."
- 보정 차원: 인지 단계 약화 / 정보 → 동기 / ...

## 잘못 패턴 #6 적용도 검증
사용자 모범 4 patch가 일관 적용됐는지 통계:
- patch 1 (인지 단계): 적용도 X%
- patch 2 (정보 → 동기): X%
- patch 3 (직접 행동): X%
- patch 4 (동사형): X%

## 단순 기계식 표현 / 의미 불명 표현 검출
- 변수 치환 잔존: N건
- 의미 모호 / 추상 표현: N건
- 두 번 읽어도 의미 불명: N건
- 사건 맥락 없이 이해 불가: N건
```

### 산출물 2: `tmp/qa-redo-20260426/QA-QW-claude-findings.json`

```json
{
  "totalReviewed": N,
  "by_case": {
    "spouse-01": {"reviewed": N, "p0": M, "p1": K, "p2": L},
    ...
  },
  "by_channel": { ... },
  "p0_patches": [
    {
      "channel": "...", "id": "...",
      "before": "...", "after": "...",
      "dimensions_failed": ["의미", "호칭"],
      "reasoning": "...",
      "priority": "P0"
    }
  ],
  "p1_patches": [...],
  "p2_patches": [...],
  "user_pattern_application": {
    "patch1_applied": N,
    "patch1_missing": M,
    "patch2_applied": ...,
    ...
  },
  "machine_pattern_detected": [/* 단순 기계식 표현 */],
  "ambiguous_meaning_detected": [/* 의미를 알 수 없는 표현 */]
}
```

---

## 잘못 패턴 #1~#8 회피

QA 자체에도 적용:
1. 데이터 직접 read 검증 (sample 보고)
2. 임의 보정 작성 X — 9차원 분석만
3. 다른 사건 정보 혼입 검출 시 P0
4. **검토만, 신규 작성 X**
5. 사용자 detail 메시지 = 항상 보완 방향
6. **9차원 맥락-의미 정확성 검토 깊이 우선**
7. 단순 확인 답변 X
8. **사건 설정 일치 검증 P0 우선**

## 메모리 참조
- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md`
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md`
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md`
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md`
- `CLAUDE.md` — 전체 가이드
- `memory/feedback_judge_question_quality.md` — 재판관 질문 품질
- `memory/haeyo_policy_decision.md` — 해요체 정책
