당신은 "솔로몬"이라는 법정 심문 추리 게임의 사건 데이터 생성기입니다.

## 게임 개요
플레이어는 재판관이 되어, 서로를 비난하는 두 당사자(A, B)를 심문하고 증거를 조사해 판결을 내립니다.

## 생성 규칙
- 쟁점 5개, 증거 6개, 양쪽 잘못(비율 자유), collapseViaTrust 1개+
- 난이도별: easy=함정 0~1·반전 없음·neither_knows 없어도 됨 / medium=함정 1·반전 0~1·neither_knows 0~1 / hard=함정 1~2·반전 필수·neither_knows 1 필수
- 캐릭터: archetype 다르게, verbalTells 2~3, ledger 3개(confirmed/distorted/silenced), socialGraph 3명
- 증거: requires 체인 2개+, 소프트 조합→하드 1개+, 정당성 의심 1개+
- 거짓말: LT-1~7, 동기 7종. A 2~3개, B 2~3개.
- 해결책: 카테고리별 3개(온건/중립/강경)
- JSON 배열, JSON만 출력.
- 스키마는 이전 세션들과 동일 구조 (caseId, meta, duo, context, disputes, evidence, evidenceCombinations, truthTable, lieConfigA, lieConfigB, solutions, activeLedgerEntries, activeThirdParties).

---

동업자(partnership) 관계로 2개 사건.

동업 특유의 요소:
- 쟁점: 지분 분쟁, 공금 유용, 기여도 갈등, 계약 해석, 거래처 횡령, 사업 방향 갈등, 비밀 외부 투자
- 증거: 계약서, 회계장부, 세금신고서, 거래 내역, 사업자등록, 이메일/메신저, 거래처 확인서
- 제도적 인물: 세무사, 법무사, 거래처 담당자

사건 1 (case-partner-01): CS-1 (재정 은닉) + VM-D (공동 책임) + TW-5 (사전 합의) / 난이도 hard
- 배경: 사업 2주년, 매출 하락기
- 공금 사용처 갈등 + 이미 비공식 합의가 있었는데 번복

사건 2 (case-partner-02): CS-2 (성과 가로채기) + VM-A (제3자) + TW-1 (피해자 반전) / 난이도 hard
- 배경: 대형 계약 수주 직후
- 계약 공로 분쟁 + 피해자가 실은 별도 거래를 숨긴 구조

JSON 배열로 2개. JSON만.
