# Disclosure Policy — 활성 3건 진실 공개 정책

**버전**: v1 (Tier 1 초안)
**범위**: spouse-01 본문 / family-01·friend-01 구조만 (본문 보류)
**작성**: ClaudeCode CT (2026-04-27)
**대응 baseline**: `baseline-pre-policy-v1` (a10b801)

---

## 1. 게임 핵심 원칙

> **"진실은 플레이어가 직접 밝혀낸다."**
> — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다. (`CLAUDE.md`)

이 정책 문서는 위 원칙을 기계가 검증할 수 있도록 사람 기준(Markdown)과 기계 기준(JSON)으로 이중화한 것이다. Markdown은 이 문서, JSON은 `src/data/disclosurePolicy/{caseId}.json` (Codex 작성, runtime import 금지).

정책 위반 = 게임의 본체가 깨진 것이다. 자연체 보정·UI 정합·성능 최적화보다 우선한다.

---

## 2. 채널 분류와 발화 권한

### 2.1 surface-only 채널 (절대 진실 직접 언급 X)

플레이어가 추궁해 NPC가 자백하기 전까지, 이 채널들은 사건의 진실을 어떤 형태로도 명시하면 안 된다.

| 채널 | 역할 | 허용 | 금지 |
|---|---|---|---|
| `judge_question` | 재판관 질문 | evidence.surfaceName, dispute.title | name, hiddenTruth, description의 진실 영역 |
| `judge_contradiction` | 재판관 모순 추궁 | 간접 인용으로 진술 변화 짚기 | 사건 진실 직접 명시 |
| `judge_evidence_combo` | 증거 조합 안내 | "두 자료가 같은 시점·같은 사람을 가리킵니다" 류 추상화 | dossier card label의 진실어 노출 |
| `judge_witness_summon` | 증인 소환 | 증인 surfaceKnowledge | 증인 진실 영역 (관계/내막) |
| `system_message` | 시스템 안내 | 진술 패턴·메커니즘 변화 | 진실 콘텐츠 |
| `dossier` (안내) | 결정적 질문 안내 | 추상화된 단서 방향성 | dossier card label의 진실어 |

### 2.2 lieState 기반 점진 공개 채널

NPC 발화는 lieState 단계에 따라 진실 노출 폭이 늘어난다. **단 S0~S2에서는 진실 노출 X.**

| 채널 | lieState 게이트 | 비고 |
|---|---|---|
| `interrogation` | Truth Throttle 표 적용 (3절) | NPC 본 발화 |
| `contradiction_pursuit` | S2+ 일부, S3+ 본격 | 내부 모순 진술 변화 |
| `interjection` | lieState 따라 | 끼어들기 |
| `emotional_overload` | S4 이상 | 감정 폭발 |
| `evidence_present` | NPC 응답이 lieState 따라 | 증거 제시 시 NPC 반응 |
| `mediation` | S3+ 권장 | 중재 발화 |
| `trust_action` | NPC 신뢰 행동 | rapport 따라 |
| `rapport_milestone` / `contradict_milestone` | 단계 마일스톤 | 추상 톤 |

### 2.3 Player-discovered 채널 (stage-gated)

플레이어가 직접 조사·해금한 결과물 채널. 공개 범위는 **evidenceStage에 따라 제한**.

| 채널 | 비고 |
|---|---|
| `evidence_discovery` | 플레이어가 직접 해금한 증거 — stage 0/1/2에 따라 공개 범위 제한. stage 2 진실 영역 일부 노출은 플레이어가 deep investigation으로 도달했을 때만 허용 |
| `discoveryText` (case data 필드) | route/stage-gated — 자동 시스템 안내 X. 플레이어가 직접 evidence 조합 + deep investigation으로 도달한 경우만 노출 |

**중요 — surface-only 채널과 분리**:
judge / system / dossier 채널(§2.1)은 evidence가 stage 2에 도달한 후에도 **자동으로 진실 lexeme을 노출하면 안 된다**. evidenceStage 게이트는 player-discovered 채널(§2.3)과 NPC 자백 lieState 진행(§2.2)에만 적용된다. surface-only 채널은 evidence 진행과 무관하게 항상 surface 표현만 사용한다.

### 2.4 자유 공개 채널 (판결 후만)

| 채널 | 비고 |
|---|---|
| `aftermath` | 판결 완료 후 후일담 — 진실 자유 공개 |

---

## 3. lieState × evidenceStage × channel 매트릭스

### 3.1 Truth Throttle (CLAUDE.md 기준 + 보강)

| lieState | 금액 | 인물 | 기관 | 시각 | 추가 제약 |
|---|---|---|---|---|---|
| S0 (완전 부정) | "해당 금액" | "그 사람" | "그곳" | 허용 | 진실 lexeme 0건 |
| S1 (일부 인정) | "해당 금액" | "그 사람" | "그곳" | 허용 | 진실 lexeme 0건 |
| S2 (핑계) | "200만원대" | "김 씨" | 약칭만 | 허용 | 진실 lexeme 0건 |
| S3 (책임 전가) | 구체적 허용 | 실명 | 정식명칭 | 전부 | 일부 진실 lexeme 허용 (책임 분배 맥락) |
| S4 (감정적) | 구체적 허용 | 실명 | 정식명칭 | 전부 | 진실 lexeme 감정 폭발 맥락 |
| S5 (자백) | 전부 공개 | 전부 | 전부 | 전부 | 진실 lexeme 전부 |

### 3.2 evidenceStage 정합

증거가 unlock되지 않은 상태(stage -1)에서는 surfaceName조차 외부 채널이 직접 명시 X. 사용자가 직접 해금한 후에만 surface 노출 가능.

| evidenceStage | 채널 허용 |
|---|---|
| `unlocked: false` | 어떤 채널도 evidence 직접 명시 X |
| `stage 0` | surfaceName + surfaceDescription만 |
| `stage 1` | surface + 일부 정황 (description 진실 영역 X) |
| `stage 2` (deepInvestigated) | 진실 영역 일부 노출 — 단 NPC 자백 보다 늦으면 안 됨 |

### 3.3 채널 × lieState 교차표

```
                    S0  S1  S2  S3  S4  S5
judge_question      ✗   ✗   ✗   ✗   ✗   ✗   (항상 surface-only)
system_message      ✗   ✗   ✗   ✗   ✗   ✗   (항상 surface-only)
dossier (안내)      ✗   ✗   ✗   ✗   ✗   ✗   (항상 추상화)
interrogation       ✗   ✗   ✗   ◐   ◐   ✓   (NPC 본인 발화, 점진)
contradiction       ✗   ✗   ✗   ◐   ◐   ✓
emotional_overload  -   -   -   -   ✓   ✓   (S4+ only)
aftermath           ✓   ✓   ✓   ✓   ✓   ✓   (판결 후)
```

`✗` = 진실 lexeme 금지 / `◐` = 일부 허용 (맥락 따라) / `✓` = 자유

---

## 4. surface ↔ truth 매핑

### 4.1 spouse-01 — 활성 본문

**캐릭터**:
- A: 박지연 (36, 학원 데스크, victim_cosplay)
- B: 이준호 (38, 가전매장, avoidant)

**Anchor Truth (재판관/시스템 절대 직접 X)**:
박지연은 남편이 딴살림을 차렸다고 확신한 뒤 위임장을 조작하여 공동 적금 3,000만원을 해지했고 투자 사기로 전액 손실. 이준호는 외도가 아니라 개인회생 중인 친형의 조카(중2)를 돌보고 있었고 개인 비자금에서 2,000만원을 현금으로 형에게 전달.

**Evidence 매핑**:

| ID | name (진실) | surfaceName (허용) | description 진실어 |
|---|---|---|---|
| e-1 | 영수증 묶음 (5장) | 영수증 묶음 5장 | "조카 학용품", "삼촌이 챙겨주는" 등 |
| e-2 | 블랙박스 GPS / 네비 즐겨찾기 | 블랙박스 GPS 기록 | "형 오피스텔", "친형 거주지" |
| e-3 | (통화기록) | 통화기록 | "형과의 새벽 통화", "친형 명의" |
| **e-4** | **형 문자 스레드** | **발신자 미상 문자** | **"형", "조카 학교 알림"** ★ |
| e-5 | 이준호의 개인 계좌 출금 내역 | 개인 계좌 출금 내역 | "비자금", "형에게 전달" |
| e-6 | 투자방 카톡 + 송금 기록 | 투자방 카톡 기록 | "박지연 사기", "위임장 조작 자금" |
| e-7 | 공동 적금 해지 서류 | 공동 적금 해지 서류 | "위임장 조작", "박지연 단독 해지" |

**Dispute 매핑**:

| ID | 표면 | 진실 (재판관 직접 X) |
|---|---|---|
| d-1 | 오피스텔 방문과 새벽 전화 | 형의 오피스텔 / 조카 돌봄 |
| d-2 | 개인 비자금 출금 + 공동 적금 해지 | 형 빚 갚기 + 위임장 조작 |
| h-d3 (hidden) | 투자 사기 경위 | 박지연이 사기에 당함 |
| h-d4 (hidden) | 은폐와 선제행동의 순서 | 숨김은 B 먼저, 범죄는 A 먼저 |

**금지 lexeme (재판관·시스템·dossier 채널)**:

```
"형", "친형", "조카", "조카딸", "중2",
"돌봄", "가족을 돌본", "가족 사정", "가족 지원",
"위임장 조작", "투자 사기", "형 빚",
"형의 오피스텔", "형 명의", "형에게 전달",
"학용품", "조카 학교 알림"
```

**Paraphrase 우회 lexeme set (Tier 3 guard 입력)**:

출처: S-1 spouse 1건 (`b-d-2-S2-empathy-approach-v7` "가족을 돕는 일이 급했습니다") + 회귀 방지 11건 (현 데이터 미매치 / paraphrase 회귀 차단용). spouse-01 ScriptedText는 정책 lexeme exact-match 단계에서 사실상 정비된 영역.

```
관계 우회: "어린 친척", "친 가족", "혈육", "친 혈육", "가족의 한 사람"
돌봄 변형: "돌봐 드", "생필품을 사다", "가족을 돕는"
대납 우회: "빚 대신"
비자금 우회: "따로 모은 돈", "몰래 마련한 돈"
S2 NPC 누설 우회 (TC-D1): "가족을 돕는 일이 급" 류 — S0~S2 영역에서 가족 지원 동기 직접 노출 X
```

**제거 항목 (CT-Cross 정책 hardening review 결과)**:
- `가족을 돌본`: 기존 §4.1 globalTruthLexemes 중복
- `챙겨 주`: `챙겨 주는` / `챙겨 주신` 등 일반 동사 어미와 광역 매치 FP 위험

**Tier 3 guard 적용 조건 (gating) — 3 case 공통**:
- 차단 대상: `judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon` / `system_message` / `dossier`(안내) / `evidence_discovery` + NPC `interrogation`·`contradiction_pursuit` lieState ∈ {S0, S1, S2}
- 통과 대상: `aftermath` / `emotional_overload` / `mediation` / witness `*full*` + NPC S3+ (gated, 책임 분배 맥락만) / NPC S4+ (자유) / S5 자백
- `evidence_present`: stage 0/1 → 차단 / late stage → gated
- `dossier`: early → 차단 / mid·late → gated (채널 권한 따라)
- 단독 lexeme ambiguous (예: `혈연`, `가로`, `같은 패턴`) → context 윈도우 검사 또는 lexeme 자체 좁히기
- ⚠️ D1 lieState tonal 불일치 (예: `솔직히 말하면 + 의도가 있었다고 인정`)는 별도 차원 — paraphrase set으로 catch X. Tier 4+/LLM review 영역

**Witness 진실 보호**:

| ID | name | 진실 영역 (surfaceKnowledge로 노출 X) |
|---|---|---|
| w-1 | 오피스텔 경비 | 그 층에 형이 산다는 사실, 조카 출입 |
| w-2 | 은행 직원 | 위임장 조작 정황 (절차상 이상한 점) |
| w-3 | 박미라 | (TBD: case data 추가 확인 필요) |

**UI 노출 영역 광역 (uiSurfaceMap)**:

case data 곳곳에 진실어가 직접 들어 있어 UI에 그대로 출력되면 P7 누설. dossier card label만이 아니라 다음 필드 모두 점검 대상.

| 필드 | 현재 case data 사례 (spouse-01) | 처리 방식 |
|---|---|---|
| dossier card label | `e-4 형 문자 + 조카 학교 알림` | `uiSurfaceMap.dossierLabel` = surface 표현 |
| dossier card summary | `B가 시댁 불화와 조카 사정을 직접 언급` | 추상화 — `B가 사정을 직접 언급` |
| dossier card noteText | (case data 추가 점검 필요) | 추상화 |
| evidenceCard label / name | e-4 name = `형 문자 스레드` | UI는 `surfaceName` 만 (e-4 = `발신자 미상 문자`) |
| evidenceCard stage summary | e-1 Established = `조카 돌봄을 위한 구매로 확인됨`, e-2 Established = `형네 오피스텔 방문 동선으로 확인` | `uiSurfaceMap.stageSummary` = stage 0~2 별 surface 표현 |
| judgeHint | (case data 추가 점검 필요) | `uiSurfaceMap.judgeHint` = surface |
| discoveryText | 예: `형 문자의 '가은이 학교 알림'... 중학생 조카가 있다?!` | route/stage-gated 분류 (아래 특수 처리 참조) |
| recommendedMoment / purpose / successConditionSummary / successEffects | (case data 추가 점검 필요 — `successEffects`에 이미 `B가 시댁 불화와 조카 사정을 직접 언급` 사례 확인됨) | `uiSurfaceMap.purpose` = 추상화. UI 노출 여부에 따라 분류 |

**discoveryText 특수 처리**:
- ❌ 자동/시스템 안내로 노출 X
- ✅ 플레이어가 직접 evidence 조합 + deep investigation으로 도달한 경우만 노출 OK
- → JSON 정책에 `discoveryText.gate` 명시 필요 (route + stage 조건)

→ Codex JSON 정책 작성 시 `uiSurfaceMap` 광역 schema 설계 + 각 필드별 surface 표현 정의 + `discoveryText.gate` 분류 + 어떤 필드가 실제로 UI에 노출되는지 사전 점검.

**uiSurfaceMap surface 텍스트 보강 (S-5 검출 영역 → Tier 3 guard 입력)**:

S-5 보고서 (`tmp/qa-scripted-results/20260427-S-5-summary.md`)에서 발견한 `actual` 진실어 영역. surface 표현으로 정비.

| path | actual (진실어) | surface (UI 허용) |
|---|---|---|
| `combinationLab.nodes.e-4.label` | `e-4 형 문자 + 조카 학교 알림` | `e-4 발신자 미상 문자` |
| `combinationLab.nodes.e-5.label` | `e-5 공동 적금 해지 + 형 계좌 이체` | `e-5 개인 계좌 출금 내역` |
| `combinationLab.outputs.dc-1.summary` | `외도 오해를 형네 돌봄으로 뒤집는 카드` | `외도 오해를 다른 동선으로 재검토하는 카드` |
| `combinationLab.outputs.dc-2.judgeHint` | `...이준호 씨에게 직접 추궁하시거나 형 문자(e-4)를 제시하면 구체적 사연이...` | `...이준호 씨에게 직접 추궁하시거나 해당 문자 기록(e-4)을 제시하면 숨긴 사정이...` |
| `combinationLab.outputs.dc-4.judgeHint` | `이제 이준호 씨 형의 상황을 직접 확인하거나 동기 탐색으로 숨긴 이유를 물어볼 수 있습니다.` | `이제 이준호 씨가 숨긴 사정을 직접 확인하거나 동기 탐색으로 이유를 물어볼 수 있습니다.` |
| `evidence.e-1.v3DepthPlan.Established.summary` | `조카 돌봄을 위한 구매로 확인됨` | `구매 목적이 기존 의심과 다를 가능성 확인` |
| `evidence.e-2.v3DepthPlan.Context.summary` | `오피스텔 동선과 형네 주소 일치` | `오피스텔 동선과 특정 주소의 반복 일치` |
| `evidence.e-4.v3DepthPlan.Established.summary` | `조카 돌봄 관계 직접 증명` | `문자 관계의 실제 맥락 확인` |
| `v3Design.authorityPlacements[*].purpose` | `형, 조카, 2,000만 원 같은 실체 명사 강제` 등 | `숨긴 관계와 금액 같은 실체 명사 강제` 류 추상화 |

### 4.2 family-01 — paraphrase set + uiSurfaceMap (본문은 후속 작업)

**캐릭터**:
- A: 윤태성 (48, 주방가구 공장 대표, confrontational)
- B: 윤정후 (44, 자동차부품 가게, affect_flattening)

**Anchor Truth 키워드 (금지 lexeme 우선 list, 메모리 #9)**:
```
"출생 비밀", "배다른", "혈연 다른",
"20년 동안 B 돈", "정후 돈으로 어머니",
"자기 몫을 줄인 조작", "유서 자기 몫 축소", "공장 부도 대납", "형 공장 자금"
```

**Paraphrase 우회 lexeme set (Tier 3 guard 입력 / S-1 + CT-Cross 발견 영역)**:

S-1 6 P0 (family-01 4건) + CT-Cross 14 P1 (family-01 12건 집중) paraphrase 검출 결과. 가장 위험 영역.

```
유서 조작 우회: "유서를 손댄", "유서를 고친", "유서를 바꾼", "원본 유서를 고친", "문서를 손으로 고친"
자기 몫 축소: "자기 몫을 줄"
공장 자금 변형: "공장 자금" (단독 사용 시 / `공장 자금의 출처` `공장 자금이 같은 흐름` 등)
20년 송금 변형: "20년 동안 매달 보낸", "20년 간 송금", "어머니 통장으로 정기적으로 돈을 보낸", "어머니 통장으로 꾸준히 돈을 넣었습니다", "정기적이라고 불러도 될 만큼 보낸", "장기 송금"
출생 비밀 변형: "혈연이 다른", "친생자", "친자 관계", "출생에 관한 사실"
60:40 비율 변형: "60대 40", "60대40", "40 대 60", "4 대 6"
S0 NPC 단정 우회 (TC-D2-B): "유서를 손댄", "문서를 손으로 고친" — A의 S0 단정도 진실 단정 톤 X (`그런 정황이 보입니다`, `그렇게 생각합니다`로 hedge)
S2 NPC 누설 우회 (TC-D1): "어머니 통장으로 꾸준히", "정기적이라고 불러도 될 만큼", "제 형 쪽 생활이 그렇게 이어진 정황" 류 — S2에서 지원 주체·기간 구조 직접 노출 X
```

**제거 항목 (CT-Cross 검수)**:
- `혈연` 단독: S5 자백 5건 (`a-d-4-S5` "저는 아버지와 혈연이 다르다는 사실을 받아들입니다") 차단 위험. `혈연이 다른`으로 좁힘

**Tier 3 guard 적용 조건 (gating)**: §4.1 spouse-01 gating 박스 동일 적용 (3 case 공통). 특히 `자기 몫을 줄` (12 P1 + 10 자백) / `공장 자금` (14 P1 + 6 자백) / `20년 동안 매달 보낸` (S4·S5 자백 6건)은 lieState gate 강제 필수.

**uiSurfaceMap surface 텍스트 보강 (S-5 검출 영역)**:

| path | actual (진실어) | surface (UI 허용) |
|---|---|---|
| `combinationLab.nodes.dc-2.label` | `dc-2 형이 모르던 20년의 돈` | `dc-2 오래된 지원 흐름` |
| `combinationLab.nodes.dc-4.label` | `dc-4 감춘 이유` | `dc-4 말하기 어려운 사정` |
| `combinationLab.outputs.dc-2.judgeHint` | `새 쟁점 '20년 송금의 실체'가 드러났습니다. 누가 실질적으로 보냈는지 확인해보세요.` | `새 쟁점 '오래된 지원의 출처'가 드러났습니다.` |
| `combinationLab.outputs.dc-3.summary` | `60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?` | `지금과 다른 비율이었다면 어떤 후폭풍이 있었습니까?` |
| `combinationLab.outputs.dc-4.summary` | `유서 조작과 20년 지원의 끝에 있던 출생 비밀 — 형의 정체성을 지키려 한 것입니까?` | `유서 변경과 오래된 지원 끝에 있던 가족 사정` |
| `combinationLab.outputs.dc-5.summary` | `두 형제 모두 어머니를 있는 그대로 두지 못했다 — 누가 정말 어머니를 이용했습니까?` | `두 사람이 어머니의 뜻을 어떻게 다르게 받아들였는지 — 누가 더 멀리 갔습니까?` |
| `v3Design.authorityPlacements[3].purpose` | `조작 동기, 송금 이유, 일기장 내용 같은 실체 명사 강제` | `말을 피한 이유와 자료의 맥락을 분리해 확인` |
| `v3Design.authorityPlacements[11].purpose` | `출생 비밀을 확실히 열되 A의 정체성 충격 리스크 관리` | `민감한 가족 사정을 제한적으로 확인` |
| `evidence.e-7.v3DepthPlan.context.summary` | `출생 비밀, 20년 지원, 유서 변경 이유를 연결한다.` | `민감한 가족 사정과 유서 변경 이유를 연결한다.` |

**Evidence surfaceName alias (S-5 baseline-known WARN, 정합 결정 보류)**:
- e-1 / e-4 / e-5 / e-6 / e-7 — 정책 surfaceName과 caseData surfaceName이 alias로 다름 (의도된 추상화 vs 정합 — 사용자 결정 영역)

**본문 작성 시점**: 이번 Tier 3 guard MVP 안정 후 (paraphrase set + uiSurfaceMap이 우선 입력).

### 4.3 friend-01 — paraphrase set + uiSurfaceMap (본문은 후속 작업)

**캐릭터**:
- A: 송다은 (31, 온라인 쇼핑몰 CS, premature_summary)
- B: 최수민 (31, 필라테스 강사, affect_flattening)

**Anchor Truth 키워드 (금지 lexeme 우선 list, 메모리 #9)**:
```
"예비신랑이 먼저", "아버지의 사기",
"아버지 돈 갈취", "같은 패턴 반복",
"선넘는 메시지", "B의 거절"
```

**Paraphrase 우회 lexeme set (Tier 3 guard 입력 / S-1 + CT-Cross 발견 영역)**:

S-1 P0 (friend-01 1건) + CT-Cross 4 P1 (friend-01) paraphrase 검출 결과.

```
접근 변형: "선을 넘는 메시지", "선을 넘은 말", "선을 넘은 메시지", "선 넘는 메시지"
사기 우회: "다은이 아버지가 ~ 가져간", "뜯", "다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸", "송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸"
거절 paraphrase 우회 (judge channel 한정 / D2-A-12 catch): "거절했다는", "거절한 사실"
같은 패턴 변형: "같은 패턴 반복", "같은 방식으로 돈 얘기"
S2 NPC 자백 톤 우회 (TC-D2-C): "다은이 아버지가 제 돈을 가져간 게 맞습니다" 류 — S2에서 과거 사기 사실 직접 단정 X
evidence_discovery 누설 우회 (TC-D2-D): "선을 넘는 메시지를 보고도..." — `evidence_discovery` 채널이 진실을 establ된 사실로 단정 X
```

**제거 항목 (CT-Cross 검수)**:
- `가로`: 단음절 토큰. `대가로` 등 부분 일치 무한 FP
- `선을 넘은` 단독: 일반 비유 FP 위험 (좁힌 형태 `선을 넘은 말 / 메시지`로만 등록)
- `같은 패턴` 단독: 일상 비유 FP 위험 (`같은 패턴 반복` + `같은 방식으로 돈 얘기`로만)

**Tier 3 guard 적용 조건 (gating)**: §4.1 spouse-01 gating 박스 동일 적용. `거절했다는` / `거절한 사실`은 judge_* 채널 한정 (NPC "저는 거절했습니다"는 통과). `선을 넘은`은 좁힌 형태로만 등록되어 있어 FP 안전.

**uiSurfaceMap surface 텍스트 보강 (S-5 검출 영역)**:

| path | actual (진실어) | surface (UI 허용) |
|---|---|---|
| `combinationLab.outputs.dc-1.summary` | `예비신랑이 먼저 선을 넘었다면 왜 바로 송다은에게 말하지 않았는가` | `선후관계가 다르다면 왜 바로 알리지 않았는가` |
| `combinationLab.outputs.dc-2.summary` | `송다은 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면 왜 또 혼자 막으려 했는가` | `과거와 닮은 부탁이 다시 보였다면` |
| `combinationLab.outputs.dc-4.summary` | `과거 손절이 변심이 아니라 사기 피해와 침묵의 결과였다면, 왜 끝내 말하지 못했습니까?` | `과거 손절이 단순 변심이 아니었다면 — 왜 끝내 말하지 못했습니까?` |
| `combinationLab.outputs.dc-5.summary` | `두 번 다 말하지 못해 악역이 된 구조 — 누가 먼저 낙인을 찍었습니까?` | `반복된 오해와 낙인 — 누가 먼저 시작했는지 짚어낼 수 있습니까?` |
| `v3Design.authorityPlacements[3].purpose` | `A 아버지의 문자 원본 확보` | `가족 쪽 문자 원본 확보` |
| `v3Design.authorityPlacements[8].purpose` | `A 아버지의 돈 접근 패턴이 반복됨을 공식 기록` | `과거와 현재 자금 부탁의 유사성을 공식 기록` |
| `evidence.e-6.v3DepthPlan.Established.summary` | `A 아버지의 사기 패턴 확정` | `과거 금전 문제의 반복성 확인` |
| `evidence.e-7.v3DepthPlan.Established.summary` | `A 아버지의 반복 패턴과 B의 반복 침묵 확정` | `과거와 현재 흐름의 반복성 확인` |

**Evidence surfaceName alias (S-5 baseline-known WARN, 정합 결정 보류)**:
- e-1 ~ e-7 — 정책 surfaceName과 caseData surfaceName이 alias로 다름 (의도된 추상화 vs 정합 — 사용자 결정 영역)

**본문 작성 시점**: 이번 Tier 3 guard MVP 안정 후 (paraphrase set + uiSurfaceMap이 우선 입력).

---

## 5. NPC interrogation lieState 정책

NPC 본 발화 채널은 lieState 단계에 따라 진실 접근이 제한적이다.

### 5.1 박지연 (spouse-01 partyA, victim_cosplay)

| lieState | 허용 진술 영역 | 금지 |
|---|---|---|
| S0 | 외도 의심 프레임만, "남편이 매일 오피스텔에 갔어요" | 위임장·투자 사기 영역 |
| S1 | 영수증 발견 시점, "그때부터 이상했어요" | 위임장·투자 사기 |
| S2 | 위임장은 "어쩔 수 없었다" 류 모호어 | "조작" 명시 / 투자 사기 |
| S3 | 남편 숨김 우선 책임 전가 | (보호 약화) |
| S4 | 배신감 폭발, 일부 진실 노출 | (보호 약화) |
| S5 | 위임장 조작 + 투자 사기 인정 | (자백) |

### 5.2 이준호 (spouse-01 partyB, avoidant)

| lieState | 허용 진술 영역 | 금지 |
|---|---|---|
| S0 | 모호어 ("그게 좀 복잡해서요") | 형/조카 명시 |
| S1 | "사정이 있다"까지 | 형/조카 명시 |
| S2 | "가족 일이라" 일반화 | "친형", "조카" 직접 |
| S3 | 일부 형 사정 인정 | (보호 약화) |
| S4 | 시댁 갈등 노출 | (보호 약화) |
| S5 | 형·조카 돌봄 자백 + 비자금 2,000만원 인정 | (자백) |

### 5.3 family-01 / friend-01 NPC

본문 작성 시점에 확장.

---

## 6. 사용자 spot check — 동형 패턴 탐지 시작점

### 6.1 핵심 원칙

> **사용자가 spot check로 보여준 사례는 *시작점*이지 *완료 list*가 아니다.**
> 같은 패턴을 가진 동형 사례를 14,931 variants 전수에서 광범위 검출 + 처리해야 한다.

(메모리 #11: 잘못 패턴 — 광범위 동형 검출 본질)

### 6.2 절차

1. CT가 사례 받음 → `docs/spot-check-format.md` 8필드 포맷으로 정리
2. 분류 카테고리 (P1~P6 / D1~D4 / C1~C5 / P7 / fallback) 결정
3. 패턴 추출 — 정규식 / 키워드 list / 의미 indicator
4. 14,931 variants 전수 검출 (Tier 2 cross-check 활용)
5. Codex 의뢰서 작성 (이 정책 문서 참조 강제)
6. 처리 → 검증 (자동 + 상대 모델 + 사용자) → confirm

### 6.3 자동화 한계 영역

P1 Q-A 정합 / D1 LieState Flow 자연성 / 의미 정확성은 정적 검출로 100% 잡히지 않는다 (메모리 #12). 사용자 + 메인 협업 영역.

---

## 7. 운영 원칙

### 7.1 ScriptedText 자동 수정 금지

- LLM/Agent로 ScriptedText 14,931 variants 자동 수정 X
- Codex 의뢰 시 수정 영역 명시 (variant ID list / 패턴 정규식 / 합산 목표)
- 매 의뢰는 baseline-pre-policy-v1 기준 회귀 검증

(메모리 잘못 패턴 #6 — 9차원 의미 정확성 / 단순 어휘 교체 X)

### 7.2 JSON 정책 runtime import 금지 (Tier 3 진입 전)

- `src/data/disclosurePolicy/*.json` = 검증 스크립트 전용
- runtime 코드(`src/engine/*`, `src/components/*`)에서 import X
- runtime 사용 시점 = Tier 3 LLM/Fallback Guard (`llmDialogueResolver.ts`에 feature flag default-off)

### 7.3 정책 변경 절차

- Markdown 우선 / JSON cross-check
- 변경 시 기존 8 layer precheck 재실행 (회귀 검증)
- baseline-pre-policy-v1 anchor 유지 (rollback 보장)

### 7.4 절대 금지선 (잘못 패턴 종합)

- ❌ ScriptedText 자동 일괄 수정 (#6)
- ❌ 재판관·시스템·dossier 진실 직접 노출 (#9)
- ❌ 사용자 1 사례만 처리 (#11 — 동형 검출 강제)
- ❌ 정적 PASS = 완료 단정 (#12 — 차원별 검증)
- ❌ JSON 정책 자동 파생 엔진 (Codex 1차 회피 영역)
- ❌ `useActionDispatch.ts` / `judgeQuestionEngine.ts` 대형 리팩터 (Tier 4+ 보류)
- ❌ feature flag 없는 런타임 변경

---

## 8. 검증 (Tier 2)

Tier 2 진입 시 다음 wrapper가 이 정책을 검증한다 (Codex 작업 영역).

```bash
npm run check:policy   # policy-vs-data cross-check
npm run check:all      # 8 layer + policy + Markdown-JSON sync
```

검증 대상:
1. JSON 정책의 `forbiddenLexemes` ↔ ScriptedText 채널별 매칭
2. JSON 정책의 `surfaceMap` ↔ caseData evidence.surfaceName 일치
3. JSON 정책의 `lieStateGate` ↔ ScriptedText interrogation entries 정합
4. Markdown 정책 ↔ JSON 정책 sync (Tier 1 = 경고 only / Tier 2 = quality gate / Tier 3+ = release gate)

---

## 9. Rollback

정책 변경이 회귀를 일으키면 즉시 baseline 복원.

- Anchor: `baseline-pre-policy-v1` (a10b801)
- 절차: `baseline/pre-policy-v1/rollback-procedure.md`
- 부분 / 전체 데이터 / 완전 reset 3옵션

Tier 1 정책이 Tier 0 anchor를 깨뜨리지 않는지 매 변경마다 확인:
1. ScriptedText checksum 변화 X (정책은 데이터 수정 X)
2. caseData checksum 변화 X
3. truth-leak 0건 유지
4. 8 layer precheck PASS

---

## 10. 향후 확장 (Tier 1 후반 ~ Tier 4+)

### Tier 1 후반
- family-01 / friend-01 본문 작성 (각 +2~3일)
- JSON 정책 spouse-01 완성 (Codex)
- JSON 정책 family / friend 확장

### Tier 2
- `npm run check:policy` / `check:all` wrapper 구현 (tmp/ 초기 → scripts/quality/ 안정 후)
- Tier 1 작성 단계는 Markdown-JSON sync 경고만 / Tier 2부터 quality gate
- 검증 30일 안정 운영 후 Tier 3 진입 검토

### Tier 3
- `llmDialogueResolver.ts`에 `blockHiddenTruthLexemes(text, context)` feature flag default-off
- ScriptedText loader / useActionDispatch / judgeQuestionEngine **건드리지 X**
- 진입 조건: Tier 0~2 PASS + 1주 안정

### Tier 4+ (보류)
- 진입 조건: Tier 0~3으로 해결 안 되는 코드 분산 패턴 입증 + 별도 브랜치 1주 spike + spike metric 5개 PASS + 사용자 명시 승인
- 시간 기반 X / 증거 기반 진입

---

## 11. 게임 진행축 — 향후 JSON schema 설계 원칙

이 정책은 진실 누설 방지에 집중한다. 그러나 플레이어가 "지금 무엇을 공략하는가"를 알 수 있도록 하는 게임 진행축 설계도 함께 고려한다. 이 섹션은 향후 JSON schema(Codex 작업 영역)에 반드시 반영할 **설계 원칙**만 정의한다. 상세 Stage 표 / 쟁점별 progression 정의는 Codex가 spouse-01 JSON schema 초안 작성 시점에 본격화한다.

### 11.1 감정·신뢰·누설 역할 재정의

기존 시스템의 감정·신뢰·누설 미터를 제거하지 말고 **역할을 재정의**한다.

| 자원 | 기존 인식 | 재정의 |
|---|---|---|
| 감정 | 별도 성장축 / 누적치 | 단기 반응·취약점 — 불안, 분노, 죄책감, 방어, 동요 |
| 신뢰 | 호감도 누적 | 협조 태도 — 말할 준비가 되었는지, 방어 중인지 |
| 누설 | 별도 성장 자원 | 조건부 결과 — 말실수, 회피, 과잉반응, 새 쟁점 암시 |

세 자원은 별도의 성장 게이지가 아니라, 플레이어 추궁의 효과를 측정하는 신호다. 핵심 진행축은 §11.2 참조.

### 11.2 핵심 진행축 — Statement Fracture + TruthStage

플레이어 진행은 **쟁점별 진술 균열(statement fracture) + truthStage**가 핵심이다. lieState(NPC 거짓말 진행)와는 별도 축으로 정의한다.

- **statement fracture**: 같은 쟁점에서 NPC 진술이 변화하는 균열 지점. 플레이어가 추궁·증거·증인으로 깨뜨리는 대상.
- **truthStage**: 쟁점 단위로 정의되는 진행 단계 (Stage 0 표면 주장 → Stage 4 핵심 진실). lieState(S0~S5)는 NPC 본 발화의 정직 단계 / truthStage는 쟁점 자체의 진행 단계.

두 축의 관계는 직교(orthogonal)에 가깝다. 같은 lieState라도 truthStage가 다를 수 있고, 같은 truthStage라도 NPC가 다른 lieState로 응답할 수 있다. 정확한 매핑은 Codex schema 작업 시 정의.

### 11.3 spouse-01 JSON schema TODO (Codex 다음 단계)

Codex가 `src/data/disclosurePolicy/spouse-01.json` 작성 시 다음 섹션을 반드시 포함한다:

- `issueProgression` 또는 `truthStages` 섹션 — 쟁점별(d-1, d-2, h-d3, h-d4) Stage 0~4 정의
- 각 Stage 항목 (schema 초안에서 본격화):
  - 표면 주장 / 숨겨진 진실
  - 진입 조건 (어떤 행동·증거·증인으로 다음 Stage 진입)
  - 허용/금지되는 누설 lexeme
  - 유효한 심문 타입 (fact_pursuit / motive_search / empathy_approach 중 어느 것)
  - 필요한 증거 / 증인
  - 실패 반응 (조건 미충족 시 NPC 행동)
  - 성공 시 개방되는 다음 쟁점·증거·dossier
- 감정·신뢰·누설 미터의 trigger 조건 (재정의된 역할 따라)

상세 표 작성은 Codex schema 초안 작업의 영역. ClaudeCode CT는 schema 의미·표현 검수 영역.

### 11.4 절대 조건

- 이 섹션은 **설계 원칙**만 정의 — 상세 Stage 표는 Codex schema 초안 시
- **코드 변경 금지** (Tier 4+ 진입 조건 충족 전까지)
- **ScriptedText 수정 금지** (Tier 1 정책은 보호막, 데이터 수정 X)
- JSON schema는 **runtime import 금지** (Tier 3 진입 전)

### 11.5 검증

Tier 2 wrapper에서 `issueProgression` ↔ ScriptedText interrogation entries 정합 검사 (schema 합의 후). Tier 1 단계는 schema 작성 + sync 검증만. 런타임 영향 없음.

---

## 12. 메타

**버전 관리**:
- v1 (Tier 1 초안 — spouse-01 본문 / family·friend 구조만)
- v2 (예정 — family-01 본문 추가)
- v3 (예정 — friend-01 본문 추가)

**변경 시 절대 조건**:
- baseline-pre-policy-v1 anchor 유지
- 변경 사유 + 영향 범위 + 검증 결과 명시
- Codex 작성 JSON과 sync 검증

**관련 자료**:
- `baseline/pre-policy-v1/rollback-procedure.md`
- `docs/codex-request-template.md`
- `docs/spot-check-format.md`
- `src/data/disclosurePolicy/*.json` (Codex 작업 영역)
- `tmp/REQUEST-Codex-Tier0-baseline-freeze.md` (의뢰 패턴 사례)

---

**상태**: Tier 1 초안 작성 완료. Codex 검토 + JSON 정책 작성 대기.
