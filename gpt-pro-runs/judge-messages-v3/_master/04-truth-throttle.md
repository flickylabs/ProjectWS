# Truth Throttle — 진실 보호 정책

## 원칙
**"진실은 플레이어가 직접 밝혀낸다."** — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다.

## lieState별 정보 노출 단계

| State | 금액 | 인물 | 기관 | 시각 | 동기 |
|---|---|---|---|---|---|
| S0 | "해당 금액" | "그 사람" | "그곳" | 허용 | 미공개 |
| S1 | 동일 | 동일 | 동일 | 허용 | 모호 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 | 부분 |
| S3 | 구체값 허용 | 실명 | 정식명칭 | 전부 | 부분~전체 |
| S4 | 전부 | 전부 | 전부 | 전부 | 전체 |
| S5 | 전부 + 자백 | 전부 | 전부 | 전부 | 자백 본문 |

## 사건별 banned_lexemes_safe

각 사건 assets/case-structure-v2.json + character-info.md 참조.
핵심 truth 보호 어휘 목록.

### spouse-01 예시
- d-1 (외도 오해): 형, 조카, 개인회생, 돌봄, 박재영(형 이름), 윤시우(조카 이름), 시댁
  - S0~S2에서 모두 금지
- d-2 (비자금): 2,000만원 구체값, 형 송금, 개인회생 자금
  - S0~S2 금지, S3에서 일부 허용
- h-d3 (적금 해지): 위임장 조작, 투자방, 손실, 3,000만원
  - S0~S2 금지, S3에서 일부, S4+ 전부

### spouse-01 추가 금지 표현 (S0~S2 회피 톤)
- "그런 일": 반복 금지 (회피의 회피로 인식, archetype tell 약화)
- "복잡하다": 1회는 허용, 반복 시 fatigue로 인식
- "나중에 말하겠다": "나중"으로 변경 가능
- "집안 사정": 1~2회 허용, 그 이상은 partial_scope tell로만

### family-01 / friend-01
세션 폴더의 case-structure-v2.json + character-info.md 참조.

## forbid_atom_ids 규칙

각 scene의 forbid_atom_ids 필드에 명시된 atom은 해당 scene에서 절대 사용 X.
주로 다음 lieState로 가야 등장하는 atom (스포일러).

### 예시 (d1_b_S0)
forbid_atom_ids:
- d1.junho_full_care_confess (S5에서만 — 형/조카 돌봄 자백)
- d1.junho_unknown_number_brother (S3에서 — 새벽 발신자 정체)
- d1.junho_brother_home_ack (S2에서 — 형 집 인정)

## v2-atoms S3+ 보존 정책
v2-atoms 파일의 **S3+ atoms는 절대 변경 X**.
- 이유: 구체적 truth 값 (금액/이름/기관)이 게임 내 다른 시스템 (DossierCard / 판결문) 참조
- 보정 시 톤만 미세 조정, 핵심 정보는 보존

## 다른 dispute 누설 금지

unlockCondition 미충족 dispute 정보 누설 X.

### spouse-01 예시
- d-2 등장 전 (즉 d-1 < S3 상태): NPC가 "비자금", "2,000만원", "형 도움" 언급 X
- h-d3 등장 전 (즉 d-2 < S1): NPC가 "적금", "위임장", "투자" 언급 X
- h-d4 등장 전: NPC가 "선후 책임", "각자 잘못" 식 비교 발언 X

## scene 작성 시 self-check
- [ ] 현재 lieState 허용 정보만 노출?
- [ ] forbid_atom_ids 위반 X?
- [ ] banned_lexemes_safe 어휘 사용 X (해당 stage)?
- [ ] 다른 dispute (unlock 안 됨) 정보 누설 X?
