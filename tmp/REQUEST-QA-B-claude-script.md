# QA Thread B 의뢰 — 스크립트 중심 QA (Claude)

## 작업 목표
**3 사건 통합본의 모든 ScriptedText variants를 9차원 관점에서 의미/내용/맥락 검토**.

기술적 접근 X. 각 메시지의 의미, 내용, 의도, 맥락, 전후상황, 화자, 대상, 표현, 호칭, 존칭, 어법, 감정, 공개가능 정보, 쟁점 등 모든 부분 고려.

## 대상

### ScriptedText 통합본
- spouse-01: 4,677 variants / 18 channels
- family-01: 5,172 variants / 18 channels
- friend-01: 5,082 variants / 18 channels
- 총 **14,931 variants**

각 사건당 최소 100~200 variants 샘플링 (sequential + random).

## 9차원 검토 가이드

각 variant 검토 시 다음 9차원 모두 평가:

### 1. 의미 정확성 (가장 중요)
- 발화의 본질이 NPC의 인지 상태/사실 관계와 일치하는가
- 단순 어휘 교체로 끝나지 않고 9차원 맥락 살리는가
- 사용자 모범 4 patch 차원:
  - 인지 단계 약화 (확신 → 정황)
  - 정보 → 동기 추궁 (무엇 → 왜 그렇게 확신)
  - 추상 → 직접 행동 (흐리면 → 밝히지 않으면)
  - 명사형 → 동사형 (X 돌봄 → X을 돌본 것)

### 2. 화자 (Speaker)
- party (a/b) 캐릭터 archetype 일관 유지
- 재판관/시스템/증인 voice 차별화

### 3. 대상 (Listener)
- 재판관 / 상대 / 자기 (독백) / 시스템
- listener에 따른 호칭 / 어법 차별화

### 4. 표현 (Expression)
- 자연체 한국어 (번역체 9패턴 회피)
- 변수 치환식 X
- 사건 핵심 사실 본문에 녹임

### 5. 호칭/존칭
- 재판관 → "OOO 씨" (절대 "제 아내/남편" X)
- 당사자 → 재판관에 "재판관님"
- 당사자 → 상대 직접 (callTerms.toPartner)
- 당사자 → 재판관에게 상대 언급 (callTerms.toJudge)

### 6. 어법
- 합니다체 유지 (재판관 / 정중)
- 반말 (당사자 간)
- 해요체 예외 (emotional/confession beat)

### 7. 감정 (Emotion)
- emotion 단계 (defensive → confident → shaken → angry → resigned)
- emotional_overload / interjection 채널 = 격앙 표현

### 8. 공개 가능 정보 (Truth Throttle)
- lieState 단계별 정보 수준:
  - S0~S1: "해당 금액", "그 사람", "그곳"
  - S2: "200만원대", "김 씨", 약칭
  - S3+: 구체적 허용
  - S5: 전부

### 9. 쟁점 (Dispute / Issue)
- disputeId에 맞는 발화
- 다른 dispute 정보 혼입 X
- dossier 카드 unlock 시 해당 사실 정확

### α. 추가 차원
- 인지 변화 단계 ("확실 → 정황 해석 → 인정")
- NPC 마지막 발언 맥락 (직접 인용 X but 본질 정확)
- 추궁 차원 (정보 / 동기 / 책임 / 인지)
- archetype voice 무게 (victim_cosplay / avoidant 등)

## 사건별 핵심 검토 포인트

### spouse-01 — "새벽 통화기록"
- A 박지연 victim_cosplay: 강한 단정 + 수치심/불안 핑계
  - 검토: 강한 단정 톤이 archetype과 일치하는지
- B 이준호 avoidant: 모호어 (그 쪽 일이라, 좀 그래서)
  - 검토: 모호어가 NPC voice 보존되는지
- 사건 사실: 5,000만 원 증발 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 조작 / 투자 사기

### family-01 — "치매 어머니의 유서" ⚠️
- ⚠️ **유서 비율 검증 필수**: A 40 / B 60 (B가 자기 몫 90→60 줄임). 반대 패턴 발견 시 P0.
- A 윤태성 confrontational: 강하고 단정적, 공격적
- B 윤정후 affect_flattening: 침착, 평면적, 감정 드러내지 않음
- 사건 사실: 출생 비밀 / 20년 지원 / 어머니 일기장 / 공장 부도 / 1억 막음

### friend-01 — "손절한 절친"
- A 송다은 premature_summary: 빠른 결론, 확인 전 단정
- B 최수민 affect_flattening: 침묵, 사정 못 말함
- 사건 사실: 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / B 차마 못 말함 / 같은 패턴 반복

## 채널별 검토 가중치

| 채널 | 우선도 | 핵심 검토 |
|---|---|---|
| **judge_evidence_combo** | ★★★★★ | 변수 치환 패턴 (현재 기계적), 사용자 최우선 지적 |
| **judge_question** | ★★★★ | 자연체 + 다양성 |
| **judge_contradiction** | ★★★★ | 간접 인용 + 인지 단계 변화 |
| judge_witness_summon | ★★★ | 5 variants 다양성 |
| interrogation | ★★★ | NPC archetype voice / Truth Throttle |
| evidence_present | ★★★ | subjectParty/Role 일관 / 신규 stage cells |
| dossier | ★★★ | lieBand 단계 톤 / 사건 핵심 사실 |
| contradiction_pursuit | ★★ | 간접 인용 / archetype |
| witness | ★★ | 기관 증인 톤 / vague/partial/full 차별 |
| aftermath | ★★ | narrative 평서체 / 사건 결말 정확 |
| mediation | ★★ | 양측 균형 / 중재 톤 |
| trust_action | ★★ | trust 단계별 정보 노출 |
| system_message | ★ | 평서체 narrative / 직접 인용 X |
| 기타 채널 | ★ | spot check |

## 출력 포맷

### 산출물 1: `tmp/QA-B-script-report.md`

```markdown
# 스크립트 중심 QA 리포트 (Claude)

## 개요
- 검토한 variants: N건 / 14,931건 (X%)
- 채널별 분포
- P0/P1/P2 분류

## 사건별 핵심 발견

### spouse-01
- ⚠ P0 N건
- ⚠ P1 N건
- 보정 권장 패턴

### family-01
- ⚠⚠ 유서 비율 충돌 발견 시 → P0 우선
- ...

### friend-01
- ...

## 채널별 핵심 발견

### judge_evidence_combo (★★★★★)
- 변수 치환 패턴 N건
- 모범 보정 예시 (5~10건)

### judge_question (★★★★)
- ...

## 9차원 분석 (대표 5건)

### 사례 1: variant id `xxx`
- 화자: ...
- 대상: ...
- 9차원 평가:
  - 의미 정확성: ✗ (이유)
  - 호칭: ✓
  - ...
- 보정 제안: "..."
- 보정 차원: 인지 단계 약화 / 정보 → 동기 / ...
```

### 산출물 2: `tmp/QA-B-script-findings.json`

```json
{
  "totalReviewed": N,
  "p0": [/* 사건 설정 충돌 / 호칭 위반 / 합니다체 위반 */],
  "p1": [/* Truth Throttle / 잘못 패턴 #6 / 변수 치환 */],
  "p2": [/* 표현 다양성 부족 / archetype voice 약함 */],
  "patches": [
    {
      "channel": "judge_evidence_combo",
      "id": "xxx",
      "before": "...",
      "after": "...",
      "dimensions": {
        "의미": "변수 치환 → 구체 함의 본문",
        "표현": "사용자 모범 4 patch 적용",
        ...
      },
      "priority": "P1"
    }
  ]
}
```

## 잘못 패턴 #1~#8 회피

특히:
- #1 데이터 직접 read 검증 (sample 확인 후 보정)
- #6 9차원 맥락-의미 정확성
- #8 사건 설정 일치 검증

## 메모리 참조
- `memory/feedback_revision_meaning_over_form.md`
- `memory/feedback_judge_question_quality.md` — 재판관 질문 품질
- `memory/story_v2_confirmed_3cases.md`
- `memory/haeyo_policy_decision.md`
- `CLAUDE.md` — 한국어 품질 규칙
