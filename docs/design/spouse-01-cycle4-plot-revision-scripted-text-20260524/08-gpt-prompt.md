# 08. GPT Pro Prompt — h-d4 ScriptedText KO base 작성 의뢰

본 prompt를 GPT Pro에 그대로 전달하세요. 본 폴더의 모든 파일을 Projects File로 첨부한 상태여야 합니다.

---

## Prompt 본문

```
당신은 한국어 시나리오 라이터입니다. 본 의뢰는 법정 추리 게임 spouse-01 사건의 신규 hidden 쟁점 h-d4 ("비자금의 원래 목적") 영역 ScriptedText KO base 작성입니다.

## 사건 frame

- 사건 ID: spouse-01 "새벽 통화기록"
- A 박지연 (학원 데스크, 외도 의심하는 쪽, archetype: victim_cosplay)
- B 이준호 (가전매장, 알리바이 대는 쪽, archetype: avoidant)
- 신규 plot 본질: 비자금의 원래 목적 = 박지연의 난임 치료비 마련 (신혼 초기 진단 + 이준호 혼자 조사)
- 자세한 plot은 첨부 `01-context-and-plot.md` 정독 필수.

## h-d4 권위 정의

첨부 `02-case-authority-h-d4-full.md` — truthStages S0~S5 각 단계의 `admittedFact` / `allowedKeywords` / `forbiddenKeywords` / `answerFrame` / `transitionBeat`가 **절대 권위**입니다. 모든 NPC 발화는 해당 단계의 권위 영역을 따라가야 합니다.

## 작성 영역

첨부 `04-channel-entry-spec.md` — 8 batch (interrogation / judge_question / judge_evidence_combo / evidence_present / dossier / contradiction_pursuit / mediation / aftermath) × 약 78 entry. 각 entry당 2~3 variant.

## 절대 준수 정책 (위반 시 P0 회귀)

### 1. 진실 누설 금지 (첨부 `06-policies/feedback-truth-leak-prohibition.md`)

각 단계의 `forbiddenKeywords` 영역은 **절대 등장 X**. 특히:

- S0~S2 NPC 발화에서 **"난임 / 시험관 / 난임 치료비 / 출산 가능성 조사 / 의사 친구 비공식 상담"** 등 keyword 절대 X
- S3에서도 **"난임 진단 / 난임 치료비"** 절대 X (B는 "혼자 알아봄 / 의사 친구 상담 / 부담 회피"까지만)
- S4부터 "치료비" 등장 OK. S5에서 "난임 치료비" 명시 OK.

### 2. 진실 노출 정책 (첨부 `06-policies/design-spouse01-truth-disclosure-policy.md`)

기존 hidden keyword 영역 (가족 돌봄 / 개인회생 / 형사 절차)도 동일 정책 적용. 자백 단계(S4~S5) 외에 등장 X.

### 3. 호칭 자기시점 (첨부 `06-policies/feedback-family-address-speaker-perspective.md`)

- 이준호(B) 본인 발화에서 본인 가족 가리킬 때 **"시댁" 절대 X** (남편 본인이 자기 가족을 '시댁'으로 부르면 어색)
- 본인 가족 = "우리 집 / 우리 부모님 / 본가 / 우리 형 / 형네"
- 박지연(A) 본인 발화에서 본인 가족 가리킬 때 "처가" 절대 X → "친정 / 우리 엄마 / 우리 집"
- 재판관/시스템 발화는 "이준호씨 / 박지연씨" 권장

### 4. 자연 한국어 (첨부 `06-policies/feedback-natural-korean-precision-guide.md` + `feedback-natural-korean-npc-active-voice.md`)

- 추상명사 양극 대비 ("X와 Y가...") 회피 → 구체 키워드 활용
- "보입니다·느껴집니다" 직역체 회피 → 단정 표현 또는 단순 의문문
- 시적/생경 표현 회피 ("그 너머의 사정" 등) → 일상 구어
- 강조 부사 군더더기 회피
- 자기지시 회피 ("무엇을 두려워하셨는지" → "무엇이 두려우셨던 것인지")
- 격식 + 간결 균형

### 5. 캐릭터 archetype 자연성 (첨부 `07-character-frame.md`)

- A victim_cosplay: 피해자 위치 먼저, 동기 질문에 수치심·불안 핑계로 범위 넓힘
- B avoidant: 모호어로 시간 벌이, 한 박자 늦은 답, 큰 사실은 인정하되 가장 아픈 이유는 마지막까지 자름

## 출력 형식

각 batch별로 별도 JSON 파일로 출력:

```json
{
  "batch": 1,
  "channel": "interrogation",
  "entries": [
    {
      "key": "b|h-d4|S0|fact_pursuit",
      "party": "b",
      "disputeId": "h-d4",
      "lieState": "S0",
      "questionType": "fact_pursuit",
      "stanceHint": "deny",
      "truthLevel": "none",
      "variants": [
        {
          "id": "b-h-d4-S0-fact-pursuit-v1",
          "text": "비자금이라 부르긴 좀 그렇고, 그냥 따로 모아 둔 돈입니다. 사용처는 이미 말씀드렸다시피 형에게 갔습니다.",
          "behaviorHint": "한 박자 늦게 답한다. 말끝을 한 번 끊고 다음 문장을 잇는다.",
          "stageGate": "S0 forbiddenKeywords X 영역 확인됨 — 난임/시험관/아내 모르게 등장 X.",
          "naturalKoreanNotes": "avoidant archetype에 맞춰 모호어 + 한 박자 늦은 답 패턴 적용. '비자금이라 부르긴 좀 그렇고' 우회 표현으로 시간 벌이."
        },
        ...
      ]
    }
  ]
}
```

`tags` 영역은 작성 X — 기존 h-d3 entry의 tags를 그대로 복사하면 되므로 Claude main 적용 시 처리합니다. text + behaviorHint + stageGate + naturalKoreanNotes 만 작성하세요.

## 참고 자료 (Projects File)

- 첨부 `05-existing-samples/h-d3-channel-samples.json` — 기존 h-d3 entry sample (6 channel × 3~6 entry). 형식 + 톤 참고.
- 첨부 `05-existing-samples/dossier-samples.json` — dossier 채널 형식 참고.
- 첨부 `03-case-authority-e8-e9-dc8.md` — 신규 증거 + 단서 카드 정의 (Batch 4/5 작성 시 권위).
- 첨부 `07-character-frame.md` — 캐릭터 발화 frame.

## 작성 순서 권장

1. **Batch 1 (interrogation)** 24 entry — 가장 핵심. NPC 1인칭 발화 전체. truthStages 6단계 × 2 party × 2 questionType.
2. **Batch 5 (dossier)** 6 entry — dc-8 영역. case.ts에 정의된 텍스트가 권위 (polish만).
3. **Batch 4 (evidence_present)** 16 entry — e-8/e-9 제시 시 NPC 반응. 표면 외도 frame → 단계별 reveal.
4. **Batch 2 (judge_question)** 16 entry — 재판관 표면 질문.
5. **Batch 6 (contradiction_pursuit)** 6 entry — 단계 전환 영역.
6. **Batch 3 (judge_evidence_combo)** 6 entry — e-8+e-9 결합 부상 시 재판관 발화.
7. **Batch 7 (mediation)** 2 entry — h-d4 S4 단계.
8. **Batch 8 (aftermath)** 2 entry — h-d4 S5 단계.

각 batch를 별도 스레드로 시작해도 OK (병렬 3 스레드 패턴).

## 작성 시 self-check

각 variant 작성 후 다음 점검:
1. [ ] 해당 단계의 `forbiddenKeywords` 영역 등장 X
2. [ ] 호칭 자기시점 (B = "우리 집 / 우리 형", A = "친정") 위반 X
3. [ ] avoidant/victim_cosplay archetype 자연성 통과
4. [ ] 추상명사 양극 대비 / 시적 표현 / 직역체 회피
5. [ ] 격식 + 간결 균형
6. [ ] 자연 구어 + 한국어 발화 톤

## 작업 시작

본 prompt + 첨부 파일 모두 정독 후 Batch 1부터 시작해 주세요. 각 batch 완료 시 JSON 출력 + 자연성 self-check 결과 보고.
```

---

## 사용자 → GPT Pro 전달 방법

1. ChatGPT Projects에서 새 thread 또는 기존 spouse-01 project 사용
2. 본 의뢰서 폴더 전체를 압축하여 Projects File 영구 저장 (Cycle 1~3 패턴)
3. 본 `08-gpt-prompt.md`의 Prompt 본문을 thread에 그대로 전달
4. GPT가 Batch 1부터 작성 시작 → 사용자 spot check → 다음 batch

## 다음 단계 (GPT 작성 완료 후)

1. 사용자가 GPT 산출물 spot check + patch
2. 사용자가 Claude (CT 세션 또는 신규 세션)에 patch 전달
3. Claude가 `src/data/scriptedText/spouse-01.json` channels 영역에 정확 ID + tags + sourceRefs 영역 채워 등록
4. 검증: `npx tsc --noEmit` / `npm run -s qa:fast` / `node scripts/detect-truth-leak.cjs --strict`
5. commit + push origin/main
6. **Cycle 4 narrative wrapper 세션 진입** — 신규 entity narrativeTriggers 영역 작성 + emergence_narrative 채널 entry 작성 + 다국어 sync
