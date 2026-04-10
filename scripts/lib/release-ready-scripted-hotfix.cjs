const fs = require('fs')
const path = require('path')

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function lastHangulChar(term) {
  const cleaned = clean(term).replace(/[)\]'"`]+$/g, '')
  if (!cleaned) return ''
  return cleaned[cleaned.length - 1]
}

function hasBatchim(term) {
  const ch = lastHangulChar(term)
  if (!ch) return false
  const code = ch.charCodeAt(0)
  if (code < 0xac00 || code > 0xd7a3) return false
  return ((code - 0xac00) % 28) !== 0
}

function selectParticle(term, pair) {
  switch (pair) {
    case 'topic':
      return hasBatchim(term) ? '은' : '는'
    case 'subject':
      return hasBatchim(term) ? '이' : '가'
    case 'object':
      return hasBatchim(term) ? '을' : '를'
    case 'with':
      return hasBatchim(term) ? '과' : '와'
    default:
      return ''
  }
}

function getFallbackCounterpartyRef(runtimeCase, party) {
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || ''
  const map = {
    spouse: { a: '제 아내', b: '제 남편' },
    family: { a: '가족', b: '가족' },
    friend: { a: '제 친구', b: '제 친구' },
    neighbor: { a: '옆집 분', b: '옆집 분' },
    partnership: { a: '제 동업자', b: '제 동업자' },
    tenant: { a: '집주인', b: '세입자' },
    workplace: { a: '제 팀원', b: '제 팀장' },
    headline: { a: '그 업주', b: '그 리뷰어' },
    online: { a: '상대방', b: '상대방' },
    civic: { a: '상대방', b: '상대방' },
    professional: { a: '상대방', b: '상대방' },
  }
  return map[relationshipType]?.[party] || '상대방'
}

function getCounterpartyRef(runtimeCase, entry) {
  if (entry.party === 'a') {
    return clean(runtimeCase?.duo?.partyA?.callTerms?.toJudge || getFallbackCounterpartyRef(runtimeCase, 'a'))
  }
  if (entry.party === 'b') {
    return clean(runtimeCase?.duo?.partyB?.callTerms?.toJudge || getFallbackCounterpartyRef(runtimeCase, 'b'))
  }
  return '상대방'
}

function collectReplacementTerms(runtimeCase, entry) {
  const terms = new Set(['A측', 'B측'])
  for (const party of [runtimeCase?.duo?.partyA, runtimeCase?.duo?.partyB]) {
    for (const value of [
      party?.name,
      party?.callTerms?.toJudge,
      party?.callTerms?.toPartner,
      party?.callTerms?.angry,
    ]) {
      const cleaned = clean(value)
      if (cleaned && cleaned.length <= 40) terms.add(cleaned)
    }
  }
  for (const dispute of runtimeCase?.disputes || []) {
    const cleaned = clean(dispute?.name)
    if (cleaned && cleaned.length <= 60) terms.add(cleaned)
  }
  for (const evidence of runtimeCase?.evidence || []) {
    for (const value of [evidence?.name, evidence?.surfaceName]) {
      const cleaned = clean(value)
      if (cleaned && cleaned.length <= 60) terms.add(cleaned)
    }
  }
  return [...terms].filter(Boolean)
}

function replaceGenericSideRefs(text, runtimeCase, entry) {
  let next = clean(text)
  const aRef = clean(runtimeCase?.duo?.partyA?.callTerms?.toJudge || getFallbackCounterpartyRef(runtimeCase, 'a'))
  const bRef = clean(runtimeCase?.duo?.partyB?.callTerms?.toJudge || getFallbackCounterpartyRef(runtimeCase, 'b'))
  const replaceRef = (token, ref) => {
    if (!ref || ref === token) return
    next = next.replace(new RegExp(`${escapeRegex(token)}과에는`, 'gu'), `${ref}에는`)
    next = next.replace(new RegExp(`${escapeRegex(token)}와에는`, 'gu'), `${ref}에는`)
    next = next.replace(new RegExp(`${escapeRegex(token)}${selectParticle(token, 'topic')}`, 'gu'), `${ref}${selectParticle(ref, 'topic')}`)
    next = next.replace(new RegExp(`${escapeRegex(token)}${selectParticle(token, 'subject')}`, 'gu'), `${ref}${selectParticle(ref, 'subject')}`)
    next = next.replace(new RegExp(`${escapeRegex(token)}${selectParticle(token, 'object')}`, 'gu'), `${ref}${selectParticle(ref, 'object')}`)
    next = next.replace(new RegExp(`${escapeRegex(token)}${selectParticle(token, 'with')}`, 'gu'), `${ref}${selectParticle(ref, 'with')}`)
    next = next.replace(new RegExp(`${escapeRegex(token)}의`, 'gu'), `${ref}의`)
    next = next.replace(new RegExp(escapeRegex(token), 'gu'), ref)
  }
  replaceRef('A측', aRef)
  replaceRef('B측', bRef)
  return next
}

function fixParticles(text, runtimeCase, entry) {
  let next = clean(text)
  const terms = collectReplacementTerms(runtimeCase, entry)
  for (const term of terms) {
    const esc = escapeRegex(term)
    next = next.replace(new RegExp(`${esc}과에는`, 'gu'), `${term}에는`)
    next = next.replace(new RegExp(`${esc}와에는`, 'gu'), `${term}에는`)
    next = next.replace(new RegExp(`${esc}(은|는)`, 'gu'), `${term}${selectParticle(term, 'topic')}`)
    next = next.replace(new RegExp(`${esc}(이|가)`, 'gu'), `${term}${selectParticle(term, 'subject')}`)
    next = next.replace(new RegExp(`${esc}(을|를)`, 'gu'), `${term}${selectParticle(term, 'object')}`)
    next = next.replace(new RegExp(`${esc}(과|와)`, 'gu'), `${term}${selectParticle(term, 'with')}`)
  }
  return next
}

function fixSingleWordParticles(text) {
  let next = clean(text)
  next = next.replace(/([가-힣A-Za-z0-9·]{1,24})(은|는)/gu, (_, term) => `${term}${selectParticle(term, 'topic')}`)
  next = next.replace(/([가-힣A-Za-z0-9·]{1,24})(이|가)/gu, (_, term) => `${term}${selectParticle(term, 'subject')}`)
  next = next.replace(/([가-힣A-Za-z0-9·]{1,24})(을|를)/gu, (_, term) => `${term}${selectParticle(term, 'object')}`)
  next = next.replace(/([가-힣A-Za-z0-9·]{1,24})(과|와)/gu, (_, term) => `${term}${selectParticle(term, 'with')}`)
  return next
}

function softenScaffoldPhrases(text) {
  return clean(text)
    .replace(/한 줄로 엮어야 판단이 맞습니다/gu, '같이 봐야 판단이 맞습니다')
    .replace(/한 줄로 엮어야/gu, '같이 봐야')
    .replace(/표면만 보면/gu, '겉으로만 보면')
    .replace(/실제 순서가 보입니다/gu, '실제 순서가 드러납니다')
    .replace(/바로 뒷받침합니다/gu, '바로 보여 줍니다')
    .replace(/결과 문장으로만 접으면/gu, '결과만 떼어 놓고 보면')
    .replace(/같은 시간선에 놓아야/gu, '같은 시간선에 놓고 봐야')
    .replace(/자체는 남아 있습니다/gu, '자체는 분명히 남아 있습니다')
    .replace(/붙여야 정확합니다/gu, '함께 봐야 정확합니다')
    .replace(/분리해서 봐야 합니다/gu, '따로 보셔야 합니다')
    .replace(/기록과 경위, 책임 범위를 나눠 보셔야 합니다/gu, '기록과 책임 범위를 차례대로 보셔야 합니다')
}

function fixCompoundGrammar(text) {
  return clean(text)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})과에는/gu, (_, term) => `${clean(term)}에는`)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})와에는/gu, (_, term) => `${clean(term)}에는`)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})과가/gu, (_, term) => `${clean(term)}${selectParticle(term, 'subject')}`)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})와가/gu, (_, term) => `${clean(term)}${selectParticle(term, 'subject')}`)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})과를/gu, (_, term) => `${clean(term)}${selectParticle(term, 'object')}`)
    .replace(/([가-힣A-Za-z0-9· ]{2,40})와를/gu, (_, term) => `${clean(term)}${selectParticle(term, 'object')}`)
    .replace(/드러난다가 남아 있어서/gu, '드러난다는 점이 남아 있어서')
    .replace(/주장가 남아 있어서/gu, '주장이 남아 있어서')
    .replace(/있었다가 남아 있어서/gu, '있었다는 기록이 남아 있어서')
    .replace(/([가-힣0-9][^,.!?]{0,80}?다)를 바로 보여 줍니다/gu, '$1는 점을 바로 보여 줍니다')
    .replace(/([가-힣0-9][^,.!?]{0,80}?다)가 남아 있어서/gu, '$1는 점이 남아 있어서')
    .replace(/,\s*기록과 경위, 책임 범위를 나눠 보셔야 합니다\./gu, '. 기록과 경위, 책임 범위를 나눠 보셔야 합니다.')
}

function fixVariantText(text, runtimeCase, entry) {
  let next = clean(text)
  next = replaceGenericSideRefs(next, runtimeCase, entry)
  next = fixParticles(next, runtimeCase, entry)
  next = fixSingleWordParticles(next)
  next = softenScaffoldPhrases(next)
  next = fixCompoundGrammar(next)
  next = next.replace(/\s+\./gu, '.').replace(/\s+,/gu, ',')
  return next
}

function walkVariants(bundle, callback) {
  const channels = bundle?.channels || {}
  for (const [channelName, channelPayload] of Object.entries(channels)) {
    const entries = Array.isArray(channelPayload?.entries) ? channelPayload.entries : []
    for (const entry of entries) {
      const variants = Array.isArray(entry?.variants) ? entry.variants : []
      for (const variant of variants) {
        callback({ channelName, entry, variant })
      }
    }
  }
}

function applyReleaseReadyScriptedHotfix({ bundle, runtimeCase }) {
  walkVariants(bundle, ({ channelName, entry, variant }) => {
    if (!variant?.text) return
    if (!['interrogation', 'evidence_present', 'dossier', 'witness', 'aftermath', 'system_message'].includes(channelName)) return
    variant.text = fixVariantText(variant.text, runtimeCase, entry)
  })
  return bundle
}

module.exports = {
  applyReleaseReadyScriptedHotfix,
}
