#!/usr/bin/env node
/**
 * Scan all retranslated batch CSVs for potential truncation in EN/JA/ZH-CN.
 *
 * Heuristics (only applied to rows where ko length >= KO_MIN_LENGTH):
 *   1) Sentence-count drop: target has 2+ fewer sentence terminators than KR (and KR has 3+)
 *   2) Length ratio too low: target length < RATIO_FLOOR * (ko_length * expected_expansion)
 *
 * Expected expansion factors (chars vs KR baseline):
 *   - en: ~1.5x (English typically expands)
 *   - ja: ~1.0x
 *   - zh-CN: ~0.9x
 *
 * Output:
 *   - Console: sorted candidate list, most severe first
 *   - JSON report: batches/GPT_Result/truncation-scan-report.json
 *   - CSV draft (if --emit-batch): batches/batch_23_truncation_candidates.csv for GPT Pro re-translation
 */

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const GPT_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract/batches/GPT_Result')

const KO_MIN_LENGTH = 150
const EXPANSION = { en: 1.5, ja: 1.0, 'zh-CN': 0.9 }
const RATIO_FLOOR = 0.5
const SENTENCE_DROP_THRESHOLD = 2 // target sentences must be at least (ko - 1) when ko >= 3

const args = process.argv.slice(2)
const EMIT_BATCH = args.includes('--emit-batch')

function parseCsv(text) {
  const rows = []
  let row = []
  let cur = ''
  let inQuote = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuote) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuote = false
        }
      } else {
        cur += ch
      }
    } else {
      if (ch === '"') {
        inQuote = true
      } else if (ch === ',') {
        row.push(cur)
        cur = ''
      } else if (ch === '\n') {
        row.push(cur)
        rows.push(row)
        row = []
        cur = ''
      } else if (ch === '\r') {
        // skip
      } else {
        cur += ch
      }
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur)
    rows.push(row)
  }
  return rows
}

function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

function sentenceCount(text) {
  if (!text) return 0
  const m = text.match(/[.!?。！？]/g)
  return m ? m.length : 0
}

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const rows = parseCsv(text)
  if (rows.length === 0) return []
  const header = rows[0]
  const idx = {
    id: header.indexOf('id'),
    category: header.indexOf('category'),
    source: header.indexOf('source'),
    case_id: header.indexOf('case_id'),
    key_path: header.indexOf('key_path'),
    ko: header.indexOf('ko'),
    en: header.indexOf('en'),
    ja: header.indexOf('ja'),
    'zh-CN': header.indexOf('zh-CN'),
    notes: header.indexOf('notes'),
  }
  const out = []
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]
    if (row.length < 9) continue
    const ko = row[idx.ko] || ''
    if (ko.length < KO_MIN_LENGTH) continue
    const ko_sentences = sentenceCount(ko)
    const issues = []
    const ratios = {}
    for (const loc of ['en', 'ja', 'zh-CN']) {
      const target = row[idx[loc]] || ''
      if (!target) {
        issues.push(`${loc}=empty`)
        continue
      }
      const target_sentences = sentenceCount(target)
      const expected_length = ko.length * EXPANSION[loc]
      const ratio = target.length / expected_length
      ratios[loc] = ratio
      if (ko_sentences >= 3 && target_sentences <= ko_sentences - SENTENCE_DROP_THRESHOLD) {
        issues.push(`${loc}=sentence_drop(${ko_sentences}->${target_sentences})`)
      }
      if (ratio < RATIO_FLOOR) {
        issues.push(`${loc}=short(ratio=${ratio.toFixed(2)})`)
      }
    }
    if (issues.length === 0) continue
    out.push({
      file: path.basename(filePath),
      row: r + 1,
      id: row[idx.id],
      category: row[idx.category],
      source: row[idx.source],
      case_id: row[idx.case_id],
      key_path: row[idx.key_path],
      ko_length: ko.length,
      ko_sentences,
      en_length: (row[idx.en] || '').length,
      ja_length: (row[idx.ja] || '').length,
      'zh-CN_length': (row[idx['zh-CN']] || '').length,
      ratios,
      issues,
      severity: issues.length, // 1=mild (one lang), 2=moderate, 3=severe (all 3)
      ko_preview: ko.slice(0, 100) + (ko.length > 100 ? '...' : ''),
      raw: { ko, en: row[idx.en], ja: row[idx.ja], 'zh-CN': row[idx['zh-CN']], notes: row[idx.notes] },
    })
  }
  return out
}

const files = fs.readdirSync(GPT_DIR).filter((f) => /^batch_\d+_.*_retranslated\.csv$/.test(f)).sort()
console.log(`Scanning ${files.length} retranslated batch files (ko length >= ${KO_MIN_LENGTH}, ratio floor ${RATIO_FLOOR})...\n`)

const allCandidates = []
for (const f of files) {
  const found = scanFile(path.join(GPT_DIR, f))
  allCandidates.push(...found)
}

allCandidates.sort((a, b) => b.severity - a.severity || a.ratios.en - b.ratios.en)

console.log(`Total candidates: ${allCandidates.length}`)
const bySeverity = { 1: 0, 2: 0, 3: 0 }
allCandidates.forEach((c) => { bySeverity[c.severity] = (bySeverity[c.severity] || 0) + 1 })
console.log(`  severe (3 langs flagged): ${bySeverity[3] || 0}`)
console.log(`  moderate (2 langs):       ${bySeverity[2] || 0}`)
console.log(`  mild (1 lang):            ${bySeverity[1] || 0}`)
console.log('')

// Print top 30 for terminal review
console.log('=== Top 30 candidates (most severe first) ===\n')
allCandidates.slice(0, 30).forEach((c, i) => {
  console.log(`[${i + 1}] ${c.file} row ${c.row} | case=${c.case_id || '(global)'} | severity ${c.severity}`)
  console.log(`    key:    ${c.key_path}`)
  console.log(`    ko (${c.ko_length}c, ${c.ko_sentences} sents): ${c.ko_preview}`)
  console.log(`    lens:   en=${c.en_length}, ja=${c.ja_length}, zh-CN=${c['zh-CN_length']}`)
  console.log(`    ratios: en=${(c.ratios.en ?? 0).toFixed(2)}, ja=${(c.ratios.ja ?? 0).toFixed(2)}, zh=${(c.ratios['zh-CN'] ?? 0).toFixed(2)}`)
  console.log(`    flags:  ${c.issues.join(' | ')}`)
  console.log('')
})

const reportPath = path.join(GPT_DIR, 'truncation-scan-report.json')
fs.writeFileSync(reportPath, JSON.stringify(allCandidates, null, 2), 'utf8')
console.log(`Full report: ${reportPath}`)

if (EMIT_BATCH && allCandidates.length > 0) {
  const draftPath = path.join(ROOT, 'docs/localization/non-dialogue-extract/batches/batch_23_truncation_candidates.csv')
  const lines = ['id,category,source,case_id,key_path,ko,en,ja,zh-CN,notes']
  for (const c of allCandidates) {
    const note = `Truncation candidate. flags=${c.issues.join(';')}. ko_sentences=${c.ko_sentences} ko_chars=${c.ko_length}. Re-translate to match KR meaning completely; preserve all 4 sentences if KR has 4.`
    lines.push([c.id, c.category, c.source, c.case_id, c.key_path, c.raw.ko, c.raw.en, c.raw.ja, c.raw['zh-CN'], note].map(csvEscape).join(','))
  }
  fs.writeFileSync(draftPath, lines.join('\n') + '\n', 'utf8')
  console.log(`Draft batch_23 CSV: ${draftPath} (${allCandidates.length} rows)`)
}
