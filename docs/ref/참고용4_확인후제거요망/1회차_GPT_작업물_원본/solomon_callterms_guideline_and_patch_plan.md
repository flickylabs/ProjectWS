# 솔로몬 callTerms / 호칭 가이드 + 코드 수정안

## 0. 전제와 판단

- 이 문서의 “37건”은 **이슈 행(row)의 개수**입니다. 실제로 패치할 **고유 caseId는 25개**입니다.
  - family 12건
  - spouse 1건 (`spouse-08`)
  - tenant 12건
- 이번 판단은 `GPT_요청5_호칭가이드.md`의 문제 정의와 이슈 목록을 기준으로 했습니다. 해당 문서는 `callTerms`가 Phase 1/2 스크립트와 Phase 3~5 AI 프롬프트에 **동시에 영향**한다고 설명하고 있고, 현재 `llmSpeechGuide.ts`가 `spouse/family/friend`를 통째로 반말 관계로 처리한다고 적고 있습니다. 따라서 **case JSON의 callTerms 수정 + 코드 수정**이 같이 들어가야 합니다. fileciteturn19file9
- 추가로 현재 실제 코드 반영본을 보면, 이 단순 판정이 `llmSpeechGuide.ts`에만 있는 게 아니라 `llmDialogueResolver.ts`, `llmFreeQuestion.ts`에도 중복되어 있습니다. 두 파일 모두 `['spouse', 'family', 'friend']`를 통째로 informal로 보고 `formalityGuide` / `speechGuideShort`를 만들고 있습니다. 즉 **`llmSpeechGuide.ts`만 고치면 끝나지 않습니다.** fileciteturn20file11 fileciteturn20file0
- **중요**: 제가 실제로 받은 사건 샘플 JSON은 `spouse-01`, `workplace-01`, `friend-01`뿐이었습니다. 따라서 `family-02`, `family-03`, `family-06`, `tenant-01~12`, `spouse-08`의 세부 판단은 `GPT_요청5_호칭가이드.md`의 배경 단서만 보고 한 **출시용 추론안**입니다. 이 중 `family-02/03/06`은 신뢰도 메모를 함께 붙였습니다.

## 1. 관계별 호칭 규칙표 (84개 사건 공통 규칙)

### 1-1. 적용 원칙
1. **명시된 case JSON `callTerms`가 최우선**
2. `callTerms`가 비면 **`relationshipSubtype` / `familyRelation` / `roleMap` 기반 fallback**
3. 그래도 없으면 마지막에만 **generic relation fallback**

출시 버전 기준으로는 2번에 기대지 말고, **84개 사건 전부에 case별 `callTerms`를 채워 두는 것**이 맞습니다.  
`llmSpeechGuide.ts`의 fallback은 안전망이어야지, 본 로직이 되면 안 됩니다.

### 1-2. 권장 서브타입
```ts
type RelationshipSubtype =
  | 'spouse_warm'
  | 'spouse_strained'
  | 'spouse_separated'
  | 'family_siblings'
  | 'family_parent_child'
  | 'family_inlaw_mother_daughter_in_law'
  | 'tenant_landlord'
  | 'friend_peer'
  | 'workplace_peer'
  | 'workplace_hierarchy'
  | 'generic_formal'
```

### 1-3. 규칙표

| 상위 관계 | 세부 관계 | A→B toPartner | B→A toPartner | A의 toJudge | B의 toJudge | angry 기본 | 말투 기본 |
|---|---|---|---|---|---|---|---|
| spouse | 일반 부부/동거 | 자기, 여보, (설정상) 오빠/이름아 | 자기, 여보, 이름아 | 제 아내 / 제 남편 | 제 남편 / 제 아내 | 이름아! / 이름! | 상호 반말 |
| spouse | 갈등 심화 | 이름, 이름 씨 | 이름, 이름 씨 | 제 아내 / 제 남편 | 제 남편 / 제 아내 | 이름! | 기본 존댓말, 격앙 시 반말 가능 |
| spouse | 별거·이혼 준비 | 이름 씨 | 이름 씨 | 제 아내 / 제 남편 | 제 남편 / 제 아내 | 이름! | 상호 존댓말 우선 |
| family | 남매/형제자매 (연상→연하) | 이름아/이름야 | — | 제 동생 | — | 이름! | 연상→연하 반말 |
| family | 남매/형제자매 (연하→연상) | — | 누나/형/언니/오빠 | — | 제 누나/형/언니/오빠 | 누나!/형!/언니!/오빠! | 연하→연상도 친족호칭 중심, 말투는 반말 가능 |
| family | 부모→자녀 | 이름아/이름야 | — | 제 딸 / 제 아들 | — | 이름아!/이름야! | 부모→자녀 반말 |
| family | 자녀→부모 | — | 엄마/아빠 또는 어머니/아버지 | — | 저희 어머니 / 저희 아버지 | 엄마!/아버지! | 자녀→부모 존댓말 기본 |
| family | 시어머니↔며느리 | (시어머니) 이름아/이름야 | (며느리) 어머님 | 제 며느리 | 시어머님 | 선우야! / 어머님! | 상호 존댓말 권장, 시어머니 쪽은 혼합 가능하나 AI는 존댓말이 안전 |
| family | 장모↔사위 | (장모) 사위/이름 사위 | (사위) 장모님 | 제 사위 | 장모님 | 사위!/정우 사위! / 장모님! | 상호 존댓말 |
| tenant | 세입자↔집주인 | 이름 씨 / role title | 이름 씨 / role title | 집주인분 | 세입자분 | 이름 씨! | 상호 존댓말 |
| friend | 동갑·친한 친구 | 이름아/이름야 | 이름아/이름야 | 제 친구 | 제 친구 | 이름! | 상호 반말 |
| workplace | 동료 | 이름 씨 | 이름 씨 | 동료분 | 동료분 | 이름 씨! | 상호 존댓말 |
| workplace | 상하 관계 | 이름 씨 / 직함 | 팀장님/부장님 등 | 팀원 / 직원 | 팀장님 / 상사분 | 이름 씨!/직함! | 하→상 존댓말, 상→하 존댓말 또는 낮춤 혼합 |
| generic | 역할 미확정 formal | 이름 씨 | 이름 씨 | 상대방 | 상대방 | 이름 씨! | 상호 존댓말 |

### 1-4. 출시 버전에서 꼭 지켜야 할 운영 규칙
- `family`는 **절대** 하나의 informal bucket으로 묶지 않습니다.
- `tenant`는 나이로 추정하지 말고 **명시 role**을 두는 게 맞습니다.
- `spouse`도 하나의 informal bucket으로 묶지 말고, 최소 `warm / strained / separated`를 나눠야 합니다.
- `callTerms.toJudge = "제 가족"` 같은 범용값은 금지합니다. 재판관에게는 **관계가 드러나는 참조어**가 들어가야 합니다. fileciteturn19file3

## 2. 관계 확정이 필요했던 3건 — 제 판단

### family-02 → **시어머니 ↔ 며느리** (신뢰도: 중간)
- 단서: “추석 가족 모임, 공장 이어받기, 배신 프레임”.
- 두 여성 간 갈등이고, 문서 자체도 후보를 시어머니↔며느리 / 장모↔며느리로 보고 있습니다. 이 중 **가업 승계/가족 모임/배신 프레임**은 시가(媤家) 서사와 더 잘 맞습니다. fileciteturn19file11
- 따라서:
  - A(정미옥 63): 시어머니
  - B(강선우 35): 며느리

### family-03 → **어머니 ↔ 아들** (신뢰도: 중간~높음)
- 문서는 후보로 “장모↔사위, 어머니↔아들”을 같이 올려 두었습니다. fileciteturn19file11
- 저는 **어머니↔아들**로 확정합니다.
  - 이유 1: “독립하며 생활비 보태겠다”, “효도 문제”는 한국어 맥락상 **성인 자녀와 부모** 갈등 어휘에 더 가깝습니다.
  - 이유 2: 한국에서는 어머니와 아들이 **서로 다른 성을 갖는 것이 정상**이므로, 성이 다르다는 건 mother-son을 배제하는 근거가 아닙니다.
- 따라서:
  - A(최복자 61): 어머니
  - B(박정우 31): 아들

### family-06 → **어머니 ↔ 아들** (신뢰도: 높음)
- 문서 자체에 이미 “모자?”라고 적혀 있고, 배경 단서에도 “모자의 공~, 쉼터·채무조정 서류”가 있어 parent-child 쪽이 훨씬 강합니다. fileciteturn19file11
- 여기서도 성이 다른 것은 mother-son을 부정하는 근거가 아닙니다.
- 따라서:
  - A(오선영 58): 어머니
  - B(임하준 27): 아들

## 3. 문제 사건 25개(= 37 이슈행 정리본)의 concrete patch 값

실제 patch JSON은 별도 파일 `solomon_callterms_patch_values.json`에 정리했습니다.

핵심 방침:
- family-01~12: 전부 구체값 제공
- spouse-08: 전부 구체값 제공
- tenant-01~12: 현재 자료 부족으로 **role-based partial patch** 제공  
  (`A=tenant, B=landlord`를 기본 가정. 실제 사건 배경이 반대면 두 값만 뒤집으면 됨)

## 4. 코드 수정 방향 — llmSpeechGuide.ts 중심, 하지만 거기서 끝내면 안 됨

### 4-1. 강하게 권장하는 방향
문서에는 `familyRelation` 서브타입 추가 또는 나이차/성별 자동 판별이 제안되어 있습니다. 저는 **정식 출시 버전이면 명시 서브타입을 넣는 쪽을 밀어붙입니다.**  
이유는 간단합니다.

- `family-03`, `family-06`처럼 **성만 보고 관계를 추론하면 틀릴 수 있음**
- `tenant`도 나이가 많다고 무조건 집주인이 아님
- `spouse-08`처럼 **같은 spouse라도 호칭과 말투가 완전히 달라질 수 있음**

즉, runtime inference는 migration fallback까지만 허용하고, 운영 데이터는 explicit subtype로 가야 합니다.

### 4-2. JSON/타입에 추가할 필드
```ts
type FamilyRelation =
  | 'siblings'
  | 'parent_child'
  | 'inlaw_mother_daughter_in_law';

type RelationshipState =
  | 'warm'
  | 'strained'
  | 'separated';

interface DuoMetaExtensions {
  relationshipSubtype?: RelationshipSubtype;
  familyRelation?: FamilyRelation;
  relationshipState?: RelationshipState;
  roleMap?: {
    a?: 'tenant' | 'landlord' | 'employee' | 'manager';
    b?: 'tenant' | 'landlord' | 'employee' | 'manager';
  };
}
```

### 4-3. `llmSpeechGuide.ts` 수정안

#### A. `isInformalRelation()`는 폐기 또는 축소
현재 문서상 `isInformalRelation('family') → true`가 문제의 출발점입니다. fileciteturn19file1  
이 함수는 아래처럼 바꿔야 합니다.

```ts
function isMutualInformal(subtype?: RelationshipSubtype, state?: RelationshipState): boolean {
  return subtype === 'family_siblings'
      || subtype === 'friend_peer'
      || (subtype === 'spouse_warm' && state !== 'separated');
}
```

즉 “관계 전체가 informal인가?”가 아니라, **서브타입이 mutual informal인가?**만 물어야 합니다.

#### B. `buildSpeechProfile()`를 새로 만든다
```ts
type Politeness = 'banmal' | 'jondae';

interface SpeechProfile {
  aToB: Politeness;
  bToA: Politeness;
  judgeARefFallback: string;
  judgeBRefFallback: string;
  aToBFallback: string;
  bToAFallback: string;
  angryAFallback: string;
  angryBFallback: string;
}

function buildSpeechProfile(duo: Duo): SpeechProfile {
  // 1) explicit callTerms 있으면 우선
  // 2) relationshipSubtype / familyRelation / roleMap 기반 fallback
  // 3) 마지막 generic fallback
}
```

#### C. `getHonorifics()`, `getJudgeReference()`, `getAngryCall()` 모두 profile 기반으로 통합
지금은 각각 따로 계산하는 구조인데, relation subtype이 들어가면 **한 번에 SpeechProfile로 계산한 뒤 거기서 꺼내는 방식**이 관리가 쉽습니다.

### 4-4. 하지만 실제로는 `llmDialogueResolver.ts`, `llmFreeQuestion.ts`도 같이 고쳐야 함

현재 두 파일은 `llmSpeechGuide.ts`를 거치지 않고, 다시 `['spouse','family','friend']` 기준으로 `formalityGuide`와 `speechGuideShort`를 직접 만들고 있습니다. 이 상태면 `llmSpeechGuide.ts`만 고쳐도 가족 말투 버그가 남습니다. fileciteturn20file11 fileciteturn20file0

#### 수정 지시
- `llmDialogueResolver.ts`
  - 삭제 대상:
    - `const isInformal = ['spouse', 'family', 'friend'].includes(...)`
    - 그 아래 `formalityGuide`, `speechGuideShort`
  - 교체:
    ```ts
    const speechProfile = getSpeechProfile(caseData.duo, party)
    const formalityGuide = speechProfile.formalityGuide
    const speechGuideShort = speechProfile.speechGuideShort
    ```
- `llmFreeQuestion.ts`
  - 동일하게 `isInformal` 하드코딩 제거
  - `buildSpeechGuide()`와 같은 source에서 `formalityGuide` / `speechGuideShort`를 같이 받도록 통합

### 4-5. 출력 가이드 문구 자체도 방향성 변경
현재 informal이면 “상대에게 반말 (~야, ~잖아, ~거야)”를 넣는 구조인데, release 버전에서는 **방향별 말투**가 필요합니다.

예:
```ts
if (subtype === 'family_parent_child') {
  if (party === 'a') {
    formalityGuide = '- 상대(자녀)에게: 반말 가능
- 재판관에게: 존댓말'
    speechGuideShort = '말투: 자녀에게는 반말, 재판관에게는 존댓말.'
  } else {
    formalityGuide = '- 상대(부모)에게: 존댓말 기본
- 재판관에게: 존댓말'
    speechGuideShort = '말투: 부모에게는 존댓말, 재판관에게는 존댓말.'
  }
}
```

### 4-6. tenant도 role 명시로 바꿔야 함
문서도 tenant는 “정확한 판별은 사건 배경에서 확인 필요”라고 적고 있습니다. 나이로 landlord를 추정하는 건 데이터 생성 단계에서만 임시로 쓰고, 런타임 로직은 `roleMap`을 읽어야 합니다. fileciteturn19file11

## 5. Claude Code가 바로 적용할 순서

1. `family-01~12`, `spouse-08`, `tenant-01~12` callTerms patch 적용
2. Phase 1/2 사전 생성 대사에서 literal 호칭 치환
3. `llmSpeechGuide.ts`에 `relationshipSubtype / familyRelation / roleMap` 기반 speech profile 도입
4. `llmDialogueResolver.ts`, `llmFreeQuestion.ts`의 hardcoded informal 판정 제거
5. tenant role / spouse state / family relation을 사건 JSON 메타로 정착
6. 이후에만 fallback inference 최소화