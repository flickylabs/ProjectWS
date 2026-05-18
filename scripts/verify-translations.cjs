#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const BASE_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const DEFAULT_INPUT = path.join(BASE_DIR, 'translation_priority_inventory.csv')
const DEFAULT_OUT = path.join(BASE_DIR, 'verify-report.json')
const LOCALES = ['en', 'ja', 'zh-CN']
const APPLIED_CASES = ['spouse-01', 'family-01', 'friend-01']
const DEFAULT_MAX_ISSUES_PER_TYPE = 1000

const LITERAL_NOUN_PHRASE_PATTERNS = [
  { name: 'the_figure', pattern: /\bthe\s+(?:\w+\s+){0,2}figure\b/i },
  { name: 'x_bracket_track', pattern: /\b[A-Z]\s+(?:bracket|track|bar|panel|frame|range)\b/ },
  { name: 'authority_noun', pattern: /\b(?:money|fund|account|document|signature|family|truth|fact|time|space)\s+authority\b/i },
  { name: 'abstract_matter', pattern: /\b(?:time|space|fact|truth|guilt|innocence)\s+\w+\s+(?:matter|issue|problem)\b/i },
  { name: 'side_responsibility', pattern: /\b(?:your|the other|opposing|each)\s+side\s+responsibility\b/i },
  { name: 'order_of_abstract', pattern: /\bthe\s+order\s+of\s+(?:silence|concealment|truth|responsibility|execution)\b/i },
  { name: 'line_of_abstract', pattern: /\bthe\s+line\s+of\s+(?:silence|procedure|responsibility|truth)\b/i },
  { name: 'point_of_abstract', pattern: /\bthe\s+point\s+of\s+(?:silence|concealment|responsibility|execution)\b/i },
]

const JA_PARTICLE_PATTERNS = [
  { name: 'repeated_particle', pattern: /(?:\u306f|\u304c|\u3092|\u306b|\u3067|\u3078){2,}/u },
  { name: 'sentence_initial_particle', pattern: /^(?:\u306f|\u304c|\u3092|\u306b|\u3067|\u3078)/u },
  { name: 'noun_particle_loop', pattern: /[\u4e00-\u9fff]{2,}(?:\u306f|\u304c|\u3092|\u306b|\u3067|\u3078)[\u4e00-\u9fff]{2,}(?:\u306f|\u304c|\u3092|\u306b|\u3067|\u3078)[\u4e00-\u9fff]{2,}/u },
  { name: 'topic_doublet', pattern: /\u306f.{0,8}\u306f.{0,8}\u306f/u },
]

const ZH_KOREAN_WORD_ORDER_PATTERNS = [
  { name: 'hangul_remnant', pattern: /[\uac00-\ud7af]/u },
  { name: 'korean_particle_mojibake', pattern: /(?:\?\?|\?\?\?)(?:\s|$)/ },
  { name: 'stacked_de', pattern: /[\u4e00-\u9fff]{2,}\u7684[\u4e00-\u9fff]{2,}\u7684[\u4e00-\u9fff]{2,}\u7684/u },
  { name: 'as_status_tail', pattern: /[\u4e00-\u9fff]{2,}\u4f5c\u4e3a.{0,12}\u7684(?:\u95ee\u9898|\u90e8\u5206|\u4e8b\u60c5)/u },
]

const KO_REMNANT_PATTERNS = [
  /[\uac00-\ud7af]+(?:\uc138\uc694|\uc2ed\uc2dc\uc624|\uc2b5\ub2c8\ub2e4|\uc2b5\ub2c8\uae4c|\ud574\uc694|\ub098\uc694|\uad70\uc694|\uc8e0)[.?!\u3002\uff1f\uff01]?/u,
  /[\uac00-\ud7af]+(?:\ub2e4\uba74|\uae4c\uc694|\uac70\ub4e0\uc694)[.?!\u3002\uff1f\uff01]?/u,
]

const PLACEHOLDER_LEAK_PATTERNS = {
  en: [
    /what you (?:hid|concealed) and when/i,
    /what you (?:hid|concealed|decided) when/i,
    /what (?:was|got) (?:hidden|concealed|decided) when/i,
    /what you actually (?:hid|concealed|did) and when/i,
    /the things you (?:hid|concealed) when/i,
  ],
  ja: [
    /\u4f55\u3092\u3044\u3064\u96a0\u3057\u305f/u,
    /\u4f55\u3092\u3044\u3064\u96a0\u3057\u305f\u306e\u304b/u,
  ],
  'zh-CN': [
    /\u4f60?\u5728?\u4f55\u65f6\u9690\u7792\u4e86\u4ec0\u4e48/u,
    /\u4f55\u65f6.{0,6}\u9690\u7792.{0,6}\u4ec0\u4e48/u,
    /\u5728\u4f55\u65f6.{0,6}\u9690\u7792.{0,6}\u4ec0\u4e48/u,
  ],
}

const APPLIED_FILE_SPECS = [
  {
    category: 'case_generated',
    source: 'src/data/cases/generated',
    fileBase: (caseId) => caseId,
  },
  {
    category: 'mediation_dialogue',
    source: 'src/data/dialogues/mediation',
    fileBase: (caseId) => `${caseId.split('-')[0]}-v3-01`,
  },
  {
    category: 'phase1_dialogue',
    source: 'src/data/dialogues/phase1',
    fileBase: (caseId) => caseId,
  },
  {
    category: 'scripted_angle_catalog',
    source: 'src/data/scriptedAngles',
    fileBase: (caseId) => `${caseId}_angle_catalog`,
  },
  {
    category: 'scripted_judge_questions',
    source: 'src/data/scriptedAngles',
    fileBase: (caseId) => `${caseId}_judge_questions`,
  },
  {
    category: 'scripted_text',
    source: 'src/data/scriptedText',
    fileBase: (caseId) => caseId,
  },
]

main()

function main() {
  const args = parseArgs(process.argv.slice(2))
  const scanApplied = Boolean(args.scanApplied)
  const input = path.resolve(ROOT, args.input ?? DEFAULT_INPUT)
  const output = path.resolve(ROOT, args.out ?? DEFAULT_OUT)
  const dataRoot = args.dataRoot ? path.resolve(ROOT, args.dataRoot) : ROOT
  const glossaryPath = args.glossary ? path.resolve(ROOT, args.glossary) : findGlossaryPath()
  const maxIssuesPerType = args.maxIssues === undefined ? DEFAULT_MAX_ISSUES_PER_TYPE : Number(args.maxIssues)
  const mode = scanApplied ? (args.input ? 'both' : 'applied') : 'csv'

  const rows = []
  if (mode === 'csv' || mode === 'both') {
    if (!fs.existsSync(input)) {
      throw new Error(`Missing input CSV: ${rel(input)}`)
    }
    rows.push(...readCsvFile(input))
  }

  if (scanApplied) {
    for (const row of scanAppliedRows(dataRoot)) rows.push(row)
  }

  const glossary = glossaryPath ? readGlossary(glossaryPath) : []
  const report = buildReport(rows, glossary, {
    input: mode === 'applied' ? '' : rel(input),
    glossary: glossaryPath ? rel(glossaryPath) : '',
    maxIssuesPerType,
    mode,
    dataRoot: dataRoot === ROOT ? '' : rel(dataRoot),
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
    literalEnglishNounPhrase: [],
    crossBatchInconsistency: [],
    japaneseParticleAnomaly: [],
    chineseKoreanWordOrder: [],
    personNameDivergence: [],
    systemToneRemnant: [],
    placeholderLeak: [],
  }

  rows.forEach((row, index) => {
    const rowNumber = row.row_number ?? index + 2
    checkPlaceholders(row, rowNumber, issues.placeholder)
    checkEmpty(row, rowNumber, issues.empty)
    checkCjkInEnglish(row, rowNumber, issues.cjkInEnglish)
    checkEnglishLength(row, rowNumber, issues.englishLengthSpike)
    checkGlossary(row, rowNumber, glossary, issues.glossary)
    checkLiteralEnglish(row, rowNumber, issues.literalEnglishNounPhrase)
    checkJapaneseParticles(row, rowNumber, issues.japaneseParticleAnomaly)
    checkChineseWordOrder(row, rowNumber, issues.chineseKoreanWordOrder)
    checkSystemTone(row, rowNumber, issues.systemToneRemnant)
    checkPlaceholderLeak(row, rowNumber, issues.placeholderLeak)
  })

  checkCrossBatchConsistency(rows, issues.crossBatchInconsistency)
  checkPersonNameDivergence(rows, glossary, issues.personNameDivergence)

  const summary = {
    rows: rows.length,
    glossary_terms: glossary.length,
    placeholder_issues: issues.placeholder.length,
    empty_translation_issues: issues.empty.length,
    cjk_in_english_issues: issues.cjkInEnglish.length,
    english_length_spike_issues: issues.englishLengthSpike.length,
    glossary_issues: issues.glossary.length,
    literal_english_noun_phrase_issues: issues.literalEnglishNounPhrase.length,
    cross_batch_inconsistency_issues: issues.crossBatchInconsistency.length,
    japanese_particle_anomaly_issues: issues.japaneseParticleAnomaly.length,
    chinese_korean_word_order_issues: issues.chineseKoreanWordOrder.length,
    person_name_divergence_issues: issues.personNameDivergence.length,
    system_tone_remnant_issues: issues.systemToneRemnant.length,
    placeholder_leak_issues: issues.placeholderLeak.length,
  }
  summary.totalIssues = Object.entries(summary)
    .filter(([key]) => key.endsWith('_issues'))
    .reduce((sum, [, value]) => sum + value, 0)

  const issueLimits = capIssueArrays(issues, meta.maxIssuesPerType)

  return {
    generatedAt: new Date().toISOString(),
    input: meta.input,
    glossary: meta.glossary,
    mode: meta.mode,
    dataRoot: meta.dataRoot,
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
  if (!/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/u.test(en)) return
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

function checkLiteralEnglish(row, rowNumber, output) {
  const en = normalizeCell(row.en)
  if (!en) return
  for (const { name, pattern } of LITERAL_NOUN_PHRASE_PATTERNS) {
    const match = en.match(pattern)
    if (!match) continue
    output.push(baseIssue(row, rowNumber, {
      locale: 'en',
      pattern: name,
      snippet: compact(match[0], 120),
      ko: compact(row.ko),
      en: compact(en),
    }))
    break
  }
}

function checkCrossBatchConsistency(rows, output) {
  const koGroups = new Map()
  rows.forEach((row, index) => {
    const ko = normalizeCell(row.ko)
    if (!ko) return
    const key = ko
    if (!koGroups.has(key)) koGroups.set(key, [])
    koGroups.get(key).push({
      rowNumber: row.row_number ?? index + 2,
      id: row.id,
      source: row.source,
      key_path: row.key_path,
      en: row.en,
      ja: row.ja,
      'zh-CN': row['zh-CN'],
    })
  })

  for (const [ko, group] of koGroups) {
    if (group.length < 2) continue
    for (const locale of LOCALES) {
      const variants = [...new Set(group.map((entry) => normalizeCell(entry[locale])).filter(Boolean))]
      if (variants.length <= 1) continue
      output.push({
        row_number: group[0].rowNumber,
        locale,
        ko: compact(ko),
        variants: variants.map((variant) => compact(variant, 120)),
        occurrences: group.length,
        examples: group.slice(0, 5).map((entry) => ({
          row_number: entry.rowNumber,
          id: entry.id,
          source: entry.source,
          key_path: entry.key_path,
        })),
      })
    }
  }
}

function checkJapaneseParticles(row, rowNumber, output) {
  const text = normalizeCell(row.ja)
  if (!text) return
  for (const { name, pattern } of JA_PARTICLE_PATTERNS) {
    const match = text.match(pattern)
    if (!match) continue
    output.push(baseIssue(row, rowNumber, {
      locale: 'ja',
      pattern: name,
      snippet: compact(match[0], 120),
      ja: compact(text),
    }))
    break
  }
}

function checkChineseWordOrder(row, rowNumber, output) {
  const text = normalizeCell(row['zh-CN'])
  if (!text) return
  for (const { name, pattern } of ZH_KOREAN_WORD_ORDER_PATTERNS) {
    const match = text.match(pattern)
    if (!match) continue
    output.push(baseIssue(row, rowNumber, {
      locale: 'zh-CN',
      pattern: name,
      snippet: compact(match[0], 120),
      target: compact(text),
    }))
    break
  }
}

function checkPersonNameDivergence(rows, glossary, output) {
  const glossaryNames = new Set(glossary.map((term) => term.ko).filter(looksLikePersonName))
  const names = extractPotentialKoNames(rows).filter((name) => !glossaryNames.has(name))

  for (const name of names) {
    const matchingRows = rows.filter((row) => normalizeCell(row.ko).includes(name))
    if (matchingRows.length < 3) continue

    for (const locale of LOCALES) {
      const variants = new Set()
      for (const row of matchingRows) {
        for (const variant of extractTargetNameVariants(row[locale], locale)) {
          variants.add(variant)
        }
      }
      if (variants.size <= 1 || variants.size > 8) continue
      output.push({
        ko_name: name,
        locale,
        variants: [...variants].sort(),
        occurrences: matchingRows.length,
        examples: matchingRows.slice(0, 5).map((row, index) => ({
          row_number: row.row_number ?? rows.indexOf(row) + 2,
          id: row.id,
          source: row.source,
          key_path: row.key_path,
          target: compact(row[locale], 120),
          example_index: index,
        })),
      })
    }
  }
}

function checkSystemTone(row, rowNumber, output) {
  for (const locale of LOCALES) {
    const text = normalizeCell(row[locale])
    if (!text) continue
    const matched = KO_REMNANT_PATTERNS.find((pattern) => pattern.test(text))
    if (!matched) continue
    output.push(baseIssue(row, rowNumber, {
      locale,
      pattern: String(matched),
      snippet: compact(text),
    }))
  }
}

function checkPlaceholderLeak(row, rowNumber, output) {
  if (/\bbehaviorHint\b/i.test(normalizeCell(row.key_path))) return
  for (const locale of LOCALES) {
    const text = normalizeCell(row[locale])
    if (!text) continue
    for (const pattern of PLACEHOLDER_LEAK_PATTERNS[locale] || []) {
      if (!pattern.test(text)) continue
      output.push(baseIssue(row, rowNumber, {
        locale,
        pattern: String(pattern),
        snippet: compact(text),
        ko: compact(row.ko),
      }))
      break
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

function scanAppliedRows(dataRoot) {
  const rows = []
  for (const caseId of APPLIED_CASES) {
    for (const spec of APPLIED_FILE_SPECS) {
      const baseName = spec.fileBase(caseId)
      const sourceDir = path.join(dataRoot, spec.source)
      const koFile = path.join(sourceDir, `${baseName}.json`)
      const localeFiles = Object.fromEntries(
        LOCALES.map((locale) => [locale, path.join(sourceDir, `${baseName}.${locale}.json`)]),
      )

      const koStrings = readJsonStringMap(koFile)
      const localeStrings = Object.fromEntries(
        LOCALES.map((locale) => [locale, readJsonStringMap(localeFiles[locale])]),
      )
      if (koStrings.size === 0 && LOCALES.every((locale) => localeStrings[locale].size === 0)) continue

      for (const keyPath of [...koStrings.keys()].sort()) {
        const row = {
          id: `applied:${caseId}:${spec.category}:${keyPath}`,
          category: spec.category,
          source: `${spec.source}/${baseName}.json`,
          case_id: caseId,
          key_path: keyPath,
          ko: koStrings.get(keyPath) ?? '',
        }
        for (const locale of LOCALES) {
          row[locale] = localeStrings[locale].get(keyPath) ?? ''
        }
        if (!row.ko && LOCALES.every((locale) => !row[locale])) continue
        rows.push(row)
      }
    }
  }
  return rows
}

function readJsonStringMap(file) {
  const result = new Map()
  if (!fs.existsSync(file)) return result
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  walkJsonStrings(data, '', result)
  return result
}

function walkJsonStrings(value, keyPath, output) {
  if (typeof value === 'string') {
    if (!isTranslatableJsonPath(keyPath)) return
    output.set(keyPath || '$', value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walkJsonStrings(item, `${keyPath}[${index}]`, output)
    })
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    const childPath = keyPath ? `${keyPath}.${key}` : key
    walkJsonStrings(child, childPath, output)
  }
}

function isTranslatableJsonPath(keyPath) {
  const normalized = normalizeCell(keyPath)
  if (!normalized) return false
  if (/(?:^|\.)(?:id|caseId|locale|schemaVersion|tags|disputeId|questionType|targetParty|angleId|speaker|role|type)$/i.test(normalized)) {
    return false
  }
  return /(?:^|\.)(?:text|behaviorHint|title|subtitle|description|label|name|summary|content|body|line|judge|system|mediation|aftermath|question|answer|statement)$/i.test(normalized)
}

function extractPotentialKoNames(rows) {
  const counts = new Map()
  const namePattern = /([\uac00-\ud7af]{2,4})\s*(?:\uc528|\ub2d8|\uc120\uc0dd\ub2d8)/gu
  for (const row of rows) {
    const ko = normalizeCell(row.ko)
    let match
    while ((match = namePattern.exec(ko)) !== null) {
      const name = match[1]
      if (!looksLikePersonName(name)) continue
      counts.set(name, (counts.get(name) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([name]) => name)
    .sort()
}

function looksLikePersonName(value) {
  const text = normalizeCell(value)
  if (!/^[\uac00-\ud7af]{2,4}$/u.test(text)) return false
  return ![
    '\uc7ac\ud310',
    '\uc99d\uc778',
    '\ub0a8\ud3b8',
    '\uc544\ub0b4',
    '\uc5b4\uba38\ub2c8',
    '\uc544\ubc84\uc9c0',
    '\uc624\ube60',
    '\ud615',
    '\ub3d9\uc0dd',
  ].includes(text)
}

function extractTargetNameVariants(value, locale) {
  const text = normalizeCell(value)
  if (!text) return []
  if (locale === 'en') {
    return uniqueMatches(text, /\b(?:Mr\.|Ms\.|Mrs\.)\s+[A-Z][A-Za-z'-]+(?:[- ][A-Z][A-Za-z'-]+){0,2}/g)
  }
  if (locale === 'ja') {
    return uniqueMatches(text, /[\u30a0-\u30ff]{2,}(?:\u30fb[\u30a0-\u30ff]{2,})?(?:\u3055\u3093)?/gu)
  }
  return uniqueMatches(text, /[\u4e00-\u9fff]{2,4}(?:\u5148\u751f|\u5973\u58eb)?/gu)
}

function uniqueMatches(text, pattern) {
  return [...new Set([...text.matchAll(pattern)].map((match) => compact(match[0], 80)))]
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
    else if (arg === '--data-root') result.dataRoot = args[++index]
    else if (arg === '--scan-applied') result.scanApplied = true
    else if (arg === '--strict') result.strict = true
    else if (!result.input) result.input = arg
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return result
}

function printSummary(report, output) {
  console.log(`verify translations: ${report.summary.rows} rows`)
  console.log(`mode=${report.mode}`)
  console.log(`input=${report.input || '(none)'}`)
  console.log(`glossary=${report.glossary || '(none)'}`)
  console.log(`placeholder issues: ${report.summary.placeholder_issues}`)
  console.log(`empty translation issues: ${report.summary.empty_translation_issues}`)
  console.log(`CJK in English issues: ${report.summary.cjk_in_english_issues}`)
  console.log(`English length spike issues: ${report.summary.english_length_spike_issues}`)
  console.log(`glossary issues: ${report.summary.glossary_issues}`)
  console.log(`literal English noun phrase issues: ${report.summary.literal_english_noun_phrase_issues}`)
  console.log(`cross-batch inconsistency issues: ${report.summary.cross_batch_inconsistency_issues}`)
  console.log(`Japanese particle anomaly issues: ${report.summary.japanese_particle_anomaly_issues}`)
  console.log(`Chinese Korean word order issues: ${report.summary.chinese_korean_word_order_issues}`)
  console.log(`person-name divergence issues: ${report.summary.person_name_divergence_issues}`)
  console.log(`system tone remnant issues: ${report.summary.system_tone_remnant_issues}`)
  console.log(`placeholder leak issues: ${report.summary.placeholder_leak_issues}`)
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
  return matrix.map((values, index) => {
    const object = { row_number: index + 2 }
    headers.forEach((header, headerIndex) => {
      object[header] = values[headerIndex] ?? ''
    })
    return object
  })
}

function compact(value, maxLength = 180) {
  const text = normalizeCell(value).replace(/\n+/g, ' ')
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 3)}...`
}

function normalizeCell(value) {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
