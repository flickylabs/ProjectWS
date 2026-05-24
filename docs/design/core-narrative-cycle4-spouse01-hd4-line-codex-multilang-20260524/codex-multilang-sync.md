# Codex Thread — spouse-01 Cycle 4 h-d4 line 다국어 sync

작성일: 2026-05-25
주체: Codex / ChatGPT (외부 AI 도구) — 사용자가 폴더 업로드 + prompt paste 방식
범위: 채널 `emergence_narrative` 의 Cycle 4 entry — e-8 (13) + e-9 (12) + dc-8 (13) + h-d4 (13) = 51 variants × 3 lang = **153 entry sync**

---

## §0. 사용 방식

본 의뢰서는 **외부 AI 도구 (ChatGPT / OpenAI Codex web 등)** 에 사용자가 직접 전달하는 방식. worktree spawn 또는 새 ClaudeCode 세션 불필요.

| 항목 | 조건 |
|---|---|
| 사용 도구 | ChatGPT / OpenAI Codex web Project 또는 채팅 첨부 |
| 입력 | 본 폴더 파일 11개 모두 업로드 (사용자가 ZIP 또는 개별) |
| Prompt | §7 paste-ready prompt 참조 |
| 출력 형식 | JSON 응답 (`output-cycle4-multilang.json`, 153 entry 배열) |
| 산출 처리 | 사용자가 JSON 응답 다운로드 → `result/output-cycle4-multilang.json` 저장 → 메인 Claude 세션에 알림 |
| 메인 Claude 후속 | spouse-01.{en,ja,zh-CN}.json 에 apply + tsc + build + qa:fast + commit + push |

---

## §1. 작업 배경

Core System narrative wrapper layer Cycle 4 — spouse-01 h-d4 line (비자금의 원래 목적 = 박지연 난임 치료비).

- KO commit: main HEAD `66444bc7` 시점에 51 entry (`src/data/scriptedText/spouse-01.json` channels.emergence_narrative.entries) 적용 완료
- 본 작업: EN/JA/ZH-CN sync 51 entry × 3 lang = 153 entry 작성
- 권위 brief: `docs/design/core-narrative-cycle4-spouse01-hd4-line-20260524/` (gpt-pro-brief.md + spouse01-tone-samples.md + batch7-reuse-spec.md) — 본 폴더는 다국어 sync 영역 별도 self-contained

### Cycle 4 처리 emergence (4개 — 단일 batch, cascade chain)

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 증거 | `e-8` | 이준호 휴대폰의 의학 검색 기록 | 4 (cascade / a-interject / b-outburst / fallback) | 13 |
| 증거 | `e-9` | 이준호의 보험사 견적 자료 (가입 없음) | 4 (cascade / a-interject / b-submit / fallback) | 12 |
| 단서 | `dc-8` | 이준호의 또 다른 침묵 | 4 (combo / cascade / b-outburst / fallback) | 13 |
| 쟁점 | `h-d4` | 비자금의 원래 목적 (hidden, legitimacyIssue) | 4 (cascade / b-outburst / a-confront / fallback) | 13 |

### h-d4 line cascade chain (4단계 — 가장 긴 chain)

```
[d-2 S5 = 비자금 사용처=형 자백 완료 — Cycle 2 영역, 본 cycle 전제]
  ↓
dc-3 (이준호의 비밀 개인 계좌, Cycle 2) ──→ e-8 (휴대폰 의학 검색)
                                            ↓
                                          e-9 (보험사 견적, 가입 0건)
                                            ↓
                                          dc-8 (이준호의 또 다른 침묵)
                                            ↓
                                          h-d4 (비자금의 원래 목적 = 박지연 난임 치료비)
```

### plot 본질 (다국어 번역 frame 이해 필수)

| Layer | 표면 (외도 frame) | 진실 (난임 치료비 frame) |
|---|---|---|
| **외부 시각** | 휴대폰 산부인과 검색 + 보험사 견적 = 외도 상대 임신/내연녀 수익자 의심 | 신혼 초기 박지연 난임 진단 후 출산 가능성을 혼자 알아봐 옴. 의사 친구 비공식 상담 + 보험 견적 모금. **가입 0건** |
| **A 측 (박지연)** | 외도 frame 강화 정점 (e-8 → e-9 → dc-8) → h-d4 결정적 직면 | h-d4 fire 후 frame 역전 직면 |
| **B 측 (이준호)** | 회피→자기방어→자백 폭발 progression | h-d4 4-b b-outburst에서 직접 자백 ("자기야… 신혼 초기에 난임 진단 받고…") |
| **재판관** | 중립 분석·중재 톤 (frame 충돌 표면화) | h-d4 4-d fallback 책임 split 톤 (Batch 7 시안 차용) |

책임 비중: **B 70 / A 30** (B 침묵·독단 우위, A 화제 회피 일부 책임).

---

## §2. KO baseline (main HEAD `66444bc7`)

### 영향 파일

```
src/data/scriptedText/spouse-01.json  channels.emergence_narrative
```

본 batch는 같은 channel.entries 배열에 4 새 key 추가 (emerge-e-8 / emerge-e-9 / emerge-dc-8 / emerge-h-d4). 기존 13 entry (Cycle 1/2/3) 유지. 총 17 entry / 216 variant.

### 51 entry 풀 list (main HEAD `66444bc7`, KO baseline 확정)

| # | Emergence | Trigger | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|---|
| 1 | **e-8** | cascade_from_card | emerge-e8-via-cascade-judge-mention-v1 | judge→b | priorCard:dc-3 — [이준호의 비밀 개인 계좌] 10년 누적이 형 관련 자금 사용보다 먼저, 휴대폰 의학 검색 검토 |
| 2 | e-8 | cascade_from_card | emerge-e8-via-cascade-b-response-v1 | b→judge | 일반적인 정보 검색, 설명할 내용 적음 (회피) |
| 3 | e-8 | cascade_from_card | emerge-e8-via-cascade-judge-decree-v1 | judge→all | [이준호 씨 휴대폰의 의학 검색 기록] 자료 등재 |
| 4 | e-8 | npc_interjection (a) | emerge-e8-via-a-interject-v1 | a→judge | A 끼어듦 — 산부인과 검색 한두 번 아님, 형 일로 모은 돈인데 설명 필요 (외도 frame 시작) |
| 5 | e-8 | npc_interjection (a) | emerge-e8-via-a-interject-judge-react-v1 | judge→a | 박지연 씨, 휴대폰 검색 기록 제출 가능 여부 |
| 6 | e-8 | npc_interjection (a) | emerge-e8-via-a-interject-a-response-v1 | a→judge | 새벽까지 이어진 기록도 정리 (외도 frame 보강) |
| 7 | e-8 | npc_interjection (a) | emerge-e8-via-a-interject-judge-decree-v1 | judge→all | [이준호 씨 휴대폰의 의학 검색 기록] 자료 등재 |
| 8 | e-8 | emotional_outburst (b) | emerge-e8-via-b-outburst-v1 | b→all | B 자기방어 폭로 — "제 휴대폰 보십시오. 형 일로 모은 돈, 다른 일 없습니다" (역설 진실 우회) |
| 9 | e-8 | emotional_outburst (b) | emerge-e8-via-b-outburst-judge-catch-v1 | judge→b | 본인이 휴대폰 검색 기록 직접 제시? |
| 10 | e-8 | emotional_outburst (b) | emerge-e8-via-b-outburst-b-admit-v1 | b→judge | …재판관님이 직접 보시면 알 일 (위축) |
| 11 | e-8 | emotional_outburst (b) | emerge-e8-via-b-outburst-judge-decree-v1 | judge→all | [이준호 씨 휴대폰의 의학 검색 기록] 자료 등재 |
| 12 | e-8 | judge_auto_mention | emerge-e8-via-judge-auto-decree-v1 | judge→all | 5턴 fallback — 비자금 10년 누적 + 휴대폰 의학 검색 정합, 자료 추가 |
| 13 | e-8 | judge_auto_mention | emerge-e8-via-judge-auto-b-respond-v1 | b→judge | 예, 받아들이겠습니다 |
| 14 | **e-9** | cascade_from_card | emerge-e9-via-cascade-judge-mention-v1 | judge→all | priorCard:e-8 — [이준호 씨 휴대폰의 의학 검색 기록]에 보험 검색 다수, 같은 시기 보험 상담 자료 확인 |
| 15 | e-9 | cascade_from_card | emerge-e9-via-cascade-b-response-v1 | b→judge | 견적만 받았고 가입한 적 없음 (사실 직접 surface) |
| 16 | e-9 | cascade_from_card | emerge-e9-via-cascade-judge-decree-v1 | judge→all | [이준호 씨의 보험사 견적 자료] 자료 등재 |
| 17 | e-9 | npc_interjection (a) | emerge-e9-via-a-interject-v1 | a→judge | A 끼어듦 — 보험 여러 곳 알아봄, 견적서 수익자 칸 공란, 누구를 위한지 (외도 frame 정점 — 수익자 의심 surface) |
| 18 | e-9 | npc_interjection (a) | emerge-e9-via-a-interject-judge-react-v1 | judge→a | 박지연 씨, 견적 자료 제출 가능 여부 |
| 19 | e-9 | npc_interjection (a) | emerge-e9-via-a-interject-a-response-v1 | a→judge | 견적서 사본 가지고 있음, 항목 확인 요청 |
| 20 | e-9 | npc_interjection (a) | emerge-e9-via-a-interject-judge-decree-v1 | judge→all | [이준호 씨의 보험사 견적 자료] 자료 등재 |
| 21 | e-9 | npc_interjection (b) | emerge-e9-via-b-submit-v1 | b→judge | B 자기 제출 — "견적서 제가 직접 제출하겠습니다. 외도였으면 진작 가입했죠. 견적만 받고 가입 0건" (frame 역설 surface) |
| 22 | e-9 | npc_interjection (b) | emerge-e9-via-b-submit-judge-react-v1 | judge→b | 견적 자료에 가입 흔적 없음 = 의미 있는 자료 |
| 23 | e-9 | npc_interjection (b) | emerge-e9-via-b-submit-judge-decree-v1 | judge→all | [이준호 씨의 보험사 견적 자료] 자료 등재 |
| 24 | e-9 | judge_auto_mention | emerge-e9-via-judge-auto-decree-v1 | judge→all | 3턴 fallback — 휴대폰 검색에 보험 다수, 보험 상담 자료 추가 |
| 25 | e-9 | judge_auto_mention | emerge-e9-via-judge-auto-b-respond-v1 | b→judge | 예, 받아들이겠습니다 |
| 26 | **dc-8** | combination_result | emerge-dc8-via-combo-judge-query-v1 | judge→b | combine-7 — 휴대폰 의학 검색 + 보험 견적 같은 시기·같은 영역, 형 관련 자금 사용과 분리된 준비. 공통 목적 설명 요청 (frame 충돌 직접 surface) |
| 27 | dc-8 | combination_result | emerge-dc8-via-combo-b-response-v1 | b→judge | 따로 설명할 일 아님 (회피 강화) |
| 28 | dc-8 | combination_result | emerge-dc8-via-combo-a-react-v1 | a→judge | **"외도 상대 임신을 대비한 준비가 분명합니다"** (외도 frame 최정점 — h-d4 직전 결정적 단정) |
| 29 | dc-8 | combination_result | emerge-dc8-via-combo-judge-decree-v1 | judge→all | [이준호의 또 다른 침묵] 단서 정식 등재 |
| 30 | dc-8 | cascade_from_card | emerge-dc8-via-cascade-judge-mention-v1 | judge→all | priorCard:e-9 — [이준호 씨의 보험사 견적 자료]와 [이준호 씨 휴대폰의 의학 검색 기록] 같은 시기·같은 영역, 공통 영역 단서 정리 |
| 31 | dc-8 | cascade_from_card | emerge-dc8-via-cascade-b-response-v1 | b→judge | 우연이 겹친 것뿐 (회피) |
| 32 | dc-8 | cascade_from_card | emerge-dc8-via-cascade-judge-decree-v1 | judge→all | [이준호의 또 다른 침묵] 단서 정식 등재 |
| 33 | dc-8 | emotional_outburst (b) | emerge-dc8-via-b-outburst-v1 | b→all | **"그게 아닙니다! 외도하고는 다른 일입니다! 그 검색이랑 견적은… 다른 일이라고요…"** (frame 충돌 자기 surface 정점, "다른 일" 반복) |
| 34 | dc-8 | emotional_outburst (b) | emerge-dc8-via-b-outburst-judge-catch-v1 | judge→b | 그 '다른 일'이 무엇인지 정리할 시점 |
| 35 | dc-8 | emotional_outburst (b) | emerge-dc8-via-b-outburst-b-admit-v1 | b→judge | …죄송합니다, 지금은 더 어려움 (h-d4 직전 마지막 침묵) |
| 36 | dc-8 | emotional_outburst (b) | emerge-dc8-via-b-outburst-judge-decree-v1 | judge→all | [이준호의 또 다른 침묵] 단서 정식 등재 |
| 37 | dc-8 | judge_auto_mention | emerge-dc8-via-judge-auto-decree-v1 | judge→all | 4턴 fallback — 공통 영역이 형 관련 자금 사용 영역과 분리, [이준호의 또 다른 침묵] 단서 등재 |
| 38 | dc-8 | judge_auto_mention | emerge-dc8-via-judge-auto-a-respond-v1 | a→judge | 예, 받아들이겠습니다 |
| 39 | **h-d4** | cascade_from_card | emerge-hd4-via-cascade-judge-query-v1 | judge→b | priorCard:dc-8 — [이준호의 또 다른 침묵] 단서의 두 자료가 형 관련 자금 사용과 별개 영역, 비자금의 원래 목적 새 쟁점 정리 |
| 40 | h-d4 | cascade_from_card | emerge-hd4-via-cascade-b-response-v1 | b→judge | "처음엔 다른 목적이 있었습니다. 더 말씀드리기 어렵습니다" (간접 인정만, 단어 회피) |
| 41 | h-d4 | cascade_from_card | emerge-hd4-via-cascade-judge-decree-v1 | judge→all | [비자금의 원래 목적] 쟁점 정식 부상 |
| 42 | h-d4 | emotional_outburst (b) | emerge-hd4-via-b-outburst-v1 | **b→a (부부 직접)** | ★★★ **유일한 진실 단어 surface entry** — "자기야… 그 돈은 처음엔 자기 거였어. 신혼 초기에 난임 진단 받고, 자기가 출산 화제 닫은 뒤로 나 혼자 의사 친구한테 물어보고 치료비랑 보장 견적 알아본 거야. 10년 가까이 모은 돈, 형 일 생기기 전부터" (부부 반말 + 진실 자백) |
| 43 | h-d4 | emotional_outburst (b) | emerge-hd4-via-b-outburst-judge-catch-v1 | judge→b | 본인이 직접 그 사실을 본 법정에 진술? |
| 44 | h-d4 | emotional_outburst (b) | emerge-hd4-via-b-outburst-b-admit-more-v1 | b→judge | "자기한테 한 번도 말 안 한 채로 혼자 결정해 왔습니다. 그게 제 잘못입니다" (책임 self-admission, "자기" 반말 호명 유지) |
| 45 | h-d4 | emotional_outburst (b) | emerge-hd4-via-b-outburst-judge-decree-v1 | judge→all | [비자금의 원래 목적] 쟁점 정식 부상 |
| 46 | h-d4 | npc_interjection (a) | emerge-hd4-via-a-confront-v1 | **a→b (부부 직접)** | ★★ "자기야, 그럼 이건 다 뭐야? 형 일도 아니고 외도도 아니라면, 도대체 뭐였어? 처음부터 다른 이유가 있었지?" (외도 frame 마지막 단정 + 부부 반말, 사용자 결정 수위 유지) |
| 47 | h-d4 | npc_interjection (a) | emerge-hd4-via-a-confront-judge-react-v1 | judge→b | 이준호 씨, 박지연 씨의 질문에 답하실 수 있겠습니까? (재판관 격식 환경 즉시 복귀) |
| 48 | h-d4 | npc_interjection (a) | emerge-hd4-via-a-confront-b-response-v1 | b→all | "예, 재판관님… 처음엔 다른 목적이 있었습니다. 자세한 건… 다음에 말씀드리겠습니다" (단어 회피, 다음 turn 양보) |
| 49 | h-d4 | npc_interjection (a) | emerge-hd4-via-a-confront-judge-decree-v1 | judge→all | [비자금의 원래 목적] 쟁점 정식 부상 |
| 50 | h-d4 | judge_auto_mention | emerge-hd4-via-judge-auto-decree-v1 | judge→all | ★★ **5턴 fallback — Batch 7 시안 차용**: "비자금의 원래 목적이 형 관련 자금 사용과 분리, 누가 더 상처받았는지를 가르는 문제 아님, 이준호 씨 부부가 함께 결정할 일을 혼자, 박지연 씨도 말하지 않은 시간, [비자금의 원래 목적] 쟁점 부상 + 함께 정리할 기회" (단어 surface 회피, sourceTone tag 보존) |
| 51 | h-d4 | judge_auto_mention | emerge-hd4-via-judge-auto-b-respond-v1 | b→judge | 예, 재판관님. 받아들이겠습니다 |

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역 (대부분 entry 47/51)

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor` / `判事様` / `审判官` 호명)
- 종래 spouse-01 톤 보존 — `Ms. Park (Park Ji-yeon)` / `Mr. Lee (Lee Jun-ho)` / `パク・ジヨンさん` / `イ・ジュノさん` / `朴智妍女士` / `李俊浩先生`
- 평가 어휘 회피 ([[feedback_judge_dispassionate_action_focused]]) — "외도였다니까" 같은 단정 X, "관련 자료" / "동일 시기 같은 영역" frame O

### 3.2. 파티 NPC 영역 (재판관 격식 환경 — entry 47/51)

- **박지연(A)**: 격앙·결단·확신. cascade에서는 차분 동의, 끼어들기/조합에서는 격앙. **본 cycle 영역 = 외도 frame 강화 정점 (e-8 a-interject / e-9 a-interject / dc-8 a-react)** → h-d4 4-c에서 부부 직접 발화 영역으로 분기
- **이준호(B)**: 회피→흘림→자기방어→체념. **e-8 b-outburst (자기방어) / e-9 b-submit (자기 제출) / dc-8 b-outburst (frame 충돌 surface) / h-d4 b-outburst (자백 폭발)**. 그 외엔 회피·말끝 흐림 일관

호칭: `재판관님` / `Your Honor` / `判事様` / `审判官` 일관.

### 3.3. ★★★ 부부 직접 발화 영역 (h-d4 4-b/4-c — 3 entry / 신규 다국어 정책)

본 cycle 신규 도입 영역 — `emerge-hd4-via-b-outburst-v1` (#42) + `emerge-hd4-via-b-outburst-b-admit-more-v1` (#44, "자기한테" 반말 유지) + `emerge-hd4-via-a-confront-v1` (#46) 3 entry.

**KO baseline (S5 자백 영역 호칭 정책 — [[design_spouse01_truth_disclosure_policy]]):**
- 부부 직접 호명: "자기 / 자기야"
- 자기 1인칭: "나" 또는 "저" (혼용 가능, 본 cycle은 "나")
- 종결: "…야? / …지? / …어 / …거야"

**다국어 적용 — 친밀체 (intimate register):**

| 화자 | KO (반말 + "자기야") | EN (intimate) | JA (친밀체) | ZH-CN (친밀어) |
|---|---|---|---|---|
| B→A #42 시작 | "자기야…" | "Honey…" or "Ji-yeon…" (이름 직접 호명도 친밀 OK) | "ジヨン…" or "ねえ…" | "智妍…" or "亲爱的…" |
| B→A #42 내용 | "그 돈은 처음엔 자기 거였어" | "That money — it was originally for you" | "あのお金は、最初は君のためだったんだ" | "那笔钱，最初是为你存的" |
| B→J #44 ("자기한테") | "자기한테 한 번도 말 안 한 채로" | "I never told you, not once" | "君に一度も話さないまま" | "我从来没跟你说过" |
| A→B #46 | "자기야, 그럼 이건 다 뭐야?" | "Honey, then what is all this?" or "Jun-ho, what is all this?" | "ジュノ、じゃあこれは全部なんなの？" or "ねえ、これは一体" | "俊浩，那这都是怎么回事？" |

⚠ 본 3 entry tag의 `register:casual` + `honorific:casual` + `callTerm:자기` 그대로 보존 (사용자 측 처리 — Codex는 text/behaviorHint만 번역).

**문화 차이 처리:**
- EN: 부부 호명에 "Honey/Baby/Darling" 또는 이름 직접 호명 (Park Ji-yeon은 "Ji-yeon"으로 친밀). 영어는 격식/반말 구분 약함 → 친밀 톤 + contraction (you're / what's) 위주
- JA: 부부 호명에 친밀체 "ねえ/あんた" 또는 이름 친밀 호명 (ジヨン / ジュノ). 종결 "...だよ / ...だろ?" 친밀체
- ZH-CN: 부부 호명에 "亲爱的/宝贝" 또는 이름 친밀 호명 (智妍 / 俊浩). 친밀어 표현

### 3.4. cascade_from_card trigger의 다국어 보존 (5/16 trigger 사용)

본 batch의 cascade entry (#1-3 e-8 / #14-16 e-9 / #30-32 dc-8 / #39-41 h-d4) = 4 cascade chain × 3 entry = 12 entry.

- `trigger:cascade_from_card` tag → 그대로 (번역 X)
- `priorCard:dc-3` / `priorCard:e-8` / `priorCard:e-9` / `priorCard:dc-8` tag → 그대로
- text 본문의 이전 entity reference는 entity명 일관 번역:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[이준호의 비밀 개인 계좌]` (Cycle 2 dc-3 label) | `[Mr. Lee's Hidden Personal Account]` | `[イ・ジュノの秘密の個人口座]` | `[李俊浩的秘密个人账户]` |
| `[이준호 씨 휴대폰의 의학 검색 기록]` (본 cycle e-8 surfaceName) | `[Mr. Lee's Phone Medical Search History]` | `[イ・ジュノさんの携帯電話の医学検索記録]` | `[李俊浩先生手机的医学搜索记录]` |
| `[이준호 씨의 보험사 견적 자료]` (본 cycle e-9 surfaceName) | `[Mr. Lee's Insurance Quote Documents]` | `[イ・ジュノさんの保険見積資料]` | `[李俊浩先生的保险报价资料]` |
| `[이준호의 또 다른 침묵]` (본 cycle dc-8 label) | `[Mr. Lee's Another Silence]` | `[イ・ジュノのもう一つの沈黙]` | `[李俊浩的另一种沉默]` |
| `[비자금의 원래 목적]` (본 cycle h-d4 name) | `[The Original Purpose of the Slush Fund]` | `[裏金の本来の目的]` | `[私房钱的原本目的]` |

⚠ entity 이름 baseline은 기존 ScriptedText의 evidence/dossierCard/dispute name 영역 (spouse-01.{lang}.json) 참조. 본 cycle 신규 4 entity (e-8/e-9/dc-8/h-d4) 명칭은 case.ts authority의 다국어 derive (`src/data/cases/generated/spouse-01.{lang}.json`) 영역 baseline 참조.

### 3.5. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:
- **combination_result** (dc-8 4-a, entries #26-29): 사용자 액션으로 시스템 deterministic 진입 — 판사 발견적 톤, frame 충돌 직접 surface
- **cascade_from_card** (5 chain, 12 entries): 이전 entity 결과의 자연 연속 — 판사 정리적 톤 (이전 entity 명시 인용)
- **npc_interjection** (a-interject 외도 frame 강화 / b-submit 자기 제출 / a-confront 부부 직접): A 격앙·요청 또는 B 자기 surface
- **emotional_outburst** (e-8 b-outburst 자기방어 / dc-8 b-outburst frame 충돌 / h-d4 b-outburst 자백 폭발): B 격앙·폭로
- **judge_auto_mention** (4 fallback, 8 entries): 3~5턴 fallback — 판사 결정·종결

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.6. 본인 가족 호칭 자기 시점 정책 ([[feedback_family_address_speaker_perspective]])

본 cycle 영역에서 B(이준호) 발화에 "형" 직접 surface 영역 등장 (d-2 S5 자백 후 영역이라 OK):
- entry #4 (A 발화) "형 일로 모은 돈이라면서" — A 시점, 형 직접 호명 OK
- entry #8 (B 자기 발화) "형 일로 모은 돈" — B 자기 시점, 형 직접 OK (S5 자백 영역)
- entry #42 (B 자백) "형 일 생기기 전부터 모은 돈" — B 자기 시점, 자연

다국어 적용:
- ✓ EN: "my brother / brother's situation" (B 자기 시점) / "your brother's situation" (A → B, 외부 시점 OK)
- ✓ JA: "兄 / 兄の件" (B 자기 시점) / "あなたのお兄さん" (A → B)
- ✓ ZH-CN: "我哥 / 哥的事" (B 자기 시점) / "你哥的事" (A → B)
- ✗ EN: "(my) brother-in-law" (X — 시댁 호칭, 아내 시점)
- ✗ JA: "義兄" (X — 아내 시점)
- ✗ ZH-CN: "大伯子" (X — 아내 시점)

### 3.7. 단서(clue) 명칭 정책 ([[feedback_dossier_card_renamed_to_clue]])

player-visible text 영역에서 **'단서'** 명칭 사용. 본 cycle 단서 등재 영역 (judge decree entry 4건 + dossier surface narrative):

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 단서 | clue | 手がかり | 线索 |

본 cycle 단서 등재 entry 4건:
- #29: "본 법정에 [이준호의 또 다른 침묵] 단서를 정식 등재합니다."
- #32: 동일
- #36: 동일
- #37: "본 법정은 [이준호의 또 다른 침묵]을 단서로 등재합니다."

다국어:
- EN: "This court officially registers the clue [Mr. Lee's Another Silence]."
- JA: "本法廷は手がかり[イ・ジュノのもう一つの沈黙]を正式に登録します。"
- ZH-CN: "本法庭正式登记线索[李俊浩的另一种沉默]。"

### 3.8. ★★★ 진실 노출 정책 (본 cycle 가장 엄격 영역)

[[design_spouse01_truth_disclosure_policy]] 권위 + 본 cycle 신규 h-d4 line 진실 단어 정책.

#### h-d4 fire 전 surface 절대 X (entries #1-41 + #46-51 = 50 entry)

다음 키워드는 **entry #42 (emerge-hd4-via-b-outburst-v1) 1개에만 surface 허용**:

| KO | EN (surface OK only in #42) | JA (only in #42) | ZH-CN (only in #42) |
|---|---|---|---|
| 박지연 난임 / 난임 진단 | "Ji-yeon's infertility / infertility diagnosis" | "ジヨンの不妊 / 不妊診断" | "智妍的不孕 / 不孕诊断" |
| 난임 치료비 / 치료비 | "infertility treatment funds / treatment funds" | "不妊治療費 / 治療費" | "不孕治疗费 / 治疗费" |
| 출산 가능성 / 출산 화제 / 출산 포기 | "possibility of having a child / topic of childbirth / giving up on childbirth" | "出産の可能性 / 出産の話題 / 出産を諦める" | "生育可能性 / 生育话题 / 放弃生育" |
| 의사 친구 / 비공식 상담 | "doctor friend / unofficial consultation" | "医師の友人 / 非公式な相談" | "医生朋友 / 非正式咨询" |
| 보장 견적 / 의료비 견적 | "coverage quote / medical expense quote" | "保障見積 / 医療費見積" | "保障报价 / 医疗费报价" |
| 신혼 초기 / 10년 가까이 모은 | "early in our marriage / saved for nearly 10 years" | "新婚の頃 / 10年近く貯めた" | "新婚初期 / 攒了将近10年" |

다국어 entry #42 예시 (full text 번역 — Codex가 자연 번역):

| Lang | text |
|---|---|
| KO (baseline) | "자기야… 그 돈은 처음엔 자기 거였어. 신혼 초기에 난임 진단 받고, 자기가 출산 화제만 나오면 문을 닫아버린 뒤로 나 혼자 의사 친구한테 물어보고 치료비랑 보장 견적을 알아본 거야. 10년 가까이 모은 돈이고, 형 일 생기기 전부터 모은 돈이야." |
| EN | "Honey… that money — it was originally for you. Early in our marriage, after the infertility diagnosis, after you closed yourself off whenever the topic of having a child came up, I started asking a doctor friend on my own and looking into treatment funds and coverage quotes. I saved for nearly ten years, and I started saving long before my brother's situation." |
| JA | "ねえ… あのお金は、最初は君のためだったんだ。新婚の頃、不妊診断を受けて、君が出産の話題が出るたびに心を閉ざしてから、僕は一人で医師の友人に聞いて、治療費や保障見積を調べてきたんだ。10年近く貯めたお金で、兄の件が起きる前から貯めてきたお金なんだ。" |
| ZH-CN | "智妍… 那笔钱，最初是为你存的。新婚初期，你接受了不孕诊断之后，每次一提到生育话题你就把心门关上，从那以后我一个人去问医生朋友，去打听治疗费和保障报价。这笔钱攒了将近10年，是哥的事发生之前就开始攒的。" |

⚠ entry #42 외 다른 entry에서 위 키워드 surface 시 P0 leak (진실 노출 정책 위반). Codex가 의역으로 우회 단어 사용 시도해도 ★ X. 본 키워드는 정확히 entry #42 영역에서만 surface, 다른 영역은 frame 단어 ("의학 영역 검색 / 보험 견적 / 같은 시기 / 분리된 준비") 사용.

#### 허용 frame 단어 (h-d4 fire 전 영역 사용 OK)

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 의학 영역 검색 / 산부인과 검색 | "medical-area searches / OB-GYN searches" | "医学領域の検索 / 産婦人科の検索" | "医学领域搜索 / 妇产科搜索" |
| 보험 견적 / 가입 0건 | "insurance quotes / zero enrollments" | "保険見積 / 加入0件" | "保险报价 / 0份保险" |
| 같은 시기 / 같은 영역 | "around the same time / in the same area" | "同じ時期 / 同じ領域" | "同一时期 / 同一领域" |
| 분리된 준비 / 다른 영역의 준비 | "a separate preparation / preparation in a different area" | "分かれた準備 / 別領域の準備" | "分开的准备 / 另一领域的准备" |
| 형 관련 자금 사용 | "the funds used for my brother's situation" / "your brother's situation" | "兄関連の資金使用" | "与哥相关的资金使用" |

A의 외도 frame 단정 발화는 자연 — entry #28 ("외도 상대 임신을 대비한 준비가 분명합니다"), entry #17 ("수익자 칸이 공란이었어요"):
- EN: "This is clearly preparation for the affair partner's pregnancy" / "The beneficiary box was blank"
- JA: "これは不倫相手の妊娠に備えた準備に違いありません" / "受取人欄が空欄でした"
- ZH-CN: "这分明是为外遇对象怀孕做的准备" / "受益人栏是空白的"

### 3.9. Batch 7 시안 톤 차용 다국어 (entry #50 — h-d4 4-d fallback)

entry #50 (`emerge-hd4-via-judge-auto-decree-v1`)는 Batch 7 mediation 시안 `mediation-h-d4-S4-responsibility-split-v1` 톤을 차용한 entry. tag `sourceTone:batch7-mediation-h-d4-S4-responsibility-split-v1` 보존.

핵심 frame 차용 영역:
- "누가 더 상처받았는지를 가르는 문제가 아닙니다" → "is not about deciding who was hurt more" / "誰がより傷ついたかを分ける問題ではありません" / "不是要分清谁更受伤的问题"
- "이준호 씨는 부부가 함께 결정할 일을 혼자 안아 왔고" → "Mr. Lee carried alone what the couple should have decided together" / "イ・ジュノさんは夫婦で一緒に決めるべきことを一人で抱えてきており" / "李俊浩先生独自承担了本应夫妻共同决定的事"
- "박지연 씨도 말하지 않은 시간이 있습니다" → "and Ms. Park also has time when she did not speak" / "パク・ジヨンさんも話さなかった時間があります" / "朴智妍女士也有沉默的时间"

단어 surface 회피 정책 (3.8) 그대로 적용 — entry #50도 박지연 난임/치료비 단어 surface X.

---

## §4. 작업 산출 — JSON 응답 형식

본 의뢰서를 받은 AI(Codex/ChatGPT)는 **JSON 응답 1개 파일** (`output-cycle4-multilang.json`) 작성. 153 entry 배열 (51 entry × 3 lang).

각 entry 구조:

```json
{
  "id": "emerge-e8-via-cascade-judge-mention-v1",
  "lang": "en",
  "text": "{번역된 text}",
  "behaviorHint": "{번역된 behaviorHint, 없으면 생략}"
}
```

### tag 처리 영역

외국어 entry의 tags는 KO와 동일 — 사용자 측에서 자동 복사 (메인 Claude 처리). AI는 `id` / `lang` / `text` / `behaviorHint` 만 응답하면 됨.

### 153 entry 분포

| lang | emerge-e-8 | emerge-e-9 | emerge-dc-8 | emerge-h-d4 | 합계 |
|---|---|---|---|---|---|
| en | 13 | 12 | 13 | 13 | 51 |
| ja | 13 | 12 | 13 | 13 | 51 |
| zh-CN | 13 | 12 | 13 | 13 | 51 |
| **합계** | **39** | **36** | **39** | **39** | **153** |

---

## §5. 메인 Claude 후속 (Codex 응답 도착 시)

사용자가 JSON 응답을 `docs/design/core-narrative-cycle4-spouse01-hd4-line-codex-multilang-20260524/result/output-cycle4-multilang.json` 에 저장하고 메인 세션에 알리면:

1. 메인 Claude가 `spouse-01.{en,ja,zh-CN}.json` channels.emergence_narrative.entries 에 4 새 key 추가 (id 매핑으로 KO tags 자동 복사)
2. `npx tsc --noEmit` PASS
3. `npm run build` PASS
4. `npm run -s qa:fast` RELEASE READY (static P0=0, route P0=0)
5. commit + push
6. Cycle 4 완료 보고 (HEAD hash + 다음 cycle 안내)

---

## §6. 자매 cycle / 영역 충돌 회피

본 cycle은 spouse-01 h-d4 line **단일 batch**. 자매 batch 없음.

병렬 진행 가능성 (영역 충돌 X — file 영역 분리):
- `friend-01` Cycle 8 (Line C 아버지 line, 8 emergence) — friend-01.{lang}.json만 변경
- `family-01` 후속 cycle — family-01.{lang}.json만 변경

본 sync는 `spouse-01.{en,ja,zh-CN}.json` 영역만 변경 → 다른 사건 영역과 ScriptedText file 영역 완전 분리.

CT 세션 (judge dispassionate sweep / cross-case polish 등) 병렬 운영 시: 본 cycle 8단계 (사후 통합) commit 후 CT 세션과 file 영역 분리 검토.

---

## §7. 사용자가 외부 AI에 paste할 Prompt

본 폴더 11개 파일 (README.md / codex-multilang-sync.md / 9 memory) 을 ChatGPT/Codex Project에 업로드한 후, 아래 prompt 그대로 paste:

```
첨부한 codex-multilang-sync.md 의뢰서대로 spouse-01 Cycle 4 h-d4 line
emergence narrative 외국어 sync 153 entry 작성.

- KO baseline: src/data/scriptedText/spouse-01.json 의 emerge-e-8 / emerge-e-9 / emerge-dc-8 / emerge-h-d4 4 key 51 variants
  (의뢰서 §2 표가 51 entry 풀 list — 모든 ID + speaker + 1줄 요약 포함)
- 다국어 번역 원칙 (§3.1~3.9 정독 필수):
  * 판사 격식 (Your Honor / 判事様 / 审判官) — §3.1
  * NPC dynamics (A 외도 frame 강화 정점 → h-d4 frame 직면 / B 회피→자기방어→자백 progression) — §3.2
  * ★★★ 부부 직접 발화 친밀체 (entry #42, #44, #46 — "자기야" 반말 → 친밀체 신규 적용) — §3.5 정밀 표 참조
  * cascade_from_card entity 호명 일관 (§3.4 표 5 entity baseline)
  * 본인 가족 호칭 자기 시점 (B 발화 "형" 자기 시점 OK, "brother-in-law/義兄/大伯子" X) — §3.6
  * 단서 명칭 (clue / 手がかり / 线索) — §3.7
  * ★★★ 진실 노출 정책 엄격 — entry #42 1개만 박지연 난임/치료비/의사 친구/신혼 초기/10년 모은 단어 surface 허용, 나머지 50 entry는 절대 surface X — §3.8 정밀 표 참조
  * Batch 7 톤 차용 (entry #50 — 책임 split frame 보존 + 단어 surface 회피) — §3.9
- 출력 형식: JSON 배열, 각 entry: {id, lang, text, behaviorHint?}
- 153 entry (51 × en/ja/zh-CN)
- 응답 파일명: output-cycle4-multilang.json

검토 우선순위 (self-check):
1. ★★★ entry #42 b-outburst (3 lang) — 박지연 난임/치료비 단어 정확한 다국어 surface + 부부 친밀체 호칭
2. ★★★ entry #1-41, #43-51 — 박지연 난임/치료비 단어 절대 X (의역 우회도 X) — frame 단어로 표현
3. ★★ entry #44 b-admit-more (3 lang) — "자기한테" 호칭 유지 (친밀체)
4. ★★ entry #46 a-confront (3 lang) — "자기야, 외도가 아니라면 도대체 뭐였어?" 부부 직접 발화 친밀체 + 외도 frame 마지막 단정 수위 유지
5. ★★ entry #50 judge_auto_decree (3 lang) — Batch 7 책임 split frame 차용 + 단어 surface 회피
6. ★ cascade entry (#1-3, #14-16, #30-32, #39-41) — priorCard entity 명칭 baseline 일관 (§3.4 표)
```

AI 응답 도착 후:
1. 응답 JSON을 `result/output-cycle4-multilang.json` 에 저장
2. 메인 Claude 세션에 "Cycle 4 다국어 응답 도착" 알림
3. 메인 Claude가 spouse-01.{en,ja,zh-CN}.json 에 자동 apply + 검증 + commit + push
