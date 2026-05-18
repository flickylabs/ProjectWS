#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const BASE_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const DEFAULT_MATRIX = path.join(BASE_DIR, 'truth-leak-matrix.json')
const DEFAULT_OUT = path.join(BASE_DIR, 'truth-leak-report.json')
const LOCALES = ['ko', 'en', 'ja', 'zh-CN']

const CASE_FILE_SPECS = [
  {
    source: 'src/data/scriptedAngles',
    fileBase: (caseId) => `${caseId}_judge_questions`,
    channels: ['judge_question', 'judgeQuestions'],
  },
  {
    source: 'src/data/scriptedAngles',
    fileBase: (caseId) => `${caseId}_angle_catalog`,
    channels: ['judge', 'system', 'mediation', 'aftermath'],
  },
  {
    source: 'src/data/scriptedText',
    fileBase: (caseId) => caseId,
    channels: ['judge', 'system', 'mediation', 'aftermath', 'judge_question', 'judge_evidence_combo'],
  },
  {
    source: 'src/data/dialogues/mediation',
    fileBase: (caseId) => `${caseId.split('-')[0]}-v3-01`,
    channels: ['judge', 'system', 'mediation', 'aftermath'],
  },
  {
    source: 'src/data/dialogues/phase1',
    fileBase: (caseId) => caseId,
    channels: ['judge', 'system', 'mediation', 'aftermath'],
  },
]

main()

function main() {
  const args = parseArgs(process.argv.slice(2))
  const matrixPath = path.resolve(ROOT, args.matrix ?? DEFAULT_MATRIX)
  const output = path.resolve(ROOT, args.out ?? DEFAULT_OUT)
  const dataRoot = args.dataRoot ? path.resolve(ROOT, args.dataRoot) : ROOT

  if (!fs.existsSync(matrixPath)) {
    throw new Error(`Missing truth-leak matrix: ${rel(matrixPath)}`)
  }

  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'))
  validateMatrix(matrix)

  const filteredMatrix = args.case ? filterMatrixByCase(matrix, args.case) : matrix
  const findings = detectTruthLeak(filteredMatrix, { dataRoot })
  const report = buildReport(findings, {
    matrix: rel(matrixPath),
    dataRoot: dataRoot === ROOT ? '' : rel(dataRoot),
  })

  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8')
  printSummary(report, output)

  if (args.strict && report.summary.total > 0) {
    process.exitCode = 1
  }
}

function detectTruthLeak(matrix, options) {
  const findings = []
  const seen = new Set()

  for (const caseId of Object.keys(matrix)) {
    for (const lang of LOCALES) {
      const files = getCaseFiles(caseId, lang, options.dataRoot)
      for (const fileInfo of files) {
        const data = JSON.parse(fs.readFileSync(fileInfo.file, 'utf8'))
        const strings = extractStringsFromChannels(data, fileInfo.channels)
        for (const { key, text } of strings) {
          for (const disputeId of Object.keys(matrix[caseId])) {
            const hiddenKeywords = matrix[caseId][disputeId].hidden[lang] || []
            for (const keyword of hiddenKeywords) {
              if (!keyword || !containsKeyword(text, keyword, lang)) continue
              const fingerprint = `${caseId}\0${disputeId}\0${lang}\0${fileInfo.file}\0${key}\0${keyword}`
              if (seen.has(fingerprint)) continue
              seen.add(fingerprint)
              findings.push({
                caseId,
                disputeId,
                lang,
                file: relFrom(fileInfo.file, options.dataRoot),
                key,
                keyword,
                snippet: compact(text),
              })
            }
          }
        }
      }
    }
  }

  return findings
}

function getCaseFiles(caseId, lang, dataRoot) {
  const files = []
  for (const spec of CASE_FILE_SPECS) {
    const baseName = spec.fileBase(caseId)
    const fileName = lang === 'ko' ? `${baseName}.json` : `${baseName}.${lang}.json`
    const file = path.join(dataRoot, spec.source, fileName)
    if (!fs.existsSync(file)) continue
    files.push({
      file,
      channels: spec.channels,
    })
  }
  return files
}

function extractStringsFromChannels(data, channelNames) {
  const channelNeedles = channelNames.map((name) => name.toLowerCase())
  const strings = []
  walkJson(data, '', (key, text) => {
    const lowerKey = key.toLowerCase()
    if (!channelNeedles.some((needle) => lowerKey.includes(needle))) return
    strings.push({ key: key || '$', text })
  })
  return strings
}

function walkJson(value, keyPath, visit) {
  if (typeof value === 'string') {
    visit(keyPath, value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walkJson(item, `${keyPath}[${index}]`, visit)
    })
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    const childPath = keyPath ? `${keyPath}.${key}` : key
    walkJson(child, childPath, visit)
  }
}

function containsKeyword(text, keyword, lang) {
  if (lang === 'en') {
    return text.toLocaleLowerCase('en-US').includes(keyword.toLocaleLowerCase('en-US'))
  }
  return text.includes(keyword)
}

function buildReport(findings, meta) {
  const summary = {
    total: findings.length,
    byCase: {},
    byLang: Object.fromEntries(LOCALES.map((lang) => [lang, 0])),
  }

  for (const finding of findings) {
    summary.byCase[finding.caseId] = (summary.byCase[finding.caseId] ?? 0) + 1
    summary.byLang[finding.lang] = (summary.byLang[finding.lang] ?? 0) + 1
  }

  return {
    generatedAt: new Date().toISOString(),
    matrix: meta.matrix,
    dataRoot: meta.dataRoot,
    summary,
    findings,
  }
}

function validateMatrix(matrix) {
  if (!matrix || typeof matrix !== 'object' || Array.isArray(matrix)) {
    throw new Error('truth-leak matrix must be an object keyed by caseId')
  }

  for (const [caseId, disputes] of Object.entries(matrix)) {
    if (!disputes || typeof disputes !== 'object' || Array.isArray(disputes)) {
      throw new Error(`matrix.${caseId} must be an object keyed by disputeId`)
    }
    for (const [disputeId, entry] of Object.entries(disputes)) {
      if (!entry || typeof entry !== 'object') {
        throw new Error(`matrix.${caseId}.${disputeId} must be an object`)
      }
      for (const bucket of ['hidden', 'surface']) {
        if (!entry[bucket] || typeof entry[bucket] !== 'object') {
          throw new Error(`matrix.${caseId}.${disputeId}.${bucket} is required`)
        }
        for (const lang of LOCALES) {
          if (!Array.isArray(entry[bucket][lang])) {
            throw new Error(`matrix.${caseId}.${disputeId}.${bucket}.${lang} must be an array`)
          }
        }
      }
    }
  }
}

function filterMatrixByCase(matrix, caseId) {
  if (!matrix[caseId]) {
    throw new Error(`Case not found in truth-leak matrix: ${caseId}`)
  }
  return { [caseId]: matrix[caseId] }
}

function parseArgs(args) {
  const result = {}
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--matrix') result.matrix = args[++index]
    else if (arg === '--out') result.out = args[++index]
    else if (arg === '--case') result.case = args[++index]
    else if (arg === '--data-root') result.dataRoot = args[++index]
    else if (arg === '--strict') result.strict = true
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return result
}

function printSummary(report, output) {
  console.log(`truth leak findings: ${report.summary.total}`)
  console.log(`matrix=${report.matrix}`)
  console.log(`byCase=${JSON.stringify(report.summary.byCase)}`)
  console.log(`byLang=${JSON.stringify(report.summary.byLang)}`)
  console.log(`report=${rel(output)}`)
}

function compact(value, maxLength = 180) {
  const text = String(value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().replace(/\n+/g, ' ')
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 3)}...`
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}

function relFrom(file, dataRoot) {
  const relativeToRoot = rel(file)
  if (!relativeToRoot.startsWith('..')) return relativeToRoot
  return path.relative(dataRoot, file).replace(/\\/g, '/')
}
