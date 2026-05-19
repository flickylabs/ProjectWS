#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const BASE_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const DEFAULT_MATRIX = path.join(BASE_DIR, 'truth-leak-matrix.json')
const DEFAULT_OUT = path.join(BASE_DIR, 'truth-leak-report.json')
const LOCALES = ['ko', 'en', 'ja', 'zh-CN']

// Player-visible text fields. Internal metadata fields (behaviorHint,
// tags, id, key, dossierCardId, etc.) carry author/AI guidance that
// never reaches the player and therefore must not be scanned — keyword
// matches there are by-design directives, not leaks.
const PLAYER_VISIBLE_FIELD_RE = /\.(text|questionText|title|body|label|line|narration)$/

// Channels scanned for pre-confession truth-leak surfaces. The intent
// (per memory feedback_truth_leak_prohibition) is to flag NPC-truth
// content surfacing in the JUDGE / SYSTEM / DOSSIER channels before
// the confession arc has reached the lieState that legitimates it.
//
// Channel names below are the EXACT segment names inside the source
// JSON files. The matcher requires a whole-segment hit (see
// extractStringsFromChannels), so e.g. 'judge_question' will not
// accidentally match 'judge_witness_summon' siblings.
//
// Intentionally excluded surfaces (post-confession / post-discovery /
// player-driven where keyword matches are by-design references rather
// than leaks):
//   - interrogation   : NPC dialogue gated by lieState. S0~S2 is
//     pre-confession but S4~S5 legitimately reveals truth — needs
//     per-entry lieState filtering, out of scope for the static
//     keyword scan. Review manually during Phase 2.
//   - mediation / aftermath : Phase 4 / Phase 5 — post-confession.
//   - evidence_present / witness / evidence_discovery : player-
//     triggered surfaces, dossier-unlock already exposed the topic.
//   - rapport_milestone / contradict_milestone / interjection /
//     emotional_overload / contradiction_pursuit / trust_action :
//     rare state triggers that fire only after the relevant unlock.
//   - angle_catalog (scriptedAngles) : Phase 3 angle inventory,
//     post-emergence.
const CASE_FILE_SPECS = [
  {
    source: 'src/data/scriptedAngles',
    fileBase: (caseId) => `${caseId}_judge_questions`,
    channels: ['judgeQuestions', 'judge_question'],
  },
  {
    source: 'src/data/scriptedText',
    fileBase: (caseId) => caseId,
    channels: [
      'judge_question',
      'judge_contradiction',
      'judge_evidence_combo',
      'judge_witness_summon',
      'system_message',
      'dossier',
    ],
  },
  {
    source: 'src/data/dialogues/phase1',
    fileBase: (caseId) => caseId,
    channels: ['dialogues'],
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
  const explicitWhitelist = Array.isArray(matrix._explicitWhitelist) ? matrix._explicitWhitelist : []

  for (const caseId of Object.keys(matrix)) {
    if (caseId.startsWith('_')) continue
    // Pre-load ko source variant id -> tags map so non-ko findings can
    // recover design-intent tags from the canonical KO authoring file
    // (translated locales typically omit tags).
    const koTagMap = loadKoTagMap(caseId, options.dataRoot)
    for (const lang of LOCALES) {
      const files = getCaseFiles(caseId, lang, options.dataRoot)
      for (const fileInfo of files) {
        const data = JSON.parse(fs.readFileSync(fileInfo.file, 'utf8'))
        const strings = extractStringsFromChannels(data, fileInfo.channels)
        for (const { key, text, parent } of strings) {
          for (const disputeId of Object.keys(matrix[caseId])) {
            if (disputeId.startsWith('_')) continue
            const hiddenKeywords = matrix[caseId][disputeId].hidden[lang] || []
            for (const keyword of hiddenKeywords) {
              if (!keyword || !containsKeyword(text, keyword, lang)) continue
              const fingerprint = `${caseId}\0${disputeId}\0${lang}\0${fileInfo.file}\0${key}\0${keyword}`
              if (seen.has(fingerprint)) continue
              seen.add(fingerprint)
              if (isDesignIntent({
                caseId,
                disputeId,
                key,
                parent,
                koTagMap,
                disputeNode: matrix[caseId][disputeId],
                explicitWhitelist,
              })) continue
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

// Design-intent gate: a finding is suppressed when its variant tags match
// the dispute's _designIntentTags allowlist, or its variant id matches an
// _explicitWhitelist pattern at matrix root. Translated locales typically
// strip tags during the localization pipeline, so we recover them from the
// KO authoring file via the variant id.
function isDesignIntent({ caseId, disputeId, key, parent, koTagMap, disputeNode, explicitWhitelist }) {
  const variantId = parent && typeof parent === 'object' && typeof parent.id === 'string' ? parent.id : null
  const localTags = parent && Array.isArray(parent.tags) ? parent.tags : []
  const koTags = variantId && koTagMap[variantId] ? koTagMap[variantId] : []
  const effectiveTags = localTags.length ? localTags : koTags

  // Tag-based allowlist (per dispute)
  const designIntentTags = Array.isArray(disputeNode?._designIntentTags) ? disputeNode._designIntentTags : []
  if (designIntentTags.length && effectiveTags.length) {
    for (const tag of designIntentTags) {
      if (effectiveTags.includes(tag)) return true
    }
  }

  // Explicit id-pattern whitelist (matrix root). Supports trailing '*' wildcard.
  if (variantId) {
    for (const rule of explicitWhitelist) {
      if (rule.caseId && rule.caseId !== caseId) continue
      if (rule.disputeId && rule.disputeId !== disputeId) continue
      const pattern = rule.variantIdPattern
      if (!pattern) continue
      if (pattern.endsWith('*')) {
        if (variantId.startsWith(pattern.slice(0, -1))) return true
      } else if (variantId === pattern) {
        return true
      }
    }
  }

  // `key` is reserved for future path-pattern rules; currently unused.
  void key
  return false
}

// Build a { variantId: tags[] } map from KO authoring files for a case so
// non-ko findings can resolve their design-intent tags (translated locales
// drop the tags array during the localization pipeline).
function loadKoTagMap(caseId, dataRoot) {
  const map = {}
  for (const spec of CASE_FILE_SPECS) {
    const file = path.join(dataRoot, spec.source, `${spec.fileBase(caseId)}.json`)
    if (!fs.existsSync(file)) continue
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    walkJson(data, '', (_key, _text, parent) => {
      if (parent && typeof parent === 'object' && typeof parent.id === 'string' && Array.isArray(parent.tags)) {
        if (!map[parent.id]) map[parent.id] = parent.tags
      }
    })
  }
  return map
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
  // Match channel name as a whole path segment (anchored by start/dot before and
  // dot/bracket/end after). Prevents "judge" from matching "judge_evidence_combo"
  // or similar sibling channels we explicitly do NOT want to scan.
  const patterns = channelNames.map((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`(?:^|\\.)${escaped}(?:\\.|\\[|$)`, 'i')
  })
  const strings = []
  walkJson(data, '', (key, text, parent) => {
    if (!patterns.some((pattern) => pattern.test(key))) return
    if (!PLAYER_VISIBLE_FIELD_RE.test(key)) return
    strings.push({ key: key || '$', text, parent })
  })
  return strings
}

function walkJson(value, keyPath, visit, parent) {
  if (typeof value === 'string') {
    visit(keyPath, value, parent)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walkJson(item, `${keyPath}[${index}]`, visit, value)
    })
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    const childPath = keyPath ? `${keyPath}.${key}` : key
    walkJson(child, childPath, visit, value)
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
    if (caseId.startsWith('_')) continue // underscore-prefixed keys are metadata, skip
    if (!disputes || typeof disputes !== 'object' || Array.isArray(disputes)) {
      throw new Error(`matrix.${caseId} must be an object keyed by disputeId`)
    }
    for (const [disputeId, entry] of Object.entries(disputes)) {
      if (disputeId.startsWith('_')) continue // underscore-prefixed keys are metadata, skip
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
      // Optional design-intent allowlist for this dispute. Tags listed here
      // are evaluated against each candidate variant's `tags` array (or the
      // KO authoring tags when the locale file dropped them). Any single
      // match marks the catch as design-intent and suppresses the finding.
      if (entry._designIntentTags !== undefined) {
        if (!Array.isArray(entry._designIntentTags)) {
          throw new Error(`matrix.${caseId}.${disputeId}._designIntentTags must be an array`)
        }
        for (const tag of entry._designIntentTags) {
          if (typeof tag !== 'string' || !tag.includes(':')) {
            throw new Error(`matrix.${caseId}.${disputeId}._designIntentTags entries must be "key:value" strings`)
          }
        }
      }
    }
  }
  // Optional explicit variant-id whitelist at matrix root, for entries that
  // cannot be expressed via tags (e.g., scriptedAngles variants whose tag
  // set is intentionally minimal).
  if (matrix._explicitWhitelist !== undefined) {
    if (!Array.isArray(matrix._explicitWhitelist)) {
      throw new Error('matrix._explicitWhitelist must be an array')
    }
    for (const rule of matrix._explicitWhitelist) {
      if (!rule || typeof rule !== 'object') {
        throw new Error('matrix._explicitWhitelist entries must be objects')
      }
      if (typeof rule.variantIdPattern !== 'string' || !rule.variantIdPattern) {
        throw new Error('matrix._explicitWhitelist entries require variantIdPattern')
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
