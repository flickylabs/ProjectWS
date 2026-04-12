#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'headline-01'
const SCRIPTED_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)
const CASE_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)

const bundle = JSON.parse(fs.readFileSync(SCRIPTED_PATH, 'utf8'))
const caseData = JSON.parse(fs.readFileSync(CASE_PATH, 'utf8'))
const evidenceById = new Map((caseData.evidence || []).map((item) => [item.id, item]))

const roleResponseMap = {
  self: [
    '이 자료 앞에서는 제 쪽에 불리한 흔적이 남아 있다는 점을 피하기 어렵습니다',
    '적어도 이 증거는 제가 줄여 말한 범위를 좁혀 버립니다',
    '제 설명만으로 밀어붙이기에는 자료가 너무 또렷합니다',
    '여기서는 제 쪽 방어선이 분명히 얇아집니다',
    '이 증거를 보고도 제 불리한 지점을 지울 수는 없습니다',
  ],
  other: [
    '이 자료는 상대가 줄여 말한 대목을 직접 눌러 보여 줍니다',
    '적어도 이 증거에서는 상대 설명이 먼저 흔들립니다',
    '상대 쪽이 빼 놓은 맥락이 여기서 더 선명해집니다',
    '이 자료는 상대가 좁혀 말한 범위를 다시 벌려 놓습니다',
    '여기서는 상대 답변보다 기록 쪽 무게가 더 큽니다',
  ],
  institutional: [
    '기관 기록이라 체감보다 더 무겁게 남는 자료입니다',
    '공식 기록인 이상 취사선택으로 가볍게 넘길 수 없습니다',
    '기관이 남긴 자료라 개인 해명보다 먼저 봐야 합니다',
    '이 증거는 사적인 주장보다 공식 기록의 무게를 세웁니다',
    '공식 출처가 붙은 만큼 말로만 좁히기 어려운 자료입니다',
  ],
  both: [
    '이 자료는 양쪽 설명을 한꺼번에 눌러 보는 성격이 강합니다',
    '한쪽 말만 따라가면 이 자료가 남기는 흐름을 놓치게 됩니다',
    '이 증거는 둘 중 누구 한쪽만의 해명으로 닫히지 않습니다',
    '양측이 서로 다르게 말해도 이 자료는 공통 사실선을 세웁니다',
    '결국 이 증거는 양쪽 다 자기 식으로만 읽기 어렵게 만듭니다',
  ],
}

const bandResponseMap = {
  early: [
    '지금 단계에서는 이 자료만으로 의도까지 단정하지는 말아 주십시오',
    '아직은 이 증거를 방어적으로 읽고 싶은 마음이 남아 있습니다',
    '처음부터 이 자료가 뜻하는 바를 전부 인정할 수는 없습니다',
    '이 단계에서는 증거의 무게를 줄여 읽으려는 제 태도도 남아 있습니다',
    '지금은 이 자료를 두고도 선을 긋고 말하려는 쪽에 가깝습니다',
  ],
  mid: [
    '여기쯤 오면 이 자료가 가리키는 불리한 부분을 더는 무시하기 어렵습니다',
    '이제는 이 증거를 보고도 같은 말을 반복하기 어렵습니다',
    '중간 단계부터는 이 자료가 제 답을 조금씩 좁혀 옵니다',
    '지금은 이 자료 앞에서 일부를 인정하는 쪽으로 기울 수밖에 없습니다',
    '이 증거가 보여 주는 지점은 더 이상 바깥으로 밀어내기 어렵습니다',
  ],
  late: [
    '이 자료 앞에서는 더 좁혀 말하지 않겠습니다',
    '여기까지 왔으면 이 증거가 남기는 책임선을 인정해야 합니다',
    '이제는 이 자료를 보고도 버티는 식으로 답할 수 없습니다',
    '늦은 단계에서는 이 증거가 제 설명보다 앞에 놓입니다',
    '이 자료가 남긴 흔적을 더는 변명으로 눌러 둘 수 없습니다',
  ],
}

const behaviorHintMap = {
  early: [
    '증거 무게를 낮춰 읽으려는 초기 방어가 남아 있습니다.',
    '자료를 인정하면서도 의미 확대를 막으려 합니다.',
    '첫 반응답게 방어와 확인이 섞여 있습니다.',
    '증거 해석 범위를 일부러 좁혀 잡습니다.',
    '직접 반응은 하되 결론은 뒤로 미룹니다.',
  ],
  mid: [
    '증거 때문에 답변 폭이 좁아지기 시작합니다.',
    '자료 앞에서 일부를 인정하는 흔들림이 보입니다.',
    '불리한 흔적을 완전히 덮지 못하는 반응입니다.',
    '증거 해석을 줄이려 하지만 중간 단계의 균열이 보입니다.',
    '자료가 답변의 모양을 바꾸는 구간입니다.',
  ],
  late: [
    '증거의 무게를 더는 피하지 못하는 반응입니다.',
    '자료가 남기는 책임선을 사실상 수용합니다.',
    '방어보다 인정이 앞서는 늦은 단계의 반응입니다.',
    '증거 앞에서 답변의 여지를 스스로 줄입니다.',
    '증거를 회피하지 못하고 책임으로 연결합니다.',
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

function collectDetailSentences(entry) {
  const seen = new Set()
  const details = []
  for (const variant of entry.variants || []) {
    const sentences = splitSentences(variant.text)
    for (const sentence of sentences) {
      const normalized = finishSentence(sentence)
      if (!normalized || normalized.startsWith('증거 ')) continue
      if (seen.has(normalized)) continue
      seen.add(normalized)
      details.push(normalized)
    }
  }
  return details
}

function pick(arr, index, fallback = '') {
  if (!Array.isArray(arr) || arr.length === 0) return fallback
  return arr[index % arr.length]
}

function introFor(entry, evidence, index) {
  const names = [evidence.name, evidence.surfaceName, evidence.name, evidence.surfaceName || evidence.name, evidence.name]
  const introTemplates = [
    `재판관님, 증거 ${names[0]}는 표면보다 전후 맥락이 더 중요합니다`,
    `지금 제시된 증거 ${names[1]}는 한 장면보다 흐름 전체를 보게 만듭니다`,
    `증거 ${names[2]}는 제가 좁혀 말한 범위를 바로 눌러 봅니다`,
    `증거 ${names[3]}는 말보다 기록이 먼저 서는 자료입니다`,
    `결국 증거 ${names[4]}는 어느 쪽 설명이 비어 있었는지 드러냅니다`,
  ]
  return pick(introTemplates, index, `증거 ${evidence.name}는 지금 답을 바꾸는 자료입니다`)
}

function rewriteEvidenceEntry(entry) {
  const evidence = evidenceById.get(entry.evidenceId)
  if (!evidence) return

  const details = collectDetailSentences(entry)
  const detailA = details[0] || `${evidence.name}의 핵심 장면이 남아 있습니다.`
  const detailB = details[1] || `${evidence.description}`
  const detailC = details[2] || `${evidence.name}만 보셔도 빠진 맥락이 드러납니다.`

  const roleResponses = roleResponseMap[entry.subjectRole] || roleResponseMap.other
  const bandResponses = bandResponseMap[entry.lieBand] || bandResponseMap.early
  const behaviorHints = behaviorHintMap[entry.lieBand] || behaviorHintMap.early

  const recipes = [
    [introFor(entry, evidence, 0), detailA],
    [introFor(entry, evidence, 1), pick(roleResponses, 1)],
    [introFor(entry, evidence, 2), pick(bandResponses, 2)],
    [introFor(entry, evidence, 3), detailB],
    [introFor(entry, evidence, 4), detailC],
  ]

  entry.variants = (entry.variants || []).map((variant, index) => ({
    ...variant,
    text: joinSentences(recipes[index] || recipes[recipes.length - 1]),
    behaviorHint: pick(behaviorHints, index, variant.behaviorHint || '증거 반응이 흔들립니다.'),
  }))

  if (entry.evidenceId === 'e-1' && entry.variants[0]) {
    entry.variants[0].text = joinSentences([
      introFor(entry, evidence, 0),
      pick(roleResponses, 0),
    ])
  }
}

for (const entry of bundle.channels.evidence_present.entries || []) {
  rewriteEvidenceEntry(entry)
}

fs.writeFileSync(SCRIPTED_PATH, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
console.log(`[headline-01] diversified evidence_present variants in ${path.relative(ROOT, SCRIPTED_PATH)}`)
