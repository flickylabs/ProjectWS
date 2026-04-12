#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const bundlePath = path.join(ROOT, 'src', 'data', 'scriptedText', 'spouse-02.json')
const casePath = path.join(ROOT, 'src', 'data', 'cases', 'generated', 'spouse-02.json')
const backupPath = path.join(ROOT, 'tmp', 'spouse-02.before-pass1.json')

const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
const caseData = JSON.parse(fs.readFileSync(casePath, 'utf8'))

const evidenceById = new Map((caseData.evidence || []).map((item) => [item.id, item]))

function splitSentences(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
}

function joinSentences(parts) {
  return parts
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function sanitizeTerm(value) {
  return String(value || '')
    .replace(/[!?]+/g, '')
    .trim()
}

function badPartnerReferences(party) {
  const speaker = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const terms = new Set([
    opponent.name,
    opponent.name?.slice(1),
    sanitizeTerm(speaker.callTerms?.toPartner),
    sanitizeTerm(speaker.callTerms?.angry),
    `${opponent.name} 씨`,
    `${opponent.name?.slice(1) || ''} 씨`,
  ])
  return [...terms]
    .filter(Boolean)
    .filter((term) => term !== speaker.callTerms?.toJudge)
    .sort((a, b) => b.length - a.length)
}

function replacePartnerReferences(text, party) {
  const preferred = party === 'a'
    ? caseData.duo.partyA.callTerms?.toJudge || '제 남편'
    : caseData.duo.partyB.callTerms?.toJudge || '제 아내'

  let next = String(text || '')
  for (const term of badPartnerReferences(party)) {
    next = next.replace(new RegExp(escapeRegExp(term), 'gu'), preferred)
  }
  return next.replace(/\s+/g, ' ').trim()
}

function normalizePartnerParticles(text) {
  return String(text || '')
    .replace(/제 남편는/gu, '제 남편은')
    .replace(/제 남편가/gu, '제 남편이')
    .replace(/제 남편를/gu, '제 남편을')
    .replace(/제 남편와/gu, '제 남편과')
    .replace(/제 남편로/gu, '제 남편으로')
    .replace(/\s+/g, ' ')
    .trim()
}

function polishText(text) {
  return String(text || '')
    .replace(/기록상으로는 하지만 /gu, '하지만 ')
    .replace(/지금 단계에서 보면 하지만 /gu, '하지만 ')
    .replace(/제 기억으로는 하지만 /gu, '하지만 ')
    .replace(/기록상으로는 그래서 /gu, '그래서 ')
    .replace(/제 기억으로는 그래서 /gu, '그래서 ')
    .replace(/지금 단계에서 보면 이 단계에서는 /gu, '이 단계에서는 ')
    .replace(/기록상으로는 정리하면 /gu, '정리하면 ')
    .replace(/지금 단계에서 보면 사실부터 말씀드리겠습니다\./gu, '사실부터 말씀드리겠습니다.')
    .replace(/제 기억으로는 사실부터 말씀드리겠습니다\./gu, '사실부터 말씀드리겠습니다.')
    .replace(/학교에 학교로/gu, '학교로')
    .replace(/\s+/g, ' ')
    .trim()
}

function evidenceIntro(evidence, variantIndex) {
  const label = evidence.name || evidence.surfaceName || evidence.id
  const templates = [
    `지금 보이는 자료는 ${label}입니다.`,
    `먼저 확인하실 자료는 ${label}입니다.`,
    `이 증거의 출발점은 ${label}입니다.`,
    `자료 자체는 ${label}입니다.`,
    `지금 확인되는 핵심 자료도 ${label}입니다.`,
  ]
  return templates[variantIndex % templates.length]
}

function extractEvidenceKeywords(evidence) {
  const source = [evidence.name, evidence.description]
    .filter(Boolean)
    .join(' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')

  return [...new Set(
    source
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2),
  )]
}

function ensureEvidenceDirectReaction(text, evidence, variantIndex) {
  const keywords = extractEvidenceKeywords(evidence)
  if (keywords.some((keyword) => String(text).includes(keyword))) {
    return String(text)
  }

  const intro = evidenceIntro(evidence, variantIndex)
  const sentences = splitSentences(text)
  if (sentences.length >= 3) {
    sentences[0] = intro
    return joinSentences(sentences.slice(0, 3))
  }
  return joinSentences([intro, text])
}

function normalizeInterrogationLength(entry, variant) {
  const sentences = splitSentences(variant.text)
  if (entry.lieState === 'S5') {
    const additions = [
      '그래서 저는 그 정황을 더 숨길 수 없다고 봅니다.',
      '그 점 때문에 이제는 사실관계를 분명히 말씀드리는 편이 맞습니다.',
      '지금 단계에서는 그 판단을 더 구체적으로 설명드릴 수 있습니다.',
      '그래서 이 부분은 추정이 아니라 확인된 흐름으로 말씀드립니다.',
      '이제는 그 연결을 더 이상 우회하지 않겠습니다.',
    ]
    while (sentences.length < 3) {
      sentences.push(additions[(Number(variant.id.match(/#(\d+)/)?.[1] || 1) - 1) % additions.length])
    }
    return joinSentences(sentences.slice(0, 4))
  }

  return joinSentences(sentences.slice(0, 3))
}

const LEADS = {
  fact_pursuit: [
    '우선 확인되는 사실은 이렇습니다.',
    '지금 단계에서 분명한 부분부터 말씀드리겠습니다.',
    '제가 확인한 기록의 골자는 이렇습니다.',
  ],
  motive_search: [
    '그 판단이 왜 나왔는지부터 말씀드리겠습니다.',
    '당시 제 해석이 어디서 시작됐는지 설명드리겠습니다.',
    '제가 그렇게 받아들인 배경부터 정리하겠습니다.',
  ],
  empathy_approach: [
    '그때 제 상태를 함께 봐주셔야 합니다.',
    '감정의 흐름부터 짚어야 이 장면이 설명됩니다.',
    '그 순간의 심리를 먼저 말씀드리겠습니다.',
  ],
}

const PARAPHRASE_MAPS = [
  [
    ['느낌은 받았습니다', '인상은 받았습니다'],
    ['단정하지 않겠습니다', '섣불리 특정하지 않겠습니다'],
    ['맞다고 봅니다', '그렇게 보고 있습니다'],
    ['다릅니다', '맞지 않습니다'],
    ['연결돼 있었습니다', '이어져 있었다고 봅니다'],
    ['분명했습니다', '또렷했습니다'],
    ['가려져 있습니다', '가려진 상태입니다'],
    ['보였습니다', '드러났습니다'],
    ['같은 말이 아닙니다', '같은 뜻이 아닙니다'],
    ['바로잡아야 합니다', '정정해야 합니다'],
    ['분리해서 봐야 합니다', '따로 보셔야 합니다'],
    ['흘린 건 저입니다', '학교로 보낸 사람은 저입니다'],
    ['넣었습니다', '적어 넣었습니다'],
  ],
  [
    ['느낌은 받았습니다', '그런 기색을 읽었습니다'],
    ['단정할 수는 없습니다', '곧바로 특정할 수는 없습니다'],
    ['맞다고 봅니다', '그쪽으로 판단하고 있습니다'],
    ['다릅니다', '성격이 다릅니다'],
    ['연결돼 있었습니다', '그 흐름과 닿아 있었습니다'],
    ['분명했습니다', '선명했습니다'],
    ['가려져 있습니다', '가려진 채입니다'],
    ['보였습니다', '읽혔습니다'],
    ['같은 말이 아닙니다', '같은 표현으로 볼 수 없습니다'],
    ['바로잡아야 합니다', '고쳐 말씀드려야 합니다'],
    ['분리해서 봐야 합니다', '구분해서 보셔야 합니다'],
    ['흘린 건 저입니다', '제가 학교 쪽으로 넘겼습니다'],
    ['넣었습니다', '써 넣었습니다'],
  ],
  [
    ['느낌은 받았습니다', '그렇게 보였습니다'],
    ['단정하지 않겠습니다', '지금 바로 확정하진 않겠습니다'],
    ['맞다고 봅니다', '그 판단이 더 가깝습니다'],
    ['다릅니다', '그 해석은 어긋납니다'],
    ['연결돼 있었습니다', '그쪽 선으로 이어졌습니다'],
    ['분명했습니다', '분명하게 남았습니다'],
    ['가려져 있습니다', '가려진 부분이 많습니다'],
    ['보였습니다', '보이는 상태였습니다'],
    ['같은 말이 아닙니다', '같은 의미는 아닙니다'],
    ['바로잡아야 합니다', '수정해야 합니다'],
    ['분리해서 봐야 합니다', '나눠서 보셔야 합니다'],
    ['흘린 건 저입니다', '그 자료를 보낸 쪽은 저입니다'],
    ['넣었습니다', '기재했습니다'],
  ],
]

function rephraseSentence(sentence, mode, slot) {
  let next = String(sentence || '').trim()
  for (const [from, to] of PARAPHRASE_MAPS[mode % PARAPHRASE_MAPS.length]) {
    next = next.replace(new RegExp(escapeRegExp(from), 'gu'), to)
  }

  if (next === sentence) {
    const wrappers = [
      ['지금 단계에서 보면 ', ''],
      ['기록상으로는 ', ''],
      ['제 기억으로는 ', ''],
    ]
    const [prefix, suffix] = wrappers[(mode + slot) % wrappers.length]
    next = `${prefix}${next}${suffix}`.trim()
  }

  return next
}

function extraSentenceFor(entry, mode) {
  const pools = {
    fact_pursuit: [
      '그래서 확인된 범위와 추정은 나눠서 말씀드리는 것입니다.',
      '이 단계에서는 그 선까지만 사실로 남겨야 합니다.',
      '더 나아간 특정은 자료를 더 본 뒤에 가능하다고 봅니다.',
    ],
    motive_search: [
      '그래서 동기와 절차를 섞지 않으려는 것입니다.',
      '제 해석이 앞선 부분도 함께 보셔야 합니다.',
      '그 배경을 빼면 판단이 쉽게 비틀립니다.',
    ],
    empathy_approach: [
      '그때 제 심리가 같이 작동했다는 점도 봐주십시오.',
      '그래서 저는 상황의 압박부터 말씀드리는 것입니다.',
      '감정의 배경을 빼면 이 장면이 잘리지 않습니다.',
    ],
  }
  return pools[entry.questionType][mode % pools[entry.questionType].length]
}

function isMetaLeadSentence(sentence) {
  return /(말씀드리겠습니다|말하겠습니다|정리하겠습니다)\.?$/u.test(String(sentence || '').trim())
}

function diversifyInterrogationEntry(entry) {
  const variants = entry.variants || []
  if (variants.length < 5) return

  const variantOneSentencesRaw = splitSentences(variants[0].text)
  const variantOneSentences = variantOneSentencesRaw.filter((sentence) => !isMetaLeadSentence(sentence))
  const sourceSentences = variantOneSentences.length > 0 ? variantOneSentences : variantOneSentencesRaw
  const allSentences = []
  for (const variant of variants) {
    for (const sentence of splitSentences(variant.text)) {
      if (isMetaLeadSentence(sentence)) continue
      if (!allSentences.includes(sentence)) allSentences.push(sentence)
    }
  }

  const factA = sourceSentences[0] || allSentences[0] || ''
  const factB = sourceSentences[1] || allSentences.find((sentence) => sentence !== factA) || ''
  const factC = sourceSentences[2] || allSentences.find((sentence) => sentence !== factA && sentence !== factB) || ''

  for (const variantIndex of [2, 3, 4]) {
    const mode = variantIndex - 2
    const lead = entry.lieState === 'S5'
      ? ['이제는 분명히 말씀드리겠습니다.', '더는 우회하지 않겠습니다.', '핵심을 직접 말씀드리겠습니다.'][mode]
      : LEADS[entry.questionType][mode]

    const body = []
    if (entry.lieState === 'S5') {
      if (mode === 2) {
        const closers = {
          fact_pursuit: '그래서 그 결과를 보호나 실수 정도로 줄여 말할 수는 없습니다.',
          motive_search: '그래서 그 선택을 아이 걱정이라는 말만으로 덮을 수는 없습니다.',
          empathy_approach: '그래서 그 장면은 지금도 상처와 공포의 기억으로 남아 있습니다.',
        }
        body.push(
          lead,
          rephraseSentence(factB || factA, mode, 0),
          closers[entry.questionType],
          rephraseSentence(factC || extraSentenceFor(entry, mode), mode + 1, 1),
        )
      } else {
        const sequences = [
          [factA, factB || extraSentenceFor(entry, mode), factC || extraSentenceFor(entry, mode + 1)],
          [factB || factA, extraSentenceFor(entry, mode), factA],
        ]
        const sequence = sequences[mode]
        body.push(
          lead,
          rephraseSentence(sequence[0], mode, 0),
          rephraseSentence(sequence[1], mode + 1, 1),
          rephraseSentence(sequence[2], mode + 2, 2),
        )
      }
    } else {
      const second = mode === 1 ? rephraseSentence(factB || factA, mode + 1, 1) : rephraseSentence(factA, mode, 0)
      const thirdSource = mode === 1 ? factA : (factB || factC || factA)
      body.push(
        lead,
        second,
        rephraseSentence(thirdSource, mode + 2, 2),
      )
    }

    variants[variantIndex].text = joinSentences(body)
  }
}

function buildWitnessEntries() {
  const entries = []

  const witnessMap = {
    'tp-1': {
      vague: [
        '문정자입니다. 저는 집안 분위기와 입학 문제로 두 사람이 예민해져 있었다는 정도만 알고 있습니다.',
        '문정자입니다. 손주 입학 문제로 갈등이 깊어졌다는 건 알지만, 자료가 오간 장면을 직접 본 것은 아닙니다.',
        '문정자입니다. 부부 사이 긴장이 있었다는 사실은 알고 있으나, 누가 무엇을 보냈는지까지는 제 눈으로 확인하지 못했습니다.',
      ],
      partial: [
        '문정자입니다. 도윤이 입학 절차에 지나치게 매달려 있었다는 말은 여러 번 들었습니다. 다만 상담 기록이 밖으로 나간 경로 자체는 직접 본 적이 없습니다.',
        '문정자입니다. 희주씨 과거 상담 이야기가 집안에서 조심스럽게 오간 적은 있습니다. 그러나 그 자료를 학교 쪽에 넘기는 장면까지 본 것은 아닙니다.',
        '문정자입니다. 두 사람이 이 문제로 오래 신경전을 벌였다는 건 압니다. 다만 제 진술은 집안에서 들은 사정과 평소 분위기에 한정됩니다.',
      ],
      full: [
        '문정자입니다. 도윤이 손주 입학과 학교 대응에 과하게 몰입해 있던 건 사실입니다. 희주씨 상담 이야기도 집안에서 조심스럽게 언급된 적이 있습니다. 다만 제가 메일 발신이나 서류 전달 장면까지 직접 본 것은 아닙니다.',
        '문정자입니다. 저는 아들 쪽 이야기를 더 많이 들은 사람이라 편향이 있을 수 있습니다. 그래도 입학 문제 때문에 부부 갈등이 커졌고, 상담 기록이 예민한 소재였다는 점만은 분명히 말씀드릴 수 있습니다.',
        '문정자입니다. 집안에서 오간 대화를 보면 도윤이 학교 문제를 크게 받아들였던 것은 맞습니다. 희주씨 상담 기록이 다시 언급되면서 갈등이 커진 흐름도 알고 있습니다. 그러나 최종 유출 경로는 자료로 판단하셔야 합니다.',
      ],
    },
    'tp-2': {
      vague: [
        '백소라입니다. 저는 희주씨가 익명 글을 본 직후 크게 흔들렸다는 사실 정도만 알고 있습니다.',
        '백소라입니다. 병원 동료로서 희주씨 상태 변화를 가까이 봤지만, 메일 원본 자체를 처음부터 본 것은 아닙니다.',
        '백소라입니다. 그날 희주씨가 공포에 가까운 불안을 보였다는 점까지는 직접 말씀드릴 수 있습니다.',
      ],
      partial: [
        '백소라입니다. 희주씨는 익명 글을 본 뒤 자신의 과거가 다시 퍼질까 봐 매우 불안해했습니다. 그 불안 때문에 도윤씨 계정을 확인하려 했다는 설명도 직접 들었습니다.',
        '백소라입니다. 저는 희주씨가 병원 휴게실에서 익명 글 캡처를 보고 무너지는 모습을 봤습니다. 다만 계정에 실제로 어떻게 접속했는지 세부 과정까지 본 것은 아닙니다.',
        '백소라입니다. 희주씨가 먼저 말한 건 분노보다 공포였습니다. 그래서 메일을 본 행동도 공격보다는 자기 방어에 가깝게 느껴졌다는 점을 말씀드립니다.',
      ],
      full: [
        '백소라입니다. 익명 글을 확인한 직후 희주씨가 상담 기록이 다시 퍼질까 봐 극도로 불안해한 것은 제가 직접 봤습니다. 그 상태에서 도윤씨 계정을 확인했다고 설명한 것도 들었습니다. 다만 그 행동의 적법성 판단은 별개라고 생각합니다.',
        '백소라입니다. 저는 병원 동료로서 사건 직후 희주씨 반응을 가장 가까이 본 사람 중 하나입니다. 희주씨는 누가 자신을 겨냥했는지 확인해야 한다는 공포를 강하게 드러냈습니다. 그래서 메일 확인 행위의 동기가 두려움이었다는 점은 분명히 말씀드릴 수 있습니다.',
        '백소라입니다. 희주씨는 익명 글 이후 정상 근무가 어려울 만큼 흔들렸습니다. 당시 말의 요지는 누굴 공격하겠다는 것이 아니라 자신과 아이를 지켜야 한다는 불안이었습니다. 저는 그 정서적 맥락을 직접 들은 사람입니다.',
      ],
    },
    'tp-3': {
      vague: [
        '정해린입니다. 학교 기록으로 확인되는 행정 흐름이 있다는 점만 우선 말씀드리겠습니다.',
        '정해린입니다. 저는 학부모지원 담당으로서 제출 시각과 보류 사유 같은 기관 기록만 답할 수 있습니다.',
        '정해린입니다. 학교 서버와 내부 메모에 남은 사실관계까지만 확인해 말씀드리겠습니다.',
      ],
      partial: [
        '정해린입니다. 학교에는 익명 메일 수신 시각과 보호자 관련 문의 기록이 남아 있습니다. 따라서 메일과 행정 처리 순서는 기관 기록으로 구분해 말씀드릴 수 있습니다.',
        '정해린입니다. 저는 학교 서버 기록과 내부 메모를 통해 보류 사유를 확인했습니다. 다만 누가 어떤 감정으로 움직였는지까지는 기관이 판단할 수 없습니다.',
        '정해린입니다. 학교 쪽에서 확인 가능한 것은 발신 헤더, 첨부 해시, 파일 보류 시각입니다. 그 범위 안에서는 선후관계를 비교적 명확히 설명드릴 수 있습니다.',
      ],
      full: [
        '정해린입니다. 학교 서버 기록상 익명 메일 수신 시각과 파일 보류 시각은 서로 구분됩니다. 특히 파일 보류는 익명 메일 도착보다 먼저 발생했습니다. 따라서 보류 자체가 외부 제보 때문에 시작됐다고 보기는 어렵습니다.',
        '정해린입니다. 저는 학교 학부모지원 담당으로서 메일 헤더 회신, 보호자 연락처 관련 문의, 내부 보류 메모를 확인했습니다. 그 자료를 종합하면 일부 행정 보류는 메일 이전에 이미 진행되고 있었습니다. 이 부분은 기관 기록으로 설명 가능합니다.',
        '정해린입니다. 학교가 확보한 자료에는 발신 헤더 정보와 파일 처리 시각이 남아 있습니다. 그 기록을 대조하면 익명 메일과 입학 보류가 완전히 같은 사건은 아니었다는 점이 드러납니다. 저는 그 선후관계만 사실대로 말씀드리겠습니다.',
      ],
    },
  }

  for (const person of caseData.duo.socialGraph || []) {
    const payload = witnessMap[person.id]
    if (!payload) continue
    for (const depth of ['vague', 'partial', 'full']) {
      entries.push({
        key: `${person.id}|${depth}`,
        witnessId: person.id,
        depth,
        stanceHint: 'answer',
        truthLevel: depth === 'vague' ? 'hint' : depth,
        variants: payload[depth].map((text, index) => ({
          id: `${person.id}|${depth}#${index + 1}`,
          text,
          behaviorHint: [
            '말끝을 조심하며 확인된 범위만 답합니다.',
            '잠시 숨을 고른 뒤 문장을 천천히 정리합니다.',
            '단정은 피하지만 기억하는 부분은 분명히 답합니다.',
          ][index],
        })),
      })
    }
  }

  return entries
}

function setVariantText(channelName, key, variantId, text) {
  const entry = bundle.channels[channelName].entries.find((item) => item.key === key)
  if (!entry) return
  const variant = (entry.variants || []).find((item) => item.id === variantId)
  if (!variant) return
  variant.text = polishText(normalizePartnerParticles(text))
}

fs.copyFileSync(bundlePath, backupPath)

for (const channelName of ['interrogation', 'evidence_present', 'dossier']) {
  for (const entry of bundle.channels[channelName].entries) {
    const party = entry.party
    for (const [index, variant] of (entry.variants || []).entries()) {
      variant.text = replacePartnerReferences(variant.text, party)
      variant.text = normalizePartnerParticles(variant.text)
      variant.text = polishText(variant.text)
      if (channelName === 'interrogation') {
        variant.text = normalizeInterrogationLength(entry, variant)
      }
      if (channelName === 'evidence_present') {
        const evidence = evidenceById.get(entry.evidenceId)
        if (evidence) {
          variant.text = ensureEvidenceDirectReaction(variant.text, evidence, index)
        }
      }
    }
    if (channelName === 'interrogation') {
      diversifyInterrogationEntry(entry)
      for (const variant of entry.variants || []) {
        variant.text = normalizePartnerParticles(variant.text)
        variant.text = polishText(variant.text)
      }
    }
  }
}

bundle.channels.witness.entries = buildWitnessEntries()

setVariantText(
  'interrogation',
  'a|d-3|S5|fact_pursuit',
  'a|d-3|S5|fact_pursuit#2',
  '먼저 구조부터 말씀드리겠습니다. 문제는 캡처 한 장이 아니라 그 자료가 제 남편의 보조 이메일과 가정용 복합기 기록으로 이어진다는 점입니다. 그 연결이 확인된 이상 제 과거 기록이 학교에서 무기처럼 쓰였다는 사실도 피할 수 없습니다.',
)
setVariantText(
  'interrogation',
  'a|d-3|S5|motive_search',
  'a|d-3|S5|motive_search#2',
  '먼저 배경을 말씀드리겠습니다. 제가 이 문제를 놓지 못한 건 단순한 의심이 아니라, 보호라는 말 아래 제 상담 기록이 학교 판단 자료처럼 흘러간 흔적을 봤기 때문입니다. 그 명분은 결국 저를 약점으로 밀어 넣는 방식으로 작동했습니다.',
)
setVariantText(
  'interrogation',
  'a|d-3|S5|empathy_approach',
  'a|d-3|S5|empathy_approach#2',
  '먼저 남은 감정을 말씀드리겠습니다. 저에게 가장 잔인했던 건 익명 글 자체보다 제 기록이 제 남편 경로를 통해 학교에서 낙인처럼 돌았다는 사실입니다. 그래서 이 장면은 지금도 설명보다 상처로 먼저 남아 있습니다.',
)
setVariantText(
  'interrogation',
  'b|d-1|S4|empathy_approach',
  'b|d-1|S4|empathy_approach#2',
  '감정선을 빼면 이 장면이 설명되지 않습니다. 제 아내가 자기 기록이 남편 손에서 무기처럼 바뀌었다고 느낀다면 그 감정은 이해합니다. 그래서 제가 보호라고 불렀던 선택이 결국 노출과 낙인으로 남았다는 점도 인정합니다.',
)
setVariantText(
  'interrogation',
  'b|d-2|S3|fact_pursuit',
  'b|d-2|S3|fact_pursuit#2',
  '먼저 남는 흐름부터 말씀드리겠습니다. 제 아내가 익명 글 뒤에 제 메일과 출력 흔적을 확인한 건 사실입니다. 다만 그 불안을 키운 배경에 제가 먼저 상황을 숨긴 책임도 있다는 점은 같이 남습니다.',
)
setVariantText(
  'interrogation',
  'b|d-2|S4|fact_pursuit',
  'b|d-2|S4|fact_pursuit#2',
  '먼저 정리할 사실부터 말씀드리겠습니다. 제 아내는 제 메일과 프린터 기록을 확인한 뒤 연락망 배제 초안까지 작성했습니다. 발송은 없었지만, 그 공포를 키운 배경에 제 행동이 있었다는 점도 함께 봐야 합니다.',
)
setVariantText(
  'interrogation',
  'b|d-3|S5|fact_pursuit',
  'b|d-3|S5|fact_pursuit#2',
  '먼저 사실관계부터 말씀드리겠습니다. 학부모방 익명 글과 상담서 이미지 출처가 제 보조 이메일과 가정용 복합기 스캔 경로로 이어지는 건 사실입니다. 결국 저는 제 아내 기록을 학교에 흘리고도 그걸 외부 오해처럼 꾸민 셈입니다.',
)
setVariantText(
  'interrogation',
  'b|d-3|S5|motive_search',
  'b|d-3|S5|motive_search#2',
  '먼저 이유를 말씀드리겠습니다. 저는 아이 학교 문제를 제가 먼저 통제해야 한다는 강박에 붙들려 있었습니다. 그 강박이 제 아내 상담 기록을 보호 정보처럼 포장해 학교 쪽으로 밀어 넣는 선택으로 이어졌습니다.',
)
setVariantText(
  'interrogation',
  'b|d-3|S5|empathy_approach',
  'b|d-3|S5|empathy_approach#2',
  '먼저 제가 늦게 이해한 상처를 말씀드리겠습니다. 제 아내에게 가장 견디기 힘들었던 건 제가 익명 뒤에 숨어 과거 기록을 학교 판단 자료처럼 돌게 만들었다는 점이었을 겁니다. 그 상처는 아이 걱정이라는 말로도 덮을 수 없습니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|fact_pursuit',
  'a|d-5|S4|fact_pursuit#1',
  '사실관계부터 짚겠습니다. 익명 메일이 직접 사유라는 해석은 맞지 않습니다. 먼저 있었던 건 행정 보류였습니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|fact_pursuit',
  'a|d-5|S4|fact_pursuit#2',
  '먼저 정리할 건 보류의 출발점입니다. 익명 메일이 직접 사유라는 해석은 맞지 않습니다. 보류 시각이 더 앞섭니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|fact_pursuit',
  'a|d-5|S4|fact_pursuit#3',
  '핵심은 신고가 아니었습니다. 익명 메일을 바로 계기로 보는 해석은 맞지 않습니다. 먼저 작동한 것은 행정 절차였습니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|fact_pursuit',
  'a|d-5|S4|fact_pursuit#4',
  '기록 순서로 보면 분명합니다. 익명 메일을 바로 계기로 보는 해석은 맞지 않습니다. 행정 오류와 감정 반응은 따로 보셔야 합니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|fact_pursuit',
  'a|d-5|S4|fact_pursuit#5',
  '제가 확인한 건 행정 처리 흐름입니다. 익명 메일을 바로 계기로 보는 해석은 맞지 않습니다. 그래서 보류 시점과 해석을 나눠야 합니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|motive_search',
  'a|d-5|S4|motive_search#1',
  '왜 그렇게 읽었는지 말씀드리겠습니다. 익명 메일을 직접 사유로 몰아간 제 판단이 서둘렀습니다. 실제 출발점은 행정 오류였습니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|motive_search',
  'a|d-5|S4|motive_search#2',
  '제 불안이 먼저 앞섰습니다. 익명 메일을 직접 사유로 몰아간 제 판단이 서둘렀습니다. 신고와 보류는 같은 뜻이 아닙니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|motive_search',
  'a|d-5|S4|motive_search#3',
  '보류를 신고로 오해한 건 사실입니다. 익명 메일을 직접 사유로 몰아간 제 판단이 서둘렀습니다. 그 오해는 제가 바로잡아야 합니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|motive_search',
  'a|d-5|S4|motive_search#4',
  '급한 마음이 해석을 앞질렀습니다. 익명 메일을 직접 사유로 몰아간 제 판단이 서둘렀습니다. 감정이 절차를 대신할 수는 없습니다.',
)
setVariantText(
  'interrogation',
  'a|d-5|S4|motive_search',
  'a|d-5|S4|motive_search#5',
  '저도 처음에는 다르게 봤습니다. 익명 메일을 직접 사유로 몰아간 제 판단이 서둘렀습니다. 그래서 보류와 메일은 분리해서 봐야 합니다.',
)

setVariantText(
  'evidence_present',
  'a|e-3|mid|other',
  'a|e-3|mid|other#2',
  '입학 예정 학부모방 익명 글 캡처를 보면, 오리엔테이션 명단 공지 직후에 올라간 글이라는 점이 먼저 보입니다. 채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다.',
)
setVariantText(
  'evidence_present',
  'a|e-3|late|other',
  'a|e-3|late|other#2',
  '입학 예정 학부모방 익명 글 캡처를 보면, 채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다. 게시 시점도 명단 공지 직후로 이어집니다.',
)
setVariantText(
  'evidence_present',
  'a|e-6|mid|self',
  'a|e-6|mid|self#3',
  '관리사무소 정정서와 학교 파일 보류 메모는 누군가의 신고를 설명하는 자료가 아닙니다. 행정실이 먼저 파일을 멈춘 이유를 설명합니다.',
)
setVariantText(
  'evidence_present',
  'b|e-3|mid|self',
  'b|e-3|mid|self#2',
  '입학 예정 학부모방 익명 글 캡처를 보면, 오리엔테이션 명단 공지 직후에 올라간 글이라는 점이 먼저 보입니다. 채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다.',
)
setVariantText(
  'evidence_present',
  'b|e-3|late|self',
  'b|e-3|late|self#2',
  '입학 예정 학부모방 익명 글 캡처를 보면, 채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다. 게시 시점도 명단 공지 직후로 이어집니다.',
)
setVariantText(
  'evidence_present',
  'b|e-4|early|institutional',
  'b|e-4|early|institutional#5',
  '학교가 보관한 헤더 전문에는 발신 기록이 그대로 남아 있습니다. 복구 정보와 해시가 도윤 쪽으로 이어집니다.',
)
setVariantText(
  'evidence_present',
  'b|e-4|late|institutional',
  'b|e-4|late|institutional#3',
  '익명 메일처럼 보였던 경로가 헤더 전문에서 무너집니다. 발신 흔적은 도윤 쪽 정보로 이어집니다.',
)
bundle.generatedAt = new Date().toISOString()
bundle.notes = [
  'spouse-02 pass1 repair.',
  'Witness entries rewritten for formal style and sentence-count compliance.',
  'Judge-facing partner references normalized to toJudge terms.',
  'evidence_present entries adjusted to reference source evidence directly.',
]

fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2) + '\n', 'utf8')

console.log(JSON.stringify({
  repaired: 'spouse-02',
  backupPath,
  witnessEntries: bundle.channels.witness.entries.length,
}, null, 2))
