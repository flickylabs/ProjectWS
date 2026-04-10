# Headline Case Draft v1

## 사건명
- `천만 조회의 저녁`

## 상태
- `CaseAuthoringSpec` 기준 실제 설계 초안
- 현재 7개 기본 카테고리 밖의 `headline/special` 사건
- 런타임 반영 시 `relationshipType: public_conflict` 추가 또는 별도 headline 라인으로 운용 권장

## 한 줄 훅
- 대형 맛집 리뷰어가 올린 `악덕 사장 폭로 영상` 하나로 가게가 무너진다.  
  그런데 원본을 까보면, 사장은 위생 위반과 신상털이를 했고, 리뷰어는 `검증 방문`을 핑계로 무상 제공과 사후 거래를 압박해온 인물이었다.

## 왜 이 사건이 맞는가
- 표면은 강하다: `바이럴 리뷰`, `악덕 사장`, `평점 테러`, `신상공개`, `무상 취식 빌런`
- 판결은 회색지대다:
  - 공익 폭로는 어디까지 정당한가
  - 편집된 진실도 진실인가
  - 위생 위반보다 보복성 신상공개가 더 무거운가
  - 협찬이 아니라고 말하면서 사실상 무상 제공을 압박하는 `리뷰 권력`을 어떻게 볼 것인가
- 양측 공방이 매우 강하다:
  - A는 `공익 제보자`처럼 보이지만 실제로는 무상 취식과 사후 거래를 습관처럼 써온 빌런에 가깝다
  - B는 `생계형 사장`처럼 보이지만 실제 위생 위반과 조직적 보복이 있다

## CaseAuthoringSpec

```ts
caseId: "headline-01"
legacyCaseId: "case-headline-01"
title: "천만 조회의 저녁"
category: "headline"
summary: "대형 음식 리뷰어의 폭로 영상 이후 식당은 평점 테러와 예약 취소로 무너지고, 사장은 리뷰어의 편집 조작과 무상 제공 압박을 주장한다. 사전 방문 DM, 원본 영상, 위생 점검표, 사후 회복 패키지 견적서, 커뮤니티 유포 기록이 열리면서 둘 다 ‘피해자’이면서 둘 다 ‘가해자’였다는 사실이 드러난다."
headlineHook: "‘이 식당, 손님 남은 반찬 다시 냅니다.’ 조회수 천만의 폭로 영상이 올라온 다음 날, 사장은 리뷰어가 보낸 ‘검증차 재방문 예정이니 메뉴 협조 부탁드린다’는 DM과 차 번호 일부가 찍힌 CCTV를 동시에 뿌리며 역폭로를 시작한다."
sensitivityTags: ["viral_review", "doxxing", "food_hygiene", "platform_harassment", "reputation_damage"]
```

## Meta
```ts
meta: {
  relationshipType: "public_conflict",
  difficulty: "hard",
  conflictSeed: "CS-H1",
  twistModule: "TW-public-02",
  emotionalBait: "썸네일의 곰팡이 컷, 울먹이는 리뷰어 멘트, 리뷰 전 무상 협조 DM, 사장의 CCTV 반박, 배달앱 별점 폭락이 연쇄적으로 겹치며 누구든 한쪽을 먼저 악마화하게 만든다.",
  anchorTruth: "리뷰 영상의 핵심 장면은 조작이 아니지만, 전후 맥락과 후속 대응이 잘려 있었다. 사장은 실제 위생 위반과 보복성 신상 유포를 했고, 리뷰어는 공개 전후로 무상 제공 압박과 사후 회복 패키지 제안을 반복했다.",
  resolutionDilemma: "실제 위생 위반을 드러낸 폭로를 보호해야 하는가, 아니면 편집과 영향력 장사를 반복해온 리뷰어의 권력 남용을 더 무겁게 물어야 하는가? 사장의 생계와 공적 경고, 리뷰어의 표현 자유와 플랫폼 권력을 어디까지 각각 제한할 것인가?"
}
```

## Duo

### Party A
```ts
partyA: {
  id: "a",
  name: "강민호",
  age: 34,
  occupation: "푸드 리뷰어 겸 라이브 스트리머",
  incomeBracket: "high",
  archetype: "victim_cosplay",
  publicMask: "consumer_advocate",
  pressureResponse: "perform_victimhood",
  reputationAxis: "public_image",
  speechStyle: "처음에는 공익과 소비자 보호를 앞세우고, 무상 제공이나 촬영 협조를 ‘검증 과정’처럼 포장한다. 그러나 몰리면 자신이 얼마나 두려웠고 상처받았는지로 축을 옮긴 뒤, 결론을 먼저 말해 청자를 자기 프레임 안에 가둔다.",
  pride: 8,
  fear: "광고성 리뷰어, 공짜밥 뜯어먹으며 장사 망하게 해놓고 조회수만 챙기는 사람으로 낙인찍히는 것",
  riskAppetite: 7,
  digitalHabit: "sns_active",
  dailyRoutine: "오전엔 제보 정리와 업장 컨택, 오후엔 촬영, 밤에는 편집과 라이브 방송을 병행한다. 촬영 전에는 ‘검증 재방문’이나 ‘원활한 촬영 협조’를 명분으로 업장 반응을 떠보고, 업로드 직후에는 댓글 흐름과 커뮤니티 반응을 실시간으로 체크한다.",
  sensitivePoints: ["진정성 의심", "협찬/광고 프레임", "공짜 제공 요구", "겁먹고 물러선 사람처럼 보이는 것"],
  hiddenAgenda: "직접 노골적으로 돈을 요구하진 않지만, 영향력을 이용해 무상 시식·재방문 협조·사후 회복 패키지 제안을 받아내는 패턴을 반복해왔다.",
  verbalTells: [
    {
      type: "moral_framing",
      trigger: "lying",
      pattern: "사실 질문에도 먼저 ‘소비자 입장에서는’, ‘누구라도 그 상황이면’ 같은 도덕 프레임을 깔아 자신의 해석을 보편적 상식처럼 만든다."
    },
    {
      type: "injury_emphasis",
      trigger: "hurt",
      pattern: "공격받는 국면에서는 실제 사실 설명보다 자신이 느낀 공포와 모멸감을 한 문장 앞에 세운다."
    },
    {
      type: "premature_close",
      trigger: "cornered",
      pattern: "불리해지면 ‘결론은 간단합니다’, ‘핵심은 하나예요’라고 말하며 세부 검증을 빨리 닫으려 한다."
    },
    {
      type: "soft_extortion_language",
      trigger: "defensive",
      pattern: "무상 제공이나 사후 거래를 직접 말하지 않고 ‘검증상 다시 봐야 한다’, ‘브랜드 회복에도 도움을 줄 수 있다’처럼 협조를 의무처럼 들리게 말한다."
    }
  ],
  callTerms: {
    toPartner: "사장님",
    toJudge: "저 식당 사장",
    angry: "정태성 씨"
  }
}
```

### Party B
```ts
partyB: {
  id: "b",
  name: "정태성",
  age: 46,
  occupation: "한식 다이닝 오너셰프",
  incomeBracket: "mid",
  archetype: "cold_logic",
  publicMask: "professional",
  pressureResponse: "attack",
  reputationAxis: "career",
  speechStyle: "원재료, 조리 동선, 예약 손익 같은 숫자와 운영 논리를 앞세운다. 하지만 몰리면 ‘현장을 모르고 사람을 죽였다’며 감정이 확 올라온다.",
  pride: 9,
  fear: "평생 쌓은 식당을 더럽고 비열한 집으로 낙인찍혀 잃는 것",
  riskAppetite: 6,
  digitalHabit: "messenger_main",
  dailyRoutine: "새벽 시장 확인, 오전 재료 검수, 점심·저녁 영업, 마감 후 원가표와 예약표를 직접 본다.",
  sensitivePoints: ["직업적 자존심", "위생 문제", "가족에게까지 번지는 신상 공격"],
  verbalTells: [
    {
      type: "process_shield",
      trigger: "lying",
      pattern: "비난이 들어오면 ‘원래 절차상’, ‘주방 프로토콜상’이라고 말하며 행위의 주체를 시스템 뒤에 숨긴다."
    },
    {
      type: "counter_motive",
      trigger: "cornered",
      pattern: "자신의 잘못을 묻는 질문을 받으면 곧바로 ‘그 사람은 조회수 때문에 그랬잖아요’처럼 상대 동기로 되받아친다."
    },
    {
      type: "precision_spike",
      trigger: "defensive",
      pattern: "억울함이 치솟을수록 손님 수, 폐기율, 환불액을 지나치게 정확한 수치로 읊는다."
    }
  ],
  callTerms: {
    toPartner: "강씨",
    toJudge: "저 리뷰어",
    angry: "강민호 씨"
  }
}
```

## Context
```ts
context: {
  contextType: "viral_reputation_crisis",
  description: "영상 업로드 후 18시간 만에 예약 취소가 70%를 넘기고, 배달앱 평점이 4.8에서 1.9까지 떨어졌다. 여기에 리뷰어의 사전 협조 DM까지 퍼지며 ‘무상 취식 빌런 vs 악덕 사장’ 프레임이 동시에 폭주해, 두 사람 모두 한 번 밀리면 끝장이라는 공포 속에 들어와 있다.",
  emotionalPressure: 9,
  affects: "both",
  triggerAmplifier: "리뷰어는 공익 폭로자 정체성을 잃고 공짜 제공 뜯어낸 사람으로 낙인찍힐까 두렵고, 사장은 식당 생계와 가족 신상까지 무너질까 두렵다. 그래서 작은 해명 누락도 곧바로 프레임 조작이나 악의적 보복처럼 읽힌다."
}
```

## Disputes

### d-1 리뷰 영상은 공익 폭로였는가, 악의적 편집이었는가
```ts
{
  id: "d-1",
  name: "폭로 영상의 편집과 공익성",
  claimA: "핵심 장면은 사실이며 소비자 경고를 위해 빠르게 공개할 수밖에 없었다.",
  claimB: "가장 자극적인 몇 초만 잘라 사과와 환불 제안을 지운 악의적 편집이었다.",
  publicSummary: "핵심은 사실이지만 편집과 공개 방식이 문제였는가",
  truthDescription: "민호는 실제 위생상 문제 장면을 촬영했지만, 환불 제안과 일부 해명, 촬영 직후의 추가 확인 과정을 의도적으로 뺐다. ‘조작’은 아니지만 ‘잘린 진실’이었다.",
  hiddenUntil: "evidence",
  quadrant: "both_know",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: false,
  relatedEvidenceIds: ["e-1", "e-6"],
  mediationLink: "공개정정",
  correctResponsibility: { a: 70, b: 30 },
  aSide: {
    justifiedPoint: "실제 위생상 문제와 위생 경계 붕괴를 가장 먼저 공론화했다.",
    hiddenPoint: "사건을 가장 세게 보이게 하려 전후 맥락과 사후 대응 일부를 잘랐다."
  },
  bSide: {
    justifiedPoint: "영상이 실제 영업 현장을 과장되게 보이게 만든 측면이 있다.",
    hiddenPoint: "잘린 장면이 있었다 해도 근본 원인인 위생 위반 자체는 부정하기 어렵다."
  }
}
```

### d-2 식당의 위생 위반은 어느 정도였는가
```ts
{
  id: "d-2",
  name: "실제 위생 위반의 정도",
  claimA: "손님이 위험해질 정도의 비위생 운영이 반복됐다.",
  claimB: "심각한 위해는 없었고, 바쁜 영업 중 순간이 과장된 것이다.",
  publicSummary: "가게의 실제 위생 문제는 경미했는가, 구조적이었는가",
  truthDescription: "가게는 반찬용 가니시 통 재사용, 유통기한 라벨 덮어쓰기, 조리 전용 장갑 교체 지연 등 명백한 위생 위반을 했다. 다만 ‘집단 식중독급’은 아니었고, 폐쇄 명령 수준의 위해가 입증된 것도 아니었다.",
  hiddenUntil: "evidence",
  quadrant: "b_only",
  ambiguity: "low",
  weight: "high",
  legitimacyIssue: false,
  relatedEvidenceIds: ["e-1", "e-2", "e-3"],
  mediationLink: "영업개선",
  correctResponsibility: { a: 20, b: 80 },
  aSide: {
    justifiedPoint: "공익 차원의 경고를 할 만한 실제 위반이 있었다.",
    hiddenPoint: "위해 정도를 가장 큰 표현으로 끌어올렸다."
  },
  bSide: {
    justifiedPoint: "식중독이나 즉시 폐업 사유까지는 아니었다.",
    hiddenPoint: "경미한 실수가 아니라 반복된 관리 실패였고, 이를 내부적으로 알고도 눙쳤다."
  }
}
```

### d-3 리뷰어의 무상 협조 요구와 컨설팅 제안은 정상적이었는가, 영향력 압박이었는가
```ts
{
  id: "d-3",
  name: "사전 무상 협조 요구와 폭로 직후의 회복 패키지",
  claimA: "검증을 위한 재방문과 후속 개선 제안은 리뷰 과정에서 가능한 통상 협의였다.",
  claimB: "리뷰 전에는 공짜로 먹으려 하고, 리뷰 후에는 영향력을 이용해 돈을 받으려 한 사실상 이중 압박이었다.",
  publicSummary: "통상적 촬영 협의인가, 리뷰 권력을 이용한 이익 추출인가",
  truthDescription: "민호는 촬영 전부터 ‘검증차 다시 들르겠다’, ‘원활한 촬영 협조가 필요하다’며 무상 제공을 기대하게 만드는 메시지를 보냈고, 폭로 직후에는 MCN을 통해 위기관리 패키지와 재방문 콘텐츠 옵션을 보냈다. 어느 문구도 노골적 협박은 아니지만, 전후 문맥을 합치면 영향력을 이용한 이익 추출로 읽힌다.",
  hiddenUntil: "evidence",
  quadrant: "a_only",
  ambiguity: "high",
  weight: "high",
  legitimacyIssue: false,
  relatedEvidenceIds: ["e-4"],
  mediationLink: "평판피해",
  correctResponsibility: { a: 75, b: 25 },
  aSide: {
    justifiedPoint: "사후 수습과 개선 컨설팅, 재방문 촬영 협의 자체는 업계에서 실제로 존재한다.",
    hiddenPoint: "리뷰어로서의 영향력을 이용해 무상 제공과 사후 거래를 관성처럼 받아내려 했다."
  },
  bSide: {
    justifiedPoint: "무상 제공과 금전 요구처럼 받아들일 만한 문맥이 충분히 있었다.",
    hiddenPoint: "그 점을 빌미로 자신의 위생 문제를 전부 ‘공갈’로 덮으려 했다."
  }
}
```

### d-4 사장의 역폭로는 정당방위였는가, 신상털이·보복이었는가
```ts
{
  id: "d-4",
  name: "역폭로와 신상공개의 선",
  claimA: "사장은 CCTV와 커뮤니티 글로 내 동선과 차 번호 일부를 뿌리며 보복했다.",
  claimB: "거짓 프레임에 대응하려면 반박 자료를 공개할 수밖에 없었다. 괴롭힘을 지시한 적은 없다.",
  publicSummary: "반박권 행사인가, 조직적 신상공개와 여론전인가",
  truthDescription: "태성은 가족·직원 단톡과 지역 사장 모임에 리뷰어 동선이 드러나는 CCTV 캡처와 차량 번호 일부, 계정 추정 정보를 공유했고, 커뮤니티에 ‘실체를 알리자’며 리뷰 신고와 역후기 작성을 사실상 독려했다.",
  hiddenUntil: "evidence",
  quadrant: "b_only",
  ambiguity: "low",
  weight: "high",
  legitimacyIssue: true,
  relatedEvidenceIds: ["e-5", "e-6"],
  mediationLink: "신상보호",
  correctResponsibility: { a: 15, b: 85 },
  aSide: {
    justifiedPoint: "보복성 신상 유포와 여론 선동의 직접 피해를 입었다.",
    hiddenPoint: "피해 호소를 통해 자신의 편집 문제를 뒤로 밀려 했다."
  },
  bSide: {
    justifiedPoint: "억울하게 한순간에 무너진 상황에서 반박권이 필요했다.",
    hiddenPoint: "단순 반박을 넘어 실제로 타인을 동원해 평판 보복을 설계했다."
  }
}
```

## Dilemma Axes
```ts
[
  {
    id: "ax-1",
    left: "공익 경고를 위해 거친 폭로도 보호한다",
    right: "진실이어도 편집·상업화가 개입되면 강하게 제한한다",
    affectedDisputeIds: ["d-1", "d-3"]
  },
  {
    id: "ax-2",
    left: "실제 위생 위반을 가장 무겁게 본다",
    right: "신상공개와 조직적 보복을 더 무겁게 본다",
    affectedDisputeIds: ["d-2", "d-4"]
  },
  {
    id: "ax-3",
    left: "공개 처벌과 공적 정정이 우선",
    right: "영업 개선과 재발방지 중심의 봉합이 우선",
    affectedDisputeIds: ["d-1", "d-2", "d-4"]
  }
]
```

## Evidence 6

### e-1 리뷰어 원본 촬영파일과 편집 타임라인
- type: `device`
- 역할: `표면 훅` + `잘린 진실`
- proves: `d-1`, `d-2`
- surface: 자극적인 곰팡이 컷, 주방 반찬 통 장면, 업로드 직전 타임라인
- 진실: 핵심 장면은 실제지만, 환불 제안/재확인 구간이 잘려 있다

### e-2 주방 CCTV와 냉장고 라벨 사진
- type: `cctv`
- 역할: `실제 위생 위반`
- proves: `d-2`
- surface: 조리대와 반찬 통, 직원 손동작
- 진실: 라벨 덮어쓰기와 재사용 정황이 있다

### e-3 배달앱 위생 점검표와 시정명령 메일
- type: `contract`
- 역할: `기관/중립 증거`
- proves: `d-2`
- surface: 경고 조치와 항목별 시정 내용
- 진실: 폐쇄급은 아니지만 반복 위반이다

### e-4 사전 협조 DM과 MCN 컨설팅 견적서
- type: `chat`
- 역할: `A의 숨긴 칼`
- proves: `d-3`
- surface: “검증차 다시 들르겠다”, “추후 브랜드 회복에 도움 드릴 수 있다”는 DM 묶음
- 진실: 리뷰 전 무상 제공 기대와 리뷰 후 사후 거래 제안이 한 줄로 이어진다

### e-5 사장 단톡과 지역 커뮤니티 제보 요청 캡처
- type: `chat`
- 역할: `B의 조직적 보복`
- proves: `d-4`
- surface: “진실을 알려야 한다”는 표현
- 진실: 리뷰 신고, 역후기, CCTV 공유를 사실상 독려했다

### e-6 커뮤니티 게시물 타임라인과 신고 폭주 로그
- type: `sns`
- 역할: `후폭풍의 규모`
- proves: `d-1`, `d-4`
- surface: 게시물 확산 시간대, 별점 하락, 역신고 폭주
- 진실: A의 바이럴과 B의 역동원이 연쇄적으로 맞물렸다

## baseEvidenceIds 권장
```ts
baseEvidenceIds: ["e-1", "e-3", "e-5"]
```

- `e-1`: 표면 스캔들
- `e-3`: 기관/중립 기준선
- `e-5`: 보복 구조의 씨앗

## Witness Pool

### tp-1 김도윤
- slot: `acquaintance_1`
- 정체: 주말 파트타이머
- relationTo: `b`
- knowledgeScope: 촬영 당일 주방 상황, 평소 반찬 통 재사용 분위기, 사장 분노 이후 단톡 분위기를 안다
- bias: `self_interest`
- distortionRisk: `strategic`
- hiddenAgenda: 밀린 수당 문제 때문에 사장에게 앙금이 있다

### tp-2 박지수
- slot: `institutional`
- 정체: 배달앱 위생 점검 담당자
- relationTo: `both`
- knowledgeScope: 점검표, 시정 항목, 즉시 영업정지 사유 여부를 정확히 설명할 수 있다
- bias: `neutral`
- distortionRisk: `accurate`

### tp-3 윤해성
- slot: `acquaintance_2`
- 정체: 전 MCN 프로듀서
- relationTo: `a`
- knowledgeScope: 민호 채널의 수익 구조, 과거 식당 대상 `무상 협조 유도`와 `사후 컨설팅` 제안 관행, 업로드 전후 커뮤니케이션 방식을 안다
- bias: `anti_a`
- distortionRisk: `strategic`
- hiddenAgenda: 민호와 계약 분쟁이 있어 개인 감정이 섞인다

## Social Heat / Interjections
- 인터럽트 1: B가 “처음 왔을 때부터 검증 다시 하려면 협조가 필요하다고 했잖아요”라며 A의 사전 협조 DM을 먼저 꺼냄
- 인터럽트 2: A가 “제 차 번호부터 돌았습니다”라며 신상 유포를 감정적으로 끼어듦
- 인터럽트 3: 증인 tp-1이 “근데 환불 얘기 나온 건 맞아요”라고 애매하게 끼어들어 양쪽 모두 흔듦

## Dossier Card 후보
- `dc-1 원본 vs 편집`
  - evidence: `e-1`, `e-6`
  - 핵심: 진실 장면은 남아 있지만 무엇이 잘렸는지 묻는다
- `dc-2 위생 위반의 실제 수준`
  - evidence: `e-2`, `e-3`
  - 핵심: 위험의 정도와 반복성 구분
- `dc-3 무상 협조와 컨설팅 DM의 성격`
  - evidence: `e-4`
  - 핵심: 정상적인 촬영 협의 vs 리뷰 권력을 이용한 이익 추출
- `dc-4 역폭로의 선`
  - evidence: `e-5`, `e-6`
  - 핵심: 반박권 행사 vs 신상털이 설계

## Solutions
```ts
solutions: {
  공개정정: [
    "양측 모두 원본 맥락과 잘못된 공개 범위를 바로잡는 정정문을 올리고, 문제 영상과 역폭로 게시물은 수정본으로 대체한다.",
    "폭로 영상은 유지하되 편집 누락과 확인되지 않은 표현을 명시 수정하고, 사장은 리뷰어 관련 식별 정보 게시를 즉시 삭제한다.",
    "제3자 커뮤니티와 플랫폼에 사실관계 요약문을 공동 제출해 별점전·신상확산을 중단시킨다."
  ],
  영업개선: [
    "식당은 외부 위생 컨설팅과 30일 점검 결과를 공개하고, 재사용 가능성이 있는 조리 동선을 전면 교체한다.",
    "점검 통과 전까지 일부 메뉴 운영을 중단하고, 고객 환불·재방문 보상 기준을 표준화한다.",
    "직원 교육, 라벨링, CCTV 보관 절차를 정비해 재발 방지 체계를 만든다."
  ],
  평판피해: [
    "리뷰어는 무상 협조 요청과 상업적 이해관계, 후속 제안 내역을 공개하고, 사장은 조직적 신고·신상공개에 대한 손해를 배상한다.",
    "사장은 보복성 게시와 제3자 동원을 중단하고, 리뷰어는 잘린 편집으로 인한 평판 손해 일부를 공동 부담한다.",
    "양측 모두 플랫폼 계정에 경고를 받고, 재발 시 채널/매장 노출 제한 조치를 조건부로 수용한다."
  ],
  신상보호: [
    "식별 정보가 남은 캡처, CCTV, 차량 정보, 동선 게시물은 전면 삭제하고 2차 유포 중단 요청을 공동 진행한다.",
    "분쟁 대응은 플랫폼 신고·공식 소명 절차로만 한정하고, 개인 커뮤니티·지인 동원은 금지한다.",
    "양측 모두 상대 신상과 가족·직원 개인정보를 이용한 추가 압박을 하지 않겠다는 보호 합의를 체결한다."
  ]
}
```

## 재판관 축이 갈리는 지점

### 탐구 축
- `원본과 편집 차이`를 얼마나 집요하게 벗겨내는가
- `실제 위생 위반`과 `과장된 표현`을 분리해 읽는가

### 판단 축
- `조직적 신상공개`를 가장 중하게 볼 것인가
- `사실을 말한 폭로`라도 상업화/편집이 개입되면 엄격히 제재할 것인가

### 해결 축
- 공개 처벌과 정정 중심으로 갈 것인가
- 영업 개선과 보호 중심으로 갈 것인가
- 양측 모두 제재하는 `빌런 vs 빌런` 판결로 갈 것인가

## 이 사건의 의도된 플레이 감정
- 시작: `당연히 사장이 더 나쁜가?` 또는 `또 조회수 장사인가?`
- 중반: `리뷰어가 원래 공짜 협조를 뜯어내던 사람인가? 그런데 그렇다고 사장이 깨끗한가?`
- 후반: `무엇을 더 무겁게 처벌해야 하는가`
- 결말: `내 재판관 성향이 어디에 기울어지는지 드러난다`

## 구현 메모
- 현재 카테고리 체계에는 바로 안 들어가므로 `headline` 또는 `special` 라인 추가가 필요
- 만약 기존 카테고리에 억지 매핑해야 한다면 `friend`나 `partnership`로 비틀지 말고 신규 라인으로 유지하는 편이 좋다
- 이 사건은 `빌런 vs 빌런` 대표 샘플로 쓰기 적합하다
