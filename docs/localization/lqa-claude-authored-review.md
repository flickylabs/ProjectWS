# Claude-authored KO copy — LQA review request

작성일: 2026-05-19
요청 배경: PC QA round 2 진행 중, Claude(메인 세션)가 직접 작성/추상화한 KO 카피에서 번역체·부자연 표현 우려가 사용자에게 지적됨. 예: `'억울함이 치솟으면서 형의 개인회생과 현금 전달 이유가 거칠게 쏟아진다'` 같은 표현이 "무형적 항목이 능동적으로 쏟아진다"는 한국어 자연성 위배. 사용자 권고 = 모든 Claude-authored 카피를 기록 → Codex LQA가 자연성/문맥/의미 검토.

본 파일은 PC QA round 2(2026-05-19) Claude가 새로 작성/수정한 KO 카피 목록과 위치, 의도, 검토 시 주의점을 정리. Codex β LQA thread가 이 목록을 review baseline으로 활용.

---

## 1. Tutorial step 카피 (신규 또는 변경, 4언어 모두)

검증 우선순위: HIGH (사용자 직접 접촉 + Flicky 마스코트 친근 톤 정책 기준).

### 1.1 신규 step (A-3 친절도 확장, 6건)
| Key | KO | 의도 | 위치 |
|---|---|---|---|
| `pc.tutorial.spouse01.emotion-trust-intro.title` | 감정과 신뢰 | 캐릭터 카드 spotlight | tutorial.ts |
| `.emotion-trust-intro.body` | 캐릭터의 감정과 신뢰 상태가 답변에 큰 영향을 줘요. 변화를 잘 살펴주세요. | 게임 메커닉 안내 | 동 |
| `.evidence-detail-open.title` | 증거 열람 | detail panel 안내 | 동 |
| `.evidence-detail-open.body` | 선택한 증거의 자세한 내용을 살펴보세요. 단서가 정리되어 있어요. | | 동 |
| `.combination-intro.title` | 증거 조합 | combinationLab 안내 | 동 |
| `.combination-intro.body` | 여러 증거를 조합하면 숨은 단서나 쟁점이 드러날 수 있어요. | | 동 |
| `.record-summary-intro.title` | 기록 정리 | 우측 패널 spotlight | 동 |
| `.record-summary-intro.body` | 진행 상황은 [기록 정리]에서 한눈에 확인할 수 있어요. | | 동 |
| `.speech-note-intro.title` | 발언노트 | 발언노트 즐겨찾기 spotlight | 동 |
| `.speech-note-intro.body` | 중요한 발언은 [발언노트 즐겨찾기]에 표시해 두면 다시 찾기 쉬워요. | | 동 |
| `.judge-observation-intro.title` | 재판관의 관찰 | observation panel spotlight | 동 |
| `.judge-observation-intro.body` | 실시간으로 발견된 단서는 [재판관의 관찰]에 표시돼요. | | 동 |

### 1.2 변경 step (튜토리얼 분기 + 마무리)
| Key | 신규 KO | 비고 |
|---|---|---|
| `.initial-statement-acknowledge.title` | 사전 진술 | "양측의 진술"에서 변경 (PC QA round 2) |
| `.question-method-select.title` | 심문 방식 선택 | 신규 분기 step |
| `.question-method-select.body` | 원하는 심문 방식을 선택해주세요. [사실 추궁], [동기 탐색], [공감 접근] 중 하나를 선택하시면 돼요. | |
| `.question-dispute-select.title` | 쟁점 선택 | 신규 분기 step |
| `.question-dispute-select.body` | 심문을 진행할 쟁점을 선택해주세요. | |
| `.question-content-select.title` | 질문 선택 | 신규 분기 step |
| `.question-content-select.body` | 심문을 진행할 내용을 선택해주세요. | |
| `.evidence-select.title` | 증거 선택 | 신규 분기 step |
| `.evidence-select.body` | 심문을 진행할 증거를 선택해주세요. | |
| `.evidence-present-e2-to-b.title` | 증거 제시 대상 선택 | 변경 (기존 "증거 제시") |
| `.evidence-present-e2-to-b.body` | 조사한 증거를 상대에게 제시하면 더 효과적인 심문을 진행할 수 있어요. | |
| `.tutorial-complete.body` | 자, 이제 직접 심문을 진행하며 진실을 찾고 합당한 판결을 내려주세요. | 사용자 명시 마무리 멘트 |

EN/JA/ZH-CN은 KO 새 의도에 맞춰 placeholder. 자연성·법정 톤 polish 후보.

---

## 2. 진입 배너 / 모달 카피 (4언어, A-1 / A-4 / hidden 모달)

| Key | 신규 KO | 의도 |
|---|---|---|
| `pc.hotbar.advance.interrogation` | 판결 진행 | 버튼 라벨 (기존 "판결 단계로 진행") |
| `pc.hotbar.advance.banner.interrogation` | 이제 판결을 진행할 수 있습니다 | 배너 텍스트 (신규 키) |
| `pc.verdictAdvance.hidden.title` | 미발견 쟁점 존재 | (hidden 모달은 제거됐으나 키는 유지) |
| `pc.verdictAdvance.hidden.body` | 현재 드러난 쟁점은 {visible}개입니다. 아직 밝혀지지 않은 쟁점이 {hidden}개 남아 있습니다. 그래도 바로 판결을 진행하시겠습니까? 미발견 쟁점 존재 시, 판결에 제약이 있을 수 있습니다. | 줄바꿈 합치고 끝 안내 추가 |
| `pc.verdictAdvance.hidden.confirm` | 판결 진행 | "그래도 판결 진행" → "판결 진행" |
| `pc.verdictAdvance.hidden.keepInvestigating` | 추가 심문 진행 | "더 조사하기" → "추가 심문 진행" |
| `pc.phase.mediation` | 판결 | "판결 진입" → "판결" (KO 한정) |
| `pc.phase.verdict` | 선고 | "판결" → "선고" (mediation과 구분) |
| `pc.phase.verdict.subtitle` | 판단 내용을 기준으로 선고를 내려주세요. | "판결" → "선고" 동기화 |
| `pc.court.combination.summary.mediation` | 판결에 참고할 힌트가 추가됐습니다. | "판결 진입" → "판결" |

### Phase6_Mediation.tsx hardcoded KO (A-1 통합)
- eyebrow: `판결` (기존 "판결 진입")
- title: `심문을 마치고 판결에 들어가시겠습니까?` (그대로)
- 본문: `심문을 마저 이어나갈지, 바로 판결에 들어갈지 결정합니다.` (그대로)
- 태그 (신규): `공개 쟁점 {N}` / `숨은 쟁점 {N}`
- 경고 (변경 / 신규):
  - 변경 (hasUnresolved): `아직 확정되지 않은 쟁점이 존재합니다. 이대로 선고하시겠습니까?`
  - 신규 (hasHiddenDisputes): `미발견 쟁점이 남아 있으면 선고가 불완전한 기록으로 평가될 수 있습니다.`
  - 기존 (hasUnresolved only): `선고는 가능하지만, 불완전한 기록으로 평가될 수 있습니다.`
- 액션 라벨: `추가 심리` / `판결 선고` (그대로)

---

## 3. Discovery / lieState 시스템 메시지 (B-6 / B-8)

| 위치 | 신규 KO | 의도 |
|---|---|---|
| DiscoveryFeedbackWatcher emergence card subtitle (chain) | `"{sourceName}" 흐름이 풀리며 다른 면이 보입니다` | d-2 emerge 시 d-1 chain 명시 |
| 동 body (chain) | `"{sourceName}" 쟁점의 진실에 다가가면서 "{disputeName}"이(가) 새 쟁점으로 부상했습니다. 아직 결론이 아닙니다. 관련 기록과 진술을 더 확인해 쟁점으로 다룰지 판단하십시오.` | |
| 동 sysMsg (chain) | `"{sourceName}" 흐름이 풀리면서 새 쟁점이 드러났다 — {disputeName}` | |
| emotional_burst lieState jump sysMsg | `감정이 무너지면서 진실에 가까워졌다 — {disputeName} 단계 {before} → {after}` | B-8 jump 안내 |

**주의:** "흐름이 풀리며", "다른 면이 보입니다", "감정이 무너지면서" 등 표현이 [feedback_natural_korean_vs_translationese] 정책에 부합하는지 검토. "{sourceName} 흐름이 풀리며" 가 "수식어 + 무형 항목 + 능동 동사" 패턴인지 확인.

대체안 후보:
- "{sourceName} 의심이 풀리면서 다른 쟁점이 함께 보입니다"
- "{sourceName}이(가) 정리되며 또 다른 면이 떠올랐습니다"

---

## 4. ScriptedText spot fix (단일 라인)

| 위치 | 신규 KO | 기존 KO | 의도 |
|---|---|---|---|
| `src/data/scriptedText/spouse-01.json:204121` (judgeq-d-1-motive_search-2-v1) | 이준호 씨, 장소를 숨긴 것보다 그 뒤 사정을 말씀하시기가 더 두려웠던 이유를 들려주시겠습니까. | 이준호 씨, 장소를 숨긴 것보다 형 이야기를 꺼내는 일이 더 두려웠던 이유를 들려주시겠습니까. | "형 이야기" truth-leak 추상화 |

**검토 요청:** "그 뒤 사정"이 자연 한국어인지. 또는 "다른 사정"·"못다 한 이야기" 등이 더 자연한지.

---

## 5. 사용자 명시 텍스트 (Claude가 작성한 것 아님 — 참고용)

다음 KO 카피는 사용자가 PC QA 발견 사항에 명시한 정확 텍스트. Claude가 작성한 게 아니므로 본 검토 범위 외:

- b-e-5-early-self-v3: `꼭 사용할 곳이 있었습니다. 하지만, 지금 말씀드리기는 어렵습니다.` (사용자 명시)
- e-7 restore_context: `메시지로 시험, 공부 이야기를 하고 있다. 당사자 외에 관련된 학생이 있는 것 같다.` (사용자 명시)
- 판결 진입 모달 카피, 친절도 확장 카피 다수: 사용자 직접 명시

---

## 6. 검토 요청

**Codex β1 (KO 자연성 thread 또는 신규)**:
1. 위 §1~§4 모든 KO 카피를 [feedback_natural_korean_vs_translationese] / [feedback_tutorial_copy_tone] / [feedback_revision_meaning_over_form] 정책 기준 검토.
2. 부자연 표현 발견 시 대체안 제시 (의미·맥락·자연성 보존).
3. 특히 "수식어 + 무형 항목 + 능동 동사" 패턴 (예: "X 이유가 거칠게 쏟아진다") 자동 검출 규칙 추가 권고.

**Phase 2 LQA β2~β10 (EN/JA/ZH-CN)**:
1. 위 §1~§4 KO 새 의도에 맞춘 EN/JA/ZH-CN 카피를 자연성·법정 톤·UI 라벨 통일 기준 검토.
2. 사용자가 본 부자연 KO 패턴이 외국어에서도 재발하지 않도록 검수.

**우선순위**: §1 tutorial 카피 → §2 모달/배너 → §3 시스템 메시지 → §4 scriptedText spot.

---

## 7. 관련 commit

- ea871e9f (Stage 1 카피/구조)
- 99e7cd72 (D2/D4 spot — 사용자 명시 텍스트, 본 검토 범위 외 일부)
- b719de79 (튜토리얼 UX — CSS only)
- 4f0d6eef (자동 advance off + ribbon layout)
- 081da705 (튜토리얼 step 분기 + 마무리 멘트)
- 8e87a90d (D3 truth-leak 추상화)
- 68973f49 (A-1 / A-4 / B-5)
- cf827491 (A-2 advance button inline)
- aca6af7b (B-6 chain context)
- 09830cae (B-8 lieState jump)
- b70555a5 (A-3 phase 1 — tutorial 6 step intro)
