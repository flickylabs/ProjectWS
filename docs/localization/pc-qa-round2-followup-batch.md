---
name: pc-qa-round2-followup-batch
description: PC QA round 2 후속 batch — (1) LQA β KO polish 다국어 sync 누락 보강, (2) B-5 이준호 e-5 제시 응답 자연화, (3) B-7 통화기록↔은행직원 chain 제거 / 재설계.
metadata:
  origin: claude (CT main thread)
  anchor: 2b2c7801
  baseline_lqa_result: 2fadcece (codex/lqa-claude-authored-review)
  applied_ko_polish: 64724457
---

# PC QA Round 2 후속 Codex Batch 의뢰서

Anchor: `2b2c7801`
Base LQA KO polish commit: `64724457` (KO 단일언어 적용)
Base LQA result document: `docs/localization/lqa-claude-authored-review-result.md` (cherry-picked from Codex worktree, `2fadcece`)

3 영역 합본 의뢰서. Codex thread는 영역별로 worktree 분리해도 되고, 한 batch로 묶어도 됨.

---

## 영역 1 — 다국어 Sync 누락 보강

### 배경

`64724457` commit에서 Codex β LQA 결과를 적용했지만 **KO만 수정**하고 EN/JA/ZH-CN sync 누락. CT main이 변경한 카피 = Codex 다국어 번역 의무 영역이라는 사용자 정책 적용을 위해 보강 의뢰.

### Scope

해당 commit에서 변경된 i18n 키 + ScriptedText 영역 중 의미 변화가 미세하게 발생한 곳을 **EN / JA / ZH-CN 3언어 동기화**.

### 변경 카피 일람 (KO baseline = 현재 main `2b2c7801`)

#### A. court.ts (hidden verdict modal)
| Key | KO (current main) | Note |
|---|---|---|
| `pc.verdictAdvance.hidden.title` | 미발견 쟁점이 있습니다 | "존재" → "있습니다" 자연화. EN "Hidden Issues Remain" / JA "未発見の争点あり" / ZH-CN "存在未发现的争议点" 그대로 둘지, KO 톤에 맞춰 부드럽게 할지 검토. |
| `pc.verdictAdvance.hidden.body` | 현재 드러난 쟁점은 {visible}개입니다. 아직 발견하지 못한 쟁점이 {hidden}개 남아 있습니다. 그래도 바로 판결로 진행하시겠습니까? 미발견 쟁점이 남아 있으면 판결에 제약이 있을 수 있습니다. | 의미 동일, 표현 부드럽게. EN/JA/ZH-CN 의미 보존 확인. |
| `pc.verdictAdvance.hidden.confirm` | 판결로 진행 | EN "Proceed to Verdict" / JA "判決へ進む" / ZH-CN "进行判决" 그대로 두면 됨. |
| `pc.verdictAdvance.hidden.keepInvestigating` | 추가 심문 | EN "Continue Questioning" / JA "追加で尋問する" / ZH-CN "继续审讯" — 짧은 KO 톤에 맞춰 줄일지 검토 (예: JA "尋問を続ける"). |

#### B. layout.ts
| Key | KO (current main) | Note |
|---|---|---|
| `pc.phase.verdict.subtitle` | 판단한 내용을 바탕으로 선고를 내려주세요. | "기준으로" → "바탕으로" 자연화. EN/JA/ZH-CN 의미 보존. |
| `pc.court.combination.summary.mediation` | 판결 때 참고할 단서가 추가됐습니다. | "힌트" → "단서" 게임 톤 통일. EN "hint" → "clue"? JA "ヒント" → "手がかり"? ZH-CN "提示" → "线索"? KO 변경 의도에 맞춰 검토. |
| `pc.disputeRibbon.verdictProceed` | 판결로 진행 | EN/JA/ZH-CN 그대로. |

#### C. hotbar.ts
| Key | KO (current main) | Note |
|---|---|---|
| `pc.hotbar.advance.banner.interrogation` | 이제 판결로 진행할 수 있습니다 | EN/JA/ZH-CN 그대로. |
| `pc.hotbar.advance.interrogation` | 판결로 진행 | EN/JA/ZH-CN 그대로. |

#### D. tutorial.ts (spouse01 5 keys)
| Key | KO (current main) | Note |
|---|---|---|
| `pc.tutorial.spouse01.question-method-select.body` | 심문 방식을 골라주세요. [사실 추궁], [동기 탐색], [공감 접근] 중 하나면 돼요. | EN/JA/ZH-CN 이미 자연 — Codex 검토 후 sync 불요면 패스. |
| `pc.tutorial.spouse01.question-dispute-select.body` | 심문할 쟁점을 선택해주세요. | EN "Pick the issue you want to examine." 자연. JA "尋問する争点を選んでください。" 자연. ZH-CN "请选择要审讯的争议点。" 자연. → 패스 가능. |
| `pc.tutorial.spouse01.question-content-select.body` | 묻고 싶은 질문을 선택해주세요. | "내용" → "질문" 의미 변경. EN/JA/ZH-CN도 그에 맞춰 sync 필요? EN "Pick the question you want to ask." 이미 같음, JA/ZH-CN도 동일 의미. → 패스 가능. |
| `pc.tutorial.spouse01.evidence-select.body` | 심문에 사용할 증거를 선택해주세요. | EN "the evidence you want to bring into the interrogation" / JA "尋問に使う証拠" / ZH-CN "要用于审讯的证据" — 이미 동일 의미. → 패스 가능. |
| `pc.tutorial.spouse01.evidence-present-e2-to-b.title` | 증거를 보여줄 대상 | EN "Choose a Target" / JA "提示先を選択" / ZH-CN "选择出示对象" — 이미 자연. → 패스 가능. |
| `pc.tutorial.spouse01.evidence-present-e2-to-b.body` | 조사한 증거를 상대에게 제시하면 심문을 더 효과적으로 이어갈 수 있어요. | EN/JA/ZH-CN 이미 동일 의미. → 패스 가능. |

#### E. ScriptedText spouse-01.json `judgeq-d-1-motive_search-2-v1`
| 언어 | text (현재) | 검토 |
|---|---|---|
| ko | 이준호 씨, 장소를 숨긴 일보다 그 뒤의 사정을 밝히는 일이 더 두려웠던 이유를 들려주시겠습니까. | (방금 자연화 적용됨) |
| en | Mr. Lee, in relation to the Officetel visits and early-morning calls, please explain why you acted as you did, without folding it into the other party's fault. | 의미 차이 — KO는 "장소를 숨긴 일 vs 그 뒤의 사정"이고 EN은 "오피스텔 방문 + 새벽 통화 ↔ 상대방 책임" 구조. 어느 쪽이 정본인지 결정 후 sync. **권장: KO가 정본** (PC QA round 1+2 polish 누적). EN/JA/ZH-CN 모두 KO 정본에 맞춰 재번역. |
| ja | イ・ジュノさん、オフィステル訪問と早朝の通話について、相手の過ちにまとめず、ご自身がなぜその行動を取ったのか説明してください。 | 동일. |
| zh-CN | 李俊浩先生，围绕韩式商住公寓探访与凌晨通话，请说明您为什么那样行动，不要把它并入对方的过错。 | 동일. |

### 결정 필요 사항 (Codex thread에서 판단)

1. **DiscoveryFeedbackWatcher.tsx / Phase6_Mediation.tsx 인라인 KO** — 이 두 컴포넌트는 i18n 키가 아닌 KO 하드코딩. 처리 방향:
   - (a) PC가 KO-only 전제라면 sync 불필요 (현 상태 유지)
   - (b) 다국어 출시 대상이면 i18n 키로 추출 + 3언어 번역 추가 필요
   - **확인 필요**: 다른 PC 컴포넌트의 인라인 KO도 같은 상태인지 grep으로 점검 후, (a)/(b) 일괄 결정 권장.

2. **`pc.court.combination.summary.mediation`의 "힌트" → "단서" KO 변경** — 다른 언어도 "단서/clue" 톤으로 sync할지, "hint" 그대로 둘지 결정.

---

## 영역 2 — B-5: 이준호(A 측) 측에 e-5 제시 응답 자연화

### 배경

사용자 발견: "그 증거(e-5)를 이준호에게 제시했을 때 대답이 이상했었어."

이전 세션(commit `68973f49`)에서 B-5 결정으로 e-5 `subjectParty: 'both' → 'b'` 변경 = **박지연(B) 측에만 제시 가능하게 차단**했지만, **이준호(A) 측 응답 자체의 자연성/캐릭터 정합성은 미점검**.

### Scope

- **e-5 = 이준호의 개인 계좌 출금 내역** (`src/data/cases/generated/spouse-01.json` line 3170 부근)
- **a-e-5-* response variants** (A side = 이준호 측, e-5 evidence가 본인에게 제시됐을 때의 응답)
- 발견 위치 예시 (라인 번호는 KO):
  - `a-e-5-early-both-v1` ~ `v5` (line 69473–69685, stage = early × coupled = both)
  - `a-e-5-mid-both-v1` ~ `v5` (line 69695–69910)
  - `a-e-5-late-both-v1` ~ `v5` (line 69927–70135)
  - `a-e-5-early-stage1-v1` ~ `v5` (line 114446–114705)
  - 기타 stage1/stage2/stage3 × early/mid/late variants 추가 확인 권장
- 다국어 파일도 동일 ID로 검토: `spouse-01.en.json` / `spouse-01.ja.json` / `spouse-01.zh-CN.json`

### 점검 기준

1. **자연성**: 한국어 자연 발화. 번역체 / 신문체 X (`feedback_natural_korean_vs_translationese` 참조).
2. **캐릭터 일관성**: 이준호는 "본인 명의의 별도 개인 계좌"가 e-5의 본질. 본인은 이 계좌 존재를 알고 있고, "큰돈 출금 흔적" 사실도 알고 있는 상태. 응답은:
   - 회피 / 변명 / 방어적 침묵 / 부분 자백 등 lieState에 따른 진폭이어야 함
   - "처음 듣는 얘기다" / "그게 뭡니까" 등 **본인이 모를 수 없는 사실에 대한 무지 표현 X**
   - "아내(박지연)의 잘못으로 돌리기" 같은 책임 전가는 OK (lieState S2~S3 등)
3. **lieState 정합**: 응답이 해당 stage의 lieState 진행과 일관.
4. **B-5 결정 정합**: subjectParty='b' 차단되었으므로, 이준호 측에 e-5 제시 = 게임 흐름상 정상. 다만 응답 톤은 위의 1~3 기준.

### 작업 요청

1. **전수 점검**: `a-e-5-*` ID 모든 variants 검토. 부자연/캐릭터 불일치 발견 시 자연화.
2. **다국어 동시 적용**: 같은 ID의 EN/JA/ZH-CN도 KO 정본 기준으로 검토 + 필요 시 보정.
3. **diff 정리**: 변경 전/후 비교 표 출력.

---

## 영역 3 — B-7: 통화기록(e-3) ↔ 은행직원(w-2) chain 재설계

### 배경

사용자 발견: "통화기록에서 은행 직원 증인이 등장하는 게 이상하다. 은행 직원 증인은 계좌이체 내역에서 나와야 한다. 통화기록과 은행직원 증인은 너무 관계가 없어서 문제."

### 현재 데이터 진단 (`src/data/cases/generated/spouse-01.json`)

**Evidence 정의** (KO):
- `e-3` = **통화기록** (새벽 시간대 같은 번호 반복. 통화 상대 1명.)
- `e-5` = **이준호의 개인 계좌 출금 내역** (장기간 별도 관리 자금 + 큰 현금 출금)
- `e-6` = **투자방 텔레그램 + 송금 기록** (박지연 공동 적금 해지액 2,000만원 송금)
- `e-7` = **공동 적금 해지 서류** (해지 절차 기록)

**Witness w-2 = 은행 직원** (`unlockedByDossier: [dc-3, dc-4]`)

**Derived Dossier**:
- `dc-3` = "3,000만 원의 권한" (공동 적금 해지 권한 영역)
- `dc-4` = "2,000만 원의 수치" (이준호 개인 자금 행선지 영역)

**현재 w-2 unlock chain (3개)**:
| Recipe | Inputs | DiscoveryText | OutputId |
|---|---|---|---|
| **combine-3** | **e-5 + e-3** | "새벽 통화와 큰돈 출금 기록이 같은 시간대에 겹칩니다..." | dc-4 → w-2 unlock |
| combine-4 | e-6 + e-7 | "공동 적금 해지액과 투자방 송금액이 정확히 일치한다..." | dc-3 → w-2 unlock |
| combine-5 | stmt-a-protect + e-7 | "박지연 씨의 '제 몫을 지키려 했다'는 말과 위임장 처리 정황..." | dc-3 → w-2 unlock |

### 문제

**combine-3**가 e-3(통화기록) + e-5(개인 계좌 출금) 묶음. 이로 인해:
- discoveryText 첫 문장 "새벽 통화와 큰돈 출금" — 통화기록을 chain의 핵심 단서로 표시
- 이 dc-4가 w-2(은행 직원) unlock에 연결 → **사용자 인지: 통화기록 → 은행 직원 chain**
- 자연스러운 의미 chain은 "계좌 출금 → 자금 행선지 → 은행 직원 증언" 또는 "공동 적금 해지 → 은행 직원 증언". 통화기록은 e-3 단독 또는 d-1 (장소/관계 영역) chain에 속해야 함.

### 작업 요청

**combine-3을 재설계**하여 e-3(통화기록) 분리 + w-2 unlock chain에서 통화 의미 제거.

#### 권장 옵션 (Codex thread 판단)

**Option A (권장)**: combine-3의 inputs 변경
- `inputs: ["e-5", "e-6"]` = "이준호 개인 출금 + 박지연 투자방 송금"
- discoveryText 재작성 예시: "이준호 씨의 개인 계좌 출금과 박지연 씨의 투자방 송금 시점이 가까이 묶입니다. 자금이 한 방향으로 흘렀는지 직접 확인해야 합니다."
- outputId: dc-4 유지 ("2,000만 원의 수치" = 이준호 자금 행선지 카드와 일관)
- → 자금 행선지 chain이 자연스럽게 dc-4 → w-2 (은행 직원 증인) unlock

**Option B**: combine-3 outputId 변경
- inputs `[e-5, e-3]` 그대로 유지하되 outputId를 dc-4 → 다른 dossier (예: dc-2 또는 신규 dc) 변경
- "통화 + 출금"이라는 의미 자체는 보존하되 w-2 unlock chain에서 제외
- 단, 신규 dossier 필요 시 정의/카드/effects 모두 추가 작업

**Option C**: combine-3 삭제
- inputs `[e-5, e-3]` chain 자체를 제거. 다른 combine으로 dc-4 도출 path 유지하거나 dc-4 도달 어려워질 수 있음 — 사이드 이펙트 점검 필요.

→ **Option A를 권장**. 데이터 구조 변경 최소이면서 사용자 의도("계좌이체 ↔ 은행 직원" chain) 정확히 충족.

#### 부수 작업

1. **combine-3의 KO discoveryText 재작성** + EN/JA/ZH-CN sync.
2. **연결 영향 점검**: combine-3 변경 후
   - dc-4 unlock 경로가 다른 chain에서 가능한지 확인 (혹은 combine-3 단독 path였다면 게임 진행 차단 위험)
   - 통화기록(e-3)이 다른 적절한 dossier/dispute (예: d-1 = 장소/관계, dc-1 = 다른 카드)와 연결되는 chain이 있는지 확인. 없으면 e-3 단독 chain 보강 권고.
3. **truth-leak 회귀**: discoveryText 변경 시 사건 진실 누설 패턴 검출 통과 확인 (`node scripts/detect-truth-leak.cjs`).
4. **route simulator**: `npm run qa:fast`로 chain 변경에 따른 진행 차단 회귀 없는지 확인.

---

## 검증 명령어 (모든 영역 공통)

```bash
npx tsc -b --noEmit                                    # 타입 검증
npm run qa:fast                                        # 빠른 QA (P0=0 유지)
node scripts/detect-truth-leak.cjs                     # truth-leak 회귀 (baseline = 3 findings family-01)
npm run qa:lqa                                         # LQA strict gate (선택)
```

## 산출물

- 각 영역 fix 적용 후 단일 또는 영역별 commit
- 변경 요약 보고서 (영역 1 = sync 결과 / 영역 2 = a-e-5 점검 결과 / 영역 3 = chain 재설계 결정 + 적용)
- 본 의뢰서 파일은 작업 완료 후 result 문서 별도 추가 (`pc-qa-round2-followup-batch-result.md`) 또는 inline 채택 사실 추가

---

## 우선순위

1. **영역 3 (B-7)** = 데이터 구조 영역, 게임 흐름 영향. 가장 먼저 결정 + 적용.
2. **영역 2 (B-5)** = 응답 자연성. 영역 3 적용 후 동시에 진행 가능.
3. **영역 1 (다국어 sync)** = 위 두 영역 변경분 + 본 batch에서 KO만 적용된 분까지 함께 sync.

세 영역 모두 PC QA round 2 cycle을 닫는 작업. 가능하면 한 thread cycle 내에서 처리.
