#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'headline-01'
const SCRIPTED_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)

const bundle = JSON.parse(fs.readFileSync(SCRIPTED_PATH, 'utf8'))

const disputeLeadMap = {
  'd-1': [
    '재판관님, 이 쟁점은 실제 장면과 편집 강도를 분리해서 보셔야 합니다',
    '적어도 이 부분만큼은 장면의 존재와 연출의 세기를 같은 말로 묶을 수 없습니다',
    '제가 숨긴 것이 있더라도, 편집선과 사실선은 갈라서 보셔야 합니다',
    '지금 질문은 문제 장면이 있었느냐보다 그것을 어떻게 밀어 올렸느냐에 가깝습니다',
    '여기서는 공익 포장보다 편집 판단이 어디서 과해졌는지를 보셔야 합니다',
  ],
  'd-2': [
    '재판관님, 이 쟁점은 위생 실패의 정도와 표현 강도를 함께 따져야 합니다',
    '누적된 위생 문제와 즉시 영업정지 사안을 같은 말로 섞어서는 안 됩니다',
    '운영 실패가 있었다는 말과 모든 경고가 같은 무게라는 말은 다릅니다',
    '여기서는 실제 위생 문제와 그 문제를 어떻게 부풀리거나 줄였는지를 같이 봐야 합니다',
    '시정 권고의 기록과 현장 체감이 어디서 엇갈렸는지를 먼저 보셔야 합니다',
  ],
  'd-3': [
    '재판관님, 이 쟁점은 협조 제안이 어디서 거래 압박으로 읽히는지에 관한 문제입니다',
    '표현이 부드러웠다고 해서 상대가 느낀 압박 구조까지 사라지지는 않습니다',
    '제안의 형식과 실제 영향력 사용을 분리해서 말할 수 없는 지점이 있습니다',
    '여기서는 무상 협조 요청과 회복 제안이 왜 한 흐름으로 읽혔는지를 봐야 합니다',
    '이 부분은 직접 협박 문구가 있었느냐보다 거절하기 어려운 구조였느냐가 핵심입니다',
  ],
  'd-4': [
    '재판관님, 이 쟁점은 반박이 어디서 신상 확산으로 넘어갔는지에 관한 문제입니다',
    '감정적 반격과 공개적으로 사람을 몰아세우는 행위는 같은 선이 아닙니다',
    '단체방과 커뮤니티에서 선을 넘은 순간이 있었다는 점은 분리해서 봐야 합니다',
    '여기서는 억울함의 표현과 보복성 확산이 어디서 갈라졌는지를 따져야 합니다',
    '반박의 명분이 있었다 해도 정보 확산의 책임까지 줄어들지는 않습니다',
  ],
}

const questionLeadMap = {
  fact_pursuit: [
    '재판관님, 먼저 기록으로 남는 사실선부터 보셔야 합니다',
    '지금 질문에서는 해석보다 사실로 고정되는 부분부터 말씀드리겠습니다',
    '적어도 이 답에서는 장면과 기록을 먼저 분리해 두고 싶습니다',
    '제가 방어적으로 말하더라도 사실로 남는 부분까지 지우려는 것은 아닙니다',
    '먼저 확인 가능한 사실부터 세워 두어야 이 쟁점이 흐려지지 않습니다',
  ],
  motive_search: [
    '재판관님, 왜 그런 선택을 했는지를 빼면 이 답은 설명되지 않습니다',
    '행동의 배경을 같이 보셔야 제가 왜 선을 넘었는지 보입니다',
    '겉으로는 다른 말을 했어도, 실제로 움직인 이유는 따로 있었습니다',
    '지금은 결과보다 제가 무엇을 지키려 했는지부터 말씀드려야 합니다',
    '질문을 동기로 돌리면 제가 숨긴 계산이 어디 있었는지도 보일 겁니다',
  ],
  empathy_approach: [
    '재판관님, 변명보다 먼저 제가 피하고 싶었던 감정부터 말씀드리겠습니다',
    '어떻게 보일지가 두려워질수록 제 말도 더 방어적으로 흘렀습니다',
    '이 질문에서는 사실만이 아니라 제가 무엇을 부끄러워했는지도 같이 봐 주십시오',
    '제가 끝까지 붙잡고 싶었던 체면과 두려움이 이 답에 섞여 있습니다',
    '여기서는 제가 왜 더 차갑거나 거칠게 반응했는지도 함께 보셔야 합니다',
  ],
}

const partyLeadMap = {
  a: [
    '저는 공익이라는 말 뒤에 제 계산을 같이 숨기고 있었습니다',
    '문제 제기와 파급력 계산을 완전히 분리하지 못한 채 움직였습니다',
    '조회수와 정당성 사이에서 선을 분명히 긋지 못했습니다',
    '상대의 잘못을 짚으면서도 제가 얻는 이익을 같이 보고 있었습니다',
    '제가 붙잡고 있던 것은 사실만이 아니라 반응의 크기이기도 했습니다',
  ],
  b: [
    '저는 잘못을 줄이는 것보다 여론과 매출을 먼저 막으려 하고 있었습니다',
    '운영 책임보다 평점 하락과 확산 속도를 더 두려워하고 있었습니다',
    '생계가 무너질 수 있다는 공포 때문에 대응의 선을 제대로 못 봤습니다',
    '제가 지키려 한 것은 설명의 정확성보다 가게를 버티게 하는 일이었습니다',
    '억울함을 말하는 동안에도 손실과 반격 생각이 먼저 앞섰습니다',
  ],
}

const stateLeadMap = {
  S0: [
    '지금은 제가 인정 범위를 좁혀 두고 있다는 점부터 말씀드리겠습니다',
    '아직은 선을 긋고 말하려는 마음이 더 큽니다',
    '이 단계에서는 제가 불리한 부분을 바로 꺼내지 못합니다',
    '지금 답이 방어적으로 들려도 그게 제 현재 위치입니다',
    '처음부터 전부 인정하는 방식으로는 아직 말이 나오지 않습니다',
  ],
  S1: [
    '전부 부인할 수는 없지만, 핵심을 바로 꺼내지는 못하겠습니다',
    '몇 가지는 인정해도 중심은 아직 방어하고 싶습니다',
    '지금은 부정과 인정이 섞인 답밖에 못 드리겠습니다',
    '제가 빼놓은 부분이 있다는 건 압니다. 다만 바로 열지는 못하겠습니다',
    '조금은 풀리지만 아직 결정적인 선은 붙잡고 있습니다',
  ],
  S2: [
    '일부는 인정하겠습니다. 다만 그 선을 넘기면 제가 감춘 계산이 보입니다',
    '여기서부터는 빠진 부분을 조금 더 말씀드릴 수 있습니다',
    '이제는 완전히 막아 서기보다 인정 범위를 조정하고 있습니다',
    '몇 가지는 더 숨기기 어렵습니다. 그렇다고 전부 열 수는 없습니다',
    '지금 답은 인정과 방어가 같이 남아 있는 상태입니다',
  ],
  S3: [
    '제 잘못만으로 끝낼 수 없다는 생각이 아직 강합니다',
    '상대 쪽 책임을 같이 들이대고 싶은 마음이 남아 있습니다',
    '지금은 인정하면서도 상대를 함께 끌어들이려는 답이 되고 있습니다',
    '제 쪽 책임을 말하더라도 혼자만 무너질 생각은 없습니다',
    '여기서는 잘못을 말하면서도 상대 쪽 선 넘은 부분을 같이 세우게 됩니다',
  ],
  S4: [
    '이제는 제가 넘은 선을 빼고 말하기 어렵습니다',
    '여기까지 오면 제 대응이 과했다는 점을 숨기기 어렵습니다',
    '계속 버티기보다 제가 어떻게 선을 넘었는지를 설명해야 할 단계입니다',
    '이제는 제 쪽 책임이 빠진 답으로는 버티기 어렵습니다',
    '저도 잘못한 지점을 인정하지 않고는 더 말이 이어지지 않습니다',
  ],
  S5: [
    '더 돌려 말하지 않겠습니다',
    '여기서는 제 쪽 계산과 책임을 함께 말씀드리겠습니다',
    '이제는 빠져나갈 여지를 만들지 않고 말하겠습니다',
    '결정적인 부분은 숨기지 않겠습니다',
    '여기까지 왔으면 제 몫을 바로 말씀드려야 합니다',
  ],
}

const stateCloseMap = {
  S0: [
    '적어도 지금은 그 선까지만 말씀드리겠습니다',
    '이 단계에서는 여기까지가 제가 열 수 있는 범위입니다',
    '지금은 그 이상을 바로 인정할 수 없습니다',
    '여기서 더 나가면 제가 붙잡고 있는 방어가 무너집니다',
    '지금 답이 좁게 들려도 일부러 그렇게 자르고 있습니다',
  ],
  S1: [
    '그래서 아직은 말을 절반쯤만 열고 있습니다',
    '핵심이 보이더라도 지금은 끝까지 꺼내지 않겠습니다',
    '조금 비켜 말하는 이유가 바로 그 부분입니다',
    '인정이 시작됐다고 해서 바로 전부 드러나는 단계는 아닙니다',
    '그래서 지금은 선을 남겨 둔 채 답하고 있습니다',
  ],
  S2: [
    '그래서 지금부터는 제가 빼 온 부분을 조금씩 붙여야 합니다',
    '다만 여기서도 아직 끝까지 다 말한 것은 아닙니다',
    '이제는 일부를 열지만, 마지막 방어선은 남겨 두고 있습니다',
    '조금 더 인정하되 아직 제 계산 전체를 다 꺼내지는 못합니다',
    '여기서 멈추는 이유도 제가 끝내 지키고 싶은 부분이 있기 때문입니다',
  ],
  S3: [
    '그래서 제 답도 자연히 상대 책임을 함께 세우는 쪽으로 흐릅니다',
    '제 쪽 잘못을 말하면서도 상대를 끌어들이는 이유가 거기에 있습니다',
    '지금 답이 곧장 사과로 가지 않는 이유도 그 때문입니다',
    '결국 저는 책임을 나눠 적고 싶은 쪽으로 말하게 됩니다',
    '이 단계에서 제 말이 날카롭게 남는 것도 그 방어 때문입니다',
  ],
  S4: [
    '그래서 이제는 제 대응이 과했다는 점을 더 숨길 수 없습니다',
    '여기서는 더 좁게 자르려 해도 이미 설명이 맞지 않습니다',
    '이제는 제가 무너뜨린 선을 같이 적어야 합니다',
    '그래서 제 쪽 책임을 떼어 놓고는 이 이야기가 성립하지 않습니다',
    '지금부터는 제가 한 일을 제 이름으로 적어야 합니다',
  ],
  S5: [
    '더는 공익, 생계, 억울함 같은 말 뒤로 숨지 않겠습니다',
    '변명보다 책임을 먼저 적겠습니다',
    '이제는 상대 탓보다 제 선택을 먼저 말하겠습니다',
    '돌려 말해도 달라질 게 없다는 걸 압니다',
    '이 부분은 제 쪽 잘못으로 남겨 두겠습니다',
  ],
}

const behaviorHintMap = {
  fact_pursuit: [
    '사실선을 붙들며 답변 범위를 통제합니다.',
    '장면과 해석을 분리하려는 태도가 강합니다.',
    '기록에 남는 부분만 인정하려는 방어가 보입니다.',
    '문장마다 사실과 평가를 갈라 말하려 합니다.',
    '확인 가능한 사실을 앞세워 책임 확대를 막으려 합니다.',
  ],
  motive_search: [
    '동기를 들키지 않으려 하다가도 계산의 흔적이 비칩니다.',
    '자기 선택의 배경을 설명하며 책임의 초점을 움직이려 합니다.',
    '겉말과 속내가 어긋나는 지점을 스스로 의식하고 있습니다.',
    '행동의 이유를 말하면서도 유리한 맥락만 남기려 합니다.',
    '자기 판단의 배경을 해명하며 비난의 무게를 조정하려 합니다.',
  ],
  empathy_approach: [
    '감정을 억누르려 하지만 문장 끝에서 흔들립니다.',
    '체면과 두려움을 같이 숨기려는 흔적이 남습니다.',
    '변명과 후회의 경계에서 답이 흔들립니다.',
    '감정 노출을 경계하면서도 부끄러움을 완전히 감추지 못합니다.',
    '스스로를 방어하면서도 상대가 받은 감정을 의식하고 있습니다.',
  ],
}

function splitSentences(text) {
  const matches = String(text || '').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  return (matches || []).map((part) => part.trim()).filter(Boolean)
}

function finishSentence(text) {
  const trimmed = String(text || '').trim()
  if (!trimmed) return ''
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function joinSentences(parts) {
  return parts
    .map((part) => finishSentence(part))
    .filter(Boolean)
    .join(' ')
}

function collectUniqueSentences(entry) {
  const seen = new Set()
  const out = []
  for (const variant of entry.variants || []) {
    for (const sentence of splitSentences(variant.text)) {
      const normalized = finishSentence(sentence)
      if (!normalized || seen.has(normalized)) continue
      seen.add(normalized)
      out.push(normalized)
    }
  }
  return out
}

function pick(arr, index, fallback = '') {
  if (!Array.isArray(arr) || arr.length === 0) return fallback
  return arr[index % arr.length]
}

function rewriteVariants(entry) {
  const base = collectUniqueSentences(entry)
  const main = base[0] || ''
  const focus = base[1] || base[0] || ''
  const tail = base[2] || base[1] || base[0] || ''

  const disputeLeads = disputeLeadMap[entry.disputeId] || disputeLeadMap['d-1']
  const questionLeads = questionLeadMap[entry.questionType] || questionLeadMap.fact_pursuit
  const partyLeads = partyLeadMap[entry.party] || partyLeadMap.a
  const stateLeads = stateLeadMap[entry.lieState] || stateLeadMap.S0
  const stateCloses = stateCloseMap[entry.lieState] || stateCloseMap.S0
  const behaviorHints = behaviorHintMap[entry.questionType] || behaviorHintMap.fact_pursuit

  const recipes = entry.lieState === 'S5'
    ? [
        [pick(stateLeads, 0), main, pick(stateCloses, 0)],
        [pick(questionLeads, 1), focus, pick(stateCloses, 1)],
        [pick(disputeLeads, 2), tail, pick(stateCloses, 2)],
        [pick(partyLeads, 3), pick(disputeLeads, 3), pick(stateCloses, 3)],
        [pick(stateLeads, 4), pick(disputeLeads, 4), tail],
      ]
    : [
        [pick(questionLeads, 0), main],
        [pick(disputeLeads, 1), focus],
        [pick(stateLeads, 2), tail],
        [pick(partyLeads, 3), pick(disputeLeads, 3)],
        [pick(stateCloses, 4), focus],
      ]

  entry.variants = (entry.variants || []).map((variant, index) => ({
    ...variant,
    text: joinSentences(recipes[index] || recipes[recipes.length - 1]),
    behaviorHint: pick(behaviorHints, index, variant.behaviorHint || '답변 톤이 흔들립니다.'),
  }))
}

for (const entry of bundle.channels.interrogation.entries || []) {
  rewriteVariants(entry)
}

fs.writeFileSync(SCRIPTED_PATH, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
console.log(`[headline-01] diversified interrogation variants in ${path.relative(ROOT, SCRIPTED_PATH)}`)
