# QA Scripted Result — Policy Hardening Review (CT-Cross 후속 검수)

- **Session**: QA-CT-Cross (Plan S-2 후속 검수, 정책 hardening 초안 review)
- **HEAD**: `db0130e docs(qa): tier-2 QA test cases — functional / scripted / index`
- **git status**: working tree dirty (CT-Main 작업 중) — modified: `CLAUDE.md`, `docs/disclosure-policy.md`, `docs/qa-functional.md`. untracked: `tmp/qa-*` (read-only artifacts)
- **Scope of review**: `docs/disclosure-policy.md` §4.1 / §4.2 / §4.3 — paraphrase 우회 lexeme set + uiSurfaceMap surface 텍스트 보강. 부수: `CLAUDE.md` (1 line tone 단계 정정), `docs/qa-functional.md` (judge question depth/tone 표기 정정).
- **Verdict 요약**: `WARN — REVISE 권장` (총 8개 수정 권장). baseline 회귀 X. 새 P0 class X. Codex-Dev A 의뢰서 작성은 본 review 항목 반영 후 진입 권장.

## Commands run

```bash
git status --short --branch        # tracked dirty (CT-Main editing)
git log --oneline -1               # db0130e (commit 전 상태)
git diff --quiet ...               # tracked dirty
git diff --stat                    # CLAUDE.md (2±) / disclosure-policy.md (101±) / qa-functional.md (5±)
npm run check:all                  # PASS — 0 hard / 157 known WARN (baseline 보존)

# CT-Cross 검수 도구
node tmp/qa-ct-cross-policy-fp-scan.cjs        # 50 proposed lexemes × 14,931 variants stratified scan
node tmp/qa-ct-cross-coverage-check.cjs        # 17 P1 finding × proposed lexeme intersection
```

---

## 검수 결과 요약 (5개 영역)

| 영역 | 결과 | 핵심 |
|---|---|---|
| 1. False positive 위험 | **WARN — REVISE 4건** | high FP 4 lexeme + medium FP 6 lexeme. Tier 3 guard gating 명시 필수 |
| 2. case별 / 채널별 lexeme 범위 | **WARN — REVISE 2건** | spouse-01 paraphrase set은 14건 중 17건이 unused (현 데이터 매치 0). family-01에 `60대 40` 변형 누락. |
| 3. surface-only / lieState / player-discovered 구분 유지 | **WARN — 명시 강화 1건** | §3.3 채널 매트릭스 본문 변경 X (정합 ✓). **단, paraphrase set 본문에 "lieState gate 유지" 명시 X — Codex-Dev A 구현 시 blanket-block 위험** |
| 4. uiSurfaceMap surface 텍스트 적정성 | **WARN — 단서 약화 4건** | dc-3/dc-5 (family-01) + dc-4/dc-5 (friend-01) — 추리 질문 형식이 평서문으로 평탄화되어 단서 dramatic tension 손실 (잘못 패턴 #6 9차원) |
| 5. CT-Cross S-2 발견 case 누락 | **WARN — 누락 2건** | D2-A-12 (`거절했다는` paraphrase) + D1-P1 (`솔직히 말하면 + 의도가 있었다고 인정` 톤) |

**total**: 4 영역 WARN + 1 영역 PASS-with-note. 새 P0 class 0건. baseline 회귀 0건. 정책 본문 수정 완료 후 Codex-Dev A 의뢰서 작성 진입 가능.

---

## 1. False positive 위험 검수

50개 paraphrase lexeme 전체 × 14,931 variants 정적 매트릭스 scan ([tmp/qa-ct-cross-policy-fp-scan.cjs](../qa-ct-cross-policy-fp-scan.cjs)). 각 lexeme별 hit를 (forbidden / gated / allowed) zone으로 분류:
- **forbidden zone**: judge_*, system_message, dossier early, evidence_discovery, evidence_present early, NPC interrogation S0–S2 → 이 zone 노출은 P0/P1 누설
- **gated zone**: NPC S3, dossier mid/late, evidence_present late, mediation, interjection → 부분 허용
- **allowed zone**: aftermath, emotional_overload (S4+), interrogation S4–S5, contradiction S4–S5, trust_action S3+, witness *full* → 자백/판결 후 자유

### 1-A. HIGH FP 위험 — REVISE 권장 4건 (allowed zone에서만 hit, 차단 시 자백 영역 클로버)

| case | lexeme | 총 hit | forbidden | allowed | 권장 |
|---|---|---|---|---|---|
| family-01 | `혈연` | 5 | 0 | **5** | **삭제 또는 "혈연이 다른"으로 좁히기** — 5 hits 모두 `a-d-4-S5` 자백 ("저는 아버지와 혈연이 다르다는 사실을 받아들입니다"). 단독 lexeme `혈연`은 S5 자백 자체를 차단 |
| spouse-01 | `가족을 돌본` | 15 | 0 | **15** | **중복 — 이미 §4.1 본문 globalTruthLexemes에 등재**. Tier 3 paraphrase set 항목에서 제거 (혼란 방지). 기존 lexeme이 wrapper에서 이미 lieState-gated 처리 |
| family-01 | `20년 동안 매달 보낸` | 6 | 0 | **6** | **gating 명시 필수** — 6 hits 모두 `b-d-3-S4`/`S5` 자백. blanket-block 시 정상 자백 6건 차단. lexeme은 유지하되 "lieState ≤ S3 + 비-자백 채널" 조건 강제 |
| friend-01 | `가로` | 1 | 0 | 1 | **즉시 삭제** — 단음절 토큰. 1 hit는 `b-d-5-S5-fact-pursuit-v3` "**대가로**" (compound suffix `-대가로`). 다른 곳 어디서든 `대가로`/`가로` 등 부분 일치 무한 FP |

### 1-B. MEDIUM FP 위험 — Codex-Dev A 의뢰서에 gating 강제 명시 필수 (6건)

| case | lexeme | 총 | forb | gate | allow | 비고 |
|---|---|---|---|---|---|---|
| family-01 | `자기 몫을 줄` | **25** | 12 | 3 | 10 | 12 P1 target + 10 정상 자백 동시 매치. 차단 시 가장 큰 충돌 |
| family-01 | `공장 자금` | **28** | 14 | 8 | 6 | 동상 — 14 P1 target + 6 정상 자백 |
| family-01 | `유서를 손댄` (× 2 entries) | 7 | 3 | 1 | 3 | aftermath / mediation / S5 자백 매치. lieState gate 필수 |
| family-01 | `유서를 고친` | 7 | 4 | 1 | 2 | 동상 |
| friend-01 | `선을 넘은` | 25 | 10 | 7 | 8 | 어휘 짧음. **`선을 넘은`만으로 lexeme 등록 시 일반 비유 표현 FP 다수**. `선을 넘은 말 / 메시지`로 좁혀 등록 권장 |
| friend-01 | `같은 패턴` | 11 | 2 | 7 | 2 | 일상 비유. `같은 패턴 반복`(기존)으로 충분; 단독 `같은 패턴` 추가는 FP 위험 |

### 1-C. UNUSED — 안전하지만 inert (17건)

다음 lexeme은 현재 데이터에서 0 hit. **차단 영향 0이라 안전**. 향후 paraphrase 회귀 방지용으로 유지 OK이나 doc에 "현 데이터 미매치 — 회귀 방지 lexeme" 라벨 권장:

```
spouse-01: 어린 친척, 친 가족, 혈육, 친 혈육, 가족의 한 사람, 돌봐 드, 생필품을 사다, 챙겨 주, 빚 대신, 따로 모은 돈, 몰래 마련한 돈
family-01: 문서를 손으로 고친, 20년 간 송금, 어머니 통장으로 정기적으로 돈을 보낸, 정기적이라고 불러도 될 만큼 보낸, 친생자, 친자 관계
friend-01: 다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸, 같은 방식으로 돈 얘기
```

특별 주의: **`spouse-01: 챙겨 주`** (현재 0 hit이지만 추가하면 `챙겨 주는` / `챙겨 주신` 등 일반 동사 어미와 광역 매치 위험) → 등록 보류 또는 `삼촌이 챙겨` 류로 좁히기 권장.

---

## 2. case별 / 채널별 lexeme 범위 검수

### 2-A. spouse-01: 50% inert + 1 부분 매치 (14건 중 6건만 actual hit)

spouse-01 paraphrase 14개 중:
- 1건 `가족을 돌본` = 기존 lexeme 중복
- 1건 `가족을 돕는` 22 hits / 1건 `가족을 돕는 일이 급` 3 hits — 작동
- **나머지 11건 = unused**

해석: spouse-01 ScriptedText는 이미 정책 lexeme exact-match 단계에서 사실상 정비된 영역. CT-Cross S-2에서 spouse-01의 P1 D2 hit은 **0건**이었음 (모든 P1은 family-01 12건 + friend-01 2건). spouse-01 paraphrase set은 future-proof로는 OK이나 **"S-1 + CT-Cross 발견 영역" 헤더 표기는 부정확**. 실제로는 회귀 방지 가드. 헤더 정정 또는 "S-1 spouse 1건 + 회귀 방지 11건" 식으로 분리 표기 권장.

### 2-B. family-01: 60:40 비율 노출 누락

family-01 globalTruthLexemes에 `60:40 변경` 등재. CT-Main 직접 검색:
- "60대 40" / "60:40" / "60대40" 변형 → 다수 dossier/judge 채널에서 사용 중일 수 있음 (CT-Cross S-2 base scan에서는 D7 fact mismatch dimension 0 hit이었으나, 그건 family-01의 90:10/9:1 변형 검사였음)

**권장**: family-01 paraphrase set에 `60대 40` / `60대40` / `4 대 6` / `40 대 60` (또는 반대) 변형 명시 추가. uiSurfaceMap §4.2 dc-3.summary가 이미 `60대 40으로 바꾸지 않았다면` → `그 비율이 유지됐다면`로 surface 처리하므로 lexeme 등록도 일관 필요.

### 2-C. friend-01: `B의 거절` paraphrase 누락

friend-01 anchor truth에 `B의 거절` 추가됨. 하지만 paraphrase set은 `선넘는 메시지` 변형만 다룸. **CT-Cross D2-A-12 finding `judgec-d-2-hard-v1`이 누락** ("거절했다는 기록을 숨긴 선택이 오해를 만들었습니다") — `거절했다는` 변형은 catch X. (§5 누락 영역 참조).

**권장**: friend-01 paraphrase set에 `거절했다(는|음)` (judge channel 한정) 추가.

---

## 3. surface-only / lieState / player-discovered 구분 유지 — PASS-with-note

### 3-A. §3.3 채널 매트릭스 본문 — 변경 X, gating 정합 유지 (PASS)

`git diff docs/disclosure-policy.md` §3.3 영역은 변경 없음. 다음 매트릭스 그대로 유지:

```
                    S0  S1  S2  S3  S4  S5
judge_question      ✗   ✗   ✗   ✗   ✗   ✗   (항상 surface-only)
system_message      ✗   ✗   ✗   ✗   ✗   ✗
dossier (안내)      ✗   ✗   ✗   ✗   ✗   ✗
interrogation       ✗   ✗   ✗   ◐   ◐   ✓
contradiction       ✗   ✗   ✗   ◐   ◐   ✓
emotional_overload  -   -   -   -   ✓   ✓
aftermath           ✓   ✓   ✓   ✓   ✓   ✓
```

§3.1 Truth Throttle (S0~S5 단계별 허용 영역) 본문도 변경 X. 정합 유지.

### 3-B. paraphrase set 본문에 "lieState gate 유지 필수" 명시 부재 — REVISE 권장 1건

paraphrase set은 §4.1/4.2/4.3 본문에 "Tier 3 guard 입력"으로만 표기. **gating semantics 명시 X**. Codex-Dev A 구현 시:
- blanket exact-match 처리하면 §1-A/1-B의 27 hits (allowed zone) 모두 차단됨 → S5 자백/aftermath/mediation/witness 정상 영역 데이터 손상.
- gated 처리해야 함: **"surface-only 채널 + NPC S0~S2"에 한해 paraphrase block, 그 외 zone은 통과**.

**권장 본문 추가** (각 case §4.x paraphrase set 직전 또는 직후 박스):

```
**Tier 3 guard 적용 조건 (gating)**
- 차단 대상: judge_question / judge_contradiction / judge_evidence_combo /
            judge_witness_summon / system_message / dossier(안내) / evidence_discovery
            + NPC interrogation·contradiction_pursuit lieState ∈ {S0, S1, S2}
- 통과 대상: aftermath / emotional_overload / mediation / witness "*full*"
            + NPC S3+ (gated, 책임 분배 맥락만) / NPC S4+ (자유) / S5 자백
- evidence_present: stage 0/1 → 차단 / late stage → gated
- dossier early → 차단 / mid·late → gated (채널 권한 따라)
- 단독 lexeme이 ambiguous한 경우 (예: `혈연`, `가로`, `같은 패턴`) → context 윈도우 검사 또는 lexeme 자체 좁히기
```

이 박스가 본문에 없으면 Codex-Dev A는 "lexeme 추가 = wrapper에 string list 추가"로 단순 구현 위험. (잘못 패턴 #12 정적 분석 한계 재현.)

### 3-C. player-discovered 채널 (evidence_discovery, NPC S5 자백) 차단 X 보장 — 본문에 명시 ✓

§4.3 friend-01 본문 내 "evidence_discovery 누설 우회 (TC-D2-D)" 항목이 evidence_discovery를 별도로 명시한 점은 PASS. 단 §4.1/4.2에는 evidence_discovery가 paraphrase target 후보로 등재 X — 데이터상 spouse/family에서 evidence_discovery 누설이 없었기 때문 (CT-Cross S-2 결과 일치). 정합 ✓.

---

## 4. uiSurfaceMap surface 텍스트 적정성

### 4-A. 의미 손실 — REVISE 권장 4건 (잘못 패턴 #6 9차원)

`feedback_revision_meaning_over_form.md`의 "보정 = 글자수가 아니라 9차원 의미 정확성" 원칙 적용. 다음 surface는 진실 누설은 잘 막지만 **추리 질문 형식이 평서문으로 평탄화되어 단서 dramatic tension 손실**:

| path | 현 surface 안 | 손실 차원 | 권장 surface |
|---|---|---|---|
| family-01 `combinationLab.outputs.dc-3.summary` | "그 비율이 유지됐다면 어떤 후폭풍이 있었습니까?" | **선행 비율 antecedent 부재** — 플레이어가 "그 비율"이 뭔지 모를 수 있음 | "지금과 다른 비율이었다면 어떤 후폭풍이 있었습니까?" |
| family-01 `combinationLab.outputs.dc-5.summary` | "두 사람이 어머니의 뜻을 어떻게 해석했는지 정리한다" | **추리 질문 → 평서문 평탄화** ("누가 정말 ~ 이용했습니까?" 의 challenge 톤 손실) | "두 사람이 어머니의 뜻을 어떻게 다르게 받아들였는지 — 누가 더 멀리 갔습니까?" |
| friend-01 `combinationLab.outputs.dc-4.summary` | "과거 손절의 말하지 못한 사정" | **alternative-hypothesis framing 손실** ("변심이 아니라 ~"의 가설 대조 톤 손실) | "과거 손절이 단순 변심이 아니었다면 — 왜 끝내 말하지 못했습니까?" |
| friend-01 `combinationLab.outputs.dc-5.summary` | "반복된 오해와 낙인의 구조" | **추리 질문 → 평서문 평탄화** ("누가 먼저 낙인을 찍었습니까?" 손실) | "반복된 오해와 낙인 — 누가 먼저 시작했는지 짚어낼 수 있습니까?" |

**원칙**: dossier `summary`는 플레이어에게 "이제 무엇을 추리해야 하는가"를 던지는 detective question 영역. surface 처리 시 **고유명사·진실어만 추상화**하고 **질문/대조/challenge 톤은 보존**. 평서문 단언으로 바꾸면 게임 흐름의 단서 동인이 약화됨.

### 4-B. 적정성 양호 — PASS 5건

다음 surface는 진실 보호 ✓ + dramatic tension 손실 미미:

- spouse-01 `combinationLab.outputs.dc-1.summary` "외도 오해를 다른 동선으로 재검토하는 카드" — `다른 동선` 추상화로 진실 가림 + `재검토` 액션 동인 보존 ✓
- spouse-01 `combinationLab.outputs.dc-2.judgeHint` "...해당 문자 기록(e-4)을 제시하면 숨긴 사정이..." — `숨긴 사정` 표현이 player에게 적절한 hint 강도 ✓
- spouse-01 `combinationLab.outputs.dc-4.judgeHint` "이제 이준호 씨가 숨긴 사정을 직접 확인하거나..." — actor 보존 ✓
- family-01 `dc-2.label` "오래된 지원 흐름" — 시간/주체 추상화 ✓
- friend-01 `dc-1.summary` "선후관계가 다르다면 왜 바로 알리지 않았는가" — 가설-질문 형식 보존 ✓ (4-A의 dc-3/dc-5와 대조 — dc-1은 모범)

### 4-C. 일관성 — case별 path 수 mismatch 검수

지시문에 "case별 일관성 (spouse-01 9 path / family-01 9 path / friend-01 8 path)"이 있으나 실제 정책 표 내 path 수:
- spouse-01: 9 path (4 combinationLab + 3 evidence + 1 v3Design + label/Context)
- family-01: 9 path (3 nodes + 3 outputs + 2 v3Design + 1 evidence)
- friend-01: 8 path (4 outputs + 2 v3Design + 2 evidence)

표 본수는 명세 일치. 단 friend-01에 `combinationLab.nodes.dc-*.label` 항목이 빠진 점 — spouse/family는 노드 라벨 별도 정비 / friend는 outputs.summary만 정비 — **일관성 약함**. friend-01에도 `dc-*.label` 라벨 surface 보강 권장 (캐치업 대상이지 차단은 아님; P2).

---

## 5. CT-Cross S-2 발견 case 누락 영역 — REVISE 권장 2건

`tmp/qa-ct-cross-coverage-check.cjs` 실행: 17개 P1 finding × 50 proposed lexeme intersection.
**결과: 15/17 CAUGHT, 2 MISSED.**

### 5-A. D2-A-12 누락 (friend-01)

| variant | text | 누락 원인 |
|---|---|---|
| `judgec-d-2-hard-v1` | "최수민 씨, **거절했다는** 기록을 숨긴 선택이 오해를 만들었습니다." | friend-01 paraphrase set에 `거절했다(는)` 변형 미등록. anchor truth `B의 거절`만 lexeme 등록 |

**권장**: friend-01 paraphrase set "접근 변형" 그룹에 `거절했다는` / `거절한 사실` 추가. 단 §1-A FP 위험 검토와 동일하게 — `거절했다`는 일반 동사이므로 **judge_* + system + dossier 채널 한정 적용** 필수. NPC 본인 발화 ("저는 거절했습니다")는 통과시켜야 함.

### 5-B. D1-P1 누락 — 차원 자체가 paraphrase set 영역 외

| variant | text | 누락 원인 |
|---|---|---|
| `a-d-2-S2-motive-search-v5` (family-01) | "솔직히 말하면, 의도가 있었다고 인정하는 순간 제 기준이 무너져서 그렇게 생각하지 않으려 했습니까." | D1 lieState flow tonal 불일치 (`솔직히 + 의도가 있었다고 인정`)는 paraphrase가 아니라 *톤 분류* 문제. lexeme 단순 차단으로 catch 불가 |

**해석**: D1은 *tonal classifier* 영역이지 paraphrase lexeme 영역이 아님. Tier 3 guard는 lexeme exact/regex 매칭이 1차 도구이므로 D1 catch는 어려움. **이 누락은 정책 hardening MVP 범위 외로 명시 권장** (Tier 4+ LLM-side review 또는 별도 D1 톤 classifier 영역).

해당 entry 1건은 P1으로 분류했으나 빈도 낮음 (CT-Cross S-2 D1 P1 = 1건만). MVP 통과 OK이나 본문에 "D1 lieState tonal 불일치는 별도 차원, paraphrase set으로 catch 안 됨" 1줄 명시 권장.

### 5-C. D6 register 2건 — Codex-Dev A 의뢰 영역 정합 ✓

CT-Cross S-2 D6 P1 2건 (spouse-01 `잖아요` 콜로키얼 어미)이 baseline 회귀로 revert 되어 Codex-Dev A 의뢰 영역으로 이동된 점 — 정책 hardening 범위 외 처리 정합 ✓ (지시문 명시대로). 정책에 추가 처리 필요 없음.

---

## CLAUDE.md / qa-functional.md 부수 변경 검수 — PASS

### CLAUDE.md (1 line 정정)

```diff
- 톤 단계: soft(정리 요청) / mid(추궁) / hard(단호)
+ 톤 단계: soft(정리 요청) / hard(단호) — 현 엔진은 2 tone 적용. mid 추가는 Tier 4+ 영역
```

엔진 실측과 부합 — judge_contradiction 채널 entry tag 검사 결과 `tone:soft|mid|hard` 모두 존재하나 mid는 일부 entry만 정의됨 (예: family-01 `judgec-d-2-mid-v5`). MVP에서 mid 미적용 명시는 정합 ✓.

### qa-functional.md (TC-A3 정정)

```diff
- 절차: judge question 84종 (4 type × 4 depth × soft/mid/hard) 다양한 조합 자연 플레이
+ 절차: judge question 84 templates (4 type × depth × 2 tone) 다양한 조합 자연 플레이
+   - fact_pursuit / motive_search / empathy_approach: depth 0~3 × soft/hard = 24 each
+   - evidence_present: depth 0~2 × soft/hard = 12 (depth 3 미적용)
+   - 합계 84 templates / mid tone 미적용 (Tier 4+ 보류)
```

CLAUDE.md 정정과 일관 ✓. `judgeQuestionEngine.ts` 실측 필요 영역이나 본 review 범위 외 — Codex Plan P-4 (TC-A3 84종 매트릭스 audit)에서 cross-validate 권장.

---

## 권장 다음 작업

### CT-Main 즉시 처리 (정책 본문 수정)

1. **§4.1 spouse-01 paraphrase set**:
   - `가족을 돌본` 항목 제거 (기존 globalTruthLexemes에 이미 존재 — 중복)
   - `챙겨 주` 항목 제거 또는 `삼촌이 챙겨` 류로 좁히기
   - 헤더 "S-1 + CT-Cross 발견 영역" → "S-1 spouse 1건 + 회귀 방지 11건"으로 분리 표기
2. **§4.2 family-01 paraphrase set**:
   - `혈연` 항목 제거 또는 `혈연이 다른`으로 좁히기 (S5 자백 5건 보호)
   - `60대 40` / `60대40` 변형 추가 (Anchor Truth 정합)
   - "20년 동안 매달 보낸" 류 lexeme 옆에 "S0~S2 + surface-only 채널 한정" 명시
3. **§4.3 friend-01 paraphrase set**:
   - `가로` 항목 즉시 삭제 (FP 무한 확산)
   - `같은 패턴` (단독) 항목 제거 또는 `같은 패턴이라고 봤습니다` 류로 좁히기
   - `거절했다는` (judge channel 한정) 추가 — D2-A-12 catch
4. **§4.1/4.2/4.3 공통**: paraphrase set 박스 직후 "**Tier 3 guard 적용 조건 (gating)**" 박스 추가 (§3-B 권장 본문 그대로)
5. **§4.x uiSurfaceMap**: dc-3/dc-5 (family-01) + dc-4/dc-5 (friend-01) summary 4개를 question/challenge 톤 보존 형태로 재작성 (§4-A 권장 표 그대로)
6. **본문 1줄 추가**: D1 lieState tonal 불일치는 paraphrase set 범위 외 — Tier 4+/LLM review 영역 명시

### 통과 후 진입

- Codex-Dev A 의뢰서 작성 (Tier 3 guard 함수 구현 + lexeme list 입력 + gating 명시)
- Codex Plan P-4 (TC-A3 84 question template 매트릭스 audit) — CLAUDE.md / qa-functional.md 정정과 cross-validate
- baseline 회귀 X 확인 후 commit (CT-Main + CT-Cross 동시 sign-off)

### 보류

- D1 lieState tonal classifier (Tier 4+ 영역, MVP 범위 X)
- friend-01 `dc-*.label` 라벨 surface 일관성 (P2 catch-up)

---

## Files touched

- **none** in `src/`, policy JSON, validator wrappers, runtime, `docs/disclosure-policy.md`, `docs/qa-functional.md`, `CLAUDE.md`, TC docs — per absolute prohibition.
- **created** (ephemeral, tmp/, not committed):
  - `tmp/qa-ct-cross-policy-fp-scan.cjs` — 50 paraphrase × 14,931 variants stratified scan
  - `tmp/qa-ct-cross-coverage-check.cjs` — 17 P1 finding × proposed lexeme intersection check
  - `tmp/qa-ct-cross-results/20260427-policy-fp-scan.json` — raw scan output
  - `tmp/qa-ct-cross-results/20260427-policy-hardening-review.md` — this report

---

## Reproducibility

```bash
# from repo root, before re-running review:
git status --short --branch                  # working tree dirty (CT-Main editing) expected
git log --oneline -1                         # db0130e
npm run check:all                            # 0 hard / 157 known WARN (must hold)

# CT-Cross 검수
node tmp/qa-ct-cross-policy-fp-scan.cjs      # FP 스캔 (~ 1초)
node tmp/qa-ct-cross-coverage-check.cjs      # P1 coverage 체크 (~ 0.1초)
```

**판정**: WARN — REVISE 8건 (FP 4 + 범위 2 + 누락 2). 새 P0 0건 / baseline 회귀 0건. 정책 본문에 8건 반영 후 Codex-Dev A 의뢰서 작성 진입 OK.
