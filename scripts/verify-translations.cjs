#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const BASE_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const DEFAULT_INPUT = path.join(BASE_DIR, 'translation_priority_inventory.csv')
const DEFAULT_OUT = path.join(BASE_DIR, 'verify-report.json')
const LOCALES = ['en', 'ja', 'zh-CN']
const DEFAULT_MAX_ISSUES_PER_TYPE = 1000

main()

function main() {
  const args = parseArgs(process.argv.slice(2))
  const input = path.resolve(ROOT, args.input ?? DEFAULT_INPUT)
  const output = path.resolve(ROOT, args.out ?? DEFAULT_OUT)
  const glossaryPath = args.glossary ? path.resolve(ROOT, args.glossary) : findGlossaryPath()
  const maxIssuesPerType = args.maxIssues === undefined ? DEFAULT_MAX_ISSUES_PER_TYPE : Number(args.maxIssues)

  if (!fs.existsSync(input)) {
    throw new Error(`Missing input CSV: ${rel(input)}`)
  }

  const rows = readCsvFile(input)
  const glossary = glossaryPath ? readGlossary(glossaryPath) : []
  const report = buildReport(rows, glossary, {
    input: rel(input),
    glossary: glossaryPath ? rel(glossaryPath) : '',
    maxIssuesPerType,
  })

  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8')
  printSummary(report, output)

  if (args.strict && report.summary.totalIssues > 0) {
    process.exitCode = 1
  }
}

function buildReport(rows, glossary, meta) {
  const issues = {
    placeholder: [],
    empty: [],
    cjkInEnglish: [],
    englishLengthSpike: [],
    glossary: [],
  }

  rows.forEach((row, index) => {
    const rowNumber = index + 2
    checkPlaceholders(row, rowNumber, issues.placeholder)
    checkEmpty(row, rowNumber, issues.empty)
    checkCjkInEnglish(row, rowNumber, issues.cjkInEnglish)
    checkEnglishLength(row, rowNumber, issues.englishLengthSpike)
    checkGlossary(row, rowNumber, glossary, issues.glossary)
  })

  const summary = {
    rows: rows.length,
    glossary_terms: glossary.length,
    placeholder_issues: issues.placeholder.length,
    empty_translation_issues: issues.empty.length,
    cjk_in_english_issues: issues.cjkInEnglish.length,
    english_length_spike_issues: issues.englishLengthSpike.length,
    glossary_issues: issues.glossary.length,
  }
  summary.totalIssues = Object.entries(summary)
    .filter(([key]) => key.endsWith('_issues'))
    .reduce((sum, [, value]) => sum + value, 0)

  const issueLimits = capIssueArrays(issues, meta.maxIssuesPerType)

  return {
    generatedAt: new Date().toISOString(),
    input: meta.input,
    glossary: meta.glossary,
    maxIssuesPerType: meta.maxIssuesPerType,
    summary,
    issueLimits,
    issues,
  }
}

function capIssueArrays(issues, maxIssuesPerType) {
  const limit = Number.isFinite(maxIssuesPerType) ? maxIssuesPerType : DEFAULT_MAX_ISSUES_PER_TYPE
  const result = {}
  if (limit <= 0) {
    for (const [key, value] of Object.entries(issues)) {
      result[key] = { total: value.length, included: value.length, omitted: 0 }
    }
    return result
  }

  for (const [key, value] of Object.entries(issues)) {
    const total = value.length
    if (value.length > limit) value.splice(limit)
    result[key] = {
      total,
      included: value.length,
      omitted: Math.max(0, total - value.length),
    }
  }
  return result
}

function checkPlaceholders(row, rowNumber, output) {
  const source = placeholderSet(row.ko)
  if (source.size === 0) return
  for (const locale of LOCALES) {
    const target = placeholderSet(row[locale])
    const missing = [...source].filter((placeholder) => !target.has(placeholder))
    const extra = [...target].filter((placeholder) => !source.has(placeholder))
    if (missing.length === 0 && extra.length === 0) continue
    output.push(baseIssue(row, rowNumber, {
      locale,
      missing,
      extra,
      ko: row.ko,
      target: row[locale],
    }))
  }
}

function checkEmpty(row, rowNumber, output) {
  for (const locale of LOCALES) {
    if (normalizeCell(row[locale])) continue
    output.push(baseIssue(row, rowNumber, { locale }))
  }
}

function checkCjkInEnglish(row, rowNumber, output) {
  const en = normalizeCell(row.en)
  if (!en) return
  if (!/[가-힣一-龥ぁ-んァ-ン]/.test(en)) return
  output.push(baseIssue(row, rowNumber, {
    locale: 'en',
    en,
  }))
}

function checkEnglishLength(row, rowNumber, output) {
  const ko = normalizeCell(row.ko)
  const en = normalizeCell(row.en)
  if (!ko || !en) return
  if (en.length <= Math.max(ko.length * 2.5, ko.length + 24)) return
  output.push(baseIssue(row, rowNumber, {
    locale: 'en',
    ko_length: ko.length,
    en_length: en.length,
    ratio: Number((en.length / ko.length).toFixed(2)),
    ko: compact(ko),
    en: compact(en),
  }))
}

function checkGlossary(row, rowNumber, glossary, output) {
  if (glossary.length === 0) return
  const ko = normalizeCell(row.ko)
  if (!ko) return
  for (const term of glossary) {
    if (!term.ko || !ko.includes(term.ko)) continue
    for (const locale of LOCALES) {
      const expected = term[locale]
      const target = normalizeCell(row[locale])
      if (!expected || !target) continue
      if (containsLocaleTerm(target, expected, locale)) continue
      output.push(baseIssue(row, rowNumber, {
        locale,
        glossary_ko: term.ko,
        expected,
        target: compact(target),
      }))
    }
  }
}

function containsLocaleTerm(target, expected, locale) {
  if (locale === 'en') {
    return target.toLocaleLowerCase('en-US').includes(expected.toLocaleLowerCase('en-US'))
  }
  return target.includes(expected)
}

function baseIssue(row, rowNumber, extra = {}) {
  return {
    row_number: rowNumber,
    id: row.id,
    category: row.category,
    source: row.source,
    case_id: row.case_id,
    key_path: row.key_path,
    ...extra,
  }
}

function placeholderSet(value) {
  return new Set(String(value ?? '').match(/\{[A-Za-z0-9_]+\}/g) ?? [])
}

function findGlossaryPath() {
  const candidates = [
    path.join(BASE_DIR, 'glossary_locked.csv'),
    path.join(ROOT, 'docs/localization/glossary.csv'),
  ]
  return candidates.find((file) => fs.existsSync(file)) ?? ''
}

function readGlossary(file) {
  const rows = readCsvFile(file)
  const lockedOnly = path.basename(file) !== 'glossary_locked.csv'
  return rows
    .filter((row) => {
      if (!lockedOnly) return true
      return row.locked === 'true' || row.status === 'locked'
    })
    .map((row) => ({
      ko: normalizeCell(row.ko),
      en: normalizeCell(row.en),
      ja: normalizeCell(row.ja),
      'zh-CN': normalizeCell(row['zh-CN']),
    }))
    .filter((row) => row.ko && row.ko.length >= 2)
}

function parseArgs(args) {
  const result = {}
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--input') result.input = args[++index]
    else if (arg === '--out') result.out = args[++index]
    else if (arg === '--glossary') result.glossary = args[++index]
    else if (arg === '--max-issues') result.maxIssues = args[++index]
    else if (arg === '--strict') result.strict = true
    else if (!result.input) result.input = arg
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return result
}

function printSummary(report, output) {
  console.log(`verify translations: ${report.summary.rows} rows`)
  console.log(`input=${report.input}`)
  console.log(`glossary=${report.glossary || '(none)'}`)
  console.log(`placeholder issues: ${report.summary.placeholder_issues}`)
  console.log(`empty translation issues: ${report.summary.empty_translation_issues}`)
  console.log(`CJK in English issues: ${report.summary.cjk_in_english_issues}`)
  console.log(`English length spike issues: ${report.summary.english_length_spike_issues}`)
  console.log(`glossary issues: ${report.summary.glossary_issues}`)
  console.log(`total issues: ${report.summary.totalIssues}`)
  console.log(`report=${rel(output)}`)
}

function readCsvFile(file) {
  return parseCsv(fs.readFileSync(file, 'utf8'))
}

function parseCsv(text) {
  const matrix = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"'
        index += 1
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      quoted = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      if (row.some((value) => value !== '')) matrix.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  if (cell || row.length) {
    row.push(cell)
    if (row.some((value) => value !== '')) matrix.push(row)
  }

  const headers = matrix.shift() ?? []
  return matrix.map((values) => {
    const object = {}
    headers.forEach((header, index) => {
      object[header] = values[index] ?? ''
    })
    return object
  })
}

function compact(value, maxLength = 180) {
  const text = normalizeCell(value).replace(/\n+/g, ' ')
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}…`
}

function normalizeCell(value) {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
