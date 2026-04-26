# Thread-Q QA 요청 — spouse-01 ScriptedText 통합 결과 양적 자동 검증

> **대상**: Codex 별도 스레드 (Thread-Q)
> **예상 작업량**: 200회 정도 (토큰 여유)
> **역할**: **quantitative 자동 검증** — 잘못 패턴 / 호칭 / 조사 / lexeme / tags / sourceRefs / 글자수 일괄
> **분담**: Thread-QW (ClaudeCode)는 깊은 qualitative 검증 (의미/맥락/보이스). 영역 중복 X

---

## 작업 배경

`src/data/scriptedText/spouse-01.json` 통합 후 4,677 variants. 18 채널. 자동 검증 + 정량 보고 필요.

자세한 통합 내용은 [`tmp/QA-thread-QW-claudecode.md`](./QA-thread-QW-claudecode.md) "작업 배경" 참조.

---

## 절대 준수

- 활성 3건만 (spouse-01 / family-01 / friend-01)
- `_LEGACY_*` 폴더 결과 즉시 무시
- 자동 검출 결과는 메인 (Claude Opus) 검증 후 적용 결정 (Codex 직접 patch 적용 X)
- 잘못 패턴 #6 모범 적용 (단순 어휘 교체 X — 9차원 맥락-의미 정확성)

---

## 200 작업 분담 (quantitative)

### A. 잘못 패턴 #6 전수 자동 검출 (60회)
**자동 검출 후 Codex가 9차원 맥락 보고**:

1~10. **약한 단어 "쪽"** 전수 검출 (4,677 variants)
   - 정규식: `(\S+)\s*쪽으로(?!\s*마음이|\s*기울)` / `어느\s*쪽이(?!\s*더\s*컸)` / `쪽이었\b` / `쪽인\b` / `쪽은\b` / `쪽까지`
   - 채널별 분포 보고
   - NPC voice (회피/단정 화법) 보존 vs 진짜 약한 단어 구분 (lieState / archetype 고려)

11~20. **명사형 "X 돌봄/지원/처리/은폐/회피"** 전수 검출
   - "X 한/된/할/하/해/했" 동사형 제외
   - 사용자 모범 패턴 적용: "X 돌봄" → "X을 돌본 것" / "X 지원" → "X을 도운 것"
   - 단 명사구 일부 (다음에 명사 오는 경우 — "X 돌봄 정황", "X 지원 내역") 자동 변환 X 권장

21~30. **정보 추궁 "무엇을 알고/했는지"** vs **동기 추궁 "왜 그렇게"** 차원 검토
   - 모든 judge_question / judge_contradiction 채널 entries 점검

31~40. **번역체 9패턴** 검출 ("된 것으로 생각" / "인 측면이 있" / "부득이하게" / "사전 상의/협의" / "미리 말씀드리지 못한" / "특정 X" / "을 통하여" / "에 대해서" / "만을")

41~50. **추상 표현 → 직접 행동** 검토 ("그 단어로는" / "그것만으로" 류) 검출

51~60. **"X 것로/것을/것이"** 조사 오류 점검 (자동 보정 결과 검증) — 모든 patch 적용 결과 검증

### B. 호칭 + Truth Throttle (40회)
61~70. **"부인"** 단어 위반 전수 검출 (절대 금지) — 위반 entry 모두 보고
71~80. **재판관 발화 합니다체 검증** (judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon) — "~십시오 / ~합니다 / ~겠습니다" 일관성
81~90. **NPC 발화 callTerms 정합성**:
   - 박지연 (a) → 재판관에게 "제 남편이"
   - 이준호 (b) → 재판관에게 "제 아내가"
   - 양측 직접 호칭 "자기" / "이준호!" / "박지연!"
91~100. **Truth Throttle banned_lexemes 검증** (S0/S1 NPC 발화에서):
   - "삼천만원" / "3,000만원" / "3000만원" — 위반 entry 보고
   - "이천만원" / "2,000만원" / "2000만원" — 위반 entry 보고
   - "위임장" — S0/S1에서 NPC 직접 사용 위반 검출 (S2+, judge_*, aftermath, system_message는 OK)

### C. 키 패턴 + tags 정합성 (40회)
101~110. **interrogation 키 패턴** `{party}|{disputeId}|{lieState}|{questionType}` 정합 검증 (모든 144 cells)
   - party ∈ {a, b}, disputeId ∈ {d-1, d-2, h-d3, h-d4}, lieState ∈ {S0~S5}, questionType ∈ {fact_pursuit, motive_search, empathy_approach}
111~120. **evidence_present 두 키 패턴 공존 검증**:
   - 기존: `{party}|{evidenceId}|{lieBand}|{subjectRole}` (42 cells)
   - 신규: `{party}|{evidenceId}|{lieBand}|{stage}` (126 cells)
   - 키 충돌 X / 각 키 unique
121~130. **dossier 키** `{questionId}|{lieBand}` (24 cells, 8 question × 3 lieBand) — 정합 검증
131~140. **신규 4 채널 키 패턴**:
   - judge_evidence_combo: `{dossierCardId}|{tone}` (24 cells)
   - judge_witness_summon: `{witnessId}|{tone}` (9 cells)
   - rapport_milestone: `{party}|{threshold}` (6 cells)
   - contradict_milestone: `{party}|{token_count}` (6 cells)

### D. tags 차원 26개 (30회)
141~170. 모든 4,677 variants의 tags 26개 표준 차원 누락 점검:
   - channel / speaker / speakerRole / listener / listenerRole / address / scope / revealScope / register / honorific / audience / tense / relationship / judgeAddress / callTerm / counterpartyRef / mentionTarget / questionType / stance / emotion / continuity / reveal / revealGuard / disclosure / responseMode + (신규) rapport / contradict_token

### E. sourceRefs 정합성 (20회)
171~180. atoms-current.json (`src/data/claimPolicies/spouse-01-v2-atoms.json`) 의 atom id 매핑 정합 — 각 entry의 sourceRefs.atom이 실제 atom 존재
181~190. evidence id (`e-1` ~ `e-7`) / dispute id (`d-1`, `d-2`, `h-d3`, `h-d4`) 매핑 정합

### F. 글자수 가이드 (20회)
191~210. **글자수 ±5자 편차 허용** (재판관 25~75자 / NPC 35~85자 / system 15~55자) — 가이드 큰 폭 초과 entries 검출 (의도적 S5 confession 길이 예외 인정)

### G. 게임 헤드리스 시뮬레이션 (10회) — 선택
211~220. (선택) `tests/run-84-headless.cjs` 실행 — spouse-01 헤드리스 플레이스루 통과 검증. 새 데이터로 동작 정합 확인

---

## 보고 형식

각 검출 항목 결과를 표 또는 JSON 형식으로 일괄 보고:

```json
{
  "categoryA1": {
    "검출명": "약한 단어 쪽",
    "총 검출": N,
    "채널별": {...},
    "샘플": [
      { "id": "...", "text": "...", "matches": [...], "권장": "보존|보정" }
    ]
  },
  ...
}
```

200 작업 후 종합:
- 위반 카테고리 N건 / 검토 후보 N건 / 정합 N건
- **메인 적용 권장 patch list** (Codex가 직접 patch 적용 X — 메인이 결정)

---

## 산출물

- `tmp/QA-Q-spouse-01-codex-report.json` (자동 검출 raw)
- `tmp/QA-Q-spouse-01-codex-summary.md` (요약 보고)
- patch 권장 list → 메인 검토 후 적용

종료 후 사용자에게 보고. Codex 직접 patch 적용 X.
