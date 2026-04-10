#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

function getArgs() {
  const args = process.argv.slice(2)
  const options = {
    caseId: 'spouse-01',
    threshold: 0.9,
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--case' && args[i + 1]) options.caseId = args[++i]
    else if (arg === '--threshold' && args[i + 1]) options.threshold = Number(args[++i])
  }

  return options
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

function splitSentences(text) {
  return (text.match(/[^.!?。\n]+[.!?。]?/gu) || [])
    .map((part) => part.trim())
    .filter(Boolean)
}

function toCharTrigrams(value) {
  const normalized = value.replace(/\s+/g, ' ').trim().toLowerCase()
  const set = new Set()
  for (let i = 0; i <= normalized.length - 3; i += 1) {
    const slice = normalized.slice(i, i + 3)
    if (slice.trim().length === 3) set.add(slice)
  }
  return set
}

function trigramSimilarity(a, b) {
  const setA = toCharTrigrams(a)
  const setB = toCharTrigrams(b)
  if (!setA.size || !setB.size) return 0
  let intersection = 0
  for (const item of setA) {
    if (setB.has(item)) intersection += 1
  }
  const union = new Set([...setA, ...setB]).size
  return union ? intersection / union : 0
}

function chooseOpener(ctx, variantIndex) {
  if (ctx.channel === 'interrogation') {
    if (ctx.questionType === 'fact_pursuit') {
      return [
        '핵심만 말씀드리면,',
        '먼저 사실관계부터 말씀드리면,',
        '그 부분만 놓고 보면,',
      ][variantIndex % 3]
    }
    if (ctx.questionType === 'motive_search') {
      return [
        '이유부터 말씀드리면,',
        '배경을 먼저 말씀드리면,',
        '그때 사정부터 말씀드리면,',
      ][variantIndex % 3]
    }
    return [
      '감정 쪽부터 말씀드리면,',
      '관계로 보면,',
      '상처가 남은 지점부터 말씀드리면,',
    ][variantIndex % 3]
  }

  if (ctx.channel === 'evidence_present') {
    return [
      '이 자료를 보고 드리는 말씀입니다.',
      '지금 보이는 흔적만 두고 말씀드리면,',
      '해당 자료를 마주한 이상,',
    ][variantIndex % 3]
  }

  if (ctx.channel === 'dossier') {
    return [
      '그 질문까지 오면 더 돌리기 어렵습니다.',
      '그 부분은 더 숨기기 어렵습니다.',
      '여기까지 나오면 피해 갈 수 없습니다.',
    ][variantIndex % 3]
  }

  if (ctx.channel === 'witness') {
    return [
      '제가 아는 범위만 분명히 말씀드리겠습니다.',
      '본 것과 들은 것만 나눠 말씀드리겠습니다.',
      '제가 확인한 범위에서는,',
    ][variantIndex % 3]
  }

  return ''
}

function applyPhraseRewrites(text) {
  return text
    .replace(/그 점만 떼어 놓고 단정하면 어긋납니다/g, '그 부분만 따로 떼어 단정하시면 결이 달라집니다')
    .replace(/집안 어른 돌봄 일정이 갑자기 비었습니다/g, '집안 어른 돌봄 쪽 일정이 갑자기 비는 바람이 있었습니다')
    .replace(/공동계좌에서 처리한 지출이 있었던 건 맞습니다/g, '공동계좌에서 지출이 나간 사실 자체는 부인하지 않겠습니다')
    .replace(/지금 숨길 말만 고르려는 건 아닙니다/g, '지금 말끝만 고르려는 뜻은 아닙니다')
    .replace(/이 자리에서 숨길 수 없는 건/g, '지금 와서 피할 수 없는 건')
    .replace(/말끝만 흐릴 수는 없습니다/g, '더는 얼버무릴 수 없습니다')
    .replace(/부인하지 않겠습니다/g, '이제는 부정하지 않겠습니다')
    .replace(/부터는 피하지 않겠습니다/g, '이 대목은 더 피하지 않겠습니다')
    .replace(/문서은/g, '문서는')
    .replace(/문서을/g, '문서를')
}

function diversifyText(text, ctx, variantIndex) {
  let sentences = splitSentences(text)
  if (sentences.length > 1) {
    sentences = sentences.reverse()
  }
  let transformed = applyPhraseRewrites(sentences.join(' '))
  const opener = chooseOpener(ctx, variantIndex)
  if (opener && !transformed.startsWith(opener)) {
    transformed = `${opener} ${transformed}`
  }
  return transformed.replace(/\s+/g, ' ').trim()
}

function processEntries(entries, ctxFactory, threshold) {
  let updated = 0
  for (const entry of entries) {
    for (let i = 0; i < entry.variants.length; i += 1) {
      for (let j = i + 1; j < entry.variants.length; j += 1) {
        const a = entry.variants[i].text
        const b = entry.variants[j].text
        if (trigramSimilarity(a, b) >= threshold) {
          entry.variants[j].text = diversifyText(
            entry.variants[j].text,
            ctxFactory(entry),
            j,
          )
          updated += 1
        }
      }
    }
  }
  return updated
}

function main() {
  const { caseId, threshold } = getArgs()
  const filePath = path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)
  const bundle = readJson(filePath)

  let updated = 0
  updated += processEntries(bundle.channels.interrogation.entries, (entry) => ({
    channel: 'interrogation',
    questionType: entry.questionType,
  }), threshold)
  updated += processEntries(bundle.channels.evidence_present.entries, () => ({
    channel: 'evidence_present',
  }), threshold)
  updated += processEntries(bundle.channels.dossier.entries, () => ({
    channel: 'dossier',
  }), threshold)
  updated += processEntries(bundle.channels.witness.entries, () => ({
    channel: 'witness',
  }), threshold)

  writeJson(filePath, bundle)
  console.log(`[reduce-scripted-text-d2] case=${caseId}`)
  console.log(`[reduce-scripted-text-d2] threshold=${threshold}`)
  console.log(`[reduce-scripted-text-d2] updated=${updated}`)
}

main()
