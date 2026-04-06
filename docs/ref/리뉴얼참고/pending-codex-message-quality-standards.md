# [미전달] CT → Codex: 스크립트 품질 기준 확정 + 83건 확장 지시

> **상태: 아직 Codex에 전달되지 않음. 다음 CT 세션에서 전달 필요.**

> 발신: CT
> 수신: Codex
> 유형: 품질 기준 확정 + 대량 생성 착수 지시

spouse-01 파일럿 통합 완료. scriptedTextLoader + llmDialogueResolver 훅이 동작 상태이며, spouse-01은 LLM 0호출로 스크립트 응답이 나온다. 이제 나머지 83건 확장에 앞서 **GPT Pro 프롬프트에 반영할 품질 기준**을 확정한다.

---

## 1. 스크립트 품질 체크리스트 (전 채널 공통)

### A. 화자 정체성
- 캐릭터 archetype(6종: avoidant, confrontational, victim_cosplay, cold_logic, affect_flattening, premature_summary)에 맞는 말투/태도 일관성
- verbal tell(6종: over_precision, counter_question, timeline_padding, evidence_waving, motive_jump, selective_quote)이 3~4턴에 1회 자연스럽게 반영
- 직업/나이/성격에 맞는 어휘 수준
- 감정 상태(defensive→confident→shaken→angry→resigned)에 따른 톤 변화
- **같은 캐릭터가 lieState 진행에 따라 자연스럽게 변해야 함** (S0의 완강한 부정 → S3의 궁색한 변명 → S5의 무너진 자백)

### B. 호칭/경칭
- 재판관에게: 합니다체 필수 ("~입니다", "~습니다")
- 상대를 재판관에게 언급: callTerms.toJudge ("제 아내가~", "제 동생이~")
- 상대에게 직접: callTerms.toPartner ("자기야~", "형~")
- 격앙 시: callTerms.angry
- **한 문장 = 한 청자**: 재판관에게 말하면서 상대 호칭 섞지 않기
- **관계별 어법 차이**: 부부(반말↔존댓말), 직장(상하 존대), 친구(반말), 이웃(존댓말)

### C. 정보 통제 (Truth Throttle) — 가장 중요
- S0-S1: 금액 "해당 금액", 인물 "그 사람", 기관 "그곳", 시각만 허용
- S2: "~만원대", 성만 "김 씨", 약칭
- S3+: 구체적 허용
- S5: **반드시** 구체적 숫자 1개 이상 포함 (금전 사건), 실명, 정식 명칭 전부 공개
- **비금전 사건에서 금전 표현 완전 차단**: "돈", "송금", "이체", "계좌", "비용", "계약금", "임대인" 등 절대 금지
- **S0에서 말한 것을 S1에서 번복하지 않기** — 정보 해금은 단방향

### D. 맥락/일관성/개연성
- 같은 lieState에서 이전 턴과 모순되지 않는 내용
- 5 variants가 서로 **사실 관계는 동일**, 표현/각도/길이만 다름
- 증거 제시 시: 증거를 보고 **반응**하는 것이지, 증거 내용을 먼저 말하면 안 됨
- DossierCard: 결정적 질문에 대한 반응 — **플레이어보다 먼저 답을 주면 안 됨**
- 쟁점 간 정보 격리: 쟁점 A에서 밝힌 정보가 쟁점 B 응답에 자동으로 반영되면 안 됨
- **"진실은 플레이어가 직접 밝혀낸다"** 원칙 준수

### E. 질문 유형별 적합성
- fact_pursuit: 사실 여부에 대한 직접 답변 ("했다/안 했다"부터)
- motive_search: 동기/이유 설명 중심
- empathy_approach: 감정/심정 중심, 방어가 약화된 톤
- evidence_present: 증거에 대한 반응 (놀람/부정/인정 — lieState에 따라)
- trust_action: 신뢰 관련 반응

### F. 특수 상황
- **끼어들기**: callTerms.toJudge 사용, 감정 레벨(emotional_only/detail_rebuttal/trap_signal/misbelief_escalation)에 맞는 강도
- **증인 증언**: depth별 — vague(모호, 2문장), partial(부분, 3문장), full(구체적, 제한 없음). 기관 증인은 S2부터 full
- **감정 폭발**: 폭발 시점의 극적 대사, 이전 억눌렸던 감정 분출
- **모순 추궁**: 이전 발언 인용이 **정확**해야 하며, 재판관 시점(3인칭)으로 인용
- **후일담**: 판결 결과 반영, 3문단+이탤릭, 관계 변화 묘사

### G. 한국어 품질
- 번역체 9패턴 절대 금지: "~된 것으로 생각됩니다", "~인 측면이", "부득이하게", "인지하고 있습니다", "~에 기인", "해당 건에 대해서는", "~하는 바입니다", "관련 사항을 간과", "여러 가지 상황이 얽혀"
- 클리셰 금지: "사전 상의/협의" (S0-S2), "미리 말씀드리지 못한", "특정 X"
- "만을" → "만"
- 해요체 잔존 금지 (S4/S5 emotional/confession beat만 예외)
- **자연스러운 구어체** — 보고서 톤 절대 금지. 사람이 실제로 법정에서 하는 말투.

### H. 5 variants 간 품질
- 같은 의미를 **다른 각도/표현**으로 (단순 동의어 치환이 아닌 구조적 변형)
- 문장 길이/구조 다양화 (짧은 것 1개, 중간 2개, 긴 것 2개 정도)
- variant 유사도 80% 이하 (현재 validator D2 기준)
- 각 variant가 독립적으로 자연스러운 완결 문장
- **톤 스펙트럼**: 같은 상황에서도 차분한 버전 ~ 감정적 버전 포함

---

## 2. GPT Pro 프롬프트 보강 요청

spouse-01의 GPT Pro 프롬프트 (`docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md`)를 위 체크리스트를 **전부 반영**하여 보강해달라. 특히:

1. Truth Throttle 규칙을 프롬프트에 명시적으로 포함
2. 각 채널별 화자/청자/어법 규칙 구체 명시
3. variant 다양성 가이드 (톤 스펙트럼, 길이 분포)
4. 금지 패턴 목록 프롬프트에 직접 포함
5. 사건 데이터(JSON) + v2-atoms + callTerms를 프롬프트에 주입하는 구조

보강된 프롬프트로 spouse-01을 다시 생성하고 validator 통과 + D2 WARN 감소를 확인해달라.

---

## 3. Validator 의미적 검증 항목 추가 요청

현재 `tests/validate-scripted-text.cjs`는 형식 검증만 한다. 다음 항목을 추가해달라:

1. **Truth Throttle 정합성**: S0-S1 variants에서 구체적 금액/실명이 없는지
2. **S5 구체성**: S5 금전 사건 variants에 숫자가 1개 이상 있는지
3. **호칭 규칙**: 재판관 대상 합니다체 사용 여부
4. **비금전 오염**: 비금전 사건의 모든 variants에서 금전 키워드 미검출
5. **variant 간 사실 일관성**: 같은 key의 5 variants에서 핵심 사실(인정/부정)이 동일한지 (간이 체크)
6. **문장 수**: stance별 기준 문장 수 범위 이내인지

---

## 4. 83건 확장 실행 계획

보강된 프롬프트 + 강화된 validator로:

1. **spouse 나머지 11건** (spouse-02~12) 먼저 생성 + 검증
2. **family 12건** → friend 12건 → neighbor 12건 → partnership 12건 → tenant 12건 → workplace 12건
3. 각 카테고리 완료 시 validator 일괄 실행 + 결과 보고
4. CRITICAL/FAIL 0건이 카테고리별 통과 기준

### 배치 전략 (합의된 대로)
- 1 case × 1 channel family (interrogation-a, interrogation-b, evidence+dossier, witness+aftermath)
- 참고 대사: tests/transcripts에서 PASS/WARN only, fallback 제외

---

## 5. 회신 요청

1. 보강된 GPT Pro 프롬프트 v2
2. validator 의미적 검증 항목 추가 완료
3. spouse-01 재생성 결과 (D2 WARN 감소 확인)
4. spouse 11건 착수 가능 여부 확인
