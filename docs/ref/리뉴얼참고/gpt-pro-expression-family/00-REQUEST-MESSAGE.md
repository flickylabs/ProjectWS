# GPT Pro 요청: family-01 ScriptedText 표현 개선

## 목적
family-01(치매 어머니의 유서) ScriptedText 번들의 **감정 깊이와 behaviorHint 품질**을 spouse-01 수준으로 개선.

## 작업 방식

이 파일은 **1.9MB / 1,186 entries / 약 48,000줄**로 매우 큽니다.
GPT Pro의 프로젝트 파일로 업로드한 후, **채널별로 나눠서 작업**하는 것을 권장합니다.

### 작업 순서

이 파일은 매우 크므로 **채널별로 나눠서 작업**하세요.

**Step 1**: `reference-spouse-01-quality-samples.json`을 읽고 품질 기준을 파악하세요.
**Step 2**: `family-01-scriptedtext-current.json`에서 **interrogation 채널(144 entries)**만 먼저 개선하세요.
**Step 3**: 완료되면 **evidence_present 채널(42 entries)**을 개선하세요.
**Step 4**: **dossier / witness / aftermath / system_message** 나머지 채널을 개선하세요.
**Step 5**: 모든 채널을 합쳐 **하나의 완성 JSON 파일**로 출력하세요.

각 Step이 끝날 때마다 "다음 채널 진행할까요?"로 확인하고 이어가세요.
한 번에 전체를 하면 누락될 수 있으니 **반드시 채널별로 나눠서** 진행하세요.

### 산출물
**동일한 JSON 구조를 유지하면서** text와 behaviorHint만 개선한 파일:
`family-01-scriptedtext-improved.json`

구조(key, channel, entry 수, variant 수)는 **절대 변경하지 마세요**. 변경 여부를 최종 산출물에서 자체 검증하세요.

## 첨부 파일

| 파일 | 용도 |
|------|------|
| `family-01-scriptedtext-current.json` | **작업 대상** — 현재 ScriptedText 번들 전체 |
| `reference-spouse-01-quality-samples.json` | **품질 기준** — spouse-01에서 추출한 채널별 샘플 (개선 완료 상태) |
| `ref-family-story.md` | 스토리 설계 (쟁점/증거/LieState/캐릭터/증인) |

## 개선 기준

### behaviorHint 개선 (최우선)
**Before** (현재, 약함):
> "숨을 길게 고르고 꾹 눌러 말한다."

**After** (목표, spouse-01 수준):
> "숨기던 약점을 마지못해 내놓으며 시선이 흔들린다. 공격자의 가면 뒤에 약점이 보이는 순간."

**규칙**:
- 1~2문장, 30~60자
- **감정 맥락** + **비주얼 연출** 조합
- 단순 동작("고개를 숙인다")이 아니라 **내면 상태가 드러나는 묘사**
- lie state에 맞는 감정 곡선 반영:
  - S0: 완전 방어/부정 → 경직, 단호, 눈 마주침
  - S1~S2: 일부 인정 → 시선 회피, 말 끊김, 손 동작
  - S3: 핑계/전가 → 목소리 변화, 방어적 자세
  - S4: 감정적 → 눈물/분노/체념이 섞임
  - S5: 자백 → 힘이 빠진 목소리, 체념, 솔직함

### text 개선 (필요한 경우만)
- 번역체 제거: "~된 것으로 생각됩니다", "부득이하게" → 자연스러운 구어체
- "특정 X" 패턴 → 구체적 표현
- 감정이 단조로운 variant → 같은 의미를 다른 감정 각도로

### 캐릭터 톤
- **A 윤태성** (confrontational): 공격적, 단정적, 희생 강조. "내가 어머니를 모시고 살았는데..."
- **B 윤정후** (affect_flattening): 감정 억제, 짧은 문장. "... 유서를 건드린 적 없습니다."
- 재판관 대상: 합니다체 / 당사자 간: 반말

### 금지
- 쟁점별 Truth Throttle 위반 (S0~S2에서 구체적 금액/실명/기관명 노출 금지)
- key 구조 변경 (key, channel, entry 수, variant 수 유지)
- variant id 변경
