#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const BASE_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const INPUT_PATH = path.join(BASE_DIR, 'translation_priority_inventory.csv')
const OUT_DIR = path.join(BASE_DIR, 'batches')
const CASES = [
  { id: 'spouse-01', slug: 'spouse01', start: 1 },
  { id: 'family-01', slug: 'family01', start: 5 },
  { id: 'friend-01', slug: 'friend01', start: 9 },
]

main()

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Missing input CSV: ${rel(INPUT_PATH)}`)
  }

  const { headers, rows } = readCsvWithHeaders(INPUT_PATH)
  rows.forEach((row, index) => {
    row.__index = index
  })

  fs.mkdirSync(OUT_DIR, { recursive: true })
  removeGeneratedBatchFiles()

  const outputs = []
  for (const casePlan of CASES) {
    const caseRows = rows.filter((row) => row.case_id === casePlan.id)
    const groups = groupRows(caseRows, 'case')
    const chunks = splitGroups(groups, 4)
    chunks.forEach((chunk, index) => {
      outputs.push({
        batchId: String(casePlan.start + index).padStart(2, '0'),
        file: `batch_${String(casePlan.start + index).padStart(2, '0')}_${casePlan.slug}_part${index + 1}.csv`,
        rows: sortByOriginalOrder(chunk),
      })
    })
  }

  const globalRows = rows.filter((row) => !row.case_id)
  const globalGroups = groupRows(globalRows, 'global').sort(compareGlobalGroups)
  const globalChunks = splitGroups(globalGroups, 8)
  const globalNames = [
    'global_ui_part1',
    'global_ui_part2',
    'global_hardcoded_part1',
    'global_hardcoded_part2',
    'global_scripted_part1',
    'global_scripted_part2',
    'global_scripted_part3',
    'global_scripted_part4',
  ]
  globalChunks.forEach((chunk, index) => {
    const number = 13 + index
    outputs.push({
      batchId: String(number).padStart(2, '0'),
      file: `batch_${String(number).padStart(2, '0')}_${globalNames[index]}.csv`,
      rows: sortByOriginalOrder(chunk),
    })
  })

  for (const output of outputs) {
    fs.writeFileSync(path.join(OUT_DIR, output.file), toCsv(headers, output.rows), 'utf8')
  }

  fs.writeFileSync(path.join(OUT_DIR, 'MANIFEST.csv'), buildManifest(outputs), 'utf8')
  fs.writeFileSync(path.join(OUT_DIR, 'PROGRESS.md'), buildProgress(outputs), 'utf8')

  const total = outputs.reduce((sum, output) => sum + output.rows.length, 0)
  console.log(`batch split ok: ${outputs.length} files, ${total} rows`)
  for (const output of outputs) {
    console.log(`${output.batchId}: ${output.rows.length} rows -> ${output.file}`)
  }
  console.log(`output=${rel(OUT_DIR)}`)
}

function removeGeneratedBatchFiles() {
  const allowedRoot = path.resolve(OUT_DIR)
  for (const entry of fs.readdirSync(OUT_DIR, { withFileTypes: true })) {
    if (!entry.isFile()) continue
    if (!/^batch_\d{2}_.+\.csv$/.test(entry.name) && !['MANIFEST.csv', 'PROGRESS.md'].includes(entry.name)) continue
    const target = path.resolve(OUT_DIR, entry.name)
    if (!target.startsWith(`${allowedRoot}${path.sep}`)) {
      throw new Error(`Refusing to remove unexpected path: ${target}`)
    }
    fs.rmSync(target)
  }
}

function groupRows(rows, mode) {
  const byKey = new Map()
  for (const row of rows) {
    const key = mode === 'global' ? globalGroupKey(row) : caseGroupKey(row)
    let group = byKey.get(key)
    if (!group) {
      group = {
        key,
        rows: [],
        firstIndex: row.__index,
        priority: globalPriority(row),
      }
      byKey.set(key, group)
    }
    group.rows.push(row)
    group.firstIndex = Math.min(group.firstIndex, row.__index)
    group.priority = Math.min(group.priority, globalPriority(row))
  }
  return [...byKey.values()].sort((a, b) => a.firstIndex - b.firstIndex)
}

function caseGroupKey(row) {
  const entity = entityKey(row.key_path)
  if (entity) return [row.case_id, row.category, row.source, entity].join('|')
  if (row.category === 'non_party_scripted_text') {
    return [row.case_id, row.category, row.source, channelKey(row.key_path)].join('|')
  }
  if (row.category === 'judge_question_script') {
    return [row.case_id, row.category, row.source, judgeQuestionKey(row.key_path)].join('|')
  }
  return [row.case_id, row.category, row.source, broadPathKey(row.key_path)].join('|')
}

function globalGroupKey(row) {
  return [row.category, row.source, broadPathKey(row.key_path)].join('|')
}

function entityKey(keyPath) {
  const text = String(keyPath ?? '')
  const matches = [
    text.match(/\[(e-\d+)\]/),
    text.match(/\[(d-\d+)\]/),
    text.match(/\[(dc-\d+)\]/),
    text.match(/\[(h-d-?\d+)\]/),
    text.match(/\[(w-\d+)\]/),
  ]
  const found = matches.find(Boolean)
  return found ? found[1] : ''
}

function channelKey(keyPath) {
  const match = String(keyPath ?? '').match(/^channels\[([^\]]+)\]/)
  return match ? `channel:${match[1]}` : broadPathKey(keyPath)
}

function judgeQuestionKey(keyPath) {
  const text = String(keyPath ?? '')
  const angleMatch = text.match(/\[([a-z0-9_-]*angle[a-z0-9_-]*)\]/i)
  if (angleMatch) return `angle:${angleMatch[1]}`
  return broadPathKey(text)
}

function broadPathKey(keyPath) {
  const text = String(keyPath ?? '')
  if (!text) return '(root)'
  if (/^line:\d+$/.test(text)) return text
  return text.split('.').slice(0, 2).join('.') || text
}

function splitGroups(groups, batchCount) {
  const chunks = []
  let cursor = 0
  let remainingRows = groups.reduce((sum, group) => sum + group.rows.length, 0)

  for (let batchIndex = 0; batchIndex < batchCount; batchIndex += 1) {
    const batchesLeft = batchCount - batchIndex
    const chunk = []
    let chunkRows = 0
    const dynamicTarget = Math.ceil(remainingRows / batchesLeft)

    while (cursor < groups.length) {
      const groupsLeftAfterThis = groups.length - cursor - 1
      const batchesLeftAfterThis = batchesLeft - 1
      const mustKeepForLater = batchesLeftAfterThis > 0 && groupsLeftAfterThis < batchesLeftAfterThis
      if (chunk.length > 0 && chunkRows >= dynamicTarget && !mustKeepForLater) break

      const group = groups[cursor]
      chunk.push(...group.rows)
      chunkRows += group.rows.length
      remainingRows -= group.rows.length
      cursor += 1

      if (mustKeepForLater) break
    }

    chunks.push(chunk)
  }

  if (cursor < groups.length) {
    chunks[chunks.length - 1].push(...groups.slice(cursor).flatMap((group) => group.rows))
  }

  return chunks
}

function sortByOriginalOrder(rows) {
  return [...rows].sort((a, b) => a.__index - b.__index)
}

function compareGlobalGroups(a, b) {
  if (a.priority !== b.priority) return a.priority - b.priority
  return a.firstIndex - b.firstIndex
}

function globalPriority(row) {
  if (row.category === 'ui_i18n_message') return 0
  if (row.category === 'hardcoded_source_literal') return 1
  if (row.category === 'non_party_scripted_text' || row.category === 'judge_question_script') return 2
  return 3
}

function buildManifest(outputs) {
  const headers = ['batch_id', 'file', 'rows', 'case_scope', 'categories']
  const rows = outputs.map((output) => ({
    batch_id: output.batchId,
    file: output.file,
    rows: output.rows.length,
    case_scope: summarizeCaseScope(output.rows),
    categories: summarizeCategories(output.rows),
  }))
  return toCsv(headers, rows)
}

function buildProgress(outputs) {
  const globalScriptRows = outputs
    .filter((output) => Number(output.batchId) >= 17)
    .reduce((sum, output) => {
      return sum + output.rows.filter((row) => row.category === 'non_party_scripted_text' || row.category === 'judge_question_script').length
    }, 0)
  const note = globalScriptRows === 0
    ? '\n\nNote: the current priority inventory stores `non_party_scripted_text` and `judge_question_script` with case scopes, so those rows are included in batches 01-12. Batches 17-20 keep the requested slots and carry global overflow rows instead.\n'
    : ''

  const lines = [
    '# Translation Batch Progress',
    '',
    'Status values: `pending`, `in-gpt-pro`, `translated`, `applied`, `verified`.',
    note.trimEnd(),
    '',
    '| Batch | File | Rows | Case scope | Categories | Status | Notes |',
    '| --- | --- | ---: | --- | --- | --- | --- |',
  ].filter((line, index, array) => !(line === '' && array[index - 1] === ''))

  for (const output of outputs) {
    lines.push(`| ${output.batchId} | ${output.file} | ${output.rows.length} | ${summarizeCaseScope(output.rows)} | ${summarizeCategories(output.rows)} | pending |  |`)
  }
  return lines.join('\n') + '\n'
}

function summarizeCaseScope(rows) {
  const values = [...new Set(rows.map((row) => row.case_id || '(global)'))]
  const order = ['(global)', 'spouse-01', 'family-01', 'friend-01']
  return values.sort((a, b) => order.indexOf(a) - order.indexOf(b)).join(';')
}

function summarizeCategories(rows) {
  const counts = new Map()
  for (const row of rows) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, count]) => `${category}:${count}`)
    .join(';')
}

function readCsvWithHeaders(file) {
  const matrix = parseCsvMatrix(fs.readFileSync(file, 'utf8'))
  const headers = matrix.shift() ?? []
  const rows = matrix.map((values) => {
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ''
    })
    return row
  })
  return { headers, rows }
}

function parseCsvMatrix(text) {
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
  return matrix
}

function toCsv(headers, rows) {
  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n'
}

function csvEscape(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
