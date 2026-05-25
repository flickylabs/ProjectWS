# Codex 의뢰 메시지 (사용자가 그대로 paste)

---

안녕하세요. 솔로몬 (한국어 법정 시뮬레이터 게임) 프로젝트의 **spouse-01 사건 evidence + dispute dual emergence ScriptedText 4언어 sync**를 요청드립니다.

## 첨부 자료

self-contained 폴더 (4 file 첨부):

1. **`README.md`** — 의뢰 배경 + 산출 형식 + 번역 가이드
2. **`ko-source.md`** — KO 권위 6 entries 본문 (emerge-e-10 4 variants + emerge-d-3 2 variants)
3. **`glossary.md`** — 게임 entity/인물/장소 4언어 용어 통일 가이드
4. **`polish-reality-check.md`** — 참조용 사본

## 의뢰 사항

`README.md` 정독 후, `ko-source.md`의 KO 권위 본문을 EN/JA/ZH-CN로 자연 번역하여 다음 3 파일에 entries 추가:

| 파일 | 추가 entries |
|---|---|
| `src/data/scriptedText/spouse-01.en.json` | 6 (emerge-e-10 × 4 + emerge-d-3 × 2) |
| `src/data/scriptedText/spouse-01.ja.json` | 6 |
| `src/data/scriptedText/spouse-01.zh-CN.json` | 6 |

총 **18 entries 신규 추가**.

## 산출 형식

각 외국어 json file의 emergence_narrative channel 영역에 entries 추가. KO 파일 (line 217067~217252)과 **동일 구조**:

```json
{
  "key": "emerge-e-10",
  "evidenceId": "e-10",
  "variants": [
    {
      "id": "emerge-e10-via-cascade-judge-mention-v1",
      "text": "(번역)",
      "behaviorHint": "(번역)",
      "tags": [/* KO와 동일 tags 그대로 — 변경 X */]
    },
    // ... 나머지 3 variants
  ]
},
{
  "key": "emerge-d-3",
  "disputeId": "d-3",
  "variants": [/* 2 variants */]
}
```

## 핵심 가이드 (자세한 것은 README 5+6 참조)

1. **KO 권위와 1:1 매핑**: entry `id` / `tags` **그대로 유지**. 추가/삭제/재구성 X. `text` / `behaviorHint`만 번역.
2. **게임 entity 명사 통일**: `glossary.md` 표 따름. 예:
   - "영수증 묶음" → "bundle of receipts" / "領収書の束" / "收据集"
   - "예비 부모 정서 도서" → "expectant-parent emotional guidance book" / "予定父母向け情緒ガイド本" / "准父母情绪指导书"
   - "내연녀 임신 의심" → "suspected pregnancy by the alleged mistress" / "内縁の妻の妊娠疑惑" / "情人怀孕嫌疑"
3. **자연 외국어**: court-room formal 표현 (EN court / JA 法廷形式 / ZH 法庭正式语). 직역체 회피.
4. **호칭 통일**:
   - `callTerm:이준호_씨` → "Mr. Lee Joon-ho" / "イ・ジュンホ氏" / "李俊浩先生"
   - `callTerm:재판관님` → "Your Honor" / "裁判官" / "审判官"
5. **진실 노출 정책 유지**: KO 권위에 노출 안 된 다음 lexeme은 외국어에도 surface 노출 X:
   - "내연녀 없음" / "no mistress" / "愛人なし" / "没有情人"
   - "박지연 난임" / "Park Ji-yeon infertility" / "パク・ジヨンの不妊" / "朴智妍不孕"
   - "난임 치료비" / "infertility treatment funds" / "不妊治療費" / "不孕治疗费"
   - "혼자 부모 될 마음 정리" 등 동기 관련 진실 표현
6. **길이**: 각 외국어 text는 KO 본문의 ±30% 허용 (UI text box overflow 주의).

## 산출 후

Codex 산출 → Claude가 외국어 파일 검증 (entry id 일치 / tags 일치 / 구조 일관) → `detect-truth-leak --strict` 검증 (4언어 진실 노출 0) → tsc + qa:fast + commit 진행합니다.

KO 파일 (`src/data/scriptedText/spouse-01.json`)의 신규 entries 본문은 `ko-source.md`에 그대로 인용되어 있습니다. KO 본문 자체는 이미 commit `124f3594`에 적용된 상태이므로 그대로 참조하여 외국어 entries만 추가하면 됩니다.
