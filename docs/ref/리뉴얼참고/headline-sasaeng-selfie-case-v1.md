# Headline Case Draft v1

## 사건명
- `숙소 앞 셀카`

## 상태
- `CaseAuthoringSpec` 기준 실제 설계 초안
- 현재 7개 기본 카테고리 밖의 `headline/special` 사건
- 런타임 반영 시 `relationshipType: celebrity_management` 추가 또는 별도 headline 라인으로 운용 권장

## 한 줄 훅
- 아이돌 멤버의 비공개 셀카가 팬 커뮤니티에 돈 뒤, 사생이 숙소 앞까지 정확히 찾아온다.  
  그런데 원본을 까보면, 매니저는 팬사이트와 비공개 동선을 거래했고, 멤버는 누가 새는지 알아보려 사생 계정에 직접 미끼를 던졌다.

## 왜 이 사건이 맞는가
- 표면은 강하다: `사생팬`, `비공개 셀카 유출`, `숙소 침입 직전`, `연예계 내부 유출`
- 판결은 회색지대다:
  - 피해자 보호를 위해 일부 사실을 숨겨도 되는가
  - 실제 피해자가 위험한 대응을 했을 때 그 책임은 어디까지 물을 수 있는가
  - 매니저의 `팬서비스 관행`은 어디서부터 위험한 정보 거래가 되는가
  - 팀 활동과 생계를 위해 사건을 조용히 덮는 선택은 어디까지 정당한가
- 양측 공방이 매우 강하다:
  - A는 `실제 피해자`이지만, 누가 새는지 확인하겠다며 직접 위험한 접촉을 했다
  - B는 `현장 지키는 매니저`처럼 보이지만, 실제로는 팬사이트와 비공개 힌트를 주고받으며 위험을 키웠다

## CaseAuthoringSpec

```ts
caseId: "headline-02"
legacyCaseId: "case-headline-02"
title: "숙소 앞 셀카"
category: "headline"
summary: "아이돌 멤버의 비공개 셀카와 귀가 동선이 유출된 뒤 사생이 숙소 앞까지 정확히 찾아오고, 매니저는 멤버의 부주의와 자작 유출 가능성을 주장한다. 셀카 원본, 팬사이트 DM, 로비 출입기록, 보안업체 보고서가 열리면서 멤버와 매니저 모두 사건을 키우고 덮은 책임이 드러난다."
headlineHook: "팬 커뮤니티에 올라온 셀카 배경 속 반사면 하나만 보고도 누군가가 숙소 층과 귀가 시간을 맞춰왔다. 다음 날, 매니저는 멤버가 사생 계정에 먼저 말을 걸었다는 캡처를 꺼낸다."
sensitivityTags: ["celebrity_stalking", "privacy_leak", "fandom_harassment", "doxxing_risk", "cover_up"]
```

## Meta
```ts
meta: {
  relationshipType: "celebrity_management",
  difficulty: "hard",
  conflictSeed: "CS-H2",
  twistModule: "TW-public-03",
  emotionalBait: "엘리베이터 벽면이 비친 셀카, 숙소 앞에서 찍힌 밴 사진, 새벽 경호 호출 기록, 팬사이트 운영자의 친근한 DM이 연달아 나오며 누구라도 먼저 한쪽을 배신자로 단정하게 만든다.",
  anchorTruth: "윤아가 보낸 셀카 원본에는 숙소 단서가 일부 담겨 있었고, 태현은 팬사이트 운영자에게 비공개 동선 힌트를 흘려왔다. 윤아는 누가 새는지 확인하려 사생 계정에 직접 접근했고, 태현은 사건 직후 보안 보고를 늦추며 컴백 일정부터 지키려 했다.",
  resolutionDilemma: "실제 스토킹 피해를 가장 먼저 보호해야 하는가, 아니면 피해자 쪽의 위험한 대응과 내부 유출 책임을 더 명확히 공개해야 하는가? 매니저 개인의 잘못으로 볼지, 팬서비스와 팬덤 경제를 방치한 구조 책임까지 열어야 하는가?"
}
```

## Duo

### Party A
```ts
partyA: {
  id: "a",
  name: "서윤아",
  age: 27,
  occupation: "걸그룹 메인보컬",
  incomeBracket: "high",
  archetype: "affect_flattening",
  publicMask: "calm",
  pressureResponse: "self_justify",
  reputationAxis: "public_image",
  speechStyle: "훈련된 차분함을 유지하려 하고, 감정을 들키지 않으려 문장을 짧게 자른다. 하지만 자신이 정말 겁먹었다는 지점이 나오면 갑자기 디테일이 많아지고, 자신의 행동이 왜 불가피했는지 정리하듯 설명한다.",
  pride: 7,
  fear: "관심을 즐기다 사고를 키운 사람, 팀을 위험에 빠뜨린 멤버처럼 보이는 것",
  riskAppetite: 5,
  digitalHabit: "sns_active",
  dailyRoutine: "연습실과 방송국, 숙소를 오가는 반복된 이동 속에서 팬 반응과 커뮤니티 여론을 수시로 본다. 개인 계정은 닫혀 있지만 비공개 모니터링 계정으로 팬 커뮤니티 흐름을 체크한다.",
  sensitivePoints: ["사생팬 공포", "자기관리 실패 프레임", "팀 활동에 피해 주는 사람처럼 보이는 것"],
  verbalTells: [
    {
      type: "trained_calm",
      trigger: "lying",
      pattern: "불리한 질문이 오면 감정을 먼저 평평하게 누르고, 짧은 단정문으로 자신이 통제 가능한 부분만 남기려 한다."
    },
    {
      type: "selective_precision",
      trigger: "defensive",
      pattern: "겁먹었던 장면을 말할 때는 시간과 위치를 이상할 만큼 정확히 말하지만, 자신이 먼저 한 행동은 '잠깐', '한 번' 같은 흐린 말로 줄인다."
    },
    {
      type: "image_shield",
      trigger: "cornered",
      pattern: "자기 행동을 묻는 질문을 받으면 '팀에 피해를 줄 수 없었다', '팬들 분위기가 더 커질까 봐'처럼 더 큰 이미지를 방패로 세운다."
    }
  ],
  callTerms: {
    toPartner: "매니저님",
    toJudge: "저 매니저",
    angry: "조태현 씨"
  }
}
```

### Party B
```ts
partyB: {
  id: "b",
  name: "조태현",
  age: 38,
  occupation: "로드 매니저",
  incomeBracket: "mid",
  archetype: "cold_logic",
  publicMask: "professional",
  pressureResponse: "attack",
  reputationAxis: "career",
  speechStyle: "동선, 차량 배차, 경호 절차, 현장 판단 같은 운영 논리로 자신을 방어한다. 하지만 몰리면 업계 현실과 멤버 관리 부담을 들며, 개인 일탈이 아니라 어쩔 수 없는 현장 대응이었다고 몰아간다.",
  pride: 8,
  fear: "아티스트를 팔아 팬과 거래한 매니저, 보안 사고를 덮은 사람으로 낙인찍히는 것",
  riskAppetite: 6,
  digitalHabit: "messenger_main",
  dailyRoutine: "새벽 차량 배차와 촬영장 동선 확인, 현장 케어, 팬사이트 응대, 스태프 공지를 모두 메신저와 통화로 처리한다. 문제가 생기면 공식 보고보다 먼저 현장 수습과 여론 차단을 우선한다.",
  sensitivePoints: ["직업적 신뢰", "아티스트 보호 실패", "외부에 내부 관행이 드러나는 것"],
  verbalTells: [
    {
      type: "process_shield",
      trigger: "lying",
      pattern: "자신의 판단을 묻는 질문에도 '원래 현장은', '보안팀 프로토콜상' 같은 절차어로 주체를 흐린다."
    },
    {
      type: "blame_redirect",
      trigger: "cornered",
      pattern: "불리해질수록 곧바로 '먼저 연락한 건 윤아 씨 아닙니까'처럼 상대의 더 위험해 보이는 행동으로 축을 튼다."
    },
    {
      type: "industry_fatalism",
      trigger: "defensive",
      pattern: "팬서비스와 정보 통제를 묻는 질문에 '이 바닥 원래 다 그렇다'는 식으로 구조를 핑계 삼아 개인 책임을 희석한다."
    }
  ],
  callTerms: {
    toPartner: "윤아 씨",
    toJudge: "서윤아 씨",
    angry: "서윤아 씨"
  }
}
```

## Context
```ts
context: {
  contextType: "celebrity_security_breach",
  description: "새벽 1시경 숙소 외부에서 특정 멤버를 부르는 음성이 녹음되고, 같은 날 팬 커뮤니티에 올라온 셀카 배경과 차량 이동 시간이 맞물리며 내부 유출 의혹이 폭발했다. 컴백을 앞둔 팀이라 공식 신고와 언론 대응, 활동 지속 여부가 한꺼번에 얽혀 있다.",
  emotionalPressure: 9,
  affects: "both",
  triggerAmplifier: "윤아는 실제 공포를 겪었지만 자신이 먼저 건드린 흔적이 드러날까 두렵고, 태현은 현장 수습 명목으로 써온 팬사이트 거래가 드러나면 커리어가 끝난다. 그래서 둘 다 '지금 말하면 더 큰 일이 난다'는 논리로 핵심을 늦게 꺼낸다."
}
```

## Disputes

### d-1 비공개 셀카와 귀가 동선은 누구 때문에 합쳐졌는가
```ts
{
  id: "d-1",
  name: "셀카 유출과 동선 노출의 결합",
  claimA: "매니저가 팬사이트와 비공개 힌트를 주고받으며 내 숙소 접근 가능성을 키웠다.",
  claimB: "숙소 단서가 비친 셀카와 비공개 계정 접촉으로 판을 키운 건 윤아 자신이다.",
  publicSummary: "사생 접근은 내부 유출 때문인가, 당사자 부주의까지 겹친 결과인가",
  truthDescription: "태현은 팬사이트 운영자에게 차량 변경 시간과 출입 동선 힌트를 흘려왔고, 윤아는 누가 새는지 확인하려 비공개 계정으로 셀카를 보내며 미끼를 던졌다. 숙소 접근은 어느 한쪽 단독이 아니라, 두 신호가 합쳐지며 가능해졌다.",
  hiddenUntil: "evidence",
  quadrant: "shared_misconception",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-1", "e-2", "e-3", "e-6"],
  mediationLink: "보호조치",
  correctResponsibility: { a: 35, b: 65 },
  aSide: {
    justifiedPoint: "실제 동선 누설과 팬사이트 거래가 없었다면 셀카 단서만으로는 숙소 접근이 어려웠다.",
    hiddenPoint: "누가 새는지 알아보겠다며 자신도 직접 단서를 던졌다."
  },
  bSide: {
    justifiedPoint: "윤아의 직접 접촉과 부주의한 셀카가 위험을 급격히 키운 건 맞다.",
    hiddenPoint: "이미 그 전부터 비공개 동선을 팬사이트와 거래하며 위험한 기반을 만들었다."
  }
}
```

### d-2 매니저의 팬사이트 응대는 관행이었는가, 위험한 거래였는가
```ts
{
  id: "d-2",
  name: "팬사이트와의 비공개 정보 거래",
  claimA: "매니저는 노출을 관리한다며 팬사이트에 비공개 차량·대기 시간 정보를 흘려왔다.",
  claimB: "공개 현장 혼선을 줄이기 위한 최소 조율이었고, 사적 정보 판매나 거래는 아니었다.",
  publicSummary: "업계 관행인가, 위험한 정보 유통인가",
  truthDescription: "태현은 팬사이트 운영자에게 정확한 좌석이나 숙소 주소를 직접 주지는 않았지만, 차량 변경 창구, 비공개 이동 시간, 대기 장소 범위를 반복적으로 흘렸다. 대가가 직접 현금은 아니더라도, 우호적 여론과 현장 통제를 얻기 위한 위험한 거래였다.",
  hiddenUntil: "evidence",
  quadrant: "b_only",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-3", "e-6"],
  mediationLink: "직무책임",
  correctResponsibility: { a: 10, b: 90 },
  aSide: {
    justifiedPoint: "태현의 반복된 힌트 제공이 실제 사생 추적 구조를 만들었다.",
    hiddenPoint: "그 구조를 의심하면서도 초기에 회사 정식 신고보다 개인 확인을 택했다."
  },
  bSide: {
    justifiedPoint: "현장 혼선을 줄이려 팬사이트 운영자와 소통하는 관행은 실제 존재한다.",
    hiddenPoint: "관행의 범위를 넘는 비공개 동선 힌트를 줬고, 그 위험성을 알고 있었다."
  }
}
```

### d-3 윤아의 비공개 계정 접촉은 보호를 위한 미끼였는가, 무모한 대응이었는가
```ts
{
  id: "d-3",
  name: "사생 계정과의 직접 접촉",
  claimA: "누가 새는지 확인하려 한 번 떠본 것뿐이며, 나를 보호하기 위한 선택이었다.",
  claimB: "위험한 계정에 직접 반응해 집착과 추적을 더 키운 무모한 행동이었다.",
  publicSummary: "보호를 위한 탐색인가, 위험을 키운 개인 판단인가",
  truthDescription: "윤아는 비공개 모니터링 계정으로 문제의 팬 계정에 두 차례 반응했고, 그중 한 장의 셀카에는 숙소 엘리베이터 벽면과 층별 장식이 비쳤다. 의도는 유출 경로 확인이었지만 결과적으로 상대에게 '통한다'는 신호를 준 셈이 됐다.",
  hiddenUntil: "evidence",
  quadrant: "a_only",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: false,
  relatedEvidenceIds: ["e-1", "e-4", "e-6"],
  mediationLink: "보호조치",
  correctResponsibility: { a: 80, b: 20 },
  aSide: {
    justifiedPoint: "공식 보고를 믿기 어려운 상황에서 누가 새는지 직접 확인하고 싶었던 공포가 있었다.",
    hiddenPoint: "위험 신호를 확인하고도 계정을 바로 차단하거나 신고하지 않았다."
  },
  bSide: {
    justifiedPoint: "피해자라도 직접 접촉이 위험을 키울 수 있다는 지적은 맞다.",
    hiddenPoint: "윤아가 그런 선택을 하게 된 배경에 자신에 대한 불신과 구조적 방치가 있었다."
  }
}
```

### d-4 사건 직후의 비공개 수습은 보호였는가, 컴백 우선 은폐였는가
```ts
{
  id: "d-4",
  name: "보안 사고 축소 보고와 지연 대응",
  claimA: "매니저는 컴백과 자신의 책임을 지키려 보안 보고와 신고를 늦췄다.",
  claimB: "윤아 본인도 팀 활동과 가족 걱정 때문에 공개 신고를 원치 않았고, 나는 현장 혼란을 막으려 한 것이다.",
  publicSummary: "사건 축소 수습은 보호였는가, 은폐였는가",
  truthDescription: "윤아는 처음 몇 시간 동안은 조용히 처리해 달라고 했지만, 태현은 그 요청을 빌미로 보안업체 보고를 수정·축약하고 경찰 및 회사 정식 보고를 48시간 가까이 미뤘다. 보호 논리가 일부 있었어도, 실제론 컴백 일정과 자기 책임을 우선한 면이 더 컸다.",
  hiddenUntil: "witness",
  quadrant: "both_know",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-2", "e-5"],
  mediationLink: "공개범위",
  correctResponsibility: { a: 30, b: 70 },
  aSide: {
    justifiedPoint: "공식 대응 지연이 결국 2차 접근 가능성과 증거 누락 위험을 키웠다.",
    hiddenPoint: "처음에는 팀 일정과 여론이 무서워 조용한 수습을 바랐다."
  },
  bSide: {
    justifiedPoint: "당사자의 의사를 완전히 무시하고 바로 공개 신고하기 어려운 상황은 있었다.",
    hiddenPoint: "그 틈을 이용해 사건을 축소 보고하고 자기 책임이 남는 기록을 줄였다."
  }
}
```

## Dilemma Axes
```ts
[
  {
    id: "ax-1",
    left: "실제 피해자 보호를 최우선한다",
    right: "피해자 측의 위험한 대응도 분명히 책임 묻는다",
    affectedDisputeIds: ["d-1", "d-3", "d-4"]
  },
  {
    id: "ax-2",
    left: "개인 부주의보다 내부 유출 구조를 더 무겁게 본다",
    right: "구조 문제와 별개로 당사자 판단 실수를 더 엄격히 본다",
    affectedDisputeIds: ["d-1", "d-2", "d-3"]
  },
  {
    id: "ax-3",
    left: "즉시 공개 신고와 공식 대응이 우선",
    right: "활동·생계를 고려한 비공개 수습 여지도 인정한다",
    affectedDisputeIds: ["d-2", "d-4"]
  }
]
```

## Evidence 6

### e-1 셀카 원본 파일과 반사면 확대 캡처
- type: `device`
- 역할: `표면 훅` + `A의 숨긴 칼`
- proves: `d-1`, `d-3`
- surface: 자연스러운 셀카처럼 보이지만 배경 반사면에 엘리베이터 벽면과 층별 장식 일부가 비친다
- 진실: 직접 좌표를 준 것은 아니어도, 숙소 단서로 읽힐 만한 정보가 담겨 있다

### e-2 로비 CCTV, 차량 게이트 로그, 새벽 경호 호출 기록
- type: `cctv`
- 역할: `기관/타임라인 증거`
- proves: `d-1`, `d-4`
- surface: 사생 추정 인물이 실제로 숙소 외곽 접근을 시도한 시간대와 차량 이동 시간이 맞아떨어진다
- 진실: 단순 우연 방문이 아니라 일정과 귀가 패턴을 알고 움직인 정황이 보인다

### e-3 매니저-팬사이트 운영자 DM과 대기 동선 메모
- type: `chat`
- 역할: `B의 숨긴 칼`
- proves: `d-1`, `d-2`
- surface: 팬사이트와 현장 혼선을 줄이기 위한 소통처럼 보인다
- 진실: 비공개 이동 시간, 차량 교체 타이밍, 대기 위치 범위를 반복적으로 흘린 흔적이 있다

### e-4 비공개 모니터링 계정 대화와 로그인 기록
- type: `chat`
- 역할: `A의 위험한 대응`
- proves: `d-3`
- surface: 팬 계정과의 짧은 확인 대화 몇 줄
- 진실: 윤아가 누가 새는지 확인하려 직접 반응했고, 차단보다 추적을 먼저 택했다

### e-5 보안업체 1차 보고서와 수정된 회사 내부 메모
- type: `log`
- 역할: `은폐/축소 보고`
- proves: `d-4`
- surface: 단순 팬 소란으로 축약된 내부 공유 문서
- 진실: 원본에는 숙소 특정 시도와 반복 계정 추적 정황이 있었지만, 수정본에서 위험도가 낮아졌다

### e-6 팬 커뮤니티 게시물 타임라인과 조합 게시 캡처
- type: `sns`
- 역할: `두 신호의 결합`
- proves: `d-1`, `d-2`, `d-3`
- surface: 셀카 단서, 밴 사진, 팬사이트 힌트를 조합해 귀가 시간표를 추정한 글 모음
- 진실: 한쪽의 단일 실수라기보다, 내부 힌트와 당사자 접촉이 팬덤 추적 구조 안에서 합쳐졌다

## baseEvidenceIds 권장
```ts
baseEvidenceIds: ["e-1", "e-2", "e-5"]
```

- `e-1`: 표면 스캔들
- `e-2`: 기관/타임라인 기준선
- `e-5`: 뒤늦게 드러나는 축소 보고의 씨앗

## Witness Pool

### tp-1 한소정
- slot: `institutional`
- 정체: 숙소 건물 보안팀장
- relationTo: `both`
- knowledgeScope: 새벽 호출 경위, 출입기록 보존 상태, 최초 보고서와 수정 요구 과정을 안다
- bias: `neutral`
- distortionRisk: `accurate`

### tp-2 최은별
- slot: `acquaintance_1`
- 정체: 대형 팬사이트 운영자
- relationTo: `b`
- knowledgeScope: 태현과 주고받은 힌트 수준, 현장 배려 요구, 팬 커뮤니티 내부 정보 교환 구조를 안다
- bias: `pro_self`
- distortionRisk: `strategic`
- hiddenAgenda: 자신이 사생과는 다르다는 선을 끝까지 지키려 하며, 정보 거래의 범위를 축소해 말할 가능성이 높다

### tp-3 박유림
- slot: `acquaintance_2`
- 정체: 헤어팀 실장
- relationTo: `a`
- knowledgeScope: 윤아가 사건 직후 얼마나 불안정했는지, 태현이 회사 보고보다 컴백 스케줄을 먼저 챙긴 정황을 안다
- bias: `pro_a`
- distortionRisk: `unconscious`
- hiddenAgenda: 윤아를 보호하려는 마음 때문에, 윤아의 직접 접촉 시점은 약하게 말할 수 있다

## Social Heat / Interjections
- 인터럽트 1: B가 “먼저 그 계정에 답장하신 건 윤아 씨입니다”라며 A의 비공개 계정 접촉을 먼저 꺼냄
- 인터럽트 2: A가 “그 일정표, 그 팬사이트만 유독 너무 잘 알았잖아요”라며 B의 팬사이트 거래를 감정적으로 끼어듦
- 인터럽트 3: 증인 tp-1이 “최초 보고서엔 ‘숙소 특정 시도’ 문구가 있었습니다”라고 말해 B의 축소 보고를 흔듦

## Dossier Card 후보
- `dc-1 셀카 단서의 실제 위험도`
  - evidence: `e-1`, `e-6`
  - 핵심: 부주의한 셀카였는가, 추적 구조 안에서만 의미가 생기는 단서였는가
- `dc-2 팬사이트 거래의 선`
  - evidence: `e-3`, `e-6`
  - 핵심: 현장 조율 관행 vs 위험한 비공개 정보 거래
- `dc-3 비공개 계정 접촉의 성격`
  - evidence: `e-1`, `e-4`
  - 핵심: 보호를 위한 미끼인가, 집착을 키운 무모한 대응인가
- `dc-4 축소 보고와 공식 대응`
  - evidence: `e-2`, `e-5`
  - 핵심: 팀 보호를 위한 비공개 수습 vs 컴백 우선 은폐

## Solutions
```ts
solutions: {
  보호조치: [
    "즉시 접근금지 및 수사 협조 절차를 밟고, 숙소·차량·출입 동선을 전면 교체한다.",
    "팬 커뮤니티 내 2차 유포물을 수거하고, 당사자와 스태프 전원에게 비공개 정보 보안 교육을 재실시한다.",
    "향후 사생 대응은 개인 판단이 아니라 보안팀과 법무팀 공동 프로토콜로만 처리한다."
  ],
  직무책임: [
    "매니저의 비공개 정보 거래와 축소 보고 책임을 분리 징계하고, 팬사이트 응대 권한을 즉시 회수한다.",
    "아티스트의 비공개 계정 직접 접촉에 대해서도 경고 및 보호 코칭을 병행한다.",
    "회사 차원의 팬서비스 관행과 현장 정보 관리 기준을 문서화해 재발 방지 조치를 공개한다."
  ],
  공개범위: [
    "실제 스토킹 위험과 내부 유출 구조는 인정하되, 당사자의 세부 동선과 사적 접촉 로그는 비공개로 보호한다.",
    "공식 입장문에는 축소 보고 사실과 보호조치만 밝히고, 개인 셀카 원본과 가족 관련 정보는 공개하지 않는다.",
    "팀 컴백 일정은 조정하되, 사건을 홍보나 동정 프레임으로 소비하지 않겠다는 원칙을 명시한다."
  ],
  활동조정: [
    "윤아는 일정 기간 공개 팬 접점과 라이브 노출을 줄이고 심리 지원을 받으며, 팀은 일부 스케줄을 재배치한다.",
    "태현은 현장 배차 업무에서 즉시 배제하고, 외부 소통 창구를 다른 인력으로 교체한다.",
    "사생 대응 비용과 보호 인력 증원을 회사가 우선 부담하고, 현장 운영보다 안전을 우선하는 기준으로 일정을 재정렬한다."
  ]
}
```

## 재판관 축이 갈리는 지점

### 탐구 축
- 셀카 단서 하나만으로 추적이 가능했는지, 내부 힌트와의 결합 구조를 얼마나 집요하게 벗겨내는가
- 팬사이트 관행과 사생 추적을 분리해서 보느냐, 연결된 생태계로 보느냐

### 판단 축
- 실제 피해자에게도 위험한 대응 책임을 명확히 물을 것인가
- 팬사이트 거래와 축소 보고를 개인 일탈이 아니라 구조적 책임으로 확장할 것인가

### 해결 축
- 즉시 공개 신고와 강한 제재로 갈 것인가
- 보호를 우선하되 세부 공개는 줄이는 봉합형으로 갈 것인가
- 매니저 개인 징계에 머물지 않고 회사 관행까지 건드릴 것인가

## 이 사건의 의도된 플레이 감정
- 시작: `내부에 배신자가 있나?` 또는 `멤버가 너무 위험하게 행동한 것 아닌가?`
- 중반: `둘 다 실제로 위험을 키웠다. 그런데 무게가 다르다`
- 후반: `피해 보호와 책임 공개 중 어디까지 열어야 하는가`
- 결말: `내 재판관 성향이 피해자 보호, 개인 책임, 구조 책임 중 어디에 기우는지 드러난다`

## 구현 메모
- 현재 카테고리 체계에는 바로 안 들어가므로 `headline` 또는 `special` 라인 추가가 필요
- 기존 7카테고리에 억지로 끼우기보다 신규 라인으로 유지하는 편이 낫다
- 이 사건은 `강한 유입 훅 + 회색지대 판결`을 동시에 보여주는 대표 샘플로 적합하다
- 직접적인 중범죄 재현보다 `유출 구조`, `보호`, `축소 보고`, `팬덤 경제`를 중심에 두는 것이 이 게임 시스템과 더 잘 맞는다
