#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function findFileRecursiveByName(dir, targetName) {
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      const nested = findFileRecursiveByName(fullPath, targetName)
      if (nested) return nested
    } else if (name === targetName) {
      return fullPath
    }
  }
  return null
}

function cleanSentence(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '')
    .trim()
}

function sentence(text) {
  const cleaned = cleanSentence(text)
  return cleaned ? `${cleaned}.` : ''
}

function paragraph(parts) {
  return parts.map(sentence).filter(Boolean).join(' ')
}

function hasJongseong(text) {
  const value = cleanSentence(text)
  const last = value.charCodeAt(value.length - 1)
  if (!value || last < 0xac00 || last > 0xd7a3) return false
  return (last - 0xac00) % 28 !== 0
}

function topic(text) {
  return `${cleanSentence(text)}${hasJongseong(text) ? '은' : '는'}`
}

function object(text) {
  return `${cleanSentence(text)}${hasJongseong(text) ? '을' : '를'}`
}

function truthLevelFromState(state) {
  if (state === 'S0') return 'none'
  if (state === 'S1') return 'hint'
  if (state === 'S5') return 'full'
  return 'partial'
}

function stanceFromState(state) {
  if (state === 'S0') return 'deny'
  if (state === 'S1') return 'hedge'
  if (state === 'S2') return 'partial'
  if (state === 'S3') return 'blame'
  if (state === 'S4') return 'emotional'
  return 'confess'
}

function deriveSubjectRole(evidence, party) {
  const subjectParty = evidence.subjectParty || 'both'
  if (subjectParty === party) return 'self'
  if (subjectParty === 'both') return evidence.provenance === 'institutional' ? 'institutional' : 'both'
  return evidence.provenance === 'institutional' ? 'institutional' : 'other'
}

module.exports = {
  readJson,
  ensureDir,
  findFileRecursiveByName,
  cleanSentence,
  sentence,
  paragraph,
  hasJongseong,
  topic,
  object,
  truthLevelFromState,
  stanceFromState,
  deriveSubjectRole,
}
