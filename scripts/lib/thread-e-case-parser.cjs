const fs = require('fs')
const path = require('path')

const BATCH_DOCS = {
  spouse: 'thread-e-100-new-cases-batch-01-spouse.md',
  family: 'thread-e-100-new-cases-batch-02-family.md',
  friend: 'thread-e-100-new-cases-batch-03-friend.md',
  neighbor: 'thread-e-100-new-cases-batch-04-neighbor.md',
  partnership: 'thread-e-100-new-cases-batch-05-partnership.md',
  tenant: 'thread-e-100-new-cases-batch-06-tenant.md',
  workplace: 'thread-e-100-new-cases-batch-07-workplace.md',
  online: 'thread-e-100-new-cases-batch-08-online.md',
  professional: 'thread-e-100-new-cases-batch-09-professional.md',
  civic: 'thread-e-100-new-cases-batch-10-civic.md',
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function normalizeSpaces(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

function categoryFromCaseId(caseId) {
  return String(caseId).split('-new-')[0]
}

function batchDocPath(root, caseId) {
  const category = categoryFromCaseId(caseId)
  const fileName = BATCH_DOCS[category]
  if (!fileName) {
    throw new Error(`unsupported Thread-E category for ${caseId}`)
  }
  return path.join(root, 'docs', 'ref', '리뉴얼참고', fileName)
}

function extractCaseSection(markdown, caseId) {
  const lines = markdown.split(/\n/)
  const startIndex = lines.findIndex((line) => line.startsWith('### ') && line.includes(`\`${caseId}\``))
  if (startIndex < 0) {
    throw new Error(`case section not found for ${caseId}`)
  }

  let endIndex = lines.length
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith('### ')) {
      endIndex = index
      break
    }
  }
  return lines.slice(startIndex, endIndex).join('\n')
}

function extractHeading(section) {
  const firstLine = section.split(/\n/)[0] || ''
  const match = firstLine.match(/^###\s+\d+-\d+\s+(.+?)\s+—\s+([a-z_]+)\s+\(`([^`]+)`\)$/)
  if (!match) {
    throw new Error(`failed to parse heading: ${firstLine}`)
  }
  return {
    title: normalizeSpaces(match[1]),
    category: normalizeSpaces(match[2]),
    caseId: normalizeSpaces(match[3]),
  }
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractLabelText(section, label, nextLabels) {
  const stopPattern = nextLabels.map((item) => escapeRegex(item)).join('|')
  const regex = new RegExp(
    `\\*\\*${escapeRegex(label)}\\*\\*(?:\\s*\\([^)]+\\))?:\\s*([\\s\\S]*?)(?=\\n\\*\\*(?:${stopPattern})\\*\\*(?:\\s*\\([^)]+\\))?:|\\n###|$)`,
    'u',
  )
  const match = section.match(regex)
  return match ? normalizeSpaces(match[1]) : ''
}

function extractRawBlock(section, label, nextLabel) {
  const startMatch = section.match(new RegExp(`\\*\\*${escapeRegex(label)}\\*\\*(?:\\s*\\([^)]+\\))?:`, 'u'))
  if (!startMatch || startMatch.index == null) return ''
  const blockStart = startMatch.index + startMatch[0].length
  if (!nextLabel) return section.slice(blockStart).trim()

  const tail = section.slice(blockStart)
  const nextMatch = tail.match(new RegExp(`\\n\\*\\*${escapeRegex(nextLabel)}\\*\\*(?:\\s*\\([^)]+\\))?:`, 'u'))
  return tail.slice(0, nextMatch && nextMatch.index != null ? nextMatch.index : undefined).trim()
}

function extractBullets(section, label, nextLabel) {
  const block = extractRawBlock(section, label, nextLabel)
  return block
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => normalizeSpaces(line.slice(2)))
}

function parseParty(line) {
  const match = normalizeSpaces(line).match(
    /^([^()]+)\((\d+),\s*([^)]+)\)\s+—\s+(.+?)\s+—\s+거짓말 전략:\s*`?([^`]+)`?$/u,
  )
  if (!match) {
    throw new Error(`failed to parse party line: ${line}`)
  }
  return {
    name: normalizeSpaces(match[1]),
    age: Number(match[2]),
    role: normalizeSpaces(match[3]),
    hiddenTruth: normalizeSpaces(match[4]),
    lieStrategy: normalizeSpaces(match[5]),
  }
}

function parseDisputes(section) {
  return extractBullets(section, '쟁점', '증거 체인').map((line, index) => {
    const match = line.match(/^d-(\d+):\s*(.+)$/u)
    return {
      id: `d-${match ? match[1] : index + 1}`,
      name: normalizeSpaces(match ? match[2] : line),
    }
  })
}

function parseEvidenceEntries(text) {
  const entries = []
  const cleaned = normalizeSpaces(text)
  const parts = cleaned.split(/,\s*(?=e-\d+\s)/u)
  for (const part of parts) {
    const match = part.match(/^(e-\d+)\s+(.+?)(?:\s+\(requires.+\))?$/u)
    if (!match) continue
    entries.push({
      id: match[1],
      name: normalizeSpaces(match[2]),
    })
  }
  return entries
}

function parseRequires(text) {
  const requiresMatch = String(text || '').match(/\(requires\s+([^)]+)\)/u)
  if (!requiresMatch) {
    return { requires: [], minState: null }
  }
  const parts = requiresMatch[1].split(',').map((item) => normalizeSpaces(item))
  const requires = parts
    .flatMap((item) => item.split('+').map((sub) => normalizeSpaces(sub)))
    .filter((item) => /^e-\d+$/iu.test(item))
  const statePart = parts.find((item) => /^S\d\+?$/iu.test(item))
  return {
    requires,
    minState: statePart ? statePart.replace('+', '').toUpperCase() : null,
  }
}

function parseCombinations(lines) {
  return lines.map((line) => {
    const match = line.match(/^((?:e-\d+\+)+e-\d+)\s+→\s+(.+)$/u)
    return {
      requires: match ? match[1].split('+').map((item) => normalizeSpaces(item)) : [],
      description: normalizeSpaces(match ? match[2] : line),
    }
  })
}

function parseEvidenceChain(section) {
  const block = extractRawBlock(section, '증거 체인', '중반 뒤집기')
  const lines = block
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const findLine = (prefix) => lines.find((line) => line.startsWith(`- ${prefix}:`)) || ''
  const stripPrefix = (line, prefix) => normalizeSpaces(line.replace(new RegExp(`^- ${escapeRegex(prefix)}:\\s*`, 'u'), ''))

  const initialLine = findLine('초기')
  const unlock1Line = findLine('1차 해금')
  const unlock2Line = findLine('2차 해금')
  const unlock3Line = findLine('3차 해금')
  const finalLine = findLine('최종')
  const comboStart = lines.findIndex((line) => line.startsWith('- 핵심 조합:'))
  const comboLines = comboStart >= 0
    ? lines
      .slice(comboStart + 1)
      .filter((line) => line.startsWith('- '))
      .map((line) => normalizeSpaces(line.slice(2)))
    : []

  const unlockLineToEntry = (line, prefix) => {
    if (!line) return null
    const parsed = parseEvidenceEntries(stripPrefix(line, prefix))[0]
    if (!parsed) return null
    return { ...parsed, ...parseRequires(line) }
  }

  return {
    initial: parseEvidenceEntries(stripPrefix(initialLine, '초기')),
    unlock1: unlockLineToEntry(unlock1Line, '1차 해금'),
    unlock2: unlockLineToEntry(unlock2Line, '2차 해금'),
    unlock3: unlockLineToEntry(unlock3Line, '3차 해금'),
    final: unlockLineToEntry(finalLine, '최종'),
    combinations: parseCombinations(comboLines),
  }
}

function parseDilemmaAxes(text) {
  const matches = [...String(text || '').matchAll(/`([^`]+)`/gu)].map((match) => normalizeSpaces(match[1]))
  if (matches.length > 0) return matches
  return String(text || '')
    .split(',')
    .map((item) => normalizeSpaces(item))
    .filter(Boolean)
    .slice(0, 3)
}

function parseThreadECase(root, caseId) {
  const filePath = batchDocPath(root, caseId)
  const markdown = readUtf8(filePath)
  const section = extractCaseSection(markdown, caseId)
  const heading = extractHeading(section)

  const hook = extractLabelText(section, '훅', ['A', 'B', '쟁점', '증거 체인', '중반 뒤집기', '판결 딜레마', '난이도'])
  const partyALine = extractLabelText(section, 'A', ['B', '쟁점', '증거 체인', '중반 뒤집기', '판결 딜레마', '난이도'])
  const partyBLine = extractLabelText(section, 'B', ['쟁점', '증거 체인', '중반 뒤집기', '판결 딜레마', '난이도'])
  const midTwist = extractLabelText(section, '중반 뒤집기', ['판결 딜레마', '난이도'])
  const dilemma = extractLabelText(section, '판결 딜레마', ['난이도'])
  const difficulty = normalizeSpaces(extractLabelText(section, '난이도', []))

  return {
    ...heading,
    hook,
    partyA: parseParty(partyALine),
    partyB: parseParty(partyBLine),
    disputes: parseDisputes(section),
    evidenceChain: parseEvidenceChain(section),
    midTwist,
    dilemma,
    dilemmaAxes: parseDilemmaAxes(dilemma),
    difficulty: difficulty || 'medium',
    section,
  }
}

module.exports = {
  parseThreadECase,
  batchDocPath,
}
