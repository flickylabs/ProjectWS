# GPT Pro 세션 — 배치 7: Phase 1/2 스크립트 교정 (partnership-02~08)

> 이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 복사해서 보내면 된다.

---

## 프롬프트 (복사용)

너는 솔로몬 법정 게임의 Phase 1/2 스크립트 교정 전문가다.
첨부 파일 21개를 교정 기준에 따라 검수하고 교정해라.

■ 파일 구분
- partnership-XX-case.json (7개): 사건 데이터 → anchorTruth, callTerms 참조용
- partnership-XX-phase1.json (7개): Phase 1(초기 진술) 스크립트 → 교정 대상
- partnership-XX-phase2.json (7개): Phase 2(반박 진술) 스크립트 → 교정 대상

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

- partnership-02: 준오의 초기 영업 기여는 실제였지만, 그가 숨긴 별도 유지보수 제안 때문에 '완전한 피해자'라는 서사는 성립하지 않는다.
- partnership-03: 서로가 약속을 깨고 발표권을 빼앗았다고 믿었지만, 실제로는 같은 모호한 IR 지시를 서로 다르게 해석해 각자 따로 준비한 공유 오해였다.
- partnership-04: 현재 문제의 주말 이체는 민재의 횡령이 아니라 해지 정산을 위한 보증금·충당금 이동이었고, 협상에 제시된 '은행 거래내역' 일부는 원본이 아니라 편집본이었다.
- partnership-05: 문제의 2,400만원은 현우의 개인 공금 유용이 아니라 세무사 박태성의 권유로 집행된 세무조사 대응 선급금과 예납세액이었다.
- partnership-06: 문제의 리뉴얼 지연은 한쪽의 단독 월권이 아니라, 가람과 보라가 각자 상대 영역의 결정을 건드리며 승인선을 동시에 무너뜨린 공동 책임이었다.
- partnership-07: 경쟁사에 넘어간 것으로 보인 도매단가·팝업 일정 자료는 동업자 중 누가 판 것이 아니라, 업계 모임 운영사 AE가 후속메일에 잘못 첨부한 백업 파일이었다.
- partnership-08: 지아가 주장한 '2호점 약속 파기'는 일부 사실이지만, 정작 지아 자신도 그 무렵 전직 강사와 별도 스튜디오를 준비하고 있어 순수한 피해자 서사는 성립하지 않는다.

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 각 사건의 호칭 (callTerms)
━━━━━━━━━━━━━━━━━━━━━━━━━━

- partnership-02
  - partyA 박준오: toPartner="민경씨", toJudge="제 동업자", angry="서민경 씨!"
  - partyB 서민경: toPartner="준오씨", toJudge="제 동업자", angry="박준오 씨!"
- partnership-03
  - partyA 강도윤: toPartner="서린씨", toJudge="제 동업자", angry="나서린 씨!"
  - partyB 나서린: toPartner="도윤씨", toJudge="제 동업자", angry="강도윤 씨!"
- partnership-04
  - partyA 오민재: toPartner="라희씨", toJudge="제 동업자", angry="김라희 씨!"
  - partyB 김라희: toPartner="민재씨", toJudge="제 동업자", angry="오민재 씨!"
- partnership-05
  - partyA 최현우: toPartner="소라씨", toJudge="제 동업자", angry="정소라 씨!"
  - partyB 정소라: toPartner="현우씨", toJudge="제 동업자", angry="최현우 씨!"
- partnership-06
  - partyA 이가람: toPartner="보라씨", toJudge="제 동업자", angry="최보라 씨!"
  - partyB 최보라: toPartner="가람씨", toJudge="제 동업자", angry="이가람 씨!"
- partnership-07
  - partyA 문태경: toPartner="유나씨", toJudge="제 동업자", angry="서유나 씨!"
  - partyB 서유나: toPartner="태경씨", toJudge="제 동업자", angry="문태경 씨!"
- partnership-08
  - partyA 배시원: toPartner="지아씨", toJudge="제 동업자", angry="윤지아 씨!"
  - partyB 윤지아: toPartner="시원씨", toJudge="제 동업자", angry="배시원 씨!"

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
