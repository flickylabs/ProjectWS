# Thread-QW QA 요청 — spouse-01 ScriptedText 통합 보완 결과 깊은 검증

> **대상**: ClaudeCode 별도 스레드 (Thread-QW)
> **예상 작업량**: 50회 정도 (토큰 부담 영역)
> **역할**: **qualitative 깊은 검증** — 의미/맥락/보이스/9차원 매핑
> **분담**: Thread-Q (Codex)는 양적 자동 검증 (잘못 패턴/호칭/조사/lexeme/글자수). 영역 중복 X

---

## 작업 배경

`src/data/scriptedText/spouse-01.json` 통합 보완 완료:
- 기존 1,253 variants → **4,677 variants** (+3,432, 18 채널)
- 신규 4 채널: judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone
- 신규 차원: evidence_present의 investigationStage (126 신규 cells, 코드 활성화는 별도 작업)
- dossier 옵션 B (lieBand 차원 신설)
- mediation paths → entries 형식 변환

GPT Pro 8 세션 산출물 + 메인 자동 보정 83 patch + S8 toneCorrectionPatch 40 patch 적용. **메인 13 patch (judge_contradiction 7 + judge_question 2 + 명사형 2 + interrogation 1 + system_message 3)는 모두 보존** (단 system_message 3개는 S7에서 평서체 narrative로 재보정).

이제 신규 통합 결과의 깊은 정합성 검증 필요. 사용자: "꼼꼼하게".

---

## 절대 준수

- 활성 3건만 (spouse-01 / family-01 / friend-01) — `_LEGACY_*` 무시
- Agent 보고 무비판 수용 X — 데이터 직접 read 검증
- 잘못 패턴 #6 모범 ([memory: feedback_revision_meaning_over_form.md](C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_revision_meaning_over_form.md))
- 9차원 맥락: party × disputeId × lieState × emotion × rapport × contradict_token × q_type × tone × 시점
- 사건 정보 임의 작성 X (형/조카 호칭만, 박미라는 h-d3 친구)
- 필요 시 메모리 인덱스 [`MEMORY.md`](C:/Users/user/.claude/projects/d--ProjectWS/memory/MEMORY.md) 참조

---

## 50 작업 분담 (qualitative)

### A. 9차원 맥락 매핑 정합성 (10회)
1. interrogation S0~S2 일부 (party=a, disputeId=d-1) 5 entries spot-check — 박지연 victim_cosplay voice 보존 + Truth Throttle 위반 검출 (S0/S1에서 "위임장/삼천만원/이천만원" 단어 직접 사용 X 확인)
2. interrogation S3~S5 일부 (party=b, disputeId=d-2) 5 entries spot-check — 이준호 avoidant 자백 줄기 정합성
3. interrogation v6~v10 (S1 신규) 일부 sample — 기존 v1~v5와 의미 중복 X / 다양성 확보
4. evidence_present 기존 42 cells (subjectRole 키) sample — 기존 voice 보존
5. evidence_present 신규 126 stage cells sample — partyContext.{a,b}.questionAngle / investigationStages[stage].revealKey 정합
6. dossier 24 cells (lieBand 차원 신설) sample — early/mid/late별 NPC 응답 차이 (예: dc-1.b.q1 early vs late)
7. witness 9 cells × 10v sample — w-3 박미라 hiddenAgenda + pro_a 편향 정합 / w-2 hiddenAgenda
8. contradiction_pursuit h-d3/h-d4 신규 cells sample — atom 매핑 정합
9. interjection / emotional_overload h-d3/h-d4 신규 cells sample — severity / 감정 폭발 톤
10. trust_action / mediation 변환 sample — 신뢰 행동 / Phase 6 결정 톤

### B. 신규 4 채널 의미 정합성 (15회)
11~13. judge_evidence_combo 24 cells: 각 DossierCard 콤보 발동 멘트가 (a) name/description 의미 / (b) e-N 조합 단서 정확 명시 / (c) tone (soft/mid/hard) 차이 정합
14~16. judge_witness_summon 9 cells: 각 증인의 hiddenAgenda + addressJudge / sentimentToA 정합 / w-3 박미라 → "h-d3 친구이지 오피스텔 무관" 보존
17~19. rapport_milestone 6 cells: 임계점별 NPC 표현 (재판관에 대한 신뢰감 단계적 변화) — 박지연 victim / 이준호 avoidant voice 차이
20~22. contradict_milestone 6 cells: 토큰 임계점별 NPC 자기 평가 (1 / 2 / 3+ tokens) — 자기 진술 변화 인지 단계
23~25. 4 채널 모두에서 잘못 패턴 #6 (약한 단어 / 명사형 / 정보 추궁 / 추상 표현) 추가 검출

### C. 캐릭터 voice 깊은 검증 (10회)
26~30. 박지연 (victim_cosplay) verbalTells: victim_frame / helplessness / soft_confession이 적절히 분포. 5 채널 random sample (interrogation / evidence_present / dossier / contradiction_pursuit / aftermath)
31~35. 이준호 (avoidant) verbalTells: answer_delay / partial_scope / minimize_harm 분포. 5 채널 random sample

### D. 메인 13 patch 보존 + S7 system_message 재보정 검증 (5회)
36. judge_contradiction 7 patch 유지 확인 (judgec-d-1-soft-v2 등)
37. judge_question 2 patch 유지 (judgeq-d-1-empathy_approach-4-v1, v2)
38. interrogation 1 patch 유지 (b-h-d3-S5-fact-pursuit-v5)
39. 명사형 보정 2 patch 유지 (judgec-d-1-mid-v1: "가족을 돌본 것이라고", judgec-d-2-soft-v1: "가족을 도운 것이었다고")
40. system_message 3개 평서체 narrative 재보정 자연스러움 검증 (sys-evidence-new_unlock-v2 등)

### E. 통합 데이터 정합성 (10회)
41~43. evidence_present 두 키 패턴 공존 (기존 42 cells subjectRole 키 + 신규 126 cells stage 키) — 코드 호출 시 키 충돌 X 검증 (`scriptedTextLoader.ts:409-444`)
44~46. mediation 새 형식 (entries 8 × 10v) — 기존 paths.relatedDisputes 의미 보존 / d-3/베팅/공동통장 inconsistency 정정 (S7) 정합
47~48. evidence_discovery 12 cells × 1v 보존 (옵션 B로 폐기 명세이지만 데이터 보존) — 코드에서 호출되는지 확인 (`getScriptedEvidenceDiscovery`)
49~50. aftermath 5 resultClass narrative — anchorTruth + 책임 배분 (d-1: 25:75, d-2: 20:80, h-d3: 75:25, h-d4: 50:50) 정합 / 형/조카 호칭만 (실명 X)

---

## 보고 형식

각 작업 단위에 다음 표시:

```
### [번호] [제목]
- 검토 entries: [id 리스트 or count]
- 결과: ✓ 정합 / ⚠️ 보완 후보 / ❌ 위반
- 발견 사항: ...
- 권장 조치: (보완 후보면 patch 제안)
```

50 작업 후 종합 요약:
- 정합 N건 / 보완 후보 N건 / 위반 N건
- 핵심 발견 (3~5개)
- 다음 단계 권장 (있으면)

---

## 산출물

- `tmp/QA-QW-spouse-01-report.md` 또는 같은 형식 보고
- 보완 후보 patch 제안 (if any) → 메인이 적용 결정

종료 후 사용자에게 보고. 메인 (다른 ClaudeCode 스레드)에 직접 patch 적용 X — 사용자 결정 후.
