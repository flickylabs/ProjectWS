# Headline Case Draft v1

## 사건명
- `사생팬 맞춤형 셀카`

## 상태
- `CaseAuthoringSpec` 기준 실제 설계 초안
- 현재 7개 기본 카테고리 밖의 `headline/special` 사건
- 런타임 반영 시 신규 `relationshipType: artist_manager`를 추가하거나, 임시로 `boss_employee`에 매핑한 뒤 headline 라인으로 운영 권장

## 한 줄 훅
- 인기 아이돌의 비공개 셀카와 숙소 동선이 사생팬 손에 들어가고, 멤버는 `매니저가 팔아넘겼다`고 주장한다.  
  그런데 원본을 까보면, 매니저는 `관리`를 핑계로 팬 운영자와 위험한 거래를 해왔고, 멤버도 사생 계정과 비밀 접촉을 이어오며 불씨를 키웠다.

## 왜 이 사건이 맞는가
- 표면은 강하다: `사생팬`, `비공개 셀카 유출`, `숙소 동선 노출`, `매니저 배신`, `팬덤 폭주`
- 판결은 회색지대다:
  - 피해자 보호는 어디까지 우선되어야 하는가
  - 위험을 막기 위한 비밀 접촉은 정당화될 수 있는가
  - 내부 관리 명목의 `비공식 팬 운영`은 안전 조치인가, 사실상 유출인가
  - 진실을 전부 공개하면 2차 피해가 커질 때 어디까지 덮고 어디까지 밝힐 것인가
- 양측 공방이 강하다:
  - A는 `명백한 스토킹 피해자`처럼 보이지만, 비밀 계정 접촉과 은폐로 위험을 키운 책임이 있다
  - B는 `현장 보호 관리자`처럼 보이지만, 팬 운영자와의 오프더레코드 거래와 정보 흘리기로 시스템 자체를 오염시켰다

## CaseAuthoringSpec

```ts
caseId: "headline-02"
legacyCaseId: "case-headline-02"
title: "사생팬 맞춤형 셀카"
category: "headline"
summary: "비공개 셀카와 숙소 정보 유출 뒤 멤버는 매니저의 내부 유출을 주장하고, 매니저는 멤버의 비밀 팬 접촉이 사태를 키웠다고 맞선다. 원본 사진 메타데이터, 호텔 출입 로그, 팬 운영자 DM, 내부 사고 보고서가 열리면서 둘 다 피해자이면서 둘 다 위험을 키운 당사자였다는 사실이 드러난다."
headlineHook: "비공개 셀카 속 컵홀더와 창문 각도만으로 사생팬이 숙소 층수를 맞혔다. 다음 날, 멤버는 매니저를 지목했고 매니저는 ‘본인이 먼저 팬 계정이랑 놀았다’는 메시지를 꺼내 든다."
sensitivityTags: ["sasaeng", "privacy_leak", "celebrity_harassment", "fan_network", "doxxing_risk"]
```

## Meta
```ts
meta: {
  relationshipType: "artist_manager",
  difficulty: "hard",
  conflictSeed: "CS-H2",
  twistModule: "TW-public-03",
  emotionalBait: "유출 셀카, 팬계정의 층수 추적 글, 울먹이는 멤버의 브이로그 사과, 매니저의 '안전관리 차원이었다'는 해명이 연쇄적으로 겹치며 누구나 먼저 한쪽을 확신하게 만든다.",
  anchorTruth: "매니저는 안전관리와 팬 통제를 명분으로 특정 팬 운영자에게 일정·동선의 일부를 흘려왔고, 멤버는 사생 계정과 비밀 접촉을 이어오며 위험을 제때 신고하지 않았다. 직접 침입의 책임은 외부에 있지만, 내부에서 위험을 키운 구조 책임은 양쪽 모두에게 있다.",
  resolutionDilemma: "명백한 스토킹 피해를 최우선 보호하면서도, 멤버의 은폐와 매니저의 비공식 정보 거래를 어디까지 책임 물어야 하는가? 진실 공개가 재발 방지에 도움 되더라도 2차 유포와 팬덤 폭주를 키운다면 어디까지 비공개로 막아야 하는가?"
}
```

## Duo

### Party A
```ts
partyA: {
  id: "a",
  name: "하서윤",
  age: 27,
  occupation: "걸그룹 메인보컬",
  incomeBracket: "high",
  archetype: "affect_flattening",
  publicMask: "calm",
  pressureResponse: "withdraw",
  reputationAxis: "public_image",
  speechStyle: "처음에는 감정을 눌러 담고 최소한만 말한다. 그러나 비밀 접촉이나 팬 관리 이야기가 나오면 말을 자르거나 맥락을 크게 생략하며, 끝내 몰리면 자신이 얼마나 무서웠는지와 회사가 아무것도 안 했다는 쪽으로 축을 옮긴다.",
  pride: 7,
  fear: "사생을 역이용한 사람, 관심을 즐긴 사람처럼 보이는 것",
  riskAppetite: 4,
  digitalHabit: "sns_active",
  dailyRoutine: "연습과 촬영, 이동 대기가 길고 개인 시간 대부분을 휴대폰과 팬 반응 확인에 쓴다. 공식 계정 외에 비공개 저장용 계정과 버너 메신저를 따로 쓴다.",
  sensitivePoints: ["사생팬 언급", "안전관리 부재", "팬을 이용했다는 프레임", "멤버 활동 중단 책임"],
  verbalTells: [
    {
      type: "avoiding",
      trigger: "lying",
      pattern: "직접 접촉 여부를 묻는 질문에는 '확인하려고 본 적은 있다', '그쪽에서 먼저 보낸 것뿐이다'처럼 주어를 흐린다."
    },
    {
      type: "hurt",
      trigger: "hurt",
      pattern: "위험을 설명할 때 사실 순서보다 밤새 잠을 못 잤던 감각, 문 앞 인기척 같은 체감 공포를 먼저 꺼낸다."
    },
    {
      type: "premature_summary",
      trigger: "cornered",
      pattern: "불리해지면 '결국 회사가 지켜주지 않았다는 얘기예요'라며 세부 책임을 하나의 결론으로 덮으려 한다."
    }
  ],
  callTerms: {
    toPartner: "팀장님",
    toJudge: "저 매니저",
    angry: "최도혁 씨"
  }
}
```

### Party B
```ts
partyB: {
  id: "b",
  name: "최도혁",
  age: 38,
  occupation: "연예기획사 팀 매니저",
  incomeBracket: "mid",
  archetype: "cold_logic",
  publicMask: "professional",
  pressureResponse: "attack",
  reputationAxis: "career",
  speechStyle: "현장 관리, 동선 분산, 팬 통제 같은 실무 용어를 앞세운다. 하지만 몰리면 '현장을 모르면 쉽게 말한다'며 공격적으로 바뀌고, 멤버의 경솔함을 반복해서 부각한다.",
  pride: 9,
  fear: "멤버 하나 지키지 못한 무능한 매니저, 팬에게 붙어먹은 사람으로 낙인찍히는 것",
  riskAppetite: 6,
  digitalHabit: "messenger_main",
  dailyRoutine: "이동표 확인, 경호팀 연락, 현장 진입 동선 조정, 팬 대응, 회사 보고를 촘촘히 반복한다. 공식 메신저 외에 팬 운영자 몇 명과는 사적으로도 연락한다.",
  sensitivePoints: ["직무 무능 프레임", "팬과의 개인 거래", "정보 유출 책임", "회사 징계"],
  verbalTells: [
    {
      type: "process_shield",
      trigger: "lying",
      pattern: "'원래 현장은 그렇게 굴러간다', '완전히 끊을 수는 없다'며 책임을 업계 관행 뒤로 숨긴다."
    },
    {
      type: "counter_motive",
      trigger: "cornered",
      pattern: "자신의 유출 의혹을 묻는 순간 '본인이 팬이랑 직접 말한 건 왜 빠집니까'라며 즉시 상대 동기로 되받아친다."
    },
    {
      type: "precision_spike",
      trigger: "defensive",
      pattern: "억울함이 치솟을수록 층수, 이동 시각, 팬 숫자, 경호 인원을 지나치게 정확한 수치로 읊는다."
    }
  ],
  callTerms: {
    toPartner: "서윤 씨",
    toJudge: "저 멤버",
    angry: "하서윤 씨"
  }
}
```

## Context
```ts
context: {
  contextType: "celebrity_privacy_breach",
  description: "비공개 숙소와 이동 동선이 사생팬 커뮤니티에 퍼진 뒤 팬덤 내부 폭로전과 언론 문의가 동시에 터졌다. 소속사는 활동 중단과 법적 대응을 검토 중이고, 둘 다 지금 한 발만 더 잘못 디뎌도 커리어와 안전이 동시에 무너질 수 있다.",
  emotionalPressure: 9,
  affects: "both",
  triggerAmplifier: "서윤은 자신이 피해자인데도 역으로 비난받을까 두렵고, 도혁은 안전관리 실패를 넘어 팬과 거래한 사람으로 찍힐까 두렵다. 그래서 작은 누락 하나도 곧바로 배신이나 자작극처럼 읽힌다."
}
```

## Disputes

### d-1 유출의 시작은 누구였는가
```ts
{
  id: "d-1",
  name: "비공개 셀카와 숙소 정보의 유출 경로",
  claimA: "매니저가 일정과 위치 단서를 팬 운영자에게 넘겨 유출을 사실상 열어줬다.",
  claimB: "멤버가 사생 계정과 비밀 접촉을 하며 사진 단서를 스스로 흘렸다.",
  publicSummary: "내부 유출인가, 경솔한 비밀 접촉인가",
  truthDescription: "도혁은 '통제 가능한 팬'이라 믿는 운영자에게 일정 창과 이동 단서를 비공식적으로 흘렸고, 서윤은 버너 계정으로 사생 계정과 접촉하며 셀카 원본 일부를 보냈다. 직접 유출은 외부에서 이루어졌지만, 위험한 단서 제공은 양쪽 모두 했다.",
  hiddenUntil: "evidence",
  quadrant: "both_know",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-1", "e-2", "e-3", "e-4"],
  mediationLink: "보호조치",
  correctResponsibility: { a: 40, b: 60 },
  aSide: {
    justifiedPoint: "비공개 위치 정보가 외부로 나간 핵심 통로는 매니저의 팬 운영자 접촉이었다.",
    hiddenPoint: "자신도 사생 계정과의 비밀 접촉으로 위치 특정에 쓰일 단서를 남겼다."
  },
  bSide: {
    justifiedPoint: "멤버의 비밀 접촉과 원본 이미지 공유가 사태를 키운 것은 사실이다.",
    hiddenPoint: "자신도 비공식 팬 운영망에 일정과 동선을 흘려온 관행이 있었다."
  }
}
```

### d-2 멤버의 비밀 접촉은 자기방어였는가, 위험한 역이용이었는가
```ts
{
  id: "d-2",
  name: "사생 계정과의 버너 접촉",
  claimA: "누가 정보를 갖고 있는지 확인하고 가족 사진 유포를 막으려는 자기방어였다.",
  claimB: "팬심과 관심을 관리하려고 위험한 줄 알면서도 몰래 접촉을 이어온 것이다.",
  publicSummary: "자기방어인가, 위험한 역이용인가",
  truthDescription: "서윤은 사생 네트워크의 규모와 유포 사진 출처를 확인하려고 버너 계정으로 답장을 주고받았고, 가족 사진 삭제를 요구하기도 했다. 하지만 그 과정에서 관심을 완전히 끊지 못했고, 비공식 접촉이 가져올 파급을 회사에 즉시 알리지 않았다.",
  hiddenUntil: "evidence",
  quadrant: "a_only",
  ambiguity: "high",
  weight: "medium",
  legitimacyIssue: false,
  relatedEvidenceIds: ["e-1", "e-4", "e-5"],
  mediationLink: "활동조정",
  correctResponsibility: { a: 65, b: 35 },
  aSide: {
    justifiedPoint: "직접 위협받는 상황에서 유포를 막고 출처를 파악하려는 동기가 있었다.",
    hiddenPoint: "위험성을 알면서도 접촉을 끊지 못했고 내부 신고를 늦췄다."
  },
  bSide: {
    justifiedPoint: "사생과의 사적 접촉은 실제로 안전 프로토콜을 무너뜨린다.",
    hiddenPoint: "그 사실을 알게 된 뒤에도 회사 보고보다 본인 책임 회피에 먼저 활용했다."
  }
}
```

### d-3 매니저의 팬 운영자 활용은 안전관리였는가, 사실상 거래였는가
```ts
{
  id: "d-3",
  name: "비공식 팬 운영자 네트워크",
  claimA: "매니저는 팬 운영자와 선물과 정보를 주고받으며 사생을 관리한다는 명분으로 거래했다.",
  claimB: "공식 채널만으론 통제가 안 돼서 현장에서 덜 위험한 팬을 통해 상황을 관리했을 뿐이다.",
  publicSummary: "비공식 안전관리인가, 위험한 정보 거래인가",
  truthDescription: "도혁은 오래된 팬 운영자 몇 명에게 구역 이동, 대기 시점, 출입 루머를 부분적으로 흘리며 현장 과열을 조절해왔다. 직접 현금을 받은 건 아니지만 고가 선물과 호의, 온라인 여론 관리의 도움을 받았고, 그 관계는 이미 안전관리 선을 넘어섰다.",
  hiddenUntil: "evidence",
  quadrant: "b_only",
  ambiguity: "medium",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-2", "e-3", "e-5"],
  mediationLink: "징계공개",
  correctResponsibility: { a: 15, b: 85 },
  aSide: {
    justifiedPoint: "팬 운영자와의 오프더레코드 접촉이 내부 유출과 2차 피해 구조를 만들었다.",
    hiddenPoint: "그 관계를 알고도 초기엔 노골적으로 문제 삼지 못했다."
  },
  bSide: {
    justifiedPoint: "실무 현장에선 위험한 군중을 완전히 끊지 못해 비공식 조정이 실제로 쓰이기도 한다.",
    hiddenPoint: "그 관행을 스스로 통제 가능하다고 믿으며 계속 유지했고, 사적 이익도 일부 누렸다."
  }
}
```

### d-4 사고 이후 회사 대응은 보호였는가, 책임 전가였는가
```ts
{
  id: "d-4",
  name: "사과문 초안과 활동 중단 압박",
  claimA: "매니저와 회사는 나를 경솔한 당사자로 몰아 사과문과 활동 중단을 강요했다.",
  claimB: "더 큰 유출과 팬 폭주를 막으려면 일부 사실을 숨기고 멤버 행동부터 정리할 수밖에 없었다.",
  publicSummary: "피해자 보호 조치인가, 책임 전가와 입막음인가",
  truthDescription: "회사와 도혁은 내부 보안 실패가 드러나는 것을 막기 위해 서윤의 '경솔한 개인 접촉'을 전면에 내세운 사과문 초안을 만들고 휴대폰 제출과 활동 축소를 요구했다. 다만 서윤도 계약 위반과 비밀 계정 사용이 드러날까 두려워 일부 자료를 숨겼다.",
  hiddenUntil: "evidence",
  quadrant: "both_know",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-4", "e-5", "e-6"],
  mediationLink: "공개범위",
  correctResponsibility: { a: 25, b: 75 },
  aSide: {
    justifiedPoint: "회사와 매니저는 구조적 실패를 덮고 개인 책임만 강조했다.",
    hiddenPoint: "본인도 계약 페널티와 여론을 두려워해 자료 일부를 제출하지 않았다."
  },
  bSide: {
    justifiedPoint: "확산을 멈추기 위해 빠른 메시지 통제가 필요했던 건 사실이다.",
    hiddenPoint: "보호보다 조직 책임 은폐와 개인 희생양 만들기가 더 컸다."
  }
}
```

## Dilemma Axes
```ts
[
  {
    id: "ax-1",
    left: "명백한 스토킹 피해자는 우선 보호한다",
    right: "피해자라도 위험을 키운 행위는 분리해 책임 묻는다",
    affectedDisputeIds: ["d-1", "d-2", "d-4"]
  },
  {
    id: "ax-2",
    left: "현장 안전을 위한 비공식 조정도 현실적으로 본다",
    right: "팬 운영자와의 비공식 접촉 자체를 금지선으로 본다",
    affectedDisputeIds: ["d-1", "d-3"]
  },
  {
    id: "ax-3",
    left: "재발 방지를 위해 구조 책임을 공개한다",
    right: "2차 피해를 막기 위해 핵심만 비공개 처리한다",
    affectedDisputeIds: ["d-3", "d-4"]
  }
]
```

## Evidence 6

### e-1 비공개 셀카 원본과 클라우드 동기화 기록
- type: `device`
- 역할: `표면 훅` + `원본 단서`
- proves: `d-1`, `d-2`
- surface: 셀카 원본의 배경, 컵홀더 문구, 창문 각도, 전송 시각
- 진실: 위치 특정 단서가 충분했고 일부 파일은 버너 계정을 통해 외부 전송 흔적이 있다

### e-2 호텔 엘리베이터 CCTV와 출입 로그
- type: `cctv`
- 역할: `중립 타임라인`
- proves: `d-1`, `d-3`
- surface: 특정 팬 운영자가 일반 투숙객 동선과 겹치지 않는 시간대에 같은 층 접근
- 진실: 도혁 쪽 출입 승인과 맞물리는 예외 출입 흔적이 있다

### e-3 팬 운영자 DM과 선물 수령 사진
- type: `chat`
- 역할: `B의 숨긴 거래`
- proves: `d-1`, `d-3`
- surface: '오늘은 11시 이후가 낫다', '사진 올리는 타이밍만 맞춰달라'는 메시지
- 진실: 직접 돈은 아니지만 일정 단서, 호의, 온라인 여론 관리가 맞교환됐다

### e-4 버너 계정 메신저 대화
- type: `chat`
- 역할: `A의 숨긴 칼`
- proves: `d-1`, `d-2`, `d-4`
- surface: 사진 삭제 요구, 위치 확인 질문, 겁먹은 표현
- 진실: 자기방어 목적이 있었지만 접촉을 여러 차례 이어가며 위험을 키웠다

### e-5 내부 보안 사고 보고서와 삭제된 사과문 초안
- type: `contract`
- 역할: `구조 책임과 은폐`
- proves: `d-2`, `d-3`, `d-4`
- surface: '개인 부주의' 중심의 초안과 별도 보안 보고서의 괴리
- 진실: 회사는 내부 관리 실패를 알고도 개인 일탈 서사로 밀려 했다

### e-6 이동표 수정 이력과 휴대폰 제출 요청 메일
- type: `log`
- 역할: `사후 책임 전가`
- proves: `d-4`
- surface: 활동 중단 검토, 휴대폰 제출 요청, 동선표 급수정 이력
- 진실: 보호 조치와 책임 전가가 뒤섞여 있었고, 일부 수정은 사후 은폐 성격이 강하다

## baseEvidenceIds 권장
```ts
baseEvidenceIds: ["e-1", "e-2", "e-4"]
```

- `e-1`: 유출 셀카라는 표면 스캔들
- `e-2`: 중립 타임라인과 출입 단서
- `e-4`: A의 숨겨진 접촉이라는 첫 뒤집기

## Witness Pool

### tp-1 오민석
- slot: `institutional`
- 정체: 호텔 보안팀 총괄
- relationTo: `both`
- knowledgeScope: 출입 로그 예외 승인, 층수 접근 시간, 팬 운영자 의심 인물 출입을 안다
- bias: `neutral`
- distortionRisk: `accurate`

### tp-2 김예린
- slot: `acquaintance_1`
- 정체: 헤어 메이크업 스태프
- relationTo: `a`
- knowledgeScope: 서윤의 공포 상태, 버너폰 존재, 회사가 초기에 얼마나 소극적이었는지 안다
- bias: `pro_a`
- distortionRisk: `unconscious`
- hiddenAgenda: 서윤을 보호하려는 마음이 강해 접촉 횟수는 축소할 가능성이 있다

### tp-3 박해주
- slot: `acquaintance_2`
- 정체: 전 팬사이트 운영자
- relationTo: `b`
- knowledgeScope: 도혁과 팬 운영자 사이의 암묵적 거래, 선물 수수, 현장 통제 명분을 안다
- bias: `self_interest`
- distortionRisk: `strategic`
- hiddenAgenda: 자기 처벌을 피하려고 가장 위험한 직접 행위는 축소한다

## Social Heat / Interjections
- 인터럽트 1: B가 “피해자라고만 하기엔 본인이 먼저 계정을 열었잖아요”라며 버너 대화를 먼저 꺼냄
- 인터럽트 2: A가 “그 팬 계정 이름, 팀장님 입에서 왜 먼저 나와요”라고 받아치며 B의 팬 운영자 접촉을 찌름
- 인터럽트 3: tp-3이 “그날도 시간대는 팀장님 쪽에서 먼저 왔어요”라고 끼어들어 구조 책임을 흔듦

## Dossier Card 후보
- `dc-1 셀카 단서와 위치 특정`
  - evidence: `e-1`, `e-2`
  - 핵심: 원본 이미지 하나가 어디까지 위치를 열어주는가
- `dc-2 버너 접촉의 목적`
  - evidence: `e-4`
  - 핵심: 자기방어인가, 위험한 역이용인가
- `dc-3 팬 운영자 네트워크`
  - evidence: `e-2`, `e-3`
  - 핵심: 안전관리인가, 정보 거래인가
- `dc-4 사과문과 책임 전가`
  - evidence: `e-5`, `e-6`
  - 핵심: 보호 조치인가, 조직적 희생양 만들기인가

## Solutions
```ts
solutions: {
  보호조치: [
    "멤버 개인 동선, 숙소, 비공개 계정 관련 정보는 전면 비공개 처리하고 즉시 접근금지·수사 협조 체계로 전환한다.",
    "경호와 숙소 관리 프로토콜을 외부 업체 포함 전면 교체하고, 팬 운영자와의 비공식 접촉은 즉시 차단한다.",
    "멤버 개인 단말 보안과 가족 정보 보호 조치를 먼저 시행한 뒤 공개 범위를 최소화한다."
  ],
  징계공개: [
    "매니저의 비공식 팬 운영·정보 누설 책임을 대외적으로 인정하고 직무 배제 및 내부 징계를 진행한다.",
    "멤버의 비밀 접촉과 신고 지연도 분리해 공식 경고하되, 스토킹 피해자 책임전가 프레임으로 소비하지 않도록 문구를 제한한다.",
    "회사 보안 실패와 팬 운영 관행을 감사 결과로 공개하고 재발 방지 계획을 동시 발표한다."
  ],
  활동조정: [
    "멤버는 짧은 활동 조정과 심리 지원을 받되, 사과문 중심이 아니라 보호 회복 중심으로 발표한다.",
    "매니저 교체 이후 팀 운영을 재정비하고, 남은 활동 일정은 안전 재점검 뒤 단계적으로 재개한다.",
    "공개 책임 인정과 별개로 추가 2차 유포가 생기지 않도록 활동 관련 정보는 일시 축소한다."
  ],
  공개범위: [
    "팬 운영자 거래, 내부 사고 보고서, 비밀 접촉 중 무엇을 대외 공개하고 무엇을 비공개할지 단계별 기준을 정한다.",
    "스토킹 수사에 필요한 사실만 공개하고, 멤버의 버너 계정 세부 내용과 가족 관련 자료는 비공개로 보호한다.",
    "회사와 당사자 어느 쪽도 상대의 민감 정보를 방어용 카드처럼 추가 유포하지 못하도록 제한한다."
  ]
}
```

## 재판관 축이 갈리는 지점

### 탐구 축
- `원본 이미지 단서`와 `출입 로그`를 얼마나 집요하게 맞물려 보는가
- `버너 접촉의 목적`과 `팬 운영자 거래`를 따로 읽는가, 하나의 위험 구조로 묶는가

### 판단 축
- 명백한 스토킹 피해자성 때문에 A 책임을 얼마나 낮춰 볼 것인가
- 실무 관행이라도 `팬 운영자와의 비공식 거래`를 금지선으로 볼 것인가

### 해결 축
- 구조 책임을 공개해 재발 방지를 우선할 것인가
- 2차 피해를 막기 위해 보호와 비공개를 더 우선할 것인가
- A와 B 모두에게 책임을 물되 보호 강도를 다르게 둘 것인가

## 이 사건의 의도된 플레이 감정
- 시작: `매니저가 팔아넘긴 건가?` 또는 `또 자작 팬관리인가?`
- 중반: `둘 다 위험한 선택을 했는데, 누가 구조를 더 크게 망가뜨렸지?`
- 후반: `피해자 보호와 책임 분리를 어떻게 동시에 할 것인가`
- 결말: `내 재판관은 보호를 먼저 보는지, 구조 책임을 먼저 보는지 드러난다`

## 구현 메모
- 기존 카테고리에는 바로 안 들어가므로 `headline` 또는 `special` 라인 추가가 가장 자연스럽다
- 당장 기존 enum만 써야 한다면 런타임에서는 `boss_employee`로 매핑하고, meta에서 `artist_manager` 맥락을 유지하는 편이 낫다
- 이 사건은 `피해자 보호`와 `구조 책임 공개`가 실제로 충돌하는 샘플로 쓰기 좋다
