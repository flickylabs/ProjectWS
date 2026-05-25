# Codex Thread — family-01 Cycle 5 Line A 절차/판단 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역)
범위:
1. 신규 channel `emergence_narrative` Line A entry — 6 emergence × 54 KO variant × 3 lang = **162 외국어 variant**
2. dc-2 단서 라벨 rename 다국어 검토 (이미 자동 변환 적용된 EN/ZH-CN 확인 + JA cardName 영역 신규 보강)
3. surface-name gate 외국어 회귀 검출 (KO에서 발견된 e-3 lockedName 노출 패턴이 외국어에도 있는지 일괄 grep + fix)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/family01-cycle5-multilang ../ws-family01-cycle5-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/family01-cycle5-multilang` push |

---

## §1. 작업 배경

family-01 (윤태성 vs 윤정후 형제 유산 다툼)에 narrative wrapper 첫 적용 cycle.

- KO commit: main HEAD `fcd6465a` 적용 완료
  - `src/data/scriptedText/family-01.json` channels.emergence_narrative 신규 추가 (6 group × 54 variant)
  - `src/data/coreCases/family-01.case.ts` 6 entity narrativeTriggers 부착 + dc-2 label rename
  - `src/data/coreCases/family-01.narrative.ts` 신규 (narrativeTriggers 정의)
  - `src/data/scriptedText/family-01.{en,zh-CN}.json` dc-2 label 자동 변환 적용
- 본 작업: EN/JA/ZH-CN sync (162 variant 외국어) + dc-2 label rename 검토 + JA cardName 보강 + surface-name gate 검출

### Brief 정독 권장

- `docs/design/core-narrative-cycle5-family01-procedure-line-20260524/` 전체
  - 특히 `README.md` + 각 batch `gpt-pro-brief.md` + `family01-tone-samples.md`

### Line A 처리 emergence

| 영역 | id | 자연 명칭 | trigger × variants |
|---|---|---|---|
| 단서 | `dc-1` | 말년의 종이 | 4 × 12 |
| 증인 | `w-1` | 최복순 | 3 × 7 |
| 쟁점 | `d-2` | 공증 절차의 개입 | 4 × 10 |
| 증거 | `e-3` | 전 요양보호사 음성증언 | 4 × 9 |
| 단서 | `dc-2` | **수정된 유언장** (라벨 변경) | 4 × 9 |
| 증인 | `w-2` | 김영수 | 3 × 7 |
| **합계** | | | **22 trigger × 54 variant** |

---

## §2. KO baseline (main HEAD `fcd6465a`)

### 영향 파일

```
src/data/scriptedText/family-01.json  channels.emergence_narrative  (KO 54 variant 적용 완료)
src/data/scriptedText/family-01.en.json  (dc-2 label rename 자동 적용)
src/data/scriptedText/family-01.ja.json  (dc-2 cardName 영역 누락 — 본 작업에서 보강)
src/data/scriptedText/family-01.zh-CN.json  (dc-2 label rename 자동 적용)
```

### 54 variant 구조 (6 group × 22 trigger candidate)

KO baseline 직접 참조:
```
git show main:src/data/scriptedText/family-01.json | grep -A2 "\"key\": \"emerge-"
```

전체 entry id 목록 (canonical order):

#### dc-1 "말년의 종이" — 12 variants
- `emerge-dc1-via-combo-judge-decree-v1` (combination_result, recipe combine-1 또는 combine-11)
- `emerge-dc1-via-combo-b-react-v1`
- `emerge-dc1-via-a-interject-v1` (npc_interjection, source=a)
- `emerge-dc1-via-a-interject-judge-react-v1`
- `emerge-dc1-via-a-interject-a-response-v1`
- `emerge-dc1-via-a-interject-judge-decree-v1`
- `emerge-dc1-via-b-outburst-v1` (emotional_outburst, source=b)
- `emerge-dc1-via-b-outburst-judge-react-v1`
- `emerge-dc1-via-b-outburst-b-response-v1`
- `emerge-dc1-via-b-outburst-judge-decree-v1`
- `emerge-dc1-via-judge-auto-decree-v1` (judge_auto_mention fallback)
- `emerge-dc1-via-judge-auto-b-respond-v1`

#### w-1 "최복순" — 7 variants
- `emerge-w1-via-cascade-judge-summon-v1` (cascade_from_card, priorCard:dc-1)
- `emerge-w1-via-cascade-a-react-v1`
- `emerge-w1-via-b-interject-v1` (npc_interjection)
- `emerge-w1-via-b-interject-judge-react-v1`
- `emerge-w1-via-b-interject-judge-summon-v1`
- `emerge-w1-via-judge-auto-summon-v1` (judge_auto_mention)
- `emerge-w1-via-judge-auto-b-respond-v1`

#### d-2 "공증 절차의 개입" — 10 variants
- `emerge-d2-via-cascade-judge-decree-v1` (cascade_from_card, priorCard:dc-1)
- `emerge-d2-via-cascade-a-react-v1`
- `emerge-d2-via-a-interject-v1` (npc_interjection)
- `emerge-d2-via-a-interject-judge-react-v1`
- `emerge-d2-via-a-interject-judge-decree-v1`
- `emerge-d2-via-b-outburst-v1` (emotional_outburst)
- `emerge-d2-via-b-outburst-judge-react-v1`
- `emerge-d2-via-b-outburst-judge-decree-v1`
- `emerge-d2-via-judge-auto-decree-v1` (judge_auto_mention)
- `emerge-d2-via-judge-auto-b-respond-v1`

#### e-3 "전 요양보호사 음성증언" — 9 variants
- `emerge-e3-via-b-interject-v1` (npc_interjection)
- `emerge-e3-via-b-interject-judge-react-v1`
- `emerge-e3-via-b-interject-judge-decree-v1`
- `emerge-e3-via-cascade-judge-decree-v1` (cascade_from_card, priorCard:dc-1)
- `emerge-e3-via-cascade-b-respond-v1`
- `emerge-e3-via-combo-judge-decree-v1` (combination_result, contextAction:evidence_analyze.b.e-2)
- `emerge-e3-via-combo-b-respond-v1`
- `emerge-e3-via-judge-auto-decree-v1` (judge_auto_mention)
- `emerge-e3-via-judge-auto-b-respond-v1`

⚠ **e-3 surface-name 영역 주의** — KO baseline은 lockedName `[전 요양보호사 음성증언]` 대신 surfaceName `[전 돌봄 직원 음성]` 사용 (P0 fix 적용 영역). 외국어도 e-3 lockedName 노출 회피 (각 lang의 e-3 lockedName/surfaceName baseline 참조).

#### dc-2 "수정된 유언장" — 9 variants (라벨 변경 entry 포함)
- `emerge-dc2-via-combo-judge-decree-v1` (combination_result, recipe combine-5)
- `emerge-dc2-via-combo-b-respond-v1`
- `emerge-dc2-via-cascade-judge-decree-v1` (cascade_from_card, **priorCard:d-2** — dispute → dossier 첫 사용)
- `emerge-dc2-via-cascade-b-respond-v1`
- `emerge-dc2-via-b-outburst-v1` (emotional_outburst)
- `emerge-dc2-via-b-outburst-judge-react-v1`
- `emerge-dc2-via-b-outburst-judge-decree-v1`
- `emerge-dc2-via-judge-auto-decree-v1` (judge_auto_mention)
- `emerge-dc2-via-judge-auto-b-respond-v1`

#### w-2 "김영수" — 7 variants
- `emerge-w2-via-cascade-judge-summon-v1` (cascade_from_card, priorCard:dc-2)
- `emerge-w2-via-cascade-a-react-v1`
- `emerge-w2-via-b-interject-v1` (npc_interjection)
- `emerge-w2-via-b-interject-judge-react-v1`
- `emerge-w2-via-b-interject-judge-summon-v1`
- `emerge-w2-via-judge-auto-summon-v1` (judge_auto_mention)
- `emerge-w2-via-judge-auto-b-respond-v1`

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor` / `裁判官` / `审判官` 호명)
- 종래 family-01 톤 보존 — `Mr. Yoon Tae-seong` / `Mr. Yoon Jeong-hu` / `ユン・テソンさん` / `ユン・ジョンフさん` / `尹泰成先生` / `尹正厚先生`
- `재판관님` / `Your Honor` / `判事様` / `审判官` 일관

### 3.2. 파티 NPC 영역

- 윤태성(A, confrontational): 격앙·결단·후 시인. cascade에서는 차분 톤, 끼어들기에서는 격앙
  - 본인 시점에서 윤정후 = "정후" / "제 동생" (판사 대상), 격앙 시 "윤정후!"
- 윤정후(B, affect_flattening): 평정·짧음·자기 보호. **outburst trigger에서만 잠시 흔들림**
  - 본인 시점에서 윤태성 = "형" / "저희 형" (판사 대상), 격앙 시 "윤태성!"

### 3.3. 어머니 호칭 (family-01 특이)

- 양 형제 모두 본인 어머니 = `어머니` / `우리 어머니` (자기 시점)
  - EN: `mother` / `our mother`
  - JA: `母` / `お母さん`
  - ZH-CN: `母亲` / `妈妈`
- 판사 → A/B의 어머니 = 외부 시점이므로 `윤태성 씨 모친` / `어머님` 권장
- 본인 가족 호칭 정책 (`feedback_family_address_speaker_perspective`): 본인은 자기 시점 호칭. 시댁/처가는 family-01에 없음 (형제 사건)

### 3.4. 단서 명칭 변경 (Cycle 5 신규)

`feedback_dossier_card_renamed_to_clue.md` 권위. player-visible text 단서 명칭:

| Layer | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 일반 | 단서 | clue | 手がかり | 线索 |
| evidence (구분) | 증거 | evidence | 証拠 | 证据 |

⚠ **evidence(증거)와 단서(clue)의 경계 흐림 회피**. evidence는 raw 자료 (e-1~e-N), 단서는 evidence 묶어 만든 추론 (dc-1~dc-N). 두 layer 경계 흐리는 표현(예: "this clue is actually evidence")은 사용 X.

### 3.5. dc-2 단서 라벨 변경 — 다국어 검토 + JA 보강

KO `줄인 유서` → `수정된 유언장`로 변경 완료. 외국어 baseline:

| Lang | 변경 전 | 변경 후 (자동 적용 / Codex 검토) |
|---|---|---|
| KO | 줄인 유서 | 수정된 유언장 (적용 완료) |
| EN | abbreviated will | **amended will** (자동 변환 적용 — 검토) |
| JA | (cardName 영역 누락) | **修正された遺言書** (Codex 신규 보강 — 6 dc-2 dossier entry에 cardName field 추가) |
| ZH-CN | 调低份额的遗嘱 / 缩减遗嘱 | **修订过的遗嘱** (자동 변환 적용 — 검토) |

JA dossier channel dc-2 entries에 `cardName: "修正された遺言書"` field 추가 필요. 다른 lang은 자동 변환 적용된 라벨 검토 (어색하면 더 자연한 표현으로 patch).

### 3.6. `cascade_from_card` trigger의 다국어 보존 (핵심)

본 batch entry 중 cascade trigger는 7개:
- w-1 cascade (priorCard:dc-1) — 2 variant
- d-2 cascade (priorCard:dc-1) — 2 variant
- e-3 cascade (priorCard:dc-1) — 2 variant
- dc-2 cascade (**priorCard:d-2** — dispute → dossier, 첫 사용) — 2 variant
- w-2 cascade (priorCard:dc-2) — 2 variant

다국어 번역 시:

- `trigger:cascade_from_card` tag → 그대로 (번역 X)
- `priorCard:dc-1` / `priorCard:d-2` / `priorCard:dc-2` tag → 그대로
- text 본문의 이전 카드 reference는 단서/쟁점 명 일관 번역:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[말년의 종이]` (단서) | `[Final-Days Papers]` | `[晩年の紙]` | `[晚年的纸]` |
| `공증 절차의 개입` (쟁점, d-2 cascade의 priorCard reference) | `intervention in the notarization process` | `公証手続きへの介入` | `对公证程序的介入` |
| `[수정된 유언장]` (단서) | `[Amended Will]` | `[修正された遺言書]` | `[修订过的遗嘱]` |

⚠ 카드명/쟁점명 baseline은 기존 ScriptedText의 dossierCard / dispute label 영역 (family-01.{lang}.json) 참조. 기존 번역과 일관 유지.

### 3.7. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:
- combination_result: 사용자 액션으로 시스템 deterministic 진입 — 판사 발견적 톤
- cascade_from_card: 이전 카드/쟁점 결과의 자연 연속 — 판사 정리적 톤 (이전 reference 명시 인용)
- npc_interjection: 상대측 NPC 적극 개입 — 본인 결백 강조 또는 의심 직접 발설
- emotional_outburst: 본인 단정 답변 + 호흡 흔들림 (B는 affect_flattening이라 살짝만)
- judge_auto_mention: 일정 turn fallback — 판사 결정·종결 (사실 진술, 평가 어휘 회피)

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.8. 재판관 어법 (Cycle 7 신규, 본 cycle 적용)

`feedback_judge_dispassionate_action_focused.md` 권위. 다국어 판사 entry에서도 정책 준수:

- 감정·가치 어휘 회피 ("선을 넘다" / "흐름" 등)
- 사실/행위/선후관계 중심 어휘
- "반증" → "관련" 중립 표현
- 증인 호출 동사 다양화 (`호출하겠습니다` 단일 반복 X — `summon` / `bring before the court` / `hear from directly` 등 다양화)

### 3.9. 진실 노출 정책 (Line A 영역)

`design_family01_truth_disclosure_policy.md` 권위 준수. **Line A는 그룹 1~5 surface 절대 금지**:

| 그룹 | KO 금지 표현 (다국어 모두 회피) |
|---|---|
| 1 출생 비밀 | 출생 비밀 / 친자가 아니다 / 배다른 / 아버지 피 / 형의 정체성 |
| 2 정후 돈 / 20년 송금 | 정후 돈 / 윤정후 돈 / 어머니 통장 경유 / 정기 지원금 / 3억원 / 20년 비밀 |
| 3 자필 90:10 | 자필 90:10 / 공증 60:40으로 축소 / 자기 몫 양보 / 비율 줄임 |
| 4 공장 양보 | 공장 양보 / 친자가 양보 / 형 자존심 |
| 5 유산 당연시 | 유산 당연시 / 보호 명분 / 어머니 뜻 왜곡 / 두 번 왜곡 |

KO에서는 모두 회피되어 있음. 다국어 번역 시 위 표현 직역 또는 우회 등장 회피.

---

## §4. surface-name gate 외국어 회귀 검출

KO에서 e-3 lockedName `[전 요양보호사 음성증언]` 노출 P0 4건 발견 → surfaceName `[전 돌봄 직원 음성]` 교체 적용 완료. 외국어도 동일 패턴 가능.

### 검출 방법

각 lang baseline (e-3 lockedName vs surfaceName) 확인 후 외국어 emergence_narrative entry text에 lockedName 등장 시 surfaceName으로 교체.

```
# e-3 lockedName / surfaceName baseline (family-01.case.ts 영역)
KO: name=전 요양보호사 음성증언 / surfaceName=전 돌봄 직원 음성
EN: name=Former caregiver audio testimony / surfaceName=Former care worker audio (baseline 영역 직접 확인)
JA: 동일 baseline 직접 확인
ZH-CN: 동일 baseline 직접 확인
```

### 외국어 entry 생성 시 self-check

- e-3 entry text 작성 시 surfaceName 사용 (lockedName 직접 X)
- 다른 evidence (e-1, e-2, e-4, e-5, e-6, e-7)도 동일 정책 — emergence narrative 영역은 baseline surfaceName 사용

---

## §5. 작업 단계

### 5.1. KO baseline 확인

```
git show main:src/data/scriptedText/family-01.json | grep -B2 -A60 "emerge-dc-1\|emerge-w-1\|emerge-d-2\|emerge-e-3\|emerge-dc-2\|emerge-w-2"
```

### 5.2. 외국어 emergence_narrative channel 추가

`src/data/scriptedText/family-01.en.json`, `.ja.json`, `.zh-CN.json` 모두 `channels.emergence_narrative` 신규 channel 추가 (KO와 동일 6 entry group × 54 variant 구조).

각 entry는 KO와 동일 구조 (id 동일, text 번역, behaviorHint 번역, tags 그대로).

### 5.3. dc-2 라벨 검토 + JA 보강

- EN/ZH-CN: dossier channel dc-2 cardName 값 + behaviorHint reference 영역 확인
  - 자동 변환 결과 어색하면 patch (`amended will` / `修订过的遗嘱` 둘 다 표준 표현이라 baseline OK 예상)
- JA: dossier channel dc-2 entries (6 entry) 에 `cardName: "修正された遺言書"` field 추가
  - behaviorHint 영역의 단서 reference도 일관 추가 (예: "修正された遺言書のコンボ" 등)

### 5.4. 검증

```
git status --short  # 외국어 3 file만 modified 기대
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.zh-CN.json','utf8'))"
npx tsc --noEmit
npm run build  # tsc -b --force + vite build
npm run -s qa:fast 2>&1 | tail -20  # static P0=0, route P0=0 확인 — RELEASE READY
```

⚠ qa:fast P0 발생 시 surface-name gate / truth-leak gate 위반 일 가능성 높음. `tmp/qa-runtime-gate-results/findings.json` 에서 severity:"P0" filter로 정확한 위치/메시지 식별 후 fix.

### 5.5. tag 처리

- tag values는 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:cascade_from_card`, `priorCard:dc-1` / `priorCard:d-2` / `priorCard:dc-2` 등 그대로)
- `callTerm:윤태성_씨` 같은 한국어 token도 그대로 유지 (시스템 lookup용)
- `judgeAddress:재판관님` / `callTerm:재판관님` 그대로
- `comboRecipeId:combine-1` / `combine-11` / `combine-5` 등 그대로

---

## §6. 산출

```
git add src/data/scriptedText/family-01.en.json \
        src/data/scriptedText/family-01.ja.json \
        src/data/scriptedText/family-01.zh-CN.json
git commit -m "i18n(family-01): sync Cycle 5 Line A — 절차/판단 6 emergence narrative (54 variant × 3 lang) + dc-2 label rename 다국어 + e-3 surface-name gate 외국어"
git push -u origin codex/family01-cycle5-multilang
```

main session이 fast-forward merge 처리.

---

## §7. 참고 — Cycle 6 진입 시 처리 예정

본 cycle 다국어 sync 완료 후 다음 cycle 진입 시 처리 예정:

| Cycle | Line | emergence | 처리 영역 |
|---|---|---|---|
| **6** | B (20년 돈) | d-3, dc-3, w-3 (3개) | 그룹 2 (정후 돈) surface 시작 영역 |
| **7** | C (비밀+최종) | d-4, e-7, dc-4, d-5, e-5, dc-5 (6개) | 그룹 1/3/4/5 본격 진입 (출생 비밀 + 자필 90:10 + 공장 양보 + 유산 당연시) |

본 cycle은 사건 표면 line만 처리. 그룹 1~5 surface 영역은 후속 cycle 영역.
