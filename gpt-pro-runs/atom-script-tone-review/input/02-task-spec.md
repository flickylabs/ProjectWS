# Task Spec — ScriptedText 톤 적합성 검토

## 검토 대상 발화 단위

각 source JSON의 `scriptedText` 배열 entry 1개 = 검토 1건. 총 4,109건.

## 판정 등급

각 발화를 다음 3등급으로 분류:

| 등급 | 의미 | 설명 |
|---|---|---|
| ✅ pass | 문제 없음 | 캐릭터·stage·감정 단계에 부합. 정정 불필요 |
| ⚠ warn | 약한 결함 | 자연스럽지 않거나 톤이 살짝 어긋남. 가벼운 정정 권장 |
| ❌ fail | 명백 결함 | 캐릭터 입장과 정면 충돌, 시스템 말투, 인물 어긋남, 재판관에게 답 요구 등. 정정 필수 |

목표: ❌/⚠ 발화에 대해 **정정 제안 텍스트** 제공.

## 검토 6축

### 축 1: 인격 일관성 (Persona Fit)

- 화자의 stance(deny/hedge/blame/emotional/confess)와 발화 톤이 일치하는가?
- 화자의 archetype(victim_cosplay / avoidant / confrontational 등)에 부합하는가?
- 03-character-context.md의 "naturalTone" 가이드와 어긋나지 않는가?

**❌ 사례**: 외도 의심자(분노·추궁) 캐릭터가 회피·변명 톤으로 답함

### 축 2: 감정 단계 (Emotion Tier)

- `emotion` 필드 값과 발화의 감정 강도가 일치하는가?
  - `guarded` / `defensive` → 절제·방어 톤
  - `shaken` / `cornered` → 흔들리고 방어가 무너지는 톤
  - `resigned` → 체념·자백 톤
- 격앙 단계인데 차분한 분석 톤은 ❌

### 축 3: Stage 맥락 (Stage Context)

- `path`에서 추론 가능한 stage(1/2/3)와 발화 내용이 부합하는가?
- stage 1: 진위 확인 (간단 답변·인정/부인) / stage 2: 맥락 추궁 (방어·해명) / stage 3: 의도 규명 (자백/변명/책임 전가)
- 03-character-context.md의 "Stage 확장" 정보 참조

### 축 4: 호칭·발화 방향

- 재판관 대상이면 "재판관님" 사용, 합니다체
- 상대 직접 호칭 시 callTerms.toPartner 사용
- 재판관에게 "제 아내/제 남편" 사용 OK, 직접 이름 호칭 ❌
- **재판관에게 답을 요구하는 표현 금지** — "재판관님, ~ 알려주십시오 / 말해줄 수 없습니까?" 같은 형태 ❌

### 축 5: 번역체·기계어 차단

다음 패턴 ❌:
- "~을 수 있겠습니다", "~답니다" (시스템 말투)
- "혼란과 불안으로 가득 차" (번역체 감정 표현)
- "의미가 정확히 무엇을 뜻하는지" (의미·뜻 중복)
- "자기를 보호하려는" (자기 → 스스로)
- "사전 상의/협의" (S0~S2 금지 + 일반적으로도 어색)
- "특정 X" 패턴 (특정 금액·특정 사람 → 그 금액·그 사람)
- "부득이하게", "불찰", "인지하고 있습니다", "관련 사항을 간과" 등 격식체

### 축 6: Truth Throttle (진실 공개 곡선)

- S0~S1 발화에서 구체적 금액·실명·정식 기관명이 나오면 ❌ (lieState 정보가 path에 추출되어 있지 않을 수 있음. tags의 `reveal` 필드 참조)
- S5 발화에서 구체 정보가 빠진 일반 진술은 ⚠
- `reveal: none` → 구체 정보 X / `reveal: full` → 모두 공개 OK

## 출력 형식

사건별 별도 JSON 파일로 산출.

```jsonc
// output/proposals-spouse-01.json
{
  "caseId": "spouse-01",
  "summary": {
    "total": 1245,
    "pass": 1180,
    "warn": 45,
    "fail": 20
  },
  "items": [
    {
      "id": "a-e-2-late-other-v5",
      "verdict": "fail",
      "axes": ["persona_fit", "stage_context"],
      "originalText": "재판관님, 경비나 문자까지 이어서 보면 답이 나올 수 있겠습니다. 이 주소 하나로는 설명이 모자랍니다.",
      "issue": "외도 의심자(A) 캐릭터인데 시스템 말투('~수 있겠습니다')로 답하며 추궁의 단호함이 부재. evidence_present 단계에서 확신을 가진 의심자가 약한 톤으로 답하는 것이 어색.",
      "suggestion": "재판관님, 경비실 기록과 문자를 같이 보면 더 명확해집니다. 이 주소 하나만으로 끝낼 일이 아닙니다.",
      "rationale": "화자의 입장(외도 확신·단호)과 stage 맥락(증거 제시 → 추가 단서 제안)에 부합. 시스템 말투 제거."
    },
    {
      "id": "...",
      "verdict": "warn",
      "axes": ["translation"],
      "originalText": "...",
      "issue": "...",
      "suggestion": "...",
      "rationale": "..."
    }
    // ✅ pass 항목은 출력에 포함하지 않음 (목록만 비대해짐)
  ]
}
```

## 항목별 필수 필드

- `id`: source의 발화 ID 그대로
- `verdict`: "fail" | "warn"  (pass는 출력 제외)
- `axes`: 결함 축 배열 (`persona_fit` | `emotion_tier` | `stage_context` | `address_direction` | `translation` | `truth_throttle`)
- `originalText`: 원본 그대로
- `issue`: 결함 한 줄 요약
- `suggestion`: 정정 텍스트 제안 (한국어 자연스럽게)
- `rationale`: 정정 근거 1~2줄

## 정정 텍스트 작성 가이드

1. **자연스러운 한국어** — 번역체·격식체 회피, 일상 회화체 우선
2. **캐릭터 인격 보존** — naturalTone 유지
3. **원본 정보 보존** — 발화의 핵심 정보(언급된 사실·증거)는 유지하되 표현만 교체
4. **길이 비슷하게** — 원본보다 크게 길어지거나 짧아지지 말 것
5. **호칭·존대 일관** — `address: toJudge`이면 합니다체 / `toParty`이면 관계 톤
6. **응답 방향** — 재판관에게 답을 요구하지 말 것

## 검토 누락 방지

- 모든 entry를 검토 (sampling 금지)
- ✅ pass 항목도 내부적으로 판정 후 결과만 미출력 (summary에 카운트 반영)
- 모호하면 ⚠ warn 처리 후 issue 명시

## 컨텍스트 분할 시 처리

source 파일이 너무 크면:
1. 한 사건 안에서 channel별 분할 처리 (interrogation → evidence_present → dossier 순)
2. 각 partial 결과는 동일 형식으로 작성, 마지막에 통합
3. summary는 마지막 단일 결과에서 합산

## 사용자(개발자) 후속 작업

GPT Pro 산출물 → CT(Claude Code)에서 한국어 추가 보정 → ScriptedText JSON 직접 수정 → dev 검증 → 커밋.
