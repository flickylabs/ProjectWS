#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

function getArgs() {
  const args = process.argv.slice(2)
  const options = {
    caseId: 'spouse-01',
    inputDir: '',
    output: '',
    base: '',
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--case' && args[i + 1]) options.caseId = args[++i]
    else if (arg === '--input-dir' && args[i + 1]) options.inputDir = args[++i]
    else if (arg === '--output' && args[i + 1]) options.output = args[++i]
    else if (arg === '--base' && args[i + 1]) options.base = args[++i]
  }

  return options
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '')
  return JSON.parse(raw)
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function main() {
  const options = getArgs()
  assert(options.inputDir, '--input-dir is required')

  const outputPath = options.output
    ? path.resolve(options.output)
    : path.join(ROOT, 'src', 'data', 'scriptedText', `${options.caseId}.json`)
  const basePath = options.base
    ? path.resolve(options.base)
    : outputPath

  assert(fs.existsSync(basePath), `base bundle not found: ${basePath}`)

  const inputDir = path.resolve(options.inputDir)
  const session1Path = path.join(inputDir, 'session-1-interrogation-a.json')
  const session2Path = path.join(inputDir, 'session-2-interrogation-b.json')
  const session3Path = path.join(inputDir, 'session-3-evidence-dossier.json')
  const session4Path = path.join(inputDir, 'session-4-witness-aftermath-system.json')

  for (const filePath of [session1Path, session2Path, session3Path, session4Path]) {
    assert(fs.existsSync(filePath), `missing GPT Pro session output: ${filePath}`)
  }

  const base = readJson(basePath)
  const s1 = readJson(session1Path)
  const s2 = readJson(session2Path)
  const s3 = readJson(session3Path)
  const s4 = readJson(session4Path)

  assert(s1.channel === 'interrogation' && s1.party === 'a' && Array.isArray(s1.entries), 'session-1 shape mismatch')
  assert(s2.channel === 'interrogation' && s2.party === 'b' && Array.isArray(s2.entries), 'session-2 shape mismatch')
  assert(s3.evidence_present && Array.isArray(s3.evidence_present.entries), 'session-3 evidence_present shape mismatch')
  assert(s3.dossier && Array.isArray(s3.dossier.entries), 'session-3 dossier shape mismatch')
  assert(s4.witness && Array.isArray(s4.witness.entries), 'session-4 witness shape mismatch')
  assert(s4.aftermath && Array.isArray(s4.aftermath.entries), 'session-4 aftermath shape mismatch')
  assert(s4.system_message && Array.isArray(s4.system_message.entries), 'session-4 system_message shape mismatch')

  const merged = JSON.parse(JSON.stringify(base))
  merged.generatedAt = new Date().toISOString()
  merged.notes = [
    ...(Array.isArray(base.notes) ? base.notes : []),
    `Merged GPT Pro web partials from ${path.basename(inputDir)}.`,
  ]
  merged.channels = {
    ...base.channels,
    interrogation: {
      ...(base.channels?.interrogation || {}),
      entries: [...s1.entries, ...s2.entries],
    },
    evidence_present: {
      ...(base.channels?.evidence_present || {}),
      entries: s3.evidence_present.entries,
    },
    dossier: {
      ...(base.channels?.dossier || {}),
      entries: s3.dossier.entries,
    },
    witness: {
      ...(base.channels?.witness || {}),
      entries: s4.witness.entries,
    },
    aftermath: {
      ...(base.channels?.aftermath || {}),
      entries: s4.aftermath.entries,
    },
    system_message: {
      ...(base.channels?.system_message || {}),
      entries: s4.system_message.entries,
    },
  }

  writeJson(outputPath, merged)
  console.log(`[merge-scripted-text-gptpro] case=${options.caseId}`)
  console.log(`[merge-scripted-text-gptpro] inputDir=${inputDir}`)
  console.log(`[merge-scripted-text-gptpro] output=${outputPath}`)
}

main()
