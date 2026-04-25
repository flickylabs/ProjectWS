# QW V6 R12: 3사건 증인 다층 증언 집중 (집중-5)

## 실행
- `witnessTestimonyData/{case}.ts` — 3사건 × 3증인 × 5슬롯 = 45슬롯

## 증인 depth 체인 정합성
| 사건 | 증인 | depth1 | depth2 | depth3 | 합계 |
|---|---|---|---|---|---|
| spouse-01 | w-1 (경비원) | 2 | 2 | 1 | 5 |
| spouse-01 | w-2 (은행원) | 3 | 2 | 1 | 6 |
| spouse-01 | w-3 (박미라) | 2 | 1 | 1 | 4 |
| friend-01 | w-1~w-3 | 2 | 2 | 1 | 5 each |
| family-01 | w-1~w-3 | 2 | 2 | 1 | 5 each |

- 모든 증인 depth 1→2→3 체인 존재 (최소 1슬롯씩)
- spouse-01 w-2만 variants 6개 (depth1=3). V5 보고와 일치

## 집중-5 품질 검사
- prevSlotRequired 게이팅: spouse=5, friend=6, family=6 (V5 PASS 동일)
- 빈 question/testimony: **0건**
- 금지패턴:
  - spouse-01 witness: **0건**
  - friend-01 witness L142: `question: '호감이라고 하셨는데, 구체적으로 어떤 말을 했습니까?'` — judge 후속 질문 단어되묻기 (이미 R2/R8 WARN으로 기록됨)
  - family-01 witness: **0건**
- Placeholder: 3사건 **0건**
- 합니다체/반말 혼재: **0건**

## 집중-9 (Placeholder 유출 in 증인 텍스트)
- 3사건 **0건**

## 집중-10 (증인 speaker/role 경계)
- 정적 스캔에서는 확인 불가 (TS 정의만 존재). Phase D에서 확인
- 단, witness 발화는 UI에서 `witness:<id>` speaker로 렌더링되어야 함 → 엔진 분기 확인 R60

## 수정 (이번 라운드, 권한 내)
- 없음

## CT 검토 요청 (권한 초과)
- 이전 라운드들에서 누적된 "단어되묻기" 7건에 **friend-01 witness L142 1건 포함**. 총 유지.

## 다음 라운드로 이월
- R13: 증거 뷰어 + 판결/결과 (집중-6/7)

## 라운드 판정: **PASS**
