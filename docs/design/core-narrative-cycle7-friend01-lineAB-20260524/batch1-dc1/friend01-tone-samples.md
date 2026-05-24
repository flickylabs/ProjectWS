# friend-01 톤 reference (Cycle 7 emergence narrative 작성용)

본 문서는 friend-01 사건의 기존 ScriptedText에서 발췌한 톤·tag·캐릭터 voice reference. Cycle 7 emergence_narrative 신규 entry 작성 시 일관성 유지 reference.

## 사건 화자 voice 핵심 정리

- **A = 송다은 (원고, 31세, 온라인 쇼핑몰 CS)** — `premature_summary` archetype. 결론 먼저 선언, 맥락 후 끼워넣기. 결혼 앞 불안 / 친구 손절 트라우마. 발화 패턴: 단정 → 부연.
- **B = 최수민 (피고, 31세, 필라테스 강사)** — `affect_flattening` archetype. 감정을 평평하게 누른 채 사실만 나열. 침묵 frame. 가장 아픈 이야기에서 톤이 오히려 더 평평.
- **재판관** — 사실/행위/선후관계 중심. 감정·가치 판단 회피. 격식체 ("...십시오/...습니다").

## 호칭 정책 (자기 시점 권위)

- A → B: "수민이" (친근) / "수민 씨" (공식 자리)
- B → A: "다은이" (친근) / "다은 씨" (공식 자리)
- A 본인 가족: "우리 아빠" / "친정" (NOT 시댁/처가 같은 외부 시점)
- 재판관 → 양측: "송다은 씨" / "최수민 씨" / "수민 씨" / "다은 씨"
- 재판관 → 증인: "김세라 씨" / "박준혁 씨" / "오미경 씨"
- 권위: `feedback_family_address_speaker_perspective.md`

## 채널별 톤 sample (기존 entries 발췌)

## channel: interjection (NPC 끼어듦)

### key=a|d-1|minor (A 정중 끼어듦)
- **interject-a-d-1-minor-v1**
  - text: "잠깐만요, 재판관님. 연락이 이어진 사실까지 이유라는 말로 덮이면 안 됩니다."
  - hint: 정중하게 끼어들지만 결론부터 세운다.
- **interject-a-d-1-minor-v2**
  - text: "잠깐만요, 재판관님. 제 전 친구가 왜 그랬는지보다 제가 본 불안도 봐주셔야 합니다."
  - hint: 말을 고르려 하나 단정이 먼저 나온다.

### key=a|d-1|major (A 격앙 끼어듦)
- **interject-a-d-1-major-v1**
  - text: "재판관님, 저건 뒤늦게 이유를 붙이는 말입니다! 그때 제 눈엔 반복 연락만 남았습니다!"
  - hint: 분노를 눌러 보지만 문장 끝이 터진다.

### key=b|d-1|minor (B 정중 끼어듦)
- **interject-b-d-1-minor-v1**
  - text: "잠깐만요, 재판관님. 연락 횟수만으로 제 의도를 집착으로 정리하시면 안 됩니다."
  - hint: 낮은 목소리로 끼어들어 빠진 맥락을 세운다.
- **interject-b-d-1-minor-v2**
  - text: "잠깐만요, 재판관님. 제가 닿으려 한 이유가 있었고 그 이유가 빠지면 기록이 틀어집니다."
  - hint: 감정을 지운 채 필요한 단어만 꺼낸다.

## channel: judge_question (재판관 질문, depth 1~5)

### key=d-1|fact_pursuit|1 (재판관 사실 추궁 depth 1)
- **judgeq-d-1-fact_pursuit-1-v1**
  - text: "최수민 씨, 며칠 동안 이어진 연락이 무엇을 전하려던 것이었는지 먼저 말씀해 주십시오."
- **judgeq-d-1-fact_pursuit-1-v2**
  - text: "송다은 씨, 그 연락을 처음 본 시점과 반응을 정리해 주십시오."

### key=d-1|fact_pursuit|2
- **judgeq-d-1-fact_pursuit-2-v1**
  - text: "최수민 씨, 왜 송다은 씨가 아니라 예비신랑에게 먼저 연락했습니까."
- **judgeq-d-1-fact_pursuit-2-v2**
  - text: "송다은 씨, 연락 횟수 말고 집착이라고 본 근거가 더 있었는지 말씀해 주십시오."

## channel: judge_evidence_combo (조합 결과 재판관 query)

### key=dc-1.a.q1|soft (조합 직후 부드러운 질문)
- **judgecombo-dc-1.a.q1-soft-v1**
  - text: "연락 기록은 이어진 접촉을, 단톡방 캡처는 그 접촉이 바로 낙인으로 번진 과정을 보여줍니다. 송다은 씨, 확인 전에 결론을 세운 이유를 말씀하십시오."
- **judgecombo-dc-1.a.q1-soft-v2**
  - text: "전화와 문자 기록만으로는 목적이 보이지 않고, 단톡방에는 목적을 묻기 전 공개한 말이 남아 있습니다. 송다은 씨, 판단 과정을 설명하십시오."

### key=dc-1.a.q1|mid
- **judgecombo-dc-1.a.q1-mid-v1**
  - text: "연락 기록에는 연락 횟수만 남아 있고, 단톡방 캡처에는 송다은 씨가 그 횟수를 집착으로 해석한 과정이 남아 있습니다. 왜 집착이라고 단정하셨습니까."

### key=dc-1.a.q1|hard
- **judgecombo-dc-1.a.q1-hard-v1**
  - text: "연락 기록만으로 목적을 단정했고, 단톡방 캡처로 그 단정을 퍼뜨렸습니다. 송다은 씨, 책임을 답하십시오."

## channel: judge_witness_summon (증인 호출)

### key=w-1|soft (김세라 부드러운 호출)
- **judgewitness-w-1-soft-v1**
  - text: "김세라 씨를 부르겠습니다. 단톡방에서 누가 먼저 말했는지 듣겠습니다."
- **judgewitness-w-1-soft-v2**
  - text: "김세라 씨의 증언으로 단톡방 분위기와 최초 발언을 확인하겠습니다."

### key=w-1|mid
- **judgewitness-w-1-mid-v1**
  - text: "김세라 씨를 소환합니다. 본인이 동조한 부분까지 사실대로 말해야 합니다."
- **judgewitness-w-1-mid-v2**
  - text: "단톡방 최초 발언이 갈립니다. 김세라 씨의 직접 증언이 필요합니다."

### key=w-1|hard
- **judgewitness-w-1-hard-v1**
  - text: "김세라 씨, 들어오십시오. 단톡방에서 누가 먼저 낙인을 붙였는지 답하십시오."

## channel: emotional_overload (감정 폭발)

### key=a|d-1
- **overload-a-d-1-v1**
  - text: "…더는 바로 말씀 못 드리겠습니다. 그 연락을 떠올리면 제가 결론부터 낸 장면도 올라옵니다. (두 턴 후) …죄송합니다. 이어서 답하겠습니다."
  - hint: 감정이 한계까지 올라오자 결론형 말투가 잠시 무너진다.
- **overload-a-d-1-v2**
  - text: "…지금은 숨이 막힙니다. 제 전 친구와 예비신랑이 한 줄로 붙던 화면이 계속 생각납니다. (두 턴 후) …정리됐습니다. 말씀드리겠습니다."

### key=b|d-1
- **overload-b-d-1-v1**
  - text: "…그 연락을 집착이라고만 들으면 답하기 어렵습니다. 왜 우회했는지까지 꺼내야 합니다. (두 턴 후) …죄송합니다. 이어서 말씀드리겠습니다."
  - hint: 평평한 목소리를 유지하려 하지만 마지막 문장에서 숨이 꺾인다.
- **overload-b-d-1-v2**
  - text: "…잠깐만요. 기록만 남으면 제가 또 나쁜 사람으로 정리되는 느낌입니다. (두 턴 후) …정리했습니다. 계속하겠습니다."

## channel: contradiction_pursuit (모순 추궁 시 A/B 답변)

### key=a|d-1|S1
- **contra-a-d-1-S1-v1**
  - text: "그건 말을 바꾼 게 아닙니다. 며칠 이어진 연락을 저는 위험한 신호로 읽었습니다."

### key=a|d-1|S2 (부분 시인)
- **contra-a-d-1-S2-v1**
  - text: "확인하지 못한 부분은 인정합니다. 의도까지 확인하진 않았지만 결혼 앞의 불안이 판단을 밀었습니다."
- **contra-a-d-1-S2-v2**
  - text: "제가 다 본 건 아니었습니다. 직접 묻기 전에 연락의 모양만 보고 결론을 잡았습니다."

### key=a|d-1|S3 (S3 인정)
- **contra-a-d-1-S3-v1**
  - text: "네, 제 판단이 앞섰을 수 있습니다. 아홉 날 연락 자체가 문제라고 보며 경고 가능성을 밀어냈습니다."

## 공통 tag 예시 (기존 entries 기준)

- speaker / listener / address
  - 재판관 → 당사자: `channel:judge_question,speaker:judge,speakerRole:judge,listener:party,listenerRole:party,address:toParty`
  - 재판관 → 증인 호출: `channel:judge_witness_summon,speaker:judge,listener:witness,address:summon`
  - 당사자 끼어듦: `channel:interjection,speaker:a|b,speakerRole:party,listener:judge,address:toJudge`
  - 감정 폭발: `channel:emotional_overload,speaker:a|b,address:toJudge`
- register / honorific
  - 거의 모든 영역 `register:formal,honorific:formal` (법정 공식 자리)
- scope: 거의 `scope:all_present,revealScope:all_present`
- tense: `tense:present` (현재형 기본)

## Cycle 7 entry 작성 시 신규 tag

emergence_narrative channel 신규 entry는 다음 tag 패턴 추가:
- `channel:emergence_narrative` (신규)
- `trigger:cascade_from_card | combination_result | npc_interjection | emotional_outburst | judge_auto_mention` (trigger type)
- `priorCard:<dossierCardId>` (cascade trigger 한정)
- `emerge:<dc-X | e-X | w-X>` (대상 emergence id)
- 나머지 tag (speaker/listener/address/register/honorific 등)는 기존 패턴 그대로

## 진실 노출 정책 self-check

본 cycle (Line A+B) 영역에서 절대 노출 금지:
- `예비신랑이 먼저` / `선 넘는 메시지` / `최수민의 거절` — A 측 S0~S2 발화에 등장 X (d-2 S3 unlock 전, dc-2 fired 전)
- `아버지의 사기` / `투자 명목 사기` / `미상환` — 본 cycle 전 영역 등장 X (Line C / Cycle 8 영역)

재판관 발화·B 측 발화·증인 발화는 위 정책 영역에 직접 단어 등장 X. 우회 표현:
- "예비신랑 측 접근 경위" / "관련 메시지" / "선후관계" — OK
- "선을 넘는" 같은 평가 어휘 — X (재판관 영역)
