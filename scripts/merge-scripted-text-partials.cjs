#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

function getArgs() {
  const args = process.argv.slice(2)
  const options = { target: null, inputs: [] }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--target' && args[i + 1]) {
      options.target = args[++i]
    } else if (arg === '--input' && args[i + 1]) {
      options.inputs.push(args[++i])
    }
  }
  if (!options.target || options.inputs.length === 0) {
    throw new Error('usage: node scripts/merge-scripted-text-partials.cjs --target <file> --input <file> [--input <file> ...]')
  }
  return options
}

function loadJson(relPath) {
  const filePath = path.resolve(ROOT, relPath)
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function saveJson(relPath, data) {
  const filePath = path.resolve(ROOT, relPath)
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function applyEntries(bundle, entries) {
  const channels = bundle.channels || {}
  const maps = {
    interrogation: new Map((channels.interrogation?.entries || []).map((entry) => [entry.key, entry])),
    evidence_present: new Map((channels.evidence_present?.entries || []).map((entry) => [entry.key, entry])),
    dossier: new Map((channels.dossier?.entries || []).map((entry) => [entry.key, entry])),
    witness: new Map((channels.witness?.entries || []).map((entry) => [entry.key, entry])),
    aftermath: new Map((channels.aftermath?.entries || []).map((entry) => [entry.key, entry])),
    system_message: new Map((channels.system_message?.entries || []).map((entry) => [entry.key, entry])),
  }

  let updated = 0

  for (const item of entries) {
    const key = item.key
    let targetEntry = null
    for (const map of Object.values(maps)) {
      if (map.has(key)) {
        targetEntry = map.get(key)
        break
      }
    }
    if (!targetEntry) continue
    targetEntry.variants = item.variants
    updated += 1
  }

  return updated
}

function main() {
  const options = getArgs()
  const bundle = loadJson(options.target)
  let updated = 0
  for (const input of options.inputs) {
    const entries = loadJson(input)
    updated += applyEntries(bundle, entries)
  }
  saveJson(options.target, bundle)
  console.log(`[merge-scripted-text-partials] target=${options.target}`)
  console.log(`[merge-scripted-text-partials] updated=${updated}`)
}

main()
