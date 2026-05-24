# Codex 의뢰서 — spouse-01 emergence_narrative '사건 카드 → 단서' 다국어 일괄 변경

작성일: 2026-05-24
주체: Codex / ChatGPT (외부 AI 도구) — 사용자가 폴더 업로드 + prompt paste 방식
범위: `src/data/scriptedText/spouse-01.{en,ja,zh-CN}.json` 의 emergence_narrative 채널에서 '사건 카드' 다국어 표현 → '단서' 다국어 표현 일괄 교체. **48 string × 자연 보정**.

---

## §0. 사용 방식

본 의뢰서는 외부 AI 도구에 사용자가 직접 paste하는 방식. worktree spawn / 새 세션 불필요.

| 항목 | 조건 |
|---|---|
| 사용 도구 | ChatGPT / OpenAI Codex web Project 또는 채팅 첨부 |
| 입력 | 본 폴더 파일 5개 모두 업로드 |
| Prompt | §4 paste-ready prompt 참조 |
| 출력 형식 | JSON 응답 (`output-spouse01-clue-rename.json`, 16 entry × 3 lang 변경 영역) |
| 산출 처리 | 사용자가 JSON 응답 다운로드 → `result/output-spouse01-clue-rename.json` 저장 → 메인 Claude 세션에 알림 |

---

## §1. 작업 배경

family-01 cycle 5 시점에 결정한 명칭 변경 정책 ([feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md)):

- player-visible text 영역의 'dossier card / 사건 카드' → '단서' 명칭 변경
- 내부 코드/스키마 식별자 (`DossierCard` type / `dossierCards` field / `dc-*` id) 변경 X
- 다국어 사전:
  | KO | EN | JA | ZH-CN |
  |---|---|---|---|
  | 단서 | clue | 手がかり | 线索 |

KO는 main HEAD `cb770125` 시점에 일괄 변경 완료 (Cycle 1+2+3 spouse-01.json emergence_narrative 영역 20 entry).

본 작업은 그 외국어 sync — Cycle 1/2 spouse-01.en.json / .ja.json / .zh-CN.json 영역 명칭 일괄 교체 (Cycle 3 외국어는 별도 sync에서 처리, 본 작업 대상 X).

### 증거(evidence) vs 단서(clue) 경계 — 다국어 핵심

두 영역은 게임 메커니즘상 다른 layer:
- 증거 (evidence, e-1 ~ e-N) = raw artifact
- 단서 (clue, dc-1 ~ dc-N) = 추론 결과

다국어 사전:
| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 증거 | evidence | 証拠 | 证据 |
| 단서 | clue | 手がかり | 线索 |

두 layer 경계 흐리는 표현 회피.

---

## §2. 변경 영역 정확 list (16 entry × 3 lang)

### EN (`src/data/scriptedText/spouse-01.en.json`)

| # | entry id | field | 현재 표현 | 변경 후 |
|---|---|---|---|---|
| 1 | emerge-dc7-via-combo-judge-decree-v1 | text | "the case card" | "the clue" |
| 2 | emerge-dc7-via-cascade-judge-decree-v1 | text | "the case card" | "the clue" |
| 3 | emerge-dc7-via-b-interject-judge-decree-v1 | text | "the case card" | "the clue" |
| 4 | emerge-dc7-via-judge-auto-decree-v1 | text | "case card" | "clue" |
| 5 | emerge-dc4-via-combo-judge-decree-v1 | text | "the case card" | "the clue" |
| 6 | emerge-dc4-via-cascade-judge-mention-v1 | text | "as a follow-up case card" | "as a follow-up clue" |
| 7 | emerge-dc4-via-cascade-judge-decree-v1 | text | "the case card" | "the clue" |
| 8 | emerge-dc4-via-cascade-judge-decree-v1 | behaviorHint | "independent case card" | "independent clue" |
| 9 | emerge-dc4-via-a-outburst-judge-decree-v1 | text | "the case card" | "the clue" |
| 10 | emerge-dc4-via-judge-auto-decree-v1 | text | "case card" | "clue" |
| 11 | emerge-dc3-via-combo-judge-decree-v1 | text | "as a case card" | "as a clue" |
| 12 | emerge-dc3-via-cascade-judge-decree-v1 | text | "as a case card" | "as a clue" |
| 13 | emerge-dc3-via-cascade-judge-decree-v1 | behaviorHint | "separate case card" | "separate clue" |
| 14 | emerge-dc3-via-a-interject-judge-decree-v1 | text | "as a case card" | "as a clue" |
| 15 | emerge-dc3-via-judge-auto-decree-v1 | text | "as a case card" | "as a clue" |
| 16 | emerge-w2hd3-via-cascade-judge-mention-v1 | behaviorHint | "already opened case card" | "already opened clue" |

자연 보정 검토 영역:
- 영문 관사 (a/the) 보존
- 주변 어법 (예: "formally enters X as a clue") 자연 유지

### JA (`src/data/scriptedText/spouse-01.ja.json`)

| # | entry id | field | 현재 표현 | 변경 후 |
|---|---|---|---|---|
| 1 | emerge-dc7-via-combo-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 2 | emerge-dc7-via-cascade-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 3 | emerge-dc7-via-b-interject-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 4 | emerge-dc7-via-judge-auto-decree-v1 | text | "事件カード" | "手がかり" |
| 5 | emerge-dc4-via-combo-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 6 | emerge-dc4-via-cascade-judge-mention-v1 | text | "後続の事件カード" | "後続の手がかり" |
| 7 | emerge-dc4-via-cascade-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 8 | emerge-dc4-via-cascade-judge-decree-v1 | behaviorHint | "独立した事件カード" | "独立した手がかり" |
| 9 | emerge-dc4-via-a-outburst-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 10 | emerge-dc4-via-judge-auto-decree-v1 | text | "事件カード" | "手がかり" |
| 11 | emerge-dc3-via-combo-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 12 | emerge-dc3-via-cascade-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 13 | emerge-dc3-via-cascade-judge-decree-v1 | behaviorHint | "別の事件カード" | "別の手がかり" |
| 14 | emerge-dc3-via-a-interject-judge-decree-v1 | text | "事件カード" | "手がかり" |
| 15 | emerge-dc3-via-judge-auto-decree-v1 | text | "事件カード" | "手がかり" |
| 16 | emerge-w2hd3-via-cascade-judge-mention-v1 | behaviorHint | "すでに開かれた事件カード" | "すでに開かれた手がかり" |

자연 보정 검토:
- 조사 자연 유지 ("〜を / 〜として / 〜の" 등)
- 어색한 영역 자연 보정

### ZH-CN (`src/data/scriptedText/spouse-01.zh-CN.json`)

⚠ 현재 zh-CN 영역은 "事件卡" / "案件卡" / "案件卡片" 표현 혼재. 일괄 "线索"로 통일.

| # | entry id | field | 현재 표현 | 변경 후 |
|---|---|---|---|---|
| 1 | emerge-dc7-via-combo-judge-decree-v1 | text | "事件卡" | "线索" |
| 2 | emerge-dc7-via-cascade-judge-decree-v1 | text | "事件卡" | "线索" |
| 3 | emerge-dc7-via-b-interject-judge-decree-v1 | text | "事件卡" | "线索" |
| 4 | emerge-dc7-via-judge-auto-decree-v1 | text | "事件卡" | "线索" |
| 5 | emerge-dc4-via-combo-judge-decree-v1 | text | "案件卡" | "线索" |
| 6 | emerge-dc4-via-cascade-judge-mention-v1 | text | "后续案件卡" | "后续线索" |
| 7 | emerge-dc4-via-cascade-judge-decree-v1 | text | "案件卡" | "线索" |
| 8 | emerge-dc4-via-cascade-judge-decree-v1 | behaviorHint | "独立案件卡" | "独立线索" |
| 9 | emerge-dc4-via-a-outburst-judge-decree-v1 | text | "案件卡" | "线索" |
| 10 | emerge-dc4-via-judge-auto-decree-v1 | text | "案件卡" | "线索" |
| 11 | emerge-dc3-via-combo-judge-decree-v1 | text | "事件卡" | "线索" |
| 12 | emerge-dc3-via-cascade-judge-decree-v1 | text | "事件卡" | "线索" |
| 13 | emerge-dc3-via-cascade-judge-decree-v1 | behaviorHint | "单独事件卡" | "单独线索" |
| 14 | emerge-dc3-via-a-interject-judge-decree-v1 | text | "事件卡" | "线索" |
| 15 | emerge-dc3-via-judge-auto-decree-v1 | text | "事件卡" | "线索" |
| 16 | emerge-w2hd3-via-cascade-judge-mention-v1 | behaviorHint | "已经开启的案件卡片" | "已经开启的线索" |

자연 보정 검토:
- 어법 자연 ("登记...线索" / "确认为单独线索" 등)
- 어색한 영역 자연 보정

---

## §3. 작업 산출 — JSON 응답 형식

각 변경된 entry의 전체 text / behaviorHint를 정확히 반환:

```json
[
  {
    "id": "emerge-dc7-via-combo-judge-decree-v1",
    "lang": "en",
    "field": "text",
    "newValue": "This court formally enters the clue [Cancellation of the ₩20M Joint Savings]."
  },
  {
    "id": "emerge-dc4-via-cascade-judge-decree-v1",
    "lang": "en",
    "field": "behaviorHint",
    "newValue": "Fixes the follow-up funds outcome as an independent clue. The Judge declares it plainly, without emotion."
  },
  ...
]
```

- **48 entry** (16 변경 영역 × 3 lang)
- 각 entry는 한 string 단위 (field 별로 분리). dc-4 cascade-decree처럼 text와 behaviorHint 둘 다 변경 영역인 entry는 2 entry로 응답.

---

## §4. 사용자가 외부 AI에 paste할 Prompt

본 폴더 5개 파일을 ChatGPT/Codex Project에 업로드한 후, 아래 prompt 그대로 paste:

```
첨부한 codex-multilang-clue-rename.md 의뢰서대로 spouse-01 emergence_narrative
외국어 영역 '사건 카드 → 단서' 다국어 명칭 변경 일괄 작성.

- 변경 영역: 의뢰서 §2 표 정확히 (EN 16 + JA 16 + ZH-CN 16 = 48 string)
- 다국어 사전:
  * KO 단서 = EN clue / JA 手がかり / ZH-CN 线索
- 자연 보정 (어색한 어법 자연 정리)
- evidence(증거) vs clue(단서) 두 layer 경계 흐리는 표현 회피
- 출력 형식: JSON 배열, 각 entry: {id, lang, field, newValue}
- newValue는 변경된 string의 전체 값 (해당 field text 또는 behaviorHint 전체)
- 응답 파일명: output-spouse01-clue-rename.json
```

AI 응답 도착 후:
1. 응답 JSON을 `result/output-spouse01-clue-rename.json` 에 저장
2. 메인 Claude 세션에 "spouse-01 단서 명칭 외국어 sync 응답 도착" 알림
3. 메인 Claude가 spouse-01.{en,ja,zh-CN}.json 에 자동 apply + 검증 + commit + push

---

## §5. 메인 Claude 후속 (Codex 응답 도착 시)

1. JSON 응답 읽어 48 entry 일괄 apply (각 lang file의 해당 id/field에 newValue 적용)
2. JSON valid 확인
3. `npx tsc --noEmit` PASS
4. `npm run build` PASS
5. `npm run -s qa:fast` RELEASE READY (P0=0)
6. commit + push
