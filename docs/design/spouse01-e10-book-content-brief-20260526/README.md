# spouse-01 e-10 「예비 부모 정서 도서」 본문 콘텐츠 작성 의뢰

GPT Pro 의뢰용 self-contained 폴더. 본 폴더 파일만으로 작업 가능.

## 폴더 구성

| 파일 | 용도 |
|---|---|
| `README.md` | 본 문서 (의뢰 index) |
| `brief.md` | 의뢰 본문 — 요청 항목 / 톤 / 진실 노출 정책 / 출력 형식 |
| `ref-policy-spouse01-truth-disclosure.md` | spouse-01 사건 진실 노출 정책 (player-visible text keyword 제약) |
| `ref-spouse01-event-timeline.md` | spouse-01 사건 흐름 (사실 관계 정합성 권위) |
| `ref-e10-current-state.json` | 현재 e-10 generated JSON 영역 사본 (placeholder 표시된 위치 = 작성 대상) |
| `output-template.json` | 응답 결과 template (해당 form으로 작성) |

## 의뢰 요약

- **사건**: spouse-01 (남편 이준호 vs 아내 박지연 / 외도 의심 → 가족 돌봄 진실)
- **증거**: e-10 「예비 부모 정서 도서」 (B 책상/차량에서 발견, 본인 필체 필기 흔적 포함)
- **surface frame**: "B가 예비 아빠를 준비?" → d-3 (내연녀 임신 의심) misdirection
- **진실**: B 본인이 박지연 난임 진단 후 부모 될 마음을 정리한 자료 → h-d4 (비자금 원래 목적 = 난임 치료비) 진실로 수렴
- **요청**: 책 외관 / 목차 6 챕터 / 접힌 페이지 3개 (본문 발췌 + 메모) 콘텐츠 작성

## 진실 노출 정책 핵심

본 단계는 e-10 investigationStages 단계별 점진 노출 영역. **다음 keyword 직접 노출 금지**:
- "박지연 난임" / "난임" / "임신 시도" 등 진실 영역 keyword
- "h-d4" / "비자금 목적" 영역 keyword
- 진실은 단계 진행 + dossier 결합 / confession 영역에서 노출

자세한 정책은 `ref-policy-spouse01-truth-disclosure.md` 정독 필수.

## 다음 단계

1. GPT Pro에 본 폴더 zip 전달
2. `brief.md` 의뢰 본문 + `output-template.json` 형식 명시
3. 결과 도착 시 `src/data/cases/generated/spouse-01.json` e-10 영역 placeholder text 일괄 교체
4. 외국어 sync = batch ledger 적립 (`docs/localization/translation-batch-pending.json`) → 사건 전체 완료 후 별도 thread 의뢰
