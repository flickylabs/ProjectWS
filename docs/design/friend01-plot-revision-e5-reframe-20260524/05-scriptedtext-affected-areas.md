# 05 — ScriptedText 영향 영역 + reword 가이드

**대상 파일**: `src/data/scriptedText/friend-01.json` (242,969 lines, KO base)
**작업 본질**: e-5/d-3/dc-3/combine-3 영역의 KO entry text를 plot revision 정합으로 reword

EN/JA/ZH-CN 동일 영역은 본 brief의 KO 변경 commit 후 별도 Codex 다국어 sync worktree 진행.

---

## 영향 영역 grep 명령 (CT 세션 진입 시 수행)

### A. 채널·key 기반 entry 식별

```bash
# d-3 영역 (interrogation channel)
grep -n '"key": "[ab]|d-3|' src/data/scriptedText/friend-01.json | wc -l
# 예상: ~36 (a/b × S0~S5 × 3 question type)

# e-5 영역 (evidence_present channel)
grep -n '"key": "[ab]|e-5|' src/data/scriptedText/friend-01.json | wc -l
# 예상: ~28 (a/b × early/mid/late × stages)

# dc-3 영역 (dossier channel)
grep -n '"questionId": "dc-3"\|"dossierCardId": "dc-3"' src/data/scriptedText/friend-01.json
# 또는 grep으로 dc-3 직접

# combine-3 영역 (judge_evidence_combo channel)
grep -n '"combineId": "combine-3"\|"recipeId": "combine-3"' src/data/scriptedText/friend-01.json

# d-3 영역 (judge_question / judge_contradiction / mediation / aftermath 채널)
grep -n '"disputeId": "d-3"\|"|d-3|' src/data/scriptedText/friend-01.json
```

### B. 본문 키워드 grep (reword 대상 식별)

다음 keyword가 entry text/behaviorHint에 등장하면 reword 대상 후보:

| Before keyword (현 e-5 본질) | After keyword (새 e-5 본질) | 비고 |
|---|---|---|
| "아버지가 보낸 문자" | "아버지의 시도 흔적" 또는 "예비신랑이 떠벌린 흔적" | e-5 자료 자체 표현 |
| "예비신랑에게 보낸 문자" | "예비신랑이 회사에서 떠벌린 토로" | 자료 source |
| "다은이한테는 아직 말하지 마" | (삭제 또는 reword) | 현 e-5 depthStage 발췌 문구 |
| "사위 될 사람이면 이 정도는 믿어야지" | (삭제 또는 reword) | 현 e-5 original 발췌 문구 |
| "결혼 전에 잠깐만 도와주면 금방 돌려준다" | "다은이 아버지가 결혼 자금 좀 도와달래" | 떠벌림 인용으로 reframe |
| "경고하려" | "직접 연락해 막으려" / "결혼 위기 차단" | d-3 B 동기 reword |
| "확인하려" (d-3 S2 영역) | "직접 막아보려" | d-3 B 동기 reword |
| "돈 얘기를 꺼냈" / "돈을 빌려달라고 접근" | "결혼 자금 명목으로 접근을 시도" | d-3 A 영역 |
| "현재 문자와 과거 송금 흐름" | "떠벌림 흔적과 과거 송금 흐름" | dc-3 noteText/successEffects |

#### grep 명령 (본문 키워드)

```bash
grep -n '아버지가 보낸 문자\|예비신랑에게 보낸 문자\|다은이한테는 아직 말하지 마\|사위 될 사람\|결혼 전에 잠깐만 도와주면' src/data/scriptedText/friend-01.json

grep -n '경고하려\|돈을 빌려달라고 접근\|돈 얘기를 꺼냈' src/data/scriptedText/friend-01.json

grep -n '현재 문자와 과거 송금' src/data/scriptedText/friend-01.json
```

---

## reword 가이드라인 (channel별)

### `interrogation` channel (d-3 영역, ~36 entries)

- **NPC 발화 (B 영역)**: B character `affect_flattening` 보존. 자제 톤. "경고/확인" → "직접 막아보려/차단" 단어 정합. 톤 자체는 그대로.
- **NPC 발화 (A 영역)**: A character `premature_summary` 보존. "아버지 돈 접근 자체 부정" frame strict. 단어만 정합 ("돈 얘기를 꺼냈" → "접근을 시도했" 등). 단 S0~S2는 부정 frame 강하므로 단어 변경 영향 작음.
- **단계별 변경 폭**:
  - S0/S1: 부정/회피 영역. reword 최소.
  - S2: B의 "확인하려" → "직접 막아보려" 정합.
  - S3: B의 "경고하려" → "직접 연락해 막으려" / "결혼 위기 차단" 정합.
  - S4: 동기 영역. "표적 인식" frame 유지.
  - S5: 완전 자백. "접근을 시도하고" / "직접 연락해 막으려" frame.
- **호칭/어법**: 변경 없음 (재판관 호칭 "재판관님", 격식 어법 유지).

### `evidence_present` channel (e-5 영역, ~28 entries)

- **judge 질문 (e-5 제시 시점)**: "아버지가 예비신랑에게 보낸 문자를 어떻게 보십니까" → "예비신랑이 회사에서 토로한 캡처와 본인의 9일간 메시지를 어떻게 보십니까" 같이 자료 자체 표현 reword.
- **NPC 반응 (B)**: 자료 인정 시 자제 톤. "예전부터 알고 있던 문자" → "그 즈음 회사에서 들은 얘기를 듣고 직접 연락한 것" 같이 chain 표현.
- **NPC 반응 (A)**: 자료 거부 시 "아버지가 그런 문자 안 보냈어" → "아버지가 그런 일 시도한 적 없어" 같이 부정 frame 정합.
- **단계별 변경 폭** (lieBand별):
  - early: 자료 등재 직후 단순 반응. reword 작음.
  - mid: 자료 본문 인용 영역. depthStage 발췌 문구 ("다은이한테는 아직 말하지 마" 등) 정합 필요.
  - late: 자료 인정/거부 frame 완성. "결혼 자금 시도" frame 자연 정합.

### `dossier` channel (dc-3 영역, ~6 entries)

- **dossier label**: "같은 부탁" (변경 없음).
- **dossier description / noteText 인용 영역**: "현재 문자와 과거 송금 흐름" → "떠벌림 흔적과 과거 송금 흐름" 정합.
- **challenges 영역**: B의 답 영역에서 "혼자 막는 쪽을 택했" frame 유지 (자제 톤 + 차단 동기 정합).

### `judge_evidence_combo` channel (combine-3 영역, ~6 entries)

- **판사 발화 (조합 결과 직후)**: "아버지의 문자와 과거 송금이 같은 흐름" → "예비신랑이 떠벌린 흔적과 과거 송금이 같은 흐름" 정합.
- **dossier 등재 어법**: "단서 [같은 부탁]을 등록합니다" (label 그대로 유지).

### `judge_question` channel (d-3 영역, ~6 entries)

- **표면 질문**: 아버지 시도 영역 + B 차단 영역 정합.
- **재판관 어법**: [[feedback_judge_dispassionate_action_focused]] 권위 — "선을 넘다" / "흐름" 평가 어휘 회피. "정황" / "선후관계" 중립.

### `judge_contradiction` channel (d-3 영역)

- contradiction trigger text의 자료 인용 영역 정합.

### `mediation` channel (d-3 S4 영역)

- 화해 단계 발화 — "경고 의도가 받아들여진다" → "차단 의도가 받아들여진다" 정합.

### `aftermath` channel (d-3 S5 영역)

- 종결 발화 — "9일간의 경고" → "9일간의 차단 시도" 정합.

### `contradiction_pursuit` channel (d-3 영역)

- contradiction 추궁 dialogue 영역 정합.

---

## 권위 정책 (reword 시 self-check)

### [[feedback_judge_dispassionate_action_focused]] (Cycle 7 도입)

재판관 발화 영역에서:
- 감정·가치 판단 어휘 회피
- 사실/행위/선후관계 중심
- "관련" 중립 사용

### [[design_friend01_truth_disclosure_policy]] 그룹 2/3 영역

- 그룹 2 keyword (`아버지의 사기 / 투자 명목 사기 / 미상환 / 차용금 미상환`): d-3 S3 + d-4 S3+ 이상에서만 등장
- 그룹 3 keyword (`B 경고 의도 / 같은 패턴 반복`): d-3 S3+ 이상에서만 등장
- **본 reframe 후 "경고 의도"는 "차단 의도"로 reword되지만 group 3 본질 동일**. d-3 S3+ surface 유지.

### [[feedback_truth_leak_prohibition]] (잘못 패턴 #9)

- 사전 진술 (S0~S2)에 진실 keyword 등장 X
- e-5 reframe 후에도 동일 정책

### [[feedback_natural_korean_npc_active_voice]]

- NPC 적극 발화 5 차원 보존
- 자제 톤 (B character) 유지

### [[feedback_dossier_card_renamed_to_clue]]

- player-visible text에 "사건 카드" 등장 X, "단서"만 사용
- 다국어: clue / 手がかり / 线索

### [[feedback_family_address_speaker_perspective]]

- NPC 1인칭 발화 시 본인 가족 호칭 자기시점
- 본 reframe 영역은 호칭 영향 작음

---

## 적용 후 검증

```bash
npx tsc --noEmit
npm run build
npm run -s qa:fast
```

`qa:fast`가 RELEASE READY 보고하면 commit. P0 발견 시:
- truth-leak 영역: forbiddenKeywords 영역 자동 derive로 truthStages 변경이 반영. 새 단어 ("차단", "직접 막아보려")는 forbidden 영역 아님 → 통과
- surface-name gate: e-5 surfaceName 변경 ("아버지와 예비신랑의 문자" → "떠벌림 흔적과 9일간 메시지") 시 ScriptedText의 surfaceName 인용 entry 영역도 정합 필요

---

## 다국어 sync 영역 식별 (KO commit 후)

KO 변경 영역의 EN/JA/ZH-CN sync를 Codex 다국어 worktree에 의뢰. self-contained brief 추가 작성 영역:

```
docs/design/friend01-plot-revision-codex-multilang-20260524/
├── README.md
├── codex-multilang-sync.md
└── ...
```

본 의뢰서 영역 외 (CT 세션이 KO 적용 완료 후 별도 brief 작성).
