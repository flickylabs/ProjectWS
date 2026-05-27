# friend-01 narrative integrity review — findings

> 진입 base HEAD **abfa7abe** (main, origin 일치). 본 thread = friend-01 사건 데이터 자체 (timeline / 쟁점 lieConfig + truthStages / 증거 description + depthStages / 단서 leadLine + challenges / 증인 testimony / 결합 recipe / 진실 노출 정책 / 사건 핵심 진실 / 3rd party character) 개연성·일관성 비판적 검토.

**우선순위 분류**
- **P0** = 사건 진실 자체 모순 / 사건 핵심 흐름 개연성 무너짐
- **P1** = 진실 노출 정책 위반 위험 + 책임 분배 frame 부적절
- **P2** = 자연성 (character 일관성 / narrative cohesion)
- **P3** = 디테일 (표기 / 누락 / 정합 영역)

**범례**: 위치 = `friend-01.case.ts` 또는 권위 메모리 / 영역 = layer 분류 / 문제 = 발견 / 영향 = 사건 frame 충격 / 옵션 = `proposals.md` 참조.

---

## P0 — 사건 진실 자체 모순 (3건)

### F-01. A 아버지 character 동기 명시 X (사건 핵심 driver 입체성)
- **위치**: `friend-01.case.ts` 전체. parties / timeline / evidence (e-5/e-6) / witness (w-3) 모두 간접 정보만.
- **영역**: 3rd party character
- **문제**: 사건의 핵심 driver = 「A 아버지 5년 전 사기 + 결혼 3주 전 동일 패턴 반복」. 그러나 case.ts 에 A 아버지의 동기 (도박 / 사업 어려움 / 사기꾼 character) 명시 X. 모든 정보 간접 (e-5 떠벌림 / e-6 통장 + 문자 / w-3 가게 앞 장면 / timeline stage 0+3). 사건 종결 시 player 가 A 아버지 character 를 어떻게 이해해야 하는지 frame 불명확.
- **영향**: 사건 anchorTruth (B 의 9일간 연락 = 사기 패턴 반복 차단) 의 핵심 frame 인 「같은 수법 반복」 character 입체성 없으면 사건 자체 개연성 약화. 또한 A 가 아버지를 어떻게 인식하는가 (변심 단정 vs 사실 인지 후 침묵) 책임 frame 도 흔들림.
- **옵션**: F-01-A (현재 유지 — 간접 정보로 충분) / F-01-B (timeline stage 0 description 에 A 아버지 동기 1~2 줄 추가) / F-01-C (별도 character note 영역 신설 — 새 schema 영역)

### F-02. Timeline stage 0 — A 아버지 ↔ B 직접 돈 거래 자연성
- **위치**: [friend-01.case.ts:229-243](src/data/coreCases/friend-01.case.ts#L229-L243)
- **영역**: 사건 흐름 (timeline)
- **문제**: stage 0 = 「약 5년 전, A 아버지가 B 에게 투자 명목으로 돈을 빌리고 일부만 갚은 뒤 차일피일 미루며 연락 끊음」. 친구 부모 ↔ 친구 자식 간 직접 돈 거래 (투자 명목) + B 가 그 자리에서 응한 영역 자연성. case.ts 에 두 사람 사전 관계 frame 명시 X (w-3 = 어릴 적 단골 영역에서 두 가족 영역 추정 가능 단 명시 X). 26세 (5년 전 B 나이) 가 친구 아버지에게 투자금 빌려준 영역 = 일반 case 아님.
- **영향**: 사건 stage 0 자체 개연성. B 가 5년 전 친구 아버지 돈을 빌려준 영역 + 5년 후 동일 사람 (예비신랑) 에게 다시 같은 패턴 시도 인식 = 같은 동네/가족 관계 frame 명시 필요.
- **옵션**: F-02-A (현재 유지) / F-02-B (timeline stage 0 description 에 두 가족 사전 관계 frame 1줄 추가 — 예: 「최수민 부모가 사업체를 운영했고 송다은 아버지가 그 시기에 자주 드나들었다」) / F-02-C (별도 사전 관계 stage -1 신설)

### F-03. B 의 9일간 우회 경고 행동 영역 자연성 (player frame 답)
- **위치**: [friend-01.case.ts:289-302](src/data/coreCases/friend-01.case.ts#L289-L302) (timeline stage 4) + e-1 / e-4 / e-5 / d-1 truthStages
- **영역**: 사건 흐름 (timeline) + B character verbalTells
- **문제**: B 가 결혼 3주 전 9일간 예비신랑에게 전화 6 + 문자 11 = 상당히 강한 빈도. 「다은이 관련 이야기예요」 「예전에 같은 일이 있었거든요」 같은 우회 frame. player frame 에서 「왜 다은에게 직접 말 안 했는가」 + 「왜 우회 frame 으로 9일간 반복했는가」 답 영역. case.ts B archetype = `affect_flattening` + verbalTell `third_party_protection` 으로 character 정합. 단 9일간 반복 = 더 적극적 행동 영역. 사건 frame 에서 「2년간 연락 두절 후 갑자기 9일간 6 전화 11 문자」 = 평범한 「감정 누른」 character 와 일관성?
- **영향**: B character 의 affect_flattening + 9일간 적극 우회 연락 행동 = character 일관성 영역 + 사건 자체 frame 자연성. 사용자 player 가 B 를 「조용히 사라지는」 character 로 인지하는데 9일간 반복 연락 = 다른 frame.
- **옵션**: F-03-A (현재 유지 — B 의 「혼자 막으려」 동기 frame 으로 자연) / F-03-B (B character verbalTells 에 「위기 시 적극 우회」 행동 영역 1개 추가) / F-03-C (timeline stage 4 description 에 B 동기 frame 강화 — 「결혼이 무너질 수 있다는 위기감으로 평소와 다르게 반복 연락」)

---

## P1 — 진실 노출 정책 / 책임 분배 frame (6건)

### F-04. d-2 correctResponsibility A:20 / B:80 — 예비신랑 책임 영역
- **위치**: [friend-01.case.ts:673](src/data/coreCases/friend-01.case.ts#L673) (d-2 「예비신랑의 선 넘는 접근」)
- **영역**: 5 쟁점 (책임 분배)
- **문제**: d-2 truthDescription = 「예비신랑이 먼저 선 넘는 메시지 + B 거절」. 그런데 correctResponsibility A:20 / B:80. 예비신랑 (3rd party) = 행위 주체. A = 모른 채 단정. B = 거절 후 다은에게 직접 알리지 않은 영역. 책임 frame B 80 = 「B 가 다은에게 알렸어야 했다」영역만 의미? 예비신랑 본인 책임 frame 은 어디로? (case 의 「두 당사자 책임 분배」 = 100% 합산 frame 이라 예비신랑 책임은 분리?)
- **영향**: 사건 종결 시 player 가 「B 책임 80%」frame 받음. 그러나 사건 핵심 truth = 「예비신랑이 먼저 선 넘기」. 책임 분배 frame 이 사건 진실 frame 과 충돌. 「확인 책임」 frame 으로는 자연 단 player 수용 영역 검토 필요.
- **옵션**: F-04-A (현재 유지 — 「두 당사자 정직 책임」frame 명시) / F-04-B (A:30 / B:70 으로 보정 — A 의 모른 채 단정 책임 약간 상향) / F-04-C (case.ts 에 「correctResponsibility = 두 당사자 정직 책임 영역. 3rd party 책임은 별도」주석 명시)

### F-05. d-4 correctResponsibility A:30 / B:70 — A 아버지 행위 책임 frame
- **위치**: [friend-01.case.ts:1263](src/data/coreCases/friend-01.case.ts#L1263) (d-4 「과거 손절과 아버지의 사기」)
- **영역**: 5 쟁점 (책임 분배)
- **문제**: d-4 truthDescription = 「과거 손절 원인 = A 아버지 사기 + B 침묵」. correctResponsibility A:30 / B:70. A 아버지 (사기 가해자) 행위 책임이 A 측 30% 만 으로 들어감 = A 아버지 책임이 A 가족 일원 영역으로 일부 귀속. B 70 = 「B 가 직접 말했어야 했다」영역. 사기 피해자 (B) 가 가해자 가족 (A) 보다 책임 더 큰 frame = 자연성 영역.
- **영향**: 사건 종결 시 player 가 「B 70% 책임 (말하지 못함) + A 30% (가족 일원으로 모른 척)」frame 받음. 사기 피해자가 더 큰 책임 frame = 「두 당사자 정직 책임」 frame 으로는 자연 단 사건 frame 으로 player 수용 영역 검토 필요.
- **옵션**: F-05-A (현재 유지 — 정직 책임 frame) / F-05-B (A:50 / B:50 으로 보정 — A 아버지 행위 책임 A 측 더 명확) / F-05-C (case.ts 주석 명시)

### F-06. d-3 quadrant = 'b_only' vs A S2/S3 인지 영역
- **위치**: [friend-01.case.ts:959](src/data/coreCases/friend-01.case.ts#L959) (d-3 「아버지의 돈 접근 패턴」) + [d-3 S2 A admittedFact L1061](src/data/coreCases/friend-01.case.ts#L1061) + [d-3 S3 A admittedFact L1095](src/data/coreCases/friend-01.case.ts#L1095)
- **영역**: 5 쟁점 (quadrant 정합)
- **문제**: d-3 quadrant = `b_only` (= B 만 알고 있는 진실). 그런데 A 가 d-3 S2 에서 「아버지가 예비신랑에게 투자 얘기를 꺼낸 게 민감할 수 있다는 점은 안다」 + S3 「결혼 자금 명목으로 돈을 꺼낼 흐름을 알고 있었다」 = A 도 인지 영역. quadrant 가 `both_know` 아닌가? 또는 「A 가 알면서 모른 척 frame」 = 「알고 있지만 인정 안 한다」 영역으로 b_only 유지?
- **영향**: schema quadrant 정합 영역. b_only = LLM frame inject 시 「B 만 안다」 frame 으로 처리 → A 진술 영역에 영향. 사건 진실 frame (A 가 알고 있었다) 과 schema frame (b_only) 충돌.
- **옵션**: F-06-A (현재 유지 — A 는 「알면서 모른 척」 frame, schema 영역 b_only 유지) / F-06-B (quadrant = `both_know` 로 변경 — A 도 알고 있는 영역 명시) / F-06-C (quadrant = `b_only` 유지 + truthDescription 에 「A 는 알면서 모른 척」 frame 명시 추가)

### F-07. w-1 김세라 hiddenAgenda = 동조 가담 부끄러움 시점 자연성
- **위치**: [friend-01.case.ts:2177](src/data/coreCases/friend-01.case.ts#L2177) (w-1 hiddenAgenda)
- **영역**: 3 증인
- **문제**: w-1 김세라 (32세 미용실 직원, pro_a + strategic) hiddenAgenda = 「자신도 최수민을 비난하는 데 가담한 것이 부끄럽다」. knowledgeScope = 「나중에 찜찜한 마음」. 사건 진행 중 김세라가 어느 시점에 「부끄러움」 → B 옹호 frame 으로 바뀌는지 명시 X. testimony.byDispute['d-5'] = 「두 사람 실제 사정 모름 + 본인 동조 책임으로 발언 보수적」 영역까지만.
- **영향**: 김세라 증언 영역 frame. strategic + pro_a + hiddenAgenda 정합 단 시점 자연성 — 사건 진행 중 어느 시점에 김세라가 「찜찜함」 명시 X. 증인 호출 시 자연 흐름 영역.
- **옵션**: F-07-A (현재 유지 — strategic 영역의 「보수적 발언」 frame 으로 자연) / F-07-B (knowledgeScope 에 「사건 진행 중 다은이 진실 일부 인지 후 찜찜함 확산」 영역 1줄 추가) / F-07-C (testimony 영역에 「d-1 또는 d-2 진행 후 B 옹호 frame 일부 노출」 영역 추가)

### F-08. B 손절 결정 「돈 문제는 내가 알아서 정리할게」 frame 자연성
- **위치**: [friend-01.case.ts:248-250](src/data/coreCases/friend-01.case.ts#L248-L250) (timeline stage 1) + [e-3 description L1932](src/data/coreCases/friend-01.case.ts#L1932)
- **영역**: 사건 흐름 + e-3 description
- **문제**: stage 1 = B 가 다은에게 「돈 문제는 내가 알아서 정리할게」 라고만 남기고 설명 피함 → A 가 변심으로 단정. 「돈 문제」 라는 모호한 단어가 A 의 변심 단정 frame 으로 자연 연결되는지 영역. B 가 좀 더 구체로 말했다면 (예: 「너희 집안 사정 + 내가 정리할게」) A 가 다르게 받아들였을 가능성 — character 동기 정합 frame.
- **영향**: 사건 stage 1 자체 개연성. B character 의 「감정 누른 frame + 우회 표현」 = affect_flattening 정합 단 「돈 문제」 라는 단어가 A 의 변심 단정으로 자연 이어지는지 player frame 답 영역.
- **옵션**: F-08-A (현재 유지 — B archetype 정합) / F-08-B (timeline stage 1 + e-3 description 에 A 의 단정 동기 frame 강화 — 「A 가 평소 B 의 회피 패턴을 변심으로 단정하는 습관」 명시) / F-08-C (e-3 depthStages 영역 보강)

### F-09. A 아버지 결혼 3주 전 동일 패턴 반복 시점 자연성
- **위치**: [friend-01.case.ts:274-287](src/data/coreCases/friend-01.case.ts#L274-L287) (timeline stage 3)
- **영역**: 사건 흐름 + A 아버지 character
- **문제**: stage 3 = 「A 아버지가 결혼 3주 전 예비신랑에게 돈 부탁 시작」. 5년 전 결과 (B 와 절교 + 미상환 발각) 후 동일 패턴 반복 시도. 5년 전 학습 없이 같은 행동 반복 character 영역 자연성 — 도박 / 사업 어려움 / 사기꾼 / 도덕적 둔감 character 추정 가능 단 case.ts 에 동기 명시 X. F-01 과 연결.
- **영향**: 사건 핵심 patternRepeat frame 의 핵심 영역. A 아버지가 5년 만에 같은 패턴 반복하는 character 동기 = 사건 anchorTruth 의 자연성 핵심.
- **옵션**: F-09-A (현재 유지 — 간접 정보로 충분) / F-09-B (timeline stage 3 description 에 A 아버지 동기 frame 1줄 추가 — 예: 「사업 자금 어려움이 결혼 직전 또 발생」) / F-09-C (F-01 의 character note 영역 신설 안과 통합)

---

## P2 — 자연성 / character 일관성 (10건)

### F-10. Timeline stage 2 (2년 두절) 자연성 — A 약혼 사실 B 인지 경로 미명시
- **위치**: [friend-01.case.ts:259-272](src/data/coreCases/friend-01.case.ts#L259-L272) (timeline stage 2) + [stage 3 L274-287](src/data/coreCases/friend-01.case.ts#L274-L287)
- **영역**: 사건 흐름 (timeline)
- **문제**: stage 2 = 「2년 연락 두절」. stage 3 = B 가 「우연히 이 흐름 (A 아버지 돈 부탁) 알게 됨」. B 가 어떻게 A 약혼 사실 + A 아버지 흐름 알게 되는지 경로 미명시. w-2 박준혁 = 회사 후배 + B 필라테스 수강생 = 가능한 경로. 단 timeline 영역에 명시 X.
- **영향**: 사건 stage 2~3 사이 narrative cohesion. B 가 우연히 알게 되는 경로 = 박준혁이 우회 알림 frame 으로 자연 단 명시 영역.
- **옵션**: F-10-A (현재 유지 — w-2 testimony 영역에 박준혁 알림 frame 있음) / F-10-B (timeline stage 3 description 에 「최수민이 박준혁 또는 공통 친구를 통해 흐름 인지」 frame 1줄 추가) / F-10-C (별도 stage 2.5 신설 — A 약혼 인지 + B 흐름 인지 단계)

### F-11. A 단톡방 매도 즉각성 + 친구 동조 즉각성 frame
- **위치**: [friend-01.case.ts:304-318](src/data/coreCases/friend-01.case.ts#L304-L318) (timeline stage 5) + [e-2 description L1892](src/data/coreCases/friend-01.case.ts#L1892)
- **영역**: 사건 흐름 + A character
- **문제**: stage 5 = A 가 「9일간 연락」 인지 후 즉시 단톡방 매도 + 「공통 친구 김세라 등」 즉각 동조. A archetype `premature_summary` 정합 (결론 먼저 단정). 단 친구들 (김세라 외) 의 즉각 동조 frame = 단톡방에서 친구 매도 시 다른 친구들의 즉각 동조 character 사회적 자연성. 그룹 분위기 frame.
- **영향**: e-2 단톡방 캡처 + w-1 김세라 증언 영역의 frame. 친구들 동조 영역 character 정합.
- **옵션**: F-11-A (현재 유지 — 그룹 분위기 자연) / F-11-B (e-2 depthStages.original 에 「친구들 동조 패턴 — 김세라 외 1~2명 즉각 동조 + 나머지 침묵」 frame 명시) / F-11-C (w-1 testimony 영역에 「김세라 본인 + 다른 친구 동조 동기」 frame 명시)

### F-12. 예비신랑 김태윤 character 입체성 + A 의 결혼 결정 영향
- **위치**: [friend-01.case.ts:1973](src/data/coreCases/friend-01.case.ts#L1973) (e-4 description) + [e-5 description L2014](src/data/coreCases/friend-01.case.ts#L2014)
- **영역**: 3rd party character (예비신랑)
- **문제**: 김태윤 character = e-4 「커피 한 번 보자」 + 「이상형」 메시지 B 에게 (선 넘는 추파) + e-5 회사 단톡 「다은이 아버지가 결혼 자금 좀 도와달래」 떠벌림 (장인 돈 부탁 동료 떠벌림). 두 영역 = 결혼 3주 전 신부 친구에게 적극 추파 + 장인 돈 부탁 동료 떠벌림 character. A 가 결혼 결정 시 김태윤의 이런 면 어떻게 인지 못 했는가? + 사건 종결 후 A 의 결혼 결정 frame 어떻게? (사건 외 영역이지만 character 일관성 영역).
- **영향**: 김태윤 character 의 frame 일관성. A vs 김태윤 관계 + 사건 종결 시 김태윤 책임 frame 명시 필요.
- **옵션**: F-12-A (현재 유지 — 사건 외 영역) / F-12-B (officialRecordRecommendations 에 「예비신랑 책임 영역 별도 정리 권고」 1줄 추가) / F-12-C (truthDescription 또는 anchorTruth 에 「예비신랑이 먼저 선 넘기 + 회사 떠벌림 영역의 책임」 명시)

### F-13. w-2 박준혁 이중 관계 + B 에게 알리는 동기 자연성
- **위치**: [friend-01.case.ts:2204-2206](src/data/coreCases/friend-01.case.ts#L2204-L2206) (w-2 knowledgeScope)
- **영역**: 3 증인
- **문제**: w-2 박준혁 (34세 회사원, neutral + accurate) = 예비신랑 회사 후배 + B 필라테스 수강생 (이중 관계). 회사에서 예비신랑 떠벌림 들은 후 → B 에게 알린 영역. 두 인연이 우연히 겹치는 자연성 + 박준혁이 왜 B 에게 알렸는지 동기 명시 (hiddenAgenda = 「직장 관계 불편해질까 봐 조심」). 동기 X (적극 알림) ↔ 직장 보호 (소극 침묵) frame 충돌.
- **영향**: w-2 character 영역 frame. 두 frame (적극 알림 + 직장 보호) 정합 검토.
- **옵션**: F-13-A (현재 유지 — 「직장 후배지만 필라테스 수강생으로서 B 와 더 가까운 관계」 frame 으로 자연) / F-13-B (knowledgeScope 에 「B 에게 알린 동기 — 예비신랑 떠벌림이 결혼 자체 위협으로 느꼈고 수강생 영역에서 더 가까운 관계」 명시) / F-13-C (testimony.byDispute['d-3'].canProve 에 동기 frame 추가)

### F-14. w-3 오미경 58세 분식집 사장 5년 전 장면 정확 기억 자연성
- **위치**: [friend-01.case.ts:2248-2270](src/data/coreCases/friend-01.case.ts#L2248-L2270) (w-3)
- **영역**: 3 증인
- **문제**: w-3 오미경 (58세 분식집 사장, pro_b + accurate, hiddenAgenda=null) = 어릴 적부터 단골 + A 아버지 가게 앞 돈 빌리기 장면 + B 가 울며 들어왔던 시기 모두 목격. 58세 분식집 사장이 5년 전 그 장면들 정확 기억 + 증언할 자연성. 영업장 사장이 매일 손님 관찰 영역 단 5년 전 특정 장면 = 깊은 인상 영역 추정. accurate distortionRisk 정합 단 5년 전 기억 정확성 영역.
- **영향**: w-3 증언 영역 신뢰성. d-4 진실 (과거 손절 = A 아버지 사기) 의 외부 증거 영역.
- **옵션**: F-14-A (현재 유지 — 동네 분식집 사장 + 어릴 적 단골 = 깊은 인상 영역 자연) / F-14-B (knowledgeScope 에 「가게 앞 장면이 강렬했던 이유 — A 아버지가 단골 손님 + B 가 평소 활달했던 차이로 강한 인상」 frame 명시) / F-14-C (testimony 영역에 「5년 전 기억 한계 — 정확한 금액/날짜는 모름, 장면만 확실」 명시)

### F-15. dc-1.b.q1 ↔ dc-5.b.q1 frame 동일 (mirror vs 중복)
- **위치**: [dc-1.b.q1 L2351-2363](src/data/coreCases/friend-01.case.ts#L2351-L2363) + [dc-5.b.q1 L2624-2635](src/data/coreCases/friend-01.case.ts#L2624-L2635)
- **영역**: 5 단서 challenges
- **문제**: dc-1.b.q1 = 「이번에도 스스로 악역이 되면 또 같은 낙인이 반복된다는 걸 알면서, 왜 끝까지 침묵했습니까?」. dc-5.b.q1 = 「이번에도 스스로 악역이 되면 같은 낙인이 반복된다는 걸 알면서, 왜 끝까지 혼자 버텼습니까?」. 두 question frame 거의 동일 (「이번에도 스스로 악역」 + 「같은 낙인 반복」 + 「왜 끝까지 X」). 의도된 mirror (dc-1 = chain 시작 + dc-5 = chain 종점, B 침묵 영역의 first/last 추궁) vs 중복.
- **영향**: player 가 같은 frame 의 질문을 두 번 받는 영역. 의도된 mirror 라면 frame 더 명확히 분화 필요 (예: dc-1 = 침묵 그 자체 / dc-5 = 반복된 침묵).
- **옵션**: F-15-A (현재 유지 — mirror 의도) / F-15-B (dc-5.b.q1 frame 변경 — 예: 「두 시점 모두 혼자 막으려 한 행동이 어떻게 다은이를 또 한 번 무너뜨리는 결과로 이어졌습니까?」, 반복 구조 + 결과 frame) / F-15-C (dc-1.b.q1 frame 변경 — dc-1 = 단톡방 글의 「근거」영역, 「단톡방 글에 대해 침묵한 즉각적 이유」 frame 으로 더 좁히기)

### F-16. e-6 5년 전 통장 사본 + 문자 캡처 B 보존 자연성
- **위치**: [friend-01.case.ts:2096-2099](src/data/coreCases/friend-01.case.ts#L2096-L2099) (e-6 trustStates.submitted)
- **영역**: 7 증거 (provenance)
- **문제**: e-6 = 「과거 송금 영수증 + 문자」. trustStates.submitted = 「B 가 통장 사본 + 문자 캡처 제출」. 5년 전 자료 (통장 + 문자) 를 B 가 모두 보존. B character = `affect_flattening` + `minimal` digital habit + 「조용히 사라진」 character. 5년 전 사기 피해 자료를 모두 보존하고 있었던 이유 = 침묵 동기 + 가능한 미래 회복 영역 frame 추정. 단 명시 X.
- **영향**: e-6 provenance 자연성. 보존 동기 frame.
- **옵션**: F-16-A (현재 유지 — 사기 피해 자료 보존 = 일반적 정황) / F-16-B (e-6 description 또는 partyContext.b.implication 에 「언젠가 필요할 수 있다는 frame 으로 보존」 frame 명시) / F-16-C (B sensitivePoints 에 「사기 피해 자료 보존 영역」 1줄 추가)

### F-17. e-5 회사 동료 실명 봉인 = w-2 박준혁 본인 영역
- **위치**: [friend-01.case.ts:2050-2060](src/data/coreCases/friend-01.case.ts#L2050-L2060) (e-5 sensitiveSealTargets) + [w-2 L2197](src/data/coreCases/friend-01.case.ts#L2197)
- **영역**: 7 증거 (sensitiveSealTargets) + 3 증인 정합
- **문제**: e-5 sensitiveSealTargets.labels = 「회사 동료 실명」 + 「최수민 메시지의 사적 톤」. 회사 동료 = 박준혁 본인. 봉인 영역 (회사 동료 실명) vs 증인 영역 (박준혁이 증인 호출되어 공개 발언) 정합 — 동일 인물 정보 봉인 vs 노출.
- **영향**: e-5 봉인 정책 정합 영역. 박준혁이 증인 호출되면 본인 실명 공개 → e-5 회사 동료 실명 봉인 의미 약화.
- **옵션**: F-17-A (현재 유지 — e-5 회사 단톡방 영역의 다른 동료 실명 봉인 frame) / F-17-B (sensitiveSealTargets.labels 명확화 — 「예비신랑 회사 다른 동료 실명 (박준혁 외)」 frame 으로 분화) / F-17-C (risks 영역에 「박준혁 증인 호출 시 본인 실명 노출 자연 — 다른 동료 영역만 봉인 유지」 frame 명시)

### F-18. B archetype `affect_flattening` + 9일간 적극 우회 연락 정합
- **위치**: [friend-01.case.ts:184-217](src/data/coreCases/friend-01.case.ts#L184-L217) (party B) + e-1 description + d-1 truthStages
- **영역**: 두 당사자 character
- **문제**: F-03 과 연결. B character = `affect_flattening` (감정 누른 frame) + verbalTell `flat_delivery` + `self_blame_shield` + `third_party_protection`. 9일간 6 전화 11 문자 = 적극 우회 연락 행동. character verbalTells 영역에 「위기 시 적극 반복 행동」 영역 명시 X. dailyRoutine = 「혼자 정리 + 카페에서 혼자 문자」 = 조용한 character. 9일간 반복 연락 = 다른 frame.
- **영향**: B character 일관성. 사건 핵심 행동 (9일간 연락) 이 character frame 과 다른 영역 — 동기 (결혼 위기 + 5년 전 패턴 반복 인식) 로 자연 단 character verbalTells 영역에 frame 추가 검토.
- **옵션**: F-18-A (현재 유지 — character verbalTells 는 일상 frame, 위기 영역은 별도) / F-18-B (party B verbalTells 에 「위기 시 우회 적극 행동」 영역 1개 추가) / F-18-C (party B sensitivePoints 에 「위기 인지 시 평소와 다른 적극 행동」 영역 1줄 추가)

### F-19. 9일간 연락 내용 frame 모호성 + 예비신랑 오해 가능성
- **위치**: [friend-01.case.ts:289-302](src/data/coreCases/friend-01.case.ts#L289-L302) (timeline stage 4) + [e-1 / e-4 description](src/data/coreCases/friend-01.case.ts#L1852)
- **영역**: 사건 흐름 + e-1 / e-4 description
- **문제**: B 의 9일간 메시지 = 「다은이 관련 이야기예요」 「예전에 같은 일이 있었거든요」 같은 우회 frame. 너무 모호한 우회로는 예비신랑이 「B 가 자기에게 추파」 오해 frame 도 가능. 김태윤 character (선 넘는 추파 + 떠벌림) 가 「B 가 우회로 자기를 갈망」 frame 으로 단톡 토로한 영역도 자연. 사건 frame 영역의 자연성.
- **영향**: 사건 stage 4 frame. 9일간 연락의 자연성 — B 의 우회 frame ↔ 예비신랑 오해 frame 정합.
- **옵션**: F-19-A (현재 유지 — 모호한 frame 으로 사건 reframe 의 핵심 trick 역할) / F-19-B (timeline stage 4 description 또는 e-1 depthStages 에 「B 메시지 frame 의 모호성이 예비신랑 떠벌림으로 이어진 영역」 frame 명시) / F-19-C (e-5 description 에 「예비신랑이 B 메시지를 자기 frame 으로 해석한 영역」 명시)

---

## P3 — 디테일 / 정합 (9건)

### F-20. dc-5 leadLine 미정의 — 의도 vs 누락
- **위치**: [friend-01.case.ts:2577-2603](src/data/coreCases/friend-01.case.ts#L2577-L2603) (dc-5)
- **영역**: 5 단서
- **문제**: dc-1~dc-4 모두 leadLine 명시 (L-1 Timeline / L-2 Context / L-3 Beneficiary / L-4 Emotion). dc-5 만 leadLine 없음. challenges 영역 (a + b 각각 1 question) 만 있음. chain 종점 카드 (정리 영역) frame 의도 vs leadLine 누락.
- **영향**: dc-5 chain 종점 영역의 frame 일관성. leadLine 없으면 player 가 dc-5 를 어떻게 발견하는지 + leadType 영역 빈공간.
- **옵션**: F-20-A (현재 유지 — chain 종점 = leadLine 불필요, 직접 발견 frame) / F-20-B (dc-5 leadLine 신설 — L-5 Synthesis Lead, firstInputs=[e-2, e-7], secondInputs=[L-5, dc-4]) / F-20-C (dc-5 type 영역 명시 — chain 종점 카드 frame 으로 leadLine 없는 이유)

### F-21. truthTable t-5 weight=8 — 의도 vs 누락
- **위치**: [friend-01.case.ts:352-357](src/data/coreCases/friend-01.case.ts#L352-L357) (truthTable t-5)
- **영역**: truthTable
- **문제**: t-1 ~ t-4 = weight 10. t-5 (「A 가 확인 없이 단톡방에서 B 먼저 매도」) = weight 8. 다른 truth 보다 가중치 낮음 — 의도된 차별 (단톡방 매도 = 절차적 책임 영역, 진실 자체 frame 보다 가벼움?) vs 누락 (10 입력 누락).
- **영향**: truthTable weight 정합. 사건 종결 시 player score 영역에 영향.
- **옵션**: F-21-A (현재 유지 — 의도된 차별, 단톡방 매도 = 절차 책임 영역) / F-21-B (weight 10 으로 통일) / F-21-C (case.ts 주석 명시 — t-5 weight=8 이유)

### F-22. 「예비 신랑」 vs 「예비신랑」 표기 일관성
- **위치**: case.ts 전체 (검색 필요)
- **영역**: 디테일 / 표기
- **문제**: 사건 권위 자료에 「예비신랑」 + 「예비 신랑」 영역 혼재 가능성. 사건 내 일관성 검토.
- **영향**: 표기 일관성. 다국어 sync 시 base translation 영역.
- **옵션**: F-22-A (현재 유지 — 한국어 자연 영역) / F-22-B (「예비신랑」 으로 통일 — grep 검색 + 교체) / F-22-C (다른 표기 발견 시 보고)

### F-23. 김태윤 실명 영역 자연성 + 사건 종결 frame
- **위치**: [e-4 description L1973](src/data/coreCases/friend-01.case.ts#L1973) + [e-5 description L2014](src/data/coreCases/friend-01.case.ts#L2014)
- **영역**: 3rd party (예비신랑)
- **문제**: e-4 + e-5 에 「예비신랑 김태윤」 실명 등장. 사건 종결 시 김태윤 책임 영역 명확화 필요? (사건 본 thread 영역 = A·B 책임 정리 + 김태윤 = 3rd party — 단 김태윤 책임 frame 검토).
- **영향**: 사건 종결 frame + 김태윤 책임 영역.
- **옵션**: F-23-A (현재 유지 — 사건 외 영역) / F-23-B (officialRecordRecommendations 에 김태윤 책임 1줄 추가) / F-23-C (F-12 와 통합)

### F-24. e-1 ↔ e-4 출처 분리
- **위치**: [e-1 trustStates L1881](src/data/coreCases/friend-01.case.ts#L1881) + [e-4 trustStates L2002](src/data/coreCases/friend-01.case.ts#L2002)
- **영역**: 7 증거 (provenance)
- **문제**: e-1 = 김태윤이 A 에게 캡처 보여준 후 A 가 본 법정에 정리·제출. e-4 = 같은 김태윤 휴대폰의 다른 메시지 (선 넘는 메시지 + B 거절) 인데 trustStates.submitted = 「최수민이 캡처 제출」. 즉 두 사람 다 같은 대화 영역 캡처 보유. 김태윤이 e-1 만 보여주고 e-4 는 안 보여줬는데 B 가 같은 대화 영역을 제출 = 자연 (B 본인 휴대폰 영역). 정합.
- **영향**: e-1 / e-4 provenance 정합. 정독 결과 자연 영역.
- **옵션**: F-24-A (현재 유지 — 정합) / F-24-B (e-4 trustStates.submitted 에 「최수민이 본인 휴대폰의 같은 대화 캡처 제출」 frame 명시) / F-24-C (e-1 ↔ e-4 영역 분리 frame 별도 영역 명시)

### F-25. B 의 9일간 메시지 11건 ↔ e-1 evidence 분포 정합
- **위치**: [e-1 description L1852](src/data/coreCases/friend-01.case.ts#L1852) + [e-4 description L1973](src/data/coreCases/friend-01.case.ts#L1973) + [e-5 description L2014](src/data/coreCases/friend-01.case.ts#L2014)
- **영역**: 7 증거 (영역 중첩)
- **문제**: e-1 = 9일간 전화 6 + 문자 11 의 송수신 흐름. e-4 = 같은 9일간의 다른 영역 (예비신랑 메시지 + B 거절). e-5 = 같은 9일간의 B 의 차단 메시지 + 예비신랑 회사 단톡 토로. 세 evidence 가 같은 9일간 영역 중첩. depthStages 영역에서 각 evidence 의 분리 frame 정합.
- **영향**: e-1 / e-4 / e-5 영역 중첩 정합 + player frame.
- **옵션**: F-25-A (현재 유지 — 각 evidence 의 frame 분리 자연) / F-25-B (각 evidence 의 depthStages 영역에 분리 frame 명시 강화) / F-25-C (별도 정합 검토)

### F-26. anchorTruth 다층 진실 — disclosure tier 정합
- **위치**: [meta.anchorTruth L88-90](src/data/coreCases/friend-01.case.ts#L88-L90)
- **영역**: 사건 핵심 진실
- **문제**: anchorTruth = 1) B 경고 의도 / 2) A 아버지 5년 패턴 반복 + 사기 / 3) B 침묵 + 악역 자처 / 4) A 매도 + 반복 구조. 5 truth chain 의 disclosure tier (그룹 1~5) 와 정합. 사건 종결 frame 자연성.
- **영향**: anchorTruth ↔ disclosure tier 정합 (design-friend01-truth-disclosure-policy 메모리 정합).
- **옵션**: F-26-A (현재 유지 — 정독 결과 정합) / F-26-B (anchorTruth 영역 명확화 — 5 chain 명시 frame 강화) / F-26-C (정합 검토 자료 별도 작성)

### F-27. e-7 provenance='self_possessed' vs trustStates "본 법정 정리" 정합
- **위치**: [e-7 L2117-2156](src/data/coreCases/friend-01.case.ts#L2117-L2156)
- **영역**: 7 증거 (provenance)
- **문제**: e-7 「과거/현재 대조표」 provenance = `self_possessed`. trustStates.submitted = 「본 법정이 e-4 + e-5 + e-6 자료의 시점·문구를 종합 정리한 권위 자료」. self_possessed (= 당사자 보유 자료) vs 본 법정 정리 (= 외부 권위) frame 정합 영역. provenance 영역 = `institutional` 또는 신규 영역 (`court_compiled`) 가 더 자연.
- **영향**: e-7 provenance schema 정합. 다른 사건 (spouse-01 / family-01) 의 court-compiled 영역 정책 검토 필요.
- **옵션**: F-27-A (현재 유지 — self_possessed 영역 유지) / F-27-B (provenance = `institutional` 변경 — 본 법정 정리 영역) / F-27-C (공통 CT thread 안내 — 새 provenance type `court_compiled` 신설 검토)

### F-28. truthLeakOverride.perDispute 비움 정책 정합
- **위치**: [truthLeakOverride L3022-3028](src/data/coreCases/friend-01.case.ts#L3022-L3028)
- **영역**: 진실 노출 정책
- **문제**: truthLeakOverride.perDispute = `{}` (비움) + designIntentTags = whitelist. 정책 = baseline truth-leak-matrix.friend-01 hidden 영역 보존. design_truth_leak_keyword_nature + design_friend01_truth_disclosure_policy 메모리 정합. 정독 결과 자연.
- **영향**: 진실 노출 정책 영역 정합.
- **옵션**: F-28-A (현재 유지 — 정책 정합) / F-28-B (perDispute 영역 신규 검토 — disclosure tier 정책 강화 영역) / F-28-C (별도 검토 X)

---

## 요약

| 우선순위 | 건수 | 핵심 영역 |
|---|---|---|
| **P0** | 3 | A 아버지 character / stage 0 자연성 / 9일간 우회 character 정합 |
| **P1** | 6 | 책임 분배 frame (d-2 / d-4) / d-3 quadrant / w-1 시점 / B 손절 표현 / A 아버지 시점 |
| **P2** | 10 | timeline / character / 증인 / 증거 / dossier challenge 영역 자연성 |
| **P3** | 9 | leadLine / weight / 표기 / provenance / 정책 정합 |

**총 28건** (사전 review 영역 20개 + 정독 추가 8개. 일부 항목은 통합/제외됨)

다음 = `proposals.md` (각 항목별 옵션 + 권장 안 + 검토 reasoning).
