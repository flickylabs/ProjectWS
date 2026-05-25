# Codex 의뢰 — spouse-01 dual emergence ScriptedText 4언어 sync

작성일: 2026-05-25 · 의뢰 대상: Codex (다국어 sync)

## 1. 의뢰 배경

spouse-01 사건에 2026-05-25 폴리싱 사이클에서 **evidence + dispute dual emergence 메커니즘**의 1차 적용 사례로 e-10 (예비 부모 정서 도서) + d-3 (내연녀 임신 의심) 동시 등장이 구현되었다. 이를 표현하는 ScriptedText emergence_narrative entries가 KO 권위로 작성되었으나 EN/JA/ZH-CN 영역에 아직 누락되어 있다.

본 의뢰는 KO 권위 6 entries (emerge-e-10 4 variants + emerge-d-3 2 variants)를 EN/JA/ZH-CN 언어 파일에 sync 추가하는 작업이다.

## 2. 의뢰 사항

| 파일 | 작업 |
|---|---|
| `src/data/scriptedText/spouse-01.en.json` | emerge-e-10 4 variants + emerge-d-3 2 variants 영어 entries 추가 (KO와 동일 구조) |
| `src/data/scriptedText/spouse-01.ja.json` | 동일 일본어 |
| `src/data/scriptedText/spouse-01.zh-CN.json` | 동일 중국어 간체 |

각 entry는 KO 권위 entry의 **`id` / `tags` 그대로** 유지하고 `text` / `behaviorHint`만 자연 번역. 추가/삭제/재구성 X.

## 3. 산출 형식

각 외국어 파일의 emergence_narrative channel 영역에 다음 구조로 entries 추가:

```json
{
  "key": "emerge-e-10",
  "evidenceId": "e-10",
  "variants": [
    {
      "id": "emerge-e10-via-cascade-judge-mention-v1",
      "text": "(EN/JA/ZH-CN 번역)",
      "behaviorHint": "(EN/JA/ZH-CN 번역)",
      "tags": [/* KO와 동일 tags 그대로 */]
    },
    // ... 나머지 3 variants
  ]
},
{
  "key": "emerge-d-3",
  "disputeId": "d-3",
  "variants": [
    {
      "id": "emerge-d3-via-cascade-judge-decree-v1",
      "text": "...",
      "behaviorHint": "...",
      "tags": [/* KO와 동일 */]
    },
    // ... 나머지 1 variant
  ]
}
```

배치 위치: KO 파일의 동일 emergence_narrative 영역 마지막 (현재 KO 파일 line 217067~217252 영역에 해당).

## 4. KO 권위

전체 KO 본문은 [ko-source.md](./ko-source.md) 참조.

요약:

### emerge-e-10 (4 variants)

| id | speaker | 내용 요약 |
|---|---|---|
| `emerge-e10-via-cascade-judge-mention-v1` | judge | 영수증 묶음의 교보문고 결제 흔적 → 정서 도서 발견 → 자료 등재 결정 (cutscene 시작) |
| `emerge-e10-via-cascade-a-react-v1` | a | "예비 부모 책이라니… 그럼 도대체 누구를 위해…" — 단정 흔들림 시작 |
| `emerge-e10-via-cascade-b-response-v1` | b | "제가 본 책이 맞습니다. 그 이상은 드리기 어렵습니다." — 부분 인정 + 동기 회피 |
| `emerge-e10-via-cascade-judge-decree-v1` | judge | "예비 부모 정서 도서·본인 필기 자료로 등재 + 내연녀 임신 의심 쟁점 정식 등록" — dual emergence decree |

### emerge-d-3 (2 variants)

| id | speaker | 내용 요약 |
|---|---|---|
| `emerge-d3-via-cascade-judge-decree-v1` | judge | "내연녀 임신 의심 쟁점 채택 + 동선이 같은 갈래에 모인 만큼 단정 없이 검토" |
| `emerge-d3-via-cascade-a-react-v1` | a | "외도 아니라면 도대체 무엇 때문에 그 책을 보고 그 병원을 갔다는 거죠." — A 단정 흔들림 본격 |

## 5. 번역 가이드라인

### 5.1 톤

- 재판관 (judge) 발화: **존댓말 + 절제된 톤**. "본 법정은 ~을 검토하겠습니다" / "본 사건의 신규 쟁점으로 정식 등록합니다" 등
- a/b 당사자 발화: **존댓말** (재판관 앞 발화). 감정 미세 노출 OK (`emotion:shaken`, `emotion:tense` 등 tags 참조)

### 5.2 자연성

- 직역체 회피. EN의 경우 자연스러운 court-room formal 영어. JA는 法廷形式. ZH-CN은 法庭正式语.
- 게임 내 entity 명사 통일 ([glossary.md](./glossary.md) 참조)
- ko 본문의 metaphor/뉘앙스를 자연 외국어로 재현

### 5.3 길이

각 외국어 text는 KO 본문의 자연 분량 (±30% 허용). 너무 길어지면 game UI text box overflow 위험.

## 6. 진실 노출 정책

본 emergence_narrative entries는 cascade trigger fire 시점 발화이므로 다음 lieState 가정:

- e-10 emergence 시점: d-1 lieState ≥ S2 (가족 돌봄 frame 부분 인지)
- d-3 emergence 시점: e-10 emergence와 동시 (S0 시작)

따라서 외국어 번역 시 다음 lexeme는 **여전히 차단** 영역:
- "내연녀 없음" / "no mistress" / "愛人なし" / "没有情人"
- "본인 정서 준비" / 본인 동기 관련 진실
- "박지연 난임" / "Park Ji-yeon infertility" 등 h-d4 영역 진실 핵심

해당 lexeme들이 emergence text에 surface로 노출되지 않도록 주의 (KO 권위에는 노출 없음. 외국어도 동일).

## 7. 절차

1. Codex 산출 → 사용자에게 cherry-pick 가능한 patch 또는 직접 file 수정
2. Claude가 외국어 파일 검증 (entry id 일치 / tags 일치 / 구조 일관)
3. `npm run detect-truth-leak -- --strict` 검증 (4언어 진실 노출 0)
4. tsc / qa:fast / build 검증
5. commit

## 8. 외부 참조

KO 권위 entries 위치 (전체 본문은 ko-source.md):
- `src/data/scriptedText/spouse-01.json` lines 217067~217252

## 9. 다음 단계

본 작업 완료 후 우선순위 2 (GPT Pro forbiddenKeywords) 산출이 도착하면 d-3 forbiddenKeywords 4언어가 case.ts에 반영된다. 그 후 추가 Codex sync 필요 X (case.ts → derive → truth-leak-matrix.json 자동 sync).

## 10. 참고 메모리

- [[feedback-claude-ko-needs-codex-multilang]] — KO 권위 + Codex 외국어 sync 정책
- [[design-spouse01-truth-disclosure-policy]] — spouse-01 진실 노출 정책
- [[feedback-external-brief-self-contained-folder]] — self-contained 폴더 정책
- 본 폴더 root README: [../README.md](../README.md)
