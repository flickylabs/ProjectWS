#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const GENERIC_WORDS = new Set(['자료', '기록', '문서', '증거', '비교', '원본', '업로드본', '장면', '정황', '맥락', '사실', '질문'])

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function parseCaseId(argv) {
  const argCase = argv.find((item) => item.startsWith('--case='))
  if (argCase) return argCase.slice('--case='.length)
  const idx = argv.indexOf('--case')
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return argv[0] || null
}

function issue(severity, code, message) {
  return { severity, code, message }
}

function summarize(issues) {
  return issues.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1
    return acc
  }, {})
}

function splitSentences(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter(Boolean)
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toTrigrams(text) {
  const normalized = normalizeText(text).toLowerCase()
  const grams = new Set()
  for (let i = 0; i <= normalized.length - 3; i += 1) {
    const gram = normalized.slice(i, i + 3)
    if (gram.trim().length === 3) grams.add(gram)
  }
  return grams
}

function trigramSimilarity(a, b) {
  const setA = toTrigrams(a)
  const setB = toTrigrams(b)
  if (!setA.size || !setB.size) return 0
  let intersection = 0
  for (const item of setA) {
    if (setB.has(item)) intersection += 1
  }
  const union = new Set([...setA, ...setB]).size
  return union ? intersection / union : 0
}

function evidenceKeywords(evidence) {
  const raw = `${evidence?.name || ''} ${evidence?.description || ''}`
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !GENERIC_WORDS.has(token))
  return [...new Set(raw)].slice(0, 6)
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text))
}

function validate(bundle, runtimeCase) {
  const issues = []
  const evidenceMap = new Map((runtimeCase?.evidence || []).map((item) => [item.id, item]))

  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      const variants = entry.variants || []
      const texts = variants.map((variant) => normalizeText(variant.text))
      if (texts.length >= 2) {
        let pairCount = 0
        let similarityTotal = 0
        for (let i = 0; i < texts.length; i += 1) {
          for (let j = i + 1; j < texts.length; j += 1) {
            pairCount += 1
            similarityTotal += trigramSimilarity(texts[i], texts[j])
          }
        }
        const averageSimilarity = pairCount ? similarityTotal / pairCount : 0
        if (averageSimilarity >= 0.78) {
          issues.push(issue('WARN', 'SQ1', `${channel}:${entry.key} variants too similar (${averageSimilarity.toFixed(2)})`))
        }

        const firstSentences = texts.map((text) => splitSentences(text)[0] || '')
        if (firstSentences.length >= 3 && new Set(firstSentences).size === 1) {
          issues.push(issue('WARN', 'SQ2', `${channel}:${entry.key} variants share the same first sentence`))
        }
      }

      for (const variant of variants) {
        const label = `${channel}:${variant.id}`
        const text = normalizeText(variant.text)

        if (['interrogation', 'evidence_present', 'dossier'].includes(channel) && !text.includes('재판관님')) {
          issues.push(issue('WARN', 'SQ3', `${label} is judge-facing but does not explicitly address the judge`))
        }

        if (['aftermath', 'system_message'].includes(channel) && text.includes('재판관님')) {
          issues.push(issue('WARN', 'SQ4', `${label} should not directly address the judge`))
        }

        if (channel === 'interrogation') {
          if (entry.lieState === 'S5' && !hasAny(text, [/인정/, /잘못/, /숨기지/, /사실대로/, /책임/, /부정하지/])) {
            issues.push(issue('WARN', 'SQ5', `${label} is S5 but lacks a clear confession/responsibility cue`))
          }
          if ((entry.lieState === 'S0' || entry.lieState === 'S1') && hasAny(text, [/전부 인정/, /모든 책임/, /제가 잘못/, /숨기지 않겠습니다/])) {
            issues.push(issue('WARN', 'SQ6', `${label} is early lie-state but sounds too collapsed`))
          }
        }

        if (channel === 'witness') {
          if (entry.depth === 'vague' && !hasAny(text, [/기억/, /대략/, /정확/, /다시/, /순서/])) {
            issues.push(issue('WARN', 'SQ7', `${label} is vague witness depth but lacks memory-limit language`))
          }
          if (entry.depth === 'full' && splitSentences(text).length < 2) {
            issues.push(issue('WARN', 'SQ8', `${label} is full witness depth but remains too short`))
          }
        }

        if (channel === 'evidence_present') {
          const evidence = evidenceMap.get(entry.evidenceId)
          const keywords = evidenceKeywords(evidence)
          if (keywords.length > 0 && !keywords.some((keyword) => text.includes(keyword))) {
            issues.push(issue('WARN', 'SQ9', `${label} does not mention any evidence-specific keyword`))
          }
        }
      }
    }
  }

  return issues
}

function main() {
  const caseId = parseCaseId(process.argv.slice(2))
  if (!caseId) {
    console.error('missing caseId. usage: node scripts/validate-scripted-semantic-heuristics.cjs --case headline-01')
    process.exit(1)
  }

  const bundle = readJson(path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`))
  const runtimeCase = readJson(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`))
  const issues = validate(bundle, runtimeCase)
  const summary = summarize(issues)

  console.log(`[scripted-semantic-heuristics] case=${caseId}`)
  for (const current of issues) {
    console.log(`${current.severity} ${current.code} ${current.message}`)
  }
  console.log(`summary=${JSON.stringify(summary)}`)
  console.log(summary.FAIL ? 'FAIL' : 'PASS')
  process.exit(summary.FAIL ? 1 : 0)
}

if (require.main === module) {
  main()
}

module.exports = {
  validateScriptedSemanticHeuristics: validate,
}
