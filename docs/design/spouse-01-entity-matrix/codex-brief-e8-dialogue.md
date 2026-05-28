# Codex 인계 브리프 — e-8 답변 scripted 재작성 + 비자금 라인 orphan scriptedText 정리

발신: spouse-01 manual 테스트·수정 thread (2026-05-28). 본 작업은 ScriptedText KO 직접 작성이라 Codex thread 에서 진행 (정책: feedback-claude-korean-polish-limitation).

---

## 배경 — e-8 「주차 영수증」 현재 설정 (2026-05-28 재설계 반영)

- **증거명**: 「주차 영수증」 (name=surfaceName 동일). 실체 = 「헤라 여성 메디컬 센터」(여성 전문 병원) 주차 영수증, 발급처 인쇄 오염.
- **등장 경로**: 「출산 준비 도서」(e-10) 조사 2단계(목차 탐색) 도달 시 자동 등장 — 책 목차 사이에 끼워져 있던 것을 발견. (useActionDispatch.handleEvidenceInvestigate hook)
- **proves**: d-3 「내연녀 임신 의심」 (misdirection). ※ 기존 h-d4 link 은 비자금 라인 정리로 제거됨.
- **조사 3단계 재판관 질문**(case.ts e-8 investigationStages stage 3): "주차 영수증의 방문처 이름은 제대로 보이지 않지만, 주소로 확인한 결과 여성 병원으로 보여집니다. 이 곳에 방문하신 목적이 무엇입니까?"
- **진실**: 이준호가 박지연 난임 진단 후, 아내 모르게 혼자 출산 가능성을 알아보러 여성 병원을 단독 방문한 흔적. 내연녀·외도 아님. (d-3 misdirection 은 d-1 가족 돌봄 진실 확정 시 무너짐.)

## 문제 — b-e-8 답변 pool 이 stale

`src/data/scriptedText/spouse-01.json` 의 b-e-8 답변 8개(`b-e-8-early-v1~v4`, `b-e-8-mid-v1~v2`, `b-e-8-late-v1~v2`)는 **옛 e-8(휴대폰 의학 검색 기록 / 돈·자료 frame)** 기준으로 작성됨. 예: "그 자료를 돈의 목적과 연결하는 건 무리입니다... 형에게 쓴 돈..." — 현재 e-8(주차 영수증/여성 병원)과 불일치. 그래서 런타임이 scripted 대신 LLM 즉석 생성에 의존 → 발화 품질 편차 + 「모순 발견」 오작동(CT Issue G).

## 작업 1 — b-e-8 답변 pool 을 「주차 영수증/여성 병원」 frame 으로 재작성

채널 `evidence_present` (이준호 b → 재판관), 거짓 상태 tier 별:
- **early (S0~S2, 부인·회피)**: 사용자 확정 시안 1건 포함 —
  `예, 그 메디컬 센터에 간 것은 맞습니다. 하지만 다른 이유가 있었습니다. 지금 저는 말도 안되는 오해를 받고 있습니다.`
  나머지 early variant 도 같은 톤(방문 인정 + 목적은 회피 + 오해 호소)으로 다양화.
- **mid (S3, 일부 인정·상대 탓/맥락 전환)**: 방문 사실 + "혼자 알아본 것"까지는 인정하되 이유는 흐림.
- **late (S4~S5, 감정 호소→인정)**: 아내(박지연) 부담 주지 않으려 혼자 출산 가능성을 알아봤다는 진실 인정.

### 진실 노출 정책 (필수)
- early/mid 에서 `박지연 난임 / 난임 진단 / 임신 / 내연녀` 키워드 직접 노출 금지 (d-3 + spouse-01 truth disclosure 정책).
- late(S5)에서도 surface-safe 표현 우선 ("아내에게 부담을 주고 싶지 않아 혼자 알아봤다" 수준). 난임 직접 단정은 d-1/관련 확정 영역에 위임.
- 검증: `node scripts/detect-truth-leak.cjs --strict` 0 findings (4 lang) + `npm run qa:fast` RELEASE READY.

### 다국어
KO 확정 후 en/ja/zh-CN sync (`src/data/scriptedText/spouse-01.{en,ja,zh-CN}.json` 의 동일 id).

## 작업 2 — 비자금 라인 제거에 따른 orphan scriptedText 정리

2026-05-28 비자금 라인 정리로 **e-9(증거) / dc-8(단서) / h-d4(쟁점)** 가 case.ts·narrative.ts 에서 제거됨. 관련 scriptedText 가 orphan 으로 남음 (런타임 무해하나 정리 권장). 4언어(`spouse-01.json` + `.en/.ja/.zh-CN.json`) 모두:
- `b-e-9-*` (e-9 답변 pool)
- `emerge-e9-*`, `emerge-dc8-*`, `emerge-hd4-*` (등장 시퀀스)
- dc-8 관련 entry
- (참고) e-8 의 `emerge-e8-via-cascade/a-interject/b-outburst-*` 도 현재 dead (e-8 은 hook 으로만 등장). 재작성 시 함께 정리 검토.

## 작업 3 — 다국어 generated case json 재sync

`src/data/cases/generated/spouse-01.{en,ja,zh-CN}.json` 에는 아직 e-9/dc-8/h-d4 가 남아 있음 (KO `spouse-01.json` 은 제거됨). 다국어 sync 시 제거 필요.

## 참고 파일
- `src/data/coreCases/spouse-01.case.ts` (e-8 정의 + d-3 + investigationStages)
- `src/data/scriptedText/spouse-01.json` (b-e-8 / b-e-9 / emerge-*)
- `docs/design/spouse-01-entity-matrix/matrix.md` (entity 등장 조건 매트릭스)
- `docs/localization/translation-batch-pending.json` (다국어 sync 누적 ledger)
