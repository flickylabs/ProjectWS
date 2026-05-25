# GPT Pro 의뢰 메시지 (사용자가 그대로 paste)

---

안녕하세요. 솔로몬 (한국어 법정 시뮬레이터 게임) 프로젝트의 **spouse-01 사건 d-3 misdirection 쟁점 forbiddenKeywords KO 권위 작성**을 요청드립니다.

## 첨부 자료

본 의뢰는 self-contained 폴더로 정리되어 있습니다 (4 file 첨부):

1. **`README.md`** — 의뢰 배경 + 절차 + 산출 형식 + 작성 가이드
2. **`d3-truth-stages-source.md`** — case.ts d-3 truthStages KO 본문 발췌 (lieState S0~S5 a/b party 각 admittedFact / allowedKeywords / answerFrame)
3. **`hd4-reference-pattern.md`** — 동일 사건 h-d4 dispute의 forbiddenKeywords 4언어 reference 패턴
4. **`polish-reality-check.md`** — 참조용 사본 (Phase 1 폴리싱 보고서)

## 의뢰 사항

`README.md`를 먼저 정독해주신 후, d-3 dispute의 S0~S5 a/b party 각 **forbiddenKeywords 4언어 array** (KO/EN/JA/ZH-CN) 총 **12 항목**을 작성해주세요.

산출 형식은 README.md의 3.1 영역에 명시된 case.ts patch 형식:

```typescript
S0: {
  a: {
    forbiddenKeywords: keywords(
      [/* KO array */],
      [/* EN array */],
      [/* JA array */],
      [/* ZH-CN array */],
    ),
  },
  b: { /* 동일 */ },
},
// S1, S2, S3, S4, S5 동일
```

## 핵심 가이드 (자세한 것은 README 4.1~4.4 참조)

1. **lexeme 단위 정밀**: '난임 치료비', '본인 정서 준비' 같은 명사구 / 짧은 phrase. 자유 발화에서 NPC 입에서 자연스럽게 나올 수 있는 형태.
2. **lieState 단계별 점진 축소**: S0 = 광범위 차단 (4~5 lexeme) → S5 = 빈 배열 (자백 완료).
3. **a / b party 차이**:
   - a (박지연) = 단정 frame 책임 영역
   - b (이준호) = 침묵 책임 영역 — 동기/원천 관련 lexeme 추가
4. **d-3 진실 핵심 lexeme 후보**:
   - "내연녀 없음", "임신 사실 아님", "혼자 부모 될 마음 정리", "본인 위한 책", "아내에게 알리지 않고 알아봄", "박지연 난임", "난임 진단"
5. **4언어 일관성**: KO 한 개 lexeme = EN/JA/ZH-CN 한 개 lexeme. KO 권위.
6. **reference 패턴**: `hd4-reference-pattern.md`의 4언어 lexeme 영역을 참고. d-3는 h-d4와 truth 영역이 겹치므로 일부 lexeme 공유 가능 (특히 '난임 치료비', '난임 진단' 등).

## 산출 후

산출이 도착하면 사용자가 spot check → Claude가 `src/data/coreCases/spouse-01.case.ts` apply → `derive --write` → 검증 4종 (tsc + qa:fast + truth-leak strict + build) → commit 진행합니다.

(선택) 각 stage별로 "왜 이 lexeme를 차단했는가" 1~2줄 메모를 함께 주시면 Claude가 case.ts apply 시 의도를 정확히 보존합니다.
