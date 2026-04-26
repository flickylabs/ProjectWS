# Thread-QW (Codex Cross-Check) QA 요청 — spouse-01 ScriptedText 통합 깊은 cross-check + 통계 분석

> **대상**: Codex 별도 스레드 (Thread-QW를 Codex로 cross-check)
> **예상 작업량**: 100회 정도 (토큰 여유)
> **역할**: ClaudeCode가 수행한 Thread-QW의 **cross-check + 통계적 깊은 분석**
> **목적**:
> 1. ClaudeCode의 결과 (정합 24 / 보완 후보 1 / 위반 0 / 추가 발견 7건)를 다른 모델 시각으로 재검증
> 2. 잘못 패턴 #1 (Agent 보고 무비판 수용 X) — cross-check가 정확성 높임
> 3. 깊은 통계 분석 (trigram-overlap / 분포 / 일관성)으로 ClaudeCode가 sample 검토만 한 영역 정량 검증

---

## 작업 배경

`src/data/scriptedText/spouse-01.json` 통합 후 4,677 variants. 18 채널.

이미 완료:
- **Thread-Q (Codex 200회)** quantitative 자동 검증 — 카테고리 A~F 통과, G만 `tests/run-84-headless.cjs` 부재로 미실행
- **Thread-QW (ClaudeCode 50회)** qualitative 깊은 검증 — 정합 24 / 보완 후보 1 / 위반 0 / 추가 7건 (조사 오류 6 + 약한 표현 1)
- **메인 9 patch 적용 완료** (조사 6 + 부인 동사 2 + 약한 표현 1)

이제 Codex로 Thread-QW와 동일/유사 영역을 **cross-check** + **추가 50회는 통계적 깊은 분석**.

---

## 절대 준수

- 활성 3건만 (spouse-01 / family-01 / friend-01) — `_LEGACY_*` 무시
- Codex 직접 patch 적용 X — 메인 (Claude Opus) 검증 후 결정
- ClaudeCode가 이미 적용한 9 patch (위 목록)는 **현재 상태 정합 검증만** (다시 적용 X)
- 잘못 패턴 #6 모범 일관 적용 (단순 어휘 교체 X / 9차원 맥락-의미)

---

## 100 작업 분담

### Part A — ClaudeCode Thread-QW cross-check (50회)
ClaudeCode가 수행한 50회와 같은 영역을 Codex가 재검증. **결과가 일치하는지 / 다른 발견 있는지** 보고.

#### A.1~10 (10회): 9차원 맥락 매핑 정합성 cross-check
ClaudeCode 결과 (정합 9건 / 보완 후보 1건 = w-3 박미라 hiddenAgenda 영역)을 검증:
1. interrogation a/d-1/S0~S2 Truth Throttle (90 variants) — "위임장 / 3,000만 / 2,000만" 직접 언급 0건 재확인
2. interrogation b/d-2/S3~S5 자백 줄기 (27 samples) — ClaudeCode가 "false positive"로 판정한 2건 (`b-d-2-S5-fact-pursuit-v3`, `b-d-2-S5-motive-search-v2`) 재검증
3. interrogation v6~v10 다양성 — trigram-overlap 0.6 이상 듀프 0건 재확인 (cells: a|d-1|S1, b|d-1|S1, a|d-2|S1, b|h-d3|S1, a|h-d4|S1, b|h-d4|S1)
4. evidence_present 두 키 패턴 분포 — subjectRole 42 / lieBand 126 / 충돌 0 재확인
5. evidence_present 신규 stage cells (126) — early/mid/late 진실 노출 곡선 재확인
6. dossier 24 cells lieBand 차원 — `dc-1.b.q1|early` vs `late` trigram-overlap 0.11 재확인 + 다른 dossier cards (dc-2~dc-5) 동일 패턴 검증
7. witness w-3 박미라 (90 variants) — "오피스텔" 0건 재확인 + hiddenAgenda 정합 (h-d3 친구)
8. contradiction_pursuit h-d3/h-d4 신규 cells — S1~S4 voice 변화 정합
9. interjection / emotional_overload h-d3/h-d4 — severity 차이 정합
10. trust_action / mediation 변환 — 신뢰 행동 톤 / Phase 6 결정 톤

#### A.11~25 (15회): 신규 4 채널 의미 정합성 cross-check
ClaudeCode 결과 (모두 정합) 재검증:
11~13. judge_evidence_combo 24 cells — 각 DossierCard 콤보 발동 멘트 (e-N+e-M 단서 정확 / tone 차이)
14~16. judge_witness_summon 9 cells — hiddenAgenda + addressJudge 정합 / w-3 "h-d3 친구이지 오피스텔 무관"
17~19. rapport_milestone 6 cells — 임계점 (low_to_mid / mid_to_high / high_to_open)별 NPC 표현
20~22. contradict_milestone 6 cells — 토큰 임계점 (1/2/3+) 자기 평가 단계
23~25. 잘못 패턴 #6 (약한 단어 / 명사형 / 정보 추궁) 재검출

#### A.26~35 (10회): 캐릭터 voice 깊은 cross-check
26~30. 박지연 (victim_cosplay) verbalTells 분포 — Codex 통계 분석으로 5 채널 random sample (interrogation / evidence_present / dossier / contradiction_pursuit / aftermath)
31~35. 이준호 (avoidant) verbalTells 분포 — 5 채널 random sample

⚠️ ClaudeCode는 "박지연 helplessness markers 약점 4건" 발견. Codex가 이걸 정량 분석 (전체 박지연 entries 중 helplessness verbalTell 활성 비율)으로 재검증.

#### A.36~40 (5회): 메인 13 patch 보존 cross-check
36. judge_contradiction 7 patch 텍스트 정합 (judgec-d-1-soft-v2 등)
37. judge_question 2 patch (judgeq-d-1-empathy_approach-4-v1, v2)
38. interrogation 1 patch (b-h-d3-S5-fact-pursuit-v5)
39. 명사형 보정 2 patch (judgec-d-1-mid-v1, judgec-d-2-soft-v1)
40. system_message 3개 평서체 narrative (S7 재보정) 정합

#### A.41~50 (10회): 통합 데이터 정합성 cross-check
41~43. evidence_present 두 키 패턴 충돌 검증 (subjectRole 42 + lieBand 126 = 168 cells)
44~46. mediation 새 형식 (entries 8 × 10v) — `d-3/베팅/공동통장` 정정 (S7) 재확인
47~48. evidence_discovery 12 cells × 1v 보존
49~50. aftermath 5 resultClass narrative — anchorTruth + 책임 배분 (d-1: 25:75 / d-2: 20:80 / h-d3: 75:25 / h-d4: 50:50) 정합

---

### Part B — 추가 깊은 통계 분석 (50회)
ClaudeCode가 sample 검토만 한 영역을 **Codex의 통계 강점**으로 정량 검증.

#### B.51~60 (10회): trigram-overlap 전수 분석
51~52. interrogation 144 cells × 10v (1,440 entries) — 같은 cell 내 v1~v10의 trigram-overlap 행렬 계산. **0.6 이상 듀프** 발견 시 보고
53~54. evidence_present 168 cells × 평균 v — 같은 cell 내 variant 다양성
55~56. dossier 24 cells × 10v — early/mid/late 단계별 평균 trigram-overlap (낮을수록 진실 노출 곡선 명확)
57~58. judge 채널 4종 — 각 cell 내 5v trigram-overlap
59~60. mediation 8 cells × 10v — path별 자연 다양성

#### B.61~75 (15회): 캐릭터 voice 통계 분포
61~65. 박지연 (party=a) 전체 entries (interrogation + contradiction_pursuit + interjection + emotional_overload + trust_action 등) — verbalTells 키워드 활성 비율 (victim_frame / helplessness / soft_confession 각 분포)
66~70. 이준호 (party=b) 동일 분석 (answer_delay / partial_scope / minimize_harm)
71~73. callTerms 정합 — toJudge ("제 남편" / "제 아내") 분포 / toPartner ("자기") 분포 / angry ("이준호!" / "박지연!") 분포
74~75. 호칭 위반 ("부인" / 동사 "부인하다" 잔존) 전수 검출 — text 영역만 (behaviorHint 제외)

#### B.76~85 (10회): Truth Throttle 곡선 분석
76~78. interrogation S0~S5 단계별 — 금액 직접 언급 / 인물 실명 / 기관 정식명 분포 (각 lieState별)
79~81. evidence_present early/mid/late lieBand별 동일 분석
82~83. dossier early/mid/late별 동일
84~85. **Truth Throttle 위반** 전수 — S0~S2에서 금지 lexeme (위임장 / 삼천만원 / 이천만원 / 조카 / 형 / 오피스텔 실명 / 위임장 조작 / 투자 사기) 직접 언급 검출

#### B.86~95 (10회): 신규 4 채널 정량 분석
86~88. judge_evidence_combo 24 cells — 각 DossierCard 명시도 (e-N+e-M 키워드 포함률)
89~90. judge_witness_summon 9 cells — 증인 이름 / hiddenAgenda 키워드 분포
91~93. rapport_milestone — 신뢰감 키워드 ("믿음" / "안심" / "고맙" 등) 분포
94~95. contradict_milestone — 자기 평가 키워드 ("인정합니다" / "흔들렸다" / "회피" 등) 분포

#### B.96~100 (5회): 종합 통계 + 우선순위 권장
96. 4,677 variants 전체 글자수 분포 (히스토그램) — 가이드 (재판관 30~70 / NPC 40~80 / system 20~50) ±5자 편차 허용 후 큰 폭 초과/미달 entries
97. 채널별 평균 글자수 + 표준편차
98. tag 차원 정합성 통계 — 각 차원 (channel/speaker/listener/address/scope/...) 활성 비율 + 누락 분포
99. sourceRefs 정합성 통계 — atom / evidence / dispute 매핑 분포
100. **종합 권장 patch list** — Part A + Part B 발견 사항 통합 + 우선순위 (P0/P1/P2)

---

## 보고 형식

각 작업 단위 결과:
```
### [번호] [제목]
- 검증 entries: [count or sample]
- ClaudeCode 결과: ✓ / ⚠️ / ❌ (Part A에만 적용)
- Codex 결과: ✓ / ⚠️ / ❌
- 일치 여부: ✓ 일치 / ⚠️ 부분 일치 / ❌ 다른 발견
- 추가 발견: ...
- 권장 조치: (있으면)
```

100 작업 후 종합:
- ClaudeCode 결과와 일치율 (%)
- 추가 발견 (ClaudeCode 미발견)
- 통계 인사이트 (3~5개)
- **메인 적용 권장 patch list** (P0/P1/P2 우선순위)

---

## 산출물

- `tmp/QA-QW-codex-cross-report.json` (raw)
- `tmp/QA-QW-codex-cross-summary.md` (요약 + 권장 patch)

종료 후 사용자에게 보고. Codex 직접 patch 적용 X.

---

## 참고 자료

기존 QA 결과 (cross-check base):
- ClaudeCode Thread-QW 결과: `tmp/QA-QW-spouse-01-report.md`, `tmp/QA-QW-spouse-01-findings.json`, `tmp/QA-QW-spouse-01-audit.cjs`
- Codex Thread-Q 결과 (이전): `tmp/QA-Q-spouse-01-codex-summary.md`, `tmp/QA-Q-spouse-01-codex-report.json`, `tmp/QA-Q-spouse-01-codex-audit.cjs`

상위 명세 / 메모리:
- `gpt-pro-runs/judge-messages-v3/_master/assets-spouse-01/completion-spec-v2.md`
- `memory/feedback_revision_meaning_over_form.md` (잘못 패턴 #6, #7)
