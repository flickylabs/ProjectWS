import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const glossaryPath = path.join(root, 'docs', 'localization', 'glossary.csv')
const requiredColumns = ['id', 'category', 'ko', 'en', 'ja', 'zh-CN', 'context', 'status', 'locked', 'notes']
const validStatuses = new Set(['draft', 'reviewed', 'locked', 'needs-rework', 'deprecated'])
const placeholderCorruptionPattern = /\?{2,}/
const numberedPlaceholderPattern = /\d+\s+\?+/
const replacementCharacterPattern = /\uFFFD/
const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u
const forbiddenPublicBrandLiterals = [
  'Project Solomon',
  "Solomon's Dilemma",
  'Solomon Court',
  'ソロモン法廷',
  '所罗门的法庭',
  '所罗门的两难',
  '所罗门困境',
]

const brandGuardRoots = [
  path.join(root, 'src', 'i18n'),
  path.join(root, 'src', 'app'),
  path.join(root, 'src', 'components', 'pc'),
]

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      cell += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(cell)
      cell = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      row.push(cell)
      if (row.some((value) => value.length > 0)) rows.push(row)
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  row.push(cell)
  if (row.some((value) => value.length > 0)) rows.push(row)
  return rows
}

function fail(message) {
  console.error(`glossary validation failed: ${message}`)
  process.exitCode = 1
}

function listSourceFiles(dir) {
  if (!fs.existsSync(dir)) return []

  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(entryPath))
      continue
    }
    if (/\.(ts|tsx|css)$/.test(entry.name)) {
      files.push(entryPath)
    }
  }

  return files
}

if (!fs.existsSync(glossaryPath)) {
  fail(`missing ${glossaryPath}`)
  process.exit()
}

const rows = parseCsv(fs.readFileSync(glossaryPath, 'utf8'))
const header = rows[0] ?? []

if (header.join(',') !== requiredColumns.join(',')) {
  fail(`header must be: ${requiredColumns.join(',')}`)
}

const seen = new Set()
let termCount = 0

for (let index = 1; index < rows.length; index += 1) {
  const row = rows[index]
  const line = index + 1

  if (row.length !== requiredColumns.length) {
    fail(`line ${line} has ${row.length} columns; expected ${requiredColumns.length}`)
    continue
  }

  const record = Object.fromEntries(requiredColumns.map((column, columnIndex) => [column, row[columnIndex]?.trim() ?? '']))
  termCount += 1

  if (!/^[a-z0-9_]+$/.test(record.id)) fail(`line ${line} has invalid id "${record.id}"`)
  if (seen.has(record.id)) fail(`line ${line} duplicates id "${record.id}"`)
  seen.add(record.id)

  for (const column of ['category', 'ko', 'en', 'ja', 'zh-CN', 'context']) {
    if (!record[column]) fail(`line ${line} is missing ${column}`)
  }

  for (const [column, value] of Object.entries(record)) {
    if (placeholderCorruptionPattern.test(value)) {
      fail(`line ${line} column ${column} contains placeholder corruption "${value}"`)
    }
    if (numberedPlaceholderPattern.test(value)) {
      fail(`line ${line} column ${column} contains numbered placeholder corruption "${value}"`)
    }
    if (replacementCharacterPattern.test(value)) {
      fail(`line ${line} column ${column} contains Unicode replacement character`)
    }
  }

  const cjkColumns = ['ko', 'ja', 'zh-CN']
  const cjkColumnHasText = cjkColumns.map((column) => cjkPattern.test(record[column]))
  if (cjkColumnHasText.some(Boolean) && !cjkColumnHasText.every(Boolean)) {
    const missing = cjkColumns.filter((_, columnIndex) => !cjkColumnHasText[columnIndex]).join(', ')
    fail(`line ${line} has CJK sibling values but missing CJK text in ${missing}`)
  }

  if (!validStatuses.has(record.status)) {
    fail(`line ${line} has invalid status "${record.status}"`)
  }

  if (!['true', 'false'].includes(record.locked)) {
    fail(`line ${line} locked must be true or false`)
  }

  if (record.locked === 'true' && record.status !== 'locked') {
    fail(`line ${line} locked=true requires status=locked`)
  }
}

const brandGuardFiles = brandGuardRoots.flatMap(listSourceFiles)
for (const file of brandGuardFiles) {
  const relativePath = path.relative(root, file).replaceAll(path.sep, '/')
  const text = fs.readFileSync(file, 'utf8')
  for (const literal of forbiddenPublicBrandLiterals) {
    const index = text.indexOf(literal)
    if (index === -1) continue

    const line = text.slice(0, index).split(/\r?\n/).length
    fail(`${relativePath}:${line} contains forbidden public brand literal "${literal}"`)
  }
}

if (!process.exitCode) {
  console.log(`glossary ok: ${termCount} terms`)
  console.log(`brand guard ok: ${brandGuardFiles.length} files checked`)
}
