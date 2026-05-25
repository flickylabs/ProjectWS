# GPT Pro 의뢰 — spouse-01 d-3 forbiddenKeywords 4언어 권위 작성

작성일: 2026-05-25 · 의뢰 대상: GPT Pro (콘텐츠 권위 작성)

## 1. 의뢰 배경

spouse-01 사건에 2026-05-25 폴리싱 사이클에서 **misdirection 쟁점 d-3 ("내연녀 임신 의심")** 이 신규 추가되었다. 본 쟁점은 evidence + dispute dual emergence 메커니즘의 1차 적용 사례이며, e-10 ("B의 예비 부모 정서 도서 + 본인 필기 흔적") 과 컷씬급 동시 등장한다.

d-3는 진실이 "없음" frame (truth: false, 미스디렉션):
- 표면: 내연녀 임신 의심
- 진실: 내연녀 없음. B 본인이 박지연 난임 진단 후 아내에게 부담을 주지 않으려 혼자 부모 될 마음을 정리한 흔적 (h-d4 진실로 수렴)

현재 d-3 truthStages S0~S5 a/b party 각각의 `forbiddenKeywords`가 4언어 모두 빈 배열로 되어 있다. 다른 dispute(d-1, h-d3, h-d4)는 lieState 단계별로 진실 lexeme 차단 키워드를 정밀하게 구성하여 NPC 자유 발화 frame inject 영역에서 진실 노출을 통제한다. d-3도 동일 수준의 lieState 단계별 통제 일관성이 필요하다.

## 2. 의뢰 사항

S0 ~ S5 각 stage의 a party / b party 각각에 대해 KO/EN/JA/ZH-CN **forbiddenKeywords 4언어 array** 작성.

작성 권위는 **KO**. EN/JA/ZH-CN은 KO를 자연 번역. lexeme 단위 정확도 우선 (자유 발화 polish가 아니라 truth-keyword phrase 단위).

## 3. 산출 형식

산출은 두 영역:

### 3.1 case.ts patch 형식

```typescript
// S0
S0: {
  a: {
    // ...
    forbiddenKeywords: keywords(
      [/* KO array */],
      [/* EN array */],
      [/* JA array */],
      [/* ZH-CN array */],
    ),
    // ...
  },
  b: {
    // ...
    forbiddenKeywords: keywords([...], [...], [...], [...]),
    // ...
  },
},
// S1, S2, S3, S4, S5 동일
```

전체 12개 forbiddenKeywords 항목 (6 stage × 2 party).

### 3.2 (선택) 설계 의도 짧은 코멘트

각 stage별로 "왜 이 lexeme를 차단했는가" 1~2줄 메모. Claude가 case.ts apply 시 정확히 의도를 보존하도록 안내용.

## 4. 작성 가이드라인

### 4.1 lexeme 본성

`forbiddenKeywords`는 자유 발화 frame inject 영역에서 NPC가 절대 발화하면 안 되는 진실 lexeme이다.

- **명사구 / 짧은 phrase 단위** (예: `'난임 치료비'`, `'박지연 난임'`, `'혼자 부모 될 마음 정리'`)
- **자연 발화 가능 형태** (NPC 입에서 자연스럽게 나올 수 있는 형태)
- **lieState 단계별 점진 축소** (S0 = 광범위 차단, S5 = 거의 없음)
- **a party와 b party 각각 다름** (각자의 침묵 영역이 다름)

### 4.2 d-3 진실 핵심 lexeme 후보

- "내연녀 없음" / "내연녀 부재"
- "임신 사실 아님"
- "혼자 부모 될 마음 정리"
- "혼자 알아본 자료"
- "본인을 위한 책"
- "본인 정서 준비"
- "아내에게 알리지 않고 알아봄"
- "아내 부담 회피"
- "박지연 난임" (h-d4 진실 영역 — d-3 영역에서는 매우 강한 차단 필요)
- "난임 진단"

### 4.3 lieState 단계별 톤

[d3-truth-stages-source.md](./d3-truth-stages-source.md) 참조. 각 stage의 `admittedFact` / `allowedKeywords` / `answerFrame`을 보면 NPC가 어디까지 인정/회피하는지 명시되어 있다. forbiddenKeywords는 `allowedKeywords`의 정확한 반대 영역이어야 한다.

**S0** (단정 / 부정 frame) — 양쪽 모두 진실 핵심 강하게 차단
**S1** (단정 미세 완화 / 책 본 사실 인정) — 동기/원천 영역은 여전히 차단
**S2** (단정 부족 / 본인 자료 인정 시작) — 동기 회피 lexeme 차단
**S3** (frame 흔들림 / 침묵 동기 일부 인정) — 진실 정확한 표현 차단
**S4** (단정 잘못 인정 / 본인 부모 가능성 인정) — '난임' 정확 표현 마지막까지 보류
**S5** (완전 자백 — h-d4 진입점) — 거의 비움 (자백 완료)

### 4.4 reference 패턴

[hd4-reference-pattern.md](./hd4-reference-pattern.md) — 동일 사건의 h-d4 forbiddenKeywords가 4언어 권위 작성된 reference 영역. d-3는 h-d4와 truth 영역이 겹치므로 (둘 다 박지연 난임 수렴) 같은 lexeme 영역을 일부 공유할 수 있다.

## 5. 절차

1. GPT Pro 산출 → 사용자에게 전달 (case.ts patch 형식)
2. 사용자가 spot check (KO 자연성 + 4언어 일관성)
3. Claude가 case.ts apply (Edit tool)
4. derive --write 실행 (truth-leak-matrix.json 4언어 sync)
5. 검증 4종: `tsc --noEmit` / `npm run qa:fast` / `npm run detect-truth-leak -- --strict` / `npm run build`
6. commit

## 6. 다음 단계

본 작업 완료 후 우선순위 3 (Codex ScriptedText 4언어 sync) 별도 의뢰. 동일 폴더의 `../codex-multilang-sync-brief/` 참조.

## 7. 참고 메모리

- [[feedback-claude-korean-polish-limitation]] — Claude KO polish 한계 + GPT Pro 경유 정책
- [[feedback-gpt-pro-claude-review]] — GPT Pro 산출물 Claude 보정 필수
- [[feedback-external-brief-self-contained-folder]] — 자체 폴더 self-contained 정책
- [[design-spouse01-truth-disclosure-policy]] — spouse-01 진실 노출 정책
- 본 폴더 root README: [../README.md](../README.md)
