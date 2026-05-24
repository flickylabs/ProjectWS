# 03 — family-01 캐릭터 frame (변환 톤 일관성)

## 재판관 (judge)

- **격식 (KO)**: `...십시오`, `...습니까`, NPC 호명 시 "윤태성 씨" / "윤정후 씨" / "두 분"
- **태도**: 사실 확인자. 평가·가치 판단 회피. 사실관계·선후관계·정황 중심
- **추궁 강도 tone**: soft / mid / hard 단계. mid 이상은 직접 추궁 OK (단 평가 어휘 회피)
- **dispute 명사 활용**: "유서" / "수정된 유서" / "변경된 유서" / "공증인 메모" / "자필 연습본" / "정기 지원금" / "계좌 송금" 등 사건 명사 직접 호명 OK

## A 윤태성 (claimant, male 47)

- **archetype**: 큰아들 / 장남 frame. 어머니 유서 변경 (60:40)에 격앙. 어머니가 본인을 차별했다는 인지 위협
- **frame**: "장남으로 산 시간이 무너졌다" / "동생이 어머니 곁에서 절차에 손댔다" frame
- **dispute 영역**: d-1 (요양 개입) / d-2 (유서 비율) / d-3 (정기 자금 routing — 본인이 받았던 도움) / d-4 (자필 진위) / d-5 (변경된 유서 최종)
- **응답 패턴**: 단정형 ("그건 받아들이기 어렵습니다") / 정후 책임 frame ("동생이 움직인 뒤") / 격앙 시 dispute에서 자기 손해 frame

## B 윤정후 (defendant, male 43)

- **archetype**: 작은아들. 어머니 곁에서 유서 작성 직접 개입. 자기 죄책감 + 어머니 출생 비밀 인지 + 자금 routing 직접 운영
- **frame**: "어머니를 도왔다" / "도움의 선이 흐려졌다" frame. 자백 단계로 "절차에 손댄 행위" 인정
- **dispute 영역**: 위와 동일
- **응답 패턴**: 자백 / 책임 인정 (S3+) / 어머니 출생 비밀 / 자금 routing은 S4-S5에서만 surface

## 어머니 (deceased)

- 두 아들에게 차별적 발화 ("정후가 더 짊어졌다" 등)
- 윤정후 = 친자 X (출생 비밀, S5 이전 surface X)
- 정후가 매달 보낸 돈을 → 어머니 → 윤태성 공장으로 routing (S5 이전 surface X)

## 핵심 dispute 영역

- **d-1**: 요양 개입 (정후가 어머니 곁에서 종이를 읽어줌, 형 오기 전에 끝내자 발언). e-1 방문 기록 / 낭독 증언
- **d-2**: 유서 비율 90:10 → 60:40 변경 (오후 수정 접수). 공증인 메모 + 오전·오후 흔적
- **d-3**: 정기 자금 routing (정후 → 어머니 → 윤태성 공장). 계좌 흐름 + 자필 연습본 + 어머니 발화
- **d-4**: 자필 진위 (어머니가 직접 썼는지). 자필 연습본
- **d-5**: 변경된 유서 (최종, 60:40)

## 자연 한국어 가이드 reference

memory/ 폴더에 self-contained 복사된 메모:

- `feedback_natural_korean_npc_active_voice.md` — NPC 적극 발화 5 차원
- `feedback_natural_korean_precision_guide.md` — 한국어 자연화 8 차원 정밀
- `feedback_truth_leak_prohibition.md` — 진실 누설 금지
- `design_family01_truth_disclosure_policy.md` — 사건별 진실 노출 정책

## 변환 시 자연성 검증 self-check

- [ ] 재판관 발화에 "선을 넘다" / "흐름이 보입니다" / "낙인" 등 평가 어휘 없는가?
- [ ] 지시 대명사 "그 X" → 자연 대체 ("관련 X" / "해당 X" / 구체화)?
- [ ] 격식 어미 보존?
- [ ] tone (soft/mid/hard) 강도 일관?
- [ ] 사건 명사 활용 → 자연 한국어 흐름?
- [ ] truth disclosure 정책 위반 X (출생/정후 돈/공장 routing 등 hidden lexeme S5 자백 전 등장 X)?
