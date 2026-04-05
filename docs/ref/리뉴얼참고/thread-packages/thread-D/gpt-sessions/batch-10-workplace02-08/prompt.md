# GPT Pro 세션 — 배치 10: Phase 1/2 스크립트 교정 (workplace-02~08)

> 이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 복사해서 보내면 된다.

---

## 프롬프트 (복사용)

너는 솔로몬 법정 게임의 Phase 1/2 스크립트 교정 전문가다.
첨부 파일 21개를 교정 기준에 따라 검수하고 교정해라.

■ 파일 구분
- workplace-XX-case.json (7개): 사건 데이터 → anchorTruth, callTerms 참조용
- workplace-XX-phase1.json (7개): Phase 1(초기 진술) 스크립트 → 교정 대상
- workplace-XX-phase2.json (7개): Phase 2(반박 진술) 스크립트 → 교정 대상

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 교정 기준
━━━━━━━━━━━━━━━━━━━━━━━━━━

[1. anchorTruth 키워드 제거 — 최우선]
각 사건의 anchorTruth 핵심 키워드(인물 실명, 기관 정식명칭, 서비스명, 정확 금액, 정확 날짜)가
Phase 1/2 대사에 포함되면 추상 표현으로 교체한다.
일반 어휘(사진, 기록, 환급, 이체 등)는 허용 — anchorTruth의 핵심 결론 키워드만 제거.

[2. 톤 규칙]
- 당사자 → 재판관: 합니다체 필수 (~습니다, ~입니다, ~겠습니다)
- 당사자 → 상대방: 반말 유지 (~했잖아, ~한 거 아니야?)
- 시스템 메시지: 중립 3인칭, ~다체
- 해요체 전면 금지: ~에요, ~해요, ~거예요, ~했어요, ~있어요, ~같아요, ~됐어요, ~잖아요(재판관 대상시), ~인가요, ~할게요, ~없어요, ~셨어요

[3. 호칭 규칙]
- 당사자가 상대를 부를 때: callTerms.toPartner 사용
- 당사자가 재판관에게 상대를 언급할 때: callTerms.toJudge 사용
- **재판관(system)이 당사자를 언급할 때: "이름 + 씨" 형태만. 절대 "제 아내/남편" 금지**

[4. 번역체 9패턴 — 0건 필수]
했던 것이다, 한 바 있다, 인 것으로 보인다, 것으로 확인된다, 할 수 있을 것이다,
라고 할 수 있다, 에 해당한다, 인 것으로 판단된다, 인 것으로 사료된다

[5. 기타 금지]
- "사전 상의/협의" 금지
- "특정 X" 금지 ("특정 기관", "특정 인물" 등)
- Phase 1(감정 낮음) < Phase 2(감정 높음) 수위 자연스러운 곡선

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 각 사건의 anchorTruth
━━━━━━━━━━━━━━━━━━━━━━━━━━

- workplace-02: 외부로 먼저 나간 원본은 민아가 아니라 회수 안 된 공유링크를 재사용한 파견 컨설턴트 노지원 쪽에서 반출됐다.
- workplace-03: '라인 타고 들어온 HJ'는 희주가 아니라 외부 연계 후보 한재균을 가리킨 취중 발언이었다. 자동 클립에서 앞 8초가 잘렸다.
- workplace-04: 마감 실패는 민석의 18시 승인 약속 불이행과 지우의 회귀 테스트 미완료 상태 초록불 표시가 겹친 공동 책임이다.
- workplace-05: 가은의 '순수 창작' 고객회복 랩의 핵심 구조는 2년 전 컨설턴트 배수진의 보류 파일에서 왔고, 상혁은 그걸 알면서 공동기획 표기를 지웠다.
- workplace-06: 통합 공지는 어느 쪽에도 단독 통제권을 주지 않았다. 첫 2주간 계정 변경·규칙 수정은 공동 승인+PM 기록이 필수였다.
- workplace-07: 세린이 올린 '증거인멸 지시' 캡처의 본문은 2년 전 품질등급 축소 채팅이고, 헤더만 현재 프로젝트 채널로 바꿔 붙인 합성본이었다.
- workplace-08: 정훈은 주말 가족식사 42만원·백화점 결제 38만원을 월말 전 상환하자고 나래와 합의해 놓고, 감사가 터지자 합의 자체를 부인했다.

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 각 사건의 호칭 (callTerms)
━━━━━━━━━━━━━━━━━━━━━━━━━━

- workplace-02
  - partyA 한규원: toPartner="민아씨", toJudge="제 팀원", angry="조민아!"
  - partyB 조민아: toPartner="실장님", toJudge="제 실장", angry="한규원 실장!"
- workplace-03
  - partyA 강도윤: toPartner="희주씨", toJudge="제 부하직원", angry="최희주!"
  - partyB 최희주: toPartner="팀장님", toJudge="제 팀장", angry="강도윤 팀장!"
- workplace-04
  - partyA 서민석: toPartner="지우씨", toJudge="제 팀원", angry="배지우!"
  - partyB 배지우: toPartner="매니저님", toJudge="제 매니저", angry="서민석 매니저!"
- workplace-05
  - partyA 오상혁: toPartner="가은씨", toJudge="제 팀원", angry="문가은!"
  - partyB 문가은: toPartner="실장님", toJudge="제 실장", angry="오상혁 실장!"
- workplace-06
  - partyA 박준호: toPartner="서린씨", toJudge="제 팀원", angry="이서린!"
  - partyB 이서린: toPartner="팀장님", toJudge="제 팀장", angry="박준호 팀장!"
- workplace-07
  - partyA 장태욱: toPartner="세린씨", toJudge="제 팀원", angry="한세린!"
  - partyB 한세린: toPartner="팀장님", toJudge="제 팀장", angry="장태욱 팀장!"
- workplace-08
  - partyA 최정훈: toPartner="나래씨", toJudge="제 팀원", angry="김나래!"
  - partyB 김나래: toPartner="실장님", toJudge="제 실장", angry="최정훈 실장!"

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 출력 형식
━━━━━━━━━━━━━━━━━━━━━━━━━━

사건별로 교정된 Phase 1 JSON + Phase 2 JSON + corrections 배열:
[
  { "caseId": "...", "phase": 1, "lineIndex": 3, "before": "...", "after": "...", "reason": "스포일러-금액" },
  ...
]

reason 카테고리: 스포일러-금액, 스포일러-인물명, 스포일러-기관명, 스포일러-날짜, 스포일러-서비스명, 스포일러-anchorTruth직접노출, 해요체, 번역체, 호칭, 특정X, 사전상의, 톤수위, 자연스러움

위반 없는 사건은: "{caseId} — 교정 0건 PASS"
