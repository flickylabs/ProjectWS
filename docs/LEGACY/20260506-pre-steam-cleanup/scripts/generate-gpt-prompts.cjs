/**
 * 유형별 GPT Phase 1 프롬프트 생성기.
 * docs/gpt-prompts/ 에 7개 독립 프롬프트 파일을 생성한다.
 */
const fs = require('fs')
const path = require('path')

const OUT_DIR = path.join(__dirname, '..', 'docs', 'gpt-prompts')

const TYPES = {
  spouse: {
    label: '부부',
    honorific: `- 호칭: 서로 **"자기"** (고정, 다른 호칭 금지)
- 상대에게: 반말 (~야, ~잖아, ~거야)
- 재판관에게 상대 언급: "제 남편이", "제 아내가", "제 남편의", "제 아내의"
- "~냐?" 금지 → "~야?"
- 한 대사 안에서 반말/존댓말 혼합 금지`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 부부 간의 신뢰와 송금 관련 문제입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 저는 억울합니다. 제 아내가 저를 외도범으로 몰고 있는데, 저는 가족을 위해 일한 것뿐입니다. (시선을 아래로 향하고 신중하게 말한다)","relatedDisputes":["d-3"],"behaviorHint":"시선을 아래로 향하고 신중하게 말한다."},
  {"speaker":"b","text":"가족을 위해요? 가족을 위하는 사람이 공동통장에서 280만원을 몰래 빼가요? (참지 못하고 끼어든다)","relatedDisputes":["d-1"],"behaviorHint":"참지 못하고 끼어든다. 목소리가 높다."},
  {"speaker":"a","text":"자기, 지금 내 차례잖아. 재판관님, 공동통장 건은... 사정이 있었습니다. (멈칫한다)","relatedDisputes":["d-1"],"behaviorHint":"'사정이 있었습니다'에서 잠시 멈칫한다."},
  {"speaker":"b","text":"사정? 무슨 사정인지 한번 말해봐. 어디다 쓴 건데. (팔짱을 끼고 쏘아본다)","relatedDisputes":["d-1"],"behaviorHint":"팔짱을 끼고 쏘아본다."},
  {"speaker":"a","text":"그건 지금 여기서 다 말하기 어려워. 그보다 자기가 새벽에 내 폰을 몰래 봤다는 거야. (화제를 전환한다)","relatedDisputes":["d-2"],"behaviorHint":"화제를 전환한다."},
  {"speaker":"b","text":"자기가 한밤중에 누구랑 문자 주고받는데 가만히 있으라고? 그게 말이 돼? (목소리가 높아진다)","relatedDisputes":["d-3","d-2"],"behaviorHint":"목소리가 높아진다."},
  {"speaker":"a","text":"그 메시지는 맥락이 있다고! 일부만 캡처해서 왜곡한 거잖아! (처음으로 목소리가 올라간다)","relatedDisputes":["d-3"],"behaviorHint":"처음으로 목소리가 올라간다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오. 정리해서 말씀해 주시겠습니까.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 정리하면 이렇습니다. 제 남편이 공동통장에서 280만원을 빼갔고, 외도가 의심되는 문자가 있고, 물어보면 숨기기만 합니다. 저는 진실을 알 권리가 있습니다. (감정을 누르며 또렷하게 정리한다)","relatedDisputes":["d-1","d-3"],"behaviorHint":"감정을 누르며 또렷하게 정리한다."}
]`,
    notes: `- A와 B의 성별을 사건 데이터에서 파악해 "제 남편/아내"를 정확히 사용하세요.`
  },

  neighbor: {
    label: '이웃',
    honorific: `- 호칭: 존댓말 기본. "~씨" 또는 "저분", "옆집 분"
- 상대에게: 존댓말. 감정이 격해지면 반말 전환 가능
- 재판관에게 상대 언급: "옆집 분이", "윗층 분이", "저 사람이"
- 초반 존댓말 → 후반 반말 전환 자연스럽게`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 이웃 간의 소음과 생활 갈등입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 저는 정상적으로 생활하고 있을 뿐입니다. 옆집 분이 지나치게 예민하게 반응하시는 겁니다. (담담하게 말한다)","relatedDisputes":["d-1"],"behaviorHint":"담담하게 말한다."},
  {"speaker":"b","text":"예민하다고요? 재판관님, 저 사람이 매일 밤 11시 넘어서 세탁기를 돌립니다. 벽 한 장 사이인데요. (목소리에 피로가 묻어난다)","relatedDisputes":["d-1"],"behaviorHint":"목소리에 피로가 묻어난다."},
  {"speaker":"a","text":"그건 제 퇴근 시간이 늦어서 어쩔 수 없는 겁니다. 그쪽도 아침 6시에 문을 쾅쾅 닫으시잖아요. (약간 방어적)","relatedDisputes":["d-1","d-2"],"behaviorHint":"약간 방어적으로 반박한다."},
  {"speaker":"b","text":"문을 쾅쾅이요? 정상적으로 닫은 건데... 당신은 증거도 없이 그런 말을 하시면 안 되죠. (언성이 올라간다)","relatedDisputes":["d-2"],"behaviorHint":"언성이 올라간다."},
  {"speaker":"a","text":"증거요? 저도 녹음한 거 있습니다. 서로 따지자면 한도 끝도 없어요. (차갑게)","relatedDisputes":["d-2"],"behaviorHint":"차갑게 응수한다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오. 정리해서 말씀해 주시겠습니까.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 정리하면 저 사람 때문에 석 달째 수면제를 먹고 있습니다. 관리사무소에도 신고했지만 바뀐 게 없습니다. (지친 표정으로 정리한다)","relatedDisputes":["d-1"],"behaviorHint":"지친 표정으로 정리한다."}
]`,
    notes: `- 이웃 간에는 존댓말이 기본이지만, 감정이 격해지는 후반부에서 반말로 자연스럽게 전환될 수 있습니다.
- "저 사람", "옆집 분" 등 간접 호칭을 사용하세요.`
  },

  workplace: {
    label: '직장',
    honorific: `- 호칭: 직급 호칭 (팀장님, 대리님) 또는 "~씨"
- 상사→부하: 반말 가능 ("자네", "김 대리")
- 부하→상사: 존댓말 필수 ("팀장님", "부장님")
- 재판관에게 상대 언급: "제 팀장이", "제 부하직원이", "이 사람이"
- 감정이 격해지면 직급 호칭이 무너질 수 있음`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 직장 내 업무 갈등과 부당 지시 문제입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 저는 팀 성과를 위해 합리적인 지시를 했을 뿐입니다. 제 부하직원이 과민 반응하고 있습니다. (자신감 있게 말한다)","relatedDisputes":["d-1"],"behaviorHint":"자신감 있게 말한다."},
  {"speaker":"b","text":"합리적이요? 재판관님, 제 팀장이 퇴근 후에도 계속 카톡으로 업무 지시를 합니다. 밤 11시에요. (지친 표정)","relatedDisputes":["d-1"],"behaviorHint":"지친 표정으로 말한다."},
  {"speaker":"a","text":"그건 급한 건이었어. 마감이 내일인데 어떡하라고? (부하에게 반말)","relatedDisputes":["d-1"],"behaviorHint":"당연하다는 듯 말한다."},
  {"speaker":"b","text":"팀장님, 매일이 마감이시잖아요. 급하지 않은 날이 없었습니다. (억울함을 누르며)","relatedDisputes":["d-1","d-2"],"behaviorHint":"억울함을 누르며 또박또박 말한다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 저는 이 사람 밑에서 6개월간 야근을 강요당했고, 거부하면 인사평가에 불이익을 받았습니다. 증거도 있습니다. (단호하게 정리한다)","relatedDisputes":["d-1","d-2"],"behaviorHint":"단호하게 정리한다."}
]`,
    notes: `- 상사/부하 관계를 사건 데이터에서 파악하세요 (나이, 직급).
- 상사는 부하에게 반말, 부하는 상사에게 존댓말이 자연스럽습니다.
- 감정이 격해지면 부하가 상사에게도 반말할 수 있습니다.`
  },

  family: {
    label: '가족',
    honorific: `- 호칭: 관계 호칭 (형/누나/오빠/언니/동생 + 이름)
  → 사건 데이터의 나이로 형/동생 관계를 파악하세요
- 상대에게: 반말 (가족 간)
- 재판관에게 상대 언급: "제 누나가", "제 동생이", "제 형이" 등
- "~냐?" 금지 → "~야?"`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 가족 간 재산 관리와 간병 분담 문제입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 제가 부모님 간병을 혼자 떠안고 있습니다. 제 동생은 돈도 시간도 안 냅니다. (억울한 표정)","relatedDisputes":["d-2"],"behaviorHint":"억울한 표정으로 호소한다."},
  {"speaker":"b","text":"혼자 떠안았다고? 재판관님, 제 누나가 부모님 통장에서 1,800만원을 먼저 빼갔습니다. 그걸 간병비라고 포장한 겁니다. (차갑게 반박한다)","relatedDisputes":["d-1"],"behaviorHint":"차갑게 반박한다."},
  {"speaker":"a","text":"도현아, 네가 뭘 알아. 내가 매일 병원 가고, 밥 해다 날랐어. 넌 뭐 했는데? (감정이 올라온다)","relatedDisputes":["d-2"],"behaviorHint":"감정이 올라온다."},
  {"speaker":"b","text":"누나, 그건 그거고 돈은 돈이야. 왜 먼저 상의를 안 해? (단호하게)","relatedDisputes":["d-1","d-5"],"behaviorHint":"단호하게 따진다."},
  {"speaker":"a","text":"상의? 네가 전화를 안 받잖아! 12일이나 돈을 안 보냈으면서! (목소리가 높아진다)","relatedDisputes":["d-2"],"behaviorHint":"목소리가 높아진다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오. 정리해서 말씀해 주시겠습니까.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 정리하면 제 누나가 부모님 돈 1,800만원을 사적으로 썼고, 간병비라고 사후에 포장했습니다. 저도 송금이 늦은 건 인정하지만, 이건 차원이 다릅니다. (감정을 누르고 정리한다)","relatedDisputes":["d-1","d-2"],"behaviorHint":"감정을 누르고 정리한다."}
]`,
    notes: `- A와 B의 나이로 형/누나/동생 관계를 정확히 파악하세요.
- 가족 간 반말이지만 감정선이 깊으므로, 과거 이야기("예전에 네가...")가 자연스럽게 나옵니다.
- 재판관에게는 존댓말 유지.`
  },

  friend: {
    label: '친구',
    honorific: `- 호칭: 반말 + 이름 호칭은 쓰지 않고, "야", "너" 등으로 지칭
- 상대에게: 반말
- 재판관에게 상대 언급: "제 친구가", "이 사람이"
- "~냐?" 금지 → "~야?"`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 친구 간 금전 문제와 신뢰 훼손입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 제 친구가 빌려간 돈을 3개월째 안 갚고 있습니다. 친구니까 참았는데 이제 한계입니다. (담담하지만 억울한 표정)","relatedDisputes":["d-1"],"behaviorHint":"담담하지만 억울한 표정."},
  {"speaker":"b","text":"재판관님, 그 돈은 빌린 게 아니라 같이 투자한 겁니다. 제 친구가 말을 바꾸는 겁니다. (당황하며 반박)","relatedDisputes":["d-1"],"behaviorHint":"당황하며 반박한다."},
  {"speaker":"a","text":"야, 투자? 네가 '한 달만 빌려줘'라고 했잖아. 카톡 다 남아있어. (흥분하며)","relatedDisputes":["d-1"],"behaviorHint":"흥분하며 따진다."},
  {"speaker":"b","text":"그건 처음 이야기고, 나중에 같이 하자고 바뀐 거잖아. 너도 동의했어. (방어적으로)","relatedDisputes":["d-1","d-2"],"behaviorHint":"방어적으로 설명한다."},
  {"speaker":"a","text":"동의? 내가 언제? 그렇게 말 바꾸니까 이렇게 된 거야. (실망한 표정)","relatedDisputes":["d-2"],"behaviorHint":"실망한 표정."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 제 친구가 같이 한 투자에서 손해가 나니까 저한테 전부 떠넘기려는 겁니다. 억울합니다. (울먹이며 정리)","relatedDisputes":["d-1","d-2"],"behaviorHint":"울먹이며 정리한다."}
]`,
    notes: `- 친구 사이는 완전 반말. "야", "너"로 자연스럽게.
- 재판관에게는 존댓말 유지.
- 친구 관계 특성상 과거 우정/배신감이 감정선의 핵심.`
  },

  partnership: {
    label: '동업',
    honorific: `- 호칭: 존댓말 기본. "~씨" 또는 직함(대표, 공동대표)
- 상대에게: 존댓말. 격해지면 반말 전환 가능
- 재판관에게 상대 언급: "제 동업자가", "공동대표가", "이 사람이"`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 동업 관계에서의 자금 사용과 의사결정 문제입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 제 동업자가 공동 자금에서 임의로 인출한 금액이 있습니다. 사전 합의 없이요. (서류를 정리하며)","relatedDisputes":["d-1"],"behaviorHint":"서류를 정리하며 침착하게 말한다."},
  {"speaker":"b","text":"재판관님, 그건 운영에 필요한 긴급 지출이었습니다. 이 사람이 연락이 안 됐기 때문에 제가 판단한 겁니다. (억울해하며)","relatedDisputes":["d-1"],"behaviorHint":"억울해하며 설명한다."},
  {"speaker":"a","text":"연락이 안 됐다고요? 카톡 읽씹해놓고 그런 말을 하시면 곤란하죠. (냉정하게)","relatedDisputes":["d-1","d-2"],"behaviorHint":"냉정하게 반박한다."},
  {"speaker":"b","text":"그때 저도 급했어요! 당신은 맨날 결정을 미루기만 하잖아요! (격해지며 반말로 전환)","relatedDisputes":["d-2"],"behaviorHint":"격해지며 반말로 전환한다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 제 동업자가 공동 자금을 사적으로 유용한 정황이 있고, 의사결정 과정을 무시한 것은 명백합니다. (단호하게 마무리)","relatedDisputes":["d-1","d-2"],"behaviorHint":"단호하게 마무리한다."}
]`,
    notes: `- 동업자 간에는 존댓말이 기본이나, 감정이 격해지면 반말 전환이 자연스럽습니다.
- 비즈니스 용어(자금, 의사결정, 계약)가 자연스럽게 섞입니다.`
  },

  tenant: {
    label: '임대인/임차인',
    honorific: `- 호칭: "집주인", "세입자", "임대인님", "임차인" 또는 "~씨"
- 상대에게: 존댓말 기본. 격해지면 반말 가능
- 재판관에게 상대 언급: "집주인이", "세입자가", "이 사람이"`,
    example: `[
  {"speaker":"system","text":"재판을 시작하겠습니다. 오늘의 쟁점은 임대차 관계에서의 보증금과 시설 관리 문제입니다.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"a","text":"재판관님, 세입자가 월세를 석 달째 연체하고 있고, 시설도 훼손한 상태입니다. (서류를 꺼내며)","relatedDisputes":["d-1"],"behaviorHint":"서류를 꺼내며 설명한다."},
  {"speaker":"b","text":"재판관님, 집주인이 수리 요청을 세 번이나 무시했습니다. 곰팡이가 피어서 살 수가 없는데 월세를 내라니요. (억울해하며)","relatedDisputes":["d-2"],"behaviorHint":"억울해하며 호소한다."},
  {"speaker":"a","text":"곰팡이는 환기를 안 해서 생긴 겁니다. 세입자 과실이에요. (단호하게)","relatedDisputes":["d-2"],"behaviorHint":"단호하게 반박한다."},
  {"speaker":"b","text":"환기요? 창문이 고장 나서 못 여는 걸 제가 몇 번이나 말씀드렸잖아요! (언성이 높아진다)","relatedDisputes":["d-2","d-3"],"behaviorHint":"언성이 높아진다."},
  {"speaker":"system","text":"양측 모두 진정해 주십시오.","relatedDisputes":[],"behaviorHint":null},
  {"speaker":"b","text":"재판관님, 정리하면 집주인이 수리 의무를 방기했고, 그래서 월세 지급을 유보한 겁니다. 보증금도 돌려받지 못할까 봐 불안합니다. (불안한 표정으로 정리)","relatedDisputes":["d-1","d-2"],"behaviorHint":"불안한 표정으로 정리한다."}
]`,
    notes: `- 임대인/임차인 관계를 사건 데이터에서 파악하세요 (누가 집주인, 누가 세입자인지).
- 법적 용어(보증금, 월세, 수리 의무)가 자연스럽게 섞입니다.
- 격해지면 반말 전환 가능.`
  }
}

// 공통 규칙 부분
function buildPrompt(type, config) {
  return `# Phase 1 대사 생성 — ${config.label} (${type})

갈등 해결 시뮬레이션 게임 "솔로몬"의 Phase 1(초기 진술) 대사를 생성합니다.
첨부된 사건 파일 각각에 대해 **8~10개**의 대사를 JSON 배열로 출력하세요.

---

## 대화 흐름 (8~10개)

\`\`\`
① system: 재판 시작 선언 + 배경 요약 한 줄 (1개)
② a: 재판관에게 자기 입장 진술 — 존댓말 (1~2개)
③ b: 참다 못해 끼어들어 반박 (1개)
④ a↔b: 번갈아 서로 따지며 감정 격화 (4~5개)
⑤ system: "진정하세요" / "정리해서 말씀하세요" 등 개입 (0~1개)
⑥ a 또는 b: 자기 입장 정리 마무리 (1개)
\`\`\`

---

## 말투 규칙 (매우 중요)

**원칙: 한 대사 = 한 대상. 재판관에게 하는 말과 상대에게 하는 말을 한 문장 안에 섞지 마세요.**

**이번 세션 (${config.label}) 규칙:**
${config.honorific}

---

## 이름 사용 규칙

- 캐릭터 대사(speaker "a", "b")에서 상대 이름을 직접 쓰지 마세요.
  - 상대에게 직접 말할 때: 호칭 사용 (위 규칙 참조)
  - 재판관에게 상대 언급할 때: 관계 호칭 사용 (위 규칙 참조)
- system 대사와 behaviorHint에서만 이름 플레이스홀더 사용:
  - {A} → A 이름, {B} → B 이름
  - {A:이} → A+"이/가", {A:은} → A+"은/는", {A:을} → A+"을/를"
  - {B:이}, {B:은}, {B:을} 등 동일

---

## 각 대사 형식

- 2~3문장으로 완결 (중간에 끊지 마세요)
- text 끝에 **(행동 묘사)**를 괄호로 포함
- behaviorHint 필드에 행동 묘사만 따로 기입
- relatedDisputes에 관련 쟁점 ID 배열 기입

---

## 캐릭터 반영

**archetype별 행동 패턴:**
| archetype | 특징 | 대사 방향 |
|-----------|------|-----------|
| avoidant | 회피, 돌려 말하기 | 직답을 피하고 화제를 전환 |
| confrontational | 정면 돌파, 공격적 | 직접 따지고 증거를 들이밈 |
| people_pleaser | 양쪽 맞추려 함 | "제가 잘못한 건 맞지만..." |
| narcissistic | 자기 정당화 | "내가 아니었으면 어쩔 뻔했어" |
| passive_aggressive | 겉은 순응, 속은 공격 | "네, 제가 다 잘못했죠" (비꼼) |
| emotional | 감정 폭발, 눈물 | 감정이 앞서서 논리가 흐트러짐 |
| victim_cosplay | 피해자 행세 | 희생을 강조하며 동정을 유도 |
| cold_logic | 냉철한 논리 | 숫자와 증거로만 말하려 함 |

**반영 요소:**
- speechStyle의 특징이 대사에 자연스럽게 드러나야 함
- verbalTells의 pattern을 1~2번 자연스럽게 포함
- fear에 연결되는 감정선이 초반엔 억눌려 있다가 후반에 드러남

---

## 쟁점 분배

- 모든 쟁점이 최소 1번은 언급되어야 함
- 핵심 쟁점(d-1, d-2)은 2~3번 반복 가능
- 후반 쟁점(d-4, d-5)은 1번이면 충분

---

## 출력 형식

**JSON 배열만 출력하세요. 설명이나 코멘트 없이.**

**⚠️ 필수 체크:**
- speaker는 반드시 소문자 **"a"**, **"b"**, **"system"** 중 하나
- 캐릭터 대사에서 이름 직접 사용 금지 → 관계 호칭 사용
- system/behaviorHint에서만 {A}, {B} 플레이스홀더 사용
- 쟁점 ID는 입력 데이터의 disputes에 있는 것만 사용
- 총 대사 수 8~10개

---

## 기준 예시 (${config.label})

\`\`\`json
${config.example}
\`\`\`

${config.notes}

---

## 작업 방식

첨부된 사건 파일을 하나씩 순서대로 처리해주세요.
하나 완료하면 확인 후 다음 사건으로 넘어가겠습니다.
`
}

// 생성
for (const [type, config] of Object.entries(TYPES)) {
  const content = buildPrompt(type, config)
  const outPath = path.join(OUT_DIR, `prompt-${type}.md`)
  fs.writeFileSync(outPath, content, 'utf8')
  console.log(`✓ ${outPath}`)
}
console.log(`\n총 ${Object.keys(TYPES).length}개 프롬프트 생성 완료`)
