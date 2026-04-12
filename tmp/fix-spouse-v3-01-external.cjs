#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SOURCE_PATH = path.join(__dirname, 'spouse-v3-01.external.backup.json')
const TARGET_PATH = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'external', 'spouse-v3-01.json')

const LOOSE_AMOUNT_RE = /\d[\d,.]*\s*(?:천|백|십)?만?\s*원/u
const STANDALONE_AMOUNT_RE = /(?<![가-힣A-Za-z0-9])(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+(?:\s*(?:천|백|십|만))?\s*원)(?![가-힣A-Za-z0-9])/u

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function splitSentences(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
}

function expectedRange(entry) {
  if (entry.lieState === 'S5') return { min: 3, max: 4 }

  const stance = entry.stanceHint || 'answer'
  if (stance === 'deny' || stance === 'hedge') return { min: 1, max: 2 }
  if (stance === 'partial' || stance === 'blame' || stance === 'emotional' || stance === 'confess') {
    return { min: 2, max: 3 }
  }
  return { min: 1, max: 3 }
}

function normalizeSentence(sentence) {
  let text = String(sentence || '').trim()
  text = text.replace(/\s+/g, ' ')
  text = text.replace(/못 보겠더군요/g, '바로 마주하기 어려웠습니다')
  text = text.replace(/못 보겠어요/g, '바로 마주하기 어렵습니다')
  text = text.replace(/있은지/g, '있었는지')
  text = text.replace(/보가니/g, '보니')
  text = text.replace(/보가게/g, '보이게')
  text = text.replace(/망이뜨렸습니다/g, '망가뜨렸습니다')
  if (!/[.!?]$/.test(text)) text += '.'
  return text
}

function replaceTag(tags, prefix, value) {
  if (!Array.isArray(tags)) return tags
  const next = tags.filter((tag) => !String(tag).startsWith(prefix))
  next.push(`${prefix}${value}`)
  return next
}

function splitClauseStyleSentence(text) {
  return splitSentences(
    String(text || '')
      .replace(/(습니다|입니다|었습니다|였습니다|합니다),\s*/g, '$1. ')
  ).map(normalizeSentence)
}

function chooseIndexes(sentences, max) {
  const last = sentences.length - 1
  const amountIdx = sentences.findIndex((sentence) => STANDALONE_AMOUNT_RE.test(sentence))
  const picked = []

  const add = (index) => {
    if (index >= 0 && index < sentences.length && !picked.includes(index)) picked.push(index)
  }

  add(0)
  if (amountIdx > 0 && amountIdx < last) add(amountIdx)
  for (let i = 1; i < last && picked.length < Math.max(1, max - 1); i += 1) add(i)
  add(last)
  for (let i = last - 1; i > 0 && picked.length < max; i -= 1) add(i)

  picked.sort((a, b) => a - b)
  while (picked.length > max) {
    const removable = picked.findIndex((index) => index !== 0 && index !== last && index !== amountIdx)
    if (removable >= 0) {
      picked.splice(removable, 1)
      continue
    }
    picked.splice(picked.length - 2, 1)
  }

  return picked
}

function needsStandaloneAmount(entry) {
  return ['d-2', 'h-d3', 'h-d4'].includes(entry.disputeId) && entry.lieState === 'S5'
}

function amountSentenceFor(entry) {
  const map = {
    'd-2': {
      a: '문제가 된 금액은 "3,000만 원"입니다.',
      b: '제가 옮긴 금액은 "3,000만 원"입니다.',
    },
    'h-d3': {
      a: '제가 따로 보낸 금액은 "2,000만 원"입니다.',
      b: '제 아내가 먼저 움직인 금액은 "2,000만 원"입니다.',
    },
    'h-d4': {
      a: '이 쟁점에서 문제 된 합계는 "5,000만 원"입니다.',
      b: '이 쟁점에서 문제 된 합계는 "5,000만 원"입니다.',
    },
  }

  return map[entry.disputeId]?.[entry.party] || '문제가 된 금액은 0원입니다.'
}

function genericSupplement(entry) {
  if (entry.party === 'a') {
    if (entry.disputeId === 'd-1') return '그 오해가 더 커진 이유에 제 반응도 있었다는 점은 인정합니다.'
    if (entry.disputeId === 'd-2') return '그 결정이 제 신뢰를 크게 무너뜨렸다는 점은 분명합니다.'
    if (entry.disputeId === 'h-d3') return '그 선택이 결국 제 책임으로 남는다는 점도 알고 있습니다.'
    if (entry.disputeId === 'h-d4') return '감정과 실행 책임을 따로 봐야 한다는 점도 알고 있습니다.'
    return '그 과정에서 상처만 더 키웠다는 점은 인정합니다.'
  }

  if (entry.disputeId === 'd-1') return '제가 먼저 설명하지 않은 책임은 피하지 않겠습니다.'
  if (entry.disputeId === 'd-2') return '제가 공동 돈의 선을 넘었다는 점은 부인하지 않겠습니다.'
  if (entry.disputeId === 'h-d3') return '제 아내가 왜 그렇게까지 불안해졌는지도 이제는 압니다.'
  if (entry.disputeId === 'h-d4') return '그 첫 침묵이 신뢰를 먼저 갈랐다는 점은 인정합니다.'
  return '그 침묵이 더 큰 오해를 만들었다는 점은 인정합니다.'
}

const GARBLED_VARIANTS = {
  'a-h-d3-S1-fact-pursuit-v3': '재판관님, 마음이 먼저 흔들린 건 맞습니다. 다만 그때 바로 실행까지 한 것은 아니라는 점은 말씀드리고 싶습니다.',
  'b-d-1-S1-empathy-approach-v3': '재판관님, 형 얘기를 꺼내면 더 크게 부딪힐까 봐 겁이 났습니다. 그래서 설명보다 침묵을 먼저 택했습니다.',
  'b-h-d4-S1-empathy-approach-v1': '재판관님, 처음 숨긴 쪽이 제 쪽이었다는 점은 부인하지 않겠습니다. 다만 그때는 여기까지 무너질 줄은 몰랐습니다.',
}

function fixEvidenceKeys(bundle) {
  for (const entry of bundle.channels.evidence_present.entries || []) {
    const role = entry.subjectRole || 'both'
    entry.key = [entry.party, entry.evidenceId, entry.lieBand, role].join('|')
  }
}

function evidenceRange(entry) {
  if (entry.lieBand === 'mid') return { min: 2, max: 3 }
  if (entry.lieBand === 'late') return { min: 2, max: 3 }
  return { min: 1, max: 2 }
}

function evidenceSupplement(entry) {
  if (entry.lieBand === 'late') {
    return entry.party === 'a'
      ? '그래도 저를 빼고 움직인 상처는 남아 있습니다.'
      : '그 기록이 남긴 책임까지 부정하지는 않겠습니다.'
  }

  return entry.party === 'a'
    ? '그래서 저는 그 설명을 바로 믿기 어려웠습니다.'
    : '그래도 그 기록이 남긴 책임은 분명히 남습니다.'
}

function fixEvidencePhrasing(bundle) {
  for (const entry of bundle.channels.evidence_present.entries || []) {
    const range = evidenceRange(entry)

    for (const variant of entry.variants || []) {
      let sentences = splitClauseStyleSentence(variant.text || '')

      while (sentences.length < range.min) {
        sentences.push(normalizeSentence(evidenceSupplement(entry)))
      }

      if (sentences.length > range.max) {
        const indexes = chooseIndexes(sentences, range.max)
        sentences = indexes.map((index) => sentences[index])
      }

      variant.text = sentences.join(' ')
    }
  }
}

function fixDossierBands(bundle) {
  const sequence = [
    { lieBand: 'early', stanceHint: 'hedge', truthLevel: 'hint', stanceTag: 'hedge', emotion: 'guarded', continuity: 'surface', reveal: 'hint', revealGuard: 'strict', disclosure: 'guarded' },
    { lieBand: 'mid', stanceHint: 'partial', truthLevel: 'partial', stanceTag: 'partial', emotion: 'defensive', continuity: 'pressure', reveal: 'partial', revealGuard: 'buffered', disclosure: 'limited' },
    { lieBand: 'late', stanceHint: 'confess', truthLevel: 'full', stanceTag: 'confess', emotion: 'resigned', continuity: 'collapse', reveal: 'full', revealGuard: 'open', disclosure: 'open' },
  ]

  const seen = new Map()
  for (const entry of bundle.channels.dossier.entries || []) {
    const count = seen.get(entry.dossierQuestionId) || 0
    const meta = sequence[Math.min(count, sequence.length - 1)]
    seen.set(entry.dossierQuestionId, count + 1)

    entry.lieBand = meta.lieBand
    entry.stanceHint = meta.stanceHint
    entry.truthLevel = meta.truthLevel
    entry.key = [entry.party, entry.dossierQuestionId, entry.lieBand].join('|')

    for (const variant of entry.variants || []) {
      if (!Array.isArray(variant.tags)) continue
      variant.tags = replaceTag(variant.tags, 'stance:', meta.stanceTag)
      variant.tags = replaceTag(variant.tags, 'emotion:', meta.emotion)
      variant.tags = replaceTag(variant.tags, 'continuity:', meta.continuity)
      variant.tags = replaceTag(variant.tags, 'reveal:', meta.reveal)
      variant.tags = replaceTag(variant.tags, 'revealGuard:', meta.revealGuard)
      variant.tags = replaceTag(variant.tags, 'disclosure:', meta.disclosure)
    }
  }

  bundle.coverage.dossier.lieBands = ['early', 'mid', 'late']
}

function fixInterrogation(bundle) {
  for (const entry of bundle.channels.interrogation.entries || []) {
    const range = expectedRange(entry)

    for (const variant of entry.variants || []) {
      let text = GARBLED_VARIANTS[variant.id] || String(variant.text || '')
      let sentences = splitSentences(text).map(normalizeSentence)

      if (needsStandaloneAmount(entry) && !STANDALONE_AMOUNT_RE.test(sentences.join(' '))) {
        const amountSentence = normalizeSentence(amountSentenceFor(entry))
        const amountLikeIndex = sentences.findIndex((sentence) => LOOSE_AMOUNT_RE.test(sentence))
        if (amountLikeIndex >= 0) {
          sentences[amountLikeIndex] = amountSentence
        } else if (sentences.length < range.max) {
          sentences.push(amountSentence)
        } else {
          sentences[sentences.length - 1] = amountSentence
        }
      }

      while (sentences.length < range.min) {
        sentences.push(normalizeSentence(genericSupplement(entry)))
      }

      if (sentences.length > range.max) {
        const indexes = chooseIndexes(sentences, range.max)
        sentences = indexes.map((index) => sentences[index])
      }

      if (needsStandaloneAmount(entry) && !STANDALONE_AMOUNT_RE.test(sentences.join(' '))) {
        const amountSentence = normalizeSentence(amountSentenceFor(entry))
        if (sentences.length < range.max) {
          sentences.push(amountSentence)
        } else {
          sentences[sentences.length - 1] = amountSentence
        }
      }

      while (sentences.length < range.min) {
        sentences.push(normalizeSentence(genericSupplement(entry)))
      }

      if (sentences.length > range.max) {
        const indexes = chooseIndexes(sentences, range.max)
        sentences = indexes.map((index) => sentences[index])
      }

      if (sentences[0] && !sentences[0].startsWith('재판관님,')) {
        sentences[0] = `재판관님, ${sentences[0].replace(/^재판관님,\s*/, '')}`
      }

      variant.text = sentences.join(' ')
    }
  }
}

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    throw new Error(`missing source backup: ${SOURCE_PATH}`)
  }

  const bundle = loadJson(SOURCE_PATH)
  fixEvidenceKeys(bundle)
  fixEvidencePhrasing(bundle)
  fixDossierBands(bundle)
  fixInterrogation(bundle)
  writeJson(TARGET_PATH, bundle)
  console.log(`wrote ${TARGET_PATH}`)
}

main()
